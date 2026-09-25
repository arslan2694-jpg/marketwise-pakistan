/* Guided study modes: 45-min crash course / 90-min revision / 3-hour deep
 * study, each driven by data/study-modes.js segments, with a countdown,
 * pause/resume, skip/prev/next and a closing rapid-fire quiz. Also hosts
 * "Teach Me" mode: a step-by-step guided walkthrough of a single topic. */
(function () {
  "use strict";
  var esc = IFLDom.esc, fmt = IFLDom.formatText;

  function segmentBody(seg) {
    var parts = [];
    if (seg.summary) parts.push('<p>' + fmt(seg.summary) + '</p>');
    (seg.chapters || []).forEach(function (chNum) {
      var chapter = IFLData.getChapter(chNum);
      if (!chapter) return;
      parts.push('<div class="card-row mb-2"><span><strong>Ch ' + chNum + ':</strong> ' + esc(chapter.title) + '</span><button class="btn btn-sm btn-outline" data-nav="#/chapter/' + chNum + '">Open chapter →</button></div>');
    });
    if (seg.comparisons) parts.push('<button class="btn btn-outline btn-sm" data-nav="#/comparisons">Open Comparison Lab →</button>');
    if (seg.quiz) parts.push('<div id="segment-quiz-host"></div>');
    return parts.join("");
  }

  function runMode(modeKey) {
    var modes = IFLData.studyModes();
    var mode = modes[modeKey];
    var root = IFLRouter.outlet();
    if (!mode) { root.innerHTML = '<div class="empty-state"><h3>This study mode is still being generated</h3></div>'; return; }

    var state = { i: 0, paused: false, remaining: mode.totalMinutes * 60, timerHandle: null };

    function paint() {
      var seg = mode.segments[state.i];
      var pct = Math.round((state.i / mode.segments.length) * 100);
      root.innerHTML =
        '<div class="section-header"><h1>' + esc(mode.title) + '</h1><span class="pill pill-brand" id="countdown">' + IFLDom.formatDuration(state.remaining) + ' left</span></div>' +
        '<div class="progress-track mb-4"><span class="progress-fill" style="width:' + pct + '%"></span></div>' +
        '<div class="card mb-4">' +
          '<span class="pill mb-2" style="display:inline-block;">Segment ' + (state.i + 1) + ' / ' + mode.segments.length + ' · ' + seg.startMin + '–' + seg.endMin + ' min</span>' +
          '<h2>' + esc(seg.label) + '</h2>' +
          segmentBody(seg) +
        '</div>' +
        '<div class="flex items-center justify-between">' +
          '<button class="btn btn-outline" id="sm-prev" ' + (state.i === 0 ? "disabled" : "") + '>← Previous</button>' +
          '<button class="btn btn-outline" id="sm-pause">' + (state.paused ? "▶ Resume" : "⏸ Pause") + '</button>' +
          '<button class="btn btn-primary" id="sm-next">' + (state.i + 1 < mode.segments.length ? "Next →" : "Finish") + '</button>' +
        '</div>';

      if (seg.quiz) {
        var host = document.getElementById("segment-quiz-host");
        var qs = IFLData.allQuestions().slice().sort(function () { return Math.random() - 0.5; }).slice(0, 5);
        var btn = document.createElement("button");
        btn.className = "btn btn-primary btn-sm mt-2";
        btn.textContent = "Start Rapid-Fire Quiz (" + qs.length + " questions)";
        btn.addEventListener("click", function () { window.IFLQuizRunner(qs); });
        host.appendChild(btn);
      }

      document.getElementById("sm-prev").addEventListener("click", function () { state.i = Math.max(0, state.i - 1); paint(); });
      document.getElementById("sm-next").addEventListener("click", function () {
        if (state.i + 1 >= mode.segments.length) {
          IFLStore.update(function (s) {
            s.progress.crashCourseProgress[modeKey] = { stepIndex: state.i, completedAt: Date.now() };
          });
          IFLProgress.checkAchievements();
          stopTimer();
          root.innerHTML = '<div class="empty-state"><h3>' + esc(mode.title) + ' complete 🎉</h3><p>Nice work — consider reviewing your weak topics next.</p>' +
            '<div class="badge-row" style="justify-content:center;"><button class="btn btn-primary" data-nav="#/adaptive">Adaptive Practice</button><button class="btn btn-outline" data-nav="#/dashboard">Dashboard</button></div></div>';
          return;
        }
        state.i += 1;
        IFLStore.update(function (s) { s.progress.crashCourseProgress[modeKey] = { stepIndex: state.i, completedAt: null }; });
        paint();
      });
      document.getElementById("sm-pause").addEventListener("click", function () {
        state.paused = !state.paused;
        paint();
      });
    }

    function stopTimer() { if (state.timerHandle) clearInterval(state.timerHandle); }
    stopTimer();
    state.timerHandle = setInterval(function () {
      if (state.paused) return;
      state.remaining = Math.max(0, state.remaining - 1);
      var el = document.getElementById("countdown");
      if (el) el.textContent = IFLDom.formatDuration(state.remaining) + " left";
      if (!IFLRouter.outlet().contains(document.getElementById("countdown"))) stopTimer();
    }, 1000);

    paint();
  }

  IFLRouter.register("/crash-course/:mins", function (params) { runMode(params.mins); });

  // ---- Teach Me mode: sequential guided walkthrough of one topic ----
  function teachMe(params) {
    var root = IFLRouter.outlet();
    var topic = IFLData.getTopic(params.topicId);
    var chapter = topic ? IFLData.getChapter(Number((params.topicId.match(/^ch(\d+)-/) || [])[1])) : null;
    if (!topic) { root.innerHTML = '<div class="empty-state"><h3>Topic not found</h3></div>'; return; }

    var steps = [
      { title: "What is this concept trying to solve?", body: topic.overview || topic.simpleExplanation },
      { title: "Core Definition", body: (topic.definitions && topic.definitions[0]) ? ("<strong>" + esc(topic.definitions[0].term) + ":</strong> " + esc(topic.definitions[0].definition)) : topic.simpleExplanation },
      { title: "Structure", body: (topic.processSteps && topic.processSteps.length) ? topic.processSteps.map(function(s){return "• "+s;}).join("<br>") : (topic.principles || []).join("<br>") || topic.academicExplanation },
      { title: "Conditions", body: (topic.conditions || []).map(function (c) { return "• " + esc(c); }).join("<br>") || "No specific conditions listed for this topic." },
      { title: "Example", body: (topic.examples && topic.examples[0]) ? esc(topic.examples[0].body) : "No worked example available for this topic." },
      { title: "What makes it different?", body: (topic.importantDistinctions || []).map(function (c) { return "• " + esc(c); }).join("<br>") || "See Related Concepts on the topic page." },
      { title: "Common mistake", body: (topic.commonConfusions || [])[0] ? esc(topic.commonConfusions[0]) : "No common confusion flagged for this topic." },
      { title: "Exam answer", body: topic.examExplanation || topic.academicExplanation }
    ];
    var i = 0;
    function paint() {
      var step = steps[i];
      root.innerHTML =
        '<nav class="text-sm text-muted mb-3"><a data-nav="#/chapter/' + chapter.chapterNumber + '/topic/' + topic.id + '">' + esc(topic.title) + '</a> › Teach Me</nav>' +
        '<div class="section-header"><h1>Teach Me: ' + esc(topic.title) + '</h1><span class="text-sm text-muted">' + (i + 1) + ' / ' + steps.length + '</span></div>' +
        '<div class="progress-track mb-4"><span class="progress-fill" style="width:' + Math.round(((i) / (steps.length - 1)) * 100) + '%"></span></div>' +
        '<div class="card" style="min-height:180px;"><h3>' + esc(step.title) + '</h3><p class="mb-0">' + (step.body || "") + '</p></div>' +
        '<div class="flex items-center justify-between mt-4">' +
          '<button class="btn btn-outline" id="tm-prev" ' + (i === 0 ? "disabled" : "") + '>← Back</button>' +
          '<button class="btn btn-primary" id="tm-next">' + (i + 1 < steps.length ? "Next →" : "Done — back to topic") + '</button>' +
        '</div>';
      document.getElementById("tm-prev").addEventListener("click", function () { i = Math.max(0, i - 1); paint(); });
      document.getElementById("tm-next").addEventListener("click", function () {
        if (i + 1 >= steps.length) { IFLRouter.navigate("#/chapter/" + chapter.chapterNumber + "/topic/" + topic.id); return; }
        i += 1; paint();
      });
    }
    paint();
  }

  IFLRouter.register("/teach/:topicId", teachMe);
})();
