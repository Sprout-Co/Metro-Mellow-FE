import { QueryHookOptions } from "@apollo/client";
import {
  GetSubscriptionQuery,
  GetSubscriptionQueryVariables,
  GetSubscriptionsQuery,
  GetSubscriptionsQueryVariables,
  GetCustomerSubscriptionsQuery,
  GetCustomerSubscriptionsQueryVariables,
  useGetSubscriptionQuery,
  useGetSubscriptionsQuery,
  useGetCustomerSubscriptionsQuery,
} from "@/graphql/api";

export const useGetSubscriptionHook = (
  options?: QueryHookOptions<
    GetSubscriptionQuery,
    GetSubscriptionQueryVariables
  >
) => {
  const { data, loading, error } = useGetSubscriptionQuery(options);
  return { data, loading, error };
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

export const useGetCustomerSubscriptionsHook = (
  options?: QueryHookOptions<
    GetCustomerSubscriptionsQuery,
    GetCustomerSubscriptionsQueryVariables
  >
) => {
  const { data, loading, error } = useGetCustomerSubscriptionsQuery(options);
  return { data, loading, error };
};
