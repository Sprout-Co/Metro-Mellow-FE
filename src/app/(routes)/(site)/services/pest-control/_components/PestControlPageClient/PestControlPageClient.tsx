"use client";

import React from "react";
import Hero from "../Hero/Hero";
import SafetyPromise from "../SafetyPromise/SafetyPromise";
import ServiceCoverage from "../ServiceCoverage/ServiceCoverage";
import OrderStepsSection from "../OrderStepsSection/OrderStepsSection";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection/FAQSection";
import {
  ServiceCategory,
  useGetServicesQuery,
  ServiceStatus,
} from "@/graphql/api";
import PestControlServicesShowcase from "../PestControlServicesShowcase/PestControlServicesShowcase";

const pestFaqs: FAQItem[] = [
  {
    id: "p1",
    question: "Are your pest control treatments safe for kids and pets?",
    answer:
      "Yes! We use eco-friendly, pet-safe, and family-safe products for all treatments.",
  },
  {
    id: "p2",
    question: "How soon can you come for an inspection?",
    answer:
      "We offer same-day or next-day inspections in most areas. Book online or call us!",
  },
  {
    id: "p3",
    question: "Do I need to leave my home during treatment?",
    answer:
      "For most treatments, you can stay home. We'll let you know if temporary evacuation is needed.",
  },
  {
    id: "p4",
    question: "What pests do you cover?",
    answer:
      "We treat ants, cockroaches, rodents, termites, mosquitoes, bed bugs, and more. See our 'What We Treat' section for details.",
  },
  {
    id: "p5",
    question: "Is there a guarantee?",
    answer:
      "Absolutely. If pests return within 30 days, we'll re-treat your home for free.",
  },
];

const PestControlPageClient: React.FC = () => {
  const {
    data: servicesData,
    loading,
    error,
  } = useGetServicesQuery({
    variables: {
      category: ServiceCategory.PestControl,
      status: ServiceStatus.Active,
    },
  });

  console.log(servicesData);

  return (
    <>
      <Hero />
      <PestControlServicesShowcase
        servicesData={servicesData?.services}
        loading={loading}
        error={error}
      />
      <SafetyPromise />
      <ServiceCoverage />
      <OrderStepsSection />
      <FAQSection faqs={pestFaqs} />
    </>
  );
};

export default PestControlPageClient;
