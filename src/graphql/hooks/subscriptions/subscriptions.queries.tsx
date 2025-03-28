import { QueryHookOptions } from "@apollo/client";
import {
  GetSubscriptionQuery,
  GetSubscriptionQueryVariables,
  GetSubscriptionsQuery,
  GetSubscriptionsQueryVariables,
  GetCustomerSubscriptionsQuery,
  GetCustomerSubscriptionsQueryVariables,
  useGetSubscriptionQuery,
  useGetSubscriptionLazyQuery,
  useGetSubscriptionsQuery,
  useGetSubscriptionsLazyQuery,
  useGetCustomerSubscriptionsQuery,
  useGetCustomerSubscriptionsLazyQuery,
} from "@/graphql/api";

type GetSubscriptionOptions = Omit<
  QueryHookOptions<GetSubscriptionQuery, GetSubscriptionQueryVariables>,
  "variables"
> & {
  variables: GetSubscriptionQueryVariables;
};

export const useGetSubscriptionHook = (options: GetSubscriptionOptions) => {
  const { data, loading, error } = useGetSubscriptionQuery(options);
  return { data, loading, error };
};

export const useLazyGetSubscriptionHook = (options: GetSubscriptionOptions) => {
  const [getSubscription, { loading, data, error }] =
    useGetSubscriptionLazyQuery(options);

  return {
    getSubscription: () => {
      getSubscription();
    },
    data,
    loading,
    error,
  };
};

export const useGetSubscriptionsHook = (
  options?: QueryHookOptions<
    GetSubscriptionsQuery,
    GetSubscriptionsQueryVariables
  >
) => {
  const { data, loading, error } = useGetSubscriptionsQuery(options);
  return { data, loading, error };
};

export const useLazyGetSubscriptionsHook = (
  options?: QueryHookOptions<
    GetSubscriptionsQuery,
    GetSubscriptionsQueryVariables
  >
) => {
  const [getSubscriptions, { loading, data, error }] =
    useGetSubscriptionsLazyQuery(options);

  return {
    getSubscriptions: () => {
      getSubscriptions();
    },
    data,
    loading,
    error,
  };
};

export const useGetCustomerSubscriptionsHook = (
  options?: QueryHookOptions<
    GetCustomerSubscriptionsQuery,
    GetCustomerSubscriptionsQueryVariables
  >
) => {
  const { data, loading, error } = useGetCustomerSubscriptionsQuery(options);
  return { data, loading, error };
};

export const useLazyGetCustomerSubscriptionsHook = (
  options?: QueryHookOptions<
    GetCustomerSubscriptionsQuery,
    GetCustomerSubscriptionsQueryVariables
  >
) => {
  const [getCustomerSubscriptions, { loading, data, error }] =
    useGetCustomerSubscriptionsLazyQuery(options);

  return {
    getCustomerSubscriptions: () => {
      getCustomerSubscriptions();
    },
    data,
    loading,
    error,
  };
};
