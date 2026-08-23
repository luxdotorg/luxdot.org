
(()=>{
'use strict';
const REPO='https://github.com/luxdotorg/luxdot.org';
const ISSUE=REPO+'/issues/new';
const SEC=REPO+'/security/advisories/new';

function q(s){return encodeURIComponent(String(s||''))}
function lang(){return (new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'ar').toLowerCase()}
const T={
 ar:{btn:'اعترض · صحّح',title:'صحّحنا أو انقض هذه المعلومة',type:'نوع الملاحظة',evidence:'دليل / مصدر مضاد',note:'ملاحظتك',send:'إرسال كمراجعة علنية',security:'إبلاغ أمني خاص',close:'إغلاق',
 types:['تصحيح معلومة','اعتراض على الاستنتاج','مصدر غير كافٍ أو خاطئ','رابط لا يعمل','خلل برمجي','ترجمة / وصول','تعارض أو تكرار','اقتراح تحسين']},
 en:{btn:'Challenge · Correct',title:'Challenge or correct this claim',type:'Issue type',evidence:'Evidence / counter-source',note:'Your note',send:'Submit public review',security:'Private security report',close:'Close',
 types:['Factual correction','Challenge inference','Weak/wrong source','Broken link','Software bug','Translation/accessibility','Conflict/duplicate','Improvement']}
};
function tx(){return T[lang()]||T.en}
function cleanText(el){
 const c=el.cloneNode(true); c.querySelectorAll('.lux-challenge-btn,.lux-challenge-anchor').forEach(x=>x.remove());
 return (c.innerText||c.textContent||'').replace(/\s+/g,' ').trim().slice(0,900);
}
function hash(s){
 let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0).toString(16)
}
function eligible(el){
 if(el.closest('nav,header,footer,.lux-challenge-modal,.lux-main-nav,.rg-detail,.tv-controls,.radio-card button'))return false;
 if(el.matches('script,style,code,pre,a,button,input,textarea,select'))return false;
 const txt=cleanText(el);
 return txt.length>=35;
}
function targetNodes(){
 return [...document.querySelectorAll('main p,main li,main blockquote,main td,main th,article p,article li,article blockquote,.card p,.card li')]
   .filter(eligible);
}
function addButtons(){
 const t=tx();
 targetNodes().forEach(el=>{
   if(el.querySelector(':scope > .lux-challenge-btn'))return;
   const text=cleanText(el),id='claim-'+hash(location.pathname+'|'+text);
   if(!el.id)el.id=id;
   const b=document.createElement('button');b.type='button';b.className='lux-challenge-btn';b.textContent='⚑';
   b.setAttribute('aria-label',t.btn);b.setAttribute('title',t.btn);b.dataset.claim=text;b.dataset.anchor=el.id;
   b.addEventListener('click',e=>{e.stopPropagation();openModal(b.dataset.claim,b.dataset.anchor)});
   el.appendChild(b);
 });
}
function openModal(claim,anchor){
 const t=tx();let m=document.getElementById('luxChallengeModal');
 if(!m){
   m=document.createElement('div');m.id='luxChallengeModal';m.className='lux-challenge-modal';
   m.innerHTML=`<div class="lux-challenge-box" role="dialog" aria-modal="true">
    <button class="lux-challenge-x" aria-label="${t.close}">×</button>
    <h2>${t.title}</h2><div class="lux-claim-preview"></div>
    <label>${t.type}<select class="lux-issue-type">${t.types.map(x=>`<option>${x}</option>`).join('')}</select></label>
    <label>${t.evidence}<input class="lux-evidence" type="url" placeholder="https://…"></label>
    <label>${t.note}<textarea class="lux-note" rows="5"></textarea></label>
    <div class="lux-challenge-actions"><button class="lux-submit-review">${t.send}</button><a class="lux-security-link" target="_blank" rel="noopener">${t.security}</a></div>
    <p class="lux-method-note">LuxDot welcomes falsification. Please provide reproducible evidence, a primary source, or a clear technical reproduction path whenever possible.</p>
   </div>`;
   document.body.appendChild(m);
   m.querySelector('.lux-challenge-x').onclick=()=>m.classList.remove('open');
   m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')});
 }
 m.querySelector('.lux-claim-preview').textContent=claim;
 m.querySelector('.lux-issue-type').selectedIndex=0;m.querySelector('.lux-evidence').value='';m.querySelector('.lux-note').value='';
 m.querySelector('.lux-security-link').href=SEC;
 m.querySelector('.lux-submit-review').onclick=()=>{
   const typ=m.querySelector('.lux-issue-type').value,ev=m.querySelector('.lux-evidence').value.trim(),note=m.querySelector('.lux-note').value.trim();
   const page=location.href.split('#')[0]+'#'+anchor;
   const title=`[Review] ${typ}: ${document.title.slice(0,90)}`;
   const body=`### Type\n${typ}\n\n### Page\n${page}\n\n### Claim / passage\n> ${claim.replace(/\n/g,' ')}\n\n### Evidence or counter-source\n${ev||'(please add)'}\n\n### Reviewer note\n${note||'(please add)'}\n\n### Reproducibility / method\nPlease explain how another reviewer can verify the correction.\n\n---\nSubmitted through LuxDot Challenge Layer.`;
   window.open(`${ISSUE}?title=${q(title)}&body=${q(body)}`,'_blank','noopener');
 };
 m.classList.add('open');
}
function brokenLinkWatcher(){
 document.addEventListener('click',e=>{
   const a=e.target.closest('a[href]'); if(!a)return;
   if(a.href.startsWith('javascript:'))return;
   // normal navigation untouched; the global troubleshooting entry is always available.
 });
}
function addGlobal(){
 if(document.getElementById('luxCorrectionHub'))return;
 const a=document.createElement('a');a.id='luxCorrectionHub';a.href='corrections.html';a.className='lux-correction-hub';
 a.textContent=lang()==='ar'?'⚑ صحّح LuxDot':'⚑ Correct LuxDot';
 document.body.appendChild(a);
}
function boot(){addButtons();addGlobal();brokenLinkWatcher()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
