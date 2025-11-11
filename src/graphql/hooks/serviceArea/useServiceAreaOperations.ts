/**
 * Custom hook for handling all service area-related operations.
 * Provides functions for managing service areas including creation, updates,
 * and deletion.
 *
 * @returns Object containing all service area operation handlers
 */
import { useCallback } from "react";
import {
  useCreateServiceAreaMutation,
  useUpdateServiceAreaMutation,
  useDeleteServiceAreaMutation,
  useServiceAreaLazyQuery,
  useServiceAreasLazyQuery,
  useActiveServiceAreasLazyQuery,
  CreateServiceAreaInput,
  UpdateServiceAreaInput,
} from "@/graphql/api";

export const useServiceAreaOperations = () => {
  const [createServiceAreaMutation] = useCreateServiceAreaMutation();
  const [updateServiceAreaMutation] = useUpdateServiceAreaMutation();
  const [deleteServiceAreaMutation] = useDeleteServiceAreaMutation();
  const [getServiceArea, { data: serviceAreaData }] = useServiceAreaLazyQuery();
  const [getServiceAreas, { data: serviceAreasData }] =
    useServiceAreasLazyQuery();
  const [getActiveServiceAreas, { data: activeServiceAreasData }] =
    useActiveServiceAreasLazyQuery();

  /**
   * Creates a new service area
   * @param input - Service area creation input object
   * @returns Created service area
   * @throws Error if creation fails
   */
  const handleCreateServiceArea = useCallback(
    async (input: CreateServiceAreaInput) => {
      try {
        const { data, errors } = await createServiceAreaMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createServiceArea;
      } catch (error) {
        console.error("Service area creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createServiceAreaMutation]
  );

  /**
   * Updates an existing service area
   * @param id - Service area ID
   * @param input - Service area update input object
   * @returns Updated service area
   * @throws Error if update fails
   */
  const handleUpdateServiceArea = useCallback(
    async (id: string, input: UpdateServiceAreaInput) => {
      try {
        const { data, errors } = await updateServiceAreaMutation({
          variables: { updateServiceAreaId: id, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateServiceArea;
      } catch (error) {
        console.error("Service area update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateServiceAreaMutation]
  );

  /**
   * Deletes a service area
   * @param id - Service area ID
   * @returns Boolean indicating success
   * @throws Error if deletion fails
   */
  const handleDeleteServiceArea = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await deleteServiceAreaMutation({
          variables: { deleteServiceAreaId: id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.deleteServiceArea;
      } catch (error) {
        console.error("Service area deletion error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [deleteServiceAreaMutation]
  );

  /**
   * Fetches a single service area by ID
   * @param id - Service area ID
   * @returns Service area data
   * @throws Error if fetch fails
   */
  const handleGetServiceArea = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await getServiceArea({
          variables: { serviceAreaId: id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.serviceArea;
      } catch (error) {
        console.error("Service area fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getServiceArea]
  );

  /**
   * Fetches all service areas
   * @returns Array of service areas
   * @throws Error if fetch fails
   */
  const handleGetServiceAreas = useCallback(async () => {
    try {
      const { data, errors } = await getServiceAreas();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.serviceAreas;
    } catch (error) {
      console.error("Service areas fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getServiceAreas]);

  /**
   * Fetches all active service areas
   * @returns Array of active service areas
   * @throws Error if fetch fails
   */
  const handleGetActiveServiceAreas = useCallback(async () => {
    try {
      const { data, errors } = await getActiveServiceAreas();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.activeServiceAreas;
    } catch (error) {
      console.error("Active service areas fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getActiveServiceAreas]);

  return {
    handleCreateServiceArea,
    handleUpdateServiceArea,
    handleDeleteServiceArea,
    handleGetServiceArea,
    handleGetServiceAreas,
    handleGetActiveServiceAreas,
    // Return the current data
    currentServiceArea: serviceAreaData?.serviceArea,
    currentServiceAreas: serviceAreasData?.serviceAreas,
    currentActiveServiceAreas: activeServiceAreasData?.activeServiceAreas,
  };
};
