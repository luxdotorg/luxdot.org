(()=>{
'use strict';
/* UI polish only. Editorial content is owned by the Arabic-master/native locale system. */
const L={
 ar:{'LUXDOT · PROPHETS · SHARED-CORE STORY':'لوكسدوت · الأنبياء · القصة المشتركة','LUXDOT · PROPHETIC TRADITIONS':'لوكسدوت · التقاليد النبوية','LUXDOT · PROPHETIC TRADITIONS ATLAS':'لوكسدوت · أطلس التقاليد النبوية','LUXDOT · PROPHET RELATIONS':'لوكسدوت · علاقات الأنبياء','LUXDOT · ACTIVE STORIES':'لوكسدوت · قصص مفعّلة','EXPANDED ATLAS':'الأطلس الموسّع','INTERACTIVE GRAPH':'جراف تفاعلي','ACTIVE STORY':'قصة مفعّلة','OPEN SHORT STORY →':'افتح القصة المختصرة ←','COMMON GROUND FIRST':'المشترك أولًا','SHARED-CORE STORY':'القصة المشتركة','LIVE RESEARCH':'أبحاث حيّة','RESEARCH':'بحث','SCIENCE':'علوم','MEMORY':'ذاكرة','PROJECTS':'مشاريع','MEDIA':'وسائط','NEWS':'أخبار','LIBRARY':'المكتبة','ABOUT':'عن لوكسدوت','HOME':'الرئيسية','BACK':'رجوع','NEXT':'التالي','PREVIOUS':'السابق','READ MORE':'اقرأ المزيد','OPEN':'افتح','SOURCE':'المصدر','SOURCES':'المصادر','STATUS':'الحالة','TIMELINE':'الخط الزمني','ATLAS':'الأطلس','MAP':'الخريطة','REPORT':'تبليغ','CORRECT':'تصحيح','CHALLENGE':'اعتراض'},
 en:{HOME:'Home',LIBRARY:'Library',RESEARCH:'Research',PROJECTS:'Projects'},
 nl:{HOME:'Home',LIBRARY:'Bibliotheek',RESEARCH:'Onderzoek',PROJECTS:'Projecten'},
 he:{HOME:'ראשי',LIBRARY:'ספרייה',RESEARCH:'מחקר',PROJECTS:'פרויקטים'},
 jv:{HOME:'Ngarep',LIBRARY:'Pustaka',RESEARCH:'Panaliten',PROJECTS:'Proyèk'},
 id:{HOME:'Beranda',LIBRARY:'Perpustakaan',RESEARCH:'Riset',PROJECTS:'Proyek'},
 fr:{HOME:'Accueil',LIBRARY:'Bibliothèque',RESEARCH:'Recherche',PROJECTS:'Projets'},
 es:{HOME:'Inicio',LIBRARY:'Biblioteca',RESEARCH:'Investigación',PROJECTS:'Proyectos'},
 de:{HOME:'Start',LIBRARY:'Bibliothek',RESEARCH:'Forschung',PROJECTS:'Projekte'},
 tr:{HOME:'Ana sayfa',LIBRARY:'Kütüphane',RESEARCH:'Araştırma',PROJECTS:'Projeler'}
};
const lang=()=>new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'ar';
const preserve=e=>e.closest('main,article,.content,.page-content,[data-locale],code,pre,kbd,samp,[translate="no"],.notranslate,.native,.original-script,.transliteration,.formula') || /^(https?:|www\.|[\w.+-]+@)/i.test((e.nodeValue||'').trim());
function translateExact(text,l){const d=L[l]||{},t=text.trim();if(d[t])return text.replace(t,d[t]);const m=t.match(/^(.*?)(?:\s*·\s*v[\d.]+)$/i);if(m&&d[m[1]])return text.replace(t,d[m[1]]);return text}
function polish(){
 const l=lang();document.documentElement.lang=l;document.documentElement.dir=(l==='ar'||l==='he')?'rtl':'ltr';if(document.body)document.body.dir=document.documentElement.dir;
 // Never rewrite editorial prose here. Only chrome outside content containers is eligible.
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(!n.nodeValue.trim()||preserve(n))continue;const x=translateExact(n.nodeValue,l);if(x!==n.nodeValue)n.nodeValue=x}
 document.querySelectorAll('header button,header a,nav button,nav a,[role="navigation"] [role="button"]').forEach(e=>{const ar=e.getAttribute('aria-label'),title=e.getAttribute('title');if(ar){const x=translateExact(ar,l);if(x!==ar)e.setAttribute('aria-label',x)}if(title){const x=translateExact(title,l);if(x!==title)e.setAttribute('title',x)}});
 document.documentElement.dataset.luxLanguagePolished='1';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(polish,0));else setTimeout(polish,0);document.addEventListener('luxlang',()=>setTimeout(polish,30));
})();