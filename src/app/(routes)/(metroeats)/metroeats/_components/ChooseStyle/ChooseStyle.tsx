"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./ChooseStyle.module.scss";

const categories = [
  {
    title: "Plates",
    subtitle: "Single meals ready to eat",
    label: "For Today",
    emoji: "🍽️",
    href: "/metroeats/menu?tab=plates",
    popular: false,
  },
  {
    title: "Buckets",
    subtitle: "Bulk, stock-up and sharing",
    label: "For The Week — Best Value",
    emoji: "🪣",
    href: "/metroeats/menu?tab=buckets",
    popular: true,
  },
  {
    title: "Subscribe",
    subtitle: "Weekly meal plans, save up to 20%",
    label: "Save More",
    emoji: "📅",
    href: "#subscribe",
    popular: false,
  },
  {
    title: "Gift a Meal",
    subtitle: "Send a meal to someone special",
    label: "For Someone Special",
    emoji: "🎁",
    href: "#gift",
    popular: false,
  },
];

export default function ChooseStyle() {
  return (
    <section className={styles.chooseStyle}>
      <div className={styles.chooseStyle__inner}>
        <motion.div
          className={styles.chooseStyle__header}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={styles.chooseStyle__title}>Choose Your Style</h2>
          <p className={styles.chooseStyle__subtitle}>
            What moment are you ordering for?
          </p>
        </motion.div>

        <div className={styles.chooseStyle__grid}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <Link href={cat.href} className={styles.chooseStyle__card}>
                <div className={styles.chooseStyle__cardMeta}>
                  <span className={styles.chooseStyle__cardLabel}>
                    {cat.emoji} {cat.label}
                  </span>
                  {cat.popular && (
                    <span className={styles.chooseStyle__popularBadge}>
                      🔥 Popular
                    </span>
                  )}
                </div>
                <div className={styles.chooseStyle__cardContent}>
                  <h3 className={styles.chooseStyle__cardTitle}>{cat.title}</h3>
                  <p className={styles.chooseStyle__cardSub}>{cat.subtitle}</p>
                  <span className={styles.chooseStyle__cardCta}>
                    View →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
