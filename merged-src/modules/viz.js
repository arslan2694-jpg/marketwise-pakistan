/* Small chart kit for the calculators: a part-to-whole bar, labelled bars and a line chart.
   Marks carry identity by position, label and legend — never by colour alone; values are always
   printed as text beside the marks, so every chart is readable without hovering. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h;
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, text) { var e = document.createElementNS(NS, tag); Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); }); if (text != null) e.textContent = text; return e; }
  function fmt(x, d) { var v = Number(x); if (!isFinite(v)) v = 0; return v.toLocaleString(undefined, { maximumFractionDigits: d == null ? (Math.abs(v) < 100 ? 2 : 0) : d }); }
  function legend(names) { return h('div.viz-legend', names.map(function (nm, i) { return h('span.viz-key', h('i.viz-sw.s' + (i + 1)), nm); })); }

  /* Part-to-whole: one bar split into up to four labelled parts. Negative or zero parts are listed but not drawn. */
  function split(spec) {
    var parts = spec.parts.filter(function (p) { return isFinite(p.value); }), total = 0;
    parts.forEach(function (p) { if (p.value > 0) total += p.value; });
    var bar = h('div.viz-split', { role: 'img', 'aria-label': spec.title + ': ' + parts.map(function (p) { return p.label + ' ' + fmt(p.value); }).join(', ') },
      parts.map(function (p, i) { return p.value > 0 && total ? h('span.s' + (i + 1), { style: { width: (100 * p.value / total) + '%' }, title: p.label + ': ' + fmt(p.value) + ' (' + fmt(100 * p.value / total, 1) + '%)' }) : null; }));
    var keys = h('div.viz-legend', parts.map(function (p, i) {
      return h('span.viz-key', h('i.viz-sw.s' + (i + 1)), p.label, h('strong.tabular', ' ' + fmt(p.value)), total && p.value > 0 ? h('span.muted', ' · ' + fmt(100 * p.value / total, 1) + '%') : null);
    }));
    return h('figure.viz', h('figcaption', spec.title, spec.total === false || !total ? null : h('span.muted', ' — total ' + fmt(total))), bar, keys, spec.note ? h('p.small.muted', spec.note) : null);
  }

  /* Labelled horizontal bars around a zero line (handles losses). */
  function bars(spec) {
    var max = 0, min = 0; spec.items.forEach(function (it) { max = Math.max(max, it.value); min = Math.min(min, it.value); });
    var span = (max - min) || 1, zero = 100 * (-min) / span;
    var rows = spec.items.map(function (it) {
      var w = 100 * Math.abs(it.value) / span, left = it.value >= 0 ? zero : zero - w;
      return h('div.viz-row', h('span.viz-lbl', it.label),
        h('span.viz-track', { title: it.label + ': ' + fmt(it.value) }, h('span.viz-zero', { style: { left: zero + '%' } }), h('span.viz-bar' + (it.value < 0 ? '.neg' : '') + (it.tone ? '.' + it.tone : ''), { style: { left: left + '%', width: Math.max(w, it.value ? 0.6 : 0) + '%' } })),
        h('span.viz-val.tabular', (it.value < 0 ? '−' : '') + fmt(Math.abs(it.value)) + (spec.unit || '')));
    });
    return h('figure.viz', h('figcaption', spec.title), h('div.viz-bars', { role: 'img', 'aria-label': spec.title + ': ' + spec.items.map(function (it) { return it.label + ' ' + fmt(it.value); }).join(', ') }, rows), spec.note ? h('p.small.muted', spec.note) : null);
  }

  /* Line chart with a hover/keyboard read-out. One y-axis; up to three series. */
  function line(spec) {
    var W = 640, H = 220, L = 54, R = 14, T = 12, B = 30, n = spec.x.length;
    var max = 0, min = 0; spec.series.forEach(function (s) { s.values.forEach(function (v) { if (isFinite(v)) { max = Math.max(max, v); min = Math.min(min, v); } }); });
    if (max === min) max = min + 1;
    var pad = (max - min) * 0.08; max += pad;
    function X(i) { return L + (n > 1 ? i / (n - 1) : 0.5) * (W - L - R); }
    function Y(v) { return T + (1 - (v - min) / (max - min)) * (H - T - B); }
    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'chart-svg viz-line', role: 'img', 'aria-label': spec.title + '. ' + spec.series.map(function (s) { return s.name + ' from ' + fmt(s.values[0]) + ' to ' + fmt(s.values[n - 1]); }).join('; ') });
    for (var g = 0; g <= 4; g++) {
      var val = min + (max - min) * g / 4, y = Y(val);
      svg.appendChild(el('line', { x1: L, x2: W - R, y1: y, y2: y, class: 'viz-grid' }));
      svg.appendChild(el('text', { x: L - 8, y: y + 4, 'text-anchor': 'end', class: 'viz-tick' }, fmt(val, max - min < 20 ? 1 : 0) + (spec.unit || '')));
    }
    var ticks = n <= 8 ? spec.x.map(function (_, i) { return i; }) : [0, Math.round((n - 1) / 4), Math.round((n - 1) / 2), Math.round(3 * (n - 1) / 4), n - 1];
    ticks.forEach(function (i) { svg.appendChild(el('text', { x: X(i), y: H - 8, 'text-anchor': 'middle', class: 'viz-tick' }, String(spec.x[i]))); });
    spec.series.forEach(function (s, k) {
      var d = s.values.map(function (v, i) { return (i ? 'L' : 'M') + X(i).toFixed(1) + ',' + Y(v).toFixed(1); }).join(' ');
      svg.appendChild(el('path', { d: d, class: 'viz-path s' + (k + 1) + (s.dashed ? ' dashed' : '') }));
      if (n <= 12) s.values.forEach(function (v, i) { svg.appendChild(el('circle', { cx: X(i), cy: Y(v), r: 4, class: 'viz-dot s' + (k + 1) })); });
    });
    var cross = el('line', { y1: T, y2: H - B, class: 'viz-cross', visibility: 'hidden' }); svg.appendChild(cross);
    var read = h('div.viz-read.small', { 'aria-live': 'off' });
    function show(i) {
      i = Math.max(0, Math.min(n - 1, i));
      cross.setAttribute('x1', X(i)); cross.setAttribute('x2', X(i)); cross.setAttribute('visibility', 'visible');
      read.innerHTML = ''; u.append(read, [h('strong', (spec.xLabel || '') + ' ' + spec.x[i] + ': '), spec.series.map(function (s, k) { return h('span.viz-key', h('i.viz-sw.s' + (k + 1)), s.name + ' ', h('strong.tabular', fmt(s.values[i]) + (spec.unit || ''))); })]);
      slider.value = i;
    }
    svg.addEventListener('pointermove', function (e) { var r = svg.getBoundingClientRect(), px = (e.clientX - r.left) / r.width * W; show(Math.round((px - L) / (W - L - R) * (n - 1))); });
    var slider = h('input.viz-scrub', { type: 'range', min: 0, max: n - 1, step: 1, value: 0, 'aria-label': 'Move along the chart: ' + (spec.xLabel || 'point') });
    slider.addEventListener('input', function () { show(Number(slider.value)); });
    var fig = h('figure.viz', h('figcaption', spec.title), spec.series.length > 1 ? legend(spec.series.map(function (s) { return s.name; })) : null, svg, n > 2 ? slider : null, read, spec.note ? h('p.small.muted', spec.note) : null);
    show(0); cross.setAttribute('visibility', 'hidden');
    return fig;
  }

  IFL.viz = { split: split, bars: bars, line: line, fmt: fmt, render: function (spec) { return !spec ? null : spec.kind === 'split' ? split(spec) : spec.kind === 'bars' ? bars(spec) : spec.kind === 'line' ? line(spec) : null; } };

  /* ---------- Charts for the calculators (same formulas as the calculators themselves) ---------- */
  var CH = {
    'credit-price': function (v) { var p = v.cash * v.markup / 100; return { kind: 'split', title: 'What the credit price is made of', parts: [{ label: 'Cost to the bank', value: v.cash }, { label: 'Agreed profit', value: p }], note: 'The whole bar is the debt. It is fixed at the sale and does not grow if payment is late.' }; },
    'dm-schedule': function (v) {
      var months = Math.max(1, Math.min(600, Math.round(v.months) || 1)), inv = v.cost * v.share / 100, unit = inv / months, out = inv, rent = [], units = [], x = [];
      for (var m = 1; m <= months; m++) { rent.push(out * v.rate / 1200); units.push(unit); x.push(m); out -= unit; }
      return { kind: 'line', title: 'Monthly payment over the tenure', xLabel: 'Month', x: x, series: [{ name: 'Rent on the bank’s remaining share', values: rent }, { name: 'Unit purchase', values: units, dashed: true }], note: 'Rent falls every month because the client owns more of the house; the unit purchase stays level.' };
    },
    'floating-rent': function (v) {
      var raw = [v.r1], app = [v.r1]; [v.b2, v.b3, v.b4].forEach(function (b) { var r = b + v.spread; raw.push(r); app.push(Math.min(v.cap, Math.max(v.floor, r))); });
      return { kind: 'line', title: 'Rental rate each period', xLabel: 'Period', unit: '%', x: [1, 2, 3, 4], series: [{ name: 'Rate applied (between floor and cap)', values: app }, { name: 'Benchmark + spread', values: raw, dashed: true }], note: 'Where the two lines part, the floor or the cap is protecting one of the parties.' };
    },
    'mudarabah-mixed': function (v) { var tot = v.dep + v.bank, own = tot ? v.profit * v.bank / tot : 0, rest = v.profit - own, mud = rest * v.ratio / 100; return { kind: 'split', title: 'Who receives the profit', parts: [{ label: 'Bank — on its own capital', value: own }, { label: 'Bank — Mudarib share', value: mud }, { label: 'Depositors', value: rest - mud }] }; },
    'pool-weightage': function (v) {
      if (v.profit < 0) return null;
      var D = [v.d1, v.d2, v.d3], W = [v.w1, v.w2, v.w3], bank = v.profit * v.mudarib / 100, pool = v.profit - bank, wa = D.map(function (d, i) { return d * W[i]; }), wt = wa[0] + wa[1] + wa[2];
      if (!wt) return null;
      return { kind: 'split', title: 'How the pool’s profit is shared', parts: [{ label: 'Bank (Mudarib)', value: bank }, { label: '3-month tier', value: wa[0] / wt * pool }, { label: '6-month tier', value: wa[1] / wt * pool }, { label: '12-month tier', value: wa[2] / wt * pool }] };
    },
    'sukuk-distribution': function (v) { var per = v.periods > 0 ? Math.round(v.periods) : 1; return { kind: 'split', title: 'Total cash flow to Sukuk holders', parts: [{ label: 'Principal redeemed at maturity', value: v.principal }, { label: 'Periodic distributions (' + per + ')', value: v.principal * v.rate / 100 * per }] }; },
    'qard-vs-interest': function (v) { var months = Math.max(0, v.months), x = v.principal * v.rate / 100 * months / 12; return { kind: 'bars', title: 'What the borrower must repay', items: [{ label: 'Qard Hasan', value: v.principal }, { label: 'Interest loan', value: v.principal + x, tone: 'warn' }], note: 'The gap between the two bars (' + fmt(x) + ') is the stipulated excess — Riba.' }; },
    'salam-discount': function (v) { var cap = v.qty * v.price, val = v.qty * v.spot; return val >= cap ? { kind: 'split', title: 'Expected value of the goods at delivery', parts: [{ label: 'Salam capital paid now', value: cap }, { label: 'Buyer’s discount', value: val - cap }] } : { kind: 'bars', title: 'Capital paid versus expected value', items: [{ label: 'Salam capital paid now', value: cap }, { label: 'Expected value at delivery', value: val }] }; },
    'takaful-waqf': function (v) { var fee = v.contrib * v.fee / 100, uw = v.contrib - fee - v.claims; return uw >= 0 ? { kind: 'split', title: 'Where the participants’ contributions go', parts: [{ label: 'Wakalah fee (operator)', value: fee }, { label: 'Claims and re-Takaful', value: v.claims }, { label: 'Underwriting surplus (participants)', value: uw }] } : { kind: 'bars', title: 'Contributions against outgoings', items: [{ label: 'Contributions', value: v.contrib }, { label: 'Wakalah fee', value: fee }, { label: 'Claims and re-Takaful', value: v.claims }, { label: 'Deficit (Qard from operator)', value: uw }] }; },
    'sukuk-trade': function (v) { return { kind: 'split', title: 'Composition of the asset pool', parts: [{ label: 'Real assets, usufruct, inventory', value: v.real }, { label: 'Receivables (debts)', value: v.recv }, { label: 'Cash', value: v.cash }], note: 'Only the first part is non-liquid; the tests below ask how large it is.' }; },
    'mudarabah-offset': function (v) { return { kind: 'bars', title: 'Result of each deal, and the net', items: [{ label: 'Deal 1', value: v.d1 }, { label: 'Deal 2', value: v.d2 }, { label: 'Deal 3', value: v.d3 }, { label: 'Deal 4', value: v.d4 }, { label: 'Net result', value: v.d1 + v.d2 + v.d3 + v.d4, tone: 'net' }], note: 'Only the net is shared: losses are set off against profits first.' }; },
    'parallel-istisna': function (v) { return v.sale >= v.cost ? { kind: 'split', title: 'The customer’s price', parts: [{ label: 'Paid to the contractor', value: v.cost }, { label: 'Bank’s margin', value: v.sale - v.cost }] } : null; },
    'purification': function (v) { var rate = v.rev ? v.nc / v.rev : 0, amt = Math.max(0, Math.min(v.div, rate * v.div)); return { kind: 'split', title: 'The dividend after purification', parts: [{ label: 'Kept by the investor', value: v.div - amt }, { label: 'Given to charity', value: amt }] }; },
    'musharakah-pl': function (v) {
      var tot = v.ca + v.cb; if (!tot) return null;
      var ka = 100 * v.ca / tot, pa = v.pa, pb = 100 - pa;
      if (/^Yes/.test(v.sa) && pa > ka) { pa = ka; pb = 100 - pa; }
      if (/^Yes/.test(v.sb) && pb > 100 - ka) { pb = 100 - ka; pa = 100 - pb; }
      return v.result >= 0
        ? { kind: 'split', title: 'Profit shared by the agreed ratio', parts: [{ label: 'Partner A', value: v.result * pa / 100 }, { label: 'Partner B', value: v.result * pb / 100 }], note: 'Capital is ' + fmt(ka, 1) + ' : ' + fmt(100 - ka, 1) + '. Profit may follow a different ratio; a loss never does.' }
        : { kind: 'split', title: 'Loss borne by capital ratio', parts: [{ label: 'Partner A', value: -v.result * ka / 100 }, { label: 'Partner B', value: -v.result * (100 - ka) / 100 }], note: 'The agreed profit ratio is ignored for a loss.' };
    }
  };
  IFL.calcChart = function (type, vals) { try { return CH[type] ? IFL.viz.render(CH[type](vals)) : null; } catch (e) { return null; } };
  IFL.calcHasChart = function (type) { return !!CH[type]; };
})();
