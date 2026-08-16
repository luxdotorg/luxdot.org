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
