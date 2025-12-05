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
  useGetCustomerPaymentsQuery,
} from "@/graphql/api";
import { PaymentStatus, PaymentMethodType } from "@/graphql/api";

export const usePaymentOperations = () => {
  const [createPaymentMutation] = useCreatePaymentMutation();
  const [refundPaymentMutation] = useRefundPaymentMutation();
  const [addPaymentMethodMutation] = useAddPaymentMethodMutation();
  const [removePaymentMethodMutation] = useRemovePaymentMethodMutation();
  const [setDefaultPaymentMethodMutation] =
    useSetDefaultPaymentMethodMutation();
  const { data: paymentMethodsData, refetch: refetchPaymentMethods } =
    useGetPaymentMethodsQuery();

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
   * Refunds a payment
   * @param input - Refund input object
   * @returns Updated payment
   * @throws Error if refund fails
   */
  const handleRefundPayment = useCallback(
    async (input: { paymentId: string; amount: number; reason: string }) => {
      try {
        const { data, errors } = await refundPaymentMutation({
          variables: { input },
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
   * Adds a new payment method
   * @param input - Payment method input object
   * @returns Created payment method
   * @throws Error if creation fails
   */
  const handleAddPaymentMethod = useCallback(
    async (input: {
      type: PaymentMethodType;
      token: string;
      isDefault?: boolean;
    }) => {
      try {
        const { data, errors } = await addPaymentMethodMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Refetch payment methods after adding a new one
        await refetchPaymentMethods();

        return data?.addPaymentMethod;
      } catch (error) {
        console.error("Payment method creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [addPaymentMethodMutation, refetchPaymentMethods]
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

        // Refetch payment methods after removing one
        await refetchPaymentMethods();

        return data?.removePaymentMethod;
      } catch (error) {
        console.error("Payment method removal error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [removePaymentMethodMutation, refetchPaymentMethods]
  );

  /**
   * Sets a payment method as default
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

        // Refetch payment methods after setting default
        await refetchPaymentMethods();

        return data?.setDefaultPaymentMethod;
      } catch (error) {
        console.error("Default payment method update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [setDefaultPaymentMethodMutation, refetchPaymentMethods]
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
   * Fetches all payment methods for the current user
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
   * Fetches all payments for the current customer
   * @returns Array of customer payments
   * @throws Error if fetch fails
   */
  const handleGetCustomerPayments = useCallback(async () => {
    try {
      const { data, errors } = await useGetCustomerPaymentsQuery();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.customerPayments;
    } catch (error) {
      console.error("Customer payments fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  return {
    paymentMethods: paymentMethodsData?.paymentMethods || [],
    handleCreatePayment,
    handleRefundPayment,
    handleAddPaymentMethod,
    handleRemovePaymentMethod,
    handleSetDefaultPaymentMethod,
    handleGetPayment,
    handleGetPayments,
    handleGetPaymentMethods,
    handleGetCustomerPayments,
  };
};
