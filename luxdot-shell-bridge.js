(()=>{
'use strict';

const SHELL_PATH='/player-shell.html';
const EMBED_PARAM='luxembed';
const MESSAGE_TYPE='luxdot:navigate';
const DIRECT_NATIVE=new Set([
  '/home.html',
  '/research.html',
  '/projects.html',
  '/memory.html',
  '/library.html',
  '/faith.html',
  '/humanity.html',
  '/media.html',
  '/radio.html',
  '/audiovisual.html',
  '/praxis.html',
  '/kids-galaxy.html'
]);

const normalizedPath=()=>{
  let p=location.pathname||'/';
  if(p==='/'||p==='') p='/index.html';
  return p;
};

const isDirectNative=()=>DIRECT_NATIVE.has(normalizedPath());

const publicLocation=()=>{
  const u=new URL(location.href);
  u.searchParams.delete(EMBED_PARAM);
  return u.pathname+u.search+u.hash;
};

try{
  const u=new URL(location.href);
  if(u.pathname.endsWith(SHELL_PATH)) return;

  if(isDirectNative()){
    if(u.searchParams.has(EMBED_PARAM)){
      u.searchParams.delete(EMBED_PARAM);
    }
    const clean=u.pathname+u.search+u.hash;
    if(window.top!==window.self){
      window.top.location.replace(clean);
      return;
    }
    if(location.href!==new URL(clean,location.origin).href){
      history.replaceState(history.state,'',clean);
    }
    return;
  }

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
