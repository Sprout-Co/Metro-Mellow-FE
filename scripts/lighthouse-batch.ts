import { runLighthouseAudit } from "./lighthouse-audit";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = "./lighthouse-reports";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const servicePages = [
  { name: "cleaning", path: "/services/cleaning" },
  { name: "laundry", path: "/services/laundry" },
  { name: "food", path: "/services/food" },
  { name: "pest-control", path: "/services/pest-control" },
];

interface BatchResult {
  page: string;
  results: Awaited<ReturnType<typeof runLighthouseAudit>>;
}

// Performance thresholds
const THRESHOLDS = {
  performance: 90,
  seo: 95,
  accessibility: 90,
  bestPractices: 90,
};

async function runBatchAudits() {
  console.log("🚀 Starting Lighthouse batch audit...\n");
  console.log(`Base URL: ${BASE_URL}\n`);

  const results: BatchResult[] = [];

  for (const service of servicePages) {
    const url = `${BASE_URL}${service.path}`;
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // Format as HH-MM-SS
    const dateFormatted = `${date}_${time}`;
    console.log(`\n📊 Auditing: ${service.name} (${url})`);

    try {
      const result = await runLighthouseAudit({
        url,
        outputPath: `${OUTPUT_DIR}/${service.name}-${dateFormatted}.html`,
        categories: ["performance", "accessibility", "best-practices", "seo"],
        device: "mobile",
      });

      results.push({ page: service.name, results: result });

      console.log(`  ✅ Performance: ${result.performance}/100`);
      console.log(`  ✅ Accessibility: ${result.accessibility}/100`);
      console.log(`  ✅ Best Practices: ${result.bestPractices}/100`);
      console.log(`  ✅ SEO: ${result.seo}/100`);
      console.log(`  📈 LCP: ${result.metrics.lcp?.toFixed(2)}ms`);
      console.log(`  📈 CLS: ${result.metrics.cls?.toFixed(3)}`);
    } catch (error) {
      console.error(`  ❌ Failed to audit ${service.name}:`, error);
      results.push({
        page: service.name,
        results: {
          url,
          performance: 0,
          accessibility: 0,
          bestPractices: 0,
          seo: 0,
          metrics: {},
        },
      });
    }
  }

  // Summary
  console.log("\n\n📋 Summary:");
  console.log("=".repeat(70));

  const failed: BatchResult[] = [];

  results.forEach(({ page, results }) => {
    const isFailed =
      results.performance < THRESHOLDS.performance ||
      results.seo < THRESHOLDS.seo ||
      results.accessibility < THRESHOLDS.accessibility ||
      results.bestPractices < THRESHOLDS.bestPractices;

    if (isFailed) {
      failed.push({ page, results });
    }

    console.log(`\n${page.toUpperCase()}:`);
    console.log(
      `  Performance: ${results.performance}/100 ${results.performance < THRESHOLDS.performance ? "❌" : "✅"}`
    );
    console.log(
      `  SEO: ${results.seo}/100 ${results.seo < THRESHOLDS.seo ? "❌" : "✅"}`
    );
    console.log(
      `  Accessibility: ${results.accessibility}/100 ${results.accessibility < THRESHOLDS.accessibility ? "❌" : "✅"}`
    );
    console.log(
      `  Best Practices: ${results.bestPractices}/100 ${results.bestPractices < THRESHOLDS.bestPractices ? "❌" : "✅"}`
    );
    console.log(`  LCP: ${results.metrics.lcp?.toFixed(2)}ms`);
    console.log(`  CLS: ${results.metrics.cls?.toFixed(3)}`);
    if (results.reportPath) {
      console.log(`  📄 Report: ${results.reportPath}`);
    }
  });

  // Final verdict
  console.log("\n" + "=".repeat(70));

  if (failed.length > 0) {
    console.error(`\n❌ ${failed.length} page(s) below threshold!`);
    console.error("\nFailed pages:");
    failed.forEach(({ page, results }) => {
      console.error(`  - ${page}:`);
      if (results.performance < THRESHOLDS.performance) {
        console.error(
          `    Performance: ${results.performance} < ${THRESHOLDS.performance}`
        );
      }
      if (results.seo < THRESHOLDS.seo) {
        console.error(`    SEO: ${results.seo} < ${THRESHOLDS.seo}`);
      }
      if (results.accessibility < THRESHOLDS.accessibility) {
        console.error(
          `    Accessibility: ${results.accessibility} < ${THRESHOLDS.accessibility}`
        );
      }
      if (results.bestPractices < THRESHOLDS.bestPractices) {
        console.error(
          `    Best Practices: ${results.bestPractices} < ${THRESHOLDS.bestPractices}`
        );
      }
    });
    process.exit(1);
  } else {
    console.log("\n✅ All pages meet performance and SEO thresholds!");
    console.log(`\n📊 Thresholds:`);
    console.log(`  Performance: ≥ ${THRESHOLDS.performance}`);
    console.log(`  SEO: ≥ ${THRESHOLDS.seo}`);
    console.log(`  Accessibility: ≥ ${THRESHOLDS.accessibility}`);
    console.log(`  Best Practices: ≥ ${THRESHOLDS.bestPractices}`);
  }
}

runBatchAudits().catch((error) => {
  console.error("❌ Batch audit failed:", error);
  process.exit(1);
});
