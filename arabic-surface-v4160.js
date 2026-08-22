/* نقطة نور · Arabic surface normalizer v4.16.0
   Runs only for Arabic UI; URLs/code and marked original-name spans are untouched. */
(()=> {
 const COMMON = new Map([
  ["LuxDot","نقطة نور"],["LUXDOT","نقطة نور"],["Home","الرئيسية"],["Projects","المشاريع"],
  ["Research","الأبحاث"],["Library","المكتبة"],["Memory","الذاكرة"],["Radio","الإذاعة"],
  ["Calendar","الرزنامة"],["Media","الوسائط"],["Values","القيم"],["Witness","الشهادة"],
  ["Knowledge Graph","الخريطة المعرفية"],["Research Standard","معيار البحث"],
  ["Evidence","الأدلة"],["Related nodes","العقد المرتبطة"],["Related Nodes","العقد المرتبطة"],
  ["Executive report","التقرير التنفيذي"],["Executive Report","التقرير التنفيذي"],
  ["Challenge","اعتراض / تصحيح"],["Graph","الخريطة"],["Search","بحث"],["All research","كل الأبحاث"],
  ["Cosmic nodes","عقد كونية"],["Research galaxies","مجرات بحثية"],["Time hubs","محاور زمنية"],
  ["Confidence scale","مقياس الثقة"],["Identity Tags","بطاقات الأثر"],["New Galaxies","مجرات جديدة"],
  ["Interactive Research Cosmos","الكون البحثي التفاعلي"],["Galaxies","المجرات"],["Clusters","العناقيد"],
  ["Research Worlds","عوالم البحث"],["Satellites","الأقمار"],["Signals","الإشارات"],["LIVE RESEARCH","الأبحاث الحيّة"]
 ]);
 function isArabic(){
   const q=new URLSearchParams(location.search).get("lang");
   return (q||document.documentElement.lang||localStorage.getItem("luxdot.lang")||"").slice(0,2)==="ar";
 }
 function skip(el){
   return el.closest("script,style,code,pre,textarea,input,select,option,[data-original-name],[data-preserve-latin],.latin-name,.original-name");
 }
 function normalizeText(root=document.body){
   if(!isArabic()||!root)return;
   const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
   const nodes=[]; while(w.nextNode()) nodes.push(w.currentNode);
   for(const n of nodes){
     if(!n.parentElement||skip(n.parentElement))continue;
     let s=n.nodeValue;
     for(const [a,b] of COMMON) s=s.replace(new RegExp("\\b"+a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","g"),b);
     /* Arabic transliteration spelling is unified to نقطة نور. */
     s=s.replace(/لوكس\s*دوت/gi,"نقطة نور");
     n.nodeValue=s;
   }
 }
 function markOriginalNames(){
   if(!isArabic())return;
   /* We intentionally retain Latin/non-Arabic personal names next to Arabic forms for searchability. */
   document.documentElement.dataset.originalNamesPolicy="arabic-plus-original";
 }
 function run(){
   if(!isArabic())return;
   normalizeText();markOriginalNames();
   let title=document.title;
   title=title.replace(/LuxDot|LUXDOT|لوكس\s*دوت/gi,"نقطة نور")
              .replace(/Jewish Research/gi,"أبحاث يهودية")
              .replace(/Living Research/gi,"بحث حي")
              .replace(/Research Graph/gi,"خريطة الأبحاث")
              .replace(/Timeline/gi,"خط زمني")
              .replace(/Sources/gi,"المصادر")
              .replace(/Method/gi,"المنهج");
   document.title=title;
   document.documentElement.lang="ar";document.documentElement.dir="rtl";
}
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true}); else run();
})();