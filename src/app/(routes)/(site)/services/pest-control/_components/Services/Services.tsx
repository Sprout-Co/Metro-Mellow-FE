"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import styles from "./Services.module.scss";

interface ServiceItem {
  id: string;
  title: string;
  description: string[];
  image: string;
  color: string;
  price: string;
  icon: React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: "residential",
    title: "Residential Pest Control",
    description: [
      "Complete home pest inspection",
      "Targeted treatment for current infestations",
      "Preventative barrier treatments",
      "Child and pet-friendly solutions",
    ],
    image: "/images/pest-control/residential.jpg",
    color: "#4A6FFF",
    price: "From $99",
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
    id: "commercial",
    title: "Commercial Pest Control",
    description: [
      "Comprehensive facility inspection",
      "Customized treatment programs",
      "HACCP compliant solutions",
      "Regular maintenance schedules",
    ],
    image: "/images/pest-control/commercial.jpg",
    color: "#28C76F",
    price: "From $199",
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
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
  },
  {
    id: "specialized",
    title: "Specialized Pest Solutions",
    description: [
      "Termite inspection & treatment",
      "Bed bug elimination systems",
      "Rodent control & exclusion",
      "Wildlife removal services",
    ],
    image: "/images/pest-control/specialized.jpg",
    color: "#FF7A4A",
    price: "From $149",
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
        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
      </svg>
    ),
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className={styles.services} id="services" ref={ref}>
      <div className={styles.services__container}>
        <motion.div
          className={styles.services__header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.services__badge}>OUR SERVICES</span>
          <h2 className={styles.services__title}>
            Professional Pest Control Services
          </h2>
          <p className={styles.services__subtitle}>
            We offer comprehensive pest management solutions for all types of
            properties and pests. Our eco-friendly approach ensures effective
            elimination while keeping your family, pets, and the environment
            safe.
          </p>
        </motion.div>

        <motion.div
          className={styles.services__grid}
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              className={styles.services__item}
              variants={item}
            >
              <div className={styles.services__item_image}>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={250}
                  className={styles.services__item_img}
                />
                <div
                  className={styles.services__item_icon}
                  style={{ backgroundColor: service.color }}
                >
                  {service.icon}
                </div>
              </div>

              <div className={styles.services__item_content}>
                <h3 className={styles.services__item_title}>{service.title}</h3>
                <ul className={styles.services__item_features}>
                  {service.description.map((feature, index) => (
                    <li key={index} className={styles.services__item_feature}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.services__item_footer}>
                  <span className={styles.services__item_price}>
                    {service.price}
                  </span>
                  <Link
                    href="/bookings"
                    className={styles.services__item_button}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
