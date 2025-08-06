"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import styles from "./CustomCTA.module.scss";

const CustomCTA: React.FC = () => {
  return (
    <section className={styles.customCTA}>
      <div className={styles.customCTA__container}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Ready to Build Your Custom Solution?</h2>
          <p>Let's create a tailored service package that fits your business perfectly</p>
          <Button variant="white" size="lg" rightIcon={<ArrowRight size={18} />}>
            Start Building
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomCTA;