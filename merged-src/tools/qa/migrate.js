/* State-migration QA: legacy records written by BOTH original applications are converted to the unified v3 state. */
const { launch, FILE } = require('./pw');
const now = Date.now(), DAY = 864e5;
const today = new Date(); const ymd = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const F2 = { version: 1, createdAt: now - 30 * DAY, settings: { theme: 'dark', explanationLevel: 'exam', reducedMotion: true },
  progress: { topicsCompleted: { 'ch9-t3': now - DAY, 'ch9-t10': now - DAY, 'ch1-t1': now - 2 * DAY }, chapterOpened: { '9': now - 3 * DAY }, chapterCompleted: {},
    quizAttempts: [{ id: 'attempt-1', chapter: 9, total: 10, correct: 7, scorePct: 70, missed: ['q-ch9-1', 'q-ch9-4', 'q-ch8-1'], ts: now - DAY, mode: 'chapter' }],
    flashcardReviews: { 'fc-ch9-1': { box: 3, dueAt: now + 3 * DAY, reps: 4, lapses: 1, lastRating: 'good', lastReviewed: now - DAY }, 'fc-ch2-4': { box: 0, dueAt: now - 1000, reps: 1, lapses: 2, lastRating: 'again', lastReviewed: now - 5000 } },
    flashcardsReviewedCount: 42, studySeconds: 3600, sessionsCompleted: 2, lastStudyDate: ymd(today), streakDays: 3, bestStreakDays: 5,
    questionHistory: { 'q-ch2-8': { attempts: 3, correct: 2, lastCorrect: true, lastTs: now - DAY }, 'q-ch9-1': { attempts: 2, correct: 0, lastCorrect: false, lastTs: now - DAY }, 'q-unknown-999': { attempts: 1, correct: 1, lastCorrect: true, lastTs: now } },
    visitedChapters: { '9': true, '1': true }, crashCourseProgress: { '45min': { stepIndex: 5, completedAt: now - DAY } }, caseStudiesCompleted: { 'cs-murabaha-1': now - DAY } },
  notes: [{ id: 'note-1', scope: 'topic', refId: 'ch9-t3', text: 'Trust sale note', createdAt: now - DAY, updatedAt: now - DAY }, { id: 'note-2', scope: 'chapter', refId: '9', text: 'Chapter note', createdAt: now, updatedAt: now }],
  bookmarks: [{ id: 'bm-1', type: 'topic', refId: 'ch9-t3', label: 'MPO', createdAt: now }, { id: 'bm-2', type: 'glossary', refId: 'Riba', label: 'Riba', createdAt: now }, { id: 'bm-3', type: 'concept', refId: 'maisir-qimar', label: 'Maisir', createdAt: now }, { id: 'bm-4', type: 'comparison', refId: 'murabaha-vs-musawamah', label: 'M vs M', createdAt: now }],
  achievements: { 'first-topic': now - DAY } };
const F1 = { version: 1, created: now - 40 * DAY, settings: { theme: 'light', level: 'mba', fontScale: 1.1, reduceMotion: false, dailyGoal: 45, name: 'Sara', examDate: '' },
  topics: { 't9.3': { visited: now - DAY, completed: now - DAY, time: 300, views: 3 }, 't9.8.3': { visited: now, views: 1, time: 20 } }, chapters: { 9: { visited: now } },
  answers: { 'q9.1': { n: 4, correct: 3, last: now - 1000, lastCorrect: false, topic: 't9.1' } }, attempts: [{ id: 'a1', ts: now - 5000, mode: 'custom', label: 'Custom quiz', score: 6, total: 10, chapter: null, items: [] }],
  cards: { 'f9.1': { reps: 3, ease: 2.6, interval: 6, due: now + 6 * DAY, lapses: 0, last: now - DAY, grade: 2 }, 'f9.2': { reps: 'x', ease: NaN, interval: -4, due: 'bad', lapses: -1, last: 0, grade: 7 } },
  reviews: [{ ts: now - DAY, card: 'f9.1', grade: 2 }], notes: [{ id: 'n1', target: { type: 'topic', id: 't9.8.3', label: '§9.8.3', route: '/topic/t9.8.3' }, text: 'F1 note', created: now, updated: now }],
  bookmarks: [{ type: 'topic', id: 't9.3', label: '§9.3', route: '/topic/t9.3', ts: now }], activity: [], days: { [ymd(today)]: 120 }, timerSessions: [{ ts: now, minutes: 25, kind: 'Pomodoro' }], guided: { crash45: { finished: true, seg: 3 } }, exam: {}, achievements: { 'first-topic': now - DAY }, last: { route: '/topic/t9.3', topic: 't9.3', chapter: 9 } };
