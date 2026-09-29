/* State migration. APP_STATE_VERSION 3 is the unified state. Both source applications stored a
   "version 1" record under different keys and shapes:
     application A ("F1"): localStorage "ifl.v1"  — topics/answers/attempts/cards/reviews/notes/...
     application B ("F2"): localStorage "ifl_v1"  — progress.{topicsCompleted, flashcardReviews, questionHistory, ...}
   Legacy records are converted, never deleted, and merged when both exist. Ids from either source
   are resolved to canonical ids through IFL.data (alias tables produced by tools/build-data.js). */
(function () {
  var IFL = window.IFL = window.IFL || {};
  var VERSION = 3;
  var DAY = 86400000;

  function defaults() {
    return {
      version: VERSION,
      created: Date.now(),
      settings: { theme: 'system', level: 'mba', fontScale: 1, reduceMotion: false, dailyGoal: 30, name: '', examDate: '' },
      topics: {},          // topicId -> {visited, completed, time, views}
      chapters: {},        // n -> {visited}
      answers: {},         // questionId -> {n, correct, last, lastCorrect, topic}
      attempts: [],        // {id, ts, mode, label, score, total, chapter, items:[{q, ok, topic}]}
      cards: {},           // flashcardId -> {reps, ease, interval, due, lapses, last, grade}
      reviews: [],         // {ts, card, grade}
      notes: [],           // {id, target:{type,id,label,route}, text, created, updated}
      bookmarks: [],       // {type, id, label, route, ts}
      activity: [],
      days: {},            // yyyy-mm-dd -> seconds studied
      timerSessions: [],
      guided: {},          // planId -> {seg, item, remaining, updated, finished}
      exam: {},            // examItemId / checklist -> {ts, text, self}
      cases: {},           // caseId -> {ts, n}
      calcs: {},           // calculator id -> {n, last}
      numericals: {},      // numerical id -> {n, correct, last}
      achievements: {},    // id -> ts
      legacy: { reviewsBefore: 0, imported: {} },
      last: {}
    };
  }

  function isObj(x) { return x && typeof x === 'object' && !Array.isArray(x); }
  function deepMerge(base, saved) {
    Object.keys(saved || {}).forEach(function (k) {
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') return;
      if (isObj(saved[k]) && isObj(base[k])) deepMerge(base[k], saved[k]);
      else if (saved[k] !== undefined) base[k] = saved[k];
    });
    return base;
  }
  function dayKey(ts) { var d = new Date(ts); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function num(x, d) { x = Number(x); return isFinite(x) ? x : (d == null ? 0 : d); }

  /* ---------- SRS sanitising: never leave NaN / negative / impossible values in a card ---------- */
  function cleanCard(c) {
    if (!isObj(c)) return null;
    var now = Date.now();
    var out = {
      reps: Math.max(0, Math.min(1000, Math.round(num(c.reps)))), ease: Math.max(1.3, Math.min(4, num(c.ease, 2.5))),
      interval: Math.max(0, Math.min(3650, Math.round(num(c.interval)))), lapses: Math.max(0, Math.min(1000, Math.round(num(c.lapses)))),
      due: num(c.due, now), last: num(c.last, 0), grade: [0, 1, 2, 3].indexOf(c.grade) > -1 ? c.grade : 2
    };
    if (!(out.due > 0) || out.due > now + 3650 * DAY) out.due = now;
    return out;
  }

  /* ---------- application A (v1) -> v3: ids are already canonical, add the new collections ---------- */
  function migrateF1StateToV3(old) {
    var s = deepMerge(defaults(), old || {});
    if (old && old.settings && old.settings.level === 'simple') s.settings.level = 'beginner';
    ['attempts', 'reviews', 'notes', 'bookmarks', 'activity', 'timerSessions'].forEach(function (k) { if (!Array.isArray(s[k])) s[k] = []; });
    Object.keys(s.cards).forEach(function (k) { var c = cleanCard(s.cards[k]); if (c) s.cards[k] = c; else delete s.cards[k]; });
    s.version = VERSION; s.legacy.imported.f1 = s.legacy.imported.f1 || Date.now();
    return s;
  }

  /* ---------- application B (v1) -> v3 ---------- */
  var RATING = { again: 0, hard: 1, good: 2, easy: 3 };
  var BOX_DAYS = [1, 1, 2, 4, 8, 16];
  function noteTarget(n, D) {
    var id = String(n.refId || '');
    if (n.scope === 'chapter') return { type: 'chapter', id: id, label: 'Chapter ' + id, route: '/chapter/' + id };
    if (n.scope === 'concept') { var cc = D.canonicalConcept(id) || id; return { type: 'concept', id: cc, label: D.labelOf('concept', cc), route: '/concept/' + cc }; }
    if (n.scope === 'flashcard') { var f = D.canonicalFlashcard(id) || id; return { type: 'flashcard', id: f, label: (D.flashcard(f) || {}).front || f, route: D.route('flashcard', f) }; }
    if (n.scope === 'question') { var q = D.canonicalQuestion(id) || id; return { type: 'question', id: q, label: (D.question(q) || {}).prompt || q, route: D.route('question', q) }; }
    var ts = D.canonicalTopics(id); var t = ts[0] && D.topic(ts[0]);
    return t ? { type: 'topic', id: t.id, label: '§' + t.section + ' ' + t.title, route: '/topic/' + t.id } : { type: 'topic', id: id, label: id, route: '/' };
  }
  function bookmarkTarget(b, D) {
    var id = String(b.refId || ''), type = b.type;
    if (type === 'topic') { var ts = D.canonicalTopics(id); var t = ts[0] && D.topic(ts[0]); if (t) return { type: 'topic', id: t.id, label: b.label || '§' + t.section + ' ' + t.title, route: '/topic/' + t.id }; }
    if (type === 'concept') { var c = D.canonicalConcept(id); if (c) return { type: 'concept', id: c, label: b.label || D.labelOf('concept', c), route: '/concept/' + c }; }
    if (type === 'comparison' || type === 'diagram') {
      var cmp = D.canonicalComparison(id); if (cmp) return { type: 'comparison', id: cmp, label: b.label || D.labelOf('comparison', cmp), route: '/compare?id=' + cmp };
      if (D.diagram(id)) return { type: 'diagram', id: id, label: b.label || D.labelOf('diagram', id), route: '/diagram/' + id };
    }
    if (type === 'glossary' || type === 'definition') {
      var g = D.glossary.filter(function (x) { return x.term === id || x.aliases.indexOf(id) > -1; })[0];
      if (g) return { type: 'term', id: g.id, label: g.term, route: '/glossary?term=' + encodeURIComponent(g.id) };
      return { type: 'term', id: id, label: b.label || id, route: '/glossary?q=' + encodeURIComponent(id) };
    }
    if (type === 'question') { var q = D.canonicalQuestion(id); if (q) return { type: 'question', id: q, label: b.label || q, route: D.route('question', q) }; }
    return { type: type || 'topic', id: id, label: b.label || id, route: '/' };
  }
  function migrateF2StateToV3(old, D) {
    D = D || IFL.data;
    var s = defaults(), p = (old && old.progress) || {}, now = Date.now();
    if (old && old.settings) {
      s.settings.theme = old.settings.theme || 'system';
      s.settings.level = ['beginner', 'mba', 'exam'].indexOf(old.settings.explanationLevel) > -1 ? old.settings.explanationLevel : 'mba';
      s.settings.reduceMotion = !!old.settings.reducedMotion;
    }
    if (old && old.createdAt) s.created = old.createdAt;
    /* topics: an application-B topic can span several canonical topics; all of them count as completed */
    Object.keys(p.topicsCompleted || {}).forEach(function (id) {
      D.canonicalTopics(id).forEach(function (tid) {
        var r = s.topics[tid] = s.topics[tid] || { views: 0, time: 0 };
        r.completed = Math.max(r.completed || 0, num(p.topicsCompleted[id], now)); r.visited = r.visited || r.completed;
      });
    });
    Object.keys(p.chapterOpened || {}).forEach(function (n) { s.chapters[n] = { visited: num(p.chapterOpened[n], now) }; });
    Object.keys(p.visitedChapters || {}).forEach(function (n) { if (!s.chapters[n]) s.chapters[n] = { visited: now }; });
    /* quiz history */
    Object.keys(p.questionHistory || {}).forEach(function (qid) {
      var r = p.questionHistory[qid], cq = D.canonicalQuestion(qid); if (!cq) return;
      var q = D.question(cq), a = s.answers[cq] || (s.answers[cq] = { n: 0, correct: 0, topic: q.topicId });
      a.n += Math.max(0, num(r.attempts)); a.correct += Math.max(0, Math.min(num(r.correct), num(r.attempts)));
      a.last = Math.max(a.last || 0, num(r.lastTs)); a.lastCorrect = !!r.lastCorrect; a.topic = q.topicId;
    });
    (p.quizAttempts || []).forEach(function (a) {
      var missed = {}; (a.missed || []).forEach(function (q) { var c = D.canonicalQuestion(q); if (c) missed[c] = 1; });
      s.attempts.push({ id: a.id || ('att-' + a.ts), ts: num(a.ts, now), mode: a.mode || 'chapter', label: a.chapter ? 'Chapter ' + a.chapter + ' quiz (imported)' : 'Quiz (imported)',
        score: num(a.correct), total: num(a.total), chapter: a.chapter == null ? null : Number(a.chapter),
        items: Object.keys(missed).map(function (q) { return { q: q, ok: false, topic: (D.question(q) || {}).topicId }; }) });
    });
    s.attempts.sort(function (x, y) { return y.ts - x.ts; });
    /* flashcards: Leitner box -> interval/ease/due */
    Object.keys(p.flashcardReviews || {}).forEach(function (fid) {
      var r = p.flashcardReviews[fid], cf = D.canonicalFlashcard(fid); if (!cf) return;
      var box = Math.max(0, Math.min(5, num(r.box)));
      var c = cleanCard({ reps: num(r.reps), ease: Math.max(1.3, 2.5 - 0.2 * num(r.lapses)), interval: box === 0 ? 0 : BOX_DAYS[box], lapses: num(r.lapses), due: num(r.dueAt, now), last: num(r.lastReviewed), grade: RATING[r.lastRating] });
      var cur = s.cards[cf]; if (!cur || (c.last || 0) > (cur.last || 0)) s.cards[cf] = c;
    });
    s.legacy.reviewsBefore = Math.max(0, num(p.flashcardsReviewedCount));
    /* study time & streak: reconstruct the days on which the streak was earned */
    if (p.lastStudyDate && /^\d{4}-\d{2}-\d{2}$/.test(p.lastStudyDate)) {
      var last = new Date(p.lastStudyDate + 'T12:00:00').getTime();
      var span = Math.max(1, Math.min(400, num(p.streakDays, 1)));
      for (var i = 0; i < span; i++) { var k = dayKey(last - i * DAY); s.days[k] = Math.max(s.days[k] || 0, 60); }
      if (num(p.studySeconds) > 0) s.days[p.lastStudyDate] = (s.days[p.lastStudyDate] || 0) + num(p.studySeconds);
    } else if (num(p.studySeconds) > 0) s.days[dayKey(now)] = num(p.studySeconds);
    /* guided study */
    var cc = p.crashCourseProgress || {};
    Object.keys(cc).forEach(function (k) { var pid = D.canonicalPlan(k); if (pid) s.guided[pid] = { seg: num(cc[k].stepIndex), item: 0, updated: num(cc[k].completedAt, now), finished: !!cc[k].completedAt }; });
    Object.keys(p.caseStudiesCompleted || {}).forEach(function (id) { if (D.caseStudy(id)) s.cases[id] = { ts: num(p.caseStudiesCompleted[id], now), n: 1 }; });
    /* notes & bookmarks */
    (old.notes || []).forEach(function (n) { s.notes.push({ id: String(n.id), target: noteTarget(n, D), text: String(n.text || ''), created: num(n.createdAt, now), updated: num(n.updatedAt, now) }); });
    (old.bookmarks || []).forEach(function (b) { var t = bookmarkTarget(b, D); s.bookmarks.push({ type: t.type, id: t.id, label: t.label, route: t.route, ts: num(b.createdAt, now) }); });
    Object.keys(old.achievements || {}).forEach(function (k) { s.achievements[k] = num(old.achievements[k], now); });
    s.legacy.imported.f2 = now;
    return s;
  }

  /* ---------- merge two v3 states (used when both legacy records exist, or on import) ---------- */
  function mergeStates(a, b) {
    var s = deepMerge(defaults(), a);
    Object.keys(b.topics || {}).forEach(function (k) {
      var x = s.topics[k] || (s.topics[k] = { views: 0, time: 0 }), y = b.topics[k];
      x.completed = Math.max(x.completed || 0, y.completed || 0) || null; x.visited = Math.min(x.visited || Infinity, y.visited || Infinity); if (!isFinite(x.visited)) delete x.visited;
      x.views = (x.views || 0) + (y.views || 0); x.time = (x.time || 0) + (y.time || 0);
    });
    Object.keys(b.chapters || {}).forEach(function (k) { s.chapters[k] = s.chapters[k] || b.chapters[k]; });
    Object.keys(b.answers || {}).forEach(function (k) {
      var x = s.answers[k], y = b.answers[k];
      if (!x) s.answers[k] = y; else { x.n += y.n; x.correct += y.correct; if ((y.last || 0) > (x.last || 0)) { x.last = y.last; x.lastCorrect = y.lastCorrect; } }
    });
    var seen = {}; s.attempts = s.attempts.concat(b.attempts || []).filter(function (x) { if (seen[x.id]) return false; seen[x.id] = 1; return true; }).sort(function (x, y) { return y.ts - x.ts; }).slice(0, 400);
    Object.keys(b.cards || {}).forEach(function (k) { var x = s.cards[k], y = b.cards[k]; if (!x || (y.last || 0) > (x.last || 0)) s.cards[k] = y; });
    s.reviews = s.reviews.concat(b.reviews || []).sort(function (x, y) { return x.ts - y.ts; });
    var nid = {}; s.notes.forEach(function (n) { nid[n.id] = 1; }); (b.notes || []).forEach(function (n) { if (!nid[n.id]) s.notes.push(n); });
    (b.bookmarks || []).forEach(function (x) { if (!s.bookmarks.some(function (y) { return y.type === x.type && y.id === x.id; })) s.bookmarks.push(x); });
    Object.keys(b.days || {}).forEach(function (k) { s.days[k] = Math.max(s.days[k] || 0, b.days[k]); });
    Object.keys(b.guided || {}).forEach(function (k) { var x = s.guided[k], y = b.guided[k]; if (!x || (y.finished && !x.finished)) s.guided[k] = y; });
    Object.keys(b.cases || {}).forEach(function (k) { s.cases[k] = s.cases[k] || b.cases[k]; });
    Object.keys(b.achievements || {}).forEach(function (k) { s.achievements[k] = Math.min(s.achievements[k] || Infinity, b.achievements[k]); });
    s.legacy.reviewsBefore = (s.legacy.reviewsBefore || 0) + ((b.legacy && b.legacy.reviewsBefore) || 0);
    Object.keys((b.legacy && b.legacy.imported) || {}).forEach(function (k) { s.legacy.imported[k] = b.legacy.imported[k]; });
    return s;
  }

  /* ---------- version ladder for v3+ records ---------- */
  function migrateStateV3ToLatest(s) {
    s = deepMerge(defaults(), s || {});
    ['attempts', 'reviews', 'notes', 'bookmarks', 'activity', 'timerSessions'].forEach(function (k) { if (!Array.isArray(s[k])) s[k] = []; });
    Object.keys(s.cards).forEach(function (k) { var c = cleanCard(s.cards[k]); if (c) s.cards[k] = c; else delete s.cards[k]; });
    s.version = VERSION;
    return s;
  }

  /* Detect what kind of record an imported/legacy object is. */
  function detect(obj) {
    if (!isObj(obj)) return null;
    var data = obj.data && isObj(obj.data) ? obj.data : obj;
    if (obj.app === 'islamic-finance-mba-learning-system' || (data.version >= 3 && 'legacy' in data)) return { kind: 'v3', data: data };
    if (isObj(data.progress) && ('topicsCompleted' in data.progress || 'flashcardReviews' in data.progress || 'quizAttempts' in data.progress)) return { kind: 'f2', data: data };
    if (isObj(data.settings) && 'topics' in data && ('answers' in data || 'cards' in data)) return { kind: 'f1', data: data };
    return null;
  }
  function toV3(obj, D) {
    var d = detect(obj); if (!d) throw new Error('This file does not look like a study-data export from this application or from either of the applications it combines.');
    if (d.kind === 'f2') return migrateF2StateToV3(d.data, D);
    if (d.kind === 'f1') return migrateF1StateToV3(d.data);
    return migrateStateV3ToLatest(d.data);
  }

  IFL.migrate = { VERSION: VERSION, defaults: defaults, cleanCard: cleanCard, migrateF1StateToV3: migrateF1StateToV3, migrateF2StateToV3: migrateF2StateToV3, migrateStateV3ToLatest: migrateStateV3ToLatest, mergeStates: mergeStates, detect: detect, toV3: toV3 };
})();
