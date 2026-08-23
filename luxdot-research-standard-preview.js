/* LuxDot Research Standard v0.1 — THEORETICAL PREVIEW ONLY.
   It does not score, audit, classify, or modify existing research. */
window.LuxDotResearchStandard={
 version:"0.1-preview",
 mode:"theoretical-preview",
 statuses:["strongly-supported","probable","open-hypothesis","weak","currently-rejected","not-reviewed"],
 sourceClasses:["A-primary","B-academic","C-reference","D-contemporary-institutional","E-research-lead"],
 createBlank(node={}){
   return {mode:"theoretical-preview",node,question:"",scope:"",claims:[],sources:[],unknowns:[],
     review:{status:"not-enforced",last_reviewed:null,reviewer:null,method_version:"0.1-preview"},
     report_fingerprint:{enabled:false,note:"Reserved for future reviewed reports."}};
 },
 renderPreview(host,data){
   if(!host)return;
   host.innerHTML=`<section class="lux-rs-preview" data-mode="theoretical-preview">
     <div class="lux-rs-head"><b>LuxDot Research Standard · v0.1</b><span>THEORETICAL PREVIEW</span></div>
     <p>هذا المعيار مُهيّأ بنيوياً فقط. لا يعني ظهوره أن هذا البحث خضع للتقييم أو حصل على درجة ثقة.</p>
     <div class="lux-rs-grid">
       <span>السؤال</span><span>المصادر A–E</span><span>الادعاءات</span><span>الدليل المضاد</span>
       <span>البدائل</span><span>قابلية التفنيد</span><span>المجهول</span><span>سجل المراجعة</span>
     </div></section>`;
 }
};