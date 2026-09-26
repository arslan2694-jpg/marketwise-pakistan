#!/usr/bin/env node
/* One-off deeper interaction check, not part of the permanent test suite:
 * transaction diagrams, Chapter 17 criticism blocks, decision tool
 * multi-step flow, Teach Me mode, adaptive practice, case study reveal,
 * exam trainer reveal, rapid revision cards. */
"use strict";
var path = require("path");
var http = require("http");
var fs = require("fs");
var { chromium } = require("playwright");

var ROOT = path.join(__dirname, "..");
var PORT = 8935;
var MIME = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" };

function startServer() {
  return new Promise(function (resolve) {
    var server = http.createServer(function (req, res) {
      var urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath === "/") urlPath = "/index.html";
      var filePath = path.join(ROOT, urlPath);
      fs.readFile(filePath, function (err, data) {
        if (err) { res.writeHead(404); res.end(); return; }
        res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
        res.end(data);
      });
    });
    server.listen(PORT, function () { resolve(server); });
  });
}

async function main() {
  var server = await startServer();
  var browser = await chromium.launch();
  var errors = [];
  var checks = [];
  try {
    var page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    page.on("pageerror", function (e) { errors.push(String(e)); });
    page.on("console", function (m) { if (m.type() === "error") errors.push(m.text()); });

    async function go(hash) { await page.goto("http://localhost:" + PORT + "/index.html#" + hash, { waitUntil: "networkidle" }); await page.waitForTimeout(200); }

    // Ch9 MPO transaction diagram (flowchart: .tx-node boxes + shared .tx-detail panel)
    await go("/chapter/9/topic/ch9-t9");
    var stepCount = await page.$$eval(".tx-node", function (els) { return els.length; }).catch(function () { return -1; });
    checks.push({ check: "Ch9 MPO transaction steps rendered", value: stepCount });
    var secondStep = await page.$$(".tx-node");
    if (secondStep[1]) { await secondStep[1].click(); await page.waitForTimeout(150); }
    var activeCount = await page.$$eval(".tx-node.active", function (els) { return els.length; }).catch(function () { return -1; });
    var detailUpdated = await page.textContent("#tx-detail").catch(function () { return null; });
    checks.push({ check: "Transaction flowchart node click selects + updates detail panel", value: activeCount === 1, detailNonEmpty: !!(detailUpdated && detailUpdated.length > 10) });

    // Chapter 17 criticism block
    await go("/chapter/17");
    var ch17Topics = await page.$$eval("[data-nav*='/topic/']", function (els) { return els.map(function(e){return e.getAttribute('data-nav');}); });
    checks.push({ check: "Ch17 topic count", value: ch17Topics.length });
    if (ch17Topics[0]) {
      await page.goto("http://localhost:" + PORT + "/index.html" + ch17Topics[0], { waitUntil: "networkidle" });
      await page.waitForTimeout(200);
      var hasCriticismBlock = await page.isVisible("text=Criticism & Appraisal").catch(function(){return false;});
      checks.push({ check: "Ch17 first topic shows Criticism & Appraisal block", value: hasCriticismBlock });
    }

    // Decision tool multi-step
    await go("/decision-tool");
    var firstOption = await page.$(".quiz-option");
    if (firstOption) {
      await firstOption.click();
      await page.waitForTimeout(200);
      var stillOnTree = await page.isVisible(".card h3").catch(function(){return false;});
      checks.push({ check: "Decision tool advances after clicking an option", value: stillOnTree });
    }

    // Teach Me mode
    await go("/teach/ch9-t1");
    var teachTitle = await page.textContent("h1").catch(function(){return null;});
    checks.push({ check: "Teach Me mode loads", value: teachTitle });
    var nextBtn = await page.$("#tm-next");
    if (nextBtn) { await nextBtn.click(); await page.waitForTimeout(150); }
    var step2 = await page.textContent(".card h3").catch(function(){return null;});
    checks.push({ check: "Teach Me mode advances to step 2", value: step2 });

    // Adaptive practice
    await go("/adaptive");
    var startAdaptive = await page.$("#start-adaptive");
    checks.push({ check: "Adaptive practice start button present", value: !!startAdaptive });

    // Interactive calculators
    await go("/calculators/deposit-pool");
    await page.fill("#dp-amt-0", "6000");
    await page.waitForTimeout(150);
    var dpResult = await page.textContent("#dp-result").catch(function () { return null; });
    checks.push({ check: "Deposit pool calculator live-recalculates", value: !!(dpResult && dpResult.length > 20) });

    await go("/calculators/musharakah-split");
    await page.check("#ms-sleeping");
    await page.waitForTimeout(150);
    var ruleCaught = await page.isVisible("text=Rule violation caught").catch(function () { return false; });
    checks.push({ check: "Musharakah calculator catches sleeping-partner rule violation", value: ruleCaught });

    // Concept Hub
    await go("/concept/riba");
    var hubTitle = await page.textContent("h1").catch(function () { return null; });
    var topicCount = await page.$$eval(".card-clickable[data-nav*='/topic/']", function (els) { return els.length; }).catch(function () { return 0; });
    checks.push({ check: "Concept Hub (Riba) loads with cross-referenced topics", value: hubTitle, topicsFound: topicCount });

    // Case study reveal
    await go("/case-studies");
    var firstCase = await page.$(".card-clickable");
    if (firstCase) {
      var href = await firstCase.getAttribute("data-nav");
      await page.goto("http://localhost:" + PORT + "/index.html" + href, { waitUntil: "networkidle" });
      await page.waitForTimeout(150);
      var revealBtn = await page.$("#reveal-btn");
      if (revealBtn) { await revealBtn.click(); await page.waitForTimeout(150); }
      var answerVisible = await page.isVisible("#cs-answer");
      checks.push({ check: "Case study reveal-answer works", value: answerVisible });
    }

    // Exam trainer reveal
    await go("/exam-prep/trainer");
    var firstTrainer = await page.$(".card-clickable");
    if (firstTrainer) {
      var href2 = await firstTrainer.getAttribute("data-nav");
      await page.goto("http://localhost:" + PORT + "/index.html" + href2, { waitUntil: "networkidle" });
      await page.waitForTimeout(150);
      var revealBtn2 = await page.$("#reveal-trainer");
      if (revealBtn2) { await revealBtn2.click(); await page.waitForTimeout(150); }
      var revealVisible = await page.isVisible("#trainer-reveal");
      checks.push({ check: "Exam trainer reveal works", value: revealVisible });
    }

    // Rapid revision
    await go("/exam-prep/rapid-revision");
    var rrTitle = await page.textContent("h2").catch(function(){return null;});
    checks.push({ check: "Rapid revision card renders", value: rrTitle });

    // Glossary search + bookmark
    await go("/glossary");
    await page.fill("#glossary-search", "Riba");
    await page.waitForTimeout(350);
    var glossaryResultCount = await page.$$eval("#glossary-list > div", function (els) { return els.length; }).catch(function(){return -1;});
    checks.push({ check: "Glossary search for 'Riba' returns results", value: glossaryResultCount });

    // Export data
    await go("/settings");
    checks.push({ check: "Settings page loaded", value: await page.isVisible("#export-btn") });

    await browser.close();
  } finally {
    server.close();
  }

  console.log("=== Deep Check Results ===\n");
  checks.forEach(function (c) { console.log(JSON.stringify(c)); });
  console.log("\nErrors: " + errors.length);
  errors.forEach(function (e) { console.log("  x " + e); });
  process.exit(errors.length ? 1 : 0);
}

main().catch(function (e) { console.error(e); process.exit(1); });
