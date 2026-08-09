
const TX={
en:{
home:"Home",library:"Library",discover:"Discover",living:"Living Book",projects:"Projects",participate:"Participate",
hero1:"One humanity.",hero2:"Many traditions.",hero3:"A shared search for truth.",
lead:"LuxDot begins with a simple promise: understand before judging, and build what can be shared.",
common:"Common Library",commonD:"The first active layer of LuxDot.",open:"Open",
livingD:"Shared wisdom across traditions.",projectsD:"Ideas translated into action.",soon:"Coming soon",
libTitle:"Common Library",libLead:"Foundational texts and essential works. The Qur'an is active first.",
quran:"Qur'an",tanakh:"Tanakh",nt:"New Testament",gita:"Bhagavad Gita",tao:"Tao Te Ching",
quranOpen:"Open the Qur'an",building:"Building next",surahs:"Surahs",translation:"Translation",
loading:"Loading…",error:"Could not load this surah. Please try again.",reciter:"Mishary Rashid Alafasy",
verses:"verses",meccan:"Meccan",medinan:"Medinan",search:"Search surah…",humanLib:"Human Library · Level I",humanLead:"Ten books that open ten different doors into the human condition.",sonicReady:"Audio research ready",quranLive:"Qur'an reader active",map:"The map",justice:"Justice",selfmastery:"Self-mastery",meaning:"Meaning",civilization:"Civilization",conscience:"Conscience",values:"Values",life2:"Life",power:"Power",knowledge:"Knowledge",
openTanakh:"Open Tanakh",tanakhTitle:"Tanakh",tanakhLead:"Read the selected passage in Hebrew and listen without background music.",
selectedPassage:"Selected passage",listenPassage:"Listen to the opening passage",introWillPlay:"The selected passage may play once after 5 seconds.",autoplayBlocked:"Your browser blocked automatic sound. Listen when you are ready.",stopIntro:"Stop",proverbs623:"Proverbs 6:23",lightWay:"Torah · Light · Way of Life",
openNT:"Open New Testament",ntTitle:"New Testament",ntLead:"Read the selected passage in Greek and listen without background music.",
john2031:"John 20:31",writtenLife:"Written · Belief · Life",
ntAudioNote:"The selected passage may play once after 5 seconds."
},
ar:{
home:"الرئيسية",library:"المكتبة",discover:"اكتشف",living:"الكتاب الحي",projects:"المشاريع",participate:"شارك",
hero1:"إنسانية واحدة.",hero2:"تقاليد متعددة.",hero3:"بحث مشترك عن الحقيقة.",
lead:"يبدأ لوكسدوت بوعد بسيط: افهم قبل أن تحكم، وابنِ ما يمكن أن نتشاركه.",
common:"المكتبة المشتركة",commonD:"الطبقة الأولى المفعّلة من لوكسدوت.",open:"افتح",
livingD:"حكمة مشتركة عبر التقاليد.",projectsD:"أفكار تتحول إلى فعل.",soon:"قريباً",
libTitle:"المكتبة المشتركة",libLead:"النصوص المؤسسة والكتب الأساسية. نبدأ بتفعيل القرآن أولاً.",
quran:"القرآن الكريم",tanakh:"التناخ",nt:"العهد الجديد",gita:"البهاغافاد غيتا",tao:"كتاب الطريق والفضيلة",
quranOpen:"افتح القرآن",building:"نبنيه تالياً",surahs:"السور",translation:"الترجمة",
loading:"جارٍ التحميل…",error:"تعذر تحميل السورة. حاول مرة أخرى.",reciter:"مشاري راشد العفاسي",
verses:"آية",meccan:"مكية",medinan:"مدنية",search:"ابحث عن سورة…",humanLib:"المكتبة الإنسانية · المستوى الأول",humanLead:"عشرة كتب تفتح عشرة أبواب مختلفة لفهم الإنسان والعالم.",sonicReady:"المصدر الصوتي قيد الإعداد",quranLive:"قارئ القرآن مفعّل",map:"الخريطة",justice:"العدالة",selfmastery:"السيادة على النفس",meaning:"المعنى",civilization:"الحضارة",conscience:"الضمير",values:"القيم",life2:"الحياة",power:"السلطة",knowledge:"المعرفة",
openTanakh:"افتح التناخ",tanakhTitle:"التناخ",tanakhLead:"اقرأ المقطع المختار بالعبرية واستمع إليه بلا موسيقى خلفية.",
selectedPassage:"المقطع المختار",listenPassage:"استمع للمقطع الافتتاحي",introWillPlay:"قد يعمل المقطع المختار مرة واحدة بعد 5 ثوانٍ.",autoplayBlocked:"منع المتصفح التشغيل التلقائي. استمع عندما تكون مستعداً.",stopIntro:"إيقاف",proverbs623:"أمثال 6:23",lightWay:"التوراة · النور · طريق الحياة",
openNT:"افتح العهد الجديد",ntTitle:"العهد الجديد",ntLead:"اقرأ المقطع المختار باليونانية واستمع إليه بلا موسيقى خلفية.",
john2031:"يوحنا 20:31",writtenLife:"مكتوب · إيمان · حياة",
ntAudioNote:"قد يعمل المقطع المختار مرة واحدة بعد 5 ثوانٍ."
}};
let LANG=localStorage.getItem("luxdot.lang")||((navigator.language||"").startsWith("ar")?"ar":"en");
function t(k){return TX[LANG][k]||k}
function applyLang(){
 document.documentElement.lang=LANG;document.documentElement.dir=LANG==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-t]").forEach(e=>{e.textContent=t(e.dataset.t)});
 document.querySelectorAll("[data-ph]").forEach(e=>{e.placeholder=t(e.dataset.ph)});
 document.querySelectorAll("[data-lang]").forEach(e=>{e.textContent=LANG==="ar"?"EN":"ع"});
}
function toggleLang(){LANG=LANG==="ar"?"en":"ar";localStorage.setItem("luxdot.lang",LANG);applyLang();document.dispatchEvent(new Event("luxlang"))}
document.addEventListener("DOMContentLoaded",()=>{applyLang();document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=toggleLang)});
