export function GET() {
  const robotsTxt = `# Metro Mellow Robots.txt
# Optimized for Next.js App Router and SEO

User-agent: *
# EXPLICIT ALLOW - Override cache
Allow: /blog
Allow: /blog/
Allow: /welcome

# Block sensitive areas first (most specific rules first)
Disallow: /admin/
Disallow: /dashboard/
Disallow: /_next/image/
Disallow: /_next/server/
Disallow: /api/auth/
Disallow: /api/internal/

# Block development/debug URLs
Disallow: /*?debug=*
Disallow: /*?preview=*
Disallow: /*?test=*
Disallow: /#

# Block unnecessary file types
Disallow: /*.pdf$
Disallow: /temp/
Disallow: /tmp/

# Allow everything else (general rule comes after specific blocks)
Allow: /

# Explicitly allow important content for clarity
Allow: /blog/
Allow: /services/
Allow: /images/
Allow: /_next/static/

# Allow important files
Allow: /manifest.json
Allow: /robots.txt
Allow: /sitemap.xml
Allow: /rss.xml

# Sitemaps
Sitemap: https://metromellow.com/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1

# Special handling for different bots
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

User-agent: facebookexternalhit
Allow: /
Allow: /images/blog/social/
Allow: /images/brand/

# SEO analysis bots (allow with higher crawl delay)
User-agent: AhrefsBot
Crawl-delay: 5

User-agent: SemrushBot
Crawl-delay: 5`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
