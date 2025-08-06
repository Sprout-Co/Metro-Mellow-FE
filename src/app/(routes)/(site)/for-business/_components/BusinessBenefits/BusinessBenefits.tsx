"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { TrendingDown, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./BusinessBenefits.module.scss";

interface StatCardProps {
  icon: React.ReactNode;
  iconBgClass: string;
  title: string;
  description: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBgClass,
  title,
  description,
  delay,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

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

  return (
    <motion.div
      ref={cardRef}
      className={styles.statCard}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      <div className={styles.statCard__header}>
        <motion.div
          className={`${styles.statCard__iconContainer} ${styles[iconBgClass]}`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {icon}
        </motion.div>
        
        <h3 className={styles.statCard__title}>{title}</h3>
      </div>

      <div className={styles.statCard__content}>
        <p className={styles.statCard__description}>{description}</p>
      </div>

      <a href="#" className={styles.statCard__link}>
        Learn more{" "}
        <ArrowRight size={16} className={styles.statCard__linkIcon} />
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

  const stats = [
    {
      icon: <TrendingDown size={24} />,
      iconBgClass: "statCard__iconBg--success",
      title: "Cost Efficiency",
      description:
        "Reduce operational costs by up to 40% through optimized service delivery and resource allocation.",
      delay: 0.2,
    },
    {
      icon: <Users size={24} />,
      iconBgClass: "statCard__iconBg--secondary",
      title: "Employee Satisfaction",
      description:
        "Boost workplace morale and productivity with services that enhance employee well-being and comfort.",
      delay: 0.4,
    },
    {
      icon: <TrendingUp size={24} />,
      iconBgClass: "statCard__iconBg--primary",
      title: "Scalability",
      description:
        "Flexible solutions that grow with your business, from startups to enterprise-level operations.",
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
              Metromellow
            </span>
          </h2>
          <p className={styles.businessBenefits__subtitle}>
            Transform your business operations with data-driven insights and
            proven results
          </p>
        </motion.div>

        <div className={styles.businessBenefits__grid}>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              iconBgClass={stat.iconBgClass}
              title={stat.title}
              description={stat.description}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessBenefits;
