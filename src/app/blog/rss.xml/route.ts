import { getBlogPosts } from "@/lib/services/blog";
import { businessInfo } from "@/utils/seoHelpers";

export async function GET() {
  const baseUrl = "https://metromellow.com";
  const blogPosts = await getBlogPosts(20); // Get latest 20 posts for RSS

  const rssItems = blogPosts
    .map((post) => {
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${businessInfo.email} (${post.author.name})</author>
      <category>${post.category.name}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("")}
      <enclosure url="${post.featuredImage}" type="image/jpeg" length="0" />
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:wfw="http://wellformedweb.org/CommentAPI/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
     xmlns:slash="http://purl.org/rss/1.0/modules/slash/">
  <channel>
    <title>Metromellow Home Services Blog</title>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <link>${baseUrl}/blog</link>
    <description>Expert home services advice and tips for Lagos residents. Professional insights on cleaning, laundry, cooking, pest control, and home maintenance from Metromellow's experts.</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-NG</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>Metromellow Blog System</generator>
    <managingEditor>${businessInfo.email} (Metromellow Team)</managingEditor>
    <webMaster>${businessInfo.email} (Metromellow Team)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Metromellow. All rights reserved.</copyright>
    <category>Home Services</category>
    <category>Lagos</category>
    <category>Nigeria</category>
    <category>Cleaning</category>
    <category>Laundry</category>
    <category>Cooking</category>
    <category>Pest Control</category>
    <image>
      <url>${businessInfo.logo}</url>
      <title>Metromellow Home Services Blog</title>
      <link>${baseUrl}/blog</link>
      <width>144</width>
      <height>144</height>
      <description>Metromellow - Professional Home Services in Lagos</description>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
