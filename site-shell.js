(()=>{
'use strict';
const SUP=['ar','en','nl','jv','he'];
const DIR={ar:'rtl',en:'ltr',nl:'ltr',jv:'ltr',he:'rtl'};
const B={ar:'نقطة نور',en:'LuxDot',nl:'Lichtpunt',jv:'Titik Cahya',he:'נקודת אור'};
const N={
 ar:{home:'الرئيسية',library:'المكتبة',faith:'الإيمان والحكمة',nusantara:'الأرخبيل الإندونيسي',memory:'الذاكرة',research:'الأبحاث',projects:'المشاريع',back:'عودة',lang:'اللغة'},
 en:{home:'Home',library:'Library',faith:'Faith & Wisdom',nusantara:'Nusantara',memory:'Memory',research:'Research',projects:'Projects',back:'Back',lang:'Language'},
 nl:{home:'Home',library:'Bibliotheek',faith:'Geloof & wijsheid',nusantara:'Nusantara',memory:'Geheugen',research:'Onderzoek',projects:'Projecten',back:'Terug',lang:'Taal'},
 jv:{home:'Ngarep',library:'Pustaka',faith:'Iman lan kawicaksanan',nusantara:'Nusantara',memory:'Pangeling',research:'Panliten',projects:'Proyek',back:'Bali',lang:'Basa'},
 he:{home:'ראשי',library:'ספרייה',faith:'אמונה וחכמה',nusantara:'נוסנטרה',memory:'זיכרון',research:'מחקר',projects:'פרויקטים',back:'חזרה',lang:'שפה'}
};
const LANGNAME={ar:'العربية',en:'English',nl:'Nederlands',jv:'Basa Jawa',he:'עברית'};
function lang(){const x=(window.LuxLang&&window.LuxLang.get())||document.documentElement.lang||'en';return SUP.includes(x)?x:'en'}
function rootPrefix(){return location.pathname.includes('/research/savior/')?'../../':location.pathname.includes('/research/')?'../':''}
function rebuildHeader(){
 let h=document.querySelector('header.top'); if(!h){h=document.createElement('header');h.className='top';document.body.prepend(h)}
 const l=lang(),n=N[l],p=rootPrefix();
 h.innerHTML=`<div class="wrap topin lux-shell-topin"><a class="logo" data-lux-brand href="${p}home.html">${B[l]}</a><nav class="nav lux-shell-nav" aria-label="${n.lang}"><a href="${p}home.html">${n.home}</a><a href="${p}library.html">${n.library}</a><a href="${p}faith.html">${n.faith}</a><a href="${p}nusantara.html">${n.nusantara}</a><a href="${p}memory.html">${n.memory}</a><a href="${p}research.html">${n.research}</a><a href="${p}projects.html">${n.projects}</a><select class="lang lang-select" data-lang-select aria-label="${n.lang}">${SUP.map(x=>`<option value="${x}"${x===l?' selected':''}>${LANGNAME[x]}</option>`).join('')}</select></nav></div>`;
 const sel=h.querySelector('select');sel?.addEventListener('change',e=>{window.LuxLang?.set(e.target.value,true);location.reload()});
}
const SUM={
 'erasmus.html':{
  jv:['Erasmus · jembatan, pilihan lan tanggung jawab','Panliten urip iki nyinaoni tabrakan trem ing Erasmusbrug minangka kedadeyan modern sing kudu diterangake dhisik nganggo bukti teknis lan investigasi resmi. Jeneng Erasmus banjur digunakake minangka lapisan filsafat babagan karsa bebas, tanggung jawab lan kapan kudu mandheg. Ora ana klaim manawa Erasmus prédhiksi kacilakan iki.','Fakta luwih dhisik · makna sawise bukti','Asil investigasi resmi tetep dadi patokan kanggo ngowahi utawa mbatalake hipotesis simbolik.'],
  he:['ארסמוס · גשר, בחירה ואחריות','מחקר חי זה בוחן את התנגשות החשמליות בגשר ארסמוס כאירוע מודרני שיש להסביר קודם כול באמצעות ראיות טכניות וחקירה רשמית. שמו של ארסמוס משמש לאחר מכן כשכבה פילוסופית על רצון חופשי, אחריות והיכולת לעצור בזמן. אין טענה שארסמוס חזה את התאונה.','עובדות תחילה · משמעות לאחר הראיות','מסקנות החקירה הרשמית הן אמת המידה לעדכון או לדחייה של ההשערה הסמלית.']},
 'shaam-breda.html':{
  jv:['Atlas Urip Chaam–Breda','Panliten iki nyambungake sejarah lokal, Nassau, memori perang, rekonsiliasi, alam lan perawatan marang wong sing ringkih. Papan ora dianggep suci saka wiwitan; pitakoné yaiku apa sing ndadekake sawijining papan pantes dirumat kanthi martabat lan memori.','Lapisan: sejarah · perawatan · alam · rekonsiliasi · tradhisi agama','Saben hubungan kudu dibedakake antarane fakta, tradhisi, hipotesis lan bukti sing mbantah.'],
  he:['האטלס החי של חאם–ברדה','מחקר זה מחבר היסטוריה מקומית, נאסאו, זיכרון מלחמה, פיוס, טבע ודאגה לחלשים. המקום אינו מוגדר מראש כקדוש; השאלה היא מה הופך מקום לראוי ליחס של כבוד, זיכרון ואחריות.','שכבות: היסטוריה · דאגה · טבע · פיוס · מסורות דתיות','כל קשר מסומן בנפרד כעובדה, מסורת, השערה או ראיה סותרת.']},
 'savior-atlas.html':{
  jv:['Atlas Global babagan tradhisi penyelamat','Atlas iki mbandhingake gambaran penyelamat, tokoh akhir jaman lan reformasi ing macem-macem tradhisi. Tujuane dudu mbuktekake identitas wong tartamtu, nanging mriksa syarat saben tradhisi lan nyathet titik sing cocog utawa bertentangan.','Aturan utama: syarat identitas sing cetha luwih kuwat tinimbang pepadhan moral umum','Hipotesis pribadi kudu mudhun yen teks utawa tradhisi nduweni syarat sing bertentangan.'],
  he:['האטלס העולמי של מסורות גאולה','האטלס משווה תפיסות של מושיע, אחרית הימים ורפורמה במסורות שונות. מטרתו אינה להוכיח זהות של אדם מסוים אלא לבדוק את תנאי כל מסורת ולתעד התאמות וגם סתירות.','כלל מרכזי: תנאי זהות מפורשים קודמים לדמיון מוסרי כללי','השערה אישית נחלשת כאשר הטקסט או המסורת מציבים תנאים סותרים.']},
 'urania-nassau.html':{
  jv:['Urania × Nassau','Panliten iki mbenerake kebingungan antarane Urania minangka figur klasik lan sastra, lan wangsa Nassau minangka jaringan sejarah ing Breda. Ora ana bukti sing wis ditemokake kanggo putri sejarah kanthi jeneng “Urania van Nassau” sing lair ing Chaam taun 1858.','Hubungan sing kuwat: Nassau · Breda · sejarah kulawarga lan politik','Pepadhan jeneng Urania lan Oranje ora dianggep bukti asal tembung utawa garis keturunan.'],
  he:['אורניה × נאסאו','מחקר זה מתקן את הבלבול בין אורניה כדמות קלאסית וספרותית לבין בית נאסאו כרשת היסטורית הקשורה לברדה. לא נמצא בסיס אמין לנסיכה היסטורית בשם “Urania van Nassau” שנולדה בחאם בשנת 1858.','הקשר החזק: נאסאו · ברדה · היסטוריה משפחתית ופוליטית','הדמיון בין Urania ל‑Oranje אינו ראיה למקור לשוני משותף או לקשר שושלתי.']},
 'hendrick-busman.html':{
  jv:['Hendrik Busman lan ziarah Kevelaer','Tradhisi Kevelaer nyritakake manawa Hendrik Busman krungu panggilan kanggo mbangun kapel sekitar taun 1641 lan gambar Maria cilik dipasang taun 1642. Panliten LuxDot misahake tradhisi iman, bukti sejarah, praktik ziarah lan pengalaman lapangan.','Breda duwe tradhisi ziarah menyang Kevelaer wiwit taun 1719','Kesaksian agama dicathet minangka tradhisi urip, dudu bukti otomatis kanggo klaim gaib.'],
  he:['הנדריק בוסמן והעלייה לרגל לקוולאר','מסורת קוולאר מספרת כי הנדריק בוסמן שמע קריאה לבנות קפלה סביב 1641 וכי דמות מרים קטנה הוצבה בשנת 1642. מחקר LuxDot מפריד בין מסורת אמונית, ראיות היסטוריות, פרקטיקת עלייה לרגל ותצפית שדה.','לברדה מסורת עלייה לרגל לקוולאר מאז 1719','עדות דתית מתועדת כמסורת חיה ואינה הופכת אוטומטית להוכחה לטענה על־טבעית.']},
 'kevelaer-chaam-timeline.html':{
  jv:['Kevelaer ↔ Chaam · garis wektu','Garis wektu iki ngatur hubungan sejarah antarane ziarah Kevelaer, Breda lan wilayah Chaam. Tanggal lan sumber dipisahake saka interpretasi simbolik supaya urutan kedadeyan bisa dipriksa maneh.','Wektu · papan · sumber · tingkat kapercayan','Pepadhan tanggal ora dianggep hubungan sebab-akibat tanpa sumber mandiri.'],
  he:['קוולאר ↔ חאם · ציר זמן','ציר זמן זה מסדר את הקשרים ההיסטוריים בין העלייה לרגל לקוולאר, ברדה ואזור חאם. תאריכים ומקורות מופרדים מפרשנות סמלית כדי שאפשר יהיה לבדוק מחדש את רצף האירועים.','זמן · מקום · מקור · רמת ביטחון','זהות בתאריך אינה נחשבת לקשר סיבתי ללא מקור עצמאי.']},
 'hoogstraten.html':{
  jv:['Hoogstraten · greja, getih lan tapel wates','Panliten iki nyinaoni Sint-Katharinakerk minangka simpul memori: lapisan greja lawas, patron bangsawan, tradhisi Getih Suci saka Boxtel, ziarah lintas tapel wates, perang lan rekonstruksi.','Hubungan utama: 1380 · 1648–1652 · 1944 · memori urip','Tradhisi mukjizat disimpen minangka tradhisi agama; sejarah transfer relik lan perang diuji nganggo sumber.'],
  he:['הוגסטראטן · כנסייה, דם וגבול','מחקר זה בוחן את כנסיית סנט קתרינה כצומת זיכרון: שכבות של כנסיות קדומות, פטרונות אצולה, מסורת הדם הקדוש מבוקסטל, עלייה לרגל חוצת גבולות, מלחמה ושיקום.','צירים מרכזיים: 1380 · 1648–1652 · 1944 · זיכרון חי','מסורת הנס נשמרת כמסורת דתית; העברת השריד והיסטוריית המלחמה נבדקות באמצעות מקורות.']},
 'sacred-120km-network.html':{
  jv:['Atlas Jaringan Chaam–Brabant · 120 km','Atlas iki nyambungake Chaam, Ulicoten, Baarle, Galder, Hoogstraten, Alphen, Bavel, Gilze lan Ulvenhout liwat sejarah tapel wates, ziarah, Nassau, arkeologi lan perang. Taun 1648 dadi simpul panjelasan utama kanggo akeh owah-owahan institusi agama.','1648 nerangake akeh pola luwih apik tinimbang maca minangka pratandha rahasia','1944 uga diuji dhisik liwat fungsi militèr menara lan garis ngarep.'],
  he:['אטלס רשת שאם–בראבנט · 120 ק״מ','האטלס מחבר את חאם, אוליקוטן, בארלה, גלדר, הוגסטראטן, אלפן, באוול, חילזה ואולבנהאוט דרך גבולות, עלייה לרגל, נאסאו, ארכאולוגיה ומלחמה. שנת 1648 היא צומת הסבר מרכזי לשינויים דתיים ומוסדיים רבים.','1648 מסבירה דפוסים רבים טוב יותר מקריאה שלהם כסימן נסתר','גם 1944 נבחנת תחילה דרך התפקיד הצבאי של מגדלים וקווי חזית.']},
 'projects.html':{
  jv:['Proyek','Bagéan iki mung kanggo karya sing dadi tumindak nyata. Panliten urip tetep ana ing ruang panliten.','Lingkaran Perawatan · Chaam + 50 km core','Jaringan lapangan kanggo nyambungake organisasi umum, kebutuhan sing wis diverifikasi lan pitulungan sing tanggung jawab.'],
  he:['פרויקטים','כאן נמצאת רק עבודה שהופכת לפעולה ממשית בשטח. המחקר החי נשאר במרחב המחקר.','מעגל הדאגה · חאם + ליבה 50 ק״מ','רשת שטח המחברת ארגונים ציבוריים, צרכים מאומתים וסיוע אחראי.']}
};
const TRAD={christianity:{jv:'Kristen',he:'נצרות'},'islam-sunni':{jv:'Islam Sunni',he:'אסלאם סוני'},'islam-twelver':{jv:'Islam Syiah Imam Rolas',he:'אסלאם שיעי תריסרי'},judaism:{jv:'Yudaisme',he:'יהדות'},hinduism:{jv:'Hindu',he:'הינדואיזם'},buddhism:{jv:'Buddha',he:'בודהיזם'},bahai:{jv:'Bahá’í',he:'בהאאיות'},zoroastrianism:{jv:'Zoroastrian',he:'זורואסטריות'},javanese:{jv:'Tradhisi Jawa',he:'מסורות ג׳אווניות'},caodai:{jv:'Cao Đài',he:'קאו דאי'},daesoon:{jv:'Daesoon Jinrihoe',he:'דאסון ג׳ינריהווה'},sikhism:{jv:'Sikh',he:'סיקיזם'},jainism:{jv:'Jain',he:'ג׳ייניזם'},'secular-humanism':{jv:'Humanisme sekuler',he:'הומניזם חילוני'},'confucian-daoist':{jv:'Konfusian lan Dao',he:'קונפוציאניזם ודאואיזם'}};
function localizedLegacy(){
 if(document.body?.dataset.noLegacySummary==='1'||document.body?.dataset.fullLocales==='1')return;
 const l=lang(); if(!['jv','he'].includes(l))return;
 const file=location.pathname.split('/').pop()||'';
 const FULL5=new Set(['home.html','library.html','research.html','projects.html','circle-of-care-25km-original.html','burckhardt.html','african-association.html','faith.html','nusantara.html','index.html']);
 let entry=SUM[file]?.[l];
 if(location.pathname.includes('/research/savior/')){
   const id=file.replace('.html',''),name=TRAD[id]?.[l]||id;
   entry=l==='jv'?[`${name} · dossier perbandingan`,`Dossier iki mriksa apa sing tenan dikandhakake tradhisi ${name} babagan penyelamat, reformasi utawa akhir jaman. Syarat identitas sing eksplisit luwih penting tinimbang pepadhan moral umum.`,`Metode: sumber · konteks · syarat identitas · bukti sing mbantah`,`Ora ana pepadhan pribadi sing dianggep bukti yen syarat tradhisi ora cocog.`]:[`${name} · תיק השוואתי`,`תיק זה בודק מה המסורת ${name} אומרת בפועל על גאולה, רפורמה או אחרית הימים. תנאי זהות מפורשים חשובים יותר מדמיון מוסרי כללי.`,`שיטה: מקור · הקשר · תנאי זהות · ראיות סותרות`,`אין לראות בדמיון אישי הוכחה כאשר תנאי המסורת אינם מתקיימים.`];
 }
 if(!entry&&!FULL5.has(file)){
   const proper=(document.title||file.replace('.html','')).split('·')[0].trim();
   entry=l==='jv'?[proper||'Dossier LuxDot','Kanggo njaga kemurnian basa, kaca warisan iki ora maneh nuduhake isi Inggris utawa Arab minangka fallback. Ringkesan lan antarmuka ditampilake nganggo Basa Jawa, dene sumber asli tetep dadi referensi riset.','Versi basa sing aman','Teks saka basa liya mung ditampilake yen pancen dadi sumber asli lan diwenehi konteks nganggo basamu.']:[proper||'תיק LuxDot','כדי לשמור על טוהר השפה, תיק מורשת זה אינו מציג עוד תוכן אנגלי או ערבי כברירת מחדל. התקציר והממשק מוצגים בעברית, בעוד המקורות המקוריים נשמרים כהפניות מחקר.','גרסה בטוחה מבחינת שפה','טקסט בשפה אחרת מוצג רק כאשר הוא מקור ראשוני ונלווה לו הקשר בשפתך.'];
 }
 if(!entry)return;
 document.querySelectorAll('main,.hero').forEach(e=>e.remove());
 const host=document.createElement('main');host.className='wrap lux-localized-legacy';host.innerHTML=`<section class="hero"><div class="lux-kicker">LUXDOT · ${l==='jv'?'PANLITEN URIP':'מחקר חי'}</div><h1>${entry[0]}</h1><p class="lead">${entry[1]}</p></section><section class="cards"><article class="card"><h2>${entry[2]}</h2><p>${entry[3]}</p></article><article class="card"><h2>${l==='jv'?'Wates metodologi':'גבול מתודולוגי'}</h2><p>${l==='jv'?'Fakta, tradhisi agama, hipotesis lan bukti sing mbantah dijaga minangka lapisan sing beda.':'עובדות, מסורת דתית, השערות וראיות סותרות נשמרות כשכבות נפרדות.'}</p></article></section></main>`;
 (document.querySelector('header.top')||document.body.firstElementChild)?.insertAdjacentElement('afterend',host);
}
function purity(){
 const l=lang(); if(l==='ar')return;
 const foreign=l==='he'?/[\u0600-\u06FF]/:/[\u0600-\u06FF\u0750-\u077F]/;
 document.querySelectorAll('body *').forEach(el=>{
  if(el.closest('script,style,select,.original-text,[data-original-language],[lang="ar"]'))return;
  if(el.children.length===0&&foreign.test(el.textContent||'')){
    if((el.textContent||'').includes('رافي عبد السميع الحجي'))el.textContent=(el.textContent||'').replaceAll('رافي عبد السميع الحجي',l==='he'?"ראפי עבד אל-סמיע אל-חאג'י":'Rafy Alhajji');
  }
 });
}
function apply(){document.documentElement.lang=lang();document.documentElement.dir=DIR[lang()];document.body?.setAttribute('data-lang',lang());rebuildHeader();localizedLegacy();document.body?.classList.add('lux-lang-ready');setTimeout(purity,30)}
document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,90));window.addEventListener('luxlang',()=>setTimeout(apply,20));
})();
