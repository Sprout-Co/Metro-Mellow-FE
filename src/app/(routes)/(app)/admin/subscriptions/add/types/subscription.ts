import {
  SubscriptionFrequency,
  ScheduleDays,
  TimeSlot,
  ServiceCategory,
  CleaningDetailsInput,
  LaundryDetailsInput,
  PestControlDetailsInput,
  CookingDetailsInput,
  ServiceDetails,
} from "@/graphql/api";

export interface ServiceConfiguration {
  serviceId: string;
  price: number;
  frequency: SubscriptionFrequency;
  scheduledDays: ScheduleDays[];
  preferredTimeSlot: TimeSlot;
  serviceDetails: ServiceDetails;
  category: ServiceCategory;
  selectedOption: string;

  // Service-specific configurations using existing API types
  cleaning?: CleaningDetailsInput;
  laundry?: LaundryDetailsInput;
  pestControl?: PestControlDetailsInput;
  cooking?: CookingDetailsInput;
}
