import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import styles from "./CTASection.module.scss";
import ServiceAccordion from "@/components/ui/ServiceAccordion";

const CTASection: React.FC = () => {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.minimalLayout}>
        {/* Services Column */}
        <div className={styles.servicesWrapper}>
          <div className={styles.header}>
            <h2 className={styles.header__title}>Book a Service</h2>
            <p className={styles.header__subtitle}>
              Select a service to explore available options
            </p>
          </div>

          <ServiceAccordion />
        </div>

        {/* Subscription Sidebar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={styles.subscriptionBanner}>
            <div className={styles.subscriptionContent}>
              <h3 className={styles.subscriptionContent__title}>
                Save with Subscription
              </h3>
              <p className={styles.subscriptionContent__description}>
                Monthly plans from ₦25,000 and enjoy 30% savings on all services
              </p>
              <div className={styles.subscriptionContent__benefits}>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>Priority booking</span>
                </div>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>10% discount</span>
                </div>
                <div className={styles.subscriptionContent__benefit}>
                  <Check size={14} />
                  <span>Free consultations</span>
                </div>
              </div>
            </div>
            <div className={styles.subscriptionAction}>
              <Link href="/dashboard/subscriptions">
                <motion.button
                  className={styles.subscriptionAction__button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={16} />
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
