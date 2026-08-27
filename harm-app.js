(() => {
  const cfg = window.LUXDOT_SUPABASE || {};
  const ok = cfg.url && cfg.anonKey && !cfg.url.includes('PASTE_') && !cfg.anonKey.includes('PASTE_');
  window.LuxHarm = { configured: ok };
  if (!ok || !window.supabase?.createClient) return;
  const sb = window.supabase.createClient(cfg.url, cfg.anonKey, {auth:{persistSession:true,autoRefreshToken:true}});
  window.LuxHarm.sb = sb;
  const esc=s=>(s??'').toString().replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const code=()=>`CHAAM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const uuid=()=>crypto.randomUUID();
  async function submitReport(form, statusEl){
    try{
      statusEl.textContent='جاري حفظ البلاغ…';
      const id=uuid(), public_code=code();
      const categories=[...form.querySelectorAll('input[name="categories"]:checked')].map(x=>x.value);
      const fd=new FormData(form);
      const report={id,public_code,title:fd.get('title').trim(),description:fd.get('description').trim(),categories,risk_level:fd.get('risk_level'),latitude:fd.get('latitude')?Number(fd.get('latitude')):null,longitude:fd.get('longitude')?Number(fd.get('longitude')):null,location_text:fd.get('location_text')||null,reporter_name:fd.get('reporter_name')||null,reporter_email:fd.get('reporter_email')||null,reporter_phone:fd.get('reporter_phone')||null,reporter_consent:fd.get('consent')==='on'};
      if(!report.title||!report.description||!report.reporter_consent) throw new Error('يرجى تعبئة العنوان والوصف والموافقة على سياسة الإرسال.');
      const {error}=await sb.from('harm_reports').insert(report); if(error) throw error;
      const files=[...form.querySelector('input[type=file]').files].slice(0,6);
      for(const f of files){
        if(f.size>10*1024*1024) throw new Error(`الصورة ${f.name} أكبر من 10MB`);
        const ext=(f.name.split('.').pop()||'jpg').toLowerCase(); const path=`incoming/${id}/${uuid()}.${ext}`;
        const up=await sb.storage.from('harm-private').upload(path,f,{contentType:f.type,upsert:false}); if(up.error) throw up.error;
        const im=await sb.from('harm_report_images').insert({report_id:id,phase:'before',private_path:path,published:false}); if(im.error) throw im.error;
      }
      form.reset(); statusEl.innerHTML=`تم تسجيل البلاغ بنجاح. رقم المتابعة: <b>${esc(public_code)}</b>`;
    }catch(e){console.error(e);statusEl.textContent='تعذر إرسال البلاغ: '+(e.message||e)}
  }
  async function published(){const {data,error}=await sb.from('harm_reports').select('*').eq('published',true).order('created_at',{ascending:false});if(error)throw error;return data||[]}
  async function images(reportId){const {data,error}=await sb.from('harm_report_images').select('*').eq('report_id',reportId).eq('published',true);if(error)throw error;return (data||[]).map(x=>({...x,url:x.public_path?sb.storage.from('harm-public').getPublicUrl(x.public_path).data.publicUrl:null}))}
  Object.assign(window.LuxHarm,{submitReport,published,images,esc});
})();