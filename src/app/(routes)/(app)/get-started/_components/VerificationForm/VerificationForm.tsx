"use client";

import { useState, useEffect, useRef } from "react";
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
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60); // Start with 60 seconds to prevent immediate resend
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const handleSubmit = async (codeValue: string) => {
    if (!codeValue.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await handleVerifyEmailWithCode(email, codeValue);
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid verification code. Please try again."
      );
      // Clear code on error
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    // Only allow alphanumeric characters
    const sanitizedValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (sanitizedValue.length > 1) {
      // Handle paste: fill multiple boxes
      const pasteValues = sanitizedValue.slice(0, 6).split("");
      const newCode = [...code];

      pasteValues.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char;
        }
      });

      setCode(newCode);
      setError(null);

      // Focus the next empty box or the last box
      const nextEmptyIndex = newCode.findIndex(
        (val, i) => i >= index && val === ""
      );
      const focusIndex =
        nextEmptyIndex !== -1
          ? nextEmptyIndex
          : Math.min(index + pasteValues.length, 5);

      // Auto-submit if all boxes are filled
      if (newCode.every((val) => val !== "")) {
        setTimeout(() => {
          handleSubmit(newCode.join(""));
        }, 100);
      } else {
        setTimeout(() => {
          inputRefs.current[focusIndex]?.focus();
        }, 0);
      }
    } else {
      // Single character input
      const newCode = [...code];
      newCode[index] = sanitizedValue;
      setCode(newCode);
      setError(null);

      // Auto-advance to next box
      if (sanitizedValue && index < 5) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }

      // Auto-submit when last box is filled
      if (sanitizedValue && index === 5) {
        const fullCode = [...newCode].join("");
        if (fullCode.length === 6) {
          setTimeout(() => {
            handleSubmit(fullCode);
          }, 100);
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^A-Za-z0-9]/g, "")
      .toUpperCase()
      .slice(0, 6);

    if (pastedData.length > 0) {
      const newCode = [...code];
      pastedData.split("").forEach((char, i) => {
        if (i < 6) {
          newCode[i] = char;
        }
      });

      setCode(newCode);
      setError(null);

      // Auto-submit if all boxes are filled
      if (newCode.every((val) => val !== "")) {
        setTimeout(() => {
          handleSubmit(newCode.join(""));
        }, 100);
      } else {
        // Focus the next empty box
        const nextEmptyIndex = newCode.findIndex((val) => val === "");
        setTimeout(() => {
          inputRefs.current[
            nextEmptyIndex !== -1 ? nextEmptyIndex : 5
          ]?.focus();
        }, 0);
      }
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
          We sent a verification link and code to
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

      {/* Code Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(code.join(""));
        }}
        className={styles.verification__form}
      >
        <div className={styles.verification__inputGroup}>
          <label className={styles.verification__label}>
            Enter the 6-digit code from your email
          </label>
          <div className={styles.verification__codeContainer}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`${styles.verification__codeInput} ${
                  loading ? styles["verification__codeInput--loading"] : ""
                }`}
                autoComplete="off"
                maxLength={1}
                disabled={loading}
                autoFocus={index === 0}
              />
            ))}
          </div>
          {loading && (
            <motion.div
              className={styles.verification__loadingMessage}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Loader2 size={16} className={styles.spinner} />
              <span>Verifying code...</span>
            </motion.div>
          )}
        </div>
      </form>
      <p className={styles.verification__resendLink}>
        Didn't receive the email?{" "}
        <span
          onClick={handleResendLink}
          className={`${styles.verification__resendButton} ${
            countdown > 0 || resendLoading
              ? styles["verification__resendButton--disabled"]
              : ""
          }`}
        >
          {resendLoading ? (
            <>
              <Loader2 size={14} className={styles.spinner} />
              Sending...
            </>
          ) : countdown > 0 ? (
            `Resend in ${countdown}s`
          ) : (
            "Resend"
          )}
        </span>
      </p>

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
