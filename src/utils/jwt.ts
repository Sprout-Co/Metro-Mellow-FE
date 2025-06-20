import { jwtDecode } from "jwt-decode";
import { UserRole } from "@/graphql/api";

export interface JWTPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  iat: number;
  exp: number;
}

/**
 * Decodes and validates a JWT token
 * @param token - The JWT token to decode
 * @returns The decoded payload if valid, null if invalid or expired
 */
export function decodeAndValidateToken(token: string): JWTPayload | null {
  try {
    const decoded = jwtDecode<JWTPayload>(token);

    // Check if token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      console.warn("JWT token has expired");
      return null;
    }

    // Validate required fields
    if (!decoded.id || !decoded.email || !decoded.role) {
      console.warn("JWT token missing required fields");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

/**
 * Extracts user role from JWT token
 * @param token - The JWT token
 * @returns UserRole if valid, null if invalid
 */
export function getUserRoleFromToken(token: string): UserRole | null {
  const payload = decodeAndValidateToken(token);
  return payload?.role || null;
}

/**
 * Checks if a JWT token is valid and not expired
 * @param token - The JWT token to check
 * @returns true if valid and not expired, false otherwise
 */
export function isTokenValid(token: string): boolean {
  return decodeAndValidateToken(token) !== null;
}
