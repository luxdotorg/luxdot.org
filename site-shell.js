/* LuxDot v4.3.44 — persistent navigation shell */
(function(){
 const d=document;
 const script=d.currentScript;
 const base=(script&&script.src)?new URL('.',script.src):new URL('.',location.href);
 const U=p=>new URL(p,base).pathname + (location.search.includes('lang=')?('?lang='+encodeURIComponent(new URLSearchParams(location.search).get('lang'))):'');
 const lang=()=>((d.documentElement.dataset.luxLang||d.documentElement.lang||d.body?.dataset.lang||'en').toLowerCase());
 const T=(ar,en,nl,jv,he)=>{const l=lang();return l==='ar'?ar:l==='nl'?nl:l==='jv'?jv:l==='he'?he:en};
 const filename=()=>location.pathname.split('/').pop().toLowerCase();
 function ensureHeader(){
   let h=d.querySelector('header.top');
   if(!h){h=d.createElement('header');h.className='top';d.body.prepend(h)}
   if(!h.querySelector('.topin'))h.innerHTML='<div class="wrap topin"></div>';
   const ti=h.querySelector('.topin');
   let logo=ti.querySelector('.logo');if(!logo){logo=d.createElement('a');logo.className='logo';ti.prepend(logo)}logo.href=U('home.html');logo.textContent='LuxDot';
   let nav=ti.querySelector('.nav');if(!nav){nav=d.createElement('nav');nav.className='nav';ti.append(nav)}
   const keep=[...nav.querySelectorAll('select.lang,select.lang-select,[data-lang-select]')];
   nav.querySelectorAll('a').forEach(a=>a.remove());
   const links=[['home.html',T('الرئيسية','Home','Home','Ngarep','ראשי')],['research.html',T('الأبحاث','Research','Onderzoek','Panliten','מחקר')],['memory.html',T('الذاكرة','Memory','Geheugen','Pangeling','זיכרון')],['projects.html',T('المشاريع','Projects','Projecten','Proyek','פרויקטים')],['library.html',T('المكتبة','Library','Bibliotheek','Pustaka','ספרייה')]];
   links.forEach(([u,l])=>{const a=d.createElement('a');a.href=U(u);a.textContent=l;if(filename()===u)a.classList.add('active');nav.insertBefore(a,keep[0]||null)});
 }
 function section(){const f=filename();if(f==='memory.html'||/memory|kolbe|stein|westerweel/.test(f))return['memory.html',T('الذاكرة الحية','Living Memory','Levend geheugen','Pangeling urip','זיכרון חי')];if(f==='research.html'||/research|brabant|tongerlo|echternach|ter-brake|burckhardt|erasmus|nassau|hoogstraten|alphen|chaam|savior|genealogy|manuaal|oosterhout/.test(f))return['research.html',T('الأبحاث','Research','Onderzoek','Panliten','מחקר')];if(/project|circle-of-care/.test(f))return['projects.html',T('المشاريع','Projects','Projecten','Proyek','פרויקטים')];if(f==='library.html'||/quran|tanakh|testament|gita|avesta|guru|analects|kojiki|jain|bahai|buddhist|dao|serat|suluk|ramayana|primbon/.test(f))return['library.html',T('المكتبة','Library','Bibliotheek','Pustaka','ספרייה')];return['home.html',T('الرئيسية','Home','Home','Ngarep','ראשי')]}
 function ensureCrumb(){d.querySelector('.luxdot-breadcrumb')?.remove();const [u,l]=section(),b=d.createElement('div');b.className='luxdot-breadcrumb wrap';const title=(d.querySelector('h1')?.textContent||d.title||'').trim();b.innerHTML='<a href="'+U('home.html')+'">'+T('الرئيسية','Home','Home','Ngarep','ראשי')+'</a><span class="sep">›</span>'+(u!=='home.html'?'<a href="'+U(u)+'">'+l+'</a><span class="sep">›</span>':'')+'<span></span>';b.lastElementChild.textContent=title;d.querySelector('header.top')?.after(b)}
 function ensureActions(){d.querySelector('.luxdot-page-actions')?.remove();const [u,l]=section(),f=filename(),leaf=!/^(home|research|memory|projects|library)\.html$/.test(f);const x=d.createElement('div');x.className='luxdot-page-actions';x.innerHTML=(leaf?'<button data-close>'+T('إغلاق والعودة','Close & return','Sluiten en terug','Tutup lan bali','סגור וחזור')+'</button>':'')+'<button data-back>'+T('رجوع','Back','Terug','Bali','חזרה')+'</button><button data-top>'+T('للأعلى','Top','Omhoog','Ndhuwur','למעלה')+'</button><a href="'+U(u)+'">'+l+'</a>';d.body.append(x);x.querySelector('[data-back]')?.addEventListener('click',()=>history.length>1?history.back():location.assign(U(u)));x.querySelector('[data-close]')?.addEventListener('click',()=>{try{const r=document.referrer;if(r&&new URL(r).origin===location.origin)return history.back()}catch(e){}location.assign(U(u))});x.querySelector('[data-top]')?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}))}
 function run(){ensureHeader();ensureCrumb();ensureActions()}
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',run);else run();
 d.addEventListener('luxlang',()=>setTimeout(run,0));window.addEventListener('luxdot-language',()=>setTimeout(run,0));
})();
