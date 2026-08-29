(()=>{
'use strict';
const commonsFile=n=>'https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(n).replace(/%2F/g,'/');
window.LUXDOT_SPIRITUAL_LIBRARY={
  adhan:{
    preferredLocal:'assets/audio/licensed/adhan-madinah-style.mp3',
    fallback:{title:'أذان كامل · مصدر حر',url:commonsFile('Adhan.ogg'),license:'CC0 1.0',source:'Wikimedia Commons',verified:'2026-08-29'},
    alternatives:[
      {title:'Call to prayer',url:commonsFile('Call to prayer.ogg'),license:'CC BY-SA 4.0',source:'Wikimedia Commons'},
      {title:'Muslim calling to prayer',url:commonsFile('Muslim calling to prayer.ogg'),license:'CC0 1.0',source:'Wikimedia Commons'}
    ],
    note:'الأولوية لتسجيل أصلي أو مرخّص من المسجد النبوي/المدينة عند توفر مصدر موثّق وحق إعادة بث واضح. لا ننسب تسجيلاً إلى المدينة أو إلى مؤذن بعينه اعتماداً على التشابه الصوتي.'
  },
  quran:{
    editorialRotation:[
      {name:'عمر بن ضياء الدين',status:'preferred-pending-rights',mood:['سكينة','هدوء'],rights:'يتطلب إذناً مباشراً أو ترخيص إعادة بث واضح للتسجيل المحدد'},
      {name:'محمد صديق المنشاوي',status:'active-verified-recordings',mood:['خشوع','ترتيل'],rights:'فعّل فقط الملفات التي تحققنا من وضعها ملفاً بملف'},
      {name:'محمد أيوب',status:'source-found-license-review',mood:['سكينة','مدني'],candidate:'Shaykh Muhammad Ayyub - Surah Ibrahim 35-41.wav',source:'Wikimedia Commons',rights:'الملف موجود ومفهرس؛ لا يُفعّل حتى يثبت ترخيص التسجيل نفسه بوضوح'},
      {name:'محمود خليل الحصري',status:'editorial-slot',mood:['وضوح','تعليم'],rights:'تحقق من التسجيل المحدد قبل البث'},
      {name:'عبد الباسط عبد الصمد',status:'editorial-slot',mood:['خشوع','مقام'],rights:'لا نفترض أن جميع تسجيلاته ملكية عامة؛ تحقق من تاريخ وحقوق كل تسجيل'}
    ],
    mood:['سكينة','ترتيل واضح','سرعة هادئة','انشراح','تنويع بلا قطع الآية أو السورة عشوائياً'],
    sacredLock:true,
    rules:['لا قطع أثناء التلاوة','لا تفعيل مصدر مجهول الحقوق','عرض اسم القارئ والسورة عند توفر البيانات','التنويع يكون بين تسجيلات موثقة فقط']
  }
};
})();
