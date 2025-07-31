"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./CateringPackages.module.scss";

const CateringPackages: React.FC = () => {
  return (
    <section className={styles.cateringPackages}>
      <div className={styles.cateringPackages__container}>
        <motion.h2 
          className={styles.cateringPackages__title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Catering Service Packages
        </motion.h2>
        <p>Daily meals, event catering, and custom solutions...</p>
      </div>
    </section>
  );
};

export default CateringPackages;