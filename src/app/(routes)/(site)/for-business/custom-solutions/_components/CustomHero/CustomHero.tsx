"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Settings, Users, BarChart } from "lucide-react";
import styles from "./CustomHero.module.scss";

const CustomHero: React.FC = () => {
  return (
    <section className={styles.customHero}>
      <div className={styles.customHero__background} />
      <div className={styles.customHero__overlay} />
      <div className={styles.customHero__container}>
        <motion.div
          className={styles.customHero__content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.customHero__badge}>
            Tailored Business Solutions
          </div>
          <h1 className={styles.customHero__title}>
            <span className={styles["customHero__title--accent"]}>
              Integrated
            </span>
            <span className={styles["customHero__title--main"]}>
              Custom Service
              <br />
              Solutions
            </span>
          </h1>
          <p className={styles.customHero__subtitle}>
            Every business is unique. That's why we create integrated service
            packages tailored to your specific needs, industry requirements, and
            operational goals. From single-location businesses to multi-national
            corporations.
          </p>
          {/* <div className={styles.customHero__features}>
            <div className={styles.customHero__feature}>
              <Settings size={20} />
              <span>Customizable Service Bundles</span>
            </div>
            <div className={styles.customHero__feature}>
              <Users size={20} />
              <span>Dedicated Account Management</span>
            </div>
            <div className={styles.customHero__feature}>
              <BarChart size={20} />
              <span>Performance Analytics</span>
            </div>
          </div>
          <div className={styles.customHero__cta}>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Build Your Solution
            </Button>
            <Button variant="white" size="lg" rightIcon={<Users size={18} />}>
              Consult Expert
            </Button>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomHero;
