import React from "react";
import { Metadata } from "next";
import FoodPageClient from "./_components/FoodPageClient/FoodPageClient";
import { foodPageMetadata } from "./metadata";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
} from "@/utils/seoHelpers";

// Export metadata for Next.js
export const metadata: Metadata = foodPageMetadata;

// Enable Incremental Static Regeneration (ISR) for optimal SEO
// This page will be statically generated at build time and regenerated every hour
export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export default function FoodPage() {
  // Define service schema data for food service
  const foodServiceData = {
    name: "Meal Delivery Service in Lagos",
    description:
      "Professional chef-prepared meals delivered to your home or office in Lagos. Offering Nigerian cuisine and international dishes made with fresh local ingredients.",
    url: "https://metromellow.com/services/food",
    image: "https://metromellow.com/images/food/egusi-fufu.png",
    serviceOutput: "Freshly prepared meals delivered to your location",
    provider: {
      "@type": "LocalBusiness",
      name: "Metromellow",
      areaServed: {
        "@type": "State",
        name: "Lagos State",
      },
    },
  };

  // Define FAQs for this service page
  const foodFAQs = [
    {
      question: "Are your meals freshly prepared?",
      answer:
        "Yes! All our meals are cooked fresh daily by professional chefs and delivered hot to your door.",
    },
    {
      question: "Can I customize my order for dietary needs?",
      answer:
        "Absolutely. You can specify allergies, preferences, or dietary restrictions during checkout.",
    },
    {
      question: "How do I track my food delivery?",
      answer:
        "You'll receive real-time updates and can track your order status in your account dashboard.",
    },
    {
      question: "What areas of Lagos do you deliver to?",
      answer:
        "We deliver to all major areas in Lagos including Ikeja, Victoria Island, Lekki, Surulere, and surrounding neighborhoods.",
    },
  ];

  // Define breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Services", url: "https://metromellow.com/services" },
    { name: "Food Delivery", url: "https://metromellow.com/services/food" },
  ];

  return (
    <>
      {/* Add structured data */}
      <StructuredData
        type="Service"
        data={createServiceSchema(foodServiceData)}
      />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData type="FAQPage" data={createFAQSchema(foodFAQs)} />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          description:
            "Metromellow provides professional meal delivery services throughout Lagos, with fresh, chef-prepared meals delivered to your door.",
        })}
      />

      <main>
        <FoodPageClient />
      </main>
    </>
  );
}
