"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import styles from "./CorporateCleaningHero.module.scss";

const CorporateCleaningHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "/images/corporate/cp5.png",
    "/images/corporate/cp6.png",
    "/images/corporate/cp7.png",
  ];

  const stats = [
    { icon: <Shield size={24} />, number: "500+", label: "Corporate Clients" },
    {
      icon: <Clock size={24} />,
      number: "24/7",
      label: "Service Availability",
    },
    { icon: <Star size={24} />, number: "98%", label: "Client Satisfaction" },
  ];

  const highlights = [
    "ISO 9001 Certified Cleaning Standards",
    "Eco-Friendly & Non-Toxic Products",
    "Flexible Scheduling & Emergency Response",
    "Comprehensive Insurance Coverage",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className={styles.corporateCleaningHero}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className={styles.corporateCleaningHero__background}
          style={{
            backgroundImage: `url(${heroImages[currentSlide]})`,
          }}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className={styles.corporateCleaningHero__overlay} />
      <div className={styles.corporateCleaningHero__container}>
        <div className={styles.corporateCleaningHero__content}>
          {/* <motion.div
            className={styles.corporateCleaningHero__badge}
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
          >
            Professional Corporate Cleaning
          </motion.div> */}

          <motion.h1
            className={styles.corporateCleaningHero__title}
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            <span className={styles["corporateCleaningHero__title--accent"]}>
              Pristine
            </span>
            <span className={styles["corporateCleaningHero__title--main"]}>
              Corporate
              <br />
              Environments
            </span>
          </motion.h1>

          <motion.p
            className={styles.corporateCleaningHero__subtitle}
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            Maintain the highest standards of cleanliness and professionalism in
            your workplace with our comprehensive corporate cleaning solutions.
            From daily maintenance to specialized deep cleaning, we ensure your
            business environment reflects your commitment to excellence.
          </motion.p>
          {/* 
          <motion.div
            className={styles.corporateCleaningHero__highlights}
            initial="hidden"
            animate="visible"
            custom={3}
            variants={textVariants}
          >
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={styles.corporateCleaningHero__highlight}
              >
                <CheckCircle size={20} />
                <span>{highlight}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className={styles.corporateCleaningHero__cta}
            initial="hidden"
            animate="visible"
            custom={4}
            variants={textVariants}
          >
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
            >
              Get Free Assessment
            </Button>
            <Button
              variant="white"
              size="lg"
              rightIcon={<Calendar size={18} />}
            >
              Schedule Consultation
            </Button>
          </motion.div> */}
        </div>

        {/* <motion.div
          className={styles.corporateCleaningHero__stats}
          initial="hidden"
          animate="visible"
          custom={5}
          variants={textVariants}
        >
          {stats.map((stat, index) => (
            <div key={index} className={styles.corporateCleaningHero__stat}>
              <div className={styles.corporateCleaningHero__statIcon}>
                {stat.icon}
              </div>
              <div className={styles.corporateCleaningHero__statNumber}>
                {stat.number}
              </div>
              <div className={styles.corporateCleaningHero__statLabel}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div> */}
      </div>

      <div className={styles.corporateCleaningHero__indicators}>
        {heroImages.map((_, index) => (
          <span
            key={index}
            className={`${styles.corporateCleaningHero__indicator} ${
              index === currentSlide
                ? styles["corporateCleaningHero__indicator--active"]
                : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default CorporateCleaningHero;
