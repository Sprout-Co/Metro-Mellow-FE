"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Phone,
  Calendar,
  Utensils,
  CheckCircle,
} from "lucide-react";
import styles from "./CateringCTA.module.scss";

const benefits = [
  {
    icon: <CheckCircle />,
    text: "Free tasting sessions for groups of 10+",
  },
  {
    icon: <CheckCircle />,
    text: "Custom menu development at no extra cost",
  },
  {
    icon: <CheckCircle />,
    text: "Dedicated account manager",
  },
  {
    icon: <CheckCircle />,
    text: "24/7 event support",
  },
];

const contactOptions = [
  {
    icon: <Phone />,
    title: "Call Now",
    subtitle: "(555) 123-FOOD",
    description: "Speak with our catering specialists",
  },
  {
    icon: <Calendar />,
    title: "Schedule Tasting",
    subtitle: "Free for 10+ people",
    description: "Experience our menu firsthand",
  },
  {
    icon: <Utensils />,
    title: "Custom Quote",
    subtitle: "Tailored pricing",
    description: "Get pricing for your specific needs",
  },
];

const CateringCTA: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className={styles.cateringCTA}>
      <div className={styles.cateringCTA__container}>
        <motion.div
          className={styles.cateringCTA__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Elevate Your Corporate Dining?</h2>
          <p>
            Join hundreds of satisfied businesses who trust Metromellow for
            their catering needs. Let's create something delicious together.
          </p>
        </motion.div>

        <motion.div
          className={styles.benefits__section}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>What You Get With Metromellow:</h3>
          <div className={styles.benefits__grid}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={styles.benefit__item}
                variants={itemVariants}
              >
                <div className={styles.benefit__icon}>{benefit.icon}</div>
                <span>{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.cta__actions}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight size={20} />}
          >
            Schedule Free Tasting
          </Button>
          <Button variant="white" size="lg">
            Get Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CateringCTA;
