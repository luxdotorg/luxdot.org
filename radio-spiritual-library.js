(()=>{
'use strict';
const commonsFile=n=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(n).replace(/%2F/g,'/');
window.LUXDOT_SPIRITUAL_LIBRARY={
  adhan:{
    preferredLocal:'assets/audio/licensed/adhan-madinah-style.mp3',
    fallback:{title:'أذان هادئ ومألوف',url:commonsFile('Azan.ogg'),license:'CC BY-SA 4.0'},
    note:'إذا أضيف تسجيل أصلي أو مرخّص من أحد مؤذني المسجد النبوي أو تسجيل بطابع مديني واضح، يأخذ الأولوية. لا ننسب تسجيلاً إلى المدينة أو إلى مؤذن بعينه من دون مصدر وترخيص موثّق.'
  },
  quran:{
    editorialRotation:[
      {name:'عمر بن ضياء الدين',status:'editorial-slot',rights:'فعّل فقط من مصدر يسمح بإعادة البث أو بإذن مباشر'},
      {name:'محمد صديق المنشاوي',status:'active-public-domain-where-verified'},
      {name:'محمود خليل الحصري',status:'editorial-slot',rights:'تحقق من التسجيل المحدد قبل البث'},
      {name:'عبد الباسط عبد الصمد',status:'editorial-slot',rights:'تحقق من التسجيل المحدد قبل البث'},
      {name:'محمد أيوب',status:'editorial-slot',rights:'تحقق من التسجيل المحدد قبل البث'}
    ],
    mood:['سكينة','ترتيل واضح','سرعة هادئة','انشراح','تنويع بلا قطع الآية أو السورة عشوائياً'],
    sacredLock:true
  }
};
})();
