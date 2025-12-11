import { getBlogPosts, getBlogCategories } from "@/lib/services/blog";

export async function GET() {
  const baseUrl = "https://metromellow.com";

  // Get blog data
  const blogPosts = await getBlogPosts();
  const categories = await getBlogCategories();

  // Static pages (commented out pages that redirect in maintenance mode)
  const staticPages = [
    {
      url: "",
      priority: "1.0",
      changefreq: "daily",
      lastmod: new Date().toISOString(),
    }, // Homepage
    {
      url: "about",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: new Date().toISOString(),
    },
    {
      url: "contact",
      priority: "0.8",
      changefreq: "monthly",
      lastmod: new Date().toISOString(),
    },
    {
      url: "services",
      priority: "0.9",
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    },
    {
      url: "services/cleaning",
      priority: "0.9",
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    },
    {
      url: "services/laundry",
      priority: "0.9",
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    },
    {
      url: "services/food",
      priority: "0.9",
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    },
    {
      url: "services/pest-control",
      priority: "0.9",
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    },
    {
      url: "subscriptions",
      priority: "0.8",
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    },
    // {
    //   url: "for-business",
    //   priority: "0.7",
    //   changefreq: "monthly",
    //   lastmod: new Date().toISOString(),
    // },
    // {
    //   url: "for-business/corporate-cleaning",
    //   priority: "0.7",
    //   changefreq: "monthly",
    //   lastmod: new Date().toISOString(),
    // },
    // {
    //   url: "for-business/uniform-management",
    //   priority: "0.7",
    //   changefreq: "monthly",
    //   lastmod: new Date().toISOString(),
    // },
    // {
    //   url: "for-business/catering-services",
    //   priority: "0.7",
    //   changefreq: "monthly",
    //   lastmod: new Date().toISOString(),
    // },
    // {
    //   url: "for-business/pest-management",
    //   priority: "0.7",
    //   changefreq: "monthly",
    //   lastmod: new Date().toISOString(),
    // },
    // {
    //   url: "for-business/custom-solutions",
    //   priority: "0.7",
    //   changefreq: "monthly",
    //   lastmod: new Date().toISOString(),
    // },
    {
      url: "blog",
      priority: "0.9",
      changefreq: "daily",
      lastmod: new Date().toISOString(),
    },
  ];

  // Blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `blog/${post.slug}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: post.updatedAt,
  }));

  // Blog category pages
  const categoryPages = categories.map((category) => ({
    url: `blog/category/${category.slug}`,
    priority: "0.7",
    changefreq: "weekly",
    lastmod: new Date().toISOString(),
  }));

  const allPages = [...staticPages, ...blogPages, ...categoryPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${allPages
    .map((page) => {
      return `
    <url>
      <loc>${baseUrl}/${page.url}</loc>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
      ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : `<lastmod>${new Date().toISOString()}</lastmod>`}
    </url>`;
    })
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
