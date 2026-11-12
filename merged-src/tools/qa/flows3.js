/* Interactive QA, part 3: daily session, mastery map, command palette, lesson keyboard shortcuts, reading progress. */
const { launch, FILE } = require('./pw');
const results = []; const ok = (n, c, x) => { results.push({ name: n, ok: !!c, extra: x }); console.log(c ? 'ok  ' : 'FAIL', n, c ? '' : JSON.stringify(x)); };
(async () => {
  const b = await launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const go = async (h, w = 100) => { await page.evaluate(x => { location.hash = '#' + x; }, h); await page.waitForTimeout(w); };
  await page.goto(FILE); await page.waitForTimeout(400);

  /* dashboard */
  ok('dashboard shows today card with four steps', await page.locator('#view .today-step').count() === 4);
  ok('mastery map has 18 chapter tiles, all "not started" on a fresh profile', await page.evaluate(() => { const t = document.querySelectorAll('#view .mastery-tile'); return t.length === 18 && [...t].every(x => x.dataset.l === '0'); }));
  ok('stat strip has six linked figures', await page.locator('#view .stat-strip a.strip-item').count() === 6);
  ok('navigation lists today with a 0/4 meter', await page.evaluate(() => /0\/4/.test(document.querySelector('#nav a[data-route="/today"]').textContent)));

  /* fresh plan */
  let plan = await page.evaluate(() => { const p = IFL.todayPlan(); return { done: p.done, total: p.total, next: p.next && p.next.id, routes: p.steps.map(s => s.route) }; });
  ok('fresh plan: 0 of 4, first step is review', plan.done === 0 && plan.total === 4 && plan.next === 'review', plan);
  for (const r of plan.routes) { await go(r, 150); ok('today step route renders: ' + r.split('?')[0], await page.evaluate(() => !/Page not found|Something went wrong|No questions|No cards/.test(document.getElementById('view').textContent) && document.getElementById('view').textContent.length > 80)); }

  /* step 1: grade flashcards */
  await go(plan.routes[0], 200);
  for (let i = 0; i < 3; i++) { await page.keyboard.press(' '); await page.waitForTimeout(40); await page.keyboard.press('3'); await page.waitForTimeout(60); }
  plan = await page.evaluate(() => { const p = IFL.todayPlan(); return p.steps.map(s => s.done); });
  ok('review step completes after grading cards (none due)', plan[0] === true && plan[1] === false, plan);

  /* step 2: complete two topics with the keyboard (m = complete, n = next) */
  await go('/topic/t1.1', 150);
  await page.keyboard.press('m'); await page.waitForTimeout(60);
  ok('"m" marks the topic complete', await page.evaluate(() => IFL.progress.isComplete('t1.1')));
  const before = await page.evaluate(() => location.hash);
  await page.keyboard.press('n'); await page.waitForTimeout(150);
  const after = await page.evaluate(() => location.hash);
  ok('"n" moves to the next topic', after !== before && /#\/topic\//.test(after), { before, after });
  await page.keyboard.press('m'); await page.waitForTimeout(60);
  await page.keyboard.press('p'); await page.waitForTimeout(150);
  ok('"p" moves back to the previous topic', await page.evaluate(() => location.hash) === before);
  plan = await page.evaluate(() => IFL.todayPlan().steps.map(s => s.done));
  ok('learn step completes after two topics (30-minute goal)', plan[1] === true, plan);
  ok('reading progress bar is shown on lessons only', await page.evaluate(() => !document.getElementById('read-progress').hidden));
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(80);
  ok('reading progress reaches the end when scrolled to the bottom', await page.evaluate(() => parseFloat(document.querySelector('#read-progress span').style.width) > 95));
  await go('/learn', 100);
  ok('reading progress bar hidden elsewhere', await page.evaluate(() => document.getElementById('read-progress').hidden));

  /* step 3: answers recorded today */
  await page.evaluate(() => { IFL.data.questions.slice(0, 10).forEach((q, i) => IFL.progress.recordAnswer(q, i % 2 === 0)); });
  plan = await page.evaluate(() => { const p = IFL.todayPlan(); return { d: p.steps.map(s => s.done), next: p.next && p.next.id }; });
  ok('practise step completes after ten answers', plan.d[2] === true && plan.next === 'apply', plan);
  /* step 4 */
  await page.evaluate(() => IFL.progress.markCase(IFL.data.cases[0].id));
  plan = await page.evaluate(() => { const p = IFL.todayPlan(); return { done: p.done, next: p.next }; });
  ok('all four steps done after a case is worked', plan.done === 4 && plan.next === null, plan);
  await go('/today', 150);
  ok('/today shows the all-done state', await page.evaluate(() => /4 of 4 steps done/.test(document.getElementById('view').textContent) && document.querySelectorAll('#view .today-step.done').length === 4));
  ok('week chart has seven days', await page.locator('#view .week-day').count() === 7);
  await go('/', 150);
  ok('mastery map reflects activity in chapter 1', await page.evaluate(() => Number(document.querySelector('#view .mastery-tile').dataset.l) >= 1));
  ok('yesterday\'s work does not count for today', await page.evaluate(() => {
    const s = IFL.store.state, day = 864e5;
    IFL.store.update(st => { st.reviews.forEach(r => { r.ts -= day; }); Object.values(st.topics).forEach(t => { if (t.completed) t.completed -= day; }); Object.values(st.answers).forEach(a => { a.last -= day; }); Object.values(st.cases).forEach(c => { c.ts -= day; }); });
    const p = IFL.todayPlan(); void s; return p.done === 0;
  }));

  /* command palette */
  await page.keyboard.press('Control+k'); await page.waitForTimeout(150);
  ok('Ctrl+K opens the palette with focus in its input', await page.evaluate(() => !!document.querySelector('.palette') && document.activeElement.classList.contains('palette-input')));
  ok('palette lists suggested and go-to commands', await page.locator('.palette-item').count() > 20);
  await page.keyboard.type('chapter 12'); await page.waitForTimeout(200);
  ok('palette filters commands', await page.evaluate(() => /Chapter 12/.test(document.querySelector('.palette-item[aria-selected="true"]').textContent)));
  await page.keyboard.press('Enter'); await page.waitForTimeout(150);
  ok('Enter opens the selected command and closes the palette', await page.evaluate(() => location.hash === '#/chapter/12' && !document.querySelector('.palette')));
  await page.click('#palette-btn'); await page.waitForTimeout(150);
  await page.keyboard.type('istisna'); await page.waitForTimeout(250);
  ok('palette searches all content', await page.evaluate(() => [...document.querySelectorAll('.palette-group')].some(g => g.textContent === 'Content') && document.querySelectorAll('.palette-item').length >= 3));
  await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowUp');
  ok('arrow keys move the selection', await page.evaluate(() => document.querySelectorAll('.palette-item')[1].getAttribute('aria-selected') === 'true' && document.querySelector('.palette-input').getAttribute('aria-activedescendant') === 'pal-1'));
  await page.keyboard.press('Escape'); await page.waitForTimeout(80);
  ok('Escape closes the palette and returns focus', await page.evaluate(() => !document.querySelector('.palette') && document.activeElement.id === 'palette-btn'));
  await page.keyboard.press('Control+k'); await page.waitForTimeout(120); await page.keyboard.type('theme'); await page.waitForTimeout(150);
  const th0 = await page.evaluate(() => IFL.store.state.settings.theme); await page.keyboard.press('Enter'); await page.waitForTimeout(100);
  ok('palette actions run (theme switch)', await page.evaluate(t => IFL.store.state.settings.theme !== t, th0));

  /* mobile */
  await page.setViewportSize({ width: 390, height: 800 });
  for (const r of ['/', '/today']) { await go(r, 200); ok('no horizontal overflow at 390px on ' + r, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), await page.evaluate(() => document.documentElement.scrollWidth)); }

  ok('no JS errors in part 3', errs.length === 0, errs.slice(0, 5));
  const failed = results.filter(r => !r.ok); console.log('checks:', results.length, 'failed:', failed.length);
  require('fs').writeFileSync(__dirname + '/flows3-result.json', JSON.stringify(results, null, 1));
  await b.close(); process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
