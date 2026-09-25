/* "Which Mode Might Apply?" educational decision tree. Not a Shari'ah
 * ruling engine — clearly labeled throughout. */
(function () {
  "use strict";
  var esc = IFLDom.esc, fmt = IFLDom.formatText;

  function render(params, query) {
    var root = IFLRouter.outlet();
    var tree = IFLData.decisionTree();
    if (!tree) { root.innerHTML = '<div class="empty-state"><h3>Decision tool is still being generated</h3></div>'; return; }
    var nodeId = query.node || tree.root;
    var trail = query.trail ? query.trail.split(",") : [];

    root.innerHTML =
      '<div class="section-header"><h1>Financing Mode Finder</h1></div>' +
      '<div class="callout callout-note">' + esc(tree.disclaimer) + '</div>' +
      '<div id="tree-host"></div>';

    var host = document.getElementById("tree-host");

    if (nodeId.indexOf("r-") === 0) {
      var result = tree.results[nodeId];
      if (!result) { host.innerHTML = "<p>Result not found.</p>"; return; }
      host.innerHTML =
        '<div class="card">' +
          '<h3>Suggested Mode(s): ' + esc((result.modes || []).join(", ")) + '</h3>' +
          '<p><strong>Why it may be relevant:</strong> ' + fmt(result.whyRelevant) + '</p>' +
          '<p><strong>Basic structure:</strong> ' + fmt(result.basicStructure) + '</p>' +
          (result.keyConditions && result.keyConditions.length ? '<p class="mb-1"><strong>Key conditions:</strong></p><ul>' + result.keyConditions.map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ul>' : "") +
          (result.majorRisks && result.majorRisks.length ? '<p class="mb-1"><strong>Major risks:</strong></p><ul>' + result.majorRisks.map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ul>' : "") +
          (result.chapter ? '<button class="btn btn-primary btn-sm mt-2" data-nav="' + esc(result.href || ("#/chapter/" + result.chapter)) + '">Read Chapter ' + result.chapter + ' →</button>' : "") +
        '</div>' +
        '<button class="btn btn-outline mt-3" id="restart-tree">Start Over</button>';
      document.getElementById("restart-tree").addEventListener("click", function () {
        IFLStore.update(function (s) { s.progress.decisionToolUses += 1; });
        IFLRouter.navigate("#/decision-tool");
      });
      return;
    }

    var qNode = tree.questions[nodeId];
    if (!qNode) { host.innerHTML = "<p>Question not found.</p>"; return; }
    host.innerHTML =
      (trail.length ? '<p class="text-sm text-muted">Step ' + (trail.length + 1) + '</p>' : "") +
      '<div class="card"><h3>' + esc(qNode.prompt) + '</h3>' +
      '<div class="flex-col gap-2">' +
      qNode.options.map(function (opt) {
        var nextTrail = trail.concat([nodeId]).join(",");
        return '<button class="quiz-option" data-nav="#/decision-tool' + IFLRouter.buildQuery({ node: opt.next, trail: nextTrail }) + '">' + esc(opt.label) + '</button>';
      }).join("") +
      '</div></div>' +
      (trail.length ? '<button class="btn btn-outline btn-sm mt-3" data-nav="#/decision-tool">Start Over</button>' : "");
  }

  IFLRouter.register("/decision-tool", render);
})();
