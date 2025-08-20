# Google Tag Manager Integration

This component provides Google Tag Manager (GTM) integration for the Metro Mellow application.

## Setup

1. **Environment Variable**: Add your GTM ID to your environment variables:

   ```bash
   NEXT_PUBLIC_GTM_ID=GTM-MKLFNGFF
   ```

2. **Integration**: The GTM script is automatically included in the root layout (`src/app/layout.tsx`).

## Components

### GoogleTagManagerScript

- Renders the GTM script in the `<head>` section
- Uses Next.js `Script` component with `afterInteractive` strategy for optimal loading

### GoogleTagManager

- Renders the noscript fallback in the `<body>` section
- Ensures tracking works even when JavaScript is disabled

## Usage

### Basic Event Tracking

```tsx
import { useGoogleTagManager } from "@/hooks/useGoogleTagManager";

function MyComponent() {
  const { trackButtonClick, trackPageView } = useGoogleTagManager();

  const handleButtonClick = () => {
    trackButtonClick("cta_button", "/home");
    // Your button logic here
  };

  useEffect(() => {
    trackPageView("/home");
  }, []);

  return <button onClick={handleButtonClick}>Click Me</button>;
}
```

### Custom Events

```tsx
import { useGoogleTagManager } from "@/hooks/useGoogleTagManager";

function MyComponent() {
  const { pushEvent } = useGoogleTagManager();

  const handleCustomEvent = () => {
    pushEvent("custom_event", {
      category: "engagement",
      action: "video_play",
      label: "hero_video",
      value: 1,
    });
  };

  return <video onPlay={handleCustomEvent}>{/* video content */}</video>;
}
```

## Available Tracking Methods

- `trackPageView(page: string)` - Track page views
- `trackButtonClick(buttonName: string, page?: string)` - Track button clicks
- `trackFormSubmission(formName: string, page?: string)` - Track form submissions
- `trackPurchase(value: number, currency?: string, items?: any[])` - Track purchases
- `pushEvent(event: string, data?: Record<string, any>)` - Push custom events

## GTM Configuration

In your Google Tag Manager dashboard:

1. Create triggers for the custom events
2. Set up tags to send data to Google Analytics, Facebook Pixel, etc.
3. Configure variables to capture the event data

## Testing

1. Use the GTM Preview mode to test events
2. Check the browser console for `dataLayer` entries
3. Verify events appear in your analytics platforms
