// src/app/(routes)/(site)/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getBlogPost,
  getRelatedPosts,
  getBlogPosts,
} from "@/lib/services/blog";
import BlogCard from "../_components/BlogCard/BlogCard";
import styles from "./BlogPost.module.scss";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Metromellow Blog",
    };
  }

  return {
    title: `${post.title} | Metromellow Blog`,
    description: post.metaDescription,
    keywords: post.tags.join(", "),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // List of permanently removed/deleted blog post slugs
  // These should return 410 Gone status for SEO
  const permanentlyRemovedSlugs = [
    "family-meal-prep-lagos-working-parents",
    "lagos-humidity-laundry-care-solutions",
    "deep-cleaning-transformation-victoria-island-apartment",
  ];

  // Check if this is a permanently removed post
  if (permanentlyRemovedSlugs.includes(params.slug)) {
    // Return 410 Gone status - tells Google the page is permanently removed
    // This is better for SEO than 404 for deleted content
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page No Longer Available | Metromellow</title>
</head>
<body>
  <h1>410 - Page No Longer Available</h1>
  <p>This blog post has been permanently removed.</p>
  <p><a href="/blog">Visit our blog</a> to see our latest articles.</p>
</body>
</html>`,
      {
        status: 410,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    );
  }

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
          height={350}
          className={styles["post__image"]}
          priority
        />
      </div>

      {/* Content */}
      <div className={styles["post__content"]}>
        <div className={styles["post__container"]}>
          <div className={styles["post__article"]}>
            {/* Article content */}
            <div className={styles["post__body"]}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className={styles["post__heading-2"]}>{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className={styles["post__heading-3"]}>{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className={styles["post__paragraph"]}>{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className={styles["post__list"]}>{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className={styles["post__ordered-list"]}>{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className={styles["post__list-item"]}>{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className={styles["post__blockquote"]}>
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className={styles["post__strong"]}>
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className={styles["post__emphasis"]}>{children}</em>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
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
                Metromellow
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
