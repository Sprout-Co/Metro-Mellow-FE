export function GET() {
  const robotsTxt = `# Metromellow Robots.txt
# Optimized for Next.js App Router and SEO

User-agent: *
# Block backend/private areas
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/auth/
Disallow: /api/internal/

# Block build internals (but NOT images)
Disallow: /_next/server/

# Block URL parameters that cause duplicate content
Disallow: /*?debug=*
Disallow: /*?preview=*
Disallow: /*?test=*

# Block unnecessary file types
Disallow: /*.pdf$
Disallow: /temp/
Disallow: /tmp/

# Sitemaps
Sitemap: https://metromellow.com/sitemap.xml

# Special handling for different bots
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