const results = []; const ok = (n, c, x) => { results.push(c); if (!c) console.log('FAIL:', n, x === undefined ? '' : JSON.stringify(x)); else console.log('ok  :', n); };
async function fresh(b, init) {
  const ctx = await b.newContext({ viewport: { width: 1200, height: 800 } });
  if (init) await ctx.addInitScript(i => { if (!sessionStorage.getItem('seeded')) { Object.keys(i).forEach(k => localStorage.setItem(k, i[k])); sessionStorage.setItem('seeded', '1'); } }, init);
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await page.goto(FILE); await page.waitForTimeout(500); return { ctx, page, errs };
}
(async () => {
  const b = await launch();
  /* 1. application B state only */
  let { ctx, page, errs } = await fresh(b, { ifl_v1: JSON.stringify(F2) });
  let s = await page.evaluate(() => JSON.parse(localStorage.getItem('ifl.v3')));
  ok('F2 state → v3 record written (version 3)', s.version === 3);
  ok('F2 legacy record left in place (not overwritten)', await page.evaluate(() => !!localStorage.getItem('ifl_v1') && JSON.parse(localStorage.getItem('ifl_v1')).progress.flashcardsReviewedCount === 42));
  ok('F2 topic spanning 9.3–9.4 completes both canonical topics', !!(s.topics['t9.3'] && s.topics['t9.3'].completed && s.topics['t9.4'] && s.topics['t9.4'].completed), Object.keys(s.topics));
  ok('F2 topic 9.9.1–9.9.3 completes covered canonical topics', !!(s.topics['t9.9.1'] && s.topics['t9.9.1'].completed));
  ok('F2 quiz attempt imported with score', s.attempts.length === 1 && s.attempts[0].score === 7 && s.attempts[0].total === 10, s.attempts);
  ok('F2 missed questions kept as open mistakes', ['q-ch9-1', 'q-ch9-4'].every(q => s.attempts[0].items.some(i => i.q === q)));
  ok('F2 question history mapped (duplicate question → surviving canonical id q2.20)', !!s.answers['q-ch9-1'] && s.answers['q-ch9-1'].n === 2 && s.answers['q-ch9-1'].lastCorrect === false && !!s.answers['q2.20'] && s.answers['q2.20'].n === 3, Object.keys(s.answers));
  ok('F2 unknown question ids are ignored, not corrupting state', !s.answers['q-unknown-999']);
  ok('F2 Leitner box → interval/ease/due', s.cards['fc-ch9-1'].interval === 4 && s.cards['fc-ch9-1'].lapses === 1 && s.cards['fc-ch9-1'].due > now && s.cards['fc-ch9-1'].ease < 2.5, s.cards['fc-ch9-1']);
  ok('F2 flashcard duplicate mapped to canonical card f2.3 with lapses kept', !!s.cards['f2.3'] && s.cards['f2.3'].lapses === 2 && s.cards['f2.3'].interval === 0, s.cards['f2.3']);
  ok('F2 review count kept (42 before import)', s.legacy.reviewsBefore === 42);
  const streak = await page.evaluate(() => IFL.progress.streak());
  ok('F2 streak reconstructed (3 days)', streak >= 3, streak);
  ok('F2 crash course 45min → guided crash45 finished', s.guided.crash45 && s.guided.crash45.finished === true);
  ok('F2 completed case imported', !!s.cases['cs-murabaha-1']);
  ok('F2 notes mapped (topic + chapter) with working routes', s.notes.length === 2 && s.notes.some(n => n.target.type === 'topic' && n.target.id === 't9.3' && n.target.route === '/topic/t9.3') && s.notes.some(n => n.target.type === 'chapter' && n.target.id === '9'), s.notes.map(n => n.target));
  ok('F2 bookmarks mapped (topic, glossary term, concept alias, comparison alias)', s.bookmarks.some(b => b.type === 'topic' && b.id === 't9.3') && s.bookmarks.some(b => b.type === 'term' && /riba/.test(b.id)) && s.bookmarks.some(b => b.type === 'concept' && b.id === 'maisir') && s.bookmarks.some(b => b.type === 'comparison' && b.id === 'murabaha-musawamah'), s.bookmarks.map(b => b.type + ':' + b.id));
  ok('F2 settings mapped (theme dark, level exam, reduced motion)', s.settings.theme === 'dark' && s.settings.level === 'exam' && s.settings.reduceMotion === true);
  ok('F2 achievements kept', !!s.achievements['first-topic']);
  ok('migrated notes/bookmarks routes resolve in the app', await page.evaluate(async () => { for (const b of IFL.store.state.bookmarks) { location.hash = '#' + b.route; await new Promise(r => setTimeout(r, 40)); if (/Something went wrong|Page not found/.test(document.getElementById('view').textContent)) return b.route; } return true; }) === true);
  ok('toast/notice shows earlier data imported', await page.evaluate(() => !!IFL.legacyImported));
  ok('no JS errors during F2 migration', errs.length === 0, errs);
  await ctx.close();
  /* 2. application A state only */
  ({ ctx, page, errs } = await fresh(b, { 'ifl.v1': JSON.stringify(F1) }));
  s = await page.evaluate(() => JSON.parse(localStorage.getItem('ifl.v3')));
  ok('F1 state → v3 (ids unchanged)', s.version === 3 && s.topics['t9.3'].completed && s.answers['q9.1'].n === 4 && s.cards['f9.1'].interval === 6 && s.notes[0].id === 'n1' && s.bookmarks[0].id === 't9.3');
  ok('F1 settings kept (name, font scale, daily goal)', s.settings.name === 'Sara' && s.settings.fontScale === 1.1 && s.settings.dailyGoal === 45);
  ok('F1 corrupt SRS card sanitised (no NaN / negative)', (c => isFinite(c.due) && c.interval >= 0 && c.ease >= 1.3 && c.reps >= 0 && c.lapses >= 0)(s.cards['f9.2']), s.cards['f9.2']);
  ok('F1 legacy record untouched', await page.evaluate(() => JSON.parse(localStorage.getItem('ifl.v1')).settings.name === 'Sara'));
  ok('F1 guided/last-studied kept', s.guided.crash45.finished && s.last.topic === 't9.3');
  ok('no JS errors during F1 migration', errs.length === 0, errs);
  await ctx.close();
  /* 3. both */
  ({ ctx, page, errs } = await fresh(b, { 'ifl.v1': JSON.stringify(F1), ifl_v1: JSON.stringify(F2) }));
  s = await page.evaluate(() => JSON.parse(localStorage.getItem('ifl.v3')));
  ok('both legacy records merged: F1 + F2 topics, notes, bookmarks, cards all present', s.topics['t9.3'].completed && s.topics['t9.4'].completed && s.notes.length === 3 && s.cards['f9.1'] && s.cards['fc-ch9-1'] && s.bookmarks.length >= 4 && s.attempts.length === 2 && s.legacy.imported.f1 && s.legacy.imported.f2, { notes: s.notes.length, bms: s.bookmarks.length, att: s.attempts.length });
  /* import paths */
  const imp = await page.evaluate(({ f2, f1 }) => { const out = {}; IFL.store.reset(); IFL.store.importJSON(JSON.stringify(f2), 'replace'); out.f2 = IFL.store.state.topics['t9.3'] && IFL.store.state.topics['t9.3'].completed > 0; IFL.store.importJSON(JSON.stringify({ app: 'islamic-finance-learning', data: f1 }), 'merge'); out.merged = !!IFL.store.state.cards['f9.1'] && !!IFL.store.state.cards['fc-ch9-1']; const ex = IFL.store.exportJSON(); IFL.store.reset(); IFL.store.importJSON(ex, 'replace'); out.roundtrip = !!IFL.store.state.cards['f9.1']; try { IFL.store.importJSON('{"hello":1}'); out.rejects = false; } catch (e) { out.rejects = /does not look like/.test(e.message); } return out; }, { f2: F2, f1: F1 });
  ok('import: raw application-B export, application-A export (merge), own export round-trip, rejects unknown files', imp.f2 && imp.merged && imp.roundtrip && imp.rejects, imp);
  ok('no JS errors during merge/import', errs.length === 0, errs);
  await ctx.close();
  /* 4. corrupt v3 record */
  ({ ctx, page, errs } = await fresh(b, { 'ifl.v3': '{not json' }));
  ok('corrupt unified record: app starts with defaults and keeps a backup copy', await page.evaluate(() => IFL.store.state.version === 3 && Object.keys(localStorage).some(k => /^ifl\.v3\.corrupt\./.test(k))));
  await ctx.close();
  /* 5. storage unavailable */
  const c5 = await b.newContext(); await c5.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('denied'); } }); });
  const p5 = await c5.newPage(); const e5 = []; p5.on('pageerror', e => e5.push(e.message)); await p5.goto(FILE); await p5.waitForTimeout(500);
  ok('storage blocked: app still renders and works in memory', await p5.locator('h1').count() > 0 && e5.length === 0, e5);
  await b.close();
  const failed = results.filter(r => !r).length; console.log('migration checks:', results.length, 'failed:', failed); require('fs').writeFileSync(__dirname + '/migrate-result.json', JSON.stringify({ checks: results.length, failed }, null, 1)); process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
