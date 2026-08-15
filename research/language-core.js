(()=>{
'use strict';
const SUP=['ar','en','nl','jv','he'];
const DIR={ar:'rtl',en:'ltr',nl:'ltr',jv:'ltr',he:'rtl'};
const NAME={ar:'العربية',en:'English',nl:'Nederlands',jv:'Basa Jawa',he:'עברית'};
const BRAND={ar:'نقطة نور',en:'LuxDot',nl:'Lichtpunt',jv:'Titik Cahya',he:'נקודת אור'};
const NAV={
 ar:{home:'الرئيسية',library:'المكتبة',memory:'الذاكرة',research:'الأبحاث',projects:'المشاريع',faith:'الإيمان والحكمة',nusantara:'نوسانتارا'},
 en:{home:'Home',library:'Library',memory:'Memory',research:'Research',projects:'Projects',faith:'Faith & Wisdom',nusantara:'Nusantara'},
 nl:{home:'Home',library:'Bibliotheek',memory:'Geheugen',research:'Onderzoek',projects:'Projecten',faith:'Geloof & wijsheid',nusantara:'Nusantara'},
 jv:{home:'Ngarep',library:'Pustaka',memory:'Pangeling',research:'Panliten',projects:'Proyek',faith:'Iman lan kawicaksanan',nusantara:'Nusantara'},
 he:{home:'ראשי',library:'ספרייה',memory:'זיכרון',research:'מחקר',projects:'פרויקטים',faith:'אמונה וחכמה',nusantara:'נוסנטרה'}
};
const TITLES={
 'home.html':{ar:'نقطة نور',en:'LuxDot',nl:'Lichtpunt',jv:'Titik Cahya',he:'נקודת אור'},
 'library.html':{ar:'المكتبة · نقطة نور',en:'Library · LuxDot',nl:'Bibliotheek · Lichtpunt',jv:'Pustaka · Titik Cahya',he:'ספרייה · נקודת אור'},
 'memory.html':{ar:'الذاكرة الحية · نقطة نور',en:'Living Memory · LuxDot',nl:'Levend geheugen · Lichtpunt',jv:'Pangeling Urip · Titik Cahya',he:'זיכרון חי · נקודת אור'},
 'research.html':{ar:'أطلس الأبحاث · نقطة نور',en:'Research Atlas · LuxDot',nl:'Onderzoeksatlas · Lichtpunt',jv:'Atlas Panliten · Titik Cahya',he:'אטלס המחקר · נקודת אור'},
 'projects.html':{ar:'المشاريع · نقطة نور',en:'Projects · LuxDot',nl:'Projecten · Lichtpunt',jv:'Proyek · Titik Cahya',he:'פרויקטים · נקודת אור'}
};
function explicit(){return localStorage.getItem('luxdot.lang.explicit')==='1'}
function saved(){const s=localStorage.getItem('luxdot.lang');return SUP.includes(s)?s:null}
function current(){const boot=window.__LUX_LANG; if(SUP.includes(boot))return boot; return explicit()&&saved()?saved():'en'}
function setDocument(l){document.documentElement.lang=l;document.documentElement.dir=DIR[l];document.documentElement.dataset.luxLang=l;if(document.body){document.body.dataset.lang=l;document.body.classList.toggle('rtl-core',DIR[l]==='rtl')}}
function set(l,mark=true){if(!SUP.includes(l))l='en';window.__LUX_LANG=l;localStorage.setItem('luxdot.lang',l);if(mark)localStorage.setItem('luxdot.lang.explicit','1');setDocument(l);window.dispatchEvent(new CustomEvent('luxdot-language',{detail:{lang:l}}));document.dispatchEvent(new CustomEvent('luxlang',{detail:{lang:l}}));}
function bootstrap(){const q=new URLSearchParams(location.search).get('lang');let l=SUP.includes(q)?q:(explicit()&&saved()?saved():'en');window.__LUX_LANG=l;if(SUP.includes(q)){localStorage.setItem('luxdot.lang',l);localStorage.setItem('luxdot.lang.explicit','1')}else if(!explicit()){localStorage.setItem('luxdot.lang','en')}setDocument(l)}
function selectors(){const l=current();document.querySelectorAll('[data-lang-select], select.lang-select, select.lang').forEach(s=>{if(s.tagName!=='SELECT')return;const vals=[...s.options].map(o=>o.value);if(!SUP.every(x=>vals.includes(x))){s.innerHTML=SUP.map(x=>`<option value="${x}">${NAME[x]}</option>`).join('')}else{[...s.options].forEach(o=>{if(NAME[o.value])o.textContent=NAME[o.value]})}s.value=l;if(!s.dataset.coreLangBound){s.dataset.coreLangBound='1';s.addEventListener('change',e=>{set(e.target.value,true);location.reload()})}})}
function commonUI(){const l=current(),n=NAV[l]||NAV.en;document.querySelectorAll('[data-lux-brand],header .logo,.top .logo').forEach(e=>e.textContent=BRAND[l]);document.querySelectorAll('header a[href], header nav a[href]').forEach(a=>{const f=(a.getAttribute('href')||'').split('/').pop().split('?')[0].split('#')[0];const k={ 'home.html':'home','library.html':'library','memory.html':'memory','research.html':'research','projects.html':'projects','faith.html':'faith','nusantara.html':'nusantara'}[f];if(k&&!a.hasAttribute('data-preserve-label'))a.textContent=n[k]});const fn=(location.pathname.split('/').pop()||'index.html');if(TITLES[fn])document.title=TITLES[fn][l]||TITLES[fn].en}
function localeBlocks(){const l=current(),blocks=[...document.querySelectorAll('[data-locale]')];if(!blocks.length)return;blocks.forEach(b=>b.hidden=true);let b=blocks.find(x=>x.dataset.locale===l);if(!b&&l==='jv')b=blocks.find(x=>x.dataset.locale==='jv')||blocks.find(x=>x.dataset.locale==='id');if(!b)b=blocks.find(x=>x.dataset.locale==='en');if(!b&&l==='ar')b=blocks.find(x=>x.dataset.locale==='ar');if(!b)b=blocks[0];if(b)b.hidden=false}
function init(){setDocument(current());selectors();commonUI();localeBlocks()}
bootstrap();window.LuxLang={get:current,set,explicit:explicit,names:NAME,dir:DIR};document.addEventListener('DOMContentLoaded',init);document.addEventListener('luxlang',()=>setTimeout(init,0));
})();
