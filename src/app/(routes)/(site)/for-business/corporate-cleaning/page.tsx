"use client";

import React from "react";
import CorporateCleaningHero from "./_components/CorporateCleaningHero/CorporateCleaningHero";
import CleaningProtocols from "./_components/CleaningProtocols/CleaningProtocols";
import ServiceTiers from "./_components/ServiceTiers/ServiceTiers";
import CleaningGallery from "./_components/CleaningGallery/CleaningGallery";
import ClientTestimonials from "./_components/ClientTestimonials/ClientTestimonials";
import CleaningCTA from "./_components/CleaningCTA/CleaningCTA";
import styles from "./CorporateCleaning.module.scss";

export default function CorporateCleaningPage() {
  return (
    <main className={styles.corporateCleaning}>
      <CorporateCleaningHero />
      <CleaningProtocols />
      <ServiceTiers />
      <CleaningGallery />
      <ClientTestimonials />
      <CleaningCTA />
    </main>
  );
}