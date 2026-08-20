/* LuxDot v4.3.113 — unified ten-language header + Media/News */
(function(){
'use strict';
const d=document, FILE=()=>location.pathname.split('/').pop().toLowerCase()||'index.html';
if(FILE()==='index.html') return;
const SUP=['ar','en','nl','he','jv','id','fr','es','de','tr'];
const NAMES={ar:'AR',en:'EN',nl:'NL',he:'HE',jv:'JV',id:'ID',fr:'FR',es:'ES',de:'DE',tr:'TR'};
const FULL={ar:'العربية',en:'English',nl:'Nederlands',he:'עברית',jv:'Basa Jawa',id:'Bahasa Indonesia',fr:'Français',es:'Español',de:'Deutsch',tr:'Türkçe'};
const T={
 ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',memory:'الذاكرة',research:'الأبحاث',media:'ميديا / أخبار',projects:'المشاريع'},
 en:{home:'Home',library:'Library',faith:'Faith & Wisdom',memory:'Memory',research:'Research',media:'Media / News',projects:'Projects'},
 nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',memory:'Geheugen',research:'Onderzoek',media:'Media / Nieuws',projects:'Projecten'},
 he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',memory:'זיכרון',research:'מחקר',media:'מדיה / חדשות',projects:'פרויקטים'},
 jv:{home:'Ngarep',library:'Pustaka',faith:'Iman & Kawicaksanan',memory:'Pangeling',research:'Panaliten',media:'Media / Pawarta',projects:'Proyèk'},
 id:{home:'Beranda',library:'Perpustakaan',faith:'Iman & Kebijaksanaan',memory:'Memori',research:'Riset',media:'Media / Berita',projects:'Proyek'},
 fr:{home:'Accueil',library:'Bibliothèque',faith:'Foi & sagesse',memory:'Mémoire',research:'Recherches',media:'Médias / Actualités',projects:'Projets'},
 es:{home:'Inicio',library:'Biblioteca',faith:'Fe y sabiduría',memory:'Memoria',research:'Investigación',media:'Medios / Noticias',projects:'Proyectos'},
 de:{home:'Start',library:'Bibliothek',faith:'Glaube & Weisheit',memory:'Erinnerung',research:'Forschung',media:'Medien / Nachrichten',projects:'Projekte'},
 tr:{home:'Ana sayfa',library:'Kütüphane',faith:'İnanç & Bilgelik',memory:'Hafıza',research:'Araştırma',media:'Medya / Haberler',projects:'Projeler'}
};
const lang=()=>{const q=new URLSearchParams(location.search).get('lang'),s=localStorage.getItem('luxdot.lang');return SUP.includes(q)?q:SUP.includes(s)?s:'en'};
const withLang=(href,l=lang())=>{let u=new URL(href,location.href);u.searchParams.set('lang',l);return u.pathname.split('/').pop()+u.search+u.hash};
function ensureStyle(){if(d.getElementById('lux43113-header-style'))return;let l=d.createElement('link');l.id='lux43113-header-style';l.rel='stylesheet';l.href='luxdot-header-v43108.css?v=43113';d.head.appendChild(l)}
function go(l){if(!SUP.includes(l))l='en';localStorage.setItem('luxdot.lang',l);let u=new URL(location.href);u.searchParams.set('lang',l);location.assign(u.pathname+u.search+u.hash)}
function build(){if(!d.body)return;ensureStyle();d.querySelectorAll('.luxdot-history-arrows,.luxdot-page-actions,.luxdot-breadcrumb').forEach(x=>x.remove());let old=d.querySelector('header.top');if(old)old.remove();
 let h=d.createElement('header');h.className='top lux-header-43108';h.innerHTML='<div class="lux-header-inner"><a class="lux-header-brand" data-lux-brand href="'+withLang('home.html')+'">LuxDot</a><button class="lux-menu-toggle" type="button" aria-label="Menu" aria-expanded="false">☰</button><nav class="lux-main-nav"></nav><div class="lux-language"><button class="lux-lang-btn" type="button" aria-expanded="false"><span>'+NAMES[lang()]+'</span><b>⌄</b></button><div class="lux-lang-menu" role="menu"></div></div></div>';d.body.prepend(h);
 let nav=h.querySelector('.lux-main-nav'),tx=T[lang()]||T.en;[['home.html','home'],['library.html','library'],['faith.html','faith'],['memory.html','memory'],['research.html','research'],['media.html','media'],['projects.html','projects']].forEach(([href,k])=>{let a=d.createElement('a');a.href=withLang(href);a.textContent=tx[k];if(FILE()===href)a.classList.add('active');nav.appendChild(a)});
 let menu=h.querySelector('.lux-lang-menu');SUP.forEach(l=>{let b=d.createElement('button');b.type='button';b.dataset.lang=l;b.textContent=FULL[l];if(l===lang())b.classList.add('active');b.onclick=()=>go(l);menu.appendChild(b)});
 let lb=h.querySelector('.lux-lang-btn');lb.onclick=e=>{e.stopPropagation();let on=menu.classList.toggle('open');lb.setAttribute('aria-expanded',String(on))};
 let mb=h.querySelector('.lux-menu-toggle');mb.onclick=()=>{let on=nav.classList.toggle('open');mb.setAttribute('aria-expanded',String(on))};
 d.addEventListener('click',e=>{if(!h.querySelector('.lux-language').contains(e.target)){menu.classList.remove('open');lb.setAttribute('aria-expanded','false')}});
 d.body.classList.add('lux-shell-page');d.documentElement.style.setProperty('--lux-header-h',Math.ceil(h.getBoundingClientRect().height)+'px');
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',build);else build();
window.addEventListener('resize',()=>{let h=d.querySelector('.lux-header-43108');if(h)d.documentElement.style.setProperty('--lux-header-h',Math.ceil(h.getBoundingClientRect().height)+'px')},{passive:true});
})();


/* LuxDot v4.3.124 · global timeline/info drawer */
(function(){
 function installLuxTimeline(){
  if(document.getElementById('luxTimelineInfo'))return;
  const host=document.querySelector('header .topin,header .wrap,.topin,.top');
  if(!host)return;
  const a=document.createElement('a');a.id='luxTimelineInfo';a.href='timeline.html?lang='+(new URLSearchParams(location.search).get('lang')||'ar');a.setAttribute('aria-label','LuxDot timeline / information');a.title='LuxDot · Now / Next';a.textContent='i';host.appendChild(a);
  const panel=document.createElement('aside');panel.id='luxTimelinePeek';panel.setAttribute('aria-hidden','true');
  panel.innerHTML='<button type="button" class="lt-close" aria-label="Close">×</button><div class="lt-k">LUXDOT · NOW / NEXT</div><h3>الخط الزمني</h3><div class="lt-line"><div><b>21.08</b><span>ذاكرة الغوطة · تم</span></div><div><b>03.09</b><span>ثورة الدقّة · PILOT</span></div><div><b>07.12</b><span>عصر الدقّة · KICK-OFF</span></div></div><a class="lt-open" href="'+a.href+'">فتح الرزنامة كاملة ←</a>';
  document.body.appendChild(panel);
  a.addEventListener('click',e=>{e.preventDefault();const open=panel.classList.toggle('open');panel.setAttribute('aria-hidden',open?'false':'true')});
  panel.querySelector('.lt-close').addEventListener('click',()=>{panel.classList.remove('open');panel.setAttribute('aria-hidden','true')});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installLuxTimeline);else installLuxTimeline();
})();
