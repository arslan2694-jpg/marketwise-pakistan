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
    takeaways: ["Agency before purchase", "Goods must exist at sale"] },
  { id: "c-wapda", kind: "textbook", title: "WAPDA’s local-currency Ijarah Sukuk (Box 15.7)", topic: "t15.4.cases", mode: "sukuk",
    scenario: "WAPDA needed funds to expand power generation. An SPV, WAPDA First Sukuk Co (WFS), bought ten generation units at the Mangla Hydel Power Station from WAPDA and leased them back to WAPDA for seven years. The issue raised PKR 8,000 million. Rent is 6-month KIBOR + 35 bps, paid semi-annually. At maturity WAPDA buys the turbines back under a unilateral undertaking, and the government of Pakistan guarantees WAPDA’s payment obligation.",
    facts: ["PKR 8,000m, privately placed floating-rate notes", "Asset: ten Mangla turbines; 7-year lease-back", "Rent: 6-m KIBOR + 35 bps, semi-annual", "Government guarantee; eligible for banks’ SLR"],
    questions: [
      { q: "What do the Sukuk holders own?", options: ["A loan to WAPDA", "Through WFS, the turbines, with the related ownership risk", "WAPDA shares", "A claim on KIBOR"], answer: 1, explanation: "Ijarah Sukuk must represent ownership of the leased assets, not only the right to rent (pp. 402, 414)." },
      { q: "Rent is tied to KIBOR. Does that make the Sukuk interest-based?", options: ["Yes", "No — mainstream scholars allow an interest benchmark to price rent, though not ideal; the lessor still bears ownership risk", "Only if KIBOR rises", "Only for banks"], answer: 1, explanation: "p. 401; Chapter 11 on benchmarks." },
      { q: "How does WAPDA’s repurchase avoid being ‘Inah?", options: ["It does not", "It is a unilateral undertaking to buy after a seven-year lease, not a condition-linked immediate buy-back", "Because the government guarantees it", "Because the rent is floating"], answer: 1, explanation: "Sale and lease-back is allowed if the sale is complete first; scholars recommend at least a year before repurchase (p. 397)." },
      { q: "Why could Islamic banks hold these Sukuk for their statutory liquidity requirement?", options: ["Because they pay interest", "Because the government guaranteed WAPDA’s payment obligation", "Because they are shares", "Because they are Salam"], answer: 1, explanation: "Box 15.7." }
    ],
    analysis: "A standard sovereign-type sale and lease-back. The Shari’ah questions are whether ownership genuinely passed to WFS and whether the contracts are independent. The book’s wider concern (Section 15.3.7) is that returns presented as fixed sit uneasily with the lessor’s ownership risks.",
    takeaways: ["Ownership, not just rent, must pass", "Benchmark is a pricing tool", "Repurchase by separate undertaking", "Guarantee made it SLR-eligible"] },
  { id: "c-nakheel", kind: "textbook", title: "Nakheel’s US$3.52 billion Sukuk (Box 15.5)", topic: "t15.4.cases", mode: "sukuk",
    scenario: "Nakheel, the property arm of Dubai’s DP World group, launched a three-year Sukuk structured as a convertible sale and lease-back. The initial offer of US$2.5 billion was raised to US$3.52 billion, priced at LIBOR + 120 bps and listed on the Dubai International Financial Exchange. Barclays Capital and Dubai Islamic Bank were joint lead managers. Security included a mortgage on land, a pledge of shares in the operating company and a guarantee from Dubai World.",
    facts: ["US$3.52bn (up from 2.5bn), 3 years, LIBOR + 120 bps", "About 100 accounts: 38 % Middle East, 40 % Europe, 22 % rest of world", "55 % banks, 35 % fixed-income and convertible funds", "Mortgage, share pledge, Dubai World guarantee"],
    questions: [
      { q: "If LIBOR is 5.25 %, what periodic rate do holders receive?", options: ["5.25 %", "6.45 %", "1.20 %", "6.25 %"], answer: 1, explanation: "5.25 + 1.20 = 6.45 % (Box 15.5)." },
      { q: "What does the investor profile suggest, according to the chapter?", options: ["Sukuk appeal only to Gulf investors", "Strong demand beyond the Muslim world — 40 % European", "Sukuk are illiquid", "Only individuals buy Sukuk"], answer: 1, explanation: "p. 411." },
      { q: "Which feature raises the Section 15.3.7 concern most directly?", options: ["Listing on an exchange", "A return presented as conclusively fixed, backed by a group guarantee", "The use of a lead manager", "The three-year tenor"], answer: 1, explanation: "The book questions pre-fixed returns and issuer-side guarantees (pp. 409–410)." }
    ],
    analysis: "The book presents Nakheel as evidence of the market’s depth and liquidity: active secondary trading followed the December 2006 issue. Read against Section 15.3.7, it also shows how strongly Sukuk are structured to look like fixed-income bonds.",
    takeaways: ["Global investor base", "LIBOR-based pricing", "Heavy security package", "Fixed-return concern"] },
  { id: "c-dm-construction", kind: "textbook", title: "Building a house on the client’s land by DM (Box 12.4)", topic: "t12.9.2", mode: "dm",
    scenario: "A client owns a plot worth 1,000,000 dirhams and needs 800,000 to build a house. The bank buys 8 of 10 units of the land (800,000) to create joint ownership and pays the proceeds in four equal instalments. The client builds with the money. When the house is habitable the bank leases its share to the client, who has undertaken to buy the bank’s units on a pre-agreed price schedule.",
    facts: ["Land 1,000,000; bank buys 8 units of 100,000", "Disbursement in four instalments of 200,000", "Shirkatulmilk with a pre-agreed unit price schedule", "Rent on the bank’s share once habitable"],
    questions: [
      { q: "How much is each disbursement instalment?", options: ["100,000", "200,000", "800,000", "250,000"], answer: 1, explanation: "800,000 ÷ 4 (Box 12.4)." },
      { q: "When does the bank begin selling its units to the client?", options: ["Immediately", "One year after the last instalment", "When construction starts", "After ten years"], answer: 1, explanation: "The one-year gap is suggested to avoid Bai‘ al ‘Inah (p. 341)." },
      { q: "During the first year after the house is ready, what happens to the rent?", options: ["It decreases monthly", "It stays constant — only rent is paid, since no units are sold yet", "It is waived", "It doubles"], answer: 1, explanation: "Box 12.4." },
      { q: "In a renovation case (client already lives in the house), when does rent start?", options: ["After a year", "From the first month after the first tranche", "Never", "At completion only"], answer: 1, explanation: "Box 12.4." }
    ],
    analysis: "The structure is a purchase and lease-back of undivided shares in Shirkatulmilk, so a pre-agreed unit price is allowed. The one-year gap before unit sales keeps the purchase and resale from collapsing into ‘Inah.",
    takeaways: ["Sale and lease-back of land units", "Rent from habitation", "One-year gap before buy-back", "Pre-agreed price allowed in Shirkatulmilk"] },
  { id: "c-wujooh-lc", kind: "textbook", title: "Import finance by Shirkatul Wujooh (Box 12.2)", topic: "t12.7.2", mode: "musharakah",
    scenario: "A utility awards ABC & Co a contract to supply imported equipment. ABC and an Islamic bank form a partnership in creditworthiness (Shirkatul Wujooh), with no capital from either side. The bank issues a Rs.10 million usance L/C in favour of XYZ Machines, Italy, on 180 days’ credit. The equipment is flown in, cleared in about 30 days and installed in about 50. After the utility’s acceptance test, payment arrives within 150 days of shipment. Profit is shared at the agreed ratio and the bank settles the L/C on the due date.",
    facts: ["Usance L/C Rs.10m, 180 days’ credit", "Customs ~30 days; installation ~50 days", "Payment within 150 days of shipment", "No capital contributed: purchase on credit, sale at spot"],
    questions: [
      { q: "What makes this Shirkatul Wujooh rather than Shirkah al ‘Inan?", options: ["The bank lends money", "The partners buy on their credit without investing capital, and share the resale profit", "It is a Mudarabah", "The supplier is foreign"], answer: 1, explanation: "Section 12.2.2 and Box 12.2." },
      { q: "Which school holds this form unlawful?", options: ["Hanafi", "Shafi‘i", "Hanbali", "All schools"], answer: 1, explanation: "Hanafis and Hanbalis accept it; Malikis require obligations to be specified first (pp. 310–311)." },
      { q: "Why is the 180-day credit period important?", options: ["It earns interest", "Customer payment (within 150 days) arrives before the L/C falls due, so no funding gap arises", "It is required by law", "It lets the bank charge a time fee"], answer: 1, explanation: "Box 12.2 timeline." },
      { q: "If the equipment fails acceptance without ABC’s negligence and the sale yields a loss, who bears it?", options: ["ABC only", "The partners in proportion to the liability they agreed", "The bank only", "The supplier"], answer: 1, explanation: "In Wujooh, loss is borne as per the liability taken at the beginning (p. 311); security covers only negligence (p. 335)." }
    ],
    analysis: "Box 12.2 is the book’s argument that Shirkah can work in trade finance for single transactions. Profit comes from real trade, and the bank shares the risk of the deal.",
    takeaways: ["Partnership in creditworthiness", "Credit period matches cash cycle", "Loss by agreed liability", "Security only against negligence"] },
  { id: "c-mudarib-capital", kind: "textbook", title: "Bank investing its own funds in a Mudarabah (Section 12.4.1)", topic: "t12.4.1", mode: "mudarabah",
    scenario: "Depositors provide $2,000 to a Mudarabah and the bank, as Mudarib, adds $1,000 of its own. The agreed Mudarabah ratio is 50:50. The business earns a profit of $300.",
    facts: ["Depositors $2,000; bank $1,000", "Mudarabah ratio 50:50", "Profit $300"],
    questions: [
      { q: "How much does the bank get as profit on its own capital first?", options: ["$150", "$100", "$200", "$300"], answer: 1, explanation: "Its capital is one-third of the total: 300 × 1/3 = $100 (p. 323)." },
      { q: "What is the bank’s total profit?", options: ["$100", "$200", "$150", "$250"], answer: 1, explanation: "$100 on its capital + half of the remaining $200 as Mudarib = $200." },
      { q: "What do depositors receive?", options: ["$200", "$100", "$150", "$300"], answer: 1, explanation: "Half of $200 = $100." },
      { q: "If instead there were a loss of $300, who would bear it?", options: ["Depositors only", "Depositors and bank in proportion to capital — $200 and $100", "The bank only, as Mudarib", "Nobody"], answer: 1, explanation: "A Mudarib who contributes capital bears loss pro rata (p. 326)." }
    ],
    analysis: "When the Mudarib invests too, profit is first allocated to capital by proportion, and the rest is shared by the Mudarabah ratio. The bank wears two hats: investor and manager.",
    takeaways: ["Profit on own capital first", "Remainder by Mudarabah ratio", "Loss by capital"] },
  { id: "c-jualah-recovery", kind: "practice", title: "Debt recovery by Ju‘alah (practice — generated for learning)", topic: "t13.4.6", mode: "jualah",
    scenario: "An Islamic bank has Rs.20 million of overdue receivables. It signs a Ju‘alah with Recovery Co.: a reward of 4 % of amounts actually collected within 12 months, with Rs.200,000 paid in advance on account. After 5 months the bank cancels the contract. By then Recovery Co. has collected Rs.3 million and done substantial work on the rest.",
    facts: ["Receivables Rs.20m; reward 4 % of collections", "Advance Rs.200,000 on account", "Cancelled by the bank after 5 months; Rs.3m collected"],
    questions: [
      { q: "Is a reward stated as a percentage of collections valid?", options: ["No, it must be a fixed sum", "Yes — the reward may be a portion of the realised result", "Only if under 1 %", "Only for banks"], answer: 1, explanation: "p. 352." },
      { q: "What is Recovery Co. entitled to for the Rs.3m collected?", options: ["Nothing", "Rs.120,000 (4 % of 3m)", "Rs.800,000", "Rs.200,000"], answer: 1, explanation: "4 % × 3,000,000 (applying p. 352)." },
      { q: "The bank cancelled after work had begun. What does the book say about the remaining work?", options: ["Nothing is payable", "The offeror must pay the common market remuneration for work done", "Full reward on all Rs.20m", "Only the advance"], answer: 1, explanation: "p. 353." },
      { q: "What is the status of the Rs.200,000 advance?", options: ["Earned outright", "An on-account payment, adjusted against what the worker is entitled to", "A penalty", "A gift"], answer: 1, explanation: "p. 355." }
    ],
    analysis: "Ju‘alah fits recovery work because the effort needed is uncertain but the result, cash collected, is measurable. Cancellation after work has begun triggers a market wage; the advance is only on account.",
    takeaways: ["Reward as % of result", "Market wage after revocation", "Advances on account"] },
  { id: "c-tawarruq-check", kind: "practice", title: "Reviewing three Tawarruq proposals (practice — generated for learning)", topic: "t13.3", mode: "tawarruq",
    scenario: "A bank’s product committee brings three structures to the Shari’ah board. (A) The bank buys copper, sells it to the client on credit, and the client sells it in the market himself. (B) The client is appointed the bank’s agent to buy copper and then sells it to himself on credit. (C) The credit-sale contract states that the bank will act as the client’s agent to sell the copper in the market.",
    facts: ["Three alternative structures", "Commodity: copper with an active market", "Client needs cash"],
    questions: [
      { q: "What is the ruling on structure A?", options: ["Invalid", "No Shari’ah problem, if genuine ownership and possession occur", "Riba", "‘Inah"], answer: 1, explanation: "p. 350." },
      { q: "What is the ruling on structure B?", options: ["Valid", "Invalid — purchase and sale are interdependent and the bank has not taken possession or risk", "Valid but not advisable", "Makruh only"], answer: 1, explanation: "p. 350." },
      { q: "What is the ruling on structure C?", options: ["Valid", "Invalid, because the agency is stipulated in the sale; it would be valid but not advisable if arranged after an unconditional sale", "Always recommended", "Valid if disclosed"], answer: 1, explanation: "p. 350." },
      { q: "Even for structure A, what policy do the scholars cited recommend?", options: ["Unlimited use", "Limited use for unavoidable corporate liquidity needs; Kahf would exclude consumers", "Use only for credit cards", "Replace Musharakah with it"], answer: 1, explanation: "p. 350." }
    ],
    analysis: "Validity depends on the sequence of ownership, possession and independent contracts. Even a valid Tawarruq raises a policy question: its extensive use could create systemic risk.",
    takeaways: ["Third-party sale only", "No self-dealing agency", "No stipulated resale agency", "Use sparingly"] },
  { id: "c-mudarabah-sukuk-trade", kind: "practice", title: "When may Mudarabah Sukuk trade above par? (practice — generated for learning)", topic: "t15.3.5", mode: "sukuk",
    scenario: "A Mudarabah Sukuk fund raises Rs.500 million. In month 1 all of it is still cash in the bank. By month 6 it holds Rs.100m cash, Rs.150m receivables and Rs.250m of machinery and inventory. By month 18 it holds Rs.50m cash, Rs.200m receivables and Rs.300m real assets. A holder wants to sell his Sukuk above face value.",
    facts: ["Month 1: 100 % cash", "Month 6: 50 % real assets", "Month 18: about 55 % real assets"],
    questions: [
      { q: "At month 1, how may the Sukuk be traded?", options: ["At any price", "Only at face value, under Bai‘ al Sarf rules, as money for money", "Not at all", "At a discount only"], answer: 1, explanation: "OIC Fiqh Council (1988) rules (pp. 398–399)." },
      { q: "At month 18 the fund holds a mix of cash, receivables and real assets. What pricing rule applies under the OIC resolution?", options: ["Face value only", "Market price by mutual consent", "Debt rules only", "Trading banned"], answer: 1, explanation: "p. 399." },
      { q: "Under the more-than-50 % non-liquid test used elsewhere in the book, is month 6 enough?", options: ["Yes, 50 % is enough", "No — real assets must exceed 50 %; month 18 (about 55 %) passes", "Yes, receivables count as real assets", "The test does not apply to Sukuk"], answer: 1, explanation: "Receivables are treated as liquid, like money (pp. 330, 400)." }
    ],
    analysis: "The same certificate moves from money, to a mix, to mainly assets, and its permissible pricing changes with it. The book also shows scholars differ on the threshold: above 50 %, some say 33 %, and the Hanafis attach no fixed proportion.",
    takeaways: ["Cash stage: par only", "Mixed stage: market price", "Receivables count as liquid"] }
]);
