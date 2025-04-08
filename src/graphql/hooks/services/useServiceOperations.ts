/**
 * Custom hook for handling all service-related operations.
 * Provides functions for managing services including creation, updates,
 * status changes, and pricing management.
 *
 * @returns Object containing all service operation handlers
 */
import { useCallback } from "react";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceStatusMutation,
  useGetServiceByIdQuery,
  useGetServicesQuery,
} from "@/graphql/api";
import { ServiceCategory, ServiceStatus } from "@/graphql/api";

export const useServiceOperations = () => {
  const [createServiceMutation] = useCreateServiceMutation();
  const [updateServiceMutation] = useUpdateServiceMutation();
  const [deleteServiceMutation] = useDeleteServiceMutation();
  const [updateServiceStatusMutation] = useUpdateServiceStatusMutation();

  /**
   * Creates a new service
   * @param input - Service creation input object
   * @returns Created service
   * @throws Error if creation fails
   */
  const handleCreateService = useCallback(
    async (input: {
      name: string;
      description: string;
      category: ServiceCategory;
      price: number;
      duration: number;
      imageUrl?: string;
      features?: string[];
      requirements?: string[];
      pricing: {
        basePrice: number;
        duration: number;
      };
      displayPrice: string;
      icon: string;
      label: string;
      service_id: string;
    }) => {
      try {
        const { data, errors } = await createServiceMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createService;
      } catch (error) {
        console.error("Service creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createServiceMutation]
  );

  /**
   * Updates an existing service
   * @param id - Service ID
   * @param input - Service update input object
   * @returns Updated service
   * @throws Error if update fails
   */
  const handleUpdateService = useCallback(
    async (
      updateServiceId: string,
      input: {
        name?: string;
        description?: string;
        category?: ServiceCategory;
        price?: number;
        duration?: number;
        status?: ServiceStatus;
        imageUrl?: string;
        features?: string[];
        requirements?: string[];
        pricing?: {
          basePrice: number;
          duration: number;
        };
        displayPrice?: string;
        icon?: string;
        label?: string;
      }
    ) => {
      try {
        const { data, errors } = await updateServiceMutation({
          variables: { updateServiceId, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateService;
      } catch (error) {
        console.error("Service update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateServiceMutation]
  );

  /**
   * Deletes a service
   * @param id - Service ID
   * @returns Boolean indicating success
   * @throws Error if deletion fails
   */
  const handleDeleteService = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await deleteServiceMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.deleteService;
      } catch (error) {
        console.error("Service deletion error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [deleteServiceMutation]
  );

  /**
   * Updates service status
   * @param id - Service ID
   * @param status - New status
   * @returns Updated service
   * @throws Error if update fails
   */
  const handleUpdateServiceStatus = useCallback(
    async (updateServiceStatusId: string, status: ServiceStatus) => {
      try {
        const { data, errors } = await updateServiceStatusMutation({
          variables: { updateServiceStatusId, status },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateServiceStatus;
      } catch (error) {
        console.error("Service status update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateServiceStatusMutation]
  );

  /**
   * Fetches a single service by ID
   * @param id - Service ID
   * @returns Service data
   * @throws Error if fetch fails
   */
  const handleGetService = useCallback(async (id: string) => {
    try {
      const { data, errors } = await useGetServiceByIdQuery({
        variables: { id },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.service;
    } catch (error) {
      console.error("Service fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  // Move the query hook to the top level
  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useGetServicesQuery({
    variables: { category: undefined, status: undefined },
  });

  const handleGetServices = useCallback(
    async (category?: ServiceCategory, status?: ServiceStatus) => {
      try {
        if (servicesError) {
          throw new Error(servicesError.message);
        }
        return servicesData?.services.filter((service) => {
          const matchesCategory = category ? service.category === category : true;
          const matchesStatus = status ? service.status === status : true;
          return matchesCategory && matchesStatus;
        });
        // return servicesData?.services;
      } catch (error) {
        console.error("Services fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [servicesData, servicesError]
  );

  return {
    handleCreateService,
    handleUpdateService,
    handleDeleteService,
    handleUpdateServiceStatus,
    handleGetService,
    handleGetServices,
    servicesLoading,
    servicesError,
  };
};
