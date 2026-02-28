import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MetroEats | Delicious Food, Delivered Fast",
  description:
    "Order your favorite fast food—burgers, pizza, chicken, and more—delivered to your doorstep in 30 minutes or less.",
};

/**
 * MetroEats uses its own layout: no main site Navbar or Footer.
 * The page renders its own brand nav and content.
 */
export default function MetroEatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
