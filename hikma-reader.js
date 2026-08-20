(()=>{
'use strict';
const DOWNLOAD='https://archive.org/download/rasail-al-hikma/%D8%AC%D9%85%D9%8A%D8%B9%20%D8%B1%D8%B3%D8%A7%D8%A6%D9%84%20%D8%A7%D9%84%D8%AD%D9%83%D9%85%D8%A9_djvu.txt';
const EMBED='https://archive.org/embed/rasail-al-hikma';
let raw='',displayText='',lastQuery='';
const $=s=>document.querySelector(s);

const HMSG={ar:{full:'النص العربي الكامل',notfound:t=>`لم أعثر آلياً على «${t}» في OCR. جرّب البحث بصيغة أقصر.`,near:t=>`موضع تقريبي داخل OCR حول «${t}».`,min:'اكتب حرفين على الأقل للبحث.',hits:n=>`عُثر على ${n} موضعاً.`,none:'لا توجد نتيجة مطابقة حرفياً.',loaded:n=>`تم تحميل النص العربي: ${n} مليون محرف تقريباً. الفهرس آلي وقد يتأثر بأخطاء OCR.`,start:'بداية النسخة الرقمية',autoFail:'تعذر بناء الفهرس الآلي من OCR؛ يبقى البحث والنص الكامل متاحين.',fail:'طبقة OCR غير متاحة حالياً؛ المصوّرة الأصلية متاحة.',result:q=>hm().result(q)},en:{full:'Complete Arabic source',notfound:t=>`“${t}” was not found automatically in the OCR. Try a shorter Arabic term.`,near:t=>`Approximate OCR location around “${t}”.`,min:'Enter at least two characters.',hits:n=>`${n} matching locations found.`,none:'No exact match found.',loaded:n=>`Arabic source loaded: about ${n} million characters. The index is automatic and may reflect OCR errors.`,start:'Beginning of the digital source',autoFail:'The automatic OCR index could not be built; full text and search remain available.',fail:'The OCR layer is unavailable right now; original scans remain available.',result:q=>`Search result: ${q}`},nl:{full:'Volledige Arabische brontekst',notfound:t=>`“${t}” is niet automatisch gevonden in de OCR. Probeer een kortere Arabische zoekterm.`,near:t=>`Geschatte OCR-locatie rond “${t}”.`,min:'Voer minstens twee tekens in.',hits:n=>`${n} overeenkomende locaties gevonden.`,none:'Geen exacte overeenkomst gevonden.',loaded:n=>`Arabische bron geladen: ongeveer ${n} miljoen tekens. De index is automatisch en kan OCR-fouten bevatten.`,start:'Begin van de digitale bron',autoFail:'De automatische OCR-index kon niet worden opgebouwd; volledige tekst en zoeken blijven beschikbaar.',fail:'De OCR-laag is momenteel niet beschikbaar; de originele scans blijven beschikbaar.',result:q=>`Zoekresultaat: ${q}`},he:{full:'המקור הערבי המלא',notfound:t=>`“${t}” לא נמצא אוטומטית ב-OCR. נסה מונח ערבי קצר יותר.`,near:t=>`מיקום OCR משוער סביב “${t}”.`,min:'יש להזין לפחות שני תווים.',hits:n=>`נמצאו ${n} מיקומים תואמים.`,none:'לא נמצאה התאמה מדויקת.',loaded:n=>`המקור הערבי נטען: כ-${n} מיליון תווים. האינדקס אוטומטי ועלול לכלול שגיאות OCR.`,start:'תחילת המקור הדיגיטלי',autoFail:'לא ניתן לבנות את אינדקס ה-OCR האוטומטי; הטקסט המלא והחיפוש זמינים.',fail:'שכבת ה-OCR אינה זמינה כרגע; הסריקות המקוריות זמינות.',result:q=>`תוצאת חיפוש: ${q}`}};
const hlang=()=>{const q=new URLSearchParams(location.search).get('lang'),s=localStorage.getItem('luxdot.lang');return HMSG[q]?q:HMSG[s]?s:'en'};
const hm=()=>HMSG[hlang()];

const esc=s=>s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const clean=s=>s.replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n{4,}/g,'\n\n\n').trim();
function htmlText(txt,q=''){
 let h=esc(txt);
 if(q){const safe=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');try{h=h.replace(new RegExp(safe,'gi'),m=>`<mark>${m}</mark>`)}catch(e){}}
 return h;
}
function showText(txt,title=null,q=''){ title=title||hm().full;
 displayText=txt; $('#sectionTitle').textContent=title;
 const chunks=txt.split(/\n\s*\n+/).map(x=>x.trim()).filter(Boolean);
 $('#hikmaBody').innerHTML=chunks.map(x=>`<div class="hikma-paragraph">${htmlText(x,q)}</div>`).join('');
 $('#hikmaBody').hidden=false; $('#hikmaLoading').hidden=true; $('#hikmaBody').scrollTop=0; $('#textMode').click(); bindParagraphObserver();
}
function contextAt(i,len=6200){const a=Math.max(0,i-700),b=Math.min(raw.length,i+len);return raw.slice(a,b)}
function jump(term){if(!raw)return;const i=raw.indexOf(term);if(i<0){$('#hikmaStatus').textContent=hm().notfound(term);return}showText(contextAt(i),term,term);$('#hikmaStatus').textContent=hm().near(term)}
function search(q){lastQuery=q=q.trim();const box=$('#hikmaResults');box.innerHTML='';if(q.length<2){$('#hikmaStatus').textContent=hm().min;return}let from=0,hits=[];while(hits.length<60){let i=raw.indexOf(q,from);if(i<0)break;hits.push(i);from=i+q.length}$('#hikmaStatus').textContent=hits.length?hm().hits(hits.length+(hits.length===60?'+':'')):hm().none;hits.forEach((i,n)=>{let sn=raw.slice(Math.max(0,i-70),Math.min(raw.length,i+150)).replace(/\s+/g,' ');let b=document.createElement('button');b.className='hikma-hit';b.innerHTML=`<strong>${n+1}</strong> · ${htmlText(sn,q)}`;b.onclick=()=>showText(contextAt(i),hm().result(q),q);box.appendChild(b)})}
function buildAutoIndex(){const dest=$('#autoIndex');dest.innerHTML='';let lines=raw.split('\n');const keys=/^(?:\s*[٠-٩0-9.()\-]*\s*)?(?:رسالة|الرسالة|سجل|السجل|منشور|مكاتبة|تقليد|ميثاق|كتاب|التقديس|دعاء|شعر|شرط)\s+/;let seen=new Set(),items=[];for(let i=0;i<lines.length;i++){let t=lines[i].replace(/[\u200e\u200f\u202a-\u202e]/g,'').trim().replace(/\s+/g,' ');if(t.length<5||t.length>95||!keys.test(t))continue;if(/رقم|صفحة|مقدمة|فهرس/.test(t))continue;let norm=t.replace(/[٠-٩0-9]+/g,'').replace(/[،,:؛.]+$/,'').trim();if(seen.has(norm))continue;seen.add(norm);items.push({t,i});if(items.length>=140)break}
 items.slice(0,111).forEach(it=>{let b=document.createElement('button');b.textContent=it.t;b.onclick=()=>{let pos=raw.indexOf(lines[it.i]);if(pos>=0)showText(contextAt(pos),it.t)};dest.appendChild(b)});
 if(!dest.children.length)dest.textContent=hm().autoFail;
}
let hikmaObs=null;
function bindParagraphObserver(){if(hikmaObs)hikmaObs.disconnect();if(!('IntersectionObserver' in window))return;const ps=[...document.querySelectorAll('.hikma-paragraph')];hikmaObs=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!v)return;ps.forEach(p=>p.classList.remove('current'));v.target.classList.add('current')},{root:null,rootMargin:'-30% 0px -45% 0px',threshold:[.1,.35,.6]});ps.forEach(p=>hikmaObs.observe(p))}
async function load(){if(raw)return;$('#hikmaLoading').hidden=false;try{let r=await fetch(DOWNLOAD,{mode:'cors'});if(!r.ok)throw new Error('HTTP '+r.status);raw=clean(await r.text());if(raw.length<50000)throw new Error('short text');window.__HIKMA_LOADED=true; $('#hikmaStatus').textContent=hm().loaded((raw.length/1000000).toFixed(1));buildAutoIndex();showText(raw.slice(0,90000),hm().start);}catch(e){raw='';$('#hikmaLoading').hidden=true;$('#hikmaBody').hidden=false;$('#hikmaBody').innerHTML='<div class="hikma-note"><strong>تعذر تحميل طبقة OCR مباشرة من المتصفح.</strong><br>يمكنك استخدام تبويب «المصوّرة الأصلية» لقراءة الكتاب كاملاً من Internet Archive. عند توفر الاتصال المتوافق سيعمل النص والبحث تلقائياً.</div>';$('#hikmaStatus').textContent=hm().fail;}}
async function openReader(scroll=true){$('#reader').hidden=false;if(scroll)$('#reader').scrollIntoView({behavior:'smooth',block:'start'});await load()} $('#openReader').addEventListener('click',()=>openReader(true)); setTimeout(()=>openReader(false),0);
$('#hikmaSearch').addEventListener('input',e=>search(e.target.value));document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>jump(b.dataset.jump));
$('#textMode').onclick=()=>{$('#textMode').classList.add('active');$('#scanMode').classList.remove('active');$('#hikmaScan').style.display='none';$('#hikmaBody').style.display='block';$('#hikmaLoading').style.display='none'};
$('#scanMode').onclick=()=>{$('#scanMode').classList.add('active');$('#textMode').classList.remove('active');$('#hikmaBody').style.display='none';$('#hikmaLoading').style.display='none';let f=$('#hikmaScan');if(!f.src)f.src=EMBED;f.style.display='block'};
})();
