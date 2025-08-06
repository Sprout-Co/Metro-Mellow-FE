"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Clock, Zap, MapPin, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./EmergencyResponse.module.scss";

const EmergencyResponse: React.FC = () => {
  const responseFeatures = [
    {
      icon: <Clock size={32} />,
      title: "24/7 Availability",
      description:
        "Round-the-clock emergency response team ready to act immediately",
      stats: "Average response time: 2 hours",
    },
    {
      icon: <Zap size={32} />,
      title: "Rapid Deployment",
      description: "Specialized emergency vehicles and equipment on standby",
      stats: "Same-day service guarantee",
    },
    {
      icon: <Shield size={32} />,
      title: "Crisis Management",
      description:
        "Expert assessment and immediate containment of pest emergencies",
      stats: "99.8% crisis resolution rate",
    },
    {
      icon: <MapPin size={32} />,
      title: "Wide Coverage",
      description: "Emergency response available across all service areas",
      stats: "50+ mile response radius",
    },
  ];

  const emergencyTypes = [
    "Sudden pest infestations",
    "Health department violations",
    "Customer complaint emergencies",
    "Pre-inspection urgent cleanup",
    "Seasonal pest surges",
    "Post-construction pest issues",
  ];

  return (
    <section className={styles.emergencyResponse}>
      <div className={styles.emergencyResponse__container}>
        <motion.div
          className={styles.emergencyResponse__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.emergencyResponse__badge}>
            Emergency Response
          </span>
          <h2 className={styles.emergencyResponse__title}>
            When You Need Us Most, We're There
          </h2>
          <p className={styles.emergencyResponse__subtitle}>
            Pest emergencies don't wait for business hours. Our dedicated
            emergency response team is available 24/7 to protect your business
            reputation and ensure immediate resolution.
          </p>
        </motion.div>

        <div className={styles.emergencyResponse__content}>
          <div className={styles.emergencyResponse__features}>
            {responseFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.responseCard}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={styles.responseCard__icon}>{feature.icon}</div>
                <div className={styles.responseCard__content}>
                  <h3 className={styles.responseCard__title}>
                    {feature.title}
                  </h3>
                  <p className={styles.responseCard__description}>
                    {feature.description}
                  </p>
                  <span className={styles.responseCard__stats}>
                    {feature.stats}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.emergencyResponse__cta}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.emergencyCTA}>
              <div className={styles.emergencyCTA__alert}>
                <AlertTriangle size={48} />
                <div className={styles.emergencyCTA__content}>
                  <h3>Pest Emergency?</h3>
                  <p>
                    Don't wait - call our emergency hotline now for immediate
                    assistance
                  </p>
                </div>
              </div>
              <div className={styles.emergencyCTA__contact}>
                <div className={styles.emergencyCTA__phone}>
                  <Phone size={24} />
                  <div>
                    <span className={styles.emergencyCTA__label}>
                      Emergency Hotline
                    </span>
                    <span className={styles.emergencyCTA__number}>
                      1-800-PEST-911
                    </span>
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="lg"
                  rightIcon={<Phone size={18} />}
                >
                  Call Emergency Line
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.emergencyResponse__types}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3>Emergency Situations We Handle</h3>
          <div className={styles.emergencyTypes}>
            {emergencyTypes.map((type, index) => (
              <div key={index} className={styles.emergencyType}>
                <AlertTriangle size={16} />
                {type}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergencyResponse;
