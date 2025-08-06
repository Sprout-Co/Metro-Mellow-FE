"use client";

import { motion } from "framer-motion";
import styles from "./LaundryFeatures.module.scss";
import { Button } from "@/components/ui/Button/Button";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon } from "lucide-react";

const LaundryFeatures = () => {
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

  return (
    <section className={styles.features}>
      <div className={styles.features__container}>
        <div className={styles.features__content}>
          <motion.div
            className={styles.features__heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 className={styles.features__title} variants={fadeIn}>
              Mellow Out,
              <br />
              Metro Style
            </motion.h2>
            <motion.p className={styles.features__subtitle} variants={fadeIn}>
              Fast, reliable, and eco-friendly. We keep it cool while keeping
              your wardrobe cooler.
            </motion.p>
            <motion.div className={styles.features__cta} variants={fadeIn}>
              <CTAButton
                href={Routes.GET_STARTED}
                className={styles.features__button}
                animationType="heartbeat"
                animationIntensity="intense"
                size="lg"
              >
                START LAUNDRY
                <ArrowRightIcon className={styles.icon} />
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.features__cards}>
          <motion.div
            className={`${styles.features__card} ${styles["features__card--spin"]}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.features__cardIconTop}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>

            <h3 className={styles.features__cardTitleLarge}>
              We Spin It Your Way
            </h3>

            <p className={styles.features__cardTextLarge}>
              Whether it's a quick rinse or a deep soak, our care hits every
              note perfectly.
            </p>
          </motion.div>

          <motion.div
            className={`${styles.features__card} ${styles["features__card--freshness"]}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={styles.features__cardIconTop}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>

            <h3 className={styles.features__cardTitleLarge}>Freshness</h3>

            <p className={styles.features__cardTextLarge}>
              Your clothes will feel like they just stepped off the runway. It's
              every note perfectly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LaundryFeatures;
