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
function current(){let l=localStorage.getItem('luxdot.lang')||document.documentElement.lang||'ar';return LANGS.includes(l)?l:'en'}
function t(obj,l){return obj?.[l]??obj?.en??''}
function apply(){const l=current(),u=UI[l];document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.title='LuxDot · '+t(D.title,l);
 document.querySelectorAll('[data-local="library"]').forEach(e=>e.textContent=u.library);
 document.getElementById('readerKicker').textContent=t(D.tradition,l);
 document.getElementById('readerTitle').textContent=t(D.title,l);
 document.getElementById('readerDeck').textContent=t(D.intro,l);
 document.getElementById('readerNote').textContent=u.readerNote;
 document.getElementById('originalToggle').textContent=document.body.classList.contains('show-original')?u.hideOriginal:u.original;
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
function speak(){if(!('speechSynthesis' in window))return;const l=current();speechSynthesis.cancel();const all=[t(D.title,l),t(D.intro,l),...(D.sections||[]).flatMap(s=>[t(s.heading,l),t(s.meaning,l),t(s.context,l)])].filter(Boolean).join('. ');const u=new SpeechSynthesisUtterance(all);u.lang={ar:'ar',en:'en-US',nl:'nl-NL',id:'id-ID'}[l];u.rate=.9;speechSynthesis.speak(u)}
document.addEventListener('DOMContentLoaded',()=>{apply();document.getElementById('originalToggle')?.addEventListener('click',()=>{document.body.classList.toggle('show-original');apply()});document.getElementById('listenButton')?.addEventListener('click',speak);document.getElementById('stopButton')?.addEventListener('click',()=>speechSynthesis?.cancel());document.querySelectorAll('[data-lang-select]').forEach(s=>s.addEventListener('change',e=>{localStorage.setItem('luxdot.lang',e.target.value);apply()}))});
document.addEventListener('luxlang',apply);
})();
