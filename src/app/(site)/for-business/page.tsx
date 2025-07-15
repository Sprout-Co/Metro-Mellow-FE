"use client";

import React from "react";
import BusinessHero from "./_components/BusinessHero/BusinessHero";
import styles from "./ForBusiness.module.scss";

export default function BusinessPage() {
  return (
    <main className={styles.forBusiness}>
      <BusinessHero />
      {/* Other business sections will be added here */}
    </main>
  );
}
