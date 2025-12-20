"use client";

import React from "react";
import LaundryHero from "../../LaundryHero/LaundryHero";
import LaundryFeatures from "../../LaundryFeatures/LaundryFeatures";
import LaundrySuds from "../../LaundrySuds/LaundrySuds";
import LaundryServicesShowcase from "../../LaundryServicesShowcase/LaundryServicesShowcase";
import LaundryPlan from "../../LaundryPlan/LaundryPlan";
import LaundryStepsSection from "../../LaundryStepsSection/LaundryStepsSection";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection/FAQSection";
import { ServiceCategory, ServiceStatus } from "@/graphql/api";
import { useGetServices } from "@/graphql/hooks/services/useServiceOperations";
import ServiceInternalLinks from "@/components/common/ServiceInternalLinks/ServiceInternalLinks";
import { allServices } from "@/constants/services";

const laundryFaqs: FAQItem[] = [
  {
    id: "l1",
    question: "Do you offer same-day laundry service?",
    answer:
      "Yes, we offer same-day service for most orders placed before noon.",
  },
  {
    id: "l2",
    question: "Are my clothes washed separately?",
    answer:
      "Absolutely. We never mix your laundry with anyone else's for hygiene and care.",
  },
  {
    id: "l3",
    question: "Can you remove tough stains?",
    answer:
      "Our experts use advanced techniques to tackle even the toughest stains. Results may vary by fabric.",
  },
  {
    id: "l4",
    question: "What detergents do you use?",
    answer:
      "We use premium, eco-friendly detergents safe for sensitive skin and the environment.",
  },
  {
    id: "l5",
    question: "How do I schedule a pickup?",
    answer: "Simply book online or call us. We'll handle the rest!",
  },
];

const LaundryPageClient: React.FC = () => {
  const {
    data: servicesData,
    loading,
    error,
  } = useGetServices({
    category: ServiceCategory.Laundry,
    status: ServiceStatus.Active,
  });

  console.log(servicesData);

  return (
    <>
      <LaundryHero />
      <LaundryServicesShowcase
        servicesData={servicesData?.services}
        loading={loading}
        error={error}
      />
      <LaundryFeatures />
      <LaundrySuds />
      <LaundryStepsSection />
      <LaundryPlan />
      <FAQSection faqs={laundryFaqs} />
      <ServiceInternalLinks
        currentService="/services/laundry"
        services={allServices}
      />
    </>
  );
};

export default LaundryPageClient;
