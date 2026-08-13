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
