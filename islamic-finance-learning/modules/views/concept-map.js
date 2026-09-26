/* Concept map (clickable SVG) and concept hub pages. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, text) { var e = document.createElementNS(NS, tag); Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); }); if (text != null) e.textContent = text; return e; }

  /* The spine follows the sequence requested for the course and the book's own progression. */
  var SPINE = [
    { id: 'sp-econ', label: 'Islamic Economic System', topic: 't2.4.1', groups: ['Foundations'] },
    { id: 'sp-shariah', label: 'Shari’ah', topic: 't2.2', groups: [] },
    { id: 'sp-maqasid', label: 'Maqasid', topic: 't2.2.2', groups: [] },
    { id: 'sp-law', label: 'Commercial Law', topic: 't5.3', groups: [] },
    { id: 'sp-ethics', label: 'Business Ethics', topic: 't3.3', groups: [] },
    { id: 'sp-prohib', label: 'Main Prohibitions', topic: 't3.2', groups: ['Prohibitions'] },
    { id: 'sp-contract', label: 'Contractual Principles', topic: 't5.5', groups: ['Principles'] },
    { id: 'sp-modes', label: 'Financing Modes', topic: 't4.2.4', groups: ['Sale-based modes', 'Lease-based modes', 'Partnership modes', 'Accessory contracts'] },
    { id: 'sp-bank', label: 'Islamic Banking', topic: 't8.5', groups: ['Banking & markets'] },
    { id: 'sp-markets', label: 'Islamic Financial Markets', topic: 't8.8', groups: [] },
    { id: 'sp-sukuk', label: 'Sukuk', topic: 't15.3', groups: [] },
    { id: 'sp-takaful', label: 'Takaful', topic: 't16.3', groups: ['Takaful & social'] }
  ];
  var PLACE = { sukuk: 'sp-sukuk', screening: 'sp-markets', takaful: 'sp-takaful', 'islamic-economics': 'sp-econ' };

  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  /* Relationship graph centred on one concept: its own links (outgoing) and links pointing
     to it from other concepts (incoming), placed on a ring with labelled edges. */
  IFL.egoGraph = function (c, all) {
    var byId = {}; all.forEach(function (x) { byId[x.id] = x; });
    var nb = [], seen = {};
    c.links.forEach(function (l) { if (byId[l.to] && !seen[l.to]) { seen[l.to] = 1; nb.push({ id: l.to, label: l.label, dir: 'out' }); } });
    all.forEach(function (o) { o.links.forEach(function (l) { if (l.to === c.id && !seen[o.id]) { seen[o.id] = 1; nb.push({ id: o.id, label: l.label, dir: 'in' }); } }); });
    var W = 860, H = Math.max(380, 260 + nb.length * 22), cx = W / 2, cy = H / 2, RX = W / 2 - 115, RY = H / 2 - 36;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'cmap ego', role: 'group', 'aria-label': 'Relationships of ' + c.name });
    var defs = el('defs'), mk = el('marker', { id: 'ego-arr', viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' });
    mk.appendChild(el('path', { d: 'M0,0 L10,5 L0,10 z', fill: 'currentColor' })); defs.appendChild(mk); svg.appendChild(defs);
    var gE = el('g'), gL = el('g'), gN = el('g'); svg.appendChild(gE); svg.appendChild(gN); svg.appendChild(gL);
    nb.forEach(function (n, i) {
      var a = -Math.PI / 2 + 2 * Math.PI * i / Math.max(1, nb.length), x = cx + RX * Math.cos(a), y = cy + RY * Math.sin(a);
      var sx = n.dir === 'out' ? cx : x, sy = n.dir === 'out' ? cy : y, ex = n.dir === 'out' ? x : cx, ey = n.dir === 'out' ? y : cy;
      var dx = ex - sx, dy = ey - sy, L = Math.sqrt(dx * dx + dy * dy) || 1, pad = 44;
      gE.appendChild(el('path', { d: 'M' + (sx + dx / L * pad) + ',' + (sy + dy / L * 20) + ' L' + (ex - dx / L * pad) + ',' + (ey - dy / L * 20), class: 'link ego-' + n.dir, 'marker-end': 'url(#ego-arr)', style: 'color: var(--border-strong)' }));
      var mx = cx + (x - cx) * 0.62, my = cy + (y - cy) * 0.62;  // label nearer the outer node, so labels do not pile up at the centre
      gL.appendChild(el('text', { x: mx, y: my - (Math.abs(y - cy) < 30 ? 14 : 4), 'text-anchor': 'middle', class: 'ego-lbl' }, trunc(n.label, 34)));
      var o = byId[n.id], g = el('g', { class: 'node', tabindex: 0, role: 'link', 'aria-label': o.name + ' — ' + n.label });
      var w = Math.min(190, 24 + o.name.length * 7);
      g.appendChild(el('rect', { x: x - w / 2, y: y - 15, width: w, height: 30, rx: 15 }));
      g.appendChild(el('text', { x: x, y: y + 4, 'text-anchor': 'middle' }, trunc(o.name, 26)));
      g.appendChild(el('title', {}, o.name + ' (' + (n.dir === 'out' ? c.name + ' → ' + o.name : o.name + ' → ' + c.name) + ': ' + n.label + ')'));
      function go() { IFL.go('/concept/' + o.id); }
      g.addEventListener('click', go); g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      gN.appendChild(g);
    });
    var cw = Math.min(230, 40 + c.name.length * 8), cg = el('g', { class: 'node sel' });
    cg.appendChild(el('rect', { x: cx - cw / 2, y: cy - 20, width: cw, height: 40, rx: 20 }));
    cg.appendChild(el('text', { x: cx, y: cy + 5, 'text-anchor': 'middle', style: 'font-size: 14px' }, trunc(c.name, 30)));
    gN.appendChild(cg);
    if (!nb.length) gL.appendChild(el('text', { x: cx, y: cy + 50, 'text-anchor': 'middle', class: 'ego-lbl' }, 'No recorded relationships yet'));
    return h('div', h('div', { style: { overflowX: 'auto' } }, h('div', { style: { minWidth: '620px' } }, svg)), h('p.small.muted', { style: { marginTop: '6px' } }, 'Arrows point from a concept to the one it relates to; ' + nb.filter(function (n) { return n.dir === 'out'; }).length + ' outgoing and ' + nb.filter(function (n) { return n.dir === 'in'; }).length + ' incoming links. Click a concept to open it.'));
  };

  /* Chapter concept map: the chapter's topics (left) linked to the major concepts they teach (right). */
  IFL.chapterConceptMap = function (ch, concepts) {
    var byTag = {}; concepts.forEach(function (c) { c.tags.forEach(function (t) { byTag[t] = byTag[t] || c; }); });
    var used = [], idx = {}, edges = [];
    ch.topics.forEach(function (t, i) {
      var cs = {}; (t.concepts || []).forEach(function (k) { var c = byTag[k]; if (c) cs[c.id] = c; });
      Object.keys(cs).forEach(function (id) { if (!(id in idx)) { idx[id] = used.length; used.push(cs[id]); } edges.push([i, idx[id]]); });
    });
    if (!used.length) return null;
    var RH = 26, top = 16, W = 900, n1 = ch.topics.length, n2 = used.length, H = top * 2 + Math.max(n1, n2) * RH;
    var y1 = function (i) { return top + (i + 0.5) * (H - 2 * top) / n1; }, y2 = function (j) { return top + (j + 0.5) * (H - 2 * top) / n2; };
    var LX = 330, RX = 640;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'cmap chmap', role: 'group', 'aria-label': 'Concept map of chapter ' + ch.number });
    var gE = el('g'), gN = el('g'); svg.appendChild(gE); svg.appendChild(gN);
    var edgeEls = edges.map(function (e) {
      var a = y1(e[0]), b = y2(e[1]);
      var p = el('path', { d: 'M' + LX + ',' + a + ' C' + (LX + 150) + ',' + a + ' ' + (RX - 150) + ',' + b + ' ' + RX + ',' + b, class: 'link' });
      p.dataset.t = e[0]; p.dataset.c = e[1]; gE.appendChild(p); return p;
    });
    var tEls = [], cEls = [];
    function hl(kind, i) {
      edgeEls.forEach(function (p) { var on = kind === 't' ? +p.dataset.t === i : +p.dataset.c === i; p.classList.toggle('hl', on); p.style.opacity = on ? 1 : 0.18; });
      var tOn = {}, cOn = {}; edgeEls.forEach(function (p) { if (p.classList.contains('hl')) { tOn[p.dataset.t] = 1; cOn[p.dataset.c] = 1; } });
      tEls.forEach(function (g, k) { g.classList.toggle('dim', !tOn[k] && !(kind === 't' && k === i)); });
      cEls.forEach(function (g, k) { g.classList.toggle('dim', !cOn[k] && !(kind === 'c' && k === i)); });
    }
    function reset() { edgeEls.forEach(function (p) { p.classList.remove('hl'); p.style.opacity = ''; }); tEls.concat(cEls).forEach(function (g) { g.classList.remove('dim'); }); }
    ch.topics.forEach(function (t, i) {
      var g = el('g', { class: 'node', tabindex: 0, role: 'link', 'aria-label': '§' + t.section + ' ' + t.title });
      g.appendChild(el('rect', { x: 8, y: y1(i) - 11, width: LX - 12, height: 22, rx: 6 }));
      g.appendChild(el('text', { x: 16, y: y1(i) + 4, style: 'font-size: 11px; font-weight: 500' }, trunc('§' + t.section + ' ' + t.title, 46)));
      g.appendChild(el('title', {}, '§' + t.section + ' ' + t.title));
      g.addEventListener('mouseenter', function () { hl('t', i); }); g.addEventListener('focus', function () { hl('t', i); });
      g.addEventListener('mouseleave', reset); g.addEventListener('blur', reset);
      g.addEventListener('click', function () { IFL.go('/topic/' + t.id); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter') IFL.go('/topic/' + t.id); });
      gN.appendChild(g); tEls.push(g);
    });
    used.forEach(function (c, j) {
      var g = el('g', { class: 'node', tabindex: 0, role: 'link', 'aria-label': c.name });
      g.appendChild(el('rect', { x: RX, y: y2(j) - 12, width: W - RX - 8, height: 24, rx: 12 }));
      g.appendChild(el('text', { x: RX + 12, y: y2(j) + 4 }, trunc(c.name, 30)));
      g.addEventListener('mouseenter', function () { hl('c', j); }); g.addEventListener('focus', function () { hl('c', j); });
      g.addEventListener('mouseleave', reset); g.addEventListener('blur', reset);
      g.addEventListener('click', function () { IFL.go('/concept/' + c.id); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter') IFL.go('/concept/' + c.id); });
      gN.appendChild(g); cEls.push(g);
    });
    return h('div', h('div', { style: { overflowX: 'auto' } }, h('div', { style: { minWidth: '640px' } }, svg)),
      h('p.small.muted', { style: { marginTop: '6px' } }, n1 + ' topics · ' + n2 + ' major concepts. Hover or focus a topic or concept to trace its links; click to open it.'));
  };

  IFL.route('/concepts', function (ctx) {
    return window.IFL_DATA.load(['concepts']).then(function (r) {
      var concepts = r.concepts, byId = {}; concepts.forEach(function (c) { byId[c.id] = c; });
      var lanes = SPINE.map(function (s) { return { s: s, items: [] }; });
      concepts.forEach(function (c) {
        var lane = PLACE[c.id] ? lanes.filter(function (l) { return l.s.id === PLACE[c.id]; })[0] : lanes.filter(function (l) { return l.s.groups.indexOf(c.group) > -1; })[0];
        (lane || lanes[0]).items.push(c);
      });
      var W = 1100, PER = 5, SX = 14, SW = 188, CX0 = 250, CW = 158, CSTEP = 170, RH = 50, y = 18, pos = {};
      lanes.forEach(function (l) {
        var rows = Math.max(1, Math.ceil(l.items.length / PER));
        l.y = y; l.h = rows * RH;
        pos[l.s.id] = { x: SX + SW / 2, y: y + l.h / 2, w: SW, spine: true };
        l.items.forEach(function (c, i) { pos[c.id] = { x: CX0 + (i % PER) * CSTEP + CW / 2, y: y + Math.floor(i / PER) * RH + RH / 2, w: CW }; });
        y += l.h + 8;
      });
      var H = y + 10;
      var svgEl = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'cmap', role: 'group', 'aria-label': 'Concept map of the course' });
      var linksG = el('g'), nodesG = el('g'); svgEl.appendChild(linksG); svgEl.appendChild(nodesG);
      lanes.forEach(function (l, i) { if (i % 2 === 0) linksG.appendChild(el('rect', { x: 0, y: l.y - 4, width: W, height: l.h + 8, fill: 'currentColor', opacity: 0.025 })); });
      var linkEls = [];
      function line(a, b, cls) {
        var p = pos[a], q = pos[b]; if (!p || !q) return;
        var d = 'M' + p.x + ',' + p.y + ' C' + ((p.x + q.x) / 2) + ',' + p.y + ' ' + ((p.x + q.x) / 2) + ',' + q.y + ' ' + q.x + ',' + q.y;
        if (cls === 'spine') d = 'M' + p.x + ',' + (p.y + 16) + ' L' + q.x + ',' + (q.y - 16);
        var e = el('path', { d: d, class: 'link ' + (cls || '') }); e.dataset.a = a; e.dataset.b = b; linksG.appendChild(e); linkEls.push(e);
      }
      for (var i = 0; i < SPINE.length - 1; i++) line(SPINE[i].id, SPINE[i + 1].id, 'spine');
      lanes.forEach(function (l) { l.items.forEach(function (c) { line(l.s.id, c.id, 'member'); }); });
      concepts.forEach(function (c) { c.links.forEach(function (k) { if (byId[k.to] && c.id < k.to) line(c.id, k.to, 'rel'); else if (byId[k.to]) line(c.id, k.to, 'rel'); }); });
      linkEls.forEach(function (e) { if (/rel/.test(e.getAttribute('class'))) e.style.opacity = 0.22; });
      var nodeEls = {};
      function node(id, label, isSpine) {
        var p = pos[id], g = el('g', { class: 'node' + (isSpine ? ' spine' : ''), tabindex: 0, role: 'button', 'aria-label': label });
        var w = p.w, hh = isSpine ? 34 : 30;
        g.appendChild(el('rect', { x: p.x - w / 2, y: p.y - hh / 2, width: w, height: hh, rx: isSpine ? 8 : 15, style: isSpine ? 'fill: var(--accent-soft); stroke: var(--accent)' : '' }));
        var t = label.length > (isSpine ? 26 : 22) ? label.slice(0, isSpine ? 25 : 21) + '…' : label;
        g.appendChild(el('text', { x: p.x, y: p.y + 4, 'text-anchor': 'middle', style: isSpine ? 'fill: var(--accent)' : '' }, t));
        var title = el('title', {}, label); g.appendChild(title);
        g.addEventListener('click', function () { select(id); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(id); } });
        nodesG.appendChild(g); nodeEls[id] = g;
      }
      SPINE.forEach(function (s) { node(s.id, s.label, true); });
      concepts.forEach(function (c) { node(c.id, c.name, false); });
      var groupsAll = []; concepts.forEach(function (c) { if (groupsAll.indexOf(c.group) < 0) groupsAll.push(c.group); });
      var activeGroup = '', q = '';
      function applyFilter() {
        var nq = u.norm(q);
        concepts.forEach(function (c) {
          var hit = (!activeGroup || c.group === activeGroup) && (!nq || u.norm(c.name + ' ' + c.oneLine + ' ' + c.tags.join(' ')).indexOf(nq) > -1);
          nodeEls[c.id].classList.toggle('dim', !hit); nodeEls[c.id].classList.toggle('match', hit && !!(nq || activeGroup));
        });
        linkEls.forEach(function (e) { if (/rel/.test(e.getAttribute('class'))) e.style.opacity = (activeGroup || nq) ? 0.08 : 0.22; });
        countEl.textContent = (activeGroup || nq) ? concepts.filter(function (c) { return !nodeEls[c.id].classList.contains('dim'); }).length + ' of ' + concepts.length + ' concepts match' : concepts.length + ' concepts';
      }
      var countEl = h('span.small.muted');
      var search = h('input.input', { type: 'search', placeholder: 'Find a concept…', 'aria-label': 'Find a concept', style: { maxWidth: '240px' } });
      search.addEventListener('input', function () { q = search.value; applyFilter(); });
      var chipRow = h('div.row', [h('button.chip', { type: 'button', 'aria-pressed': 'true', onclick: function () { setGroup(''); } }, 'All')].concat(groupsAll.map(function (g) { return h('button.chip', { type: 'button', 'aria-pressed': 'false', onclick: function () { setGroup(g); } }, g); })));
      function setGroup(g) { activeGroup = g; Array.prototype.forEach.call(chipRow.children, function (b) { b.setAttribute('aria-pressed', String((b.textContent === 'All' && !g) || b.textContent === g)); }); applyFilter(); }
      var toolbar = h('div.stack', { style: { marginBottom: '12px' } }, h('div.row', search, countEl), chipRow);
      var panel = h('div.card', { 'aria-live': 'polite' }, h('p.muted', 'Select a node to see how it connects and to open its lesson. The gold line follows the course sequence from the economic system to Takaful.'));
      function select(id) {
        var nb = {}; nb[id] = 1;
        linkEls.forEach(function (e) { var on = e.dataset.a === id || e.dataset.b === id; if (on) { nb[e.dataset.a] = 1; nb[e.dataset.b] = 1; } e.classList.toggle('hl', on); if (/rel/.test(e.getAttribute('class'))) e.style.opacity = on ? 1 : 0.2; });
        Object.keys(nodeEls).forEach(function (k) { nodeEls[k].classList.toggle('sel', k === id); nodeEls[k].classList.toggle('dim', !nb[k]); });
        panel.innerHTML = '';
        var sp = SPINE.filter(function (s) { return s.id === id; })[0];
        if (sp) {
          var lane = lanes.filter(function (l) { return l.s.id === id; })[0];
          u.append(panel, [h('div.eyebrow', 'Course pillar'), h('h2', { style: { fontSize: 'var(--fs-xl)' } }, sp.label),
            h('p', h('a.btn.primary', { href: '#/topic/' + sp.topic }, 'Open lesson: ' + IFL.course.sourceLabel(sp.topic))),
            lane.items.length ? h('div', h('div.small.muted', 'Concepts under this pillar'), h('div.row', lane.items.map(function (c) { return h('button.chip', { type: 'button', onclick: function () { select(c.id); } }, c.name); }))) : null]);
          return;
        }
        var c = byId[id];
        u.append(panel, [h('div.eyebrow', c.group), h('h2', { style: { fontSize: 'var(--fs-xl)' } }, c.name), h('p', c.oneLine),
          h('div.row', h('a.btn.primary', { href: '#/concept/' + c.id }, 'Open concept'), h('a.btn', { href: '#/topic/' + c.topics[0] }, 'First lesson')),
          c.links.length ? h('div', { style: { marginTop: '10px' } }, h('div.small.muted', 'Relationships'), h('ul.small', c.links.map(function (l) { var o = byId[l.to]; return o ? h('li', c.name + ' — ' + l.label + ' — ', h('a', { href: '#/concepts?focus=' + o.id, onclick: function (e) { e.preventDefault(); select(o.id); } }, o.name)) : null; }))) : null]);
      }
      applyFilter();
      if (ctx.query.focus) setTimeout(function () { select(ctx.query.focus); });
      var listAlt = h('details.acc', h('summary', 'Text list of all concepts (accessible alternative)'), h('div.acc-body', h('ul', lanes.map(function (l) { return h('li', h('a', { href: '#/topic/' + l.s.topic }, l.s.label), l.items.length ? h('ul', l.items.map(function (c) { return h('li', h('a', { href: '#/concept/' + c.id }, c.name)); })) : null); }))));
      return h('div',
        C.pageHead({ eyebrow: 'Navigate', title: 'Concept map', desc: 'From the Islamic economic system to Takaful: pillars on the left follow the course sequence; concepts sit beside the pillar they belong to, and lines show the relationships identified in the textbook.' }),
        toolbar, h('div', { style: { overflowX: 'auto' } }, h('div', { style: { minWidth: '720px' } }, svgEl)), h('div', { style: { marginTop: '14px' } }, panel),
        h('div', { style: { marginTop: '14px' } }, listAlt));
    });
  }, { wide: true });

  IFL.route('/concept/:id', function (ctx) {
    return window.IFL_DATA.load(['concepts', 'diagrams', 'comparisons']).then(function (r) {
      var c = r.concepts.filter(function (x) { return x.id === ctx.params.id; })[0];
      if (!c) throw new Error('Concept not found');
      IFL.progress.log('concept', 'Concept: ' + c.name, '/concept/' + c.id);
      var tagged = [];
      IFL.course.chapters.forEach(function (ch) { ch.topicObjs.forEach(function (t) { if (t.concepts.some(function (k) { return c.tags.indexOf(k) > -1; })) tagged.push(t); }); });
      var diagrams = r.diagrams.filter(function (d) { return d.concept === c.id; });
      var pairs = r.comparisons.pairs.filter(function (p) { var s = u.norm(p.title); return s.indexOf(u.norm(c.name.split(/[ (/]/)[0])) > -1; });
      var byId = {}; r.concepts.forEach(function (x) { byId[x.id] = x; });
      var topicIds = tagged.map(function (t) { return t.id; });
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Concept map', route: '/concepts?focus=' + c.id }, { label: c.name }], eyebrow: 'Major concept', title: c.name,
          actions: [C.noteBtn({ type: 'concept', id: c.id, label: c.name, route: '/concept/' + c.id }), h('a.btn', { href: '#/quiz/run?topics=' + topicIds.join(',') + '&n=10' }, u.svg('quiz'), 'Quiz this concept'), h('a.btn', { href: '#/flashcards/review?topics=' + topicIds.join(',') }, u.svg('cards'), 'Flashcards')] }),
        h('section.card', { style: { marginBottom: '16px' } }, h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Relationship graph'), IFL.egoGraph(c, r.concepts)),
        h('div.grid', { style: { gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)' }, class: 'concept-grid' },
          C.conceptCard(c),
          h('div.stack',
            h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Where it is taught (' + tagged.length + ' topics)'),
              h('ul.list', tagged.map(function (t) { return h('li.small', h('a', { href: '#/topic/' + t.id }, 'Ch ' + t.chapter + ' §' + t.section + ' ' + t.title), IFL.progress.isComplete(t.id) ? h('span.badge.ok', { style: { marginLeft: '6px' } }, 'done') : null); }))),
            c.links.length ? h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Connected concepts'),
              h('ul.small', c.links.map(function (l) { var o = byId[l.to]; return o ? h('li', l.label + ': ', h('a', { href: '#/concept/' + o.id }, o.name)) : null; }))) : null,
            diagrams.length || pairs.length ? h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Diagrams and comparisons'),
              h('div.row', diagrams.map(function (d) { return h('a.chip', { href: '#/diagram/' + d.id }, u.svg('flow'), d.title); }), pairs.map(function (p) { return h('a.chip', { href: '#/compare?id=' + p.id }, u.svg('compare'), p.title); }))) : null)));
    });
  }, { wide: true });
})();
