
(()=>{
'use strict';
const BASE='assets/icons/luxdot-symbols/';
const I={
 home:'home.svg',
 library:'library.svg',
 faith:'traditions.svg',
 memory:'memory.svg',
 research:'research.svg',
 signal:'signal.svg',
 radio:'radio.svg',
 tv:'tv.svg',
 media:'signal.svg',
 projects:'projects.svg',
 engineering:'engineering.svg',
 language:'language-switch.svg',
 info:'info.svg',
 correct:'correct.svg',
 challenge:'challenge.svg',
 report:'report.svg',
 certificate:'living-book.svg',
 atlas:'atlas.svg',
 knowledge:'knowledge.svg',
 investigation:'investigation.svg',
 calendar:'calendar.svg',
 livingBook:'living-book.svg',
 creativity:'creativity.svg'
};
const A={
 ar:{
  home:['الرئيسية','العودة إلى الصفحة الرئيسية'],library:['المكتبة','المكتبة والكتب'],
  faith:['التقاليد والأديان','التقاليد والأديان والمعتقدات'],memory:['الذاكرة','الذاكرة الحية'],
  research:['الأبحاث الحية','البحث العلمي وسماء المعرفة'],signal:['الإشارة','المرصد والإشارة'],
  radio:['إذاعة نقطة نور','البث الصوتي من الشام'],tv:['نقطة نور المرئية','البث المرئي'],
  media:['الإشارة','المرصد والإشارة والوسائط'],projects:['المشاريع','مشاريع LuxDot والبناء'],
  engineering:['الهندسة','المشاريع والهندسة'],language:['اللغة','تغيير اللغة'],
  info:['التعريف','تعريف LuxDot'],correct:['تصحيح','تصحيح معلومة أو مصدر'],
  challenge:['اعتراض','اعتراض منهجي على استنتاج أو فرضية'],report:['تبليغ','إبلاغ عن خلل أو رابط أو مشكلة'],
  certificate:['الشهادة','الشهادة أو التقرير'],atlas:['الأطلس','الخرائط والأطالس'],
  knowledge:['شبكة المعرفة','العلاقات بين العقد'],investigation:['البحث والتقصي','فحص الأدلة والمصادر'],
  calendar:['الرزنامة','هوية اليوم والوقت'],livingBook:['الكتاب الحي','الكتاب الحي'],
  creativity:['الإبداع','الأفكار والابتكار']
 },
 en:{
  home:['Home','Home'],library:['Library','Library and books'],faith:['Traditions & Faiths','Faiths and traditions'],
  memory:['Memory','Living memory'],research:['Live Research','Science and research observatory'],signal:['Signal','Observatory and signal'],
  radio:['LuxDot Radio','Live audio from Chaam'],tv:['LuxDot TV','Visual channel'],media:['Signal','Signal and media'],
  projects:['Projects','LuxDot projects'],engineering:['Engineering','Engineering projects'],language:['Language','Change language'],
  info:['About','About LuxDot'],correct:['Correct','Correct a claim or source'],challenge:['Challenge','Challenge an inference'],
  report:['Report','Report a bug or broken link'],certificate:['Certificate','Certificate or report'],atlas:['Atlas','Maps and atlases'],
  knowledge:['Knowledge Network','Connected knowledge'],investigation:['Research','Evidence investigation'],
  calendar:['Calendar','Today and time'],livingBook:['Living Book','The Living Book'],creativity:['Creativity','Ideas and innovation']
 }
};
function lang(){return (new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'ar').toLowerCase()}
function tx(k){return (A[lang()]||A.en)[k]||(A.en[k]||[k,k])}
function keyFromHref(href){
 const p=(href||'').split('?')[0].split('#')[0],f=p.split('/').pop();
 const m={'index.html':'home','home.html':'home','library.html':'library','faith.html':'faith','memory.html':'memory',
 'research.html':'research','radio.html':'radio','tv.html':'tv','media.html':'media','projects.html':'projects',
 'calendar.html':'calendar','world-calendar.html':'calendar','knowledge-graph.html':'knowledge','visual-library.html':'atlas',
 'what-is-luxdot.html':'info'};
 return m[f]||null;
}
function iconHTML(key,label,desc){
 const src=BASE+(I[key]||I.info);
 return `<img class="lux-color-icon" src="${src}" alt="" aria-hidden="true"><span class="lux-symbol-tooltip" role="tooltip"><b>${label}</b><small>${desc}</small></span>`;
}
function decorateHeader(){
 document.querySelectorAll('.lux-main-nav a, header nav a, .site-header nav a').forEach(a=>{
  const key=keyFromHref(a.getAttribute('href'));if(!key)return;
  const [label,desc]=tx(key);a.classList.add('lux-symbol-nav','lux-color-nav');
  a.setAttribute('aria-label',label);a.setAttribute('title',label);a.innerHTML=iconHTML(key,label,desc);
 });
 document.querySelectorAll('[data-lang-switch],.language-switcher,.lang-switcher,button[aria-label*="language" i]').forEach(b=>{
  const [label,desc]=tx('language');b.classList.add('lux-symbol-nav','lux-color-nav','lux-symbol-control');
  b.setAttribute('aria-label',label);b.setAttribute('title',label);b.innerHTML=iconHTML('language',label,desc);
 });
}
function addUtilityStrip(){
 if(document.querySelector('.lux-symbol-utility-strip'))return;
 const host=document.querySelector('header,.lux-header,.site-header')||document.body;
 const strip=document.createElement('div');strip.className='lux-symbol-utility-strip';
 const items=[['info','what-is-luxdot.html'],['challenge','corrections.html#challenge'],['correct','corrections.html#correct'],['report','corrections.html#report']];
 strip.innerHTML=items.map(([k,href])=>{const [label,desc]=tx(k);return `<a class="lux-symbol-nav lux-color-nav" href="${href}" aria-label="${label}" title="${label}">${iconHTML(k,label,desc)}</a>`}).join('');
 host.appendChild(strip);
}
function boot(){decorateHeader();addUtilityStrip()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
