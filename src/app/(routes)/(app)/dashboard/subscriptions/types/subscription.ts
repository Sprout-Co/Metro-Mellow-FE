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

export interface Subscription {
  id: string;
  serviceName: string;
  serviceType: ServiceCategory;
  status: SubscriptionStatus;
  frequency: SubscriptionFrequency;
  nextServiceDate: Date;
  price: number;
  startDate: Date;
  endDate?: Date;
  provider?: string;
  address: string;
  notes?: string;
  totalServices: number;
  completedServices: number;
  remainingServices: number;
  autoRenewal: boolean;
  billingCycle: "monthly" | "quarterly" | "annually";
  lastPaymentDate: Date;
  nextBillingDate: Date;
  paymentMethod: string;
  discount?: number;
}

export interface FilterOption {
  value: string;
  label: string;
}
