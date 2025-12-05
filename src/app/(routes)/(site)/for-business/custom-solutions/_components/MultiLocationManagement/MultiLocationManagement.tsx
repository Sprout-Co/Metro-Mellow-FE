"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Calendar, BarChart3, Shield, Clock, CheckCircle } from "lucide-react";
import styles from "./MultiLocationManagement.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <MapPin />,
    title: "Centralized Dashboard",
    description: "Monitor all locations from a single, comprehensive dashboard with real-time updates and insights."
  },
  {
    icon: <Users />,
    title: "Unified Staff Management",
    description: "Coordinate staff schedules, training, and performance across all your business locations."
  },
  {
    icon: <Calendar />,
    title: "Synchronized Scheduling",
    description: "Maintain consistent service schedules and coordinate resources efficiently across locations."
  },
  {
    icon: <BarChart3 />,
    title: "Performance Analytics",
    description: "Compare performance metrics, identify trends, and optimize operations across all sites."
  },
  {
    icon: <Shield />,
    title: "Quality Assurance",
    description: "Ensure consistent service quality and brand standards at every location."
  },
  {
    icon: <Clock />,
    title: "24/7 Support",
    description: "Round-the-clock support and emergency response for all your locations."
  }
];

const benefits = [
  "Reduced operational costs through economies of scale",
  "Consistent service quality across all locations",
  "Streamlined communication and reporting",
  "Efficient resource allocation and staff deployment",
  "Centralized billing and contract management",
  "Real-time visibility into all operations"
];

const MultiLocationManagement: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.multiLocationManagement}>
      <div className={styles.multiLocationManagement__container}>
        <motion.div
          className={styles.multiLocationManagement__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Multi-Location Management</h2>
          <p>Streamline operations across all your business locations with our centralized management system. Perfect for franchises, retail chains, and multi-site enterprises.</p>
        </motion.div>

        <div className={styles.multiLocationManagement__content}>
          <motion.div
            className={styles.features__grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.feature__card}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className={styles.feature__icon}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className={styles.benefits__section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.benefits__content}>
              <div className={styles.benefits__text}>
                <h3>Why Choose Multi-Location Management?</h3>
                <p>Our comprehensive multi-location management system delivers tangible benefits that scale with your business growth.</p>
              </div>
              <div className={styles.benefits__list}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className={styles.benefit__item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className={styles.benefit__icon} />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.stats__section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.stats__grid}>
              <div className={styles.stat__item}>
                <div className={styles.stat__number}>500+</div>
                <div className={styles.stat__label}>Locations Managed</div>
              </div>
              <div className={styles.stat__item}>
                <div className={styles.stat__number}>99.8%</div>
                <div className={styles.stat__label}>Service Consistency</div>
              </div>
              <div className={styles.stat__item}>
                <div className={styles.stat__number}>30%</div>
                <div className={styles.stat__label}>Cost Reduction</div>
              </div>
              <div className={styles.stat__item}>
                <div className={styles.stat__number}>24/7</div>
                <div className={styles.stat__label}>Support Coverage</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MultiLocationManagement;