/**
 * Custom hook for handling all subscription-related operations.
 * Provides functions for managing subscriptions, plans, and billing.
 *
 * @returns Object containing all subscription operation handlers
 */
import { useCallback } from "react";
import {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useReactivateSubscriptionMutation,
  useUpdateSubscriptionStatusMutation,
  useGetSubscriptionByIdQuery,
  useGetSubscriptionsQuery,
  useGetCustomerSubscriptionsQuery,
} from "@/graphql/api";
import {
  SubscriptionStatus,
  SubscriptionPlan,
  SubscriptionFrequency,
} from "@/graphql/api";

export const useSubscriptionOperations = () => {
  const [createSubscriptionMutation] = useCreateSubscriptionMutation();
  const [updateSubscriptionMutation] = useUpdateSubscriptionMutation();
  const [cancelSubscriptionMutation] = useCancelSubscriptionMutation();
  const [reactivateSubscriptionMutation] = useReactivateSubscriptionMutation();
  const [updateSubscriptionStatusMutation] =
    useUpdateSubscriptionStatusMutation();
  const { refetch: getSubscriptionById } = useGetSubscriptionByIdQuery({
    skip: true,
  });
  const { refetch: getSubscriptions } = useGetSubscriptionsQuery({
    skip: true,
  });
  const { refetch: getCustomerSubscriptions } =
    useGetCustomerSubscriptionsQuery({ skip: true });

  /**
   * Creates a new subscription
   * @param input - Subscription creation input object
   * @returns Created subscription
   * @throws Error if creation fails
   */
  const handleCreateSubscription = useCallback(
    async (input: {
      serviceId: string;
      plan: SubscriptionPlan;
      frequency: SubscriptionFrequency;
      startDate: Date;
      autoRenew: boolean;
    }) => {
      try {
        const { data, errors } = await createSubscriptionMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createSubscription;
      } catch (error) {
        console.error("Subscription creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createSubscriptionMutation]
  );

  /**
   * Updates an existing subscription
   * @param id - Subscription ID
   * @param input - Subscription update input object
   * @returns Updated subscription
   * @throws Error if update fails
   */
  const handleUpdateSubscription = useCallback(
    async (
      id: string,
      input: {
        plan?: SubscriptionPlan;
        frequency?: SubscriptionFrequency;
        autoRenew?: boolean;
        endDate?: Date;
      }
    ) => {
      try {
        const { data, errors } = await updateSubscriptionMutation({
          variables: { id, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateSubscription;
      } catch (error) {
        console.error("Subscription update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateSubscriptionMutation]
  );

  /**
   * Cancels a subscription
   * @param id - Subscription ID
   * @returns Cancelled subscription
   * @throws Error if cancellation fails
   */
  const handleCancelSubscription = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await cancelSubscriptionMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.cancelSubscription;
      } catch (error) {
        console.error("Subscription cancellation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [cancelSubscriptionMutation]
  );

  /**
   * Reactivates a cancelled subscription
   * @param id - Subscription ID
   * @returns Reactivated subscription
   * @throws Error if reactivation fails
   */
  const handleReactivateSubscription = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await reactivateSubscriptionMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.reactivateSubscription;
      } catch (error) {
        console.error("Subscription reactivation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [reactivateSubscriptionMutation]
  );

  /**
   * Updates subscription status
   * @param id - Subscription ID
   * @param status - New status
   * @returns Updated subscription
   * @throws Error if update fails
   */
  const handleUpdateSubscriptionStatus = useCallback(
    async (id: string, status: SubscriptionStatus) => {
      try {
        const { data, errors } = await updateSubscriptionStatusMutation({
          variables: { id, status },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateSubscriptionStatus;
      } catch (error) {
        console.error("Subscription status update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateSubscriptionStatusMutation]
  );

  /**
   * Updates subscription plan
   * @param id - Subscription ID
   * @param plan - New plan
   * @returns Updated subscription
   * @throws Error if update fails
   */
  const handleUpdateSubscriptionPlan = useCallback(
    async (id: string, plan: SubscriptionPlan) => {
      try {
        const { data, errors } = await updateSubscriptionMutation({
          variables: {
            id,
            input: { plan },
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateSubscription;
      } catch (error) {
        console.error("Subscription plan update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateSubscriptionMutation]
  );

  /**
   * Fetches a single subscription by ID
   * @param id - Subscription ID
   * @returns Subscription data
   * @throws Error if fetch fails
   */
  const handleGetSubscription = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await getSubscriptionById({ id });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.subscription;
      } catch (error) {
        console.error("Subscription fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getSubscriptionById]
  );

  /**
   * Fetches all subscriptions with optional status filter
   * @param status - Optional subscription status filter
   * @returns Array of subscriptions
   * @throws Error if fetch fails
   */
  const handleGetSubscriptions = useCallback(
    async (status?: SubscriptionStatus) => {
      try {
        const { data, errors } = await getSubscriptions({ status });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.subscriptions;
      } catch (error) {
        console.error("Subscriptions fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getSubscriptions]
  );

  /**
   * Fetches subscriptions for the current customer
   * @returns Array of customer's subscriptions
   * @throws Error if fetch fails
   */
  const handleGetCustomerSubscriptions = useCallback(async () => {
    try {
      const { data, errors } = await getCustomerSubscriptions();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.customerSubscriptions;
    } catch (error) {
      console.error("Customer subscriptions fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getCustomerSubscriptions]);

  return {
    handleCreateSubscription,
    handleUpdateSubscription,
    handleCancelSubscription,
    handleReactivateSubscription,
    handleUpdateSubscriptionStatus,
    handleUpdateSubscriptionPlan,
    handleGetSubscription,
    handleGetSubscriptions,
    handleGetCustomerSubscriptions,
  };
};
