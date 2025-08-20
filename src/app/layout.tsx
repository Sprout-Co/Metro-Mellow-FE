import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { baloo2, montserrat } from "@/lib/fonts";
import "./globals.scss";
import "@/styles/main.scss";
import ApolloWrapper from "@/components/providers/ApolloWrapper";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { AuthInitializer } from "@/components/providers/AuthInitializer";
import ModalProvider from "./_components/ModalProvider";
import {
  GoogleTagManagerScript,
  GoogleTagManager,
} from "@/components/common/GoogleTagManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metromellow",
  description: "Your one-stop-shop for all!",
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
              {children}
              {/* <ModalProvider /> */}
            </AuthInitializer>
          </ApolloWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
