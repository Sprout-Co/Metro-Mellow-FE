import React from "react";
import MetroEatsNav from "./_components/MetroEatsNav/MetroEatsNav";
import HeroSection from "./_components/HeroSection/HeroSection";
import QuickOrder from "./_components/QuickOrder/QuickOrder";
import ChooseStyle from "./_components/ChooseStyle/ChooseStyle";
import SubscribeBanner from "./_components/SubscribeBanner/SubscribeBanner";
import MetroEatsFooter from "./_components/MetroEatsFooter/MetroEatsFooter";
import styles from "./metroeats.module.scss";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "@id": "https://metromellow.com/metroeats",
  name: "MetroEats",
  description:
    "Fresh meal subscription and delivery service in Lagos. Plates, Buckets, and Subscriptions. We cook, we deliver.",
  url: "https://metromellow.com/metroeats",
  logo: "https://metromellow.com/brand/metroeats/brand-logo/white-on-yellow.png",
  servesCuisine: ["Nigerian", "International", "Healthy"],
  priceRange: "₦₦-₦₦₦",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lekki",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  areaServed: [
    { "@type": "City", name: "Lekki" },
    { "@type": "Place", name: "Victoria Island" },
  ],
};

export default function MetroEatsPage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* <MetroEatsNav /> */}
      <main>
        <HeroSection />
        <QuickOrder />
        <ChooseStyle />
        <SubscribeBanner />
      </main>
      {/* <MetroEatsFooter /> */}
    </div>
  );
}
