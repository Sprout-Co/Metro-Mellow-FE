/**
 * SEO Library
 *
 * Centralized SEO utilities, components, and route handlers for Metromellow
 */

// Export helpers
export {
  businessInfo,
  serviceOfferings,
  createLocalBusinessSchema,
  createBreadcrumbSchema,
  createServiceSchema,
  createFAQSchema,
  createArticleSchema,
  createBlogSchema,
} from "./helpers";

// Export components
export { default as StructuredData } from "./components/StructuredData";

// Export route handlers (for use in Next.js route handlers)
// Note: These are re-exported for convenience, but route handlers should import directly
export { GET as getRobotsTxt } from "./routes/robots";
export { GET as getSitemap } from "./routes/sitemap";
