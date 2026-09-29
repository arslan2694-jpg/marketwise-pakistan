
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
      title: 'Cost-plus pricing, credit price and instalments (Murabaha / Musawamah)', source: 'Sections 6.5.3, 9.3–9.6 and 9.11 (practice calculator)', topic: 't6.5.3',
      assumptions: 'Simple mark-up on cost for the whole term; no separate charge for the period before the sale; figures are illustrative.',
      inputs: [{ k: 'cash', label: 'Cost to the bank / cash price', v: 100000 }, { k: 'markup', label: 'Agreed mark-up (%)', v: 12 }, { k: 'months', label: 'Number of monthly instalments', v: 12 }, { k: 'late', label: 'Months paid late (for illustration)', v: 2 }, { k: 'contract', label: 'Contract', type: 'select', options: ['Murabaha (cost and profit disclosed)', 'Musawamah (only the price is disclosed)'], v: 'Murabaha (cost and profit disclosed)' }],
      textbook: null,
      compute: function (v) {
        var price = v.cash * (1 + v.markup / 100), profit = price - v.cash, inst = price / Math.max(1, v.months), mur = /^Murabaha/.test(v.contract);
        return { formula: 'Credit price = cost × (1 + mark-up); profit = price − cost; fixed at the contract and never increased',
          steps: ['Credit price = ' + n(v.cash) + ' × ' + (1 + v.markup / 100).toFixed(4) + ' = ' + n(price) + '; profit = ' + n(profit) + ' (' + n(v.cash ? 100 * profit / v.cash : 0, 2) + '% on cost).', 'Instalment = ' + n(price) + ' ÷ ' + v.months + ' = ' + n(inst) + '.',
            mur ? 'As Murabaha the bank must disclose both the cost (' + n(v.cash) + ') and the profit (' + n(profit) + '); concealing either would defeat the fiduciary sale, leaving at best an ordinary Musawamah.' : 'As Musawamah only the final price (' + n(price) + ') is agreed and disclosed; the buyer need not learn the cost or profit.',
            'Paying ' + v.late + ' month(s) late does not change the debt of ' + n(price) + '; any penalty goes to charity, not the seller.'],
          result: 'Debt fixed at ' + n(price) + ' · instalment ' + n(inst), meaning: 'Time may be priced into a sale before it is executed; once sold, the price is a debt that cannot grow. Murabaha and Musawamah price the same way; they differ in disclosure.' };
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
    'salam-discount': {
      title: 'Salam price discount and implied return', source: 'Sections 10.2–10.3 and 10.10 (practice calculator)', topic: 't10.3',
      assumptions: 'The buyer pays the whole price now; the goods are worth the expected spot price at delivery; simple (non-compounded) annualisation.',
      inputs: [{ k: 'qty', label: 'Quantity (tons)', v: 100 }, { k: 'months', label: 'Delivery period (months)', v: 6 }, { k: 'price', label: 'Salam price per ton (paid today)', v: 180 }, { k: 'spot', label: 'Expected spot price per ton at delivery', v: 200 }],
      textbook: null,
      compute: function (v) {
        var months = v.months > 0 ? v.months : 1, cap = v.qty * v.price, val = v.qty * v.spot, disc = val - cap, pct = cap ? 100 * disc / cap : 0, ann = pct * 12 / months;
        return { formula: 'Salam capital = quantity × Salam price; discount = quantity × (expected spot − Salam price)',
          steps: ['Salam capital paid now = ' + n(v.qty) + ' × ' + n(v.price) + ' = ' + n(cap) + '.', 'Expected value at delivery = ' + n(v.qty) + ' × ' + n(v.spot) + ' = ' + n(val) + '.', 'Implicit discount = ' + n(val) + ' − ' + n(cap) + ' = ' + n(disc) + ' (' + n(pct, 2) + '% of capital).', 'Simple annualised = ' + n(pct, 2) + '% × 12 ÷ ' + months + ' = ' + n(ann, 2) + '%.'],
          result: 'Capital ' + n(cap) + ' · discount ' + n(disc) + ' (' + n(pct, 2) + '%)',
          meaning: 'The discount is the price of a genuine forward sale fixed once at the contract, not interest: the buyer prepays and bears delivery and price risk; the seller gets cash now. Full advance payment is a condition of Salam.' };
      }
    },
    'sukuk-distribution': {
      title: 'Sukuk periodic distribution and total cash flow', source: 'Sections 15.3.4–15.3.5 (practice calculator)', topic: 't15.3.3',
      assumptions: 'A fixed rate per period passed through from the underlying asset\'s income; principal redeemed at maturity; no default, fees or reinvestment.',
      inputs: [{ k: 'principal', label: 'Sukuk principal (issue size)', v: 27200000 }, { k: 'rate', label: 'Periodic distribution rate (% per period)', v: 6, step: 0.1 }, { k: 'periods', label: 'Number of distribution periods', v: 3 }],
      textbook: null,
      compute: function (v) {
        var per = v.periods > 0 ? Math.round(v.periods) : 1, d = v.principal * v.rate / 100, tot = d * per, all = tot + v.principal;
        return { formula: 'Distribution = principal × periodic rate; total cash flow = distribution × periods + principal at redemption',
          steps: ['Distribution per period = ' + n(v.principal) + ' × ' + n(v.rate, 2) + '% = ' + n(d) + '.', 'Total distributions over ' + per + ' period(s) = ' + n(d) + ' × ' + per + ' = ' + n(tot) + '.', 'Principal redeemed at maturity = ' + n(v.principal) + '.', 'Total cash flow to Sukuk holders = ' + n(tot) + ' + ' + n(v.principal) + ' = ' + n(all) + '.'],
          result: 'Each period ' + n(d) + ' · total ' + n(all),
          meaning: 'A Sukuk distribution is compliant only when it represents a real share of the underlying pool\'s income (e.g. actual Ijarah rental); a return guaranteed regardless of asset performance is what the book flags as questionable.' };
      }
    },
    'qard-vs-interest': {
      title: 'Qard Hasan versus an interest-bearing loan', source: 'Sections 7.7–7.8 (practice calculator)', topic: 't7.7',
      assumptions: 'Simple interest at a stated annual rate; the interest loan is shown only to measure the required excess that would be Riba.',
      inputs: [{ k: 'principal', label: 'Amount borrowed', v: 10000 }, { k: 'months', label: 'Loan term (months)', v: 12 }, { k: 'rate', label: 'Comparable conventional rate (% p.a., simple)', v: 8, step: 0.1 }],
      textbook: null,
      compute: function (v) {
        var months = Math.max(0, v.months), interest = v.principal * (1 + v.rate / 100 * months / 12), riba = interest - v.principal;
        return { formula: 'Qard repayment = principal (always); interest-loan repayment = principal × (1 + rate × months ÷ 12)',
          steps: ['Qard Hasan: the borrower owes back exactly ' + n(v.principal) + ', however long the ' + months + ' months take.', 'Interest loan: ' + n(v.principal) + ' × (1 + ' + n(v.rate, 2) + '% × ' + months + '/12) = ' + n(interest) + '.', 'Required excess = ' + n(interest) + ' − ' + n(v.principal) + ' = ' + n(riba) + ' — a required increase charged for time alone is Riba.'],
          result: 'Qard ' + n(v.principal) + ' · interest loan ' + n(interest) + ' · excess ' + n(riba),
          meaning: 'A loan is a benevolent contract repaid in the same amount; the book rejects the “time value of money” justification for an increase on a loan. A voluntary, unstipulated extra payment by the borrower (Husn al-Qada) is praiseworthy and not Riba.' };
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
      title: 'Musharakah profit and loss sharing (with the sleeping-partner rule)', source: 'Section 12.3.4 and Box 12.1, rule 4 (practice calculator)', topic: 't12.3.4',
      assumptions: 'Two partners; profit ratio agreed at the start; a partner is a sleeping partner only if declared so.',
      inputs: [{ k: 'ca', label: 'Partner A capital', v: 600000 }, { k: 'cb', label: 'Partner B capital', v: 400000 }, { k: 'pa', label: 'A\'s agreed profit share (%)', v: 50 }, { k: 'result', label: 'Venture result (negative = loss)', v: 120000 },
        { k: 'sa', label: 'Is A declared a sleeping partner?', type: 'select', options: ['No — A may work', 'Yes — A is sleeping'], v: 'No — A may work' }, { k: 'sb', label: 'Is B declared a sleeping partner?', type: 'select', options: ['No — B may work', 'Yes — B is sleeping'], v: 'No — B may work' }],
      textbook: null,
      compute: function (v) {
        var tot = v.ca + v.cb, ka = tot ? 100 * v.ca / tot : 0, kb = 100 - ka, pa = v.pa, pb = 100 - pa, sa = /^Yes/.test(v.sa), sb = /^Yes/.test(v.sb), issues = [];
        if (sa && pa > ka + 1e-9) { issues.push('A is a declared sleeping partner but was given ' + pa + '% of profit against ' + ka.toFixed(1) + '% of capital — capped at ' + ka.toFixed(1) + '%.'); pa = ka; pb = 100 - pa; }
        if (sb && pb > kb + 1e-9) { issues.push('B is a declared sleeping partner but was given ' + pb.toFixed(1) + '% of profit against ' + kb.toFixed(1) + '% of capital — capped at ' + kb.toFixed(1) + '%.'); pb = kb; pa = 100 - pb; }
        if (sa && sb) issues.push('Both partners are declared sleeping: someone must manage the business (or a manager must be appointed).');
        var head = issues.length ? ['Rule check: ' + issues.join(' ')] : ['Rule check: no sleeping partner takes more than his capital ratio.'];
        if (v.result >= 0) {
          var a = v.result * pa / 100;
          return { formula: 'Profit share = profit × agreed ratio (a sleeping partner\'s share may not exceed his capital ratio)', steps: head.concat(['Profit ratio A : B = ' + n(pa, 1) + ' : ' + n(pb, 1) + '.', 'A: ' + n(v.result) + ' × ' + n(pa, 1) + '% = ' + n(a) + '.', 'B: ' + n(v.result - a) + '.']), result: 'A ' + n(a) + ' · B ' + n(v.result - a), meaning: 'Profit follows the agreed ratio, which may differ from capital — but only a partner who is not a declared sleeping partner may take more than his capital ratio (p. 320). Loss would follow capital ' + ka.toFixed(1) + ' : ' + kb.toFixed(1) + '.' };
        }
        var la = v.result * v.ca / tot;
        return { formula: 'Loss share = loss × capital ÷ total capital (agreed profit ratio is irrelevant)', steps: head.concat(['Capital ratio A : B = ' + ka.toFixed(1) + ' : ' + kb.toFixed(1) + '.', 'A: ' + n(v.result) + ' × ' + ka.toFixed(1) + '% = ' + n(la) + '.', 'B: ' + n(v.result - la) + '.']), result: 'A ' + n(la) + ' · B ' + n(v.result - la), meaning: '“Profit is based on agreement, but loss is always subject to the ratio of investment.”' };
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
        var months = Math.max(1, Math.min(600, Math.round(v.months) || 1)), inv = v.cost * v.share / 100, unit = inv / months, rows = [], out = inv, totalRent = 0;   /* tenure clamped to 1–600 months so a typo cannot freeze the page */
        for (var m = 1; m <= months; m++) { var rent = out * v.rate / 100 / 12; totalRent += rent; out -= unit; if (m <= 3 || m > months - 2) rows.push([m, n(unit), n(rent), n(unit + rent), n(Math.max(0, out))]); if (m === 3 && months > 5) rows.push(['…', '', '', '', '']); }
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
    },
    /* ---- Round 3 tools: rule checkers and practice calculators ---- */
    'sukuk-trade': {
      title: 'Sukuk / share tradability checker', source: 'Sections 12.6, 14.4.3 and 15.3.6', topic: 't15.3.6',
      inputs: [{ k: 'cash', label: 'Cash', v: 100 }, { k: 'recv', label: 'Receivables (debts)', v: 150 }, { k: 'real', label: 'Real assets, usufruct, inventory', v: 250 }],
      textbook: null,
      compute: function (v) {
        var tot = v.cash + v.recv + v.real, pr = tot ? 100 * v.real / tot : 0, liq = tot - v.real;
        function rule(ok) { return ok ? 'May trade at a market price' : 'Only at face value (money/debt rules)'; }
        return { formula: 'Non-liquid share = real assets ÷ (cash + receivables + real assets); receivables count as liquid, like money',
          steps: ['Total pool = ' + n(tot) + '; non-liquid = ' + n(v.real) + ' (' + pr.toFixed(1) + ' %).', pr === 0 ? 'All money or debt: sale must follow Bai‘ al-Sarf or debt rules.' : 'Apply each view below.'],
          table: { head: ['View (as reported in the book)', 'Test', 'Result'], rows: [
            ['Most contemporary scholars', 'Non-liquid assets > 50 %', rule(pr > 50)],
            ['Some scholars', 'Non-liquid assets > 33 %', rule(pr > 33)],
            ['Hanafi view as applied to pools', 'Non-liquid assets > 10 %', rule(pr > 10)],
            ['Floor on price when debts are in the pool', 'Price ≥ value of debts', 'Not below ' + n(v.recv)]] },
          result: pr > 50 ? 'Tradable at market price on the majority view' : pr > 10 ? 'Tradable only on the more lenient views' : 'Transfer at face value only',
          meaning: 'Classical Shafi‘is required the tangible assets to be sold separately; Hanafis allowed a price above the liquid part with no fixed proportion (p. 330). Figures here are practice inputs.' };
      }
    },
    'equity-screen': {
      title: 'Equity screening check', source: 'Section 14.3.4 criteria', topic: 't14.3.4',
      inputs: [
        { k: 'line', label: 'Main business line', type: 'select', options: ['Permissible business', 'Alcoholic beverages or tobacco', 'Casino, gambling or bar hotel', 'Interest-based financial institution', 'Indecent entertainment'], v: 'Permissible business' },
        { k: 'ii', label: 'Interest income as % of total income', v: 3 },
        { k: 'debt', label: 'Interest-bearing debt as % of total assets', v: 20 },
        { k: 'illiq', label: 'Illiquid assets as % of total assets', v: 45 },
        { k: 'div', label: 'Dividend received', v: 10000 }],
      textbook: null,
      compute: function (v) {
        var ok0 = v.line === 'Permissible business', ok1 = v.ii <= 5, lo = v.debt <= 10, hi = v.debt <= 33, ilo = v.illiq >= 33, ihi = v.illiq >= 10;
        var pass = ok0 && ok1 && hi && ihi, charity = v.div * Math.min(100, Math.max(0, v.ii)) / 100;
        return { formula: 'Business must be lawful; interest income ≤ 5 %; debt ratio ≤ 10–33 %; illiquid assets ≥ 10–33 % of total assets',
          steps: ['Business line: ' + (ok0 ? 'passes' : 'fails — prohibited activity') + '.', 'Interest income ' + v.ii + ' %: ' + (ok1 ? 'within 5 %' : 'above 5 % — fails') + '.',
            'Debt ' + v.debt + ' %: ' + (lo ? 'passes even the strict 10 % limit' : hi ? 'passes the 33 % limit only' : 'fails both limits') + '.',
            'Illiquid assets ' + v.illiq + ' %: ' + (ilo ? 'meets even the 33 % floor' : ihi ? 'meets the 10 % floor only' : 'below both floors') + '.',
            'Purification (approximate): the interest-related share of income goes to charity — at ' + v.ii + ' % of a ' + n(v.div) + ' dividend that is about ' + n(charity) + '.'],
          result: pass ? (lo && ilo ? 'Passes on strict and lenient thresholds' : 'Passes only on the lenient thresholds') : 'Does not pass the screen',
          meaning: 'The book gives ranges (10–33 %) because boards differ; your bank’s Shari’ah board sets the exact limits (pp. 363–364). Inputs are practice figures.' };
      }
    },
    'floating-rent': {
      title: 'Floating Ijarah rent with floor and cap', source: 'Sections 11.3.2 and 14.3.4 (practice calculator)', topic: 't11.3.2',
      inputs: [{ k: 'inv', label: 'Bank’s outstanding investment', v: 1000000 }, { k: 'r1', label: 'First-period rate (fixed in contract, %)', v: 8 }, { k: 'spread', label: 'Spread over benchmark (%)', v: 2 }, { k: 'floor', label: 'Floor (%)', v: 6 }, { k: 'cap', label: 'Cap (%)', v: 12 },
        { k: 'b2', label: 'Benchmark, period 2 (%)', v: 7 }, { k: 'b3', label: 'Benchmark, period 3 (%)', v: 11 }, { k: 'b4', label: 'Benchmark, period 4 (%)', v: 3 }],
      textbook: null,
      compute: function (v) {
        var rows = [['1', 'Fixed in contract', v.r1.toFixed(2) + ' %', n(v.inv * v.r1 / 100)]];
        [v.b2, v.b3, v.b4].forEach(function (b, i) {
          var raw = b + v.spread, r = Math.min(v.cap, Math.max(v.floor, raw));
          rows.push([String(i + 2), b + ' % + ' + v.spread + ' % = ' + raw.toFixed(2) + ' %' + (r !== raw ? (r === v.cap ? ' → capped' : ' → floored') : ''), r.toFixed(2) + ' %', n(v.inv * r / 100)]);
        });
        return { formula: 'Rent for a period = investment × clamp(benchmark + spread, floor, cap); the first rent is fixed in the contract',
          steps: ['Each period’s rent is agreed in absolute terms before that period starts.', 'Rent already accrued is never re-priced.'],
          table: { head: ['Period', 'Rate basis', 'Rate', 'Annual rent'], rows: rows },
          result: 'Rents stay between ' + v.floor + ' % and ' + v.cap + ' % of the investment', meaning: 'A floor and cap limit Gharar for both parties; the benchmark only prices the rent, while the lessor still bears ownership risk (pp. 283–284, 366).' };
      }
    },
    'mudarabah-offset': {
      title: 'Mudarabah: offsetting profits and losses', source: 'Section 12.4.4 (practice calculator)', topic: 't12.4.4',
      inputs: [{ k: 'd1', label: 'Deal 1 result', v: 50000 }, { k: 'd2', label: 'Deal 2 result', v: -20000 }, { k: 'd3', label: 'Deal 3 result', v: 15000 }, { k: 'd4', label: 'Deal 4 result', v: 0 }, { k: 'mr', label: 'Mudarib’s share of profit (%)', v: 40 }],
      textbook: null,
      compute: function (v) {
        var net = v.d1 + v.d2 + v.d3 + v.d4, m = net > 0 ? net * v.mr / 100 : 0;
        return { formula: 'Profit is recognised only after capital is kept intact: net = sum of all deals; split only a positive net',
          steps: ['Net result = ' + [v.d1, v.d2, v.d3, v.d4].map(function (x) { return n(x); }).join(' + ') + ' = ' + n(net) + '.',
            net > 0 ? 'Mudarib ' + v.mr + ' % = ' + n(m) + '; Rabbul-mal ' + n(net - m) + '.' : 'No profit: the loss of ' + n(-net) + ' reduces the Rabbul-mal’s capital; the Mudarib loses his effort only.'],
          result: net > 0 ? 'Mudarib ' + n(m) + ' · Rabbul-mal ' + n(net - m) : 'Loss ' + n(-net) + ' borne by the Rabbul-mal',
          meaning: 'Losses in some deals are first set off against profits in others; profit already distributed on liquidation is not clawed back (pp. 326–327).' };
      }
    },
    'tawarruq-check': {
      title: 'Tawarruq structure checker', source: 'Section 13.3', topic: 't13.3',
      inputs: [
        { k: 'buy', label: 'Who buys the commodity from the market?', type: 'select', options: ['The bank itself (or its own agent)', 'The client as the bank’s agent, who then sells to himself'], v: 'The bank itself (or its own agent)' },
        { k: 'resale', label: 'To whom does the client resell?', type: 'select', options: ['An unrelated third party', 'Back to the bank, directly or via an agent'], v: 'An unrelated third party' },
        { k: 'agency', label: 'Does the bank act as the client’s selling agent?', type: 'select', options: ['No', 'Yes — stipulated in the sale contract', 'Yes — arranged after an unconditional sale'], v: 'No' },
        { k: 'goods', label: 'Do the goods actually change hands?', type: 'select', options: ['Yes — ownership and possession pass', 'No — only papers between brokers'], v: 'Yes — ownership and possession pass' },
        { k: 'use', label: 'Purpose', type: 'select', options: ['Unavoidable corporate liquidity need', 'Consumer cash finance'], v: 'Unavoidable corporate liquidity need' }],
      textbook: null, kind: 'checker',
      compute: function (v) {
        var bad = [], caution = [];
        if (/himself/.test(v.buy)) bad.push('Client buying as the bank’s agent and selling to himself: the purchase and sale are interdependent, and the bank takes neither possession nor risk (invalid).');
        if (/Back to the bank/.test(v.resale)) bad.push('Resale to the original seller is ‘Inah (invalid on the AAOIFI and majority view).');
        if (/stipulated/.test(v.agency)) bad.push('Selling agency stipulated in the sale contract (invalid).');
        if (/after/.test(v.agency)) caution.push('Selling agency arranged after an unconditional sale: valid but not advisable.');
        if (/papers/.test(v.goods)) bad.push('Goods never move: a number of conditions of a valid sale may be missing.');
        if (/Consumer/.test(v.use)) caution.push('Scholars cited advise against Tawarruq for consumers (Kahf: “completely out” for individuals).');
        return { steps: bad.concat(caution).length ? bad.concat(caution) : ['Bank owns the goods, sells by a separate contract, and the client sells to a third party.'],
          result: bad.length ? 'Not acceptable as structured' : caution.length ? 'Valid on the book’s account, but not advisable' : 'Acceptable form — use sparingly',
          meaning: 'Even a valid Tawarruq should be limited to unavoidable needs under Shari’ah-board supervision; wide use could create systemic risk (pp. 349–351). This checker applies the book’s rules; it is not a Fatwa.' };
      }
    },
    'murabaha-check': {
      title: 'Murabaha compliance checker', source: 'Sections 9.8.3 and 14.3.4', topic: 't9.8.3',
      inputs: [
        { k: 'own', label: 'Does the bank own and possess the goods (bear their risk) before selling?', type: 'select', options: ['Yes', 'No'], v: 'Yes' },
        { k: 'client', label: 'Had the client already bought or committed to buy the goods?', type: 'select', options: ['No', 'Yes'], v: 'No' },
        { k: 'supplier', label: 'Is the supplier more than 50 % owned by the client?', type: 'select', options: ['No', 'Yes'], v: 'No' },
        { k: 'cost', label: 'Is the cost disclosed to the client?', type: 'select', options: ['Yes', 'No'], v: 'Yes' },
        { k: 'from', label: 'Mark-up charged from', type: 'select', options: ['Date of sale to the client', 'Date funds were disbursed'], v: 'Date of sale to the client' },
        { k: 'late', label: 'If the client pays late', type: 'select', options: ['Price unchanged; penalty (if any) to charity', 'Price increased', 'New Murabaha booked without new goods'], v: 'Price unchanged; penalty (if any) to charity' },
        { k: 'dp', label: 'Demand promissory note taken at disbursement for', type: 'select', options: ['No note before the sale', 'Principal only', 'Principal plus mark-up'], v: 'No note before the sale' }],
      textbook: null, kind: 'checker',
      compute: function (v) {
        var bad = [];
        if (v.own === 'No') bad.push('The bank must own and possess (at least constructively) the goods before selling them.');
        if (v.client === 'Yes') bad.push('Buying goods the client already owns or has committed to buy turns the deal into a buy-back (‘Inah).');
        if (v.supplier === 'Yes') bad.push('Supplier is the client’s sister concern (>50 %): buy-back risk.');
        if (v.cost === 'No') bad.push('Murabaha is a trust sale: the cost must be disclosed (otherwise it is at most Musawamah).');
        if (/disbursed/.test(v.from)) bad.push('Mark-up must run from the sale to the client, not from disbursement.');
        if (/increased/.test(v.late)) bad.push('Increasing the price for delay is Riba.');
        if (/without new goods/.test(v.late)) bad.push('A “new” Murabaha without new goods is a rollover; its return must go to charity.');
        if (/plus/.test(v.dp)) bad.push('A note taken before the sale should cover principal only.');
        return { steps: bad.length ? bad : ['Ownership, possession, disclosure, pricing and default handling all follow the book’s controls.'],
          result: bad.length ? bad.length + ' issue' + (bad.length > 1 ? 's' : '') + ' found' : 'No issues found',
          meaning: 'Based on the internal Shari’ah controls in Section 14.3.4 and the MPO stages in Section 9.8.3; your Shari’ah board has the final word.' };
      }
    },
    'jualah-reward': {
      title: 'Ju‘alah reward calculator', source: 'Section 13.4 (practice calculator)', topic: 't13.4.2',
      inputs: [{ k: 'coll', label: 'Amount recovered so far', v: 3000000 }, { k: 'pct', label: 'Reward (% of recovery)', v: 4 }, { k: 'adv', label: 'Advance paid on account', v: 200000 },
        { k: 'stop', label: 'Was the contract ended early?', type: 'select', options: ['No — contract completed', 'Yes — by the offeror after work began', 'Yes — before work began', 'Yes — by the worker after starting'], v: 'Yes — by the offeror after work began' },
        { k: 'wage', label: 'Market wage for work done on the rest (if revoked by offeror)', v: 150000 }],
      textbook: null,
      compute: function (v) {
        var earned = v.coll * v.pct / 100, extra = /offeror/.test(v.stop) ? v.wage : 0;
        if (/before work/.test(v.stop)) { earned = 0; extra = 0; }
        var due = earned + extra - v.adv;
        return { formula: 'Reward = recovered amount × agreed %; if the offeror revokes after work began, add a market wage; advances are on account',
          steps: ['Reward on results: ' + n(v.coll) + ' × ' + v.pct + ' % = ' + n(earned) + '.', extra ? 'Market wage for work done on the rest: ' + n(extra) + '.' : /worker/.test(v.stop) ? 'Worker revoked: no claim for unfinished work unless agreed otherwise.' : 'No additional wage.', 'Less advance on account: ' + n(v.adv) + '.'],
          result: due >= 0 ? 'Payable to the worker: ' + n(due) : 'Worker must return ' + n(-due) + ' of the advance',
          meaning: 'The worker is not absolutely entitled to an advance until the result is achieved (pp. 352–355). Figures are practice inputs.' };
      }
    },
    'late-payment': {
      title: 'Late payment: charity penalty vs bank income', source: 'Sections 7.13, 17.4.4 (practice calculator)', topic: 't17.4.4',
      inputs: [{ k: 'due', label: 'Overdue amount', v: 500000 }, { k: 'days', label: 'Days late', v: 90 }, { k: 'rate', label: 'Agreed penalty rate (% per annum)', v: 12 }, { k: 'loss', label: 'Actual direct loss proved (e.g. recovery costs)', v: 8000 },
        { k: 'kind', label: 'Nature of the liability', type: 'select', options: ['Dayn from a sale or Ijarah', 'Qard (loan)'], v: 'Dayn from a sale or Ijarah' },
        { k: 'who', label: 'Debtor', type: 'select', options: ['Wilful defaulter with means', 'Genuinely unable to pay'], v: 'Wilful defaulter with means' }],
      textbook: null,
      compute: function (v) {
        var pen = v.due * v.rate / 100 * v.days / 365;
        if (v.kind === 'Qard (loan)') return { steps: ['For a loan (Qard), the creditor should give more time; the book says jurists approve penalties only for Dayn.'], result: 'No penalty; grant time', meaning: 'Any increase on a loan is Riba (p. 455).' };
        if (/unable/.test(v.who)) return { steps: ['A debtor genuinely in difficulty is given respite without any charge.', 'The price itself never increases.'], result: 'No penalty; reschedule without charge', meaning: 'Regulators may set parameters to separate wilful from genuine default (p. 471).' };
        return { formula: 'Penalty = overdue × rate × days ÷ 365 → charity; bank may recover only actual loss (not cost of funds)',
          steps: ['Penalty: ' + n(v.due) + ' × ' + v.rate + ' % × ' + v.days + '/365 = ' + n(pen) + ' — credited to the Charity Account.', 'Bank’s own recovery: actual loss ' + n(v.loss) + '. Cost of funds or opportunity cost is not recoverable.'],
          result: 'Charity ' + n(pen) + ' · Bank ' + n(v.loss),
          meaning: 'The penalty disciplines a wilful defaulter but is not the bank’s income; the OIC Fiqh Council says it lapses if the client proves the default was beyond his control or caused no loss (p. 455).' };
      }
    }
  };

  /* Financing mode and concept each calculator illustrates (used for links and the relationship graph). */
  var MODE_OF = { 'promise-breach': 'murabaha', 'credit-price': 'murabaha', 'pool-weightage': 'mudarabah', 'salam-profit': 'salam', 'salam-discount': 'salam', 'parallel-istisna': 'istisnaa', 'ijarah-case': 'ijarah', 'floating-rent': 'ijarah',
    'musharakah-pl': 'musharakah', 'mudarabah-offset': 'mudarabah', 'mudarabah-mixed': 'mudarabah', 'dm-schedule': 'diminishing-musharakah', 'sitara-tfc': 'musharakah', 'sukuk-trade': 'sukuk', 'sukuk-distribution': 'sukuk',
    'murabaha-check': 'murabaha', 'tawarruq-check': 'tawarruq', 'jualah-reward': 'juaalah', 'takaful-waqf': 'takaful', 'qard-vs-interest': 'qard-hasan' };
  Object.keys(CALCS).forEach(function (k) {
    var c = CALCS[k]; c.id = k; c.modeId = MODE_OF[k];
    if (c.topic) IFL.data.addRelation('calculator', k, 'topic', c.topic);
    if (c.modeId) IFL.data.addRelation('calculator', k, 'mode', c.modeId);
  });
  IFL.calc = function (type, note) {
    var c = CALCS[type]; if (!c) return null;
    var vals = {}, used = false; c.inputs.forEach(function (i) { vals[i.k] = i.v; });
    var out = h('div', { 'aria-live': 'polite' });
    var badge = h('span.badge');
    var inputs = h('div.inputs', c.inputs.map(function (i) {
      var id = 'calc-' + type + '-' + i.k, inp;
      if (i.type === 'select') inp = h('select.input', { id: id }, i.options.map(function (o) { return h('option', { value: o, selected: o === i.v }, o); }));
      else inp = h('input.input', { id: id, type: 'number', value: i.v, step: i.step || 'any' });
      inp.addEventListener('input', function () { vals[i.k] = i.type === 'select' ? inp.value : (isFinite(Number(inp.value)) ? Number(inp.value) : 0); if (!used) { used = true; IFL.progress.recordCalc(type); } run(); });
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
      if (c.kind === 'checker') { badge.className = 'badge info'; badge.textContent = 'Rule checker — applies the book’s rules, not a Fatwa'; }
      else badge.textContent = c.textbook === null ? 'Practice Example — generated for learning' : tb ? 'Textbook figures (' + c.source + ')' : 'Practice Example — generated for learning';
      out.innerHTML = '';
      u.append(out, [r.formula ? h('div.formula', r.formula) : null,
        h('ol.steps-out', r.steps.map(function (s) { return h('li', s); })),
        r.table ? IFL.c.table(r.table) : null,
        h('div.result-line', r.result), h('p.small.text-2', { style: { marginTop: '4px' } }, r.meaning)]);
    }
    var mode = c.modeId ? IFL.data.mode(c.modeId) : null;
    var root = h('div.calc', h('div.row.between', h('h4', { style: { margin: 0 } }, u.svg('calc'), ' ', c.title), badge), note ? h('p.small.muted', note) : null,
      h('p.small.muted', { style: { margin: '4px 0' } }, 'Calculates: ' + (c.kind === 'checker' ? 'whether a structure meets the book’s rules' : 'the amounts the book’s rules produce for your inputs') + '. ', c.assumptions ? 'Assumptions: ' + c.assumptions + ' ' : 'Assumptions: figures are illustrative unless labelled “Textbook figures”. ', mode ? h('a', { href: '#/mode/' + mode.id }, 'Mode: ' + mode.name) : null),
      inputs, out);
    run();
    return root;
  };
  IFL.calcTypes = CALCS;
})();

