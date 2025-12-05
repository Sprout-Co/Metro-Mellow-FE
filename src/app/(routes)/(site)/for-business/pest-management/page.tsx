"use client";

import React from "react";
import PestHero from "./_components/PestHero/PestHero";
import PestThreatAssessment from "./_components/PestThreatAssessment/PestThreatAssessment";
import PestSolutions from "./_components/PestSolutions/PestSolutions";
import ComplianceSafety from "./_components/ComplianceSafety/ComplianceSafety";
import PestPricing from "./_components/PestPricing/PestPricing";
import EmergencyResponse from "./_components/EmergencyResponse/EmergencyResponse";
import PestCTA from "./_components/PestCTA/PestCTA";
import styles from "./PestManagement.module.scss";

export default function PestManagementPage() {
  return (
    <main className={styles.pestManagement}>
      <PestHero />
      <PestThreatAssessment />
      <PestSolutions />
      <ComplianceSafety />
      {/* <PestPricing /> */}
      <EmergencyResponse />
      <PestCTA />
    </main>
  );
}
