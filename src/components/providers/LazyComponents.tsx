"use client";

import dynamic from "next/dynamic";

// Lazy load non-critical components for better initial page load performance
// These are wrapped in a client component to allow ssr: false
const FloatingButtons = dynamic(
  () => import("@/components/common/FloatingButtons/FloatingButtons"),
  { ssr: false } // Floating buttons don't need SSR
);

const WebVitalsReporter = dynamic(
  () =>
    import("@/lib/analytics").then((mod) => ({
      default: mod.WebVitalsReporter,
    })),
  { ssr: false } // Analytics don't need SSR
);

export default function LazyComponents() {
  return (
    <>
      <FloatingButtons />
      <WebVitalsReporter />
    </>
  );
}

