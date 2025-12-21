import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { baloo2, montserrat } from "@/lib/fonts";
import "./globals.scss";
import "@/styles/main.scss";
import ApolloWrapper from "@/components/providers/ApolloWrapper";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { AuthInitializer } from "@/components/providers/AuthInitializer";
import { NotificationProvider } from "@/components/providers/NotificationProvider";
import ModalProvider from "./_components/ModalProvider";
import {
  GoogleTagManagerScript,
  GoogleTagManager,
  WebVitalsReporter,
} from "@/lib/analytics";
import { CommonInitializer } from "@/components/providers/CommonProvider";
import FloatingButtons from "@/components/common/FloatingButtons/FloatingButtons";
import ChristmasPromoModal from "@/components/ui/ChristmasPromoModal/ChristmasPromoModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://metromellow.com"
  ),
  title: "Metromellow | Professional Home Services in Lagos, Nigeria",
  description:
    "Professional home services in Lagos including cleaning, laundry, cooking, and pest control. Tech-enabled solutions for modern Nigerian homes.",
  keywords:
    "home services Lagos, cleaning services lagos, laundry Lagos, meal preparation, pest control, domestic help Lagos, Metromellow",
  authors: [{ name: "Metromellow Team" }],
  creator: "Metromellow",
  publisher: "Metromellow",
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
  other: {
    "google-site-verification":
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "", //or just remove this since we already have the verification done in the google search console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MKLFNGFF";

  return (
    <html lang="en">
      <head>
        <GoogleTagManagerScript gtmId={gtmId} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Metromellow Blog RSS Feed"
          href="/blog/rss.xml"
        />
      </head>
      <body
        className={`${baloo2.variable} ${montserrat.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* Google Tag Manager (noscript) - placed immediately after opening body tag */}
        <GoogleTagManager gtmId={gtmId} />

        <ReduxProvider>
          <ApolloWrapper>
            <AuthInitializer>
              <NotificationProvider>
                <CommonInitializer>{children}</CommonInitializer>
                {/* <ModalProvider /> */}
                <FloatingButtons />
                <ChristmasPromoModal />
                <WebVitalsReporter />
              </NotificationProvider>
            </AuthInitializer>
          </ApolloWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
