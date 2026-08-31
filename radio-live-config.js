(()=>{
'use strict';
// Public playback configuration only. Never store DJ/encoder passwords or ingest keys here.
window.LUXDOT_RADIO_STREAM={
  enabled:false,
  streamUrl:'',
  statusUrl:'',
  provider:'icecast-compatible',
  station:'إذاعة نقطة نور · LuxDot Radio',
  fallbackToEditorial:true
};

// Temporary synthetic station welcome. Replace this with Rafi's recorded ident later.
const WELCOME='هنا شام… إذاعة لوكس دوت ترحّب بكم. من هنا، نفتح نافذةً للصوت، للمعرفة، للإنسان، للطبيعة، وللحياة. موسيقى، معرفة، حكايات، وتأمل. أصواتٌ من ثقافات العالم، ومساحةٌ نلتقي فيها، مهما اختلفت لغاتنا وأماكننا. أنتم تستمعون إلى إذاعة لوكس دوت — نقطة نور. من شام… إلى العالم.';
let welcomePlayed=false;
function arabicVoice(){
 const voices=window.speechSynthesis?.getVoices?.()||[];
 return voices.find(v=>/^ar(-|_)/i.test(v.lang)&&/female|maged|hoda|laila|salma|zeina/i.test(v.name))||voices.find(v=>/^ar(-|_)/i.test(v.lang))||null;
}
function speakWelcome(done){
 if(!('speechSynthesis' in window)){done();return}
 const u=new SpeechSynthesisUtterance(WELCOME);u.lang='ar-SA';u.rate=.88;u.pitch=.96;u.volume=1;
 const voice=arabicVoice();if(voice)u.voice=voice;
 let finished=false;const finish=()=>{if(finished)return;finished=true;done()};u.onend=finish;u.onerror=finish;
 speechSynthesis.cancel();speechSynthesis.speak(u);setTimeout(finish,26000);
}
window.LUXDOT_RADIO_WELCOME={text:WELCOME,synthetic:true};
document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.getElementById('radioMainPlay');if(!btn)return;
 btn.addEventListener('click',e=>{
  if(welcomePlayed)return;
  welcomePlayed=true;e.preventDefault();e.stopImmediatePropagation();
  const old=btn.textContent;btn.textContent='◌ الرسالة الترحيبية…';
  speakWelcome(()=>{btn.textContent=old;if(typeof btn.onclick==='function')btn.onclick()});
 },true);
});
})();
