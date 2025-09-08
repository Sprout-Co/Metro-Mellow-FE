// src/app/(routes)/(site)/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  getBlogPost,
  getRelatedPosts,
  sampleBlogPosts,
} from "@/lib/services/blog";
import BlogCard from "../_components/BlogCard/BlogCard";
import styles from "./BlogPost.module.scss";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return sampleBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Metro Mellow Blog",
    };
  }

  return {
    title: `${post.title} | Metro Mellow Blog`,
    description: post.excerpt,
    keywords: post.seoKeywords.join(", "),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug);
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={styles["post"]}>
      {/* Hero Section */}
      <header className={styles["post__hero"]}>
        <div className={styles["post__hero-overlay"]}></div>
        <div className={styles["post__container"]}>
          <div className={styles["post__hero-content"]}>
            <Link href="/blog" className={styles["post__back"]}>
              ← Back to Blog
            </Link>

            <div
              className={styles["post__category"]}
              style={{ backgroundColor: post.category.color }}
            >
              <span className={styles["post__category-icon"]}>
                {post.category.icon}
              </span>
              <span className={styles["post__category-name"]}>
                {post.category.name}
              </span>
            </div>

            <h1 className={styles["post__title"]}>{post.title}</h1>

            <p className={styles["post__excerpt"]}>{post.excerpt}</p>

            <div className={styles["post__meta"]}>
              <div className={styles["post__author"]}>
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className={styles["post__author-avatar"]}
                />
                <div className={styles["post__author-info"]}>
                  <span className={styles["post__author-name"]}>
                    {post.author.name}
                  </span>
                  <span className={styles["post__author-bio"]}>
                    {post.author.bio}
                  </span>
                </div>
              </div>

              <div className={styles["post__details"]}>
                <time
                  className={styles["post__date"]}
                  dateTime={post.publishedAt}
                >
                  {publishedDate}
                </time>
                <span className={styles["post__divider"]}>•</span>
                <span className={styles["post__read-time"]}>
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className={styles["post__featured-image"]}>
        <Image
          src={post.featuredImage}
          alt={post.title}
          width={1200}
          height={630}
          className={styles["post__image"]}
          priority
        />
      </div>

      {/* Content */}
      <div className={styles["post__content"]}>
        <div className={styles["post__container"]}>
          <div className={styles["post__article"]}>
            {/* Article content would go here */}
            <div className={styles["post__body"]}>
              <p>
                This is where the full blog post content would appear. In a
                production environment, this content would be fetched from your
                CMS or markdown files and rendered as rich HTML.
              </p>

              <h2>Key Takeaways</h2>
              <ul>
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <blockquote>
                <p>{post.excerpt}</p>
              </blockquote>

              <p>
                Metro Mellow's expert team brings years of experience in
                providing professional home services throughout Lagos.
              </p>
            </div>

            {/* Tags */}
            <div className={styles["post__tags"]}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles["post__tag"]}>
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className={styles["post__cta"]}>
              <h3 className={styles["post__cta-title"]}>
                Ready for Professional Home Services?
              </h3>
              <p className={styles["post__cta-description"]}>
                Join thousands of Lagos residents enjoying spotless homes with
                Metro Mellow
              </p>
              <Link href="/get-started" className={styles["post__cta-button"]}>
                Get Started Today →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles["post__related"]}>
          <div className={styles["post__container"]}>
            <h2 className={styles["post__related-title"]}>Related Articles</h2>
            <div className={styles["post__related-grid"]}>
              {relatedPosts.map((relatedPost, index) => (
                <BlogCard
                  key={relatedPost.id}
                  post={relatedPost}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
