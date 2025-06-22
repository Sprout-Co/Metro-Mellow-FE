"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/slices/auth";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { isAuthenticated } = useAuthStore();
  const { handleGetCurrentUser } = useAuthOperations();

  useEffect(() => {
    if (!isAuthenticated) {
      handleGetCurrentUser();
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
