// src/app/(routes)/(site)/blog/page.tsx
import { Metadata } from "next";
import BlogHero from "./_components/BlogHero/BlogHero";
import BlogGrid from "./_components/BlogGrid/BlogGrid";
import { getBlogPosts, getBlogCategories } from "@/lib/services/blog";
import styles from "./Blog.module.scss";

export const metadata: Metadata = {
  title: "Blog & Insights | Expert Home Services Tips | Metro Mellow",
  description:
    "Expert home services advice for Lagos residents. Get tips on cleaning, laundry, cooking, pest control, and home maintenance from Metro Mellow professionals.",
  keywords:
    "home services blog Lagos, cleaning tips Nigeria, laundry guides, cooking tips Lagos, pest control advice, home maintenance Nigeria",
  alternates: {
    canonical: "https://metromellow.com/blog",
  },
  openGraph: {
    title: "Blog & Insights | Metro Mellow",
    description:
      "Expert advice on cleaning, laundry, cooking & pest control for Lagos homes.",
    url: "https://metromellow.com/blog",
    siteName: "Metro Mellow",
    locale: "en_NG",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const categories = await getBlogCategories();

  // Separate featured posts (first 3) and regular posts
  const featuredPosts = blogPosts.slice(0, 3);
  const regularPosts = blogPosts.slice(3);

  return (
    <main className={styles["blog"]}>
      {/* Hero Section */}
      <BlogHero />

      {/* Featured Articles */}
      <section className={styles["blog__featured-section"]}>
        <div className={styles["blog__container"]}>
          <div className={styles["blog__section-header"]}>
            <span className={styles["blog__section-label"]}>FEATURED</span>
            <h2 className={styles["blog__section-title"]}>
              Top Articles This Week
            </h2>
            <p className={styles["blog__section-description"]}>
              Hand-picked content to help you maintain your Lagos home
            </p>
          </div>
          <BlogGrid
            posts={featuredPosts}
            showLoadMore={false}
            featured={true}
          />
        </div>
      </section>

      {/* All Articles */}
      <section className={styles["blog__grid-section"]}>
        <div className={styles["blog__container"]}>
          <div className={styles["blog__section-header"]}>
            <span className={styles["blog__section-label"]}>ALL ARTICLES</span>
            <h2 className={styles["blog__section-title"]}>Latest Posts</h2>
            <p className={styles["blog__section-description"]}>
              Discover tips, guides, and insights from our experts
            </p>
          </div>
          <BlogGrid posts={regularPosts} />
        </div>
      </section>
    </main>
  );
}
