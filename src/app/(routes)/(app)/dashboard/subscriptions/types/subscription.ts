// src/app/(routes)/(app)/dashboard/subscriptions/types/subscription.ts

export enum ServiceCategory {
  Cleaning = "Cleaning",
  Laundry = "Laundry",
  Cooking = "Cooking",
  Errands = "Errands",
  PestControl = "Pest Control",
}

export enum SubscriptionStatus {
  Active = "Active",
  Paused = "Paused",
  Cancelled = "Cancelled",
  Expired = "Expired",
  PendingActivation = "Pending Activation",
}

export enum SubscriptionFrequency {
  Weekly = "Weekly",
  BiWeekly = "Bi-weekly",
  Monthly = "Monthly",
  Quarterly = "Quarterly",
}

export interface SubscriptionService {
  id: string;
  serviceName: string;
  service_category: ServiceCategory;
  price: number;
  frequency: SubscriptionFrequency;
  scheduledDays: string[];
  completedServices: number;
  totalServices: number;
  nextServiceDate: Date;
  provider?: string;
  notes?: string;
}

export interface UpcomingBooking {
  id: string;
  serviceName: string;
  service_category: ServiceCategory;
  date: Date;
  time: string;
  provider: string;
  address: string;
  status: "scheduled" | "confirmed" | "in_progress";
}

export interface Subscription {
  id: string;
  name: string;
  status: SubscriptionStatus;
  billingCycle: "monthly" | "quarterly" | "annually";
  totalPrice: number;
  startDate: Date;
  endDate?: Date;
  address: string;
  autoRenewal: boolean;
  lastPaymentDate: Date;
  nextBillingDate: Date;
  paymentMethod: string;
  discount?: number;

  // Included services in this subscription
  services: SubscriptionService[];

  // Upcoming bookings from all services
  upcomingBookings: UpcomingBooking[];

  // Calculated fields
  totalServices: number;
  completedServices: number;
  remainingServices: number;
  nextServiceDate?: Date;
  primaryProvider?: string;
}

export interface FilterOption {
  value: string;
  label: string;
}
