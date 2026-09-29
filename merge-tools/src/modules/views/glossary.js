
/* Glossary + acronyms.
   One canonical record per concept: the book glossary (paraphrased) and the companion glossary are merged, chapter definitions
   (main lessons AND companion notes) are attached, alternate transliterations are kept as aliases and are searchable. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var cache = null;

  function key(term) { return u.norm(term.split(/\s*[\/(]/)[0]).replace(/[^a-z0-9 ]/g, ' ').replace(/\b(al|ul|bil|bi|wal|e)\b/g, ' ').replace(/\s+/g, ' ').trim(); }
  IFL.glossaryId = function (term) { return 'g-' + key(term).replace(/ /g, '-'); };

  function build() {
    if (cache) return cache;
    var D = window.IFL_DATA, map = {};
    function entry(term) {
      var k = key(term);
      return map[k] = map[k] || { key: k, term: term, alts: {}, simple: null, more: [], more2: [], academic: [], cat: null, topics: [], page: null, pages2: [], chapter: null, relatedNames: [], origin: {} };
    }
    D.sets.glossary.forEach(function (g) {
      var e = entry(g.term); e.term = g.term; e.simple = g.def; e.cat = g.cat; e.page = g.page;
      if (g.topic) e.topics.push(g.topic);
      (g.defs2 || []).forEach(function (m) { e.more2.push(m); });
      (g.moreDefs || []).forEach(function (m) { e.more.push(m); if (m.topic && e.topics.indexOf(m.topic) < 0) e.topics.push(m.topic); });
      (g.alts || []).forEach(function (a) { e.alts[a] = 1; });
      if (g.pages2 && g.pages2.length) e.pages2 = g.pages2;
      if (g.chapter) e.chapter = g.chapter;
      (g.related || []).forEach(function (r) { e.relatedNames.push(r); });
      (g.origin || []).forEach(function (o) { e.origin[o] = 1; });
    });
    /* Definitions taught inside chapters — main lessons and companion notes. */
    Object.keys(D.chapters).forEach(function (n) {
      D.chapters[n].topics.forEach(function (t) {
        function take(d, source) {
          var meaning = d.meaning;
          d.term.split(/\s*\/\s*/).forEach(function (part, i) {
            var e = entry(i === 0 ? d.term : part);
            if (e.term !== d.term && i === 0 && !e.simple) e.term = d.term;
            if (!e.academic.some(function (a) { return a.meaning === meaning; })) e.academic.push({ meaning: meaning, topic: t.id, source: source });
            if (e.topics.indexOf(t.id) < 0) e.topics.push(t.id);
            if (!e.cat) e.cat = 'Chapter terms';
            e.origin[source] = 1;
          });
        }
        (t.definitions || []).forEach(function (d) { take(d, 'lesson'); });
        (t.companions || []).forEach(function (c) { (c.definitions || []).forEach(function (d) { take(d, 'companion'); }); });
      });
    });
    var list = Object.keys(map).map(function (k) { return map[k]; });
    list.forEach(function (e) {
      var plain = e.term.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[‘’´`]/g, '');
      if (plain !== e.term) e.alts[plain] = 1;
      e.term.split(/\s*[\/]\s*|\s*\(|\)/).forEach(function (p) { p = p.trim(); if (p && p !== e.term) e.alts[p] = 1; });
      e.altList = Object.keys(e.alts).filter(function (a) { return a !== e.term; });
      e.letter = u.norm(e.term).replace(/^[^a-z]+/, '').charAt(0).toUpperCase() || '#';
      e.id = 'g-' + e.key.replace(/ /g, '-');
      e.search = u.fold(e.term + ' ' + e.altList.join(' ') + ' ' + (e.simple || '') + ' ' + e.more2.map(function (m) { return m.def; }).join(' ') + ' ' + e.more.map(function (m) { return m.def; }).join(' ') + ' ' + e.academic.map(function (a) { return a.meaning; }).join(' '));
      e.foldTerms = u.fold(e.term + ' ' + e.altList.join(' '));
    });
    list.sort(function (a, b) { return u.norm(a.term).replace(/^[^a-z]+/, '').localeCompare(u.norm(b.term).replace(/^[^a-z]+/, '')); });
    var byKey = {}; list.forEach(function (e) { byKey[e.key] = e; });
    // related terms: explicit companion links, shared topic, or mentioned in the definition text
    var byTopic = {}; list.forEach(function (e) { e.topics.forEach(function (t) { (byTopic[t] = byTopic[t] || []).push(e); }); });
    list.forEach(function (e) {
      var rel = {};
      e.relatedNames.forEach(function (r) { var o = byKey[key(r)]; if (o && o !== e) rel[o.id] = o; });
      e.topics.forEach(function (t) { (byTopic[t] || []).forEach(function (o) { if (o !== e) rel[o.id] = o; }); });
      var text = u.norm((e.simple || '') + ' ' + e.academic.map(function (a) { return a.meaning; }).join(' '));
      list.forEach(function (o) { if (o !== e && o.key.length > 3 && text.indexOf(u.norm(o.term.split(/[\/(]/)[0]).trim()) > -1) rel[o.id] = o; });
      e.related = Object.keys(rel).slice(0, 10).map(function (k) { return rel[k]; });
    });
    cache = list; return list;
  }
  IFL.glossaryIndex = function () { return Promise.all([window.IFL_DATA.load(['glossary']), window.IFL_DATA.loadAllChapters()]).then(build); };

  function acronymList() { return (window.IFL_DATA.sets.acronyms || []).slice().sort(function (a, b) { return a.acronym.localeCompare(b.acronym); }); }

  IFL.route('/glossary', function (ctx) {
    return IFL.glossaryIndex().then(function (all) {
      var tab = ctx.query.tab === 'acronyms' ? 'acronyms' : 'terms';
      var q = ctx.query.q || '', letter = ctx.query.letter || '', cat = ctx.query.cat || '';
      var focus = ctx.query.term || '';
      var bi = IFL.course.bookIndex(), bm = bi && bi.backMatter;
      var tabBar = h('div.seg', { role: 'tablist', 'aria-label': 'Glossary sections', style: { margin: '0 0 14px' } },
        [['terms', 'Terms (' + all.length + ')'], ['acronyms', 'Acronyms (' + acronymList().length + ')']].map(function (t) {
          return h('button', { type: 'button', role: 'tab', 'aria-selected': String(t[0] === tab), onclick: function () { IFL.go('/glossary?tab=' + t[0]); } }, t[1]);
        }));
      if (tab === 'acronyms') return acronymsView(tabBar, q, bm);

      var cats = {}; all.forEach(function (e) { cats[e.cat] = (cats[e.cat] || 0) + 1; });
      var input = h('input.input', { type: 'search', value: q, placeholder: 'Search terms, spellings and meanings…', 'aria-label': 'Search glossary' });
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
        if (q) { var terms = u.fold(q).split(' ').filter(Boolean); return terms.every(function (t) { return e.search.indexOf(t) > -1; }); }
        return true;
      }
      function entryEl(e) {
        return h('article.gl-entry', { id: e.id },
          h('div.row.between', h('h2.gl-term', e.term), h('div.row', h('span.badge', e.cat), C.bookmarkBtn({ type: 'term', id: e.id, label: e.term, route: '/glossary?term=' + encodeURIComponent(e.id) }, true))),
          e.altList.length ? h('div.alt', 'Also written: ' + e.altList.join(' · ')) : null,
          e.simple ? h('p', { style: { margin: '6px 0' } }, h('strong', 'Meaning: '), e.simple) : null,
          e.more.map(function (m) { return h('p.small', { style: { margin: '4px 0' } }, h('strong', 'Also (' + m.term + '): '), m.def); }),
          e.more2.map(function (m) { return h('p.small', { style: { margin: '4px 0' } }, h('strong', 'Companion glossary' + (m.term !== e.term ? ' (' + m.term + ')' : '') + ': '), m.def); }),
          e.academic.length ? h('div', e.academic.map(function (a) {
            var m = IFL.course.topic(a.topic);
            return h('p.small', { style: { margin: '4px 0' } }, h('strong', a.source === 'companion' ? 'In the companion notes: ' : 'In the chapter: '), a.meaning, ' ', m ? h('a', { href: '#/topic/' + a.topic }, '(' + IFL.course.sourceLabel(a.topic) + ')') : null);
          })) : null,
          h('div.row.small', { style: { marginTop: '6px' } },
            e.page ? h('span.muted', 'Book glossary p. ' + e.page) : null,
            !e.page && e.pages2.length ? h('span.muted', 'Book p. ' + e.pages2.join(', ')) : null,
            e.chapter && !e.topics.length ? h('a.chip', { href: '#/chapter/' + e.chapter }, 'Chapter ' + e.chapter) : null,
            e.topics.slice(0, 3).map(function (t) { var m = IFL.course.topic(t); return m ? h('a.chip', { href: '#/topic/' + t }, 'Ch ' + m.chapter + ' §' + m.section) : null; })),
          e.related.length ? h('div.small', { style: { marginTop: '6px' } }, h('span.muted', 'Related: '), e.related.map(function (r, i) { return [i ? ', ' : '', h('a', { href: '#/glossary?term=' + encodeURIComponent(r.id) }, r.term)]; })) : null);
      }
      function draw() {
        Array.prototype.forEach.call(az.children, function (b) { b.setAttribute('aria-pressed', String((b.textContent === 'All' ? '' : b.textContent) === letter)); });
        var list = all.filter(matches);
        count.textContent = list.length + ' term' + (list.length === 1 ? '' : 's');
        results.innerHTML = '';
        if (!list.length) results.appendChild(C.empty('No matching terms', 'Try another spelling — transliterations vary (e.g. Ijarah / Ijara, Istisna‘a / Istisnaa) and all of them are matched.'));
        list.slice(0, 400).forEach(function (e) { results.appendChild(entryEl(e)); });
      }
      input.addEventListener('input', u.debounce(function () { q = input.value.trim(); draw(); }, 150));
      catSel.addEventListener('change', function () { cat = catSel.value; draw(); });
      draw();
      if (focus) setTimeout(function () { var el = document.getElementById(focus); if (el) { el.scrollIntoView({ block: 'start' }); el.style.background = 'var(--accent-soft)'; } }, 50);
      return h('div',
        C.pageHead({ eyebrow: 'Reference', title: 'Glossary', desc: 'One record per concept: the book\'s glossary (pp. 485–496, paraphrased), the companion glossary, and the definitions taught in every chapter. Alternate transliterations are searchable.' }),
        tabBar, h('div.card', h('div.row', input, catSel), h('div', { style: { marginTop: '10px' } }, az)),
        count, h('div.card', results));
    });
  });

  function acronymsView(tabBar, q, bm) {
    var list = acronymList(), input = h('input.input', { type: 'search', value: q, placeholder: 'Search acronyms or expansions…', 'aria-label': 'Search acronyms' });
    var results = h('div.grid.grid-auto'), count = h('p.small.muted');
    function draw() {
      var terms = u.fold(q).split(' ').filter(Boolean);
      var shown = list.filter(function (a) { var t = u.fold(a.acronym + ' ' + a.expansion); return terms.every(function (x) { return t.indexOf(x) > -1; }); });
      count.textContent = shown.length + ' of ' + list.length + ' acronyms';
      results.innerHTML = '';
      if (!shown.length) results.appendChild(C.empty('No matching acronyms'));
      shown.forEach(function (a) { results.appendChild(h('div.card.flat', { id: a.id, style: { padding: '12px' } }, h('div.row.between', h('strong', a.acronym), C.bookmarkBtn({ type: 'acronym', id: a.id, label: a.acronym + ' — ' + a.expansion, route: '/glossary?tab=acronyms&q=' + encodeURIComponent(a.acronym) }, true)), h('div.small.text-2', a.expansion))); });
    }
    input.addEventListener('input', u.debounce(function () { q = input.value.trim(); draw(); }, 150));
    draw();
    return h('div',
      C.pageHead({ eyebrow: 'Reference', title: 'Glossary', desc: 'Acronyms used in Islamic finance and in the textbook' + (bm ? ' (the book\'s own list is on p. ' + bm.acronyms.page + ', PDF page ' + bm.acronyms.pdfPage + ')' : '') + '.' }),
      tabBar, h('div.card', input), count, results);
  }
})();
