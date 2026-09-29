/* Visits every route and every record page in the built app; reports JS errors and error views. */
const { launch, FILE } = require('./pw');
(async () => {
  const b = await launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  let cur = '', errs = [];
  page.on('pageerror', e => errs.push({ route: cur, msg: 'pageerror: ' + e.message }));
  page.on('console', m => { if (m.type() === 'error') errs.push({ route: cur, msg: 'console.error: ' + m.text() }); });
  await page.goto(FILE); await page.waitForTimeout(500);
  const ids = await page.evaluate(() => {
    const D = IFL.data;
    return {
      topics: D.topics.map(t => t.id), chapters: D.chapterNums, cases: D.cases.map(c => c.id), modes: D.modes.map(m => m.id), products: D.products.map(p => p.id),
      diagrams: D.diagrams.map(d => d.id), concepts: D.concepts.map(c => c.id), comparisons: D.comparisons.map(c => c.id), exam: D.exam.map(e => e.id),
      numericals: Object.keys(IFL.numericalDefs), calcs: Object.keys(IFL.calcTypes), plans: Object.keys(D.plans), glossary: D.glossary.slice(0, 40).map(g => g.id)
    };
  });
  const routes = ['/', '/learn', '/learn/part-i', '/learn/part-ii', '/learn/part-iii', '/concepts', '/concepts?view=flow', '/glossary', '/glossary?tab=acronyms', '/quiz', '/practice', '/practice/run', '/flashcards', '/flashcards/review?scope=all', '/flashcards/review?scope=due', '/mistakes',
    '/modes', '/products', '/products/map', '/products/compare', '/products/finder', '/products/quiz', '/diagrams', '/cases', '/compare', '/finder', '/finder?path=purpose', '/numericals', '/tools', '/exam', '/exam/trainer', '/revision-cards', '/mock', '/planner', '/guided', '/timer',
    '/sources', '/search?q=murabaha', '/search?q=takaful', '/search?q=riba', '/bookmarks', '/notes', '/progress', '/settings', '/quiz/run?n=8', '/mock/run?n=10&min=10', '/no-such-route'];
  ids.topics.forEach(t => { routes.push('/topic/' + t); });
  [1, 5, 9, 12, 15].forEach(t => routes.push('/teach/t' + (t === 9 ? '9.3' : t === 12 ? '12.3.4' : t === 15 ? '15.3.5' : t === 1 ? '1.5' : '5.6')));
  ids.chapters.forEach(n => ['overview', 'topics', 'aids', 'practice', 'summary'].forEach(tab => routes.push('/chapter/' + n + '?tab=' + tab)));
  ids.chapters.forEach(n => routes.push('/chapter/' + n + '/print', '/quiz/run?chapter=' + n, '/flashcards/review?chapter=' + n, '/exam?s=short&chapter=' + n));
  ids.cases.forEach(c => routes.push('/case/' + c)); ids.modes.forEach(m => routes.push('/mode/' + m)); ids.products.forEach(p => routes.push('/product/' + p, '/products/quiz?id=' + p));
  ids.diagrams.forEach(d => routes.push('/diagram/' + d)); ids.concepts.forEach(c => routes.push('/concept/' + c)); ids.comparisons.forEach(c => routes.push('/compare?id=' + c));
  ids.exam.forEach(e => routes.push('/exam/trainer?id=' + e)); ids.numericals.forEach(n => routes.push('/numericals?p=' + n, '/numericals?p=' + n + '&s=book'));
  ids.calcs.forEach(c => routes.push('/tools?tool=' + c)); ids.plans.forEach(p => routes.push('/guided/' + p));
  ['overview', 'definitions', 'short', 'long', 'answer-plan', 'conceptual', 'difference', 'scenario', 'mcq', 'viva', 'rapid', 'core'].forEach(s => routes.push('/exam?s=' + s));
  ids.glossary.forEach(g => routes.push('/glossary?term=' + encodeURIComponent(g)));
  const bad = []; const links = new Set();
  for (const r of routes) {
    cur = r; const before = errs.length;
    await page.evaluate(h => { location.hash = '#' + h; }, r);
    await page.waitForTimeout(25);
    const txt = await page.evaluate(() => { const v = document.getElementById('view'); return { len: v.textContent.length, wrong: /Something went wrong/.test(v.textContent), nf: /Page not found/.test(v.textContent), h1: (v.querySelector('h1') || {}).textContent }; });
    if (txt.wrong || (txt.nf && r !== '/no-such-route') || txt.len < 40 || errs.length > before) bad.push({ r, txt, errs: errs.slice(before).map(e => e.msg) });
    (await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="#/"]')).map(a => a.getAttribute('href').slice(1)))).forEach(h => links.add(h));
  }
  /* broken-link audit: every internal link found on every page must resolve to a real view */
  const seen = new Set(routes); const brokenLinks = []; let checked = 0;
  for (const l of links) {
    if (seen.has(l)) continue; seen.add(l); checked++; cur = l; const before = errs.length;
    await page.evaluate(h => { location.hash = '#' + h; }, l); await page.waitForTimeout(20);
    const t = await page.evaluate(() => { const v = document.getElementById('view'); return { wrong: /Something went wrong/.test(v.textContent), nf: /Page not found/.test(v.textContent), len: v.textContent.length }; });
    if (t.wrong || t.nf || t.len < 40 || errs.length > before) brokenLinks.push({ l, t, errs: errs.slice(before).map(e => e.msg).slice(0, 1) });
  }
  console.log('unique internal links found:', links.size, 'extra links visited:', checked, 'broken:', brokenLinks.length);
  brokenLinks.slice(0, 25).forEach(x => console.log('  BROKEN', JSON.stringify(x)));
  require('fs').writeFileSync(__dirname + '/crawl-result.json', JSON.stringify({ routes: routes.length, problems: bad.length, uniqueLinks: links.size, extraLinksVisited: checked, brokenLinks: brokenLinks.length, errors: errs.length }, null, 1));
  console.log('routes visited:', routes.length, 'problems:', bad.length);
  bad.slice(0, 60).forEach(x => console.log(JSON.stringify(x)));
  console.log('total console/page errors:', errs.length);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
