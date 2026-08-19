/* LuxDot v4.3.85 — Language Integrity Layer
   Rule: never relabel Arabic source content as English/Dutch.
   Pages with [data-locale] use those blocks. Pages without complete locale blocks keep
   their true source language and Kufi typography, and expose a localized notice rather
   than pretending that the page was translated. New LuxDot pages must ship AR/EN/NL
   locale blocks; QA_LANGUAGE_INTEGRITY.py enforces that requirement for new/changed pages. */
(()=>{'use strict';
 const SUP=['ar','en','nl','he'];
 const requested=()=>{try{const q=new URLSearchParams(location.search).get('lang');if(SUP.includes(q))return q;const s=localStorage.getItem('luxdot.lang');return SUP.includes(s)?s:'en'}catch(_){return 'en'}};
 const UI={
  ar:{sources:'المصادر والتوثيق',back:'العودة',note:'المحتوى الأصلي لهذه الصفحة عربي.'},
  en:{sources:'Sources & documentation',back:'Back',note:'This page has not yet passed the complete English localization gate. The Arabic source is shown in its original typography rather than being mislabeled as English.'},
  nl:{sources:'Bronnen & documentatie',back:'Terug',note:'Nederlandse vertaling'},
  he:{sources:'מקורות ותיעוד',back:'חזרה',note:'תרגום לעברית'}
 };
 function arabicDominant(){
  const main=document.querySelector('main')||document.body;if(!main)return false;
  const s=(main.innerText||'').replace(/\s+/g,' '), ar=(s.match(/[\u0600-\u06ff]/g)||[]).length, lat=(s.match(/[A-Za-z]/g)||[]).length;
  return ar>120 && ar>lat*.65;
 }
 function localeBlocks(l){
  const bs=[...document.querySelectorAll('[data-locale]')];if(!bs.length)return false;
  bs.forEach(b=>b.hidden=true);let hit=bs.find(b=>b.dataset.locale===l)||bs.find(b=>b.dataset.locale==='en');if(hit){hit.hidden=false;const h=hit.querySelector('h1');if(h&&h.textContent.trim())document.title=h.textContent.trim()+' · LuxDot'}
  return !!hit;
 }
 function notice(l){
  if(l==='ar'||document.getElementById('lux-language-integrity-note'))return;
  const n=document.createElement('aside');n.id='lux-language-integrity-note';n.setAttribute('role','status');n.textContent=UI[l].note;
  n.style.cssText='position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147482900;width:min(760px,calc(100% - 34px));padding:10px 14px;border:1px solid rgba(210,177,91,.32);border-radius:14px;background:rgba(2,6,4,.93);color:#dfe9e1;font:12px/1.6 Arial,Helvetica,sans-serif;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.35)';
  document.body.appendChild(n);
 }
 function run(){
  const l=requested();
  const has=localeBlocks(l);
  if(has){document.documentElement.lang=l;document.documentElement.dir=(l==='ar'||l==='he')?'rtl':'ltr';document.documentElement.dataset.contentLang=l;}
  else if(l!=='ar'&&arabicDominant()){
    document.documentElement.lang='ar';document.documentElement.dir='rtl';document.documentElement.dataset.contentLang='ar';document.documentElement.dataset.requestedLang=l;document.body?.classList.add('lux-source-arabic');notice(l);
  } else {document.documentElement.lang=l;document.documentElement.dir=(l==='ar'||l==='he')?'rtl':'ltr';document.documentElement.dataset.contentLang=l;}
  document.querySelectorAll('[data-common-label]').forEach(el=>{const k=el.dataset.commonLabel;if(UI[l]?.[k])el.textContent=UI[l][k]});
  document.body?.classList.add('lux-lang-ready');
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
 document.addEventListener('luxlang',run);
})();
