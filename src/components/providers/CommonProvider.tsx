"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setLoading, setServices, setError, selectServices } from "@/lib/redux/slices/servicesSlice";
import { ServiceStatus } from "@/graphql/api";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";

interface CommonInitializerProps {
  children: React.ReactNode;
}

export function CommonInitializer({ children }: CommonInitializerProps) {
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectServices);
  const { handleGetServices } = useServiceOperations();
  const servicesInitialized = useRef(false);

  // Fetch services from API only if not already loaded
  const fetchServices = useCallback(
    async (status?: ServiceStatus) => {
      // Skip if services already loaded or initialization already attempted
      if (services.length > 0 || servicesInitialized.current) {
        return;
      }

      servicesInitialized.current = true;

      // Use setTimeout to prevent blocking route navigation
      setTimeout(async () => {
        try {
          dispatch(setLoading(true));
          const fetchedServices = await handleGetServices(undefined, status);
          dispatch(setServices(fetchedServices || []));
        } catch (err) {
          console.error("Failed to fetch services:", err);
          dispatch(setError("Failed to load services. Please try again."));
          // Reset flag on error to allow retry
          servicesInitialized.current = false;
        } finally {
          dispatch(setLoading(false));
        }
      }, 100);
    },
    [dispatch, handleGetServices, services.length]
  );

  useEffect(() => {
    fetchServices(ServiceStatus.Active);
  }, [fetchServices]);

  // Always render children immediately - don't block on services
  return <>{children}</>;
}
