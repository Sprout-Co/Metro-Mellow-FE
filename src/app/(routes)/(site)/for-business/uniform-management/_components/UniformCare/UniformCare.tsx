"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";
import styles from "./UniformCare.module.scss";

const UniformCare: React.FC = () => {
  const packages = [
    { name: "Basic Care", price: "$8", period: "/item", popular: false },
    { name: "Premium Care", price: "$12", period: "/item", popular: true },
    { name: "Executive Care", price: "$18", period: "/item", popular: false },
  ];

  return (
    <section className={styles.uniformCare}>
      <div className={styles.uniformCare__container}>
        <motion.h2 
          className={styles.uniformCare__title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Service Packages
        </motion.h2>
        <div className={styles.uniformCare__packages}>
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`${styles.uniformCare__package} ${pkg.popular ? styles["uniformCare__package--popular"] : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {pkg.popular && (
                <div className={styles.uniformCare__popularBadge}>
                  <Star size={14} /> Most Popular
                </div>
              )}
              <h3>{pkg.name}</h3>
              <div className={styles.uniformCare__price}>
                <span>{pkg.price}</span>
                <small>{pkg.period}</small>
              </div>
              <Button variant={pkg.popular ? "primary" : "secondary"} rightIcon={<ArrowRight size={16} />}>
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniformCare;