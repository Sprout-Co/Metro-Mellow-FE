"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./LaundrySuds.module.scss";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon } from "lucide-react";

const LaundrySuds = () => {
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

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.suds}>
      <div className={styles.suds__container}>
        <div className={styles.suds__content}>
          <motion.div
            className={styles.suds__textContent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 className={styles.suds__title} variants={fadeIn}>
              <span className={styles.nowrap}>Suds away</span> the stress
            </motion.h2>

            <motion.p className={styles.suds__description} variants={fadeIn}>
              We scrub, fluff, and fold your fabrics to fresh, fabulous heights.
            </motion.p>

            <motion.div className={styles.suds__cta} variants={fadeIn}>
              <CTAButton
                href={Routes.GET_STARTED}
                size="lg"
                animationType="vibrate"
                animationIntensity="intense"
              >
                START LAUNDRY
                <ArrowRightIcon className={styles.icon} />
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={styles.suds__imageContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageVariant}
        >
          <div className={styles.suds__imageWrapper}>
            <Image
              src="/images/laundry/laundry-folding.jpg"
              alt="Laundry service with neatly folded clothes"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.suds__image}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaundrySuds;
