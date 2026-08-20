(() => {
  'use strict';

  const root = document.querySelector('[data-research-graph]');
  if (!root) return;

  const UI = {
    ar: {
      title: 'طريقة عرض الأبحاث',
      hint: 'نفس البيانات · ثلاث طرق للرؤية · الاختيار والفلاتر يبقون محفوظين',
      sky: 'السماء',
      universe: 'الكون',
      circuit: 'الدارة',
      signal: 'SIGNAL PULSE',
      hierarchy: ['مجرة', 'عنقود', 'نظام', 'كوكب', 'قمر', 'كويكب'],
      circuitBus: ['MEMORY', 'PROPHECY', 'PEOPLE', 'PLACES', 'SCRIPTURES', 'EVIDENCE']
    },
    en: {
      title: 'Research view',
      hint: 'Same data · three visual models · selection and filters stay in context',
      sky: 'SKY',
      universe: 'UNIVERSE',
      circuit: 'CIRCUIT',
      signal: 'SIGNAL PULSE',
      hierarchy: ['Galaxy', 'Cluster', 'System', 'Planet', 'Moon', 'Asteroid'],
      circuitBus: ['MEMORY', 'PROPHECY', 'PEOPLE', 'PLACES', 'SCRIPTURES', 'EVIDENCE']
    },
    nl: {
      title: 'Onderzoeksweergave',
      hint: 'Dezelfde data · drie visuele modellen · selectie en filters blijven behouden',
      sky: 'HEMEL',
      universe: 'HEELAL',
      circuit: 'CIRCUIT',
      signal: 'SIGNAL PULSE',
      hierarchy: ['Melkweg', 'Cluster', 'Systeem', 'Planeet', 'Maan', 'Asteroïde'],
      circuitBus: ['GEHEUGEN', 'PROFETIE', 'MENSEN', 'PLAATSEN', 'TEKSTEN', 'BEWIJS']
    },
    he: {
      title: 'תצוגת מחקר',
      hint: 'אותם נתונים · שלושה מודלים חזותיים · הבחירה והמסננים נשמרים',
      sky: 'שמיים',
      universe: 'יקום',
      circuit: 'מעגל',
      signal: 'SIGNAL PULSE',
      hierarchy: ['גלקסיה', 'צביר', 'מערכת', 'כוכב לכת', 'ירח', 'אסטרואיד'],
      circuitBus: ['זיכרון', 'נבואה', 'אנשים', 'מקומות', 'כתבים', 'ראיות']
    }
  };

  const FAMILY_NAMES = {
    meaning: {ar:'الإنسان والمعنى', en:'Human & Meaning', nl:'Mens & Betekenis', he:'אדם ומשמעות'},
    judaism:{ar:'اليهودية والسفارديم', en:'Judaism & Sephardim', nl:'Jodendom & Sefardim', he:'יהדות וספרדים'},
    land:{ar:'الأرض والحدود', en:'Land & Borders', nl:'Land & Grenzen', he:'ארץ וגבולות'},
    pilgrimage:{ar:'الحج والإشارة', en:'Pilgrimage & Signal', nl:'Bedevaart & Signaal', he:'עלייה לרגל ואות'},
    choice:{ar:'الاختيار والمسؤولية', en:'Choice & Responsibility', nl:'Keuze & Verantwoordelijkheid', he:'בחירה ואחריות'},
    journeys:{ar:'رحلات المعرفة', en:'Knowledge Journeys', nl:'Kennisreizen', he:'מסעות ידע'},
    lineage:{ar:'العائلات والمؤسسات', en:'Families & Institutions', nl:'Families & Instellingen', he:'משפחות ומוסדות'},
    good:{ar:'أهل المعروف', en:'Everyday Good', nl:'Mensen van goedheid', he:'אנשי חסד'}
  };

  const state = {
    mode: localStorage.getItem('luxdot.research.view.v2') || 'sky',
    selectedId: null
  };

  const lang = (() => {
    const q = new URLSearchParams(location.search).get('lang');
    const raw = (q || document.documentElement.lang || 'en').toLowerCase();
    return UI[raw] ? raw : 'en';
  })();
  const T = UI[lang] || UI.en;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  function mk(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }

  function installSwitcher() {
    if ($('.rg-view-switch', root)) return;
    const toolbar = $('.rg-toolbar', root);
    if (!toolbar) return;

    const box = mk('section', 'rg-view-switch');
    box.setAttribute('aria-label', T.title);

    const copy = mk('div', 'rg-view-switch-copy');
    copy.append(mk('b', '', T.title), mk('small', '', T.hint));

    const tabs = mk('div', 'rg-view-tabs');
    [
      ['sky', T.sky],
      ['universe', T.universe],
      ['circuit', T.circuit]
    ].forEach(([mode, label]) => {
      const b = mk('button', 'rg-view-tab', label);
      b.type = 'button';
      b.dataset.researchView = mode;
      b.setAttribute('aria-pressed', 'false');
      tabs.append(b);
    });

    box.append(copy, tabs);
    toolbar.before(box);

    tabs.addEventListener('click', e => {
      const b = e.target.closest('[data-research-view]');
      if (!b) return;
      setMode(b.dataset.researchView, true);
    });
  }

  function hiddenLayoutButton(layout) {
    return $(`.rg-layout-modes [data-layout="${layout}"]`, root);
  }

  function clickInternalLayout(layout) {
    const b = hiddenLayoutButton(layout);
    if (b) b.click();
  }

  function clearVisualAugmentation() {
    $$('.rg-cosmos-legend,.rg-circuit-legend,.rg-view-badge', root).forEach(x => x.remove());
    $$('.rg-circuit-board,.rg-universe-clusters', root).forEach(x => x.remove());
    $$('.rg-orbit-ring,.rg-chip-body,.rg-chip-pins', root).forEach(x => x.remove());
    $$('.rg-node', root).forEach(n => {
      n.classList.remove('rg-role-system','rg-role-planet','rg-role-moon','rg-role-asteroid','rg-role-chip','rg-role-transistor');
      const label = $('.rg-star-label', n);
      if (label && label.dataset.originalY) label.setAttribute('y', label.dataset.originalY);
    });
  }

  function nodeMap() {
    return new Map($$('.rg-node[data-id]', root).map(n => [n.dataset.id, n]));
  }

  function edges() {
    return $$('.rg-edge[data-a][data-b]', root);
  }

  function degrees() {
    const d = new Map();
    edges().forEach(e => {
      d.set(e.dataset.a, (d.get(e.dataset.a) || 0) + 1);
      d.set(e.dataset.b, (d.get(e.dataset.b) || 0) + 1);
    });
    return d;
  }

  function classifyNodes() {
    const deg = degrees();
    $$('.rg-node[data-id]', root).forEach(n => {
      const kind = n.dataset.kind || '';
      const conf = n.dataset.confidence || 'B';
      const degree = deg.get(n.dataset.id) || 0;
      let role;
      if (kind === 'hub' || degree >= 8) role = 'system';
      else if (kind === 'research') role = 'planet';
      else if (conf === 'D' || conf === 'E') role = 'asteroid';
      else role = 'moon';
      n.classList.add(`rg-role-${role}`);
    });
  }

  function addUniverseDecor() {
    classifyNodes();

    const svg = $('.rg-canvas', root);
    const bg = $('.rg-sky-dust', root);
    if (!svg || !bg) return;

    // Dense hubs become visual cluster anchors.
    const deg = degrees();
    const clusterGroup = document.createElementNS(SVG_NS, 'g');
    clusterGroup.setAttribute('class', 'rg-universe-clusters');
    $$('.rg-node[data-id]', root)
      .filter(n => (deg.get(n.dataset.id) || 0) >= 8 && n.dataset.id !== 'luxdot')
      .forEach(n => {
        const m = (n.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/);
        if (!m) return;
        const c = document.createElementNS(SVG_NS, 'circle');
        c.setAttribute('cx', m[1]);
        c.setAttribute('cy', m[2]);
        c.setAttribute('r', '72');
        c.setAttribute('class', 'rg-cluster-ring');
        clusterGroup.append(c);
      });
    bg.after(clusterGroup);

    $$('.rg-node[data-id]', root).forEach(n => {
      if (!n.classList.contains('rg-role-system') && !n.classList.contains('rg-role-planet')) return;
      const ring = document.createElementNS(SVG_NS, 'circle');
      ring.setAttribute('class', 'rg-orbit-ring');
      ring.setAttribute('r', n.classList.contains('rg-role-system') ? '30' : '21');
      n.insertBefore(ring, n.firstChild);
    });

    const wrap = $('.rg-canvas-wrap', root);
    const legend = mk('div', 'rg-cosmos-legend');
    T.hierarchy.forEach((label, i) => {
      const s = mk('span');
      s.innerHTML = `<b>${label}</b>${i === 1 ? ' · dense links' : ''}`;
      legend.append(s);
    });
    wrap?.append(legend);
  }

  function parseTranslate(node) {
    const m = (node.getAttribute('transform') || '').match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/);
    return m ? [+m[1], +m[2]] : [0, 0];
  }

  function orthoPath(a, b) {
    const dx = Math.abs(b[0] - a[0]), dy = Math.abs(b[1] - a[1]);
    if (dx > dy) {
      const mx = (a[0] + b[0]) / 2;
      return `M${a[0]},${a[1]} H${mx} V${b[1]} H${b[0]}`;
    }
    const my = (a[1] + b[1]) / 2;
    return `M${a[0]},${a[1]} V${my} H${b[0]} V${b[1]}`;
  }

  function addChipVisual(n) {
    const body = document.createElementNS(SVG_NS, 'rect');
    body.setAttribute('class', 'rg-chip-body');
    body.setAttribute('x', '-18'); body.setAttribute('y', '-12');
    body.setAttribute('width', '36'); body.setAttribute('height', '24');
    body.setAttribute('rx', '5');

    const pins = document.createElementNS(SVG_NS, 'path');
    pins.setAttribute('class', 'rg-chip-pins');
    pins.setAttribute('d', 'M-24 -8H-18 M-24 0H-18 M-24 8H-18 M18 -8H24 M18 0H24 M18 8H24');

    n.insertBefore(pins, n.firstChild);
    n.insertBefore(body, n.firstChild);
    const label = $('.rg-star-label', n);
    if (label) {
      if (!label.dataset.originalY) label.dataset.originalY = label.getAttribute('y') || '-20';
      label.setAttribute('y', '-19');
    }
  }

  function circuitFamilyLabel(id) {
    const obj = FAMILY_NAMES[id];
    return obj ? (obj[lang] || obj.en) : id;
  }

  function addCircuitDecor() {
    classifyNodes();
    const svg = $('.rg-canvas', root);
    const eg = $('.rg-constellations', root);
    if (!svg || !eg) return;

    const nodes = $$('.rg-node[data-id]', root);
    const byFamily = new Map();
    nodes.forEach(n => {
      if (n.dataset.id === 'luxdot') return;
      const family = (n.dataset.families || 'meaning').split(',')[0] || 'meaning';
      if (!byFamily.has(family)) byFamily.set(family, []);
      byFamily.get(family).push(n);
    });

    const familyOrder = ['meaning','judaism','land','pilgrimage','choice','journeys','lineage','good']
      .filter(f => byFamily.has(f))
      .concat([...byFamily.keys()].filter(f => !['meaning','judaism','land','pilgrimage','choice','journeys','lineage','good'].includes(f)));

    const xCols = [245, 715, 1185, 1655];
    const rowY = [275, 845];
    const centers = new Map();
    familyOrder.forEach((f, i) => centers.set(f, [xCols[i % 4], rowY[Math.floor(i / 4) % 2]]));

    const pos = new Map();
    byFamily.forEach((arr, family) => {
      const [cx, cy] = centers.get(family) || [950, 560];
      const cols = Math.max(3, Math.ceil(Math.sqrt(arr.length * 1.35)));
      const rows = Math.max(1, Math.ceil(arr.length / cols));
      const sx = Math.min(76, 340 / Math.max(1, cols - 1));
      const sy = Math.min(72, 250 / Math.max(1, rows - 1));
      arr.sort((a,b) => (b.dataset.kind === 'hub') - (a.dataset.kind === 'hub') || a.dataset.id.localeCompare(b.dataset.id));
      arr.forEach((n, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const x = cx + (c - (cols - 1) / 2) * sx;
        const y = cy + (r - (rows - 1) / 2) * sy;
        pos.set(n.dataset.id, [x, y]);
        n.setAttribute('transform', `translate(${x} ${y})`);
      });
    });

    const lux = $('.rg-node[data-id="luxdot"]', root);
    if (lux) {
      pos.set('luxdot', [950, 560]);
      lux.setAttribute('transform', 'translate(950 560)');
      lux.classList.add('rg-role-chip');
      addChipVisual(lux);
    }

    const board = document.createElementNS(SVG_NS, 'g');
    board.setAttribute('class', 'rg-circuit-board');
    familyOrder.forEach(family => {
      const [cx, cy] = centers.get(family);
      const rect = document.createElementNS(SVG_NS, 'rect');
      rect.setAttribute('class', 'rg-board-zone');
      rect.setAttribute('x', cx - 205); rect.setAttribute('y', cy - 180);
      rect.setAttribute('width', 410); rect.setAttribute('height', 360); rect.setAttribute('rx', 22);
      const label = document.createElementNS(SVG_NS, 'text');
      label.setAttribute('x', cx); label.setAttribute('y', cy - 153);
      label.textContent = circuitFamilyLabel(family);
      board.append(rect, label);
    });

    const cpu = document.createElementNS(SVG_NS, 'rect');
    cpu.setAttribute('class', 'rg-board-zone rg-cpu-zone');
    cpu.setAttribute('x', '882'); cpu.setAttribute('y', '505');
    cpu.setAttribute('width', '136'); cpu.setAttribute('height', '110'); cpu.setAttribute('rx', '18');
    const cpuText = document.createElementNS(SVG_NS, 'text');
    cpuText.setAttribute('x','950'); cpuText.setAttribute('y','590'); cpuText.textContent = 'LUXDOT / CPU';
    board.append(cpu, cpuText);

    eg.parentNode.insertBefore(board, eg);

    const deg = degrees();
    nodes.forEach(n => {
      if (n.dataset.id === 'luxdot') return;
      const d = deg.get(n.dataset.id) || 0;
      const chip = n.dataset.kind === 'research' || n.dataset.kind === 'hub' || d >= 6;
      n.classList.add(chip ? 'rg-role-chip' : 'rg-role-transistor');
      if (chip) addChipVisual(n);
    });

    const nm = nodeMap();
    edges().forEach(e => {
      const a = pos.get(e.dataset.a) || parseTranslate(nm.get(e.dataset.a));
      const b = pos.get(e.dataset.b) || parseTranslate(nm.get(e.dataset.b));
      if (a && b) e.setAttribute('d', orthoPath(a, b));
    });

    const wrap = $('.rg-canvas-wrap', root);
    const legend = mk('div', 'rg-circuit-legend');
    T.circuitBus.forEach(x => legend.append(mk('span', '', x)));
    wrap?.append(legend);
  }

  function addBadge() {
    const wrap = $('.rg-canvas-wrap', root);
    if (!wrap) return;
    const label = state.mode === 'sky' ? T.sky : state.mode === 'universe' ? T.universe : T.circuit;
    const badge = mk('div', 'rg-view-badge');
    badge.innerHTML = `<i></i>${label} · ${T.signal}`;
    wrap.append(badge);
  }

  function clearSignal() {
    $$('.rg-signal-active,.rg-signal-dim,.rg-signal-related,.rg-signal-source', root).forEach(el => {
      el.classList.remove('rg-signal-active','rg-signal-dim','rg-signal-related','rg-signal-source');
    });
  }

  function signalPulse(id) {
    clearSignal();
    if (!id) return;
    const related = new Set([id]);
    const activeEdges = [];
    edges().forEach(e => {
      if (e.dataset.a === id || e.dataset.b === id) {
        activeEdges.push(e);
        related.add(e.dataset.a);
        related.add(e.dataset.b);
      }
    });

    $$('.rg-node[data-id]', root).forEach(n => {
      if (related.has(n.dataset.id)) n.classList.add('rg-signal-related');
      else n.classList.add('rg-signal-dim');
      if (n.dataset.id === id) n.classList.add('rg-signal-source', 'active');
    });
    edges().forEach(e => {
      if (activeEdges.includes(e)) e.classList.add('rg-signal-active');
      else e.classList.add('rg-signal-dim');
    });
  }

  function refreshSelected() {
    if (!state.selectedId) return;
    requestAnimationFrame(() => signalPulse(state.selectedId));
  }

  function updateTabs() {
    $$('[data-research-view]', root).forEach(b => {
      const active = b.dataset.researchView === state.mode;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function setMode(mode, persist) {
    if (!['sky','universe','circuit'].includes(mode)) mode = 'sky';
    state.mode = mode;
    if (persist) localStorage.setItem('luxdot.research.view.v2', mode);

    clearVisualAugmentation();
    root.dataset.researchView = mode;

    // Reuse the graph's own stateful renderers so search, family/topic filters and language stay intact.
    if (mode === 'sky') clickInternalLayout('network');
    else if (mode === 'universe') clickInternalLayout('cosmos');
    else clickInternalLayout('fields');

    // Internal rendering is synchronous; augment its fresh SVG afterwards.
    clearVisualAugmentation();
    root.dataset.researchView = mode;
    if (mode === 'universe') addUniverseDecor();
    if (mode === 'circuit') addCircuitDecor();
    addBadge();
    updateTabs();
    refreshSelected();
  }

  installSwitcher();

  // Delegation survives every internal SVG re-render.
  root.addEventListener('click', e => {
    const node = e.target.closest?.('.rg-node[data-id]');
    if (node) {
      state.selectedId = node.dataset.id;
      requestAnimationFrame(() => signalPulse(state.selectedId));
      return;
    }
    const canvas = e.target.closest?.('.rg-canvas');
    if (canvas && (e.target === canvas || e.target.classList?.contains('rg-sky-dust'))) {
      state.selectedId = null;
      clearSignal();
    }
  });

  // Start with the saved model; default SKY preserves the familiar free map.
  requestAnimationFrame(() => setMode(state.mode, false));
})();
