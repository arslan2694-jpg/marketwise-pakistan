/* Case studies. kind "textbook" = based on a box/case in the book (figures as given there);
   kind "practice" = generated for learning, applying the book's rules to new facts (always labelled). */
IFL_DATA.register('cases', [
  { id: "c-salam-wheat", kind: "textbook", title: "Wheat Salam with a third-party promise (Box 10.4)", topic: "t10.10", mode: "salam",
    scenario: "A farmer needs funds before harvest. On 1 January Bank B buys 5,000 tons of wheat from him for Rs.100 million paid immediately, delivery on 1 May. Company C promises to buy the wheat from B for Rs.115 million on 1 May and pays Rs.15 million as Hamish Jiddiyah.",
    facts: ["Salam price Rs.100m paid in full on 1 January", "Delivery 1 May", "Promise by C: Rs.115m, HJ Rs.15m"],
    questions: [
      { q: "Why must B pay the full Rs.100 million on 1 January?", options: ["To earn interest", "Full prepayment is a condition of Salam", "Because C paid HJ", "It is optional"], answer: 1, explanation: "Salam capital must be paid at the contract (Section 10.4.2)." },
      { q: "If C refuses to buy on 1 May and B sells the wheat in the market for Rs.108 million, what may B recover from the HJ?", options: ["Rs.15m", "Rs.7m (actual loss)", "Nothing", "Rs.15m plus cost of funds"], answer: 1, explanation: "Only actual loss (115 − 108 = 7) may be recovered from Hamish Jiddiyah; the rest is returned. (Practice extension — generated for learning.)" },
      { q: "Could B sell the wheat to C before taking delivery by an ordinary sale?", options: ["Yes", "No — goods bought on Salam cannot be sold before possession; B may use a promise or Parallel Salam", "Only if C is a bank", "Only at cost"], answer: 1, explanation: "Section 10.6." }
    ],
    analysis: "B earns Rs.15m gross by bearing delivery, quality and price risk until it sells. The promise gives B a buyer but does not itself sell the wheat before delivery.",
    takeaways: ["Full prepayment", "Promise + HJ protects against refusal", "Actual loss only"] },
  { id: "c-ijarah-car", kind: "textbook", title: "Leased car destroyed (Box 11.3)", topic: "t11.6", mode: "ijarah",
    scenario: "A car leased under IMBT is destroyed without the lessee's negligence. The bank's outstanding investment plus prepaid expenses are Rs.370,000; the Takaful claim received is Rs.450,000; the client had paid a Rs.50,000 security deposit.",
    facts: ["Outstanding investment + prepaid: Rs.370,000", "Takaful claim: Rs.450,000", "Security deposit: Rs.50,000"],
    questions: [
      { q: "What happens to the lease?", options: ["Continues", "Terminates; rent stops", "Doubles", "Converts to Murabaha"], answer: 1, explanation: "Destruction of the identified asset without lessee fault ends the Ijarah (Section 11.5.1)." },
      { q: "How much should the client receive per AAOIFI 8/8?", options: ["Rs.50,000", "Rs.80,000", "Rs.130,000", "Nothing"], answer: 2, explanation: "Deposit 50,000 + Takaful surplus 80,000 (450,000 − 370,000) = Rs.130,000 (Box 11.3)." }
    ],
    analysis: "The lessor bears ownership risk, so the Takaful claim belongs to it; but since the client paid rent calculated to transfer ownership, AAOIFI 8/8 returns the excess to the client.",
    takeaways: ["Lessor bears destruction risk", "No rent after destruction", "Surplus refunded (AAOIFI 8/8)"] },
  { id: "c-dm-house", kind: "textbook", title: "Housing Diminishing Musharakah (Box 12.5)", topic: "t12.9.2", mode: "dm",
    scenario: "A client buys a house costing 1.0 million with 80% bank financing over 10 years. The bank's share (800,000) is divided into 120 monthly units; rent is 7% p.a. on the bank's outstanding investment.",
    facts: ["Bank share 800,000; client 200,000", "120 units of 6,666.67", "Rent 7% p.a. on outstanding"],
    questions: [
      { q: "What is the month-1 payment?", options: ["6,666.67", "4,666.67", "11,333.33", "11,294.44"], answer: 2, explanation: "6,666.67 unit + 800,000 × 7% ÷ 12 = 4,666.67 → 11,333.33." },
      { q: "If the client delays, what happens to the rent?", options: ["It stops", "It does not decrease — rent continues on units the bank still owns", "It doubles", "It becomes interest"], answer: 1, explanation: "Box 12.5 commentary." },
      { q: "May the unit price be pre-agreed in this structure?", options: ["No, never", "Yes — it is DM in Shirkatulmilk", "Only in trade", "Only with a guarantee"], answer: 1, explanation: "Section 12.8." }
    ],
    analysis: "Because the bank earns rent on its share, delay reduces its income less than in Murabaha; a pre-agreed price schedule is permitted because the partnership is in ownership rather than a trading business.",
    takeaways: ["Rent falls as units are bought", "Three separate contracts", "Pre-agreed price only in Shirkatulmilk"] },
  { id: "c-sitara", kind: "textbook", title: "Sitara Chemical's Musharakah TFCs (Box 12.3)", topic: "t12.7.3", mode: "musharakah",
    scenario: "Sitara Chemical issued 5-year Musharakah-based TFCs of Rs.360 million in 2002. Level I: on the first Rs.100 million of operating profit, 12% p.a. of outstanding principal (reduced proportionately if profit is lower). Level II: 2% per further Rs.100 million, one quarter to a Takaful reserve.",
    facts: ["Rs.360m, 5 years", "Level I: (OP/100m) × 12%", "Level II: 2% per extra 100m; ¼ to Takaful reserve"],
    questions: [
      { q: "Operating profit is Rs.75 million. Level I rate?", options: ["12%", "9%", "7.5%", "2%"], answer: 1, explanation: "75/100 × 12% = 9%. (Practice figure applying Box 12.3's formula.)" },
      { q: "If the company makes an operating loss, how is it absorbed?", options: ["Company guarantees principal", "First from the Takaful reserve, then against principal at redemption", "By increasing profit rate", "Not absorbed"], answer: 1, explanation: "Box 12.3." }
    ],
    analysis: "Returns are genuinely linked to operating results and investors bear losses — a real PLS instrument. In practice returns were 15–24% p.a.",
    takeaways: ["Profit linked to performance", "Loss sharing via reserve then principal"] },
  { id: "c-cotton", kind: "textbook", title: "Salam + Murabaha for cotton (Box 14.2)", topic: "t14.3.2", mode: "salam",
    scenario: "A bank buys cotton from growers on Salam. A textile mill promises to buy it at an agreed price. At harvest the bank appoints the mill as its agent to take delivery, then sells to the mill on Murabaha.",
    facts: ["Salam with growers", "Mill's promise", "Mill as agent for delivery", "Murabaha sale to mill"],
    questions: [
      { q: "Who benefits from price protection?", options: ["Only the bank", "Farmer (cash and price risk managed) and mill (hedge)", "Nobody", "Only the government"], answer: 1, explanation: "Box 14.2." },
      { q: "When may the bank sell to the mill?", options: ["Before delivery by the growers", "After the mill, as agent, has taken delivery on the bank's behalf", "At the Salam contract date", "Any time"], answer: 1, explanation: "Goods must be in the bank's possession (via agent) before its Murabaha sale." }
    ],
    analysis: "Combining modes deploys funds longer, spreads exposure across two sectors and removes the inventory problem of pure Salam.",
    takeaways: ["Combine modes, keep contracts separate", "Agent possession precedes sale"] },
  { id: "c-bill", kind: "textbook", title: "Musawamah alternative to bill discounting (Section 14.4.2)", topic: "t14.4.2", mode: "musawamah",
    scenario: "On 1 January an exporter wants cash against a US$100,000 bill due in 55 days. Spot is Rs.57.75/US$. The Islamic bank quotes Rs.57.60 and funds Rs.5,760,000 under an agency agreement for raw materials; the client then buys the stock from the bank for US$100,000 payable on the bill's due date.",
    facts: ["Bill US$100,000, 55 days", "Spot 57.75; bank rate 57.60", "Funding Rs.5,760,000"],
    questions: [
      { q: "Why is ordinary bill discounting not allowed?", options: ["It is too slow", "It is sale of debt at a discount — Riba", "It needs an L/C", "It is Tawarruq"], answer: 1, explanation: "Section 14.4.2." },
      { q: "What turns this into a Shari’ah-compliant transaction?", options: ["A lower rate", "Real purchase of goods by the bank (via agent) and sale to the client for a deferred dollar price", "A guarantee", "Rollover"], answer: 1, explanation: "Musawamah on goods owned by the bank." }
    ],
    analysis: "The bank earns through a sale of goods it owned, not by discounting a receivable.",
    takeaways: ["No debt discounting", "Real goods, real ownership"] },
  { id: "c-idb", kind: "textbook", title: "IDB Solidarity Trust Sukuk (2003)", topic: "t15.3.5.d", mode: "sukuk",
    scenario: "IDB issued US$400 million of trust certificates backed by a portfolio of Ijarah, Murabaha and Istisna‘a assets. Ijarah assets had to exceed 50%; if they fell below 25%, a dissolution event triggered IDB's purchase undertaking. IDB guaranteed obligors' scheduled payments and provided liquidity.",
    facts: ["US$400m", "Ijarah > 50% at all times", "< 25% Ijarah → dissolution", "Redemption at 100% of principal"],
    questions: [
      { q: "Why must Ijarah assets exceed 50%?", options: ["For higher yield", "So the Sukuk represent mainly tangible assets and can trade at market price", "To satisfy LIBOR", "For tax"], answer: 1, explanation: "Mixed pool rule (Sections 15.3.5, 14.4.3)." },
      { q: "What does IDB's guarantee cover?", options: ["The certificates as such", "Scheduled payments by obligors of the underlying assets", "Nothing", "Currency risk"], answer: 1, explanation: "Section 15.3.5." }
    ],
    analysis: "A mixed pool converts illiquid receivables into tradable paper as long as tangible assets dominate; the guarantee structure raises the fixed-return concern discussed in Section 15.3.7.",
    takeaways: [">50% tangible", "Guarantee of obligor payments", "Fixed-return debate"] },
  { id: "c-pak-sukuk", kind: "textbook", title: "Pakistan's sovereign Ijarah Sukuk (Box 15.6)", topic: "t15.4.cases", mode: "sukuk",
    scenario: "In January 2005 Pakistan International Sukuk Company bought M-2 motorway land from the National Highway Authority, issued US$600 million of trust certificates at six-month LIBOR + 220 bps, and leased the land to the government, which will repurchase it at maturity.",
    facts: ["US$600m; orders US$1.2bn", "Asset: M-2 motorway land", "Rent: 6-month LIBOR + 220 bps", "Rated B+"],
    questions: [
      { q: "What structure is this?", options: ["Bai‘ al ‘Inah", "Sale and lease-back Ijarah Sukuk", "Mudarabah Sukuk", "Salam Sukuk"], answer: 1, explanation: "Box 15.6." },
      { q: "Can these certificates trade at market price?", options: ["No, only par", "Yes — they represent ownership of the leased asset", "Only to the government", "Only after maturity"], answer: 1, explanation: "Box 15.3: Ijarah Sukuk of existing assets trade at market price." }
    ],
    analysis: "A sovereign with durable assets can replace interest-based borrowing; Shari’ah scholars recommend time gaps and true sale to avoid resemblance to ‘Inah.",
    takeaways: ["Government needs real assets", "Rent benchmark as pricing tool"] },
  { id: "c-takaful-fund", kind: "practice", title: "Takaful fund year-end (practice — generated for learning)", topic: "t16.4.1", mode: "takaful",
    scenario: "A Wakalah–Waqf Takaful fund receives Rs.20 million of contributions. The operator's fee is 25%. Claims and re-Takaful cost Rs.12 million. Investment profit on the fund is Rs.1 million, shared 40:60 between operator (Mudarib) and fund.",
    facts: ["Contributions 20m", "Fee 25%", "Claims + re-Takaful 12m", "Investment profit 1m, split 40:60"],
    questions: [
      { q: "Operator's Wakalah fee?", options: ["Rs.2m", "Rs.5m", "Rs.8m", "Rs.4m"], answer: 1, explanation: "25% × 20m = Rs.5m." },
      { q: "Underwriting surplus before investment profit?", options: ["Rs.8m", "Rs.3m", "Rs.15m", "Rs.0"], answer: 1, explanation: "20 − 5 − 12 = Rs.3m, belonging to participants." },
      { q: "Fund's share of investment profit?", options: ["Rs.0.4m", "Rs.0.6m", "Rs.1m", "Rs.0.25m"], answer: 1, explanation: "60% × 1m." }
    ],
    analysis: "The operator earns a fee and a Mudarib share but does not take the underwriting surplus — consistent with the preferred model in Section 16.4.1.",
    takeaways: ["Fee + Mudarib share for operator", "Surplus to participants"] },
  { id: "c-musharakah-loss", kind: "practice", title: "Trade Musharakah with a loss (practice — generated for learning)", topic: "t12.3.4", mode: "musharakah",
    scenario: "A bank (Rs.6m) and an importer (Rs.4m) finance a consignment on Musharakah. The importer manages and gets 50% of profit. The goods are damaged by a flood (no negligence) and sold at an overall loss of Rs.1m.",
    facts: ["Capital 60:40", "Profit ratio 50:50", "Loss Rs.1m, no negligence"],
    questions: [
      { q: "Bank's share of the loss?", options: ["Rs.0.5m", "Rs.0.6m", "Rs.1m", "Nothing"], answer: 1, explanation: "Loss follows capital: 60% × 1m." },
      { q: "Can the bank enforce the importer's security for this loss?", options: ["Yes", "No — security covers only negligence, misconduct or breach", "Only half", "Only if agreed"], answer: 1, explanation: "Section 12.3.5." }
    ],
    analysis: "PLS means the bank genuinely shares losses; collateral protects only against negligence.",
    takeaways: ["Loss by capital", "Collateral limited to negligence"] },
  { id: "c-mpo-agent", kind: "practice", title: "Murabaha documentation check (practice — generated for learning)", topic: "t9.8.3", mode: "murabaha",
    scenario: "A bank signs an agency agreement on 10 March. The client's supplier invoice is dated 5 March, and the client declares possession and offers to buy on 20 March after already using half the goods in production on 18 March.",
    facts: ["Agency 10 March", "Invoice 5 March", "Goods partly consumed 18 March", "Offer 20 March"],
    questions: [
      { q: "What is wrong with the invoice date?", options: ["Nothing", "It predates the agency — the client bought for himself, making resale to him ‘Inah-like", "It is too late", "Invoices are not needed"], answer: 1, explanation: "Invoice must not be earlier than the agency (Box 9.1 and Section 9.8.3)." },
      { q: "What about goods consumed before the offer?", options: ["Fine", "Murabaha cannot be executed on goods that no longer exist", "Increase the price", "Treat as Ijarah"], answer: 1, explanation: "Goods must exist at offer and acceptance (Section 14.3.4)." }
    ],
    analysis: "Sequencing and existence of goods decide compliance; income from such transactions should go to charity per Shari’ah board rulings.",
    takeaways: ["Agency before purchase", "Goods must exist at sale"] }
]);
