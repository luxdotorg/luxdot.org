/* LuxDot v2.7 — sacred shelf / book opening / photon / chimes */
(()=>{
'use strict';
let audioCtx=null;
function ctx(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;if(!audioCtx)audioCtx=new AC();if(audioCtx.state==='suspended')audioCtx.resume();return audioCtx}
const PROFILES={
 quran:[[261.63,.00,.72],[392.00,.10,.58],[523.25,.22,.34]],
 tanakh:[[220.00,.00,.62],[329.63,.12,.48],[440.00,.25,.28]],
 nt:[[293.66,.00,.64],[392.00,.11,.44],[587.33,.25,.30]],
 gita:[[246.94,.00,.56],[369.99,.15,.42]],
 buddhist:[[196.00,.00,.66],[293.66,.18,.36]],
 kepercayaan:[[233.08,.00,.58],[349.23,.16,.38]]
};
function bellTone(freq,delay,dur,master){const c=ctx();if(!c)return;const now=c.currentTime+delay,o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();o.type='sine';o.frequency.value=freq;f.type='lowpass';f.frequency.value=2400;g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.055*master,now+.018);g.gain.exponentialRampToValueAtTime(.0001,now+dur);o.connect(f);f.connect(g);g.connect(c.destination);o.start(now);o.stop(now+dur+.05)}
function playChime(profile='quran'){(PROFILES[profile]||PROFILES.quran).forEach(([f,d,r])=>bellTone(f,d,1.25+r,.9))}
function photonFrom(el){if(!el)return;if(window.LuxDotPhotonSwarm){window.LuxDotPhotonSwarm(el);return}}
function toneOf(el){return el?.dataset.bookTone||([...el?.classList||[]].find(x=>x.includes('quran'))?'quran':[...el?.classList||[]].find(x=>x.includes('tanakh'))?'tanakh':[...el?.classList||[]].find(x=>x==='book-nt'||x==='shelf-nt')?'nt':'quran')}
function markOpen(url){try{sessionStorage.setItem('luxdot.book.open',new URL(url,location.href).pathname)}catch(e){}}
function shouldAutoOpen(){try{const p=sessionStorage.getItem('luxdot.book.open');if(p&&p===location.pathname){sessionStorage.removeItem('luxdot.book.open');return true}}catch(e){}return new URLSearchParams(location.search).get('open')==='1'}

document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('[data-book-link]').forEach(link=>{link.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const href=link.getAttribute('href');if(!href)return;e.preventDefault();markOpen(href);location.href=href})});
 const opener=document.querySelector('[data-open-sacred]'),stage=document.querySelector('[data-sacred-stage]'),reader=document.querySelector('[data-sacred-reader]'),closer=document.querySelector('[data-close-sacred]');
 const profile=toneOf(opener?.querySelector('.book-object')||opener);
 function openBook(withFx=true){if(!stage||!reader)return;if(stage.classList.contains('is-open'))return;ctx();if(withFx){playChime(profile);photonFrom(opener?.querySelector('.book-object')||opener)}stage.classList.add('is-open');reader.setAttribute('aria-hidden','false');setTimeout(()=>document.dispatchEvent(new CustomEvent('bookopened')),300)}
 function closeBook(){if(!stage||!reader)return;window.LuxDotStopAllAudio?.();stage.classList.remove('is-open');reader.setAttribute('aria-hidden','true');opener?.focus({preventScroll:true})}
 opener?.addEventListener('click',()=>openBook(true));closer?.addEventListener('click',closeBook);
 if(opener)setTimeout(()=>openBook(false),0);
});
window.LuxDotSacred={playChime,photonFrom};
})();
