import { useState, useCallback } from "react";
import axios from "axios";
import { REST_API_BASE_URL } from "@/constants/config";
import {
  PaymentStatus,
  useGetMealOrderPaymentStatusLazyQuery,
} from "@/graphql/api";

interface MetroEatsInitializeResponseData {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  publicKey?: string;
}

export interface UseMetroEatsPaymentResult {
  initializeMealPayment: (
    mealOrderId: string,
    amountInNaira: number,
    email: string,
  ) => Promise<void>;
  loading: boolean;
  verifyPaymentLoading: boolean;
  error: string | null;
  paymentSuccess: boolean;
  paymentReference: string | null;
  paymentStatus: PaymentStatus | null;
}

const MAX_VERIFICATION_ATTEMPTS = 20;
const VERIFICATION_POLL_INTERVAL_MS = 2000;

export const useMetroEatsPayment = (): UseMetroEatsPaymentResult => {
  const [loading, setLoading] = useState(false);
  const [verifyPaymentLoading, setVerifyPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null,
  );

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const [triggerPaymentStatusQuery] = useGetMealOrderPaymentStatusLazyQuery();

  const verifyPaymentWithBackendHybrid = useCallback(
    async (reference: string, mealOrderId: string) => {
      setVerifyPaymentLoading(true);
      setError(null);

      try {
        // First attempt: REST verify endpoint
        try {
          const verifyResponse = await axios.get(
            `${REST_API_BASE_URL}/api/metroeats/payments/verify/${reference}`,
          );

          const data = verifyResponse.data?.data;
          const statusFromRest: PaymentStatus | undefined = data?.paymentStatus;
          console.log(data);
          if (statusFromRest === PaymentStatus.Paid) {
            setPaymentStatus(PaymentStatus.Paid);
            setPaymentSuccess(true);
            return;
          }

          if (
            statusFromRest === PaymentStatus.Failed ||
            statusFromRest === PaymentStatus.Pending
          ) {
            setPaymentStatus(statusFromRest);
            if (statusFromRest === PaymentStatus.Failed) {
              setError("Payment failed. Please try again.");
            }
            if (statusFromRest === PaymentStatus.Pending) {
              // fall through to GraphQL polling for final confirmation
            } else {
              return;
            }
          }
        } catch (restError) {
          // If REST verification fails, fall back to GraphQL polling below
          console.error("MetroEats REST payment verify error:", restError);
        }

        // Fallback: GraphQL polling of mealOrderPaymentStatus
        let attempts = 0;
        while (attempts < MAX_VERIFICATION_ATTEMPTS) {
          attempts += 1;

          const { data, error: gqlError } = await triggerPaymentStatusQuery({
            variables: { orderId: mealOrderId },
            fetchPolicy: "network-only",
          });

          if (gqlError) {
            console.error("mealOrderPaymentStatus query error:", gqlError);
          }

          const status = data?.mealOrderPaymentStatus;

          if (status === PaymentStatus.Paid) {
            setPaymentStatus(PaymentStatus.Paid);
            setPaymentSuccess(true);
            return;
          }

          if (status === PaymentStatus.Failed) {
            setPaymentStatus(PaymentStatus.Failed);
            setError("Payment failed. Please try again.");
            return;
          }

          await new Promise((resolve) =>
            setTimeout(resolve, VERIFICATION_POLL_INTERVAL_MS),
          );
        }

        setError(
          "Payment verification is taking longer than expected. Please check your orders or contact support.",
        );
      } finally {
        setVerifyPaymentLoading(false);
      }
    },
    [triggerPaymentStatusQuery],
  );

  const initializeMealPayment = useCallback(
    async (mealOrderId: string, amountInNaira: number, email: string) => {
      setLoading(true);
      setError(null);
      setPaymentSuccess(false);
      setPaymentReference(null);
      setPaymentStatus(null);

      const amountInKobo = Math.round(amountInNaira);

      try {
        let authHeaders: Record<string, string> | undefined;
        if (typeof window !== "undefined") {
          const authTokenCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth-token="));
          if (authTokenCookie) {
            const token = decodeURIComponent(authTokenCookie.split("=")[1]);
            if (token) {
              authHeaders = {
                Authorization: `Bearer ${token}`,
              };
            }
          }
        }

        const response = await axios.post(
          `${REST_API_BASE_URL}/api/metroeats/payments/initialize`,
          {
            mealOrderId,
          },
          authHeaders ? { headers: authHeaders } : undefined,
        );

        const { data } = response.data;
        const { authorizationUrl, accessCode, reference, publicKey } =
          data as MetroEatsInitializeResponseData;

        if (!reference || !accessCode) {
          throw new Error(
            "Initialization failed: Missing reference or access code from backend.",
          );
        }

        const paystackKey = publicKey || PAYSTACK_PUBLIC_KEY;
        if (!paystackKey) {
          throw new Error("Paystack public key not configured");
        }

        const paystackOptions = {
          key: paystackKey,
          email,
          amount: amountInKobo,
          currency: "NGN",
          ref: reference,
          onSuccess: async (transaction: { reference: string }) => {
            try {
              await verifyPaymentWithBackendHybrid(
                transaction.reference,
                mealOrderId,
              );
              setPaymentReference(transaction.reference);
            } catch (verificationError) {
              console.error(
                "MetroEats payment verification error:",
                verificationError,
              );
              setError(
                "Payment verification failed. Please contact support if payment was deducted.",
              );
            }
          },
          onCancel: () => {
            setError("Payment was cancelled. You can retry from your orders.");
          },
        };

        if (typeof window !== "undefined") {
          const { default: PaystackPop } = await import("@paystack/inline-js");
          const paystack = new PaystackPop();
          // The authorizationUrl is useful for full page redirects; here we use the inline accessCode
          void authorizationUrl;
          paystack.resumeTransaction(accessCode, paystackOptions);
        } else {
          throw new Error(
            "Paystack can only be initialized on the client side",
          );
        }
      } catch (err) {
        console.error("Error initializing MetroEats payment:", err);
        const axiosErrorMsg =
          (err as any).response?.data?.message || (err as any).message;
        setError(
          axiosErrorMsg ||
            "Failed to initiate payment for your order. Please try again.",
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [PAYSTACK_PUBLIC_KEY, verifyPaymentWithBackendHybrid],
  );

  return {
    initializeMealPayment,
    loading,
    verifyPaymentLoading,
    error,
    paymentSuccess,
    paymentReference,
    paymentStatus,
  };
};
