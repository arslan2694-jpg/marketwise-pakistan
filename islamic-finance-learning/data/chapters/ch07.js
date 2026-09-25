/* Chapter 7 — Loan and Debt in Islamic Commercial Law. Source pp. 155–176. */
IFL_DATA.registerChapter({
  number: 7,
  title: "Loan and Debt in Islamic Commercial Law",
  part: "part-ii",
  pages: [155, 176],
  minutes: 55,
  difficulty: "Intermediate",
  objectives: [
    "Define Qard, Salaf, Dayn and ‘Ariyah and distinguish them.",
    "Explain why any stipulated benefit on a loan is Riba and how this applies to banking.",
    "State the Qur’anic guidance on documenting credit transactions (2:282–283).",
    "Describe the duties of debtors and creditors, Husnal Qadha and the treatment of current accounts.",
    "Explain the rules on prepayment rebates, penalties on default and insolvency.",
    "Explain Hawalah, Kafalah and Rihn, including risk, reward and benefits of a pledge.",
    "Explain the prohibition of Bai‘ al Dayn and indexation of loans/debts."
  ],
  why: "Every Murabaha, Ijarah or Salam creates a debt. The rules in this chapter govern what an Islamic bank may do when that debt is paid early, paid late, assigned, secured or eroded by inflation — the operational issues that separate Islamic banking from interest-based lending.",
  overview: "The chapter defines loans and debts, reaffirms the illegality of commercial interest, and sets out Qur’anic and Prophetic guidance on lending: what can be lent, repayment of principal only, no time value in debts, duties of debtors and creditors, gracious repayment, rebates, penalties and insolvency, Hawalah, Kafalah and pledges, sale of debt and inflation.",
  summarySection: "7.18",
  topics: [
    {
      id: "t7.1", section: "7.1", title: "Introduction: Why Debt Rules Matter for Islamic Banks", pages: [155, 155], tier: "revision",
      concepts: ["qard", "dayn"],
      intuition: "If Islamic banks don’t lend at interest, why study loans? Because most of their assets are debts created by sale and lease.",
      simple: "Islamic banks mobilise deposits mostly on PLS (current accounts are loans or Amanah) and use PLS and debt-creating modes on the asset side — much of it debt. In Shari’ah lending is a virtuous act: only the principal is repayable.",
      academic: ["Conventional banks take deposits and lend at interest. Islamic banks’ superstructure is PLS or modes that culminate in interest-free debt; current deposits are loans or Wadi‘ah/Amanah. Practically a large part of their assets generate debt. Loaning is a virtuous act without compensation for use of money; any excess demanded makes it usurious. Topics: objects of loans, repayment, gifts, security and surety, Hawalah, default, creditor/debtor duties, sale of debt, prepayment rebate and insolvency."],
      exam: "Islamic banks create debt through sale/lease; lending is virtuous — principal only.",
      keyPoints: ["Current deposits are treated as loans (or Amanah)."],
      related: ["t7.2", "t8.5.2"],
      quickCheck: { q: "How are current deposits generally treated in Islamic banks?", options: ["As Mudarabah investments", "As loans (or Wadi‘ah/Amanah)", "As Salam", "As Ijarah"], answer: 1, explanation: "p. 155." }
    },
    {
      id: "t7.2", section: "7.2", title: "The Terms Defined: Qard, Salaf, Dayn and ‘Ariyah", pages: [155, 157], tier: "core",
      concepts: ["qard", "dayn", "salaf", "ariyah"],
      intuition: "Loan, debt, fixed-term loan, borrowed item — Islamic law has a precise word for each.",
      simple: "Qard: giving something of value to another as a virtue, to be returned in similar amount on demand. Salaf: a loan for a fixed time (also another name for Salam). Dayn: a liability from a credit transaction (sale or rent). ‘Ariyah: lending an item for use free, returning the same item.",
      academic: [
        "Qard (literally “to cut” — property cut off from the lender) is giving anything of value in ownership to another by way of virtue, to be repaid in the same or similar amount on demand or at the settled time; jurists agree on this definition. Tantawi (quoted by the SAB): Qard is more particular than Dayn — a loan given as help; Dayn arises from rent, sale or purchase; debts should be returned without profit.",
        "Salaf literally means a loan that draws no profit; more widely, loans for specified periods; it is also another name for Salam. Qard is a kind of Salaf payable on demand (Hanafi, Shafi‘i, Hanbali; Malik: a settled Qard cannot be recalled early). Dayn arises from any credit transaction deferring a counter value. ‘Ariyah: giving a commodity for use without return; the same item must be returned (the Prophet borrowed camels and breast-plates from Safwan for Hunain; Safwan waived missing plates). Qard returns a similar item.",
        "Murabaha creates Duyun that must be returned without profit over the debt. Qard is proved by Sunnah and consensus; the Prophet borrowed 40,000 dirhams for the State; lending is more pleasing to Allah than alms and equivalent to half Sadaqah. Ownership of loaned goods passes to the borrower who may use, sell or donate them. A Qard should not be conditional on another contract like Bai‘."
      ],
      exam: "Qard: virtuous loan, similar returned on demand. Salaf: fixed-term loan (also Salam). Dayn: liability from credit sale/rent. ‘Ariyah: free use, same item returned. Murabaha creates Dayn → no excess.",
      keyPoints: ["Qard vs ‘Ariyah: similar vs same item returned.", "Qard must not be conditional on a sale."],
      definitions: [
        { term: "Qard", meaning: "Giving anything of value to another by way of virtue, to be repaid in same or similar amount on demand or at the settled time." },
        { term: "Salaf", meaning: "A loan for a fixed time that draws no profit; also another name for Salam." },
        { term: "Dayn", meaning: "A liability arising from a credit transaction (sale, rent) in which one counter value is deferred." },
        { term: "‘Ariyah", meaning: "Giving a nonconsumable commodity for use free of charge; exactly the same item must be returned." }
      ],
      table: { caption: "Loan-related terms (Section 7.2)", head: ["Term", "Arises from", "Repayment"], rows: [["Qard", "Benevolent loan", "Same/similar, on demand"], ["Salaf", "Fixed-term loan (also Salam)", "At settled time"], ["Dayn", "Credit sale, due rent, other credit transactions", "At stipulated time, no excess"], ["‘Ariyah", "Free loan of an item for use", "The same item returned"]] },
      related: ["t3.2.1", "t5.8"],
      quickCheck: { q: "What distinguishes ‘Ariyah from Qard?", options: ["‘Ariyah carries interest", "In ‘Ariyah exactly the borrowed item is returned; in Qard a similar item", "Qard is for animals only", "No difference"], answer: 1, explanation: "p. 156." }
    },
    {
      id: "t7.3", section: "7.3", title: "Illegality of Commercial Interest", pages: [157, 158], tier: "core",
      concepts: ["riba"],
      intuition: "Is any benefit to a lender acceptable if it isn’t cash — a better coin, a favour, a lease? No.",
      simple: "Contemporary scholars agree that commercial interest is Riba. Any loan stipulating a benefit over the principal — in quantity, quality, a gift, or a condition that the borrower lease his house or sell something to the lender — is Riba.",
      academic: ["Contemporary scholars have reached consensus that modern commercial interest is Riba; no interest-based loan is exempt. Jahiliyyah Riba took various forms — increase on loans or on debts from sales, charged periodically or with principal — all called Riba. All loans stipulating benefit over principal are void, whether in quantity or quality (Sarakhsi; Ibn Qudama: all jurists agree). Ibn al-Munzar: unanimous that any binding increase, gift or present above principal is Riba. Ibn Abbas and Ibn Masud forbade loans entailing benefit because lending is mutual kindness. Lending debased coins for un-debased, or conditioning the loan on renting a house, selling something or a future loan, is illegal (sale and loan combined)."],
      exam: "Commercial interest = Riba (consensus). Any stipulated benefit — quantity, quality, gift, or ancillary contract — makes a loan usurious.",
      keyPoints: ["Benefit in quality also counts (debased for good coins).", "Conditioning a loan on another contract is prohibited."],
      related: ["t3.2.1", "t7.7"],
      quickCheck: { q: "A lender makes a loan conditional on the borrower renting his house to the lender. This is:", options: ["Permissible", "Illegal — a stipulated benefit/combined contract", "Hawalah", "Kafalah"], answer: 1, explanation: "p. 158." }
    },
    {
      id: "t7.4", section: "7.4", title: "Loaning and the Banking System", pages: [158, 158], tier: "supporting",
      concepts: ["qard", "islamic-banking"],
      intuition: "Where do deposits and bonds fit in this framework?",
      simple: "Conventional deposits and government securities are Qard: principal guaranteed plus a return not linked to outcomes. Conventional banks’ financing is mostly loans. Islamic banks remain intermediaries but deal in real goods; their trade and lease modes create debt governed by the rules of Dayn.",
      academic: ["Deposits with conventional banks and investments in government securities are Qard: principal guaranteed and a return fixed or unrelated to outcomes; banks are liable even in loss. Current accounts are also loans. Conventional asset-side financing — working capital, trade, project, BMR, SME, government — is mostly loans or debts. Most writers hold banks will remain intermediaries; some recommend they also act as traders, adopting universal banking or holding-company models with subsidiaries/mutual funds. Whatever the structure, Islamic banks should not earn money from money and must abide by the rules of Dayn."],
      exam: "Conventional deposits/govt securities = Qard with return → Riba. Islamic banks: intermediaries dealing in real goods; debts subject to Dayn rules.",
      keyPoints: ["Universal banking/holding company models suggested."],
      related: ["t8.4.1", "t4.2.7"],
      quickCheck: { q: "Why are conventional deposits categorised as Qard?", options: ["They are gifts", "Principal is guaranteed and the return is not linked to business outcomes", "They are leases", "They are partnerships"], answer: 1, explanation: "p. 158." }
    },
    {
      id: "t7.5", section: "7.5", title: "Guidance from the Holy Qur’an on Loans and Debts", pages: [159, 159], tier: "supporting",
      concepts: ["documentation"],
      intuition: "Why do Islamic banks document credit so carefully? The longest verse of the Qur’an tells them to.",
      simple: "Verse 2:282–283 instructs that credit transactions for a fixed period be written down by a scribe, dictated by the debtor, with two witnesses; on a journey without a scribe, a pledge with possession may serve. Spot transactions need not be written.",
      academic: ["The verse: when dealing in lending or future obligations for a fixed period, reduce it to writing; the liable party dictates; a guardian dictates for the weak; two male witnesses or one man and two women; do not disdain writing, small or big; spot transactions need not be written but take witnesses in commercial contracts; neither scribe nor witness should be harmed; on a journey without a scribe, a pledge with possession. Credit transactions require documentation and witnesses (Ibn Hazm: witnesses necessary). The verse covers Salam and Bai‘ Mu’ajjal and teaches business as if in the presence of God."],
      exam: "2:282–283: write down fixed-period credit, debtor dictates, witnesses; pledge with possession when no scribe; spot deals need not be written.",
      keyPoints: ["Covers Salam and Bai‘ Mu’ajjal."],
      related: ["t4.2.8", "t7.15"],
      quickCheck: { q: "According to 2:283, what may serve if one is on a journey and cannot find a scribe?", options: ["An oral promise", "A pledge with possession", "Interest", "Nothing"], answer: 1, explanation: "p. 159." }
    },
    {
      id: "t7.6", section: "7.6", title: "The Substance of Loans", pages: [159, 160], tier: "detailed",
      concepts: ["qard"],
      intuition: "What can be lent?",
      simple: "Qard can be given in anything permissible, valuable and whose similar is available for repayment. Hanafis restrict it to fungibles; other schools allow any saleable commodity (the Sunnah shows loans of animals). The amount and value must be known.",
      academic: ["Besides Thaman, Qard can be given in Mubah goods of value whose similar is available. Hanafis: fungibles (weight and measure) only; but the Sunnah shows loans of animals. Other schools: any commodity that can be sold, except human beings. The amount and value must be known. Maliki definition: a loan of something valuable granted as a favour (not ‘Ariyah or Hibah) to recover in the same form — benefit for the borrower alone; anything that can be the subject of Salam may be lent."],
      exam: "Qard in permissible, valuable goods with available similars; Hanafi: fungibles only; others: any saleable item; amount known.",
      keyPoints: ["Maliki: benefit is for the borrower alone."],
      related: ["t7.2"],
      quickCheck: { q: "Which school restricts Qard to fungibles?", options: ["Maliki", "Hanafi", "Shafi‘i", "Hanbali"], answer: 1, explanation: "p. 159." }
    },
    {
      id: "t7.7", section: "7.7", title: "Repayment of the Principal Only", pages: [160, 160], tier: "core",
      concepts: ["qard", "riba"],
      intuition: "Can a lender accept a gift from the borrower?",
      simple: "Debt must be repaid — even martyrs are not forgiven debt — and nothing above principal may be exacted, whoever the parties are. After lending, the creditor should not accept presents unless such exchanges were customary before. Cost-free customary benefits (e.g. repayment in another city) are allowed.",
      academic: ["Lending is unavoidable and permissible, but should not fund lavish consumption. A loan must be paid; debt is not forgiven even for martyrs. Any excess exacted is Riba, with no exemption for Muslim/non-Muslim, employer/employee or State/people. The creditor should refrain from accepting a present unless customary before the loan. Customary indirect benefits costing the borrower nothing are permissible — e.g. agreeing repayment in another country where in both parties’ interest (Ibn Zubair accepted money in Makkah to be paid in Iraq via his brother; Ibn Abbas and Ali did not object)."],
      exam: "Principal only; no presents unless customary pre-loan; cost-free customary benefits (e.g. repayment elsewhere) allowed.",
      keyPoints: ["No exemption based on the parties’ identities.", "Suftajah-like remittance arrangements allowed."],
      related: ["t7.11", "t3.2.1"],
      quickCheck: { q: "A borrower offers the lender a present that they never exchanged before the loan. The lender should:", options: ["Accept it", "Refrain from accepting it", "Charge interest instead", "Demand more"], answer: 1, explanation: "p. 160." }
    },
    {
      id: "t7.8", section: "7.8", title: "Time Value of Money in Loans and Debts", pages: [160, 161], tier: "core",
      concepts: ["time-value"],
      intuition: "Credit price can exceed cash price — so why can’t a debt grow with time?",
      simple: "Once a receivable’s amount is stipulated, no value can be assigned to the time given for payment; $100 is exchanged only for $100. Shari’ah recognises time value in business, not as a predetermined rate unrelated to real business. Currency notes and government bonds are money, not saleable or leasable goods.",
      academic: ["While credit and cash prices may differ in trading, no value can be assigned to time for a receivable once stipulated, because money is not a lawful commodity for homogeneous exchange except in equal sums. Time valuation is approved in trade, not in Qard or Dayn. What is prohibited is claiming time value as a predetermined quantity at a predetermined rate unrelated to real business. Currency notes are homogeneous — same genus and ‘Illah — so one cannot sell or lease them to avoid Riba. Government securities, bonds and savings certificates are money; gold and silver may be Thaman and Mabi‘, but bonds and notes only reflect value and cannot be Mabi‘."],
      exam: "No time value on a stipulated receivable; time value only through business/trade. Notes and bonds = money, not Mabi‘; cannot be sold or leased for gain.",
      keyPoints: ["$100 for $100 only.", "Bonds and savings certificates are money."],
      related: ["t4.6"],
      quickCheck: { q: "Why can currency notes not be leased to earn a return?", options: ["They are too valuable", "They are money (Thaman), not subjects of sale or lease like goods", "Leasing is prohibited", "They are gold"], answer: 1, explanation: "p. 161." }
    },
    {
      id: "t7.9", section: "7.9", title: "Instructions for the Debtor", pages: [161, 162], tier: "supporting",
      concepts: ["debtor-duties"],
      intuition: "What does Shari’ah demand of a borrower?",
      simple: "The debtor must repay as promised; wilful delay by one able to pay is injustice and may be punished. The Prophet did not pray the funeral of a debtor until his debt was assumed. A debtor must intend to repay and thank the creditor. Authorities should make laws and standards to reduce non-payment.",
      academic: ["The debtor’s foremost duty is repayment (17:34). Procrastination is injustice; an able debtor who does not pay may be arrested and embarrassed; leaving unpaid debt after death is a great sin. In Qard the creditor may ask for repayment even before the promised date. A genuinely unable debtor should take the creditor into confidence. A believer’s soul remains encumbered until debt is paid; the best are best in paying liabilities; the Prophet did not offer funeral prayer until a Companion’s debt was taken over. Wilful defaulters may be arrested, punished and dealt with harshly. NPLs worldwide show borrowers do not try to repay while living lavishly; borrowers must intend to repay, pay on time and thank the creditor; authorities should make laws, accounting and auditing standards to reduce moral hazard."],
      exam: "Repay as promised; wilful delay = injustice, punishable; intend to repay; thank creditor; laws/standards to curb NPLs.",
      keyPoints: ["Qard may be demanded before the promised date."],
      related: ["t7.10", "t7.13"],
      quickCheck: { q: "How did the Prophet (pbuh) treat the funeral of a Companion who died in debt?", options: ["Prayed immediately", "Did not offer the funeral prayer until the debt was taken over by someone", "Waived the debt", "Ordered his property confiscated"], answer: 1, explanation: "p. 161." }
    },
    {
      id: "t7.10", section: "7.10", title: "Instructions for the Creditor", pages: [162, 162], tier: "supporting",
      concepts: ["creditor-duties"],
      intuition: "What does Shari’ah expect of a lender dealing with a struggling debtor?",
      simple: "Creditors are encouraged to give more time or waive part of the debt if the debtor is in difficulty (e.g. Ka‘ab waiving half of Abu Hadrad’s debt). Most jurists forbid punishing genuinely troubled debtors. A creditor cannot demand early payment of a debt with a settled date. But extra time is not the debtor’s right; surplus earnings must go to repayment.",
      academic: ["The Qur’an encourages respite or waiver for debtors in difficulty; the Prophet encouraged politeness and partial waiver (Ka‘ab ibn Malik waived half of Abu Hadrad’s debt). Malikis and Shafi‘is do not allow punishment or arrest of genuinely troubled debtors; Abu Hanifa: imprison a non-payer for two to three months, then enquire and release if genuinely unable. A debt with a settled due date cannot be demanded early unless the debtor transgresses. If the creditor will not give time, he cannot be compelled; even a destitute debtor is not entitled to more time as a right; earnings beyond food needs go to repayment."],
      exam: "Encourage respite/waiver; no punishment of genuinely troubled debtors (Maliki, Shafi‘i); no early demand for dated debt; respite not a debtor’s right.",
      keyPoints: ["Abu Hanifa: short imprisonment then enquiry."],
      related: ["t7.9", "t7.13"],
      quickCheck: { q: "Can a creditor demand early repayment of a debt with a settled due date?", options: ["Yes, any time", "No, so long as the debtor does not transgress the terms", "Only with interest", "Only for Qard al Hasan"], answer: 1, explanation: "p. 162." }
    },
    {
      id: "t7.11", section: "7.11", title: "Husnal Qadha (Gracious Payment) and Current Accounts", pages: [162, 163], tier: "core",
      concepts: ["husnal-qadha", "current-account"],
      intuition: "If paying back a little extra is Sunnah, why can’t banks do it systematically for current accounts?",
      simple: "Repaying more than the principal without precondition is commendable (the Prophet repaid Jabir extra and gave a better camel). But it cannot be a system — that would make loans yield profit. Current accounts in Islamic banks are loans: guaranteed, no profit share, may carry service charges. Some boards allow occasional gifts; most do not favour it.",
      academic: [
        "Repaying in excess without a precondition is commendable (the Prophet repaid Jabir more than owed; ordered a better camel given). But it is a matter of individual discretion; adopted as a system by banks or government it envisages explicit (customary rate) or implicit (expected return, e.g. nominal GNP growth) addition.",
        "Current deposits in Islamic banks are loans repayable on call; they carry no weightage in profit allocation. The OIC Fiqh Council: the obligation to repay is unaffected by the bank’s solvency; such accounts are not eligible for profit as they bear no risk; the relationship is creditor–debtor. Banks may state in account forms that they will invest current funds at their discretion in compliant modes and may take service charges. Departure: some boards (e.g. Faysal Islamic Bank of Sudan) allow varied, non-regular prizes/gifts without prior knowledge; most boards do not favour it. Banks may pass a part of non-fund income to current depositors as a gift, provided no prior inducement and not a systematic return."
      ],
      exam: "Husnal Qadha: extra without precondition commendable, but not as a system. Current accounts = Qard: guaranteed, no profit, service charges allowed; gifts only if no inducement/system (minority boards allow prizes).",
      keyPoints: ["Current accounts carry no weightage.", "Repayment unaffected by bank solvency."],
      definitions: [{ term: "Husnal Qadha", meaning: "Gracious repayment of a loan — giving more than the principal without any precondition." }],
      debate: [{ issue: "Can current account holders receive gifts or prizes?", criticism: "Some Shari’ah boards (e.g. Faysal Islamic Bank of Sudan) permit varied, non-regular prizes for risk-free deposits to help mobilise funds.", response: "Most boards do not favour it; gracious extra payment cannot become a system, or loans would necessarily yield profit.", alternative: "Passing part of non-fund income as an unannounced gift without inducement.", takeaway: "Current accounts earn no profit; any gift must not be pre-arranged or systematic." }],
      related: ["t8.5.2", "t7.7"],
      quickCheck: { q: "According to the predominant ruling, current account holders in Islamic banks:", options: ["Share profits by weightage", "Are not eligible for profit as their deposits bear no risk", "Receive fixed interest", "Bear losses"], answer: 1, explanation: "p. 163." }
    },
    {
      id: "t7.12", section: "7.12", title: "Remitting a Part of a Loan and Prepayment Rebate", pages: [163, 165], tier: "core",
      concepts: ["prepayment-rebate", "murabaha"],
      intuition: "If a Murabaha client pays early, can the bank cut the price? Only as a discretionary rebate, not a contractual promise.",
      simple: "Remitting part of a debt for early payment (“Dha‘awoo wa Ta‘ajjloo”) is allowed by almost all for debts already due, not for debts not yet due. Majority of contemporary scholars and the OIC Fiqh Academy do not allow contractual rebate for early payment in Murabaha. AAOIFI allows a rebate at the bank’s sole discretion if not committed in the contract.",
      academic: [
        "Three traditions: “remit a part and take earlier” (Banu Nadhir’s expulsion); Miqdad accepting 90 for 100 — the Prophet called it Riba; and Ka‘ab waiving half of Abu Hadrad’s due debt. Jurists reconcile: the Banu Nadhir remission concerned accrued Riba (Waqidi: 120 dinars due, 80 principal accepted). Imam Malik: remitting part of a debt for early payment is like increasing a debt for more time — Riba without doubt.",
        "Distinction: Duyun Halah (due/callable) — partial remission for early payment allowed by almost all, not as a condition; Duyun Mu’ajjalah (not yet due) — not allowed (Malik: not permissible to pay less before the due date). Shah Waliullah: the first two instances concerned debts not yet due; Ka‘ab’s was due. Some later Hanafis distinguish Murabaha–Mu’ajjal (where profit was charged for time) and require remission for the remaining period on early payment or death.",
        "The majority of contemporary scholars, the OIC Fiqh Academy and Middle East Shari’ah committees do not allow contractual remission in bank Murabaha, as it resembles interest-based instalment techniques. AAOIFI prohibits contractual rebate (price fixed once) but allows a discretionary rebate if not committed; experts suggest referring each case to the Shari’ah advisor."
      ],
      exam: "Partial remission for early payment: allowed for due debts (Duyun Halah), not for debts not yet due (Duyun Mu’ajjalah). Murabaha: no contractual rebate (OIC, majority); AAOIFI: discretionary rebate if not stipulated; Shari’ah advisor case by case.",
      keyPoints: ["Miqdad’s 90-for-100: the Prophet called it Riba.", "Later Hanafis’ minority view on Murabaha–Mu’ajjal."],
      definitions: [
        { term: "Duyun Halah", meaning: "Debts that have become due or can be called back at any time." },
        { term: "Duyun Mu’ajjalah", meaning: "Debts whose payment time is settled and not yet due." },
        { term: "Dha‘awoo wa Ta‘ajjloo", meaning: "“Remit a part and take earlier” — tradition relating to Banu Nadhir, interpreted as remission of accrued Riba." }
      ],
      related: ["t9.9.5", "t7.10"],
      quickCheck: { q: "What is AAOIFI’s position on rebates for early payment in Murabaha?", options: ["Mandatory rebate", "Contractual rebate prohibited, but a discretionary rebate not committed in the contract is allowed", "Always prohibited", "Allowed only for governments"], answer: 1, explanation: "p. 165." }
    },
    {
      id: "t7.13", section: "7.13", title: "Penalty on Default (and Insolvency of the Debtor)", pages: [165, 167], tier: "core",
      concepts: ["late-payment-penalty", "insolvency"],
      intuition: "Without interest, what stops customers delaying payment? Penalty clauses paid to charity — and compensation for proven actual loss.",
      simple: "Classical jurists preferred imprisonment over fines, and early Islamic banking boards disallowed automatic penalties. Now the OIC Fiqh Council, AAOIFI and Pakistan’s SAB approve contractual penalty clauses, with proceeds to charity. Banks may seek compensation for actual loss via courts/arbitration (not opportunity cost). Some boards allow compensation at the bank’s realised return during the delay. No penalty on Qard al Hasan. If the debtor is genuinely insolvent (Muflis), his assets are sold and distributed pro rata.",
      academic: [
        "Classical jurists generally disfavoured pecuniary penalties, allowing harsh treatment or imprisonment; early Islamic bank boards did not allow automatic penalty clauses in Murabaha–Mu’ajjal lest they become interest. A wilful defaulter resembles a usurper (Ghasib) who must return profits on usurped property; hence scholars later allowed penalties. Default threatens banks, savers and economies — in instalment sales, Murabaha, leasing, PLS profit shares and Salam/Istisna‘a delivery.",
        "Some classical and almost all contemporary scholars allow T‘azir as fines; some Malikis oblige a delaying debtor to pay for charity. The OIC Fiqh Council, AAOIFI and the SAB approve penalty clauses, balancing the problem with keeping the distinction between interest and Murabaha profit; penalties go to charity and cannot be the creditor’s income. Banks may claim liquidated damages decided by a court or independent committee based on actual loss (profit it could have earned on similar investment during delay per this view), proved by the bank — not conventional opportunity cost. Some boards (Al Baraka Sudan fatwa) allow compensation at the bank’s actual realised return during the delay, if harm is material and the debtor solvent and deliberately tardy; nothing if the bank earned nothing.",
        "Penalties apply to Dayn, not Qard: for Qard al Hasan the creditor should give time — a penalty would be usury. OIC Fiqh Council: penalty clauses allowed in all financial debt contracts except Qard al Hasan; void if the client proves the failure was beyond control or the bank suffered no loss.",
        "Insolvency (7.13.1): a Muflis’ fraudulent bankruptcy may be pressed and imprisoned; if genuinely unable, he is declared insolvent, assets sold and proceeds distributed pro rata, with time for the remainder; the State can help resolve. Malik and Shafi‘i allow arrest only if hidden wealth is possible. A seller finding his sold goods intact with the bankrupt has the first right (majority; Abu Hanifa: distribute among all creditors)."
      ],
      exam: "Penalty clauses approved (OIC, AAOIFI, SAB) — proceeds to charity. Compensation only for actual loss via court/arbitration (no opportunity cost); some boards: realised return during delay if debtor solvent and tardy. No penalty on Qard al Hasan; void if beyond control or no loss. Muflis: assets sold, pro rata; seller’s first right to own goods (majority).",
      keyPoints: [
        "Wilful defaulter likened to a usurper (Ghasib).",
        "Penalty is not income.",
        "Al Baraka Sudan: compensation at realised return, only if bank earned it.",
        "Penalty void if default beyond client’s control."
      ],
      subsections: [{ number: "7.13.1", title: "Insolvency of the Debtor", page: 167, points: ["Fraudulent vs genuine bankruptcy", "Assets sold, pro rata distribution", "Seller’s first right to intact goods (majority)"] }],
      definitions: [
        { term: "T‘azir", meaning: "Discretionary punishment — here, fines on wilful defaulters." },
        { term: "Muflis", meaning: "An insolvent/bankrupt debtor." },
        { term: "Ghasib", meaning: "Usurper; a wilful defaulter is likened to one." }
      ],
      distinctions: [{ a: "Penalty (to charity)", b: "Compensation (to bank)", text: "Penalty is a deterrent paid to charity; compensation covers the bank’s proven actual loss, decided by a court or arbitrator, not opportunity cost." }],
      related: ["t3.3.1", "t9.9.4", "t17.4.4"],
      quickCheck: { q: "In which case may a penalty clause NOT be imposed, per the OIC Fiqh Council?", options: ["Murabaha", "Ijarah", "Qard al Hasan", "Istisna‘a"], answer: 2, explanation: "A penalty on Qard al Hasan is usury (pp. 166–167)." }
    },
    {
      id: "t7.14", section: "7.14", title: "Hawalah (Assignment of Debt)", pages: [167, 168], tier: "core",
      concepts: ["hawalah"],
      intuition: "Cheques, drafts and bills of exchange — what classical contract underlies them?",
      simple: "Hawalah transfers a debt from one debtor to another, freeing the original debtor. It may be restricted (paid from the assignor’s property held by the assignee) or unrestricted. Cheques, drafts, pay orders and bills of exchange are forms of Hawalah. It is gratuitous, at face value, immediate, binding, and the debt returns to the assignor if the assignee dies or goes bankrupt (majority).",
      academic: [
        "Hawalah literally means transfer; legally, an agreement by which a debtor is freed by another becoming responsible — replacing one debtor with another. Restricted Hawalah: the assignee pays from the assignor’s assets in his possession; unrestricted: the payer pays from his own funds with recourse to the assignor if paid on his order. It differs from transfer of a right (replacing a creditor). Hawalah travelled to Europe via Spain and Sicily in the 12th century; with Suftajah (a document for paying in another place through a second party), it formed the basis of the bill of exchange. Cheques, drafts, pay orders, remittances, promissory notes, bills of exchange, ODs and endorsements are forms of Hawalah.",
        "Sale of debt (no recourse) is prohibited for Gharar and Riba; assignment (with recourse) is permissible. Hawalah takes effect immediately, not temporary or contingent, though payment may be deferred to a specified date. It is noncommutative: no remuneration for the service; assignment at nominal value with recourse. It is binding. Majority: the obligation returns to the assignor on bankruptcy or death of the assignee. Hadith: “if debt is transferred from your debtor to a trustworthy rich debtor, he should agree” — a recommendation (majority), implying mutual consent. Wakalah may also be used to pay a debt."
      ],
      exam: "Hawalah: transfer of debt to a new debtor; restricted/unrestricted; basis of cheques, drafts, bills (with Suftajah). Gratuitous, at face value, immediate, binding, with recourse (debt returns to assignor on assignee’s bankruptcy/death). Contrast: sale of debt prohibited.",
      keyPoints: ["No remuneration for Hawalah itself.", "Suftajah: payment in another place via a second party."],
      definitions: [
        { term: "Hawalah", meaning: "Assignment of debt: an agreement by which a debtor is freed from a debt by another becoming responsible for it." },
        { term: "Suftajah", meaning: "A document through which payment for purchased goods was made in another place through a second party." }
      ],
      related: ["t6.10", "t13.2", "t5.8"],
      quickCheck: { q: "If the assignee in a Hawalah becomes bankrupt, the majority view is that:", options: ["The debt is extinguished", "The obligation returns to the assignor", "The creditor bears the loss", "The State pays"], answer: 1, explanation: "p. 168." }
    },
    {
      id: "t7.15", section: "7.15", title: "Security/Guarantee (Kafalah) and Pledge (Rihn)", pages: [168, 172], tier: "core",
      concepts: ["kafalah", "rihn"],
      intuition: "What security can an Islamic bank take — and who bears the risk of a pledged asset?",
      simple: "Kafalah: a third party becomes surety for a debt. Rihn: the debtor pledges an asset. The pledged asset remains the pledger’s — its gains and losses are his; the pledgee holds it in trust. The pledge cannot be ‘foreclosed’ (appropriated) but can be sold through the court or an irrevocable power of attorney, with any excess returned. A bank-pledgee may benefit in return for maintenance; excess income goes to the pledger.",
      academic: [
        "A lender may demand security; the Prophet borrowed from a Jew against his iron breastplate. 2:283 shows a pledge is permissible, at home or journey, even with non-Muslims. Two forms: Kafalah (suretyship — a third party becomes surety for payment; scope known, no preconditions) and Rihn (pledge by the debtor), both based on consent; Rihn is also a trusteeship. The creditor may claim from debtor and surety; a surety who pays can recover from the debtor and may receive Zakat (Gharimeen). If the guarantor agrees to assume the debt, it becomes Hawalah. A delay to the debtor extends to the surety, not vice versa. Surety of a surety is lawful; joint sureties are each liable for their share, successive sureties each for the whole. Goods held in trust (pledged to him, or leased) cannot be offered as guarantee.",
        "Bank securities: letters of guarantee, post-dated cheques, promissory notes, frozen deposits, third-party guarantees, Hamish Jiddiyah and ‘Arbun. Whatever can be sold can be pledged, encumbered to the extent of the debt; a share in joint property can be pledged.",
        "Risk and reward (7.15.1): “Pledge cannot be foreclosed; its Ghunm (accession) is for the pledger and its Ghurm (loss) upon him.” If destroyed without the pledgee’s negligence, the loss is the pledger’s; the pledgee recovers the loan. The pledge covers only the debt; excess belongs to the pledger. ‘Cannot be foreclosed’ means it must remain redeemable, not wrongfully appropriated; a clause that it passes to the pledgee in place of debt is invalid. On default the pledgee applies to court to sell, or holds an irrevocable power of attorney to sell and remit any excess.",
        "Benefits (7.15.2): a pledged animal may be ridden and milked in return for its maintenance. Views: some Hanafis — no benefit even with permission (Riba); most Hanafis — with permission if not stipulated; Shafi‘i — benefit is the pledger’s; Maliki — pledger’s, but the pledgee may benefit if the debt arose from sale (not Qard), stipulated and time-bound; Hanbali — with permission. No condition in the loan contract giving the pledgee benefit is valid; extra income over expenses should go to the pledger. So a bank as pledgee may benefit for maintenance (e.g. a house), charge a customary service rate or lease it on, passing excess rental to the pledger. Possessory lien is permissible by analogy with a cash seller; mortgage without possession is allowed by contemporary scholars by analogy."
      ],
      exam: "Kafalah (third-party surety) vs Rihn (debtor’s pledge, held in trust). Pledger bears risk and reward (Ghunm/Ghurm); pledge covers debt only; no foreclosure-appropriation, sale via court/power of attorney with excess returned. Pledgee benefit only for maintenance; excess to pledger. Lien and mortgage allowed.",
      keyPoints: [
        "Surety who pays may receive Zakat as Gharim.",
        "Successive sureties each liable for the whole.",
        "Clause transferring the pledge in lieu of debt is invalid.",
        "No condition in a Qard giving pledgee benefit."
      ],
      subsections: [
        { number: "7.15.1", title: "Risk and Reward in Pledge", page: 170, points: ["Ghunm and Ghurm with pledger", "Covers debt only", "Sale via court or power of attorney"] },
        { number: "7.15.2", title: "Benefits from Pledge", page: 171, points: ["Benefit in return for maintenance", "School views", "Excess to pledger; lien and mortgage"] }
      ],
      definitions: [
        { term: "Kafalah", meaning: "Suretyship: a third party becomes surety for payment of a debt or liability." },
        { term: "Rihn", meaning: "Pledge: the debtor hands over property as security; the creditor holds it as a trust." },
        { term: "Possessory lien", meaning: "Right to retain another’s property until a debt due from him is paid." }
      ],
      distinctions: [{ a: "Kafalah", b: "Rihn", text: "Kafalah involves a third-party surety; Rihn involves the debtor’s own asset pledged as security." }],
      related: ["t14.6", "t7.14", "t5.6.1"],
      quickCheck: { q: "A pledged asset is destroyed without any negligence by the pledgee. Whose loss is it?", options: ["The pledgee’s", "The pledger’s (debtor’s)", "Shared equally", "The surety’s"], answer: 1, explanation: "p. 170." }
    },
    {
      id: "t7.16", section: "7.16", title: "Bai‘ al Dayn (Sale of Debt/Debt Instruments)", pages: [172, 172], tier: "core",
      concepts: ["bai-dayn", "sukuk"],
      intuition: "Malaysian practice allowed trading debt-based Sukuk at a discount. What is the wider view?",
      simple: "Some Malaysian experts allow Bai‘ al Dayn at a discount (citing the Shafi‘i school), but the Jamhoor Ulama, the overwhelming majority of contemporary scholars and the OIC Fiqh Council (unanimously, including Malaysia) prohibit it; Shafi‘i jurists allowed it only at par.",
      academic: ["Secondary trading of debt-based securities via Bai‘ al Dayn occurs in some Malaysian Sukuk; the Jamhoor do not accept it even if debts are asset-supported. Traditional jurists unanimously disallow sale of debt at discount or premium, as do most contemporary scholars. Malaysian experts cite the Shafi‘i school but overlook that Shafi‘is allowed it only at par. Rosly and Sanusi: trading Islamic bonds at discount via Bai‘ al Dayn is unacceptable to the Jumhur including al-Shafi‘i. The OIC Islamic Fiqh Council, with representation of all Islamic countries including Malaysia, unanimously approved the prohibition."],
      exam: "Bai‘ al Dayn at discount/premium prohibited (Jamhoor, OIC unanimously); Malaysian minority practice relies on Shafi‘i view which allowed only par value.",
      keyPoints: ["OIC decision unanimous, including Malaysia."],
      debate: [{ issue: "Can debt-based Sukuk be traded at a discount?", criticism: "Some Malaysian experts allow Bai‘ al Dayn, citing the Shafi‘i school.", response: "Shafi‘i jurists allowed debt sale only at par; the Jamhoor, most contemporary scholars and the OIC Fiqh Council unanimously prohibit it.", alternative: "Malaysian minority practice.", takeaway: "Debt instruments cannot be sold at a price other than face value." }],
      related: ["t6.10", "t15.3.6"],
      quickCheck: { q: "How did the OIC Islamic Fiqh Council decide on Bai‘ al Dayn?", options: ["Allowed at discount", "Prohibited unanimously", "Allowed for Sukuk", "Left to each country"], answer: 1, explanation: "p. 172." }
    },
    {
      id: "t7.17", section: "7.17", title: "Impact of Inflation on Loans/Debts", pages: [172, 174], tier: "core",
      concepts: ["indexation"],
      intuition: "Rs.100 lent today may buy less next year. Can the lender ask for Rs.120?",
      simple: "Indexation of loans/debts to any currency, basket or gold is rejected by Shari’ah scholars, courts and boards (FSC Pakistan 1991: indexed Rs.100 → Rs.120 is Riba Al-Nasiah and Al-Fadl). The same units must be returned regardless of value changes. One may lend in gold or a stable currency, but the liability cannot increase. OIC (1993): parties may agree on the settlement day to pay in another currency at that day’s rate.",
      academic: [
        "Scholars and courts have not accepted indexing loans/debts to currencies or gold. The FSC (14 November 1991, paras 153–234) reviewed Hidaya, Al-Mabsut, Bada‘i, Al Jaziri and others: indexing Rs.100 to Rs.120 is Riba Al-Nasiah and Riba Al-Fadl. Al Jaziri: loans require equality — return the same quantity whatever the price change. Kasani: lending depreciated coins on condition of repayment in good coins is illegal; any stipulated benefit is Riba. Ibn Qudama: repay the same coins irrespective of increase or decrease in value. Justice Khalilur Rahman (SAB): debts settled equally in units; alternatives are Bai‘ Mu’ajjal or partnership, where the margin or realised profit accommodates concerns. Al Jaziri’s example: 4 lb of meat bought on credit at 5 qirsh (20 total) — still 20 if meat falls to 2.",
        "Lending is gratuitous; loss of value to inflation is a greater virtue. The OIC Fiqh Council forbids indexation to cost of living, interest rates, GNP growth, gold or commodities; one may lend in terms of gold or a stable currency without the liability increasing. Depreciation affects money whether lent or kept; indexing draws benefit from the loan. OIC 8th session (1993): on the settlement day (not before), parties may agree to settle in another currency at that day’s rate; instalments likewise; at contracting, parties may agree to settle a deferred price/salary in various currencies or a given amount of gold; a debt in a specific currency should not be recorded in its gold/other-currency counter value."
      ],
      exam: "No indexation (FSC 1991; OIC). Return same units. Lend in gold/stable currency allowed without increase. OIC 1993: settle in another currency only by agreement on settlement day at that day’s rate.",
      keyPoints: [
        "Indexed Rs.100 → Rs.120 = Riba Al-Nasiah and Al-Fadl (FSC).",
        "Meat example: 20 qirsh remains 20.",
        "Settlement-day currency conversion allowed at prevailing rate."
      ],
      examples: [{ title: "Meat bought on credit (Al Jaziri)", kind: "textbook", text: "A buys 4 pounds of meat on credit at 5 qirsh per pound (20 qirsh). If the price falls to 2 qirsh per pound at payment, A still pays 20 qirsh, not 8." }],
      related: ["t4.7.4", "t3.2.1.c"],
      quickCheck: { q: "Under the OIC Fiqh Council (1993), when may parties agree to settle a debt in a currency other than the one specified?", options: ["At the time of contract, at that day’s rate", "On the day of settlement, at the rate prevailing on that date", "Never", "At any time at an inflation-adjusted rate"], answer: 1, explanation: "p. 174." }
    }
  ],
  summary: "Islamic banks create debt through sale and lease contracts and take some current deposits as loans, so the rules on loans and debts are crucial. Only the principal of a loan or debt is payable; any addition is Riba, and no time value can be assigned once a receivable is stipulated. Gracious extra repayment without precondition is commendable but cannot be a system. Debtors must repay; creditors are urged to be lenient; security may be taken. Penalty clauses paid to charity are approved, with compensation for actual (not opportunity) loss through courts or arbitration. Contractual prepayment rebates are not allowed, though AAOIFI allows discretionary rebates. Debts may be assigned by Hawalah with recourse; sale of debt is prohibited. A bank-pledgee may benefit in return for maintenance with any excess going to the pledger. Debts are repaid without indexation, though lending in gold or a stable currency is allowed.",
  takeaways: [
    "Qard, Salaf, Dayn, ‘Ariyah — know the differences.",
    "Any stipulated benefit on a loan is Riba.",
    "Current accounts: loans, no profit, service charges allowed.",
    "No contractual rebate; discretionary rebate (AAOIFI).",
    "Penalty to charity; compensation only for actual loss; none on Qard al Hasan.",
    "Hawalah with recourse; sale of debt prohibited.",
    "Pledger bears pledge risk; pledgee benefit only for maintenance.",
    "No indexation; settlement-day currency switch at that day’s rate."
  ],
  checklist: [
    "Can you define Qard, Salaf, Dayn and ‘Ariyah?",
    "Can you explain why a quality benefit on a loan is Riba?",
    "Can you explain the treatment of current accounts?",
    "Can you distinguish Duyun Halah and Mu’ajjalah for rebates?",
    "Can you explain penalty vs compensation on default?",
    "Can you explain Hawalah and how it differs from sale of debt?",
    "Can you explain risk, reward and benefit in a pledge?",
    "Can you state the rulings on indexation?"
  ],
  flashcards: [
    { id: "f7.1", cat: "Definitions", front: "Qard", back: "Giving anything of value to another by way of virtue, to be repaid in same or similar amount on demand or at the settled time.", topic: "t7.2" },
    { id: "f7.2", cat: "Comparisons", front: "Qard vs ‘Ariyah", back: "Qard: a similar item is returned. ‘Ariyah: free use of a nonconsumable item; exactly the same item is returned.", topic: "t7.2" },
    { id: "f7.3", cat: "Prohibitions", front: "Is a benefit in quality on a loan Riba?", back: "Yes — e.g. lending debased coins for good coins; any stipulated benefit in quantity or quality, gift or ancillary contract is Riba.", topic: "t7.3" },
    { id: "f7.4", cat: "Banking", front: "Current accounts in Islamic banks", back: "Treated as loans: guaranteed, repayable on call, no profit weightage; service charges allowed; OIC: repayment unaffected by bank solvency.", topic: "t7.11" },
    { id: "f7.5", cat: "Arabic terminology", front: "Husnal Qadha", back: "Gracious repayment — paying more than principal without precondition; commendable individually but cannot be adopted as a system.", topic: "t7.11" },
    { id: "f7.6", cat: "Contract rules", front: "Remission for early payment: due vs not-yet-due debt", back: "Allowed for Duyun Halah (due debts) by almost all; not for Duyun Mu’ajjalah (not yet due).", topic: "t7.12" },
    { id: "f7.7", cat: "Banking", front: "AAOIFI on prepayment rebate in Murabaha", back: "Contractual rebate prohibited (price fixed once); a discretionary rebate not committed in the contract is allowed.", topic: "t7.12" },
    { id: "f7.8", cat: "Risk", front: "Penalty vs compensation on default", back: "Penalty clause: proceeds to charity. Compensation: actual loss (not opportunity cost), decided by court/arbitrator; none on Qard al Hasan.", topic: "t7.13" },
    { id: "f7.9", cat: "Exam facts", front: "When does a penalty clause become void (OIC)?", back: "When the client proves failure was beyond his control, or that the bank incurred no loss.", topic: "t7.13" },
    { id: "f7.10", cat: "Definitions", front: "Hawalah", back: "Assignment of debt: a debtor is freed by another becoming responsible. Gratuitous, at face value, immediate, binding, with recourse.", topic: "t7.14" },
    { id: "f7.11", cat: "Banking", front: "Banking products that are forms of Hawalah", back: "Cheques, drafts, pay orders, remittances, promissory notes, bills of exchange, ODs, endorsements.", topic: "t7.14" },
    { id: "f7.12", cat: "Comparisons", front: "Kafalah vs Rihn", back: "Kafalah: third-party surety for the debt. Rihn: the debtor pledges an asset, held by creditor as trust.", topic: "t7.15" },
    { id: "f7.13", cat: "Risk", front: "Who bears the risk of a pledged asset?", back: "The pledger (owner): “its Ghunm is for him and its Ghurm upon him.” Pledgee is a trustee unless negligent.", topic: "t7.15" },
    { id: "f7.14", cat: "Contract rules", front: "Can a pledgee bank use a pledged house?", back: "It may benefit in return for maintenance, charge a customary service rate or lease it; income above expenses/customary rate goes to the pledger.", topic: "t7.15" },
    { id: "f7.15", cat: "Exam facts", front: "OIC position on Bai‘ al Dayn", back: "Prohibited unanimously (including Malaysia); Shafi‘i jurists allowed debt sale only at par.", topic: "t7.16" },
    { id: "f7.16", cat: "Exam facts", front: "FSC Pakistan (1991) on indexation", back: "Indexing Rs.100 to Rs.120 falls under Riba Al-Nasiah and Riba Al-Fadl — not permitted.", topic: "t7.17" }
  ],
  questions: [
    { id: "q7.1", type: "match", q: "Match each term to its description.", pairs: [["Qard", "Benevolent loan, similar repaid on demand"], ["Salaf", "Loan for a fixed time (also Salam)"], ["Dayn", "Liability from a credit transaction"], ["‘Ariyah", "Free use; same item returned"]], explanation: "Section 7.2.", topic: "t7.2", diff: "E", level: "recall", obj: "Define loan-related terms" },
    { id: "q7.2", type: "tf", q: "Lending debased coins on condition that good coins be repaid is permissible because the number of coins is equal.", answer: false, explanation: "An increase in quality is Riba (p. 158).", topic: "t7.3", diff: "M", level: "understanding", obj: "Apply the rule on benefits in loans" },
    { id: "q7.3", type: "mcq", q: "Why can Islamic banks not share profit with current account holders under the predominant ruling?", options: ["Current accounts are Mudarabah", "They are loans not subject to risk, so no return is payable", "Profits are too small", "AAOIFI forbids current accounts"], answer: 1, explanation: "p. 163.", topic: "t7.11", diff: "E", level: "understanding", obj: "Explain current account treatment" },
    { id: "q7.4", type: "scenario", q: "A Murabaha client wants to repay three years early and asks the bank for a contractual rebate. Following AAOIFI, the bank:", options: ["Must give a rebate stated in the contract", "Cannot commit a rebate in the contract but may give one at its sole discretion", "Must charge extra", "Must refuse early payment"], answer: 1, explanation: "p. 165.", topic: "t7.12", diff: "M", level: "application", obj: "Apply rebate rules" },
    { id: "q7.5", type: "multi", q: "Which statements on default penalties are correct according to Chapter 7? (Select all.)", options: ["Penalty proceeds go to charity", "Compensation can be based on conventional opportunity cost", "Penalty clauses cannot be applied to Qard al Hasan", "A penalty becomes void if default was beyond the client’s control", "Penalties may be credited to the bank’s income"], answer: [0, 2, 3], explanation: "pp. 165–167.", topic: "t7.13", diff: "M", level: "understanding", obj: "Explain penalty rules" },
    { id: "q7.6", type: "application", q: "A client deliberately delays paying a Murabaha instalment for three months. Under the Al Baraka Sudan fatwa, the bank may seek compensation calculated as:", options: ["A fixed 20% penalty", "The bank’s actual realised return on investment during those three months, if any", "The prevailing interest rate", "Double the instalment"], answer: 1, explanation: "p. 166.", topic: "t7.13", diff: "H", level: "application", obj: "Apply compensation methods" },
    { id: "q7.7", type: "identify", q: "Cheques, drafts and bills of exchange are modern forms of which contract?", options: ["Kafalah", "Hawalah", "Rihn", "Ju‘alah"], answer: 1, explanation: "p. 168.", topic: "t7.14", diff: "E", level: "recall", obj: "Identify Hawalah applications" },
    { id: "q7.8", type: "comparison", q: "What distinguishes assignment of debt (Hawalah) from the prohibited sale of debt?", options: ["Hawalah is at a discount", "In Hawalah there is recourse to the assignor/original debtor if the assignee does not pay", "Sale of debt is gratuitous", "No difference"], answer: 1, explanation: "p. 168.", topic: "t7.14", diff: "M", level: "understanding", obj: "Compare Hawalah and debt sale" },
    { id: "q7.9", type: "scenario", q: "A loan agreement states that if the borrower fails to pay, the pledged land automatically becomes the lender’s property in place of the debt. This clause is:", options: ["Valid", "Invalid — the pledge must remain redeemable; sale via court/power of attorney with excess returned", "Required by Shari’ah", "Valid only for banks"], answer: 1, explanation: "p. 170.", topic: "t7.15", diff: "M", level: "application", obj: "Apply pledge rules" },
    { id: "q7.10", type: "tf", q: "The OIC Fiqh Council allows parties, on the day of settlement, to agree to settle a debt in another currency at the exchange rate prevailing on that date.", answer: true, explanation: "p. 174.", topic: "t7.17", diff: "M", level: "recall", obj: "Recall inflation-related rulings" },
    { id: "q7.11", type: "mcq", q: "Which statement about the Malaysian practice of Bai‘ al Dayn is correct according to the author?", options: ["It is accepted by the Jamhoor", "It relies on a Shafi‘i view that actually allowed debt sale only at par", "The OIC endorsed it", "It is permitted at a premium only"], answer: 1, explanation: "p. 172.", topic: "t7.16", diff: "H", level: "analysis", obj: "Evaluate debt-sale practice" },
    { id: "q7.12", type: "short", q: "Explain why gracious extra repayment (Husnal Qadha) cannot be adopted as a system by banks.", answer: "Extra repayment is commendable only when given freely without precondition. As a system, depositors would expect an explicit (customary rate) or implicit (e.g. nominal GNP growth) addition, so the loan would necessarily yield a profit — which is Riba and contrary to Islamic finance.", keywords: ["precondition", "system", "expected", "profit", "Riba"], explanation: "Section 7.11.", topic: "t7.11", diff: "H", level: "analysis", obj: "Analyse gracious repayment" },
    { id: "q7.13", type: "order", q: "Order the steps when a genuinely insolvent debtor cannot pay (Section 7.13.1).", items: ["Ensure bankruptcy is not fraudulent", "Declare the debtor insolvent (Muflis)", "Sell his assets", "Distribute proceeds among creditors pro rata; give time for the rest"], explanation: "p. 167.", topic: "t7.13", diff: "M", level: "understanding", obj: "Describe insolvency procedure" }
  ],
  exam: [
    { id: "e7.1", kind: "long", q: "Discuss the Shari’ah rules governing default by clients of Islamic banks, including penalties, compensation and insolvency.", structure: ["Classical position", "Why contemporary scholars allowed penalties (Ghasib analogy)", "Penalty clauses and charity", "Compensation: actual loss vs opportunity cost; Al Baraka Sudan approach", "Qard vs Dayn distinction; OIC conditions voiding penalty", "Insolvency (Muflis) and seller’s first right"], keyConcepts: ["T‘azir", "liquidated damages", "Muflis"], points: ["Penalty not income", "Court/arbitrator decides compensation"], mistakes: ["Allowing penalty as bank income", "Applying penalty to Qard al Hasan"], topic: "t7.13" },
    { id: "e7.2", kind: "difference", q: "Differentiate between Hawalah, Kafalah and Rihn.", structure: ["Definitions", "Parties", "Recourse and liability", "Bank applications"], keyConcepts: ["assignment", "surety", "pledge"], points: ["Hawalah replaces debtor", "Kafalah adds surety", "Rihn: debtor’s asset in trust"], mistakes: ["Confusing Hawalah with sale of debt"], topic: "t7.14" },
    { id: "e7.3", kind: "short", q: "Can an Islamic bank give a rebate on early settlement of Murabaha? Discuss.", structure: ["Traditions and reconciliation", "Due vs not-yet-due debts", "Contemporary positions (OIC, AAOIFI)", "Practical recommendation"], keyConcepts: ["Duyun Halah", "Duyun Mu’ajjalah"], points: ["Discretionary only"], mistakes: ["Stating rebates are prohibited in all cases"], topic: "t7.12" },
    { id: "e7.4", kind: "conceptual", q: "Why is indexation of loans to inflation not permissible in Islamic finance?", structure: ["Equality in loans", "FSC and classical references", "Depreciation argument", "OIC rulings and alternatives"], keyConcepts: ["indexation", "Riba Al-Nasiah", "Riba Al-Fadl"], points: ["Lend in gold/stable currency without increase", "Settlement-day conversion"], mistakes: ["Suggesting inflation-linked repayment is compensation, not Riba"], topic: "t7.17" },
    { id: "e7.5", kind: "viva", q: "Who bears the loss if a pledged car is destroyed in an accident without the bank’s fault?", structure: ["Pledger’s ownership", "Ghunm/Ghurm Hadith"], keyConcepts: ["Rihn"], points: ["Bank still recovers the loan"], mistakes: ["Placing the loss on the pledgee"], topic: "t7.15" }
  ]
});
