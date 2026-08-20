(() => {
'use strict';
const root=document.querySelector('[data-research-graph]');
if(!root)return;
const $=(s,c=root)=>c.querySelector(s), $$=(s,c=root)=>[...c.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const qLang=new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en';
const lang=qLang.toLowerCase();
const labels={
 ar:{title:'طريقة عرض الأبحاث',hint:'ثلاث طرق لنفس المعرفة',sky:'السماء',universe:'الكون',circuit:'الدارة',galaxy:'مجرة',cluster:'عنقود',system:'نظام',planet:'كوكب',moon:'قمر',asteroid:'كويكب'},
 en:{title:'Research view',hint:'Three models of the same knowledge',sky:'SKY',universe:'UNIVERSE',circuit:'CIRCUIT',galaxy:'Galaxy',cluster:'Cluster',system:'System',planet:'Planet',moon:'Moon',asteroid:'Asteroid'},
 nl:{title:'Onderzoeksweergave',hint:'Drie modellen van dezelfde kennis',sky:'HEMEL',universe:'HEELAL',circuit:'CIRCUIT',galaxy:'Melkweg',cluster:'Cluster',system:'Systeem',planet:'Planeet',moon:'Maan',asteroid:'Asteroïde'},
 he:{title:'תצוגת מחקר',hint:'שלושה מודלים של אותו ידע',sky:'שמיים',universe:'יקום',circuit:'מעגל',galaxy:'גלקסיה',cluster:'צביר',system:'מערכת',planet:'כוכב לכת',moon:'ירח',asteroid:'אסטרואיד'}
};
const L=labels[lang]||labels.en;
let selected=null;
let mode=localStorage.getItem('luxdot.research.view.v3')||'universe';

function svgEl(tag,attrs={}){
 const e=document.createElementNS(NS,tag);
 Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));
 return e;
}
function tabs(){
 $$('[data-research-view]').forEach(b=>{
  b.textContent=L[b.dataset.researchView]||b.dataset.researchView;
  b.classList.toggle('active',b.dataset.researchView===mode);
  b.setAttribute('aria-pressed',b.dataset.researchView===mode?'true':'false');
 });
 const title=$('[data-view-title]');if(title)title.textContent=L.title;
 const hint=$('[data-view-hint]');if(hint)hint.textContent=L.hint;
}
function internal(layout){
 const b=$(`.rg-layout-modes [data-layout="${layout}"]`);
 if(b){b.click();return true}
 return false;
}
function edges(){return $$('.rg-edge[data-a][data-b]')}
function nodes(){return $$('.rg-node[data-id]')}
function degrees(){
 const d={};edges().forEach(e=>{d[e.dataset.a]=(d[e.dataset.a]||0)+1;d[e.dataset.b]=(d[e.dataset.b]||0)+1});return d;
}
function parsePos(n){
 if(!n)return null;const m=(n.getAttribute('transform')||'').match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/);
 return m?[+m[1],+m[2]]:null;
}
function clearExtras(){
 $$('.rg-mode-legend,.rg-view-badge,.rg-circuit-board,.rg-universe-clusters').forEach(x=>x.remove());
 $$('.rg-orbit-ring,.rg-chip-body,.rg-chip-pins').forEach(x=>x.remove());
 nodes().forEach(n=>n.classList.remove('rg-role-system','rg-role-planet','rg-role-moon','rg-role-asteroid','rg-role-chip','rg-role-transistor'));
}
function classify(){
 const d=degrees();
 nodes().forEach(n=>{
  const deg=d[n.dataset.id]||0, kind=n.dataset.kind||'', conf=n.dataset.confidence||'B';
  let role=kind==='hub'||deg>=8?'system':kind==='research'?'planet':(conf==='D'||conf==='E')?'asteroid':'moon';
  n.classList.add('rg-role-'+role);
 });
}
function legend(items){
 const wrap=$('.rg-canvas-wrap');if(!wrap)return;
 const e=document.createElement('div');e.className='rg-mode-legend';
 items.forEach(x=>{const s=document.createElement('span');s.textContent=x;e.append(s)});wrap.append(e);
}
function badge(){
 const wrap=$('.rg-canvas-wrap');if(!wrap)return;
 const b=document.createElement('div');b.className='rg-view-badge';b.textContent=(L[mode]||mode)+' · SIGNAL PULSE';wrap.append(b);
}
function universe(){
 classify();
 const bg=$('.rg-sky-dust'), d=degrees();
 if(bg){
  const g=svgEl('g',{class:'rg-universe-clusters'});
  nodes().filter(n=>(d[n.dataset.id]||0)>=8&&n.dataset.id!=='luxdot').forEach(n=>{
    const p=parsePos(n);if(p)g.append(svgEl('circle',{cx:p[0],cy:p[1],r:72,class:'rg-cluster-ring'}));
  });
  bg.after(g);
 }
 nodes().forEach(n=>{
  if(n.classList.contains('rg-role-system')||n.classList.contains('rg-role-planet')){
    n.insertBefore(svgEl('circle',{r:n.classList.contains('rg-role-system')?30:21,class:'rg-orbit-ring'}),n.firstChild);
  }
 });
 legend([L.galaxy,L.cluster,L.system,L.planet,L.moon,L.asteroid]);
}
function ortho(a,b){
 const dx=Math.abs(b[0]-a[0]),dy=Math.abs(b[1]-a[1]);
 if(dx>dy){const m=(a[0]+b[0])/2;return `M${a[0]},${a[1]} H${m} V${b[1]} H${b[0]}`}
 const m=(a[1]+b[1])/2;return `M${a[0]},${a[1]} V${m} H${b[0]} V${b[1]}`
}
function chip(n){
 n.classList.add('rg-role-chip');
 n.insertBefore(svgEl('path',{class:'rg-chip-pins',d:'M-24 -8H-18 M-24 0H-18 M-24 8H-18 M18 -8H24 M18 0H24 M18 8H24'}),n.firstChild);
 n.insertBefore(svgEl('rect',{class:'rg-chip-body',x:-18,y:-12,width:36,height:24,rx:5}),n.firstChild);
}
function circuit(){
 classify();
 const all=nodes(), d=degrees(), groups=new Map();
 all.forEach(n=>{
  if(n.dataset.id==='luxdot')return;
  const f=(n.dataset.families||'meaning').split(',')[0]||'meaning';
  if(!groups.has(f))groups.set(f,[]);groups.get(f).push(n);
 });
 const fam=[...groups.keys()], x=[245,715,1185,1655], y=[275,845], centers=new Map(), pos=new Map();
 fam.forEach((f,i)=>centers.set(f,[x[i%4],y[Math.floor(i/4)%2]]));
 groups.forEach((arr,f)=>{
  const [cx,cy]=centers.get(f), cols=Math.max(3,Math.ceil(Math.sqrt(arr.length*1.35))),rows=Math.max(1,Math.ceil(arr.length/cols));
  const sx=Math.min(76,340/Math.max(1,cols-1)),sy=Math.min(72,250/Math.max(1,rows-1));
  arr.sort((a,b)=>(d[b.dataset.id]||0)-(d[a.dataset.id]||0));
  arr.forEach((n,i)=>{const xx=cx+(i%cols-(cols-1)/2)*sx,yy=cy+(Math.floor(i/cols)-(rows-1)/2)*sy;pos.set(n.dataset.id,[xx,yy]);n.setAttribute('transform',`translate(${xx} ${yy})`)});
 });
 const lux=$('.rg-node[data-id="luxdot"]');if(lux){pos.set('luxdot',[950,560]);lux.setAttribute('transform','translate(950 560)');chip(lux)}
 const eg=$('.rg-constellations');
 if(eg){
  const board=svgEl('g',{class:'rg-circuit-board'});
  fam.forEach(f=>{const [cx,cy]=centers.get(f);board.append(svgEl('rect',{class:'rg-board-zone',x:cx-205,y:cy-180,width:410,height:360,rx:22}));const tx=svgEl('text',{x:cx,y:cy-153});tx.textContent=f.toUpperCase();board.append(tx)});
  board.append(svgEl('rect',{class:'rg-board-zone rg-cpu-zone',x:882,y:505,width:136,height:110,rx:18}));
  const tx=svgEl('text',{x:950,y:590});tx.textContent='LUXDOT / CPU';board.append(tx);
  eg.parentNode.insertBefore(board,eg);
 }
 all.forEach(n=>{if(n.dataset.id!=='luxdot'){const isChip=n.dataset.kind==='research'||n.dataset.kind==='hub'||(d[n.dataset.id]||0)>=6;if(isChip)chip(n);else n.classList.add('rg-role-transistor')}});
 const map=new Map(nodes().map(n=>[n.dataset.id,n]));
 edges().forEach(e=>{const a=pos.get(e.dataset.a)||parsePos(map.get(e.dataset.a)),b=pos.get(e.dataset.b)||parsePos(map.get(e.dataset.b));if(a&&b)e.setAttribute('d',ortho(a,b))});
 legend(['CPU','CHIPS','TRANSISTORS','MEMORY','PROPHECY','PEOPLE','PLACES','EVIDENCE']);
}
function clearSignal(){
 $$('.rg-signal-active,.rg-signal-dim,.rg-signal-related,.rg-signal-source').forEach(x=>x.classList.remove('rg-signal-active','rg-signal-dim','rg-signal-related','rg-signal-source'));
}
function pulse(id){
 clearSignal();if(!id)return;
 const related=new Set([id]);
 edges().forEach(e=>{if(e.dataset.a===id||e.dataset.b===id){e.classList.add('rg-signal-active');related.add(e.dataset.a);related.add(e.dataset.b)}else e.classList.add('rg-signal-dim')});
 nodes().forEach(n=>{if(related.has(n.dataset.id))n.classList.add('rg-signal-related');else n.classList.add('rg-signal-dim');if(n.dataset.id===id)n.classList.add('rg-signal-source')});
}
function apply(newMode,persist=true){
 mode=['sky','universe','circuit'].includes(newMode)?newMode:'universe';
 if(persist)localStorage.setItem('luxdot.research.view.v3',mode);
 clearExtras();root.dataset.researchView=mode;
 if(mode==='sky')internal('network');else if(mode==='universe')internal('cosmos');else internal('fields');
 clearExtras();root.dataset.researchView=mode;
 if(mode==='universe')universe();if(mode==='circuit')circuit();
 badge();tabs();if(selected)requestAnimationFrame(()=>pulse(selected));
}
function ready(){
 const switcher=$('.rg-view-switch'), toolbar=$('.rg-toolbar'), graph=$('.rg-canvas');
 if(!switcher||!toolbar||!graph)return false;
 const canvasWrap=$('.rg-canvas-wrap'); if(canvasWrap && switcher.parentElement!==canvasWrap) canvasWrap.appendChild(switcher);
 switcher.addEventListener('click',e=>{const b=e.target.closest('[data-research-view]');if(b)apply(b.dataset.researchView,true)});
 root.addEventListener('click',e=>{const n=e.target.closest?.('.rg-node[data-id]');if(n){selected=n.dataset.id;requestAnimationFrame(()=>pulse(selected))}});
 tabs();apply(mode,false);return true;
}
let tries=0;const timer=setInterval(()=>{tries++;if(ready()||tries>40)clearInterval(timer)},100);
})();