import { MutationHookOptions } from "@apollo/client";
import {
  CreateStaffProfileMutation,
  CreateStaffProfileMutationVariables,
  UpdateStaffProfileMutation,
  UpdateStaffProfileMutationVariables,
  UpdateStaffStatusMutation,
  UpdateStaffStatusMutationVariables,
  UpdateStaffAvailabilityMutation,
  UpdateStaffAvailabilityMutationVariables,
  UploadStaffDocumentMutation,
  UploadStaffDocumentMutationVariables,
  VerifyStaffDocumentMutation,
  VerifyStaffDocumentMutationVariables,
  DeleteStaffDocumentMutation,
  DeleteStaffDocumentMutationVariables,
  useCreateStaffProfileMutation,
  useUpdateStaffProfileMutation,
  useUpdateStaffStatusMutation,
  useUpdateStaffAvailabilityMutation,
  useUploadStaffDocumentMutation,
  useVerifyStaffDocumentMutation,
  useDeleteStaffDocumentMutation,
} from "@/graphql/api";

type CreateStaffProfileOptions = Omit<
  MutationHookOptions<
    CreateStaffProfileMutation,
    CreateStaffProfileMutationVariables
  >,
  "variables"
> & {
  variables: CreateStaffProfileMutationVariables;
};

type UpdateStaffProfileOptions = Omit<
  MutationHookOptions<
    UpdateStaffProfileMutation,
    UpdateStaffProfileMutationVariables
  >,
  "variables"
> & {
  variables: UpdateStaffProfileMutationVariables;
};

type UpdateStaffStatusOptions = Omit<
  MutationHookOptions<
    UpdateStaffStatusMutation,
    UpdateStaffStatusMutationVariables
  >,
  "variables"
> & {
  variables: UpdateStaffStatusMutationVariables;
};

type UpdateStaffAvailabilityOptions = Omit<
  MutationHookOptions<
    UpdateStaffAvailabilityMutation,
    UpdateStaffAvailabilityMutationVariables
  >,
  "variables"
> & {
  variables: UpdateStaffAvailabilityMutationVariables;
};

type UploadStaffDocumentOptions = Omit<
  MutationHookOptions<
    UploadStaffDocumentMutation,
    UploadStaffDocumentMutationVariables
  >,
  "variables"
> & {
  variables: UploadStaffDocumentMutationVariables;
};

type VerifyStaffDocumentOptions = Omit<
  MutationHookOptions<
    VerifyStaffDocumentMutation,
    VerifyStaffDocumentMutationVariables
  >,
  "variables"
> & {
  variables: VerifyStaffDocumentMutationVariables;
};

type DeleteStaffDocumentOptions = Omit<
  MutationHookOptions<
    DeleteStaffDocumentMutation,
    DeleteStaffDocumentMutationVariables
  >,
  "variables"
> & {
  variables: DeleteStaffDocumentMutationVariables;
};

export const useCreateStaffProfileHook = (
  options: CreateStaffProfileOptions
) => {
  const [createStaffProfile, { loading, data, error }] =
    useCreateStaffProfileMutation(options);

  return {
    createStaffProfile: () => {
      createStaffProfile();
    },
    data,
    loading,
    error,
  };
};

export const useUpdateStaffProfileHook = (
  options: UpdateStaffProfileOptions
) => {
  const [updateStaffProfile, { loading, data, error }] =
    useUpdateStaffProfileMutation(options);

  return {
    updateStaffProfile: () => {
      updateStaffProfile();
    },
    data,
    loading,
    error,
  };
};

export const useUpdateStaffStatusHook = (options: UpdateStaffStatusOptions) => {
  const [updateStaffStatus, { loading, data, error }] =
    useUpdateStaffStatusMutation(options);

  return {
    updateStaffStatus: () => {
      updateStaffStatus();
    },
    data,
    loading,
    error,
  };
};

export const useUpdateStaffAvailabilityHook = (
  options: UpdateStaffAvailabilityOptions
) => {
  const [updateStaffAvailability, { loading, data, error }] =
    useUpdateStaffAvailabilityMutation(options);

  return {
    updateStaffAvailability: () => {
      updateStaffAvailability();
    },
    data,
    loading,
    error,
  };
};

export const useUploadStaffDocumentHook = (
  options: UploadStaffDocumentOptions
) => {
  const [uploadStaffDocument, { loading, data, error }] =
    useUploadStaffDocumentMutation(options);

  return {
    uploadStaffDocument: () => {
      uploadStaffDocument();
    },
    data,
    loading,
    error,
  };
};

export const useVerifyStaffDocumentHook = (
  options: VerifyStaffDocumentOptions
) => {
  const [verifyStaffDocument, { loading, data, error }] =
    useVerifyStaffDocumentMutation(options);

  return {
    verifyStaffDocument: () => {
      verifyStaffDocument();
    },
    data,
    loading,
    error,
  };
};

export const useDeleteStaffDocumentHook = (
  options: DeleteStaffDocumentOptions
) => {
  const [deleteStaffDocument, { loading, data, error }] =
    useDeleteStaffDocumentMutation(options);

  return {
    deleteStaffDocument: () => {
      deleteStaffDocument();
    },
    data,
    loading,
    error,
  };
};
