"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, AlertCircle } from "lucide-react";
import FormInput from "../../../_components/FormInput";
import styles from "./ForgotPasswordForm.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface ForgotPasswordFormState {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onBackToLogin: () => void;
  onStepChange?: (step: number) => void;
}

export default function ForgotPasswordForm({
  onSuccess,
  onBackToLogin,
  onStepChange,
}: ForgotPasswordFormProps) {
  const { handleForgotPassword } = useAuthOperations();
  const [formData, setFormData] = useState<ForgotPasswordFormState>({
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
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
      await handleForgotPassword(formData.email);
      setIsSubmitted(true);
      onStepChange?.(2); // Move to step 2 after submission

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setErrors({
        ...errors,
        general:
          error instanceof Error
            ? error.message
            : "Failed to send reset email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.success}>
        <div className={styles.success__content}>
          <h2 className={styles.success__title}>
            A password reset link has been sent{" "}
          </h2>
          <p className={styles.success__message}>
            A link to reset your password has been sent to your registered email
            address. Follow the link to create a new password for your
            Metromellow account.
          </p>
          <div className={styles.success__illustration}>
            <Image
              src="/images/general/success_order.png"
              alt="Order Success"
              width={300}
              height={300}
              priority
            />
          </div>
          <Button
            variant="primary"
            fullWidth
            className={styles.success__button}
            onClick={onBackToLogin}
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.forgotForm}>
      <AnimatePresence mode="wait">
        <motion.div
          key="forgot-password"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className={styles.forgotForm__title}>Reset Password</h1>
          <p className={styles.forgotForm__subtitle}>
            Enter your email address and we'll send you instructions to reset
            your password
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <div className={styles.forgotForm__error}>
                <AlertCircle size={20} />
                {errors.general}
              </div>
            )}

            <FormInput
              id="forgot-password-email"
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              error={errors.email}
              autoComplete="email"
              icon={<Mail size={20} />}
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
                  <div className={styles.forgotForm__buttonSpinner}></div>
                  Sending...
                </>
              ) : (
                "Send Reset Instructions"
              )}
            </Button>

            <div className={styles.forgotForm__switch}>
              Remember your password?
              <button
                type="button"
                className={styles.forgotForm__switchLink}
                onClick={onBackToLogin}
              >
                Back to Login
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
