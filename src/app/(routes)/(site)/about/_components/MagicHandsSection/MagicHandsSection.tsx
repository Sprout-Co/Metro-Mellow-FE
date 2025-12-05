"use client";

import React from "react";
import Image from "next/image";
import styles from "./MagicHandsSection.module.scss";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";

const MagicHandsSection: React.FC = () => {
  return (
    <section className={styles["magic-hands"]}>
      <div className={styles["magic-hands__container"]}>
        <div className={styles["magic-hands__content"]}>
          <h2 className={styles["magic-hands__title"]}>Our Professional Team</h2>
          <h3 className={styles["magic-hands__subtitle"]}>
            Vetted professionals who understand Lagos families and deliver exceptional service every time
          </h3>

          <div className={styles["magic-hands__images"]}>
            <div className={styles["magic-hands__main-image"]}>
              <Image
                src="/images/cleaning/c1.jpg"
                alt="Metromellow team member"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <div className={styles["magic-hands__grid"]}>
              <div className={styles["magic-hands__grid-item"]}>
                <Image
                  src="/images/cleaning/c2.jpeg"
                  alt="Metromellow team member"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles["magic-hands__grid-item"]}>
                <Image
                  src="/images/cleaning/c3.jpeg"
                  alt="Metromellow team member"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles["magic-hands__grid-item"]}>
                <Image
                  src="/images/cleaning/c4.jpeg"
                  alt="Metromellow team member"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles["magic-hands__grid-item"]}>
                <Image
                  src="/images/cleaning/c5.jpeg"
                  alt="Metromellow team member"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          <div className={styles["magic-hands__cta"]}>
            <CTAButton href={Routes.GET_STARTED} size="lg" variant="primary">
              JOIN OUR MISSION
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicHandsSection;
