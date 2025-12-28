"use client";

import { motion } from "framer-motion";
import styles from "./CleaningPromoSection.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon } from "lucide-react";

const CleaningPromoSection = ({ onCTAClick }: { onCTAClick: () => void }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className={styles.promo}>
      <div className={styles.promo__container}>
        <motion.div
          className={styles.promo__content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.promo__title} variants={fadeIn}>
            Choose Your
            <br />
            <span className={styles["promo__title--accent"]}>Clean Scene</span>
          </motion.h2>

          <motion.p className={styles.promo__description} variants={fadeIn}>
            Professional cleaning service in Lagos. Standard, deep,
            move-in/move-out cleaning—we tailor to your space and needs. Serving
            all major areas across Lagos State.
          </motion.p>

          <motion.div className={styles.promo__cta} variants={fadeIn}>
            <CTAButton
              onClick={onCTAClick}
              size="lg"
              animationType="pulse"
              animationIntensity="intense"
            >
              START CLEANING
              <ArrowRightIcon className={styles.icon} />
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CleaningPromoSection;
