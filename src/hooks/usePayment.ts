import { useState, useCallback } from "react";
import axios from "axios";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { REST_API_BASE_URL } from "@/constants/config";

interface BackendResponseData {
  authorizationUrl: string;
  accessCode: string; // CRITICAL: Ensure your backend sends this
  reference: string;
}

interface UsePaymentReturn {
  initializePayment: (
    bookingId: string,
    amountInNaira: number,
    email: string
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  paymentSuccess: boolean;
  paymentReference: string | null;
}

export const usePayment = (): UsePaymentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const { handleCancelBooking } = useBookingOperations();

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  // Utility function to verify payment on backend with polling
  const verifyPaymentWithPolling = async (
    reference: string
  ): Promise<{ success: boolean; status?: string; error?: string }> => {
    // Polling configuration (same as verification page)
    const maxAttempts = 30; // Maximum number of polling attempts
    const pollInterval = 2000; // Poll every 2 seconds
    const maxPollingTime = 60000; // Maximum polling time: 60 seconds

    let attempts = 0;
    const startTime = Date.now();

    const pollPayment = async (): Promise<{
      success: boolean;
      status?: string;
      error?: string;
    }> => {
      try {
        attempts++;

        // Check if we've exceeded maximum polling time
        if (Date.now() - startTime > maxPollingTime) {
          return { success: false, error: "Payment verification timeout" };
        }

        // Verify payment with your backend
        const verifyResponse = await axios.get(
          `${REST_API_BASE_URL}/api/paystack/verify-payment/${reference}`
        );

        const paymentStatus = verifyResponse.data.data.status;

        switch (paymentStatus) {
          case "PAID":
            return { success: true, status: paymentStatus };
          case "FAILED":
          case "CANCELLED":
            return { success: false, status: paymentStatus };
          case "PENDING":
          case "PROCESSING":
            // Payment is still processing, continue polling
            if (attempts < maxAttempts) {
              await new Promise((resolve) => setTimeout(resolve, pollInterval));
              return pollPayment();
            } else {
              return {
                success: false,
                error: "Payment is taking longer than expected",
              };
            }
          default:
            // Unknown status, continue polling for a few more attempts
            if (attempts < maxAttempts) {
              await new Promise((resolve) => setTimeout(resolve, pollInterval));
              return pollPayment();
            } else {
              return {
                success: false,
                error: "Payment verification failed with unknown status",
              };
            }
        }
      } catch (error) {
        console.error("Payment verification error:", error);

        // If it's a network error and we haven't exceeded max attempts, retry
        if (
          attempts < maxAttempts &&
          (error as any)?.code === "NETWORK_ERROR"
        ) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval));
          return pollPayment();
        } else {
          return {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred during payment verification",
          };
        }
      }
    };

    return pollPayment();
  };

  const initializePayment = useCallback(
    async (bookingId: string, amountInNaira: number, email: string) => {
      setLoading(true);
      setError(null);

      // CRITICAL: Convert Naira to Kobo
      const amountInKobo = Math.round(amountInNaira);
      console.log(amountInKobo, "amountInKobo");
      console.log(amountInNaira, "amountInNaira");

      try {
        // 1. Call Backend to Initialize Transaction
        const clientSessionId = crypto.randomUUID();

        const response = await axios.post(
          `${REST_API_BASE_URL}/api/paystack/initialize-payment`,
          {
            email,
            amount: amountInKobo,
            bookingId,
            currency: "NGN",
            metadata: {
              clientSessionId: clientSessionId,
              bookingId: bookingId,
            },
          }
        );

        // CRITICAL: Destructure the accessCode and reference from the backend response
        const { data } = response.data;
        const { reference, accessCode } = data as BackendResponseData;
        console.log(data);

        if (!reference || !accessCode) {
          throw new Error(
            "Initialization failed: Missing reference or access code from backend."
          );
        }

        console.log(
          "Payment initialized successfully. Ref:",
          reference,
          "Access Code:",
          accessCode
        );

        // 2. Define Callbacks and Options for the Popup
        // IMPORTANT: Payment verification best practices:
        // 1. onSuccess is just a client-side signal - NEVER trust it alone
        // 2. Always verify payment on backend using Paystack's verify API
        // 3. Backend webhooks are the most reliable source of truth
        // 4. Only update order status after successful backend verification

        if (!PAYSTACK_PUBLIC_KEY) {
          throw new Error("Paystack public key not configured");
        }

        const paystackOptions = {
          key: PAYSTACK_PUBLIC_KEY as string,
          email: email,
          amount: amountInKobo,
          currency: "NGN",
          ref: reference,

          onSuccess: async (transaction: { reference: string }) => {
            // CRITICAL: Always verify payment on backend before trusting success
            console.log("Payment popup closed, verifying payment...");
            setLoading(true); // Show loading during verification

            try {
              const verification = await verifyPaymentWithPolling(
                transaction.reference
              );
              console.log(verification);
              if (verification.success) {
                // Set success state for the component to handle
                setPaymentSuccess(true);
                setPaymentReference(transaction.reference);
                // Here you would typically:
                // 1. Update order status in your database
                // 2. Send confirmation email
                // 3. The component will show success modal
              } else {
                alert(
                  `Payment verification failed. Status: ${verification.status || verification.error}`
                );
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              alert(
                "Payment verification failed. Please contact support if payment was deducted."
              );
            } finally {
              setLoading(false);
            }
          },

          onCancel: async () => {
            console.log("Payment popup canceled by user");

            // Show confirmation dialog
            const confirmed = window.confirm(
              "Payment was cancelled. Would you like to cancel this booking?\n\n" +
                "Click OK to cancel the booking, or Cancel to keep it and retry payment later."
            );

            if (confirmed) {
              try {
                setLoading(true);
                // Cancel booking (preserves record) instead of deleting
                await handleCancelBooking(
                  bookingId,
                  "Payment cancelled by user"
                );
                console.log("Booking cancelled successfully");
              } catch (err) {
                console.error("Failed to cancel booking:", err);
                setError(
                  err instanceof Error
                    ? err.message
                    : "Failed to cancel booking"
                );
              } finally {
                setLoading(false);
              }
            } else {
              // User chose to keep the booking - just close the payment flow
              setLoading(false);
              console.log(
                "Booking kept in pending state, user can retry payment later"
              );
            }
          },
        };

        // 3. Open the Paystack Popup using dynamic import (client-side only)
        if (typeof window !== "undefined") {
          const { default: PaystackPop } = await import("@paystack/inline-js");
          const paystack = new PaystackPop();

          // Use resumeTransaction with the access_code
          paystack.resumeTransaction(accessCode, paystackOptions);
        } else {
          throw new Error(
            "Paystack can only be initialized on the client side"
          );
        }
      } catch (err) {
        console.error("Error initializing payment:", err);
        const axiosErrorMsg =
          (err as any).response?.data?.message || (err as any).message;
        setError(
          axiosErrorMsg || "Failed to initiate payment. Please try again."
        );
        setLoading(false);
        throw err;
      }
    },
    []
  );

  return {
    initializePayment,
    loading,
    error,
    paymentSuccess,
    paymentReference,
  };
};
