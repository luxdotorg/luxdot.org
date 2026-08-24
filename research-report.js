(()=>{'use strict';
const FILE=(location.pathname.split('/').pop()||'').toLowerCase();
const RESEARCH=new Set(["1127-watch.html", "abraham-maimonides-sufi-bridge.html", "abulafia-comparative-lab.html", "abulafia-letters-names.html", "african-association.html", "alphen-before-alphen.html", "border-chapels-route.html", "burckhardt.html", "burial-settlement-layers.html", "chaam-deep-history.html", "chaam-genealogy.html", "chaam-midwives.html", "chosen-balance.html", "chosen-falsification.html", "chosen-hypothesis.html", "christian-apocalyptic-numbers-newton.html", "druze-hikma.html", "egyptology.html", "erasmus.html", "everyday-good.html", "gematria-method-lab.html", "genetics-memory-hypothesis.html", "grote-kerk-north-transept.html", "hallaj.html", "hank-raamsdonk-war-memory.html", "hendrick-busman.html", "history-galaxy.html", "hoogstraten.html", "hurufism-fazlallah-nasimi.html", "ibn-arabi-abulafia-comparison.html", "jafr-ilm-huruf.html", "jan-van-velthoven.html", "jansen-de-koning-network.html", "janssen-family.html", "java-script.html", "jewish-research-center.html", "jewish-source-ladder.html", "jochem-van-velthoven.html", "joseph-karo.html", "karo-decision-method.html", "kees-van-wanrooij.html", "kevelaer-chaam-timeline.html", "knowledge-laws-galaxy.html", "laws-principles-atlas.html", "library.html", "luria-vital-redemption.html", "mahdi-matrix.html", "maimonides-letters-numbers.html", "maimonides-messiah-test.html", "maimonides.html", "memory.html", "messianic-method-comparison.html", "messianic-names-numbers-atlas.html", "name-date-matrix.html", "ovadia-yosef.html", "paulina-withagen-rescue.html", "pet-goat-apocalypse-media.html", "polleke-mummy-cat.html", "prewriting-history.html", "prince-claus-bridge.html", "projects.html", "psychoactive-substances.html", "quantum-entanglement.html", "red-heifer.html", "reiderland-live.html", "sabbatai-nathan-test.html", "sacred-120km-network.html", "safed-kabbalah-messianism.html", "savior-atlas.html", "science-galaxy.html", "sepharad-diaspora.html", "sephardic-continuity-ovadia-yitzhak.html", "sephardic-halakha.html", "shaam-brabant-network.html", "shaam-breda.html", "talmud-messiah.html", "templars-master.html", "ter-brake-cadastral-investigation.html", "thijs-loss-consolation.html", "urania-nassau.html", "van-velthoven-family.html", "van-velthoven-grote-kerk.html", "verwithagen-erasmus.html", "war-reconstruction-memory.html", "west-brabant-family-memory-network.html", "willibrord-echternach.html", "withagen-chaam-toponym.html", "withagen-family.html", "withagen-jansen-dekoning.html", "withagen-van-den-boom.html", "withagen-wwii.html", "yitzhak-yosef.html"]);
if(!RESEARCH.has(FILE)&&!document.querySelector('[data-luxdot-research]'))return;
function clean(s){return (s||'').replace(/\s+/g,' ').trim()}
async function sha256(s){if(crypto?.subtle){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase()}let h=2166136261;for(const c of s)h=(h^c.charCodeAt(0))*16777619>>>0;return h.toString(16).toUpperCase().padStart(8,'0')}
async function makeReport(){
 const root=document.querySelector('main,article,[data-luxdot-research]')||document.body;
 const title=clean(document.querySelector('h1')?.innerText||document.title);
 const stamp=new Date();const iso=stamp.toISOString();
 const text=clean(root.innerText).slice(0,90000);
 const links=[...root.querySelectorAll('a[href]')].map(a=>({t:clean(a.innerText),u:a.href})).filter(x=>/^https?:/.test(x.u)).slice(0,80);
 const imgs=[...root.querySelectorAll('img[src]')].map(i=>({src:i.src,alt:i.alt||''})).slice(0,12);
 const fingerprint=await sha256([FILE,title,text,links.map(x=>x.u).join('|'),iso].join('\n'));
 const short=`LD-${FILE.replace(/\.html$/,'').toUpperCase().replace(/[^A-Z0-9]+/g,'-').slice(0,18)}-${iso.slice(0,10).replaceAll('-','')}-${fingerprint.slice(0,12)}`;
 const secs=[...root.querySelectorAll('h2,h3')].map(h=>`<li>${clean(h.innerText)}</li>`).slice(0,35).join('');
 const sourceHtml=links.map((x,i)=>`<li><b>${i+1}.</b> ${x.t||x.u}<br><span>${x.u}</span></li>`).join('');
 const imageHtml=imgs.slice(0,6).map(x=>`<figure><img src="${x.src}" alt=""><figcaption>${clean(x.alt)}</figcaption></figure>`).join('');
 const body=clean(text).split(/(?<=[.!؟])\s+/).slice(0,45).join(' ');
 const w=open('','_blank'); if(!w)return alert('Pop-up blocked');
 w.document.write(`<!doctype html><html lang="${document.documentElement.lang||'ar'}" dir="${document.documentElement.dir||'rtl'}"><head><meta charset="utf-8"><title>${title} · LuxDot Research Report</title><style>
 @page{size:A4;margin:18mm 15mm 19mm}
 *{box-sizing:border-box}body{margin:0;color:#11170f;background:#fff;font:14px/1.75 "Noto Kufi Arabic",Tahoma,Arial,sans-serif}
 .page{max-width:820px;margin:auto;padding:0 4px}.luxhead{border-bottom:3px double #173f29;padding:0 0 12px;margin-bottom:22px;display:flex;justify-content:space-between;align-items:flex-end}
 .mark{font:700 25px/1 "Palatino Linotype","Book Antiqua",Georgia,serif;letter-spacing:.16em;color:#176a43}.mark i{font-style:normal;color:#0d4d30}
 .type{font:600 10px/1.4 "Noto Kufi Arabic",Tahoma,sans-serif;color:#496255;text-align:end}.rule{height:1px;background:#b7c8bd;margin:14px 0}
 h1{font:800 26px/1.5 "Noto Kufi Arabic",Tahoma,sans-serif;margin:0 0 8px;color:#0e291b}h2{font:700 16px/1.6 "Noto Kufi Arabic",Tahoma,sans-serif;margin:24px 0 8px;color:#154f33;border-bottom:1px solid #b9c9be;padding-bottom:5px}
 p,li{font-family:"Noto Kufi Arabic",Tahoma,Arial,sans-serif}.latin,.meta,.sources span{font-family:"Palatino Linotype","Book Antiqua",Georgia,serif}
 .meta{border:1px solid #a9bdb0;border-radius:12px;padding:12px 14px;background:#f8fbf8;font-size:11px;line-height:1.65}
 .fp{font:10px/1.55 "Courier New",monospace;word-break:break-all;color:#31453a}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.grid figure{margin:0;border:1px solid #d5dfd8;padding:6px}.grid img{max-width:100%;max-height:245px;display:block;margin:auto}.grid figcaption{font-size:9px;color:#59675e}
 .sources{font-size:10px;word-break:break-word}.integrity{margin-top:26px;border-top:1px solid #aab9af;padding-top:10px;font-size:10px;color:#4d5b52}
 .fingerprint{margin-top:22px;padding:12px 0;border-top:3px double #173f29;display:grid;grid-template-columns:1fr auto;gap:12px;align-items:end}.fingerprint b{font-size:10px;color:#154f33}.fingerprint code{display:block;font:9px/1.45 "Courier New",monospace;word-break:break-all}.seal{font:700 18px/1 "Palatino Linotype",Georgia,serif;letter-spacing:.12em;color:#176a43}
 .print{margin:20px 0}.print button{border:1px solid #176a43;border-radius:999px;background:#fff;padding:9px 15px}
 @media print{.page{padding:0}.print{display:none}}
 </style></head><body><div class="page">
 <header class="luxhead"><div class="mark"><i>LUX</i>DOT</div><div class="type">LIVING RESEARCH · تقرير بحث حي<br><span class="latin">Evidence · Memory · Connections</span></div></header>
 <h1>${title}</h1><p class="latin">A timestamped LuxDot research snapshot. The living node may be revised as evidence changes.</p>
 <div class="meta"><b>Generated / أُنشئ:</b> ${stamp.toLocaleString()}<br><b>Source / المصدر:</b> ${location.href}<br><b>Snapshot ID:</b> ${short}</div>
 <h2>الملخص التنفيذي · Executive summary</h2><p>${body}</p>
 <h2>بنية البحث · Research structure</h2><ul>${secs}</ul>
 ${imageHtml?`<h2>أدلة بصرية مختارة · Selected visual evidence</h2><div class="grid">${imageHtml}</div>`:''}
 <h2>المصادر الملتقطة · Captured sources</h2><ol class="sources">${sourceHtml}</ol>
 <div class="integrity">هذه البصمة تعرّف نسخة التقرير في لحظة إنشائها؛ لا تعني أن كل الادعاءات داخله متساوية في اليقين. تبقى درجات الأدلة وحالة المراجعة هي المرجع.</div>
 <footer class="fingerprint"><div><b>LUXDOT CONTENT FINGERPRINT · SHA‑256</b><code>${fingerprint}</code><small>${short}</small></div><div class="seal">LUX·DOT</div></footer>
 <p class="print"><button onclick="print()">⎙ طباعة / حفظ PDF</button></p></div></body></html>`);w.document.close();
}
const b=document.createElement('button');b.className='lux-report-btn';b.type='button';b.textContent='⎙ Executive Report';b.title='Generate a time-stamped research snapshot';b.onclick=makeReport;document.body.appendChild(b);
})();
