(()=>{
'use strict';
const SUP=['ar','en','nl','jv','he'];
const B={ar:'نقطة نور',en:'LuxDot',nl:'LuxDot',jv:'LuxDot',he:'LuxDot'};
const N={
 ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',nusantara:'الأرخبيل الإندونيسي',memory:'الذاكرة',research:'الأبحاث',projects:'المشاريع',lang:'اللغة'},
 en:{home:'Home',library:'Library',faith:'Faith & Wisdom',nusantara:'Nusantara',memory:'Memory',research:'Research',projects:'Projects',lang:'Language'},
 nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',nusantara:'Nusantara',memory:'Geheugen',research:'Onderzoek',projects:'Projecten',lang:'Taal'},
 jv:{home:'Ngarep',library:'Pustaka',faith:'Iman lan kawicaksanan',nusantara:'Nusantara',memory:'Pangeling',research:'Panliten',projects:'Proyek',lang:'Basa'},
 he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',nusantara:'נוסנטרה',memory:'זיכרון',research:'מחקר',projects:'פרויקטים',lang:'שפה'}
};
const LANGNAME={ar:'العربية',en:'English',nl:'Nederlands',jv:'Basa Jawa',he:'עברית'};
function lang(){const x=(window.LuxLang&&window.LuxLang.get())||document.documentElement.lang||'en';return SUP.includes(x)?x:'en'}
function rootPrefix(){return location.pathname.includes('/research/savior/')?'../../':location.pathname.includes('/research/')?'../':''}
function rebuildHeader(){
 const existing=document.querySelector('header.top'); if(!existing)return;
 const l=lang(),n=N[l],p=rootPrefix();
 const active=(location.pathname.split('/').pop()||'home.html');
 const items=[['home.html','home'],['library.html','library'],['faith.html','faith'],['nusantara.html','nusantara'],['memory.html','memory'],['research.html','research'],['projects.html','projects']];
 existing.innerHTML=`<div class="wrap topin lux-shell-topin"><a class="logo" data-lux-brand href="${p}home.html?lang=${l}">${B[l]}</a><nav class="nav lux-shell-nav" aria-label="${n.lang}">${items.map(([f,k])=>`<a${active===f?' class="active"':''} href="${p}${f}?lang=${l}">${n[k]}</a>`).join('')}<select class="lang lang-select" data-lang-select aria-label="${n.lang}">${SUP.map(x=>`<option value="${x}"${x===l?' selected':''}>${LANGNAME[x]}</option>`).join('')}</select></nav></div>`;
 const sel=existing.querySelector('[data-lang-select]');
 if(sel)sel.addEventListener('change',e=>{e.stopImmediatePropagation();window.LuxLang?.navigate(e.target.value)});
}
function apply(){
 document.documentElement.lang=lang();
 document.documentElement.dir=(lang()==='ar'||lang()==='he')?'rtl':'ltr';
 document.body?.setAttribute('data-lang',lang());
 rebuildHeader();
 document.body?.classList.add('lux-lang-ready');
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,20));
document.addEventListener('luxlang',()=>setTimeout(apply,0));
})();


/* v4.3.43 persistent shell */
(function(){
  const d=document;
  function isAr(){return (d.documentElement.lang||'').toLowerCase().startsWith('ar')||d.documentElement.dir==='rtl'}
  function L(ar,en,nl,jv,he){
    const l=(d.documentElement.lang||'en').toLowerCase();
    return l==='ar'?ar:l==='nl'?(nl||en):l==='jv'?(jv||en):l==='he'?(he||en):en;
  }
  function ensureHeader(){
    if(d.querySelector('header.top')) return;
    const h=d.createElement('header');h.className='top';
    h.innerHTML='<div class="wrap topin"><a class="logo" href="home.html">LuxDot</a><nav class="nav">'+
      '<a href="home.html">'+L('الرئيسية','Home','Home','Ngarep','ראשי')+'</a>'+
      '<a href="research.html">'+L('الأبحاث','Research','Onderzoek','Panliten','מחקר')+'</a>'+
      '<a href="memory.html">'+L('الذاكرة','Memory','Geheugen','Pangeling','זיכרון')+'</a>'+
      '<a href="projects.html">'+L('المشاريع','Projects','Projecten','Proyek','פרויקטים')+'</a>'+
      '<a href="library.html">'+L('المكتبة','Library','Bibliotheek','Pustaka','ספרייה')+'</a>'+
      '</nav></div>';
    d.body.prepend(h);
  }
  function sectionFor(){
    const f=(location.pathname.split('/').pop()||'').toLowerCase();
    if(f.includes('memory')||f.includes('kolbe')||f.includes('stein')||f.includes('westerweel'))return['memory.html',L('الذاكرة الحية','Living Memory','Levend geheugen','Pangeling urip','זיכרון חי')];
    if(f==='research.html'||/research|brabant|tongerlo|echternach|ter-brake|burckhardt|erasmus|nassau|hoogstraten|alphen|chaam|savior|java-script|genealogy/.test(f))return['research.html',L('الأبحاث','Research','Onderzoek','Panliten','מחקר')];
    if(f.includes('project'))return['projects.html',L('المشاريع','Projects','Projecten','Proyek','פרויקטים')];
    if(f.includes('library')||/quran|tanakh|testament|gita|avesta|guru|analects|kojiki|jain|bahai|buddhist|dao|serat|suluk/.test(f))return['library.html',L('المكتبة','Library','Bibliotheek','Pustaka','ספרייה')];
    return['home.html',L('الرئيسية','Home','Home','Ngarep','ראשי')];
  }
  function ensureBreadcrumb(){
    if(d.querySelector('.luxdot-breadcrumb'))return;
    const [href,label]=sectionFor(), title=(d.querySelector('h1')?.textContent||d.title||'').trim();
    const b=d.createElement('div');b.className='luxdot-breadcrumb wrap';
    b.innerHTML='<a href="home.html">'+L('الرئيسية','Home','Home','Ngarep','ראשי')+'</a><span class="sep">›</span>'+
      (href!=='home.html'?'<a href="'+href+'">'+label+'</a><span class="sep">›</span>':'')+'<span>'+title+'</span>';
    d.querySelector('header.top')?.after(b);
  }
  function ensureActions(){
    if(d.querySelector('.luxdot-page-actions'))return;
    const [href,label]=sectionFor(), f=(location.pathname.split('/').pop()||'').toLowerCase();
    const leaf=!/^(home|research|memory|projects|library)\.html$/.test(f);
    const box=d.createElement('div');box.className='luxdot-page-actions';
    box.innerHTML=(leaf?'<button type="button" data-close>'+L('إغلاق والعودة','Close & return','Sluiten en terug','Tutup lan bali','סגור וחזור')+'</button>':'')+
      '<button type="button" data-back>'+L('رجوع','Back','Terug','Bali','חזרה')+'</button>'+
      '<button type="button" data-top>'+L('للأعلى','Top','Omhoog','Ndhuwur','למעלה')+'</button>'+
      '<a href="'+href+'">'+label+'</a>';
    d.body.append(box);
    box.querySelector('[data-back]')?.addEventListener('click',()=>history.length>1?history.back():location.assign(href));
    box.querySelector('[data-close]')?.addEventListener('click',()=>{const ref=document.referrer;if(ref&&new URL(ref,location.href).origin===location.origin)history.back();else location.assign(href)});
    box.querySelector('[data-top]')?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  }
  function init(){ensureHeader();ensureBreadcrumb();ensureActions()}
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})();
