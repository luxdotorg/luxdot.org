
(()=>{
'use strict';
const L={
 ar:{
  home:['⌂','الرئيسية','العودة إلى الصفحة الرئيسية'],
  library:['▤','المكتبة','المكتبة والكتب'],
  faith:['☼','التقاليد','التقاليد والأديان'],
  memory:['◌','الذاكرة','الذاكرة الحية'],
  research:['⌖','الأبحاث الحية','مرصد الأبحاث وسماء المعرفة'],
  radio:['◉','إذاعة نقطة نور','البث الصوتي من الشام'],
  tv:['▣','نقطة نور المرئية','البث المرئي'],
  media:['◈','الوسائط','الصور والفيديو والمواد المرئية'],
  projects:['⬡','المشاريع','مشاريع LuxDot'],
  language:['◎','اللغة','تغيير اللغة'],
  info:['ⓘ','التعريف','تعريف LuxDot'],
  correct:['⚑','تصحيح','صحّح معلومة أو مصدرًا'],
  challenge:['?','اعتراض','اعترض على استنتاج أو فرضية'],
  report:['⚠','تبليغ','أبلغ عن خلل أو رابط أو مشكلة'],
  certificate:['✦','الشهادة','الشهادة أو التقرير']
 },
 en:{
  home:['⌂','Home','Home'],
  library:['▤','Library','Library and books'],
  faith:['☼','Traditions','Faiths and traditions'],
  memory:['◌','Memory','Living memory'],
  research:['⌖','Live Research','Research observatory'],
  radio:['◉','LuxDot Radio','Live audio'],
  tv:['▣','LuxDot TV','Visual channel'],
  media:['◈','Media','Media'],
  projects:['⬡','Projects','Projects'],
  language:['◎','Language','Change language'],
  info:['ⓘ','About','About LuxDot'],
  correct:['⚑','Correct','Correct a fact or source'],
  challenge:['?','Challenge','Challenge an inference'],
  report:['⚠','Report','Report a bug or broken link'],
  certificate:['✦','Certificate','Certificate or report']
 }
};
function lang(){
 return (new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'ar').toLowerCase();
}
function t(key){const x=(L[lang()]||L.en)[key]||(L.en[key]||['•',key,key]); return x}
function keyFromHref(href){
 const p=(href||'').split('?')[0].split('#')[0];
 const m={
  'index.html':'home','home.html':'home','/':'home',
  'library.html':'library','faith.html':'faith','memory.html':'memory',
  'research.html':'research','radio.html':'radio','tv.html':'tv',
  'media.html':'media','projects.html':'projects'
 };
 return m[p]||m[p.split('/').pop()]||null;
}
function decorateHeader(){
 document.querySelectorAll('.lux-main-nav a, header nav a, .site-header nav a').forEach(a=>{
   const key=keyFromHref(a.getAttribute('href')); if(!key) return;
   const [sym,label,desc]=t(key);
   a.classList.add('lux-symbol-nav');
   a.dataset.symbol=sym;
   a.setAttribute('aria-label',label);
   a.setAttribute('title',label);
   a.innerHTML=`<span class="lux-symbol-glyph" aria-hidden="true">${sym}</span><span class="lux-symbol-tooltip" role="tooltip"><b>${label}</b><small>${desc}</small></span>`;
 });
 // Language controls
 document.querySelectorAll('[data-lang-switch],.language-switcher,.lang-switcher,button[aria-label*="language" i]').forEach(b=>{
   const [sym,label,desc]=t('language');
   b.classList.add('lux-symbol-nav','lux-symbol-control');
   b.setAttribute('aria-label',label);b.setAttribute('title',label);
   if(!b.querySelector('.lux-symbol-glyph')) b.innerHTML=`<span class="lux-symbol-glyph" aria-hidden="true">${sym}</span><span class="lux-symbol-tooltip"><b>${label}</b><small>${desc}</small></span>`;
 });
}
function addUtilityStrip(){
 if(document.querySelector('.lux-symbol-utility-strip')) return;
 const host=document.querySelector('header,.lux-header,.site-header')||document.body;
 const strip=document.createElement('div');strip.className='lux-symbol-utility-strip';
 const items=[
  ['info','what-is-luxdot.html'],
  ['challenge','corrections.html#challenge'],
  ['correct','corrections.html#correct'],
  ['report','corrections.html#report']
 ];
 strip.innerHTML=items.map(([k,href])=>{
   const [sym,label,desc]=t(k);
   return `<a class="lux-symbol-nav" href="${href}" aria-label="${label}" title="${label}">
    <span class="lux-symbol-glyph" aria-hidden="true">${sym}</span>
    <span class="lux-symbol-tooltip"><b>${label}</b><small>${desc}</small></span>
   </a>`;
 }).join('');
 host.appendChild(strip);
}
function boot(){decorateHeader();addUtilityStrip()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
