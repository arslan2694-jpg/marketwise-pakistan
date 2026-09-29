/* Sources: the textbook's structure (parts, chapters, sections, printed and PDF pages, appendices and
   back matter) mapped to the course content, plus what is source-derived versus generated for learning. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var H2 = { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' };
  var BACK = { acronyms: 'Acronyms and abbreviations', glossary: 'Glossary', bibliographyEnglish: 'Bibliography (English)', bibliographyArabicUrdu: 'Bibliography (Arabic / Urdu)', suggestedFurtherReadings: 'Suggested further readings', index: 'Index' };

  function topicsFor(sec) {
    var num = String(sec.sectionNumber);
    return IFL.data.topics.filter(function (t) { return t.section === num || t.section.indexOf(num + '.') === 0; });
  }
  IFL.route('/sources', function (ctx) {
    var B = IFL.data.bookIndex, book = IFL_DATA.courseIndex.book, ch = Number(ctx.query.chapter) || 0;
    var chapters = B.chapters.filter(function (c) { return !ch || c.chapterNumber === ch; });
    var tabs = h('div.row', { style: { marginBottom: '12px' } }, [h('a.chip', { href: '#/sources', 'aria-pressed': String(!ch) }, 'All chapters')].concat(B.chapters.map(function (c) { return h('a.chip', { href: '#/sources?chapter=' + c.chapterNumber, 'aria-pressed': String(ch === c.chapterNumber) }, 'Ch ' + c.chapterNumber); })));
    var counts = { topics: IFL.data.topics.length, supplements: IFL.data.topics.reduce(function (s, t) { return s + t.supplements.length; }, 0), questions: IFL.data.questions.length, flashcards: IFL.data.flashcards.length, cases: IFL.data.cases.length };
    return h('div',
      C.pageHead({ eyebrow: 'Reference', title: 'Sources and page map', desc: 'All course content is derived from ' + book.title + ' by ' + book.author + ' (' + book.publisher + '). Printed page numbers are the book’s own; add ' + book.pdfPageOffset + ' for the PDF page. The platform paraphrases and cites; it does not reproduce the book’s text.' }),
      h('section.card', h('h2', { style: H2 }, 'How content is labelled'),
        h('ul.small',
          h('li', h('span.badge.accent', 'Textbook case / figures'), ' — uses the book’s own case or numbers.'),
          h('li', h('span.badge.gold', 'Practice — generated for learning'), ' — written to apply the book’s rules to new facts; never presented as a quotation.'),
          h('li', h('span.badge.info', 'Educational scenario'), ' — a scenario applying the textbook framework, with a textbook-based answer.'),
          h('li', h('span.badge', 'Extended notes'), ' — a second, independently written treatment of a section (' + counts.supplements + ' sections), kept in addition to the main lesson.'),
          h('li', 'Every topic, question, flashcard and case carries its chapter, section and printed page where the sources give them; nothing is invented when a source gives no page.')),
        h('p.small.muted', counts.topics + ' topics · ' + counts.supplements + ' extended-notes sections · ' + counts.questions + ' questions · ' + counts.flashcards + ' flashcards · ' + counts.cases + ' case studies.')),
      h('section.card', h('h2', { style: H2 }, 'Parts'), h('ul.list', B.parts.map(function (p) { return h('li', h('strong', 'Part ' + p.part + ' — ' + p.title), ' · chapters ' + p.chapters[0] + '–' + p.chapters[p.chapters.length - 1] + ' · from p. ' + p.startPage); }))),
      tabs,
      chapters.map(function (c) {
        return h('section.card', { id: 'src-ch' + c.chapterNumber },
          h('div.row.between', h('h2', { style: H2 }, 'Chapter ' + c.chapterNumber + ' · ' + c.title), h('span.small.muted', 'p. ' + c.startPage + ' (PDF ' + c.startPdfPage + ')')),
          h('div.table-wrap', h('table', h('caption', 'Sections of Chapter ' + c.chapterNumber), h('thead', h('tr', h('th', { scope: 'col' }, 'Section'), h('th', { scope: 'col' }, 'Title'), h('th', { scope: 'col' }, 'Page'), h('th', { scope: 'col' }, 'PDF'), h('th', { scope: 'col' }, 'Lesson'))),
            h('tbody', c.sections.map(function (s) {
              var ts = topicsFor(s);
              return h('tr', h('th', { scope: 'row' }, s.sectionNumber), h('td', s.title, s.subsections && s.subsections.length ? h('div.small.muted', s.subsections.map(function (x) { return x.sectionNumber + ' ' + x.title; }).join(' · ')) : null), h('td.tabular', s.page), h('td.tabular', s.pdfPage), h('td', ts.length ? h('a', { href: '#/topic/' + ts[0].id }, ts.length > 1 ? ts.length + ' topics' : 'Open') : h('span.muted', '—')));
            })))));
      }),
      !ch ? h('section.card', h('h2', { style: H2 }, 'Appendices and back matter'),
        h('ul.list', B.appendices.map(function (a) { return h('li', a.title, h('span.muted.small', ' · p. ' + a.page + ' (PDF ' + a.pdfPage + ')')); }).concat(Object.keys(B.backMatter).map(function (k) { return h('li', BACK[k] || k, h('span.muted.small', ' · p. ' + B.backMatter[k].page + ' (PDF ' + B.backMatter[k].pdfPage + ')')); })))) : null);
  });
})();
