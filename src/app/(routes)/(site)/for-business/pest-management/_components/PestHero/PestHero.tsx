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
          <div className={styles.pestHero__badge}>
            Professional Commercial Pest Control
          </div>
          <h1 className={styles.pestHero__title}>
            <span className={styles["pestHero__title--accent"]}>Comprehensive</span>
            <span className={styles["pestHero__title--main"]}>
              Pest Management<br />Solutions
            </span>
          </h1>
          <p className={styles.pestHero__subtitle}>
            Protect your business reputation and ensure a safe, hygienic environment with our
            comprehensive commercial pest control solutions. From prevention to emergency response,
            we safeguard your workplace against all pest threats.
          </p>
          <div className={styles.pestHero__stats}>
            <div className={styles.pestHero__stat}>
              <Shield size={24} />
              <div>
                <strong>99.5%</strong>
                <span>Success Rate</span>
              </div>
            </div>
            <div className={styles.pestHero__stat}>
              <Clock size={24} />
              <div>
                <strong>24/7</strong>
                <span>Emergency Response</span>
              </div>
            </div>
            <div className={styles.pestHero__stat}>
              <Bug size={24} />
              <div>
                <strong>300+</strong>
                <span>Business Clients</span>
              </div>
            </div>
          </div>
          <div className={styles.pestHero__cta}>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Free Inspection
            </Button>
            <Button variant="white" size="lg" rightIcon={<Phone size={18} />}>
              Emergency Line
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PestHero;