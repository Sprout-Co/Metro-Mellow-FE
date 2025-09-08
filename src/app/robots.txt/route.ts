export function GET() {
  const robotsTxt = `# Metro Mellow Robots.txt

User-agent: *
Allow: /

# Blog content
Allow: /blog/
Allow: /blog/category/
Allow: /blog/rss.xml

# Service pages
Allow: /services/
Allow: /for-business/

# Important pages
Allow: /about
Allow: /contact
Allow: /welcome

# Sitemaps
Sitemap: https://metromellow.com/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1

# Block admin areas (when implemented)
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/

# Block temp/dev files
Disallow: /*.json$
Disallow: /*?debug=*
Disallow: /*?preview=*

# Allow images
Allow: /images/
Allow: *.jpg
Allow: *.jpeg
Allow: *.png
Allow: *.gif
Allow: *.webp
Allow: *.svg

# Clean URLs
Disallow: /*?*
Disallow: /*.pdf$
Disallow: /*#

# Social media optimization
Allow: /images/brand/
Allow: /images/blog/`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}