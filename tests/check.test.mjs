import {readFileSync, readdirSync, statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url));
const context=vm.createContext({window:{}});
vm.runInContext(readFileSync(path.join(root,'src/content.js'),'utf8'),context);
vm.runInContext(readFileSync(path.join(root,'src/navigation.js'),'utf8'),context);
const {TRACKING:D,TrackingNavigation:N}=context.window;
const plain=v=>JSON.parse(JSON.stringify(v));

test('18 adegan, enam babak, satu mode tanpa catatan atau durasi di konten',()=>{
  assert.equal(D.scenes.length,18);
  assert.equal(D.chapters.length,6);
  assert.equal(new Set(D.scenes.map(s=>s.id)).size,18);
  const stageIds=D.stages.map(s=>s.id);
  for(const s of D.scenes) {
    for(const key of ['notes','seconds','body','tech','techTitle','sources','snippet'])assert.ok(!(key in s),s.id+' '+key);
    assert.ok(s.steps.length>=2,s.id);
    assert.ok(['actual','illustration'].includes(s.badge),s.id);
    assert.ok(s.stages==='all'||(s.stages.length&&s.stages.every(x=>stageIds.includes(x))),s.id);
    if(s.branch)assert.ok(D.branches[s.branch],s.id);
  }
  assert.ok(!('sources' in D));
  assert.equal(D.scenes[0].badge,'actual');
  assert.ok(D.scenes.slice(1).every(s=>s.badge==='illustration'));
});

test('target durasi storyboard-2 tepat 1.200 detik dan sesuai babak',()=>{
  const md=readFileSync(path.join(root,'../storyboard-2.md'),'utf8');
  const seconds=[...md.matchAll(/^- Durasi: (\d+):(\d{2})/gm)].map(m=>Number(m[1])*60+Number(m[2]));
  assert.equal(seconds.length,18);
  assert.equal(seconds.reduce((a,b)=>a+b,0),1200);
  const perChapter=D.chapters.map((_,c)=>D.scenes.reduce((n,s,i)=>n+(s.chapter===c?seconds[i]:0),0));
  assert.deepEqual(plain(perChapter),[90,240,420,180,150,120]);
});

test('definisi mikro: 14 istilah, masing-masing tepat sekali, pada langkah yang ada',()=>{
  const all=D.scenes.flatMap(s=>(s.terms||[]).map(t=>({...t,scene:s})));
  assert.equal(all.length,14);
  assert.equal(new Set(all.map(t=>t.term)).size,14);
  for(const t of all)assert.ok(t.step>=0&&t.step<t.scene.steps.length,t.term);
  assert.ok(!all.some(t=>/haversine/i.test(t.term)));
});

test('adegan HMM memuat langkah keterbatasan sebagai langkah terakhir',()=>{
  const hmm=D.scenes.find(s=>s.visual==='hmm');
  assert.equal(hmm.steps.length,4);
  assert.match(hmm.steps[3],/GPS mentah/);
  assert.match(hmm.steps[3],/status halte/);
});

test('navigasi maju/mundur membalik setiap langkah; ujung tidak melampaui materi',()=>{
  let s={index:0,step:0}, count=1;
  assert.deepEqual(plain(N.previous(s,D.scenes)),s);
  while(s.index!==17||s.step!==D.scenes[17].steps.length-1) {
    const next=N.next(s,D.scenes);
    assert.deepEqual(plain(N.previous(next,D.scenes)),plain(s));
    s=next; count++;
    assert.ok(count<100);
  }
  assert.equal(count,D.scenes.reduce((n,s)=>n+s.steps.length,0));
  assert.deepEqual(plain(N.next(s,D.scenes)),plain(s));
});

test('URL hanya menyimpan adegan; nilai tidak valid kembali ke adegan pertama',()=>{
  assert.deepEqual(plain(N.parse('#stop-context',D.scenes)),{index:7,step:0});
  assert.deepEqual(plain(N.parse('#present/stop-context/2',D.scenes)),{index:0,step:0});
  assert.deepEqual(plain(N.parse('',D.scenes)),{index:0,step:0});
  D.scenes.forEach((scene,i)=>{
    assert.equal(N.hash({index:i,step:1},D.scenes),'#'+scene.id);
    assert.deepEqual(plain(N.parse(N.hash({index:i,step:1},D.scenes),D.scenes)),{index:i,step:0});
  });
});

test('contoh konsisten: observasi B, raw/snap terpisah, dan gerak menuju C',()=>{
  assert.equal(D.demo.bus,'BUS-DEMO-01');
  assert.deepEqual(plain(D.demo.observations.map(o=>[o.previous,o.current,o.next])),[['A','—','B'],['A','B','C'],['B','—','C']]);
  assert.notDeepEqual(plain(D.demo.raw),plain(D.demo.snap));
  assert.equal(D.demo.deviceTime,D.demo.observations[2].time);
  assert.ok(D.demo.observations[2].point[0]>D.demo.observations[1].point[0]);
});

test('aset memiliki keterangan placeholder; screenshot wajib, foto perangkat opsional',()=>{
  for(const [key,a] of Object.entries(D.assets)) {
    assert.match(a.file,/^assets\/[\w.-]+$/,key);
    assert.equal(typeof a.required,'boolean',key);
    assert.ok(a.label&&a.purpose&&a.alt,key);
  }
  assert.equal(D.assets.dashboard.required,true);
  assert.equal(D.assets.device.required,false);
  assert.ok(D.scenes.filter(s=>s.aside).every(s=>D.assets[s.aside]));
});

test('bundle aman publik: tanpa koneksi produksi, nama internal, catatan, timer, atau mode Baca',()=>{
  const files=[];
  function visit(dir){for(const name of readdirSync(dir)){const p=path.join(dir,name);if(statSync(p).isDirectory())visit(p);else files.push(p);}}
  visit(path.join(root,'src'));
  const forbidden=[
    /smpob/i,/NIK\s*\d{6,}/i,/\bDO:\s*\d{12,}/,/\/home\//,/tije-/i,/weltevreden/i,/syntra/i,
    /bus_trackings/i,/\.go\b/,/\.jsx\b/,/catatan pembicara/i,/\bnotes\b/i,/\btimer\b/i,/\balokasi\b/i,
    /data-mode/,/mode baca/i
  ];
  for(const file of files.filter(f=>/\.(js|html|css|svg)$/.test(f))){
    const src=readFileSync(file,'utf8');
    for(const pattern of forbidden)assert.ok(!pattern.test(src),file+' '+pattern);
    if(file.endsWith('.js'))assert.ok(!/\b(?:fetch|WebSocket|XMLHttpRequest|EventSource)\s*\(/.test(src),file);
  }
  const html=readFileSync(path.join(root,'src/index.html'),'utf8');
  for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
    if(!m[1].startsWith('http'))assert.ok(statSync(path.join(root,'src',m[1])).isFile(),m[1]);
  }
});
