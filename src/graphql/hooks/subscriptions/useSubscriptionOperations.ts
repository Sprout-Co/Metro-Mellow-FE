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
  usePauseSubscriptionMutation,
  useResumeSubscriptionMutation,
  useUpdateSubscriptionStatusMutation,
  useAddServiceToSubscriptionMutation,
  useRemoveServiceFromSubscriptionMutation,
  useUpdateSubscriptionServiceMutation,
  useGetSubscriptionByIdQuery,
  useGetSubscriptionsQuery,
  useGetCustomerSubscriptionsQuery,
  CreateSubscriptionInput,
  UpdateSubscriptionInput,
  UpdateSubscriptionServiceInput,
  SubscriptionServiceInput,
  useReactivateSubscriptionMutation,
  useRenewSubscriptionMutation,
  CreateSubscriptionResponse,
} from "@/graphql/api";
import { SubscriptionStatus, BillingCycle } from "@/graphql/api";
import {
  normalizeSubscription,
  normalizeSubscriptions,
} from "@/utils/dateNormalization";

export const useSubscriptionOperations = () => {
  const [createSubscriptionMutation] = useCreateSubscriptionMutation();
  const [updateSubscriptionMutation] = useUpdateSubscriptionMutation();
  const [cancelSubscriptionMutation] = useCancelSubscriptionMutation();
  const [pauseSubscriptionMutation] = usePauseSubscriptionMutation();
  const [resumeSubscriptionMutation] = useResumeSubscriptionMutation();
  const [updateSubscriptionStatusMutation] =
    useUpdateSubscriptionStatusMutation();
  const [addServiceToSubscriptionMutation] =
    useAddServiceToSubscriptionMutation();
  const [removeServiceFromSubscriptionMutation] =
    useRemoveServiceFromSubscriptionMutation();
  const [updateSubscriptionServiceMutation] =
    useUpdateSubscriptionServiceMutation();
  const [reactivateSubscriptionMutation] = useReactivateSubscriptionMutation();
  const [renewSubscriptionMutation] = useRenewSubscriptionMutation();

  const { refetch: getSubscriptionById } = useGetSubscriptionByIdQuery({
    skip: true,
  });
  const { refetch: getSubscriptions } = useGetSubscriptionsQuery({
    skip: true,
  });
  const { refetch: getCustomerSubscriptions } =
    useGetCustomerSubscriptionsQuery({
      skip: true,
    });

  /**
   * Creates a new subscription
   * @param input - Subscription creation input object
   * @returns Created subscription response with payment information
   * @throws Error if creation fails
   */
  const handleCreateSubscription = useCallback(
    async (
      input: CreateSubscriptionInput
    ): Promise<CreateSubscriptionResponse | undefined> => {
      try {
        const { data, errors } = await createSubscriptionMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        if (!data?.createSubscription) {
          throw new Error("No data returned from subscription creation");
        }

        return data.createSubscription as CreateSubscriptionResponse;
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
    async (id: string, input: UpdateSubscriptionInput) => {
      try {
        const { data, errors } = await updateSubscriptionMutation({
          variables: { id, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // updateSubscription returns boolean, not a subscription object
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
   * Pauses a subscription
   * @param id - Subscription ID
   * @returns Paused subscription
   * @throws Error if pause fails
   */
  const handlePauseSubscription = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await pauseSubscriptionMutation({
          variables: { pauseSubscriptionId: id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // pauseSubscription returns boolean, not a subscription object
        return data?.pauseSubscription;
      } catch (error) {
        console.error("Subscription pause error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [pauseSubscriptionMutation]
  );

  /**
   * Resumes a paused subscription
   * @param id - Subscription ID
   * @returns Resumed subscription
   * @throws Error if resume fails
   */
  const handleResumeSubscription = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await resumeSubscriptionMutation({
          variables: { resumeSubscriptionId: id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // resumeSubscription returns boolean, not a subscription object
        return data?.resumeSubscription;
      } catch (error) {
        console.error("Subscription resume error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [resumeSubscriptionMutation]
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
          variables: {
            reactivateSubscriptionId: id,
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // reactivateSubscription returns boolean, not a subscription object
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
   * Renews a subscription
   * @param id - Subscription ID
   * @returns Renewed subscription response with payment information
   * @throws Error if renewal fails
   */
  const handleRenewSubscription = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await renewSubscriptionMutation({
          variables: { renewSubscriptionId: id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        if (!data?.renewSubscription) {
          throw new Error("No data returned from subscription renewal");
        }

        return data.renewSubscription;
      } catch (error) {
        console.error("Subscription renewal error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [renewSubscriptionMutation]
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
          variables: { updateSubscriptionStatusId: id, status },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // updateSubscriptionStatus returns boolean, not a subscription object
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
   * Adds a service to a subscription
   * @param subscriptionId - Subscription ID
   * @param service - Service input object
   * @returns Updated subscription
   * @throws Error if addition fails
   */
  const handleAddServiceToSubscription = useCallback(
    async (subscriptionId: string, service: SubscriptionServiceInput) => {
      try {
        const { data, errors } = await addServiceToSubscriptionMutation({
          variables: { subscriptionId, service },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // addServiceToSubscription returns boolean, not a subscription object
        return data?.addServiceToSubscription;
      } catch (error) {
        console.error("Add service to subscription error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [addServiceToSubscriptionMutation]
  );

  /**
   * Removes a service from a subscription
   * @param subscriptionId - Subscription ID
   * @param subscriptionServiceId - Subscription service ID
   * @returns Updated subscription
   * @throws Error if removal fails
   */
  const handleRemoveServiceFromSubscription = useCallback(
    async (subscriptionId: string, subscriptionServiceId: string) => {
      try {
        const { data, errors } = await removeServiceFromSubscriptionMutation({
          variables: { subscriptionId, subscriptionServiceId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // removeServiceFromSubscription returns boolean, not a subscription object
        return data?.removeServiceFromSubscription;
      } catch (error) {
        console.error("Remove service from subscription error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [removeServiceFromSubscriptionMutation]
  );

  /**
   * Updates a subscription service
   * @param subscriptionId - Subscription ID
   * @param subscriptionServiceId - Subscription service ID
   * @param input - Update input object
   * @returns Updated subscription service
   * @throws Error if update fails
   */
  const handleUpdateSubscriptionService = useCallback(
    async (
      subscriptionId: string,
      subscriptionServiceId: string,
      input: UpdateSubscriptionServiceInput
    ) => {
      try {
        const { data, errors } = await updateSubscriptionServiceMutation({
          variables: { subscriptionId, subscriptionServiceId, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateSubscriptionService;
      } catch (error) {
        console.error("Update subscription service error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateSubscriptionServiceMutation]
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

        // Normalize dates for the returned subscription
        return data?.subscription
          ? normalizeSubscription(data.subscription as any)
          : undefined;
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

        // Normalize dates to prevent timezone issues
        return data?.subscriptions
          ? normalizeSubscriptions(data.subscriptions as any)
          : undefined;
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

      // Normalize dates to prevent timezone issues
      return data?.customerSubscriptions
        ? normalizeSubscriptions(data.customerSubscriptions as any)
        : undefined;
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
    handlePauseSubscription,
    handleResumeSubscription,
    handleReactivateSubscription,
    handleRenewSubscription,
    handleUpdateSubscriptionStatus,
    handleAddServiceToSubscription,
    handleRemoveServiceFromSubscription,
    handleUpdateSubscriptionService,
    handleGetSubscription,
    handleGetSubscriptions,
    handleGetCustomerSubscriptions,
  };
};
