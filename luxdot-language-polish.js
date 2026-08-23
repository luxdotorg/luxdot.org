(()=>{
'use strict';
const L={
 ar:{
  'LUXDOT · PROPHETS · SHARED-CORE STORY':'لوكسدوت · الأنبياء · القصة المشتركة',
  'LUXDOT · PROPHETIC TRADITIONS':'لوكسدوت · التقاليد النبوية',
  'LUXDOT · PROPHETIC TRADITIONS ATLAS':'لوكسدوت · أطلس التقاليد النبوية',
  'LUXDOT · PROPHET RELATIONS':'لوكسدوت · علاقات الأنبياء',
  'LUXDOT · ACTIVE STORIES':'لوكسدوت · قصص مفعّلة',
  'EXPANDED ATLAS':'الأطلس الموسّع','INTERACTIVE GRAPH':'جراف تفاعلي',
  'ACTIVE STORY':'قصة مفعّلة','OPEN SHORT STORY →':'افتح القصة المختصرة ←',
  'COMMON GROUND FIRST':'المشترك أولًا','SHARED-CORE STORY':'القصة المشتركة',
  'LIVE RESEARCH':'أبحاث حيّة','RESEARCH':'بحث','SCIENCE':'علوم','MEMORY':'ذاكرة',
  'PROJECTS':'مشاريع','MEDIA':'وسائط','NEWS':'أخبار','LIBRARY':'المكتبة',
  'ABOUT':'عن لوكسدوت','HOME':'الرئيسية','BACK':'رجوع','NEXT':'التالي','PREVIOUS':'السابق',
  'READ MORE':'اقرأ المزيد','OPEN':'افتح','SOURCE':'المصدر','SOURCES':'المصادر',
  'STATUS':'الحالة','TIMELINE':'الخط الزمني','ATLAS':'الأطلس','MAP':'الخريطة',
  'REPORT':'تبليغ','CORRECT':'تصحيح','CHALLENGE':'اعتراض'
 },
 en:{'الرئيسية':'Home','المكتبة':'Library','الأبحاث الحيّة':'Live Research','المشاريع':'Projects'},
 nl:{'Home':'Home','Library':'Bibliotheek','Live Research':'Levend onderzoek','Projects':'Projecten'},
 he:{'Home':'ראשי','Library':'ספרייה','Live Research':'מחקר חי','Projects':'פרויקטים'},
 jv:{'Home':'Ngarep','Library':'Pustaka','Live Research':'Panaliten Urip','Projects':'Proyèk'},
 id:{'Home':'Beranda','Library':'Perpustakaan','Live Research':'Riset Hidup','Projects':'Proyek'},
 fr:{'Home':'Accueil','Library':'Bibliothèque','Live Research':'Recherche vivante','Projects':'Projets'},
 es:{'Home':'Inicio','Library':'Biblioteca','Live Research':'Investigación viva','Projects':'Proyectos'},
 de:{'Home':'Start','Library':'Bibliothek','Live Research':'Live-Forschung','Projects':'Projekte'},
 tr:{'Home':'Ana sayfa','Library':'Kütüphane','Live Research':'Canlı Araştırma','Projects':'Projeler'}
};
const lang=()=>new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en';
const preserve=e=>e.closest('code,pre,kbd,samp,[translate="no"],.notranslate,.native,.original-script,.transliteration,.formula') ||
  /^(https?:|www\.|[\w.+-]+@)/i.test((e.nodeValue||'').trim());
function translateExact(text,l){
 const d=L[l]||{}; const t=text.trim();
 if(d[t]) return text.replace(t,d[t]);
 // Versioned kickers: strip vN then translate base.
 const m=t.match(/^(.*?)(?:\s*·\s*v[\d.]+)$/i);
 if(m && d[m[1]]) return text.replace(t,d[m[1]]);
 return text;
}
function polish(){
 const l=lang();document.documentElement.lang=l;document.documentElement.dir=(l==='ar'||l==='he')?'rtl':'ltr';
 if(document.body)document.body.dir=document.documentElement.dir;
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){
  if(!n.nodeValue.trim()||preserve(n))continue;
  const x=translateExact(n.nodeValue,l);if(x!==n.nodeValue)n.nodeValue=x;
 }
 // Arabic page: make mandatory non-Arabic scientific/original labels bilingual when a data-ar-label exists.
 if(l==='ar')document.querySelectorAll('[data-ar-label]').forEach(e=>{
   const a=e.dataset.arLabel;if(a&&!e.textContent.includes(a))e.textContent=a+' — '+e.textContent.trim();
 });
 // Normalize controls in current language.
 document.querySelectorAll('button,a,[role="button"]').forEach(e=>{
   const ar=e.getAttribute('aria-label'),title=e.getAttribute('title');
   if(ar){const x=translateExact(ar,l);if(x!==ar)e.setAttribute('aria-label',x)}
   if(title){const x=translateExact(title,l);if(x!==title)e.setAttribute('title',x)}
 });
 document.documentElement.dataset.luxLanguagePolished='1';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(polish,0));else setTimeout(polish,0);
document.addEventListener('luxlang',()=>setTimeout(polish,30));
})();