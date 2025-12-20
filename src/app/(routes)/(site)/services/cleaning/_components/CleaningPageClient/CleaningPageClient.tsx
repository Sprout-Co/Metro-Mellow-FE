"use client";

import React from "react";
import CleaningHero from "../CleaningHero/CleaningHero";
import CleaningServicesShowcase from "../CleaningServicesShowcase/CleaningServicesShowcase";
import CleaningPromoSection from "../CleaningPromoSection/CleaningPromoSection";
import CleaningVideoSection from "../CleaningVideoSection/CleaningVideoSection";
import CleaningStepsSection from "../CleaningStepsSection/CleaningStepsSection";
import FAQSection, { FAQItem } from "@/components/ui/FAQSection/FAQSection";
import { ServiceCategory, ServiceStatus } from "@/graphql/api";
import { useGetServices } from "@/graphql/hooks/services/useServiceOperations";
import ServiceInternalLinks from "@/components/common/ServiceInternalLinks/ServiceInternalLinks";
import { allServices } from "@/constants/services";

const cleaningFaqs: FAQItem[] = [
  {
    id: "c1",
    question: "Do you bring your own cleaning supplies?",
    answer:
      "Yes, our team arrives fully equipped with professional-grade, eco-friendly products.",
  },
  {
    id: "c2",
    question: "Can I request green cleaning?",
    answer:
      "Absolutely! We offer green cleaning options for all services at no extra charge.",
  },
  {
    id: "c3",
    question: "Are your cleaners background checked?",
    answer:
      "All staff undergo thorough background checks and training for your peace of mind.",
  },
  {
    id: "c4",
    question: "What if I'm not satisfied with the cleaning?",
    answer:
      "Contact us within 24 hours and we'll re-clean the area at no extra cost.",
  },
  {
    id: "c5",
    question: "How do I reschedule or cancel?",
    answer:
      "You can reschedule or cancel up to 24 hours in advance with no penalty.",
  },
];

const CleaningPageClient: React.FC = () => {
  const {
    data: servicesData,
    loading,
    error,
  } = useGetServices({
    category: ServiceCategory.Cleaning,
    status: ServiceStatus.Active,
  });

  const scrollToServicesShowcase = () => {
    const showcaseElement = document.getElementById("services-showcase");
    if (showcaseElement) {
      showcaseElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <CleaningHero onCTAClick={scrollToServicesShowcase} />
      <CleaningServicesShowcase
        servicesData={servicesData?.services}
        loading={loading}
        error={error}
      />
      <CleaningPromoSection onCTAClick={scrollToServicesShowcase} />
      <CleaningVideoSection onCTAClick={scrollToServicesShowcase} />
      <CleaningStepsSection onCTAClick={scrollToServicesShowcase} />
      <FAQSection faqs={cleaningFaqs} />
      <ServiceInternalLinks
        currentService="/services/cleaning"
        services={allServices}
      />
    </>
  );
};

export default CleaningPageClient;
