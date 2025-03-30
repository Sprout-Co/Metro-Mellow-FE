/**
 * Custom hook for handling all payment-related operations.
 * Provides functions for managing payments, refunds, and payment methods.
 *
 * @returns Object containing all payment operation handlers
 */
import { useCallback } from "react";
import {
  useCreatePaymentMutation,
  useRefundPaymentMutation,
  useAddPaymentMethodMutation,
  useRemovePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
  useGetPaymentByIdQuery,
  useGetPaymentsQuery,
  useGetPaymentMethodsQuery,
} from "@/graphql/api";
import { PaymentStatus, PaymentMethodType } from "@/graphql/api";

export const usePaymentOperations = () => {
  const [createPaymentMutation] = useCreatePaymentMutation();
  const [refundPaymentMutation] = useRefundPaymentMutation();
  const [addPaymentMethodMutation] = useAddPaymentMethodMutation();
  const [removePaymentMethodMutation] = useRemovePaymentMethodMutation();
  const [setDefaultPaymentMethodMutation] =
    useSetDefaultPaymentMethodMutation();

  /**
   * Creates a new payment
   * @param input - Payment creation input object
   * @returns Created payment
   * @throws Error if creation fails
   */
  const handleCreatePayment = useCallback(
    async (input: {
      amount: number;
      currency: string;
      paymentMethodId: string;
      bookingId: string;
      description?: string;
    }) => {
      try {
        const { data, errors } = await createPaymentMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createPayment;
      } catch (error) {
        console.error("Payment creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createPaymentMutation]
  );

  /**
   * Process payment (handled internally by the backend)
   * This is a placeholder as this functionality would be triggered during payment creation
   *
   * @param bookingId - Booking ID associated with the payment
   * @returns Boolean indicating success
   */
  const handleProcessPayment = useCallback(
    async (bookingId: string) => {
      try {
        // Create payment also processes it
        const { data } = await createPaymentMutation({
          variables: {
            input: {
              bookingId,
              amount: 0, // Would need to be calculated based on booking
              currency: "USD",
              paymentMethodId: "", // Would need to be obtained from user context
            },
          },
        });

        return Boolean(data?.createPayment);
      } catch (error) {
        console.error("Payment processing error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createPaymentMutation]
  );

  /**
   * Refunds a payment
   * @param paymentId - Payment ID to refund
   * @param amount - Amount to refund (required)
   * @param reason - Reason for the refund (required)
   * @returns Refunded payment
   * @throws Error if refund fails
   */
  const handleRefundPayment = useCallback(
    async (paymentId: string, amount: number, reason: string) => {
      try {
        const { data, errors } = await refundPaymentMutation({
          variables: {
            input: {
              paymentId,
              amount,
              reason,
            },
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.refundPayment;
      } catch (error) {
        console.error("Payment refund error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [refundPaymentMutation]
  );

  /**
   * Updates payment status (handled by backend actions)
   * This is a placeholder as status updates happen via other operations
   *
   * @param paymentId - Payment ID
   * @param status - New status
   * @returns Boolean indicating whether action was taken
   */
  const handleUpdatePaymentStatus = useCallback(
    async (paymentId: string, status: PaymentStatus) => {
      try {
        // Status updates are typically handled by refund or process operations
        if (status === "REFUNDED") {
          // Would need to fetch payment amount first
          const { data } = await refundPaymentMutation({
            variables: {
              input: {
                paymentId,
                amount: 0, // Would need actual amount
                reason: "Customer requested refund",
              },
            },
          });
          return Boolean(data?.refundPayment);
        }

        // For other statuses, we'd need custom backend endpoints
        console.warn("Payment status updates are handled by other operations");
        return false;
      } catch (error) {
        console.error("Payment status update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [refundPaymentMutation]
  );

  /**
   * Adds a new payment method
   * @param input - Payment method input with token from payment processor
   * @returns Added payment method
   * @throws Error if addition fails
   */
  const handleAddPaymentMethod = useCallback(
    async (input: {
      type: PaymentMethodType;
      token: string; // Stripe/payment processor token
      isDefault?: boolean;
    }) => {
      try {
        const { data, errors } = await addPaymentMethodMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.addPaymentMethod;
      } catch (error) {
        console.error("Payment method addition error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [addPaymentMethodMutation]
  );

  /**
   * Removes a payment method
   * @param id - Payment method ID
   * @returns Boolean indicating success
   * @throws Error if removal fails
   */
  const handleRemovePaymentMethod = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await removePaymentMethodMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.removePaymentMethod;
      } catch (error) {
        console.error("Payment method removal error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [removePaymentMethodMutation]
  );

  /**
   * Sets the default payment method
   * @param id - Payment method ID
   * @returns Updated payment method
   * @throws Error if update fails
   */
  const handleSetDefaultPaymentMethod = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await setDefaultPaymentMethodMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.setDefaultPaymentMethod;
      } catch (error) {
        console.error("Default payment method update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [setDefaultPaymentMethodMutation]
  );

  /**
   * Fetches a single payment by ID
   * @param id - Payment ID
   * @returns Payment data
   * @throws Error if fetch fails
   */
  const handleGetPayment = useCallback(async (id: string) => {
    try {
      const { data, errors } = await useGetPaymentByIdQuery({
        variables: { id },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.payment;
    } catch (error) {
      console.error("Payment fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  /**
   * Fetches payments with optional status filter
   * @param status - Optional payment status filter
   * @returns Array of payments
   * @throws Error if fetch fails
   */
  const handleGetPayments = useCallback(async (status?: PaymentStatus) => {
    try {
      const { data, errors } = await useGetPaymentsQuery({
        variables: { status },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.payments;
    } catch (error) {
      console.error("Payments fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  /**
   * Fetches user's payment methods
   * @returns Array of payment methods
   * @throws Error if fetch fails
   */
  const handleGetPaymentMethods = useCallback(async () => {
    try {
      const { data, errors } = await useGetPaymentMethodsQuery();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.paymentMethods;
    } catch (error) {
      console.error("Payment methods fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  /**
   * Fetches user's payment history
   *
   * Note: This uses the general payments query as payment history
   * is not a separate endpoint in the API
   *
   * @returns Array of payment history entries
   * @throws Error if fetch fails
   */
  const handleGetPaymentHistory = useCallback(async () => {
    try {
      // Using the payments query
      const { data, errors } = await useGetPaymentsQuery();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.payments;
    } catch (error) {
      console.error("Payment history fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  return {
    handleCreatePayment,
    handleProcessPayment,
    handleRefundPayment,
    handleUpdatePaymentStatus,
    handleAddPaymentMethod,
    handleRemovePaymentMethod,
    handleSetDefaultPaymentMethod,
    handleGetPayment,
    handleGetPayments,
    handleGetPaymentMethods,
    handleGetPaymentHistory,
  };
};
