import { useState } from "react";
import axios from "axios";

interface PaymentData {
  authorizationUrl: string;
}

interface UsePaymentReturn {
  initializePayment: (
    bookingId: string,
    amount: number,
    email: string
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const usePayment = (): UsePaymentReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = async (
    bookingId: string,
    amount: number,
    email: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/paystack/initialize-payment",
        {
          email,
          amount, // Amount in kobo
          bookingId,
          currency: "NGN",
        }
      );

      const { data } = response.data;

      console.log("Payment initialization response:", data);

      if (data && data.authorizationUrl) {
        // Redirect the user to the Paystack page to complete payment
        console.log("Redirecting to Paystack:", data.authorizationUrl);
        window.location.href = data.authorizationUrl;
      } else {
        throw new Error("Could not retrieve payment URL.");
      }
    } catch (err) {
      console.error("Error initializing payment:", err);
      setError("Failed to initiate payment. Please try again.");
      throw err; // Re-throw so calling component can handle if needed
    } finally {
      setLoading(false);
    }
  };

  return {
    initializePayment,
    loading,
    error,
  };
};
