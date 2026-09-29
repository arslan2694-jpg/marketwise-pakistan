'use strict';
/*  Feature-level browser tests: live search, guided study, timers, planner, adaptive practice / topic mastery for merged questions,
    calculators (edge cases), diagrams, keyboard shortcuts, printable sheet, export/import UI.
    usage: NODE_PATH=<global node_modules> node tests/features.js <merged.html> */
const { chromium } = require('playwright');
const file = process.argv[2], URL = 'file://' + file;
let pass = 0, fail = 0; const failures = [];
function ok(c, m) { if (c) pass++; else { fail++; failures.push(m); console.log('  FAIL: ' + m); } }
function section(t) { console.log('\n# ' + t); }
async function newPage(browser, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: opts.w || 1280, height: opts.h || 900 } });
  const page = await ctx.newPage(); page.errors = [];
  page.on('pageerror', e => page.errors.push('pageerror: ' + e.message)); page.on('console', m => { if (m.type() === 'error') page.errors.push('console: ' + m.text()); });
  await page.goto(URL); await page.waitForSelector('#view h1, #view .card'); return page;
}
async function go(p, r, w = 350) { await p.evaluate(x => { location.hash = x; }, r); await p.waitForTimeout(w); }

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  let page = await newPage(browser);

  section('Live search suggestions (combobox)');
  await page.click('#search-input'); await page.type('#search-input', 'murab', { delay: 30 }); await page.waitForTimeout(700);
  let st = await page.evaluate(() => { const p = document.querySelector('#search-suggest'); return { hidden: p.hidden, opts: p.querySelectorAll('[role=option]').length, exp: document.querySelector('#search-input').getAttribute('aria-expanded'), role: document.querySelector('#search-input').getAttribute('role') }; });
  ok(!st.hidden && st.opts >= 4 && st.exp === 'true' && st.role === 'combobox', 'typing shows suggestions in a listbox (' + st.opts + ' options)');
  await page.keyboard.press('ArrowDown'); st = await page.evaluate(() => { const i = document.querySelector('#search-input'); const id = i.getAttribute('aria-activedescendant'); const el = id && document.getElementById(id); return { id, sel: el && el.getAttribute('aria-selected') }; });
  ok(st.id && st.sel === 'true', 'ArrowDown moves the active suggestion (aria-activedescendant)');
  await page.keyboard.press('Escape'); ok(await page.evaluate(() => document.querySelector('#search-suggest').hidden), 'Escape closes suggestions');
  await page.fill('#search-input', ''); await page.type('#search-input', 'salam', { delay: 30 }); await page.waitForTimeout(700); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await page.waitForTimeout(500);
  const h1 = await page.evaluate(() => location.hash); ok(h1 !== '#/' && !h1.startsWith('#/search'), 'Enter on a suggestion opens it directly (' + h1 + ')');
  await page.fill('#search-input', ''); await page.type('#search-input', 'ijara', { delay: 30 }); await page.waitForTimeout(700);
  ok(await page.evaluate(() => [...document.querySelectorAll('#search-suggest [role=option]')].some(o => /ijarah/i.test(o.textContent))), 'suggestions tolerate spelling variants (ijara → Ijarah)');
  await page.click('#search-suggest a[id="sg-all"]'); await page.waitForTimeout(400); ok((await page.evaluate(() => location.hash)).startsWith('#/search?q=ijara'), '"See all results" opens the results page');

  section('Guided study (45 / 90 / 180 / chapter track)');
  await go(page, '/guided/crash45', 700);
  const cd0 = await page.locator('.countdown').innerText(); await page.click('button:has-text("Start")'); await page.waitForTimeout(2300); const cd1 = await page.locator('.countdown').innerText();
  ok(cd0 !== cd1, 'countdown runs after Start: ' + cd0 + ' → ' + cd1);
  await page.click('button:has-text("Pause")'); const p1 = await page.locator('.countdown').innerText(); await page.waitForTimeout(1500); ok(p1 === await page.locator('.countdown').innerText(), 'pause stops the countdown');
  const seg0 = await page.locator('.guided-bar div[style*="font-weight"]').innerText().catch(() => '');
  await page.click('button[aria-label="Next section"]'); await page.waitForTimeout(400); const segTitle1 = await page.locator('#view h2').first().innerText(); ok(/section 2 /i.test(await page.locator('#view').innerText()), 'Next moves to section 2');
  ok(await page.locator('text=Section overview').count() === 1, 'segment overview (from the companion study modes) is shown');
  await page.click('button[aria-label="Previous section"]'); await page.waitForTimeout(300); ok(/section 1 /i.test(await page.locator('#view').innerText()), 'Previous returns to section 1');
  await page.click('button[title="Skip this section"]'); await page.waitForTimeout(300); ok((await page.evaluate(() => window.IFL.store.state.guided.crash45.seg)) === 1, 'Skip advances and progress is saved');
  await page.evaluate(() => window.IFL.store.flush()); await page.reload(); await page.waitForSelector('#view h1'); await page.waitForTimeout(400);
  ok(/section 2 /i.test(await page.locator('#view').innerText()), 'guided progress resumes after refresh');
  for (let i = 0; i < 12; i++) { const b = page.locator('button[aria-label="Next section"]'); if (!(await b.count()) || !(await b.isVisible())) break; await b.click(); await page.waitForTimeout(250); }
  await page.waitForTimeout(300); ok(await page.evaluate(() => window.IFL.store.state.guided.crash45.finished === true), '45-minute course can be completed');
  ok(await page.evaluate(() => !!window.IFL.store.state.achievements['crash-course']), 'crash-course achievement unlocked');
  await go(page, '/guided/deep180-chapters', 800);
  ok((await page.locator('#view a', { hasText: 'Open chapter' }).count()) >= 1 && await page.locator('text=Section overview').count() === 1, '3-hour chapter track renders chapter cards + overviews');
  await go(page, '/guided/revision90', 700); ok((await page.locator('#view h2').first().innerText()).length > 0 && page.errors.length === 0, '90-minute revision renders');
  ok(await page.evaluate(() => Object.keys(window.IFL_DATA.sets.studyPlans).join()) === 'crash45,revision90,deep180,deep180-chapters', 'four study plans registered');

  section('Study timer');
  await go(page, '/timer', 500);
  await page.click('button:has-text("25")'); await page.waitForTimeout(1300); ok(await page.evaluate(() => !document.querySelector('#timer-chip').hidden), 'timer chip appears in the top bar while running');
  const face = await page.locator('.timer-face').innerText(); ok(/^\d\d:\d\d$/.test(face) && face !== '25:00', 'timer face counts down: ' + face);
  await page.click('button:has-text("Pause")'); ok(await page.locator('button:has-text("Resume")').count() === 1, 'timer pauses');
  await page.click('button:has-text("Stop and log")'); await page.waitForTimeout(200); ok(await page.evaluate(() => document.querySelector('#timer-chip').hidden), 'timer stops');

  section('Planner');
  await go(page, '/planner', 500);
  const dt = new Date(Date.now() + 20 * 86400000).toISOString().slice(0, 10);
  await page.evaluate(d => { window.IFL.store.update(s => { s.settings.examDate = d; }); window.IFL.refresh(); }, dt); await page.waitForTimeout(600);
  ok((await page.locator('#view table tbody tr').count()) >= 10 && !(await page.evaluate(() => /Something went wrong/.test(document.querySelector('#view').textContent))), 'planner builds a day-by-day plan');

  section('Topic mastery / adaptive practice with merged questions');
  const m = await page.evaluate(async () => {
    const chs = await window.IFL_DATA.loadAllChapters(); const f2 = chs.flatMap(c => c.questions.filter(q => q.origin === 'app2').map(q => Object.assign({ chapter: c.number }, q)));
    const q = f2.find(x => x.chapter === 9); const top = q.topic;
    const P = window.IFL.progress;
    P.recordAnswer(q, false); P.recordAnswer(q, false); P.recordAnswer(q, false);
    const weak = P.weakTopics(5).map(w => w.id); const acc = P.topicAccuracy(top);
    const pool = await window.IFL.questionPool(); const ranked = window.IFL.rankQuestions(pool.filter(x => x.topic === top)).slice(0, 3).map(r => r.q.origin || 'app1');
    return { top, weak, acc, ranked, label: q.topicLabel };
  });
  ok(m.weak.includes(m.top), 'a wrong answer to a merged (App 2) question marks its canonical topic weak: ' + m.top + ' (label "' + m.label.slice(0, 40) + '")');
  ok(m.acc.pct === 0 && m.acc.n === 3, 'per-topic accuracy counts merged questions');
  await go(page, '/practice', 600); ok((await page.locator('#view .weak-row').count()) >= 1, 'adaptive practice lists the weak topic');
  await go(page, '/practice/run?topics=' + m.top + '&n=5', 700); ok((await page.locator('.q-card').count()) === 1, 'targeted practice runs on the weak topic');
  await go(page, '/mistakes', 600); ok((await page.locator('#view .card ul.list li').count()) >= 1, 'mistakes review lists the missed merged question');
  await go(page, '/progress', 600); ok(!(await page.evaluate(() => /Something went wrong/.test(document.querySelector('#view').textContent))), 'progress page renders');
  await go(page, '/', 600); ok((await page.locator('.weak-row').count()) >= 1, 'dashboard weak-topic panel shows it');

  section('Keyboard shortcuts');
  await go(page, '/quiz/run?types=mcq&n=3', 600); await page.locator('body').click({ position: { x: 5, y: 300 } }); await page.keyboard.press('1'); await page.waitForTimeout(200);
  ok(await page.locator('.feedback').count() === 1, 'pressing 1 answers an MCQ'); await page.keyboard.press('Enter'); await page.waitForTimeout(200); ok(/question 2 of 3/i.test(await page.locator('#view').innerText()), 'Enter moves to the next question');
  await go(page, '/revision-cards', 500); await page.locator('body').click({ position: { x: 5, y: 300 } }); await page.keyboard.press('ArrowRight'); await page.waitForTimeout(150); ok(/2 \/ 45/.test(await page.locator('#view').innerText()), 'arrow keys move through revision cards');
  await go(page, '/revision-cards?deck=topics', 600); const topicCards = await page.locator('#view .rev-card').count(); const cnt = await page.locator('#view .row.small.muted, #view span.tabular').first().innerText().catch(() => ''); ok(topicCards === 1, 'topic revision deck renders a card'); ok(/\/ 536/.test(await page.locator('#view').innerText()), 'topic deck has 536 cards (311 topics + 225 companion notes)');

  section('Diagrams, calculators, print sheet');
  await go(page, '/diagram/mpo', 600); const d1 = await page.locator('.card.sunk h4').innerText(); await page.locator('ol.step-list button').nth(2).click(); const d2 = await page.locator('.card.sunk h4').innerText(); ok(d1 !== d2, 'diagram steps are interactive');
  const diags = await page.evaluate(() => window.IFL_DATA.sets.diagrams.length); ok(diags === 20, '20 diagrams available');
  let diagFail = []; for (const d of await page.evaluate(() => window.IFL_DATA.sets.diagrams.map(d => d.id))) { await go(page, '/diagram/' + d, 120); if (await page.evaluate(() => /Something went wrong|not found/i.test(document.querySelector('#view').textContent))) diagFail.push(d); } ok(!diagFail.length, 'every diagram page renders ' + diagFail);
  const calc = await page.evaluate(() => {
    const types = []; Object.values(window.IFL_DATA.chapters).forEach(c => c.topics.forEach(t => { if (t.calc) types.push(t.calc.type); }));
    const bad = [], seen = [];
    types.forEach(type => {
      const el = window.IFL.calc(type, ''); if (!el) { bad.push(type + ' missing'); return; } document.body.appendChild(el); seen.push(type);
      const inputs = [...el.querySelectorAll('input.input')];
      [0, -5, 1e12, 0.000001, ''].forEach(val => { inputs.forEach(i => { i.value = val; i.dispatchEvent(new Event('input')); }); const txt = el.textContent; if (/NaN|Infinity|undefined|\[object/.test(txt)) bad.push(type + ' with ' + JSON.stringify(val)); });
      el.querySelectorAll('select').forEach(s => { [...s.options].forEach(o => { s.value = o.value; s.dispatchEvent(new Event('input')); if (/NaN|Infinity|undefined/.test(el.textContent)) bad.push(type + ' select ' + o.value); }); });
      el.remove();
    });
    return { n: types.length, uniq: new Set(seen).size, bad };
  });
  ok(calc.n === 14 && calc.bad.length === 0, 'all ' + calc.n + ' calculators survive edge-case inputs (0, negative, huge, tiny, empty): ' + calc.bad.slice(0, 4));
  const tbook = await page.evaluate(() => { const el = window.IFL.calc('promise-breach', ''); document.body.appendChild(el); const r = el.querySelector('.result-line').textContent; const b = el.querySelector('.badge').textContent; el.remove(); return { r, b }; });
  ok(/Recover 1,?000/.test(tbook.r) && /Textbook/.test(tbook.b), 'calculator defaults reproduce the textbook figures and are labelled: ' + tbook.r);
  await go(page, '/chapter/9/print', 600); ok((await page.locator('.print-sheet').count()) === 1, 'printable chapter sheet renders');

  section('Export / import UI');
  await go(page, '/settings', 500);
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('button:has-text("Export my study data")')]);
  const path = await dl.path(); const txt = require('fs').readFileSync(path, 'utf8'); const j = JSON.parse(txt);
  ok(j.schema === 'ifl_v2' && j.data.version === 2 && /understanding-islamic-finance-study-data/.test(dl.suggestedFilename()), 'export downloads a versioned ifl_v2 file (' + dl.suggestedFilename() + ')');
  await page.evaluate(() => { window.IFL.store.update(s => { s.notes.length = 0; s.bookmarks.length = 0; }); });
  await page.setInputFiles('input[type=file]', path); await page.waitForTimeout(300); await page.click('.modal footer button.primary'); await page.waitForTimeout(600);
  ok(await page.evaluate(() => window.IFL.store.state.guided.crash45 && window.IFL.store.state.guided.crash45.finished), 'import restores state from the exported file');
  await go(page, '/settings', 500);
  await page.click('button:has-text("Reset all progress")'); await page.waitForTimeout(200); await page.click('.modal footer button.danger'); await page.waitForTimeout(500);
  ok(await page.evaluate(() => Object.keys(window.IFL.store.state.topics).length === 0 && Object.keys(window.IFL.store.state.answers).length === 0), 'reset clears progress');

  ok(page.errors.length === 0, 'no JS errors during feature tests ' + page.errors.slice(0, 2).join('|'));
  await browser.close();
  console.log('\n' + pass + ' checks passed, ' + fail + ' failed');
  if (fail) { console.log(failures.join('\n')); process.exit(1); }
})().catch(e => { console.error('TEST HARNESS ERROR', e); process.exit(2); });
