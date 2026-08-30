(function(){
  const db=window.LUXDOT_MEMORY_DB;
  if(!db||!Array.isArray(db.nodes)) return;
  const ids=new Set(db.nodes.map(n=>n.id));
  const srcHRW={label:'Human Rights Watch — Syria: No Word on 4 Abducted Activists (9 Dec 2014)',url:'https://www.hrw.org/news/2014/12/09/syria-no-word-4-abducted-activists'};
  const srcAmnesty={label:'Amnesty International — Duma Four remain missing',url:'https://www.amnesty.org/en/documents/mde24/051/2014/en/'};
  const nodes=[
    {
      id:'douma-four',date:'2013-12-09',theme:'الاختفاء • حقوق الإنسان • العدالة بلا انتقائية',
      title:'مخطوفو دوما الأربعة (The Douma Four)',place:'دوما • الغوطة الشرقية • سوريا',lat:33.572,lon:36.402,
      status:'missing-abducted',
      summary:'في مساء 9 ديسمبر 2013 اقتحم مسلحون مكتب مركز توثيق الانتهاكات في دوما واختطفوا رزان زيتونة وسميرة الخليل ووائل حمادة وناظم حمادي. لم تظهر منذ ذلك الحين معلومة موثقة تحسم مصيرهم. يحفظ LuxDot حالتهم بوصفهم مخطوفين/مفقودين ومصيرهم غير معلوم، ولا يثبت الوفاة من دون دليل.',
      question:'كيف تُبنى عدالة سورية لا تنتقي الضحايا بحسب هوية الجاني؟',
      sources:[srcHRW,srcAmnesty],media:[],page:'douma-four-memory.html',
      dossier:'أربعة مدافعين عن الحقوق والعمل المدني اختفوا من مكان كان يفترض أن يكون مساحة لتوثيق الانتهاكات. هذا الملف لا يُغلق بالتخمين: الحقيقة عن المصير، المسؤولية، والمحاسبة تبقى أسئلة مفتوحة.'
    },
    {
      id:'samira-al-khalil',date:'2013-12-09',theme:'السجن السياسي • النساء • الذاكرة • الاختفاء',
      title:'سميرة الخليل (Samira al-Khalil)',place:'حمص → دمشق → دوما • سوريا',lat:33.572,lon:36.402,
      status:'missing-abducted',
      summary:'ناشطة سورية ومعارضة سياسية سابقة وسجينة بين 1987 و1991. عملت لاحقاً مع عائلات المعتقلين ونساء دوما، ووثقت الحياة تحت الحصار. اختُطفت في 9 ديسمبر 2013 مع رزان زيتونة ووائل حمادة وناظم حمادي، ولا يزال مصيرها غير معلوم.',
      question:'كيف نحفظ الإنسان قبل أن يتحول إلى مجرد اسم في قائمة المفقودين؟',
      sources:[{label:'Samira al-Khalil Association — Story',url:'https://samira-alkhalil.org/story/'},srcHRW,{label:'Yassin al-Haj Saleh — Samira Khalil',url:'https://yassinhs.com/samira-khalil/'}],media:[],page:'samira-al-khalil-memory.html',
      dossier:'في LuxDot لسميرة طبقتان منفصلتان: سيرة عامة موثقة بالمصادر، وذاكرة شخصية معلّمة بوضوح كشهادة مباشرة من رافي الحجي عن معرفته العائلية والاجتماعية بها قبل اختفائها.'
    },
    {
      id:'razan-zaitouneh',date:'2013-12-09',theme:'التوثيق • القانون • حقوق الإنسان • الاختفاء',
      title:'رزان زيتونة (Razan Zaitouneh)',place:'دمشق → دوما • سوريا',lat:33.572,lon:36.402,
      status:'missing-abducted',
      summary:'محامية ومدافعة عن حقوق الإنسان، من مؤسسي مركز توثيق الانتهاكات ولجان التنسيق المحلية. وثقت الانتهاكات من أطراف متعددة وتعرضت للتهديد. اختُطفت من مكتب VDC في دوما في 9 ديسمبر 2013 ولا يزال مصيرها غير معلوم.',
      question:'ماذا يعني التوثيق عندما يصرّ المدافع عن الحقوق على مساءلة جميع الأطراف؟',
      sources:[srcHRW,{label:'Human Rights Watch — Abducting the Messenger',url:'https://www.hrw.org/news/2013/12/11/dispatches-syria-abducting-messenger'}],media:[],page:'douma-four-memory.html#razan'
    },
    {
      id:'wael-hamada',date:'2013-12-09',theme:'المجتمع المدني • الإغاثة • الاختفاء',
      title:'وائل حمادة (Wael Hamada)',place:'دمشق → الغوطة الشرقية → دوما • سوريا',lat:33.572,lon:36.402,
      status:'missing-abducted',
      summary:'ناشط سوري وعضو مؤسس في لجان التنسيق المحلية ومركز توثيق الانتهاكات، وعمل في الإغاثة الإنسانية لسكان الغوطة الشرقية. اختُطف مع زوجته رزان زيتونة وسميرة الخليل وناظم حمادي في 9 ديسمبر 2013.',
      question:'كيف يصبح العمل المدني والإغاثي هدفاً للعنف في مناطق النزاع؟',sources:[srcHRW],media:[],page:'douma-four-memory.html#wael'
    },
    {
      id:'nazem-hammadi',date:'2013-12-09',theme:'القانون • الشعر • الدفاع عن المعتقلين • الاختفاء',
      title:'ناظم حمادي (Nazem Hammadi)',place:'سوريا → دوما • الغوطة الشرقية',lat:33.572,lon:36.402,
      status:'missing-abducted',
      summary:'محامٍ وشاعر ومدافع عن المعتقلين السياسيين، ساهم في العمل المدني والإنساني في الغوطة الشرقية. اختُطف مع رفاقه من مكتب مركز توثيق الانتهاكات في دوما في 9 ديسمبر 2013، ولا يزال مصيره غير معلوم.',
      question:'كيف نحفظ صوت من كان يدافع عن حق الآخرين في الكلام والحرية؟',sources:[srcHRW],media:[],page:'douma-four-memory.html#nazem'
    }
  ];
  nodes.forEach(n=>{if(!ids.has(n.id)){db.nodes.push(n);ids.add(n.id)}});
  if(db.meta){db.meta.version='2026.08.30-douma-four-4.18.55';db.meta.range='2013-12-09/2026-09-30';}
})();
