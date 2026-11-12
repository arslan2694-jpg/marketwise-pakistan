/* Loads playwright from the global install and launches the pre-installed Chromium. */
const path = require('path');
let pw; try { pw = require('playwright'); } catch (e) { pw = require('/opt/node22/lib/node_modules/playwright'); }
async function launch() {
  /* use Playwright's own bundled browser; fall back to an explicit path via PW_CHROMIUM */
  const opt = { args: ['--no-sandbox'] };
  if (process.env.PW_CHROMIUM) opt.executablePath = process.env.PW_CHROMIUM;
  return pw.chromium.launch(opt);
}
module.exports = { pw, launch, FILE: 'file://' + path.resolve(__dirname, '..', '..', '..', 'Understanding-Islamic-Finance-MBA-Learning-System.html') };
