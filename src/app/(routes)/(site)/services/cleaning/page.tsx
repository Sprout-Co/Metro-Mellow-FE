import React from "react";
import { Metadata } from "next";
import CleaningPageClient from "./_components/CleaningPageClient/CleaningPageClient";
import {
  StructuredData,
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Cleaning Service in Lagos | Professional House & Office Cleaning | Metromellow",
  description:
    "Expert cleaning service in Lagos. Professional house and office cleaners deliver spotless results using eco-friendly products. Same-day service available across all major areas of Lagos State.",
  keywords:
    "cleaning service in lagos, cleaning services Lagos, house cleaning Lagos, office cleaning Lagos, deep cleaning Lagos, eco-friendly cleaning, professional cleaners Lagos, same day cleaning service Lagos, Metromellow cleaning",
  alternates: {
    canonical: "https://metromellow.com/services/cleaning",
  },
  openGraph: {
    title:
      "Cleaning Service in Lagos | Professional House & Office Cleaning | Metromellow",
    description:
      "Expert cleaning service in Lagos. Professional cleaners deliver spotless results with eco-friendly products. Serving all major areas across Lagos State.",
    url: "https://metromellow.com/services/cleaning",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/cleaning/c3.jpeg",
        width: 1200,
        height: 630,
        alt: "Professional cleaning service in Lagos by Metromellow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning Service in Lagos | Metromellow",
    description:
      "Expert cleaning service in Lagos. Professional house and office cleaners with eco-friendly products. Same-day service available.",
    images: ["/images/cleaning/c3.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Enable Incremental Static Regeneration (ISR) for optimal SEO
// This page will be statically generated at build time and regenerated every hour
// This provides the best of both worlds: fast static performance + fresh content
export const revalidate = 3600; // Revalidate every hour (3600 seconds)

export default function CleaningPage() {
  // Define service schema data for cleaning service
  const cleaningServiceData = {
    name: "Cleaning Service in Lagos",
    description:
      "Expert cleaning service in Lagos for homes and offices throughout Lagos State. Our trained professionals use quality equipment and eco-friendly products to ensure a thorough clean. Serving all major areas across Lagos.",
    url: "https://metromellow.com/services/cleaning",
    image: "https://metromellow.com/images/cleaning/c3.jpeg",
    serviceOutput: "Clean, sanitized living and working spaces",
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
  const cleaningFAQs = [
    {
      question: "Do you bring your own cleaning supplies?",
      answer:
        "Yes, our team arrives fully equipped with professional-grade, eco-friendly products for all cleaning service jobs throughout Lagos. We provide everything needed for your cleaning service in Lagos.",
    },
    {
      question: "Can I request green cleaning?",
      answer:
        "Absolutely! We offer green cleaning options for all cleaning services in Lagos at no extra charge, using environmentally friendly products that are safe for your family and pets.",
    },
    {
      question: "Are your cleaners background checked?",
      answer:
        "All our staff undergo thorough background checks and training for your peace of mind. Our professional cleaners in Lagos are reliable, professional, and committed to providing excellent cleaning service.",
    },
    {
      question: "What areas of Lagos do you service?",
      answer:
        "We provide professional cleaning service in Lagos throughout Lagos State. Our cleaning service covers all major areas across Lagos, ensuring comprehensive coverage for homes and businesses.",
    },
    {
      question: "What if I'm not satisfied with the cleaning?",
      answer:
        "Contact us within 24 hours and we'll re-clean the area at no extra cost. Our satisfaction guarantee ensures you'll be happy with our cleaning service in Lagos.",
    },
    {
      question: "How quickly can I book a cleaning service in Lagos?",
      answer:
        "You can book our cleaning service in Lagos for same-day or schedule in advance. We offer flexible scheduling to meet your needs across all areas of Lagos State.",
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
            "Metromellow provides professional cleaning service in Lagos throughout Lagos State, with trained and vetted cleaning professionals using eco-friendly products. Serving all major areas across Lagos.",
        })}
      />

      <main>
        <CleaningPageClient />
      </main>
    </>
  );
}
