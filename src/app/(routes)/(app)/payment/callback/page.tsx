"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { PaymentStatus } from "@/graphql/api";

// type PaymentStatus = "verifying" | "success" | "failed" | "error";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.Pending);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");
      const trxref = searchParams.get("trxref");

      // Use the reference from Paystack
      const paymentReference = reference || trxref;

      if (!paymentReference) {
        setStatus(PaymentStatus.Failed);
        setError("No payment reference found");
        return;
      }

      // Polling configuration
      const maxAttempts = 30; // Maximum number of polling attempts
      const pollInterval = 2000; // Poll every 2 seconds
      const maxPollingTime = 60000; // Maximum polling time: 60 seconds

      let attempts = 0;
      const startTime = Date.now();

      const pollPayment = async (): Promise<void> => {
        try {
          attempts++;

          // Check if we've exceeded maximum polling time
          if (Date.now() - startTime > maxPollingTime) {
            setStatus(PaymentStatus.Failed);
            setError(
              "Payment verification timeout. Please check your bookings or contact support."
            );
            return;
          }

          // Verify payment with your backend
          const verifyResponse = await axios.get(
            `http://localhost:4000/api/paystack/verify-payment/${paymentReference}`
          );
          console.log("verifyResponse", verifyResponse);
          const paymentStatus = verifyResponse.data.data.status;

          switch (paymentStatus) {
            case "PAID":
              setStatus(PaymentStatus.Paid);
              setPaymentData(verifyResponse.data);

              // Redirect to booking confirmation after 3 seconds
              setTimeout(() => {
                router.push(
                  `/dashboard/bookings?payment=success&reference=${paymentReference}`
                );
              }, 3000);
              break;
            case "FAILED":
            case "CANCELLED":
              setStatus(PaymentStatus.Failed);
              setError("Payment verification failed");
              break;
            case "PENDING":
            case "PROCESSING":
              // Payment is still processing, continue polling
              if (attempts < maxAttempts) {
                setTimeout(pollPayment, pollInterval);
              } else {
                setStatus(PaymentStatus.Failed);
                setError(
                  "Payment is taking longer than expected. Please check your bookings or contact support."
                );
              }
              break;
            default:
              // Unknown status, continue polling for a few more attempts
              if (attempts < maxAttempts) {
                setTimeout(pollPayment, pollInterval);
              } else {
                setStatus(PaymentStatus.Failed);
                setError("Payment verification failed with unknown status");
              }
              break;
          }
        } catch (err) {
          console.error("Payment verification error:", err);

          // If it's a network error and we haven't exceeded max attempts, retry
          if (
            attempts < maxAttempts &&
            (err as any)?.code === "NETWORK_ERROR"
          ) {
            setTimeout(pollPayment, pollInterval);
          } else {
            setStatus(PaymentStatus.Failed);
            setError(
              err instanceof Error
                ? err.message
                : "An unexpected error occurred during payment verification"
            );
          }
        }
      };

      // Start polling
      pollPayment();
    };

    verifyPayment();
  }, [searchParams, router]);

  const getStatusContent = () => {
    switch (status) {
      case PaymentStatus.Pending:
        return {
          title: "Verifying Payment...",
          message:
            "Please wait while we verify your payment. This may take a few moments. Payment reference: " +
            searchParams.get("reference"),
          icon: "⏳",
          color: "#3B82F6",
        };
      case PaymentStatus.Paid:
        return {
          title: "Payment Successful!",
          message:
            "Your payment has been verified and your booking is confirmed. Payment reference: " +
            searchParams.get("reference"),
          icon: "✅",
          color: "#10B981",
        };
      case PaymentStatus.Failed:
        return {
          title: "Payment Failed",
          message:
            "Your payment could not be verified. Please contact support. Payment reference: " +
            searchParams.get("reference"),
          icon: "❌",
          color: "#EF4444",
        };
      case PaymentStatus.Failed:
        return {
          title: "Verification Error",
          message:
            error ||
            "An error occurred during payment verification. Payment reference: " +
              searchParams.get("reference"),
          icon: "⚠️",
          color: "#F59E0B",
        };
      default:
        return {
          title: "Processing...",
          message: "Please wait",
          icon: "⏳",
          color: "#3B82F6",
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>
          {statusContent.icon}
        </div>

        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
          {statusContent.title}
        </h1>
        <p style={{ fontSize: "16px", marginBottom: "20px", color: "#666" }}>
          {statusContent.message}
        </p>

        {status === PaymentStatus.Pending && (
          <div style={{ marginBottom: "20px" }}>
            <p>Loading...</p>
          </div>
        )}

        {status === PaymentStatus.Paid && (
          <div style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "10px" }}>
              Redirecting to your bookings...
            </p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/bookings")}
            >
              Go to Bookings Now
            </button>
          </div>
        )}

        {status === PaymentStatus.Failed && (
          <div style={{ marginBottom: "20px" }}>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => router.push("/dashboard/bookings")}
            >
              Go to Bookings
            </button>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/support")}
            >
              Contact Support
            </button>
          </div>
        )}

        {paymentData && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Payment Details</h3>
            <p style={{ margin: "5px 0" }}>
              <strong>Reference:</strong> {paymentData.reference}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Amount:</strong> ₦{paymentData.amount?.toLocaleString()}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Status:</strong> {paymentData.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
