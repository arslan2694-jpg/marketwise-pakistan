/* Chapter 14 — Application of the System: Financing Principles and Practices. Source pp. 357–388. */
IFL_DATA.registerChapter({
  number: 14,
  title: "Application of the System: Financing Principles and Practices",
  part: "part-iii",
  pages: [357, 388],
  minutes: 85,
  difficulty: "Advanced",
  objectives: [
    "Describe the product development process for Shari’ah-compliant products.",
    "Explain deposit pool management, mode selection (Boxes 14.1–14.2) and tenor of financing.",
    "Apply internal Shari’ah controls for Murabaha, Ijarah, DM, Musharakah and investments, and operational controls.",
    "Explain Islamic structures for working capital, trade, project finance, syndication and liquidity management.",
    "State Shari’ah rules for foreign exchange, forward currency cover and central bank refinance (IERS).",
    "Evaluate debit, charge and credit card structures in use.",
    "Explain relations with conventional banks and fee-based services (underwriting, L/G, L/C) and Shari’ah board functions."
  ],
  why: "This is the ‘practice’ chapter: how an Islamic bank actually turns the modes into products, controls them, and uses them for working capital, trade, projects, liquidity, FX and cards. Case-style exam questions on Murabaha controls, bill-discounting alternatives, forward cover conditions and Islamic credit cards come from here.",
  overview: "The chapter moves from product development and the nature of IFIs' business (funds, pools, mode selection, tenor) to Shari’ah and operational controls, then to specific financing areas — working capital, trade, project finance and syndication, liquidity, FX and forward cover, SBP's Islamic export refinance, and cards — followed by relations with conventional banks, fee-based services and an appendix on Shari’ah supervisory boards.",
  summarySection: "14.7",
  topics: [
    {
      id: "t14.1", section: "14.1", title: "Introduction: Principles of Islamic Financing", pages: [357, 357], tier: "core",
      concepts: ["intermediation", "product-development"],
      intuition: "What must an Islamic bank's investment side achieve that a conventional bank's need not?",
      simple: "‘Money earning money’ does not fit the Islamic structure: money must be invested in goods yielding profit through risk-taking and value addition. Islamic banks must run win–win business while avoiding interest, Gharar, gambling and unethical practices, designing diversified portfolios with profit and liquidity. The biggest challenge is products that are Shari’ah-compliant yet meet changing business needs; innovation requires joint effort of scholars and bankers.",
      academic: ["Intermediation mobilises resources from surplus to deficit units; deposits were covered in Chapters 8 and 12. Prudent financing needs product development, risk management and Shari’ah compliance. Innovation is the most critical success factor and differs from conventional product development in its additional Shari’ah parameters."],
      exam: "Principles: no money-for-money; profit via risk and value addition; avoid Riba, Gharar, gambling; balance profit, risk and liquidity; innovation by scholars + bankers.",
      keyPoints: ["Credibility depends on genuine compliance plus meeting business needs."],
      related: ["t14.2", "t4.1"],
      quickCheck: { q: "According to the chapter, what is the biggest challenge facing Islamic finance?", options: ["Lack of deposits", "Developing products that are Shari’ah-compliant and meet changing business needs", "Taxation", "Staff salaries"], answer: 1, explanation: "p. 357." }
    },
    {
      id: "t14.2", section: "14.2", title: "Product Development and its Procedure", pages: [358, 358], tier: "core",
      concepts: ["product-development"],
      intuition: "What steps turn an idea into an approved Islamic product?",
      simple: "Product development creates and re-engineers products within Shari’ah, regulatory and legal limits. Procedure: assess need; generate ideas; discuss with Shari’ah advisor/board; develop procedures and an operational manual; final Shari’ah approval. Risk management, accounting, tax, legal and IT must be involved; staff trained; the product revised after launch using feedback. A product may combine several modes (e.g. DM housing uses Shirkah, Ijarah, Istisna‘a and Wakalah), and all their rules apply.",
      academic: ["Deciding factors: market survey; Shari’ah compliance (mode, assets, process, documentation); depositors' risk profile; clients' cash flows; risk mitigation; legal matters; managing the liquidity–profitability mismatch. The manual is discussed with operations staff; marketing and operations staff must know product advantages."],
      exam: "Procedure: need → ideas → Shari’ah board → procedures/manual → Shari’ah approval; involve risk, accounting, tax, legal, IT; training; post-launch revision. Multi-mode products must satisfy each mode's rules.",
      keyPoints: ["Launch starts the revision cycle.", "DM housing = Shirkah + Ijarah + Istisna‘a + Wakalah."],
      steps: ["Assess the need", "Generate ideas", "Discuss structure with the Shari’ah advisor/board", "Develop procedures and operational manual", "Risk, accounting, tax, legal and IT review", "Final Shari’ah approval", "Train staff and launch", "Revise using feedback"],
      related: ["t14.3.4"],
      quickCheck: { q: "Which modes may a DM-based housing product combine, per Section 14.2.1?", options: ["Only Shirkah", "Shirkah, Ijarah, Istisna‘a and Wakalah", "Murabaha and Salam", "Tawarruq and ‘Inah"], answer: 1, explanation: "p. 358." }
    },
    {
      id: "t14.3", section: "14.3", title: "The Nature of Financial Services/Business", pages: [358, 359], tier: "supporting",
      concepts: ["intermediation"],
      intuition: "Where do Islamic banks get their money, and on what contractual basis?",
      simple: "Players include Islamic commercial and investment banks, NBFIs, funds and unit trusts, market players, pilgrimage funds, cooperatives and Takaful companies, regulated by central banks or securities commissions. Sources of funds: equity, general and investment deposits, interbank borrowing and sometimes the central bank. Mobilisation is by Mudarabah and Wakalatul Istismar; investment deposits are Shirkah-based; current accounts are loans with no return.",
      academic: ["Regulatory frameworks differ by country."],
      exam: "Funds: equity, deposits, interbank, central bank. Bases: Mudarabah, Wakalatul Istismar; current accounts = Qard (no return).",
      keyPoints: ["Current accounts are loans."],
      related: ["t14.3.1", "t8.8.1"],
      quickCheck: { q: "Current accounts in Islamic banks are normally treated as:", options: ["Mudarabah", "Loans with no return", "Musharakah", "Wakalah with fee"], answer: 1, explanation: "p. 359." }
    },
    {
      id: "t14.3.1", section: "14.3.1", title: "Management of Deposit Pools and Investments", pages: [359, 360], tier: "core",
      concepts: ["deposit-pool", "mudarabah"],
      intuition: "What would a Shari’ah auditor check in a bank's deposit pools?",
      simple: "Banks match investment strategy to depositors' risk profile: PLS modes for higher risk, debt modes for lower risk, plus financial-market and fee income. Pools: general (local/foreign currency), central bank refinance, treasury/FI, equity and specific customers' pools. Auditors check: disclosed ratios and tenor-based weightages (size-based weightages discouraged), daily-product allocation; no fixed return promised; documentation used as approved; fiduciary duties met; bank's own funds and any later donations handled correctly.",
      academic: [
        "Projected rates must be subject to adjustment by actual pool performance — e.g. even Ijarah and Murabaha returns can be affected by defaults and ownership expenses, so a pre-fixed return cannot be given; auditors may sample correspondence with high-value accounts.",
        "Remunerative deposits must not be taken as loans. After profit is distributed between bank and pools, the bank may donate part of its profit to a pool, if not pre-agreed."
      ],
      exam: "Pools: general, refinance, treasury, equity, specific. Audit: ratios/weightages disclosed (tenor-based), daily product, no fixed return, approved documents, fiduciary role, bank-own funds allocation, donation not pre-agreed.",
      keyPoints: ["Size-based weightages: permissible with disclosure but discouraged."],
      related: ["t12.7.1", "t8.8.2"],
      quickCheck: { q: "An Islamic bank tells a corporate depositor it will receive a guaranteed 8%. A Shari’ah auditor should:", options: ["Approve it", "Object — no fixed return may be assured; projected rates must adjust to actual pool results", "Ignore it", "Require 9%"], answer: 1, explanation: "pp. 359–360." }
    },
    {
      id: "t14.3.2", section: "14.3.2", title: "Selection of the Mode for Financing (Boxes 14.1–14.2)", pages: [360, 362], tier: "core",
      concepts: ["murabaha", "ijarah", "salam", "istisna", "musharakah", "diminishing-musharakah"],
      intuition: "Why is ‘Murabaha for everything’ bad banking as well as weak Shari’ah practice?",
      simple: "Using Murabaha or Ijarah for every need is neither feasible nor advisable — e.g. Murabaha is wrong for sugar-cane purchase and for long-term housing in high inflation; Ijarah is unsuitable for projects with asset, market and counterparty risks. Diversification gives better service and margins. Box 14.1 compares modes on period, rate, prepayment, asset risk, uses and late payments; Box 14.2 combines Salam with Murabaha for cotton.",
      academic: [
        "Murabaha: bank owns and bears risk until sale; then risk passes; low risk, fixed return; short term.",
        "Ijarah: nonconsumable assets; bank keeps ownership risk until termination; ‘accumulator’ (keeps assets) or ‘distributor’ (securitises); fixed or floating; suits public sector and corporates via Ijarah Sukuk.",
        "Salam: full prepayment; potential in agriculture, agro-industry and overhead finance; short and some medium term.",
        "Istisna‘a: order to manufacture/construct; flexible payment; control over seller delay.",
        "Musharakah/Mudarabah: consignment trade, project finance, import, pre-shipment export and working capital; TFCs/Sukuk.",
        "Diminishing Musharakah: houses, vehicles, machinery, commercial buildings; may involve sale and lease-back.",
        "Box 14.2: bank buys cotton on Salam; takes a textile mill's promise to buy; appoints the mill agent to take delivery; sells to the mill on Murabaha. Benefits — farmer gets cash and price protection; bank gets longer deployment, two exposures, no inventory problem and a better margin; mill hedges price."
      ],
      exam: "Match mode to need; diversify. Box 14.1 key cells: Murabaha — fixed rate, prepayment not allowed as a system, late payment = loss to bank; DM/Ijarah — long-term, fixed/variable, prepayment allowed, late payment controllable; Salam — short-term, late payment loss to bank; Musharakah — variable, joint risk. Box 14.2 Salam + promise + agency + Murabaha.",
      keyPoints: ["Late payment in Murabaha and Salam is a loss to the bank; controllable in Ijarah/DM/Istisna‘a."],
      table: {
        caption: "Box 14.1 — Salient features of major modes of financing",
        head: ["Feature", "Dim. Musharakah", "Ijarah", "Murabaha", "Salam", "Istisna‘a", "Musharakah/Mudarabah"],
        rows: [
          ["Period", "Long-term", "Long-term", "Short/long-term", "Short-term", "Short/long-term", "Short/long-term"],
          ["Rate", "Fixed/variable", "Fixed/variable", "Fixed", "Fixed", "Fixed", "Variable"],
          ["Prepayment allowed", "Yes", "Yes", "Not allowed as a system", "No", "May be structured", "Yes"],
          ["Risk of the asset", "Joint", "Financier", "Financier/customer", "Financier/customer", "Customer/financier", "Joint"],
          ["Uses", "Nonconsumable assets", "Nonconsumable assets", "Any Halal assets", "Salam compatible", "Assets to be manufactured", "Any Halal business"],
          ["Late payments", "Controllable", "Controllable", "Loss to the bank", "Loss to the bank", "Controllable", "No issue"]
        ]
      },
      examples: [{ title: "Box 14.2 — Salam and Murabaha combined", kind: "textbook", text: "The bank buys cotton from growers on Salam, obtains a textile mill's promise to buy, appoints the mill as agent to take delivery, then sells the cotton to the mill on Murabaha at the agreed price (p. 362)." }],
      related: ["t10.5", "t7.1", "t11.5", "t12.9"],
      quickCheck: { q: "According to Box 14.1, in which mode is late payment described as ‘controllable’?", options: ["Murabaha", "Salam", "Ijarah", "None"], answer: 2, explanation: "Ijarah (and DM, Istisna‘a) — p. 361–362." }
    },
    {
      id: "t14.3.3", section: "14.3.3", title: "Tenor of Financing", pages: [362, 363], tier: "core",
      concepts: ["risk"],
      intuition: "Why is mismatched tenor ‘suicidal’ for an Islamic bank?",
      simple: "Customer cash-flow analysis is vital. Conventional borrowers sometimes accept tenors that mismatch cash flows, relying on rollovers. In Islamic finance this is suicidal because an Islamic bank cannot claim liquidated damages for lost cost of funds on default. Tenor must be set carefully with the customer.",
      academic: ["The conventional approach is imprudent even by conventional rules but may work individually; Islamic banks lack the rollover and penalty-interest safety valve."],
      exam: "Tenor must match customer cash flow because Islamic banks cannot charge liquidated damages/rollover mark-up on default.",
      keyPoints: ["No rollover of Murabaha."],
      related: ["t14.3.4", "t7.15"],
      quickCheck: { q: "Why must Islamic banks align tenor with customers' cash flows?", options: ["Regulators demand it", "They cannot claim liquidated damages for cost of funds on default", "Customers prefer short tenors", "It lowers taxes"], answer: 1, explanation: "p. 363." }
    },
    {
      id: "t14.3.4", section: "14.3.4", title: "Shari’ah Compliance and Internal Shari’ah Controls", pages: [363, 367], tier: "core",
      concepts: ["shariah-governance", "murabaha", "ijarah"],
      intuition: "Which slips turn a Murabaha into a back door to interest?",
      simple: "Shari’ah compliance is the most important job; failures cause systemic risk and income loss. Boards approve structures and model documents, inspect transactions and train staff. Equity screening excludes prohibited businesses and companies with interest income >5%, leverage >10–33% or illiquid assets <10–33%. Murabaha controls: trade accounting; no rollovers; purchase within a set time; goods exist at offer; bank title and risk; documentation; mark-up only from sale date; no buy-back or sister concerns (>50%); DP notes after sale (or principal only). Ijarah controls: bank title; own before lease; defined asset, period, rent; floating rent with first rent fixed and floor/cap; Takaful; separate transfer; bank bears ownership costs; operating-lease accounting; advance rent not income; penalties to charity.",
      academic: [
        "Board duties: recommend amendments, finalise model documents, resolve implementation difficulties; staff often trained conventionally and may unintentionally deviate.",
        "Prohibited equity sectors: alcohol and tobacco; groceries dealing in Haram goods; restaurants, casinos and hotels with bars; indecent amusement; interest-based financial institutions. Haram income from permissible holdings goes to the Charity Account.",
        "Murabaha: some banks record only disbursement including mark-up (against substance); fictitious new Murabahas to roll over old ones must be stopped and returns go to charity; funds given to agents are Amanah — or pay suppliers directly; invoice dates must not be later than the agent's declaration.",
        "Tawarruq within Murabaha: the board must ensure genuine Murabaha and Halal use of cash.",
        "DM controls: independent documents; ownership costs pro rata; a non-leasable asset (open plot) cannot earn rent; commercial assets make it Shirkatul‘aqd with units sold at market/at-time value; pre-stipulated percentage revaluation makes it usurious.",
        "Musharakah: projected rates subject to final adjustment; loss by capital. Investments screened; non-compliant income and placements to charity; charity funds used for the poor and social welfare."
      ],
      exam: "Controls: Murabaha nine (trade accounting, no rollover, timely purchase, goods exist, bank title/risk, documentation, mark-up from sale, no buy-back/sister concern, DP note after sale). Ijarah ten (title, own before lease, defined terms, floating rent rules, Takaful, separate transfer, lessor costs, operating-lease accounting, advance rent, penalties to charity). Screening: interest income ≤5%, leverage ≤10–33%, illiquid ≥10–33%.",
      keyPoints: [
        "Rollover returns → Charity Account.",
        "DP note before sale: principal only.",
        "Pre-stipulated DM revaluation → usurious."
      ],
      table: {
        caption: "Murabaha internal Shari’ah controls (Section 14.3.4, condensed)",
        head: ["#", "Control"],
        rows: [
          ["1", "Account for Murabaha as trade, not a financial transaction"],
          ["2", "No rollover; extend credit only by a new genuine Murabaha on new goods"],
          ["3", "Client-agent must buy within a set maximum time and declare; funds are Amanah or pay supplier directly"],
          ["4", "Goods must exist (not consumed) at offer and acceptance"],
          ["5", "Title and all ownership risks with the bank until sale"],
          ["6", "Documentation followed; no change to master agreement without board approval"],
          ["7", "Mark-up from date of sale to client, not from disbursement"],
          ["8", "No buy-back; supplier not a sister concern (client share ≤50%)"],
          ["9", "DP notes after sale; before sale only for principal"]
        ]
      },
      related: ["t14.appx", "t7.13", "t11.6", "t8.8.5"],
      quickCheck: { q: "From when should Murabaha mark-up be charged?", options: ["From disbursement to the supplier", "From the date the bank sells the goods to the client", "From signing the MoU", "From application date"], answer: 1, explanation: "p. 365, control 7." }
    },
    {
      id: "t14.3.5", section: "14.3.5", title: "Operational Controls, Structural, Moral Hazard, Documentation and Legal Issues", pages: [367, 369], tier: "supporting",
      concepts: ["risk", "moral-hazard"],
      intuition: "What else can go wrong operationally even when the structure is compliant?",
      simple: "Because assets are risk-based, regulators should require suitable accounting standards, review project appraisal and follow-up, and evaluate monitoring of equity-financed firms. Structural: clarify every aspect with the Shari’ah board — a slight process change can send the whole income to charity. Asymmetric information and moral hazard (e.g. in Takaful of financed assets) and lessees' Ijarah rights must be anticipated. Documentation sequence and timing matter — e.g. an agency agreement signed when opening a sight L/C lets the bank convert an unpaid bill into Murabaha. Legal frameworks may require re-engineering.",
      academic: [
        "Asymmetric risk arises when one party has better information; moral hazard is increased risk of problematic behaviour when the actor does not bear the consequences.",
        "In Ijarah the client may stop using the asset, return it and refuse to buy despite his promise — mitigate at inception; check client history.",
        "The master facility agreement is the basic document; staff must be trained in execution. Islamic banks cannot recover liquidated damages by contract, so legal options and third-party guarantees matter."
      ],
      exam: "Operational: accounting standards, project appraisal, equity monitoring. Structural: pre-clear with board. Moral hazard/asymmetric info. Documentation sequence (L/C agency example). Legal framework.",
      keyPoints: ["Sight L/C without cover: agency agreement enables Murabaha."],
      definitions: [
        { term: "Asymmetric information", meaning: "One party to a transaction has more or better information than the other." },
        { term: "Moral hazard", meaning: "Increased risk of problematic behaviour because the person causing the problem does not bear the full consequences." }
      ],
      related: ["t14.3.4", "t18.3.2"],
      quickCheck: { q: "A client asks the bank only to open a sight L/C and later fails to pay. Which prior document could have protected the bank?", options: ["A DP note for mark-up", "An agency agreement enabling a Murabaha", "A penalty clause with interest", "A Tawarruq contract"], answer: 1, explanation: "p. 368." }
    },
    {
      id: "t14.4.1", section: "14.4.1", title: "Working Capital Finance", pages: [369, 370], tier: "core",
      concepts: ["murabaha", "istisna", "salam", "musharakah"],
      intuition: "How can a bank finance wages and overheads, not just raw material?",
      simple: "Murabaha is the most popular working capital mode but covers only goods. Murabaha + Istisna‘a + Wakalah: Murabaha for raw material; Istisna‘a for manufacture and overheads; goods delivered become the bank's; exporter appointed agent to export; bank deducts Istisna‘a price and profit from proceeds; client pays Murabaha price. Musharakah on a daily-product basis, possibly sharing gross profit (client bears indirect costs; larger share to client). Salam for sugar, fertiliser and cement with an agency to sell at an agreed price — the bank bears loss if prices fall.",
      academic: [
        "Musharakah working capital: direct costs (raw material, direct labour, electricity) borne jointly; indirect costs (depreciation, admin salaries) may be voluntarily borne by the client when gross profit is shared.",
        "Salam for a sugar mill: (1) Salam with full advance price and a charge on assets; (2) agency for the mill to sell at an agreed price, with any excess possibly kept as a bonus; (3) delivery from godowns and authority to sell; (4) mill pays the price; if market falls below the agreed price the bank bears the loss."
      ],
      exam: "Working capital: Murabaha (raw material); Murabaha + Istisna‘a + Wakalah (processing/overheads, export); running Musharakah (daily product; gross-profit sharing); Salam + agency (sugar, fertiliser, cement).",
      keyPoints: ["In Salam-agency, price risk stays with the bank."],
      steps: ["Murabaha for raw material", "Istisna‘a for manufacture and overheads", "Goods become the bank's on manufacture", "Exporter acts as bank's agent to export", "Bank recovers Istisna‘a price and profit from proceeds; client pays Murabaha price"],
      related: ["t10.5", "t12.7.2"],
      quickCheck: { q: "In the sugar-mill Salam with agency, if the market price falls below the agreed price, who bears the loss?", options: ["The mill", "The bank", "The government", "Shared equally"], answer: 1, explanation: "p. 370." }
    },
    {
      id: "t14.4.2", section: "14.4.2", title: "Trade Financing by Islamic Banks", pages: [370, 373], tier: "core",
      concepts: ["trade-finance", "murabaha", "musawamah"],
      intuition: "How can an exporter get cash against a bill without discounting it?",
      simple: "Trade finance is relatively easy to Islamise because it involves assets; Shirkah on a consignment basis is under-used. Banks charge service fees for L/Cs and negotiation. Bill discounting (Riba) is replaced by: interest-free loans with a collection fee (amount-related, not time-related); Musawamah (US$100,000 bill, spot Rs.57.75, bank quotes Rs.57.60 → Rs.5,760,000 funded for goods sold to the bank's client for US$100,000 due in 55 days); or buying the export goods outright and taking assignment of the L/C. Other structures: Murabaha for government commodity operations, Murabaha–Istisna‘a for exports, and L/C import Murabaha with Musawamah, sub-Murabaha, PAD, TR Murabaha and shipping guarantees.",
      academic: [
        "Post-shipment: banks may give interest-free loans against bills and collect them for a service charge; negotiation at face value.",
        "Case: exporter Abdul's US$100 million consignment under a 90-day L/C; bank B buys the goods for cash, takes assignment of the L/C, appoints Abdul agent to ship, earns its margin and receives proceeds after 90 days.",
        "Commodity operations: instead of interest-based lending to provincial governments for wheat procurement, Islamic banks form a syndicate or company that buys from farmers (via agents such as food departments) and sells to the government with a margin.",
        "Import Murabaha: master Murabaha + agency; spot Murabaha at cost is treated as Musawamah. Normal payment: Musawamah declaration at L/C cost + charges; bank's risk ends only on delivery. Financing: sub-Murabaha with profit from the Nostro debit date to settlement. PAD: sub-Murabaha on the day funds are arranged. TR Murabaha: longer tenor (≥120 days). Shipping guarantee/DO: e.g. 110% margin; sub-Murabaha at that day's FX rate; later cost differences settled — cost may be adjusted, profit not."
      ],
      exam: "Alternatives to discounting: interest-free loan + collection fee; Musawamah on bill (Rs.57.60 example); outright purchase of export goods with L/C assignment. Import Murabaha variants: Musawamah, sub-Murabaha, PAD, TR, shipping guarantee (cost adjustable, profit not).",
      keyPoints: ["Service charges amount-related, not time-related.", "In shipping-guarantee Murabaha, only the cost portion may be adjusted later."],
      examples: [{ title: "Musawamah alternative to bill discounting", kind: "textbook", text: "1 Jan 2007: exporter's US$100,000 bill due 25 Feb; spot Rs.57.75; bank quotes Rs.57.60 and funds Rs.5,760,000 as agent for raw materials; client declares possession and offers to buy the stock for US$100,000 payable 25 Feb; on receipt of the remittance, the bank debits US$100,000 (pp. 371)." }],
      related: ["t12.7.2", "t7.13"],
      quickCheck: { q: "In the import Murabaha under a shipping guarantee, if the final cost differs from the estimate, what may be adjusted?", options: ["Both cost and profit", "Only the cost portion", "Only profit", "Nothing"], answer: 1, explanation: "p. 373." }
    },
    {
      id: "t14.4.3", section: "14.4.3", title: "Project Financing and Syndication", pages: [373, 374], tier: "core",
      concepts: ["istisna", "ijarah", "musharakah", "sukuk"],
      intuition: "How do you finance a plant that doesn't exist yet?",
      simple: "Ijarah is popular for project finance but cannot be used effectively when the project must first be built. Cement plant: bank finances via Musharakah, enters Istisna‘a with a manufacturer, appoints the customer agent to supervise erection, then earns rent on its ownership share and sells units at market price (or shares production profits). Oil terminal syndicate: binding promise to lease from the operator; Istisna‘a with a contractor; operator as supervising agent; Ijarah when ready. Sukuk syndication: pools must have more than 50% Ijarah/fixed assets for trading at any price (Hanafi: over 10%); if the pool includes Murabaha receivables, the Sukuk price cannot be below the value of those debts.",
      academic: ["Sukuk holders are Musharakah partners proportionate to their ownership and assume pool rights and obligations."],
      exam: "Project: Musharakah + Istisna‘a + agency + rent + unit sale (cement plant); syndicate: promise to lease + Istisna‘a + agency + Ijarah (oil terminal); Sukuk pools >50% tangible (Hanafi >10%).",
      keyPoints: ["Ijarah alone is unsuitable for construction stage."],
      related: ["t10.10", "t15.3.6"],
      quickCheck: { q: "Under the majority view, a securitised pool can trade at any price if Ijarah/fixed assets exceed:", options: ["10%", "33%", "50%", "90%"], answer: 2, explanation: "p. 374 (Hanafi: 10%)." }
    },
    {
      id: "t14.4.4", section: "14.4.4", title: "Liquidity Management", pages: [374, 375], tier: "core",
      concepts: ["liquidity", "tawarruq", "sukuk"],
      intuition: "Without an interest-based money market, how do Islamic banks manage surplus and shortage?",
      simple: "Options: interbank Mudarabah (deficit bank shares general profit at a negotiated ratio); buying government Sukuk at par and selling them outright in the secondary market or to the central bank (like repo, but two separate outright sales); pooling Murabaha and Ijarah assets for other banks to invest (Murabaha receivables below 50%); Parallel Salam; and Tawarruq/Commodity Murabaha — a grey area to be used only in extreme cases under board guidance. Malaysian cards combining Tawarruq with buy-back are considered non-compliant by most scholars.",
      academic: ["Tawarruq on the asset side gives a fixed guaranteed return and can be done with conventional banks; it must not become a mere exchange of papers."],
      exam: "Liquidity tools: interbank Mudarabah; Sukuk buy/sell outright; asset pools (<50% receivables); Parallel Salam; Tawarruq (last resort).",
      keyPoints: ["Sukuk sale ≠ repo: two separate outright transactions."],
      related: ["t13.3.1", "t15.3.8"],
      quickCheck: { q: "When an Islamic bank invites others into a pool of its Murabaha and Ijarah assets, Murabaha receivables should be:", options: ["More than 50%", "Less than 50% of total assets", "Exactly 50%", "100%"], answer: 1, explanation: "p. 375." }
    },
    {
      id: "t14.4.5", section: "14.4.5", title: "Forward Contracts and Foreign Exchange Dealings", pages: [375, 377], tier: "core",
      concepts: ["bai-sarf", "forex"],
      intuition: "How can an importer lock in an exchange rate without a forward sale?",
      simple: "Currency exchange requires possession of both counter values (actual or constructive) before parting; same currency must be equal. Constructive possession: crediting accounts, spot exchange against deposited currency, internal transfers, blocked-cheque receipt, merchant card vouchers paid without deferment. Spot FX with two-day settlement at the deal-date rate is allowed. Debts in different currencies may be set off at an agreed rate or settled in another currency at the spot rate. Forward cover is allowed only as a unilateral promise, for genuine trade needs documented, with no cover fee — earnest money may be taken and actual loss recovered.",
      academic: [
        "Conventional forward FX creates fictitious assets and exploitation.",
        "Correspondent relations: reciprocal balances with limited debit allowances without interest.",
        "A partner in contractual Musharakah/Mudarabah may not guarantee the other against currency risk; a third party may volunteer if not stated in the contract.",
        "A bilateral binding promise to buy and sell currencies is forbidden."
      ],
      exam: "FX rules: possession before parting; equality in same currency; spot T+2 at deal rate; set-off at agreed rate; forward cover = unilateral promise, genuine need documented, no fee, earnest money for actual loss.",
      keyPoints: ["Currency dealers cannot get forward cover (speculation).", "No bilateral binding promise."],
      related: ["t3.3", "t4.7", "t6.9"],
      quickCheck: { q: "Which forward currency cover is permissible per contemporary scholars cited in the chapter?", options: ["A bilateral binding forward sale", "A unilateral promise for a documented genuine trade need, without a cover fee", "Any forward for speculation", "A forward with a premium fee"], answer: 1, explanation: "p. 377." }
    },
    {
      id: "t14.4.6", section: "14.4.6", title: "Refinancing by the Central Banks: SBP's IERS", pages: [377, 378], tier: "supporting",
      concepts: ["musharakah", "central-bank"],
      intuition: "Can a central bank support exporters without charging interest?",
      simple: "SBP's Islamic Export Refinance Scheme is Musharakah-based: SBP shares in actual profit of the Islamic bank's Musharakah pool used for export finance. Profit above the conventional EFS rate goes to a Takaful fund to absorb future losses. Pool: at least ten blue-chip companies (stock record, rating ≥B+, or ROE above EFS rates; no adverse credit reports). Profit on a daily-product basis; audited adjustments to or from the Takaful fund; losses shared by investment proportion, SBP's share first from the Takaful fund.",
      academic: ["The pool profit = gross income less provisions plus recoveries and reversals; excess over quarterly provisional payments is deposited within seven days in the non-remunerative Takaful fund; shortfalls refunded from it; in loss, the Islamic bank may reclaim provisional profit paid plus SBP's share of principal loss."],
      exam: "IERS: Musharakah pool (≥10 blue chips); SBP shares profit on daily product; excess over EFS → Takaful fund; losses by investment share (SBP's from Takaful fund first).",
      keyPoints: ["Takaful fund = risk-mitigation reserve."],
      related: ["t14.3.1", "t9.10"],
      quickCheck: { q: "Under the IERS, profit to SBP above conventional EFS rates is credited to:", options: ["SBP's income", "A Takaful fund reserve", "The exporter", "Charity"], answer: 1, explanation: "p. 378." }
    },
    {
      id: "t14.4.7", section: "14.4.7", title: "Cards: Debit, Charge, Credit and ATM", pages: [379, 383], tier: "core",
      concepts: ["cards", "inah", "tawarruq"],
      intuition: "Can a credit card be Islamic if it lets you pay later?",
      simple: "Debit cards (against balance) are allowed. Charge cards are allowed if no interest on delay, guarantee deposits are invested on Mudarabah, and prohibited uses are barred. OIC Fiqh Council (2000): cards with interest conditions are impermissible even if the holder intends to pay in the free period; fixed issuance/renewal fees and merchant commission (if cash and credit prices are the same) are allowed. Cash-withdrawal fee must be flat, not amount-related. Market structures: Emirates Islamic (Ujrah/fees), KFH Al Tayseer (fees; one-third monthly repayment, no interest), KFH Bahrain Ijarah card; Bank Islam BIC and AmBank Al-Taslif (Bai‘ al ‘Inah — questionable). Possible Murabaha- or Musharakah-based cards.",
      academic: [
        "Definitions: debit — immediate debit, no credit; charge — credit to a ceiling for a period, full repayment on statement, no revolving; credit — revolving limit, interest after the free period; AAOIFI Standard 2 on cards.",
        "Gold, silver or currency may be bought with debit/charge cards only where the issuer settles without a credit period.",
        "Allowed privileges: priority services, discounts; not conventional life insurance, entry to prohibited places or prohibited gifts.",
        "Possible Shari’ah-compliant credit card features: annual fee; interest-free revolving line; purchase limit; emergency cash limit; merchant commission; monthly principal repayment; penalty to charity; no prohibited use.",
        "Emirates Islamic: quarterly fixed fee; minimum 10% (AED 100) monthly; 55-day grace; flat over-limit and statement fees disclosed.",
        "BIC: bank sells land to customer for cash and buys back at a lower deferred price (‘Inah) + Wadi‘ah + Qard; most scholars outside the Far East reject ‘Inah.",
        "Murabaha card: master Murabaha with offer/acceptance built into receipts; bank buys through merchant as agent; e.g. pay 105 over tenor or 100 within credit time."
      ],
      exam: "OIC Fiqh Council 2000: no interest-condition cards; fixed fees and merchant commission allowed. Charge card conditions. Flat cash fee. Structures: EIB (Ujrah), KFH Al Tayseer, Ijarah card; BIC/Al-Taslif (‘Inah — questionable). Murabaha/Musharakah card possibilities.",
      keyPoints: ["Service fee must not grow with credit or amount.", "‘Inah-based cards are rejected by most scholars."],
      table: {
        caption: "Islamic card structures described in Section 14.4.7",
        head: ["Card", "Basis", "Assessment in the chapter"],
        rows: [
          ["Emirates Islamic Bank", "Ujrah — fixed quarterly fee; min. 10% repayment", "Interest-free; all fees disclosed"],
          ["KFH Al Tayseer", "Annual fee; one-third monthly repayment, no interest", "Interest-free"],
          ["KFH (Bahrain) Ijarah card", "Ijarah for durables up to 25 months", "Details not available"],
          ["Bank Islam Malaysia (BIC)", "Bai‘ al ‘Inah + Wadi‘ah + Qard", "Questionable (‘Inah)"],
          ["AmBank Al-Taslif", "Bai‘ al ‘Inah", "Buy-back — questionable"]
        ]
      },
      related: ["t13.3", "t5.5.5"],
      quickCheck: { q: "Per the OIC Fiqh Council, a card with an interest condition is impermissible even if:", options: ["The fee is fixed", "The holder intends to pay within the free period", "The merchant pays commission", "It is a debit card"], answer: 1, explanation: "p. 380." }
    },
    {
      id: "t14.5", section: "14.5", title: "Islamic Banks' Relationship with Conventional Banks", pages: [384, 384], tier: "supporting",
      concepts: ["intermediation"],
      intuition: "Can Islamic banks work with conventional banks at all?",
      simple: "Islamic banks cannot operate in isolation. Cooperation is needed in correspondent services, foreign trade, co-financing, temporary placements on a non-interest basis, information exchange and training in feasibility studies, accounting, auditing, supervision and IT.",
      academic: ["Temporary placement of funds on a basis other than interest is unavoidable for liquidity."],
      exam: "Cooperation areas: correspondent banking, trade finance, co-financing, non-interest placements, information, training.",
      keyPoints: ["Relationships must avoid interest."],
      related: ["t14.6"],
      quickCheck: { q: "Which is an area of cooperation with conventional banks listed in Section 14.5?", options: ["Interest-bearing placements", "Correspondent services and co-financing", "Sharing Riba income", "Conventional derivatives"], answer: 1, explanation: "p. 384." }
    },
    {
      id: "t14.6", section: "14.6", title: "Fee-based Islamic Banking Services: Underwriting, L/G, L/C", pages: [384, 386], tier: "core",
      concepts: ["fee-services", "kafalah", "wakalah"],
      intuition: "Which bank fees are legitimate charges for services, and which are hidden prices for credit?",
      simple: "Underwriting: a fee is allowed only for arranging procurement of capital; take-up commission for subscribing unsubscribed shares is not; shares are taken at the offer price (OIC Fiqh Academy 1992). Letters of guarantee: jurists generally disallow fees for guarantees, but some allow fees for the bundled services and expenses; if called, the bank recovers principal only. Letters of credit: treated as a banking service with non-time-related fees (fixed, bracketed or volume-based per board); standby L/Cs are guarantees; may be based on Murabaha (fee added to cost) or Musharakah (more flexible). Correspondent arrangements avoid interest; Suftajah for transfers.",
      academic: [
        "L/C through conventional correspondents: do not delay transfers (to avoid interest); avoid supplier credit with interest; keep reasonable current balances and cover debits quickly; confirming bank debits a cash margin.",
        "Transfers in the same currency with or without fee are allowed; if another currency is involved, the exchange is done first at the agreed rate. Suftajah: depositing money for payment elsewhere."
      ],
      exam: "Underwriting: fee for arranging, not for the commitment/take-up; shares at offer price. L/G: principal only if called; fees for services/expenses (some jurists). L/C: service, non-time-related fees; Murabaha or Musharakah L/Cs; Suftajah.",
      keyPoints: ["Time must not drive fees.", "Standby L/C = guarantee."],
      subsections: [
        { number: "14.6.1", title: "Underwriting", page: 384, points: ["Fee only for arranging capital", "No take-up commission", "Shares at offer price (OIC 1992)"] },
        { number: "14.6.2", title: "Letters of Guarantee (L/G)", page: 384, points: ["Fees generally not allowed for guarantee itself", "Some allow service/expense fees", "Called guarantee: principal only"] },
        { number: "14.6.3", title: "Letters of Credit (L/C)", page: 385, points: ["Service with non-time fees", "Murabaha or Musharakah L/C", "Correspondent safeguards", "Suftajah"] }
      ],
      related: ["t12.6", "t5.7.3"],
      quickCheck: { q: "Under the OIC Fiqh Academy resolution, an underwriter may be paid for:", options: ["The commitment to take up unsubscribed shares", "Services other than underwriting, such as studies or marketing", "Buying shares below par", "Guaranteeing profits"], answer: 1, explanation: "p. 384." }
    },
    {
      id: "t14.appx", section: "Appendix", title: "Appendix: Functions of a Shari’ah Supervisory Board (AAOIFI)", pages: [387, 388], tier: "supporting",
      concepts: ["shariah-governance"],
      intuition: "Who checks the Islamic bank — and what do they sign?",
      simple: "Per AAOIFI, the Shari’ah board is an independent body of at least three specialised jurists (may use consultants; no directors or significant shareholders). It directs, reviews and supervises the IFI, and its Fatwas are binding. Its report states that contracts and transactions were reviewed on a test basis, that profit allocation between equity holders and depositors was examined, that prohibited earnings were given to charity, and any violations. AAOIFI Governance Standards 2 and 3 cover Shari’ah review (plan, execute, document and report) and internal Shari’ah review.",
      academic: ["Central Shari’ah boards may approve fit-and-proper criteria for Shari’ah advisors."],
      exam: "SSB: ≥3 scholars, independent, binding Fatwas; report on review, profit allocation, charity of prohibited income, violations. GS 1–3; review stages.",
      keyPoints: ["Fatwas binding on the IFI."],
      related: ["t14.3.4", "t18.3.2"],
      quickCheck: { q: "Minimum number of Shari’ah scholar members on an SSB per AAOIFI:", options: ["One", "Two", "Three", "Five"], answer: 2, explanation: "p. 387." }
    }
  ],
  summary: "IFIs can provide almost every conventional financial service except conventional derivatives and some FX dealings — an exception that may protect them from overexposure. They mobilise funds on Mudarabah and Wakalatul Istismar in general or specific pools and invest through Shirkah-based and debt-creating modes according to depositors' risk profiles and users' cash flows, without promising fixed returns. Good practice requires disciplined product development, mode selection fitted to the need (Box 14.1), cash-flow-based tenors, strict internal Shari’ah controls for Murabaha, Ijarah, DM and investments, and attention to moral hazard, documentation and law. The chapter shows Islamic structures for working capital, trade (alternatives to bill discounting, import Murabaha), project and syndicated finance, liquidity management, FX and forward cover, central-bank refinance and cards, as well as fee-based services. Scholars and bankers must collaborate in R&D with regulatory support, and banks should consider socio-economic impact, including Qard al Hasan for SMEs and microfinance.",
  takeaways: [
    "Product development: need → Shari’ah board → manual → approval → training → revision.",
    "No fixed return to depositors; tenor-based weightages; daily product.",
    "Choose the mode that fits the need (Box 14.1).",
    "Murabaha controls: mark-up from sale; no rollover; bank title and risk.",
    "Bill discounting replaced by collection fee + Qard, Musawamah or purchase of goods.",
    "Forward cover: unilateral promise, genuine need, no fee.",
    "Cards: no interest; fixed fees and merchant commission allowed; ‘Inah cards questionable.",
    "Underwriting fee only for arranging; L/C fees not time-related."
  ],
  checklist: [
    "Can you outline the product development procedure?",
    "Can you list what a Shari’ah auditor checks in deposit pools?",
    "Can you reproduce Box 14.1?",
    "Can you state nine Murabaha and ten Ijarah controls?",
    "Can you structure working capital with Murabaha–Istisna‘a–Wakalah?",
    "Can you explain the Musawamah alternative to bill discounting?",
    "Can you state the conditions for forward currency cover?",
    "Can you evaluate Islamic credit card models?"
  ],
  flashcards: [
    { id: "f14.1", cat: "Banking", front: "Product development procedure", back: "Assess need → generate ideas → Shari’ah board → procedures/manual → risk, tax, legal, IT → Shari’ah approval → training → launch → revise.", topic: "t14.2" },
    { id: "f14.2", cat: "Banking", front: "Types of investment pools", back: "General deposit pools (local/foreign), central bank refinance pools, treasury/FI pool, equity pool, specific customers' pools.", topic: "t14.3.1" },
    { id: "f14.3", cat: "Comparisons", front: "Box 14.1 — late payment by mode", back: "Controllable: DM, Ijarah, Istisna‘a. Loss to bank: Murabaha, Salam. No issue: Musharakah/Mudarabah.", topic: "t14.3.2" },
    { id: "f14.4", cat: "Financing modes", front: "Box 14.2 structure", back: "Salam purchase of cotton + promise by textile mill + mill as agent to take delivery + Murabaha sale to mill.", topic: "t14.3.2" },
    { id: "f14.5", cat: "Risk", front: "Why tenor must match cash flow", back: "Islamic banks cannot claim liquidated damages or roll over Murabaha on default.", topic: "t14.3.3" },
    { id: "f14.6", cat: "Capital markets", front: "Equity screening ratios (Section 14.3.4)", back: "Interest income ≤5%; debt/leverage ≤10–33%; illiquid assets ≥10–33% of total assets.", topic: "t14.3.4" },
    { id: "f14.7", cat: "Contract rules", front: "Murabaha mark-up start date", back: "From the date the bank sells the goods to the client — not from disbursement.", topic: "t14.3.4" },
    { id: "f14.8", cat: "Prohibitions", front: "Murabaha rollover", back: "Not allowed; fictitious new Murabahas to repay old ones must be stopped; their return goes to charity.", topic: "t14.3.4" },
    { id: "f14.9", cat: "Financing modes", front: "Working capital beyond Murabaha", back: "Murabaha (raw material) + Istisna‘a (manufacture/overheads) + Wakalah (export); running Musharakah; Salam + agency.", topic: "t14.4.1" },
    { id: "f14.10", cat: "Banking", front: "Alternatives to bill discounting", back: "Qard against bill + collection fee (amount-related); Musawamah (bank quotes lower rate and funds goods); outright purchase of export goods with L/C assignment.", topic: "t14.4.2" },
    { id: "f14.11", cat: "Banking", front: "Liquidity management tools", back: "Interbank Mudarabah; Sukuk outright sale/purchase; asset pools (<50% receivables); Parallel Salam; Tawarruq as last resort.", topic: "t14.4.4" },
    { id: "f14.12", cat: "Contract rules", front: "Forward currency cover conditions", back: "Genuine documented trade need; unilateral promise (not sale); no cover fee; earnest money for actual loss.", topic: "t14.4.5" },
    { id: "f14.13", cat: "Banking", front: "SBP IERS", back: "Musharakah pool of ≥10 blue chips; SBP shares profit on daily product; excess over EFS rate to Takaful fund; loss by investment share.", topic: "t14.4.6" },
    { id: "f14.14", cat: "Exam facts", front: "OIC Fiqh Council on credit cards (2000)", back: "Interest-condition cards impermissible even if paid in free period; fixed fees and merchant commission allowed.", topic: "t14.4.7" },
    { id: "f14.15", cat: "Comparisons", front: "Debit vs charge vs credit card", back: "Debit: own balance. Charge: credit to ceiling, full repayment on statement. Credit: revolving limit with interest after free period.", topic: "t14.4.7" },
    { id: "f14.16", cat: "Banking", front: "Underwriting fee rule", back: "Fee only for arranging procurement of capital or other services; no take-up commission; shares at offer price.", topic: "t14.6" },
    { id: "f14.17", cat: "Banking", front: "Shari’ah Supervisory Board (AAOIFI)", back: "Independent, ≥3 scholars; binding Fatwas; reports on review, profit allocation, charity and violations.", topic: "t14.appx" }
  ],
  questions: [
    { id: "q14.1", type: "mcq", q: "Which mode does Box 14.1 describe as having prepayment ‘not allowed as a system’?", options: ["Ijarah", "Murabaha", "Diminishing Musharakah", "Musharakah"], answer: 1, explanation: "p. 361.", topic: "t14.3.2", diff: "E", level: "recall", obj: "Recall Box 14.1" },
    { id: "q14.2", type: "tf", q: "A bank may record Murabaha mark-up from the date it disburses funds to the client acting as its agent.", answer: false, explanation: "Mark-up runs from the sale to the client (p. 365).", topic: "t14.3.4", diff: "E", level: "understanding", obj: "Apply Murabaha controls" },
    { id: "q14.3", type: "scenario", q: "A client cannot repay a Murabaha on time. The bank books a new Murabaha with no new goods and uses it to repay the old one. What should the Shari’ah board do?", options: ["Approve it as a rollover", "Stop the practice; the return goes to the Charity Account", "Charge compound mark-up", "Convert it to Ijarah"], answer: 1, explanation: "p. 364.", topic: "t14.3.4", diff: "M", level: "application", obj: "Detect rollover" },
    { id: "q14.4", type: "multi", q: "Which are conditions for Shari’ah-compliant forward currency cover? (Select all.)", options: ["Genuine documented trade or payment need", "A unilateral promise rather than a sale agreement", "A forward cover fee", "Earnest money may be taken to cover actual loss", "Available to currency dealers for speculation"], answer: [0, 1, 3], explanation: "p. 377.", topic: "t14.4.5", diff: "M", level: "recall", obj: "Recall forward cover" },
    { id: "q14.5", type: "application", q: "An exporter has a US$200,000 bill due in 60 days. Spot is Rs.60.00; the bank quotes Rs.59.80 under Musawamah. How much does the bank fund for goods?", options: ["Rs.12,000,000", "Rs.11,960,000", "Rs.12,040,000", "Rs.200,000"], answer: 1, explanation: "200,000 × 59.80 = 11,960,000 (practice variant of the p. 371 example — generated for learning).", topic: "t14.4.2", diff: "M", level: "application", obj: "Apply Musawamah alternative" },
    { id: "q14.6", type: "identify", q: "A card sells land to the customer for cash and buys it back at a lower deferred price. It is based on:", options: ["Ujrah", "Bai‘ al ‘Inah", "Mudarabah", "Ijarah"], answer: 1, explanation: "BIC (p. 382).", topic: "t14.4.7", diff: "E", level: "understanding", obj: "Identify card basis" },
    { id: "q14.7", type: "order", q: "Order the Murabaha–Istisna‘a–Wakalah working capital structure.", items: ["Murabaha for raw material", "Istisna‘a for manufacturing and overheads", "Manufactured goods become the bank's property", "Exporter exports as the bank's agent", "Bank recovers Istisna‘a price and profit from proceeds"], explanation: "pp. 369–370.", topic: "t14.4.1", diff: "M", level: "understanding", obj: "Sequence working capital structure" },
    { id: "q14.8", type: "comparison", q: "How does selling Sukuk for liquidity differ from a conventional repo?", options: ["It is identical", "The bank sells and buys outright as two separate transactions", "It pays interest", "It requires a buy-back promise at a fixed price"], answer: 1, explanation: "p. 374–375.", topic: "t14.4.4", diff: "M", level: "analysis", obj: "Compare liquidity tools" },
    { id: "q14.9", type: "mcq", q: "Which fee may an Islamic bank charge for a cash withdrawal on a card?", options: ["A percentage of the amount", "A flat service fee proportionate to the service", "Interest", "None ever"], answer: 1, explanation: "p. 381.", topic: "t14.4.7", diff: "M", level: "recall", obj: "Recall card fees" },
    { id: "q14.10", type: "short", q: "List four internal Shari’ah controls for Ijarah.", answer: "Any four of: title of the asset in the bank's name (or counter deed); bank owns the identified asset before the Ijarah (earlier only a promise to lease); asset, period and rent defined and use permissible; floating rent with first rent fixed, benchmark and floor/cap; Takaful rather than conventional insurance; ownership transfer separate and not a condition; lessor bears ownership expenses; operating-lease accounting; advance rent not treated as income; penalties to charity.", keywords: ["title", "own", "floor", "Takaful", "separate", "charity"], explanation: "p. 366.", topic: "t14.3.4", diff: "M", level: "recall", obj: "Recall Ijarah controls" },
    { id: "q14.11", type: "tf", q: "Under the SBP IERS, SBP's share of losses is met first from the Takaful fund.", answer: true, explanation: "p. 378.", topic: "t14.4.6", diff: "M", level: "recall", obj: "Recall IERS" },
    { id: "q14.12", type: "definition", q: "Moral hazard means:", options: ["Information asymmetry about prices", "Increased risk of problematic behaviour because the actor does not bear the consequences", "A Shari’ah violation", "Liquidity risk"], answer: 1, explanation: "p. 368.", topic: "t14.3.5", diff: "E", level: "recall", obj: "Define terms" },
    { id: "q14.13", type: "match", q: "Match each fee-based service to its rule.", pairs: [["Underwriting", "Fee for arranging capital, not take-up commission"], ["Letter of guarantee", "If called, principal only"], ["Letter of credit", "Service fee not related to time"], ["Suftajah", "Transfer of money for payment elsewhere"]], explanation: "Section 14.6.", topic: "t14.6", diff: "M", level: "understanding", obj: "Match services" }
  ],
  exam: [
    { id: "e14.1", kind: "long", q: "Discuss the internal Shari’ah controls an Islamic bank should apply to Murabaha and Ijarah financing.", structure: ["Why controls matter (back door to interest)", "Nine Murabaha controls", "Documentation and Tawarruq within Murabaha", "Ten Ijarah controls", "DM and Musharakah controls", "Charity account oversight"], keyConcepts: ["rollover", "title", "mark-up date", "DP note"], points: ["Board approval of master agreements"], mistakes: ["Allowing mark-up from disbursement", "Rent before delivery"], topic: "t14.3.4" },
    { id: "e14.2", kind: "scenario", q: "An exporter needs cash against a 90-day export bill. Propose Shari’ah-compliant alternatives to discounting.", structure: ["Why discounting is Riba", "Qard + collection fee", "Musawamah structure with numbers", "Outright purchase of goods with L/C assignment", "Other modes (Salam, Istisna‘a)"], keyConcepts: ["Musawamah", "agency"], points: ["Fees amount-related not time-related"], mistakes: ["Discounting at a lower rate and calling it profit"], topic: "t14.4.2" },
    { id: "e14.3", kind: "short", q: "Can an Islamic bank issue a credit card? Explain with reference to the OIC Fiqh Council and card models.", structure: ["Card types", "OIC Fiqh Council ruling", "Permissible fees and privileges", "Market models (EIB, KFH)", "‘Inah-based models and critique", "Murabaha/Musharakah possibilities"], keyConcepts: ["charge card", "Ujrah", "‘Inah"], points: ["Penalty to charity"], mistakes: ["Approving interest in free-period cards"], topic: "t14.4.7" },
    { id: "e14.4", kind: "conceptual", q: "Explain how Islamic banks can manage liquidity without interest.", structure: ["Interbank Mudarabah", "Government Sukuk trading", "Asset pools", "Parallel Salam", "Tawarruq and its limits", "Central bank role"], keyConcepts: ["liquidity", "Sukuk"], points: ["Outright sales vs repo"], mistakes: ["Treating Tawarruq as first choice"], topic: "t14.4.4" },
    { id: "e14.5", kind: "viva", q: "What are the Shari’ah conditions for forward currency cover?", structure: ["Currency exchange rules", "Unilateral promise", "Genuine need", "No fee; earnest money"], keyConcepts: ["Bai‘ al-Sarf"], points: ["Bilateral binding promise forbidden"], mistakes: ["Allowing speculation"], topic: "t14.4.5" }
  ]
});
