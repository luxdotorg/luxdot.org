
(()=>{
'use strict';
const BASE='assets/icons/luxdot-symbols/';
const I={
 calendar:'calendar.svg',
 search:'investigation.svg',
 inquiry:'challenge.svg',
 info:'info.svg'
};
const A={
 ar:{
  calendar:['الرزنامة العالمية','افتح الرزنامة الشهرية والتقاطعات'],
  search:['البحث','ابحث في كل LuxDot'],
  inquiry:['استعلام / اعتراض','اسأل أو اعترض على استنتاج أو مصدر'],
  info:['مساعدة / تعريف','ما هي LuxDot وكيف تستخدمها'],
  pulse:['نبض نقطة نور','الشفافية والقياس الحي']
 },
 en:{
  calendar:['Global Calendar','Open the monthly calendar and convergence watch'],
  search:['Search','Search all LuxDot'],
  inquiry:['Inquiry / Challenge','Ask or challenge a claim or source'],
  info:['Help / About','What LuxDot is and how to use it'],
  pulse:['LuxDot Pulse','Live transparency and measurement']
 }
};
function lang(){return (new URLSearchParams(location.search).get('lang')||localStorage.getItem('luxdot.lang')||document.documentElement.lang||'ar').toLowerCase()}
function tx(k){return (A[lang()]||A.en)[k]||A.en[k]}
function depth(){return Math.max(0,location.pathname.split('/').filter(Boolean).length-1)}
function root(){return '../'.repeat(depth())}
function withLang(file){const u=new URL(root()+file,location.href);u.searchParams.set('lang',lang());return u.pathname+u.search+u.hash}
function icon(key,label,desc){
 const src=root()+BASE+I[key];
 return `<img class="lux-color-icon" src="${src}" alt="" aria-hidden="true"><span class="lux-symbol-tooltip" role="tooltip"><b>${label}</b><small>${desc}</small></span>`;
}
function setupButton(el,key){
 if(!el)return;
 const [label,desc]=tx(key);
 el.classList.add('lux-symbol-nav','lux-color-nav','lux-signal-action');
 el.setAttribute('aria-label',label);el.setAttribute('title',label);
 if(key==='pulse'){
   const img=el.querySelector('img');
   el.querySelectorAll('.lux-pulse-label').forEach(x=>x.remove());
   if(!el.querySelector('.lux-symbol-tooltip')){
     el.insertAdjacentHTML('beforeend',`<span class="lux-symbol-tooltip" role="tooltip"><b>${label}</b><small>${desc}</small></span>`);
   } else {
     const b=el.querySelector('.lux-symbol-tooltip b'),s=el.querySelector('.lux-symbol-tooltip small');
     if(b)b.textContent=label;if(s)s.textContent=desc;
   }
 }else{
   el.innerHTML=icon(key,label,desc);
 }
}
function boot(){
 const header=document.querySelector('.lux-header-43108,header.top,header.site-header');
 if(!header)return;
 const inner=header.querySelector('.lux-header-inner,.topin,.wrap')||header;

 // IMPORTANT: primary navigation stays textual/cartouche-based.
 header.querySelectorAll('.lux-main-nav a').forEach(a=>{
   a.classList.remove('lux-symbol-nav','lux-color-nav','lux-signal-action');
   if(a.dataset.luxOriginalLabel) a.textContent=a.dataset.luxOriginalLabel;
 });

 let strip=header.querySelector('.lux-signal-strip');
 if(!strip){
   strip=document.createElement('div');
   strip.className='lux-signal-strip';
   strip.setAttribute('aria-label',lang()==='ar'?'أدوات الإشارة':'Signal tools');
   const language=header.querySelector('.lux-language');
   if(language)inner.insertBefore(strip,language); else inner.appendChild(strip);
 }

 // Calendar icon
 if(!strip.querySelector('[data-lux-signal="calendar"]')){
   const [label,desc]=tx('calendar');
   const a=document.createElement('a');
   a.dataset.luxSignal='calendar';a.href=withLang('world-calendar.html');
   a.className='lux-symbol-nav lux-color-nav lux-signal-action';
   a.setAttribute('aria-label',label);a.setAttribute('title',label);
   a.innerHTML=icon('calendar',label,desc);
   strip.appendChild(a);
 }

 // Move/decorate global search into the signal strip.
 const search=header.querySelector('.lux-search-open');
 if(search){
   search.dataset.luxSignal='search';
   setupButton(search,'search');
   strip.appendChild(search);
   const wrap=header.querySelector('.lux-global-search');
   if(wrap && !wrap.children.length)wrap.remove();
 }

 // Inquiry / challenge signal
 if(!strip.querySelector('[data-lux-signal="inquiry"]')){
   const [label,desc]=tx('inquiry');
   const a=document.createElement('a');
   a.dataset.luxSignal='inquiry';a.href=withLang('corrections.html#challenge');
   a.className='lux-symbol-nav lux-color-nav lux-signal-action';
   a.setAttribute('aria-label',label);a.setAttribute('title',label);
   a.innerHTML=icon('inquiry',label,desc);
   strip.appendChild(a);
 }

 // Help / question signal
 if(!strip.querySelector('[data-lux-signal="info"]')){
   const [label,desc]=tx('info');
   const a=document.createElement('a');
   a.dataset.luxSignal='info';a.href=withLang('what-is-luxdot.html');
   a.className='lux-symbol-nav lux-color-nav lux-signal-action';
   a.setAttribute('aria-label',label);a.setAttribute('title',label);
   a.innerHTML=icon('info',label,desc);
   strip.appendChild(a);
 }

 function movePulse(){
   const pulse=document.getElementById('luxTimelineInfo');
   if(!pulse)return false;
   pulse.dataset.luxSignal='pulse';setupButton(pulse,'pulse');strip.insertBefore(pulse,strip.firstChild);
   return true;
 }
 if(!movePulse()){
   let tries=0;
   const timer=setInterval(()=>{tries++;if(movePulse()||tries>20)clearInterval(timer)},100);
 }

 header.classList.add('lux-signal-header-v41830');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
