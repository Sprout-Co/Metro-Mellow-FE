import { useCallback } from "react";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const isProduction = () => {
  // Only track in actual production, not staging/preview/development
  // Check custom env var or NEXT_PUBLIC_ENV for client-side checks
  const env =
    process.env.NEXT_PUBLIC_APP_ENV || process.env.NEXT_PUBLIC_ENV || "";
  return env === "production" && process.env.NODE_ENV !== "development";
};

export const useGoogleTagManager = () => {
  const pushEvent = useCallback((event: string, data?: Record<string, any>) => {
    if (!isProduction()) {
      return;
    }
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event,
        ...data,
      });
    }
  }, []);

  const trackPageView = useCallback(
    (page: string) => {
      pushEvent("page_view", { page });
    },
    [pushEvent]
  );

  const trackButtonClick = useCallback(
    (buttonName: string, page?: string) => {
      pushEvent("button_click", { button_name: buttonName, page });
    },
    [pushEvent]
  );

  const trackFormSubmission = useCallback(
    (formName: string, page?: string) => {
      pushEvent("form_submit", { form_name: formName, page });
    },
    [pushEvent]
  );

  const trackPurchase = useCallback(
    (value: number, currency: string = "USD", items?: any[]) => {
      pushEvent("purchase", { value, currency, items });
    },
    [pushEvent]
  );

  return {
    pushEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackPurchase,
  };
};

