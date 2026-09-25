/* Reusable calculation components. Defaults reproduce the textbook's own figures where the book gives
   them; any changed inputs are labelled "Practice Example — generated for learning". */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h;
  function n(x, d) { var v = Number(x); if (!isFinite(v)) v = 0; return v.toLocaleString(undefined, { maximumFractionDigits: d == null ? 2 : d }); }
  function r2(x) { return Math.round(x * 100) / 100; }

  var CALCS = {
    'exchange-rule': {
      title: 'Exchange-rule checker (Riba al-Fadl / Bai‘ al-Sarf)', source: 'Imam Nawawi\'s summary, Section 3.2.1',
      inputs: [
        { k: 'a', label: 'Item given', type: 'select', options: ['Gold', 'Silver', 'US dollars', 'Japanese yen', 'Pakistani rupees', 'Wheat', 'Dates', 'Rice', 'A car', 'A machine'], v: 'Gold' },
        { k: 'b', label: 'Item received', type: 'select', options: ['Gold', 'Silver', 'US dollars', 'Japanese yen', 'Pakistani rupees', 'Wheat', 'Dates', 'Rice', 'A car', 'A machine'], v: 'Gold' }
      ],
      textbook: {},
      compute: function (v) {
        var money = ['Gold', 'Silver', 'US dollars', 'Japanese yen', 'Pakistani rupees'], food = ['Wheat', 'Dates', 'Rice'];
        var cls = function (x) { return money.indexOf(x) > -1 ? 'money' : food.indexOf(x) > -1 ? 'food' : 'other'; };
        var ca = cls(v.a), cb = cls(v.b), res, excess, delay;
        if (v.a === v.b && ca !== 'other') { res = 'Same commodity'; excess = 'Prohibited'; delay = 'Prohibited'; }
        else if (ca === cb && ca !== 'other') { res = 'Different commodities with the same ‘Illah'; excess = 'Allowed'; delay = 'Prohibited'; }
        else { res = 'Different ‘Illah (or non-Ribawi item)'; excess = 'Allowed'; delay = 'Allowed'; }
        return { steps: ['Classify each item: ' + v.a + ' → ' + ca + '; ' + v.b + ' → ' + cb + '.', 'Case: ' + res + '.'], result: 'Excess: ' + excess + ' · Delay: ' + delay,
          meaning: excess === 'Prohibited' ? 'Exchange must be equal in quantity and hand to hand (Mithlan bi mithlin, yadan bi yadin).' : delay === 'Prohibited' ? 'Quantities may differ but settlement must be spot.' : 'Both unequal amounts and deferment are permitted, subject to the general rules of sale.' };
      }
    },
    'fx-settlement': {
      title: 'Settling a foreign-currency debt', source: 'Section 4.7.4 (Saudi Riyal example)',
      inputs: [{ k: 'debt', label: 'Debt (foreign currency units)', v: 10 }, { k: 'rateContract', label: 'Rate on contract date', v: 16 }, { k: 'rateSettle', label: 'Rate on settlement date', v: 17 }],
      textbook: null,
      compute: function (v) {
        var pay = v.debt * v.rateSettle;
        return { formula: 'Local payment = debt in foreign currency × spot rate on the settlement date',
          steps: ['The debtor owes exactly ' + n(v.debt) + ' units of the foreign currency, whatever its value.', 'If paid in local currency, use the settlement-date rate: ' + n(v.debt) + ' × ' + n(v.rateSettle) + ' = ' + n(pay) + '.', 'Using the contract-date rate (' + n(v.debt * v.rateContract) + ') would not be the agreed debt.'],
          result: 'Pay ' + n(pay) + ' in local currency (or ' + n(v.debt) + ' foreign units)', meaning: 'Debts are repaid in the currency of the debt; conversion is at the spot rate on the day of payment. (Rates here are practice inputs.)' };
      }
    },
    'promise-breach': {
      title: 'Loss recoverable on breach of a promise to purchase', source: 'Section 5.6 (car example)',
      inputs: [{ k: 'cost', label: 'Bank\'s purchase cost', v: 18000 }, { k: 'promised', label: 'Promised purchase price', v: 20000 }, { k: 'resale', label: 'Resale price after breach', v: 17000 }, { k: 'hj', label: 'Hamish Jiddiyah held', v: 2000 }],
      textbook: { cost: 18000, promised: 20000, resale: 17000 },
      compute: function (v) {
        var loss = Math.max(0, v.cost - v.resale), fromHJ = Math.min(loss, v.hj), refund = Math.max(0, v.hj - fromHJ);
        return { formula: 'Recoverable loss = max(0, cost − resale price)   (expected profit is NOT recoverable)',
          steps: ['Actual loss = ' + n(v.cost) + ' − ' + n(v.resale) + ' = ' + n(loss) + '.', 'Expected profit (' + n(v.promised - v.cost) + ') cannot be claimed.', 'Deduct ' + n(fromHJ) + ' from Hamish Jiddiyah; return ' + n(refund) + ' to the promisor.'],
          result: 'Recover ' + n(loss), meaning: 'A binding promise makes the promisor liable only for the promisee\'s actual loss.' };
      }
    },
    'credit-price': {
      title: 'Credit price and instalments', source: 'Section 6.5.3 (practice calculator)',
      inputs: [{ k: 'cash', label: 'Cash price', v: 100000 }, { k: 'markup', label: 'Agreed mark-up (%)', v: 12 }, { k: 'months', label: 'Number of monthly instalments', v: 12 }, { k: 'late', label: 'Months paid late (for illustration)', v: 2 }],
      textbook: null,
      compute: function (v) {
        var price = v.cash * (1 + v.markup / 100), inst = price / Math.max(1, v.months);
        return { formula: 'Credit price = cash price × (1 + mark-up); fixed at the contract and never increased',
          steps: ['Credit price = ' + n(v.cash) + ' × ' + (1 + v.markup / 100).toFixed(4) + ' = ' + n(price) + '.', 'Instalment = ' + n(price) + ' ÷ ' + v.months + ' = ' + n(inst) + '.', 'Paying ' + v.late + ' month(s) late does not change the debt of ' + n(price) + '; any penalty goes to charity, not the seller.'],
          result: 'Debt fixed at ' + n(price), meaning: 'Time may be priced into a sale before it is executed; once sold, the price is a debt that cannot grow.' };
      }
    },
    'pool-weightage': {
      title: 'Mudarabah deposit pool — weightages', source: 'Box 8.1',
      inputs: [{ k: 'd1', label: '3-month deposits', v: 3000 }, { k: 'w1', label: 'Weightage', v: 0.6, step: 0.05 }, { k: 'd2', label: '6-month deposits', v: 4000 }, { k: 'w2', label: 'Weightage', v: 0.7, step: 0.05 }, { k: 'd3', label: '1-year deposits', v: 3000 }, { k: 'w3', label: 'Weightage', v: 1, step: 0.05 }, { k: 'profit', label: 'Pool profit (negative = loss)', v: 1000 }, { k: 'mudarib', label: 'Bank\'s Mudarib share (%)', v: 50 }],
      textbook: { d1: 3000, w1: 0.6, d2: 4000, w2: 0.7, d3: 3000, w3: 1, profit: 1000, mudarib: 50 },
      compute: function (v) {
        var D = [v.d1, v.d2, v.d3], W = [v.w1, v.w2, v.w3], tot = D[0] + D[1] + D[2];
        if (v.profit < 0) {
          var sh = D.map(function (d) { return r2(v.profit * d / tot); });
          return { formula: 'Loss share = loss × deposit ÷ total deposits (weightages do not apply)', steps: ['Total deposits ' + n(tot) + '.', 'Shares: ' + sh.map(n).join(', ') + '.', 'The bank as Mudarib earns nothing in a loss period.'], result: 'Loss split ' + sh.map(n).join(' / '), meaning: 'Losses follow capital, not weightages.' };
        }
        var bank = v.profit * v.mudarib / 100, pool = v.profit - bank;
        var wa = D.map(function (d, i) { return d * W[i]; }), wt = wa[0] + wa[1] + wa[2];
        var pr = wa.map(function (x) { return x / wt * pool; });
        return { formula: 'Tier profit = pool share × (deposit × weightage) ÷ Σ(deposit × weightage)',
          steps: ['Bank (Mudarib) = ' + n(v.profit) + ' × ' + v.mudarib + '% = ' + n(bank) + '; pool = ' + n(pool) + '.', 'Weighted amounts: ' + wa.map(n).join(', ') + ' (total ' + n(wt) + ').', 'Tier profits: ' + pr.map(function (x) { return n(x, 0); }).join(', ') + '.', 'Monthly rates: ' + pr.map(function (x, i) { return D[i] ? (100 * x / D[i]).toFixed(2) + '%' : '—'; }).join(', ') + '.'],
          result: 'Profit ' + pr.map(function (x) { return n(x, 0); }).join(' / '), meaning: 'Longer tenors receive higher weightages in profit; the textbook figures give 119, 184 and 197.' };
      }
    },
    'purification': {
      title: 'Dividend purification', source: 'Section 8.8.1 (Al Meezan method; practice calculator)',
      inputs: [{ k: 'nc', label: 'Company\'s non-compliant income', v: 2 }, { k: 'rev', label: 'Company\'s gross revenue', v: 100 }, { k: 'div', label: 'Dividend you received', v: 5000 }],
      textbook: null,
      compute: function (v) {
        var rate = v.rev ? v.nc / v.rev : 0, amt = rate * v.div;
        return { formula: 'Charity rate = non-compliant income ÷ gross revenue; charity amount = rate × dividend',
          steps: ['Rate = ' + n(v.nc) + ' ÷ ' + n(v.rev) + ' = ' + (rate * 100).toFixed(2) + '%.', 'Charity = ' + (rate * 100).toFixed(2) + '% × ' + n(v.div) + ' = ' + n(amt) + '.'],
          result: 'Give ' + n(amt) + ' to charity', meaning: 'Purification removes the impermissible portion of income; it does not make a prohibited business acceptable.' };
      }
    },
    'salam-profit': {
      title: 'Salam with a third-party promise', source: 'Box 10.4',
      inputs: [{ k: 'salam', label: 'Salam price paid (Rs m)', v: 100 }, { k: 'promise', label: 'Promised resale price (Rs m)', v: 115 }, { k: 'hj', label: 'Hamish Jiddiyah (Rs m)', v: 15 }, { k: 'market', label: 'Market price if promisor defaults (Rs m)', v: 108 }],
      textbook: { salam: 100, promise: 115, hj: 15 },
      compute: function (v) {
        var margin = v.promise - v.salam, loss = Math.max(0, v.promise - v.market), cover = Math.min(loss, v.hj);
        return { formula: 'Gross margin = promised price − Salam price; on default, recover min(actual loss, HJ)',
          steps: ['Gross margin if C buys: ' + n(v.promise) + ' − ' + n(v.salam) + ' = ' + n(margin) + '.', 'If C defaults and the bank sells at ' + n(v.market) + ': actual loss vs promise = ' + n(loss) + '.', 'Recover ' + n(cover) + ' from HJ; refund ' + n(Math.max(0, v.hj - cover)) + '.'],
          result: 'Margin ' + n(margin) + ' · Default recovery ' + n(cover), meaning: 'The bank bears delivery and price risk until it sells; HJ secures the promise but only for actual loss. (Market price is a practice input.)' };
      }
    },
    'parallel-istisna': {
      title: 'Istisna‘a with Parallel Istisna‘a margin', source: 'Box 10.16 (government road)',
      inputs: [{ k: 'sale', label: 'Istisna‘a price to customer (Rs m)', v: 1200 }, { k: 'years', label: 'Customer payment period (years)', v: 10 }, { k: 'cost', label: 'Parallel Istisna‘a price to contractor (Rs m)', v: 1000 }, { k: 'inst', label: 'Contractor instalments', v: 4 }],
      textbook: { sale: 1200, years: 10, cost: 1000, inst: 4 },
      compute: function (v) {
        return { formula: 'Bank margin = customer price − contractor price',
          steps: ['Margin = ' + n(v.sale) + ' − ' + n(v.cost) + ' = ' + n(v.sale - v.cost) + '.', 'Customer pays ' + n(v.sale / Math.max(1, v.years)) + ' per year for ' + v.years + ' years.', 'Bank pays the contractor ' + n(v.cost / Math.max(1, v.inst)) + ' per instalment (' + v.inst + ' instalments).'],
          result: 'Margin ' + n(v.sale - v.cost), meaning: 'The two contracts are independent; the bank remains liable to the customer for delivery.' };
      }
    },
    'ijarah-case': {
      title: 'Leased asset destroyed — refund under AAOIFI 8/8', source: 'Box 11.3',
      inputs: [{ k: 'outstanding', label: 'Outstanding investment + prepaid expenses', v: 370000 }, { k: 'claim', label: 'Takaful claim received', v: 450000 }, { k: 'deposit', label: 'Security deposit', v: 50000 }],
      textbook: { outstanding: 370000, claim: 450000, deposit: 50000 },
      compute: function (v) {
        var surplus = Math.max(0, v.claim - v.outstanding), shortfall = Math.max(0, v.outstanding - v.claim);
        return { formula: 'Client receives = security deposit + max(0, Takaful claim − outstanding)',
          steps: ['Surplus = ' + n(v.claim) + ' − ' + n(v.outstanding) + ' = ' + n(surplus) + '.', 'Return deposit ' + n(v.deposit) + '.', shortfall ? 'Shortfall of ' + n(shortfall) + ' is borne by the bank (lessor), not the client.' : 'No shortfall for the bank.'],
          result: 'Client receives ' + n(v.deposit + surplus), meaning: 'The lessor bears destruction risk; rent stops; excess Takaful proceeds are refunded to the client.' };
      }
    },
    'musharakah-pl': {
      title: 'Musharakah profit and loss sharing', source: 'Section 12.3.4 (practice calculator)',
      inputs: [{ k: 'ca', label: 'Partner A capital', v: 600000 }, { k: 'cb', label: 'Partner B capital', v: 400000 }, { k: 'pa', label: 'A\'s agreed profit share (%)', v: 50 }, { k: 'result', label: 'Venture result (negative = loss)', v: 120000 }],
      textbook: null,
      compute: function (v) {
        var tot = v.ca + v.cb;
        if (v.result >= 0) {
          var a = v.result * v.pa / 100;
          return { formula: 'Profit share = profit × agreed ratio', steps: ['A: ' + n(v.result) + ' × ' + v.pa + '% = ' + n(a) + '.', 'B: ' + n(v.result - a) + '.'], result: 'A ' + n(a) + ' · B ' + n(v.result - a), meaning: 'Profit follows the agreed ratio, which may differ from capital (subject to the sleeping-partner rule).' };
        }
        var la = v.result * v.ca / tot;
        return { formula: 'Loss share = loss × capital ÷ total capital (agreed profit ratio is irrelevant)', steps: ['A: ' + n(v.result) + ' × ' + (100 * v.ca / tot).toFixed(1) + '% = ' + n(la) + '.', 'B: ' + n(v.result - la) + '.'], result: 'A ' + n(la) + ' · B ' + n(v.result - la), meaning: '“Profit is based on agreement, but loss is always subject to the ratio of investment.”' };
      }
    },
    'mudarabah-mixed': {
      title: 'Bank capital inside a Mudarabah pool', source: 'Section 12.4.1 example',
      inputs: [{ k: 'dep', label: 'Depositors\' funds', v: 2000 }, { k: 'bank', label: 'Bank\'s own funds', v: 1000 }, { k: 'profit', label: 'Profit', v: 300 }, { k: 'ratio', label: 'Mudarib (bank) share of the rest (%)', v: 50 }],
      textbook: { dep: 2000, bank: 1000, profit: 300, ratio: 50 },
      compute: function (v) {
        var tot = v.dep + v.bank, own = v.profit * v.bank / tot, rest = v.profit - own, mud = rest * v.ratio / 100;
        return { formula: 'Bank = profit × bank capital ÷ total + (remaining profit × Mudarib ratio)',
          steps: ['Profit on bank capital = ' + n(v.profit) + ' × ' + n(v.bank) + ' ÷ ' + n(tot) + ' = ' + n(own) + '.', 'Remaining ' + n(rest) + ' split ' + v.ratio + ':' + (100 - v.ratio) + ' → bank ' + n(mud) + ', depositors ' + n(rest - mud) + '.'],
          result: 'Bank ' + n(own + mud) + ' · Depositors ' + n(rest - mud), meaning: 'The bank earns as partner on its own capital and as Mudarib on the depositors\' share.' };
      }
    },
    'sitara-tfc': {
      title: 'Sitara Musharakah TFC profit tiers', source: 'Box 12.3',
      inputs: [{ k: 'op', label: 'Annual operating profit (Rs m)', v: 180 }, { k: 'principal', label: 'Outstanding principal (Rs m)', v: 360 }],
      textbook: null,
      compute: function (v) {
        var l1 = Math.min(1, Math.max(0, v.op) / 100) * 12;
        var extra = Math.max(0, v.op - 100), l2 = extra / 100 * 2;
        var l2amt = l2 / 100 * v.principal;
        return { formula: 'Level I rate = min(OP,100)/100 × 12%;  Level II rate = (OP − 100)/100 × 2%, ¼ of Level II to Takaful reserve',
          steps: ['Level I rate = ' + l1.toFixed(2) + '% → ' + n(l1 / 100 * v.principal) + ' on principal ' + n(v.principal) + '.', 'Level II rate = ' + l2.toFixed(2) + '% → ' + n(l2amt) + '; Takaful reserve ¼ = ' + n(l2amt / 4) + ', to holders ' + n(l2amt * 0.75) + '.'],
          result: 'Holders ' + n(l1 / 100 * v.principal + l2amt * 0.75) + ' (Rs m, annual)', meaning: 'Return is tied to operating profit; losses hit the Takaful reserve first, then principal. (Operating-profit figure is a practice input.)' };
      }
    },
    'dm-schedule': {
      title: 'Diminishing Musharakah housing schedule', source: 'Box 12.5',
      inputs: [{ k: 'cost', label: 'House cost', v: 1000000 }, { k: 'share', label: 'Bank financing (%)', v: 80 }, { k: 'months', label: 'Tenure (months)', v: 120 }, { k: 'rate', label: 'Rental rate (% p.a.)', v: 7, step: 0.25 }],
      textbook: { cost: 1000000, share: 80, months: 120, rate: 7 },
      compute: function (v) {
        var inv = v.cost * v.share / 100, unit = inv / Math.max(1, v.months), rows = [], out = inv, totalRent = 0;
        for (var m = 1; m <= v.months; m++) { var rent = out * v.rate / 100 / 12; totalRent += rent; out -= unit; if (m <= 3 || m > v.months - 2) rows.push([m, n(unit), n(rent), n(unit + rent), n(Math.max(0, out))]); if (m === 3 && v.months > 5) rows.push(['…', '', '', '', '']); }
        return { formula: 'Monthly payment = unit price (investment ÷ months) + outstanding investment × rate ÷ 12',
          steps: ['Bank investment = ' + n(inv) + '; unit price = ' + n(unit) + '.', 'Month 1 rent = ' + n(inv) + ' × ' + v.rate + '% ÷ 12 = ' + n(inv * v.rate / 1200) + '.', 'Total rent over the term = ' + n(totalRent) + '.'],
          table: { head: ['Month', 'Unit', 'Rent', 'Total', 'Outstanding'], rows: rows },
          result: 'First payment ' + n(unit + inv * v.rate / 1200), meaning: 'Rent falls as the client buys units; textbook figures give 11,333.33 in month 1.' };
      }
    },
    'takaful-waqf': {
      title: 'Wakalah–Waqf Takaful fund', source: 'Box 16.1 (illustrative ratios)',
      inputs: [{ k: 'contrib', label: 'Participants\' contributions', v: 1000000 }, { k: 'fee', label: 'Wakalah fee (%)', v: 30 }, { k: 'claims', label: 'Claims + re-Takaful', v: 500000 }, { k: 'inv', label: 'Investment profit', v: 60000 }, { k: 'mud', label: 'Operator Mudarib share (%)', v: 40 }],
      textbook: null,
      compute: function (v) {
        var fee = v.contrib * v.fee / 100, uw = v.contrib - fee - v.claims, op = v.inv * v.mud / 100;
        return { formula: 'Underwriting result = contributions − Wakalah fee − claims;  investment profit split Mudarib : fund',
          steps: ['Operator fee = ' + n(fee) + '.', 'Underwriting ' + (uw >= 0 ? 'surplus' : 'deficit') + ' = ' + n(uw) + (uw < 0 ? ' (covered by Qard al Hasan from shareholders)' : ' (belongs to participants)') + '.', 'Investment profit: operator ' + n(op) + ', fund ' + n(v.inv - op) + '.'],
          result: 'Operator ' + n(fee + op) + ' · Fund surplus ' + n(uw + v.inv - op), meaning: 'The operator earns a fee and a Mudarib share; it does not take the underwriting surplus. (Contribution amounts are practice inputs.)' };
      }
    }
  };

  IFL.calc = function (type, note) {
    var c = CALCS[type]; if (!c) return null;
    var vals = {}; c.inputs.forEach(function (i) { vals[i.k] = i.v; });
    var out = h('div', { 'aria-live': 'polite' });
    var badge = h('span.badge');
    var inputs = h('div.inputs', c.inputs.map(function (i) {
      var id = 'calc-' + type + '-' + i.k, inp;
      if (i.type === 'select') inp = h('select.input', { id: id }, i.options.map(function (o) { return h('option', { value: o, selected: o === i.v }, o); }));
      else inp = h('input.input', { id: id, type: 'number', value: i.v, step: i.step || 'any' });
      inp.addEventListener('input', function () { vals[i.k] = i.type === 'select' ? inp.value : Number(inp.value); run(); });
      return h('div.field', h('label', { for: id }, i.label), inp);
    }));
    function isTextbook() {
      if (!c.textbook) return false;
      return Object.keys(c.textbook).every(function (k) { return Number(vals[k]) === Number(c.textbook[k]) || vals[k] === c.textbook[k]; });
    }
    function run() {
      var r;
      try { r = c.compute(vals); } catch (e) { out.innerHTML = ''; out.appendChild(h('p.notice', 'Check the inputs.')); return; }
      var tb = isTextbook();
      badge.className = 'badge ' + (tb ? 'accent' : 'gold');
      badge.textContent = c.textbook === null ? 'Practice Example — generated for learning' : tb ? 'Textbook figures (' + c.source + ')' : 'Practice Example — generated for learning';
      out.innerHTML = '';
      u.append(out, [r.formula ? h('div.formula', r.formula) : null,
        h('ol.steps-out', r.steps.map(function (s) { return h('li', s); })),
        r.table ? IFL.c.table(r.table) : null,
        h('div.result-line', r.result), h('p.small.text-2', { style: { marginTop: '4px' } }, r.meaning)]);
    }
    var root = h('div.calc', h('div.row.between', h('h4', { style: { margin: 0 } }, u.svg('calc'), ' ', c.title), badge), note ? h('p.small.muted', note) : null, inputs, out);
    run();
    return root;
  };
  IFL.calcTypes = CALCS;
})();
