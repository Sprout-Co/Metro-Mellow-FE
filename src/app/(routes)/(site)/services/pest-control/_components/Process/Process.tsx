"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Process.module.scss";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Inspection & Assessment",
    description:
      "Our certified technicians conduct a thorough inspection of your property to identify pest issues, entry points, and conducive conditions.",
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
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Customized Treatment Plan",
    description:
      "We develop a tailored pest control strategy based on the findings, your specific needs, and environmentally responsible practices.",
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
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Professional Treatment",
    description:
      "Our technicians implement the treatment plan using the latest techniques and eco-friendly products to eliminate pests effectively.",
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
    number: "04",
    title: "Prevention & Monitoring",
    description:
      "We implement preventative measures and provide regular follow-up visits to ensure long-term protection and pest-free living.",
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
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.process} id="process" ref={ref}>
      <div className={styles.process__container}>
        <div className={styles.process__header}>
          <span className={styles.process__badge}>OUR PROCESS</span>
          <h2 className={styles.process__title}>
            How We Eliminate Your Pest Problems
          </h2>
          <p className={styles.process__subtitle}>
            Our systematic approach ensures thorough pest elimination and
            long-term prevention, keeping your property pest-free and protecting
            your family's health and comfort.
          </p>
        </div>

        <motion.div
          className={styles.process__steps}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className={styles.process__step}
              variants={itemVariants}
            >
              <div className={styles.process__step_number}>{step.number}</div>
              <div className={styles.process__step_content}>
                <div className={styles.process__step_icon}>{step.icon}</div>
                <h3 className={styles.process__step_title}>{step.title}</h3>
                <p className={styles.process__step_description}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
