#!/usr/bin/env node
/* Verifies the standalone bundle actually works when opened the way a user
 * would open it: double-clicking it, i.e. loaded via file:// with no server
 * at all. Exercises the same core flows as the modular smoke test. */
"use strict";
var path = require("path");
var { chromium } = require("playwright");

var FILE = "file://" + path.join(__dirname, "..", "Understanding-Islamic-Finance-STANDALONE.html");

async function main() {
  var browser = await chromium.launch();
  var errors = [];
  var pageErrors = [];
  var failedRequests = [];
  var results = [];
  try {
    var page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
    page.on("console", function (m) { if (m.type() === "error") errors.push(m.text()); });
    page.on("pageerror", function (e) { pageErrors.push(String(e)); });
    page.on("requestfailed", function (r) { failedRequests.push(r.url() + " :: " + (r.failure() && r.failure().errorText)); });

    await page.goto(FILE, { waitUntil: "load" });
    await page.waitForTimeout(400);
    results.push({ check: "Dashboard h1", value: await page.textContent("h1").catch(function () { return null; }) });

    await page.click('[data-nav="#/chapter/9"]').catch(function () {});
    await page.evaluate(function () { location.hash = "#/chapter/9"; });
    await page.waitForTimeout(300);
    results.push({ check: "Chapter 9 h1", value: await page.textContent("h1").catch(function () { return null; }) });

    var topicLink = await page.getAttribute(".card-clickable[data-nav*='/topic/']", "data-nav").catch(function () { return null; });
    if (topicLink) {
      await page.evaluate(function (h) { location.hash = h.replace(/^#/, ""); }, topicLink);
      await page.waitForTimeout(300);
      results.push({ check: "Topic detail loaded", value: await page.textContent("h1").catch(function () { return null; }) });
      var mpoTx = await page.$$(".process-step");
      results.push({ check: "Transaction steps on some topic", value: mpoTx.length });
    }

    await page.evaluate(function () { location.hash = "#/glossary"; });
    await page.waitForTimeout(300);
    results.push({ check: "Glossary term count text present", value: await page.textContent(".section-header span").catch(function () { return null; }) });

    await page.evaluate(function () { location.hash = "#/quiz/chapter/9"; });
    await page.waitForTimeout(300);
    var firstOption = await page.$(".quiz-option");
    results.push({ check: "Quiz question rendered with options", value: !!firstOption });

    await page.evaluate(function () { location.hash = "#/case-studies"; });
    await page.waitForTimeout(300);
    var csCount = await page.$$eval(".card-clickable", function (els) { return els.length; }).catch(function () { return -1; });
    results.push({ check: "Case studies rendered", value: csCount });

    // localStorage persistence under file://
    await page.evaluate(function () {
      localStorage.setItem("ifl_v1_filetest_probe", "1");
    });
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(300);
    var probe = await page.evaluate(function () { return localStorage.getItem("ifl_v1_filetest_probe"); });
    results.push({ check: "localStorage persists across reload under file://", value: probe });

    // theme toggle + persistence
    await page.click("#theme-toggle").catch(function () {});
    await page.waitForTimeout(150);
    var themeAfterClick = await page.getAttribute("html", "data-theme");
    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(300);
    var themeAfterReload = await page.getAttribute("html", "data-theme");
    results.push({ check: "Theme toggle + persistence", before: themeAfterClick, afterReload: themeAfterReload });

    await browser.close();
  } finally {
    // no server to close
  }

  console.log("=== Standalone file:// Test (double-click simulation) ===\n");
  console.log("File:", FILE, "\n");
  results.forEach(function (r) { console.log(JSON.stringify(r)); });
  console.log("\nConsole errors: " + errors.length);
  errors.forEach(function (e) { console.log("  x " + e); });
  console.log("Page errors: " + pageErrors.length);
  pageErrors.forEach(function (e) { console.log("  x " + e); });
  console.log("Failed requests: " + failedRequests.length);
  failedRequests.forEach(function (e) { console.log("  x " + e); });

  process.exit((pageErrors.length || errors.length || failedRequests.length) ? 1 : 0);
}

main().catch(function (e) { console.error(e); process.exit(1); });
