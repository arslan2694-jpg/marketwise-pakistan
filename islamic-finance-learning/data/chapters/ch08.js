/* Chapter 8 — Overview of Financial Institutions and Products: Conventional and Islamic. Source pp. 179–212. */
IFL_DATA.registerChapter({
  number: 8,
  title: "Overview of Financial Institutions and Products: Conventional and Islamic",
  part: "part-iii",
  pages: [179, 212],
  minutes: 80,
  difficulty: "Intermediate",
  objectives: [
    "Describe the origin and functions of banks and their strategic position as intermediaries.",
    "Outline conventional commercial banking (deposits and assets), investment banking, NBFIs and financial markets.",
    "Explain why Islamic banks are needed and the structure, deposit side and asset side of Islamic banking.",
    "Compute profit and loss distribution in a Mudarabah deposit pool using weightages (Box 8.1).",
    "Evaluate the debate on mode preference (PLS vs exchange-based modes).",
    "Explain Islamic investment banking, Islamic funds, screening and purification criteria, and principles relating to stocks.",
    "Describe Sukuk, trading rules for instruments, inter-bank markets, forward markets, FX forward cover and the Islamic view of derivatives."
  ],
  why: "This is the bridge from theory to the banking industry. It maps each conventional product to its Islamic alternative, explains how Islamic banks actually pay depositors (the weighted pool), and introduces capital-market topics — funds, stock screening, Sukuk, derivatives — that Chapters 14–15 develop.",
  overview: "After defining banking and the role of financial institutions, the chapter surveys conventional commercial and investment banking, NBFIs and markets. It then explains the need for Islamic banks, their structure, deposit products (including the Mudarabah pool) and asset-side instruments (Box 8.2), the debate on mode preference, Islamic investment banking, and Islamic financial markets — funds, stocks, Sukuk, trading rules, inter-bank and forward markets, FX and derivatives.",
  summarySection: "8.9",
  topics: [
    {
      id: "t8.1", section: "8.1", title: "Introduction", pages: [179, 179], tier: "revision",
      concepts: ["islamic-banking"],
      intuition: "To appreciate Islamic alternatives, first understand the conventional institutions they replace.",
      simple: "The chapter gives an overview of conventional and Islamic financial institutions, markets and instruments, and indicates Islamic alternatives detailed in later chapters.",
      academic: [
        "An overview of institutions, markets and instruments in both set-ups helps understand how they affect individuals, firms, societies, economies and States. Islamic alternatives to conventional counterparts are briefly indicated here and detailed later."
      ],
      exam: "Chapter maps conventional institutions/products to Islamic alternatives.",
      keyPoints: ["Details of alternatives are in later chapters."],
      related: ["t8.2"],
      quickCheck: { q: "What is the purpose of Chapter 8?", options: ["To give detailed Salam rules", "To overview conventional and Islamic institutions, markets and instruments", "To discuss Takaful only", "To critique Islamic banks"], answer: 1, explanation: "p. 179." },
      examples: [
        { title: "Reading the chapter as a map", kind: "practice", text: "For each conventional product in Chapter 8 — savings account, bond, repo, futures — note the Islamic alternative the chapter points to (Mudarabah deposit, Sukuk, Sukuk sale, Salam) before studying it in later chapters (p. 179)." }
      ]
    },
    {
      id: "t8.2", section: "8.2", title: "What is Banking or a Bank?", pages: [179, 180], tier: "supporting",
      concepts: ["banking"],
      intuition: "Where did banks come from, and what is a bank?",
      simple: "“Bank” comes from the Italian “banco” (bench) of money changers; “bankrupt” may come from breaking a failed banker’s bench. Banking existed from 575 BC (temples; the Igibi bank of Babylon). English goldsmiths’ receipts led to fractional-reserve lending. Modern banking is commercial (intermediation, payments) and investment (capital markets); the separation (Glass–Steagall 1933) has eroded (UK 1986, US repeal 1999).",
      academic: [
        "A bank is an institution authorised to take deposits to extend finance. Temple treasuries acted as banks; the Igibi bank of Babylon (575 BC) acted as agent, took deposits and gave agricultural loans. Medieval English goldsmiths issued receipts for gold deposits which circulated; they lent the gold at interest keeping a reserve. A modern bank holds customers’ money, honours drafts, and uses pooled money for advances earning interest or dividends. Commercial banking intermediates and makes payments; investment banking facilitates corporate fundraising. The US Glass–Steagall Act (1933) separated them (Japan by law after WWII; UK by institutional history); banks moved to the German model; the London Stock Exchange amendment of 1986 and the 1999 US repeal eroded the distinction. Islamic banking is a new development within the industry."
      ],
      exam: "Bank = authorised deposit-taker extending finance. Origins: temples, Igibi (575 BC), goldsmiths (fractional reserve). Commercial vs investment banking; Glass–Steagall 1933, repealed 1999.",
      keyPoints: [
        "Goldsmith receipts → fractional reserve lending.",
        "“Bank” is from Italian banco (bench); a failed banker’s bench was broken — the likely origin of “bankrupt”.",
        "The Igibi bank of Babylon (575 BC) took deposits and lent for agriculture.",
        "Glass–Steagall (1933) separated commercial and investment banking in the US; it was repealed in 1999."
      ],
      related: ["t8.3"],
      quickCheck: { q: "Which act separated commercial and investment banking in the USA until its repeal in 1999?", options: ["Sarbanes–Oxley", "Glass–Steagall", "Dodd–Frank", "Basel I"], answer: 1, explanation: "p. 180." },
      examples: [
        { title: "Goldsmiths’ receipts", kind: "textbook", text: "Medieval English goldsmiths issued receipts for gold coins; depositors used the receipts to settle debts, so goldsmiths lent out the gold on interest keeping a reserve — the origin of fractional-reserve banking (p. 179)." }
      ]
    },
    {
      id: "t8.3", section: "8.3", title: "The Strategic Position of Banks and Financial Institutions", pages: [180, 181], tier: "supporting",
      concepts: ["intermediation"],
      intuition: "Why is finance called the ‘blood arteries’ of an economy?",
      simple: "Financial institutions link surplus and deficit units. Conventional ones charge a risk-free rate to users and pay part to savers, keeping a spread. They include commercial and investment banks, NBFIs, DFIs, insurers and fund managers, regulated by central banks and securities commissions; the BIS coordinates globally.",
      academic: [
        "Finance functions like blood arteries. Institutions link deficit and surplus units; conventionally charging a fixed or floating risk-free rate and passing part to savers as spread. Supply of funds comes from households and corporates; demand from trade, industry, agriculture and government. Institutions include commercial, investment and savings banks, specialised institutions (microcredit, SME, housing, leasing, venture capital), discount houses, insurers, fund and asset managers — broadly banks and NBFIs, plus DFIs. Commercial banks provide checking; NBFIs facilitate direct fundraising. Investment banks earn from fees and trading (underwriting, M&A, syndication, advice). Regulators aim at efficient mobilisation, optimal allocation and stability; the BIS coordinates and standardises globally."
      ],
      exam: "Intermediation between surplus and deficit units; conventional spread on risk-free rate. Banks vs NBFIs vs DFIs; regulators; BIS.",
      keyPoints: [
        "Investment banks earn fee/trading income rather than spread.",
        "The Bank for International Settlements (BIS) coordinates and standardises bank services globally."
      ],
      related: ["t8.4.1", "t8.5"],
      quickCheck: { q: "Which institution is described as coordinating and standardising financial institutions globally?", options: ["IMF", "Bank for International Settlements (BIS)", "World Bank", "IDB"], answer: 1, explanation: "p. 181." },
      distinctions: [
        { a: "Commercial banks", b: "NBFIs / investment banks", text: "Commercial banks intermediate between savers and users and offer cheque facilities; NBFIs usually offer no cheques and help raise funds directly; investment banks earn mainly fees and trading profits, not a lending spread (pp. 180–181)." }
      ],
      examples: [
        { title: "The spread", kind: "practice", text: "A conventional bank pays savers 6 % and charges borrowers 10 %, keeping a 4 % spread whatever the borrowers earn. An Islamic bank’s income comes instead from the trade, lease or partnership results of the funds it deploys (pp. 180–181)." }
      ]
    },
    {
      id: "t8.4.1", section: "8.4.1", title: "Conventional Commercial Banking: Deposits and Assets", pages: [181, 184], tier: "supporting",
      concepts: ["conventional-banking"],
      intuition: "What exactly do conventional banks offer — and which of these need an Islamic alternative?",
      simple: "Commercial banks take deposits (current, savings, fixed-term/COI/COD, annuities, advance-profit products, cash management accounts) — all liabilities, most earning interest. They lend (productive, consumer, clean advances, bill discounting, overdrafts) and finance working capital, trade (L/Cs), guarantees, agriculture, fixed investment and treasury operations (repos, Nostro) — all on interest.",
      academic: [
        "Functions: receiving deposits; short/medium loans via overdrafts, bill discounting, advances against securities; mortgage finance; capital-market investment; sometimes merchant banking — all on interest; plus FX, L/Cs, L/Gs, payments, safe custody and advisory services for fees. Most banks focus on checking deposits and short-term running finance; investment banks arrange longer-term finance.",
        "Deposits (all liabilities): current accounts (usually non-remunerative, some regulators allow interest); savings accounts (interest, minimum balance, daily product); fixed-term accounts/TDRs/COIs/CODs (longer term → higher rate; premature encashment penalties; TDRs at par or discount); annuities/perpetuities; advance profit-paying products (profit discounted upfront); cash/fund management accounts (fixed return or linked to markets; rarely fee-based with all profit to depositor).",
        "Assets: short (≤1 year), medium (1–3) and long (>5) loans on interest, considering the borrower’s character, cash flow, purpose and collateral. Forms: productive, consumption/durables, clean advances, discounting, cash credit/overdraft. Uses: working capital (cash credit, overdraft, demand loans, L/Cs, discounting); trade (sight L/Cs fee-based, usance L/Cs involve interest); L/Gs (commission, interest if invoked); agricultural finance; fixed investment (term loans, debentures, underwriting, bridge finance); treasury (money and capital markets, FX, inter-bank, repo/reverse repo); Nostro accounts."
      ],
      exam: "Conventional deposits: current, savings, term/COI/COD, annuities, advance-profit, CMAs — liabilities with interest. Assets: loans, discounting, overdrafts, working capital, trade (L/C), L/G, agri, fixed investment, treasury (repo), Nostro — all interest-based.",
      keyPoints: [
        "Sight L/Cs are fee-based; usance L/Cs involve interest.",
        "Repo = sell and buy back to manage liquidity for interest.",
        "Repo and reverse repo are back-to-back sale and repurchase deals to manage liquidity and earn interest."
      ],
      related: ["t8.5.2", "t8.5.3", "t7.4"],
      quickCheck: { q: "Which conventional trade product is described as simply fee-based without financing?", options: ["Usance L/C", "Sight L/C", "Overdraft", "Bill discounting"], answer: 1, explanation: "p. 183." },
      table: { caption: "Conventional deposit products (pp. 181–183)", head: ["Product", "Feature"], rows: [["Current account", "Usually no return; for cash-flow management"], ["Savings account", "Interest on daily product; withdrawable on demand"], ["Term deposit / TDR / COI", "Locked for a term; higher rate for longer term; may be issued at a discount"], ["Annuity / perpetuity", "Periodic withdrawals of an agreed amount"], ["Advance-profit products", "Anticipated profit discounted and paid up front"]] },
      examples: [
        { title: "Repo", kind: "textbook", text: "A bank short of cash sells government securities to another bank and agrees to buy them back tomorrow at a slightly higher price. The difference is interest for one day’s funds (pp. 181–184)." }
      ]
    },
    {
      id: "t8.4.2", section: "8.4.2", title: "Investment Banking, Other NBFIs and Conventional Financial Markets", pages: [184, 185], tier: "supporting",
      concepts: ["investment-banking", "capital-markets"],
      intuition: "Beyond commercial banks, how else do funds flow to business?",
      simple: "Investment banks help firms and governments issue debt and equity (IPOs, private placements, venture capital), trade securities and advise, earning fees; they raise funds via funds, COIs and guaranteed-dividend accounts. Other NBFIs include discount houses, leasing, venture capital, asset/fund managers and insurers. Markets: money (short-term interest) and capital (medium/long debt and equity), primary and secondary, plus FX and GDRs. Bonds are loans; stock markets are permissible if stocks avoid Riba and Gharar.",
      academic: [
        "Investment banking (8.4.2): facilitates direct flow of funds; helps firms and governments sell debt/equity in primary markets and acts as broker/dealer in secondary markets; income from fees and trading; underwriting, trading, M&A, syndicated loans, advice; venture capital and private placements for start-ups; most important — IPOs; raises funds via closed/open-ended funds, COIs/CODs and guaranteed-dividend accounts (sometimes minimum guaranteed return with upside).",
        "Other NBFIs (8.4.3): discount houses, leasing, venture capital, asset/fund management and insurance companies and specialised institutions; direct intermediation with interest or guaranteed dividends; some deal in real estate.",
        "Conventional markets (8.4.4): help investors manage liquidity by selling securities to third parties. Money market (short-term interest-based lending/borrowing and debt instruments) and capital market (medium/long debt and equity); FX markets; primary and secondary; GDRs. A conventional bond is a loan repayable with interest regardless of the business; debt markets trade bonds, debentures, CP, T-bills and derivatives. Many companies involve interest or Gharar; an equity market is permissible if traded stocks avoid Riba and Gharar (screening criteria)."
      ],
      exam: "Investment banks: IPOs, underwriting, M&A, syndication, VC; fee income. NBFIs: leasing, VC, asset managers, insurers. Markets: money vs capital; primary vs secondary; bonds = interest loans; stock market permissible with screening.",
      keyPoints: [
        "IPO facilitation is the investment bank’s most important job.",
        "Bond = loan with interest unrelated to business.",
        "Investment banks’ key job is managing IPOs; start-ups rely on venture capital through private placements.",
        "A conventional bond is a loan repayable with interest regardless of how the money is used.",
        "The stock market concept is permissible if traded stocks avoid Riba and Gharar."
      ],
      subsections: [
        { number: "8.4.2", title: "Investment Banking", page: 184, points: ["Primary/secondary markets", "IPOs, VC, private placements", "Fee and trading income"] },
        { number: "8.4.3", title: "Other NBFIs", page: 185, points: ["Leasing, VC, fund managers, insurers"] },
        { number: "8.4.4", title: "Conventional Financial Markets", page: 185, points: ["Money vs capital markets", "GDRs", "Stock market permissible with screening"] }
      ],
      related: ["t8.7", "t8.8.1"],
      quickCheck: { q: "According to the author, the basic concept of a stock market is:", options: ["Prohibited", "Permissible if traded stocks do not involve Riba and Gharar", "Permissible only for governments", "The same as a bond market"], answer: 1, explanation: "p. 185." },
      examples: [
        { title: "A bond is a loan", kind: "textbook", text: "A company issues a 5-year bond at 8 %. Holders are owed 8 % a year and the principal whatever the company does with the money, so the bond is an interest-bearing loan, unlike a share, which is permissible if the company avoids Riba and Gharar (pp. 184–185)." }
      ]
    },
    {
      id: "t8.5", section: "8.5", title: "The Need for Islamic Banks and NBFIs", pages: [185, 186], tier: "core",
      concepts: ["intermediation", "islamic-banking"],
      intuition: "If interest is prohibited, do we even need banks? Yes — intermediation remains essential.",
      simple: "It is a misconception that an Islamic system needs no banks. Businesses need large funds; savers have small amounts. Intermediaries resolve mismatches of maturity, liquidity, risk preference and information. Islamic banks add value by removing interest and going beyond commercial lending.",
      academic: [
        "Banks and financial institutions remain part of Islamic economics and finance. Modern businesses need huge funds while people have small savings; intermediaries pool savings so savers earn a just return and businesses obtain funds. Al-Jarhi and Munawar Iqbal: intermediation enhances saving/investment efficiency by resolving mismatches of maturity and liquidity preferences (pooling small funds), risk preferences (risk-averse savers vs risky projects — intermediaries reduce risk through management), and information (savers cannot efficiently gather information). The banks’ role is marred by interest and a narrow commercial focus; Islamic banks add value on both counts."
      ],
      exam: "Banks needed in Islamic system: resolve maturity/liquidity, risk and information mismatches (Al-Jarhi & Iqbal); Islamic banks remove interest and broaden activity.",
      keyPoints: ["Three mismatches resolved by intermediaries."],
      related: ["t8.5.1", "t7.4"],
      quickCheck: { q: "Which is NOT one of the mismatches intermediaries resolve, per Al-Jarhi and Munawar Iqbal?", options: ["Maturity and liquidity preferences", "Risk preferences", "Information gathering", "Religious beliefs"], answer: 3, explanation: "p. 186." },
      confusions: [
        { wrong: "An Islamic economy can do without banks since interest is prohibited.", right: "Intermediaries remain essential to resolve mismatches in maturity, risk and information between small savers and entrepreneurs; only the basis of intermediation changes (pp. 185–186)." }
      ],
      examples: [
        { title: "Why intermediaries are still needed", kind: "textbook", text: "A thousand savers each hold 10,000 while a factory needs 10 million for five years. A bank pools the small, short-term, risk-averse savings and supplies long-term finance, resolving mismatches of maturity, risk and information (pp. 185–186)." }
      ]
    },
    {
      id: "t8.5.1", section: "8.5.1", title: "The Structure of Islamic Banking", pages: [186, 188], tier: "core",
      concepts: ["islamic-banking", "two-tier-mudarabah"],
      intuition: "How is an Islamic bank organised to replace interest with multiple instruments?",
      simple: "Islamic banks remain intermediaries but replace interest with several instruments: PLS and Wakalah on the deposit side; Musharakah/Mudarabah, trade and leasing on the asset side, bearing ownership risks. Siddiqi’s and Al-Jarhi/Iqbal’s models describe this. Organisational options: universal banking, bona fide subsidiaries, or bank holding company; the author favours fully owned subsidiaries by activity. Priority of modes: Musharakah, Mudarabah, Ijarah, then deferred sales.",
      academic: [
        "IFIs intermediate but replace interest; risks remain with ownership, so IFIs share profit/loss on investments and earn on trade and leasing through risk, liability and value addition. Deposits on PLS and partly Wakalah (agency fee). Assets: loss liability in Musharakah/Mudarabah; risk in trading while goods are owned; ownership risks and expenses in leasing. Subject matter: goods and real business.",
        "Siddiqi’s outline: banks with share capital accept demand deposits (no return; part earmarked for interest-free short-term loans, safety ensured by the central bank) and investment accounts (specific projects or bank discretion) invested in partnership, profit-sharing advances, stocks and leasing; depositors share profits pro rata; investment, not lending, dominates; money supply tied to wealth creation. Al-Jarhi and Iqbal: an Islamic bank does all banking except interest-based borrowing/lending; mobilises via Mudarabah or Wakalah; demand deposits are guaranteed interest-free loans; assets on PLS or debt-creating bases; investment manager for time deposits; equity holding and commodity/asset trading are integral; earnings shared by size and maturity with the formula disclosed. Two categories of modes: PLS (Mudarabah, Diminishing Musharakah, equity) and fixed-return purchase/hire (Murabaha, Istisna‘a, Salam, leasing).",
        "Models: Universal Banking, Bonafide Subsidiary, Bank Holding Company. The first two may not suit Islamic banks; fully owned subsidiaries for investment banking, commodity trade, leasing, Istisna‘a and commercial banking are best, or special branches for sectors. Risk profile determines return; risk-averse funds go to low-risk financing. Priority of modes: Musharakah/equity, Mudarabah, Ijarah, then deferred-payment (Bai‘ Mu’ajjal) or deferred-delivery (Salam, Istisna‘a) sales. Since deposits come mostly from the middle class, banks use Murabaha and debt modes for risk-averse funds and Shirkah for risk-takers."
      ],
      exam: "IFIs: intermediaries with ownership-based risk; deposits on PLS/Wakalah; assets on PLS, trade, lease. Models: universal, bona fide subsidiary, holding company (author prefers fully owned subsidiaries). Priority: Musharakah → Mudarabah → Ijarah → deferred sales.",
      keyPoints: [
        "Two categories of modes: PLS and fixed-return purchase/hire.",
        "Depositors informed beforehand of the profit-sharing formula.",
        "Risk-averse funds → low-risk (debt) modes.",
        "Funds of risk-averse depositors go to low-risk financing, risk-takers’ funds to PLS."
      ],
      related: ["t8.5.2", "t8.5.3", "t8.6"],
      quickCheck: { q: "Which organisational model does the author consider best suited to Islamic banks with diverse activities?", options: ["Universal banking", "Fully owned subsidiaries for different activities", "No subsidiaries", "Conventional holding with Islamic window only"], answer: 1, explanation: "p. 188." },
      examples: [
        { title: "Siddiqi’s outline of an Islamic bank", kind: "textbook", text: "Share capital plus demand and investment deposits; fee-based services; demand deposits earn nothing but part is earmarked for interest-free short loans; investment deposits share profit; the dominant activity is investment, not lending (pp. 186–187)." }
      ]
    },
    {
      id: "t8.5.2", section: "8.5.2", title: "The Deposits Side of Islamic Banking (Mudarabah Pool, Box 8.1)", pages: [188, 191], tier: "core",
      concepts: ["mudarabah", "current-account", "weightage"],
      intuition: "How does an Islamic bank decide how much profit each depositor gets? Through a weighted Mudarabah pool.",
      simple: "Current deposits: Amanah/Qard, principal guaranteed, no return. Savings and term deposits: PLS (Mudarabah) — profit ratio agreed, loss strictly by capital. Longer deposits get higher weightages. In Box 8.1, depositors form a pool (Musharakah among themselves) that contracts Mudarabah with the bank; the bank’s share is taken first, then the pool’s share is distributed by weighted amounts. Losses are shared by capital, not weightage.",
      academic: [
        "Banks innovate deposit techniques by risk preference, and offer commodity, leasing and Murabaha funds and COIs with quasi-fixed returns — requiring strict Shari’ah controls. Most authors allow a third-party guarantee for a nominal amount; a deposit Takaful scheme is preferable. Current deposits: no return; kept as Amanah but treated as loans if used; principal guaranteed; creditor–debtor relationship; no weightage. Some writers favour occasional discretionary gifts, not regular.",
        "Savings/investment/term deposits: PLS — profit ratio agreed at opening; losses strictly in capital ratio. Bank capital plus PLS funds form the earning asset base; returns allocated in the agreed ratio; longer deposits get higher weightages (regulator range or bank discretion). Risk-averse clients: current accounts or special Murabaha/leasing pools as Rabbul-mal with quasi-fixed returns. Risk-prone deposits: weightage on daily product basis (DPB). Specific investment accounts via Mudarabah or Wakalah; mutual funds; inter-bank financing with weightage and DPB.",
        "Box 8.1: the bank creates pool A with tenors 3 months ($3000, weight 0.60), 6 months ($4000, 0.70), 1 year ($3000, 1.00). Pool members are Musharakah partners; the pool as Rabbul-mal contracts Mudarabah with the bank (Mudarib), sharing 50:50. $10,000 deployed for a month earns $1000: bank $500, pool $500. Weighted amounts: 1800, 2800, 3000 (total 7600). Pool profit: 1800/7600×500 = 119 (3.96% for the month on 3000), 2800/7600×500 = 184 (4.60%), 3000/7600×500 = 197 (6.56%). A $500 loss is shared by capital: 150, 200, 150."
      ],
      exam: "Current = Qard/Amanah, guaranteed, no return. PLS deposits: agreed profit ratio, loss by capital; weightage by tenor; DPB. Box 8.1: pool (Musharakah) → Mudarabah with bank (50:50) → pool profit allocated by weighted amounts (119/184/197); loss by capital (150/200/150).",
      keyPoints: [
        "Weightages can only change at the start of an accounting period.",
        "Loss is by investment ratio, not by weightage.",
        "Deposit Takaful preferable to third-party guarantee."
      ],
      table: { caption: "Box 8.1 — Profit distribution in pool A ($500 pool share)", head: ["Deposit ($)", "Weightage", "Weighted amount", "Profit ($)", "Rate (for the month)"], rows: [["3000", "0.60", "1800", "119", "3.96%"], ["4000", "0.70", "2800", "184", "4.60%"], ["3000", "1.00", "3000", "197", "6.56%"], ["10 000", "—", "7600", "500", "—"]] },
      calc: { type: "pool-weightage", note: "Reproduces Box 8.1: enter deposits, weightages, profit and sharing ratio; shows bank share, weighted amounts, each tier’s profit and loss allocation by capital." },
      examples: [
        { title: "Box 8.1 loss case", kind: "textbook", text: "If pool A suffers a $500 loss, it is shared by investment ratio: 3-month $150, 6-month $200, 1-year $150 — weightages do not apply to losses." },
        { title: "Box 8.1 loss allocation", kind: "textbook", text: "If pool A (3,000 / 4,000 / 3,000) loses 500, depositors bear 150, 200 and 150 — by capital, not by the profit weightages (p. 191)." }
      ],
      confusions: [
        { wrong: "Losses in the pool are shared by the same weightages as profits.", right: "Profits are allocated by weighted amounts; losses strictly by the ratio of capital invested." }
      ],
      related: ["t12.7.1", "t14.3.1", "t7.11"],
      quickCheck: { q: "In Box 8.1, the pool earns $500 and weighted amounts are 1800, 2800 and 3000. What does the 1-year tier ($3000) receive?", options: ["$150", "$197", "$184", "$119"], answer: 1, explanation: "3000/7600 × 500 ≈ $197 (p. 191)." }
    },
    {
      id: "t8.5.3", section: "8.5.3", title: "Instruments on the Assets Side (Box 8.2)", pages: [191, 195], tier: "core",
      concepts: ["mode-selection"],
      intuition: "Which Islamic mode fits which financing need? Box 8.2 is the map.",
      simple: "All legitimate modes may be used, with diversified portfolios matched to depositors’ risk appetite. Musharakah/Mudarabah for projects, imports, exports, working capital; Diminishing Musharakah for houses and fixed assets; Murabaha for goods, inventory and trade; Musawamah for big single transactions; Salam for agriculture; Ijarah for vehicles and machinery; combinations (Istisna‘a + Murabaha, Salam + Murabaha) for trade and industry. Treasury: Mudarabah inter-bank, Sukuk; FX via promise; public sector via Ijarah/Istisna‘a and Sukuk.",
      academic: [
        "Modes: Musharakah/Mudarabah (projects, imports, preshipment exports, working capital, single transactions); Diminishing Musharakah (houses, transport, machinery); Murabaha (automobiles, durables, trade, inventory, spares, raw materials) — no buy-back or rollover; Musawamah (huge single transactions); Salam (agriculture, agro-industry, rural economy, commodities); Ijarah (automobiles, machinery); combinations; housing via DM or Murabaha; working capital via Salam, Istisna‘a, Murabaha; big projects via syndicate Mudarabah using Istisna‘a or Murabaha.",
        "Sector recommendations: trade — Murabaha, instalment sale, leasing, Salam; industry — Istisna‘a; raw materials and inventory — Murabaha; fixed assets — instalment sale or leasing; recurrent expenses — advance sale of products via Salam/Istisna‘a. Consumer: durables via Murabaha, leasing or return-free loans from current accounts/own funds (not PLS depositors’ money without approval); cards via Wakalah and Murabaha; autos via IMBT and Murabaha; housing via Murabaha, DM and rent-sharing.",
        "Treasury: Shari’ah-compliant stocks and Sukuk; inter-bank Mudarabah/Musharakah (six-step process: Mudarabah relationship; pools; weightages; allocation; Mudarib fee as % of realised profit; investor bears loss unless misconduct); central bank as lender of last resort via Mudarabah (short grace, ratio favouring the central bank) or Sukuk sale; Ijarah Sukuk (amortising or bullet). FX: spot only; forward via promise; earnest money; export document negotiation partially allowed. Government: Mudarabah/Musharakah certificates, Ijarah and Istisna‘a for infrastructure, Ijarah Sukuk, syndicated Murabaha funds. Alternatives to foreign loans: portfolio investment, Sukuk, FDI, sector funds."
      ],
      exam: "Box 8.2 map: deposits (Amanah/Qard, Mudarabah, Wakalatul Istismar, Tawarruq for liquidity); trade/corporate (Musharakah, Mudarabah, Murabaha, Salam, Istisna‘a, Ijarah); agriculture (Murabaha, Salam, IMBT, DM, Musaqat); treasury (Mudarabah inter-bank, Sukuk, promise-based FX); personal (Murabaha, IMBT, DM, Tawarruq).",
      keyPoints: [
        "Risk-averse deposits → less risky modes.",
        "PLS depositors’ money cannot be used for charity without approval.",
        "Post-shipment export: Qard al Hasan in local currency + promise to sell FX.",
        "Central bank as lender of last resort: short grace period, then Mudarabah with a ratio heavily favouring the central bank."
      ],
      table: { caption: "Box 8.2 — Islamic banking products and services (condensed)", head: ["Need", "Modes and basis"], rows: [["Current deposits", "Amanah — Qard to bank; no return"], ["Savings / general investment deposits", "Mudarabah"], ["Special investment / individual portfolios", "Mudarabah, mutual funds, Wakalatul Istismar"], ["Liquidity generation", "Tawarruq — reverse Murabaha, sale to third party"], ["Project finance", "Musharakah, Mudarabah TFCs, syndication, Murabaha, Istisna‘a, Ijarah/Ujrah"], ["Working capital", "Murabaha, Salam, Musharakah in single transactions"], ["Preshipment export", "Salam/Istisna‘a + Murabaha and Wakalah; Murabaha; Musharakah"], ["Import finance", "Murabaha, Musharakah"], ["Post-shipment export", "Qard al Hasan in local currency + promise to sell FX; Murabaha for next consignment"], ["L/C; L/G", "Commission/Ujrah with Murabaha; Kafalah with service charge"], ["Farm inputs; machinery; livestock", "Murabaha, Salam; IMBT, Salam, Murabaha; Murabaha, Salam"], ["Farm construction; land development; orchards", "DM or rent-sharing; operating Ijarah, Salam; Salam, Musaqat"], ["Inter-bank; liquidity; fund management", "Mudarabah; permissible securities, Parallel Salam, Tawarruq; Mudarabah, Wakalatul Istismar, stocks/Sukuk"], ["Forex", "Unilateral promise to buy/sell simultaneously at pre-agreed rate"], ["Consumer durables; autos; housing; cash needs", "Murabaha; IMBT, Murabaha; DM, Murabaha; Salam if possible, Tawarruq"]] },
      related: ["t14.3.2", "t14.4.1", "t17.4.3"],
      quickCheck: { q: "According to Box 8.2, which mode is listed for liquidity generation on the deposit/funding side?", options: ["Bai‘ al ‘Inah", "Tawarruq — reverse Murabaha, sale to a third party", "Interest-bearing borrowing", "Salam in currency"], answer: 1, explanation: "p. 194." },
      examples: [
        { title: "Post-shipment export finance", kind: "textbook", text: "Instead of discounting export bills, the bank gives Qard al Hasan in local currency at the spot rate and takes a promise to sell the foreign currency later; the rate differential is its income, with Murabaha for the next consignment (Box 8.2, p. 194)." }
      ],
      confusions: [
        { wrong: "Depositors’ PLS money may be used for charitable loans at the bank’s discretion.", right: "PLS deposits are a trust; return-free loans may come from current accounts or the bank’s own funds, not PLS money without depositors’ approval (p. 192)." }
      ]
    },
    {
      id: "t8.6", section: "8.6", title: "The Issue of Mode Preference", pages: [195, 198], tier: "core",
      concepts: ["mode-preference", "pls"],
      intuition: "Should Islamic banks mainly use profit-and-loss sharing, or are trade and leasing equally valid? Economists and bankers differ.",
      simple: "Most scholars see PLS (Musharakah, Mudarabah) as the main replacement for interest; Chapra: ‘no risk, no gain’. Abdul Halim Ismail argues exchange contracts are equally legitimate and bankers use them. The author: economists do not prohibit debt modes — it is preference for better socio-economic impact. Research (Mohsin Khan) suggests an equity-based system handles shocks better; others discuss monitoring costs, savings and monetary policy. All modes have potential; Salam could build a non-speculative commodity market.",
      academic: [
        "The idea of replacing interest with profit-sharing emerged in the 1940s–60s and gained acceptance in the 1980s–90s. Hasanuz Zaman opposes Mudarabah for non-trade operations on the asset side (recommending Musharakah); Siddiqi discusses its extended scope and regards PLS as the norm practice should gravitate towards. Chapra: the most important financing will be Mudarabah, Shirkah or shares; “no risk, no gain.”",
        "Abdul Halim Ismail distinguishes ‘Islamic economists’ (favouring PLS) from ‘Islamic bankers’ (treating trade and leasing equally); he argues exchange contracts are as legitimate and blames economists for not deriving PLS preference from the Qur’an. The author: economists have not prohibited debt modes; the stress on PLS is for its socio-economic impact and to avoid back doors to interest.",
        "Macroeconomic questions: theoretical framework, stability, savings/investment, monetary policy. Mohsin Khan: an equity-based system absorbs shocks via changes in the nominal value of deposits (shares), keeping real assets and liabilities equal — the key difference is that deposits are not guaranteed in nominal value. Waqar Masood: monitoring costs insignificant in a fully Islamic society. Haque and Mirakhor: PLS may raise monitoring costs unless a legal/institutional framework supports contracting; savings need not fall. Shahrukh Rafi Khan: sharing ratios can price loanable funds; lenders worse off without risk-free assets; ratios inefficient as monetary tools; not all profitable projects financed — Khan and Mirakhor contest these as model-dependent.",
        "All modes have potential: PLS for projects and trade; Mudarabah Sukuk via SPVs; Homoud: a 10% profit margin with turnover of 3 yields 30% a year. Non-PLS modes complement: Murabaha (low risk, employment), leasing (fixed assets), Salam (agriculture; a Salam-based forward commodity market would be non-speculative and serve rural finance)."
      ],
      exam: "Majority: PLS main replacement (Siddiqi, Chapra). Abdul Halim Ismail: exchange contracts equally legitimate (bankers’ view). Author: preference, not prohibition. Mohsin Khan: equity system absorbs shocks (deposits not nominally guaranteed). Monitoring costs, savings and policy debates. All modes have potential.",
      keyPoints: [
        "Key difference (Mohsin Khan): deposits as shares, not guaranteed nominally.",
        "Homoud: 10% margin × turnover 3 = 30% p.a.",
        "Salam-based forward market for agriculture."
      ],
      debate: [
        { issue: "Should PLS be the primary mode of Islamic banking?", criticism: "Abdul Halim Ismail: PLS preference is formulated incorrectly; exchange contracts (trade, leasing) are equally legitimate under the Qur’an and dominate practice.", response: "Islamic economists have not prohibited debt modes; exchange modes also involve risk-sharing and are allowed. PLS is preferred for its socio-economic impact and to avoid back doors to interest.", alternative: "Siddiqi, Chapra and many economists: PLS is the norm towards which practice should gravitate; Hasanuz Zaman prefers Musharakah over Mudarabah on the asset side.", takeaway: "Mode selection is a matter of preference and balance, not permissibility." },
        { issue: "Does a PLS system hurt savings and investment?", criticism: "Shahrukh Rafi Khan argues PLS ratios are inefficient monetary tools, eliminating risk-free assets leaves lenders worse off, and not all profitable projects will be financed; Haque and Mirakhor warn monitoring costs could cut credit supply.", response: "Khan and Mirakhor say these results depend on the model’s assumptions and the welfare function itself changes with Islamisation; with a supportive legal framework investment can rise, and savings need not fall since returns rise with risk. Waqar Masood argues monitoring costs would be small in a full Islamic system.", alternative: "Mohsin Khan: an equity-based system absorbs shocks better because deposit values adjust with assets.", takeaway: "The theoretical case favours PLS if legal and institutional support exists." }
      ],
      related: ["t4.3", "t17.3.7", "t14.3.2"],
      quickCheck: { q: "According to Mohsin Khan, what is the principal economic difference between Islamic and conventional banking systems?", options: ["Islamic banks have more branches", "Islamic systems treat deposits as shares whose nominal value is not guaranteed", "Islamic banks lend more", "Conventional banks do not take deposits"], answer: 1, explanation: "p. 197." },
      examples: [
        { title: "Homoud’s turnover example", kind: "textbook", text: "A Mudarabah business earning 10% per turnover with three turnovers a year could yield 30% annually, shared between certificate holders and management (p. 198)." }
      ]
    },
    {
      id: "t8.7", section: "8.7", title: "Islamic Investment Banking", pages: [199, 199], tier: "supporting",
      concepts: ["investment-banking"],
      intuition: "What does an Islamic investment bank do differently?",
      simple: "The same products and services as a conventional investment bank, but Shari’ah-compliant: portfolio and fund management, venture capital (excluding prohibited sectors), corporate finance (IPOs, rights, private placements, restructuring, M&A, JVs), treasury and syndicated financing via Murabaha, Mudarabah, Musharakah or Ijarah.",
      academic: [
        "Islamic investment banks tailor products in a compliant manner, manage portfolios for institutions, corporates and HNWIs and pooled vehicles (unit trusts, mutual funds). Opportunities: open/closed-end funds, equity benchmarks, leasing companies. Venture capital for all projects except forbidden products (alcohol, pork, entertainment, interest-based finance). Asset management includes equity, real estate and Sukuk funds; treasury manages asset–liability mismatch. Corporate finance: IPOs, offers for sale, rights issues; private placements; strategic reviews; restructurings; acquisitions, divestments, mergers; joint ventures. Syndicate financing for large facilities lead-managed by a strong bank through Murabaha, Mudarabah, Musharakah, Ijarah."
      ],
      exam: "Same services as conventional investment banks, but compliant: fund management, VC (no prohibited sectors), corporate finance, syndication via Islamic modes.",
      keyPoints: [
        "Excluded sectors: alcohol, pork, entertainment, interest-based finance.",
        "Islamic investment banks offer the same services as conventional ones — IPOs, private placements, M&A, syndication, venture capital — in Shari’ah-compliant form.",
        "Syndicated facilities can be structured through Murabaha, Mudarabah, Musharakah or Ijarah."
      ],
      related: ["t8.8.1", "t14.6"],
      quickCheck: { q: "Through which modes can an Islamic syndication facility be provided?", options: ["Interest-bearing loans", "Murabaha, Mudarabah, Musharakah, Ijarah", "Bai‘ al ‘Inah", "Options"], answer: 1, explanation: "p. 199." },
      examples: [
        { title: "Islamic syndication", kind: "practice", text: "Five Islamic banks jointly finance a 500 million cement plant: the lead bank arranges an Ijarah of the plant’s machinery for the consortium, each bank owning and earning in proportion to its share (p. 199)." }
      ]
    },
    {
      id: "t8.8", section: "8.8", title: "Islamic Financial Markets and Instruments", pages: [199, 201], tier: "core",
      concepts: ["capital-markets", "asset-backing"],
      intuition: "What would a financial market look like without interest-bearing bonds?",
      simple: "Islamic markets have money and capital segments but interest-free instruments, mostly equity-related or representing ownership of assets. A pure bond market is not part of it; debt securities arise only from trade or Ijarah and must be backed by real assets. Instruments are stable/quasi-fixed income (pools of Ijarah, Murabaha, Istisna‘a) for risk-averse investors or variable income (Shirkah pools) for risk-takers.",
      academic: [
        "The OIC Fiqh Council observed that the concept of financial markets is sound but their structure needs review by jurists and economists. Major instruments are equity-related: shares and redeemable participating instruments representing ownership (Mudarabah/Musharakah certificates, PTCs) and rent-sharing instruments (Diminishing Musharakah). A pure debt market is not active since debts are paid at nominal value subject to Hawalah. Instruments must be backed by real asset transactions; debt securities result from trading or Ijarah modes with time value priced in the commodity/usufruct. Two types: (1) fixed/quasi-fixed (stable) income securities — securitising pools of Ijarah with some Murabaha and Istisna‘a, or CODs against such pools, suiting widows and retirees; (2) variable income (Shirkah-based) securities — pools of Musharakah/Mudarabah for risk-takers."
      ],
      exam: "Islamic markets: equity-related and asset-ownership instruments; no pure bond market; debt only from trade/Ijarah and asset-backed. Stable-income (Ijarah/Murabaha/Istisna‘a pools) vs variable-income (Shirkah pools) securities.",
      keyPoints: ["Mere replacement of one paper transaction with another is not enough."],
      related: ["t8.8.3", "t15.2"],
      quickCheck: { q: "Which investor type does the author say stable-income (Ijarah-pool) securities would suit?", options: ["Speculators", "Risk-averse investors like widows and retired people", "Only banks", "Only governments"], answer: 1, explanation: "p. 200." },
      distinctions: [
        { a: "Stable-income securities", b: "Variable-income securities", text: "Securitised pools of Ijarah (with some Murabaha/Istisna) give quasi-fixed returns for risk-averse investors; pools of Musharakah/Mudarabah give variable returns and higher potential for risk-takers (pp. 200–201)." }
      ],
      confusions: [
        { wrong: "An Islamic financial market includes an active bond market.", right: "A pure debt market is not part of it, since debts pass only at nominal value under Hawalah; instruments must represent real assets (p. 200)." }
      ],
      examples: [
        { title: "Stable vs variable income papers", kind: "textbook", text: "A retiree buys certificates backed by a pool of Ijarah assets with some Murabaha (quasi-fixed income). A younger investor buys Musharakah certificates whose return varies with the business (pp. 199–201)." }
      ]
    },
    {
      id: "t8.8.1", section: "8.8.1", title: "Islamic Funds, Screening and Purification", pages: [201, 203], tier: "core",
      concepts: ["islamic-funds", "screening", "purification"],
      intuition: "How does an Islamic equity fund decide which shares to hold — and what does it do with tainted income?",
      simple: "Funds are managed on Mudarabah (share of profit) or agency (fee) basis. Usmani’s categories: equity, Ijarah, commodity, Murabaha (closed-end, not tradable) and mixed funds (tradable if tangible assets > 51%). Equity funds: regular income, capital gain, aggressive, balanced. Screening: Halal business, debt < 33%, negligible interest income (e.g. ≤5% at Al Meezan), share value ≥ net liquid assets; Dow Jones: debt, cash + interest securities and receivables each < 33% of market cap. Purify non-compliant income to charity.",
      academic: [
        "Fund management suits IFIs given the asset-based nature of Islamic finance. About 150 funds operated at the time of writing (mostly equity; some hybrid leasing, real estate, Takaful). Management on Mudarabah (percentage of realised profit) or agency (fee: fixed amount or % of NAV). Usmani’s categories: (1) equity funds; (2) Ijarah funds — rentals distributed; Ijarah Sukuk tradable, buyer steps into seller’s pro rata ownership; (3) commodity funds; (4) Murabaha funds — closed-end, units not negotiable as the portfolio owns no tangible assets; (5) mixed funds — tradable if tangible assets exceed 51% and liquid assets and debts are less than 50%.",
        "Islamic equity funds carry actual pro rata profit; neither principal nor rate can be guaranteed. Categories: regular income (dividends; risk-averse), capital gain (trading; moderate risk), aggressive (high-risk investors only), balanced (quality securities; dividends and gains).",
        "Screening (tolerance levels vary by board): predominantly equity capital (debt < 33%); exclude prohibited activities; negligible interest income (Al Meezan: non-permissible income ≤ 5% of total); share value not less than net liquid assets. Dow Jones Islamic Market Index: Halal core business; total debt / 12-month average market cap < 33%; (cash + interest-bearing securities) / market cap < 33%; accounts receivable / market cap < 33%.",
        "Purification: deduct earnings from unacceptable sources and give them away — the obligation is on the owner of shares/Sukuk (investor), not the intermediary; in fund management the management company excludes it. Al Meezan computes a charity rate = non-compliant income / gross revenue for each investee company, multiplied by dividend income from it, transferred to a separate account. Growth: 29 funds with $800m (1996) to 98 funds with about $5bn (early 2000), over 100 at the time of writing."
      ],
      exam: "Fund types (Usmani): equity, Ijarah, commodity, Murabaha (closed-end), mixed (>51% tangible to trade). Screening: Halal business; debt <33%; interest income negligible (≤5%); DJIM ratios <33% of market cap (debt; cash+interest securities; receivables). Purification by charity rate × dividends.",
      keyPoints: [
        "Murabaha fund units not tradable.",
        "Purification is the investor’s obligation; fund manager excludes it for funds.",
        "Charity rate = non-compliant income / gross revenue.",
        "Purification is obligatory on the owner of the shares (investor); a fund manager must exclude prohibited income for the fund."
      ],
      table: { caption: "Types of Islamic equity fund by strategy (p. 202)", head: ["Fund", "Objective / investor"], rows: [["Regular income", "Dividends; risk-averse investors"], ["Capital gain", "Trading gains; moderate risk"], ["Aggressive", "High-risk securities; high-risk investors only"], ["Balanced", "Quality securities; dividends plus gains"]] },
      calc: { type: "purification", note: "Practice calculator for Al Meezan’s method: charity rate = non-compliant income ÷ gross revenue; charity amount = rate × dividend received." },
      related: ["t8.8.2", "t15.3.8"],
      quickCheck: { q: "Under Usmani’s classification, why must a Murabaha fund be closed-end?", options: ["It is too profitable", "Its units cannot be negotiable since the Murabaha portfolio owns no tangible assets (only receivables)", "Murabaha is prohibited", "Regulators require it"], answer: 1, explanation: "p. 201." },
      examples: [
        { title: "Growth of Islamic equity funds", kind: "textbook", text: "29 Islamic equity funds with $800 million in 1996 grew to 98 funds with about $5 billion by early 2000 (p. 203)." }
      ]
    },
    {
      id: "t8.8.2", section: "8.8.2", title: "Principles Relating to Stocks (OIC Fiqh Council, 1992)", pages: [203, 204], tier: "core",
      concepts: ["stocks"],
      intuition: "Can you buy shares in a company that sometimes deals in interest?",
      simple: "OIC Fiqh Council (1992): companies with lawful purposes are permissible; trading in companies whose main purpose is prohibited is not; companies occasionally dealing in prohibited things but with lawful main activity may be traded. Underwriting at nominal value is allowed without a fee for the commitment itself. A share represents an undivided portion (Musha‘a) of assets. Preference shares with guaranteed capital/profit are not allowed. No buying shares with interest-bearing margin loans or selling pledged shares one does not own.",
      academic: [
        "Seventh session (9–14 May 1992): (1) establishing a company with unprohibited purposes is permissible; trading shares of companies whose main purpose is prohibited (Riba, prohibited products) is prohibited; trading shares of companies at times dealing in prohibited things but whose main activities are lawful is permissible. (2) Underwriting — undertaking to subscribe unsubscribed shares — is unobjectionable if at nominal value without compensation for the commitment per se; compensation may be received for other work (feasibility studies, marketing). (3) The object of sale of shares is the unidentified portion (Musha‘a) of company assets; the certificate attests entitlement. (4) Preference shares with guaranteed capital or profit or precedence in liquidation/dividends are not permissible; administrative/procedural preferences are. (5) Buying shares with an interest-bearing broker loan against pledge of the shares is Riba; selling shares received as pledge from a broker is selling what one does not own — more categorically prohibited if the broker benefits by depositing the price at interest."
      ],
      exam: "OIC 1992: lawful companies OK; main-purpose prohibited → no; mixed with lawful main activity → allowed. Underwriting at nominal value, no fee for commitment. Share = Musha‘a. No preference shares with guaranteed return/precedence. No margin loans on interest; no short-selling of pledged shares.",
      keyPoints: ["Underwriting fee only for other services (feasibility, marketing).", "Share certificate = undivided portion of assets."],
      definitions: [
        { term: "Musha‘a", meaning: "An undivided/unidentified share in jointly owned assets — the object of sale of company shares." }
      ],
      related: ["t14.6", "t12.6"],
      quickCheck: { q: "Under the OIC Fiqh Council (1992), preference shares are impermissible if they:", options: ["Carry procedural voting privileges", "Guarantee capital or a certain profit or precedence in liquidation/dividends", "Are listed on an exchange", "Are held by banks"], answer: 1, explanation: "p. 203." },
      examples: [
        { title: "Margin trading", kind: "textbook", text: "Buying shares with an interest-bearing broker loan against the pledge of those shares is Riba; selling shares received from a broker as a pledge is selling what one does not own (p. 204)." }
      ]
    },
    {
      id: "t8.8.3", section: "8.8.3", title: "Investment Sukuk as Islamic Market Instruments", pages: [204, 205], tier: "core",
      concepts: ["sukuk"],
      intuition: "What is a Sukuk, in one line?",
      simple: "Sukuk (plural of Sak) were medieval papers for financial obligations; today they are certificates of equal value representing undivided shares in ownership of tangible assets, usufruct and services of a project or investment activity. Types include Shirkah, Ijarah, Salam and Istisna‘a. Returns are variable or quasi-fixed; pure debt securities have no secondary market, but equity/asset instruments do.",
      academic: [
        "Sukuk were used in medieval Muslim societies as papers representing obligations from trade. Present Sukuk resemble securitisation — ownership of underlying assets transferred to many investors. Investment Sukuk (AAOIFI) are certificates of equal value representing undivided shares in ownership of tangible assets of particular projects or investment activity, usufruct and services. Types by underlying contract: Shirkah, Ijarah, Salam, Istisna‘a. Structured on the Mudarabah principle on one side, with participatory or fixed-return modes on the other → variable or quasi-fixed returns; can be fixed via third-party guarantee (OIC). Primary markets: shares, redeemable equity, MCs, Ijarah Sukuk, trade debt instruments; primary price via weighted average of bids for premium over benchmark. Pure debt securities have no secondary market; trade debts may be securitised when pooled with real assets. Markets possible: equity; non-government securities; government/municipal; commodity futures (Salam-based); inter-bank Mudarabah; limited FX."
      ],
      exam: "Sukuk (AAOIFI): equal-value certificates of undivided ownership in tangible assets/usufruct/services. Types: Shirkah, Ijarah, Salam, Istisna‘a. Variable or quasi-fixed returns. Pure debt Sukuk not tradable; asset/equity Sukuk tradable.",
      keyPoints: ["Sukuk differ from shares of joint stock companies.", "Six market types available in the Islamic structure."],
      definitions: [
        { term: "Investment Sukuk", meaning: "Certificates of equal value representing undivided shares in ownership of tangible assets of particular projects or specific investment activity, usufruct and services (AAOIFI)." }
      ],
      related: ["t15.3", "t15.3.5", "t8.8.4"],
      quickCheck: { q: "Which statement about Sukuk tradability is consistent with Section 8.8.3?", options: ["Pure debt Sukuk trade freely at discount", "Pure debt securities have no secondary market in principle; asset/equity Sukuk do", "No Sukuk can be traded", "Only Salam Sukuk trade"], answer: 1, explanation: "p. 204." },
      examples: [
        { title: "Medieval Sukuk", kind: "textbook", text: "In medieval Muslim societies, Sukuk were papers recording obligations from trade. Today’s investment Sukuk instead represent undivided ownership shares in assets, usufruct or services (pp. 204–205)." }
      ]
    },
    {
      id: "t8.8.4", section: "8.8.4", title: "Trading in Financial Instruments", pages: [205, 205], tier: "core",
      concepts: ["sukuk", "hawalah", "bai-sarf"],
      intuition: "What price rule applies when trading a certificate — market price, face value, or currency rules?",
      simple: "Instruments representing real assets and usufruct (Musharakah, Mudarabah, Ijarah certificates) trade at market prices. Instruments representing debts and money follow Hawalah and Bai‘ al Sarf. Mixed pools follow the dominant category: if cash and receivables dominate, Sarf applies; if physical assets dominate, market price.",
      academic: [
        "Tradable vehicles: compliant stocks (dividends and gains after screening), Mudarabah/Musharakah certificates, mutual fund units and investment Sukuk. AAOIFI rules: instruments representing real physical assets and usufruct are negotiable at market prices (Musharakah, Mudarabah, Ijarah); instruments representing debts and money are negotiable subject to Hawalah and Bai‘ al Sarf; pools of different categories follow the dominant category — if cash and debts are relatively larger, Sarf applies; if real assets and usufructs are overwhelming, trading at market price."
      ],
      exam: "Real assets/usufruct → market price. Debts/money → Hawalah/Sarf rules (face value, spot). Mixed → dominant category.",
      keyPoints: ["Dominant-category rule for mixed pools."],
      table: { caption: "Tradability of instruments (Section 8.8.4 and Box 8.3)", head: ["Underlying", "Rule"], rows: [["Business ownership, physical assets, usufruct (Musharakah, Mudarabah, Ijarah Sukuk)", "Negotiable at market price"], ["Debt (Murabaha, Salam, Istisna‘a receivables)", "Not tradable except per Hawalah (face value); money per Sarf"], ["Mixed pool", "Rule of the dominant category"]] },
      related: ["t15.3.6", "t6.10"],
      quickCheck: { q: "A Sukuk pool consists mainly of Murabaha receivables and cash with few physical assets. Its trading is governed by:", options: ["Market price freely", "The rules of Bai‘ al Sarf/Hawalah (dominant category is money/debt)", "Salam rules", "No rules"], answer: 1, explanation: "p. 205." },
      examples: [
        { title: "Dominant-category rule", kind: "textbook", text: "A fund mostly of leased assets trades at market price; a fund mostly of cash and receivables is subject to Bai‘ al Sarf and Hawalah rules (p. 205)." }
      ]
    },
    {
      id: "t8.8.5", section: "8.8.5", title: "Inter-bank Funds Market", pages: [205, 206], tier: "supporting",
      concepts: ["interbank", "mudarabah"],
      intuition: "How do Islamic banks lend surplus funds to each other overnight without interest?",
      simple: "Through Mudarabah placements or sale/purchase of compliant instruments. Malaysia’s Islamic Inter-bank Money Market (IIMM, 1994) includes inter-bank trading of Islamic instruments and Mudarabah Inter-bank Investments (MII) — overnight to 12 months, profit-sharing ratio negotiable, return based on the investee bank’s gross profit rate; since 1996 a minimum benchmark (government investment issues rate + 0.5%).",
      academic: [
        "Islamic inter-bank markets function on Mudarabah or sale/purchase of instruments. Elsewhere, surplus placements (a day to a week) are treated like public deposits with weightages and DPB, or via a negotiated Mudarabah ratio on the deficit bank’s general profits; central banks may advise ratios. Malaysia’s IIMM (January 1994; BNM guidelines December 1993) covers inter-bank trading of Islamic instruments and MII; participants include Islamic, commercial and merchant banks, finance companies and discount houses. MII: a deficit bank (investee) obtains investment from a surplus bank on Mudarabah; tenor overnight to 12 months; return based on the investee’s gross profit rate before distribution for 1-year investments; ratio negotiable; actual return crystallises at the end. From 2 February 1996, BNM set a minimum benchmark: government investment issues rate plus 0.5%. CODs, COIs and Ijarah-based money instruments can also be traded."
      ],
      exam: "Inter-bank: Mudarabah placements or instrument trading. Malaysia IIMM (1994): inter-bank trading + MII (overnight–12 months; negotiable ratio; return on investee’s gross profit; 1996 benchmark = GII rate + 0.5%).",
      keyPoints: [
        "Investor bank doesn’t know the return at negotiation.",
        "Malaysia’s Mudarabah Inter-bank Investment (MII): overnight to 12 months; return based on the investee bank’s gross one-year profit rate; ratio negotiable; since 1996 a minimum benchmark of the government investment rate plus 0.5%."
      ],
      related: ["t14.4.4"],
      quickCheck: { q: "What minimum benchmark rate did BNM introduce for MII in 1996?", options: ["LIBOR", "Government investment issues rate plus 0.5%", "Zero", "The inflation rate"], answer: 1, explanation: "p. 206." },
      examples: [
        { title: "Malaysia’s MII", kind: "textbook", text: "A deficit bank takes 10 million from a surplus bank for three months under Mudarabah Inter-bank Investment. The return follows the investee’s gross profit rate, and since 1996 a minimum benchmark applies (pp. 205–206)." }
      ]
    },
    {
      id: "t8.8.6", section: "8.8.6", title: "Islamic Forward Markets", pages: [206, 208], tier: "supporting",
      concepts: ["salam", "istisna", "juala"],
      intuition: "Can Islamic finance have futures markets? Yes — but with delivery, prepayment and no resale before receipt.",
      simple: "Three possible forward markets: Salam (commodities with regular markets), Istisna‘a (infrastructure/development) and Ju‘alah (services). In a Salam market: delivery is compulsory, no resale before receipt (Parallel Salam allowed), and advance payment is required. Pure speculation on prices is gambling. Istisna‘a futures could help small savers protect real value. Box 8.3 lists Sukuk structures and tradability.",
      academic: [
        "Three markets: Salam-based (products with regular markets), Istisna‘a-based (infrastructure/development), Ju‘alah-based (services). Salam trade: delivery compulsory; reselling before receipt not permitted (Parallel Salam of the same goods for the same date allowed); strictly advance payment, unlike conventional futures. Earning from mere price speculation without part in real activity is gambling; delivery cannot be offset by reversing contracts. Istisna‘a and Ju‘alah markets complete only by actual delivery; Istisna‘a only for specially produced goods; Ju‘alah only services. Prices by competitive bids; bidding means commitment to prepay; fixed intervals for new quotes. Long-term Istisna‘a futures would fluctuate less and could help small savers protect the real value of savings.",
        "Box 8.3: instruments may represent ownership in a company/business (stocks, Musharakah/Mudarabah Sukuk), durable assets or usufruct (Ijarah Sukuk), debt from Murabaha, Istisna‘a or Salam, or a combination. Tradability as in 8.8.4. Treasury: debt portfolio management and risk management (FX, return rate, liquidity, settlement, credit, counterparty). Structures: Musharakah Sukuk (co-ownership with control, income-backed, tradable); Mudarabah Sukuk (ownership without control, tradable); Ijarah Sukuk (sale and lease-back, fixed or floating, rentals, tradable); Salam Sukuk (debt from Salam, short-term, non-tradable); Istisna‘a Sukuk (debt from Istisna‘a, non-tradable)."
      ],
      exam: "Forward markets: Salam (commodities), Istisna‘a (infrastructure), Ju‘alah (services); delivery compulsory, prepayment, no resale before receipt (Parallel Salam OK). Box 8.3: Musharakah, Mudarabah, Ijarah Sukuk tradable; Salam and Istisna‘a Sukuk non-tradable.",
      keyPoints: [
        "No offsetting of delivery by reversing contracts.",
        "Ijarah Sukuk: sale and lease-back; fixed or floating.",
        "Istisna-based forward contracts for long-term development would be useful to small savers as a hedge against inflation."
      ],
      table: { caption: "Salam forward market vs conventional futures (pp. 206–207)", head: ["Feature", "Salam-based market", "Conventional futures"], rows: [["Delivery", "Compulsory", "Usually offset"], ["Resale before receipt", "Not allowed (Parallel Salam allowed)", "Allowed"], ["Price", "Paid in advance", "No advance payment"], ["Purpose", "Real trade", "Often speculation"]] },
      related: ["t10.8", "t15.3.5", "t13.4"],
      quickCheck: { q: "Which Sukuk in Box 8.3 are non-tradable?", options: ["Ijarah and Musharakah", "Salam and Istisna‘a", "Mudarabah only", "All"], answer: 1, explanation: "p. 208." },
      examples: [
        { title: "Salam market vs futures", kind: "textbook", text: "In a Salam market a buyer pays in full now for wheat due in six months and must take delivery; he cannot close out by an opposite contract. A futures trader pays nothing up front and usually offsets before delivery (pp. 206–208)." }
      ]
    },
    {
      id: "t8.8.7", section: "8.8.7", title: "Foreign Exchange Market in the Islamic Framework", pages: [209, 209], tier: "core",
      concepts: ["forex", "wad"],
      intuition: "Can an importer get forward FX cover from an Islamic bank? Yes, with three conditions.",
      simple: "IFIs can invest in compliant FX-denominated Sukuk (e.g. IDB’s Solidarity Trust Certificates, 2003). Forward cover is permissible if: (1) the currency is needed for genuine trade/payment, documented (no speculators or book-out dealers); (2) it is a formal promise, not a sale — the exchange happens simultaneously later at the agreed rate; (3) no forward cover fee, though earnest money (Hamish Jiddiyah) may be taken and the differential recovered on default.",
      academic: [
        "An FX market can function within Shari’ah limits: IFIs may place funds in compliant FX securities like IDB’s Solidarity Trust Certificates (2003) and other Sukuk. Forward cover conditions per contemporary scholars: (1) genuine trade/payment need supported by documents — money changers and dealers relying on book-out transactions cannot take cover; (2) formal promise to sell/purchase, not a sale agreement — sale takes place simultaneously at the agreed future time and rate; (3) price may be fixed, but no forward cover fee; earnest money (Hamish Jiddiyah) may be demanded; if the promisor does not perform, the bank recovers the differential and adjusts the earnest money."
      ],
      exam: "Forward FX cover conditions: genuine documented need; formal promise, simultaneous exchange later at agreed rate; no fee; Hamish Jiddiyah allowed, differential recoverable on default.",
      keyPoints: ["Book-out dealers cannot take forward cover."],
      steps: [
        "Client documents genuine trade/payment need",
        "Client and bank sign a promise to buy/sell a currency amount at an agreed rate on a future date",
        "Bank may take Hamish Jiddiyah (no forward cover fee)",
        "On the date, both currencies are exchanged simultaneously at the agreed rate",
        "If the client defaults, the bank recovers the differential from the earnest money"
      ],
      related: ["t4.5", "t14.4.5", "t5.6"],
      quickCheck: { q: "Which is NOT a condition for Islamic forward FX cover?", options: ["Genuine documented trade need", "A promise rather than a sale", "Payment of a forward cover fee", "Simultaneous exchange at the agreed time"], answer: 2, explanation: "No forward cover fee may be recovered (p. 209)." },
      confusions: [
        { wrong: "An Islamic bank may charge a forward-cover fee.", right: "No forward-cover fee is allowed; the bank may take earnest money (Hamish Jiddiyah) and recover the differential if the client fails to perform (p. 209)." }
      ],
      examples: [
        { title: "Forward cover for an importer", kind: "textbook", text: "An importer must pay US$500,000 in 90 days. With documents showing the import, the bank promises to sell the dollars on that date at an agreed rate and takes earnest money, but charges no cover fee. On the date the currencies are exchanged simultaneously (p. 209)." }
      ]
    },
    {
      id: "t8.8.8", section: "8.8.8", title: "Derivatives and Islamic Finance", pages: [209, 211], tier: "core",
      concepts: ["derivatives", "arbun", "gharar"],
      intuition: "Why do conventional options, swaps and futures not fit Islamic finance — and is there any substitute?",
      simple: "Conventional derivatives stem from debts and trade rights, not delivery. Options give a right without obligation, contrary to the rule that delivery must be given and taken regardless of price moves. Some suggest ‘Arbun-based call options and reverse ‘Arbun puts; Al-Dharir rejects reverse ‘Arbun. Options on currencies, interest rates and indices have no place. Hayes: Salam, Istisna‘a and back-to-back Salam are only imperfect substitutes. The author cites Buffett, El-Gamal, LTCM and CDOs to argue derivatives create unnecessary risk.",
      academic: [
        "Options, swaps and futures stem from debts and involve sale/purchase of liabilities; derivative markets worth trillions make the system fragile. An option confers a right without liability: the holder exercises only if price moves favourably and abandons otherwise, paying a premium — contrary to Shari’ah, where delivery must be given and taken per the sale contract regardless of price movement.",
        "Some writers propose puts and calls in legitimate goods and stocks via ‘Arbun and reverse ‘Arbun (seller paying double on backing out), per Jordanian Civil Code; Sanhuri held reverse ‘Arbun Islamic; Al-Dharir rejects it as secular legislation. All agree options on currencies, interest rates and stock indices have no place. Only Hanbalis uphold ‘Arbun (with time stipulated); the OIC endorses it with a time limit. Even accepting ‘Arbun, most derivatives involve Gharar and Riba. A call option resembles Bai‘ al ‘Arbun, but in ‘Arbun the premium is adjusted in the price on confirmation.",
        "Hayes: no effective Islamic derivatives replicate swaps, futures and options; Salam is an imperfect substitute for forwards, Istisna‘a a partial proxy, and back-to-back Salam partially replicates futures. The author argues derivatives cause the volatility they claim to hedge; Buffett called them “financial weapons of mass destruction”; El-Gamal: relate the system to real activity. Leverage can bankrupt institutions (LTCM bail-out 1998). CDOs pool debts into equity, mezzanine and senior tranches; 2002 downgrades (22%) and $160bn defaults wiped out equity/mezzanine tranches — the concept involves absolute risk and exploitation."
      ],
      exam: "Options: right without obligation → contrary to delivery rule; premium. ‘Arbun-based options debated (Sanhuri vs Al-Dharir); currency/interest/index options excluded. Hayes: Salam, Istisna‘a, back-to-back Salam imperfect substitutes. Derivatives criticised (Buffett, LTCM, CDOs).",
      keyPoints: [
        "Call option ≈ ‘Arbun, but ‘Arbun premium counts toward price.",
        "Reverse ‘Arbun rejected by Al-Dharir.",
        "CDO tranches: equity, mezzanine, senior."
      ],
      debate: [
        { issue: "Can options be structured Islamically through ‘Arbun?", criticism: "Some writers, and Sanhuri (drafter of the Jordanian Civil Code), argue ‘Arbun and reverse ‘Arbun can validate calls and puts on legitimate goods and stocks.", response: "Al-Dharir rejects reverse ‘Arbun as a creature of secular legislation. Only Hanbalis accept ‘Arbun (with time limit); even then most derivatives involve Gharar and Riba; options on currencies, rates and indices have no place.", alternative: "Salam, Istisna‘a and back-to-back Salam as imperfect hedging substitutes (Hayes).", takeaway: "Conventional options are not accepted; ‘Arbun is acceptable only as part payment after a sale is finalised." },
        { issue: "Can ‘Arbun or reverse ‘Arbun validate options?", criticism: "Sanhuri argued reverse ‘Arbun (seller pays double if he backs out), as in the Jordanian Civil Code, could validate put options.", response: "Al-Dhareer rejects this: the clause comes from secular legislation, not Islamic legal works; only Hanbalis accept ‘Arbun, and with a time limit; most derivatives still involve Gharar and Riba.", takeaway: "Options on currencies, interest rates and indices have no place in Islamic finance; Salam and Istisna are only partial substitutes for forwards." }
      ],
      related: ["t5.6.1", "t6.9", "t6.12", "t18.3.2"],
      quickCheck: { q: "Why is a conventional option contract considered non-compliant?", options: ["It is too cheap", "It confers a right but no obligation to transact, while Shari’ah requires delivery to be given and taken regardless of price movement", "It requires delivery", "It is a Salam"], answer: 1, explanation: "p. 209." },
      examples: [
        { title: "CDO tranches", kind: "textbook", text: "A CDO pools loans and issues equity, mezzanine and senior tranches; a couple of defaults in a pool of 100 can wipe out the equity tranche. In 2002 downgrades hit even AAA senior tranches — absolute risk unacceptable in Islamic finance (p. 211)." }
      ]
    }
  ],
  summary: "Banking and non-banking financial institutions can operate as indirect and direct intermediaries in the Islamic framework, with interest replaced by risk-based profit-sharing ratios and profit margins in trade and leasing; IFIs must take liability, bear risk and add value. Markets possible in the Islamic framework include money and capital markets, equity markets, limited FX markets, forward markets and investment Sukuk. The key feature of Islamic instruments is that they must be real-asset based; developing instruments for government deficits is hard because sovereigns lack sufficient real assets. Target-specific Sukuk need enabling laws, accounting standards and regulators. Governments may set up national mutual funds or Mudarabah/leasing companies to replace conventional savings schemes, and the LMC and IIFM should play a proactive coordinating role.",
  takeaways: [
    "Banks remain necessary: they resolve maturity, risk and information mismatches.",
    "Deposits: current (Qard, no return) vs PLS (weighted pools; loss by capital).",
    "Box 8.2 maps each need to Islamic modes.",
    "Mode preference is preference, not prohibition; equity systems absorb shocks.",
    "Screening: Halal business and 33% ratios; purification via charity rate.",
    "OIC 1992 stock rules: mixed companies tradable; no guaranteed preference shares.",
    "Sukuk: asset/equity Sukuk tradable; Salam/Istisna‘a/debt Sukuk not.",
    "Forward FX via promise; conventional options not accepted."
  ],
  checklist: [
    "Can you list conventional deposit and asset products?",
    "Can you explain the three mismatches intermediaries resolve?",
    "Can you compute Box 8.1 profit and loss allocations?",
    "Can you match financing needs to modes (Box 8.2)?",
    "Can you present both sides of the mode-preference debate?",
    "Can you state stock screening ratios and purification method?",
    "Can you state OIC 1992 principles on stocks?",
    "Can you list Sukuk types and tradability, and the three FX forward cover conditions?"
  ],
  flashcards: [
    { id: "f8.1", cat: "Banking", front: "Three mismatches resolved by financial intermediaries (Al-Jarhi & Iqbal)", back: "Maturity/liquidity preferences; risk preferences; information gathering.", topic: "t8.5" },
    { id: "f8.2", cat: "Banking", front: "Three organisational models for Islamic banks", back: "Universal Banking; Bonafide Subsidiary; Bank Holding Company — author prefers fully owned subsidiaries by activity.", topic: "t8.5.1" },
    { id: "f8.3", cat: "Banking", front: "Order of priority of modes (Section 8.5.1)", back: "Musharakah/equity → Mudarabah → Ijarah → deferred sales (Bai‘ Mu’ajjal, Salam, Istisna‘a).", topic: "t8.5.1" },
    { id: "f8.4", cat: "Banking", front: "How is profit shared in a Mudarabah deposit pool (Box 8.1)?", back: "Bank takes its Mudarib share (e.g. 50%); pool share allocated by weighted amounts (deposit × tenor weightage); losses shared by capital, not weightage.", topic: "t8.5.2" },
    { id: "f8.5", cat: "Exam facts", front: "Box 8.1 results", back: "Weights 0.6/0.7/1.0 on $3000/$4000/$3000 → weighted 1800/2800/3000; $500 pool profit → $119/$184/$197; $500 loss → $150/$200/$150.", topic: "t8.5.2" },
    { id: "f8.6", cat: "Financing modes", front: "Box 8.2: auto finance and housing", back: "Autos: Ijarah Muntahia-bi-Tamleek or Murabaha. Housing: Diminishing Musharakah or Murabaha (also rent-sharing).", topic: "t8.5.3" },
    { id: "f8.7", cat: "Comparisons", front: "Mode preference: economists vs bankers (Abdul Halim Ismail)", back: "Economists favour PLS as main tool; bankers treat trade and leasing equally. Author: preference, not prohibition.", topic: "t8.6" },
    { id: "f8.8", cat: "Principles", front: "Mohsin Khan’s key insight on Islamic banking", back: "An equity-based system treats deposits as shares whose nominal value is not guaranteed, so asset shocks are absorbed — better suited to avoid banking crises.", topic: "t8.6" },
    { id: "f8.9", cat: "Capital markets", front: "Usmani’s five categories of Islamic funds", back: "Equity, Ijarah, commodity, Murabaha (closed-end, non-negotiable), mixed (tradable if tangible assets >51%).", topic: "t8.8.1" },
    { id: "f8.10", cat: "Capital markets", front: "Dow Jones Islamic Market Index financial ratios", back: "Each < 33% of trailing 12-month average market cap: total debt; cash + interest-bearing securities; accounts receivable. Plus Halal core business.", topic: "t8.8.1" },
    { id: "f8.11", cat: "Capital markets", front: "Purification — Al Meezan’s charity rate", back: "Charity rate = non-compliant income ÷ gross revenue of investee; × dividends received = amount given to charity.", topic: "t8.8.1" },
    { id: "f8.12", cat: "Capital markets", front: "OIC Fiqh Council 1992 — underwriting", back: "Permissible if at nominal value with no compensation for the commitment itself; fees allowed for other work (feasibility, marketing).", topic: "t8.8.2" },
    { id: "f8.13", cat: "Definitions", front: "Investment Sukuk (AAOIFI)", back: "Certificates of equal value representing undivided shares in ownership of tangible assets, usufruct and services of a project or investment activity.", topic: "t8.8.3" },
    { id: "f8.14", cat: "Capital markets", front: "Trading rule for instruments", back: "Real assets/usufruct → market price; debts/money → Hawalah & Sarf; mixed → dominant category.", topic: "t8.8.4" },
    { id: "f8.15", cat: "Capital markets", front: "Which Sukuk are non-tradable (Box 8.3)?", back: "Salam Sukuk and Istisna‘a Sukuk (represent debt). Musharakah, Mudarabah and Ijarah Sukuk are tradable.", topic: "t8.8.6" },
    { id: "f8.16", cat: "Capital markets", front: "Three conditions for Islamic forward FX cover", back: "Genuine documented trade need; formal promise (not sale) with simultaneous exchange later; no forward cover fee (Hamish Jiddiyah allowed).", topic: "t8.8.7" },
    { id: "f8.17", cat: "Prohibitions", front: "Why are conventional options non-compliant?", back: "They confer a right without obligation and a premium for it; Shari’ah requires delivery given and taken regardless of price movement; Gharar/Riba involved.", topic: "t8.8.8" },
    { id: "f8.18", cat: "Banking", front: "Malaysia’s IIMM (1994)", back: "Inter-bank trading of Islamic instruments and Mudarabah Inter-bank Investment (overnight–12 months, negotiable ratio; 1996 benchmark GII + 0.5%).", topic: "t8.8.5" },
    { id: "f8.19", cat: "Banking", front: "Origin of fractional-reserve banking", back: "English goldsmiths’ receipts circulated as money; goldsmiths lent the gold on interest, keeping a reserve.", topic: "t8.2" },
    { id: "f8.20", cat: "Banking", front: "Commercial bank vs NBFI", back: "Commercial banks: indirect intermediation with cheque facilities. NBFIs: direct intermediation, no cheques; investment banks earn fees and trading profits.", topic: "t8.3" },
    { id: "f8.21", cat: "Banking", front: "Siddiqi’s outline of Islamic banking", back: "Share capital; demand deposits (no return, part earmarked for interest-free loans); investment deposits sharing profit; investment dominates lending.", topic: "t8.5.1" },
    { id: "f8.22", cat: "Banking", front: "Lender of last resort for Islamic banks", back: "Short grace period, then Mudarabah with a ratio heavily favouring the central bank; or sale/purchase of Sukuk.", topic: "t8.5.3" },
    { id: "f8.23", cat: "Banking", front: "Box 8.2: post-shipment export finance", back: "Qard al Hasan in local currency at spot plus a promise to sell FX later; exchange differential is the bank’s income; Murabaha for the next consignment.", topic: "t8.5.3" },
    { id: "f8.24", cat: "Capital markets", front: "Four types of Islamic equity fund by strategy", back: "Regular income; capital gain; aggressive; balanced.", topic: "t8.8.1" },
    { id: "f8.25", cat: "Capital markets", front: "OIC 1992 on preference shares", back: "Not permissible with guaranteed capital, fixed profit or priority in liquidation/dividends; only procedural/administrative preferences allowed.", topic: "t8.8.2" },
    { id: "f8.26", cat: "Capital markets", front: "Mudarabah Inter-bank Investment (Malaysia)", back: "Overnight to 12 months; return based on investee bank’s one-year gross profit rate; negotiable ratio; benchmark from 1996 = government investment rate + 0.5%.", topic: "t8.8.5" },
    { id: "f8.27", cat: "Capital markets", front: "Box 8.3: which Sukuk are tradable?", back: "Musharakah, Mudarabah and Ijarah Sukuk — tradable. Salam and Istisna Sukuk (debt) — non-tradable.", topic: "t8.8.6" },
    { id: "f8.28", cat: "Risk", front: "Why CDOs are unacceptable", back: "Pooled debts sliced into equity, mezzanine and senior tranches — trading in debt with absolute risk and exploitation.", topic: "t8.8.8" }
  ],
  questions: [
    { id: "q8.1", type: "mcq", q: "Which statement reflects the author’s view on the need for banks in an Islamic system?", options: ["Banks are unnecessary without interest", "Banks remain part of the system as intermediaries, but their modus operandi changes to real goods and business", "Only central banks are needed", "Only Takaful companies are needed"], answer: 1, explanation: "pp. 185–186.", topic: "t8.5", diff: "E", level: "understanding", obj: "Explain the need for Islamic banks" },
    { id: "q8.2", type: "application", q: "Using Box 8.1’s method: a pool earns $1000 profit, bank share 50%. Deposits: $3000 (w 0.6), $4000 (w 0.7), $3000 (w 1.0). How much does the 6-month tier receive?", options: ["$200", "$184", "$250", "$119"], answer: 1, explanation: "Pool gets $500; 2800/7600 × 500 ≈ $184.", topic: "t8.5.2", diff: "M", level: "application", obj: "Compute weighted pool profit" },
    { id: "q8.3", type: "tf", q: "In an Islamic bank’s Mudarabah deposit pool, losses are allocated by the same weightages used for profits.", answer: false, explanation: "Losses are shared by investment ratio (Box 8.1).", topic: "t8.5.2", diff: "M", level: "understanding", obj: "Apply loss-sharing rule" },
    { id: "q8.4", type: "match", q: "Match each financing need to a mode listed in Box 8.2.", pairs: [["Automobiles", "Ijarah Muntahia-bi-Tamleek / Murabaha"], ["Housing finance", "Diminishing Musharakah / Murabaha"], ["Farm inputs", "Murabaha / Salam"], ["Letter of guarantee", "Kafalah with service charge"]], explanation: "Box 8.2.", topic: "t8.5.3", diff: "M", level: "recall", obj: "Match needs to modes" },
    { id: "q8.5", type: "comparison", q: "How does Abdul Halim Ismail’s view differ from that of Islamic economists like Siddiqi and Chapra?", options: ["He rejects all Islamic banking", "He considers exchange contracts (trade, leasing) equally legitimate to PLS, while they favour PLS as the main tool", "He prefers interest", "He favours only Mudarabah"], answer: 1, explanation: "p. 196.", topic: "t8.6", diff: "M", level: "analysis", obj: "Compare views on mode preference" },
    { id: "q8.6", type: "multi", q: "Which are general screening criteria for stocks listed in Section 8.8.1? (Select all.)", options: ["Debt less than 33%", "Prohibited activities excluded", "Negligible interest income", "Company must be government-owned", "Share value not less than net liquid assets"], answer: [0, 1, 2, 4], explanation: "p. 202.", topic: "t8.8.1", diff: "M", level: "recall", obj: "Recall screening criteria" },
    { id: "q8.7", type: "application", q: "An investee company’s non-compliant income is 2% of gross revenue. A fund received $50,000 in dividends from it. Using Al Meezan’s method, the amount to purify is:", options: ["$0", "$1,000", "$2,000", "$5,000"], answer: 1, explanation: "Charity rate 2% × $50,000 = $1,000. (Practice example — generated for learning.)", topic: "t8.8.1", diff: "M", level: "application", obj: "Compute purification" },
    { id: "q8.8", type: "scenario", q: "An investment bank agrees to buy any unsubscribed shares of an IPO at nominal value and asks for a 1% fee purely for that commitment. Per the OIC (1992):", options: ["The fee is permitted", "The underwriting is fine but compensation for the commitment per se is not; fees for other work (feasibility, marketing) are allowed", "Underwriting is prohibited", "The fee must be interest-based"], answer: 1, explanation: "p. 203.", topic: "t8.8.2", diff: "H", level: "application", obj: "Apply OIC principles on stocks" },
    { id: "q8.9", type: "identify", q: "Certificates of equal value representing undivided shares in ownership of tangible assets, usufruct and services are:", options: ["Conventional bonds", "Investment Sukuk", "Preference shares", "TDRs"], answer: 1, explanation: "p. 204.", topic: "t8.8.3", diff: "E", level: "recall", obj: "Define Sukuk" },
    { id: "q8.10", type: "mcq", q: "Which Sukuk are described as non-tradable in Box 8.3?", options: ["Ijarah Sukuk", "Musharakah Sukuk", "Salam and Istisna‘a Sukuk", "Mudarabah Sukuk"], answer: 2, explanation: "p. 208.", topic: "t8.8.6", diff: "E", level: "recall", obj: "Classify Sukuk tradability" },
    { id: "q8.11", type: "order", q: "Order the steps of Islamic forward FX cover as described in Section 8.8.7.", items: ["Client documents a genuine trade need", "Client and bank sign a promise at an agreed rate", "Bank takes earnest money (no fee)", "Both currencies are exchanged simultaneously on the agreed date"], explanation: "p. 209.", topic: "t8.8.7", diff: "M", level: "understanding", obj: "Sequence FX forward cover" },
    { id: "q8.12", type: "tf", q: "Hayes concludes that Salam and Istisna‘a are perfect Islamic substitutes for conventional forwards and futures.", answer: false, explanation: "He calls them imperfect/partial substitutes (p. 210).", topic: "t8.8.8", diff: "M", level: "understanding", obj: "Evaluate derivative substitutes" },
    { id: "q8.13", type: "short", q: "Explain why Murabaha funds must be closed-end while Ijarah funds can be traded.", answer: "A Murabaha fund’s portfolio consists of receivables (debts), owning no tangible assets, so its units cannot be sold except at face value (debt sale rules). Ijarah funds own leased assets, so their certificates represent pro rata ownership of real assets and can be traded at market prices.", keywords: ["receivables", "debt", "tangible", "ownership", "market price"], explanation: "Sections 8.8.1 and 8.8.4.", topic: "t8.8.1", diff: "H", level: "analysis", obj: "Analyse fund tradability" },
    { id: "q8.14", type: "mcq", q: "The word “bank” is said to derive from the Italian “banco”, meaning:", options: ["Treasury", "Bench or shelf", "Gold", "Trust"], answer: 1, explanation: "Money changers displayed coins on a bench (p. 179).", topic: "t8.2", diff: "E", level: "recall", obj: "Recall the origin of banking terms" },
    { id: "q8.15", type: "tf", q: "The Glass–Steagall Act of 1933, which separated commercial and investment banking in the US, was repealed in 1999.", answer: true, explanation: "p. 180.", topic: "t8.2", diff: "M", level: "recall", obj: "Recall banking regulation history" },
    { id: "q8.16", type: "identify", q: "Which institution coordinates and standardises the services of banks around the world?", options: ["IMF", "Bank for International Settlements", "World Bank", "IFSB"], answer: 1, explanation: "p. 181.", topic: "t8.3", diff: "E", level: "recall", obj: "Identify global coordinating bodies" },
    { id: "q8.17", type: "comparison", q: "How do investment banks mainly earn income, compared with commercial banks?", options: ["From interest spreads like commercial banks", "From fees and securities trading rather than a lending spread", "From deposits only", "From government grants"], answer: 1, explanation: "p. 181.", topic: "t8.3", diff: "M", level: "understanding", obj: "Contrast income sources of banks" },
    { id: "q8.18", type: "match", q: "Match the conventional deposit product to its feature.", pairs: [["Current account", "Usually non-remunerative"], ["TDR at discount", "Issued below par, grows to par"], ["Advance-profit product", "Profit discounted and paid up front"], ["Perpetuity", "Agreed withdrawals indefinitely"]], explanation: "pp. 181–183.", topic: "t8.4.1", diff: "M", level: "recall", obj: "Recall conventional deposit products" },
    { id: "q8.19", type: "identify", q: "Which conventional treasury product involves selling and simultaneously agreeing to repurchase securities?", options: ["Nostro account", "Repo", "L/G", "Annuity"], answer: 1, explanation: "p. 184.", topic: "t8.4.1", diff: "M", level: "recall", obj: "Identify repo transactions" },
    { id: "q8.20", type: "mcq", q: "What is the most important job of an investment bank, according to Section 8.4.2?", options: ["Accepting current deposits", "Facilitating IPOs", "Issuing credit cards", "Collecting Zakat"], answer: 1, explanation: "p. 184.", topic: "t8.4.2", diff: "E", level: "recall", obj: "Recall investment banking functions" },
    { id: "q8.21", type: "multi", q: "Which mismatches do financial intermediaries resolve, according to Al-Jarhi and Iqbal? (Select all.)", options: ["Maturity/liquidity preferences", "Risk preferences", "Information about placement opportunities", "Religious preferences"], answer: [0, 1, 2], explanation: "p. 186.", topic: "t8.5", diff: "M", level: "understanding", obj: "Explain the need for intermediaries" },
    { id: "q8.22", type: "order", q: "Order the modes by priority for Islamic banks as stated in Section 8.5.1.", items: ["Musharakah / equity participation", "Mudarabah", "Ijarah", "Trading: Bai‘ Mu’ajjal, Salam and Istisna"], explanation: "p. 188.", topic: "t8.5.1", diff: "M", level: "recall", obj: "Recall mode priority" },
    { id: "q8.23", type: "identify", q: "Which organisational model does the author find best suited to Islamic banks with diverse activities?", options: ["Universal banking model", "Bank holding company model with fully owned subsidiaries", "Bonafide subsidiary model", "Branch-only model"], answer: 1, explanation: "p. 188.", topic: "t8.5.1", diff: "M", level: "recall", obj: "Recall organisational models" },
    { id: "q8.24", type: "tf", q: "In an Islamic bank, current account holders share in the profit pool through weightages.", answer: false, explanation: "Current deposits are loans with no weightage and no return (p. 189).", topic: "t8.5.2", diff: "E", level: "recall", obj: "Recall the status of current deposits" },
    { id: "q8.25", type: "application", q: "Pool A (3,000 at 0.6; 4,000 at 0.7; 3,000 at 1.0) suffers a loss of 1,000. How much does the 4,000 depositor bear?", options: ["368", "400", "333", "500"], answer: 1, explanation: "Loss is shared by capital: 4,000/10,000 × 1,000 = 400 (Box 8.1, p. 191).", topic: "t8.5.2", diff: "M", level: "application", obj: "Apply loss allocation in a Mudarabah pool" },
    { id: "q8.26", type: "scenario", q: "A farmer needs a tubewell and a tractor. Which modes does Box 8.2 suggest?", options: ["Qard al Hasan only", "Ijarah Muntahia-bi-Tamleek, Salam or Murabaha", "Musaqat", "Wakalah"], answer: 1, explanation: "p. 195.", topic: "t8.5.3", diff: "M", level: "application", obj: "Match agricultural needs to modes" },
    { id: "q8.27", type: "identify", q: "In Box 8.2, which mode is listed for orchards, nurseries and forestry?", options: ["Murabaha", "Salam and Musaqat", "Ijarah", "Kafalah"], answer: 1, explanation: "p. 195.", topic: "t8.5.3", diff: "H", level: "recall", obj: "Recall agricultural financing modes" },
    { id: "q8.28", type: "comparison", q: "What is Mohsin Khan’s key insight on the difference between Islamic and conventional banking?", options: ["Only the prohibition of interest", "Islamic banks treat deposits as shares whose nominal value is not guaranteed, unlike guaranteed conventional deposits", "Islamic banks are smaller", "Islamic banks do not lend"], answer: 1, explanation: "p. 197.", topic: "t8.6", diff: "H", level: "analysis", obj: "Analyse the equity-based model" },
    { id: "q8.29", type: "multi", q: "Which conclusions did Shahrukh Rafi Khan draw about PLS? (Select all.)", options: ["Expectation-based profit ratios can equilibrate the loanable funds market", "Removing risk-free assets leaves lenders worse off", "Profit ratios are relatively inefficient monetary tools", "PLS always finances every profitable project"], answer: [0, 1, 2], explanation: "The fourth is the opposite of his view (pp. 197–198).", topic: "t8.6", diff: "H", level: "recall", obj: "Recall the PLS debate" },
    { id: "q8.30", type: "tf", q: "Islamic economists who prefer PLS have prohibited debt-creating modes such as Murabaha and Ijarah.", answer: false, explanation: "The issue is preference, not prohibition (p. 196).", topic: "t8.6", diff: "E", level: "understanding", obj: "Understand the mode-preference debate" },
    { id: "q8.31", type: "mcq", q: "Which of these would an Islamic investment bank avoid financing?", options: ["A textile factory", "A company producing alcohol", "A hospital", "A food exporter"], answer: 1, explanation: "p. 199.", topic: "t8.7", diff: "E", level: "application", obj: "Apply investment screening" },
    { id: "q8.32", type: "comparison", q: "Which investors do stable-income (Ijarah-pool) securities suit, according to Section 8.8?", options: ["Aggressive speculators", "Risk-averse investors like widows and retired people", "Only banks", "Only governments"], answer: 1, explanation: "p. 200.", topic: "t8.8", diff: "E", level: "understanding", obj: "Match securities to investor profiles" },
    { id: "q8.33", type: "identify", q: "For a mixed fund to be tradable, what share of tangible assets does Usmani require?", options: ["More than 25%", "More than 51%", "100%", "Any"], answer: 1, explanation: "Liquid assets and debts must be less than 50% (p. 201).", topic: "t8.8.1", diff: "M", level: "recall", obj: "Recall tradability of mixed funds" },
    { id: "q8.34", type: "multi", q: "Which are Dow Jones Islamic Market Index screens? (Select all.)", options: ["Halal core business", "Debt / 12-month average market cap < 33%", "Cash and interest-bearing securities / market cap < 33%", "Receivables / market cap < 33%", "Dividend yield above 5%"], answer: [0, 1, 2, 3], explanation: "p. 202.", topic: "t8.8.1", diff: "M", level: "recall", obj: "Recall DJIM screens" },
    { id: "q8.35", type: "tf", q: "Purification of prohibited income is an obligation on the fund manager’s own fee, not on the investors.", answer: false, explanation: "It is on the owner of the shares; the manager’s fee is his right, though he must exclude prohibited income for the fund (pp. 202–203).", topic: "t8.8.1", diff: "H", level: "understanding", obj: "Assign purification responsibility" },
    { id: "q8.36", type: "scenario", q: "A company proposes preference shares with a guaranteed capital repayment and fixed dividend. According to the OIC Fiqh Council (1992):", options: ["Permissible", "Not permissible — guaranteed capital, fixed profit or priority in liquidation are not allowed", "Permissible if dividend under 10%", "Only for banks"], answer: 1, explanation: "Only procedural/administrative preferences are allowed (pp. 203–204).", topic: "t8.8.2", diff: "M", level: "application", obj: "Apply rules on preference shares" },
    { id: "q8.37", type: "identify", q: "What is the object of the contract in the sale of shares, per the OIC Fiqh Council?", options: ["The share certificate itself", "An undivided portion (Musha‘a) of the company’s assets", "Future dividends", "The company’s debt"], answer: 1, explanation: "p. 203.", topic: "t8.8.2", diff: "M", level: "recall", obj: "Identify the object of share sales" },
    { id: "q8.38", type: "application", q: "A Sukuk fund holds 70% receivables from Murabaha and 30% leased assets. How should its units be traded?", options: ["At market price", "Under Bai‘ al Sarf/Hawalah rules, since debts dominate", "Freely at a discount", "They cannot exist"], answer: 1, explanation: "Dominant-category rule (p. 205).", topic: "t8.8.4", diff: "H", level: "application", obj: "Apply the dominant-category rule" },
    { id: "q8.39", type: "mcq", q: "When was Malaysia’s Islamic Inter-bank Money Market (IIMM) introduced?", options: ["1983", "January 1994", "2000", "1971"], answer: 1, explanation: "p. 206.", topic: "t8.8.5", diff: "E", level: "recall", obj: "Recall the IIMM" },
    { id: "q8.40", type: "multi", q: "How does a Salam-based forward market differ from conventional futures? (Select all.)", options: ["Delivery is compulsory", "Price is paid in advance", "Resale before receipt is not allowed (Parallel Salam aside)", "Contracts are settled by offsetting positions"], answer: [0, 1, 2], explanation: "pp. 206–207.", topic: "t8.8.6", diff: "M", level: "understanding", obj: "Contrast Salam markets and futures" },
    { id: "q8.41", type: "identify", q: "Which type of forward market would be based on services only?", options: ["Salam", "Istisna", "Ju‘alah", "Musharakah"], answer: 2, explanation: "p. 206.", topic: "t8.8.6", diff: "E", level: "recall", obj: "Identify forward market types" },
    { id: "q8.42", type: "scenario", q: "A money changer who relies on book-out deals wants Islamic forward cover. Is it available?", options: ["Yes", "No — cover is only for documented genuine trade or payment needs", "Yes, for a fee", "Only for USD"], answer: 1, explanation: "p. 209.", topic: "t8.8.7", diff: "M", level: "application", obj: "Apply forward-cover conditions" },
    { id: "q8.43", type: "mcq", q: "Why do conventional options fail Shari’ah requirements, according to Section 8.8.8?", options: ["They are too cheap", "They confer a right without obligation, so delivery depends on price movement, and a premium is paid for a mere right", "They are always long-term", "They involve equities"], answer: 1, explanation: "p. 209.", topic: "t8.8.8", diff: "M", level: "understanding", obj: "Explain why options are non-compliant" },
    { id: "q8.44", type: "short", q: "Summarise Hayes’ conclusion on Islamic substitutes for derivatives.", answer: "There are no effective Islamic derivatives of debt or equity replicating swaps, futures and options. For commodities, Salam is an imperfect substitute for a forward, Istisna a partial proxy, and back-to-back Salam can partially replicate a futures contract.", keywords: ["imperfect", "Salam", "Istisna", "back-to-back"], explanation: "p. 210.", topic: "t8.8.8", diff: "M", level: "understanding", obj: "Summarise the derivatives debate" }
  ],
  exam: [
    { id: "e8.1", kind: "long", q: "Describe the deposit side of Islamic banking and illustrate the Mudarabah pool method of profit distribution.", structure: ["Current deposits (Qard/Amanah)", "PLS deposits: ratio, loss by capital", "Special pools for risk-averse clients", "Weightages and DPB", "Box 8.1 worked example: bank share, weighted amounts, tier profits", "Loss allocation"], keyConcepts: ["Mudarabah", "Musharakah among depositors", "weightage"], points: ["Profit by weight; loss by capital", "Deposit Takaful preferable"], mistakes: ["Allocating loss by weightage", "Guaranteeing PLS deposits"], topic: "t8.5.2" },
    { id: "e8.2", kind: "conceptual", q: "Critically discuss the debate on mode preference in Islamic banking.", structure: ["PLS preference (Siddiqi, Chapra, Hasanuz Zaman)", "Exchange-contract view (Abdul Halim Ismail)", "Author’s view: preference not prohibition", "Macroeconomic research (Mohsin Khan; monitoring costs; savings)", "Potential of all modes"], keyConcepts: ["PLS", "risk-sharing", "stability"], points: ["Deposits as shares", "Salam forward market"], mistakes: ["Presenting debt modes as prohibited"], topic: "t8.6" },
    { id: "e8.3", kind: "short", q: "Explain the screening and purification criteria for Islamic equity funds.", structure: ["General criteria", "DJIM ratios", "Purification obligation and method"], keyConcepts: ["33% ratios", "charity rate"], points: ["Investor’s obligation", "Manager excludes in funds"], mistakes: ["Saying purification is the broker’s duty"], topic: "t8.8.1" },
    { id: "e8.4", kind: "difference", q: "Differentiate between tradable and non-tradable Islamic capital market instruments.", structure: ["Asset/equity instruments", "Debt instruments", "Mixed pools", "Box 8.3 Sukuk list"], keyConcepts: ["Hawalah", "Sarf", "dominant category"], points: ["Market price vs face value"], mistakes: ["Allowing Salam Sukuk trading"], topic: "t8.8.4" },
    { id: "e8.5", kind: "viva", q: "Why doesn’t Islamic finance accept conventional options?", structure: ["Right without obligation", "Premium", "‘Arbun debate"], keyConcepts: ["Gharar", "‘Arbun"], points: ["Delivery must be given and taken"], mistakes: ["Equating ‘Arbun with options"], topic: "t8.8.8" },
    { id: "e8.6", kind: "long", q: "Describe the structure of Islamic financial markets. Which instruments are tradable, and on what principles?", structure: ["Money vs capital markets in the Islamic framework", "No pure debt market; asset-backing requirement", "Stable vs variable income securities", "Tradability rules: assets, debts, mixed pools (dominant category)", "Box 8.3 Sukuk types and tradability", "Inter-bank market (MII) and forward markets"], keyConcepts: ["Hawalah", "Bai‘ al Sarf", "dominant category", "Ijarah Sukuk", "MII"], points: ["Debts pass only at nominal value", "Salam/Istisna Sukuk non-tradable", "Mixed funds need >51% tangible assets"], mistakes: ["Treating Murabaha receivables as tradable", "Ignoring Hawalah rules"], topic: "t8.8.4" }
  ]
});
