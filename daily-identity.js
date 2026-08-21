/* LuxDot v4.4.2 · Daily Identity — editorial, date-driven, privacy-neutral */
(()=>{if(document.getElementById("luxDailyIdentity"))return;
const today=new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Amsterdam",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
const events={
"2026-08-21":{t:"سوريا · ذاكرة الغوطة",s:"ذكرى وتوثيق ضحايا الهجوم الكيميائي على الغوطة",href:"ghouta-chemical-memory.html",flag:"sy"},
"2026-09-03":{t:"ثورة الدقّة · PILOT",s:"3 سبتمبر · محطة LuxDot",href:"timeline.html",flag:null},
"2026-12-07":{t:"عصر الدقّة · KICK-OFF",s:"7 ديسمبر · محطة LuxDot",href:"timeline.html",flag:null}
};let e=events[today];if(!e)return;
const sy=`<svg viewBox="0 0 3 2" aria-hidden="true"><path fill="#080" d="M0 0h3v2H0z"/><path fill="#fff" d="M0 0h3v1.333H0z"/><path fill="#000" d="M0 0h3v.667H0z"/><g fill="#d22"><path d="M1 .78l.07.2h.22l-.18.13.07.21-.18-.13-.18.13.07-.21-.18-.13h.22z"/><path d="M2 .78l.07.2h.22l-.18.13.07.21-.18-.13-.18.13.07-.21-.18-.13h.22z"/></g></svg>`;
let a=document.createElement("a");a.id="luxDailyIdentity";a.href=e.href;a.setAttribute("aria-label",e.t);a.innerHTML=`${e.flag==="sy"?sy:"<i>•</i>"}<span><b>${e.t}</b><small>${e.s}</small></span>`;document.body.append(a);
})();