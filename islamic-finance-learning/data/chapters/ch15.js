/* Chapter 15 — Sukuk and Securitization: Vital Issues in Islamic Capital Markets. Source pp. 389–416. */
IFL_DATA.registerChapter({
  number: 15,
  title: "Sukuk and Securitization: Vital Issues in Islamic Capital Markets",
  part: "part-iii",
  pages: [389, 416],
  minutes: 80,
  difficulty: "Advanced",
  objectives: [
    "Describe the Islamic capital market and why a conventional debt market is excluded; explain IDRs.",
    "Define securitisation and investment Sukuk (AAOIFI) and distinguish Sukuk from shares and bonds.",
    "Identify the parties, SPV features, risks and classes of securitised papers.",
    "Explain the Shari’ah bases of Sukuk and the criticism of ‘Inah- and Bai‘ al Dayn-based structures.",
    "Explain each category of Sukuk — Mudarabah, Musharakah, Ijarah, Salam, Istisna‘a, Murabaha, mixed portfolio — and their tradability (Box 15.3).",
    "Evaluate issues in Sukuk structures (fixed returns, interdependent contracts, transparency, reliance on Ijarah) and potential.",
    "Analyse the case studies: IDB Solidarity Trust, Nakheel, Pakistan sovereign, WAPDA and Hanco."
  ],
  why: "Sukuk are the flagship of Islamic capital markets and the most debated product in the industry. Exams test the AAOIFI definition, Sukuk vs bonds, tradability rules for each type and the author's concerns about fixed returns and guarantees.",
  overview: "After tracing the growth of Sukuk, the chapter outlines an Islamic capital market (stocks, funds, Sukuk, IDRs). It explains securitisation, AAOIFI's definition of investment Sukuk, the parties and SPV, risk analysis and the Shari’ah bases of Sukuk, including criticism of Malaysian ‘Inah and Bai‘ al Dayn practices. Each Sukuk category is then examined with its tradability, followed by issues in current structures, the potential of Sukuk, a summary and case studies.",
  summarySection: "15.4",
  topics: [
    {
      id: "t15.1", section: "15.1", title: "Introduction: Growth of Sukuk", pages: [389, 390], tier: "core",
      concepts: ["sukuk", "securitization"],
      intuition: "How can an Islamic market offer bond-like features when debt cannot be sold?",
      simple: "Shirkah-based certificates (Mudarabah certificates, PTCs) have existed since the early 1980s; non-Shirkah Sukuk since 1992; the first dollar Sukuk ($600 million, Malaysia) in 2002; IDB's $400 million Solidarity Trust Sukuk in 2003; then about forty sovereign and corporate issues. Debts cannot be sold except under Hawalah rules (at face value with recourse), so they cannot generate returns; but Ijarah and mixed-asset Sukuk give some debt-market features. The key requirement: interest-bearing debt must not be the dominant underlying asset. Sukuk may be variable-return (VRS) or fixed-return (FRS); FRS returns are in principle quasi-fixed unless an independent third party guarantees them.",
      academic: [
        "Prominent issues: PCFC USD 3.5 billion (DP World's P&O acquisition), Nakheel USD 3.52 billion, Pakistan sovereign USD 600 million. S&P put the market for Islamic financial products at about $400 billion (as cited).",
        "Two decades earlier it was thought only an equity market was possible for long-term Islamic finance.",
        "Shirkah- and Ijarah-based Sukuk represent ownership of underlying assets and can trade at market prices."
      ],
      exam: "Milestones: 1980s Mudarabah/PTCs; 1992 non-Shirkah Sukuk; 2002 first $600m dollar Sukuk (Malaysia); 2003 IDB $400m. Debt tradable only by Hawalah at par. Requirement: interest-bearing debt not dominant. VRS vs FRS (quasi-fixed).",
      keyPoints: ["Ijarah and mixed-pool Sukuk offer debt-market-like benefits.", "Independent third-party guarantee can make returns fixed."],
      definitions: [
        { term: "Variable-return Sukuk (VRS)", meaning: "Sukuk whose returns depend on participatory modes such as Musharakah or Mudarabah." },
        { term: "Fixed-return Sukuk (FRS)", meaning: "Sukuk based on fixed-return modes (Ijarah, Murabaha); returns are in principle quasi-fixed, not guaranteed." }
      ],
      related: ["t15.3", "t11.5.3"],
      quickCheck: { q: "When and where was the first dollar-denominated Sukuk issue (US$600m) offered?", options: ["Bahrain, 1992", "Malaysia, 2002", "Pakistan, 2005", "Dubai, 2006"], answer: 1, explanation: "p. 389." }
    },
    {
      id: "t15.2", section: "15.2", title: "The Capital Market in an Islamic Framework (Box 15.1 IDRs)", pages: [390, 391], tier: "core",
      concepts: ["capital-market", "hawalah"],
      intuition: "Which parts of a capital market survive the Riba and Gharar filters?",
      simple: "A capital market includes equity, debt and Sukuk markets. The conventional debt market (bonds, debentures) involves Riba and Gharar and is not part of Islamic markets; debts can only be assigned at par without transferring default risk (Hawalah — with recourse, unlike sale). Key components: Shari’ah-compliant stocks, Islamic funds and Sukuk. Development requires Sukuk, Islamic depository receipts (IDRs), Shirkah-based financing, securitisation and fund management. Sukuk represent undivided shares in underlying assets; holders share agreed returns and bear loss pro rata.",
      academic: [
        "Box 15.1: a GDR is a negotiable certificate in one country representing shares traded in another (ADRs, EDRs, IDRs). IDR parties: originator, investor, custodian bank.",
        "IDR advantages — originators: wider investor base, lower cost of funds, better image; investors: diversification, compliant stocks for IFIs, higher returns than conventional Murabaha placements, liquidity management. Importance: convergence of Islamic capital markets, alternative to cross-listing, regulation, development funds, standardisation, growth. Supporting institutions: IDB, IIFM, rating agencies, IFSB, regulators, IFIs."
      ],
      exam: "Islamic capital market = compliant stocks + funds + Sukuk (+ IDRs); no conventional debt market; debt transfer only by Hawalah at par with recourse. IDR parties and advantages.",
      keyPoints: ["Hawalah: transfer with recourse; sale: without recourse."],
      definitions: [{ term: "Islamic depository receipt (IDR)", meaning: "A depository receipt allowing Shari’ah-compliant stocks of one country to be traded in another; parties are originator, investor and custodian bank." }],
      related: ["t8.8.2", "t15.3"],
      quickCheck: { q: "How can a debt be transferred under Shari’ah rules?", options: ["Sold at a discount", "Assigned at par with recourse (Hawalah)", "Securitised at market price", "Not at all"], answer: 1, explanation: "p. 390." }
    },
    {
      id: "t15.3", section: "15.3", title: "Securitisation and Sukuk: Definition and Benefits", pages: [391, 393], tier: "core",
      concepts: ["sukuk", "securitization", "spv"],
      intuition: "What exactly does a Sukuk holder own?",
      simple: "Securitisation pools and repackages illiquid assets into tradable certificates, turning the originator from accumulator into distributor. In Islamic finance, ownership of the underlying assets passes to investors through Sukuk (plural of Sak), via an SPV or special purpose Mudarabah that manages assets and issues certificates. AAOIFI: investment Sukuk are certificates of equal value representing undivided shares in ownership of tangible assets, usufruct and services, or assets of particular projects or a specified investment activity. Unlike shares, Sukuk represent specified assets for a fixed period; unlike bonds, returns come from asset cash flows.",
      academic: [
        "Process is similar to conventional securitisation except for avoiding Riba, Gharar and prohibited activities; it involves isolating and allocating risks, tax, accounting and legal evaluation, credit enhancement (cash reserves, Takaful, overcollateralisation, triggers, performance guarantees, third-party guarantees) and pricing residual risk.",
        "Investor benefits: premium over vanilla papers, stability, focused risk, diversification, tailored cash flows, flexible maturities, expert risk assessment. Originator benefits: transparent fund approval, efficient collection and control. Sukuk help develop capital markets, attract conservative and international investors and share risk efficiently.",
        "The premium depends on secondary-market liquidity, structural complexity, comfort with collateral and demand at issue. Tenors issued so far range from three months to ten years."
      ],
      exam: "AAOIFI definition (equal value; undivided ownership of tangible assets, usufruct, services, project assets or investment activity). Sukuk vs shares (specified assets, fixed period) vs bonds (asset cash flows, not debt). SPV/SPM. Credit enhancement examples.",
      keyPoints: ["Securitisation: accumulator → distributor.", "Sukuk = ownership, not debt."],
      definitions: [
        { term: "Sukuk", meaning: "Plural of Sak: certificates of equal value representing undivided shares in the ownership of tangible assets, usufruct, services, or the assets of particular projects or investment activities (AAOIFI)." },
        { term: "Securitisation", meaning: "Pooling and repackaging illiquid assets into tradable investment certificates." }
      ],
      distinctions: [
        { a: "Sukuk", b: "Shares", text: "Shares represent ownership of a whole company for an indefinite period; Sukuk represent specified assets for a given period." },
        { a: "Sukuk", b: "Bonds", text: "Bonds are interest-bearing debt; Sukuk returns come from cash flows of the underlying assets owned by holders." }
      ],
      related: ["t15.3.1", "t15.3.2", "t11.5.3"],
      quickCheck: { q: "According to AAOIFI, investment Sukuk represent:", options: ["A loan to the issuer", "Undivided shares in the ownership of tangible assets, usufruct, services or project assets", "Shares of the whole company", "Receivables only"], answer: 1, explanation: "p. 392." }
    },
    {
      id: "t15.3.1", section: "15.3.1", title: "Parties to Sukuk Issue and Classes of Securitised Papers", pages: [393, 394], tier: "supporting",
      concepts: ["sukuk", "spv"],
      intuition: "Who does what in a Sukuk deal?",
      simple: "Key players: the originator (sells assets to the SPV and uses funds — usually governments or large corporations), the SPV (buys assets, issues Sukuk; sometimes called issuer), investment banks (underwriting, lead managing, book-building for fees) and subscribers. Others: obligor, lead manager/arranger, servicer, cash administrator (paying agent), credit-enhancement provider, rating agency, legal and tax counsel, auditor, custodian/registrar. Classes: asset-backed; pool-based (mortgage-backed; CDO/CLO — not compliant unless under Hawalah rules; lease rentals — ownership must pass); future-flow (road tolls — pro rata ownership needed; telecom; credit-card receivables — not compliant unless Hawalah).",
      academic: ["Figure 15.1 shows originator → SPV (sale of receivables) → senior and subordinate investors via PTCs, with a servicer and T&R account handling pool collections."],
      exam: "Parties: originator, SPV, investment banks, subscribers + obligor, lead manager, servicer, cash administrator, credit enhancer, rating agency, counsel, auditor, custodian. Non-compliant classes unless Hawalah: CDO/CLO, credit-card receivables.",
      keyPoints: ["Lease-rental and toll securitisation require ownership transfer."],
      related: ["t15.3.2"],
      quickCheck: { q: "Which class of securitisation is described as non-compliant unless subjected to Hawalah rules?", options: ["Ijarah Sukuk with ownership transfer", "Credit card receivable securitisation", "Musharakah Sukuk", "Asset-backed Ijarah"], answer: 1, explanation: "p. 394." }
    },
    {
      id: "t15.3.2", section: "15.3.2", title: "Special Purpose Vehicle (SPV)", pages: [394, 395], tier: "supporting",
      concepts: ["spv"],
      intuition: "Why create a separate company just to hold the assets?",
      simple: "An SPV is a separate legal entity for managing the issue; it is capital- and tax-efficient, bankruptcy-remote and thinly capitalised. The sale to the SPV must be a true sale with proper segregation — the originator's discretion ends and cannot be reversed on its insolvency. Payment structures: pass-through (collections remitted immediately) and pay-through (servicing desynchronised from cash flows, with possible reinvestment); SPVs may act as conduits for multiple issuances.",
      academic: ["Its legal form depends on the regulatory and legal environment."],
      exam: "SPV: separate, bankruptcy-remote, thin capital, true sale; pass-through vs pay-through; conduits.",
      keyPoints: ["True sale is essential."],
      definitions: [{ term: "Special purpose vehicle (SPV)", meaning: "A bankruptcy-remote entity created to buy the securitised assets, issue Sukuk and manage them for holders." }],
      related: ["t15.3.1"],
      quickCheck: { q: "In a pass-through structure, the SPV:", options: ["Reinvests collections until a schedule date", "Remits collections completely and immediately to investors", "Keeps collections", "Pays a fixed coupon from its capital"], answer: 1, explanation: "p. 395." }
    },
    {
      id: "t15.3.3", section: "15.3.3", title: "Risk, Contract and Cash Flow Analysis (Box 15.2)", pages: [395, 395], tier: "supporting",
      concepts: ["risk", "securitization"],
      intuition: "What risks does a lead arranger have to price?",
      simple: "Risks: credit and bankruptcy, performance, asset/collateral, payment (incl. credit enhancers), return-rate, exchange-rate, liquidity, servicer commingling, prepayment, reinvestment (pay-through) and legal/regulatory/tax risk. Contract analysis examines rights, obligations, defaults and documentation; cash-flow analysis models scenarios for the rating. Box 15.2: securitisation reduces originator liquidity, FX and funding cost risks, takes assets off balance sheet, and diversification lowers earnings risk; for investors, undivided ownership adds protection.",
      academic: ["Pooling across multiple originators reduces the cost of finance."],
      exam: "Eleven risk types; contract analysis; cash-flow analysis; Box 15.2 benefits.",
      keyPoints: ["Undivided ownership = investor protection."],
      related: ["t15.3.7"],
      quickCheck: { q: "Prepayment risk in securitisation refers to:", options: ["Default by the obligor", "Variation in investment maturity due to early payment by obligors", "Currency movements", "Legal changes"], answer: 1, explanation: "p. 395." }
    },
    {
      id: "t15.3.4", section: "15.3.4", title: "Shari’ah Bases of Sukuk Issue and Disputed Structures", pages: [396, 398], tier: "core",
      concepts: ["sukuk", "inah", "bai-al-dayn"],
      intuition: "What makes some Sukuk ‘as good or as bad as interest-based bonds’?",
      simple: "AAOIFI types: Sukuk of ownership in leased assets (and of usufruct and services, existing or future), Salam, Istisna‘a, Murabaha, Musharakah (participation, Mudarabah, investment agency), Muzara‘ah, Musaqah and Mugharasah. Structurally, Sukuk rest on Shirkah on one side, with returns variable or quasi-fixed depending on the second leg; a third-party guarantee can make them fixed. Many Malaysian Sukuk use Bai‘ al ‘Inah and Tabarru‘ and trade via Bai‘ al Dayn at discount — rejected by the majority and by the OIC Fiqh Council unanimously. Sale and lease-back is allowed if the sale is complete before the lease; scholars recommend at least one year before repurchase.",
      academic: [
        "Risk mitigation: a Takaful fund from holders' contributions or cover from Takaful companies; profit equalisation reserves with prospectus disclosure.",
        "Bai‘ al ‘Inah: double sale — for cash and back for a higher credit price — a device to circumvent Riba. Rosly and Sanusi: use of this legal device undermines Niyyah and makes such Islamic bonds' legitimacy suspect.",
        "Bai‘ al Dayn at a discount: classical jurists unanimous against; Shafi‘is allowed debt sale only at par; overwhelming majority of contemporary scholars against; some Malaysian scholars allow it.",
        "Sale and lease-back for consumer durables is not considered desirable except to escape interest financing.",
        "Ijarah Sukuk holders must bear asset price risk and ownership costs, so returns are quasi-fixed; most Sukuk nevertheless pay absolutely fixed returns — a systemic risk of non-compliance.",
        "Sudanese, Bahraini and other Middle Eastern Sukuk based on Shirkah, Ijarah, Salam, Istisna‘a or mixed pools are acceptable to almost all scholars, subject to underlying contract essentials."
      ],
      exam: "AAOIFI eight types. Structure: Shirkah + second-leg mode → variable or quasi-fixed. Criticised: ‘Inah + Tabarru‘ issue, Bai‘ al Dayn trading (Malaysia) — rejected by majority and OIC Fiqh Council. Sale and lease-back allowed with complete sale and ~1-year gap.",
      keyPoints: [
        "Rosly and Sanusi's critique of Malaysian Islamic bonds.",
        "Absolutely fixed returns = systemic non-compliance risk (author)."
      ],
      table: {
        caption: "AAOIFI types of investment Sukuk (Section 15.3.4)",
        head: ["#", "Sukuk type"],
        rows: [["1", "Ownership in leased assets; usufruct of existing/future assets; services of a specified party; future services"], ["2", "Salam Sukuk"], ["3", "Istisna‘a Sukuk"], ["4", "Murabaha Sukuk"], ["5", "Musharakah Sukuk: participation, Mudarabah, investment agency"], ["6", "Muzara‘ah (share-cropping)"], ["7", "Musaqah (irrigation of fruit trees)"], ["8", "Mugharasah (plantation)"]]
      },
      debate: [{
        issue: "Are Sukuk structured on Bai‘ al ‘Inah and traded by Bai‘ al Dayn Shari’ah-compliant?",
        criticism: "‘Inah is a double sale producing a loan with interest; discounted debt sale is Riba. Rosly and Sanusi say such bonds' legitimacy is suspect because Niyyah is undermined.",
        response: "Some Malaysian scholars allow them, citing the Shafi‘i school.",
        alternative: "Shafi‘is allowed debt sale only at par; the OIC Fiqh Council unanimously prohibits Bai‘ al Dayn; use genuine Ijarah (including properly executed sale and lease-back), Shirkah, Salam or Istisna‘a structures.",
        takeaway: "The majority and the author regard ‘Inah- and Bai‘ al Dayn-based Sukuk as unacceptable; Malaysia's later Ijarah Sukuk are described as a healthy development."
      }],
      related: ["t15.3.5", "t6.11", "t11.5.1"],
      quickCheck: { q: "Trading Sukuk representing debt at a discount through Bai‘ al Dayn is:", options: ["Accepted by the majority", "Rejected by the majority and unanimously by the OIC Fiqh Council", "Allowed by all Shafi‘is at any price", "Required by AAOIFI"], answer: 1, explanation: "p. 397." }
    },
    {
      id: "t15.3.5", section: "15.3.5", title: "Categories of Sukuk: Mudarabah and Musharakah Sukuk", pages: [398, 400], tier: "core",
      concepts: ["sukuk", "mudarabah", "musharakah"],
      intuition: "How is a Mudarabah turned into tradable certificates?",
      simple: "Mudarabah (Muqaradah) Sukuk: issuer = Mudarib, subscribers = capital owners, funds = Mudarabah capital; holders own the assets, share agreed profit and bear loss. OIC Fiqh Council (1988): common ownership in specific projects; prospectus sets out Qirad terms; transferable — at par under Sarf rules if capital is still money, under debt rules if debt, at market price if mixed; manager may add own capital; no guarantee of capital or fixed profit by issuer/manager; P&L published; reserves allowed; an unrelated third party may promise a donation to cover losses. Musharakah Sukuk are similar but the intermediary is a partner; tradable once nonliquid assets exceed 50%; considered more equitable and safer than Mudarabah. Sudan's CMCs and GMCs (since 1998) replace T-bills.",
      academic: [
        "Mudarabah certificates could form variable capital (class B shares) of a bank.",
        "Musharakah Sukuk can be redeemable, for corporates or individuals (vehicles, clinics, hospitals, factories, trading centres, endowments); proceeds can buy and lease equipment, build projects or finance working capital; mixed assets may sell above the value of their liquid part.",
        "CMCs are auctioned by the central bank and traded interbank for open market operations."
      ],
      exam: "Mudarabah Sukuk (OIC 1988 seven features) — trading by asset composition; no issuer guarantee; third-party donation allowed. Musharakah Sukuk: manager as partner, >50% nonliquid for trading, safer; Sudan CMC/GMC.",
      keyPoints: ["Third-party loss cover must be independent of the Mudarabah contract."],
      related: ["t12.7.3", "t15.3.6"],
      quickCheck: { q: "Mudarabah Sukuk whose capital is still entirely cash can be traded:", options: ["At any market price", "Only under Bai‘ al Sarf rules (at par)", "Only at a discount", "Not at all ever"], answer: 1, explanation: "p. 399." }
    },
    {
      id: "t15.3.5.b", section: "15.3.5", title: "Categories of Sukuk: Ijarah Sukuk", pages: [400, 403], tier: "core",
      concepts: ["sukuk", "ijarah"],
      intuition: "Why are Ijarah Sukuk the market's favourite — and what must holders really bear?",
      simple: "Ijarah Sukuk represent pro rata ownership of well-defined leased assets, with rent as return. Governments can use them for airports, roads, schools and hospitals, provided they have durable assets (income-generating or not). Types: ownership in leased assets; usufruct of existing assets; usufruct of future described assets; services of a specified supplier; described future services. Rent for the first term must be clear; later terms may be benchmarked (even to interest rates — permitted but not ideal). Holders bear ownership costs and destruction risk, so returns are quasi-fixed. Tradable after ownership transfer; issuer may redeem at market or agreed price.",
      academic: [
        "Rent may be paid before, during or after the usufruct period — a flexibility for structuring.",
        "Ijarah funds: most jurists say Mudarabah is limited to trade, but the Hanbali view (preferred by most contemporary scholars) allows Mudarabah in leasing.",
        "Usufruct Sukuk can be traded before sub-leasing; after sub-lease they represent rent receivables (debt rules). Future-usufruct Sukuk trade only after the asset is identified.",
        "Rent may be split into a lessor part and an ‘on account’ part held by the lessee for ownership costs. The lessor may assure lessee performance (as with IDB) but destruction without lessee fault is the holders' loss.",
        "Procedure: SPV buys asset, issues Sukuk, leases to government/corporate; rentals distributed; small possible variation from ownership expenses or default."
      ],
      exam: "Ijarah Sukuk: pro rata asset ownership; rent = return; five AAOIFI Ijarah-type Sukuk; quasi-fixed; tradable after ownership transfer; usufruct Sukuk tradable before sub-lease; government use requires durable assets.",
      keyPoints: ["Must represent real ownership, not merely a right to rent.", "Benchmarking to interest rates tolerated, not ideal."],
      related: ["t11.5.3", "t15.3.6"],
      quickCheck: { q: "Why are Ijarah Sukuk returns described as quasi-fixed?", options: ["Rent is always variable", "Holders as owners bear ownership expenses and destruction risk, and lessees may default", "Returns are guaranteed by AAOIFI", "They pay no rent"], answer: 1, explanation: "pp. 402–403." }
    },
    {
      id: "t15.3.5.c", section: "15.3.5", title: "Categories of Sukuk: Salam, Istisna‘a and Murabaha Sukuk", pages: [403, 406], tier: "core",
      concepts: ["sukuk", "salam", "istisna", "murabaha"],
      intuition: "Which Sukuk represent a debt, and what does that mean for trading?",
      simple: "Salam Sukuk: subscribers pay the Salam price in advance and own the commodity on delivery (or its sale price in Parallel Salam). Bahrain (BMA, June 2001) issued three-month aluminium Salam securities with the government as selling agent. Secondary trading is so far impermissible (share in a Salam debt), though the author calls for further analysis. Istisna‘a Sukuk: tradable while funds are in assets; once the price is a debt owed by the buyer, trading only at face value. Murabaha receivables cannot be securitised as negotiable Sukuk — transfer at par under Hawalah — unless goods are still unsold or a mixed pool has more than 50% tangible assets (Hanafi: 10%). Arcapita's 2005 Murabaha Sukuk paid three-month LIBOR + 175 bps with full recourse to Arcapita.",
      academic: [
        "Salam: attractive to seller (early cash) and buyer (price below spot); the exception to selling without ownership is guarded by conditions against Gharar. If trading were allowed, the price would reflect commodity supply and demand.",
        "Istisna‘a: the deferred price may legitimately cover construction cost and profit, including the cost of tying up funds; holders may exchange certificates for goods at deferred prices, letting market forces operate.",
        "Government Murabaha Sukuk: certificates per instalment, transferable only without changing the claim amount; transfer with recourse at face value minus collection cost."
      ],
      exam: "Salam Sukuk: not tradable (debt) except at face value; BMA aluminium example. Istisna‘a: tradable while assets; debt → par. Murabaha: receivables not negotiable; par with recourse; mixed pool >50% tangible (Hanafi 10%). Arcapita LIBOR+175.",
      keyPoints: ["Debt certificates cannot have a secondary market except at par."],
      related: ["t10.8", "t10.11", "t15.3.6"],
      quickCheck: { q: "Istisna‘a Sukuk become tradable only at face value when:", options: ["Funds are still being used to buy materials", "The item is delivered and the price is a monetary debt owed by the buyer", "They are issued", "The manufacturer is a government"], answer: 1, explanation: "pp. 404–405." }
    },
    {
      id: "t15.3.5.d", section: "15.3.5", title: "Categories of Sukuk: Mixed Portfolio Sukuk — IDB Solidarity Trust", pages: [406, 407], tier: "core",
      concepts: ["sukuk", "mixed-portfolio"],
      intuition: "How can Murabaha and Istisna‘a receivables be included in tradable Sukuk?",
      simple: "Banks may securitise a pool of Musharakah, Ijarah and some Murabaha, Salam, Istisna‘a and Ju‘alah; risk/return depends on the mix. IDB's US$400 million Solidarity Trust Sukuk (2003): Solidarity Trust Services as trustee bought Ijarah, Murabaha and Istisna‘a assets originated by IDB (via ICD as intermediary/Wakil); Ijarah always over 50%; if Ijarah fell below 25%, a dissolution event triggers IDB's purchase undertaking; redemption at 100% of principal; IDB guarantees scheduled payments of underlying obligors, meets shortfalls and provides an interest-free liquidity facility; holders have no recourse if trust assets are exhausted.",
      academic: ["IDB's guarantee covers amounts payable by obligors of the underlying assets, not the certificates as such; the trust's ability to pay ultimately depends on IDB. Principal is reinvested in Ijarah and Musharakah. The structure suits investment banks and DFIs converting illiquid assets into negotiable instruments."],
      exam: "IDB 2003 $400m: Ijarah >50%; <25% → dissolution and IDB purchase; 100% principal redemption; IDB guarantee of obligor payments + shortfall + interest-free liquidity; no recourse beyond trust assets.",
      keyPoints: ["Guarantee is of underlying obligors' payments, not of the certificates per se."],
      steps: ["IDB originates Ijarah, Murabaha and Istisna‘a assets", "ICD buys trust assets from IDB and sells to the SPV/trustee", "Solidarity Trust Services issues trust certificates to investors", "ICD acts as Wakil managing the assets", "Distributions from trust assets to holders; IDB guarantees and buys back at maturity/dissolution"],
      related: ["t15.3.6", "t15.3.7"],
      quickCheck: { q: "In IDB's Solidarity Trust Sukuk, a dissolution event occurs if Ijarah assets fall below:", options: ["50%", "25%", "10%", "75%"], answer: 1, explanation: "p. 406." }
    },
    {
      id: "t15.3.6", section: "15.3.6", title: "Tradability of Sukuk (Box 15.3) and Prominent Issues (Box 15.4)", pages: [407, 409], tier: "core",
      concepts: ["sukuk", "tradability"],
      intuition: "One question decides tradability: does the Sukuk represent a debt or ownership?",
      simple: "Sukuk representing ownership of tangible assets or usufruct may trade at market prices; those representing debt obligations may not (except at face value). Box 15.3 (AAOIFI Standard 17) lists the rule for each type. Box 15.4 lists prominent issues — e.g. Qatar Global Ijarah $700m at LIBOR + 0.4%, Saxony-Anhalt €100m, IDB $400m, Sitara Rs.360m, Nakheel $3.52bn at LIBOR + 1.20%, Pakistan $600m at LIBOR + 2.20%.",
      academic: ["Tradability depends on the quality, risk and profitability of securitised assets."],
      exam: "Box 15.3: Mudarabah/Musharakah — market price after commencement; Ijarah freehold — market; Ijarah under head lease — market or agreed rate; future assets — after asset ascertained and leased; specified services — before sub-lease; future services — after source ascertained; Salam — face value only; Istisna‘a — if funds converted into assets, before sale to orderer; Murabaha — before sale or if receivables <50%, otherwise face value with recourse.",
      keyPoints: ["Debt → par only; ownership → market price."],
      table: {
        caption: "Box 15.3 — Tradability of Sukuk in the secondary market (AAOIFI)",
        head: ["Sukuk", "Tradability"],
        rows: [
          ["Mudarabah/Musharakah", "Market price after commencement of the activity"],
          ["Ijarah — freehold existing assets", "Market price"],
          ["Ijarah — existing assets subject to head lease", "Market price or rate agreed at redemption"],
          ["Ijarah — future tangible assets", "Market price only after asset ascertained and leased"],
          ["Existing specified services", "Tradable prior to sub-leasing"],
          ["Described future services", "Market price after source of service ascertained"],
          ["Salam Sukuk", "Not tradable except at face value"],
          ["Istisna‘a Sukuk", "Tradable if funds converted into assets and before sale to orderer"],
          ["Murabaha Sukuk (Mudarabah for Murabaha sales)", "Before sale of goods or if receivables <50%; otherwise face value with recourse"]
        ]
      },
      related: ["t12.6", "t15.3.5"],
      quickCheck: { q: "Per Box 15.3, Salam Sukuk are:", options: ["Tradable at market price", "Not tradable except at face value", "Tradable after delivery at discount", "Tradable only by central banks"], answer: 1, explanation: "p. 408." }
    },
    {
      id: "t15.3.7", section: "15.3.7", title: "Issues in Terms and Structures of Sukuk", pages: [409, 411], tier: "core",
      concepts: ["sukuk", "guarantee"],
      intuition: "If a Sukuk pays exactly LIBOR + 2% no matter what, who is really bearing risk?",
      simple: "The author identifies concerns: (1) conclusively pre-fixed returns in almost all Sukuk, sometimes without a third-party guarantee, though Murabaha defaults and Ijarah ownership costs make fully fixed returns impossible — especially doubtful where sovereigns guarantee; AAOIFI bars issuer compensation up to nominal value (except torts/negligence) and fixed profit guarantees, while an independent third party may guarantee free of charge. (2) Many interdependent contracts (about six in sale and lease-back Ijarah Sukuk) and sequencing. (3) Lack of transparency in documentation and parties' rights. (4) Over-reliance on Ijarah Sukuk; Shirkah-based and mixed Sukuk under-used.",
      academic: [
        "Banks can give part of their own Mudarib share to depositors only within a pre-agreed ratio; in Sukuk even this is not possible — SPVs must distribute net proceeds.",
        "The lessor may assure lessee performance (IDB); Murabaha SPVs may have recourse to originators; scholars should clarify the limits, especially for future leased assets.",
        "AAOIFI: prospectus must disclose all conditions, rights, obligations and the party covering loss; Shari’ah boards should monitor implementation, profit distribution, trading and redemption.",
        "Exceptions to Ijarah reliance: Bahrain's Salam Sukuk and Sudan's Shirkah certificates."
      ],
      exam: "Four issues: fixed returns/guarantees; interdependent contracts (~6 agreements); transparency; over-reliance on Ijarah. AAOIFI: no issuer guarantee of nominal value or fixed profit; independent third-party free guarantee allowed.",
      keyPoints: ["The author's concerns are presented as his analysis of structures."],
      debate: [{
        issue: "Can Sukuk legitimately promise a fixed, guaranteed return?",
        criticism: "Most Sukuk are marketed as fixed-income like bonds, often with issuer or sovereign guarantees, though Ijarah and Murabaha returns are exposed to default and ownership costs.",
        response: "Rentals are contractual obligations of the lessee; an independent third party may guarantee without charge; lessors may assure lessee performance.",
        alternative: "Educate the public on each mode's limits; ensure holders bear ownership risk; greater transparency; wider use of Shirkah-based and mixed Sukuk; Shari’ah board monitoring.",
        takeaway: "Returns should be quasi-fixed and asset-linked; issuer guarantees of capital or profit conflict with AAOIFI standards."
      }],
      related: ["t15.3.4", "t17.4.3"],
      quickCheck: { q: "According to AAOIFI's Sukuk Standard, who may guarantee Sukuk returns?", options: ["The issuer", "The Mudarib", "An independent third party, free of charge", "Nobody under any circumstances"], answer: 2, explanation: "pp. 409–410." }
    },
    {
      id: "t15.3.8", section: "15.3.8", title: "Potential of Sukuk in Fund Management and Capital Markets", pages: [411, 412], tier: "supporting",
      concepts: ["sukuk", "liquidity"],
      intuition: "What changed for Islamic bank treasuries once Sukuk became available?",
      simple: "Sukuk help mobilise resources, manage liquidity and funds, and can serve monetary policy and open-market operations (as in Sudan). Before Sukuk, IFIs relied on Tawarruq and metals-market Murabaha, not fully acceptable to scholars. Secondary trading has started (PCFC about $10 million a day; Nakheel active). About one-third of Muslim-majority investors seek compliant products and 50–60% more would use them if competitive (Ernst & Young). Around 40% of investors in the ADIB $800m and Nakheel issues were European. Growth needs regulation, compliance and convergence, professionals, investor education and knowledge sharing.",
      academic: ["Infrastructure needs in the Muslim world could be met through Sukuk without compromising Shari’ah principles."],
      exam: "Potential: liquidity/fund management, monetary policy, infrastructure; demand statistics; prerequisites: regulation, convergence, professionals, education.",
      keyPoints: ["Sukuk replaced questionable metals-market Murabaha placements."],
      related: ["t14.4.4", "t18.3.1"],
      quickCheck: { q: "Before Sukuk emerged, IFIs managed short-term funds mainly through:", options: ["Government T-bills", "Tawarruq and metals-market Murabaha", "Interbank interest", "Equity futures"], answer: 1, explanation: "p. 411." }
    },
    {
      id: "t15.4.cases", section: "15.4", title: "Case Studies: Nakheel, Pakistan Sovereign, WAPDA and Hanco (Boxes 15.5–15.8)", pages: [412, 415], tier: "detailed",
      concepts: ["sukuk", "ijarah"],
      intuition: "How were real sale-and-lease-back Sukuk structured?",
      simple: "Nakheel (Box 15.5): US$3.52bn (from 2.5bn), 3-year, sale and lease-back (convertible), LIBOR + 120 bps, listed on DIFX; investors 38% Middle East, 40% Europe; security: land mortgage, share pledge, Dubai World guarantee. Pakistan sovereign (Box 15.6, Jan 2005): SPV Pakistan International Sukuk Co bought M-2 motorway land from NHA and leased it to the government; US$600m at par, six-month LIBOR + 220 bps, B+ (S&P), orders $1.2bn; government repurchases at maturity. WAPDA (Box 15.7): WAPDA First Sukuk Co bought ten Mangla turbines and leased them back for seven years; PKR 8,000m at six-month KIBOR + 35 bps; government-guaranteed and SLR-eligible; WAPDA's unilateral purchase undertaking. Hanco (Box 15.8, Saudi Arabia): US$27.2m, 6%, three years, motor fleet, two-tier SPV/SPC offshore.",
      academic: ["These are sale-and-lease-back Ijarah structures in which the originator repurchases the asset at maturity to redeem the Sukuk."],
      exam: "Nakheel LIBOR+120, $3.52bn; Pakistan $600m LIBOR+220 (M-2 motorway); WAPDA PKR 8bn KIBOR+35 (Mangla turbines); Hanco $27.2m 6% (fleet).",
      keyPoints: ["Common pattern: SPV buys asset → leases back → rent → repurchase at maturity."],
      steps: ["SPV buys asset from originator (e.g. M-2 motorway land)", "SPV issues trust certificates to investors", "SPV leases asset to originator/government", "Rent distributed to Sukuk holders", "Originator repurchases asset at maturity; Sukuk redeemed"],
      related: ["t11.5.3", "t15.3.7"],
      quickCheck: { q: "What was the underlying asset in Pakistan's 2005 US$600m sovereign Ijarah Sukuk?", options: ["Mangla turbines", "M-2 motorway land", "A motor fleet", "Airport buildings"], answer: 1, explanation: "p. 413." }
    }
  ],
  summary: "Sukuk offer great potential for Islamic capital markets by letting many investors finance public and private projects, including infrastructure. They are certificates of undivided ownership in tangible assets, usufruct, services or project assets, created through securitisation via a bankruptcy-remote SPV; unlike bonds their returns derive from the underlying assets, and unlike shares they relate to specified assets for a set period. Depending on the second-leg mode, returns are variable (Shirkah) or quasi-fixed (Ijarah, Murabaha), becoming fixed only with an independent third-party guarantee. Tradability depends on whether a Sukuk represents ownership (market price) or debt (par only) — Box 15.3. Structures based on Bai‘ al ‘Inah or discounted Bai‘ al Dayn are rejected by the majority; sale and lease-back is acceptable when properly sequenced. The author warns about conclusively fixed returns and guarantees, interdependent contracts, poor transparency and over-reliance on Ijarah, urging Shirkah-based and mixed Sukuk, enabling laws, accounting standards, standardised contracts and a decisive role for Shari’ah scholars, with institutions such as LMC, IIFM and IIRA leading market development.",
  takeaways: [
    "AAOIFI: Sukuk = undivided ownership of assets, usufruct, services or project assets.",
    "Sukuk ≠ bonds (ownership, asset cash flows) ≠ shares (specified assets, fixed term).",
    "Ownership Sukuk trade at market price; debt Sukuk only at par.",
    "Ijarah Sukuk returns are quasi-fixed; holders bear ownership risk.",
    "‘Inah and Bai‘ al Dayn Sukuk are rejected by the majority and OIC Fiqh Council.",
    "Issuer may not guarantee capital or fixed profit; independent third party may, free.",
    "Mixed pools need >50% tangible assets (Hanafi: 10%).",
    "Case studies: IDB, Nakheel, Pakistan, WAPDA, Hanco."
  ],
  checklist: [
    "Can you define Sukuk and distinguish them from shares and bonds?",
    "Can you list the parties to a Sukuk issue and SPV features?",
    "Can you name AAOIFI's Sukuk types?",
    "Can you explain the ‘Inah/Bai‘ al Dayn criticism?",
    "Can you state tradability rules from Box 15.3?",
    "Can you explain Ijarah Sukuk and why returns are quasi-fixed?",
    "Can you describe IDB Solidarity Trust Sukuk features?",
    "Can you discuss the four structural issues raised by the author?"
  ],
  flashcards: [
    { id: "f15.1", cat: "Definitions", front: "Investment Sukuk (AAOIFI)", back: "Certificates of equal value representing undivided shares in ownership of tangible assets, usufruct, services, or assets of particular projects or a specified investment activity.", topic: "t15.3" },
    { id: "f15.2", cat: "Comparisons", front: "Sukuk vs bonds vs shares", back: "Bonds: interest-bearing debt. Shares: ownership of a whole company, indefinite. Sukuk: ownership of specified assets for a fixed period with returns from asset cash flows.", topic: "t15.3" },
    { id: "f15.3", cat: "Capital markets", front: "Hawalah vs sale of debt", back: "Debt may only be assigned at par with recourse (Hawalah); ordinary sale is without recourse.", topic: "t15.2" },
    { id: "f15.4", cat: "Capital markets", front: "SPV characteristics", back: "Separate legal entity; bankruptcy-remote; thin capitalisation; true sale; pass-through or pay-through payments.", topic: "t15.3.2" },
    { id: "f15.5", cat: "Prohibitions", front: "Non-compliant securitisation classes", back: "CDO/CLO and credit-card receivable securitisation unless subject to Hawalah rules.", topic: "t15.3.1" },
    { id: "f15.6", cat: "Exam facts", front: "AAOIFI Sukuk types", back: "Leased assets/usufruct/services; Salam; Istisna‘a; Murabaha; Musharakah (participation, Mudarabah, investment agency); Muzara‘ah; Musaqah; Mugharasah.", topic: "t15.3.4" },
    { id: "f15.7", cat: "Principles", front: "Criticism of Malaysian Islamic bonds", back: "Issued via Bai‘ al ‘Inah and Tabarru‘, traded via discounted Bai‘ al Dayn — rejected by majority and OIC Fiqh Council (Rosly & Sanusi).", topic: "t15.3.4" },
    { id: "f15.8", cat: "Capital markets", front: "Mudarabah Sukuk trading (OIC 1988)", back: "Cash capital → Sarf rules (par); debt → debt rules; mixed assets → market price by consent.", topic: "t15.3.5" },
    { id: "f15.9", cat: "Capital markets", front: "Ijarah Sukuk", back: "Pro rata ownership of leased assets; rent = return; holders bear ownership costs and destruction risk → quasi-fixed; tradable after ownership transfer.", topic: "t15.3.5.b" },
    { id: "f15.10", cat: "Capital markets", front: "Salam and Istisna‘a Sukuk tradability", back: "Salam: face value only (debt). Istisna‘a: tradable while funds are assets; once price is debt → face value.", topic: "t15.3.5.c" },
    { id: "f15.11", cat: "Capital markets", front: "Murabaha Sukuk", back: "Receivables not negotiable (par with recourse) unless goods unsold or mixed pool >50% tangible (Hanafi 10%).", topic: "t15.3.5.c" },
    { id: "f15.12", cat: "Exam facts", front: "IDB Solidarity Trust Sukuk 2003", back: "US$400m; Ijarah >50%; <25% triggers dissolution; IDB guarantee of obligor payments and purchase undertaking; 100% principal redemption.", topic: "t15.3.5.d" },
    { id: "f15.13", cat: "Risk", front: "Author's four concerns about Sukuk", back: "Conclusively fixed returns/guarantees; interdependent contracts; lack of transparency; over-reliance on Ijarah.", topic: "t15.3.7" },
    { id: "f15.14", cat: "Exam facts", front: "Pakistan sovereign Sukuk 2005", back: "US$600m, M-2 motorway land, sale and lease-back via Pakistan International Sukuk Co, 6-month LIBOR + 220 bps, B+.", topic: "t15.4.cases" },
    { id: "f15.15", cat: "Exam facts", front: "WAPDA Sukuk", back: "PKR 8bn; ten Mangla turbines; 7-year lease-back; 6-month KIBOR + 35 bps; government guarantee; SLR-eligible.", topic: "t15.4.cases" }
  ],
  questions: [
    { id: "q15.1", type: "mcq", q: "What distinguishes Sukuk from conventional bonds?", options: ["Sukuk have no maturity", "Sukuk returns come from cash flows of underlying assets owned by holders", "Sukuk pay guaranteed interest", "Sukuk are always equity"], answer: 1, explanation: "p. 392.", topic: "t15.3", diff: "E", level: "understanding", obj: "Distinguish Sukuk" },
    { id: "q15.2", type: "tf", q: "Salam Sukuk may be traded in the secondary market at any market price.", answer: false, explanation: "They represent a Salam debt — face value only (Box 15.3).", topic: "t15.3.6", diff: "E", level: "recall", obj: "Apply tradability" },
    { id: "q15.3", type: "scenario", q: "Newly issued Musharakah Sukuk have not yet deployed their cash into any project. A holder wants to sell at a premium. Allowed?", options: ["Yes, at any price", "No — while capital is money, trading is an exchange of money for money and must be at par", "Yes, if the issuer guarantees", "Only to the SPV"], answer: 1, explanation: "pp. 399–400; Box 15.3.", topic: "t15.3.5", diff: "M", level: "application", obj: "Apply trading rules" },
    { id: "q15.4", type: "multi", q: "Which issues does the author raise about current Sukuk structures? (Select all.)", options: ["Conclusively pre-fixed returns", "Interdependent contracts in one arrangement", "Too many Shirkah-based Sukuk", "Lack of transparency", "Over-reliance on Ijarah Sukuk"], answer: [0, 1, 3, 4], explanation: "pp. 409–411.", topic: "t15.3.7", diff: "M", level: "analysis", obj: "Evaluate structures" },
    { id: "q15.5", type: "match", q: "Match each Sukuk to its tradability rule (Box 15.3).", pairs: [["Ijarah — freehold existing assets", "Market price"], ["Salam Sukuk", "Face value only"], ["Istisna‘a Sukuk", "While funds are assets, before sale to orderer"], ["Mudarabah Sukuk", "Market price after commencement of activity"]], explanation: "p. 408.", topic: "t15.3.6", diff: "M", level: "understanding", obj: "Match rules" },
    { id: "q15.6", type: "identify", q: "A structure in which an asset is sold for cash and immediately bought back at a higher deferred price is:", options: ["Sale and lease-back", "Bai‘ al ‘Inah", "Tawarruq", "Istisna‘a"], answer: 1, explanation: "p. 396.", topic: "t15.3.4", diff: "E", level: "recall", obj: "Identify ‘Inah" },
    { id: "q15.7", type: "comparison", q: "Why are Musharakah Sukuk considered safer and more equitable than Mudarabah Sukuk?", options: ["They pay fixed returns", "The manager also shares loss and contributes capital as a cushion", "They are guaranteed by the issuer", "They cannot be traded"], answer: 1, explanation: "p. 400.", topic: "t15.3.5", diff: "M", level: "analysis", obj: "Compare Sukuk" },
    { id: "q15.8", type: "application", q: "A pool contains Ijarah assets 45%, Murabaha receivables 50% and cash 5%. Under the majority view, can its Sukuk trade at market price?", options: ["Yes", "No — tangible assets must exceed 50%", "Yes, if guaranteed", "Only under the Shafi‘i view"], answer: 1, explanation: "p. 405 (Hanafi view would allow with >10%). (Practice example — generated for learning.)", topic: "t15.3.5.c", diff: "M", level: "application", obj: "Apply pool rule" },
    { id: "q15.9", type: "order", q: "Order the typical sovereign Ijarah Sukuk (Box 15.6) steps.", items: ["SPV buys asset from government entity", "SPV issues trust certificates to investors", "Asset leased to the government", "Rentals distributed to holders", "Government repurchases asset; Sukuk redeemed"], explanation: "pp. 413–414.", topic: "t15.4.cases", diff: "M", level: "understanding", obj: "Sequence Ijarah Sukuk" },
    { id: "q15.10", type: "short", q: "Explain why most Ijarah Sukuk returns should be quasi-fixed rather than fixed.", answer: "As owners, Sukuk holders bear ownership-related expenses and the risk of destruction of the asset without lessee fault, and lessees may default; losses of cost of funds cannot be recovered. So although rent is contractually fixed or benchmarked, net returns can vary; only an independent third-party guarantee could make them fixed.", keywords: ["ownership", "expenses", "destruction", "default", "third party"], explanation: "pp. 402–403, 409–410.", topic: "t15.3.5.b", diff: "H", level: "analysis", obj: "Explain quasi-fixed return" },
    { id: "q15.11", type: "definition", q: "A pay-through structure in securitisation means:", options: ["Immediate remittance of collections", "Servicing of securities desynchronised from underlying cash flows", "A fixed coupon from the SPV's capital", "A guarantee"], answer: 1, explanation: "p. 395.", topic: "t15.3.2", diff: "M", level: "recall", obj: "Define structures" },
    { id: "q15.12", type: "mcq", q: "What triggers dissolution in the IDB Solidarity Trust Sukuk?", options: ["Ijarah assets exceed 50%", "Ijarah assets fall below 25%", "LIBOR rises", "A rating downgrade"], answer: 1, explanation: "p. 406.", topic: "t15.3.5.d", diff: "M", level: "recall", obj: "Recall IDB features" },
    { id: "q15.13", type: "tf", q: "Credit-card receivable securitisation is Shari’ah-compliant as ordinarily structured.", answer: false, explanation: "Not compliant unless subject to Hawalah rules (p. 394).", topic: "t15.3.1", diff: "M", level: "understanding", obj: "Evaluate classes" }
  ],
  exam: [
    { id: "e15.1", kind: "long", q: "Discuss the categories of Sukuk and the Shari’ah rules on their tradability.", structure: ["Definition and ownership principle", "Mudarabah and Musharakah Sukuk", "Ijarah Sukuk (types)", "Salam, Istisna‘a and Murabaha Sukuk", "Mixed portfolio (IDB)", "Box 15.3 tradability", "Debt vs ownership test"], keyConcepts: ["undivided ownership", "Bai‘ al Sarf", "Hawalah", "50% rule"], points: ["Ownership → market price; debt → par"], mistakes: ["Allowing discounted trading of debt Sukuk"], topic: "t15.3.6" },
    { id: "e15.2", kind: "short", q: "Critically evaluate Sukuk structured on Bai‘ al ‘Inah and traded through Bai‘ al Dayn.", structure: ["Explain ‘Inah and Tabarru‘ structures", "Bai‘ al Dayn at discount", "Juristic views (majority, Shafi‘i, Malaysian)", "OIC Fiqh Council", "Rosly and Sanusi", "Alternatives: sale and lease-back"], keyConcepts: ["‘Inah", "Bai‘ al Dayn", "Niyyah"], points: ["Shafi‘is allowed debt sale only at par"], mistakes: ["Treating sale and lease-back as ‘Inah"], topic: "t15.3.4" },
    { id: "e15.3", kind: "conceptual", q: "Are Sukuk simply Islamic bonds? Discuss with reference to returns, guarantees and structures.", structure: ["Sukuk vs bonds", "VRS vs FRS", "Quasi-fixed returns", "Guarantee rules (AAOIFI)", "Author's four concerns", "Potential"], keyConcepts: ["quasi-fixed", "third-party guarantee"], points: ["Sovereign guarantees raise doubts"], mistakes: ["Calling Sukuk risk-free"], topic: "t15.3.7" },
    { id: "e15.4", kind: "scenario", q: "Advise a government wishing to issue Sukuk to finance a highway.", structure: ["Asset availability", "SPV and true sale", "Ijarah structure and rent benchmark", "Repurchase undertaking and timing", "Pakistan case", "Shari’ah board and transparency"], keyConcepts: ["sale and lease-back", "SPV"], points: ["Government must have durable assets"], mistakes: ["Issuer guaranteeing fixed return"], topic: "t15.4.cases" },
    { id: "e15.5", kind: "viva", q: "Who are the parties to a Sukuk issue?", structure: ["Originator", "SPV", "Investment banks", "Subscribers", "Supporting parties"], keyConcepts: ["servicer", "custodian"], points: ["SPV is bankruptcy-remote"], mistakes: ["Confusing originator and SPV"], topic: "t15.3.1" }
  ]
});
