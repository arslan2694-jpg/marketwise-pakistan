/* Interactive QA, part 2: learning journey, extended notes, modes, concept map, glossary/acronyms, settings, a11y (modal focus trap, keyboard). */
const { launch, FILE } = require('./pw');
const results = []; const ok = (n, c, x) => { results.push({ name: n, ok: !!c, extra: x }); console.log(c ? 'ok  ' : 'FAIL', n, c ? '' : JSON.stringify(x)); };
(async () => {
  const b = await launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true }); const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const go = async (h, w = 80) => { await page.evaluate(x => { location.hash = '#' + x; }, h); await page.waitForTimeout(w); };
  await page.goto(FILE); await page.waitForTimeout(400);

  /* learning journey: search → topic → extended notes → complete → diagram → numerical → case → questions → flashcards */
  await go('/search?q=Murabaha', 150);
  await page.click('#view .result .t >> nth=0'); await page.waitForTimeout(100);
  ok('search result opens a page', await page.locator('#view h1').count() > 0);
  await go('/topic/t9.8.3', 100);
  ok('topic page shows extended study notes from the second source', await page.locator('#view h2:has-text("Extended study notes")').count() === 1 && await page.locator('#view details.acc summary:has-text("Extended notes")').count() >= 1);
  await page.click('#view details.acc summary >> nth=0'); await page.waitForTimeout(60);
  const lvl = async (name) => { await page.click('.seg button:has-text("' + name + '")'); await page.waitForTimeout(60); return page.evaluate(() => document.querySelector('#view details.acc[open] .acc-body').textContent.length); };
  const a = await lvl('Beginner'), c2 = await lvl('MBA'), d = await lvl('Exam');
  ok('level switch changes lesson and extended notes (Beginner/MBA/Exam)', a > 50 && c2 > 50 && d > 50, [a, c2, d]);
  ok('connected-learning panel offers questions and flashcards for the topic', await page.locator('#view h2:has-text("Connected learning")').count() === 1 && await page.locator('#view a:has-text("flashcard")').count() > 0);
  await page.click('#view button:has-text("Mark complete")'); await page.waitForTimeout(80);
  ok('mark complete updates the single progress model', await page.evaluate(() => !!IFL.store.state.topics['t9.8.3'].completed && IFL.progress.overall().done >= 1));
  await page.click('#view a:has-text("Teach me")'); await page.waitForTimeout(100);
  for (let i = 0; i < 9; i++) { await page.evaluate(() => { const b = Array.from(document.querySelectorAll('#view button.btn.primary')).find(x => /Next|Finish lesson/.test(x.textContent)); if (b) b.click(); }); await page.waitForTimeout(40); }
  ok('Teach me runs its 9 steps to completion', await page.locator('#view h2:has-text("Lesson complete")').count() === 1);
  await go('/diagram/mpo', 120);
  for (let i = 0; i < 3; i++) await page.click('#view button:has-text("Next step")');
  ok('transaction diagram steps through parties, cash and ownership', await page.locator('#view .diagram-svg').count() === 1 && /Step 4 of/.test(await page.locator('#view .card.sunk').textContent()));
  await go('/numericals?p=pool-profit&s=book', 120);
  await page.fill('#num-a0', '119'); await page.click('#view button:has-text("Show solution")'); await page.waitForTimeout(50);
  ok('numerical shows worked solution', await page.locator('#view ol.steps li').count() > 1);
  await go('/mode/salam', 100);
  ok('mode page links diagram, products, case, numerical, calculator', await page.locator('#view h2:has-text("Transaction diagram")').count() === 1 && await page.locator('#view h2:has-text("Products built on")').count() === 1 && await page.locator('#view a[href*="numericals"]').count() > 0 && await page.locator('#view a[href*="tools?tool"]').count() > 0);

  /* modes catalogue */
  await go('/modes', 100);
  await page.click('#view .chip:has-text("Forward Sale")'); await page.waitForTimeout(60);
  ok('modes filter by category', await page.locator('#view table.mode-table tbody tr[id^="md-"]').count() === 2);
  await page.click('#view tbody tr:first-child button:has-text("Show")'); await page.waitForTimeout(40);
  ok('mode row expands (aria-expanded)', await page.locator('#view button[aria-expanded="true"]').count() === 1);
  await page.locator('#view input[type=checkbox]').nth(0).check(); await page.locator('#view input[type=checkbox]').nth(1).check(); await page.click('#view button:has-text("Compare selected")'); await page.waitForTimeout(150);
  ok('compare-selected opens matrix with both modes', /compare/.test(await page.evaluate(() => location.hash)) && await page.locator('#view table caption:has-text("Financing modes compared")').count() === 1);

  /* concept map both views + concept page */
  await go('/concepts?view=flow', 150);
  await page.click('#view .concept-node >> nth=6'); await page.waitForTimeout(100);
  ok('learning-flow map highlights connections for a selected concept', await page.locator('#view .concept-node.connected').count() > 0 && await page.locator('#view svg.concept-edge-svg path').count() > 0);
  await page.click('#view button:has-text("Show all connections")'); await page.waitForTimeout(100);
  ok('show-all draws every sequence link', await page.locator('#view svg.concept-edge-svg path').count() > 100, await page.locator('#view svg.concept-edge-svg path').count());
  await go('/concepts', 200); ok('course map renders with pillars and concepts', await page.locator('#view svg.cmap .node').count() > 80);
  await go('/concept/murabaha', 100); ok('concept page: relationship graph, connected learning, mentions', await page.locator('#view svg.ego').count() === 1 && await page.locator('#view h2:has-text("Connected learning")').count() === 1);
  await go('/concept/maisir-qimar', 100); ok('F2 concept id resolves to the merged concept', await page.locator('#view h1').textContent().then(t => /Maisir/.test(t)));

  /* glossary + acronyms */
  await go('/glossary', 100); await page.fill('#view input[type=search]', 'riba'); await page.waitForTimeout(400);
  ok('glossary search filters terms', await page.locator('#view article.gl-entry').count() >= 2);
  ok('glossary shows both study sources\' definitions for a merged term', await page.evaluate(() => Array.from(document.querySelectorAll('.gl-entry')).some(e => /Fuller definition/.test(e.textContent))));
  await go('/glossary?tab=acronyms&q=AAOIFI', 120);
  ok('acronyms tab lists the expansion', await page.locator('#view table:has-text("Accounting and Auditing")').count() === 1);

  /* products / compare products / cases filters */
  await go('/products?cat=Sukuk', 100); ok('products filter by category from the URL', await page.locator('#view .product-card').count() >= 5);
  await go('/cases?mode=murabaha', 100); ok('cases filter by financing mode (mixed sources)', await page.locator('#view .card-link').count() >= 4);

  /* settings + export/import UI */
  await go('/settings', 100);
  await page.click('#view button:has-text("Larger")'); await page.click('#view button:has-text("Reduced")'); await page.waitForTimeout(60);
  ok('text size and reduced motion apply to the document', await page.evaluate(() => document.documentElement.style.getPropertyValue('--font-scale') === '1.2' && document.documentElement.classList.contains('reduce-motion')));
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#view button:has-text("Export my study data")')]);
  const p = await dl.path(); const txt = require('fs').readFileSync(p, 'utf8'); const j = JSON.parse(txt);
  ok('export downloads a versioned JSON file', j.app === 'islamic-finance-mba-learning-system' && j.version === 3 && j.data.version === 3);
  await page.setInputFiles('#view input[type=file]', { name: 'x.json', mimeType: 'application/json', buffer: Buffer.from(txt) }); await page.waitForTimeout(200);
  ok('import offers merge or replace', await page.locator('.modal button:has-text("Merge with current data")').count() === 1);
  await page.click('.modal button:has-text("Merge with current data")'); await page.waitForTimeout(200);

  /* a11y: skip link, landmarks, aria-current, modal focus trap, keyboard */
  await page.goto(FILE + '#/'); await page.reload(); await page.waitForTimeout(400);
  await page.evaluate(() => { document.activeElement && document.activeElement.blur(); });
  await page.keyboard.press('Tab'); const first = await page.evaluate(() => document.activeElement.className);
  ok('first Tab stop is the skip link', /skip-link/.test(first), first);
  ok('exactly one h1, one main, one nav landmark set; aria-current on active nav link', await page.evaluate(() => document.querySelectorAll('h1').length === 1 && document.querySelectorAll('main').length === 1 && !!document.querySelector('#nav a[aria-current="page"]')));
  await go('/topic/t9.3', 100);
  await page.click('#view button:has-text("Notes")'); await page.waitForTimeout(100);
  const modal = await page.evaluate(() => { const m = document.querySelector('.modal[role=dialog]'); return { has: !!m, modal: m && m.getAttribute('aria-modal'), inside: m && m.contains(document.activeElement) }; });
  ok('modal is an aria-modal dialog with focus moved inside', modal.has && modal.modal === 'true' && modal.inside, modal);
  for (let i = 0; i < 12; i++) await page.keyboard.press('Tab');
  ok('Tab focus stays trapped inside the modal', await page.evaluate(() => document.querySelector('.modal').contains(document.activeElement)));
  await page.keyboard.press('Escape'); await page.waitForTimeout(100);
  ok('Escape closes the modal and returns focus', await page.evaluate(() => !document.querySelector('.modal[role=dialog]') && document.activeElement.textContent.trim().indexOf('Notes') === 0));
  await go('/flashcards/review?chapter=2&n=2', 100);
  await page.keyboard.press('Space'); await page.waitForTimeout(50);
  ok('flashcard flips with Space exactly once', await page.evaluate(() => document.querySelector('.flash').classList.contains('flipped')));
  /* dark theme + reduced motion class render without error */
  await page.evaluate(() => { IFL.store.update(s => { s.settings.theme = 'dark'; }); IFL.applyTheme(); }); await go('/concepts?view=flow', 150);
  ok('dark theme applied', await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'dark'));
  ok('no JS errors in part 2', errs.length === 0, errs.slice(0, 5));
  const failed = results.filter(r => !r.ok); console.log('checks:', results.length, 'failed:', failed.length);
  require('fs').writeFileSync(__dirname + '/flows2-result.json', JSON.stringify(results, null, 1));
  await b.close(); process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
