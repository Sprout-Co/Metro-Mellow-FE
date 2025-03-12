// types/cooking.ts

export type DeliveryFrequency = 'weekly' | 'biweekly' | 'monthly';

export interface MealPlan {
  id: string;
  title: string;
  description: string;
  price: {
    weekly: number;
    biweekly: number;
    monthly: number;
  };
  meals: number;
  features: string[];
  popular?: boolean;
  imageSrc?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  imageSrc: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  iconSrc: string;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  iconSrc: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}