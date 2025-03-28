import {
  CreateServiceMutationOptions,
  CreateServiceMutationVariables,
  UpdateServiceMutationOptions,
  UpdateServiceMutationVariables,
  DeleteServiceMutationOptions,
  DeleteServiceMutationVariables,
  UpdateServiceStatusMutationOptions,
  UpdateServiceStatusMutationVariables,
  UpdateServicePricingMutationOptions,
  UpdateServicePricingMutationVariables,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceStatusMutation,
  useUpdateServicePricingMutation,
} from "@/graphql/api";

export const useCreateServiceHook = (
  args: CreateServiceMutationVariables,
  options?: CreateServiceMutationOptions
) => {
  const [createService, { data, loading, error }] = useCreateServiceMutation({
    variables: args,
    ...options,
  });
  return { createService, data, loading, error };
};

export const useUpdateServiceHook = (
  args: UpdateServiceMutationVariables,
  options?: UpdateServiceMutationOptions
) => {
  const [updateService, { data, loading, error }] = useUpdateServiceMutation({
    variables: args,
    ...options,
  });
  return { updateService, data, loading, error };
};

export const useDeleteServiceHook = (
  args: DeleteServiceMutationVariables,
  options?: DeleteServiceMutationOptions
) => {
  const [deleteService, { data, loading, error }] = useDeleteServiceMutation({
    variables: args,
    ...options,
  });
  return { deleteService, data, loading, error };
};

export const useUpdateServiceStatusHook = (
  args: UpdateServiceStatusMutationVariables,
  options?: UpdateServiceStatusMutationOptions
) => {
  const [updateServiceStatus, { data, loading, error }] =
    useUpdateServiceStatusMutation({
      variables: args,
      ...options,
    });
  return { updateServiceStatus, data, loading, error };
};

export const useUpdateServicePricingHook = (
  args: UpdateServicePricingMutationVariables,
  options?: UpdateServicePricingMutationOptions
) => {
  const [updateServicePricing, { data, loading, error }] =
    useUpdateServicePricingMutation({
      variables: args,
      ...options,
    });
  return { updateServicePricing, data, loading, error };
};
