export const API_URL = "http://localhost:4000/graphql";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SERVICES: "/services",
  BOOKINGS: "/bookings",
  PROFILE: "/profile",
} as const;

export const AUTH_TOKEN_KEY = "token";

export const SERVICE_CATEGORIES = {
  CLEANING: "CLEANING",
  MAINTENANCE: "MAINTENANCE",
  REPAIR: "REPAIR",
} as const;

export const BOOKING_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;
