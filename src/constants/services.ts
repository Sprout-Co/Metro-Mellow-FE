/**
 * Service data for internal linking and SEO
 * This helps create consistent internal links between service pages
 */

export interface ServiceLink {
  title: string;
  href: string;
  description: string;
}

export const allServices: ServiceLink[] = [
  {
    title: "Cleaning Services",
    href: "/services/cleaning",
    description:
      "Professional house and office cleaning services throughout Lagos. Deep cleaning, regular maintenance, and eco-friendly options available.",
  },
  {
    title: "Laundry Services",
    href: "/services/laundry",
    description:
      "Professional laundry and dry cleaning with free pickup and delivery. Expert garment care and eco-friendly options available.",
  },
  {
    title: "Food Delivery",
    href: "/services/food",
    description:
      "Fresh, nutritious meals prepared by professional chefs and delivered straight to your door in Lagos.",
  },
  {
    title: "Pest Control",
    href: "/services/pest-control",
    description:
      "Safe and effective pest elimination for residential and commercial properties using eco-friendly methods.",
  },
];
