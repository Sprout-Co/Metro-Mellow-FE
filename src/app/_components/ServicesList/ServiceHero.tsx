"use client";
import React from "react";
import styles from "./ServiceHero.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";

interface ServiceHeroProps {
  onBookServices?: () => void;
}

const services = [
  { name: "Laundry", colorClass: styles["service-badge--laundromat"] },
  { name: "Cleaning", colorClass: styles["service-badge--cleaning"] },
  { name: "Food", colorClass: styles["service-badge--cooking"] },
  { name: "Pest Control", colorClass: styles["service-badge--pests"] },
  // { name: 'Upholstery', colorClass: styles['service-badge--upholstery'] },
];

const ServiceHero: React.FC<ServiceHeroProps> = ({ onBookServices }) => {
  return (
    <section className={styles["service-hero"]}>
      <div className={styles["service-hero__wrapper"]}>
        {/* Left: Call to Action */}
        <div className={styles["service-hero__left"]}>
          <div className={styles["service-hero__cta-block"]}>
            <h1 className={styles["service-hero__heading"]}>
              Unburden
              <br />
              yourself!
            </h1>
            <CTAButton
              variant="white"
              size="lg"
              fullWidth={false}
              href={Routes.GET_STARTED}
              animationType="wobble"
            >
              Book a service
            </CTAButton>
          </div>
        </div>
        {/* Right: Service Cards */}
        <div className={styles["service-hero__right"]}>
          <div className={styles["service-hero__badges"]}>
            {services.map((service, idx) => (
              <div
                key={service.name}
                className={`${styles["service-badge"]} ${service.colorClass}`}
                style={{ "--badge-index": idx } as React.CSSProperties}
              >
                <span className={styles["service-badge__text"]}>
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
