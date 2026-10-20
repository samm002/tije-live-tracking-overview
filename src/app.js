(function () {
  'use strict';
  const D = window.TRACKING, N = window.TrackingNavigation;
  const $ = s => document.querySelector(s);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const colors = {blue:'#2463eb', purple:'#7c54c8', teal:'#078879', orange:'#d17a17', ink:'#172b47', gray:'#64748b'};
  const totalSteps = D.scenes.reduce((n, s) => n + s.steps.length, 0);
  const IDLE_MS = 2500;
  let state = N.parse(location.hash, D.scenes), idleHandle, replayHandle;

  const text = (x,y,t,cl,anchor) => '<text x="'+x+'" y="'+y+'" class="'+(cl||'svg-text')+'"'+(anchor?' text-anchor="'+anchor+'"':'')+'>'+esc(t)+'</text>';
  function lines(x,y,str,cl,max) {
    let out = '', line = '', n = 0;
    String(str).split(' ').forEach(word => {if ((line+' '+word).length > (max||24) && line) {out += text(x,y+n*23,line,cl);n++;line=word;} else line += (line?' ':'')+word;});
    return out + text(x,y+n*23,line,cl);
  }
  function node(x,y,w,h,title,sub,color) {
    const c=colors[color||'blue'];
    return '<g><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="14" fill="white" stroke="'+c+'" stroke-width="1.5"/><rect x="'+x+'" y="'+(y+15)+'" width="4" height="'+(h-30)+'" rx="2" fill="'+c+'"/>'+lines(x+20,y+35,title,'svg-node-title',Math.floor((w-38)/10))+(sub?lines(x+20,y+h-28,sub,'svg-small',Math.floor((w-35)/8)):'')+'</g>';
  }
  function arrow(x1,y1,x2,y2,color,dashed) {
    return '<path d="M'+x1+' '+y1+' L'+x2+' '+y2+'" fill="none" stroke="'+colors[color||'blue']+'" stroke-width="2"'+(dashed?' stroke-dasharray="6 6"':'')+' marker-end="url(#arrow-'+(color||'blue')+')"/>';
  }
  function group(on,html) {return '<g class="'+(on?'reveal-on':'reveal-dim')+'">'+html+'</g>';}
  function badge(x,y,t,color) {
    return '<g><rect x="'+x+'" y="'+y+'" width="'+(t.length*8+24)+'" height="28" rx="14" fill="'+colors[color||'blue']+'" fill-opacity=".09"/>'+text(x+12,y+19,t,'svg-badge')+'</g>';
  }
  function bus(x,y,color,label,extra) {
    return '<g class="'+(extra||'')+'" transform="translate('+x+' '+y+')"><circle r="23" fill="'+colors[color||'blue']+'" fill-opacity=".12"/><rect x="-16" y="-14" width="32" height="25" rx="6" fill="'+colors[color||'blue']+'"/><rect x="-11" y="-9" width="22" height="10" rx="2" fill="white"/><circle cx="-8" cy="11" r="3" fill="'+colors.ink+'"/><circle cx="8" cy="11" r="3" fill="'+colors.ink+'"/>'+(label?text(0,-37,label,'svg-mono','middle'):'')+'</g>';
  }
  function routeBase() {
    return '<path d="M90 240 H280 L360 160 H500 L580 240 H810" class="route-base"/><path d="M90 240 H280 L360 160 H500 L580 240 H810" class="route-line"/>'+
      [[90,240,'A'],[440,160,'B'],[810,240,'C']].map(p=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="10" fill="white" stroke="'+colors.blue+'" stroke-width="3"/>'+text(p[0],p[1]+40,'Halte '+p[2],'svg-node-title','middle')).join('')+
      text(800,85,'A → B → C','svg-mono','end');
  }
  function payload(stage) {
    const rows = Object.entries(D.rawPayload);
    let s='<g class="raw-payload-json" aria-label="Raw Payload"><rect x="150" y="35" width="600" height="320" rx="18" fill="#172b47"/>'+text(180,70,'Raw Payload','svg-code-head')+text(180,105,'{','svg-code-value');
    rows.forEach(([key,value],i)=>{
      const visible=key==='busBodyNo'||key==='source'||(key==='deviceTimestamp'?stage>=2:stage>0);
      const comma=i<rows.length-1?',':'';
      s+=group(visible,'<text x="180" y="'+(133+i*28)+'" xml:space="preserve"><tspan class="svg-code-key">'+esc('  '+JSON.stringify(key)+': ')+'</tspan><tspan class="svg-code-value">'+esc(JSON.stringify(value)+comma)+'</tspan></text>');
    });
    return s+text(180,329,'}','svg-code-value')+'</g>';
  }

  function assetSlot(asset, cls) {
    return '<div class="asset-slot '+(cls||'')+'">'+
      '<img src="'+esc(asset.file)+'" alt="'+esc(asset.alt)+'">'+
      '<div class="asset-placeholder"><span class="asset-flag">Placeholder · '+(asset.required?'wajib':'opsional')+'</span>'+
      '<strong>'+esc(asset.label)+'</strong><code>'+esc(asset.file)+'</code><p>'+esc(asset.purpose)+'</p>'+
      (asset.requirements?'<ul>'+asset.requirements.map(r=>'<li>'+esc(r)+'</li>').join('')+'</ul>':'')+'</div></div>';
  }

  function visual(scene, step) {
    const on=n=>step>=n;
    let s='';
    switch(scene.visual) {
      case 'payload':
        s=payload(step)+badge(165,370,'timestamp perangkat','orange');
        if(on(2))s+=arrow(690,301,800,301,'orange')+text(795,281,'Waktu laporan','svg-small','middle');
        break;
      case 'broker':
        s=group(on(0),node(30,65,200,95,'Jalur vendor','Sumber laporan','gray')+node(30,240,200,95,'Jalur OBU','Sumber laporan','gray'));
        s+=group(on(1),arrow(230,112,345,195)+arrow(230,287,345,215)+node(345,150,210,110,'Broker sumber','Publish / subscribe','blue'));
        s+=group(on(2),arrow(555,205,655,205)+node(655,150,210,110,'Forwarder','Subscriber','blue'));
        s+=text(450,375,'Label fungsi; aturan antarbroker tidak digambarkan.','svg-small','middle');break;
      case 'workers':
        s=group(on(0),node(30,115,220,160,'Forwarder','Terima laporan','blue'));
        s+=group(on(1),arrow(250,195,340,195)+node(340,115,220,160,'Normalisasi','Bentuk konsisten','blue'));
        s+=group(on(2),arrow(560,195,650,195)+node(650,115,220,160,'Consumer','Konteks perjalanan','purple'));
        s+=text(140,320,'Menerima & meneruskan','svg-small','middle')+text(760,320,'Mengolah informasi','svg-small','middle');break;
      case 'queues':
        s=node(25,150,210,110,D.demo.bus,'Identitas konsisten','blue');
        s+=group(on(1),arrow(235,205,325,205)+node(325,145,215,120,'Pemetaan antrean','Hash tingkat 1','blue'));
        s+=group(on(2),arrow(540,175,630,120)+arrow(540,235,630,300,'gray',true)+node(630,70,240,100,'Worker jalur A','BUS-DEMO-01','blue')+node(630,250,240,100,'Worker jalur B','Bus lain','gray')+badge(300,325,'Hash tingkat 2 → worker','purple'));
        s+=text(450,395,'Jumlah jalur ilustratif · bukan kapasitas produksi','svg-small','middle');break;
      case 'enrichment':
        s=node(25,130,240,155,'Laporan GPS',D.demo.bus,'blue');
        s+=group(on(1),arrow(265,205,340,205)+node(340,65,235,115,'Redis · konteks','Bus + penugasan','purple'));
        s+=group(on(2),node(340,240,235,115,'Redis · referensi','Trip + lintasan + halte','purple')+arrow(575,120,655,205,'purple')+arrow(575,295,655,225,'purple')+node(655,135,220,150,'Informasi perjalanan',D.demo.trip,'teal'));
        break;
      case 'state':
        s=node(25,110,250,185,'State sebelumnya','09:59:50 · tiba B','purple');
        s+=group(on(1),node(325,110,250,185,'Laporan utama','10:00:00 · GPS baru','blue')+text(300,215,'+','svg-plus','middle'));
        s+=group(on(2),arrow(575,205,635,205)+node(635,110,240,185,'Konteks berikutnya','B → C','teal'));
        s+=text(450,365,'Ingatan pengolahan ≠ histori perjalanan lengkap','svg-small','middle');break;
      case 'stops': {
        const obs=D.demo.observations[step];
        s=routeBase()+bus(obs.point[0],obs.point[1],'blue',D.demo.bus);
        s+=badge(220,335,'Sebelumnya: '+obs.previous,'purple')+badge(420,335,'Saat ini: '+obs.current,'blue')+badge(600,335,'Berikutnya: '+obs.next,'teal');
        break;
      }
      case 'snap':
      case 'hmm': {
        const fallback=scene.visual==='hmm'&&on(3);
        s=routeBase()+'<circle cx="570" cy="175" r="11" fill="'+colors.orange+'"/>'+text(610,145,'Raw GPS','svg-node-title');
        if(!fallback)s+=group(on(1),'<path d="M570 175L550 210" stroke="'+colors.orange+'" stroke-width="2" stroke-dasharray="5 4"/><circle cx="550" cy="210" r="11" fill="'+colors.teal+'"/>'+text(535,310,'Posisi hasil snap','svg-node-title','middle'));
        if(scene.visual==='hmm') {
          s+=badge(50,32,'1 · Kedekatan','orange')+group(on(1),badge(320,32,'2 · Arah','blue'))+group(on(2),badge(560,32,'3 · Kesinambungan','purple'));
          if(on(2)&&!fallback)s+=arrow(480,165,520,195,'teal');
          if(fallback)s+=bus(570,175,'orange')+node(40,318,440,92,'Tidak ada kandidat yang masuk akal','Posisi kembali ke GPS mentah','orange')+badge(510,348,'Status halte tetap: B → C','purple');
        }
        else s+=group(on(2),text(450,380,'Pengukuran sumber dan estimasi tetap dibedakan.','svg-small','middle'));
        break;
      }
      case 'eta':
        s=group(on(0),node(55,80,340,225,'ETA ke halte C','Estimasi, bukan janji','teal')+text(85,205,'≈ 2 menit','svg-big'));
        s+=group(on(1),node(455,80,390,225,'Progres lintasan','Bukan total jarak tempuh','blue')+text(485,205,'1.240 m','svg-big'));
        s+=badge(305,355,'Nilai ilustratif, bukan hasil kalkulasi skema','orange');break;
      case 'publish':
        s=group(on(0),node(30,135,220,135,'State perjalanan','Untuk laporan berikut','purple'));
        s+=group(on(1),arrow(250,200,335,200)+node(335,135,220,135,'Publikasi hasil','Identitas + posisi + konteks','blue'));
        s+=group(on(2),arrow(555,190,650,100)+arrow(555,220,650,300,'gray',true)+node(650,50,220,105,'Dashboard','Pembaruan kendaraan','blue')+node(650,255,220,105,'Penyimpanan','Cabang pendukung','gray'));
        break;
      case 'snapshot':
        s=group(on(0),node(30,125,220,140,'Browser dibuka','Minta posisi awal','blue')+arrow(250,195,335,195));
        s+=group(on(1),node(335,125,220,140,'API','Baca kondisi tersimpan','gray')+node(335,300,220,80,'Kondisi terakhir','','gray')+arrow(445,300,445,265,'gray'));
        s+=group(on(2),arrow(555,195,650,195)+node(650,125,220,140,'Snapshot','Representasi awal','teal'));
        s+=text(450,75,'JALUR AWAL · bukan setiap pembaruan','svg-mono','middle');break;
      case 'identity':
        s=node(35,90,350,225,'Sebelum pesan','BUS-DEMO-01','gray')+text(60,190,'Posisi yang telah diketahui','svg-small')+text(60,230,'Konteks sebelumnya','svg-small');
        s+=group(on(1),arrow(390,205,500,205));
        s+=group(on(2),node(510,90,350,225,'Setelah pesan','BUS-DEMO-01','blue')+text(535,190,'Koordinat keluaran baru','svg-small')+text(535,230,'Sebelumnya B · berikutnya C','svg-small'));
        s+=badge(320,355,'Identitas tetap sama','teal');break;
      case 'animation':
        s=routeBase()+'<circle cx="505" cy="165" r="10" fill="white" stroke="'+colors.gray+'" stroke-width="2" stroke-dasharray="3 3"/>'+text(490,110,'Posisi sebelumnya','svg-small','middle');
        s+=group(on(1),'<circle cx="550" cy="210" r="9" fill="white" stroke="'+colors.teal+'" stroke-width="2"/>'+text(610,320,'Keluaran berikutnya','svg-small','middle'));
        s+=group(on(2),'<g class="animated-bus">'+bus(550,210,'blue',D.demo.bus)+'</g>');
        s+=text(450,385,'Gerak di antara observasi adalah transisi visual.','svg-small','middle');break;
      case 'storage': {
        const rows=[['State worker','Bekal laporan berikutnya','purple'],['Histori perjalanan','Rangkaian catatan / insert','gray'],['Kondisi terakhir','Satu kondisi per bus / upsert','teal'],['Model browser','Data yang sudah diterima','blue']];
        rows.forEach((r,i)=>s+=group(on(i<2?i:2),'<rect x="55" y="'+(32+i*92)+'" width="790" height="78" rx="12" fill="white" stroke="#e0e7ef"/><circle cx="87" cy="'+(70+i*92)+'" r="6" fill="'+colors[r[2]]+'"/>'+text(112,77+i*92,r[0],'svg-node-title')+text(430,77+i*92,r[1],'svg-small')));
        break;
      }
      case 'fanout':
        s=node(30,150,240,120,'Informasi perjalanan','Posisi + waktu + konteks','blue');
        ['Dashboard','Analisis jarak tempuh','Headway & operasi'].forEach((label,i)=>s+=group(on(i),arrow(270,210,595,75+i*125,i===0?'blue':'gray',i!==0)+node(595,30+i*125,280,90,label,'Kebutuhan pemanfaatan',i===0?'blue':'gray')));
        break;
      case 'freshness':
        s=node(35,80,240,160,'Perangkat','Waktu laporan','orange')+text(65,183,'10:00:00','svg-clock');
        s+=group(on(1),arrow(275,160,330,160,'gray')+node(330,80,240,160,'Server','Waktu pengolahan','purple')+text(360,183,'10:00:08','svg-clock')+arrow(570,160,625,160,'gray')+node(625,80,240,160,'Browser','Waktu penerimaan','blue')+text(655,183,'10:00:10','svg-clock')+badge(190,275,'Usia laporan saat diterima: 10 detik','orange'));
        s+=group(on(2),'<path d="M85 350H815" stroke="#d9e2ef" stroke-width="2"/>'+['Bus','Broker','Forwarder','Antrean','Consumer','Publikasi','Marker'].map((t,i)=>'<circle cx="'+(85+i*122)+'" cy="350" r="5" fill="'+colors.blue+'"/>'+text(85+i*122,384,t,'svg-small','middle')).join(''));
        break;
    }
    const defs='<defs>'+Object.keys(colors).map(c=>'<marker id="arrow-'+c+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="'+colors[c]+'"/></marker>').join('')+'</defs>';
    return '<svg class="diagram" viewBox="0 0 900 430" role="img" aria-label="'+esc(scene.takeaway)+'">'+defs+s+'</svg>';
  }

  function evidenceBadge(scene) {
    const actual=scene.badge==='actual';
    return '<span class="evidence-badge'+(actual?' is-actual':'')+'">'+(actual?'Contoh aktual (diredaksi)':'Ilustrasi')+'</span>';
  }
  function minimap(scene, step) {
    const recap=scene.recapStep!==undefined&&step>=scene.recapStep;
    return '<ol class="minimap'+(recap?' is-recap':'')+'">'+D.stages.map((st,i)=>{
      const on=scene.stages==='all'||scene.stages.includes(st.id);
      const branch=st.id==='publish'&&scene.branch?'<span class="minimap-branch">↳ '+esc(D.branches[scene.branch])+'</span>':'';
      return '<li class="'+(on?'is-on':'')+'" style="--i:'+i+'">'+esc(st.label)+branch+'</li>';
    }).join('')+'</ol>';
  }
  function terms(scene, step) {
    const shown=(scene.terms||[]).filter(t=>t.step<=step);
    return shown.length?'<dl class="terms">'+shown.map(t=>'<div><dt>'+esc(t.term)+'</dt><dd>'+esc(t.def)+'</dd></div>').join('')+'</dl>':'';
  }
  function narrative(scene, step) {
    return '<div class="stage-foot"><div class="step-narrative" aria-live="polite"><span>'+(step+1)+' / '+scene.steps.length+'</span><p>'+esc(scene.steps[step])+'</p></div>'+terms(scene,step)+'</div>';
  }
  function eyebrow(scene) {
    return '<div class="eyebrow"><span>Babak '+(scene.chapter+1)+' / '+esc(D.chapters[scene.chapter])+'</span><span>'+esc(scene.kicker)+'</span></div>';
  }
  function coverHtml(scene, step) {
    return '<section class="stage is-cover">'+
      '<div class="cover"><div class="cover-copy"><p class="cover-meta"><span class="tiny-route">●──●──●</span> Sebuah perjalanan data</p>'+
      '<h1>A Glimpse Behind <em>Live Tracking.</em></h1><p class="cover-sub">From Bus to Dashboard</p>'+
      '<h2>'+esc(scene.title)+'</h2><p class="cover-takeaway">'+esc(scene.takeaway)+'</p></div>'+
      '<figure class="figure cover-figure">'+evidenceBadge(scene)+assetSlot(D.assets.dashboard,'is-screenshot')+'</figure></div>'+
      narrative(scene,step)+'</section>';
  }
  function sceneHtml(scene, step) {
    const aside=scene.aside?'<aside class="figure-aside">'+assetSlot(D.assets[scene.aside],'is-aside')+'</aside>':'';
    const replay=scene.visual==='animation'&&step>=2?'<button class="replay-button" data-replay>↻ Ulangi ilustrasi</button>':'';
    return '<section class="stage">'+eyebrow(scene)+
      '<div class="stage-title"><h1>'+esc(scene.title)+'</h1><p>'+esc(scene.takeaway)+'</p></div>'+
      '<figure class="figure'+(aside?' has-aside':'')+'">'+evidenceBadge(scene)+'<div class="figure-canvas">'+visual(scene,step)+'</div>'+aside+replay+'</figure>'+
      narrative(scene,step)+'</section>';
  }

  function playAnimation() {
    const canvas=document.querySelector('.figure-canvas');
    if(!canvas)return;
    clearTimeout(replayHandle);
    canvas.classList.remove('is-playing');void canvas.getBoundingClientRect();canvas.classList.add('is-playing');
    replayHandle=setTimeout(()=>canvas.classList.remove('is-playing'),1100);
  }
  function render() {
    clearTimeout(replayHandle);
    const scene=D.scenes[state.index];
    $('#minimap').innerHTML=minimap(scene,state.step);
    $('#main').innerHTML=scene.visual==='cover'?coverHtml(scene,state.step):sceneHtml(scene,state.step);
    const done=D.scenes.slice(0,state.index).reduce((n,s)=>n+s.steps.length,0)+state.step+1;
    $('#progress-bar').style.width=(done/totalSteps*100)+'%';
    $('#progress').setAttribute('aria-valuenow',String(state.index+1));
    $('#progress').setAttribute('aria-valuetext','Adegan '+(state.index+1)+' dari '+D.scenes.length);
    $('#previous').disabled=state.index===0&&state.step===0;
    $('#next').disabled=state.index===D.scenes.length-1&&state.step===scene.steps.length-1;
    document.title=scene.title+' · '+D.title;
  }
  function go(next) {
    const before=state;
    state=N.normalize(next,D.scenes);
    if(state.index!==before.index)history.replaceState(null,'',N.hash(state,D.scenes));
    render();
    const forward=state.index>before.index||(state.index===before.index&&state.step>before.step);
    if(forward&&D.scenes[state.index].visual==='animation'&&state.step===2)playAnimation();
  }

  function wake() {
    document.body.classList.remove('is-idle');
    clearTimeout(idleHandle);
    idleHandle=setTimeout(()=>{if(!$('.controls').matches(':hover,:focus-within'))document.body.classList.add('is-idle');},IDLE_MS);
  }
  ['mousemove','mousedown','touchstart'].forEach(type=>document.addEventListener(type,wake,{passive:true}));

  document.addEventListener('load',event=>{
    if(event.target.matches&&event.target.matches('.asset-slot img'))event.target.closest('.asset-slot').classList.add('is-loaded');
  },true);
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-replay]'))playAnimation();
  });
  $('#next').addEventListener('click',()=>go(N.next(state,D.scenes)));
  $('#previous').addEventListener('click',()=>go(N.previous(state,D.scenes)));
  $('#fullscreen').addEventListener('click',async()=>{
    try {if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}
    catch {$('#fullscreen').textContent='Gunakan fullscreen browser';}
  });
  document.addEventListener('fullscreenchange',()=>$('#fullscreen').textContent=document.fullscreenElement?'Keluar layar penuh':'Layar penuh');
  document.addEventListener('keydown',event=>{
    if(event.isComposing||event.ctrlKey||event.altKey||event.metaKey)return;
    if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    if(event.key===' '&&event.target.closest('button'))return;
    if(event.key==='ArrowRight'||event.key===' '){event.preventDefault();go(N.next(state,D.scenes));}
    else if(event.key==='ArrowLeft'){event.preventDefault();go(N.previous(state,D.scenes));}
  });
  window.addEventListener('hashchange',()=>{
    const target=N.parse(location.hash,D.scenes);
    if(target.index!==state.index){state=target;render();}
  });
  history.replaceState(null,'',N.hash(state,D.scenes));
  render();
  wake();
})();
