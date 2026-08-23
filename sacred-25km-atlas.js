(()=>{
 const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
 function bindLocale(root){
   const buttons=qa('[data-filter]',root), cards=qa('[data-kind]',root), nodes=qa('.node[data-target]',root);
   buttons.forEach(b=>b.addEventListener('click',()=>{
     buttons.forEach(x=>x.classList.toggle('on',x===b)); const f=b.dataset.filter;
     cards.forEach(c=>c.hidden=f!=='all'&&!c.dataset.kind.split(' ').includes(f));
   }));
   nodes.forEach(n=>n.addEventListener('click',()=>{
     nodes.forEach(x=>x.classList.toggle('on',x===n));
     const card=q('#'+n.dataset.target,root); if(card){card.hidden=false;card.scrollIntoView({behavior:'smooth',block:'center'});card.animate([{outline:'1px solid rgba(125,255,174,.8)'},{outline:'1px solid transparent'}],{duration:1200});}
   }));
 }
 function boot(){qa('[data-locale]').forEach(bindLocale)}
 addEventListener('DOMContentLoaded',boot);
})();
