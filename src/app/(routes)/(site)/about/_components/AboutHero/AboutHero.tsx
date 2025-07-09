"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./AboutHero.module.scss";

export default function AboutHero() {
  return (
    <section className={styles.aboutHero}>
      <div className={styles.aboutHero__overlay}></div>
      <div className={styles.aboutHero__container}>
        <motion.div
          className={styles.aboutHero__content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.aboutHero__title}>
            About{" "}
            <span className={styles["aboutHero__title--highlight"]}>
              Metromellow
            </span>
          </h1>

          <p className={styles.aboutHero__subtitle}>
            Transforming everyday home experiences with exceptional service
            since 2018
          </p>
        </motion.div>
      </div>
    </section>
  );
}
