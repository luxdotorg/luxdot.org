
(()=>{
'use strict';
if(window.top!==window.self)return;
const SCRIPT_URL=(()=>{try{return new URL(document.currentScript?.src||'luxdot-radio.js',location.href)}catch(e){return new URL('luxdot-radio.js',location.href)}})();
const ROOT_URL=new URL('./',SCRIPT_URL);
const asset=path=>new URL(path,ROOT_URL).href;
const STATE_KEY='luxdot.radio.liveState.v2', FAIL_KEY='luxdot.radio.failedSources.v2';
const failed=new Set(JSON.parse(sessionStorage.getItem(FAIL_KEY)||'[]'));
const commonsFile=n=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(n).replace(/%2F/g,'/');
const TZ='Asia/Damascus';
const audio=new Audio(); audio.preload='auto'; audio.muted=false; audio.volume=1; audio.removeAttribute('crossorigin');
let userOn=localStorage.getItem('luxdot.radio.on')==='1', current=null, sacredLock=false, identBusy=false, prayerBusy=false;
let consecutiveErrors=0,lastErrorAt=0,loadToken=0,sourceTimer=null;
let prayerTimes=null, prayerDate='', lastPrayerKey='', lastIdentKey='';

const LOCAL_FALLBACK={id:'luxdot-fallback',title:'نقطة نور · سرير صوتي احتياطي',artist:'LuxDot generated audio',kind:'music',tags:['quiet','ambient','arab-quiet','quiet-world','world-window','instrumental'],duration:180,url:asset('assets/audio/system/point-of-light-fallback.wav'),license:'LuxDot original generated audio'};
const CATALOG=[
 LOCAL_FALLBACK,
 {id:'quran-fatiha',title:'سورة الفاتحة',artist:'محمد صديق المنشاوي',kind:'sacred',tags:['quran-selected'],duration:52,url:commonsFile('Sura Minshawi 1.ogg'),license:'Public domain'},
 {id:'quran-yusuf',title:'سورة يوسف',artist:'محمد صديق المنشاوي',kind:'sacred',tags:['quran-selected'],duration:2701,url:commonsFile('Sura Minshawi 12.ogg'),license:'Public domain'},
 {id:'quran-ibrahim',title:'سورة إبراهيم',artist:'محمد صديق المنشاوي',kind:'sacred',tags:['quran-selected'],duration:1118,url:commonsFile('Sura Minshawi 14.ogg'),license:'Public domain'},
 {id:'oud',title:'عود عربي',artist:'Houssem Bettaibi',kind:'music',tags:['oud','arab-quiet','instrumental','quiet'],duration:50,url:commonsFile('OUD.ogg'),license:'CC BY-SA 3.0'},
 {id:'muwashah-musili',title:'للعاشق في الهوى دلائل · موشح',artist:'أحمد عبد القادر الموصلي',kind:'music',tags:['muwashshah','muwashah-classic','andalusian-night','arab-classic','maqam'],duration:203,url:commonsFile('Ahmed al-Musili, Muwashah 02.ogg'),license:'Public domain'},
 {id:'lamma-bada',title:'لما بدا يتثنى · موشح',artist:'الشيخ سيد الصفتي',kind:'music',tags:['muwashshah','muwashah-classic','andalusian-night','arab-classic','halab-night'],duration:210,url:commonsFile('Muwashah lamma bada yatathanna.OGG'),license:'Public domain'},
 {id:'andalusi-free',title:'أندلسيات · مادة أرشيفية كلامية',artist:'Anass Sedrati',kind:'spoken',tags:['archive','andalusian-spoken'],duration:81,url:commonsFile('أوديو أندلسي.ogg'),license:'CC BY-SA 4.0',broadcast:false},
 {id:'persia',title:'Baiaty · Chiraz · Rast',artist:'Traditional Persian music',kind:'music',tags:['persian','quiet-world'],duration:183,url:commonsFile('Baiaty Chiraz Rast .ogg'),license:'Public domain'},
 {id:'bach-air',title:'Air · BWV 1068',artist:'J. S. Bach',kind:'music',tags:['symphonic','quiet-world'],duration:260,url:commonsFile('Air (Bach).ogg'),license:'Public domain'},
 {id:'samai-hijaz-kurdi',title:'سماعي حجاز كار كردي · 1926',artist:'Chahadé Saadé',kind:'music',tags:['samaai','oud','arab-classic','andalusian-night','halab-night','instrumental'],duration:212,url:commonsFile('Samaii Hijaz Kar Kurdi (c. 1926).ogg'),license:'Public domain'},
 {id:'maqam-sika-1931',title:'مقام سيكاه · تسجيل 1931',artist:'Traditional Egyptian ensemble',kind:'music',tags:['maqam','arab-classic','andalusian-night','halab-night','quiet-world'],duration:201,url:commonsFile('Art-song Maqam Sika (1931).ogg'),license:'Public domain'},
 {id:'maqam-hijaz-1',title:'بشرف مقام حجاز · الجزء الأول',artist:'Traditional Egyptian music',kind:'music',tags:['maqam','arab-classic','andalusian-night','halab-night','instrumental'],duration:218,url:commonsFile('Baschrav Kuzum Maqam Hijaz part 1 (1931).ogg'),license:'Public domain'},
 {id:'maqam-hijaz-2',title:'بشرف مقام حجاز · الجزء الثاني',artist:'Traditional Egyptian music',kind:'music',tags:['maqam','arab-classic','andalusian-night','halab-night','instrumental'],duration:210,url:commonsFile('Baschrav Kuzum Maqam Hijaz part 2 (1931).ogg'),license:'Public domain'},
 {id:'maqam-mezmum',title:'مقام مزموم · تونس 1931',artist:'Traditional Tunisian music',kind:'music',tags:['maqam','quiet-world','andalusian-night','world-window'],duration:166,url:commonsFile('Art-song Maqam Mezmum (1931).ogg'),license:'Public domain'},
 {id:'dervishes-dil',title:'إنشاد دراويش · مقام ديل',artist:'Traditional Tunisian music',kind:'spiritual',tags:['spiritual','mawlid','halab-night','world-window'],duration:166,url:commonsFile('Song of the Dervishes Maqam Dil (1931).ogg'),license:'Public domain'},
 {id:'memory-heal-world',title:'Heal the World · ذاكرة إنسانية',artist:'Memory library',kind:'memory',tags:['memory','children','world-window'],duration:382,url:asset('assets/audio/memorial/heal-the-world.mp3'),license:'User-supplied; publication rights to be confirmed'},
 {id:'memory-one-day',title:'One Day · ذاكرة إنسانية',artist:'Memory library',kind:'memory',tags:['memory','children','world-window'],duration:213,url:asset('assets/audio/memorial/one-day.mp3'),license:'User-supplied; publication rights to be confirmed'},
 {id:'memory-julia',title:'غابت شمس الحق · ذاكرة سورية',artist:'Julia / memory library',kind:'memory',tags:['memory','sham','arab-classic'],duration:314,url:asset('assets/audio/memorial/julia-ghabat-shams-alhaq.mp3'),license:'User-supplied; publication rights to be confirmed'},
 {id:'memory-not-alone',title:'You’re Not Alone Syria · ذاكرة سورية',artist:'Memory library',kind:'memory',tags:['memory','sham','children'],duration:359,url:asset('assets/audio/memorial/youre-not-alone-syria.mp3'),license:'User-supplied; publication rights to be confirmed'},
 {id:'gamelan',title:'Gamelan Anklung',artist:'Traditional ensemble',kind:'music',tags:['world-window','quiet-world'],duration:177,url:commonsFile('Gamelan Anklung Berong Pengetjet (1931).ogg'),license:'Public domain'},
 {id:'qawwali',title:'Sohini Qawwali',artist:'Imdad Khan',kind:'spiritual',tags:['spiritual','mawlid','world-window'],duration:185,url:commonsFile('Sohini Qawwali.ogg'),license:'Public domain'},
 {id:'syriac',title:'Abun d-bashmayo · الصلاة الربانية',artist:'Western Syriac rite',kind:'sacred',tags:['spiritual','world-window'],duration:80,url:commonsFile('Abunbshmayo.ogg'),license:'CC0 1.0'},
 {id:'jewish-adon',title:'Adon Olam · אדון עולם',artist:'Gershon Sirota',kind:'sacred',tags:['spiritual','world-window'],duration:212,url:commonsFile('Adoin oilom (1903).ogg'),license:'Public domain'},
 {id:'gregorian',title:'Veni Sancte Spiritus',artist:'Gregorian chant',kind:'sacred',tags:['spiritual','world-window'],duration:157,url:commonsFile('Veni.sancte.spiritus.ogg'),license:'Public domain'},
 {id:'heartbeat',title:'Heartbeat · A Song for Syria',artist:'Syrian children / UNICEF project',kind:'children',tags:['children','memory'],duration:222,url:asset('assets/audio/memorial/heartbeat-song-for-syria.mp3'),license:'User-supplied; publication rights to be confirmed'},
 {id:'sarkha',title:'صرخة · رسالة طفل لاجئ',artist:'Provisional identification',kind:'children',tags:['children','memory','short-story'],duration:393,url:asset('assets/audio/memorial/sarkha-child-refugee.mp3'),license:'User-supplied; publication rights to be confirmed'}
];

const LICENSED_SLOTS=[
 {id:'fairuz-sham',title:'فيروز · مختارات عن الشام',artist:'فيروز',tags:['fairuz-licensed'],rights:'Broadcast audio required before activation'},
 {id:'umm-kulthum-night',title:'أم كلثوم · مختارات ما قبل الفجر',artist:'أم كلثوم',tags:['umm-kulthum-licensed'],rights:'Broadcast audio required before activation'},
 {id:'halabi-qudud',title:'قدود حلبية · مكتبة مرخّصة',artist:'مختارات حلبية',tags:['qudud','muwashshah-halabi','mawlid'],rights:'Licensed/public-domain audio required before activation'},
 {id:'andalusian',title:'أندلسيات وموشحات · مكتبة مرخّصة',artist:'مختارات',tags:['andalusian','muwashshah','samaai'],rights:'Licensed/public-domain audio required before activation'}
];


const OPTIONAL_LICENSED=[
 {id:'fairuz-sham-local',title:'فيروز · مختارات عن الشام',artist:'فيروز',kind:'music',tags:['fairuz-licensed','sham','arab-classic'],duration:1800,url:asset('assets/audio/licensed/fairuz-sham.mp3'),license:'User-supplied licensed audio'},
 {id:'umm-kulthum-local',title:'أم كلثوم · طرب ما قبل الفجر',artist:'أم كلثوم',kind:'music',tags:['umm-kulthum-licensed','tarab','arab-classic'],duration:1800,url:asset('assets/audio/licensed/umm-kulthum-night.mp3'),license:'User-supplied licensed audio'},
 {id:'qudud-halabi-local',title:'قدود حلبية · مختارات',artist:'مكتبة حلبية',kind:'music',tags:['qudud','qudud-halabi','halab-night','muwashshah'],duration:1800,url:asset('assets/audio/licensed/qudud-halabi.mp3'),license:'User-supplied licensed audio'}
];
async function discoverLicensed(){
 for(const t of OPTIONAL_LICENSED){
   try{const r=await fetch(t.url,{method:'HEAD',cache:'no-store'});if(r.ok&&!CATALOG.some(x=>x.id===t.id))CATALOG.push(t)}catch(e){}
 }
}
discoverLicensed();

const DAYPARTS=[
 ['06:00','06:35','افتتاح الصباح','Dawn Opening',['quran-selected']],
 ['06:35','08:30','صباح الشام','Morning of Chaam',['arab-quiet','oud','instrumental']],
 ['08:30','11:30','صباح الشام · فيروز حين تتوفر المكتبة المرخّصة','Morning of Chaam',['fairuz-licensed','sham','arab-quiet','oud','arab-classic']],
 ['11:30','16:30','نهار نقطة نور','Point of Light Day',['world-window','short-story','children','memory']],
 ['16:30','19:30','مساء الشرق','Eastern Evening',['persian','symphonic','world-window']],
 ['19:30','22:00','ليلة أندلسية · موشحات','Andalusian & Muwashshah Night',['andalusian-night','andalusian','muwashshah','muwashah-classic','oud']],
 ['22:00','01:30','حلب تسهر · قدود وموشحات','Aleppo Stays Awake',['qudud','qudud-halabi','halab-night','muwashshah','muwashah-classic','oud']],
 ['01:30','04:15','طرب الليل · أم كلثوم حين تتوفر المكتبة المرخّصة','Night Tarab',['umm-kulthum-licensed','tarab','arab-classic','muwashshah','quiet-world']],
 ['04:15','06:00','ما قبل الفجر','Before Dawn',['quiet','quran-selected','oud']]
];

const ID_LANG=['ar','en','nl','he','jv','id','fr','es','de','tr'];
const ID_TEXT={
 ar:t=>`هنا الشام. الساعة الآن ${t} بتوقيت الشام. أنتم تستمعون إلى البث المباشر لإذاعة لوكسدوت — نقطة نور، من الشام.`,
 en:t=>`This is Chaam. The time is now ${t}, Chaam time. You are listening to the live broadcast of LuxDot Radio — Point of Light, from Chaam.`,
 nl:t=>`Hier is Chaam. Het is nu ${t}, Chaam-tijd. U luistert naar de live-uitzending van LuxDot Radio — Punt van Licht, vanuit Chaam.`,
 he:t=>`מצ'אם… נקודת אור אל העולם. אתם מאזינים לשידור החי של LuxDot Radio — נקודת אור. השעה כעת ${t} בצ'אם.`,
 fr:t=>`Depuis Chaam… un point de lumière vers le monde. Vous écoutez LuxDot Radio — Point de Lumière. Il est ${t} à Chaam.`,
 es:t=>`Desde Chaam… un punto de luz hacia el mundo. Escuchas LuxDot Radio — Punto de Luz. En Chaam son las ${t}.`,
 de:t=>`Aus Chaam… ein Lichtpunkt für die Welt. Sie hören LuxDot Radio — Lichtpunkt. In Chaam ist es jetzt ${t} Uhr.`,
 tr:t=>`Chaam'dan… dünyaya bir ışık noktası. LuxDot Radio — Işık Noktası canlı yayınını dinliyorsunuz. Chaam'da saat ${t}.`,
 id:t=>`Dari Chaam… setitik cahaya untuk dunia. Anda mendengarkan siaran langsung LuxDot Radio — Titik Cahaya. Waktu di Chaam sekarang ${t}.`,
 jv:t=>`Saka Chaam… titik cahya tumuju donya. Sampeyan ngrungokake siaran langsung LuxDot Radio — Titik Cahya. Saiki jam ${t} ing Chaam.`
};

function parts(d=new Date()){
 const a=new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit',weekday:'short',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(d);
 return Object.fromEntries(a.filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
}
function hm(d=new Date()){const p=parts(d);return `${p.hour}:${p.minute}`}
function minutes(x){const [h,m]=x.split(':').map(Number);return h*60+m}
function inRange(now,start,end){
 const n=minutes(now),a=minutes(start),b=minutes(end);
 return a<=b ? n>=a&&n<b : n>=a||n<b;
}
function daypart(d=new Date()){
 const n=hm(d);
 const row=DAYPARTS.find(x=>inRange(n,x[0],x[1]))||DAYPARTS[0];
 return {start:row[0],end:row[1],nameAr:row[2],nameEn:row[3],tags:row[4]};
}
function special(d=new Date()){
 const p=parts(d),date=`${p.year}-${p.month}-${p.day}`;
 if(date==='2026-08-25')return {key:'mawlid',ar:'المولد النبوي الشريف · 12 ربيع الأول 1448',en:'Mawlid al-Nabi · 12 Rabi al-Awwal 1448'};
 if(date==='2026-08-24')return {key:'hijri-birthday',ar:'ذكرى الميلاد الهجري · 11 ربيع الأول 1448',en:'Hijri birthday anniversary · 11 Rabi al-Awwal 1448'};
 return null;
}
function weekdayLayer(d=new Date()){
 const w=parts(d).weekday;
 if(w==='Fri')return {ar:'الجمعة · طبقة إسلامية',en:'Friday · Islamic layer'};
 if(w==='Sat')return {ar:'السبت · طبقة يهودية/شبات',en:'Saturday · Jewish/Shabbat layer'};
 if(w==='Sun')return {ar:'الأحد · طبقة مسيحية',en:'Sunday · Christian layer'};
 return {ar:'هوية شرقية عالمية',en:'Eastern / world identity'};
}
function candidates(dp){
 let tags=[...dp.tags];
 const sp=special();
 if(sp?.key==='mawlid')tags.unshift('mawlid','muwashshah','qudud','quran-selected','spiritual');
 let real=CATALOG.filter(t=>t.broadcast!==false&&!failed.has(t.id)&&t.tags.some(x=>tags.includes(x)));
 const wantsSacred=tags.includes('quran-selected')||tags.includes('spiritual')||tags.includes('mawlid');
 if(!wantsSacred) real=real.filter(t=>t.kind!=='sacred'&&t.kind!=='spiritual');
 // Keep the editorial identity, but add a few compatible "breathers" so long blocks do not loop three files.
 const broad=CATALOG.filter(t=>t.broadcast!==false&&!failed.has(t.id)&&t.kind!=='sacred'&&t.kind!=='spoken');
 if(dp.nameEn==='Morning of Chaam') real.push(...broad.filter(t=>t.tags.includes('quiet-world')||t.tags.includes('instrumental')));
 if(dp.nameEn==='Point of Light Day') real.push(...broad.filter(t=>t.tags.includes('world-window')||t.tags.includes('memory')));
 if(dp.nameEn==='Eastern Evening') real.push(...broad.filter(t=>t.tags.includes('maqam')||t.tags.includes('quiet-world')||t.tags.includes('symphonic')));
 if(dp.nameEn==='Andalusian & Muwashshah Night') real.push(...broad.filter(t=>t.tags.includes('maqam')||t.tags.includes('samaai')||t.tags.includes('oud')));
 if(dp.nameEn==='Aleppo Stays Awake') real.push(...broad.filter(t=>t.tags.includes('halab-night')||t.tags.includes('maqam')||t.tags.includes('oud')));
 if(dp.nameEn==='Night Tarab') real.push(...broad.filter(t=>t.tags.includes('arab-classic')||t.tags.includes('quiet-world')||t.tags.includes('maqam')));
 const uniq=[];const seen=new Set();
 for(const t of real){if(!seen.has(t.id)){seen.add(t.id);uniq.push(t)}}
 return uniq.length?uniq:[LOCAL_FALLBACK];
}
function hash32(str){let h=2166136261>>>0;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function shuffleStable(arr,seed){
 const a=[...arr];let x=seed||1;
 const rnd=()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return (x>>>0)/4294967296};
 for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
 return a;
}
function dateKey(d=new Date()){const p=parts(d);return `${p.year}-${p.month}-${p.day}`}
function elapsedInDaypart(dp,d=new Date()){
 const p=parts(d),n=Number(p.hour)*3600+Number(p.minute)*60+Number(p.second),a=minutes(dp.start)*60,b=minutes(dp.end)*60;
 if(a<=b)return Math.max(0,n-a);
 return n>=a?n-a:n+86400-a;
}
function scheduled(dp,d=new Date()){
 const pool=candidates(dp);
 if(pool.length===1)return {track:pool[0],offset:elapsedInDaypart(dp,d)%Math.max(20,pool[0].duration||180)};
 let remain=elapsedInDaypart(dp,d),cycle=0;
 while(cycle<200){
   const order=shuffleStable(pool,hash32(`${dateKey(d)}|${dp.start}|${cycle}`));
   // Avoid beginning a cycle with the same title that ended the previous one.
   const cycleDur=order.reduce((z,t)=>z+Math.max(20,Number(t.duration)||180),0);
   if(remain<cycleDur){
     for(const t of order){
       const dur=Math.max(20,Number(t.duration)||180);
       if(remain<dur)return {track:t,offset:remain};
       remain-=dur;
     }
   }else remain-=cycleDur;
   cycle++;
 }
 return {track:pool[0],offset:0};
}
function savedState(){
 try{const x=JSON.parse(localStorage.getItem(STATE_KEY)||'null');return x&&Date.now()-x.at<30000?x:null}catch(e){return null}
}
function saveState(){
 if(!current)return;
 try{localStorage.setItem(STATE_KEY,JSON.stringify({id:current.id,pos:Number(audio.currentTime)||0,at:Date.now(),program:daypart().start,on:userOn}))}catch(e){}
}
function markFailed(id){
 if(!id||id==='luxdot-fallback')return;
 failed.add(id);sessionStorage.setItem(FAIL_KEY,JSON.stringify([...failed]));
}
function emit(){
 document.dispatchEvent(new CustomEvent('luxdotradio',{detail:live()}));
}
function live(){
 const dp=daypart(), sp=special(), layer=weekdayLayer();
 return {track:current,program:{name:dp.nameAr,nameEn:dp.nameEn},special:sp,layer,prayers:prayerTimes,sacredLock,status:audio.paused?'paused':'live'};
}
function setStatus(s){document.dispatchEvent(new CustomEvent('luxdotradio-status',{detail:s}))}
function ensureDock(){
 if(document.getElementById('luxdot-radio-dock'))return;
 const d=document.createElement('div');d.id='luxdot-radio-dock';
 d.innerHTML=`<div class="lrd-main"><button id="luxdot-radio-play">▶</button><div><div class="lrd-title"><span class="lrd-pulse"></span>إذاعة نقطة نور · LuxDot من الشام</div><div class="lrd-track" id="luxdot-radio-track">من الشام… نقطة نور إلى العالم</div></div><span class="lrd-live">LIVE</span></div><div class="lrd-sub"><span>Chaam · الشام · 24/7</span><a href="${asset('radio.html')}">OPEN ↗</a></div>`;
 document.body.appendChild(d);
 d.querySelector('#luxdot-radio-play').onclick=toggle;
}
function updateDock(){
 ensureDock();const t=document.getElementById('luxdot-radio-track'),b=document.getElementById('luxdot-radio-play');
 if(t)t.textContent=current?`${current.title} · ${current.artist}`:'من الشام… نقطة نور إلى العالم';
 if(b)b.textContent=userOn&&!audio.paused?'❚❚':'▶';
}
function load(t,play=true,seek=0){
 clearTimeout(sourceTimer); const token=++loadToken;
 current=t||LOCAL_FALLBACK; sacredLock=current.kind==='sacred'; audio.loop=false;
 audio.pause(); audio.muted=false; audio.volume=1; audio.src=current.url; audio.load(); updateDock(); emit();
 let sought=false;
 const doSeek=()=>{if(sought||token!==loadToken)return;sought=true;try{const dur=Number.isFinite(audio.duration)&&audio.duration>0?audio.duration:(current.duration||0);if(dur>1)audio.currentTime=Math.max(0,Math.min(seek,dur-0.35));else audio.currentTime=Math.max(0,seek)}catch(e){}};
 audio.addEventListener('loadedmetadata',doSeek,{once:true});
 audio.addEventListener('canplay',doSeek,{once:true});
 sourceTimer=setTimeout(()=>{
   if(token!==loadToken||!userOn||!audio.paused||audio.readyState>=2)return;
   if(current.id!=='luxdot-fallback'){
     markFailed(current.id);setStatus('المصدر لم يستجب؛ الانتقال تلقائيًا إلى المسار التالي…');syncToAir(true);
   }
 },9000);
 if(play&&userOn){
   const tryPlay=()=>{doSeek();const pr=audio.play();if(pr&&pr.catch)pr.catch(()=>setStatus('اضغط ▶ مرة واحدة للسماح باستمرار البث بين الصفحات.'))};
   if(audio.readyState>=1)tryPlay();else audio.addEventListener('loadedmetadata',tryPlay,{once:true});
 }
}
function syncToAir(force=false){
 const dp=daypart(),air=scheduled(dp),st=savedState();
 let seek=air.offset;
 // During quick same-site navigation, continue the exact stream position from the page just left.
 if(st&&st.id===air.track.id&&st.program===dp.start){
   seek=(st.pos||0)+(Date.now()-st.at)/1000;
   const dur=Math.max(20,air.track.duration||180);seek%=dur;
 }
 if(!force&&current?.id===air.track.id){
   if(userOn&&audio.paused)audio.play().catch(()=>{});
   if(Math.abs((audio.currentTime||0)-seek)>15&&!sacredLock&&!identBusy&&!prayerBusy){try{audio.currentTime=seek}catch(e){}}
   updateDock();emit();return;
 }
 load(air.track,true,seek);
}
function next(){if(current)markFailed('__none__');syncToAir(true)}
function toggle(){
 userOn=!userOn;localStorage.setItem('luxdot.radio.on',userOn?'1':'0');
 if(userOn){audio.muted=false;audio.volume=1;syncToAir(true)}
 else{audio.pause();saveState()}
 updateDock();emit();
}
audio.onended=()=>{
 clearTimeout(sourceTimer);consecutiveErrors=0;sacredLock=false;saveState();
 if(pendingPrayer)playPrayer(pendingPrayer,true);else syncToAir(true);
};
audio.ontimeupdate=()=>{if(Math.floor(audio.currentTime)%3===0)saveState()};
audio.onplaying=()=>{clearTimeout(sourceTimer);consecutiveErrors=0;updateDock();saveState();emit()};
audio.onerror=()=>{
 clearTimeout(sourceTimer);sacredLock=false;consecutiveErrors++;
 if(current&&current.id!=='luxdot-fallback'){
   markFailed(current.id);setStatus('تعذر هذا المصدر؛ تجاوزته الإذاعة وتتابع البرنامج.');setTimeout(()=>syncToAir(true),350);
 }else{
   setStatus('تعذر المصدر المحلي الاحتياطي.');updateDock();
 }
};
window.addEventListener('pagehide',saveState);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveState()});

function speak(text,lang){
 return new Promise(resolve=>{
  if(!('speechSynthesis'in window)){resolve();return}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.88;u.pitch=.92;u.onend=resolve;u.onerror=resolve;speechSynthesis.speak(u);
 });
}
function gongFallback(){
 return new Promise(resolve=>{
  try{const C=window.AudioContext||window.webkitAudioContext,c=new C(),g=c.createGain(),o1=c.createOscillator(),o2=c.createOscillator();o1.type='sine';o2.type='sine';o1.frequency.value=55;o2.frequency.value=82.5;g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.28,c.currentTime+.025);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+4.6);o1.connect(g);o2.connect(g);g.connect(c.destination);o1.start();o2.start();o1.stop(c.currentTime+4.7);o2.stop(c.currentTime+4.7);setTimeout(()=>{c.close();resolve()},4750)}catch(e){resolve()}
 });
}
function gongAgeng(){
 return new Promise(resolve=>{
  try{
   const g=new Audio(commonsFile("Gong GKPL7p (Casa da Musica's Javanese gamelan).ogg"));g.preload='auto';g.volume=.72;let done=false;
   const finish=()=>{if(done)return;done=true;try{g.pause()}catch(e){}resolve()};
   g.addEventListener('error',async()=>{if(done)return;done=true;await gongFallback();resolve()},{once:true});
   g.play().catch(async()=>{if(done)return;done=true;await gongFallback();resolve()});
   setTimeout(finish,4800);
  }catch(e){gongFallback().then(resolve)}
 });
}
async function hourlyIdent(force=false){
 if(identBusy||prayerBusy||!userOn||sacredLock)return;
 const p=parts(),key=`${p.year}-${p.month}-${p.day}-${p.hour}`;
 if(!force&&key===lastIdentKey)return;
 lastIdentKey=key;identBusy=true;const was=!audio.paused;audio.pause();
 await gongAgeng();
 const idx=Number(p.hour)%ID_LANG.length,lg=ID_LANG[idx],txt=(ID_TEXT[lg]||ID_TEXT.en)(`${p.hour}:${p.minute}`);
 await speak(txt,lg==='ar'?'ar-SA':lg);
 identBusy=false;if(was&&userOn)syncToAir(true);
}

