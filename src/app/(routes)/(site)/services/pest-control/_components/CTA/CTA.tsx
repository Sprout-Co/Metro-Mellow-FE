"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import styles from "./CTA.module.scss";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.cta} id="cta" ref={ref}>
      <div className={styles.cta__container}>
        <motion.div
          className={styles.cta__content}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <h2 className={styles.cta__title}>
            Ready for a Pest-Free Environment?
          </h2>
          <p className={styles.cta__subtitle}>
            Schedule your professional pest control service today and enjoy
            peace of mind with our comprehensive solutions.
          </p>
          <div className={styles.cta__buttons}>
            <Link href="/bookings" className={styles.cta__button_primary}>
              Schedule Service
            </Link>
            <Link href="/contact" className={styles.cta__button_secondary}>
              Get a Quote
            </Link>
          </div>
          <div className={styles.cta__info}>
            <div className={styles.cta__info_item}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.cta__info_icon}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Satisfaction Guarantee</span>
            </div>
            <div className={styles.cta__info_item}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.cta__info_icon}
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Same-Day Service Available</span>
            </div>
            <div className={styles.cta__info_item}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.cta__info_icon}
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Eco-Friendly Methods</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
