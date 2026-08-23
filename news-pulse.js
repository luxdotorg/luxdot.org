/* LuxDot v4.17.3 — TV News Pulse */
(()=>{'use strict';
function lang(){return (new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'ar').slice(0,2)}
async function init(){
 if(!/\/tv\.html$/i.test(location.pathname))return;
 let data;try{data=await fetch('news-pulse.json?v=4173',{cache:'no-store'}).then(r=>r.json())}catch{return}
 const bar=document.createElement('div');bar.id='luxNewsPulse';bar.innerHTML='<b>نبض العالم</b><div class="lnp-window"><div class="lnp-track"></div></div>';
 document.body.append(bar);const track=bar.querySelector('.lnp-track');
 const items=(data.items||[]).sort((a,b)=>(b.priority||0)-(a.priority||0));
 track.innerHTML=[...items,...items].map(x=>`<a href="${x.url}" target="_blank" rel="noopener"><span>${x.kind==='sky'?'✦':'◉'}</span>${lang()==='ar'?x.ar:x.en}<em>${x.source}</em></a>`).join('');
 function sacred(c){bar.classList.toggle('sacred',!!c?.sacred);if(c?.sacred)bar.querySelector('b').textContent='نص مقدس · Sacred';else bar.querySelector('b').textContent='نبض العالم'}
 document.addEventListener('luxdot-today-context',e=>sacred(e.detail));sacred(window.LuxDotToday);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();