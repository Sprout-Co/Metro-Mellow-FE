"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ParfaitCTA.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";
import { Button } from "@/components/ui/Button/Button";
import { Clock } from "lucide-react";

const ParfaitCTA: React.FC = () => {
  return (
    <section className={styles["parfait-cta"]}>
      <div className={styles["parfait-cta__container"]}>
        <motion.div
          className={styles["parfait-cta__content"]}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles["parfait-cta__title"]}>
            Ready to Start Your Parfait Journey?
          </h2>
          <p className={styles["parfait-cta__subtitle"]}>
            Join thousands of happy customers enjoying fresh, customized
            parfaits delivered daily
          </p>
          <div className={styles["parfait-cta__buttons"]}>
            <Button variant="secondary" size="lg" disabled>
              <Clock size={16} style={{ marginRight: "8px" }} />
              Coming Soon
            </Button>
            <CTAButton variant="secondary" size="lg" href="#menu">
              View Menu
            </CTAButton>
          </div>
        </motion.div>
        <div className={styles["parfait-cta__decorations"]}>
          <motion.span
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🍓
          </motion.span>
          <motion.span
            animate={{
              rotate: [0, -360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🫐
          </motion.span>
          <motion.span
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            🥭
          </motion.span>
        </div>
      </div>
    </section>
  );
};

export default ParfaitCTA;
