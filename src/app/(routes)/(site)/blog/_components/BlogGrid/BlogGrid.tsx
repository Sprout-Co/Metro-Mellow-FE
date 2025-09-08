// src/app/(routes)/(site)/blog/_components/BlogGrid/BlogGrid.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/services/blog";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./BlogGrid.module.scss";

interface BlogGridProps {
  posts: BlogPost[];
  showLoadMore?: boolean;
  featured?: boolean;
}

export default function BlogGrid({
  posts,
  showLoadMore = true,
  featured = false,
}: BlogGridProps) {
  const [visiblePosts, setVisiblePosts] = useState<number>(featured ? 3 : 9);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  const displayedPosts = posts.slice(0, visiblePosts);
  const hasMoreToLoad = posts.length > visiblePosts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={styles["grid"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className={`${styles["grid__container"]} ${featured ? styles["grid__container--featured"] : ""}`}
      >
        {displayedPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            post={post}
            featured={featured && index === 0}
            index={index}
          />
        ))}
      </div>

      {showLoadMore && hasMoreToLoad && (
        <motion.div
          className={styles["grid__load-more"]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            className={styles["grid__load-button"]}
            onClick={handleLoadMore}
          >
            Load More Articles
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
