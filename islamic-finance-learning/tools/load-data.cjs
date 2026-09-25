// Loads all data/*.js files into a plain object (Node), mirroring the browser registry.
const path = require('path'), fs = require('fs');
module.exports = function loadData(root) {
  const D = { chapters: [], reg: {} };
  global.IFL_DATA = { registerChapter: c => D.chapters.push(c), register: (n, v) => { D.reg[n] = v; } };
  const dir = path.join(root, 'data');
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js') && !['registry.js', 'course-index.js'].includes(f)).sort()) require(path.join(dir, f));
  for (let i = 1; i <= 18; i++) require(path.join(dir, 'chapters', 'ch' + String(i).padStart(2, '0') + '.js'));
  D.chapters.sort((a, b) => a.number - b.number);
  return D;
};
