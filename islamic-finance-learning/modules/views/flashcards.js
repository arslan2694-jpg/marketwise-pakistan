/* Flashcards with deterministic spaced review (Again / Hard / Good / Easy). */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var CATS = ['Definitions', 'Arabic terminology', 'Principles', 'Prohibitions', 'Contract rules', 'Financing modes', 'Banking', 'Capital markets', 'Risk', 'Comparisons', 'Exam facts'];

  function allCards() {
    return window.IFL_DATA.loadAllChapters().then(function (chs) {
      var out = [];
      chs.forEach(function (ch) { ch.flashcards.forEach(function (f) { out.push(Object.assign({ chapter: ch.number }, f)); }); });
      return out;
    });
  }
  IFL.allCards = allCards;

  IFL.route('/flashcards', function () {
    return allCards().then(function (cards) {
      var S = IFL.srs, st = IFL.store.state;
      var counts = { new: 0, due: 0, difficult: 0, scheduled: 0 };
      cards.forEach(function (c) { counts[S.status(c.id)]++; });
      function deckLink(label, q, n, desc) { return h('a.card.card-link', { href: '#/flashcards/review?' + q }, h('div.row.between', h('h3', { style: { margin: 0, fontSize: 'var(--fs-md)' } }, label), h('span.badge', String(n))), desc ? h('p.small.text-2', { style: { margin: '6px 0 0' } }, desc) : null); }
      var byCat = {}; cards.forEach(function (c) { byCat[c.cat] = (byCat[c.cat] || 0) + 1; });
      return h('div',
        C.pageHead({ eyebrow: 'Practice', title: 'Flashcards', desc: 'Spaced review: cards you find hard come back sooner; easy cards are spaced out. Scheduling is deterministic and stored only on this device.' }),
        h('div.grid.grid-4',
          h('div.card', C.stat(cards.length, 'Cards')), h('div.card', C.stat(counts.due, 'Due now')), h('div.card', C.stat(counts.new, 'Not yet studied')), h('div.card', C.stat(st.reviews.length, 'Reviews done'))),
        h('h2', { style: { marginTop: '24px' } }, 'Review'),
        h('div.grid.grid-3',
          deckLink('Due cards', 'scope=due', counts.due, 'Cards whose review date has arrived.'),
          deckLink('Difficult cards', 'scope=difficult', counts.difficult, 'Cards you have forgotten repeatedly.'),
          deckLink('New cards', 'scope=new', counts.new, 'Cards you have not seen yet, in book order.'),
          deckLink('Mixed session', 'scope=all', cards.length, 'Due first, then new, then the rest.')),
        h('h2', { style: { marginTop: '24px' } }, 'By chapter'),
        h('div.grid.grid-auto', IFL.course.chapters.map(function (c) { return deckLink('Ch ' + c.n + ' · ' + IFL.trunc(c.title, 40), 'chapter=' + c.n, c.counts.flashcards); })),
        h('h2', { style: { marginTop: '24px' } }, 'By category'),
        h('div.grid.grid-auto', CATS.filter(function (k) { return byCat[k]; }).map(function (k) { return deckLink(k, 'cat=' + encodeURIComponent(k), byCat[k]); })));
    });
  });

  IFL.route('/flashcards/review', function (ctx) {
    return allCards().then(function (cards) {
      var q = ctx.query, S = IFL.srs;
      var deck = cards.filter(function (c) {
        if (q.chapter && String(c.chapter) !== q.chapter) return false;
        if (q.cat && c.cat !== q.cat) return false;
        if (q.topics && q.topics.split(',').indexOf(c.topic) < 0) return false;
        var s = S.status(c.id);
        if (q.scope === 'due') return s === 'due';
        if (q.scope === 'difficult') return s === 'difficult' || (IFL.store.state.cards[c.id] && IFL.store.state.cards[c.id].lapses > 0);
        if (q.scope === 'new') return s === 'new';
        return true;
      });
      var title = q.chapter ? 'Chapter ' + q.chapter + ' flashcards' : q.cat ? q.cat : q.scope === 'due' ? 'Due cards' : q.scope === 'difficult' ? 'Difficult cards' : q.scope === 'new' ? 'New cards' : 'Flashcards';
      var queue = q.scope === 'new' ? deck : S.order(deck);
      var limit = Number(q.n) || 30; queue = queue.slice(0, limit);
      var head = C.pageHead({ crumbs: [{ label: 'Flashcards', route: '/flashcards' }, { label: title }], eyebrow: 'Flashcard review', title: title });
      if (!queue.length) return h('div', head, C.empty('Nothing to review here', q.scope === 'due' ? 'No cards are due right now — come back later or study new cards.' : 'This deck is empty.', h('a.btn.primary', { href: '#/flashcards' }, 'Choose another deck')));
      return h('div', head, session(queue, { onDone: null }));
    });
  });

  /* A review session component (also used by guided study). */
  function session(queue, opts) {
    opts = opts || {};
    var i = 0, flipped = false, tally = [0, 0, 0, 0];
    var root = h('div');
    var counter = h('div.small.muted.tabular');
    var bar = C.bar(0, 'thin');
    function card() { return queue[i]; }
    function draw() {
      root.innerHTML = '';
      if (i >= queue.length) return summary();
      var c = card(), meta = IFL.course.topic(c.topic);
      flipped = false;
      var flash = h('div.flash', { role: 'button', tabindex: 0, 'aria-label': 'Flashcard. Press space or enter to flip.' },
        h('div.flash-face.front', h('span.badge.accent.cat', c.cat), h('div.front-text', c.front), h('div.hint', 'Click or press Space to reveal')),
        h('div.flash-face.back', h('div.row.between', h('span.badge', c.cat), h('span.small.muted', meta ? IFL.course.sourceLabel(c.topic) : '')),
          h('p', { style: { fontSize: 'var(--fs-lg)', marginTop: '12px' } }, c.back),
          meta ? h('div.small', h('a', { href: '#/topic/' + c.topic, onclick: function (e) { e.stopPropagation(); } }, 'Source: Chapter ' + meta.chapter + ', §' + meta.section + ' ' + meta.title + (meta.pages ? ' (' + C.pagesLabel(meta.pages) + ')' : ''))) : null));
      function flip() { flipped = !flipped; flash.classList.toggle('flipped', flipped); grades.style.visibility = flipped ? 'visible' : 'hidden'; }
      flash.addEventListener('click', flip);
      flash.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
      var st = IFL.store.state.cards[c.id];
      var grades = h('div.grade-bar', { style: { visibility: 'hidden' } }, ['Again', 'Hard', 'Good', 'Easy'].map(function (g, k) {
        return h('button.btn.' + g.toLowerCase(), { type: 'button', onclick: function () { grade(k); } }, g, h('small', IFL.srs.label(st, k) + ' · ' + (k + 1)));
      }));
      function grade(k) { IFL.srs.grade(c.id, k); tally[k]++; i++; draw(); }
      IFL.keys = function (key) { if (key === ' ') { flip(); return true; } if (flipped && '1234'.indexOf(key) > -1) { grade(Number(key) - 1); return true; } };
      counter.textContent = 'Card ' + (i + 1) + ' of ' + queue.length;
      bar.firstChild.style.width = Math.round(100 * i / queue.length) + '%';
      u.append(root, [h('div.row.between', { style: { maxWidth: '700px', margin: '0 auto 10px' } }, counter,
        h('div.row', C.bookmarkBtn({ type: 'flashcard', id: c.id, label: c.front, route: '/flashcards/review?topics=' + c.topic }, true), C.noteBtn({ type: 'flashcard', id: c.id, label: c.front, route: '/flashcards/review?topics=' + c.topic }, true))),
        h('div', { style: { maxWidth: '700px', margin: '0 auto 14px' } }, bar),
        h('div.flash-stage', flash), grades,
        h('p.small.muted', { style: { textAlign: 'center', marginTop: '10px' } }, 'Keyboard: Space to flip · 1 Again · 2 Hard · 3 Good · 4 Easy')]);
      setTimeout(function () { flash.focus({ preventScroll: true }); });
    }
    function summary() {
      IFL.progress.log('cards', 'Reviewed ' + queue.length + ' flashcards', '/flashcards');
      IFL.keys = null;
      root.appendChild(h('div.card', { style: { maxWidth: '700px', margin: '0 auto', textAlign: 'center' } },
        h('h2', 'Session complete'), h('p', queue.length + ' cards reviewed.'),
        h('div.grid.grid-4', ['Again', 'Hard', 'Good', 'Easy'].map(function (g, k) { return C.stat(tally[k], g); })),
        h('div.row', { style: { justifyContent: 'center', marginTop: '16px' } }, opts.onDone ? h('button.btn.primary', { type: 'button', onclick: opts.onDone }, 'Continue') : h('a.btn.primary', { href: '#/flashcards' }, 'Back to decks'), h('a.btn', { href: '#/' }, 'Dashboard'))));
      if (opts.onFinish) opts.onFinish();
    }
    draw();
    return root;
  }
  IFL.flashSession = session;
})();
