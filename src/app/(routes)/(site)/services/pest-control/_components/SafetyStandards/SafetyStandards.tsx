"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from "./SafetyStandards.module.scss";

interface SafetyItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const safetyItems: SafetyItem[] = [
  {
    title: "EPA-Approved Products",
    description:
      "We only use products that have been thoroughly tested and approved by the Environmental Protection Agency.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
  },
  {
    title: "Child & Pet Safe",
    description:
      "Our methods prioritize the safety of all family members, including children and pets.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3"></path>
        <path d="M21 13V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v7"></path>
        <rect x="14" y="17" width="7" height="5" rx="1"></rect>
      </svg>
    ),
  },
  {
    title: "Integrated Pest Management",
    description:
      "We employ a holistic approach that minimizes chemical use through prevention and non-chemical methods when possible.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 12h-6"></path>
        <path d="M8 12h.01"></path>
      </svg>
    ),
  },
  {
    title: "Certified Technicians",
    description:
      "Our team is fully licensed, insured, and receives ongoing training in the latest safety protocols.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="5" width="16" height="16" rx="2"></rect>
        <path d="M16 2v4"></path>
        <path d="M8 2v4"></path>
        <path d="M4 10h16"></path>
      </svg>
    ),
  },
];

const SafetyStandards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.safety} id="safety" ref={ref}>
      <div className={styles.safety__container}>
        <div className={styles.safety__content}>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className={styles.safety__header}
          >
            <span className={styles.safety__badge}>SAFETY FIRST</span>
            <h2 className={styles.safety__title}>Our Commitment to Safety</h2>
            <p className={styles.safety__subtitle}>
              Safety is our top priority. We implement rigorous standards to
              ensure our pest control treatments are effective while protecting
              your family, pets, and the environment.
            </p>
          </motion.div>

          <motion.div
            className={styles.safety__image_mobile}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <Image
              src="/images/pest-control/safety.jpg"
              alt="Pest control technician applying safe treatments"
              width={500}
              height={350}
              className={styles.safety__img_mobile}
            />
          </motion.div>

          <div className={styles.safety__items}>
            {safetyItems.map((item, index) => (
              <motion.div
                key={index}
                className={styles.safety__item}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.safety__item_icon}>{item.icon}</div>
                <div className={styles.safety__item_content}>
                  <h3 className={styles.safety__item_title}>{item.title}</h3>
                  <p className={styles.safety__item_description}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className={styles.safety__image}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeLeft}
        >
          <Image
            src="/images/pest-control/safety.jpg"
            alt="Pest control technician applying safe treatments"
            width={600}
            height={700}
            className={styles.safety__img}
          />
          <div className={styles.safety__image_accent}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default SafetyStandards;
