#!/usr/bin/env node
// Builds source/terminology-index.json and source/concept-index.json from data/.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const D = require('./load-data.cjs')(root), R = D.reg;
const T = {}; D.chapters.forEach(c => c.topics.forEach(t => T[t.id] = { t, c }));
const ref = id => { const x = T[id]; return x ? { topic: id, chapter: x.c.number, section: x.t.section, title: x.t.title, pages: x.t.pages } : null; };

const terms = {};
const add = (term, entry) => { const k = term.trim(); (terms[k] = terms[k] || []).push(entry); };
R.glossary.forEach(g => add(g.term, Object.assign({ source: 'glossary', category: g.cat, page: g.page || null }, g.topic ? ref(g.topic) : {})));
D.chapters.forEach(c => c.topics.forEach(t => (t.definitions || []).forEach(d => add(d.term, Object.assign({ source: 'chapter' }, ref(t.id))))));
const termIndex = Object.keys(terms).sort((a, b) => a.localeCompare(b)).map(k => ({ term: k, occurrences: terms[k] }));

const conceptIndex = R.concepts.map(c => {
  const tagged = [];
  D.chapters.forEach(ch => ch.topics.forEach(t => { if ((t.concepts || []).some(k => c.tags.includes(k))) tagged.push(t.id); }));
  return { id: c.id, name: c.name, group: c.group, primaryTopics: c.topics.map(ref), taggedTopics: tagged.map(ref), links: c.links };
});

fs.writeFileSync(path.join(root, 'source', 'terminology-index.json'), JSON.stringify({ generated: 'tools/build-indexes.cjs', count: termIndex.length, terms: termIndex }, null, 1));
fs.writeFileSync(path.join(root, 'source', 'concept-index.json'), JSON.stringify({ generated: 'tools/build-indexes.cjs', count: conceptIndex.length, concepts: conceptIndex }, null, 1));
console.log('terms', termIndex.length, 'concepts', conceptIndex.length);
