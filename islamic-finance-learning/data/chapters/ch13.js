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
      academic: ["Wakalah and Ju‘alah are discussed as ancillary contracts; Tawarruq has become a separate mode used with other major modes; Istijrar is a repeat-sale arrangement under major modes."],
      exam: "Accessory contracts: Wakalah, Ju‘alah, Tawarruq, Istijrar (Hawalah, Kafalah, Bai‘ al Dayn elsewhere).",
      keyPoints: ["Ancillary contracts support the major modes."],
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
        "Used across Murabaha, Ijarah, Salam, Istisna‘a, DM."
      ],
      definitions: [
        { term: "Wakalah", meaning: "Agency: appointing another to act on one's behalf; the agent (Wakil) acts as a trustee." },
        { term: "Fuduli", meaning: "A person who acts for another without authority; the contract is valid subject to the principal's ratification (preferred view)." }
      ],
      table: {
        caption: "Types of Wakalah (Section 13.2.1)",
        head: ["Type", "Purpose"],
        rows: [["Wakil-bil-Kusoomah", "Disputes/cases for the principal"], ["Wakil-bil-Taqazi al Dayn", "Receiving debt"], ["Wakil-bil-Qabaza al Dayn", "Possession of debt"], ["Wakil-bil-Bai‘", "Selling"], ["Wakil-bil-Shira", "Purchasing"]]
      },
      related: ["t13.2.1", "t13.2.2", "t7.13"],
      quickCheck: { q: "Under the preferred (Shafi‘i/Hanbali) view, goods bought by an agent for the principal:", options: ["Belong first to the agent", "Pass directly from the seller to the principal", "Remain with the seller", "Must be resold"], answer: 1, explanation: "p. 348." }
    },
    {
      id: "t13.2.1", section: "13.2.1", title: "Types and Rules of Wakalah in Practice", pages: [347, 349], tier: "supporting",
      concepts: ["wakalah"],
      intuition: "What should a bank write into an agency agreement with a client?",
      simple: "Banks appointing agents should define the job clearly (even in general agency), require good faith and due diligence, prohibit undisclosed self-dealing, and include a clause making the agent liable for negligence, because agency can create third-party liabilities.",
      academic: ["The agent is responsible for payment and receipt of goods on the principal's behalf and may be sued for non-performance; he must exercise due care and skill and cannot entrust the work to another without consent."],
      exam: "Bank practice: clear job definition; negligence clause; no delegation without consent; disclose conflicts.",
      keyPoints: ["Third-party liabilities can arise from agency."],
      related: ["t13.2"],
      quickCheck: { q: "Can an agent sell his own property to the principal?", options: ["Never", "Only with full disclosure that it is his", "Always, secretly", "Only at a loss"], answer: 1, explanation: "p. 348." }
    },
    {
      id: "t13.2.2", section: "13.2.2", title: "Wakalatul Istismar (Investment Agency)", pages: [349, 349], tier: "core",
      concepts: ["wakalah", "fund-management"],
      intuition: "How does a fund manager's fee differ from a Mudarib's profit share?",
      simple: "IFIs can manage investors' funds as agents for a pre-agreed fee irrespective of profit or loss — a lump sum or a periodic percentage of investment or net asset value (e.g. 2% or 3% of NAV annually) — with all profits and losses passed to investors. The fee basis must be fixed before launch, typically disclosed in the prospectus, which subscribers are presumed to accept.",
      academic: ["The fee method must be determined before the fund launches; disclosure in the prospectus makes it agreed by all subscribers."],
      exam: "Wakalatul Istismar: fixed pre-agreed fee (lump sum or % of investment/NAV) regardless of results; P&L to investors; fee basis disclosed in prospectus before launch.",
      keyPoints: ["Fee is independent of performance, unlike a Mudarib's share."],
      definitions: [{ term: "Wakalatul Istismar", meaning: "Investment agency: management of investors' funds for a pre-agreed fee, with profit and loss belonging to the investors." }],
      distinctions: [{ a: "Wakalatul Istismar", b: "Mudarabah", text: "The Wakil earns a fixed fee regardless of results; the Mudarib earns only a share of actual profit and nothing if there is no profit." }],
      related: ["t12.4.2", "t16.4.1"],
      quickCheck: { q: "In Wakalatul Istismar, the manager is paid:", options: ["A share of profit only", "A pre-agreed fee irrespective of profit or loss", "Interest on funds", "Nothing"], answer: 1, explanation: "p. 349." }
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
        "Commodity-exchange Tawarruq vulnerable to paper-only trades."
      ],
      definitions: [
        { term: "Tawarruq", meaning: "Buying a commodity on credit and selling it at spot to a third party to obtain cash." },
        { term: "Mutawarriq", meaning: "The person who obtains liquidity through Tawarruq." },
        { term: "Bai‘ al ‘Inah", meaning: "Sale and buy-back: the buyer resells the commodity to the original seller at a different price — a device for Riba." }
      ],
      distinctions: [{ a: "Tawarruq", b: "‘Inah", text: "In Tawarruq the commodity is sold to a third party; in ‘Inah it returns to the original seller." }],
      debate: [{
        issue: "Should Islamic banks use Tawarruq widely?",
        criticism: "Organised Tawarruq can become a paper exchange delivering cash for a fixed return — Siddiqi's ‘client wants cash and leaves with cash after signing papers’; Kahf says it should be wholly excluded for consumers.",
        response: "The preferred view in the four schools and AAOIFI permits genuine Tawarruq with sale to a third party and proper sale conditions.",
        alternative: "Use it only for unavoidable corporate liquidity needs, with strict Shari’ah board monitoring; prefer Qard al Hasan.",
        takeaway: "Legal permissibility does not justify extensive use; structure and scale both matter."
      }],
      related: ["t13.3.1", "t7.15", "t5.5.5"],
      quickCheck: { q: "The bank appoints the customer as its agent to buy a commodity and then to sell it to himself. The Tawarruq is:", options: ["Valid and advisable", "Invalid — interdependent transactions without bank possession or risk", "Valid only for corporates", "Required by AAOIFI"], answer: 1, explanation: "p. 350." }
    },
    {
      id: "t13.3.1", section: "13.3.1", title: "Use of Tawarruq for Liquidity Management", pages: [351, 351], tier: "supporting",
      concepts: ["tawarruq", "liquidity"],
      intuition: "How can two Islamic banks lend to each other overnight without interest?",
      simple: "Used as Commodity or Shares Murabaha (widely in the Middle East) for a fixed return. Acceptable steps: both banks choose a liquid commodity or blue-chip shares; the surplus bank buys it for cash; the deficit bank buys from the surplus bank on Murabaha credit; after delivery it sells at spot in the market. It must not become a mere exchange of papers, should be used only where no other option avoids interest, and must be strictly monitored by Shari’ah boards.",
      academic: ["Widespread use is harmful to the industry in the long run."],
      exam: "Interbank Tawarruq: liquid asset chosen → surplus bank buys cash → deficit bank buys on Murabaha credit → takes delivery and sells spot. Safeguards: real transfer, last resort, Shari’ah board monitoring.",
      keyPoints: ["Known as Commodity Murabaha / Shares Murabaha."],
      steps: ["Banks select a liquid commodity or blue-chip stocks", "Surplus bank buys it for cash in the market", "Deficit bank buys it from the surplus bank on deferred Murabaha", "Deficit bank takes delivery and sells at spot for cash", "Deficit bank pays the Murabaha price at maturity"],
      related: ["t14.4.4", "t13.3"],
      quickCheck: { q: "In interbank Tawarruq, who buys the commodity on deferred payment?", options: ["The surplus bank", "The deficit bank", "The broker", "The central bank"], answer: 1, explanation: "p. 351." }
    },
    {
      id: "t13.4", section: "13.4", title: "Ju‘alah", pages: [351, 351], tier: "core",
      concepts: ["jualah"],
      intuition: "How do you contract for a result when you cannot specify the work?",
      simple: "Ju‘alah is a contract in which one party (Ja‘il) promises a specific reward (Ju‘l) to whoever achieves a specified result — e.g. finding a stolen car. It is permissible by Qur’an (the reward for the King's lost beaker in Surah Yusuf) and Sunnah (Companions' reward for curing a tribal chief). It suits tasks Ijarah cannot handle because Ijarah requires the work to be specified — such as recovering overdue debts.",
      academic: ["Some jurists restrict Ju‘alah to the return of a runaway slave, but the majority allow many activities; determination of the required end result suffices."],
      exam: "Ju‘alah: reward for achieving a specified result; Qur’an (Yusuf) and Sunnah; used where work cannot be specified (debt recovery).",
      keyPoints: ["Result specified, work may be uncertain."],
      definitions: [{ term: "Ju‘alah", meaning: "A contract in which the offeror (Ja‘il) promises a known reward (Ju‘l) to whoever achieves a specified result." }],
      related: ["t13.4.1", "t11.1"],
      quickCheck: { q: "Why is Ju‘alah used where Ijarah is unsuitable?", options: ["Ju‘alah is cheaper", "Ijarah requires the work to be specified; Ju‘alah needs only the result", "Ju‘alah has no reward", "Ijarah is prohibited"], answer: 1, explanation: "p. 351." }
    },
    {
      id: "t13.4.1", section: "13.4.1", title: "Parties to Ju‘alah", pages: [351, 352], tier: "core",
      concepts: ["jualah"],
      intuition: "If the worker tries hard but fails, is anything owed?",
      simple: "The offeror promises compensation to the worker — a specified person or the public — for a result in a known or unknown period. No result, no reward. Ju‘alah is non-binding and either party may terminate, but once work starts, an offeror who revokes must pay reasonable wages; a worker who revokes after starting has no claim unless agreed. The worker is a trustee of the offeror's property.",
      academic: ["If a specific worker is named, he must work himself or involve others with the offeror's express consent. Ju‘alah resembles agency in allowing help from others.", "Where parties undertake not to terminate within a period, the undertaking must be observed."],
      exam: "Parties: offeror and worker (specific or public). No result → no reward. Non-binding; revocation by offeror after commencement → reasonable wage. Worker = trustee.",
      keyPoints: ["Different from Ijarah: the worker may be unspecified."],
      related: ["t13.4.3"],
      quickCheck: { q: "The offeror revokes a Ju‘alah after the worker has started. The worker is entitled to:", options: ["Nothing", "A reasonable wage", "The full reward", "Double the reward"], answer: 1, explanation: "p. 352." }
    },
    {
      id: "t13.4.2", section: "13.4.2", title: "Subject Matter of Ju‘alah and Reward", pages: [352, 353], tier: "supporting",
      concepts: ["jualah"],
      intuition: "Can a reward be a percentage of what is recovered?",
      simple: "The subject matter is the work and the agreed compensation. The task must involve effort and not be the worker's legal or employment duty; the reward must be known, valuable and deliverable — or a portion of the result. Uses: mineral extraction, finding lost property, debt collection (reward proportionate to recoveries), reports, inventions, trademark designs, brokerage (reward on contract execution). A time limit may be set and extended by consent.",
      academic: ["The contract is valid despite uncertainty about the amount of work and the probability of success, provided the result is determined."],
      exam: "Task: effortful, not a legal/employment duty. Reward: known, lawful, deliverable, or share of result. Uses: minerals, lost property, debts, reports, inventions, brokerage.",
      keyPoints: ["Reward can be a proportion of the realised result."],
      related: ["t13.4.6"],
      quickCheck: { q: "Which cannot be the task of a Ju‘alah?", options: ["Finding a lost car", "Collecting defaulted debts", "A duty the worker already owes by law or employment", "Discovering a mineral"], answer: 2, explanation: "p. 352." }
    },
    {
      id: "t13.4.3", section: "13.4.3", title: "Execution of a Ju‘alah Contract", pages: [353, 353], tier: "supporting",
      concepts: ["jualah"],
      intuition: "Why does a public reward notice not need anyone to ‘accept’ it?",
      simple: "Ju‘alah may be an open public offer; no counter-acceptance is needed (unlike Ijarah) except with a specified worker. The reward is claimable only on completion (unlike Ujrah, which is earned for time worked), except (1) when the property turns out not to belong to the offeror by legal decision, and (2) when an accident not caused by the worker impairs the subject matter — then full reward. Termination before work → no reward; offeror termination after work began → market remuneration.",
      academic: ["A specified worker must perform the work himself."],
      exam: "Open offer; no acceptance needed; reward on completion (two exceptions); termination rules.",
      keyPoints: ["Ujrah: time-based entitlement; Ju‘l: result-based."],
      distinctions: [{ a: "Ju‘alah reward (Ju‘l)", b: "Ijarah wage (Ujrah)", text: "Ju‘l is due only on achieving the result; Ujrah is earned for the stipulated time worked even if the task is incomplete." }],
      related: ["t13.4.1"],
      quickCheck: { q: "Does a public Ju‘alah offer require counter-acceptance?", options: ["Yes, always", "No — except with a specified worker", "Only in writing", "Only by the government"], answer: 1, explanation: "p. 353." }
    },
    {
      id: "t13.4.4", section: "13.4.4", title: "Parallel Ju‘alah Contracts", pages: [353, 353], tier: "supporting",
      concepts: ["jualah", "parallel-contracts"],
      intuition: "Can a bank take on a job and subcontract it?",
      simple: "A bank that takes a Ju‘alah job may get it done through an independent Parallel Ju‘alah with a third party, unless the first contract requires the bank to do it itself. The bank may also act as offeror, for its own needs or to fulfil a parallel obligation; the two contracts remain independent.",
      academic: ["Independence of the two contracts is essential."],
      exam: "Parallel Ju‘alah: two independent contracts; bank as worker subcontracts unless personal performance required.",
      keyPoints: ["Like Parallel Salam/Istisna‘a: independence required."],
      related: ["t13.4.5", "t10.4.4"],
      quickCheck: { q: "When can a bank not use a Parallel Ju‘alah?", options: ["Never restricted", "When the first contract requires the bank to do the work itself", "When the reward is money", "When the customer is a corporate"], answer: 1, explanation: "p. 353." }
    },
    {
      id: "t13.4.5", section: "13.4.5", title: "Practical Process in Ju‘alah by Islamic Banks", pages: [353, 354], tier: "core",
      concepts: ["jualah"],
      intuition: "Trace the five arrows of Figure 13.1.",
      simple: "(1) Customer negotiates with the bank for uncertain work within a time for a reward; (2) bank, after cost–benefit analysis, signs a Ju‘alah contract; (3) bank finds an expert and signs a Parallel Ju‘alah; (4) worker completes the work and is paid; (5) bank collects its reward from the customer. Banks may also hire others on Ju‘alah, e.g. to recover non-performing debts.",
      academic: ["Figure 13.1 depicts the customer–bank–worker flow."],
      exam: "Figure 13.1 five steps: negotiate → Ju‘alah → Parallel Ju‘alah → work done, worker paid → bank collects reward.",
      keyPoints: ["Bank's margin = customer reward − worker reward."],
      steps: ["Customer negotiates uncertain work, time and reward with bank", "Bank signs Ju‘alah after cost–benefit analysis", "Bank signs Parallel Ju‘alah with an expert worker", "Worker completes the work and receives agreed reward", "Bank collects its reward from the customer"],
      related: ["t13.4.4"],
      quickCheck: { q: "In Figure 13.1, when does the bank collect its reward?", options: ["Before any work", "After the work is completed", "When signing the parallel contract", "Never"], answer: 1, explanation: "p. 354." }
    },
    {
      id: "t13.4.6", section: "13.4.6", title: "Islamic Financial Products Based on Ju‘alah", pages: [354, 355], tier: "supporting",
      concepts: ["jualah"],
      intuition: "Where might your bank use Ju‘alah without calling it that?",
      simple: "Debt collection: reward as a percentage of amounts collected; advance payment is allowed but only ‘on account’ until the result is achieved. Securing permissible financing: a worker prepares, e.g., a feasibility study that leads the bank to grant a facility. Brokerage: reward on signing of the intermediated contract.",
      academic: ["Advance reward is not absolutely earned until the result is realised."],
      exam: "Ju‘alah products: debt collection (% of recovery; advances on account), securing permissible financing (feasibility), brokerage.",
      keyPoints: ["Advance = on account only."],
      related: ["t13.4.2"],
      quickCheck: { q: "A debt-collection Ju‘alah pays part of the reward in advance. The worker's right to it is:", options: ["Absolute immediately", "On account until the required result is realised", "Forfeited", "Interest"], answer: 1, explanation: "p. 355." }
    },
    {
      id: "t13.5", section: "13.5", title: "Bai‘ al Istijrar (Supply Contract)", pages: [355, 355], tier: "supporting",
      concepts: ["istijrar"],
      intuition: "How does a bakery supplying bread daily and billing monthly fit Islamic sale rules?",
      simple: "Istijrar is not a separate mode but a repeat-sale arrangement: a supplier sells units from time to time, or in consignments, with price fixed in advance, per consignment or after all deliveries, on normal cash or credit terms. Scholars relax price fixation and payment rules for day-to-day trade absent Gharar (e.g. bread supplied for a month, paid monthly). If based on Murabaha or Salam, their conditions apply — e.g. separate offer and acceptance for every Murabaha consignment.",
      academic: ["It works as a master agreement for ongoing financing under suitable normal modes, typical between wholesalers and retailers."],
      exam: "Istijrar: repeat supply sale under a master agreement; price in advance/per consignment/after deliveries; relaxation if no Gharar; Murabaha-based needs separate offer/acceptance per consignment.",
      keyPoints: ["Not a specific mode."],
      definitions: [{ term: "Bai‘ al Istijrar", meaning: "A repeat supply arrangement in which a seller delivers a commodity from time to time on agreed price and payment terms." }],
      related: ["t7.13"],
      quickCheck: { q: "If an Istijrar arrangement is based on Murabaha, what is needed for each consignment?", options: ["Nothing extra", "Separate offer and acceptance", "A new master agreement", "Takaful"], answer: 1, explanation: "p. 355." }
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
    { id: "f13.14", cat: "Contract rules", front: "Bai‘ al Istijrar", back: "Repeat supply sale under a master agreement; price relaxations absent Gharar; Murabaha consignments need separate offer/acceptance.", topic: "t13.5" }
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
    { id: "q13.12", type: "match", q: "Match the contract with its key feature.", pairs: [["Wakalah", "Agent acts as trustee for principal"], ["Tawarruq", "Credit purchase and spot sale to third party"], ["Ju‘alah", "Reward only on result"], ["Istijrar", "Repeat supply sale"]], explanation: "Chapter 13.", topic: "t13.1", diff: "E", level: "recall", obj: "Match contracts" }
  ],
  exam: [
    { id: "e13.1", kind: "long", q: "Critically evaluate Tawarruq as practised by Islamic banks.", structure: ["Definition and ‘Inah distinction", "Juristic views of four schools and AAOIFI", "Valid, invalid and ‘not advisable’ structures", "Commodity-exchange Tawarruq", "Scholarly cautions (Kahf, Siddiqi)", "Interbank liquidity use and safeguards"], keyConcepts: ["Mutawarriq", "‘Inah", "organised Tawarruq"], points: ["Qard al Hasan preferable"], mistakes: ["Calling all Tawarruq ‘Inah", "Ignoring agency structures"], topic: "t13.3" },
    { id: "e13.2", kind: "short", q: "Explain Ju‘alah and how an Islamic bank can use it for debt recovery.", structure: ["Definition and legitimacy", "Parties and reward", "Termination rules", "Parallel Ju‘alah and Figure 13.1", "Debt-collection product"], keyConcepts: ["Ju‘l", "result"], points: ["Reward as % of recovery"], mistakes: ["Treating reward as due for effort"], topic: "t13.4" },
    { id: "e13.3", kind: "conceptual", q: "Discuss the rules of Wakalah and its role in Islamic banking products.", structure: ["Meaning and legitimacy", "Types", "Subject matter and duties", "Ownership transfer and Fuduli", "Termination", "Uses and Wakalatul Istismar"], keyConcepts: ["Amanah", "Wakil"], points: ["Negligence clause"], mistakes: ["Letting agent bear business risk"], topic: "t13.2" },
    { id: "e13.4", kind: "viva", q: "How does a fund manager under Wakalatul Istismar differ from a Mudarib?", structure: ["Fee vs profit share", "Who bears loss", "Disclosure"], keyConcepts: ["NAV fee"], points: ["Prospectus disclosure"], mistakes: ["Saying Wakil shares losses"], topic: "t13.2.2" }
  ]
});
