/* Products at a Glance: a filterable comparison matrix across all major
 * Islamic banking products (Murabaha, Salam, Ijarah, Musharakah, Sukuk,
 * Takaful, ...), each row expandable in place for the full grounded detail
 * (Shari'ah basis, ownership/risk timing, conditions, risks, distinguishing
 * feature) with a link back to its chapter. */
(function () {
  "use strict";
  var esc = IFLDom.esc, fmt = IFLDom.formatText;

  function returnTypePill(rt) {
    var cls = { "Fixed": "pill-info", "Variable/Profit-Share": "pill-brand", "Rental": "pill-accent", "Fee-based": "pill-warning", "Mixed": "pill" }[rt] || "pill";
    return '<span class="pill ' + cls + '">' + esc(rt || "—") + '</span>';
  }

  function render(params, query) {
    var root = IFLRouter.outlet();
    var products = IFLData.productsMatrix ? IFLData.productsMatrix() : [];
    if (!products.length) {
      root.innerHTML = '<div class="empty-state"><h3>Products at a Glance is still being generated</h3><p>Check back shortly.</p></div>';
      return;
    }
    var categories = Array.from(new Set(products.map(function (p) { return p.category; })));
    var activeCategory = query.cat || "";
    var expandedId = query.p || "";

    root.innerHTML =
      '<div class="section-header"><h1>Islamic Banking Products at a Glance</h1><span class="text-sm text-muted">' + products.length + ' products</span></div>' +
      '<p class="text-secondary">Every major financing product side by side. Click a row to see its full profile — Shari\'ah basis, ownership/risk timing, conditions, risks, and what most distinguishes it from adjacent products.</p>' +
      '<div class="badge-row mb-4">' +
        '<button class="btn btn-sm ' + (!activeCategory ? "btn-primary" : "btn-outline") + '" data-cat="">All</button>' +
        categories.map(function (c) {
          return '<button class="btn btn-sm ' + (activeCategory === c ? "btn-primary" : "btn-outline") + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
        }).join("") +
      '</div>' +
      '<div class="card" style="overflow-x:auto;">' +
        '<table><thead><tr><th>Product</th><th>Category</th><th>Return Type</th><th>Typical Tenor</th><th></th></tr></thead><tbody id="pm-tbody"></tbody></table>' +
      '</div>';

    function paint() {
      var filtered = products.filter(function (p) { return !activeCategory || p.category === activeCategory; });
      var tbody = document.getElementById("pm-tbody");
      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-muted">No products in this category.</td></tr>';
        return;
      }
      tbody.innerHTML = filtered.map(function (p) {
        var isOpen = p.id === expandedId;
        var row = '<tr class="card-clickable" data-toggle="' + esc(p.id) + '" style="cursor:pointer;">' +
          '<td><strong>' + esc(p.name) + '</strong></td>' +
          '<td class="text-sm text-muted">' + esc(p.category) + '</td>' +
          '<td>' + returnTypePill(p.returnType) + '</td>' +
          '<td class="text-sm">' + esc(p.typicalTenor) + '</td>' +
          '<td class="text-muted">' + (isOpen ? "▲" : "▼") + '</td>' +
        '</tr>';
        if (isOpen) {
          row += '<tr><td colspan="5" style="background:var(--color-bg-sunken);">' +
            '<div class="mb-2"><strong>Shari\'ah basis:</strong> ' + fmt(p.shariahBasis) + '</div>' +
            '<div class="mb-2"><strong>Subject matter:</strong> ' + fmt(p.subjectMatter) + '</div>' +
            '<div class="mb-2"><strong>Ownership / risk timing:</strong> ' + fmt(p.ownershipRiskTiming) + '</div>' +
            '<div class="mb-2"><strong>Return:</strong> ' + fmt(p.returnTypeDetail || "") + '</div>' +
            '<div class="mb-2"><strong>Liquidity / tradability:</strong> ' + fmt(p.liquidityTradability) + '</div>' +
            '<div class="mb-2"><strong>Common use:</strong> ' + fmt(p.commonUse) + '</div>' +
            '<div class="grid-2 mb-2">' +
              '<div><strong>Key conditions</strong><ul class="mb-0">' + (p.keyConditions || []).map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ul></div>' +
              '<div><strong>Major risks</strong><ul class="mb-0">' + (p.majorRisks || []).map(function (c) { return "<li>" + fmt(c) + "</li>"; }).join("") + '</ul></div>' +
            '</div>' +
            '<div class="callout callout-note mb-2"><div class="callout-title">What distinguishes it most</div>' + fmt(p.distinguishingFeature) + '</div>' +
            (p.source ? '<div class="source-footer"><span class="icon">📖</span> Source: Chapter ' + p.source.chapter + (p.source.section ? ", §" + esc(p.source.section) : "") + (p.source.pages ? ", pp. " + p.source.pages.join("-") : "") + '</div>' : "") +
            (p.href ? '<button class="btn btn-primary btn-sm mt-2" data-nav="' + esc(p.href) + '">Read full chapter →</button>' : "") +
          '</td></tr>';
        }
        return row;
      }).join("");
      IFLDom.qsa("[data-toggle]", tbody).forEach(function (tr) {
        tr.addEventListener("click", function () {
          var id = tr.getAttribute("data-toggle");
          IFLRouter.navigate("#/products" + IFLRouter.buildQuery({ cat: activeCategory || undefined, p: expandedId === id ? undefined : id }));
        });
      });
    }
    paint();

    IFLDom.qsa("[data-cat]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        IFLRouter.navigate("#/products" + IFLRouter.buildQuery({ cat: btn.getAttribute("data-cat") || undefined }));
      });
    });
  }

  IFLRouter.register("/products", render);
})();
