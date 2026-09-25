/* Prints a compact brief of one chapter's current content (for authors): topics, gaps, existing items. */
const n = Number(process.argv[2]);
const { chapters } = require('./load-data.cjs')(require('path').join(__dirname, '..'));
const c = chapters.find((x) => x.number === n);
console.log('Chapter', n, c.title, c.pages.join('–'));
c.topics.forEach((t) => {
  const has = ['examples', 'definitions', 'confusions', 'distinctions', 'steps', 'conditions'].filter((k) => t[k] && t[k].length).map((k) => k.slice(0, 4));
  const w = [t.simple, (t.academic || []).join(' ')].join(' ').split(/\s+/).length;
  console.log(' ', t.id, '[' + t.pages.join('-') + ']', t.tier, w + 'w', has.join(','), '—', t.title);
});
console.log('Questions:'); c.questions.forEach((q) => console.log('  ' + q.id, q.type, q.topic, '|', q.q.slice(0, 90)));
console.log('Flashcards:'); c.flashcards.forEach((f) => console.log('  ' + f.id, f.topic, '|', f.front.slice(0, 70)));
console.log('Exam:'); c.exam.forEach((e) => console.log('  ' + e.id, e.kind, e.topic, '|', e.q.slice(0, 90)));
