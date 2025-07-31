"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./NutritionSustainability.module.scss";

const NutritionSustainability: React.FC = () => {
  return (
    <section className={styles.nutritionSustainability}>
      <div className={styles.nutritionSustainability__container}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Nutrition & Sustainability
        </motion.h2>
        <p>Healthy options and eco-friendly practices...</p>
      </div>
    </section>
  );
};

export default NutritionSustainability;