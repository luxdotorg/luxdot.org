(() => {
  const raw = window.LUXDOT_SUPABASE || {};
  const base = String(raw.url || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/i, '');
  const key = String(raw.anonKey || '').trim();
  const ok = /^https:\/\/[^/]+\.supabase\.co$/i.test(base) && !!key && !key.includes('PASTE_');
  window.LuxHarm = { configured: ok, baseUrl: base };
  const headers=(extra={})=>({apikey:key,Authorization:`Bearer ${key}`,...extra});
  const esc=s=>(s??'').toString().replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const code=()=>`CHAAM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const uuid=()=>crypto.randomUUID();
  async function api(path, options={}){
    if(!ok) throw new Error('إعداد Supabase غير صحيح. تأكد من Project URL وPublishable Key.');
    const res=await fetch(`${base}${path}`,options);
    if(!res.ok){let detail='';try{const j=await res.json();detail=j.message||j.error_description||j.error||JSON.stringify(j)}catch{detail=await res.text()}if(/row-level security/i.test(detail)&&path.includes('/harm_reports'))throw new Error('لا يمكن قبول البلاغ. تأكد من التقاط موقع حديث ودقيق وأنت داخل حدود بلدية Alphen-Chaam.');throw new Error(`${res.status} ${res.statusText}${detail?': '+detail:''}`)}
    if(res.status===204)return null; const text=await res.text(); return text?JSON.parse(text):null;
  }
  async function testConnection(){
    await api('/rest/v1/harm_reports?select=id&limit=1',{headers:headers()});
    return true;
  }
  async function submitReport(form,statusEl){
    try{
      statusEl.textContent='جاري الاتصال بقاعدة البيانات…';
      const id=uuid(), public_code=code(), fd=new FormData(form);
      const categories=[...form.querySelectorAll('input[name="categories"]:checked')].map(x=>x.value);
      const report={id,public_code,title:String(fd.get('title')||'').trim(),description:String(fd.get('description')||'').trim(),categories,risk_level:fd.get('risk_level')||'normal',latitude:fd.get('latitude')?Number(fd.get('latitude')):null,longitude:fd.get('longitude')?Number(fd.get('longitude')):null,location_accuracy_m:fd.get('location_accuracy_m')?Number(fd.get('location_accuracy_m')):null,location_captured_at:fd.get('location_captured_at')||null,location_text:fd.get('location_text')||null,reporter_name:fd.get('reporter_name')||null,reporter_email:fd.get('reporter_email')||null,reporter_phone:fd.get('reporter_phone')||null,reporter_consent:fd.get('consent')==='on'};
      if(!report.title||!report.description||!report.reporter_consent)throw new Error('يرجى تعبئة العنوان والوصف والموافقة على سياسة الإرسال.');
      const locationAge=report.location_captured_at?Date.now()-Date.parse(report.location_captured_at):Infinity;
      if(!Number.isFinite(report.latitude)||!Number.isFinite(report.longitude)||!Number.isFinite(report.location_accuracy_m)||report.location_accuracy_m>500||locationAge<0||locationAge>5*60*1000)throw new Error('يجب التحقق من موقعك الحالي بدقة عبر الزر قبل إرسال البلاغ.');
      await api('/rest/v1/harm_reports',{method:'POST',headers:headers({'Content-Type':'application/json','Prefer':'return=minimal'}),body:JSON.stringify(report)});
      const files=[...form.querySelector('input[type=file]').files].slice(0,6);
      for(let i=0;i<files.length;i++){
        const f=files[i]; if(f.size>10*1024*1024)throw new Error(`الصورة ${f.name} أكبر من 10MB`);
        statusEl.textContent=`تم حفظ البلاغ. جاري رفع الصورة ${i+1}/${files.length}…`;
        const ext=(f.name.split('.').pop()||'jpg').toLowerCase(), path=`incoming/${id}/${uuid()}.${ext}`;
        await api(`/storage/v1/object/harm-private/${path}`,{method:'POST',headers:headers({'Content-Type':f.type||'application/octet-stream','x-upsert':'false'}),body:f});
        await api('/rest/v1/harm_report_images',{method:'POST',headers:headers({'Content-Type':'application/json','Prefer':'return=minimal'}),body:JSON.stringify({report_id:id,phase:'before',private_path:path,published:false})});
      }
      form.reset(); const gpsText=document.getElementById('gpsText');if(gpsText)gpsText.textContent='لم يتم التحقق من الموقع بعد.';statusEl.innerHTML=`✅ تم تسجيل البلاغ بنجاح. رقم المتابعة: <b>${esc(public_code)}</b>`;
    }catch(e){console.error('[LuxDot Harm]',e);statusEl.textContent='❌ تعذر إرسال البلاغ: '+(e.message||e)}
  }
  async function published(){return await api('/rest/v1/harm_reports?select=*&published=eq.true&order=created_at.desc',{headers:headers()})||[]}
  async function images(reportId){const rows=await api(`/rest/v1/harm_report_images?select=*&report_id=eq.${encodeURIComponent(reportId)}&published=eq.true`,{headers:headers()})||[];return rows.map(x=>({...x,url:x.public_path?`${base}/storage/v1/object/public/harm-public/${x.public_path}`:null}))}
  if(ok && window.supabase?.createClient){try{window.LuxHarm.sb=window.supabase.createClient(base,key,{auth:{persistSession:true,autoRefreshToken:true}})}catch(e){console.warn('[LuxDot Harm] Supabase SDK unavailable; public form will use REST.',e)}}
  Object.assign(window.LuxHarm,{submitReport,published,images,testConnection,esc});
})();
