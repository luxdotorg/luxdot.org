(()=>{
'use strict';
const ARTISTS=['فيروز','عمر دياب','أصالة نصري','نجوى كرم','وائل جسار','أم كلثوم','صباح فخري','ميادة الحناوي','ماجدة الرومي','جوليا بطرس','وائل كفوري'];
const pad=n=>String(n).padStart(2,'0');
const mins=s=>{const m=String(s||'').match(/(\d{1,2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):null};
const hm=n=>`${pad(Math.floor((n%1440+1440)%1440/60))}:${pad((n%60+60)%60)}`;
function build(prayers={}){
 const fajr=mins(prayers.Fajr)??300;
 const sunrise=mins(prayers.Sunrise)??Math.max(fajr+75,390);
 const morning=Math.max(sunrise,390);
 const rows=[
  {start:fajr,end:Math.min(sunrise,fajr+80),key:'dawn',name:'نور الفجر',detail:'قرآن هادئ · ابتهالات وروحانيات · بلا إيقاع مرتفع',energy:1},
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
 const p=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Amsterdam',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(date);
 const n=mins(p),rows=build(prayers);
 const inside=(x,a,b)=>a<=b?x>=a&&x<b:x>=a||x<b;
 return rows.find(r=>inside(n,r.start,r.end))||rows[0];
}
window.LuxDotRadioProgramV2={build,now,artists:ARTISTS};
})();
