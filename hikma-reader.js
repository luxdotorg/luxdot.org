(()=>{
'use strict';
const DOWNLOAD='https://archive.org/download/rasail-al-hikma/%D8%AC%D9%85%D9%8A%D8%B9%20%D8%B1%D8%B3%D8%A7%D8%A6%D9%84%20%D8%A7%D9%84%D8%AD%D9%83%D9%85%D8%A9_djvu.txt';
const EMBED='https://archive.org/embed/rasail-al-hikma';
let raw='',displayText='',lastQuery='';
const $=s=>document.querySelector(s);
const esc=s=>s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const clean=s=>s.replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n{4,}/g,'\n\n\n').trim();
function htmlText(txt,q=''){
 let h=esc(txt);
 if(q){const safe=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');try{h=h.replace(new RegExp(safe,'gi'),m=>`<mark>${m}</mark>`)}catch(e){}}
 return h;
}
function showText(txt,title='النص الكامل',q=''){
 displayText=txt; $('#sectionTitle').textContent=title; $('#hikmaBody').innerHTML=htmlText(txt,q); $('#hikmaBody').hidden=false; $('#hikmaLoading').hidden=true; $('#hikmaBody').scrollTop=0;
 $('#textMode').click();
}
function contextAt(i,len=6200){const a=Math.max(0,i-700),b=Math.min(raw.length,i+len);return raw.slice(a,b)}
function jump(term){if(!raw)return;const i=raw.indexOf(term);if(i<0){$('#hikmaStatus').textContent=`لم أعثر آلياً على «${term}» في OCR. جرّب البحث بصيغة أقصر.`;return}showText(contextAt(i),term,term);$('#hikmaStatus').textContent=`موضع تقريبي داخل OCR حول «${term}».`}
function search(q){lastQuery=q=q.trim();const box=$('#hikmaResults');box.innerHTML='';if(q.length<2){$('#hikmaStatus').textContent='اكتب حرفين على الأقل للبحث.';return}let from=0,hits=[];while(hits.length<60){let i=raw.indexOf(q,from);if(i<0)break;hits.push(i);from=i+q.length}$('#hikmaStatus').textContent=hits.length?`عُثر على ${hits.length}${hits.length===60?'+' : ''} موضعاً.`:'لا توجد نتيجة مطابقة حرفياً.';hits.forEach((i,n)=>{let sn=raw.slice(Math.max(0,i-70),Math.min(raw.length,i+150)).replace(/\s+/g,' ');let b=document.createElement('button');b.className='hikma-hit';b.innerHTML=`<strong>${n+1}</strong> · ${htmlText(sn,q)}`;b.onclick=()=>showText(contextAt(i),`نتيجة البحث: ${q}`,q);box.appendChild(b)})}
function buildAutoIndex(){const dest=$('#autoIndex');dest.innerHTML='';let lines=raw.split('\n');const keys=/^(?:\s*[٠-٩0-9.()\-]*\s*)?(?:رسالة|الرسالة|سجل|السجل|منشور|مكاتبة|تقليد|ميثاق|كتاب|التقديس|دعاء|شعر|شرط)\s+/;let seen=new Set(),items=[];for(let i=0;i<lines.length;i++){let t=lines[i].replace(/[\u200e\u200f\u202a-\u202e]/g,'').trim().replace(/\s+/g,' ');if(t.length<5||t.length>95||!keys.test(t))continue;if(/رقم|صفحة|مقدمة|فهرس/.test(t))continue;let norm=t.replace(/[٠-٩0-9]+/g,'').replace(/[،,:؛.]+$/,'').trim();if(seen.has(norm))continue;seen.add(norm);items.push({t,i});if(items.length>=140)break}
 items.slice(0,111).forEach(it=>{let b=document.createElement('button');b.textContent=it.t;b.onclick=()=>{let pos=raw.indexOf(lines[it.i]);if(pos>=0)showText(contextAt(pos),it.t)};dest.appendChild(b)});
 if(!dest.children.length)dest.textContent='تعذر بناء الفهرس الآلي من OCR؛ يبقى البحث والنص الكامل متاحين.';
}
async function load(){if(raw)return;$('#hikmaLoading').hidden=false;try{let r=await fetch(DOWNLOAD,{mode:'cors'});if(!r.ok)throw new Error('HTTP '+r.status);raw=clean(await r.text());if(raw.length<50000)throw new Error('short text');$('#hikmaStatus').textContent=`تم تحميل النص: ${(raw.length/1000000).toFixed(1)} مليون محرف تقريباً. الفهرس آلي وقد يتأثر بأخطاء OCR.`;buildAutoIndex();showText(raw.slice(0,90000),'بداية النسخة الرقمية');}catch(e){raw='';$('#hikmaLoading').hidden=true;$('#hikmaBody').hidden=false;$('#hikmaBody').innerHTML='<div class="hikma-note"><strong>تعذر تحميل طبقة OCR مباشرة من المتصفح.</strong><br>يمكنك استخدام تبويب «المصوّرة الأصلية» لقراءة الكتاب كاملاً من Internet Archive. عند توفر الاتصال المتوافق سيعمل النص والبحث تلقائياً.</div>';$('#hikmaStatus').textContent='طبقة OCR غير متاحة حالياً؛ المصوّرة الأصلية متاحة.';}}
$('#openReader').addEventListener('click',async()=>{$('#reader').hidden=false;$('#reader').scrollIntoView({behavior:'smooth',block:'start'});await load()});
$('#hikmaSearch').addEventListener('input',e=>search(e.target.value));document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>jump(b.dataset.jump));
$('#textMode').onclick=()=>{$('#textMode').classList.add('active');$('#scanMode').classList.remove('active');$('#hikmaScan').style.display='none';$('#hikmaBody').style.display='block';$('#hikmaLoading').style.display='none'};
$('#scanMode').onclick=()=>{$('#scanMode').classList.add('active');$('#textMode').classList.remove('active');$('#hikmaBody').style.display='none';$('#hikmaLoading').style.display='none';let f=$('#hikmaScan');if(!f.src)f.src=EMBED;f.style.display='block'};
})();
