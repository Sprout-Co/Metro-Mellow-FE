"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./LaundryTestimonials.module.scss";

const LaundryTestimonials: React.FC = () => {
  return (
    <section className={styles.laundryTestimonials}>
      <div className={styles.laundryTestimonials__container}>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Client Success Stories
        </motion.h2>
        <p>What our corporate clients say about our laundry services...</p>
      </div>
    </section>
  );
};

export default LaundryTestimonials;