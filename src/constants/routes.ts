export enum Routes {
  // Auth routes
  GET_STARTED = "/get-started",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGOT_PASSWORD = "/forgot-password",

  // App routes
  DASHBOARD = "/dashboard",
  PROFILE = "/profile",
  DASHBOARD_SETTINGS = "/dashboard/settings",
  DASHBOARD_SETTINGS_PROFILE = "/dashboard/settings/profile",
  DASHBOARD_SETTINGS_NOTIFICATIONS = "/dashboard/settings/notifications",
  DASHBOARD_SETTINGS_BILLING = "/dashboard/settings/billing",
  DASHBOARD_SETTINGS_HELP = "/dashboard/help",
  // Service routes
  SERVICES = "/services",
  BOOKINGS = "/bookings",
  PAYMENTS = "/payments",

  // Admin routes
  ADMIN_DASHBOARD = "/admin",
  USERS = "/admin/users",
  STAFF = "/admin/staff",

  // Public routes
  HOME = "/",
  ABOUT = "/about",
  CONTACT = "/contact",
  TERMS = "/terms",
  PRIVACY = "/privacy",
}
