import React from "react";
import { Metadata } from "next";
import PestControlPageClient from "./_components/PestControlPageClient/PestControlPageClient";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  createServiceSchema,
} from "@/utils/seoHelpers";

export const metadata: Metadata = {
  title:
    "Pest Control Services in Lagos | Safe & Effective Solutions | Metromellow",
  description:
    "Professional pest control services in Lagos. Our expert technicians use eco-friendly, family-safe treatments to eliminate pests. Same-day service available throughout Lagos.",
  keywords:
    "pest control Lagos, extermination services, bed bug treatment, mosquito control, rodent control Lagos, safe pest control, Metromellow pest services",
  alternates: {
    canonical: "https://metromellow.com/services/pest-control",
  },
  openGraph: {
    title: "Professional Pest Control Services in Lagos | Metromellow",
    description:
      "Safe and effective pest elimination services throughout Lagos. Family-safe and eco-friendly solutions for all pest problems.",
    url: "https://metromellow.com/services/pest-control",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/pest-control/p1.jpeg",
        width: 1200,
        height: 630,
        alt: "Professional pest control services by Metromellow",
      },
    ],
  },
};

export default function PestControlPage() {
  // Define service schema data for pest control service
  const pestControlServiceData = {
    name: "Pest Control Services in Lagos",
    description:
      "Professional pest elimination services throughout Lagos. Our trained technicians use eco-friendly, family-safe treatments for all types of pest problems.",
    url: "https://metromellow.com/services/pest-control",
    image: "https://metromellow.com/images/pest-control/p1.jpeg",
    serviceOutput: "Pest-free homes and businesses",
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
  const pestControlFAQs = [
    {
      question: "Are your pest control treatments safe for children and pets?",
      answer:
        "Yes! We use eco-friendly, pet-safe, and family-safe products for all treatments in Lagos homes and businesses. Our priority is eliminating pests without compromising your family's safety.",
    },
    {
      question: "How quickly can you respond to pest emergencies in Lagos?",
      answer:
        "We offer same-day or next-day service for pest emergencies throughout Lagos. Our technicians can quickly respond to urgent situations like rodent infestations or dangerous insects.",
    },
    {
      question: "What areas of Lagos do you service for pest control?",
      answer:
        "We provide pest control services throughout Lagos State including Ikeja, Victoria Island, Lekki, Surulere, and surrounding neighborhoods. Our coverage area includes all residential and commercial properties in Lagos.",
    },
    {
      question: "What types of pests do you treat?",
      answer:
        "We treat a comprehensive range of pests including ants, cockroaches, rodents, termites, mosquitoes, bed bugs, flies, spiders, and more. Our technicians are trained to handle all common pests in Lagos.",
    },
    {
      question: "Do you offer ongoing pest prevention plans?",
      answer:
        "Yes, we offer customized prevention plans with regular treatments to keep your property pest-free year-round. These plans are specially designed for Lagos' climate and common pest issues.",
    },
  ];

  // Define breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Services", url: "https://metromellow.com/services" },
    {
      name: "Pest Control",
      url: "https://metromellow.com/services/pest-control",
    },
  ];

  return (
    <>
      {/* Add structured data */}
      <StructuredData
        type="Service"
        data={createServiceSchema(pestControlServiceData)}
      />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData type="FAQPage" data={createFAQSchema(pestControlFAQs)} />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          description:
            "Metromellow provides safe and effective pest control services throughout Lagos, with eco-friendly treatments and same-day service for pest emergencies.",
        })}
      />

      <main>
        <PestControlPageClient />
      </main>
    </>
  );
}
