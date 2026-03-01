"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./SubscribeBanner.module.scss";

export default function SubscribeBanner() {
  return (
    <section id="subscribe" className={styles.subscribeBanner}>
      <motion.div
        className={styles.subscribeBanner__inner}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.subscribeBanner__content}>
          <h2 className={styles.subscribeBanner__heading}>
            Subscribe &amp; save
          </h2>
          <p className={styles.subscribeBanner__desc}>
            Choose your meal line and delivery days. Pause or cancel anytime —
            no commitments.
          </p>
        </div>
        <div className={styles.subscribeBanner__plans}>
          <div className={styles.subscribeBanner__plan}>
            <span className={styles.subscribeBanner__planEmoji}>🍚</span>
            <span className={styles.subscribeBanner__planName}>Everyday</span>
            <span className={styles.subscribeBanner__planPrice}>
              from ₦2,000
              <span className={styles.subscribeBanner__planPer}>/meal</span>
            </span>
          </div>
          <div
            className={`${styles.subscribeBanner__plan} ${styles["subscribeBanner__plan--highlight"]}`}
          >
            <span className={styles.subscribeBanner__planEmoji}>🍲</span>
            <span className={styles.subscribeBanner__planName}>Swallow</span>
            <span className={styles.subscribeBanner__planPrice}>
              from ₦2,500
              <span className={styles.subscribeBanner__planPer}>/meal</span>
            </span>
          </div>
          <div className={styles.subscribeBanner__plan}>
            <span className={styles.subscribeBanner__planEmoji}>🥗</span>
            <span className={styles.subscribeBanner__planName}>Fit-Fam</span>
            <span className={styles.subscribeBanner__planPrice}>
              from ₦2,500
              <span className={styles.subscribeBanner__planPer}>/meal</span>
            </span>
          </div>
        </div>
        <Link href="#get-started" className={styles.subscribeBanner__cta}>
          Get started
        </Link>
      </motion.div>
    </section>
  );
}
