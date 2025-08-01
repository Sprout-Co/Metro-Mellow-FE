"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import styles from "./CleaningCTA.module.scss";

const CleaningCTA: React.FC = () => {
  return (
    <section className={styles.cleaningCTA}>
      <div className={styles.cleaningCTA__container}>
        <motion.div
          className={styles.cleaningCTA__content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.cleaningCTA__title}>
            Ready to Transform Your Workplace?
          </h2>
          <p className={styles.cleaningCTA__subtitle}>
            Get a free consultation and customized cleaning plan for your business
          </p>
          <div className={styles.cleaningCTA__buttons}>
            <Button
              variant="white"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
            >
              Get Free Quote
            </Button>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<Phone size={18} />}
            >
              Call Now
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CleaningCTA;