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
    "Professional Home Services in Lagos | Cleaning, Laundry & Meal Delivery | Metro Mellow",
  description:
    "Top-rated cleaning, laundry, cooking & pest control services in Lagos. Save time with Metro Mellow's trusted home services. Book online today & enjoy same-day service!",
  keywords:
    "home services Lagos, cleaning services, laundry service, meal prep, pest control, house cleaning Lagos, food delivery Lagos, Metro Mellow",
  alternates: {
    canonical: "https://metromellow.com",
  },
  openGraph: {
    title: "Professional Home Services in Lagos | Metro Mellow",
    description:
      "Top-rated cleaning, laundry & meal delivery services in Lagos. Book trusted professionals today!",
    url: "https://metromellow.com",
    siteName: "Metro Mellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/brand/brand-logo/solid-bg/green-bg.png",
        width: 1200,
        height: 630,
        alt: "Metro Mellow - Professional Home Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Home Services in Lagos | Metro Mellow",
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

export default function Home() {
  const faqItems: FAQItem[] = [
    {
      id: "1",
      question: "How do I book a service?",
      answer:
        "You can book a service by clicking the 'Book a service' button on the homepage.",
    },
    {
      id: "2",
      question: "How do I cancel a service?",
      answer:
        "You can cancel a service by clicking the 'Cancel a service' button on the homepage.",
    },

    {
      id: "3",
      question: "How do I track a service?",
      answer:
        "You can track a service by clicking the 'Track a service' button on the homepage.",
    },

    {
      id: "4",
      question: "How do I rate a service?",
      answer:
        "You can rate a service by clicking the 'Rate a service' button on the homepage.",
    },

    {
      id: "5",
      question: "How do I leave a review?",
      answer:
        "You can leave a review by clicking the 'Leave a review' button on the homepage.",
    },
  ];
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section - First impression */}
        <Hero />

        {/* Experience Section - Value proposition */}
        <ExperienceSection />

        {/* Services Gallery - Visual showcase */}
        <ServicesGallery />

        {/* Service Hero - Quick service overview */}
        <ServiceHero />

        {/* Chores Section - Service benefits */}
        <ChoresSection />

        {/* NEW: Tasks Carousel - Don't waste time section */}
        <TasksCarousel />

        {/* Service Catalog - Detailed services */}
        <ServiceCatalog />

        {/* Mobile App Promo - App benefits */}
        <MobileAppPromoSection />

        {/* To-Do to Ta-Da - Process explanation */}
        <ToDoToTaDaSection />

        {/* Testimonials - Social proof */}
        <TestimonialCarouselSection />

        <FAQSection faqs={faqItems} />
      </main>
      <Footer />
    </>
  );
}
