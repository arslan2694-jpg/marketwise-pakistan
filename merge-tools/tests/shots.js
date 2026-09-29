const { chromium } = require('playwright');
const [file, outDir, ...rest] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const w = Number(process.env.W || 1280), hgt = Number(process.env.H || 900);
  const ctx = await browser.newContext({ viewport: { width: w, height: hgt } });
  const page = await ctx.newPage();
  await page.goto('file://' + file);
  await page.waitForSelector('#view h1, #view .card');
  for (const r of rest) {
    await page.evaluate(x => { location.hash = x; }, r);
    await page.waitForTimeout(600);
    const name = r.replace(/[^a-z0-9]+/gi, '_');
    await page.screenshot({ path: `${outDir}/${w}_${name}.png`, fullPage: false });
  }
  await browser.close();
})();
