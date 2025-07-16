"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Building2,
  ChefHat,
  Shirt,
  Bug,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./EnterpriseServices.module.scss";

interface ServiceCardProps {
  icon: React.ReactNode;
  iconClass: string;
  category: string;
  categoryClass: string;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  iconClass,
  category,
  categoryClass,
  title,
  description,
  features,
  ctaText,
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
      className={styles.serviceCard}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <div
        className={`${styles.serviceCard__iconContainer} ${styles[iconClass]}`}
      >
        {icon}
      </div>

      <span
        className={`${styles.serviceCard__category} ${styles[categoryClass]}`}
      >
        {category}
      </span>

      <h3 className={styles.serviceCard__title}>{title}</h3>

      <p className={styles.serviceCard__description}>{description}</p>

      <ul className={styles.serviceCard__features}>
        {features.map((feature, index) => (
          <li key={index} className={styles.serviceCard__feature}>
            <CheckCircle
              size={16}
              className={styles.serviceCard__featureIcon}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant="primary"
        size="md"
        rightIcon={<ArrowRight size={16} />}
        className={styles.serviceCard__cta}
      >
        {ctaText}
      </Button>
    </motion.div>
  );
};

const EnterpriseServices: React.FC = () => {
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

  const services = [
    {
      icon: <Building2 size={24} />,
      iconClass: "serviceCard__iconBg--primary",
      category: "Facility Services",
      categoryClass: "serviceCard__category--primary",
      title: "Corporate Cleaning",
      description:
        "Professional cleaning services for corporate environments to maintain a pristine workspace.",
      features: [
        "Office spaces",
        "Meeting rooms",
        "Common areas",
        "Sanitization protocols",
      ],
      ctaText: "Learn More",
      delay: 0.15,
    },
    {
      icon: <ChefHat size={24} />,
      iconClass: "serviceCard__iconBg--secondary",
      category: "Food Services",
      categoryClass: "serviceCard__category--secondary",
      title: "Catering & Meal Services",
      description:
        "Delicious and nutritious meal solutions for your workplace and corporate events.",
      features: [
        "Employee meals",
        "Corporate events",
        "Client hospitality",
        "Dietary accommodations",
      ],
      ctaText: "Learn More",
      delay: 0.3,
    },
    {
      icon: <Shirt size={24} />,
      iconClass: "serviceCard__iconBg--accent",
      category: "Apparel Services",
      categoryClass: "serviceCard__category--accent",
      title: "Laundry & Uniform Management",
      description:
        "Complete uniform and laundry solutions to keep your team looking professional.",
      features: [
        "Professional attire",
        "Uniform maintenance",
        "Dry cleaning",
        "Express service",
      ],
      ctaText: "Learn More",
      delay: 0.45,
    },
    {
      icon: <Bug size={24} />,
      iconClass: "serviceCard__iconBg--neutral",
      category: "Pest Control",
      categoryClass: "serviceCard__category--neutral",
      title: "Commercial Pest Management",
      description:
        "Comprehensive pest control solutions to maintain a safe and hygienic workplace environment.",
      features: [
        "Regular inspections",
        "Preventive treatments",
        "Emergency response",
        "Eco-friendly solutions",
      ],
      ctaText: "Learn More",
      delay: 0.6,
    },
  ];

  return (
    <section ref={sectionRef} className={styles.enterpriseServices}>
      <div className={styles.enterpriseServices__container}>
        <motion.div
          className={styles.enterpriseServices__header}
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
        >
          <span className={styles.enterpriseServices__badge}>
            Enterprise Services
          </span>
          <h2 className={styles.enterpriseServices__title}>
            Comprehensive{" "}
            <span className={styles.enterpriseServices__highlight}>
              Solutions
            </span>{" "}
            for Every Business Need
          </h2>
          <p className={styles.enterpriseServices__subtitle}>
            From daily operations to special events, we provide end-to-end
            service management
          </p>
        </motion.div>

        <div className={styles.enterpriseServices__grid}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              iconClass={service.iconClass}
              category={service.category}
              categoryClass={service.categoryClass}
              title={service.title}
              description={service.description}
              features={service.features}
              ctaText={service.ctaText}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseServices;
