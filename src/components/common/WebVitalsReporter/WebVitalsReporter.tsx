"use client";

import { useEffect } from "react";
import { reportWebVitals } from "@/lib/analytics/web-vitals";

/**
 * WebVitalsReporter Component
 *
 * This component initializes Web Vitals monitoring for Core Web Vitals metrics.
 * It tracks:
 * - LCP (Largest Contentful Paint): Loading performance
 * - INP (Interaction to Next Paint): Interactivity (replaces FID as of 2024)
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FCP (First Contentful Paint): Initial loading
 * - TTFB (Time to First Byte): Server response time
 *
 * Note: FID (First Input Delay) was deprecated in favor of INP (Interaction to Next Paint)
 * as the new Core Web Vital metric for interactivity.
 *
 * These metrics are crucial for SEO as Google uses them in ranking algorithms.
 */
export default function WebVitalsReporter() {
  useEffect(() => {
    // Initialize Web Vitals reporting
    reportWebVitals();
  }, []);

  // This component doesn't render anything
  return null;
}
