"use client";

import React from "react";
import BusinessHero from "./_components/BusinessHero/BusinessHero";
import BusinessBenefits from "./_components/BusinessBenefits/BusinessBenefits";
import EnterpriseServices from "./_components/EnterpriseServices/EnterpriseServices";
import EnterpriseFeatures from "./_components/EnterpriseFeatures/EnterpriseFeatures";
import PricingTiersSection from "./_components/PricingTiersSection/PricingTiersSection";
import SuccessStoriesSection from "./_components/SuccessStoriesSection/SuccessStoriesSection";
import IntegrationTechnologySection from "./_components/IntegrationTechnologySection";
import EnterpriseCTA from "./_components/EnterpriseCTA";
import styles from "./ForBusiness.module.scss";
import FAQSection from "@/components/ui/FAQSection/FAQSection";

const faqs = [
  {
    id: "1",
    question: "What is Metro Mellow for Business?",
    answer:
      "Metro Mellow is a platform that allows you to book services for your home and office.",
  },
  {
    id: "2",
    question: "How does Metro Mellow for Business work?",
    answer:
      "Metro Mellow for Business allows you to book services for your home and office.",
  },

  {
    id: "3",
    question: "How does Metro Mellow for Business work?",
    answer:
      "Metro Mellow for Business allows you to book services for your home and office.",
  },

  {
    id: "4",
    question: "How does Metro Mellow for Business work?",
    answer:
      "Metro Mellow for Business allows you to book services for your home and office.",
  },

  {
    id: "5",
    question: "How does Metro Mellow for Business work?",
    answer:
      "Metro Mellow for Business allows you to book services for your home and office.",
  },
];

export default function BusinessPage() {
  return (
    <main className={styles.forBusiness}>
      <BusinessHero />
      <EnterpriseServices />
      <BusinessBenefits />
      <EnterpriseFeatures />
      <IntegrationTechnologySection />
      {/* <PricingTiersSection /> */}
      {/* <SuccessStoriesSection /> */}
      {/* <EnterpriseCTA /> */}
      <FAQSection faqs={faqs} />
    </main>
  );
}
