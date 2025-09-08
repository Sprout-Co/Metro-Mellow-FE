import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: "Metromellow",
  description: "Your one-stop-shop for all!",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {process.env.MAINTENANCE_MODE === "true" ? null : <Navbar />}

      {children}
      {process.env.MAINTENANCE_MODE === "true" ? null : <Footer />}
    </>
  );
}
