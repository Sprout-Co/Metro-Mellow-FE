"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Headphones,
  Calendar,
  BarChart3,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import styles from "./EnterpriseFeatures.module.scss";

interface FeatureCardProps {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconClass,
  title,
  description,
  delay,
}) => {
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.featureCard}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div
        className={`${styles.featureCard__iconContainer} ${styles[iconClass]}`}
      >
        {icon}
      </div>

      <h3 className={styles.featureCard__title}>{title}</h3>

      <p className={styles.featureCard__description}>{description}</p>
    </motion.div>
  );
};

const EnterpriseFeatures: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerControls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          headerControls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [headerControls]);

  const headerVariants = {
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

  const features = [
    {
      icon: <Headphones size={24} />,
      iconClass: "featureCard__iconBg--primary",
      title: "Dedicated Account Manager",
      description: "Single point of contact for all your service needs",
      delay: 0.15,
    },
    {
      icon: <Calendar size={24} />,
      iconClass: "featureCard__iconBg--secondary",
      title: "Custom Scheduling",
      description: "Bulk booking and recurring service management",
      delay: 0.3,
    },
    {
      icon: <BarChart3 size={24} />,
      iconClass: "featureCard__iconBg--accent",
      title: "Reporting Dashboard",
      description: "Analytics and usage insights for data-driven decisions",
      delay: 0.45,
    },
    {
      icon: <CreditCard size={24} />,
      iconClass: "featureCard__iconBg--primary",
      title: "Billing Integration",
      description: "Seamless invoicing and payment processing",
      delay: 0.6,
    },
    {
      icon: <Shield size={24} />,
      iconClass: "featureCard__iconBg--secondary",
      title: "Quality Assurance",
      description: "Regular audits and performance monitoring",
      delay: 0.75,
    },
    {
      icon: <Clock size={24} />,
      iconClass: "featureCard__iconBg--accent",
      title: "24/7 Support",
      description: "Round-the-clock customer service and support",
      delay: 0.9,
    },
  ];

  return (
    <section ref={sectionRef} className={styles.enterpriseFeatures}>
      <div className={styles.enterpriseFeatures__container}>
        <motion.div
          className={styles.enterpriseFeatures__header}
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
        >
          <span className={styles.enterpriseFeatures__badge}>
            Enterprise Features
          </span>
          <h2 className={styles.enterpriseFeatures__title}>
            Powerful Platform{" "}
            <span className={styles.enterpriseFeatures__highlight}>
              Features
            </span>{" "}
            for Business Growth
          </h2>
          <p className={styles.enterpriseFeatures__subtitle}>
            Our enterprise platform delivers powerful tools designed
            specifically for businesses that need to manage services at scale
          </p>
        </motion.div>

        <div className={styles.enterpriseFeatures__grid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              iconClass={feature.iconClass}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseFeatures;
