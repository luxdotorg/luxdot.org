
(()=>{const p=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const display=new Set(['index.html','home.html','what-is-luxdot.html','humanity.html','luxdot-philosophy.html']);
const knowledge=new Set(['research.html','library.html','projects.html','memory.html','witness.html','calendar.html']);
document.addEventListener('DOMContentLoaded',()=>{document.body.dataset.luxDensity=display.has(p)?'display':knowledge.has(p)?'knowledge':'standard';});})();
