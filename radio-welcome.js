(()=>{
'use strict';
const TEXT='هنا شام… إذاعة لوكس دوت ترحّب بكم. من هنا، نفتح نافذةً للصوت، للمعرفة، للإنسان، للطبيعة، وللحياة. موسيقى، معرفة، حكايات، وتأمل. أصواتٌ من ثقافات العالم، ومساحةٌ نلتقي فيها، مهما اختلفت لغاتنا وأماكننا. أنتم تستمعون إلى إذاعة لوكس دوت — نقطة نور. من شام… إلى العالم.';
let spoken=false;
function pickArabicVoice(){
 const voices=speechSynthesis.getVoices();
 return voices.find(v=>/^ar(-|_)/i.test(v.lang)&&/female|maged|hoda|laila|salma|zeina/i.test(v.name))||voices.find(v=>/^ar(-|_)/i.test(v.lang))||null;
}
function speakWelcome(){
 if(spoken||!('speechSynthesis' in window))return Promise.resolve(false);
 spoken=true;
 return new Promise(resolve=>{
  try{
   const u=new SpeechSynthesisUtterance(TEXT);u.lang='ar-SA';u.rate=.88;u.pitch=.96;u.volume=1;
   const v=pickArabicVoice();if(v)u.voice=v;
   u.onend=()=>resolve(true);u.onerror=()=>resolve(false);
   speechSynthesis.cancel();speechSynthesis.speak(u);
  }catch(e){resolve(false)}
 });
}
window.LuxDotRadioWelcome={text:TEXT,speak:speakWelcome,reset:()=>{spoken=false}};
})();