import React from "react";

interface StructuredDataProps {
  type:
    | "LocalBusiness"
    | "WebPage"
    | "Article"
    | "Service"
    | "FAQPage"
    | "BreadcrumbList"
    | "Offer"
    | "Blog";
  data: Record<string, any>;
}

/**
 * A reusable component for adding structured JSON-LD data to pages
 *
 * @param {string} type - The schema.org type
 * @param {object} data - The structured data object
 */
const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  // Add base context and type
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;

