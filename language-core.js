(()=>{'use strict';
const SUP=['ar','en','nl','he'];
const DIR={ar:'rtl',en:'ltr',nl:'ltr',he:'rtl'};
const NAME={ar:'العربية',en:'English',nl:'Nederlands',he:'עברית'};
const BRAND={ar:'نقطة نور',en:'LuxDot',nl:'LuxDot',he:'LuxDot'};
const NAV={
 ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',nusantara:'نوسانتارا',memory:'الذاكرة',research:'الأبحاث',projects:'المشاريع'},
 en:{home:'Home',library:'Library',faith:'Faith & Wisdom',nusantara:'Nusantara',memory:'Memory',research:'Research',projects:'Projects'},
 nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',nusantara:'Nusantara',memory:'Geheugen',research:'Onderzoek',projects:'Projecten'},
 he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',nusantara:'נוסנטרה',memory:'זיכרון',research:'מחקר',projects:'פרויקטים'}
};
function query(){try{const q=new URLSearchParams(location.search).get('lang');return SUP.includes(q)?q:null}catch(_){return null}}
function saved(){try{const a=localStorage.getItem('luxdot.lang'),b=localStorage.getItem('luxdot_lang');return SUP.includes(a)?a:(SUP.includes(b)?b:null)}catch(_){return null}}
function current(){return query()||saved()||'en'}
function syncStore(l){try{localStorage.setItem('luxdot.lang',l);localStorage.setItem('luxdot_lang',l)}catch(_){}}
function setDoc(l){
 const de=document.documentElement; de.lang=l; de.dir=DIR[l]; de.dataset.luxLang=l; de.dataset.contentLang=l;
 if(document.body){
  document.body.dataset.lang=l; document.body.dataset.contentLang=l;
  ['ar','en','nl','he'].forEach(x=>document.body.classList.remove('lang-'+x));
  document.body.classList.add('lang-'+l); document.body.classList.toggle('rtl-core',DIR[l]==='rtl');
 }
}
function set(l){if(!SUP.includes(l))l='en'; window.__LUX_LANG=l; syncStore(l); setDoc(l); document.dispatchEvent(new CustomEvent('luxlang',{detail:{lang:l}})); window.dispatchEvent(new CustomEvent('luxdot-language',{detail:{lang:l}}))}
function navigate(l){if(!SUP.includes(l))l='en'; syncStore(l); const u=new URL(location.href);u.searchParams.set('lang',l);location.assign(u.pathname+u.search+u.hash)}
function localeBlocks(l){
 const bs=[...document.querySelectorAll('[data-locale]')]; if(!bs.length)return false;
 bs.forEach(b=>{b.hidden=true;b.style.setProperty('display','none','important')});
 let hit=bs.find(b=>b.dataset.locale===l);
 if(!hit&&l!=='ar') hit=bs.find(b=>b.dataset.locale==='en');
 if(!hit) hit=bs.find(b=>b.dataset.locale==='ar');
 if(hit){hit.hidden=false;hit.style.removeProperty('display');return true} return false;
}
function selectors(l){
 document.querySelectorAll('[data-lang-select],select.lang-select,select.lang').forEach(s=>{if(s.tagName!=='SELECT')return;s.innerHTML=SUP.map(x=>`<option value="${x}">${NAME[x]}</option>`).join('');s.value=l;if(!s.dataset.coreLangBound){s.dataset.coreLangBound='1';s.addEventListener('change',e=>navigate(e.target.value),true)}});
 document.querySelectorAll('[data-lang]').forEach(b=>{const x=b.getAttribute('data-lang');if(!SUP.includes(x))return;b.classList.toggle('active',x===l);if(!b.dataset.coreLangBound){b.dataset.coreLangBound='1';b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();navigate(x)},true)}})
}
function ensurePicker(l){
 if(document.querySelector('#lux-global-lang-picker'))return;
 const p=document.createElement('div');p.id='lux-global-lang-picker';p.setAttribute('aria-label','Language');
 p.innerHTML=SUP.map(x=>`<button type="button" data-core-lang="${x}" class="${x===l?'active':''}">${NAME[x]}</button>`).join('');
 p.addEventListener('click',e=>{const b=e.target.closest('[data-core-lang]');if(b)navigate(b.dataset.coreLang)});document.body.appendChild(p)
}
function common(l){const n=NAV[l];document.querySelectorAll('[data-lux-brand],header .logo,.top .logo').forEach(e=>e.textContent=BRAND[l]);document.querySelectorAll('header a[href],header nav a[href]').forEach(a=>{const f=(a.getAttribute('href')||'').split('/').pop().split('?')[0].split('#')[0],k={'home.html':'home','library.html':'library','faith.html':'faith','nusantara.html':'nusantara','memory.html':'memory','research.html':'research','projects.html':'projects'}[f];if(k&&!a.hasAttribute('data-preserve-label'))a.textContent=n[k]})}
function carry(l){document.querySelectorAll('a[href]').forEach(a=>{const raw=a.getAttribute('href');if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:|data:|https?:\/\/)/i.test(raw))return;const hash=raw.includes('#')?'#'+raw.split('#',2)[1]:'';const base=raw.split('#',1)[0];const path=base.split('?',1)[0];if(!/\.html$/i.test(path))return;const q=new URLSearchParams(base.includes('?')?base.split('?',2)[1]:'');q.set('lang',l);a.setAttribute('href',path+'?'+q.toString()+hash)})}
function markArabic(root=document.body){if(!root)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){if(!n.nodeValue||!/[\u0600-\u06FF]/.test(n.nodeValue))return NodeFilter.FILTER_REJECT;if(n.parentElement&&['SCRIPT','STYLE','TEXTAREA','CODE','PRE'].includes(n.parentElement.tagName))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});const nodes=[];while(w.nextNode())nodes.push(w.currentNode);nodes.forEach(n=>{const p=n.parentElement;if(p&&!p.hasAttribute('lang')){p.classList.add('lux-arabic-text')}})}
function init(){const l=current();window.__LUX_LANG=l;syncStore(l);setDoc(l);localeBlocks(l);selectors(l);common(l);carry(l);ensurePicker(l);markArabic();document.body?.classList.add('lux-lang-ready')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();document.addEventListener('luxlang',()=>setTimeout(init,0));window.LuxLang={get:current,set,navigate,names:NAME,dir:DIR,nav:NAV};
})();
