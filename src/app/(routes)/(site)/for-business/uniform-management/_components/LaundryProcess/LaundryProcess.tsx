"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, Droplets, Shield, Package } from "lucide-react";
import styles from "./LaundryProcess.module.scss";

const LaundryProcess: React.FC = () => {
  const steps = [
    { icon: <Truck size={24} />, title: "Pickup", description: "Scheduled collection from your location" },
    { icon: <Droplets size={24} />, title: "Professional Cleaning", description: "Expert cleaning with premium products" },
    { icon: <Shield size={24} />, title: "Quality Check", description: "Thorough inspection and pressing" },
    { icon: <Package size={24} />, title: "Delivery", description: "Clean garments delivered back to you" },
  ];

  return (
    <section className={styles.laundryProcess}>
      <div className={styles.laundryProcess__container}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Process
        </motion.h2>
        <div className={styles.laundryProcess__steps}>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={styles.laundryProcess__step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.laundryProcess__stepIcon}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaundryProcess;