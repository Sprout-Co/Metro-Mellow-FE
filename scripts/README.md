# Lighthouse Performance Auditing

This directory contains scripts for automated Lighthouse performance and SEO auditing using Chrome Launcher.

## Overview

Lighthouse is a tool that audits web pages for performance, accessibility, best practices, and SEO. These scripts allow you to programmatically run Lighthouse audits on your service pages to ensure they meet SEO and performance thresholds.

## Scripts

### `lighthouse-audit.ts`
Single page audit script. Audits a single URL and generates a detailed HTML report.

**Usage:**
```bash
# Audit a specific URL
npm run lighthouse http://localhost:3000/services/cleaning

# Audit with custom output path
npm run lighthouse http://localhost:3000/services/cleaning ./my-report.html

# Individual service pages
npm run lighthouse:cleaning
npm run lighthouse:laundry
npm run lighthouse:food
npm run lighthouse:pest-control
```

### `lighthouse-batch.ts`
Batch audit script. Audits all service pages and generates comprehensive reports.

**Usage:**
```bash
# Audit all service pages
npm run lighthouse:all

# For CI/CD (same as lighthouse:all)
npm run lighthouse:ci
```

**Environment Variables:**
- `BASE_URL`: Base URL for testing (default: `http://localhost:3000`)

```bash
BASE_URL=https://staging.metromellow.com npm run lighthouse:all
```

## Thresholds

The batch script enforces the following thresholds:

- **Performance**: ≥ 90
- **SEO**: ≥ 95
- **Accessibility**: ≥ 90
- **Best Practices**: ≥ 90

If any page falls below these thresholds, the script will exit with code 1, making it suitable for CI/CD integration.

## Output

Reports are saved to `./lighthouse-reports/` directory with timestamps:
- `cleaning-{timestamp}.html`
- `laundry-{timestamp}.html`
- `food-{timestamp}.html`
- `pest-control-{timestamp}.html`

Each report includes:
- Performance score and metrics
- SEO score and recommendations
- Accessibility audit results
- Best practices suggestions
- Core Web Vitals (LCP, CLS, FCP, etc.)

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Lighthouse CI

on:
  pull_request:
    paths:
      - 'src/app/(routes)/(site)/services/**'
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Start server
        run: npm start &
        env:
          PORT: 3000
      
      - name: Wait for server
        run: npx wait-on http://localhost:3000
      
      - name: Run Lighthouse audits
        run: npm run lighthouse:ci
        env:
          BASE_URL: http://localhost:3000
      
      - name: Upload reports
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: lighthouse-reports
          path: lighthouse-reports/
```

## Prerequisites

1. **Chrome/Chromium**: Chrome Launcher requires Chrome or Chromium to be installed
2. **Running Server**: The scripts need your Next.js server to be running (or use BASE_URL for remote)

## Troubleshooting

### Chrome not found
If you get errors about Chrome not being found:
- On macOS: Chrome should be auto-detected
- On Linux: Install Chromium: `sudo apt-get install chromium-browser`
- On CI: Use `chrome-launcher` with `--headless` flag (already configured)

### Port already in use
If port 3000 is already in use, change the BASE_URL:
```bash
BASE_URL=http://localhost:3001 npm run lighthouse:all
```

### Timeout errors
If audits timeout, increase the timeout in the script or check your server performance.

## Best Practices

1. **Run before deployment**: Always run `npm run lighthouse:all` before deploying
2. **Monitor trends**: Keep historical reports to track improvements
3. **Fix issues immediately**: Address any scores below thresholds
4. **Focus on SEO**: Since SEO is your priority, ensure SEO scores stay ≥ 95

## Integration with Web Vitals

This Lighthouse setup complements your existing Web Vitals monitoring:

- **Lighthouse**: Lab testing (synthetic, controlled environment)
- **Web Vitals**: Real User Monitoring (actual user experience)

Both are important for comprehensive performance monitoring!

