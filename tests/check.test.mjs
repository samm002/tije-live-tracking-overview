import {readFileSync,readdirSync,statSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url));
const script=name=>readFileSync(path.join(root,'src',name),'utf8');
const context=vm.createContext({window:{}});
vm.runInContext(script('content.js'),context);vm.runInContext(script('navigation.js'),context);
const {TRACKING:D,TrackingNavigation:N}=context.window;
const plain=v=>JSON.parse(JSON.stringify(v));

test('18 slide, cover/Q&A satu langkah, dan konten layar terpisah dari bahan pembicara',()=>{
  assert.equal(D.version,3);assert.equal(D.scenes.length,18);assert.equal(D.chapters.length,6);
  assert.equal(new Set(D.scenes.map(s=>s.id)).size,18);
  assert.equal(D.scenes[0].visual,'cover');assert.equal(D.scenes.at(-1).visual,'qa');
  assert.equal(D.scenes[0].steps.length,1);assert.equal(D.scenes.at(-1).steps.length,1);
  assert.equal(D.scenes[0].title,D.title);
  assert.equal(D.title,'A Glimpse Behind Live Tracking: From Bus to Dashboard');
  for(const scene of D.scenes){
    assert.ok(scene.steps.length>=1,scene.id);
    for(const key of ['notes','seconds','sources','tech','snippet','analogy'])assert.ok(!(key in scene),`${scene.id}: ${key}`);
    assert.ok(scene.stages==='all'||scene.stages.every(id=>D.stages.some(s=>s.id===id)),scene.id);
    assert.ok(scene.chapter>=0&&scene.chapter<D.chapters.length);
  }
});

test('alur memuat proses pendukung dan batas protokol yang diminta',()=>{
  assert.deepEqual(plain(D.stages.map(s=>s.id)),['bus','broker','forwarder','rabbitmq','consumer','output-broker','dashboard']);
  assert.deepEqual(plain(D.stages.map(s=>s.label)),['Bus','Broker','Forwarder','Queue','Consumer','Broker','Dashboard']);
  assert.deepEqual(plain(D.pipeline),['Enrich + history','Stop position','Out-of-route','HMM snap','ETA','Stopping point','Position meter','Headway','Save state','Publish']);
  const forwarder=D.scenes.find(s=>s.id==='forwarder');
  assert.match(forwarder.steps.join(' '),/AMQP/);assert.match(forwarder.steps.join(' '),/Consistent-hash/);
  assert.ok(D.scenes.find(s=>s.id==='enrichment').payload);
  assert.match(D.scenes.find(s=>s.id==='dashboard').steps.at(-1),/arrival\/generic.*sensor/);
});

test('definisi engineering muncul pada langkah valid dan membedakan kedua prefetch',()=>{
  const all=D.scenes.flatMap(scene=>(scene.terms||[]).map(t=>({...t,scene})));
  for(const t of all){assert.ok(t.def);assert.ok(t.step>=0&&t.step<t.scene.steps.length,t.term);}
  assert.equal(new Set(all.map(t=>t.term)).size,all.length);
  for(const concept of ['MQTT','AMQP','queue','exchange','consistent hashing','worker pool','worker','ACK','Redis / cache','GeoRadius','Haversine','HMM','ETA','prefetch RabbitMQ','page prefetch'])assert.ok(all.some(t=>t.term===concept),concept);
});

test('payload berkembang tanpa menimpa raw dan contoh ETA konsisten dengan kecepatan minimum',()=>{
  assert.equal(D.rawPayload.busBodyNo,D.demo.bus);assert.equal(D.payloads.final.bus_body_no,D.demo.bus);
  assert.equal(D.demo.bus,'TJ-123');
  assert.equal(D.sourceTopic,'emq/gps/<source>/<busBodyNo>');
  assert.equal(D.sourceTopicExample,'emq/gps/OBU/TJ-123');
  assert.equal(D.payloads.final.trip_id,D.demo.trip);
  const order=['normalized','context','position','snap','eta','final'];
  for(let i=1;i<order.length;i++)for(const [key,value] of Object.entries(D.payloads[order[i-1]]))assert.deepEqual(plain(D.payloads[order[i]][key]),plain(value),key);
  assert.notDeepEqual(plain(D.demo.raw),plain(D.demo.snap));
  assert.equal(D.payloads.final.latitude,D.demo.raw.latitude);assert.equal(D.payloads.final.snap_latitude,D.demo.snap.latitude);
  assert.equal(D.payloads.eta.estimated_time_next_stops,D.payloads.eta.estimated_distance_next_stops/1000/Math.max(D.demo.speed,30)*3600);
  assert.equal(new Date(D.rawPayload.deviceTimestamp).toISOString(),'2026-10-21T03:00:00.000Z');
  assert.equal(D.payloads.position.curr_stops,'');assert.equal(D.payloads.position.next_stops,'C');
});

