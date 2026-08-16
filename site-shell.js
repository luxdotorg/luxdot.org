(()=>{
'use strict';
const script=[...document.scripts].find(s=>/site-shell\.js(?:\?|$)/.test(s.src));
const ROOT=script?new URL('.',script.src):new URL('.',location.href);
const url=(file)=>new URL(file,ROOT).href;
const ITEMS=[
 ['home.html','الرئيسية'],['library.html','المكتبة'],['faith.html','الإيمان والحكمة'],
 ['nusantara.html','الأرخبيل الإندونيسي'],['memory.html','الذاكرة'],['research.html','الأبحاث'],['projects.html','المشاريع']
];
function apply(){
 document.documentElement.lang='ar'; document.documentElement.dir='rtl';
 const h=document.querySelector('header.top'); if(!h)return;
 const here=(location.pathname.split('/').pop()||'home.html').toLowerCase();
 h.innerHTML=`<div class="wrap topin lux-shell-topin"><a class="logo" data-lux-brand href="${url('home.html')}">نقطة نور</a><nav class="nav lux-shell-nav" aria-label="التنقل الرئيسي">${ITEMS.map(([f,label])=>`<a${here===f?' class="active"':''} href="${url(f)}">${label}</a>`).join('')}</nav></div>`;
 document.body?.classList.add('lux-lang-ready');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
