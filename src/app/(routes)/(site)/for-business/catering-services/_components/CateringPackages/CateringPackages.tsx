"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check, ArrowRight, Coffee, Users, Calendar } from "lucide-react";
import styles from "./CateringPackages.module.scss";

interface Package {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

const packages: Package[] = [
  {
    id: "daily",
    name: "Daily Meal Service",
    icon: <Coffee />,
    price: "$8-15",
    period: "per person/meal",
    description: "Regular breakfast and lunch service for your team with flexible menu options",
    features: [
      "Breakfast service (pastries, coffee, fruit)",
      "Hot lunch buffet with 2-3 entrée options",
      "Fresh salad bar and sides",
      "Beverages and desserts included",
      "Flexible scheduling (daily, weekly)",
      "Dietary restrictions accommodated",
      "Setup and cleanup included"
    ]
  },
  {
    id: "event",
    name: "Event Catering",
    icon: <Users />,
    price: "$25-65",
    period: "per person",
    description: "Professional catering for meetings, conferences, and special company events",
    features: [
      "Customizable menu planning",
      "Professional service staff",
      "Full setup and breakdown",
      "Linens, china, and glassware",
      "Bar services available",
      "Centerpieces and decorations",
      "Event coordination support",
      "Audio/visual equipment assistance"
    ],
    isPopular: true,
    badge: "Most Popular"
  },
  {
    id: "corporate",
    name: "Corporate Packages",
    icon: <Calendar />,
    price: "Custom",
    period: "pricing",
    description: "Comprehensive catering solutions for large organizations with multiple locations",
    features: [
      "Multi-location service coordination",
      "Volume pricing discounts",
      "Dedicated account management",
      "Custom menu development",
      "Nutritional analysis and labeling",
      "Monthly service reporting",
      "Emergency catering support",
      "Holiday and special event planning"
    ]
  }
];

const CateringPackages: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={styles.cateringPackages}>
      <div className={styles.cateringPackages__container}>
        <motion.div
          className={styles.cateringPackages__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Catering Service Packages</h2>
          <p>Choose the perfect catering solution for your business needs, from daily meal service to special event catering</p>
        </motion.div>

        <motion.div
          className={styles.packages__grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`${styles.package__card} ${pkg.isPopular ? styles.package__card_popular : ''}`}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {pkg.badge && (
                <div className={styles.package__badge}>
                  {pkg.badge}
                </div>
              )}
              
              <div className={styles.package__header}>
                <div className={styles.package__icon}>
                  {pkg.icon}
                </div>
                <h3>{pkg.name}</h3>
                <div className={styles.package__pricing}>
                  <span className={styles.package__price}>{pkg.price}</span>
                  <span className={styles.package__period}>{pkg.period}</span>
                </div>
              </div>

              <p className={styles.package__description}>
                {pkg.description}
              </p>

              <div className={styles.package__features}>
                <h4>What's Included:</h4>
                <ul>
                  {pkg.features.map((feature, index) => (
                    <li key={index}>
                      <Check className={styles.feature__icon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.package__cta}>
                <Button 
                  variant={pkg.isPopular ? "primary" : "outline"} 
                  size="lg" 
                  rightIcon={<ArrowRight size={18} />}
                >
                  {pkg.id === "corporate" ? "Get Quote" : "Order Now"}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.packages__footer}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.footer__content}>
            <h3>Need a Custom Solution?</h3>
            <p>We can create a tailored catering package that fits your specific requirements, budget, and schedule.</p>
            <Button variant="secondary" size="lg">
              Discuss Custom Options
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CateringPackages;