
/* LuxDot Knowledge Experience v4.15.0 */
(()=> {
 const LABELS={
  ar:{std:"معيار البحث · PREVIEW",ev:"الأدلة",rel:"العقد المرتبطة",rep:"تقرير تنفيذي",chall:"اعترض/صحّح",graph:"الخريطة",nr:"غير مُراجع",sources:"مصادر خارجية",connections:"روابط داخلية",confidence:"الثقة",none:"غير مُسندة",
      inferred:"تصنيف المصادر أدناه اقتراح آلي للمراجعة، وليس حكماً نهائياً.",challengeTitle:"اعتراض بحثي منظم",type:"نوع الاعتراض",claim:"ما النقطة التي تعترض عليها؟",evidence:"مصدر/دليل بديل",reason:"اشرح التصحيح أو التفسير البديل",export:"تنزيل الاعتراض JSON",copy:"نسخ الاعتراض",close:"إغلاق"},
  en:{std:"Research Standard · PREVIEW",ev:"Evidence",rel:"Related nodes",rep:"Executive report",chall:"Challenge",graph:"Graph",nr:"Not reviewed",sources:"External sources",connections:"Internal links",confidence:"Confidence",none:"Not assigned",
      inferred:"Source classes below are automated suggestions for review, not final judgments.",challengeTitle:"Structured research challenge",type:"Challenge type",claim:"What point are you challenging?",evidence:"Alternative source/evidence",reason:"Explain the correction or alternative",export:"Download challenge JSON",copy:"Copy challenge",close:"Close"},
  nl:{std:"Onderzoeksstandaard · PREVIEW",ev:"Bewijs",rel:"Verwante knopen",rep:"Samenvatting",chall:"Daag onderzoek uit",graph:"Netwerk",nr:"Niet beoordeeld",sources:"Externe bronnen",connections:"Interne links",confidence:"Vertrouwen",none:"Niet toegekend",
      inferred:"Bronklassen hieronder zijn automatische suggesties, geen definitief oordeel.",challengeTitle:"Gestructureerde onderzoeksreactie",type:"Type bezwaar",claim:"Welk punt betwist je?",evidence:"Alternatieve bron/bewijs",reason:"Leg correctie of alternatief uit",export:"Download bezwaar JSON",copy:"Kopieer bezwaar",close:"Sluiten"}
 };
 const more={he:"en",jv:"en",id:"en",fr:"en",es:"en",de:"en",tr:"en"};
 function lang(){const q=new URLSearchParams(location.search).get("lang");return (q||document.documentElement.lang||localStorage.getItem("luxdot.lang")||"en").slice(0,2)}
 function L(){const k=lang();return LABELS[k]||LABELS[more[k]]||LABELS.en}
 function path(){return decodeURIComponent(location.pathname.split("/").filter(Boolean).pop()||"index.html")}
 async function json(url){try{const r=await fetch(url+"?v=4150",{cache:"no-store"});return r.ok?await r.json():null}catch(e){return null}}
 function externalLinks(){
  return [...document.querySelectorAll('a[href^="http://"],a[href^="https://"]')].map(a=>({url:a.href,label:(a.textContent||a.href).trim()}))
 }
 async function digest(s){const b=new TextEncoder().encode(s);const h=await crypto.subtle.digest("SHA-256",b);return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,"0")).join("")}
 function textTitle(){return (document.querySelector("h1")?.textContent||document.title||path()).trim()}
 function intro(){const p=[...document.querySelectorAll("main p")].find(x=>x.textContent.trim().length>60);return p?.textContent.trim()||""}
 function headings(){return [...document.querySelectorAll("main h2")].map(x=>x.textContent.trim()).filter(Boolean).slice(0,18)}
 function esc(s){return String(s||"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
 async function generateReport(meta){
   const build=await json((location.pathname.includes("/research/")?"../":"")+"build-meta.json");
   const now=new Date();
   const stamp=new Intl.DateTimeFormat(lang()==="ar"?"ar":"en",{dateStyle:"full",timeStyle:"long",timeZone:"Europe/Amsterdam"}).format(now);
   const seed=[textTitle(),location.href,build?.version||"unknown",now.toISOString()].join("|");
   const fp=(await digest(seed)).toUpperCase();
   const src=externalLinks();
   const related=meta?.related||[];
   const hs=headings();
   const w=window.open("","_blank");
   if(!w){alert("Popup blocked");return}
   const rtl=lang()==="ar"||lang()==="he";
   const sourceHtml=src.slice(0,30).map((s,i)=>`<li>${i+1}. ${esc(s.label)}<br><small>${esc(s.url)}</small></li>`).join("");
   const relHtml=related.map(x=>`<li>${esc(x.title)}</li>`).join("");
   const hHtml=hs.map(x=>`<li>${esc(x)}</li>`).join("");
   w.document.write(`<!doctype html><html lang="${esc(lang())}" dir="${rtl?"rtl":"ltr"}"><head><meta charset="utf-8"><title>${esc(textTitle())} · LuxDot report</title>
   <style>
   @page{size:A4;margin:16mm 16mm 20mm}*{box-sizing:border-box}body{font:14px/1.7 Arial,sans-serif;color:#101410;margin:0}h1{font-size:28px;line-height:1.25}h2{font-size:18px;margin-top:24px;border-bottom:1px solid #bbb;padding-bottom:5px}.meta{border:1px solid #bbb;padding:10px 12px;border-radius:10px;font-size:11px}.fp{font-family:monospace;overflow-wrap:anywhere}.note{background:#f4f5f2;padding:10px;border-inline-start:3px solid #777}.footer{position:fixed;bottom:4mm;left:16mm;right:16mm;font-size:9px;border-top:1px solid #aaa;padding-top:3px;display:flex;justify-content:space-between}.footer .fp{max-width:72%}small{font-size:10px;overflow-wrap:anywhere}li{margin-bottom:5px}
   </style></head><body>
   <h1>${esc(textTitle())}</h1>
   <div class="meta"><b>LuxDot Executive Research Snapshot</b><br>Version: ${esc(build?.version||"unknown")} · Generated: ${esc(stamp)}<br>Source URL: ${esc(location.href)}<br>Research status: ${esc(meta?.review_status||"not-reviewed")} · Confidence: ${esc(meta?.confidence||"not-assigned")}<br><span class="fp">Fingerprint: SHA-256 ${fp}</span></div>
   <h2>Executive summary</h2><p>${esc(intro())}</p>
   <div class="note">This report is a timestamped snapshot generated from a living LuxDot research node. The live node may change after this report is printed.</div>
   <h2>Research structure</h2><ul>${hHtml||"<li>No structured sections detected.</li>"}</ul>
   <h2>External source inventory</h2><ul>${sourceHtml||"<li>No external links detected in the current rendered node.</li>"}</ul>
   <h2>Related LuxDot nodes</h2><ul>${relHtml||"<li>No direct related nodes detected.</li>"}</ul>
   <h2>Method status</h2><p>LuxDot Research Standard is in PREVIEW mode. This snapshot does not certify the research or assign an automated truth score.</p>
   <div class="footer"><span>LuxDot · living research snapshot</span><span class="fp">${fp.slice(0,24)}…</span></div>
   <script>setTimeout(()=>window.print(),250)<\/script>
   </body></html>`);
   w.document.close();
 }
 function download(obj,name){const b=new Blob([JSON.stringify(obj,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
 function copy(obj){navigator.clipboard?.writeText(JSON.stringify(obj,null,2))}
 async function init(){
   const prefix=location.pathname.includes("/research/")?"../":"";
   const [manifest,inventory]=await Promise.all([json(prefix+"research-manifest.json"),json(prefix+"source-inventory.json")]);
   const key=location.pathname.includes("/research/")?"research/"+path():path();
   const meta=manifest?.[key]||{review_status:"not-reviewed",confidence:"not-assigned",external_sources:externalLinks().length,internal_connections:0,related:[]};
   const inv=inventory?.[key]||externalLinks().map(x=>({url:x.url,class_suggestion:"E? · research lead / external"}));
   if(document.getElementById("luxResearchStandardDock"))return;
   const l=L(),dock=document.createElement("aside");dock.id="luxResearchStandardDock";
   dock.innerHTML=`<div class="lrx-top"><span class="lrx-brand">${l.std}</span><span class="lrx-status">${l.nr}</span>
     <button class="lrx-btn" data-open="evidence">${l.ev}</button><button class="lrx-btn" data-open="related">${l.rel}</button>
     <button class="lrx-btn" data-report>${l.rep}</button><button class="lrx-btn" data-open="challenge">${l.chall}</button>
     <a class="lrx-btn" href="${prefix}knowledge-graph.html?focus=${encodeURIComponent(key)}&lang=${encodeURIComponent(lang())}">${l.graph}</a></div>
     <div id="luxEvidencePanel"><div class="lrx-grid">
       <div class="lrx-metric"><b>${l.sources}</b><span>${meta.external_sources??inv.length}</span></div>
       <div class="lrx-metric"><b>${l.connections}</b><span>${meta.internal_connections??0}</span></div>
       <div class="lrx-metric"><b>${l.confidence}</b><span>${l.none}</span></div></div>
       <p class="lrx-warning">${l.inferred}</p><div class="lrx-list">${inv.slice(0,24).map(s=>`<a target="_blank" rel="noopener" href="${esc(s.url)}"><b>${esc(s.class_suggestion)}</b><br>${esc(s.url)}</a>`).join("")||"<span class='lrx-warning'>No external sources detected.</span>"}</div></div>
     <div id="luxRelatedPanel"><div class="lrx-list">${(meta.related||[]).map(x=>`<a href="${prefix}${encodeURI(x.id)}?lang=${encodeURIComponent(lang())}">${esc(x.title)}</a>`).join("")||"<span class='lrx-warning'>No direct graph links detected.</span>"}</div></div>
     <div id="luxChallengePanel"><b>${l.challengeTitle}</b><p class="lrx-warning">No challenge is published automatically. Export it and send it through the contact channel you choose.</p>
       <div class="lrx-challenge-fields"><select data-c-type><option>source correction</option><option>counter-evidence</option><option>alternative explanation</option><option>translation/terminology</option><option>factual correction</option></select>
       <input data-c-claim placeholder="${esc(l.claim)}"><input data-c-evidence placeholder="${esc(l.evidence)}"><textarea data-c-reason placeholder="${esc(l.reason)}"></textarea>
       <div><button class="lrx-btn" data-c-export>${l.export}</button> <button class="lrx-btn" data-c-copy>${l.copy}</button></div></div></div>`;
   const main=document.querySelector("main");(main?.parentNode||document.body).insertBefore(dock,main||document.body.firstChild);
   dock.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>{const v=b.dataset.open;dock.dataset.open=dock.dataset.open===v?"":v}));
   dock.querySelector("[data-report]")?.addEventListener("click",()=>generateReport(meta));
   function challenge(){
      return {schema:"LuxDot Research Challenge v0.1",node:key,title:textTitle(),url:location.href,created_at:new Date().toISOString(),
       type:dock.querySelector("[data-c-type]").value,claim:dock.querySelector("[data-c-claim]").value,evidence:dock.querySelector("[data-c-evidence]").value,reason:dock.querySelector("[data-c-reason]").value,
       note:"User-submitted challenge; not verified or published by LuxDot automatically."}
   }
   dock.querySelector("[data-c-export]")?.addEventListener("click",()=>download(challenge(),"luxdot-challenge-"+path().replace(/\.html$/,"")+".json"));
   dock.querySelector("[data-c-copy]")?.addEventListener("click",()=>copy(challenge()));
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();