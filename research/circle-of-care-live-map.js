(()=>{
'use strict';
const L10N={
 ar:{title:'دائرة الرعاية · شام + 25 كم',lead:'خريطة تفاعلية لجهات الرعاية العامة ضمن نطاق 25 كم، مع تصفية حسب الفئة والمنطقة.',eyebrow:'نقطة نور · دائرة الرعاية · 25 كم',search:'ابحث بالاسم أو الحاجة أو المدينة',allCats:'كل الفئات',allTowns:'كل المناطق',points:'نقطة',source:'المصدر / الموقع',loadFail:'تعذر تحميل الخريطة الجغرافية، والقائمة ما زالت متاحة.',km:'كم'},
 en:{title:'Circle of Care · Chaam + 25 km',lead:'An interactive map of public care organizations within 25 km, filterable by category and area.',eyebrow:'LuxDot · Circle of Care · 25 km',search:'Search by name, need or town',allCats:'All categories',allTowns:'All areas',points:'points',source:'Source / website',loadFail:'The geographic map could not be loaded; the list remains available.',km:'km'},
 nl:{title:'Zorgcirkel · Chaam + 25 km',lead:'Een interactieve kaart van publieke zorgorganisaties binnen 25 km, te filteren op categorie en gebied.',eyebrow:'Lichtpunt · Zorgcirkel · 25 km',search:'Zoek op naam, behoefte of plaats',allCats:'Alle categorieën',allTowns:'Alle gebieden',points:'punten',source:'Bron / website',loadFail:'De geografische kaart kon niet worden geladen; de lijst blijft beschikbaar.',km:'km'},
 id:{title:'Lingkar Kepedulian · Chaam + 25 km',lead:'Peta interaktif organisasi layanan dan kepedulian publik dalam radius 25 km, dapat disaring menurut kategori dan wilayah.',eyebrow:'LuxDot · Lingkar Kepedulian · 25 km',search:'Cari berdasarkan nama, kebutuhan, atau kota',allCats:'Semua kategori',allTowns:'Semua wilayah',points:'titik',source:'Sumber / situs',loadFail:'Peta geografis tidak dapat dimuat; daftar tetap tersedia.',km:'km'},
 jv:{title:'Lingkar Pangreksan · Chaam + 25 km',lead:'Peta interaktif organisasi pangreksan umum ing radius 25 km, bisa disaring miturut kategori lan wilayah.',eyebrow:'Titik Cahya · Lingkar Pangreksan · 25 km',search:'Goleki miturut jeneng, kabutuhan utawa kutha',allCats:'Kabeh kategori',allTowns:'Kabeh wilayah',points:'titik',source:'Sumber / situs',loadFail:'Peta geografis ora bisa dimuat; dhaptar isih kasedhiya.',km:'km'},
 he:{title:'מעגל הטיפול · חאם (Chaam) + 25 ק״מ',lead:'מפה אינטראקטיבית של ארגוני טיפול ציבוריים בטווח 25 ק״מ, עם סינון לפי קטגוריה ואזור.',eyebrow:'נקודת אור · מעגל הטיפול · 25 ק״מ',search:'חיפוש לפי שם, צורך או יישוב',allCats:'כל הקטגוריות',allTowns:'כל האזורים',points:'נקודות',source:'מקור / אתר',loadFail:'המפה הגאוגרפית לא נטענה; הרשימה עדיין זמינה.',km:'ק״מ'}
};
const CATS={
'Acquired brain injury':{ar:'إصابات الدماغ المكتسبة',nl:'Niet-aangeboren hersenletsel',jv:'Cedera otak sing dipikolehi',he:'פגיעה מוחית נרכשת',id:'Cedera otak didapat'},
'Animal rescue':{ar:'إنقاذ الحيوانات',nl:'Dierenopvang',jv:'Nylametake kewan',he:'הצלת בעלי חיים',id:'Penyelamatan hewan'},
'Animal rescue - donkeys':{ar:'إنقاذ الحمير',nl:'Ezelsopvang',jv:'Nylametake kuldi',he:'הצלת חמורים',id:'Penyelamatan keledai'},
'Carers':{ar:'دعم مقدمي الرعاية',nl:'Mantelzorgers',jv:'Dhukungan pangreksa',he:'תמיכה במטפלים',id:'Dukungan pengasuh'},
'Children / alternative care':{ar:'الأطفال والرعاية البديلة',nl:'Kinderen / alternatieve zorg',jv:'Bocah / pangreksan alternatif',he:'ילדים / טיפול חלופי',id:'Anak / pengasuhan alternatif'},
'Community / isolation':{ar:'المجتمع ومواجهة العزلة',nl:'Gemeenschap / isolement',jv:'Komunitas / kasepen',he:'קהילה / בדידות',id:'Komunitas / isolasi'},
'Community farm / food resilience':{ar:'مزرعة مجتمعية وأمن غذائي',nl:'Buurtboerderij / voedselzekerheid',jv:'Tani komunitas / ketahanan pangan',he:'חווה קהילתית / ביטחון מזון',id:'Pertanian komunitas / ketahanan pangan'},
'Companion animal partner':{ar:'شريك لرعاية الحيوانات الأليفة',nl:'Partner gezelschapsdieren',jv:'Mitra kewan ingon',he:'שותף לבעלי חיים ביתיים',id:'Mitra hewan pendamping'},
'Disability / autism / NAH':{ar:'الإعاقة والتوحد وإصابات الدماغ',nl:'Beperking / autisme / NAH',jv:'Disabilitas / autisme / cedera otak',he:'מוגבלות / אוטיזם / פגיעה מוחית',id:'Disabilitas / autisme / cedera otak'},
'Disability / day activity':{ar:'الإعاقة والأنشطة النهارية',nl:'Beperking / dagbesteding',jv:'Disabilitas / kegiatan awan',he:'מוגבלות / פעילות יום',id:'Disabilitas / kegiatan harian'},
'Disability / mental health':{ar:'الإعاقة والصحة النفسية',nl:'Beperking / geestelijke gezondheid',jv:'Disabilitas / kesehatan mental',he:'מוגבלות / בריאות הנפש',id:'Disabilitas / kesehatan mental'},
'Disability / older clients':{ar:'الإعاقة وكبار السن',nl:'Beperking / oudere cliënten',jv:'Disabilitas / wong tuwa',he:'מוגבלות / מבוגרים',id:'Disabilitas / klien lansia'},
'Disability / supported living':{ar:'الإعاقة والسكن المدعوم',nl:'Beperking / begeleid wonen',jv:'Disabilitas / omah sing didhukung',he:'מוגבלות / דיור נתמך',id:'Disabilitas / hunian didukung'},
'Domestic violence':{ar:'العنف الأسري',nl:'Huiselijk geweld',jv:'Kekerasan rumah tangga',he:'אלימות במשפחה',id:'Kekerasan dalam rumah tangga'},
'Elderly & dementia':{ar:'كبار السن والخرف',nl:'Ouderen & dementie',jv:'Wong tuwa lan demensia',he:'קשישים ודמנציה',id:'Lansia & demensia'},
'Elderly & residential care':{ar:'كبار السن والرعاية السكنية',nl:'Ouderen & woonzorg',jv:'Wong tuwa lan pangreksan omah',he:'קשישים וטיפול מגורים',id:'Lansia & perawatan hunian'},
'Elderly / loneliness':{ar:'كبار السن والوحدة',nl:'Ouderen / eenzaamheid',jv:'Wong tuwa / kasepen',he:'קשישים / בדידות',id:'Lansia / kesepian'},
'Elderly care':{ar:'رعاية كبار السن',nl:'Ouderenzorg',jv:'Pangreksan wong tuwa',he:'טיפול בקשישים',id:'Perawatan lansia'},
'End-of-life care':{ar:'رعاية نهاية الحياة',nl:'Palliatieve zorg',jv:'Pangreksan pungkasan urip',he:'טיפול סוף חיים',id:'Perawatan akhir hayat'},
'Faith / civic community partner':{ar:'شريك ديني ومجتمعي',nl:'Geloof / maatschappelijke partner',jv:'Iman / mitra masyarakat',he:'קהילת אמונה / שותף אזרחי',id:'Mitra komunitas iman / sipil'},
'Faith community / potential charity partner':{ar:'مجتمع ديني وشريك خيري محتمل',nl:'Geloofsgemeenschap / mogelijke liefdadigheidspartner',jv:'Komunitas iman / calon mitra amal',he:'קהילת אמונה / שותף צדקה אפשרי',id:'Komunitas iman / calon mitra amal'},
'Faith community / potential diaconal partner':{ar:'مجتمع ديني وشريك خدمة اجتماعية محتمل',nl:'Geloofsgemeenschap / mogelijke diaconale partner',jv:'Komunitas iman / calon mitra sosial',he:'קהילת אמונה / שותף דיאקוני אפשרי',id:'Komunitas iman / calon mitra diakonal'},
'Faith community / potential social partner':{ar:'مجتمع ديني وشريك اجتماعي محتمل',nl:'Geloofsgemeenschap / mogelijke sociale partner',jv:'Komunitas iman / calon mitra sosial',he:'קהילת אמונה / שותף חברתי אפשרי',id:'Komunitas iman / calon mitra sosial'},
'Farm / education animals':{ar:'مزرعة وحيوانات تعليمية',nl:'Boerderij / educatieve dieren',jv:'Tani / kewan edukasi',he:'חווה / בעלי חיים חינוכיים',id:'Peternakan / hewan edukasi'},
'Farm animal / local partner':{ar:'حيوانات المزارع وشريك محلي',nl:'Boerderijdieren / lokale partner',jv:'Kewan tani / mitra lokal',he:'חיות משק / שותף מקומי',id:'Hewan ternak / mitra lokal'},
'Farm animals / community':{ar:'حيوانات المزارع والمجتمع',nl:'Boerderijdieren / gemeenschap',jv:'Kewan tani / komunitas',he:'חיות משק / קהילה',id:'Hewan ternak / komunitas'},
'Home nursing':{ar:'التمريض المنزلي',nl:'Wijkverpleging',jv:'Perawatan omah',he:'סיעוד ביתי',id:'Perawatan di rumah'},
'Homelessness / social exclusion':{ar:'التشرد والإقصاء الاجتماعي',nl:'Dakloosheid / sociale uitsluiting',jv:'Ora duwe omah / pengucilan sosial',he:'חסרות בית / הדרה חברתית',id:'Tunawisma / eksklusi sosial'},
'Horse welfare / partner':{ar:'رعاية الخيول وشريك محتمل',nl:'Paardenwelzijn / partner',jv:'Kesejahteraan jaran / mitra',he:'רווחת סוסים / שותף',id:'Kesejahteraan kuda / mitra'},
'Mental health':{ar:'الصحة النفسية',nl:'Geestelijke gezondheid',jv:'Kesehatan mental',he:'בריאות הנפש',id:'Kesehatan mental'},
'Multi-support care':{ar:'رعاية متعددة الخدمات',nl:'Brede ondersteuning',jv:'Pangreksan multi-dhukungan',he:'טיפול רב-תחומי',id:'Layanan dukungan terpadu'},
'Poverty / food':{ar:'الفقر والغذاء',nl:'Armoede / voedsel',jv:'Kemiskinan / pangan',he:'עוני / מזון',id:'Kemiskinan / pangan'},
'Refugee support':{ar:'دعم اللاجئين',nl:'Vluchtelingenondersteuning',jv:'Dhukungan pengungsi',he:'סיוע לפליטים',id:'Dukungan pengungsi'},
'Refugees / asylum':{ar:'اللاجئون واللجوء',nl:'Vluchtelingen / asiel',jv:'Pengungsi / suaka',he:'פליטים / מקלט',id:'Pengungsi / suaka'},
'Reptiles / education':{ar:'الزواحف والتعليم',nl:'Reptielen / educatie',jv:'Reptil / edukasi',he:'זוחלים / חינוך',id:'Reptil / edukasi'},
'Social gateway':{ar:'بوابة الدعم الاجتماعي',nl:'Sociaal toegangspunt',jv:'Gerbang dhukungan sosial',he:'שער תמיכה חברתית',id:'Pintu akses sosial'},
'Supported living / disability':{ar:'السكن المدعوم والإعاقة',nl:'Begeleid wonen / beperking',jv:'Omah didhukung / disabilitas',he:'דיור נתמך / מוגבלות',id:'Hunian didukung / disabilitas'},
'Volunteer matching':{ar:'ربط المتطوعين',nl:'Vrijwilligersbemiddeling',jv:'Cocogake sukarelawan',he:'התאמת מתנדבים',id:'Pencocokan relawan'},
'Volunteer matching / mobility / language':{ar:'التطوع والتنقل واللغة',nl:'Vrijwilligers / mobiliteit / taal',jv:'Sukarelawan / mobilitas / basa',he:'התנדבות / ניידות / שפה',id:'Relawan / mobilitas / bahasa'},
'Volunteer social support':{ar:'الدعم الاجتماعي التطوعي',nl:'Vrijwillige sociale steun',jv:'Dhukungan sosial sukarela',he:'תמיכה חברתית בהתנדבות',id:'Dukungan sosial relawan'},
'Wildlife rescue':{ar:'إنقاذ الحياة البرية',nl:'Wildopvang',jv:'Nylametake satwa liar',he:'הצלת חיות בר',id:'Penyelamatan satwa liar'},
'Youth care':{ar:'رعاية الشباب',nl:'Jeugdzorg',jv:'Pangreksan nom-noman',he:'טיפול בנוער',id:'Perawatan pemuda'}
};
const points=Array.isArray(window.CARE_POINTS)?window.CARE_POINTS:[];
const q=document.getElementById('careSearch'),cat=document.getElementById('careCat'),town=document.getElementById('careTown'),list=document.getElementById('careList'),count=document.getElementById('visibleCount'),legend=document.getElementById('careLegend');
if(!q||!cat||!town||!list||!count)return;
const lang=()=>{const raw=localStorage.getItem('luxdot.lang');return raw==='id'?'id':(window.LuxLang?.get?.()||'en')};
const ui=()=>L10N[lang()]||L10N.en;
const catLabel=c=>lang()==='en'?c:(CATS[c]?.[lang()]||c);
function color(c){let h=0;for(const ch of String(c||''))h=(h*31+ch.charCodeAt(0))%360;return `hsl(${h} 58% 48%)`}
function token(c){return (catLabel(c).trim()[0]||'•').toUpperCase()}
function fit(){const z=q.value.trim().toLowerCase();return points.filter(p=>(!cat.value||p.category===cat.value)&&(!town.value||p.town===town.value)&&(!z||[p.name,p.town,p.location,p.category,p.serves,p.type,catLabel(p.category)].join(' ').toLowerCase().includes(z)))}
let map=null,markers=new Map(),layer=null;
function pin(c){const col=color(c);return L.divIcon({className:'care-pin-icon',html:`<span class="care-pin-shape" style="background:${col}"><b>${token(c)}</b></span>`,iconSize:[30,40],iconAnchor:[15,38],popupAnchor:[0,-34]})}
function popup(p){const u=ui();return `<div class="care-popup" dir="${['ar','he'].includes(lang())?'rtl':'ltr'}"><b>${p.name}</b><div class="cat">${catLabel(p.category)}</div><small>${p.town} · ${(Number(p.distance)||0).toFixed(1)} ${u.km}</small>${p.url?`<br><a href="${p.url}" target="_blank" rel="noopener">${u.source}</a>`:''}</div>`}
function renderList(f){const u=ui();list.innerHTML=f.map(p=>`<article class="care-card" data-care-id="${p.id}"><button class="care-card-main" type="button"><strong>${p.name}</strong><span>${p.town} · ${(Number(p.distance)||0).toFixed(1)} ${u.km}</span><small><i class="care-cat-dot" style="background:${color(p.category)}"></i>${catLabel(p.category)}</small></button>${p.url?`<a class="care-source" href="${p.url}" target="_blank" rel="noopener">${u.source} ↗</a>`:''}</article>`).join('');list.querySelectorAll('.care-card-main').forEach((b,i)=>b.addEventListener('click',()=>{const p=f[i],m=markers.get(Number(p.id));if(m){map.setView(m.getLatLng(),14,{animate:true});m.openPopup();document.getElementById('careLeafletMap').scrollIntoView({behavior:'smooth',block:'center'})}}))}
function draw(){const f=fit();count.textContent=f.length;renderList(f);if(!map)return;if(layer)layer.clearLayers();markers.clear();f.forEach(p=>{const m=L.marker([Number(p.lat),Number(p.lon)],{icon:pin(p.category)}).bindPopup(popup(p),{autoPan:true}).addTo(layer);markers.set(Number(p.id),m)});if(f.length){const g=L.featureGroup([...markers.values()]);try{map.fitBounds(g.getBounds().pad(.12),{maxZoom:13})}catch{}}}
function initSelects(){const u=ui();cat.innerHTML=`<option value="">${u.allCats}</option>`;[...new Set(points.map(p=>p.category).filter(Boolean))].sort().forEach(c=>cat.add(new Option(catLabel(c),c)));town.innerHTML=`<option value="">${u.allTowns}</option>`;[...new Set(points.map(p=>p.town).filter(Boolean))].sort().forEach(t=>town.add(new Option(t,t)))}
function initLegend(){const cats=[...new Set(points.map(p=>p.category).filter(Boolean))];legend.innerHTML=cats.map(c=>`<span><i style="background:${color(c)}"></i>${catLabel(c)}</span>`).join('')}
function translate(){const u=ui();const title=document.getElementById('careTitle'),lead=document.getElementById('careLead'),pw=document.getElementById('pointsWord'),eb=document.querySelector('.care-head .eyebrow');if(title)title.textContent=u.title;if(lead)lead.textContent=u.lead;if(pw)pw.textContent=u.points;if(eb)eb.textContent=u.eyebrow;q.placeholder=u.search;document.title=`${u.title} · LuxDot`;initSelects();initLegend();draw()}
function boot(){translate();if(window.L){map=L.map('careLeafletMap',{zoomControl:true}).setView([51.506,4.862],11);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);layer=L.layerGroup().addTo(map)}else document.getElementById('careLeafletMap').innerHTML=`<div class="care-noscript">${ui().loadFail}</div>`;[q,cat,town].forEach(x=>x.addEventListener(x===q?'input':'change',draw));draw()}
document.addEventListener('luxlang',()=>setTimeout(translate,0));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
