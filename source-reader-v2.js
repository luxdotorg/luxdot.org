(()=>{
'use strict';
const D=window.BOOK_READER_DATA||{};
const LANGS=['ar','en','nl','id'];
const UI={
 ar:{library:'المكتبة',original:'إظهار النص الأصلي',hideOriginal:'إخفاء النص الأصلي',listen:'استمع إلى الشرح',stop:'إيقاف الصوت',source:'فتح المصدر الكامل ↗',sourceLanguage:'لغة النص الأصلي',readerNote:'يظهر الشرح بلغتك فقط. النص الأصلي مخفي افتراضياً كي لا يفرض على القارئ أبجدية لا يعرفها',context:'السياق',sections:'مقاطع للقراءة'},
 en:{library:'Library',original:'Show original text',hideOriginal:'Hide original text',listen:'Listen to the explanation',stop:'Stop audio',source:'Open full source ↗',sourceLanguage:'Original-text language',readerNote:'The explanation stays in your language. Original script is hidden by default so an unfamiliar alphabet is never forced on the reader',context:'Context',sections:'Reading passages'},
 nl:{library:'Bibliotheek',original:'Toon oorspronkelijke tekst',hideOriginal:'Verberg oorspronkelijke tekst',listen:'Luister naar de uitleg',stop:'Stop audio',source:'Open volledige bron ↗',sourceLanguage:'Taal van de oorspronkelijke tekst',readerNote:'De uitleg blijft volledig in jouw taal. Het oorspronkelijke schrift is standaard verborgen zodat een onbekend alfabet nooit wordt opgedrongen',context:'Context',sections:'Leesfragmenten'},
 id:{library:'Perpustakaan',original:'Tampilkan teks asli',hideOriginal:'Sembunyikan teks asli',listen:'Dengarkan penjelasan',stop:'Hentikan audio',source:'Buka sumber lengkap ↗',sourceLanguage:'Bahasa teks asli',readerNote:'Penjelasan tetap sepenuhnya dalam bahasa Anda. Aksara asli disembunyikan secara bawaan agar pembaca tidak dipaksa membaca alfabet yang tidak dikenalnya',context:'Konteks',sections:'Bagian bacaan'}
};
function current(){let raw=(window.LuxLang&&window.LuxLang.get())||'en';let l=raw==='jv'?'id':raw==='he'?'en':raw;return LANGS.includes(l)?l:'en'}
function t(obj,l){return obj?.[l]??obj?.en??''}
function apply(){const l=current(),u=UI[l];const actual=(window.LuxLang&&window.LuxLang.get())||'en';document.documentElement.lang=actual;document.documentElement.dir=(actual==='ar'||actual==='he')?'rtl':'ltr';document.title='LuxDot · '+t(D.title,l);
 document.querySelectorAll('[data-local="library"]').forEach(e=>e.textContent=u.library);
 document.getElementById('readerKicker').textContent=t(D.tradition,l);
 document.getElementById('readerTitle').textContent=t(D.title,l);
 document.getElementById('readerDeck').textContent=t(D.intro,l);
 document.getElementById('readerNote').textContent=u.readerNote;
 const ot=document.getElementById('originalToggle'),hasOriginal=(D.sections||[]).some(s=>String(s.original||'').trim());if(ot){ot.hidden=!hasOriginal;ot.textContent=document.body.classList.contains('show-original')?u.hideOriginal:u.original;ot.setAttribute('aria-pressed',document.body.classList.contains('show-original')?'true':'false')}
 document.getElementById('listenButton').textContent=u.listen;
 document.getElementById('sectionsLabel').textContent=u.sections;
 document.getElementById('sourceLink').textContent=u.source;
 document.getElementById('sourceLangLabel').textContent=u.sourceLanguage;
 document.getElementById('sourceLangValue').textContent=t(D.sourceLanguage,l);
 const box=document.getElementById('readerSections'); box.innerHTML='';
 (D.sections||[]).forEach(s=>{const a=document.createElement('article');a.className='reader-section';a.innerHTML=`<div class="reader-section-head"><div><div class="reader-ref"></div><h2></h2></div></div><div class="reader-meaning"></div><div class="reader-context"></div><div class="original-panel"><div class="original-label"></div><div class="original-text"></div></div>`;
 a.querySelector('.reader-ref').textContent=t(s.ref,l);a.querySelector('h2').textContent=t(s.heading,l);a.querySelector('.reader-meaning').textContent=t(s.meaning,l);a.querySelector('.reader-context').textContent=(u.context+': '+t(s.context,l));a.querySelector('.original-label').textContent=u.sourceLanguage+' · '+t(D.sourceLanguage,l);let p=a.querySelector('.original-panel'),o=a.querySelector('.original-text');o.textContent=s.original||'';o.dataset.dir=s.originalDir||'ltr';if(!s.original)p.remove();box.appendChild(a)});
 document.getElementById('sourceLink').href=D.sourceUrl||'#';
 document.querySelectorAll('[data-lang-select]').forEach(s=>s.value=l)
}
let speaking=false,autoTimer=null;
function speak(){
 const b=document.getElementById('listenButton');
 if(!('speechSynthesis' in window)){if(b)b.textContent=current()==='ar'?'الصوت غير متاح':'Audio unavailable';return}
 const l=current(),ui=UI[l];
 if(speaking||speechSynthesis.speaking){speechSynthesis.cancel();speaking=false;if(b)b.textContent=ui.listen;return}
 speechSynthesis.cancel();
 const all=[t(D.title,l),t(D.intro,l),...(D.sections||[]).flatMap(s=>[t(s.heading,l),t(s.meaning,l),t(s.context,l)])].filter(Boolean).join('. ');
 if(!all.trim())return;
 const u=new SpeechSynthesisUtterance(all);u.lang={ar:'ar-SA',en:'en-US',nl:'nl-NL',id:'id-ID'}[l];u.rate=.88;
 u.onstart=()=>{speaking=true;if(b)b.textContent=ui.stop};
 const done=()=>{speaking=false;if(b)b.textContent=ui.listen};u.onend=done;u.onerror=done;
 speechSynthesis.speak(u)
}
function scheduleAuto(){clearTimeout(autoTimer);autoTimer=setTimeout(()=>{if(!document.hidden&&!speaking&&!(window.speechSynthesis&&speechSynthesis.speaking))speak()},3000)}
document.addEventListener('DOMContentLoaded',()=>{apply();document.getElementById('originalToggle')?.addEventListener('click',()=>{document.body.classList.toggle('show-original');apply()});document.getElementById('listenButton')?.addEventListener('click',speak);document.getElementById('stopButton')?.addEventListener('click',()=>{try{speechSynthesis.cancel()}catch{};speaking=false;apply()});document.querySelectorAll('[data-lang-select]').forEach(s=>s.addEventListener('change',e=>{localStorage.setItem('luxdot.lang',e.target.value);apply()}));scheduleAuto()});
document.addEventListener('bookopened',scheduleAuto);
document.addEventListener('luxdot:stop-audio',()=>{clearTimeout(autoTimer);try{speechSynthesis.cancel()}catch{};speaking=false;apply()});
document.addEventListener('luxlang',apply);
})();
