/* Loads playwright from the global install and launches the pre-installed Chromium. */
const path = require('path');
const pw = require('/opt/node22/lib/node_modules/playwright');
async function launch() {
  return pw.chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
}
module.exports = { pw, launch, FILE: 'file://' + path.resolve(__dirname, '..', '..', '..', 'Understanding-Islamic-Finance-MBA-Learning-System.html') };
