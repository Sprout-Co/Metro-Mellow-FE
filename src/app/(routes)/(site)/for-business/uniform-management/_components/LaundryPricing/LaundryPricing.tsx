"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./LaundryPricing.module.scss";

const LaundryPricing: React.FC = () => {
  return (
    <section className={styles.laundryPricing}>
      <div className={styles.laundryPricing__container}>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Transparent Pricing
        </motion.h2>
        <p>Competitive rates for all laundry services...</p>
      </div>
    </section>
  );
};

export default LaundryPricing;