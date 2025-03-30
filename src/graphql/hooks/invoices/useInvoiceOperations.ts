/**
 * Custom hook for handling all invoice-related operations.
 * Provides functions for managing invoices including generation,
 * status updates, and retrieval.
 *
 * @returns Object containing all invoice operation handlers
 */
import { useCallback } from "react";
import {
  useGenerateInvoiceMutation,
  useMarkInvoiceAsPaidMutation,
  useCancelInvoiceMutation,
  useGetInvoiceByIdQuery,
  useGetCustomerInvoicesQuery,
} from "@/graphql/api";
import { InvoiceStatus } from "@/graphql/api";

export const useInvoiceOperations = () => {
  const [generateInvoiceMutation] = useGenerateInvoiceMutation();
  const [markInvoiceAsPaidMutation] = useMarkInvoiceAsPaidMutation();
  const [cancelInvoiceMutation] = useCancelInvoiceMutation();

  /**
   * Generates a new invoice for a payment
   * @param paymentId - ID of the payment to generate invoice for
   * @returns Generated invoice
   * @throws Error if generation fails
   */
  const handleGenerateInvoice = useCallback(
    async (paymentId: string) => {
      try {
        const { data, errors } = await generateInvoiceMutation({
          variables: { paymentId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.generateInvoice;
      } catch (error) {
        console.error("Invoice generation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [generateInvoiceMutation]
  );

  /**
   * Marks an invoice as paid
   * @param id - Invoice ID
   * @returns Updated invoice
   * @throws Error if update fails
   */
  const handleMarkInvoiceAsPaid = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await markInvoiceAsPaidMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.markInvoiceAsPaid;
      } catch (error) {
        console.error("Invoice payment status update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [markInvoiceAsPaidMutation]
  );

  /**
   * Cancels an invoice
   * @param id - Invoice ID
   * @returns Updated invoice
   * @throws Error if cancellation fails
   */
  const handleCancelInvoice = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await cancelInvoiceMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.cancelInvoice;
      } catch (error) {
        console.error("Invoice cancellation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [cancelInvoiceMutation]
  );

  /**
   * Fetches a single invoice by ID
   * @param id - Invoice ID
   * @returns Invoice data
   * @throws Error if fetch fails
   */
  const handleGetInvoice = useCallback(async (id: string) => {
    try {
      const { data, errors } = await useGetInvoiceByIdQuery({
        variables: { id },
      });

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.invoice;
    } catch (error) {
      console.error("Invoice fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  /**
   * Fetches all invoices for the current customer
   * @returns Array of customer invoices
   * @throws Error if fetch fails
   */
  const handleGetCustomerInvoices = useCallback(async () => {
    try {
      const { data, errors } = await useGetCustomerInvoicesQuery();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.customerInvoices;
    } catch (error) {
      console.error("Customer invoices fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, []);

  return {
    handleGenerateInvoice,
    handleMarkInvoiceAsPaid,
    handleCancelInvoice,
    handleGetInvoice,
    handleGetCustomerInvoices,
  };
};
