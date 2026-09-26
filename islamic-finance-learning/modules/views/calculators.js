/* Interactive Calculators: live, student-editable versions of the book's
 * numeric mechanics (deposit-pool weightage distribution, Murabaha/
 * Musawamah cost-plus pricing, Musharakah/Mudarabah profit-vs-loss
 * splitting). Unlike the static "Calculation Walkthrough" on topic pages,
 * these let the student plug in their own numbers and see the rule
 * enforced live — including the cases where the book's own conditions
 * (loss must follow capital ratio; a sleeping partner's profit share is
 * capped at their capital ratio) override whatever the student typed. */
(function () {
  "use strict";
  var el = IFLDom.el, esc = IFLDom.esc;

  function fmtMoney(n) {
    if (!isFinite(n)) return "—";
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function fmtPct(n) {
    if (!isFinite(n)) return "—";
    return (Math.round(n * 100) / 100) + "%";
  }
  function num(id) {
    var v = parseFloat(document.getElementById(id).value);
    return isFinite(v) ? v : 0;
  }

  var TOOLS = [
    { id: "deposit-pool", title: "Deposit Pool Profit Distribution", blurb: "Weightage-based profit sharing across tenors — the Mudarabah + Musharakah pool model from Box 8.1 (Chapter 8).", icon: "🏦" },
    { id: "murabaha-pricing", title: "Murabaha / Musawamah Pricing", blurb: "Cost-plus pricing mechanics — compute sale price, profit, or implied cost (Chapter 9).", icon: "🧾" },
    { id: "musharakah-split", title: "Musharakah Profit & Loss Split", blurb: "See the book's core rule enforced live: profit follows the agreed ratio, loss always follows capital (Chapter 12).", icon: "🤝" }
  ];

  function picker() {
    var root = IFLRouter.outlet();
    root.innerHTML =
      '<div class="section-header"><h1>Interactive Calculators</h1></div>' +
      '<p class="text-secondary">Plug in your own numbers and see the textbook\'s calculation rules applied live — including the conditions that override what you might expect.</p>' +
      '<div class="card-grid">' +
        TOOLS.map(function (t) {
          return '<button class="card card-clickable" data-nav="#/calculators/' + t.id + '">' +
            '<div class="card-title">' + t.icon + ' ' + esc(t.title) + '</div>' +
            '<p class="text-sm mb-0">' + esc(t.blurb) + '</p></button>';
        }).join("") +
      '</div>';
  }

  // ---- Tool 1: Deposit Pool ----
  function depositPool() {
    var root = IFLRouter.outlet();
    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/calculators">Calculators</a> › Deposit Pool Profit Distribution</nav>' +
      '<h1>🏦 Deposit Pool Profit Distribution</h1>' +
      '<p class="text-secondary">Based on Box 8.1 (Chapter 8, §8.5.2): deposits are pooled by tenor, each tenor gets a weightage, and the pool\'s profit share is distributed by weighted average — but a LOSS is always split strictly by capital ratio, ignoring weightage entirely.</p>' +
      '<div class="calc-block mb-4">' +
        '<div class="calc-formula">Depositor\'s share = (Amount × Weightage) ÷ Total Weighted Units × Distributable Amount</div>' +
        '<table class="calc-inputs mb-3" id="dp-table"><thead><tr><th>Tenor</th><th>Amount</th><th>Weightage</th></tr></thead><tbody>' +
          [["3-month", 3000, 0.60], ["6-month", 4000, 0.70], ["1-year", 3000, 1.00]].map(function (row, i) {
            return '<tr><td>' + row[0] + '</td>' +
              '<td><input type="number" id="dp-amt-' + i + '" value="' + row[1] + '" min="0" style="width:110px;"></td>' +
              '<td><input type="number" id="dp-w-' + i + '" value="' + row[2] + '" min="0" max="1" step="0.05" style="width:80px;"></td></tr>';
          }).join("") +
        '</tbody></table>' +
        '<div class="grid-2 mb-3">' +
          '<div><label>Amount to distribute this period</label><input type="number" id="dp-profit" value="500"></div>' +
          '<div><label>Scenario</label><div class="level-switch"><button data-scenario="profit" class="active">Profit</button><button data-scenario="loss">Loss</button></div></div>' +
        '</div>' +
        '<div id="dp-result"></div>' +
      '</div>';

    var scenario = "profit";
    function recalc() {
      var rows = [0, 1, 2].map(function (i) { return { label: ["3-month", "6-month", "1-year"][i], amt: num("dp-amt-" + i), w: num("dp-w-" + i) }; });
      var distributable = num("dp-profit");
      var totalCapital = rows.reduce(function (s, r) { return s + r.amt; }, 0);
      var html = "";
      if (scenario === "profit") {
        var totalWeighted = rows.reduce(function (s, r) { return s + r.amt * r.w; }, 0);
        html = '<ol class="calc-steps mb-2">' + rows.map(function (r) {
          return "<li>" + r.label + ": " + fmtMoney(r.amt) + " × " + r.w + " = " + fmtMoney(r.amt * r.w) + " weighted units</li>";
        }).join("") + "<li>Total weighted units = " + fmtMoney(totalWeighted) + "</li></ol>" +
          '<table class="calc-inputs"><thead><tr><th>Tenor</th><th>Share of profit</th><th>Effective rate</th></tr></thead><tbody>' +
          rows.map(function (r) {
            var share = totalWeighted ? (r.amt * r.w / totalWeighted) * distributable : 0;
            var rate = r.amt ? (share / r.amt) * 100 : 0;
            return "<tr><td>" + r.label + "</td><td><strong>" + fmtMoney(share) + "</strong></td><td>" + fmtPct(rate) + "</td></tr>";
          }).join("") + '</tbody></table>' +
          '<div class="calc-result mt-2">Longer-tenor deposits earn a higher effective rate purely from their higher weightage — everyone still shares the SAME underlying bank/pool profit ratio.</div>';
      } else {
        html = '<div class="callout callout-warning mb-2"><div class="callout-title">⚠️ Loss scenario — weightage is ignored</div>Per the Musharakah rule, a loss to the pool is distributed strictly by CAPITAL ratio, never by weightage.</div>' +
          '<table class="calc-inputs"><thead><tr><th>Tenor</th><th>Capital ratio</th><th>Share of loss</th></tr></thead><tbody>' +
          rows.map(function (r) {
            var ratio = totalCapital ? r.amt / totalCapital : 0;
            var share = ratio * distributable;
            return "<tr><td>" + r.label + "</td><td>" + fmtPct(ratio * 100) + "</td><td><strong>" + fmtMoney(share) + "</strong></td></tr>";
          }).join("") + '</tbody></table>' +
          '<div class="calc-result mt-2">Notice the weightage columns above become irrelevant here — only each depositor\'s share of total capital (' + fmtMoney(totalCapital) + ') matters.</div>';
      }
      document.getElementById("dp-result").innerHTML = html;
    }
    IFLDom.qsa("#dp-table input, #dp-profit", root).forEach(function (i) { i.addEventListener("input", recalc); });
    IFLDom.qsa("[data-scenario]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        scenario = btn.getAttribute("data-scenario");
        IFLDom.qsa("[data-scenario]", root).forEach(function (b) { b.classList.toggle("active", b === btn); });
        recalc();
      });
    });
    recalc();
  }

  // ---- Tool 2: Murabaha/Musawamah Pricing ----
  function murabahaPricing() {
    var root = IFLRouter.outlet();
    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/calculators">Calculators</a> › Murabaha / Musawamah Pricing</nav>' +
      '<h1>🧾 Murabaha / Musawamah Pricing</h1>' +
      '<p class="text-secondary">Both are cost-plus economically: Sale Price = Cost + Profit. The difference is disclosure — Murabaha requires the bank to reveal its cost and profit margin to the buyer; Musawamah does not (only the final bargained price is disclosed).</p>' +
      '<div class="calc-block mb-4">' +
        '<div class="calc-formula">Sale Price = Acquisition Cost + Profit &nbsp;|&nbsp; Markup % = Profit ÷ Cost × 100</div>' +
        '<div class="grid-2 mb-3">' +
          '<div><label>Bank\'s acquisition cost</label><input type="number" id="mp-cost" value="450000"></div>' +
          '<div><label>Profit added</label><input type="number" id="mp-profit" value="50000"></div>' +
        '</div>' +
        '<div class="mb-3"><label>Contract type</label><div class="level-switch"><button data-mode="murabaha" class="active">Murabaha (cost disclosed)</button><button data-mode="musawamah">Musawamah (cost undisclosed)</button></div></div>' +
        '<div id="mp-result"></div>' +
      '</div>';
    var mode = "murabaha";
    function recalc() {
      var cost = num("mp-cost"), profit = num("mp-profit");
      var price = cost + profit;
      var markup = cost ? (profit / cost) * 100 : 0;
      var html = '<ol class="calc-steps mb-2">' +
        '<li>Sale Price = ' + fmtMoney(cost) + ' + ' + fmtMoney(profit) + ' = <strong>' + fmtMoney(price) + '</strong></li>' +
        '<li>Markup on cost = ' + fmtMoney(profit) + ' ÷ ' + fmtMoney(cost) + ' × 100 ≈ ' + fmtPct(markup) + '</li>' +
      '</ol>' +
      '<div class="calc-result">Final sale price: <strong>' + fmtMoney(price) + '</strong> (' + fmtPct(markup) + ' markup)</div>' +
      (mode === "murabaha" ?
        '<p class="text-sm text-secondary mt-2">As Murabaha, the bank MUST disclose both the ' + fmtMoney(cost) + ' cost and the ' + fmtMoney(profit) + ' profit margin to the buyer — concealing either would invalidate it as Murabaha (it would only be valid as an ordinary Musawamah sale).</p>' :
        '<p class="text-sm text-secondary mt-2">As Musawamah, the bank discloses only the final ' + fmtMoney(price) + ' price — the buyer never learns the ' + fmtMoney(cost) + ' cost basis or the exact profit taken.</p>');
      document.getElementById("mp-result").innerHTML = html;
    }
    IFLDom.qsa("#mp-cost, #mp-profit", root).forEach(function (i) { i.addEventListener("input", recalc); });
    IFLDom.qsa("[data-mode]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-mode");
        IFLDom.qsa("[data-mode]", root).forEach(function (b) { b.classList.toggle("active", b === btn); });
        recalc();
      });
    });
    recalc();
  }

  // ---- Tool 3: Musharakah Profit & Loss Split ----
  function musharakahSplit() {
    var root = IFLRouter.outlet();
    root.innerHTML =
      '<nav class="text-sm text-muted mb-3"><a data-nav="#/calculators">Calculators</a> › Musharakah Profit &amp; Loss Split</nav>' +
      '<h1>🤝 Musharakah Profit &amp; Loss Split</h1>' +
      '<p class="text-secondary">The single most-tested Musharakah rule (§12.3.4): the PROFIT ratio can be freely agreed (e.g. to reward a working partner), but the LOSS ratio must always exactly track each partner\'s capital contribution — this calculator enforces that rule regardless of what you enter for loss.</p>' +
      '<div class="calc-block mb-4">' +
        '<div class="calc-formula">Profit: per the AGREED ratio &nbsp;|&nbsp; Loss: always per the CAPITAL ratio, no exceptions</div>' +
        '<div class="grid-2 mb-3">' +
          '<div><label>Partner A capital</label><input type="number" id="ms-capA" value="40000"></div>' +
          '<div><label>Partner B capital</label><input type="number" id="ms-capB" value="60000"></div>' +
        '</div>' +
        '<div class="grid-2 mb-3">' +
          '<div><label>Partner A agreed profit share (%)</label><input type="number" id="ms-profitA" value="50" min="0" max="100"></div>' +
          '<div><label class="flex items-center gap-2"><input type="checkbox" id="ms-sleeping" style="width:auto;"> Partner A is a declared sleeping (non-working) partner</label></div>' +
        '</div>' +
        '<div class="mb-3"><label>Venture result</label><div class="level-switch"><button data-result="profit" class="active">Profit</button><button data-result="loss">Loss</button></div>' +
          '<input type="number" id="ms-amount" value="20000" class="mt-2"></div>' +
        '<div id="ms-result"></div>' +
      '</div>';
    var resultType = "profit";
    function recalc() {
      var capA = num("ms-capA"), capB = num("ms-capB");
      var totalCap = capA + capB;
      var capRatioA = totalCap ? capA / totalCap : 0;
      var profitPctA = Math.min(100, Math.max(0, num("ms-profitA")));
      var sleeping = document.getElementById("ms-sleeping").checked;
      var amount = num("ms-amount");
      var html = "";
      var warning = "";
      if (sleeping && profitPctA / 100 > capRatioA + 1e-9) {
        warning = '<div class="callout callout-warning mb-2"><div class="callout-title">⚠️ Rule violation caught</div>Partner A is declared a sleeping partner but was given ' + fmtPct(profitPctA) + ' of profit, which exceeds their ' + fmtPct(capRatioA * 100) + ' capital ratio. Per the Abu Hanifa/majority view (§12.3.4), a sleeping partner\'s profit share cannot exceed their capital ratio. Capping it at ' + fmtPct(capRatioA * 100) + ' below.</div>';
        profitPctA = capRatioA * 100;
      }
      if (resultType === "profit") {
        var shareA = amount * (profitPctA / 100);
        var shareB = amount - shareA;
        html = warning + '<ol class="calc-steps mb-2">' +
          '<li>Agreed profit ratio: A = ' + fmtPct(profitPctA) + ', B = ' + fmtPct(100 - profitPctA) + ' (independent of capital ratio).</li>' +
          '<li>Partner A profit = ' + fmtPct(profitPctA) + ' × ' + fmtMoney(amount) + ' = <strong>' + fmtMoney(shareA) + '</strong></li>' +
          '<li>Partner B profit = ' + fmtMoney(amount) + ' − ' + fmtMoney(shareA) + ' = <strong>' + fmtMoney(shareB) + '</strong></li>' +
        '</ol><div class="calc-result">Profit split: A gets ' + fmtMoney(shareA) + ', B gets ' + fmtMoney(shareB) + '.</div>';
      } else {
        var lossA = amount * capRatioA;
        var lossB = amount - lossA;
        html = '<div class="callout callout-note mb-2"><div class="callout-title">Loss ignores the profit ratio entirely</div>Even though the profit ratio above is ' + fmtPct(profitPctA) + '/' + fmtPct(100 - profitPctA) + ', a LOSS must follow the CAPITAL ratio (' + fmtPct(capRatioA * 100) + '/' + fmtPct((1 - capRatioA) * 100) + ') — no exceptions, under any school of thought.</div>' +
          '<ol class="calc-steps mb-2">' +
          '<li>Capital ratio: A = ' + fmtPct(capRatioA * 100) + ', B = ' + fmtPct((1 - capRatioA) * 100) + '</li>' +
          '<li>Partner A loss = ' + fmtPct(capRatioA * 100) + ' × ' + fmtMoney(amount) + ' = <strong>' + fmtMoney(lossA) + '</strong></li>' +
          '<li>Partner B loss = ' + fmtMoney(amount) + ' − ' + fmtMoney(lossA) + ' = <strong>' + fmtMoney(lossB) + '</strong></li>' +
        '</ol><div class="calc-result">Loss split: A bears ' + fmtMoney(lossA) + ', B bears ' + fmtMoney(lossB) + '.</div>';
      }
      document.getElementById("ms-result").innerHTML = html;
    }
    IFLDom.qsa("#ms-capA, #ms-capB, #ms-profitA, #ms-sleeping, #ms-amount", root).forEach(function (i) { i.addEventListener("input", recalc); });
    IFLDom.qsa("[data-result]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        resultType = btn.getAttribute("data-result");
        IFLDom.qsa("[data-result]", root).forEach(function (b) { b.classList.toggle("active", b === btn); });
        recalc();
      });
    });
    recalc();
  }

  IFLRouter.register("/calculators", picker);
  IFLRouter.register("/calculators/deposit-pool", depositPool);
  IFLRouter.register("/calculators/murabaha-pricing", murabahaPricing);
  IFLRouter.register("/calculators/musharakah-split", musharakahSplit);
})();
