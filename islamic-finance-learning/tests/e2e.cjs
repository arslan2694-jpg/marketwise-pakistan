/* End-to-end tests (Playwright library, no test-runner dependency).
   Run: node tests/e2e.cjs            (all tests)
        node tests/e2e.cjs glossary   (tests whose name contains "glossary")
   Opens index.html from file:// (the main way the app is used) and, for the PWA test,
   serves the folder on a local port. Fails on any page error or console error. */
const path = require('path'), fs = require('fs'), http = require('http');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }

const ROOT = path.join(__dirname, '..');
// E2E_FILE=/path/to/Islamic-Finance-Learning.html runs the same suite against the single-file build.
const STANDALONE = process.env.E2E_FILE || '';
const URL = 'file://' + (STANDALONE ? path.resolve(STANDALONE) : path.join(ROOT, 'index.html'));
const SHOTS = path.join(__dirname, 'screenshots');
const filter = process.argv[2] || '';
const tests = [];
function test(name, fn, opts) { tests.push({ name, fn, opts: opts || {} }); }
function assert(cond, msg) { if (!cond) throw new Error('Assertion failed: ' + msg); }

let browser;
async function open(opts) {
  opts = opts || {};
  const ctx = await browser.newContext({ viewport: opts.mobile ? { width: 390, height: 844 } : { width: 1360, height: 900 }, colorScheme: opts.dark ? 'dark' : 'light', acceptDownloads: true, deviceScaleFactor: 1, isMobile: !!opts.mobile, hasTouch: !!opts.mobile });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.errors = errors;
  await page.goto(opts.url || URL);
  await page.waitForSelector('#view > *');
  return { ctx, page };
}
async function go(page, route) {
  await page.evaluate((r) => { location.hash = '#' + r; }, route);
  await page.waitForFunction((r) => document.body.dataset.route !== undefined ? true : true, route);
  await page.waitForTimeout(80);
  await page.waitForFunction(() => !document.querySelector('#view .loading'), null, { timeout: 8000 }).catch(() => {});
}
const state = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.IFL.store.state)));
const saved = (page) => page.evaluate(() => { window.IFL.store.flush(); return JSON.parse(localStorage.getItem('ifl.v1') || '{}'); });
const heading = (page) => page.locator('#view h1').first().textContent();

/* ---------------- Tests ---------------- */

test('dashboard shows real (zero) progress for a new student', async (page) => {
  const txt = await page.locator('#view').innerText();
  assert(/Welcome/.test(txt), 'welcome heading');
  assert(/0 \/ 18/.test(txt), 'chapters completed 0 / 18');
  assert(/Quiz average\s*—|—\s*Quiz average/i.test(txt), 'quiz average is a dash before any quiz');
  assert(await page.locator('.ring').getAttribute('aria-label') === 'Course completion: 0%', 'completion ring 0%');
});

test('sidebar navigation reaches every main section', async (page) => {
  const routes = ['/learn', '/glossary', '/flashcards', '/quiz', '/practice', '/cases', '/compare', '/diagrams', '/concepts', '/finder', '/exam', '/exam/trainer', '/revision-cards', '/guided', '/bookmarks', '/notes', '/progress', '/timer', '/settings', '/search?q=riba'];
  for (const r of routes) {
    await go(page, r);
    const h1 = (await heading(page)) || '';
    assert(h1.trim().length > 0, 'h1 on ' + r);
    const body = await page.locator('#view').innerText();
    assert(!/Coming soon|Lorem ipsum|TODO/i.test(body), 'no placeholder text on ' + r);
  }
  const navLinks = await page.locator('#nav a[href^="#/"]').count();
  assert(navLinks >= 15, 'sidebar has links (' + navLinks + ')');
});

test('all 18 chapters render with topics, source pages and tabs', async (page) => {
  for (let n = 1; n <= 18; n++) {
    await go(page, '/chapter/' + n);
    const h1 = await heading(page);
    assert(h1 && h1.length > 3, 'chapter ' + n + ' title');
    await go(page, '/chapter/' + n + '?tab=topics');
    const topics = await page.locator('#view a[href^="#/topic/"]').count();
    assert(topics >= 5, 'chapter ' + n + ' lists topics (' + topics + ')');
  }
});

