(()=>{
'use strict';
try{localStorage.setItem('luxdot.lang','ar');localStorage.setItem('luxdot.lang.explicit','1')}catch{}
document.documentElement.lang='ar';document.documentElement.dir='rtl';window.LUXDOT_ARABIC_MASTER=true;
// Compatibility bridge for legacy modules. Arabic is the only active language.
window.LuxLang=Object.assign(window.LuxLang||{}, {
 get:()=> 'ar',
 set:()=> 'ar',
 supported:()=> ['ar'],
 navigate:()=>{const u=new URL(location.href);u.searchParams.delete('lang');location.href=u.pathname+u.search+u.hash}
});
function normalizeLinks(){
 document.querySelectorAll('a[href]').forEach(a=>{
   const raw=a.getAttribute('href'); if(!raw||/^(?:https?:|mailto:|tel:|#|javascript:)/i.test(raw))return;
   try{const u=new URL(raw,location.href);u.searchParams.delete('lang');a.href=u.href}catch{}
 });
 document.querySelectorAll('[data-href]').forEach(el=>{
   let raw=el.dataset.href;if(!raw)return;try{const u=new URL(raw,location.href);u.searchParams.delete('lang');el.dataset.href=u.href}catch{}
   if(el.dataset.arabicMasterNav)return;el.dataset.arabicMasterNav='1';el.setAttribute('role','link');if(!el.hasAttribute('tabindex'))el.tabIndex=0;
   const go=()=>{if(el.dataset.href)location.href=el.dataset.href};
   el.addEventListener('click',e=>{if(e.target.closest('a,button,input,select,textarea'))return;go()});
   el.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('a,button,input,select,textarea')){e.preventDefault();go()}});
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',normalizeLinks);else normalizeLinks();
})();
