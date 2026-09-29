/* Section-number utilities: the two source apps cite the same textbook, F1 with fine-grained
   topics (e.g. 9.8.3) and F2 with coarser ranges (e.g. "9.8-9.8.2"). This maps any section
   citation onto canonical F1-granularity topic ids. */
'use strict';
function toks(s) {
  // first / last dotted numbers in a citation like "9.8-9.8.2", "8.5.3 (cont.)", "17.4.3-A", "8.8.3 (Box 8.3)"
  const str = String(s == null ? '' : s).replace(/\(.*?\)/g, ' ');
  const nums = str.match(/\d+(?:\.\d+)*/g) || [];
  return nums;
}
function cmp(a, b) {
  const x = a.split('.').map(Number), y = b.split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] === undefined ? -1 : x[i]) - (y[i] === undefined ? -1 : y[i]);
    if (d) return d;
  }
  return 0;
}
function range(s) {
  const nums = toks(s);
  if (!nums.length) return null;
  return { start: nums[0], end: nums[nums.length - 1] };
}
/* topicsOf: ordered array of {id, section, title}. Returns {primary, covers[]} or null. */
function resolve(sectionCitation, chapter, topicsOf) {
  const r = range(sectionCitation);
  const list = topicsOf(chapter);
  if (!list || !list.length) return null;
  if (!r) return { primary: list[0].id, covers: [list[0].id], how: 'chapter-first' };
  const within = (sec) => cmp(sec, r.start) >= 0 && (cmp(sec, r.end) <= 0 || sec.indexOf(r.end + '.') === 0);
  const inRange = list.filter(t => /^\d/.test(t.section) && within(t.section));
  if (inRange.length) return { primary: inRange[0].id, covers: inRange.map(t => t.id), how: 'range' };
  // ancestor section (9.9.7 -> 9.9), else nearest preceding topic
  const parts = r.start.split('.');
  for (let n = parts.length - 1; n >= 2; n--) {
    const anc = parts.slice(0, n).join('.');
    const hit = list.filter(t => t.section === anc);
    if (hit.length) return { primary: hit[0].id, covers: hit.map(t => t.id), how: 'ancestor' };
  }
  let best = null;
  for (const t of list) { if (/^\d/.test(t.section) && cmp(t.section, r.start) <= 0) best = t; }
  if (best) return { primary: best.id, covers: [best.id], how: 'preceding' };
  return { primary: list[0].id, covers: [list[0].id], how: 'chapter-first' };
}
module.exports = { toks, cmp, range, resolve };
