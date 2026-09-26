/* Chapter learning experience: chapter overview + individual topic pages,
 * with Beginner/MBA/Exam explanation levels, transaction diagrams, source
 * citations, notes, bookmarks, and completion tracking. */
(function () {
  "use strict";
  var el = IFLDom.el, esc = IFLDom.esc, fmt = IFLDom.formatText;

  var CALCULATOR_LINKS = {
    "ch8-t4": { href: "#/calculators/deposit-pool", label: "Try it yourself: Deposit Pool Calculator →" },
    "ch9-t14": { href: "#/calculators/murabaha-pricing", label: "Try it yourself: Murabaha/Musawamah Pricing Calculator →" },
    "ch12-t7": { href: "#/calculators/musharakah-split", label: "Try it yourself: Musharakah Profit & Loss Split Calculator →" },
    "ch10-t11": { href: "#/calculators/salam-discount", label: "Try it yourself: Salam Price-Discount Calculator →" },
    "ch15-t6": { href: "#/calculators/sukuk-return", label: "Try it yourself: Sukuk Periodic Return Calculator →" }
  };

  function sourceFooter(source, chapterTitle) {
    if (!source) return "";
    var pages = (source.pages || []).join(", ");
    return '<div class="source-footer"><span class="icon">📖</span> Source: <em>Understanding Islamic Finance</em>' +
      (chapterTitle ? ", Chapter " + source.chapter + " — " + esc(chapterTitle) : ", Chapter " + source.chapter) +
      (source.section ? ", Section " + esc(source.section) : "") +
      (pages ? ", p. " + esc(pages) : "") + '</div>';
  }

  function bookmarkButton(type, refId, label) {
    var bookmarks = IFLStore.get().bookmarks;
    var existing = bookmarks.find(function (b) { return b.type === type && b.refId === refId; });
    var btn = el("button", { class: "btn btn-sm " + (existing ? "btn-primary" : "btn-outline") }, [existing ? "🔖 Bookmarked" : "🔖 Bookmark"]);
    btn.addEventListener("click", function () {
      var s = IFLStore.get();
      var already = s.bookmarks.find(function (b) { return b.type === type && b.refId === refId; });
      IFLStore.update(function (st) {
        if (already) {
          st.bookmarks = st.bookmarks.filter(function (b) { return !(b.type === type && b.refId === refId); });
        } else {
          st.bookmarks.push({ id: "bm-" + Date.now(), type: type, refId: refId, label: label, createdAt: Date.now() });
        }
      });
      IFLDom.toast(already ? "Bookmark removed" : "Bookmarked");
      btn.replaceWith(bookmarkButton(type, refId, label));
    });
    return btn;
  }

  // ---- Chapter overview ----
  function renderChapter(params) {
    var root = IFLRouter.outlet();
    var num = Number(params.num);
    var chapter = IFLData.getChapter(num);
    if (!chapter) {
      root.innerHTML = '<div class="empty-state"><h3>Chapter content loading…</h3><p>If this persists, the chapter data file may not have finished generating yet.</p><button class="btn btn-primary" data-nav="#/learn">Back to Learn</button></div>';
      return;
    }
    IFLProgress.visitChapter(num);
    var progress = IFLData.chapterTopicProgress(num);
    var quizAvg = IFLData.chapterQuizAverage(num);
    var allChapters = IFLData.allChapters();
    var idx = allChapters.findIndex(function (c) { return c.chapterNumber === num; });
    var prevCh = idx > 0 ? allChapters[idx - 1] : null;
    var nextCh = idx < allChapters.length - 1 ? allChapters[idx + 1] : null;
    var completed = IFLStore.get().progress.topicsCompleted;

    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/learn">Learn</a> › Part ' + esc(chapter.part) + ' › Chapter ' + chapter.chapterNumber + '</nav>' +
      '<div class="card mb-4">' +
        '<div class="flex items-center justify-between" style="flex-wrap:wrap;gap:var(--sp-3);">' +
          '<div>' +
            '<span class="pill pill-brand mb-2" style="display:inline-block;">Chapter ' + chapter.chapterNumber + ' of 18</span>' +
            '<h1 class="mb-1">' + esc(chapter.title) + '</h1>' +
            '<div class="badge-row text-sm text-muted">' +
              '<span>~' + (chapter.estimatedMinutes || 30) + ' min</span>·' +
              '<span>' + esc(chapter.difficulty || "intermediate") + '</span>·' +
              '<span>' + progress.total + ' topics</span>' +
            '</div>' +
          '</div>' +
          '<div style="min-width:160px;">' +
            '<div class="progress-track mb-1"><span class="progress-fill" style="width:' + progress.pct + '%"></span></div>' +
            '<div class="text-xs text-muted text-center">' + progress.done + '/' + progress.total + ' topics (' + progress.pct + '%)</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      (chapter.learningObjectives && chapter.learningObjectives.length ?
        '<div class="card mb-4"><h3>Learning Objectives</h3><ul>' + chapter.learningObjectives.map(function (o) { return "<li>" + fmt(o) + "</li>"; }).join("") + '</ul></div>' : "") +

      (chapter.whyItMatters ? '<div class="callout"><div class="callout-title">Why This Chapter Matters</div><p class="mb-0">' + fmt(chapter.whyItMatters) + '</p></div>' : "") +

      '<h3 class="mt-6">Topics</h3>' +
      '<div class="flex-col gap-2 mb-4">' +
        (chapter.topics || []).map(function (t, i) {
          var done = !!completed[t.id];
          return '<button class="card card-clickable card-row" data-nav="#/chapter/' + num + '/topic/' + t.id + '">' +
            '<span class="flex items-center gap-3"><span class="pill ' + (done ? "pill-success" : "pill") + '" style="min-width:26px;text-align:center;">' + (done ? "✓" : (i + 1)) + '</span>' +
            '<span><strong>' + esc(t.title) + '</strong><br><small class="text-muted">' + esc(t.sectionNumber || "") + (t.overview ? " — " + esc(t.overview.slice(0, 80)) : "") + '</small></span></span>' +
            '<span class="badge-row">' +
              '<span class="pill ' + IFLDom.pillClassForExamRelevance(t.examRelevance) + '">' + esc(t.examRelevance || "") + '</span>' +
              '<span class="pill ' + IFLDom.pillClassForLevel(t.difficulty) + '">' + esc(t.difficulty || "") + '</span>' +
            '</span>' +
          '</button>';
        }).join("") +
      '</div>' +

      (chapter.chapterSummary ? '<div class="card mb-4"><h3>Chapter Summary</h3><p class="mb-0">' + fmt(chapter.chapterSummary) + '</p></div>' : "") +
      (chapter.keyTakeaways && chapter.keyTakeaways.length ?
        '<div class="card mb-4"><h3>Key Takeaways</h3><ul class="mb-0">' + chapter.keyTakeaways.map(function (k) { return "<li>" + fmt(k) + "</li>"; }).join("") + '</ul></div>' : "") +

      '<div class="card mb-4" style="background:var(--color-brand-soft);border-color:var(--color-brand);">' +
        '<div class="section-header mb-0"><div><strong>Ready to test yourself?</strong></div>' +
        '<div class="badge-row">' +
          '<button class="btn btn-outline btn-sm" data-nav="#/flashcards?chapter=' + num + '">Flashcards</button>' +
          '<button class="btn btn-primary btn-sm" data-nav="#/quiz/chapter/' + num + '">Chapter Quiz' + (quizAvg != null ? " (avg " + quizAvg + "%)" : "") + '</button>' +
        '</div></div>' +
      '</div>' +

      '<div class="flex items-center justify-between mt-6">' +
        (prevCh ? '<button class="btn btn-outline" data-nav="#/chapter/' + prevCh.chapterNumber + '">← Ch ' + prevCh.chapterNumber + ': ' + esc(IFLDom.truncate(prevCh.title, 34)) + '</button>' : '<span></span>') +
        (nextCh ? '<button class="btn btn-outline" data-nav="#/chapter/' + nextCh.chapterNumber + '">Ch ' + nextCh.chapterNumber + ': ' + esc(IFLDom.truncate(nextCh.title, 34)) + ' →</button>' : '<span></span>') +
      '</div>';
  }

  // ---- Topic detail ----
  var LEVELS = [
    { key: "beginner", label: "Simple", field: "simpleExplanation" },
    { key: "mba", label: "MBA", field: "academicExplanation" },
    { key: "exam", label: "Exam", field: "examExplanation" }
  ];

  function renderTopic(params) {
    var root = IFLRouter.outlet();
    var num = Number(params.num);
    var chapter = IFLData.getChapter(num);
    var topic = IFLData.getTopic(params.topicId);
    if (!chapter || !topic) {
      root.innerHTML = '<div class="empty-state"><h3>Topic not found</h3><button class="btn btn-primary" data-nav="#/chapter/' + num + '">Back to chapter</button></div>';
      return;
    }
    var topics = chapter.topics || [];
    var idx = topics.findIndex(function (t) { return t.id === topic.id; });
    var prevT = idx > 0 ? topics[idx - 1] : null;
    var nextT = idx < topics.length - 1 ? topics[idx + 1] : null;
    var level = IFLStore.get().settings.explanationLevel || "beginner";
    var isDone = !!IFLStore.get().progress.topicsCompleted[topic.id];

    var container = el("div", {});
    container.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/learn">Learn</a> › <a data-nav="#/chapter/' + num + '">Ch ' + num + '</a> › ' + esc(topic.title) + '</nav>' +
      '<div class="section-header">' +
        '<div>' +
          '<span class="badge-row mb-2">' +
            '<span class="pill pill-brand">' + esc(topic.sectionNumber || "") + '</span>' +
            '<span class="pill ' + IFLDom.pillClassForExamRelevance(topic.examRelevance) + '">' + esc(topic.examRelevance || "") + '</span>' +
            '<span class="pill ' + IFLDom.pillClassForLevel(topic.difficulty) + '">' + esc(topic.difficulty || "") + '</span>' +
          '</span>' +
          '<h1 class="mb-0">' + esc(topic.title) + '</h1>' +
        '</div>' +
        '<div class="badge-row" id="topic-actions"><button class="btn btn-outline btn-sm" data-nav="#/teach/' + esc(topic.id) + '">🎓 Teach Me</button></div>' +
      '</div>' +
      (topic.overview ? '<p class="text-secondary">' + fmt(topic.overview) + '</p>' : "") +

      '<div class="card mb-4">' +
        '<div class="flex items-center justify-between mb-3"><h3 class="mb-0">Explanation</h3>' +
        '<div class="level-switch" id="level-switch">' + LEVELS.map(function (l) {
          return '<button data-level="' + l.key + '" class="' + (l.key === level ? "active" : "") + '">' + l.label + '</button>';
        }).join("") + '</div></div>' +
        '<div id="explanation-body"></div>' +
      '</div>' +

      (topic.keyPoints && topic.keyPoints.length ? '<div class="card mb-4"><h3>Key Points</h3><ul class="mb-0">' + topic.keyPoints.map(function (k) { return "<li>" + fmt(k) + "</li>"; }).join("") + '</ul></div>' : "") +

      (topic.definitions && topic.definitions.length ?
        '<div class="card mb-4"><h3>Definitions</h3>' + topic.definitions.map(function (d) {
          return '<div class="mb-3"><strong>' + esc(d.term) + '</strong><p class="text-sm mb-0">' + fmt(d.definition) + '</p></div>';
        }).join("") + '</div>' : "") +

      (topic.conditions && topic.conditions.length ?
        '<div class="card mb-4"><h3>Conditions</h3><ul class="mb-0">' + topic.conditions.map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ul></div>' : "") +

      (topic.principles && topic.principles.length ?
        '<div class="card mb-4"><h3>Principles</h3><ul class="mb-0">' + topic.principles.map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ul></div>' : "") +

      (topic.processSteps && topic.processSteps.length ?
        '<div class="card mb-4"><h3>Process</h3><ol class="mb-0">' + topic.processSteps.map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ol></div>' : "") +

      (topic.transactionSteps && topic.transactionSteps.length ?
        '<div class="card mb-4" id="tx-diagram-host"><h3>Transaction Structure</h3><p class="text-sm text-muted">Click any step in the flow to see its explanation.</p>' +
        '<div class="tx-flow" id="tx-flow"></div>' +
        '<div class="tx-detail" id="tx-detail"></div></div>' : "") +

      (topic.examples && topic.examples.length ?
        '<div class="card mb-4"><h3>Examples</h3>' + topic.examples.map(function (ex) {
          return '<div class="callout ' + (ex.generated ? "callout-note" : "callout-info") + ' mb-2">' +
            '<div class="callout-title">' + (ex.generated ? "🧮 Practice Example — generated for learning" : "📘 " + esc(ex.title || "From the textbook")) + '</div>' +
            (ex.generated && ex.title ? '<p class="text-sm mb-1"><em>' + esc(ex.title) + '</em></p>' : "") +
            '<p class="mb-0">' + fmt(ex.body) + '</p></div>';
        }).join("") + '</div>' : "") +

      (topic.calculations && topic.calculations.length ?
        '<div class="card mb-4"><h3>Calculation Walkthrough</h3>' + topic.calculations.map(function (calc) {
          return '<div class="calc-block mb-3">' +
            '<div class="flex items-center justify-between mb-2">' +
              '<strong>' + esc(calc.title) + '</strong>' +
              (calc.generated ? '<span class="pill pill-brand">Practice — generated for learning</span>' : "") +
            '</div>' +
            (calc.formula ? '<div class="calc-formula">' + esc(calc.formula) + '</div>' : "") +
            (calc.inputs && calc.inputs.length ?
              '<table class="calc-inputs mb-2"><tbody>' + calc.inputs.map(function (i) {
                return '<tr><td class="text-muted">' + esc(i.label) + '</td><td><strong>' + esc(i.value) + '</strong></td></tr>';
              }).join("") + '</tbody></table>' : "") +
            (calc.steps && calc.steps.length ?
              '<ol class="calc-steps mb-2">' + calc.steps.map(function (s) { return "<li>" + fmt(s) + "</li>"; }).join("") + '</ol>' : "") +
            (calc.result ? '<div class="calc-result"><strong>Result:</strong> ' + fmt(calc.result) + '</div>' : "") +
            (calc.interpretation ? '<p class="text-sm text-secondary mt-2 mb-0">' + fmt(calc.interpretation) + '</p>' : "") +
          '</div>';
        }).join("") +
        (CALCULATOR_LINKS[topic.id] ? '<button class="btn btn-primary btn-sm" data-nav="' + CALCULATOR_LINKS[topic.id].href + '">' + esc(CALCULATOR_LINKS[topic.id].label) + '</button>' : "") +
        '</div>' : "") +

      (topic.importantDistinctions && topic.importantDistinctions.length ?
        '<div class="card mb-4"><h3>Important Distinctions</h3><ul class="mb-0">' + topic.importantDistinctions.map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ul></div>' : "") +

      (topic.commonConfusions && topic.commonConfusions.length ?
        '<div class="callout callout-warning mb-4"><div class="callout-title">⚠️ Common Confusions</div><ul class="mb-0">' + topic.commonConfusions.map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ul></div>' : "") +

      (topic.issue || topic.criticism ? renderCriticismBlock(topic) : "") +

      (topic.relatedConcepts && topic.relatedConcepts.length ?
        '<div class="mb-4"><strong class="text-sm">Related concepts:</strong> <span class="badge-row" style="display:inline-flex;">' +
        topic.relatedConcepts.map(function (rc) { return '<a class="pill" data-nav="#/search?q=' + encodeURIComponent(rc) + '">' + esc(rc) + '</a>'; }).join("") + '</span></div>' : "") +

      sourceFooter(topic.source, chapter.title) +

      '<div class="card mt-4" id="notes-host"><h3>My Notes on this Topic</h3><textarea id="topic-note-text" placeholder="Write a note for yourself…"></textarea><button class="btn btn-outline btn-sm mt-2" id="save-note-btn">Save Note</button></div>' +

      '<div class="flex items-center justify-between mt-6">' +
        (prevT ? '<button class="btn btn-outline" data-nav="#/chapter/' + num + '/topic/' + prevT.id + '">← ' + esc(IFLDom.truncate(prevT.title, 32)) + '</button>' : '<button class="btn btn-outline" data-nav="#/chapter/' + num + '">← Chapter overview</button>') +
        '<button class="btn btn-primary" id="complete-btn">' + (isDone ? "✓ Topic Completed" : "Mark Topic Complete") + '</button>' +
        (nextT ? '<button class="btn btn-outline" data-nav="#/chapter/' + num + '/topic/' + nextT.id + '">' + esc(IFLDom.truncate(nextT.title, 32)) + ' →</button>' : '<button class="btn btn-outline" data-nav="#/chapter/' + num + '">Chapter overview →</button>') +
      '</div>';

    root.innerHTML = "";
    root.appendChild(container);

    // Explanation level switch behavior
    function paintExplanation(lvl) {
      var field = (LEVELS.find(function (l) { return l.key === lvl; }) || LEVELS[0]).field;
      var text = topic[field] || topic.overview || "No explanation available at this level.";
      document.getElementById("explanation-body").innerHTML = '<p class="mb-0">' + fmt(text) + '</p>';
    }
    paintExplanation(level);
    IFLDom.qsa("#level-switch button", container).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lvl = btn.getAttribute("data-level");
        IFLStore.update(function (s) { s.settings.explanationLevel = lvl; });
        IFLDom.qsa("#level-switch button", container).forEach(function (b) { b.classList.toggle("active", b === btn); });
        paintExplanation(lvl);
      });
    });

    // Transaction diagram — a real flowchart: numbered boxes connected by
    // arrows, with a single shared detail panel below (cleaner and more
    // "diagram-like" than an accordion of vertically-stacked steps).
    var txHost = document.getElementById("tx-flow");
    var txDetail = document.getElementById("tx-detail");
    if (txHost && topic.transactionSteps) {
      var steps = topic.transactionSteps;
      function selectTxStep(i) {
        IFLDom.qsa(".tx-node", txHost).forEach(function (n, idx) {
          n.classList.toggle("active", idx === i);
        });
        txDetail.innerHTML =
          '<div class="tx-detail-num">' + (i + 1) + '</div>' +
          '<div><div class="tx-detail-title">' + esc(steps[i].step) + '</div>' +
          '<div class="tx-detail-body">' + fmt(steps[i].description) + '</div></div>';
      }
      steps.forEach(function (step, i) {
        if (i > 0) txHost.appendChild(el("span", { class: "tx-arrow", "aria-hidden": "true" }, ["→"]));
        var nodeEl = el("button", { class: "tx-node", type: "button" }, [
          el("div", { class: "tx-node-badge" }, [String(i + 1)]),
          el("div", { class: "tx-node-title" }, [step.step])
        ]);
        nodeEl.addEventListener("click", function () { selectTxStep(i); });
        txHost.appendChild(nodeEl);
      });
      selectTxStep(0);
    }

    // Bookmark + complete + note actions
    document.getElementById("topic-actions").appendChild(bookmarkButton("topic", topic.id, chapter.chapterNumber + "." + (topic.sectionNumber || "") + " " + topic.title));

    document.getElementById("complete-btn").addEventListener("click", function () {
      IFLProgress.completeTopic(topic.id, num);
      renderTopic(params);
    });

    var existingNote = IFLStore.get().notes.find(function (n) { return n.scope === "topic" && n.refId === topic.id; });
    if (existingNote) document.getElementById("topic-note-text").value = existingNote.text;
    document.getElementById("save-note-btn").addEventListener("click", function () {
      var text = document.getElementById("topic-note-text").value.trim();
      IFLStore.update(function (s) {
        var idx2 = s.notes.findIndex(function (n) { return n.scope === "topic" && n.refId === topic.id; });
        if (!text) {
          if (idx2 >= 0) s.notes.splice(idx2, 1);
          return;
        }
        if (idx2 >= 0) { s.notes[idx2].text = text; s.notes[idx2].updatedAt = Date.now(); }
        else s.notes.push({ id: "note-" + Date.now(), scope: "topic", refId: topic.id, text: text, createdAt: Date.now(), updatedAt: Date.now() });
      });
      IFLDom.toast("Note saved");
    });
  }

  function renderCriticismBlock(topic) {
    var parts = [];
    if (topic.issue) parts.push('<p><strong>Issue:</strong> ' + fmt(topic.issue) + '</p>');
    if (topic.criticism) parts.push('<p><strong>Criticism / Argument:</strong> ' + fmt(topic.criticism) + '</p>');
    if (topic.authorsResponse) parts.push('<p><strong>Author\'s Discussion:</strong> ' + fmt(topic.authorsResponse) + '</p>');
    if (topic.alternativeView) parts.push('<p><strong>Alternative View:</strong> ' + fmt(topic.alternativeView) + '</p>');
    if (topic.studentTakeaway) parts.push('<p class="mb-0"><strong>Student Takeaway:</strong> ' + fmt(topic.studentTakeaway) + '</p>');
    return '<div class="card mb-4" style="border-left:3px solid var(--color-accent);"><h3>Criticism &amp; Appraisal</h3>' + parts.join("") + '</div>';
  }

  IFLRouter.register("/chapter/:num", renderChapter);
  IFLRouter.register("/chapter/:num/topic/:topicId", renderTopic);
})();
