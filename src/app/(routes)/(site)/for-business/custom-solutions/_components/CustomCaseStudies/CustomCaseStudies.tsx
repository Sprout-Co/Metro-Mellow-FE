"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./CustomCaseStudies.module.scss";

const CustomCaseStudies: React.FC = () => {
  return (
    <section className={styles.customCaseStudies}>
      <div className={styles.customCaseStudies__container}>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Success Stories
        </motion.h2>
        <p>Real results from our custom solution implementations...</p>
      </div>
    </section>
  );
};

export default CustomCaseStudies;