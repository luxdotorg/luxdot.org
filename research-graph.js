
(()=>{
'use strict';

const root=document.querySelector('[data-research-graph]');
if(!root) return;

const svg=root.querySelector('.rg-canvas');
const detail=root.querySelector('.rg-detail');
const search=root.querySelector('.rg-search');
const confBtns=[...root.querySelectorAll('[data-conf]')];
const viewBtns=[...root.querySelectorAll('[data-research-view]')];
if(!svg) return;

const NS='http://www.w3.org/2000/svg';
const W=1800,H=1020;
svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
svg.setAttribute('preserveAspectRatio','xMidYMid meet');

const style=document.createElement('style');
style.id='luxdot-research-engine-v4166';
style.textContent=`
[data-research-graph] .rg-canvas{width:100%;height:auto;min-height:720px;background:#020806;border-radius:24px}
[data-research-graph] .rg-edge{fill:none;stroke:rgba(129,235,167,.17);stroke-width:1}
[data-research-graph] .rg-edge.major{stroke:rgba(213,189,104,.34);stroke-width:1.35}
[data-research-graph] .rg-star-core{fill:#07160e;stroke:#70d99b;stroke-width:1.4}
[data-research-graph] .rg-node.major .rg-star-core{stroke:#dfc46b;stroke-width:2}
[data-research-graph] .rg-node.hub .rg-star-core{fill:#0b2417;stroke:#f0d47b;stroke-width:2.4}
[data-research-graph] .rg-node-label{font:600 11px "Noto Kufi Arabic","Segoe UI",Arial,sans-serif;fill:#d8e5dc;paint-order:stroke;stroke:#020806;stroke-width:3px;stroke-linejoin:round;pointer-events:none}
[data-research-graph] .rg-node-label.minor{opacity:.56;font-size:9px}
[data-research-graph] .rg-galaxy-halo{fill:rgba(20,66,39,.08);stroke:rgba(115,221,154,.16);stroke-width:1}
[data-research-graph] .rg-galaxy-label{font:700 14px "Noto Kufi Arabic","Segoe UI",Arial,sans-serif;fill:#d9c46f;letter-spacing:.02em;paint-order:stroke;stroke:#020806;stroke-width:4px}
[data-research-graph] .rg-dust{fill:#dff8e8;opacity:.36}
[data-research-graph] .rg-neural-lobe{fill:none;stroke:rgba(113,223,151,.14);stroke-width:2}
[data-research-graph] .rg-neural-path{fill:none;stroke:rgba(106,232,160,.18);stroke-width:1.1}
[data-research-graph] .rg-board-grid{stroke:rgba(80,205,125,.11);stroke-width:1}
[data-research-graph] .rg-board-chip{fill:rgba(5,25,13,.72);stroke:rgba(107,232,153,.38);stroke-width:1.2}
[data-research-graph] .rg-board-trace{fill:none;stroke:rgba(104,232,151,.27);stroke-width:1.2}
[data-research-graph] .rg-detail-card{border:1px solid rgba(111,229,151,.24);border-radius:16px;padding:15px;background:#041009;color:#eaf6ed}
[data-research-graph] .rg-detail-card b{color:#e1c86f}
[data-research-graph] .rg-detail-card a{color:#8ce7a9}
[data-research-graph] .rg-view-tab.active{border-color:#d7ba59!important;color:#e5cb72!important}
`;
document.head.append(style);

const lang=()=>new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en';
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const safeTitle=t=>String(t||'').replace(/\s*·\s*LuxDot\s*$/i,'').replace(/\s*\|\s*LuxDot\s*$/i,'').trim();

let nodes=[],edges=[],degree={};
let mode=localStorage.getItem('luxdot.research.view.v4')||'sky';
let query='';
let activeConf=new Set(['A','B','C','D','E']);

const skipIds=new Set([
 'research.html','home.html','index.html','faith.html','projects.html','memory.html','library.html',
 'humanity.html','media.html','audiovisual.html','witness.html'
]);

const GALAXIES=[
 {id:'savior',label:{ar:'الخلاص والنبوءات',en:'Savior & Prophecy'},keys:/savior|mahdi|messiah|messian|chosen|red-heifer|apocalyp|qaim|mashiach|مخل|مهدي|مسيح|نبوء/},
 {id:'jewish',label:{ar:'اليهودية والسفارديم',en:'Judaism & Sephardim'},keys:/jew|talmud|kabb|seph|maimon|abulafia|karo|yosef|sabbatai|luria|يهود|قبالا|تلمود|سفارد/},
 {id:'shaam',label:{ar:'شام وبرابانت',en:'Chaam & Brabant'},keys:/chaam|shaam|brabant|breda|alphen|hoogstraten|tongerlo|nassau|withagen|velthoven|شام|برابانت|بريدا/},
 {id:'history',label:{ar:'التاريخ والحضارات',en:'History & Civilizations'},keys:/history|egypt|prewriting|archae|templar|medieval|roman|civilization|تاريخ|حضار|آثار|هيكل/},
 {id:'science',label:{ar:'العلوم والحدود',en:'Science & Frontiers'},keys:/science|quantum|genetic|cognition|neuro|biology|physics|chem|psychoactive|علم|كموم|جين|إدراك/},
 {id:'memory',label:{ar:'الذاكرة والشهادة',en:'Memory & Witness'},keys:/memory|martyr|ghouta|westerweel|kolbe|stein|roger|witness|ذاكرة|شهيد|غوطة|شهادة/},
 {id:'language',label:{ar:'الرمز واللغة والعدد',en:'Symbol, Language & Number'},keys:/letter|number|gematria|jafr|huruf|lexicon|symbol|name-date|حرف|عدد|جفر|رمز|اسم/},
 {id:'journey',label:{ar:'الرحلات والحج والإشارة',en:'Journeys & Pilgrimage'},keys:/journey|pilgrim|kevelaer|busman|petra|burckhardt|signal|حج|رحل|بترا|إشارة/},
 {id:'people',label:{ar:'الأشخاص والعائلات',en:'People & Families'},keys:/family|network|prince|person|genealog|de-koning|janssen|midwives|عائلة|شبكة|أمير|نسب/},
 {id:'knowledge',label:{ar:'المعرفة والمنهج',en:'Knowledge & Method'},keys:/knowledge|law|method|epistem|research-standard|balance|falsification|معرفة|منهج|قانون|تفنيد/}
];

function galaxyOf(n){
 const z=(n.id+' '+n.title).toLowerCase();
 return (GALAXIES.find(g=>g.keys.test(z))||GALAXIES[9]).id;
}
function confOf(rec){
 const c=String(rec.confidence||'').toUpperCase();
 if(/^[A-E]$/.test(c)) return c;
 const s=Number(rec.external_sources||0);
 if(s>=12) return 'A';
 if(s>=5) return 'B';
 if(s>=1) return 'C';
 return 'D';
}
function build(man){
 const map=new Map();
 Object.entries(man||{}).forEach(([id,r])=>{
   const rid=r.id||id;
   if(skipIds.has(rid)) return;
   const n={
     id:rid,
     title:safeTitle(r.title||rid.replace(/\.html$/,'').replace(/[-_]/g,' ')),
     href:rid,
     sources:Number(r.external_sources||0),
     confidence:confOf(r),
     related:(r.related||[]).filter(x=>x&&x.id&&!skipIds.has(x.id)),
     review:r.review_status||''
   };
   n.galaxy=galaxyOf(n);
   map.set(n.id,n);
 });
 for(const n of map.values()){
   for(const rel of n.related){
     if(!map.has(rel.id) && /\.html$/i.test(rel.id)){
       const m={
         id:rel.id,
         title:safeTitle(rel.title||rel.id.replace(/\.html$/,'').replace(/[-_]/g,' ')),
         href:rel.id,sources:0,confidence:'C',related:[],review:''
       };
       m.galaxy=galaxyOf(m);
       map.set(m.id,m);
     }
   }
 }
 nodes=[...map.values()];
 edges=[];
 const seen=new Set();
 degree={};
 for(const n of nodes){
   for(const rel of n.related){
     if(!map.has(rel.id)) continue;
     const k=[n.id,rel.id].sort().join('|');
     if(seen.has(k)) continue;
     seen.add(k);
     edges.push([n.id,rel.id]);
     degree[n.id]=(degree[n.id]||0)+1;
     degree[rel.id]=(degree[rel.id]||0)+1;
   }
 }
 nodes.forEach(n=>{
   n.degree=degree[n.id]||0;
   n.major=n.sources>=8||n.degree>=5||/atlas|galaxy|network|master|matrix/i.test(n.id);
 });
}

function filtered(){
 return nodes.filter(n=>{
   if(!activeConf.has(n.confidence)) return false;
   if(query && !(n.title+' '+n.id).toLowerCase().includes(query)) return false;
   return true;
 });
}
function make(tag,attrs={},text=''){
 const el=document.createElementNS(NS,tag);
 for(const [k,v] of Object.entries(attrs)) el.setAttribute(k,String(v));
 if(text) el.textContent=text;
 return el;
}
function clear(){
 svg.innerHTML='';
}
function addDust(bg,count=150){
 for(let i=0;i<count;i++){
   const x=35+(hash('dx'+i)%(W-70)), y=30+(hash('dy'+i)%(H-60));
   bg.append(make('circle',{cx:x,cy:y,r:i%7===0?1.5:.7,class:'rg-dust'}));
 }
}
function showDetail(n){
 if(!detail) return;
 detail.innerHTML=`<div class="rg-detail-card"><b>${esc(n.title)}</b><p>${esc(n.id)}</p><p>Confidence ${esc(n.confidence)} · Sources ${n.sources} · Links ${n.degree}</p><a href="${encodeURI(n.href)}?lang=${encodeURIComponent(lang())}">${lang()==='ar'?'فتح البحث':'Open research'} ↗</a></div>`;
}
function nodeRadius(n){
 return n.major?13:(n.sources>=3?9:7);
}
function drawNode(layer,n,p,{label=true,minor=false,shape='circle'}={}){
 const g=make('g',{class:`rg-node ${n.major?'major':''} ${n.id.includes('galaxy')?'hub':''}`,transform:`translate(${p[0]} ${p[1]})`,tabindex:'0'});
 let core;
 if(shape==='rect'){
   core=make('rect',{x:-34,y:-18,width:68,height:36,rx:7,class:'rg-star-core'});
 }else{
   core=make('circle',{r:nodeRadius(n),class:'rg-star-core'});
 }
 g.append(core);
 if(label){
   const t=make('text',{x:0,y:shape==='rect'?32:26,'text-anchor':'middle',class:`rg-node-label ${minor?'minor':''}`},n.title.length>30?n.title.slice(0,28)+'…':n.title);
   g.append(t);
 }
 const open=()=>showDetail(n);
 g.addEventListener('click',open);
 g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')open()});
 layer.append(g);
}

function skyPositions(list){
 // Low-collision deterministic grid with jitter.
 const cols=14;
 const rows=Math.ceil(list.length/cols);
 const cellW=(W-150)/cols;
 const cellH=(H-150)/Math.max(1,rows);
 const ordered=[...list].sort((a,b)=>(b.major-a.major)||(b.sources-a.sources)||(b.degree-a.degree)||a.title.localeCompare(b.title));
 const pos={};
 ordered.forEach((n,i)=>{
   const c=i%cols,r=Math.floor(i/cols);
   const jx=((hash(n.id+'x')%1000)/1000-.5)*cellW*.46;
   const jy=((hash(n.id+'y')%1000)/1000-.5)*cellH*.42;
   pos[n.id]=[80+c*cellW+cellW/2+jx,75+r*cellH+cellH/2+jy];
 });
 return pos;
}
function renderSky(list){
 clear();
 const bg=make('g'),eg=make('g'),ng=make('g'); svg.append(bg,eg,ng); addDust(bg,190);
 const pos=skyPositions(list),ids=new Set(list.map(n=>n.id));
 // Keep sky readable: draw only strongest 220 edges.
 const es=edges.filter(([a,b])=>ids.has(a)&&ids.has(b)).sort((e1,e2)=>{
   const s1=(degree[e1[0]]||0)+(degree[e1[1]]||0),s2=(degree[e2[0]]||0)+(degree[e2[1]]||0);
   return s2-s1;
 }).slice(0,220);
 es.forEach(([a,b])=>{
   const p=pos[a],q=pos[b];
   eg.append(make('path',{d:`M${p[0]},${p[1]} Q${(p[0]+q[0])/2},${(p[1]+q[1])/2-25} ${q[0]},${q[1]}`,class:`rg-edge ${(degree[a]||0)+(degree[b]||0)>=10?'major':''}`}));
 });
 list.forEach(n=>drawNode(ng,n,pos[n.id],{label:n.major||n.sources>=3,minor:!n.major}));
}

function renderUniverse(list){
 clear();
 const bg=make('g'),eg=make('g'),ng=make('g'); svg.append(bg,eg,ng); addDust(bg,110);
 const centers=[
  [250,225],[600,200],[980,220],[1410,220],[310,610],
  [680,610],[1060,600],[1460,610],[560,900],[1180,900]
 ];
 const groups=Object.fromEntries(GALAXIES.map((g,i)=>[g.id,{...g,center:centers[i],nodes:[]}]));
 list.forEach(n=>(groups[n.galaxy]||groups.knowledge).nodes.push(n));
 const pos={};
 Object.values(groups).forEach(g=>{
   const [cx,cy]=g.center;
   bg.append(make('ellipse',{cx,cy,rx:205,ry:135,class:'rg-galaxy-halo'}));
   bg.append(make('text',{x:cx,y:cy-145,'text-anchor':'middle',class:'rg-galaxy-label'},g.label[lang()]||g.label.en));
   g.nodes.sort((a,b)=>(b.major-a.major)||(b.sources-a.sources));
   g.nodes.forEach((n,i)=>{
     const ring=i<8?72:115+(Math.floor((i-8)/12)*36);
     const a=(i*2.3999632297)+(hash(g.id)%30)/20;
     pos[n.id]=[cx+Math.cos(a)*ring,cy+Math.sin(a)*ring*.65];
   });
 });
 const ids=new Set(list.map(n=>n.id));
 edges.filter(([a,b])=>ids.has(a)&&ids.has(b)).forEach(([a,b])=>{
   const p=pos[a],q=pos[b]; if(!p||!q)return;
   const ga=nodes.find(n=>n.id===a)?.galaxy,gb=nodes.find(n=>n.id===b)?.galaxy;
   eg.append(make('path',{d:`M${p[0]},${p[1]} L${q[0]},${q[1]}`,class:`rg-edge ${ga!==gb?'major':''}`}));
 });
 list.forEach(n=>drawNode(ng,n,pos[n.id],{label:n.major,minor:false}));
}

function renderNeural(list){
 clear();
 const bg=make('g'),eg=make('g'),ng=make('g'); svg.append(bg,eg,ng);
 bg.append(make('ellipse',{cx:650,cy:510,rx:500,ry:390,class:'rg-neural-lobe'}));
 bg.append(make('ellipse',{cx:1150,cy:510,rx:500,ry:390,class:'rg-neural-lobe'}));
 bg.append(make('path',{d:'M900 130 C850 300 850 720 900 900',class:'rg-neural-lobe'}));
 const left=[],right=[];
 list.forEach(n=>((hash(n.id)&1)?left:right).push(n));
 const pos={};
 function place(arr,cx,flip){
   arr.sort((a,b)=>(b.major-a.major)||(b.degree-a.degree));
   arr.forEach((n,i)=>{
     const ring=120+(i%5)*58;
     const band=Math.floor(i/5);
     const a=(-1.22+(i%5)*.61)+(band%2)*.16;
     const x=cx+(flip?-1:1)*Math.cos(a)*ring;
     const y=510+Math.sin(a)*ring*1.55+(band-3)*18;
     pos[n.id]=[clamp(x,90,W-90),clamp(y,80,H-80)];
   });
 }
 place(left,850,true);place(right,950,false);
 const ids=new Set(list.map(n=>n.id));
 edges.filter(([a,b])=>ids.has(a)&&ids.has(b)).slice(0,260).forEach(([a,b])=>{
   const p=pos[a],q=pos[b];if(!p||!q)return;
   const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;
   eg.append(make('path',{d:`M${p[0]},${p[1]} Q${mx},${my-55} ${q[0]},${q[1]}`,class:'rg-neural-path'}));
 });
 list.forEach(n=>drawNode(ng,n,pos[n.id],{label:n.major,minor:false}));
}

function renderBoard(list){
 clear();
 const bg=make('g'),tr=make('g'),ng=make('g');svg.append(bg,tr,ng);
 for(let x=60;x<W;x+=70)bg.append(make('line',{x1:x,y1:55,x2:x,y2:H-45,class:'rg-board-grid'}));
 for(let y=55;y<H;y+=70)bg.append(make('line',{x1:60,y1:y,x2:W-60,y2:y,class:'rg-board-grid'}));
 const centers=[
  [250,210],[590,210],[930,210],[1270,210],[1550,210],
  [300,610],[650,610],[1000,610],[1350,610],[1570,610]
 ];
 const groups=Object.fromEntries(GALAXIES.map((g,i)=>[g.id,{...g,center:centers[i],nodes:[]}]));
 list.forEach(n=>(groups[n.galaxy]||groups.knowledge).nodes.push(n));
 const pos={};
 Object.values(groups).forEach(g=>{
   const [cx,cy]=g.center;
   bg.append(make('rect',{x:cx-135,y:cy-95,width:270,height:190,rx:16,class:'rg-board-chip'}));
   bg.append(make('text',{x:cx,y:cy-112,'text-anchor':'middle',class:'rg-galaxy-label'},g.label[lang()]||g.label.en));
   g.nodes.sort((a,b)=>(b.major-a.major)||(b.sources-a.sources));
   g.nodes.slice(0,24).forEach((n,i)=>{
     const cols=4,c=i%cols,r=Math.floor(i/cols);
     pos[n.id]=[cx-90+c*60,cy-55+r*38];
   });
 });
 const visibleBoard=list.filter(n=>pos[n.id]);
 const ids=new Set(visibleBoard.map(n=>n.id));
 edges.filter(([a,b])=>ids.has(a)&&ids.has(b)).slice(0,180).forEach(([a,b])=>{
   const p=pos[a],q=pos[b],mx=(p[0]+q[0])/2;
   tr.append(make('path',{d:`M${p[0]},${p[1]} H${mx} V${q[1]} H${q[0]}`,class:'rg-board-trace'}));
 });
 visibleBoard.forEach(n=>drawNode(ng,n,pos[n.id],{label:n.major,shape:'rect'}));
}

function render(){
 const list=filtered();
 root.classList.remove('view-sky','view-universe','view-neural','view-motherboard');
 root.classList.add('view-'+mode);
 viewBtns.forEach(b=>b.classList.toggle('active',b.dataset.researchView===mode));
 if(mode==='universe') renderUniverse(list);
 else if(mode==='neural') renderNeural(list);
 else if(mode==='motherboard') renderBoard(list);
 else renderSky(list);
 const stat=root.querySelector('.rg-stat b');
 if(stat) stat.textContent=String(nodes.length)+'+';
}

function bind(){
 if(search){
   search.placeholder=lang()==='ar'?'ابحث عن بحث أو شخص أو مكان…':'Search research, person or place…';
   search.addEventListener('input',()=>{query=search.value.trim().toLowerCase();render()});
 }
 confBtns.forEach(b=>b.addEventListener('click',()=>{
   const c=b.dataset.conf;
   b.classList.toggle('active');
   if(b.classList.contains('active')) activeConf.add(c); else activeConf.delete(c);
   render();
 }));
 viewBtns.forEach(b=>b.addEventListener('click',()=>{
   mode=b.dataset.researchView;
   localStorage.setItem('luxdot.research.view.v4',mode);
   render();
 }));
}

async function boot(){
 try{
   const res=await fetch('research-manifest.json?v=4166',{cache:'no-store'});
   if(!res.ok) throw new Error(`research-manifest ${res.status}`);
   build(await res.json());
   bind();
   render();
 }catch(err){
   console.error('[LuxDot Research Engine v4.16.6]',err);
   if(detail) detail.innerHTML=`<div class="rg-detail-card"><b>Research graph could not load.</b><p>${esc(err.message)}</p></div>`;
 }
}
boot();
})();
