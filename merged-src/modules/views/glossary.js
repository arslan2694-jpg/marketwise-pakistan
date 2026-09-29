/* Glossary + acronyms: the book glossary (definitions from both study sources), merged with the
   definitions taught inside each chapter, plus the book's list of acronyms and abbreviations. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var cache = null;

  function key(term) { return u.norm(term).replace(/[^a-z0-9 ]/g, ' ').replace(/\b(al|ul|bil|bi|wal|e)\b/g, ' ').replace(/\s+/g, ' ').trim(); }
  function build() {
    if (cache) return cache;
    var map = {}, byGid = {};
    function entry(term) {
      var k = key(term.split(/\s*[\/(]/)[0]);
      return map[k] = map[k] || { key: k, term: term, alts: {}, simple: null, extended: null, academic: [], cat: null, topics: [], page: null, pages: null, relatedTerms: [], gid: null };
    }
    IFL.data.glossary.forEach(function (g) {
      var e = entry(g.term); e.term = g.term; e.simple = g.definition; e.extended = g.extendedDefinition || null; e.cat = g.category; e.page = g.glossaryPage; e.pages = g.discussedOnPages || null; e.gid = g.id;
      e.relatedTerms = g.relatedTerms || []; (g.aliases || []).forEach(function (a) { e.alts[a] = 1; });
      if (g.topicId) e.topics.push(g.topicId);
      byGid[g.id] = e;
    });
    /* definitions taught inside chapters (own and extended notes) */
    IFL.data.topics.forEach(function (t) {
      function take(d, ext) {
        d.term.split(/\s*\/\s*/).forEach(function (part, i) {
          var e = entry(i === 0 ? d.term : part);
          if (e.term !== d.term && i === 0 && !e.simple) e.term = d.term;
          if (!e.academic.some(function (a) { return a.meaning === d.definition; })) e.academic.push({ meaning: d.definition, topic: t.id, extended: !!ext });
          if (e.topics.indexOf(t.id) < 0) e.topics.push(t.id);
          if (!e.cat) e.cat = 'Chapter terms';
        });
      }
      (t.definitions || []).forEach(function (d) { take(d, false); });
      (t.supplements || []).forEach(function (s) { (s.definitions || []).forEach(function (d) { take(d, true); }); });
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
    var byTopic = {}; list.forEach(function (e) { e.topics.forEach(function (t) { (byTopic[t] = byTopic[t] || []).push(e); }); });
    var byTerm = {}; list.forEach(function (e) { byTerm[key(e.term.split(/[\/(]/)[0])] = e; e.altList.forEach(function (a) { byTerm[key(a)] = byTerm[key(a)] || e; }); });
    list.forEach(function (e) {
      var rel = {};
      e.relatedTerms.forEach(function (rt) { var o = byTerm[key(rt)]; if (o && o !== e) rel[o.id] = o; });
      e.topics.forEach(function (t) { (byTopic[t] || []).forEach(function (o) { if (o !== e) rel[o.id] = o; }); });
      var text = u.norm((e.simple || '') + ' ' + (e.extended || '') + ' ' + e.academic.map(function (a) { return a.meaning; }).join(' '));
      list.forEach(function (o) { if (o !== e && o.key.length > 3 && text.indexOf(u.norm(o.term.split(/[\/(]/)[0]).trim()) > -1) rel[o.id] = o; });
      e.related = Object.keys(rel).slice(0, 10).map(function (k) { return rel[k]; });
    });
    list.byId = {}; list.forEach(function (e) { list.byId[e.id] = e; if (e.gid) list.byId[e.gid] = e; });
    cache = list; return list;
  }
  IFL.glossaryIndex = function () { return Promise.resolve(build()); };

  function acronymsView(ctx) {
    var all = IFL.data.acronyms.slice().sort(function (a, b) { return u.norm(a.acronym).localeCompare(u.norm(b.acronym)); });
    var q = ctx.query.q || '', letter = ctx.query.letter || '';
    var input = h('input.input', { type: 'search', value: q, placeholder: 'Search acronyms or their meanings…', 'aria-label': 'Search acronyms' });
    var results = h('div'), count = h('p.small.muted');
    var letters = {}; all.forEach(function (a) { letters[a.acronym.charAt(0).toUpperCase()] = 1; });
    var az = h('div.az', { role: 'group', 'aria-label': 'Filter by letter' }, [''].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).map(function (L) {
      return h('button', { type: 'button', 'aria-pressed': String(L === letter), disabled: L && !letters[L], 'aria-label': L ? 'Letter ' + L : 'All letters', onclick: function () { letter = L; draw(); } }, L || 'All');
    }));
    function draw() {
      Array.prototype.forEach.call(az.children, function (b) { b.setAttribute('aria-pressed', String((b.textContent === 'All' ? '' : b.textContent) === letter)); });
      var nq = u.norm(q);
      var list = all.filter(function (a) { return (!letter || a.acronym.charAt(0).toUpperCase() === letter) && (!nq || u.norm(a.acronym + ' ' + a.expansion).indexOf(nq) > -1); });
      count.textContent = list.length + ' acronym' + (list.length === 1 ? '' : 's');
      results.innerHTML = '';
      if (!list.length) results.appendChild(C.empty('No matching acronyms', 'Try another spelling.'));
      else results.appendChild(h('div.table-wrap', h('table', h('caption', 'Acronyms and abbreviations used in the book'), h('thead', h('tr', h('th', { scope: 'col' }, 'Acronym'), h('th', { scope: 'col' }, 'Meaning'), h('th', { scope: 'col' }, ''))),
        h('tbody', list.map(function (a) { return h('tr', { id: a.id }, h('th', { scope: 'row' }, a.acronym), h('td', a.expansion), h('td', C.bookmarkBtn({ type: 'acronym', id: a.id, label: a.acronym + ' — ' + a.expansion, route: '/glossary?tab=acronyms&q=' + encodeURIComponent(a.acronym) }, true))); })))));
    }
    input.addEventListener('input', u.debounce(function () { q = input.value.trim(); draw(); }, 150));
    draw();
    return h('div.stack', h('div.card', h('div.row', input), h('div', { style: { marginTop: '10px' } }, az)), count, h('div.card', results),
      h('p.small.muted', 'Source: “Acronyms and Abbreviations” in the book’s back matter' + (IFL.data.bookIndex.backMatter && IFL.data.bookIndex.backMatter.acronyms ? ' (p. ' + IFL.data.bookIndex.backMatter.acronyms.page + ')' : '') + '.'));
  }

  IFL.route('/glossary', function (ctx) {
    var tab = ctx.query.tab === 'acronyms' ? 'acronyms' : 'terms';
    var tabs = h('div.seg', { role: 'tablist', 'aria-label': 'Reference lists', style: { margin: '0 0 16px' } }, [['terms', 'Glossary'], ['acronyms', 'Acronyms (' + IFL.data.acronyms.length + ')']].map(function (t) {
      return h('button', { type: 'button', role: 'tab', 'aria-selected': String(t[0] === tab), 'aria-pressed': String(t[0] === tab), onclick: function () { IFL.go('/glossary' + (t[0] === 'acronyms' ? '?tab=acronyms' : '')); } }, t[1]);
    }));
    if (tab === 'acronyms') return h('div', C.pageHead({ eyebrow: 'Reference', title: 'Glossary and acronyms', desc: 'The book’s glossary of Islamic finance terms and its list of acronyms and abbreviations.' }), tabs, acronymsView(ctx));
    return IFL.glossaryIndex().then(function (all) {
      var q = ctx.query.q || '', letter = ctx.query.letter || '', cat = ctx.query.cat || '';
      var focus = ctx.query.term || '';
      var fe = focus && all.byId[focus]; if (fe) focus = fe.id;
      var cats = {}; all.forEach(function (e) { cats[e.cat] = (cats[e.cat] || 0) + 1; });
      var input = h('input.input', { type: 'search', value: q, placeholder: 'Search terms and meanings…', 'aria-label': 'Search glossary' });
      var catSel = h('select.input', { 'aria-label': 'Category', style: { maxWidth: '240px' } }, h('option', { value: '' }, 'All categories (' + all.length + ')'),
        Object.keys(cats).sort().map(function (c) { return h('option', { value: c, selected: c === cat }, c + ' (' + cats[c] + ')'); }));
      var letters = {}; all.forEach(function (e) { letters[e.letter] = 1; });
      var az = h('div.az', { role: 'group', 'aria-label': 'Filter by letter' }, [''].concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).map(function (L) {
        return h('button', { type: 'button', 'aria-pressed': String(L === letter), disabled: L && !letters[L], 'aria-label': L ? 'Letter ' + L : 'All letters', onclick: function () { letter = L; shown = 100; draw(); } }, L || 'All');
      }));
      var results = h('div'), shown = 100;
      var count = h('p.small.muted');
      function matches(e) {
        if (letter && e.letter !== letter) return false;
        if (cat && e.cat !== cat) return false;
        if (q) { var nq = u.norm(q); return u.norm(e.term + ' ' + e.altList.join(' ') + ' ' + (e.simple || '') + ' ' + (e.extended || '') + ' ' + e.academic.map(function (a) { return a.meaning; }).join(' ')).indexOf(nq) > -1; }
        return true;
      }
      function entryEl(e) {
        return h('article.gl-entry', { id: e.id },
          h('div.row.between', h('h3', e.term), h('div.row', h('span.badge', e.cat), C.bookmarkBtn({ type: 'term', id: e.id, label: e.term, route: '/glossary?term=' + encodeURIComponent(e.id) }, true), C.noteBtn({ type: 'term', id: e.id, label: e.term, route: '/glossary?term=' + encodeURIComponent(e.id) }, true))),
          e.altList.length ? h('div.alt', 'Also written: ' + e.altList.join(' · ')) : null,
          e.simple ? h('p', { style: { margin: '6px 0' } }, h('strong', 'Meaning: '), e.simple) : null,
          e.extended ? h('p', { style: { margin: '6px 0' } }, h('strong', 'Fuller definition: '), e.extended) : null,
          e.academic.length ? h('div', e.academic.map(function (a) {
            var m = IFL.course.topic(a.topic);
            return h('p.small', { style: { margin: '4px 0' } }, h('strong', a.extended ? 'In the chapter (extended notes): ' : 'In the chapter: '), a.meaning, ' ', m ? h('a', { href: '#/topic/' + a.topic }, '(' + IFL.course.sourceLabel(a.topic) + ')') : null);
          })) : null,
          h('div.row.small', { style: { marginTop: '6px' } },
            e.page ? h('span.muted', 'Book glossary p. ' + e.page) : null,
            e.pages ? h('span.muted', 'Discussed on p. ' + e.pages.join(', ')) : null,
            e.topics.slice(0, 3).map(function (t) { var m = IFL.course.topic(t); return m ? h('a.chip', { href: '#/topic/' + t }, 'Ch ' + m.chapter + ' §' + m.section) : null; })),
          e.related.length ? h('div.small', { style: { marginTop: '6px' } }, h('span.muted', 'Related: '), e.related.map(function (r, i) { return [i ? ', ' : '', h('a', { href: '#/glossary?term=' + encodeURIComponent(r.id) }, r.term)]; })) : null);
      }
      function draw() {
        Array.prototype.forEach.call(az.children, function (b) { b.setAttribute('aria-pressed', String((b.textContent === 'All' ? '' : b.textContent) === letter)); });
        var list = all.filter(matches);
        count.textContent = list.length + ' term' + (list.length === 1 ? '' : 's');
        results.innerHTML = '';
        if (!list.length) results.appendChild(C.empty('No matching terms', 'Try another spelling — transliterations vary (e.g. Ijarah / Ijara).'));
        list.slice(0, shown).forEach(function (e) { results.appendChild(entryEl(e)); });
        if (list.length > shown) results.appendChild(h('div.row', { style: { justifyContent: 'center', padding: '12px' } }, h('button.btn', { type: 'button', onclick: function () { shown = list.length; draw(); } }, 'Show all ' + list.length + ' terms')));
      }
      input.addEventListener('input', u.debounce(function () { q = input.value.trim(); shown = 100; draw(); }, 150));
      catSel.addEventListener('change', function () { cat = catSel.value; shown = 100; draw(); });
      if (focus) shown = all.length;
      draw();
      if (focus) setTimeout(function () { var el = document.getElementById(focus); if (el) { el.scrollIntoView({ block: 'start' }); el.style.background = 'var(--accent-soft)'; } }, 50);
      return h('div',
        C.pageHead({ eyebrow: 'Reference', title: 'Glossary and acronyms', desc: 'Definitions from the book\'s glossary (pp. 485–496) — both study sources\' wordings are kept — merged with the definitions taught inside each chapter. Transliterations follow the textbook.' }),
        tabs, h('div.card', h('div.row', input, catSel), h('div', { style: { marginTop: '10px' } }, az)),
        count, h('div.card', results));
    });
  });
})();
