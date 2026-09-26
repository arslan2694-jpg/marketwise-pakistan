/* Chapter 11 — Ijarah – Leasing. Source pp. 279–306. */
IFL_DATA.registerChapter({
  number: 11,
  title: "Ijarah – Leasing",
  part: "part-iii",
  pages: [279, 306],
  minutes: 75,
  difficulty: "Intermediate",
  objectives: [
    "Define Ijarah and its essentials, and compare it with Bai‘.",
    "State the general juristic rules of Ijarah, including what can be leased and when rent becomes due.",
    "Explain execution of Ijarah, determination of rent (including benchmarks), sub-lease, security and liabilities of the parties.",
    "Explain termination, amendment and treatment of default in rent.",
    "Evaluate conventional financial, security and operating leases from the Shari’ah angle.",
    "Describe Ijarah Muntahia-bi-Tamleek: procedure, methods of ownership transfer, sale and lease-back, Takaful and destruction of assets.",
    "Explain Ijarah Sukuk and the potential of Ijarah; apply Box 11.1 risk mitigation and the Box 11.3 case study."
  ],
  why: "Ijarah is the mode the author regards as having the greatest potential — for autos, housing, machinery and sovereign Sukuk. Its key test is simple but strict: ownership and its risk must stay with the lessor, and lease and sale must stay separate. Most exam questions on leasing turn on these two principles.",
  overview: "The chapter defines Ijarah and its essentials, sets out general juristic rules (execution, rent, sub-lease, security, liabilities, termination, default), reviews modern leases (financial, security, operating) and their Shari’ah problems, and explains Islamic banks’ Ijarah Muntahia-bi-Tamleek with procedure, issues, securitisation and potential, ending with guidelines, risk mitigation, a comparison with conventional auto leasing, a case study and accounting.",
  summarySection: null,
  topics: [
    {
      id: "t11.1", section: "11.1", title: "Introduction: Meaning and Legitimacy of Ijarah", pages: [279, 279], tier: "core",
      concepts: ["ijarah"],
      intuition: "What exactly is being ‘sold’ in a lease?",
      simple: "Ijarah (from al-’Ajr — compensation) is the transfer of a known usufruct of a specified asset for a specified period against a specified lawful rent — or hiring work for a wage. Jurists call it the sale of usufruct, not of the asset. It is permissible by Qur’an, Sunnah and Ijma‘a.",
      academic: [
        "Contemporary jurists see great potential in Ijarah as an alternative to interest. It is permissible by Ijma‘a; Imam Shafi‘i and others see two Qur’anic verses as general proof. Literally from al-’Ajr — compensation, consideration, counter value (al‘Iwad); as a contract, hiring or renting an asset for its usufruct, and hiring labour or work against a wage; it covers rules of labour, renting, Ju‘alah and contracts for usufruct of goods and services; also termed Kira’a and Istijar. In Islamic law it is a contract of a known and proposed usufruct of specified assets for a specified time against a specified lawful consideration — rent for things, wages for people. Jurists: the sale of usufruct (not of ‘Ain) against Ujrah — houses, shops, animals, jewellery, clothes. It lets people use assets they cannot own. The chapter focuses on Ijarah of assets as a mode of finance, usually Ijarah Muntahia-bi-Tamleek."
      ],
      exam: "Ijarah = transfer of known usufruct of a specified asset for a specified period against specified lawful rent (or work for wages); sale of usufruct; legitimacy: Qur’an, Sunnah, Ijma‘a.",
      keyPoints: [
        "Also called Kira’a, Istijar.",
        "Covers asset hire and labour hire.",
        "From al-Ajr: compensation or counter value; also called Kira’a and Istijar."
      ],
      definitions: [
        { term: "Ijarah", meaning: "A contract transferring a known usufruct of a specified asset for a specified period against a specified lawful rent (or hiring work against wages) — the sale of usufruct." }
      ],
      related: ["t11.2", "t3.2.1.b"],
      quickCheck: { q: "In Ijarah, what is transferred to the lessee?", options: ["Ownership of the asset", "The usufruct of the asset", "The asset’s risk", "A loan"], answer: 1, explanation: "p. 279." },
      confusions: [
        { wrong: "Ijarah covers only the renting of property.", right: "Ijarah covers the hire of assets (rent) and of people’s work (wages); Ju‘alah and other usufruct contracts fall under its rules (p. 279)." }
      ],
      examples: [
        { title: "Two kinds of Ijarah", kind: "textbook", text: "Renting a delivery van is Ijarah of things, and the consideration is rent (Ujrah). Hiring a doctor or tailor is Ijarah of persons, and the consideration is a wage (Ajr) (p. 279)." }
      ]
    },
    {
      id: "t11.2", section: "11.2", title: "Essentials of Ijarah Contracts", pages: [280, 280], tier: "core",
      concepts: ["ijarah"],
      intuition: "What five things must every Ijarah have?",
      simple: "Five essentials: a contract; known usufruct transferred; of a particular asset; for a specified period; against agreed rent. The lessee is ‘Ameen’ (trustee) — liable only for negligence. The leased asset must be like ‘land’ — not consumed in use, not money. Rent: Ujrah (things) or Ajr (wages); Ajr al-Musammah if fixed, Ajr al-Mithl if set by a judge.",
      academic: [
        "Essentials: (1) a contract; (2) known usufruct transferred; (3) of a particular asset; (4) for a specified period; (5) against agreed rental. Parties must be capable. The lessee is Ameen, entitled to use the asset only for the specified purpose; liable for loss by negligence but not for loss beyond his control (AAOIFI 7/1/4). Subject matter: property/assets (houses, vehicles) or labour (engineer, doctor, tailor); the Majallah adds letting animals — analogous to modern leasing. The leased asset must belong to the category of land — real assets not altered in form by use — not things consumed in use nor financial/monetary assets; the lessor as owner bears ownership expenses and risks. Consideration is Ujrah (rent) or Ajr (wages); fixed in the contract — Ajr al-Musammah; determined by judge/arbitrator — Ajr al-Mithl."
      ],
      exam: "Essentials: contract; known usufruct; particular asset; specified period; agreed rent. Lessee = Ameen (liable only for negligence). Asset not consumed in use. Ajr al-Musammah vs Ajr al-Mithl.",
      keyPoints: ["Lessor bears ownership risks and expenses."],
      definitions: [
        { term: "Ameen", meaning: "Trustee — the lessee holds the leased asset in trust, liable only for negligence or misuse." },
        { term: "Ajr al-Musammah / Ajr al-Mithl", meaning: "Rent/wage fixed in the contract / rent or wage determined by a judge or arbitrator (customary)." },
        { term: "Ajr al-Musammah", meaning: "Rent or wage fixed in the contract." },
        { term: "Ajr al-Mithl", meaning: "Rent or wage determined by a judge or arbitrator (the customary rate)." }
      ],
      related: ["t11.2.1", "t2.5.3"],
      quickCheck: { q: "When is the lessee liable for damage to the leased asset?", options: ["Always", "Only when caused by his negligence or misuse", "Never", "Only in operating leases"], answer: 1, explanation: "p. 280." },
      confusions: [
        { wrong: "The lessee is liable for any damage to the leased asset.", right: "The lessee is Ameen (trustee): liable only for loss from his negligence or misuse, not for loss beyond his control (p. 280)." }
      ],
      examples: [
        { title: "Lessee as trustee", kind: "textbook", text: "A leased car is stolen although the lessee locked and parked it properly. The lessee, as Ameen, is not liable; the lessor bears the loss. Had he left it unlocked with the keys inside, he would be liable for negligence (p. 280)." }
      ]
    },
    {
      id: "t11.2.1", section: "11.2.1", title: "Ijarah and Bai‘ Compared", pages: [280, 281], tier: "core",
      concepts: ["ijarah", "bai"],
      intuition: "Both lease and sale transfer something for value. What is the decisive difference?",
      simple: "In sale, ownership of the corpus passes permanently with risk and reward; in Ijarah only the usufruct passes and ownership, risks and ownership expenses stay with the lessor. A lease is always time-bound. If the lessee becomes owner (gift, inheritance), the Ijarah ends.",
      academic: [
        "Ijarah resembles sale since something is transferred for valuable consideration, so the benefit and consideration must be known. In sale, ownership of the corpus transfers to the purchaser; in Ijarah the corpus remains with the lessor and only usufruct passes; ownership-related risks and expenses are borne by the lessor. If the lessee becomes owner in any way (gift, inheritance), the Ijarah ceases (Majallah Art. 442). A lease is always time-bound; sale is a definite transfer of ownership with its risk and reward at execution."
      ],
      exam: "Sale: corpus ownership, permanent, risk to buyer. Ijarah: usufruct only, time-bound, ownership risk/expenses with lessor; ends if lessee becomes owner.",
      keyPoints: ["Lease must terminate at some point.", "A lease is always time-bound; a sale transfers ownership permanently."],
      table: { caption: "Ijarah vs Bai‘ (Section 11.2.1)", head: ["Aspect", "Bai‘ (sale)", "Ijarah (lease)"], rows: [["What passes", "Ownership of the corpus", "Usufruct only"], ["Duration", "Permanent", "Time-bound"], ["Ownership risk and expenses", "Buyer (after sale)", "Lessor"], ["Consideration", "Price", "Rent"], ["If transferee becomes owner", "—", "Ijarah ceases"]] },
      related: ["t3.2.1.b", "t5.2"],
      quickCheck: { q: "A lessee inherits the leased house from the lessor. What happens to the Ijarah?", options: ["It continues", "It ceases, because the lessee has become owner", "Rent doubles", "It becomes Murabaha"], answer: 1, explanation: "p. 280." },
      confusions: [
        { wrong: "If the lessee inherits the leased asset, the lease continues.", right: "Once the lessee becomes owner by gift, inheritance or otherwise, the Ijarah ceases (p. 280)." }
      ],
      examples: [
        { title: "Inheritance ends the lease", kind: "textbook", text: "A tenant leases a flat from his father for five years; the father dies in year two and the tenant inherits the flat. The Ijarah ceases, because one cannot lease from oneself (pp. 280–281)." }
      ]
    },
    {
      id: "t11.3", section: "11.3", title: "General Juristic Rules of Ijarah", pages: [281, 282], tier: "core",
      concepts: ["ijarah"],
      intuition: "What can be leased, and when does rent start?",
      simple: "Only things with usufruct whose corpus is not consumed (not money, food, fuel, candles, ammunition); leasing money is a loan and its rent is interest. Asset and rent should not be of the same genus. Kasani’s conditions: ascertained usufruct; specified period; possible benefit; delivery before rent is due; capable worker; lawful use; conventional usufruct. Contemporary jurists: rent is due only once the asset is in the lessee’s possession in usable form. Earnest money and advance rent are allowed.",
      academic: [
        "Jurists are almost unanimous that Ijarah is valid for things with usufruct whose corpus is not consumed; candles, cotton, food, fuel suit sale, not lease; Kasani: dirhams, dinars and bullion are ‘Ain not usufruct. The genus of asset and rent should not be the same (house for house). Leasing money, edibles, fuel or ammunition is deemed a loan; rent charged is interest. Assets from which usufruct is almost impossible (saline, unproductive land) cannot be leased. Valid for permissible usufruct with consent; the asset belongs to the lessor as owner or lessee with permission to sub-lease; joint assets may be leased to more than one lessee; free of Gharar about usufruct and counter value.",
        "Rent can be fixed only when the property is known (inspection or description); conditions expediting or deferring rent are allowed; rent should follow local convention and be just (Qur’an 65:6 on nursing women’s recompense). Kasani’s conditions: usufruct ascertained; lease period specified (for service, either work or time known); benefit possible — no lease of a nonexistent asset not precisely describable; delivery essential — no rent due merely on execution unless the asset is available, though advance rent may be taken if availability is ensured; the worker must be capable (no hire of a runaway animal or usurped assets); usufruct lawful; usufruct conventional.",
        "Hanafis: rent is not due by the contract alone — usufruct must emerge; Shafi‘is: due on finalisation, presuming use, i.e. once in the lessee’s possession and usable. Contemporary jurists: rent due only after the asset is in the lessee’s possession in usable form (AAOIFI 5/2/2). If the asset is to be purchased at the prospective lessee’s request, the lessor may take earnest money; if the customer breaches, the lessor retains actual loss (processing, purchase, re-leasing or disposal) and returns the excess. AAOIFI: rent paid when due, in instalments or as agreed; advance rent adjusted later; earnest money at execution may be advance rent."
      ],
      exam: "Leasable: non-consumable assets with usufruct (not money, food, fuel). Leasing money = loan; rent = interest. Kasani’s conditions. Rent due only when asset delivered in usable form. Earnest money/advance rent allowed; actual loss retained on breach.",
      keyPoints: [
        "Asset and rent of same genus not allowed (house for house).",
        "Unproductive saline land cannot be leased.",
        "No rent merely because the contract is signed.",
        "Leasing money, edibles or fuel is really a loan, and “rent” on it is interest.",
        "Contemporary jurists agree rent accrues only once the asset is with the lessee in usable form (Hanafi and Shafi‘i views converge)."
      ],
      conditions: [
        "Usufruct ascertained",
        "Lease period specified",
        "Benefit possible (asset exists or precisely describable)",
        "Asset delivered/available before rent is due",
        "Lessor/worker capable of delivering",
        "Usufruct lawful",
        "Usufruct conventional"
      ],
      related: ["t11.3.1", "t4.2.5"],
      quickCheck: { q: "Under contemporary scholars’ view (AAOIFI), when does Ijarah rental become due?", options: ["When the bank pays the supplier", "When the contract is signed", "After the asset is in the lessee’s possession in usable form", "At the end of the lease"], answer: 2, explanation: "p. 282." },
      examples: [
        { title: "Saline land", kind: "textbook", text: "Land so saline it cannot produce anything cannot be leased — benefit from the asset must be possible (p. 281)." }
      ],
      confusions: [
        { wrong: "A house can be leased in exchange for the use of another house.", right: "Kasani: the genus of the leased asset and the rent should not be the same (house for house, ride for ride) (p. 281)." }
      ]
    },
    {
      id: "t11.3.1", section: "11.3.1", title: "Execution of an Ijarah Contract", pages: [282, 283], tier: "core",
      concepts: ["ijarah", "wad"],
      intuition: "Can a bank sign a lease for an asset it doesn’t own yet?",
      simple: "For an existing asset (e.g. a liveable house) Ijarah may take effect immediately or from a future date — unlike sale — since the lessor keeps ownership risk. Ijarah Mosufah bil Zimmah (described asset, replaceable units) can also be future-dated. But a specific identified asset cannot be leased before it exists or is owned; the lessor enters into a promise to lease, may take advance rent, then buys the asset (in sale and lease-back, the sale precedes the lease).",
      academic: [
        "Depending on the asset, Ijarah may be executed before or after the lessor’s possession for instant or future commencement. For an existing asset, execution for instant or future enforcement is allowed because usufruct is clear; future enforcement, unlike Bai‘, is allowed because the lessor remains owner bearing risk. Ijarah Mosufah bil Zimmah (quality specified; damage to a particular unit does not terminate) may be instant or future. If a particular asset is specified, the contract cannot be executed before its existence or ownership (or usufruct, for sub-lease); if destroyed, the contract ends. A lessor not owning the asset can enter a promise to lease; advance rent is adjusted against rent falling due. Islamic banks’ leases usually fall here; the lessor buys the asset from the market or, specially, from the promisee — sale and lease-back — where the sale must precede the lease and the lease must not be a condition (AAOIFI 3/1, 3/2)."
      ],
      exam: "Existing asset/Mosufah bil Zimmah: Ijarah may be future-dated (unlike sale). Specific asset not yet owned: only a promise to lease (advance rent allowed); buy, then lease. Sale and lease-back: sale first, not conditional.",
      keyPoints: [
        "Future-dated Ijarah allowed; future-dated sale not.",
        "Ijarah (unlike sale) may be made effective from a future date because ownership and risk stay with the lessor.",
        "In sale and lease-back the sale contract must precede the lease and must not be a condition of it."
      ],
      related: ["t5.7", "t11.5.1"],
      quickCheck: { q: "A bank has not yet bought a specific machine a client wants leased. What should it sign now?", options: ["The Ijarah agreement", "A promise to lease (advance rent may be taken)", "A sale deed", "Nothing at all"], answer: 1, explanation: "p. 283." },
      confusions: [
        { wrong: "A bank may sign the Ijarah of a specific asset before it owns the asset.", right: "For a specified asset, the lease cannot be executed before the lessor owns it; the bank should take a promise to lease and may take advance rent to be adjusted later (p. 283)." }
      ],
      examples: [
        { title: "Future-dated lease", kind: "textbook", text: "On 1 January a landlord leases a completed house to a client with effect from 1 March. This is valid, although a sale effective from a future date is not, because the lessor keeps ownership and its risks until then (pp. 282–283)." }
      ]
    },
    {
      id: "t11.3.2", section: "11.3.2", title: "Determination of Rent (Benchmarks and Floating Rentals)", pages: [283, 284], tier: "core",
      concepts: ["ijarah", "benchmark"],
      intuition: "Can Ijarah rent be linked to LIBOR or inflation?",
      simple: "Rent may be based on the lessor’s total asset cost if agreed. Once fixed it can’t be raised unilaterally, but different rates for different phases, periodic increases (e.g. 5% a year), a well-defined benchmark, tax pass-through or inflation linkage may be agreed for long leases. A minority objects to LIBOR; the author: any benchmark can price a lease if the lessor bears asset risk, though non-interest benchmarks are desirable. First-period rent must be specified; a cap/floor (e.g. ±5%) avoids Gharar.",
      academic: [
        "Determining rent on the aggregate cost incurred by the lessor is permissible if agreed and other conditions are met. After agreement the lessor cannot increase rent unilaterally. Different rates for phases based on an agreed benchmark are allowed; parties may review period or rent by consent. Long leases may provide increases after a period, tie rent to a variable well-defined benchmark, or enhance it by a stipulated proportion (e.g. 5% yearly) — benchmarks are recommended to avoid disputes given the binding contract (AAOIFI 5/2/3); rent may increase with property or government taxes, or with inflation (5% inflation → 5% rent rise).",
        "LIBOR: a minority says it makes the transaction interest-like; the author says this is not correct — benchmarking to an interest rate does not render it Haram so long as Shari’ah requirements are met. Inflation, price indices, growth rates or real-sector returns can be used; scholars dislike interest benchmarks for periodic increases but allow them because the essential difference is that the lessor bears full risk of the corpus: if usufruct is lost without lessee fault, no rent is due; in interest-based lease finance the lessee bears ownership expenses. Floating rent is valid if the first period’s rent is specified; non-interest benchmarks are desirable. A ceiling/floor on changes (e.g. not more than 5%) avoids Gharar/Jahala (AAOIFI 5/2/5)."
      ],
      exam: "Rent: may reflect asset cost; no unilateral increase; phased/benchmark/indexed rents for future periods allowed; LIBOR usable (author) but non-interest benchmarks preferred; first-period rent fixed; cap and floor.",
      keyPoints: ["Essential difference from interest: lessor bears corpus risk.", "Cap/floor e.g. ±5%."],
      debate: [
        { issue: "May Ijarah rentals be benchmarked to LIBOR?", criticism: "A minority of scholars: interest benchmarks make the transaction similar to interest and impermissible.", response: "The author and Usmani: as long as Shari’ah requirements (especially lessor bearing corpus risk) are met, any benchmark can price a lease; benchmarking to interest does not render it Haram.", alternative: "Scholars dislike interest benchmarks for periodic increases and recommend inflation, price indices or real-sector returns.", takeaway: "Permissible in principle; desirable to use non-interest benchmarks for distinctiveness." }
      ],
      related: ["t4.2.5", "t4.7.4", "t17.4.3"],
      quickCheck: { q: "Which condition must be met for a floating (benchmarked) Ijarah rental to be valid?", options: ["The rent must never change", "The rental for the first period must be specified", "It must use LIBOR", "The lessee bears asset risk"], answer: 1, explanation: "p. 284." },
      examples: [
        { title: "Rent tied to inflation and taxes", kind: "textbook", text: "Rent may rise with the inflation rate (e.g. 5% inflation → 5% more rent) or with increases in property tax, if agreed in advance (p. 283)." }
      ],
      confusions: [
        { wrong: "Using LIBOR as a benchmark makes Ijarah interest-based.", right: "A benchmark only prices the rent; what distinguishes Ijarah is that the lessor bears ownership risk. Scholars prefer non-interest benchmarks, and a cap/floor avoids Gharar (p. 284)." }
      ]
    },
    {
      id: "t11.3.3", section: "11.3.3", title: "Sub-lease by the Lessee", pages: [284, 285], tier: "supporting",
      concepts: ["ijarah"],
      intuition: "Can a lessee sublet at a higher rent and keep the difference?",
      simple: "Sub-lease is permissible with the lessor’s consent. All schools allow it at equal or lower rent. Higher rent: Shafi‘is and Hanbalis allow keeping the surplus; Abu Hanifa requires giving it to charity unless the sub-lessor improved the property or used a different currency. Contemporary scholars prefer the Shafi‘i/Hanbali view. But selling rights to share rentals without transferring ownership is selling a receivable at a discount — Riba.",
      academic: [
        "Sub-lease is permissible with the lessor’s consent (can be in the agreement). All schools permit it if the sub-rent is equal to or less than the rent paid. If higher: Shafi‘is allow the sub-lessor to keep the surplus (preferred Hanbali view too); Abu Hanifa: surplus to charity, unless the sub-lessor developed the property or rented it in a different currency. Contemporary scholars prefer the Shafi‘i and Hanbali view (AAOIFI 3/3). However, if a lessee sub-leases to many and invites others to share rentals without transferring ownership, or charges them a specified amount to participate, this is not acceptable — assigning the right to receive rent for payment amounts to selling a receivable at a discount, which is Riba."
      ],
      exam: "Sub-lease with consent; higher rent surplus: Shafi‘i/Hanbali — keep (preferred); Abu Hanifa — charity unless improved/different currency. Selling rent-sharing rights without ownership = Riba.",
      keyPoints: ["Rent receivables cannot be sold at a discount."],
      related: ["t11.5.3"],
      quickCheck: { q: "According to contemporary scholars, can a sub-lessor keep a surplus when sub-renting at a higher rent?", options: ["No, it must go to charity in all cases", "Yes — the Shafi‘i/Hanbali view is preferred", "Only if the lessor agrees to share", "Only for land"], answer: 1, explanation: "p. 284." },
      distinctions: [
        { a: "Abu Hanifa", b: "Shafi‘is and Hanbalis (preferred today)", text: "Abu Hanifa: surplus rent from a sub-lease goes to charity unless the lessee improved the property or rents in another currency; Shafi‘is/Hanbalis: the sub-lessor may keep the surplus (p. 284)." }
      ],
      confusions: [
        { wrong: "A lessee may sell shares in future rentals to investors without selling any part of the asset.", right: "That assigns a receivable for money — selling debt at a discount, which is Riba (p. 285)." }
      ],
      examples: [
        { title: "Sub-letting at a higher rent", kind: "textbook", text: "A lessee pays 20,000 a month and, with the lessor’s consent, sub-lets for 25,000. On the Shafi‘i and Hanbali view preferred today, he may keep the 5,000. Abu Hanifa would send it to charity unless he improved the property or charged in another currency (pp. 284–285)." }
      ]
    },
    {
      id: "t11.3.4", section: "11.3.4", title: "Security/Guarantee in Ijarah", pages: [285, 285], tier: "supporting",
      concepts: ["ijarah", "rihn"],
      intuition: "Can a lessor take security, and what can it recover from it?",
      simple: "Because rent due is a debt and the lessee holds the asset as a trustee, the lessor can demand security or a guarantee. On negligence or default it recovers actual loss (not cost of funds/opportunity cost); anything above due rent would be Riba.",
      academic: [
        "Ijarah creates a debt of payable rent, so the lessor may demand security/guarantee; also permissible because the lessee holds the asset as trustee and is liable for proven negligence. On such loss or rent default, the lessor recovers actual loss, excluding cost of funds or opportunity cost, from the security; any amount taken as income over due rent would be Riba (AAOIFI 5/2/5, 6/1–6/3, 7/1/4)."
      ],
      exam: "Security allowed; recover only actual loss/due rent — no cost of funds; excess = Riba.",
      keyPoints: ["Opportunity cost excluded."],
      related: ["t7.15", "t11.3.5"],
      quickCheck: { q: "From the lessee’s security, a lessor may recover:", options: ["Rent for the remaining lease period plus cost of funds", "Actual loss/due rent only, excluding opportunity cost", "Any amount it chooses", "Nothing"], answer: 1, explanation: "p. 285." },
      confusions: [
        { wrong: "A lessor may recover cost of funds from the lessee’s security on default.", right: "Only the actual loss can be recovered; anything above due rent is Riba (p. 285)." }
      ],
      examples: [
        { title: "Recovering from the security deposit", kind: "textbook", text: "A lessee defaults on 60,000 of rent; the lessor holds a 100,000 deposit. It may deduct the 60,000 owed and any actual loss, but not a cost-of-funds charge, and must return the rest (p. 285)." }
      ]
    },
    {
      id: "t11.3.5", section: "11.3.5", title: "Liabilities of the Parties", pages: [285, 285], tier: "core",
      concepts: ["ijarah", "risk-sharing"],
      intuition: "Who pays for what during a lease?",
      simple: "The lessee is liable only for misuse or negligence. Ownership liabilities (property taxes, major repairs, risk of loss beyond the lessee’s control) are the lessor’s; usage liabilities (water, electricity, running costs) are the lessee’s. Shari’ah boards allow customary expenses to be allocated by free agreement. Joint owners share risk and rent in proportion to shares.",
      academic: [
        "No liability on a lessee or employee unless transgression, wilful waste or damage is established; then he compensates or replaces. Ownership liabilities are the lessor’s; use liabilities the lessee’s — e.g. property taxes on the owner, water tax and electricity on the tenant (AAOIFI 5/1/7). Contemporary Shari’ah boards link the owner’s responsibility for expenses on which continued performance depends to custom and free agreement, so contrary agreement may shift them. The leased property remains at the lessor’s risk throughout: harm beyond the lessee’s control is the lessor’s, misuse or negligence the lessee’s. A jointly owned property may be leased; owners bear risk and share rent pro rata."
      ],
      exam: "Lessor: ownership liabilities (taxes on property, major repairs, loss beyond lessee control). Lessee: usage costs and negligence. Joint owners pro rata.",
      keyPoints: [
        "Risk of loss without lessee fault stays with lessor throughout.",
        "Jointly owned assets can be leased; risk and rent are shared by ownership proportions."
      ],
      table: { caption: "Allocation of liabilities in Ijarah", head: ["Lessor (owner)", "Lessee (user)"], rows: [["Property/ownership taxes", "Water, electricity, running costs"], ["Major repairs, defects preventing use", "Day-to-day maintenance"], ["Loss/destruction without lessee fault", "Loss due to misuse or negligence"], ["Takaful of the asset (can be priced into rent by consent)", "Following policy conditions"]] },
      related: ["t4.2.9", "t11.4.4", "t11.5.2"],
      quickCheck: { q: "In a house lease, which cost is the lessor’s responsibility?", options: ["Electricity bills", "Water tax", "Property taxes relating to ownership", "Day-to-day cleaning"], answer: 2, explanation: "p. 285." },
      examples: [
        { title: "Leased house bills", kind: "textbook", text: "Property taxes fall on the owner; water, electricity and other use-related bills fall on the lessee (p. 285)." }
      ]
    },
    {
      id: "t11.3.6", section: "11.3.6", title: "Termination/Amendment and Failure in Payment of Rent", pages: [286, 287], tier: "core",
      concepts: ["ijarah", "late-payment-penalty"],
      intuition: "When does a lease end — and can the lessor demand the rest of the rent if it ends early?",
      simple: "Ijarah is binding; no unilateral termination, but amendment or termination by consent. It ends if the asset can no longer give usufruct (unless Mosufah bil Zimmah — replace the unit). Sale to the lessee ends it; sale to a third party transfers it. Death does not end it (heirs of the lessee may end it if too onerous). The lessor may terminate for the lessee’s contravention — but can claim only due rent (plus negligence damages), never rent for the remaining period. Advance rent for an unexpired period is refunded on force majeure. Late rent: no increase (Riba); a charity undertaking may be stipulated; banks should rely on repossession or collateral.",
      academic: [
        "11.3.6: Ijarah is binding; a unilateral unconditional termination option is un-Islamic; amendment or termination by mutual consent. If damaged so as to give no usufruct, the contract ends; if an impediment prevents the normal objective, the lessee may terminate; rent may be adjusted for partial damage. In Ijarah Mosufah bil Zimmah the lessor replaces the unit. If the lessee stops using the asset without consent, rent continues. Sale to the lessee terminates it; sale to a third party does not — rights and obligations transfer; the lessee’s consent is not required; an uninformed purchaser may cancel. Contemporary jurists: death of either party does not end Ijarah, though the lessee’s heirs may terminate if too onerous. The lessor may provide for termination on contravention; the lessee then pays due rent, not the remaining period’s rent. Conventional leases requiring remaining rent on termination reveal an interest-bearing loan under the cover of lease — against Shari’ah. On termination the lessor takes the asset back; negligence damages may be claimed; default may be a termination ground. Advance rent for the unexpired period is refunded on force majeure or mutual dissolution, unless the lessee fails to return the asset.",
        "11.3.7: due rent is a debt; any charge on it is Riba. Scholars allow a donation/penalty to charity, stipulated ab initio, varying with period of default and possibly a percentage per annum; it must not be the lessor’s income. Hence banks should include a clause allowing repossession or enforcement of collateral for wilful default."
      ],
      exam: "Binding; mutual termination; ends on loss of usufruct (replace unit if Mosufah bil Zimmah); not ended by death or sale to third party. On lessor termination for breach: due rent + negligence damages only — no remaining-period rent. Late rent: charity undertaking; repossession/collateral.",
      keyPoints: [
        "Remaining-period rent clause = hallmark of disguised interest.",
        "Advance rent refunded on force majeure.",
        "Rent continues if lessee stops using without consent.",
        "If the lessor sells the asset to a third party, the lease continues with the buyer; the lessee’s consent is not needed.",
        "Late-payment penalties go to charity; the bank may instead repossess or enforce collateral for wilful default."
      ],
      subsections: [
        { number: "11.3.6", title: "Termination/Amendment of the Contract", page: 286, points: ["Binding; mutual consent", "Destruction; Mosufah bil Zimmah", "Sale; death", "No remaining-period rent"] },
        { number: "11.3.7", title: "Failure in Payment of Due Rent", page: 287, points: ["Rent = debt; no increase", "Charity penalty", "Repossession/collateral"] }
      ],
      related: ["t7.13", "t11.5.2"],
      quickCheck: { q: "A lessor terminates an Ijarah because the lessee breached the agreement. What can the lessor claim?", options: ["Rent for the entire remaining period", "Rent due up to termination (plus damages for negligence), not future rent", "Double rent", "Interest on unpaid rent"], answer: 1, explanation: "p. 286." },
      examples: [
        { title: "Termination for breach", kind: "textbook", text: "If the lessor terminates because the lessee breached the agreement, the lessee pays rent due to that date (and any damage from negligence) — never the rent for the remaining period, which conventional leases often demand (p. 286)." }
      ],
      confusions: [
        { wrong: "The death of either party ends an Ijarah.", right: "Contemporary jurists hold it does not end, though the lessee’s heirs may terminate if the rent becomes too onerous (p. 286)." }
      ]
    },
    {
      id: "t11.4", section: "11.4", title: "Modern Use of Ijarah: Financial, Security and Operating Leases", pages: [287, 289], tier: "core",
      concepts: ["ijarah", "conventional-leasing"],
      intuition: "How do conventional leases work — and why are most of them disguised loans?",
      simple: "Leasing began as real business but is widely used as finance (tax benefits). Financial lease/hire-purchase: long term, rent = cost + interest, starts when the lessor pays the supplier, lessee bears risk, prepayment fines, compound interest on default. Security/financing lease: a disguised security agreement transferring all risks to the lessee. Operating lease: lessor retains ownership and takes back the asset — compatible with Shari’ah if other conditions are met; suits aircraft and ships.",
      academic: [
        "Leasing is a normal real-sector activity, used for financing largely due to tax concessions; in Islamic finance it matters also because of the asset-based nature of investment; bank leasing is governed by the rules of Ijarah. Forms used by NBFIs and banks (e.g. in Germany and Japan): financial lease (hire–purchase), financing (security) lease and operating lease.",
        "11.4.1 Financial lease/hire–purchase: period ≈ useful life to amortise cost with market return; rent computed as total cost plus stipulated interest divided by months; lease begins when the price is paid, even before delivery; ownership risk on the lessee; the lessor has no further interest; lessee buys at a set or market price; not cancellable; prepurchase with a fine (e.g. 5% of remaining funds); asset is security, repossessed without court order; tax depreciation benefit; lessor can sell the equipment. Compound interest on default; outcome can be worse than a credit purchase — the lessee must keep paying even if he no longer needs the asset and cannot sell it.",
        "11.4.2 Security or financing lease: a financing transaction and disguised security agreement, transferring all ownership risks and rewards to the lessee. 11.4.3 Operating lease: owner gives possession for rent, retains ownership and takes it back at the end — fully compatible with Shari’ah if other conditions are fulfilled; suits high-cost, long-production assets (aircraft, ships); rarely used by banks; NBFIs maintain assets for re-lease and bear obsolescence, recession and demand risk."
      ],
      exam: "Financial lease/hire-purchase: cost+interest rent from payment date, lessee bears risk, prepayment fine, compound interest → non-compliant. Security lease: disguised loan. Operating lease: compatible if conditions met (aircraft, ships).",
      keyPoints: ["Conventional rent may start before delivery — prohibited in Ijarah.", "Operating lease closest to classical Ijarah."],
      subsections: [
        { number: "11.4.1", title: "Financial Lease or Hire–Purchase", page: 288, points: ["Rent = cost + interest", "Starts at payment", "Lessee bears risk"] },
        { number: "11.4.2", title: "Security or Financing Lease", page: 288, points: ["Disguised security agreement"] },
        { number: "11.4.3", title: "Operating Lease", page: 289, points: ["Compatible with Shari’ah", "Lessor bears obsolescence risk"] }
      ],
      related: ["t11.4.4", "t11.5"],
      quickCheck: { q: "Which conventional lease does the author consider fully compatible with Shari’ah if other conditions are met?", options: ["Hire–purchase", "Security lease", "Operating lease", "Finance lease with fixed residual value"], answer: 2, explanation: "p. 289." },
      table: { caption: "Conventional lease forms (pp. 288–289)", head: ["Form", "Key feature", "Shari’ah view"], rows: [["Financial lease / hire–purchase", "Rent from payment date; lessee bears ownership risk; sale built in", "Not acceptable as structured"], ["Security (financing) lease", "Disguised secured loan; all risks on lessee", "Not acceptable"], ["Operating lease", "Lessor keeps ownership; asset returned at end", "Compatible, if lessor bears ownership costs"]] },
      examples: [
        { title: "Stuck with a five-year lease", kind: "textbook", text: "Under a conventional five-year lease a lessee who no longer needs the asset after two years must keep paying and cannot sell it, whereas a credit buyer could sell the asset to repay (p. 288)." }
      ]
    },
    {
      id: "t11.4.4", section: "11.4.4", title: "Appraisal of Conventional Leases from the Shari’ah Angle", pages: [289, 289], tier: "core",
      concepts: ["ijarah", "conventional-leasing"],
      intuition: "Four features of modern leases — which break Shari’ah rules?",
      simple: "(1) Ownership transfers at expiry (hire-purchase includes sale from the start). (2) Rent starts when funds are paid to the supplier — Shari’ah: only once the lessee can use the asset. (3) All risks shifted to the lessee, residual value fixed in advance — Shari’ah: lessor bears defects preventing use, lessee only day-to-day maintenance. (4) Even conventional operating leases put risks on the lessee; in Islamic operating leases the lessor bears upkeep and ownership costs, for a specified period.",
      academic: [
        "(1) At expiry ownership transfers free or at a nominal price; in hire–purchase the contract includes sale from the start and payments include rent and cost; in finance leases transfer may or may not be agreed. (2) The lessor charges rent as soon as he pays the supplier — leasing before buying and possessing, getting reward without ownership risk; in Shari’ah rent starts from the date the lessee can benefit, after delivery. (3) The lessor shifts all risks to the lessee, especially when residual value is fixed; in Shari’ah, expenses to rectify defects preventing use are the lessor’s, day-to-day maintenance the lessee’s — the major difference. (4) Conventional operating leases also place risks and expenses on the lessee; Islamic operating leases require the lessor to bear upkeep, risks and costs of ownership, and are for a specified period, not the entire useful life, ending unless renewed by consent."
      ],
      exam: "Problems: sale built into lease; rent before delivery; all risk on lessee/fixed residual; lessee bears costs even in operating lease. Islamic: separate transfer; rent after usable delivery; lessor bears corpus risk; specified period.",
      keyPoints: ["Major difference: who rectifies defects preventing use."],
      table: { caption: "Conventional lease features vs Shari’ah requirements (Section 11.4.4)", head: ["Conventional feature", "Shari’ah requirement"], rows: [["Ownership transfer built into lease", "Separate sale or gift, via unilateral promise"], ["Rent from date funds paid to supplier", "Rent only once lessee can use the delivered asset"], ["All risks and costs on lessee; residual value fixed", "Lessor bears ownership risk and defect repairs; lessee day-to-day maintenance"], ["Operating lease: lessee bears risks", "Lessor bears upkeep and ownership costs; specified period"]] },
      related: ["t11.5", "t11.5.2"],
      quickCheck: { q: "From when may an Islamic lessor charge rent?", options: ["When funds are released to the supplier", "When the lessee is able to benefit from the delivered asset", "When the MoU is signed", "When the L/C is opened"], answer: 1, explanation: "p. 289." },
      confusions: [
        { wrong: "In an Islamic operating lease the lessee bears all risks and expenses, as in conventional practice.", right: "The Islamic lessor must bear upkeep of the corpus and all ownership risks; the lessee bears day-to-day running costs (p. 289)." }
      ],
      examples: [
        { title: "When rent starts", kind: "textbook", text: "Under a conventional lease, rent starts the day the lessor pays the supplier. Under Shari’ah rules, rent starts only once the asset is delivered and the lessee can use it (p. 289)." }
      ]
    },
    {
      id: "t11.4.5", section: "11.4.5", title: "Combining Two Contracts: Transferring Ownership at the End", pages: [289, 290], tier: "core",
      concepts: ["imbt", "wad", "two-contracts"],
      intuition: "The lessee has effectively paid for the asset — how can ownership pass without making the lease ‘two contracts in one’?",
      simple: "The lease must not contain a precondition of sale or gift. Instead, the lessor gives a separate unilateral promise to sell (binding on the lessor; the lessee may choose) or to gift the asset at the end — gift being fair since the lessee paid cost and return. Objection ‘two bargains in one’ is answered: the Ijarah is effective now; the promise is unilateral and not a transaction until executed; no injustice or Riba (OIC Fiqh Academy, third session).",
      academic: [
        "Ijarah and sale have different rules; ownership cannot be transferred by a sale contract effective on a future date. In commercial leases the lessee pays towards buying the property; justice requires title to pass on full payment — but how, compliantly? Scholars: no precondition of sale or gift in the lease; the lessor may give a separate unilateral promise to sell at termination, binding on the promisor; the lessee has an option; a bilateral promise would become a contract and is prohibited. Alternatively a separate promise to gift — appropriate as the bank recovers cost and return. Objection: IMBT is two contracts in one. Answers: (1) the parties agree on the nature: rent set so that cost and rent are recovered; (2) it consists of an immediately effective Ijarah and a unilateral promise that may or may not become effective — not a transaction until entered into; (3) no injustice, Riba or dispute; it is justifiable that the lessee gets title. A sale at the end of the lease does not contravene any basic principle (OIC Fiqh Academy, third session)."
      ],
      exam: "No sale/gift precondition in Ijarah; separate unilateral promise (sale or gift) binding on promisor only; ‘two contracts in one’ objection answered (effective Ijarah + unilateral promise; no Riba/injustice).",
      keyPoints: ["Bilateral promise = contract → prohibited.", "Gift promise suits full cost recovery."],
      related: ["t5.5.5", "t11.5"],
      quickCheck: { q: "Why is a bilateral promise to buy/sell the leased asset at the end avoided?", options: ["It is too expensive", "A bilateral binding promise becomes a contract (sale), making two contracts in one", "It violates tax laws", "It is required by AAOIFI"], answer: 1, explanation: "p. 290." },
      confusions: [
        { wrong: "A bilateral binding promise to sell and buy at lease end is acceptable.", right: "Scholars require a unilateral promise binding the promisor; the lessee keeps the option not to buy — a bilateral promise becomes a contract (p. 290)." }
      ],
      examples: [
        { title: "Promise to gift at the end", kind: "textbook", text: "A bank leases a car for five years with rent set to recover cost and profit. Instead of a sale clause, it gives a separate unilateral promise to gift the car when the lease ends — fair, since the lessee has paid the full cost and return (pp. 289–290)." }
      ]
    },
    {
      id: "t11.4.6", section: "11.4.6", title: "Takaful/Insurance Expenses", pages: [291, 291], tier: "supporting",
      concepts: ["takaful", "ijarah"],
      intuition: "Who pays to insure a leased car, and what if the claim falls short?",
      simple: "Islamic lessors should use Takaful (insurance allowed only transitionally where Takaful is unavailable). As owner, the bank is the insurer/beneficiary; it may include Takaful cost in the rent by mutual consent. If the lessee breaches policy conditions barring recovery, he is liable; otherwise the bank bears the loss, including any shortfall in the Takaful claim. If ownership transfer becomes impossible without lessee fault, the lessee is compensated for rent above market rent.",
      academic: [
        "Regulators often require leased assets to be insured; Islamic banks should use Takaful, avoiding conventional insurance (Riba and Gharar); many use insurance for lack of Takaful — allowed only transitionally. Criticism: banks pass premiums to lessees through rentals although the lessor has the insurable interest. The bank as owner should be the insurer and beneficiary; including Takaful in acquisition cost for rent is allowed since rent is by mutual consent. If transfer of ownership becomes impossible without cause attributable to the lessee, he must be compensated by the difference between contractual rent paid and market rent (AAOIFI 8/8) — some banks do not abide by this, contrary to the spirit of Islamic finance. The lessee receives a copy of the policy and must observe its conditions; if non-observance bars recovery, he is liable; absent fault, the lessor bears loss; if the Takaful claim is less than the loss, the remainder cannot be charged to the lessee."
      ],
      exam: "Takaful (not insurance, except transitionally); bank = insured owner; cost may be priced into rent by consent; lessee liable only if he breaches policy conditions; claim shortfall borne by bank; AAOIFI 8/8 compensation if transfer impossible without lessee fault.",
      keyPoints: ["Takaful shortfall cannot be charged to the lessee."],
      related: ["t16.5", "t11.5.1"],
      quickCheck: { q: "A leased car is destroyed without lessee fault; the Takaful claim is less than the bank’s loss. Who bears the shortfall?", options: ["The lessee", "The bank (lessor)", "The Takaful operator only", "Shared 50:50"], answer: 1, explanation: "p. 291." },
      examples: [
        { title: "Takaful shortfall", kind: "textbook", text: "If the Takaful company pays less than the bank’s loss, the bank bears the balance; the lessee is liable only if he breached the policy conditions (p. 291)." }
      ],
      confusions: [
        { wrong: "Passing Takaful cost into the rent means the lessee is the insured party.", right: "The bank as owner holds the insurable interest; it may build the cost into the agreed rent by consent, but it remains the policyholder and beneficiary (p. 291)." }
      ]
    },
    {
      id: "t11.5", section: "11.5", title: "Islamic Banks’ Ijarah Muntahia-bi-Tamleek (IMBT)", pages: [291, 293], tier: "core",
      concepts: ["imbt"],
      intuition: "How do Islamic banks turn a lease into a Shari’ah-compliant path to ownership?",
      simple: "Objections to modern leases concern ownership transfer, rent accrual and ownership risks. IMBT fixes these: rent starts when the usable asset is delivered; if the client buys as agent, a separate prior agency applies and pre-delivery loss is the bank’s; the bank bears risk while the client is agent. Hire-purchase is unsuitable. AAOIFI: ownership transfer via separate promise to sell (token, remaining amount or market value), promise to gift, or promise of a contingent gift on final payment. Sale and lease-back needs ~1 year before transfer back (avoid ‘Inah).",
      academic: [
        "Shari’ah objections to modern leases relate to (i) ownership transfer procedure, (ii) accrual of rentals, (iii) lessor’s ownership risks and expenses. Islamic banks adopt IMBT — basically Ijarah with ownership transfer kept separate; close to finance lease except: (1) rent starts when the asset is supplied in usable form, not on payment; (2) if the price is paid to the lessee, a prior agency agreement is required and destruction before delivery is the principal’s loss; (3) the bank bears asset risk while the client is its purchasing agent. Hire–purchase (lease and sale from the start) is unsuitable. Banks buy in response to requests for leases ending in transfer through a separate formal sale or gift. AAOIFI: ownership cannot transfer by a sale contract effective in future; methods: (1) promise to sell for token or other consideration, accelerated payment of the remainder, or market value; (2) promise to gift at the end; (3) promise to gift contingent on an event (e.g. payment of remaining instalments). Transfer must be independent of the Ijarah; the promise unilateral, binding on the promisor, with the other free not to proceed; in (1) and (2) a new contract is needed; in (3) title passes automatically on fulfilment (AAOIFI 8/1–8/7). Transfer may also occur before the end at a stipulated or market price, or through Diminishing Musharakah. Some banks take the lessee’s undertaking to pay market or prestipulated price on termination, with a price schedule including the bank’s loss on early termination. In sale and lease-back IMBT there must be a reasonable period — normally one year — before transfer back, to avoid ‘Inah (AAOIFI 3/4, 8/6)."
      ],
      exam: "IMBT = Ijarah + separate unilateral promise for transfer. Differences from finance lease: rent from usable delivery; agency prior; bank bears risk. AAOIFI transfer methods: promise to sell (token/remaining/market), promise to gift, contingent gift. Sale & lease-back: ~1 year gap.",
      keyPoints: [
        "Contingent gift transfers title automatically on the condition.",
        "Hire–purchase unsuitable.",
        "One-year gap in sale and lease-back to avoid ‘Inah.",
        "Sale and lease-back IMBT: allow about one year before transfer back to avoid ‘Inah."
      ],
      table: { caption: "AAOIFI methods of transferring ownership in IMBT", head: ["Method", "New contract needed?"], rows: [["Promise to sell for a token/other consideration, remaining amount, or market value", "Yes — formal sale"], ["Promise to gift at the end of the lease", "Yes — gift deed"], ["Promise of a gift contingent on paying remaining instalments", "No — title passes on fulfilment"]] },
      distinctions: [
        { a: "Conventional finance lease", b: "IMBT", text: "Finance lease: rent from payment date, lessee bears risk, sale built in. IMBT: rent from usable delivery, bank bears ownership risk, transfer by separate promise." }
      ],
      related: ["t11.5.1", "t11.4.5", "t12.9"],
      quickCheck: { q: "Under AAOIFI, in which IMBT transfer method does ownership pass without signing a new document?", options: ["Promise to sell at market value", "Promise to gift at the end", "Gift contingent on payment of remaining instalments", "None"], answer: 2, explanation: "p. 292." },
      confusions: [
        { wrong: "A hire–purchase contract becomes Islamic when renamed IMBT or Ijarah-wal-Iqtina‘.", right: "Renaming changes nothing; the lease must stay a pure Ijarah with ownership risk on the bank and a separate transfer contract (p. 294)." }
      ],
      examples: [
        { title: "Contingent gift", kind: "textbook", text: "Under AAOIFI’s third method, the bank promises the car will become the lessee’s as a gift once the last instalment is paid. When that condition is fulfilled, title passes without any new contract (pp. 291–293)." }
      ]
    },
    {
      id: "t11.5.1", section: "11.5.1", title: "Procedure for IMBT, Sale and Lease-back, and Destruction of the Asset", pages: [293, 295], tier: "core",
      concepts: ["imbt", "hamish-jiddiyah", "wakalah"],
      intuition: "Step by step, how does a bank run an auto or machinery Ijarah?",
      simple: "(1) MoU and client’s undertaking with HJ (trust; AAOIFI: invest as Mudarabah deposit; may be advance rent). (2) Bank buys directly or via agent (third party preferred; client may import as agent; costs reimbursed; bank bears ownership risk). Unlike Murabaha, the lease may start when the client-agent takes delivery. (3) Or joint purchase and lease of the bank’s share (DM). (4) Formal lease on possession; rent from usable form. (5) Default → acceleration if agreed; only due rent from security. Then a separate sale/gift. If transfer becomes impossible without lessee fault, refund rent above market rent. Sale and lease-back: permissible but exceptional; sale first; transfer back after a reasonable period. Destruction ends the lease; no rent while unusable.",
      academic: [
        "Procedure: (1) the client’s requirement and MoU; an undertaking with earnest money (HJ) kept as trust — if used with permission it becomes the bank’s debt; AAOIFI recommends keeping it as an investment trust (Mudarabah PLS deposit in the client’s name); may be advance rent with consent (AAOIFI 2/3). (2) The bank buys directly or via an agent; for imports the customer may be agent, opening an L/C and paying duties, taxes and transport, all reimbursed and part of cost; AAOIFI prefers a third-party agent but allows the client; a performance bond for client-nominated vendors; the bank remains liable for ownership risks and expenses (AAOIFI 3/7). Unlike Murabaha, the bank need not first take possession and then deliver: if the client is purchasing agent, the lease may start when he takes delivery as agent — since ownership, risk and reward remain with the lessor. (3) Joint purchase — Shirkatulmilk — with the bank leasing its share (Diminishing Musharakah), rent proportional to its share and decreasing as the client buys units (AAOIFI 3/6). (4) After purchase and possession, the formal lease is executed; rent accrues when installation is complete and usable; delays attributable to the lessee do not stop rent. (5) On default the bank may accelerate if agreed — early termination; the bank takes the asset back or the lessee buys it per the agreement; in foreclosure only due rent may be deducted, not remaining rent (AAOIFI 6/5, 7/2/1, 7/2/2).",
        "Then a separate sale or gift contract using the three methods. Rent includes the asset cost, but legally is all rent; accepted by scholars since rent is by consent and mutually beneficial. AAOIFI 8/8: if transfer is impossible (destruction, theft) or the lease cannot continue without lessee fault, rent is adjusted to market — the excess of contractual over market rent refunded; Takaful proceeds above the bank’s cost and expenses should go to the client. Hire–purchase renamed IMBT or Ijarah-wal-Iqtina‘ is not compliant; but institutions following scholars’ procedures in letter and spirit should not be unnecessarily criticised (Vogel and Hayes).",
        "Sale and lease-back: the customer sells an asset he owns and leases it back — legally permissible but ideally avoided and not a major mode; acceptable if the client wants to escape Riba with no alternative — for new assets or conversion from conventional financing. The sale must precede the lease; the asset may be sold back only after a reasonable period (to avoid ‘Inah). Destruction/theft: total destruction terminates a lease of an identified asset; the lessee, a fiduciary, is liable for misconduct or negligence; partial destruction impairing benefit allows termination or rent amendment; no rent for periods of non-usability without lessee negligence."
      ],
      exam: "IMBT steps: MoU + undertaking + HJ (Mudarabah trust); bank buys (agent possible; bank bears risk); lease may start on agent’s delivery; formal lease on usable asset; default → acceleration, only due rent from security; separate sale/gift. AAOIFI 8/8 refund. Sale & lease-back exceptional; sale first; delayed transfer back. Destruction ends lease.",
      keyPoints: [
        "HJ may be invested as a Mudarabah deposit for the client.",
        "Lease can start at agent’s delivery (unlike Murabaha).",
        "Renaming hire–purchase does not make it compliant.",
        "AAOIFI recommends keeping Hamish Jiddiyah as a Mudarabah (PLS) deposit in the client’s name; with consent it can be advance rent.",
        "On default with acceleration, only due rent may be taken from security, not future rent."
      ],
      steps: [
        "Client request + MoU; undertaking to lease with Hamish Jiddiyah",
        "Bank purchases asset directly or through an agent (bank bears ownership risk)",
        "Asset delivered in usable form (to client as agent or lessee)",
        "Formal Ijarah agreement executed; rent accrues from usable delivery",
        "Client pays rent; bank bears ownership costs (Takaful, major repairs)",
        "At end: separate sale or gift under the bank’s unilateral promise"
      ],
      related: ["t11.5", "t11.6", "t14.4.1"],
      quickCheck: { q: "Why can an Ijarah start when the client, as the bank’s agent, takes delivery, whereas in Murabaha the bank must first take possession before selling?", options: ["Ijarah has no rules", "In Ijarah ownership and risk stay with the lessor during the lease, so no separate transfer is needed", "Murabaha is a loan", "Because of tax"], answer: 1, explanation: "p. 293." },
      examples: [
        { title: "Rent from the agent’s delivery date", kind: "textbook", text: "Unlike MPO, in Ijarah the lease can start the day the client, as agent, takes delivery — no separate transfer is needed, because ownership stays with the bank (p. 293)." }
      ]
    },
    {
      id: "t11.5.2", section: "11.5.2", title: "Issues Concerning Modern Use of Ijarah", pages: [295, 296], tier: "core",
      concepts: ["ijarah", "risk-management"],
      intuition: "What practical problems do Islamic lessors face, and what principles must never be compromised?",
      simple: "Five issues: (1) major repairs are the lessor’s — shifting them is invalid; (2) specific-asset leases signed at disbursement earn no rent until delivery — use a promise to lease first and price the whole funded period; (3) supply-stage damage isn’t the agent’s unless at fault; (4) usufruct may fall — rent can be reduced or cancelled (e.g. crop disaster); (5) default penalties go to charity. Ijarah return isn’t truly fixed: the bank bears purchase, Takaful and upkeep costs (supplier discounts are its right). Two non-negotiables: risk can’t be separated from ownership; lease and sale stay separate.",
      academic: [
        "Five sets of issues: (1) burdens of the asset — repairs beyond normal maintenance fall on the lessor; a clause shifting ownership costs other than operating expenses to the lessee is invalid as unjust enrichment. (2) Lack of knowledge: if a specified asset is leased, the agreement should be executed only after possession by the lessor (or lessee as agent); if signed at disbursement and delivery is delayed, no rent is due for the gap — so enter a ‘promise to lease’ first and execute Ijarah when available; pricing may consider the whole period funds are invested (supply + lease). (3) Supply-stage damage: the agent is not responsible unless at fault; advance rent adjusted unless the lease is extended equivalently. (4) Future usufruct may fall; Islamic law allows cancellation if usufruct falls below normal expectations; nearly all schools allow reducing or abolishing rent of farmland damaged by drought or floods (Imam Muhammad: Ijarah becomes invalid and the lessee owes a conventional wage). (5) Default: penalties go to charity. The perception that Ijarah yields a fixed return is incorrect: the bank bears acquisition and import expenses (it may price them in), is entitled to supplier discounts as owner, and pays Takaful and upkeep; Takaful claims may not cover losses — so net return is uncertain. Solutions must not be stratagems: (i) risk cannot be separated from ownership — the bank must take Dhaman; (ii) lease and sale must be separate and independent."
      ],
      exam: "Issues: lessor bears major repairs; sign lease after possession (promise first); agent not liable for supply-stage damage absent fault; reduce rent if usufruct falls; penalties to charity. Ijarah return not truly fixed. Two principles: risk with ownership; lease and sale separate.",
      keyPoints: ["Supplier discounts belong to the bank as owner.", "Farmland rent reduced/abolished for natural calamity."],
      principles: ["Risk cannot be separated from ownership (Dhaman).", "Lease and sale are different contracts and must be kept separate."],
      related: ["t11.3.5", "t11.4.4", "t4.2.6"],
      quickCheck: { q: "According to the author, why is Ijarah not truly a ‘fixed return’ mode for banks?", options: ["Rent is always variable", "The bank bears acquisition, Takaful and upkeep costs and asset risk, so net return is uncertain", "Rent cannot be agreed", "Banks cannot price leases"], answer: 1, explanation: "p. 296." },
      examples: [
        { title: "Drought on leased farmland", kind: "textbook", text: "Nearly all schools allow reducing or abolishing rent if a leased farm’s crop is ruined by drought or flood; Imam Muhammad says the Ijarah becomes invalid and the lessee owes a customary wage (p. 296)." }
      ],
      confusions: [
        { wrong: "Ijarah gives banks a fixed, certain return.", right: "The bank bears acquisition, import, Takaful and major upkeep costs and claim shortfalls, so the net return is not certain (p. 296)." }
      ]
    },
    {
      id: "t11.5.3", section: "11.5.3", title: "Assignment of Leased Assets and Securitisation of Leases (Ijarah Sukuk)", pages: [297, 297], tier: "core",
      concepts: ["ijarah-sukuk", "sukuk"],
      intuition: "How does Ijarah become a tradable Sukuk?",
      simple: "The lessor may sell the leased asset (whole or part) to a third party with its rights and obligations; the lease continues. But assigning only the rent stream for money is selling money for money — not allowed. Selling the asset to many investors via certificates creates Ijarah Sukuk: proportionate ownership with owner’s rights and obligations; returns are quasi-fixed (maximum = rent, less unexpected costs); holders bear market, maintenance, Takaful and default risk and pro rata loss on total destruction.",
      academic: [
        "Experts allow the lessor to sell the asset in whole or part to a third party with its rights and obligations; the sale is valid and Ijarah may continue — useful for high-cost assets (aircraft, ships, equipment, roads, bridges). If ownership is not transferred and only the rent is assigned for money, it is not allowed — money for money must be equal. The new owner enjoys the lessor’s rights and bears its liabilities — potential for securitisation and a secondary market. Sold to many investors, proportions are evidenced by certificates — Ijarah Sukuk or leasing certificates — representing proportionate ownership of physical assets tied to the Ijarah; holders assume owner/lessor rights and obligations and must maintain the asset (Kahf). Risks: real market risk on asset pricing, maintenance and Takaful costs, and the lessee’s ability to pay; total destruction → pro rata loss. Hence quasi-fixed return: the contractual rent is a maximum subject to deduction for unexpected expenses."
      ],
      exam: "Leased asset can be sold with the lease; rent-only assignment prohibited. Ijarah Sukuk = pro rata ownership of leased assets; holders bear owner risks/costs; quasi-fixed return (rent = maximum).",
      keyPoints: [
        "Rent stream alone cannot be sold.",
        "Ijarah Sukuk rent is a maximum return, reduced by unexpected expenses; holders bear pro rata loss if the asset is destroyed."
      ],
      related: ["t15.3.5", "t11.5.4", "t8.8.4"],
      quickCheck: { q: "A lessor wants to sell only its right to future rentals (not the asset) at a discount. This is:", options: ["Permissible securitisation", "Not permissible — it is selling money for money", "Ijarah Sukuk", "Required by AAOIFI"], answer: 1, explanation: "p. 297." },
      examples: [
        { title: "Airport financed by Ijarah Sukuk", kind: "textbook", text: "A government contracts to build an airport, leases it and sells Ijarah Sukuk to the public; proceeds pay the contractor and holders receive only actual rental income (p. 298)." }
      ]
    },
    {
      id: "t11.5.4", section: "11.5.4", title: "Potential of Ijarah", pages: [297, 298], tier: "core",
      concepts: ["ijarah", "ijarah-sukuk"],
      intuition: "Why does the author call Ijarah the most important mode?",
      simple: "Ijarah serves retail, corporate and public sectors directly (machinery, autos, housing, durables) and via Sukuk. Flexibility: rent can be paid before, during or after the period (accrual depends on usability); assets can be existing or to be built (if described); rent fixed or floating with floor and cap; Sukuk holders co-own and share rent. Governments with durable assets can replace interest borrowing; Ijarah Sukuk are tradable at market price, aiding liquidity. Example: an airport financed by Ijarah Sukuk.",
      academic: [
        "Ijarah is the most important mode for Islamic banks’ retail, corporate and public-sector financing with huge unrealised potential: directly for plant, machinery, autos, housing and durables, indirectly for Sukuk; conducive to fixed-asset formation. Features: payment of rent can be unrelated to usufruct timing (before, during, after), though accrual depends on possible usage; Ijarah can be on existing assets or ones to be constructed if fully described and not identified items, with asset and rent known; rate fixed or floating with a clear formula, floor and cap; first-term rent clear; holders of Ijarah Sukuk co-own, bear price risk and ownership costs and share rent. Governments can use it instead of interest borrowing if they have durable usable assets (commercial viability does not matter); Sukuk proceeds buy assets for lease; rents distributed; tradable at market price, purchasers stepping into pro rata ownership — helping liquidity management. Example: a government builds an airport via a contractor, undertakes to lease it, and sells Ijarah Sukuk of different denominations and maturities; the lease value (≥ construction cost) is spread across Sukuk; the government pays the contractor from proceeds and owes investors only actual income from the facility."
      ],
      exam: "Ijarah: most important mode — retail, corporate, public; Sukuk. Flexibility: timing of rent, future assets, floating rent with floor/cap, co-ownership. Govt Ijarah Sukuk (airport example); tradable → liquidity.",
      keyPoints: [
        "Commercial viability of government assets does not matter; usability does.",
        "Rent can be paid before, during or after the usufruct period, though it accrues only when use is possible.",
        "Ijarah can be on an asset yet to be built if fully described (not identified).",
        "Floating rent needs a clear formula with a floor and a cap."
      ],
      examples: [
        { title: "Airport via Ijarah Sukuk", kind: "textbook", text: "A government contracts an airport’s construction, undertakes to lease it and issues Ijarah Sukuk of various denominations and maturities; proceeds pay the contractor; investors receive only actual income from the facility." }
      ],
      related: ["t15.3.5", "t18.3.1"],
      quickCheck: { q: "What does the author say is necessary for a government to use Ijarah Sukuk?", options: ["Commercially profitable assets", "Durable usable assets (commercial viability does not matter)", "A AAA rating", "Gold reserves"], answer: 1, explanation: "p. 298." }
    },
    {
      id: "t11.6", section: "11.6", title: "Summary of Guidelines for Islamic Bankers on Ijarah (Boxes 11.1–11.4)", pages: [298, 305], tier: "core",
      concepts: ["ijarah", "imbt", "risk-management"],
      intuition: "What checklist and tools should an Ijarah banker keep at hand?",
      simple: "Guidelines: no difference between operating and finance lease if the four essentials are met and ownership risk stays with the lessor; lease of an identified asset can’t start before possession; no hire-and-purchase in one contract; transfer by separate sale/gift deed, promise binding only on promisor (AAOIFI’s lessor-promise preferred over lessee undertakings used in Pakistan); lessor bears corpus costs (Takaful, accidental repairs), lessee operating costs; joint acquisition with proportional rent. Box 11.1 risk tools; Box 11.2 auto Ijarah vs conventional; Box 11.3 case study; Box 11.4 accounting.",
      academic: [
        "Guidelines: (1) no difference between operating and finance leases in Islamic principles if the four essentials (parties, subject, consideration, period) are met; IMBT is the modern form; ownership risk with lessor; sale separate. (2) Lease of an identified asset cannot commence before possession; if possession timing is unknown, the arrangement is provisional. (3) Two contracts in one are impermissible — no hire and purchase in a single agreement. (4) At the end, transfer to the client or sell in the market; proper sale or gift deed; promise binding only on the promisor; AAOIFI provides for the lessor’s promise, while many banks (e.g. Pakistan) take the lessee’s undertaking deemed binding on him — abiding by AAOIFI seems nearer the spirit. (5) Lessor bears corpus expenses (Takaful, accidental repairs); lessee operating expenses; Takaful and costs may be recovered in rent transparently; Takaful paid by the customer as agent is reimbursed. (6) Joint acquisition and lease of the bank’s share with proportional rent.",
        "Box 11.1 risk mitigation: refusal to lease → binding promise + HJ, sell and recover actual loss; rent default → charity undertaking, HJ, collateral; major maintenance/destruction → Takaful; early termination → take back and sell, or undertaking to buy at a pre-agreed price schedule; careless use → trust receipt making negligence the customer’s; inflation → benchmarked floating rent with floor and cap; customer may not buy at maturity → lease assets with resale value or separate promise to purchase.",
        "Box 11.2 auto Ijarah vs conventional: hire–purchase vs no void condition, sale not part; customer bears all loss vs bank bears ownership risk, customer usage costs; insurance by lessee vs Takaful at lessor’s expense (may raise rent by consent); insurance shortfall on customer vs bank bears claim-settlement risk; rent continues after theft/destruction vs rent void; unilateral lessor termination vs binding, termination only on lessee contravention; late fees as income (Riba) vs charity undertaking; automatic transfer vs formal sale deed optional; upfront downpayment, insurance, first rent vs refundable security deposit, recovery of actual expenses only.",
        "Box 11.3 case (ABC Textile, Merit Islamic Bank; 10% security deposit): trucks — direct lease (bank buys from market); cars (L/C already opened), dyeing plant and looms (client-owned) — sale and lease-back, with the condition of no early retirement before one year and documents (sale deed, undertaking, Ijarah agreement, schedule, promissory note, promise to sell/purchase). Looms damaged by poor maintenance — client repairs at his cost; rent continues; Shari’ah advisor may consider relaxation. Sale of ten cars at Rs.400,000 each vs outstanding Rs.350,000 + prepaid Rs.20,000 = Rs.370,000 each → covers Rs.3.7m, profit Rs.300,000 (Rs.30,000 per car). A car destroyed without negligence: loss is the bank’s; refund Rs.50,000 security; under AAOIFI 8/8 also give Takaful surplus Rs.450,000 − Rs.370,000 = Rs.80,000 → total Rs.130,000.",
        "Box 11.4 accounting (AAOIFI): operating Ijarah — assets at historical cost, depreciated, ‘investments in Ijarah assets’; revenue allocated over the term; initial direct costs allocated or expensed; repair provisions. IMBT through gift — no residual value deducted. IMBT for token or specified amount — residual value deducted; if the lessee doesn’t buy, lower of cash equivalent and book value; if he promised but doesn’t buy, shortfall a receivable. IMBT by sale before term for remaining instalments — normal depreciation. Impairment where instalments exceed fair rent without lessee fault → liability."
      ],
      exam: "Guidelines (six). Box 11.1 risk tools (promise+HJ, charity undertaking, Takaful, price schedule, trust receipt, floating rent with cap/floor, resaleable assets). Box 11.2 auto Ijarah vs conventional. Box 11.3 numbers: Rs.3.7m outstanding, Rs.300,000 profit; Rs.130,000 to client on destruction. Box 11.4 accounting by IMBT type.",
      keyPoints: [
        "AAOIFI lessor promise preferred over lessee undertaking.",
        "Trust receipt binds lessee to careful use.",
        "Case: destroyed car → Rs.50,000 deposit + Rs.80,000 Takaful surplus."
      ],
      table: { caption: "Box 11.2 — Auto Ijarah vs conventional leasing (condensed)", head: ["Issue", "Conventional lease", "Islamic IMBT"], rows: [["Structure", "Hire–purchase (sale built in)", "Pure Ijarah; sale separate"], ["Loss/damage", "Customer bears all", "Bank bears ownership risk; customer usage costs"], ["Insurance", "Lessee pays; bears shortfall", "Takaful at lessor’s expense; bank bears claim risk"], ["Theft/total loss", "Rent continues until claim settled", "Rent ceases"], ["Termination", "Lessor may terminate unilaterally", "Binding; only for lessee’s contravention"], ["Late payment", "Extra charge as income (Riba)", "Charity undertaking only"], ["End of term", "Automatic transfer", "Optional formal sale deed"], ["Upfront", "Downpayment, insurance, first rent", "Refundable security deposit; only actual expenses recoverable"]] },
      calc: { type: "ijarah-case", note: "Reproduces Box 11.3 Answers 3 and 4: early purchase price vs outstanding investment, and refund on destruction under AAOIFI 8/8." },
      examples: [
        { title: "Box 11.3 — destroyed car", kind: "textbook", text: "Outstanding investment and prepaid expenses Rs.370,000; Takaful claim Rs.450,000; security deposit Rs.50,000. The bank returns the Rs.50,000 deposit and, per AAOIFI 8/8, the Rs.80,000 Takaful surplus — Rs.130,000 in total." },
        { title: "Box 11.3 — neglected looms", kind: "textbook", text: "The Takaful evaluator found five looms broke down through the client’s poor maintenance; the client repairs them at his cost and rent continues (p. 303)." }
      ],
      related: ["t11.5.1", "t14.4.1", "t4.2.9"],
      quickCheck: { q: "In Box 11.3, the client offers Rs.400,000 per car for ten cars; outstanding investment is Rs.350,000 and prepaid expenses Rs.20,000 per car. What is the bank’s total profit?", options: ["Rs.500,000", "Rs.300,000", "Rs.200,000", "Rs.3.7 million"], answer: 1, explanation: "10 × (400,000 − 370,000) = Rs.300,000 (p. 303)." }
    }
  ],
  summary: "Ijarah is the sale of usufruct: a known benefit of a specified non-consumable asset for a specified period against agreed rent, with ownership, its risks and ownership costs remaining with the lessor and the lessee liable only for negligence. Rent is due only when the usable asset is delivered; it may be based on cost and benchmarked (even to interest rates, per the author, though other benchmarks are preferable) for future periods with the first period fixed and a cap/floor; it cannot be increased for late payment (penalties to charity), and on early termination only due rent may be claimed. Conventional financial and security leases shift risk to the lessee and start rent before delivery; Islamic banks instead use Ijarah Muntahia-bi-Tamleek with ownership transfer through a separate unilateral promise to sell or gift, sale and lease-back only exceptionally with a time gap, and Takaful borne by the lessor. Leased assets can be sold with the lease and securitised as Ijarah Sukuk, giving Ijarah great potential for retail, corporate and sovereign finance. (Chapter synthesis — Section 11.6 gives the author’s guidelines.)",
  takeaways: [
    "Five essentials: contract, known usufruct, particular asset, period, agreed rent.",
    "Only non-consumable assets can be leased; leasing money = loan with interest.",
    "Rent due only after usable delivery; first-period rent fixed; floating rent with cap/floor.",
    "Lessor bears ownership risk, major repairs, Takaful; lessee usage costs and negligence.",
    "Early termination: only due rent; late rent: charity undertaking.",
    "IMBT: lease + separate unilateral promise to sell or gift.",
    "Sale and lease-back: exceptional; sale first; ~1-year gap before transfer back.",
    "Ijarah Sukuk: pro rata ownership; quasi-fixed return; rent-only assignment prohibited."
  ],
  checklist: [
    "Can you list the essentials of Ijarah and compare it with sale?",
    "Can you state Kasani’s conditions and when rent becomes due?",
    "Can you explain benchmarked rent and the LIBOR debate?",
    "Can you allocate liabilities between lessor and lessee?",
    "Can you explain termination rules and remaining-rent prohibition?",
    "Can you critique conventional leases on four points?",
    "Can you describe IMBT procedure and AAOIFI transfer methods?",
    "Can you solve the Box 11.3 case numbers?"
  ],
  flashcards: [
    { id: "f11.1", cat: "Definitions", front: "Ijarah", back: "Transfer of a known usufruct of a specified asset for a specified period against specified lawful rent — the sale of usufruct (or hire of work for wages).", topic: "t11.1" },
    { id: "f11.2", cat: "Contract rules", front: "Five essentials of Ijarah", back: "A contract; known usufruct transferred; of a particular asset; for a specified period; against agreed rent.", topic: "t11.2" },
    { id: "f11.3", cat: "Comparisons", front: "Ijarah vs Bai‘", back: "Ijarah: usufruct only, time-bound, lessor keeps ownership risk/expenses. Bai‘: corpus ownership passes permanently with risk.", topic: "t11.2.1" },
    { id: "f11.4", cat: "Prohibitions", front: "What cannot be leased?", back: "Things consumed in use — money, food, fuel, candles, ammunition. Leasing money is a loan; its ‘rent’ is interest.", topic: "t11.3" },
    { id: "f11.5", cat: "Contract rules", front: "When does Ijarah rent become due?", back: "Only after the asset is in the lessee’s possession in usable form (contemporary jurists, AAOIFI) — not when funds are paid to the supplier.", topic: "t11.3" },
    { id: "f11.6", cat: "Contract rules", front: "Floating rent in Ijarah", back: "Allowed for future periods via a well-defined benchmark if the first period’s rent is specified; cap/floor recommended (e.g. ±5%).", topic: "t11.3.2" },
    { id: "f11.7", cat: "Principles", front: "Essential difference between Ijarah and interest-based lease finance", back: "The lessor bears full risk of the corpus; if usufruct is lost without lessee fault, no rent is due.", topic: "t11.3.2" },
    { id: "f11.8", cat: "Risk", front: "Lessor vs lessee liabilities", back: "Lessor: ownership taxes, major repairs, loss without lessee fault, Takaful. Lessee: usage costs, day-to-day maintenance, negligence.", topic: "t11.3.5" },
    { id: "f11.9", cat: "Contract rules", front: "Early termination of Ijarah for lessee breach", back: "Lessor takes the asset back; lessee pays rent due to date (and negligence damages), never rent for the remaining period.", topic: "t11.3.6" },
    { id: "f11.10", cat: "Comparisons", front: "Four Shari’ah problems in conventional leases", back: "Sale built into lease; rent before delivery; all risk on lessee/fixed residual value; lessee bears costs even in operating lease.", topic: "t11.4.4" },
    { id: "f11.11", cat: "Financing modes", front: "Ijarah Muntahia-bi-Tamleek (IMBT)", back: "Ijarah ending in ownership transfer through a separate unilateral promise to sell or gift; rent from usable delivery; bank bears ownership risk.", topic: "t11.5" },
    { id: "f11.12", cat: "Contract rules", front: "AAOIFI methods of transferring ownership in IMBT", back: "Promise to sell (token, remaining amount or market value); promise to gift at end; promise of gift contingent on paying remaining instalments.", topic: "t11.5" },
    { id: "f11.13", cat: "Contract rules", front: "Sale and lease-back conditions", back: "Exceptional use; sale precedes lease; not conditional; asset sold back only after a reasonable period (~1 year) to avoid ‘Inah.", topic: "t11.5.1" },
    { id: "f11.14", cat: "Banking", front: "AAOIFI 8/8 — when transfer becomes impossible without lessee fault", back: "Refund to lessee the excess of contractual rent over market rent; Takaful proceeds above bank’s cost go to the client.", topic: "t11.5.1" },
    { id: "f11.15", cat: "Principles", front: "Two non-negotiable principles in Ijarah (Section 11.5.2)", back: "Risk cannot be separated from ownership; lease and sale must be kept separate and independent.", topic: "t11.5.2" },
    { id: "f11.16", cat: "Capital markets", front: "Ijarah Sukuk", back: "Certificates of pro rata ownership in leased assets; holders bear owner risks/costs; quasi-fixed return (rent is a maximum); tradable at market price.", topic: "t11.5.3" },
    { id: "f11.17", cat: "Risk", front: "Box 11.1 — tools for Ijarah risks", back: "Promise + HJ; charity undertaking + collateral; Takaful; buy-back price schedule; trust receipt; benchmarked rent with floor/cap; resaleable assets or purchase promise.", topic: "t11.6" },
    { id: "f11.18", cat: "Definitions", front: "Ijarah (legal definition)", back: "A contract for a known usufruct of a specified asset for a specified time against a specified lawful return — or for work against a wage.", topic: "t11.1" },
    { id: "f11.19", cat: "Arabic terminology", front: "Ajr al-Musammah vs Ajr al-Mithl", back: "Rent/wage fixed in the contract vs customary rate set by a judge or arbitrator.", topic: "t11.2" },
    { id: "f11.20", cat: "Contract rules", front: "Can a specified asset be leased before the lessor owns it?", back: "No — take a promise to lease; the Ijarah is signed after ownership. Described assets (Mosufah bil Zimmah) may be leased for the future.", topic: "t11.3.1" },
    { id: "f11.21", cat: "Contract rules", front: "Floating rent requirements", back: "First-period rent must be fixed; later rent may follow a benchmark, inflation or taxes, with a cap and floor to avoid Gharar.", topic: "t11.3.2" },
    { id: "f11.22", cat: "Contract rules", front: "Sub-lease surplus", back: "Abu Hanifa: to charity unless the lessee improved the asset or rents in another currency. Shafi‘i/Hanbali (preferred): lessee keeps it.", topic: "t11.3.3" },
    { id: "f11.23", cat: "Contract rules", front: "Death of a party in Ijarah", back: "Does not end the lease (contemporary view); the lessee’s heirs may terminate if it becomes too onerous.", topic: "t11.3.6" },
    { id: "f11.24", cat: "Contract rules", front: "Sale of a leased asset to a third party", back: "Lease continues with the buyer; lessee’s consent not needed; an uninformed buyer may cancel the purchase.", topic: "t11.3.6" },
    { id: "f11.25", cat: "Financing modes", front: "Three conventional lease forms", back: "Financial lease/hire–purchase and security lease (not acceptable as structured); operating lease (compatible if lessor bears ownership costs).", topic: "t11.4" },
    { id: "f11.26", cat: "Risk", front: "Is Ijarah return fixed?", back: "No — the bank bears acquisition, Takaful, major repair costs and claim shortfalls, so net return is uncertain.", topic: "t11.5.2" },
    { id: "f11.27", cat: "Exam facts", front: "Box 11.3 — car destroyed, AAOIFI 8/8", back: "Client gets the Rs.50,000 deposit plus Takaful surplus over outstanding liabilities (Rs.80,000) = Rs.130,000.", topic: "t11.6" }
  ],
  questions: [
    { id: "q11.1", type: "mcq", q: "Which is NOT an essential of an Ijarah contract?", options: ["Known usufruct", "Specified period", "Transfer of ownership of the asset", "Agreed rent"], answer: 2, explanation: "Ownership is not transferred in Ijarah (p. 280).", topic: "t11.2", diff: "E", level: "recall", obj: "Recall essentials" },
    { id: "q11.2", type: "tf", q: "A bank may charge rent from the date it pays the supplier, even if the asset has not yet been delivered to the lessee.", answer: false, explanation: "Rent is due only once the lessee can use the asset (pp. 282, 289).", topic: "t11.4.4", diff: "E", level: "understanding", obj: "Apply rent-accrual rule" },
    { id: "q11.3", type: "scenario", q: "A leased truck is destroyed in a flood; the lessee was not negligent. What happens?", options: ["The lessee keeps paying rent and replaces the truck", "The lease of that identified asset terminates; the lessor bears the loss and cannot claim further rent", "Rent doubles", "The lessee pays half"], answer: 1, explanation: "p. 295.", topic: "t11.5.1", diff: "M", level: "application", obj: "Apply destruction rules" },
    { id: "q11.4", type: "multi", q: "Which of the following are permissible in Ijarah according to Chapter 11? (Select all.)", options: ["Rent increasing 5% per year as agreed upfront", "Rent linked to inflation for future periods", "Unilateral rent increase by the lessor mid-term", "Rent benchmarked to a reference rate with first-period rent fixed", "Charging rent for the remaining period on early termination"], answer: [0, 1, 3], explanation: "pp. 283–286.", topic: "t11.3.2", diff: "M", level: "application", obj: "Apply rent rules" },
    { id: "q11.5", type: "match", q: "Match each lease type to its Shari’ah status per the chapter.", pairs: [["Operating lease (lessor keeps risk)", "Compatible if other conditions met"], ["Hire–purchase", "Not suitable — sale built into lease"], ["Security lease", "Disguised security agreement"], ["IMBT", "Compliant if ownership transfer separate"]], explanation: "Sections 11.4–11.5.", topic: "t11.4", diff: "M", level: "understanding", obj: "Classify lease types" },
    { id: "q11.6", type: "identify", q: "A lease ending in transfer of ownership through a separate unilateral promise to sell or gift is:", options: ["Ijarah Mosufah bil Zimmah", "Ijarah Muntahia-bi-Tamleek", "Hire–purchase", "Musharakah"], answer: 1, explanation: "p. 291.", topic: "t11.5", diff: "E", level: "recall", obj: "Identify IMBT" },
    { id: "q11.7", type: "comparison", q: "Which statement correctly compares conventional auto leasing and Islamic IMBT (Box 11.2)?", options: ["Both continue rent after theft", "Conventional rent continues until the insurance claim is settled; in IMBT rent ceases if the vehicle is stolen or destroyed", "IMBT lets the bank terminate unilaterally", "Conventional leases have no late fee"], answer: 1, explanation: "p. 301.", topic: "t11.6", diff: "M", level: "analysis", obj: "Compare leasing products" },
    { id: "q11.8", type: "application", q: "Box 11.3 variant: outstanding investment + prepaid = Rs.370,000; Takaful claim Rs.420,000; security deposit Rs.50,000; car destroyed without negligence. Per AAOIFI 8/8 the client should receive:", options: ["Rs.50,000", "Rs.100,000", "Rs.470,000", "Nothing"], answer: 1, explanation: "Deposit 50,000 + surplus (420,000 − 370,000 = 50,000) = Rs.100,000. (Practice variant — generated for learning.)", topic: "t11.6", diff: "H", level: "application", obj: "Apply AAOIFI 8/8" },
    { id: "q11.9", type: "tf", q: "In sale and lease-back IMBT, the asset may be transferred back to the client immediately after the lease starts.", answer: false, explanation: "A reasonable period (normally one year) is needed to avoid ‘Inah (p. 293).", topic: "t11.5", diff: "M", level: "understanding", obj: "Apply sale and lease-back rule" },
    { id: "q11.10", type: "mcq", q: "Why is assigning only the rental stream of a lease (without the asset) for money not allowed?", options: ["Rents are too small", "It amounts to selling money for money, which must be equal", "It requires Takaful", "It is Musharakah"], answer: 1, explanation: "p. 297.", topic: "t11.5.3", diff: "M", level: "understanding", obj: "Explain securitisation rules" },
    { id: "q11.11", type: "order", q: "Order the IMBT procedure described in Section 11.5.1.", items: ["MoU and undertaking with Hamish Jiddiyah", "Bank purchases asset (directly or via agent)", "Asset delivered in usable form", "Formal Ijarah executed; rent accrues", "Separate sale/gift at the end"], explanation: "pp. 293–294.", topic: "t11.5.1", diff: "M", level: "understanding", obj: "Sequence IMBT" },
    { id: "q11.12", type: "short", q: "Explain why the ‘two contracts in one’ objection to IMBT is rejected.", answer: "IMBT consists of an Ijarah that takes effect immediately and a separate unilateral promise to sell or gift at the end, which binds only the promisor and is not a transaction until executed. There is no sale precondition in the lease, no Riba or injustice, and it is fair that the lessee who paid cost plus rent gets ownership (accepted by the OIC Fiqh Academy).", keywords: ["unilateral", "promise", "separate", "Riba", "effective"], explanation: "Section 11.4.5.", topic: "t11.4.5", diff: "H", level: "analysis", obj: "Evaluate IMBT structure" },
    { id: "q11.13", type: "scenario", q: "A lessee sub-leases a shop at a higher rent than he pays, with the lessor’s consent. According to contemporary scholars:", options: ["He must give the surplus to charity", "He may keep the surplus (Shafi‘i/Hanbali view preferred)", "Sub-lease is prohibited", "The lessor gets the surplus"], answer: 1, explanation: "p. 285.", topic: "t11.3.3", diff: "M", level: "application", obj: "Apply sub-lease rules" },
    { id: "q11.14", type: "mcq", q: "What is the literal root of the word Ijarah?", options: ["Ribh", "Al-Ajr — compensation or counter value", "Salaf", "Kafalah"], answer: 1, explanation: "p. 279.", topic: "t11.1", diff: "E", level: "recall", obj: "Recall the meaning of Ijarah" },
    { id: "q11.15", type: "match", q: "Match the term to its meaning.", pairs: [["Ujrah", "Rent for things"], ["Ajr", "Wage for people"], ["Ajr al-Musammah", "Rent fixed in the contract"], ["Ajr al-Mithl", "Rent set by a judge/arbitrator"]], explanation: "p. 280.", topic: "t11.2", diff: "M", level: "recall", obj: "Recall Ijarah terminology" },
    { id: "q11.16", type: "scenario", q: "A leased car is damaged in a flood while properly parked. Who bears the loss?", options: ["The lessee", "The lessor — the lessee is a trustee liable only for negligence", "Shared equally", "The Takaful company only, with the lessee paying any gap"], answer: 1, explanation: "pp. 280, 285.", topic: "t11.2", diff: "E", level: "application", obj: "Apply the trustee principle" },
    { id: "q11.17", type: "tf", q: "If a lessee receives the leased asset as a gift from the lessor, the Ijarah continues until its term ends.", answer: false, explanation: "The lease ceases when the lessee becomes owner (p. 280).", topic: "t11.2.1", diff: "M", level: "understanding", obj: "Contrast Ijarah and ownership" },
    { id: "q11.18", type: "identify", q: "Which of these CAN be leased?", options: ["Fuel", "Money", "A delivery van", "Candles"], answer: 2, explanation: "Only assets whose corpus is not consumed (p. 281).", topic: "t11.3", diff: "E", level: "recall", obj: "Identify leasable assets" },
    { id: "q11.19", type: "application", q: "Someone “leases” 100,000 dollars to a trader for a monthly rent. What is the Shari’ah view?", options: ["Valid Ijarah", "It is deemed a loan; the rent is interest", "Valid if short-term", "A Mudarabah"], answer: 1, explanation: "p. 281.", topic: "t11.3", diff: "M", level: "application", obj: "Apply the rule on leasing money" },
    { id: "q11.20", type: "comparison", q: "What was the classical difference between Hanafis and Shafi‘is on when rent becomes due?", options: ["No difference", "Hanafis: when usufruct emerges; Shafi‘is: at contract, presuming use — both now require the asset in the lessee’s usable possession", "Shafi‘is: never", "Hanafis: before delivery"], answer: 1, explanation: "p. 282.", topic: "t11.3", diff: "H", level: "analysis", obj: "Compare views on accrual of rent" },
    { id: "q11.21", type: "scenario", q: "A bank wants to lease a specific machine it has not yet bought. What should it do?", options: ["Sign the Ijarah now", "Take a promise to lease (with earnest money or advance rent) and sign the Ijarah after it owns the machine", "Charge rent from payment date", "Use Murabaha only"], answer: 1, explanation: "p. 283.", topic: "t11.3.1", diff: "M", level: "application", obj: "Apply execution rules for specified assets" },
    { id: "q11.22", type: "tf", q: "Ijarah Mosufah bil Zimmah can be executed for future enforcement even before the lessor has a particular unit.", answer: true, explanation: "It is a described, not identified, asset (p. 283).", topic: "t11.3.1", diff: "M", level: "understanding", obj: "Apply future-enforcement rules" },
    { id: "q11.23", type: "multi", q: "Which rent-setting methods are permissible in long-term Ijarah? (Select all.)", options: ["Rent based on the lessor’s total asset cost", "Periodic increase by an agreed proportion (e.g. 5% a year)", "Floating rent tied to a benchmark with cap and floor", "Unilateral increase by the lessor at will"], answer: [0, 1, 2], explanation: "p. 283.", topic: "t11.3.2", diff: "M", level: "application", obj: "Apply rent-setting rules" },
    { id: "q11.24", type: "mcq", q: "Why do scholars suggest a ceiling on how far rent can move with a reference rate?", options: ["To guarantee profit", "To avoid Gharar and Jahala for both parties", "Because benchmarks are Haram", "For tax reasons"], answer: 1, explanation: "p. 284.", topic: "t11.3.2", diff: "M", level: "understanding", obj: "Explain caps on floating rent" },
    { id: "q11.25", type: "identify", q: "According to Abu Hanifa, when may a sub-lessor keep surplus rent from a sub-lessee?", options: ["Always", "If he improved the property or rents in a different currency", "Never, under any circumstances", "Only for houses"], answer: 1, explanation: "p. 284.", topic: "t11.3.3", diff: "H", level: "recall", obj: "Recall views on sub-lease surplus" },
    { id: "q11.26", type: "tf", q: "A lessor may take the cost of funds out of the lessee’s security deposit when rent is late.", answer: false, explanation: "Only actual loss; extra over due rent is Riba (p. 285).", topic: "t11.3.4", diff: "E", level: "recall", obj: "Apply rules on security in Ijarah" },
    { id: "q11.27", type: "match", q: "Match each expense to who bears it in a house lease.", pairs: [["Property tax", "Lessor"], ["Electricity and water bills", "Lessee"], ["Structural repair after an earthquake", "Lessor"], ["Damage from lessee’s misuse", "Lessee"]], explanation: "p. 285.", topic: "t11.3.5", diff: "M", level: "application", obj: "Allocate lease expenses" },
    { id: "q11.28", type: "scenario", q: "A lessee breaches the lease and the bank terminates it with two years remaining. What can the bank claim?", options: ["All remaining rent", "Rent due up to termination plus any loss from the lessee’s negligence", "Double rent", "Nothing at all"], answer: 1, explanation: "p. 286.", topic: "t11.3.6", diff: "M", level: "application", obj: "Apply termination rules" },
    { id: "q11.29", type: "tf", q: "If the lessor sells the leased asset to a third party, the lessee’s consent is required and the lease ends.", answer: false, explanation: "Consent is not needed and the lease continues with the new owner (p. 286).", topic: "t11.3.6", diff: "M", level: "recall", obj: "Recall effects of selling a leased asset" },
    { id: "q11.30", type: "multi", q: "Which features make conventional financial leases non-compliant? (Select all.)", options: ["Rent starts when the lessor pays the supplier", "Lessee bears ownership risk", "Sale is built into the lease", "The lessor owns the asset during the lease"], answer: [0, 1, 2], explanation: "pp. 288–289.", topic: "t11.4", diff: "M", level: "analysis", obj: "Evaluate conventional leases" },
    { id: "q11.31", type: "identify", q: "Which conventional lease form is considered compatible with Shari’ah if the lessor bears ownership costs?", options: ["Hire–purchase", "Security lease", "Operating lease", "Sale-and-repurchase"], answer: 2, explanation: "p. 289.", topic: "t11.4", diff: "E", level: "recall", obj: "Identify compliant lease forms" },
    { id: "q11.32", type: "comparison", q: "In an Islamic operating lease, who bears the costs of the corpus of the asset?", options: ["The lessee", "The lessor", "The supplier", "The Takaful company"], answer: 1, explanation: "p. 289.", topic: "t11.4.4", diff: "E", level: "understanding", obj: "Contrast conventional and Islamic operating leases" },
    { id: "q11.33", type: "mcq", q: "Why do scholars prefer a gift as the way of transferring ownership in IMBT?", options: ["Gifts avoid taxes", "The lessee has usually paid the full cost plus return through rent, so it is fair that ownership passes free", "Sale is prohibited", "Gifts are always binding"], answer: 1, explanation: "p. 290.", topic: "t11.4.5", diff: "M", level: "understanding", obj: "Explain gift-based transfer" },
    { id: "q11.34", type: "scenario", q: "The Takaful claim on a destroyed leased asset is less than the bank’s loss, and the lessee was not at fault. Who bears the shortfall?", options: ["The lessee", "The bank", "Split 50/50", "The supplier"], answer: 1, explanation: "p. 291.", topic: "t11.4.6", diff: "M", level: "application", obj: "Apply Takaful shortfall rules" },
    { id: "q11.35", type: "multi", q: "Which AAOIFI-approved methods can transfer ownership at the end of IMBT? (Select all.)", options: ["Promise to sell for a token or market price", "Promise to gift at the end", "Gift contingent on paying the remaining instalments", "A sale contract signed with the lease, effective at the end"], answer: [0, 1, 2], explanation: "A future-dated sale within the lease is not allowed (p. 292).", topic: "t11.5", diff: "M", level: "recall", obj: "Recall IMBT transfer methods" },
    { id: "q11.36", type: "tf", q: "Under a contingent gift in IMBT, ownership passes automatically once the last instalment is paid, without a new document.", answer: true, explanation: "p. 292.", topic: "t11.5", diff: "H", level: "recall", obj: "Apply the contingent gift method" },
    { id: "q11.37", type: "comparison", q: "How does the start of rent differ between Murabaha (MPO) and Ijarah when the client acts as agent?", options: ["No difference", "In MPO a separate offer and acceptance is needed after the agent takes delivery; in Ijarah the lease can start as soon as the agent takes delivery, since the bank remains owner", "Ijarah always needs physical delivery to the bank first", "MPO starts at payment"], answer: 1, explanation: "p. 293.", topic: "t11.5.1", diff: "H", level: "analysis", obj: "Compare MPO and Ijarah procedure" },
    { id: "q11.38", type: "application", q: "A client converting a conventional machinery loan wants sale and lease-back IMBT and asks to buy the machine back after three months. What should the bank say?", options: ["Agree", "Allow a reasonable period (about one year) so the asset or its value may change, to avoid ‘Inah", "Refuse all sale and lease-back", "Charge a penalty"], answer: 1, explanation: "pp. 293, 295.", topic: "t11.5.1", diff: "M", level: "application", obj: "Apply sale and lease-back rules" },
    { id: "q11.39", type: "order", q: "Order the IMBT steps described in Section 11.5.1.", items: ["MoU and undertaking with Hamish Jiddiyah", "Bank buys the asset directly or through an agent", "Formal lease signed once the asset is usable; rent accrues", "Separate sale or gift transfers ownership at the end"], explanation: "pp. 293–294.", topic: "t11.5.1", diff: "E", level: "recall", obj: "Sequence IMBT" },
    { id: "q11.40", type: "identify", q: "According to Imam Muhammad, if a leased farm’s crop is destroyed by a natural calamity, the lessee owes:", options: ["Full rent", "A customary wage, as the Ijarah becomes invalid", "Nothing and must compensate the lessor", "Double rent"], answer: 1, explanation: "p. 296.", topic: "t11.5.2", diff: "H", level: "recall", obj: "Recall rules on impaired usufruct" },
    { id: "q11.41", type: "multi", q: "What are the two non-negotiable principles for Islamic banks in Ijarah (Section 11.5.2)? (Select all.)", options: ["Risk cannot be separated from ownership", "Lease and sale must be separate and independent", "Rent must be fixed for life", "Takaful must be conventional"], answer: [0, 1], explanation: "p. 296.", topic: "t11.5.2", diff: "E", level: "recall", obj: "Recall core Ijarah principles" },
    { id: "q11.42", type: "scenario", q: "A lessor wants to sell only its right to future rentals to an investor for cash, keeping the asset. Is this allowed?", options: ["Yes", "No — it sells money for money; the asset (with rights and obligations) must be sold", "Yes at par only", "Only to banks"], answer: 1, explanation: "p. 297.", topic: "t11.5.3", diff: "M", level: "application", obj: "Apply rules on assigning leases" },
    { id: "q11.43", type: "tf", q: "Ijarah Sukuk holders suffer a pro rata loss if the leased asset is totally destroyed.", answer: true, explanation: "They are owners (p. 297).", topic: "t11.5.3", diff: "E", level: "understanding", obj: "Understand risk in Ijarah Sukuk" },
    { id: "q11.44", type: "application", q: "Box 11.3 variant: a leased car is destroyed without the client’s fault. Outstanding investment plus prepaid costs = Rs.370,000; Takaful pays Rs.450,000; security deposit Rs.50,000. What should the bank give the client under AAOIFI 8/8?", options: ["Rs.50,000", "Rs.130,000", "Rs.80,000", "Nothing"], answer: 1, explanation: "Deposit 50,000 plus claim surplus 80,000 (p. 303).", topic: "t11.6", diff: "H", level: "application", obj: "Apply AAOIFI 8/8 to a loss case" }
  ],
  exam: [
    { id: "e11.1", kind: "long", q: "Critically compare conventional financial leasing with Islamic Ijarah Muntahia-bi-Tamleek.", structure: ["Definitions", "Features of financial lease/hire–purchase", "Four Shari’ah objections", "IMBT solutions: rent accrual, risk, separate transfer", "AAOIFI transfer methods", "Box 11.2 auto comparison", "Remaining issues and two core principles"], keyConcepts: ["usufruct", "ownership risk", "unilateral promise", "Takaful"], points: ["Rent from usable delivery", "No remaining-period rent", "Takaful at lessor’s cost"], mistakes: ["Saying IMBT is hire–purchase renamed", "Putting risk on lessee"], topic: "t11.5" },
    { id: "e11.2", kind: "short", q: "Discuss the rules on determination of rent in Ijarah, including the use of benchmarks.", structure: ["Cost-based rent", "No unilateral increase", "Phased/indexed/benchmarked rent", "LIBOR debate", "First-period rent and cap/floor"], keyConcepts: ["benchmark", "Gharar"], points: ["Lessor’s corpus risk distinguishes Ijarah"], mistakes: ["Allowing retrospective increase"], topic: "t11.3.2" },
    { id: "e11.3", kind: "scenario", q: "A client wants to convert its conventional machinery loan to Islamic financing. Advise on sale and lease-back IMBT.", structure: ["Permissibility and exceptional nature", "Sequence: sale then lease", "Time gap before transfer back", "Documentation (Box 11.3)", "Risks and mitigation"], keyConcepts: ["sale and lease-back", "‘Inah"], points: ["Need and willingness to avoid interest"], mistakes: ["Making lease a condition of the sale"], topic: "t11.5.1" },
    { id: "e11.4", kind: "conceptual", q: "Explain how Ijarah can be securitised and why Ijarah Sukuk yield a quasi-fixed return.", structure: ["Sale of leased asset with lease", "Rent-only assignment prohibited", "Pro rata ownership", "Risks borne by holders", "Potential for governments"], keyConcepts: ["Ijarah Sukuk", "tradability"], points: ["Rent = maximum return"], mistakes: ["Calling Ijarah Sukuk risk-free"], topic: "t11.5.3" },
    { id: "e11.5", kind: "viva", q: "Who pays Takaful on a leased car, and who bears a shortfall in the claim?", structure: ["Owner’s insurable interest", "Pricing into rent", "Shortfall"], keyConcepts: ["Takaful"], points: ["Bank bears shortfall absent lessee breach"], mistakes: ["Charging shortfall to lessee"], topic: "t11.4.6" },
    { id: "e11.6", kind: "long", q: "Discuss the rules for termination of an Ijarah and the rights of each party on destruction, default and breach.", structure: ["Ijarah as a binding contract", "Termination by mutual consent or impossibility (total destruction)", "Partial damage and rent adjustment; Mosufah bil Zimmah replacement", "Lessee breach: rent due only, plus negligence loss", "Default: charity penalty, acceleration if agreed, repossession", "Death, sale to third party", "IMBT: AAOIFI 8/8 protection"], keyConcepts: ["Ameen", "Mosufah bil Zimmah", "acceleration", "AAOIFI 8/8", "Hamish Jiddiyah"], points: ["No rent for remaining period", "No rent when asset unusable without fault", "Takaful shortfall on the bank"], mistakes: ["Charging future rent on termination", "Making lessee bear destruction risk"], topic: "t11.3.6" }
  ]
});
