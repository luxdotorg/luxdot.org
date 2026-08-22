/* LuxDot live development status · v4.14.7 */
(()=> {
  const REPO="luxdotorg/luxdot.org";
  async function localMeta(){
    try{const r=await fetch("build-meta.json?ts="+Date.now(),{cache:"no-store"}); if(r.ok)return await r.json()}catch(e){}
    return null;
  }
  async function githubHead(){
    try{
      const r=await fetch("https://api.github.com/repos/"+REPO+"/commits?per_page=1",{headers:{"Accept":"application/vnd.github+json"}});
      if(!r.ok)return null; const j=await r.json(); if(!j[0])return null;
      return {sha:j[0].sha.slice(0,8),date:j[0].commit.committer.date,message:j[0].commit.message.split("\n")[0],url:j[0].html_url};
    }catch(e){return null}
  }
  function fmt(d){try{return new Intl.DateTimeFormat(document.documentElement.lang==="ar"?"ar":"en",{dateStyle:"medium",timeStyle:"short",timeZone:"Europe/Amsterdam"}).format(new Date(d))}catch(e){return d}}
  async function run(){
    const [m,g]=await Promise.all([localMeta(),githubHead()]);
    window.LuxDotBuild={meta:m,github:g};
    const box=document.getElementById("liveBuild");
    if(box){
      if(m){
        const ar=(document.documentElement.lang||"ar")==="ar";
        box.innerHTML=ar
          ? `<b>حالة LuxDot الحيّة</b> · النسخة <b>v${m.version}</b> · بُنيت ${fmt(m.build_time)} · ${m.counts.html} صفحة · ${m.counts.js} ملف JS${g?` · آخر commit عام <a href="${g.url}" target="_blank" rel="noopener">${g.sha}</a>`:""}`
          : `<b>Live LuxDot status</b> · v${m.version} · built ${fmt(m.build_time)} · ${m.counts.html} pages · ${m.counts.js} JS files${g?` · public head <a href="${g.url}" target="_blank" rel="noopener">${g.sha}</a>`:""}`;
      }
    }
    document.dispatchEvent(new CustomEvent("luxdotbuild",{detail:{meta:m,github:g}}));
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run,{once:true}); else run();
})();