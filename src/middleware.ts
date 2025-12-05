import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Routes } from "@/constants/routes";
import { decodeAndValidateToken } from "./utils/jwt";

// Define protected routes that require authentication
const protectedRoutes = [Routes.DASHBOARD, Routes.PROFILE, Routes.PAYMENTS];

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

  // Early auth check for auth pages (before maintenance mode)
  if (
    pathname === Routes.GET_STARTED ||
    pathname === Routes.LOGIN ||
    pathname === Routes.REGISTER
  ) {
    const authToken = request.cookies.get("auth-token")?.value;
    if (authToken) {
      const decodedToken = decodeAndValidateToken(authToken);
      if (decodedToken) {
        // User is authenticated, redirect based on role
        if (decodedToken.role === UserRole.Customer) {
          return NextResponse.redirect(new URL(Routes.DASHBOARD, request.url));
        } else if (
          decodedToken.role === UserRole.Admin ||
          decodedToken.role === UserRole.SuperAdmin
        ) {
          return NextResponse.redirect(
            new URL(Routes.ADMIN_DASHBOARD, request.url)
          );
        } else {
          return NextResponse.redirect(new URL(Routes.HOME, request.url));
        }
      }
    }
  }

  // ✅ Much safer: Explicit control
  // if (process.env.MAINTENANCE_MODE === "true") {
  //   const isWelcomePage = pathname === Routes.WELCOME;
  //   const isApiRoute = pathname.startsWith("/api");
  //   const isSeoRoute =
  //     pathname === "/sitemap.xml" ||
  //     pathname === "/robots.txt" ||
  //     pathname === "/blog/rss.xml" ||
  //     pathname.startsWith("/blog");
  //   const isStaticAsset =
  //     pathname.startsWith("/_next") ||
  //     pathname.startsWith("/images") ||
  //     pathname.startsWith("/videos") ||
  //     pathname.startsWith("/public") ||
  //     pathname === "/favicon.ico";

  //   if (!isWelcomePage && !isApiRoute && !isSeoRoute && !isStaticAsset) {
  //     return NextResponse.redirect(new URL(Routes.WELCOME, request.url));
  //   }
  // }

  // Skip JWT processing for public routes and static assets
  const isPublicRoute =
    !protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !adminRoutes.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Get the JWT token from the auth-token cookie
  const authToken = request.cookies.get("auth-token")?.value;

  // Validate JWT token and extract user data only for protected routes
  let userRole: string | null = null;
  let isTokenValidFlag = false;

  if (authToken) {
    const decodedToken = decodeAndValidateToken(authToken);
    if (decodedToken) {
      userRole = decodedToken.role;
      isTokenValidFlag = true;
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
  if (isProtectedRoute && (!authToken || !isTokenValidFlag)) {
    return NextResponse.redirect(new URL(Routes.GET_STARTED, request.url));
  }

  // If it's the dashboard route and user is not a customer, redirect based on role
  if (
    isDashboardRoute &&
    authToken &&
    isTokenValidFlag &&
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

  // Auth page redirects are now handled early in the middleware

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
