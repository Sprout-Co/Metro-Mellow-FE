import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getBlogPostsByCategory,
  getBlogCategories,
  categories,
} from "@/lib/services/blog";
import BlogGrid from "../../_components/BlogGrid/BlogGrid";
import StructuredData from "@/components/common/SEO/StructuredData";
import { createBreadcrumbSchema, createBlogSchema } from "@/utils/seoHelpers";
import styles from "./BlogCategory.module.scss";

interface BlogCategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const categories = await getBlogCategories();
  const category = categories.find((cat) => cat.slug === params.category);

  if (!category) {
    return {
      title: "Category Not Found | Metromellow Blog",
    };
  }

  return {
    title: `${category.name} Tips & Guides | Metromellow Blog`,
    description: `${category.description}. Expert ${category.name.toLowerCase()} advice for Lagos homes from Metromellow's professional team.`,
    keywords: `${category.name.toLowerCase()} Lagos, ${category.name.toLowerCase()} tips Nigeria, home ${category.name.toLowerCase()}, professional ${category.name.toLowerCase()} services, Metromellow ${category.name.toLowerCase()}`,
    alternates: {
      canonical: `https://metromellow.com/blog/category/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Expert Tips | Metromellow Blog`,
      description: `Professional ${category.name.toLowerCase()} advice and guides for Lagos residents`,
      url: `https://metromellow.com/blog/category/${category.slug}`,
      siteName: "Metromellow",
      locale: "en_NG",
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: BlogCategoryPageProps) {
  const categories = await getBlogCategories();
  const category = categories.find((cat) => cat.slug === params.category);

  if (!category) {
    notFound();
  }

  const posts = await getBlogPostsByCategory(category.slug);

  // Structured data
  const blogSchema = createBlogSchema({
    name: `${category.name} Tips & Guides`,
    description: category.description,
    url: `https://metromellow.com/blog/category/${category.slug}`,
    posts: posts.map((post) => ({
      url: `https://metromellow.com/blog/${post.slug}`,
      title: post.title,
    })),
  });

  // Breadcrumbs
  const breadcrumbs = [
    { name: "Home", url: "https://metromellow.com" },
    { name: "Blog", url: "https://metromellow.com/blog" },
    {
      name: category.name,
      url: `https://metromellow.com/blog/category/${category.slug}`,
    },
  ];

  return (
    <>
      {/* Structured Data */}
      <StructuredData type="Blog" data={blogSchema} />
      <StructuredData
        type="BreadcrumbList"
        data={createBreadcrumbSchema(breadcrumbs)}
      />

      <main className={styles.categoryPage}>
        {/* Category Header */}
        <section className={styles.header}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/blog" className={styles.backLink}>
                ← Back to Blog
              </Link>
            </nav>

            <div
              className={styles.categoryBadge}
              style={{ backgroundColor: category.color }}
            >
              <span className={styles.icon}>{category.icon}</span>
              <span className={styles.name}>{category.name}</span>
            </div>

            <h1 className={styles.title}>{category.name} Tips & Guides</h1>

            <p className={styles.description}>
              {category.description}. Get expert advice from our professional
              team serving Lagos homes and businesses.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.number}>{category.postCount}</span>
                <span className={styles.label}>Articles</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.number}>Lagos</span>
                <span className={styles.label}>Focus Area</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.number}>Expert</span>
                <span className={styles.label}>Content</span>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className={styles.content}>
          <BlogGrid posts={posts} showLoadMore={false} />
        </section>

        {/* Other Categories */}
        <section className={styles.otherCategories}>
          <div className={styles.container}>
            <h2 className={styles.otherTitle}>Explore Other Topics</h2>
            <div className={styles.categoryLinks}>
              {categories
                .filter((cat) => cat.slug !== category.slug)
                .map((otherCategory) => (
                  <Link
                    key={otherCategory.id}
                    href={`/blog/category/${otherCategory.slug}`}
                    className={styles.categoryLink}
                    style={
                      {
                        "--category-color": otherCategory.color,
                      } as React.CSSProperties
                    }
                  >
                    <span className={styles.linkIcon}>
                      {otherCategory.icon}
                    </span>
                    <span className={styles.linkName}>
                      {otherCategory.name}
                    </span>
                    <span className={styles.linkCount}>
                      {otherCategory.postCount} articles
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
