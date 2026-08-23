(()=>{
'use strict';
const root=document.querySelector('[data-research-graph]');
if(!root)return;
const svg=root.querySelector('.rg-canvas');
const detail=root.querySelector('.rg-detail');
const search=root.querySelector('.rg-search');
const confBtns=[...root.querySelectorAll('[data-conf]')];
const viewBtns=[...root.querySelectorAll('[data-research-view]')];
const NS='http://www.w3.org/2000/svg';
const W=1900,H=1120;
svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
const lang=()=>new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en';
const tr=(v)=>{if(!v)return''; if(typeof v==='string')return v; const l=lang();return v[l]||v.en||v.ar||Object.values(v)[0]||''};
const esc=s=>String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let nodes=[],edges=[],mode=localStorage.getItem('luxdot.research.view.v4')||'universe';
let activeConf=new Set(['A','B','C','D','E']);
let query='';
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
function confidence(rec){const c=String(rec.confidence||'').toUpperCase();return /^[A-E]$/.test(c)?c:(rec.external_sources>8?'A':rec.external_sources>2?'B':rec.external_sources>0?'C':'D')}
function titleOf(rec,id){return rec.title||id.replace(/\.html$/,'').replace(/[-_]/g,' ')}
function makeData(man){
 const map=new Map();
 Object.entries(man||{}).forEach(([id,r])=>{map.set(id,{id,title:titleOf(r,id),href:id,confidence:confidence(r),sources:+(r.external_sources||0),related:r.related||[]})});
 for(const n of map.values())for(const rel of n.related||[]){const rid=rel.id;if(!map.has(rid))map.set(rid,{id:rid,title:rel.title||titleOf({},rid),href:rid,confidence:'C',sources:0,related:[]})}
 nodes=[...map.values()];
 const seen=new Set();edges=[];
 for(const n of nodes)for(const rel of n.related||[]){if(!map.has(rel.id))continue;const k=[n.id,rel.id].sort().join('|');if(seen.has(k))continue;seen.add(k);edges.push([n.id,rel.id])}
}
function posUniverse(n,i){const groups=11,g=hash(n.id)%groups;const cx=210+(g%4)*500,cy=230+Math.floor(g/4)*370;const a=((hash(n.id+'a')%628)/100),r=55+(hash(n.id+'r')%145);return[cx+Math.cos(a)*r,cy+Math.sin(a)*r*.68]}
function posSky(n,i){const h=hash(n.id);return[80+(h%1740),80+((h>>>8)%940)]}
function posNeural(n,i){const col=i%10,row=Math.floor(i/10);return[120+col*180,100+(row%7)*145+((col%2)*45)]}
function posBoard(n,i){const col=i%8,row=Math.floor(i/8);return[150+col*220,130+(row%5)*190]}
function positions(list){const out={};list.forEach((n,i)=>{out[n.id]=(mode==='sky'?posSky:mode==='neural'?posNeural:mode==='motherboard'?posBoard:posUniverse)(n,i)});return out}
function colorClass(c){return 'rg-conf-'+String(c||'C').toLowerCase()}
function visibleNodes(){return nodes.filter(n=>activeConf.has(n.confidence)&&(!query||(n.title+' '+n.id).toLowerCase().includes(query)))}
function render(){
 const list=visibleNodes(),ids=new Set(list.map(n=>n.id)),pos=positions(list);svg.innerHTML='';
 const bg=document.createElementNS(NS,'g'),eg=document.createElementNS(NS,'g'),ng=document.createElementNS(NS,'g');svg.append(bg,eg,ng);
 for(let i=0;i<180;i++){const c=document.createElementNS(NS,'circle');c.setAttribute('cx',(hash('x'+i)%W));c.setAttribute('cy',(hash('y'+i)%H));c.setAttribute('r',i%5?0.8:1.4);c.setAttribute('class','rg-dust');bg.append(c)}
 if(mode==='universe')for(let g=0;g<11;g++){const e=document.createElementNS(NS,'ellipse');e.setAttribute('cx',210+(g%4)*500);e.setAttribute('cy',230+Math.floor(g/4)*370);e.setAttribute('rx',210);e.setAttribute('ry',145);e.setAttribute('class','rg-galaxy-halo');bg.append(e)}
 edges.forEach(([a,b])=>{if(!ids.has(a)||!ids.has(b))return;const p=pos[a],q=pos[b],line=document.createElementNS(NS,'path');const mx=(p[0]+q[0])/2;line.setAttribute('d',mode==='motherboard'?`M${p[0]},${p[1]} H${mx} V${q[1]} H${q[0]}`:`M${p[0]},${p[1]} L${q[0]},${q[1]}`);line.setAttribute('class','rg-edge');eg.append(line)});
 list.forEach((n,i)=>{const p=pos[n.id],g=document.createElementNS(NS,'g');g.setAttribute('class',`rg-node ${colorClass(n.confidence)}`);g.dataset.id=n.id;g.setAttribute('transform',`translate(${p[0]} ${p[1]})`);g.setAttribute('tabindex','0');
  const shape=document.createElementNS(NS,mode==='motherboard'?'rect':'circle');if(mode==='motherboard'){shape.setAttribute('x','-58');shape.setAttribute('y','-28');shape.setAttribute('width','116');shape.setAttribute('height','56');shape.setAttribute('rx','8')}else{shape.setAttribute('r',n.sources>8?'15':n.sources>2?'11':'8')}shape.setAttribute('class','rg-star-core');g.append(shape);
  const t=document.createElementNS(NS,'text');t.setAttribute('x','0');t.setAttribute('y',mode==='motherboard'?'44':'28');t.setAttribute('text-anchor','middle');t.setAttribute('class','rg-node-label');t.textContent=n.title.length>34?n.title.slice(0,32)+'…':n.title;g.append(t);
  const open=()=>showDetail(n);g.addEventListener('click',open);g.addEventListener('keydown',e=>{if(e.key==='Enter')open()});ng.append(g)
 });
 root.querySelectorAll('.rg-stat b')[0]?.replaceChildren(document.createTextNode(String(nodes.length)+'+'));
}
function showDetail(n){if(!detail)return;detail.innerHTML=`<div class="rg-detail-card"><b>${esc(n.title)}</b><p>${esc(n.id)}</p><p>Confidence: ${esc(n.confidence)} · Sources: ${n.sources}</p><a href="${encodeURI(n.href)}">Open research ↗</a></div>`}
function bind(){
 if(search){search.placeholder=lang()==='ar'?'ابحث عن بحث أو شخص أو مكان…':'Search research, person or place…';search.addEventListener('input',()=>{query=search.value.trim().toLowerCase();render()})}
 confBtns.forEach(b=>b.addEventListener('click',()=>{const c=b.dataset.conf;b.classList.toggle('active');b.classList.contains('active')?activeConf.add(c):activeConf.delete(c);render()}));
 viewBtns.forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.researchView;localStorage.setItem('luxdot.research.view.v4',mode);viewBtns.forEach(x=>x.classList.toggle('active',x===b));render()}));
 viewBtns.forEach(x=>x.classList.toggle('active',x.dataset.researchView===mode));
}
async function boot(){
 try{const r=await fetch('research-manifest.json?v=4165',{cache:'no-store'});if(!r.ok)throw new Error('manifest '+r.status);makeData(await r.json());bind();render();}
 catch(e){console.error('[LuxDot research graph]',e);if(detail)detail.innerHTML='<div class="rg-detail-card"><b>Research graph could not load.</b><p>'+esc(e.message)+'</p></div>'}
}
boot();
})();
