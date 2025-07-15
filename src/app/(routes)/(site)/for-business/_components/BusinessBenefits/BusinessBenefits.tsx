"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { TrendingDown, Users, TrendingUp, ArrowRight } from "lucide-react";
import styles from "./BusinessBenefits.module.scss";

interface BenefitCardProps {
  icon: React.ReactNode;
  iconBgClass: string;
  title: string;
  description: string;
  metric: string;
  metricClass: string;
  delay: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  iconBgClass,
  title,
  description,
  metric,
  metricClass,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: delay,
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        yoyo: Infinity,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.benefitCard}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <motion.div
        className={`${styles.benefitCard__iconContainer} ${styles[iconBgClass]}`}
        variants={iconVariants}
        whileHover="hover"
      >
        {icon}
      </motion.div>

      <h3 className={styles.benefitCard__title}>{title}</h3>

      <p className={styles.benefitCard__description}>{description}</p>

      <div className={`${styles.benefitCard__metric} ${styles[metricClass]}`}>
        {metric}
      </div>

      <a href="#" className={styles.benefitCard__link}>
        Learn more{" "}
        <ArrowRight size={16} className={styles.benefitCard__linkIcon} />
      </a>
    </motion.div>
  );
};

const BusinessBenefits: React.FC = () => {
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

  const benefits = [
    {
      icon: <TrendingDown size={24} />,
      iconBgClass: "benefitCard__iconBg--success",
      title: "Cost Efficiency",
      description:
        "Reduce operational costs by up to 40% through optimized service delivery and resource allocation.",
      metric: "40%",
      metricClass: "benefitCard__metric--success",
      delay: 0.2,
    },
    {
      icon: <Users size={24} />,
      iconBgClass: "benefitCard__iconBg--secondary",
      title: "Employee Satisfaction",
      description:
        "Boost workplace morale and productivity with services that enhance employee well-being and comfort.",
      metric: "85%",
      metricClass: "benefitCard__metric--secondary",
      delay: 0.4,
    },
    {
      icon: <TrendingUp size={24} />,
      iconBgClass: "benefitCard__iconBg--primary",
      title: "Scalability",
      description:
        "Flexible solutions that grow with your business, from startups to enterprise-level operations.",
      metric: "∞",
      metricClass: "benefitCard__metric--primary",
      delay: 0.6,
    },
  ];

  return (
    <section ref={sectionRef} className={styles.businessBenefits}>
      <div className={styles.businessBenefits__container}>
        <motion.div
          className={styles.businessBenefits__header}
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
        >
          <span className={styles.businessBenefits__badge}>
            Business Benefits
          </span>
          <h2 className={styles.businessBenefits__title}>
            Why Leading Companies Choose{" "}
            <span className={styles.businessBenefits__highlight}>
              Metro Mellow
            </span>
          </h2>
          <p className={styles.businessBenefits__subtitle}>
            Transform your business operations with data-driven insights and
            proven results
          </p>
        </motion.div>

        <div className={styles.businessBenefits__grid}>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              iconBgClass={benefit.iconBgClass}
              title={benefit.title}
              description={benefit.description}
              metric={benefit.metric}
              metricClass={benefit.metricClass}
              delay={benefit.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessBenefits;
