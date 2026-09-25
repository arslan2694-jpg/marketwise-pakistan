/* Chapter 4 — The Philosophy and Features of Islamic Finance. Source pp. 73–98. */
IFL_DATA.registerChapter({
  number: 4,
  title: "The Philosophy and Features of Islamic Finance",
  part: "part-i",
  pages: [73, 98],
  minutes: 65,
  difficulty: "Intermediate",
  objectives: [
    "Explain why Islamic banking is wider than “interest-free banking”.",
    "Distinguish a loan from an investment in the Islamic context.",
    "Classify Islamic financing tools by liquidity, guarantee and rate of return (Table 4.1).",
    "Explain why not all pre-fixed returns are Riba, and the role of benchmarks.",
    "Apply the maxim Al Kharaj bi-al-Daman / Al Ghunm bil Ghurm.",
    "Explain exchange rules, the time value of money and the status of paper money in Islamic finance.",
    "Discuss money creation, indexation and settlement of debts under currency fluctuation."
  ],
  why: "This chapter translates the prohibitions into operating principles for Islamic banks: asset-backed transactions, profit only with risk, dealing in goods rather than money, stricter transparency and extra risks. It also resolves common myths — fixed returns, time value of money, debt vs equity and ‘benevolent’ banking — that recur in exams and in Chapter 17.",
  overview: "Islamic finance avoids interest, Gharar and gambling and uses alternative principles — sharing, deferred trading and leasing. Returns must be linked to risk and real assets; Islamic banks deal in goods, not money; they face additional risks. The chapter then discusses debt versus equity, business versus benevolence, exchange rules, time value of money, and money and monetary policy, including paper money, currency trading, money creation and indexation.",
  summarySection: "4.8",
  topics: [
    {
      id: "t4.1", section: "4.1", title: "Introduction: Islamic Banking vs “Interest-free Banking”", pages: [73, 73], tier: "supporting",
      concepts: ["islamic-banking"],
      intuition: "Is Islamic banking just conventional banking minus interest? No — the author calls that view too narrow.",
      simple: "“Interest-free banking” (a 1980s term) only means avoiding interest. Islamic banking also avoids Gharar and unethical practices and aims to achieve the goals of an Islamic economy.",
      academic: ["Islamic banking is banking in consonance with the ethos and value system of Islam, governed by conventional good governance and risk management rules plus Shari’ah principles. “Interest-free banking” is a narrow concept denoting instruments that avoid interest; Islamic banking should also avoid Gharar and other unethical practices and participate in achieving the objectives of an Islamic economy."],
      exam: "Interest-free banking = narrow (avoid interest). Islamic banking = avoid interest + Gharar + unethical practices + serve goals of Islamic economy.",
      keyPoints: ["Islamic banking is a more general term than interest-free banking."],
      distinctions: [{ a: "Interest-free banking", b: "Islamic banking", text: "The former only avoids interest; the latter also avoids Gharar and unethical practices and pursues the objectives of an Islamic economy." }],
      related: ["t4.2", "t8.5"],
      quickCheck: { q: "Why does the author consider ‘interest-free banking’ a narrow concept?", options: ["It ignores deposits", "It only denotes avoiding interest, not Gharar, unethical practices and the goals of an Islamic economy", "It is a Western term", "It includes Takaful"], answer: 1, explanation: "p. 73." }
    },
    {
      id: "t4.2", section: "4.2", title: "The Philosophy of Islamic Finance: Loan vs Investment", pages: [73, 74], tier: "core",
      concepts: ["asset-backing", "riba"],
      intuition: "If you buy a government bond or make a deposit in a conventional bank, have you ‘invested’? Not in the Islamic sense.",
      simple: "Verse 2:275 (trade permitted, Riba forbidden) pushes finance towards asset-backed transactions. A loan is a purely financial transaction that must be repaid in full without return. Investment means taking part in real activity — buying goods to sell at a profit, for example. Returns on loans are prohibited; returns on investment are allowed.",
      academic: [
        "All financial transactions must represent real transactions — sale of goods, services or benefits. Riba is an increase taken as a premium from the debtor: the return on exchanging money for money, or an addition to an agreed price on account of delay. Hence debt contracts cannot be sold at a premium or discount, and exchange of money (or gold/silver) must be equal for equal and hand to hand — otherwise one party benefits from money received before giving its counter value.",
        "A loan is only a monetary transaction with a guarantee of full repayment and no return; it is not an investment. Investment must be part of, or itself be, real activity. Purchasing a bond or making a conventional deposit is not investment; using funds to buy goods and sell them at a profit is. Borrowing on interest to buy a physical asset is not permissible; trading a financial document is not investment. If fungible items are borrowed (1 ton of wheat, $1000), exactly the same must be returned. Certainty about subject matter and exchange value, transparency, disclosure and free consent are key."
      ],
      exam: "2:275 → asset-backed finance. Loan = monetary transaction, full repayment, no return, not investment. Investment = participation in real activity; its return is permissible. Debts cannot be sold at premium/discount; money exchange equal and spot.",
      keyPoints: [
        "All financial transactions must represent real transactions.",
        "Loans are not investments.",
        "Bonds and conventional deposits are financial transactions, not investments.",
        "Debt cannot be sold at a premium or discount."
      ],
      distinctions: [{ a: "Loan", b: "Investment", text: "Loan: funds change hands with guaranteed full repayment and no return. Investment: funds become part of real activity, and the return is permissible." }],
      related: ["t4.2.1", "t4.2.6", "t1.9"],
      quickCheck: { q: "Which is an ‘investment’ in the Islamic sense described in Section 4.2?", options: ["Buying a government bond", "A deposit in a conventional bank", "Using funds to buy goods and sell them at a profit", "Buying a debt document at a discount"], answer: 2, explanation: "Investment must be part of real activity (p. 74)." }
    },
    {
      id: "t4.2.1", section: "4.2.1", title: "Avoiding Interest", pages: [74, 75], tier: "core",
      concepts: ["riba"],
      intuition: "What exactly may an Islamic bank not do with loans and debts?",
      simple: "Islamic banks will not give or take loans seeking any increase over the principal. They may buy and sell on cash or credit for profit, and price credit sales considering time — but once the debt is created, it cannot be increased. They cannot charge cost of funds on loans, overdrafts, guarantees or bills, nor sell debt instruments.",
      academic: ["The most important feature of the Islamic theory of finance, based on 2:275 and 2:279, is avoiding interest or any ex ante return on a loan/debt. The lender gives the lent goods/money for the loan period without worldly compensation. Islamic banks will not take or give loans or enter contracts seeking any increase over the principal of loans or debts created by credit transactions. Pricing goods with regard to the credit period is acceptable provided there is no enhancement of the debt once created. Hence Islamic banks cannot charge cost of funds or rent on money in short-, medium- or long-term loans, overdrafts, guarantees, financing against bills, receivables or other instruments, or sell their debt instruments."],
      exam: "No ex ante return on loans/debts. Credit-sale pricing may consider time, but debt once created cannot increase. No cost of funds on loans, overdrafts, guarantees, bills; no sale of debt instruments.",
      keyPoints: ["Once a debt is created the seller cannot demand more than the stipulated credit price.", "Lending on interest is alien to Islamic banks."],
      related: ["t3.2.1", "t4.6"],
      quickCheck: { q: "Which charge is NOT permitted to an Islamic bank?", options: ["Profit in a credit sale priced before execution", "Rent on a leased building", "Cost of funds on an overdraft", "A service fee under Wakalah"], answer: 2, explanation: "Cost of funds on loans/overdrafts is prohibited (p. 75)." }
    },
    {
      id: "t4.2.2", section: "4.2.2", title: "Avoiding Gharar", pages: [75, 75], tier: "core",
      concepts: ["gharar", "derivatives"],
      intuition: "Which banking activities are ruled out because of Gharar?",
      simple: "Islamic banks must not enter bargains with hidden results. Speculative share trading, short-selling, discounting bills, trading unidentified items and most futures/options are ruled out. Derivatives are a grey area; IPOs need care because of information asymmetry.",
      academic: ["Gharar is entering a contract in absolute risk or uncertainty about the result, subject matter or rights, including lack of value-relevant information (Jahl); deceit or withholding information amounts to Gharar. Futures and options practices are un-Islamic because of Gharar, interest and gambling; stock market transactions cleansed of these would be Islamic. Islamic banks should not engage in speculative trading in shares, short-selling, discounting bills and securities, or trading unidentified items. IPO involvement needs care due to information asymmetry between promoters and investors. Derivatives trading is a grey area."],
      exam: "Avoid bargains with hidden results; no speculative share trading, short-selling, bill discounting, unidentified items; futures/options un-Islamic (Gharar, interest, gambling); derivatives grey area; IPOs need care.",
      keyPoints: ["Cleansed stock markets would be Islamic.", "Short-selling and bill discounting are excluded."],
      related: ["t3.2.2", "t8.8.8"],
      quickCheck: { q: "Which activity does the prohibition of Gharar rule out for Islamic banks?", options: ["Spot purchase of identified goods", "Short-selling", "Ijarah of a building", "Musharakah in a project"], answer: 1, explanation: "p. 75." }
    },
    {
      id: "t4.2.3", section: "4.2.3", title: "Avoiding Gambling and Games of Chance", pages: [76, 76], tier: "supporting",
      concepts: ["maisir"],
      intuition: "Which conventional products fall foul of the gambling prohibition?",
      simple: "Prize bonds, lotteries and draw-based schemes, conventional insurance (Riba and Maisir) and futures/options settled only by price differences involve gambling, which IFIs must avoid.",
      academic: ["Instruments offering inducements based on uncertain events, disproportionate prizes by lots, or prizes funded by interest on safe capital are repugnant due to Riba and Qimar. Conventional insurance involves Riba and Maisir; public lotteries and draws are prohibited; futures and options settled by price difference are gambling; prize-carrying bonds give prizes to a few at others’ cost without liability or work."],
      exam: "Avoid prize bonds/lotteries (Riba + Qimar), conventional insurance (Riba + Maisir), price-difference futures/options.",
      keyPoints: ["Prize schemes benefit a few at the cost of others without liability or work."],
      related: ["t3.2.3"],
      quickCheck: { q: "Conventional insurance is non-compliant due to which elements, according to the author?", options: ["Riba and Maisir", "Only Najash", "Only Khalabah", "None"], answer: 0, explanation: "p. 76." }
    },
    {
      id: "t4.2.4", section: "4.2.4", title: "Alternative Financing Principles", pages: [76, 78], tier: "core",
      concepts: ["mudarabah", "musharakah", "murabaha", "salam", "ijarah", "istisna", "qard-hasan"],
      intuition: "Without interest, how does an Islamic bank finance anything? Through sharing, deferred trading, leasing and combinations.",
      simple: "Islamic banks use: Mudarabah and Musharakah (profit and loss sharing), Murabaha–Mu’ajjal (credit sale at a profit), Salam (prepaid forward purchase), Ijarah (leasing) and Istisna‘a (order to manufacture), plus return-free loans in specific cases. These differ in liquidity, collateral and whether the return is known.",
      academic: [
        "Techniques: the participation and sharing principle (Musharakah, Mudarabah and variants); the deferred trading principle (Mu’ajjal and Salam); combinations (Shirkah with Ijarah; Murabaha with Salam/Istisna‘a); and return-free loans in specific situations. Mudarabah: one party provides capital, the other entrepreneurial skill; loss borne by the financier, profit shared in a pre-agreed ratio. Musharakah: permanent equity, a fixed-duration project partnership, or diminishing partnership. Murabaha–Mu’ajjal: acquiring goods and selling on credit at a profit margin, creating a debt payable irrespective of the buyer’s profit or loss (the case of Hind bint Utbah’s loan from Umar, which could not be waived though she lost in trade). Salam: prepayment for precisely defined goods. Ijarah: leasing, with the lessor owning the asset’s risk and reward. Istisna‘a: engaging a party to manufacture/construct and supply for an explicit sum.",
        "Return is known in credit sales and Ijarah, but risk profiles differ: in Ijarah the bank bears asset risk and ownership expenses, so net return is quasi-fixed. Return is basically unknown in Salam and Istisna‘a (sale price on delivery uncertain), though it can be partly known through a parallel contract or a promise to purchase. In sharing modes the return is unknown. Security: in debt modes banks may take mortgage, lien or charge; in forward purchase, security for delivery; in PLS modes security only against nonperformance — it cannot be enforced for business loss without misconduct or negligence. Liquidity: Murabaha, Salam and Istisna‘a receivables cannot be sold like debt instruments (non-liquid); Ijarah and sharing-mode assets can be sold in the secondary market (liquid)."
      ],
      exam: "Principles: sharing (Musharakah/Mudarabah), deferred trading (Murabaha–Mu’ajjal, Salam), Istisna‘a, Ijarah, combinations, Qard al Hasan. Table 4.1: debt modes non-liquid with collateral; Ijarah liquid, known return; sharing modes liquid, unknown return, penalty only for misconduct.",
      keyPoints: [
        "Mudarabah loss is borne by the financier.",
        "Murabaha debt is payable irrespective of the buyer’s profit or loss.",
        "Ijarah net return is quasi-fixed because the lessor bears asset risk.",
        "Collateral in PLS modes cannot be enforced for loss without misconduct/negligence.",
        "Debt-mode receivables are non-liquid; Ijarah and sharing assets are liquid."
      ],
      table: { caption: "Table 4.1 — Features of Islamic financing tools", head: ["Category", "Contract", "Liquidity", "Guarantee", "Rate of return"], rows: [["Debt-creating", "Qard al Hasan", "—", "Collateral", "Nil"], ["Debt-creating", "Credit sales", "Non-liquid", "Collateral", "Known"], ["Debt-creating", "Salam", "Non-liquid", "Collateral", "Unknown/known"], ["Debt-creating", "Istisna‘a", "Non-liquid", "Collateral", "Unknown/known"], ["Semi-debt", "Ijarah", "Liquid", "Collateral", "Known"], ["Sharing", "Musharakah", "Liquid", "Penalty for misconduct", "Unknown"], ["Sharing", "Restricted Mudarabah", "Liquid", "Penalty for misconduct", "Unknown"], ["Sharing", "General Mudarabah", "Liquid", "Penalty for misconduct", "Unknown"]] },
      examples: [{ title: "Hind bint Utbah’s loan", kind: "textbook", text: "Hind took 4000 from the public exchequer to trade and lost; Umar held the loan could not be waived — a debt is payable irrespective of the debtor’s business loss." }],
      confusions: [{ wrong: "In Musharakah the bank can seize collateral whenever the business makes a loss.", right: "Collateral in PLS modes is only against nonperformance; it cannot be enforced for loss without misconduct or negligence." }],
      related: ["t8.5.3", "t14.3.2", "t9.1", "t11.1", "t12.1"],
      quickCheck: { q: "According to Table 4.1, which contract is classified as ‘semi-debt’ with a known return and liquid assets?", options: ["Murabaha", "Ijarah", "Musharakah", "Salam"], answer: 1, explanation: "Ijarah (p. 77)." }
    },
    {
      id: "t4.2.5", section: "4.2.5", title: "Valid Gains on Investment (Pre-fixed Returns and Benchmarks)", pages: [78, 81], tier: "core",
      concepts: ["fixed-return", "benchmark", "time-value"],
      intuition: "Is every fixed return Riba? The author says no — it depends on the nature of the transaction.",
      simple: "Profit is a legitimate reward for capital, but capital must bear the risk of loss. Returns can be fixed in trade (credit price higher than cash price) and leasing (fixed rent), but never on loans or debts. Islamic banks need two benchmarks — for pricing (mark-up/rent) and for sharing ratios. Using an interest-based benchmark for pricing does not make trade or Ijarah un-Islamic if their rules are followed.",
      academic: [
        "Profit is recognised as a reward of capital; Islam permits — even encourages — gainful deployment of resources, but liability for loss rests with capital itself. Financial transactions must be associated with tangible real assets; money is not capital and cannot earn profit in itself. The fund provider is also an entrepreneur; profit must relate to assets exposed to direct or indirect business risk.",
        "All pre-fixed returns are not Riba. Loans/debts cannot fetch any increase; in sale of goods or usufruct one may profit per the rules. Bai‘ is definite transfer of ownership against a price (spot, deferred or advance in Salam); risk and reward pass to the buyer, so banks have no recourse to the sold goods for rollover or re-pricing. Hibah is permanent free transfer. Riba Al-Nasiah is temporary transfer against payment; if free, it is Qard al Hasan/Tabarru‘. In Ijarah, rent is allowed if the lessor bears ownership risk and expenses; the analogy “fixed rent includes time value, so fixed interest should too” fails because the usufruct is uncertain, the lessor owns the risk, and consumables like money cannot be leased.",
        "Variable rates: Shirkah modes give variable returns and are the main deposit-side mode; quasi-fixed returns arise when Shirkah is attached to trade or Ijarah (e.g. Diminishing Musharakah, Shirkah-based securitisation). Partners agree profit ratios freely, but loss must be exactly in proportion to investment.",
        "Benchmarks: Fiqh recognises Ujratul-mithl (matching wage), Ribh-al-mithl (matching profit), Qirad mithl and Musaqat mithl — customary compensation when a contract becomes Fasid. Service charges on loans may be based on Ujratul-mithl. Islamic finance needs two reference scales: a price (mark-up/rent) scale and a sharing-ratio scale (e.g. central bank or inter-bank Mudarabah ratio), ideally set by market forces. Scholars hold that using an interest-based benchmark for pricing goods and usufruct does not make operations un-Islamic so long as other rules of trade and Ijarah are applied."
      ],
      exam: "Profit is reward of capital with liability for loss; must relate to real assets. Fixed return OK in trade and Ijarah, never on loans/debts. Rent ≠ interest: usufruct uncertain, lessor bears ownership risk. Two benchmarks: pricing scale and sharing-ratio scale; interest benchmark for pricing doesn’t invalidate if rules followed. Mithl concepts.",
      keyPoints: [
        "Money is not capital and cannot earn profit in itself.",
        "A seller cannot re-price sold goods (no Murabaha rollover).",
        "Loss in Shirkah must be exactly in proportion to investment.",
        "Two benchmarks needed; interest-based benchmark acceptable for pricing if rules followed."
      ],
      definitions: [
        { term: "Ujratul-mithl", meaning: "Matching/customary wage — used e.g. as the basis for service charges on loans." },
        { term: "Ribh-al-mithl", meaning: "Matching rate of profit — customary compensation when a contract becomes voidable." },
        { term: "Qard al Hasan", meaning: "A benevolent, return-free loan (temporary transfer free of payment)." }
      ],
      distinctions: [{ a: "Fixed rent in Ijarah", b: "Fixed interest on a loan", text: "Rent is paid for an uncertain usufruct of an asset whose ownership risk the lessor bears; interest is an increase over a loaned principal with no risk." }],
      confusions: [{ wrong: "Using LIBOR/KIBOR to price a Murabaha makes it interest.", right: "Scholars say using an interest-based benchmark for pricing does not make trade/Ijarah un-Islamic as long as the other rules are applied." }],
      related: ["t4.2.6", "t6.5.2", "t11.3.2", "t17.4.3"],
      quickCheck: { q: "Why does the author reject the analogy between fixed Ijarah rent and fixed interest?", options: ["Rent is always variable", "Rent is based on an asset’s uncertain usufruct and the lessor bears ownership risk", "Interest is permitted in Ijarah", "There is no difference"], answer: 1, explanation: "p. 79." }
    },
    {
      id: "t4.2.6", section: "4.2.6", title: "Entitlement to Profit — With Risk and Responsibility", pages: [81, 82], tier: "core",
      concepts: ["kharaj-daman", "risk-sharing"],
      intuition: "What single maxim tells you whether a return is legitimate?",
      simple: "“Al Kharaj bi-al-Daman” / “Al Ghunm bil Ghurm”: whoever wants profit must bear the risk of loss. Ownership cannot be separated from its risk. Banks can mitigate risk but not eliminate it, and cannot pass risk to others without passing the reward too.",
      academic: [
        "Assumption of business risk is a precondition for profit. The maxim Al Kharaj bi-al-Daman (or Al Ghunm bil Ghurm) is the criterion of legality of any return on capital. Profit is earned by sharing the risk and reward of ownership through pricing goods, services or usufruct. Money grows when it joins entrepreneurship; in itself it is not capital. Reward should depend on productive behaviour, so interest, lotteries and gambling are prohibited.",
        "In debt modes banks face credit, ownership transfer, market, commodity, rate of return, legal/documentation and mode-specific risks; they may mitigate within Shari’ah but not totally eliminate risk. Transfer of commercial risk without the related reward is not permissible. Ownership cannot be separated from risk: lenders get the principal back whatever the use; in trade the seller bears risk until sale, then the buyer bears it (a credit buyer pays even if the asset is destroyed; Takaful may mitigate but does not affect the liability); in Ijarah the lessor earns rent only while keeping the asset usable and bearing its risks.",
        "Shirkah modes carry far more risk: all loss falls on capital while the manager loses labour. Depositors face business and profit uncertainty, which justifies profit. There is consensus that depositors should not bear losses from management negligence; experts favour protecting them to raise confidence."
      ],
      exam: "Al Kharaj bi-al-Daman / Al Ghunm bil Ghurm: profit only with liability for loss. Ownership inseparable from risk. Risk mitigated not eliminated; cannot transfer risk without reward. Depositors not to bear losses from management negligence.",
      keyPoints: [
        "Maxim: Al Kharaj bi-al-Daman (Al Ghunm bil Ghurm).",
        "Risk can be mitigated but not eliminated.",
        "Credit buyer must pay even if the goods are destroyed after sale.",
        "Lessor earns rent only while bearing ownership risks."
      ],
      principles: ["Al Kharaj bi-al-Daman — entitlement to gain goes with liability for loss.", "Ownership cannot be separated from the risk of related loss."],
      definitions: [{ term: "Al Kharaj bi-al-Daman / Al Ghunm bil Ghurm", meaning: "Maxim: one must bear loss, if any, to be entitled to profit on investment — the criterion of legality of any return on capital." }],
      related: ["t1.5", "t5.5.7", "t4.2.9"],
      quickCheck: { q: "After a credit sale, the goods are destroyed in the buyer’s possession. The buyer:", options: ["Is released from paying", "Must still pay the price at the settled time", "Pays half", "Can return the goods"], answer: 1, explanation: "Risk transferred on sale; the price remains payable (p. 82)." }
    },
    {
      id: "t4.2.7", section: "4.2.7", title: "Islamic Banks Dealing in Goods not in Money", pages: [82, 83], tier: "core",
      concepts: ["asset-backing", "parallel-salam", "wakalah"],
      intuition: "Conventional banks “deal in documents, not goods”. What do Islamic banks deal in?",
      simple: "Islamic banks deal in goods and documents, not money. They buy goods (directly or via an agent), own them and bear the risk, then sell at cost plus profit or lease them. In Salam they own goods after delivery; a Parallel Salam must be independent. Forward currency deals with delayed payment are not allowed. They may earn fees (e.g. Wakalatul Istismar) but not a fee on lending as cost of funds.",
      academic: [
        "Conventional banks deal in money and documents without responsibility for the subject of contracts. Islamic banks use money only as a medium of exchange to purchase goods for sale or lease, intermediating through goods, assets or papers representing ownership of real assets. In Murabaha/Salam the bank buys directly or through an agent (Wakalah), takes ownership and risk, then sells at cost plus profit; the client then bears the risk and pays at the settled time. In Istisna‘a manufacturers deliver the asset with related risks.",
        "In Salam, after delivery the asset and price risk is the bank’s. A Parallel Salam may be for the same date and quantity, but the two contracts must not be linked or conditional; the parallel contract must be honoured regardless of the first. Salam and Istisna‘a have potential for agricultural and rural micro-finance; forward FX with delayed payment and most financial futures are not available (spot FX is fine). In Ijarah, ownership and risk remain with the bank; if the asset is damaged without the lessee’s fault, rent ceases; transfer of ownership requires a separate sale or gift. In Musharakah/Mudarabah, earnings depend on the client’s business.",
        "Banks may charge service/management fees, but not a fee on lending as cost of funds (Riba). Penalties for default are not credited to P&L. Under Wakalatul Istismar they manage funds for a fixed fee with profit/loss belonging to clients."
      ],
      exam: "Islamic banks deal in goods/documents, not money; take ownership and risk before selling/leasing. Parallel Salam independent of original. Ijarah: bank bears asset risk; rent ceases if asset damaged without lessee fault; separate sale/gift for transfer. Fees allowed for services; no cost-of-funds fee; penalties to charity.",
      keyPoints: [
        "Money used only as a medium of exchange.",
        "Parallel Salam must not be conditional on the original.",
        "Forward FX with deferred payment not permitted; spot FX fine.",
        "Wakalatul Istismar: fixed management fee; P&L belongs to clients."
      ],
      distinctions: [{ a: "Conventional banks", b: "Islamic banks", text: "Conventional: deal in money and documents, no responsibility for goods. Islamic: deal in goods/assets, owning them and bearing related risks." }],
      related: ["t10.10", "t13.2.2", "t11.3.5"],
      quickCheck: { q: "Under what condition is a Parallel Salam valid according to contemporary scholars cited here?", options: ["It must be conditional on the first Salam", "It must not be linked to or conditional on the original Salam", "It must have a different commodity", "It must be with the same party"], answer: 1, explanation: "p. 83." }
    },
    {
      id: "t4.2.8", section: "4.2.8", title: "Transparency and Documentation", pages: [83, 84], tier: "supporting",
      concepts: ["transparency", "murabaha"],
      intuition: "Why must Islamic banks disclose more than conventional banks?",
      simple: "Islamic banks must be more transparent. In Murabaha, cost and payment details must be disclosed or the transaction may become non-compliant. The Qur’an requires writing down credit transactions. As partners in trade, banks must know their clients’ business, making them less likely to be used for money laundering.",
      academic: ["Islamic financial institutions must adopt transparency, disclosure and documentation to a greater extent than conventional banks. Lack of transparency in Murabaha (cost/price and payment mode) may render the transaction non-compliant. The Qur’an enjoins writing down and taking witnesses in credit transactions. Because Islamic finance funds specific physical assets, clients must have socially beneficial, value-adding business. As a partner in trade the bank must concern itself with the client’s business and profitability; the author believes Islamic banks are less likely to engage in money laundering and terrorism financing."],
      exam: "Greater transparency/disclosure/documentation; Murabaha cost disclosure essential; Qur’an requires recording credit; bank as trade partner must know client — author: less prone to money laundering.",
      keyPoints: ["Murabaha without cost disclosure may be non-compliant."],
      related: ["t9.3", "t3.3.1"],
      quickCheck: { q: "Why may lack of transparency invalidate a Murabaha?", options: ["Murabaha requires disclosure of cost/price and payment mode", "Murabaha is a loan", "It creates Maisir", "It is not a sale"], answer: 0, explanation: "p. 83." }
    },
    {
      id: "t4.2.9", section: "4.2.9", title: "Additional Risks Faced by Islamic Banks", pages: [84, 85], tier: "core",
      concepts: ["risk-management"],
      intuition: "Because Islamic banks own assets and share profits, what extra risks do they carry?",
      simple: "Besides normal banking risks, Islamic banks face asset, market and Shari’ah non-compliance risks, and greater rate-of-return, fiduciary, legal and withdrawal risks. They can mitigate some (Parallel Salam, promises, penalty clauses to charity) but cannot shift risks Shari’ah assigns to them — e.g. in Ijarah the bank bears asset loss.",
      academic: [
        "Islamic banks cannot rely heavily on collateral and must evaluate risk carefully. Additional risks: asset, market and Shari’ah non-compliance risk, and greater rate-of-return, fiduciary, legal and withdrawal risk. Asset risk arises in Murabaha (before onward sale), Salam (after delivery) and Ijarah (throughout); in Shirkah per ownership share. Murabaha receivables cannot be enhanced if benchmarks rise. Non-compliance sends income to charity and creates credibility risk, withdrawal risk and a contagion effect.",
        "Khan and Habib’s (2001) survey of 17 IFIs: unique risks from profit-sharing deposits are considered more serious; banks feel returns must match competitors or depositors will withdraw; PLS modes and Salam/Istisna‘a are judged riskier than Murabaha and Ijarah; risk measurement, mitigation and controls need upgrading; lack of money-market instruments and an unsupportive legal/regulatory framework are problems.",
        "Mitigation requires Shari’ah expertise; responsibilities assigned by Shari’ah cannot be avoided. In Ijarah the bank bears asset loss not caused by lessee negligence (maxim: Al Ujrah wal Dhaman La Tajtami‘an — rent and liability do not combine), though risk-management costs can be built into rentals by mutual consent. A Mudarib gets nothing if the Mudarabah loses. Salam risks can be transferred via Parallel Salam (independent contracts) or a promise to purchase. Default risk is mitigated by a penalty clause with proceeds to charity — in all modes except Istisna‘a, where a price-reduction clause for late delivery (Shart-e-Jazai) is allowed because manufacture depends on the manufacturer’s effort."
      ],
      exam: "Extra risks: asset, market, Shari’ah non-compliance; greater rate-of-return, fiduciary, legal, withdrawal risks. Mitigate via Parallel Salam, promises, penalty-to-charity; Istisna‘a allows Shart-e-Jazai (price reduction for delay). Ijarah: lessor bears asset loss (Al Ujrah wal Dhaman La Tajtami‘an).",
      keyPoints: [
        "Murabaha receivable cannot increase if market rates rise (rate-of-return risk).",
        "Non-compliance → income to charity + reputational/withdrawal risk.",
        "Shart-e-Jazai permitted only in Istisna‘a.",
        "Rent and liability do not combine on the same party."
      ],
      definitions: [
        { term: "Shart-e-Jazai", meaning: "Penalty clause reducing the price of an Istisna‘a asset in case of delay in delivery." },
        { term: "Al Ujrah wal Dhaman La Tajtami‘an", meaning: "Maxim: wage/rent and liability/responsibility do not add up together — a lessee paying rent cannot also be made to bear the asset risk." }
      ],
      table: { caption: "Where asset risk sits (Section 4.2.9)", head: ["Mode", "When the bank bears asset risk"], rows: [["Murabaha", "From purchase until onward sale to client"], ["Salam", "After taking delivery from the Salam seller"], ["Ijarah", "Throughout the lease (unless lessee negligence)"], ["Shirkah", "In proportion to share in ownership"]] },
      related: ["t9.10", "t10.10.1", "t10.11.11", "t11.3.5"],
      quickCheck: { q: "In which mode may a bank include a clause reducing the price for delayed delivery (Shart-e-Jazai)?", options: ["Murabaha", "Salam", "Istisna‘a", "Ijarah"], answer: 2, explanation: "p. 85." }
    },
    {
      id: "t4.3", section: "4.3", title: "Debt versus Equity", pages: [85, 86], tier: "core",
      concepts: ["mode-preference"],
      intuition: "Are Murabaha and Ijarah second-class substitutes for ‘true’ Islamic finance? The author says the issue is preference, not prohibition.",
      simple: "Debt will always be part of Islamic finance — the Prophet (pbuh) himself took debts. The rule is that debt must not carry interest. Equity-based modes are preferable, but trade and Ijarah suit risk-averse savers (e.g. a widow). The aim is a healthy balance.",
      academic: ["Islamic institutions create genuine debt through trading. The issue is not debt versus equity, but greater reliance on equity and subjecting debt to the rule that once created it should not increase on the basis of opportunity cost. Shirkah modes are not always usable or advisable given investors’ risk profiles — a widow may need low-risk, compliant investment in trade and Ijarah. Contrary to writers who say only Shirkah can replace interest, debt has always existed and will remain important; the issue is preference for equity over debt-creating modes, not the permissibility of the latter. The aim is a healthy balance; heavy reliance on debt is risky (the US example)."],
      exam: "Not debt vs equity but preference for equity with interest-free debt. Debt modes (Murabaha, Salam, Ijarah) remain valid tools; balance needed; risk-averse investors need trade/Ijarah.",
      keyPoints: ["Debt is permissible if it carries no interest.", "Preference, not prohibition."],
      debate: [{ issue: "Should Islamic banks use only Shirkah-based modes?", criticism: "Many writers, following the pioneers, say Shirkah/equity modes are the only true alternative to interest.", response: "Debt has always existed; the Prophet (pbuh) incurred debts; the only condition is that debt carries no interest. The issue is preference for equity, not prohibition of debt modes.", alternative: "The minority/pioneer view that Islamic banking in letter and spirit means Shirkah-based transactions (noted in the Preface).", takeaway: "Use all permitted modes with a preference and balance towards equity, considering savers’ risk profiles." }],
      related: ["t8.6", "t17.3.7"],
      quickCheck: { q: "What is the author’s position on debt-creating modes?", options: ["They are prohibited", "They are permissible; equity modes are preferable but debt modes remain valid tools", "They should replace equity", "Only for governments"], answer: 1, explanation: "p. 86." }
    },
    {
      id: "t4.4", section: "4.4", title: "Islamic Banking: Business versus Benevolence", pages: [86, 86], tier: "core",
      concepts: ["qard-hasan"],
      intuition: "Should an Islamic bank give interest-free loans to everyone? No — it manages depositors’ money as a trust.",
      simple: "It is a myth that Islamic banks should be charities giving free loans. Business and benevolence are separate. Banks hold depositors’ money in trust and must earn Halal returns through trade, leasing and services. They may lend free from their own equity or charity fund, but not at the cost of depositors.",
      academic: ["Islamic banks do business like conventional banks while observing Shari’ah. The myth that they should be social security centres providing only return-free loans must be removed. Individuals may spend on benevolence from their own income, but banks holding depositors’ money in trust cannot dole it out. Middle-class savers’ funds are used by generally richer business groups; banks share income with fund owners. Return-free loans from the bank’s own equity or Charity Fund (with Shari’ah advisor approval) are possible but must not affect fiduciary duties. Social/welfare activities are possible but are not the normal course of business."],
      exam: "Business ≠ benevolence. Banks hold deposits in trust → trade, Ijarah, services. Free loans only from own equity/charity fund without harming fiduciary duties.",
      keyPoints: ["Middle-class deposits often fund richer businesses — giving them away free would be unjust to depositors."],
      confusions: [{ wrong: "Islamic banks should provide cost-free money.", right: "Islamic banking is a business using savers’ funds; it does not mean cost-free money." }],
      related: ["t17.3.9", "t7.4"],
      quickCheck: { q: "Out of which funds may an Islamic bank give return-free loans?", options: ["Depositors’ investment funds at its discretion", "Its own equity or accumulated Charity Fund, with Shari’ah approval", "Current account balances", "None at all"], answer: 1, explanation: "p. 86." }
    },
    {
      id: "t4.5", section: "4.5", title: "Exchange Rules", pages: [87, 89], tier: "core",
      concepts: ["bai-sarf", "riba-fadl", "forex"],
      intuition: "Conventional markets allow both sides of a trade to be deferred. Why can’t Islamic finance?",
      simple: "In Islamic finance only one side of an exchange may be deferred, and you cannot sell what you do not own or possess. Currencies must be exchanged spot (OIC Fiqh Council, 1998). Forward cover can only be a promise, with the actual exchange simultaneous; Salam in currencies is not valid.",
      academic: [
        "The strategic difference: in conventional finance both items can be deferred and goods/options sold without ownership or risk; in Islamic finance only one item may be delayed and goods not owned or possessed cannot be sold. Goods (other than monetary units), durables and shares in asset pools can be exchanged for money at market prices with at least one item spot. Athman follow Bai‘ al Sarf. Usufruct and services may be paid in advance, spot or deferred. Loans/debts are paid without premium or discount and cannot be sold except to the original debtor at face value.",
        "OIC Fiqh Council (11th session, 1998): deferred sale of currencies, or fixing a future date for exchange, is not permissible; governments should regulate money markets. Ninth session (1995): crediting a customer’s account (directly, by transfer, via Sarf purchase, or via cross-currency transfer) is valid; usual processing delay is allowed, but the beneficiary cannot deal in the currency until it is drawable. Nawavi’s rules; futures in gold and silver (as Thaman) are forbidden. Debt settlement should reference the original legal standard and date.",
        "Currency futures: some scholars forbid all; others forbid one spot/one deferred but permit a future exchange of both at an agreed rate. Forward cover can therefore be taken only as a promise, for real trade needs and not speculation, with simultaneous exchange. Salam in currencies (even in Fulus) is invalid: paper money can only be a price; deferring both sides is debt against debt."
      ],
      exam: "Only one counter-value may be deferred; no sale of unowned goods. Currencies: spot only (OIC 1998). Forward cover via promise for genuine needs, simultaneous exchange. Salam in currency invalid. Debts not sold except to debtor at face value.",
      keyPoints: [
        "Only one item of an exchange may be deferred.",
        "Currencies: same currency — equal and spot; different — spot.",
        "Usual crediting delay allowed, but no dealing until drawable.",
        "Promise-based forward cover only for real needs."
      ],
      table: { caption: "Exchange rules by asset type (Section 4.5)", head: ["Asset", "Rule"], rows: [["Goods, durables, shares in asset pools", "Market pricing; at least one counter-value spot"], ["Gold, silver, currencies (Athman)", "Bai‘ al Sarf: equal and spot (same); spot (different)"], ["Usufruct and services", "Rent/wages in advance, spot or deferred"], ["Loans/debts", "No premium or discount; not sold except to original debtor at face value"]] },
      confusions: [{ wrong: "A currency forward contract can be structured as Salam.", right: "Paper money can only be a price; currency exchange needs simultaneous payment, so Salam in currencies is invalid." }],
      related: ["t3.2.1.d", "t8.8.7", "t14.4.5"],
      quickCheck: { q: "How can an Islamic bank provide forward cover in currencies to an importer, per Section 4.5?", options: ["A forward contract with one side deferred", "A promise to exchange at an agreed rate, with simultaneous actual exchange later, for real needs", "Salam in currency", "An option contract"], answer: 1, explanation: "p. 89." }
    },
    {
      id: "t4.6", section: "4.6", title: "Time Value of Money in Islamic Finance", pages: [89, 90], tier: "core",
      concepts: ["time-value"],
      intuition: "Does Islam deny the time value of money? No — it recognises it only through the pricing of goods, not in loans.",
      simple: "Scholars almost unanimously allow a credit price higher than the cash price, provided one price is fixed before the parties separate. That is time value through pricing goods. But once the price is fixed, no addition for delay is allowed. Salam prices are lower than spot prices. Time preference is positive in an Islamic economy.",
      academic: [
        "There is near consensus that the credit price may exceed the cash price if one price is settled before separation; the Fiqh Academy and Shari’ah boards approve this — acceptance of time value of money in pricing goods. Prohibited is any addition to the agreed price for delay, since the sold commodity belongs to the buyer and the seller cannot re-price it. Time and place legitimately affect prices through market forces. Spot-only exchange of monetary values also reflects time value (one cannot benefit from money received without giving its counter value). In Salam the advance price is genuinely lower than the spot price.",
        "Time valuation is possible only in trade of goods, not in exchanging monetary values or in loans/debts. Valuing the credit period for pricing goods or usufruct differs from conventional opportunity cost or time value; mark-up in trade is permissible if trade rules are observed, but no time value can be added to a loan or debt once created. An overwhelming majority of Islamic economists believe agents have positive time preference; there is no justification for assuming zero time preference."
      ],
      exam: "Time value recognised only via pricing of goods/usufruct (credit price > cash price if fixed before separation; Salam price < spot). No time value on loans/debts once created. Positive time preference in Islamic economy.",
      keyPoints: [
        "One price must be settled before the parties separate.",
        "No re-pricing of sold goods.",
        "Salam price is lower than spot price.",
        "Positive, not zero, time preference."
      ],
      distinctions: [{ a: "Time value in pricing goods", b: "Time value on money/debts", text: "The first is permitted (credit price, Salam price); the second is Riba (interest, increasing a debt)." }],
      related: ["t6.5.3", "t17.3.4", "t1.9"],
      quickCheck: { q: "Under what condition may a credit price be higher than the cash price?", options: ["Never", "If one price is settled before the parties separate", "If interest is disclosed", "Only for governments"], answer: 1, explanation: "p. 89." }
    },
    {
      id: "t4.7", section: "4.7", title: "Money, Monetary Policy and Islamic Finance", pages: [90, 90], tier: "supporting",
      concepts: ["money"],
      intuition: "Why does the role of money differ between conventional and Islamic finance?",
      simple: "Conventional finance treats money as a commodity that can be bought, sold and rented. Islamic finance treats money as a medium of exchange; the Prophet (pbuh) favoured money over barter, and the prohibition of Riba Al-Fadl supports the move to a money economy.",
      academic: ["In the conventional system money is a commodity that can be sold, bought and rented regardless of its use by the borrower. In Islamic finance its status, role and functions differ, so the principles and operations differ. The advantages of money as a medium of exchange are conceded; the Prophet (pbuh) favoured money over barter, and prohibiting Riba Al-Fadl is a step towards a money economy, making barter rational and free from injustice."],
      exam: "Conventional: money = commodity to rent/sell. Islamic: money = medium of exchange; Riba Al-Fadl prohibition supports transition to money economy.",
      keyPoints: ["Money is not a commodity for rent in Islamic finance."],
      related: ["t4.7.1", "t4.7.2"],
      quickCheck: { q: "How does conventional finance treat money, according to the author?", options: ["Only as a medium of exchange", "As a commodity that can be sold, bought and rented", "As gold", "As Zakat"], answer: 1, explanation: "p. 90." }
    },
    {
      id: "t4.7.1", section: "4.7.1", title: "Status of Paper Money", pages: [91, 91], tier: "core",
      concepts: ["money", "bai-sarf"],
      intuition: "Do Riba rules for gold and silver apply to paper notes? Yes.",
      simple: "Paper money is Thaman — like gold and silver in the past — with no intrinsic value. It is subject to all Shari’ah rules on Riba, debts and Zakat. A $10 bill cannot be sold for $11. Different countries’ currencies are different species: exchange at any rate, but hand to hand.",
      academic: ["Present fiat money is Thaman (a unit of account serving as price), wanted only for exchange and payments, with unlimited legal tender status. Paper money is subject to all Shari’ah tenets on Riba, debts and Zakat. Notes of the same currency exchange equal for equal; currencies of different countries are different species — no equality condition but Bai‘ al Sarf (hand to hand) applies. The Shariat Appellate Bench and the OIC Fiqh Council (3rd session, 1986) held paper money to be real money subject to the rules governing gold and silver for Riba, Zakat, Salam and all transactions."],
      exam: "Paper money = Thaman, real money (OIC Fiqh Council 1986; SAB). Subject to Riba, Zakat, Sarf rules. Same currency: equal + spot; different currencies: spot.",
      keyPoints: ["$10 bill cannot be sold for $11.", "OIC Fiqh Council 1986 resolution."],
      related: ["t4.5", "t4.7.2"],
      quickCheck: { q: "According to the OIC Fiqh Council (1986), paper money is:", options: ["A commodity with intrinsic value", "Real money subject to the rules governing gold and silver", "Exempt from Zakat", "Not subject to Riba rules"], answer: 1, explanation: "p. 91." }
    },
    {
      id: "t4.7.2", section: "4.7.2", title: "Trading in Currencies", pages: [91, 92], tier: "supporting",
      concepts: ["money", "forex"],
      intuition: "Why can’t money be traded like goods?",
      simple: "Money has no quality except being a measure of value and medium of exchange; all units of the same denomination are identical. So money of the same kind is not a subject of trade, and money-for-money exchanges must be equal. Most FX trading is speculative and destabilising; Al-Ghazali warned that interest deters real economic activity.",
      academic: ["Shari’ah treats money differently from commodities: money of the same denomination is not the subject matter of trade, being restricted to its role as medium of exchange and measure of value; if exchanged or borrowed, payment on both sides must be equal. Taqi Usmani (SAB): commodities have different qualities and are identified, while all money units of the same denomination are equal. John Gray (False Dawn): FX transactions of about $1.2 trillion a day, over fifty times world trade, about 95% speculative, can disrupt the real economy (Barings, 1995). Imam Al-Ghazali: interest is prohibited because it prevents people from real economic activities."],
      exam: "Money not subject of trade (same denomination); exchange/borrowing must be equal. FX speculation destabilises; Al-Ghazali: interest deters real activity.",
      keyPoints: ["All units of money of the same denomination are equal."],
      related: ["t4.7.1", "t8.8.7"],
      quickCheck: { q: "Which classical scholar is quoted as saying interest prevents people from undertaking real economic activities?", options: ["Ibn Khaldun", "Imam Al-Ghazali", "Ibn Taymiyah", "Shah Waliullah"], answer: 1, explanation: "p. 92." }
    },
    {
      id: "t4.7.3", section: "4.7.3", title: "Creation of Money from the Islamic Perspective", pages: [92, 94], tier: "detailed",
      concepts: ["money", "monetary-policy"],
      intuition: "Can Islamic banks create money out of nothing? No — their instruments must be real-asset based.",
      simple: "Money and credit growth should match the supply of goods and services. Islamic banks cannot create money without real assets; they can securitise asset-based operations. Regulators should monitor deficit financing by the central bank, commercial banks’ credit creation and external factors. Economists differ: some want 100% reserves, others accept credit creation without interest.",
      academic: [
        "Fiat money can be created by ledger entries without corresponding goods, causing distortions and exploitation. In Islamic finance, money/credit growth should match goods and services; persistent mismatches are inconsistent with its principles. Islamic instruments must be real-asset based; banks cannot create money out of nothing but can securitise asset-based operations, transferring ownership, risk and reward to security holders. Deficit financing by Islamic banks is not possible until governments have sufficient real assets or convert debt to compliant securities.",
        "Regulators should monitor three sources of monetary expansion: central bank financing of budget deficits (the major source), secondary credit creation by commercial banks (derivative deposits in a fractional reserve system — regulate base money and prevent reserve-sweep programmes), and exogenous factors (e.g. mop up liquidity from capital inflows and invest in commodity-producing avenues). Monetary growth should be neither inadequate nor excessive.",
        "The literature assumes a two-tier Mudarabah/Shirkah model, though current practice uses fixed-income modes. Early writers saw credit money as morally wrong and favoured 100% reserves; others argue credit will be created only to the extent of genuine profitable opportunities. All agree interest is the villain; under an interest-based system entrepreneurs must target profits well above interest, raising prices or cutting wages. Under Shirkah, overexpansion is limited as losses attach to the credit-creating banks; the bank–client relationship is partner/investor/trader, not creditor/debtor."
      ],
      exam: "Money/credit growth should match real goods/services; Islamic instruments real-asset based; banks can securitise but not create money from nothing. Monitor: central bank deficit financing, derivative deposits, exogenous flows. Debate: 100% reserve vs interest-free credit creation.",
      keyPoints: [
        "Three sources of monetary expansion to monitor.",
        "Monetary growth neither inadequate nor excessive.",
        "Debate: 100% reserve system vs permitted credit creation.",
        "Interest, not credit creation per se, drives trade cycles (in this view)."
      ],
      debate: [{ issue: "Should Islamic banks create credit?", criticism: "Early Islamic economists: credit money is morally wrong, creates artificial purchasing power; adopt 100% reserves and let the central bank issue extra money.", response: "Others: in an interest-free system, credit will be created only to the extent genuine profitable opportunities exist; credit is not ‘the child of interest’.", alternative: "Both sides agree interest is the villain; measured credit without interest may not harm the payment system.", takeaway: "The key issue is interest in the credit system, not credit creation as such." }],
      related: ["t2.5.5", "t15.3", "t18.2"],
      quickCheck: { q: "What does the author identify as the major source of monetary expansion?", options: ["Exports", "Financing government budget deficits by borrowing from the central bank", "Zakat", "Islamic bank deposits"], answer: 1, explanation: "p. 92." }
    },
    {
      id: "t4.7.4", section: "4.7.4", title: "Currency Rate Fluctuation and Settlement of Debts", pages: [94, 96], tier: "core",
      concepts: ["indexation", "dayn"],
      intuition: "If inflation erodes the value of a receivable, can an Islamic bank index it? No — debts are repaid in the same currency and amount.",
      simple: "Debts must be repaid in the same kind and quantity regardless of changes in currency value. Islamic banks cannot index receivables, though some modes (like Ijarah) may use a floating rate for future periods if agreed upfront. If the debt currency becomes unavailable, its counter value is paid at the due-date rate. The OIC Fiqh Council (1988) forbids linking fixed debts to currency fluctuation.",
      academic: [
        "Even conventional finance rarely uses indexation; it uses floating rates for future periods without affecting accrued liability. Islamic banks may not link any debt/receivable for indexation; in certain modes they may stipulate a floating rate for remaining periods (e.g. Ijarah rentals, if provided for in the agreement), but accrued rentals cannot be indexed.",
        "Loans and debts are repaid in the same kind and quantity irrespective of value changes — applicable to credit, barter, deferred currency exchange, delayed remuneration after devaluation, indemnity and currency changes. If the debt currency is extinct or unavailable, its counter value is paid at the rate of the due date (e.g. SR 10 due 31 December paid in Rupees at the 31 December rate). Latin American indexation in the 1980s failed to control inflation. The Nass (2:279) permits only the principal, so Ijtihad cannot justify indexation. Taqi Usmani: indexation is impractical for banks since they would receive and pay the same inflation rate, leaving nothing for the bank. OIC Fiqh Council (5th session, 1988): a fixed debt is repaid in its own currency; it is not permitted to attach fixed debts to currency fluctuation."
      ],
      exam: "No indexation of debts (Nass 2:279; OIC Fiqh Council 1988). Floating rate allowed only for future periods if agreed (e.g. Ijarah). Unavailable currency → counter value at due-date rate. Indexation also impractical for banks (Usmani).",
      keyPoints: [
        "Accrued debts/rentals cannot be indexed.",
        "Floating rentals for future periods may be agreed in Ijarah.",
        "Due-date exchange rate applies if the debt currency is unavailable.",
        "Ijtihad does not operate where a Nass exists."
      ],
      examples: [{ title: "Saudi Riyal debt", kind: "textbook", text: "A credit sale on 1 July creates a debt of SR 10 payable on 31 December. The buyer owes SR 10 whatever the Riyal’s value; if payment must be in Rupees, the 31 December exchange rate applies." }],
      calc: { type: "fx-settlement" },
      related: ["t7.17", "t3.2.1.c", "t11.3.2"],
      quickCheck: { q: "A debt of SR 10 falls due on 31 December but must be paid in Rupees. Which exchange rate applies?", options: ["The rate on the contract date", "The rate on the due date (31 December)", "An inflation-adjusted rate", "Any rate the creditor chooses"], answer: 1, explanation: "p. 95." }
    }
  ],
  summary: "Islamic finance requires institutions and clients to follow Islamic jurisprudence, avoiding Riba, Gharar and Qimar. Not all gains on capital are prohibited — only increases stipulated over the principal of loans or debts. Profit is the reward of capital, but capital bears the risk of loss; transactions must be associated with goods, services or benefits. Islamic banks deal in goods, share risk and handle physical assets, facing unique risks. Currency exchange must follow the Sarf rules. Time value is recognised only in the pricing of sale and lease contracts: a credit price can exceed the cash price if fixed before finalisation, but a created debt cannot increase. Lending is a virtuous act, not a business; Islamic banking is a business, and while Shirkah modes are preferable, trade and lease modes are also permissible.",
  takeaways: [
    "Loan ≠ investment; only real-activity investment earns return.",
    "Table 4.1: liquidity, guarantee and return differ across modes.",
    "Fixed returns are allowed in trade and Ijarah, never on loans/debts.",
    "Al Kharaj bi-al-Daman: profit follows liability.",
    "Islamic banks deal in goods, not money; face extra asset, Shari’ah and withdrawal risks.",
    "Only one counter-value may be deferred; currencies exchange spot.",
    "Time value via pricing goods only; no indexation of debts.",
    "Debt modes are permissible; equity preferred — preference, not prohibition."
  ],
  checklist: [
    "Can you explain why a bond purchase is not ‘investment’?",
    "Can you reproduce Table 4.1?",
    "Can you explain why fixed Ijarah rent is not interest?",
    "Can you state and apply Al Kharaj bi-al-Daman?",
    "Can you list the additional risks of Islamic banks and how they are mitigated?",
    "Can you explain how forward FX cover can be provided Islamically?",
    "Can you explain time value of money in Islamic finance?",
    "Can you state the OIC ruling on indexation and the due-date rule?"
  ],
  flashcards: [
    { id: "f4.1", cat: "Principles", front: "Loan vs investment (Islamic context)", back: "Loan: monetary transaction with full repayment and no return — not investment. Investment: funds become part of real activity; return permissible.", topic: "t4.2" },
    { id: "f4.2", cat: "Financing modes", front: "Table 4.1 — which modes are liquid?", back: "Ijarah and sharing modes (Musharakah, Mudarabah); credit sales, Salam and Istisna‘a are non-liquid (receivables cannot be sold).", topic: "t4.2.4" },
    { id: "f4.3", cat: "Financing modes", front: "Rate of return in Salam and Istisna‘a", back: "Basically unknown (sale price on delivery uncertain), but can be partly known via a parallel contract or promise to purchase.", topic: "t4.2.4" },
    { id: "f4.4", cat: "Principles", front: "Are all pre-fixed returns Riba?", back: "No. Fixed returns are permissible in trade (credit price) and Ijarah (rent) if Shari’ah rules are met; any increase on loans/debts is Riba.", topic: "t4.2.5" },
    { id: "f4.5", cat: "Banking", front: "Two benchmarks needed in Islamic finance", back: "A price (mark-up/rent) reference scale and a sharing-ratio reference scale (e.g. inter-bank or central bank Mudarabah ratio).", topic: "t4.2.5" },
    { id: "f4.6", cat: "Arabic terminology", front: "Al Kharaj bi-al-Daman / Al Ghunm bil Ghurm", back: "Entitlement to profit goes with liability for loss — the criterion of legality of any return on capital.", topic: "t4.2.6" },
    { id: "f4.7", cat: "Risk", front: "Additional risks of Islamic banks", back: "Asset, market and Shari’ah non-compliance risks; greater rate-of-return, fiduciary, legal and withdrawal risks.", topic: "t4.2.9" },
    { id: "f4.8", cat: "Arabic terminology", front: "Shart-e-Jazai", back: "Price-reduction clause for delay in delivery — allowed in Istisna‘a (not in Murabaha/Salam, where penalties go to charity).", topic: "t4.2.9" },
    { id: "f4.9", cat: "Arabic terminology", front: "Al Ujrah wal Dhaman La Tajtami‘an", back: "Rent/wage and liability do not combine: a lessee paying rent cannot also bear the asset’s ownership risk.", topic: "t4.2.9" },
    { id: "f4.10", cat: "Contract rules", front: "Key exchange rule in Islamic vs conventional finance", back: "Islamic: only one counter-value may be deferred; no sale of goods not owned/possessed. Conventional: both can be deferred.", topic: "t4.5" },
    { id: "f4.11", cat: "Capital markets", front: "Forward FX cover in Islamic banking", back: "Only as a promise to exchange at an agreed rate for real trade needs; actual exchange of both currencies simultaneous. Salam in currencies is invalid.", topic: "t4.5" },
    { id: "f4.12", cat: "Principles", front: "Time value of money in Islamic finance", back: "Recognised only in pricing goods/usufruct (credit price > cash price if fixed before separation; Salam price < spot). No addition to a debt once created.", topic: "t4.6" },
    { id: "f4.13", cat: "Exam facts", front: "OIC Fiqh Council 1986 on paper money", back: "Paper money is real money, possessing all characteristics of value, subject to rules governing gold and silver (Riba, Zakat, Salam, etc.).", topic: "t4.7.1" },
    { id: "f4.14", cat: "Exam facts", front: "OIC Fiqh Council 1988 on currency fluctuation", back: "A fixed debt is repaid in its own currency; it is not permitted to attach fixed debts to currency fluctuation.", topic: "t4.7.4" },
    { id: "f4.15", cat: "Banking", front: "Business vs benevolence", back: "Banks hold deposits in trust; they must do business (trade, Ijarah, services). Free loans only from own equity/charity fund without harming depositors.", topic: "t4.4" },
    { id: "f4.16", cat: "Principles", front: "Debt vs equity — the author’s view", back: "Not a prohibition of debt modes but a preference for equity; aim for a healthy balance; debt must not carry interest.", topic: "t4.3" }
  ],
  questions: [
    { id: "q4.1", type: "mcq", q: "Which of the following would count as ‘investment’ in the Islamic sense?", options: ["Purchasing a corporate bond", "A conventional fixed deposit", "Buying goods and selling them on at a profit", "Buying a promissory note at a discount"], answer: 2, explanation: "Investment must involve real activity (p. 74).", topic: "t4.2", diff: "E", level: "understanding", obj: "Distinguish loan from investment" },
    { id: "q4.2", type: "match", q: "Match each contract to its liquidity in Table 4.1.", pairs: [["Murabaha/credit sale", "Non-liquid"], ["Ijarah", "Liquid"], ["Musharakah", "Liquid"], ["Istisna‘a", "Non-liquid"]], explanation: "Debt-mode receivables cannot be sold; Ijarah and sharing-mode assets can.", topic: "t4.2.4", diff: "M", level: "recall", obj: "Classify modes by liquidity" },
    { id: "q4.3", type: "tf", q: "Using an interest-based benchmark (such as LIBOR) to price a Murabaha makes the transaction un-Islamic even if all trade rules are followed.", answer: false, explanation: "Scholars say it does not, so long as the rules of trade and Ijarah are applied (p. 81).", topic: "t4.2.5", diff: "M", level: "understanding", obj: "Explain benchmarks" },
    { id: "q4.4", type: "scenario", q: "A leased machine is destroyed by fire through no fault of the lessee. According to Chapter 4:", options: ["The lessee must pay rent and replace the machine", "The bank bears the loss and its right to rent ceases", "The lessee pays rent but not replacement", "The loss is shared 50:50"], answer: 1, explanation: "Ownership risk stays with the lessor; rent ceases if the asset cannot deliver its benefit without lessee fault (pp. 83, 85).", topic: "t4.2.7", diff: "M", level: "application", obj: "Apply ownership risk in Ijarah" },
    { id: "q4.5", type: "identify", q: "“One has to bear loss, if any, if he wants to get any profit over his investment.” This maxim is:", options: ["Al Ujrah wal Dhaman La Tajtami‘an", "Al Kharaj bi-al-Daman", "Ibahatul Asliyah", "Shart-e-Jazai"], answer: 1, explanation: "p. 81.", topic: "t4.2.6", diff: "E", level: "recall", obj: "Identify key maxims" },
    { id: "q4.6", type: "multi", q: "Which are additional (or greater) risks Islamic banks face according to Section 4.2.9? (Select all.)", options: ["Shari’ah non-compliance risk", "Asset risk", "Withdrawal risk", "No legal risk at all", "Fiduciary risk"], answer: [0, 1, 2, 4], explanation: "They face greater legal risk, not none.", topic: "t4.2.9", diff: "M", level: "recall", obj: "List Islamic banks’ risks" },
    { id: "q4.7", type: "application", q: "An importer wants to lock in a USD/PKR rate for payment in 3 months. Which structure is consistent with Section 4.5?", options: ["A forward contract with PKR paid now, USD in 3 months", "A promise to exchange at the agreed rate in 3 months, both currencies then exchanged simultaneously", "A Salam contract selling USD", "An option contract"], answer: 1, explanation: "Forward cover as a promise for real needs; actual exchange simultaneous (p. 89).", topic: "t4.5", diff: "H", level: "application", obj: "Apply currency exchange rules" },
    { id: "q4.8", type: "tf", q: "Islamic finance recognises the time value of money only through the pricing of goods and usufructs, not in loans or debts.", answer: true, explanation: "p. 90.", topic: "t4.6", diff: "E", level: "understanding", obj: "Explain time value of money" },
    { id: "q4.9", type: "mcq", q: "What did the OIC Fiqh Council (1988) resolve on linking debts to currency fluctuation?", options: ["It is recommended", "It is not permitted; fixed debts are repaid in their own currency", "Allowed for Islamic banks only", "Allowed if inflation exceeds 10%"], answer: 1, explanation: "p. 96.", topic: "t4.7.4", diff: "M", level: "recall", obj: "Recall rulings on indexation" },
    { id: "q4.10", type: "comparison", q: "How does the bank’s net return in Ijarah differ from that in a credit sale?", options: ["Ijarah return is quasi-fixed because the bank bears asset risk and ownership expenses", "Both are fully fixed and risk-free", "Ijarah has unknown return like Musharakah", "Credit sale return is variable"], answer: 0, explanation: "p. 77.", topic: "t4.2.4", diff: "H", level: "analysis", obj: "Compare risk–return profiles" },
    { id: "q4.11", type: "scenario", q: "A widow asks an Islamic bank to invest her savings with low risk. Which view does the author support?", options: ["Only Musharakah is allowed", "The bank as trustee may invest her funds in trade- and Ijarah-based activities", "She must accept Mudarabah risk", "Islamic banks cannot help risk-averse savers"], answer: 1, explanation: "Section 4.3.", topic: "t4.3", diff: "M", level: "application", obj: "Apply mode preference" },
    { id: "q4.12", type: "short", q: "Explain why Islamic banks cannot provide return-free loans from depositors’ funds at their discretion.", answer: "Banks hold depositors’ money as a trust; business and benevolence are separate. Doling out trust funds would breach fiduciary duty to (mainly middle-class) depositors. Free loans may be given only from the bank’s own equity or charity fund with Shari’ah approval without affecting depositors.", keywords: ["trust", "fiduciary", "depositors", "equity", "charity"], explanation: "Section 4.4.", topic: "t4.4", diff: "M", level: "understanding", obj: "Explain business vs benevolence" },
    { id: "q4.13", type: "order", q: "Put the steps of a bank Murabaha (as described in Section 4.2.7) in order.", items: ["Bank purchases goods directly or through an agent", "Bank takes ownership and bears the related risk", "Bank sells the goods to the client at cost plus profit", "Risk passes to the client, who pays at the settled time"], explanation: "p. 83.", topic: "t4.2.7", diff: "E", level: "understanding", obj: "Sequence trade-based financing" }
  ],
  exam: [
    { id: "e4.1", kind: "long", q: "“All pre-fixed returns are not Riba.” Discuss with reference to sale, Hibah, loan and Ijarah.", structure: ["Introduce the nature-of-transaction test", "Bai‘: ownership, risk transfer; credit price; no re-pricing", "Hibah: free permanent transfer", "Loan/Riba al-Nasiah vs Qard al Hasan", "Ijarah: rent with ownership risk; why the rent–interest analogy fails", "Conclusion: fixed profit in trade/leasing; nothing over principal in loans/debts"], keyConcepts: ["Bai‘", "Ijarah", "Qard", "time value", "ownership risk"], points: ["Credit price vs cash price", "No Murabaha rollover", "Money cannot be leased", "Usufruct uncertain"], mistakes: ["Saying Islamic finance requires all returns to be variable"], topic: "t4.2.5" },
    { id: "e4.2", kind: "short", q: "Explain the maxim Al Kharaj bi-al-Daman and its implications for loans, sale and Ijarah.", structure: ["State the maxim", "Loans: no profit", "Trade: risk transfer on sale", "Ijarah: lessor bears ownership risk", "Risk mitigation vs elimination"], keyConcepts: ["Al Ghunm bil Ghurm", "ownership risk"], points: ["Cannot transfer risk without reward"], mistakes: ["Suggesting risk can be fully eliminated"], topic: "t4.2.6" },
    { id: "e4.3", kind: "difference", q: "Differentiate between conventional banks and Islamic banks in terms of what they deal in and the risks they bear.", structure: ["Conventional: money and documents", "Islamic: goods and assets", "Mode-by-mode risk", "Additional risks"], keyConcepts: ["asset risk", "Parallel Salam", "Wakalatul Istismar"], points: ["Banks deal in documents not goods (conventional)", "Islamic banks take ownership"], mistakes: ["Ignoring fee-based income rules"], topic: "t4.2.7" },
    { id: "e4.4", kind: "conceptual", q: "Does Islamic finance recognise the time value of money? Explain.", structure: ["Credit vs cash price consensus", "Salam price", "Spot exchange of money", "No time value on loans/debts", "Positive time preference"], keyConcepts: ["time value", "mark-up", "opportunity cost"], points: ["One price fixed before separation", "No addition after debt created"], mistakes: ["Claiming Islam denies time value entirely"], topic: "t4.6" },
    { id: "e4.5", kind: "viva", q: "Can an Islamic bank index a Murabaha receivable to inflation?", structure: ["No — Nass 2:279", "OIC 1988", "Floating only for future periods in Ijarah"], keyConcepts: ["indexation"], points: ["Due-date exchange rule"], mistakes: ["Confusing floating Ijarah rent for future periods with indexation of accrued debt"], topic: "t4.7.4" }
  ]
});
