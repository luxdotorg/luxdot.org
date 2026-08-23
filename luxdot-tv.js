
(()=>{
'use strict';
const W='https://upload.wikimedia.org/wikipedia/commons/';
const PLAYLIST=[
 {id:'night',titleAr:'سماء الليل',titleEn:'Night Sky',src:W+'e/e6/Night_Sky_Timelapse_%2830549248476%29.webm',credit:'Joshua Tree National Park / NPS',license:'Public domain',mode:'slow'},
 {id:'earth',titleAr:'الأرض من الفضاء',titleEn:'Earth from Space',src:W+'3/31/Earth-solar-array-timelapse.webm',credit:'NASA',license:'Public domain',mode:'world'},
 {id:'dawn',titleAr:'من الليل إلى الصباح',titleEn:'Night into Dawn',src:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Timelapse of the sky at night and in the day.webm',credit:'theilr',license:'CC BY-SA 2.0',mode:'slow'}
];
const v=document.getElementById('luxdotTvVideo'),title=document.getElementById('tvNowTitle'),credit=document.getElementById('tvCredit');
if(!v)return;
let i=Number(localStorage.getItem('luxdot.tv.index')||0)%PLAYLIST.length;
let visualOnly=false;

function item(){return PLAYLIST[i]}
function paint(){
 const x=item();title.textContent=`${x.titleAr} · ${x.titleEn}`;
 credit.textContent=`${x.credit} · ${x.license}`;
 document.querySelectorAll('[data-tv-item]').forEach((b,n)=>b.classList.toggle('active',n===i));
}
function load(n=i){
 i=(n+PLAYLIST.length)%PLAYLIST.length;localStorage.setItem('luxdot.tv.index',i);
 const x=item();v.src=x.src;v.load();paint();v.play().catch(()=>{});
}
function next(){load(i+1)}
v.addEventListener('ended',next);v.addEventListener('error',()=>setTimeout(next,1200));
document.getElementById('tvPlay').onclick=()=>v.paused?v.play():v.pause();
document.getElementById('tvNext').onclick=next;
document.getElementById('tvFull').onclick=()=>v.requestFullscreen?.();
document.getElementById('tvRadio').onclick=()=>{
 visualOnly=!visualOnly;
 if(window.LuxDotRadio){
   if(visualOnly && !LuxDotRadio.audio.paused)LuxDotRadio.toggle();
   if(!visualOnly && LuxDotRadio.audio.paused)LuxDotRadio.toggle();
 }
 document.getElementById('tvRadio').textContent=visualOnly?'🔇 صورة فقط':'◉ الصورة + إذاعة نقطة نور';
};
document.querySelectorAll('[data-tv-item]').forEach((b,n)=>b.onclick=()=>load(n));
document.addEventListener('luxdotradio',e=>{
 const s=e.detail||{},el=document.getElementById('tvRadioNow');
 if(el&&s.track)el.textContent=`إذاعة نقطة نور · ${s.track.title} · ${s.track.artist}`;
});
load(i);
window.LuxDotTV={PLAYLIST,next,load};
})();
