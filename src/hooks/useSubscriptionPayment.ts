import { useState, useCallback } from "react";
import axios from "axios";
import { REST_API_BASE_URL } from "@/constants/config";

interface BackendResponseData {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

interface UseSubscriptionPaymentReturn {
  initializeSubscriptionPayment: (
    billingId: string,
    amountInNaira: number,
    email: string
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  paymentSuccess: boolean;
  paymentReference: string | null;
  setPaymentSuccess: (success: boolean) => void;
  setPaymentLoading: (loading: boolean) => void;
  setPaymentError: (error: string | null) => void;
}

export const useSubscriptionPayment = (): UseSubscriptionPaymentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  // Utility function to verify payment on backend with polling
  const verifyPaymentWithPolling = async (
    reference: string
  ): Promise<{ success: boolean; status?: string; error?: string }> => {
    // Polling configuration (same as booking verification)
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

  const initializeSubscriptionPayment = useCallback(
    async (billingId: string, amountInNaira: number, email: string) => {
      setLoading(true);
      setError(null);

      // CRITICAL: Convert Naira to Kobo
      const amountInKobo = Math.round(amountInNaira);

      try {
        // 1. Call Backend to Initialize Subscription Payment Transaction
        const clientSessionId = crypto.randomUUID();

        const response = await axios.post(
          `${REST_API_BASE_URL}/api/paystack/initialize-subscription-payment`,
          {
            email,
            billingId,
            metadata: {
              clientSessionId: clientSessionId,
              billingId: billingId,
            },
          }
        );

        // CRITICAL: Destructure the accessCode and reference from the backend response
        const { data } = response.data;
        const { reference, accessCode } = data as BackendResponseData;

        if (!reference || !accessCode) {
          throw new Error(
            "Initialization failed: Missing reference or access code from backend."
          );
        }

        console.log(
          "Subscription payment initialized successfully. Ref:",
          reference,
          "Access Code:",
          accessCode
        );

        // 2. Define Callbacks and Options for the Popup
        // IMPORTANT: Payment verification best practices:
        // 1. onSuccess is just a client-side signal - NEVER trust it alone
        // 2. Always verify payment on backend using Paystack's verify API
        // 3. Backend webhooks are the most reliable source of truth
        // 4. Only update billing status after successful backend verification

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
            console.log(
              "Subscription payment popup closed, verifying payment..."
            );
            setLoading(true); // Show loading during verification

            try {
              const verification = await verifyPaymentWithPolling(
                transaction.reference
              );

              if (verification.success) {
                // Set success state for the component to handle
                setPaymentSuccess(true);
                setPaymentReference(transaction.reference);

                console.log("Subscription payment verified successfully!");
                // The component will handle redirect to /dashboard/subscriptions
              } else {
                setError(
                  `Payment verification failed. Status: ${verification.status || verification.error}`
                );
                alert(
                  `Payment verification failed. Status: ${verification.status || verification.error}`
                );
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              const errorMessage =
                "Payment verification failed. Please contact support if payment was deducted.";
              setError(errorMessage);
              alert(errorMessage);
            }
          },

          onCancel: async () => {
            console.log("Subscription payment popup canceled by user");
            setLoading(false);
            setError("Payment was cancelled");
            // Note: Subscription and billing records remain in pending state
            // User can retry payment later from subscriptions dashboard
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
        console.error("Error initializing subscription payment:", err);
        const axiosErrorMsg =
          (err as any).response?.data?.message || (err as any).message;
        setError(
          axiosErrorMsg ||
            "Failed to initiate subscription payment. Please try again."
        );
        setLoading(false);
        throw err;
      }
    },
    []
  );

  return {
    initializeSubscriptionPayment,
    loading,
    error,
    paymentSuccess,
    setPaymentSuccess,
    paymentReference,
    setPaymentLoading: setLoading,
    setPaymentError: setError,
  };
};
