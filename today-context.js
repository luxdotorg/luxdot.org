/* LuxDot v4.17.3 — shared Living Today Context */
(()=>{'use strict';
const TZ='Europe/Amsterdam';
function dateKey(d=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).format(d)}
const EDITORIAL={
 '2026-08-23':{kind:'memory',title_ar:'من العبودية إلى الحرية',title_en:'From slavery toward freedom',subtitle_ar:'اليوم الدولي لذكرى تجارة الرقيق وإلغائها',href:'slave-trade-remembrance.html'},
 '2026-08-24':{kind:'personal-memory',title_ar:'ذكرى الميلاد الهجري',title_en:'Hijri birthday remembrance',subtitle_ar:'طبقة تحريرية خاصة ضمن دورة ربيع الأول',href:'calendar.html'},
 '2026-08-25':{kind:'sacred',title_ar:'المولد النبوي الشريف',title_en:'Mawlid al-Nabi',subtitle_ar:'12 ربيع الأول 1448 · قد يختلف بحسب رؤية الهلال',href:'world-calendar.html'}
};
function context(){
 const key=dateKey(),radio=window.LuxDotRadio?.live?.()||null,base=EDITORIAL[key]||null;
 return {date:key,timezone:TZ,identity:base,radio,
  sacred:!!radio?.sacredLock||base?.kind==='sacred',
  broadcast:radio?.program||null,
  track:radio?.track||null,
  special:radio?.special||null,
  updated:new Date().toISOString()};
}
function emit(){const c=context();window.LuxDotToday=c;document.dispatchEvent(new CustomEvent('luxdot-today-context',{detail:c}));return c}
window.LuxDotTodayContext={get:context,refresh:emit};
document.addEventListener('luxdotradio',emit);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',emit,{once:true});else emit();
setInterval(emit,60000);
})();