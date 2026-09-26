/* Concept Map: a real interactive node-graph. Nodes are laid out in
 * columns by category (the book's own conceptual flow: foundations ->
 * prohibitions -> contracts -> financing modes -> markets -> appraisal).
 * Edges are drawn as an SVG overlay computed from actual rendered node
 * positions. To keep the default view calm and readable (45 nodes / 73
 * edges would be spaghetti if all shown at once), edges only appear for
 * the selected node and its neighbors — click any node to reveal its
 * connections; click "Show all connections" to see the full graph. */
(function () {
  "use strict";
  var esc = IFLDom.esc;

  var GROUP_ORDER = ["foundations", "prohibitions", "contracts", "modes", "markets", "appraisal"];
  var GROUP_META = {
    foundations: { label: "Foundations", color: "var(--color-info)" },
    prohibitions: { label: "Main Prohibitions", color: "var(--color-danger)" },
    contracts: { label: "Contractual Principles", color: "var(--color-accent)" },
    modes: { label: "Financing Modes", color: "var(--color-brand)" },
    markets: { label: "Banking & Capital Markets", color: "var(--color-warning)" },
    appraisal: { label: "Appraisal & Way Forward", color: "var(--color-text-muted)" }
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
    var edgesByNode = {};
    (map.edges || []).forEach(function (e) {
      edgesByNode[e.from] = edgesByNode[e.from] || [];
      edgesByNode[e.from].push(e.to);
      edgesByNode[e.to] = edgesByNode[e.to] || [];
      edgesByNode[e.to].push(e.from);
    });
    var groups = {};
    map.nodes.forEach(function (n) {
      var g = n.group || "other";
      groups[g] = groups[g] || [];
      groups[g].push(n);
    });
    var orderedGroups = GROUP_ORDER.filter(function (g) { return groups[g]; })
      .concat(Object.keys(groups).filter(function (g) { return GROUP_ORDER.indexOf(g) === -1; }));

    root.innerHTML =
      '<div class="section-header"><h1>Concept Map</h1></div>' +
      '<p class="text-secondary">Laid out in the book\'s own conceptual flow — foundations through appraisal. Click any concept to see its connections and open its lesson.</p>' +
      '<div class="badge-row mb-3">' +
        orderedGroups.map(function (g) {
          var meta = GROUP_META[g] || { label: g, color: "var(--color-text-muted)" };
          return '<span class="pill" style="border-left:3px solid ' + meta.color + ';padding-left:8px;">' + esc(meta.label) + '</span>';
        }).join("") +
        '<button class="btn btn-outline btn-sm" id="show-all-edges" style="margin-left:auto;">Show all connections</button>' +
      '</div>' +
      '<div class="concept-map-wrap"><div class="concept-graph" id="concept-graph">' +
        orderedGroups.map(function (g) {
          var meta = GROUP_META[g] || { label: g, color: "var(--color-text-muted)" };
          return '<div class="concept-col">' +
            '<div class="concept-col-header" style="color:' + meta.color + ';">' + esc(meta.label) + '</div>' +
            groups[g].map(function (n) {
              return '<button class="concept-node" data-node="' + esc(n.id) + '" style="--node-accent:' + meta.color + ';">' + esc(n.label) + '</button>';
            }).join("") +
          '</div>';
        }).join("") +
        '<svg class="concept-edge-svg" id="concept-svg"></svg>' +
      '</div></div>' +
      '<div class="card mt-4" id="node-detail"><p class="text-muted mb-0">Select a concept above to see its connections and open its lesson.</p></div>';

    var graphEl = document.getElementById("concept-graph");
    var svg = document.getElementById("concept-svg");
    var showingAll = false;
    var selectedId = null;

    function nodeCenter(id) {
      var btn = graphEl.querySelector('[data-node="' + CSS.escape(id) + '"]');
      if (!btn) return null;
      var graphRect = graphEl.getBoundingClientRect();
      var r = btn.getBoundingClientRect();
      return { x: r.left - graphRect.left + r.width / 2, y: r.top - graphRect.top + r.height / 2, w: r.width, h: r.height };
    }

    function sizeSvg() {
      svg.setAttribute("width", graphEl.scrollWidth);
      svg.setAttribute("height", graphEl.scrollHeight);
      svg.style.width = graphEl.scrollWidth + "px";
      svg.style.height = graphEl.scrollHeight + "px";
    }

    function edgePath(a, b) {
      // Gentle horizontal S-curve between two node edges (left/right sides
      // facing each other), or a vertical curve if they're in the same column.
      var sameCol = Math.abs(a.x - b.x) < 4;
      if (sameCol) {
        var x = a.x;
        var y1 = a.y < b.y ? a.y + a.h / 2 : a.y - a.h / 2;
        var y2 = a.y < b.y ? b.y - b.h / 2 : b.y + b.h / 2;
        return "M " + x + " " + y1 + " L " + x + " " + y2;
      }
      var leftFirst = a.x < b.x;
      var p1 = leftFirst ? { x: a.x + a.w / 2, y: a.y } : { x: a.x - a.w / 2, y: a.y };
      var p2 = leftFirst ? { x: b.x - b.w / 2, y: b.y } : { x: b.x + b.w / 2, y: b.y };
      var midX = (p1.x + p2.x) / 2;
      return "M " + p1.x + " " + p1.y + " C " + midX + " " + p1.y + ", " + midX + " " + p2.y + ", " + p2.x + " " + p2.y;
    }

    function drawEdges(edgeList, opts) {
      opts = opts || {};
      sizeSvg();
      var frag = document.createDocumentFragment();
      edgeList.forEach(function (e) {
        var a = nodeCenter(e.from), b = nodeCenter(e.to);
        if (!a || !b) return;
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", edgePath(a, b));
        path.setAttribute("class", "concept-edge" + (opts.dim ? " dim" : " active"));
        frag.appendChild(path);
      });
      svg.innerHTML = "";
      svg.appendChild(frag);
    }

    function clearSelection() {
      IFLDom.qsa(".concept-node", graphEl).forEach(function (b) { b.classList.remove("active", "connected", "dim"); });
      svg.innerHTML = "";
    }

    function selectNode(id) {
      showingAll = false;
      document.getElementById("show-all-edges").textContent = "Show all connections";
      selectedId = id;
      var node = byId[id];
      var connectedIds = edgesByNode[id] || [];
      IFLDom.qsa(".concept-node", graphEl).forEach(function (b) {
        var bId = b.getAttribute("data-node");
        b.classList.toggle("active", bId === id);
        b.classList.toggle("connected", connectedIds.indexOf(bId) !== -1);
        b.classList.toggle("dim", bId !== id && connectedIds.indexOf(bId) === -1);
      });
      var edgeList = connectedIds.map(function (toId) { return { from: id, to: toId }; });
      drawEdges(edgeList);

      var related = connectedIds.map(function (rid) { return byId[rid]; }).filter(Boolean);
      var detail = document.getElementById("node-detail");
      detail.innerHTML =
        '<div class="flex items-center justify-between"><h3 class="mb-1">' + esc(node.label) + '</h3>' +
        '<span class="badge-row">' +
        '<button class="btn btn-outline btn-sm" data-nav="#/concept/' + esc(node.id) + '">Concept Hub →</button>' +
        (node.href ? '<button class="btn btn-primary btn-sm" data-nav="' + esc(node.href) + '">Open lesson →</button>' : '') +
        '</span></div>' +
        (related.length ? '<p class="text-sm text-muted mb-2">Connected to ' + related.length + ' concept' + (related.length === 1 ? "" : "s") + ':</p><div class="badge-row">' +
          related.map(function (r) { return '<button class="pill" data-node-jump="' + esc(r.id) + '" style="cursor:pointer;">' + esc(r.label) + '</button>'; }).join("") + '</div>' : '<p class="text-sm text-muted mb-0">No mapped connections yet.</p>');
      IFLDom.qsa("[data-node-jump]", detail).forEach(function (b) {
        b.addEventListener("click", function () { selectNode(b.getAttribute("data-node-jump")); b.closest !== undefined && graphEl.querySelector('[data-node="' + CSS.escape(b.getAttribute("data-node-jump")) + '"]').scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" }); });
      });
    }

    IFLDom.qsa(".concept-node", graphEl).forEach(function (btn) {
      btn.addEventListener("click", function () { selectNode(btn.getAttribute("data-node")); });
    });

    document.getElementById("show-all-edges").addEventListener("click", function () {
      if (showingAll) {
        showingAll = false;
        this.textContent = "Show all connections";
        clearSelection();
        selectedId = null;
        document.getElementById("node-detail").innerHTML = '<p class="text-muted mb-0">Select a concept above to see its connections and open its lesson.</p>';
        return;
      }
      showingAll = true;
      selectedId = null;
      this.textContent = "Hide all connections";
      IFLDom.qsa(".concept-node", graphEl).forEach(function (b) { b.classList.remove("active", "connected", "dim"); });
      drawEdges(map.edges || [], { dim: true });
      document.getElementById("node-detail").innerHTML =
        '<p class="mb-0">Showing all ' + (map.edges || []).length + ' relationships across ' + map.nodes.length + ' concepts. Click any single concept for a focused view and its lesson link.</p>';
    });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (showingAll) drawEdges(map.edges || [], { dim: true });
        else if (selectedId) drawEdges((edgesByNode[selectedId] || []).map(function (toId) { return { from: selectedId, to: toId }; }));
      }, 150);
    });
  }

  IFLRouter.register("/concept-map", render);
})();
