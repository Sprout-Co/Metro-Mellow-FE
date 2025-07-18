"use client";

import React from "react";
import Image from "next/image";
import styles from "./MagicHandsSection.module.scss";
import { Button } from "@/components/ui/Button";

const MagicHandsSection: React.FC = () => {
  return (
    <section className={styles["magic-hands"]}>
      <div className={styles["magic-hands__container"]}>
        <div className={styles["magic-hands__content"]}>
          <h2 className={styles["magic-hands__title"]}>The magic hands</h2>
          <h3 className={styles["magic-hands__subtitle"]}>
            Meet the exceptional people behind Metromellow
          </h3>

          <div className={styles["magic-hands__images"]}>
            <div className={styles["magic-hands__main-image"]}>
              <Image
                src="/images/cleaning/c1.jpeg"
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
            <Button href="/bookings" size="lg" variant="primary">
              JOIN OUR MISSION
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagicHandsSection;
