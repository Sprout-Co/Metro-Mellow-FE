import * as LucideIcons from "lucide-react";

export type IconName = keyof typeof LucideIcons;

interface service_category {
  id: number;
  name: string;
  slug: string;
  icon: IconName;
  shortDescription: string;
  fullDescription?: string;
  benefits?: string[];
  inclusions?: string[];
  pricing?: {
    basic?: number;
    standard?: number;
    premium?: number;
  };
}

export const services: service_category[] = [
  {
    id: 1,
    name: "House Cleaning",
    slug: "house-cleaning",
    icon: "House",
    shortDescription:
      "Professional cleaning services to keep your home spotless and sanitized.",
    fullDescription: `'Our comprehensive house cleaning services are designed to give you a spotless, sanitized home without the hassle. Our trained professionals use quality equipment and eco-friendly products to ensure a thorough clean that's safe for your family and pets.'`,
    benefits: [
      "Save time and energy for things you enjoy",
      "Consistent, high-quality cleaning",
      "Flexible scheduling to fit your lifestyle",
      "Eco-friendly cleaning products",
      "Trained and vetted cleaning professionals",
    ],
    inclusions: [
      "Dusting and wiping all surfaces",
      "Vacuuming and mopping floors",
      "Bathroom cleaning and sanitizing",
      "Kitchen cleaning including appliances",
      "Bed making and linen changing (upon request)",
      "Window sill and blinds cleaning",
    ],
    pricing: {
      basic: 99,
      standard: 149,
      premium: 199,
    },
  },
  {
    id: 2,
    name: "Laundry & Ironing",
    slug: "laundry-ironing",
    icon: "Shirt",
    shortDescription:
      "Let us handle your laundry and ironing needs with our professional service.",
    fullDescription:
      "Our laundry and ironing service takes the hassle out of keeping your clothes clean and wrinkle-free. We handle everything from everyday wear to delicate fabrics with care and attention to detail.",
    pricing: {
      basic: 79,
      standard: 119,
      premium: 159,
    },
  },
  {
    id: 3,
    name: "Cooking Service",
    slug: "cooking-service",
    icon: "CookingPot",
    shortDescription:
      "Enjoy delicious, home-cooked meals prepared by professional chefs in your kitchen.",
    fullDescription:
      "Our professional chefs prepare delicious meals in the comfort of your home, catering to your dietary preferences and needs.",
    pricing: {
      basic: 129,
      standard: 179,
      premium: 229,
    },
  },
  {
    id: 4,
    name: "Errand Service",
    slug: "errand-service",
    icon: "PersonStanding",
    shortDescription:
      "Save time with our reliable errand service that handles your to-do list.",
    pricing: {
      basic: 69,
      standard: 99,
      premium: 149,
    },
  },
  {
    id: 5,
    name: "Pest Control",
    slug: "pest-control",
    icon: "BugOff",
    shortDescription:
      "Effective and safe pest control solutions for your home and garden.",
    pricing: {
      basic: 109,
      standard: 159,
      premium: 209,
    },
  },
  {
    id: 6,
    name: "Gardening",
    slug: "gardening",
    icon: "Fence",
    shortDescription:
      "Keep your garden looking beautiful with our professional gardening services.",
    pricing: {
      basic: 89,
      standard: 139,
      premium: 189,
    },
  },
];

export default services;
