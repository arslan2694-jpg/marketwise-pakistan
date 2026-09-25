/* Chapter 13 — Some Accessory Contracts. Source pp. 347–356. */
IFL_DATA.registerChapter({
  number: 13,
  title: "Some Accessory Contracts",
  part: "part-iii",
  pages: [347, 356],
  minutes: 40,
  difficulty: "Intermediate",
  objectives: [
    "Define Wakalah, its types and rules, and explain its use in Islamic banking including Wakalatul Istismar.",
    "Define Tawarruq, distinguish it from Bai‘ al ‘Inah, and evaluate the juristic views and the cautions against its extensive use.",
    "Explain Tawarruq for inter-bank liquidity management and its safeguards.",
    "Define Ju‘alah and explain its parties, subject matter, reward, execution, parallel contracts and banking products.",
    "Describe Bai‘ al Istijrar (supply contracts) and its conditions."
  ],
  why: "These ‘accessory’ contracts appear inside nearly every Islamic banking product: agency in Murabaha and Ijarah, Ju‘alah in debt recovery, Tawarruq in liquidity management and personal finance. Examiners like the Tawarruq–‘Inah distinction and the conditions under which organised Tawarruq becomes invalid.",
  overview: "The chapter covers four ancillary contracts. Wakalah (agency) with its types, rules and fund-management variant (Wakalatul Istismar); Tawarruq with the juristic views, invalidating structures and scholarly cautions, and its use for liquidity; Ju‘alah (reward for a result) with its parties, reward, execution, parallel contracts and products; and Bai‘ al Istijrar (repeat supply sale).",
  summarySection: null,
  topics: [
    {
      id: "t13.1", section: "13.1", title: "Introduction: Ancillary Contracts", pages: [347, 347], tier: "supporting",
      concepts: ["wakalah", "tawarruq", "jualah"],
      intuition: "Which small contracts make the big modes work?",
      simple: "Besides major contracts (Shirkah, Bai‘, Ijarah), Islamic banks use ancillary contracts inside or alongside them: Wakalah (agency), Ju‘alah (service against reward), Tawarruq (generating cash through purchase and sale, rooted in Murabaha but now a separate mode) and Istijrar (repeat sale). Hawalah, Kafalah and Bai‘ al Dayn are covered in other chapters.",
      academic: [
        "Wakalah and Ju‘alah are discussed as ancillary contracts; Tawarruq has become a separate mode used with other major modes; Istijrar is a repeat-sale arrangement under major modes.",
        "The chapter gathers contracts that rarely stand alone in Islamic banking but make the major modes work. Wakalah (agency) runs through Murabaha, Salam, Istisna‘a, Ijarah, Diminishing Musharakah, L/Cs, bill collection, fund management and securitisation. Ju‘alah (a reward for achieving a result) covers work too uncertain to be specified for Ijarah. Tawarruq (monetisation) is essentially a Murabaha followed by a spot sale, but it has become a separate product. Istijrar is a framework for repeated sales. Hawalah, Kafalah and Bai‘ al Dayn are dealt with in other chapters (p. 347)."
      ],
      exam: "Accessory contracts: Wakalah, Ju‘alah, Tawarruq, Istijrar (Hawalah, Kafalah, Bai‘ al Dayn elsewhere).",
      keyPoints: ["Ancillary contracts support the major modes.", "Hawalah, Kafalah and Bai‘ al Dayn are covered in their own chapters, not here (p. 347)."],
      related: ["t13.2", "t13.3", "t13.4", "t13.5"],
      quickCheck: { q: "Which of these is discussed in Chapter 13 as an accessory contract?", options: ["Musharakah", "Ju‘alah", "Salam", "Takaful"], answer: 1, explanation: "p. 347." }
    },
    {
      id: "t13.2", section: "13.2", title: "Wakalah (Agency)", pages: [347, 349], tier: "core",
      concepts: ["wakalah"],
      intuition: "When a client buys goods ‘on behalf of the bank’, whose goods are they?",
      simple: "Wakalah means looking after or acting for others; Tawkeel is appointing someone to take charge. The Wakil discharges his responsibility as a trustee (Amanah). The subject matter must be known, lawful and capable of representation (not prayer, fasting, testimony or oaths). The agent follows instructions with due care, cannot delegate without consent, must avoid conflicts of interest, and his acts are the principal's. Wakalah ends by agreement, termination, completion, destruction of the subject matter, death or loss of capacity.",
      academic: [
        "Legitimacy: the Prophet (pbuh) delegated the purchase of a goat to ‘Urwah al Barqi; Ali and other Companions delegated business.",
        "Types: Wakil-bil-Kusoomah (disputes), Wakil-bil-Taqazi al Dayn (receiving debt), Wakil-bil-Qabaza al Dayn (possession of debt), Wakil-bil-Bai‘ (sale), Wakil-bil-Shira (purchase).",
        "For purchase agencies, genus, kind, quality and attributes must be specified; agency in prohibited acts (theft, usurpation, Riba business) is not allowed. Permissible fields include sale, hire, lending, assignment, guarantee, pledge, gifts, bailment, payments, marriage, divorce and litigation.",
        "Specific vs general agency: a general agency to buy goods as and when asked; a specific agency to sell a particular asset at a given price — the job must still be clearly defined.",
        "Rights of delivery, claiming price, options of defect and inspection attach to the agent, who can be sued for non-performance; marriage, divorce and settlement of murder attach to the principal.",
        "The agent cannot sell his own property to the principal without disclosure; banks should include a negligence liability clause.",
        "Preferred view (Shafi‘i, Hanbali): goods bought by an agent pass directly from seller to principal. An unauthorised actor (Fuduli) creates contracts valid subject to the principal's ratification (preferred view).",
        "Uses: Murabaha, Salam, Istisna‘a, Ijarah, Diminishing Musharakah, L/Cs, bill collection, fund management and securitisation. It may be with or without fee — banks usually pay clients nothing as agents but charge fees for agency services they provide."
      ],
      exam: "Wakalah = agency; Wakil is trustee. Five types. Subject matter known, lawful, representable. Agent: follow instructions, due care, no sub-delegation without consent, disclose conflicts. Ownership passes directly to principal. Fuduli valid on ratification. Ends: agreement, termination, completion, destruction, death/incapacity.",
      keyPoints: [
        "Acts requiring personal performance (prayer, oath, testimony) cannot be delegated.",
        "Agency may be paid or unpaid.",
        "Used across Murabaha, Ijarah, Salam, Istisna‘a, DM.",
        "The Wakil discharges his responsibility as a trustee does with an Amanah (p. 347).",
        "Rights such as delivery, claiming the price and exercising options of defect or inspection attach to the agent. Marriage, divorce and settlement of murder attach explicitly to the principal (p. 348).",
        "Wakalah ends by mutual agreement, unilateral termination, discharge of the obligation, destruction of the subject matter, death or loss of legal capacity (p. 348)."
      ],
      definitions: [
        { term: "Wakalah", meaning: "Agency: appointing another to act on one's behalf; the agent (Wakil) acts as a trustee." },
        { term: "Fuduli", meaning: "A person who acts for another without authority; the contract is valid subject to the principal's ratification (preferred view)." },
        { term: "Tawkeel", meaning: "Appointing someone to take charge of something, or delegating a job to another person; derived from the same root as Wakalah." }
      ],
      table: { caption: "Types of Wakalah (Section 13.2.1)", head: ["Type", "Purpose"], rows: [["Wakil-bil-Kusoomah", "Disputes/cases for the principal"], ["Wakil-bil-Taqazi al Dayn", "Receiving debt"], ["Wakil-bil-Qabaza al Dayn", "Possession of debt"], ["Wakil-bil-Bai‘", "Selling"], ["Wakil-bil-Shira", "Purchasing"]] },
      related: ["t13.2.1", "t13.2.2", "t9.8.3"],
      quickCheck: { q: "Under the preferred (Shafi‘i/Hanbali) view, goods bought by an agent for the principal:", options: ["Belong first to the agent", "Pass directly from the seller to the principal", "Remain with the seller", "Must be resold"], answer: 1, explanation: "p. 348." },
      examples: [
        { title: "Purchase of a goat", kind: "textbook", text: "The Prophet (pbuh) delegated the purchase of a goat to the Companion ‘Urwah al Barqi. Ali and other Companions also delegated their business to others (p. 347)." },
        { title: "Agent selling his own goods", kind: "textbook", text: "An agent buying for his principal cannot supply his own property without fully disclosing that it belongs to him, because he must avoid conflicts of interest (p. 348)." }
      ],
      confusions: [
        { wrong: "Goods bought by an agent first become the agent’s property and then pass to the principal.", right: "On the preferred view (especially of the Shafi‘is and Hanbalis), ownership passes directly from the seller to the principal (p. 348)." },
        { wrong: "A contract concluded by a Fuduli (unauthorised person) is void.", right: "The preferred view is that it is valid subject to the principal’s ratification (p. 348)." }
      ]
    },
    {
      id: "t13.2.1", section: "13.2.1", title: "Types and Rules of Wakalah in Practice", pages: [347, 349], tier: "supporting",
      concepts: ["wakalah"],
      intuition: "What should a bank write into an agency agreement with a client?",
      simple: "Banks appointing agents should define the job clearly (even in general agency), require good faith and due diligence, prohibit undisclosed self-dealing, and include a clause making the agent liable for negligence, because agency can create third-party liabilities.",
      academic: [
        "The agent is responsible for payment and receipt of goods on the principal's behalf and may be sued for non-performance; he must exercise due care and skill and cannot entrust the work to another without consent.",
        "The book lists five types of agent: Wakil-bil-Kusoomah (disputes and litigation), Wakil-bil-Taqazi al Dayn (receiving a debt), Wakil-bil-Qabaza al Dayn (taking possession of a debt), Wakil-bil-Bai‘ (selling) and Wakil-bil-Shira (buying). An agency may be general or specific. A bank that appoints an agent to buy certain kinds of goods whenever asked creates a general agency. Asking an agent to sell a particular asset at a set price creates a specific one. In either case the job must be clearly defined. For a purchase, that means the genus, kind, quality and other attributes of the goods (p. 348). The act must also admit representation. Prayer, fasting, giving evidence and taking an oath must be done personally, and there can be no agency for prohibited acts such as theft, usurpation or Riba-based business (p. 348).",
        "In practice, Islamic banks usually pay no fee to clients who buy or sell as their agents. The banks do charge fees when they act as agents for clients, for example in fund management (p. 349). Because an agency can create liabilities to third parties, banks should make sure agents act in good faith and with due diligence. The contract may make the agent liable for negligence (p. 348)."
      ],
      exam: "Bank practice: clear job definition; negligence clause; no delegation without consent; disclose conflicts.",
      keyPoints: ["Third-party liabilities can arise from agency.", "Wakalah may be for a fee (commutative) or free (non-commutative) (p. 349)."],
      related: ["t13.2"],
      quickCheck: { q: "Can an agent sell his own property to the principal?", options: ["Never", "Only with full disclosure that it is his", "Always, secretly", "Only at a loss"], answer: 1, explanation: "p. 348." },
      table: { caption: "Types of Wakil (p. 347)", head: ["Type", "Scope"], rows: [["Wakil-bil-Kusoomah", "Disputes and cases for the principal"], ["Wakil-bil-Taqazi al Dayn", "Receiving a debt"], ["Wakil-bil-Qabaza al Dayn", "Taking possession of a debt"], ["Wakil-bil-Bai‘", "Selling"], ["Wakil-bil-Shira", "Buying"]] },
      examples: [
        { title: "General vs specific agency", kind: "textbook", text: "General: a bank appoints an agent to buy certain goods whenever it asks. Specific: a bank asks an agent to sell a particular asset at a given price (p. 348)." }
      ],
      confusions: [
        { wrong: "An eyewitness may appoint an agent to testify on his behalf.", right: "Testimony, like prayer, fasting and oaths, must be given in person and cannot be delegated (p. 348)." }
      ]
    },
    {
      id: "t13.2.2", section: "13.2.2", title: "Wakalatul Istismar (Investment Agency)", pages: [349, 349], tier: "core",
      concepts: ["wakalah", "fund-management"],
      intuition: "How does a fund manager's fee differ from a Mudarib's profit share?",
      simple: "IFIs can manage investors' funds as agents for a pre-agreed fee irrespective of profit or loss — a lump sum or a periodic percentage of investment or net asset value (e.g. 2% or 3% of NAV annually) — with all profits and losses passed to investors. The fee basis must be fixed before launch, typically disclosed in the prospectus, which subscribers are presumed to accept.",
      academic: [
        "The fee method must be determined before the fund launches; disclosure in the prospectus makes it agreed by all subscribers.",
        "Under Wakalatul Istismar the bank manages investors’ funds as their agent. Its pre-agreed fee does not depend on profit or loss, and all profit and loss go to the investors. The fee can be a lump sum, or a periodic percentage of the amount invested or of net asset value, e.g. 2–3 % of NAV at each year-end. The method must be fixed before the fund is launched. In practice it is disclosed in the prospectus, and every subscriber is taken to have accepted it (p. 349)."
      ],
      exam: "Wakalatul Istismar: fixed pre-agreed fee (lump sum or % of investment/NAV) regardless of results; P&L to investors; fee basis disclosed in prospectus before launch.",
      keyPoints: ["Fee is independent of performance, unlike a Mudarib's share."],
      definitions: [
        { term: "Wakalatul Istismar", meaning: "Investment agency: management of investors' funds for a pre-agreed fee, with profit and loss belonging to the investors." }
      ],
      distinctions: [
        { a: "Wakalatul Istismar", b: "Mudarabah", text: "The Wakil earns a fixed fee regardless of results; the Mudarib earns only a share of actual profit and nothing if there is no profit." }
      ],
      related: ["t12.4.2", "t16.4.1"],
      quickCheck: { q: "In Wakalatul Istismar, the manager is paid:", options: ["A share of profit only", "A pre-agreed fee irrespective of profit or loss", "Interest on funds", "Nothing"], answer: 1, explanation: "p. 349." },
      examples: [
        { title: "Fee on NAV", kind: "practice", text: "A fund with a year-end NAV of 500 million and a disclosed fee of 2 % of NAV pays the manager 10 million, whether the fund made a profit or a loss that year (based on p. 349)." }
      ],
      confusions: [
        { wrong: "The Wakalah fee basis may be decided after the fund has been running for a year.", right: "One method must be settled before launch, normally by disclosure in the prospectus (p. 349)." }
      ]
    },
    {
      id: "t13.3", section: "13.3", title: "Tawarruq", pages: [349, 351], tier: "core",
      concepts: ["tawarruq", "inah"],
      intuition: "If someone buys on credit only to sell for cash, is that different from borrowing at interest?",
      simple: "Tawarruq is buying on credit and selling at spot to a third party to obtain cash. Selling back to the original seller is ‘Inah and not compatible per the majority. The preferred view in all four schools is that genuine Tawarruq is permissible (though Qard al Hasan is preferable); AAOIFI agrees. But it becomes invalid if the bank appoints the client its agent to buy and then sell to himself, or if agency to sell is stipulated in the sale. Scholars advise it be limited to unavoidable corporate liquidity needs.",
      academic: [
        "Hanbali and Shafi‘i jurists mainly discuss it and distinguish it from ‘Inah: the Mutawarriq sells to a third party, whereas in ‘Inah the buyer resells to the original seller.",
        "Views: majority Hanbali — permissible (Ibn Taymiyah and Ibn Qayyim held it impermissible); Maliki — no major problem, a way to avoid Riba; some later Hanafis — ‘Inah, abominable; majority Hanafi follow Ibnul-Hummam — valid if sold in the market.",
        "Valid: the bank buys a liquid commodity and sells to the Mutawarriq, who sells in the market. Invalid: the bank appoints the Mutawarriq its agent to buy and then sells to himself (interdependent, no bank possession or risk). Valid but not advisable: agent only for purchase, then a separate sale by the bank with offer and acceptance.",
        "If the Mutawarriq appoints the bank as agent to sell and this is stipulated in the sale — invalid; if arranged after an unconditional sale — valid but not advisable.",
        "Through commodity exchanges where goods never move and only brokers act, it is vulnerable to violation of sale conditions. Some banks use shares, Ijarah Sukuk or ‘bundles of assets’; extensive use should be avoided.",
        "Monzer Kahf: limited to unavoidable corporate liquidity needs; for individual consumers it must be completely out. Nejatullah Siddiqi: the client comes wanting cash and leaves with cash after signing papers. Careless wide use may create systemic risk."
      ],
      exam: "Tawarruq = buy on credit, sell spot to third party for cash. ‘Inah = resale to original seller (invalid). Preferred view in four schools + AAOIFI: permissible. Invalid if client is bank's agent to buy and sell to himself, or sale-agency stipulated. Cautions: Kahf, Siddiqi; limit to corporate liquidity.",
      keyPoints: [
        "Grey area; widely used in personal finance and credit cards.",
        "Qard al Hasan is preferable.",
        "Commodity-exchange Tawarruq vulnerable to paper-only trades.",
        "Some banks run Tawarruq through shares, Ijarah Sukuk and “bundles of assets” with a majority of real assets. These may be permissible on legal grounds but should not be used extensively (p. 350)."
      ],
      definitions: [
        { term: "Tawarruq", meaning: "Buying a commodity on credit and selling it at spot to a third party to obtain cash." },
        { term: "Mutawarriq", meaning: "The person who obtains liquidity through Tawarruq." },
        { term: "Bai‘ al ‘Inah", meaning: "Sale and buy-back: the buyer resells the commodity to the original seller at a different price — a device for Riba." },
        { term: "Mutawarriq", meaning: "The person who obtains liquidity through Tawarruq by buying on credit and selling for cash." }
      ],
      distinctions: [
        { a: "Tawarruq", b: "‘Inah", text: "In Tawarruq the commodity is sold to a third party; in ‘Inah it returns to the original seller." },
        { a: "Ibn Taymiyah and Ibn Qayyim", b: "Majority of Hanbalis", text: "Two versions are reported from Imam Ahmad. Most Hanbalis prefer the one permitting Tawarruq; Ibn Taymiyah and Ibn Qayyim held it impermissible (p. 349)." },
        { a: "Some later Hanafis", b: "Ibnul-Hummam (majority Hanafi view)", text: "Some later Hanafis equated Tawarruq with ‘Inah and held it abominable. Ibnul-Hummam limited ‘Inah to resale to the original seller, so a sale in the market is valid, though Qard Hasan is preferable (p. 350)." }
      ],
      debate: [
        { issue: "Should Islamic banks use Tawarruq widely?", criticism: "Organised Tawarruq can become a paper exchange delivering cash for a fixed return — Siddiqi's ‘client wants cash and leaves with cash after signing papers’; Kahf says it should be wholly excluded for consumers.", response: "The preferred view in the four schools and AAOIFI permits genuine Tawarruq with sale to a third party and proper sale conditions.", alternative: "Use it only for unavoidable corporate liquidity needs, with strict Shari’ah board monitoring; prefer Qard al Hasan.", takeaway: "Legal permissibility does not justify extensive use; structure and scale both matter." },
        { issue: "Should Tawarruq be used for consumer finance?", criticism: "Monzer Kahf says it should be completely out of Islamic banking for individual consumers. Nejatullah Siddiqi describes clients arriving wanting cash and leaving with cash after signing papers.", response: "Most schools and the AAOIFI accept Tawarruq in principle when the commodity is sold to a third party.", takeaway: "Scholars advise limiting it to unavoidable corporate liquidity needs (p. 350)." }
      ],
      related: ["t13.3.1", "t6.11", "t9.9.1"],
      quickCheck: { q: "The bank appoints the customer as its agent to buy a commodity and then to sell it to himself. The Tawarruq is:", options: ["Valid and advisable", "Invalid — interdependent transactions without bank possession or risk", "Valid only for corporates", "Required by AAOIFI"], answer: 1, explanation: "p. 350." },
      confusions: [
        { wrong: "The Maliki school, being strict on ‘Inah, rejects Tawarruq.", right: "The Malikis see no major problem in Tawarruq and regard it as a way to avoid Riba (p. 349)." },
        { wrong: "If every formal condition of sale is met, heavy use of Tawarruq raises no concern.", right: "The transaction may be valid, but its extensive use is still problematic and could create systemic risk (p. 350)." }
      ],
      table: { caption: "Organised Tawarruq structures (p. 350)", head: ["Structure", "Ruling"], rows: [["Bank buys a commodity, sells to Mutawarriq, who sells it in the market", "No Shari’ah problem"], ["Mutawarriq is the bank’s agent to buy and then sells to himself", "Invalid"], ["Mutawarriq is agent only to buy; the bank then sells by a separate contract", "Valid but not advisable"], ["Bank is the Mutawarriq’s agent to sell, stipulated in the sale", "Invalid"], ["Bank is agent to sell, appointed after an unconditional sale", "Valid but not advisable"], ["Via commodity exchange where goods never move", "Vulnerable to violations"]] }
    },
    {
      id: "t13.3.1", section: "13.3.1", title: "Use of Tawarruq for Liquidity Management", pages: [351, 351], tier: "supporting",
      concepts: ["tawarruq", "liquidity"],
      intuition: "How can two Islamic banks lend to each other overnight without interest?",
      simple: "Used as Commodity or Shares Murabaha (widely in the Middle East) for a fixed return. Acceptable steps: both banks choose a liquid commodity or blue-chip shares; the surplus bank buys it for cash; the deficit bank buys from the surplus bank on Murabaha credit; after delivery it sells at spot in the market. It must not become a mere exchange of papers, should be used only where no other option avoids interest, and must be strictly monitored by Shari’ah boards.",
      academic: [
        "Widespread use is harmful to the industry in the long run.",
        "Commodity Murabaha or Shares Murabaha, widely used in the Middle East, lets banks place and raise funds at a fixed return. In an acceptable structure the two banks choose a liquid commodity or blue-chip stock. The surplus bank buys it for cash in the market. The deficit bank buys it from the surplus bank on credit (Murabaha), takes delivery and sells it at spot. The risk is that this becomes a mere exchange of papers between brokers and banks. The book therefore treats it as a last resort where there is no other way to avoid interest, and asks Shari’ah boards to monitor such deals closely (p. 351)."
      ],
      exam: "Interbank Tawarruq: liquid asset chosen → surplus bank buys cash → deficit bank buys on Murabaha credit → takes delivery and sells spot. Safeguards: real transfer, last resort, Shari’ah board monitoring.",
      keyPoints: ["Known as Commodity Murabaha / Shares Murabaha.", "The deficit bank must take delivery before selling at spot (p. 351)."],
      steps: [
        "Banks select a liquid commodity or blue-chip stocks",
        "Surplus bank buys it for cash in the market",
        "Deficit bank buys it from the surplus bank on deferred Murabaha",
        "Deficit bank takes delivery and sells at spot for cash",
        "Deficit bank pays the Murabaha price at maturity"
      ],
      related: ["t14.4.4", "t13.3"],
      quickCheck: { q: "In interbank Tawarruq, who buys the commodity on deferred payment?", options: ["The surplus bank", "The deficit bank", "The broker", "The central bank"], answer: 1, explanation: "p. 351." },
      confusions: [
        { wrong: "Interbank Tawarruq is harmless because it is simple.", right: "The book warns that widespread use harms the industry in the long run and must be strictly monitored by Shari’ah boards (p. 351)." }
      ]
    },
    {
      id: "t13.4", section: "13.4", title: "Ju‘alah", pages: [351, 351], tier: "core",
      concepts: ["jualah"],
      intuition: "How do you contract for a result when you cannot specify the work?",
      simple: "Ju‘alah is a contract in which one party (Ja‘il) promises a specific reward (Ju‘l) to whoever achieves a specified result — e.g. finding a stolen car. It is permissible by Qur’an (the reward for the King's lost beaker in Surah Yusuf) and Sunnah (Companions' reward for curing a tribal chief). It suits tasks Ijarah cannot handle because Ijarah requires the work to be specified — such as recovering overdue debts.",
      academic: [
        "Some jurists restrict Ju‘alah to the return of a runaway slave, but the majority allow many activities; determination of the required end result suffices."
      ],
      exam: "Ju‘alah: reward for achieving a specified result; Qur’an (Yusuf) and Sunnah; used where work cannot be specified (debt recovery).",
      keyPoints: ["Result specified, work may be uncertain."],
      definitions: [
        { term: "Ju‘alah", meaning: "A contract in which the offeror (Ja‘il) promises a known reward (Ju‘l) to whoever achieves a specified result." },
        { term: "Ja‘il", meaning: "The offeror in Ju‘alah, who promises the reward." },
        { term: "Ju‘l", meaning: "The reward payable on achieving the result in Ju‘alah." }
      ],
      related: ["t13.4.1", "t11.1"],
      quickCheck: { q: "Why is Ju‘alah used where Ijarah is unsuitable?", options: ["Ju‘alah is cheaper", "Ijarah requires the work to be specified; Ju‘alah needs only the result", "Ju‘alah has no reward", "Ijarah is prohibited"], answer: 1, explanation: "p. 351." },
      examples: [
        { title: "The King’s beaker (Surah Yusuf)", kind: "textbook", text: "A camel-load of grain was announced for whoever found the King’s lost beaker, the Qur’anic basis cited for Ju‘alah (p. 351)." },
        { title: "Curing the tribal chief", kind: "textbook", text: "The Prophet (pbuh) approved some Companions’ condition that they would be compensated if the chief of a tribe was cured (p. 351)." }
      ],
      confusions: [
        { wrong: "Ju‘alah is limited to rewards for returning a runaway slave.", right: "Some jurists restricted it so, but the majority allow it for many activities, provided the required end result is determined (p. 351)." }
      ]
    },
    {
      id: "t13.4.1", section: "13.4.1", title: "Parties to Ju‘alah", pages: [351, 352], tier: "core",
      concepts: ["jualah"],
      intuition: "If the worker tries hard but fails, is anything owed?",
      simple: "The offeror promises compensation to the worker — a specified person or the public — for a result in a known or unknown period. No result, no reward. Ju‘alah is non-binding and either party may terminate, but once work starts, an offeror who revokes must pay reasonable wages; a worker who revokes after starting has no claim unless agreed. The worker is a trustee of the offeror's property.",
      academic: [
        "If a specific worker is named, he must work himself or involve others with the offeror's express consent. Ju‘alah resembles agency in allowing help from others.",
        "Where parties undertake not to terminate within a period, the undertaking must be observed.",
        "Ju‘alah has two parties: the offeror, and the worker, who may be a named person or anyone from the public. Payment depends entirely on achieving the result. A worker who tries and fails gets nothing, and this is why uncertainty about the work does not spoil the contract (pp. 351–352). A named worker must do the work himself unless the offeror expressly agrees to others helping. A worker who responds to a public offer may use helpers. The worker holds the offeror’s property as a trustee and is liable only for negligence, misconduct or breach of conditions (p. 352)."
      ],
      exam: "Parties: offeror and worker (specific or public). No result → no reward. Non-binding; revocation by offeror after commencement → reasonable wage. Worker = trustee.",
      keyPoints: [
        "Different from Ijarah: the worker may be unspecified.",
        "Ju‘alah is not binding in itself, but an undertaking not to terminate for a set period must be honoured (p. 352)."
      ],
      related: ["t13.4.3"],
      quickCheck: { q: "The offeror revokes a Ju‘alah after the worker has started. The worker is entitled to:", options: ["Nothing", "A reasonable wage", "The full reward", "Double the reward"], answer: 1, explanation: "p. 352." },
      confusions: [
        { wrong: "If the offeror revokes after work has started, the worker gets nothing because the result was not achieved.", right: "Once work has begun, revocation by the offeror obliges him to pay a reasonable wage for the work done (p. 352)." },
        { wrong: "A worker who abandons the job midway can claim for his effort.", right: "If the worker revokes after starting, he has no claim unless agreed otherwise (p. 352)." }
      ]
    },
    {
      id: "t13.4.2", section: "13.4.2", title: "Subject Matter of Ju‘alah and Reward", pages: [352, 353], tier: "supporting",
      concepts: ["jualah"],
      intuition: "Can a reward be a percentage of what is recovered?",
      simple: "The subject matter is the work and the agreed compensation. The task must involve effort and not be the worker's legal or employment duty; the reward must be known, valuable and deliverable — or a portion of the result. Uses: mineral extraction, finding lost property, debt collection (reward proportionate to recoveries), reports, inventions, trademark designs, brokerage (reward on contract execution). A time limit may be set and extended by consent.",
      academic: [
        "The contract is valid despite uncertainty about the amount of work and the probability of success, provided the result is determined.",
        "The subject matter of Ju‘alah is the task and the reward. The task must require some effort and must not already be a legal or employment duty of the worker. The reward must be known, valuable and deliverable. It may be a share of the result, such as a percentage of debts recovered (p. 352). Once the result is defined, the contract is valid even though the amount of work and the chance of success are unknown. Uses include mineral extraction, finding lost property, debt collection, reports, scientific inventions, designs such as trademarks, and brokerage, where the reward falls due when the brokered contract is concluded. The offeror may set a deadline, and the parties may extend it by consent if the work is well advanced but delayed for a genuine reason (pp. 352–353)."
      ],
      exam: "Task: effortful, not a legal/employment duty. Reward: known, lawful, deliverable, or share of result. Uses: minerals, lost property, debts, reports, inventions, brokerage.",
      keyPoints: ["Reward can be a proportion of the realised result."],
      related: ["t13.4.6"],
      quickCheck: { q: "Which cannot be the task of a Ju‘alah?", options: ["Finding a lost car", "Collecting defaulted debts", "A duty the worker already owes by law or employment", "Discovering a mineral"], answer: 2, explanation: "p. 352." },
      examples: [
        { title: "Mineral exploration", kind: "textbook", text: "A government offers a fixed sum only to firms that find an agreed mineral with specified features (p. 352)." }
      ],
      confusions: [
        { wrong: "A police officer may claim a Ju‘alah reward for recovering stolen property in the course of his duty.", right: "The task must not be a legal or employment obligation on the worker (p. 352)." }
      ]
    },
    {
      id: "t13.4.3", section: "13.4.3", title: "Execution of a Ju‘alah Contract", pages: [353, 353], tier: "supporting",
      concepts: ["jualah"],
      intuition: "Why does a public reward notice not need anyone to ‘accept’ it?",
      simple: "Ju‘alah may be an open public offer; no counter-acceptance is needed (unlike Ijarah) except with a specified worker. The reward is claimable only on completion (unlike Ujrah, which is earned for time worked), except (1) when the property turns out not to belong to the offeror by legal decision, and (2) when an accident not caused by the worker impairs the subject matter — then full reward. Termination before work → no reward; offeror termination after work began → market remuneration.",
      academic: [
        "A specified worker must perform the work himself.",
        "A Ju‘alah may be concluded by a public or informal offer, and no counter-acceptance is needed, since it is practically unattainable from an unknown public. The exception is a contract with a named worker, who must then do the work himself. Unlike Ijarah, where a worker hired for a set time earns his wage for that time whether or not the job is finished, the Ju‘alah reward is not claimable until the work is complete (p. 353). The book gives two exceptions. The first is where the property turns out not to belong to the offeror and a legal decision says so. The second is where an accident, not caused by the worker’s negligence, impairs the subject matter; here the worker gets the full reward (p. 353)."
      ],
      exam: "Open offer; no acceptance needed; reward on completion (two exceptions); termination rules.",
      keyPoints: [
        "Ujrah: time-based entitlement; Ju‘l: result-based.",
        "Termination by either party before work starts: no reward. Termination by the offeror after work starts: market remuneration is payable (p. 353)."
      ],
      distinctions: [
        { a: "Ju‘alah reward (Ju‘l)", b: "Ijarah wage (Ujrah)", text: "Ju‘l is due only on achieving the result; Ujrah is earned for the stipulated time worked even if the task is incomplete." }
      ],
      related: ["t13.4.1"],
      quickCheck: { q: "Does a public Ju‘alah offer require counter-acceptance?", options: ["Yes, always", "No — except with a specified worker", "Only in writing", "Only by the government"], answer: 1, explanation: "p. 353." }
    },
    {
      id: "t13.4.4", section: "13.4.4", title: "Parallel Ju‘alah Contracts", pages: [353, 353], tier: "supporting",
      concepts: ["jualah", "parallel-contracts"],
      intuition: "Can a bank take on a job and subcontract it?",
      simple: "A bank that takes a Ju‘alah job may get it done through an independent Parallel Ju‘alah with a third party, unless the first contract requires the bank to do it itself. The bank may also act as offeror, for its own needs or to fulfil a parallel obligation; the two contracts remain independent.",
      academic: [
        "Independence of the two contracts is essential.",
        "A bank may act as the worker in one Ju‘alah and hire another party under a separate, Parallel Ju‘alah, unless the first contract requires it to do the work personally. It may equally act as offeror, whether it needs the work for itself or to meet its own obligation under another Ju‘alah. The two contracts must remain independent (p. 353)."
      ],
      exam: "Parallel Ju‘alah: two independent contracts; bank as worker subcontracts unless personal performance required.",
      keyPoints: ["Like Parallel Salam/Istisna‘a: independence required."],
      related: ["t13.4.5", "t10.11.7"],
      quickCheck: { q: "When can a bank not use a Parallel Ju‘alah?", options: ["Never restricted", "When the first contract requires the bank to do the work itself", "When the reward is money", "When the customer is a corporate"], answer: 1, explanation: "p. 353." },
      confusions: [
        { wrong: "A bank may always subcontract Ju‘alah work through a Parallel Ju‘alah.", right: "Only if the first Ju‘alah does not require the bank to perform the work itself (p. 353)." }
      ]
    },
    {
      id: "t13.4.5", section: "13.4.5", title: "Practical Process in Ju‘alah by Islamic Banks", pages: [353, 354], tier: "core",
      concepts: ["jualah"],
      intuition: "Trace the five arrows of Figure 13.1.",
      simple: "(1) Customer negotiates with the bank for uncertain work within a time for a reward; (2) bank, after cost–benefit analysis, signs a Ju‘alah contract; (3) bank finds an expert and signs a Parallel Ju‘alah; (4) worker completes the work and is paid; (5) bank collects its reward from the customer. Banks may also hire others on Ju‘alah, e.g. to recover non-performing debts.",
      academic: [
        "Figure 13.1 depicts the customer–bank–worker flow.",
        "The book sets out a five-step process (Figure 13.1). The customer asks the bank to perform uncertain work within a set time for an agreed reward. The bank weighs cost against benefit and signs a Ju‘alah. It then engages an expert worker under a Parallel Ju‘alah. The worker completes the job and is paid by the bank. Finally, the bank collects its reward from the customer. The same logic lets a bank buy services such as recovery of non-performing debts (pp. 353–354)."
      ],
      exam: "Figure 13.1 five steps: negotiate → Ju‘alah → Parallel Ju‘alah → work done, worker paid → bank collects reward.",
      keyPoints: ["Bank's margin = customer reward − worker reward."],
      steps: [
        "Customer negotiates uncertain work, time and reward with bank",
        "Bank signs Ju‘alah after cost–benefit analysis",
        "Bank signs Parallel Ju‘alah with an expert worker",
        "Worker completes the work and receives agreed reward",
        "Bank collects its reward from the customer"
      ],
      related: ["t13.4.4"],
      quickCheck: { q: "In Figure 13.1, when does the bank collect its reward?", options: ["Before any work", "After the work is completed", "When signing the parallel contract", "Never"], answer: 1, explanation: "p. 354." },
      examples: [
        { title: "Margin on a parallel contract", kind: "practice", text: "A customer promises the bank 500,000 for tracing and recovering a shipment within 3 months. The bank engages an agency under Parallel Ju‘alah for 400,000. If the shipment is recovered, the bank pays 400,000 and collects 500,000. If not, nothing is payable under either contract (based on pp. 353–354)." }
      ]
    },
    {
      id: "t13.4.6", section: "13.4.6", title: "Islamic Financial Products Based on Ju‘alah", pages: [354, 355], tier: "supporting",
      concepts: ["jualah"],
      intuition: "Where might your bank use Ju‘alah without calling it that?",
      simple: "Debt collection: reward as a percentage of amounts collected; advance payment is allowed but only ‘on account’ until the result is achieved. Securing permissible financing: a worker prepares, e.g., a feasibility study that leads the bank to grant a facility. Brokerage: reward on signing of the intermediated contract.",
      academic: [
        "Advance reward is not absolutely earned until the result is realised.",
        "The book lists three product uses. The first is debt collection: the reward is a percentage of the amount collected. It may be paid in advance, wholly or partly, but only on account until the result is achieved. The second is securing permissible finance: a worker prepares, for example, a feasibility study that leads a bank to grant the offeror a facility. The third is brokerage: the reward falls due when the brokered contract is signed (pp. 354–355)."
      ],
      exam: "Ju‘alah products: debt collection (% of recovery; advances on account), securing permissible financing (feasibility), brokerage.",
      keyPoints: ["Advance = on account only."],
      related: ["t13.4.2"],
      quickCheck: { q: "A debt-collection Ju‘alah pays part of the reward in advance. The worker's right to it is:", options: ["Absolute immediately", "On account until the required result is realised", "Forfeited", "Interest"], answer: 1, explanation: "p. 355." },
      confusions: [
        { wrong: "A debt-recovery agent paid in advance keeps the advance whatever happens.", right: "Advance reward is on account; the worker is not absolutely entitled until the result is achieved (p. 355)." }
      ]
    },
    {
      id: "t13.5", section: "13.5", title: "Bai‘ al Istijrar (Supply Contract)", pages: [355, 355], tier: "supporting",
      concepts: ["istijrar"],
      intuition: "How does a bakery supplying bread daily and billing monthly fit Islamic sale rules?",
      simple: "Istijrar is not a separate mode but a repeat-sale arrangement: a supplier sells units from time to time, or in consignments, with price fixed in advance, per consignment or after all deliveries, on normal cash or credit terms. Scholars relax price fixation and payment rules for day-to-day trade absent Gharar (e.g. bread supplied for a month, paid monthly). If based on Murabaha or Salam, their conditions apply — e.g. separate offer and acceptance for every Murabaha consignment.",
      academic: [
        "It works as a master agreement for ongoing financing under suitable normal modes, typical between wholesalers and retailers.",
        "Istijrar is not a mode in itself. It is a framework for repeated ordinary sales in which a supplier provides amounts of a commodity from time to time, or delivers one agreed quantity in several consignments. The price may be fixed in advance, with each consignment, or after all deliveries. It usually takes the form of a master agreement between wholesaler and retailer, and scholars allow some flexibility on fixing and paying the price where there is no Gharar (p. 355). If a specific mode is used, its conditions still apply in full. Under Murabaha, for example, each consignment needs its own offer and acceptance based on the client’s requisition (p. 355)."
      ],
      exam: "Istijrar: repeat supply sale under a master agreement; price in advance/per consignment/after deliveries; relaxation if no Gharar; Murabaha-based needs separate offer/acceptance per consignment.",
      keyPoints: ["Not a specific mode."],
      definitions: [
        { term: "Bai‘ al Istijrar", meaning: "A repeat supply arrangement in which a seller delivers a commodity from time to time on agreed price and payment terms." }
      ],
      related: ["t9.7"],
      quickCheck: { q: "If an Istijrar arrangement is based on Murabaha, what is needed for each consignment?", options: ["Nothing extra", "Separate offer and acceptance", "A new master agreement", "Takaful"], answer: 1, explanation: "p. 355." },
      examples: [
        { title: "Monthly bread supply", kind: "textbook", text: "A baker supplies bread to a retailer throughout the month at a known price and is paid once at the month’s end (p. 355)." }
      ],
      confusions: [
        { wrong: "An Istijrar master agreement lets a bank skip separate Murabaha contracts for each delivery.", right: "Where Murabaha is the mode, each consignment still needs separate offer and acceptance (p. 355)." }
      ]
    }
  ],
  summary: "Chapter 13 explains contracts that support the major modes. Wakalah (agency) requires a known, lawful and representable task; the agent acts as a trustee with due care, avoids undisclosed conflicts and cannot delegate without consent; goods he buys pass directly to the principal; it may be paid or unpaid and underlies Murabaha, Ijarah, Salam, Istisna‘a, DM, L/Cs and fund management — Wakalatul Istismar paying a pre-agreed fee irrespective of results. Tawarruq — buying on credit and selling spot to a third party — is permissible in the preferred view of the four schools and AAOIFI, unlike ‘Inah; it becomes invalid when the client acts as the bank's agent to buy and sell to himself or when sale-agency is stipulated, and scholars (Kahf, Siddiqi) warn that extensive or consumer use undermines Islamic banking, so it should be limited to unavoidable corporate liquidity needs with strict monitoring. Ju‘alah pays a known reward only upon achieving a specified result, suits uncertain work such as debt recovery, needs no counter-acceptance for public offers, may be paralleled, and supports collection, financing-facilitation and brokerage products. Istijrar is a repeat-supply arrangement with relaxed price rules absent Gharar. (Chapter synthesis — the chapter has no separate summary section.)",
  takeaways: [
    "Wakil = trustee; ownership passes directly to principal.",
    "Wakalatul Istismar: fixed fee regardless of results, disclosed in prospectus.",
    "Tawarruq ≠ ‘Inah: sale to a third party.",
    "Client as bank's agent to buy and self-sell → invalid Tawarruq.",
    "Limit Tawarruq to unavoidable corporate liquidity needs.",
    "Ju‘alah: no result, no reward; revocation after work starts → reasonable wage.",
    "Parallel Ju‘alah contracts must be independent.",
    "Istijrar: repeat sale; Murabaha consignments each need offer and acceptance."
  ],
  checklist: [
    "Can you list five types of Wakalah and the agent's duties?",
    "Can you explain Wakalatul Istismar vs Mudarabah?",
    "Can you distinguish Tawarruq from ‘Inah and state the juristic views?",
    "Can you identify invalid organised Tawarruq structures?",
    "Can you describe interbank Tawarruq steps?",
    "Can you explain Ju‘alah rules on reward and termination?",
    "Can you draw the Figure 13.1 process?",
    "Can you explain Istijrar?"
  ],
  flashcards: [
    { id: "f13.1", cat: "Definitions", front: "Wakalah", back: "Agency — appointing another to act for oneself; the Wakil discharges duties as a trustee (Amanah).", topic: "t13.2" },
    { id: "f13.2", cat: "Arabic terminology", front: "Fuduli", back: "Unauthorised person acting for another; contract valid subject to principal's ratification (preferred view).", topic: "t13.2" },
    { id: "f13.3", cat: "Contract rules", front: "Acts that cannot be delegated by Wakalah", back: "Personal acts such as prayer, fasting, giving evidence, taking an oath; and prohibited acts (theft, Riba business).", topic: "t13.2" },
    { id: "f13.4", cat: "Banking", front: "Wakalatul Istismar", back: "Fund management as agent for a pre-agreed fee (lump sum or % of investment/NAV) regardless of profit or loss; basis disclosed before launch.", topic: "t13.2.2" },
    { id: "f13.5", cat: "Definitions", front: "Tawarruq", back: "Buying on credit and selling at spot to a third party to obtain cash.", topic: "t13.3" },
    { id: "f13.6", cat: "Comparisons", front: "Tawarruq vs ‘Inah", back: "Tawarruq: sold to third party — permissible (preferred view, AAOIFI). ‘Inah: sold back to original seller — invalid.", topic: "t13.3" },
    { id: "f13.7", cat: "Prohibitions", front: "Invalid organised Tawarruq structures", back: "Bank appoints client agent to buy and then sells to himself; sale-agency to the bank stipulated as a condition of the sale.", topic: "t13.3" },
    { id: "f13.8", cat: "Principles", front: "Scholars' caution on Tawarruq", back: "Kahf: corporate unavoidable liquidity only, never consumers. Siddiqi: ‘comes wanting cash, leaves with cash after signing papers’.", topic: "t13.3" },
    { id: "f13.9", cat: "Banking", front: "Interbank Tawarruq (Commodity Murabaha)", back: "Surplus bank buys liquid commodity for cash; deficit bank buys on deferred Murabaha, takes delivery, sells spot.", topic: "t13.3.1" },
    { id: "f13.10", cat: "Definitions", front: "Ju‘alah", back: "Offeror (Ja‘il) promises known reward (Ju‘l) to whoever achieves a specified result; no result, no reward.", topic: "t13.4" },
    { id: "f13.11", cat: "Contract rules", front: "Ju‘alah termination", back: "Before work: no reward. Offeror revokes after work starts: reasonable/market wage. Worker revokes after starting: no claim unless agreed.", topic: "t13.4.1" },
    { id: "f13.12", cat: "Comparisons", front: "Ju‘l vs Ujrah", back: "Ju‘l due only on result; Ujrah earned for time worked even if task incomplete.", topic: "t13.4.3" },
    { id: "f13.13", cat: "Financing modes", front: "Ju‘alah products", back: "Debt collection (% of recoveries; advances on account), securing permissible financing, brokerage.", topic: "t13.4.6" },
    { id: "f13.14", cat: "Contract rules", front: "Bai‘ al Istijrar", back: "Repeat supply sale under a master agreement; price relaxations absent Gharar; Murabaha consignments need separate offer/acceptance.", topic: "t13.5" },
    { id: "f13.15", cat: "Arabic terminology", front: "Tawkeel", back: "Appointing someone to take charge of something, or delegating a job (same root as Wakalah) (p. 347).", topic: "t13.2" },
    { id: "f13.16", cat: "Contract rules", front: "Agent’s core duties", back: "Follow instructions, use due care and skill, no sub-agent without consent, and avoid conflicts of interest, e.g. disclose if he sells his own goods (p. 348).", topic: "t13.2" },
    { id: "f13.17", cat: "Contract rules", front: "How Wakalah ends", back: "Mutual agreement, unilateral termination, discharge of the obligation, destruction of the subject matter, death or loss of capacity (p. 348).", topic: "t13.2" },
    { id: "f13.18", cat: "Contract rules", front: "General vs specific agency", back: "General: buy certain goods whenever asked. Specific: sell a particular asset at a given price. The job must be clearly defined in both (p. 348).", topic: "t13.2.1" },
    { id: "f13.19", cat: "Arabic terminology", front: "Mutawarriq", back: "The person who obtains cash through Tawarruq (p. 349).", topic: "t13.3" },
    { id: "f13.20", cat: "Comparisons", front: "School views on Tawarruq", back: "Hanbali majority, Shafi‘is, Malikis and the Hanafi majority (Ibnul-Hummam) permit it. Ibn Taymiyah and Ibn Qayyim forbid it. Qard Hasan is preferable (pp. 349–350).", topic: "t13.3" },
    { id: "f13.21", cat: "Arabic terminology", front: "Ja‘il and Ju‘l", back: "Ja‘il: the offeror of the reward. Ju‘l: the reward itself (p. 351).", topic: "t13.4" },
    { id: "f13.22", cat: "Contract rules", front: "Revocation in Ju‘alah", back: "Before work: no reward. By the offeror after work starts: a reasonable market wage. By the worker after starting: no claim unless agreed (pp. 352–353).", topic: "t13.4.1" },
    { id: "f13.23", cat: "Contract rules", front: "Ju‘alah task conditions", back: "It must involve effort and must not already be the worker’s legal or employment duty. The result must be determined (p. 352).", topic: "t13.4.2" },
    { id: "f13.24", cat: "Contract rules", front: "Early entitlement to the Ju‘alah reward", back: "(1) The property proves not to be the offeror’s (legal decision); (2) a non-negligent accident impairs the subject matter, giving the full reward (p. 353).", topic: "t13.4.3" },
    { id: "f13.25", cat: "Banking", front: "Ju‘alah process (Figure 13.1)", back: "Negotiation → bank signs Ju‘alah → Parallel Ju‘alah with a worker → worker completes and is paid → bank collects its reward (pp. 353–354).", topic: "t13.4.5" },
    { id: "f13.26", cat: "Contract rules", front: "Istijrar with Murabaha", back: "The master agreement is allowed, but each consignment needs separate offer and acceptance (p. 355).", topic: "t13.5" }
  ],
  questions: [
    { id: "q13.1", type: "mcq", q: "Which Wakalah type covers agency for purchase?", options: ["Wakil-bil-Kusoomah", "Wakil-bil-Shira", "Wakil-bil-Bai‘", "Wakil-bil-Taqazi al Dayn"], answer: 1, explanation: "p. 347.", topic: "t13.2", diff: "E", level: "recall", obj: "Recall Wakalah types" },
    { id: "q13.2", type: "tf", q: "In Wakalatul Istismar, the manager's fee depends on the profit of the fund.", answer: false, explanation: "The fee is pre-agreed irrespective of profit or loss (p. 349).", topic: "t13.2.2", diff: "E", level: "understanding", obj: "Explain investment agency" },
    { id: "q13.3", type: "scenario", q: "A customer buys copper on credit from a bank and sells it in the market to an unrelated buyer for cash. This is:", options: ["‘Inah", "Permissible Tawarruq (preferred view)", "Riba al-Fadl", "Salam"], answer: 1, explanation: "pp. 349–350.", topic: "t13.3", diff: "E", level: "application", obj: "Classify Tawarruq" },
    { id: "q13.4", type: "multi", q: "Which Tawarruq arrangements are described as invalid? (Select all.)", options: ["Bank appoints client as agent to buy and then sell to himself", "Client's agency to the bank to sell is stipulated in the sale contract", "Bank buys a liquid commodity and sells it to the client, who sells to a third party", "Resale to the original credit seller"], answer: [0, 1, 3], explanation: "pp. 349–350.", topic: "t13.3", diff: "M", level: "analysis", obj: "Identify invalid structures" },
    { id: "q13.5", type: "identify", q: "A contract promising a reward to whoever recovers a stolen car is:", options: ["Ijarah", "Ju‘alah", "Wakalah", "Istijrar"], answer: 1, explanation: "p. 351.", topic: "t13.4", diff: "E", level: "recall", obj: "Identify Ju‘alah" },
    { id: "q13.6", type: "order", q: "Order the Ju‘alah process in Figure 13.1.", items: ["Customer negotiates uncertain work with the bank", "Bank signs Ju‘alah with the customer", "Bank signs Parallel Ju‘alah with a worker", "Worker completes work and is paid", "Bank collects reward from customer"], explanation: "pp. 353–354.", topic: "t13.4.5", diff: "M", level: "understanding", obj: "Sequence Ju‘alah" },
    { id: "q13.7", type: "comparison", q: "Which statement correctly compares Ju‘alah and Ijarah of services?", options: ["Both require specified work", "In Ju‘alah the reward depends on achieving the result and the worker may be unspecified; in Ijarah work and worker are specified and wage is earned for time", "Ijarah needs no acceptance", "Ju‘alah is binding from the start"], answer: 1, explanation: "pp. 351–353.", topic: "t13.4.3", diff: "M", level: "analysis", obj: "Compare contracts" },
    { id: "q13.8", type: "application", q: "A Ju‘alah pays 5% of debts recovered. The worker recovers Rs.2,000,000 of a Rs.5,000,000 portfolio before the deadline. Reward:", options: ["Rs.250,000", "Rs.100,000", "Nothing", "Rs.5,000"], answer: 1, explanation: "5% × 2,000,000 = 100,000 — reward may be proportionate to realised debts (p. 352). (Practice example — generated for learning.)", topic: "t13.4.2", diff: "M", level: "application", obj: "Compute Ju‘alah reward" },
    { id: "q13.9", type: "short", q: "Why do scholars caution against extensive use of Tawarruq even when legally permissible?", answer: "Because organised Tawarruq can become an exchange of papers that delivers cash for a fixed return without real trade, resembling interest-based lending; it may lack conditions of valid sale (e.g. on commodity exchanges), creates systemic risk and harms the industry's credibility. Kahf would limit it to unavoidable corporate liquidity needs and exclude consumers; Siddiqi observes the client comes for cash and leaves with cash after signing papers.", keywords: ["papers", "cash", "systemic", "corporate", "liquidity"], explanation: "pp. 350–351.", topic: "t13.3", diff: "H", level: "analysis", obj: "Evaluate Tawarruq" },
    { id: "q13.10", type: "definition", q: "Bai‘ al Istijrar is best described as:", options: ["A sale and buy-back", "A repeat supply arrangement under a master agreement", "A reward contract", "An agency"], answer: 1, explanation: "p. 355.", topic: "t13.5", diff: "E", level: "recall", obj: "Define Istijrar" },
    { id: "q13.11", type: "tf", q: "An agent may appoint a sub-agent to do the job without the principal's consent.", answer: false, explanation: "p. 348.", topic: "t13.2", diff: "E", level: "recall", obj: "Recall agent duties" },
    { id: "q13.12", type: "match", q: "Match the contract with its key feature.", pairs: [["Wakalah", "Agent acts as trustee for principal"], ["Tawarruq", "Credit purchase and spot sale to third party"], ["Ju‘alah", "Reward only on result"], ["Istijrar", "Repeat supply sale"]], explanation: "Chapter 13.", topic: "t13.1", diff: "E", level: "recall", obj: "Match contracts" },
    { id: "q13.13", type: "mcq", q: "The word Tawkeel means:", options: ["A guarantee of debt", "Appointing someone to take charge of something, or delegating a job", "A reward for a result", "A sale on credit"], answer: 1, explanation: "p. 347.", topic: "t13.2", diff: "E", level: "recall", obj: "Recall Wakalah terminology" },
    { id: "q13.14", type: "match", q: "Match each Wakil type to its scope.", pairs: [["Wakil-bil-Kusoomah", "Disputes and cases"], ["Wakil-bil-Taqazi al Dayn", "Receiving debt"], ["Wakil-bil-Bai‘", "Selling"], ["Wakil-bil-Shira", "Buying"]], explanation: "p. 347.", topic: "t13.2.1", diff: "M", level: "recall", obj: "Recall types of Wakalah" },
    { id: "q13.15", type: "multi", q: "For which acts is agency NOT permissible? (Select all.)", options: ["Prayer", "Giving evidence as an eyewitness", "Sale and purchase", "Taking an oath"], answer: [0, 1, 3], explanation: "These must be done personally (p. 348).", topic: "t13.2.1", diff: "E", level: "recall", obj: "Identify acts that admit representation" },
    { id: "q13.16", type: "identify", q: "A bank asks an agent to sell its particular machine at a given price. This is a:", options: ["General agency", "Specific agency", "Ju‘alah", "Fuduli contract"], answer: 1, explanation: "p. 348.", topic: "t13.2.1", diff: "E", level: "understanding", obj: "Distinguish general and specific agency" },
    { id: "q13.17", type: "tf", q: "On the preferred Shafi‘i and Hanbali view, goods an agent buys for his principal pass straight from the seller to the principal.", answer: true, explanation: "They do not first enter the agent’s ownership (p. 348).", topic: "t13.2", diff: "M", level: "recall", obj: "Recall transfer of ownership in agency" },
    { id: "q13.18", type: "scenario", q: "A purchasing agent supplies the principal with goods from his own warehouse without saying so. What rule has he broken?", options: ["None", "He must avoid conflicts of interest and fully disclose that the goods are his own", "He needed a Kafalah", "He should have charged a fee"], answer: 1, explanation: "p. 348.", topic: "t13.2", diff: "M", level: "application", obj: "Apply the agent’s duties" },
    { id: "q13.19", type: "mcq", q: "The preferred view on a contract made by a Fuduli is that it is:", options: ["Void", "Valid subject to ratification by the principal", "Valid without ratification", "Binding on the Fuduli only"], answer: 1, explanation: "p. 348.", topic: "t13.2", diff: "M", level: "recall", obj: "Recall the Fuduli rule" },
    { id: "q13.20", type: "multi", q: "Which events end a Wakalah? (Select all.)", options: ["Mutual agreement", "Destruction of the subject matter", "Death or loss of legal capacity", "The agent earning a profit"], answer: [0, 1, 2], explanation: "Also unilateral termination and discharge of the obligation (p. 348).", topic: "t13.2", diff: "E", level: "recall", obj: "Recall how Wakalah ends" },
    { id: "q13.21", type: "tf", q: "Islamic banks normally pay a fee to clients who buy goods on the bank’s behalf in Murabaha.", answer: false, explanation: "Banks mostly pay no fee to such clients, though they charge fees for agency services they provide (p. 349).", topic: "t13.2.1", diff: "M", level: "recall", obj: "Recall practice on agency fees" },
    { id: "q13.22", type: "application", q: "A Wakalatul Istismar fund discloses a 3 % year-end fee on NAV. The NAV is 200 million after a loss year. What fee does the manager earn?", options: ["0, because the fund lost money", "6 million", "3 million", "Only a share of profit"], answer: 1, explanation: "The fee is independent of profit or loss: 3 % × 200 m (p. 349).", topic: "t13.2.2", diff: "M", level: "application", obj: "Calculate a Wakalah fee" },
    { id: "q13.23", type: "short", q: "How can a fund make every investor agree to the manager’s Wakalah fee basis?", answer: "Fix it before launch and disclose it in the prospectus; subscribers are presumed to accept its terms.", keywords: ["prospectus", "before"], explanation: "p. 349.", topic: "t13.2.2", diff: "M", level: "understanding", obj: "Explain disclosure of the Wakalah fee" },
    { id: "q13.24", type: "comparison", q: "How did the Malikis view Tawarruq?", options: ["As ‘Inah and forbidden", "They saw no major problem and regarded it as a way to avoid Riba", "As Makruh only for traders", "They never discussed it"], answer: 1, explanation: "Despite being strict about ‘Inah (p. 349).", topic: "t13.3", diff: "M", level: "recall", obj: "Compare school views on Tawarruq" },
    { id: "q13.25", type: "identify", q: "Which scholars held Tawarruq impermissible?", options: ["Ibnul-Hummam", "Ibn Taymiyah and Ibn Qayyim", "The majority of Hanbalis", "The AAOIFI"], answer: 1, explanation: "p. 349.", topic: "t13.3", diff: "M", level: "recall", obj: "Recall opponents of Tawarruq" },
    { id: "q13.26", type: "scenario", q: "A bank appoints the client as its agent to buy copper, and the client then sells the copper to himself on credit. Is this valid?", options: ["Valid", "Invalid — the purchase and sale are interdependent and the bank has taken neither possession nor risk", "Valid but not advisable", "Valid if the price is disclosed"], answer: 1, explanation: "p. 350.", topic: "t13.3", diff: "H", level: "application", obj: "Evaluate organised Tawarruq structures" },
    { id: "q13.27", type: "scenario", q: "After an unconditional credit sale, the client separately appoints the bank to sell the commodity in the market for him. What is the ruling?", options: ["Invalid", "Valid but not advisable", "Valid and recommended", "Riba"], answer: 1, explanation: "Had the agency been stipulated in the sale, it would be invalid (p. 350).", topic: "t13.3", diff: "H", level: "application", obj: "Evaluate organised Tawarruq structures" },
    { id: "q13.28", type: "tf", q: "According to Monzer Kahf, Tawarruq should be completely excluded from Islamic banking for individual consumers.", answer: true, explanation: "p. 350.", topic: "t13.3", diff: "M", level: "recall", obj: "Recall scholarly criticism of Tawarruq" },
    { id: "q13.29", type: "order", q: "Order the steps of an acceptable interbank Tawarruq.", items: ["Both banks select a liquid commodity or blue-chip stock", "The surplus bank buys it for cash in the market", "The deficit bank buys it from the surplus bank on credit (Murabaha)", "The deficit bank takes delivery and sells it at spot"], explanation: "p. 351.", topic: "t13.3.1", diff: "M", level: "understanding", obj: "Sequence interbank Tawarruq" },
    { id: "q13.30", type: "mcq", q: "In Ju‘alah, the Ja‘il is:", options: ["The worker", "The offeror who promises the reward", "The reward", "The guarantor"], answer: 1, explanation: "The reward is the Ju‘l (p. 351).", topic: "t13.4", diff: "E", level: "recall", obj: "Recall Ju‘alah terminology" },
    { id: "q13.31", type: "identify", q: "Which Qur’anic episode is cited as a basis for Ju‘alah?", options: ["The story of Qarun", "The reward of a camel-load of grain for finding the King’s beaker (Surah Yusuf)", "The debt verse", "The people of the cave"], answer: 1, explanation: "p. 351.", topic: "t13.4", diff: "E", level: "recall", obj: "Recall the basis of Ju‘alah" },
    { id: "q13.32", type: "comparison", q: "Why is Ju‘alah suited to finding lost property when Ijarah is not?", options: ["Ijarah is prohibited", "Ijarah requires the work to be specified; Ju‘alah needs only a determined result", "Ju‘alah pays more", "Ijarah cannot involve banks"], answer: 1, explanation: "p. 351.", topic: "t13.4", diff: "M", level: "understanding", obj: "Distinguish Ju‘alah from Ijarah" },
    { id: "q13.33", type: "scenario", q: "An offeror revokes a Ju‘alah after the worker has spent two weeks on the job. What is the worker entitled to?", options: ["Nothing", "A reasonable (market) wage for the work done", "The full reward", "Double the reward"], answer: 1, explanation: "pp. 352–353.", topic: "t13.4.1", diff: "M", level: "application", obj: "Apply revocation rules in Ju‘alah" },
    { id: "q13.34", type: "tf", q: "A worker who abandons a Ju‘alah after starting can claim compensation for the effort he has put in.", answer: false, explanation: "He has no claim unless agreed otherwise (p. 352).", topic: "t13.4.1", diff: "M", level: "understanding", obj: "Apply revocation rules in Ju‘alah" },
    { id: "q13.35", type: "multi", q: "Which conditions apply to the reward in Ju‘alah? (Select all.)", options: ["Known", "Valuable (a permissible consideration)", "Deliverable when required", "Always a fixed lump sum"], answer: [0, 1, 2], explanation: "It may also be a share of the result (p. 352).", topic: "t13.4.2", diff: "M", level: "recall", obj: "Recall conditions of the reward" },
    { id: "q13.36", type: "identify", q: "Which task CANNOT be the subject of a Ju‘alah for the person named?", options: ["A geologist finding a specified mineral", "A debt collector recovering overdue debts", "A court clerk filing a case as part of his official duties", "A researcher preparing a report"], answer: 2, explanation: "The task must not be a legal or employment obligation of the worker (p. 352).", topic: "t13.4.2", diff: "M", level: "application", obj: "Identify valid Ju‘alah tasks" },
    { id: "q13.37", type: "tf", q: "A Ju‘alah offered to the general public needs a counter-acceptance before it is concluded.", answer: false, explanation: "Counter-acceptance is not needed, except with a specified worker (p. 353).", topic: "t13.4.3", diff: "M", level: "understanding", obj: "Recall formation of Ju‘alah" },
    { id: "q13.38", type: "multi", q: "In which cases is the worker entitled to the reward before completing the work? (Select all.)", options: ["The property proves not to be the offeror’s and a legal decision says so", "An accident, not caused by the worker’s negligence, impairs the subject matter", "The worker asks for an advance", "The deadline is near"], answer: [0, 1], explanation: "In the accident case, the full reward (p. 353).", topic: "t13.4.3", diff: "H", level: "recall", obj: "Recall exceptions on entitlement" },
    { id: "q13.39", type: "short", q: "When may a bank that has taken on Ju‘alah work pass it to a third party under a Parallel Ju‘alah?", answer: "When the first Ju‘alah does not require the bank to do the work itself; the two contracts must stay independent.", keywords: ["itself", "independent"], explanation: "p. 353.", topic: "t13.4.4", diff: "M", level: "understanding", obj: "Apply Parallel Ju‘alah rules" },
    { id: "q13.40", type: "application", q: "A customer offers the bank 600,000 to recover goods; the bank hires a firm under Parallel Ju‘alah for 450,000. The firm succeeds. What is the bank’s margin?", options: ["0", "150,000", "450,000", "600,000"], answer: 1, explanation: "600,000 − 450,000 (pp. 353–354).", topic: "t13.4.5", diff: "E", level: "application", obj: "Calculate the margin in Parallel Ju‘alah" },
    { id: "q13.41", type: "identify", q: "In Ju‘alah brokerage, when does the broker become entitled to the reward?", options: ["On introducing the parties", "On signing or completion of the contract he intermediated", "Monthly", "In advance"], answer: 1, explanation: "pp. 352, 355.", topic: "t13.4.6", diff: "E", level: "recall", obj: "Recall the brokerage use of Ju‘alah" },
    { id: "q13.42", type: "tf", q: "Under Istijrar, the price may be fixed in advance, with each consignment, or after all deliveries.", answer: true, explanation: "p. 355.", topic: "t13.5", diff: "E", level: "recall", obj: "Recall pricing in Istijrar" },
    { id: "q13.43", type: "scenario", q: "A bank supplies a retailer monthly under an Istijrar master agreement using Murabaha. What is required for each consignment?", options: ["Nothing beyond the master agreement", "A separate offer and acceptance based on the client’s requisition", "A new master agreement", "Payment in advance"], answer: 1, explanation: "p. 355.", topic: "t13.5", diff: "M", level: "application", obj: "Apply Murabaha rules within Istijrar" }
  ],
  exam: [
    { id: "e13.1", kind: "long", q: "Critically evaluate Tawarruq as practised by Islamic banks.", structure: ["Definition and ‘Inah distinction", "Juristic views of four schools and AAOIFI", "Valid, invalid and ‘not advisable’ structures", "Commodity-exchange Tawarruq", "Scholarly cautions (Kahf, Siddiqi)", "Interbank liquidity use and safeguards"], keyConcepts: ["Mutawarriq", "‘Inah", "organised Tawarruq"], points: ["Qard al Hasan preferable"], mistakes: ["Calling all Tawarruq ‘Inah", "Ignoring agency structures"], topic: "t13.3" },
    { id: "e13.2", kind: "short", q: "Explain Ju‘alah and how an Islamic bank can use it for debt recovery.", structure: ["Definition and legitimacy", "Parties and reward", "Termination rules", "Parallel Ju‘alah and Figure 13.1", "Debt-collection product"], keyConcepts: ["Ju‘l", "result"], points: ["Reward as % of recovery"], mistakes: ["Treating reward as due for effort"], topic: "t13.4" },
    { id: "e13.3", kind: "conceptual", q: "Discuss the rules of Wakalah and its role in Islamic banking products.", structure: ["Meaning and legitimacy", "Types", "Subject matter and duties", "Ownership transfer and Fuduli", "Termination", "Uses and Wakalatul Istismar"], keyConcepts: ["Amanah", "Wakil"], points: ["Negligence clause"], mistakes: ["Letting agent bear business risk"], topic: "t13.2" },
    { id: "e13.4", kind: "viva", q: "How does a fund manager under Wakalatul Istismar differ from a Mudarib?", structure: ["Fee vs profit share", "Who bears loss", "Disclosure"], keyConcepts: ["NAV fee"], points: ["Prospectus disclosure"], mistakes: ["Saying Wakil shares losses"], topic: "t13.2.2" },
    { id: "e13.5", kind: "difference", q: "Distinguish Ju‘alah from Ijarah of services.", structure: ["Specification of work", "Parties", "Acceptance", "Entitlement", "Binding nature"], keyConcepts: ["Ju‘l", "Ujrah", "Result"], points: ["Ijarah needs specified work; Ju‘alah only a determined result (p. 351)", "Ju‘alah worker may be the public (p. 351)", "No counter-acceptance needed for a public offer (p. 353)", "Reward only on completion; wage for time in Ijarah (p. 353)", "Ju‘alah not binding until work begins (p. 352)"], mistakes: ["Saying Ju‘alah requires known work", "Ignoring the exceptions for early entitlement"], topic: "t13.4.3" },
    { id: "e13.6", kind: "scenario", q: "A client asks your bank for cash to meet a personal need; the product team proposes Tawarruq through a commodity exchange. Advise the Shari’ah board.", structure: ["Define Tawarruq and ‘Inah", "Juristic views", "Structural tests", "Commodity exchange risk", "Policy advice"], keyConcepts: ["Mutawarriq", "Organised Tawarruq", "Qard Hasan"], points: ["A sale to a third party is acceptable; a sale back is ‘Inah (pp. 349–350)", "Agency to sell stipulated in the sale is invalid (p. 350)", "Exchanges where goods never move are vulnerable (p. 350)", "Kahf: exclude it for consumers; Siddiqi’s criticism (p. 350)", "Limit it to unavoidable corporate liquidity (p. 350)"], mistakes: ["Treating legal validity as sufficient", "Ignoring possession and risk"], topic: "t13.3" }
  ]
});
