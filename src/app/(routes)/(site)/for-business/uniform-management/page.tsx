"use client";

import React from "react";
import LaundryHero from "./_components/LaundryHero/LaundryHero";
import LaundryServices from "./_components/LaundryServices/LaundryServices";
import UniformCare from "./_components/UniformCare/UniformCare";
import LaundryProcess from "./_components/LaundryProcess/LaundryProcess";
import LaundryPricing from "./_components/LaundryPricing/LaundryPricing";
import LaundryTestimonials from "./_components/LaundryTestimonials/LaundryTestimonials";
import LaundryCTA from "./_components/LaundryCTA/LaundryCTA";
import styles from "./UniformManagement.module.scss";

export default function UniformManagementPage() {
  return (
    <main className={styles.uniformManagement}>
      <LaundryHero />
      <LaundryServices />
      {/* <UniformCare /> */}
      <LaundryProcess />
      {/* <LaundryPricing /> */}
      {/* <LaundryTestimonials /> */}
      <LaundryCTA />
    </main>
  );
}
