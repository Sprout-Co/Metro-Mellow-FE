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

export default function BusinessPage() {
  return (
    <main className={styles.forBusiness}>
      <BusinessHero />
      <BusinessBenefits />
      <EnterpriseServices />
      <EnterpriseFeatures />
      <IntegrationTechnologySection />
      <PricingTiersSection />
      <SuccessStoriesSection />
      <EnterpriseCTA />
    </main>
  );
}
