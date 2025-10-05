"use client";

import { motion } from "framer-motion";
import styles from "./ServiceHero.module.scss";
import { Routes } from "@/constants/routes";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { ArrowRightIcon } from "lucide-react";

interface ServiceHeroProps {
  backgroundImage: string;
  accentText: string;
  mainText: string;
  description: string;
  ctaText: string;
  ctaHref?: string;
  connectorText?: string;
  animationType?: "wobble" | "vibrate" | "heartbeat";
  animationIntensity?: "subtle" | "intense";
}

const ServiceHero = ({
  backgroundImage,
  accentText,
  mainText,
  description,
  ctaText,
  ctaHref = Routes.GET_STARTED,
  connectorText = "That",
  animationType = "wobble",
  animationIntensity = "intense",
}: ServiceHeroProps) => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

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

  const getButtonAnimation = () => {
    switch (animationType) {
      case "wobble":
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: "spring", stiffness: 400, damping: 17 },
        };
      case "vibrate":
        return {
          whileHover: { 
            x: [0, -2, 2, -2, 2, 0],
            transition: { duration: 0.3 }
          },
        };
      case "heartbeat":
        return {
          whileHover: { 
            scale: [1, 1.1, 1],
            transition: { duration: 0.3, repeat: 1 }
          },
        };
      default:
        return {};
    }
  };

  return (
    <section 
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.hero__overlay}></div>
      <div className={styles.hero__container}>
        <motion.div
          className={styles.hero__content}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className={styles.hero__title} variants={fadeIn}>
            <span className={styles["hero__title--accent"]}>{accentText}</span> {connectorText}
            {connectorText && <br />}
            <span className={styles["hero__title--main"]}>{mainText}</span>
          </motion.h1>

          <motion.p className={styles.hero__description} variants={fadeIn}>
            {description}
          </motion.p>

          <motion.div className={styles.hero__cta} variants={fadeIn}>
            <CTAButton
              href={ctaHref}
              size="lg"
              animationType={animationType}
              animationIntensity={animationIntensity}
              rightIcon={<ArrowRightIcon size={18} />}
              {...getButtonAnimation()}
            >
              {ctaText}
            </CTAButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHero;