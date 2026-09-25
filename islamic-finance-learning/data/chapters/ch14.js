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
      academic: [
        "Intermediation mobilises resources from surplus to deficit units; deposits were covered in Chapters 8 and 12. Prudent financing needs product development, risk management and Shari’ah compliance. Innovation is the most critical success factor and differs from conventional product development in its additional Shari’ah parameters.",
        "The chapter moves from contracts to banking practice. Intermediation moves funds from surplus to deficit units, but in Islamic finance “money earning money” has no place. Funds must go into goods and assets that earn profit through bearing risk and liability and through adding value (p. 357). Islamic banks must still compete like any business. They need diversified portfolios that maximise return, minimise risk and keep enough liquidity to meet depositors’ demands, while avoiding interest, Gharar, gambling and unethical practice. The author sees product development as the industry’s biggest challenge. Products must be Shari’ah-compliant and also meet the changing needs of trade, business and industry. This takes joint work by Shari’ah scholars and bankers, and it is the way to build confidence in the institutions’ integrity (p. 357)."
      ],
      exam: "Principles: no money-for-money; profit via risk and value addition; avoid Riba, Gharar, gambling; balance profit, risk and liquidity; innovation by scholars + bankers.",
      keyPoints: [
        "Credibility depends on genuine compliance plus meeting business needs.",
        "Innovation is described as the most critical success factor, but Islamic product development has the extra requirement of Shari’ah conformity (p. 357)."
      ],
      related: ["t14.2", "t4.1"],
      quickCheck: { q: "According to the chapter, what is the biggest challenge facing Islamic finance?", options: ["Lack of deposits", "Developing products that are Shari’ah-compliant and meet changing business needs", "Taxation", "Staff salaries"], answer: 1, explanation: "p. 357." }
    },
    {
      id: "t14.2", section: "14.2", title: "Product Development and its Procedure", pages: [358, 358], tier: "core",
      concepts: ["product-development"],
      intuition: "What steps turn an idea into an approved Islamic product?",
      simple: "Product development creates and re-engineers products within Shari’ah, regulatory and legal limits. Procedure: assess need; generate ideas; discuss with Shari’ah advisor/board; develop procedures and an operational manual; final Shari’ah approval. Risk management, accounting, tax, legal and IT must be involved; staff trained; the product revised after launch using feedback. A product may combine several modes (e.g. DM housing uses Shirkah, Ijarah, Istisna‘a and Wakalah), and all their rules apply.",
      academic: [
        "Deciding factors: market survey; Shari’ah compliance (mode, assets, process, documentation); depositors' risk profile; clients' cash flows; risk mitigation; legal matters; managing the liquidity–profitability mismatch. The manual is discussed with operations staff; marketing and operations staff must know product advantages.",
        "Product development means creating assets, products and services, through research and innovation, that meet customer needs within Shari’ah, regulatory and legal limits. It includes re-engineering existing products (p. 358). The procedure runs through several stages. The bank assesses need, generates ideas, discusses detailed procedures with the Shari’ah advisor or board, writes an operational manual, and obtains final Shari’ah approval. The Risk Management Division should be involved early on operational, asset and credit risk, accounting, tax, regulatory and legal matters. The deciding factors listed are market survey, Shari’ah compliance (mode, assets, process, documentation), depositors’ risk profile, clients’ cash flows, risk mitigants, legal matters, and the balance between liquidity and profitability. IT support, staff training and review after launch follow (p. 358)."
      ],
      exam: "Procedure: need → ideas → Shari’ah board → procedures/manual → Shari’ah approval; involve risk, accounting, tax, legal, IT; training; post-launch revision. Multi-mode products must satisfy each mode's rules.",
      keyPoints: ["Launch starts the revision cycle.", "DM housing = Shirkah + Ijarah + Istisna‘a + Wakalah."],
      steps: [
        "Assess the need",
        "Generate ideas",
        "Discuss structure with the Shari’ah advisor/board",
        "Develop procedures and operational manual",
        "Risk, accounting, tax, legal and IT review",
        "Final Shari’ah approval",
        "Train staff and launch",
        "Revise using feedback"
      ],
      related: ["t14.3.4"],
      quickCheck: { q: "Which modes may a DM-based housing product combine, per Section 14.2.1?", options: ["Only Shirkah", "Shirkah, Ijarah, Istisna‘a and Wakalah", "Murabaha and Salam", "Tawarruq and ‘Inah"], answer: 1, explanation: "p. 358." },
      examples: [
        { title: "One product, several modes", kind: "textbook", text: "A Diminishing Musharakah housing product may combine Shirkah, Ijarah, Istisna‘a and Wakalah. The developer must observe the rules of every mode involved (p. 358)." }
      ],
      confusions: [
        { wrong: "Product development ends at launch.", right: "Launch starts a further cycle of revising and modifying features in the light of customer feedback (p. 358)." }
      ]
    },
    {
      id: "t14.3", section: "14.3", title: "The Nature of Financial Services/Business", pages: [358, 359], tier: "supporting",
      concepts: ["intermediation"],
      intuition: "Where do Islamic banks get their money, and on what contractual basis?",
      simple: "Players include Islamic commercial and investment banks, NBFIs, funds and unit trusts, market players, pilgrimage funds, cooperatives and Takaful companies, regulated by central banks or securities commissions. Sources of funds: equity, general and investment deposits, interbank borrowing and sometimes the central bank. Mobilisation is by Mudarabah and Wakalatul Istismar; investment deposits are Shirkah-based; current accounts are loans with no return.",
      academic: [
        "Regulatory frameworks differ by country.",
        "The players in Islamic finance include commercial and investment banks, non-bank financial institutions, funds and unit trusts, equity and debt market participants, pilgrimage funds, cooperatives and Takaful companies. Banks and non-bank financial institutions are mostly regulated by central banks. Capital-market businesses, funds, unit trusts and venture capital come under the Securities and Exchange Commissions (pp. 358–359). IFIs draw funds from shareholders’ equity, general and investment deposits, interbank borrowing and sometimes the central bank. Funds are mobilised on the basis of Mudarabah or Wakalatul Istismar. Investment deposits, restricted or unrestricted, rest on Shirkah. Current accounts are held as loans and earn no return (p. 359)."
      ],
      exam: "Funds: equity, deposits, interbank, central bank. Bases: Mudarabah, Wakalatul Istismar; current accounts = Qard (no return).",
      keyPoints: ["Current accounts are loans."],
      related: ["t14.3.1", "t8.5.2"],
      quickCheck: { q: "Current accounts in Islamic banks are normally treated as:", options: ["Mudarabah", "Loans with no return", "Musharakah", "Wakalah with fee"], answer: 1, explanation: "p. 359." },
      confusions: [
        { wrong: "Current accounts in an Islamic bank share in pool profits.", right: "Current accounts are normally treated as loans (Qard) and are not entitled to any return (p. 359)." }
      ]
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
      keyPoints: [
        "Size-based weightages: permissible with disclosure but discouraged.",
        "Pools include general deposit pools, central bank refinance pools (e.g. SBP IERS), treasury/FI pools, equity pools and specific customer pools (p. 359).",
        "Risk-averse depositors call for less risky modes: PLS for high-risk ventures, debt-creating modes for low-risk investment (p. 359).",
        "Auditors may sample high-value accounts’ correspondence to check that no fixed return has been promised (p. 360)."
      ],
      related: ["t12.7.1", "t8.5.2"],
      quickCheck: { q: "An Islamic bank tells a corporate depositor it will receive a guaranteed 8%. A Shari’ah auditor should:", options: ["Approve it", "Object — no fixed return may be assured; projected rates must adjust to actual pool results", "Ignore it", "Require 9%"], answer: 1, explanation: "pp. 359–360." },
      examples: [
        { title: "Corporate client wanting a fixed return", kind: "textbook", text: "A bank may tell a corporate depositor that its funds will go into Ijarah and Murabaha earning fixed rentals and mark-ups. Even so, it cannot promise a fixed return, because defaults and ownership expenses on leases may reduce actual earnings (p. 360)." }
      ],
      confusions: [
        { wrong: "Giving larger accounts of the same tenor higher weightages is prohibited.", right: "It is permissible with proper disclosure but should generally be discouraged, as it may lead to favouritism and injustice (p. 359)." },
        { wrong: "A bank may pre-agree with depositors to donate part of its own profit to their pool.", right: "It may donate part of its profit after distribution, but only if this was not pre-agreed (p. 360)." }
      ]
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
      keyPoints: [
        "Late payment in Murabaha and Salam is a loss to the bank; controllable in Ijarah/DM/Istisna‘a.",
        "In Box 14.2 the bank gains by deploying funds for longer, spreading exposure over two customers in different sectors and avoiding Salam inventory. The mill gains a price hedge (p. 362).",
        "Istisna‘a gives extra flexibility in controlling the manufacturer’s delivery delays, since delivery depends on his own effort (p. 361)."
      ],
      table: { caption: "Box 14.1 — Salient features of major modes of financing", head: ["Feature", "Dim. Musharakah", "Ijarah", "Murabaha", "Salam", "Istisna‘a", "Musharakah/Mudarabah"], rows: [["Period", "Long-term", "Long-term", "Short/long-term", "Short-term", "Short/long-term", "Short/long-term"], ["Rate", "Fixed/variable", "Fixed/variable", "Fixed", "Fixed", "Fixed", "Variable"], ["Prepayment allowed", "Yes", "Yes", "Not allowed as a system", "No", "May be structured", "Yes"], ["Risk of the asset", "Joint", "Financier", "Financier/customer", "Financier/customer", "Customer/financier", "Joint"], ["Uses", "Nonconsumable assets", "Nonconsumable assets", "Any Halal assets", "Salam compatible", "Assets to be manufactured", "Any Halal business"], ["Late payments", "Controllable", "Controllable", "Loss to the bank", "Loss to the bank", "Controllable", "No issue"]] },
      examples: [
        { title: "Box 14.2 — Salam and Murabaha combined", kind: "textbook", text: "The bank buys cotton from growers on Salam, obtains a textile mill's promise to buy, appoints the mill as agent to take delivery, then sells the cotton to the mill on Murabaha at the agreed price (p. 362)." },
        { title: "Sugar-cane purchase", kind: "textbook", text: "Murabaha is not the right mode for financing the purchase of sugar cane. It may also be unsuitable for long-term housing where inflation is high (p. 360)." }
      ],
      related: ["t10.10", "t9.8", "t11.5", "t12.9"],
      quickCheck: { q: "According to Box 14.1, in which mode is late payment described as ‘controllable’?", options: ["Murabaha", "Salam", "Ijarah", "None"], answer: 2, explanation: "Ijarah (and DM, Istisna‘a) — p. 361–362." },
      confusions: [
        { wrong: "Murabaha and Ijarah can serve every financing need.", right: "Using them for everything is neither feasible nor advisable. Ijarah, for example, may not suit long-term projects with asset, market and counterparty risk. Diversification is the best strategy (p. 360)." }
      ],
      definitions: [
        { term: "Accumulator vs distributor (Ijarah)", meaning: "A bank that keeps leased assets on its books is an accumulator. One that passes ownership and risk to investors through securitisation is a distributor." }
      ]
    },
    {
      id: "t14.3.3", section: "14.3.3", title: "Tenor of Financing", pages: [362, 363], tier: "core",
      concepts: ["risk"],
      intuition: "Why is mismatched tenor ‘suicidal’ for an Islamic bank?",
      simple: "Customer cash-flow analysis is vital. Conventional borrowers sometimes accept tenors that mismatch cash flows, relying on rollovers. In Islamic finance this is suicidal because an Islamic bank cannot claim liquidated damages for lost cost of funds on default. Tenor must be set carefully with the customer.",
      academic: [
        "The conventional approach is imprudent even by conventional rules but may work individually; Islamic banks lack the rollover and penalty-interest safety valve.",
        "Cash-flow analysis decides the tenor. Conventional borrowers often take finance whose repayment schedule does not match the project’s cash flows, expecting to manage through rollovers. The book says this is imprudent even by conventional standards, though it can work in individual cases (p. 362). In Islamic finance it is “suicidal”, because the bank cannot claim liquidated damages for its cost of funds when a client defaults, and it cannot roll a Murabaha over at a higher price. The tenor must therefore be set carefully with the customer from the outset (p. 363)."
      ],
      exam: "Tenor must match customer cash flow because Islamic banks cannot charge liquidated damages/rollover mark-up on default.",
      keyPoints: ["No rollover of Murabaha."],
      related: ["t14.3.4", "t9.9.6"],
      quickCheck: { q: "Why must Islamic banks align tenor with customers' cash flows?", options: ["Regulators demand it", "They cannot claim liquidated damages for cost of funds on default", "Customers prefer short tenors", "It lowers taxes"], answer: 1, explanation: "p. 363." },
      examples: [
        { title: "Mismatched tenor", kind: "practice", text: "A client’s project produces cash from year 3, but a 2-year Murabaha is booked. The bank cannot reprice or charge for the delay, so the tenor should have been matched to the cash flow from the start (based on pp. 362–363)." }
      ]
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
        "Pre-stipulated DM revaluation → usurious.",
        "Screening ratios: interest income ≤ 5 %, debt ratio ≤ 10–33 %, and illiquid assets ≥ 10–33 % of total assets. Haram income is credited to charity (pp. 363–364).",
        "If regulators give no guidance, charity funds should go to the poor or to social welfare projects (p. 367).",
        "In DM, prestipulating that units will be revalued by a fixed % per period, regardless of actual value, makes the deal usurious (p. 367)."
      ],
      table: { caption: "Selected internal Shari’ah controls (pp. 364–367)", head: ["Mode", "Control"], rows: [["Murabaha", "Account for it as a trade, not a financial transaction"], ["Murabaha", "No rollover; any extension needs a new Murabaha against new goods"], ["Murabaha", "Client agent must buy within a maximum time and declare; funds are Amanah"], ["Murabaha", "Suppliers must not be the client’s sister concerns (client ownership ≤ 50 %)"], ["Murabaha", "Invoice date not later than the agent’s declaration"], ["Ijarah", "Title with the lessor; if imported in the client’s name, a counter deed"], ["Ijarah", "Floating rent: first rental specified, benchmark with floor and cap"], ["Ijarah", "Advance rent is not income; late-payment penalties go to charity"], ["DM", "Commercial assets such as open plots cannot be leased; no fixed periodic revaluation"]] },
      related: ["t14.appx", "t9.10", "t11.6", "t8.8.1"],
      quickCheck: { q: "From when should Murabaha mark-up be charged?", options: ["From disbursement to the supplier", "From the date the bank sells the goods to the client", "From signing the MoU", "From application date"], answer: 1, explanation: "p. 365, control 7." },
      confusions: [
        { wrong: "Banks may take a DP note for principal plus mark-up at disbursement.", right: "DP notes should be taken after the Murabaha sale. If one is needed at disbursement as security, it should cover the principal only (p. 365)." },
        { wrong: "Buying goods in the client’s name to save transfer charges is harmless.", right: "The bank then never owns the goods. Title, risk and reward should be the bank’s until sale to the client (p. 365)." }
      ]
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
      keyPoints: [
        "Sight L/C without cover: agency agreement enables Murabaha.",
        "Ijarah lets the client stop using the asset and decline to buy it despite his promise. Banks should anticipate this, e.g. by checking the client’s financial history (p. 368).",
        "Regulators should check accounting standards, project appraisal and follow-up, and the monitoring of equity-financed enterprises (pp. 367–368)."
      ],
      definitions: [
        { term: "Asymmetric information", meaning: "One party to a transaction has more or better information than the other." },
        { term: "Moral hazard", meaning: "Increased risk of problematic behaviour because the person causing the problem does not bear the full consequences." }
      ],
      related: ["t14.3.4", "t18.3.2"],
      quickCheck: { q: "A client asks the bank only to open a sight L/C and later fails to pay. Which prior document could have protected the bank?", options: ["A DP note for mark-up", "An agency agreement enabling a Murabaha", "A penalty clause with interest", "A Tawarruq contract"], answer: 1, explanation: "p. 368." },
      examples: [
        { title: "Sight L/C without cover", kind: "textbook", text: "A client wants only an L/C opened, with no finance. If the bank took no advance cover and the client pays late after the Nostro is debited, the bank bears the loss. An agency agreement signed at L/C opening would have let it book a Murabaha covering the credit period (p. 368)." }
      ],
      confusions: [
        { wrong: "A small change in process flow cannot affect a product’s income.", right: "A slight process deviation can send the whole income to charity, so every structural issue should be cleared with the Shari’ah board beforehand (p. 368)." }
      ]
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
      steps: [
        "Murabaha for raw material",
        "Istisna‘a for manufacture and overheads",
        "Goods become the bank's on manufacture",
        "Exporter acts as bank's agent to export",
        "Bank recovers Istisna‘a price and profit from proceeds; client pays Murabaha price"
      ],
      related: ["t10.10", "t12.7.2"],
      quickCheck: { q: "In the sugar-mill Salam with agency, if the market price falls below the agreed price, who bears the loss?", options: ["The mill", "The bank", "The government", "Shared equally"], answer: 1, explanation: "p. 370." },
      examples: [
        { title: "Salam for a sugar mill", kind: "textbook", text: "The bank pays the full price in advance for sugar and may take a charge on the mill’s assets. The mill, as agent, later sells the sugar at an agreed price and may keep any excess as a bonus if so agreed. A fall below the agreed price is the bank’s loss (p. 370)." }
      ],
      confusions: [
        { wrong: "In working-capital Musharakah all expenses must be shared.", right: "Partners may agree to share gross profit, with the client voluntarily bearing indirect expenses (depreciation, admin salaries). He then gets a larger ratio, while direct costs are borne jointly (p. 370)." }
      ]
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
      examples: [
        { title: "Musawamah alternative to bill discounting", kind: "textbook", text: "1 Jan 2007: exporter's US$100,000 bill due 25 Feb; spot Rs.57.75; bank quotes Rs.57.60 and funds Rs.5,760,000 as agent for raw materials; client declares possession and offers to buy the stock for US$100,000 payable 25 Feb; on receipt of the remittance, the bank debits US$100,000 (pp. 371)." },
        { title: "Musawamah against an export bill", kind: "textbook", text: "Bill US$100,000 due in 55 days, spot Rs.57.75. The bank quotes Rs.57.60, gives the client Rs.5,760,000 as agent to buy raw materials, and then sells him the stock for US$100,000 payable on the bill date (p. 371)." },
        { title: "Abdul’s US$100 m consignment", kind: "textbook", text: "The bank buys the ready goods for cash at a margin, takes assignment of the 90-day L/C, and appoints Abdul its agent to ship. It collects the bill proceeds at maturity (pp. 371–372)." },
        { title: "Wheat procurement", kind: "textbook", text: "Instead of interest-based loans to provincial governments, Islamic banks may form a syndicate or company that buys wheat from farmers and sells it to the government at a margin, using food departments as agents (p. 372)." }
      ],
      related: ["t12.7.2", "t9.8.3"],
      quickCheck: { q: "In the import Murabaha under a shipping guarantee, if the final cost differs from the estimate, what may be adjusted?", options: ["Both cost and profit", "Only the cost portion", "Only profit", "Nothing"], answer: 1, explanation: "p. 373." },
      confusions: [
        { wrong: "A shipping-guarantee Murabaha price can be fully repriced when documents arrive.", right: "Only the cost portion may be adjusted for the final cost; the profit portion stays fixed (p. 373)." }
      ],
      table: { caption: "Import Murabaha settlement options (pp. 372–373)", head: ["Option", "Feature"], rows: [["Normal payment", "Musawamah sale at L/C cost plus charges; risk ends on delivery"], ["Sub-Murabaha", "Profit from Nostro debit to settlement date"], ["PAD", "Sub-Murabaha booked the day the client arranges funds"], ["TR Murabaha", "Like normal payment but longer, e.g. 120+ days"], ["Shipping guarantee/DO", "e.g. 110 % margin; price fixed; later cost difference settled"]] }
    },
    {
      id: "t14.4.3", section: "14.4.3", title: "Project Financing and Syndication", pages: [373, 374], tier: "core",
      concepts: ["istisna", "ijarah", "musharakah", "sukuk"],
      intuition: "How do you finance a plant that doesn't exist yet?",
      simple: "Ijarah is popular for project finance but cannot be used effectively when the project must first be built. Cement plant: bank finances via Musharakah, enters Istisna‘a with a manufacturer, appoints the customer agent to supervise erection, then earns rent on its ownership share and sells units at market price (or shares production profits). Oil terminal syndicate: binding promise to lease from the operator; Istisna‘a with a contractor; operator as supervising agent; Ijarah when ready. Sukuk syndication: pools must have more than 50% Ijarah/fixed assets for trading at any price (Hanafi: over 10%); if the pool includes Murabaha receivables, the Sukuk price cannot be below the value of those debts.",
      academic: [
        "Sukuk holders are Musharakah partners proportionate to their ownership and assume pool rights and obligations.",
        "Ijarah is popular for project finance, but it cannot be used effectively while a plant still has to be built. For a cement plant, the bank can finance through Musharakah and sign an Istisna‘a with an industrial concern, appointing the client as agent to supervise erection. The bank then takes rental on its share of ownership and recovers principal by selling units to the client at market price. Alternatively, the partners may share production profit (pp. 373–374). For an oil terminal, a consortium can take a binding unilateral promise to lease from the operator and sign an Istisna‘a with a contractor, with the operator supervising as agent, then execute the Ijarah on completion (p. 374). Syndicates can also issue Sukuk. The pool should hold more than 50 % Ijarah or fixed assets (more than 10 % on the Hanafi view) to trade freely, and if it holds Murabaha receivables the Sukuk cannot be priced below their value (p. 374)."
      ],
      exam: "Project: Musharakah + Istisna‘a + agency + rent + unit sale (cement plant); syndicate: promise to lease + Istisna‘a + agency + Ijarah (oil terminal); Sukuk pools >50% tangible (Hanafi >10%).",
      keyPoints: ["Ijarah alone is unsuitable for construction stage."],
      related: ["t10.11.10", "t15.3.6"],
      quickCheck: { q: "Under the majority view, a securitised pool can trade at any price if Ijarah/fixed assets exceed:", options: ["10%", "33%", "50%", "90%"], answer: 2, explanation: "p. 374 (Hanafi: 10%)." },
      confusions: [
        { wrong: "A Sukuk pool containing Murabaha receivables may trade at any price.", right: "The Sukuk price cannot fall below the value of the debt instruments in the pool (p. 374)." }
      ]
    },
    {
      id: "t14.4.4", section: "14.4.4", title: "Liquidity Management", pages: [374, 375], tier: "core",
      concepts: ["liquidity", "tawarruq", "sukuk"],
      intuition: "Without an interest-based money market, how do Islamic banks manage surplus and shortage?",
      simple: "Options: interbank Mudarabah (deficit bank shares general profit at a negotiated ratio); buying government Sukuk at par and selling them outright in the secondary market or to the central bank (like repo, but two separate outright sales); pooling Murabaha and Ijarah assets for other banks to invest (Murabaha receivables below 50%); Parallel Salam; and Tawarruq/Commodity Murabaha — a grey area to be used only in extreme cases under board guidance. Malaysian cards combining Tawarruq with buy-back are considered non-compliant by most scholars.",
      academic: [
        "Tawarruq on the asset side gives a fixed guaranteed return and can be done with conventional banks; it must not become a mere exchange of papers.",
        "Islamic liquidity management relies on several tools. In the interbank market a deficit bank can take funds on Mudarabah, sharing its general profit at a negotiated ratio, possibly under central bank guidelines (p. 374). A bank can buy government Sukuk at par, then sell them to another bank or the central bank when it needs cash. This resembles repo, but the sale and purchase are separate outright transactions (pp. 374–375). A bank may also invite other institutions to invest in a pool of its Murabaha and Ijarah assets, with Murabaha receivables kept below 50 %. Parallel Salam, with the full price paid in advance, is another option. Tawarruq (Commodity Murabaha) is widely used but is a grey area, to be used only where no other option exists and under Shari’ah-board guidance (p. 375)."
      ],
      exam: "Liquidity tools: interbank Mudarabah; Sukuk buy/sell outright; asset pools (<50% receivables); Parallel Salam; Tawarruq (last resort).",
      keyPoints: [
        "Sukuk sale ≠ repo: two separate outright transactions.",
        "Malaysian credit cards based on Tawarruq with buy-back are considered non-compliant by most scholars (p. 375)."
      ],
      related: ["t13.3.1", "t15.3.8"],
      quickCheck: { q: "When an Islamic bank invites others into a pool of its Murabaha and Ijarah assets, Murabaha receivables should be:", options: ["More than 50%", "Less than 50% of total assets", "Exactly 50%", "100%"], answer: 1, explanation: "p. 375." },
      confusions: [
        { wrong: "Selling Sukuk for liquidity is the same as a conventional repo.", right: "It is similar in effect, but the sale and repurchase are two separate outright transactions, not a single repurchase agreement (p. 375)." }
      ]
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
      keyPoints: [
        "Currency dealers cannot get forward cover (speculation).",
        "No bilateral binding promise.",
        "Forward cover needs genuine trade needs backed by documents, a unilateral promise (not a sale) and no cover fee. Earnest money may be taken, from which actual loss is recovered (p. 377).",
        "Correspondent relationships can run without interest on a reciprocal basis: credit balances kept in return for limited debit balances (p. 376)."
      ],
      related: ["t3.2.1.d", "t4.7.2", "t8.8.7"],
      quickCheck: { q: "Which forward currency cover is permissible per contemporary scholars cited in the chapter?", options: ["A bilateral binding forward sale", "A unilateral promise for a documented genuine trade need, without a cover fee", "Any forward for speculation", "A forward with a premium fee"], answer: 1, explanation: "p. 377." },
      steps: [
        "Approved forms of constructive possession of currency (p. 376): crediting the customer’s account",
        "A spot exchange against currency already in the customer’s account",
        "Debiting one account and crediting another in a different currency on the customer’s order",
        "Receipt of a cheque if the balance is available and blocked",
        "A merchant receiving a signed card voucher, if the issuer pays without deferment"
      ],
      confusions: [
        { wrong: "A two-day settlement lag makes spot FX dealing impermissible.", right: "Time-zone differences justify two days for clearing, provided the deal is finalised at the rate on the transaction date (p. 376)." },
        { wrong: "One Musharakah partner may guarantee the other against currency risk.", right: "Not allowed between partners. A third party may volunteer a guarantee if it is not stated in the contract (p. 377)." }
      ],
      examples: [
        { title: "Set-off of debts in different currencies", kind: "textbook", text: "A owes B dinars and B owes A dirhams. They may agree a rate to set the debts off wholly or partly. A creditor may also accept payment in another currency at the spot rate on the settlement day (pp. 376–377)." }
      ]
    },
    {
      id: "t14.4.6", section: "14.4.6", title: "Refinancing by the Central Banks: SBP's IERS", pages: [377, 378], tier: "supporting",
      concepts: ["musharakah", "central-bank"],
      intuition: "Can a central bank support exporters without charging interest?",
      simple: "SBP's Islamic Export Refinance Scheme is Musharakah-based: SBP shares in actual profit of the Islamic bank's Musharakah pool used for export finance. Profit above the conventional EFS rate goes to a Takaful fund to absorb future losses. Pool: at least ten blue-chip companies (stock record, rating ≥B+, or ROE above EFS rates; no adverse credit reports). Profit on a daily-product basis; audited adjustments to or from the Takaful fund; losses shared by investment proportion, SBP's share first from the Takaful fund.",
      academic: [
        "The pool profit = gross income less provisions plus recoveries and reversals; excess over quarterly provisional payments is deposited within seven days in the non-remunerative Takaful fund; shortfalls refunded from it; in loss, the Islamic bank may reclaim provisional profit paid plus SBP's share of principal loss.",
        "SBP’s Islamic Export Refinance Scheme applies Shirkah to central bank refinance. The Islamic bank forms a Musharakah pool of at least ten blue-chip companies within the first year. A blue-chip company has a good stock-exchange record, a rating of at least B+, or a three-year return on equity above the SBP’s conventional EFS rate, and must have no adverse Credit Information Bureau reports. The SBP shares the pool’s profit on a daily-product basis. Any profit above the EFS rate is credited to a non-remunerative Takaful fund held by SBP. Differences between provisional quarterly and audited annual profit are settled through that fund. Losses are shared by the investment ratio, and SBP’s share is met first from the Takaful fund (pp. 377–378)."
      ],
      exam: "IERS: Musharakah pool (≥10 blue chips); SBP shares profit on daily product; excess over EFS → Takaful fund; losses by investment share (SBP's from Takaful fund first).",
      keyPoints: [
        "Takaful fund = risk-mitigation reserve.",
        "Excess profit found on audit must be deposited in the Takaful fund within seven days (p. 378).",
        "Pool profit for SBP = gross income less provisions, plus recoveries of prior losses and reversals of provisions (p. 378)."
      ],
      related: ["t14.3.1", "t12.7.1"],
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
      keyPoints: [
        "Service fee must not grow with credit or amount.",
        "‘Inah-based cards are rejected by most scholars.",
        "Security deposits for charge cards, if not usable by the holder, should be invested on Mudarabah for the holder (p. 380).",
        "Gold, silver or currency may be bought with debit or charge cards if the issuer settles without a credit period (p. 380)."
      ],
      table: { caption: "Islamic card structures in use (pp. 381–383)", head: ["Card", "Basis", "Assessment"], rows: [["Emirates Islamic Bank", "Ujrah (fixed service fee); minimum 10 % monthly", "No interest; all fees disclosed"], ["Bank Islam Malaysia (BIC)", "Bai‘ al ‘Inah + Wadi‘ah + Qard Hasan", "Questionable because of ‘Inah"], ["AmBank Al-Taslif", "Bai‘ al ‘Inah (cash sale + deferred purchase)", "Buy-back; six prohibited uses blocked"], ["KFH Al Tayseer", "Annual fee; one-third repaid monthly, two-thirds rolled over interest-free", "No interest; dual Visa/MasterCard"], ["KFH Bahrain Ijarah Card", "Ijarah for durables up to 25 months", "Details not available"]] },
      related: ["t13.3", "t6.11"],
      quickCheck: { q: "Per the OIC Fiqh Council, a card with an interest condition is impermissible even if:", options: ["The fee is fixed", "The holder intends to pay within the free period", "The merchant pays commission", "It is a debit card"], answer: 1, explanation: "p. 380." },
      confusions: [
        { wrong: "A card cash withdrawal fee may be a percentage of the amount withdrawn.", right: "Only a flat service fee proportionate to the service is allowed, not one varying with the amount (p. 381)." },
        { wrong: "An Islamic card may offer conventional life insurance as a perk.", right: "Privileges prohibited by Shari’ah (conventional insurance, prohibited places or gifts) are not allowed. Priority services and discounts are (p. 381)." }
      ],
      examples: [
        { title: "Murabaha-based card", kind: "textbook", text: "Under a master Murabaha, each transaction receipt carries the offer and acceptance. The holder either pays 105 over the Murabaha tenor or 100 within the free period, in which case the bank earns from the merchant’s discount (p. 383)." }
      ]
    },
    {
      id: "t14.5", section: "14.5", title: "Islamic Banks' Relationship with Conventional Banks", pages: [384, 384], tier: "supporting",
      concepts: ["intermediation"],
      intuition: "Can Islamic banks work with conventional banks at all?",
      simple: "Islamic banks cannot operate in isolation. Cooperation is needed in correspondent services, foreign trade, co-financing, temporary placements on a non-interest basis, information exchange and training in feasibility studies, accounting, auditing, supervision and IT.",
      academic: [
        "Temporary placement of funds on a basis other than interest is unavoidable for liquidity.",
        "Islamic banks cannot work in isolation from the conventional system. There is scope and need for cooperation in correspondent services, foreign trade finance and co-financing of projects. Temporary placement of funds with each other, on a basis other than interest, is unavoidable, especially for Islamic banks that need liquidity when required. The book also lists information exchange and joint training in feasibility studies, accounting, auditing, supervision and IT as areas of cooperation (p. 384)."
      ],
      exam: "Cooperation areas: correspondent banking, trade finance, co-financing, non-interest placements, information, training.",
      keyPoints: [
        "Relationships must avoid interest.",
        "Islamic banks may open documentary credits at conventional banks and ask correspondents to confirm L/Cs (p. 385)."
      ],
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
      keyPoints: [
        "Time must not drive fees.",
        "Standby L/C = guarantee.",
        "When an L/G is called, the bank may recover only the principal amount (p. 385).",
        "A Musharakah L/C is more flexible than a Murabaha L/C: it can be in either party’s name, and either can administer it (p. 385)."
      ],
      subsections: [
        { number: "14.6.1", title: "Underwriting", page: 384, points: ["Fee only for arranging capital", "No take-up commission", "Shares at offer price (OIC 1992)"] },
        { number: "14.6.2", title: "Letters of Guarantee (L/G)", page: 384, points: ["Fees generally not allowed for guarantee itself", "Some allow service/expense fees", "Called guarantee: principal only"] },
        { number: "14.6.3", title: "Letters of Credit (L/C)", page: 385, points: ["Service with non-time fees", "Murabaha or Musharakah L/C", "Correspondent safeguards", "Suftajah"] }
      ],
      related: ["t12.6", "t7.15"],
      quickCheck: { q: "Under the OIC Fiqh Academy resolution, an underwriter may be paid for:", options: ["The commitment to take up unsubscribed shares", "Services other than underwriting, such as studies or marketing", "Buying shares below par", "Guaranteeing profits"], answer: 1, explanation: "p. 384." },
      confusions: [
        { wrong: "An Islamic underwriter may take a take-up commission for subscribing unsubscribed shares.", right: "Take-up commission is not permissible. The fee is only for arranging procurement of the capital, and the underwriter subscribes at the offer price (p. 384)." },
        { wrong: "L/C charges may rise with the length of time the L/C is outstanding.", right: "The general view is that L/C fees are service charges that are not time-related. They may vary with type and effort (pp. 384–385)." }
      ],
      examples: [
        { title: "Correspondent confirmation without interest", kind: "textbook", text: "The Islamic bank keeps reasonable balances with the confirming bank and covers debits promptly. It claims no return on its credit balances, and the correspondent charges no interest on short overdrafts up to an agreed ceiling (pp. 385–386)." }
      ],
      definitions: [
        { term: "Suftajah", meaning: "A classical instrument for transferring money: depositing an amount with someone for payment to the depositor or his representative in another place." }
      ]
    },
    {
      id: "t14.appx", section: "Appendix", title: "Appendix: Functions of a Shari’ah Supervisory Board (AAOIFI)", pages: [387, 388], tier: "supporting",
      concepts: ["shariah-governance"],
      intuition: "Who checks the Islamic bank — and what do they sign?",
      simple: "Per AAOIFI, the Shari’ah board is an independent body of at least three specialised jurists (may use consultants; no directors or significant shareholders). It directs, reviews and supervises the IFI, and its Fatwas are binding. Its report states that contracts and transactions were reviewed on a test basis, that profit allocation between equity holders and depositors was examined, that prohibited earnings were given to charity, and any violations. AAOIFI Governance Standards 2 and 3 cover Shari’ah review (plan, execute, document and report) and internal Shari’ah review.",
      academic: [
        "Central Shari’ah boards may approve fit-and-proper criteria for Shari’ah advisors.",
        "Under AAOIFI Governance Standard No. 1, the Shari’ah supervisory board is an independent body of jurists specialised in Islamic commercial jurisprudence, possibly with other experts. It directs, reviews and supervises the institution, and its Fatwahs and rulings bind the institution. It needs at least three Shari’ah scholars. It may use consultants in business, economics, law or accounting, but may not include directors or significant shareholders (p. 387). Its report states that it reviewed contracts and transactions on a test basis to give reasonable assurance of compliance. It also states whether profit allocation between equity holders and depositors is on a proper Shari’ah basis and whether prohibited earnings went to charity, and it lists any violations (pp. 387–388). Governance Standards 2 and 3 cover Shari’ah review (plan, execute with working papers, document and report) and internal Shari’ah review (p. 388)."
      ],
      exam: "SSB: ≥3 scholars, independent, binding Fatwas; report on review, profit allocation, charity of prohibited income, violations. GS 1–3; review stages.",
      keyPoints: ["Fatwas binding on the IFI."],
      related: ["t14.3.4", "t18.3.2"],
      quickCheck: { q: "Minimum number of Shari’ah scholar members on an SSB per AAOIFI:", options: ["One", "Two", "Three", "Five"], answer: 2, explanation: "p. 387." },
      confusions: [
        { wrong: "A bank’s director may sit on its Shari’ah board to improve coordination.", right: "The AAOIFI standard excludes directors and significant shareholders (p. 387)." }
      ]
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
    { id: "f14.17", cat: "Banking", front: "Shari’ah Supervisory Board (AAOIFI)", back: "Independent, ≥3 scholars; binding Fatwas; reports on review, profit allocation, charity and violations.", topic: "t14.appx" },
    { id: "f14.18", cat: "Banking", front: "Deciding factors in product development", back: "Market survey; Shari’ah compliance (mode, assets, process, documents); depositors’ risk profile; clients’ cash flow; risk mitigants; legal matters; liquidity vs profitability (p. 358).", topic: "t14.2" },
    { id: "f14.19", cat: "Banking", front: "Sources of funds for IFIs", back: "Equity, general and investment deposits, interbank borrowing, sometimes the central bank. Bases: Mudarabah and Wakalatul Istismar. Current accounts are loans (p. 359).", topic: "t14.3" },
    { id: "f14.20", cat: "Banking", front: "Donating bank profit to a pool", back: "Allowed after distribution, provided it is not pre-agreed with depositors (p. 360).", topic: "t14.3.1" },
    { id: "f14.21", cat: "Risk", front: "Murabaha agent controls", back: "Buy within a maximum time and declare; funds are Amanah; the invoice date must not be later than the declaration; or pay the supplier directly (pp. 364–366).", topic: "t14.3.4" },
    { id: "f14.22", cat: "Risk", front: "Ijarah internal controls (key)", back: "Title with the lessor (counter deed if needed); own the identified asset before the Ijarah; floor and cap on floating rent; Takaful not insurance; ownership expenses on the lessor; operating-lease accounting; penalties to charity (p. 366).", topic: "t14.3.4" },
    { id: "f14.23", cat: "Definitions", front: "Moral hazard", back: "Increased risk of problematic behaviour because the person causing the problem does not bear the full consequences (p. 368).", topic: "t14.3.5" },
    { id: "f14.24", cat: "Financing modes", front: "Musawamah against an export bill", back: "The bank gives the client local currency as agent to buy stock, then sells him the stock for the bill’s foreign-currency amount payable on the bill date (p. 371).", topic: "t14.4.2" },
    { id: "f14.25", cat: "Banking", front: "Import Murabaha: cost adjustment", back: "If the final cost differs after a shipping-guarantee sub-Murabaha, only the cost portion is settled; profit stays fixed (p. 373).", topic: "t14.4.2" },
    { id: "f14.26", cat: "Financing modes", front: "Cement plant project finance", back: "Musharakah + Istisna‘a with the client as supervising agent, then rent on the bank’s share and unit sales at market price (pp. 373–374).", topic: "t14.4.3" },
    { id: "f14.27", cat: "Banking", front: "Sukuk vs repo", back: "A bank sells or buys Sukuk as separate outright transactions; it can sell to the central bank if the market is illiquid (p. 375).", topic: "t14.4.4" },
    { id: "f14.28", cat: "Contract rules", front: "Two-day FX settlement", back: "Allowed for time-zone clearing, at the rate of the transaction date (p. 376).", topic: "t14.4.5" },
    { id: "f14.29", cat: "Banking", front: "IERS loss sharing", back: "Shared by investment ratio (daily product). SBP’s share is met first from the Takaful fund; the bank may reclaim provisional profit paid (p. 378).", topic: "t14.4.6" },
    { id: "f14.30", cat: "Banking", front: "Card cash-withdrawal fee", back: "Flat and proportionate to the service, never varying with the amount withdrawn (p. 381).", topic: "t14.4.7" },
    { id: "f14.31", cat: "Comparisons", front: "BIC and Al-Taslif cards", back: "Both rely on Bai‘ al ‘Inah (buy-back). Most scholars outside the Far East reject it, so their status is questionable (p. 382).", topic: "t14.4.7" },
    { id: "f14.32", cat: "Banking", front: "L/C fee principle", back: "A service charge, not time-related, which may vary with L/C type and effort. A standby L/C is a guarantee (p. 385).", topic: "t14.6" },
    { id: "f14.33", cat: "Arabic terminology", front: "Suftajah", back: "A classical money-transfer instrument: a deposit with someone for payment elsewhere to the depositor or his representative (p. 386).", topic: "t14.6" },
    { id: "f14.34", cat: "Banking", front: "Shari’ah board report contents", back: "Review on a test basis giving reasonable assurance; a Shari’ah basis for profit allocation; prohibited earnings to charity; violations disclosed (pp. 387–388).", topic: "t14.appx" }
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
    { id: "q14.13", type: "match", q: "Match each fee-based service to its rule.", pairs: [["Underwriting", "Fee for arranging capital, not take-up commission"], ["Letter of guarantee", "If called, principal only"], ["Letter of credit", "Service fee not related to time"], ["Suftajah", "Transfer of money for payment elsewhere"]], explanation: "Section 14.6.", topic: "t14.6", diff: "M", level: "understanding", obj: "Match services" },
    { id: "q14.14", type: "mcq", q: "According to the chapter, what is the biggest challenge facing the Islamic finance industry?", options: ["Lack of capital", "Developing products that are Shari’ah-compliant and meet the changing needs of business", "Competition from Takaful", "Too many Shari’ah scholars"], answer: 1, explanation: "p. 357.", topic: "t14.1", diff: "E", level: "recall", obj: "Recall the main challenge of Islamic finance" },
    { id: "q14.15", type: "order", q: "Order the core steps of product development.", items: ["Assess need and generate ideas", "Discuss detailed procedures with the Shari’ah advisor/board", "Prepare the operational manual", "Obtain final approval from the Shari’ah department", "Train staff and launch, then revise from feedback"], explanation: "p. 358.", topic: "t14.2", diff: "M", level: "understanding", obj: "Sequence product development" },
    { id: "q14.16", type: "tf", q: "Current accounts in Islamic banks are normally treated as loans and earn no return.", answer: true, explanation: "p. 359.", topic: "t14.3", diff: "E", level: "recall", obj: "Recall the basis of current accounts" },
    { id: "q14.17", type: "multi", q: "Which are listed as investment pools of an Islamic bank? (Select all.)", options: ["General deposit pools", "Central bank refinance pools", "Equity pool", "Current-account interest pool"], answer: [0, 1, 2], explanation: "Also treasury/FI and specific customer pools (p. 359).", topic: "t14.3.1", diff: "E", level: "recall", obj: "Recall types of investment pools" },
    { id: "q14.18", type: "scenario", q: "An auditor finds a letter promising a corporate depositor 9 % a year “because funds will go into Ijarah”. What should the auditor conclude?", options: ["Fine, since Ijarah rent is fixed", "Non-compliant: no fixed return may be assured; projected rates must be adjusted to actual pool performance", "Fine if disclosed", "Only a problem above 10 %"], answer: 1, explanation: "p. 360.", topic: "t14.3.1", diff: "M", level: "application", obj: "Apply rules against fixed returns on deposits" },
    { id: "q14.19", type: "identify", q: "Which mode has “Loss to the bank” for late payments in Box 14.1?", options: ["Diminishing Musharakah", "Ijarah", "Murabaha", "Istisna‘a"], answer: 2, explanation: "Salam also shows loss to the bank (pp. 361–362).", topic: "t14.3.2", diff: "M", level: "recall", obj: "Read Box 14.1" },
    { id: "q14.20", type: "scenario", q: "In Box 14.2, how does the bank avoid being left with cotton inventory after Salam?", options: ["It stores the cotton", "It takes a promise from a textile mill to buy, appoints the mill agent to take delivery, then sells to it by Murabaha", "It returns the cotton to the grower", "It sells the Salam contract"], answer: 1, explanation: "p. 362.", topic: "t14.3.2", diff: "M", level: "application", obj: "Apply combined Salam–Murabaha" },
    { id: "q14.21", type: "short", q: "Why is a tenor mismatched with the client’s cash flow “suicidal” for an Islamic bank?", answer: "Because the bank cannot claim liquidated damages for its cost of funds on default or roll over the debt at a higher price.", keywords: ["liquidated", "damages"], explanation: "pp. 362–363.", topic: "t14.3.3", diff: "M", level: "understanding", obj: "Explain the importance of tenor" },
    { id: "q14.22", type: "multi", q: "Which are among the equity screening criteria in the chapter? (Select all.)", options: ["Interest income ratio not more than 5 %", "Debt ratio not more than 10–33 %", "Illiquid assets at least 10–33 % of total assets", "Dividend yield above 5 %"], answer: [0, 1, 2], explanation: "pp. 363–364.", topic: "t14.3.4", diff: "M", level: "recall", obj: "Recall equity screening criteria" },
    { id: "q14.23", type: "tf", q: "A supplier in which the Murabaha client owns 60 % may be used as the source of Murabaha goods.", answer: false, explanation: "Suppliers should not be sister concerns; the client’s share should not exceed 50 % (p. 365).", topic: "t14.3.4", diff: "M", level: "application", obj: "Apply buy-back controls" },
    { id: "q14.24", type: "identify", q: "If a demand promissory note is needed at disbursement in Murabaha, it should cover:", options: ["Principal plus mark-up", "Principal only", "Mark-up only", "Double the principal"], answer: 1, explanation: "p. 365.", topic: "t14.3.4", diff: "M", level: "recall", obj: "Recall DP note rule" },
    { id: "q14.25", type: "scenario", q: "An Ijarah asset is imported in the client’s name to save duties. What is the minimum the Shari’ah board should ensure?", options: ["Nothing", "A counter deed between bank and client transferring ownership to the bank as lessor", "That rent is doubled", "That the client insures it conventionally"], answer: 1, explanation: "p. 366.", topic: "t14.3.4", diff: "M", level: "application", obj: "Apply Ijarah title controls" },
    { id: "q14.26", type: "tf", q: "Rent received in advance on an Ijarah may be taken as income once an accounting period has passed, even if the asset has not been delivered.", answer: false, explanation: "Advance rent is not income; auditors check delivery orders (p. 366).", topic: "t14.3.4", diff: "H", level: "understanding", obj: "Apply Ijarah accounting controls" },
    { id: "q14.27", type: "scenario", q: "In a DM on an open plot of land, the bank wants to charge monthly rent and revalue its units by 1 % a month. What is wrong?", options: ["Nothing", "An open plot is a commercial asset that cannot be leased, and fixed revaluation regardless of actual value is usurious", "Only the revaluation rate is too low", "DM cannot involve land"], answer: 1, explanation: "p. 367.", topic: "t14.3.4", diff: "H", level: "analysis", obj: "Evaluate DM structures" },
    { id: "q14.28", type: "definition", q: "Asymmetric information means:", options: ["Both parties know the same facts", "One party to a transaction has more or better information than the other", "Prices are unequal", "Information is secret"], answer: 1, explanation: "p. 368.", topic: "t14.3.5", diff: "E", level: "recall", obj: "Define asymmetric information" },
    { id: "q14.29", type: "scenario", q: "A client asks only for a sight L/C to be opened, not finance. The bank takes no cover and the client pays late after the Nostro is debited. What would have protected the bank?", options: ["Charging interest", "An agency agreement at L/C opening, allowing a Murabaha to cover the credit period", "A penalty paid to the bank", "Nothing"], answer: 1, explanation: "p. 368.", topic: "t14.3.5", diff: "H", level: "application", obj: "Apply documentation controls" },
    { id: "q14.30", type: "order", q: "Order the Salam-based working-capital process for a sugar mill.", items: ["Bank pays the full price in advance under Salam (may take a charge on assets)", "Bank and mill sign an agency agreement for sale at an agreed price", "On the delivery date the bank takes delivery and authorises the mill to sell", "The mill sells and pays the price to the bank"], explanation: "p. 370.", topic: "t14.4.1", diff: "M", level: "understanding", obj: "Sequence Salam working capital" },
    { id: "q14.31", type: "tf", q: "In working-capital Musharakah, partners may agree that the client bears all indirect expenses and receives a larger profit ratio in return.", answer: true, explanation: "Direct costs remain joint (p. 370).", topic: "t14.4.1", diff: "M", level: "understanding", obj: "Apply gross-profit sharing" },
    { id: "q14.32", type: "application", q: "Musawamah against an export bill of US$100,000: spot Rs.57.75, bank rate Rs.57.60. How much does the bank disburse for raw materials?", options: ["Rs.5,775,000", "Rs.5,760,000", "Rs.5,700,000", "US$100,000"], answer: 1, explanation: "p. 371.", topic: "t14.4.2", diff: "E", level: "application", obj: "Calculate the Musawamah disbursement" },
    { id: "q14.33", type: "mcq", q: "In the import Murabaha shipping-guarantee case, what may be adjusted if the final cost differs?", options: ["Profit only", "Cost portion only", "Both cost and profit", "Neither"], answer: 1, explanation: "p. 373.", topic: "t14.4.2", diff: "H", level: "understanding", obj: "Apply cost adjustment in Murabaha" },
    { id: "q14.34", type: "identify", q: "From when is profit charged in an import sub-Murabaha?", options: ["From L/C opening", "From the day the bank’s Nostro is debited to the settlement date", "From the goods’ arrival", "From the invoice date"], answer: 1, explanation: "p. 373.", topic: "t14.4.2", diff: "H", level: "recall", obj: "Recall import Murabaha pricing" },
    { id: "q14.35", type: "scenario", q: "A consortium finances a new oil terminal. Which structure matches the book?", options: ["Interest-bearing loan", "Binding promise to lease + Istisna‘a with a contractor + operator as supervising agent + Ijarah on completion", "Murabaha of the terminal before construction", "Salam of oil"], answer: 1, explanation: "p. 374.", topic: "t14.4.3", diff: "M", level: "application", obj: "Structure a project syndication" },
    { id: "q14.36", type: "tf", q: "If a Sukuk pool contains Murabaha receivables, the Sukuk cannot be sold below the value of those receivables.", answer: true, explanation: "p. 374.", topic: "t14.4.3", diff: "H", level: "understanding", obj: "Apply Sukuk pricing rules" },
    { id: "q14.37", type: "multi", q: "Which liquidity tools are described for Islamic banks? (Select all.)", options: ["Interbank Mudarabah", "Outright sale of government Sukuk", "Inviting investment in a Murabaha/Ijarah pool (Murabaha < 50 %)", "Overnight interest-bearing call money"], answer: [0, 1, 2], explanation: "Also Parallel Salam and (cautiously) Tawarruq (pp. 374–375).", topic: "t14.4.4", diff: "M", level: "recall", obj: "Recall liquidity tools" },
    { id: "q14.38", type: "identify", q: "Which is an approved form of constructive possession in currency exchange?", options: ["A verbal promise to pay later", "Receipt of a cheque where the issuer’s balance is available and blocked for payment", "A post-dated cheque", "A forward contract"], answer: 1, explanation: "p. 376.", topic: "t14.4.5", diff: "M", level: "recall", obj: "Recall constructive possession forms" },
    { id: "q14.39", type: "tf", q: "Two parties owing each other debts in dinars and dirhams may agree an exchange rate to set them off.", answer: true, explanation: "Set-off is permissible (p. 376).", topic: "t14.4.5", diff: "M", level: "understanding", obj: "Apply set-off rules" },
    { id: "q14.40", type: "scenario", q: "A currency dealer asks an Islamic bank for forward cover to profit from expected rate moves. What is the answer?", options: ["Allowed with a fee", "Not allowed — forward cover requires a documented genuine trade or payment need", "Allowed if under 90 days", "Allowed as a bilateral binding sale"], answer: 1, explanation: "p. 377.", topic: "t14.4.5", diff: "M", level: "application", obj: "Apply forward-cover conditions" },
    { id: "q14.41", type: "multi", q: "Which qualify a company as “blue chip” for the IERS Musharakah pool? (Select any that qualify alone.)", options: ["Good track record on the stock exchange", "Rating of at least B+", "ROE over the last three years above SBP’s EFS rates", "Being a government entity"], answer: [0, 1, 2], explanation: "Plus no adverse CIB report (p. 378).", topic: "t14.4.6", diff: "H", level: "recall", obj: "Recall IERS pool criteria" },
    { id: "q14.42", type: "identify", q: "Under the IERS, where does SBP’s profit above conventional EFS rates go?", options: ["SBP’s income", "A non-remunerative Takaful fund for future losses", "Back to the exporters", "Charity"], answer: 1, explanation: "p. 378.", topic: "t14.4.6", diff: "M", level: "recall", obj: "Recall the IERS Takaful fund" },
    { id: "q14.43", type: "comparison", q: "How does the Emirates Islamic Bank card differ from a charge card?", options: ["It charges interest", "It allows a minimum monthly payment of 10 % of the balance instead of the full amount, for a fixed service fee", "It has no fees", "It is based on ‘Inah"], answer: 1, explanation: "p. 381.", topic: "t14.4.7", diff: "M", level: "understanding", obj: "Compare Islamic card structures" },
    { id: "q14.44", type: "identify", q: "What share of the outstanding balance must a KFH Al Tayseer cardholder repay each month?", options: ["10 %", "One-third", "Half", "All of it"], answer: 1, explanation: "The remaining two-thirds roll over without interest (p. 383).", topic: "t14.4.7", diff: "M", level: "recall", obj: "Recall KFH card features" },
    { id: "q14.45", type: "tf", q: "An Islamic card may pay membership fees to international card organisations even if the fees indirectly include interest through a higher service charge.", answer: false, explanation: "Not if they include interest, even indirectly (p. 381).", topic: "t14.4.7", diff: "H", level: "understanding", obj: "Apply card membership rules" },
    { id: "q14.46", type: "short", q: "Name two areas of cooperation between Islamic and conventional banks mentioned in the chapter.", answer: "Correspondent services, foreign trade finance, co-financing projects, non-interest placements, information exchange and staff training.", keywords: ["correspond", "train", "co-financ", "trade", "placement", "information"], explanation: "p. 384.", topic: "t14.5", diff: "E", level: "recall", obj: "Recall cooperation areas" },
    { id: "q14.47", type: "identify", q: "When a letter of guarantee is called, what can the Islamic bank recover?", options: ["Principal plus profit", "Only the principal amount", "Principal plus a time-based fee", "Nothing"], answer: 1, explanation: "p. 385.", topic: "t14.6", diff: "M", level: "recall", obj: "Recall L/G rules" },
    { id: "q14.48", type: "comparison", q: "Why is a Musharakah L/C described as more flexible than a Murabaha L/C?", options: ["It earns interest", "The L/C can be in either party’s name and either can administer it; on receipt the goods can be sold or the bank’s share bought", "It needs no documents", "It is always cheaper"], answer: 1, explanation: "p. 385.", topic: "t14.6", diff: "M", level: "understanding", obj: "Compare L/C structures" },
    { id: "q14.49", type: "mcq", q: "Under the AAOIFI standard, a Shari’ah supervisory board must have at least:", options: ["One scholar", "Three Shari’ah scholar members", "Five members including directors", "Seven members"], answer: 1, explanation: "p. 387.", topic: "t14.appx", diff: "E", level: "recall", obj: "Recall SSB composition" },
    { id: "q14.50", type: "order", q: "Order the stages of a Shari’ah review (AAOIFI Governance Standard No. 2).", items: ["Planning review procedures", "Executing procedures and preparing working papers", "Documenting the conclusion and report"], explanation: "p. 388.", topic: "t14.appx", diff: "M", level: "recall", obj: "Sequence Shari’ah review" }
  ],
  exam: [
    { id: "e14.1", kind: "long", q: "Discuss the internal Shari’ah controls an Islamic bank should apply to Murabaha and Ijarah financing.", structure: ["Why controls matter (back door to interest)", "Nine Murabaha controls", "Documentation and Tawarruq within Murabaha", "Ten Ijarah controls", "DM and Musharakah controls", "Charity account oversight"], keyConcepts: ["rollover", "title", "mark-up date", "DP note"], points: ["Board approval of master agreements"], mistakes: ["Allowing mark-up from disbursement", "Rent before delivery"], topic: "t14.3.4" },
    { id: "e14.2", kind: "scenario", q: "An exporter needs cash against a 90-day export bill. Propose Shari’ah-compliant alternatives to discounting.", structure: ["Why discounting is Riba", "Qard + collection fee", "Musawamah structure with numbers", "Outright purchase of goods with L/C assignment", "Other modes (Salam, Istisna‘a)"], keyConcepts: ["Musawamah", "agency"], points: ["Fees amount-related not time-related"], mistakes: ["Discounting at a lower rate and calling it profit"], topic: "t14.4.2" },
    { id: "e14.3", kind: "short", q: "Can an Islamic bank issue a credit card? Explain with reference to the OIC Fiqh Council and card models.", structure: ["Card types", "OIC Fiqh Council ruling", "Permissible fees and privileges", "Market models (EIB, KFH)", "‘Inah-based models and critique", "Murabaha/Musharakah possibilities"], keyConcepts: ["charge card", "Ujrah", "‘Inah"], points: ["Penalty to charity"], mistakes: ["Approving interest in free-period cards"], topic: "t14.4.7" },
    { id: "e14.4", kind: "conceptual", q: "Explain how Islamic banks can manage liquidity without interest.", structure: ["Interbank Mudarabah", "Government Sukuk trading", "Asset pools", "Parallel Salam", "Tawarruq and its limits", "Central bank role"], keyConcepts: ["liquidity", "Sukuk"], points: ["Outright sales vs repo"], mistakes: ["Treating Tawarruq as first choice"], topic: "t14.4.4" },
    { id: "e14.5", kind: "viva", q: "What are the Shari’ah conditions for forward currency cover?", structure: ["Currency exchange rules", "Unilateral promise", "Genuine need", "No fee; earnest money"], keyConcepts: ["Bai‘ al-Sarf"], points: ["Bilateral binding promise forbidden"], mistakes: ["Allowing speculation"], topic: "t14.4.5" },
    { id: "e14.6", kind: "long", q: "Explain how an Islamic bank can meet the trade-finance needs of importers and exporters without interest.", structure: ["Principles", "Import Murabaha and settlement options", "Post-shipment alternatives", "Pre-shipment Murabaha–Istisna‘a–Wakalah", "L/C fees and correspondents"], keyConcepts: ["Musawamah", "Sub-Murabaha", "Agency", "Istisna‘a"], points: ["Fee for L/Cs not time-related (p. 385)", "Bill discounting replaced by collection fee or Musawamah (p. 371)", "Purchase of ready goods with L/C assignment (pp. 371–372)", "Import settlement: normal, PAD, TR, shipping guarantee (pp. 372–373)", "Correspondent arrangements without interest (pp. 385–386)"], mistakes: ["Discounting bills at a time-based rate", "Adjusting the profit portion after sale"], topic: "t14.4.2" },
    { id: "e14.7", kind: "difference", q: "Distinguish debit, charge and credit cards, and state which can be Shari’ah-compliant.", structure: ["Debit card", "Charge card", "Credit card", "OIC Fiqh Council 2000", "Compliant structures"], keyConcepts: ["Revolving credit", "Free credit period", "Merchant commission"], points: ["Debit card: within available funds (p. 379)", "Charge card: no revolving facility, full payment on statement (p. 379)", "Credit card: revolving credit with interest (p. 379)", "Fees fixed for services; merchant commission allowed if the price is the same for cash and credit (p. 380)", "Examples: EIB, KFH; ‘Inah-based cards questionable (pp. 381–383)"], mistakes: ["Assuming any card with an interest clause is fine if paid on time", "Percentage cash-withdrawal fees"], topic: "t14.4.7" }
  ]
});
