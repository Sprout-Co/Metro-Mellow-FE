import {
  SubscriptionFrequency,
  ScheduleDays,
  TimeSlot,
  ServiceCategory,
} from "@/graphql/api";

export interface ServiceConfiguration {
  serviceId: string;
  price: number;
  frequency: SubscriptionFrequency;
  scheduledDays: ScheduleDays[];
  preferredTimeSlot: TimeSlot;
  serviceDetails: any;
  category: ServiceCategory;
  selectedOption?: string;
}
