export const API_URL = "http://localhost:4000/graphql";

export const REST_API_BASE_URL =
  process.env.NEXT_PUBLIC_REST_API_URL || "http://localhost:4000";

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

export const ContactDetails = {
  PHONE: "+2349069894176",
  WHATSAPP: "+2349069894176",
  WHATSAPP_URL: "https://wa.me/2349069894176",
  EMAIL: "team@metromellow.com",
  ADDRESS: "Opeyemi Street, Yaba, Lagos",
} as const;

export const REFERRAL_CODE_STORAGE_KEY = "referral_code";
