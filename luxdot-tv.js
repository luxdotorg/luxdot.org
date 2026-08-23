
(()=>{
'use strict';
const C=n=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(n).replace(/%2F/g,'/');
const SCENES=[
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
 clearTimeout(timer);i=(n+SCENES.length)%SCENES.length;localStorage.setItem('luxdot.tv.index',i);
 const x=SCENES[i],hist=JSON.parse(localStorage.getItem('luxdot.tv.history')||'{}');hist[x.id]=Date.now();localStorage.setItem('luxdot.tv.history',JSON.stringify(hist));
 v.pause();v.removeAttribute('src');v.style.display='none';img.style.display='none';img.classList.remove('kenburns');
 if(x.kind==='video'){v.style.display='block';v.src=x.src;v.load();v.play().catch(()=>{});}
 else{img.style.display='block';img.src=x.src;requestAnimationFrame(()=>img.classList.add('kenburns'));timer=setTimeout(()=>syncToRadio(true),52000);}
 paint(x);
}
function syncToRadio(force=false){
 const s=window.LuxDotRadio?.live?.()||null,p=radioProfile(s),n=choose(p);
 if(force||n!==i)load(n);
}
v.addEventListener('ended',()=>syncToRadio(true));v.addEventListener('error',()=>setTimeout(()=>syncToRadio(true),1200));img.addEventListener('error',()=>setTimeout(()=>syncToRadio(true),1200));
document.getElementById('tvPlay').onclick=()=>{if(SCENES[i].kind==='video')v.paused?v.play():v.pause()};
document.getElementById('tvNext').onclick=()=>syncToRadio(true);
document.getElementById('tvFull').onclick=()=>document.querySelector('.tv-frame')?.requestFullscreen?.();
document.getElementById('tvRadio').onclick=()=>{if(window.LuxDotRadio)LuxDotRadio.toggle()};
document.querySelectorAll('[data-tv-item]').forEach(b=>b.onclick=()=>load(SCENES.findIndex(x=>x.id===b.dataset.tvItem)));
document.addEventListener('luxdotradio',e=>{
 const s=e.detail||{},el=document.getElementById('tvRadioNow');if(el&&s.track)el.textContent=`إذاعة نقطة نور · ${s.track.title} · ${s.track.artist}`;
 const key=(s.track?.id||'')+'|'+(s.program?.name||'');if(key!==lastAudio){lastAudio=key;syncToRadio(false)}
});
load(i);setTimeout(()=>syncToRadio(false),700);
window.LuxDotTV={SCENES,PLANNED,load,syncToRadio};
})();
