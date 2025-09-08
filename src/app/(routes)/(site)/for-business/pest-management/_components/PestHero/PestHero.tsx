"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Bug, Shield, Clock, Phone } from "lucide-react";
import styles from "./PestHero.module.scss";

const PestHero: React.FC = () => {
  return (
    <section className={styles.pestHero}>
      <div className={styles.pestHero__background} />
      <div className={styles.pestHero__overlay} />
      <div className={styles.pestHero__container}>
        <motion.div
          className={styles.pestHero__content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.pestHero__title}>
            <span className={styles["pestHero__title--accent"]}>
              Comprehensive
            </span>
            <span className={styles["pestHero__title--main"]}>
              Pest Management
              <br />
              Solutions
            </span>
          </h1>
          <p className={styles.pestHero__subtitle}>
            Protect your business reputation and ensure a safe, hygienic
            environment with our comprehensive commercial pest control
            solutions. From prevention to emergency response, we safeguard your
            workplace against all pest threats.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PestHero;
