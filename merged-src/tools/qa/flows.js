/* Interactive runtime QA: search, every question type, flashcards + SRS invariants, mock exam, cases,
   guided study, finder, calculators, numericals, bookmarks/notes, theme, offline (no network). */
const { launch, FILE } = require('./pw');
const results = [];
const ok = (name, cond, extra) => { results.push({ name, ok: !!cond, extra }); if (!cond) console.log('FAIL:', name, extra === undefined ? '' : JSON.stringify(extra)); };
(async () => {
  const b = await launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errs = [], reqs = [];
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('console.error: ' + m.text()); });
  page.on('request', r => { const u = r.url(); if (!/^(file:|data:|blob:|about:)/.test(u)) reqs.push(u); });
  const go = async (hash, wait = 60) => { await page.evaluate(h => { location.hash = '#' + h; }, hash); await page.waitForTimeout(wait); };
  await page.goto(FILE); await page.waitForTimeout(400);

  /* ---- search ---- */
  for (const term of ['Murabaha', 'Musharakah', 'Mudarabah', 'Ijarah', 'Salam', "Istisna'a", 'Sukuk', 'Takaful', 'Tawarruq', 'Kafalah', 'Qard Hasan', 'AAOIFI', 'SPV', 'Hamish Jiddiyah', 'sleeping partner', 'weightage', 'Wakalah', 'Hawalah', 'Rahn', 'Gharar', 'Riba']) {
    await go('/search?q=' + encodeURIComponent(term), 120);
    const info = await page.evaluate(() => { const chips = Array.from(document.querySelectorAll('#view a.chip[href*="search"]')).map(a => a.textContent.trim()); return { chips, first: (document.querySelector('.result .t') || {}).textContent || null }; });
    ok('search "' + term + '" returns results', info.first, info.chips.slice(0, 3));
  }
  await go('/search?q=Murabaha', 150);
  let types = await page.evaluate(() => Array.from(document.querySelectorAll('#view a.chip[href*="&type="]')).map(a => a.textContent.replace(/\s*\(\d+\)/, '').trim()));
  ok('Murabaha search spans content types', ['Topic', 'Financing mode', 'Product', 'Transaction diagram', 'Case study', 'Numerical', 'Calculator', 'Comparison', 'Question', 'Flashcard', 'Concept', 'Glossary'].every(t => types.indexOf(t) > -1), types);
  ok('Murabaha explore hub shown', await page.locator('#view h2:has-text("Connected learning")').count() > 0);
  const sug = await (async () => { await page.fill('#search-input', 'takaful'); await page.waitForTimeout(400); return page.evaluate(() => ({ open: !document.getElementById('search-suggest').hidden, n: document.querySelectorAll('#search-suggest [role=option]').length })); })();
  ok('live search suggestions open', sug.open && sug.n > 2, sug);
  await page.keyboard.press('ArrowDown'); await page.keyboard.press('Escape'); await page.fill('#search-input', '');

  /* ---- every question type renders and can be answered ---- */
  const byType = await page.evaluate(() => { const o = {}; IFL.data.questions.forEach(q => { const k = q.type + (q.format ? ':' + q.format : ''); (o[k] = o[k] || []).push(q.id); }); return o; });
  for (const [k, list] of Object.entries(byType)) {
    for (const id of [list[0], list[list.length - 1]]) {
      await go('/quiz/run?retry=' + id, 80);
      const done = await page.evaluate(async (qid) => {
        const q = IFL.data.question(qid), card = document.querySelector('#view .q-card'); if (!card) return 'no card';
        const t = q.type, btns = card.querySelectorAll('button.opt');
        if (['mcq', 'definition', 'identify', 'comparison', 'scenario', 'application'].indexOf(t) > -1) btns[q.correctAnswer].click();
        else if (t === 'tf') btns[q.correctAnswer ? 0 : 1].click();
        else if (t === 'multi') { q.correctAnswer.forEach(i => btns[i].click()); Array.from(card.querySelectorAll('button')).find(b => /Check answer/.test(b.textContent)).click(); }
        else if (t === 'match') { const sels = card.querySelectorAll('select'); q.pairs.forEach((p, i) => { sels[i].value = p[1]; }); Array.from(card.querySelectorAll('button')).find(b => /Check matches/.test(b.textContent)).click(); }
        else if (t === 'order') { Array.from(card.querySelectorAll('ol.order-list li')).forEach(() => 0); /* move items into order via up buttons */
          for (let pass = 0; pass < q.items.length * q.items.length; pass++) { const lis = Array.from(card.querySelectorAll('ol.order-list li')); const cur = lis.map(li => q.items.indexOf(li.querySelector('.grow').textContent)); const i = cur.findIndex((v, p) => v < (cur[p - 1] === undefined ? -1 : cur[p - 1])); if (i < 0) break; lis[i].querySelector('button[aria-label="Move up"]').click(); }
          Array.from(card.querySelectorAll('button')).find(b => /Check order/.test(b.textContent)).click(); }
        else if (t === 'short') { Array.from(card.querySelectorAll('button')).find(b => /Reveal model answer/.test(b.textContent)).click(); Array.from(card.querySelectorAll('button')).find(b => /I had the key points/.test(b.textContent)).click(); }
        const fb = card.querySelector('.feedback'); return fb ? (fb.classList.contains('ok') ? 'correct' : 'wrong') : 'no feedback';
      }, id);
      ok('question ' + k + ' [' + id + '] answers correctly', done === 'correct', done);
    }
  }
  const rec = await page.evaluate(() => Object.keys(IFL.store.state.answers).length);
  ok('answers recorded in the single progress model', rec > 15, rec);

  /* ---- flashcards + SRS ---- */
  await go('/flashcards/review?chapter=9&n=6', 100);
  for (let i = 0; i < 6; i++) { await page.keyboard.press('Space'); await page.waitForTimeout(20); await page.keyboard.press(String((i % 4) + 1)); await page.waitForTimeout(20); }
  const srs = await page.evaluate(() => { const cards = IFL.store.state.cards, ks = Object.keys(cards); return { n: ks.length, bad: ks.filter(k => { const c = cards[k]; return !(isFinite(c.due) && isFinite(c.interval) && c.interval >= 0 && c.ease >= 1.3 && isFinite(c.reps) && c.reps >= 0 && c.lapses >= 0); }) }; });
  ok('flashcard session graded 6 cards with valid SRS state', srs.n === 6 && srs.bad.length === 0, srs);
  const fuzz = await page.evaluate(() => { let bad = 0, c = null; for (let i = 0; i < 20000; i++) { c = IFL.srs.next(c, Math.floor(Math.random() * 4), Date.now() + i * 3600e3); if (!(isFinite(c.due) && c.due > 0 && isFinite(c.interval) && c.interval >= 0 && c.interval <= 3650 && c.ease >= 1.3 && c.ease <= 4 && c.reps >= 0 && c.lapses >= 0)) bad++; } return { bad, sample: c }; });
  ok('SRS fuzz: 20,000 random grades never produce NaN, negative or impossible values', fuzz.bad === 0, fuzz);
  ok('SRS corrupt-card sanitiser', await page.evaluate(() => { const c = IFL.migrate.cleanCard({ reps: NaN, ease: -3, interval: -5, lapses: 'x', due: 'bad', grade: 9 }); return isFinite(c.due) && c.ease >= 1.3 && c.interval === 0 && c.reps === 0 && c.grade === 2; }));

  /* ---- mock exam ---- */
  await go('/mock/run?n=5&min=5', 120);
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => { const card = document.querySelector('#view .q-card'); const b = card.querySelector('button.opt'); if (b) b.click(); else { const q = card.querySelector('textarea'); } });
    await page.waitForTimeout(30);
    await page.evaluate(() => { const nb = Array.from(document.querySelectorAll('#view button.btn.primary')).find(x => /Next|Skip/.test(x.textContent)); if (nb) nb.click(); });
    await page.waitForTimeout(30);
  }
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('#view button')).find(x => /Submit exam/.test(x.textContent)); if (b) b.click(); });
  await page.waitForTimeout(150);
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('.modal button')).find(x => /Submit/.test(x.textContent)); if (b) b.click(); });
  await page.waitForTimeout(200);
  ok('mock exam finishes with a review', await page.locator('#view .score-big').count() > 0 || await page.locator('#view:has-text("Answer review")').count() > 0);
  ok('mock attempt recorded', await page.evaluate(() => IFL.store.state.attempts.some(a => a.mode === 'mock')));

  /* ---- cases (both kinds), progress ---- */
  const caseF1 = 'c-salam-wheat', caseF2 = 'cs-murabaha-1';
  await go('/case/' + caseF1, 100);
  await page.evaluate(() => { Array.from(document.querySelectorAll('#view button')).find(b => /^Continue$/.test(b.textContent)).click(); });
  await page.waitForTimeout(80);
  await page.evaluate(() => { document.querySelector('#view .chip[aria-pressed]').click(); });
  await page.waitForTimeout(80);
  const nq = await page.evaluate(() => IFL.data.caseStudy('c-salam-wheat').questions.length);
  for (let i = 0; i < nq; i++) { await page.evaluate((i) => { const cards = document.querySelectorAll('#view .q-card'); const q = IFL.data.caseStudy('c-salam-wheat').questions[i]; cards[i].querySelectorAll('button.opt')[q.correctAnswer].click(); }, i); await page.waitForTimeout(40); }
  ok('F1-style case reaches textbook answer and is recorded', await page.evaluate(() => !!(IFL.store.state.cases['c-salam-wheat'])));
  await go('/case/' + caseF2, 100);
  await page.evaluate(() => { Array.from(document.querySelectorAll('#view button')).find(b => /^Continue$/.test(b.textContent)).click(); });
  await page.waitForTimeout(80);
  await page.evaluate(() => { document.querySelector('#view .chip[aria-pressed]').click(); });
  await page.waitForTimeout(80);
  await page.evaluate(() => { Array.from(document.querySelectorAll('#view button')).find(b => /Reveal the textbook-based answer/.test(b.textContent)).click(); });
  await page.waitForTimeout(80);
  ok('F2-style case reveals answer and is recorded', await page.evaluate(() => !!(IFL.store.state.cases['cs-murabaha-1']) && /Exam takeaway/.test(document.getElementById('view').textContent)));

  /* ---- finder: walk both pathways to a result ---- */
  for (const path of ['need', 'purpose']) {
    await go('/finder?path=' + path, 80);
    let n = 0; while (n++ < 8 && await page.locator('#view button.opt').count()) { await page.locator('#view button.opt').first().click(); await page.waitForTimeout(30); }
    ok('finder pathway ' + path + ' reaches a result', await page.locator('#view h2:has-text("A mode that may be relevant"), #view .eyebrow:has-text("A mode that may be relevant")').count() > 0);
  }

  /* ---- guided study: run through each plan ---- */
  for (const plan of ['crash45', 'revision90', 'deep180']) {
    await go('/guided/' + plan + '?restart=1', 150);
    const segs = await page.evaluate(p => IFL.data.plans[p].segments.length, plan);
    for (let i = 0; i < segs; i++) { await page.evaluate(() => { const b = Array.from(document.querySelectorAll('#view button.btn.primary')).reverse().find(x => /Next section|Finish session/.test(x.textContent)); if (b) b.click(); }); await page.waitForTimeout(60); }
    ok('guided plan ' + plan + ' completes', await page.evaluate(p => !!(IFL.store.state.guided[p] && IFL.store.state.guided[p].finished), plan));
  }

  /* ---- calculators & numericals ---- */
  const calcs = await page.evaluate(() => Object.keys(IFL.calcTypes));
  let calcBad = [];
  for (const c of calcs) {
    const r = await page.evaluate((c) => { const el = IFL.calc(c); document.body.appendChild(el); const out = el.textContent; el.querySelectorAll('input[type=number]').forEach(i => { i.value = 0; i.dispatchEvent(new Event('input')); }); const zero = el.textContent; el.querySelectorAll('input[type=number]').forEach(i => { i.value = -5; i.dispatchEvent(new Event('input')); }); const neg = el.textContent; el.remove(); return { out, zero, neg }; }, c);
    ['out', 'zero', 'neg'].forEach(k => { if (/NaN|Infinity|undefined/.test(r[k])) calcBad.push(c + ':' + k); });
  }
  ok('all ' + calcs.length + ' calculators run with default, zero and negative inputs without NaN/Infinity/undefined', calcBad.length === 0, calcBad);
  const numBad = await page.evaluate(() => { const bad = []; Object.values(IFL.numericalDefs).forEach(g => { const seeds = g.book ? [null] : []; for (let s = 1; s <= 40; s++) seeds.push(s); seeds.forEach(s => { try { const rngf = (function (seed) { var x = seed >>> 0 || 1; return function () { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; }; })(s || 1); const p = s == null ? g.book : g.rand(rngf); const r = g.solve(p); r.asks.forEach(a => { if (!isFinite(a.v)) bad.push(g.id + ' seed ' + s); }); r.steps.forEach(t => { if (/NaN|Infinity|undefined/.test(t)) bad.push(g.id + ' step seed ' + s); }); } catch (e) { bad.push(g.id + ' threw ' + e.message); } }); }); return bad; });
  ok('all numerical generators produce finite answers over textbook + 40 random seeds', numBad.length === 0, numBad.slice(0, 5));

  /* ---- bookmarks / notes / theme ---- */
  await go('/topic/t9.3', 80);
  await page.evaluate(() => { Array.from(document.querySelectorAll('#view button')).find(b => /^Bookmark/.test(b.textContent.trim())).click(); });
  await go('/mode/murabaha', 80);
  await page.evaluate(() => { Array.from(document.querySelectorAll('#view button')).find(b => /^Bookmark/.test(b.textContent.trim())).click(); });
  ok('bookmarks stored for topic and financing mode', await page.evaluate(() => IFL.store.state.bookmarks.filter(b => b.id === 't9.3' || b.id === 'murabaha').length === 2));
  await page.evaluate(() => { IFL.progress.saveNote({ target: { type: 'mode', id: 'murabaha', label: 'Murabaha', route: '/mode/murabaha' }, text: 'test note' }); });
  await go('/notes', 80); ok('notes page lists the note', await page.locator('#view:has-text("test note")').count() > 0);
  await page.click('#theme-btn'); await page.waitForTimeout(100);
  const th = await page.evaluate(() => ({ t: document.documentElement.getAttribute('data-theme'), s: IFL.store.state.settings.theme }));
  ok('theme toggle persists a setting', th.s === 'dark' || th.s === 'system' || th.s === 'light', th);
  ok('state persisted under ifl.v3 (APP_STATE_VERSION 3)', await page.evaluate(() => { const s = JSON.parse(localStorage.getItem('ifl.v3')); return s.version === 3 && IFL.APP_STATE_VERSION === 3; }));

  ok('no network requests (fully offline / standalone)', reqs.length === 0, reqs.slice(0, 5));
  ok('no JS/console errors during interactive QA', errs.length === 0, errs.slice(0, 8));
  const failed = results.filter(r => !r.ok);
  console.log('checks:', results.length, 'passed:', results.length - failed.length, 'failed:', failed.length);
  require('fs').writeFileSync(__dirname + '/flows-result.json', JSON.stringify(results, null, 1));
  await b.close();
  process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
