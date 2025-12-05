"use client";

import React from "react";
import Image from "next/image";
import styles from "./ImpactSection.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";

const ImpactSection: React.FC = () => {
  return (
    <section className={styles["impact-section"]}>
      <div className={styles["impact-section__container"]}>
        <h2 className={styles["impact-section__heading"]}>Transforming Home Services</h2>
        <p className={styles["impact-section__description"]}>
          We're transforming how families manage their homes with trusted professionals. Our network is ready to serve with quality, reliability, and exceptional care.
        </p>

        <div className={styles["impact-section__stats"]}>
          <div className={styles["impact-section__stat-item"]}>
            <div className={styles["impact-section__stat-number"]}>Now Live</div>
            <div className={styles["impact-section__stat-label"]}>
              Service Available
            </div>
          </div>
          <div className={styles["impact-section__stat-item"]}>
            <div className={styles["impact-section__stat-number"]}>100+</div>
            <div className={styles["impact-section__stat-label"]}>
              Vetted Professionals
            </div>
          </div>
          <div className={styles["impact-section__stat-item"]}>
            <div className={styles["impact-section__stat-number"]}>24/7</div>
            <div className={styles["impact-section__stat-label"]}>
              Customer Support
            </div>
          </div>
        </div>

        <div className={styles["impact-section__map"]}>
          <Image
            src="/images/impact/map.png"
            alt="Metromellow global impact map"
            width={1200}
            height={600}
            priority
          />
        </div>

        <div className={styles["impact-section__cta"]}>
          <CTAButton href={Routes.GET_STARTED} size="lg" variant="primary">
            Book Your Service
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
