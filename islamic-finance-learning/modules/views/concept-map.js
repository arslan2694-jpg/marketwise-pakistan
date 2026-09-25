/* Concept Map: clickable node graph rendered as an interactive grouped list
 * (SVG-free, so it stays readable and accessible on any screen size) with a
 * simple canvas-based force layout for visual context. */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  var GROUP_LABELS = {
    foundations: "Foundations",
    prohibitions: "Main Prohibitions",
    contracts: "Contractual Principles",
    modes: "Financing Modes",
    markets: "Banking & Capital Markets",
    appraisal: "Appraisal & Way Forward"
  };

  function render() {
    var root = IFLRouter.outlet();
    var map = IFLData.conceptMap();
    if (!map.nodes || !map.nodes.length) {
      root.innerHTML = '<div class="empty-state"><h3>Concept map is still being generated</h3><p>Check back shortly.</p></div>';
      return;
    }
    var byId = {};
    map.nodes.forEach(function (n) { byId[n.id] = n; });
    var grouped = {};
    map.nodes.forEach(function (n) {
      var g = n.group || "other";
      grouped[g] = grouped[g] || [];
      grouped[g].push(n);
    });
    var edgesByNode = {};
    (map.edges || []).forEach(function (e) {
      edgesByNode[e.from] = edgesByNode[e.from] || [];
      edgesByNode[e.from].push(e.to);
      edgesByNode[e.to] = edgesByNode[e.to] || [];
      edgesByNode[e.to].push(e.from);
    });

    root.innerHTML =
      '<div class="section-header"><h1>Concept Map</h1></div>' +
      '<p class="text-secondary">Click any concept to open its lesson. Related concepts are highlighted when you select a node.</p>' +
      '<div class="card mb-4">' +
        Object.keys(grouped).map(function (g) {
          return '<div class="mb-4"><h4 class="mb-2">' + esc(GROUP_LABELS[g] || g) + '</h4>' +
            '<div class="badge-row" data-group="' + esc(g) + '">' +
            grouped[g].map(function (n) {
              return '<button class="pill" data-node="' + esc(n.id) + '" style="cursor:pointer;border:1px solid var(--color-border);">' + esc(n.label) + '</button>';
            }).join("") + '</div></div>';
        }).join("") +
      '</div>' +
      '<div class="card" id="node-detail"><p class="text-muted mb-0">Select a concept above to see its connections and open its lesson.</p></div>';

    IFLDom.qsa("[data-node]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        IFLDom.qsa("[data-node]", root).forEach(function (b) { b.classList.remove("pill-brand"); });
        var id = btn.getAttribute("data-node");
        var node = byId[id];
        btn.classList.add("pill-brand");
        var related = (edgesByNode[id] || []).map(function (rid) { return byId[rid]; }).filter(Boolean);
        var detail = document.getElementById("node-detail");
        detail.innerHTML =
          '<div class="flex items-center justify-between"><h3 class="mb-1">' + esc(node.label) + '</h3>' +
          (node.href ? '<button class="btn btn-primary btn-sm" data-nav="' + esc(node.href) + '">Open lesson →</button>' : '') + '</div>' +
          (related.length ? '<p class="text-sm text-muted mb-2">Connected to:</p><div class="badge-row">' +
            related.map(function (r) { return '<span class="pill">' + esc(r.label) + '</span>'; }).join("") + '</div>' : '<p class="text-sm text-muted mb-0">No mapped connections yet.</p>');
      });
    });
  }

  IFLRouter.register("/concept-map", render);
})();
