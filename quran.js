const SURAHS=[{"id": 1, "ar": "الفاتحة", "en": "Al-Fatihah", "n": 7, "type": "meccan"}, {"id": 2, "ar": "البقرة", "en": "Al-Baqarah", "n": 286, "type": "medinan"}, {"id": 3, "ar": "آل عمران", "en": "Ali 'Imran", "n": 200, "type": "medinan"}, {"id": 4, "ar": "النساء", "en": "An-Nisa", "n": 176, "type": "medinan"}, {"id": 5, "ar": "المائدة", "en": "Al-Ma'idah", "n": 120, "type": "medinan"}, {"id": 6, "ar": "الأنعام", "en": "Al-An'am", "n": 165, "type": "meccan"}, {"id": 7, "ar": "الأعراف", "en": "Al-A'raf", "n": 206, "type": "meccan"}, {"id": 8, "ar": "الأنفال", "en": "Al-Anfal", "n": 75, "type": "medinan"}, {"id": 9, "ar": "التوبة", "en": "At-Tawbah", "n": 129, "type": "medinan"}, {"id": 10, "ar": "يونس", "en": "Yunus", "n": 109, "type": "meccan"}, {"id": 11, "ar": "هود", "en": "Hud", "n": 123, "type": "meccan"}, {"id": 12, "ar": "يوسف", "en": "Yusuf", "n": 111, "type": "meccan"}, {"id": 13, "ar": "الرعد", "en": "Ar-Ra'd", "n": 43, "type": "medinan"}, {"id": 14, "ar": "إبراهيم", "en": "Ibrahim", "n": 52, "type": "meccan"}, {"id": 15, "ar": "الحجر", "en": "Al-Hijr", "n": 99, "type": "meccan"}, {"id": 16, "ar": "النحل", "en": "An-Nahl", "n": 128, "type": "meccan"}, {"id": 17, "ar": "الإسراء", "en": "Al-Isra", "n": 111, "type": "meccan"}, {"id": 18, "ar": "الكهف", "en": "Al-Kahf", "n": 110, "type": "meccan"}, {"id": 19, "ar": "مريم", "en": "Maryam", "n": 98, "type": "meccan"}, {"id": 20, "ar": "طه", "en": "Taha", "n": 135, "type": "meccan"}, {"id": 21, "ar": "الأنبياء", "en": "Al-Anbya", "n": 112, "type": "meccan"}, {"id": 22, "ar": "الحج", "en": "Al-Hajj", "n": 78, "type": "medinan"}, {"id": 23, "ar": "المؤمنون", "en": "Al-Mu'minun", "n": 118, "type": "meccan"}, {"id": 24, "ar": "النور", "en": "An-Nur", "n": 64, "type": "medinan"}, {"id": 25, "ar": "الفرقان", "en": "Al-Furqan", "n": 77, "type": "meccan"}, {"id": 26, "ar": "الشعراء", "en": "Ash-Shu'ara", "n": 227, "type": "meccan"}, {"id": 27, "ar": "النمل", "en": "An-Naml", "n": 93, "type": "meccan"}, {"id": 28, "ar": "القصص", "en": "Al-Qasas", "n": 88, "type": "meccan"}, {"id": 29, "ar": "العنكبوت", "en": "Al-'Ankabut", "n": 69, "type": "meccan"}, {"id": 30, "ar": "الروم", "en": "Ar-Rum", "n": 60, "type": "meccan"}, {"id": 31, "ar": "لقمان", "en": "Luqman", "n": 34, "type": "meccan"}, {"id": 32, "ar": "السجدة", "en": "As-Sajdah", "n": 30, "type": "meccan"}, {"id": 33, "ar": "الأحزاب", "en": "Al-Ahzab", "n": 73, "type": "medinan"}, {"id": 34, "ar": "سبإ", "en": "Saba", "n": 54, "type": "meccan"}, {"id": 35, "ar": "فاطر", "en": "Fatir", "n": 45, "type": "meccan"}, {"id": 36, "ar": "يس", "en": "Ya-Sin", "n": 83, "type": "meccan"}, {"id": 37, "ar": "الصافات", "en": "As-Saffat", "n": 182, "type": "meccan"}, {"id": 38, "ar": "ص", "en": "Sad", "n": 88, "type": "meccan"}, {"id": 39, "ar": "الزمر", "en": "Az-Zumar", "n": 75, "type": "meccan"}, {"id": 40, "ar": "غافر", "en": "Ghafir", "n": 85, "type": "meccan"}, {"id": 41, "ar": "فصلت", "en": "Fussilat", "n": 54, "type": "meccan"}, {"id": 42, "ar": "الشورى", "en": "Ash-Shuraa", "n": 53, "type": "meccan"}, {"id": 43, "ar": "الزخرف", "en": "Az-Zukhruf", "n": 89, "type": "meccan"}, {"id": 44, "ar": "الدخان", "en": "Ad-Dukhan", "n": 59, "type": "meccan"}, {"id": 45, "ar": "الجاثية", "en": "Al-Jathiyah", "n": 37, "type": "meccan"}, {"id": 46, "ar": "الأحقاف", "en": "Al-Ahqaf", "n": 35, "type": "meccan"}, {"id": 47, "ar": "محمد", "en": "Muhammad", "n": 38, "type": "medinan"}, {"id": 48, "ar": "الفتح", "en": "Al-Fath", "n": 29, "type": "medinan"}, {"id": 49, "ar": "الحجرات", "en": "Al-Hujurat", "n": 18, "type": "medinan"}, {"id": 50, "ar": "ق", "en": "Qaf", "n": 45, "type": "meccan"}, {"id": 51, "ar": "الذاريات", "en": "Adh-Dhariyat", "n": 60, "type": "meccan"}, {"id": 52, "ar": "الطور", "en": "At-Tur", "n": 49, "type": "meccan"}, {"id": 53, "ar": "النجم", "en": "An-Najm", "n": 62, "type": "meccan"}, {"id": 54, "ar": "القمر", "en": "Al-Qamar", "n": 55, "type": "meccan"}, {"id": 55, "ar": "الرحمن", "en": "Ar-Rahman", "n": 78, "type": "medinan"}, {"id": 56, "ar": "الواقعة", "en": "Al-Waqi'ah", "n": 96, "type": "meccan"}, {"id": 57, "ar": "الحديد", "en": "Al-Hadid", "n": 29, "type": "medinan"}, {"id": 58, "ar": "المجادلة", "en": "Al-Mujadila", "n": 22, "type": "medinan"}, {"id": 59, "ar": "الحشر", "en": "Al-Hashr", "n": 24, "type": "medinan"}, {"id": 60, "ar": "الممتحنة", "en": "Al-Mumtahanah", "n": 13, "type": "medinan"}, {"id": 61, "ar": "الصف", "en": "As-Saf", "n": 14, "type": "medinan"}, {"id": 62, "ar": "الجمعة", "en": "Al-Jumu'ah", "n": 11, "type": "medinan"}, {"id": 63, "ar": "المنافقون", "en": "Al-Munafiqun", "n": 11, "type": "medinan"}, {"id": 64, "ar": "التغابن", "en": "At-Taghabun", "n": 18, "type": "medinan"}, {"id": 65, "ar": "الطلاق", "en": "At-Talaq", "n": 12, "type": "medinan"}, {"id": 66, "ar": "التحريم", "en": "At-Tahrim", "n": 12, "type": "medinan"}, {"id": 67, "ar": "الملك", "en": "Al-Mulk", "n": 30, "type": "meccan"}, {"id": 68, "ar": "القلم", "en": "Al-Qalam", "n": 52, "type": "meccan"}, {"id": 69, "ar": "الحاقة", "en": "Al-Haqqah", "n": 52, "type": "meccan"}, {"id": 70, "ar": "المعارج", "en": "Al-Ma'arij", "n": 44, "type": "meccan"}, {"id": 71, "ar": "نوح", "en": "Nuh", "n": 28, "type": "meccan"}, {"id": 72, "ar": "الجن", "en": "Al-Jinn", "n": 28, "type": "meccan"}, {"id": 73, "ar": "المزمل", "en": "Al-Muzzammil", "n": 20, "type": "meccan"}, {"id": 74, "ar": "المدثر", "en": "Al-Muddaththir", "n": 56, "type": "meccan"}, {"id": 75, "ar": "القيامة", "en": "Al-Qiyamah", "n": 40, "type": "meccan"}, {"id": 76, "ar": "الإنسان", "en": "Al-Insan", "n": 31, "type": "medinan"}, {"id": 77, "ar": "المرسلات", "en": "Al-Mursalat", "n": 50, "type": "meccan"}, {"id": 78, "ar": "النبأ", "en": "An-Naba", "n": 40, "type": "meccan"}, {"id": 79, "ar": "النازعات", "en": "An-Nazi'at", "n": 46, "type": "meccan"}, {"id": 80, "ar": "عبس", "en": "'Abasa", "n": 42, "type": "meccan"}, {"id": 81, "ar": "التكوير", "en": "At-Takwir", "n": 29, "type": "meccan"}, {"id": 82, "ar": "الانفطار", "en": "Al-Infitar", "n": 19, "type": "meccan"}, {"id": 83, "ar": "المطففين", "en": "Al-Mutaffifin", "n": 36, "type": "meccan"}, {"id": 84, "ar": "الانشقاق", "en": "Al-Inshiqaq", "n": 25, "type": "meccan"}, {"id": 85, "ar": "البروج", "en": "Al-Buruj", "n": 22, "type": "meccan"}, {"id": 86, "ar": "الطارق", "en": "At-Tariq", "n": 17, "type": "meccan"}, {"id": 87, "ar": "الأعلى", "en": "Al-A'la", "n": 19, "type": "meccan"}, {"id": 88, "ar": "الغاشية", "en": "Al-Ghashiyah", "n": 26, "type": "meccan"}, {"id": 89, "ar": "الفجر", "en": "Al-Fajr", "n": 30, "type": "meccan"}, {"id": 90, "ar": "البلد", "en": "Al-Balad", "n": 20, "type": "meccan"}, {"id": 91, "ar": "الشمس", "en": "Ash-Shams", "n": 15, "type": "meccan"}, {"id": 92, "ar": "الليل", "en": "Al-Layl", "n": 21, "type": "meccan"}, {"id": 93, "ar": "الضحى", "en": "Ad-Duhaa", "n": 11, "type": "meccan"}, {"id": 94, "ar": "الشرح", "en": "Ash-Sharh", "n": 8, "type": "meccan"}, {"id": 95, "ar": "التين", "en": "At-Tin", "n": 8, "type": "meccan"}, {"id": 96, "ar": "العلق", "en": "Al-'Alaq", "n": 19, "type": "meccan"}, {"id": 97, "ar": "القدر", "en": "Al-Qadr", "n": 5, "type": "meccan"}, {"id": 98, "ar": "البينة", "en": "Al-Bayyinah", "n": 8, "type": "medinan"}, {"id": 99, "ar": "الزلزلة", "en": "Az-Zalzalah", "n": 8, "type": "medinan"}, {"id": 100, "ar": "العاديات", "en": "Al-'Adiyat", "n": 11, "type": "meccan"}, {"id": 101, "ar": "القارعة", "en": "Al-Qari'ah", "n": 11, "type": "meccan"}, {"id": 102, "ar": "التكاثر", "en": "At-Takathur", "n": 8, "type": "meccan"}, {"id": 103, "ar": "العصر", "en": "Al-'Asr", "n": 3, "type": "meccan"}, {"id": 104, "ar": "الهمزة", "en": "Al-Humazah", "n": 9, "type": "meccan"}, {"id": 105, "ar": "الفيل", "en": "Al-Fil", "n": 5, "type": "meccan"}, {"id": 106, "ar": "قريش", "en": "Quraysh", "n": 4, "type": "meccan"}, {"id": 107, "ar": "الماعون", "en": "Al-Ma'un", "n": 7, "type": "meccan"}, {"id": 108, "ar": "الكوثر", "en": "Al-Kawthar", "n": 3, "type": "meccan"}, {"id": 109, "ar": "الكافرون", "en": "Al-Kafirun", "n": 6, "type": "meccan"}, {"id": 110, "ar": "النصر", "en": "An-Nasr", "n": 3, "type": "medinan"}, {"id": 111, "ar": "المسد", "en": "Al-Masad", "n": 5, "type": "meccan"}, {"id": 112, "ar": "الإخلاص", "en": "Al-Ikhlas", "n": 4, "type": "meccan"}, {"id": 113, "ar": "الفلق", "en": "Al-Falaq", "n": 5, "type": "meccan"}, {"id": 114, "ar": "الناس", "en": "An-Nas", "n": 6, "type": "meccan"}];

