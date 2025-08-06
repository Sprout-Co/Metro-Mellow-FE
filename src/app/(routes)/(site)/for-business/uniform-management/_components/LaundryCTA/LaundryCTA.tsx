"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import styles from "./LaundryCTA.module.scss";

const LaundryCTA: React.FC = () => {
  return (
    <section className={styles.laundryCTA}>
      <div className={styles.laundryCTA__container}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Ready to Upgrade Your Corporate Laundry?</h2>
          <p>Schedule a consultation and see the difference professional care makes</p>
          <Button variant="white" size="lg" rightIcon={<ArrowRight size={18} />}>
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LaundryCTA;