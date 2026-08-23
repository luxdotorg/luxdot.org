
(()=>{function lang(){return (new URLSearchParams(location.search).get('lang')||localStorage.getItem('luxdot.lang')||'en').toLowerCase()}
const T={ar:['لا تجعل الذاكرة تموت','تكلم · أضف ذاكرة'],en:["Don't let memory die",'Speak · Add a memory'],nl:['Laat de herinnering niet sterven','Vertel · Voeg een herinnering toe'],he:['אל תתנו לזיכרון למות','דברו · הוסיפו זיכרון']};
function withLang(u){let l=lang();return u+(u.includes('?')?'&':'?')+'lang='+encodeURIComponent(l)}
function init(){if(document.querySelector('.lux-memory-fab'))return;let t=T[lang()]||T.en,a=document.createElement('a');a.className='lux-memory-fab';a.href=withLang('witness.html?source='+encodeURIComponent(location.pathname.split('/').pop()||'site'));a.setAttribute('aria-label',t[0]);a.innerHTML='⚡<span>'+t[1]+'</span>';document.body.append(a)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()})();
