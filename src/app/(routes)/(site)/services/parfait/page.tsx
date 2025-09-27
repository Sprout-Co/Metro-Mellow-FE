import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ParfaitHero from "./_components/ParfaitHero/ParfaitHero";
import ParfaitMenu from "./_components/ParfaitMenu/ParfaitMenu";
import ParfaitBuilder from "./_components/ParfaitBuilder/ParfaitBuilder";
import ParfaitTestimonials from "./_components/ParfaitTestimonials/ParfaitTestimonials";
import ParfaitCTA from "./_components/ParfaitCTA/ParfaitCTA";

export const metadata: Metadata = {
  title: "Build Your Perfect Parfait | Fresh & Customizable | Metromellow",
  description:
    "Create your dream parfait with fresh ingredients, artisanal yogurt, and delightful toppings. Customize, order, and enjoy healthy parfaits delivered to your door in Lagos.",
  keywords:
    "parfait, custom parfait, yogurt parfait, healthy breakfast, parfait delivery Lagos, fresh fruits, granola, parfait builder, Metromellow",
  openGraph: {
    title: "Build Your Perfect Parfait | Metromellow",
    description:
      "Layer by layer, create your dream parfait with fresh ingredients delivered right to your door",
    images: ["/images/parfait/parfait-hero.jpg"],
  },
};

export default function ParfaitPage() {
  return (
    <>
      <main>
        <ParfaitHero />
        <ParfaitMenu />
        <ParfaitBuilder />
        <ParfaitTestimonials />
        <ParfaitCTA />
      </main>
    </>
  );
}
