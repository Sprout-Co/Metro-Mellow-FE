// src/types/bookings.ts
export enum ServiceCategory {
  Cleaning = "Cleaning",
  Laundry = "Laundry",
  Cooking = "Cooking",
  Errands = "Errands",
  PestControl = "Pest Control",
}

export enum BookingStatus {
  Upcoming = "Upcoming",
  Confirmed = "Confirmed",
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
  Cancelled = "Cancelled",
}

export interface Booking {
  id: string;
  serviceName: string;
  service_category: ServiceCategory;
  date: Date;
  endTime: Date;
  status: BookingStatus;
  provider: string;
  address: string;
  price: number;
  notes?: string;
  recurring: boolean;
  frequency?: string;
  rating?: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface CalendarDay {
  date: Date | null;
  bookings: Booking[];
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
}
