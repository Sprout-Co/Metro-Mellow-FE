// app/booking/page.tsx
import { Metadata } from "next";
import BookingHero from "./_components/BookingHero/BookingHero";
import SubscriptionModule from "./_components/SubscriptionModule/SubscriptionModule";
import SubscriptionBuilder from "../../(app)/dashboard/subscriptions/add/_components/SubscriptionBuilder/SubscriptionBuilder";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
} from "@/utils/seoHelpers";

export const metadata: Metadata = {
  title:
    "Home Service Subscriptions in Lagos | Save with Monthly Plans | Metromellow",
  description:
    "Subscribe to regular home services in Lagos and save. Flexible monthly plans for cleaning, laundry, cooking, and pest control with discounted rates and priority scheduling.",
  keywords:
    "home service subscriptions Lagos, monthly cleaning plan, recurring services, discount home services, Metromellow subscription, service package Lagos",
  alternates: {
    canonical: "https://metromellow.com/subscriptions",
  },
  openGraph: {
    title: "Home Service Subscriptions in Lagos | Metromellow",
    description:
      "Subscribe to regular home services and save. Flexible monthly plans with discounted rates and priority scheduling.",
    url: "https://metromellow.com/subscriptions",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow Home Service Subscriptions",
      },
    ],
  },
};

export default function BookingPage() {
  // Define subscription offer schema
  const subscriptionOfferSchema = {
    "@type": "Offer",
    name: "Home Services Subscription Plans",
    description:
      "Regular home service subscriptions with priority scheduling and discounted rates throughout Lagos",
    url: "https://metromellow.com/subscriptions",
    availability: "https://schema.org/InStock",
    areaServed: {
      "@type": "State",
      name: "Lagos State",
    },
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "20000",
      priceCurrency: "NGN",
      validFrom: "2023-01-01",
    },
    seller: {
      "@type": "LocalBusiness",
      name: "Metromellow",
      url: "https://metromellow.com",
    },
  };

  // Define breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Subscriptions", url: "https://metromellow.com/subscriptions" },
  ];

  return (
    <>
      {/* Add structured data */}
      <StructuredData type="Offer" data={subscriptionOfferSchema} />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          description:
            "Metromellow offers flexible home service subscription plans throughout Lagos, providing regular cleaning, laundry, cooking, and pest control at discounted rates.",
        })}
      />

      <main className="booking-page">
        <SubscriptionBuilder />
        {/* <BookingHero />
        <SubscriptionModule /> */}
      </main>
    </>
  );
}
