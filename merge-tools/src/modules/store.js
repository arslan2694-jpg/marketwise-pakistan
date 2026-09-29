
/* Unified user-state store — schema "ifl_v2".
   One localStorage record. On first run it looks for progress written by either source application
   ("ifl.v1" from Islamic-Finance-Learning, "ifl_v1" from Understanding-Islamic-Finance) and migrates it,
   non-destructively: the legacy keys are never modified or deleted.
   Falls back to in-memory storage (with a warning) if localStorage is unavailable.
   Nothing here is ever sent over the network. */
(function () {
  var IFL = window.IFL;
  var KEY = 'ifl_v2', KEY_APP1 = 'ifl.v1', KEY_APP2 = 'ifl_v1', KEY_SIDEBAR2 = 'ifl_sidebar_collapsed';
  var VERSION = 2;
  IFL.STORE_KEY = KEY;

  function defaults() {
    return {
      version: VERSION,
      created: Date.now(),
      settings: { theme: 'system', level: 'mba', fontScale: 1, reduceMotion: false, dailyGoal: 30, name: '', examDate: '', sidebarCollapsed: false },
      topics: {},          // canonical topicId -> {visited, completed, time, views, lastSeen}
      chapters: {},        // n -> {visited, lastSeen}
      answers: {},         // questionId -> {n, correct, last, lastCorrect, topic}
      attempts: [],        // quiz attempts {id, ts, mode, label, score, total, chapter, items:[{q, ok, topic}]}
      cards: {},           // flashcardId -> {reps, ease, interval, due, lapses, last, grade}
      reviews: [],         // {ts, card, grade}
      notes: [],           // {id, target:{type,id,label,route}, text, created, updated}
      bookmarks: [],       // {type, id, label, route, ts}
      activity: [],        // {ts, type, label, route}
      days: {},            // yyyy-mm-dd -> seconds studied
      timerSessions: [],   // {ts, minutes, kind}
      guided: {},          // planId -> {seg, remaining, segRemaining, updated, finished}
      exam: {},            // examItemId -> {ts, text, self}
      achievements: {},    // id -> ts
      casesDone: {},       // caseId -> ts            (from App 2 caseStudiesCompleted)
      tools: { decisionUses: 0, finderUses: 0 },     // (App 2 decisionToolUses)
      legacy: { reviews: 0, studySeconds: 0, sessions: 0, bestStreak: 0 }, // counters that had no per-item record in App 2
      migration: { from: [], at: null, notes: [] },
      last: {}             // {route, topic, chapter}
    };
  }

  var mem = null, persistent = true, listeners = [], state;

  function rawGet(k) { try { return localStorage.getItem(k); } catch (e) { persistent = false; return k === KEY ? mem : null; } }
  function writeRaw(s) {
    try { localStorage.setItem(KEY, s); return true; }
    catch (e) {
      persistent = false; mem = s;
      if (!writeRaw.warned) { writeRaw.warned = true; IFL.u && IFL.u.toast('Saving is unavailable in this browser mode — progress will last only for this session.', 5000); }
      return false;
    }
  }
  function isObj(o) { return o && typeof o === 'object' && !Array.isArray(o); }
  function merge(base, saved) {
    Object.keys(saved || {}).forEach(function (k) {
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') return;
      if (isObj(saved[k]) && isObj(base[k])) merge(base[k], saved[k]);
      else if (saved[k] !== undefined) base[k] = saved[k];
    });
    return base;
  }
  function tryParse(raw) { try { var o = JSON.parse(raw); return isObj(o) ? o : null; } catch (e) { return null; } }

  /* ---------- data lookups needed for migration ---------- */
  var lookups = null;
  function L() {
    if (lookups) return lookups;
    var D = window.IFL_DATA, qTopic = {}, chTopics = {}, concepts = {}, glossKeys = {};
    Object.keys(D.chapters || {}).forEach(function (n) {
      var c = D.chapters[n]; chTopics[n] = c.topics.map(function (t) { return t.id; });
      (c.questions || []).forEach(function (q) { qTopic[q.id] = q.topic; });
    });
    ((D.sets.concepts) || []).forEach(function (c) { concepts[c.id] = c.name; });
    lookups = { qTopic: qTopic, chTopics: chTopics, concepts: concepts, aliases: (D.aliases && D.aliases.topics) || { byApp2TopicId: {} }, graphIds: (D.aliases && D.aliases.conceptGraphIds) || {}, topicMeta: {} };
    (D.courseIndex ? D.courseIndex.chapters : []).forEach(function (c) { c.topics.forEach(function (t) { lookups.topicMeta[t[0]] = { section: t[1], title: t[2], chapter: c.n }; }); });
    return lookups;
  }
  function resolveTopic(id) {                  // canonical id list for any legacy topic id
    var lk = L();
    if (lk.topicMeta[id]) return [id];
    var a = lk.aliases.byApp2TopicId[id];
    return a ? a.covers.slice() : [];
  }
  IFL.resolveLegacyTopic = resolveTopic;

  /* ---------- migration from App 2 (ifl_v1) ---------- */
  var RATING = { again: 0, hard: 1, good: 2, easy: 3 };
  var BOX_DAYS = [0, 1, 1, 2, 4, 8, 16];
  function ymd(ts) { var d = new Date(ts); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function fromApp2(s2, out, notes) {
    var lk = L(), p = s2.progress || {}, set = s2.settings || {};
    if (set.theme && !out.__hasTheme) out.settings.theme = set.theme;
    if (set.explanationLevel) out.settings.level = set.explanationLevel;
    if (set.reducedMotion) out.settings.reduceMotion = true;
    var n = 0;
    Object.keys(p.topicsCompleted || {}).forEach(function (id) {
      resolveTopic(id).forEach(function (cid) {
        var r = out.topics[cid] = out.topics[cid] || { views: 0, time: 0 }, ts = Number(p.topicsCompleted[id]) || Date.now();
        r.completed = Math.max(r.completed || 0, ts); r.visited = r.visited || ts; n++;
      });
    });
    ['visitedChapters', 'chapterOpened', 'chapterCompleted'].forEach(function (k) {
      Object.keys(p[k] || {}).forEach(function (c) { var r = out.chapters[c] = out.chapters[c] || {}; r.visited = r.visited || (typeof p[k][c] === 'number' ? p[k][c] : Date.now()); });
    });
    Object.keys(p.questionHistory || {}).forEach(function (qid) {
      var h = p.questionHistory[qid], topic = lk.qTopic[qid]; if (!h || !topic) return;
      var a = out.answers[qid] = out.answers[qid] || { n: 0, correct: 0, topic: topic };
      a.n += Number(h.attempts) || 0; a.correct += Number(h.correct) || 0; a.last = Math.max(a.last || 0, Number(h.lastTs) || 0); a.lastCorrect = !!h.lastCorrect; a.topic = topic;
    });
    (p.quizAttempts || []).forEach(function (a) {
      var total = Number(a.total) || 0, score = Number(a.correct) || 0;
      out.attempts.push({ id: String(a.id || 'app2-' + a.ts), ts: Number(a.ts) || Date.now(), mode: a.mode || (a.chapter ? 'chapter' : 'custom'), label: (a.chapter ? 'Chapter ' + a.chapter + ' quiz' : 'Quiz') + ' (imported)', score: score, total: total, chapter: a.chapter == null ? null : Number(a.chapter),
        items: (a.missed || []).map(function (q) { return { q: q, ok: false, topic: lk.qTopic[q] }; }), imported: 'app2' });
    });
    Object.keys(p.flashcardReviews || {}).forEach(function (id) {
      var c = p.flashcardReviews[id]; if (!c) return;
      var box = Math.max(0, Math.min(6, Number(c.box) || 0)), lapses = Number(c.lapses) || 0;
      out.cards[id] = { reps: Number(c.reps) || 0, ease: Math.max(1.3, 2.5 - 0.15 * lapses), interval: BOX_DAYS[box], due: Number(c.dueAt) || Date.now(), lapses: lapses, last: Number(c.lastReviewed) || 0, grade: c.lastRating in RATING ? RATING[c.lastRating] : 2 };
    });
    out.legacy.reviews += Number(p.flashcardsReviewedCount) || 0;
    out.legacy.studySeconds += Number(p.studySeconds) || 0;
    out.legacy.sessions += Number(p.sessionsCompleted) || 0;
    out.legacy.bestStreak = Math.max(out.legacy.bestStreak || 0, Number(p.bestStreakDays) || 0);
    if (p.lastStudyDate && Number(p.streakDays) > 0) {          // rebuild the streak as qualifying study days
      var d = new Date(p.lastStudyDate + 'T12:00:00');
      for (var i = 0; i < Math.min(60, Number(p.streakDays)); i++) { var k = ymd(d.getTime() - i * 86400000); out.days[k] = Math.max(out.days[k] || 0, 60); }
    }
    Object.keys(p.crashCourseProgress || {}).forEach(function (k) {
      var m = /^(45|90|180)/.exec(k); if (!m) return;
      var id = { '45': 'crash45', '90': 'revision90', '180': 'deep180-chapters' }[m[1]], v = p.crashCourseProgress[k] || {};
      var cur = out.guided[id];
      if (!cur || (v.completedAt && !cur.finished)) out.guided[id] = { seg: Number(v.stepIndex) || 0, finished: !!v.completedAt, paused: true, remaining: 0, segRemaining: 0, updated: Number(v.completedAt) || Date.now(), imported: 'app2' };
    });
    Object.keys(p.caseStudiesCompleted || {}).forEach(function (id) { out.casesDone[id] = Math.max(out.casesDone[id] || 0, Number(p.caseStudiesCompleted[id]) || Date.now()); });
    out.tools.decisionUses += Number(p.decisionToolUses) || 0;
    Object.keys(s2.achievements || {}).forEach(function (id) { out.achievements[id] = out.achievements[id] || Number(s2.achievements[id]) || Date.now(); });

    // notes
    (s2.notes || []).forEach(function (nt) {
      if (!nt || !nt.text) return;
      var t = legacyTarget(nt.scope, nt.refId, null);
      out.notes.push({ id: String(nt.id || 'n2-' + Math.random().toString(36).slice(2)), target: t, text: String(nt.text).slice(0, 20000), created: Number(nt.createdAt) || Date.now(), updated: Number(nt.updatedAt) || Date.now(), imported: 'app2' });
    });
    // bookmarks
    (s2.bookmarks || []).forEach(function (b) {
      if (!b) return; var t = legacyTarget(b.type, b.refId, b.label);
      if (!out.bookmarks.some(function (x) { return x.type === t.type && x.id === t.id; })) out.bookmarks.push({ type: t.type, id: t.id, label: t.label, route: t.route, ts: Number(b.createdAt) || Date.now(), imported: 'app2' });
    });
    notes.push('App 2 progress imported: ' + n + ' topic completions, ' + Object.keys(out.cards).length + ' cards, ' + (s2.notes || []).length + ' notes, ' + (s2.bookmarks || []).length + ' bookmarks');
  }
  /* Map an App 2 (scope|type, refId) pair onto the unified {type,id,label,route} target. */
  function legacyTarget(kind, refId, label) {
    var lk = L(), id = String(refId || '');
    kind = String(kind || '');
    if (kind === 'chapter') return { type: 'chapter', id: id, label: label || 'Chapter ' + id, route: '/chapter/' + id };
    if (kind === 'topic' || kind === 'section') {
      var c = resolveTopic(id)[0];
      if (c) { var m = lk.topicMeta[c]; return { type: 'topic', id: c, label: label || ('§' + m.section + ' ' + m.title), route: '/topic/' + c }; }
      return { type: 'topic', id: id, label: label || id, route: '/learn' };
    }
    if (kind === 'concept') { var g = lk.graphIds[id] || id; if (lk.concepts[g]) return { type: 'concept', id: g, label: label || lk.concepts[g], route: '/concept/' + g }; return { type: 'concept', id: id, label: label || id, route: '/concepts' }; }
    if (kind === 'flashcard') return { type: 'flashcard', id: id, label: label || 'Flashcard ' + id, route: '/flashcards' };
    if (kind === 'question') return { type: 'question', id: id, label: label || 'Question ' + id, route: '/quiz/run?retry=' + encodeURIComponent(id) };
    if (kind === 'comparison') return { type: 'comparison', id: 'lab-' + id, label: label || id, route: '/compare?id=lab-' + encodeURIComponent(id) };
    if (kind === 'diagram') return { type: 'diagram', id: id, label: label || id, route: '/diagram/' + encodeURIComponent(id) };
    if (kind === 'definition' || kind === 'glossary') return { type: 'term', id: 'g-' + IFL.u.norm(label || id).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, '-').replace(/^-|-$/g, ''), label: label || id, route: '/glossary?q=' + encodeURIComponent(label || id) };
    return { type: kind || 'item', id: id, label: label || id, route: '/' };
  }

  /* Reconcile a converted/legacy state into `base` (union, newer wins, counts never lost). */
  function reconcile(base, add) {
    Object.keys(add.topics || {}).forEach(function (id) {
      var a = add.topics[id], b = base.topics[id];
      if (!b) { base.topics[id] = a; return; }
      b.completed = Math.max(b.completed || 0, a.completed || 0) || null; b.visited = Math.min(b.visited || Infinity, a.visited || Infinity); if (b.visited === Infinity) delete b.visited;
      b.time = (b.time || 0) + (a.time || 0); b.views = (b.views || 0) + (a.views || 0);
    });
    Object.keys(add.chapters || {}).forEach(function (n) { base.chapters[n] = Object.assign({}, add.chapters[n], base.chapters[n]); });
    Object.keys(add.answers || {}).forEach(function (q) { var a = add.answers[q], b = base.answers[q]; if (!b) base.answers[q] = a; else { if ((a.last || 0) > (b.last || 0)) { b.lastCorrect = a.lastCorrect; b.last = a.last; } b.n += a.n; b.correct += a.correct; } });
    Object.keys(add.cards || {}).forEach(function (id) { var a = add.cards[id], b = base.cards[id]; if (!b || (a.last || 0) > (b.last || 0)) base.cards[id] = a; });
    var ids = {}; base.attempts.forEach(function (a) { ids[a.id] = 1; });
    (add.attempts || []).forEach(function (a) { if (!ids[a.id]) base.attempts.push(a); });
    base.attempts.sort(function (x, y) { return y.ts - x.ts; });
    var rv = {}; base.reviews.forEach(function (r) { rv[r.ts + '|' + r.card] = 1; }); (add.reviews || []).forEach(function (r) { if (!rv[r.ts + '|' + r.card]) base.reviews.push(r); });
    var nids = {}; base.notes.forEach(function (n) { nids[n.id] = 1; }); (add.notes || []).forEach(function (n) { if (!nids[n.id]) base.notes.push(n); });
    (add.bookmarks || []).forEach(function (b) { if (!base.bookmarks.some(function (x) { return x.type === b.type && x.id === b.id; })) base.bookmarks.push(b); });
    Object.keys(add.days || {}).forEach(function (d) { base.days[d] = Math.max(base.days[d] || 0, add.days[d]); });
    Object.keys(add.achievements || {}).forEach(function (a) { base.achievements[a] = Math.min(base.achievements[a] || Infinity, add.achievements[a]); });
    Object.keys(add.guided || {}).forEach(function (g) { var a = add.guided[g], b = base.guided[g]; if (!b || (a.finished && !b.finished)) base.guided[g] = a; });
    Object.keys(add.casesDone || {}).forEach(function (c) { base.casesDone[c] = Math.max(base.casesDone[c] || 0, add.casesDone[c]); });
    Object.keys(add.exam || {}).forEach(function (e) { if (!base.exam[e]) base.exam[e] = add.exam[e]; });
    (add.timerSessions || []).forEach(function (t) { if (!base.timerSessions.some(function (x) { return x.ts === t.ts; })) base.timerSessions.push(t); });
    (add.activity || []).forEach(function (t) { if (!base.activity.some(function (x) { return x.ts === t.ts && x.route === t.route; })) base.activity.push(t); });
    base.activity.sort(function (x, y) { return y.ts - x.ts; });
    ['reviews', 'studySeconds', 'sessions'].forEach(function (k) { base.legacy[k] = (base.legacy[k] || 0) + ((add.legacy && add.legacy[k]) || 0); });
    base.legacy.bestStreak = Math.max(base.legacy.bestStreak || 0, (add.legacy && add.legacy.bestStreak) || 0);
    base.tools.decisionUses = (base.tools.decisionUses || 0) + ((add.tools && add.tools.decisionUses) || 0);
    base.tools.finderUses = (base.tools.finderUses || 0) + ((add.tools && add.tools.finderUses) || 0);
    return base;
  }

  /* ---------- normalisation: safe defaults, bounded collections, correct types ---------- */
  function normalise(s) {
    var d = defaults();
    var out = merge(d, s || {});
    ['attempts', 'reviews', 'notes', 'bookmarks', 'activity', 'timerSessions'].forEach(function (k) { if (!Array.isArray(out[k])) out[k] = []; });
    ['topics', 'chapters', 'answers', 'cards', 'days', 'guided', 'exam', 'achievements', 'casesDone', 'last'].forEach(function (k) { if (!isObj(out[k])) out[k] = {}; });
    if (!isObj(out.tools)) out.tools = { decisionUses: 0, finderUses: 0 };
    if (!isObj(out.legacy)) out.legacy = { reviews: 0, studySeconds: 0, sessions: 0, bestStreak: 0 };
    out.notes = out.notes.filter(function (n) { return n && n.target && typeof n.text === 'string'; }).slice(0, 3000);
    out.bookmarks = out.bookmarks.filter(function (b) { return b && b.type && b.id != null; }).slice(0, 3000);
    out.attempts = out.attempts.slice(0, 400); out.reviews = out.reviews.slice(-3000);
    out.version = VERSION;
    return out;
  }

  /* Detect and convert whatever legacy state exists. Returns {state, from[], notes[]}. */
  function migrateLegacy() {
    var res = defaults(), from = [], notes = [];
    var r1 = rawGet(KEY_APP1), r2 = rawGet(KEY_APP2);
    if (r1) {
      var s1 = tryParse(r1);
      if (s1 && s1.settings) {
        res = normalise(s1); res.__hasTheme = true; from.push('app1'); notes.push('App 1 state (ifl.v1) imported unchanged in structure');
      } else notes.push('App 1 state (ifl.v1) present but unreadable — skipped (original left intact)');
    }
    if (r2) {
      var s2 = tryParse(r2);
      if (s2 && s2.progress) {
        try { fromApp2(s2, res, notes); from.push('app2'); } catch (e) { notes.push('App 2 state (ifl_v1) could not be fully converted: ' + e.message); }
      } else notes.push('App 2 state (ifl_v1) present but unreadable — skipped (original left intact)');
    }
    var sb = rawGet(KEY_SIDEBAR2); if (sb === '1') res.settings.sidebarCollapsed = true;
    delete res.__hasTheme;
    res.migration = { from: from, at: from.length ? Date.now() : null, notes: notes };
    return { state: res, from: from, notes: notes };
  }

  function load() {
    var raw = rawGet(KEY);
    if (raw) {
      var s = tryParse(raw);
      if (s) return normalise(s);
      console.warn('Stored study data was unreadable; a backup copy was kept.');
      try { localStorage.setItem(KEY + '.corrupt.' + Date.now(), raw); } catch (e2) { /* ignore */ }
    }
    try { var m = migrateLegacy(); if (m.from.length) { state = m.state; writeRaw(JSON.stringify(state)); } return m.state; }
    catch (e) { console.error('Legacy migration failed; starting fresh', e); var f = defaults(); f.migration.notes.push('Migration failed: ' + e.message); return f; }
  }

  var saveTimer = null;
  function save(immediate) {
    clearTimeout(saveTimer);
    var run = function () { writeRaw(JSON.stringify(state)); };
    if (immediate) run(); else saveTimer = setTimeout(run, 150);
  }
  function emit(what) { listeners.forEach(function (fn) { try { fn(what); } catch (e) { console.error(e); } }); }

  state = load();
  window.addEventListener('beforeunload', function () { save(true); });
  window.addEventListener('pagehide', function () { save(true); });

  /* Convert any supported export file into a v2 state: v2 export, App 1 export, App 2 export. */
  function parseExport(text) {
    var obj = JSON.parse(text);
    if (!isObj(obj)) throw new Error('This file does not look like an export from this app.');
    var data = obj.data && isObj(obj.data) ? obj.data : obj;
    if (data.progress && data.settings && !('topics' in data)) {               // App 2 export
      var conv = defaults(), notes = []; fromApp2(data, conv, notes); conv.migration = { from: ['app2-file'], at: Date.now(), notes: notes };
      return { kind: 'app2', state: conv };
    }
    if (data.settings && 'topics' in data) return { kind: (obj.schema === 'ifl_v2' || data.version >= 2) ? 'v2' : 'app1', state: normalise(data) };
    throw new Error('This file does not look like an export from this app.');
  }

  IFL.store = {
    get state() { return state; },
    persistent: function () { return persistent; },
    update: function (fn, what) { fn(state); save(); emit(what || 'change'); },
    on: function (fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; },
    flush: function () { save(true); },
    exportJSON: function () {
      save(true);
      return JSON.stringify({ app: 'understanding-islamic-finance-merged', schema: 'ifl_v2', exported: new Date().toISOString(), data: state }, null, 2);
    },
    /* v2 files replace the current state; legacy (App 1 / App 2) files are merged into it so nothing is lost. */
    importJSON: function (text) {
      var p = parseExport(text);
      if (p.kind === 'v2') { state = p.state; }
      else { state = reconcile(normalise(state), p.state); state.migration.from = (state.migration.from || []).concat(p.kind + '-file'); }
      save(true); emit('import'); return p.kind;
    },
    reset: function () {
      var keep = state.settings;
      state = defaults(); state.settings = keep; save(true); emit('reset');
    },
    /* exposed for tests */
    _migrateLegacy: migrateLegacy, _parseExport: parseExport, _defaults: defaults, _normalise: normalise, _reconcile: reconcile,
    legacyKeys: { app1: KEY_APP1, app2: KEY_APP2 }
  };
})();
