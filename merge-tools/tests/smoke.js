'use strict';
/* Quick browser smoke test: opens the merged file over file://, visits routes and reports JS errors. */
const { chromium } = require('playwright');
const file = process.argv[2];
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] }).catch(() => chromium.launch({ args: ['--no-sandbox'] }));
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto('file://' + file);
  await page.waitForSelector('#view h1, #view .card', { timeout: 15000 });
  const routes = ['/', '/learn', '/chapter/9', '/topic/t9.3', '/glossary', '/glossary?tab=acronyms', '/concepts', '/compare', '/finder', '/finder?tool=tree', '/cases', '/case/cs-murabaha-1', '/case/c-salam-wheat', '/flashcards', '/quiz', '/exam', '/exam/trainer', '/revision-cards', '/revision-cards?deck=topics', '/mock', '/guided', '/guided/deep180-chapters', '/planner', '/progress', '/settings', '/search?q=ijara', '/mistakes', '/bookmarks', '/notes', '/timer', '/diagrams', '/practice', '/dashboard', '/exam-prep/trainer/et-1', '/chapter/9/topic/ch9-t4'];
  for (const r of routes) {
    errors.length = 0;
    await page.evaluate(x => { location.hash = x; }, r);
    await page.waitForTimeout(400);
    const h1 = await page.evaluate(() => { const v = document.querySelector('#view'); const h = v && v.querySelector('h1'); return h ? h.textContent : (v ? v.textContent.slice(0, 60) : ''); });
    const bad = await page.evaluate(() => /Something went wrong|Page not found/.test(document.querySelector('#view').textContent));
    console.log((errors.length || bad ? 'FAIL ' : 'ok   ') + r + ' → ' + h1.slice(0, 50) + (errors.length ? '\n     ' + errors.join('\n     ') : '') + (bad ? '\n     (error page)' : ''));
  }
  await browser.close();
})();
