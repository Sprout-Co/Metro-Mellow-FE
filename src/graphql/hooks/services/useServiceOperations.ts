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
  CreateServiceMutationVariables,
} from "@/graphql/api";
import { ServiceCategory, ServiceStatus, ServiceId } from "@/graphql/api";

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
    async (input: CreateServiceMutationVariables) => {
      try {
        const { data, errors } = await createServiceMutation({
          variables: input,
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

  const { refetch: getServices } = useGetServicesQuery({
    skip: true,
  });

  const handleGetServices = useCallback(
    async (category?: ServiceCategory, status?: ServiceStatus) => {
      try {
        const { data, errors } = await getServices({ category, status });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.services?.map((service) => ({
          ...service,
          options: service.options?.filter(
            (option) => option.service_id !== ServiceId.PostConstructionCleaning
          ),
        }));
      } catch (error) {
        console.error("Services fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getServices]
  );

  return {
    handleCreateService,
    handleUpdateService,
    handleDeleteService,
    handleUpdateServiceStatus,
    handleGetService,
    handleGetServices,
  };
};

/**
 * Hook wrapper for useGetServicesQuery that applies the same filtering
 * logic as handleGetServices (filters out postconstruction cleaning).
 */
export const useGetServices = (variables?: {
  category?: ServiceCategory;
  status?: ServiceStatus;
}) => {
  const queryResult = useGetServicesQuery({
    variables: {
      category: variables?.category,
      status: variables?.status,
    },
  });

  // Apply the same filtering logic as handleGetServices
  const filteredData = queryResult.data?.services
    ? {
        ...queryResult.data,
        services: queryResult.data.services.map((service) => ({
          ...service,
          options: service.options?.filter(
            (option) => option.service_id !== ServiceId.PostConstructionCleaning
          ),
        })),
      }
    : queryResult.data;

  return {
    ...queryResult,
    data: filteredData,
  };
};
