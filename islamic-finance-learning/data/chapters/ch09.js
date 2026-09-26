/* Chapter 9 — Murabaha and Musawamah. Source pp. 213–240. */
IFL_DATA.registerChapter({
  number: 9,
  title: "Murabaha and Musawamah",
  part: "part-iii",
  pages: [213, 240],
  minutes: 80,
  difficulty: "Intermediate",
  objectives: [
    "Recall the conditions of a valid sale as applied to Murabaha.",
    "Define Murabaha as a trust sale (Bai‘ al Amanah) and trace its classical treatment and purpose.",
    "State the specific conditions of Murabaha: eligible goods, cost disclosure, additional expenses, profit margin.",
    "Explain Murabaha–Mu’ajjal and why a credit price above cash price is not Riba.",
    "Compare the three possible structures and explain Murabaha to Purchase Orderer (MPO) as a bundle of contracts.",
    "Sequence the stages of MPO with the client as agent and identify Shari’ah risks at each stage.",
    "Evaluate issues: buy-back, Khiyar, timing, defaults, rebates, rollover, share and commodity Murabaha.",
    "Distinguish Musawamah from Murabaha and identify when each is suitable."
  ],
  why: "Murabaha is the most widely used Islamic financing mode — and the most criticised. Understanding exactly where ownership, possession and risk pass, and which shortcuts (rollover, buy-back, agent-only paperwork) turn it into disguised interest, is essential for exams and for practice.",
  overview: "The chapter recaps valid-sale conditions, defines Murabaha as a fiduciary cost-plus sale, explains its classical basis and need, its specific conditions and credit form, then examines structures — direct trading, third-party agent, client as agent — and in detail Murabaha to Purchase Orderer. It discusses issues (buy-back, options, timing, default, rebates, rollover, shares, commodity Murabaha), precautions (Boxes 9.1–9.4) and Musawamah.",
  summarySection: "9.12",
  topics: [
    {
      id: "t9.1", section: "9.1", title: "Introduction: Credit Sale Forms and MPO", pages: [213, 214], tier: "supporting",
      concepts: ["murabaha", "musawamah"],
      intuition: "Islamic banks don’t just finance trade — they must actually trade. How?",
      simple: "Islamic banks must be involved in buying and selling goods and bear business risk. Their clients need credit, so banks sell on credit (Bai‘ Mu’ajjal), usually as Musawamah (bargaining on price) or Murabaha (cost-plus with disclosed cost). Experts prefer PLS but Murabaha is used extensively. Modern bank Murabaha — Murabaha to Purchase Orderer — differs from classical Murabaha.",
      academic: [
        "Conventional banks provide funds for trade; Islamic banks must be involved in sale and purchase according to Shari’ah trading rules, earning profit by bearing business risk. Credit sale takes forms including Musawamah (bargain on price, delivery, deferred payment) and Murabaha (bargain on profit margin over a disclosed cost). Although experts advise PLS and discourage excessive Murabaha, its permissibility is beyond doubt and all Islamic banks use it extensively. Modern Murabaha is concluded with a prior promise to buy — Murabaha to Purchase Orderer (MPO), also the basis of the AAOIFI standard. Focus areas: fixity of price, ownership, risk and possession before sale, timing and receivables."
      ],
      exam: "Islamic banks trade and bear risk. Credit sale forms: Musawamah (price bargained) and Murabaha (margin over disclosed cost). Modern form = MPO (AAOIFI standard).",
      keyPoints: ["Murabaha permissibility is beyond doubt; its extensive use is debated."],
      related: ["t9.3", "t9.8"],
      quickCheck: { q: "What distinguishes Murabaha from Musawamah?", options: ["Murabaha is always cash", "In Murabaha the seller discloses cost and parties bargain on the profit margin", "Musawamah requires disclosure", "No difference"], answer: 1, explanation: "p. 213." },
      definitions: [
        { term: "Bai‘ Mu’ajjal", meaning: "A credit sale: goods are delivered now and the price is paid later, in a lump sum or instalments, at a fixed date." },
        { term: "Murabaha to Purchase Orderer (MPO)", meaning: "Murabaha concluded after a customer’s request and promise to buy: the bank buys the asset from a third party and sells it to the customer at cost plus profit on deferred payment." }
      ],
      confusions: [
        { wrong: "Bank Murabaha is identical to classical Murabaha.", right: "Classical Murabaha was an ordinary trust sale; modern bank Murabaha is MPO — preceded by a promise, often with the client as agent, and used on deferred payment (pp. 213, 217)." }
      ],
      examples: [
        { title: "Musawamah or Murabaha?", kind: "practice", text: "A bank sells a generator to a client for 1,150,000 payable in a year. If it tells the client its cost (1,000,000) and the agreed margin, the sale is Murabaha. If it just agrees a price without reference to cost, it is Musawamah (pp. 213–214)." }
      ]
    },
    {
      id: "t9.2", section: "9.2", title: "Conditions of Valid Bai‘ (Recap for Murabaha)", pages: [214, 215], tier: "core",
      concepts: ["bai", "qabd"],
      intuition: "A Murabaha is first of all a sale — so every sale condition applies.",
      simple: "Fourteen conditions: qualified parties; free consent; certainty of price, delivery and payment time; seller is owner or agent; transfer of title with ownership risks; subject exists; well-defined and owned; in physical or constructive possession; sale instant and absolute; lawful and valuable; specifically identified; certain delivery; one fixed price; unconditional (unless customary).",
      academic: [
        "(1) Parties qualified. (2) Free mutual consent. (3) Certainty of price, date/place of delivery and time of payment. (4) Seller is owner or agent. (5) Mabi‘ alienable; transfer of title means the buyer assumes ownership risks — damage, destruction, pilferage, theft, obsolescence, price/market risk. (6) Subject exists — a bank cannot execute Murabaha on goods already consumed. (7) Well-defined and owned — A cannot sell a car he intends to buy from C. (8) In physical or constructive possession (e.g. a car in a garage under the buyer’s control). (9) Sale instant and absolute — ‘I sell on 1 February’ said on 1 January is void; a promise may be given. (10) Lawful and valuable. (11) Specifically identified — ‘100 bales from that building’ unidentified is void. (12) Certain delivery — not a snatched car. (13) One price stipulated — ‘$50 in one month, $55 in two’ is void unless one is chosen. (14) Unconditional, unless the condition is usual trade practice not prohibited."
      ],
      exam: "14 conditions: capacity; consent; certainty (price, delivery, payment); ownership/agency; title with risk; existence; defined and owned; possession; instant; lawful; identified; certain delivery; one price; unconditional.",
      keyPoints: ["Murabaha on consumed goods is invalid.", "Unidentified bales: void (loss allocation impossible)."],
      conditions: [
        "Qualified parties",
        "Free consent",
        "Certainty of price, delivery, payment time",
        "Seller owns (or is agent)",
        "Buyer assumes ownership risks",
        "Subject exists",
        "Well-defined and owned",
        "Physical or constructive possession",
        "Instant and absolute",
        "Lawful and valuable",
        "Specifically identified",
        "Certain delivery",
        "One fixed price",
        "Unconditional (unless customary)"
      ],
      related: ["t6.5", "t5.4.2"],
      quickCheck: { q: "On 1 January A says to B: ‘I sell my car to you on 1 February.’ This sale is:", options: ["Valid", "Void — a sale attributed to a future date; only a promise is possible", "Salam", "Istisna‘a"], answer: 1, explanation: "p. 214." },
      examples: [
        { title: "The snatched car", kind: "textbook", text: "Selling a car that has been snatched, hoping to recover it, is void — delivery must be certain, not contingent on chance (p. 215)." },
        { title: "100 bales “from that building”", kind: "textbook", text: "Selling 100 unidentified bales out of those in a building is void, because if the cotton is damaged no one can tell whose loss it is (p. 215)." }
      ]
    },
    {
      id: "t9.3", section: "9.3", title: "Murabaha — a Bai‘ al Amanah (Trust Sale)", pages: [215, 215], tier: "core",
      concepts: ["murabaha", "trust-sales"],
      intuition: "Why is Murabaha called a ‘trust’ sale?",
      simple: "Some sales require the seller to declare his cost honestly: Tawliyah (at cost), Wadhi‘ah/Mohatah (at a discount) and Murabaha (at cost plus fixed profit). These are Buyoo‘ al Amanat — fiduciary sales. Musawamah, the most common sale, has no reference to cost. All can be spot or deferred.",
      academic: [
        "Forms of Bai‘ effective with express mention of original cost — Tawliyah (resale at original price, no profit or loss), Wadhi‘ah or Mohatah (resale at a discount on cost) and Murabaha (sale with a fixed profit over cost) — require honest declaration of cost and are Buyoo‘ al Amanat (fiduciary sales). Musawamah is an ordinary sale at a mutually agreed price without reference to cost. All can be spot or deferred. In Murabaha the seller informs the buyer of the original cost and they agree a stipulated profit."
      ],
      exam: "Trust sales (Buyoo‘ al Amanat): Tawliyah (at cost), Wadhi‘ah/Mohatah (below cost), Murabaha (cost + profit). Musawamah: no cost reference.",
      keyPoints: ["Honest cost declaration is the defining feature."],
      table: { caption: "Sales classified by reference to cost", head: ["Sale", "Price basis", "Cost disclosed?"], rows: [["Tawliyah", "At original cost", "Yes"], ["Wadhi‘ah / Mohatah", "At a discount on cost", "Yes"], ["Murabaha", "Cost plus agreed profit", "Yes"], ["Musawamah", "Freely bargained price", "No"]] },
      related: ["t5.8", "t9.11"],
      quickCheck: { q: "Resale at a discount from the original cost is called:", options: ["Tawliyah", "Wadhi‘ah/Mohatah", "Murabaha", "Musawamah"], answer: 1, explanation: "p. 215." },
      definitions: [
        { term: "Tawliyah", meaning: "Resale at the stated original cost, with no profit or loss." },
        { term: "Wadhi‘ah / Mohatah", meaning: "Resale at a discount on the original cost." },
        { term: "Musawamah", meaning: "Ordinary sale at a mutually agreed price with no reference to the seller’s cost." }
      ],
      confusions: [
        { wrong: "In Murabaha the parties bargain on the price.", right: "In Murabaha they bargain on the profit margin over a disclosed cost; bargaining on the price itself, without disclosing cost, is Musawamah (p. 215)." }
      ],
      examples: [
        { title: "Four sales, one good", kind: "textbook", text: "Cost 100. Resold at 100: Tawliyah. Resold at 90: Wadhi‘ah (Mohatah). Resold at 110 with the cost disclosed: Murabaha. Resold at a bargained 110 with no mention of cost: Musawamah (p. 215)." }
      ]
    },
    {
      id: "t9.4", section: "9.4", title: "Bai‘ Murabaha in Classical Literature", pages: [215, 216], tier: "supporting",
      concepts: ["murabaha"],
      intuition: "Was Murabaha a financing technique in classical Fiqh? No — it was a type of trade.",
      simple: "Murabaha (from Ribh — profit) was practised before Islam and recorded by Imam Malik. Al-Marghinani: sale at the purchase price plus a fixed profit. Ibn Qudama: sale at capital cost plus known profit — lawful without controversy. Malik saw it as a spot exchange and Malikis disliked it for its many conditions; Shafi‘i extended it to credit. It is a contract of trustworthiness.",
      academic: [
        "Murabaha derives from Ribh (gain, profit). Practised pre-Islam; mentioned by Imam Malik in Al-Mu’watta. Al-Marghinani: “sale of anything for the price at which it was purchased by the seller and an addition of a fixed sum by way of profit.” Ibn Qudama: sale at capital cost plus known profit, knowledge of cost a precondition — “I sell for cost 100 plus profit 10” — lawful without controversy. Imam Malik: completed by exchanging goods and price with agreed margin then and there — no credit. Malikis disliked it (difficult conditions) but did not prohibit it. Imam Shafi‘i (Kitabul Umm) extended it to credit. Buyer must know the original price, expenses and profit; Murabaha is a contract of trustworthiness."
      ],
      exam: "Classical Murabaha: cost + known profit (Marghinani, Ibn Qudama); Malik — spot; Shafi‘i — extended to credit; contract of trust.",
      keyPoints: ["Malikis considered it difficult (many conditions)."],
      related: ["t9.5"],
      quickCheck: { q: "Who extended the concept of Murabaha to credit transactions?", options: ["Imam Malik", "Imam Shafi‘i", "Ibn Khaldun", "Abu Yusuf"], answer: 1, explanation: "p. 216." },
      definitions: [
        { term: "Ribh", meaning: "Gain or profit — the root of the word Murabaha." }
      ],
      confusions: [
        { wrong: "All classical schools treated Murabaha as a credit-financing technique.", right: "For Imam Malik it was a spot exchange with no credit; Imam Shafi‘i extended it to credit. Malikis disliked it for its many conditions but did not forbid it (p. 216)." }
      ],
      examples: [
        { title: "Ibn Qudama’s formula", kind: "textbook", text: "“I sell to you at my cost of 100 plus a profit of 10.” Knowing the cost is the precondition, and such a sale is lawful without controversy (pp. 215–216)." }
      ]
    },
    {
      id: "t9.5", section: "9.5", title: "The Need for Murabaha", pages: [216, 217], tier: "supporting",
      concepts: ["murabaha"],
      intuition: "What was Murabaha originally for?",
      simple: "Classically, Murabaha protected inexperienced buyers from cunning traders: a buyer relied on an honest Murabaha dealer’s disclosed cost. Imam Ahmad preferred Musawamah because Murabaha’s trust invites false statements. Modern bank Murabaha is on deferred payment; cost disclosure matters less since the customer often locates the goods.",
      academic: [
        "Al-Marghinani: Murabaha (and Tawliyah) protects innocent consumers lacking trading skill from tricks — the buyer pays an honest dealer an agreed addition over cost. Imam Ahmad: Musawamah is easier because Murabaha implies trust and detailed description; selfishness may lead to false statements or mistakes amounting to fraud. A Ja‘fari jurist expressed similar views. Modern Murabaha by banks is on deferred payment, creating a receivable; disclosure of cost is necessary but less contentious as the customer is involved in locating and purchasing goods."
      ],
      exam: "Classical purpose: protect unskilled buyers via honest cost disclosure. Imam Ahmad preferred Musawamah. Modern: deferred-payment receivable; customer involved in sourcing.",
      keyPoints: ["Imam Ahmad feared false cost statements."],
      related: ["t9.11"],
      quickCheck: { q: "According to Al-Marghinani, the main purpose of Murabaha was to:", options: ["Provide bank financing", "Protect innocent purchasers from exploitation by cunning traders", "Avoid Zakat", "Speculate on prices"], answer: 1, explanation: "p. 216." },
      examples: [
        { title: "Why Imam Ahmad preferred Musawamah", kind: "textbook", text: "Murabaha relies on trust and detailed description; the seller may be tempted to misstate cost or err, turning it into fraud, so ordinary sale is easier and safer (p. 216)." }
      ],
      distinctions: [
        { a: "Classical purpose", b: "Modern use", text: "Classically Murabaha protected unskilled buyers through honest cost disclosure; in banking it creates a deferred receivable and the customer usually helps locate the goods, so cost disclosure is less of an issue (pp. 216–217)." }
      ]
    },
    {
      id: "t9.6", section: "9.6", title: "Specific Conditions of Murabaha", pages: [217, 219], tier: "core",
      concepts: ["murabaha"],
      intuition: "What can be sold by Murabaha, and what can be included in ‘cost’?",
      simple: "Goods must be real (intangibles like rights are fine) — not currencies, gold/silver (Sarf) or debt documents. The seller must state the true cost plus customary value-adding expenses (“this has cost me…”, not “I bought at…”), disclose defects, benefits and payment terms (including if he bought on credit), and pass on supplier rebates. The margin is agreed and cannot rise later. The cost must be known in identical units. False statements give the buyer options.",
      academic: [
        "(1) Goods real, not necessarily tangible — rights and royalties may be traded. (2) Currencies/monetary units (Sarf) cannot be sold by Murabaha. (3) Credit documents (debt) cannot — debt sale only via Hawalah, and profit on debt is Riba. (4) The seller states the original price and additional expenses that enhance value and are customarily added (transport, processing, packing), saying “this has cost me so much”, not “I purchased at this rate”. Hanafis include all expenses modifying the object (tailoring, dyeing) or incurred for it (transport, storage, commission); Malikis: add direct expenses and outsourced services, but not services the seller could have provided himself (packing, sales commission) — Shafi‘is agree; Hanbalis: all expenses with mutual consent if the breakdown is disclosed.",
        "(5) Disclose all aspects — defects, additional benefits, mode of payment to the supplier; all schools agree the buyer must be told if the seller bought on credit; deliberate inflation of cost violates Murabaha; supplier rebates received even after the sale benefit the client (AAOIFI). (6) The margin is mutually agreed; the deferred price cannot be increased (only reduced by rebates). (7) No Majhul price: cost must be in identical units (dirhams, dinars or specific weights). (8) On incorrect cost statements: Malik — buyer may rescind unless the difference is returned; Hanafis — unqualified option to rescind; Hanbalis — binding after the difference is returned; Shafi‘is — two versions. (9) The buyer has an option even unstipulated for fraud; if discovered after use/destruction, Abu Hanifa and Muhammad: no deduction; Abu Yusuf and Ibn Abi Laila: deduction allowed.",
        "Medieval Murabaha was trade, not financing; contemporary jurists accept it as a mode with limits of transparency and justice; Malikis considered it Naqis (defective), so its permissibility is not as absolute as ordinary sale. Since there is no prohibition for experienced traders, it can be an alternative to interest where Shari’ah boards allow (the CII lists uses in fixed investment, working capital, agriculture, commerce, mining and consumer durables)."
      ],
      exam: "Eligible: real goods incl. intangibles; not currency/gold/silver or debt. Disclose true cost + customary expenses (‘cost me’), credit purchase, defects; pass rebates; margin fixed; cost in identical units; false statement → buyer’s option. School differences on expenses.",
      keyPoints: [
        "Rights and royalties can be Murabaha subjects.",
        "Buyer must be told if the seller bought on credit.",
        "Supplier rebate after sale goes to the client.",
        "Malikis call Murabaha Naqis (defective).",
        "Malikis treat Murabaha as Naqis (defective): its permissibility is less absolute than ordinary sale.",
        "The CII (1980) listed Murabaha uses in fixed investment, working capital, agriculture, commerce, mining and consumer durables."
      ],
      table: { caption: "Which expenses may be added to Murabaha cost (by school)", head: ["School", "Position"], rows: [["Hanafi", "All expenses modifying the object or incurred for its sake (tailoring, dyeing, transport, storage, commission)"], ["Maliki", "Direct expenses and outsourced services — yes; services the seller could provide himself (packing, sales commission) — no"], ["Shafi‘i", "Like Malikis — seller’s own services cannot be added"], ["Hanbali", "All expenses with mutual consent if the breakdown is disclosed"]] },
      related: ["t9.3", "t4.2.8", "t9.9"],
      quickCheck: { q: "Which of these can NOT be the subject of Murabaha?", options: ["Machinery", "Royalty rights", "US Dollars", "Raw materials"], answer: 2, explanation: "Currencies are subject to Sarf rules (p. 217)." },
      examples: [
        { title: "“It cost me” vs “I bought it at”", kind: "textbook", text: "If transport, processing or packing is added to cost, the seller must say “this has cost me so much”, not “I purchased it at this rate” — the latter would be false (p. 217)." }
      ],
      confusions: [
        { wrong: "A Murabaha seller need not tell the buyer that he himself bought on credit.", right: "All schools agree the buyer must be told if the original price was on credit, since credit prices are usually higher (p. 218)." }
      ]
    },
    {
      id: "t9.6.1", section: "9.6.1", title: "Bai‘ Murabaha and Credit Sale (Murabaha–Mu’ajjal)", pages: [219, 220], tier: "core",
      concepts: ["murabaha", "time-value"],
      intuition: "Murabaha becomes a financing tool only when payment is deferred. Why is that not Riba?",
      simple: "Credit sale (Bai‘ Mu’ajjal) is lawful if the period is fixed (Hidaya: the Prophet bought on credit pledging his breastplate). Combined with Murabaha it is cost plus profit with deferred payment. A credit price above cash price is not Riba because money is exchanged for goods (different kinds), and the parties bear price risk — consistent with Al-Ghunm bil Ghurm. One price must be fixed. Not allowed for gold, silver, currencies or receivables; allowed for screened shares.",
      academic: [
        "Murabaha is important as an alternative to interest only on a deferred basis. Legality of postponement is a general feature of lawful sale (Bai‘ Mu’ajjal, lump sum or instalments; Majallah: Bai‘ bil Nasiah / bi al Ta’jil wa al Taqsit). Hidaya: valid for ready money or future payment if the period is fixed — uncertainty invites disputes. The seller may postpone payment for the buyer’s convenience, even forgo it. Hanafis, Shafi‘is and Hanbalis permit different cash and credit prices if one is settled; Malik forbade it but some Malikis allow; contemporary jurists almost unanimous. Rationale: in loans, like is exchanged for like ($100 for $100) so excess is Riba; in credit sale money is exchanged for goods, so price differences are not Riba. Also, interest is payable in any case, while in sale prices may move — if prices rise the buyer gains, if they fall the seller gains — consistent with Al-Ghunm bil Ghurm. The sale must be finalised at one price. Deferred Murabaha is not allowed for gold, silver or currencies (Sarf) nor receivables (profit on debt is Riba); Murabaha of screened shares is allowed."
      ],
      exam: "Murabaha–Mu’ajjal = cost + profit with fixed deferred payment. Credit > cash price OK (goods for money, not like for like; price risk borne; Al-Ghunm bil Ghurm); one price fixed. Not for Sarf items or debt; OK for screened shares.",
      keyPoints: [
        "Period of payment must be fixed.",
        "Prices may move after sale — risk on both sides.",
        "Murabaha of eligible shares (after screening) is allowed; of gold, silver, currency or debt is not."
      ],
      related: ["t6.5.3", "t4.6"],
      quickCheck: { q: "Why is the difference between purchase and credit sale price not Riba, according to Section 9.6.1?", options: ["Because banks set it", "Because money is exchanged for goods (not like for like) and price risk exists, consistent with Al-Ghunm bil Ghurm", "Because it is small", "Because it is disclosed"], answer: 1, explanation: "p. 220." },
      examples: [
        { title: "Garment on credit, breastplate as pledge", kind: "textbook", text: "Hidaya cites the Prophet (pbuh) buying a garment from a Jew on credit for a fixed date and pledging his breastplate — credit sale is valid if the period is fixed (p. 219)." }
      ],
      confusions: [
        { wrong: "A credit sale price above cash price is just like loan interest.", right: "In a loan the like is exchanged for the like, so any excess is Riba; in credit sale money is exchanged for goods, prices may move either way and profit goes with loss (Al-Ghunm bil Ghurm) (p. 220)." }
      ]
    },
    {
      id: "t9.7", section: "9.7", title: "Possible Structures of Murabaha", pages: [220, 222], tier: "core",
      concepts: ["murabaha", "wakalah"],
      intuition: "Who actually buys the goods — the bank, a third-party agent, or the client as agent? Each option shifts risk and Shari’ah exposure.",
      simple: "Banks may set up trading subsidiaries. Three structures: (1) direct trading by bank management — most ideal for Shari’ah but managerially hard (suits bulk/trademarked goods, e.g. fertiliser via dealers); (2) purchase through a third-party agent — best for possession and risk (AAOIFI prefers it; client as agent only in dire need); package of MoU/promise, sale deed and promissory note; (3) client as agent — safest for the bank’s commodity risk but most likely to become a back door to interest; goods must come into the bank’s ownership and risk.",
      academic: [
        "Trading requires expertise banks may lack; banks may establish special purpose trading/leasing companies with specialised staff, or trade via the client or a third-party agent.",
        "9.7.1 Direct trading by bank management: most ideal for Murabaha essentials but may cause managerial problems and corruption without internal controls; suitable for high-value or trademarked goods bought in bulk for inventory (e.g. an agricultural subsidiary buying fertiliser/pesticides and selling via dealers) — prices closer to cash market.",
        "9.7.2 Through a third party/agent: most likely to accomplish possession and commercial risk by the bank between purchase and sale; the bank bears risk until handover; the customer cannot guarantee transport risk (bank can mitigate by taking delivery at its godowns). AAOIFI: third-party agent is better; customer as agent only in dire need. Package: (i) MoU/agreement to sell — request and promise, possibly margin/reference rate, provided a definite price is fixed at execution; (ii) sale deed when goods are in the bank’s ownership and risk; (iii) promissory note (better after sale, since it says ‘against value received'); plus security, quality description, defects and default clauses.",
        "9.7.3 Client as agent: safest for the bank against commodity risk but more likely to be a back door to interest; goods must come into the bank’s ownership and risk; the customer should disclose agency status to the supplier. If the bank only pays for goods the client already bought, it is a loan and profit is interest."
      ],
      exam: "Structures: direct (ideal, managerially hard), third-party agent (best for risk/possession; AAOIFI preferred), client as agent (most used; back-door risk; client must disclose agency; bank must own and bear risk). Package: MoU/promise, sale deed, promissory note.",
      keyPoints: [
        "AAOIFI: client as agent only in dire need.",
        "Bank paying for goods already bought by client = loan with interest.",
        "Promissory note preferably after sale."
      ],
      subsections: [
        { number: "9.7.1", title: "Direct Trading by Bank Management", page: 221, points: ["Ideal but managerially hard", "Bulk/trademarked goods"] },
        { number: "9.7.2", title: "Bank Purchases Through a Third Party/Agent", page: 221, points: ["Best for risk and possession", "AAOIFI preference", "MoU, sale deed, promissory note"] },
        { number: "9.7.3", title: "Murabaha Through the Client as Agent", page: 222, points: ["Safest for bank’s risk", "Back door to interest if misused"] }
      ],
      table: { caption: "Three Murabaha structures compared (pp. 220–222)", head: ["Structure", "Shari’ah strength", "Practical issue"], rows: [["Direct trading by the bank", "Most ideal", "Managerial burden, risk of corruption; suits bulk/trademarked goods"], ["Purchase through a third-party agent", "Best for possession and risk; AAOIFI prefers it", "Bank bears transit risk until delivery"], ["Client as the bank’s agent", "Safest for the bank’s commodity risk", "Most likely to become a back door to interest"]] },
      related: ["t9.8", "t13.2"],
      quickCheck: { q: "Which structure does the AAOIFI standard consider better, allowing the client as agent only in dire need?", options: ["Client as agent", "Purchase through a third-party agent", "No agent at all", "Bank lending cash"], answer: 1, explanation: "p. 221 (footnote)." },
      confusions: [
        { wrong: "If the bank simply pays the supplier for goods the client already received, it is Murabaha.", right: "Without the bank owning the goods, payment on the client’s behalf is a loan and any profit is interest (p. 222)." }
      ],
      examples: [
        { title: "Fertiliser through a subsidiary", kind: "textbook", text: "A bank’s agricultural subsidiary buys fertiliser in bulk, holds it as inventory and sells it to farmers through dealers on Murabaha. This is direct trading, the most ideal structure, with prices close to the cash market (pp. 220–222)." }
      ]
    },
    {
      id: "t9.8", section: "9.8", title: "Murabaha to Purchase Orderer (MPO)", pages: [222, 224], tier: "core",
      concepts: ["mpo", "murabaha"],
      intuition: "Why don’t Islamic banks keep warehouses of goods? MPO lets them buy only what a client orders.",
      simple: "In MPO the bank, on a client’s request, buys an asset from a third party and sells it to the client on deferred payment. It is used because banks don’t hold inventories, can’t stock every item, clients need specific goods, and regulators restrict trading. The client may nominate the supplier, but must not have already bought or committed to buy (else ‘Inah). Payment should go directly to the supplier; avoid double agency. Murabaha cannot replace a running finance facility.",
      academic: [
        "MPO (Murabaha lil ‘amri bil Shira / Murabaha li Wa‘da bi Shira): upon a customer’s request, the bank purchases an asset from a third party and sells it on deferred payment — used by almost all Islamic banks and the IDB for trade finance. Needs: banks do not keep inventories (costs); the list of goods is long; clients need specific quality; regulators do not allow trading as core business (liquidity, asset/market risk, cartels).",
        "AAOIFI: IFIs may purchase only in response to customers’ applications; the wish is not a promise unless made in due form (can be in the requisition). The customer may indicate the supplier, but the bank must ensure the supplier is a third party and the client has not already purchased or firmly committed; otherwise ‘Inah. A performance bond may be taken. The bank may not enter Musharakah with a promise to buy the other’s share by Murabaha; a promise to buy at market or agreed price by separate contract is allowed.",
        "IFIs may also build inventories; buying, possessing and owning with risk and reward is required. Murabaha cannot substitute a running finance facility providing cash. Banks may set up asset management/trading subsidiaries holding inventory — higher margins, cheaper items. If the customer is agent, he buys on the bank’s behalf and takes possession; payment by the bank directly to the supplier; double agency (paying and purchasing) should be avoided; the goods remain at the financier’s risk until the client buys them for a deferred price."
      ],
      exam: "MPO: bank buys on client’s request from a third party and sells on credit. Reasons: no inventories, many items, specific quality, regulation. Supplier third party; no prior purchase/commitment by client (else ‘Inah). Direct payment to supplier; no double agency. Not a running finance substitute.",
      keyPoints: [
        "Client’s wish is not a promise unless in due form.",
        "Performance bond for client-nominated supplier.",
        "Avoid double agency (payment + purchase).",
        "Reasons for MPO: banks avoid inventories, cannot stock every item, clients need specific goods, and regulators restrict banks from trading as core business.",
        "Double agency (for payment and for purchase) should be avoided; the bank should pay the supplier directly."
      ],
      related: ["t9.8.1", "t9.8.2", "t9.8.3", "t6.11"],
      quickCheck: { q: "A client has already bought machinery from a supplier and asks the bank to ‘do a Murabaha’ to pay the supplier. This would be:", options: ["Valid MPO", "Bai‘ al ‘Inah / a loan with interest — not compliant", "Musawamah", "Salam"], answer: 1, explanation: "pp. 222–223." },
      confusions: [
        { wrong: "Under MPO the bank may never hold inventory.", right: "MPO permits buying only on request, but banks (or trading subsidiaries) may hold inventory; ownership and risk before sale are what matter (p. 223)." }
      ],
      examples: [
        { title: "Client-nominated supplier", kind: "textbook", text: "A client asks the bank to buy looms from Supplier S, whom he has chosen. The bank may do so, but must check that the client has not already bought or committed to buy from S — otherwise the deal would be ‘Inah — and may take a performance bond from S (pp. 222–224)." }
      ]
    },
    {
      id: "t9.8.1", section: "9.8.1", title: "MPO — A Bunch of Contracts", pages: [224, 224], tier: "core",
      concepts: ["mpo", "wakalah", "wad"],
      intuition: "An MPO is not one contract but three. Which, and in what order?",
      simple: "(1) A master contract plus the client’s unilateral promise to purchase (binding him, not the bank); (2) an agency contract (client or third party buys and takes possession for the bank) — separate from the Murabaha; (3) the actual Murabaha, concluded only when the bank owns the goods. This raises questions: promise binding or not, remedies, sequencing, early/late payment, loss mitigation.",
      academic: [
        "MPO comprises three distinct contracts: (1) a master contract defining the facility, followed by an agreement to purchase — a unilateral promise binding the client, not the bank, rather than a bilateral forward sale; (2) an agency contract under which the agent (client or third party) purchases the item and takes possession on the bank’s behalf, separate from the Murabaha agreement; (3) the actual Murabaha contract, concluded when the bank owns the commodity. Issues: unilateral or bilateral, binding or not; remedy if the client backs out; sequencing; early or delayed payment; loss mitigation; structure meeting stakeholder needs."
      ],
      exam: "MPO = (1) master agreement + unilateral promise; (2) separate agency; (3) Murabaha after bank ownership.",
      keyPoints: [
        "Promise binds client only.",
        "Agency separate from Murabaha.",
        "The agency contract must be separate from the Murabaha agreement.",
        "The promise is unilateral: it binds the client, not the bank."
      ],
      steps: [
        "Master agreement and client’s unilateral promise to purchase",
        "Agency contract — agent buys and takes possession for the bank",
        "Actual Murabaha — after bank owns the goods"
      ],
      related: ["t9.8.2", "t5.5.5"],
      quickCheck: { q: "In MPO, the ‘agreement to buy’ is best described as:", options: ["A bilateral forward sale", "A unilateral promise binding the client", "The sale itself", "A loan"], answer: 1, explanation: "p. 224." },
      examples: [
        { title: "Three separate papers", kind: "practice", text: "Month 1: the client signs a master agreement and promises to buy. Month 2: a separate agency agreement appoints him to buy steel for the bank. Month 3: once the bank owns the steel, the client offers to buy and the bank accepts — the Murabaha itself (p. 224)." }
      ]
    },
    {
      id: "t9.8.2", section: "9.8.2", title: "Promise to Purchase in Murabaha", pages: [224, 225], tier: "core",
      concepts: ["wad", "hamish-jiddiyah", "khiyar"],
      intuition: "If the bank buys goods relying on the client’s promise and the client walks away, what happens?",
      simple: "Classically promises were not enforceable (Abu Hanifa, Shafi‘i, Ahmad, some Malikis), but many jurists enforce them, and a Maliki view binds where expenses were incurred. Usmani: in commerce, an absolute promise on which the other incurs liabilities is enforceable — purchase or actual damages, no opportunity cost (OIC, AAOIFI). A mutual promise is allowed only with an option to one party. The bank may take Hamish Jiddiyah, and keep a Khiyar al-Shart with the supplier. The promise is not the sale.",
      academic: [
        "Classical view: mere promises are not binding through courts. Other jurists enforce them; a Maliki view binds where the promisee incurred expenses or liability. Usmani: fulfilling promises is obligatory; in commercial dealings where an absolute promise led the other to incur liabilities and the parties agreed it binds, a court or arbitration may force purchase or actual damages — actual monetary loss excluding opportunity cost (OIC Fiqh Academy 5th session; AAOIFI MPO standard). A mutual (bilateral) promise in Murabaha is permissible only if an option (Khiyar) is given to one or both; otherwise it is like a sale of goods not possessed. The bank may take Hamish Jiddiyah. On a client’s request, the bank may buy from the supplier with Khiyar al-Shart (option to return within a period), expiring on sale to the customer — a risk mitigation tool. The actual sale must take place by offer and acceptance once the bank has ownership and possession."
      ],
      exam: "Promise binding in commerce (Usmani, OIC, AAOIFI): specific performance or actual damages (no opportunity cost). Bilateral promise only with Khiyar. Hamish Jiddiyah; bank’s Khiyar al-Shart with supplier mitigates asset risk. Promise ≠ sale.",
      keyPoints: ["Opportunity cost excluded from damages.", "Khiyar with supplier as risk tool."],
      related: ["t5.6", "t5.6.1", "t3.3.2"],
      quickCheck: { q: "When is a mutual (bilateral) promise permissible in Murabaha per AAOIFI?", options: ["Always", "Only if an option (Khiyar) is given to one or both parties", "Never", "Only for governments"], answer: 1, explanation: "p. 225." },
      examples: [
        { title: "Option to return to the supplier", kind: "textbook", text: "The bank may buy from the supplier with Khiyar al-Shart (option to return) for a set period, expiring when it sells to the client — a tool against asset risk if the client backs out (p. 225)." }
      ],
      confusions: [
        { wrong: "A bilateral binding promise in Murabaha is always allowed.", right: "A mutual binding promise is like a sale of goods not yet owned, so it is permissible only if one or both parties keep an option (p. 225)." }
      ]
    },
    {
      id: "t9.8.3", section: "9.8.3", title: "MPO with the Customer as the Bank’s Agent — Stages", pages: [225, 229], tier: "core",
      concepts: ["mpo", "wakalah", "qabd"],
      intuition: "Walk through a real bank Murabaha step by step — where can it go wrong?",
      simple: "Seven steps: request; bank appoints client as agent; bank buys via client; bank pays supplier; client takes delivery for the bank; client offers to buy and bank accepts (title passes); client pays on deferred basis without rollover. Stages: pre-promise (genuine goods need, no prior contract with supplier, supplier not >50% owned by client, eligible goods), MoU, requisition (promise, HJ), agency (before purchase), purchase (rebates passed on; price changes approved), possession (goods in bank’s risk; not already used), offer and acceptance (price and dates fixed; relationship becomes debtor–creditor), security.",
      academic: [
        "General structure: (1) request; (2) bank appoints client as agent; (3) purchase through the client; (4) bank pays supplier; (5) client takes delivery as agent; (6) client offers, bank accepts — title transfers; (7) deferred payment without rollover, discount or rebate. Stages: pre-promise understanding; promise; agency; possession; execution; post-execution. Relationships: principal–agent; promisor–promisee; buyer–seller (bank–supplier); seller–buyer (bank–client); creditor–debtor.",
        "Pre-promise/facility approval: genuine trade of goods, not liquidity or cash finance; no prior contractual relationship between client and supplier (transferring an executed contract is ‘Inah); supplier a third party — not the customer, his agent or an entity >50% owned by him; commodity within Murabaha scope (no gold, silver, currencies); risk analysis of goods and client. Promise stage — master Murabaha facility agreement/MoU: limit, commodity, margin, schedule, security, specimens of requisition, delivery report, promissory note, collateral; many sub-Murabahas possible; agency agreement may be signed here. Purchase requisition: goods, supplier, cost, delivery date; ensure goods not already owned by client (else income to charity); promise to buy; performance bond; Hamish Jiddiyah — actual loss recoverable, not cost of funds or opportunity cost. Pay supplier directly; advance payment possible with higher margin.",
        "Agency stage: agreement before purchase (otherwise ‘Inah); specific or general agency. Purchasing: per specifications; rebates passed on by reducing cost; price escalation to be approved; commodity change by consent; time limit, refund of cost without opportunity cost if delayed. Title and possession: bank must take ownership and actual or constructive possession — goods under the bank’s risk (OIC 6th session on forms of possession); the point of risk transfer must be clear (hence natural gas in pipes is not approved); goods must exist — using them in production before offer and acceptance creates a Shari’ah objection; inspection advisable; ownership expenses (Takaful) and pre-sale loss are the bank’s.",
        "Execution: possession report and offer by client; bank’s acceptance with contract price and payment schedule; relationship becomes debtor–creditor; bank no longer liable for harm. Client confirms examination; AAOIFI: bank assigns to the client its recourse against the supplier for defects. Security: hypothecation, pledge, lien, mortgage, guarantees; the sold item itself may be security once possession is given; some boards allow interest-bearing securities (recourse to principal only), but it is preferable to encash them for compliant securities."
      ],
      exam: "MPO with client as agent: request → agency → purchase via client → bank pays supplier → client possesses for bank → client offers/bank accepts → deferred payment (no rollover). Key checks: genuine goods; no prior client–supplier contract; supplier ≤50% client-owned; agency before purchase; bank bears risk until sale; goods exist at execution; direct payment; rebates passed on.",
      keyPoints: [
        "Five relationships between bank, client and supplier.",
        "Supplier must not be >50% owned by the client.",
        "Goods used before offer and acceptance → objection.",
        "Natural gas in pipes: risk-transfer point unclear.",
        "Invoice date must fall between the agency agreement and the offer to purchase.",
        "Before Murabaha execution, Takaful and any loss belong to the bank as owner.",
        "A sold commodity may itself be pledged back to the bank once possession has passed to the client."
      ],
      steps: [
        "Customer requests purchase of a lawful commodity",
        "Bank appoints customer as its agent (separate agency agreement)",
        "Customer buys the commodity on the bank’s behalf",
        "Bank pays the supplier directly",
        "Customer takes delivery as agent — goods at the bank’s risk",
        "Customer offers to buy; bank accepts — title and risk pass to customer",
        "Customer pays the fixed deferred price — no rollover, discount or rebate"
      ],
      related: ["t9.9", "t9.10", "t14.4.2"],
      quickCheck: { q: "At what point does the relationship between the bank and client become debtor–creditor in MPO?", options: ["When the MoU is signed", "When the agency agreement is signed", "When the bank accepts the client’s offer to purchase (Murabaha executed)", "When the supplier is paid"], answer: 2, explanation: "p. 229." },
      table: { caption: "Relationships between the parties in MPO (p. 226)", head: ["Stage", "Relationship"], rows: [["Agency", "Bank = principal, client = agent"], ["Promise", "Client = promisor, bank = promisee"], ["Purchase", "Bank = buyer, supplier = seller"], ["Murabaha sale", "Bank = seller, client = buyer"], ["After sale", "Bank = creditor, client = debtor"]] },
      examples: [
        { title: "Invoice dates in MPO", kind: "textbook", text: "The agency agreement is signed on 1 March and the client’s offer to purchase on 20 March. A supplier invoice dated 25 February means the goods were bought before the agency, so the bank never owned them: the invoice must fall between the two dates (pp. 225–229)." }
      ]
    },
    {
      id: "t9.9", section: "9.9", title: "Issues in Murabaha: Two Sales in One, Timing, Shares and Commodity Murabaha", pages: [229, 233], tier: "core",
      concepts: ["murabaha", "tawarruq"],
      intuition: "Critics raise several objections to bank Murabaha. Which are answered, and which remain concerns?",
      simple: "Objection: binding promise + sale = two sales in one — answered: a unilateral promise is not a contract. Timing: execute only after the bank owns and possesses the goods; agency and sale must be separate. Shares Murabaha is allowed with screening, payment to brokers directly, no client as agent, bank bearing settlement-period price risk, and no sister-concern shares. Commodity Murabaha on exchanges (e.g. LME) via Tawarruq is tricky: doubts about actual transactions and risk transfer; should be used only in extreme cases.",
      academic: [
        "‘Two sales in one’ objection (Ray): the binding promise takes the character of a sale. Answer: no major principle is violated; almost all contemporary jurists allow it; a unilateral promise does not become a formal contract.",
        "9.9.3 Time of executing Murabaha: only after the bank gets ownership and possession and becomes responsible for loss or defects. Some edicts refer to sale before possession — creating credibility problems. Agency contracts for buying and immediately selling must not be part and parcel of the Murabaha; after possession by the agent, a separate offer and acceptance is needed.",
        "9.9.7 Murabaha through shares: shares represent tangible assets; permissible with screening. Banks should pay brokers directly; the client should not be agent; after actual transfer (e.g. via central depository), the bank may sell; if settlement takes three days, the bank bears the price risk; shares must not be of the client’s sister concern (buy-back).",
        "9.9.8 Commodity Murabaha: short-term placement via purchase/sale on international exchanges (e.g. LME), used for liquidity. Banks use Tawarruq: appoint a broker (often a conventional bank as agent) to buy metal from broker A for cash and sell on deferred payment to broker B the same day. Nobody checks whether actual transactions occurred or when risk passed; doubts about metal quantities; brokerage costs suggest no actual transactions. Tawarruq even in genuine form should be used only in extreme cases; not approved by all; widespread use is harmful."
      ],
      exam: "Two-sales objection answered (unilateral promise). Execute after ownership/possession; separate agency and sale. Shares Murabaha: screening, direct broker payment, bank bears settlement risk, no sister concern. Commodity Murabaha/Tawarruq: doubtful risk transfer; extreme cases only.",
      keyPoints: [
        "Share settlement period risk (≈3 days) borne by bank.",
        "Organised commodity Tawarruq harmful if widespread.",
        "Shares Murabaha: pay brokers directly, do not appoint the client as agent, wait for actual transfer (about three days, with price risk on the bank) and avoid shares of the client’s sister concerns."
      ],
      subsections: [
        { number: "9.9.3", title: "Time of Executing Murabaha", page: 231, points: ["After ownership and possession", "Separate agency and sale"] },
        { number: "9.9.7", title: "Murabaha Through Shares", page: 233, points: ["Screening", "Direct broker payment", "No sister concerns"] },
        { number: "9.9.8", title: "Commodity Murabaha", page: 233, points: ["LME Tawarruq", "Doubts on actual transactions", "Extreme cases only"] }
      ],
      debate: [
        { issue: "Commodity Murabaha for liquidity management", criticism: "Implicit in practice: banks need a short-term compliant placement; metal Tawarruq on the LME provides it.", response: "The author: nobody checks whether actual transactions occur or when risk passes; metal quantities may be insufficient; brokerage costs suggest no real transactions. Tawarruq should be used only where no alternative exists; widespread use harms the industry.", takeaway: "Genuine asset transfer and risk are essential; organised Tawarruq is a last resort." }
      ],
      related: ["t13.3.1", "t14.4.4", "t9.8.1"],
      quickCheck: { q: "In shares Murabaha, which practice does the author advise?", options: ["Appoint the client as agent to buy shares", "Pay brokers directly and sell only after actual transfer to the bank", "Use shares of the client’s sister company", "Sell before settlement"], answer: 1, explanation: "p. 233." },
      examples: [
        { title: "LME commodity Murabaha", kind: "textbook", text: "Banks appoint a conventional bank as agent to buy metal from broker A for cash and sell it to broker B on credit the same day; nobody checks if a real transaction or risk transfer occurred — the author urges using genuine Tawarruq only in extreme cases (p. 233)." }
      ]
    },
    {
      id: "t9.9.1", section: "9.9.1", title: "Avoiding Buy-back", pages: [230, 230], tier: "core",
      concepts: ["inah"],
      intuition: "What single check prevents a Murabaha from becoming ‘Inah?",
      simple: "Bai‘ al ‘Inah (sell and resell between the same parties, cash then higher credit price) is a device to circumvent Riba and prohibited. Malaysian authorities accept it, but mainstream scholars elsewhere and AAOIFI do not. Banks must ensure the goods are not already owned by the client.",
      academic: [
        "‘Inah is a double sale by which borrower and lender sell and resell an object, once for cash and again for a higher credit price, netting a loan with interest — a legal device to circumvent Riba, hence prohibited. Malaysian banking authorities consider it acceptable; mainstream experts from the Middle East and elsewhere do not. In MPO banks must be vigilant that the goods required are not already owned by the client (AAOIFI)."
      ],
      exam: "‘Inah prohibited (mainstream, AAOIFI; Malaysia accepts). Check goods not already owned by client.",
      keyPoints: ["Malaysian acceptance is a minority position."],
      related: ["t6.11"],
      quickCheck: { q: "Which jurisdiction does the author note as accepting Bai‘ al ‘Inah?", options: ["Saudi Arabia", "Malaysia", "Pakistan", "Bahrain"], answer: 1, explanation: "p. 230." },
      definitions: [
        { term: "Bai‘ al ‘Inah", meaning: "Sale and buy-back between the same parties — once for cash, once for a higher credit price — producing a loan with interest." }
      ],
      confusions: [
        { wrong: "Because Malaysian authorities accept ‘Inah, it is mainstream practice.", right: "Mainstream Shari’ah experts in the Middle East and elsewhere, and AAOIFI, consider it impermissible (p. 230)." }
      ],
      examples: [
        { title: "Buy-back disguised as Murabaha", kind: "textbook", text: "A client sells his own stock of cotton to the bank for 1 million cash and buys it back on Murabaha for 1.1 million payable later. This is ‘Inah, a loan of 1 million at 10 %, which is why banks must confirm the goods are not already the client’s (p. 230)." }
      ]
    },
    {
      id: "t9.9.2", section: "9.9.2", title: "Khiyar (Option to Rescind) in Murabaha", pages: [230, 231], tier: "supporting",
      concepts: ["khiyar"],
      intuition: "If the goods turn out defective, who is responsible in a bank Murabaha?",
      simple: "Most scholars don’t consider Khiyar necessary in modern Murabaha. Banks stipulate that defects are the buyer’s liability once he has examined the goods, while shortfalls in quantity/specification remain the seller’s (price reduced proportionately; buyer may rescind). Before execution, defective goods can be returned. After inspection and execution, the bank may disclaim liability and assign warranty rights. Banks reduce their risk by making the client agent and taking a performance guarantee.",
      academic: [
        "Most scholars do not consider Khiyar necessary in modern Murabaha. Some banks stipulate defects are the buyer’s liability if he examined the goods or they were described to eliminate ignorance; lack of quantity or specification remains the seller’s liability — price reduced proportionately and the buyer may rescind (Kuwait Finance House fatwa). Juristically, Khiyar al ‘Aib and Khiyar al Wasf are available; goods rejected before execution can be returned and replaced through the same or new Murabaha. After inspection and execution the bank may stipulate no liability (AAOIFI 4/9) and assign warranty rights. If options were available, the bank would carry larger risk and need market surveys; in practice the client is made agent for purchase and delivery, often nominates the supplier, and gives a performance guarantee on quality."
      ],
      exam: "Khiyar al ‘Aib and al Wasf available; before execution return goods; after inspection and execution bank may disclaim liability and assign warranties; client as agent + performance guarantee reduce bank risk.",
      keyPoints: ["Quantity/specification shortfall remains seller’s liability."],
      related: ["t6.12"],
      quickCheck: { q: "If goods are found inferior before the Murabaha is executed, what can happen?", options: ["The client must still buy", "The goods can be returned to the supplier and proper goods acquired", "The bank charges a penalty", "The promise lapses automatically"], answer: 1, explanation: "p. 230." },
      examples: [
        { title: "Short delivery", kind: "textbook", text: "Even if the buyer accepts liability for defects after inspection, a shortfall in quantity or specification remains the seller’s liability: the price is reduced proportionally and the buyer may rescind (Kuwait Finance House, p. 230)." }
      ]
    },
    {
      id: "t9.9.4", section: "9.9.4", title: "Defaults by the Clients", pages: [231, 232], tier: "core",
      concepts: ["late-payment-penalty"],
      intuition: "Without rescheduling at higher interest, how can a bank discourage deliberate late payment?",
      simple: "Options: an acceleration clause (all instalments fall due on unjustified delay); a client undertaking to pay a late fee to charity (only for wilful defaulters). Only a court or independent body may award part as solatium to the bank for actual damage — not opportunity cost (SAB). Al Baraka Sudan’s fatwa lets banks keep a late fee at their realised profit rate; the author warns this is close to opportunity cost and hard to distinguish from interest-based trade finance.",
      academic: [
        "Conventional rescheduling at higher rates motivates payment. Islamic options: stipulating that on delay without genuine reason all remaining instalments become due (AAOIFI 5/1); client’s undertaking to pay to charity on default. Consensus: banks may impose late fees on delinquent (not genuinely unable) clients, but proceeds go to charity; only a court or independent body can allocate a part as solatium. SAB: the legislature may empower courts to penalise defaulters and dilatory tactics, awarding part as solatium, with the State using the rest for charitable and public-interest projects. Compensation is for actual damage, not opportunity cost. Al Baraka Sudan’s Shari’ah board authorises late fees as income at the realised profit rate during default; the author: this is akin to opportunity cost and makes such Murabaha hard to differentiate from Western interest-based trade finance — differentiation is needed for credibility."
      ],
      exam: "Default tools: acceleration clause; late fee to charity (wilful defaulters only); solatium only via court/independent body for actual damage. Al Baraka Sudan realised-rate fee criticised as akin to opportunity cost.",
      keyPoints: [
        "Genuinely unable clients are not charged.",
        "Author critical of realised-rate compensation.",
        "Clients genuinely unable to pay are not charged a penalty.",
        "Only a court or independent body may award part of a penalty as solatium to the bank."
      ],
      debate: [
        { issue: "May the bank keep late-payment charges as income?", criticism: "Al Baraka Sudan fatwa: banks may charge a late fee as income at the profit rate actually realised during the default period.", response: "The author: this is akin to conventional opportunity cost; such stretched Ijtihad makes Murabaha hard to distinguish from interest-based trade finance. Mainstream: fee to charity; any solatium only via court/independent body for actual damage.", takeaway: "For credibility, penalties go to charity; compensation only for proven actual loss." }
      ],
      related: ["t7.13", "t17.4.4"],
      quickCheck: { q: "Who may allocate part of a late-payment penalty to the bank as solatium, per the mainstream view?", options: ["The bank itself", "A court or independent body", "The client", "Any branch manager"], answer: 1, explanation: "p. 231." },
      examples: [
        { title: "Acceleration clause", kind: "textbook", text: "The agreement may say that if the client delays without genuine reason, all remaining instalments fall due — a discipline device without any increase in the debt (p. 231)." }
      ]
    },
    {
      id: "t9.9.5", section: "9.9.5", title: "Rebates on Early Payment", pages: [232, 232], tier: "core",
      concepts: ["prepayment-rebate"],
      intuition: "Can a client who pays early demand a rebate?",
      simple: "The majority of scholars, the OIC Fiqh Academy, the SAB and Middle East boards do not allow contractual remission for early payment (like interest-based instalment sales). AAOIFI allows a rebate if not stipulated in the contract — at the bank’s discretion, case by case with the Shari’ah advisor, not as a practice.",
      academic: [
        "Clients may wish to prepay and seek a rebate as in conventional banking. The majority of contemporary scholars, the OIC Fiqh Academy, Pakistan’s SAB, Middle East committees and scholars generally do not allow remission for early payment in bank Murabaha, considering it similar to interest-based instalment techniques. The AAOIFI standard allows a rebate not stipulated in the contract; the bank has discretion, but it should not become a practice and each case should be decided on merit with the Shari’ah advisor."
      ],
      exam: "No contractual rebate (majority, OIC, SAB). AAOIFI: discretionary rebate if not stipulated; not a practice; Shari’ah advisor case by case.",
      keyPoints: ["Discretion must not become custom."],
      related: ["t7.12"],
      quickCheck: { q: "According to AAOIFI, a rebate for early Murabaha payment is allowed when:", options: ["It is written into the contract", "It is not stipulated in the contract and is at the bank’s discretion", "The client demands it", "Never"], answer: 1, explanation: "p. 232." },
      confusions: [
        { wrong: "A Murabaha contract may promise a rebate for early payment.", right: "Contractual rebates are not allowed; AAOIFI permits a discretionary rebate only if not stipulated, decided case by case with the Shari’ah advisor (p. 232)." }
      ],
      examples: [
        { title: "Prepaying a Murabaha", kind: "textbook", text: "A client owing 1,200,000 in 12 months pays after 6 and asks for 60,000 off. A contractual rebate is not allowed (majority, OIC Fiqh Academy). Under AAOIFI the bank may give one at its discretion, case by case with its Shari’ah advisor, if it was never promised (p. 232)." }
      ]
    },
    {
      id: "t9.9.6", section: "9.9.6", title: "Rollover in Murabaha", pages: [232, 233], tier: "core",
      concepts: ["rollover", "riba"],
      intuition: "Can an unpaid Murabaha receivable be ‘rolled’ into a new Murabaha with more mark-up?",
      simple: "No. Rollover — booking another Murabaha against unpaid receivables with further mark-up — is explicit Riba: the goods already belong to the client and the bank cannot re-price. Rescheduling without any increase is allowed; late-payment amounts go to charity. A fresh Murabaha is possible only through the sale of new goods.",
      academic: [
        "Rollover means booking another Murabaha against receivables of a previous Murabaha that the client has not paid, adding further mark-up. This is explicit Riba: the bank is entitled to nothing over the debt created, ownership having passed to the client; the bank has no right of re-pricing. Rescheduling is allowed without increasing the original receivable; late-payment amounts per the client’s undertaking go to charity. A fresh Murabaha facility is possible through sale of new goods."
      ],
      exam: "Rollover = explicit Riba (re-pricing sold goods/debt). Rescheduling without increase OK; charity for late amounts; new Murabaha only on new goods.",
      keyPoints: ["Rescheduling ≠ re-pricing."],
      distinctions: [
        { a: "Rescheduling", b: "Rollover", text: "Rescheduling extends time without increasing the receivable (allowed); rollover adds mark-up on the unpaid receivable (Riba)." }
      ],
      related: ["t6.10", "t4.2.5"],
      quickCheck: { q: "A client cannot pay a Murabaha instalment; the bank books a new Murabaha on the same receivable with extra mark-up. This is:", options: ["Permissible rescheduling", "Rollover — explicit Riba", "Tawarruq", "Musawamah"], answer: 1, explanation: "p. 232." },
      examples: [
        { title: "Reschedule, don’t re-price", kind: "textbook", text: "A client cannot pay an instalment. The bank may extend the schedule without raising the receivable, or later finance a fresh sale of new goods — but it may not book a new Murabaha on the old debt (pp. 232–233)." }
      ]
    },
    {
      id: "t9.10", section: "9.10", title: "Precautions in Murabaha Operations (Boxes 9.1–9.4)", pages: [233, 237], tier: "core",
      concepts: ["risk-management", "murabaha"],
      intuition: "What controls keep a Murabaha compliant and the bank safe?",
      simple: "Murabaha brings asset, fiduciary, legal and Shari’ah compliance risks; strong documentation, AAOIFI standards and Shari’ah boards help. Box 9.1: promise + HJ for refusal; direct payment, invoice dating and inspection against ‘Inah; periodic offers against goods used before sale; Takaful for transit; charity undertaking for overdue; collateral for default; agent’s guarantee of supplier; related-party checks. Box 9.2: import Murabaha via L/C. Box 9.3: accounting. Box 9.4: export Murabaha steps.",
      academic: [
        "Additional asset, fiduciary, legal and Shari’ah compliance risks; documentation under the legal department; adherence to AAOIFI; Shari’ah supervisory boards’ internal controls; mistiming in documentation may lose income.",
        "Box 9.1 risk mitigation: customer refuses to buy after possession → promise and HJ; customer already bought (‘Inah) → direct payment via DD/PO, invoice dated not earlier than agency and not later than offer, other evidence (gate pass, stock register, truck receipt), physical inspection; goods used before offer → shorter intervals for offers, random inspection; transit destruction → bank owns risk, Takaful; overdue → charity undertaking; default → realise collateral; supplier non-performance → agent’s personal guarantee; related parties → check financial statements.",
        "Box 9.2 import Murabaha: MoU and agency; customer negotiates as agent only after agency; L/C opened with Takaful on the bank’s behalf (cost borne by bank); exporter ships and documents reach the bank; customer negotiates FX rate; settlement — sight L/C without credit via spot Murabaha/Musawamah at L/C cost + charges + Takaful; or with financing — Murabaha executed, profit from the date Nostro was debited to settlement date; documents released and receivable recorded.",
        "Box 9.3 accounting (AAOIFI): asset at historical cost; for binding promises, declines reflected; if costs may not be recovered, cash equivalent value with provision; post-acquisition discount reduces cost (revenue only if Shari’ah board decides); receivables at cash equivalent value; profit recognised at contracting if within the period, else proportionately (preferred) or when received; deferred profit offset against receivables; HJ a liability — returned in full for non-binding promises; actual loss deducted for binding; penalty to revenue or charity as the board deems; no extra penalty in insolvency.",
        "Box 9.4 export Murabaha: agreement; exporter appointed agent; bank pays supplier; exporter buys and takes possession for the bank; exporter offers; bank accepts; exporter pays per schedule."
      ],
      exam: "Risks: asset, fiduciary, legal, Shari’ah. Box 9.1 controls (promise+HJ; direct payment; invoice dates; inspection; Takaful; charity undertaking; collateral; agent guarantee; related parties). Box 9.2 import via L/C; Box 9.3 AAOIFI accounting (proportionate profit recognition preferred); Box 9.4 export steps.",
      keyPoints: [
        "Invoice date must fall between agency agreement and offer.",
        "Import Murabaha profit runs from Nostro debit date.",
        "Proportionate allocation is the preferred profit recognition.",
        "Box 9.3: Hamish Jiddiyah is a liability of the bank; supplier discounts reduce cost; profit on multi-period credit is preferably recognised proportionately."
      ],
      table: { caption: "Box 9.1 — Risk management in Murabaha", head: ["Risk", "Mitigation"], rows: [["Customer refuses to buy after possession as agent", "Promise to purchase; Hamish Jiddiyah for actual loss"], ["Customer already bought the goods (‘Inah)", "Direct payment to supplier; invoice dated after agency and before offer; other evidence; physical inspection"], ["Goods used before offer and acceptance", "Shorter offer intervals; random inspection"], ["Destruction in transit before sale", "Bank bears risk; Takaful cover"], ["Overdue", "Customer’s undertaking to pay to charity"], ["Default", "Realise securities/collateral"], ["Supplier non-performance", "Agent guarantees supplier performance personally"], ["Purchase from/resale to associates", "Related-party information from financial statements"]] },
      related: ["t4.2.9", "t14.3.4", "t14.4.2"],
      quickCheck: { q: "To guard against ‘Inah in MPO, Box 9.1 requires the supplier’s invoice to be dated:", options: ["Before the agency agreement", "Not earlier than the agency agreement and not later than the offer to purchase", "After the Murabaha is executed", "Any date"], answer: 1, explanation: "p. 234." },
      examples: [
        { title: "Box 9.2: import Murabaha via L/C", kind: "textbook", text: "Master agreement and agency; client negotiates with the exporter as agent; bank opens the L/C with Takaful at its cost; on documents, either spot Murabaha/Musawamah (sight L/C) or deferred Murabaha with profit from the Nostro debit date (pp. 235–236)." }
      ]
    },
    {
      id: "t9.11", section: "9.11", title: "Musawamah (Bargaining on Price)", pages: [234, 234], tier: "core",
      concepts: ["musawamah"],
      intuition: "What if the seller can’t, or doesn’t want to, disclose cost?",
      simple: "Musawamah is an ordinary sale where the price is bargained without reference to the seller’s cost. The seller need not reveal cost; all other Murabaha conditions apply. It suits cases where cost can’t be ascertained precisely, and where banks obtain supplier discounts on retail goods (since actual profit isn’t disclosed, it must be Musawamah, not Murabaha).",
      academic: [
        "Musawamah is a general sale in which price is bargained without reference to price paid or cost; the seller is not obliged to reveal cost; other Murabaha conditions apply. It can be used where the seller cannot precisely ascertain costs. It may be cash or credit; banks generally use deferred-payment Musawamah, adding their margin without disclosing cost and profit. Where IFIs obtain a discount from the supplier on retail goods not disclosed to the customer, the sale should be Musawamah, not Murabaha."
      ],
      exam: "Musawamah: price bargained, no cost disclosure; other conditions same as Murabaha; use when cost unascertainable or undisclosed supplier discounts.",
      keyPoints: ["Undisclosed supplier discount → Musawamah."],
      distinctions: [
        { a: "Murabaha", b: "Musawamah", text: "Murabaha requires disclosure of cost and agreement on margin; Musawamah bargains the final price without disclosure. Ownership, possession and risk conditions are the same." }
      ],
      related: ["t9.3", "t9.11.1"],
      quickCheck: { q: "A bank gets an undisclosed volume discount from a supplier on retail goods. Which sale should it use?", options: ["Murabaha", "Musawamah", "Tawliyah", "Salam"], answer: 1, explanation: "p. 234." },
      examples: [
        { title: "Supplier discount on retail goods", kind: "textbook", text: "If a bank obtains a discount from the supplier that it does not disclose to the customer, the sale must be done as Musawamah, not Murabaha (p. 234)." }
      ]
    },
    {
      id: "t9.11.1", section: "9.11.1", title: "Musawamah as a Mode of Financing", pages: [238, 238], tier: "supporting",
      concepts: ["musawamah"],
      intuition: "Why do banks prefer Murabaha but businesses prefer Musawamah?",
      simple: "Banks prefer Murabaha because benchmarks are easy to apply, regulators can manage return structures, and corruption is less likely (margin tied to cost). Musawamah suits huge single transactions (e.g. an airline buying a $500m plane that the bank buys for $450m and sells with $50m profit) or where many cost details can’t be disclosed. Bank should preferably buy expensive assets directly; ownership, possession and risk rules are the same.",
      academic: [
        "Businesses use Musawamah, earning through pricing; banks mostly use Murabaha because benchmarks are easier to apply, return structures easier for management and regulators, and corruption minimal as margin is tied to cost. Musawamah suits single huge transactions decided at top level — e.g. an airline needs a $500 million aeroplane; the bank buys for $450 million and sells for $500 million considering credit period; cost details are not needed. Agency may be used, but the bank should preferably buy expensive assets directly, involving clients in selecting supplier and specifications — ‘Musawamah to Purchase Orderer’ for huge assets; subsidiaries may hold inventory of less expensive goods. Conditions of ownership, possession, risk, subject matter, price and default treatment are the same; only cost/profit disclosure is not required."
      ],
      exam: "Banks prefer Murabaha (benchmarks, regulation, less corruption). Musawamah for huge single deals (airline example) or undisclosable costs; same ownership/risk rules.",
      keyPoints: ["Airline example: bank buys at $450m, sells at $500m.", "Musawamah to Purchase Orderer for expensive assets."],
      examples: [
        { title: "Aircraft Musawamah", kind: "textbook", text: "A Middle East airline needs a $500 million aeroplane on credit. An Islamic bank buys it for $450 million and sells it to the airline adding $50 million profit considering the credit period; the airline is interested only in the final price." }
      ],
      related: ["t9.11", "t14.3.2"],
      quickCheck: { q: "Why do Islamic banks generally prefer Murabaha over Musawamah?", options: ["Musawamah is prohibited", "Benchmarks are easier to apply and corruption chances minimal since margin ties to cost", "Murabaha needs no ownership", "Regulators ban Musawamah"], answer: 1, explanation: "p. 238." },
      distinctions: [
        { a: "Why banks prefer Murabaha", b: "Where Musawamah fits", text: "Murabaha allows easy benchmarking, regulation and less corruption because margin is tied to cost; Musawamah suits single large deals (e.g. an aircraft) or cases where cost details cannot be given (p. 238)." }
      ]
    }
  ],
  summary: "PLS modes may not suit all needs, so jurists allow trade-based modes like Murabaha, which becomes Murabaha–Mu’ajjal when used by banks: a stipulated profit margin over a known cost, with a fixed due date. It is legitimate if the financier bears the risk until possession passes and buys and sells under separate contracts. Despite its dangers, banks rely heavily on it — partly because depositors such as widows and the elderly need low-risk investment — so it must be used with utmost caution. A credit price above cash price is permissible; PLS is preferable. Modern Murabaha is MPO: a promise, an agency contract and the actual Murabaha under a master agreement. Banks must ensure genuine goods, pay suppliers directly or verify invoices, and avoid buy-back and rollover; default penalties go to charity.",
  takeaways: [
    "Murabaha = trust sale: disclose cost; agree margin; price fixed.",
    "Not for currencies, gold/silver or debts; intangibles allowed.",
    "MPO = promise + agency + Murabaha — three separate contracts.",
    "Bank must own and bear risk before selling; goods must exist at execution.",
    "No buy-back (‘Inah), no rollover; rescheduling without increase only.",
    "Default: charity penalty; solatium only via court for actual loss.",
    "Rebate: discretionary only (AAOIFI).",
    "Musawamah: no cost disclosure; for big deals or undisclosed discounts."
  ],
  checklist: [
    "Can you list the specific conditions of Murabaha?",
    "Can you explain why Murabaha–Mu’ajjal is not Riba?",
    "Can you compare the three Murabaha structures?",
    "Can you name the three contracts in MPO and their order?",
    "Can you walk through the seven steps of MPO with client as agent?",
    "Can you state the rules on defaults, rebates and rollover?",
    "Can you apply Box 9.1 risk controls?",
    "Can you distinguish Murabaha from Musawamah?"
  ],
  flashcards: [
    { id: "f9.1", cat: "Financing modes", front: "Murabaha", back: "A trust (fiduciary) sale at disclosed cost plus an agreed profit margin; when price is deferred it is Murabaha–Mu’ajjal.", topic: "t9.3" },
    { id: "f9.2", cat: "Definitions", front: "Buyoo‘ al Amanat (fiduciary sales)", back: "Tawliyah (at cost), Wadhi‘ah/Mohatah (below cost), Murabaha (cost + profit) — all require honest cost disclosure.", topic: "t9.3" },
    { id: "f9.3", cat: "Contract rules", front: "Items that cannot be sold by Murabaha", back: "Currencies, gold and silver (Bai‘ al Sarf) and debt/credit documents (profit on debt is Riba).", topic: "t9.6" },
    { id: "f9.4", cat: "Contract rules", front: "How must a Murabaha seller state cost including expenses?", back: "“This article has cost me so much” — not “I purchased at this rate”; customary value-adding expenses may be added.", topic: "t9.6" },
    { id: "f9.5", cat: "Contract rules", front: "Supplier rebate received after a Murabaha sale", back: "The client/buyer is entitled to benefit from it (AAOIFI).", topic: "t9.6" },
    { id: "f9.6", cat: "Principles", front: "Why is a Murabaha credit price above the cash price not Riba?", back: "Money is exchanged for goods (not like for like); price risk exists on both sides — consistent with Al-Ghunm bil Ghurm; one price is fixed.", topic: "t9.6.1" },
    { id: "f9.7", cat: "Financing modes", front: "Three Murabaha structures (Section 9.7)", back: "Direct trading by bank; purchase via third-party agent (AAOIFI preferred); client as agent (most used, back-door risk).", topic: "t9.7" },
    { id: "f9.8", cat: "Financing modes", front: "Three contracts in MPO", back: "(1) Master agreement + client’s unilateral promise; (2) separate agency contract; (3) actual Murabaha after bank owns the goods.", topic: "t9.8.1" },
    { id: "f9.9", cat: "Contract rules", front: "Remedy when an MPO client breaks the promise", back: "Specific performance or actual damages (actual monetary loss, no opportunity cost/cost of funds), recoverable from Hamish Jiddiyah.", topic: "t9.8.2" },
    { id: "f9.10", cat: "Financing modes", front: "Seven steps of MPO with client as agent", back: "Request → agency → purchase via client → bank pays supplier → client possesses for bank → client offers/bank accepts → deferred payment (no rollover).", topic: "t9.8.3" },
    { id: "f9.11", cat: "Contract rules", front: "Maximum ownership link between client and supplier in MPO", back: "Supplier must be a third party — not the customer, his agent or an entity more than 50% owned by the customer.", topic: "t9.8.3" },
    { id: "f9.12", cat: "Prohibitions", front: "Rollover in Murabaha", back: "Booking a new Murabaha with extra mark-up on an unpaid receivable — explicit Riba. Rescheduling without increase is allowed.", topic: "t9.9.6" },
    { id: "f9.13", cat: "Risk", front: "Default tools in Murabaha", back: "Acceleration clause; charity undertaking (late fee to charity); collateral; solatium only via court/independent body for actual damage.", topic: "t9.9.4" },
    { id: "f9.14", cat: "Banking", front: "Shares Murabaha — key precautions", back: "Screened shares; pay brokers directly; client not agent; bank bears price risk during settlement; not sister-concern shares.", topic: "t9.9" },
    { id: "f9.15", cat: "Capital markets", front: "Commodity Murabaha (LME Tawarruq) — author’s concern", back: "Doubt whether actual transactions and risk transfer occur; use only in extreme cases; widespread use harms the industry.", topic: "t9.9" },
    { id: "f9.16", cat: "Comparisons", front: "Murabaha vs Musawamah", back: "Murabaha: cost disclosed, margin bargained. Musawamah: price bargained, no disclosure. Same ownership, possession and risk rules.", topic: "t9.11" },
    { id: "f9.17", cat: "Banking", front: "AAOIFI preferred profit recognition in Murabaha", back: "Proportionate allocation of profit over the credit period (whether or not cash is received); deferred profit offset against receivables.", topic: "t9.10" },
    { id: "f9.18", cat: "Definitions", front: "Tawliyah vs Wadhi‘ah", back: "Tawliyah: resale at cost. Wadhi‘ah (Mohatah): resale at a discount on cost.", topic: "t9.3" },
    { id: "f9.19", cat: "Exam facts", front: "Malik vs Shafi‘i on Murabaha", back: "Malik: a spot exchange, no credit (Malikis dislike it but allow it). Shafi‘i: extended it to credit.", topic: "t9.4" },
    { id: "f9.20", cat: "Contract rules", front: "Misstated cost in Murabaha — remedies", back: "Malik: rescind unless difference returned. Hanafi: unqualified right to rescind. Hanbali: binding after difference returned.", topic: "t9.6" },
    { id: "f9.21", cat: "Contract rules", front: "Credit purchase by the Murabaha seller", back: "Must be disclosed to the buyer — all schools agree, since credit prices are higher.", topic: "t9.6" },
    { id: "f9.22", cat: "Financing modes", front: "Which Murabaha structure does AAOIFI prefer?", back: "Purchase through a third-party agent; the client as agent only in dire need.", topic: "t9.7" },
    { id: "f9.23", cat: "Contract rules", front: "Bilateral binding promise in Murabaha", back: "Allowed only if an option (Khiyar) is kept by one or both parties; otherwise it is a sale of unowned goods.", topic: "t9.8.2" },
    { id: "f9.24", cat: "Contract rules", front: "MPO relationships", back: "Principal/agent → promisor/promisee → buyer/seller (with supplier) → seller/buyer → creditor/debtor.", topic: "t9.8.3" },
    { id: "f9.25", cat: "Risk", front: "Invoice-date check in MPO", back: "Invoice must be dated after the agency agreement and before the client’s offer to purchase; otherwise ‘Inah risk.", topic: "t9.8.3" },
    { id: "f9.26", cat: "Contract rules", front: "Acceleration clause in Murabaha", back: "On unjustified delay, all remaining instalments become due — discipline without increasing the debt.", topic: "t9.9.4" },
    { id: "f9.27", cat: "Financing modes", front: "Box 9.2 — sight L/C settlement options", back: "If no credit needed: spot Murabaha/Musawamah at L/C cost + charges + Takaful. If credit needed: deferred Murabaha, profit from the Nostro debit date.", topic: "t9.10" },
    { id: "f9.28", cat: "Financing modes", front: "When to use Musawamah instead of Murabaha", back: "Single large deals (e.g. aircraft) or when cost details cannot be disclosed, including undisclosed supplier discounts.", topic: "t9.11.1" }
  ],
  questions: [
    { id: "q9.1", type: "mcq", q: "Which is the defining feature of Murabaha?", options: ["Profit and loss sharing", "Disclosure of cost and agreement on a profit margin", "Leasing of usufruct", "Advance payment for future delivery"], answer: 1, explanation: "p. 215.", topic: "t9.3", diff: "E", level: "recall", obj: "Define Murabaha" },
    { id: "q9.2", type: "multi", q: "Which may be the subject of a Murabaha? (Select all.)", options: ["Machinery", "Royalty rights", "Gold coins on deferred payment", "Screened shares", "A promissory note"], answer: [0, 1, 3], explanation: "Gold (Sarf) and debt documents are excluded; shares allowed with screening (pp. 217, 220).", topic: "t9.6", diff: "M", level: "understanding", obj: "Identify eligible Murabaha goods" },
    { id: "q9.3", type: "order", q: "Order the steps of MPO with the customer as the bank’s agent.", items: ["Customer requests purchase", "Bank appoints customer as agent", "Customer purchases on bank’s behalf; bank pays supplier", "Customer takes delivery as agent", "Customer offers to buy; bank accepts", "Customer pays the deferred price"], explanation: "p. 225.", topic: "t9.8.3", diff: "M", level: "understanding", obj: "Sequence MPO" },
    { id: "q9.4", type: "scenario", q: "A client, acting as the bank’s agent, collected raw materials and began using them in production before sending the bank an offer to purchase. What is the problem?", options: ["None", "The goods must exist at execution; using them before offer and acceptance creates a Shari’ah objection", "The bank must charge more", "The agency lapses automatically"], answer: 1, explanation: "p. 228–229.", topic: "t9.8.3", diff: "M", level: "application", obj: "Identify MPO compliance failures" },
    { id: "q9.5", type: "tf", q: "A client that owns 60% of the nominated supplier can be the counterparty supplier in an MPO.", answer: false, explanation: "The supplier must not be an entity more than 50% owned by the customer (p. 227).", topic: "t9.8.3", diff: "M", level: "application", obj: "Apply supplier independence rule" },
    { id: "q9.6", type: "application", q: "Under a binding promise, a bank bought goods for $50,000; the client refused to buy; the bank resold them for $48,500 and holds $3,000 Hamish Jiddiyah. How much should it refund?", options: ["$0", "$1,500", "$3,000", "$1,000"], answer: 1, explanation: "Actual loss $1,500 deducted; refund $1,500. (Practice example — generated for learning.)", topic: "t9.8.2", diff: "M", level: "application", obj: "Apply Hamish Jiddiyah rules" },
    { id: "q9.7", type: "identify", q: "Booking a new Murabaha with additional mark-up on an unpaid Murabaha receivable is:", options: ["Rescheduling", "Rollover (Riba)", "Musawamah", "Hawalah"], answer: 1, explanation: "p. 232.", topic: "t9.9.6", diff: "E", level: "recall", obj: "Identify rollover" },
    { id: "q9.8", type: "comparison", q: "Which statement correctly compares Murabaha and Musawamah?", options: ["Only Musawamah requires the seller to own the goods", "Murabaha requires cost disclosure; Musawamah does not; other conditions are the same", "Musawamah cannot be on credit", "Murabaha has no fixed price"], answer: 1, explanation: "p. 234.", topic: "t9.11", diff: "E", level: "understanding", obj: "Compare Murabaha and Musawamah" },
    { id: "q9.9", type: "mcq", q: "Why does the author criticise the Al Baraka Sudan approach to late fees?", options: ["It gives nothing to the bank", "Charging the realised profit rate is akin to opportunity cost, blurring the difference from interest-based finance", "It violates AAOIFI accounting", "It requires court approval"], answer: 1, explanation: "p. 232.", topic: "t9.9.4", diff: "H", level: "analysis", obj: "Evaluate default compensation" },
    { id: "q9.10", type: "match", q: "Match each Murabaha risk to its mitigation (Box 9.1).", pairs: [["Client refuses to buy", "Promise + Hamish Jiddiyah"], ["Goods destroyed in transit", "Takaful cover (bank’s risk)"], ["Client already bought the goods", "Direct payment and invoice-date checks"], ["Overdue payment", "Charity undertaking"]], explanation: "Box 9.1, pp. 234–235.", topic: "t9.10", diff: "M", level: "application", obj: "Apply Murabaha risk controls" },
    { id: "q9.11", type: "tf", q: "Natural gas supplied through pipelines is generally approved for Murabaha because constructive possession is easy to establish.", answer: false, explanation: "Scholars normally do not approve it — the point of risk transfer cannot be identified (p. 228).", topic: "t9.8.3", diff: "H", level: "analysis", obj: "Apply risk-transfer requirement" },
    { id: "q9.12", type: "short", q: "Explain why the ‘two sales in one’ objection to MPO is rejected by contemporary jurists.", answer: "The objection holds that the binding promise plus the sale deed equals two contracts in one. Jurists reply that the client’s promise is unilateral and does not become a formal contract; the implications of a promise and a sale differ, ownership passes only at the later Murabaha, and no major Shari’ah principle is violated.", keywords: ["unilateral", "promise", "contract", "ownership"], explanation: "Section 9.9.", topic: "t9.9", diff: "H", level: "analysis", obj: "Evaluate objections to MPO" },
    { id: "q9.13", type: "scenario", q: "An airline wants to buy a $500m aircraft on credit and is only interested in the final price. Which mode fits best according to Section 9.11.1?", options: ["Murabaha with full cost disclosure", "Musawamah (possibly to purchase orderer)", "Salam", "Qard"], answer: 1, explanation: "p. 238.", topic: "t9.11.1", diff: "E", level: "application", obj: "Select mode" },
    { id: "q9.14", type: "mcq", q: "On whose request and promise is modern bank Murabaha (MPO) based?", options: ["The supplier", "The customer (purchase orderer)", "The central bank", "The Shari’ah board"], answer: 1, explanation: "p. 213.", topic: "t9.1", diff: "E", level: "recall", obj: "Define MPO" },
    { id: "q9.15", type: "scenario", q: "On 1 January A tells B: “I sell you my car on 1 February.” What is the status?", options: ["Valid forward sale", "Void — a sale must be instant; A may give a promise and execute the sale on 1 February", "Valid Salam", "Valid if B pays now"], answer: 1, explanation: "p. 214.", topic: "t9.2", diff: "E", level: "application", obj: "Apply the instant-sale condition" },
    { id: "q9.16", type: "match", q: "Match each trust sale to its pricing.", pairs: [["Tawliyah", "At cost, no profit or loss"], ["Wadhi‘ah / Mohatah", "At a discount on cost"], ["Murabaha", "Cost plus agreed profit"]], explanation: "p. 215.", topic: "t9.3", diff: "E", level: "recall", obj: "Classify trust sales" },
    { id: "q9.17", type: "identify", q: "Which jurist defined Murabaha as “the sale of anything for the price at which it was purchased by the seller and an addition of a fixed sum by way of profit”?", options: ["Ibn Qudama", "Al-Marghinani", "Imam Malik", "Ibn Rushd"], answer: 1, explanation: "p. 216.", topic: "t9.4", diff: "M", level: "recall", obj: "Recall classical definitions" },
    { id: "q9.18", type: "tf", q: "According to Imam Malik, Murabaha involves no credit — goods and price with profit are exchanged there and then.", answer: true, explanation: "Imam Shafi‘i extended it to credit (p. 216).", topic: "t9.4", diff: "M", level: "recall", obj: "Compare classical views" },
    { id: "q9.19", type: "mcq", q: "According to Al-Marghinani, what was the original purpose of Murabaha?", options: ["To finance governments", "To protect inexperienced buyers from cunning traders through honest cost disclosure", "To replace Salam", "To avoid Zakat"], answer: 1, explanation: "p. 216.", topic: "t9.5", diff: "E", level: "understanding", obj: "Explain the classical rationale" },
    { id: "q9.20", type: "multi", q: "Which expenses may be added to Murabaha cost according to the Malikis? (Select all.)", options: ["Expenses that directly affect the object", "Outsourced services like transport and storage", "Packing done by the seller himself", "Sales commission for the seller’s own work"], answer: [0, 1], explanation: "Malikis exclude services the seller could have provided himself (pp. 217–218).", topic: "t9.6", diff: "H", level: "application", obj: "Apply school views on cost" },
    { id: "q9.21", type: "scenario", q: "A bank receives a supplier rebate a month after selling the goods to its client on Murabaha. Who benefits?", options: ["The bank keeps it", "The client, since the cost basis falls", "Charity", "The supplier"], answer: 1, explanation: "AAOIFI (p. 218).", topic: "t9.6", diff: "M", level: "application", obj: "Apply the rebate rule" },
    { id: "q9.22", type: "comparison", q: "How do the schools differ when a Murabaha seller misstates his cost?", options: ["All void the sale", "Malik: buyer may rescind unless the difference is returned; Hanafis: unqualified option to rescind; Hanbalis: binding after the difference is returned", "All require a penalty", "No remedy exists"], answer: 1, explanation: "p. 218.", topic: "t9.6", diff: "H", level: "analysis", obj: "Compare remedies for misstatement" },
    { id: "q9.23", type: "tf", q: "Murabaha on a deferred basis is not allowed for gold, silver or currencies.", answer: true, explanation: "They fall under Bai‘ al Sarf (p. 220).", topic: "t9.6.1", diff: "E", level: "recall", obj: "Recall excluded subjects" },
    { id: "q9.24", type: "short", q: "Why is the higher credit price in Murabaha–Mu’ajjal not Riba?", answer: "In a loan, like is exchanged for like, so any excess is Riba. In a credit sale, money is exchanged for goods — different counter values — and the whole price is for the item. Prices may rise or fall, so profit goes with loss (Al-Ghunm bil Ghurm). The price must be fixed once at the contract and never increased afterwards.", keywords: ["like for like", "goods", "Ghunm", "fixed"], explanation: "p. 220.", topic: "t9.6.1", diff: "M", level: "understanding", obj: "Explain credit pricing" },
    { id: "q9.25", type: "identify", q: "Which Murabaha structure is safest for the bank’s commodity risk but most likely to become a back door to interest?", options: ["Direct trading by the bank", "Third-party agent", "Client as the bank’s agent", "Commodity exchange"], answer: 2, explanation: "p. 222.", topic: "t9.7", diff: "M", level: "recall", obj: "Compare Murabaha structures" },
    { id: "q9.26", type: "scenario", q: "A bank pays a supplier for machinery that the client had already received and owns. What has happened, according to Chapter 9?", options: ["A valid Murabaha", "A loan to the client; any profit is interest (and ‘Inah if resold)", "A Salam", "An Ijarah"], answer: 1, explanation: "p. 222.", topic: "t9.7", diff: "M", level: "application", obj: "Identify disguised loans" },
    { id: "q9.27", type: "multi", q: "Why do Islamic banks use MPO instead of holding inventory? (Select all.)", options: ["Inventory costs are high", "The list of goods is too long to stock", "Clients need specific goods", "Regulators restrict trading as core business", "Shari’ah forbids inventory"], answer: [0, 1, 2, 3], explanation: "Inventory is allowed; the reasons are practical (p. 222).", topic: "t9.8", diff: "M", level: "understanding", obj: "Explain the need for MPO" },
    { id: "q9.28", type: "tf", q: "The bank may enter a Musharakah with the client on the promise that one partner will buy the other’s share by Murabaha.", answer: false, explanation: "Not allowed; a partner may promise to buy the other’s share at market or agreed price by a separate contract (p. 223).", topic: "t9.8", diff: "H", level: "understanding", obj: "Apply AAOIFI limits on MPO" },
    { id: "q9.29", type: "order", q: "Order the three contracts in MPO.", items: ["Master agreement with the client’s unilateral promise to purchase", "Agency contract to buy and take possession for the bank", "Actual Murabaha contract once the bank owns the goods"], explanation: "p. 224.", topic: "t9.8.1", diff: "E", level: "recall", obj: "Sequence MPO contracts" },
    { id: "q9.30", type: "application", q: "In MPO the bank wants protection if the client refuses to buy. Which tools are allowed? ", options: ["Charge cost of funds", "Binding unilateral promise with recovery of actual loss, Hamish Jiddiyah, or buying from the supplier with an option to return", "Automatic interest penalty", "Selling the goods before buying them"], answer: 1, explanation: "pp. 224–225.", topic: "t9.8.2", diff: "M", level: "application", obj: "Apply risk tools in MPO" },
    { id: "q9.31", type: "match", q: "Match each MPO stage to the parties’ relationship.", pairs: [["Agency", "Principal and agent"], ["Purchase from supplier", "Buyer and seller (bank and supplier)"], ["Murabaha sale", "Seller and buyer (bank and client)"], ["After sale", "Creditor and debtor"]], explanation: "p. 226.", topic: "t9.8.3", diff: "M", level: "understanding", obj: "Map relationships across MPO" },
    { id: "q9.32", type: "scenario", q: "The client signed the purchase contract with the supplier before the agency agreement was signed with the bank. What is the problem?", options: ["None", "The goods already belong to the client, so the deal becomes Bai‘ al ‘Inah", "The price is uncertain", "It becomes Ijarah"], answer: 1, explanation: "p. 228.", topic: "t9.8.3", diff: "M", level: "application", obj: "Apply sequencing rules" },
    { id: "q9.33", type: "tf", q: "An invoice for Murabaha goods should be dated after the agency agreement and before the client’s offer to purchase.", answer: true, explanation: "Box 9.1 (p. 234).", topic: "t9.8.3", diff: "M", level: "recall", obj: "Recall documentation checks" },
    { id: "q9.34", type: "comparison", q: "How do contemporary jurists answer the objection that MPO is “two sales in one”?", options: ["They accept the objection", "A unilateral promise is not a contract; it has different legal effects, so there is only one sale", "They ban MPO", "They require two prices"], answer: 1, explanation: "p. 230.", topic: "t9.9", diff: "M", level: "analysis", obj: "Evaluate the two-sales objection" },
    { id: "q9.35", type: "multi", q: "Which precautions apply to shares Murabaha? (Select all.)", options: ["Pay brokers directly", "Do not appoint the client as agent", "Wait for actual transfer of shares to the bank", "Avoid shares of the client’s sister concerns", "Sell before settlement to save time"], answer: [0, 1, 2, 3], explanation: "p. 233.", topic: "t9.9", diff: "M", level: "application", obj: "Apply precautions in shares Murabaha" },
    { id: "q9.36", type: "identify", q: "Which body’s position is that Bai‘ al ‘Inah is impermissible, contrary to Malaysian practice?", options: ["AAOIFI and mainstream Middle-East scholars", "Only the IMF", "Bank Negara", "No one"], answer: 0, explanation: "p. 230.", topic: "t9.9.1", diff: "M", level: "recall", obj: "Recall views on ‘Inah" },
    { id: "q9.37", type: "scenario", q: "After inspection, the client finds 10% of the goods missing. What remedy applies even if the client accepted liability for defects?", options: ["None", "Price reduced proportionally and option to rescind — quantity shortfalls stay with the seller", "Full refund only", "A new Murabaha"], answer: 1, explanation: "p. 230.", topic: "t9.9.2", diff: "M", level: "application", obj: "Apply Khiyar in Murabaha" },
    { id: "q9.38", type: "mcq", q: "When should the Murabaha sale be executed?", options: ["At the time of the promise", "Only after the bank owns and possesses the goods and bears their risk", "Before the agency contract", "When the client pays"], answer: 1, explanation: "p. 231.", topic: "t9.9.4", diff: "E", level: "recall", obj: "Recall timing of execution" },
    { id: "q9.39", type: "application", q: "A solvent client deliberately delays payment. Which of these may the bank do?", options: ["Add the penalty to its income", "Enforce an undertaking to pay a sum to charity and, through a court, seek actual-loss compensation", "Increase the Murabaha price", "Book a rollover"], answer: 1, explanation: "pp. 231–232.", topic: "t9.9.4", diff: "M", level: "application", obj: "Apply default remedies" },
    { id: "q9.40", type: "tf", q: "The bank may reschedule an unpaid Murabaha receivable without increasing it.", answer: true, explanation: "Rescheduling yes, re-pricing no (p. 233).", topic: "t9.9.6", diff: "E", level: "recall", obj: "Distinguish rescheduling from rollover" },
    { id: "q9.41", type: "multi", q: "Which risk mitigants appear in Box 9.1? (Select all.)", options: ["Direct payment to the supplier by DD/PO", "Physical inspection of goods", "Takaful during transit", "Related-party checks", "Charging opportunity cost"], answer: [0, 1, 2, 3], explanation: "pp. 234–235.", topic: "t9.10", diff: "M", level: "recall", obj: "Recall Murabaha risk mitigants" },
    { id: "q9.42", type: "identify", q: "Under Box 9.3, how should Hamish Jiddiyah be recorded by the bank?", options: ["As revenue", "As a liability", "As equity", "As a provision"], answer: 1, explanation: "p. 237.", topic: "t9.10", diff: "M", level: "recall", obj: "Recall accounting for token money" },
    { id: "q9.43", type: "scenario", q: "A bank receives an undisclosed trade discount from a retail supplier. Which sale should it use?", options: ["Murabaha", "Musawamah", "Salam", "Tawliyah"], answer: 1, explanation: "p. 234.", topic: "t9.11", diff: "M", level: "application", obj: "Choose between Murabaha and Musawamah" }
  ],
  exam: [
    { id: "e9.1", kind: "long", q: "Explain Murabaha to Purchase Orderer (MPO) as practised by Islamic banks. Discuss its stages and the Shari’ah safeguards required at each.", structure: ["Define Murabaha and MPO", "Why MPO is needed", "Three contracts", "Stages: pre-promise, MoU, requisition, agency, purchase, possession, execution, security", "Relationships among parties", "Key safeguards (no ‘Inah, direct payment, risk before sale, goods exist)", "Post-execution: no rollover; default; rebate"], keyConcepts: ["Wa‘d", "Wakalah", "constructive possession", "Hamish Jiddiyah"], points: ["Supplier ≤50% client-owned", "Invoice dating", "Debtor–creditor after acceptance"], mistakes: ["Treating promise as sale", "Letting bank sell before owning", "Allowing rollover"], topic: "t9.8.3" },
    { id: "e9.2", kind: "difference", q: "Differentiate between Murabaha and Musawamah and explain when each is suitable for banks.", structure: ["Definitions", "Disclosure", "Benchmark use", "Suitability examples", "Common conditions"], keyConcepts: ["trust sale", "bargaining"], points: ["Undisclosed discount → Musawamah", "Airline example"], mistakes: ["Saying Musawamah needs no ownership"], topic: "t9.11" },
    { id: "e9.3", kind: "short", q: "What are the specific conditions of Murabaha?", structure: ["Eligible goods", "Cost and expenses disclosure (school views)", "Disclosure of credit purchase/defects/rebates", "Fixed margin and price", "Consequences of false statement"], keyConcepts: ["Majhul price", "Naqis"], points: ["‘Cost me’ wording"], mistakes: ["Allowing currency Murabaha"], topic: "t9.6" },
    { id: "e9.4", kind: "scenario", q: "A client defaults on Murabaha instalments and asks the bank to extend the period. The bank proposes a new Murabaha with additional mark-up. Advise the bank.", structure: ["Identify rollover", "Why it is Riba", "Permissible options: rescheduling, acceleration clause, charity penalty, collateral", "Compensation via court for actual loss"], keyConcepts: ["rollover", "late-payment penalty"], points: ["No re-pricing"], mistakes: ["Suggesting bank keeps penalty"], topic: "t9.9.6" },
    { id: "e9.5", kind: "viva", q: "Can an Islamic bank give a rebate to a Murabaha client who pays early?", structure: ["Majority view", "AAOIFI discretionary rebate"], keyConcepts: ["prepayment rebate"], points: ["Not stipulated; case by case"], mistakes: ["Saying it must be contractual"], topic: "t9.9.5" },
    { id: "e9.6", kind: "long", q: "Discuss the risks in Murabaha operations and how an Islamic bank mitigates them while staying Shari’ah compliant.", structure: ["Nature of Murabaha risk: asset, fiduciary, legal, Shari’ah", "Client refusal: promise, Hamish Jiddiyah, option to return", "‘Inah risk: direct payment, invoices, related parties", "Goods consumed before sale: inspection, offer timing", "Transit risk: Takaful at bank’s cost", "Default: charity undertaking, acceleration, collateral; no rollover"], keyConcepts: ["Box 9.1", "Hamish Jiddiyah", "Bai‘ al ‘Inah", "rollover", "Takaful"], points: ["Bank must own and bear risk before sale", "Penalty to charity, not income", "Rescheduling without re-pricing"], mistakes: ["Transferring transit risk to the client", "Charging cost of funds", "Letting client buy before agency"], topic: "t9.10" }
  ]
});
