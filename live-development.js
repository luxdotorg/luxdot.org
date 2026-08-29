/* LuxDot live development status · deployment-aware · v4.16.7 */
(()=> {
  const REPO="luxdotorg/luxdot.org";
  const RAW_META="https://raw.githubusercontent.com/luxdotorg/luxdot.org/main/build-meta.json";

  async function getJSON(url){
    try{
      const sep=url.includes("?")?"&":"?";
      const r=await fetch(url+sep+"ts="+Date.now(),{cache:"no-store",headers:{"Cache-Control":"no-cache"}});
      if(r.ok)return await r.json();
    }catch(e){}
    return null;
  }
  async function localMeta(){ return getJSON("/build-meta.json"); }
  async function repoMeta(){ return getJSON(RAW_META); }
  async function githubHead(){
    try{
      const r=await fetch("https://api.github.com/repos/"+REPO+"/commits?per_page=1&ts="+Date.now(),{
        cache:"no-store",headers:{"Accept":"application/vnd.github+json","Cache-Control":"no-cache"}
      });
      if(!r.ok)return null;
      const j=await r.json(); if(!j[0])return null;
      return {sha:j[0].sha.slice(0,8),date:j[0].commit.committer.date,message:j[0].commit.message.split("\n")[0],url:j[0].html_url};
    }catch(e){return null}
  }
  function nums(v){return String(v||"0").replace(/^v/,"").split(".").map(x=>parseInt(x,10)||0)}
  function cmp(a,b){const A=nums(a),B=nums(b);for(let i=0;i<Math.max(A.length,B.length);i++){const d=(A[i]||0)-(B[i]||0);if(d)return d}return 0}
  function fmt(d){try{return new Intl.DateTimeFormat((document.documentElement.lang||"ar")==="ar"?"ar":"en",{dateStyle:"medium",timeStyle:"short",timeZone:"Europe/Amsterdam"}).format(new Date(d))}catch(e){return d}}

  function addKidsGalaxyHomeCard(){
    const p=(location.pathname||'').replace(/\/+$/,'');
    if(!(p==='/home.html'||p==='/home'||p===''))return;
    if(document.getElementById('luxdotKidsGalaxyCard'))return;
    const cards=document.querySelector('main .cards');
    if(!cards)return;
    const a=document.createElement('a');
    a.id='luxdotKidsGalaxyCard';
    a.className='card lux-home-native';
    a.href='kids-galaxy.html';
    a.setAttribute('aria-label','مجرة الأطفال · Kids Galaxy');
    a.style.cssText='position:relative;overflow:hidden;border:1px solid rgba(255,216,120,.55);background:linear-gradient(135deg,rgba(255,232,244,.96),rgba(225,245,255,.96) 52%,rgba(238,230,255,.96));color:#21313e;box-shadow:0 14px 34px rgba(46,73,95,.12)';
    a.innerHTML='<span aria-hidden="true" style="position:absolute;inset:auto -22px -28px auto;width:110px;height:110px;border-radius:50%;background:rgba(180,245,171,.55)"></span><small style="position:relative;color:#7a4db5;letter-spacing:.1em;font-weight:800">NEW · KIDS GALAXY 🌟</small><h2 style="position:relative;margin:.38em 0;color:#263746">مجرة الأطفال · Kids Galaxy</h2><p style="position:relative;color:#526673">🎵 أغاني · 🎬 كرتون · 🌱 أخلاق ومشاعر · 🌍 اكتشاف · 📚 قصص</p>';
    cards.prepend(a);
  }

  async function run(){
    addKidsGalaxyHomeCard();
    const [local,repo,head]=await Promise.all([localMeta(),repoMeta(),githubHead()]);
    const mismatch=!!(local&&repo&&cmp(local.version,repo.version)!==0);
    const newest=!local?repo:(!repo?local:(cmp(repo.version,local.version)>=0?repo:local));
    window.LuxDotBuild={meta:newest,deployment:local,repository:repo,github:head,mismatch};

    const badge=document.getElementById("luxdotVersionBadge");
    if(badge){
      badge.textContent=newest?.version?`LuxDot · v${newest.version}`:"LuxDot · live";
      badge.title=mismatch
        ? `Production ${local?.version||"?"} · main ${repo?.version||"?"}`
        : `LuxDot ${newest?.version||"live"}`;
      badge.dataset.deployMismatch=mismatch?"true":"false";
      if(mismatch) badge.style.borderColor="rgba(240,179,106,.55)";
    }

    const box=document.getElementById("liveBuild");
    if(box){
      const ar=(document.documentElement.lang||"ar")==="ar";
      if(newest){
        const c=newest.counts||{};
        const base=ar
          ? `<b>حالة LuxDot الحيّة</b> · أحدث نسخة معروفة <b>v${newest.version}</b> · ${newest.build_time?`بُنيت ${fmt(newest.build_time)} · `:""}${c.html||"?"} صفحة · ${c.js||"?"} ملف JS`
          : `<b>Live LuxDot status</b> · newest known <b>v${newest.version}</b> · ${newest.build_time?`built ${fmt(newest.build_time)} · `:""}${c.html||"?"} pages · ${c.js||"?"} JS files`;

        const deploy=local?`v${local.version}`:"?";
        const source=repo?`v${repo.version}`:"?";
        const status=mismatch
          ? (ar
            ? `<div style="margin-top:8px;color:#f0b36a"><b>تنبيه نشر:</b> الإنتاج يعرض ${deploy} بينما main يحتوي ${source}. الـdeployment أو الكاش متأخر.</div>`
            : `<div style="margin-top:8px;color:#f0b36a"><b>Deploy warning:</b> production is ${deploy}, while main contains ${source}. Deployment/cache is behind.</div>`)
          : (local&&repo
            ? (ar
              ? `<div style="margin-top:8px;color:#9fd3aa">✓ الإنتاج وmain متزامنان على ${deploy}</div>`
              : `<div style="margin-top:8px;color:#9fd3aa">✓ production and main are synced at ${deploy}</div>`)
            : "");

        const commit=head?` · <a href="${head.url}" target="_blank" rel="noopener">${head.sha}</a>`:"";
        box.innerHTML=base+commit+status;
      } else {
        box.textContent=ar?"تعذر قراءة حالة النسخة حالياً.":"Unable to read build status.";
      }
    }

    document.documentElement.dataset.luxVersion=newest?.version||"unknown";
    document.dispatchEvent(new CustomEvent("luxdotbuild",{detail:window.LuxDotBuild}));
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true}); else run();
})();