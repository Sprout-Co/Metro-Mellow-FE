"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setLoading, setServices } from "@/lib/redux/slices/servicesSlice";
import { ServiceStatus } from "@/graphql/api";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { setError } from "@/lib/redux/slices/servicesSlice";

interface CommonInitializerProps {
  children: React.ReactNode;
}

export function CommonInitializer({ children }: CommonInitializerProps) {
  const dispatch = useAppDispatch();
  const { handleGetServices } = useServiceOperations();

  // Fetch services from API
  const fetchServices = useCallback(
    async (status?: ServiceStatus) => {
      try {
        dispatch(setLoading(true));
        const fetchedServices = await handleGetServices(undefined, status);
        dispatch(setServices(fetchedServices || []));
      } catch (err) {
        console.error("Failed to fetch services:", err);
        dispatch(setError("Failed to load services. Please try again."));
      }
    },
    [dispatch, handleGetServices]
  );

  useEffect(() => {
    fetchServices(ServiceStatus.Active);
  }, [fetchServices]);

  return <>{children}</>;
}
