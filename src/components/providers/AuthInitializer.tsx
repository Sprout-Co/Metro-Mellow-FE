"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logout, selectIsAuthenticated, selectToken } from "@/lib/redux";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectToken);
  const { handleGetCurrentUser } = useAuthOperations();
  const dispatch = useAppDispatch();
  const initializationAttempted = useRef(false);

  useEffect(() => {
    // console.log(token);
    // console.log(isAuthenticated);
    // console.log(initializationAttempted.current);
    // Prevent multiple initialization attempts and don't block rendering
    if (token && !initializationAttempted.current /** && !isAuthenticated */) {
      console.log("AuthInitializer useEffect called 2");
      initializationAttempted.current = true;

      // Use setTimeout to prevent blocking the render cycle
      setTimeout(() => {
        handleGetCurrentUser().catch((error) => {
          // Silently handle authentication errors - this is expected when token is invalid/expired
          console.log("Auth initialization failed:", error);
          dispatch(logout());
        });
      }, 0);
    }
  }, [token, handleGetCurrentUser, dispatch /** , isAuthenticated */]);

  // Always render children immediately - don't block on auth
  return <>{children}</>;
}
