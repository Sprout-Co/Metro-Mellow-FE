"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "./FormInput";
import styles from "./AuthLayout.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";

interface ResetPasswordFormProps {
  token: string;
  onBackToLogin: () => void;
}

interface ResetPasswordFormState {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function ResetPasswordForm({
  token,
  onBackToLogin,
}: ResetPasswordFormProps) {
  const { handleResetPassword } = useAuthOperations();
  const [formData, setFormData] = useState<ResetPasswordFormState>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for this field when user changes it
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous general error
    setErrors({ ...errors, general: undefined });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await handleResetPassword(token, formData.password);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Reset password error:", error);
      setErrors({
        ...errors,
        general:
          error instanceof Error
            ? error.message
            : "Failed to reset password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginForm}>
      <AnimatePresence mode="wait">
        <motion.div
          key="reset-password"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className={styles.loginForm__title}>Reset Password</h1>
          <p className={styles.loginForm__subtitle}>
            Enter your new password below
          </p>

          {isSubmitted ? (
            <div className={styles.loginForm__success}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 4L12 14.01L9 11.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3>Password Reset Successful</h3>
              <p>Your password has been reset successfully.</p>
              <button
                className={styles.loginForm__button}
                onClick={onBackToLogin}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.loginForm__form}>
              <FormInput
                label="New Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />

              {errors.general && (
                <div className={styles.loginForm__error}>{errors.general}</div>
              )}

              <button
                type="submit"
                className={styles.loginForm__button}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                className={styles.loginForm__link}
                onClick={onBackToLogin}
              >
                Back to Login
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
