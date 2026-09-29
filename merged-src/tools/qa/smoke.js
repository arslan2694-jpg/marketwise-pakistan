const { launch, FILE } = require('./pw');
(async () => {
  const b = await launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
  await page.goto(FILE);
  await page.waitForTimeout(800);
  console.log('title:', await page.title());
  console.log('h1:', await page.locator('h1').first().textContent());
  console.log('errors:', errs);
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
