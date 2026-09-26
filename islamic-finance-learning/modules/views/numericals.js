/* Numericals trainer: worked problems for Islamic banking products. Each problem type has the book's own
   figures where the book gives them ("Textbook figures") and unlimited practice variants ("Practice
   problem — generated for learning"). Answers are checked with a small tolerance and the full working
   is shown step by step. Results are stored only in this browser. */
(function () {
  var IFL = window.IFL, u = IFL.u, h = u.h, C = IFL.c;
  var H2 = { fontSize: 'var(--fs-lg)', fontFamily: 'var(--font-sans)' };
  function f(x, dp) { dp = dp == null ? 0 : dp; var s = Math.abs(x).toFixed(dp).split('.'); s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (x < 0 ? '−' : '') + s.join('.'); }
  function rnd(r, lo, hi, step) { step = step || 1; return lo + Math.floor(r() * (Math.floor((hi - lo) / step) + 1)) * step; }
  function rng(seed) { var s = seed >>> 0 || 1; return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; }; }
  function r2(x) { return Math.round(x * 100) / 100; }

  /* Each generator: params (textbook or random) → { given, asks: [{ label, v, dp }], steps, note } */
  var G = [
    { id: 'murabaha-instalment', cat: 'Consumer finance', title: 'Murabaha price and instalments', product: 'consumer-murabaha', topic: 't9.3', source: 'Murabaha pricing (Sections 6.5.3 and 9.3)',
      book: null,
      rand: function (r) { return { cost: rnd(r, 40, 200) * 1000, pct: rnd(r, 6, 18), months: [6, 10, 12, 18, 24][rnd(r, 0, 4)] }; },
      solve: function (p) {
        var price = p.cost * (1 + p.pct / 100), inst = price / p.months;
        return { given: [['Bank’s cost of the goods', f(p.cost)], ['Agreed profit (on cost, for the whole term)', p.pct + ' %'], ['Monthly instalments', p.months]],
          asks: [{ label: 'Murabaha (credit) price', v: price }, { label: 'Monthly instalment', v: inst, dp: 2 }],
          steps: ['Price = cost × (1 + profit) = ' + f(p.cost) + ' × ' + (1 + p.pct / 100).toFixed(2) + ' = ' + f(price) + '.', 'Instalment = ' + f(price) + ' ÷ ' + p.months + ' = ' + f(inst, 2) + '.', 'Once the sale is made the price is a debt: it cannot rise for late payment, and any agreed late-payment penalty goes to charity.'] };
      } },
    { id: 'murabaha-period', cat: 'Trade & working capital', title: 'Mark-up period in a working-capital Murabaha', product: 'working-capital-murabaha', topic: 't9.8.3', source: 'Section 14.3.4 (mark-up from the date of sale)',
      book: null,
      rand: function (r) { return { cost: rnd(r, 10, 50) * 100000, rate: rnd(r, 8, 16), gap: rnd(r, 5, 20), days: [60, 90, 120, 180][rnd(r, 0, 3)] }; },
      solve: function (p) {
        var prof = p.cost * p.rate / 100 * p.days / 365, wrong = p.cost * p.rate / 100 * (p.days + p.gap) / 365;
        return { given: [['Cost paid to the supplier', f(p.cost)], ['Profit rate used to price the sale', p.rate + ' % p.a.'], ['Days between paying the supplier and the Murabaha sale', p.gap], ['Credit period from the sale', p.days + ' days']],
          asks: [{ label: 'Profit (days on a 365-day basis)', v: prof }, { label: 'Murabaha price', v: p.cost + prof }],
          steps: ['The bank cannot sell until it owns and possesses the goods, so the price is fixed at the sale; the period before it is not charged as time.', 'Profit = ' + f(p.cost) + ' × ' + p.rate + ' % × ' + p.days + '/365 = ' + f(prof) + '.', 'Price = ' + f(p.cost + prof) + '. Charging from the supplier payment (' + (p.days + p.gap) + ' days) would give ' + f(wrong) + ' — not allowed as a Murabaha price basis.'] };
      } },
    { id: 'promise-loss', cat: 'Consumer finance', title: 'Loss on breach of a promise to purchase', product: 'working-capital-murabaha', topic: 't5.6', source: 'Section 5.6',
      book: { cost: 18000, promised: 20000, resale: 17000, hj: 2000 }, bookNote: 'Cost, promised price and resale price are the book’s; the Hamish Jiddiyah amount is added for practice.',
      rand: function (r) { var c = rnd(r, 10, 60) * 1000; return { cost: c, promised: c + rnd(r, 1, 6) * 500, resale: c - rnd(r, 1, 8) * 500, hj: rnd(r, 1, 6) * 500 }; },
      solve: function (p) {
        var loss = Math.max(0, p.cost - p.resale), take = Math.min(loss, p.hj);
        return { given: [['Bank’s purchase cost', f(p.cost)], ['Promised purchase price', f(p.promised)], ['Resale price after the client breaks the promise', f(p.resale)], ['Hamish Jiddiyah held', f(p.hj)]],
          asks: [{ label: 'Loss the bank may recover', v: loss }, { label: 'Hamish Jiddiyah refunded to the client', v: p.hj - take }],
          steps: ['Actual loss = cost − resale = ' + f(p.cost) + ' − ' + f(p.resale) + ' = ' + f(loss) + '.', 'Lost profit (' + f(p.promised - p.cost) + ') is not recoverable: only actual loss is.', 'Take ' + f(take) + ' from the Hamish Jiddiyah; refund ' + f(p.hj - take) + (loss > p.hj ? '; claim the remaining ' + f(loss - p.hj) + ' from the client.' : '.')] };
      } },
    { id: 'pool-profit', cat: 'Deposits', title: 'Mudarabah deposit pool: profit by weightage', product: 'mudarabah-deposit', topic: 't8.5.2', source: 'Box 8.1',
      book: { d: [3000, 4000, 3000], w: [0.6, 0.7, 1], profit: 1000, mud: 50 },
      rand: function (r) { return { d: [rnd(r, 2, 8) * 1000, rnd(r, 2, 8) * 1000, rnd(r, 2, 8) * 1000], w: [rnd(r, 50, 65, 5) / 100, rnd(r, 70, 85, 5) / 100, 1], profit: rnd(r, 5, 20) * 100, mud: rnd(r, 30, 60, 5) }; },
      solve: function (p) {
        var bank = p.profit * p.mud / 100, pool = p.profit - bank, wa = p.d.map(function (d, i) { return d * p.w[i]; }), wt = wa[0] + wa[1] + wa[2];
        var sh = wa.map(function (x) { return pool * x / wt; });
        return { given: [['3-month deposits × weightage', f(p.d[0]) + ' × ' + p.w[0]], ['6-month deposits × weightage', f(p.d[1]) + ' × ' + p.w[1]], ['1-year deposits × weightage', f(p.d[2]) + ' × ' + p.w[2]], ['Pool profit for the month', f(p.profit)], ['Bank’s share as Mudarib', p.mud + ' %']],
          asks: [{ label: 'Bank’s Mudarib share', v: bank }, { label: '3-month depositors', v: sh[0] }, { label: '6-month depositors', v: sh[1] }, { label: '1-year depositors', v: sh[2] }],
          steps: ['Bank = ' + f(p.profit) + ' × ' + p.mud + ' % = ' + f(bank) + '; depositors’ pool = ' + f(pool) + '.', 'Weighted amounts: ' + wa.map(function (x) { return f(x); }).join(' + ') + ' = ' + f(wt) + '.', 'Shares: ' + sh.map(function (x, i) { return f(pool) + ' × ' + f(wa[i]) + ' ÷ ' + f(wt) + ' = ' + f(x); }).join('; ') + '.', 'Monthly return on each tier: ' + sh.map(function (x, i) { return (100 * x / p.d[i]).toFixed(2) + ' %'; }).join(', ') + '.'] };
      } },
    { id: 'pool-loss', cat: 'Deposits', title: 'Mudarabah deposit pool: sharing a loss', product: 'mudarabah-deposit', topic: 't8.5.2', source: 'Box 8.1',
      book: { d: [3000, 4000, 3000], loss: 500 },
      rand: function (r) { return { d: [rnd(r, 2, 8) * 1000, rnd(r, 2, 8) * 1000, rnd(r, 2, 8) * 1000], loss: rnd(r, 2, 10) * 100 }; },
      solve: function (p) {
        var t = p.d[0] + p.d[1] + p.d[2], sh = p.d.map(function (d) { return p.loss * d / t; });
        return { given: [['3-month deposits', f(p.d[0])], ['6-month deposits', f(p.d[1])], ['1-year deposits', f(p.d[2])], ['Loss for the period', f(p.loss)]],
          asks: [{ label: '3-month depositors bear', v: sh[0] }, { label: '6-month depositors bear', v: sh[1] }, { label: '1-year depositors bear', v: sh[2] }, { label: 'Bank earns as Mudarib', v: 0 }],
          steps: ['A loss follows capital: weightages apply only to profit.', 'Shares = loss × deposit ÷ ' + f(t) + ': ' + sh.map(function (x) { return f(x); }).join(', ') + '.', 'The bank as Mudarib loses its effort and earns nothing (unless it was negligent, when it is liable).'] };
      } },
    { id: 'mudarabah-bank-capital', cat: 'Deposits', title: 'Bank’s own capital inside a Mudarabah', product: 'mudarabah-deposit', topic: 't12.4.1', source: 'Section 12.4.1',
      book: { dep: 2000, bank: 1000, profit: 300, ratio: 50 },
      rand: function (r) { return { dep: rnd(r, 10, 60) * 100, bank: rnd(r, 5, 30) * 100, profit: rnd(r, 2, 12) * 50, ratio: rnd(r, 20, 60, 5) }; },
      solve: function (p) {
        var t = p.dep + p.bank, own = p.profit * p.bank / t, rest = p.profit - own, m = rest * p.ratio / 100;
        return { given: [['Depositors’ funds', f(p.dep)], ['Bank’s own funds', f(p.bank)], ['Profit', f(p.profit)], ['Bank’s Mudarib share of the depositors’ part', p.ratio + ' %']],
          asks: [{ label: 'Bank’s total profit', v: own + m, dp: 2 }, { label: 'Depositors’ profit', v: rest - m, dp: 2 }],
          steps: ['Profit attributable to the bank’s capital = ' + f(p.profit) + ' × ' + f(p.bank) + ' ÷ ' + f(t) + ' = ' + f(own, 2) + '.', 'The rest (' + f(rest, 2) + ') is shared as Mudarabah: bank ' + f(m, 2) + ', depositors ' + f(rest - m, 2) + '.', 'Bank total = ' + f(own + m, 2) + ' (partner on its own capital, Mudarib on the depositors’).'] };
      } },
    { id: 'musharakah-pl', cat: 'Trade & working capital', title: 'Musharakah: profit by agreement, loss by capital', product: 'running-musharakah', topic: 't12.3.4', source: 'Section 12.3.4 and Box 12.1',
      book: null,
      rand: function (r) { var loss = r() < 0.4; return { ca: rnd(r, 2, 9) * 100000, cb: rnd(r, 2, 9) * 100000, pa: rnd(r, 20, 70, 5), res: (loss ? -1 : 1) * rnd(r, 2, 20) * 10000 }; },
      solve: function (p) {
        var t = p.ca + p.cb, a = p.res >= 0 ? p.res * p.pa / 100 : p.res * p.ca / t;
        return { given: [['Bank’s capital (partner A)', f(p.ca)], ['Client’s capital (partner B)', f(p.cb)], ['Agreed profit ratio A : B', p.pa + ' : ' + (100 - p.pa)], ['Result for the period', (p.res >= 0 ? 'Profit ' : 'Loss ') + f(Math.abs(p.res))]],
          asks: [{ label: 'A’s share (enter a loss as negative)', v: a }, { label: 'B’s share (enter a loss as negative)', v: p.res - a }],
          steps: p.res >= 0 ? ['A profit is shared at the agreed ratio: A = ' + f(p.res) + ' × ' + p.pa + ' % = ' + f(a) + '.', 'B = ' + f(p.res - a) + '.', 'Caution: a sleeping partner’s share may not exceed its capital ratio (' + (100 * p.ca / t).toFixed(1) + ' % for A).']
            : ['A loss is always shared by capital, whatever the profit ratio.', 'A = ' + f(p.res) + ' × ' + f(p.ca) + ' ÷ ' + f(t) + ' = ' + f(a) + '.', 'B = ' + f(p.res - a) + '.'] };
      } },
    { id: 'dm-housing', cat: 'Consumer finance', title: 'Diminishing Musharakah home finance', product: 'home-dm', topic: 't12.9.2', source: 'Box 12.5',
      book: { cost: 1000000, share: 80, months: 120, rate: 7 },
      rand: function (r) { return { cost: rnd(r, 20, 120) * 100000, share: rnd(r, 50, 85, 5), months: [60, 84, 120, 180][rnd(r, 0, 3)], rate: rnd(r, 60, 140, 5) / 10 }; },
      solve: function (p) {
        var inv = p.cost * p.share / 100, unit = inv / p.months, r1 = inv * p.rate / 1200, r2v = (inv - unit) * p.rate / 1200;
        return { given: [['House price', f(p.cost)], ['Bank’s share', p.share + ' %'], ['Units (monthly)', p.months], ['Rent rate on the bank’s outstanding share', p.rate + ' % p.a.']],
          asks: [{ label: 'Unit price', v: unit, dp: 2 }, { label: 'Month 1 rent', v: r1, dp: 2 }, { label: 'Month 1 total payment', v: unit + r1, dp: 2 }, { label: 'Month 2 total payment', v: unit + r2v, dp: 2 }],
          steps: ['Bank investment = ' + f(p.cost) + ' × ' + p.share + ' % = ' + f(inv) + '.', 'Unit price = ' + f(inv) + ' ÷ ' + p.months + ' = ' + f(unit, 2) + '.', 'Month 1 rent = ' + f(inv) + ' × ' + p.rate + ' % ÷ 12 = ' + f(r1, 2) + '; payment = ' + f(unit + r1, 2) + '.', 'Month 2: outstanding ' + f(inv - unit, 2) + ' → rent ' + f(r2v, 2) + '; payment ' + f(unit + r2v, 2) + '. Rent falls as the client buys units.'] };
      } },
    { id: 'salam-margin', cat: 'Trade & working capital', title: 'Salam with a promise to buy', product: 'salam-agri', topic: 't10.10', source: 'Box 10.4',
      book: { salam: 100, promise: 115, hj: 15, market: 108 }, bookNote: 'Salam price, promised price and Hamish Jiddiyah are the book’s; the market price on default is a practice extension.',
      rand: function (r) { var s = rnd(r, 20, 200, 5); return { salam: s, promise: s + rnd(r, 5, 25), hj: rnd(r, 3, 20), market: s + rnd(r, -5, 20) }; },
      solve: function (p) {
        var loss = Math.max(0, p.promise - p.market), take = Math.min(loss, p.hj);
        return { given: [['Salam price paid in advance (Rs m)', f(p.salam)], ['Third party’s promised purchase price (Rs m)', f(p.promise)], ['Hamish Jiddiyah (Rs m)', f(p.hj)], ['Market price if the promisor refuses (Rs m)', f(p.market)]],
          asks: [{ label: 'Gross margin if the promise is kept', v: p.promise - p.salam }, { label: 'Amount taken from Hamish Jiddiyah on refusal', v: take }, { label: 'Bank’s result on refusal (market − Salam price + HJ taken)', v: p.market - p.salam + take }],
          steps: ['Margin = ' + f(p.promise) + ' − ' + f(p.salam) + ' = ' + f(p.promise - p.salam) + '.', 'On refusal the actual loss against the promise = ' + f(p.promise) + ' − ' + f(p.market) + ' = ' + f(loss) + '; take ' + f(take) + ' from the HJ and refund ' + f(p.hj - take) + '.', 'Result = sale ' + f(p.market) + ' − cost ' + f(p.salam) + ' + ' + f(take) + ' = ' + f(p.market - p.salam + take) + '. The bank bears delivery and price risk until it sells.'] };
      } },
    { id: 'salam-agent', cat: 'Trade & working capital', title: 'Salam goods sold through an agent', product: 'salam-working-capital', topic: 't10.10', source: 'Box 10.7',
      book: { price: 19, target: 20, sold: 18, kg: 100000 }, bookNote: 'Prices per kg are the book’s; the quantity is added for practice.',
      rand: function (r) { var p = rnd(r, 30, 90); return { price: p, target: p + rnd(r, 1, 5), sold: p + rnd(r, -4, 7), kg: rnd(r, 1, 20) * 10000 }; },
      solve: function (p) {
        var res = (p.sold - p.price) * p.kg;
        return { given: [['Salam price per kg', 'Rs.' + p.price], ['Bank’s target sale price per kg', 'Rs.' + p.target], ['Price the agent actually obtained per kg', 'Rs.' + p.sold], ['Quantity', f(p.kg) + ' kg']],
          asks: [{ label: 'Target margin per kg', v: p.target - p.price }, { label: 'Bank’s actual result on the lot (loss negative)', v: res }],
          steps: ['Target margin = ' + p.target + ' − ' + p.price + ' = Rs.' + (p.target - p.price) + ' per kg.', 'Actual = (' + p.sold + ' − ' + p.price + ') × ' + f(p.kg) + ' = ' + f(res) + '.', p.sold > p.target ? 'Above target: the excess may be given to the agent as an incentive if so agreed.' : p.sold < p.price ? 'Below cost: the bank bears the loss; the agent does not guarantee the price.' : 'The bank keeps the result; the agent does not guarantee any price.'] };
      } },
    { id: 'parallel-istisna', cat: 'Corporate & project', title: 'Istisna‘a and Parallel Istisna‘a', product: 'project-istisna', topic: 't10.11.7', source: 'Box 10.16',
      book: { sale: 1200, years: 10, cost: 1000, inst: 4 },
      rand: function (r) { var c = rnd(r, 20, 200) * 10; return { sale: c + rnd(r, 5, 40) * 10, years: rnd(r, 3, 12), cost: c, inst: rnd(r, 2, 6) }; },
      solve: function (p) {
        return { given: [['Istisna‘a price agreed with the customer (Rs m)', f(p.sale)], ['Customer pays over (years, equal annual amounts)', p.years], ['Parallel Istisna‘a price with the contractor (Rs m)', f(p.cost)], ['Equal instalments to the contractor', p.inst]],
          asks: [{ label: 'Bank’s gross margin', v: p.sale - p.cost }, { label: 'Customer’s annual payment', v: p.sale / p.years, dp: 2 }, { label: 'Each contractor instalment', v: p.cost / p.inst, dp: 2 }],
          steps: ['Margin = ' + f(p.sale) + ' − ' + f(p.cost) + ' = ' + f(p.sale - p.cost) + '.', 'Customer: ' + f(p.sale) + ' ÷ ' + p.years + ' = ' + f(p.sale / p.years, 2) + ' a year.', 'Contractor: ' + f(p.cost) + ' ÷ ' + p.inst + ' = ' + f(p.cost / p.inst, 2) + ' each.', 'The two contracts are independent: the bank stays liable to the customer even if the contractor fails.'] };
      } },
    { id: 'ijarah-loss', cat: 'Consumer finance', title: 'Leased car destroyed: settlement with Takaful', product: 'auto-ijarah', topic: 't11.4.5', source: 'Box 11.3 (Answer 4)',
      book: { out: 370000, claim: 450000, dep: 50000 },
      rand: function (r) { var o = rnd(r, 20, 90) * 10000; return { out: o, claim: o + rnd(r, -10, 15) * 10000, dep: rnd(r, 2, 10) * 10000 }; },
      solve: function (p) {
        var surplus = Math.max(0, p.claim - p.out);
        return { given: [['Outstanding Ijarah investment + prepaid expenses', f(p.out)], ['Takaful claim received', f(p.claim)], ['Client’s security deposit', f(p.dep)]],
          asks: [{ label: 'Amount returned to the client', v: p.dep + surplus }, { label: 'Shortfall borne by the bank (0 if none)', v: Math.max(0, p.out - p.claim) }],
          steps: ['The asset is destroyed without negligence: the lease ends, rent stops, and the loss is the owner’s.', 'Refund the deposit: ' + f(p.dep) + '.', surplus ? 'Pass the Takaful surplus (' + f(p.claim) + ' − ' + f(p.out) + ' = ' + f(surplus) + ') to the client, as AAOIFI 8/8 recommends.' : 'No surplus; the bank bears the shortfall of ' + f(p.out - p.claim) + ' as owner.', 'Client receives ' + f(p.dep + surplus) + '.'] };
      } },
    { id: 'ijarah-early', cat: 'Corporate & project', title: 'Early purchase of leased assets', product: 'corporate-ijarah', topic: 't11.4.5', source: 'Box 11.3 (Answer 3)',
      book: { n: 10, offer: 400000, out: 350000, pre: 20000 },
      rand: function (r) { var o = rnd(r, 20, 90) * 10000; return { n: rnd(r, 2, 20), offer: o + rnd(r, -2, 10) * 10000, out: o, pre: rnd(r, 1, 5) * 10000 }; },
      solve: function (p) {
        var liab = (p.out + p.pre) * p.n, off = p.offer * p.n;
        return { given: [['Number of leased vehicles', p.n], ['Client’s offer per vehicle', f(p.offer)], ['Outstanding Ijarah investment per vehicle', f(p.out)], ['Prepaid expenses incl. Takaful per vehicle', f(p.pre)]],
          asks: [{ label: 'Total liabilities to recover', v: liab }, { label: 'Bank’s gain on the sale (loss negative)', v: off - liab }],
          steps: ['Liabilities = (' + f(p.out) + ' + ' + f(p.pre) + ') × ' + p.n + ' = ' + f(liab) + '.', 'Offer = ' + f(p.offer) + ' × ' + p.n + ' = ' + f(off) + '.', 'Gain = ' + f(off - liab) + (off >= liab ? ': the offer covers the bank’s liabilities.' : ': the offer does not cover them; the bank may negotiate, since sale is by mutual consent.')] };
      } },
    { id: 'sukuk-rent', cat: 'Treasury & capital markets', title: 'Floating rent on Ijarah Sukuk', product: 'ijarah-sukuk', topic: 't15.3.6', source: 'Box 15.6',
      book: { size: 600, spread: 220, bench: 4.8 }, bookNote: 'Issue size and the 220 bps spread are the book’s; the benchmark rate is a practice assumption.',
      rand: function (r) { return { size: rnd(r, 2, 20) * 50, spread: rnd(r, 50, 300, 10), bench: rnd(r, 10, 60, 5) / 10 }; },
      solve: function (p) {
        var rate = p.bench + p.spread / 100, half = p.size * rate / 100 / 2;
        return { given: [['Sukuk issued (US$ m)', f(p.size)], ['Rent benchmark rate for the period', p.bench.toFixed(2) + ' % p.a.'], ['Spread', p.spread + ' bps']],
          asks: [{ label: 'Rent rate (% p.a.)', v: rate, dp: 2 }, { label: 'Semi-annual rent to Sukuk holders (US$ m)', v: half, dp: 2 }],
          steps: ['Rate = ' + p.bench.toFixed(2) + ' % + ' + (p.spread / 100).toFixed(2) + ' % = ' + rate.toFixed(2) + ' %.', 'Half-year rent = ' + f(p.size) + ' × ' + rate.toFixed(2) + ' % ÷ 2 = ' + f(half, 2) + '.', 'The benchmark only prices the rent; holders own the leased asset and bear its ownership risk.'] };
      } },
    { id: 'takaful-result', cat: 'Services & Takaful', title: 'Wakalah–Waqf Takaful year-end result', product: 'takaful', topic: 't16.4', source: 'Box 16.1 method (practice figures)',
      book: null,
      rand: function (r) { return { con: rnd(r, 10, 60), fee: rnd(r, 15, 35, 5), claims: rnd(r, 3, 30), inv: rnd(r, 1, 6), mud: rnd(r, 20, 50, 10) }; },
      solve: function (p) {
        var fee = p.con * p.fee / 100, uw = p.con - fee - p.claims, op = p.inv * p.mud / 100;
        return { given: [['Participants’ donations (m)', f(p.con)], ['Operator’s Wakalah fee', p.fee + ' %'], ['Claims and re-Takaful (m)', f(p.claims)], ['Investment profit (m)', f(p.inv)], ['Operator’s Mudarib share of investment profit', p.mud + ' %']],
          asks: [{ label: 'Underwriting surplus (deficit negative)', v: uw, dp: 2 }, { label: 'Operator’s total income', v: fee + op, dp: 2 }],
          steps: ['Fee = ' + f(p.con) + ' × ' + p.fee + ' % = ' + f(fee, 2) + '.', 'Underwriting = ' + f(p.con) + ' − ' + f(fee, 2) + ' − ' + f(p.claims) + ' = ' + f(uw, 2) + (uw < 0 ? ': a deficit, met by a Qard al Hasan from the operator.' : ': a surplus, which belongs to the participants’ fund.'), 'Operator’s share of investment profit = ' + f(op, 2) + '; income = ' + f(fee + op, 2) + '.'] };
      } },
    { id: 'iers-excess', cat: 'Treasury & capital markets', title: 'IERS: SBP’s excess profit', product: 'iers', topic: 't14.4.6', source: 'Section 14.4.6 (practice figures)',
      book: null,
      rand: function (r) { var e = rnd(r, 5, 9); return { inv: rnd(r, 5, 40) * 100, share: e + rnd(r, 1, 4), efs: e }; },
      solve: function (p) {
        var a = p.inv * p.share / 100, b = p.inv * p.efs / 100;
        return { given: [['SBP’s average investment in the pool (Rs m)', f(p.inv)], ['SBP’s share of pool profit (% p.a.)', p.share], ['EFS rate (% p.a.)', p.efs]],
          asks: [{ label: 'SBP’s profit from the pool', v: a }, { label: 'Excess paid to the Takaful fund', v: a - b }],
          steps: ['Profit = ' + f(p.inv) + ' × ' + p.share + ' % = ' + f(a) + '.', 'At the EFS rate = ' + f(b) + '.', 'Excess ' + f(a - b) + ' goes to the Takaful fund.'] };
      } },
    { id: 'jualah-reward', cat: 'Services & Takaful', title: 'Ju‘alah reward for debt recovery', product: 'jualah-services', topic: 't13.4.2', source: 'Section 13.4 (practice figures)',
      book: null,
      rand: function (r) { return { rec: rnd(r, 5, 80) * 100000, pct: rnd(r, 2, 8), adv: rnd(r, 1, 10) * 10000 }; },
      solve: function (p) {
        var rw = p.rec * p.pct / 100;
        return { given: [['Amount recovered', f(p.rec)], ['Reward', p.pct + ' % of the amount recovered'], ['Advance paid on account', f(p.adv)]],
          asks: [{ label: 'Reward earned', v: rw }, { label: 'Balance payable now', v: rw - p.adv }],
          steps: ['Reward = ' + f(p.rec) + ' × ' + p.pct + ' % = ' + f(rw) + '.', 'Balance = ' + f(rw) + ' − ' + f(p.adv) + ' = ' + f(rw - p.adv) + '.', 'The reward is due only on completing the task (recovery); a lump-sum or percentage reward must be known in advance.'] };
      } }
  ];
  IFL.numericals = G;

  function parse(s) { s = String(s).replace(/[,\s]/g, '').replace(/[−–]/g, '-'); return s === '' || isNaN(Number(s)) ? null : Number(s); }
  function close(x, v) { var tol = Math.max(0.5 * Math.pow(10, -2), Math.abs(v) * 0.005, 1e-9); if (Math.abs(v) >= 100) tol = Math.max(tol, 1); return Math.abs(x - v) <= tol; }

  function panel(g, mode, seed) {
    var p = mode === 'book' ? g.book : g.rand(rng(seed)), s = g.solve(p);
    var box = h('section.card#num-panel');
    var inputs = s.asks.map(function (a, i) {
      var id = 'num-a' + i, inp = h('input.input', { id: id, inputmode: 'decimal', autocomplete: 'off' }), res = h('span.res', { 'aria-live': 'polite' });
      return { a: a, inp: inp, res: res, row: h('div.num-answer', h('label', { for: id }, a.label), inp, res) };
    });
    var steps = h('ol.steps', { hidden: true }, s.steps.map(function (x) { return h('li', x); }));
    var checked = false;
    function check() {
      var ok = 0;
      inputs.forEach(function (x) {
        var v = parse(x.inp.value), good = v != null && close(v, x.a.v);
        if (good) ok++;
        x.res.className = 'res ' + (good ? 'ok' : 'bad');
        x.res.textContent = v == null ? 'Enter a number' : good ? '✓ Correct' : '✗ Not quite';
      });
      if (!checked) { checked = true; IFL.progress.recordAnswer({ id: 'num-' + g.id, topic: g.topic }, ok === inputs.length); }
      summary.textContent = ok + ' of ' + inputs.length + ' correct' + (ok === inputs.length ? ' — well done.' : '. Check the working below.');
      if (ok < inputs.length) steps.hidden = false;
    }
    function reveal() { steps.hidden = false; inputs.forEach(function (x) { x.res.className = 'res'; x.res.textContent = '= ' + f(x.a.v, x.a.dp || (Math.abs(x.a.v % 1) > 1e-9 ? 2 : 0)); }); }
    var summary = h('p.small', { 'aria-live': 'polite' });
    var prod = window.IFL_DATA.sets.products ? window.IFL_DATA.sets.products.filter(function (x) { return x.id === g.product; })[0] : null;
    u.append(box, [
      h('div.row.between', h('div', h('div.eyebrow', g.cat), h('h2', { style: H2 }, g.title)),
        mode === 'book' ? h('span.badge.accent', 'Textbook figures') : h('span.badge.gold', 'Practice problem — generated for learning')),
      mode === 'book' && g.bookNote ? h('p.small.muted', g.bookNote) : null,
      h('dl.num-given', s.given.map(function (x) { return [h('dt', x[0]), h('dd', String(x[1]))]; })),
      h('p.small.muted', 'Round money to the nearest unit unless two decimals are shown. Commas are fine.'),
      h('form', { onsubmit: function (e) { e.preventDefault(); check(); } }, inputs.map(function (x) { return x.row; }),
        h('div.row', { style: { marginTop: '8px' } }, h('button.btn.primary', { type: 'submit' }, 'Check answers'), h('button.btn', { type: 'button', onclick: reveal }, 'Show solution'),
          h('button.btn', { type: 'button', onclick: function () { IFL.go('/numericals?p=' + g.id + '&s=' + ((Math.random() * 1e9) >>> 0)); } }, u.svg('refresh'), 'New practice problem'),
          g.book && mode !== 'book' ? h('a.btn.ghost', { href: '#/numericals?p=' + g.id + '&s=book' }, 'Book’s figures') : null)),
      summary, h('h3', { style: { fontSize: 'var(--fs-md)' } }, 'Working'), steps,
      h('div.row.small', { style: { marginTop: '8px' } }, 'Source: ' + g.source, h('span.spacer'),
        prod ? h('a', { href: '#/product/' + prod.id }, 'Product: ' + prod.name) : null,
        h('a', { href: '#/topic/' + g.topic }, 'Lesson ' + IFL.course.sourceLabel(g.topic)))]);
    return box;
  }

  IFL.route('/numericals', function (ctx) {
    return window.IFL_DATA.load(['products']).then(function () {
      var q = ctx.query, cur = G.filter(function (g) { return g.id === q.p; })[0];
      var mode = cur && (q.s === 'book' || (!q.s && cur.book)) ? 'book' : 'practice';
      var seed = Number(q.s) || 1 + (u.dayKey ? String(u.dayKey()).split('').reduce(function (a, c) { return a + c.charCodeAt(0); }, 0) : 7);
      var cats = [];
      G.forEach(function (g) { if (cats.indexOf(g.cat) < 0) cats.push(g.cat); });
      var ans = IFL.store.state.answers || {};
      var list = h('div.stack', cats.map(function (c) {
        return h('section.card', h('h2', { style: H2 }, c), h('div.grid.grid-3', G.filter(function (g) { return g.cat === c; }).map(function (g) {
          var a = ans['num-' + g.id];
          return h('a.card.card-link' + (cur === g ? '.sel' : ''), { href: '#/numericals?p=' + g.id + (g.book ? '&s=book' : '') },
            h('div.row', g.book ? h('span.badge.accent', 'Book figures + practice') : h('span.badge.gold', 'Practice'), a ? h('span.badge.' + (a.lastCorrect ? 'ok' : 'warn'), a.correct + '/' + a.n + ' solved') : null),
            h('h3', { style: { fontSize: 'var(--fs-md)', margin: '8px 0 4px' } }, g.title), h('p.small.text-2', { style: { margin: 0 } }, g.source));
        })));
      }));
      var node = h('div', C.pageHead({ eyebrow: 'Islamic banking products', title: 'Numericals trainer', desc: G.length + ' problem types covering deposits, Murabaha, Salam, Istisna‘a, Ijarah, Musharakah, Sukuk and Takaful. Problems marked “Textbook figures” use the book’s own numbers; every other problem is generated for learning with the same rules. Your results stay in this browser.' }),
        cur ? panel(cur, mode, seed) : null, list);
      if (cur) setTimeout(function () { var el = document.getElementById('num-panel'); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start' }); }, 30);
      return node;
    });
  });
})();
