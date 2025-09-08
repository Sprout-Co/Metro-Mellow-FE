/**
 * Common SEO utility functions and data for Metromellow
 */

/**
 * Base business information for JSON-LD schema
 */
export const businessInfo = {
  name: "Metromellow",
  url: "https://metromellow.com",
  logo: "https://metromellow.com/images/brand/brand-logo/solid-bg/green-bg.png",
  image:
    "https://metromellow.com/images/brand/brand-logo/solid-bg/green-bg.png",
  telephone: "+2349068249871",
  email: "team@metromellow.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "anike ologuntoye avenue",
    addressLocality: "Lagos",
    addressRegion: "Lagos",
    postalCode: "102213",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.5244,
    longitude: 3.3792,
  },
  // Define service area for the entire Lagos state
  areaServed: {
    "@type": "State",
    name: "Lagos State",
    sameAs: "https://en.wikipedia.org/wiki/Lagos_State",
  },
  // Specify service coverage explicitly
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 6.5244,
      longitude: 3.3792,
    },
    geoRadius: "50000", // 50km radius to cover all of Lagos State
  },
  priceRange: "₦₦-₦₦₦₦",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/metromellowhq",
    "https://www.instagram.com/metromellowhq",
    "https://x.com/metromellowhq",
    "https://www.youtube.com/@metromellowhq",
  ],
};

/**
 * Service offerings catalog for schema
 */
export const serviceOfferings = {
  "@type": "OfferCatalog",
  name: "Home Services",
  itemListElement: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Cleaning Services",
        description: "Professional home and office cleaning services in Lagos.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Laundry Services",
        description: "Comprehensive laundry and dry cleaning services.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Meal Preparation",
        description: "Delicious meal preparation and delivery services.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Pest Control",
        description:
          "Effective and safe pest control services for homes and businesses.",
      },
    },
  ],
};

/**
 * Create a complete LocalBusiness schema object for the site
 * @param {Object} additionalData - Any page-specific data to add to the schema
 * @returns {Object} Complete LocalBusiness schema object
 */
export const createLocalBusinessSchema = (additionalData = {}) => {
  return {
    ...businessInfo,
    hasOfferCatalog: serviceOfferings,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
    },
    ...additionalData,
  };
};

/**
 * Create a breadcrumb schema for a page
 * @param {Array} breadcrumbs - Array of breadcrumb items with name and url
 * @returns {Object} BreadcrumbList schema object
 */
export const createBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => {
  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Create a Service schema object for service pages
 * @param {Object} serviceData - Service-specific data
 * @returns {Object} Service schema object
 */
export const createServiceSchema = (serviceData: {
  name: string;
  description: string;
  url: string;
  image?: string;
  provider?: object;
  areaServed?: object;
  serviceOutput?: string;
}) => {
  return {
    "@type": "Service",
    provider: {
      "@type": "LocalBusiness",
      name: businessInfo.name,
      url: businessInfo.url,
    },
    areaServed: businessInfo.areaServed,
    ...serviceData,
  };
};

/**
 * Create FAQ schema for pages with FAQs
 * @param {Array} faqs - Array of FAQ items with question and answer
 * @returns {Object} FAQPage schema object
 */
export const createFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

/**
 * Create Article schema for blog posts
 * @param {Object} articleData - Article-specific data
 * @returns {Object} Article schema object
 */
export const createArticleSchema = (articleData: {
  headline: string;
  description: string;
  image: string;
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
  datePublished: string;
  dateModified: string;
  url: string;
  articleSection?: string;
  keywords?: string;
  wordCount?: number;
  timeRequired?: string;
}) => {
  return {
    "@type": "BlogPosting",
    headline: articleData.headline,
    description: articleData.description,
    image: {
      "@type": "ImageObject",
      url: articleData.image,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: articleData.author.name,
      image: articleData.author.image,
      description: articleData.author.bio,
    },
    publisher: {
      "@type": "Organization",
      name: businessInfo.name,
      logo: {
        "@type": "ImageObject",
        url: businessInfo.logo,
      },
    },
    datePublished: articleData.datePublished,
    dateModified: articleData.dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleData.url,
    },
    articleSection: articleData.articleSection,
    keywords: articleData.keywords,
    wordCount: articleData.wordCount,
    timeRequired: articleData.timeRequired,
    url: articleData.url,
  };
};

/**
 * Create Blog schema for blog listing pages
 * @param {Object} blogData - Blog-specific data
 * @returns {Object} Blog schema object
 */
export const createBlogSchema = (blogData: {
  name: string;
  description: string;
  url: string;
  posts?: Array<{ url: string; title: string }>;
}) => {
  return {
    "@type": "Blog",
    name: blogData.name,
    description: blogData.description,
    url: blogData.url,
    author: {
      "@type": "Organization",
      name: businessInfo.name,
      url: businessInfo.url,
    },
    publisher: {
      "@type": "Organization",
      name: businessInfo.name,
      url: businessInfo.url,
      logo: {
        "@type": "ImageObject",
        url: businessInfo.logo,
      },
    },
    ...(blogData.posts && {
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: blogData.posts.length,
        itemListElement: blogData.posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: post.url,
          name: post.title,
        })),
      },
    }),
  };
};
