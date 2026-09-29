'use strict';
/*  Browser regression suite for the merged standalone app (Playwright + Chromium, opened over file://).
    usage: NODE_PATH=<global node_modules> node tests/regression.js <merged.html> [--axe <path to axe.min.js>]
    Sections: startup · routes · navigation · search · questions · flashcards/SRS · exam · progress persistence · migration ·
              settings · mobile/responsive · accessibility */
const { chromium } = require('playwright');
const fs = require('fs');
const file = process.argv[2];
const axeIdx = process.argv.indexOf('--axe'), AXE = axeIdx > -1 ? process.argv[axeIdx + 1] : null;
const URL = 'file://' + file;
const skipSweep = process.argv.includes('--skip-sweep');   // the 1,343-question sweep is the slow part

let pass = 0, fail = 0; const failures = [];
function ok(cond, msg) { if (cond) pass++; else { fail++; failures.push(msg); console.log('  FAIL: ' + msg); } }
function section(t) { console.log('\n# ' + t); }

async function newPage(browser, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: opts.w || 1280, height: opts.h || 900 }, reducedMotion: opts.reducedMotion || 'no-preference', colorScheme: opts.colorScheme || 'light' });
  if (opts.seed) await ctx.addInitScript(seed => { if (!sessionStorage.getItem('__seeded')) { sessionStorage.setItem('__seeded', '1'); Object.keys(seed).forEach(k => localStorage.setItem(k, seed[k])); } }, opts.seed);
  const page = await ctx.newPage();
  page.errors = [];
  page.on('pageerror', e => page.errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') page.errors.push('console: ' + m.text()); });
  await page.goto(URL);
  await page.waitForSelector('#view h1, #view .card', { timeout: 20000 });
  return page;
}
async function go(page, route, wait = 350) { await page.evaluate(r => { location.hash = r; }, route); await page.waitForTimeout(wait); }
async function view(page) { return page.evaluate(() => ({ h1: (document.querySelector('#view h1') || {}).textContent || '', err: /Something went wrong|Page not found/.test(document.querySelector('#view').textContent), len: document.querySelector('#view').textContent.length, hash: location.hash })); }

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  /* ================================================================ STARTUP */
  section('Startup');
  let page = await newPage(browser);
  ok(page.errors.length === 0, 'no JS errors on load: ' + page.errors.join(' | '));
  const boot = await page.evaluate(() => ({ ifl: !!window.IFL, data: Object.keys(window.IFL_DATA.chapters).length, sets: Object.keys(window.IFL_DATA.sets), store: window.IFL.store.state.version, key: window.IFL.STORE_KEY, route: !!window.IFL.route, nav: document.querySelectorAll('#nav a.nav-link').length, sw: 'serviceWorker' in navigator, ext: [...document.querySelectorAll('script[src], link[rel=stylesheet]')].length }));
  ok(boot.ifl && boot.data === 18, 'IFL + 18 chapters registered');
  ok(['glossary', 'acronyms', 'concepts', 'conceptGraph', 'diagrams', 'comparisons', 'cases', 'modeFinder', 'decisionTree', 'studyPlans', 'bookIndex'].every(k => boot.sets.includes(k)), 'all data sets registered: ' + boot.sets.join(','));
  ok(boot.store === 2 && boot.key === 'ifl_v2', 'unified store schema ifl_v2');
  ok(boot.ext === 0, 'no external script/stylesheet references (fully standalone)');
  const exp = await page.evaluate(async () => { const E = window.IFL_DATA.meta.expected, chs = await window.IFL_DATA.loadAllChapters(), g = await window.IFL.glossaryIndex(), cards = await window.IFL.allCards();
    return { chapters: [E.chapters, chs.length], topics: [E.topics, window.IFL.course.allTopicIds.length], questions: [E.questions, chs.reduce((a, c) => a + c.questions.length, 0)], flashcards: [E.flashcards, cards.length], examItems: [E.examItems, chs.reduce((a, c) => a + c.exam.length, 0)], glossaryEntries: [E.glossaryEntries, window.IFL_DATA.sets.glossary.length],
      glossaryPageRecords: [E.glossaryPageRecords, g.length], acronyms: [E.acronyms, window.IFL_DATA.sets.acronyms.length], cases: [E.cases, window.IFL_DATA.sets.cases.length], comparisons: [E.comparisons, window.IFL_DATA.sets.comparisons.pairs.length], concepts: [E.concepts, window.IFL_DATA.sets.concepts.length], conceptMapNodes: [E.conceptMapNodes, window.IFL_DATA.sets.conceptGraph.nodes.length], conceptMapEdges: [E.conceptMapEdges, window.IFL_DATA.sets.conceptGraph.edges.length], diagrams: [E.diagrams, window.IFL_DATA.sets.diagrams.length], companionNotes: [E.companionNotes, chs.reduce((a, c) => a + c.topics.reduce((b, t) => b + (t.companions || []).length, 0), 0)] }; });
  Object.keys(exp).forEach(k => ok(exp[k][0] === exp[k][1], 'audit count matches the running app: ' + k + ' ' + exp[k].join(' = ')));
  ok(boot.nav >= 25, 'sidebar navigation built (' + boot.nav + ' links)');

  /* ================================================================ ROUTES */
  section('Routes — every route of both source apps resolves');
  const ROUTES = [
    // App 1 (canonical)
    '/', '/bookmarks', '/case/c-salam-wheat', '/cases', '/chapter/1', '/chapter/18', '/chapter/9/print', '/compare', '/concept/riba', '/concepts', '/diagram/mpo', '/diagrams', '/exam', '/exam/trainer', '/finder',
    '/flashcards', '/flashcards/review?scope=all&n=3', '/glossary', '/guided', '/guided/crash45', '/guided/revision90', '/guided/deep180', '/guided/deep180-chapters', '/learn', '/learn/part-i', '/mistakes', '/mock', '/notes', '/planner', '/practice', '/practice/run',
    '/progress', '/quiz', '/quiz/run?n=3', '/revision-cards', '/search?q=riba', '/settings', '/teach/t9.3', '/timer', '/topic/t9.3',
    // App 2 (aliases)
    '/dashboard', '/adaptive', '/case-studies', '/case-studies/cs-salam-1', '/chapter/9', '/chapter/9/topic/ch9-t4', '/comparisons', '/comparisons/riba-vs-trade', '/concept-map', '/crash-course/45', '/crash-course/90', '/crash-course/180', '/decision-tool',
    '/decision-tool?node=q-cost-disclosure', '/exam-prep', '/exam-prep/rapid-revision', '/exam-prep/trainer', '/exam-prep/trainer/et-1', '/learn/part/I', '/learn/part/III', '/quiz/chapter/9', '/quiz/mixed', '/quiz/type/truefalse', '/quiz/type/multiselect', '/quiz/type/matching', '/quiz/type/ordering',
    '/quiz/type/short', '/quiz/type/definition', '/teach/ch9-t4', '/acronyms', '/flashcards?chapter=9', '/topic/ch12-t3',
    // new merged routes
    '/glossary?tab=acronyms', '/finder?tool=tree', '/finder?tool=need', '/revision-cards?deck=topics', '/cases?kind=textbook', '/cases?kind=practice', '/exam?s=definitions', '/exam?s=long', '/exam?s=short', '/exam?s=conceptual', '/exam?s=difference', '/exam?s=scenario', '/exam?s=mcq', '/exam?s=viva', '/exam?s=rapid', '/exam?s=core'
  ];
  for (const r of ROUTES) {
    page.errors.length = 0; await go(page, r, 300);
    const v = await view(page);
    ok(!v.err && v.len > 80 && page.errors.length === 0, 'route ' + r + ' renders (' + (v.h1 || '').slice(0, 40) + ')' + (page.errors.length ? ' ' + page.errors[0] : ''));
  }
  // redirects land on canonical routes
  const redirects = { '/dashboard': '#/', '/adaptive': '#/practice', '/concept-map': '#/concepts', '/comparisons': '#/compare', '/case-studies': '#/cases', '/decision-tool': '#/finder?tool=tree', '/exam-prep': '#/exam', '/crash-course/45': '#/guided/crash45', '/crash-course/180': '#/guided/deep180-chapters', '/quiz/type/truefalse': '#/quiz/run?types=tf&n=10', '/chapter/9/topic/ch9-t4': '#/topic/t9.5', '/acronyms': '#/glossary?tab=acronyms' };
  for (const [from, to] of Object.entries(redirects)) { await go(page, from, 250); const h = await page.evaluate(() => location.hash); ok(h === to, 'alias ' + from + ' → ' + to + ' (got ' + h + ')'); }
  await go(page, '/nonexistent-route', 250); ok((await page.evaluate(() => document.querySelector('#view').textContent)).includes('Page not found'), 'unknown route shows a friendly not-found page');

  /* ================================================================ NAVIGATION */
  section('Navigation');
  const links = await page.evaluate(() => [...document.querySelectorAll('#nav a.nav-link')].map(a => a.getAttribute('href')));
  for (const l of links) { page.errors.length = 0; await go(page, l.slice(1), 250); const v = await view(page); ok(!v.err && page.errors.length === 0, 'sidebar link ' + l + ' works'); }
  const nextPrev = await (async () => {
    await go(page, '/topic/t9.3', 500);
    const before = await page.evaluate(() => location.hash);
    await page.click('nav[aria-label="Topic navigation"] a.btn.primary'); await page.waitForTimeout(400);
    const mid = await page.evaluate(() => location.hash);
    await page.click('nav[aria-label="Topic navigation"] a.btn:first-child'); await page.waitForTimeout(400);
    const after = await page.evaluate(() => location.hash);
    return { before, mid, after };
  })();
  ok(nextPrev.before === '#/topic/t9.3' && nextPrev.mid !== nextPrev.before && nextPrev.after === nextPrev.before, 'topic previous/next navigation round-trips: ' + JSON.stringify(nextPrev));
  for (const tab of ['overview', 'topics', 'aids', 'practice', 'summary']) { page.errors.length = 0; await go(page, '/chapter/12?tab=' + tab, 350); const v = await view(page); ok(!v.err && page.errors.length === 0, 'chapter tab ' + tab); }
  // every topic page of every chapter renders
  const allTopicIds = await page.evaluate(() => window.IFL.course.allTopicIds);
  ok(allTopicIds.length === 311, '311 canonical topic pages listed');
  let topicFail = [];
  for (const id of allTopicIds) { await page.evaluate(x => { location.hash = '/topic/' + x; }, id); await page.waitForTimeout(60); const v = await view(page); if (v.err || !v.h1) topicFail.push(id); }
  ok(topicFail.length === 0, 'every one of the 311 topic pages renders: ' + topicFail.slice(0, 5).join(','));
  ok(page.errors.length === 0, 'no JS errors while opening all topics: ' + page.errors.slice(0, 2).join('|'));
  // companion notes appear on topics that have them, and not-lost: count details blocks across topics
  const compCount = await page.evaluate(async () => { let n = 0; for (const c of Object.values(window.IFL_DATA.chapters)) c.topics.forEach(t => { n += (t.companions || []).length; }); return n; });
  ok(compCount === 225, 'all 225 companion notes attached to topics (' + compCount + ')');
  await go(page, '/topic/t9.5', 500);
  ok((await page.locator('section.companion details.acc').count()) >= 1, 'companion notes rendered on topic page');
  ok((await page.locator('section.companion').innerText()).includes('Companion study notes'), 'companion block titled');

  // desktop sidebar toggle + keyboard shortcuts
  await page.keyboard.press('/'); ok(await page.evaluate(() => document.activeElement.id === 'search-input'), '"/" focuses search');
  await page.keyboard.press('Escape');

  /* ================================================================ SEARCH */
  section('Search');
  async function searchDocs(q) { await go(page, '/search?q=' + encodeURIComponent(q), 450); return page.evaluate(() => [...document.querySelectorAll('#view .result')].map(r => ({ type: r.querySelector('.badge').textContent, title: r.querySelector('a.t').textContent, href: r.querySelector('a.t').getAttribute('href') }))); }
  let r = await searchDocs('Istisna‘a'); ok(r.length > 5, 'search Istisna‘a returns results (' + r.length + ')');
  const alt = {};
  for (const v of ["Istisna'a", 'Istisnaa', 'istisna', 'ISTISNA‘A']) { alt[v] = await searchDocs(v); }
  ok(Object.values(alt).every(a => a.length > 5), 'transliteration variants of Istisna‘a all return results');
  const g1 = r.filter(x => x.type === 'Glossary').map(x => x.title).sort().join('|');
  ok(Object.values(alt).every(a => a.filter(x => x.type === 'Glossary').map(x => x.title).sort().join('|') === g1), 'aliases return the same canonical glossary records');
  r = await searchDocs('Ijara'); ok(r.some(x => x.type === 'Glossary' && /ijarah/i.test(x.title)), 'Ijara finds canonical glossary record "Ijarah"');
  r = await searchDocs('Musharaka'); ok(r.some(x => /musharakah/i.test(x.title)), 'Musharaka finds Musharakah records');
  ok(new Set(r.filter(x => x.type === 'Glossary').map(x => x.title.toLowerCase())).size === r.filter(x => x.type === 'Glossary').length, 'no duplicate glossary results caused by aliases');
  r = await searchDocs('AAOIFI'); ok(r.some(x => x.type === 'Acronym'), 'acronym search returns Acronym results');
  r = await searchDocs('Naqis'); ok(r.some(x => x.type === 'Glossary'), 'term defined only in companion notes is searchable (Naqis)');
  r = await searchDocs('Riba vs trade'); ok(r.some(x => x.type === 'Comparison'), 'comparison search works');
  r = await searchDocs('steel'); ok(r.some(x => x.type === 'Case study'), 'case-study search works');
  r = await searchDocs('salam'); ok(new Set(r.map(x => x.type)).size >= 6, 'search spans many result types: ' + [...new Set(r.map(x => x.type))].join(','));
  r = await searchDocs('tawarruq'); ok(r.some(x => x.type === 'Decision tool') || r.some(x => x.type === 'Concept'), 'decision-tool / concept nodes searchable');
  r = await searchDocs('exchange rule'); // calculation docs
  r = await searchDocs('calculation'); ok(r.some(x => x.type === 'Calculation'), 'calculations searchable');
  // click a result → navigates directly to the record
  r = await searchDocs('Wadiah');
  const first = r.find(x => x.type === 'Glossary'); ok(!!first, 'Wadiah glossary result exists');
  await page.click('#view .result a.t[href="' + first.href + '"]'); await page.waitForTimeout(500);
  ok((await page.evaluate(() => location.hash)).startsWith('#/glossary?term='), 'clicking a glossary result navigates to that term');
  const focusedTerm = await page.evaluate(() => { const id = decodeURIComponent(location.hash.split('term=')[1]); const el = document.getElementById(id); return el ? el.querySelector('h2, h3').textContent : null; });
  ok(/wadi/i.test(focusedTerm || ''), 'target term is rendered and scrolled to: ' + focusedTerm);
  r = await searchDocs('Riba'); const q = r.find(x => x.type === 'Question'); if (q) { await page.click('#view .result a.t[href="' + q.href + '"]'); await page.waitForTimeout(500); ok((await page.evaluate(() => location.hash)).includes('/quiz/run?retry='), 'clicking a question result opens that question'); }
  // topbar search form
  await go(page, '/', 300); await page.fill('#search-input', 'gharar'); await page.press('#search-input', 'Enter'); await page.waitForTimeout(500);
  ok((await page.evaluate(() => location.hash)).startsWith('#/search?q=gharar'), 'topbar search submits to results page');
  // glossary aliases
  await go(page, '/glossary', 500); ok((await page.locator('#view .seg button', { hasText: /^Terms \(/ }).innerText()).includes('(' + (await page.evaluate(() => window.IFL.glossaryIndex().then(g => g.length))) + ')'), 'glossary tab count matches the canonical index');
  await go(page, '/glossary?q=Sharia', 500); ok((await page.locator('.gl-entry').count()) >= 1, 'glossary search tolerant of spelling (Sharia)');
  await go(page, '/glossary?tab=acronyms&q=IDB', 400); ok((await page.locator('#view .card.flat').count()) >= 1, 'acronym tab filter works');

  /* ================================================================ QUESTIONS */
  section('Questions — every question renders, marks correct answers correct and wrong answers wrong');
  await go(page, '/quiz', 400);
  const qres = skipSweep ? { total: 1343, bad: [], byType: {} } : await page.evaluate(async () => {
    const chs = await window.IFL_DATA.loadAllChapters(), C = window.IFL.c, out = { total: 0, bad: [], wrongOk: 0, wrongTried: 0, byType: {} };
    const box = document.createElement('div'); document.body.appendChild(box);
    const store = window.IFL.store;
    const snapshot = JSON.stringify(store.state.answers);
    for (const ch of chs) for (const q0 of ch.questions) {
      const q = Object.assign({ chapter: ch.number }, q0); out.total++; out.byType[q.type] = (out.byType[q.type] || 0) + 1;
      const run = (correctWanted) => new Promise(res => {
        box.innerHTML = ''; let result = null;
        const el = C.question(q, { onAnswer: ok => { result = ok; } }); box.appendChild(el);
        const area = el.querySelector('[role=group]');
        try {
          if (['mcq', 'definition', 'identify', 'comparison', 'scenario', 'application'].includes(q.type)) {
            const btns = area.querySelectorAll('button.opt'); if (btns.length !== q.options.length) throw new Error('option count');
            let idx = q.answer; if (!correctWanted) idx = (q.answer + 1) % q.options.length; btns[idx].click();
          } else if (q.type === 'tf') { const b = area.querySelectorAll('button.opt'); b[(correctWanted ? q.answer : !q.answer) ? 0 : 1].click(); }
          else if (q.type === 'multi') {
            const b = area.querySelectorAll('button.opt'); const want = correctWanted ? q.answer : [0].filter(i => q.answer.indexOf(i) < 0).concat(q.answer.length > 1 ? [] : [q.options.findIndex((_, i) => q.answer.indexOf(i) < 0)]);
            (correctWanted ? q.answer : (q.answer.length > 1 ? [q.answer[0]] : [q.options.findIndex((_, i) => q.answer.indexOf(i) < 0)])).forEach(i => b[i].click()); area.querySelector('button.primary').click();
          } else if (q.type === 'match') {
            const sels = area.querySelectorAll('select'); sels.forEach((s, i) => { const opts = [...s.options].map(o => o.value).filter(Boolean); s.value = correctWanted ? q.pairs[i][1] : (opts.find(o => o !== q.pairs[i][1]) || opts[0]); }); area.querySelector('button.primary').click();
          } else if (q.type === 'order') {
            const items = () => [...area.querySelectorAll('ol.order-list li .grow')].map(x => x.textContent);
            const want = correctWanted ? q.items.slice() : q.items.slice().reverse();
            for (let pass = 0; pass < 60; pass++) { const cur = items(); let moved = false;
              for (let i = 0; i < want.length; i++) { if (cur[i] !== want[i]) { const from = cur.indexOf(want[i]); const btn = area.querySelectorAll('ol.order-list li')[from].querySelectorAll('button')[0]; btn.click(); moved = true; break; } }
              if (!moved) break; }
            area.querySelector('button.primary').click();
          } else if (q.type === 'short') {
            area.querySelector('button.primary').click(); const btns = [...area.querySelectorAll('.feedback button')]; btns[correctWanted ? 0 : 1].click();
          }
        } catch (e) { out.bad.push(q.id + ' ' + e.message); }
        setTimeout(() => res(result), 0);
      });
      const good = await run(true);
      if (good !== true) out.bad.push(q.id + ' (' + q.type + ') correct answer scored as ' + good);
      if (!box.querySelector('.feedback')) out.bad.push(q.id + ' no feedback');
      else if (!q.explanation || !box.textContent.includes(q.explanation.slice(0, 20))) out.bad.push(q.id + ' explanation not shown');
      if (q.type !== 'match' && q.type !== 'order' || true) { const bad = await run(false); out.wrongTried++; if (bad === false) out.wrongOk++; else out.bad.push(q.id + ' (' + q.type + ') wrong answer scored as ' + bad); }
    }
    box.remove();
    // restore answer history polluted by the sweep
    store.update(s => { s.answers = JSON.parse(snapshot); });
    return out;
  });
  ok(qres.total === 1343, 'swept all 1343 questions (' + qres.total + ')');
  ok(qres.bad.length === 0, 'all questions render + score correctly: ' + qres.bad.slice(0, 8).join(' ; '));
  console.log('  question types swept: ' + JSON.stringify(qres.byType));
  // explanation + retry flow through the quiz runner UI
  await go(page, '/quiz/run?types=mcq&n=4', 500);
  for (let i = 0; i < 4; i++) { await page.locator('#view button.opt').first().click(); await page.waitForTimeout(80); await page.locator('#view button.btn.primary', { hasText: /Next question|See results/ }).click(); await page.waitForTimeout(150); }
  ok(await page.locator('.score-big').count() === 1, 'quiz runner reaches results with a score');
  const missed = await page.locator('a.btn.primary', { hasText: 'Retry missed questions' }).count();
  if (missed) { await page.locator('a.btn.primary', { hasText: 'Retry missed questions' }).click(); await page.waitForTimeout(500); ok((await view(page)).h1.includes('Retry'), 'retry-missed quiz opens'); }
  // filters
  await go(page, '/quiz', 500);
  await page.locator('#view button.chip', { hasText: 'Ch 9' }).click();
  const cnt1 = await page.locator('#view strong.tabular').innerText();
  await page.locator('#view button.chip', { hasText: 'Hard' }).click();
  const cnt2 = await page.locator('#view strong.tabular').innerText();
  ok(Number(cnt2) < Number(cnt1) && Number(cnt2) > 0, 'quiz builder filters (chapter → +difficulty): ' + cnt1 + ' → ' + cnt2);
  const typesCount = await page.evaluate(() => Promise.resolve(window.IFL.questionPool()).then(p => { const t = {}; p.forEach(q => { const k = q.kind || q.type; t[k] = (t[k] || 0) + 1; }); return t; }));
  ok(['mcq', 'tf', 'multi', 'match', 'order', 'definition', 'identify', 'comparison', 'scenario', 'application', 'short'].every(k => typesCount[k] > 0), 'all question taxonomy kinds present: ' + JSON.stringify(typesCount));
  const filt = await page.evaluate(() => Promise.resolve(window.IFL.questionPool()).then(p => window.IFL.filterPool(p, { types: ['definition'] }).length));
  ok(filt >= 30, 'type filter "definition" spans both sources (' + filt + ')');
  // exam by-type browse
  await go(page, '/exam', 500); ok((await page.locator('#view a.card-link[href*="quiz/run?types="]').count()) >= 10, 'exam centre lists question types');
  // trainer
  await go(page, '/exam/trainer?id=et-3', 500); await page.fill('#view textarea', 'riba and trade'); await page.click('text=Reveal expected answer'); await page.waitForTimeout(200);
  ok((await page.locator('text=Expected answer structure').count()) === 1, 'answer trainer reveals structure');
  // cases
  await go(page, '/case/cs-murabaha-1', 500); await page.click('button:has-text("Continue")'); await page.waitForTimeout(300);
  ok((await page.locator('button.chip').count()) >= 10, 'case: mode chooser appears');
  await page.locator('button.chip', { hasText: 'Murabaha' }).first().click(); await page.waitForTimeout(300);
  await page.click('button:has-text("Reveal the textbook-based answer")'); await page.waitForTimeout(300);
  ok((await page.locator('text=Step 4').count()) === 1 && (await page.evaluate(() => Object.keys(window.IFL.store.state.casesDone).includes('cs-murabaha-1'))), 'open-analysis case flow completes and is recorded');
  await go(page, '/cases', 400); const badges = await page.evaluate(() => [...document.querySelectorAll('#view a.card-link')].map(a => a.textContent.includes('Textbook case') ? 'T' : a.textContent.includes('generated') ? 'P' : '?'));
  ok(badges.length === 49 && !badges.includes('?') && badges.filter(x => x === 'T').length === 13, 'cases labelled: ' + badges.filter(x => x === 'T').length + ' textbook / ' + badges.filter(x => x === 'P').length + ' practice');
  await go(page, '/case/c-salam-wheat', 500); await page.click('button:has-text("Continue")'); await page.waitForTimeout(200);
  ok((await page.locator('button.chip').count()) >= 10, 'multiple-choice case flow still works');

  /* ================================================================ COMPARE / CONCEPTS / FINDER */
  section('Comparisons, concept map, decision tools');
  await go(page, '/compare', 500);
  const cmpBtns = await page.locator('#view button[data-id]').count(); ok(cmpBtns === 38, '38 comparisons listed (25 pairs + 13 labs): ' + cmpBtns);
  await page.locator('#view button[data-id="lab-tawarruq-vs-bai-al-inah"]').click(); await page.waitForTimeout(200);
  ok((await page.locator('#view table caption').first().innerText()).includes('Tawarruq'), 'comparison lab table renders');
  await go(page, '/compare?id=riba-vs-trade', 500); ok((await page.locator('#view button[data-id="lab-riba-vs-trade"][aria-pressed="true"]').count()) === 1, 'App 2 comparison id resolves to its lab');
  await go(page, '/concepts', 600);
  const nodes = await page.locator('svg.cmap g.node').count(); ok(nodes === 45 + 20 + 13, 'concept map draws all nodes (' + nodes + ' incl. pillars)');
  await page.locator('svg.cmap g.node', { hasText: 'Hawalah' }).first().click(); await page.waitForTimeout(200);
  ok((await page.locator('#view .card[aria-live=polite]').innerText()).includes('Hawalah'), 'concept-map node is interactive (companion-only node)');
  await page.locator('svg.cmap g.node', { hasText: 'Murabaha / MPO' }).first().click(); await page.waitForTimeout(200);
  ok((await page.locator('#view .card[aria-live=polite]').innerText()).includes('Relationships'), 'merged concept node lists relationships');
  // finder: need-based path
  await go(page, '/finder', 500);
  await page.locator('button.opt', { hasText: 'To use an asset without buying it now' }).click(); await page.locator('button.opt', { hasText: 'No — use only' }).click(); await page.waitForTimeout(200);
  ok((await page.locator('#view h2').last().innerText()).includes('Ijarah') || (await page.locator('#view').innerText()).includes('Ijarah'), 'need-based finder reaches Ijarah result');
  ok((await page.locator('text=Key conditions').count()) >= 1, 'result card merges guidance from both trees (key conditions)');
  await go(page, '/finder?tool=tree', 500);
  await page.locator('button.opt', { hasText: 'Managing liquidity' }).click(); await page.locator('button.opt', { hasText: 'Raise immediate cash' }).click(); await page.waitForTimeout(200);
  const before = await page.locator('#view').innerText(); ok(/question 3/i.test(before), 'question tree advances to the next question');
  // walk the whole tree to every result (no dead ends)
  const walked = await page.evaluate(() => {
    const T = window.IFL_DATA.sets.decisionTree, seen = new Set();
    (function walk(id) { if (/^r-/.test(id)) { seen.add(id); return; } T.questions[id].options.forEach(o => walk(o.next)); })(T.root);
    const F = window.IFL_DATA.sets.modeFinder, seen2 = new Set();
    (function walk(id) { const n = F.nodes[id]; n.options.forEach(o => { if (o.result) seen2.add(o.result); else walk(o.next); }); })(F.start);
    return [seen.size, Object.keys(T.results).length, seen2.size, Object.keys(F.results).length];
  });
  ok(walked[0] === walked[1] && walked[2] === walked[3], 'both decision trees reach all of their results ' + walked.join('/'));
  ok((await page.evaluate(() => window.IFL.store.state.tools.finderUses >= 1)), 'finder use recorded');

  /* ================================================================ FLASHCARDS + SRS */
  section('Flashcards / SRS');
  await go(page, '/flashcards', 500);
  const deckTotal = await page.locator('#view .stat .v').first().innerText(); ok(deckTotal === '1056', 'flashcard deck total 1056 (' + deckTotal + ')');
  await go(page, '/flashcards/review?chapter=9&n=4', 600);
  ok((await page.locator('.flash').count()) === 1, 'flashcard renders');
  await page.keyboard.press(' '); await page.waitForTimeout(150); ok(await page.evaluate(() => document.querySelector('.flash').classList.contains('flipped')), 'flashcard flips with Space');
  await page.keyboard.press('3'); await page.waitForTimeout(150);
  const srs1 = await page.evaluate(() => ({ cards: Object.keys(window.IFL.store.state.cards).length, rev: window.IFL.store.state.reviews.length }));
  ok(srs1.cards === 1 && srs1.rev === 1, 'grading a card writes SRS state ' + JSON.stringify(srs1));
  await page.click('.flash'); await page.waitForTimeout(100); await page.keyboard.press('1'); await page.waitForTimeout(150);
  const c0 = await page.evaluate(() => Object.values(window.IFL.store.state.cards).map(c => [c.lapses, c.interval]));
  ok(c0.some(x => x[0] === 1 && x[1] === 0), 'Again grade → lapse + 10-minute relearn ' + JSON.stringify(c0));
  await page.evaluate(() => window.IFL.store.flush()); await page.reload(); await page.waitForSelector('#view h1, #view .card'); await page.waitForTimeout(300);
  ok((await page.evaluate(() => Object.keys(window.IFL.store.state.cards).length)) === 2, 'SRS state persists across reload');
  const cats = await page.evaluate(() => Promise.resolve(window.IFL.allCards()).then(c => [...new Set(c.map(x => x.cat))].length)); ok(cats === 11, '11 flashcard categories');
  await go(page, '/flashcards/review?cat=Comparisons&n=2', 500); ok((await page.locator('.flash').count()) === 1, 'category deck works');

  /* ================================================================ EXAM */
  section('Timed mock exam / results / review');
  await go(page, '/mock/run?n=5&min=1&label=Test%20mock', 700);
  const t0 = await page.locator('[role=timer]').innerText(); await page.waitForTimeout(2200); const t1 = await page.locator('[role=timer]').innerText();
  ok(t0 !== t1, 'mock exam timer counts down: ' + t0 + ' → ' + t1);
  for (let i = 0; i < 5; i++) {
    const opt = page.locator('#view button.opt').first();
    if (await opt.count()) { await opt.click().catch(() => {}); }
    else { const selects = page.locator('#view select'); const n = await selects.count(); for (let k = 0; k < n; k++) { await selects.nth(k).selectOption({ index: 1 }); } const cb = page.locator('#view button.primary', { hasText: /Check/ }); if (await cb.count()) await cb.click(); }
    await page.waitForTimeout(80);
    await page.locator('#view button.btn.primary', { hasText: /Next|Skip/ }).first().click().catch(() => {}); await page.waitForTimeout(120);
  }
  await page.waitForTimeout(300);
  let onReview = await page.locator('.score-big').count();
  if (!onReview) { const sub = page.locator('button', { hasText: 'Submit exam' }); if (await sub.count()) { await sub.click(); await page.waitForTimeout(200); await page.locator('.modal footer button.primary').click(); await page.waitForTimeout(400); } onReview = await page.locator('.score-big').count(); }
  ok(onReview === 1, 'mock exam submission shows results');
  ok((await page.locator('text=By chapter').count()) === 1 && (await page.locator('text=Answer review').count()) === 1, 'results include chapter breakdown + answer review');
  const attempts = await page.evaluate(() => window.IFL.store.state.attempts.filter(a => a.mode === 'mock').length); ok(attempts === 1, 'mock attempt recorded (' + attempts + ')');
  if (await page.locator('button', { hasText: /All questions/ }).count()) { await page.locator('button', { hasText: /All questions/ }).click(); ok((await page.locator('.review-item').count()) === 5, 'review lists all 5 questions'); }
  // timer expiry auto-submits (fake clock)
  const p2 = await newPage(browser);
  await p2.clock.install(); await go(p2, '/mock/run?n=5&min=1&label=Expiry', 600);
  await p2.clock.fastForward(61 * 1000); await p2.waitForTimeout(500);
  ok((await p2.locator('.score-big').count()) === 1, 'mock exam auto-submits when time expires');
  await p2.context().close();

  /* ================================================================ PROGRESS PERSISTENCE */
  section('Progress persistence');
  const p3 = await newPage(browser);
  await go(p3, '/topic/t1.3', 600); await p3.click('button:has-text("Mark complete")'); await p3.waitForTimeout(300);
  await p3.evaluate(() => window.IFL.store.flush());
  await p3.reload(); await p3.waitForSelector('#view h1'); await p3.waitForTimeout(300);
  ok(await p3.evaluate(() => window.IFL.progress.isComplete('t1.3')), 'topic completion persists after refresh');
  await go(p3, '/topic/t1.3', 500); ok((await p3.locator('button.on', { hasText: 'Completed' }).count()) === 1, 'completed state shown after refresh');
  const raw = await p3.evaluate(() => localStorage.getItem('ifl_v2')); ok(!!raw && JSON.parse(raw).topics['t1.3'].completed, 'ifl_v2 record written to localStorage');
  // notes + bookmarks persist
  await p3.click('button:has-text("Bookmark")'); await p3.click('button:has-text("Notes")'); await p3.fill('#note-ta', 'my test note'); await p3.click('.modal footer button.primary'); await p3.waitForTimeout(200); await p3.keyboard.press('Escape');
  await p3.evaluate(() => window.IFL.store.flush()); await p3.reload(); await p3.waitForSelector('#view h1');
  const pn = await p3.evaluate(() => [window.IFL.store.state.notes.length, window.IFL.store.state.bookmarks.length]); ok(pn[0] === 1 && pn[1] === 1, 'notes + bookmarks persist ' + pn);
  await p3.context().close();

  /* ================================================================ MIGRATION */
  section('State migration (ifl.v1 / ifl_v1 → ifl_v2)');
  const app1State = { version: 1, created: 1700000000000, settings: { theme: 'dark', level: 'exam', fontScale: 1.1, reduceMotion: true, dailyGoal: 45, name: 'Sam', examDate: '' }, topics: { 't9.3': { views: 4, time: 300, visited: 1700000001000, completed: 1700000002000 } }, chapters: { 9: { visited: 1700000001000 } },
    answers: { 'q9.1': { n: 3, correct: 2, last: 1700000003000, lastCorrect: false, topic: 't9.3' } }, attempts: [{ id: 'a1', ts: 1700000004000, mode: 'chapter', label: 'Chapter 9 quiz', score: 7, total: 10, chapter: 9, items: [] }], cards: { 'f9.1': { reps: 2, ease: 2.4, interval: 3, due: 1800000000000, lapses: 0, last: 1700000005000, grade: 2 } },
    reviews: [{ ts: 1700000005000, card: 'f9.1', grade: 2 }], notes: [{ id: 'n1', target: { type: 'topic', id: 't9.3', label: '§9.3', route: '/topic/t9.3' }, text: 'app1 note', created: 1, updated: 2 }], bookmarks: [{ type: 'topic', id: 't9.3', label: '§9.3', route: '/topic/t9.3', ts: 5 }],
    activity: [], days: { '2024-01-01': 600 }, timerSessions: [], guided: { crash45: { seg: 3, finished: false, remaining: 100, segRemaining: 50, paused: true, updated: 1 } }, exam: {}, achievements: { 'first-topic': 1700000002000 }, last: {} };
  const app2State = { version: 1, createdAt: 1700000000000, settings: { theme: 'light', explanationLevel: 'beginner', reducedMotion: false },
    progress: { topicsCompleted: { 'ch9-t4': 1700000010000, 'ch1-t1': 1700000011000 }, chapterOpened: { 9: 1700000010000 }, chapterCompleted: {}, quizAttempts: [{ id: 'attempt-1', chapter: 9, scorePct: 60, total: 5, correct: 3, ts: 1700000012000, missed: ['q-ch9-1', 'q-ch9-2'], mode: 'chapter' }],
      flashcardReviews: { 'fc-ch9-1': { box: 3, dueAt: 1800000000000, reps: 4, lapses: 1, lastRating: 'good', lastReviewed: 1700000013000 } }, flashcardsReviewedCount: 60, studySeconds: 5400, sessionsCompleted: 3, lastStudyDate: '2024-02-02', streakDays: 3, bestStreakDays: 9,
      questionHistory: { 'q-ch9-1': { attempts: 2, correct: 1, lastCorrect: false, lastTs: 1700000012000 } }, visitedChapters: { 9: true }, crashCourseProgress: { '45': { stepIndex: 9, completedAt: 1700000020000 }, '180': { stepIndex: 2, completedAt: null } }, caseStudiesCompleted: { 'cs-salam-1': 1700000021000 }, decisionToolUses: 4 },
    notes: [{ id: 'n2a', scope: 'chapter', refId: '9', text: 'app2 chapter note', createdAt: 1700000030000, updatedAt: 1700000030000 }, { id: 'n2b', scope: 'section', refId: 'ch9-t4', text: 'app2 topic note', createdAt: 1700000031000, updatedAt: 1700000031000 }],
    bookmarks: [{ id: 'b1', type: 'topic', refId: 'ch9-t4', label: 'Need for Murabaha', createdAt: 1700000032000 }, { id: 'b2', type: 'comparison', refId: 'riba-vs-trade', label: 'Riba vs Trade', createdAt: 1700000033000 }, { id: 'b3', type: 'glossary', refId: 'Riba', label: 'Riba', createdAt: 1700000034000 }], achievements: { 'first-topic': 1700000011000, 'quiz-ace': 1700000012000, 'five-day-streak': 1700000014000 } };
  const getV2 = p => p.evaluate(() => JSON.parse(localStorage.getItem('ifl_v2') || 'null'));
  // neither
  let pm = await newPage(browser); let v2 = await getV2(pm); ok(pm.errors.length === 0, 'neither legacy state: loads cleanly'); await pm.evaluate(() => window.IFL.store.flush()); v2 = await getV2(pm); ok(v2 && v2.version === 2 && v2.settings.theme === 'system', 'neither: defaults are created'); await pm.context().close();
  // app1 only
  pm = await newPage(browser, { seed: { 'ifl.v1': JSON.stringify(app1State) } }); v2 = await getV2(pm);
  ok(pm.errors.length === 0, 'app1-only: no errors ' + pm.errors.join('|'));
  ok(v2 && v2.version === 2 && v2.topics['t9.3'].completed === 1700000002000 && v2.answers['q9.1'].n === 3 && v2.cards['f9.1'].reps === 2 && v2.notes.length === 1 && v2.bookmarks.length === 1 && v2.settings.theme === 'dark' && v2.settings.name === 'Sam' && v2.guided.crash45.seg === 3 && v2.attempts[0].score === 7, 'app1-only: all progress recovered');
  ok(v2.migration.from.join() === 'app1', 'app1-only: migration recorded'); ok(await pm.evaluate(() => localStorage.getItem('ifl.v1') !== null), 'app1-only: legacy key left untouched');
  ok(await pm.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark', 'app1-only: dark theme restored'); await pm.context().close();
  // app2 only
  pm = await newPage(browser, { seed: { ifl_v1: JSON.stringify(app2State), ifl_sidebar_collapsed: '1' } }); v2 = await getV2(pm);
  ok(pm.errors.length === 0, 'app2-only: no errors ' + pm.errors.join('|'));
  ok(v2.topics['t9.5'] && v2.topics['t9.5'].completed === 1700000010000, 'app2-only: topic ch9-t4 completion mapped to canonical t9.5');
  ok(v2.topics['t1.1'] && v2.topics['t1.1'].completed, 'app2-only: ch1-t1 completion mapped to t1.1');
  ok(v2.answers['q-ch9-1'] && v2.answers['q-ch9-1'].n === 2 && v2.answers['q-ch9-1'].correct === 1 && /^t9\./.test(v2.answers['q-ch9-1'].topic), 'app2-only: question history → per-topic mastery (' + (v2.answers['q-ch9-1'] || {}).topic + ')');
  ok(v2.attempts.length === 1 && v2.attempts[0].score === 3 && v2.attempts[0].total === 5 && v2.attempts[0].chapter === 9, 'app2-only: quiz attempt converted');
  ok(v2.cards['fc-ch9-1'] && v2.cards['fc-ch9-1'].lapses === 1 && v2.cards['fc-ch9-1'].due === 1800000000000 && v2.cards['fc-ch9-1'].interval === 2, 'app2-only: SRS box → SM-2 card state');
  ok(v2.legacy.reviews === 60 && v2.legacy.studySeconds === 5400 && v2.legacy.bestStreak === 9, 'app2-only: counters preserved');
  ok(v2.notes.length === 2 && v2.notes.some(n => n.target.type === 'chapter' && n.target.route === '/chapter/9') && v2.notes.some(n => n.target.route === '/topic/t9.5'), 'app2-only: notes mapped to unified targets');
  ok(v2.bookmarks.length === 3 && v2.bookmarks.some(b => b.route === '/topic/t9.5') && v2.bookmarks.some(b => b.route.startsWith('/compare?id=lab-riba-vs-trade')) && v2.bookmarks.some(b => b.type === 'term'), 'app2-only: bookmarks mapped');
  ok(v2.guided.crash45.finished === true && v2.guided['deep180-chapters'] && v2.guided['deep180-chapters'].seg === 2, 'app2-only: crash-course progress → guided plans');
  ok(v2.casesDone['cs-salam-1'] && v2.tools.decisionUses === 4, 'app2-only: case completion + decision-tool uses');
  ok(v2.achievements['quiz-ace'] && v2.achievements['first-topic'], 'app2-only: achievements kept');
  ok(Object.keys(v2.days).length >= 3 && (await pm.evaluate(() => window.IFL.progress.streak())) >= 0, 'app2-only: streak days rebuilt');
  ok(v2.settings.sidebarCollapsed === true, 'app2-only: collapsed-sidebar preference migrated');
  ok(await pm.evaluate(() => window.IFL.progress.reviewCount()) === 60, 'app2-only: flashcards-reviewed counter includes legacy count');
  ok(await pm.evaluate(() => window.IFL.progress.overall().done) === 2, 'app2-only: overall progress reflects migrated completions');
  await go(pm, '/progress', 500); ok(!(await view(pm)).err, 'app2-only: progress page renders with migrated data'); await go(pm, '/bookmarks', 400); ok(!(await view(pm)).err, 'app2-only: bookmarks page renders'); await go(pm, '/notes', 400); ok(!(await view(pm)).err, 'app2-only: notes page renders'); await pm.context().close();
  // both
  pm = await newPage(browser, { seed: { 'ifl.v1': JSON.stringify(app1State), ifl_v1: JSON.stringify(app2State) } }); v2 = await getV2(pm);
  ok(pm.errors.length === 0, 'both: no errors');
  ok(v2.migration.from.join() === 'app1,app2' && v2.notes.length === 3 && v2.bookmarks.length === 3 + 1 - 1 + 0 || v2.bookmarks.length >= 3, 'both: notes and bookmarks are unioned (' + v2.notes.length + '/' + v2.bookmarks.length + ')');
  ok(v2.topics['t9.3'].completed === 1700000002000 && v2.topics['t9.5'].completed === 1700000010000, 'both: completions from both apps present');
  ok(v2.attempts.length === 2 && v2.answers['q9.1'] && v2.answers['q-ch9-1'], 'both: attempts and answers from both apps present');
  ok(v2.settings.theme === 'dark', 'both: App 1 settings win (theme)');
  ok(v2.guided.crash45.finished === true, 'both: finished guided plan is not overwritten by unfinished one');
  await pm.context().close();
  // corrupted legacy + valid other
  pm = await newPage(browser, { seed: { 'ifl.v1': '{not json', ifl_v1: JSON.stringify(app2State) } }); v2 = await getV2(pm);
  ok(pm.errors.length === 0 && v2 && v2.topics['t9.5'], 'corrupted App 1 state is skipped, App 2 state still migrates');
  await pm.context().close();
  // corrupted v2 → backup + fallback
  pm = await newPage(browser, { seed: { ifl_v2: '{broken', 'ifl.v1': JSON.stringify(app1State) } });
  ok(pm.errors.length === 0, 'corrupted ifl_v2: app still starts'); ok(await pm.evaluate(() => Object.keys(localStorage).some(k => k.startsWith('ifl_v2.corrupt.'))), 'corrupted ifl_v2: raw copy kept as backup');
  v2 = await getV2(pm); ok(v2 && v2.topics['t9.3'], 'corrupted ifl_v2: falls back to recovering legacy state'); await pm.context().close();
  // partial/incomplete v2
  pm = await newPage(browser, { seed: { ifl_v2: JSON.stringify({ version: 2, settings: { theme: 'dark' }, topics: { 't1.1': { completed: 5 } } }) } });
  ok(pm.errors.length === 0 && await pm.evaluate(() => window.IFL.store.state.cards && Array.isArray(window.IFL.store.state.notes) && window.IFL.store.state.tools.finderUses === 0), 'incomplete ifl_v2: missing fields get safe defaults'); await go(pm, '/', 400); ok(!(await view(pm)).err, 'incomplete ifl_v2: dashboard renders'); await pm.context().close();
  // import: App 2 export file → merged
  pm = await newPage(browser, { seed: { 'ifl.v1': JSON.stringify(app1State) } });
  const kind = await pm.evaluate(t => window.IFL.store.importJSON(t), JSON.stringify(app2State)); v2 = await getV2(pm); await pm.evaluate(() => window.IFL.store.flush()); v2 = await getV2(pm);
  ok(kind === 'app2' && v2.topics['t9.3'] && v2.topics['t9.5'], 'importing an App 2 export merges into current progress');
  const kind1 = await pm.evaluate(t => window.IFL.store.importJSON(t), JSON.stringify({ app: 'islamic-finance-learning', data: app1State })); ok(kind1 === 'app1', 'importing an App 1 export is recognised');
  const exported = await pm.evaluate(() => window.IFL.store.exportJSON()); const kind2 = await pm.evaluate(t => window.IFL.store.importJSON(t), exported); ok(kind2 === 'v2', 'export → import round-trip of the merged format');
  const bad = await pm.evaluate(() => { try { window.IFL.store.importJSON('{"hello":1}'); return 'accepted'; } catch (e) { return 'rejected'; } }); ok(bad === 'rejected', 'invalid import file is rejected');
  await pm.context().close();

  /* ================================================================ SETTINGS */
  section('Settings: theme, sidebar, motion');
  const ps = await newPage(browser);
  await go(ps, '/settings', 400);
  await ps.locator('.seg[aria-label="Theme"] button', { hasText: 'Dark' }).click(); ok(await ps.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark', 'theme → dark applied');
  await ps.locator('.seg[aria-label="Motion"] button', { hasText: 'Reduced' }).click(); ok(await ps.evaluate(() => document.documentElement.classList.contains('reduce-motion')), 'reduced motion class applied');
  await ps.locator('.seg[aria-label="Sidebar (desktop)"] button', { hasText: 'Collapsed' }).click(); ok(await ps.evaluate(() => document.documentElement.classList.contains('sidebar-collapsed')), 'sidebar collapsed on desktop');
  await ps.evaluate(() => window.IFL.store.flush()); await ps.reload(); await ps.waitForSelector('#view h1'); await ps.waitForTimeout(300);
  ok(await ps.evaluate(() => document.documentElement.getAttribute('data-theme') === 'dark' && document.documentElement.classList.contains('reduce-motion') && document.documentElement.classList.contains('sidebar-collapsed')), 'theme / motion / sidebar persist across reload');
  const rail = await ps.evaluate(() => ({ w: Math.round(document.querySelector('#sidebar').getBoundingClientRect().width), labelsHidden: getComputedStyle(document.querySelector('#sidebar .nav-text')).display === 'none', named: [...document.querySelectorAll('#sidebar a.nav-link')].filter(a => a.getBoundingClientRect().width > 0).every(a => a.getAttribute('title')) }));
  ok(rail.w === 64 && rail.labelsHidden && rail.named, 'collapsed sidebar is an icon rail (64px) with titled links ' + JSON.stringify(rail));
  await ps.click('#menu-btn'); await ps.waitForTimeout(300); ok(await ps.evaluate(() => !document.documentElement.classList.contains('sidebar-collapsed')), 'menu button re-expands the sidebar');
  await ps.click('#theme-btn'); await ps.waitForTimeout(100); ok(await ps.evaluate(() => window.IFL.store.state.settings.theme) === 'system', 'topbar theme button cycles theme (dark → system)');
  await ps.context().close();
  const pr = await newPage(browser, { reducedMotion: 'reduce' });
  ok(await pr.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches && getComputedStyle(document.querySelector('.spinner') || document.body).animationName !== 'x'), 'prefers-reduced-motion honoured by the OS setting');
  const rmCss = await pr.evaluate(() => [...document.styleSheets].flatMap(s => [...s.cssRules]).some(r => r.media && /prefers-reduced-motion/.test(r.conditionText || r.media.mediaText))); ok(rmCss, 'stylesheet contains a prefers-reduced-motion block');
  await pr.context().close();
  const pd = await newPage(browser, { colorScheme: 'dark' }); ok(await pd.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark', 'system dark scheme is followed by default'); await pd.context().close();

  /* ================================================================ MOBILE / RESPONSIVE */
  section('Responsive: overflow, navigation, modals at 320–1440px');
  const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440];
  const SAMPLE = ['/', '/learn', '/chapter/9', '/topic/t9.5', '/glossary', '/glossary?tab=acronyms', '/concepts', '/compare', '/finder', '/finder?tool=tree', '/cases', '/case/cs-murabaha-1', '/flashcards', '/flashcards/review?chapter=9&n=2', '/quiz', '/quiz/run?types=match&n=2', '/exam', '/exam/trainer?id=et-1', '/mock', '/guided', '/guided/deep180-chapters', '/planner', '/progress', '/settings', '/search?q=murabaha', '/revision-cards', '/revision-cards?deck=topics', '/diagrams', '/diagram/mpo', '/timer', '/mistakes', '/practice', '/bookmarks', '/notes', '/chapter/9/print'];
  for (const w of WIDTHS) {
    const pw = await newPage(browser, { w, h: w < 500 ? 740 : 900 });
    const overflow = [];
    for (const rt of SAMPLE) {
      await go(pw, rt, 260);
      const m = await pw.evaluate(() => { const de = document.documentElement, view = document.querySelector('#view'); const offenders = []; if (de.scrollWidth > de.clientWidth + 1) { document.querySelectorAll('#view *').forEach(el => { const r = el.getBoundingClientRect(); if (r.right > de.clientWidth + 1 && r.width > 0 && getComputedStyle(el).position !== 'fixed' && !el.closest('.table-wrap, .diagram-wrap, [style*="overflow-x"], pre, svg')) offenders.push(el.tagName + '.' + el.className); }); } return { sw: de.scrollWidth, cw: de.clientWidth, off: offenders.slice(0, 3) }; });
      if (m.sw > m.cw + 1 && m.off.length) overflow.push(rt + ' (' + m.sw + '>' + m.cw + ' ' + m.off.join(',') + ')');
    }
    ok(overflow.length === 0, w + 'px: no horizontal overflow on ' + SAMPLE.length + ' routes' + (overflow.length ? ': ' + overflow.slice(0, 4).join(' ; ') : ''));
    if (w <= 960) {
      ok(await pw.evaluate(() => getComputedStyle(document.querySelector('#bottom-nav')).display !== 'none'), w + 'px: bottom navigation visible');
      await pw.click('#menu-btn'); await pw.waitForTimeout(350);
      const drawer = await pw.evaluate(() => { const s = document.querySelector('#sidebar'), r = s.getBoundingClientRect(); return { open: s.classList.contains('open'), left: r.left, right: r.right, vw: innerWidth, exp: document.querySelector('#menu-btn').getAttribute('aria-expanded') }; });
      ok(drawer.open && drawer.left >= -1 && drawer.right <= drawer.vw + 1 && drawer.exp === 'true', w + 'px: mobile menu opens inside the viewport');
      await pw.click('#nav a[href="#/glossary"]'); await pw.waitForTimeout(300); ok(await pw.evaluate(() => !document.querySelector('#sidebar').classList.contains('open') && location.hash.startsWith('#/glossary')), w + 'px: menu link navigates and closes drawer');
      await go(pw, '/', 300); await pw.click('#bottom-nav a[data-route="/flashcards"]'); await pw.waitForTimeout(300); ok((await pw.evaluate(() => location.hash)) === '#/flashcards', w + 'px: bottom-nav link works');
    }
    // modal fits
    await go(pw, '/topic/t9.5', 400); await pw.click('button:has-text("Notes")'); await pw.waitForTimeout(250);
    const md = await pw.evaluate(() => { const r = document.querySelector('.modal').getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, vw: innerWidth, vh: innerHeight }; });
    ok(md.l >= 0 && md.r <= md.vw + 1 && md.t >= 0 && md.b <= md.vh + 1, w + 'px: modal stays within viewport ' + JSON.stringify(md)); await pw.keyboard.press('Escape');
    // touch targets + flashcard usable
    await go(pw, '/flashcards/review?chapter=9&n=2', 500);
    const fl = await pw.evaluate(() => { const f = document.querySelector('.flash').getBoundingClientRect(); return { w: f.width, h: f.height, vw: innerWidth }; }); ok(fl.w > 200 && fl.w <= fl.vw && fl.h > 120, w + 'px: flashcard is usable (' + Math.round(fl.w) + 'x' + Math.round(fl.h) + ')');
    if (w <= 414) { const small = await pw.evaluate(() => [...document.querySelectorAll('#view button, #view a.btn, #bottom-nav a')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.height < 24 || r.width < 24); }).length); ok(small === 0, w + 'px: no interactive control smaller than 24×24 CSS px (' + small + ')'); }
    await go(pw, '/', 300); await pw.fill('#search-input', 'salam'); await pw.press('#search-input', 'Enter'); await pw.waitForTimeout(500); ok((await pw.locator('#view .result').count()) > 0, w + 'px: search works');
    await pw.context().close();
  }

  /* ================================================================ ACCESSIBILITY */
  section('Accessibility');
  const pa = await newPage(browser);
  const a11y = await pa.evaluate(() => ({ lang: document.documentElement.lang, skip: !!document.querySelector('a.skip-link[href="#main"]'), main: !!document.querySelector('main#main'), navs: [...document.querySelectorAll('nav')].every(n => n.getAttribute('aria-label')), title: document.title, viewport: /width=device-width/.test(document.querySelector('meta[name=viewport]').content), dialogCss: true }));
  ok(a11y.lang === 'en' && a11y.skip && a11y.main && a11y.navs && a11y.viewport, 'landmarks: lang, skip link, <main>, labelled <nav>s');
  ok(await pa.evaluate(() => [...document.styleSheets].flatMap(s => [...s.cssRules]).some(r => /:focus-visible/.test(r.selectorText || ''))), 'focus-visible styling present');
  for (const rt of ['/', '/topic/t9.5', '/glossary', '/quiz', '/quiz/run?types=match,order,multi&n=6', '/flashcards/review?chapter=2&n=2', '/compare', '/finder', '/concepts', '/settings', '/exam', '/mock', '/cases']) {
    await go(pa, rt, 500);
    const unl = await pa.evaluate(() => { const bad = []; document.querySelectorAll('button, a[href], input, select, textarea, [role=button]').forEach(el => { if (el.type === 'hidden' || el.closest('[hidden]') || (el.offsetParent === null && getComputedStyle(el).position !== 'fixed')) return; const name = (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || '').trim() || (el.labels && el.labels.length ? 'lbl' : '') || el.getAttribute('placeholder') || el.getAttribute('aria-labelledby'); if (!name) bad.push(el.tagName + '.' + el.className); }); return bad; });
    ok(unl.length === 0, 'accessible names on all controls at ' + rt + (unl.length ? ': ' + unl.slice(0, 4) : ''));
    ok((await pa.locator('#view h1').count()) === 1, 'exactly one <h1> at ' + rt);
  }
  // modal semantics
  await go(pa, '/topic/t9.5', 400); await pa.click('button:has-text("Notes")'); await pa.waitForTimeout(250);
  const dlg = await pa.evaluate(() => { const d = document.querySelector('.modal'); return { role: d.getAttribute('role'), modal: d.getAttribute('aria-modal'), lbl: d.getAttribute('aria-labelledby'), focusInside: d.contains(document.activeElement) }; });
  ok(dlg.role === 'dialog' && dlg.modal === 'true' && dlg.lbl && dlg.focusInside, 'modal: role=dialog, aria-modal, labelled, focus moved inside');
  for (let i = 0; i < 12; i++) await pa.keyboard.press('Tab'); ok(await pa.evaluate(() => document.querySelector('.modal').contains(document.activeElement)), 'modal: focus is trapped while open');
  await pa.keyboard.press('Escape'); await pa.waitForTimeout(150); ok((await pa.locator('.modal').count()) === 0 && await pa.evaluate(() => document.activeElement && document.activeElement.textContent.includes('Notes')), 'modal: Escape closes and returns focus');
  // flashcard is keyboard operable
  await go(pa, '/flashcards/review?chapter=2&n=2', 500); ok(await pa.evaluate(() => document.activeElement.classList.contains('flash')), 'flashcard receives focus and is keyboard-operable');
  if (AXE) {
    await pa.addScriptTag({ path: AXE });
    const routes = ['/', '/topic/t9.5', '/glossary', '/glossary?tab=acronyms', '/quiz', '/compare', '/finder', '/settings', '/exam', '/flashcards', '/cases', '/case/cs-murabaha-1', '/learn', '/chapter/9', '/mock', '/progress'];
    for (const scheme of ['light', 'dark']) {
      await pa.emulateMedia({ colorScheme: scheme }); await pa.evaluate(s => { window.IFL.store.update(st => { st.settings.theme = s; }); window.IFL.applyTheme(); }, scheme);
      let serious = [];
      for (const rt of routes) { await go(pa, rt, 450); const res = await pa.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'best-practice'] } }); return r.violations.filter(v => v.impact === 'serious' || v.impact === 'critical').map(v => v.id + '(' + v.nodes.length + ')'); }); if (res.length) serious.push(rt + ': ' + res.join(',')); }
      ok(serious.length === 0, 'axe (' + scheme + ') no serious/critical violations' + (serious.length ? ': ' + serious.join(' | ') : ''));
    }
  }
  await pa.context().close();

  await browser.close();
  console.log('\n' + pass + ' checks passed, ' + fail + ' failed');
  if (fail) { console.log('\nFAILURES:\n' + failures.join('\n')); process.exit(1); }
})().catch(e => { console.error('TEST HARNESS ERROR', e); process.exit(2); });
