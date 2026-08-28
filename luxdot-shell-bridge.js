(()=>{
'use strict';

const SHELL_PATH='/player-shell.html';
const EMBED_PARAM='luxembed';
const MESSAGE_TYPE='luxdot:navigate';

const publicLocation=()=>{
  const u=new URL(location.href);
  u.searchParams.delete(EMBED_PARAM);
  return u.pathname+u.search+u.hash;
};

try{
  const u=new URL(location.href);
  if(u.pathname.endsWith(SHELL_PATH)) return;

  if(window.top===window.self){
    if(u.searchParams.get(EMBED_PARAM)==='1'){
      u.searchParams.delete(EMBED_PARAM);
      history.replaceState(history.state,'',u.pathname+u.search+u.hash);
      return;
    }
    const here=u.pathname.replace(/^\//,'')+u.search+u.hash;
    location.replace(SHELL_PATH+'?page='+encodeURIComponent(here));
    return;
  }

  let lastSent='';
  const send=()=>{
    try{
      const next=publicLocation();
      if(next===lastSent) return;
      lastSent=next;
      parent.postMessage({type:MESSAGE_TYPE,url:next.replace(/^\//,'')},location.origin);
    }catch(_e){}
  };

  if(document.readyState==='loading'){
    addEventListener('DOMContentLoaded',send,{once:true});
  }else{
    queueMicrotask(send);
  }
  addEventListener('pageshow',send);
  addEventListener('hashchange',send);
}catch(_e){}
})();
