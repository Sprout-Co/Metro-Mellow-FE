import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "MetroEats | Fresh Meal Subscriptions Delivered to Your Door in Lagos",
  description:
    "Subscribe to delicious meal plans in Lagos. Choose from Everyday, Swallow, or Fit-Fam lines. We cook, we deliver. Serving Lekki and Island areas.",
  keywords:
    "meal subscription Lagos, food delivery Lagos, meal plans Nigeria, Lekki food delivery, Island meal service, fresh meals Lagos, Nigerian food delivery, meal prep Lagos",
  alternates: {
    canonical: "https://metromellow.com/metroeats",
  },
  openGraph: {
    title: "MetroEats | Fresh Meal Subscriptions in Lagos",
    description:
      "Subscribe to delicious meal plans. We cook, we deliver. Everyday, Swallow, and Fit-Fam lines available for Lekki and Island.",
    url: "https://metromellow.com/metroeats",
    siteName: "MetroEats",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/metroeats/brand-logo/white-on-yellow.png",
        width: 1200,
        height: 630,
        alt: "MetroEats - Fresh Meal Subscriptions in Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MetroEats | Fresh Meal Subscriptions in Lagos",
    description:
      "Subscribe to delicious meal plans. We cook, we deliver. Serving Lekki and Island areas.",
    images: ["/images/metroeats/brand-logo/white-on-yellow.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MetroEats",
  },
  icons: {
    icon: [
      { url: "/images/metroeats/brand-logo/white-on-yellow.png", sizes: "any" },
    ],
    apple: [
      {
        url: "/images/metroeats/brand-logo/white-on-yellow.png",
        sizes: "180x180",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffcc00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

import MetroEatsCartProvider from "./metroeats/_components/MetroEatsCartProvider/MetroEatsCartProvider";

/**
 * MetroEats Layout
 * Standalone layout for the MetroEats brand - no main site Navbar/Footer.
 * The page components include their own branded nav and footer.
 */
export default function MetroEatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MetroEatsCartProvider>{children}</MetroEatsCartProvider>;
}