const QAPI="https://api.alquran.cloud/v1/surah/";
const AUDIO="https://cdn.islamic.network/quran/audio/128/ar.alafasy/";
const offsets=(()=>{let x=0;return SURAHS.map(s=>{const o=x;x+=s.n;return o})})();
let state={s:2,a:2,en:false,playing:false,data:null};
let introTimer=null,introAttempted=false;
const $=x=>document.querySelector(x);
function gidx(s,a){return offsets[s-1]+a}
function list(filter=""){
  const f=filter.trim().toLowerCase();$("#surahList").innerHTML="";
  SURAHS.filter(s=>!f||s.ar.includes(f)||s.en.toLowerCase().includes(f)||String(s.id)===f).forEach(s=>{
    const b=document.createElement("button");b.className="surah"+(state.s===s.id?" on":"");b.textContent=`${s.id}. ${s.ar} · ${s.en}`;b.onclick=()=>loadSurah(s.id,1);$("#surahList").appendChild(b)
  })
}
function scheduleOpeningAyah(){
  if(introAttempted)return;
  introAttempted=true;
  introTimer=setTimeout(()=>{
    if(state.s===2 && state.a===2){
      play(2);
      setTimeout(()=>{
        const a=$("#audio");
        if(a && a.paused){
          const p=$("#player");
          if(p){
            p.classList.add("on");
            $("#pref").textContent=LANG==="ar"?"البقرة · 2:2 · اضغط ▶ للاستماع":"Al-Baqarah · 2:2 · Press ▶ to listen";
          }
        }
      },700);
    }
  },5000);
}
async function loadSurah(s,a=1){
  state.s=s;state.a=a;$("#verses").innerHTML=`<div class="status">${t("loading")}</div>`;
  const m=SURAHS[s-1];$("#qtitle").textContent=m.ar;$("#qmeta").textContent=`${m.en} · ${t(m.type)} · ${m.n} ${t("verses")}`;
  list($("#sfilter").value||"");
  try{
    const r=await fetch(`${QAPI}${s}/editions/quran-uthmani,en.sahih`,{cache:"no-store"});
    if(!r.ok)throw new Error("HTTP "+r.status);
    const j=await r.json();
    const ar=j.data[0].ayahs,en=j.data[1].ayahs;
    state.data=ar.map((v,i)=>({n:v.numberInSurah,text:v.text,en:en[i]?.text||""}));
    render();
  }catch(e){
    $("#verses").innerHTML=`<div class="status">${t("error")}<br><br><a class="btn" href="https://quran.com/${s}" target="_blank" rel="noopener">Quran.com</a></div>`;
  }
}
function render(){
  $("#verses").innerHTML="";
  state.data.forEach(v=>{
    const d=document.createElement("article");d.className="ayah";d.id=`a-${v.n}`;
    d.innerHTML=`<div class="ayahtop"><span>${state.s}:${v.n}</span><button class="play">▶</button></div><div class="ar">${v.text}</div><div class="en">${v.en}</div>`;
    d.querySelector(".play").onclick=()=>play(v.n);$("#verses").appendChild(d)
  });
  $("#verses").classList.toggle("show-en",state.en);
  const el=$("#a-"+state.a);if(el)el.scrollIntoView({block:"center"});
}
function mark(){
  document.querySelectorAll(".ayah").forEach(x=>x.classList.remove("current"));const el=$("#a-"+state.a);if(el){el.classList.add("current");if(state.playing)el.scrollIntoView({behavior:"smooth",block:"center"})}
  $("#pref").textContent=`${SURAHS[state.s-1].ar} · ${state.s}:${state.a}`;
}
function play(a){
  state.a=a;mark();$("#player").classList.add("on");const audio=$("#audio");audio.src=`${AUDIO}${gidx(state.s,a)}.mp3`;audio.play().then(()=>{state.playing=true;$("#pp").textContent="Ⅱ";mark()}).catch(()=>{$("#pp").textContent="▶"})
}
$("#audio").addEventListener("ended",()=>{state.playing=false;$("#pp").textContent="▶";if(state.a<SURAHS[state.s-1].n){state.a++;play(state.a)}});
$("#pp").onclick=()=>{const a=$("#audio");if(a.paused){if(!a.src)play(state.a);else a.play()}else a.pause()};
$("#trans").onclick=()=>{state.en=!state.en;$("#verses").classList.toggle("show-en",state.en);$("#trans").classList.toggle("on",state.en)};
$("#sfilter").oninput=e=>list(e.target.value);
document.addEventListener("luxlang",()=>{list($("#sfilter").value||"");const m=SURAHS[state.s-1];$("#qmeta").textContent=`${m.en} · ${t(m.type)} · ${m.n} ${t("verses")}`});
document.addEventListener("DOMContentLoaded",()=>{list();loadSurah(2,2).then(()=>scheduleOpeningAyah())});