test('navigasi melewati seluruh langkah dengan invers dan batas yang benar',()=>{
  let state={index:0,step:0},count=1;
  assert.deepEqual(plain(N.previous(state,D.scenes)),state);
  while(state.index!==17||state.step!==D.scenes[17].steps.length-1){
    const next=N.next(state,D.scenes);assert.deepEqual(plain(N.previous(next,D.scenes)),plain(state));state=next;assert.ok(++count<200);
  }
  assert.equal(count,D.scenes.reduce((n,s)=>n+s.steps.length,0));
  assert.deepEqual(plain(N.next(state,D.scenes)),plain(state));
  assert.deepEqual(plain(N.normalize({index:NaN,step:Infinity},D.scenes)),{index:0,step:0});
});

test('URL adegan valid dimulai pada langkah pertama; ID lama yang dipertahankan tetap bekerja',()=>{
  D.scenes.forEach((scene,index)=>assert.deepEqual(plain(N.parse(N.hash({index,step:2},D.scenes),D.scenes)),{index,step:0}));
  assert.equal(D.scenes[N.parse('#stop-context',D.scenes).index].id,'stop-context');
  for(const hash of ['','#unknown','#present/stop-context/2'])assert.deepEqual(plain(N.parse(hash,D.scenes)),{index:0,step:0});
});

test('aset wajib tersedia; slot foto opsional mendukung placeholder',()=>{
  for(const a of Object.values(D.assets)){assert.match(a.file,/^assets\/[\w.-]+$/);assert.ok(a.alt);if(a.required)assert.ok(existsSync(path.join(root,'src',a.file)));else assert.equal(a.placeholder,true);}
  assert.equal(D.assets.busPhoto.file,'assets/bus-on-road.jpg');
  assert.equal(D.assets.dashboardPhoto.file,'assets/dashboard-live-tracking.png');
  for(const scene of D.scenes)if(scene.aside)assert.ok(D.assets[scene.aside]);
  const html=script('index.html');
  for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g))if(!m[1].startsWith('http'))assert.ok(existsSync(path.join(root,'src',m[1])),m[1]);
});

test('renderer dapat menampilkan seluruh langkah, termasuk field dan penutup',()=>{
  const elements=new Map(),events={},listeners={};
  function element(){return {innerHTML:'',textContent:'',style:{},disabled:false,classList:{toggle(){},add(){},remove(){}},setAttribute(){},addEventListener(type,fn){this[type]=fn;},matches(){return false;}};}
  const document={title:'',body:element(),querySelectorAll(){return [];},querySelector(selector){if(!elements.has(selector))elements.set(selector,element());return elements.get(selector);},addEventListener(type,fn){events[type]=fn;}};
  const window={TRACKING:D,TrackingNavigation:N,addEventListener(type,fn){listeners[type]=fn;}};
  const env=vm.createContext({window,document,location:{hash:''},history:{replaceState(){}},setTimeout(){return 0;},clearTimeout(){}});
  vm.runInContext(script('app.js'),env);
  const target={closest(){return null;}};
  for(const scene of D.scenes){
    env.location.hash='#'+scene.id;listeners.hashchange();
    for(let step=0;step<scene.steps.length;step++){
      const html=elements.get('#main').innerHTML;
      assert.ok(html.includes((scene.visual==='cover'?D.title:scene.title).replace(/&/g,'&amp;')),scene.id);
      assert.ok(!html.includes('undefined'),scene.id);
      assert.ok(!html.includes('class="analogy"'),scene.id);
      if(scene.payload)assert.ok(html.includes('payload-panel'),scene.id);
      if(scene.visual==='hook')assert.ok(html.includes('photo-placeholder'),scene.id);
      if(scene.visual==='overview'){
        assert.ok(html.includes('Process + publish'));
        assert.ok(html.includes('Downstream services'));
        assert.equal((html.match(/data-connection="queue-consumer"/g)||[]).length,1);
        const connector=html.match(/<path data-connection="queue-consumer"[^>]+>/)[0];
        assert.equal((connector.match(/marker-end=/g)||[]).length,1);
        assert.ok(html.includes('stroke-dasharray="7 5"'));
      }
      if(step<scene.steps.length-1)events.keydown({key:'ArrowRight',target,preventDefault(){}});
    }
  }
  assert.equal(elements.get('#next').disabled,true);assert.equal(document.title,D.title);
});

test('bundle statis tidak memuat koneksi produksi, rahasia, path mesin, atau bahan pembicara',()=>{
  const files=[];function visit(dir){for(const name of readdirSync(dir)){const p=path.join(dir,name);if(statSync(p).isDirectory())visit(p);else files.push(p);}}
  visit(path.join(root,'src'));
  const forbidden=[/\/home\//,/https?:\/\/(?!www\.w3\.org\/2000\/svg)/,/\b(?:fetch|WebSocket|XMLHttpRequest|EventSource)\s*\(/,/mqtts?:\/\//,/AKIA[0-9A-Z]{16}/,/-----BEGIN.*PRIVATE KEY/,/catatan pembicara/i,/\btimer\b/i,/mode baca/i,/speaker-notes/];
  for(const file of files.filter(f=>/\.(js|html|css|svg)$/.test(f))){const source=readFileSync(file,'utf8');for(const pattern of forbidden)assert.ok(!pattern.test(source),file+' '+pattern);}
  assert.ok(!script('content.js').includes('PREFETCH='));
  // The test suite deliberately reads only files inside this checkout.
});
