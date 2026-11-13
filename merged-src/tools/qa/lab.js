/* QA for the Practice Lab companion build: every page renders, no link leaves the lab, the three games,
   diagrams, numericals and calculators work, own storage key, no overflow on a phone. */
const path = require('path');
const { launch } = require('./pw');
const FILE = 'file://' + path.resolve(__dirname, '..', '..', '..', 'Islamic-Finance-Practice-Lab.html');
const results = []; const ok = (n, c, x) => { results.push({ name: n, ok: !!c, extra: x }); console.log(c ? 'ok  ' : 'FAIL', n, c ? '' : JSON.stringify(x)); };
(async () => {
  const b = await launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const page = await ctx.newPage();
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const reqs = []; page.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:')) reqs.push(r.url()); });
  const go = async (h, w = 120) => { await page.evaluate(x => { location.hash = '#' + x; }, h); await page.waitForTimeout(w); };
  await page.goto(FILE); await page.waitForTimeout(400);
  ok('home renders with four section tiles and five nav entries', await page.locator('#view .play-card').count() === 4 && await page.locator('#nav a').count() === 5);
  const routes = await page.evaluate(() => ['/', '/diagrams', '/play', '/play/build', '/play/match', '/play/sort', '/play/sort?by=family', '/numericals', '/tools']
    .concat(IFL.data.diagrams.map(d => '/diagram/' + d.id), IFL.data.diagrams.map(d => '/play/build?id=' + d.id), IFL.numericals.map(g => '/numericals?p=' + g.id + (g.book ? '&s=book' : '')), IFL.numericals.map(g => '/numericals?p=' + g.id + '&s=3'), Object.keys(IFL.calcTypes).map(k => '/tools?tool=' + k)));
  const bad = [], dead = new Set(); const LOCAL = /^#\/($|\?|diagrams|diagram\/|play|numericals|tools)/;
  for (const r of routes) {
    await go(r, 60);
    const st = await page.evaluate(() => ({ t: document.getElementById('view').textContent, links: [...document.querySelectorAll('#view a[href^="#/"]')].map(a => a.getAttribute('href')), h1: !!document.querySelector('#view h1') }));
    if (/Something went wrong|Page not found/.test(st.t) || !st.h1 || st.t.length < 60) bad.push(r);
    st.links.forEach(l => { if (!LOCAL.test(l)) dead.add(r + ' -> ' + l); });
  }
  ok('all ' + routes.length + ' lab pages render', bad.length === 0, bad);
  ok('no link points to a page outside the lab', dead.size === 0, [...dead].slice(0, 8));
  /* every in-lab link target resolves */
  const targets = new Set(); for (const r of ['/', '/diagrams', '/play', '/play/build', '/numericals', '/tools']) { await go(r, 60); (await page.evaluate(() => [...document.querySelectorAll('a[href^="#/"]')].map(a => a.getAttribute('href').slice(1)))).forEach(t => targets.add(t)); }
  const broken = []; for (const t of targets) { await go(t, 40); if (await page.evaluate(() => /Page not found|Something went wrong/.test(document.getElementById('view').textContent))) broken.push(t); }
  ok('all ' + targets.size + ' distinct internal links resolve', broken.length === 0, broken);

  await go('/diagram/murabaha', 300); await page.click('#view button:has-text("Play")'); await page.waitForTimeout(2900);
  ok('diagram plays', await page.evaluate(() => /Step [2-9] of/.test(document.querySelector('#view .card.sunk').textContent) && !!document.querySelector('#view .token')));
  await go('/play/build?id=murabaha', 200);
  for (const l of await page.evaluate(() => IFL.data.diagram('murabaha').steps.map(s => s.label))) await page.click('#view .build-pool button:has-text("' + l + '") >> nth=0');
  await page.click('#view button:has-text("Check sequence")'); await page.waitForTimeout(150);
  ok('build-the-deal solves and stores the score', await page.evaluate(() => IFL.store.state.games.build.murabaha.best === 100 && !!document.querySelector('#view .diagram-svg')));
  await go('/play/match', 200);
  const pairs = await page.evaluate(() => [...document.querySelectorAll('#view .match-item.term')].map(b => { const g = IFL.data.glossary.find(x => x.term === b.textContent); return [g.term, g.definition]; }));
  for (const [t, d] of pairs) await page.evaluate(([t, d]) => { [...document.querySelectorAll('#view .match-item.term')].find(b => b.textContent === t).click(); [...document.querySelectorAll('#view .match-col')[1].children].find(b => b.textContent === d).click(); }, [t, d]);
  ok('term match completes', await page.evaluate(() => document.querySelectorAll('#view .match-item.matched').length === 12));
  await go('/play/sort', 200);
  for (let i = 0; i < 8; i++) { await page.evaluate(() => { const m = IFL.data.modes.find(x => x.name === document.querySelector('#view .sort-name').textContent); [...document.querySelectorAll('#view .sort-bucket')].find(b => b.dataset.b === m.returnType).click(); }); await page.click('#view .sort-card .btn.primary'); await page.waitForTimeout(30); }
  ok('sort game scores 8 of 8', await page.evaluate(() => /8 of 8 correct/.test(document.getElementById('view').textContent)));
  await go('/tools?tool=dm-schedule', 200);
  ok('calculator shows textbook figure, sliders and chart', await page.evaluate(() => /11,333.33/.test(document.getElementById('tool-panel').textContent) && document.querySelectorAll('#tool-panel .calc-range').length === 4 && !!document.querySelector('#tool-panel svg.viz-line')));
  const np = await page.evaluate(() => IFL.numericals[0].id); await go('/numericals?p=' + np, 200);
  ok('numerical problem panel opens', await page.locator('#num-panel').count() === 1);
  ok('lab keeps its own record and leaves the main app’s keys alone', await page.evaluate(() => { IFL.store.flush(); return !!localStorage.getItem('ifl.lab.v3') && localStorage.getItem('ifl.v3') === null && JSON.parse(localStorage.getItem('ifl.lab.v3')).games.build.murabaha.best === 100; }));
  await page.reload(); await page.waitForTimeout(400);
  ok('scores persist after reload', await page.evaluate(() => IFL.store.state.games.build.murabaha.best === 100));
  await page.click('#theme-btn'); await page.click('#theme-btn');
  ok('theme switch works', await page.evaluate(() => ['light', 'dark'].includes(document.documentElement.getAttribute('data-theme'))));
  await page.setViewportSize({ width: 390, height: 800 }); const over = [];
  for (const r of ['/', '/diagrams', '/diagram/murabaha', '/play', '/play/build?id=salam', '/play/match', '/play/sort', '/numericals', '/numericals?p=' + np, '/tools', '/tools?tool=dm-schedule']) { await go(r, 200); if (await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)) over.push(r); }
  ok('no horizontal overflow at 390px', over.length === 0, over);
  const html = require('fs').readFileSync(FILE.slice(7), 'utf8');
  ok('single offline file: no external resources or network requests', reqs.length === 0 && !/<script[^>]*\ssrc=|<link[^>]+href="(?!data:)/.test(html), reqs.slice(0, 3));
  ok('file size under 1 MB (' + (html.length / 1048576).toFixed(2) + ' MB)', html.length < 1048576);
  ok('no JS errors', errs.length === 0, errs.slice(0, 5));
  const failed = results.filter(r => !r.ok); console.log('checks:', results.length, 'failed:', failed.length);
  require('fs').writeFileSync(__dirname + '/lab-result.json', JSON.stringify(results, null, 1));
  await b.close(); process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
