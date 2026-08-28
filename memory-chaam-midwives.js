(function(){
  const db=window.LUXDOT_MEMORY_DB;
  if(!db||!Array.isArray(db.nodes)) return;
  const ids=new Set(db.nodes.map(n=>n.id));
  const nodes=[
    {
      id:'tetje-de-vries-chaam',date:'2026-08-17',theme:'الخدمة • الولادة • ذاكرة شام',title:'تيتجه دي فريس (Tetje de Vries)',place:'شام (Chaam) • هولندا',status:'documented',
      summary:'يوثق شاهد قبر Tetje de Vries أنها عاشت بين 30 ديسمبر 1885 و23 يونيو 1947 وعملت قابلة لبلدية شام. كما تسميها لوحة شكر محلية من Heemkundekring Ledevaert مع Barbiers وتصف خدمتهما للأمهات والأطفال، بما في ذلك الخروج ليلاً عند الحاجة.',
      question:'كيف تحفظ ذاكرة المكان أثر العمل اليومي الذي خدم الأمهات والأطفال قبل أن يصبح جزءاً من التاريخ المكتوب؟',
      image:'assets/images/memory/chaam/tetje-de-vries-grave.jpg',imageCredit:'تصوير ميداني أصلي لـ LuxDot — شام، أغسطس 2026',sources:[],media:[],page:'tetje-de-vries-memory.html',
      dossier:'ملف ميداني مستقل يضم صورة القبر الأصلية وصورة لوحة الشكر، ويربط سيرة Tetje de Vries بملف Barbiers بوصفهما عقدتين مترابطتين في ذاكرة الخدمة والولادة في شام.'
    },
    {
      id:'barbiers-chaam',date:'2026-08-26',theme:'الخدمة • الولادة • ذاكرة شام',title:'باربييرس (Barbiers) — قابلة شام',place:'شام (Chaam) • هولندا',status:'documented',
      summary:'توثق لوحة Heemkundekring Ledevaert خدمة Barbiers وDe Vries للأمهات في شام، وتذكر خروجهما ليلاً عند الحاجة وفترة تقارب 1920–1950 ومساعدتهما في ولادة قرابة 2000 طفل. ويحفظ القبر العبارة الواضحة: HAAR LEVEN WAS DIENEN — كانت حياتها خدمة.',
      question:'كيف يمكن لشاهد صغير في مقبرة محلية أن يعيد إلى الذاكرة عملاً إنسانياً امتد لعقود؟',
      image:'assets/images/memory/chaam/barbiers-grave.jpg',imageCredit:'تصوير ميداني أصلي لـ LuxDot — شام، أغسطس 2026',sources:[],media:[],page:'barbiers-memory.html',
      dossier:'ملف ميداني مستقل يضم صورة القبر الأصلية وصورة لوحة الشكر، ويربط Barbiers مباشرة بملف Tetje de Vries. التفاصيل الباهتة في نقش القبر لا تُثبت نصياً إلى أن تتوفر قراءة أو وثيقة أوضح.'
    }
  ];
  nodes.forEach(n=>{if(!ids.has(n.id)) db.nodes.push(n)});
  if(db.meta) db.meta.range='2026-07-10/2026-09-30';
})();
