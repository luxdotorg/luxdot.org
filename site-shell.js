/* LuxDot v4.3.108 — unified Kees-inspired header shell */
(function(){
'use strict';
const d=document, FILE=()=>location.pathname.split('/').pop().toLowerCase()||'index.html';
if(FILE()==='index.html') return;
const SUP=['ar','en','nl','he'];
const NAMES={ar:'AR',en:'EN',nl:'NL',he:'HE'};
const FULL={ar:'العربية',en:'English',nl:'Nederlands',he:'עברית'};
const T={
 ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',memory:'الذاكرة',research:'الأبحاث',projects:'المشاريع',language:'اللغة'},
 en:{home:'Home',library:'Library',faith:'Faith & Wisdom',memory:'Memory',research:'Research',projects:'Projects',language:'Language'},
 nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',memory:'Geheugen',research:'Onderzoek',projects:'Projecten',language:'Taal'},
 he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',memory:'זיכרון',research:'מחקר',projects:'פרויקטים',language:'שפה'}
};
const lang=()=>{const q=new URLSearchParams(location.search).get('lang'),s=localStorage.getItem('luxdot.lang');return SUP.includes(q)?q:SUP.includes(s)?s:'en'};
const withLang=(href,l=lang())=>{let u=new URL(href,location.href);u.searchParams.set('lang',l);return u.pathname.split('/').pop()+u.search+u.hash};
function ensureStyle(){if(d.getElementById('lux43108-header-style'))return;let l=d.createElement('link');l.id='lux43108-header-style';l.rel='stylesheet';l.href='luxdot-header-v43108.css?v=43108';d.head.appendChild(l)}
function go(l){if(!SUP.includes(l))l='en';localStorage.setItem('luxdot.lang',l);let u=new URL(location.href);u.searchParams.set('lang',l);location.assign(u.pathname+u.search+u.hash)}
function build(){if(!d.body)return;ensureStyle();d.querySelectorAll('.luxdot-history-arrows,.luxdot-page-actions,.luxdot-breadcrumb').forEach(x=>x.remove());let old=d.querySelector('header.top');if(old)old.remove();
 let h=d.createElement('header');h.className='top lux-header-43108';h.innerHTML='<div class="lux-header-inner"><a class="lux-header-brand" data-lux-brand href="'+withLang('home.html')+'">LuxDot</a><button class="lux-menu-toggle" type="button" aria-label="Menu" aria-expanded="false">☰</button><nav class="lux-main-nav"></nav><div class="lux-language"><button class="lux-lang-btn" type="button" aria-expanded="false"><span>'+NAMES[lang()]+'</span><b>⌄</b></button><div class="lux-lang-menu" role="menu"></div></div></div>';d.body.prepend(h);
 let nav=h.querySelector('.lux-main-nav'),tx=T[lang()]||T.en;[['home.html','home'],['library.html','library'],['faith.html','faith'],['memory.html','memory'],['research.html','research'],['projects.html','projects']].forEach(([href,k])=>{let a=d.createElement('a');a.href=withLang(href);a.textContent=tx[k];if(FILE()===href)a.classList.add('active');nav.appendChild(a)});
 let menu=h.querySelector('.lux-lang-menu');SUP.forEach(l=>{let b=d.createElement('button');b.type='button';b.dataset.lang=l;b.textContent=FULL[l];if(l===lang())b.classList.add('active');b.onclick=()=>go(l);menu.appendChild(b)});
 let lb=h.querySelector('.lux-lang-btn');lb.onclick=e=>{e.stopPropagation();let on=menu.classList.toggle('open');lb.setAttribute('aria-expanded',String(on))};
 let mb=h.querySelector('.lux-menu-toggle');mb.onclick=()=>{let on=nav.classList.toggle('open');mb.setAttribute('aria-expanded',String(on))};
 d.addEventListener('click',e=>{if(!h.querySelector('.lux-language').contains(e.target)){menu.classList.remove('open');lb.setAttribute('aria-expanded','false')}} ,{once:true});
 d.body.classList.add('lux-shell-page');d.documentElement.style.setProperty('--lux-header-h',Math.ceil(h.getBoundingClientRect().height)+'px');
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',build);else build();
window.addEventListener('resize',()=>{let h=d.querySelector('.lux-header-43108');if(h)d.documentElement.style.setProperty('--lux-header-h',Math.ceil(h.getBoundingClientRect().height)+'px')},{passive:true});
})();
