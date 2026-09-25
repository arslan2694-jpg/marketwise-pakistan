window.IFL_DATA = window.IFL_DATA || {};
window.IFL_DATA.decisionTree = {
  "disclaimer": "Educational tool based on Muhammad Ayub's textbook; not a Shari'ah ruling or professional advice.",
  "root": "q-purpose",
  "questions": {
    "q-purpose": {
      "prompt": "What is the primary financing purpose?",
      "options": [
        { "label": "Buying/acquiring a specific existing asset or goods", "next": "q-cost-disclosure" },
        { "label": "Need goods manufactured, constructed, or delivered later against advance finance", "next": "q-existing-or-manufactured" },
        { "label": "Need the use of an asset without owning it outright", "next": "q-eventual-ownership" },
        { "label": "Partnering / investing in a business venture", "next": "q-active-management" },
        { "label": "Acquiring full ownership of a fixed asset gradually (e.g. a house)", "next": "r-diminishing-musharakah" },
        { "label": "Managing liquidity or raising capital-market funds", "next": "q-liquidity-or-capital-market" },
        { "label": "Covering the risk of loss to life or property (insurance-type need)", "next": "q-takaful-model" }
      ]
    },
    "q-cost-disclosure": {
      "prompt": "Do you want, or need, the seller to disclose the original cost and profit margin added to it?",
      "options": [
        { "label": "Yes, I want transparent cost-plus pricing", "next": "r-murabaha" },
        { "label": "No, just agree a final bargained price", "next": "r-musawamah" }
      ]
    },
    "q-existing-or-manufactured": {
      "prompt": "Does the item already exist in the market in standard, fungible form, or does it need to be custom manufactured or constructed?",
      "options": [
        { "label": "It exists in standard, fungible form, and I can pay the full price now for future delivery", "next": "r-salam" },
        { "label": "It needs custom manufacturing or construction, and I may need flexible payment terms", "next": "r-istisnaa" }
      ]
    },
    "q-eventual-ownership": {
      "prompt": "Do you eventually want to become the owner of the asset at the end of the usage period?",
      "options": [
        { "label": "No, I just need temporary use of the asset", "next": "r-ijarah" },
        { "label": "Yes, I want to transition to ownership over time", "next": "r-ijarah-mbt" }
      ]
    },
    "q-active-management": {
      "prompt": "Will the financier also actively co-invest and take part in managing the business, or just supply capital while someone else manages?",
      "options": [
        { "label": "The financier co-invests and may take part in management", "next": "q-loss-sharing" },
        { "label": "The financier supplies capital only; an expert manager (Mudarib) runs the business", "next": "r-mudarabah" }
      ]
    },
    "q-loss-sharing": {
      "prompt": "Will all partners remain full partners throughout, sharing losses strictly in proportion to their capital contribution?",
      "options": [
        { "label": "Yes, an ongoing full partnership with proportional loss-sharing", "next": "r-musharakah" },
        { "label": "No, we want one partner's ownership share to be periodically bought out by the other", "next": "r-diminishing-musharakah" }
      ]
    },
    "q-liquidity-or-capital-market": {
      "prompt": "Are you looking to raise immediate cash for yourself, or to mobilize funds from many investors for a project via tradable certificates?",
      "options": [
        { "label": "Raise immediate cash for myself or my business", "next": "q-liquidity-necessity" },
        { "label": "Mobilize funds from many investors via tradable certificates for a project", "next": "q-sukuk-basis" }
      ]
    },
    "q-liquidity-necessity": {
      "prompt": "Is this an unavoidable, limited corporate liquidity need, or more of a routine/consumer financing want?",
      "options": [
        { "label": "An unavoidable, limited corporate liquidity need", "next": "r-tawarruq" },
        { "label": "A routine or consumer financing want", "next": "r-caution-tawarruq" }
      ]
    },
    "q-sukuk-basis": {
      "prompt": "Will the certificates represent undivided ownership in real assets/usufruct/a Shari'ah-compliant project, or a pure interest-bearing debt claim?",
      "options": [
        { "label": "Undivided ownership in real assets or a project (Ijarah, Salam, Istisna'a or Shirkah basis)", "next": "r-sukuk" },
        { "label": "A pure interest-bearing debt claim with no underlying asset", "next": "r-non-compliant-debt" }
      ]
    },
    "q-takaful-model": {
      "prompt": "Do you mainly need Shari'ah-compliant, mutual risk-pooling cover, regardless of whether the operator uses a Mudarabah, Wakalah, or hybrid Wakalah-Mudarabah model?",
      "options": [
        { "label": "Yes, any recognized model of mutual risk-pooling cover", "next": "r-takaful" }
      ]
    }
  },
  "results": {
    "r-murabaha": {
      "modes": ["Murabaha"],
      "whyRelevant": "You need a specific, already-identifiable asset and want the seller/bank to disclose its cost and profit openly.",
      "basicStructure": "The bank purchases the asset (or has its client purchase it as its agent), takes ownership/possession, then resells it to the client at the disclosed cost plus an agreed profit margin, usually on deferred payment.",
      "keyConditions": ["Bank must own and bear the risk of the asset before reselling it", "Original cost and profit margin must be disclosed to the buyer", "Price, once agreed, cannot later be changed even on late payment", "Subject matter must exist, be owned, and be specifically identified"],
      "majorRisks": ["Customer refuses to purchase after the bank has bought the goods (mitigated with a binding promise and Hamish Jiddiyah)", "Risk of executing Murabaha on goods the bank never actually possessed (Bai' al-'Inah concern)"],
      "chapter": 9,
      "href": "#/chapter/9"
    },
    "r-musawamah": {
      "modes": ["Musawamah"],
      "whyRelevant": "You want an ordinary negotiated sale where the seller does not have to reveal cost.",
      "basicStructure": "Buyer and seller simply bargain and agree on a final price with no reference to the seller's cost; it can be a cash or deferred-payment sale.",
      "keyConditions": ["All general conditions of a valid Bai' still apply", "Seller is not obliged to disclose cost or profit", "Suitable when the seller cannot precisely ascertain its own cost, or does not wish to disclose a supplier discount"],
      "majorRisks": ["Less price transparency for the buyer than Murabaha", "Benchmarking a 'fair' profit margin is harder than in Murabaha"],
      "chapter": 9,
      "href": "#/chapter/9"
    },
    "r-salam": {
      "modes": ["Salam"],
      "whyRelevant": "A producer or seller needs cash now and can deliver a defined, fungible commodity at a fixed future date.",
      "basicStructure": "The buyer (bank) pays the full price in advance at the time of contract; the seller delivers a specified quantity and quality of a fungible good at an agreed future date and place.",
      "keyConditions": ["Full price must be paid on the spot", "Subject matter must be fungible and precisely specified (quality, quantity, grade)", "Delivery date and place must be fixed", "Cannot be used for money/currency or a specific, non-fungible item"],
      "majorRisks": ["Seller's failure or delay in supplying the goods", "Delivery of inferior-quality goods", "Market risk to the bank in reselling the goods after delivery"],
      "chapter": 10,
      "href": "#/chapter/10"
    },
    "r-istisnaa": {
      "modes": ["Istisna'a"],
      "whyRelevant": "You need something custom manufactured or constructed and want flexible payment terms.",
      "basicStructure": "The bank (as buyer, or as manufacturer via a Parallel Istisna'a subcontract) commissions manufacture/construction to agreed specifications; price can be paid immediately, deferred, or in instalments tied to progress.",
      "keyConditions": ["Subject matter must always be something requiring manufacture", "Contract becomes binding once the manufacturer starts work; before that, either party may cancel", "Price and specifications must be clearly agreed", "Delay penalties are permitted and treated as the purchaser's income"],
      "majorRisks": ["Delay or non-conformity of the finished item with specifications", "Separate ownership risk in each leg of a Parallel Istisna'a arrangement", "Manufacturer's performance risk"],
      "chapter": 10,
      "href": "#/chapter/10"
    },
    "r-ijarah": {
      "modes": ["Ijarah"],
      "whyRelevant": "You need temporary use of a nonconsumable asset without buying it outright.",
      "basicStructure": "The lessor retains ownership and its risks/expenses while transferring only the usufruct (right of use) to the lessee for an agreed rental over a defined period.",
      "keyConditions": ["Asset must be nonconsumable and its usufruct permissible", "Rent must be clearly determined and cannot be charged before the lessee can benefit from the asset", "Lessor bears ownership-related risk and major maintenance; lessee bears day-to-day running costs", "Lease must be for a fixed, time-bound period"],
      "majorRisks": ["Lessor loses entitlement to rent if usufruct is lost through no fault of the lessee", "Sub-lease and rent-review disputes if not clearly documented", "Risk of the lease resembling interest-based financing if ownership risk isn't genuinely borne by the lessor"],
      "chapter": 11,
      "href": "#/chapter/11"
    },
    "r-ijarah-mbt": {
      "modes": ["Ijarah Muntahia-bi-Tamleek"],
      "whyRelevant": "You want to use an asset now and transition to owning it at the end of the lease term.",
      "basicStructure": "A standard Ijarah lease runs alongside a separate, independent unilateral promise by the lessor to sell or gift the asset to the lessee at the end of the lease term.",
      "keyConditions": ["The lease and the ownership-transfer promise must be kept as two separate, independently enforceable contracts", "The promise must be unilateral (binding the promisor, not both parties) to avoid 'two contracts in one bargain'", "All standard Ijarah conditions (nonconsumable asset, defined rent, lessor bears ownership risk) still apply"],
      "majorRisks": ["Structuring risk if the sale/gift is embedded as a precondition of the lease itself", "Disputes over asset condition/ownership transfer at end of term"],
      "chapter": 11,
      "href": "#/chapter/11"
    },
    "r-musharakah": {
      "modes": ["Musharakah"],
      "whyRelevant": "Multiple parties want to invest capital and, optionally, jointly manage a business venture, sharing profit and loss.",
      "basicStructure": "All partners contribute capital (and may participate in management); profit is shared per any mutually agreed ratio, while loss must always be shared strictly in proportion to each partner's capital.",
      "keyConditions": ["Capital contributions should be clearly known/quantified", "Profit ratio is freely agreed at contract execution; loss ratio must equal the capital ratio", "All partners may take part in management unless restricted by agreement", "Liability is normally unlimited unless otherwise agreed"],
      "majorRisks": ["Business/operational risk shared by all partners", "Disputes over management authority or unauthorized commitments by a partner", "Valuation risk when calculating periodic profit distributions"],
      "chapter": 12,
      "href": "#/chapter/12"
    },
    "r-mudarabah": {
      "modes": ["Mudarabah"],
      "whyRelevant": "A capital provider (Rabbul-mal) wants to invest with a skilled manager (Mudarib) without managing the business personally.",
      "basicStructure": "The Rabbul-mal provides capital; the Mudarib manages the business and trades with it. Profit is split per a pre-agreed ratio; financial loss is borne solely by the Rabbul-mal unless the Mudarib was negligent or dishonest.",
      "keyConditions": ["Rabbul-mal has no right to participate in management beyond monitoring", "Profit ratio must be a proportion of realized profit, never a fixed sum or capital percentage", "Financial loss falls entirely on the capital provider absent Mudarib misconduct", "Sub-Mudarabah requires the Rabbul-mal's permission"],
      "majorRisks": ["Rabbul-mal bears all financial loss from normal business risk", "Moral hazard / information asymmetry regarding the Mudarib's diligence", "Difficulty verifying business performance until liquidation/settlement"],
      "chapter": 12,
      "href": "#/chapter/12"
    },
    "r-diminishing-musharakah": {
      "modes": ["Diminishing Musharakah"],
      "whyRelevant": "You want to acquire full ownership of a fixed asset (like a house) gradually, or have a partner's ownership share bought out over time.",
      "basicStructure": "Bank and client become co-owners of the asset (Shirkatulmilk); the bank leases its share to the client for rent; the client periodically buys units of the bank's share per an agreed schedule, and rent reduces as the client's ownership grows.",
      "keyConditions": ["Partnership, lease, and each unit sale must be separate, independently enforceable contracts", "In Shirkatulmilk (e.g. housing), a pre-agreed purchase-price schedule is permitted", "In DM for trade/profit-earning ventures, unit prices must be based on valuation at the time of sale, not pre-fixed"],
      "majorRisks": ["Ownership-related risk shared jointly between partners on a pro rata basis", "Valuation disputes when pricing units in a trade-based DM", "Documentation risk if the three contracts are not kept independent"],
      "chapter": 12,
      "href": "#/chapter/12"
    },
    "r-tawarruq": {
      "modes": ["Tawarruq"],
      "whyRelevant": "You have a genuine, limited need for cash liquidity and are willing to buy a commodity on credit and sell it, to a third party, for spot cash.",
      "basicStructure": "The client buys a commodity from the bank on deferred payment, then sells it (directly or via an independent third-party sale) for cash, obtaining liquidity while owing the deferred price to the bank.",
      "keyConditions": ["The client must sell to a third party, not back to the original seller (to avoid Bai' al-'Inah)", "All conditions of a valid, sequential sale (possession, independent contracts) must be met", "Scholars advise limiting Tawarruq to unavoidable corporate liquidity needs, not routine consumer financing"],
      "majorRisks": ["Risk of resembling Bai' al-'Inah / disguised interest if structured carelessly", "Systemic risk from wide, careless use, per the scholars the book cites", "Compliance risk if commodity possession/ownership isn't genuine"],
      "chapter": 13,
      "href": "#/chapter/13"
    },
    "r-caution-tawarruq": {
      "modes": ["Tawarruq (use with caution)"],
      "whyRelevant": "Your liquidity need looks more like routine or consumer financing than an unavoidable corporate need.",
      "basicStructure": "Tawarruq is technically permissible by the majority view when properly structured, but the book notes that scholars advise it be used only for unavoidable, limited corporate liquidity needs and kept out of individual consumer financing wherever possible.",
      "keyConditions": ["Reconsider whether an asset-based mode (Murabaha, Ijarah, Diminishing Musharakah) can meet the same need instead", "If Tawarruq is used, ensure genuine possession and a true third-party sale"],
      "majorRisks": ["Overuse creates systemic Shari'ah-compliance and reputational risk, per the scholars the book cites", "Risk of the transaction collapsing into disguised interest if not properly structured"],
      "chapter": 13,
      "href": "#/chapter/13"
    },
    "r-sukuk": {
      "modes": ["Sukuk (asset-backed securitization)"],
      "whyRelevant": "You want to mobilize funds from many investors for a project via tradable certificates backed by real assets.",
      "basicStructure": "The originator transfers ownership of underlying assets (or a project) to a Special Purpose Vehicle (SPV), which issues Sukuk representing investors' undivided ownership shares; investors earn returns from the assets' cash flows/appreciation, not a fixed interest coupon.",
      "keyConditions": ["Sukuk must represent real, undivided ownership in tangible assets, usufruct, services, or a specific Shari'ah-compliant project (Ijarah, Salam, Istisna'a, Shirkah bases, etc.)", "Mudarabah/Musharakah Sukuk may not guarantee capital or a fixed/percentage-of-capital return", "For lease/receivable securitization, actual pro-rata ownership of the underlying asset must pass to Sukuk holders"],
      "majorRisks": ["Credit/bankruptcy, performance, asset/collateral, payment, and return-rate risks (per the book's risk-analysis categories)", "Legal/regulatory risk from SPV structuring across jurisdictions", "Market/liquidity risk in the secondary trading of Sukuk"],
      "chapter": 15,
      "href": "#/chapter/15"
    },
    "r-non-compliant-debt": {
      "modes": ["Not Shari'ah-compliant as described"],
      "whyRelevant": "A certificate representing a pure debt/interest claim with no underlying real asset does not meet the Shari'ah bases for Sukuk.",
      "basicStructure": "This would function as a conventional interest-bearing bond, not a Sukuk — it falls outside AAOIFI's Shari'ah bases for investment Sukuk, which require ownership in tangible assets, usufruct, services, or a specified project.",
      "keyConditions": ["Reconsider structuring the issue on an Ijarah, Salam, Istisna'a, or Shirkah basis with real underlying assets", "Ensure no guarantee of capital or fixed return is embedded"],
      "majorRisks": ["Such an instrument would reintroduce Riba and would not be recognized as Shari'ah-compliant Sukuk"],
      "chapter": 15,
      "href": "#/chapter/15"
    },
    "r-takaful": {
      "modes": ["Takaful"],
      "whyRelevant": "You need protection against risk of loss (life or property) without the Riba, Gharar and Maisir the book identifies in conventional insurance.",
      "basicStructure": "Participants make donations (Tabarru') into a common fund (often structured as a Waqf); the fund pays out to members who suffer a loss, and the operator manages the fund/investments on a Mudarabah, Wakalah, or hybrid Wakalah-Mudarabah basis.",
      "keyConditions": ["Contributions are treated as donations (Tabarru'), not premiums bought against an unknown benefit", "Funds must be invested only in Shari'ah-compliant avenues", "In the model the book considers best, any underwriting surplus belongs to participants, distributed pro rata to contributions"],
      "majorRisks": ["Residual uncertainty within the group is minimized, not eliminated, by reserves and Qard al-Hasan from shareholders when needed", "Model-specific issues in Mudarabah or Wakalah-Mudarabah Takaful structures (e.g. expense allocation)", "Smaller risk pools may face higher volatility than large conventional insurers"],
      "chapter": 16,
      "href": "#/chapter/16"
    }
  }
};
