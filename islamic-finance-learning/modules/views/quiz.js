/* Quiz engine: chapter/mixed picker + a generic runner that handles
 * mcq/truefalse/identify/comparison/scenario (single-select), multiselect
 * (checkboxes), and any other declared type (definition/short/ordering/
 * matching) via a self-graded reveal-and-rate flow — robust to whichever
 * shape the authored question data actually has. */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function renderPicker() {
    var root = IFLRouter.outlet();
    var chapters = IFLData.allChapters();
    root.innerHTML =
      '<div class="section-header"><h1>Quiz</h1></div>' +
      '<p class="text-secondary">Choose a chapter quiz, or take a mixed quiz across everything you\'ve studied.</p>' +
      '<div class="card-grid mb-4">' +
        '<button class="card card-clickable" data-nav="#/quiz/mixed"><div class="card-title">Mixed Quiz</div><p class="text-sm mb-0">15 random questions across all chapters</p></button>' +
      '</div>' +
      '<h3>By Chapter</h3>' +
      '<div class="card-grid">' +
        chapters.map(function (c) {
          var n = IFLData.questionsByChapter(c.chapterNumber).length;
          var avg = IFLData.chapterQuizAverage(c.chapterNumber);
          if (!n) return "";
          return '<button class="card card-clickable" data-nav="#/quiz/chapter/' + c.chapterNumber + '">' +
            '<div class="card-title">Ch ' + c.chapterNumber + ': ' + esc(IFLDom.truncate(c.title, 48)) + '</div>' +
            '<p class="text-sm mb-0">' + n + ' questions' + (avg != null ? " · avg " + avg + "%" : "") + '</p></button>';
        }).join("") +
      '</div>';
  }

  function pickQuestions(chapterNum) {
    var pool = chapterNum === "mixed" ? IFLData.allQuestions() : IFLData.questionsByChapter(chapterNum);
    var shuffled = pool.slice().sort(function () { return Math.random() - 0.5; });
    return chapterNum === "mixed" ? shuffled.slice(0, 15) : shuffled;
  }

  function startQuiz(params) {
    var chapterNum = params.num ? Number(params.num) : "mixed";
    var questions = pickQuestions(chapterNum);
    if (!questions.length) {
      IFLRouter.outlet().innerHTML = '<div class="empty-state"><h3>No questions available yet</h3><button class="btn btn-primary" data-nav="#/quiz">Back to Quiz</button></div>';
      return;
    }
    runSession(questions, 0, { correct: 0, answers: {}, missed: [], chapter: chapterNum === "mixed" ? null : chapterNum });
  }

  function optionsView(q, onAnswer) {
    var isMulti = Array.isArray(q.correctAnswer);
    var wrap = document.createElement("div");
    var selected = isMulti ? [] : null;
    (q.options || []).forEach(function (opt, i) {
      var btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.type = "button";
      btn.innerHTML = (isMulti ? '<input type="checkbox" style="margin-right:8px;pointer-events:none;">' : "") + esc(opt);
      btn.addEventListener("click", function () {
        if (isMulti) {
          var idx = selected.indexOf(i);
          if (idx >= 0) { selected.splice(idx, 1); btn.classList.remove("selected"); btn.querySelector("input").checked = false; }
          else { selected.push(i); btn.classList.add("selected"); btn.querySelector("input").checked = true; }
        } else {
          IFLDom.qsa(".quiz-option", wrap).forEach(function (b) { b.classList.remove("selected"); });
          btn.classList.add("selected");
          selected = i;
        }
      });
      wrap.appendChild(btn);
    });
    if (isMulti) {
      var submitBtn = document.createElement("button");
      submitBtn.className = "btn btn-primary mt-2";
      submitBtn.textContent = "Submit Answer";
      submitBtn.addEventListener("click", function () { onAnswer(selected); });
      wrap.appendChild(submitBtn);
    } else {
      // auto-submit shortly after single select isn't ideal for review; require explicit submit too
      var submitBtn2 = document.createElement("button");
      submitBtn2.className = "btn btn-primary mt-2";
      submitBtn2.textContent = "Submit Answer";
      submitBtn2.addEventListener("click", function () {
        if (selected == null) { IFLDom.toast("Choose an option first"); return; }
        onAnswer(selected);
      });
      wrap.appendChild(submitBtn2);
    }
    return wrap;
  }

  function selfGradedView(q, onAnswer) {
    var wrap = document.createElement("div");
    var textarea = document.createElement("textarea");
    textarea.placeholder = "Type your answer, then reveal the model answer and self-grade.";
    wrap.appendChild(textarea);
    var revealBtn = document.createElement("button");
    revealBtn.className = "btn btn-outline mt-2";
    revealBtn.textContent = "Reveal Answer";
    wrap.appendChild(revealBtn);
    var answerBox = document.createElement("div");
    answerBox.className = "callout callout-info mt-3";
    answerBox.style.display = "none";
    answerBox.innerHTML = '<strong>Model answer:</strong><p class="mb-0">' + esc(Array.isArray(q.correctAnswer) ? q.correctAnswer.join(", ") : String(q.correctAnswer || "")) + '</p>';
    wrap.appendChild(answerBox);
    var gradeRow = document.createElement("div");
    gradeRow.className = "badge-row mt-2";
    gradeRow.style.display = "none";
    gradeRow.innerHTML = '<button class="btn btn-primary" data-self="correct">I got this right</button><button class="btn btn-outline" data-self="incorrect">I got this wrong</button>';
    wrap.appendChild(gradeRow);
    revealBtn.addEventListener("click", function () {
      answerBox.style.display = "block";
      gradeRow.style.display = "flex";
      revealBtn.style.display = "none";
    });
    IFLDom.qsa("[data-self]", gradeRow).forEach(function (btn) {
      btn.addEventListener("click", function () { onAnswer(btn.getAttribute("data-self") === "correct" ? "self-correct" : "self-incorrect"); });
    });
    return wrap;
  }

  function isCorrect(q, given) {
    if (given === "self-correct") return true;
    if (given === "self-incorrect") return false;
    if (Array.isArray(q.correctAnswer)) {
      if (!Array.isArray(given)) return false;
      var a = q.correctAnswer.slice().sort();
      var b = given.slice().sort();
      return a.length === b.length && a.every(function (v, i) { return v === b[i]; });
    }
    return given === q.correctAnswer;
  }

  function runSession(questions, i, stats) {
    var root = IFLRouter.outlet();
    if (i >= questions.length) {
      var scorePct = IFLProgress.recordQuizAttempt({
        chapter: stats.chapter, total: questions.length, correct: stats.correct,
        missed: stats.missed, answers: stats.answers, mode: "quiz"
      });
      root.innerHTML =
        '<div class="empty-state">' +
          '<h2>Quiz Complete</h2>' +
          '<div class="ring-progress mb-3" style="width:120px;height:120px;margin:0 auto;">' +
            '<svg width="120" height="120"><circle cx="60" cy="60" r="52" stroke="var(--color-border)" stroke-width="10" fill="none"/>' +
            '<circle cx="60" cy="60" r="52" stroke="' + (scorePct >= 70 ? "var(--color-success)" : scorePct >= 40 ? "var(--color-warning)" : "var(--color-danger)") + '" stroke-width="10" fill="none" stroke-dasharray="' + (2 * Math.PI * 52) + '" stroke-dashoffset="' + ((2 * Math.PI * 52) * (1 - scorePct / 100)) + '" stroke-linecap="round"/></svg>' +
            '<span class="ring-progress-label" style="font-size:1.5rem;">' + scorePct + '%</span></div>' +
          '<p>' + stats.correct + ' / ' + questions.length + ' correct</p>' +
          (stats.missed.length ? '<div class="card text-left" style="max-width:520px;margin:0 auto;"><h4>Review these topics</h4>' +
            stats.missed.map(function (m) { return '<div class="card-row mb-1"><span class="text-sm">' + esc(m.topic || m.section || "") + '</span><a class="btn btn-sm btn-outline" data-nav="' + (m.chapter ? "#/chapter/" + m.chapter : "#/dashboard") + '">Review Topic</a></div>'; }).join("") + '</div>' : "") +
          '<div class="badge-row mt-4" style="justify-content:center;"><button class="btn btn-primary" data-nav="#/quiz">Back to Quiz</button><button class="btn btn-outline" data-nav="#/dashboard">Dashboard</button></div>' +
        '</div>';
      return;
    }
    var q = questions[i];
    // Dispatch by the actual shape of the question data rather than its type
    // label — several types (matching/ordering/identify/etc.) are authored
    // as clean single-select options, so trust options+correctAnswer shape.
    var hasOptions = Array.isArray(q.options) && q.options.length > 0;
    var multi = hasOptions && Array.isArray(q.correctAnswer);
    var single = hasOptions && !multi && (typeof q.correctAnswer === "number");

    var container = document.createElement("div");
    container.innerHTML =
      '<div class="section-header"><h2 class="mb-0">Quiz</h2><span class="text-sm text-muted">' + (i + 1) + ' / ' + questions.length + '</span></div>' +
      '<div class="progress-track mb-4"><span class="progress-fill" style="width:' + Math.round((i / questions.length) * 100) + '%"></span></div>' +
      '<div class="card mb-3">' +
        '<div class="badge-row mb-2"><span class="pill ' + IFLDom.pillClassForLevel(q.difficulty) + '">' + esc(q.difficulty || "") + '</span><span class="pill">' + esc(q.cognitiveLevel || "") + '</span><span class="pill pill-brand">' + esc(q.type || "") + '</span></div>' +
        '<p style="font-size:var(--fs-md);font-weight:600;">' + esc(q.prompt) + '</p>' +
        '<div id="answer-host"></div>' +
      '</div>' +
      '<div id="feedback-host"></div>';
    root.innerHTML = "";
    root.appendChild(container);

    var answerHost = document.getElementById("answer-host");
    function handleAnswer(given) {
      var correct = isCorrect(q, given);
      if (correct) stats.correct += 1;
      else stats.missed.push({ topic: q.topic, section: q.section, chapter: q.chapter });
      stats.answers[q.id] = { chosen: given, correct: correct };

      answerHost.innerHTML = "";
      var feedback = document.getElementById("feedback-host");
      feedback.innerHTML =
        '<div class="callout ' + (correct ? "callout-info" : "callout-warning") + '">' +
          '<div class="callout-title">' + (correct ? "✅ Correct" : "❌ Not quite") + '</div>' +
          '<p class="mb-2">' + esc(q.explanation || "") + '</p>' +
          (q.chapter ? '<button class="btn btn-outline btn-sm" data-nav="#/chapter/' + q.chapter + '">Review Topic</button>' : "") +
        '</div>' +
        '<button class="btn btn-primary mt-3" id="next-q-btn">' + (i + 1 < questions.length ? "Next Question →" : "See Results") + '</button>';
      document.getElementById("next-q-btn").addEventListener("click", function () { runSession(questions, i + 1, stats); });
    }

    if (single) answerHost.appendChild(optionsView(q, handleAnswer));
    else if (multi) answerHost.appendChild(optionsView(q, handleAnswer));
    else answerHost.appendChild(selfGradedView(q, handleAnswer));
  }

  IFLRouter.register("/quiz", renderPicker);
  IFLRouter.register("/quiz/mixed", function () { startQuiz({}); });
  IFLRouter.register("/quiz/chapter/:num", startQuiz);
  IFLRouter.register("/quiz/type/:type", function (params) {
    var pool = IFLData.allQuestions().filter(function (q) { return q.type === params.type; });
    var shuffled = pool.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 15);
    if (!shuffled.length) {
      IFLRouter.outlet().innerHTML = '<div class="empty-state"><h3>No questions of this type</h3><button class="btn btn-primary" data-nav="#/exam-prep">Back to Exam Prep</button></div>';
      return;
    }
    runSession(shuffled, 0, { correct: 0, answers: {}, missed: [], chapter: null });
  });

  // Exposed so other modules (adaptive practice, crash-course rapid-fire
  // quiz) can run an arbitrary custom question set through the same engine.
  window.IFLQuizRunner = function (questions, opts) {
    opts = opts || {};
    runSession(questions, 0, { correct: 0, answers: {}, missed: [], chapter: opts.chapter || null });
  };
})();
