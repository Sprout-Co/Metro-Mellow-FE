"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Bug, Shield, Zap, Leaf, Target } from "lucide-react";
import styles from "./PestSolutions.module.scss";

const PestSolutions: React.FC = () => {
  return (
    <section className={styles.pestSolutions}>
      <div className={styles.pestSolutions__container}>
        <motion.div
          className={styles.pestSolutions__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Comprehensive Pest Control Solutions</h2>
          <p>
            From preventive treatments to targeted elimination, we offer a full
            range of commercial pest control solutions tailored to your specific
            needs and industry requirements.
          </p>
        </motion.div>

        <div className={styles.pestSolutions__grid}>
          <motion.div
            className={styles.solutionCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className={styles.solutionCard__icon}>
              <Shield size={32} />
            </div>
            <h3>Preventive Treatments</h3>
            <p>
              Regular barrier treatments and monitoring to prevent pest
              infestations before they become a problem.
            </p>
            <ul className={styles.solutionCard__features}>
              <li>Barrier sprays and treatments</li>
              <li>Regular monitoring and inspections</li>
              <li>Preventive maintenance schedules</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.solutionCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.solutionCard__icon}>
              <Target size={32} />
            </div>
            <h3>Targeted Elimination</h3>
            <p>
              Specialized treatments for specific pest types, ensuring complete
              eradication with minimal disruption.
            </p>
            <ul className={styles.solutionCard__features}>
              <li>Rodent control and exclusion</li>
              <li>Insect and arachnid treatments</li>
              <li>Bird and wildlife management</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.solutionCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.solutionCard__icon}>
              <Leaf size={32} />
            </div>
            <h3>Eco-Friendly Options</h3>
            <p>
              Environmentally responsible pest control solutions that are safe
              for your staff, customers, and the environment.
            </p>
            <ul className={styles.solutionCard__features}>
              <li>Green pest control methods</li>
              <li>Non-toxic treatment options</li>
              <li>Integrated pest management</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.solutionCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.solutionCard__icon}>
              <Zap size={32} />
            </div>
            <h3>Emergency Response</h3>
            <p>
              Rapid response services for urgent pest situations, available 24/7
              to protect your business immediately.
            </p>
            <ul className={styles.solutionCard__features}>
              <li>24/7 emergency hotline</li>
              <li>Same-day response guarantee</li>
              <li>Immediate containment measures</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.solutionCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className={styles.solutionCard__icon}>
              <Shield size={32} />
            </div>
            <h3>Compliance & Safety</h3>
            <p>
              Ensure your pest control measures meet all industry standards and
              regulatory requirements.
            </p>
            <ul className={styles.solutionCard__features}>
              <li>Regulatory compliance</li>
              <li>Safety documentation</li>
              <li>Audit preparation support</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.solutionCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.solutionCard__icon}>
              <Bug size={32} />
            </div>
            <h3>Custom Programs</h3>
            <p>
              Tailored pest control programs designed specifically for your
              industry, facility type, and unique challenges.
            </p>
            <ul className={styles.solutionCard__features}>
              <li>Industry-specific solutions</li>
              <li>Custom treatment schedules</li>
              <li>Ongoing program optimization</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className={styles.pestSolutions__cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button variant="primary" size="lg">
            Get Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PestSolutions;
