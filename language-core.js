(()=>{'use strict';
const CORE_URL=(()=>{const s=document.currentScript;return new URL(s&&s.src?s.src:'language-core.js',location.href)})();
const SUP=['ar','en','nl','de','fr','es','tr','uk','pl','he','fa','hi','id','zh','pt','sw','ku','jv'];
const DEFAULT='ar';
const DIR={ar:'rtl',en:'ltr',nl:'ltr',de:'ltr',fr:'ltr',es:'ltr',tr:'ltr',uk:'ltr',pl:'ltr',he:'rtl',fa:'rtl',hi:'ltr',id:'ltr',zh:'ltr',pt:'ltr',sw:'ltr',ku:'ltr',jv:'ltr'};
const NAME={ar:'العربية',en:'English',nl:'Nederlands',de:'Deutsch',fr:'Français',es:'Español',tr:'Türkçe',uk:'Українська',pl:'Polski',he:'עברית',fa:'فارسی',hi:'हिन्दी',id:'Bahasa Indonesia',zh:'中文',pt:'Português',sw:'Kiswahili',ku:'Kurdî · Kurmancî',jv:'Basa Jawa'};
const TIER={ar:'core',en:'core',nl:'core',de:'core',fr:'core',es:'core',tr:'core',uk:'core',pl:'core',he:'core',fa:'beta',hi:'beta',id:'beta',zh:'beta',pt:'beta',sw:'beta',ku:'beta',jv:'beta'};
const GROUPS=[
 {label:'لغة LuxDot الأصلية · LuxDot master',items:['ar']},
 {label:'عالمي · Global',items:['en','es','fr','pt']},
 {label:'من حولنا · Around us',items:['nl','de','pl','uk','tr']},
 {label:'الشرق والبحر المتوسط · East & Mediterranean',items:['he','fa','ku']},
 {label:'آسيا · Asia',items:['hi','zh','id','jv']},
 {label:'أفريقيا · Africa',items:['sw']}
];
function rootPrefix(){return new URL('./',CORE_URL).href}
const BRAND=Object.fromEntries(SUP.map(x=>[x,'LuxDot']));
const NAV={
ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',nusantara:'نوسانتارا',memory:'الذاكرة',research:'الأبحاث الحيّة',media:'ميديا / أخبار',projects:'المشاريع'},
en:{home:'Home',library:'Library',faith:'Faith & Wisdom',nusantara:'Nusantara',memory:'Memory',research:'Live Research',media:'Media / News',projects:'Projects'},
nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',nusantara:'Nusantara',memory:'Geheugen',research:'Levend onderzoek',media:'Media / Nieuws',projects:'Projecten'},
de:{home:'Start',library:'Bibliothek',faith:'Glaube & Weisheit',nusantara:'Nusantara',memory:'Erinnerung',research:'Live-Forschung',media:'Medien / Nachrichten',projects:'Projekte'},
fr:{home:'Accueil',library:'Bibliothèque',faith:'Foi & sagesse',nusantara:'Nusantara',memory:'Mémoire',research:'Recherche vivante',media:'Médias / Actualités',projects:'Projets'},
es:{home:'Inicio',library:'Biblioteca',faith:'Fe y sabiduría',nusantara:'Nusantara',memory:'Memoria',research:'Investigación viva',media:'Medios / Noticias',projects:'Proyectos'},
tr:{home:'Ana sayfa',library:'Kütüphane',faith:'İnanç & Bilgelik',nusantara:'Nusantara',memory:'Hafıza',research:'Canlı Araştırma',media:'Medya / Haberler',projects:'Projeler'},
uk:{home:'Головна',library:'Бібліотека',faith:'Віра і мудрість',nusantara:'Нусантара',memory:'Пам’ять',research:'Живі дослідження',media:'Медіа / Новини',projects:'Проєкти'},
pl:{home:'Strona główna',library:'Biblioteka',faith:'Wiara i mądrość',nusantara:'Nusantara',memory:'Pamięć',research:'Żywe badania',media:'Media / Wiadomości',projects:'Projekty'},
he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',nusantara:'נוסנטרה',memory:'זיכרון',research:'מחקר חי',media:'מדיה / חדשות',projects:'פרויקטים'},
fa:{home:'خانه',library:'کتابخانه',faith:'ایمان و حکمت',nusantara:'نوسانتارا',memory:'حافظه',research:'پژوهش زنده',media:'رسانه / اخبار',projects:'پروژه‌ها'},
hi:{home:'मुखपृष्ठ',library:'पुस्तकालय',faith:'आस्था और ज्ञान',nusantara:'नुसंतारा',memory:'स्मृति',research:'जीवंत शोध',media:'मीडिया / समाचार',projects:'परियोजनाएँ'},
id:{home:'Beranda',library:'Perpustakaan',faith:'Iman & Kebijaksanaan',nusantara:'Nusantara',memory:'Memori',research:'Riset Hidup',media:'Media / Berita',projects:'Proyek'},
zh:{home:'首页',library:'图书馆',faith:'信仰与智慧',nusantara:'努山塔拉',memory:'记忆',research:'动态研究',media:'媒体 / 新闻',projects:'项目'},
pt:{home:'Início',library:'Biblioteca',faith:'Fé e sabedoria',nusantara:'Nusantara',memory:'Memória',research:'Pesquisa viva',media:'Mídia / Notícias',projects:'Projetos'},
sw:{home:'Mwanzo',library:'Maktaba',faith:'Imani na hekima',nusantara:'Nusantara',memory:'Kumbukumbu',research:'Utafiti hai',media:'Vyombo / Habari',projects:'Miradi'},
ku:{home:'Destpêk',library:'Pirtûkxane',faith:'Bawerî û zanîn',nusantara:'Nusantara',memory:'Bîranîn',research:'Lêkolîna zindî',media:'Medya / Nûçe',projects:'Projeyên'},
jv:{home:'Ngarep',library:'Pustaka',faith:'Iman & Kawicaksanan',nusantara:'Nusantara',memory:'Pangeling',research:'Panaliten Urip',media:'Media / Pawarta',projects:'Proyèk'}
};
function ensureGlobalCss(){if(document.getElementById('luxdot-global-compact-v41815'))return;const l=document.createElement('link');l.id='luxdot-global-compact-v41815';l.rel='stylesheet';l.href=rootPrefix()+'luxdot-global-compact-v4167.css?v=41815';document.head.append(l)}
function saved(){const s=localStorage.getItem('luxdot.lang');return SUP.includes(s)?s:null}
function query(){const q=new URLSearchParams(location.search).get('lang');return SUP.includes(q)?q:null}
function current(){return SUP.includes(window.__LUX_LANG)?window.__LUX_LANG:(query()||saved()||DEFAULT)}
function setDoc(l){document.documentElement.lang=l;document.documentElement.dir=DIR[l];document.documentElement.dataset.luxLang=l;document.documentElement.dataset.luxLangTier=TIER[l]||'beta';if(document.body){document.body.dataset.lang=l;document.body.classList.toggle('rtl-core',DIR[l]==='rtl');SUP.forEach(x=>document.body.classList.toggle('lang-'+x,x===l))}}
function set(l,mark=true){if(!SUP.includes(l))l=DEFAULT;window.__LUX_LANG=l;if(mark)localStorage.setItem('luxdot.lang',l);setDoc(l);document.dispatchEvent(new CustomEvent('luxlang',{detail:{lang:l}}));window.dispatchEvent(new CustomEvent('luxdot-language',{detail:{lang:l}}))}
function navigate(l){if(!SUP.includes(l))l=DEFAULT;localStorage.setItem('luxdot.lang',l);const u=new URL(location.href);u.searchParams.set('lang',l);location.assign(u.pathname+u.search+u.hash)}
function bootstrap(){ensureGlobalCss();const l=query()||saved()||DEFAULT;window.__LUX_LANG=l;localStorage.setItem('luxdot.lang',l);setDoc(l)}
function selectorMarkup(){return GROUPS.map(g=>`<optgroup label="${g.label}">${g.items.map(x=>`<option value="${x}">${NAME[x]}${TIER[x]==='beta'?' · Beta':''}</option>`).join('')}</optgroup>`).join('')}
function selectors(){const l=current();document.querySelectorAll('[data-lang-select],select.lang-select,select.lang').forEach(s=>{if(s.tagName!=='SELECT')return;s.innerHTML=selectorMarkup();s.value=l;if(!s.dataset.coreLangBound){s.dataset.coreLangBound='1';s.addEventListener('change',e=>{e.stopImmediatePropagation();navigate(e.target.value)})}})}
function common(){const l=current(),n=NAV[l]||NAV.en;document.querySelectorAll('[data-lux-brand],header .logo,.top .logo').forEach(e=>e.textContent=BRAND[l]);document.querySelectorAll('header a[href],header nav a[href]').forEach(a=>{const f=(a.getAttribute('href')||'').split('/').pop().split('?')[0].split('#')[0],k={'home.html':'home','library.html':'library','faith.html':'faith','nusantara.html':'nusantara','memory.html':'memory','research.html':'research','media.html':'media','projects.html':'projects'}[f];if(k&&!a.hasAttribute('data-preserve-label'))a.textContent=n[k]})}
function carryLangLinks(){const l=current();document.querySelectorAll('a[href]').forEach(a=>{const raw=a.getAttribute('href');if(!raw||raw.startsWith('#')||/^(?:mailto:|tel:|javascript:|data:)/i.test(raw))return;let u;try{u=new URL(raw,location.href)}catch(_){return}if(u.origin!==location.origin||!/\.html$/i.test(u.pathname))return;const hash=raw.includes('#')?'#'+raw.split('#',2)[1]:'';const base=raw.split('#',1)[0];const path=base.split('?',1)[0];const q=new URLSearchParams(base.includes('?')?base.split('?',2)[1]:'');q.set('lang',l);a.setAttribute('href',path+'?'+q.toString()+hash)})}
function locales(){const l=current(),bs=[...document.querySelectorAll('[data-locale]')];if(!bs.length)return;bs.forEach(b=>b.hidden=true);let b=bs.find(x=>x.dataset.locale===l);if(!b)b=bs.find(x=>x.dataset.locale===DEFAULT);if(b)b.hidden=false}
function healSelectors(){document.querySelectorAll('[data-lang-select],select.lang-select,select.lang').forEach(s=>{if(s.tagName!=='SELECT')return;const vals=[...s.options].map(o=>o.value);if(SUP.some(x=>!vals.includes(x))){const l=current();s.innerHTML=selectorMarkup();s.value=l}})}
function init(){ensureGlobalCss();setDoc(current());selectors();common();locales();carryLangLinks();healSelectors();document.body?.classList.add('lux-lang-ready')}
bootstrap();
document.addEventListener('DOMContentLoaded',()=>{const mo=new MutationObserver(()=>healSelectors());mo.observe(document.body,{childList:true,subtree:true});setTimeout(healSelectors,50);setTimeout(healSelectors,500);setTimeout(healSelectors,1500)});
window.LuxLang={get:current,set,navigate,names:NAME,dir:DIR,nav:NAV,groups:GROUPS,tier:TIER,supported:SUP,defaultLang:DEFAULT};document.addEventListener('DOMContentLoaded',init);document.addEventListener('luxlang',()=>setTimeout(init,0));})();