"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./CleaningServicesShowcase.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { Routes } from "@/constants/routes";

// Service data
const cleaningServices = [
  {
    id: "standard",
    name: "Standard Cleaning",
    icon: "🧹",
    description:
      "Regular maintenance cleaning for your home. Dusting, vacuuming, and surface cleaning.",
    features: [
      "Dusting & Wiping",
      "Vacuuming",
      "Bathroom Cleaning",
      "Kitchen Cleaning",
    ],
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    icon: "✨",
    description:
      "Thorough cleaning including hard-to-reach areas, appliances, and detailed attention.",
    features: [
      "Everything in Standard",
      "Inside Appliances",
      "Baseboards",
      "Light Fixtures",
    ],
  },
  {
    id: "movein",
    name: "Move-in/Move-out",
    icon: "📦",
    description:
      "Complete cleaning for new beginnings. Perfect for landlords and tenants.",
    features: [
      "Deep Cleaning Plus",
      "Inside Cabinets",
      "Window Cleaning",
      "Wall Washing",
    ],
  },
];

const CleaningServicesShowcase = () => {
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.showcase} ref={sectionRef}>
      <div className={styles.showcase__container}>
        <motion.div
          className={styles.showcase__header}
          initial={{ opacity: 0, y: 20 }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                }
              : { opacity: 0, y: 20 }
          }
        >
          <h2 className={styles.showcase__title}>Our Cleaning Services</h2>
          <p className={styles.showcase__subtitle}>
            From everyday tidying to deep transformations, we have the perfect
            service for your needs.
          </p>
        </motion.div>

        <motion.div
          className={styles.showcase__grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {cleaningServices.map((service) => (
            <motion.div
              key={service.id}
              className={styles.showcase__card}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <div className={styles.showcase__icon}>
                <span className={styles.showcase__emoji}>{service.icon}</span>
              </div>

              <div className={styles.showcase__content}>
                <h3 className={styles.showcase__name}>{service.name}</h3>
                <p className={styles.showcase__description}>
                  {service.description}
                </p>

                <ul className={styles.showcase__features}>
                  {service.features.map((feature, index) => (
                    <li key={index} className={styles.showcase__feature}>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className={styles.showcase__action}>
                  <Button href={Routes.GET_STARTED} variant="primary" size="sm">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CleaningServicesShowcase;
