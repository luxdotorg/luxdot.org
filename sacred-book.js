
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll("[data-book-link]").forEach(link=>{
    link.addEventListener("click",e=>{
      if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
      const href=link.getAttribute("href"); if(!href)return;
      e.preventDefault();
      link.classList.add("book-leaving");
      const u=new URL(href,location.href);u.searchParams.set("open","1");setTimeout(()=>location.href=u.href,560);
    });
  });
  const opener=document.querySelector("[data-open-sacred]");
  const stage=document.querySelector("[data-sacred-stage]");
  const reader=document.querySelector("[data-sacred-reader]");
  const closer=document.querySelector("[data-close-sacred]");
  function openBook(){
    if(!stage||!reader)return;
    stage.classList.add("is-open");
    reader.setAttribute("aria-hidden","false");
    setTimeout(()=>reader.querySelector("button,input,a")?.focus({preventScroll:true}),780); document.dispatchEvent(new CustomEvent("bookopened"));
  }
  function closeBook(){
    if(!stage||!reader)return;
    stage.classList.remove("is-open");
    reader.setAttribute("aria-hidden","true");
    opener?.focus({preventScroll:true});
  }
  opener?.addEventListener("click",openBook);
  if(opener&&new URLSearchParams(location.search).get("open")==="1")setTimeout(openBook,260);
  closer?.addEventListener("click",closeBook);
});
