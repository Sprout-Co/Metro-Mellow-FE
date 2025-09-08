import { Metadata } from "next";
import BlogHero from "./_components/BlogHero/BlogHero";
import BlogGrid from "./_components/BlogGrid/BlogGrid";
import BlogCategories from "./_components/BlogCategories/BlogCategories";
import BlogFeatured from "./_components/BlogFeatured/BlogFeatured";
import StructuredData from "@/components/common/SEO/StructuredData";
import {
  createLocalBusinessSchema,
  createBreadcrumbSchema,
} from "@/utils/seoHelpers";
import { getBlogPosts, getBlogCategories } from "@/lib/services/blog";
import styles from "./Blog.module.scss";

export const metadata: Metadata = {
  title: "Home Services Blog | Tips & Guides for Lagos Homes | Metro Mellow",
  description:
    "Expert home services advice for Lagos residents. Get tips on cleaning, laundry, cooking, pest control, and home maintenance. Latest trends and professional insights from Metro Mellow.",
  keywords:
    "home services blog Lagos, cleaning tips Nigeria, laundry guides, cooking tips Lagos, pest control advice, home maintenance Nigeria, domestic help tips, household management",
  alternates: {
    canonical: "https://metromellow.com/blog",
  },
  openGraph: {
    title: "Home Services Blog | Expert Tips for Lagos Homes | Metro Mellow",
    description:
      "Expert advice on cleaning, laundry, cooking & pest control for Lagos homes. Professional tips, guides, and insights from Metro Mellow's home services experts.",
    url: "https://metromellow.com/blog",
    siteName: "Metro Mellow",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/blog/blog-hero-og.jpg",
        width: 1200,
        height: 630,
        alt: "Metro Mellow Home Services Blog - Expert Tips for Lagos Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Services Blog | Expert Tips for Lagos Homes",
    description:
      "Professional home services advice for Lagos residents - cleaning, laundry, cooking & more.",
    images: ["/images/blog/blog-hero-og.jpg"],
  },
  other: {
    "article:publisher": "https://www.facebook.com/metromellowhq",
    "article:author": "Metro Mellow Team",
  },
};

export default async function BlogPage() {
  // Fetch blog data (this would typically come from a CMS or API)
  const blogPosts = await getBlogPosts();
  const categories = await getBlogCategories();

  // Structured data for blog
  const blogPageSchema = {
    "@type": "Blog",
    name: "Metro Mellow Home Services Blog",
    description:
      "Expert home services advice and tips for Lagos residents covering cleaning, laundry, cooking, and pest control.",
    url: "https://metromellow.com/blog",
    author: {
      "@type": "Organization",
      name: "Metro Mellow",
      url: "https://metromellow.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Metro Mellow",
      url: "https://metromellow.com",
      logo: {
        "@type": "ImageObject",
        url: "https://metromellow.com/images/brand/brand-logo/solid-bg/green-bg.png",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.slice(0, 8).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://metromellow.com/blog/${post.slug}`,
      })),
    },
  };

  // Breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Blog", url: "https://metromellow.com/blog" },
  ];

  return (
    <>
      {/* Structured Data */}
      <StructuredData type="Article" data={blogPageSchema} />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />
      <StructuredData
        type="LocalBusiness"
        data={createLocalBusinessSchema({
          description:
            "Metro Mellow blog provides expert home services advice and tips for Lagos residents.",
        })}
      />

      <main className={styles["blog-page"]}>
        {/* SEO-optimized heading */}
        <h1 className={styles["blog-page__visually-hidden"]}>
          Home Services Blog - Expert Tips and Guides for Lagos Homes by Metro
          Mellow
        </h1>

        <section
          id="blog-hero"
          aria-label="Blog Introduction"
          className={styles["blog-page__hero-section"]}
        >
          <BlogHero />
        </section>

        <section
          id="featured-posts"
          aria-label="Featured Blog Posts"
          className={styles["blog-page__featured-section"]}
        >
          <div className={styles["blog-page__container"]}>
            <h2 className={styles["blog-page__section-title"]}>
              Featured Articles
            </h2>
            <BlogFeatured posts={blogPosts.slice(0, 3)} />
          </div>
        </section>

        <section
          id="blog-categories"
          aria-label="Blog Categories"
          className={styles["blog-page__categories-section"]}
        >
          <div className={styles["blog-page__container"]}>
            <h2 className={styles["blog-page__section-title"]}>
              Browse By Category
            </h2>
            <BlogCategories categories={categories} />
          </div>
        </section>

        <section
          id="all-posts"
          aria-label="All Blog Posts"
          className={styles["blog-page__grid-section"]}
        >
          <div className={styles["blog-page__container"]}>
            <h2 className={styles["blog-page__section-title"]}>
              Latest Articles
            </h2>
            <BlogGrid posts={blogPosts} />
          </div>
        </section>

        {/* Hidden SEO content */}
        <div className={styles["blog-page__visually-hidden"]}>
          <h2>Home Services Expert Content</h2>
          <p>
            Our blog covers comprehensive home services guidance for Lagos
            residents, including professional cleaning techniques, efficient
            laundry management, delicious meal preparation, effective pest
            control strategies, and general home maintenance tips. Learn from
            Metro Mellow's experienced professionals serving Victoria Island,
            Lekki, Ikeja, and all Lagos neighborhoods.
          </p>
          <h3>Popular Home Services Topics</h3>
          <ul>
            <li>Deep cleaning techniques for Lagos homes</li>
            <li>Laundry care for tropical climate</li>
            <li>Nigerian cuisine and meal prep tips</li>
            <li>Pest control for Lagos weather conditions</li>
            <li>Home organization and maintenance</li>
            <li>Domestic staff management</li>
            <li>Time-saving household hacks</li>
            <li>Seasonal home care guides</li>
          </ul>
        </div>
      </main>
    </>
  );
}
