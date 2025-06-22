"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectIsAuthenticated } from "@/lib/redux";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { handleGetCurrentUser } = useAuthOperations();

  useEffect(() => {
    if (!isAuthenticated) {
      handleGetCurrentUser();
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
