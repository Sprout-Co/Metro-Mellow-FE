"use client";

import React from "react";
import BusinessHero from "./_components/BusinessHero/BusinessHero";
import BusinessBenefits from "./_components/BusinessBenefits/BusinessBenefits";
import EnterpriseServices from "./_components/EnterpriseServices/EnterpriseServices";
import EnterpriseFeatures from "./_components/EnterpriseFeatures/EnterpriseFeatures";
import styles from "./ForBusiness.module.scss";
import FAQSection from "@/components/ui/FAQSection/FAQSection";

const faqs = [
  {
    id: "1",
    question: "What is Metromellow for Business?",
    answer:
      "Metromellow is a platform that allows you to book services for your home and office.",
  },
  {
    id: "2",
    question: "How does Metromellow for Business work?",
    answer:
      "Metromellow for Business allows you to book services for your home and office.",
  },

  {
    id: "3",
    question: "How does Metromellow for Business work?",
    answer:
      "Metromellow for Business allows you to book services for your home and office.",
  },

  {
    id: "4",
    question: "How does Metromellow for Business work?",
    answer:
      "Metromellow for Business allows you to book services for your home and office.",
  },

  {
    id: "5",
    question: "How does Metromellow for Business work?",
    answer:
      "Metromellow for Business allows you to book services for your home and office.",
  },
];

export default function BusinessPage() {
  return (
    <main className={styles.forBusiness}>
      <BusinessHero />
      <EnterpriseServices />
      <BusinessBenefits />
      <EnterpriseFeatures />
      {/* <IntegrationTechnologySection /> */}
      {/* <PricingTiersSection /> */}
      {/* <SuccessStoriesSection /> */}
      {/* <EnterpriseCTA /> */}
      <FAQSection faqs={faqs} />
    </main>
  );
}
