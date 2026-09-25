/* Chapter 5 — Islamic Law of Contracts and Business Transactions. Source pp. 101–128. */
IFL_DATA.registerChapter({
  number: 5,
  title: "Islamic Law of Contracts and Business Transactions",
  part: "part-ii",
  pages: [101, 128],
  minutes: 70,
  difficulty: "Intermediate",
  objectives: [
    "Define Mal, ‘Ain and Dayn, Mabi‘ and Thaman, and the three types of ownership.",
    "Distinguish Mithaq, ‘Ahd/Wa‘dah and ‘Aqd, and explain where promises are used by Islamic banks.",
    "Identify the elements of a contract and the conditions of offer, acceptance and subject matter.",
    "Apply the broad rules for the validity of Mu‘amalat, including the prohibition of two contingent contracts.",
    "Explain when a promise is binding (OIC Fiqh Academy conditions), Hamish Jiddiyah and ‘Arbun.",
    "Classify contracts as valid (Nafiz/Mawquf, Lazim/Ghair Lazim), Fasid and Batil and state their legal effects.",
    "Classify commutative and gratuitous contracts and explain the effect of void conditions on each."
  ],
  why: "Every Islamic finance product is a bundle of classical contracts. Knowing when a contract is valid, voidable or void — and when a promise binds — is what allows a banker or student to judge whether a Murabaha, Ijarah or Diminishing Musharakah structure is sound.",
  overview: "Starting from the concepts of wealth (Mal), usufruct and ownership, the chapter sets out the terminology of covenants, promises and contracts, the elements of a contract, broad validity rules, the binding nature of promises (with token money and ‘Arbun), the Hanafi three-way classification of contracts, commutative versus gratuitous contracts, and conditional contracts.",
  summarySection: "5.10",
  topics: [
    {
      id: "t5.1", section: "5.1", title: "Introduction: Why the Law of Contracts Matters", pages: [101, 101], tier: "revision",
      concepts: ["aqd"],
      intuition: "Islamic banks trade, lease, partner, guarantee and assign debts. How do we know each deal is valid?",
      simple: "Property is sacred in Islam. Beyond the main prohibitions, each contract type has features that must conform to Shari’ah; non-conforming contracts are invalid. Since IFIs use sale, lease, partnership, suretyship, agency, assignment and mortgage, they need the framework of the Islamic law of contracts.",
      academic: ["Islam forbids unlawful devouring of others’ property through theft, embezzlement, bribery, cheating and other unlawful means, in addition to Riba, Gharar and Qimar. Contracts not conforming to Shari’ah tenets, or involving prohibited elements, are invalid. The chapter covers general principles, elements, conditions of subject matter, capacity of parties, classification by validity, consideration and causes and effects of invalidity."],
      exam: "IFIs deal through contracts (sale, lease, partnership, suretyship, agency, assignment, mortgage); validity per Islamic law of contracts is essential.",
      keyPoints: ["Property is as sacred as life and honour."],
      related: ["t5.2", "t5.4"],
      quickCheck: { q: "Which of these is NOT among the contracts the chapter lists as used by IFIs?", options: ["Sale", "Leasing", "Gambling", "Assignment of debt"], answer: 2, explanation: "p. 101." }
    },
    {
      id: "t5.2", section: "5.2", title: "Mal (Wealth), Usufruct and Ownership", pages: [101, 103], tier: "core",
      concepts: ["mal", "ownership", "ain-dayn", "mithli-qimi"],
      intuition: "Before you can sell or lease something, what kind of ‘thing’ is it — and what exactly do you own?",
      simple: "Mal is anything of value that can be possessed and lawfully used (including intangible rights). Property may be ‘Ain (specific) or Dayn (non-specific obligation). Money is Thaman (price), not Mabi‘ (subject of sale). Ownership can be of the asset, of a debt, or of usufruct. Owning an asset includes its usufruct, but not vice versa. Mithli (fungible) goods suit Salam; Qimi (non-fungible) goods suit Istisna‘a.",
      academic: [
        "Wealth is anything usable with legal and material value — valuable, possessable and of legitimate use, including abstract rights like trademarks. Fiduciary money is Mal, serving as a medium of exchange and standard of value, but is not itself a subject of sale. Property is movable/immovable, fungible/nonfungible, and determinate (‘Ain) or indeterminate (Dayn). Dayn is the obligation to pay any units of the relevant property equivalent to the obligation (gold, silver, currency, grain).",
        "Islamic law distinguishes Mabi‘ (subject of sale) and Thaman (price). Currency notes and debt certificates are not a valid subject of sale (in exchange of homogeneous currencies) — they are Thaman, like Fulus whose value exceeded intrinsic value.",
        "Ownership categories: Milk ul‘Ain (asset), Milk ud Dayn (debt), Milk ul Manf‘at (usufruct). Ownership of ‘Ain includes its Manf‘at, not the reverse — in Ijarah usufruct passes to the lessee while ownership stays with the lessor; an Ijarah that transfers ownership automatically is void. Milk ul‘Ain is definite and not time-related: a credit seller cannot take back the sold item, only claim the price. Milk ul Manf‘at is time-related, so Ijarah needs a specified period.",
        "Mithli (Zwatul Amthal) goods have similar units (particular varieties of wheat, vehicles of a given trademark); Qimi (Zwatul Qiyam) goods are unique (paintings, gems, buildings). Salam is for Mithli goods; Istisna‘a for Qimi. Bai‘ al ‘Inah (sale and buy-back) is prohibited by the majority; sale and lease-back is allowed by almost all."
      ],
      exam: "Mal: valuable, possessable, legitimate use. ‘Ain (specific) vs Dayn (obligation). Mabi‘ vs Thaman (money = Thaman). Ownership: Milk ul‘Ain, Milk ud Dayn, Milk ul Manf‘at; asset ownership includes usufruct, not vice versa; usufruct is time-bound. Mithli → Salam; Qimi → Istisna‘a.",
      keyPoints: [
        "Intangible rights (trademarks, IP) are Mal.",
        "Money is Thaman, not Mabi‘.",
        "Ijarah with automatic ownership transfer is void.",
        "A credit seller cannot take back sold goods — only claim the price.",
        "‘Inah prohibited by majority; sale and lease-back allowed."
      ],
      definitions: [
        { term: "Mal", meaning: "Anything usable with legal and material value — valuable, possessable and of legitimate use; includes intangible rights." },
        { term: "‘Ain / Dayn", meaning: "‘Ain: specific, determinate property. Dayn: indeterminate property / an obligation to pay units equivalent to it." },
        { term: "Mabi‘ / Thaman", meaning: "The subject matter of a sale / the price." },
        { term: "Milk ul‘Ain, Milk ud Dayn, Milk ul Manf‘at", meaning: "Ownership of an asset, of a debt, and of usufruct respectively." },
        { term: "Mithli / Qimi", meaning: "Fungible goods with similar units / non-fungible goods whose units differ in value." }
      ],
      distinctions: [
        { a: "Milk ul‘Ain", b: "Milk ul Manf‘at", text: "Asset ownership is definite and not time-bound and includes usufruct; usufruct ownership is time-bound and does not include the asset." },
        { a: "Mithli goods", b: "Qimi goods", text: "Mithli (e.g. a wheat variety) can be the subject of Salam; Qimi (e.g. a building) is used in Istisna‘a." }
      ],
      related: ["t5.2.1", "t10.4.1", "t10.11.2", "t11.2"],
      quickCheck: { q: "Which statement about ownership is correct?", options: ["Owning usufruct means owning the asset", "Owning an asset includes owning its usufruct, but not vice versa", "Usufruct ownership is not time-related", "Ijarah automatically transfers ownership"], answer: 1, explanation: "p. 102." }
    },
    {
      id: "t5.2.1", section: "5.2.1", title: "Defining Related Terms: Mithaq, ‘Ahd/Wa‘dah and ‘Aqd", pages: [103, 105], tier: "core",
      concepts: ["aqd", "wad"],
      intuition: "A covenant, a promise and a contract all involve commitment. How are they different — and which do Islamic banks use?",
      simple: "Mithaq is a solemn covenant (treaties, marriage). ‘Ahd or Wa‘dah is a (usually unilateral) promise. ‘Aqd is a contract: offer and acceptance joined so that they affect the subject matter. Islamic banks use promises in MPO, Ijarah Muntahia-bi-Tamleek, sale and lease-back, Diminishing Musharakah and disposal of Salam/Istisna‘a goods, and contracts on both deposit and asset sides.",
      academic: [
        "Mithaq: an earnest covenant with more sanctity than ordinary contracts — covenant with God (13:20), treaties (8:72; 4:90), marriage (4:21); more relevant to religious and social covenants. ‘Ahd: a unilateral promise or undertaking, sometimes bilateral; termed Wa‘dah in Fiqh literature.",
        "‘Aqd (lexically conjunction/tie) = contract. Definitions: conjunction of an offer from one party with acceptance by the other affecting the subject matter (Murshid al-Hayran); undertaking obligations by two parties via Ijab and Qabul (Majallah); a legal relationship from two declarations (Al ‘Inayah); concurrence of two wills to create, shift or relinquish an obligation (Sanhuri). General sense: any earnest act, even unilateral (Waqf, debt remission); specific sense: offer plus acceptance with legal consequences.",
        "Promises used by IFIs: MPO (client promises to buy at cost plus profit); Ijarah Muntahia-bi-Tamleek and Ijarah Sukuk (promise to sell/buy/gift at the end); sale and lease-back; Diminishing Musharakah (promise to purchase units); disposal of Salam and Istisna‘a goods. Contracts: Amanah, Qard, Shirkah, Wakalah with depositors; Bai‘, Ijarah, Ujrah, Shirkah, Wakalah, Kafalah, Ju‘alah and Hawalah with fund users."
      ],
      exam: "Mithaq = solemn covenant; ‘Ahd/Wa‘dah = promise (unilateral); ‘Aqd = contract (Ijab + Qabul with legal effects). Promises in MPO, IMBT, sale-lease-back, DM, Salam/Istisna‘a disposal.",
      keyPoints: ["‘Aqd has general and specific senses.", "Promise is a key tool alongside contracts."],
      definitions: [
        { term: "Mithaq", meaning: "Covenant — earnest, firm determination to fulfil obligations, more sacred than ordinary contracts." },
        { term: "‘Ahd / Wa‘dah", meaning: "A unilateral promise or undertaking (sometimes bilateral)." },
        { term: "‘Aqd", meaning: "Contract: conjunction of offer (Ijab) and acceptance (Qabul) creating legal consequences for the subject matter." }
      ],
      related: ["t5.6", "t9.8.2", "t11.5.1"],
      quickCheck: { q: "Which term best matches ‘a unilateral promise or undertaking’?", options: ["Mithaq", "‘Ahd/Wa‘dah", "‘Aqd", "Qabul"], answer: 1, explanation: "p. 103." }
    },
    {
      id: "t5.3", section: "5.3", title: "General Framework of Contracts", pages: [105, 106], tier: "supporting",
      concepts: ["general-permissibility", "aqd"],
      intuition: "Why are jurists relatively free to design new contracts, but not new forms of worship?",
      simple: "Ibadat (worship) are fixed by express command; Mu‘amalat (transactions) are permissible unless prohibited. In transactions, the apparent wording of the contract governs, not hidden intent. Contracts with an immoral or harmful underlying purpose are void.",
      academic: ["Ibadat are universal truths unaffected by time; Mu‘amalat may change with time and space. Ibn Taymiyah: devotional acts need express sanction, while transactions are governed by permissibility and absence of prohibition — giving jurists liberty to solve emerging issues. Businesses operate as sole proprietorship, Shirkah, Wakalah, Ujrah, or through sale and lease, subject to rules constituting the Islamic law of contracts. In Mu‘amalat the apparent wording or writing has legal effect; a party cannot plead a different intent (Niyyah) — whereas in Ibadat intent matters. The motivating cause must accord with Shari’ah: contracts promoting immorality, against public policy or harmful to third parties are void (e.g. selling a weapon to a known criminal)."],
      exam: "Ibadat: express sanction needed. Mu‘amalat: permissible unless prohibited (Ibn Taymiyah). In transactions, apparent wording governs, not Niyyah. Immoral/harmful purpose → void.",
      keyPoints: ["Apparent wording governs in Mu‘amalat.", "Selling a weapon to a known criminal is invalid."],
      distinctions: [{ a: "Ibadat", b: "Mu‘amalat", text: "Ibadat require express sanction and intent matters; Mu‘amalat are permissible unless prohibited and the apparent wording governs." }],
      related: ["t2.2.1", "t5.5"],
      quickCheck: { q: "In Mu‘amalat, which has legal consequence?", options: ["The hidden intention (Niyyah) only", "The apparent wording/format of the contract", "Neither", "Only verbal statements"], answer: 1, explanation: "p. 105." }
    },
    {
      id: "t5.4", section: "5.4", title: "Elements of a Contract", pages: [106, 106], tier: "core",
      concepts: ["aqd"],
      intuition: "What must be present for any contract to exist?",
      simple: "Three essential elements: the form (offer and acceptance — Sighah), the contracting parties (‘Aqidain), and the subject matter (Ma‘qud ‘alayh). Sanhuri lists seven components.",
      academic: ["A contract requires two capable (mature, sane) parties, offer and acceptance, a legal basis of union between the declarations and obligations, and freedom from prohibited factors. Jurists generally hold three essential elements — Sighah (form), ‘Aqidain (parties), Ma‘qud ‘alayh (subject matter); absent these the contract is invalid. Sanhuri’s seven: concurrence of offer and acceptance; unity of Majlis; plurality of parties; sanity/power of distinction; subject matter susceptible to delivery; defined object (Mahall); beneficial nature of the object (trade permitted)."],
      exam: "Three elements: Sighah (offer & acceptance), ‘Aqidain (parties), Ma‘qud ‘alayh (subject matter). Sanhuri’s seven components.",
      keyPoints: ["Parties must be mature and sane."],
      definitions: [
        { term: "Sighah", meaning: "Form of the contract — offer and acceptance." },
        { term: "‘Aqidain", meaning: "The contracting parties." },
        { term: "Ma‘qud ‘alayh", meaning: "The subject matter of the contract." }
      ],
      related: ["t5.4.1", "t5.4.2", "t6.5"],
      quickCheck: { q: "Which is NOT one of the three essential elements of a contract?", options: ["Sighah", "‘Aqidain", "Ma‘qud ‘alayh", "Witnesses"], answer: 3, explanation: "p. 106." }
    },
    {
      id: "t5.4.1", section: "5.4.1", title: "Offer and Acceptance: Form of the Contract", pages: [106, 108], tier: "core",
      concepts: ["aqd", "khiyar"],
      intuition: "When exactly is a deal concluded — and what if the buyer needs time to think?",
      simple: "The offer (Ijab) is the first firm proposal; acceptance (Qabul) must match it and come in the same session (Majlis). Words, gestures or conduct can convey them. Offers lapse on withdrawal, death/incapacity, end of the session, destruction of the subject or lapse of time. Khiyar al-Shart lets a party take time.",
      academic: [
        "The offer must be clear and unconditional; offer and acceptance must conform on subject matter and consideration and be issued in the same session. Ijab is the firm proposal made first; Qabul the subsequent declaration. Whether abstention can be Ijab is debated: Pakistan’s Council of Islamic Ideology says only commission of an act; the Federal Shariat Court accepts abstention (like the Contract Act 1872). Offer and acceptance may be by words, gesture/indication or conduct; no particular words are fixed.",
        "An offer is cancelled by withdrawal; death or loss of capacity; termination of the Majlis without conclusion; destruction of the subject matter; lapse of the time fixed for acceptance. Unity of session derives from the Hadith “the contracting parties have the option until they separate”. Khiyar al-Shart (option of stipulation) overcomes the unity-of-session restriction by making the contract nonbinding for a specified period. The FSC held a narrow reading of Majlis impractical for large transactions (e.g. buying a factory); to some modern scholars, the ‘meeting’ is a legal fiction covering the time to communicate acceptance. If the buyer obtains a specified time from the seller, the sale may be concluded within it. Unity of session does not apply to agency, gift and appointment of an executor."
      ],
      exam: "Ijab (first firm proposal) + Qabul (conforming acceptance) in the same Majlis; by words, gesture or conduct. Offer lapses: withdrawal, death/incapacity, end of Majlis, destruction, time lapse. Khiyar al-Shart gives time. Unity of session not needed for agency, gift, executor.",
      keyPoints: [
        "Acceptance must conform to the offer in all details.",
        "Five causes of cancellation of an offer.",
        "FSC: flexible interpretation of Majlis for large transactions."
      ],
      steps: ["Offer (Ijab) made clearly and unconditionally", "Acceptance (Qabul) conforming in all details", "Within the same session (or within time granted/Khiyar)", "Contract concluded — formal event (e.g. signature) marks transfer"],
      definitions: [
        { term: "Ijab / Qabul", meaning: "Offer (firm proposal made first) / acceptance (subsequent declaration conforming to the offer)." },
        { term: "Majlis", meaning: "The session/meeting of the contract; offer and acceptance should occur in it." },
        { term: "Khiyar al-Shart", meaning: "Option of stipulation — makes a contract nonbinding for the holder during a specified period." }
      ],
      related: ["t6.12", "t5.4"],
      quickCheck: { q: "Which of these does NOT cancel an offer?", options: ["Withdrawal by the offeror", "End of the session without acceptance", "Destruction of the subject matter", "The offeree asking a clarifying question within the session"], answer: 3, explanation: "p. 107." }
    },
    {
      id: "t5.4.2", section: "5.4.2", title: "Elements of the Subject Matter", pages: [108, 110], tier: "core",
      concepts: ["qabd", "gharar", "bai-dayn"],
      intuition: "What must be true of the thing being sold? Existence, value, ownership, possession, deliverability and precise specification.",
      simple: "The subject matter must exist (or be existable, as in Salam), be valuable, lawful, owned, free of charges, deliverable and precisely specified by seeing or description; the price must be fixed. The seller must possess it (physically or constructively) before selling. Short-selling and sale of debt (except via Hawalah) are invalid.",
      academic: [
        "The subject matter should be existing/existable, valuable, usable, capable of ownership, capable of delivery/possession, specified and quantified, and the seller must have title and risk. Selling a nonexistent thing is void even with consent; short-selling is prohibited by almost all scholars. Usufruct is property and can be sold. A missing animal or stolen car cannot be sold. Sale of debt is invalid (seller does not know if/when the debtor pays) unless subject to Hawalah with recourse; Salam is allowed because details are pre-agreed.",
        "Conditions: pure, lawful materials of value (no wine, pork, intoxicants), purpose not contrary to Maqasid (no brothel or gambling house); owned and free from legal charge (a mortgaged asset cannot be sold until redeemed); fulfils the contract’s objective (perishables cannot be pledged; public roads cannot be sold); not harmful.",
        "Precise determination by pointing/examination (if present in the session, the majority require examination) or by description (sufficient if the asset is unique; otherwise the unit must be identified — “one of the shops” is voidable). Price must be agreed and fixed; “market price” or “100 in one month, 105 in two” without choosing is invalid; the unit of price must be known. A formal event (handshake, signature) marks conclusion and transfer of ownership, risk and reward.",
        "Capacity to deliver is essential. “He who buys foodstuff should not sell it until he has taken possession” — the vendor must be the real owner bearing risk and reward. Possession (Qabza) may be physical or constructive (Hukmi): the commodity is in the possessor’s risk and control with rights and liabilities passing to him, including risk of destruction; for immovables, legal notice or mutation suffices. Salam requires commodities normally available at delivery; in Istisna‘a the manufacturer must supply."
      ],
      exam: "Subject matter: existent, valuable, lawful, owned, unencumbered, deliverable, specified (by sight or description), price fixed. Possession (Qabza) physical or constructive before resale. No short-selling; debt sale only via Hawalah with recourse.",
      keyPoints: [
        "Constructive possession = risk and control transferred.",
        "Mortgaged asset cannot be sold until redemption.",
        "“One of the shops” is voidable unless identified.",
        "Formal event (signature) marks transfer of risk and reward."
      ],
      conditions: ["Exists (or existable as in Salam)", "Lawful and of value", "Owned by the seller and free from legal charge", "In the seller’s physical or constructive possession", "Deliverable", "Precisely determined (seen or described)", "Price agreed and fixed in a known unit"],
      definitions: [
        { term: "Qabza (possession)", meaning: "Physical or constructive possession of the subject matter by the seller before sale." },
        { term: "Constructive (Hukmi) possession", meaning: "The commodity has come into the possessor’s risk and control and all its rights and liabilities, including risk of destruction, have passed to him without physical delivery." }
      ],
      confusions: [{ wrong: "A bank can sell goods it has ordered but not yet received or taken risk of.", right: "The seller must own and possess (physically or constructively) the goods — i.e. bear their risk — before selling." }],
      related: ["t6.5.1", "t9.6", "t7.16"],
      quickCheck: { q: "Which describes constructive possession?", options: ["Holding the invoice only", "The commodity is in the possessor’s risk and control with rights and liabilities passed to him", "Having paid a deposit", "A promise to buy"], answer: 1, explanation: "p. 110." }
    },
    {
      id: "t5.5", section: "5.5", title: "Broad Rules for the Validity of Mu‘amalat", pages: [110, 114], tier: "core",
      concepts: ["gharar", "riba", "maisir", "maqasid", "general-permissibility"],
      intuition: "Is there a checklist to test any transaction? The author gives eight broad rules.",
      simple: "Valid transactions need: free mutual consent; no Gharar; no Riba; no gambling; no two mutually contingent contracts; conformity with Maqasid; profit only with liability; and the general rule that anything not prohibited is permitted.",
      academic: [
        "Free mutual consent (5.5.1): consent obtained through oppression, fraud or misperception invalidates; parties need definite knowledge of the subject matter and obligations; inspection and documentation (especially of credit) are encouraged. Najash, Ghaban-e-Fahish, Talaqqi-al-Rukban and concealing defects or value-related information in trust sales like Murabaha are prohibited.",
        "Prohibition of Gharar (5.5.2): required in commutative contracts; some uncertainty is affordable in gifts. The commodity must exist, be owned and possessed; Salam and Istisna‘a are the only exceptions, with conditions removing Gharar. Sale of debt even at face value is not allowed — hence bill discounting is not allowed — but Hawalah with recourse validates it. Short-selling, conventional derivatives, insurance, difference-settled futures in shares and FX, and trading in shares of provisionally listed companies involve Gharar. Speculation per se (buying/selling with future price changes in mind) is not prohibited; only sales of nonexistent/not-owned goods and Maisir are.",
        "Avoiding Riba (5.5.3): IFIs must earn by pricing goods or usufruct, not by lending; otherwise income goes to charity. Avoiding Qimar and Maisir (5.5.4): no lotteries or pure-luck prize schemes. Conformity with Maqasid (5.5.6): contracts must not militate against the objectives or public benefit. Permissibility (5.5.8): all agreements and conditions are permissible unless they contradict an explicit text; credit (Mu’ajjal) and forward (Salam) transactions have their own rules."
      ],
      exam: "Eight rules: free consent; no Gharar; no Riba; no Qimar/Maisir; no two contingent contracts; conformity with Maqasid; profit with liability; permissibility as general rule. Speculation per se not prohibited; debt sale only via Hawalah.",
      keyPoints: [
        "Talaqqi-al-Rukban: buying from Bedouins before they reach the market — prohibited.",
        "Salam and Istisna‘a are the only exceptions to existence/ownership/possession.",
        "Bill discounting not allowed; Hawalah with recourse is.",
        "Speculation per se is not prohibited."
      ],
      subsections: [
        { number: "5.5.1", title: "Free Mutual Consent", page: 110, points: ["No coercion, fraud or misperception", "Knowledge of subject and obligations", "No Najash, Ghaban-e-Fahish, Talaqqi-al-Rukban, concealment"] },
        { number: "5.5.2", title: "Prohibition of Gharar", page: 110, points: ["Existence, ownership, possession required", "Salam/Istisna‘a exceptions", "No debt sale except Hawalah; speculation per se allowed"] },
        { number: "5.5.3", title: "Avoiding Riba", page: 111, points: ["Profit from pricing goods/usufruct, not lending"] },
        { number: "5.5.4", title: "Avoiding Qimar and Maisir", page: 112, points: ["No luck-based schemes"] },
        { number: "5.5.6", title: "Conformity with the Maqasid", page: 113, points: ["No contract against public benefit"] },
        { number: "5.5.8", title: "Permissibility as a General Rule", page: 114, points: ["Conditions valid unless contradicting explicit text"] }
      ],
      definitions: [{ term: "Talaqqi-al-Rukban", meaning: "A city dweller buying a Bedouin’s goods at a far lower price before the latter reaches the market — prohibited." }],
      confusions: [{ wrong: "All speculation is prohibited in Islamic finance.", right: "Speculation per se — trading in view of possible price changes — is not prohibited; only sales involving nonexistent/not-owned goods or Maisir are." }],
      related: ["t5.5.5", "t5.5.7", "t3.2", "t2.2.2"],
      quickCheck: { q: "According to Section 5.5.2, how can a sale of debt be validated?", options: ["By discounting it", "By subjecting it to the rules of Hawalah with recourse to the original debtor", "By adding a premium", "It can never be validated"], answer: 1, explanation: "p. 111." }
    },
    {
      id: "t5.5.5", section: "5.5.5", title: "Prohibition of Two Mutually Contingent Contracts", pages: [112, 113], tier: "core",
      concepts: ["two-contracts", "ijarah", "diminishing-musharakah"],
      intuition: "Islamic products often combine contracts. When is a combination allowed and when is it ‘two deals in one’?",
      simple: "Prohibited: forcing purchase of a second article; one article at two prices without choosing; contingent sale; combining sale and loan. Keep separate contracts. Allowed combinations: sale and lease kept separate with a unilateral promise; Shirkah with Ijarah; Musharakah with Mudarabah; Wakalah/Kafalah with sale or lease; Salam/Istisna‘a with Murabaha. Debt-for-debt exchanges are prohibited, hence full prepayment in Salam.",
      academic: [
        "The Prophet (pbuh) prohibited: (1) selling two articles so that buying one obliges buying the other; (2) one article for two prices without stipulating one; (3) contingent sale; (4) combining sale and lending. Jurists prefer each contract to relate to one transaction; separate contracts rather than one mixed contract.",
        "Permissible combinations: Bai‘ and Ijarah must be separate — in Ijarah Muntahia-bi-Tamleek the bank remains lessor and bears ownership risks and expenses throughout; transferring ownership risk to the lessee voids the transaction; a unilateral promise to sell, buy or gift at the end is allowed (not binding on the other party). Shirkah and Ijarah: a partner may lease his undivided share to a co-partner (unanimous); in Diminishing Musharakah each unit sale needs separate offer and acceptance. Musharakah and Mudarabah: a bank managing depositors’ funds (Mudarabah) may add its own funds, but a sleeping partner’s profit ratio cannot exceed its capital ratio. Wakalah and Kafalah with sale/lease, per their rules (Wakalah is part of Murabaha, Salam and Istisna‘a). Salam or Istisna‘a with Murabaha for preshipment export finance; Diminishing Musharakah combines Shirkah and Ijarah with an undertaking.",
        "Exchange of two liabilities is prohibited. Ibn Rushd identifies nine kinds of sale (corporeal/corporeal, corporeal/liability, liability/liability; each immediate or delayed). Delay on both sides is debt for debt — prohibited — hence full prepayment in Salam."
      ],
      exam: "Prohibited: forced second purchase; two prices unchosen; contingent sale; sale + loan. Allowed combos with separate contracts: sale & lease (unilateral promise), Shirkah & Ijarah, Musharakah & Mudarabah, Wakalah/Kafalah with sale/lease, Salam/Istisna‘a + Murabaha. Debt-for-debt prohibited → Salam price fully prepaid.",
      keyPoints: [
        "IMBT: transferring ownership risk to lessee during the lease voids it.",
        "Leasing one’s undivided share to a co-partner is unanimously allowed.",
        "Sleeping partner’s profit ratio ≤ its capital ratio.",
        "Debt-for-debt exchange prohibited."
      ],
      table: { caption: "Permissible combinations (Section 5.5.5)", head: ["Combination", "Condition"], rows: [["Sale + Ijarah", "Separate agreements; bank bears ownership risk during lease; unilateral promise at end"], ["Shirkah + Ijarah", "Partner may lease undivided share; unit sales in DM need separate offer and acceptance"], ["Musharakah + Mudarabah", "Sleeping partner’s profit ratio cannot exceed capital ratio"], ["Wakalah/Kafalah + sale/lease", "Rights and liabilities per each contract’s rules"], ["Salam/Istisna‘a + Murabaha", "Each contract’s conditions fulfilled (e.g. preshipment export finance)"]] },
      related: ["t6.8", "t11.4.5", "t12.9.2"],
      quickCheck: { q: "Why must the price in Salam be paid in full in advance?", options: ["Tradition only", "Delay on both sides would be exchange of debt for debt, which is prohibited", "To earn interest", "It is optional"], answer: 1, explanation: "p. 113." }
    },
    {
      id: "t5.5.7", section: "5.5.7", title: "Profits with Liability", pages: [113, 113], tier: "core",
      concepts: ["kharaj-daman"],
      intuition: "Why does a creditor get no profit but a seller or lessor does?",
      simple: "A person is entitled to profit only when bearing the risk of loss — in sale, hire and partnership. A creditor bears no business risk on the amount lent, so any excess is prohibited.",
      academic: ["This principle operates in sale, hire and partnership contracts. Any excess paid to the creditor is prohibited because the creditor does not bear business risk on the amount lent. In sale and lease, parties bear risk as each contract requires."],
      exam: "Profit only with liability for loss; creditor bears no business risk → no excess.",
      keyPoints: ["Applies to sale, hire and partnership."],
      related: ["t4.2.6"],
      quickCheck: { q: "Why is a creditor not entitled to profit on a loan?", options: ["Loans are small", "The creditor bears no business risk on the amount lent", "It is customary", "Only for consumption loans"], answer: 1, explanation: "p. 113." }
    },
    {
      id: "t5.6", section: "5.6", title: "Wa‘dah (Promise) and Related Matters", pages: [114, 116], tier: "core",
      concepts: ["wad"],
      intuition: "Islamic banks rely on a customer’s promise to buy. Is that promise enforceable — and what can the bank recover?",
      simple: "Contemporary scholars agree promises in commerce are enforceable unless force majeure prevents fulfilment. If the promisor wilfully backs out, he must make good the actual loss (not opportunity cost). The OIC Fiqh Academy sets four conditions. Bilateral promises are generally not allowed where the contract itself would not be allowed (e.g. forward currency).",
      academic: [
        "‘Ahd generally does not create legal obligation but becomes binding where the promisee incurs expenses or liability because of it; contingent promises are also binding. Contemporary scholars have reached consensus that Wa‘dah is enforceable unless force majeure prevents it; if broken wilfully, the promisor makes good the loss. Example: A promises to sell a house to bank B for $100,000 but sells to C — A covers B’s actual loss. A asks B to buy a car and promises to buy it for $20,000; B buys for $18,000, A backs out, B sells for $17,000 — A bears the $1,000 net loss, recoverable from security or token money.",
        "Rationale: binding promises are a genuine need that does not violate basic tenets — e.g. FX cover via unilateral promise with simultaneous exchange later. Dylan Ray argued medieval Fiqh supports non-binding promises and that modern practice creates conflict; the author disagrees: Malikis, Hanbalis, some Hanafis and Shafi‘is and almost all contemporary jurists accept binding promises in commercial dealings with mutual consent (views of Samurah b. Jundub, Umar b. Abdul Aziz, Hasan al-Basri, Imam Bukhari, Ibn Shubruma, al-Ghazzali; a Maliki view binds only where the promisee incurred expenses). It contradicts no Nass and is acceptable under Ibahatul Asliyah.",
        "OIC Fiqh Academy conditions: (1) unilateral; (2) the promisor caused the promisee to incur liabilities/expenses; (3) if a promise to purchase, the actual sale takes place at the appointed time by offer and acceptance — the promise is not the sale; (4) on backing out, the court may force purchase or actual damages — actual monetary loss, excluding opportunity cost. Muwa‘adah (bilateral promise) is not allowed by the majority where ‘Aqd is not allowed (e.g. forward currency); some subcontinent scholars enforce bilateral promises except for short-selling of currencies or shares. Unlike ‘Aqd, a promise does not transfer ownership. Implications: MPO, Ijarah-wal-Iqtina‘, Diminishing Musharakah, disposal of Salam/Istisna‘a goods."
      ],
      exam: "Promise binding (contemporary consensus) unless force majeure; wilful breach → actual loss (not opportunity cost). OIC conditions: unilateral; promisee incurred liability; actual sale by separate offer/acceptance; court may enforce purchase or damages. Bilateral promise not allowed where contract not allowed.",
      keyPoints: [
        "Promise ≠ sale: ownership does not transfer.",
        "Damages exclude opportunity cost/cost of funds.",
        "Muwa‘adah not allowed where ‘Aqd is not allowed (majority).",
        "Author rejects Dylan Ray’s ‘conflict’ critique."
      ],
      conditions: ["Unilateral promise", "Promisor caused promisee to incur liabilities/expenses", "Actual sale executed later by offer and acceptance", "On breach: specific performance or actual damages (no opportunity cost)"],
      calc: { type: "promise-breach", note: "Reproduces the textbook’s car example: purchase cost, promised price, resale value → recoverable loss." },
      examples: [{ title: "Car purchase promise", kind: "textbook", text: "A promises to buy a car from bank B for $20,000. B buys it for $18,000; A backs out; B sells it for $17,000. A must bear the $1,000 actual loss, recoverable from security or Hamish Jiddiyah. B cannot claim its expected $2,000 profit." }],
      debate: [{ issue: "Is a promise to purchase binding?", criticism: "Dylan Ray: medieval Fiqh sources indicate the promise to purchase should not be binding; modern practice creates conflict and objections to Murabaha as practised.", response: "Many traditional jurists (Malikis, Hanbalis, some Hanafis and Shafi‘is) and almost all contemporary jurists accept binding commercial promises; there is no contradiction of any Nass, so it is valid under Ibahatul Asliyah.", alternative: "A Maliki view: promises bind only where the promisee incurred expenses or liability on the basis of the promise.", takeaway: "In the mainstream view followed by the book, commercial promises are binding with actual-loss damages." }],
      related: ["t3.3.2", "t9.8.2", "t5.6.1"],
      quickCheck: { q: "Under the OIC Fiqh Academy conditions, what may a bank recover when a client breaks a promise to purchase?", options: ["Expected profit", "Actual monetary loss, excluding opportunity cost", "Interest on funds", "Nothing"], answer: 1, explanation: "p. 115." }
    },
    {
      id: "t5.6.1", section: "5.6.1", title: "Token Money (Hamish Jiddiyah) and ‘Arbun", pages: [116, 117], tier: "core",
      concepts: ["hamish-jiddiyah", "arbun"],
      intuition: "A bank takes money upfront to show a client is serious. Is it a deposit, part of the price, or a forfeit?",
      simple: "Hamish Jiddiyah is security money taken before the sale to show seriousness; the bank holds it in trust, adjusts it in the price, or deducts actual loss if the promise is broken and refunds the rest. ‘Arbun is earnest money paid after the sale is executed as part of the price; the seller may keep it if the buyer fails to perform, though AAOIFI prefers refunding the excess over actual loss.",
      academic: [
        "Hamish Jiddiyah: taken before execution of the agreement to convey firm intention; held as a trust and adjusted in the price at execution. If the promisee fails to honour the promise, the bank recovers actual loss and returns the remainder; actual loss does not include cost of funds (AAOIFI). Tender deposits operate similarly: held in trust, refunded to unsuccessful bidders, part of price if accepted.",
        "‘Arbun: earnest money paid at execution of the sale as part of the price. If the buyer fails to perform within the stipulated period, the seller may retain it; AAOIFI considers it preferable to refund what exceeds the loss actually sustained. Imam Malik defined ‘Arbun (a dinar given: counted in price if ratified, forfeited if cancelled) and considered it invalid; two Hadiths (for and against) are weak. Only the Hanbali school considers Bai‘ al ‘Arbun legal, relying on Naf‘i ibn al-Harith’s purchase of a prison house for Umar from Safwan. Contemporary majority: legal if the buyer freely stipulates finalising within set days or forfeiting the advance. But open options with no intention to buy, aimed at profit by risk transfer, contradict Islamic finance philosophy — conventional options are not accepted. ‘Arbun is acceptable as part payment after finalisation; its use to legitimise conventional options is generally not accepted."
      ],
      exam: "Hamish Jiddiyah: before sale; trust; adjust in price or deduct actual loss and refund rest. ‘Arbun: after sale, part of price; forfeitable on buyer’s non-performance (AAOIFI: refund excess over actual loss). Only Hanbalis accept Bai‘ al ‘Arbun; not a basis for conventional options.",
      keyPoints: ["Timing difference: before (HJ) vs after (‘Arbun) execution.", "Cost of funds is not part of actual loss.", "Conventional options not accepted."],
      distinctions: [{ a: "Hamish Jiddiyah", b: "‘Arbun", text: "HJ is taken before the sale as a trust against a promise; ‘Arbun is paid at execution of the sale as part of the price and may be forfeited on non-performance." }],
      definitions: [
        { term: "Hamish Jiddiyah", meaning: "Token/security money taken before a sale to show the promisee’s firm intention; held in trust." },
        { term: "‘Arbun", meaning: "Earnest money paid at execution of a sale as part of the price, retainable by the seller if the buyer fails to perform." }
      ],
      related: ["t6.9", "t9.8.2", "t8.8.8"],
      quickCheck: { q: "Which statement is correct?", options: ["‘Arbun is taken before the sale; HJ after", "HJ is taken before the sale as a trust; ‘Arbun is part of price after execution", "Both are interest", "Both are always forfeited"], answer: 1, explanation: "p. 116." }
    },
    {
      id: "t5.7", section: "5.7", title: "Types of Contracts: Valid Contracts (Sahih)", pages: [117, 120], tier: "core",
      concepts: ["contract-validity"],
      intuition: "Hanafis sort contracts into valid, voidable and void. What makes a contract valid — and can a valid contract still be suspended or revocable?",
      simple: "Most jurists: valid (Sahih) or invalid (Batil). Hanafis add Fasid (voidable). A valid contract is correct in its essence (Asl) and attributes (Wasf). It may be effective immediately (Nafiz) or suspended (Mawquf) pending ratification, and binding (Lazim) or nonbinding (Ghair Lazim). Ijarah, Istisna‘a, Kafalah and Hawalah may take effect from a future date; a sale may not.",
      academic: [
        "Most jurists divide contracts into valid (Sahih) and invalid (Batil); Hanafis into Sahih, Fasid and Batil. Zuhayli notes Hanafi texts often use ‘Fasid’ loosely. The book uses the three-way Hanafi scheme as it offers practitioners more options.",
        "Valid contracts (5.7.1) conform in Asl (fundamental components) and Wasf (accessory attributes): form, subject matter and parties in order and free from Riba, Gharar etc. (Petty purchases by children and implied day-to-day transactions are exempt.) A valid contract is Nafiz (effective on execution) or Mawquf (suspended). Hanafis, Malikis and some Hanbalis allow delayed effect; Shafi‘is and some Hanbalis require immediate effect.",
        "Future-effective contracts: Ijarah and Istisna‘a (usufruct owned gradually), Kafalah and Hawalah (e.g. “if your debtor has not paid by next month, I will”), agency, divorce, Waqf, bequest. Sale must be immediate — “I sell you this house at the beginning of next year” involves Gharar (lapse of interest, price changes, disputes — Siddiq al Dharir). Ibn al-Qayyim and Ibn Taymiyah allow ‘Aqd Mudhaf for sale too. Contemporary scholars suggest a unilateral promise instead.",
        "Mawquf causes: defective capacity (a minor’s transaction subject to guardian ratification, retroactive if ratified); lack of authority (Fuduli); rights of a third party (selling a mortgaged house needs mortgagee ratification; the buyer may revoke before ratification, the seller may not).",
        "Lazim (binding): no unilateral revocation unless Khiyar al-Shart. Ghair Lazim by nature: Wakalah, Kafalah, Shirkah, Wadi‘ah, ‘Ariyah — terminable by either party, unless they agree not to terminate for a period; hence banks can restrict early withdrawal of Shirkah-based investment deposits. Shareholders cannot terminate but can sell shares. Khiyar al-Shart prevents a contract becoming Lazim during the option."
      ],
      exam: "Hanafi: Sahih, Fasid, Batil. Valid = Asl + Wasf in order. Nafiz vs Mawquf (minor, Fuduli, third-party rights). Lazim vs Ghair Lazim (Wakalah, Kafalah, Shirkah, Wadi‘ah, ‘Ariyah revocable by nature). Future effect OK for Ijarah, Istisna‘a, Kafalah, Hawalah, agency; not for sale (use a promise).",
      keyPoints: [
        "Sale cannot be made effective from a future date (majority).",
        "Mawquf contracts become effective on ratification (retroactively).",
        "Investment deposits can be locked by agreement even though Shirkah is revocable by nature."
      ],
      subsections: [{ number: "5.7.1", title: "Valid Contracts", page: 118, points: ["Asl and Wasf", "Nafiz / Mawquf", "Future-effective contracts", "Lazim / Ghair Lazim"] }],
      definitions: [
        { term: "Asl / Wasf", meaning: "The fundamental components/essence of a contract / its accessory circumstances or external attributes." },
        { term: "Nafiz / Mawquf", meaning: "Immediately effective / suspended pending ratification or a future event." },
        { term: "Lazim / Ghair Lazim", meaning: "Binding (no unilateral revocation) / nonbinding (revocable by a party)." },
        { term: "Fuduli", meaning: "A person acting for another without authority (neither guardian nor agent, or an agent exceeding limits)." },
        { term: "‘Aqd Mudhaf", meaning: "A contract made effective from a future date." }
      ],
      related: ["t5.7.2", "t5.7.3", "t12.7.1"],
      quickCheck: { q: "Which contract can NOT be made effective from a future date according to the majority?", options: ["Ijarah", "Istisna‘a", "Kafalah", "Sale"], answer: 3, explanation: "p. 118." }
    },
    {
      id: "t5.7.2", section: "5.7.2", title: "Voidable (Fasid) Contracts", pages: [120, 123], tier: "core",
      concepts: ["contract-validity"],
      intuition: "Can a defective contract be fixed? In Hanafi law, yes — if the defect is in the attributes, not the essence.",
      simple: "A Fasid contract is legal in its essence (Asl) but defective in attributes (Wasf); remove the defect and it becomes valid. Causes include coercion (for Hanafis), missing information, and invalid conditions. If goods were delivered with consent, ownership passes and market value — not the agreed price — applies.",
      academic: [
        "Causes of invalidity: intrinsic (basic elements — unlawful/nonexistent subject matter, lack of capacity) and extrinsic (Wasf — Riba, Gharar). Riba and Gharar are causes of irregularity in Hanafi law but of invalidity in other schools; even for Hanafis such contracts are unenforceable until the term is removed.",
        "Factors: defective consent (coercion — Batil for the majority; Fasid/suspended subject to ratification for Hanafis); lack of value-relevant information about the subject matter (e.g. unidentified Ijarah asset — though Ijarah Mosufah bil Zimmah, a well-described service without identified units, is permissible), consideration (no definite price), time of performance (not for partnership, which is nonbinding by origin), or guarantee/pledge; invalid conditions — against the contract’s purpose (buyer may not resell), expressly prohibited (sale conditional on another sale/loan/gift), against commercial usage (seller to grind corn), or advantageous to one party (seller to reside in the sold house for two months). Irregular conditions affect only compensatory contracts; in gratuitous contracts (loan, gift, Waqf, Kafalah, mortgage, Hawalah, marriage) only the condition is abrogated.",
        "In voidable Shirkah/Mudarabah, helpers receive matching wages while the capital provider claims the residual; jurists introduced Ribh-al-mithl to protect capital owners. Forms of Fasid sale (Hanafi): Bai‘ al-Majhul; contingent contract; sale effective from a future date; Bai‘ al-Ghaib (regularised by seeing, or valid if description suffices); unlawful consideration; two sales in one.",
        "Legal status: must be revoked; no rights arise unless the defect is removed (e.g. a loan with an interest condition — the condition is void, the loan valid, principal only). If the buyer takes possession with the seller’s consent, ownership passes and the buyer pays agreed or market value; parties can still revoke unless the buyer has disposed of or altered it — an onward sale is valid. Differences from valid: ownership passes by possession (not mere offer/acceptance); market value (not agreed price) — market rent in voidable leases, profit in proportion to capital in voidable partnerships."
      ],
      exam: "Fasid: Asl valid, Wasf defective; curable. Causes: coercion (Hanafi), Jahl about subject/price/time/security, invalid conditions (against purpose, expressly prohibited, against usage, one-sided advantage). Effects: ownership by consensual possession; market value/rent; profit per capital; onward sale valid.",
      keyPoints: [
        "Irregular conditions void compensatory contracts but only drop out of gratuitous ones.",
        "Ijarah Mosufah bil Zimmah is permissible.",
        "Voidable partnership: profit in proportion to capital.",
        "Onward sale by buyer in a Fasid sale is valid."
      ],
      definitions: [
        { term: "Fasid", meaning: "Voidable/defective contract — valid in essence (Asl) but defective in attributes (Wasf); can be regularised." },
        { term: "Ijarah Mosufah bil Zimmah", meaning: "Lease of a well-defined service/benefit without identifying particular units of the asset (e.g. transport by vans of a defined type)." },
        { term: "Bai‘ al-Majhul", meaning: "Sale in which the object, price or time of payment is unknown." }
      ],
      table: { caption: "Valid vs voidable contract effects", head: ["Aspect", "Valid (Sahih)", "Voidable (Fasid)"], rows: [["Ownership passes by", "Offer and acceptance", "Possession taken with seller’s consent"], ["Price/rent", "Agreed price/rent", "Market value / market rent"], ["Partnership profit", "Agreed ratio", "In proportion to capital"], ["Cure", "—", "Remove the cause of irregularity"]] },
      related: ["t5.7.3", "t5.9", "t4.2.5"],
      quickCheck: { q: "In a voidable (Fasid) partnership, how is profit allocated?", options: ["As agreed", "In proportion to each partner’s capital", "Equally", "All to the manager"], answer: 1, explanation: "p. 123." }
    },
    {
      id: "t5.7.3", section: "5.7.3", title: "Void (Batil) Contracts", pages: [123, 124], tier: "core",
      concepts: ["contract-validity"],
      intuition: "What if a contract fails at its root — no valid offer, parties or deliverable subject?",
      simple: "A Batil contract fails major conditions (form, capacity, subject matter, possession/delivery) or has illegal attributes. It has no effect: no ownership passes, goods must be returned, and the original seller can reclaim goods even from a third party.",
      academic: ["Contracts not fulfilling conditions of offer and acceptance, subject matter, consideration and possession/delivery, or with illegal external attributes, are Batil. Examples: milk in the udder; unknown consideration or period; a dirham for two dirhams; bidding over a bid after parties agree; contracts actuated by fraud. Permissible forms include Salam, auction bidding, Bai‘ al Khiyar, Musawamah and Murabaha. A Batil contract gives rise to no effect: no title to goods or price; delivered goods must be returned whether or not the illegality was known; if the buyer sells to a third party, the original seller can still claim the goods — unlike a Fasid contract."],
      exam: "Batil: fails major conditions → no effect; goods returned; original seller can reclaim even from third party (unlike Fasid).",
      keyPoints: ["Auction bidding is permitted; bidding over an agreed bid is not."],
      distinctions: [{ a: "Fasid", b: "Batil", text: "Fasid can be cured and consensual possession transfers ownership (onward sale valid); Batil has no effect at all and goods can be reclaimed even from third parties." }],
      related: ["t5.7.2"],
      quickCheck: { q: "In a Batil sale, the buyer has already resold the goods to a third party. The original seller:", options: ["Loses all rights", "Can still claim the goods, since ownership never passed", "Must accept market value", "Must pay the third party"], answer: 1, explanation: "p. 124." }
    },
    {
      id: "t5.8", section: "5.8", title: "Commutative and Noncommutative Contracts", pages: [124, 125], tier: "core",
      concepts: ["commutative-contracts", "wakalah", "kafalah", "hawalah", "qard"],
      intuition: "Which contracts can carry a charge — and can a bank charge for a guarantee?",
      simple: "Commutative contracts (sale, lease, Wakalah) can carry compensation; gratuitous ones (loan, gift, guarantee, Hawalah, Waqf, bequest, ‘Ariyah) cannot. Banks may charge for services via Wakalah or Ju‘alah (e.g. on L/Cs and guarantees) based on expenses — amount-based, not time-based. A void condition voids a commutative contract but merely drops out of a gratuitous one.",
      academic: [
        "Uqood-e-Mu‘awadha (commutative): sale, purchase, lease, Wakalah. Sales by object: Muqayadhah (barter), Bai‘ al Hal (spot), Sarf, Salam, Mu’ajjal (credit), Mutlaq (absolute). By price: Tawliyah (at cost), Murabaha (cost plus profit), Wadhi‘ah (at a loss) — together Buyu’al Amanat (trust sales) — and Musawamah (bargaining without reference to cost). Ijarah: Ijarat al Ashkhas (services) and Ijarat al Ashya (things). Istisna‘a. Wakalah can be commutative or not.",
        "Uqood Ghair Mu‘awadha (Tabarru‘): Hibah, Wasiyyah, Waqf, Kafalah, ‘Ariyah, Qard, Hawalah. Kafalah, Qard and Hawalah are relevant to banks, but no profit may be charged on them per se; fees for other services on Wakalah or Ju‘alah are allowed (e.g. issuing L/Cs and guarantees), based on expenses — amount-based (possibly slabs), not time-based.",
        "Legal status: a void condition voids a commutative contract; in a gratuitous contract only the condition is ineffective (an interest condition in a loan is void; the loan remains). Gharar does not invalidate gratuitous contracts (donating a stray animal is fine; selling it is not)."
      ],
      exam: "Commutative: sale (Muqayadhah, Hal, Sarf, Salam, Mu’ajjal, Mutlaq; Tawliyah, Murabaha, Wadhi‘ah = trust sales; Musawamah), Ijarah, Istisna‘a, Wakalah. Gratuitous: Hibah, Wasiyyah, Waqf, Kafalah, ‘Ariyah, Qard, Hawalah — no charge; service fees via Wakalah/Ju‘alah, amount-based not time-based.",
      keyPoints: [
        "Trust sales (Buyu’al Amanat): Tawliyah, Murabaha, Wadhi‘ah.",
        "Guarantee fees: based on expenses; amount-based, not time-based.",
        "Gharar tolerated in gratuitous contracts."
      ],
      table: { caption: "Classification of contracts (Section 5.8)", head: ["Commutative (Mu‘awadha)", "Gratuitous (Ghair Mu‘awadha / Tabarru‘)"], rows: [["Sale (all forms)", "Hibah (gift)"], ["Ijarah (services / things)", "Wasiyyah (bequest)"], ["Istisna‘a", "Waqf (endowment)"], ["Wakalah (can be either)", "Kafalah (guarantee)"], ["—", "‘Ariyah (free loan of usable item)"], ["—", "Qard (loan)"], ["—", "Hawalah (assignment of debt)"]] },
      subsections: [
        { number: "5.8.1", title: "Uqood-e-Mu‘awadha", page: 124, points: ["Sale by object and by price", "Ijarah types", "Istisna‘a"] },
        { number: "5.8.2", title: "Uqood Ghair Mu‘awadha (Tabarru‘)", page: 125, points: ["Seven gratuitous contracts", "Fee rules for L/C and guarantees"] },
        { number: "5.8.3", title: "Legal Status", page: 125, points: ["Void condition: voids commutative; ineffective in gratuitous"] }
      ],
      definitions: [
        { term: "Buyu’al Amanat (trust sales)", meaning: "Bai‘ Tawliyah (at cost), Bai‘ Murabaha (cost plus profit) and Bai‘ Wadhi‘ah (at a loss) — sales referring to the original cost." },
        { term: "Bai‘ Musawamah", meaning: "Sale by bargaining without reference to the original cost price." },
        { term: "‘Ariyah", meaning: "Loan of a usable item free of any charge." }
      ],
      related: ["t9.11", "t13.2", "t14.6.2", "t1.8"],
      quickCheck: { q: "How may an Islamic bank charge for issuing a guarantee, according to Section 5.8.2?", options: ["A time-based percentage like interest", "Service charges based on expenses, amount-based but not time-based", "No charge at all ever", "A share of the client’s profit"], answer: 1, explanation: "p. 125." }
    },
    {
      id: "t5.9", section: "5.9", title: "Conditional or Contingent Contracts", pages: [126, 127], tier: "supporting",
      concepts: ["contract-validity"],
      intuition: "Can you add conditions to a sale — warranties, free service, a pledge? Some conditions are fine, some void.",
      simple: "Conditions are of three kinds: suspending (T‘aliq), deferring (Idafa) and concomitant (Iqtiran). A condition that supports the contract’s purpose or is customary (warranty, free service, pledge) is valid. A condition against the purpose (never resell) or harmful is void. If an invalid condition is added to an otherwise valid contract, the condition drops and the contract stands (per the sources cited).",
      academic: ["Conditional contracts are generally not valid, but some conditions are acceptable. Three types: T‘aliq (suspends to a future event), Idafa (delays the beginning), Iqtiran (concomitance varying terms). Hanafis and Hanbalis allow delayed beginning for lease or agency but not sale. All schools consider whether a condition agrees with the contract’s purpose: paying the price, transferring full title, paying in certain currency, or providing a pledge are valid; ‘never resell’ is not. Conditions giving one party extra benefit are disputed; Ibn Taymiyah rejects only those contradicting the Qur’an, Sunnah, Ijma‘a or the contract’s object. Hanbalis emphasise party discretion; Hanafis, Shafi‘is and Malikis classify conditions as valid, irregular and void. Valid conditions include Khiyar al-Shart and Khiyar al-Ru’yah, withholding goods until payment, a pledge for the price and customary conditions (Jaber’s camel ride). A Fasid condition in an otherwise valid contract is void while the contract is enforceable; a superfluous condition is unenforceable; a condition repugnant to the contract but benefiting one party, if inseparable, vitiates it. Market-standard conditions such as a five-year guarantee, free service, warranties and cancellation options are valid."],
      exam: "T‘aliq, Idafa, Iqtiran. Valid: conditions consistent with contract purpose or customary (pledge, warranty, free service, Khiyar). Void: against purpose, contradict text, harmful. Ibn Taymiyah’s practical approach.",
      keyPoints: ["Warranty and after-sales service conditions are valid.", "“Buyer will never resell” is invalid."],
      definitions: [
        { term: "T‘aliq / Idafa / Iqtiran", meaning: "Suspension to a future event / deferral of the start / concomitant condition varying terms." }
      ],
      related: ["t5.7.2", "t6.8"],
      quickCheck: { q: "Which condition in a sale is valid according to Section 5.9?", options: ["The buyer will never resell the item", "The seller provides a five-year guarantee and one year’s free service", "The buyer must lend the seller money", "The seller will live in the sold house for two months"], answer: 1, explanation: "p. 127." }
    }
  ],
  summary: "Islamic finance is in essence an ethical system: what is not prohibited is permissible, and contracts are valid unless they violate the Qur’an, Sunnah or the objectives of Shari’ah. Property is ‘Ain or Dayn; Murabaha applies to ‘Ain and merchandise, not debt documents. Only one counter-value may be postponed — credit sale (Mu’ajjal) or Salam — and debt for debt is prohibited. A valid contract needs form (conforming offer and acceptance), capable parties and a lawful, existing, deliverable, precisely determined subject matter; a sale must be immediate and noncontingent. Two contracts in one are not permissible (hire and purchase cannot be one contract; only a promise to purchase). Commercial promises can be binding, with actual-loss damages. Contracts with immoral or harmful causes are void; Islam blocks all channels leading to injustice.",
  takeaways: [
    "Ownership of an asset includes usufruct; usufruct is time-bound.",
    "Three elements: form, parties, subject matter.",
    "Seller must own and possess (physically or constructively) before sale.",
    "Two contingent contracts prohibited; combine via separate contracts and unilateral promises.",
    "Binding promise → actual loss only; HJ before sale, ‘Arbun after.",
    "Sahih / Fasid / Batil — different effects on ownership and price.",
    "Gratuitous contracts carry no charge; service fees amount-based, not time-based."
  ],
  checklist: [
    "Can you define ‘Ain, Dayn, Mabi‘, Thaman and the three ownerships?",
    "Can you explain when an offer lapses and the role of Khiyar al-Shart?",
    "Can you list the conditions of the subject matter and define constructive possession?",
    "Can you list the eight broad validity rules?",
    "Can you name permissible contract combinations and their conditions?",
    "Can you state the OIC conditions for binding promises?",
    "Can you distinguish Sahih, Fasid and Batil with their effects?",
    "Can you classify contracts as commutative or gratuitous?"
  ],
  flashcards: [
    { id: "f5.1", cat: "Definitions", front: "Mal", back: "Anything usable with legal and material value — valuable, possessable, of legitimate use; includes intangible rights like trademarks.", topic: "t5.2" },
    { id: "f5.2", cat: "Arabic terminology", front: "Milk ul‘Ain, Milk ud Dayn, Milk ul Manf‘at", back: "Ownership of asset, of debt, of usufruct. Asset ownership includes usufruct, not vice versa; usufruct ownership is time-bound.", topic: "t5.2" },
    { id: "f5.3", cat: "Contract rules", front: "Mithli vs Qimi goods — which suits Salam and which Istisna‘a?", back: "Mithli (fungible) → Salam; Qimi (non-fungible) → Istisna‘a.", topic: "t5.2" },
    { id: "f5.4", cat: "Arabic terminology", front: "Mithaq vs ‘Ahd/Wa‘dah vs ‘Aqd", back: "Solemn covenant / unilateral promise / contract formed by offer and acceptance.", topic: "t5.2.1" },
    { id: "f5.5", cat: "Contract rules", front: "Three essential elements of a contract", back: "Sighah (offer and acceptance), ‘Aqidain (contracting parties), Ma‘qud ‘alayh (subject matter).", topic: "t5.4" },
    { id: "f5.6", cat: "Contract rules", front: "When is an offer cancelled?", back: "Withdrawal; death or loss of capacity; end of the Majlis without conclusion; destruction of the subject matter; lapse of time fixed for acceptance.", topic: "t5.4.1" },
    { id: "f5.7", cat: "Definitions", front: "Constructive (Hukmi) possession", back: "The commodity is in the possessor’s risk and control, with rights and liabilities (including risk of destruction) passed to him, without physical delivery.", topic: "t5.4.2" },
    { id: "f5.8", cat: "Contract rules", front: "Four forms of the prohibited ‘two contracts in one’", back: "Compulsory second purchase; one article at two prices unchosen; contingent sale; combining sale and lending.", topic: "t5.5.5" },
    { id: "f5.9", cat: "Contract rules", front: "OIC Fiqh Academy conditions for a binding promise", back: "Unilateral; promisee incurred liabilities/expenses; actual sale by offer and acceptance later; on breach court may enforce purchase or actual damages (no opportunity cost).", topic: "t5.6" },
    { id: "f5.10", cat: "Comparisons", front: "Hamish Jiddiyah vs ‘Arbun", back: "HJ: before sale, held in trust, actual loss deducted, rest refunded. ‘Arbun: at execution, part of price, retainable on non-performance (AAOIFI: refund excess over actual loss).", topic: "t5.6.1" },
    { id: "f5.11", cat: "Definitions", front: "Sahih, Fasid, Batil", back: "Valid; voidable (valid in Asl, defective in Wasf, curable); void (no effect).", topic: "t5.7" },
    { id: "f5.12", cat: "Contract rules", front: "Nafiz vs Mawquf; Lazim vs Ghair Lazim", back: "Effective vs suspended pending ratification; binding vs revocable (Wakalah, Kafalah, Shirkah, Wadi‘ah, ‘Ariyah are revocable by nature).", topic: "t5.7" },
    { id: "f5.13", cat: "Contract rules", front: "Effects of a Fasid sale where goods were delivered with consent", back: "Ownership passes by possession; buyer pays market value; revocable unless disposed of or altered; onward sale valid.", topic: "t5.7.2" },
    { id: "f5.14", cat: "Definitions", front: "Buyu’al Amanat (trust sales)", back: "Tawliyah (at cost), Murabaha (cost plus profit), Wadhi‘ah (at a loss).", topic: "t5.8" },
    { id: "f5.15", cat: "Banking", front: "How may banks charge for guarantees and L/Cs?", back: "No charge on Kafalah per se; fees for services via Wakalah/Ju‘alah based on expenses — amount-based (slabs possible), not time-based.", topic: "t5.8" },
    { id: "f5.16", cat: "Contract rules", front: "Effect of a void condition: commutative vs gratuitous contract", back: "Commutative: the contract becomes void. Gratuitous: only the condition is ineffective (e.g. interest clause in a loan — loan stands, principal only).", topic: "t5.8" }
  ],
  questions: [
    { id: "q5.1", type: "mcq", q: "Which type of goods is suitable for Salam according to Section 5.2?", options: ["Qimi (non-fungible) goods", "Mithli (fungible) goods", "Only real estate", "Currencies"], answer: 1, explanation: "p. 103.", topic: "t5.2", diff: "E", level: "recall", obj: "Classify goods" },
    { id: "q5.2", type: "tf", q: "An Ijarah contract that transfers ownership of the asset to the lessee as an automatic effect of the lease is void.", answer: true, explanation: "p. 102.", topic: "t5.2", diff: "M", level: "understanding", obj: "Apply ownership rules to Ijarah" },
    { id: "q5.3", type: "match", q: "Match the term to its meaning.", pairs: [["Sighah", "Offer and acceptance"], ["‘Aqidain", "Contracting parties"], ["Ma‘qud ‘alayh", "Subject matter"], ["Majlis", "Contractual session"]], explanation: "Sections 5.4 and 5.4.1.", topic: "t5.4", diff: "E", level: "recall", obj: "Identify elements of a contract" },
    { id: "q5.4", type: "scenario", q: "A seller says: ‘Take this item; if you pay within a month it is $100, within two months $105,’ and the buyer agrees without choosing. The contract is:", options: ["Valid", "Invalid because the price is uncertain", "Valid if the buyer pays in one month", "A Salam"], answer: 1, explanation: "p. 109.", topic: "t5.4.2", diff: "M", level: "application", obj: "Apply price-certainty rule" },
    { id: "q5.5", type: "multi", q: "Which contract combinations does Section 5.5.5 describe as permissible (subject to conditions)? (Select all.)", options: ["Shirkah with Ijarah", "Sale with a loan in one contract", "Wakalah with Murabaha", "Salam with Murabaha for export finance", "One article for two unchosen prices"], answer: [0, 2, 3], explanation: "p. 112–113.", topic: "t5.5.5", diff: "M", level: "understanding", obj: "Identify permissible combinations" },
    { id: "q5.6", type: "application", q: "A client promises to buy a car the bank purchased for $18,000 at $20,000, then backs out. The bank resells for $17,000. How much can the bank recover?", options: ["$3,000", "$2,000", "$1,000", "$0"], answer: 2, explanation: "Actual loss = 18,000 − 17,000 = $1,000; expected profit is not recoverable (p. 114).", topic: "t5.6", diff: "M", level: "application", obj: "Compute actual loss on promise breach" },
    { id: "q5.7", type: "comparison", q: "Which statement correctly contrasts Hamish Jiddiyah and ‘Arbun?", options: ["Both are taken after the sale", "HJ is taken before sale and held in trust; ‘Arbun is part of the price at execution", "‘Arbun is always refunded", "HJ is part of the price"], answer: 1, explanation: "p. 116.", topic: "t5.6.1", diff: "M", level: "understanding", obj: "Distinguish HJ and ‘Arbun" },
    { id: "q5.8", type: "identify", q: "A contract valid in its essence (Asl) but defective in its external attributes (Wasf), which can be regularised by removing the defect, is:", options: ["Batil", "Fasid", "Nafiz", "Lazim"], answer: 1, explanation: "p. 120.", topic: "t5.7.2", diff: "E", level: "recall", obj: "Classify contract validity" },
    { id: "q5.9", type: "mcq", q: "In a voidable lease contract, the lessor is entitled to:", options: ["The rent specified in the agreement", "Equitable market rent", "Nothing", "Double rent"], answer: 1, explanation: "p. 123.", topic: "t5.7.2", diff: "H", level: "understanding", obj: "Explain effects of Fasid contracts" },
    { id: "q5.10", type: "tf", q: "A condition of interest inserted into a loan makes the entire loan contract void.", answer: false, explanation: "Loans are gratuitous; the condition is void but the loan remains, repayable at principal (pp. 123, 125).", topic: "t5.8", diff: "M", level: "application", obj: "Apply effect of void conditions" },
    { id: "q5.11", type: "definition", q: "‘Resale at cost price plus profit — bargaining on profit margin’ is:", options: ["Bai‘ Tawliyah", "Bai‘ Wadhi‘ah", "Bai‘ Murabaha", "Bai‘ Musawamah"], answer: 2, explanation: "p. 124.", topic: "t5.8", diff: "E", level: "recall", obj: "Classify sales by price" },
    { id: "q5.12", type: "order", q: "Order the steps of forming a contract as described in Section 5.4.", items: ["Offer (Ijab) made clearly", "Acceptance (Qabul) conforming to the offer", "Both in the same session (or within granted time)", "Formal event concludes the contract; ownership and risk transfer"], explanation: "Sections 5.4.1–5.4.2.", topic: "t5.4.1", diff: "E", level: "understanding", obj: "Sequence contract formation" },
    { id: "q5.13", type: "scenario", q: "A homeowner whose house is mortgaged to a bank signs a contract to sell it without the bank’s involvement. The contract is:", options: ["Batil", "Mawquf (suspended) pending the mortgagee’s ratification", "Fully valid and effective", "Fasid due to Riba"], answer: 1, explanation: "p. 119.", topic: "t5.7", diff: "H", level: "application", obj: "Identify suspended contracts" },
    { id: "q5.14", type: "short", q: "Why is a sale contract not allowed to take effect from a future date, while Ijarah can?", answer: "Usufruct is owned gradually over time, so Ijarah (and Istisna‘a) can start from a future date. A sale transfers ownership immediately; postponing it involves Gharar because a party’s interest may lapse or the market/object may change, leading to regret and disputes. Contemporary scholars suggest a unilateral promise instead (Ibn Taymiyah and Ibn al-Qayyim differ).", keywords: ["usufruct", "gradually", "Gharar", "promise"], explanation: "Section 5.7.1.", topic: "t5.7", diff: "H", level: "analysis", obj: "Explain future-effective contracts" }
  ],
  exam: [
    { id: "e5.1", kind: "long", q: "Discuss the elements of a valid contract in Islamic law, with particular reference to the conditions of the subject matter.", structure: ["Three essential elements (and Sanhuri’s seven)", "Offer and acceptance rules; unity of session; Khiyar al-Shart", "Capacity of parties", "Subject matter conditions: existence, lawfulness, ownership, possession, deliverability, determination, price", "Constructive possession", "Exceptions: Salam, Istisna‘a; Hawalah for debts"], keyConcepts: ["Sighah", "Qabza", "Gharar", "Mabi‘/Thaman"], points: ["No short-selling", "Mortgaged asset cannot be sold", "Price must be fixed"], mistakes: ["Omitting possession", "Forgetting Salam exception"], topic: "t5.4.2" },
    { id: "e5.2", kind: "difference", q: "Differentiate between Sahih, Fasid and Batil contracts with examples and legal effects.", structure: ["Definitions (Asl/Wasf)", "Causes", "Examples", "Effects on ownership, price, onward sale", "Hanafi vs other schools"], keyConcepts: ["Asl", "Wasf", "market value"], points: ["Fasid curable", "Batil no effect"], mistakes: ["Treating Fasid and Batil as identical"], topic: "t5.7.2" },
    { id: "e5.3", kind: "short", q: "Is a promise binding in Islamic commercial law? Explain with the OIC Fiqh Academy conditions and an example.", structure: ["‘Ahd/Wa‘dah defined", "Juristic views", "OIC conditions", "Actual loss example", "Bilateral promise"], keyConcepts: ["Wa‘dah", "actual loss", "Muwa‘adah"], points: ["Opportunity cost excluded"], mistakes: ["Treating the promise as the sale"], topic: "t5.6" },
    { id: "e5.4", kind: "conceptual", q: "Why does Shari’ah prohibit ‘two contracts in one’, and how do Islamic banks combine contracts lawfully?", structure: ["Four prohibited forms", "Rationale: undefined rights/liabilities (Gharar)", "Permissible combinations with conditions", "Debt-for-debt prohibition"], keyConcepts: ["IMBT", "Diminishing Musharakah", "Wakalah"], points: ["Separate contracts", "Unilateral promise"], mistakes: ["Saying all combinations are prohibited"], topic: "t5.5.5" },
    { id: "e5.5", kind: "viva", q: "What is the difference between commutative and gratuitous contracts? Give examples.", structure: ["Definition", "Lists", "Fees for guarantees"], keyConcepts: ["Mu‘awadha", "Tabarru‘"], points: ["Amount-based not time-based fees"], mistakes: ["Listing Wakalah as purely gratuitous"], topic: "t5.8" }
  ]
});
