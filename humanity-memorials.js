(()=>{
'use strict';
function add(){
 if(document.querySelector('[data-lux-abdulsamie]'))return;
 const grids=[...document.querySelectorAll('.tag-grid')];
 const target=grids.find(grid=>grid.querySelector('[href="edith-stein.html"]'))||grids.at(-1);
 if(!target)return;
 const card=document.createElement('a');
 card.className='idtag';card.dataset.kind='martyr';card.dataset.trad='human';card.dataset.name='Abd al-Samie al-Hajji عبد السميع الحجي أبو وسيم';card.dataset.luxAbdulsamie='1';card.href='abdulsamie-alhajji-memory.html';
 card.innerHTML='<div class="type">LUXDOT · FAMILY MEMORY DOSSIER</div><h3>Abd al-Samie al-Hajji</h3><div class="native">الشهيد عبد السميع الحجي · أبو وسيم</div><div class="years">قُتل عن 54 عاماً · 2012</div><div class="meta">RAILWAY TEACHER · ALEPPO · FAMILY MEMORY</div>';
 target.prepend(card);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add,{once:true});else add();
})();
