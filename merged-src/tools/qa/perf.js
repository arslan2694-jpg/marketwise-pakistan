const { launch, FILE } = require('./pw');
(async () => {
  const b = await launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const page = await ctx.newPage();
  const t0 = Date.now(); await page.goto(FILE); await page.waitForSelector('#view h1'); const firstRender = Date.now() - t0;
  const nav = await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; return { dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), transfer: n.transferSize }; });
  const r = await page.evaluate(async () => {
    const out = {}; const t = (k, f) => { const s = performance.now(); f(); out[k] = Math.round(performance.now() - s); };
    let s0 = performance.now(); await IFL.searchIndex(); out.searchIndexBuildMs = Math.round(performance.now() - s0);
    t('searchQueryMs', () => IFL.searchQuery('murabaha'));
    const route = async (k, h) => { const s = performance.now(); location.hash = '#' + h; await new Promise(r => setTimeout(r, 0)); await new Promise(r => setTimeout(r, 30)); out[k] = Math.round(performance.now() - s - 30); };
    await route('topicPageMs', '/topic/t9.8.3'); await route('modesPageMs', '/modes'); await route('glossaryMs', '/glossary'); await route('conceptMapMs', '/concepts'); await route('searchPageMs', '/search?q=riba');
    out.heapMB = performance.memory ? +(performance.memory.usedJSHeapSize / 1048576).toFixed(1) : null; out.domNodes = document.getElementsByTagName('*').length;
    return out;
  });
  const res = Object.assign({ firstRenderMs: firstRender, bytes: require('fs').statSync(FILE.replace('file://', '')).size }, nav, r);
  console.log(JSON.stringify(res, null, 1)); require('fs').writeFileSync(__dirname + '/perf-result.json', JSON.stringify(res, null, 1)); await b.close();
})();
