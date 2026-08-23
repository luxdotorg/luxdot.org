(()=>{'use strict';
const root=document.querySelector('[data-research-graph]');if(!root)return;
function addCss(href,id){if(document.getElementById(id))return;const l=document.createElement('link');l.rel='stylesheet';l.href=href;l.id=id;document.head.append(l)}
addCss('luxdot-research-visual-v4167.css?v=4167','luxdot-research-visual-v4167');
const L={ar:{title:'الأبحاث الحيّة',view:'عدسات العرض'},en:{title:'Live Research',view:'View lenses'},nl:{title:'Levend onderzoek',view:'Weergavelensen'},he:{title:'מחקר חי',view:'עדשות תצוגה'},jv:{title:'Panaliten Urip',view:'Lensa tampilan'},id:{title:'Riset Hidup',view:'Lensa tampilan'},fr:{title:'Recherche vivante',view:'Lentilles'},es:{title:'Investigación viva',view:'Lentes'},de:{title:'Live-Forschung',view:'Ansichten'},tr:{title:'Canlı Araştırma',view:'Görünüm'}};
const lang=(new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase(),T=L[lang]||L.en;
const h=document.querySelector('#luxResearchOrganizer h2');if(h)h.textContent=T.title;
const bar=root.querySelector('.rg-viewbar'),stage=root.querySelector('.rg-stage');if(bar&&stage&&stage.parentNode){stage.parentNode.insertBefore(bar,stage);bar.setAttribute('aria-label',T.view)}
const head=bar?.querySelector('.rg-view-head');if(head)head.style.display='none';
})();
