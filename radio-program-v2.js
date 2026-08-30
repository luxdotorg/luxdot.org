(()=>{
'use strict';
const ARTISTS=['فيروز','عمر دياب','أصالة نصري','نجوى كرم','وائل جسار','أم كلثوم','صباح فخري','ميادة الحناوي','ماجدة الرومي','جوليا بطرس','وائل كفوري'];
const LOCATION={name:'Chaam / الشام',lat:33.5138,lon:36.2765,timeZone:'Asia/Damascus',method:4,school:0};
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
function build(){
 const rows=[
  {start:360,end:395,key:'dawn',name:'افتتاح الصباح',detail:'تلاوة قرآن مختارة · Sacred Audio Lock يمنع قطع النص المقدس',energy:1},
  {start:395,end:510,key:'morning',name:'صباح الشام',detail:'موسيقى عربية صباحية هادئة · عود ومقامات',energy:2},
  {start:510,end:690,key:'fairuz',name:'فيروز والشام',detail:'فيروز عن الشام · شعر وحكايات عن الشام، عند توفر الملفات المصرّح ببثها',energy:2},
  {start:690,end:840,key:'day',name:'نهار نقطة نور',detail:'معرفة · قصة قصيرة · نافذة عالمية · ذاكرة إنسانية',energy:3},
  {start:840,end:990,key:'rafi',name:'مختارات رافي',detail:'الأغاني التي اختارها رافي من مكتبة نقطة نور · سوريا والطفولة والذاكرة الإنسانية',energy:3},
  {start:990,end:1170,key:'east',name:'مساء الشرق',detail:'موسيقى عربية وشرقية وكلاسيكية هادئة',energy:3},
  {start:1170,end:1320,key:'andalus',name:'ليلة أندلسية',detail:'أندلسيات · موشحات · سماعي',energy:2},
  {start:1320,end:90,key:'aleppo',name:'حلب تسهر',detail:'قدود حلبية · موشحات · موالد وروحانيات',energy:2},
  {start:90,end:255,key:'tarab',name:'طرب الليل',detail:'أم كلثوم وطرب عربي هادئ عند توفر الملفات المصرّح ببثها',energy:1},
  {start:255,end:360,key:'before-dawn',name:'ما قبل الفجر',detail:'هدوء · ناي · قرآن مختار وصولاً إلى السادسة بتوقيت الشام',energy:1}
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
