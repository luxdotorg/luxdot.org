
(()=>{
'use strict';
const C=n=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(n).replace(/%2F/g,'/');
const SCENES=[

{id:'camel',kind:'video',titleAr:'الجمل ذو السنامين',titleEn:'Bactrian Camel',src:C('2024-06-01 LJUBLJANA ZOO LJUBLJANA - Camelus bactrianus.webm'),credit:'NaIzletuSi / Wikimedia Commons',tags:['animal','camel','desert','heritage','quiet'],energy:1,priority:8,research:'biology-animals-galaxy.html'},
{id:'peregrine',kind:'video',titleAr:'الشاهين · صقر الجو',titleEn:'Peregrine Falcon',src:C('Peregrine falcon (Falco peregrinus) in West Reno, Nevada, USA.webm'),credit:'Paul Hurtado / Wikimedia Commons',tags:['animal','bird','falcon','peregrine','flight','epic'],energy:2,priority:10,research:'biology-animals-galaxy.html'},
{id:'eagle',kind:'video',titleAr:'العقاب · النسر الأصلع',titleEn:'Bald Eagle',src:C('Bald Eagle (Haliaeetus leucocephalus) in USA.webm'),credit:'U.S. Fish & Wildlife Service / Public domain',tags:['animal','bird','eagle','flight','epic'],energy:2,priority:9,research:'biology-animals-galaxy.html'},
{id:'manta',kind:'video',titleAr:'الشفنين الشيطاني · Manta',titleEn:'Manta Ray',src:C('MVI 0941.webm'),credit:'James Heilman, MD · CC BY-SA 3.0',tags:['animal','ocean','manta','quiet','ambient'],energy:1,priority:9,research:'biology-animals-galaxy.html'},
{id:'whale',kind:'video',titleAr:'الحوت الأحدب · الغناء تحت الماء',titleEn:'Singing Humpback Whale',src:C('Singing Humpback Whale.webm'),credit:'Sylke Rohrlach · CC BY-SA 4.0',tags:['animal','ocean','whale','quiet','ambient','sound'],energy:0,priority:9,research:'biology-animals-galaxy.html'},
{id:'octopus',kind:'video',titleAr:'حديقة الأخطبوط في الأعماق',titleEn:'Deep-Sea Octopus Garden',src:C('Wk215-deep-sea-octopuses.webm'),credit:'NOAA · Public domain',tags:['animal','ocean','octopus','science','quiet'],energy:1,priority:10,research:'biology-animals-galaxy.html'},

{id:'petra-film',kind:'video',titleAr:'البتراء · المدينة الصخرية',titleEn:'Petra · Rock-Cut City',src:C('Petra, Hauptstadt der Nabatäer (CC BY-SA 4.0).webm'),credit:'ZDF/Terra X · CC BY-SA 4.0',tags:['heritage','nabataean','petra','epic','history'],energy:2,priority:10,research:'petra.html'},
{id:'petra-deir',kind:'video',titleAr:'الدير · البتراء',titleEn:'Ad Deir · Petra',src:C('Ad Deir - The Monastery - Nov 20 2018.webm'),credit:'Ankur Panchbudhe · CC BY',tags:['heritage','nabataean','petra','quiet','spiritual'],energy:1,priority:10,research:'petra.html'},
{id:'sphinx1897',kind:'video',titleAr:'أبو الهول والأهرامات · 1897',titleEn:'Sphinx & Pyramids · 1897',src:C('Les Pyramides, 1897.webm'),credit:'Alexandre Promio / Lumière · historic film',tags:['heritage','egypt','sphinx','pyramids','memory','classical'],energy:1,priority:9,research:'prewriting-egypt.html'},
{id:'serapeum',kind:'image',titleAr:'سرابيوم سقارة',titleEn:'Serapeum of Saqqara',src:C('The Serapeum at Saqqara, 1550-30 BCE (2).jpg'),credit:'Prof. Mortel · Wikimedia Commons',tags:['heritage','egypt','serapeum','mystery','quiet'],energy:1,priority:10,research:'prewriting-egypt.html'},
{id:'karnak',kind:'image',titleAr:'معبد الكرنك · الأقصر',titleEn:'Karnak Temple · Luxor',src:C('Karnak Temple Complex, Egypt54.jpg'),credit:'Wikimedia Commons',tags:['heritage','egypt','karnak','epic','classical'],energy:2,priority:10,research:'prewriting-egypt.html'},
{id:'abusimbel',kind:'image',titleAr:'أبو سمبل',titleEn:'Abu Simbel',src:C('Abu Simbel Temple Egypt (1).jpg'),credit:'Wikimedia Commons',tags:['heritage','egypt','abu-simbel','epic','classical'],energy:2,priority:10,research:'prewriting-egypt.html'},
{id:'night',kind:'video',titleAr:'سماء الليل',titleEn:'Night Sky',src:C('Night Sky Timelapse (30549248476).webm'),credit:'NPS · Public domain',tags:['nature','night','quiet','sacred','ambient'],energy:0,priority:5},
{id:'earth',kind:'video',titleAr:'الأرض من الفضاء',titleEn:'Earth from Space',src:C('Earth-solar-array-timelapse.webm'),credit:'NASA · Public domain',tags:['space','world','symphonic','ambient'],energy:1,priority:5},
{id:'dawn',kind:'video',titleAr:'من الليل إلى الصباح',titleEn:'Night into Dawn',src:C('Timelapse of the sky at night and in the day.webm'),credit:'theilr · CC BY-SA 2.0',tags:['nature','dawn','quiet','quran','ambient'],energy:1,priority:5}
];
const PLANNED=[
['الحِجر / مدائن صالح','Hegra / Madā’in Ṣāliḥ','nabataean heritage'],
['الخزنة وقصر البنت والمعبد الكبير','Petra: Treasury / Qasr al-Bint / Great Temple','Petra deep cycle'],
['السرابيوم · الممرات والتوابيت','Serapeum galleries & sarcophagi','Egypt deep cycle'],
['أبو الهول · الجيزة','Great Sphinx · Giza','Egypt deep cycle'],
['الكرنك · قاعة الأعمدة','Karnak Hypostyle Hall','Egypt deep cycle'],
['أبو سمبل · رمسيس الثاني','Abu Simbel · Ramesses II','Egypt deep cycle']
];
const v=document.getElementById('luxdotTvVideo'),img=document.getElementById('luxdotTvImage'),title=document.getElementById('tvNowTitle'),credit=document.getElementById('tvCredit');
if(!v||!img)return;
let i=Number(localStorage.getItem('luxdot.tv.index')||0)%SCENES.length,timer=null,lastAudio=null;
let sceneStarted=0,lastSyncAt=0,errorStreak=0;const MIN_SCENE_MS=90000,IMAGE_SCENE_MS=120000,ERROR_RETRY_MS=12000;
function radioProfile(s){
 const t=((s?.track?.title||'')+' '+(s?.track?.artist||'')+' '+(s?.program?.name||'')).toLowerCase();
 if(s?.sacredLock||/قرآن|quran|adhan|أذان|sacred|منشاوي/.test(t))return {tags:['sacred','quiet','dawn','night','petra','spiritual'],energy:0};
 if(/فيروز|fairuz|شام|chaam|عود|oud|ناي|ney/.test(t))return {tags:['quiet','petra','nabataean','heritage','nature'],energy:1};
 if(/أندلس|andalus|موشح|muwash|قدود|qudud|مولد|mawlid/.test(t))return {tags:['heritage','petra','nabataean','spiritual','classical'],energy:1};
 if(/bach|symph|سيمف|classical|أم كلثوم|umm/.test(t))return {tags:['epic','egypt','heritage','classical','space'],energy:2};
 if(/children|طفل|حكاية|story/.test(t))return {tags:['nature','world','quiet'],energy:1};
 return {tags:['heritage','nature','world','ambient'],energy:1};
}
function score(x,p){
 let s=x.priority||0;s+=x.tags.filter(t=>p.tags.includes(t)).length*7;s-=Math.abs((x.energy||0)-p.energy)*5;
 const hist=JSON.parse(localStorage.getItem('luxdot.tv.history')||'{}'),age=Date.now()-(hist[x.id]||0);
 if(age<45*60*1000)s-=30;if(x.id.startsWith('petra'))s+=4;
 return s+Math.random()*2;
}
function choose(profile){
 return SCENES.map((x,n)=>({x,n,s:score(x,profile)})).sort((a,b)=>b.s-a.s)[0].n;
}
function paint(x){
 title.textContent=`${x.titleAr} · ${x.titleEn}`;credit.textContent=x.credit;
 document.querySelectorAll('[data-tv-item]').forEach(b=>b.classList.toggle('active',b.dataset.tvItem===x.id));
 const link=document.getElementById('tvResearchLink');if(link){link.hidden=!x.research;if(x.research)link.href=x.research}
}
function load(n=i){
 clearTimeout(timer);sceneStarted=Date.now();i=(n+SCENES.length)%SCENES.length;localStorage.setItem('luxdot.tv.index',i);
 const x=SCENES[i],hist=JSON.parse(localStorage.getItem('luxdot.tv.history')||'{}');hist[x.id]=Date.now();localStorage.setItem('luxdot.tv.history',JSON.stringify(hist));
 v.pause();v.removeAttribute('src');v.style.display='none';img.style.display='none';img.classList.remove('kenburns');
 if(x.kind==='video'){v.style.display='block';v.src=x.src;v.load();v.play().catch(()=>{});}
 else{img.style.display='block';img.src=x.src;requestAnimationFrame(()=>img.classList.add('kenburns'));timer=setTimeout(()=>syncToRadio(true),IMAGE_SCENE_MS);}
 paint(x);
}
function syncToRadio(force=false){const now=Date.now(),state=window.LuxDotRadio?.live?.()||null,p=radioProfile(state),n=choose(p);if(!force&&now-sceneStarted<MIN_SCENE_MS)return;if(now-lastSyncAt<2500)return;lastSyncAt=now;if(force||n!==i)load(n)}
v.muted=true;v.volume=0;v.addEventListener('playing',()=>{errorStreak=0});v.addEventListener('ended',()=>syncToRadio(true));v.addEventListener('error',()=>{errorStreak++;setTimeout(()=>{if(errorStreak<4)syncToRadio(true);else{errorStreak=0;load(SCENES.findIndex(x=>x.id==='night'))}},ERROR_RETRY_MS)});img.addEventListener('error',()=>setTimeout(()=>load(SCENES.findIndex(x=>x.id==='night')),ERROR_RETRY_MS));
document.getElementById('tvPlay').onclick=()=>{if(SCENES[i].kind==='video')v.paused?v.play():v.pause()};
document.getElementById('tvNext').onclick=()=>syncToRadio(true);
document.getElementById('tvFull').onclick=()=>document.querySelector('.tv-frame')?.requestFullscreen?.();
document.getElementById('tvRadio').onclick=()=>{if(window.LuxDotRadio)LuxDotRadio.toggle()};
document.querySelectorAll('[data-tv-item]').forEach(b=>b.onclick=()=>load(SCENES.findIndex(x=>x.id===b.dataset.tvItem)));
document.addEventListener('luxdotradio',e=>{
 const s=e.detail||{},el=document.getElementById('tvRadioNow');if(el&&s.track)el.textContent=`إذاعة نقطة نور · ${s.track.title} · ${s.track.artist}`;
 const key=(s.track?.id||'');if(key!==lastAudio){lastAudio=key;if(Date.now()-sceneStarted>=MIN_SCENE_MS)syncToRadio(false)}
});
load(i);setTimeout(()=>syncToRadio(false),700);
window.LuxDotTV={SCENES,PLANNED,load,syncToRadio};
})();
