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
import { UserRole } from "@/graphql/api";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
  phone: string;
  street: string;
  city: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  agreeTerms?: string;
  phone?: string;
  street?: string;
  city?: string;
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
    phone: "",
    street: "",
    city: "",
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

    // Phone validation
    if (formData.phone && !/^[+\d\s()-]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Address validation - making these optional but validating if entered
    if (formData.street && formData.street.length > 100) {
      newErrors.street = "Street address is too long";
    }

    if (formData.city && formData.city.length > 50) {
      newErrors.city = "City name is too long";
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
        role: UserRole.Customer,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
        },
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

              <FormInput
                id="register-phone"
                name="phone"
                type="tel"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                error={errors.phone}
                autoComplete="tel"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C17.44 21.96 15.01 21.32 12.86 20.13C10.8554 19.0452 9.08435 17.5543 7.68 15.75C6.47937 14.3371 5.60973 12.6567 5.14 10.85C4.99436 10.22 4.92669 9.57534 4.94 8.93C4.94 8.38009 5.15061 7.85093 5.52568 7.47586C5.90076 7.10078 6.42992 6.89017 6.98 6.89H9.98C10.4353 6.88916 10.8762 7.05027 11.2299 7.34676C11.5837 7.64325 11.8299 8.05786 11.93 8.51C12.07 9.23 12.31 9.93 12.62 10.58C12.7887 10.9041 12.8593 11.2681 12.8214 11.6297C12.7835 11.9913 12.6388 12.3314 12.41 12.61L11.39 13.63C12.6767 15.6791 14.4409 17.3278 16.57 18.46L17.58 17.46C17.8614 17.2288 18.2058 17.0818 18.5712 17.0422C18.9366 17.0025 19.3043 17.0728 19.63 17.24C20.28 17.55 20.98 17.79 21.7 17.93C22.1608 18.0305 22.5822 18.2803 22.8808 18.6397C23.1794 18.9991 23.3402 19.4455 23.34 19.91L22 16.92Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              <FormInput
                id="register-street"
                name="street"
                type="text"
                label="Street Address"
                value={formData.street}
                onChange={handleChange}
                placeholder="Your street address"
                error={errors.street}
                autoComplete="street-address"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 22V12H15V22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              />

              <FormInput
                id="register-city"
                name="city"
                type="text"
                label="City"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                error={errors.city}
                autoComplete="address-level2"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12H22"
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
