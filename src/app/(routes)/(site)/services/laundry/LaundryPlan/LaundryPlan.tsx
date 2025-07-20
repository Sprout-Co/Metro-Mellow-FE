"use client";

import { motion } from "framer-motion";
import styles from "./LaundryPlan.module.scss";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon } from "lucide-react";

const LaundryPlan = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const serviceItems = [
    {
      title: "Pickup & Delivery:",
      description: "Convenience that never skips a beat.",
    },
    {
      title: "Dry Cleaning:",
      description: "Because some clothes deserve a little VIP treatment.",
    },
    {
      title: "Wash & Fold:",
      description: "Like magic, but with detergent.",
    },
    {
      title: "Express Service:",
      description: "Need it pronto? We spin your laundry at lightning speed.",
    },
  ];

  return (
    <section className={styles.plan}>
      <div className={styles.plan__container}>
        <motion.div
          className={styles.plan__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className={styles.plan__heading} variants={fadeIn}>
            <h2 className={styles.plan__title}>
              No
              <br />
              Confusing
              <br />
              Plan
            </h2>
            <p className={styles.plan__subtitle}>
              just clean clothes, your way.
            </p>
            <div className={styles.plan__cta}>
              <CTAButton
                href={Routes.GET_STARTED}
                size="lg"
                className={styles.plan__button}
                animationType="pulse"
                animationIntensity="intense"
              >
                START LAUNDRY
                <ArrowRightIcon className={styles.icon} />
              </CTAButton>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.plan__services}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {serviceItems.map((service, index) => (
            <motion.div
              key={index}
              className={styles.plan__serviceItem}
              variants={fadeIn}
            >
              <div className={styles.plan__serviceIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className={styles.plan__serviceContent}>
                <h3 className={styles.plan__serviceTitle}>{service.title}</h3>
                <p className={styles.plan__serviceDescription}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LaundryPlan;
