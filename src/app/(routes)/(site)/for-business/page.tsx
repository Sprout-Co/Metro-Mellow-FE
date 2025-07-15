"use client";

import React from "react";
import BusinessHero from "./_components/BusinessHero/BusinessHero";
import BusinessBenefits from "./_components/BusinessBenefits/BusinessBenefits";
import EnterpriseServices from "./_components/EnterpriseServices/EnterpriseServices";
import styles from "./ForBusiness.module.scss";

export default function BusinessPage() {
  return (
    <main className={styles.forBusiness}>
      <BusinessHero />
      <BusinessBenefits />
      <EnterpriseServices />
      {/* Other business sections will be added here */}
    </main>
  );
}
