"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.scss";

const HERO_IMAGE = "/images/food/jollof-rice.png";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__inner}>
        <div className={styles.hero__content}>
          <motion.h1
            className={styles.hero__heading}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Wholesome, Flavourful,
            <br />
            <em>and made for you</em>
          </motion.h1>

          <motion.p
            className={styles.hero__desc}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Delicious food for every mood. Fresh meals made daily, delivered to
            your door in Lekki &amp; Island.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/metroeats/menu" className={styles.hero__cta}>
              Order now
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={styles.hero__imageWrap}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Fresh jollof rice - one of our signature dishes"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className={styles.hero__image}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
