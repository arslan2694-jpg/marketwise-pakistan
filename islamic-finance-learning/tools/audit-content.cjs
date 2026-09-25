/* Content audit: checks lesson depth and consistency across all chapters and prints a summary.
   Flags topics whose levels are empty or identical, with no source pages, or with very thin content. */
const path = require('path');
const { chapters, reg } = require('./load-data.cjs')(path.join(__dirname, '..'));
const issues = [], stats = { topics: 0, withExamples: 0, withDefinitions: 0, withConfusions: 0, withDistinctions: 0, withDebate: 0, withCalc: 0, words: 0 };
const words = (s) => (Array.isArray(s) ? s.join(' ') : s || '').split(/\s+/).filter(Boolean).length;
chapters.forEach((ch) => ch.topics.forEach((t) => {
  stats.topics++;
  const w = words(t.simple) + words(t.academic) + words(t.exam) + words(t.keyPoints);
  stats.words += w;
  ['withExamples:examples', 'withDefinitions:definitions', 'withConfusions:confusions', 'withDistinctions:distinctions', 'withDebate:debate'].forEach((x) => { const [k, f] = x.split(':'); if (t[f] && t[f].length) stats[k]++; });
  if (t.calc) stats.withCalc++;
  const where = 'Ch ' + ch.number + ' ' + t.id;
  if (!t.simple || !t.exam || !t.intuition) issues.push(where + ': a level is empty');
  if (t.simple && t.exam && t.simple.trim() === t.exam.trim()) issues.push(where + ': Beginner and Exam text identical');
  if (t.academic && t.academic[0] === t.simple) issues.push(where + ': MBA text repeats Beginner text');
  if (!t.pages || !t.pages.length) issues.push(where + ': no source pages');
  if (w < 60) issues.push(where + ': thin content (' + w + ' words)');
  if (!t.quickCheck) issues.push(where + ': no quick check');
}));
console.log('Topics', stats.topics, '· words of lesson text', stats.words, '· avg', Math.round(stats.words / stats.topics));
console.log('Examples', stats.withExamples, '· Definitions', stats.withDefinitions, '· Distinctions', stats.withDistinctions, '· Confusions', stats.withConfusions, '· Debates', stats.withDebate, '· Calculators', stats.withCalc);
console.log('Glossary', reg.glossary.length, '· Concepts', reg.concepts.length, '· Diagrams', Object.keys(reg.diagrams).length || reg.diagrams.length, '· Cases', (reg.cases || []).length);
console.log(issues.length ? issues.length + ' issue(s):\n  ' + issues.join('\n  ') : 'No content issues found.');
process.exit(issues.filter((i) => !/thin content/.test(i)).length ? 1 : 0);
