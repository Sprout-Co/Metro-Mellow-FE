"use client";

import React from "react";
import BusinessHero from "./_components/BusinessHero/BusinessHero";
import BusinessBenefits from "./_components/BusinessBenefits/BusinessBenefits";
import EnterpriseServices from "./_components/EnterpriseServices/EnterpriseServices";
import EnterpriseFeatures from "./_components/EnterpriseFeatures/EnterpriseFeatures";
import SuccessStoriesSection from "./_components/SuccessStoriesSection/SuccessStoriesSection";
import styles from "./ForBusiness.module.scss";

export default function BusinessPage() {
  return (
    <main className={styles.forBusiness}>
      <BusinessHero />
      <EnterpriseServices />
      <BusinessBenefits />
      <EnterpriseFeatures />
      <SuccessStoriesSection />
      {/* Other business sections will be added here */}
    </main>
  );
}
