"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HeroSection.module.scss";

const SLIDESHOW_IMAGES = [
  "/images/food/jollof-rice.png",
  "/images/food/amala-ewedu.png",
  "/images/food/egusi-fufu.png",
  "/images/food/food-hero.jpg",
  "/images/food/f1.png",
  "/images/food/f2.png",
];

const SLIDE_INTERVAL_MS = 4500;

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.hero__slideshow}>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={currentIndex}
            className={styles.hero__slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={SLIDESHOW_IMAGES[currentIndex]}
              alt=""
              fill
              sizes="100vw"
              className={styles.hero__slideImage}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.hero__backdrop} aria-hidden />
      <div className={styles.hero__inner}>
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__heading}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Real food,
            <br />
            <em>real good</em>
          </motion.h1>

          <motion.p
            className={styles.hero__desc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Homestyle Nigerian meals cooked fresh every day. We deliver to Lekki,
            Victoria Island &amp; environs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/metroeats/menu" className={styles.hero__cta}>
              Browse menu
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
