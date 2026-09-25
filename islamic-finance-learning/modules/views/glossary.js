/* Glossary: book glossary (paraphrased) merged with definitions taught in chapters. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var cache = null;

  function key(term) { return u.norm(term).replace(/[^a-z0-9 ]/g, ' ').replace(/\b(al|ul|bil|bi|wal|e)\b/g, ' ').replace(/\s+/g, ' ').trim(); }
  function build() {
    if (cache) return cache;
    var D = window.IFL_DATA, map = {};
    function entry(term) {
      var k = key(term.split(/\s*[\/(]/)[0]);
      return map[k] = map[k] || { key: k, term: term, alts: {}, simple: null, academic: [], cat: null, topics: [], page: null };
    }
    D.sets.glossary.forEach(function (g) {
      var e = entry(g.term); e.term = g.term; e.simple = g.def; e.cat = g.cat; e.page = g.page;
      if (g.topic) e.topics.push(g.topic);
    });
    Object.keys(D.chapters).forEach(function (n) {
      D.chapters[n].topics.forEach(function (t) {
        (t.definitions || []).forEach(function (d) {
          d.term.split(/\s*\/\s*/).forEach(function (part, i) {
            var e = entry(i === 0 ? d.term : part);
            if (e.term !== d.term && i === 0 && !e.simple) e.term = d.term;
            if (!e.academic.some(function (a) { return a.meaning === d.meaning; })) e.academic.push({ meaning: d.meaning, topic: t.id });
            if (e.topics.indexOf(t.id) < 0) e.topics.push(t.id);
            if (!e.cat) e.cat = 'Chapter terms';
          });
        });
      });
    });
    var list = Object.keys(map).map(function (k) { return map[k]; });
    list.forEach(function (e) {
      var plain = e.term.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[‘’´`]/g, '');
      if (plain !== e.term) e.alts[plain] = 1;
      e.term.split(/\s*[\/]\s*|\s*\(|\)/).forEach(function (p) { p = p.trim(); if (p && p !== e.term) e.alts[p] = 1; });
      e.altList = Object.keys(e.alts);
      e.letter = u.norm(e.term).replace(/^[^a-z]+/, '').charAt(0).toUpperCase() || '#';
      e.id = 'g-' + e.key.replace(/ /g, '-');
    });
    list.sort(function (a, b) { return u.norm(a.term).replace(/^[^a-z]+/, '').localeCompare(u.norm(b.term).replace(/^[^a-z]+/, '')); });
    // related terms: share a topic, or appear in the definition text
    var byTopic = {}; list.forEach(function (e) { e.topics.forEach(function (t) { (byTopic[t] = byTopic[t] || []).push(e); }); });
    list.forEach(function (e) {
      var rel = {};
      e.topics.forEach(function (t) { (byTopic[t] || []).forEach(function (o) { if (o !== e) rel[o.id] = o; }); });
      var text = u.norm((e.simple || '') + ' ' + e.academic.map(function (a) { return a.meaning; }).join(' '));
      list.forEach(function (o) { if (o !== e && o.key.length > 3 && text.indexOf(u.norm(o.term.split(/[\/(]/)[0]).trim()) > -1) rel[o.id] = o; });
      e.related = Object.keys(rel).slice(0, 8).map(function (k) { return rel[k]; });
    });
    cache = list; return list;
  }
  IFL.glossaryIndex = function () { return Promise.all([window.IFL_DATA.load(['glossary']), window.IFL_DATA.loadAllChapters()]).then(build); };

  IFL.route('/glossary', function (ctx) {
    return IFL.glossaryIndex().then(function (all) {
      var q = ctx.query.q || '', letter = ctx.query.letter || '', cat = ctx.query.cat || '';
      var focus = ctx.query.term || '';
      var cats = {}; all.forEach(function (e) { cats[e.cat] = (cats[e.cat] || 0) + 1; });
      var input = h('input.input', { type: 'search', value: q, placeholder: 'Search terms and meanings…', 'aria-label': 'Search glossary' });
      var catSel = h('select.input', { 'aria-label': 'Category', style: { maxWidth: '240px' } }, h('option', { value: '' }, 'All categories (' + all.length + ')'),
        Object.keys(cats).sort().map(function (c) { return h('option', { value: c, selected: c === cat }, c + ' (' + cats[c] + ')'); }));
      var letters = {}; all.forEach(function (e) { letters[e.letter] = 1; });
      var az = h('div.az', { role: 'group', 'aria-label': 'Filter by letter' }, [''].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).map(function (L) {
        return h('button', { type: 'button', 'aria-pressed': String(L === letter), disabled: L && !letters[L], 'aria-label': L ? 'Letter ' + L : 'All letters', onclick: function () { letter = L; draw(); } }, L || 'All');
      }));
      var results = h('div');
      var count = h('p.small.muted');
      function matches(e) {
        if (letter && e.letter !== letter) return false;
        if (cat && e.cat !== cat) return false;
        if (q) { var nq = u.norm(q); return u.norm(e.term + ' ' + e.altList.join(' ') + ' ' + (e.simple || '') + ' ' + e.academic.map(function (a) { return a.meaning; }).join(' ')).indexOf(nq) > -1; }
        return true;
      }
      function entryEl(e) {
        return h('article.gl-entry', { id: e.id },
          h('div.row.between', h('h3', e.term), h('div.row', h('span.badge', e.cat), C.bookmarkBtn({ type: 'term', id: e.id, label: e.term, route: '/glossary?term=' + encodeURIComponent(e.id) }, true))),
          e.altList.length ? h('div.alt', 'Also written: ' + e.altList.join(' · ')) : null,
          e.simple ? h('p', { style: { margin: '6px 0' } }, h('strong', 'Meaning: '), e.simple) : null,
          e.academic.length ? h('div', e.academic.map(function (a) {
            var m = IFL.course.topic(a.topic);
            return h('p.small', { style: { margin: '4px 0' } }, h('strong', 'In the chapter: '), a.meaning, ' ', m ? h('a', { href: '#/topic/' + a.topic }, '(' + IFL.course.sourceLabel(a.topic) + ')') : null);
          })) : null,
          h('div.row.small', { style: { marginTop: '6px' } },
            e.page ? h('span.muted', 'Book glossary p. ' + e.page) : null,
            e.topics.slice(0, 3).map(function (t) { var m = IFL.course.topic(t); return m ? h('a.chip', { href: '#/topic/' + t }, 'Ch ' + m.chapter + ' §' + m.section) : null; })),
          e.related.length ? h('div.small', { style: { marginTop: '6px' } }, h('span.muted', 'Related: '), e.related.map(function (r, i) { return [i ? ', ' : '', h('a', { href: '#/glossary?term=' + encodeURIComponent(r.id) }, r.term)]; })) : null);
      }
      function draw() {
        Array.prototype.forEach.call(az.children, function (b) { b.setAttribute('aria-pressed', String((b.textContent === 'All' ? '' : b.textContent) === letter)); });
        var list = all.filter(matches);
        count.textContent = list.length + ' term' + (list.length === 1 ? '' : 's');
        results.innerHTML = '';
        if (!list.length) results.appendChild(C.empty('No matching terms', 'Try another spelling — transliterations vary (e.g. Ijarah / Ijara).'));
        list.slice(0, 400).forEach(function (e) { results.appendChild(entryEl(e)); });
      }
      input.addEventListener('input', u.debounce(function () { q = input.value.trim(); draw(); }, 150));
      catSel.addEventListener('change', function () { cat = catSel.value; draw(); });
      draw();
      if (focus) setTimeout(function () { var el = document.getElementById(focus); if (el) { el.scrollIntoView({ block: 'start' }); el.style.background = 'var(--accent-soft)'; } }, 50);
      return h('div',
        C.pageHead({ eyebrow: 'Reference', title: 'Glossary', desc: 'Definitions paraphrased from the book\'s glossary (pp. 485–496), merged with the definitions taught inside each chapter. Transliterations follow the textbook.' }),
        h('div.card', h('div.row', input, catSel), h('div', { style: { marginTop: '10px' } }, az)),
        count, h('div.card', results));
    });
  });
})();
