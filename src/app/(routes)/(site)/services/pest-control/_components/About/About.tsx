"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import styles from "./About.module.scss";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "5000+", label: "Properties Protected" },
  { value: "24/7", label: "Emergency Service" },
  { value: "100%", label: "Eco-friendly Methods" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.about__pattern}></div>

      <div className={styles.about__container}>
        <motion.div
          className={styles.about__imageWrapper}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        >
          <div className={styles.about__imageMain}>
            <Image
              src="/images/pest-control/about-main.jpg"
              alt="Professional pest control technician inspecting a property"
              width={500}
              height={600}
              className={styles.about__image}
            />
            <div className={styles.about__imageShadow}></div>
          </div>

          <div className={styles.about__imageSecondary}>
            <Image
              src="/images/pest-control/about-detail.jpg"
              alt="Close-up of pest control equipment"
              width={250}
              height={250}
              className={styles.about__imageSmall}
            />
          </div>

          <div className={styles.about__experience}>
            <span className={styles.about__experienceYears}>15+</span>
            <span className={styles.about__experienceText}>
              Years of Experience
            </span>
          </div>
        </motion.div>

        <motion.div
          className={styles.about__content}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
            },
          }}
        >
          <div className={styles.about__header}>
            <span className={styles.about__subheading}>ABOUT US</span>
            <h2 className={styles.about__title}>
              Expert Pest Control Solutions For Your Peace of Mind
            </h2>
          </div>

          <p className={styles.about__text}>
            At UrbanServe Pest Control, we understand that pests can disrupt
            your life and compromise your property's safety. Our mission is to
            provide effective, sustainable pest management solutions that
            restore your peace of mind.
          </p>

          <p className={styles.about__text}>
            With over 15 years of experience, our certified technicians use the
            latest technology and eco-friendly methods to identify, eliminate,
            and prevent pest infestations while minimizing environmental impact
            and health risks.
          </p>

          <ul className={styles.about__features}>
            <li className={styles.about__feature}>
              <svg
                className={styles.about__featureIcon}
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
              <span>Licensed & Certified Technicians</span>
            </li>
            <li className={styles.about__feature}>
              <svg
                className={styles.about__featureIcon}
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
              <span>Eco-Friendly & Pet-Safe Methods</span>
            </li>
            <li className={styles.about__feature}>
              <svg
                className={styles.about__featureIcon}
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
              <span>Comprehensive Pest Management Plans</span>
            </li>
            <li className={styles.about__feature}>
              <svg
                className={styles.about__featureIcon}
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
              <span>100% Satisfaction Guarantee</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        className={styles.about__stats}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              delay: 0.4,
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <div className={styles.about__statsContainer}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.about__statItem}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
            >
              <span className={styles.about__statValue}>{stat.value}</span>
              <span className={styles.about__statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
