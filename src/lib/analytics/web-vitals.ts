"use client";

import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from "web-vitals";

type WebVitalsCallback = (metric: Metric) => void;

/**
 * Check if we're in production environment
 * Only send analytics in production, not in development/staging
 */
const isProduction = () => {
  // Only track in actual production, not staging/preview/development
  // Check client-side environment variables (VERCEL_ENV is server-side only)
  const env =
    process.env.NEXT_PUBLIC_APP_ENV || process.env.NEXT_PUBLIC_ENV || "";
  return env === "production" && process.env.NODE_ENV !== "development";
};

/**
 * Report Web Vitals to your analytics service
 * This function sends Core Web Vitals metrics to help monitor page performance
 *
 * IMPORTANT: Only sends data in production - development data is logged to console only
 */
function sendToAnalytics(metric: Metric) {
  if (typeof window === "undefined") return;

  const value = Math.round(
    metric.name === "CLS" ? metric.value * 1000 : metric.value
  );

  // Always log to console in development for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("[Web Vitals]", metric);
    return; // Don't send to analytics in development
  }

  // Only send to analytics in production
  if (!isProduction()) {
    console.log("[Web Vitals] (not in production, skipping analytics)", metric);
    return;
  }

  // Send to Google Tag Manager (dataLayer) - works with GTM
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: "web_vitals",
      web_vitals: {
        name: metric.name,
        value: value,
        id: metric.id,
        delta: metric.delta,
        rating: metric.rating,
      },
    });
  }

  // Send to Google Analytics 4 (if gtag is directly configured)
  if ((window as any).gtag) {
    (window as any).gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: value,
      non_interaction: true,
    });
  }

  // Send to Firebase Analytics (if configured)
  if ((window as any).firebase?.analytics) {
    (window as any).firebase.analytics().logEvent(metric.name, {
      value: value,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }
}

/**
 * Initialize Web Vitals monitoring
 * This tracks Core Web Vitals metrics for SEO and performance optimization
 *
 * Note: onFID (First Input Delay) was deprecated in web-vitals v4+ and replaced with onINP (Interaction to Next Paint)
 * Current Core Web Vitals (2024):
 * - LCP (Largest Contentful Paint): Loading performance
 * - INP (Interaction to Next Paint): Interactivity (replaces FID)
 * - CLS (Cumulative Layout Shift): Visual stability
 *
 * Additional metrics tracked:
 * - FCP (First Contentful Paint): Initial loading
 * - TTFB (Time to First Byte): Server response time
 */
export function reportWebVitals(onPerfEntry?: WebVitalsCallback) {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    // Use custom callback if provided
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry); // INP replaces FID as the interactivity metric
  } else {
    // Use default analytics reporting
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics); // INP replaces FID as the interactivity metric
  }
}
