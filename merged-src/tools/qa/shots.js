const { launch, FILE } = require('./pw');
const OUT = process.argv[2];
const pages = JSON.parse(process.argv[3]);
const w = Number(process.argv[4] || 1280), theme = process.argv[5] || 'light';
(async () => {
  const b = await launch();
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, colorScheme: theme });
  const page = await ctx.newPage();
  await page.goto(FILE); await page.waitForTimeout(400);
  for (const [name, hash] of pages) {
    await page.evaluate(h => { location.hash = '#' + h; }, hash); await page.waitForTimeout(400);
    await page.screenshot({ path: OUT + '/' + name + '-' + w + '-' + theme + '.png', fullPage: false });
  }
  await b.close();
})();
