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
  ADMIN_DASHBOARD = "/admin/dashboard",
  ADMIN_USERS = "/admin/users",
  ADMIN_STAFF = "/admin/staff",
  ADMIN_SETUP = "/admin/setup",
  ADMIN_CUSTOMERS = "/admin/customers",
  ADMIN_CUSTOMERS_DETAILS = "/admin/customers/[id]",
  // Public routes
  HOME = "/",
  WELCOME = "/welcome",
  ABOUT = "/about",
  CONTACT = "/contact",
  FOR_BUSINESS = "/for-business",
  TERMS = "/terms",
  PRIVACY = "/privacy",
}
