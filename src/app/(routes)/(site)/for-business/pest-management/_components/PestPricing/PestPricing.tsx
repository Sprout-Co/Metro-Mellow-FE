"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ArrowRight, Star, Shield, Zap, Bug } from "lucide-react";
import styles from "./PestPricing.module.scss";

const PestPricing: React.FC = () => {
  const pricingTiers = [
    {
      name: "Basic Protection",
      price: "$199",
      period: "/month",
      description: "Essential pest control for small businesses",
      icon: <Bug size={24} />,
      features: [
        "Monthly inspections",
        "Standard pest treatments",
        "Basic reporting",
        "Email support",
        "Preventive measures",
        "Common pest coverage",
      ],
      popular: false,
      colorScheme: "primary",
    },
    {
      name: "Professional Guard",
      price: "$399",
      period: "/month",
      description: "Comprehensive protection for growing businesses",
      icon: <Shield size={24} />,
      features: [
        "Bi-weekly inspections",
        "Advanced pest treatments",
        "Detailed reporting & analytics",
        "Priority phone support",
        "Emergency response",
        "All pest types covered",
        "Compliance documentation",
        "Quarterly deep treatments",
      ],
      popular: true,
      colorScheme: "secondary",
    },
    {
      name: "Enterprise Shield",
      price: "Custom",
      period: "pricing",
      description: "Complete pest management for large operations",
      icon: <Zap size={24} />,
      features: [
        "24/7 monitoring systems",
        "Specialized treatments",
        "Real-time reporting dashboard",
        "Dedicated account manager",
        "Same-day emergency response",
        "Multi-location management",
        "Full compliance support",
        "Custom treatment protocols",
        "Staff training programs",
      ],
      popular: false,
      colorScheme: "accent",
    },
  ];

  return (
    <section className={styles.pestPricing}>
      <div className={styles.pestPricing__container}>
        <motion.div
          className={styles.pestPricing__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.pestPricing__badge}>Pricing Plans</span>
          <h2 className={styles.pestPricing__title}>
            Transparent Pest Control Pricing
          </h2>
          <p className={styles.pestPricing__subtitle}>
            Choose the perfect protection level for your business needs. All
            plans include our satisfaction guarantee.
          </p>
        </motion.div>

        <div className={styles.pestPricing__grid}>
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`${styles.pricingCard} ${
                tier.popular ? styles.pricingCard__featured : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-accent={tier.colorScheme}
            >
              {tier.popular && (
                <div className={styles.pricingCard__badge}>
                  <Star size={16} />
                  Most Popular
                </div>
              )}

              <div className={styles.pricingCard__header}>
                <div className={styles.pricingCard__icon}>{tier.icon}</div>
                <h3 className={styles.pricingCard__title}>{tier.name}</h3>
                <p className={styles.pricingCard__description}>
                  {tier.description}
                </p>
              </div>

              <div className={styles.pricingCard__pricing}>
                <div className={styles.pricingCard__price}>
                  <span className={styles.pricingCard__amount}>
                    {tier.price}
                  </span>
                  <span className={styles.pricingCard__period}>
                    {tier.period}
                  </span>
                </div>
              </div>

              <div className={styles.pricingCard__features}>
                <ul>
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <CheckCircle size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.pricingCard__action}>
                <Button
                  variant={tier.popular ? "primary" : "outline"}
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
                >
                  {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.pestPricing__guarantee}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.guarantee}>
            <Shield className={styles.guarantee__icon} size={32} />
            <div className={styles.guarantee__content}>
              <h3>100% Satisfaction Guarantee</h3>
              <p>
                Not satisfied with our service? We'll return within 24 hours at
                no additional cost or provide a full refund. Your peace of mind
                is our priority.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PestPricing;
