import React from "react";
import { Metadata } from "next";
import CleaningPageClient from "./_components/CleaningPageClient/CleaningPageClient";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
} from "@/utils/seoHelpers";

export const metadata: Metadata = {
  title:
    "Professional Cleaning Services in Lagos | Home & Office | Metro Mellow",
  description:
    "Expert house cleaning services in Lagos. Our professional cleaners deliver spotless results using eco-friendly products. Book same-day service for homes and offices.",
  keywords:
    "cleaning services Lagos, house cleaning, office cleaning, deep cleaning Lagos, eco-friendly cleaning, Metro Mellow cleaning, same day cleaning service",
  alternates: {
    canonical: "https://metromellow.com/services/cleaning",
  },
  openGraph: {
    title: "Professional Cleaning Services in Lagos | Metro Mellow",
    description:
      "Expert house cleaning services across Lagos. Our professional cleaners deliver spotless results with eco-friendly products.",
    url: "https://metromellow.com/services/cleaning",
    siteName: "Metro Mellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/cleaning/c3.jpeg",
        width: 1200,
        height: 630,
        alt: "Professional cleaning services by Metro Mellow",
      },
    ],
  },
};

export default function CleaningPage() {
  // Define service schema data for cleaning service
  const cleaningServiceData = {
    name: "Professional Cleaning Services in Lagos",
    description:
      "Expert cleaning services for homes and offices throughout Lagos. Our trained professionals use quality equipment and eco-friendly products to ensure a thorough clean.",
    url: "https://metromellow.com/services/cleaning",
    image: "https://metromellow.com/images/cleaning/c3.jpeg",
    serviceOutput: "Clean, sanitized living and working spaces",
    provider: {
      "@type": "LocalBusiness",
      name: "Metro Mellow",
      areaServed: {
        "@type": "State",
        name: "Lagos State",
      },
    },
  };

  // Define FAQs for this service page
  const cleaningFAQs = [
    {
      question: "Do you bring your own cleaning supplies?",
      answer:
        "Yes, our team arrives fully equipped with professional-grade, eco-friendly products for all cleaning jobs throughout Lagos.",
    },
    {
      question: "Can I request green cleaning?",
      answer:
        "Absolutely! We offer green cleaning options for all services at no extra charge, using environmentally friendly products that are safe for your family and pets.",
    },
    {
      question: "Are your cleaners background checked?",
      answer:
        "All our staff undergo thorough background checks and training for your peace of mind. Our cleaners are reliable, professional, and committed to providing excellent service.",
    },
    {
      question: "What areas of Lagos do you service?",
      answer:
        "We provide cleaning services throughout Lagos State including Ikeja, Victoria Island, Lekki, Surulere, and surrounding neighborhoods.",
    },
    {
      question: "What if I'm not satisfied with the cleaning?",
      answer:
        "Contact us within 24 hours and we'll re-clean the area at no extra cost. Our satisfaction guarantee ensures you'll be happy with our service.",
    },
  ];

  // Define breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Services", url: "https://metromellow.com/services" },
    { name: "Cleaning", url: "https://metromellow.com/services/cleaning" },
  ];

  return (
    <>
      {/* Add structured data */}
      <StructuredData
        type="Service"
        data={createServiceSchema(cleaningServiceData)}
      />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData type="FAQPage" data={createFAQSchema(cleaningFAQs)} />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          description:
            "Metro Mellow provides professional cleaning services throughout Lagos, with trained and vetted cleaning professionals using eco-friendly products.",
        })}
      />

      <main>
        <CleaningPageClient />
      </main>
    </>
  );
}
