/* Financing mode decision tree (educational). Each node asks a question; answers lead to another
   node or to a result listing suitable modes with the textbook sections that explain them.
   This is a learning aid built from the book's discussion (especially Section 14.3.2 and Box 14.1) —
   not a Shari’ah ruling or product advice. */
IFL_DATA.register('modeFinder', {
  disclaimer: "Educational tool only. It summarises the textbook's discussion of when each mode is typically suitable. It is not a Fatwa, a Shari’ah ruling or financial advice; real transactions must be structured with a qualified Shari’ah board.",
  start: "need",
  nodes: {
    need: { q: "What does the client mainly need?", options: [
      { label: "To buy goods / raw materials / an asset", next: "goods" },
      { label: "To use an asset without buying it now", next: "use" },
      { label: "Finance for a business or project with shared risk", next: "venture" },
      { label: "Something manufactured or constructed", next: "build" },
      { label: "Cash / liquidity", next: "cash" },
      { label: "A service or a result (e.g. debt recovery)", next: "service" }
    ] },
    goods: { q: "When will the goods be delivered?", options: [
      { label: "Goods exist now; payment later", next: "goods-now" },
      { label: "Goods will be produced later (e.g. crop); seller needs money now", result: "salam" }
    ] },
    "goods-now": { q: "Should the bank disclose its cost?", options: [
      { label: "Yes — cost-plus pricing", result: "murabaha" },
      { label: "No — bargained price", result: "musawamah" }
    ] },
    use: { q: "Does the client want ownership at the end?", options: [
      { label: "No — use only", result: "ijarah" },
      { label: "Yes — eventually own it", next: "own-end" }
    ] },
    "own-end": { q: "Will the client contribute part of the price up front and buy the rest gradually?", options: [
      { label: "Yes — joint ownership, buying units", result: "dm" },
      { label: "No — lease, then separate transfer", result: "imbt" }
    ] },
    venture: { q: "Will the client also contribute capital?", options: [
      { label: "Yes — both contribute capital", result: "musharakah" },
      { label: "No — bank provides capital, client manages", result: "mudarabah" }
    ] },
    build: { q: "Is the bank financing a customer who ordered the asset?", options: [
      { label: "Yes — bank delivers the asset and subcontracts construction", result: "parallel-istisna" },
      { label: "Buyer orders directly from the manufacturer", result: "istisna" }
    ] },
    cash: { q: "Is the client a producer who can sell future output?", options: [
      { label: "Yes — sell output in advance", result: "salam" },
      { label: "No — corporate liquidity need with no other option", result: "tawarruq" },
      { label: "Government or large corporate with durable assets", result: "sukuk" }
    ] },
    service: { q: "Is the work and wage specifiable?", options: [
      { label: "Yes — defined work for a wage/fee", result: "ujrah" },
      { label: "No — only the result can be specified", result: "jualah" }
    ] }
  },
  results: {
    murabaha: { title: "Murabaha (MPO)", why: "Short-term purchase of existing goods at cost plus disclosed profit.", topics: ["t9.3", "t9.8", "t14.3.2"], cautions: ["Bank must own and bear risk before sale", "No rollover; penalties to charity"] },
    musawamah: { title: "Musawamah", why: "Sale of goods at a bargained price without disclosing cost.", topics: ["t9.11", "t9.11.1"], cautions: ["Avoid gross overpricing (Ghaban)"] },
    salam: { title: "Salam", why: "Advance full payment for goods produced later — agriculture and working capital.", topics: ["t10.2", "t10.10", "t14.4.1"], cautions: ["Full prepayment", "Precise specifications and delivery date"] },
    ijarah: { title: "Ijarah (operating lease)", why: "Use of a non-consumable asset for rent; bank keeps ownership risk.", topics: ["t11.1", "t11.3"], cautions: ["No rent before delivery", "Lessor bears major repairs and Takaful"] },
    imbt: { title: "Ijarah Muntahia-bi-Tamleek", why: "Lease ending in ownership through a separate promise to sell or gift.", topics: ["t11.5", "t11.5.1"], cautions: ["Keep lease and transfer separate"] },
    dm: { title: "Diminishing Musharakah", why: "Joint ownership with rent on the bank's share and gradual unit purchase — housing and fixed assets.", topics: ["t12.8", "t12.9.2"], cautions: ["Separate contracts", "Pre-agreed unit price only in Shirkatulmilk"] },
    musharakah: { title: "Musharakah", why: "Both contribute capital; profit as agreed, loss by capital.", topics: ["t12.3", "t12.7.2"], cautions: ["No guarantee of capital or profit"] },
    mudarabah: { title: "Mudarabah", why: "Bank supplies capital, client supplies management; loss borne by capital provider.", topics: ["t12.4", "t12.7.2"], cautions: ["Higher moral-hazard risk; monitoring needed"] },
    istisna: { title: "Istisna‘a", why: "Order to manufacture/construct with flexible payment.", topics: ["t10.11", "t10.11.3"], cautions: ["Only for manufactured items"] },
    "parallel-istisna": { title: "Istisna‘a + Parallel Istisna‘a", why: "Bank sells the asset to the customer and subcontracts construction.", topics: ["t10.11.7", "t14.4.3"], cautions: ["Two independent contracts"] },
    tawarruq: { title: "Tawarruq (with caution)", why: "Credit purchase and spot sale to a third party — scholars advise only for unavoidable corporate liquidity needs.", topics: ["t13.3", "t13.3.1"], cautions: ["Avoid agency to self and paper-only trades", "Qard al Hasan is preferable"] },
    sukuk: { title: "Sukuk", why: "Securitise durable assets (e.g. Ijarah Sukuk) to raise funds from many investors.", topics: ["t15.3", "t15.3.5.b", "t15.4.cases"], cautions: ["True sale and real ownership", "No issuer guarantee of fixed return"] },
    ujrah: { title: "Ijarah of services (Ujrah)", why: "Hire of specified work for a wage/fee.", topics: ["t11.1", "t13.4.3"], cautions: ["Work and wage must be specified"] },
    jualah: { title: "Ju‘alah", why: "Reward for achieving a result that cannot be precisely specified in effort.", topics: ["t13.4", "t13.4.6"], cautions: ["No result, no reward"] }
  }
});
