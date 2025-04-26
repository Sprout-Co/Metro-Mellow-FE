"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from "./Benefits.module.scss";

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefitsData: BenefitItem[] = [
  {
    title: "Health Protection",
    description:
      "Our pest control eliminates insects and rodents that carry diseases, protecting your family from health risks.",
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
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
  },
  {
    title: "Property Preservation",
    description:
      "Prevent structural damage to your property caused by termites, rodents, and other destructive pests.",
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
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    title: "Eco-Friendly Solutions",
    description:
      "Our treatments use environmentally responsible methods that are effective against pests but safe for your family.",
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
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    ),
  },
  {
    title: "Peace of Mind",
    description:
      "Enjoy a pest-free environment with our comprehensive solutions and ongoing preventative measures.",
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
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
  },
  {
    title: "Expert Technicians",
    description:
      "Our certified professionals have extensive training and experience in identifying and eliminating all types of pests.",
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
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
  },
  {
    title: "Customized Treatments",
    description:
      "We develop personalized pest control plans tailored to your specific property needs and pest issues.",
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
        <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
        <line x1="3" y1="22" x2="21" y2="22"></line>
      </svg>
    ),
  },
];

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
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
    <section className={styles.benefits} id="benefits" ref={ref}>
      <div className={styles.benefits__container}>
        <motion.div
          className={styles.benefits__content}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <span className={styles.benefits__badge}>WHY CHOOSE US</span>
          <h2 className={styles.benefits__title}>
            The Benefits of Our Professional Pest Control
          </h2>
          <p className={styles.benefits__subtitle}>
            Our expert pest control services provide numerous advantages beyond
            just eliminating bugs. We focus on long-term prevention, health
            protection, and environmental responsibility.
          </p>
        </motion.div>

        <motion.div
          className={styles.benefits__grid}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              className={styles.benefits__item}
              variants={fadeIn}
            >
              <div className={styles.benefits__item_icon}>{benefit.icon}</div>
              <h3 className={styles.benefits__item_title}>{benefit.title}</h3>
              <p className={styles.benefits__item_description}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.benefits__image}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/pest-control/benefits.jpg"
            alt="Pest control professional helping a family"
            width={600}
            height={400}
            className={styles.benefits__img}
          />
          <div className={styles.benefits__image_accent}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
