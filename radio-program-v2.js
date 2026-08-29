(()=>{
'use strict';
const ARTISTS=['فيروز','عمر دياب','أصالة نصري','نجوى كرم','وائل جسار','أم كلثوم','صباح فخري','ميادة الحناوي','ماجدة الرومي','جوليا بطرس','وائل كفوري'];
const LOCATION={name:'Chaam / شام',lat:51.50526,lon:4.86117,timeZone:'Europe/Amsterdam',method:2,school:0};
const RECITERS=['عمر بن ضياء الدين','محمد صديق المنشاوي','محمود خليل الحصري','عبد الباسط عبد الصمد','محمد أيوب'];
const pad=n=>String(n).padStart(2,'0');
const mins=s=>{const m=String(s||'').match(/(\d{1,2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):null};
const hm=n=>`${pad(Math.floor((n%1440+1440)%1440/60))}:${pad((n%60+60)%60)}`;
function localParts(date=new Date()){return Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:LOCATION.timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).filter(x=>x.type!=='literal').map(x=>[x.type,x.value]))}
async function fetchPrayers(date=new Date()){
 const p=localParts(date);const d=`${p.day}-${p.month}-${p.year}`;
 const u=`https://api.aladhan.com/v1/timings/${d}?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}&method=${LOCATION.method}&school=${LOCATION.school}&timezonestring=${encodeURIComponent(LOCATION.timeZone)}`;
 const r=await fetch(u,{cache:'no-store'});if(!r.ok)throw new Error('prayer-times');const j=await r.json();
 const t=j?.data?.timings||{};return {Fajr:String(t.Fajr||'').slice(0,5),Sunrise:String(t.Sunrise||'').slice(0,5),Dhuhr:String(t.Dhuhr||'').slice(0,5),Asr:String(t.Asr||'').slice(0,5),Maghrib:String(t.Maghrib||'').slice(0,5),Isha:String(t.Isha||'').slice(0,5)};
}
function build(prayers={}){
 const fajr=mins(prayers.Fajr)??300;
 const sunrise=mins(prayers.Sunrise)??Math.max(fajr+75,390);
 const morning=Math.max(sunrise,390);
 const rows=[
  {start:fajr,end:Math.min(sunrise,fajr+80),key:'dawn',name:'نور الفجر',detail:'قرآن هادئ بتناوب قراء ذوي أصوات مطمئنة · ابتهالات وروحانيات · بلا إيقاع مرتفع',energy:1},
  {start:Math.min(sunrise,fajr+80),end:morning+90,key:'sunrise',name:'الصبح فتح',detail:'فيروز · صباح عربي هادئ · تنفس وحركة خفيفة · دفعة تفاؤل',energy:2},
  {start:morning+90,end:630,key:'move',name:'صباح الحركة',detail:'رياضة صباحية · أغنيات حيوية مرخّصة · رسائل قصيرة للعمل والطاقة',energy:4},
  {start:630,end:780,key:'day',name:'نهار حي',detail:'عمر دياب · أصالة · نجوى كرم · وائل جسار · وائل كفوري عند توفر حقوق البث',energy:5},
  {start:780,end:900,key:'learn',name:'نتعلم ونحن نسمع',detail:'بودكاستات قصيرة · مهارات حياة · سلامة · صحة عامة · معرفة وعلم',energy:3},
  {start:900,end:1080,key:'afternoon',name:'دفعة العصر',detail:'أغنيات عربية حيوية · فواصل معرفية قصيرة · ذاكرة ومجتمع',energy:4},
  {start:1080,end:1230,key:'evening',name:'مساء الشام',detail:'ماجدة الرومي · ميادة الحناوي · جوليا بطرس · موسيقى شرقية',energy:3},
  {start:1230,end:1410,key:'tarab',name:'طرب وذاكرة',detail:'أم كلثوم · صباح فخري · قدود وموشحات · مختارات كلاسيكية مرخّصة',energy:2},
  {start:1410,end:fajr,key:'night',name:'ليل هادئ',detail:'عود · مقامات · موسيقى هادئة · حكايات · تأمل قبل الفجر',energy:1}
 ];
 return rows.map(r=>({...r,startText:hm(r.start),endText:hm(r.end)}));
}
function now(prayers={},date=new Date()){
 const p=localParts(date),n=mins(`${p.hour}:${p.minute}`),rows=build(prayers);
 const inside=(x,a,b)=>a<=b?x>=a&&x<b:x>=a||x<b;
 return rows.find(r=>inside(n,r.start,r.end))||rows[0];
}
window.LuxDotRadioProgramV2={build,now,fetchPrayers,location:LOCATION,artists:ARTISTS,reciters:RECITERS};
})();
