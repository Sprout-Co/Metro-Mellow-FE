"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import styles from "./Hero.module.scss";

const Hero = () => {
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
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <motion.div
          className={styles.hero__content}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 className={styles.hero__title} variants={fadeIn}>
            Professional Pest Control <span>For Your Peace of Mind</span>
          </motion.h1>

          <motion.p className={styles.hero__description} variants={fadeIn}>
            Safe, effective, and eco-friendly pest management solutions for
            homes and businesses. Our expert technicians eliminate pests while
            protecting your family, pets, and the environment.
          </motion.p>

          <motion.div className={styles.hero__buttons} variants={fadeIn}>
            <Button variant="primary" size="lg" href="/bookings">
              Schedule Inspection
            </Button>
            <Button variant="secondary" size="lg" href="#services">
              Our Services
            </Button>
          </motion.div>

          <motion.div className={styles.hero__stats} variants={fadeIn}>
            <div className={styles.hero__stat}>
              <span className={styles["hero__stat-number"]}>99%</span>
              <span className={styles["hero__stat-text"]}>Success Rate</span>
            </div>
            <div className={styles.hero__stat}>
              <span className={styles["hero__stat-number"]}>4.9</span>
              <span className={styles["hero__stat-text"]}>Customer Rating</span>
            </div>
            <div className={styles.hero__stat}>
              <span className={styles["hero__stat-number"]}>24/7</span>
              <span className={styles["hero__stat-text"]}>
                Emergency Service
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.hero__image}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            },
          }}
        >
          <Image
            src="/images/pest-control/hero.jpg"
            alt="Professional pest control technician in protective gear"
            width={600}
            height={700}
            priority
            className={styles["hero__image-main"]}
          />
          <div className={styles["hero__image-accent"]}></div>
        </motion.div>
      </div>

      <div className={styles.hero__scroll}>
        <a href="#about">
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12L12 19L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
