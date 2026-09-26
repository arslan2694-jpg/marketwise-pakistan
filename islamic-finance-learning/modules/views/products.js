/* Islamic banking products: catalogue, product pages, product–contract map, side-by-side comparison
   and a product quiz. Content comes from data/products.js (built from Box 8.2 and the product
   procedures, boxes and case studies in Chapters 8–16). */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var D = window.IFL_DATA;
  var H2 = { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' };
  var NS = 'http://www.w3.org/2000/svg';
  var CATS = ['Deposits', 'Consumer finance', 'Agriculture', 'Trade & working capital', 'Corporate & project', 'Treasury & capital markets', 'Sukuk', 'Funds & investment banking', 'Services & Takaful'];
  var WHO = [['ind', 'Individual or household'], ['farm', 'Farmer or fisherman'], ['biz', 'Trader, manufacturer, exporter or importer'], ['corp', 'Large corporate, project or government'], ['bank', 'Bank treasury'], ['inv', 'Saver or investor']];
  var USE = [['save', 'Save or invest'], ['asset', 'Buy or use an asset'], ['home', 'A home'], ['cash', 'Cash or liquidity'], ['wc', 'Working capital or inventory'], ['trade', 'Import or export'], ['project', 'Build a project or plant'], ['raise', 'Raise funds from investors'], ['service', 'A banking service'], ['protect', 'Protection or cover']];
  /* Families follow the group of each product's core (first) contract in the concept map. */
  var FAMILIES = [['Sale-based modes', 'Sale-based'], ['Lease-based modes', 'Lease-based'], ['Partnership modes', 'Partnership'], ['Accessory contracts', 'Agency, service & accessory'], ['Principles', 'Loans & promises'], ['Banking & markets', 'Capital & money market'], ['Takaful & social', 'Takaful']];
  function el(tag, attrs, text) { var e = document.createElementNS(NS, tag); Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); }); if (text != null) e.textContent = text; return e; }
  function load() { return D.load(['products', 'concepts', 'diagrams', 'cases']); }
  function cmap(R) { var m = {}; R.concepts.forEach(function (c) { m[c.id] = c; }); return m; }
  function kindBadge(k) { return k === 'textbook' ? h('span.badge.accent', 'Textbook figures') : h('span.badge.gold', 'Practice example — generated for learning'); }

  /* ---------- Questions generated from the catalogue (stable ids, deterministic distractors) ---------- */
  function hash(s) { var x = 2166136261; for (var i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 16777619); } return x >>> 0; }
  function pick(list, n, seed) {
    var a = list.slice(), s = seed || 1;
    for (var i = a.length - 1; i > 0; i--) { s = (Math.imul(s, 1103515245) + 12345) >>> 0; var j = s % (i + 1); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a.slice(0, n);
  }
  function mcq(id, stem, right, wrong, extra) {
    var seed = hash(id), opts = pick(wrong, 3, seed), at = seed % (opts.length + 1);
    opts.splice(at, 0, right);
    return Object.assign({ id: id, type: 'mcq', q: stem, options: opts, answer: at, product: true }, extra);
  }
  function uniq(a) { var o = {}; return a.filter(function (x) { if (!x || o[x]) return false; o[x] = 1; return true; }); }
  IFL.productQuestions = function (products, concepts) {
    var cm = {}; (concepts || []).forEach(function (c) { cm[c.id] = c; });
    var out = [], count = function (arr, v) { return arr.filter(function (x) { return x === v; }).length; };
    var allConv = products.map(function (p) { return p.conventional.name; });
    var allMit = []; products.forEach(function (p) { p.risks.forEach(function (r) { allMit.push(r[1]); }); });
    products.forEach(function (p) {
      var t = IFL.course.topic(p.topics[0]), base = { topic: p.topics[0], chapter: t ? t.chapter : null, obj: 'Identify how ' + p.name + ' is structured' };
      var src = ' See the product page “' + p.name + '”.';
      var core = cm[p.contracts[0]];
      if (core) {
        var others = uniq(products.map(function (o) { return o.contracts[0]; }).filter(function (c) { return p.contracts.indexOf(c) < 0 && cm[c]; })).map(function (c) { return cm[c].name; });
        if (others.length >= 3) out.push(mcq('pq-' + p.id + '-core', 'Which contract is at the core of “' + p.name + '”?', core.name, others,
          Object.assign({ explanation: p.name + ' rests on ' + p.contracts.map(function (c) { return cm[c] ? cm[c].name : c; }).join(', ') + '. ' + p.how[0] + src, diff: 'E', level: 'recall' }, base)));
      }
      var others2 = products.filter(function (o) { return o.cat !== p.cat; }).map(function (o) { return o.name; });
      out.push(mcq('pq-' + p.id + '-need', 'A client needs: “' + p.need + '” Which Islamic banking product fits best?', p.name, others2,
        Object.assign({ explanation: p.name + ' (' + p.cat + ') meets this need through ' + p.contracts.map(function (c) { return cm[c] ? cm[c].name : c; }).join(' + ') + '.' + src, diff: 'M', level: 'application' }, base)));
      var words = u.norm(p.name).split(/[^a-z]+/).filter(function (w) { return w.length > 4; });
      var giveaway = words.some(function (w) { return u.norm(p.conventional.name).indexOf(w) > -1; });
      if (count(allConv, p.conventional.name) === 1 && !giveaway) {
        out.push(mcq('pq-' + p.id + '-conv', 'Which conventional product does “' + p.name + '” replace?', p.conventional.name, uniq(allConv.filter(function (n) { return n !== p.conventional.name; })),
          Object.assign({ explanation: p.conventional.diff[0] + src, diff: 'E', level: 'understanding' }, base)));
      }
      var r = p.risks.filter(function (x) { return count(allMit, x[1]) === 1; })[0];
      if (r) {
        var mine = p.risks.map(function (x) { return x[1]; });
        out.push(mcq('pq-' + p.id + '-risk', 'In “' + p.name + '”, how does the bank manage this risk: ' + r[0].replace(/\.$/, '') + '?', r[1], uniq(allMit.filter(function (m) { return mine.indexOf(m) < 0; })),
          Object.assign({ explanation: 'Mitigant for ' + r[0].toLowerCase() + ': ' + r[1] + '.' + src, diff: 'M', level: 'understanding' }, base)));
      }
    });
    return out;
  };

  /* ---------- Catalogue ---------- */
  IFL.route('/products', function (ctx) {
    return load().then(function (R) {
      var cm = cmap(R), q = ctx.query, cat = q.cat || '', term = '';
      var grid = h('div.grid.grid-3'), countEl = h('span.small.muted');
      var search = h('input.input', { type: 'search', placeholder: 'Search products, contracts or needs…', 'aria-label': 'Search products', style: { maxWidth: '360px' } });
      var chips = [''].concat(CATS).map(function (c) {
        var b = h('button.chip', { type: 'button', 'aria-pressed': String(c === cat), onclick: function () { cat = c; chips.forEach(function (x) { x.setAttribute('aria-pressed', String(x._c === cat)); }); draw(); } }, c || 'All');
        b._c = c; return b;
      });
      function card(p) {
        return h('a.card.card-link.product-card', { href: '#/product/' + p.id },
          h('div.row', h('span.badge', p.cat), p.numerical.kind === 'textbook' ? h('span.badge.accent', 'Textbook numerical') : null),
          h('h3', { style: { fontSize: 'var(--fs-md)', margin: '8px 0 4px' } }, p.name),
          h('p.small.text-2', { style: { margin: '0 0 8px' } }, p.need),
          h('div.row', { style: { gap: '4px' } }, p.contracts.map(function (c) { return h('span.chip.static', cm[c] ? cm[c].name : c); })));
      }
      function draw() {
        var n = u.norm(term);
        var list = R.products.filter(function (p) {
          if (cat && p.cat !== cat) return false;
          if (!n) return true;
          var hay = u.norm([p.name, p.need, p.cat, p.conventional.name].concat(p.contracts.map(function (c) { return cm[c] ? cm[c].name : c; })).join(' '));
          return hay.indexOf(n) > -1;
        });
        grid.innerHTML = '';
        u.append(grid, list.length ? list.map(card) : [C.empty('No products match', 'Try another search or category.')]);
        countEl.textContent = list.length + ' of ' + R.products.length + ' products';
      }
      search.addEventListener('input', function () { term = search.value; draw(); });
      draw();
      var tb = R.products.filter(function (p) { return p.numerical.kind === 'textbook'; }).length;
      return h('div',
        C.pageHead({ eyebrow: 'Islamic banking products', title: 'Product catalogue', desc: R.products.length + ' products as the book describes them, from deposits to Sukuk and Takaful. Each page shows the underlying contracts, the steps, a transaction diagram, a worked numerical (' + tb + ' use the book’s own figures), Shari’ah controls, risks and mitigants, and how the product differs from its conventional counterpart.',
          actions: [h('a.btn', { href: '#/products/finder' }, u.svg('compass'), 'Product finder'), h('a.btn', { href: '#/products/map' }, u.svg('map'), 'Product maps'), h('a.btn', { href: '#/products/compare' }, u.svg('compare'), 'Compare products'), h('a.btn.primary', { href: '#/products/quiz' }, u.svg('quiz'), 'Product quiz')] }),
        h('section.card', h('div.row', search, h('span.spacer'), countEl), h('div.row', { style: { marginTop: '10px' } }, chips)),
        grid,
        h('p.small.muted', { style: { marginTop: '16px' } }, 'Box 8.2 of the book maps each banking product to its modes; this catalogue expands that table. Descriptions apply the book’s rules and are not a Fatwa; banks’ actual terms vary and are approved by their own Shari’ah boards.'));
    });
  });

  /* ---------- Product page ---------- */
  IFL.route('/product/:id', function (ctx) {
    return Promise.all([load(), D.loadAllChapters()]).then(function (res) {
      var R = res[0], cm = cmap(R);
      var p = R.products.filter(function (x) { return x.id === ctx.params.id; })[0];
      if (!p) return C.empty('Product not found', 'It may have been renamed.', h('a.btn.primary', { href: '#/products' }, 'All products'));
      var d = p.diagram ? R.diagrams.filter(function (x) { return x.id === p.diagram; })[0] : null;
      var cases = (p.cases || []).map(function (id) { return R.cases.filter(function (c) { return c.id === id; })[0]; }).filter(Boolean);
      var same = R.products.filter(function (o) { return o.id !== p.id && o.contracts.some(function (c) { return p.contracts.indexOf(c) > -1; }); }).slice(0, 6);
      var n = p.numerical;
      var num = h('section.card#product-numerical',
        h('div.row.between', h('h2', { style: H2 }, 'Worked numerical'), kindBadge(n.kind)),
        h('h3', { style: { fontSize: 'var(--fs-md)' } }, n.title),
        C.table({ head: ['Given', 'Value'], rows: n.given }),
        (function () {
          var ol = h('ol.steps'), shown = 0, btn;
          function next() { if (shown < n.working.length) { ol.appendChild(h('li', n.working[shown])); shown++; } if (shown >= n.working.length) { btn.replaceWith(h('div.callout.ok', h('strong', 'Answer: '), n.answer)); } }
          btn = h('button.btn', { type: 'button', onclick: next }, 'Show the next step');
          var all = h('button.btn.ghost', { type: 'button', onclick: function () { while (shown < n.working.length) next(); } }, 'Show full solution');
          return h('div', h('p.small.muted', 'Try it first, then reveal the working one step at a time.'), ol, h('div.row', btn, all));
        })(),
        p.calc && IFL.calcTypes && IFL.calcTypes[p.calc] ? h('p.small', { style: { marginTop: '10px' } }, 'Change the figures in the interactive tool below, or practise more problems in the ', h('a', { href: '#/numericals' }, 'numericals trainer'), '.') : h('p.small', { style: { marginTop: '10px' } }, 'Practise more problems in the ', h('a', { href: '#/numericals' }, 'numericals trainer'), '.'));
      var node = h('div',
        C.pageHead({ crumbs: [{ label: 'Products', route: '/products' }, { label: p.cat, route: '/products?cat=' + encodeURIComponent(p.cat) }, { label: p.name }], eyebrow: p.cat, title: p.name, desc: p.need,
          actions: [C.bookmarkBtn ? C.bookmarkBtn({ type: 'product', id: p.id, label: p.name, route: '/product/' + p.id }) : null] }),
        h('div.stack',
          h('section.card', h('h2', { style: H2 }, 'Underlying contracts'),
            h('div.row', p.contracts.map(function (c) { return cm[c] ? h('a.chip', { href: '#/concept/' + c }, cm[c].name) : h('span.chip', c); })),
            h('ul.list', { style: { marginTop: '10px' } }, p.contracts.map(function (c) { return cm[c] ? h('li', h('strong', cm[c].name + ': '), cm[c].oneLine) : null; }))),
          h('section.card', h('h2', { style: H2 }, 'How it works'), h('ol.steps', p.how.map(function (s) { return h('li', s); }))),
          d ? h('section.card', h('h2', { style: H2 }, 'Transaction diagram'), C.diagram(d), C.sourceFoot(d.topic)) : null,
          num,
          p.calc && IFL.calcTypes && IFL.calcTypes[p.calc] ? h('section.card', h('div.eyebrow', 'Interactive tool'), IFL.calc(p.calc)) : null,
          h('div.grid.grid-2',
            h('section.card', h('h2', { style: H2 }, 'Shari’ah controls'), h('ul.list', p.controls.map(function (c) { return h('li', c); }))),
            h('section.card', h('h2', { style: H2 }, 'Compared with ' + p.conventional.name), h('ul.list', p.conventional.diff.map(function (c) { return h('li', c); })))),
          h('section.card', h('h2', { style: H2 }, 'Risks and mitigants'), C.table({ head: ['Risk', 'How the bank manages it'], rows: p.risks })),
          cases.length ? h('section.card', h('h2', { style: H2 }, 'Case studies'), h('ul.list', cases.map(function (c) { return h('li', h('a', { href: '#/case/' + c.id }, c.title)); }))) : null,
          h('section.card', h('h2', { style: H2 }, 'Lessons in the book'),
            h('ul.list', p.topics.map(function (t) { var m = IFL.course.topic(t); return m ? h('li', h('a', { href: '#/topic/' + t }, IFL.course.sourceLabel(t) + ' · ' + m.title)) : null; })),
            C.sourceFoot(p.topics[0])),
          same.length ? h('section.card', h('h2', { style: H2 }, 'Products built on the same contracts'),
            h('div.row', same.map(function (o) { return h('a.chip', { href: '#/product/' + o.id }, o.name); })),
            h('p.small', { style: { marginTop: '10px' } }, h('a', { href: '#/products/compare?a=' + p.id + '&b=' + same[0].id }, 'Compare ' + p.name + ' with ' + same[0].name))) : null,
          h('div.row', h('a.btn.primary', { href: '#/products/quiz?id=' + p.id }, u.svg('quiz'), 'Test yourself on this product'), h('a.btn', { href: '#/products' }, 'All products'))));
      return node;
    });
  });

  /* ---------- Product–contract map ---------- */
  IFL.productMap = function (products, concepts) {
    var cm = {}; concepts.forEach(function (c) { cm[c.id] = c; });
    var ps = CATS.reduce(function (a, c) { return a.concat(products.filter(function (p) { return p.cat === c; })); }, []);
    var used = [], idx = {}, edges = [];
    ps.forEach(function (p, i) { p.contracts.forEach(function (c) { if (!cm[c]) return; if (!(c in idx)) { idx[c] = used.length; used.push(cm[c]); } edges.push([i, idx[c]]); }); });
    var deg = used.map(function (_, j) { return edges.filter(function (e) { return e[1] === j; }).length; });
    var order = used.map(function (_, j) { return j; }).sort(function (a, b) { return deg[b] - deg[a]; });
    var pos = {}; order.forEach(function (j, k) { pos[j] = k; });
    var RH = 26, top = 16, W = 900, n1 = ps.length, n2 = used.length, H = top * 2 + Math.max(n1, n2) * RH;
    var y1 = function (i) { return top + (i + 0.5) * (H - 2 * top) / n1; }, y2 = function (j) { return top + (pos[j] + 0.5) * (H - 2 * top) / n2; };
    var LX = 330, RX = 640;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'cmap chmap pmap', role: 'group', 'aria-label': 'Map of Islamic banking products and their contracts' });
    var gE = el('g'), gN = el('g'); svg.appendChild(gE); svg.appendChild(gN);
    var edgeEls = edges.map(function (e) {
      var a = y1(e[0]), b = y2(e[1]);
      var p = el('path', { d: 'M' + LX + ',' + a + ' C' + (LX + 150) + ',' + a + ' ' + (RX - 150) + ',' + b + ' ' + RX + ',' + b, class: 'link' });
      p.dataset.t = e[0]; p.dataset.c = e[1]; gE.appendChild(p); return p;
    });
    var tEls = [], cEls = [];
    function hl(kind, i) {
      edgeEls.forEach(function (p) { var on = kind === 't' ? +p.dataset.t === i : +p.dataset.c === i; p.classList.toggle('hl', on); p.style.opacity = on ? 1 : 0.15; });
      var tOn = {}, cOn = {}; edgeEls.forEach(function (p) { if (p.classList.contains('hl')) { tOn[p.dataset.t] = 1; cOn[p.dataset.c] = 1; } });
      tEls.forEach(function (g, k) { g.classList.toggle('dim', !tOn[k] && !(kind === 't' && k === i)); });
      cEls.forEach(function (g, k) { g.classList.toggle('dim', !cOn[k] && !(kind === 'c' && k === i)); });
    }
    function reset() { edgeEls.forEach(function (p) { p.classList.remove('hl'); p.style.opacity = ''; }); tEls.concat(cEls).forEach(function (g) { g.classList.remove('dim'); }); }
    function node(g, label, route, kind, i) {
      g.setAttribute('tabindex', 0); g.setAttribute('role', 'link'); g.setAttribute('aria-label', label);
      g.addEventListener('mouseenter', function () { hl(kind, i); }); g.addEventListener('focus', function () { hl(kind, i); });
      g.addEventListener('mouseleave', reset); g.addEventListener('blur', reset);
      g.addEventListener('click', function () { IFL.go(route); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter') IFL.go(route); });
      gN.appendChild(g);
    }
    var lastCat = null;
    ps.forEach(function (p, i) {
      var g = el('g', { class: 'node cat-' + CATS.indexOf(p.cat) });
      g.appendChild(el('rect', { x: 8, y: y1(i) - 11, width: LX - 12, height: 22, rx: 6 }));
      g.appendChild(el('text', { x: 16, y: y1(i) + 4, style: 'font-size: 11px; font-weight: 500' }, IFL.trunc(p.name, 46)));
      g.appendChild(el('title', {}, p.cat + ' · ' + p.name));
      if (p.cat !== lastCat && i) gN.appendChild(el('line', { x1: 8, x2: LX - 4, y1: y1(i) - RH / 2 + 1, y2: y1(i) - RH / 2 + 1, class: 'pmap-sep' }));
      lastCat = p.cat;
      node(g, p.name, '/product/' + p.id, 't', i); tEls.push(g);
    });
    used.forEach(function (c, j) {
      var g = el('g', { class: 'node' });
      g.appendChild(el('rect', { x: RX, y: y2(j) - 12, width: W - RX - 8, height: 24, rx: 12 }));
      g.appendChild(el('text', { x: RX + 12, y: y2(j) + 4 }, IFL.trunc(c.name, 26) + ' (' + deg[j] + ')'));
      g.appendChild(el('title', {}, c.name + ' — used by ' + deg[j] + ' product' + (deg[j] > 1 ? 's' : '')));
      node(g, c.name + ', used by ' + deg[j] + ' products', '/concept/' + c.id, 'c', j); cEls.push(g);
    });
    return h('div.cmap-scroll', { style: { overflowX: 'auto' } }, h('div', { style: { minWidth: '620px' } }, svg));
  };
  IFL.productFamilies = function (products, concepts) {
    var cm = {}; concepts.forEach(function (c) { cm[c.id] = c; });
    var fam = FAMILIES.map(function (f) { return { key: f[0], label: f[1], items: [] }; });
    products.forEach(function (p) { var g = cm[p.contracts[0]] ? cm[p.contracts[0]].group : null; var f = fam.filter(function (x) { return x.key === g; })[0] || fam[4]; f.items.push(p); });
    fam = fam.filter(function (f) { return f.items.length; });
    var W = 1000, cx = W / 2, cy = W / 2, R1 = 150, R2 = 285, n = products.length + fam.length, k = 0;
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + W, class: 'cmap pfam', role: 'group', 'aria-label': 'Islamic banking products grouped by contract family' });
    var gE = el('g'), gN = el('g'); svg.appendChild(gE); svg.appendChild(gN);
    var centre = el('g', { class: 'node sel' });
    centre.appendChild(el('circle', { cx: cx, cy: cy, r: 66 }));
    centre.appendChild(el('text', { x: cx, y: cy - 4, 'text-anchor': 'middle' }, 'Islamic banking'));
    centre.appendChild(el('text', { x: cx, y: cy + 14, 'text-anchor': 'middle' }, 'products (' + products.length + ')'));
    gN.appendChild(centre);
    var leafEls = [];
    fam.forEach(function (f, fi) {
      var a0 = (k + 0.5) / n * 2 * Math.PI, start = k; k += f.items.length + 1;
      var mid = ((start + k - 1) / 2) / n * 2 * Math.PI - Math.PI / 2;
      var fx = cx + R1 * Math.cos(mid), fy = cy + R1 * Math.sin(mid);
      gE.appendChild(el('path', { d: 'M' + cx + ',' + cy + ' L' + fx + ',' + fy, class: 'link spine' }));
      var fg = el('g', { class: 'node fam fam-' + fi, tabindex: 0, role: 'button', 'aria-label': f.label + ': ' + f.items.length + ' products' });
      var tw = Math.max(90, f.label.length * 6.6 + 20);
      fg.appendChild(el('rect', { x: fx - tw / 2, y: fy - 14, width: tw, height: 28, rx: 14 }));
      fg.appendChild(el('text', { x: fx, y: fy + 4, 'text-anchor': 'middle' }, f.label + ' (' + f.items.length + ')'));
      var mine = [];
      f.items.forEach(function (p, j) {
        var a = (start + j) / n * 2 * Math.PI - Math.PI / 2, lx = cx + R2 * Math.cos(a), ly = cy + R2 * Math.sin(a);
        var path = el('path', { d: 'M' + fx + ',' + fy + ' Q' + (cx + (R1 + 60) * Math.cos(a)) + ',' + (cy + (R1 + 60) * Math.sin(a)) + ' ' + lx + ',' + ly, class: 'link' });
        gE.appendChild(path);
        var deg = a * 180 / Math.PI, flip = Math.cos(a) < 0, rot = flip ? deg + 180 : deg;
        var g = el('g', { class: 'node leaf', tabindex: 0, role: 'link', 'aria-label': p.name + ' (' + f.label + ')' });
        g.appendChild(el('circle', { cx: lx, cy: ly, r: 5 }));
        g.appendChild(el('text', { x: lx + (flip ? -9 : 9), y: ly + 4, 'text-anchor': flip ? 'end' : 'start', transform: 'rotate(' + rot.toFixed(1) + ' ' + lx.toFixed(1) + ' ' + ly.toFixed(1) + ')', style: 'font-size: 11px; font-weight: 500' }, IFL.trunc(p.name, 34)));
        g.appendChild(el('title', {}, p.name + ' — ' + p.cat));
        g.addEventListener('click', function () { IFL.go('/product/' + p.id); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter') IFL.go('/product/' + p.id); });
        gN.appendChild(g); mine.push({ g: g, path: path }); leafEls.push(g);
      });
      function hl(on) { leafEls.forEach(function (x) { x.classList.toggle('dim', on && mine.every(function (m) { return m.g !== x; })); }); mine.forEach(function (m) { m.path.classList.toggle('hl', on); }); }
      fg.addEventListener('mouseenter', function () { hl(true); }); fg.addEventListener('focus', function () { hl(true); });
      fg.addEventListener('mouseleave', function () { hl(false); }); fg.addEventListener('blur', function () { hl(false); });
      gN.appendChild(fg);
    });
    return h('div.cmap-scroll', { style: { overflowX: 'auto' } }, h('div', { style: { minWidth: '640px', maxWidth: '900px', margin: '0 auto' } }, svg));
  };
  IFL.route('/products/map', function () {
    return load().then(function (R) {
      var cm = cmap(R), cnt = {};
      R.products.forEach(function (p) { p.contracts.forEach(function (c) { cnt[c] = (cnt[c] || 0) + 1; }); });
      var top = Object.keys(cnt).sort(function (a, b) { return cnt[b] - cnt[a]; }).slice(0, 6);
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Products', route: '/products' }, { label: 'Product–contract map' }], eyebrow: 'Concept map', title: 'Products and the contracts behind them',
          desc: 'Products are grouped by category on the left; contracts on the right are ordered by how many products use them. Hover or focus a node to trace its links; click to open it.' }),
        h('section.card', h('h2', { style: H2 }, 'Product families'), h('p.small.muted', 'Each product sits in the family of its core contract. Hover a family to highlight its products; click a product to open it.'), IFL.productFamilies(R.products, R.concepts)),
        h('section.card', h('h2', { style: H2 }, 'Products and their contracts'), IFL.productMap(R.products, R.concepts)),
        h('section.card', h('h2', { style: H2 }, 'The most-used building blocks'),
          h('div.grid.grid-3', top.map(function (c) {
            return h('a.card.card-link', { href: '#/concept/' + c }, h('h3', { style: { fontSize: 'var(--fs-md)', margin: 0 } }, cm[c] ? cm[c].name : c), h('p.small.text-2', { style: { margin: '6px 0 0' } }, cnt[c] + ' products · ' + (cm[c] ? cm[c].oneLine : '')));
          })),
          h('p.small.muted', 'Wakalah and Wa‘d recur because banks use agency to buy and sell, and unilateral promises to bind clients to lease or buy, across many products.')));
    });
  });

  /* ---------- Side-by-side comparison ---------- */
  IFL.route('/products/compare', function (ctx) {
    return load().then(function (R) {
      var cm = cmap(R), by = {}; R.products.forEach(function (p) { by[p.id] = p; });
      var a = by[ctx.query.a] ? ctx.query.a : R.products[3].id, b = by[ctx.query.b] ? ctx.query.b : R.products[6].id;
      function sel(v, set) {
        var s = h('select.input', { 'aria-label': 'Product', style: { flex: '1 1 200px', minWidth: 0, maxWidth: '100%' }, onchange: function () { set(s.value); draw(); } },
          CATS.map(function (c) { return h('optgroup', { label: c }, R.products.filter(function (p) { return p.cat === c; }).map(function (p) { return h('option', { value: p.id, selected: p.id === v }, p.name); })); }));
        return s;
      }
      var out = h('div');
      function names(p) { return p.contracts.map(function (c) { return cm[c] ? cm[c].name : c; }).join(', '); }
      function draw() {
        var A = by[a], B = by[b];
        var shared = A.contracts.filter(function (c) { return B.contracts.indexOf(c) > -1; }).map(function (c) { return cm[c] ? cm[c].name : c; });
        out.innerHTML = '';
        u.append(out, [C.table({ head: ['', A.name, B.name], rows: [
          ['Category', A.cat, B.cat], ['Need met', A.need, B.need], ['Contracts', names(A), names(B)],
          ['First step', A.how[0], B.how[0]], ['Last step', A.how[A.how.length - 1], B.how[B.how.length - 1]],
          ['Key control', A.controls[0], B.controls[0]], ['Main risk → mitigant', A.risks[0].join(' → '), B.risks[0].join(' → ')],
          ['Replaces', A.conventional.name, B.conventional.name], ['Worked numerical', A.numerical.title + ' (' + A.numerical.kind + ')', B.numerical.title + ' (' + B.numerical.kind + ')']] }),
          h('p.small', shared.length ? 'Shared building blocks: ' + shared.join(', ') + '.' : 'These products share no underlying contract.'),
          h('div.row', h('a.btn', { href: '#/product/' + a, style: { whiteSpace: 'normal' } }, 'Open ' + A.name), h('a.btn', { href: '#/product/' + b, style: { whiteSpace: 'normal' } }, 'Open ' + B.name))]);
      }
      draw();
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Products', route: '/products' }, { label: 'Compare' }], eyebrow: 'Islamic banking products', title: 'Compare two products', desc: 'Pick any two products to see their contracts, steps, controls, risks and conventional counterparts side by side.' }),
        h('section.card', h('div.row', sel(a, function (v) { a = v; }), h('span', 'vs'), sel(b, function (v) { b = v; }))),
        h('section.card', out));
    });
  });

  /* ---------- Product finder ---------- */
  IFL.route('/products/finder', function (ctx) {
    return load().then(function (R) {
      var cm = cmap(R), who = ctx.query.who || '', use = ctx.query.use || '';
      var out = h('div');
      function chipRow(list, get, set, label) {
        var chips = [['', 'Any']].concat(list).map(function (x) {
          var b = h('button.chip', { type: 'button', 'aria-pressed': String(get() === x[0]), onclick: function () { set(x[0]); chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c._k === get())); }); draw(); } }, x[1]);
          b._k = x[0]; return b;
        });
        return h('div', h('div.small.muted', { style: { margin: '8px 0 4px' } }, label), h('div.row', chips));
      }
      function draw() {
        var list = R.products.filter(function (p) { return (!who || p.who.indexOf(who) > -1) && (!use || p.use.indexOf(use) > -1); });
        out.innerHTML = '';
        if (!list.length) { out.appendChild(C.empty('No product in the book fits both choices', 'Try “Any” for one of them.')); return; }
        u.append(out, [h('p.small', { 'aria-live': 'polite' }, h('strong', list.length + ' product' + (list.length > 1 ? 's' : '')), ' fit this need.'),
          h('div.grid.grid-3', list.map(function (p) {
            return h('a.card.card-link.product-card.finder-result', { href: '#/product/' + p.id }, h('span.badge', p.cat),
              h('h3', { style: { fontSize: 'var(--fs-md)', margin: '8px 0 4px' } }, p.name), h('p.small.text-2', { style: { margin: '0 0 6px' } }, p.need),
              h('p.small', { style: { margin: 0 } }, h('strong', 'Built on: '), p.contracts.map(function (c) { return cm[c] ? cm[c].name : c; }).join(', ')));
          }))]);
      }
      draw();
      return h('div',
        C.pageHead({ crumbs: [{ label: 'Products', route: '/products' }, { label: 'Product finder' }], eyebrow: 'Islamic banking products', title: 'Which product fits?',
          desc: 'Choose who the client is and what they need. The list shows every product in the catalogue that the book presents for that need. It is a study aid, not advice or a Fatwa; the right structure depends on the facts and the bank’s Shari’ah board.' }),
        h('section.card', chipRow(WHO, function () { return who; }, function (v) { who = v; }, 'Who is the client?'), chipRow(USE, function () { return use; }, function (v) { use = v; }, 'What do they need?')),
        h('section.card', out));
    });
  });

  /* ---------- Product quiz ---------- */
  IFL.route('/products/quiz', function (ctx) {
    return Promise.all([load(), D.loadAllChapters()]).then(function (res) {
      var R = res[0], id = ctx.query.id;
      var all = IFL.productQuestions(R.products, R.concepts);
      var p = id ? R.products.filter(function (x) { return x.id === id; })[0] : null;
      var items = p ? all.filter(function (q) { return q.id.indexOf('pq-' + p.id + '-') === 0; }) : u.shuffle(all).slice(0, Number(ctx.query.n) || 12);
      var label = p ? 'Product quiz: ' + p.name : 'Islamic banking products quiz';
      var head = C.pageHead({ crumbs: [{ label: 'Products', route: '/products' }].concat(p ? [{ label: p.name, route: '/product/' + p.id }] : []).concat([{ label: 'Quiz' }]), eyebrow: 'Islamic banking products', title: label,
        desc: 'Questions are generated from the product catalogue: the core contract, the need a product meets, its conventional counterpart and how its risks are managed. They also appear in the main quiz pool.' });
      if (!items.length) return h('div', head, C.empty('No questions for this product', '', h('a.btn.primary', { href: '#/products/quiz' }, 'Mixed product quiz')));
      return h('div', head, IFL.quizRunner(items, { label: label, mode: 'products' }));
    });
  });
})();
