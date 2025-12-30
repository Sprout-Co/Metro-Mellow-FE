"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import FormInput from "../../../_components/FormInput";
import styles from "./ResetPasswordForm.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { Button } from "@/components/ui/Button";

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

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

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

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className={styles.resetForm}>
      <AnimatePresence mode="wait">
        <motion.div
          key="reset-password"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className={styles.resetForm__title}>Create New Password</h1>
          <p className={styles.resetForm__subtitle}>
            Enter your new password below. Make sure it's at least 8 characters.
          </p>

          {isSubmitted ? (
            <motion.div
              className={styles.resetForm__success}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.resetForm__successIcon}>
                <CheckCircle size={40} />
              </div>
              <h3 className={styles.resetForm__successTitle}>
                Password Reset Successful
              </h3>
              <p className={styles.resetForm__successMessage}>
                Your password has been reset successfully. You can now sign in
                with your new password.
              </p>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={onBackToLogin}
              >
                <ArrowLeft size={18} />
                Back to Login
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {errors.general && (
                <div className={styles.resetForm__error}>
                  <AlertCircle size={20} />
                  {errors.general}
                </div>
              )}

              <FormInput
                id="reset-password"
                name="password"
                type="password"
                label="New Password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                error={errors.password}
                autoComplete="new-password"
                icon={<Lock size={20} />}
              />

              <FormInput
                id="reset-confirm-password"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                error={errors.confirmPassword}
                autoComplete="new-password"
                icon={<Lock size={20} />}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className={styles.resetForm__buttonSpinner}></div>
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              <button
                type="button"
                className={styles.resetForm__backLink}
                onClick={onBackToLogin}
              >
                <ArrowLeft size={16} />
                Back to Login
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
