"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import styles from "./CateringCTA.module.scss";

const CateringCTA: React.FC = () => {
  return (
    <section className={styles.cateringCTA}>
      <div className={styles.cateringCTA__container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Elevate Your Corporate Dining?</h2>
          <p>Schedule a tasting session and discover our catering excellence</p>
          <Button variant="white" size="lg" rightIcon={<ArrowRight size={18} />}>
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CateringCTA;