let pendingPrayer=null;
const PRAYER_LABELS={Fajr:['الفجر','Fajr'],Dhuhr:['الظهر','Dhuhr'],Asr:['العصر','Asr'],Maghrib:['المغرب','Maghrib'],Isha:['العشاء','Isha']};
async function fetchPrayers(){
 const p=parts(),date=`${p.year}-${p.month}-${p.day}`; if(prayerDate===date&&prayerTimes)return;
 prayerDate=date;
 try{
  const url=`https://api.aladhan.com/v1/timingsByCity/${p.day}-${p.month}-${p.year}?city=Damascus&country=Syria&method=4`;
  const r=await fetch(url,{cache:'no-store'}),j=await r.json();
  prayerTimes=j?.data?.timings||null;
 }catch(e){prayerTimes=null}
 emit();
}
function prayerDue(){
 if(!prayerTimes)return null;const now=hm(),p=parts();
 for(const name of ['Fajr','Dhuhr','Asr','Maghrib','Isha']){
   const t=String(prayerTimes[name]||'').slice(0,5);
   if(t===now){
     const key=`${p.year}-${p.month}-${p.day}-${name}`;
     if(key!==lastPrayerKey)return {name,time:t,key};
   }
 }
 return null;
}
async function playPrayer(pr,fromQueue=false){
 if(!pr||prayerBusy)return;
 if(sacredLock&&!fromQueue){pendingPrayer=pr;setStatus('الأذان بانتظار نهاية النص المقدس · Sacred Audio Lock');return}
 pendingPrayer=null;lastPrayerKey=pr.key;prayerBusy=true;const was=!audio.paused;audio.pause();
 const [ar,en]=PRAYER_LABELS[pr.name]||[pr.name,pr.name];
 await speak(`حان الآن موعد أذان ${ar} بتوقيت الشام.`, 'ar-SA');
 await speak(`It is now time for the ${en} call to prayer, Chaam time.`, 'en');
 await new Promise(resolve=>{
   const a=new Audio(commonsFile('Beautiful adhan.ogg'));a.onended=resolve;a.onerror=resolve;a.play().catch(resolve);
 });
 prayerBusy=false;if(was&&userOn)syncToAir(true);
}
function tick(){
 fetchPrayers();
 const pr=prayerDue();if(pr)playPrayer(pr);
 const p=parts();if(p.minute==='00'&&Number(p.second)<18)hourlyIdent(false);
 if(!sacredLock&&!prayerBusy&&!identBusy)syncToAir(false);
 emit();
}
function next24(){
 const rows=[];const now=new Date();
 for(let i=0;i<24;i++){const d=new Date(now.getTime()+i*3600000),p=parts(d),dp=daypart(d);rows.push({time:`${p.hour}:00`,day:p.weekday,program:{name:dp.nameAr,nameEn:dp.nameEn},track:{title:dp.tags.join(' · '),artist:'Editorial palette'}})}
 return rows;
}
function week(){
 const rows=[];const now=new Date();
 for(let i=0;i<7;i++){const d=new Date(now.getTime()+i*86400000),p=parts(d);rows.push({day:p.weekday,date:`${p.day}-${p.month}`,program:{name:weekdayLayer(d).ar,label:weekdayLayer(d).en}})}
 return rows;
}
function sync(force=false){syncToAir(force||!current)}
function getStatus(){return audio.paused?'جاهز · Ready':'يبث الآن من الشام · LIVE from Chaam'}

function installAudioUnlock(){const unlock=()=>{if(userOn&&current&&audio.paused)audio.play().catch(()=>{});document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('keydown',unlock,true)};document.addEventListener('pointerdown',unlock,true);document.addEventListener('keydown',unlock,true)}
installAudioUnlock();
window.LuxDotRadio={TRACKS:Object.fromEntries(CATALOG.map(x=>[x.id,x])),CATALOG,LICENSED_SLOTS,live,next24,week,audio,toggle,sync,hourlyIdent,fetchPrayers,getStatus};
function boot(){ensureDock();syncToAir(true);fetchPrayers();setInterval(tick,15000);setInterval(saveState,2500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot()
})();
