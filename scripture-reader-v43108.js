(()=>{'use strict';
const C=window.LUX_SCRIPTURE||{},$=s=>document.querySelector(s),SUP=['ar','en','nl','he'];
const UI={
 ar:{library:'المكتبة الدينية',reader:'لغة القارئ',original:'اللغة الأصلية',textlang:'لغة النص',follow:'حسب لغة الموقع',orig:'النص الأصلي',note:'لغة واجهة القارئ منفصلة عن لغة النص الأصلية. افتراضياً يعرض الكتاب باللغة المختارة للموقع، ويمكنك فتح الأصل بشكل مستقل.',source:'المصدر/الترجمة',load:'اختر كتاباً من الفهرس'},
 en:{library:'Sacred Library',reader:'Reader language',original:'Original language',textlang:'Text language',follow:'Follow website language',orig:'Original text',note:'The reader interface is separate from the text’s original language. By default the book follows the website language; the original can be opened independently.',source:'Source / edition',load:'Choose a book from the index'},
 nl:{library:'Religieuze bibliotheek',reader:'Leestaal',original:'Oorspronkelijke taal',textlang:'Teksttaal',follow:'Volg de taal van de website',orig:'Originele tekst',note:'De taal van de lezer staat los van de oorspronkelijke taal van de tekst. Standaard volgt het boek de taal van de website; het origineel kan apart worden geopend.',source:'Bron / editie',load:'Kies een boek uit de index'},
 he:{library:'ספרייה דתית',reader:'שפת הקורא',original:'שפת המקור',textlang:'שפת הטקסט',follow:'לפי שפת האתר',orig:'טקסט מקור',note:'שפת ממשק הקורא נפרדת משפת המקור. כברירת מחדל הספר מוצג בשפת האתר, וניתן לפתוח את המקור בנפרד.',source:'מקור / מהדורה',load:'בחר ספר מן הרשימה'}
};
const lang=()=>{let q=new URLSearchParams(location.search).get('lang'),s=localStorage.getItem('luxdot.lang');return SUP.includes(q)?q:SUP.includes(s)?s:'en'};
let mode='reader',idx=0;
function edition(){return mode==='original'?C.original:(C.editions[lang()]||C.editions.en)}
function bookLabel(b){return (b.names&&b.names[lang()])||b.name}
function loadBook(i){idx=i;document.querySelectorAll('.scr-books button').forEach((b,n)=>b.classList.toggle('active',n===i));let b=C.books[i],ed=edition();$('#scrFrame').src=ed.base+b.id+'.htm';$('#scrEdition').textContent=ed.label;$('#scrEditionLink').href=ed.source;$('#scrOriginalBadge').textContent=mode==='original'?((UI[lang()]||UI.en).original):((UI[lang()]||UI.en).reader)}
function render(){let u=UI[lang()]||UI.en;document.documentElement.lang=lang();document.documentElement.dir=(lang()==='ar'||lang()==='he')?'rtl':'ltr';$('#scrKicker').textContent=u.library;$('#scrTitle').textContent=(C.title&&C.title[lang()])||C.title.en;$('#scrIntro').textContent=(C.intro&&C.intro[lang()])||C.intro.en;$('#scrNote').textContent=u.note;$('#scrTextLangLabel').textContent=u.textlang;$('#scrMode').innerHTML=`<option value="reader">${u.follow}</option><option value="original">${u.orig}</option>`;$('#scrMode').value=mode;$('#scrSourceLabel').textContent=u.source+': ';let box=$('.scr-books');box.innerHTML='';C.books.forEach((b,i)=>{let x=document.createElement('button');x.textContent=bookLabel(b);x.onclick=()=>loadBook(i);box.appendChild(x)});loadBook(Math.min(idx,C.books.length-1))}
document.addEventListener('DOMContentLoaded',()=>{$('#scrMode').onchange=e=>{mode=e.target.value;loadBook(idx)};render()});
})();
