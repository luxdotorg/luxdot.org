
(()=>{
'use strict';
const root=document.querySelector('[data-research-graph]');
if(!root) return;
// v4.16.6 compatibility layer.
// Rendering is owned exclusively by research-graph.js.
// This file intentionally does not draw into .rg-canvas, preventing two engines
// from overwriting SKY / UNIVERSE / NEURAL / MOTHERBOARD views.
const lang=(new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();
const L={
 ar:{title:'طريقة عرض الأبحاث',hint:'أربع عدسات لنفس المعرفة'},
 en:{title:'Research views',hint:'Four lenses on the same knowledge'},
 nl:{title:'Onderzoeksweergaven',hint:'Vier lenzen op dezelfde kennis'},
 he:{title:'תצוגות מחקר',hint:'ארבע עדשות על אותו ידע'},
 jv:{title:'Tampilan panliten',hint:'Papat cara ndeleng kawruh sing padha'},
 id:{title:'Tampilan riset',hint:'Empat cara melihat pengetahuan yang sama'},
 fr:{title:'Vues de recherche',hint:'Quatre lectures du même savoir'},
 es:{title:'Vistas de investigación',hint:'Cuatro lecturas del mismo conocimiento'},
 de:{title:'Forschungsansichten',hint:'Vier Perspektiven auf dasselbe Wissen'},
 tr:{title:'Araştırma görünümleri',hint:'Aynı bilgiye dört bakış'}
}[lang]||{title:'Research views',hint:'Four lenses on the same knowledge'};
const t=root.querySelector('[data-view-title]');
const h=root.querySelector('[data-view-hint]');
if(t)t.textContent=L.title;
if(h)h.textContent=L.hint;
})();
