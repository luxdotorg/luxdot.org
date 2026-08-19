/* LuxDot v4.3.76 — centralized page translation compatibility layer.
   Page-specific multilingual blocks remain authoritative. This layer only
   normalizes document direction/metadata and shared labels; it never hides
   page content while loading. */
(()=>{'use strict';
 const SUP=['ar','en','nl'];
 const lang=()=>{try{const q=new URLSearchParams(location.search).get('lang');if(SUP.includes(q))return q;const s=localStorage.getItem('luxdot.lang');return SUP.includes(s)?s:'en'}catch(_){return 'en'}};
 const L={
  ar:{sources:'المصادر والتوثيق',back:'العودة',loading:'جاري التحميل…'},
  en:{sources:'Sources & documentation',back:'Back',loading:'Loading…'},
  nl:{sources:'Bronnen & documentatie',back:'Terug',loading:'Laden…'}
 };
 function run(){
  const l=lang(); document.documentElement.lang=l; document.documentElement.dir=l==='ar'?'rtl':'ltr';
  document.body?.classList.add('lux-lang-ready');
  document.querySelectorAll('[data-common-label]').forEach(el=>{const k=el.dataset.commonLabel;if(L[l][k])el.textContent=L[l][k]});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
 document.addEventListener('luxlang',run);
})();
