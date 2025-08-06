"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./CleaningGallery.module.scss";

const CleaningGallery: React.FC = () => {
  const beforeAfter = [
    {
      before: "/images/corporate/before1.jpg",
      after: "/images/corporate/cp5.png",
      title: "Executive Office Suite",
      description: "Complete transformation of a 5,000 sq ft executive office space",
    },
    {
      before: "/images/corporate/before2.jpg",
      after: "/images/corporate/cp6.png",
      title: "Conference Room Deep Clean",
      description: "Professional meeting space restoration and sanitization",
    },
    {
      before: "/images/corporate/before3.jpg",
      after: "/images/corporate/cp7.png",
      title: "Open Office Environment",
      description: "Large-scale office cleaning with specialized equipment",
    },
  ];

  return (
    <section className={styles.cleaningGallery}>
      <div className={styles.cleaningGallery__container}>
        <motion.div
          className={styles.cleaningGallery__header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.cleaningGallery__title}>
            See the <span className={styles.cleaningGallery__highlight}>Difference</span>
          </h2>
          <p className={styles.cleaningGallery__subtitle}>
            Real results from our corporate cleaning transformations
          </p>
        </motion.div>

        <div className={styles.cleaningGallery__grid}>
          {beforeAfter.map((item, index) => (
            <motion.div
              key={index}
              className={styles.cleaningGallery__item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.cleaningGallery__images}>
                <div className={styles.cleaningGallery__imageContainer}>
                  <img src={item.after} alt={`${item.title} - After`} />
                  <div className={styles.cleaningGallery__imageLabel}>After</div>
                </div>
              </div>
              <div className={styles.cleaningGallery__content}>
                <h3 className={styles.cleaningGallery__itemTitle}>{item.title}</h3>
                <p className={styles.cleaningGallery__itemDescription}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleaningGallery;