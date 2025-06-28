"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectIsAuthenticated, selectToken } from "@/lib/redux";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectToken);
  const { handleGetCurrentUser } = useAuthOperations();

  useEffect(() => {
    // Only attempt to get current user if we have a token
    if (token) {
      handleGetCurrentUser().catch((error) => {
        // Silently handle authentication errors - this is expected when token is invalid/expired
        console.log("Auth initialization failed:", error.message);
      });
    }
  }, [token, handleGetCurrentUser]);

  return <>{children}</>;
}
