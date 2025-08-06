"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, CheckCircle, Clock, Shield } from "lucide-react";
import styles from "./PestThreatAssessment.module.scss";

const PestThreatAssessment: React.FC = () => {
  return (
    <section className={styles.pestThreatAssessment}>
      <div className={styles.pestThreatAssessment__container}>
        <motion.div
          className={styles.pestThreatAssessment__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Comprehensive Pest Threat Assessment</h2>
          <p>
            Our expert team conducts thorough inspections to identify current
            infestations and potential risk factors, ensuring your business
            stays protected year-round.
          </p>
        </motion.div>

        <div className={styles.pestThreatAssessment__grid}>
          <motion.div
            className={styles.assessmentCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.assessmentCard__icon}>
              <AlertTriangle size={32} />
            </div>
            <h3>Risk Identification</h3>
            <p>
              Identify potential entry points, food sources, and breeding
              grounds that could attract pests to your facility.
            </p>
          </motion.div>

          <motion.div
            className={styles.assessmentCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.assessmentCard__icon}>
              <CheckCircle size={32} />
            </div>
            <h3>Compliance Check</h3>
            <p>
              Ensure your pest control measures meet industry standards and
              regulatory requirements for your business type.
            </p>
          </motion.div>

          <motion.div
            className={styles.assessmentCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.assessmentCard__icon}>
              <Clock size={32} />
            </div>
            <h3>Preventive Planning</h3>
            <p>
              Develop customized prevention strategies and maintenance schedules
              to keep pests at bay before they become a problem.
            </p>
          </motion.div>

          <motion.div
            className={styles.assessmentCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.assessmentCard__icon}>
              <Shield size={32} />
            </div>
            <h3>Ongoing Protection</h3>
            <p>
              Establish monitoring systems and regular inspection protocols to
              maintain a pest-free environment.
            </p>
          </motion.div>
        </div>

        <motion.div
          className={styles.pestThreatAssessment__cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button variant="primary" size="lg">
            Schedule Assessment
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PestThreatAssessment;
