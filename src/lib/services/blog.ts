/**
 * Blog service functions for Metro Mellow
 * In production, these would connect to a CMS like Strapi, Contentful, or a database
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: BlogCategory;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  metaTitle?: string;
  metaDescription?: string;
  featured: boolean;
  seoKeywords: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  postCount: number;
}

// Sample blog data - in production this would come from a CMS/API
export const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ultimate-deep-cleaning-guide-lagos-homes",
    title:
      "The Ultimate Deep Cleaning Guide for Lagos Homes During Rainy Season",
    excerpt:
      "Essential deep cleaning tips to keep your Lagos home fresh and healthy during the rainy season. Learn professional techniques used by Metro Mellow's cleaning experts.",
    content: "", // Would be full content in production
    featuredImage: "/images/blog/blog-1.jpg",
    author: {
      name: "metromellow",
      avatar: "/images/brand/brand-logo/solid-bg/green-bg.png",
      bio: "Professional cleaning expert with 8+ years experience in Lagos home services.",
    },
    category: {
      id: "cleaning",
      name: "Cleaning Tips",
      slug: "cleaning",
      description: "Professional cleaning advice and techniques",
      color: "#10B981",
      icon: "🧹",
      postCount: 12,
    },
    tags: [
      "deep cleaning",
      "rainy season",
      "Lagos homes",
      "mold prevention",
      "humidity control",
    ],
    publishedAt: "2024-03-15T09:00:00Z",
    updatedAt: "2024-03-15T09:00:00Z",
    readTime: 8,
    metaTitle:
      "Deep Cleaning Guide for Lagos Homes | Rainy Season Tips | Metro Mellow",
    metaDescription:
      "Expert deep cleaning tips for Lagos homes during rainy season. Prevent mold, control humidity, and maintain a fresh home with professional techniques.",
    featured: true,
    seoKeywords: [
      "deep cleaning Lagos",
      "rainy season cleaning",
      "mold prevention Nigeria",
      "home maintenance Lagos",
      "professional cleaning tips",
    ],
  },
  {
    id: "2",
    slug: "laundry-care-tropical-climate-nigeria",
    title:
      "Laundry Care in Nigeria's Tropical Climate: Expert Tips for Fresh Clothes",
    excerpt:
      "Master laundry care in Nigeria's humid climate. From fabric selection to drying techniques, learn how to keep clothes fresh and long-lasting.",
    content: "",
    featuredImage: "/images/blog/blog-2.jpg",
    author: {
      name: "metromellow",
      avatar: "/images/brand/brand-logo/solid-bg/green-bg.png",
      bio: "Textile care specialist with expertise in tropical climate laundry management.",
    },
    category: {
      id: "laundry",
      name: "Laundry Care",
      slug: "laundry",
      description: "Laundry tips and fabric care guides",
      color: "#3B82F6",
      icon: "👔",
      postCount: 8,
    },
    tags: [
      "laundry care",
      "tropical climate",
      "fabric care",
      "humidity",
      "clothes maintenance",
    ],
    publishedAt: "2024-03-10T10:30:00Z",
    updatedAt: "2024-03-10T10:30:00Z",
    readTime: 6,
    metaTitle:
      "Laundry Care in Nigeria's Climate | Tropical Fabric Care Tips | Metro Mellow",
    metaDescription:
      "Expert laundry care tips for Nigeria's tropical climate. Keep clothes fresh, prevent mold, and extend fabric life with professional techniques.",
    featured: true,
    seoKeywords: [
      "laundry care Nigeria",
      "tropical climate laundry",
      "fabric care humid weather",
      "clothes maintenance Lagos",
      "professional laundry tips",
    ],
  },
  {
    id: "3",
    slug: "nigerian-meal-prep-busy-professionals-lagos",
    title: "Nigerian Meal Prep Ideas for Busy Lagos Professionals",
    excerpt:
      "Time-saving meal prep strategies featuring Nigerian cuisine. Healthy, delicious meals that fit your busy Lagos lifestyle.",
    content: "",
    featuredImage: "/images/blog/blog-3.jpg",
    author: {
      name: "metromellow",
      avatar: "/images/brand/brand-logo/solid-bg/green-bg.png",
      bio: "Professional chef specializing in Nigerian cuisine and meal preparation services.",
    },
    category: {
      id: "cooking",
      name: "Cooking & Meals",
      slug: "cooking",
      description: "Cooking tips, meal prep, and Nigerian cuisine guides",
      color: "#F59E0B",
      icon: "🍽️",
      postCount: 15,
    },
    tags: [
      "meal prep",
      "Nigerian cuisine",
      "busy professionals",
      "healthy eating",
      "time management",
    ],
    publishedAt: "2024-03-08T14:15:00Z",
    updatedAt: "2024-03-08T14:15:00Z",
    readTime: 7,
    metaTitle:
      "Nigerian Meal Prep for Busy Lagos Professionals | Healthy Recipes | Metro Mellow",
    metaDescription:
      "Time-saving Nigerian meal prep ideas for busy Lagos professionals. Healthy, delicious recipes that fit your hectic schedule.",
    featured: true,
    seoKeywords: [
      "Nigerian meal prep",
      "Lagos professionals",
      "healthy Nigerian food",
      "meal planning Nigeria",
      "busy lifestyle cooking",
    ],
  },
  {
    id: "4",
    slug: "pest-control-lagos-rainy-season-prevention",
    title: "Pest Control During Lagos Rainy Season: Prevention and Solutions",
    excerpt:
      "Effective pest control strategies for Lagos homes during rainy season. Learn how to prevent and manage common household pests naturally and safely.",
    content: "",
    featuredImage: "/images/blog/blog-4.jpg",
    author: {
      name: "metromellow",
      avatar: "/images/brand/brand-logo/solid-bg/green-bg.png",
      bio: "Certified pest control specialist with 10+ years experience in Lagos environmental management.",
    },
    category: {
      id: "pest-control",
      name: "Pest Control",
      slug: "pest-control",
      description: "Pest management and prevention guides",
      color: "#EF4444",
      icon: "🐜",
      postCount: 6,
    },
    tags: [
      "pest control",
      "rainy season",
      "prevention",
      "natural remedies",
      "home safety",
    ],
    publishedAt: "2024-03-05T11:20:00Z",
    updatedAt: "2024-03-05T11:20:00Z",
    readTime: 9,
    metaTitle:
      "Pest Control Lagos Rainy Season | Natural Prevention Tips | Metro Mellow",
    metaDescription:
      "Expert pest control tips for Lagos rainy season. Natural prevention methods and safe solutions for common household pests.",
    featured: false,
    seoKeywords: [
      "pest control Lagos",
      "rainy season pests",
      "natural pest control",
      "home pest prevention",
      "safe pest management",
    ],
  },
  {
    id: "5",
    slug: "home-organization-small-lagos-apartments",
    title:
      "Maximizing Space: Home Organization Tips for Small Lagos Apartments",
    excerpt:
      "Transform your small Lagos apartment with clever organization tips. Create more space and improve functionality with professional organizing strategies.",
    content: "",
    featuredImage: "/images/blog/blog-5.jpg",
    author: {
      name: "metromellow",
      avatar: "/images/brand/brand-logo/solid-bg/green-bg.png",
      bio: "Professional home organizer and interior design consultant based in Lagos.",
    },
    category: {
      id: "home-organization",
      name: "Home Organization",
      slug: "home-organization",
      description: "Home organization and space optimization tips",
      color: "#8B5CF6",
      icon: "📦",
      postCount: 10,
    },
    tags: [
      "home organization",
      "small spaces",
      "apartment living",
      "storage solutions",
      "decluttering",
    ],
    publishedAt: "2024-03-01T16:45:00Z",
    updatedAt: "2024-03-01T16:45:00Z",
    readTime: 5,
    metaTitle:
      "Home Organization Tips for Small Lagos Apartments | Space Solutions | Metro Mellow",
    metaDescription:
      "Maximize space in small Lagos apartments with expert organization tips. Professional strategies for better storage and functionality.",
    featured: false,
    seoKeywords: [
      "home organization Lagos",
      "small apartment organization",
      "space optimization",
      "storage solutions Nigeria",
      "decluttering tips",
    ],
  },
];

export const sampleCategories: BlogCategory[] = [
  {
    id: "cleaning",
    name: "Cleaning Tips",
    slug: "cleaning",
    description: "Professional cleaning advice and techniques for Lagos homes",
    color: "#10B981",
    icon: "🧹",
    postCount: 12,
  },
  {
    id: "laundry",
    name: "Laundry Care",
    slug: "laundry",
    description: "Laundry tips and fabric care guides for tropical climate",
    color: "#3B82F6",
    icon: "👔",
    postCount: 8,
  },
  {
    id: "cooking",
    name: "Cooking & Meals",
    slug: "cooking",
    description: "Cooking tips, meal prep, and Nigerian cuisine guides",
    color: "#F59E0B",
    icon: "🍽️",
    postCount: 15,
  },
  {
    id: "pest-control",
    name: "Pest Control",
    slug: "pest-control",
    description: "Pest management and prevention guides for Lagos homes",
    color: "#EF4444",
    icon: "🐜",
    postCount: 6,
  },
  {
    id: "home-organization",
    name: "Home Organization",
    slug: "home-organization",
    description: "Home organization and space optimization tips",
    color: "#8B5CF6",
    icon: "📦",
    postCount: 10,
  },
  {
    id: "home-maintenance",
    name: "Home Maintenance",
    slug: "home-maintenance",
    description: "General home maintenance and care tips",
    color: "#6B7280",
    icon: "🔧",
    postCount: 7,
  },
];

// Blog service functions
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  // In production, this would fetch from your CMS/API
  const posts = sampleBlogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return limit ? posts.slice(0, limit) : posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // In production, this would fetch from your CMS/API
  return sampleBlogPosts.find((post) => post.slug === slug) || null;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  // In production, this would fetch from your CMS/API
  return sampleCategories;
}

export async function getBlogPostsByCategory(
  categorySlug: string,
  limit?: number
): Promise<BlogPost[]> {
  // In production, this would fetch from your CMS/API
  const posts = sampleBlogPosts
    .filter((post) => post.category.slug === categorySlug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return limit ? posts.slice(0, limit) : posts;
}

export async function getFeaturedBlogPosts(
  limit: number = 3
): Promise<BlogPost[]> {
  // In production, this would fetch from your CMS/API
  return sampleBlogPosts.filter((post) => post.featured).slice(0, limit);
}

export async function getRelatedPosts(
  currentPostSlug: string,
  limit: number = 3
): Promise<BlogPost[]> {
  const currentPost = await getBlogPost(currentPostSlug);
  if (!currentPost) return [];

  // In production, this would use more sophisticated matching
  return sampleBlogPosts
    .filter(
      (post) =>
        post.slug !== currentPostSlug &&
        post.category.id === currentPost.category.id
    )
    .slice(0, limit);
}
