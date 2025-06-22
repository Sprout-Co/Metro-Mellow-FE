import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import "@/styles/main.scss";
import ApolloWrapper from "@/components/providers/ApolloWrapper";
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
  title: "Metro Mellow",
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
      >
        <ApolloWrapper>
          <AuthInitializer>
            {children}
            {/* <ModalProvider /> */}
          </AuthInitializer>
        </ApolloWrapper>
      </body>
    </html>
  );
}
