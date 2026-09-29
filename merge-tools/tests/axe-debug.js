const { chromium } = require('playwright');
const [file, axe, scheme, ...routes] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
  const p = await ctx.newPage(); await p.goto('file://' + file); await p.waitForSelector('#view h1, #view .card'); await p.addScriptTag({ path: axe });
  await p.evaluate(s => { window.IFL.store.update(st => { st.settings.theme = s; }); window.IFL.applyTheme(); }, scheme);
  const agg = {};
  for (const r of routes) {
    await p.evaluate(x => { location.hash = x; }, r); await p.waitForTimeout(500);
    const res = await p.evaluate(async () => { const r = await axe.run(document, { runOnly: { type: 'rule', values: ['color-contrast', 'aria-allowed-attr', 'aria-required-children', 'aria-required-parent', 'nested-interactive', 'label', 'button-name', 'link-name', 'list', 'listitem', 'aria-valid-attr-value', 'scrollable-region-focusable', 'heading-order'] } }); return r.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.slice(0, 4).map(n => ({ t: n.target.join(' '), s: (n.any[0] && n.any[0].message) || (n.all[0] && n.all[0].message) || n.failureSummary.slice(0, 200) })) })); });
    res.forEach(v => v.nodes.forEach(n => { const k = v.id + ' | ' + n.s.slice(0, 190); (agg[k] = agg[k] || { n: 0, ex: [] }).n++; if (agg[k].ex.length < 2) agg[k].ex.push(r + ' ' + n.t); }));
  }
  Object.entries(agg).sort((a, b) => b[1].n - a[1].n).slice(0, 25).forEach(([k, v]) => console.log(v.n + ' × ' + k + '\n      e.g. ' + v.ex.join(' ; ')));
  await b.close();
})();
