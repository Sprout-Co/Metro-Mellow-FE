/**
 * Analytics Library
 * 
 * Centralized analytics utilities, components, and hooks for Metromellow
 */

// Export Web Vitals
export { reportWebVitals } from "./web-vitals";

// Export components
export { default as WebVitalsReporter } from "./components/WebVitalsReporter";
export {
  default as GoogleTagManager,
  GoogleTagManagerScript,
} from "./components/GoogleTagManager";

// Export GTM hooks
export { useGoogleTagManager } from "./gtm";

