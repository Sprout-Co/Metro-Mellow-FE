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
    "Metro Mellow - Professional Home Services | Cleaning, Laundry, Cooking & More",
  description:
    "Transform your daily routine with Metro Mellow's professional home services. From cleaning and laundry to meal delivery and pest control - we handle the chores while you enjoy life. Book trusted professionals in Lagos today!",
  keywords:
    "home services, cleaning services Lagos, laundry service, meal delivery, pest control, professional cleaners, Metro Mellow",
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
