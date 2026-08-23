/* نقطة نور · Research Sky interaction repair v4.16.0 */
(()=> {
 function init(){
   const svg=document.querySelector(".rg-canvas"),detail=document.querySelector(".rg-detail");
   if(!svg||!detail)return;
   let pinned=false,hoverTimer=null,lastHTML="";
   function clear(){
     pinned=false;
     detail.innerHTML="";
     detail.classList.remove("open","active","show");
     svg.querySelectorAll(".selected,.active,.focused").forEach(x=>x.classList.remove("selected","active","focused"));
     document.dispatchEvent(new CustomEvent("luxdot:research-clear"));
   }
   function nodes(){return [...svg.querySelectorAll("g,circle,[data-id],[data-node],[class*='node']")].filter(x=>x!==svg)}
   function bind(){
     nodes().forEach(n=>{
       if(n.dataset.luxHoverBound)return;n.dataset.luxHoverBound="1";
       n.addEventListener("mouseenter",()=>{
         if(pinned)return;
         lastHTML=detail.innerHTML;
         /* Existing graph handlers usually populate detail on pointer/click. We trigger a harmless pointer event. */
         n.dispatchEvent(new MouseEvent("click",{bubbles:true,cancelable:true,view:window}));
         hoverTimer=setTimeout(()=>{pinned=false},0);
       });
       n.addEventListener("mouseleave",()=>{
         if(pinned)return;
         clearTimeout(hoverTimer);
         setTimeout(()=>{if(!pinned)detail.innerHTML="";},80);
       });
       n.addEventListener("click",()=>{pinned=true},{capture:true});
     });
   }
   bind(); new MutationObserver(bind).observe(svg,{childList:true,subtree:true});
   document.addEventListener("keydown",e=>{if(e.key==="Escape"){e.preventDefault();clear()}});
   document.addEventListener("click",e=>{
     if(!e.target.closest(".rg-canvas,.rg-detail") && pinned) clear();
   });
   const hint=document.createElement("div");hint.className="rg-escape-hint";hint.textContent="مرّر فوق العقدة للمعاينة · انقر للتثبيت · ESC للرجوع";
   svg.parentElement.insertBefore(hint,svg);
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();