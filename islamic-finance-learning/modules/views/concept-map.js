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
      if (ctx.query.focus) setTimeout(function () { select(ctx.query.focus); });
      var listAlt = h('details.acc', h('summary', 'Text list of all concepts (accessible alternative)'), h('div.acc-body', h('ul', lanes.map(function (l) { return h('li', h('a', { href: '#/topic/' + l.s.topic }, l.s.label), l.items.length ? h('ul', l.items.map(function (c) { return h('li', h('a', { href: '#/concept/' + c.id }, c.name)); })) : null); }))));
      return h('div',
        C.pageHead({ eyebrow: 'Navigate', title: 'Concept map', desc: 'From the Islamic economic system to Takaful: pillars on the left follow the course sequence; concepts sit beside the pillar they belong to, and lines show the relationships identified in the textbook.' }),
        h('div', { style: { overflowX: 'auto' } }, h('div', { style: { minWidth: '720px' } }, svgEl)), h('div', { style: { marginTop: '14px' } }, panel),
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
