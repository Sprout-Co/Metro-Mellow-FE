"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Shirt, Clock, Shield, Droplets } from "lucide-react";
import styles from "./LaundryHero.module.scss";

const LaundryHero: React.FC = () => {
  return (
    <section className={styles.laundryHero}>
      <div className={styles.laundryHero__background} />
      <div className={styles.laundryHero__overlay} />
      <div className={styles.laundryHero__container}>
        <motion.div
          className={styles.laundryHero__content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.laundryHero__badge}>
            Professional Laundry & Uniform Services
          </div>
          <h1 className={styles.laundryHero__title}>
            <span className={styles["laundryHero__title--accent"]}>
              Premium
            </span>
            <span className={styles["laundryHero__title--main"]}>
              Corporate
              <br />
              Laundry Solutions
            </span>
          </h1>
          <p className={styles.laundryHero__subtitle}>
            Keep your team looking professional with our comprehensive laundry
            and uniform management services. From daily garment care to
            specialized uniform maintenance, we ensure your corporate image
            stays pristine.
          </p>
          {/* <div className={styles.laundryHero__features}>
            <div className={styles.laundryHero__feature}>
              <Shirt size={20} />
              <span>Uniform Care Specialists</span>
            </div>
            <div className={styles.laundryHero__feature}>
              <Clock size={20} />
              <span>24-Hour Turnaround</span>
            </div>
            <div className={styles.laundryHero__feature}>
              <Shield size={20} />
              <span>Damage Protection</span>
            </div>
            <div className={styles.laundryHero__feature}>
              <Droplets size={20} />
              <span>Eco-Friendly Products</span>
            </div>
          </div> */}
          {/* <div className={styles.laundryHero__cta}>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              Get Free Quote
            </Button>
            <Button variant="white" size="lg" rightIcon={<Shirt size={18} />}>
              Schedule Pickup
            </Button>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default LaundryHero;
