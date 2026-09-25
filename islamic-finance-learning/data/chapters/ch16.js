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
      academic: [
        "Bankers are mostly not involved in Takaful business; the chapter aims to introduce the Shari’ah-compliant system.",
        "Insurance has become a need for businesses, individuals and financial institutions that want to reduce the impact of losses and catastrophes. When Islamic banking began in the 1970s, it needed a Shari’ah-compliant alternative, because conventional insurance was seen to involve Riba, Gharar and gambling. Takaful was developed to fill this gap, and many Takaful companies now operate worldwide (p. 417). The author says the chapter only introduces the main features of Takaful for bankers, who are usually not involved in Takaful business. It covers why insurance is objected to, the need for and evolution of Takaful, its Shari’ah basis, models, status and challenges. It does not cover the technical side of Takaful operations (p. 417)."
      ],
      exam: "Takaful developed as a Shari’ah-compliant alternative to insurance (Riba, Gharar, gambling) to complete Islamic finance.",
      keyPoints: [
        "Insurance = life and general (marine, fire, accident).",
        "Conventional insurance has two broad categories: life (whole-life and endowment policies) and general (marine, fire, accident) (p. 417 n. 1)."
      ],
      related: ["t16.2"],
      quickCheck: { q: "Which elements make conventional insurance objectionable, per Chapter 16?", options: ["Riba, Gharar and gambling", "Only taxes", "Only high premiums", "Agents' commissions"], answer: 0, explanation: "p. 417." }
    },
    {
      id: "t16.2", section: "16.2", title: "The Need for Takaful Cover", pages: [417, 418], tier: "core",
      concepts: ["takaful", "tawakkul"],
      intuition: "Does buying cover contradict trust in Allah?",
      simple: "Muslim societies avoided commercial insurance for two reasons: a belief that mutual help and trust in destiny make it unnecessary, and the prohibitions of Riba, Gharar and gambling (plus insurers' investment in forbidden businesses). The author regards the second as genuine and the first as a myth: Islam requires reasonable precautions — ‘Tie your camel first, then put your trust in Allah’ — and Shari’ah intends ease (Qur’an 2:185; 4:28). Islamic insurance began only in 1979, largely in response to IFIs' needs.",
      academic: [
        "Insurance is mostly conducted by NBFIs; banks are generally not allowed to do insurance but need it as a regulatory and business requirement. Takaful also benefits individuals who avoided insurance on religious grounds. The rule of necessity supports developing a compliant scheme.",
        "Muslim societies have tended to avoid commercial insurance for two reasons (pp. 417–418). The first is a belief that it is unnecessary, since Muslims should help victims of misfortune, and that true faith in Allah and destiny makes cover pointless. The second is that the prohibitions of Riba, Gharar and gambling appear to rule it out, and insurers also invest in forbidden businesses. The author accepts the second reason as genuine but calls the first a myth. Islam requires people to avoid catastrophe where possible and to lighten the burden on their families. The Qur’an says Allah intends ease, not hardship (2:185), and wishes to lighten the burden (4:28). The Prophet (pbuh) told a man to tie his camel first and then trust in Allah (p. 418). Islamic insurance began only in 1979, well after Islamic banking. This suggests Takaful arose mainly because Islamic banks needed risk cover, since banking and insurance complement each other (p. 418)."
      ],
      exam: "Two reasons for avoiding insurance — belief (myth, per author) and prohibitions (genuine). Hadith: tie your camel. Qur’an 2:185, 4:28. Takaful from 1979.",
      keyPoints: [
        "Author's view: seeking cover is not against Tawakkul.",
        "Commercial banks are generally not allowed to do insurance business, but all financial institutions need insurance, by regulation or business necessity (p. 418)."
      ],
      debate: [
        { issue: "Is seeking insurance cover contrary to trust in Allah and destiny?", criticism: "Many believe true faith and mutual help make cover unnecessary and that insuring questions Allah's decree.", response: "The author calls this a myth: Islam directs believers to avoid catastrophe where possible and to lighten burdens; the Prophet said ‘Tie your camel first, then put your trust in Allah’; Shari’ah intends ease.", alternative: "Seek cover through a scheme free of Riba, Gharar and gambling — Takaful.", takeaway: "The objection lies in insurance's contract elements, not in seeking protection itself." }
      ],
      related: ["t16.2.1", "t3.3.3"],
      quickCheck: { q: "Which hadith does the author cite to show that precaution is consistent with Tawakkul?", options: ["‘Leave your offspring wealthy’", "‘Tie your camel first, then put your trust in Allah’", "‘Muslims are bound by their conditions’", "‘Earnings are concomitant with risk’"], answer: 1, explanation: "p. 418." },
      confusions: [
        { wrong: "Seeking cover against loss contradicts trust in Allah.", right: "The author calls this a myth. Precaution is required (“Tie your camel first, then put your trust in Allah”), and the Shari’ah aims to remove hardship (p. 418)." }
      ]
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
      keyPoints: [
        "Gharar vitiates commutative contracts; Takaful converts the contract to donation-based cooperation.",
        "Ibn Abdin (19th century) was the first jurist to write in detail on commercial (marine) insurance, and he did not approve it (pp. 418–419).",
        "Scholars differed because early muftis lacked details of insurance and there is no direct text; with greater knowledge the overwhelming majority judged it unlawful (p. 419).",
        "Marine insurance probably began at the end of the 12th century and became formalised in the 17th (p. 418)."
      ],
      definitions: [
        { term: "Underwriting surplus (UWS)", meaning: "Premiums remaining after payment of claims." },
        { term: "Underwriting loss (UWL)", meaning: "Claims paid in excess of premiums received." },
        { term: "Qimar", meaning: "A deal in which one party's profit depends on the other's loss." }
      ],
      related: ["t3.2", "t4.2.3", "t16.5"],
      quickCheck: { q: "Indirect Riba in conventional insurance arises from:", options: ["Paying claims", "Investment of funds in interest-based businesses", "Agents' fees", "Policy documents"], answer: 1, explanation: "p. 419." },
      examples: [
        { title: "Unclaimed general policy", kind: "textbook", text: "If no claim is made on a non-life policy, the insurer keeps almost all the premium. The policyholder’s right and liability were contingent throughout, which is Khatar (pp. 419–420)." },
        { title: "Early cancellation of life policy", kind: "textbook", text: "A life policyholder who cancels in the first two or three years usually loses all premiums paid. If the insurer cancels, it gives only a proportional refund (p. 419)." }
      ],
      table: { caption: "Prohibited elements in conventional insurance (pp. 419–420)", head: ["Element", "How it arises"], rows: [["Riba (direct)", "Excess in the exchange of premiums for the sum insured"], ["Riba (indirect)", "Insurer invests premiums in interest-based business"], ["Gharar / Khatar", "Liabilities and rights contingent; insurer does not know what it will owe"], ["Qimar / Maisir", "One party’s gain depends on the other’s loss; chance profit"], ["Invalid risk transfer", "Risk sold from insured to insurer in a commutative contract"]] },
      confusions: [
        { wrong: "Gharar invalidates any contract involving uncertainty, including gifts.", right: "Gharar is prohibited in commercial or commutative contracts. Conventional insurance is commutative, so its uncertainty invalidates it (p. 420)." }
      ]
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
      keyPoints: [
        "Investment profit ≠ underwriting surplus.",
        "Shaikh Abu Zahra held cooperative and social insurance legitimate, and non-cooperative insurance invalid because of gambling, temptation and usury (p. 420).",
        "The OIC Islamic Fiqh Council approved cooperative Takaful in 1985 (p. 420).",
        "There are three kinds of Waqf: religious, philanthropic and family. A Waqf is a separate entity; its property cannot be sold, and only the usufruct is assigned (p. 421).",
        "The UWS/UWL belongs to the group. The manager earns a fee and/or a share of investment profit, which is distinct from the underwriting result (p. 421)."
      ],
      definitions: [
        { term: "Takaful", meaning: "Cooperative risk-sharing in which participants donate (Tabarru‘) contributions to a pool that compensates members for defined losses." },
        { term: "Tabarru‘", meaning: "Donation; the contribution a participant relinquishes to help fellow participants." },
        { term: "‘Aqilah", meaning: "Kinsmen's shared responsibility for blood money — a precedent for Takaful approved by the Prophet (pbuh)." },
        { term: "Waqf", meaning: "Endowment: property retained for beneficiaries, a separate entity whose corpus cannot be sold; used as the basis of a Takaful fund." },
        { term: "Ta’mein", meaning: "The approximate Arabic word for insurance: to reassure, safeguard and guarantee through indemnity. It implies guarantee more than cooperative loss-sharing." },
        { term: "Qasamah", meaning: "An oath taken from the kinsmen of a murdered person; cited as an early practice of shared responsibility." },
        { term: "Mawalat", meaning: "A contract in which one party bequeaths property to another, who in turn pays any blood money the first may owe." }
      ],
      related: ["t16.3.1", "t16.4.1"],
      quickCheck: { q: "In which year did the OIC Islamic Fiqh Council approve cooperative Takaful?", options: ["1979", "1985", "1995", "2000"], answer: 1, explanation: "p. 420." },
      examples: [
        { title: "Traders’ mutual fund", kind: "textbook", text: "In the early second century AH, Arab traders sailing to Asia contributed to a fund to help any member who suffered mishaps or robbery at sea (p. 421)." }
      ],
      confusions: [
        { wrong: "A Waqf donor can never benefit from the Waqf.", right: "Under Waqf principles a donor may be among the beneficiaries. In Takaful the beneficiaries are the Waqf’s creator and the contributing group (p. 421)." }
      ]
    },
    {
      id: "t16.3.1", section: "16.3.1", title: "Main Objective of the Takaful System", pages: [422, 422], tier: "supporting",
      concepts: ["takaful"],
      intuition: "Is family Takaful the same as ‘insuring your life’?",
      simple: "From the participants' view the objective is mutual help, not profit or windfall gains. Operators may earn fees or profit shares as a business, and participants share realised profit after covering members' losses. Family Takaful is not against piety — it provides for dependants, in line with the Hadith ‘It is better to leave your offspring wealthy than poor’ and the Prophet's praise of those who look after widows and the poor.",
      academic: [
        "Common pools of Muslim traders to compensate robbery or misfortune on journeys illustrate mutual protection; Takaful may be conducted as a business with compliance, transparency and fairness.",
        "For policyholders, the aim of Takaful is mutual help, not profit or windfall gain. In family and general Takaful alike, participants agree to help one another from their contributions when a member suffers a defined loss (p. 422). Takaful may still be run as a business. Operators earn fees and/or profit shares, and participants may share realised profit after members’ losses are met. This raises no Shari’ah issue if it is done with compliance, transparency and fairness (p. 422). A family Takaful policy does not “insure one’s life”. It provides for one’s dependants, in line with the Hadith that it is better to leave heirs wealthy than dependent on others. The Prophet (pbuh) also praised those who look after widows and the poor (p. 422)."
      ],
      exam: "Objective: mutual help (Tabarru‘) not profit; family Takaful supports dependants (Hadith on leaving offspring wealthy).",
      keyPoints: ["Business operation is acceptable if compliant and fair."],
      related: ["t16.3"],
      quickCheck: { q: "The main objective of Takaful from participants' view is:", options: ["Windfall gains", "Mutual help", "Tax savings", "Speculation"], answer: 1, explanation: "p. 422." },
      confusions: [
        { wrong: "Taking a family Takaful policy is a lack of piety because it insures one’s life.", right: "It is a means of safeguarding offspring, consistent with the Prophet’s saying about leaving heirs wealthy (p. 422)." }
      ]
    },
    {
      id: "t16.4", section: "16.4", title: "How the Takaful System Works", pages: [422, 423], tier: "core",
      concepts: ["takaful", "family-takaful", "retakaful"],
      intuition: "Where does each rupee of a family Takaful contribution go?",
      simple: "The operator acts as Wakil or Mudarib. Claims are paid from the Takaful fund; the underwriting surplus/deficit belongs to participants. Family Takaful contributions are split into a protection part (donation to the fund/Waqf) and an investment part (Mudarabah, individually owned, returned with profit); under Wakalah there is also a management-fee part. In general Takaful the whole contribution is a donation. The company gives Qard al Hasan if claims exceed fund and reserves. Re-Takaful follows the same bases.",
      academic: [
        "Is Tabarru‘ the same as Sadaqah? Not necessarily: Mudarabah-model operators see the fund as a separate entity where the protection part is conditional on claims and surplus may be returned; in the Waqf model, donors relinquish ownership but, unlike Sadaqah, can benefit as beneficiaries — hence the Waqf model is preferred.",
        "Early operators did not distinguish UWS from investment profit; scholars now hold the entire UWS/UWL belongs to participants, with the operator taking a fee and/or share of investment profit.",
        "A Takaful company acts as trustee or manager on a Wakalah or Mudarabah basis. Participants contribute to the Takaful fund, claims are paid from it, and the underwriting surplus or deficit belongs to the participants. How investment profit is distributed depends on the Wakalah or Mudarabah basis (p. 422). In family Takaful under Mudarabah, contributions are split into a protection part and a savings/investment part. Under Wakalah there is a third part, the management fee (p. 422). The protection part works on donation, so individual rights give way to the Waqf. In the investment part individual rights remain, and the balance plus net profit is paid at maturity or earlier. In general Takaful the whole contribution is a donation for protection. If claims exceed the fund and reserves, the company lends Qard al Hasan (pp. 422–423). Re-Takaful follows the same Tabarru‘, Waqf and Mudarabah bases (p. 423)."
      ],
      exam: "Family Takaful: protection (donation) + investment (Mudarabah) [+ fee under Wakalah]. General: whole contribution donation. Qard al Hasan for deficits. UWS/UWL to participants; operator: fee/investment profit share.",
      keyPoints: ["Waqf model preferred because donors can still benefit."],
      related: ["t16.4.1"],
      quickCheck: { q: "In general Takaful, the participant's contribution is:", options: ["Split into savings and protection", "Wholly a donation for protection", "A loan to the company", "A deposit returned with interest"], answer: 1, explanation: "p. 422–423." },
      confusions: [
        { wrong: "Tabarru‘ in Takaful is the same as Sadaqah, so no benefit can return to the donor.", right: "Not every donation is Sadaqah. A Waqf donor gives up individual ownership but may benefit as one of the fund’s beneficiaries (p. 423)." },
        { wrong: "Early Takaful operators always separated underwriting surplus from investment profit.", right: "Early operators did not distinguish them. Later research concluded that the whole UWS/UWL belongs to participants, with the operator earning a fee and/or an investment-profit share (p. 423)." }
      ]
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
      keyPoints: [
        "Operator should not be a risk-taker.",
        "Qard al Hasan covers fund deficits.",
        "The Waqf fund may hold a contingency reserve from contributions and investment profit; the reserve belongs to the Waqf (pp. 425–426).",
        "In the Waqf model there is no obligation to distribute the surplus. It may be distributed, reserved or reinvested for the Waqf (p. 424).",
        "Company income in the Waqf model comes from the management fee, the Mudarib share or investment-agent charge, and profit on shareholders’ money (p. 426)."
      ],
      table: { caption: "Takaful models compared (pp. 423–425)", head: ["Model", "Where practised", "Operator income", "Concern"], rows: [["Pure Wakalah", "Middle East", "Fixed % fee (e.g. 30 %); sometimes a performance share of UWS", "UWL borne only by participants; operator gives only Qard; seen as inequitable"], ["Pure Mudarabah", "Asia–Pacific", "Share of investment profit plus UWS (e.g. 50:50)", "A donation cannot be Mudarabah capital; takes UWS but not UWL"], ["Wakalah–Mudarabah", "Some companies", "Fee plus shares of UWS and investment profit", "A Mudarib cannot also charge fees; no UWL borne"], ["Waqf / Wakalah–Waqf", "Recent, recommended", "Management fee plus Mudarib share of investment profit", "Preferred by Usmani-led research of 40+ scholars"]] },
      calc: { type: "takaful-waqf", note: "Reproduces Box 16.1's illustrative split: enter total donations, claims and investment return; shows the 25–30% operator fee, the invested portion, the fund's underwriting result and the 60:40 Mudarabah profit split. Other ratios are practice inputs." },
      related: ["t16.4.2", "t16.4.3", "t13.2.2"],
      quickCheck: { q: "Which model did research by over forty scholars under Mufti Taqi Usmani favour?", options: ["Pure Mudarabah", "Waqf or Wakalah–Waqf", "Conventional mutual", "Wakalah–Mudarabah"], answer: 1, explanation: "p. 423." },
      steps: [
        "Box 16.1 Wakalah–Waqf flow (p. 425): shareholders make an initial donation to create the Waqf fund, and participants donate to it",
        "The company keeps 25–30 % as its management fee and invests 70–75 % of the fund",
        "Claims and re-Takaful costs are charged to the fund; UWS/UWL belongs to participants as a group",
        "Investment profit is shared by Mudarabah between fund and company (e.g. 60:40)"
      ]
    },
    {
      id: "t16.4.2", section: "16.4.2", title: "Issues in the Mudarabah Model", pages: [426, 426], tier: "core",
      concepts: ["takaful", "mudarabah"],
      intuition: "Why is Mudarabah good for deposits but bad for insurance?",
      simple: "Four objections: (1) participants' relationship should rest on Tabarru‘, not Mudarabah — a donation cannot simultaneously be Mudarabah capital; (2) sharing UWS makes Takaful like insurance, and worse, since operators take UWS but bear no UWL — the operator becomes a risk-taker; (3) Mudarabah capital must be returned with profit or reduced by loss, whereas non-life contributions are not returned; (4) Qard al Hasan from the operator contradicts Mudarabah, and a Mudarib cannot guarantee the financier.",
      academic: [
        "Some operators charge management expenses to the Takaful fund — against Mudarabah rules — and take a performance share of UWS.",
        "The author considers Mudarabah highly suitable for Islamic banking, especially deposits, but not for insurance (p. 426). In the Mudarabah model, contributions and investment income pay claims and re-Takaful costs. Shareholders should meet management and marketing costs from their share, but some operators charge these to the fund, which breaks Mudarabah rules. Operators may also take part of the underwriting surplus (p. 426). The book lists four objections. The cooperative nature is undermined, since a donation cannot also be Mudarabah capital. Sharing the UWS makes the operator a risk-taker, and one that takes surplus without bearing deficit. Mudarabah capital must be returned with profit or reduced by loss, whereas non-life contributions are never returned. And a Mudarib who must provide Qard al Hasan is acting as guarantor, which contradicts Mudarabah (p. 426)."
      ],
      exam: "Mudarabah model issues: donation ≠ capital; operator takes UWS without UWL; capital not returned in non-life; Qard/guarantee inconsistent; expenses charged to fund.",
      keyPoints: ["An operator should not be a risk-taker."],
      related: ["t16.4.1", "t12.4"],
      quickCheck: { q: "Why is a donation (Tabarru‘) problematic as Mudarabah capital?", options: ["It is too small", "Donated funds cannot simultaneously be capital to be returned with profit", "It is taxed", "Only banks can donate"], answer: 1, explanation: "p. 426." },
      confusions: [
        { wrong: "A Mudarabah Takaful operator may charge management expenses to the Takaful fund in addition to its profit share.", right: "Under Mudarabah rules, management costs come from the operator’s own share, not the fund (p. 426)." }
      ]
    },
    {
      id: "t16.4.3", section: "16.4.3", title: "Issues in Wakalah and Wakalah–Mudarabah Models", pages: [426, 426], tier: "supporting",
      concepts: ["takaful", "wakalah"],
      intuition: "How should pricing and surplus sharing work fairly?",
      simple: "Wakalah combined with Shirkah (giving shareholders part of UWS as performance incentive) faces the same objections as Mudarabah — surplus should be shared among pool members. The risk premium should be defined separately, related to risk and the same for similar risks regardless of client; for large clients reduce the operator's fee, not the risk premium; initial set-up expenses should be borne by shareholders.",
      academic: [
        "Most Middle Eastern Takaful companies give part of UWS to shareholders.",
        "Wakalah combined with Shirkah, where operators get part of the UWS as a performance incentive on top of their fee, faces the same objection as Mudarabah. The surplus should be shared only among pool members (p. 426). The book also sets out pricing principles. The risk premium should be defined separately and relate to the risk, the same for similar risks whoever the client is. For large clients, the operator should reduce its fees, not the risk premium. Initial set-up costs should be borne by shareholders (p. 426)."
      ],
      exam: "Wakalah–Shirkah issues: UWS to operator; risk premium separate and uniform; discount fees not risk premium; set-up costs on shareholders.",
      keyPoints: ["Surplus sharing belongs to pool members."],
      related: ["t16.4.1"],
      quickCheck: { q: "For a large client, what should a Takaful operator reduce?", options: ["The risk premium rate", "The operator's fee", "Claims payable", "The Waqf corpus"], answer: 1, explanation: "p. 426." },
      confusions: [
        { wrong: "Giving the Wakalah operator a share of UWS as a performance bonus raises no Shari’ah issue.", right: "It draws the same objection as the Mudarabah model: the surplus should go only to pool members (p. 426)." }
      ]
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
      keyPoints: [
        "Built-in check against overpricing.",
        "Some uncertainty remains, but it is within the group, which is why the model where UWS/UWL fully belongs to participants is considered best (p. 427).",
        "Takaful has a built-in check on overpricing, since surplus returns to participants in proportion to contributions (p. 427)."
      ],
      table: { caption: "Takaful vs conventional insurance (pp. 427–428)", head: ["Aspect", "Conventional", "Takaful"], rows: [["Risk", "Transferred to the company", "Shared within the group via the Waqf/fund"], ["UWS/UWL", "Company’s", "Participants’"], ["Premium", "Commercially driven to maximise profit", "Adequacy the main concern; profit subject to equity and ethics"], ["Investments", "Includes interest-based and Haram avenues", "Shari’ah-compliant only"], ["Agents paid from", "Assureds’ premiums", "The company’s own funds"], ["Insurable interest", "Nominee on death", "Assured or heirs by inheritance and wills"], ["Life maturity", "Sum plus interest, dividends, bonus", "Investment part plus profit, UWS share, bonus"]] },
      related: ["t16.2.1", "t16.4"],
      quickCheck: { q: "In family Takaful, the insurable interest on death vests in:", options: ["A nominee of choice irrespective of Shari’ah", "The assured's heirs according to inheritance and wills", "The company", "The agent"], answer: 1, explanation: "p. 427." },
      steps: [
        "How losses are absorbed (p. 427): first the reserves",
        "Then interest-free loans (Qard) from shareholders",
        "Then a general increase in pricing by the company"
      ],
      confusions: [
        { wrong: "A family Takaful participant who terminates early gets help from the Takaful fund.", right: "On early termination he gets his investment part with profit and a reduced pro rata UWS share, but no assistance from the fund (p. 428)." }
      ]
    },
    {
      id: "t16.6", section: "16.6", title: "Status and Potential of the Takaful Industry", pages: [428, 429], tier: "supporting",
      concepts: ["takaful"],
      intuition: "Why has Takaful lagged behind Islamic banking?",
      simple: "First company: Islamic Insurance Company of Sudan (1979); Malaysia from 1984. Growth 10–20% p.a. vs about 5% for global insurance; over 60 companies in 24 countries; re-Takaful in Malaysia, Bahrain, Saudi Arabia and UAE. It has lagged banking because of the huge investment needed and required regulatory changes. Potential: low insurance density and penetration in Muslim countries, growth of Ijarah and home finance, motor, health and family needs. Islamic banks might jointly establish well-capitalised Takaful companies.",
      academic: [
        "Only a few companies offer comprehensive family Takaful (e.g. Bank Aljazira's Takaful Ta‘awani); awareness, particularly of family Takaful, is key.",
        "Takaful has proved viable within about two decades. The first company was the Islamic Insurance Company of Sudan in 1979, and Malaysia followed in 1984. The industry has grown at 10–20 % a year against about 5 % for insurance globally. There are over 60 companies (including windows) in 24 countries, and re-Takaful exists in Malaysia, Bahrain, Saudi Arabia and the UAE (p. 428). Takaful has lagged behind Islamic banking because of the heavy investment needed to compete and the regulatory changes needed for a level playing field, as Malaysia’s experience shows (p. 428). Potential is large. Insurance density and penetration are low in Muslim countries because many believe insurance is un-Islamic, while Islamic Ijarah and home finance create demand. Bank Aljazira was cited as the only exclusive family Takaful provider in the Middle East. The author suggests Islamic banks jointly set up well-capitalised Takaful companies where none exist (pp. 428–429)."
      ],
      exam: "1979 Sudan; 1984 Malaysia; growth 10–20%; >60 companies, 24 countries; lag reasons: investment, regulation; potential: low density/penetration, Ijarah and housing.",
      keyPoints: [
        "Insurance density = premiums per capita; penetration = premiums/GDP.",
        "Insurance density = premiums per capita; penetration = premiums as % of GDP (p. 428)."
      ],
      related: ["t16.7", "t18.3.1"],
      quickCheck: { q: "The first Takaful company was established in:", options: ["Malaysia, 1984", "Sudan, 1979", "Saudi Arabia, 1990", "Bahrain, 1975"], answer: 1, explanation: "p. 428." }
    },
    {
      id: "t16.7", section: "16.7", title: "Takaful Challenges", pages: [429, 430], tier: "core",
      concepts: ["takaful"],
      intuition: "What must change for Takaful to reach its potential?",
      simple: "Challenges: incorporating Waqf; adequate capitalisation (family Takaful absorbs cash in early years); human resources and training; re-Takaful availability (few providers, mostly Mudarabah-based, which is objectionable); compliant investment avenues; standardisation and harmonisation (AAOIFI, IFSB) with convergence on the Wakalah–Waqf model; legal and regulatory frameworks; competitiveness; and above all public awareness. Every company needs a Shari’ah board/advisor and periodic Shari’ah audit.",
      academic: [
        "Composite (general) business offers early cash flow; family Takaful's real potential needs a strong capital base. Regulators should allow flexibility while applying benchmarks such as CAMELS.",
        "The author says the model should converge on the Waqf, or Wakalah–Waqf, structure, which fully suits Tabarru‘ and is free of Shari’ah objections (pp. 429–430). Beyond this, the challenges are adequate capital, human resources, re-Takaful capacity (limited, and mostly on a Mudarabah basis, which is objectionable), compliant investment avenues, standardisation, and legal and regulatory frameworks (pp. 429–430). The biggest challenge is awareness: Muslims who avoided insurance on religious grounds must be reassured. Every Takaful company needs a Shari’ah board or advisor and periodic Shari’ah audit (p. 429). Family Takaful (Takaful Ta‘awani) holds the real potential but absorbs cash in early years, so a stronger capital base is needed. Composite annual business provides early cash flow. Training bodies such as IRTI, AAOIFI, central banks and SECs should help. AAOIFI and IFSB should set standards, and regulators should apply benchmarks such as CAMELS (pp. 429–430)."
      ],
      exam: "Challenges: awareness (biggest), Waqf adoption, capital, HR/training, re-Takaful, investments, standardisation (Wakalah–Waqf convergence), regulation, competition, Shari’ah governance.",
      keyPoints: ["Most important challenge: awareness."],
      related: ["t16.4.1", "t18.3.3"],
      quickCheck: { q: "What does the chapter call the most important challenge for Takaful?", options: ["Tax rates", "Creating awareness of the concept", "Too many companies", "Excess capital"], answer: 1, explanation: "p. 429." },
      confusions: [
        { wrong: "Family Takaful generates early cash flow for a new company.", right: "Family programmes absorb cash in the early years; composite annual products provide the early cash flow (p. 429)." }
      ]
    },
    {
      id: "t16.appx", section: "Appendix", title: "Appendix: Fatawa on Insurance", pages: [430, 431], tier: "revision",
      concepts: ["takaful", "fatwa"],
      intuition: "How have juristic bodies ruled on insurance over the last century?",
      simple: "The appendix lists Fatawa: against life/conventional insurance — Shaikh al-Azhar (1995), Makkah judicial conference (1398 AH), Morocco seminar (1972), Egypt Supreme Court (1926), Malaysia National Religious Council (1972), Cairo Muslim League conference (1965), and several Malaysian states; in favour — Mohammad Abduh (1900–01) and Mohd Baqit (1906); in favour of an Islamic model — Saudi Higher Council of Ulama (1397 AH), Muslim World League Fiqh Council (1398 AH), OIC Fiqh Council (1405 AH) and the First International Conference on Islamic Economy (1396 AH).",
      academic: ["The pattern shows opposition to conventional insurance and acceptance of an Islamic cooperative model."],
      exam: "Fatawa: majority against conventional insurance; OIC Fiqh Council (1405 AH), Saudi Ulama and MWL favour Islamic models.",
      keyPoints: [
        "Abduh's early Fatawa favoured insurance.",
        "Early Egyptian muftis (Abduh, Baqit) favoured insurance. Later councils rejected conventional insurance but approved an Islamic cooperative model (pp. 430–431)."
      ],
      related: ["t16.3"],
      quickCheck: { q: "Which body's Fatwa (1405 AH) favoured insurance under an Islamic model?", options: ["Egypt Supreme Court", "OIC Fiqh Council", "Makkah judicial conference", "Selangor State"], answer: 1, explanation: "p. 431." },
      table: { caption: "Selected Fatawa on insurance (pp. 430–431)", head: ["Source", "Position"], rows: [["Shaikh Mohammad Abduh, 1900–1901", "In favour of insurance"], ["Shaikh Mohd Baqit, 1906", "In favour of insurance"], ["Supreme Court of Egypt, 1926", "Against life insurance"], ["Muslim League Conference, Cairo, 1965", "Against life insurance"], ["Morocco seminar, 1972", "Against life insurance"], ["National Religious Council (Malaysia), 1972", "Against conventional insurance"], ["First International Conference on Islamic Economy, Makkah, 1396 AH", "In favour of an Islamic model"], ["Higher Council of Saudi Ulama, 1397 AH", "In favour of an Islamic model"], ["Fiqh Council of the Muslim World League, 1398 AH", "In favour of an Islamic model"], ["OIC Fiqh Council, 1405 AH", "In favour of an Islamic model"], ["Shaikh al-Azhar Jad al-Haq, 1995", "Against life insurance"]] }
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
    { id: "f16.13", cat: "Risk", front: "Takaful challenges", back: "Awareness (biggest), Waqf adoption, capital, people, re-Takaful, investments, standardisation, regulation, Shari’ah audit.", topic: "t16.7" },
    { id: "f16.14", cat: "Principles", front: "Why the “no need for cover” belief is a myth", back: "Islam requires avoiding catastrophe where possible and lightening burdens (Qur’an 2:185, 4:28; “Tie your camel”) (p. 418).", topic: "t16.2" },
    { id: "f16.15", cat: "Definitions", front: "UWS and UWL", back: "Underwriting surplus: premiums less claims. Underwriting loss: claims in excess of premiums (p. 419).", topic: "t16.2.1" },
    { id: "f16.16", cat: "Prohibitions", front: "Khatar in insurance", back: "Rights and liabilities contingent on an uncertain event; the insurer does not know what it will owe, and premiums are lost if nothing happens (p. 419).", topic: "t16.2.1" },
    { id: "f16.17", cat: "Arabic terminology", front: "Ta’mein", back: "The Arabic word for insurance: to reassure and guarantee through indemnity (p. 420).", topic: "t16.3" },
    { id: "f16.18", cat: "Arabic terminology", front: "Qasamah and Mawalat", back: "Qasamah: an oath from the kinsmen of a murdered person. Mawalat: a bequest in return for paying blood money. Both are precedents of shared responsibility (p. 420).", topic: "t16.3" },
    { id: "f16.19", cat: "Exam facts", front: "Abu Zahra on insurance", back: "Cooperative and social insurance is legitimate; non-cooperative insurance is invalid (gambling, temptation, usury) (p. 420).", topic: "t16.3" },
    { id: "f16.20", cat: "Principles", front: "Family Takaful and piety", back: "It provides for offspring (“better to leave your heirs wealthy”) and does not insure one’s life (p. 422).", topic: "t16.3.1" },
    { id: "f16.21", cat: "Contract rules", front: "Takaful deficit", back: "If claims exceed the fund and reserves, the operator lends Qard al Hasan to the fund (p. 423).", topic: "t16.4" },
    { id: "f16.22", cat: "Comparisons", front: "Pure Wakalah model — concern", back: "The fee and sometimes a share of UWS go to the operator, while UWL falls only on participants (the operator gives only Qard); seen as inequitable (p. 424).", topic: "t16.4.1" },
    { id: "f16.23", cat: "Contract rules", front: "Waqf model surplus", back: "It belongs to the fund and may be distributed, reserved or reinvested; there is no obligation to distribute (p. 424).", topic: "t16.4.1" },
    { id: "f16.24", cat: "Contract rules", front: "Takaful pricing principles", back: "Risk premium related to the risk and the same for similar risks; cut fees, not risk premium, for large clients; shareholders bear set-up costs (p. 426).", topic: "t16.4.3" },
    { id: "f16.25", cat: "Risk", front: "Order of loss absorption in Takaful", back: "Reserves → Qard from shareholders → general price increase (p. 427).", topic: "t16.5" },
    { id: "f16.26", cat: "Definitions", front: "Insurance density vs penetration", back: "Density: premiums per capita. Penetration: premiums as % of GDP (p. 428).", topic: "t16.6" },
    { id: "f16.27", cat: "Exam facts", front: "Re-Takaful problem", back: "Few providers (Malaysia, UAE, Bahrain, Saudi Arabia), mostly on an objectionable Mudarabah basis (pp. 429–430).", topic: "t16.7" }
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
    { id: "q16.12", type: "tf", q: "For a large corporate client, a Takaful operator should reduce the risk premium rather than its own fee.", answer: false, explanation: "It should reduce the operator's fee; risk premium should be uniform for similar risks (p. 426).", topic: "t16.4.3", diff: "M", level: "application", obj: "Apply pricing rule" },
    { id: "q16.13", type: "mcq", q: "Which two reasons does the author give for Muslim societies avoiding insurance?", options: ["Cost and lack of companies", "A belief that it is unnecessary given mutual help and faith in destiny, and the prohibition of Riba, Gharar and gambling", "Government bans and taxes", "Language and culture"], answer: 1, explanation: "He calls the first a myth and the second genuine (pp. 417–418).", topic: "t16.2", diff: "E", level: "recall", obj: "Recall reasons for avoiding insurance" },
    { id: "q16.14", type: "identify", q: "Which Hadith is cited to show that precaution is compatible with Tawakkul?", options: ["“Religion is sincere advice”", "“Tie your camel first, then put your trust in Allah”", "“Seek knowledge”", "“Actions are by intentions”"], answer: 1, explanation: "p. 418.", topic: "t16.2", diff: "E", level: "recall", obj: "Recall the basis for precaution" },
    { id: "q16.15", type: "tf", q: "Islamic insurance began at about the same time as Islamic banking in the early 1960s.", answer: false, explanation: "Islamic banking emerged in the 1960s–70s; Islamic insurance began no earlier than 1979 (p. 418).", topic: "t16.2", diff: "M", level: "recall", obj: "Recall the history of Takaful" },
    { id: "q16.16", type: "identify", q: "Who was the first jurist to discuss modern commercial (marine) insurance in detail?", options: ["Imam Abu Hanifa", "Ibn Abdin (19th century)", "Ibn Taymiyah", "Shaikh Abu Zahra"], answer: 1, explanation: "He did not approve it (pp. 418–419).", topic: "t16.2.1", diff: "M", level: "recall", obj: "Recall early juristic views on insurance" },
    { id: "q16.17", type: "match", q: "Match each prohibited element to how it arises in conventional insurance.", pairs: [["Riba (direct)", "Excess between premiums and sum insured"], ["Riba (indirect)", "Investment of funds in interest-based business"], ["Qimar", "One party’s gain depends on the other’s loss"], ["Khatar", "Rights and liabilities remain contingent"]], explanation: "pp. 419–420.", topic: "t16.2.1", diff: "M", level: "understanding", obj: "Analyse the prohibited elements" },
    { id: "q16.18", type: "short", q: "Why did scholars once differ on the status of insurance?", answer: "Jurists were asked for rulings without enough detail about insurance, and there is no direct text on it in the Qur’an and Sunnah.", keywords: ["detail", "text", "direct"], explanation: "p. 419.", topic: "t16.2.1", diff: "M", level: "understanding", obj: "Explain the differences of opinion" },
    { id: "q16.19", type: "tf", q: "Gharar invalidates conventional insurance because insurance is a commutative contract.", answer: true, explanation: "Gharar is prohibited in commercial or commutative contracts (p. 420).", topic: "t16.2.1", diff: "M", level: "understanding", obj: "Apply the Gharar rule to insurance" },
    { id: "q16.20", type: "definition", q: "Ta’mein refers to:", options: ["Cooperative mutual aid", "Reassuring, safeguarding and guaranteeing through indemnity; implying guarantee more than cooperative sharing", "Charity", "Endowment"], answer: 1, explanation: "p. 420.", topic: "t16.3", diff: "M", level: "recall", obj: "Define Ta’mein" },
    { id: "q16.21", type: "identify", q: "When did the OIC Islamic Fiqh Council approve cooperative Takaful?", options: ["1972", "1979", "1985", "2000"], answer: 2, explanation: "p. 420.", topic: "t16.3", diff: "M", level: "recall", obj: "Recall the OIC approval of Takaful" },
    { id: "q16.22", type: "match", q: "Match each early practice to its description.", pairs: [["‘Aqilah", "Kinsmen sharing blood money and calamities"], ["Qasamah", "Oath taken from the kinsmen of the murdered"], ["Mawalat", "Bequest in return for paying blood money"], ["Traders’ fund", "Pool for sea-voyage mishaps and robberies"]], explanation: "pp. 420–421.", topic: "t16.3", diff: "H", level: "recall", obj: "Recall historical precedents of Takaful" },
    { id: "q16.23", type: "multi", q: "Which statements about Waqf in Takaful are correct? (Select all.)", options: ["Waqf is a separate entity able to own property", "Waqf property cannot be sold; only its usufruct is assigned", "The donor may be one of the beneficiaries", "Waqf property returns to donors on request"], answer: [0, 1, 2], explanation: "p. 421.", topic: "t16.3", diff: "M", level: "understanding", obj: "Understand Waqf in Takaful" },
    { id: "q16.24", type: "tf", q: "The operator’s return in Takaful is the underwriting surplus.", answer: false, explanation: "The UWS/UWL belongs to the group; the operator earns a fee and/or share of investment profit (p. 421).", topic: "t16.3", diff: "M", level: "understanding", obj: "Distinguish UWS from investment profit" },
    { id: "q16.25", type: "identify", q: "What is the main objective of Takaful for policyholders?", options: ["Windfall gains", "Mutual help", "Tax savings", "Speculation"], answer: 1, explanation: "p. 422.", topic: "t16.3.1", diff: "E", level: "recall", obj: "Recall the objective of Takaful" },
    { id: "q16.26", type: "comparison", q: "Under the Wakalah basis, how is a family Takaful contribution divided?", options: ["Two parts: protection and investment", "Three parts: management fee, protection and investment", "One part: donation", "Four parts including interest"], answer: 1, explanation: "Under Mudarabah, two parts (p. 422).", topic: "t16.4", diff: "M", level: "understanding", obj: "Compare contribution splits" },
    { id: "q16.27", type: "scenario", q: "Claims in a general Takaful fund exceed the fund and its reserves. What does the company provide?", options: ["A grant it keeps as profit", "Qard al Hasan to the fund", "An interest-bearing loan", "Nothing; claims are cut"], answer: 1, explanation: "p. 423.", topic: "t16.4", diff: "E", level: "application", obj: "Apply deficit rules" },
    { id: "q16.28", type: "tf", q: "According to the chapter, every donation is Sadaqah, so a Takaful donor can never benefit from the fund.", answer: false, explanation: "Not every donation is Sadaqah; a Waqf donor may benefit as a beneficiary (p. 423).", topic: "t16.4", diff: "M", level: "understanding", obj: "Distinguish Tabarru‘ from Sadaqah" },
    { id: "q16.29", type: "identify", q: "Where is the pure Wakalah model mainly practised?", options: ["Asia–Pacific", "Middle East", "Europe", "Africa only"], answer: 1, explanation: "Mudarabah mainly in the Asia–Pacific (p. 424).", topic: "t16.4.1", diff: "E", level: "recall", obj: "Recall where the models are practised" },
    { id: "q16.30", type: "application", q: "Box 16.1: participants donate Rs.20 m. The operator fee is 25 %, claims and re-Takaful cost Rs.9 m and investment profit is Rs.2 m, shared fund 60 : company 40. What is the underwriting surplus?", options: ["Rs.6 m", "Rs.11 m", "Rs.15 m", "Rs.5 m"], answer: 0, explanation: "20 − 5 (fee) − 9 = 6 m UWS for participants. Separately, the fund gets 1.2 m and the company 0.8 m of the investment profit (p. 425).", topic: "t16.4.1", diff: "H", level: "application", obj: "Calculate Wakalah–Waqf results" },
    { id: "q16.31", type: "order", q: "Order the Wakalah–Waqf process in Box 16.1.", items: ["Shareholders create the Waqf fund with an initial donation", "Participants donate to the Waqf fund", "The company takes its 25–30 % management fee and invests the fund", "Claims and re-Takaful costs are charged to the fund; UWS/UWL belongs to participants", "Investment profit is shared between fund and company by Mudarabah"], explanation: "p. 425.", topic: "t16.4.1", diff: "M", level: "understanding", obj: "Sequence the Wakalah–Waqf model" },
    { id: "q16.32", type: "tf", q: "In the Waqf model, the fund is obliged to distribute all underwriting surplus to participants each year.", answer: false, explanation: "There is no obligation; the surplus may be distributed, reserved or reinvested (p. 424).", topic: "t16.4.1", diff: "H", level: "understanding", obj: "Apply Waqf surplus rules" },
    { id: "q16.33", type: "multi", q: "Which objections are raised against the Mudarabah Takaful model? (Select all.)", options: ["A donation cannot simultaneously be Mudarabah capital", "The operator takes UWS but bears no UWL", "Non-life contributions are not returned as Mudarabah capital must be", "A Mudarib giving Qard al Hasan acts as a guarantor"], answer: [0, 1, 2, 3], explanation: "p. 426.", topic: "t16.4.2", diff: "M", level: "analysis", obj: "Analyse the Mudarabah model" },
    { id: "q16.34", type: "scenario", q: "A Takaful operator offers a large corporate client a lower rate. According to the chapter, what should it reduce?", options: ["The risk premium", "The operator’s fee, not the risk premium", "Claims paid", "Reserves"], answer: 1, explanation: "p. 426.", topic: "t16.4.3", diff: "M", level: "application", obj: "Apply pricing principles" },
    { id: "q16.35", type: "identify", q: "Who should bear the initial set-up expenses of a Takaful company?", options: ["Participants", "Shareholders", "The Waqf fund", "Re-Takaful operators"], answer: 1, explanation: "p. 426.", topic: "t16.4.3", diff: "E", level: "recall", obj: "Recall expense allocation" },
    { id: "q16.36", type: "comparison", q: "How are agents paid in conventional life insurance and in family Takaful?", options: ["Both from premiums", "Conventional: from assureds’ premiums; Takaful: by the company itself", "Both by the company", "Takaful agents are unpaid"], answer: 1, explanation: "p. 427.", topic: "t16.5", diff: "M", level: "understanding", obj: "Compare life policies" },
    { id: "q16.37", type: "scenario", q: "A family Takaful participant surrenders after four years. What does he receive?", options: ["The full sum covered", "His investment part with profit and a reduced pro rata UWS share, but no help from the Takaful fund", "Nothing", "Premiums plus interest"], answer: 1, explanation: "p. 428.", topic: "t16.5", diff: "M", level: "application", obj: "Apply early-termination rules" },
    { id: "q16.38", type: "identify", q: "On the insured’s death, to whom does the insurable interest vest under the Islamic model?", options: ["A nominee chosen freely", "The assured or his heirs according to inheritance and wills", "The company", "The Waqf"], answer: 1, explanation: "p. 427.", topic: "t16.5", diff: "M", level: "recall", obj: "Recall insurable interest rules" },
    { id: "q16.39", type: "mcq", q: "The first Takaful company was established in:", options: ["Malaysia, 1984", "Sudan, 1979", "Saudi Arabia, 1985", "Egypt, 1926"], answer: 1, explanation: "The Islamic Insurance Company of Sudan (p. 428).", topic: "t16.6", diff: "E", level: "recall", obj: "Recall Takaful milestones" },
    { id: "q16.40", type: "multi", q: "Why has Takaful not matched the success of Islamic banking globally? (Select all.)", options: ["Huge investment needed to compete with conventional insurers", "Regulatory changes needed to compete on equal terms", "Takaful is prohibited by most scholars", "No demand exists"], answer: [0, 1], explanation: "p. 428.", topic: "t16.6", diff: "M", level: "recall", obj: "Recall constraints on Takaful growth" },
    { id: "q16.41", type: "definition", q: "Insurance penetration means:", options: ["Premiums per capita", "Premiums as a percentage of GDP", "Number of companies", "Claims ratio"], answer: 1, explanation: "Density is premiums per capita (p. 428).", topic: "t16.6", diff: "M", level: "recall", obj: "Define insurance indicators" },
    { id: "q16.42", type: "identify", q: "What does the chapter call the most important challenge for Takaful?", options: ["IT systems", "Creating awareness of the concept among Muslims who avoided insurance", "Lack of Shari’ah boards", "Tax"], answer: 1, explanation: "p. 429.", topic: "t16.7", diff: "E", level: "recall", obj: "Recall Takaful challenges" },
    { id: "q16.43", type: "tf", q: "Family Takaful programmes provide early cash flow for new Takaful companies.", answer: false, explanation: "They absorb cash in early years; composite annual products provide cash flow (p. 429).", topic: "t16.7", diff: "M", level: "understanding", obj: "Understand family Takaful economics" },
    { id: "q16.44", type: "identify", q: "Which early mufti issued fatawa in favour of insurance in 1900–1901?", options: ["Shaikh Jad al-Haq", "Shaikh Mohammad Abduh", "Ibn Abdin", "Shaikh Abu Zahra"], answer: 1, explanation: "Appendix (p. 430).", topic: "t16.appx", diff: "M", level: "recall", obj: "Recall fatawa on insurance" }
  ],
  exam: [
    { id: "e16.1", kind: "long", q: "Critically evaluate the models of Takaful and explain why the Wakalah–Waqf model is regarded as closest to Shari’ah.", structure: ["Principles: Tabarru‘, mutual help, operator not risk-taker", "Wakalah model and issues", "Mudarabah model and four objections", "Wakalah–Mudarabah issues", "Waqf and Wakalah–Waqf (Box 16.1)", "Usmani-led research and convergence"], keyConcepts: ["UWS", "UWL", "Qard al Hasan", "Waqf"], points: ["Surplus to participants"], mistakes: ["Letting operator share surplus as risk-taker"], topic: "t16.4.1" },
    { id: "e16.2", kind: "short", q: "Why is conventional insurance considered unlawful and how does Takaful address each objection?", structure: ["Riba — compliant investment and no exchange of premium for sum", "Gharar — Tabarru‘ removes commutative exchange", "Maisir/Qimar — no gain at others' loss", "Risk transfer — mutual sharing"], keyConcepts: ["Khatar", "commutative contract"], points: ["Ibn Abdin"], mistakes: ["Saying seeking protection is prohibited"], topic: "t16.2.1" },
    { id: "e16.3", kind: "conceptual", q: "Compare Takaful with conventional insurance.", structure: ["Basis", "Risk", "Surplus", "Pricing", "Life policies", "Investments"], keyConcepts: ["mutual help", "adequacy"], points: ["Use a table"], mistakes: ["Calling Takaful risk-free"], topic: "t16.5" },
    { id: "e16.4", kind: "viva", q: "What are the main challenges facing the Takaful industry?", structure: ["Awareness", "Capital", "People", "Re-Takaful", "Standardisation", "Regulation"], keyConcepts: ["family Takaful"], points: ["Awareness is the biggest"], mistakes: ["Ignoring re-Takaful"], topic: "t16.7" },
    { id: "e16.5", kind: "scenario", q: "A newly formed Takaful company asks which model to adopt and how to price large corporate policies. Advise it.", structure: ["Compare models", "Recommend Wakalah–Waqf", "Surplus and deficit", "Pricing", "Governance"], keyConcepts: ["Waqf", "Tabarru‘", "UWS", "Qard al Hasan"], points: ["Wakalah inequitable; Mudarabah objections (pp. 424, 426)", "Wakalah–Waqf recommended by 40+ scholars (p. 423)", "UWS/UWL for participants; Qard for deficits (pp. 423–424)", "Reduce the fee, not the risk premium, for large clients (p. 426)", "Shari’ah board and audit (p. 429)"], mistakes: ["Giving the operator a UWS share", "Charging management expenses to the fund under Mudarabah"], topic: "t16.4.3" }
  ]
});
