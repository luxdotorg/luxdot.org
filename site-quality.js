(()=>{
'use strict';
function lang(){return (window.LuxLang&&window.LuxLang.get())||document.documentElement.lang||'en'}
function replaceNames(){/* v4.3.77: canonical name spellings are immutable; no cross-script rewriting. */}
function clickParity(){
 document.querySelectorAll('[data-href]').forEach(c=>{if(c.dataset.clickParity)return;c.dataset.clickParity='1';c.tabIndex=c.tabIndex<0?0:c.tabIndex;c.setAttribute('role','link');const go=()=>{const h=c.dataset.href;if(h)location.href=h};c.addEventListener('click',e=>{if(e.target.closest('a,button,select,input'))return;go()});c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});
 document.querySelectorAll('.cards .card').forEach(c=>{const a=c.querySelector('a[href]');if(!a||c.dataset.clickParity)return;c.dataset.clickParity='1';c.tabIndex=0;c.setAttribute('role','link');c.addEventListener('click',e=>{if(e.target.closest('a,button,select,input'))return;location.href=a.href});c.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('a,button,select,input')){e.preventDefault();location.href=a.href}})})
}
function entryFailSafe(){if(!document.body.classList.contains('home-arrival'))return;const clear=()=>{document.body.classList.remove('home-arrival','home-arrival-go');try{sessionStorage.removeItem('luxdot.entry.point')}catch{}};setTimeout(clear,1250);if(lang()==='ar'||lang()==='he')setTimeout(clear,80)}
function run(){replaceNames();clickParity();entryFailSafe()}
let timer;const later=()=>{clearTimeout(timer);timer=setTimeout(()=>{replaceNames();clickParity()},80)};
document.addEventListener('DOMContentLoaded',()=>{run();const m=new MutationObserver(later);m.observe(document.body,{childList:true,subtree:true})});
document.addEventListener('luxlang',()=>setTimeout(run,20));
})();
