(()=>{
'use strict';
const CHAAM={lat:51.50526,lon:4.86117,timeZone:'Europe/Amsterdam',method:2,school:0};
const nativeFetch=window.fetch.bind(window);
window.fetch=(input,init)=>{
  try{
    const raw=typeof input==='string'?input:input?.url||'';
    if(raw.includes('api.aladhan.com/v1/timingsByCity/')&&raw.includes('city=Damascus')){
      const m=raw.match(/timingsByCity\/(\d{1,2})-(\d{1,2})-(\d{4})/);
      if(m){
        const date=`${m[1]}-${m[2]}-${m[3]}`;
        const u=`https://api.aladhan.com/v1/timings/${date}?latitude=${CHAAM.lat}&longitude=${CHAAM.lon}&method=${CHAAM.method}&school=${CHAAM.school}&timezonestring=${encodeURIComponent(CHAAM.timeZone)}`;
        return nativeFetch(u,init);
      }
    }
  }catch(e){}
  return nativeFetch(input,init);
};
const NativeAudio=window.Audio;
function LuxDotAudio(src){
  let s=src;
  try{
    const x=String(src||'');
    if(x.includes('Beautiful%20adhan.ogg')||x.includes('Beautiful adhan.ogg')||x.includes('Azan.ogg')){
      s='https://commons.wikimedia.org/wiki/Special:Redirect/file/Adhan.ogg';
    }
  }catch(e){}
  return new NativeAudio(s);
}
LuxDotAudio.prototype=NativeAudio.prototype;
try{Object.setPrototypeOf(LuxDotAudio,NativeAudio)}catch(e){}
window.Audio=LuxDotAudio;
window.LUXDOT_CHAAM_PRAYER={...CHAAM,label:'Chaam / شام · Noord-Brabant',adhanFallback:'Adhan.ogg',adhanLicense:'CC0 1.0'};
})();
