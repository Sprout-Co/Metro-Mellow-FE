import { BlogPost } from "@/lib/services/blog";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./BlogFeatured.module.scss";

interface BlogFeaturedProps {
  posts: BlogPost[];
}

export default function BlogFeatured({ posts }: BlogFeaturedProps) {
  if (posts.length === 0) return null;

  const primaryPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <div className={styles["blog-featured"]}>
      <div className={styles["blog-featured__container"]}>
        <div className={styles["blog-featured__header"]}>
          <h2 className={styles["blog-featured__title"]}>Featured Articles</h2>
          <p className={styles["blog-featured__description"]}>
            Hand-picked expert content to help you maintain your Lagos home
          </p>
        </div>

        <div className={styles["blog-featured__grid"]}>
          {/* Primary Featured Article */}
          <div className={styles["blog-featured__primary-featured"]}>
            <div
              className={`${styles["blog-featured__featured-item"]} ${styles["blog-featured__featured-item--primary"]}`}
            >
              <BlogCard post={primaryPost} featured={true} />
            </div>
          </div>

          {/* Secondary Featured Articles */}
          <div className={styles["blog-featured__secondary-grid"]}>
            {secondaryPosts.map((post, index) => (
              <div
                key={post.id}
                className={`${styles["blog-featured__featured-item"]} ${styles["blog-featured__featured-item--secondary"]}`}
              >
                <BlogCard post={post} featured={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
