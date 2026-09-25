/* Flashcard engine: category/chapter picker + a flip-card review session
 * with Again/Hard/Good/Easy controls and a simple deterministic scheduler
 * (see IFLProgress.recordFlashcardReview for the box/interval logic). */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  function dueCards(cards) {
    var reviews = IFLStore.get().progress.flashcardReviews;
    var now = Date.now();
    return cards.filter(function (c) {
      var r = reviews[c.id];
      return !r || !r.dueAt || r.dueAt <= now;
    });
  }

  function renderPicker(query) {
    var root = IFLRouter.outlet();
    var all = IFLData.allFlashcards();
    var categories = Array.from(new Set(all.map(function (c) { return c.category; }))).sort();
    var chapters = IFLData.allChapters();
    var due = dueCards(all);

    root.innerHTML =
      '<div class="section-header"><h1>Flashcards</h1><span class="text-sm text-muted">' + all.length + ' cards · ' + due.length + ' due for review</span></div>' +
      '<div class="card-grid mb-4">' +
        '<button class="card card-clickable" data-start="due"><div class="card-title">Due for Review</div><p class="text-sm mb-0">' + due.length + ' cards ready now (spaced repetition)</p></button>' +
        '<button class="card card-clickable" data-start="all"><div class="card-title">All Cards</div><p class="text-sm mb-0">' + all.length + ' cards across every chapter</p></button>' +
      '</div>' +
      '<h3>By Category</h3>' +
      '<div class="badge-row mb-4">' + categories.map(function (cat) {
        var n = all.filter(function (c) { return c.category === cat; }).length;
        return '<button class="btn btn-outline btn-sm" data-cat="' + esc(cat) + '">' + esc(cat) + ' (' + n + ')</button>';
      }).join("") + '</div>' +
      '<h3>By Chapter</h3>' +
      '<div class="badge-row">' + chapters.map(function (c) {
        var n = all.filter(function (f) { return f.chapter === c.chapterNumber; }).length;
        if (!n) return "";
        return '<button class="btn btn-outline btn-sm" data-chapter="' + c.chapterNumber + '">Ch ' + c.chapterNumber + ' (' + n + ')</button>';
      }).join("") + '</div>';

    IFLDom.qs('[data-start="due"]', root).addEventListener("click", function () { startSession(due.length ? due : all); });
    IFLDom.qs('[data-start="all"]', root).addEventListener("click", function () { startSession(all); });
    IFLDom.qsa("[data-cat]", root).forEach(function (b) {
      b.addEventListener("click", function () { startSession(all.filter(function (c) { return c.category === b.getAttribute("data-cat"); })); });
    });
    IFLDom.qsa("[data-chapter]", root).forEach(function (b) {
      b.addEventListener("click", function () { startSession(all.filter(function (c) { return c.chapter === Number(b.getAttribute("data-chapter")); })); });
    });

    if (query.chapter) {
      startSession(all.filter(function (c) { return c.chapter === Number(query.chapter); }));
    }
  }

  function startSession(cards) {
    if (!cards.length) { IFLDom.toast("No cards in this set."); return; }
    var shuffled = cards.slice().sort(function () { return Math.random() - 0.5; });
    renderSession(shuffled, 0, { reviewed: 0 });
  }

  function renderSession(cards, i, stats) {
    var root = IFLRouter.outlet();
    if (i >= cards.length) {
      root.innerHTML = '<div class="empty-state"><h3>Session complete 🎉</h3><p>You reviewed ' + stats.reviewed + ' card' + (stats.reviewed === 1 ? "" : "s") + '.</p>' +
        '<div class="badge-row" style="justify-content:center;"><button class="btn btn-primary" data-nav="#/flashcards">Back to Flashcards</button><button class="btn btn-outline" data-nav="#/dashboard">Dashboard</button></div></div>';
      return;
    }
    var card = cards[i];
    root.innerHTML =
      '<div class="section-header"><h2 class="mb-0">Flashcards</h2><span class="text-sm text-muted">' + (i + 1) + ' / ' + cards.length + '</span></div>' +
      '<div class="progress-track mb-4"><span class="progress-fill" style="width:' + Math.round((i / cards.length) * 100) + '%"></span></div>' +
      '<div class="flashcard-stage">' +
        '<div class="flashcard" id="flashcard" role="button" tabindex="0" aria-label="Flip card">' +
          '<div class="flashcard-face front"><span class="pill pill-brand mb-2">' + esc(card.category) + '</span><p style="font-size:var(--fs-lg);font-weight:600;margin:0;">' + esc(card.front) + '</p><small class="text-muted mt-3">Click to reveal answer</small></div>' +
          '<div class="flashcard-face back"><p style="margin:0;">' + esc(card.back) + '</p>' +
          (card.source ? '<small class="text-muted mt-3">Ch ' + card.source.chapter + (card.source.section ? " · §" + esc(card.source.section) : "") + '</small>' : "") + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="flex items-center justify-center gap-2 mt-6" id="rating-row" style="display:none;">' +
        '<button class="btn btn-danger" data-rate="again">Again</button>' +
        '<button class="btn btn-outline" data-rate="hard">Hard</button>' +
        '<button class="btn btn-outline" data-rate="good">Good</button>' +
        '<button class="btn btn-primary" data-rate="easy">Easy</button>' +
      '</div>' +
      '<p class="text-center text-sm text-muted mt-3" id="flip-hint">Reveal the answer, then rate how well you knew it.</p>';

    var flashcardEl = document.getElementById("flashcard");
    var ratingRow = document.getElementById("rating-row");
    var hint = document.getElementById("flip-hint");
    function flip() {
      flashcardEl.classList.toggle("flipped");
      var revealed = flashcardEl.classList.contains("flipped");
      ratingRow.style.display = revealed ? "flex" : "none";
      hint.style.display = revealed ? "none" : "block";
    }
    flashcardEl.addEventListener("click", flip);
    flashcardEl.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });

    IFLDom.qsa("[data-rate]", root).forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        IFLProgress.recordFlashcardReview(card.id, btn.getAttribute("data-rate"));
        stats.reviewed += 1;
        renderSession(cards, i + 1, stats);
      });
    });
  }

  IFLRouter.register("/flashcards", renderPicker);
})();
