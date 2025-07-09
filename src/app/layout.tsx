import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import "@/styles/main.scss";
import ApolloWrapper from "@/components/providers/ApolloWrapper";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { AuthInitializer } from "@/components/providers/AuthInitializer";
import ModalProvider from "./_components/ModalProvider";

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
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