test('topic lesson: levels, explain again, source context, mark complete updates progress', async (page) => {
  await go(page, '/topic/t9.2');
  await page.getByRole('button', { name: 'Beginner' }).click();
  await page.getByRole('button', { name: 'Exam', exact: true }).click();
  assert(await page.locator('.callout.gold').count() > 0, 'exam level shows exam answer');
  await page.getByRole('button', { name: 'Explain simply' }).click();
  await page.getByRole('button', { name: 'Explain the difference' }).click();
  const src = page.getByRole('button', { name: /View source context/i });
  if (await src.count()) { await src.first().click(); await page.waitForSelector('.modal'); assert(/Source context/.test(await page.locator('.modal').innerText()), 'source modal'); await page.keyboard.press('Escape'); }
  await page.getByRole('button', { name: 'Mark complete' }).click();
  const s = await state(page);
  assert(s.topics['t9.2'] && s.topics['t9.2'].completed, 'topic stored complete');
  await go(page, '/');
  assert(/1 \/ \d+ topics/.test(await page.locator('#view').innerText()), 'dashboard counts 1 topic');
  await go(page, '/teach/t9.2');
  assert(await page.getByRole('button', { name: /Next/ }).count() > 0, 'teach me steps');
});

test('glossary search, A–Z filter and bookmark', async (page) => {
  await go(page, '/glossary');
  const all = await page.locator('.gl-entry').count();
  assert(all > 150, 'glossary entries (' + all + ')');
  await page.getByLabel('Search glossary').fill('gharar');
  await page.waitForTimeout(300);
  const found = await page.locator('.gl-entry').count();
  assert(found >= 1 && found < all, 'search narrows (' + found + ')');
  await page.getByLabel('Search glossary').fill('');
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Letter M' }).click();
  const terms = await page.locator('.gl-entry h3').allTextContents();
  assert(terms.length > 0, 'letter M has terms');
  await page.locator('.gl-entry').first().locator('button[aria-pressed]').first().click();
  const s = await state(page);
  assert(s.bookmarks.some((b) => b.type === 'term'), 'term bookmarked');
});

test('global search finds content without diacritics', async (page) => {
  await page.fill('#search-input', 'istisna');
  await page.press('#search-input', 'Enter');
  await page.waitForFunction(() => /Results for/.test(document.querySelector('#view h1')?.textContent || ''));
  assert(await page.locator('#view a[href^="#/"]').count() > 5, 'search results listed');
});

test('flashcards: flip and grade Again/Hard/Good/Easy schedule cards', async (page) => {
  await go(page, '/flashcards/review?chapter=9');
  for (let k = 0; k < 4; k++) {
    await page.locator('.flash').click();
    await page.locator('.grade-bar').waitFor({ state: 'visible' });
    await page.locator('.grade-bar .btn').nth(k).click();
  }
  const s = await state(page);
  assert(s.reviews.length === 4, 'four reviews stored (' + s.reviews.length + ')');
  assert(Object.keys(s.cards).length >= 3, 'cards scheduled');
});

test('quiz: answer every question, results page, attempt recorded', async (page) => {
  await go(page, '/quiz/run?chapter=3&n=6');
  for (let i = 0; i < 6; i++) {
    const card = page.locator('#view .card').nth(0);
    await answerCurrent(page);
    const next = page.getByRole('button', { name: /Next question|See results/ });
    await next.waitFor();
    assert(!(await next.isDisabled()), 'next enabled after answering q' + (i + 1));
    assert(await page.locator('#view').getByText(/Explanation|Correct|Incorrect|Model answer|answer/i).count() > 0, 'feedback shown');
    await next.click();
  }
  await page.waitForSelector('.score-big');
  const s = await state(page);
  assert(s.attempts.length === 1 && s.attempts[0].total === 6, 'attempt recorded');
});

async function answerCurrent(page) {
  const opt = page.locator('#view .opt:not([disabled]), #view button.opt');
  if (await opt.count()) { await opt.first().click(); const chk = page.getByRole('button', { name: 'Check answer' }); if (await chk.count() && await chk.isEnabled()) await chk.click(); return; }
  const sel = page.locator('#view select.input');
  if (await sel.count()) { const n = await sel.count(); for (let j = 0; j < n; j++) await sel.nth(j).selectOption({ index: 1 }); await page.getByRole('button', { name: 'Check matches' }).click(); return; }
  const ord = page.getByRole('button', { name: 'Check order' });
  if (await ord.count()) { await ord.click(); return; }
  const ta = page.locator('#view textarea[aria-label="Your answer"]');
  if (await ta.count()) { await ta.fill('Test answer'); await page.getByRole('button', { name: 'Reveal model answer' }).click(); const self = page.locator('#view').getByRole('button', { name: /I had the key points/ }); if (await self.count()) await self.first().click(); return; }
  const inp = page.locator('#view .card input.input');
  if (await inp.count()) { await inp.first().fill('x'); await page.getByRole('button', { name: /Check/ }).first().click(); return; }
  throw new Error('Unknown question type on page: ' + (await page.locator('#view .card').first().innerText()).slice(0, 200));
}

