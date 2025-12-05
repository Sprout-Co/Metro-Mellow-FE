"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ArrowRight, Star } from "lucide-react";
import styles from "./ServiceTiers.module.scss";

const ServiceTiers: React.FC = () => {
  const tiers = [
    {
      name: "Essential Clean",
      price: "$299",
      period: "/month",
      description: "Perfect for small offices and startups",
      features: [
        "Daily maintenance cleaning",
        "Restroom sanitization",
        "Trash removal & recycling",
        "Basic floor care",
        "Monthly deep clean",
      ],
      popular: false,
      colorScheme: "primary",
    },
    {
      name: "Professional Plus",
      price: "$599",
      period: "/month",
      description: "Comprehensive solution for growing businesses",
      features: [
        "Everything in Essential",
        "Carpet & upholstery cleaning",
        "Window cleaning (interior)",
        "Kitchen deep sanitization",
        "Weekly quality inspections",
        "Emergency cleaning response",
      ],
      popular: true,
      colorScheme: "secondary",
    },
    {
      name: "Enterprise Premium",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for large corporations",
      features: [
        "Everything in Professional Plus",
        "24/7 cleaning availability",
        "Specialized equipment cleaning",
        "Multi-location management",
        "Dedicated account manager",
        "Custom reporting dashboard",
      ],
      popular: false,
      colorScheme: "accent",
    },
  ];

  return (
    <section className={styles.serviceTiers}>
      <div className={styles.serviceTiers__container}>
        <motion.div
          className={styles.serviceTiers__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className={styles.serviceTiers__badge}>Service Packages</span>
          <h2 className={styles.serviceTiers__title}>
            Choose the <span className={styles.serviceTiers__highlight}>Perfect</span> Cleaning Solution
          </h2>
          <p className={styles.serviceTiers__subtitle}>
            Flexible packages designed to meet your specific business needs and budget
          </p>
        </motion.div>

        <div className={styles.serviceTiers__grid}>
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className={`${styles.serviceTiers__tier} ${tier.popular ? styles["serviceTiers__tier--popular"] : ""} ${styles[`serviceTiers__tier--${tier.colorScheme}`]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {tier.popular && (
                <div className={styles.serviceTiers__popularBadge}>
                  <Star size={16} />
                  Most Popular
                </div>
              )}
              
              <div className={styles.serviceTiers__tierHeader}>
                <h3 className={styles.serviceTiers__tierName}>{tier.name}</h3>
                <div className={styles.serviceTiers__tierPrice}>
                  <span className={styles.serviceTiers__price}>{tier.price}</span>
                  <span className={styles.serviceTiers__period}>{tier.period}</span>
                </div>
                <p className={styles.serviceTiers__tierDescription}>{tier.description}</p>
              </div>

              <div className={styles.serviceTiers__features}>
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={styles.serviceTiers__feature}>
                    <CheckCircle size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={tier.popular ? "primary" : "secondary"}
                size="lg"
                rightIcon={<ArrowRight size={16} />}
                className={styles.serviceTiers__cta}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceTiers;