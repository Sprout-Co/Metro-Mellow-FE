import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Routes } from "@/constants/routes";
import {
  decodeAndValidateToken,
  getUserRoleFromToken,
  isTokenValid,
} from "./utils/jwt";

// Define protected routes that require authentication
const protectedRoutes = [
  Routes.DASHBOARD,
  Routes.PROFILE,
  Routes.SERVICES,
  Routes.BOOKINGS,
  Routes.PAYMENTS,
];

// Define admin-only routes
const adminRoutes = [
  Routes.ADMIN_DASHBOARD,
  Routes.ADMIN_USERS,
  Routes.ADMIN_STAFF,
];

// UserRole enum values (since we can't import from GraphQL in middleware)
const UserRole = {
  Customer: "CUSTOMER",
  Staff: "STAFF",
  Admin: "ADMIN",
  SuperAdmin: "SUPER_ADMIN",
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the JWT token from the auth-token cookie
  const authToken = request.cookies.get("auth-token")?.value;

  // Validate JWT token and extract user data
  let userRole: string | null = null;
  let isTokenValid = false;

  if (authToken) {
    const decodedToken = decodeAndValidateToken(authToken);
    if (decodedToken) {
      userRole = decodedToken.role;
      isTokenValid = true;
    }
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is admin-only
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Check if the route is the dashboard
  const isDashboardRoute = pathname.startsWith(Routes.DASHBOARD);

  // If it's a protected route and there's no valid token, redirect to login
  if (isProtectedRoute && (!authToken || !isTokenValid)) {
    return NextResponse.redirect(new URL(Routes.GET_STARTED, request.url));
  }

  // If it's the dashboard route and user is not a customer, redirect based on role
  if (
    isDashboardRoute &&
    authToken &&
    isTokenValid &&
    userRole !== UserRole.Customer
  ) {
    if (userRole === UserRole.Admin || userRole === UserRole.SuperAdmin) {
      return NextResponse.redirect(
        new URL(Routes.ADMIN_DASHBOARD, request.url)
      );
    } else if (userRole === UserRole.Staff) {
      // Redirect staff to a staff-specific route or home page
      return NextResponse.redirect(new URL(Routes.HOME, request.url));
    }
  }

  // If it's an admin route and user is not an admin, redirect to dashboard
  if (
    isAdminRoute &&
    userRole !== UserRole.Admin &&
    userRole !== UserRole.SuperAdmin
  ) {
    return NextResponse.redirect(new URL(Routes.DASHBOARD, request.url));
  }

  // If user is logged in and tries to access auth pages, redirect to dashboard
  if (
    authToken &&
    isTokenValid &&
    (pathname === Routes.GET_STARTED ||
      pathname === Routes.LOGIN ||
      pathname === Routes.REGISTER)
  ) {
    // Redirect based on user role
    if (userRole === UserRole.Customer) {
      return NextResponse.redirect(new URL(Routes.DASHBOARD, request.url));
    } else if (
      userRole === UserRole.Admin ||
      userRole === UserRole.SuperAdmin
    ) {
      return NextResponse.redirect(
        new URL(Routes.ADMIN_DASHBOARD, request.url)
      );
    } else {
      return NextResponse.redirect(new URL(Routes.HOME, request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
