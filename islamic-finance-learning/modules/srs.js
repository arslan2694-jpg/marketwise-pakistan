/* Deterministic spaced-review scheduler (SM-2 style) for flashcards.
   Grades: 0 Again, 1 Hard, 2 Good, 3 Easy. No server or randomness involved. */
(function () {
  var IFL = window.IFL, S = IFL.store;
  var MIN = 60 * 1000, DAY = 24 * 60 * MIN;

  function next(card, grade, now) {
    now = now || Date.now();
    var c = card ? Object.assign({}, card) : { reps: 0, ease: 2.5, interval: 0, lapses: 0 };
    if (grade === 0) {
      c.lapses = (c.lapses || 0) + 1; c.reps = 0; c.interval = 0; c.ease = Math.max(1.3, c.ease - 0.2);
      c.due = now + 10 * MIN;
    } else if (grade === 1) {
      c.interval = Math.max(1, Math.round((c.interval || 1) * 1.2)); c.ease = Math.max(1.3, c.ease - 0.15); c.reps++;
      c.due = now + c.interval * DAY;
    } else if (grade === 2) {
      c.interval = c.reps === 0 ? 1 : c.reps === 1 ? 3 : Math.round(c.interval * c.ease); c.reps++;
      c.due = now + c.interval * DAY;
    } else {
      c.interval = c.reps === 0 ? 4 : Math.round(Math.max(c.interval, 1) * c.ease * 1.3); c.ease = c.ease + 0.15; c.reps++;
      c.due = now + c.interval * DAY;
    }
    c.last = now; c.grade = grade;
    return c;
  }
  function label(card, grade) {
    var n = next(card, grade, 0);
    if (grade === 0) return '10 min';
    return n.interval + (n.interval === 1 ? ' day' : ' days');
  }
  function grade(id, g) {
    S.update(function (s) {
      s.cards[id] = next(s.cards[id], g);
      s.reviews.push({ ts: Date.now(), card: id, grade: g });
      if (s.reviews.length > 3000) s.reviews.splice(0, s.reviews.length - 3000);
    }, 'review');
    IFL.progress.checkAchievements();
  }
  function status(id) {
    var c = S.state.cards[id];
    if (!c) return 'new';
    if (c.due <= Date.now()) return 'due';
    if (c.lapses >= 2 || c.ease < 2) return 'difficult';
    return 'scheduled';
  }
  function dueCount() {
    var now = Date.now(), n = 0, cards = S.state.cards;
    Object.keys(cards).forEach(function (k) { if (cards[k].due <= now) n++; });
    return n;
  }
  /* Order a deck: due first (most overdue), then new, then difficult, then the rest. */
  function order(cards) {
    var now = Date.now(), st = S.state.cards;
    function rank(c) {
      var s = st[c.id]; if (!s) return 1e12 + (c._i || 0);
      if (s.due <= now) return s.due;
      return 2e12 + s.due;
    }
    return cards.map(function (c, i) { c._i = i; return c; }).sort(function (a, b) { return rank(a) - rank(b); });
  }
  IFL.srs = { next: next, label: label, grade: grade, status: status, dueCount: dueCount, order: order };
})();
