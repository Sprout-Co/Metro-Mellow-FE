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
  useGetSubscriptionByIdQuery,
  useGetSubscriptionsQuery,
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
   * Updates subscription billing information
   * @param paymentMethodId - New payment method ID
   * @param billingAddress - Optional billing address
   * @returns Boolean indicating success
   * @throws Error if update fails
   */
  const handleUpdateBillingInfo = useCallback(
    async (
      paymentMethodId: string,
      billingAddress?: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
      }
    ) => {
      try {
        // There's no direct billing info update in the API,
        // we would need to implement this on the backend first
        console.warn("Billing info updates require backend implementation");
        return false;
      } catch (error) {
        console.error("Billing info update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    []
  );

  /**
   * Fetches a single subscription by ID
   * @param id - Subscription ID
   * @returns Subscription data
   * @throws Error if fetch fails
   */
  const handleGetSubscription = useCallback(async (id: string) => {
    try {
      const { data, errors } = await useGetSubscriptionByIdQuery({
        variables: { id },
      });

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
  }, []);

  /**
   * Fetches available subscription plans
   * @returns Array of subscription plans
   * @throws Error if fetch fails
   */
  const handleGetSubscriptionPlans = useCallback(async () => {
    try {
      // This would need a dedicated backend endpoint
      // For now, returning the enum values
      return Object.values(SubscriptionPlan);
    } catch (error) {
      console.error("Subscription plans fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  /**
   * Fetches subscription history
   * @param status - Optional subscription status filter
   * @returns Array of subscription history entries
   * @throws Error if fetch fails
   */
  const handleGetSubscriptionHistory = useCallback(
    async (status?: SubscriptionStatus) => {
      try {
        const { data, errors } = await useGetSubscriptionsQuery({
          variables: { status },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.subscriptions;
      } catch (error) {
        console.error("Subscription history fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    []
  );

  /**
   * Fetches billing history
   * @returns Array of billing history entries
   * @throws Error if fetch fails
   */
  const handleGetBillingHistory = useCallback(async () => {
    try {
      // Would need to be implemented on the backend
      // For now, just return empty array
      return [];
    } catch (error) {
      console.error("Billing history fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  return {
    handleCreateSubscription,
    handleUpdateSubscription,
    handleCancelSubscription,
    handleReactivateSubscription,
    handleUpdateSubscriptionPlan,
    handleUpdateBillingInfo,
    handleGetSubscription,
    handleGetSubscriptionPlans,
    handleGetSubscriptionHistory,
    handleGetBillingHistory,
  };
};
