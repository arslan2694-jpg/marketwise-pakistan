#!/usr/bin/env node
/* Headless-browser smoke test. Serves the app over a local static server
 * (service worker + module scripts need http, not file://), then drives it
 * through the main student workflow, watching for console errors, page
 * errors, and 404s. Exit code non-zero on any hard failure. */
"use strict";
var path = require("path");
var http = require("http");
var fs = require("fs");
var { chromium } = require("playwright");

var ROOT = path.join(__dirname, "..");
var PORT = 8934;

var MIME = { ".html": "text/html", ".js": "application/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".pdf": "application/pdf" };

function startServer() {
  return new Promise(function (resolve) {
    var server = http.createServer(function (req, res) {
      var urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath === "/") urlPath = "/index.html";
      var filePath = path.join(ROOT, urlPath);
      if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
      fs.readFile(filePath, function (err, data) {
        if (err) { res.writeHead(404); res.end("Not found: " + urlPath); return; }
        var ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
      });
    });
    server.listen(PORT, function () { resolve(server); });
  });
}

async function main() {
  var server = await startServer();
  var browser = await chromium.launch();
  var consoleErrors = [];
  var pageErrors = [];
  var failedRequests = [];
  var results = [];

  try {
    var context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
    var page = await context.newPage();
    page.on("console", function (msg) { if (msg.type() === "error") consoleErrors.push(msg.text()); });
    page.on("pageerror", function (err) { pageErrors.push(String(err)); });
    page.on("requestfailed", function (req) { failedRequests.push(req.url() + " :: " + (req.failure() && req.failure().errorText)); });
    page.on("response", function (res) { if (res.status() === 404) failedRequests.push(res.url() + " :: 404"); });

    async function visit(hash, label) {
      await page.goto("http://localhost:" + PORT + "/index.html#" + hash, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      var title = await page.textContent("h1").catch(function () { return null; });
      results.push({ label: label, hash: hash, h1: title });
    }

    await visit("/dashboard", "Dashboard");
    await visit("/learn", "Learn - All Chapters");
    await visit("/chapter/1", "Chapter 1 overview");

    // find first topic link on chapter 1 and click through
    var topicHref = await page.getAttribute(".card-clickable[data-nav*='/topic/']", "data-nav").catch(function () { return null; });
    if (topicHref) {
      await page.goto("http://localhost:" + PORT + "/index.html" + topicHref, { waitUntil: "networkidle" });
      await page.waitForTimeout(250);
      results.push({ label: "Chapter 1 topic detail", hash: topicHref });
      // exercise level switch
      var mbaBtn = await page.$('[data-level="mba"]');
      if (mbaBtn) await mbaBtn.click();
      // mark complete
      var completeBtn = await page.$("#complete-btn");
      if (completeBtn) await completeBtn.click();
    } else {
      results.push({ label: "Chapter 1 topic detail", error: "No topic link found on chapter page" });
    }

    await visit("/glossary", "Glossary");
    await page.fill("#glossary-search", "Riba").catch(function () {});
    await page.waitForTimeout(400);

    await visit("/flashcards", "Flashcards picker");
    var dueBtn = await page.$('[data-start="all"]');
    if (dueBtn) {
      await dueBtn.click();
      await page.waitForTimeout(300);
      var flashcardEl = await page.$("#flashcard");
      if (flashcardEl) {
        await flashcardEl.click();
        await page.waitForTimeout(300);
        var goodBtn = await page.$('[data-rate="good"]');
        if (goodBtn) await goodBtn.click();
      }
    }

    await visit("/quiz", "Quiz picker");
    await visit("/quiz/chapter/1", "Chapter 1 quiz");
    await page.waitForTimeout(300);
    var firstOption = await page.$(".quiz-option");
    if (firstOption) {
      await firstOption.click();
      var submitBtn = await page.$("button:has-text('Submit Answer')");
      if (submitBtn) await submitBtn.click();
    }

    await visit("/comparisons", "Comparison Lab");
    await visit("/concept-map", "Concept Map");
    await visit("/case-studies", "Case Study Lab");
    await visit("/decision-tool", "Decision Tool");
    await visit("/exam-prep", "Exam Prep Center");
    await visit("/crash-course/45", "45-min Crash Course");
    await visit("/bookmarks", "Bookmarks");
    await visit("/notes", "Notes");
    await visit("/progress", "My Progress");
    await visit("/timer", "Study Timer");
    await visit("/settings", "Settings");

    // Dark mode toggle
    await page.click("#theme-toggle").catch(function () {});
    await page.waitForTimeout(200);
    var theme1 = await page.getAttribute("html", "data-theme");
    await page.click("#theme-toggle").catch(function () {});
    await page.waitForTimeout(200);
    var theme2 = await page.getAttribute("html", "data-theme");
    results.push({ label: "Theme toggle", before: theme1, after: theme2 });

    // Mobile viewport check
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:" + PORT + "/index.html#/dashboard", { waitUntil: "networkidle" });
    var mobileMenuVisible = await page.isVisible("#mobile-menu-btn");
    results.push({ label: "Mobile topbar visible", value: mobileMenuVisible });

    // Persistence check: reload and confirm topic completion / theme survive
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.reload({ waitUntil: "networkidle" });
    var themeAfterReload = await page.getAttribute("html", "data-theme");
    results.push({ label: "Theme persisted after reload", value: themeAfterReload });

    await browser.close();
  } finally {
    server.close();
  }

  console.log("=== Browser Smoke Test Results ===\n");
  results.forEach(function (r) { console.log(JSON.stringify(r)); });

  console.log("\nConsole errors: " + consoleErrors.length);
  consoleErrors.slice(0, 30).forEach(function (e) { console.log("  x " + e); });
  console.log("\nPage errors: " + pageErrors.length);
  pageErrors.forEach(function (e) { console.log("  x " + e); });
  console.log("\nFailed/404 requests: " + failedRequests.length);
  failedRequests.slice(0, 30).forEach(function (e) { console.log("  x " + e); });

  var hardFail = pageErrors.length > 0 || consoleErrors.length > 0;
  process.exit(hardFail ? 1 : 0);
}

main().catch(function (e) { console.error("Smoke test crashed:", e); process.exit(1); });
