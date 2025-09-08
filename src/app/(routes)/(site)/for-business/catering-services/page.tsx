"use client";

import React from "react";
import CateringHero from "./_components/CateringHero/CateringHero";
import MenuShowcase from "./_components/MenuShowcase/MenuShowcase";
import NutritionSustainability from "./_components/NutritionSustainability/NutritionSustainability";
import EventShowcase from "./_components/EventShowcase/EventShowcase";
import CateringCTA from "./_components/CateringCTA/CateringCTA";
import styles from "./CateringServices.module.scss";

export default function CateringServicesPage() {
  return (
    <main className={styles.cateringServices}>
      <CateringHero />
      <MenuShowcase />
      {/* <CateringPackages /> */}
      {/* <NutritionSustainability /> */}
      {/* <EventShowcase /> */}
      <CateringCTA />
    </main>
  );
}
