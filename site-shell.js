/* LuxDot v4.3.113 — unified ten-language header + Media/News */
(function(){
'use strict';
const d=document, FILE=()=>location.pathname.split('/').pop().toLowerCase()||'index.html';
if(FILE()==='index.html') return;
const SUP=['ar','en','nl','he','jv','id','fr','es','de','tr'];
const NAMES={ar:'AR',en:'EN',nl:'NL',he:'HE',jv:'JV',id:'ID',fr:'FR',es:'ES',de:'DE',tr:'TR'};
const FULL={ar:'العربية',en:'English',nl:'Nederlands',he:'עברית',jv:'Basa Jawa',id:'Bahasa Indonesia',fr:'Français',es:'Español',de:'Deutsch',tr:'Türkçe'};
const T={
 ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',memory:'الذاكرة',research:'الأبحاث',media:'ميديا / أخبار',projects:'المشاريع'},
 en:{home:'Home',library:'Library',faith:'Faith & Wisdom',memory:'Memory',research:'Research',media:'Media / News',projects:'Projects'},
 nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',memory:'Geheugen',research:'Onderzoek',media:'Media / Nieuws',projects:'Projecten'},
 he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',memory:'זיכרון',research:'מחקר',media:'מדיה / חדשות',projects:'פרויקטים'},
 jv:{home:'Ngarep',library:'Pustaka',faith:'Iman & Kawicaksanan',memory:'Pangeling',research:'Panaliten',media:'Media / Pawarta',projects:'Proyèk'},
 id:{home:'Beranda',library:'Perpustakaan',faith:'Iman & Kebijaksanaan',memory:'Memori',research:'Riset',media:'Media / Berita',projects:'Proyek'},
 fr:{home:'Accueil',library:'Bibliothèque',faith:'Foi & sagesse',memory:'Mémoire',research:'Recherches',media:'Médias / Actualités',projects:'Projets'},
 es:{home:'Inicio',library:'Biblioteca',faith:'Fe y sabiduría',memory:'Memoria',research:'Investigación',media:'Medios / Noticias',projects:'Proyectos'},
 de:{home:'Start',library:'Bibliothek',faith:'Glaube & Weisheit',memory:'Erinnerung',research:'Forschung',media:'Medien / Nachrichten',projects:'Projekte'},
 tr:{home:'Ana sayfa',library:'Kütüphane',faith:'İnanç & Bilgelik',memory:'Hafıza',research:'Araştırma',media:'Medya / Haberler',projects:'Projeler'}
};
const lang=()=>{const q=new URLSearchParams(location.search).get('lang'),s=localStorage.getItem('luxdot.lang');return SUP.includes(q)?q:SUP.includes(s)?s:'en'};
const withLang=(href,l=lang())=>{let u=new URL(href,location.href);u.searchParams.set('lang',l);return u.pathname.split('/').pop()+u.search+u.hash};
function ensureStyle(){if(d.getElementById('lux43113-header-style'))return;let l=d.createElement('link');l.id='lux43113-header-style';l.rel='stylesheet';l.href='luxdot-header-v43108.css?v=43113';d.head.appendChild(l)}
function go(l){if(!SUP.includes(l))l='en';localStorage.setItem('luxdot.lang',l);let u=new URL(location.href);u.searchParams.set('lang',l);location.assign(u.pathname+u.search+u.hash)}
function build(){if(!d.body)return;ensureStyle();d.querySelectorAll('.luxdot-history-arrows,.luxdot-page-actions,.luxdot-breadcrumb').forEach(x=>x.remove());let old=d.querySelector('header.top');if(old)old.remove();
 let h=d.createElement('header');h.className='top lux-header-43108';h.innerHTML='<div class="lux-header-inner"><a class="lux-header-brand" data-lux-brand href="'+withLang('home.html')+'">LuxDot</a><button class="lux-menu-toggle" type="button" aria-label="Menu" aria-expanded="false">☰</button><nav class="lux-main-nav"></nav><div class="lux-language"><button class="lux-lang-btn" type="button" aria-expanded="false"><span>'+NAMES[lang()]+'</span><b>⌄</b></button><div class="lux-lang-menu" role="menu"></div></div></div>';d.body.prepend(h);
 let nav=h.querySelector('.lux-main-nav'),tx=T[lang()]||T.en;[['home.html','home'],['library.html','library'],['faith.html','faith'],['memory.html','memory'],['research.html','research'],['media.html','media'],['projects.html','projects']].forEach(([href,k])=>{let a=d.createElement('a');a.href=withLang(href);a.textContent=tx[k];if(FILE()===href)a.classList.add('active');nav.appendChild(a)});
 let menu=h.querySelector('.lux-lang-menu');SUP.forEach(l=>{let b=d.createElement('button');b.type='button';b.dataset.lang=l;b.textContent=FULL[l];if(l===lang())b.classList.add('active');b.onclick=()=>go(l);menu.appendChild(b)});
 let lb=h.querySelector('.lux-lang-btn');lb.onclick=e=>{e.stopPropagation();let on=menu.classList.toggle('open');lb.setAttribute('aria-expanded',String(on))};
 let mb=h.querySelector('.lux-menu-toggle');mb.onclick=()=>{let on=nav.classList.toggle('open');mb.setAttribute('aria-expanded',String(on))};
 d.addEventListener('click',e=>{if(!h.querySelector('.lux-language').contains(e.target)){menu.classList.remove('open');lb.setAttribute('aria-expanded','false')}});
 d.body.classList.add('lux-shell-page');d.documentElement.style.setProperty('--lux-header-h',Math.ceil(h.getBoundingClientRect().height)+'px');
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',build);else build();
window.addEventListener('resize',()=>{let h=d.querySelector('.lux-header-43108');if(h)d.documentElement.style.setProperty('--lux-header-h',Math.ceil(h.getBoundingClientRect().height)+'px')},{passive:true});
})();




/* LuxDot v4.3.125 · LuxDot Pulse — public live transparency */
(function(){
 function fmt(n){return Number.isFinite(+n)?new Intl.NumberFormat().format(+n):"—"}
 function bytes(n){
  n=+n||0;if(n<1024)return n+" B";if(n<1048576)return (n/1024).toFixed(1)+" KB";
  if(n<1073741824)return (n/1048576).toFixed(1)+" MB";return (n/1073741824).toFixed(2)+" GB";
 }
 function spark(values){
  if(!values.length)return "";
  const max=Math.max(1,...values),w=220,h=42,step=values.length>1?w/(values.length-1):w;
  const pts=values.map((v,i)=>`${(i*step).toFixed(1)},${(h-(v/max)*(h-4)-2).toFixed(1)}`).join(" ");
  return `<svg class="lp-spark" viewBox="0 0 ${w} ${h}" role="img" aria-label="24 hour visits trend"><polyline points="${pts}"/></svg>`;
 }
 function installLuxPulse(){
  if(document.getElementById("luxTimelineInfo"))return;
  const host=document.querySelector("header .topin,header .wrap,.topin,.top");
  if(!host)return;

  const q=new URLSearchParams(location.search),lang=q.get("lang")||"ar";
  const a=document.createElement("button");
  a.id="luxTimelineInfo";a.type="button";a.setAttribute("aria-label","LuxDot Pulse / information");a.title="LuxDot Pulse · Live transparency";a.textContent="i";
  host.appendChild(a);

  const panel=document.createElement("aside");panel.id="luxTimelinePeek";panel.setAttribute("aria-hidden","true");
  panel.innerHTML=`
    <button type="button" class="lt-close" aria-label="Close">×</button>
    <div class="lt-k"><span class="lp-dot"></span>LUXDOT PULSE · LIVE TRANSPARENCY</div>
    <div class="lp-head"><h3>نبض نقطة نور</h3><span id="lpVersion">v4.3.125</span></div>
    <div id="lpStatus" class="lp-status">تحميل البيانات المجمعة…</div>
    <div class="lp-metrics">
      <div><small>آخر 15 دقيقة</small><b id="lp15">—</b><em>زيارة</em></div>
      <div><small>آخر 24 ساعة</small><b id="lp24">—</b><em>زيارة</em></div>
      <div><small>آخر 7 أيام</small><b id="lp7">—</b><em>زيارة</em></div>
    </div>
    <div id="lpSpark"></div>
    <div class="lp-section"><b>الأكثر زيارة · 24h</b><div id="lpPages" class="lp-pages"><span>—</span></div></div>
    <div class="lp-section"><b>آخر التغييرات</b><div id="lpChanges" class="lp-changes"></div></div>
    <div class="lp-section"><b>NOW / NEXT</b><div class="lt-line">
      <div><b>21.08</b><span>ذاكرة الغوطة · تم</span></div>
      <div><b>03.09</b><span>ثورة الدقّة · PILOT</span></div>
      <div><b>07.12</b><span>عصر الدقّة · KICK-OFF</span></div>
    </div></div>
    <div class="lp-privacy">Aggregated only · لا IP · لا أسماء · لا تتبع فردي</div>
    <div class="lp-links"><a href="timeline.html?lang=${encodeURIComponent(lang)}">الرزنامة</a><a href="pulse-methodology.html?lang=${encodeURIComponent(lang)}">كيف نقيس؟</a></div>`;
  document.body.appendChild(panel);

  a.addEventListener("click",()=>{const open=panel.classList.toggle("open");panel.setAttribute("aria-hidden",open?"false":"true");if(open)loadPulse()});
  panel.querySelector(".lt-close").addEventListener("click",()=>{panel.classList.remove("open");panel.setAttribute("aria-hidden","true")});

  let lastLoad=0;
  async function loadPulse(){
    if(Date.now()-lastLoad<45000)return;lastLoad=Date.now();
    const status=panel.querySelector("#lpStatus");
    try{
      const r=await fetch("/api/transparency",{headers:{"accept":"application/json"}});
      const d=await r.json();
      panel.querySelector("#lpVersion").textContent="v"+(d.release?.version||"4.3.125");
      const changes=d.release?.recentChanges||[];
      panel.querySelector("#lpChanges").innerHTML=changes.slice(0,4).map(x=>`<div><strong>${x.title}</strong><span>${x.detail}</span></div>`).join("")||"<span>—</span>";
      const an=d.analytics||{};
      if(an.status==="live"){
        status.innerHTML='<span class="lp-good">● LIVE</span> Cloudflare aggregated analytics';
        panel.querySelector("#lp15").textContent=fmt(an.windows?.last15m?.visits);
        panel.querySelector("#lp24").textContent=fmt(an.windows?.last24h?.visits);
        panel.querySelector("#lp7").textContent=fmt(an.windows?.last7d?.visits);
        panel.querySelector("#lpSpark").innerHTML=spark((an.hourly24h||[]).map(x=>+x.visits||0));
        panel.querySelector("#lpPages").innerHTML=(an.topPages||[]).slice(0,5).map(x=>`<div><span>${x.path}</span><b>${fmt(x.visits)}</b></div>`).join("")||"<span>لا بيانات كافية بعد</span>";
      }else if(an.status==="setup_required"){
        status.innerHTML='<span class="lp-warn">● SETUP</span> البيانات الحية بانتظار ربط Secret التحليلات';
      }else{
        status.innerHTML='<span class="lp-warn">● DEGRADED</span> القياس الحي غير متاح مؤقتًا';
      }
    }catch{
      status.innerHTML='<span class="lp-warn">● OFFLINE</span> تعذر تحديث القياس الآن';
    }
  }
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",installLuxPulse);else installLuxPulse();
})();
