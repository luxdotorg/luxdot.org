(() => {
'use strict';
const root=document.querySelector('[data-research-graph]');
if(!root)return;
const $=(s,c=root)=>c.querySelector(s), $$=(s,c=root)=>[...c.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const qLang=new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en';
const lang=qLang.toLowerCase();
const labels={
ar:{title:'طريقة عرض الأبحاث',hint:'أربع عدسات لنفس المعرفة',sky:'السماء',universe:'الكون',neural:'الشبكة العصبية',motherboard:'اللوحة الأم',galaxy:'مجرة',cluster:'عنقود',system:'نظام',planet:'كوكب',moon:'قمر',asteroid:'كويكب'},
en:{title:'Research views',hint:'Four lenses on the same knowledge',sky:'SKY',universe:'UNIVERSE',neural:'NEURAL NETWORK',motherboard:'MOTHERBOARD',galaxy:'Galaxy',cluster:'Cluster',system:'System',planet:'Planet',moon:'Moon',asteroid:'Asteroid'},
nl:{title:'Onderzoeksweergaven',hint:'Vier lenzen op dezelfde kennis',sky:'HEMEL',universe:'HEELAL',neural:'NEURAAL NETWERK',motherboard:'MOEDERBORD',galaxy:'Melkweg',cluster:'Cluster',system:'Systeem',planet:'Planeet',moon:'Maan',asteroid:'Asteroïde'},
he:{title:'תצוגות מחקר',hint:'ארבע עדשות על אותו ידע',sky:'שמיים',universe:'יקום',neural:'רשת עצבית',motherboard:'לוח אם',galaxy:'גלקסיה',cluster:'צביר',system:'מערכת',planet:'כוכב לכת',moon:'ירח',asteroid:'אסטרואיד'},
jv:{title:'Tampilan panliten',hint:'Papat cara ndeleng kawruh sing padha',sky:'LANGIT',universe:'JAGAD',neural:'JARINGAN SARAF',motherboard:'PAPAN INDUK',galaxy:'Galaksi',cluster:'Kluster',system:'Sistem',planet:'Planet',moon:'Rembulan',asteroid:'Asteroid'},
id:{title:'Tampilan riset',hint:'Empat cara melihat pengetahuan yang sama',sky:'LANGIT',universe:'SEMESTA',neural:'JARINGAN SARAF',motherboard:'MOTHERBOARD',galaxy:'Galaksi',cluster:'Klaster',system:'Sistem',planet:'Planet',moon:'Bulan',asteroid:'Asteroid'},
fr:{title:'Vues de recherche',hint:'Quatre façons de lire le même savoir',sky:'CIEL',universe:'UNIVERS',neural:'RÉSEAU NEURONAL',motherboard:'CARTE MÈRE',galaxy:'Galaxie',cluster:'Amas',system:'Système',planet:'Planète',moon:'Lune',asteroid:'Astéroïde'},
es:{title:'Vistas de investigación',hint:'Cuatro formas de leer el mismo conocimiento',sky:'CIELO',universe:'UNIVERSO',neural:'RED NEURONAL',motherboard:'PLACA BASE',galaxy:'Galaxia',cluster:'Cúmulo',system:'Sistema',planet:'Planeta',moon:'Luna',asteroid:'Asteroide'},
de:{title:'Forschungsansichten',hint:'Vier Perspektiven auf dasselbe Wissen',sky:'HIMMEL',universe:'UNIVERSUM',neural:'NEURONALES NETZ',motherboard:'MAINBOARD',galaxy:'Galaxie',cluster:'Cluster',system:'System',planet:'Planet',moon:'Mond',asteroid:'Asteroid'},
tr:{title:'Araştırma görünümleri',hint:'Aynı bilgiye dört bakış',sky:'GÖKYÜZÜ',universe:'EVREN',neural:'SİNİR AĞI',motherboard:'ANA KART',galaxy:'Galaksi',cluster:'Küme',system:'Sistem',planet:'Gezegen',moon:'Uydu',asteroid:'Asteroit'}
}
const L=labels[lang]||labels.en;
const GUIDE={
ar:{
 universe:{title:'🌌 الكون · كيف تتوزع المعرفة؟',summary:'هذا المنظور يجيب: أين يقع البحث ضمن البنية الكبرى؟',parts:[['المجرة','مجال معرفي كبير'],['العنقود','مجموعة أبحاث شديدة الترابط'],['النظام','مركز أو محور يجمع عدة أبحاث'],['الكوكب','بحث رئيسي'],['القمر / الكويكب','عقدة مساندة أو فرضية أصغر']]},
 sky:{title:'✨ السماء · الاستكشاف الحر',summary:'السماء تترك العقد كأجرام يمكن الاقتراب منها بصرياً، مع إبراز الروابط والثقة دون فرض بنية هرمية قوية.',parts:[['النجم','عقدة أو بحث'],['الكوكبة','مجموعة علاقات مرئية'],['الخط','رابط موثق أو مفاهيمي'],['السطوع','نشاط بصري، وليس قيمة علمية']]},
 neural:{title:'🧠 الشبكة العصبية · كيف تفكر المعرفة؟',summary:'الأبحاث تصبح خلايا عصبية فعلية الشكل؛ المسارات محاور وتغصنات، والوميض يمثل انتقال الانتباه بين الأفكار.',parts:[['الخلية العصبية','بحث أو عقدة معرفة'],['المشبك','رابط بين بحثين'],['المحور / التغصن','مسار اتصال'],['السيال','نبضة علاقة نشطة'],['العنقود العصبي','عائلة بحثية مترابطة']]},
 motherboard:{title:'🖥 اللوحة الأم · كيف بُني LuxDot؟',summary:'هذا المنظور يقرأ المشروع كنظام حوسبة كبير، لا كسماء: كل عنصر له وظيفة هندسية واضحة.',parts:[['CORE PROCESSOR','قلب LuxDot ومحور المعالجة'],['CHIPSET','عنقود أو مجال بحثي'],['IC / CHIP','بحث أو وحدة معرفة'],['RAM / MEMORY','ذاكرة ومراجع قريبة'],['DATA BUS','مسار ربط بين الوحدات'],['PORT / SOURCE','مصدر أو وصلة خارجية'],['ACTIVITY LED','عقدة يجري تحديثها أو فحصها']]}
},
en:{
 universe:{title:'🌌 Universe · where does knowledge live?',summary:'Shows where a research node sits inside the larger architecture.',parts:[['Galaxy','large knowledge domain'],['Cluster','tightly related research group'],['System','hub joining several studies'],['Planet','major research'],['Moon / asteroid','supporting node or smaller hypothesis']]},
 sky:{title:'✨ Sky · free exploration',summary:'Keeps nodes as explorable objects while showing relations and confidence without imposing a strong hierarchy.',parts:[['Star','research node'],['Constellation','visible relation group'],['Line','documented or conceptual link'],['Brightness','visual activity, not scientific worth']]},
 neural:{title:'🧠 Neural network · how does knowledge think?',summary:'Research becomes neuron-like cells with axons, dendrites, synapses and traveling attention pulses.',parts:[['Neuron','research or knowledge node'],['Synapse','relation between two nodes'],['Axon / dendrite','connection path'],['Impulse','active relation pulse'],['Neural cluster','research family']]},
 motherboard:{title:'🖥 Motherboard · how is LuxDot engineered?',summary:'Reads LuxDot as a computing system rather than a sky; every visual element has an engineering role.',parts:[['CORE PROCESSOR','LuxDot processing hub'],['CHIPSET','research cluster or domain'],['IC / CHIP','research unit'],['RAM / MEMORY','nearby memory and references'],['DATA BUS','link between components'],['PORT / SOURCE','external source connection'],['ACTIVITY LED','node currently being updated']]}
},
nl:{
 universe:{title:'🌌 Heelal · waar bevindt kennis zich?',summary:'Toont waar een onderzoek binnen de grotere kennisarchitectuur ligt.',parts:[['Melkweg','groot kennisdomein'],['Cluster','sterk verbonden onderzoeken'],['Systeem','hub voor meerdere studies'],['Planeet','hoofdonderzoek'],['Maan / asteroïde','ondersteunende knoop of hypothese']]},
 sky:{title:'✨ Hemel · vrij verkennen',summary:'Onderzoeksknopen blijven verkenbare objecten met zichtbare relaties en betrouwbaarheid.',parts:[['Ster','onderzoeksknoop'],['Sterrenbeeld','zichtbare relatiegroep'],['Lijn','gedocumenteerde of conceptuele relatie'],['Helderheid','visuele activiteit, geen wetenschappelijke waarde']]},
 neural:{title:'🧠 Neuraal netwerk · hoe denkt kennis?',summary:'Onderzoeken worden neuronachtige cellen met axonen, dendrieten, synapsen en bewegende impulsen.',parts:[['Neuron','onderzoek'],['Synaps','relatie'],['Axon / dendriet','verbindingspad'],['Impuls','actieve relatie'],['Neuraal cluster','onderzoeksfamilie']]},
 motherboard:{title:'🖥 Moederbord · hoe is LuxDot opgebouwd?',summary:'Leest LuxDot als een computersysteem met duidelijke functionele onderdelen.',parts:[['CORE PROCESSOR','centrale verwerking'],['CHIPSET','onderzoekscluster'],['IC / CHIP','onderzoekseenheid'],['RAM / MEMORY','geheugen en referenties'],['DATA BUS','verbinding'],['PORT / SOURCE','externe bron'],['ACTIVITY LED','actieve update']]}
},
he:{
 universe:{title:'🌌 יקום · היכן הידע נמצא?',summary:'מציג את מיקום המחקר בתוך ארכיטקטורת הידע הגדולה.',parts:[['גלקסיה','תחום ידע גדול'],['צביר','מחקרים קשורים'],['מערכת','מרכז המחבר מחקרים'],['כוכב לכת','מחקר מרכזי'],['ירח / אסטרואיד','צומת תומך או השערה']]},
 sky:{title:'✨ שמיים · חקירה חופשית',summary:'הצמתים נשארים כעצמים לחקירה תוך הצגת קשרים ורמת ביטחון.',parts:[['כוכב','צומת מחקר'],['קבוצת כוכבים','קבוצת קשרים'],['קו','קשר מתועד או מושגי'],['בהירות','פעילות חזותית, לא ערך מדעי']]},
 neural:{title:'🧠 רשת עצבית · איך הידע חושב?',summary:'המחקרים הופכים לתאים דמויי נוירונים עם אקסונים, דנדריטים, סינפסות ודחפים נעים.',parts:[['נוירון','מחקר'],['סינפסה','קשר'],['אקסון / דנדריט','נתיב'],['דחף','קשר פעיל'],['אשכול עצבי','משפחת מחקר']]},
 motherboard:{title:'🖥 לוח אם · כיצד LuxDot בנוי?',summary:'קריאה של LuxDot כמערכת מחשוב עם תפקיד ברור לכל רכיב.',parts:[['CORE PROCESSOR','מרכז עיבוד'],['CHIPSET','אשכול מחקר'],['IC / CHIP','יחידת מחקר'],['RAM / MEMORY','זיכרון ומקורות'],['DATA BUS','מסלול קישור'],['PORT / SOURCE','מקור חיצוני'],['ACTIVITY LED','עדכון פעיל']]}
}
};
const GUIDE_FALLBACK={
jv:['Papat unsur iki nerangake cara maca tampilan iki.','simpul','hubungan','jalur','aktivitas'],
id:['Empat unsur ini menjelaskan cara membaca tampilan ini.','simpul','hubungan','jalur','aktivitas'],
fr:['Ces éléments expliquent comment lire cette vue.','nœud','relation','trajet','activité'],
es:['Estos elementos explican cómo leer esta vista.','nodo','relación','trayecto','actividad'],
de:['Diese Elemente erklären, wie diese Ansicht gelesen wird.','Knoten','Beziehung','Pfad','Aktivität'],
tr:['Bu öğeler görünümün nasıl okunacağını açıklar.','düğüm','ilişki','yol','etkinlik']
};
function guideData(){
 if(GUIDE[lang])return GUIDE[lang][mode];
 const f=GUIDE_FALLBACK[lang]||GUIDE_FALLBACK.en||['How to read this view','node','relation','path','activity'];
 const titles={universe:L.universe,sky:L.sky,neural:L.neural,motherboard:L.motherboard};
 const base=GUIDE.en[mode];
 return {title:(titles[mode]||mode),summary:f[0],parts:base.parts.map((p,i)=>[p[0],i===0?f[1]:i===1?f[2]:i===2?f[3]:f[4]])};
}
function renderGuide(){
 const host=document.getElementById('rgSymbolism');if(!host)return;
 const g=guideData();
 host.innerHTML=`<article class="rg-guide-card"><div class="rg-guide-head"><b>${g.title}</b><span>${g.summary}</span></div><div class="rg-guide-parts">${g.parts.map(p=>`<div><strong>${p[0]}</strong><small>${p[1]}</small></div>`).join('')}</div></article>`;
}

let selected=null;
let mode=localStorage.getItem('luxdot.research.view.v4')||'universe';

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
 $$('.rg-mode-legend,.rg-view-badge,.rg-motherboard,.rg-universe-clusters,.rg-neural-layer').forEach(x=>x.remove());
 $$('.rg-orbit-ring,.rg-chip-body,.rg-chip-pins').forEach(x=>x.remove());
 nodes().forEach(n=>n.classList.remove('rg-role-system','rg-role-planet','rg-role-moon','rg-role-asteroid','rg-role-chip','rg-role-transistor','rg-role-neuron'));
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
function neural(){
 classify();
 const all=nodes(), d=degrees(), groups=new Map(), pos=new Map();
 all.forEach(n=>{if(n.dataset.id==='luxdot')return;const f=(n.dataset.families||'meaning').split(',')[0]||'meaning';if(!groups.has(f))groups.set(f,[]);groups.get(f).push(n)});
 const centers=[[310,250],[730,180],[1160,245],[1530,210],[430,650],[890,610],[1320,690],[1620,620],[920,900],[1430,920]];
 [...groups.keys()].forEach((f,gi)=>{const c=centers[gi%centers.length],arr=groups.get(f).sort((a,b)=>(d[b.dataset.id]||0)-(d[a.dataset.id]||0));arr.forEach((n,i)=>{const ang=i*2.3999632297+gi*.61,rad=42+Math.sqrt(i+1)*31+(i%3)*8,x=c[0]+Math.cos(ang)*rad,y=c[1]+Math.sin(ang)*rad*.64;pos.set(n.dataset.id,[x,y]);n.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)})`)})});
 const lux=$('.rg-node[data-id="luxdot"]');if(lux){pos.set('luxdot',[950,505]);lux.setAttribute('transform','translate(950 505)')}
 const map=new Map(nodes().map(n=>[n.dataset.id,n]));
 edges().forEach((e,i)=>{const a=pos.get(e.dataset.a)||parsePos(map.get(e.dataset.a)),b=pos.get(e.dataset.b)||parsePos(map.get(e.dataset.b));if(!a||!b)return;const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,bend=((i%5)-2)*18;const nx=-(b[1]-a[1]),ny=(b[0]-a[0]),len=Math.max(1,Math.hypot(nx,ny));const cx=mx+nx/len*bend,cy=my+ny/len*bend;e.setAttribute('d',`M${a[0]},${a[1]} Q${cx.toFixed(1)},${cy.toFixed(1)} ${b[0]},${b[1]}`);e.classList.add('rg-neural-synapse');e.style.setProperty('--syn-delay',`${(i%19)*.12}s`)});
 const eg=$('.rg-constellations');if(eg){const layer=svgEl('g',{class:'rg-neural-layer'});[...groups.keys()].forEach((f,gi)=>{const c=centers[gi%centers.length];layer.append(svgEl('ellipse',{cx:c[0],cy:c[1],rx:185,ry:112,class:'rg-neural-lobe'}))});nodes().forEach(n=>{const p=pos.get(n.dataset.id)||parsePos(n);if(!p)return;layer.append(svgEl('circle',{cx:p[0],cy:p[1],r:n.dataset.kind==='hub'?27:18,class:'rg-neuron-ring'}));for(let k=0;k<4;k++){const a=(k*1.7+(p[0]+p[1])*.001),r=24+(k%2)*9,ex=p[0]+Math.cos(a)*r,ey=p[1]+Math.sin(a)*r;layer.append(svgEl('path',{d:`M${p[0]},${p[1]} Q${(p[0]+ex)/2+Math.sin(a)*8},${(p[1]+ey)/2-Math.cos(a)*8} ${ex},${ey}`,class:'rg-dendrite'}))}});eg.parentNode.insertBefore(layer,eg)}
 nodes().forEach(n=>n.classList.add('rg-role-neuron'));
 legend([L.neural,'NEURON','SYNAPSE','AXON','IMPULSE']);
}
function motherboard(){
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
  const board=svgEl('g',{class:'rg-motherboard'});
  fam.forEach(f=>{const [cx,cy]=centers.get(f);board.append(svgEl('rect',{class:'rg-board-zone',x:cx-205,y:cy-180,width:410,height:360,rx:22}));const tx=svgEl('text',{x:cx,y:cy-153});tx.textContent=f.toUpperCase();board.append(tx)});
  board.append(svgEl('rect',{class:'rg-board-zone rg-cpu-zone',x:882,y:505,width:136,height:110,rx:18}));
  const tx=svgEl('text',{x:950,y:590});tx.textContent='LUXDOT / CORE PROCESSOR';board.append(tx);
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
 mode=['sky','universe','neural','motherboard'].includes(newMode)?newMode:'universe';
 if(persist)localStorage.setItem('luxdot.research.view.v4',mode);
 clearExtras();root.dataset.researchView=mode;
 if(mode==='sky'||mode==='neural')internal('network');else if(mode==='universe')internal('cosmos');else internal('fields');
 clearExtras();root.dataset.researchView=mode;
 if(mode==='universe')universe();if(mode==='neural')neural();if(mode==='motherboard')motherboard();
 renderGuide();badge();tabs();if(selected)requestAnimationFrame(()=>pulse(selected));
}
function ready(){
 const switcher=$('.rg-view-switch'), toolbar=$('.rg-toolbar'), graph=$('.rg-canvas');
 if(!switcher||!toolbar||!graph)return false;
 const canvasWrap=$('.rg-canvas-wrap'); if(canvasWrap && switcher.parentElement!==canvasWrap) canvasWrap.appendChild(switcher);
 switcher.addEventListener('click',e=>{const b=e.target.closest('[data-research-view]');if(b)apply(b.dataset.researchView,true)});
 root.addEventListener('click',e=>{const n=e.target.closest?.('.rg-node[data-id]');if(n){selected=n.dataset.id;requestAnimationFrame(()=>pulse(selected))}});
 tabs();renderGuide();apply(mode,false);return true;
}
let tries=0;const timer=setInterval(()=>{tries++;if(ready()||tries>40)clearInterval(timer)},100);
})();