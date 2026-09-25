/* Study Timer: Pomodoro (25 min), 45-min and 60-min sessions, plus a custom
 * timer. Tracks total study time, sessions completed, topics studied and
 * questions answered (the latter two pulled from real progress data). */
(function () {
  "use strict";
  var PRESETS = [["25", "Pomodoro · 25 min", 25], ["45", "Focus · 45 min", 45], ["60", "Deep Work · 60 min", 60]];

  function render() {
    var root = IFLRouter.outlet();
    var s = IFLStore.get();
    var state = { seconds: 25 * 60, running: false, handle: null, totalForSession: 25 * 60 };

    function paint() {
      var mins = Math.floor(state.seconds / 60);
      var secs = state.seconds % 60;
      var pct = Math.round(((state.totalForSession - state.seconds) / state.totalForSession) * 100);
      root.innerHTML =
        '<div class="section-header"><h1>Study Timer</h1></div>' +
        '<div class="grid-2">' +
          '<div class="card text-center">' +
            '<div class="badge-row mb-4" style="justify-content:center;">' +
              PRESETS.map(function (p) { return '<button class="btn btn-outline btn-sm" data-preset="' + p[2] + '">' + p[1] + '</button>'; }).join("") +
            '</div>' +
            '<div class="ring-progress mb-4" style="width:220px;height:220px;margin:0 auto;">' +
              '<svg width="220" height="220"><circle cx="110" cy="110" r="100" stroke="var(--color-border)" stroke-width="14" fill="none"/>' +
              '<circle cx="110" cy="110" r="100" stroke="var(--color-brand)" stroke-width="14" fill="none" stroke-dasharray="' + (2 * Math.PI * 100) + '" stroke-dashoffset="' + ((2 * Math.PI * 100) * (1 - pct / 100)) + '" stroke-linecap="round"/></svg>' +
              '<span class="ring-progress-label" style="font-size:2.2rem;">' + mins + ':' + String(secs).padStart(2, "0") + '</span>' +
            '</div>' +
            '<div class="flex-col gap-2" style="max-width:280px;margin:0 auto;">' +
              '<label>Custom minutes</label>' +
              '<input type="number" id="custom-mins" min="1" max="240" value="25">' +
              '<button class="btn btn-outline btn-sm mt-1" id="set-custom">Set Custom Timer</button>' +
            '</div>' +
            '<div class="badge-row mt-4" style="justify-content:center;">' +
              '<button class="btn btn-primary" id="start-pause">' + (state.running ? "Pause" : "Start") + '</button>' +
              '<button class="btn btn-outline" id="reset-timer">Reset</button>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<h3>Your Study Stats</h3>' +
            '<div class="card-grid">' +
              '<div class="stat-tile"><span class="stat-value">' + IFLDom.formatDuration(s.progress.studySeconds) + '</span><span class="stat-label">Total study time</span></div>' +
              '<div class="stat-tile"><span class="stat-value">' + s.progress.sessionsCompleted + '</span><span class="stat-label">Sessions completed</span></div>' +
              '<div class="stat-tile"><span class="stat-value">' + Object.keys(s.progress.topicsCompleted).length + '</span><span class="stat-label">Topics studied</span></div>' +
              '<div class="stat-tile"><span class="stat-value">' + s.progress.quizAttempts.reduce(function (a, q) { return a + q.total; }, 0) + '</span><span class="stat-label">Questions answered</span></div>' +
            '</div>' +
          '</div>' +
        '</div>';

      IFLDom.qsa("[data-preset]", root).forEach(function (btn) {
        btn.addEventListener("click", function () {
          stop();
          var mins = Number(btn.getAttribute("data-preset"));
          state.seconds = mins * 60; state.totalForSession = mins * 60;
          paint();
        });
      });
      document.getElementById("set-custom").addEventListener("click", function () {
        var mins = Math.max(1, Math.min(240, Number(document.getElementById("custom-mins").value) || 25));
        stop();
        state.seconds = mins * 60; state.totalForSession = mins * 60;
        paint();
      });
      document.getElementById("reset-timer").addEventListener("click", function () {
        stop();
        state.seconds = state.totalForSession;
        paint();
      });
      document.getElementById("start-pause").addEventListener("click", function () {
        if (state.running) { stop(); } else { start(); }
        paint();
      });
    }

    function tickUI() {
      var mins = Math.floor(state.seconds / 60);
      var secs = state.seconds % 60;
      var label = document.querySelector(".ring-progress-label");
      if (label) label.textContent = mins + ":" + String(secs).padStart(2, "0");
      var circle = document.querySelectorAll(".ring-progress circle")[1];
      if (circle) {
        var pct = (state.totalForSession - state.seconds) / state.totalForSession;
        circle.setAttribute("stroke-dashoffset", (2 * Math.PI * 100) * (1 - pct));
      }
    }

    function start() {
      state.running = true;
      state.handle = setInterval(function () {
        state.seconds -= 1;
        IFLProgress.addStudySeconds(1);
        if (state.seconds <= 0) {
          stop();
          IFLStore.update(function (st) { st.progress.sessionsCompleted += 1; });
          IFLDom.toast("Session complete! Great work.");
          state.seconds = state.totalForSession;
          paint();
          return;
        }
        tickUI();
      }, 1000);
    }
    function stop() {
      state.running = false;
      if (state.handle) clearInterval(state.handle);
      state.handle = null;
    }

    paint();
  }

  IFLRouter.register("/timer", render);
})();
