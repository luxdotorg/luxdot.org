(()=>{
"use strict";
let DB=null,view='tree';
const V=document.getElementById('memoryView');
const D=document.getElementById('nodeDialog');
const titleEl=document.getElementById('memTitle');
const leadEl=document.getElementById('memLead');
if(!V||!D||!titleEl||!leadEl){console.error('LuxDot Memory: required DOM nodes missing');return}

const UI={
 en:['Memory is not a list of dates','A living atlas of people, places, crimes, rescue, resistance and reconciliation — sourced, versioned and open to correction'],
 ar:['الذاكرة ليست قائمة تواريخ','أطلس حي للأشخاص والأماكن والجرائم والإنقاذ والمقاومة والمصالحة — موثّق، مؤرشف بالإصدارات، وقابل للتصحيح'],
 nl:['Herinnering is geen lijst met data','Een levende atlas van mensen, plaatsen, misdaden, redding, verzet en verzoening — met bronnen, versies en ruimte voor correctie'],
 es:['La memoria no es una lista de fechas','Un atlas vivo de personas, lugares, crímenes, rescate, resistencia y reconciliación — con fuentes, versiones y abierto a corrección'],
 he:['זיכרון אינו רשימת תאריכים','אטלס חי של אנשים, מקומות, פשעים, הצלה, התנגדות ופיוס — מתועד, בגרסאות ופתוח לתיקון']
};
function lang(){return localStorage.getItem('luxdot.lang')||document.documentElement.lang||'en'}
function translateHead(){const a=UI[lang()]||UI.en;titleEl.textContent=a[0];leadEl.textContent=a[1]}
function esc(v=''){const s=String(v??'');return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function fmt(d){try{return new Intl.DateTimeFormat(lang(),{weekday:'short',day:'2-digit',month:'short'}).format(new Date(d+'T12:00:00'))}catch{return d}}
function openNode(id){
 const n=DB?.nodes?.find(x=>x.id===id); if(!n)return;
 D.innerHTML=`<article class="node-panel"><button class="closex" aria-label="Close">×</button><div class="node-meta">${fmt(n.date)} / ${esc(n.theme)} / ${esc(n.status)}</div><h2>${esc(n.title)}</h2><div class="node-meta">${esc(n.place)}</div>${n.image?`<img src="${esc(n.image)}" alt="${esc(n.title)}" loading="lazy" referrerpolicy="no-referrer"><div class="credit">${esc(n.imageCredit||'')}</div>`:''}<p>${esc(n.summary)}</p><p class="question">${esc(n.question)}</p><div class="link-row">${[...(n.sources||[]),...(n.media||[])].map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗</a>`).join('')}</div></article>`;
 D.classList.add('on');D.setAttribute('aria-hidden','false');D.querySelector('.closex')?.addEventListener('click',close)
}
function close(){D.classList.remove('on');D.setAttribute('aria-hidden','true')}
D.addEventListener('click',e=>{if(e.target===D)close()}); addEventListener('keydown',e=>{if(e.key==='Escape')close()});

function radialPoints(count){
 if(count<=0)return[];
 const out=[];
 for(let i=0;i<count;i++){
   const a=(-Math.PI/2)+(i/count)*Math.PI*2;
   const rx=count>10?38:34, ry=count>10?37:34;
   out.push([50+Math.cos(a)*rx,50+Math.sin(a)*ry]);
 }
 return out;
}
function tree(){
 const nodes=DB.nodes||[], pts=radialPoints(nodes.length);
 V.innerHTML=`<div class="tree-stage"><svg class="tree-lines" viewBox="0 0 100 100" preserveAspectRatio="none">${pts.map(p=>`<line x1="50" y1="50" x2="${p[0]}" y2="${p[1]}" stroke="rgba(125,255,174,.18)" stroke-width=".15"/>`).join('')}<circle cx="50" cy="50" r="24" fill="none" stroke="rgba(210,177,91,.12)" stroke-width=".12" stroke-dasharray="1 2"/></svg><div class="tree-center">LIVING<br>MEMORY</div>${nodes.map((n,i)=>`<button class="memory-node" data-id="${esc(n.id)}" style="left:${pts[i][0]}%;top:${pts[i][1]}%"><time>${fmt(n.date)}</time><b>${esc(n.title)}</b><small>${esc(n.theme)}</small></button>`).join('')}</div>`;
 bindNodes();
}
function timeline(){V.innerHTML=`<div class="timeline">${(DB.nodes||[]).map(n=>`<article class="time-row" data-id="${esc(n.id)}"><div class="time-date">${fmt(n.date)}</div><div><h3>${esc(n.title)}</h3><p>${esc(n.summary)}</p></div></article>`).join('')}</div>`;bindNodes()}
function map(){
 const nodes=(DB.nodes||[]).filter(n=>Number.isFinite(n.lat)&&Number.isFinite(n.lon));
 const bounds={minLat:35,maxLat:58,minLon:-10,maxLon:30};
 const pos=n=>[(n.lon-bounds.minLon)/(bounds.maxLon-bounds.minLon)*84+8,(bounds.maxLat-n.lat)/(bounds.maxLat-bounds.minLat)*78+11];
 V.innerHTML=`<div class="map-wrap"><div class="map-canvas"><svg class="europe" viewBox="0 0 400 300" aria-hidden="true"><path d="M36 71L78 45l46 14 35-27 41 18 25-12 48 22 15 39 48 25 16 48-36 25-9 41-44 6-31-21-31 14-38-24-40-3-22-34-31-11-17-36z" fill="none" stroke="rgba(125,255,174,.5)" stroke-width="2"/><path d="M143 214l26 25-8 43-22 8-17-33zM206 216l25 17 4 50-17 7-17-38z" fill="none" stroke="rgba(125,255,174,.4)"/></svg>${nodes.map(n=>{const p=pos(n);return`<button title="${esc(n.title)}" data-id="${esc(n.id)}" class="map-dot" style="left:${p[0]}%;top:${p[1]}%"><span class="map-label">${esc(n.title)}</span></button>`}).join('')}</div><div class="map-list">${nodes.map(n=>`<article class="map-card" data-id="${esc(n.id)}"><b>${esc(n.title)}</b><small>${esc(n.place)} · ${fmt(n.date)}</small></article>`).join('')}</div></div>`;bindNodes()
}
function field(){V.innerHTML=`<div class="field-grid">${(DB.field||[]).map(f=>`<article class="field-card"><span class="badge">${fmt(f.date)} / ${esc(String(f.kind||'').toUpperCase())}</span><b>${esc(f.title)}</b><small>${esc(f.city)} · ${esc(f.time)}<br>${esc(f.address)}<br><br>${esc(f.note)}</small></article>`).join('')}</div>`}
function sources(){let all=[];(DB.nodes||[]).forEach(n=>(n.sources||[]).forEach(s=>all.push({...s,node:n.title,date:n.date})));V.innerHTML=`<div class="source-grid">${all.map(s=>`<article class="source-card"><small>${fmt(s.date)} · ${esc(s.node)}</small><br><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗</a></article>`).join('')}</div>`}
function bindNodes(){V.querySelectorAll('[data-id]').forEach(el=>el.addEventListener('click',()=>openNode(el.dataset.id)))}
function render(){if(!DB)return;({tree,timeline,map,field,sources}[view]||tree)()}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{view=b.dataset.view;document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('on',x===b));render()}));
document.addEventListener('luxlang',()=>{translateHead();render()});

async function boot(){
 translateHead(); V.innerHTML='<div class="status">Loading living memory…</div>';
 // Embedded copy makes the Atlas work on file://, static hosts and offline previews.
 if(window.LUXDOT_MEMORY_DB){DB=window.LUXDOT_MEMORY_DB;render();return}
 try{
   const r=await fetch('data/memory-atlas.json',{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);DB=await r.json();render();
 }catch(err){console.error('LuxDot Memory load failed',err);V.innerHTML='<div class="status">Memory dataset could not be loaded</div>'}
}
boot();
})();
