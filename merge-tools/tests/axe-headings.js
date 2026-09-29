const { chromium } = require('playwright');
const [file, axe, ...routes] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] }); const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await p.goto('file://' + file); await p.waitForSelector('#view h1, #view .card'); await p.addScriptTag({ path: axe });
  for (const r of routes) { await p.evaluate(x => { location.hash = x; }, r); await p.waitForTimeout(450);
    const res = await p.evaluate(async () => (await axe.run(document, { runOnly: { type: 'rule', values: ['heading-order'] } })).violations.flatMap(v => v.nodes.map(n => n.target.join(' ') + ' :: ' + n.html.slice(0, 80)))); if (res.length) console.log(r, res); }
  await b.close();
})();
