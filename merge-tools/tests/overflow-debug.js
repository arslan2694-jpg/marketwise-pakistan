const { chromium } = require('playwright');
const [file, w, ...routes] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const p = await (await b.newContext({ viewport: { width: +w, height: 740 } })).newPage();
  await p.goto('file://' + file); await p.waitForSelector('#view h1, #view .card');
  for (const r of routes) {
    await p.evaluate(x => { location.hash = x; }, r); await p.waitForTimeout(500);
    const res = await p.evaluate(() => { const de = document.documentElement, out = []; document.querySelectorAll('#view *').forEach(el => { const r = el.getBoundingClientRect(); if (r.width > 0 && r.right > de.clientWidth + 1 && !el.closest('.table-wrap, .diagram-wrap, svg')) out.push([Math.round(r.right), Math.round(r.width), el.tagName + '.' + el.className + ' | ' + (el.textContent || '').trim().slice(0, 40)]); }); return { sw: de.scrollWidth, cw: de.clientWidth, out: out.slice(0, 12) }; });
    console.log(r, JSON.stringify(res, null, 1));
  }
  await b.close();
})();
