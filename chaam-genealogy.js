(async()=>{
 const root=document.querySelector('[data-genealogy]'); if(!root)return;
 const lang=(localStorage.getItem('luxdot.lang')||document.documentElement.lang||'en').split('-')[0];
 const L={ar:{title:'الرسم النسبي الأرشيفي لشام',sub:'قرابة مثبتة منفصلة عن الشهود والملكية والتجاور الأرشيفي',all:'الكل',kin:'القرابة فقط',archive:'مع الروابط الأرشيفية',person:'شخص',institution:'مؤسسة',place:'مكان',spouse:'زواج',parent:'والد/طفل',sib:'إخوة موثقون',land:'صلة أرض/جوار',source:'المصدر',conf:'الثقة',empty:'تعذر تحميل بيانات الرسم'},en:{title:'Chaam archival genealogical graph',sub:'Proven kinship kept separate from witnesses, land and archival co-occurrence',all:'All',kin:'Kinship only',archive:'Include archival links',person:'Person',institution:'Institution',place:'Place',spouse:'Marriage',parent:'Parent/child',sib:'Stated siblings',land:'Land/adjacency',source:'Source',conf:'Confidence',empty:'Could not load graph data'},nl:{title:'Archief-genealogische graaf van Chaam',sub:'Bewezen verwantschap apart van getuigen, grond en archiefcontext',all:'Alles',kin:'Alleen verwantschap',archive:'Met archiefkoppelingen',person:'Persoon',institution:'Instelling',place:'Plaats',spouse:'Huwelijk',parent:'Ouder/kind',sib:'Vermelde siblings',land:'Grond/nabijheid',source:'Bron',conf:'Zekerheid',empty:'Grafiekgegevens konden niet laden'},jv:{title:'Graf silsilah arsip Chaam',sub:'Paseduluran kabukten dipisah saka saksi, lemah lan konteks arsip',all:'Kabeh',kin:'Silsilah wae',archive:'Kalebu pranala arsip',person:'Wong',institution:'Lembaga',place:'Papan',spouse:'Bojowan',parent:'Wong tuwa/anak',sib:'Sedulur kasebut',land:'Lemah/jejere',source:'Sumber',conf:'Kapercayan',empty:'Data graf ora bisa dimuat'},he:{title:'גרף גנאלוגי־ארכיוני של שאם',sub:'קרבה מוכחת מופרדת מעדים, קרקע והקשר ארכיוני',all:'הכול',kin:'קרבה בלבד',archive:'כולל קישורים ארכיוניים',person:'אדם',institution:'מוסד',place:'מקום',spouse:'נישואין',parent:'הורה/ילד',sib:'אחים מצוינים',land:'קרקע/סמיכות',source:'מקור',conf:'ביטחון',empty:'לא ניתן לטעון את נתוני הגרף'}};
 const T=L[lang]||L.en;
 try{
  const data=await fetch('data/chaam-genealogy.json').then(r=>r.json());
  root.innerHTML=`<div class="cg-head"><div><div class="cg-kicker">GENEALOGY · 4.3.13</div><h2>${T.title}</h2><p>${T.sub}</p></div><div class="cg-controls"><button data-mode="kin" class="active">${T.kin}</button><button data-mode="all">${T.archive}</button></div></div><svg class="cg-svg" viewBox="0 0 1500 940" role="img"></svg><aside class="cg-detail"><div class="cg-empty">${T.all}</div></aside>`;
  const svg=root.querySelector('svg'), detail=root.querySelector('.cg-detail');
  const NS='http://www.w3.org/2000/svg';
  const positions={
   'dingeman-fransen':[130,85],'anna-simonis':[340,85],'franciscus-fransen-1633':[235,210],'adrianus-janssen-witness-1633':[470,210],
   'antonius-jansen-evers':[190,360],'catharina-jansen-de-bie':[420,360],'dingemannus-evers-1649':[305,500],
   'andreas-jansen':[610,360],'maria-lambrechts':[840,360],'joannes-andreas-1655':[725,500],
   'cornelia-jansen-kin':[1040,330],'adrianus-erven-gool':[1290,330],'petronilla-erven-1659':[980,500],'joanna-erven-1660':[1080,500],'joannes-erven-1662':[1180,500],'nicolaus-erven-1666':[1280,500],'catarina-erven-1666':[1380,570],'josina-erven-1666':[1190,610],
   'antonius-jansse':[250,670],'maria-jacobs':[490,670],'joannes-antonius-1671':[250,830],'jacobus-antonius-1675':[370,830],'adrianus-antonius-1678':[490,830],
   'jan-janssen-kin':[760,650],'anneken-janssen-kin':[700,790],'jenneken-janssen-kin':[840,790],'willem-janssen-kin':[770,900],
   'chaam-church-land':[1080,760],'tongerlo':[1320,760]
  };
  const kinTypes=new Set(['spouse','parent','sibling-stated']); let mode='kin';
  function draw(){svg.innerHTML='';
   const eg=document.createElementNS(NS,'g'), ng=document.createElementNS(NS,'g'); svg.append(eg,ng);
   data.edges.forEach(e=>{if(mode==='kin'&&!kinTypes.has(e.type))return;const a=positions[e.from],b=positions[e.to];if(!a||!b)return;const l=document.createElementNS(NS,'line');l.setAttribute('x1',a[0]);l.setAttribute('y1',a[1]);l.setAttribute('x2',b[0]);l.setAttribute('y2',b[1]);l.setAttribute('class',`cg-edge ${e.type}`);l.dataset.from=e.from;l.dataset.to=e.to;eg.append(l)});
   data.nodes.forEach(n=>{const p=positions[n.id];if(!p)return;if(mode==='kin'&&n.type!=='person')return;const g=document.createElementNS(NS,'g');g.setAttribute('class',`cg-node ${n.type}`);g.setAttribute('transform',`translate(${p[0]} ${p[1]})`);g.dataset.id=n.id;const r=n.type==='person'?33:40;g.innerHTML=`<circle r="${r}"></circle><text y="-2">${esc(n.name)}</text><text class="sub" y="15">${esc(n.baptism||n.period||n.place||'')}</text>`;g.addEventListener('click',()=>show(n));ng.append(g)});
  }
  function show(n){const links=data.edges.filter(e=>e.from===n.id||e.to===n.id);const sids=[...new Set(links.map(e=>e.source).filter(Boolean))];const srcs=data.sources.filter(s=>sids.includes(s.id));detail.innerHTML=`<div class="cg-kicker">${T[n.type]||n.type}</div><h3>${esc(n.name)}</h3><p>${esc(n.baptism?`Baptism: ${n.baptism}`:(n.period||''))}${n.place?` · ${esc(n.place)}`:''}</p><div class="cg-tags"><span>${T.conf}: ${n.confidence||'—'}</span>${n.religion?`<span>${esc(n.religion)}</span>`:''}</div><h4>${T.source}</h4>${srcs.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join('')||'—'}`}
  function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  root.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;root.querySelectorAll('[data-mode]').forEach(x=>x.classList.toggle('active',x===b));draw()});draw();
 }catch(e){root.innerHTML=`<p>${T.empty}</p>`}
})();
