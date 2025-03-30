/**
 * Custom hook for handling all staff-related operations.
 * Provides functions for managing staff profiles, availability,
 * documents, and performance tracking.
 *
 * @returns Object containing all staff operation handlers
 */
import { useCallback } from "react";
import {
  useCreateStaffProfileMutation,
  useUpdateStaffProfileMutation,
  useUpdateStaffStatusMutation,
  useUpdateStaffAvailabilityMutation,
  useUploadStaffDocumentMutation,
  useVerifyStaffDocumentMutation,
  useDeleteStaffDocumentMutation,
  useGetStaffProfileByIdQuery,
  useGetStaffProfilesQuery,
  useGetAvailableStaffQuery,
  useGetStaffPerformanceQuery,
} from "@/graphql/api";
import {
  ServiceCategory,
  StaffStatus,
  StaffDocumentType,
  StaffPerformance,
} from "@/graphql/api";

export const useStaffOperations = () => {
  const [createStaffProfileMutation] = useCreateStaffProfileMutation();
  const [updateStaffProfileMutation] = useUpdateStaffProfileMutation();
  const [updateStaffStatusMutation] = useUpdateStaffStatusMutation();
  const [updateStaffAvailabilityMutation] =
    useUpdateStaffAvailabilityMutation();
  const [uploadStaffDocumentMutation] = useUploadStaffDocumentMutation();
  const [verifyStaffDocumentMutation] = useVerifyStaffDocumentMutation();
  const [deleteStaffDocumentMutation] = useDeleteStaffDocumentMutation();

  /**
   * Creates a new staff profile
   * @param input - Staff profile creation input object
   * @returns Created staff profile
   * @throws Error if creation fails
   */
  const handleCreateStaffProfile = useCallback(
    async (input: {
      serviceCategories: ServiceCategory[];
      availability: {
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
      }[];
      documents: {
        type: StaffDocumentType;
        url: string;
      }[];
    }) => {
      try {
        const { data, errors } = await createStaffProfileMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createStaffProfile;
      } catch (error) {
        console.error("Staff profile creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createStaffProfileMutation]
  );

  /**
   * Updates an existing staff profile
   * @param id - Staff profile ID
   * @param input - Staff profile update input object
   * @returns Updated staff profile
   * @throws Error if update fails
   */
  const handleUpdateStaffProfile = useCallback(
    async (
      id: string,
      input: {
        serviceCategories?: ServiceCategory[];
        availability?: {
          dayOfWeek: number;
          startTime: string;
          endTime: string;
          isAvailable: boolean;
        }[];
        status?: StaffStatus;
      }
    ) => {
      try {
        const { data, errors } = await updateStaffProfileMutation({
          variables: { id, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateStaffProfile;
      } catch (error) {
        console.error("Staff profile update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateStaffProfileMutation]
  );

  /**
   * Updates staff status
   * @param id - Staff profile ID
   * @param status - New status
   * @returns Updated staff profile
   * @throws Error if update fails
   */
  const handleUpdateStaffStatus = useCallback(
    async (id: string, status: StaffStatus) => {
      try {
        const { data, errors } = await updateStaffStatusMutation({
          variables: { id, status },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateStaffStatus;
      } catch (error) {
        console.error("Staff status update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateStaffStatusMutation]
  );

  /**
   * Updates staff availability
   * @param id - Staff profile ID
   * @param availability - New availability schedule
   * @returns Updated staff profile
   * @throws Error if update fails
   */
  const handleUpdateStaffAvailability = useCallback(
    async (
      id: string,
      availability: {
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
      }[]
    ) => {
      try {
        const { data, errors } = await updateStaffAvailabilityMutation({
          variables: { id, availability },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateStaffAvailability;
      } catch (error) {
        console.error("Staff availability update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateStaffAvailabilityMutation]
  );

  /**
   * Uploads a staff document
   * @param id - Staff profile ID
   * @param input - Document upload input
   * @returns Created document
   * @throws Error if upload fails
   */
  const handleUploadStaffDocument = useCallback(
    async (id: string, input: { type: StaffDocumentType; url: string }) => {
      try {
        const { data, errors } = await uploadStaffDocumentMutation({
          variables: { id, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.uploadStaffDocument;
      } catch (error) {
        console.error("Staff document upload error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [uploadStaffDocumentMutation]
  );

  /**
   * Verifies a staff document
   * @param id - Staff profile ID
   * @param documentId - Document ID
   * @returns Verified document
   * @throws Error if verification fails
   */
  const handleVerifyStaffDocument = useCallback(
    async (id: string, documentId: string) => {
      try {
        const { data, errors } = await verifyStaffDocumentMutation({
          variables: { id, documentId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.verifyStaffDocument;
      } catch (error) {
        console.error("Staff document verification error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [verifyStaffDocumentMutation]
  );

  /**
   * Deletes a staff document
   * @param id - Staff profile ID
   * @param documentId - Document ID
   * @returns Boolean indicating success
   * @throws Error if deletion fails
   */
  const handleDeleteStaffDocument = useCallback(
    async (id: string, documentId: string) => {
      try {
        const { data, errors } = await deleteStaffDocumentMutation({
          variables: { id, documentId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.deleteStaffDocument;
      } catch (error) {
        console.error("Staff document deletion error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [deleteStaffDocumentMutation]
  );

  /**
   * Fetches a single staff profile by ID
   * @param id - Staff profile ID
   * @returns Staff profile data
   * @throws Error if fetch fails
   */
  const handleGetStaffProfile = useCallback(async (id: string) => {
    try {
      const { data, errors } = await useGetStaffProfileByIdQuery({
        variables: { id },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.staffProfile;
    } catch (error) {
      console.error("Staff profile fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  /**
   * Fetches staff profiles with optional status filter
   * @param status - Optional staff status filter
   * @returns Array of staff profiles
   * @throws Error if fetch fails
   */
  const handleGetStaffProfiles = useCallback(async (status?: StaffStatus) => {
    try {
      const { data, errors } = await useGetStaffProfilesQuery({
        variables: { status },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.staffProfiles;
    } catch (error) {
      console.error("Staff profiles fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  /**
   * Fetches available staff for a service category and date
   * @param serviceCategory - Service category
   * @param date - Date to check availability
   * @returns Array of available staff profiles
   * @throws Error if fetch fails
   */
  const handleGetAvailableStaff = useCallback(
    async (serviceCategory: ServiceCategory, date: Date) => {
      try {
        const { data, errors } = await useGetAvailableStaffQuery({
          variables: { serviceCategory, date },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.availableStaff;
      } catch (error) {
        console.error("Available staff fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    []
  );

  /**
   * Fetches staff performance rating
   * @param id - Staff profile ID
   * @returns Staff performance rating
   * @throws Error if fetch fails
   */
  const handleGetStaffPerformance = useCallback(async (id: string) => {
    try {
      const { data, errors } = await useGetStaffPerformanceQuery({
        variables: { id },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.staffPerformance;
    } catch (error) {
      console.error("Staff performance fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  return {
    handleCreateStaffProfile,
    handleUpdateStaffProfile,
    handleUpdateStaffStatus,
    handleUpdateStaffAvailability,
    handleUploadStaffDocument,
    handleVerifyStaffDocument,
    handleDeleteStaffDocument,
    handleGetStaffProfile,
    handleGetStaffProfiles,
    handleGetAvailableStaff,
    handleGetStaffPerformance,
  };
};
