// src/app/page.tsx
import React from "react";
import Hero from "./_components/Hero/Hero";
import ServicesGallery from "./_components/ServicesGallery/ServicesGallery";
import ServiceHero from "./_components/ServicesList/ServiceHero";
import ExperienceSection from "./_components/ExperienceSection/ExperienceSection";
import ChoresSection from "./_components/ChoresSection/ChoresSection";
import TasksCarousel from "./_components/TasksCarousel/TasksCarousel";
import ServiceCatalog from "./_components/ServiceCatalog/ServiceCatalog";
import MobileAppPromoSection from "./_components/MobileAppPromoSection/MobileAppPromoSection";
import ToDoToTaDaSection from "./_components/ToDoToTaDaSection/ToDoToTaDaSection";
import TestimonialCarouselSection from "./_components/TestimonialCarouselSection/TestimonialCarouselSection";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection/FAQSection";

export const metadata = {
  title:
    "Professional Home Services in Lagos | Cleaning, Laundry & Meal Delivery | Metromellow",
  description:
    "Top-rated cleaning, laundry, cooking & pest control services in Lagos. Save time with Metromellow's trusted home services. Book online today & enjoy same-day service!",
  keywords:
    "home services Lagos, cleaning services, laundry service, meal prep, pest control, house cleaning Lagos, food delivery Lagos, Metromellow",
  alternates: {
    canonical: "https://metromellow.com",
  },
  openGraph: {
    title: "Professional Home Services in Lagos | Metromellow",
    description:
      "Top-rated cleaning, laundry & meal delivery services in Lagos. Book trusted professionals today!",
    url: "https://metromellow.com",
    siteName: "Metromellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metromellow - Professional Home Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Home Services in Lagos | Metromellow",
    description:
      "Top-rated cleaning, laundry & meal delivery services in Lagos. Book trusted professionals today!",
    images: ["/images/brand/brand-logo/solid-bg/green-bg.png"],
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

// JSON-LD structured data for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://metromellow.com",
  name: "Metromellow",
  description:
    "Top-rated home services in Lagos including cleaning, laundry, cooking, and pest control.",
  url: "https://metromellow.com",
  logo: "https://metromellow.com/images/brand/brand-logo/solid-bg/green-bg.png",
  image:
    "https://metromellow.com/images/brand/brand-logo/solid-bg/green-bg.png",
  telephone: "+2349068249871", // Replace with actual phone
  email: "team@metromellow.com", // Replace with actual email
  address: {
    "@type": "PostalAddress",
    streetAddress: "anike ologuntoye avenue", // Replace with actual street address
    addressLocality: "Lagos",
    addressRegion: "Lagos",
    postalCode: "102213", // Replace with actual postal code
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.5244, // Central Lagos coordinates
    longitude: 3.3792, // Central Lagos coordinates
  },
  // Define service area for the entire Lagos state
  areaServed: {
    "@type": "State",
    name: "Lagos State",
    sameAs: "https://en.wikipedia.org/wiki/Lagos_State",
  },
  // Specify service coverage explicitly
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 6.5244,
      longitude: 3.3792,
    },
    geoRadius: "50000", // 50km radius to cover all of Lagos State
  },
  priceRange: "₦₦-₦₦₦₦",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/metromellowhq",
    "https://www.instagram.com/metromellowhq",
    "https://x.com/metromellowhq",
    "https://www.youtube.com/@metromellowhq",
  ],
  // Service offerings schema
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cleaning Services",
          description:
            "Professional home and office cleaning services in Lagos.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Laundry Services",
          description: "Comprehensive laundry and dry cleaning services.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Meal Preparation",
          description: "Delicious meal preparation and delivery services.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pest Control",
          description:
            "Effective and safe pest control services for homes and businesses.",
        },
      },
    ],
  },
  // Aggregate rating schema
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
  },
};

export default function Home() {
  const faqItems: FAQItem[] = [
    {
      id: "1",
      question: "How do I book home cleaning services in Lagos?",
      answer:
        "You can book our professional home cleaning services in Lagos by clicking the 'Book a Service' button on our website or by calling us directly. We offer same-day service for many neighborhoods across Lagos.",
    },
    {
      id: "2",
      question: "What laundry and dry cleaning services do you offer?",
      answer:
        "Our comprehensive laundry services include wash & fold, dry cleaning, ironing, stain removal, and garment repairs. We pick up and deliver throughout Lagos, with eco-friendly options available.",
    },
    {
      id: "3",
      question: "Do you offer meal preparation and food delivery in Lagos?",
      answer:
        "Yes, our professional chefs prepare delicious meals with local and international cuisine options. We offer meal plans, one-time cooking services, and food delivery throughout Lagos with customizable dietary options.",
    },
    {
      id: "4",
      question: "How quickly can you respond to pest control emergencies?",
      answer:
        "Our pest control experts can respond to emergencies within 24 hours in most Lagos neighborhoods. We use safe, effective treatments for all types of pest issues and offer prevention plans to keep your home pest-free.",
    },
    {
      id: "5",
      question: "Do you offer home service subscriptions or packages?",
      answer:
        "Yes, we offer flexible subscription plans that combine our cleaning, laundry, cooking, and pest control services at discounted rates. Our packages can be customized to your specific needs and schedule in Lagos.",
    },
  ];
  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <main>
        {/* Hero Section - First impression */}
        <section
          id="home-services-lagos"
          aria-label="Professional Home Services in Lagos"
        >
          <Hero />
        </section>

        {/* Experience Section - Value proposition */}
        <section id="why-choose-us" aria-label="Why Choose Metromellow">
          <ExperienceSection />
        </section>

        {/* Services Gallery - Visual showcase */}
        <section id="services-gallery" aria-label="Our Services Gallery">
          <ServicesGallery />
        </section>

        {/* Service Hero - Quick service overview */}
        <section
          id="home-services-overview"
          aria-label="Home Services Overview"
        >
          <ServiceHero />
        </section>

        {/* Chores Section - Service benefits */}
        <section
          id="house-cleaning-services"
          aria-label="Professional Cleaning Services"
        >
          <ChoresSection />
        </section>

        {/* Tasks Carousel - Don't waste time section */}
        <section
          id="household-tasks"
          aria-label="Let Us Handle Your Household Tasks"
        >
          <TasksCarousel />
        </section>

        {/* Service Catalog - Detailed services */}
        <section
          id="lagos-services-catalog"
          aria-label="Lagos Home Services Catalog"
        >
          <ServiceCatalog />
        </section>

        {/* Mobile App Promo - App benefits */}
        <section id="mobile-app-booking" aria-label="Book Services On The Go">
          <MobileAppPromoSection />
        </section>

        {/* To-Do to Ta-Da - Process explanation */}
        <section id="how-it-works" aria-label="How Metromellow Works">
          <ToDoToTaDaSection />
        </section>

        {/* Testimonials - Social proof */}
        <section id="customer-reviews" aria-label="Customer Reviews">
          <TestimonialCarouselSection />
        </section>

        {/* FAQ Section with structured data */}
        <section id="home-services-faq" aria-label="Frequently Asked Questions">
          <FAQSection faqs={faqItems} />
        </section>
      </main>
      <Footer />
    </>
  );
}
