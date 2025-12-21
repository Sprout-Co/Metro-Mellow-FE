import * as chromeLauncher from "chrome-launcher";
import * as fs from "fs";
import * as path from "path";

interface AuditConfig {
  url: string;
  outputPath?: string;
  categories?: string[];
  device?: "mobile" | "desktop";
}

interface AuditResult {
  url: string;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  metrics: {
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
    tti?: number;
    speedIndex?: number;
  };
  reportPath?: string;
}

export async function runLighthouseAudit(
  config: AuditConfig
): Promise<AuditResult> {
  const {
    url,
    outputPath,
    categories = ["performance", "seo"],
    device = "mobile",
  } = config;

  // Dynamic import to avoid ESM resolution issues with tsx
  const lighthouseModule = await import("lighthouse");
  const lighthouse = lighthouseModule.default || lighthouseModule;

  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  });

  try {
    // Run Lighthouse
    const options = {
      logLevel: "info" as const,
      output: "html" as const,
      onlyCategories: categories,
      port: chrome.port,
      emulatedFormFactor: device,
    };

    const runnerResult = await lighthouse(url, options);

    if (!runnerResult) {
      throw new Error("Lighthouse audit failed - no result returned");
    }

    // Extract scores
    const lhr = runnerResult.lhr;
    const performance = Math.round(
      (lhr.categories.performance?.score || 0) * 100
    );
    const accessibility = Math.round(
      (lhr.categories.accessibility?.score || 0) * 100
    );
    const bestPractices = Math.round(
      (lhr.categories.bestPractices?.score || 0) * 100
    );
    const seo = Math.round((lhr.categories.seo?.score || 0) * 100);

    // Extract Core Web Vitals
    const metrics = {
      lcp: lhr.audits["largest-contentful-paint"]?.numericValue,
      fid: lhr.audits["max-potential-fid"]?.numericValue,
      cls: lhr.audits["cumulative-layout-shift"]?.numericValue,
      fcp: lhr.audits["first-contentful-paint"]?.numericValue,
      tti: lhr.audits["interactive"]?.numericValue,
      speedIndex: lhr.audits["speed-index"]?.numericValue,
    };

    // Save HTML report if output path provided
    let reportPath: string | undefined;
    if (outputPath && runnerResult.report) {
      const fullPath = path.resolve(outputPath);
      // Ensure directory exists
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // Handle both string and string[] report types
      const reportContent = Array.isArray(runnerResult.report)
        ? runnerResult.report.join("")
        : runnerResult.report;
      fs.writeFileSync(fullPath, reportContent);
      reportPath = fullPath;
      console.log(`✅ Report saved to: ${fullPath}`);
    }

    return {
      url,
      performance,
      accessibility,
      bestPractices,
      seo,
      metrics,
      reportPath,
    };
  } finally {
    // Always kill Chrome
    await chrome.kill();
  }
}

// CLI usage
if (require.main === module) {
  const url = process.argv[2] || "http://localhost:3000/services/cleaning";
  const outputPath =
    process.argv[3] ||
    `./lighthouse-reports/lighthouse-report-${Date.now()}.html`;

  runLighthouseAudit({
    url,
    outputPath,
    categories: ["performance", "accessibility", "best-practices", "seo"],
    device: "mobile",
  })
    .then((result) => {
      console.log("\n📊 Lighthouse Audit Results:");
      console.log(`URL: ${result.url}`);
      console.log(`Performance: ${result.performance}/100`);
      console.log(`Accessibility: ${result.accessibility}/100`);
      console.log(`Best Practices: ${result.bestPractices}/100`);
      console.log(`SEO: ${result.seo}/100`);
      console.log("\n📈 Core Web Vitals:");
      console.log(`LCP: ${result.metrics.lcp?.toFixed(2)}ms`);
      console.log(`FCP: ${result.metrics.fcp?.toFixed(2)}ms`);
      console.log(`CLS: ${result.metrics.cls?.toFixed(3)}`);
      console.log(`Speed Index: ${result.metrics.speedIndex?.toFixed(2)}ms`);

      // Exit with error if scores are too low
      if (result.performance < 90 || result.seo < 90) {
        console.error("\n❌ Scores below threshold!");
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("❌ Audit failed:", error);
      process.exit(1);
    });
}
