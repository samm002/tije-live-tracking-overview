(function () {
  'use strict';
  const D=window.TRACKING, N=window.TrackingNavigation;
  const $=s=>document.querySelector(s);
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const colors={blue:'#2463eb',purple:'#7c54c8',teal:'#078879',orange:'#c47315',ink:'#172b47',gray:'#64748b'};
  const totalSteps=D.scenes.reduce((n,s)=>n+s.steps.length,0);
  let state=N.parse(location.hash,D.scenes),idleHandle;
  const text=(x,y,v,cls='svg-text',anchor='start')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(v)}</text>`;
  function wrap(x,y,value,cls,limit,leading=29) {
    const rows=[];let line='';
    for(const word of String(value).split(' ')) {
      if(line&&(line+' '+word).length>limit){rows.push(line);line=word;}
      else line+=(line?' ':'')+word;
    }
    rows.push(line);return rows.map((r,i)=>text(x,y+i*leading,r,cls)).join('');
  }
  function box(x,y,w,h,title,sub='',color='blue') {
    return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="white" stroke="${colors[color]}" stroke-width="2"/><path d="M${x} ${y+15}v${h-30}" stroke="${colors[color]}" stroke-width="5"/>`+wrap(x+18,y+34,title,'svg-node-title',Math.floor((w-35)/12))+(sub?wrap(x+18,y+h-30,sub,'svg-small',Math.floor((w-35)/10),24):'')+'</g>';
  }
  const arrow=(x1,y1,x2,y2,color='blue',dashed=false)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${colors[color]}" stroke-width="2.5" ${dashed?'stroke-dasharray="7 5"':''} marker-end="url(#arrow-${color})"/>`;
  const group=(on,html)=>`<g class="${on?'reveal-on':'reveal-dim'}">${html}</g>`;
  const tag=(x,y,v,c='blue')=>`<g><rect x="${x}" y="${y-23}" width="${v.length*10+24}" height="34" rx="6" fill="${colors[c]}" fill-opacity=".08"/>${text(x+12,y,v,'svg-small')}</g>`;
  function bus(x,y,color='blue',label='') {
    return `<g transform="translate(${x} ${y})"><circle r="32" fill="white" stroke="${colors[color]}" stroke-width="2"/><rect x="-20" y="-20" width="40" height="33" rx="7" fill="${colors[color]}"/><rect x="-14" y="-14" width="28" height="14" rx="2" fill="white"/><circle cx="-11" cy="15" r="5" fill="${colors.ink}"/><circle cx="11" cy="15" r="5" fill="${colors.ink}"/>${label?text(0,-48,label,'svg-small','middle'):''}</g>`;
  }
  function route(compact=false) {
    const end=compact?650:930;
    return `<path d="M55 250H200L300 160H440L540 250H${end}" class="route-base"/><path d="M55 250H200L300 160H440L540 250H${end}" class="route-line"/>`+[[55,250,'A'],[350,160,'B'],[end,250,'C']].map(([x,y,t])=>`<circle cx="${x}" cy="${y}" r="11" fill="white" stroke="${colors.blue}" stroke-width="3"/>`+text(x,y+43,t,'svg-node-title','middle')).join('');
  }
  function pipeline() {
    return D.pipeline.map((label,i)=>{
      const x=15+(i<5?i:9-i)*198,y=75+Math.floor(i/5)*190;
      return box(x,y,180,120,`${i+1}. ${label}`,'',i===9?'blue':'purple')+(i<4?arrow(x+180,y+60,x+195,y+60,'purple'):i>=5&&i<9?arrow(x,y+60,x-15,y+60,'purple'):'');
    }).join('')+arrow(895,200,895,250,'purple')+text(500,32,'PROSES SATU LAPORAN GPS','svg-mono','middle');
  }
  function visual(scene,step) {
    const on=n=>step>=n,compact=Boolean(scene.payload&&scene.payload!=='raw'),w=compact?700:1000;
    let s='';
    switch(scene.visual) {
      case 'hook':
        s='<path d="M40 270H370" class="route-base"/>'+bus(190,255,'blue',D.demo.bus)+text(190,345,'Bus di jalan','svg-node-title','middle');
        s+=group(on(1),arrow(365,230,560,230)+text(455,195,'data','svg-small','middle')+'<rect x="590" y="60" width="360" height="310" rx="12" fill="#f5f8fc" stroke="#cbd7e6"/><path d="M610 300L710 185L785 240L925 110M650 85L670 345M870 85L815 345" class="map-road"/>'+bus(785,240,'teal')+text(770,405,'Marker di dashboard','svg-node-title','middle'));
        s+=group(on(2),text(460,285,'?','svg-big','middle'));break;
      case 'overview':
        ['Bus','Broker MQTT','Forwarder','RabbitMQ','Consumer','Publish','Dashboard'].forEach((label,i)=>{
          const x=i<4?20+i*250:270+(i-4)*250,y=i<4?70:275;
          s+=group(i<4||on(1),box(x,y,210,115,label,'',i===4?'purple':'blue'));
          if(i!==3&&i!==6)s+=group(i<3||on(1),arrow(x+210,y+57,x+243,y+57));
        });
        s+=group(on(1),arrow(875,190,875,245)+arrow(875,245,375,245)+arrow(375,245,375,270));break;
      case 'broker':
        s=box(25,135,255,150,'OBU / Module GPS','Publish','gray')+group(on(1),arrow(285,205,365,205)+box(370,135,255,150,'Broker terpusat','Topic → langganan'))+group(on(2),arrow(630,205,710,205)+box(715,135,255,150,'Forwarder','Subscriber'));
        s+=text(325,175,'MQTT','svg-mono','middle')+text(670,175,'MQTT','svg-mono','middle')+text(500,355,'Topic sumber: emq/gps/#','svg-code','middle');break;
      case 'forwarder':
        s=box(20,55,265,120,'Normalisasi','"24" → 24')+group(on(1),arrow(290,115,365,115)+box(370,55,265,120,'RabbitMQ','AMQP → exchange'))+group(on(2),arrow(640,115,725,115)+box(730,55,245,120,'Consistent hash','key: busBodyNo','purple'));
        ['Queue A','Queue B','Queue C'].forEach((label,i)=>s+=group(on(2),box(120+i*300,290,225,105,label,i===1?D.demo.bus:'bus lain',i===1?'blue':'gray')));
        s+=group(on(2),arrow(530,240,232,240,'gray',true)+arrow(232,240,232,285,'gray',true)+arrow(832,240,832,285,'gray',true)+arrow(850,180,850,240,'purple')+arrow(850,240,530,240,'purple')+arrow(530,240,530,285,'purple'))+group(on(3),text(500,435,'Queue disiapkan dari konfigurasi; bukan satu queue baru untuk setiap pesan.','svg-small','middle'));break;
      case 'consumer':
        if(step===3){s=pipeline();break;}
        s=box(25,145,220,120,'Satu queue','Laporan banyak bus')+arrow(250,205,355,205)+box(360,145,240,120,'Hash bus → worker','FNV(bus) % poolSize','purple');
        for(let i=0;i<4;i++)s+=box(740,20+i*102,220,88,'Goroutine '+(i+1),'',i===1?'purple':'gray');
        s+=group(on(1),arrow(605,205,730,165,'purple')+text(500,80,'BUS-DEMO-01 → jalur yang sama','svg-node-title','middle'))+group(on(2),text(30,340,'Prefetch 4 · delivery belum di-ACK','svg-node-title')+text(30,378,'ACK mengakui delivery ke broker.','svg-small'))+text(30,435,'Contoh konfigurasi checkout: 100 queue × 4 = 400 slot / instance.','svg-small');break;
      case 'enrichment':
        s=box(15,165,210,130,'Laporan + state','BUS-DEMO-01')+group(on(1),box(265,20,245,100,'Cron API','Isi sebagian referensi','purple')+arrow(385,125,385,160,'purple')+box(265,165,245,130,'Redis','Konteks + referensi','purple')+arrow(230,230,260,230,'purple'))+group(on(2),arrow(515,230,555,230,'teal')+box(560,165,125,130,'Trip','A–B–C','teal'))+text(345,375,'Consumer membaca Redis; tidak HTTP call per laporan.','svg-small','middle');break;
      case 'position':
        s=route(true)+bus(470,190,'orange','raw · 10:00:00')+group(on(0),'<circle cx="470" cy="190" r="85" fill="#c4731510" stroke="#c47315" stroke-dasharray="7 5"/>')+group(on(1),arrow(370,125,430,155,'purple')+text(25,55,'Radius + urutan + arah + history','svg-node-title'))+group(on(2),tag(15,360,'Prev B','purple')+tag(200,360,'Current —')+tag(440,360,'Next C','teal')+text(350,415,'09:59:50 tiba B → 10:00:00 departure B','svg-small','middle'))+group(on(3),text(350,95,'Out-of-route: jarak raw terhadap lintasan','svg-small','middle'));break;
      case 'snap': {
        const fallback=step===2;
        s=route(true)+`<circle cx="485" cy="165" r="12" fill="${colors.orange}"/>`+text(515,125,'Raw GPS','svg-node-title');
        if(on(1)&&!fallback)s+=`<path d="M485 165L465 182" stroke="${colors.orange}" stroke-width="3" stroke-dasharray="5 5"/><circle cx="465" cy="182" r="12" fill="${colors.teal}"/>`+text(365,315,'Snap ke lintasan','svg-node-title');
        s+=text(350,55,fallback?'Alternatif: pencocokan tidak valid':'Kandidat → arah → kesinambungan','svg-node-title','middle')+group(on(2),text(350,365,fallback?'Fallback → pakai raw':'Vehicle update memakai snap secara bersyarat.','svg-small','middle'))+group(on(3),text(350,410,'Status halte sudah dihitung dari raw sebelum snap.','svg-small','middle'));break;
      }
      case 'eta':
        s=text(350,80,'Sisa jarak rute → halte C','svg-node-title','middle')+text(350,155,'1.000 m','svg-big','middle')+group(on(1),text(350,225,'24 → minimum hitung 30 km/jam','svg-node-title','middle')+text(350,300,'ETA ≈ 2 menit','svg-big','middle'))+group(on(2),text(350,360,'Stopping point · posisi meter 1.240 m','svg-small','middle'))+group(on(3),text(350,408,'Headway · hubungan antarbus','svg-node-title','middle'));break;
      case 'publish':
        s=box(10,40,265,105,'State Redis','history:<bus>','purple')+group(on(1),arrow(280,90,365,90)+box(370,40,315,105,'Publish MQTT','Hasil sesuai penerima'));
        ['syntra/generic/<bus>','/vehicle-update/…/<bus>','syntra/gps_history/','syntra/arrival_history/'].forEach((topic,i)=>s+=group(on(i<2?1:2),text(30,205+i*52,topic,'svg-code')));
        s+=group(on(3),text(350,430,'Sebagian keluaran adalah event bersyarat.','svg-small','middle'));break;
      case 'receivers':
        s=box(20,55,240,115,'API / database','Snapshot awal','gray')+arrow(265,112,355,112,'gray')+box(360,55,255,115,'Dashboard','Live track + headway')+group(on(1),box(20,265,240,115,'MQTT','Vehicle update')+arrow(265,320,355,145)+text(415,225,'Pembaruan per bus','svg-small'))+group(on(2),box(700,55,275,145,'Celah halte','Arrival + generic + sensor','teal')+text(700,285,'Pemanfaatan lain: PIS / CC','svg-small')+text(700,320,'Mapping topic perlu verifikasi.','svg-small'))+text(500,430,'Prefetch halaman mengambil data awal; berbeda dari prefetch RabbitMQ.','svg-small','middle');break;
      case 'storage':
        s=box(20,65,420,115,'tije-bus-tracking','Latest GPS + enriched tracking','teal')+text(40,235,'UPSERT per bus','svg-big')+text(40,290,'bus_locations · bus_trackings','svg-code')+group(on(1),box(535,65,440,115,'tije-bus-histories','Rekaman historis','gray')+text(555,235,'INSERT rekaman baru','svg-node-title')+text(555,290,'gps_histories · arrival_histories','svg-code'))+group(on(2),text(555,350,'travel_time_segment','svg-code')+text(500,420,'State Redis, snapshot database, histori, dan model browser punya tujuan berbeda.','svg-small','middle'));break;
      case 'tradeoff':
        s=text(500,75,'Bus × frekuensi laporan × masa simpan','svg-node-title','middle');
        [80,140,230,340].forEach((h,i)=>s+=`<rect x="${100+i*135}" y="${390-h}" width="75" height="${h}" rx="4" fill="${colors.gray}" fill-opacity="${.18+i*.16}"/>`);
        s+=text(310,425,'Pertumbuhan ilustratif','svg-small','middle')+group(on(1),text(665,145,'Manfaat analisis','svg-node-title')+text(665,190,'Biaya simpan + baca','svg-node-title'))+group(on(2),text(665,280,'Opsi pengelolaan','svg-node-title')+text(665,325,'Retensi · partisi · arsip','svg-small')+text(665,370,'Sesuai kebutuhan data.','svg-small'));break;
      case 'issues': {
        const cases=[['Queue menumpuk','Laju masuk > laju proses','Proses berat / dependensi lambat / beban timpang','Pantau laju, umur pesan, dan bottleneck sebelum scaling.'],['Data terlambat / putus','Marker tertinggal atau berhenti','Koneksi perangkat / broker / jalur penerima','Periksa timestamp, koneksi, reconnect, dan subscriber.'],['Marker ≠ status halte','Tampak di halte, arrival belum terdeteksi','Raw/snap berbeda / referensi atau state usang','Bandingkan raw, snap, trip, urutan, radius, dan state.']];
        const [title,symptom,cause,action]=cases[step];
        s=text(45,65,title,'svg-big')+text(45,135,'GEJALA','svg-mono')+text(45,180,symptom,'svg-node-title')+text(45,245,'KEMUNGKINAN PENYEBAB','svg-mono')+text(45,290,cause,'svg-node-title')+'<path d="M45 325H950" stroke="#dce5ef"/>'+text(45,365,'DIAGNOSIS / OPSI MITIGASI','svg-mono')+text(45,410,action,'svg-text');break;
      }
      case 'recap':
        s=group(on(0),box(20,135,250,150,'Observasi','Identitas + GPS + waktu'))+group(on(1),arrow(275,210,360,210)+box(365,135,265,150,'Pengolahan','Konteks + state + hitung','purple'))+group(on(2),arrow(635,210,715,210,'teal')+box(720,135,260,150,'Informasi','Dashboard + layanan + histori','teal')+text(500,380,'Periksa kesegaran data. Baca ETA sebagai perkiraan.','svg-node-title','middle'));break;
    }
    const defs='<defs>'+Object.keys(colors).map(c=>`<marker id="arrow-${c}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${colors[c]}"/></marker>`).join('')+'</defs>';
    return `<svg class="diagram" viewBox="0 0 ${w} 460" role="img" aria-label="${esc(scene.takeaway)}">${defs}${s}</svg>`;
  }
  function payloadPanel(scene,step) {
    const stage=scene.payload,snapshot=D.payloads[stage];let fields;
    if(stage==='raw') {
      const entries=Object.entries(snapshot);
      const rows=entries.map(([key,value],i)=>{
        const visible=key==='busBodyNo'||key==='source'||(key==='deviceTimestamp'?step>=2:step>=1);
        return `<span class="json-row${visible?'':' is-pending'}"><span class="json-key">${esc('  '+JSON.stringify(key)+': ')}</span>${esc(JSON.stringify(value))}${i<entries.length-1?',':''}</span>`;
      }).join('\n');
      return `<aside class="payload-panel" aria-label="Raw Payload JSON"><p class="payload-label">Raw Payload · Ilustrasi</p><pre class="raw-json">{\n${rows}\n}</pre><p class="payload-caption">Timestamp milidetik · 21 Oktober 2026, 10:00 WIB</p></aside>`;
    }
    if(stage==='raw')fields=Object.keys(snapshot);
    else if(stage==='context')fields=['bus_body_no',...D.additions.context];
    else if(stage==='position')fields=['bus_body_no',...D.additions.position];
    else if(stage==='snap')fields=['bus_body_no','latitude','longitude',...D.additions.snap];
    else if(stage==='eta')fields=['bus_body_no',...D.additions.eta];
    else fields=['bus_body_no','trip_id','position_type','snap_latitude','estimated_time_next_stops'];
    const additions=D.additions[stage]||[];
    const rows=fields.map(key=>{
      let value=snapshot[key];
      const visible=key==='busBodyNo'||key==='source'||(key==='deviceTimestamp'?step>=2:step>=1);
      const alternative=stage==='snap'&&step===2&&key.startsWith('snap_');
      if(alternative)value=null;
      return `<div class="payload-row${additions.includes(key)&&!alternative?' is-new':''}${stage==='raw'&&!visible?' is-pending':''}"><dt>${esc(key)}</dt><dd>${esc(JSON.stringify(value))}</dd></div>`;
    }).join('');
    return `<aside class="payload-panel" aria-label="Field pilihan payload ${esc(stage)}"><p class="payload-label">${stage==='raw'?'Raw Payload':'Payload · '+esc(D.demo.bus)}</p><dl>${rows}</dl><p class="payload-caption">${stage==='raw'?'JSON ilustratif · 10:00 WIB':stage==='snap'&&step===2?'Alternatif fallback · snap tidak tersedia':stage==='eta'?'ETA 120 detik = 2 menit · field pilihan':'Field pilihan · tambahan disorot'}</p></aside>`;
  }
  function minimap(scene,step) {
    if(['cover','qa'].includes(scene.visual))return '';
    return `<ol class="minimap${scene.recapStep!==undefined&&step>=scene.recapStep?' is-recap':''}">`+D.stages.map((st,i)=>`<li class="${scene.stages==='all'||scene.stages.includes(st.id)?'is-on':''}" style="--i:${i}">${esc(st.label)}${st.id==='publish'&&scene.branch?`<span class="minimap-branch">↳ ${esc(D.branches[scene.branch])}</span>`:''}</li>`).join('')+'</ol>';
  }
  function narrative(scene,step) {
    const terms=(scene.terms||[]).filter(t=>t.step===step);
    return `<footer class="stage-foot"><div class="step-narrative" aria-live="polite"><span>${step+1} / ${scene.steps.length}</span><p>${esc(scene.steps[step])}</p></div>`+(terms.length?'<dl class="terms">'+terms.map(t=>`<div><dt>${esc(t.term)}</dt><dd>${esc(t.def)}</dd></div>`).join('')+'</dl>':'')+(scene.analogy?`<p class="analogy">${esc(scene.analogy)}</p>`:'')+'</footer>';
  }
  function sceneHtml(scene,step) {
    if(scene.visual==='cover')return `<section class="stage bookend"><p class="cover-meta">TIJEMPOLAN · SEBUAH PERJALANAN DATA</p><h1>${esc(D.title)}</h1><p>${esc(scene.takeaway)}</p><div class="cover-route" aria-hidden="true">● ── ● ── ●</div></section>`;
    if(scene.visual==='qa')return `<section class="stage bookend is-qa"><p class="cover-meta">TIJEMPOLAN</p><h1>${esc(scene.title)}</h1><p>${esc(scene.takeaway)}</p></section>`;
    let figure;
    if(scene.visual==='source') {
      const a=D.assets[scene.aside];
      figure=`<figure class="figure source-figure"><div class="device-photo"><img src="${esc(a.file)}" alt="${esc(a.alt)}"><figcaption>Contoh perangkat OBU</figcaption></div>${payloadPanel(scene,step)}<div class="source-topic">MQTT → <code>emq/gps/#</code><span>pola langganan sumber pada konfigurasi contoh</span></div></figure>`;
    } else figure=`<figure class="figure${scene.payload?' has-payload':''}"><span class="evidence-badge">Ilustrasi</span><div class="figure-canvas">${visual(scene,step)}</div>${scene.payload?payloadPanel(scene,step):''}</figure>`;
    const context=scene.substage?`Consumer / ${scene.substage}`:scene.branch?`Publish / ${D.branches[scene.branch]}`:D.chapters[scene.chapter];
    return `<section class="stage"><div class="eyebrow"><span>${esc(context)}</span><span>${esc(scene.kicker)}</span></div><div class="stage-title"><h1>${esc(scene.title)}</h1><p>${esc(scene.takeaway)}</p></div>${figure}${narrative(scene,step)}</section>`;
  }
  function render() {
    const scene=D.scenes[state.index];
    $('#minimap').innerHTML=minimap(scene,state.step);$('#main').innerHTML=sceneHtml(scene,state.step);
    document.body.classList.toggle('is-bookend',['cover','qa'].includes(scene.visual));
    const done=D.scenes.slice(0,state.index).reduce((n,s)=>n+s.steps.length,0)+state.step+1;
    $('#progress-bar').style.width=(done/totalSteps*100)+'%';
    $('#progress').setAttribute('aria-valuemax',String(D.scenes.length));$('#progress').setAttribute('aria-valuenow',String(state.index+1));$('#progress').setAttribute('aria-valuetext',`Slide ${state.index+1} dari ${D.scenes.length}`);
    $('#previous').disabled=state.index===0&&state.step===0;$('#next').disabled=state.index===D.scenes.length-1&&state.step===scene.steps.length-1;document.title=D.title;
  }
  function go(next) {
    const old=state;state=N.normalize(next,D.scenes);
    if(old.index!==state.index)history.replaceState(null,'',N.hash(state,D.scenes));render();
  }
  function wake() {
    document.body.classList.remove('is-idle');clearTimeout(idleHandle);
    idleHandle=setTimeout(()=>{if(!$('.controls').matches(':hover,:focus-within'))document.body.classList.add('is-idle');},2500);
  }
  ['mousemove','mousedown','touchstart','focusin'].forEach(type=>document.addEventListener(type,wake,{passive:true}));
  $('#next').addEventListener('click',()=>go(N.next(state,D.scenes)));$('#previous').addEventListener('click',()=>go(N.previous(state,D.scenes)));
  $('#fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('#fullscreen').textContent='Gunakan fullscreen browser';}});
  document.addEventListener('fullscreenchange',()=>$('#fullscreen').textContent=document.fullscreenElement?'Keluar layar penuh':'Layar penuh');
  document.addEventListener('keydown',event=>{
    if(event.isComposing||event.ctrlKey||event.altKey||event.metaKey)return;
    if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    if(event.key===' '&&event.target.closest('button'))return;
    if(event.key==='ArrowRight'||event.key===' '){event.preventDefault();go(N.next(state,D.scenes));}
    else if(event.key==='ArrowLeft'){event.preventDefault();go(N.previous(state,D.scenes));}
  });
  window.addEventListener('hashchange',()=>{state=N.parse(location.hash,D.scenes);render();});
  history.replaceState(null,'',N.hash(state,D.scenes));render();wake();
})();
