"use client";

import React from "react";
import CustomHero from "./_components/CustomHero/CustomHero";
import ServiceBundleBuilder from "./_components/ServiceBundleBuilder/ServiceBundleBuilder";
import IndustrySpecific from "./_components/IndustrySpecific/IndustrySpecific";
import MultiLocationManagement from "./_components/MultiLocationManagement/MultiLocationManagement";
import ROICalculator from "./_components/ROICalculator/ROICalculator";
import CustomCaseStudies from "./_components/CustomCaseStudies/CustomCaseStudies";
import CustomCTA from "./_components/CustomCTA/CustomCTA";
import styles from "./CustomSolutions.module.scss";

export default function CustomSolutionsPage() {
  return (
    <main className={styles.customSolutions}>
      <CustomHero />
      <ServiceBundleBuilder />
      <IndustrySpecific />
      <MultiLocationManagement />
      <ROICalculator />
      <CustomCaseStudies />
      <CustomCTA />
    </main>
  );
}