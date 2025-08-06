"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shirt, Clock, Shield, Droplets } from "lucide-react";
import styles from "./LaundryServices.module.scss";

const LaundryServices: React.FC = () => {
  const services = [
    {
      icon: <Shirt size={32} />,
      title: "Corporate Uniforms",
      description: "Professional cleaning and maintenance for all types of corporate uniforms and workwear.",
      features: ["Industry-specific care", "Stain removal", "Professional pressing", "Quality inspections"],
    },
    {
      icon: <Clock size={32} />,
      title: "Express Service",
      description: "Fast turnaround times to ensure your team always has clean, professional attire.",
      features: ["24-hour service", "Same-day emergency", "Flexible scheduling", "Real-time tracking"],
    },
    {
      icon: <Shield size={32} />,
      title: "Garment Protection",
      description: "Comprehensive damage protection and quality assurance for your valuable uniforms.",
      features: ["Damage guarantee", "Fabric preservation", "Color protection", "Professional packaging"],
    },
    {
      icon: <Droplets size={32} />,
      title: "Eco-Friendly Care",
      description: "Environmentally responsible cleaning using biodegradable products and sustainable practices.",
      features: ["Green chemicals", "Water conservation", "Energy efficiency", "Waste reduction"],
    },
  ];

  return (
    <section className={styles.laundryServices}>
      <div className={styles.laundryServices__container}>
        <motion.div
          className={styles.laundryServices__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.laundryServices__title}>
            Complete <span className={styles.laundryServices__highlight}>Laundry</span> Solutions
          </h2>
          <p className={styles.laundryServices__subtitle}>
            Professional laundry services tailored for corporate needs
          </p>
        </motion.div>

        <div className={styles.laundryServices__grid}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={styles.laundryServices__card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.laundryServices__cardIcon}>{service.icon}</div>
              <h3 className={styles.laundryServices__cardTitle}>{service.title}</h3>
              <p className={styles.laundryServices__cardDescription}>{service.description}</p>
              <ul className={styles.laundryServices__features}>
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaundryServices;