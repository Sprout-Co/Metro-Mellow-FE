"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import styles from "./VerifyEmail.module.scss";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handleVerifyEmail } = useAuthOperations();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setError(
          "Invalid verification link. Please request a new verification email."
        );
        return;
      }

      try {
        const success = await handleVerifyEmail(token);
        console.log("success", success);
        if (success) {
          setStatus("success");
        } else {
          setStatus("error");
          setError("Failed to verify email. Please try again.");
        }
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
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
  }, [searchParams, handleVerifyEmail, router]);

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
              Your email has been successfully verified. You will be redirected
              to the dashboard shortly.
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
            <motion.button
              className={styles.verifyEmail__button}
              onClick={() => router.push("/get-started")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Return to Registration
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}
