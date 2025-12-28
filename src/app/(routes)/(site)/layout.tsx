import type { Metadata } from "next";
import dynamic from "next/dynamic";

// Lazy load layout components for better initial page load performance
const Navbar = dynamic(() => import("@/components/layout/Navbar/Navbar"), {
  ssr: true, // Keep SSR for SEO
});
const Footer = dynamic(() => import("@/components/layout/Footer/Footer"), {
  ssr: true, // Keep SSR for SEO
});

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
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
