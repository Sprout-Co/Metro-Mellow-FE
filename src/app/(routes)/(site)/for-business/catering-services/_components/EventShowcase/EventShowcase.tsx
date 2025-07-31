"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./EventShowcase.module.scss";

const EventShowcase: React.FC = () => {
  return (
    <section className={styles.eventShowcase}>
      <div className={styles.eventShowcase__container}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Corporate Event Showcase
        </motion.h2>
        <p>Successful corporate events we've catered...</p>
      </div>
    </section>
  );
};

export default EventShowcase;