test('adaptive practice uses real performance', async (page) => {
  await go(page, '/practice');
  const txt = await page.locator('#view').innerText();
  assert(/practice/i.test(txt), 'practice page');
  await page.getByRole('link', { name: /Start personalised practice/ }).or(page.getByRole('button', { name: /Start personalised practice/ })).first().click();
  await page.waitForTimeout(200);
  await answerCurrent(page);
  const s = await state(page);
  assert(Object.keys(s.answers).length >= 1, 'answer stored for adaptivity');
});

test('case study, comparison lab, diagrams, concept map and mode finder work', async (page) => {
  await go(page, '/cases');
  await page.locator('#view a[href^="#/case/"]').first().click();
  await page.waitForTimeout(200);
  assert((await heading(page)).length > 3, 'case opens');
  await go(page, '/compare');
  assert(await page.locator('#view table, #view .cmp-grid').count() > 0, 'comparison table');
  await go(page, '/diagram/murabaha');
  assert(await page.locator('svg.diagram-svg .edge').count() >= 4, 'diagram edges');
  await page.getByRole('button', { name: 'Next step' }).click();
  assert(await page.locator('svg.diagram-svg .edge.active, svg.diagram-svg .edge.on').count() >= 1, 'step highlighted');
  await go(page, '/concepts');
  assert(await page.locator('svg.cmap').count() === 1, 'concept map svg');
  await go(page, '/concept/riba');
  assert(/Riba/i.test(await heading(page)), 'concept page');
  await go(page, '/finder');
  const choice = page.locator('#view .card button.btn, #view .card .opt').first();
  await choice.click();
  assert(/not a Shariah ruling|not a Shari’ah ruling/i.test(await page.locator('#view').innerText()), 'finder disclaimer');
});

test('bookmarks and notes: create, list, edit, delete', async (page) => {
  await go(page, '/topic/t2.2');
  await page.locator('.lesson-body header').getByRole('button', { name: 'Bookmark' }).click();
  await page.locator('.lesson-body header').getByRole('button', { name: /^Notes/ }).click();
  await page.fill('#note-ta', 'Riba is prohibited in all forms — my note');
  await page.getByRole('button', { name: 'Save note' }).click();
  await page.getByRole('button', { name: 'Close', exact: true }).click();
  await go(page, '/bookmarks');
  assert(await page.locator('#view .list li').count() === 1, 'one bookmark listed');
  await go(page, '/notes');
  assert(/my note/.test(await page.locator('#view').innerText()), 'note listed');
  await page.getByLabel('Search notes').fill('nothing-matches');
  await page.waitForTimeout(250);
  assert(/No matching notes/.test(await page.locator('#view').innerText()), 'note search filters');
});

test('study timer: start, pause, resume, stop', async (page) => {
  await go(page, '/timer');
  await page.getByRole('button', { name: 'Pomodoro · 25 min' }).click();
  await page.waitForTimeout(1200);
  assert(!(await page.locator('#timer-chip').isHidden()), 'top-bar timer chip visible');
  await page.getByRole('button', { name: 'Pause' }).click();
  assert(/Paused/.test(await page.locator('#view').innerText()), 'paused');
  await page.getByRole('button', { name: 'Resume' }).click();
  await page.getByRole('button', { name: 'Stop and log' }).click();
  assert(await page.locator('#timer-chip').isHidden(), 'chip hidden after stop');
});

