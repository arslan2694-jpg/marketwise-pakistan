window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.productsMatrix = [
  {
    "id": "murabaha",
    "name": "Murabaha",
    "category": "Trade-based (Sale)",
    "chapter": 9,
    "href": "#/chapter/9",
    "shariahBasis": "A classical 'fiduciary sale' (Bai' al-Amanah): the seller must honestly disclose the original cost and add an agreed profit margin. Modern bank Murabaha takes the specific form of 'Murabaha to Purchase Orderer' (MPO), built on a client promise, an agency purchase, and a separate sale contract.",
    "subjectMatter": "Any real, existing, Shari'ah-permissible good already owned and possessed by the bank (not currency, gold/silver, or debt instruments) that the bank resells to the client at cost plus disclosed profit.",
    "ownershipRiskTiming": "Ownership and risk pass to the bank only after it (or its agent) takes actual or constructive possession from the supplier; only then can the bank execute a fresh offer-and-acceptance sale that transfers ownership and risk to the client.",
    "returnType": "Fixed",
    "returnTypeDetail": "The profit margin over the disclosed cost is fixed once at execution and cannot later be increased even though payment is deferred; rollover/re-pricing of overdue receivables is not allowed.",
    "typicalTenor": "Short to medium term, structured around a single trade transaction financed on a deferred-payment (Bai' Mu'ajjal) basis.",
    "liquidityTradability": "Murabaha creates a monetary receivable/debt owed by the client, which cannot be traded or sold at a discount (this would be Riba) and can only be assigned at face value under Hawalah rules.",
    "commonUse": "Financing raw materials, inventory, equipment, and trade goods needing a cost-plus credit facility -- the book cites farm inputs, machinery, import/export trade financing, and consumer durables.",
    "keyConditions": [
      "Seller must truthfully disclose the original cost and any addable expenses, being honest and true to his words (a 'trust sale').",
      "The bank must take actual or constructive possession and bear the risk of the goods before reselling to the client.",
      "The goods requested must not already be owned by the client, otherwise the deal becomes prohibited Bai' al-'Inah (buy-back).",
      "Currencies, gold/silver, and debt instruments cannot be the subject of Murabaha since they fall under Bai' al-Sarf rules.",
      "The promise to purchase, the agency contract, and the actual Murabaha sale must remain three separate, independent contracts."
    ],
    "majorRisks": [
      "Shari'ah-compliance risk if agency and sale steps are collapsed together or the client already owns the requested goods.",
      "Asset/ownership risk borne by the bank between taking possession from the supplier and completing the sale to the client.",
      "Client default risk -- rollover (re-pricing overdue receivables) is prohibited as explicit Riba, leaving only rescheduling at the same price.",
      "Customer backing out after being appointed purchasing agent, only partly mitigated by earnest money (Hamish Jiddiyah)."
    ],
    "distinguishingFeature": "Unlike Musawamah, Murabaha requires the seller to disclose the original cost and negotiate only the profit margin added to it.",
    "source": { "chapter": 9, "section": "9.2-9.10", "pages": [213, 238] }
  },
  {
    "id": "musawamah",
    "name": "Musawamah",
    "category": "Trade-based (Sale)",
    "chapter": 9,
    "href": "#/chapter/9",
    "shariahBasis": "An ordinary, general form of Bai' in which price is freely bargained between buyer and seller with no reference to the seller's cost, lawful under the same general conditions of valid sale as any other Bai', minus Murabaha's disclosure obligation.",
    "subjectMatter": "Any Shari'ah-permissible goods or assets the bank owns and possesses, sold at a bargained final price -- suited to cases where the bank's acquisition cost is not easily broken down for the client.",
    "ownershipRiskTiming": "Same as Murabaha: ownership, possession and risk must pass to the bank before it resells to the customer; the only difference is that cost and profit need not be disclosed.",
    "returnType": "Fixed",
    "returnTypeDetail": "The final price is fixed by mutual bargaining without disclosing the bank's cost or margin, so the return is embedded in the negotiated price rather than a stated markup.",
    "typicalTenor": "Cash or deferred; the book notes it suits single large transactions (e.g. an aircraft purchase) decided at senior levels rather than routine small-ticket financing.",
    "liquidityTradability": "As with Murabaha, execution creates a deferred-payment receivable/debt that cannot be traded at a discount and is only assignable at face value under Hawalah.",
    "commonUse": "Large one-off asset purchases (the book's example: aircraft financing) or retail goods where the bank has obtained an undisclosed supplier discount, which would be noncompliant to keep under Murabaha.",
    "keyConditions": [
      "All general conditions of a valid Bai' (Chapter 6) apply exactly as in Murabaha.",
      "The bank must still take ownership, possession, and business risk of the asset before reselling to the customer.",
      "No disclosure of cost price or profit margin is required or expected by either party.",
      "Where a supplier rebate is received and not disclosed to the customer, the sale must be structured as Musawamah, not Murabaha."
    ],
    "majorRisks": [
      "Same ownership/possession and default risks as Murabaha, since all other Shari'ah essentials are identical.",
      "Less pricing transparency than Murabaha, which the book notes makes benchmark-linked pricing and regulatory oversight harder.",
      "Greater scope for mispricing relative to Murabaha's disclosed cost-plus structure, per the book's own comparison."
    ],
    "distinguishingFeature": "Unlike Murabaha, Musawamah involves no obligation on the seller to disclose the original cost -- price is set purely by mutual bargaining on the final figure.",
    "source": { "chapter": 9, "section": "9.11", "pages": [234, 238] }
  },
  {
    "id": "salam",
    "name": "Salam",
    "category": "Forward Sale",
    "chapter": 10,
    "href": "#/chapter/10",
    "shariahBasis": "An explicit exception -- sanctioned directly by the Prophet (pbuh) -- to the rule that a sold commodity must exist and be possessed by the seller, permitted for the genuine financing 'necessity' of farmers and traders, subject to strict specification and full advance payment.",
    "subjectMatter": "Fungible (Mithli) commodities precisely defined by quality, quantity and standard specification (e.g. wheat, rice, oil, metals) and generally available in the market at delivery; not usable for money/currencies, unique items, or value-by-subjective-judgment items.",
    "ownershipRiskTiming": "The buyer pays the full price upfront (Salam capital) while the seller keeps the goods and bears their risk until the agreed future delivery date, when ownership and risk of the delivered commodity pass to the buyer.",
    "returnType": "Fixed",
    "returnTypeDetail": "The buyer's gain comes from a Salam price typically cheaper than the future spot price -- effectively a fixed forward price agreed today for goods delivered later.",
    "typicalTenor": "Historically one to three years for farm produce; contemporary use fixes any agreed period, from days to years, depending on the commodity.",
    "liquidityTradability": "The majority view bars the Salam buyer from reselling before taking delivery; banks instead use Parallel Salam, an independent agency sale, or a third-party purchase promise -- negotiable Salam certificates remain a disputed, largely unaccepted innovation.",
    "commonUse": "Financing producers and traders who need cash now against future delivery of a standardized commodity -- the book's archetype is agricultural financing (seed, inputs, working capital for farmers).",
    "keyConditions": [
      "Full price must be paid in advance, essentially at the contract session (a short customary delay is tolerated by some jurists).",
      "Quantity, quality and specifications must be precisely defined to remove Gharar; delivery date and place must be fixed.",
      "The commodity must be a fungible item normally available in the market at delivery, not a specific identified asset.",
      "Salam is not permitted in gold, silver, or currencies, which fall under Bai' al-Sarf's simultaneous-exchange requirement.",
      "The contract is binding and non-revocable except by mutual consent; Khiyar al-Shart (option) is disallowed."
    ],
    "majorRisks": [
      "Seller default or delivery of inferior/short-quantity goods, mitigated by pledges, sureties, and predefined substitution rules.",
      "Marketing/disposal risk for the bank on taking delivery, since onward resale before possession is restricted.",
      "Price risk since the contract is binding and neither party may rescind merely because the market price moved.",
      "Shari'ah-compliance risk in disguised currency-based or debt-based Salam structures, rejected by the majority of jurists."
    ],
    "distinguishingFeature": "Unlike Istisna'a, Salam requires full price payment in advance and is restricted to fungible (Mithli) goods rather than items requiring manufacture.",
    "source": { "chapter": 10, "section": "10.2-10.8", "pages": [241, 263] }
  },
  {
    "id": "istisnaa",
    "name": "Istisna'a",
    "category": "Forward Sale",
    "chapter": 10,
    "href": "#/chapter/10",
    "shariahBasis": "Legalized on the principle of Istihsan (juristic preference) as a sale of a not-yet-existing manufactured item, justified by long-standing common practice and by the ease it affords for financing manufacture and infrastructure that Salam's rules cannot accommodate.",
    "subjectMatter": "Items that must be manufactured, assembled or constructed -- identified by detailed specification, not by pointing to an existing unit -- such as buildings, plant, ships, aircraft, and infrastructure.",
    "ownershipRiskTiming": "The manufacturer/seller bears the risk of raw materials and work-in-progress until delivery; risk and ownership of the completed asset transfer to the purchaser only on delivery in the agreed specifications.",
    "returnType": "Fixed",
    "returnTypeDetail": "Price is fixed by mutual agreement at execution and cannot be unilaterally changed, though it may be revised by mutual consent for material design changes or unforeseen cost shifts.",
    "typicalTenor": "Medium to long term, suited to long-gestation projects (construction, shipbuilding, plant manufacture); price can be paid in instalments linked to completion stages rather than in full advance.",
    "liquidityTradability": "The purchaser is not deemed owner of work-in-progress materials, and the completed asset is not readily tradable before delivery; banks typically use Parallel Istisna'a as manufacturer-supplier rather than reselling receivables.",
    "commonUse": "Financing manufacture and construction -- housing, plant and machinery, infrastructure (roads, bridges, dams), and high-technology goods such as aircraft and ships -- plus export/working-capital financing.",
    "keyConditions": [
      "Subject matter must require manufacturing/construction and be defined by specification, not by identifying an existing unit.",
      "Price need not be paid in advance (unlike Salam) and can be instalment-based or tied to completion stages.",
      "The contract only becomes binding once the manufacturer starts work; before that either party may cancel.",
      "A penalty clause (Shart-e-Jazai) reducing price for late delivery is permitted, with its benefit going to the purchaser -- unlike Salam's late-delivery penalty, which goes to charity.",
      "Parallel Istisna'a with a third-party contractor is permitted provided the two contracts stay fully independent."
    ],
    "majorRisks": [
      "Delivery/completion risk if the manufacturer or a parallel subcontractor delays or fails to perform.",
      "Quality risk -- the purchaser has the option of defect (Khiyar al-'Aib) if the delivered asset lacks agreed specifications.",
      "Settlement, price, and possession risk during the manufacturing period, since sale before delivery is restricted.",
      "Market/cost risk if project costs or values shift over long gestation periods before delivery completes."
    ],
    "distinguishingFeature": "Unlike Salam, Istisna'a does not require full advance payment and only becomes binding once work has actually started.",
    "source": { "chapter": 10, "section": "10.11", "pages": [263, 270] }
  },
  {
    "id": "ijarah",
    "name": "Ijarah",
    "category": "Lease-based",
    "chapter": 11,
    "href": "#/chapter/11",
    "shariahBasis": "Sanctioned by Qur'an, Sunnah and juristic consensus (Ijma'a) as the sale of usufruct (Manafa'ah) of an asset -- not its corpus -- for rent, valid for any asset whose corpus is not consumed by use and whose usufruct can be clearly ascertained.",
    "subjectMatter": "The right to use a specified tangible asset (property, vehicle, equipment) whose corpus is not consumed through use; corpus ownership stays with the lessor throughout.",
    "ownershipRiskTiming": "Ownership of the corpus never transfers in pure Ijarah; it stays with the lessor for the whole term, and all ownership-related risks/expenses remain the lessor's, while the lessee is liable only for loss he causes by negligence.",
    "returnType": "Rental",
    "returnTypeDetail": "Rent (Ujrah) is agreed for a specified period and becomes due only once the asset is delivered in usable form -- not from when the lessor pays for the asset -- and may be benchmarked or revised with agreed ceilings/floors.",
    "typicalTenor": "Flexible -- can run for the asset's full useful life (financial-lease style) or a shorter period (operating lease), which the book notes suits high-cost, long-production-time assets like aircraft and ships.",
    "liquidityTradability": "Accrued rent is a debt and cannot be sold at a discount; sub-leasing is permitted with the lessor's consent, and the lessor may sell the leased asset to a third party without ending the lease.",
    "commonUse": "Financing use of equipment, vehicles, machinery, and property where the client needs the asset's usufruct rather than outright purchase.",
    "keyConditions": [
      "The leased asset's corpus must not be consumed by use (excludes money, food, fuel, and similar consumables).",
      "The usufruct, rental amount, and lease period must all be clearly known/ascertained to avoid Gharar.",
      "Rent does not become due until the asset is actually delivered to the lessee in usable condition.",
      "All ownership-related expenses and risks (including Takaful) remain the lessor's responsibility throughout.",
      "Any interest-benchmark-linked rental review must be capped/floored to avoid Gharar."
    ],
    "majorRisks": [
      "Asset ownership risk borne entirely by the lessor -- if the asset is destroyed without the lessee's fault, the lessor bears the loss and cannot claim further rent.",
      "Rental default risk, since accrued rent is a debt; only charity-directed late-payment penalties (not bank income) are permitted as a deterrent.",
      "Residual/obsolescence risk for the lessor in operating leases, which must be re-leased or disposed of at term end.",
      "Shari'ah-compliance risk if conventional-lease practices (rent before delivery, shifting all ownership risk to the lessee) creep into the structure."
    ],
    "distinguishingFeature": "Unlike a sale, Ijarah transfers only the usufruct (right to use), never the corpus/ownership, which stays with the lessor throughout the lease term.",
    "source": { "chapter": 11, "section": "11.1-11.4", "pages": [279, 290] }
  },
  {
    "id": "ijarah-muntahia-bi-tamleek",
    "name": "Ijarah Muntahia-bi-Tamleek",
    "category": "Lease-based",
    "chapter": 11,
    "href": "#/chapter/11",
    "shariahBasis": "Built on ordinary Ijarah rules but kept compliant by strictly separating the lease from ownership transfer: a unilateral, binding promise by the lessor to sell or gift the asset at lease end, executed through a wholly separate contract, avoids the prohibited 'two contracts in one bargain'.",
    "subjectMatter": "Same as Ijarah -- a specified usable asset whose corpus is not consumed by use -- with an accompanying separate promise mechanism for eventual ownership transfer to the lessee.",
    "ownershipRiskTiming": "Corpus ownership and risk stay with the bank/lessor throughout, exactly as in ordinary Ijarah; only at lease-end, via a separate sale, gift, or gift-contingent-on-final-payment contract, do ownership and risk pass to the lessee.",
    "returnType": "Rental",
    "returnTypeDetail": "Payments are structured purely as rent throughout the lease (not as purchase instalments), starting only when the asset is supplied in usable form -- unlike a conventional finance lease, where accrual starts on payment to the supplier.",
    "typicalTenor": "Generally spans the asset's expected productive life, ending with a separate ownership-transfer contract at term -- commonly multi-year in the book's housing and equipment finance examples.",
    "liquidityTradability": "Same as Ijarah: accrued rent is a non-tradable debt; the ownership-transfer promise is unilateral and not itself a negotiable instrument.",
    "commonUse": "The dominant Islamic-bank leasing structure for financing houses, vehicles, and equipment where the client's end goal is ownership -- the Shari'ah-compliant counterpart to conventional hire-purchase/finance lease.",
    "keyConditions": [
      "The ownership-transfer promise must be unilateral and binding only on the lessor; the lessee retains the option not to proceed.",
      "Transfer of ownership must be executed via a separate, independent contract (sale, gift, or gift contingent on final instalment), never as a built-in condition of the lease.",
      "If structured as sale-and-lease-back, a reasonable interval (the book suggests around one year) should separate purchase and eventual repurchase to avoid Bai' al-'Inah.",
      "All ordinary Ijarah essentials (defined usufruct and rent, lessor bearing ownership risk) must still be fully satisfied throughout.",
      "Rent must start only from actual usable delivery to the lessee, not from the date the bank pays the supplier."
    ],
    "majorRisks": [
      "Shari'ah-compliance risk if the sale/gift is effectively pre-conditioned into the lease rather than kept independent.",
      "Ownership risk for the lessor for the full lease term, since risk transfer is deferred to the final ownership-transfer contract.",
      "Bai' al-'Inah risk in sale-and-lease-back variants if repurchase follows too quickly after the initial sale.",
      "Default/termination risk -- if the lessee fails to complete purchase, the lessor may recover only actual loss (not opportunity cost) from any earnest money held."
    ],
    "distinguishingFeature": "Unlike plain Ijarah, IMT adds a separate, unilateral promise mechanism for ownership to transfer at lease end -- but that transfer must never be built into the lease contract itself.",
    "source": { "chapter": 11, "section": "11.5", "pages": [290, 293] }
  },
  {
    "id": "musharakah",
    "name": "Musharakah",
    "category": "Participatory (Equity)",
    "chapter": 12,
    "href": "#/chapter/12",
    "shariahBasis": "Rooted in Shirkatul-'aqd (contractual partnership), specifically Shirkah al-'Inan, which enjoys the consensus (Ijma'a) of the major schools: partners combine capital (and optionally labour) to conduct a joint business, sharing profit by agreement and loss strictly by capital ratio.",
    "subjectMatter": "A jointly owned commercial venture or specific project/asset, financed by the combined capital contributions (cash or valued-in-kind) of two or more partners who act as each other's mutual agents.",
    "ownershipRiskTiming": "Ownership of the venture's assets is joint and proportional to each partner's capital from inception; each partner bears business risk and loss immediately and continuously in proportion to capital invested.",
    "returnType": "Variable/Profit-Share",
    "returnTypeDetail": "Profit is shared in any mutually agreed ratio (which may differ from the capital ratio to reward a working partner's effort), but loss must always be borne strictly in proportion to capital contribution.",
    "typicalTenor": "Can be continuous, lasting as long as the business operates, or restricted to a specific project until completion; a partner may generally withdraw at will unless a fixed term is mutually agreed.",
    "liquidityTradability": "A partner's share can be sold or assigned subject to partnership rules, and in corporate form takes the shape of tradable shares; but a promise to buy another partner's share at a pre-fixed price (rather than market/agreed value) is not permitted, since that would guarantee his capital.",
    "commonUse": "Joint-venture and project financing where the bank and client both contribute capital and share business risk -- the book frames it as the most genuinely risk-sharing, and preferred, mode.",
    "keyConditions": [
      "Profit-sharing ratio must be agreed at execution and can differ from the capital ratio; loss must always follow the capital ratio exactly.",
      "No partner may be guaranteed a lump-sum or fixed-percentage-of-capital return -- profit must be a share of actual realized profit.",
      "Capital contributed (cash or valued goods) must be quantified without ambiguity.",
      "All partners are mutual agents (Wakil) of one another but not guarantors (Kafil) of one another's losses due to misconduct.",
      "A sleeping partner (one who does not work) cannot receive a profit share exceeding his capital ratio."
    ],
    "majorRisks": [
      "Full exposure to business/commercial loss in proportion to capital invested -- there is no capital protection.",
      "Partner-management (agency) risk, since a partner is liable only for negligence or misconduct, not ordinary business loss.",
      "Termination/liquidity risk, since Musharakah is non-binding by default and any partner may seek to withdraw.",
      "Valuation risk at exit or profit-distribution points, requiring fair valuation (actual or constructive liquidation) of assets."
    ],
    "distinguishingFeature": "Unlike Mudarabah, in Musharakah all partners contribute capital and may participate in management, and all partners bear loss in proportion to their own investment.",
    "source": { "chapter": 12, "section": "12.2-12.3", "pages": [307, 320] }
  },
  {
    "id": "mudarabah",
    "name": "Mudarabah",
    "category": "Participatory (Equity)",
    "chapter": 12,
    "href": "#/chapter/12",
    "shariahBasis": "A specific form of Shirkah recognized since pre-Islamic times and confirmed by Prophetic practice and juristic consensus, in which one party (Rabbul-mal) supplies capital and another (Mudarib) supplies labour/expertise, sharing profit by agreement while capital loss is borne solely by the financier.",
    "subjectMatter": "Capital (preferably cash, precisely valued if in kind) entrusted to a Mudarib to trade or conduct business with, on either a restricted (specific business/place/time) or unrestricted basis.",
    "ownershipRiskTiming": "The Rabbul-mal owns the capital and all business assets/profits until distribution; the Mudarib owns nothing of the venture and bears no capital risk -- his only loss on failure is uncompensated time and effort, absent negligence.",
    "returnType": "Variable/Profit-Share",
    "returnTypeDetail": "Profit is split in a pre-agreed ratio (e.g. 50:50) fixed at inception and never a lump sum or a percentage of capital; capital loss is borne entirely by the Rabbul-mal unless caused by the Mudarib's negligence or misconduct.",
    "typicalTenor": "Can run to a fixed term by agreement or continue until wound up at will (unrestricted Mudarabah); once the Mudarib has commenced business, the contract becomes binding until actual or constructive liquidation.",
    "liquidityTradability": "Mudarabah certificates/Sukuk can be traded subject to conditions -- as cash they follow Bai' al-Sarf rules, as debt they follow debt-trading rules, and as mixed assets they trade at market-agreed value; final profit/loss is only fixed at actual or constructive liquidation.",
    "commonUse": "The classical basis for Islamic banks' deposit-taking (banks as Mudarib for depositors' funds) and for asset-management/investment-agency products.",
    "keyConditions": [
      "Profit-sharing ratio must be fixed at inception as a share of actual realized profit, never a lump sum or percentage of capital.",
      "Capital must be reasonably liquid/quantifiable; a pre-existing debt cannot be converted into Mudarabah capital.",
      "The Mudarib may not work contrary to the financier's specified conditions (business, place, time) in a restricted Mudarabah.",
      "The financier (Rabbul-mal) generally may not interfere in day-to-day management, though he may monitor fiduciary compliance.",
      "If the Mudarib contributes his own capital alongside the financier's, that portion becomes a hybrid Musharakah-Mudarabah arrangement."
    ],
    "majorRisks": [
      "Full capital-loss exposure for the financier -- the working partner risks only his labour, creating potential agency/moral-hazard risk.",
      "Difficulty verifying the Mudarib's honesty and diligence, since he is a trustee liable only for negligence, not ordinary business loss.",
      "Profit-recognition risk: profit is not final until actual or constructive liquidation, complicating periodic distributions.",
      "Termination risk, since Mudarabah is non-binding by default absent an agreed minimum duration."
    ],
    "distinguishingFeature": "Unlike Musharakah, only the financier (Rabbul-mal) contributes capital and bears any capital loss -- the Mudarib contributes labour only and loses nothing but his effort if the venture fails.",
    "source": { "chapter": 12, "section": "12.4-12.5", "pages": [320, 328] }
  },
  {
    "id": "diminishing-musharakah",
    "name": "Diminishing Musharakah",
    "category": "Participatory (Equity)",
    "chapter": 12,
    "href": "#/chapter/12",
    "shariahBasis": "A contemporary juristic development combining Shirkatulmilk (joint ownership) with separate leasing and sale sub-contracts, permissible because each element is kept independently valid and not made conditional on the others, avoiding the prohibition on tying two contracts together.",
    "subjectMatter": "A jointly owned fixed asset (typically a house, vehicle, plant, or building) in which the financier partner's ownership units are periodically leased and then sold to the client partner until full ownership transfers.",
    "ownershipRiskTiming": "Both partners hold proportional ownership and bear risk from the outset pro rata; as the client buys successive ownership units, the financier's ownership share, risk, and rental entitlement all shrink until full ownership passes to the client.",
    "returnType": "Mixed",
    "returnTypeDetail": "The client pays declining rent on the financier's shrinking ownership share plus a separate periodic payment to purchase further ownership units, combining a rental return with capital repayment.",
    "typicalTenor": "Medium to long term, matched to the underlying asset -- the book's worked housing-finance example runs a 10-year (120-month) unit-purchase and rental-decline schedule.",
    "liquidityTradability": "The financier's remaining ownership units are not freely tradable to third parties in typical bank structures; the client's promise to purchase is unilateral and binding on him (in Shirkatulmilk) or, in DM-in-trade, only on the financier, priced independently of any guaranteed capital value.",
    "commonUse": "The book's leading example for house financing, auto financing, plant/machinery financing, and balance-transfer facilities replacing interest-based mortgages, plus gradual buyout of a trading partner's equity stake.",
    "keyConditions": [
      "Partnership, lease, and sale must be structured as three separate, independently enforceable contracts, never bundled or conditional on one another.",
      "In Shirkatulmilk-based DM (e.g. housing), a pre-agreed purchase price schedule is permitted; in DM-in-trade, units must instead be sold at prevailing market/valuation price to avoid guaranteeing the financier's capital.",
      "Rent is charged only on the financier's outstanding ownership share and must decline as the client buys further units.",
      "Sale-and-lease-back variants require a suitable interval (the book suggests about one year) before repurchase, to avoid Bai' al-'Inah.",
      "Both partners bear ownership-related expenses and losses pro rata according to their current ownership share."
    ],
    "majorRisks": [
      "Client default risk -- if payments stop, the financier's ownership share and rental income do not decline, though the client's asset may be at stake via security.",
      "Shari'ah-compliance risk if the three sub-contracts are stipulated together rather than kept independent, or a pre-fixed buyout price is used in DM-in-trade.",
      "Valuation risk when a client buys multiple units at once, requiring fresh appraisal and capital-gain sharing.",
      "Rate risk on floating rental components, requiring a floor-and-cap structure to avoid Gharar."
    ],
    "distinguishingFeature": "Unlike ordinary Musharakah, Diminishing Musharakah has a built-in exit mechanism: one partner's ownership share is progressively bought out by the other through periodic unit purchases until sole ownership results.",
    "source": { "chapter": 12, "section": "12.8-12.9", "pages": [337, 343] }
  },
  {
    "id": "wakalah",
    "name": "Wakalah",
    "category": "Agency-based",
    "chapter": 13,
    "href": "#/chapter/13",
    "shariahBasis": "Agency is directly evidenced by Shari'ah texts and Prophetic practice (the Prophet delegated a purchase to a Companion); a Wakil acts on behalf of a principal with the diligence of a trustee (Amanah), and the resulting rights/liabilities attach to the principal as if he acted himself.",
    "subjectMatter": "Any lawful act that admits representation -- purchase, sale, letting, borrowing/lending, debt assignment, payment collection, or fund management -- delegated by a principal to an agent for a specific or general purpose.",
    "ownershipRiskTiming": "Per the preferred juristic view, ownership of anything the agent purchases for the principal transfers directly from the seller to the principal without passing through the agent's ownership; the agent bears no ownership risk unless negligent.",
    "returnType": "Fee-based",
    "returnTypeDetail": "Banks typically charge a fee (fixed lump sum or percentage of net asset value/investment) for agency services such as Wakalatul Istismar fund management, while often not charging clients who act as the bank's own purchasing agent.",
    "typicalTenor": "Can be a one-off specific agency or an ongoing general agency; it terminates by mutual agreement, unilateral termination, task completion, destruction of the subject matter, or death/loss of capacity.",
    "liquidityTradability": "Not applicable in the usual sense -- Wakalah creates a service relationship rather than a tradable financial claim, though the transactions it enables may be tradable per their own rules.",
    "commonUse": "Used pervasively as a supporting contract across almost every Islamic banking mode -- Murabaha, Salam, Istisna'a, Ijarah, Diminishing Musharakah -- plus standalone fund management (Wakalatul Istismar), L/C handling, and bill collection.",
    "keyConditions": [
      "The delegated act must be clearly known and must admit representation (excludes personal acts like prayer or giving testimony).",
      "Agency is not permitted for unlawful acts (theft, Riba-based dealing) or acts of disobedience.",
      "The agent must perform per the principal's instructions with due care and skill, and may not sub-delegate without consent.",
      "The agent must avoid conflicts of interest -- e.g. cannot sell his own property to the principal without full disclosure.",
      "An agency contract can be specific or general, but the scope of work must be clearly defined either way."
    ],
    "majorRisks": [
      "Agency (moral hazard) risk -- the agent may not act with full diligence, especially where he is also a counterparty (as in Murabaha's client-as-agent structure).",
      "Fuduli risk -- an agent acting beyond his authority creates a contract valid only subject to the principal's ratification.",
      "Shari'ah-compliance risk when agency and sale steps are improperly combined (e.g. double agency for both payment and purchase).",
      "Third-party liability risk, since an agent's dealings can create obligations the principal must honor."
    ],
    "distinguishingFeature": "Wakalah's defining feature is that the agent's actions and any resulting ownership pass directly to the principal, without the agent bearing risk in a personal capacity absent negligence.",
    "source": { "chapter": 13, "section": "13.2", "pages": [347, 349] }
  },
  {
    "id": "tawarruq",
    "name": "Tawarruq",
    "category": "Trade-based (Sale)",
    "chapter": 13,
    "href": "#/chapter/13",
    "shariahBasis": "Permitted by the majority (preferred) view across the schools as a genuine credit-then-cash-sale sequence, distinguished from prohibited Bai' al-'Inah because the commodity is sold on to an unrelated third party, not back to the original seller.",
    "subjectMatter": "A liquid, marketable commodity (e.g. exchange-traded metals, shares, or other tradable goods) purchased on deferred payment and then sold for spot cash, purely to generate liquidity rather than to acquire the commodity itself.",
    "ownershipRiskTiming": "The Mutawarriq (liquidity seeker) must take ownership and possession of the commodity from the original seller before reselling it to a genuinely separate third party; ownership/risk briefly passes through the client before being sold on for cash.",
    "returnType": "Fixed",
    "returnTypeDetail": "The bank's return is the fixed profit margin embedded in the credit sale price to the client, realized once the commodity is resold at spot for cash.",
    "typicalTenor": "Short-term, used mainly for liquidity management and interbank placements and for personal financing/credit cards.",
    "liquidityTradability": "The commodity must be genuinely transferred and sold, not merely papered over; commodity-exchange-based Tawarruq (e.g. LME) is flagged as vulnerable to Shari'ah violations if goods never actually move.",
    "commonUse": "Personal and consumer financing, credit cards, and interbank/treasury liquidity management (Commodity Murabaha/Shares Murabaha), used only when no other compliant financing option is available.",
    "keyConditions": [
      "The commodity must be sold to a genuine, unrelated third party -- reselling to the original seller makes it invalid Bai' al-'Inah.",
      "The bank should not appoint the Mutawarriq as its own agent to both buy and then sell the same commodity to himself.",
      "Where the bank acts as agent for the onward sale, this agency should not be stipulated as a condition inside the sale contract.",
      "The transaction must involve real transfer of ownership and possession of an actual commodity, not just an exchange of paperwork.",
      "Scholars cited in the book advise strictly limited, exceptional use, particularly discouraging it for individual consumer financing."
    ],
    "majorRisks": [
      "High Shari'ah-compliance risk -- widely regarded as a 'grey area' vulnerable to becoming a disguised interest loan if any step is mishandled.",
      "Reputational/systemic risk from widespread or careless use, which scholars warn could undermine the industry's credibility.",
      "Execution risk in commodity-exchange-based structures where actual transfer/possession of the underlying metal may be doubtful.",
      "Counterparty/settlement risk in the rapid buy-then-sell sequence across multiple brokers."
    ],
    "distinguishingFeature": "Unlike Bai' al-'Inah (prohibited), Tawarruq requires the commodity to be resold to a genuinely separate third party, and the buyer's motive is pure liquidity, not owning the commodity.",
    "source": { "chapter": 13, "section": "13.3", "pages": [349, 351] }
  },
  {
    "id": "juaalah",
    "name": "Ju'alah",
    "category": "Agency-based",
    "chapter": 13,
    "href": "#/chapter/13",
    "shariahBasis": "Permitted on the authority of the Qur'an (the King's lost-beaker reward in Surah Yousuf) and Sunnah; it is a contract where a specified reward is promised to whoever achieves a determined result, even where the work needed involves inherent uncertainty.",
    "subjectMatter": "A required end result (not a minutely specified task) to be achieved by an unspecified worker (the general public) or a specified worker, such as recovering a lost asset, collecting overdue debt, or producing a report.",
    "ownershipRiskTiming": "No corpus ownership transfer is involved; entitlement to the reward arises only upon realization of the specified result, and the worker bears the risk of unrewarded effort if the result is never achieved, except in specific defined cases.",
    "returnType": "Fee-based",
    "returnTypeDetail": "A fixed or result-proportional reward (Jua'l) is paid only upon successful realization of the stipulated result; partial advance payment 'on account' is possible but full entitlement stays contingent on completion.",
    "typicalTenor": "Can specify a completion deadline after which the worker forfeits the reward (extendable by mutual consent for genuine cause); otherwise open-ended until the result is achieved or the contract is terminated.",
    "liquidityTradability": "Not a tradable financial instrument -- it is a service/reward contract, and entitlement to reward is personal to the worker who achieves the result.",
    "commonUse": "Used by Islamic banks for recovery of overdue/nonperforming debts, securing feasibility studies to obtain financing, and brokerage -- suited to tasks Ijarah cannot cover because the work cannot be minutely specified in advance.",
    "keyConditions": [
      "The task (required end result) and the reward must both be clearly indicated, even though the work needed to achieve it may remain uncertain.",
      "The reward must be known, valuable, permissible, and deliverable once the result is achieved -- it can be a proportion of the realized result.",
      "The task must not already be a legal/employment obligation of the worker and must involve genuine effort.",
      "Ju'alah is non-binding before work commences (either party may terminate); once work begins, the offeror cannot revoke without paying a reasonable wage.",
      "Parallel Ju'alah is permitted -- a bank can be worker in one contract and offeror in an independent parallel contract with a third party."
    ],
    "majorRisks": [
      "No-result, no-reward risk for the worker -- if the task fails despite genuine effort, no compensation is due absent a specific exception.",
      "Ambiguity/dispute risk if the required result or reward is not clearly specified up front.",
      "Offeror revocation risk after work has commenced, obligating a reasonable wage despite no result yet achieved.",
      "Counterparty performance risk in Parallel Ju'alah, since the bank stays liable to the original offeror regardless of the parallel worker's performance."
    ],
    "distinguishingFeature": "Unlike Ijarah, Ju'alah does not require the work itself to be precisely specified -- only the end result and reward -- making it usable for tasks where the effort needed is inherently uncertain.",
    "source": { "chapter": 13, "section": "13.4", "pages": [351, 355] }
  },
  {
    "id": "sukuk",
    "name": "Sukuk",
    "category": "Capital Market",
    "chapter": 15,
    "href": "#/chapter/15",
    "shariahBasis": "AAOIFI defines Sukuk as certificates of equal value representing undivided ownership shares in tangible assets, usufruct, services, or a specified investment/project; compliance requires interest-bearing debt not to dominate the underlying pool, and the structure to rest on real modes such as Shirkah, Ijarah, Salam, or Istisna'a rather than a disguised loan.",
    "subjectMatter": "A pool or specific asset (real estate, equipment, receivables from real transactions, or a project) transferred to a special purpose vehicle (SPV)/special purpose Mudarabah, whose proportional undivided ownership is represented by the issued certificates.",
    "ownershipRiskTiming": "Sukuk holders collectively own the underlying assets from issuance (via the SPV) and bear the associated risk of loss/underperformance from that point; return and capital recovery depend on the actual performance of the specific underlying assets.",
    "returnType": "Mixed",
    "returnTypeDetail": "Return is variable/participatory when the underlying mode is Shirkah-based (profit/loss share) or quasi-fixed when based on Ijarah/fixed-return modes; a truly fixed return, as with conventional bonds, requires an independent third-party guarantee.",
    "typicalTenor": "Issued for a defined period against specific assets, ranging from about three months to ten years in the book's account of market practice.",
    "liquidityTradability": "Ijarah- and Shirkah-based Sukuk (representing real asset/usufruct ownership) can be actively traded at market-determined prices; Sukuk relying on Bai' al-Dayn-based secondary trading (criticized in some Malaysian structures) are Shari'ah-contentious among the majority of scholars.",
    "commonUse": "Sovereign and corporate funding of large infrastructure and development projects, an alternative to conventional bonds for issuers, and a liquidity-management/diversification instrument for Islamic banks -- the book's case studies include Pakistan's motorway and WAPDA power Sukuk.",
    "keyConditions": [
      "The underlying assets transferred to the SPV must involve a real, complete, irrevocable transfer, not merely a paper assignment.",
      "Interest-bearing debt must not be the dominant component of the asset pool for the certificates to be Shari'ah-compliant.",
      "In sale-and-lease-back Ijarah Sukuk, a reasonable interval should separate the sale to the SPV and any eventual repurchase, to avoid Bai' al-'Inah.",
      "Secondary-market trading must correspond to trading real ownership of tangible assets/usufruct (Ijarah/Shirkah basis), not a discounted debt claim (Bai' al-Dayn), which the majority of jurists reject.",
      "Any guarantee making returns fully fixed must come from an independent third party, not the issuer/manager guaranteeing its own capital or profit."
    ],
    "majorRisks": [
      "Shari'ah-compliance risk where structures (e.g. Bai' al-'Inah or Bai' al-Dayn-based secondary trading) resemble conventional interest-bearing bonds in substance.",
      "Asset/collateral risk -- variation in the value or performance of the underlying assets directly affects Sukuk holder returns.",
      "Credit and bankruptcy risk of the originator/obligor, plus payment risk from credit-enhancement providers and legal/regulatory risk.",
      "Liquidity and market risk, since secondary-market depth varies by structure, and reliance on Ijarah Sukuk alone may not sustain the industry's full securitization potential."
    ],
    "distinguishingFeature": "Unlike a conventional bond (a pure debt claim), a Sukuk represents proportional real ownership in underlying tangible assets, usufruct, or a project -- its return and tradability derive from that asset's actual performance.",
    "source": { "chapter": 15, "section": "15.1-15.4", "pages": [389, 416] }
  },
  {
    "id": "takaful",
    "name": "Takaful",
    "category": "Risk-Pooling",
    "chapter": 16,
    "href": "#/chapter/16",
    "shariahBasis": "Developed as a cooperative alternative to conventional insurance -- rejected by the majority of scholars for containing Riba, Gharar, and Maisir -- Takaful is grounded in mutual-help concepts like 'Aqilah (shared tribal responsibility) and Waqf (endowment), converting the relationship into mutual donation (Tabarru') rather than a commutative risk-transfer sale.",
    "subjectMatter": "Participant contributions (split into a donation/protection portion and, for family Takaful, a savings/investment portion) pooled into a Takaful (often Waqf) fund used to pay claims to participants who suffer a defined loss.",
    "ownershipRiskTiming": "Once contributed as Tabarru' (donation) to the fund, participants relinquish individual ownership of that portion; the underwriting surplus or deficit (UWS/UWL) belongs collectively to the participants, while the operator manages the fund as Wakil and/or Mudarib for a fee/profit share.",
    "returnType": "Mixed",
    "returnTypeDetail": "The operator earns a Wakalah management fee and/or a Mudarabah share of investment profit; participants may receive a share of any underwriting surplus and, in family Takaful, their accumulated savings/investment portion plus profit at maturity.",
    "typicalTenor": "Mirrors conventional insurance terms -- ongoing and renewed periodically for general Takaful, or running to a defined policy term for family (life) Takaful savings/protection plans.",
    "liquidityTradability": "Not a tradable market instrument; a participant's claim is a right to a defined benefit/beneficiary share from the fund, not a security, though the fund's own investments must be Shari'ah-compliant.",
    "commonUse": "Shari'ah-compliant risk cover for individuals and businesses, including insuring assets underlying other Islamic bank contracts (auto Ijarah, Murabaha goods in transit, Istisna'a projects), plus family (life) Takaful savings/protection plans.",
    "keyConditions": [
      "The core contribution (or a defined portion) must be structured as Tabarru' (donation) to the mutual fund, not a commutative premium-for-indemnity exchange.",
      "The underwriting surplus or deficit (UWS/UWL) must belong to the participants as a group, not to the operator/shareholders.",
      "The operator's compensation must be a defined Wakalah fee and/or Mudarabah profit share -- not a share of UWS alone without bearing corresponding downside.",
      "Fund investments must be made only in Shari'ah-compliant avenues, avoiding Riba-based instruments.",
      "A Waqf structure (or Wakalah-Waqf combination) is regarded by the cited contemporary scholarly consensus as the most Shari'ah-robust model."
    ],
    "majorRisks": [
      "Model-design (Shari'ah-compliance) risk -- pure Wakalah, pure Mudarabah, and combined models each face specific scholarly objections.",
      "Fund solvency/deficit risk -- if claims exceed the pool and reserves, the operator must extend Qard al-Hasan to cover the shortfall.",
      "Governance/trust risk given the operator's dual roles (Wakil and/or Mudarib) and the need for transparent surplus and fee allocation.",
      "Re-Takaful (reinsurance) counterparty risk when funds cede catastrophic-loss risk to re-Takaful operators."
    ],
    "distinguishingFeature": "Unlike conventional insurance's premium-for-indemnity risk transfer, Takaful is built on mutual donation (Tabarru') among participants, with the underwriting surplus belonging to the participant pool rather than the operator/shareholders.",
    "source": { "chapter": 16, "section": "16.1-16.4", "pages": [417, 426] }
  }
];
