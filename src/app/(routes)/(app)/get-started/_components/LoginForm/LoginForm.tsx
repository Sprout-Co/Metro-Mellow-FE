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
          <h1 className={styles.loginForm__title}>Welcome Back</h1>
          <p className={styles.loginForm__subtitle}>
            Sign in to continue to Metromellow
          </p>

          {/* <SocialAuth onSocialAuth={handleSocialAuth} /> */}

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
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              error={errors.email}
              autoComplete="email"
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 6L12 13L2 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />

            <div className={styles.loginForm__passwordGroup}>
              <FormInput
                id="login-password"
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                required
                error={errors.password}
                autoComplete="current-password"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              <Link
                href="/get-started/forgot-password"
                className={styles.loginForm__forgotPassword}
              >
                Forgot Password?
              </Link>
            </div>

            <div className={styles.loginForm__checkGroup}>
              <label className={styles.loginForm__checkbox}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className={styles.loginForm__checkmark}></span>
                <span>Remember me</span>
              </label>
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
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className={styles.loginForm__switch}>
            Don't have an account?
            <button
              type="button"
              className={styles.loginForm__switchLink}
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
