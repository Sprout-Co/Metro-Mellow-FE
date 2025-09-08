"use client";
import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/services/blog";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./BlogGrid.module.scss";

interface BlogGridProps {
  posts: BlogPost[];
  showLoadMore?: boolean;
}

export default function BlogGrid({
  posts,
  showLoadMore = true,
}: BlogGridProps) {
  const [visiblePosts, setVisiblePosts] = useState<number>(9);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  const displayedPosts = posts.slice(0, visiblePosts);
  const hasMoreToLoad = posts.length > visiblePosts;

  return (
    <div className={styles["blog-grid"]}>
      <div className={styles["blog-grid__container"]}>
        <div className={styles["blog-grid__header"]}>
          <h2 className={styles["blog-grid__title"]}>Latest Articles</h2>
          <p className={styles["blog-grid__description"]}>
            Discover expert tips and insights from our home services
            professionals
          </p>
        </div>

        <div className={styles["blog-grid__grid"]}>
          {displayedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {showLoadMore && hasMoreToLoad && (
          <div className={styles["blog-grid__load-more"]}>
            <button
              className={styles["blog-grid__load-more-button"]}
              onClick={handleLoadMore}
            >
              Load More Articles
            </button>
          </div>
        )}

        {posts.length === 0 && (
          <div className={styles["blog-grid__empty-state"]}>
            <div className={styles["blog-grid__empty-icon"]}>📝</div>
            <h3 className={styles["blog-grid__empty-title"]}>
              No Articles Found
            </h3>
            <p className={styles["blog-grid__empty-description"]}>
              We're working on adding more helpful content. Check back soon!
            </p>
            <Link href="/blog" className={styles["blog-grid__empty-action"]}>
              View All Articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
