"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader2,
  RefreshCw,
  KeyRound,
} from "lucide-react";
import styles from "./VerificationForm.module.scss";
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
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { handleSendVerificationEmail, handleVerifyEmailWithCode } =
    useAuthOperations();

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendLink = async () => {
    if (countdown > 0) return;

    setResendLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await handleSendVerificationEmail(email);
      setSuccess("Verification email sent!");
      setCountdown(60);
    } catch (err) {
      setError("Failed to send email. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

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
      className={styles.verification}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className={styles.verification__header}>
        <div className={styles.verification__icon}>
          <Mail size={28} />
        </div>
        <h1 className={styles.verification__title}>Check Your Email</h1>
        <p className={styles.verification__subtitle}>
          We sent a verification link to
        </p>
        <span className={styles.verification__email}>{email}</span>
      </div>

      {/* Messages */}
      {error && (
        <motion.div
          className={`${styles.verification__message} ${styles["verification__message--error"]}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle size={18} />
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          className={`${styles.verification__message} ${styles["verification__message--success"]}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle size={18} />
          {success}
        </motion.div>
      )}

      {/* Main Action */}
      <div className={styles.verification__primary}>
        <p className={styles.verification__instructions}>
          Click the link in your email to verify your account
        </p>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleResendLink}
          disabled={countdown > 0 || resendLoading}
        >
          {resendLoading ? (
            <>
              <Loader2 size={18} className={styles.spinner} />
              Sending...
            </>
          ) : countdown > 0 ? (
            `Resend in ${countdown}s`
          ) : (
            <>
              <RefreshCw size={18} />
              Resend Verification Email
            </>
          )}
        </Button>
      </div>

      {/* Divider */}
      <div className={styles.verification__divider}>
        <span>or verify with code</span>
      </div>

      {/* Code Form */}
      <form onSubmit={handleSubmit} className={styles.verification__form}>
        <div className={styles.verification__inputGroup}>
          <label className={styles.verification__label}>
            Enter the 6-digit code from your email
          </label>
          <div className={styles.verification__inputWrapper}>
            <KeyRound size={20} className={styles.verification__inputIcon} />
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError(null);
              }}
              placeholder="Enter code"
              className={styles.verification__input}
              autoComplete="off"
              maxLength={10}
              disabled={loading}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="ghost"
          size="lg"
          fullWidth
          disabled={!code.trim() || loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className={styles.spinner} />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>
      </form>

      {/* Back Link */}
      <button
        type="button"
        className={styles.verification__back}
        onClick={onBack}
        disabled={loading}
      >
        <ArrowLeft size={16} />
        Back to Registration
      </button>
    </motion.div>
  );
}
