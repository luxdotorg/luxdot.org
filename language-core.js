(()=>{'use strict';
const SUP=['ar','en','nl','he','jv','id','fr','es','de','tr'];
const DIR={ar:'rtl',en:'ltr',nl:'ltr',he:'rtl',jv:'ltr',id:'ltr',fr:'ltr',es:'ltr',de:'ltr',tr:'ltr'};
const NAME={ar:'العربية',en:'English',nl:'Nederlands',he:'עברית',jv:'Basa Jawa',id:'Bahasa Indonesia',fr:'Français',es:'Español',de:'Deutsch',tr:'Türkçe'};
const BRAND={ar:'LuxDot',en:'LuxDot',nl:'LuxDot',he:'LuxDot',jv:'LuxDot',id:'LuxDot',fr:'LuxDot',es:'LuxDot',de:'LuxDot',tr:'LuxDot'};
const NAV={
ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',nusantara:'نوسانتارا',memory:'الذاكرة',research:'الأبحاث الحيّة',media:'ميديا / أخبار',projects:'المشاريع'},
en:{home:'Home',library:'Library',faith:'Faith & Wisdom',nusantara:'Nusantara',memory:'Memory',research:'Live Research',media:'Media / News',projects:'Projects'},
nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',nusantara:'Nusantara',memory:'Geheugen',research:'Levend onderzoek',media:'Media / Nieuws',projects:'Projecten'},
he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',nusantara:'נוסנטרה',memory:'זיכרון',research:'מחקר חי',media:'מדיה / חדשות',projects:'פרויקטים'},
jv:{home:'Ngarep',library:'Pustaka',faith:'Iman & Kawicaksanan',nusantara:'Nusantara',memory:'Pangeling',research:'Panaliten Urip',media:'Media / Pawarta',projects:'Proyèk'},
id:{home:'Beranda',library:'Perpustakaan',faith:'Iman & Kebijaksanaan',nusantara:'Nusantara',memory:'Memori',research:'Riset Hidup',media:'Media / Berita',projects:'Proyek'},
fr:{home:'Accueil',library:'Bibliothèque',faith:'Foi & sagesse',nusantara:'Nusantara',memory:'Mémoire',research:'Recherche vivante',media:'Médias / Actualités',projects:'Projets'},
es:{home:'Inicio',library:'Biblioteca',faith:'Fe y sabiduría',nusantara:'Nusantara',memory:'Memoria',research:'Investigación viva',media:'Medios / Noticias',projects:'Proyectos'},
de:{home:'Start',library:'Bibliothek',faith:'Glaube & Weisheit',nusantara:'Nusantara',memory:'Erinnerung',research:'Live-Forschung',media:'Medien / Nachrichten',projects:'Projekte'},
tr:{home:'Ana sayfa',library:'Kütüphane',faith:'İnanç & Bilgelik',nusantara:'Nusantara',memory:'Hafıza',research:'Canlı Araştırma',media:'Medya / Haberler',projects:'Projeler'}
};
function ensureGlobalCss(){if(document.getElementById('luxdot-global-compact-v4167'))return;const l=document.createElement('link');l.id='luxdot-global-compact-v4167';l.rel='stylesheet';l.href='luxdot-global-compact-v4167.css?v=4167';document.head.append(l)}
function saved(){const s=localStorage.getItem('luxdot.lang');return SUP.includes(s)?s:null}
function query(){const q=new URLSearchParams(location.search).get('lang');return SUP.includes(q)?q:null}
function current(){return SUP.includes(window.__LUX_LANG)?window.__LUX_LANG:(query()||saved()||'en')}
function setDoc(l){document.documentElement.lang=l;document.documentElement.dir=DIR[l];document.documentElement.dataset.luxLang=l;if(document.body){document.body.dataset.lang=l;document.body.classList.toggle('rtl-core',DIR[l]==='rtl');['ar','en','nl','he'].forEach(x=>document.body.classList.toggle('lang-'+x,x===l))}}
function set(l,mark=true){if(!SUP.includes(l))l='en';window.__LUX_LANG=l;if(mark)localStorage.setItem('luxdot.lang',l);setDoc(l);document.dispatchEvent(new CustomEvent('luxlang',{detail:{lang:l}}));window.dispatchEvent(new CustomEvent('luxdot-language',{detail:{lang:l}}))}
function navigate(l){if(!SUP.includes(l))l='en';localStorage.setItem('luxdot.lang',l);const u=new URL(location.href);u.searchParams.set('lang',l);location.assign(u.pathname+u.search+u.hash)}
function bootstrap(){ensureGlobalCss();const l=query()||saved()||'en';window.__LUX_LANG=l;localStorage.setItem('luxdot.lang',l);setDoc(l)}
function selectors(){const l=current();document.querySelectorAll('[data-lang-select],select.lang-select,select.lang').forEach(s=>{if(s.tagName!=='SELECT')return;s.innerHTML=SUP.map(x=>`<option value="${x}">${NAME[x]}</option>`).join('');s.value=l;if(!s.dataset.coreLangBound){s.dataset.coreLangBound='1';s.addEventListener('change',e=>{e.stopImmediatePropagation();navigate(e.target.value)})}})}
function common(){const l=current(),n=NAV[l];document.querySelectorAll('[data-lux-brand],header .logo,.top .logo').forEach(e=>e.textContent=BRAND[l]);document.querySelectorAll('header a[href],header nav a[href]').forEach(a=>{const f=(a.getAttribute('href')||'').split('/').pop().split('?')[0].split('#')[0],k={'home.html':'home','library.html':'library','faith.html':'faith','nusantara.html':'nusantara','memory.html':'memory','research.html':'research','media.html':'media','projects.html':'projects'}[f];if(k&&!a.hasAttribute('data-preserve-label'))a.textContent=n[k]})}
function carryLangLinks(){const l=current();document.querySelectorAll('a[href]').forEach(a=>{const raw=a.getAttribute('href');if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:|data:)/i.test(raw))return;let u;try{u=new URL(raw,location.href)}catch(_){return}if(u.origin!==location.origin||!/\.html$/i.test(u.pathname))return;const hash=raw.includes('#')?'#'+raw.split('#',2)[1]:'';const base=raw.split('#',1)[0];const path=base.split('?',1)[0];const q=new URLSearchParams(base.includes('?')?base.split('?',2)[1]:'');q.set('lang',l);a.setAttribute('href',path+'?'+q.toString()+hash)})}
function locales(){const l=current(),bs=[...document.querySelectorAll('[data-locale]')];if(!bs.length)return;bs.forEach(b=>b.hidden=true);let b=bs.find(x=>x.dataset.locale===l);if(!b)b=bs.find(x=>x.dataset.locale==='en');if(b)b.hidden=false}
function healSelectors(){document.querySelectorAll('[data-lang-select],select.lang-select,select.lang').forEach(s=>{if(s.tagName!=='SELECT')return;const vals=[...s.options].map(o=>o.value);if(SUP.some(x=>!vals.includes(x))){const l=current();s.innerHTML=SUP.map(x=>`<option value="${x}">${NAME[x]}</option>`).join('');s.value=l}})}
function init(){ensureGlobalCss();setDoc(current());selectors();common();locales();carryLangLinks();healSelectors();document.body?.classList.add('lux-lang-ready')}
bootstrap();
document.addEventListener('DOMContentLoaded',()=>{const mo=new MutationObserver(()=>healSelectors());mo.observe(document.body,{childList:true,subtree:true});setTimeout(healSelectors,50);setTimeout(healSelectors,500);setTimeout(healSelectors,1500)});
window.LuxLang={get:current,set,navigate,names:NAME,dir:DIR,nav:NAV};document.addEventListener('DOMContentLoaded',init);document.addEventListener('luxlang',()=>setTimeout(init,0));})();
