import {
  CreateSubscriptionMutationOptions,
  CreateSubscriptionMutationVariables,
  UpdateSubscriptionMutationOptions,
  UpdateSubscriptionMutationVariables,
  CancelSubscriptionMutationOptions,
  CancelSubscriptionMutationVariables,
  ReactivateSubscriptionMutationOptions,
  ReactivateSubscriptionMutationVariables,
  UpdateSubscriptionStatusMutationOptions,
  UpdateSubscriptionStatusMutationVariables,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useReactivateSubscriptionMutation,
  useUpdateSubscriptionStatusMutation,
} from "@/graphql/api";

export const useCreateSubscriptionHook = (
  args: CreateSubscriptionMutationVariables,
  options?: CreateSubscriptionMutationOptions
) => {
  const [createSubscription, { data, loading, error }] =
    useCreateSubscriptionMutation({
      variables: args,
      ...options,
    });
  return { createSubscription, data, loading, error };
};

export const useUpdateSubscriptionHook = (
  args: UpdateSubscriptionMutationVariables,
  options?: UpdateSubscriptionMutationOptions
) => {
  const [updateSubscription, { data, loading, error }] =
    useUpdateSubscriptionMutation({
      variables: args,
      ...options,
    });
  return { updateSubscription, data, loading, error };
};

export const useCancelSubscriptionHook = (
  args: CancelSubscriptionMutationVariables,
  options?: CancelSubscriptionMutationOptions
) => {
  const [cancelSubscription, { data, loading, error }] =
    useCancelSubscriptionMutation({
      variables: args,
      ...options,
    });
  return { cancelSubscription, data, loading, error };
};

export const useReactivateSubscriptionHook = (
  args: ReactivateSubscriptionMutationVariables,
  options?: ReactivateSubscriptionMutationOptions
) => {
  const [reactivateSubscription, { data, loading, error }] =
    useReactivateSubscriptionMutation({
      variables: args,
      ...options,
    });
  return { reactivateSubscription, data, loading, error };
};

export const useUpdateSubscriptionStatusHook = (
  args: UpdateSubscriptionStatusMutationVariables,
  options?: UpdateSubscriptionStatusMutationOptions
) => {
  const [updateSubscriptionStatus, { data, loading, error }] =
    useUpdateSubscriptionStatusMutation({
      variables: args,
      ...options,
    });
  return { updateSubscriptionStatus, data, loading, error };
};
