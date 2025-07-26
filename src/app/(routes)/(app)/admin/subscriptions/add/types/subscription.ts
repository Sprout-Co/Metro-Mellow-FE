import {
  SubscriptionFrequency,
  ScheduleDays,
  TimeSlot,
  ServiceCategory,
  HouseType,
  RoomQuantitiesInput,
  LaundryType,
  LaundryItemsInput,
  Severity,
  TreatmentType,
  MealType,
  MealDeliveryInput,
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

  // Service-specific configurations
  cleaning?: {
    houseType?: HouseType;
    roomQuantities?: RoomQuantitiesInput;
  };

  laundry?: {
    bags?: number;
    laundryType?: LaundryType;
    items?: LaundryItemsInput;
  };

  pestControl?: {
    severity?: Severity;
    treatmentType?: TreatmentType;
    areas?: string[];
  };

  cooking?: {
    mealType?: MealType;
    mealsPerDelivery?: MealDeliveryInput[];
  };
}
