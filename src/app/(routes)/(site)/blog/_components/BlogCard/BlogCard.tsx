// src/app/(routes)/(site)/blog/_components/BlogCard/BlogCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/services/blog";
import styles from "./BlogCard.module.scss";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

export default function BlogCard({
  post,
  featured = false,
  index = 0,
}: BlogCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.article
      className={`${styles["card"]} ${featured ? styles["card--featured"] : ""}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className={styles["card__link"]}>
        <div className={styles["card__image-wrapper"]}>
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className={styles["card__image"]}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className={styles["card__category"]}
            style={{ backgroundColor: post.category.color }}
          >
            <span className={styles["card__category-icon"]}>
              {post.category.icon}
            </span>
            <span className={styles["card__category-name"]}>
              {post.category.name}
            </span>
          </div>
        </div>

        <div className={styles["card__content"]}>
          <div className={styles["card__meta"]}>
            <time className={styles["card__date"]} dateTime={post.publishedAt}>
              {publishedDate}
            </time>
            <span className={styles["card__divider"]}>•</span>
            <span className={styles["card__read-time"]}>
              {post.readTime} min read
            </span>
          </div>

          <h3 className={styles["card__title"]}>{post.title}</h3>

          <p className={styles["card__excerpt"]}>{post.excerpt}</p>

          <div className={styles["card__footer"]}>
            <div className={styles["card__author"]}>
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className={styles["card__author-avatar"]}
              />
              <span className={styles["card__author-name"]}>
                {post.author.name}
              </span>
            </div>

            <span className={styles["card__arrow"]}>→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
