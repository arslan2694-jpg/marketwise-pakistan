/* Study timer: Pomodoro (25), 45, 60 or custom minutes. Runs across pages; sessions are recorded. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var T = { running: false, end: 0, left: 0, total: 0, kind: '' };
  var chip = function () { return document.getElementById('timer-chip'); };
  var iv = null;
  function tick() {
    if (!T.running) return;
    T.left = Math.max(0, Math.round((T.end - Date.now()) / 1000));
    var c = chip(); if (c) { c.hidden = false; c.textContent = u.clock(T.left); }
    if (IFL.timerView) IFL.timerView();
    if (T.left <= 0) complete();
  }
  function start(minutes, kind) {
    T.total = minutes * 60; T.left = T.total; T.end = Date.now() + T.total * 1000; T.running = true; T.kind = kind || minutes + ' min';
    clearInterval(iv); iv = setInterval(tick, 1000); tick();
  }
  function pause() { if (!T.running) return; T.running = false; T.left = Math.max(0, Math.round((T.end - Date.now()) / 1000)); clearInterval(iv); if (IFL.timerView) IFL.timerView(); }
  function resume() { if (T.running || !T.left) return; T.end = Date.now() + T.left * 1000; T.running = true; clearInterval(iv); iv = setInterval(tick, 1000); tick(); }
  function stop(record) {
    var studied = T.total - T.left;
    if (record && studied >= 60) IFL.store.update(function (s) { s.timerSessions.unshift({ ts: Date.now(), minutes: Math.round(studied / 60), kind: T.kind, completed: T.left === 0 }); if (s.timerSessions.length > 300) s.timerSessions.length = 300; });
    T.running = false; T.left = 0; T.total = 0; clearInterval(iv);
    var c = chip(); if (c) c.hidden = true;
    if (IFL.timerView) IFL.timerView();
  }
  function complete() {
    stop(true);
    u.toast('Timer finished — well done. Take a short break.', 5000);
    try { if (window.Notification && Notification.permission === 'granted') new Notification('Study timer finished'); } catch (e) { /* ignore */ }
  }
  IFL.timer = { start: start, pause: pause, resume: resume, stop: stop, state: T };

  IFL.route('/timer', function (ctx) {
    var face = h('div.timer-face', { role: 'timer', 'aria-live': 'off' });
    var status = h('p.small.muted', { style: { textAlign: 'center' } });
    var controls = h('div.row', { style: { justifyContent: 'center' } });
    var custom = h('input.input', { type: 'number', min: 1, max: 240, value: 30, style: { width: '90px' }, 'aria-label': 'Custom minutes' });
    IFL.timerView = function () {
      face.textContent = u.clock(T.total ? T.left : 0);
      status.textContent = T.total ? (T.running ? 'Running — ' + T.kind : 'Paused — ' + T.kind) : 'Choose a session length to start.';
      controls.innerHTML = '';
      if (T.total) {
        controls.appendChild(T.running ? h('button.btn.primary', { type: 'button', onclick: pause }, u.svg('pause'), 'Pause') : h('button.btn.primary', { type: 'button', onclick: resume }, u.svg('play'), 'Resume'));
        controls.appendChild(h('button.btn', { type: 'button', onclick: function () { stop(true); } }, 'Stop and log'));
      }
    };
    ctx.onLeave(function () { IFL.timerView = null; });
    var s = IFL.store.state, today = u.dayKey();
    var sessions = s.timerSessions.slice(0, 10);
    var qToday = 0; Object.keys(s.answers).forEach(function (k) { if (s.answers[k].last && u.dayKey(new Date(s.answers[k].last)) === today) qToday++; });
    var topicsToday = Object.keys(s.topics).filter(function (k) { return s.topics[k].lastSeen && u.dayKey(new Date(s.topics[k].lastSeen)) === today; }).length;
    IFL.timerView();
    return h('div', C.pageHead({ eyebrow: 'Tools', title: 'Study timer', desc: 'The timer keeps running while you move around the app; the remaining time shows in the top bar.' }),
      h('div.card', { style: { maxWidth: '640px', margin: '0 auto' } }, face, status, controls,
        h('hr'),
        h('div.row', { style: { justifyContent: 'center' } },
          h('button.btn', { type: 'button', onclick: function () { start(25, 'Pomodoro 25'); } }, 'Pomodoro · 25 min'),
          h('button.btn', { type: 'button', onclick: function () { start(45, '45-minute session'); } }, '45 min'),
          h('button.btn', { type: 'button', onclick: function () { start(60, '60-minute session'); } }, '60 min'),
          h('span.row', custom, h('button.btn', { type: 'button', onclick: function () { var m = Math.max(1, Math.min(240, Number(custom.value) || 30)); start(m, 'Custom ' + m + ' min'); } }, 'Custom')))),
      h('div.grid.grid-4', { style: { marginTop: '16px' } },
        h('div.card', C.stat(u.fmtDuration(IFL.progress.studySeconds()), 'Total study time')), h('div.card', C.stat(s.timerSessions.length, 'Timer sessions')),
        h('div.card', C.stat(topicsToday, 'Topics studied today')), h('div.card', C.stat(qToday, 'Questions answered today'))),
      h('section.card', { style: { marginTop: '16px' } }, h('h2', { style: { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' } }, 'Recent sessions'),
        sessions.length ? h('ul.list', sessions.map(function (x) { return h('li.small', x.kind + ' — ' + x.minutes + ' min ' + (x.completed ? '(completed)' : '(stopped)') + ' · ' + u.ago(x.ts)); })) : h('p.muted.small', 'No timer sessions yet.')));
  });
})();
