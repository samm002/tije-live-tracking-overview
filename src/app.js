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
    const rows=[];
    for(const paragraph of String(value).split('\n')) {
      let line='';
      for(const word of paragraph.split(' ')) {
        if(line&&(line+' '+word).length>limit){rows.push(line);line=word;}
        else line+=(line?' ':'')+word;
      }
      rows.push(line);
    }
    return rows.map((r,i)=>text(x,y+i*leading,r,cls)).join('');
  }
  function box(x,y,w,h,title,sub='',color='blue',titleClass='svg-node-title',titleLimit,subClass='svg-small',subLimit) {
    return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="white" stroke="${colors[color]}" stroke-width="2"/><path d="M${x} ${y+15}v${h-30}" stroke="${colors[color]}" stroke-width="5"/>`+wrap(x+18,y+34,title,titleClass,titleLimit||Math.floor((w-35)/12))+(sub?wrap(x+18,y+h-30,sub,subClass,subLimit||Math.floor((w-35)/10),24):'')+'</g>';
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
    const columns=4,width=215,height=120;
    const position=i=>({x:25+(Math.floor(i/columns)%2?columns-1-i%columns:i%columns)*245,y:75+Math.floor(i/columns)*190});
    return D.pipeline.map((label,i)=>{
      const {x,y}=position(i),next=i<D.pipeline.length-1?position(i+1):null;
      let connector='';
      if(next)connector=next.y!==y?arrow(x+width/2,y+height,next.x+width/2,next.y-5,'purple'):next.x>x?arrow(x+width,y+height/2,next.x-5,y+height/2,'purple'):arrow(x,y+height/2,next.x+width+5,y+height/2,'purple');
      return box(x,y,width,height,`${i+1}. ${label}`,'',i===D.pipeline.length-1?'blue':'purple','svg-pipeline-title',17)+connector;
    }).join('')+text(500,32,'1 GPS Point Journey','svg-mono','middle');
  }
  function visual(scene,step) {
    const on=n=>step>=n,compact=Boolean(scene.payload&&scene.payload!=='raw'),w=compact?700:1000;
    let s='';
    switch(scene.visual) {
      case 'overview':
        D.stages.forEach((stage,i)=>{
          const x=i<4?20+i*250:270+(i-4)*250,y=i<4?45:200;
          const sub=['Kirim laporan','Teruskan pesan','Seragamkan laporan','','Olah dan bagikan','',''][i];
          s+=group(i<4||on(1),box(x,y,210,100,stage.label,sub,i===4?'purple':'blue','svg-overview-title',15,'svg-overview-detail',23));
          if(i!==3&&i!==6)s+=group(i<3||on(1),arrow(x+210,y+50,x+243,y+50));
        });
        s+=group(on(1),'<path data-connection="queue-consumer" d="M875 150V175H375V195" fill="none" stroke="'+colors.blue+'" stroke-width="2.5" marker-end="url(#arrow-blue)"/>'+
          arrow(625,305,625,345,'gray',true)+box(450,350,370,100,'Layanan lain','Catat dan manfaatkan','gray'));
        break;
      case 'broker':
        s=box(25,135,255,150,'OBU /\nGPS Module','Publish','gray')+group(on(1),arrow(285,205,365,205)+box(370,135,255,150,'Source broker','Topic → subscription'))+group(on(2),arrow(630,205,710,205)+box(715,135,255,150,'Forwarder','Subscriber'));
        s+=text(325,175,'MQTT','svg-mono','middle')+text(670,175,'MQTT','svg-mono','middle')+text(500,355,'Publish topic: emq/gps/<source>/<busBodyNo>','svg-code','middle');break;
      case 'forwarder':
        s=group(on(1),'<g data-component="rabbitmq"><rect x="330" y="25" width="650" height="385" rx="14" fill="#f7f5fc" stroke="'+colors.purple+'" stroke-width="2"/>'+text(350,65,'RabbitMQ','svg-node-title')+
          box(360,115,585,105,'Exchange','','purple')+group(on(2),text(378,190,'type: x-consistent-hash · key: busBodyNo','svg-small'))+
          group(on(2),'<path d="M655 225V265H445V305" fill="none" stroke="'+colors.gray+'" stroke-width="2.5" marker-end="url(#arrow-gray)"/>'+arrow(655,225,655,305,'purple')+
          '<path d="M655 265H865V305" fill="none" stroke="'+colors.gray+'" stroke-width="2.5" marker-end="url(#arrow-gray)"/>'+
          ['Queue A','Queue B','Queue C'].map((label,i)=>box(350+i*210,310,190,90,label,['TJ-201, TJ-202, …','TJ-123, TJ-124, …','TJ-364, TJ-365'][i],i===1?'blue':'gray','svg-node-title',15,'svg-queue-buses',21)).join(''))+'</g>')+
          box(20,155,250,130,'Normalization','speed: "24" → 24')+group(on(1),arrow(275,220,350,170)+text(285,165,'AMQP','svg-mono'));
        s+=group(on(3),text(500,445,'Configured queues; the same bus follows a consistent route.','svg-small','middle'));break;
      case 'consumer':
        if(step===3){s=pipeline();break;}
        s=box(25,145,220,120,'Queue','Laporan banyak bus')+arrow(250,205,355,205)+box(360,145,320,120,'Pembagian tugas','Berdasarkan nomor body bus','purple');
        for(let i=0;i<4;i++)s+=box(740,20+i*102,220,88,i===3?'Worker...N':'Worker '+(i+1),i===0?'TJ-123':'',i===0?'purple':'gray');
        s+=group(on(1),arrow(685,205,730,64,'purple')+text(430,65,'TJ-123 mengikuti Worker 1','svg-node-title','middle'))+group(on(2),text(30,340,'Jumlah laporan per worker dibatasi','svg-node-title')+text(30,378,'agar worker tidak kewalahan.','svg-small'))+text(30,435,'Bus berbeda bisa diproses bersamaan.','svg-small');break;
      case 'enrichment':
        s=box(15,175,205,150,'Raw GPS message','TJ-123')+group(on(1),box(245,20,210,110,'Cron API','Provide Redis data','purple')+arrow(350,135,350,170,'purple')+box(245,175,210,150,'Redis','Reference cache','purple')+arrow(225,250,240,250,'purple'))+group(on(2),arrow(460,250,475,250,'teal')+box(480,175,205,150,'Enriched message','raw + enriched data','teal'))+text(350,390,'Redis lookup avoids database reads per GPS report.','svg-small','middle');break;
      case 'position':
        s=route(true)+bus(470,190,'orange','raw · 10:00:00')+group(on(0),'<circle cx="470" cy="190" r="85" fill="#c4731510" stroke="#c47315" stroke-dasharray="7 5"/>')+group(on(1),arrow(370,125,430,155,'purple')+text(25,55,'Radius + sequence + bearing + history','svg-node-title'))+group(on(2),tag(15,360,'Prev B','purple')+tag(200,360,'Current —')+tag(440,360,'Next C','teal')+text(350,415,'09:59:50 arrival B → 10:00:00 departure B','svg-small','middle'))+group(on(3),text(350,95,'Out-of-route: raw distance to trip geometry','svg-small','middle'));break;
      case 'snap': {
        const fallback=step===2;
        s=route(true)+`<circle cx="485" cy="165" r="12" fill="${colors.orange}"/>`+text(515,125,'Raw GPS','svg-node-title');
        if(on(1)&&!fallback)s+=`<path d="M485 165L465 182" stroke="${colors.orange}" stroke-width="3" stroke-dasharray="5 5"/><circle cx="465" cy="182" r="12" fill="${colors.teal}"/>`+text(365,315,'Snapped position','svg-node-title');
        s+=text(350,55,fallback?'Fallback scenario':'Candidates → bearing → continuity','svg-node-title','middle')+group(on(2),text(350,365,fallback?'Fallback → raw GPS':'Snapped coordinates only when eligible.','svg-small','middle'))+group(on(3),text(350,410,'Stop status is computed from raw GPS before snap.','svg-small','middle'));break;
      }
      case 'eta':
        s=text(500,80,'ETA = distance / speed','svg-formula','middle')+
          text(500,125,'distance: remaining route distance · speed: calculation speed','svg-small','middle')+
          group(on(1),text(500,195,'speed = max(device speed, 30 km/h)','svg-node-title','middle')+
          text(500,235,'Example: 1,000 m · device speed 24 km/h → calculation speed 30 km/h','svg-small','middle'))+
          group(on(2),text(500,305,'ETA (s) = (distance_m / 1,000) / speed_kmh × 3,600','svg-code','middle')+
          text(500,350,'= (1,000 / 1,000) / 30 × 3,600','svg-node-title','middle'))+
          group(on(3),text(500,425,'120 s = 2 min','svg-big','middle'));break;
      case 'progress-headway': {
        const example=D.progressExample,xFor=meters=>70+860*meters/example.routeLengthMeters;
        const current=xFor(example.positionMeters),other=xFor(example.otherPositionMeters);
        s=text(500,35,'Posisi bus di sepanjang lintasan','svg-node-title','middle')+'<path d="M70 230H930" class="route-base"/><path d="M70 230H930" class="route-line"/>';
        [[70,'A','0 m'],[500,'B','1.000 m'],[930,'C','2.000 m']].forEach(([x,label,value])=>{s+=`<circle cx="${x}" cy="230" r="10" fill="white" stroke="${colors.blue}" stroke-width="3"/>`+text(x,280,label,'svg-node-title','middle')+text(x,318,value,'svg-small','middle');});
        s+=bus(current,210,'blue',example.bus)+text(500,370,'TJ-123: 1.240 m sepanjang acuan lintasan','svg-node-title','middle');
        s+=group(on(1),bus(other,210,'purple',example.otherBus));
        s+=group(on(2),`<path d="M${current} 125V105H${other}V125" fill="none" stroke="${colors.teal}" stroke-width="3"/>`+text((current+other)/2,85,'400 m','svg-node-title','middle')+text(500,420,'1.640 m − 1.240 m = 400 m','svg-small','middle'));
        break;
      }
      case 'publish':
        s=box(20,155,260,130,'Hasil pengolahan','Posisi dan perjalanan','purple')+
          arrow(285,180,415,90,'purple')+box(420,25,550,115,'Ingat kondisi terakhir','Acuan untuk laporan berikutnya','purple')+
          group(on(1),arrow(285,225,415,250,'teal')+box(420,180,550,115,'Bagikan informasi terbaru','Pembaruan untuk dashboard dan layanan lain','teal'))+
          group(on(2),text(440,345,'Kabar kedatangan dikirim saat bus tiba.','svg-small'))+
          group(on(3),text(500,420,'TJ-123: meninggalkan B, menuju C','svg-node-title','middle'));break;
      case 'receivers':
        s=box(35,55,320,115,'Data tersimpan','Kondisi bus terakhir','gray')+arrow(360,112,605,112,'gray')+box(610,55,350,135,'Dashboard','Posisi bus di layar')+group(on(1),box(35,265,320,115,'Data terbaru','Informasi perjalanan')+arrow(360,320,605,155)+text(635,245,'Tampilan diperbarui','svg-node-title'))+text(500,430,'Data awal tampil, lalu mengikuti pembaruan yang diterima.','svg-small','middle');break;
      case 'impact':
        s=box(20,165,270,125,'Informasi perjalanan','Hasil kerja consumer','purple');
        [['Verifikasi jarak tempuh','Riwayat perjalanan untuk pemeriksaan',0],['Command Center','Posisi bus untuk pemantauan layanan',1],['TJ Apps','Informasi perjalanan di aplikasi',2],['PIS','Informasi perjalanan bagi penumpang',2]].forEach(([title,detail,reveal],i)=>{
          const y=20+i*105;
          s+=group(on(reveal),arrow(295,227,405,y+44,'teal')+box(410,y,565,90,title,detail,'teal','svg-node-title',40,'svg-small',49));
        });break;
      case 'tradeoff':
        s=text(500,32,'Lebih banyak laporan, lebih banyak data riwayat','svg-node-title','middle');
        [65,115,185,270].forEach((h,i)=>s+=`<rect x="${100+i*135}" y="${365-h}" width="75" height="${h}" rx="4" fill="${colors.gray}" fill-opacity="${.18+i*.16}"/>`);
        s+=text(310,410,'Ilustrasi pertumbuhan data riwayat','svg-small','middle')+text(310,442,'GPS, kedatangan, dan lainnya','svg-small','middle')+text(665,145,'Bahan evaluasi layanan','svg-node-title')+group(on(1),text(665,205,'Butuh ruang simpan','svg-node-title'))+group(on(2),text(665,290,'Berapa lama disimpan?','svg-node-title')+text(665,335,'Sesuaikan dengan kebutuhan','svg-small')+text(665,370,'pemeriksaan dan evaluasi.','svg-small'));break;
      case 'issues': {
        const cases=[['Queue backlog','Input rate > processing rate','Processing berat, dependency lambat, atau load tidak merata.','Pantau throughput, message age, dan bottleneck sebelum scaling.'],['Delayed / missing updates','Marker tertinggal atau berhenti','Koneksi device, broker, atau subscriber terganggu.','Bandingkan timestamp; periksa koneksi, reconnect, dan subscriber.'],['Marker vs stop status','Marker tampak di stop; arrival belum terdeteksi','Raw/snap berbeda, reference data atau state usang.','Bandingkan raw, snap, trip, radius, stop sequence, dan state.']];
        const [title,symptom,cause,action]=cases[step];
        s=text(30,52,title,'svg-issue-title')+
          text(570,110,'SYMPTOM','svg-mono')+wrap(570,145,symptom,'svg-text',34,28)+
          text(570,235,'POSSIBLE CAUSE','svg-mono')+wrap(570,270,cause,'svg-small',36,27)+
          text(570,360,'MITIGATION','svg-mono')+wrap(570,395,action,'svg-small',36,27);
        if(step===0) {
          s+=text(45,120,'Incoming reports','svg-node-title');
          for(let i=0;i<6;i++)s+='<rect x="'+(55+i*46)+'" y="145" width="32" height="24" rx="3" fill="'+colors.blue+'"/>';
          s+=arrow(190,175,190,215)+box(40,220,300,90,'Queue','','blue');
          for(let i=0;i<6;i++)s+='<rect x="'+(55+i*45)+'" y="269" width="30" height="25" rx="3" fill="'+colors.orange+'"/>';
          s+=arrow(345,265,385,265)+box(390,220,140,90,'Worker','','purple')+
            text(285,365,'Input rate > processing rate','svg-node-title','middle')+
            text(285,410,'Messages wait longer in the queue.','svg-small','middle');
        } else if(step===1) {
          s+=bus(90,195,'orange',D.demo.bus)+arrow(130,195,215,195,'gray',true)+
            box(220,145,135,105,'Broker','','blue')+arrow(360,195,390,195,'gray',true)+
            box(395,145,145,105,'Screen','','gray')+
            text(90,295,'10:00:00','svg-node-title','middle')+text(465,295,'10:00:10','svg-node-title','middle')+
            tag(130,365,'Report age: 10 s','orange')+
            text(285,420,'Illustrative timestamps; not a latency SLA.','svg-small','middle');
        } else {
          s+='<path d="M50 240H510" class="route-base"/><path d="M50 240H510" class="route-line"/>'+
            '<circle cx="360" cy="240" r="58" fill="#2463eb09" stroke="'+colors.blue+'" stroke-dasharray="6 5"/>'+
            '<circle cx="300" cy="130" r="12" fill="'+colors.orange+'"/>'+text(225,100,'Raw GPS','svg-node-title')+
            arrow(300,145,355,220,'orange',true)+bus(360,240,'teal')+text(360,320,'Stop B','svg-node-title','middle')+
            text(285,375,'Raw outside stop radius → no arrival','svg-small','middle')+
            text(285,420,'Snapped marker appears at the stop.','svg-small','middle');
        }
        break;
      }
      case 'recap':
        s=group(on(0),box(20,135,250,150,'Laporan bus','Posisi dan waktu'))+group(on(1),arrow(275,210,360,210)+box(365,135,265,150,'Pengolahan','Informasi perjalanan','purple'))+group(on(2),arrow(635,210,715,210,'teal')+box(720,135,260,150,'Pemanfaatan','Operasional dan penumpang','teal')+text(500,380,'Perhatikan waktu laporan. Waktu tiba merupakan perkiraan.','svg-node-title','middle'));break;
    }
    const defs='<defs>'+Object.keys(colors).map(c=>`<marker id="arrow-${c}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="${colors[c]}"/></marker>`).join('')+'</defs>';
    return `<svg class="diagram" viewBox="0 0 ${w} 460" role="img" aria-label="${esc(scene.takeaway)}">${defs}${s}</svg>`;
  }
  function payloadPanel(scene,step) {
    const stage=scene.payload,snapshot=D.payloads[stage];let fields;
    if(stage==='context') {
      const comparison=D.enrichmentComparison,enriched=step>=comparison.resultStep;
      const row=(key,label,isNew=false)=>`<div class="payload-row${isNew?' is-new':''}"><dt>${esc(label)}</dt><dd>${esc(JSON.stringify(snapshot[key]))}</dd></div>`;
      const input=comparison.inputFields.map(key=>row(key,key)).join('');
      const added=enriched?comparison.addedFields.map(({key,label})=>row(key,label,true)).join(''):'';
      return `<aside class="payload-panel payload-comparison" aria-label="${enriched?'Data setelah enrichment':'Data sebelum enrichment'}"><p class="payload-label">${enriched?'Data diperkaya':'Data awal'} · ${esc(D.demo.bus)}</p><dl>${input}${added}</dl></aside>`;
    }
    if(stage==='raw') {
      const entries=Object.entries(snapshot);
      const rows=entries.map(([key,value],i)=>{
        const visible=key==='busBodyNo'||key==='source'||(key==='deviceTimestamp'?step>=2:step>=1);
        return `<span class="json-row${visible?'':' is-pending'}"><span class="json-key">${esc('  '+JSON.stringify(key)+': ')}</span>${esc(JSON.stringify(value))}${i<entries.length-1?',':''}</span>`;
      }).join('\n');
      return `<aside class="payload-panel" aria-label="Raw Payload JSON"><p class="payload-label">Raw Payload · Illustration</p><pre class="raw-json">{\n${rows}\n}</pre><p class="payload-caption">Device timestamp (ms) · 21 Oct 2026, 10:00 WIB</p></aside>`;
    }
    if(stage==='raw')fields=Object.keys(snapshot);
    else if(stage==='context')fields=['bus_body_no',...D.additions.context];
    else if(stage==='position')fields=['bus_body_no',...D.additions.position];
    else if(stage==='snap')fields=['bus_body_no','latitude','longitude',...D.additions.snap];
    else if(stage==='eta')fields=['bus_body_no',...D.additions.eta];
    else fields=['bus_body_no',...D.additions.context];
    const additions=D.additions[stage]||[];
    const rows=fields.map(key=>{
      let value=snapshot[key];
      const visible=key==='busBodyNo'||key==='source'||(key==='deviceTimestamp'?step>=2:step>=1);
      const alternative=stage==='snap'&&step===2&&key.startsWith('snap_');
      if(alternative)value=null;
      return `<div class="payload-row${additions.includes(key)&&!alternative?' is-new':''}${stage==='raw'&&!visible?' is-pending':''}"><dt>${esc(key)}</dt><dd>${esc(JSON.stringify(value))}</dd></div>`;
    }).join('');
    const caption=stage==='snap'&&step===2?'Fallback scenario · no snapped coordinates':stage==='eta'?'ETA 120 s = 2 min · UID: acuan posisi terakhir; arrival adalah event terpisah.':stage==='final'?'Field sama dengan halaman 8; output juga memuat position, snap, ETA, dan headway.':'Selected fields · additions highlighted';
    return `<aside class="payload-panel${['context','final'].includes(stage)?' payload-context':''}" aria-label="Selected payload fields: ${esc(stage)}"><p class="payload-label">Payload · ${esc(D.demo.bus)}</p><dl>${rows}</dl><p class="payload-caption">${esc(caption)}</p></aside>`;
  }
  function minimap(scene,step) {
    if(['cover','qa'].includes(scene.visual))return '';
    return `<ol class="minimap${scene.recapStep!==undefined&&step>=scene.recapStep?' is-recap':''}">`+D.stages.map((st,i)=>`<li class="${scene.stages==='all'||scene.stages.includes(st.id)?'is-on':''}" style="--i:${i}">${esc(st.label)}${st.id==='output-broker'&&scene.branch?`<span class="minimap-branch">↳ ${esc(D.branches[scene.branch])}</span>`:''}</li>`).join('')+'</ol>';
  }
  function narrative(scene,step) {
    const terms=(scene.terms||[]).filter(t=>t.step===step);
    return `<footer class="stage-foot"><div class="step-narrative" aria-live="polite"><span>${step+1} / ${scene.steps.length}</span><p>${esc(scene.steps[step])}</p></div>`+(terms.length?'<dl class="terms">'+terms.map(t=>`<div><dt>${esc(t.term)}</dt><dd>${esc(t.def)}</dd></div>`).join('')+'</dl>':'')+'</footer>';
  }
  function photoSlot(key) {
    const asset=D.assets[key];
    return `<div class="photo-slot"><img src="${esc(asset.file)}" alt="${esc(asset.alt)}"><div class="photo-placeholder"><span>PHOTO PLACEHOLDER</span><strong>${esc(asset.label)}</strong><code>${esc(asset.file)}</code></div></div>`;
  }
  function hookFigure(step) {
    return `<figure class="figure hook-figure"><div class="hook-photo">${photoSlot('busPhoto')}<figcaption>Bus on the road</figcaption></div>`+
      `<div class="hook-connection${step<1?' is-pending':''}" aria-label="data flow"><span>data</span><svg viewBox="0 0 120 45" aria-hidden="true"><path d="M5 22H108M91 8L110 22L91 36"/></svg><strong>${step>=2?'?':''}</strong></div>`+
      `<div class="hook-photo${step<1?' is-pending':''}">${photoSlot('dashboardPhoto')}<figcaption>Live tracking dashboard</figcaption></div></figure>`;
  }
  function dashboardResult() {
    const data=D.dashboardExample;
    const map=`<svg class="diagram" viewBox="0 0 600 420" role="img" aria-label="Titik bus ${esc(data.uid)} pada ilustrasi live tracking"><path d="M40 110H560M60 310H550M145 30V385M425 25V390" class="map-road"/><path d="M45 280H170L280 170H405L540 290" class="route-base"/><path d="M45 280H170L280 170H405L540 290" class="route-line"/><circle cx="45" cy="280" r="9" fill="white" stroke="${colors.blue}" stroke-width="3"/><circle cx="330" cy="170" r="9" fill="white" stroke="${colors.blue}" stroke-width="3"/><circle cx="540" cy="290" r="9" fill="white" stroke="${colors.blue}" stroke-width="3"/>${text(45,320,'A','svg-node-title','middle')}${text(330,140,'B','svg-node-title','middle')}${text(540,330,'C','svg-node-title','middle')}<circle cx="445" cy="206" r="25" fill="${colors.blue}" fill-opacity=".12"/><circle cx="445" cy="206" r="10" fill="${colors.blue}" stroke="white" stroke-width="3"/>${text(445,265,data.uid,'svg-node-title','middle')}</svg>`;
    const snippet=JSON.stringify(data,null,2);
    return `<figure class="figure dashboard-result"><aside class="dashboard-json"><p>Simplified vehicle_update · JSON</p><pre>${esc(snippet)}</pre></aside><div class="dashboard-result-arrow" aria-hidden="true">→</div><div class="dashboard-map"><p>Live tracking · ilustrasi</p>${map}</div></figure>`;
  }
  function monitoringFigure(scene,step) {
    const view=scene.views[step],asset=D.assets[view.asset];
    return `<figure class="figure monitoring-figure"><div class="monitoring-description"><h2>${esc(view.title)}</h2><p class="monitoring-input">${esc(view.input)}</p><p>${esc(view.description)}</p></div><div class="photo-slot monitoring-screenshot"><img src="${esc(asset.file)}" alt="${esc(asset.alt)}"><div class="photo-placeholder"><strong>${esc(asset.label)}</strong><span>Screenshot belum tersedia</span></div></div></figure>`;
  }
  function sceneHtml(scene,step) {
    if(scene.visual==='cover') {
      const split=D.title.indexOf(':');
      return `<section class="stage bookend is-cover"><img class="cover-background" src="${esc(D.assets.coverBackground.file)}" alt="" aria-hidden="true"><h1><span class="cover-title-main">${esc(D.title.slice(0,split+1))}</span> <span class="cover-title-after">${esc(D.title.slice(split+1).trim())}</span></h1><div class="cover-route" aria-hidden="true">● ── ● ── ●</div></section>`;
    }
    if(scene.visual==='qa')return `<section class="stage bookend is-qa"><p class="cover-meta">TIJEMPOLAN</p><h1>${esc(scene.title)}</h1><p>${esc(scene.takeaway)}</p></section>`;
    let figure;
    if(scene.visual==='hook')figure=hookFigure(step);
    else if(scene.visual==='receivers'&&step===2)figure=dashboardResult();
    else if(scene.visual==='monitoring')figure=monitoringFigure(scene,step);
    else if(scene.visual==='source') {
      const a=D.assets[scene.aside];
      figure=`<figure class="figure source-figure"><div class="device-photo"><img src="${esc(a.file)}" alt="${esc(a.alt)}"><figcaption>On-board unit</figcaption></div>${payloadPanel(scene,step)}<div class="source-topic">MQTT publish → <code>${esc(D.sourceTopic)}</code><span>Example: ${esc(D.sourceTopicExample)}</span></div></figure>`;
    } else figure=`<figure class="figure${scene.payload?' has-payload':''}"><span class="evidence-badge">Ilustrasi</span><div class="figure-canvas">${visual(scene,step)}</div>${scene.payload?payloadPanel(scene,step):''}</figure>`;
    const context=scene.substage?`Consumer / ${scene.substage}`:scene.branch?`Broker / ${D.branches[scene.branch]}`:D.chapters[scene.chapter];
    return `<section class="stage"><div class="eyebrow"><span>${esc(context)}</span><span>${esc(scene.kicker)}</span></div><div class="stage-title"><h1>${esc(scene.title)}</h1><p>${esc(scene.takeaway)}</p></div>${figure}${narrative(scene,step)}</section>`;
  }
  function render() {
    const scene=D.scenes[state.index];
    $('#minimap').innerHTML=minimap(scene,state.step);$('#main').innerHTML=sceneHtml(scene,state.step);
    document.querySelectorAll('.photo-slot img').forEach(img=>{
      if(img.complete&&img.naturalWidth)img.closest('.photo-slot').classList.add('is-loaded');
    });
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
  document.addEventListener('load',event=>{
    if(event.target.matches&&event.target.matches('.photo-slot img'))event.target.closest('.photo-slot').classList.add('is-loaded');
  },true);
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
