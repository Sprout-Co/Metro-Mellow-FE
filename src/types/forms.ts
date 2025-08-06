export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  pricing: ServicePricing[];
  features: string[];
  faqs: FAQ[];
}

export interface ServicePricing {
  id: string;
  name: string;
  price: number;
  unit: string; // 'hour', 'session', 'monthly', etc.
  features: string[];
  isPopular?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ServiceCategory =
  | "cleaning"
  | "laundry"
  | "cooking"
  | "errands"
  | "pest-control";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceInterest: ServiceCategory | null;
  message: string;
}

export interface BookingFormData extends ContactFormData {
  serviceId: string;
  serviceOption: string;
  preferredDate: Date;
  preferredTimeSlot: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  specialInstructions?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number; // 1-5
  serviceUsed: ServiceCategory;
  avatar?: string;
}

export interface SocialMediaLink {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube";
  url: string;
  icon: string;
}
