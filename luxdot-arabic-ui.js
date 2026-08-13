(()=>{
'use strict';
const AR=()=>document.documentElement.lang==='ar'||localStorage.getItem('luxdot.lang')==='ar';
const UI_SCRIPT_BASE=(()=>{const s=[...document.scripts].find(x=>/luxdot-arabic-ui\.js(?:\?|$)/.test(x.src));return s?new URL('.',s.src):new URL('.',location.href)})();
const asset=(n)=>new URL(`assets/thumbs-png/${n}.png`,UI_SCRIPT_BASE).href;
function stopAllAudio(){
  document.querySelectorAll('audio,video').forEach(m=>{try{m.pause();m.currentTime=0}catch{}});
  try{speechSynthesis.cancel()}catch{}
  document.dispatchEvent(new CustomEvent('luxdot:stop-audio'));
}
window.LuxDotStopAllAudio=stopAllAudio;
function arabizeBrand(){const ar=AR();document.querySelectorAll('.logo,.r-logo').forEach(el=>{el.textContent=ar?'نقطة نور':'LUXDOT';el.setAttribute('aria-label',ar?'نقطة نور':'LUXDOT')});document.querySelectorAll('.foot,.r-footer').forEach(el=>{const t=el.textContent.trim();if(ar&&/^LUXDOT$/i.test(t))el.textContent='نقطة نور';else if(!ar&&t==='نقطة نور')el.textContent='LUXDOT'});}
function polishArabicVisibleText(){if(!AR())return;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentElement;if(!p||/^(SCRIPT|STYLE|CODE|PRE)$/i.test(p.tagName))continue;const loc=p.closest('[data-locale]');if(loc&&loc.dataset.locale!=='ar')continue;let v=n.nodeValue;v=v.replace(/First Guardian/g,'الحارس الأول').replace(/\bLuxDot\b/g,'نقطة نور').replace(/\bLUXDOT\b/g,'نقطة نور').replace(/10 AUG 2026/g,'10 أغسطس 2026').replace(/11 AUG 2026/g,'11 أغسطس 2026').replace(/≈ 11:10 CEST/g,'≈ 11:10 بتوقيت وسط أوروبا الصيفي');n.nodeValue=v}}
function classify(el){const t=(el.textContent||'').toLowerCase();if(/مكتب|كتاب|نصوص/.test(t))return'library';if(/إيمان|دين|حكمة/.test(t))return'faith';if(/أرخبيل|جاو|إندونيس/.test(t))return'nusantara';if(/ذاكر|أطلس/.test(t))return'memory';if(/بحث|تحقيق/.test(t))return'research';if(/مشروع|رعاية/.test(t))return'projects';if(/شخص|أمير|ملك|شهيد|فيلسوف/.test(t))return'person';if(/كنيسة|مدينة|مكان|شام|بريدا|كيفلار/.test(t))return'place';if(/حدث|ذكرى|حادث|حج/.test(t))return'event';return'default'}
function enhanceCartouches(){if(!AR())return;document.querySelectorAll('main article,.cards .card,.r-card,.p,.layer,.knowledge-grid article,.map-card,.field-card,.source-card,.source-row,.case,.tree-node,.memory-dossier').forEach(el=>{
  if(el.dataset.luxEnhanced==='1')return;el.dataset.luxEnhanced='1';const link=el.querySelector('a[href]');const href=el.dataset.href||link?.getAttribute('href')||'';
  if(!el.querySelector(':scope > .lux-thumb')){const th=document.createElement('span');th.className='lux-thumb fallback';th.innerHTML=`<img alt="" src="${asset(classify(el))}">`;el.prepend(th)}
  el.style.position='relative';el.style.paddingInlineStart='82px';
  if(!href)return;el.classList.add('lux-cartouche');el.setAttribute('role','link');el.tabIndex=0;el.dataset.href=href;el.querySelectorAll('.btn').forEach(b=>b.remove());if(link&&!/^https?:/i.test(link.getAttribute('href')||''))link.remove();
  const hint=document.createElement('span');hint.className='lux-action-hint';el.appendChild(hint);
  const go=()=>{if(el.dataset.href)location.href=el.dataset.href};el.addEventListener('click',e=>{if(e.target.closest('a[href^="http"]'))return;go()});el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
});}
function photonSwarm(el){
  if(!el)return;
  const r=el.getBoundingClientRect(),x=r.left+r.width*.5,y=r.top+r.height*.44;
  const rays=document.createElement('div');rays.className='lux-book-rays';rays.style.left=x+'px';rays.style.top=y+'px';document.body.appendChild(rays);
  [-26,0,26].forEach((a,i)=>{const q=document.createElement('i');q.className='lux-light-ray';q.style.setProperty('--ra',`${a}deg`);q.style.setProperty('--rd',`${1.05+i*.14}s`);rays.appendChild(q)});
  for(let i=0;i<7;i++){
    setTimeout(()=>{
      const d=document.createElement('i');d.className='lux-dust';
      d.style.left=(x+(Math.random()-.5)*34)+'px';d.style.top=(y+(Math.random()-.5)*18)+'px';
      d.style.setProperty('--dx',`${(Math.random()-.5)*115}px`);
      d.style.setProperty('--dy',`${-38-Math.random()*115}px`);
      d.style.setProperty('--dr',`${(Math.random()-.5)*40}deg`);
      d.style.setProperty('--dd',`${4.1+Math.random()*3.6}s`);
      d.style.setProperty('--ds',`${.65+Math.random()*.75}`);
      document.body.appendChild(d);setTimeout(()=>d.remove(),8200);
    },180+Math.random()*780);
  }
  setTimeout(()=>rays.remove(),2200);
}
window.LuxDotPhotonSwarm=photonSwarm;
function bookBehavior(){
  const path=location.pathname.split('/').pop();const bookPages=new Set(['quran.html','tanakh.html','new-testament.html','gita.html','buddhist.html','guru-granth.html','avesta.html','jain.html','dao.html','analects.html','bahai.html','kojiki.html','serat-centhini.html','suluk-java.html','kakawin-ramayana.html','serat-wedhatama.html','primbon-java.html']);
  if(bookPages.has(path)){
    let close=document.querySelector('[data-close-sacred]');if(!close){close=document.createElement('button');close.className='lux-book-close';close.type='button';close.textContent=AR()?'إغلاق الكتاب والعودة إلى المكتبة':'Close book';document.body.appendChild(close)}else{close.classList.add('lux-book-close');if(AR())close.textContent='إغلاق الكتاب والعودة إلى المكتبة'}
    close.addEventListener('click',e=>{e.preventDefault();stopAllAudio();location.href='library.html'});
  }
  document.querySelectorAll('[data-close-sacred]').forEach(b=>b.addEventListener('click',()=>stopAllAudio(),{capture:true}));
  addEventListener('pagehide',stopAllAudio);addEventListener('beforeunload',stopAllAudio);
}
function blankBook(){const trigger=document.querySelector('[data-blank-book]');if(!trigger)return;const ov=document.createElement('div');ov.className='lux-blank-overlay';ov.innerHTML='<button type="button" class="lux-book-close">إغلاق الكتاب والعودة إلى المكتبة</button><div class="lux-blank-spread" aria-label="كتاب للأجيال القادمة"><div class="lux-blank-page"></div><div class="lux-blank-page lux-future-page"><div class="lux-future-note"><strong>تُرك هذا الكتاب فارغاً عمداً.</strong><span>ليس لأن الحكاية انتهت، بل لأنها لم تُكتب بعد.</span><span>هذه الصفحات للأجيال القادمة؛ لتكتب ما عرفته، وما صححته، وما رأت أننا لم نره.</span><em>لا ترثوا أجوبتنا فقط. اتركوا مكاناً لأجوبتكم.</em></div></div></div>';document.body.appendChild(ov);const close=ov.querySelector('button');trigger.addEventListener('click',()=>{photonSwarm(trigger);ov.classList.add('on')});close.addEventListener('click',()=>{stopAllAudio();ov.classList.remove('on');trigger.focus()});ov.addEventListener('click',e=>{if(e.target===ov){stopAllAudio();ov.classList.remove('on')}})}


function localizeLanguageOptions(){
  document.querySelectorAll('select[data-lang-select],select.lang-select').forEach(sel=>{
    [...sel.options].forEach(o=>{
      const v=o.value;
      if(!o.dataset.native)o.dataset.native=o.textContent;
      if(AR()){const m={ar:'العربية',en:'الإنكليزية',nl:'الهولندية',id:'الإندونيسية',jv:'الجاوية',he:'العبرية',es:'الإسبانية'};if(m[v])o.textContent=m[v]}
      else o.textContent=o.dataset.native;
    });
  });
}
function enhanceLegacyTrees(){
  if(!AR())return;
  document.querySelectorAll('.dual-tree .tree-lane').forEach(lane=>{
    if(lane.dataset.luxTree==='1')return;lane.dataset.luxTree='1';lane.classList.add('lux-legacy-tree-lane');
    const nodes=[...lane.querySelectorAll(':scope > .tree-node')];if(!nodes.length)return;
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('lux-legacy-tree-svg');
    svg.innerHTML='<defs><linearGradient id="legacyTreeG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#654325"/><stop offset=".55" stop-color="#778b4a"/><stop offset="1" stop-color="#63b779"/></linearGradient></defs>';lane.prepend(svg);
    const draw=()=>{[...svg.querySelectorAll('path,circle')].forEach(x=>x.remove());const lr=lane.getBoundingClientRect(),x=lane.clientWidth*.50,base=lane.clientHeight-18,top=52;
      const trunk=document.createElementNS(svg.namespaceURI,'path');trunk.setAttribute('d',`M${x},${base} C${x-8},${base-70} ${x+7},${top+75} ${x},${top}`);trunk.setAttribute('class','legacy-branch legacy-trunk');svg.appendChild(trunk);
      for(let i=0;i<8;i++){const r=document.createElementNS(svg.namespaceURI,'path'),rx=x+(i%2?1:-1)*(18+i*5),ry=base-2;r.setAttribute('d',`M${x},${base-4} C${x},${base+10} ${rx},${base+18+i*2} ${rx+(i%2?18:-18)},${base+26+i*2}`);r.setAttribute('class','legacy-branch legacy-root');svg.appendChild(r)}
      nodes.forEach((n,i)=>{const nr=n.getBoundingClientRect(),cy=nr.top-lr.top+nr.height/2;let port=n.querySelector(':scope > .node-port');if(!port){port=document.createElement('i');port.className='node-port';n.appendChild(port)}const pr=port.getBoundingClientRect(),px=pr.left-lr.left+pr.width/2,py=pr.top-lr.top+pr.height/2,mid=x+(px-x)*.44;const b=document.createElementNS(svg.namespaceURI,'path');b.setAttribute('d',`M${x},${cy} C${mid},${cy} ${mid},${py} ${px},${py}`);b.setAttribute('class','legacy-branch legacy-major');svg.appendChild(b);});
    };setTimeout(draw,60);addEventListener('resize',()=>setTimeout(draw,80));
  });
  document.querySelectorAll('.tree:not(.tree-shell):not(.dual-tree)').forEach(tree=>{
    const nodes=[...tree.children].filter(n=>n.classList?.contains('node'));if(nodes.length<2||tree.dataset.luxTree==='1')return;tree.dataset.luxTree='1';tree.classList.add('lux-simple-tree');
    nodes.forEach((n,i)=>{n.classList.add(i%2?'tree-side-left':'tree-side-right');if(!n.querySelector(':scope > .node-port')){const port=document.createElement('i');port.className='node-port';n.appendChild(port)}});
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('lux-simple-tree-svg');svg.innerHTML='<defs><linearGradient id="simpleTreeG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#654325"/><stop offset=".55" stop-color="#778b4a"/><stop offset="1" stop-color="#63b779"/></linearGradient></defs>';tree.prepend(svg);
    const draw=()=>{[...svg.querySelectorAll('path')].forEach(x=>x.remove());const tr=tree.getBoundingClientRect(),x=tree.clientWidth/2,base=tree.clientHeight-10;const trunk=document.createElementNS(svg.namespaceURI,'path');trunk.setAttribute('d',`M${x},${base} C${x-8},${base*.72} ${x+7},${base*.34} ${x},10`);trunk.setAttribute('class','legacy-branch legacy-trunk');svg.appendChild(trunk);nodes.forEach(n=>{const pr=n.querySelector('.node-port').getBoundingClientRect(),px=pr.left-tr.left+pr.width/2,py=pr.top-tr.top+pr.height/2,mid=x+(px-x)*.52;const b=document.createElementNS(svg.namespaceURI,'path');b.setAttribute('d',`M${x},${py} H${mid} Q${px},${py} ${px},${py}`);b.setAttribute('class','legacy-branch legacy-major');svg.appendChild(b)})};setTimeout(draw,80);addEventListener('resize',()=>setTimeout(draw,90));
  });
}

function repairImages(){
  document.querySelectorAll('img').forEach(img=>{
    if(img.dataset.luxRepair==='1')return;
    img.dataset.luxRepair='1';
    img.addEventListener('error',()=>{
      const fallback=asset('default');
      if(img.src!==fallback){img.src=fallback;img.classList.add('lux-image-fallback')}
    },{once:true});
  });
}

function drawCircuits(){
 document.querySelectorAll('.lux-circuit-layer').forEach(x=>x.remove());const pairs=[...document.querySelectorAll('[data-connect-to]')];if(!pairs.length)return;const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('lux-circuit-layer','lux-circuit');svg.style.cssText=`position:absolute;left:0;top:0;width:${document.documentElement.scrollWidth}px;height:${document.documentElement.scrollHeight}px`;svg.setAttribute('width',document.documentElement.scrollWidth);svg.setAttribute('height',document.documentElement.scrollHeight);document.body.appendChild(svg);
 pairs.forEach(src=>{const dst=document.getElementById(src.dataset.connectTo);if(!dst)return;let a=src.querySelector(':scope > .lux-port.out');if(!a){a=document.createElement('i');a.className='lux-port out';src.appendChild(a)}let b=dst.querySelector(':scope > .lux-port.in');if(!b){b=document.createElement('i');b.className='lux-port in';dst.appendChild(b)}const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect(),x1=ra.left+ra.width/2+scrollX,y1=ra.top+ra.height/2+scrollY,x2=rb.left+rb.width/2+scrollX,y2=rb.top+rb.height/2+scrollY,mx=x1+(x2-x1)*.5,d=`M${x1},${y1} H${mx} V${y2} H${x2}`;['base','signal'].forEach(c=>{const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',d);if(c==='signal')p.setAttribute('class','signal');svg.appendChild(p)})
 });
}
function init(){arabizeBrand();localizeLanguageOptions();polishArabicVisibleText();enhanceCartouches();enhanceLegacyTrees();bookBehavior();blankBook();repairImages();setTimeout(drawCircuits,80);addEventListener('resize',()=>setTimeout(drawCircuits,80))}
document.addEventListener('DOMContentLoaded',init);document.addEventListener('luxlang',()=>setTimeout(()=>{arabizeBrand();localizeLanguageOptions();polishArabicVisibleText();enhanceCartouches();enhanceLegacyTrees();repairImages();drawCircuits()},0));
})();

/* v2.9.5 Arabic-master interaction polish */
(()=>{
'use strict';
const isAR=()=>document.documentElement.lang==='ar'||localStorage.getItem('luxdot.lang')==='ar';
function prefix(){return location.pathname.includes('/research/')?'../':''}
function fullHeader(){
 if(!isAR())return;
 const nav=document.querySelector('header .nav'); if(!nav)return;
 const sel=nav.querySelector('select[data-lang-select],select.lang-select');
 const items=[['home.html','الرئيسية'],['library.html','المكتبة'],['faith.html','الإيمان والحكمة'],['nusantara.html','الأرخبيل الإندونيسي'],['memory.html','أطلس الذاكرة'],['research.html','الأبحاث الحية'],['projects.html','المشاريع']];
 const pre=prefix(), here=location.pathname.split('/').pop();
 nav.querySelectorAll('a,span').forEach(x=>x.remove());
 const frag=document.createDocumentFragment();
 items.forEach(([href,label])=>{const a=document.createElement('a');a.href=pre+href;a.textContent=label;if(here===href)a.classList.add('active');frag.appendChild(a)});
 if(sel){nav.insertBefore(frag,sel); if(sel.parentElement!==nav)nav.appendChild(sel)} else nav.appendChild(frag);
}
const icon=(kind)=>{
 const common='viewBox="0 0 48 48" aria-hidden="true" focusable="false"';
 const P={
 library:`<svg ${common}><path d="M8 10h9a5 5 0 0 1 5 5v23H13a5 5 0 0 0-5 5V10Zm32 0h-9a5 5 0 0 0-5 5v23h9a5 5 0 0 1 5 5V10Z"/><path d="M12 16h7M29 16h7M12 22h7M29 22h7"/></svg>`,
 research:`<svg ${common}><circle cx="20" cy="20" r="11"/><path d="m28 28 12 12M16 20h8M20 16v8"/></svg>`,
 projects:`<svg ${common}><path d="M8 37h32M11 32l9-10 7 6 10-15M34 13h4v4"/><circle cx="11" cy="32" r="2"/><circle cx="20" cy="22" r="2"/><circle cx="27" cy="28" r="2"/></svg>`,
 memory:`<svg ${common}><path d="M24 42V21M24 21l-9-8M24 21l9-8M24 29l-12 5M24 29l12 5M12 34H7M36 34h5"/><circle cx="24" cy="21" r="2"/><circle cx="15" cy="13" r="2"/><circle cx="33" cy="13" r="2"/></svg>`,
 faith:`<svg ${common}><path d="M11 35h26M16 32V16a8 8 0 0 1 16 0v16M20 14h8M24 10v8"/><path d="M10 40h28"/></svg>`,
 nusantara:`<svg ${common}><path d="M7 25c5-5 9-5 13 0M23 17c4-4 8-3 11 1M30 31c4-4 8-4 12 0M12 34c3-3 6-3 9 0"/><circle cx="10" cy="22" r="1.5"/><circle cx="28" cy="15" r="1.5"/><circle cx="38" cy="29" r="1.5"/></svg>`,
 care:`<svg ${common}><path d="M24 42s13-10 13-22a13 13 0 1 0-26 0c0 12 13 22 13 22Z"/><path d="M18 21h12M24 15v12"/></svg>`,
 bridge:`<svg ${common}><path d="M7 34h34M11 34V23M37 34V23M11 23c6-12 20-12 26 0M16 23v11M32 23v11"/></svg>`,
 pilgrimage:`<svg ${common}><path d="M10 39c8-13 18-19 29-29M12 10h12v12H12zM31 29h8v8h-8z"/><path d="M24 16h12"/></svg>`,
 crown:`<svg ${common}><path d="m8 16 8 8 8-13 8 13 8-8-4 21H12L8 16Z"/><path d="M13 33h22"/></svg>`,
 ear:`<svg ${common}><path d="M31 31c-1 8-13 9-13 1 0-4 6-6 6-12a7 7 0 0 0-14 0"/><path d="M30 14a9 9 0 0 1 2 6c0 7-6 8-6 13"/></svg>`,
 network:`<svg ${common}><circle cx="24" cy="24" r="4"/><circle cx="10" cy="14" r="3"/><circle cx="38" cy="14" r="3"/><circle cx="10" cy="36" r="3"/><circle cx="38" cy="36" r="3"/><path d="m13 16 8 6M35 16l-8 6M13 34l8-7M35 34l-8-7"/></svg>`,
 default:`<svg ${common}><circle cx="24" cy="24" r="14"/><path d="M13 24h22M24 13v22"/></svg>`
 };
 return P[kind]||P.default;
};
function semanticKind(el,area){const t=(el.textContent||'').toLowerCase();
 if(area==='home'){if(/مكتبة/.test(t))return'library';if(/إيمان|حكمة/.test(t))return'faith';if(/أرخبيل/.test(t))return'nusantara';if(/ذاكرة/.test(t))return'memory';if(/بحث/.test(t))return'research';if(/مشروع/.test(t))return'projects'}
 if(area==='research'){if(/أورانيا|ناسو/.test(t))return'crown';if(/هندريك|كيفلار|حج/.test(t))return'pilgrimage';if(/إيراسموس/.test(t))return'bridge';if(/مخلّص|مقارن/.test(t))return'network';if(/جاو|إندونيس/.test(t))return'nusantara';if(/شام|بريدا/.test(t))return'bridge';return'research'}
 if(area==='projects'){if(/رعاية/.test(t))return'care';if(/استماع/.test(t))return'ear';if(/بحث.*فعل|الفعل/.test(t))return'network';return'projects'}
 return'default'}
function traditionSymbol(t){if(/الإسلام/.test(t))return'☾';if(/اليهود/.test(t))return'✡';if(/المسيح/.test(t))return'✝';if(/الهندوس/.test(t))return'ॐ';if(/البوذ/.test(t))return'☸';if(/السيخ/.test(t))return'☬';if(/الزرادشت/.test(t))return'🔥';if(/البهائ/.test(t))return'✹';if(/الجايني/.test(t))return'☸';if(/الطاوي/.test(t))return'☯';if(/الكونفوش/.test(t))return'仁';if(/الشنتو/.test(t))return'神';if(/الجاوي|الإندونيسي/.test(t))return'ꦗ';return'•'}
function replaceSymbols(){if(!isAR())return;
 document.querySelectorAll('.cards .card').forEach(el=>{el.querySelector(':scope > .lux-thumb')?.remove();let i=el.querySelector(':scope > .lux-semantic-icon');if(!i){i=document.createElement('span');i.className='lux-semantic-icon';el.prepend(i)}i.innerHTML=icon(semanticKind(el,'home'))});
 document.querySelectorAll('.faith-tradition').forEach(el=>{el.querySelector(':scope > .lux-thumb')?.remove();let i=el.querySelector(':scope > .lux-tradition-icon');if(!i){i=document.createElement('span');i.className='lux-tradition-icon';el.prepend(i)}i.textContent=traditionSymbol(el.textContent)});
 const researchPage=/research\.html$/.test(location.pathname); if(researchPage)document.querySelectorAll('main article,.r-card').forEach(el=>{el.querySelector(':scope > .lux-thumb')?.remove();let i=el.querySelector(':scope > .lux-semantic-icon');if(!i){i=document.createElement('span');i.className='lux-semantic-icon';el.prepend(i)}i.innerHTML=icon(semanticKind(el,'research'))});
 const projectPage=/projects\.html$/.test(location.pathname); if(projectPage)document.querySelectorAll('article.p,main article').forEach(el=>{el.querySelector(':scope > .lux-thumb')?.remove();let i=el.querySelector(':scope > .lux-semantic-icon');if(!i){i=document.createElement('span');i.className='lux-semantic-icon';el.prepend(i)}i.innerHTML=icon(semanticKind(el,'projects'))});
}
function fallbackImages(){document.querySelectorAll('img[data-fallback-src]').forEach(img=>img.addEventListener('error',()=>{if(img.dataset.didFallback)return;img.dataset.didFallback='1';img.src=img.dataset.fallbackSrc},{once:true}))}
function oneLineHero(){const x=document.querySelector('.hero-one-line');if(x)x.setAttribute('aria-label',x.textContent.trim())}
function boot295(){fullHeader();replaceSymbols();fallbackImages();oneLineHero()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot295);else boot295();
document.addEventListener('luxlang',()=>setTimeout(boot295,0));
})();
