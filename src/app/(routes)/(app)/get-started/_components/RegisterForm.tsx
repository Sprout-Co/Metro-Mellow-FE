// components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FormInput from "./FormInput";
import SocialAuth from "./SocialAuth";
import styles from "./AuthLayout.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import VerificationForm from "./VerificationForm";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  agreeTerms?: string;
  general?: string;
}

interface RegisterFormProps {
  onSuccess: () => void;
  onLoginClick: () => void;
}

export default function RegisterForm({
  onSuccess,
  onLoginClick,
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormState>({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const { handleRegister } = useAuthOperations();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase and a number";
    }

    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms of Service";
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

    // Clear any previous general error
    setErrors({ ...errors, general: undefined });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Split name into firstName and lastName, duplicate if only one word
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName =
        nameParts.length > 1 ? nameParts.slice(1).join(" ") : firstName;

      // Call the register handler from useAuthOperations
      await handleRegister({
        email: formData.email,
        password: formData.password,
        firstName,
        lastName,
      });

      // Show verification form
      setShowVerification(true);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle different types of errors
      const err = error as Error;

      // Check for specific error messages
      if (err.message.includes("already exists")) {
        setErrors({
          ...errors,
          email: "This email is already registered",
        });
      } else if (err.message.includes("Invalid role")) {
        setErrors({
          ...errors,
          general: "Registration failed: Invalid role assigned",
        });
      } else if (err.message.includes("Unauthorized access")) {
        setErrors({
          ...errors,
          general: "Registration failed: Unauthorized access",
        });
      } else {
        // Display the actual error message from the GraphQL response
        setErrors({
          ...errors,
          general:
            err.message || "Registration failed. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: string) => {
    try {
      // In a real app, you would implement social auth logic here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate a successful registration
      onSuccess();
    } catch (error) {
      console.error(`${provider} registration error:`, error);
      setErrors({
        ...errors,
        general: `${provider} registration failed. Please try again.`,
      });
    }
  };

  const passwordStrength = (): {
    strength: "weak" | "medium" | "strong";
    percentage: number;
  } => {
    if (!formData.password) {
      return { strength: "weak", percentage: 0 };
    }

    let score = 0;

    // Length check
    if (formData.password.length >= 8) score += 1;
    if (formData.password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(formData.password)) score += 1;
    if (/[a-z]/.test(formData.password)) score += 1;
    if (/[0-9]/.test(formData.password)) score += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) score += 1;

    // Calculate percentage and strength
    const percentage = Math.min(100, Math.round((score / 6) * 100));

    let strength: "weak" | "medium" | "strong" = "weak";
    if (percentage >= 70) strength = "strong";
    else if (percentage >= 40) strength = "medium";

    return { strength, percentage };
  };

  const { strength, percentage } = passwordStrength();

  return (
    <div className={styles.registerForm}>
      <AnimatePresence mode="wait">
        {showVerification ? (
          <VerificationForm
            email={formData.email}
            onSuccess={onSuccess}
            onBack={() => setShowVerification(false)}
          />
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className={styles.registerForm__title}>Create Account</h1>
            <p className={styles.registerForm__subtitle}>
              Join Metromellow to get started
            </p>

            <SocialAuth onSocialAuth={handleSocialAuth} />

            <form onSubmit={handleSubmit} noValidate>
              {errors.general && (
                <div className={styles.registerForm__error}>
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
                id="register-name"
                name="name"
                type="text"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                error={errors.name}
                autoComplete="name"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              <FormInput
                id="register-email"
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

              <FormInput
                id="register-password"
                name="password"
                type="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                error={errors.password}
                autoComplete="new-password"
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

              {formData.password && (
                <div className={styles.registerForm__passwordStrength}>
                  <div className={styles.registerForm__passwordStrengthBar}>
                    <div
                      className={`
                        ${styles.registerForm__passwordStrengthIndicator} 
                        ${styles[`registerForm__passwordStrengthIndicator--${strength}`]}
                      `}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className={styles.registerForm__passwordStrengthText}>
                    Password strength:{" "}
                    <span
                      className={
                        styles[
                          `registerForm__passwordStrengthLabel--${strength}`
                        ]
                      }
                    >
                      {strength}
                    </span>
                  </div>
                </div>
              )}

              <div className={styles.registerForm__checkGroup}>
                <label className={styles.registerForm__checkbox}>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                  />
                  <span className={styles.registerForm__checkmark}></span>
                  <span>
                    I agree to the{" "}
                    <Link href="/terms" className={styles.registerForm__link}>
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className={styles.registerForm__link}>
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className={styles.registerForm__checkError}>
                    {errors.agreeTerms}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                className={styles.registerForm__button}
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <>
                    <div className={styles.registerForm__buttonSpinner}></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>

            <div className={styles.registerForm__switch}>
              Already have an account?
              <button
                type="button"
                className={styles.registerForm__switchLink}
                onClick={onLoginClick}
              >
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
