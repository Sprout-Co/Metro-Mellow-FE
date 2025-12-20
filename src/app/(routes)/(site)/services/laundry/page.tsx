import React from "react";
import { Metadata } from "next";
import LaundryPageClient from "./_components/LaundryPageClient/LaundryPageClient";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
} from "@/utils/seoHelpers";

export const metadata: Metadata = {
  title:
    "Laundry & Dry Cleaning Services in Lagos | Same-Day Pickup | Metromellow",
  description:
    "Professional laundry and dry cleaning services in Lagos with free pickup and delivery. Expert garment care, eco-friendly options and affordable pricing. Schedule today!",
  keywords:
    "laundry services Lagos, dry cleaning, wash and fold, ironing service, garment care Lagos, Metromellow laundry, pickup laundry service",
  alternates: {
    canonical: "https://metromellow.com/services/laundry",
  },
  openGraph: {
    title: "Laundry & Dry Cleaning Services in Lagos | Metromellow",
    description:
      "Professional laundry services with free pickup and delivery throughout Lagos. Expert garment care and eco-friendly options available.",
    url: "https://metromellow.com/services/laundry",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/laundry/dry-cleaning.jpg",
        width: 1200,
        height: 630,
        alt: "Professional laundry services by Metromellow",
      },
    ],
  },
};

// Enable Incremental Static Regeneration (ISR) for optimal SEO
// This page will be statically generated at build time and regenerated every hour
export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export default function LaundryPage() {
  // Define service schema data for laundry service
  const laundryServiceData = {
    name: "Laundry & Dry Cleaning Services in Lagos",
    description:
      "Professional laundry and dry cleaning services with pickup and delivery throughout Lagos. Our experts provide premium garment care with eco-friendly options.",
    url: "https://metromellow.com/services/laundry",
    image: "https://metromellow.com/images/laundry/dry-cleaning.jpg",
    serviceOutput: "Clean, professionally laundered and pressed garments",
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
  const laundryFAQs = [
    {
      question: "Do you offer same-day laundry service in Lagos?",
      answer:
        "Yes, we offer same-day service for most orders placed before noon in Lagos. Our efficient team ensures your laundry is cleaned and returned promptly.",
    },
    {
      question: "Are my clothes washed separately from other customers?",
      answer:
        "Absolutely. We never mix your laundry with anyone else's for hygiene and care. Each customer's laundry is processed individually.",
    },
    {
      question: "What areas in Lagos do you provide pickup and delivery?",
      answer:
        "We provide free pickup and delivery throughout Lagos State including Ikeja, Victoria Island, Lekki, Surulere, and surrounding neighborhoods.",
    },
    {
      question: "Can you remove tough stains from garments?",
      answer:
        "Our experts use advanced techniques to tackle even the toughest stains. We have specialized treatments for different types of stains and fabrics.",
    },
    {
      question: "What detergents do you use for laundry?",
      answer:
        "We use premium, eco-friendly detergents safe for sensitive skin and the environment. We can also accommodate special requests for hypoallergenic products.",
    },
  ];

  // Define breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Services", url: "https://metromellow.com/services" },
    { name: "Laundry", url: "https://metromellow.com/services/laundry" },
  ];

  return (
    <>
      {/* Add structured data */}
      <StructuredData
        type="Service"
        data={createServiceSchema(laundryServiceData)}
      />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData type="FAQPage" data={createFAQSchema(laundryFAQs)} />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          description:
            "Metromellow provides professional laundry and dry cleaning services throughout Lagos, with free pickup and delivery and eco-friendly cleaning options.",
        })}
      />

      <main>
        <LaundryPageClient />
      </main>
    </>
  );
}
