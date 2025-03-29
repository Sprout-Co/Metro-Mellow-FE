import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Routes } from "@/constants/routes";
import { UserRole } from "@/graphql/api";

// Define protected routes that require authentication
const protectedRoutes = [
  Routes.DASHBOARD,
  Routes.PROFILE,
  Routes.SETTINGS,
  Routes.SERVICES,
  Routes.BOOKINGS,
  Routes.PAYMENTS,
];

// Define admin-only routes
const adminRoutes = [Routes.ADMIN_DASHBOARD, Routes.USERS, Routes.STAFF];

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth-storage");
  const { pathname } = request.nextUrl;

  // Parse the auth storage cookie
  let userRole: UserRole | null = null;
  if (authCookie?.value) {
    try {
      const authData = JSON.parse(authCookie.value);
      userRole = authData.state.user?.role;
    } catch (e) {
      console.error("Error parsing auth cookie:", e);
    }
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is admin-only
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // If it's a protected route and there's no token, redirect to login
  if (isProtectedRoute && !authCookie) {
    return NextResponse.redirect(new URL(Routes.GET_STARTED, request.url));
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
    authCookie &&
    (pathname === Routes.GET_STARTED ||
      pathname === Routes.LOGIN ||
      pathname === Routes.REGISTER)
  ) {
    return NextResponse.redirect(new URL(Routes.DASHBOARD, request.url));
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
