/* LuxDot v4.3.63 — stable global shell */
(function(){
 'use strict';
 const d=document;
 const file=()=>location.pathname.split('/').pop().toLowerCase()||'index.html';
 if(file()==='index.html') return;
 const lang=()=>((d.documentElement.dataset.luxLang||d.documentElement.lang||'en').toLowerCase());
 const T={
  ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',nusantara:'نوسانتارا',memory:'الذاكرة',research:'الأبحاث',projects:'المشاريع',language:'اللغة',back:'السابق',forward:'التالي'},
  en:{home:'Home',library:'Library',faith:'Faith & Wisdom',nusantara:'Nusantara',memory:'Memory',research:'Research',projects:'Projects',language:'Language',back:'Back',forward:'Forward'},
  nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',nusantara:'Nusantara',memory:'Geheugen',research:'Onderzoek',projects:'Projecten',language:'Taal',back:'Terug',forward:'Vooruit'},
  jv:{home:'Ngarep',library:'Pustaka',faith:'Iman lan kawicaksanan',nusantara:'Nusantara',memory:'Pangeling',research:'Panliten',projects:'Proyek',language:'Basa',back:'Bali',forward:'Maju'},
  he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',nusantara:'נוסנטרה',memory:'זיכרון',research:'מחקר',projects:'פרויקטים',language:'שפה',back:'אחורה',forward:'קדימה'}
 };
 const txt=()=>T[lang()]||T.en;
 const withLang=(href)=>{const u=new URL(href,location.href),q=new URLSearchParams(location.search).get('lang');if(q)u.searchParams.set('lang',q);return u.pathname.split('/').pop()+u.search+u.hash};
 function header(){
  let h=d.querySelector('header.top'); if(!h){h=d.createElement('header');h.className='top';d.body.prepend(h)}
  const t=txt();
  h.innerHTML='<div class="wrap topin"><a class="logo" data-lux-brand href="'+withLang('home.html')+'">LuxDot</a><nav class="nav" aria-label="Primary navigation"></nav></div>';
  const nav=h.querySelector('.nav');
  const defs=[['home.html','home'],['library.html','library'],['faith.html','faith'],['nusantara.html','nusantara'],['memory.html','memory'],['research.html','research'],['projects.html','projects']];
  defs.forEach(([href,key])=>{const a=d.createElement('a');a.href=withLang(href);a.textContent=t[key];if(file()===href)a.classList.add('active');nav.appendChild(a)});
  const s=d.createElement('select');s.className='lang lang-select';s.setAttribute('data-lang-select','');s.setAttribute('aria-label',t.language);s.innerHTML='<option value="ar">العربية</option><option value="en">English</option><option value="nl">Nederlands</option><option value="jv">Basa Jawa</option><option value="he">עברית</option>';s.value=lang();
  s.addEventListener('change',e=>{ if(window.LuxLang?.navigate) LuxLang.navigate(e.target.value); else {localStorage.setItem('luxdot.lang',e.target.value);const u=new URL(location.href);u.searchParams.set('lang',e.target.value);location.assign(u.pathname+u.search+u.hash)} });nav.appendChild(s);
  requestAnimationFrame(()=>d.documentElement.style.setProperty('--lux-header-h',Math.ceil(h.getBoundingClientRect().height)+'px'));
 }
 function arrows(){
  d.querySelector('.luxdot-breadcrumb')?.remove(); d.querySelector('.luxdot-page-actions')?.remove();
  const x=d.createElement('div');x.className='luxdot-page-actions luxdot-history-arrows';
  const b=d.createElement('button');b.type='button';b.className='lux-history-back';b.textContent='←';b.setAttribute('aria-label',txt().back);b.title=txt().back;b.onclick=()=>{if(history.length>1)history.back();else location.assign(withLang('home.html'))};
  const f=d.createElement('button');f.type='button';f.className='lux-history-forward';f.textContent='→';f.setAttribute('aria-label',txt().forward);f.title=txt().forward;f.onclick=()=>history.forward();
  x.append(b,f);d.body.appendChild(x);
 }
 function run(){if(!d.body)return;d.body.classList.add('lux-shell-page');header();arrows()}
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',run);else run();
 d.addEventListener('luxlang',()=>setTimeout(run,0));window.addEventListener('luxdot-language',()=>setTimeout(run,0));window.addEventListener('resize',()=>{const h=d.querySelector('header.top');if(h)d.documentElement.style.setProperty('--lux-header-h',Math.ceil(h.getBoundingClientRect().height)+'px')},{passive:true});
})();
