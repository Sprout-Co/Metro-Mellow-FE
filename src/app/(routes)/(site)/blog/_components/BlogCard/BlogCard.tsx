import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/services/blog";
import styles from "./BlogCard.module.scss";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={`${styles["blog-card"]} ${featured ? styles["blog-card--featured"] : ''}`}>
      <Link href={`/blog/${post.slug}`} className={styles["blog-card__link"]}>
        <div className={styles["blog-card__image-container"]}>
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className={styles["blog-card__image"]}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles["blog-card__category"]} style={{ backgroundColor: post.category.color }}>
            <span className={styles["blog-card__category-icon"]}>{post.category.icon}</span>
            <span className={styles["blog-card__category-name"]}>{post.category.name}</span>
          </div>
        </div>
        
        <div className={styles["blog-card__content"]}>
          <header className={styles["blog-card__header"]}>
            <h3 className={styles["blog-card__title"]}>{post.title}</h3>
            <p className={styles["blog-card__excerpt"]}>{post.excerpt}</p>
          </header>
          
          <footer className={styles["blog-card__footer"]}>
            <div className={styles["blog-card__meta"]}>
              <div className={styles["blog-card__author"]}>
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className={styles["blog-card__author-avatar"]}
                />
                <span className={styles["blog-card__author-name"]}>{post.author.name}</span>
              </div>
              <div className={styles["blog-card__details"]}>
                <time className={styles["blog-card__date"]} dateTime={post.publishedAt}>
                  {publishedDate}
                </time>
                <span className={styles["blog-card__read-time"]}>{post.readTime} min read</span>
              </div>
            </div>
          </footer>
        </div>
      </Link>
      
      <div className={styles["blog-card__tags"]}>
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className={styles["blog-card__tag"]}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}