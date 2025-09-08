"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  FileText,
  AlertTriangle,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./ComplianceSafety.module.scss";

const ComplianceSafety: React.FC = () => {
  const complianceFeatures = [
    {
      icon: <Shield size={32} />,
      title: "Industry Compliance",
      description:
        "Full compliance with FDA, OSHA, and local health department regulations",
      items: [
        "FDA-approved methods",
        "OSHA safety standards",
        "Local health regulations",
        "Industry-specific protocols",
      ],
    },
    {
      icon: <FileText size={32} />,
      title: "Documentation & Reporting",
      description: "Comprehensive documentation for audits and inspections",
      items: [
        "Detailed service reports",
        "Pest activity monitoring",
        "Chemical usage logs",
        "Compliance certificates",
      ],
    },
    {
      icon: <Award size={32} />,
      title: "Certifications & Training",
      description: "Licensed technicians with ongoing professional development",
      items: [
        "State-licensed professionals",
        "Ongoing training programs",
        "Safety certification updates",
        "Quality assurance protocols",
      ],
    },
  ];

  const safetyMeasures = [
    "Non-toxic treatment options",
    "Child and pet-safe methods",
    "Proper chemical handling",
    "PPE protocols for staff",
    "Emergency response procedures",
    "Environmental protection measures",
  ];

  return (
    <section className={styles.complianceSafety}>
      <div className={styles.complianceSafety__container}>
        <motion.div
          className={styles.complianceSafety__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.complianceSafety__title}>
            Industry-Leading Safety Standards
          </h2>
          <p className={styles.complianceSafety__subtitle}>
            We maintain the highest standards of safety and compliance to
            protect your business, employees, and customers while meeting all
            regulatory requirements.
          </p>
        </motion.div>

        {/* <div className={styles.complianceSafety__grid}>
          {complianceFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.complianceCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.complianceCard__icon}>{feature.icon}</div>
              <h3 className={styles.complianceCard__title}>{feature.title}</h3>
              <p className={styles.complianceCard__description}>
                {feature.description}
              </p>
              <ul className={styles.complianceCard__items}>
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <CheckCircle size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div> */}

        <motion.div
          className={styles.complianceSafety__safety}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.safetyMeasures}>
            <div className={styles.safetyMeasures__header}>
              <AlertTriangle
                className={styles.safetyMeasures__icon}
                size={24}
              />
              <h3>Safety Measures</h3>
            </div>
            <div className={styles.safetyMeasures__grid}>
              {safetyMeasures.map((measure, index) => (
                <div key={index} className={styles.safetyMeasures__item}>
                  <CheckCircle size={16} />
                  <span>{measure}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.complianceSafety__cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button variant="primary" size="lg">
            Request Compliance Documentation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceSafety;
