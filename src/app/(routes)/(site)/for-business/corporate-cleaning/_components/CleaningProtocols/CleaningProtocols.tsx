"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Shield,
  CheckCircle,
  Clock,
  Users,
  Droplets,
  Zap,
  Leaf,
  Award,
} from "lucide-react";
import styles from "./CleaningProtocols.module.scss";

interface ProtocolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: string[];
  colorScheme: "primary" | "secondary" | "accent" | "success";
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({
  icon,
  title,
  description,
  steps,
  colorScheme,
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
      { threshold: 0.2 }
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

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.protocolCard} ${styles[`protocolCard--${colorScheme}`]}`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <div className={`${styles.protocolCard__iconContainer} ${styles[`protocolCard__iconContainer--${colorScheme}`]}`}>
        {icon}
      </div>
      <h3 className={styles.protocolCard__title}>{title}</h3>
      <p className={styles.protocolCard__description}>{description}</p>
      
      <div className={styles.protocolCard__steps}>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={styles.protocolCard__step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
          >
            <CheckCircle size={16} />
            <span>{step}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const CleaningProtocols: React.FC = () => {
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

  const protocols = [
    {
      icon: <Shield size={32} />,
      title: "Health & Safety Standards",
      description: "Comprehensive health and safety protocols ensuring the wellbeing of your employees and visitors.",
      steps: [
        "COVID-19 sanitization protocols",
        "OSHA compliance procedures",
        "Personal protective equipment",
        "Chemical safety protocols",
      ],
      colorScheme: "primary" as const,
    },
    {
      icon: <Droplets size={32} />,
      title: "Deep Sanitization Process",
      description: "Advanced sanitization techniques using hospital-grade disinfectants and equipment.",
      steps: [
        "Electrostatic spray disinfection",
        "High-touch surface treatment",
        "Air purification systems",
        "UV-C light sanitization",
      ],
      colorScheme: "secondary" as const,
    },
    {
      icon: <Leaf size={32} />,
      title: "Eco-Friendly Approach",
      description: "Environmentally responsible cleaning using green products and sustainable practices.",
      steps: [
        "Non-toxic cleaning products",
        "Biodegradable chemicals",
        "Water conservation methods",
        "Waste reduction programs",
      ],
      colorScheme: "success" as const,
    },
    {
      icon: <Award size={32} />,
      title: "Quality Assurance",
      description: "Rigorous quality control measures to ensure consistent, exceptional cleaning results.",
      steps: [
        "Multi-point inspections",
        "Client feedback systems",
        "Performance tracking",
        "Continuous improvement",
      ],
      colorScheme: "accent" as const,
    },
  ];

  const certifications = [
    {
      icon: <Award size={24} />,
      title: "ISO 9001:2015",
      description: "Quality Management Systems",
    },
    {
      icon: <Shield size={24} />,
      title: "ISSA Certified",
      description: "International Sanitary Supply Association",
    },
    {
      icon: <Leaf size={24} />,
      title: "Green Seal Certified",
      description: "Environmental Sustainability",
    },
    {
      icon: <Users size={24} />,
      title: "OSHA Compliant",
      description: "Occupational Safety Standards",
    },
  ];

  return (
    <section ref={sectionRef} className={styles.cleaningProtocols}>
      <div className={styles.cleaningProtocols__container}>
        <motion.div
          className={styles.cleaningProtocols__header}
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
        >
          <span className={styles.cleaningProtocols__badge}>
            Industry-Leading Standards
          </span>
          <h2 className={styles.cleaningProtocols__title}>
            <span className={styles.cleaningProtocols__highlight}>
              Proven
            </span>{" "}
            Cleaning Protocols & Standards
          </h2>
          <p className={styles.cleaningProtocols__subtitle}>
            Our systematic approach ensures consistent, exceptional results while
            maintaining the highest standards of health, safety, and environmental
            responsibility
          </p>
        </motion.div>

        <div className={styles.cleaningProtocols__grid}>
          {protocols.map((protocol, index) => (
            <ProtocolCard
              key={index}
              icon={protocol.icon}
              title={protocol.title}
              description={protocol.description}
              steps={protocol.steps}
              colorScheme={protocol.colorScheme}
            />
          ))}
        </div>

        <motion.div
          className={styles.cleaningProtocols__certifications}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.cleaningProtocols__certificationsTitle}>
            Our Certifications & Compliance
          </h3>
          <div className={styles.cleaningProtocols__certificationsGrid}>
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className={styles.cleaningProtocols__certification}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className={styles.cleaningProtocols__certificationIcon}>
                  {cert.icon}
                </div>
                <div className={styles.cleaningProtocols__certificationContent}>
                  <h4>{cert.title}</h4>
                  <p>{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CleaningProtocols;