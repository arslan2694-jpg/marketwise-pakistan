/* Progress, performance analytics, bookmarks, notes, activity, study time, streaks,
   achievements and the "What do I study next?" engine. All values come from real interaction. */
(function () {
  var IFL = window.IFL, u = IFL.u, S = IFL.store;
  var CI = window.IFL_DATA.courseIndex;

  /* ---------- Course index lookups ---------- */
  var topicMap = {}, chapterMap = {}, allTopicIds = [];
  CI.chapters.forEach(function (c) {
    chapterMap[c.n] = c;
    c.topicObjs = c.topics.map(function (t) {
      var o = { id: t[0], section: t[1], title: t[2], pages: t[3], tier: t[4], concepts: t[5], chapter: c.n };
      topicMap[o.id] = o; allTopicIds.push(o.id); return o;
    });
  });
  var partTitle = {}; CI.parts.forEach(function (p) { partTitle[p.id] = p.title; });
  IFL.course = {
    index: CI, chapters: CI.chapters, parts: CI.parts, topic: function (id) { return topicMap[id]; },
    chapter: function (n) { return chapterMap[n]; }, partTitle: function (id) { return partTitle[id]; }, allTopicIds: allTopicIds,
    chapterOfTopic: function (id) { var t = topicMap[id]; return t ? chapterMap[t.chapter] : null; },
    nextTopic: function (id) { var i = allTopicIds.indexOf(id); return i > -1 && i < allTopicIds.length - 1 ? topicMap[allTopicIds[i + 1]] : null; },
    prevTopic: function (id) { var i = allTopicIds.indexOf(id); return i > 0 ? topicMap[allTopicIds[i - 1]] : null; },
    sourceLabel: function (id) {
      var t = topicMap[id]; if (!t) return '';
      return 'Ch ' + t.chapter + (t.section && t.section !== 'Appendix' ? ' · §' + t.section : ' · Appendix') + (t.pages ? ' · p. ' + (t.pages[0] === t.pages[1] ? t.pages[0] : t.pages[0] + '–' + t.pages[1]) : '');
    }
  };

  function st() { return S.state; }
  function log(type, label, route) {
    S.update(function (s) {
      var last = s.activity[0];
      if (last && last.route === route && last.type === type && Date.now() - last.ts < 10 * 60 * 1000) { last.ts = Date.now(); return; }
      s.activity.unshift({ ts: Date.now(), type: type, label: label, route: route });
      if (s.activity.length > 150) s.activity.length = 150;
    }, 'activity');
  }

  /* ---------- Topics & chapters ---------- */
  function visitTopic(id) {
    var t = topicMap[id]; if (!t) return;
    S.update(function (s) {
      var r = s.topics[id] = s.topics[id] || { views: 0, time: 0 };
      r.views = (r.views || 0) + 1; r.visited = r.visited || Date.now(); r.lastSeen = Date.now();
      s.chapters[t.chapter] = s.chapters[t.chapter] || {}; s.chapters[t.chapter].visited = s.chapters[t.chapter].visited || Date.now();
      s.last = { route: '/topic/' + id, topic: id, chapter: t.chapter };
    }, 'topic');
    log('topic', '§' + t.section + ' ' + t.title, '/topic/' + id);
  }
  function visitChapter(n) {
    S.update(function (s) { s.chapters[n] = s.chapters[n] || {}; s.chapters[n].visited = s.chapters[n].visited || Date.now(); s.chapters[n].lastSeen = Date.now(); }, 'chapter');
    var c = chapterMap[n]; if (c) log('chapter', 'Chapter ' + n + ': ' + c.title, '/chapter/' + n);
  }
  function setComplete(id, done) {
    var before = chapterProgress(topicMap[id].chapter).pct;
    S.update(function (s) {
      var r = s.topics[id] = s.topics[id] || { views: 0, time: 0 };
      r.completed = done ? Date.now() : null;
      if (done) r.visited = r.visited || Date.now();
    }, 'complete');
    var cp = chapterProgress(topicMap[id].chapter);
    if (done && cp.pct === 100 && before < 100) u.toast('Chapter ' + cp.n + ' complete — well done.');
    checkAchievements();
  }
  function isComplete(id) { var r = st().topics[id]; return !!(r && r.completed); }
  function isVisited(id) { var r = st().topics[id]; return !!(r && r.visited); }
  function chapterProgress(n) {
    var c = chapterMap[n], done = 0, visited = 0;
    c.topicObjs.forEach(function (t) { if (isComplete(t.id)) done++; if (isVisited(t.id)) visited++; });
    return { n: n, done: done, visited: visited, total: c.topicObjs.length, pct: u.pct(done, c.topicObjs.length) };
  }
  function overall() {
    var done = 0, visited = 0; allTopicIds.forEach(function (id) { if (isComplete(id)) done++; if (isVisited(id)) visited++; });
    var chaptersDone = CI.chapters.filter(function (c) { return chapterProgress(c.n).pct === 100; }).length;
    var chaptersVisited = CI.chapters.filter(function (c) { return st().chapters[c.n] && st().chapters[c.n].visited; }).length;
    return { done: done, visited: visited, total: allTopicIds.length, pct: u.pct(done, allTopicIds.length), chaptersDone: chaptersDone, chaptersVisited: chaptersVisited };
  }
  function partProgress(pid) {
    var p = CI.parts.filter(function (x) { return x.id === pid; })[0]; var d = 0, t = 0;
    p.chapters.forEach(function (n) { var cp = chapterProgress(n); d += cp.done; t += cp.total; });
    return { done: d, total: t, pct: u.pct(d, t) };
  }

  /* ---------- Questions & quizzes ---------- */
  function recordAnswer(q, correct) {
    S.update(function (s) {
      var a = s.answers[q.id] = s.answers[q.id] || { n: 0, correct: 0, topic: q.topic };
      a.n++; if (correct) a.correct++; a.last = Date.now(); a.lastCorrect = !!correct; a.topic = q.topic;
    }, 'answer');
  }
  function recordAttempt(att) {
    S.update(function (s) {
      att.id = u.uid(); att.ts = Date.now();
      s.attempts.unshift(att); if (s.attempts.length > 200) s.attempts.length = 200;
    }, 'attempt');
    log('quiz', att.label + ' — ' + att.score + '/' + att.total, '/quiz');
    checkAchievements();
  }
  function topicAccuracy(id) {
    var n = 0, c = 0, answers = st().answers;
    Object.keys(answers).forEach(function (k) { var a = answers[k]; if (a.topic === id) { n += a.n; c += a.correct; } });
    return { n: n, correct: c, pct: n ? Math.round(100 * c / n) : null };
  }
  function topicStats() {
    var m = {}, answers = st().answers;
    Object.keys(answers).forEach(function (k) {
      var a = answers[k]; if (!topicMap[a.topic]) return;
      var r = m[a.topic] = m[a.topic] || { id: a.topic, n: 0, correct: 0, last: 0, recentWrong: 0 };
      r.n += a.n; r.correct += a.correct; r.last = Math.max(r.last, a.last || 0); if (a.lastCorrect === false) r.recentWrong++;
    });
    Object.keys(m).forEach(function (k) { m[k].pct = Math.round(100 * m[k].correct / m[k].n); });
    return m;
  }
  /* Weak topics: answered at least twice (or last answer wrong) and accuracy below 70%. */
  function weakTopics(limit) {
    var m = topicStats();
    return Object.keys(m).map(function (k) { return m[k]; })
      .filter(function (r) { return (r.n >= 2 && r.pct < 70) || (r.recentWrong > 0 && r.pct < 70); })
      .sort(function (a, b) { return a.pct - b.pct || b.n - a.n; })
      .slice(0, limit || 8)
      .map(function (r) { r.topic = topicMap[r.id]; return r; });
  }
  function strongTopics() {
    var m = topicStats();
    return Object.keys(m).filter(function (k) { return m[k].n >= 3 && m[k].pct >= 85; });
  }
  function quizAverage() {
    var a = st().attempts; if (!a.length) return null;
    var s = 0, t = 0; a.forEach(function (x) { s += x.score; t += x.total; });
    return t ? Math.round(100 * s / t) : null;
  }
  /* Exam readiness per part: combines completion (50%) and accuracy on answered questions (50%). */
  function readiness() {
    var m = topicStats();
    return CI.parts.map(function (p) {
      var pp = partProgress(p.id), n = 0, c = 0, answered = 0, totalTopics = 0;
      p.chapters.forEach(function (ch) { chapterMap[ch].topicObjs.forEach(function (t) { totalTopics++; if (m[t.id]) { n += m[t.id].n; c += m[t.id].correct; answered++; } }); });
      var acc = n ? c / n : null;
      var score = acc == null ? null : Math.round(50 * pp.done / pp.total + 50 * acc * Math.min(1, answered / Math.max(4, totalTopics * 0.3)));
      return { id: p.id, title: p.title, completion: pp.pct, accuracy: acc == null ? null : Math.round(acc * 100), answeredTopics: answered, score: score };
    });
  }

  /* ---------- Bookmarks & notes ---------- */
  function hasBookmark(type, id) { return st().bookmarks.some(function (b) { return b.type === type && b.id === id; }); }
  function toggleBookmark(item) {
    var on = hasBookmark(item.type, item.id);
    S.update(function (s) {
      if (on) s.bookmarks = s.bookmarks.filter(function (b) { return !(b.type === item.type && b.id === item.id); });
      else s.bookmarks.unshift({ type: item.type, id: item.id, label: item.label, route: item.route, ts: Date.now() });
    }, 'bookmark');
    u.toast(on ? 'Bookmark removed' : 'Bookmarked');
    return !on;
  }
  function notesFor(type, id) { return st().notes.filter(function (n) { return n.target.type === type && n.target.id === id; }); }
  function saveNote(note) {
    S.update(function (s) {
      if (note.id) { var n = s.notes.filter(function (x) { return x.id === note.id; })[0]; if (n) { n.text = note.text; n.updated = Date.now(); } }
      else s.notes.unshift({ id: u.uid(), target: note.target, text: note.text, created: Date.now(), updated: Date.now() });
    }, 'note');
    log('note', 'Note on ' + note.target.label, note.target.route);
  }
  function deleteNote(id) { S.update(function (s) { s.notes = s.notes.filter(function (n) { return n.id !== id; }); }, 'note'); }

  /* ---------- Study time & streak ---------- */
  var lastInput = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, function () { lastInput = Date.now(); }, { passive: true }); });
  var TICK = 15;
  setInterval(function () {
    if (document.hidden || Date.now() - lastInput > 90000) return;
    var route = (location.hash || '').replace(/^#/, '');
    S.update(function (s) {
      var d = u.dayKey(); s.days[d] = (s.days[d] || 0) + TICK;
      var m = /^\/topic\/(.+)$/.exec(route);
      if (m && s.topics[m[1]]) s.topics[m[1]].time = (s.topics[m[1]].time || 0) + TICK;
    }, 'tick');
  }, TICK * 1000);
  function studySeconds() { var t = 0, d = st().days; Object.keys(d).forEach(function (k) { t += d[k]; }); return t; }
  function streak() {
    var d = st().days, n = 0, day = new Date();
    if (!(d[u.dayKey(day)] >= 60)) day.setDate(day.getDate() - 1); // today not yet counted
    while (d[u.dayKey(day)] >= 60) { n++; day.setDate(day.getDate() - 1); }
    return n;
  }
  function lastDays(k) {
    var out = [], day = new Date(); day.setDate(day.getDate() - (k - 1));
    for (var i = 0; i < k; i++) { var key = u.dayKey(day); out.push({ key: key, sec: st().days[key] || 0 }); day.setDate(day.getDate() + 1); }
    return out;
  }

  /* ---------- Achievements ---------- */
  var ACH = [
    { id: 'first-topic', title: 'First topic completed', test: function (o) { return o.done >= 1; } },
    { id: 'ten-topics', title: '10 topics completed', test: function (o) { return o.done >= 10; } },
    { id: 'fifty-topics', title: '50 topics completed', test: function (o) { return o.done >= 50; } },
    { id: 'first-chapter', title: 'First chapter completed', test: function (o) { return o.chaptersDone >= 1; } },
    { id: 'all-visited', title: 'All 18 chapters visited', test: function (o) { return o.chaptersVisited >= 18; } },
    { id: 'part-complete', title: 'A full Part completed', test: function () { return CI.parts.some(function (p) { return partProgress(p.id).pct === 100; }); } },
    { id: 'first-quiz', title: 'First quiz passed (≥ 60%)', test: function () { return st().attempts.some(function (a) { return a.total >= 3 && a.score / a.total >= 0.6; }); } },
    { id: 'fifty-cards', title: '50 flashcards reviewed', test: function () { return st().reviews.length >= 50; } },
    { id: 'streak-5', title: '5-day study streak', test: function () { return streak() >= 5; } },
    { id: 'crash-course', title: 'Completed the 45-minute crash course', test: function () { return !!(st().guided.crash45 && st().guided.crash45.finished); } },
    { id: 'note-taker', title: 'Wrote 10 notes', test: function () { return st().notes.length >= 10; } }
  ];
  function checkAchievements() {
    var o = overall(), newly = [];
    ACH.forEach(function (a) { if (!st().achievements[a.id] && a.test(o)) newly.push(a); });
    if (newly.length) {
      S.update(function (s) { newly.forEach(function (a) { s.achievements[a.id] = Date.now(); }); }, 'achievement');
      u.toast('Achievement: ' + newly[0].title);
    }
  }

  /* ---------- What should I study next? ---------- */
  function recommendations() {
    var s = st(), recs = [], o = overall();
    var weak = weakTopics(3);
    if (weak.length) {
      var w = weak[0];
      recs.push({ kind: 'weak', icon: 'target', title: 'Review weak topic: ' + w.topic.title, why: 'Your accuracy on §' + w.topic.section + ' is ' + w.pct + '% over ' + w.n + ' answers.', route: '/topic/' + w.id, action: 'Review topic', extra: { label: 'Targeted practice', route: '/practice' } });
    }
    var due = IFL.srs ? IFL.srs.dueCount() : 0;
    if (due >= 5) recs.push({ kind: 'cards', icon: 'cards', title: due + ' flashcards due for review', why: 'Spaced review keeps earlier chapters fresh.', route: '/flashcards/review?scope=due', action: 'Review cards' });
    var lastCh = s.last && s.last.chapter;
    var cont = null;
    if (lastCh) {
      var cp = chapterProgress(lastCh);
      if (cp.pct < 100) {
        var nextT = chapterMap[lastCh].topicObjs.filter(function (t) { return !isComplete(t.id); })[0];
        cont = { kind: 'continue', icon: 'book', title: 'Continue Chapter ' + lastCh + ': ' + chapterMap[lastCh].title, why: cp.done + ' of ' + cp.total + ' topics complete. Next: §' + nextT.section + ' ' + nextT.title + '.', route: '/topic/' + nextT.id, action: 'Continue' };
      }
    }
    if (!cont) {
      var firstOpen = CI.chapters.filter(function (c) { return chapterProgress(c.n).pct < 100; })[0];
      if (firstOpen) {
        var t0 = firstOpen.topicObjs.filter(function (t) { return !isComplete(t.id); })[0];
        cont = { kind: 'continue', icon: 'book', title: (o.done ? 'Continue with Chapter ' : 'Start Chapter ') + firstOpen.n + ': ' + firstOpen.title, why: o.done ? 'Next unfinished chapter in the book sequence.' : 'The book builds from foundations; Chapter 1 sets the context.', route: '/topic/' + t0.id, action: o.done ? 'Continue' : 'Start' };
      }
    }
    if (cont) recs.splice(weak.length ? 1 : 0, 0, cont);
    CI.chapters.some(function (c) {
      var cp = chapterProgress(c.n);
      var tried = s.attempts.some(function (a) { return a.chapter === c.n; });
      if (cp.pct === 100 && !tried) { recs.push({ kind: 'chapter-quiz', icon: 'quiz', title: 'Take the Chapter ' + c.n + ' quiz', why: 'You completed every topic in this chapter but have not tested it yet.', route: '/quiz/run?chapter=' + c.n, action: 'Start quiz' }); return true; }
      return false;
    });
    if (o.done >= 8 && !s.attempts.some(function (a) { return a.mode === 'compare'; })) recs.push({ kind: 'compare', icon: 'compare', title: 'Try a comparison quiz', why: 'Difference questions are common in exams; test distinctions between modes.', route: '/quiz/run?type=comparison', action: 'Start' });
    if (!s.guided.crash45 || !s.guided.crash45.finished) recs.push({ kind: 'crash', icon: 'bolt', title: '45-minute crash course', why: o.done ? 'A guided pass through the whole book to connect what you have studied.' : 'A fast orientation before you study chapter by chapter.', route: '/guided/crash45', action: 'Start' });
    return recs.slice(0, 4);
  }

  IFL.progress = {
    log: log, visitTopic: visitTopic, visitChapter: visitChapter, setComplete: setComplete, isComplete: isComplete, isVisited: isVisited,
    chapterProgress: chapterProgress, overall: overall, partProgress: partProgress,
    recordAnswer: recordAnswer, recordAttempt: recordAttempt, topicAccuracy: topicAccuracy, topicStats: topicStats, weakTopics: weakTopics, strongTopics: strongTopics,
    quizAverage: quizAverage, readiness: readiness,
    hasBookmark: hasBookmark, toggleBookmark: toggleBookmark, notesFor: notesFor, saveNote: saveNote, deleteNote: deleteNote,
    studySeconds: studySeconds, streak: streak, lastDays: lastDays, achievements: ACH, checkAchievements: checkAchievements, recommendations: recommendations
  };
})();
