import { getBlogPosts, getBlogCategories } from "@/lib/services/blog";

export async function GET() {
  const baseUrl = "https://metromellow.com";
  
  // Get blog data
  const blogPosts = await getBlogPosts();
  const categories = await getBlogCategories();

  // Static pages
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" }, // Homepage
    { url: "welcome", priority: "0.9", changefreq: "weekly" },
    { url: "about", priority: "0.8", changefreq: "monthly" },
    { url: "contact", priority: "0.8", changefreq: "monthly" },
    { url: "services", priority: "0.9", changefreq: "weekly" },
    { url: "services/cleaning", priority: "0.9", changefreq: "weekly" },
    { url: "services/laundry", priority: "0.9", changefreq: "weekly" },
    { url: "services/food", priority: "0.9", changefreq: "weekly" },
    { url: "services/pest-control", priority: "0.9", changefreq: "weekly" },
    { url: "subscriptions", priority: "0.8", changefreq: "weekly" },
    { url: "for-business", priority: "0.7", changefreq: "monthly" },
    { url: "for-business/corporate-cleaning", priority: "0.7", changefreq: "monthly" },
    { url: "for-business/uniform-management", priority: "0.7", changefreq: "monthly" },
    { url: "for-business/catering-services", priority: "0.7", changefreq: "monthly" },
    { url: "for-business/pest-management", priority: "0.7", changefreq: "monthly" },
    { url: "for-business/custom-solutions", priority: "0.7", changefreq: "monthly" },
    { url: "blog", priority: "0.9", changefreq: "daily" },
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