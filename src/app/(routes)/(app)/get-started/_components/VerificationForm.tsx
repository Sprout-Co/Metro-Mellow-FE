// components/auth/VerificationForm.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./AuthLayout.module.scss";

interface VerificationFormProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function VerificationForm({
  email,
  onSuccess,
  onBack,
}: VerificationFormProps) {
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Handle countdown for resend link
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);

  const handleResendLink = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setCountdown(60); // 60 second cooldown
    setError(null);

    try {
      // Send new verification email
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: "verification",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }

      setError("A new verification link has been sent to your email.");
    } catch (err) {
      setError("Failed to resend verification link. Please try again later.");
    }
  };

  return (
    <motion.div
      key="verification"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className={styles.registerForm__title}>Verify Your Email</h1>
      <p className={styles.registerForm__subtitle}>
        We've sent a verification link to{" "}
        <span className={styles.registerForm__emailHighlight}>{email}</span>
      </p>

      <div className={styles.registerForm__verificationGroup}>
        <div className={styles.registerForm__message}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>
            Please check your email and click the verification link to complete
            your registration. If you don't see the email, please check your
            spam folder.
          </p>
        </div>

        {error && (
          <div
            className={`${styles.registerForm__error} ${
              error.includes("has been sent")
                ? styles["registerForm__error--success"]
                : ""
            }`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {error}
          </div>
        )}

        <div className={styles.registerForm__actions}>
          Didn't receive the email?{" "}
          <br />
          <motion.button
            type="button"
            className={styles.registerForm__button}
            onClick={handleResendLink}
            disabled={resendDisabled}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {resendDisabled ? `Resend in ${countdown}s` : "Resend Link"}
          </motion.button>
          {/* <div className={styles.registerForm__resend}>
            Didn't receive the email?{" "}
            <button
              type="button"
              className={`
                ${styles.registerForm__resendLink}
                ${resendDisabled ? styles["registerForm__resendLink--disabled"] : ""}
              `}
              onClick={handleResendLink}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend Link"}
            </button>
          </div> */}
          <div className={styles.registerForm__back}>
            <button
              type="button"
              className={styles.registerForm__backLink}
              onClick={onBack}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
