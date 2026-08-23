(()=>{'use strict';
const TARGETS=['ar','en','nl','he','jv','id','fr','es','de','tr'];
function rootPrefix(){const p=location.pathname.split('/').filter(Boolean);return p.length>1?'../'.repeat(p.length-1):''}
const FIXED=['LuxDot','Rafy Alhajji','Rafi Alhaji','رافي الحجي','رافي الحاجي'];
const page=()=>location.pathname.split('/').pop()||'index.html';
const pagePath=()=>location.pathname.replace(/^\/+/, '');
const lang=()=>{const q=new URLSearchParams(location.search).get('lang');return q||(window.LuxLang&&LuxLang.get&&LuxLang.get())||localStorage.getItem('luxdot.lang')||'en'};
function protect(){
 document.querySelectorAll('header,.lux-header-43108,[data-lux-brand],[translate="no"],code,pre,kbd,samp').forEach(e=>{e.setAttribute('translate','no');e.classList.add('notranslate')});
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){
   if(!n.parentElement||n.parentElement.closest('script,style,code,pre,.notranslate,[translate="no"]'))continue;
   if(FIXED.some(x=>n.nodeValue.includes(x))){const p=n.parentElement;if(p.childNodes.length===1){p.setAttribute('translate','no');p.classList.add('notranslate')}}
 }
}
function visibleText(){
 const clone=document.body.cloneNode(true);clone.querySelectorAll('script,style,header,.lux-header-43108,.notranslate,[translate="no"]').forEach(x=>x.remove());return (clone.innerText||clone.textContent||'').slice(0,80000)
}
function guessSource(text){
 const s=' '+text.toLowerCase()+' ';const ar=(text.match(/[\u0600-\u06ff]/g)||[]).length,he=(text.match(/[\u0590-\u05ff]/g)||[]).length,lat=(text.match(/[A-Za-zÀ-ž]/g)||[]).length;
 if(ar>Math.max(120,lat*.22))return'ar'; if(he>Math.max(80,lat*.18))return'he';
 const score=(words)=>words.reduce((n,w)=>n+(s.includes(' '+w+' ')?1:0),0);
 if(score(['yang','dan','dengan','untuk','adalah','dalam','tidak','dari'])>=3)return'id';
 if(score(['lan','ing','kanggo','iki','saka','ora','kanthi','wong'])>=3)return'jv';
 if(score(['het','een','van','voor','niet','met','onderzoek','wereld'])>=3)return'nl';
 if(score(['und','der','die','das','für','nicht','mit','forschung'])>=3)return'de';
 if(score(['et','les','des','pour','avec','pas','recherche','monde'])>=3)return'fr';
 if(score(['los','las','para','con','una','del','investigación','mundo'])>=3)return'es';
 if(score(['ve','bir','için','ile','değil','araştırma','dünya'])>=3)return'tr';
 return'en'
}
async function coverage(){try{const r=await fetch(rootPrefix()+'data/i18n-coverage.json?v=41815',{cache:'no-store'});return await r.json()}catch(_){return{}}}
function cleanGoogleChrome(){
 const st=document.createElement('style');st.textContent='.goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt,.goog-te-spinner-pos{display:none!important}body{top:0!important}.skiptranslate:not(#lux-google-translate){font-size:0!important}#lux-google-translate{position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden}';document.head.appendChild(st);
 setInterval(()=>{document.querySelectorAll('iframe.goog-te-banner-frame,.goog-te-balloon-frame').forEach(x=>x.remove());document.body.style.top='0px'},900)
}
function loadGoogle(target,source){return new Promise((resolve,reject)=>{
 window.__luxGoogleReady=()=>{try{new google.translate.TranslateElement({pageLanguage:source,includedLanguages:TARGETS.join(','),autoDisplay:false,multilanguagePage:true},'lux-google-translate');let tries=0;const timer=setInterval(()=>{tries++;const sel=document.querySelector('.goog-te-combo');if(sel){clearInterval(timer);sel.value=target;sel.dispatchEvent(new Event('change',{bubbles:true}));setTimeout(()=>sel.dispatchEvent(new Event('change',{bubbles:true})),250);document.documentElement.lang=target;document.documentElement.dir=target==='ar'||target==='he'?'rtl':'ltr';document.documentElement.dataset.luxAutoTranslated='1';resolve(true)}else if(tries>=32){clearInterval(timer);reject(new Error('combo missing'))}},250)}catch(e){reject(e)}};
 const box=document.createElement('div');box.id='lux-google-translate';box.className='notranslate';box.setAttribute('translate','no');document.body.appendChild(box);
 cleanGoogleChrome();
 let sc=document.querySelector('script[data-lux-google-translate]');if(sc){setTimeout(window.__luxGoogleReady,60);return}sc=document.createElement('script');sc.dataset.luxGoogleTranslate='1';sc.src='https://translate.google.com/translate_a/element.js?cb=__luxGoogleReady';sc.async=true;sc.onerror=reject;document.head.appendChild(sc)
 })}
async function run(){
 const target=lang();protect();if(!TARGETS.includes(target))return;
 const cov=await coverage(),entry=cov[pagePath()]||cov[page()]||{},native=entry.native||[];
 if(native.includes(target)){document.documentElement.dataset.luxTranslationMode='native';return}
 await new Promise(r=>setTimeout(r,1200));protect();const text=visibleText(),source=guessSource(text);
 if(source===target){document.documentElement.dataset.luxTranslationMode='native-detected';return}
 document.documentElement.dataset.luxTranslationMode='auto';
 try{await loadGoogle(target,source)}catch(e){document.documentElement.dataset.luxTranslationMode='fallback-failed';console.warn('LuxDot translation fallback failed',e)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
