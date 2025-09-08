import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getBlogPost,
  getRelatedPosts,
  sampleBlogPosts,
} from "@/lib/services/blog";
import BlogCard from "../_components/BlogCard/BlogCard";
import StructuredData from "@/components/common/SEO/StructuredData";
import { createBreadcrumbSchema, businessInfo } from "@/utils/seoHelpers";
import styles from "./BlogPost.module.scss";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  // In production, this would fetch all blog post slugs from your CMS
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
      title: "Post Not Found | Metromellow Blog",
    };
  }

  return {
    title: post.metaTitle || `${post.title} | Metromellow Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.seoKeywords.join(", "),
    alternates: {
      canonical: `https://metromellow.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://metromellow.com/blog/${post.slug}`,
      siteName: "Metromellow",
      locale: "en_NG",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
    other: {
      "article:author": post.author.name,
      "article:published_time": post.publishedAt,
      "article:modified_time": post.updatedAt,
      "article:section": post.category.name,
      "article:tag": post.tags.join(","),
    },
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

  // Structured data for article
  const articleSchema = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: post.featuredImage,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      image: post.author.avatar,
      description: post.author.bio,
    },
    publisher: {
      "@type": "Organization",
      name: businessInfo.name,
      logo: {
        "@type": "ImageObject",
        url: businessInfo.logo,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://metromellow.com/blog/${post.slug}`,
    },
    articleSection: post.category.name,
    keywords: post.tags.join(","),
    wordCount: post.content.length,
    timeRequired: `PT${post.readTime}M`,
    url: `https://metromellow.com/blog/${post.slug}`,
  };

  // Breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Blog", url: "https://metromellow.com/blog" },
    { name: post.title, url: `https://metromellow.com/blog/${post.slug}` },
  ];

  return (
    <>
      {/* Structured Data */}
      <StructuredData type="Article" data={articleSchema} />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />

      <article className={styles.blogPost}>
        {/* Article Header */}
        <header className={styles.header}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/blog" className={styles.backLink}>
                ← Back to Blog
              </Link>
            </nav>

            <div
              className={styles.category}
              style={{ backgroundColor: post.category.color }}
            >
              <span className={styles.categoryIcon}>{post.category.icon}</span>
              <span className={styles.categoryName}>{post.category.name}</span>
            </div>

            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className={styles.meta}>
              <div className={styles.author}>
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{post.author.name}</span>
                  <span className={styles.authorBio}>{post.author.bio}</span>
                </div>
              </div>

              <div className={styles.details}>
                <time className={styles.date} dateTime={post.publishedAt}>
                  {publishedDate}
                </time>
                <span className={styles.readTime}>
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.featuredImage}>
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={1200}
            height={630}
            className={styles.image}
            priority
          />
        </div>

        {/* Article Content */}
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.articleContent}>
              {/* Placeholder content - in production this would be rich text from CMS */}
              <div className={styles.sampleContent}>
                <p>
                  This is where the full blog post content would appear. In a
                  production environment, this content would be fetched from
                  your CMS or markdown files and rendered as rich HTML.
                </p>

                <h2>Key Points Covered in This Article</h2>
                <ul>
                  {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <blockquote>
                  <p>{post.excerpt}</p>
                </blockquote>

                <p>
                  Metromellow's expert team brings years of experience in
                  providing professional home services throughout Lagos. Our
                  insights help Lagos residents maintain beautiful, comfortable
                  homes while saving time and effort.
                </p>

                <h3>Why Choose Professional Home Services?</h3>
                <p>
                  Professional home services offer several advantages over DIY
                  approaches, especially in Lagos' unique climate and urban
                  environment.
                </p>

                <div className={styles.callToAction}>
                  <h4>Ready to Experience Professional Home Services?</h4>
                  <p>
                    Join our waitlist to be among the first to experience
                    Metromellow's professional home services when we launch in
                    Q3 2025.
                  </p>
                  <Link href="/welcome" className={styles.ctaButton}>
                    Join Our Waitlist
                  </Link>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className={styles.tags}>
              <h4>Tags:</h4>
              <div className={styles.tagList}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className={styles.relatedPosts}>
            <div className={styles.container}>
              <h2 className={styles.relatedTitle}>Related Articles</h2>
              <div className={styles.relatedGrid}>
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
