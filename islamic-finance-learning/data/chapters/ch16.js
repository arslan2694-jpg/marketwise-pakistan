/* Chapter 16 — Takaful: An Alternative to Conventional Insurance. Source pp. 417–432. */
IFL_DATA.registerChapter({
  number: 16,
  title: "Takaful: An Alternative to Conventional Insurance",
  part: "part-iii",
  pages: [417, 432],
  minutes: 55,
  difficulty: "Intermediate",
  objectives: [
    "Explain the need for risk cover in Islam and why conventional insurance is considered prohibited (Riba, Gharar, Qimar/Maisir).",
    "Explain the Shari’ah basis of Takaful: ‘Aqilah, Tabarru‘, Waqf and mutual help.",
    "Describe how Takaful works for family and general Takaful.",
    "Compare the Wakalah, Mudarabah, Wakalah–Mudarabah and Waqf/Wakalah–Waqf models and their Shari’ah issues.",
    "Compare Takaful with conventional insurance.",
    "Assess the status, potential and challenges of the Takaful industry."
  ],
  why: "Takaful completes the Islamic finance cycle — Ijarah assets, housing finance and trade all need cover. Exams ask why insurance is prohibited, how Takaful differs, and which operating model is closest to Shari’ah and why.",
  overview: "The chapter argues that seeking protection against risk is consistent with Islam, identifies Riba, Gharar and gambling as the reasons conventional insurance is prohibited, and grounds Takaful in ‘Aqilah, Tabarru‘ and Waqf. It explains how Takaful funds work, evaluates operating models (the author's preferred convergence is the Wakalah–Waqf model), compares Takaful with insurance, and reviews the industry's status, potential and challenges, with an appendix of Fatawa.",
  summarySection: null,
  topics: [
    {
      id: "t16.1", section: "16.1", title: "Introduction", pages: [417, 417], tier: "supporting",
      concepts: ["takaful"],
      intuition: "Why did Islamic banks need Takaful?",
      simple: "Insurance mitigates risks for businesses and individuals, and financial institutions need cover. When Islamic banking began in the 1970s, it needed an alternative to conventional insurance, which involves Riba, Gharar and gambling. Takaful was developed to fill this gap. The chapter introduces main features rather than technical details.",
      academic: ["Bankers are mostly not involved in Takaful business; the chapter aims to introduce the Shari’ah-compliant system."],
      exam: "Takaful developed as a Shari’ah-compliant alternative to insurance (Riba, Gharar, gambling) to complete Islamic finance.",
      keyPoints: ["Insurance = life and general (marine, fire, accident)."],
      related: ["t16.2"],
      quickCheck: { q: "Which elements make conventional insurance objectionable, per Chapter 16?", options: ["Riba, Gharar and gambling", "Only taxes", "Only high premiums", "Agents' commissions"], answer: 0, explanation: "p. 417." }
    },
    {
      id: "t16.2", section: "16.2", title: "The Need for Takaful Cover", pages: [417, 418], tier: "core",
      concepts: ["takaful", "tawakkul"],
      intuition: "Does buying cover contradict trust in Allah?",
      simple: "Muslim societies avoided commercial insurance for two reasons: a belief that mutual help and trust in destiny make it unnecessary, and the prohibitions of Riba, Gharar and gambling (plus insurers' investment in forbidden businesses). The author regards the second as genuine and the first as a myth: Islam requires reasonable precautions — ‘Tie your camel first, then put your trust in Allah’ — and Shari’ah intends ease (Qur’an 2:185; 4:28). Islamic insurance began only in 1979, largely in response to IFIs' needs.",
      academic: ["Insurance is mostly conducted by NBFIs; banks are generally not allowed to do insurance but need it as a regulatory and business requirement. Takaful also benefits individuals who avoided insurance on religious grounds. The rule of necessity supports developing a compliant scheme."],
      exam: "Two reasons for avoiding insurance — belief (myth, per author) and prohibitions (genuine). Hadith: tie your camel. Qur’an 2:185, 4:28. Takaful from 1979.",
      keyPoints: ["Author's view: seeking cover is not against Tawakkul."],
      debate: [{
        issue: "Is seeking insurance cover contrary to trust in Allah and destiny?",
        criticism: "Many believe true faith and mutual help make cover unnecessary and that insuring questions Allah's decree.",
        response: "The author calls this a myth: Islam directs believers to avoid catastrophe where possible and to lighten burdens; the Prophet said ‘Tie your camel first, then put your trust in Allah’; Shari’ah intends ease.",
        alternative: "Seek cover through a scheme free of Riba, Gharar and gambling — Takaful.",
        takeaway: "The objection lies in insurance's contract elements, not in seeking protection itself."
      }],
      related: ["t16.2.1", "t2.3"],
      quickCheck: { q: "Which hadith does the author cite to show that precaution is consistent with Tawakkul?", options: ["‘Leave your offspring wealthy’", "‘Tie your camel first, then put your trust in Allah’", "‘Muslims are bound by their conditions’", "‘Earnings are concomitant with risk’"], answer: 1, explanation: "p. 418." }
    },
    {
      id: "t16.2.1", section: "16.2.1", title: "Why Conventional Insurance is Prohibited", pages: [418, 420], tier: "core",
      concepts: ["riba", "gharar", "maisir"],
      intuition: "Where exactly do Riba, Gharar and gambling appear in a premium-for-claim contract?",
      simple: "An overwhelming majority of scholars hold commercial insurance unlawful because of Riba (directly — premium vs sum insured; indirectly — investment in interest), Qimar and Maisir (one side gains at the other's loss; gains from chance), Gharar/Khatar (contingent rights and liabilities in a commutative contract) and invalid transfer of risk from insured to insurer. The insurer owns an underwriting surplus or bears an underwriting loss — a money stake. Premiums are lost if no claim occurs or if a life policy is cancelled early.",
      academic: [
        "History: marine insurance began around the end of the 12th century and became formal in the 17th; Ibn Abdin (19th century) first discussed it in detail and did not approve it.",
        "Differences of opinion arose because early jurists were not given full technical background and there is no direct textual reference; as knowledge grew, the majority concluded it is unlawful.",
        "Khatar: stipulating transfer of property or profit on an uncertain event where commercial benefit is on both sides — liabilities contingent, delivery not controlled, payment uncertain. Qimar: one party's profit depends on the other's loss. Maisir: gains from chance and speculation rather than work or responsibility.",
        "Gharar is prohibited in commutative contracts, and insurance is commutative, so uncertainty invalidates it. Legal requirements (e.g. insured Ijarah assets), client demands and housing finance needs made an alternative urgent."
      ],
      exam: "Prohibited because of Riba (direct/indirect), Gharar/Khatar, Qimar/Maisir, invalid risk transfer; commutative contract; UWS/UWL owned by insurer. Ibn Abdin first jurist to discuss insurance.",
      keyPoints: ["Gharar vitiates commutative contracts; Takaful converts the contract to donation-based cooperation."],
      definitions: [
        { term: "Underwriting surplus (UWS)", meaning: "Premiums remaining after payment of claims." },
        { term: "Underwriting loss (UWL)", meaning: "Claims paid in excess of premiums received." },
        { term: "Qimar", meaning: "A deal in which one party's profit depends on the other's loss." }
      ],
      related: ["t3.2", "t4.4", "t16.5"],
      quickCheck: { q: "Indirect Riba in conventional insurance arises from:", options: ["Paying claims", "Investment of funds in interest-based businesses", "Agents' fees", "Policy documents"], answer: 1, explanation: "p. 419." }
    },
    {
      id: "t16.3", section: "16.3", title: "The Shari’ah Basis of Takaful", pages: [420, 421], tier: "core",
      concepts: ["takaful", "tabarru", "waqf", "aqilah"],
      intuition: "How can a ‘premium’ become a gift?",
      simple: "Ta’mein (reassurance, guarantee) gave way to Takaful — a contributory arrangement where members' losses are covered from a pool through mutual help. Shaikh Abu Zahra held cooperative and social insurance legitimate and non-cooperative insurance unacceptable; the OIC Fiqh Council approved cooperative Takaful in 1985. Foundations: ‘Aqilah (kinsmen sharing blood money), Qasamah and Mawalat; early Muslim traders' mutual funds for voyage losses. Tabarru‘ (donation) removes Gharar; Waqf (endowment) lets donors also benefit. Surplus/deficit belongs to members; the operator earns a fee and/or share of investment profit.",
      academic: [
        "Participants relinquish, as Tabarru‘, all or part of their contributions to help fellow participants who suffer a defined loss.",
        "Waqf: retention of property for charitable or specified beneficiaries; a separate entity; cannot be sold; usufruct assigned; a donor can benefit. In Takaful, beneficiaries are the Waqf creator and contributing members.",
        "Losses of the unfortunate few are shared by contributions of the fortunate many exposed to the same risk; the manager/trustee pays claims and invests compliantly."
      ],
      exam: "Takaful basis: mutual help, ‘Aqilah, Tabarru‘, Waqf; Abu Zahra; OIC Fiqh Council 1985. UWS/UWL to members; operator fee/investment profit share.",
      keyPoints: ["Investment profit ≠ underwriting surplus."],
      definitions: [
        { term: "Takaful", meaning: "Cooperative risk-sharing in which participants donate (Tabarru‘) contributions to a pool that compensates members for defined losses." },
        { term: "Tabarru‘", meaning: "Donation; the contribution a participant relinquishes to help fellow participants." },
        { term: "‘Aqilah", meaning: "Kinsmen's shared responsibility for blood money — a precedent for Takaful approved by the Prophet (pbuh)." },
        { term: "Waqf", meaning: "Endowment: property retained for beneficiaries, a separate entity whose corpus cannot be sold; used as the basis of a Takaful fund." }
      ],
      related: ["t16.3.1", "t16.4.1"],
      quickCheck: { q: "In which year did the OIC Islamic Fiqh Council approve cooperative Takaful?", options: ["1979", "1985", "1995", "2000"], answer: 1, explanation: "p. 420." }
    },
    {
      id: "t16.3.1", section: "16.3.1", title: "Main Objective of the Takaful System", pages: [422, 422], tier: "supporting",
      concepts: ["takaful"],
      intuition: "Is family Takaful the same as ‘insuring your life’?",
      simple: "From the participants' view the objective is mutual help, not profit or windfall gains. Operators may earn fees or profit shares as a business, and participants share realised profit after covering members' losses. Family Takaful is not against piety — it provides for dependants, in line with the Hadith ‘It is better to leave your offspring wealthy than poor’ and the Prophet's praise of those who look after widows and the poor.",
      academic: ["Common pools of Muslim traders to compensate robbery or misfortune on journeys illustrate mutual protection; Takaful may be conducted as a business with compliance, transparency and fairness."],
      exam: "Objective: mutual help (Tabarru‘) not profit; family Takaful supports dependants (Hadith on leaving offspring wealthy).",
      keyPoints: ["Business operation is acceptable if compliant and fair."],
      related: ["t16.3"],
      quickCheck: { q: "The main objective of Takaful from participants' view is:", options: ["Windfall gains", "Mutual help", "Tax savings", "Speculation"], answer: 1, explanation: "p. 422." }
    },
    {
      id: "t16.4", section: "16.4", title: "How the Takaful System Works", pages: [422, 423], tier: "core",
      concepts: ["takaful", "family-takaful", "retakaful"],
      intuition: "Where does each rupee of a family Takaful contribution go?",
      simple: "The operator acts as Wakil or Mudarib. Claims are paid from the Takaful fund; the underwriting surplus/deficit belongs to participants. Family Takaful contributions are split into a protection part (donation to the fund/Waqf) and an investment part (Mudarabah, individually owned, returned with profit); under Wakalah there is also a management-fee part. In general Takaful the whole contribution is a donation. The company gives Qard al Hasan if claims exceed fund and reserves. Re-Takaful follows the same bases.",
      academic: [
        "Is Tabarru‘ the same as Sadaqah? Not necessarily: Mudarabah-model operators see the fund as a separate entity where the protection part is conditional on claims and surplus may be returned; in the Waqf model, donors relinquish ownership but, unlike Sadaqah, can benefit as beneficiaries — hence the Waqf model is preferred.",
        "Early operators did not distinguish UWS from investment profit; scholars now hold the entire UWS/UWL belongs to participants, with the operator taking a fee and/or share of investment profit."
      ],
      exam: "Family Takaful: protection (donation) + investment (Mudarabah) [+ fee under Wakalah]. General: whole contribution donation. Qard al Hasan for deficits. UWS/UWL to participants; operator: fee/investment profit share.",
      keyPoints: ["Waqf model preferred because donors can still benefit."],
      related: ["t16.4.1"],
      quickCheck: { q: "In general Takaful, the participant's contribution is:", options: ["Split into savings and protection", "Wholly a donation for protection", "A loan to the company", "A deposit returned with interest"], answer: 1, explanation: "p. 422–423." }
    },
    {
      id: "t16.4.1", section: "16.4.1", title: "Models of Takaful (Box 16.1)", pages: [423, 426], tier: "core",
      concepts: ["takaful", "wakalah", "mudarabah", "waqf"],
      intuition: "Which model keeps the operator from being a risk-taker?",
      simple: "Pure Wakalah (Middle East): operator is agent for a fee (e.g. 30% of donations); UWS/UWL and investment profit belong to participants; the operator may get a performance share of UWS but never bears UWL — scholars have reservations about equity. Pure Mudarabah (Asia–Pacific): profit (investment return plus UWS) shared, e.g. 50:50 — serious objections since Tabarru‘ cannot be Mudarabah capital and the operator takes UWS without bearing UWL. Wakalah–Mudarabah: fee plus shares of UWS and investment profit — structural problems. Waqf / Wakalah–Waqf: shareholders create a Waqf fund with an initial donation; contributions go partly to the fund (donation) and partly to investment; UWS/UWL belong to the fund; Mudarabah between fund and company for investments. Research by over forty scholars led by Mufti Taqi Usmani favours Waqf or Wakalah–Waqf.",
      academic: [
        "Wakalah fee fixed annually in advance with the Shari’ah committee; operator provides Qard al Hasan for deficits.",
        "Mudarabah model: sharing ratio approved annually; most expenses charged to shareholders.",
        "Waqf model: multiple funds for classes of business; operational costs (re-Takaful, claims) from the fund; no obligation to distribute surplus; rules on fees, profit, reserves and compensation set beforehand; investment part redeemed on NAV basis.",
        "Box 16.1 (Wakalah with Waqf): shareholders create the Waqf; participants donate; company takes 25–30% as management fee (bearing management expenses), 70–75% invested; claims and re-Takaful from the fund; UWS/UWL to participants as a group; Mudarabah profit split 40% company : 60% fund (example ratio). Company income: Waqf management fee, Mudarib share or agency charge, and profit on shareholders' funds; the fund may keep a contingency reserve."
      ],
      exam: "Models: Wakalah (fee; UWS/UWL to participants; operator performance share questioned), Mudarabah (UWS shared, operator not bearing UWL — objectionable), Wakalah–Mudarabah (structural issues), Waqf/Wakalah–Waqf (preferred; Usmani-led research). Box 16.1: 25–30% fee; 70–75% invested; Mudarabah 40:60.",
      keyPoints: ["Operator should not be a risk-taker.", "Qard al Hasan covers fund deficits."],
      table: {
        caption: "Takaful models compared (Section 16.4.1)",
        head: ["Model", "Operator's income", "UWS/UWL", "Main Shari’ah concern"],
        rows: [
          ["Wakalah", "Fixed % fee (+ performance share of UWS)", "Participants", "Operator shares surplus but not deficit — inequitable"],
          ["Mudarabah", "Share of investment profit and UWS", "Shared surplus; operator bears no UWL", "Tabarru‘ cannot be Mudarabah capital; operator a risk-taker"],
          ["Wakalah–Mudarabah", "Fee + share of UWS and investment profit", "Shared surplus", "Mudarib cannot also charge expenses; no UWL borne"],
          ["Waqf / Wakalah–Waqf", "Management fee + Mudarib share of investment profit", "Belongs to the Waqf fund/participants", "Preferred — conforms to Tabarru‘"]
        ]
      },
      calc: { type: "takaful-waqf", note: "Reproduces Box 16.1's illustrative split: enter total donations, claims and investment return; shows the 25–30% operator fee, the invested portion, the fund's underwriting result and the 60:40 Mudarabah profit split. Other ratios are practice inputs." },
      related: ["t16.4.2", "t16.4.3", "t13.2.2"],
      quickCheck: { q: "Which model did research by over forty scholars under Mufti Taqi Usmani favour?", options: ["Pure Mudarabah", "Waqf or Wakalah–Waqf", "Conventional mutual", "Wakalah–Mudarabah"], answer: 1, explanation: "p. 423." }
    },
    {
      id: "t16.4.2", section: "16.4.2", title: "Issues in the Mudarabah Model", pages: [426, 426], tier: "core",
      concepts: ["takaful", "mudarabah"],
      intuition: "Why is Mudarabah good for deposits but bad for insurance?",
      simple: "Four objections: (1) participants' relationship should rest on Tabarru‘, not Mudarabah — a donation cannot simultaneously be Mudarabah capital; (2) sharing UWS makes Takaful like insurance, and worse, since operators take UWS but bear no UWL — the operator becomes a risk-taker; (3) Mudarabah capital must be returned with profit or reduced by loss, whereas non-life contributions are not returned; (4) Qard al Hasan from the operator contradicts Mudarabah, and a Mudarib cannot guarantee the financier.",
      academic: ["Some operators charge management expenses to the Takaful fund — against Mudarabah rules — and take a performance share of UWS."],
      exam: "Mudarabah model issues: donation ≠ capital; operator takes UWS without UWL; capital not returned in non-life; Qard/guarantee inconsistent; expenses charged to fund.",
      keyPoints: ["An operator should not be a risk-taker."],
      related: ["t16.4.1", "t12.4"],
      quickCheck: { q: "Why is a donation (Tabarru‘) problematic as Mudarabah capital?", options: ["It is too small", "Donated funds cannot simultaneously be capital to be returned with profit", "It is taxed", "Only banks can donate"], answer: 1, explanation: "p. 426." }
    },
    {
      id: "t16.4.3", section: "16.4.3", title: "Issues in Wakalah and Wakalah–Mudarabah Models", pages: [426, 426], tier: "supporting",
      concepts: ["takaful", "wakalah"],
      intuition: "How should pricing and surplus sharing work fairly?",
      simple: "Wakalah combined with Shirkah (giving shareholders part of UWS as performance incentive) faces the same objections as Mudarabah — surplus should be shared among pool members. The risk premium should be defined separately, related to risk and the same for similar risks regardless of client; for large clients reduce the operator's fee, not the risk premium; initial set-up expenses should be borne by shareholders.",
      academic: ["Most Middle Eastern Takaful companies give part of UWS to shareholders."],
      exam: "Wakalah–Shirkah issues: UWS to operator; risk premium separate and uniform; discount fees not risk premium; set-up costs on shareholders.",
      keyPoints: ["Surplus sharing belongs to pool members."],
      related: ["t16.4.1"],
      quickCheck: { q: "For a large client, what should a Takaful operator reduce?", options: ["The risk premium rate", "The operator's fee", "Claims payable", "The Waqf corpus"], answer: 1, explanation: "p. 426." }
    },
    {
      id: "t16.5", section: "16.5", title: "Takaful and Conventional Insurance Compared", pages: [427, 428], tier: "core",
      concepts: ["takaful", "insurance"],
      intuition: "Where does the surplus go — and what does that do to pricing?",
      simple: "Conventional insurance transfers risk to the company and involves Riba, Gharar and gambling; Takaful participants donate to a fund that bears losses and share UWS/UWL, with remaining uncertainty inside the group, cushioned by reserves and shareholder Qard al Hasan. Conventional premiums are profit-driven; Takaful premiums aim at adequacy. Surplus returns to participants, countering overpricing. Life policies: conventional rests on Riba and nominees; family Takaful on Waqf, Tabarru‘ and Mudarabah, with benefits to heirs by inheritance and wills; agents paid by the company. Investments: Takaful only Shari’ah-compliant.",
      academic: [
        "Losses are absorbed first by reserves, then interest-free loans from shareholders, then general price increases.",
        "Family Takaful payouts: on death before maturity — investment part with profit, amount from the Takaful fund and discretionary company donation; on survival — investment part with profit, pro rata share in UWS and bonus; on early termination — investment part with profit and reduced share of UWS, but no fund assistance."
      ],
      exam: "Compare: risk transfer vs mutual sharing; premium profit-driven vs adequacy; UWS to company vs participants; life: nominee/interest vs heirs/Waqf-Mudarabah; investments: any vs compliant only.",
      keyPoints: ["Built-in check against overpricing."],
      table: {
        caption: "Takaful vs conventional insurance (Section 16.5)",
        head: ["Aspect", "Conventional insurance", "Takaful"],
        rows: [
          ["Basis", "Commutative sale of cover; risk transferred to insurer", "Tabarru‘/Waqf; mutual risk-sharing among participants"],
          ["Prohibited elements", "Riba, Gharar, gambling", "Avoided"],
          ["Underwriting surplus/loss", "Belongs to insurer", "Belongs to participants/fund"],
          ["Premium setting", "Profit maximisation", "Adequacy, equity and ethics"],
          ["Deficits", "Insurer's loss", "Reserves → shareholder Qard al Hasan → pricing"],
          ["Life policies", "Riba-based; nominee receives sum assured", "Waqf, Tabarru‘, Mudarabah; heirs per inheritance rules"],
          ["Agents", "Paid from premiums", "Paid by the company"],
          ["Investments", "Including interest-based avenues", "Shari’ah-compliant only"]
        ]
      },
      related: ["t16.2.1", "t16.4"],
      quickCheck: { q: "In family Takaful, the insurable interest on death vests in:", options: ["A nominee of choice irrespective of Shari’ah", "The assured's heirs according to inheritance and wills", "The company", "The agent"], answer: 1, explanation: "p. 427." }
    },
    {
      id: "t16.6", section: "16.6", title: "Status and Potential of the Takaful Industry", pages: [428, 429], tier: "supporting",
      concepts: ["takaful"],
      intuition: "Why has Takaful lagged behind Islamic banking?",
      simple: "First company: Islamic Insurance Company of Sudan (1979); Malaysia from 1984. Growth 10–20% p.a. vs about 5% for global insurance; over 60 companies in 24 countries; re-Takaful in Malaysia, Bahrain, Saudi Arabia and UAE. It has lagged banking because of the huge investment needed and required regulatory changes. Potential: low insurance density and penetration in Muslim countries, growth of Ijarah and home finance, motor, health and family needs. Islamic banks might jointly establish well-capitalised Takaful companies.",
      academic: ["Only a few companies offer comprehensive family Takaful (e.g. Bank Aljazira's Takaful Ta‘awani); awareness, particularly of family Takaful, is key."],
      exam: "1979 Sudan; 1984 Malaysia; growth 10–20%; >60 companies, 24 countries; lag reasons: investment, regulation; potential: low density/penetration, Ijarah and housing.",
      keyPoints: ["Insurance density = premiums per capita; penetration = premiums/GDP."],
      related: ["t16.7", "t18.3.1"],
      quickCheck: { q: "The first Takaful company was established in:", options: ["Malaysia, 1984", "Sudan, 1979", "Saudi Arabia, 1990", "Bahrain, 1975"], answer: 1, explanation: "p. 428." }
    },
    {
      id: "t16.7", section: "16.7", title: "Takaful Challenges", pages: [429, 430], tier: "core",
      concepts: ["takaful"],
      intuition: "What must change for Takaful to reach its potential?",
      simple: "Challenges: incorporating Waqf; adequate capitalisation (family Takaful absorbs cash in early years); human resources and training; re-Takaful availability (few providers, mostly Mudarabah-based, which is objectionable); compliant investment avenues; standardisation and harmonisation (AAOIFI, IFSB) with convergence on the Wakalah–Waqf model; legal and regulatory frameworks; competitiveness; and above all public awareness. Every company needs a Shari’ah board/advisor and periodic Shari’ah audit.",
      academic: ["Composite (general) business offers early cash flow; family Takaful's real potential needs a strong capital base. Regulators should allow flexibility while applying benchmarks such as CAMELS."],
      exam: "Challenges: awareness (biggest), Waqf adoption, capital, HR/training, re-Takaful, investments, standardisation (Wakalah–Waqf convergence), regulation, competition, Shari’ah governance.",
      keyPoints: ["Most important challenge: awareness."],
      related: ["t16.4.1", "t18.3.3"],
      quickCheck: { q: "What does the chapter call the most important challenge for Takaful?", options: ["Tax rates", "Creating awareness of the concept", "Too many companies", "Excess capital"], answer: 1, explanation: "p. 429." }
    },
    {
      id: "t16.appx", section: "Appendix", title: "Appendix: Fatawa on Insurance", pages: [430, 431], tier: "revision",
      concepts: ["takaful", "fatwa"],
      intuition: "How have juristic bodies ruled on insurance over the last century?",
      simple: "The appendix lists Fatawa: against life/conventional insurance — Shaikh al-Azhar (1995), Makkah judicial conference (1398 AH), Morocco seminar (1972), Egypt Supreme Court (1926), Malaysia National Religious Council (1972), Cairo Muslim League conference (1965), and several Malaysian states; in favour — Mohammad Abduh (1900–01) and Mohd Baqit (1906); in favour of an Islamic model — Saudi Higher Council of Ulama (1397 AH), Muslim World League Fiqh Council (1398 AH), OIC Fiqh Council (1405 AH) and the First International Conference on Islamic Economy (1396 AH).",
      academic: ["The pattern shows opposition to conventional insurance and acceptance of an Islamic cooperative model."],
      exam: "Fatawa: majority against conventional insurance; OIC Fiqh Council (1405 AH), Saudi Ulama and MWL favour Islamic models.",
      keyPoints: ["Abduh's early Fatawa favoured insurance."],
      related: ["t16.3"],
      quickCheck: { q: "Which body's Fatwa (1405 AH) favoured insurance under an Islamic model?", options: ["Egypt Supreme Court", "OIC Fiqh Council", "Makkah judicial conference", "Selangor State"], answer: 1, explanation: "p. 431." }
    }
  ],
  summary: "Seeking protection against misfortune is consistent with Islam — the Prophet told the Bedouin to tie his camel first — but conventional insurance is held unlawful by the overwhelming majority of scholars because of Riba, Gharar/Khatar, Qimar and Maisir and the invalid transfer of risk in a commutative contract. Takaful replaces it with cooperative risk-sharing grounded in ‘Aqilah, Tabarru‘ and Waqf: participants donate to a fund that compensates defined losses; the underwriting surplus or deficit belongs to participants; the operator earns a Wakalah fee and/or a Mudarib share of investment profit and provides Qard al Hasan for deficits. Family Takaful splits contributions into protection and investment parts; general Takaful treats the whole contribution as a donation. The Mudarabah model and surplus-sharing variants are criticised for making the operator a risk-taker; research led by Mufti Taqi Usmani favours the Waqf or Wakalah–Waqf model. The industry has grown fast since 1979 but lags banking; its challenges are awareness, capital, people, re-Takaful, investments, standardisation, regulation and Shari’ah governance. (Chapter synthesis — the chapter has no separate summary section.)",
  takeaways: [
    "Precaution is consistent with Tawakkul: ‘Tie your camel’.",
    "Insurance is prohibited for Riba, Gharar, Qimar/Maisir.",
    "Takaful = Tabarru‘ + mutual help; UWS/UWL to participants.",
    "Waqf lets donors benefit — preferred basis.",
    "Mudarabah model: operator takes surplus without bearing deficit — objectionable.",
    "Box 16.1: 25–30% fee, 70–75% invested, 40:60 Mudarabah split (example).",
    "Family Takaful benefits go to heirs by inheritance rules.",
    "Biggest challenge: awareness."
  ],
  checklist: [
    "Can you rebut the ‘insurance contradicts Tawakkul’ argument?",
    "Can you explain Riba, Gharar and Maisir in insurance?",
    "Can you explain ‘Aqilah, Tabarru‘ and Waqf as bases?",
    "Can you describe family vs general Takaful contributions?",
    "Can you compare the four Takaful models?",
    "Can you explain Box 16.1?",
    "Can you tabulate Takaful vs insurance?",
    "Can you list Takaful challenges?"
  ],
  flashcards: [
    { id: "f16.1", cat: "Definitions", front: "Takaful", back: "Cooperative risk-sharing: participants donate (Tabarru‘) to a fund that compensates members' defined losses; surplus/deficit belongs to participants.", topic: "t16.3" },
    { id: "f16.2", cat: "Prohibitions", front: "Why conventional insurance is prohibited", back: "Riba (direct and indirect), Gharar/Khatar, Qimar and Maisir, and invalid transfer of risk in a commutative contract.", topic: "t16.2.1" },
    { id: "f16.3", cat: "Principles", front: "Precaution and Tawakkul", back: "‘Tie your camel first, then put your trust in Allah’ — seeking protection is not against faith.", topic: "t16.2" },
    { id: "f16.4", cat: "Arabic terminology", front: "‘Aqilah", back: "Kinsmen's shared responsibility for blood money, approved by the Prophet (pbuh) — foundation of Takaful.", topic: "t16.3" },
    { id: "f16.5", cat: "Arabic terminology", front: "Tabarru‘", back: "Donation: participant relinquishes contributions to help fellow participants; removes Gharar.", topic: "t16.3" },
    { id: "f16.6", cat: "Principles", front: "Why the Waqf model is preferred", back: "Donors relinquish ownership yet, unlike Sadaqah, can benefit as Waqf beneficiaries; fits Tabarru‘; favoured by Usmani-led research.", topic: "t16.4" },
    { id: "f16.7", cat: "Contract rules", front: "Family vs general Takaful contributions", back: "Family: protection (donation) + investment (Mudarabah) [+ fee under Wakalah]. General: entire contribution is a donation.", topic: "t16.4" },
    { id: "f16.8", cat: "Comparisons", front: "Wakalah vs Mudarabah Takaful models", back: "Wakalah: fixed fee, UWS/UWL to participants. Mudarabah: operator shares profit incl. UWS but bears no UWL — objectionable.", topic: "t16.4.1" },
    { id: "f16.9", cat: "Exam facts", front: "Box 16.1 Wakalah–Waqf figures", back: "Management fee 25–30%; 70–75% invested; Mudarabah profit 40% company : 60% fund (example).", topic: "t16.4.1" },
    { id: "f16.10", cat: "Risk", front: "Four objections to the Mudarabah model", back: "Donation ≠ capital; operator takes UWS not UWL; non-life capital not returned; Qard/guarantee contradicts Mudarabah.", topic: "t16.4.2" },
    { id: "f16.11", cat: "Comparisons", front: "Takaful vs insurance — surplus", back: "Insurance: UWS belongs to insurer. Takaful: UWS belongs to participants, checking overpricing.", topic: "t16.5" },
    { id: "f16.12", cat: "Exam facts", front: "Takaful milestones", back: "1979 Islamic Insurance Co of Sudan; 1984 Malaysia; OIC Fiqh Council approval 1985; growth 10–20% p.a.", topic: "t16.6" },
    { id: "f16.13", cat: "Risk", front: "Takaful challenges", back: "Awareness (biggest), Waqf adoption, capital, people, re-Takaful, investments, standardisation, regulation, Shari’ah audit.", topic: "t16.7" }
  ],
  questions: [
    { id: "q16.1", type: "mcq", q: "Which is NOT cited as a reason conventional insurance is prohibited?", options: ["Riba", "Gharar", "Maisir/Qimar", "Payment of claims to victims"], answer: 3, explanation: "p. 419.", topic: "t16.2.1", diff: "E", level: "recall", obj: "Recall prohibitions" },
    { id: "q16.2", type: "tf", q: "In the Takaful system, the underwriting surplus belongs to the Takaful operator's shareholders.", answer: false, explanation: "It belongs to participants (pp. 421, 423).", topic: "t16.3", diff: "E", level: "understanding", obj: "Apply surplus rule" },
    { id: "q16.3", type: "scenario", q: "A Takaful operator takes 50% of the underwriting surplus in good years but bears nothing when claims exceed contributions. Which model and objection apply?", options: ["Waqf model — no objection", "Mudarabah model — operator takes UWS but not UWL, becoming a risk-taker", "Wakalah — fee too low", "Conventional mutual — acceptable"], answer: 1, explanation: "p. 424, 426.", topic: "t16.4.2", diff: "M", level: "analysis", obj: "Evaluate models" },
    { id: "q16.4", type: "multi", q: "Which are foundations of Takaful described in the chapter? (Select all.)", options: ["‘Aqilah", "Tabarru‘", "Waqf", "Bai‘ al ‘Inah", "Mutual help funds of early traders"], answer: [0, 1, 2, 4], explanation: "pp. 420–422.", topic: "t16.3", diff: "M", level: "recall", obj: "Recall bases" },
    { id: "q16.5", type: "application", q: "Box 16.1 variant: participants donate Rs.10m; operator fee 30%; claims and re-Takaful Rs.5m paid from the fund. What is the underwriting surplus?", options: ["Rs.5m", "Rs.2m", "Rs.7m", "Rs.3m"], answer: 1, explanation: "Fund after fee = 7m; less claims 5m = Rs.2m surplus (belonging to participants). (Practice example — generated for learning.)", topic: "t16.4.1", diff: "M", level: "application", obj: "Compute UWS" },
    { id: "q16.6", type: "match", q: "Match each Takaful model to its operator income.", pairs: [["Wakalah", "Pre-agreed fee (% of contributions)"], ["Mudarabah", "Share of profit including surplus"], ["Waqf", "Management fee + Mudarib share of investment profit"], ["Wakalah–Mudarabah", "Fee plus share of surplus and investment profit"]], explanation: "Section 16.4.1.", topic: "t16.4.1", diff: "M", level: "understanding", obj: "Match models" },
    { id: "q16.7", type: "comparison", q: "Which statement correctly contrasts family Takaful with conventional life insurance?", options: ["Both pay a nominee regardless of inheritance law", "Family Takaful is based on Waqf, Tabarru‘ and Mudarabah, with benefits to heirs per inheritance; conventional life is Riba-based with a nominee", "Conventional agents are paid by the company", "Family Takaful guarantees interest"], answer: 1, explanation: "p. 427.", topic: "t16.5", diff: "M", level: "analysis", obj: "Compare life cover" },
    { id: "q16.8", type: "identify", q: "A model in which shareholders make an initial donation to create a fund whose surplus/deficit belongs to the fund is:", options: ["Mudarabah model", "Waqf model", "Wakalah model", "Conventional stock insurer"], answer: 1, explanation: "p. 424.", topic: "t16.4.1", diff: "E", level: "recall", obj: "Identify Waqf model" },
    { id: "q16.9", type: "short", q: "Refute the argument that insurance cover contradicts trust in Allah.", answer: "The author treats it as a myth: Islam directs people to avoid harm where possible and lighten their burdens; Shari’ah intends ease (Qur’an 2:185, 4:28); the Prophet (pbuh) said ‘Tie your camel first, then put your trust in Allah.’ The real objection is to Riba, Gharar and gambling in conventional contracts, which Takaful removes.", keywords: ["camel", "ease", "myth", "Riba", "Gharar"], explanation: "pp. 417–418.", topic: "t16.2", diff: "M", level: "analysis", obj: "Argue from sources" },
    { id: "q16.10", type: "order", q: "Order how Takaful deficits are absorbed (Section 16.5).", items: ["Reserves", "Interest-free loan (Qard al Hasan) from shareholders", "General increase in pricing"], explanation: "p. 427.", topic: "t16.5", diff: "M", level: "recall", obj: "Sequence deficit absorption" },
    { id: "q16.11", type: "definition", q: "Tabarru‘ in Takaful means:", options: ["Interest on contributions", "A donation relinquished to help fellow participants", "A loan to the operator", "The operator's fee"], answer: 1, explanation: "p. 421.", topic: "t16.3", diff: "E", level: "recall", obj: "Define Tabarru‘" },
    { id: "q16.12", type: "tf", q: "For a large corporate client, a Takaful operator should reduce the risk premium rather than its own fee.", answer: false, explanation: "It should reduce the operator's fee; risk premium should be uniform for similar risks (p. 426).", topic: "t16.4.3", diff: "M", level: "application", obj: "Apply pricing rule" }
  ],
  exam: [
    { id: "e16.1", kind: "long", q: "Critically evaluate the models of Takaful and explain why the Wakalah–Waqf model is regarded as closest to Shari’ah.", structure: ["Principles: Tabarru‘, mutual help, operator not risk-taker", "Wakalah model and issues", "Mudarabah model and four objections", "Wakalah–Mudarabah issues", "Waqf and Wakalah–Waqf (Box 16.1)", "Usmani-led research and convergence"], keyConcepts: ["UWS", "UWL", "Qard al Hasan", "Waqf"], points: ["Surplus to participants"], mistakes: ["Letting operator share surplus as risk-taker"], topic: "t16.4.1" },
    { id: "e16.2", kind: "short", q: "Why is conventional insurance considered unlawful and how does Takaful address each objection?", structure: ["Riba — compliant investment and no exchange of premium for sum", "Gharar — Tabarru‘ removes commutative exchange", "Maisir/Qimar — no gain at others' loss", "Risk transfer — mutual sharing"], keyConcepts: ["Khatar", "commutative contract"], points: ["Ibn Abdin"], mistakes: ["Saying seeking protection is prohibited"], topic: "t16.2.1" },
    { id: "e16.3", kind: "conceptual", q: "Compare Takaful with conventional insurance.", structure: ["Basis", "Risk", "Surplus", "Pricing", "Life policies", "Investments"], keyConcepts: ["mutual help", "adequacy"], points: ["Use a table"], mistakes: ["Calling Takaful risk-free"], topic: "t16.5" },
    { id: "e16.4", kind: "viva", q: "What are the main challenges facing the Takaful industry?", structure: ["Awareness", "Capital", "People", "Re-Takaful", "Standardisation", "Regulation"], keyConcepts: ["family Takaful"], points: ["Awareness is the biggest"], mistakes: ["Ignoring re-Takaful"], topic: "t16.7" }
  ]
});
