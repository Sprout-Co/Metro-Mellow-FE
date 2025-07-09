// components/contact/MapSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./MapSection.module.scss";

export default function MapSection() {
  return (
    <section className={styles.map}>
      <div className={styles.map__container}>
        <motion.div
          className={styles.map__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.map__title}>Our Location</h2>
          <p className={styles.map__subtitle}>
            Visit our office to meet our team or schedule a service in person
          </p>
        </motion.div>
      </div>

      <motion.div
        className={styles.map__wrapper}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* In a real project, you'd use a proper map component like Google Maps or Mapbox */}
        {/* For this example, we'll use a static image */}
        <Image
          src="/images/map.webp"
          alt="Metromellow office location"
          width={1920}
          height={600}
          className={styles.map__image}
        />

        <div className={styles.map__marker}>
          <div className={styles.map__pin}></div>
          <div className={styles.map__infoBox}>
            <h3 className={styles.map__infoTitle}>Metromellow HQ</h3>
            <p className={styles.map__infoAddress}>
              123 Main Street, Suite 200
              <br />
              New York, NY 10001
            </p>
            <a
              href="https://maps.google.com/?q=123+Main+Street+New+York+NY+10001"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.map__infoLink}
            >
              Get Directions
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
