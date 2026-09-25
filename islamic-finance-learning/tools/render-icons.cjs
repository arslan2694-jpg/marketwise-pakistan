/* Renders assets/icons/icon.svg to the PNG sizes listed in manifest.json (uses Playwright + Chromium). */
const path = require('path'), fs = require('fs');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
(async () => {
  const root = path.join(__dirname, '..');
  const svg = fs.readFileSync(path.join(root, 'assets/icons/icon.svg'), 'utf8');
  const browser = await pw.chromium.launch();
  for (const size of [192, 512]) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent('<html><body style="margin:0;background:transparent">' + svg.replace('<svg ', '<svg width="' + size + '" height="' + size + '" ') + '</body></html>');
    await page.screenshot({ path: path.join(root, 'assets/icons/icon-' + size + '.png'), omitBackground: true });
    await page.close();
  }
  await browser.close();
  console.log('Icons written');
})();
