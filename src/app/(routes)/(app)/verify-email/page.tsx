"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import styles from "./VerifyEmail.module.scss";
import { CheckCircle, XCircle } from "lucide-react";
import FnButton from "@/components/ui/Button/FnButton";
import { useAppDispatch } from "@/lib/redux/hooks";
import { login as loginAction } from "@/lib/redux";

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

  // Use ref to track if we've already verified to prevent duplicate calls
  const hasVerified = useRef(false);

  useEffect(() => {
    // Skip if we've already verified
    if (hasVerified.current) {
      return;
    }

    console.log("verifyEmail called");

    const verifyEmail = async () => {
      // Mark as verified immediately to prevent any possibility of duplicate calls
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
        // The verification result contains both user data and auth token
        const verificationResult = await handleVerifyEmail(token);
        console.log("Verification result:", verificationResult);

        if (
          verificationResult &&
          verificationResult.user &&
          verificationResult.token
        ) {
          // Log the user in directly with the returned data
          dispatch(
            loginAction({
              user: verificationResult.user as any,
              token: verificationResult.token,
            })
          );

          setStatus("success");

          // Redirect to dashboard after showing success message
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
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

    try {
      await handleSendVerificationEmail(emailInput);
      setError("A new verification email has been sent to " + emailInput);
    } catch (err) {
      setError("Failed to send verification email. Please try again.");
    }
  };

  return (
    <div className={styles.verifyEmail}>
      <motion.div
        className={styles.verifyEmail__card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {status === "verifying" && (
          <>
            <div className={styles.verifyEmail__spinner} />
            <h1>Verifying Your Email</h1>
            <p>Please wait while we verify your email address...</p>
          </>
        )}

        {status === "success" && (
          <>
            <motion.div
              className={styles.verifyEmail__success}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <CheckCircle size={64} />
            </motion.div>
            <h1>Email Verified!</h1>
            <p>
              Your email has been successfully verified. You are now logged in
              and will be redirected to the dashboard shortly.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <motion.div
              className={styles.verifyEmail__error}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <XCircle size={64} />
            </motion.div>
            <h1>Verification Failed</h1>
            <p>{error}</p>
            <div className={styles.verifyEmail__emailForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.verifyEmail__input}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <FnButton
                variant="primary"
                size="md"
                onClick={handleResendVerificationEmail}
                disabled={!emailInput || emailInput.trim() === ""}
              >
                Resend Verification Email
              </FnButton>
            </div>
            <br />
            <FnButton
              variant="primary"
              size="md"
              onClick={() => router.push("/get-started")}
            >
              Return to Registration
            </FnButton>
            {/* <motion.button
              className={styles.verifyEmail__button}
              onClick={() => router.push("/get-started")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Return to Registration
              </FnButton>
            </motion.button> */}
          </>
        )}
      </motion.div>
    </div>
  );
}
