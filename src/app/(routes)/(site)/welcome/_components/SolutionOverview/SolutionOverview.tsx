"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import {
  ChefHat,
  Sparkles,
  Shirt,
  Shield,
  Smartphone,
  Users,
  MapPin,
  Clock,
} from "lucide-react";
import styles from "./SolutionOverview.module.scss";

const SolutionOverview: FC = () => {
  const services = [
    {
      icon: ChefHat,
      title: "Professional Cooking",
      description:
        "Expert chefs prepare fresh, nutritious meals from our curated menu using quality ingredients, delivered to your doorstep on a subscription basis.",
      features: [
        "Curated menu selection",
        "Subscription-based delivery",
        "Fresh ingredients",
      ],
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description:
        "Thorough cleaning services that leave your home spotless and sanitized by trained professionals.",
      features: [
        "Eco-friendly products",
        "Insurance coverage",
        "Flexible scheduling",
      ],
    },
    {
      icon: Shirt,
      title: "Laundry & Care",
      description:
        "Professional laundry services including washing, ironing, and garment care for all fabric types.",
      features: ["Pickup & delivery", "Fabric specialists", "Quick turnaround"],
    },
    {
      icon: Shield,
      title: "Pest Control",
      description:
        "Safe, effective pest management solutions to protect your home and family from unwanted visitors.",
      features: [
        "Child-safe treatments",
        "Preventive solutions",
        "Regular maintenance",
      ],
    },
  ];

  const benefits = [
    {
      icon: Smartphone,
      title: "Technology-Driven",
      description:
        "Book, track, and manage services through our intuitive mobile app with real-time updates.",
    },
    {
      icon: Users,
      title: "Vetted Professionals",
      description:
        "All service providers undergo rigorous background checks and professional training.",
    },
    {
      icon: MapPin,
      title: "Local Coverage",
      description:
        "Starting in Lagos and Abuja, expanding to serve more Nigerian cities soon.",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "Services available when you need them, including evenings and weekends.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.solutionOverview}>
      <div className={styles.solutionOverview__container}>
        <motion.div
          className={styles.solutionOverview__header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <h2 className={styles.solutionOverview__title}>
            <span className={styles["solutionOverview__title--accent"]}>
              Introducing
            </span>
            <span className={styles["solutionOverview__title--main"]}>
              Metromellow
            </span>
          </h2>
          <p className={styles.solutionOverview__subtitle}>
            Your all-in-one platform for premium home services. We're building
            the future of household management, combining professional expertise
            with cutting-edge technology.
          </p>
        </motion.div>

        <div className={styles.solutionOverview__services}>
          <motion.h3
            className={styles.solutionOverview__sectionTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={titleVariants}
          >
            Our Services
          </motion.h3>

          <motion.div
            className={styles.solutionOverview__serviceGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={styles.solutionOverview__serviceCard}
                variants={itemVariants}
              >
                <div className={styles.solutionOverview__serviceHeader}>
                  <div className={styles.solutionOverview__serviceIcon}>
                    <service.icon />
                  </div>
                  <h4 className={styles.solutionOverview__serviceTitle}>
                    {service.title}
                  </h4>
                </div>
                <p className={styles.solutionOverview__serviceDescription}>
                  {service.description}
                </p>
                <ul className={styles.solutionOverview__serviceFeatures}>
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={styles.solutionOverview__serviceFeature}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className={styles.solutionOverview__benefits}>
          <motion.h3
            className={styles.solutionOverview__sectionTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={titleVariants}
          >
            Why Choose Metromellow?
          </motion.h3>

          <motion.div
            className={styles.solutionOverview__benefitGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={styles.solutionOverview__benefitCard}
                variants={itemVariants}
              >
                <div className={styles.solutionOverview__benefitIcon}>
                  <benefit.icon />
                </div>
                <h4 className={styles.solutionOverview__benefitTitle}>
                  {benefit.title}
                </h4>
                <p className={styles.solutionOverview__benefitDescription}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.solutionOverview__launch}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <h3 className={styles.solutionOverview__launchTitle}>
            Launching Q3 2025
          </h3>
          <p className={styles.solutionOverview__launchText}>
            We're putting the finishing touches on Metromellow to ensure you get
            the best possible experience from day one. Join our waitlist to be
            among the first to experience the future of home services.
          </p>
          <div className={styles.solutionOverview__launchBadge}>
            <span>Lagos</span>
            <span>Abuja</span>
            <span>More cities soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionOverview;
