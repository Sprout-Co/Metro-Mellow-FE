// components/auth/VerificationForm.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, AlertCircle, ArrowLeft } from "lucide-react";
import styles from "./AuthLayout.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { Button } from "@/components/ui/Button";

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
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLinkDisabled, setResendLinkDisabled] = useState(false);
  const [resendCodeDisabled, setResendCodeDisabled] = useState(false);
  const [linkCountdown, setLinkCountdown] = useState(0);
  const [codeCountdown, setCodeCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { handleSendVerificationEmail, handleVerifyEmailWithCode } =
    useAuthOperations();

  // Handle countdown for resend link
  useEffect(() => {
    if (linkCountdown > 0) {
      const timer = setTimeout(() => {
        setLinkCountdown(linkCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (linkCountdown === 0 && resendLinkDisabled) {
      setResendLinkDisabled(false);
    }
  }, [linkCountdown, resendLinkDisabled]);

  // Handle countdown for resend code
  useEffect(() => {
    if (codeCountdown > 0) {
      const timer = setTimeout(() => {
        setCodeCountdown(codeCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (codeCountdown === 0 && resendCodeDisabled) {
      setResendCodeDisabled(false);
    }
  }, [codeCountdown, resendCodeDisabled]);

  const handleResendLink = async () => {
    if (resendLinkDisabled) return;

    setResendLinkDisabled(true);
    setLinkCountdown(60); // 60 second cooldown
    setError(null);
    setSuccess(null);

    try {
      // Send new verification email with link
      await handleSendVerificationEmail(email);
      setSuccess("A new verification link has been sent to your email.");
    } catch (err) {
      setError("Failed to resend verification link. Please try again later.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!code.trim()) {
      setError("Please enter the verification code");
      setLoading(false);
      return;
    }

    try {
      await handleVerifyEmailWithCode(email, code);
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid verification code. Please try again."
      );
    } finally {
      setLoading(false);
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
        We've sent a verification email to{" "}
        <span className={styles.registerForm__emailHighlight}>{email}</span>
      </p>

      <div className={styles.registerForm__verificationGroup}>
        {error && (
          <div
            className={`${styles.registerForm__error} ${
              error.includes("has been sent") || error.includes("successfully")
                ? styles["registerForm__error--success"]
                : ""
            }`}
          >
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {success && (
          <div
            className={`${styles.registerForm__error} ${styles["registerForm__error--success"]}`}
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formInput}>
            <label
              htmlFor="verification-code"
              className={styles.formInput__label}
            >
              Or Enter Verification Code (Optional)
            </label>
            <div
              className={`
                ${styles.formInput__wrapper} 
                ${
                  error &&
                  !error.includes("has been sent") &&
                  !error.includes("successfully")
                    ? styles["formInput__wrapper--error"]
                    : ""
                }
              `}
            >
              <div className={styles.formInput__icon}>
                <Mail size={20} />
              </div>
              <input
                id="verification-code"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(null);
                }}
                placeholder="Enter verification code"
                className={styles.formInput__input}
                autoComplete="off"
                maxLength={10}
                disabled={loading}
              />
            </div>
          </div>

          {code.trim() && (
            <motion.button
              type="submit"
              className={styles.registerForm__button}
              disabled={loading || !code.trim()}
              whileHover={!loading && code.trim() ? { scale: 1.02 } : {}}
              whileTap={!loading && code.trim() ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <div className={styles.registerForm__buttonSpinner}></div>
                  Verifying...
                </>
              ) : (
                "Verify with Code"
              )}
            </motion.button>
          )}

          <div className={styles.registerForm__actions}>
            <p style={{ marginBottom: "1rem", textAlign: "center" }}>
              Didn't receive the email?
            </p>
            <div>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleResendLink}
                disabled={resendLinkDisabled || loading}
              >
                {resendLinkDisabled
                  ? `Resend Link in ${linkCountdown}s`
                  : "Resend Verification Link"}
              </Button>
            </div>
            <div className={styles.registerForm__back}>
              <button
                type="button"
                className={styles.registerForm__backLink}
                onClick={onBack}
                disabled={loading}
              >
                <ArrowLeft size={16} />
                Back to Registration
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
