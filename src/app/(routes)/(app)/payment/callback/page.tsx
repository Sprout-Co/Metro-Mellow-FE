"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import styles from "./PaymentCallback.module.scss";

type PaymentStatus = "verifying" | "success" | "failed" | "error";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<PaymentStatus>("verifying");
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const reference = searchParams.get("reference");
        const trxref = searchParams.get("trxref");

        // Use the reference from Paystack
        const paymentReference = reference || trxref;

        if (!paymentReference) {
          setStatus("error");
          setError("No payment reference found");
          return;
        }

        // Verify payment with your backend
        const verifyResponse = await axios.get(
          `http://localhost:4000/api/paystack/verify-payment/${paymentReference}`
        );

        if (verifyResponse.data.status === "success") {
          setStatus("success");
          setPaymentData(verifyResponse.data);

          // Redirect to booking confirmation after 3 seconds
          setTimeout(() => {
            router.push(
              `/dashboard/bookings?payment=success&reference=${paymentReference}`
            );
          }, 3000);
        } else {
          setStatus("failed");
          setError("Payment verification failed");
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        setStatus("error");
        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during payment verification"
        );
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  const getStatusContent = () => {
    switch (status) {
      case "verifying":
        return {
          title: "Verifying Payment...",
          message: "Please wait while we verify your payment",
          icon: "⏳",
          color: "#3B82F6",
        };
      case "success":
        return {
          title: "Payment Successful!",
          message:
            "Your payment has been verified and your booking is confirmed",
          icon: "✅",
          color: "#10B981",
        };
      case "failed":
        return {
          title: "Payment Failed",
          message:
            "Your payment could not be verified. Please contact support.",
          icon: "❌",
          color: "#EF4444",
        };
      case "error":
        return {
          title: "Verification Error",
          message: error || "An error occurred during payment verification",
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
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.icon} style={{ color: statusContent.color }}>
          {statusContent.icon}
        </div>

        <h1 className={styles.title}>{statusContent.title}</h1>
        <p className={styles.message}>{statusContent.message}</p>

        {status === "verifying" && (
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
          </div>
        )}

        {status === "success" && (
          <div className={styles.successActions}>
            <p className={styles.redirectMessage}>
              Redirecting to your bookings...
            </p>
            <button
              className={styles.manualRedirect}
              onClick={() => router.push("/dashboard/bookings")}
            >
              Go to Bookings Now
            </button>
          </div>
        )}

        {(status === "failed" || status === "error") && (
          <div className={styles.errorActions}>
            <button
              className={styles.retryButton}
              onClick={() => router.push("/dashboard/bookings")}
            >
              Go to Bookings
            </button>
            <button
              className={styles.supportButton}
              onClick={() => router.push("/dashboard/support")}
            >
              Contact Support
            </button>
          </div>
        )}

        {paymentData && (
          <div className={styles.paymentDetails}>
            <h3>Payment Details</h3>
            <p>
              <strong>Reference:</strong> {paymentData.reference}
            </p>
            <p>
              <strong>Amount:</strong> ₦{paymentData.amount?.toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {paymentData.status}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
