"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./MenuShowcase.module.scss";

const MenuShowcase: React.FC = () => {
  return (
    <section className={styles.menuShowcase}>
      <div className={styles.menuShowcase__container}>
        <motion.h2 
          className={styles.menuShowcase__title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Menu Categories
        </motion.h2>
        <p>Breakfast, lunch, dinner, and specialty catering options...</p>
      </div>
    </section>
  );
};

export default MenuShowcase;