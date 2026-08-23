(()=>{
 const commonsFile=(name)=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(name).replace(/%2F/g,'/');
 const commonsPage=(name)=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(name).replace(/%20/g,'_');
 const TRACKS={
  beliefSilence:{title:'دقيقة صمت · Victims of Religious/Belief Violence',artist:'إذاعة نقطة نور · LuxDot من شام',culture:'22 August · freedom of religion or belief · In Memoriam',kind:'memorial',duration:60,url:'assets/audio/ghouta-silence-60s.wav',license:'LuxDot generated silence · no rights restrictions',source:'belief-violence-memory.html'},
  ghoutaSilence:{title:'دقيقة صمت · Ghouta Memorial Silence',artist:'إذاعة نقطة نور · LuxDot من شام',culture:'الغوطة · 21 آب 2013 · In Memoriam',kind:'memorial',duration:60,url:'assets/audio/ghouta-silence-60s.wav',license:'LuxDot generated silence · no rights restrictions',source:'ghouta-chemical-memory.html'},
  min1:{title:'سورة الفاتحة · Al-Fātiḥa',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:51.958,url:commonsFile('Sura Minshawi 1.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 1.ogg')},
  min2:{title:'سورة البقرة · Al-Baqarah',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:8217,url:commonsFile('Sura Minshawi 2.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 2.ogg')},
  min4:{title:'سورة النساء · An-Nisāʾ',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:5170,url:commonsFile('Sura Minshawi 4.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 4.ogg')},
  min5:{title:'سورة المائدة · Al-Māʾidah',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:4036,url:commonsFile('Sura Minshawi 5.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 5.ogg')},
  min12:{title:'سورة يوسف · Yūsuf',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:2701,url:commonsFile('Sura Minshawi 12.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 12.ogg')},
  min14:{title:'سورة إبراهيم · Ibrāhīm',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:1118,url:commonsFile('Sura Minshawi 14.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 14.ogg')},
  min20:{title:'سورة طه · Ṭā-Hā',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:1627,url:commonsFile('Sura Minshawi 20.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 20.ogg')},
  min25:{title:'سورة الفرقان · Al-Furqān',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:1082,url:commonsFile('Sura Minshawi 25.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 25.ogg')},
  min26:{title:'سورة الشعراء · Ash-Shuʿarāʾ',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:1617,url:commonsFile('Sura Minshawi 26.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 26.ogg')},
  min27:{title:'سورة النمل · An-Naml',artist:'محمد صديق المنشاوي',culture:'Qur’an · تلاوة مقدسة',kind:'sacred',duration:1468,url:commonsFile('Sura Minshawi 27.ogg'),license:'Public domain · Egypt',source:commonsPage('Sura Minshawi 27.ogg')},
  syriac:{title:'Abun d-bashmayo · الصلاة الربانية',artist:'Western Syriac rite',culture:'Syriac / Aramaic Christian',kind:'sacred',duration:80.171,url:commonsFile('Abunbshmayo.ogg'),license:'CC0 1.0',source:commonsPage('Abunbshmayo.ogg')},
  gregorian:{title:'Veni Sancte Spiritus · Gregorian chant',artist:'Membeth',culture:'Latin Christian',kind:'sacred',duration:157,url:commonsFile('Veni.sancte.spiritus.ogg'),license:'Public domain',source:commonsPage('Veni.sancte.spiritus.ogg')},
  avemaria:{title:'Ave Maria · Robert Parsons',artist:"St. Paul's Episcopal Church, Indianapolis",culture:'Christian · Sacred choral',kind:'sacred',duration:272,url:commonsFile('Ave Maria - Parsons.ogg'),license:'CC0 1.0',source:commonsPage('Ave Maria - Parsons.ogg')},
  moreschi:{title:'Ave Maria · Bach/Gounod',artist:'Alessandro Moreschi',culture:'Christian · Sacred vocal',kind:'sacred',duration:188,url:commonsFile('AlessandroMoreschi-AveMaria-cleaned.ogg'),license:'Public domain',source:commonsPage('AlessandroMoreschi-AveMaria-cleaned.ogg')},
  jewish:{title:'Broisch haschoni · Cantorial heritage',artist:'Gershon Sirota',culture:'Jewish / Ashkenazi',kind:'sacred',duration:164.493,url:commonsFile('Broisch haschoni (1908).ogg'),license:'Public domain',source:commonsPage('Broisch haschoni (1908).ogg')},
  kaddish:{title:'Kaddish · Jisgadal wějiskadasch',artist:'Gershon Sirota',culture:'Jewish · Cantorial prayer',kind:'sacred',duration:161,url:commonsFile('Gershon Sirota. Jisgadal wějiskadasch. 1903.ogg'),license:'Public domain',source:commonsPage('Gershon Sirota. Jisgadal wějiskadasch. 1903.ogg')},
  adon:{title:'Adon Olam · אדון עולם',artist:'Gershon Sirota',culture:'Jewish · Liturgical',kind:'sacred',duration:212.4,url:commonsFile('Adoin oilom (1903).ogg'),license:'Public domain',source:commonsPage('Adoin oilom (1903).ogg')},
  retseh:{title:'Retseh · Accept our prayers',artist:'Gershon Sirota',culture:'Jewish · Cantorial prayer',kind:'sacred',duration:183,url:commonsFile('Retseh (1908).ogg'),license:'Public domain',source:commonsPage('Retseh (1908).ogg')},
  zadik:{title:'Zadik katomor · The righteous shall flourish',artist:'Gershon Sirota',culture:'Jewish · Cantorial heritage',kind:'sacred',duration:156.26,url:commonsFile('Zadik katomor (1908).ogg'),license:'Public domain',source:commonsPage('Zadik katomor (1908).ogg')},
  habein:{title:'Habein jakir li · Ephraim, my dear son',artist:'Gershon Sirota',culture:'Jewish · Cantorial heritage',kind:'sacred',duration:147,url:commonsFile('Habein jakir li (1908).ogg'),license:'Public domain',source:commonsPage('Habein jakir li (1908).ogg')},
  birchos:{title:'Birchos Kohanim · ברכת כהנים',artist:'Gershon Sirota',culture:'Jewish · Priestly blessing',kind:'sacred',duration:180,url:commonsFile('Birchos kohanim (1908).ogg'),license:'Public domain',source:commonsPage('Birchos kohanim (1908).ogg')},
  weseeraw:{title:'Wěseeraw olecho · May our prayers be sweet',artist:'Gershon Sirota',culture:'Jewish · Cantorial prayer',kind:'sacred',duration:178.29,url:commonsFile('Wěseeraw olecho (1902).ogg'),license:'Public domain',source:commonsPage('Wěseeraw olecho (1902).ogg')},
  qawwali:{title:'Sohini Qawwali',artist:'Imdad Khan',culture:'South Asia / Sufi tradition',kind:'spiritual',duration:185,url:commonsFile('Sohini Qawwali.ogg'),license:'Public domain',source:commonsPage('Sohini Qawwali.ogg')},
  gamelan:{title:'Gamelan Anklung Berong Pengetjet',artist:'Traditional ensemble',culture:'Bali / Nusantara',kind:'harmony',duration:177,url:commonsFile('Gamelan Anklung Berong Pengetjet (1931).ogg'),license:'Public domain',source:commonsPage('Gamelan Anklung Berong Pengetjet (1931).ogg')},
  persia:{title:'Baiaty · Chiraz · Rast',artist:'Traditional Persian music',culture:'Persia / Iran',kind:'harmony',duration:183,url:commonsFile('Baiaty Chiraz Rast .ogg'),license:'Public domain',source:commonsPage('Baiaty Chiraz Rast .ogg')},
  china:{title:'Yu Wang Tan Ming',artist:'Jianhong He',culture:'China',kind:'harmony',duration:179,url:commonsFile('Yu Wang Tan Ming (c. 1920).ogg'),license:'Public domain',source:commonsPage('Yu Wang Tan Ming (c. 1920).ogg')},
  japan:{title:'Koromogo-e',artist:'Kunai-sho gakubu',culture:'Japan',kind:'harmony',duration:159,url:commonsFile('Koromogo-e (c. 1930).ogg'),license:'Public domain',source:commonsPage('Koromogo-e (c. 1930).ogg')},
  africa:{title:'Music for the Lela Celebration',artist:'Traditional',culture:'Africa / Cameroon',kind:'heritage',duration:134,url:commonsFile('Music for the Lela Celebration.ogg'),license:'Public domain',source:commonsPage('Music for the Lela Celebration.ogg')},
  bach:{title:'Air · BWV 1068',artist:'J. S. Bach',culture:'Europe',kind:'harmony',duration:259.9,url:commonsFile('Air (Bach).ogg'),license:'Public domain',source:commonsPage('Air (Bach).ogg')},
  mozart:{title:'Eine kleine Nachtmusik · Allegro',artist:'W. A. Mozart',culture:'Europe',kind:'classical',duration:355,url:commonsFile('Mozart - Eine kleine Nachtmusik - 1. Allegro.ogg'),license:'Commons licensed',source:commonsPage('Mozart - Eine kleine Nachtmusik - 1. Allegro.ogg')},
  oud:{title:'Arabic Oud · عود عربي',artist:'Houssem Bettaibi',culture:'Arab world',kind:'harmony',duration:49.64,url:commonsFile('OUD.ogg'),license:'CC BY-SA 3.0',source:commonsPage('OUD.ogg')},
  julia:{title:'غابت شمس الحق · منرفض نحنا نموت',artist:'جوليا بطرس',culture:'Arab · refusal of death / memory',kind:'memory-song',duration:313.504,url:'assets/audio/memorial/julia-ghabat-shams-alhaq.mp3',license:'User-supplied recording · publication rights to be confirmed by site operator',source:'radio.html'},
  heartbeat:{title:'Heartbeat · A Song for Syria',artist:'Ansam + Syrian children / UNICEF project',culture:'Syria · children · hope',kind:'children',duration:222.250,url:'assets/audio/memorial/heartbeat-song-for-syria.mp3',license:'User-supplied copy · editorial source: UNICEF',source:'https://www.unicef.org/mena/press-releases/unicef-and-regional-ambassador-zade-dirani-launch-heartbeat-song-syria'},
  sarkha:{title:'صرخة · رسالة طفل لاجئ',artist:'رشيد غلام (provisional identification)',culture:'Syria · refugee child · winter',kind:'children',duration:392.647,url:'assets/audio/memorial/sarkha-child-refugee.mp3',license:'User-supplied recording · publication rights to be confirmed by site operator',source:'radio.html'},
  syriaalone:{title:"You're Not Alone, Syria",artist:'Song4Syria',culture:'Syria · solidarity',kind:'children',duration:358.583,url:'assets/audio/memorial/youre-not-alone-syria.mp3',license:'User-supplied recording · publication rights to be confirmed by site operator',source:'radio.html'},
  oneday:{title:'One Day',artist:'Matisyahu',culture:'Global bridge · peace',kind:'global-bridge',duration:213.447,url:'assets/audio/memorial/one-day.mp3',license:'User-supplied recording · publication rights to be confirmed by site operator',source:'radio.html'},
  healworld:{title:'Heal the World',artist:'Michael Jackson',culture:'Global bridge · children / healing',kind:'global-bridge',duration:382.119,url:'assets/audio/memorial/heal-the-world.mp3',license:'User-supplied recording · publication rights to be confirmed by site operator',source:'radio.html'}
 };
 const QURAN=['min2','min12','min20','min4','min14','min5','min26','min27','min25'];
 const BELIEF_VIOLENCE_MEMORIAL=['beliefSilence','min1','jewish','syriac','qawwali','gregorian','oud','kaddish','min5','avemaria','adon','persia','africa','bach','beliefSilence'];
 const GHOUTA_MEMORIAL=['ghoutaSilence','min1','oud','heartbeat','syriac','sarkha','min14','julia','oud','syriaalone','min25','heartbeat','syriac','oneday','min26','healworld','oud','min27','julia','ghoutaSilence'];
 const JEWISH_SABBATH=['adon','kaddish','jewish','retseh','zadik','habein','birchos','weseeraw'];
 const CHRISTIAN_SUNDAY=['syriac','gregorian','avemaria','moreschi','bach'];
 const SPIRITUAL_LIBRARY=['syriac','gregorian','jewish','qawwali','oud','persia','gamelan','china','japan','africa','bach','mozart'];
 const audio=new Audio(); audio.preload='auto'; let currentId=''; let wantedOffset=0; let userOn=localStorage.getItem('luxdot.radio.on')==='1'; let loadToken=0; let status='جاهز · Ready';
 function chaamParts(date=new Date()){const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',weekday:'short',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(date);return Object.fromEntries(parts.map(p=>[p.type,p.value]));}
 function secondsOfDay(date=new Date()){const p=chaamParts(date);return (+p.hour)*3600+(+p.minute)*60+(+p.second)}
 function cycle(listIds,date=new Date()){const list=listIds.map(id=>({id,...TRACKS[id]}));const total=list.reduce((a,t)=>a+t.duration,0);let x=secondsOfDay(date)%total,chosen=list[0];for(const t of list){if(x<t.duration){chosen=t;break}x-=t.duration}return{track:chosen,offset:x,list};}
 function modeFor(date=new Date()){
  const p=chaamParts(date);
  // 22 August: UN International Day Commemorating Victims of Acts of Violence Based on Religion or Belief.
  if(p.day==='22'&&p.month==='08')return{
    key:'belief-violence-memory',
    name:'22 August · ضحايا العنف بسبب الدين أو المعتقد',
    label:'SILENCE → QUR’AN / JEWISH / CHRISTIAN / SUFI → DIGNITY → PEACE',
    ids:BELIEF_VIOLENCE_MEMORIAL
  };
  // 21 August is an annual LuxDot memorial day for the victims of the 2013 Ghouta sarin attack.
  if(p.day==='21'&&p.month==='08')return{
    key:'ghouta-memorial',
    name:'الغوطة · من الصمت إلى الحياة · Ghouta Memorial Broadcast',
    label:'60s SILENCE → QUR’AN → CHILDREN / LIFE / PEACE → WORLD MUSIC',
    ids:GHOUTA_MEMORIAL
  };
  if(p.weekday==='Sat')return{key:'jewish',name:'Shabbat · שבת · السبت اليهودي',label:'تراث وروحانيات يهودية · Jewish sacred heritage',ids:JEWISH_SABBATH};
  if(p.weekday==='Sun')return{key:'christian',name:'Sunday · الأحد المسيحي',label:'ترانيم وروحانيات مسيحية · Christian sacred music',ids:CHRISTIAN_SUNDAY};
  return{key:'quran',name:'Qur’an Live from Chaam · قرآن من شام',label:'قرآن مباشر من شام · Qur’an from Chaam',ids:QURAN};
 }
 function live(date=new Date()){const m=modeFor(date),c=cycle(m.ids,date);return{program:{name:m.name,mode:m.key,label:m.label},track:c.track,offset:c.offset,list:c.list};}
 function next24(){const now=new Date(),rows=[];for(let i=0;i<24;i++){const d=new Date(now.getTime()+i*3600000),p=chaamParts(d),s=live(d);rows.push({time:`${p.hour}:00`,day:p.weekday,track:s.track,program:s.program})}return rows}
 function week(){const now=new Date(),rows=[];for(let i=0;i<7;i++){const d=new Date(now.getTime()+i*86400000),p=chaamParts(d),m=modeFor(d);rows.push({day:p.weekday,date:`${p.day}-${p.month}`,program:m})}return rows}
 function ensureDock(){if(document.getElementById('luxdot-radio-dock'))return;const d=document.createElement('div');d.id='luxdot-radio-dock';d.innerHTML='<div class="lrd-main"><button id="luxdot-radio-play" aria-label="Play LuxDot Radio">▶</button><div><div class="lrd-title"><span class="lrd-pulse"></span>إذاعة نقطة نور · LuxDot من شام</div><div class="lrd-track" id="luxdot-radio-track">قرآن مباشر من شام</div></div><span class="lrd-live">LIVE</span></div><div class="lrd-sub"><span id="luxdot-radio-day">Chaam · شام · 24/7</span><a href="radio.html">OPEN ↗</a></div>';document.body.appendChild(d);document.getElementById('luxdot-radio-play').onclick=toggle;}
 function setStatus(v){status=v;document.dispatchEvent(new CustomEvent('luxdotradio-status',{detail:v}))}
 function loadTrack(s,autoplay){const token=++loadToken;currentId=s.track.id;wantedOffset=Math.max(0,Math.min(s.offset,s.track.duration-1));setStatus('تحميل البث… · Loading…');audio.pause();audio.removeAttribute('src');audio.load();audio.src=s.track.url;audio.load();const ready=()=>{if(token!==loadToken)return;try{if(Number.isFinite(audio.duration)&&wantedOffset<audio.duration)audio.currentTime=wantedOffset}catch(e){} if(autoplay){audio.play().then(()=>setStatus('يبث الآن من شام · LIVE from Chaam')).catch(e=>setStatus('اضغط تشغيل للسماح بالصوت · Tap play to allow audio'))}else setStatus('جاهز · Ready')};audio.addEventListener('loadedmetadata',ready,{once:true});audio.addEventListener('canplay',()=>{if(token===loadToken&&autoplay&&audio.paused)audio.play().catch(()=>{})},{once:true});}
 function sync(force=false){const s=live();ensureDock();const tr=document.getElementById('luxdot-radio-track');if(tr)tr.textContent=s.track.title+' · '+s.track.artist;const day=document.getElementById('luxdot-radio-day');if(day)day.textContent='Chaam · شام · 24/7';if(force||currentId!==s.track.id)loadTrack(s,userOn);else if(userOn&&!audio.paused&&Math.abs((audio.currentTime||0)-s.offset)>20){try{audio.currentTime=s.offset}catch(e){}}updateBtn();document.dispatchEvent(new CustomEvent('luxdotradio',{detail:s}));}
 function updateBtn(){const b=document.getElementById('luxdot-radio-play');if(b)b.textContent=userOn&&!audio.paused?'❚❚':'▶'}
 function toggle(){ensureDock();if(!userOn||audio.paused){userOn=true;localStorage.setItem('luxdot.radio.on','1');const s=live();if(currentId!==s.track.id||!audio.src)loadTrack(s,true);else audio.play().then(()=>setStatus('يبث الآن من شام · LIVE from Chaam')).catch(()=>setStatus('تعذر التشغيل؛ جرّب فتح صفحة الراديو · Playback blocked'));}else{userOn=false;localStorage.setItem('luxdot.radio.on','0');audio.pause();setStatus('متوقف مؤقتاً · Paused')}updateBtn()}
 audio.addEventListener('ended',()=>sync(true));audio.addEventListener('play',updateBtn);audio.addEventListener('pause',updateBtn);audio.addEventListener('error',()=>{const code=audio.error?audio.error.code:'?';setStatus('تعذر تحميل المصدر الصوتي ('+code+') · جرّب إعادة التشغيل'); if(userOn)setTimeout(()=>sync(true),2500)});

 // v4.9.0 · top-of-the-hour multilingual station ident
 const HOURLY_LANG={
  0:'ar',1:'en',2:'nl',3:'he',4:'jv',5:'id',6:'fr',7:'es',8:'de',9:'tr',10:'en',11:'nl',
  12:'ar',13:'he',14:'jv',15:'id',16:'fr',17:'es',18:'de',19:'tr',20:'en',21:'nl',22:'he',23:'ar'
 };
 let identBusy=false,identTimer=null;
 function localHourKey(date=new Date()){const p=chaamParts(date);return `${p.year}-${p.month}-${p.day}T${p.hour}`}
 function identLang(date=new Date()){const p=chaamParts(date);return HOURLY_LANG[+p.hour]||'ar'}
 function playOne(src){return new Promise(resolve=>{const a=new Audio(src);a.preload='auto';a.onended=resolve;a.onerror=resolve;a.play().catch(()=>resolve())})}
 async function playHourlyIdent(force=false){
   if(identBusy||!userOn)return;
   const now=new Date(), key='luxdot.hourly.ident.'+localHourKey(now);
   if(!force && localStorage.getItem(key)==='1')return;
   identBusy=true;localStorage.setItem(key,'1');
   const wasPlaying=!audio.paused; audio.pause();
   const lang=identLang(now);
   setStatus('هوية المحطة · STATION ID · '+lang.toUpperCase());
   await playOne('assets/audio/idents/hour-strike.wav');
   await playOne('assets/audio/idents/station-id-'+lang+'.wav');
   await playOne('assets/audio/idents/luxdot-signature.wav');
   identBusy=false;
   if(wasPlaying||userOn){sync(true)}
 }
 function msToNextHour(){
   const p=chaamParts(new Date()),m=+p.minute,s=+p.second;
   return ((59-m)*60+(60-s))*1000+120;
 }
 function scheduleHourlyIdent(){
   clearTimeout(identTimer);
   identTimer=setTimeout(async()=>{await playHourlyIdent(false);scheduleHourlyIdent()},msToNextHour());
 }

 window.LuxDotRadio={TRACKS,QURAN,BELIEF_VIOLENCE_MEMORIAL,JEWISH_SABBATH,CHRISTIAN_SUNDAY,SPIRITUAL_LIBRARY,live,next24,week,audio,toggle,sync,playHourlyIdent,identLang,getStatus:()=>status};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{ensureDock();sync(false);scheduleHourlyIdent();setInterval(()=>sync(false),15000)});else{ensureDock();sync(false);scheduleHourlyIdent();setInterval(()=>sync(false),15000)}
})();

document.addEventListener('pointermove',function(e){
 const d=document.getElementById('luxdot-radio-dock'); if(!d)return;
 const r=d.getBoundingClientRect(),pad=110;
 const near=e.clientX>r.left-pad&&e.clientX<r.right+pad&&e.clientY>r.top-pad&&e.clientY<r.bottom+pad;
 document.documentElement.classList.toggle('luxdot-radio-near',near);
},{passive:true});
document.addEventListener('click',function(e){
 const d=e.target.closest&&e.target.closest('#luxdot-radio-dock'); if(d)d.classList.toggle('lrd-open',true);
});