test('45-minute crash course: start, pause, next, previous, skip, persistence of position', async (page) => {
  await go(page, '/guided/crash45');
  assert(/45:00/.test(await page.locator('.countdown').textContent()), 'countdown 45:00');
  await page.locator('.guided-bar').getByRole('button', { name: /Start/ }).click();
  await page.waitForTimeout(1300);
  assert(!/45:00/.test(await page.locator('.countdown').textContent()), 'countdown running');
  await page.locator('.guided-bar').getByRole('button', { name: /Pause/ }).click();
  await page.getByRole('button', { name: 'Next section', exact: true }).click();
  assert(/Section 2\//.test(await page.locator('.guided-bar').innerText()), 'moved to section 2');
  await page.getByRole('button', { name: 'Previous section' }).click();
  assert(/Section 1\//.test(await page.locator('.guided-bar').innerText()), 'back to section 1');
  await page.getByTitle('Skip this section').click();
  assert(/Section 2\//.test(await page.locator('.guided-bar').innerText()), 'skipped to section 2');
  await page.reload(); await page.waitForSelector('.guided-bar');
  assert(/Section 2\//.test(await page.locator('.guided-bar').innerText()), 'position restored after reload');
  await go(page, '/guided/revision90');
  assert(/1:30:00|90:00/.test(await page.locator('.countdown').textContent()), '90-minute revision loads');
  await go(page, '/guided/deep180');
  assert(/3:00:00|180:00/.test(await page.locator('.countdown').textContent()), '3-hour deep study loads');
});

test('exam centre and answer trainer', async (page) => {
  await go(page, '/exam');
  assert(/Most likely|High priority|Core|Likely/i.test(await page.locator('#view').innerText()), 'exam tiers');
  await go(page, '/exam/trainer');
  await page.locator('#view a[href^="#/exam/trainer?id="]').first().click();
  await page.getByLabel('Your answer').fill('Murabaha is a sale at cost plus a disclosed profit.');
  await page.getByRole('button', { name: 'Reveal expected answer' }).click();
  assert(/Expected answer structure/.test(await page.locator('#view').innerText()), 'expected answer shown');
  assert(await page.getByRole('link', { name: 'Next question' }).count() === 1, 'trainer next');
  await go(page, '/revision-cards');
  assert(await page.locator('.rev-card').count() === 1, 'one revision card shown');
  await page.keyboard.press('ArrowRight');
  assert(/^2 \//.test(await page.locator('#view .tabular').first().textContent()), 'arrow key advances card');
});

test('calculators produce results and are labelled as practice examples', async (page) => {
  await go(page, '/topic/t12.5');
  const txt = await page.locator('#view').innerText();
  if (/Calculation/.test(txt)) assert(/Practice Example|From the textbook|Textbook example/i.test(txt), 'calculator labelled');
  const anyCalc = await page.evaluate(() => { const el = window.IFL.calc('credit-price'); return !!el && el.textContent.length > 20; });
  assert(anyCalc, 'murabaha calculator renders');
});

test('persistence after reload: progress, notes, bookmarks, settings', async (page) => {
  await go(page, '/topic/t1.2');
  await page.getByRole('button', { name: 'Mark complete' }).click();
  await page.locator('.lesson-body header').getByRole('button', { name: 'Bookmark' }).click();
  await page.locator('.lesson-body header').getByRole('button', { name: /^Notes/ }).click();
  await page.fill('#note-ta', 'Persisted note');
  await page.getByRole('button', { name: 'Save note' }).click();
  await page.keyboard.press('Escape');
  await go(page, '/settings');
  await page.getByRole('group', { name: 'Theme' }).getByRole('button', { name: 'Dark' }).click();
  await page.fill('#set-name', 'Ayesha'); await page.press('#set-name', 'Tab');
  await page.getByRole('group', { name: 'Default explanation level' }).getByRole('button', { name: 'Exam' }).click();
  await page.reload(); await page.waitForSelector('#view > *');
  assert(await page.evaluate(() => document.documentElement.dataset.theme) === 'dark', 'dark theme persisted');
  await go(page, '/');
  assert(/Ayesha/.test(await page.locator('#view').innerText()), 'name persisted');
  assert(/1 \/ \d+ topics/.test(await page.locator('#view').innerText()), 'completion persisted');
  await go(page, '/notes'); assert(/Persisted note/.test(await page.locator('#view').innerText()), 'note persisted');
  await go(page, '/bookmarks'); assert(await page.locator('#view .list li').count() === 1, 'bookmark persisted');
  await go(page, '/topic/t1.3');
  assert(await page.getByRole('group', { name: 'Explanation level' }).getByRole('button', { name: 'Exam' }).getAttribute('aria-pressed') === 'true', 'level persisted');
});

test('export, reset (with confirmation) and import restore study data', async (page) => {
  await go(page, '/topic/t4.2');
  await page.getByRole('button', { name: 'Mark complete' }).click();
  await go(page, '/settings');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Export my study data' }).click()]);
  const file = path.join(__dirname, '..', 'test-results', 'export.json');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  await dl.saveAs(file);
  const exported = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert(JSON.stringify(exported).includes('t4.2'), 'export contains progress');
  await page.getByRole('button', { name: 'Reset all progress' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
  assert((await state(page)).topics['t4.2'], 'cancel keeps data');
  await page.getByRole('button', { name: 'Reset all progress' }).click();
  await page.getByRole('button', { name: 'Reset everything' }).click();
  await page.waitForTimeout(200);
  assert(!((await state(page)).topics || {})['t4.2'], 'reset clears progress');
  await go(page, '/settings');
  await page.locator('input[type=file]').setInputFiles(file);
  await page.getByRole('button', { name: 'Import', exact: true }).click();
  await page.waitForTimeout(300);
  assert((await state(page)).topics['t4.2'].completed, 'import restores progress');
  await page.evaluate(() => { try { window.IFL.store.importJSON('{"bad":'); } catch (e) { window.__importErr = e.message; } });
  assert(await page.evaluate(() => !!window.__importErr), 'invalid import rejected gracefully');
});

test('keyboard: "/" focuses search; unknown route shows a friendly error', async (page) => {
  await page.keyboard.press('/');
  assert(await page.evaluate(() => document.activeElement.id) === 'search-input', 'slash focuses search');
  await page.keyboard.press('Escape');
  await go(page, '/topic/does-not-exist');
  const txt = await page.locator('#view').innerText();
  assert(/not found|could not|problem/i.test(txt), 'friendly error for missing topic');
  page.errors.length = 0; // expected handled error may log
});

test('no network requests leave the device', async (page) => {
  const external = [];
  page.on('request', (r) => { if (!/^(file|data|blob):/.test(r.url())) external.push(r.url()); });
  for (const r of ['/', '/chapter/5', '/topic/t5.4.1', '/glossary', '/quiz/run?chapter=5&n=3', '/concepts', '/diagram/sukuk']) await go(page, r);
  assert(external.length === 0, 'external requests: ' + external.join(', '));
});

test('mobile layout: drawer menu, bottom nav, no horizontal scroll', async (page) => {
  for (const r of ['/', '/topic/t9.2', '/flashcards/review?chapter=2', '/compare', '/diagram/ijarah', '/concepts', '/glossary', '/guided/crash45', '/settings']) {
    await go(page, r);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert(over <= 1, 'no horizontal scroll on ' + r + ' (overflow ' + over + 'px)');
  }
  await go(page, '/');
  const menu = page.getByRole('button', { name: 'Open navigation' });
  await menu.click();
  await page.waitForTimeout(250);
  assert(await page.locator('#nav').isVisible(), 'drawer opens');
  await page.screenshot({ path: path.join(SHOTS, 'mobile-menu.png') });
}, { mobile: true });

test('dark mode renders with dark background', async (page) => {
  await page.evaluate(() => { window.IFL.store.update((s) => { s.settings.theme = 'system'; }); window.IFL.applyTheme(); });
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const [r, g, b] = bg.match(/\d+/g).map(Number);
  assert(r + g + b < 150, 'dark background (' + bg + ')');
  for (const [r2, name] of [['/topic/t10.2', 'dark-topic'], ['/diagram/salam', 'dark-diagram'], ['/', 'dark-dashboard']]) { await go(page, r2); await page.screenshot({ path: path.join(SHOTS, name + '.png') }); }
}, { dark: true });

test('screenshots of key pages (desktop)', async (page) => {
  for (const [r, name] of [['/', 'dashboard'], ['/chapter/9', 'chapter'], ['/topic/t9.2', 'topic'], ['/diagram/murabaha', 'diagram'], ['/compare', 'compare'], ['/concepts', 'concept-map'], ['/glossary', 'glossary'], ['/quiz/run?chapter=2&n=3', 'quiz'], ['/guided/crash45', 'crash-course'], ['/progress', 'progress']]) {
    await go(page, r); await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(SHOTS, name + '.png') });
  }
});

test('PWA: manifest and service worker install over http, app loads offline', async (page) => {
  assert(page.url().startsWith('http://'), 'served over http');
  const man = await page.evaluate(() => fetch('manifest.json').then((r) => r.json()));
  assert(man.icons.length >= 3, 'manifest icons');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => navigator.serviceWorker.controller || true);
  await page.reload(); await page.waitForSelector('#view > *');
  await page.context().setOffline(true);
  await page.reload(); await page.waitForSelector('#view > *');
  await go(page, '/chapter/7');
  assert((await heading(page)).length > 3, 'chapter loads offline');
  await page.context().setOffline(false);
}, { http: true });

test('UX flow (Phase 52): dashboard → chapter 1 → topic → complete → Ch 3 Riba → compare → quiz → note → bookmark concept → weak area → flashcards → crash course → dashboard', async (page) => {
  await page.getByRole('link', { name: 'Start Chapter 1' }).first().click();
  await page.waitForFunction(() => location.hash === '#/chapter/1');
  await page.getByRole('link', { name: /Start chapter/i }).first().click();
  await page.waitForSelector('.lesson');
  await page.getByRole('button', { name: 'Mark complete' }).click();
  await page.locator('nav[aria-label="Topic navigation"] a.btn.primary').click();
  await page.waitForSelector('.lesson');
  await go(page, '/chapter/3');
  assert(/Riba/i.test(await page.locator('#view').innerText()), 'chapter 3 mentions Riba');
  await go(page, '/concept/riba');
  await page.locator('#view').getByRole('button', { name: 'Bookmark' }).first().click();
  await go(page, '/compare');
  const pairLink = page.locator('#view a[href*="riba-trade"], #view button:has-text("Riba")').first();
  if (await pairLink.count()) await pairLink.click();
  await go(page, '/quiz/run?chapter=3&n=4');
  for (let i = 0; i < 4; i++) { await answerCurrent(page); await page.getByRole('button', { name: /Next question|See results/ }).click(); }
  await page.waitForSelector('.score-big');
  await go(page, '/topic/t3.2.1');
  await page.locator('.lesson-body header').getByRole('button', { name: /^Notes/ }).click();
  await page.fill('#note-ta', 'Riba: any stipulated increase on a loan.');
  await page.getByRole('button', { name: 'Save note' }).click();
  await page.keyboard.press('Escape');
  await go(page, '/practice');
  assert(/Your weakest areas|Accuracy by chapter/.test(await page.locator('#view').innerText()), 'practice uses answer history');
  await go(page, '/flashcards/review?chapter=3');
  await page.locator('.flash').click(); await page.locator('.grade-bar .btn').nth(2).click();
  await go(page, '/guided/crash45');
  await page.locator('.guided-bar').getByRole('button', { name: /Start/ }).click();
  await page.getByRole('button', { name: 'Next section', exact: true }).click();
  await go(page, '/');
  const txt = await page.locator('#view').innerText();
  assert(/Welcome back/.test(txt), 'returning-student greeting');
  assert(/Continue:/.test(txt), 'continue button offered');
  const s = await state(page);
  assert(Object.values(s.topics).some((t) => t.completed), 'a topic completed');
  assert(s.attempts.length === 1 && s.notes.length === 1 && s.bookmarks.length === 1 && s.reviews.length === 1, 'quiz, note, bookmark and flashcard review all recorded');
});

test('timed mock exam: silent answers, skip and second pass, submit, full review', async (page) => {
  await go(page, '/mock');
  assert(/Timed mock exam/.test(await heading(page)), 'mock setup page');
  await go(page, '/mock/run?n=5&min=10&label=Test%20mock');
  assert(await page.locator('#view [role="timer"]').count() === 1, 'countdown shown');
  // Skip the first question, answer the other four.
  await page.getByRole('button', { name: /Skip for now/ }).click();
  for (let i = 0; i < 4; i++) {
    await answerCurrent(page);
    assert(await page.locator('#view .feedback').count() === 0, 'no feedback during the exam');
    assert(await page.locator('#view .q-card.defer').count() === 1, 'exam mode question');
    await page.getByRole('button', { name: /^Next/ }).click();
  }
  // Second pass returns to the skipped question.
  assert(/Skipped question 1 of 1/.test(await page.locator('#view').innerText()), 'second pass for skipped question');
  await page.getByRole('button', { name: 'Submit exam' }).click();
  await page.locator('.modal').getByRole('button', { name: 'Submit' }).click();
  await page.waitForSelector('.score-big');
  const txt = await page.locator('#view').innerText();
  assert(/1 not answered/.test(txt), 'unanswered counted');
  assert(/By chapter/.test(txt) && /Answer review/.test(txt) && /Correct answer:/.test(txt), 'review with answers');
  const s = await state(page);
  assert(s.attempts[0].mode === 'mock' && s.attempts[0].total === 5 && typeof s.attempts[0].seconds === 'number', 'mock attempt recorded');
});

test('mistakes review lists last-wrong questions and clears when answered correctly', async (page) => {
  await go(page, '/mistakes');
  assert(/No open mistakes/.test(await page.locator('#view').innerText()), 'empty state');
  await page.evaluate(() => window.IFL.questionPool().then((all) => { const q = all.find((x) => x.id === 'q3.1'); window.IFL.progress.recordAnswer(q, false); }));
  await go(page, '/'); await go(page, '/mistakes');
  let txt = await page.locator('#view').innerText();
  assert(/Chapter 3/.test(txt) && /Retry 1 mistake/.test(txt), 'mistake listed');
  await page.evaluate(() => window.IFL.questionPool().then((all) => { const q = all.find((x) => x.id === 'q3.1'); window.IFL.progress.recordAnswer(q, true); }));
  await go(page, '/'); await go(page, '/mistakes');
  assert(/No open mistakes/.test(await page.locator('#view').innerText()), 'mistake cleared');
});

test('printable chapter revision sheet', async (page) => {
  await go(page, '/chapter/5?tab=summary');
  await page.getByRole('link', { name: /Printable revision sheet/ }).click();
  await page.waitForSelector('.print-sheet');
  const n = await page.evaluate(() => window.IFL_DATA.loadChapter(5).then((c) => c.topics.length));
  assert(await page.locator('.print-topic').count() === n, 'every topic on the sheet');
  assert(/Key takeaways/.test(await page.locator('#view').innerText()), 'takeaways');
  await page.emulateMedia({ media: 'print' });
  assert(!(await page.locator('.no-print').first().isVisible()), 'toolbar hidden in print');
  assert(!(await page.locator('.sidebar').isVisible()), 'sidebar hidden in print');
  await page.emulateMedia({ media: 'screen' });
});

test('standalone: the whole app runs from one file (no other file is requested)', async (page) => {
  if (!STANDALONE) return;
  const files = [];
  page.on('request', (r) => files.push(r.url()));
  await page.reload(); await page.waitForSelector('#view > *');
  for (const r of ['/chapter/18', '/topic/t17.4', '/glossary', '/diagram/takaful', '/cases', '/finder', '/guided/deep180']) await go(page, r);
  const others = files.filter((u) => !/^(data|blob):/.test(u) && !u.endsWith(path.basename(STANDALONE)));
  assert(others.length === 0, 'extra files requested: ' + others.join(', '));
  assert(await page.evaluate(() => Object.keys(window.IFL_DATA.chapters).length) === 18, 'all 18 chapters embedded');
});

/* ---------------- Runner ---------------- */
function serve() {
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.pdf': 'application/pdf' };
  const srv = http.createServer((req, res) => {
    const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
    if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(res);
  });
  return new Promise((r) => srv.listen(0, '127.0.0.1', () => r(srv)));
}

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  browser = await pw.chromium.launch();
  const srv = await serve();
  const base = 'http://127.0.0.1:' + srv.address().port + '/index.html';
  let pass = 0, fail = 0;
  for (const t of tests.filter((x) => x.name.includes(filter) && !(STANDALONE && x.opts.http))) {
    const t0 = Date.now();
    let ctx, page;
    try {
      ({ ctx, page } = await open(Object.assign({}, t.opts, t.opts.http ? { url: base } : {})));
      await t.fn(page);
      const errs = page.errors.filter((e) => !/favicon/.test(e));
      if (errs.length) throw new Error('Console/page errors:\n  ' + errs.join('\n  '));
      pass++; console.log('  ✓ ' + t.name + ' (' + (Date.now() - t0) + ' ms)');
    } catch (e) {
      fail++; console.log('  ✗ ' + t.name + '\n      ' + String(e.message).split('\n').slice(0, 6).join('\n      '));
      if (page) await page.screenshot({ path: path.join(SHOTS, 'FAIL-' + t.name.replace(/[^a-z0-9]+/gi, '-').slice(0, 50) + '.png') }).catch(() => {});
    } finally { if (ctx) await ctx.close(); }
  }
  await browser.close(); srv.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})();
