// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FormInput from "../FormInput";
import SocialAuth from "../SocialAuth";
import styles from "./LoginForm.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { Button } from "@/components/ui/Button";

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick: () => void;
}

export default function LoginForm({
  onSuccess,
  onRegisterClick,
}: LoginFormProps) {
  const { handleLogin } = useAuthOperations();
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
    console.log("Login form submitted");

    // Clear any previous general error
    setErrors({ ...errors, general: undefined });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log(
        "Attempting login with:",
        { email: formData.email },
        formData
      );
      await handleLogin(formData.email, formData.password);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        ...errors,
        general:
          error instanceof Error
            ? error.message
            : "Login failed. Please check your credentials and try again.",
      });
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    try {
      // In a real app, you would implement social auth logic here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate login success
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setErrors({
        ...errors,
        general: `${provider} login failed. Please try again.`,
      });
    }
  };

  return (
    <div className={styles.loginForm}>
      <AnimatePresence mode="wait">
        <motion.div
          key="login"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className={styles.loginForm__title}>Welcome back!</h1>
          <p className={styles.loginForm__subtitle}>
            Sign in to continue to Metromellow
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <div className={styles.loginForm__error}>
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
                {errors.general}
              </div>
            )}

            <FormInput
              id="login-email"
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="team@metromellow.com"
              required
              error={errors.email}
              autoComplete="email"
            />

            <div className={styles.loginForm__passwordGroup}>
              <FormInput
                id="login-password"
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                error={errors.password}
                autoComplete="current-password"
              />
              <Link
                href="/get-started/forgot-password"
                className={styles.loginForm__forgotPassword}
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className={styles.loginForm__buttonSpinner}></div>
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
          <div className={styles.loginForm__signUpLink}>
            Don't have an account?{" "}
            <button
              type="button"
              className={styles.loginForm__signUpButton}
              onClick={onRegisterClick}
            >
              Sign up
            </button>
          </div>
          {/* 
          <div className={styles.loginForm__divider}>
            <span className={styles.loginForm__dividerText}>OR</span>
          </div>

          <SocialAuth onSocialAuth={handleSocialAuth} /> */}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
