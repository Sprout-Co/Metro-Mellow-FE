"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import styles from "./VerifyEmail.module.scss";
import {
  CheckCircle,
  XCircle,
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { login as loginAction } from "@/lib/redux";
import AuthLayout from "../get-started/_components/AuthLayout";
import SpyingEmoji from "../get-started/_components/SpyingEmoji/SpyingEmoji";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { handleVerifyEmail, handleSendVerificationEmail } =
    useAuthOperations();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [error, setError] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) {
      return;
    }

    const verifyEmail = async () => {
      hasVerified.current = true;

      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setError(
          "Invalid verification link. Please request a new verification email."
        );
        return;
      }

      try {
        const verificationResult = await handleVerifyEmail(token);

        if (
          verificationResult &&
          verificationResult.user &&
          verificationResult.token
        ) {
          dispatch(
            loginAction({
              user: verificationResult.user as any,
              token: verificationResult.token,
              welcome: true,
            })
          );

          setStatus("success");

          // setTimeout(() => {
          //   router.push("/dashboard?welcome=true");
          // }, 2500);
        } else {
          setStatus("error");
          setError("Failed to verify email. Please try again.");
        }
      } catch (err) {
        setStatus("error");
        setError(
          err instanceof Error
            ? err.message
            : "Failed to verify email. Please try again."
        );
      }
    };

    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResendVerificationEmail = async () => {
    if (!emailInput || emailInput.trim() === "") {
      setError("Please enter a valid email address");
      return;
    }

    setResendLoading(true);
    setResendSuccess(false);

    try {
      await handleSendVerificationEmail(emailInput);
      setResendSuccess(true);
      setError("");
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout
      brandingCustomContent={
        <>
          <SpyingEmoji
            expression={
              status === "verifying"
                ? "loading"
                : status === "error"
                  ? "error"
                  : "default"
            }
          />
        </>
      }
    >
      <div className={styles.verifyEmail}>
        <motion.div
          className={styles.verifyEmail__card}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Verifying State */}
          {status === "verifying" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.verifyEmail__spinner} />
              <h1>Verifying Your Email</h1>
              <p>Please wait while we verify your email address...</p>
            </motion.div>
          )}

          {/* Success State */}
          {status === "success" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div
                className={styles.verifyEmail__success}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle />
              </motion.div>
              <h1>Email Verified! 🎉</h1>
              <p>
                Your email has been successfully verified. Redirecting you to
                your dashboard...
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => router.push("/dashboard?welcome=true")}
                >
                  Go to Dashboard
                  <ArrowRight size={18} />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Error State */}
          {status === "error" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div
                className={styles.verifyEmail__error}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <XCircle />
              </motion.div>
              <h1>Verification Failed</h1>
              <p>{error || "Something went wrong. Please try again."}</p>

              {resendSuccess && (
                <div
                  className={`${styles.verifyEmail__message} ${styles["verifyEmail__message--success"]}`}
                >
                  <CheckCircle size={16} />
                  Verification email sent to {emailInput}
                </div>
              )}

              <div className={styles.verifyEmail__emailForm}>
                <label className={styles.verifyEmail__label}>
                  Enter your email to resend verification
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={styles.verifyEmail__input}
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setResendSuccess(false);
                  }}
                />
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleResendVerificationEmail}
                  disabled={
                    !emailInput || emailInput.trim() === "" || resendLoading
                  }
                >
                  {resendLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={18} />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              </div>

              <div className={styles.verifyEmail__divider}>
                <span>or</span>
              </div>

              <button
                type="button"
                className={styles.verifyEmail__back}
                onClick={() => router.push("/get-started")}
                disabled={resendLoading}
              >
                <ArrowLeft size={16} />
                Return to Sign Up
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AuthLayout>
  );
}
