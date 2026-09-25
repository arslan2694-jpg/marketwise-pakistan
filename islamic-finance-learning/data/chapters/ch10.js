/* Chapter 10 — Forward Sales: Salam and Istisna‘a. Source pp. 241–278. */
IFL_DATA.registerChapter({
  number: 10,
  title: "Forward Sales: Salam and Istisna‘a",
  part: "part-iii",
  pages: [241, 278],
  minutes: 90,
  difficulty: "Intermediate",
  objectives: [
    "Explain why Salam and Istisna‘a are exceptions to the rule against selling what does not exist or is not owned.",
    "Describe the economic role and benefits of Salam.",
    "State the conditions of a valid Salam: subject matter, price (Salam capital), delivery, options, amendment and penalty.",
    "Explain why Salam in currencies is invalid.",
    "Explain methods of disposing of Salam goods (Parallel Salam, agency, promise) and post-execution scenarios.",
    "Describe Salam Sukuk and the risks and mitigation in bank Salam (Box 10.3).",
    "Define Istisna‘a and state rules on subject matter, price, penalty (Shart-e-Jazai), binding nature, Parallel Istisna‘a and agency.",
    "Compare Istisna‘a with Salam and with Ijarah/Ujrah (Box 10.10) and apply case studies."
  ],
  why: "Salam and Istisna‘a are the Shari’ah-approved forward contracts — the only lawful way to sell goods that do not yet exist. They underpin agricultural, working-capital, export and infrastructure finance, and help you see why conventional futures and options fail Shari’ah tests.",
  overview: "The chapter treats Salam — its basis, benefits, conditions, security, disposal of goods, post-execution scenarios, securitisation, rule summary and use by banks with risk mitigation and case studies — and then Istisna‘a: definition, subject matter, price, penalty clause, binding nature, guarantees, parallel contracts, agency, post-execution, potential, risk management, comparisons and case studies in housing, export and project finance.",
  summarySection: null,
  topics: [
    {
      id: "t10.1", section: "10.1", title: "Introduction: Forward Sales as Exceptions", pages: [241, 241], tier: "core",
      concepts: ["salam", "istisna"],
      intuition: "Normally you cannot sell what doesn’t exist or what you don’t own. Why do Salam and Istisna‘a get an exception?",
      simple: "A valid sale needs an existing commodity, owned and possessed by the seller. Salam and Istisna‘a are exceptions because conditions are imposed that remove Gharar. As delivery is deferred, they are forward sales. Islamic commodity forward markets can exist under their rules; modern futures, options, derivatives and swaps do not qualify.",
      academic: [
        "The three basic conditions of sale — existence, ownership (and its risks), and physical or constructive possession — are imposed to avoid Gharar and dispute. Salam and Istisna‘a are exceptions because conditions are prescribed that free them from Gharar. Because delivery is deferred, they are forward sales; commodity markets for future delivery can exist under their rules, whereas modern futures markets in options, derivatives and swaps do not qualify."
      ],
      exam: "Salam and Istisna‘a: exceptions to existence/ownership/possession, with conditions removing Gharar; forward sales; conventional futures/derivatives don’t qualify.",
      keyPoints: [
        "Three basic sale conditions; two exceptions.",
        "Three basic sale conditions — existence, ownership, possession — are relaxed only for Salam and Istisna."
      ],
      related: ["t5.5", "t8.8.6"],
      quickCheck: { q: "Why are Salam and Istisna‘a permitted despite involving goods not yet existing?", options: ["Because they involve interest", "Because conditions are prescribed that free them from Gharar", "Because they are gifts", "Because regulators allow it"], answer: 1, explanation: "p. 241." },
      confusions: [
        { wrong: "Salam and Istisna are forms of conventional futures contracts.", right: "They are exceptions to the rule against selling what does not exist, allowed because their conditions remove Gharar; options, swaps and modern futures do not qualify (p. 241)." }
      ]
    },
    {
      id: "t10.2", section: "10.2", title: "Bai‘ Salam/Salaf: Definition and Legitimacy", pages: [241, 242], tier: "core",
      concepts: ["salam"],
      intuition: "What is the one Islamic forward contract expressly allowed by the Prophet (pbuh)?",
      simple: "Salam: the full price is paid in advance at contract for specified goods delivered later — the reverse of Bai‘ Mu’ajjal. Salaf (Hijaz term) and Salam (Iraq term) are interchangeable. In Madinah people prepaid for dates for one to three years without specifications; the Prophet required “known quality, specified measure and weight … and time of delivery”. Jurists later extended it to all precisely determinable commodities.",
      academic: [
        "Bai‘ Salam is an ancient forward contract: price paid in advance for prescribed goods to be delivered later at a stipulated time with specified quantity and quality — contrary to Bai‘ Mu’ajjal (goods now, price later). Salaf/Taslif (advance payment) was used by Hijazi jurists, Salam by Baghdad jurists; since the commodity becomes a debt on the seller, it implies a loan without benefit. Salam was permitted by the Prophet (pbuh) without difference of opinion, notwithstanding the rule against selling what one does not possess: in Madinah people paid in advance for fruit for one to three years without specifying quality, measure or time; he ordained: “Whoever pays money in advance should pay it for a known quality, specified measure and weight … along with the price and time of delivery.” Hasanuz Zaman: rationale is necessity; the Madinan list covered wheat, barley, dates, grapes; later olives and raisins; jurists expanded it to all commodities precisely determinable in quality and quantity."
      ],
      exam: "Salam: full advance price, deferred delivery of specified goods; opposite of Mu’ajjal. Hadith: known quality, measure, weight, time. Permitted by consensus; rationale: necessity.",
      keyPoints: [
        "Salaf = Hijazi term; Salam = Iraqi term.",
        "The goods are a debt on the seller.",
        "Hijaz jurists said Salaf, Iraqi jurists Salam; the deferred goods are a debt on the seller.",
        "Madinan list: wheat, barley, dates, grapes; the conquest of Syria added olives and raisins."
      ],
      definitions: [
        { term: "Bai‘ Salam", meaning: "A forward sale in which the full price is paid in advance at the time of contract for specified goods to be delivered at a stipulated future time." }
      ],
      distinctions: [
        { a: "Bai‘ Salam", b: "Bai‘ Mu’ajjal", text: "Salam: price now, goods later. Mu’ajjal: goods now, price later." }
      ],
      related: ["t10.4.1", "t9.6.1"],
      quickCheck: { q: "What did the Prophet (pbuh) require when people paid in advance for fruit?", options: ["Nothing", "Known quality, specified measure and weight, price and time of delivery", "Delivery within a week", "Payment in gold only"], answer: 1, explanation: "p. 242." },
      confusions: [
        { wrong: "Salam and Bai‘ Mu’ajjal are the same credit sale.", right: "In Salam the price is paid now and goods come later; in Mu’ajjal the goods are delivered now and the price is paid later (p. 241)." }
      ]
    },
    {
      id: "t10.3", section: "10.3", title: "Benefits of Salam and its Economic Role", pages: [242, 243], tier: "core",
      concepts: ["salam"],
      intuition: "Why might a farmer prefer Salam to an interest-bearing loan — and why might a trader like it too?",
      simple: "The seller gets money upfront for personal, productive or trading needs; the buyer gets goods at a usually lower price and is protected against price rises. Historically Salam financed farmers for one to three years (even land improvement, wells, irrigation). It avoids interest cost and marketing hardship, links growers directly with city traders, can stabilise prices (no resale before delivery curbs speculation), and offers the benefits of a swap at lower cost without interest.",
      academic: [
        "Salam is structured free from Riba and Gharar, based on genuine need. The seller covers liquidity needs; the buyer obtains the commodity when planned, usually at a lower price than cash, secured against price fluctuation. Hasanuz Zaman: the one-to-three-year period implies substantial advances; buyers were traders; advances met productive and consumption needs; the three-year term suggests fixed investment (land improvement, gardens; wells and irrigation in Syria). For farmers it is preferable to interest loans — no increased cost, and relief from marketing risk; it created direct grower–trader links. It can stabilise prices at moderate levels during seasonal falls in demand; since resale of Salam goods before transfer is not allowed, it protects prices from speculative rises, unlike interest-financed inventory which raises costs. It gives the buyer a price hedge, protects both from revenue and price-indexed debt risks, reduces incentives to manipulate reported revenue, involves no predetermined cash debt, and can bring the benefits of a swap without interest at lower transaction cost."
      ],
      exam: "Seller: advance liquidity. Buyer: lower price, hedge. Farmers: no interest cost, no marketing hardship. Direct grower–trader link; price stabilisation; swap-like benefits without interest.",
      keyPoints: [
        "Salam price is usually lower than cash price.",
        "No resale before delivery curbs speculation (majority view).",
        "Salam can give the benefits of a swap without interest and at lower transaction cost."
      ],
      related: ["t10.10", "t8.6"],
      quickCheck: { q: "Which is a benefit of Salam to the buyer identified in Section 10.3?", options: ["Guaranteed interest", "Usually a cheaper price and protection against price fluctuations", "Immediate delivery", "No need to pay in advance"], answer: 1, explanation: "p. 242." },
      examples: [
        { title: "Why delivery periods of one to three years matter", kind: "textbook", text: "Hasanuz Zaman infers that advances were large, buyers were traders, and funds met both consumption and fixed investment such as land improvement, wells and irrigation (pp. 242–243)." }
      ],
      distinctions: [
        { a: "Salam", b: "Interest-based production loan", text: "Salam adds no interest cost, removes the farmer’s marketing risk and, because resale before delivery is restricted, dampens speculative price rises; interest loans raise production and stock costs (p. 243)." }
      ]
    },
    {
      id: "t10.4.1", section: "10.4.1", title: "Subject Matter of Salam (and Salam in Currencies)", pages: [244, 246], tier: "core",
      concepts: ["salam", "mithli-qimi", "bai-sarf"],
      intuition: "What can — and cannot — be bought through Salam?",
      simple: "Anything precisely determinable in quality and quantity: fungible (Mithli) goods, not specific units. It must be normally available in the market at delivery; it cannot be money (gold, silver, currencies), identical items exchanged (wheat for wheat), specific items (“this car”, land, buildings, trees, “this field”) or subjectively valued items (gems, antiques). The seller need not produce the goods. Salam in currencies is invalid because currency exchange must be simultaneous.",
      academic: [
        "Consensus: everything precisely determinable in quality and quantity; well-defined but not particularised to a specific farm, tree or garden; only Mithli goods whose units do not differ significantly. Not where both items are identical (wheat for wheat) nor money-like items (gold, silver, currency). Classical jurists disagreed on animals, flesh, fodder, bread, milk, vegetables, precious stones, cloth, carpets, bricks, drugs etc. because standardisation was difficult. Contemporary scholars: all goods standardisable into identical units — grains, oil, iron, copper, regularly available company products like carpets and tinned goods (AAOIFI 3/2/2). The commodity must be normally available at least at delivery (all schools; AAOIFI 3/2/8), and specifications must cover all price-affecting characteristics.",
        "Salam is not allowed for identified things (“this car”), things the seller cannot be responsible for (land, buildings, trees, produce of “this field”), or subjectively valued items (landscapes, precious gems, antiques — AAOIFI 3/2/3). Companions paid Syrian peasants in advance without asking whether they owned standing crops — the seller need not produce the goods.",
        "Salam in currencies: the majority disallow it, though a few allow it and some banks used it as an alternative to bill discounting. Paper money is only a price (Thaman) with no value absent government commitment; US Dollars as price for Pak Rupees is a currency exchange needing simultaneous payment, while Salam defers delivery. Justice Khalil-ur-Rehman: Fulus were sub-money for fractions; paper money is like gold and silver. IRTI (Umar, 1995) and Shirbini: currency exchange cannot be via Salam. Hanafi and Maliki jurists: Salam capital is money and the two items must not be of a kind whose exchange leads to Riba (Ibn Rushd). Allowing it would open a floodgate of Riba."
      ],
      exam: "Salam subject: Mithli, precisely specified, available at delivery; not money, not identical exchange, not specific items/land/buildings, not subjectively valued items. Seller need not be producer. Salam in currencies invalid (currency exchange must be spot).",
      keyPoints: [
        "Not particularised to a specific farm or field.",
        "Must be available in the market at delivery time.",
        "Salam in currency = floodgate of Riba."
      ],
      conditions: [
        "Fungible (Mithli), standardisable goods",
        "Precisely specified quality and quantity (all price-relevant attributes)",
        "Normally available in the market at delivery",
        "Not money (gold, silver, currency)",
        "Not identical to the price commodity (no wheat for wheat)",
        "Not a specific identified item, land, building, tree or ‘this field’",
        "Not a subjectively valued item (gems, antiques)"
      ],
      related: ["t4.5", "t5.2", "t10.9"],
      quickCheck: { q: "Which can be the subject of Salam?", options: ["The produce of ‘this specific field’", "1000 tons of a defined variety of rice", "A particular antique vase", "Pakistani Rupees against US Dollars"], answer: 1, explanation: "pp. 244–246." },
      examples: [
        { title: "Syrian peasants", kind: "textbook", text: "Companions paid Syrian peasants in advance for wheat, barley and oil; asked whether the peasants owned standing crops, they said “we never asked” — the seller need not produce the goods himself (p. 245)." }
      ],
      confusions: [
        { wrong: "Salam may specify “the produce of this field”.", right: "It may not: a particular field may yield nothing. Salam is for fungible goods defined by specification and generally available in the market at delivery (p. 244)." }
      ]
    },
    {
      id: "t10.4.2", section: "10.4.2", title: "Payment of Price: Salam Capital", pages: [246, 247], tier: "core",
      concepts: ["salam", "bai-dayn"],
      intuition: "Why must the Salam price be paid upfront — and can it be paid by cancelling a debt?",
      simple: "The price is normally money but may be goods (without Riba in barter) or usufruct. It cannot be an existing debt owed by the seller or a third party (debt for debt). It must be paid in full at contract; contemporary jurists allow a stipulated delay of two to three days. Crediting the seller’s account or a pay order is acceptable.",
      academic: [
        "Price is normally legal tender; it can be goods, if not violating barter Riba rules, or usufruct of assets (Malikis: possession of part is possession of the whole, so not debt for debt). Outstanding debts of the seller or a third party cannot be set as price — debt for debt and Gharar. The term Salaf means advance payment; if delayed it is not Salam. The majority require payment in the contract session; Shafi‘i: on the spot before separation; some allow delay not amounting to debt; Malik up to three days; contemporary jurists (AAOIFI) allow two to three days if stipulated and before delivery. In barter, the same species cannot be advanced for deferred delivery (10 tons improved seed for 25 tons wheat — no), but a tractor for cotton is possible. Cash is not necessary: crediting the seller’s account or a cashable pay order places money at his disposal and is not the prohibited debt for debt."
      ],
      exam: "Salam capital: money (or goods/usufruct); full payment at contract (≤2–3 days delay allowed by contemporary scholars); no debt set-off; account credit/pay order OK.",
      keyPoints: [
        "Bank cannot offset an existing receivable as Salam price.",
        "Improved seed for wheat at harvest: same genus — not allowed.",
        "Majority: pay the full price in the contract session; Imam Malik and contemporary jurists allow a delay of up to two or three days if stipulated.",
        "Usufruct of an asset can be Salam capital (Maliki view)."
      ],
      related: ["t5.5.5", "t10.9"],
      quickCheck: { q: "A bank wants to use an existing loan owed by the farmer as the Salam price. This is:", options: ["Permissible", "Not permissible — debt for debt", "Permissible if interest-free", "Required"], answer: 1, explanation: "p. 247." },
      examples: [
        { title: "Crediting the seller’s account", kind: "textbook", text: "The bank need not pay hard cash; crediting the seller’s account or issuing a pay order cashable on demand places the money at his disposal and is not a prohibited debt-for-debt exchange (p. 247)." }
      ],
      confusions: [
        { wrong: "A bank may use a customer’s existing debt as the Salam price.", right: "An outstanding debt of the seller or of a third party cannot be the price: that is debt for debt and Gharar; the price must actually be paid (p. 247)." }
      ]
    },
    {
      id: "t10.4.3", section: "10.4.3", title: "Period and Place of Delivery", pages: [247, 248], tier: "core",
      concepts: ["salam"],
      intuition: "How precise must the delivery date and place be?",
      simple: "Time and place of delivery must be fixed. Hadith practice was one to three years; later jurists allowed as little as fifteen days or even one day. Contemporary scholars: any known due date suitable to the commodity; delivery in instalments allowed. Before delivery risk is the seller’s; after, the buyer’s. If no place is stipulated, the contract location applies.",
      academic: [
        "Delivery time must be precisely fixed and place agreed. Early practice: one to three years for farm products; later jurists reduced it to fifteen days, some to one day (minimum time to transport between markets); some required an exact date, others a definite period such as harvest. Contemporary scholars: known due date and place; from a few days to years; delivery in consignments/instalments if agreed (AAOIFI 3/2/9). Goods remain at the seller’s risk before delivery; delivery physical or constructive; transfer of risk and authority of use are ingredients of constructive possession. If place is not stipulated, the place of contract applies, or as agreed by custom (AAOIFI 3/2/10)."
      ],
      exam: "Fix date and place; any known period; instalments allowed; risk passes on delivery (physical/constructive); default place = contract place.",
      keyPoints: [
        "Delivery can be in instalments.",
        "Later jurists reduced the minimum delivery period to 15 days or even a day; contemporary scholars require only a known due date and place.",
        "Delivery in instalments is allowed; if no place is stipulated, the place of contract applies."
      ],
      related: ["t10.4.1"],
      quickCheck: { q: "If the Salam contract does not specify the place of delivery, delivery is at:", options: ["The buyer’s warehouse", "The place where the contract was executed (or as customarily agreed)", "The nearest port", "Any place chosen by the seller"], answer: 1, explanation: "p. 248." },
      confusions: [
        { wrong: "Risk passes to the Salam buyer at the contract date.", right: "The goods stay at the seller’s risk until delivery, physical or constructive (p. 248)." }
      ]
    },
    {
      id: "t10.4.4", section: "10.4.4", title: "Options, Amendment/Revocation and Penalty in Salam", pages: [248, 249], tier: "core",
      concepts: ["salam", "khiyar", "late-payment-penalty"],
      intuition: "Once a Salam is signed, can either side walk away if prices move?",
      simple: "No Khiyar al-Shart or Khiyar al-Ro’yat in Salam; after delivery the buyer has options of defect and quality (recovering only the price paid). Salam is binding: neither party may unilaterally change terms; both may rescind by mutual consent, refunding exactly the price. Banks should make it irrevocable except when goods vanish from the market. Early delivery need not be accepted unless in the buyer’s interest. Substitutes after due date by consent (different genus, value not above the original, not pre-stipulated). A late-delivery penalty may be pledged to charity — not bank income (AAOIFI 5/7); insolvent sellers get more time.",
      academic: [
        "Options (10.4.4): jurists disallow Khiyar al-Shart (it delays the seller’s ownership of the price) and Khiyar al-Ro’yat. After delivery the buyer has Khiyar al-‘Aib and the option of specified quality; on rescission only the price paid is recovered, without increase.",
        "Amending or revoking (10.4.5): the seller must deliver as stipulated; the buyer cannot unilaterally change quality, quantity or period after payment. Both may rescind by mutual consent wholly or partly; the buyer gets back exactly the amount advanced. Sellers may wish to rescind when market prices rise, banks when they fall — so bank Salam should be irrevocable; the only exception is complete absence of goods from the market at delivery, when the seller may rescind if the bank refuses to extend to the next season. If goods are supplied early, jurists generally do not bind the buyer to accept (some relax subject to the buyer’s interest); price changes allow neither party to refuse. Salam is non-revocable except by mutual consent (majority). After the due date, the buyer may take other goods if agreed, of a different genus, with market value not exceeding the original’s at delivery, and not stipulated in the contract (AAOIFI 4/2, 5/4).",
        "Penalty (10.4.6): the seller may undertake to pay into the bank’s Charity Account for late delivery — a self-imposed penalty. AAOIFI 5/7: a penalty clause for delay in delivering the Salam commodity is not permitted — i.e. it cannot be the bank’s income. If the seller fails due to insolvency, he should be granted an extension (AAOIFI 5/6)."
      ],
      exam: "No Khiyar al-Shart/Ro’yat; defect/quality options after delivery (price refund only). Binding; rescission only by consent at exact price. Substitution rules. Late-delivery penalty only to charity; insolvency → extension.",
      keyPoints: [
        "Refund on rescission = exactly the advance, no more or less.",
        "Substitute: different genus, value ≤ original, not pre-stipulated.",
        "Contrast with Istisna‘a’s Shart-e-Jazai."
      ],
      subsections: [
        { number: "10.4.4", title: "Khiyar (Option) in Salam", page: 248, points: ["No Shart or Ro’yat options", "Defect and quality options after delivery"] },
        { number: "10.4.5", title: "Amending or Revoking the Salam Contract", page: 248, points: ["Binding; mutual rescission at exact price", "Early delivery; substitution rules"] },
        { number: "10.4.6", title: "Penalty for Nonperformance", page: 249, points: ["Charity undertaking", "Not bank income (AAOIFI 5/7)", "Extension for insolvency"] }
      ],
      related: ["t10.11.4", "t10.7", "t6.12"],
      quickCheck: { q: "If a Salam contract is rescinded by mutual consent, the bank recovers:", options: ["The market value of the goods", "Exactly the price it paid, without increase or decrease", "Price plus profit", "Half the price"], answer: 1, explanation: "p. 248." },
      examples: [
        { title: "Substituting cotton for wheat", kind: "textbook", text: "After the due date, if wheat is completely unavailable, the parties may agree to take cotton instead — a different genus, not worth more than the wheat at delivery and not stipulated in advance — but not corn (pp. 249, 253–254)." }
      ],
      distinctions: [
        { a: "Options available", b: "Options not available", text: "After delivery the buyer has the options of defect and specified quality; Khiyar al-Shart and Khiyar al-Ro’yat are not available in Salam (p. 248)." }
      ]
    },
    {
      id: "t10.5", section: "10.5", title: "Security, Pledge and Liability of the Sureties", pages: [249, 250], tier: "supporting",
      concepts: ["kafalah", "rihn"],
      intuition: "The bank pays upfront — how does it protect itself if the seller fails to deliver?",
      simple: "Security, personal surety or pledge may be taken (Bukhari’s chapters on Kafeel and Rihn in Salam). On default the bank may sell the pledge and buy the goods from the market (involving the customer) or recover only its advance and return the balance. A surety must deliver if the seller fails. Liability can be shifted via Hawalah; if Salam is rescinded, surety liability ends and the pledge is released.",
      academic: [
        "Security or pledge in Salam is permissible from the Sunnah (the Prophet borrowed grain against his breastplate); Imam Bukhari captioned chapters on Kafeel and Rihn in Salam, and Ibn Hajar explains Kafeel is implied. The seller may furnish security, personal surety or pledge. On default, the bank may sell the pledge and buy the stipulated goods from the market (with the customer involved to avoid exploitation) or take back its advance, returning the balance — never more than the price paid, as it is like a debt. A personal surety must deliver the goods if the seller fails; only the seller (not the surety) may revoke, and only the price is then taken. The seller may shift liability by Hawalah with the purchaser’s permission and the transferee’s acceptance. If Salam is rescinded, surety or transferee liability ceases and the pledge is released."
      ],
      exam: "Security/surety/pledge allowed. Default: sell pledge and buy goods, or recover advance only (no more). Surety delivers; Hawalah possible; rescission releases surety and pledge.",
      keyPoints: [
        "Bank can never recover more than its advance in cash.",
        "Bukhari has chapters on Kafeel and Rihn in Salam; the Prophet (pbuh) borrowed grain against his breastplate.",
        "Only the seller, not the surety, may revoke the Salam; rescission releases the surety and the pledge."
      ],
      related: ["t7.15", "t10.7"],
      quickCheck: { q: "If the bank recovers cash from a defaulting Salam seller’s pledge, the maximum it may keep is:", options: ["The market value of the goods", "The price paid in advance", "Price plus expected profit", "Unlimited"], answer: 1, explanation: "p. 249." },
      examples: [
        { title: "Selling the pledge on default", kind: "textbook", text: "If the seller defaults, the bank may sell the pledge and buy the specified goods from the market (involving the customer), or take back only its advance and return the balance (pp. 249–250)." }
      ]
    },
    {
      id: "t10.6", section: "10.6", title: "Disposing of the Goods Purchased on Salam", pages: [250, 252], tier: "core",
      concepts: ["salam", "parallel-salam", "wakalah", "wad"],
      intuition: "A bank doesn’t want 5000 tons of wheat. How can it sell Salam goods — and can it sell them before delivery?",
      simple: "The majority say Salam goods cannot be resold before delivery (a weak Hadith); Ibn Taymiyah, Ibn al-Qayyim, Ibn Abbas, Ahmad and Malikis allow it (to the seller only at the same or lower price; not foodstuff). The author finds the permissive view logical, supporting Parallel Salam, but advises not delivering before possession to be safe; negotiable Salam certificates are not yet accepted. Options: Parallel Salam (independent, never with the original seller or his owned entity), agency (separate agreement), a promise from a third party (with HJ; no prepayment needed), or selling after delivery. Selling back to the seller is buy-back.",
      academic: [
        "The majority hold the Salam buyer may not dispose of goods before receipt — cannot resell even at cost, transfer, or use as partnership capital — relying on “Whoever makes Salam should not transfer it to others” (Abu Daud, Ibn Majah), which Ibn Hajar rates weak. Salam being an exception, the same basis permits Parallel Salam. Ibn Taymiyah and Ibn al-Qayyim: no problem exchanging before possession — to a third party at any price; to the seller at the same or lower price; Ibn Abbas, Imam Ahmad and Malikis agree, but not for foodstuff. Contemporary: Nazih Hammad permits; many others prohibit. The author: the permissive view is logical (no genuine text prohibits; price risk passes at contract), enabling Parallel Salam and Salam Sukuk; negotiable Salam certificates are not yet accepted by the majority; to be safe, no delivery before possession, though selling unidentified units out of inventory could be acceptable.",
        "10.6.1 Alternatives: (i) Parallel Salam; (ii) agency with a third party or the customer; (iii) sale in the open market via a promise from a third party or after delivery. Goods cannot be sold back to the Salam seller — Parallel Salam with the original seller or an entity he owns is buy-back. After settlement, a separate Murabaha/Musawamah with the same client was allowed by the State Bank of Pakistan (a bank sold carpets to the Salam seller for export) but most scholars disagreed, so the bank shifted to appointing the client as export agent.",
        "Promise: a binding promise from a third party to buy at a stipulated price; breach → actual loss; or wait and sell for cash/deferred (inventory). Agency: separate and independent from Salam; a target price may be set; a higher price obtained may be given to the agent. Parallel Salam: same conditions and specifications without dependency; delivery date may be the same but not earlier; the injured party cannot relate the first seller’s breach to the parallel buyer; two separate contracts (AAOIFI 6). Promise vs Parallel Salam: in a promise, the promisor need not prepay — its advantage."
      ],
      exam: "Resale before delivery: majority no (weak Hadith); Ibn Taymiyah et al. yes (not foodstuff; to seller at ≤ price). Disposal: Parallel Salam (independent; not with original seller/affiliates; date not earlier), agency (separate), third-party promise with HJ (no prepayment), or sell after delivery. No sale back to seller.",
      keyPoints: [
        "Parallel Salam delivery date cannot precede the original.",
        "SBP allowed a separate post-settlement Murabaha; most scholars disagreed.",
        "Promise avoids requiring the ultimate buyer to prepay."
      ],
      subsections: [
        { number: "10.6.1", title: "Alternatives for Marketing Salam Goods", page: 251, points: ["Parallel Salam", "Agency", "Promise to purchase", "Sell after delivery"] }
      ],
      debate: [
        { issue: "Can Salam goods be resold before taking delivery?", criticism: "Majority: no — relying on the Hadith “Whoever makes Salam should not transfer it to others.”", response: "That Hadith is weak (Ibn Hajar). Ibn Taymiyah, Ibn al-Qayyim, Ibn Abbas, Ahmad and Malikis permit it (except foodstuff; to the seller only at same or lower price). The author finds this logical since price risk passes at contract and it underpins Parallel Salam.", alternative: "Negotiable Salam certificates are not accepted by most contemporary scholars.", takeaway: "Use Parallel Salam, promise or agency; avoid physical/constructive delivery before possession." }
      ],
      related: ["t10.10", "t4.2.7", "t8.8.6"],
      quickCheck: { q: "With whom can a bank NOT enter a Parallel Salam to dispose of Salam goods?", options: ["A third-party trader", "The original Salam seller or an entity owned by him", "A mill", "An exporter"], answer: 1, explanation: "p. 251." },
      examples: [
        { title: "Carpets sold back to the Salam seller", kind: "textbook", text: "A Pakistani bank sold carpets bought on Salam to the same seller the day after delivery for export. Since most scholars objected, it switched to appointing the client as its agent to export on the bank’s behalf (p. 251)." }
      ],
      confusions: [
        { wrong: "Parallel Salam may be made with the original seller or his company.", right: "That is buy-back; Parallel Salam must be with an independent third party (p. 251)." }
      ]
    },
    {
      id: "t10.7", section: "10.7", title: "Salam — Post-Execution Scenarios", pages: [252, 254], tier: "core",
      concepts: ["salam"],
      intuition: "Delivery day: goods arrive as agreed, don’t arrive, or arrive inferior. What can the bank do in each case?",
      simple: "(1) Supply as contracted — the bank disposes as planned. (2) Failure to supply — wait, cancel and recover the price, or accept a replacement; the bank may ask the seller to buy from the market, or sell the pledge and buy the goods; cash recovery is limited to the advance. (3) Inferior goods — refuse and insist on supply or refund; accept at a discount; substitute (only if absolutely out of stock, fungible, different genus, value ≤ original); or accept part and refund the rest. Genuinely insolvent sellers are treated as insolvent debtors.",
      academic: [
        "10.7.1 Supply as per contract: transaction culminates; the bank disposes of goods.",
        "10.7.2 Failure: options (AAOIFI 5/8) — wait; cancel and recover the price; agree a replacement. The bank may ask the client to acquire the goods from the market; failing that, sell the collateral, buy the commodity and return any remainder; if insufficient, ask the customer to make good the deficit. If cash is taken instead of goods, only the advance price is recoverable; the price is a debt refunded without increase or decrease regardless of value change.",
        "10.7.3 Inferior goods: disputes may be referred to an expert institution (clause in the agreement). The bank need not accept inferior goods; may accept, even at a discount; may adjust for superior quality or extra quantity (AAOIFI 5/3). Solutions: refuse and insist or take back the price (not a different amount); substitute if the item is absolutely out of stock — the new commodity fungible, value not more than the Salam commodity, not the same genus (wheat → cotton, not corn), at mutually decided market price; if available, the seller must buy it at any market price, and any new bank facility must be separate. Partial supply: accept the quantity and revise or refund the balance. An insolvent seller is treated as an insolvent debtor."
      ],
      exam: "Scenarios: as contracted; failure (wait, cancel & refund price, replace; buy from market via pledge); inferior (refuse/refund, discount, substitute under strict conditions, partial acceptance). Cash recovery = advance only.",
      keyPoints: [
        "Substitution only if absolutely out of stock.",
        "Any new financing to the seller must be a separate transaction.",
        "An insolvent Salam seller is treated like an insolvent debtor."
      ],
      subsections: [
        { number: "10.7.1", title: "Supply of Goods as Per Contract", page: 252, points: ["Normal culmination"] },
        { number: "10.7.2", title: "Failure in Supply of Goods", page: 253, points: ["Wait, cancel, replace", "Sell pledge and buy from market"] },
        { number: "10.7.3", title: "Supply of Inferior Goods", page: 253, points: ["Refuse, discount, substitute, partial"] }
      ],
      related: ["t10.4.4", "t10.10.1"],
      quickCheck: { q: "Wheat under Salam is absolutely unavailable. Which substitute is permissible under the rules cited?", options: ["Corn", "Cotton of value not exceeding the wheat’s value", "The seller’s animals", "Wheat of another variety at a higher price"], answer: 1, explanation: "Different genus, fungible, value ≤ original (p. 254)." },
      confusions: [
        { wrong: "On a failed Salam the bank may recover the market value of the goods in cash.", right: "It may buy the goods from the pledge proceeds, but if it takes cash it can recover only the price it paid — no increase for changes in value (p. 253)." }
      ]
    },
    {
      id: "t10.8", section: "10.8", title: "Salam-Based Securitisation — Salam Certificates/Sukuk", pages: [254, 255], tier: "supporting",
      concepts: ["salam", "sukuk"],
      intuition: "Can a government raise funds by selling future oil or aluminium?",
      simple: "Governments with natural resources can issue Salam certificates for future delivery of products (e.g. oil to finance refining capacity), fully paid upfront. Holders may take delivery or sell via Parallel Salam; actual delivery, not paper settlement, is binding. Returns are not guaranteed; investors bear counterparty and market risk. Example: Bahrain’s aluminium Salam Sukuk via Bahrain Islamic Bank.",
      academic: [
        "Salam certificates (forward contracts) can be issued against future delivery of a commodity, product or service — e.g. governments with petroleum, copper or iron; an oil producer expanding refining may sell oil products via Salam instead of interest borrowing. The purchaser may hold to delivery, sell via Parallel Salam before delivery at market price, or issue Salam Sukuk (SC) against the price paid. An SC may change hands; actual delivery and receipt, not paper settlement, are binding on the issuer or final holder; the issuer’s obligation equals what the real sector pays on the due date. SCs tie finance, production and sale; income is not guaranteed though it can be quasi-fixed; price risk belongs to investors, who bear counterparty risk (non-delivery) and market risk (inability to market or lower price), mitigable by structure. Bahrain: aluminium as underlying; the government sells aluminium forward; Bahrain Islamic Bank buys and represents other banks; the government issues Salam certificates undertaking to supply aluminium at a specified date."
      ],
      exam: "Salam Sukuk: prepaid certificates for future delivery of commodities (oil, aluminium); actual delivery binding; not guaranteed; counterparty and market risk; Bahrain aluminium example. (Box 8.3: Salam Sukuk non-tradable.)",
      keyPoints: ["Paper settlement not permitted."],
      related: ["t15.3.5", "t8.8.6"],
      quickCheck: { q: "Which commodity underlies Bahrain’s Salam Sukuk cited in the chapter?", options: ["Oil", "Aluminium", "Wheat", "Gold"], answer: 1, explanation: "p. 255." },
      examples: [
        { title: "Oil refinery expansion", kind: "textbook", text: "An oil-producing country could sell oil products by Salam instead of borrowing on interest, using the advance price to expand refining, with Salam certificates held by investors (p. 254)." }
      ],
      confusions: [
        { wrong: "Salam certificates can be traded freely like shares.", right: "The majority of contemporary scholars have not accepted negotiable Salam certificates; they represent a debt of goods (pp. 251, 254)." }
      ]
    },
    {
      id: "t10.9", section: "10.9", title: "Summary of Salam Rules", pages: [255, 256], tier: "revision",
      concepts: ["salam"],
      intuition: "A one-page checklist for any Salam contract.",
      simple: "Full price on the spot; object is a debt so price can’t be delayed; price may be money, service or usufruct but not an existing debt; fungible, describable goods usually in the market; not currencies or specific items; deliverable; time and place specified; instalments allowed; early delivery if no inconvenience; no cash settlement — actual delivery; seller need not be producer; binding; banks can’t offset receivables; itemised value for multiple items; bank must take delivery when offered; parallel contracts or promises independent.",
      academic: [
        "The seller supplies specific goods at a future date for a price fully paid on the spot; since the object is a debt, payment cannot be delayed (debt for debt). Capital is money, service or usufruct; no debt of the buyer against the seller or third party as capital. Objects fungible and describable (weight, size, volume, colour, quality, grade); negligible variation tolerated; usually in markets but not in the seller’s possession; agricultural, industrial, natural goods or well-defined services. Not money/currencies, specific things (“this car”), land, buildings, trees or subjectively valued items. Deliverability ensured; place and time specified; instalments permissible; early delivery if no inconvenience. No cash settlement — actual physical delivery; on rescission the actual price is recovered. Seller need not be owner or producer. Conclusive and binding; alterable only by consent. Banks should not offset receivables for the Salam price — a Salam against a loan or part cash/part loan is effective only to the extent of cash. For multiple items, specify each item’s value, delivery period and place. If the seller offers delivery on the due date, the bank must take it or the seller is absolved; the bank may refuse only for non-conformity or early offer (optional). Parallel contracts or promises are separate and independent."
      ],
      exam: "Checklist: spot full price; no debt capital; fungible, specified, available goods; no currency/specific items; fixed time/place; actual delivery; seller needn’t produce; binding; no offset; bank must accept conforming delivery; parallel contracts independent.",
      keyPoints: [
        "Salam against part loan is effective only for the cash part.",
        "Refusing conforming on-time delivery absolves the seller.",
        "If the seller offers delivery on the due date, the bank must take it or he is absolved; it may refuse only non-conforming goods or early delivery.",
        "For multiple items, state the value and delivery period of each so partial performance can be settled."
      ],
      related: ["t10.4.1", "t10.4.2", "t10.6"],
      quickCheck: { q: "A bank pays half the Salam price in cash and sets off the other half against a loan owed by the seller. The contract is effective:", options: ["Fully", "Only to the extent of the cash payment", "Not at all", "Only if interest-free"], answer: 1, explanation: "p. 255." }
    },
    {
      id: "t10.10", section: "10.10", title: "Salam as a Financing Technique by Banks (Boxes 10.1–10.8)", pages: [256, 263], tier: "core",
      concepts: ["salam", "parallel-salam", "murabaha"],
      intuition: "Why have banks under-used Salam — and how can it finance farmers, exporters and factories?",
      simple: "Banks rarely use Salam because it has no practical advantage over Murabaha: full upfront payment, taking delivery of goods, marketing and default risks. Yet it is the only mode expressly allowed by the Prophet and suits farmers and SMEs. Box 10.1: bank buys with prepayment; seller delivers; bank sells via Parallel Salam, promise, agency or market. Box 10.2: Salam vs Murabaha. Cases: wheat with promise (Box 10.4), preshipment export (10.5), central bank refinance pool (10.6), sugar mill working capital (10.7), accounting (10.8).",
      academic: [
        "Islamic banks have not generally used Salam because it offers no practical advantage over mark-up Murabaha: full cash price immediately, delivery of goods rather than money, marketing, and defaults (inferior or late goods). Practical problems — taking delivery, assessing quality, storing, disposing — are perceived relative to conventional practice and easy MPO with client as agent. Recognising the requirement of real business, risk mitigation avenues and that Salam is the only mode expressly allowed by the Prophet, banks should use it more; it benefits farmers and SMEs and can be more profitable with commodity expertise; some IFIs now use it alone or combined with Murabaha for exports.",
        "Box 10.1: (1) bank buys from client A with full prepayment for delivery on a specified date; (2) A delivers; (3) the bank sells to C by Parallel Salam, a promise, agency of A, or market sale after receipt; (4) the bank delivers to C. Box 10.2 (Salam vs Murabaha): Salam defers delivery with spot full price; Murabaha delivers spot with spot or deferred price; Salam is by specification, Murabaha on particular commodities; Salam cannot be executed in things requiring spot exchange (wheat for barley), Murabaha can.",
        "Box 10.4 (case study): farmer A sells 5000 tons of wheat on 1 January for Rs.100m paid spot; B takes C’s promise to buy for Rs.115m on 1 May with HJ of Rs.15m; A delivers on 1 May; C executes the sale and signs a promissory note. Box 10.5 (preshipment export): exporter with Rs.1.1m rice order; importer’s L/C in favour of B; Salam for 1000 tons at Rs.1m paid in advance; agency to export; after delivery B owns risk and reward (including cancellation or damage; Takaful borne by B); B receives L/C proceeds. Box 10.6 (central bank refinance): CB and bank create a Musharakah pool (bank’s assets: compliant stocks, Ijarah, Murabaha receivables <33%); CB invests an amount equal to Salam export finance; income shared by agreed ratio; reserves from profit above a level. Box 10.7 (working capital): sugar mill A needs working capital; bank B offers Salam with an agency agreement independent of the Salam; B indicates a target resale price of Rs.20/kg; A sells sugar of defined quality to B at Rs.19/kg for delivery on 31 December, receiving the price in advance; on physical or constructive delivery the sugar is at B’s risk; if A, as agent, sells at Rs.21, Re.1 per kg may be his service fee if the bank agrees; if prices fall to Rs.18, B bears the loss.",
        "Box 10.8 (accounting, AAOIFI): Salam financing recognised when paid; Parallel Salam when price received; measured at cash paid or fair value in kind; provision if delivery improbable or value declines; presented as ‘Salam Financing’ and Parallel Salam as a liability; commodity received at historical cost (lower quality → market value, loss recognised); extended delivery keeps book value; cancellation without repayment → receivable; pledge shortfalls → receivable (or credit if excess); period-end at lower of cost and cash equivalent; profit/loss recognised on delivery in Parallel Salam."
      ],
      exam: "Salam under-used (upfront cash, delivery/marketing risk) but Prophet-approved; suits farmers, SMEs, exporters. Box 10.1 flow; Box 10.2 vs Murabaha; cases: wheat + promise (Rs.100m→115m), preshipment export with agency, CB refinance Musharakah pool, sugar working capital (bank bears price risk), accounting.",
      keyPoints: [
        "Wheat case: promise at Rs.115m with Rs.15m HJ.",
        "Export case: bank bears risk after delivery, pays Takaful.",
        "Sugar case: gains/losses on resale are the bank’s."
      ],
      table: { caption: "Box 10.2 — Salam vs Murabaha", head: ["Aspect", "Salam", "Murabaha"], rows: [["Delivery", "Deferred", "Spot"], ["Price", "Paid in full in advance", "Spot or deferred"], ["Subject", "By specification, not a particular commodity", "Particular commodities"], ["Items requiring spot exchange (e.g. wheat for barley)", "Not allowed", "Allowed"]] },
      steps: [
        "Bank buys goods from client with full prepayment for delivery on a specified date",
        "Client (seller) delivers at the agreed time and place",
        "Bank sells: Parallel Salam, third-party promise, client as agent, or market sale",
        "Bank delivers to the final buyer"
      ],
      examples: [
        { title: "Box 10.4 — Wheat Salam with promise", kind: "textbook", text: "Farmer sells 5000 tons of wheat to bank B for Rs.100m paid on 1 January, delivery 1 May. C promises to buy for Rs.115m on 1 May with Rs.15m Hamish Jiddiyah. On delivery, C executes the purchase." },
        { title: "Box 10.7 — Sugar mill working capital", kind: "textbook", text: "Bank buys sugar at Rs.19/kg for delivery on 31 December, paying in advance, and appoints the mill as selling agent with a target of Rs.20. If sold at Rs.21, Re.1 may be the agent’s fee; if prices fall to Rs.18, the bank bears the loss." },
        { title: "Box 10.5 — rice export by Salam", kind: "textbook", text: "The bank pays Rs.1m for 1,000 tons of rice deliverable on 1 January and appoints the exporter as agent; after delivery the bank owns the rice and bears Takaful and cancellation risk, and collects Rs.1.1m under the L/C (p. 260)." },
        { title: "Box 10.7 — sugar mill working capital", kind: "textbook", text: "The bank buys sugar by Salam at Rs.19/kg for 31 December delivery and appoints the mill its agent with a target price of Rs.20. Above Rs.20 the extra may be the agent’s fee; if the price falls to Rs.18, the bank bears the loss (p. 261)." }
      ],
      calc: { type: "salam-profit", note: "Reproduces Box 10.4: Salam price, promised resale price and HJ → bank’s gross margin and HJ coverage if the promisor defaults." },
      related: ["t10.10.1", "t14.4.1", "t14.4.2"],
      quickCheck: { q: "In Box 10.5 (Salam preshipment export), who bears the risk if the rice consignment is damaged after delivery to the bank?", options: ["The exporter-seller", "The bank as owner", "The importer", "The negotiating bank"], answer: 1, explanation: "p. 260." },
      confusions: [
        { wrong: "Salam has no advantage for banks over Murabaha.", right: "Banks under-use it because of delivery and marketing burdens, but it is the only mode expressly allowed by the Prophet (pbuh) and suits farmers and SMEs (p. 257)." }
      ]
    },
    {
      id: "t10.10.1", section: "10.10.1", title: "Risks in Salam and their Management (Box 10.3)", pages: [258, 259], tier: "core",
      concepts: ["salam", "risk-management"],
      intuition: "What can go wrong in a bank Salam and how is each risk mitigated?",
      simple: "Risks: counterparty, commodity price, delivery/settlement, quality, asset holding (storage, Takaful), replacement, and fiduciary risk in Parallel Salam. Mitigation: security and liquidation to buy goods; detailed MoU; collateral and performance bonds; charity penalty for late delivery; Parallel Salam and promises for price risk; buy marketable goods with binding promises and HJ; seller as agent; factor holding costs; binding contract with charity penalty against early termination; buy spot to supply the parallel buyer and recover from the original seller.",
      academic: [
        "Risks: counterparty; commodity price; delivery/settlement; quality/low return or loss; asset holding (storage, Takaful); asset replacement (buying from market); fiduciary risk in Parallel Salam. Box 10.3: (1) counterparty and delivery — the customer may default after payment → liquidate security and buy goods; disputes with multiple consignments → specify time, quality, quantity in the MoU; defective goods → collateral and performance bonds; late delivery → penalty clause to charity. (2) Price risk → Parallel Salam and third-party promise. (3) Marketing risk → buy goods with good marketing potential, binding promises with sufficient HJ; seller as agent. (4) Asset holding → recover costs in parallel transactions with market surveys and feasibility. (5) Early termination — client refunds and refuses supply → Salam is binding; penalty to charity. (6) Parallel Salam — original seller fails and parallel buyer sues → buy similar asset spot and recover loss from the original seller."
      ],
      exam: "Salam risks (7) and Box 10.3 mitigations: security, detailed MoU, performance bonds, charity penalty, Parallel Salam/promise, marketable goods + HJ, agency, cost recovery, binding contract, spot purchase to fulfil parallel contract.",
      keyPoints: ["Fiduciary risk arises in Parallel Salam."],
      table: { caption: "Box 10.3 — Risk mitigation in Salam", head: ["Risk", "Mitigation"], rows: [["Counterparty/delivery: default after prepayment", "Liquidate security; buy goods from market"], ["Disputes over multiple consignments", "Specify time, quality, quantity per item in the MoU"], ["Defective goods", "Collateral and performance bonds"], ["Late delivery", "Penalty clause — amount to charity"], ["Commodity price risk", "Parallel Salam; third-party promise to purchase"], ["Marketing risk", "Buy marketable goods; binding promises with Hamish Jiddiyah; seller as agent"], ["Asset holding cost", "Recover in parallel transactions after market study"], ["Early termination by seller", "Binding contract; charity penalty"], ["Parallel Salam: original seller fails", "Buy spot to supply parallel buyer; recover loss from original seller"]] },
      related: ["t4.2.9", "t10.6"],
      quickCheck: { q: "Which tool mitigates commodity price risk in Salam according to Box 10.3?", options: ["Interest rate swap", "Parallel Salam or a third-party promise to purchase", "Rollover", "Indexation"], answer: 1, explanation: "p. 258." },
      examples: [
        { title: "Parallel Salam default", kind: "textbook", text: "If the original seller fails, the Parallel Salam buyer can still sue the bank; the bank buys similar goods in the spot market to deliver and recovers any loss from the original seller (Box 10.3, p. 259)." }
      ]
    },
    {
      id: "t10.11", section: "10.11.1", title: "Istisna‘a (Order to Manufacture): Definition and Concept", pages: [263, 264], tier: "core",
      concepts: ["istisna"],
      intuition: "How do you finance a ship, a building or a road that doesn’t exist yet?",
      simple: "Istisna‘a is a sale of something to be manufactured or constructed in the future at an agreed price, legalised on Istihsan. The manufacturer supplies both material and labour (if the buyer supplies material it is Ujrah, not Istisna‘a). Because it is a sale at contract, no fresh offer and acceptance is needed on completion — unlike MPO. It is binding, and a defect-liability or maintenance period may be agreed.",
      academic: [
        "Istisna‘a, like Salam, is a sale before the commodity exists; accepted because it contains no prohibition, is common practice and eases life. Zuhayli: it evolved for manual work (leather, shoes, carpentry) and now finances infrastructure — ships, aeroplanes, large machinery. As a financing mode it is legalised on Istihsan (OIC Fiqh Council Res. 65 (3/7); AAOIFI). It is an agreement culminating in a sale at an agreed price whereby the purchaser orders something to be manufactured, assembled or constructed (or caused to be) for future delivery; the manufacturer must deliver per specifications at the agreed time. Since the sale is executed at contract, no renewed offer and acceptance is needed after preparation — unlike the promise in MPO. Uses: houses, plant, projects, bridges, roads. The manufacturer arranges raw material and labour; if material is supplied by the purchaser, it is Ujrah. It is binding: the manufacturer must supply and the buyer accept and pay; a defects/maintenance period may be agreed (AAOIFI 3/1/7)."
      ],
      exam: "Istisna‘a: sale of a thing to be manufactured/constructed, agreed price, future delivery; manufacturer provides material + labour; legalised by Istihsan; sale concluded at contract (no fresh offer/acceptance); buyer-supplied material → Ujrah.",
      keyPoints: [
        "Istihsan (juristic approbation) is the basis.",
        "Differs from MPO: sale at inception, not a promise.",
        "Legalised as a financing mode on the basis of Istihsan (juristic preference)."
      ],
      definitions: [
        { term: "Istisna‘a", meaning: "A sale in which the purchaser orders an item to be manufactured, assembled or constructed with agreed specifications for future delivery at an agreed price; the manufacturer supplies material and labour." },
        { term: "Istihsan", meaning: "Juristic approbation/preference for public interest — basis for legalising Istisna‘a as a financing mode." }
      ],
      distinctions: [
        { a: "Istisna‘a", b: "Ujrah (hire of work)", text: "In Istisna‘a the manufacturer uses his own material at a fixed sale price; in Ujrah the buyer provides material and pays wages." }
      ],
      related: ["t10.11.2", "t5.7"],
      quickCheck: { q: "A customer supplies cloth and pays a tailor only for stitching. This is:", options: ["Istisna‘a", "Ujrah (hire of work)", "Salam", "Murabaha"], answer: 1, explanation: "p. 264." },
      confusions: [
        { wrong: "Istisna is merely a promise, so offer and acceptance must be repeated on delivery.", right: "Istisna is a sale concluded at the contract; unlike MPO, no fresh offer and acceptance is needed when the asset is ready (p. 263)." }
      ]
    },
    {
      id: "t10.11.2", section: "10.11.2", title: "Subject Matter of Istisna‘a", pages: [264, 265], tier: "core",
      concepts: ["istisna", "mithli-qimi"],
      intuition: "What can be ordered through Istisna‘a?",
      simple: "Only things that need manufacturing or construction, identified by specification — not natural products (animals, corn, fruit) and not an existing identified asset (“this car”). Both unique and homogeneous items qualify. The seller need not manufacture personally unless stated. Real estate on designated land (buyer’s or contractor’s) is allowed. Type, dimensions, period and place must be stated. Banks can be sellers or buyers.",
      academic: [
        "Istisna‘a applies to items to be manufactured, identified by specification not designation; valid only for objects to be manufactured or constructed; the seller need not manufacture personally unless stated. The subject must be known and specified as to kind, type, quality and quantity. It is invalid for natural products (animals, corn, fruit). Unique and homogeneous assets are covered if specifications are agreed — unique items with no regular market or substitute especially. The contract is binding according to specifications. An existing identified asset cannot be the subject (a particular designated car — invalid), but an already-produced item not identified in the contract may be supplied (AAOIFI). Real estate on designated land owned by either party (or where either owns the usufruct) is allowed, as buildings are sold by specification. The contract must state type, dimensions, period and place; manufacturer or materials may be specified or open. The seller may contract with another manufacturer; so banks can be both manufacturers (sellers) and purchasers."
      ],
      exam: "Istisna‘a subject: manufactured/constructed items by specification; not natural products; not identified existing asset; unique or homogeneous; real estate allowed; state type, dimensions, period, place.",
      keyPoints: [
        "Contract binding by specifications, not by who manufactures.",
        "Istisna is invalid for natural products such as animals, corn and fruit.",
        "Real-estate Istisna on designated land is allowed because the contract is for specified buildings."
      ],
      related: ["t10.11.10", "t5.2"],
      quickCheck: { q: "Which cannot be the subject of Istisna‘a?", options: ["A ship of given specifications", "An apartment building on designated land", "A harvest of corn", "Machinery to specification"], answer: 2, explanation: "Natural products are excluded (p. 264)." },
      confusions: [
        { wrong: "A bank can sell a specific, identified car from a factory by Istisna.", right: "Istisna cannot be on an existing identified asset; an already-made asset may be delivered only if the contract names specifications, not a particular unit (p. 264)." }
      ]
    },
    {
      id: "t10.11.3", section: "10.11.3", title: "Price in Istisna‘a", pages: [265, 266], tier: "core",
      concepts: ["istisna", "arbun"],
      intuition: "Unlike Salam, does the Istisna‘a price have to be paid upfront?",
      simple: "The price may be cash, goods or usufruct (e.g. BOT). It must be known; it may vary with the delivery date provided one offer is finally chosen. It cannot be changed unilaterally, but may be adjusted by consent for modifications or unforeseen changes. It need not be prepaid — instalments linked to completion stages are allowed (Istihsan; analogy with Ijarah). It cannot be priced on a Murabaha cost-plus basis. ‘Arbun may be taken; forfeiture preferably limited to actual damage.",
      academic: [
        "Price may be cash, tangible goods or usufruct of identified assets — relevant to BOT, where government offers usufruct for a period. It must be known; it may vary with delivery date and multiple offers may be negotiated, if one offer is finally chosen. Once settled it cannot be unilaterally changed, but can be readjusted by mutual consent for material modifications, unforeseen contingencies or input price changes. Unlike Salam, advance payment is not necessary; instalments within the agreed period and linked to completion stages are allowed (AAOIFI 3/2/2–3/2/4) — legalised by analogy and Istihsan, since the seller’s labour and commitment resemble leasing where rental may be deferred without being debt for debt; large plants need long gestation and staged payments. (Most Hanafis allow this; Malik, Shafi‘i, Ahmad, Zufar require Salam conditions including prepayment.) Istisna‘a cannot be drawn on a Murabaha cost-plus basis, as Murabaha requires an existing owned commodity with known cost (AAOIFI). The bank as manufacturer or purchaser may give or take ‘Arbun — part of price if completed, forfeited if rescinded, preferably limited to actual damage."
      ],
      exam: "Istisna‘a price: cash/goods/usufruct (BOT); known; one offer chosen; consensual adjustment only; no prepayment needed — instalments by stages (Istihsan, Ijarah analogy; most Hanafis); not cost-plus Murabaha pricing; ‘Arbun allowed.",
      keyPoints: ["BOT: usufruct as consideration.", "Minority (Malik, Shafi‘i, Ahmad): prepayment required."],
      related: ["t10.11.4", "t15.3.5"],
      quickCheck: { q: "Why may Istisna‘a payments be deferred while Salam requires full prepayment?", options: ["Istisna‘a is a loan", "By analogy/Istihsan: the manufacturer’s labour and commitment make it akin to leasing where rent may be deferred", "Because Istisna‘a has no price", "It may not be deferred"], answer: 1, explanation: "p. 265." },
      examples: [
        { title: "BOT through usufruct", kind: "textbook", text: "A government may pay the Istisna price by giving the builder the usufruct of the asset for an agreed period — the basis of build-operate-transfer arrangements (p. 265)." }
      ],
      confusions: [
        { wrong: "Istisna can be priced on a Murabaha cost-plus basis.", right: "Murabaha needs an existing, owned asset with known cost; Istisna does not, so it cannot be structured as cost-plus (p. 265)." }
      ]
    },
    {
      id: "t10.11.4", section: "10.11.4", title: "Penalty Clause: Delay in Fulfilling Obligations (Shart-e-Jazai)", pages: [266, 266], tier: "core",
      concepts: ["istisna", "late-payment-penalty"],
      intuition: "Why can an Istisna‘a buyer keep the penalty for late delivery, while in Salam it goes to charity?",
      simple: "An Istisna‘a contract may reduce the price by an agreed amount if the manufacturer delivers late (unless force majeure) — Shart-e-Jazai, by analogy with the tailor’s differential wage in Ijarah. The reduction is the purchaser’s income because timely completion depends on the manufacturer’s effort. No penalty may be imposed on the purchaser for late payment (Riba). In Salam, late-delivery penalties go to charity because the advance price is a debt.",
      academic: [
        "An Istisna‘a contract may stipulate an agreed amount compensating the purchaser for late delivery, if not due to force majeure; a penalty against the purchaser for payment default is not permitted (Riba) (AAOIFI 6/7). A voluntary prepayment rebate is permissible if not agreed in the contract. Parties may agree that the price is reduced by a specified amount for delay — by analogy with the classical Ijarah rule (a tailor’s wage 10 dirhams within a week, 12 within two days). This Shart-e-Jazai (Zuhayli) enhances the orderer’s income and does not go to charity, because timely completion depends on the manufacturer’s labour and commitment — he may otherwise pursue other orders. In Salam any late-delivery penalty goes to charity because the advance price is a debt that cannot be increased; permissible only absent force majeure; no penalty against the purchaser for payment default."
      ],
      exam: "Shart-e-Jazai: price reduction for late delivery in Istisna‘a (not force majeure), kept by purchaser (tailor analogy). No penalty on purchaser for late payment. Salam: late-delivery penalty to charity.",
      keyPoints: ["Tailor analogy: 10 dirhams in a week vs 12 in two days."],
      distinctions: [
        { a: "Istisna‘a late delivery", b: "Salam late delivery", text: "Istisna‘a: price reduction benefits purchaser (Shart-e-Jazai). Salam: penalty goes to charity because the advance is a debt." }
      ],
      related: ["t4.2.9", "t10.4.4"],
      quickCheck: { q: "In Istisna‘a, a price reduction for late delivery (Shart-e-Jazai):", options: ["Goes to charity", "Benefits the purchaser as income", "Is prohibited", "Is paid by the purchaser"], answer: 1, explanation: "p. 266." }
    },
    {
      id: "t10.11.5", section: "10.11.5", title: "Binding Nature of Istisna‘a and Guarantees", pages: [266, 267], tier: "core",
      concepts: ["istisna"],
      intuition: "When does an Istisna‘a become binding?",
      simple: "Before the manufacturer starts work, either party may cancel by notice; after work starts the buyer cannot cancel unilaterally. Most contemporary scholars, Jordanian and Sudanese civil law, the Unified Arab Law and the OIC treat it as binding under conditions. If the asset meets specifications, the buyer must accept — no Khiyar al-Ro’yat — but has defect and specification options (indemnity). Guarantees: security, collateral, performance bonds and ‘Arbun (forfeiture preferably limited to actual damage).",
      academic: [
        "10.11.5: Istisna‘a is nonbinding until the manufacturer starts work; before that either party may cancel by notice; afterwards the buyer cannot cancel unilaterally. The majority of contemporary scholars, civil law in Jordan and Sudan, the League of Arab States’ Unified Arab Law and the OIC Fiqh Council treat it as binding subject to conditions. If the asset conforms, the purchaser must accept and cannot exercise Khiyar al-Ro’yat, but has Khiyar al-‘Aib and the option of specified quality — the right to be indemnified for proven defects or missing specifications. 10.11.6 Guarantees: the bank as manufacturer or buyer may give or demand security, collateral or a performance bond for timely, conforming work; ‘Arbun may be taken — part of price if fulfilled, forfeited if rescinded, preferably limited to actual damage (AAOIFI 3/3)."
      ],
      exam: "Istisna‘a: revocable until work starts, binding thereafter (OIC, majority). No Ro’yat option if conforming; defect/specification options. Guarantees: performance bond, collateral, ‘Arbun.",
      keyPoints: ["Binding once manufacture begins."],
      subsections: [
        { number: "10.11.5", title: "The Binding Nature of an Istisna‘a Contract", page: 266, points: ["Nonbinding before work starts", "Binding after (OIC)"] },
        { number: "10.11.6", title: "Guarantees", page: 267, points: ["Security, performance bond, ‘Arbun"] }
      ],
      related: ["t10.11.9", "t5.7"],
      quickCheck: { q: "When does an Istisna‘a contract become binding on the buyer?", options: ["At signing always", "Once the manufacturer starts work on the subject matter", "Only on delivery", "Never"], answer: 1, explanation: "p. 266." },
      distinctions: [
        { a: "Before work starts", b: "After work starts", text: "Before the manufacturer starts, either party may cancel by notice; once work begins, the OIC Fiqh Council and most scholars treat Istisna as binding (pp. 266–267)." }
      ]
    },
    {
      id: "t10.11.7", section: "10.11.7", title: "Parallel Istisna‘a (Subcontracting) and Agency", pages: [267, 268], tier: "core",
      concepts: ["istisna", "parallel-istisna", "wakalah"],
      intuition: "Banks don’t build roads. How can a bank sell a road through Istisna‘a?",
      simple: "Unless the contract requires personal manufacture, the seller may subcontract. A bank signs Istisna‘a with the customer (as seller) and a Parallel Istisna‘a with a contractor (as buyer). The parallel delivery date must not precede the original; ownership risks stay separate; the contracts are independent; parallel only with a third party. A bank may also prepay a manufacturer for liquidity and resell by Parallel Istisna‘a. Agents may supervise manufacture or sell the asset under a separate agency; consultants may be hired.",
      academic: [
        "10.11.7: Istisna‘a is not confined to the manufacturer’s own work; if the contract is silent or allows, the seller may get it made by others — Parallel Istisna‘a. The bank contracts with the customer and separately with a contractor for the subject; the parallel delivery date must not precede the original; the bank is buyer in one and seller in the other; ownership risks of each contract stay with the respective parties until transfer; the two are independent, not tied; Parallel Istisna‘a only with a third party (AAOIFI 7/1, 7/3). The bank may buy items to specification paying cash to give the manufacturer liquidity, then sell items to another party by Parallel Istisna‘a. 10.11.8: the bank may appoint an agent, with the other party’s consent, to supervise manufacture or sell the asset — including the client/manufacturer — under a separate agreement; if the purchaser delays taking delivery, the seller may sell the asset and pay the excess over dues to the purchaser; consultants may supervise conformity, with expenses agreed."
      ],
      exam: "Parallel Istisna‘a: bank = seller to customer, buyer from contractor; delivery date not earlier than original; independent; separate risks; third party only. Agency (separate) for supervision or sale; consultants.",
      keyPoints: [
        "Parallel only with a third party.",
        "Risks of each contract stay separate.",
        "The parallel contract’s delivery date must not precede the original contract’s.",
        "The bank may pay a manufacturer in cash upfront to give liquidity, then sell similar items to another party by Parallel Istisna."
      ],
      subsections: [
        { number: "10.11.7", title: "Parallel Contract — Subcontracting", page: 267, points: ["Independent contracts", "Delivery date rule", "Third party only"] },
        { number: "10.11.8", title: "Istisna‘a and Agency Contract", page: 268, points: ["Supervision or sale agency", "Delay in taking delivery"] }
      ],
      steps: [
        "Bank signs Istisna‘a with customer (bank = seller) at price P1, deferred",
        "Bank signs separate Parallel Istisna‘a with contractor (bank = buyer) at price P2 < P1",
        "Contractor builds; bank may appoint supervisor/consultant",
        "Contractor delivers to bank (not earlier than needed)",
        "Bank delivers to customer; customer pays P1 per schedule"
      ],
      related: ["t10.11.10", "t4.2.7"],
      quickCheck: { q: "In Parallel Istisna‘a, the delivery date in the parallel contract with the contractor must:", options: ["Precede the original contract’s date", "Not precede the original Istisna‘a date (per the chapter)", "Be the same as signing", "Be unspecified"], answer: 1, explanation: "p. 267." }
    },
    {
      id: "t10.11.9", section: "10.11.9", title: "Istisna‘a — Post-Execution Scenario", pages: [268, 269], tier: "supporting",
      concepts: ["istisna"],
      intuition: "During construction and at delivery, who owns what, and who bears which risk?",
      simple: "Before work, either may rescind; after, only by consent. The buyer does not own materials held by the manufacturer. Cost savings or subcontractor discounts belong to the bank-seller (as do overruns). The bank may replace a contractor on a started project (assessment costs on customer). The bank-seller bears ownership, maintenance, Takaful and damage risk before delivery and cannot disclaim defect liability. Risk passes on delivery (physical or constructive). Early conforming delivery should be accepted; non-conforming may be rejected or accepted as satisfactory performance.",
      academic: [
        "Work in progress: rescission before work starts; binding after, changes by consent. The purchaser pays per schedule; the manufacturer supplies per specifications; non-conforming subject may be accepted or refused. The purchaser does not own materials in the manufacturer’s possession. If actual cost is less than forecast or a subcontractor discount is obtained, the bank-seller need not pass it on — extra profit or loss is the bank’s, and vice versa (AAOIFI 3/2/6). The bank (as purchaser) may replace an existing contractor at the customer’s request, the assessment cost and liabilities to date remaining the customer’s. As manufacturer, the bank bears ownership risk, maintenance, Takaful, theft and abnormal damage before delivery and cannot stipulate non-liability for defects; the orderer may take collateral for amounts paid and delivery. A voluntary prepayment rebate is permissible if not agreed. Delivery: before delivery, loss to raw materials or work-in-progress is the seller’s; after, the purchaser’s; possession physical or constructive with a clear demarcation of handover; early conforming delivery should be accepted unless genuine justification; non-conforming may be rejected or accepted in its condition (acceptance = satisfactory performance) (AAOIFI 6/1–6/4)."
      ],
      exam: "WIP: buyer doesn’t own materials; bank-seller keeps cost savings/bears overruns; bears ownership/maintenance/Takaful risks pre-delivery; cannot disclaim defects. Risk passes on delivery. Early conforming delivery accepted.",
      keyPoints: [
        "Manufacturer cannot disclaim defect liability.",
        "Cost savings not owed to purchaser.",
        "A manufacturer cannot stipulate that it is not liable for defects."
      ],
      related: ["t10.11.11"],
      quickCheck: { q: "A bank (as Istisna‘a seller) gets a discount from its subcontractor. Must it pass the saving to the purchaser?", options: ["Yes, always", "No — additional profit (or loss) pertains to the bank", "Only half", "Only if the purchaser asks"], answer: 1, explanation: "p. 268." },
      examples: [
        { title: "Cost savings belong to the bank", kind: "textbook", text: "If the bank’s actual cost or subcontract price is lower than forecast, it need not pass a discount to the purchaser — gains and losses on cost are the bank’s (p. 268)." }
      ]
    },
    {
      id: "t10.11.10", section: "10.11.10", title: "The Potential of Istisna‘a and Case Studies (Boxes 10.13–10.16)", pages: [269, 278], tier: "core",
      concepts: ["istisna", "parallel-istisna", "diminishing-musharakah"],
      intuition: "Where can Istisna‘a be used — homes, exports, buildings, roads?",
      simple: "Istisna‘a suits high-technology goods (aircraft, ships), buildings, dams, highways, housing, export finance and working capital where orders come in advance. Cases: housing via Istisna‘a + Diminishing Musharakah (Rs.7m apartment; client Rs.2m, bank Rs.5m over ten years); preshipment export of garments (Rs.100m Istisna‘a, Rs.110m L/C — not if L/C already opened); Parallel Istisna‘a for 100 flats (Rs.120m to builder, Rs.100m to contractor); government road (Rs.1200m over ten years vs Rs.1000m contractor; tolls assigned).",
      academic: [
        "Potential: aircraft, ships, buildings, dams, highways; housing and export finance; working capital where orders are received in advance; construction (apartments, hospitals, schools, universities); residential/commercial development; aircraft, locomotive and shipbuilding industries.",
        "Box 10.13 Housing: builder C sells apartments at Rs.7m cash; client A has Rs.2m and needs Rs.5m for ten years; A and bank B form a Musharakah (Shirkatul-milk) pool of Rs.7m and jointly contract Istisna‘a with C, paying in four instalments; B appoints A to supervise; on handover B leases its share to A; A buys one unit monthly, rent decreasing; after ten years ownership transfers (Diminishing Musharakah).",
        "Box 10.14 Preshipment export: client A has a Rs.110m garment export order; B signs Istisna‘a for garments at Rs.100m within three months and appoints A its export agent; the importer’s L/C of Rs.110m is in B’s name (or A’s under agency); if an L/C has already been opened, Istisna‘a is not possible (avoid ‘Inah); on completion B takes delivery and bears risk; A exports as B’s agent; B receives Rs.110m.",
        "Box 10.15 Building project: builder A contracts Istisna‘a with B for 100 flats in 12 months for Rs.120m; A books flats with downpayments; B signs Parallel Istisna‘a with contractor C for Rs.100m in four instalments; A supervises as agent; C delivers to B, which hands over to A; A sells flats in instalments and assigns receivables to B; allottees pay rent and buy units. Box 10.16 Government road: government G contracts Istisna‘a with B for a road by December 2007 for Rs.1200m over ten years; B signs Parallel Istisna‘a with C for Rs.1000m in four instalments; tolls are assigned to the bank, with G paying any shortfall as rental."
      ],
      exam: "Potential: infrastructure, housing, high-tech manufacturing, exports, working capital. Cases: housing (Istisna‘a + DM), export (Istisna‘a + agency; not after L/C opened), Parallel Istisna‘a for flats (Rs.120m vs 100m), government road with tolls assigned.",
      keyPoints: [
        "Export Istisna‘a impossible if L/C already opened (avoid ‘Inah).",
        "Bank margin in Parallel Istisna‘a = difference between the two contract prices."
      ],
      examples: [
        { title: "Box 10.13 — Housing via Istisna‘a and DM", kind: "textbook", text: "Rs.7m apartment: client contributes Rs.2m, bank Rs.5m; they jointly order the apartment by Istisna‘a; bank leases its share and the client buys units monthly over ten years." },
        { title: "Box 10.16 — Government road", kind: "textbook", text: "Bank sells a road to the government by Istisna‘a for Rs.1200m payable over ten years and buys it from a contractor by Parallel Istisna‘a for Rs.1000m in four instalments; toll receipts are assigned to the bank." },
        { title: "Box 10.13 — apartment by Istisna plus DM", kind: "textbook", text: "Client (Rs.2m) and bank (Rs.5m) form a Shirkatul-milk and jointly order a Rs.7m apartment by Istisna; after handover the bank leases its share and the client buys units monthly over ten years (pp. 274–275)." }
      ],
      calc: { type: "parallel-istisna", note: "Reproduces Box 10.15/10.16 margins: customer price vs contractor price and payment schedules (practice variants labelled)." },
      related: ["t12.9", "t14.4.3", "t10.11.7"],
      quickCheck: { q: "In Box 10.14, why is Istisna‘a not possible if the importer has already opened an L/C in the exporter’s favour?", options: ["L/Cs are prohibited", "To avoid Bai‘ al ‘Inah", "Because Istisna‘a needs prepayment", "Because garments are natural products"], answer: 1, explanation: "p. 276." }
    },
    {
      id: "t10.11.11", section: "10.11.11", title: "Risk Management in Istisna‘a and Comparisons (Boxes 10.9–10.12)", pages: [269, 274], tier: "core",
      concepts: ["istisna", "salam", "ijarah", "risk-management"],
      intuition: "What risks does an Istisna‘a bank carry — and how exactly does Istisna‘a differ from Salam and from Ujrah/Ijarah?",
      simple: "Risks: settlement, price, delivery, possession, market. Mitigation: collateral, performance bonds, technical expertise, Takaful, good clients, capital budgeting. Box 10.9: bank doesn’t own materials (security); subcontractor delay (Shart-e-Jazai); no sale before possession (promise, agency); quality (supplier guarantee). Box 10.10: Istisna‘a vs Salam (manufactured vs any; no full prepayment vs full; Qimi mainly vs Mithli; penalty to buyer vs charity; nonbinding until work starts vs binding) and vs Ujrah (own vs buyer’s material; manufactured items vs non-consumable assets; risk to buyer after delivery vs lessor keeps risk).",
      academic: [
        "Risks: settlement, price, delivery, possession, market; mitigated by collateral, performance bonds, technical expertise for marketing and cost-effectiveness, Takaful, client selection and capital budgeting/liquidity policies. Box 10.9: ownership of material — the bank does not own materials held by the manufacturer, no claim on non-performance → security; delivery risk from subcontractor delay → Shart-e-Jazai price reduction clause; sale not permissible before physical possession → promise to purchase, agency; quality risk → quality guarantee from the supplier.",
        "Box 10.10 Istisna‘a vs Salam: (1) always needs manufacturing vs natural or manufactured; (2) price need not be fully prepaid vs full advance; (3) mainly Qimi goods (also trademarked uniform items) vs Mithli goods obtainable from the market; (4) late-delivery price reduction is the purchaser’s income (Shart-e-Jazai) vs penalty to charity; (5) nonbinding until work starts vs binding once executed. Istisna‘a vs Ijarah (Ujrah): manufacturer’s own materials at fixed price vs buyer’s materials for wages; anything needing manufacture vs assets whose corpus is not consumed; asset risk to purchaser after delivery (pays regardless) vs risk with lessor and rent only if usable.",
        "Box 10.11 accounting (bank as seller, AAOIFI): costs to Istisna‘a WIP (or cost account for parallel); billings to receivables and billing account offset against WIP; pre-contract costs deferred; revenue by percentage-of-completion or completed-contract method; deferred profit by proportionate allocation (preferred) or on receipt; early settlement discounts deducted; parallel profit by percentage of completion; change orders and claims; maintenance/warranty accruals; expected losses recognised. Box 10.12 (bank as buyer): progress billings as assets; conforming commodity at historical cost; late delivery compensated from performance bond; non-conforming — receivables or lower of cost and cash equivalent."
      ],
      exam: "Istisna‘a risks + Box 10.9 mitigations. Box 10.10: vs Salam (manufactured; deferred payment OK; Qimi; Shart-e-Jazai to buyer; revocable until work starts) and vs Ujrah (own material; manufactured items; risk passes on delivery). Accounting: % completion or completed contract.",
      keyPoints: ["Bank has no claim on manufacturer’s materials.", "Percentage-of-completion revenue recognition."],
      table: { caption: "Risks in Istisna and mitigation (Box 10.9)", head: ["Risk", "Mitigation"], rows: [["Bank does not own the maker’s materials", "Security from the manufacturer"], ["Subcontractor delay", "Shart-e-Jazai price reduction clause"], ["No sale before delivery", "Promise to purchase from a third party; agency for sale"], ["Inferior quality", "Quality guarantee from the supplier"]] },
      related: ["t10.10.1", "t11.2.1", "t4.2.9"],
      quickCheck: { q: "According to Box 10.10, which statement is TRUE?", options: ["Salam is revocable until work starts", "Istisna‘a is nonbinding until work starts; Salam is binding once executed", "Both require full prepayment", "Istisna‘a is only for Mithli goods"], answer: 1, explanation: "p. 270." }
    }
  ],
  summary: "Salam and Istisna‘a are the permitted forward sales — exceptions to the rule that goods sold must exist and be owned and possessed, made free of Gharar by conditions. In Salam the full price is paid at contract for fungible, precisely specified goods normally available at a fixed delivery time and place; it cannot be in currencies, specific items or debts; it is binding; late-delivery penalties go to charity; goods may be disposed of through independent Parallel Salam, a third-party promise or agency (never back to the seller). Banks under-use Salam but it suits agriculture, SMEs, exports and working capital, with defined risk mitigation. Istisna‘a is an order to manufacture or construct, with material supplied by the manufacturer, price payable in instalments, binding once work starts, allowing a price reduction for late delivery (Shart-e-Jazai), and usable through Parallel Istisna‘a for housing, exports, buildings and infrastructure. (Chapter synthesis — the book has no separate summary section; Section 10.9 summarises Salam rules.)",
  takeaways: [
    "Salam: full prepayment; fungible, specified, available goods; fixed time/place.",
    "No Salam in currency, specific items, land or subjectively valued items.",
    "Salam binding; rescission only by consent at the exact price.",
    "Salam goods disposed via Parallel Salam, promise or agency — never to the seller.",
    "Late delivery: Salam penalty to charity; Istisna‘a price reduction to buyer.",
    "Istisna‘a: manufactured items; instalments allowed; binding once work starts.",
    "Parallel Istisna‘a: independent, third party, delivery date not earlier.",
    "Know Box 10.2 (Salam vs Murabaha) and Box 10.10 (Istisna‘a vs Salam vs Ujrah)."
  ],
  checklist: [
    "Can you state the Hadith basis and conditions of Salam?",
    "Can you explain why Salam in currencies is invalid?",
    "Can you explain the rules on Salam capital?",
    "Can you list disposal options and the Parallel Salam rules?",
    "Can you handle failure and inferior supply scenarios?",
    "Can you list Salam risks and Box 10.3 mitigations?",
    "Can you explain Istisna‘a’s price, penalty and binding rules?",
    "Can you reproduce Box 10.10 and walk through Boxes 10.13–10.16?"
  ],
  flashcards: [
    { id: "f10.1", cat: "Financing modes", front: "Bai‘ Salam", back: "Forward sale: full price paid at contract for specified fungible goods to be delivered at a fixed future time and place.", topic: "t10.2" },
    { id: "f10.2", cat: "Contract rules", front: "Hadith conditions for Salam", back: "Known quality, specified measure and weight, along with the price and time of delivery.", topic: "t10.2" },
    { id: "f10.3", cat: "Contract rules", front: "What cannot be the subject of Salam?", back: "Money/currencies, gold, silver; identical exchange (wheat for wheat); specific items (‘this car’, ‘this field’); land, buildings, trees; subjectively valued items (gems, antiques).", topic: "t10.4.1" },
    { id: "f10.4", cat: "Prohibitions", front: "Why is Salam in currencies invalid?", back: "Currency exchange requires simultaneous payment of both sides (Sarf), while Salam defers delivery; allowing it would open a floodgate of Riba.", topic: "t10.4.1" },
    { id: "f10.5", cat: "Contract rules", front: "Salam capital (price) rules", back: "Money (or goods/usufruct); paid in full at contract (≤2–3 days stipulated delay allowed); cannot be an existing debt; account credit acceptable.", topic: "t10.4.2" },
    { id: "f10.6", cat: "Contract rules", front: "Options in Salam", back: "No Khiyar al-Shart or Khiyar al-Ro’yat; after delivery, options of defect and specified quality (refund of price only).", topic: "t10.4.4" },
    { id: "f10.7", cat: "Contract rules", front: "Substituting Salam goods after the due date", back: "By mutual consent; different genus; fungible; market value not above the original; not stipulated in the contract.", topic: "t10.4.4" },
    { id: "f10.8", cat: "Financing modes", front: "Parallel Salam rules", back: "Independent of the original; same specs allowed; delivery date not earlier than original; never with the original seller or entities he owns.", topic: "t10.6" },
    { id: "f10.9", cat: "Comparisons", front: "Promise vs Parallel Salam for disposing Salam goods", back: "A third-party promise (with HJ) does not require the buyer to prepay; Parallel Salam requires full prepayment by the new buyer.", topic: "t10.6" },
    { id: "f10.10", cat: "Risk", front: "Seven risks in bank Salam", back: "Counterparty, commodity price, delivery/settlement, quality, asset holding, asset replacement, fiduciary (Parallel Salam).", topic: "t10.10.1" },
    { id: "f10.11", cat: "Comparisons", front: "Salam vs Murabaha (Box 10.2)", back: "Salam: deferred delivery, full prepayment, by specification. Murabaha: spot delivery, spot/deferred price, particular commodity.", topic: "t10.10" },
    { id: "f10.12", cat: "Financing modes", front: "Istisna‘a", back: "Order to manufacture/construct an item to specification for future delivery at an agreed price; manufacturer provides material and labour; legalised by Istihsan.", topic: "t10.11" },
    { id: "f10.13", cat: "Contract rules", front: "Istisna‘a price payment", back: "Need not be prepaid; instalments linked to stages allowed; can be cash, goods or usufruct (BOT); cannot be cost-plus Murabaha pricing.", topic: "t10.11.3" },
    { id: "f10.14", cat: "Arabic terminology", front: "Shart-e-Jazai in Istisna‘a", back: "Clause reducing the price for late delivery (not force majeure); the reduction benefits the purchaser — by analogy with the tailor’s wage in Ijarah.", topic: "t10.11.4" },
    { id: "f10.15", cat: "Contract rules", front: "When is Istisna‘a binding?", back: "Nonbinding until the manufacturer starts work; binding thereafter (OIC, majority).", topic: "t10.11.5" },
    { id: "f10.16", cat: "Comparisons", front: "Istisna‘a vs Salam (Box 10.10)", back: "Manufactured vs any goods; no full prepayment vs full; Qimi vs Mithli; price cut to buyer vs penalty to charity; revocable until work vs binding.", topic: "t10.11.11" },
    { id: "f10.17", cat: "Comparisons", front: "Istisna‘a vs Ujrah", back: "Istisna‘a: own materials, fixed price, risk passes on delivery. Ujrah: buyer’s materials, wages; (Ijarah) risk stays with owner.", topic: "t10.11.11" },
    { id: "f10.18", cat: "Capital markets", front: "Salam Sukuk (Bahrain example)", back: "Government sells aluminium forward; Bahrain Islamic Bank buys for participating banks; certificates issued; actual delivery binding.", topic: "t10.8" },
    { id: "f10.19", cat: "Definitions", front: "Salam vs Bai‘ Mu’ajjal", back: "Salam: price now, goods later. Mu’ajjal: goods now, price later.", topic: "t10.2" },
    { id: "f10.20", cat: "Financing modes", front: "Economic role of Salam (Hasanuz Zaman)", back: "Large advances to farmers for consumption and fixed investment; buyers were traders; direct grower–trader link; stabilises prices.", topic: "t10.3" },
    { id: "f10.21", cat: "Contract rules", front: "Can the Salam price be an existing debt?", back: "No — using the seller’s or a third party’s debt as the price is debt for debt.", topic: "t10.4.2" },
    { id: "f10.22", cat: "Contract rules", front: "Salam barter restriction", back: "The same species cannot be advanced for deferred delivery (e.g. 10 tons of wheat seed for 25 tons of wheat); a tractor for cotton is fine.", topic: "t10.4.2" },
    { id: "f10.23", cat: "Contract rules", front: "Salam delivery rules", back: "Known date and place (place of contract if silent); instalments allowed; goods at seller’s risk until delivery.", topic: "t10.4.3" },
    { id: "f10.24", cat: "Contract rules", front: "Rescinding Salam", back: "Only by mutual consent; buyer gets back exactly the price paid.", topic: "t10.4.4" },
    { id: "f10.25", cat: "Contract rules", front: "Who may revoke a Salam backed by a surety?", back: "Only the seller; revocation releases the surety and the pledge.", topic: "t10.5" },
    { id: "f10.26", cat: "Contract rules", front: "Salam goods sold back to the seller", back: "Not allowed (buy-back) — even to a company owned by the seller; use agency or a third-party promise/Parallel Salam.", topic: "t10.6" },
    { id: "f10.27", cat: "Capital markets", front: "Negotiability of Salam certificates", back: "Not yet accepted by the majority of contemporary scholars — they represent a debt of goods.", topic: "t10.8" },
    { id: "f10.28", cat: "Financing modes", front: "Box 10.7 — agent sells Salam sugar", back: "Target price Rs.20; above that the excess can be the agent’s fee; below cost, the bank bears the loss as owner.", topic: "t10.10" },
    { id: "f10.29", cat: "Contract rules", front: "Istisna: when binding?", back: "Non-binding until the manufacturer starts work; binding thereafter (OIC Fiqh Council, majority).", topic: "t10.11.5" },
    { id: "f10.30", cat: "Contract rules", front: "Istisna on an identified asset", back: "Not allowed; an already-made asset can be supplied only if the contract specifies features, not a particular unit.", topic: "t10.11.2" },
    { id: "f10.31", cat: "Financing modes", front: "Istisna price forms", back: "Cash, goods or usufruct (BOT); may be in instalments linked to stages; not cost-plus.", topic: "t10.11.3" }
  ],
  questions: [
    { id: "q10.1", type: "mcq", q: "What distinguishes Salam from Bai‘ Mu’ajjal?", options: ["Salam involves interest", "In Salam the price is paid in advance and delivery deferred; in Mu’ajjal goods are delivered now and price deferred", "Both defer the price", "Mu’ajjal requires prepayment"], answer: 1, explanation: "p. 241.", topic: "t10.2", diff: "E", level: "understanding", obj: "Define Salam" },
    { id: "q10.2", type: "multi", q: "Which can be the subject of Salam? (Select all.)", options: ["500 tons of a defined wheat variety", "Tinned consumer goods regularly available", "‘This car’", "A particular antique", "Standardised copper"], answer: [0, 1, 4], explanation: "pp. 244–245.", topic: "t10.4.1", diff: "M", level: "application", obj: "Identify valid Salam subjects" },
    { id: "q10.3", type: "tf", q: "A bank may use Salam to buy Pakistani Rupees for US Dollars for delivery in three months.", answer: false, explanation: "Salam in currencies is invalid (p. 246).", topic: "t10.4.1", diff: "E", level: "application", obj: "Apply currency rule" },
    { id: "q10.4", type: "scenario", q: "A bank advances 10 tons of improved wheat seed to a farmer against 25 tons of wheat at harvest. According to Section 10.4.2 this is:", options: ["Valid Salam", "Not permissible — same species advanced for deferred delivery of the same species", "Istisna‘a", "Murabaha"], answer: 1, explanation: "p. 247.", topic: "t10.4.2", diff: "M", level: "application", obj: "Apply barter rules in Salam" },
    { id: "q10.5", type: "match", q: "Match each disposal method for Salam goods to its feature.", pairs: [["Parallel Salam", "New buyer prepays; contracts independent"], ["Third-party promise", "No prepayment by buyer; HJ may be taken"], ["Agency", "Separate agreement; agent sells for bank"], ["Sale to original seller", "Prohibited — buy-back"]], explanation: "Section 10.6.", topic: "t10.6", diff: "M", level: "understanding", obj: "Compare disposal options" },
    { id: "q10.6", type: "application", q: "Box 10.4: the bank paid Rs.100m for wheat and C promised to buy at Rs.115m with Rs.15m Hamish Jiddiyah. If C backs out and the bank sells the wheat for Rs.108m, what does the bank retain from the HJ?", options: ["Rs.15m", "Rs.7m (actual loss vs promised price), refunding Rs.8m", "Nothing", "Rs.8m"], answer: 1, explanation: "Actual loss relative to the promised sale = 115 − 108 = Rs.7m; excess HJ returned. (Practice variant — generated for learning; excludes opportunity cost.)", topic: "t10.10", diff: "H", level: "application", obj: "Apply promise/HJ rules to Salam" },
    { id: "q10.7", type: "identify", q: "A clause reducing the price for delay in delivery, where the reduction benefits the purchaser, is permitted in:", options: ["Salam", "Istisna‘a (Shart-e-Jazai)", "Murabaha", "Qard"], answer: 1, explanation: "p. 266.", topic: "t10.11.4", diff: "E", level: "recall", obj: "Identify Shart-e-Jazai" },
    { id: "q10.8", type: "comparison", q: "Which is a correct difference between Istisna‘a and Salam (Box 10.10)?", options: ["Istisna‘a requires full prepayment", "Istisna‘a is nonbinding until work starts, while Salam is binding once executed", "Salam is only for manufactured goods", "Both send late penalties to charity"], answer: 1, explanation: "p. 270.", topic: "t10.11.11", diff: "M", level: "analysis", obj: "Compare Istisna‘a and Salam" },
    { id: "q10.9", type: "scenario", q: "A customer supplies steel to a workshop and pays a fixed wage for fabricating gates. This contract is:", options: ["Istisna‘a", "Ujrah (hire of work)", "Salam", "Parallel Istisna‘a"], answer: 1, explanation: "p. 264.", topic: "t10.11", diff: "E", level: "application", obj: "Distinguish Istisna‘a and Ujrah" },
    { id: "q10.10", type: "order", q: "Order the steps of Box 10.16 (government road by Parallel Istisna‘a).", items: ["Government contracts Istisna‘a with bank for Rs.1200m over ten years", "Bank signs Parallel Istisna‘a with contractor for Rs.1000m", "Contractor hands over the road to the bank", "Tolls are assigned to the bank; government pays any shortfall"], explanation: "p. 277.", topic: "t10.11.10", diff: "M", level: "understanding", obj: "Sequence Parallel Istisna‘a" },
    { id: "q10.11", type: "tf", q: "In Istisna‘a, a penalty may be imposed on the purchaser for late payment of instalments, with the amount kept by the bank.", answer: false, explanation: "A penalty against the purchaser for payment default would be Riba (p. 266).", topic: "t10.11.4", diff: "M", level: "understanding", obj: "Apply penalty rules" },
    { id: "q10.12", type: "short", q: "Why does the author consider the permissive view on reselling Salam goods before delivery logical, and what caution does he add?", answer: "The Hadith used to prohibit it is weak; there is no genuine text prohibiting it; price risk passes to the buyer once the contract is executed; and it supports Parallel Salam and Salam Sukuk. However, to be safe, actual or constructive delivery should not be made before possession, and negotiable Salam certificates are not yet accepted by most scholars.", keywords: ["weak", "price risk", "Parallel Salam", "possession"], explanation: "Section 10.6.", topic: "t10.6", diff: "H", level: "analysis", obj: "Evaluate views on Salam resale" },
    { id: "q10.13", type: "mcq", q: "Why do Islamic banks generally under-use Salam according to Section 10.10?", options: ["It is prohibited", "It offers no practical advantage over Murabaha: full upfront payment, taking delivery and marketing goods, and default risks", "It has no Hadith basis", "It is only for governments"], answer: 1, explanation: "p. 257.", topic: "t10.10", diff: "E", level: "understanding", obj: "Explain banks’ use of Salam" },
    { id: "q10.14", type: "identify", q: "Which jurists mainly used the term Salaf, and which used Salam?", options: ["Iraqi used Salaf, Hijaz used Salam", "Hijaz jurists used Salaf; Baghdad (Iraq) jurists used Salam", "Both used only Salam", "Neither"], answer: 1, explanation: "p. 241.", topic: "t10.2", diff: "H", level: "recall", obj: "Recall terminology" },
    { id: "q10.15", type: "mcq", q: "What did the Prophet (pbuh) require when he regulated the Madinan practice of advance payment for fruit?", options: ["Ban it entirely", "Known quality, specified measure and weight, price and time of delivery", "Only a written contract", "Delivery within one month"], answer: 1, explanation: "p. 242.", topic: "t10.2", diff: "E", level: "recall", obj: "Recall the Hadith on Salam" },
    { id: "q10.16", type: "multi", q: "Which benefits of Salam does the author identify? (Select all.)", options: ["Seller gets advance funds", "Buyer usually gets a lower price and a hedge", "It can stabilise prices during seasonal gluts", "It guarantees the buyer a fixed cash return", "Lower transaction costs than a swap"], answer: [0, 1, 2, 4], explanation: "pp. 242–243.", topic: "t10.3", diff: "M", level: "understanding", obj: "Explain the economic role of Salam" },
    { id: "q10.17", type: "scenario", q: "A buyer wants a Salam contract for “the wheat of Farmer Ali’s north field”. Is this valid?", options: ["Yes", "No — Salam cannot be tied to a particular field whose produce may fail", "Yes, if prepaid", "Only in Syria"], answer: 1, explanation: "p. 244.", topic: "t10.4.1", diff: "M", level: "application", obj: "Apply subject-matter rules" },
    { id: "q10.18", type: "tf", q: "Precious gems and antiques are suitable subjects of Salam because they have high value.", answer: false, explanation: "Their value depends on subjective assessment (p. 244).", topic: "t10.4.1", diff: "E", level: "understanding", obj: "Identify unsuitable Salam goods" },
    { id: "q10.19", type: "comparison", q: "Why did classical Fulus (copper coins) differ from modern paper currency for Salam purposes?", options: ["Fulus had no value", "Fulus had intrinsic metal value and were sub-money; paper money is pure Thaman and subject to gold/silver rules (SAB)", "Paper money is a commodity", "There is no difference"], answer: 1, explanation: "pp. 245–246.", topic: "t10.4.1", diff: "H", level: "analysis", obj: "Contrast Fulus and paper money" },
    { id: "q10.20", type: "identify", q: "How long a delay in paying the Salam price did Imam Malik allow?", options: ["None", "Up to three days", "One month", "Until delivery"], answer: 1, explanation: "p. 247.", topic: "t10.4.2", diff: "M", level: "recall", obj: "Recall views on price payment" },
    { id: "q10.21", type: "application", q: "A bank credits the Salam price to the seller’s current account instead of paying cash. Is this acceptable?", options: ["No, it is debt for debt", "Yes — the money is at the seller’s disposal; in spirit it is not prohibited debt for debt", "Only for small amounts", "Only with a guarantee"], answer: 1, explanation: "p. 247.", topic: "t10.4.2", diff: "M", level: "application", obj: "Apply payment-mode rules" },
    { id: "q10.22", type: "tf", q: "If no place of delivery is stipulated in a Salam, the place where the contract was executed is the place of delivery.", answer: true, explanation: "p. 248.", topic: "t10.4.3", diff: "E", level: "recall", obj: "Recall delivery rules" },
    { id: "q10.23", type: "multi", q: "Which options does the Salam buyer have? (Select all.)", options: ["Option of defect after delivery", "Option of specified quality", "Option of stipulation (Khiyar al-Shart)", "Option of seeing (Khiyar al-Ro’yat)"], answer: [0, 1], explanation: "p. 248.", topic: "t10.4.4", diff: "M", level: "recall", obj: "Recall options in Salam" },
    { id: "q10.24", type: "scenario", q: "At delivery the market price of the Salam goods has risen sharply. The seller wants to cancel. Can he?", options: ["Yes, unilaterally", "No — Salam is binding; it may be rescinded only with mutual consent, returning exactly the price paid", "Yes, by paying the market difference", "Only if the bank profits"], answer: 1, explanation: "pp. 248–249.", topic: "t10.4.4", diff: "M", level: "application", obj: "Apply the binding nature of Salam" },
    { id: "q10.25", type: "mcq", q: "According to AAOIFI’s Salam Standard, a late-delivery penalty in Salam:", options: ["Is the bank’s income", "May not be stipulated as the bank’s income; a self-imposed charity undertaking is possible", "Must equal the market loss", "Is always forbidden in any form"], answer: 1, explanation: "p. 249.", topic: "t10.4.4", diff: "M", level: "recall", obj: "Recall penalty rules in Salam" },
    { id: "q10.26", type: "tf", q: "A surety for a Salam seller may revoke the Salam contract on his own.", answer: false, explanation: "Only the seller may revoke (p. 250).", topic: "t10.5", diff: "M", level: "recall", obj: "Recall surety rules" },
    { id: "q10.27", type: "comparison", q: "What is the advantage of a promise to purchase over Parallel Salam for disposing of Salam goods?", options: ["It is cheaper to document", "The promisor need not prepay the price", "It transfers risk earlier", "There is no difference"], answer: 1, explanation: "p. 252.", topic: "t10.6", diff: "M", level: "analysis", obj: "Compare disposal options" },
    { id: "q10.28", type: "identify", q: "Which scholars held that Salam goods may be resold before possession (to the seller at the same or lower price only)?", options: ["Ibn Taymiyah and Ibn al-Qayyim", "Ibn Abideen and Kasani", "Shafi‘i and Hanafi majority", "Ibn Hazm"], answer: 0, explanation: "Also Ibn Abbas, Imam Ahmad and Malikis, except foodstuff (p. 250).", topic: "t10.6", diff: "H", level: "recall", obj: "Recall views on resale of Salam goods" },
    { id: "q10.29", type: "order", q: "Order the steps in Box 10.4 (wheat Salam with a promise).", items: ["Farmer contracts to sell 5,000 tons for Rs.100m", "Bank pays Rs.100m on the spot", "C promises to buy at Rs.115m with Rs.15m Hamish Jiddiyah", "Farmer delivers on 1 May", "C executes the purchase and takes delivery"], explanation: "p. 260.", topic: "t10.10", diff: "M", level: "recall", obj: "Sequence a Salam case" },
    { id: "q10.30", type: "multi", q: "What options does a Salam buyer have if the seller fails to deliver? (Select all.)", options: ["Wait until the goods are available", "Cancel and recover the price paid", "Agree a replacement subject to the rules", "Claim the price plus market gain in cash"], answer: [0, 1, 2], explanation: "p. 253.", topic: "t10.7", diff: "M", level: "recall", obj: "Recall remedies on non-delivery" },
    { id: "q10.31", type: "application", q: "The seller can deliver only 60% of the Salam wheat. What may the bank do for the remaining 40%?", options: ["Charge interest on it", "Accept the 60% and revise the order, recover the proportionate price, or use the other remedies", "Reject the whole contract and claim damages above the price", "Nothing"], answer: 1, explanation: "pp. 253–254.", topic: "t10.7", diff: "M", level: "application", obj: "Apply partial-delivery rules" },
    { id: "q10.32", type: "identify", q: "Which country issued Salam Sukuk based on aluminium, with Bahrain Islamic Bank representing participants?", options: ["Malaysia", "Bahrain", "Pakistan", "Sudan"], answer: 1, explanation: "p. 255.", topic: "t10.8", diff: "E", level: "recall", obj: "Recall Salam Sukuk practice" },
    { id: "q10.33", type: "tf", q: "A Salam contract may be settled in cash instead of goods if both parties prefer, without rescission.", answer: false, explanation: "Salam involves no cash settlement; physical delivery is a must, and on rescission only the price is refunded (p. 255).", topic: "t10.9", diff: "M", level: "understanding", obj: "Recall settlement rules" },
    { id: "q10.34", type: "comparison", q: "According to Box 10.2, which is a difference between Salam and Murabaha?", options: ["Both require prepayment", "Salam goods are specified by description and delivered later; Murabaha is executed on particular existing goods delivered on the spot", "Murabaha cannot be deferred", "Salam is used for currencies"], answer: 1, explanation: "p. 257.", topic: "t10.10", diff: "M", level: "understanding", obj: "Contrast Salam and Murabaha" },
    { id: "q10.35", type: "scenario", q: "In Box 10.7, sugar bought by Salam at Rs.19/kg is sold by the mill as agent at Rs.18/kg despite its efforts. Who bears the loss?", options: ["The mill", "The bank, as owner of the sugar", "Shared equally", "The buyer"], answer: 1, explanation: "p. 261.", topic: "t10.10", diff: "M", level: "application", obj: "Apply risk in Salam agency" },
    { id: "q10.36", type: "multi", q: "Which risks does the bank face in Salam, per Section 10.10.1? (Select all.)", options: ["Counterparty risk", "Commodity price risk", "Asset-holding risk", "Interest-rate risk on the price"], answer: [0, 1, 2], explanation: "p. 258.", topic: "t10.10.1", diff: "E", level: "recall", obj: "Recall Salam risks" },
    { id: "q10.37", type: "identify", q: "On what juristic basis was Istisna legalised as a financing mode?", options: ["Darurah", "Istihsan", "Qiyas on Murabaha", "‘Urf only"], answer: 1, explanation: "p. 263.", topic: "t10.11", diff: "M", level: "recall", obj: "Recall the basis of Istisna" },
    { id: "q10.38", type: "tf", q: "Istisna is valid for natural products such as corn or fruit.", answer: false, explanation: "Only for manufactured or constructed items (p. 264).", topic: "t10.11.2", diff: "E", level: "recall", obj: "Recall Istisna subject matter" },
    { id: "q10.39", type: "application", q: "A government offers a builder the right to collect tolls on a new road for 15 years as the price of construction. Which contract feature does this illustrate?", options: ["Salam capital in goods", "Istisna price in the form of usufruct (BOT)", "Hawalah", "Murabaha rebate"], answer: 1, explanation: "p. 265.", topic: "t10.11.3", diff: "M", level: "application", obj: "Apply usufruct as Istisna price" },
    { id: "q10.40", type: "mcq", q: "Why can Istisna not be priced on a cost-plus Murabaha basis?", options: ["Cost-plus is Riba", "Murabaha requires an existing, owned asset with known cost, which Istisna lacks", "Istisna has no profit", "AAOIFI bans all mark-ups"], answer: 1, explanation: "p. 265.", topic: "t10.11.3", diff: "M", level: "understanding", obj: "Explain Istisna pricing" },
    { id: "q10.41", type: "identify", q: "By analogy with which classical rule did scholars allow Shart-e-Jazai in Istisna?", options: ["A tailor’s wage of 12 dirhams in two days and 10 in a week", "The six commodities Hadith", "The boat parable", "Umar’s market ruling"], answer: 0, explanation: "p. 266.", topic: "t10.11.4", diff: "H", level: "recall", obj: "Recall the basis of Shart-e-Jazai" },
    { id: "q10.42", type: "scenario", q: "An Istisna contract is signed but the manufacturer has not yet begun work. The buyer wants to cancel. Can he?", options: ["No, never", "Yes — before work starts either party may cancel by notice", "Only with a penalty", "Only if the price falls"], answer: 1, explanation: "p. 266.", topic: "t10.11.5", diff: "E", level: "application", obj: "Apply the binding point of Istisna" },
    { id: "q10.44", type: "application", q: "The bank’s subcontractor gives it a 5% discount in Parallel Istisna. Must the bank pass it on to the purchaser?", options: ["Yes", "No — cost savings and losses belong to the bank", "Half of it", "Only if requested"], answer: 1, explanation: "p. 268.", topic: "t10.11.9", diff: "M", level: "application", obj: "Apply cost rules in Istisna" },
    { id: "q10.45", type: "match", q: "Match each feature to Istisna or Ujrah (Box 10.10).", pairs: [["Manufacturer uses his own materials", "Istisna"], ["Buyer supplies the materials; maker paid a wage", "Ujrah"], ["Risk passes to the buyer on delivery", "Istisna"], ["Only non-consumable assets", "Ijarah"]], explanation: "p. 271.", topic: "t10.11.11", diff: "M", level: "understanding", obj: "Distinguish Istisna and Ujrah" },
    { id: "q10.46", type: "order", q: "Order the steps of Box 10.14 (Istisna pre-shipment export finance).", items: ["Client receives an export order", "Bank signs Istisna for the garments at Rs.100m", "Bank appoints client as export agent", "Bank takes delivery; garments at bank’s risk", "Client exports as agent; bank receives Rs.110m under the L/C"], explanation: "pp. 275–276.", topic: "t10.11.10", diff: "M", level: "recall", obj: "Sequence an Istisna export case" },
    { id: "q10.47", type: "tf", q: "In Parallel Istisna, the bank’s contract with the customer and its contract with the subcontractor may be made conditional on each other.", answer: false, explanation: "Each contract is independent; rights and obligations of one cannot depend on the other, and Parallel Istisna is allowed only with a third party (p. 267).", topic: "t10.11.7", diff: "M", level: "understanding", obj: "Apply the independence rule in Parallel Istisna" }
  ],
  exam: [
    { id: "e10.1", kind: "long", q: "Explain the conditions of a valid Salam contract and discuss how Islamic banks can use Salam for agricultural and export finance while managing its risks.", structure: ["Definition and Hadith basis", "Subject matter conditions (incl. currencies)", "Price (Salam capital)", "Delivery, options, revocation, penalty", "Disposal: Parallel Salam, promise, agency", "Applications: Box 10.4, 10.5, 10.7", "Risks and Box 10.3 mitigations"], keyConcepts: ["Mithli", "prepayment", "Parallel Salam", "Hamish Jiddiyah"], points: ["No sale back to seller", "Penalty to charity"], mistakes: ["Allowing currency Salam", "Allowing debt set-off as price"], topic: "t10.4.1" },
    { id: "e10.2", kind: "difference", q: "Differentiate between Salam, Istisna‘a and Ujrah.", structure: ["Subject", "Payment", "Nature of goods", "Penalty treatment", "Binding nature", "Material and risk"], keyConcepts: ["Shart-e-Jazai", "Istihsan"], points: ["Box 10.10"], mistakes: ["Requiring Istisna‘a prepayment"], topic: "t10.11.11" },
    { id: "e10.3", kind: "scenario", q: "A government wants a highway built and paid over ten years. Design an Istisna‘a-based structure for an Islamic bank and identify the Shari’ah conditions.", structure: ["Istisna‘a with government", "Parallel Istisna‘a with contractor", "Independence and delivery dates", "Supervision agency", "Payments/tolls assignment", "Risks and mitigations"], keyConcepts: ["Parallel Istisna‘a", "BOT"], points: ["Bank bears risk until delivery", "Shart-e-Jazai with contractor"], mistakes: ["Tying the two contracts together"], topic: "t10.11.10" },
    { id: "e10.4", kind: "short", q: "What options does a Salam buyer have if the seller fails to deliver or supplies inferior goods?", structure: ["Failure: wait, cancel/refund, replacement", "Using pledge to buy goods", "Inferior goods: refuse, discount, substitute, partial", "Substitution conditions"], keyConcepts: ["refund of exact price"], points: ["Different genus, value ≤ original"], mistakes: ["Claiming more than the advance in cash"], topic: "t10.7" },
    { id: "e10.5", kind: "viva", q: "Why can’t a late-delivery penalty in Salam be the bank’s income, while in Istisna‘a a price reduction can benefit the buyer?", structure: ["Salam advance = debt", "Istisna‘a depends on manufacturer’s effort"], keyConcepts: ["Shart-e-Jazai"], points: ["Tailor analogy"], mistakes: ["Treating both the same"], topic: "t10.11.4" },
    { id: "e10.6", kind: "long", q: "Explain how an Islamic bank can use Salam for agricultural and export finance and how it disposes of the goods. Illustrate with a case.", structure: ["Salam conditions recap", "Disposal options: Parallel Salam, promise, agency, own sale", "Prohibition of selling back to the seller", "Box 10.4 or 10.5 walk-through", "Risks and Box 10.3 mitigations", "Post-execution scenarios"], keyConcepts: ["Parallel Salam", "Hamish Jiddiyah", "agency", "counterparty risk", "buy-back"], points: ["Price paid in full upfront", "Contracts independent", "Bank bears risk after delivery"], mistakes: ["Selling to the Salam seller", "Linking Parallel Salam to the first contract", "Cash settlement instead of delivery"], topic: "t10.6" }
  ]
});
