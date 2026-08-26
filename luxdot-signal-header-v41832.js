
(()=>{
'use strict';
const labels={
 ar:{calendar:'الرزنامة العالمية',search:'البحث',inquiry:'استعلام / اعتراض',help:'مساعدة / تعريف',pulse:'نبض نقطة نور'},
 en:{calendar:'Global Calendar',search:'Search',inquiry:'Inquiry / Challenge',help:'Help / About',pulse:'LuxDot Pulse'}
};
const lang=()=>{const q=new URLSearchParams(location.search).get('lang')||localStorage.getItem('luxdot.lang')||document.documentElement.lang||'ar';return q.startsWith('ar')?'ar':'en'};
const L=()=>labels[lang()];
const depth=()=>Math.max(0,location.pathname.split('/').filter(Boolean).length-1);
const root=()=> '../'.repeat(depth());
const withLang=(f)=>{const u=new URL(root()+f,location.href);u.searchParams.set('lang',lang());return u.pathname+u.search+u.hash};
function tip(t){return `<span class="lux-sig32-tip">${t}</span>`}
function img(file){return `<img src="${root()}assets/icons/luxdot-symbols/${file}" alt="" aria-hidden="true">`}
function restoreTextNav(header){
 header.querySelectorAll('.lux-main-nav>a').forEach(a=>{
   if(a.classList.contains('lux-sig32'))return;
   const aria=a.getAttribute('aria-label');
   if(aria && a.querySelector('img')) a.textContent=aria;
   a.classList.remove('lux-symbol-nav','lux-color-nav','lux-signal-action');
 });
}
function apply(){
 const h=document.querySelector('.lux-header-43108');
 if(!h)return false;
 const inner=h.querySelector('.lux-header-inner')||h;
 const nav=h.querySelector('.lux-main-nav');
 if(!nav)return false;
 restoreTextNav(h);

 // Keep the independent LuxDot Hypotheses section visible in the main navigation.
 let hypotheses=nav.querySelector('[data-lux-hypotheses]');
 if(!hypotheses){
   hypotheses=document.createElement('a');hypotheses.dataset.luxHypotheses='1';
   hypotheses.href=withLang('luxdot-hypotheses.html');nav.append(hypotheses);
 }
 hypotheses.textContent=lang()==='ar'?'فرضيات لوكسدوت':'LuxDot Hypotheses';

 // Homepage entry card; idempotent because this layer is stabilized repeatedly.
 const cards=document.querySelector('main .cards');
 if(cards&&!cards.querySelector('[data-lux-hypotheses-card]')){
   const card=document.createElement('a');card.dataset.luxHypothesesCard='1';
   card.className='card lux-home-native';card.href=withLang('luxdot-hypotheses.html');
   card.innerHTML='<small style="color:#e3c766;letter-spacing:.12em">LUXDOT HYPOTHESES · فرضيات لوكسدوت</small><h2>الفرضيات الكبرى</h2><p>نماذج تفسيرية جريئة، أدلتها واعتراضاتها واختبارات تفنيدها في مساحة مستقلة.</p>';
   cards.prepend(card);
 }

 let strip=h.querySelector('.lux-signal-strip-41832');
 if(!strip){
   strip=document.createElement('div');strip.className='lux-signal-strip-41832';
   const language=h.querySelector('.lux-language');
   if(language)inner.insertBefore(strip,language); else inner.append(strip);
 }
 const l=L();

 // Pulse: preserve the existing button and its click listener.
 const pulse=document.getElementById('luxTimelineInfo');
 if(pulse){
   pulse.className='lux-sig32';pulse.setAttribute('aria-label',l.pulse);pulse.title=l.pulse;
   pulse.innerHTML=img('pulse.svg')+tip(l.pulse);
   if(pulse.parentElement!==strip)strip.prepend(pulse);
 }

 // Calendar
 let cal=strip.querySelector('[data-sig32="calendar"]');
 if(!cal){
   cal=document.createElement('a');cal.dataset.sig32='calendar';cal.className='lux-sig32';
   cal.href=withLang('world-calendar.html');strip.append(cal);
 }
 cal.setAttribute('aria-label',l.calendar);cal.title=l.calendar;cal.innerHTML=img('calendar.svg')+tip(l.calendar);

 // Search: move existing search button, keep listener.
 const search=h.querySelector('.lux-search-open');
 if(search){
   search.className='lux-search-open lux-sig32';search.setAttribute('aria-label',l.search);search.title=l.search;
   search.innerHTML=img('investigation.svg')+tip(l.search);
   if(search.parentElement!==strip)strip.append(search);
   const oldWrap=h.querySelector('.lux-global-search');if(oldWrap&&!oldWrap.children.length)oldWrap.remove();
 }

 let inquiry=strip.querySelector('[data-sig32="inquiry"]');
 if(!inquiry){
   inquiry=document.createElement('a');inquiry.dataset.sig32='inquiry';inquiry.className='lux-sig32';
   inquiry.href=withLang('corrections.html#challenge');strip.append(inquiry);
 }
 inquiry.setAttribute('aria-label',l.inquiry);inquiry.title=l.inquiry;
 inquiry.innerHTML='<span class="sig32-char">?</span>'+tip(l.inquiry);

 let help=strip.querySelector('[data-sig32="help"]');
 if(!help){
   help=document.createElement('a');help.dataset.sig32='help';help.className='lux-sig32';
   help.href=withLang('what-is-luxdot.html');strip.append(help);
 }
 help.setAttribute('aria-label',l.help);help.title=l.help;
 help.innerHTML='<span class="sig32-char">i</span>'+tip(l.help);

 // Remove any obsolete detached signal strips made by the previous layer.
 h.querySelectorAll('.lux-signal-strip,.lux-symbol-utility-strip').forEach(x=>{if(x!==strip)x.remove()});
 return true;
}
let rounds=0;
function stabilize(){
 apply();rounds++;
 if(rounds<24)setTimeout(stabilize,125);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',stabilize,{once:true});else stabilize();
})();
