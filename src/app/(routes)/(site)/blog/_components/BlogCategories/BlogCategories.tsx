// src/app/(routes)/(site)/blog/_components/BlogCategories/BlogCategories.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogCategory } from "@/lib/services/blog";
import styles from "./BlogCategories.module.scss";

interface BlogCategoriesProps {
  categories: BlogCategory[];
}

export default function BlogCategories({ categories }: BlogCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={styles["categories"]}>
      <div className={styles["categories__filter"]}>
        <button
          className={`${styles["categories__filter-button"]} ${
            selectedCategory === "all"
              ? styles["categories__filter-button--active"]
              : ""
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles["categories__filter-button"]} ${
              selectedCategory === category.slug
                ? styles["categories__filter-button--active"]
                : ""
            }`}
            onClick={() => setSelectedCategory(category.slug)}
            style={
              {
                "--category-color": category.color,
              } as React.CSSProperties
            }
          >
            <span className={styles["categories__filter-icon"]}>
              {category.icon}
            </span>
            {category.name}
          </button>
        ))}
      </div>

      <motion.div
        className={styles["categories__grid"]}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, index) => (
          <motion.div key={category.id} variants={itemVariants}>
            <Link
              href={`/blog/category/${category.slug}`}
              className={styles["categories__card"]}
              style={
                {
                  "--category-color": category.color,
                } as React.CSSProperties
              }
            >
              <div className={styles["categories__card-header"]}>
                <div
                  className={styles["categories__icon-wrapper"]}
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <span
                    className={styles["categories__icon"]}
                    style={{ color: category.color }}
                  >
                    {category.icon}
                  </span>
                </div>
                <span className={styles["categories__count"]}>
                  {category.postCount} articles
                </span>
              </div>

              <h3 className={styles["categories__name"]}>{category.name}</h3>
              <p className={styles["categories__description"]}>
                {category.description}
              </p>

              <span className={styles["categories__link"]}>Explore →</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
