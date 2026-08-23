
(()=>{
'use strict';
const commonsFile=n=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(n).replace(/%2F/g,'/');
const TZ='Asia/Damascus';
const audio=new Audio(); audio.preload='auto'; audio.muted=false; audio.volume=1; audio.removeAttribute('crossorigin');
let userOn=localStorage.getItem('luxdot.radio.on')==='1', current=null, sacredLock=false, identBusy=false, prayerBusy=false;
let consecutiveErrors=0,lastErrorAt=0,loadToken=0,sourceTimer=null;
let prayerTimes=null, prayerDate='', lastPrayerKey='', lastIdentKey='';

const LOCAL_FALLBACK={id:'luxdot-fallback',title:'نقطة نور · سرير صوتي احتياطي',artist:'LuxDot generated audio',kind:'music',tags:['quiet','ambient','arab-quiet','quiet-world','world-window','instrumental'],duration:180,url:'assets/audio/system/point-of-light-fallback.wav',license:'LuxDot original generated audio'};
const CATALOG=[
 LOCAL_FALLBACK,
 {id:'quran-fatiha',title:'سورة الفاتحة',artist:'محمد صديق المنشاوي',kind:'sacred',tags:['quran-selected'],duration:52,url:commonsFile('Sura Minshawi 1.ogg'),license:'Public domain'},
 {id:'quran-yusuf',title:'سورة يوسف',artist:'محمد صديق المنشاوي',kind:'sacred',tags:['quran-selected'],duration:2701,url:commonsFile('Sura Minshawi 12.ogg'),license:'Public domain'},
 {id:'quran-ibrahim',title:'سورة إبراهيم',artist:'محمد صديق المنشاوي',kind:'sacred',tags:['quran-selected'],duration:1118,url:commonsFile('Sura Minshawi 14.ogg'),license:'Public domain'},
 {id:'oud',title:'عود عربي',artist:'Houssem Bettaibi',kind:'music',tags:['oud','arab-quiet','instrumental','quiet'],duration:50,url:commonsFile('OUD.ogg'),license:'CC BY-SA 3.0'},
 {id:'persia',title:'Baiaty · Chiraz · Rast',artist:'Traditional Persian music',kind:'music',tags:['persian','quiet-world'],duration:183,url:commonsFile('Baiaty Chiraz Rast .ogg'),license:'Public domain'},
 {id:'bach-air',title:'Air · BWV 1068',artist:'J. S. Bach',kind:'music',tags:['symphonic','quiet-world'],duration:260,url:commonsFile('Air (Bach).ogg'),license:'Public domain'},
 {id:'gamelan',title:'Gamelan Anklung',artist:'Traditional ensemble',kind:'music',tags:['world-window','quiet-world'],duration:177,url:commonsFile('Gamelan Anklung Berong Pengetjet (1931).ogg'),license:'Public domain'},
 {id:'qawwali',title:'Sohini Qawwali',artist:'Imdad Khan',kind:'spiritual',tags:['spiritual','mawlid','world-window'],duration:185,url:commonsFile('Sohini Qawwali.ogg'),license:'Public domain'},
 {id:'syriac',title:'Abun d-bashmayo · الصلاة الربانية',artist:'Western Syriac rite',kind:'sacred',tags:['spiritual','world-window'],duration:80,url:commonsFile('Abunbshmayo.ogg'),license:'CC0 1.0'},
 {id:'jewish-adon',title:'Adon Olam · אדון עולם',artist:'Gershon Sirota',kind:'sacred',tags:['spiritual','world-window'],duration:212,url:commonsFile('Adoin oilom (1903).ogg'),license:'Public domain'},
 {id:'gregorian',title:'Veni Sancte Spiritus',artist:'Gregorian chant',kind:'sacred',tags:['spiritual','world-window'],duration:157,url:commonsFile('Veni.sancte.spiritus.ogg'),license:'Public domain'},
 {id:'heartbeat',title:'Heartbeat · A Song for Syria',artist:'Syrian children / UNICEF project',kind:'children',tags:['children','memory'],duration:222,url:'assets/audio/memorial/heartbeat-song-for-syria.mp3',license:'User-supplied; publication rights to be confirmed'},
 {id:'sarkha',title:'صرخة · رسالة طفل لاجئ',artist:'Provisional identification',kind:'children',tags:['children','memory','short-story'],duration:393,url:'assets/audio/memorial/sarkha-child-refugee.mp3',license:'User-supplied; publication rights to be confirmed'}
];

const LICENSED_SLOTS=[
 {id:'fairuz-sham',title:'فيروز · مختارات عن الشام',artist:'فيروز',tags:['fairuz-licensed'],rights:'Broadcast audio required before activation'},
 {id:'umm-kulthum-night',title:'أم كلثوم · مختارات ما قبل الفجر',artist:'أم كلثوم',tags:['umm-kulthum-licensed'],rights:'Broadcast audio required before activation'},
 {id:'halabi-qudud',title:'قدود حلبية · مكتبة مرخّصة',artist:'مختارات حلبية',tags:['qudud','muwashshah-halabi','mawlid'],rights:'Licensed/public-domain audio required before activation'},
 {id:'andalusian',title:'أندلسيات وموشحات · مكتبة مرخّصة',artist:'مختارات',tags:['andalusian','muwashshah','samaai'],rights:'Licensed/public-domain audio required before activation'}
];

const DAYPARTS=[
 ['06:00','06:35','افتتاح الصباح','Dawn Opening',['quran-selected']],
 ['06:35','08:30','صباح الشام','Morning of Chaam',['arab-quiet','oud','instrumental']],
 ['08:30','11:30','فيروز والشام','Fairuz & Chaam',['fairuz-licensed','sham-poetry','arab-quiet']],
 ['11:30','16:30','نهار نقطة نور','Point of Light Day',['world-window','short-story','children','memory']],
 ['16:30','19:30','مساء الشرق','Eastern Evening',['persian','symphonic','world-window']],
 ['19:30','22:00','ليلة أندلسية','Andalusian Night',['andalusian','muwashshah','samaai','oud']],
 ['22:00','01:30','حلب تسهر','Aleppo Stays Awake',['qudud','muwashshah-halabi','mawlid','spiritual']],
 ['01:30','04:15','طرب الليل','Night Tarab',['umm-kulthum-licensed','quiet-world']],
 ['04:15','06:00','ما قبل الفجر','Before Dawn',['quiet','quran-selected','oud']]
];

const ID_LANG=['ar','en','nl','he','jv','id','fr','es','de','tr'];
const ID_TEXT={
 ar:t=>`من الشام… نقطة نور إلى العالم. أنتم تستمعون إلى إذاعة نقطة نور — لوكس دوت. الساعة الآن ${t} بتوقيت الشام.`,
 en:t=>`From Chaam… a point of light to the world. You are listening live to LuxDot Radio — Point of Light. The time in Chaam is now ${t}.`,
 nl:t=>`Vanuit Chaam… een lichtpunt voor de wereld. U luistert live naar LuxDot Radio — Lichtpunt. Het is nu ${t} in Chaam.`,
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
 if(sp?.key==='mawlid')tags.unshift('mawlid','spiritual','quran-selected');
 const w=parts().weekday;
 if(w==='Sat')tags.unshift('spiritual');
 if(w==='Sun')tags.unshift('spiritual');
 const real=CATALOG.filter(t=>t.tags.some(x=>tags.includes(x)));
 return real.length?real:CATALOG;
}
function pick(dp){
 const pool=candidates(dp);
 const hour=Number(parts().hour), seed=Math.floor(Date.now()/3600000)+hour*17;
 const history=JSON.parse(localStorage.getItem('luxdot.radio.history')||'{}');
 let ranked=[...pool].sort((a,b)=>(history[a.id]||0)-(history[b.id]||0));
 const t=ranked[seed%ranked.length]||pool[0];
 history[t.id]=Date.now(); localStorage.setItem('luxdot.radio.history',JSON.stringify(history));
 return t;
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
 d.innerHTML=`<div class="lrd-main"><button id="luxdot-radio-play">▶</button><div><div class="lrd-title"><span class="lrd-pulse"></span>إذاعة نقطة نور · LuxDot من الشام</div><div class="lrd-track" id="luxdot-radio-track">من الشام… نقطة نور إلى العالم</div></div><span class="lrd-live">LIVE</span></div><div class="lrd-sub"><span>Chaam · الشام · 24/7</span><a href="radio.html">OPEN ↗</a></div>`;
 document.body.appendChild(d);
 d.querySelector('#luxdot-radio-play').onclick=toggle;
}
function updateDock(){
 ensureDock();const t=document.getElementById('luxdot-radio-track'),b=document.getElementById('luxdot-radio-play');
 if(t)t.textContent=current?`${current.title} · ${current.artist}`:'من الشام… نقطة نور إلى العالم';
 if(b)b.textContent=userOn&&!audio.paused?'❚❚':'▶';
}
function load(t,play=true){
 clearTimeout(sourceTimer); const token=++loadToken;
 current=t||LOCAL_FALLBACK; sacredLock=current.kind==='sacred';
 audio.pause(); audio.muted=false; audio.volume=1; audio.src=current.url; audio.load(); updateDock(); emit();

 // If a remote source never reaches playable state, fall back locally instead of cycling.
 sourceTimer=setTimeout(()=>{
   if(token!==loadToken || !userOn || !audio.paused || audio.readyState>=2)return;
   if(current.id!=='luxdot-fallback'){setStatus('المصدر الخارجي لم يستجب؛ تشغيل المصدر المحلي الاحتياطي…');load(LOCAL_FALLBACK,true)}
 },8000);

 if(play&&userOn){
   const pr=audio.play();
   if(pr&&pr.catch)pr.catch(()=>{
     if(current.id!=='luxdot-fallback') load(LOCAL_FALLBACK,true);
     else setStatus('اضغط ▶ مرة واحدة للسماح بالصوت · Tap ▶ once to allow audio');
   });
 }
}
function next(){load(pick(daypart()),true)}
function toggle(){
 userOn=!userOn; localStorage.setItem('luxdot.radio.on',userOn?'1':'0');
 if(userOn){
   audio.muted=false; audio.volume=1;
   if(!current) load(LOCAL_FALLBACK,true);
   else {
     const pr=audio.play();
     if(pr&&pr.catch)pr.catch(()=>load(LOCAL_FALLBACK,true));
   }
 }else audio.pause();
 updateDock();emit();
}
audio.onended=()=>{clearTimeout(sourceTimer);consecutiveErrors=0;sacredLock=false;if(pendingPrayer)playPrayer(pendingPrayer,true);else next()};
audio.onplaying=()=>{clearTimeout(sourceTimer);consecutiveErrors=0;updateDock();emit()};
audio.onerror=()=>{
 clearTimeout(sourceTimer); sacredLock=false; consecutiveErrors++;
 if(current && current.id!=='luxdot-fallback'){
   setStatus('تعذر المصدر الخارجي؛ انتقلت الإذاعة إلى مصدر محلي ثابت.');
   setTimeout(()=>load(LOCAL_FALLBACK,true),700);
 }else{
   userOn=false;localStorage.setItem('luxdot.radio.on','0');
   setStatus('تعذر تشغيل الصوت المحلي. اضغط ▶ بعد تحديث الصفحة.');
   updateDock();
 }
};

function speak(text,lang){
 return new Promise(resolve=>{
  if(!('speechSynthesis'in window)){resolve();return}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.88;u.pitch=.92;u.onend=resolve;u.onerror=resolve;speechSynthesis.speak(u);
 });
}
function scepter(){
 return new Promise(resolve=>{
  try{
   const C=window.AudioContext||window.webkitAudioContext,c=new C(),g=c.createGain(),o1=c.createOscillator(),o2=c.createOscillator();
   o1.type='sine';o2.type='triangle';o1.frequency.value=92;o2.frequency.value=184;g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.34,c.currentTime+.03);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+2.4);
   o1.connect(g);o2.connect(g);g.connect(c.destination);o1.start();o2.start();o1.stop(c.currentTime+2.5);o2.stop(c.currentTime+2.5);setTimeout(()=>{c.close();resolve()},2550);
  }catch(e){resolve()}
 });
}
async function hourlyIdent(force=false){
 if(identBusy||prayerBusy||!userOn||sacredLock)return;
 const p=parts(),key=`${p.year}-${p.month}-${p.day}-${p.hour}`;
 if(!force&&key===lastIdentKey)return;
 lastIdentKey=key;identBusy=true;const was=!audio.paused;audio.pause();
 await scepter();
 const idx=Number(p.hour)%ID_LANG.length,lg=ID_LANG[idx],txt=(ID_TEXT[lg]||ID_TEXT.en)(`${p.hour}:${p.minute}`);
 await speak(txt,lg==='ar'?'ar-SA':lg);
 identBusy=false;if(was&&userOn)audio.play().catch(()=>{});
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
 prayerBusy=false;if(was&&userOn)next();
}
function tick(){
 fetchPrayers();
 const pr=prayerDue();if(pr)playPrayer(pr);
 const p=parts();if(p.minute==='00'&&Number(p.second)<18)hourlyIdent(false);
 const dp=daypart(); if(current&&!current.tags.some(x=>dp.tags.includes(x))&&!sacredLock&&!prayerBusy&&!identBusy)next();
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
function sync(force=false){if(force||!current)next();else updateDock();emit()}
function getStatus(){return audio.paused?'جاهز · Ready':'يبث الآن من الشام · LIVE from Chaam'}

function installAudioUnlock(){const unlock=()=>{if(userOn&&current&&audio.paused)audio.play().catch(()=>{});document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('keydown',unlock,true)};document.addEventListener('pointerdown',unlock,true);document.addEventListener('keydown',unlock,true)}
installAudioUnlock();
window.LuxDotRadio={TRACKS:Object.fromEntries(CATALOG.map(x=>[x.id,x])),CATALOG,LICENSED_SLOTS,live,next24,week,audio,toggle,sync,hourlyIdent,fetchPrayers,getStatus};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{ensureDock();sync(false);fetchPrayers();setInterval(tick,15000)});else{ensureDock();sync(false);fetchPrayers();setInterval(tick,15000)}
})();
