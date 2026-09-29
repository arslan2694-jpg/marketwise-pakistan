
/* Settings: appearance, study preferences, export / import / reset, privacy and about. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  IFL.route('/settings', function () {
    var s = IFL.store.state.settings;
    function seg(label, key, options, onChange) {
      var g = h('div.seg', { role: 'group', 'aria-label': label }, options.map(function (o) {
        return h('button', { type: 'button', 'aria-pressed': String(s[key] === o[0]), onclick: function () {
          IFL.store.update(function (st) { st.settings[key] = o[0]; });
          Array.prototype.forEach.call(g.children, function (b, i) { b.setAttribute('aria-pressed', String(options[i][0] === o[0])); });
          if (onChange) onChange(o[0]);
        } }, o[1]);
      }));
      return h('div.row.between', { style: { padding: '10px 0', borderBottom: '1px solid var(--border)' } }, h('span', label), g);
    }
    var nameIn = h('input.input', { id: 'set-name', value: s.name || '', placeholder: 'Optional', style: { maxWidth: '240px' }, 'aria-label': 'Your name' });
    nameIn.addEventListener('change', function () { IFL.store.update(function (st) { st.settings.name = nameIn.value.trim().slice(0, 40); }); u.toast('Saved'); });
    var fileIn = h('input', { type: 'file', accept: 'application/json,.json', 'aria-label': 'Choose a study-data file to import', style: { display: 'none' } });
    fileIn.addEventListener('change', function () {
      var f = fileIn.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        u.confirm('Import study data?', 'Exports from this merged app replace the progress, notes and bookmarks on this device. Exports from the original Islamic-Finance-Learning or Understanding-Islamic-Finance apps are converted and merged into your current progress (nothing is lost). File: “' + f.name + '”.', 'Import').then(function (ok) {
          if (!ok) return;
          try { var kind = IFL.store.importJSON(String(rd.result)); IFL.applyTheme(); u.toast(kind === 'v2' ? 'Study data imported' : 'Legacy study data converted and merged'); IFL.go('/'); }
          catch (e) { u.modal({ title: 'Import failed', body: h('p', e.message || 'The file could not be read.'), actions: [{ label: 'OK', primary: true }] }); }
        });
        fileIn.value = '';
      };
      rd.readAsText(f);
    });
    var st = IFL.store.state;
    var size = 0; try { size = (localStorage.getItem(IFL.STORE_KEY) || '').length; } catch (e) { /* ignore */ }
    return h('div', C.pageHead({ eyebrow: 'Settings', title: 'Settings' }),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Appearance'),
        seg('Theme', 'theme', [['light', 'Light'], ['dark', 'Dark'], ['system', 'System']], function () { IFL.applyTheme(); }),
        seg('Text size', 'fontScale', [[0.9, 'Small'], [1, 'Default'], [1.1, 'Large'], [1.2, 'Larger']], function () { IFL.applyTheme(); }),
        seg('Motion', 'reduceMotion', [[false, 'Standard'], [true, 'Reduced']], function () { IFL.applyTheme(); }),
        seg('Sidebar (desktop)', 'sidebarCollapsed', [[false, 'Expanded'], [true, 'Collapsed']], function () { IFL.applyTheme(); })),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Study preferences'),
        seg('Default explanation level', 'level', [['beginner', 'Beginner'], ['mba', 'MBA'], ['exam', 'Exam']]),
        seg('Daily goal', 'dailyGoal', [[15, '15 min'], [30, '30 min'], [45, '45 min'], [60, '60 min']]),
        h('div.row.between', { style: { padding: '10px 0' } }, h('label', { for: 'set-name' }, 'Name shown on the dashboard'), nameIn)),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Your data'),
        h('p.small.text-2', 'All progress, quiz history, flashcard schedules, notes and bookmarks are stored only in this browser (' + Math.round(size / 1024) + ' KB). Nothing is sent to any server.' + (IFL.store.persistent() ? '' : ' Warning: this browser is not allowing storage, so data will be lost when the tab closes.')),
        h('div.row',
          h('button.btn', { type: 'button', onclick: function () { u.download('understanding-islamic-finance-study-data-' + u.dayKey() + '.json', IFL.store.exportJSON()); u.toast('Export downloaded'); } }, u.svg('download'), 'Export my study data'),
          h('button.btn', { type: 'button', onclick: function () { fileIn.click(); } }, u.svg('upload'), 'Import study data'), fileIn,
          h('button.btn.danger', { type: 'button', onclick: function () {
            u.confirm('Reset all progress?', 'This permanently deletes topic completion, quiz history, flashcard schedules, notes, bookmarks, study time and achievements on this device. Consider exporting first. Your appearance settings are kept.', 'Reset everything', true).then(function (ok) { if (ok) { IFL.store.reset(); u.toast('All progress has been reset'); IFL.go('/'); } });
          } }, u.svg('refresh'), 'Reset all progress')),
        h('dl.kv', { style: { marginTop: '14px' } }, h('dt', 'Topics completed'), h('dd', String(IFL.progress.overall().done)), h('dt', 'Quiz attempts'), h('dd', String(st.attempts.length)), h('dt', 'Flashcard reviews'), h('dd', String(IFL.progress.reviewCount())), h('dt', 'Notes'), h('dd', String(st.notes.length)), h('dt', 'Bookmarks'), h('dd', String(st.bookmarks.length)))),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Storage and migration'),
        h('dl.kv', h('dt', 'Storage key'), h('dd', IFL.STORE_KEY + ' (schema version ' + st.version + ')'),
          h('dt', 'Migrated from'), h('dd', (st.migration.from && st.migration.from.length) ? st.migration.from.map(function (k) { return ({ app1: 'Islamic-Finance-Learning (ifl.v1)', app2: 'Understanding-Islamic-Finance (ifl_v1)' })[k] || k; }).join(' + ') : 'No earlier progress was found'),
          h('dt', 'Migrated on'), h('dd', st.migration.at ? new Date(st.migration.at).toLocaleString() : '—')),
        (st.migration.notes || []).length ? h('ul.small', st.migration.notes.map(function (n) { return h('li', n); })) : null,
        h('p.small.muted', 'Earlier progress is read once, converted, and kept alongside the originals — the old storage keys are never modified or deleted.')),
      h('section.card', h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'About this platform'),
        h('p.small', 'Built from Muhammad Ayub, Understanding Islamic Finance (John Wiley & Sons). This edition merges two study platforms built on the same textbook: every chapter, topic write-up, question, flashcard, glossary term, acronym, case, comparison and tool from both is kept. Content is paraphrased and organised for study, with chapter, section and page references; practice cases are labelled as generated. It is an educational aid, not a source of Shari’ah rulings or financial advice.'),
        h('p.small.muted', 'Works offline once loaded. Keyboard: “/” focuses search; in quizzes use A–D or 1–4; in flashcards Space flips and 1–4 grade.')));
  });
})();

