// components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Phone,
  Home,
  Globe,
  AlertCircle,
  MapPin,
  Gift,
} from "lucide-react";
import FormInput from "./FormInput";
import SocialAuth from "./SocialAuth";
import styles from "./AuthLayout.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import VerificationForm from "./VerificationForm";
import { UserRole, useActiveServiceAreasQuery } from "@/graphql/api";

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
  phone: string;
  street: string;
  city: string;
  serviceArea: string;
  referralCode: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  agreeTerms?: string;
  phone?: string;
  street?: string;
  city?: string;
  serviceArea?: string;
  referralCode?: string;
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
    serviceArea: "",
    referralCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const { handleRegister } = useAuthOperations();
  const { data: serviceAreasData, loading: loadingServiceAreas } =
    useActiveServiceAreasQuery();

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
    }
    // else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    //   newErrors.password =
    //     "Password must include uppercase, lowercase and a number";
    // }

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

    // Service area validation
    if (!formData.serviceArea) {
      newErrors.serviceArea = "Service area is required";
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const selectedOption = e.target.options[e.target.selectedIndex];

    setFormData({
      ...formData,
      [name]: value,
      // If service area is selected, set city to the area name
      ...(name === "serviceArea" && value ? { city: selectedOption.text } : {}),
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
        referralCode: formData.referralCode || undefined,
        address: {
          street: formData.street,
          city: formData.city,
          serviceArea: formData.serviceArea,
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

            {/* <SocialAuth onSocialAuth={handleSocialAuth} /> */}

            <form onSubmit={handleSubmit} noValidate>
              {errors.general && (
                <div className={styles.registerForm__error}>
                  <AlertCircle size={20} />
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
                icon={<User size={20} />}
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
                icon={<Mail size={20} />}
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
                icon={<Lock size={20} />}
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
                icon={<Phone size={20} />}
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
                icon={<Home size={20} />}
              />

              {/* <FormInput
                id="register-city"
                name="city"
                type="text"
                label="City"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                error={errors.city}
                autoComplete="address-level2"
                icon={<Globe size={20} />}
              /> */}

              <div className={styles.formInput}>
                <label
                  htmlFor="register-serviceArea"
                  className={styles.formInput__label}
                >
                  Service Area
                  <span className={styles.formInput__required}>*</span>
                </label>
                <div
                  className={`
                    ${styles.formInput__wrapper} 
                    ${errors.serviceArea ? styles["formInput__wrapper--error"] : ""}
                  `}
                >
                  <div className={styles.formInput__icon}>
                    <MapPin size={20} />
                  </div>
                  <select
                    id="register-serviceArea"
                    name="serviceArea"
                    value={formData.serviceArea}
                    onChange={handleSelectChange}
                    className={styles.formInput__select}
                    required
                    disabled={loadingServiceAreas}
                  >
                    <option value="">Select service area...</option>
                    {serviceAreasData?.activeServiceAreas.map((area) => (
                      <option
                        key={area.id}
                        value={area.id}
                        data-city={area.city}
                      >
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.serviceArea && (
                  <p className={styles.formInput__error}>
                    {errors.serviceArea}
                  </p>
                )}
              </div>

              <div className={styles.formInput}>
                <label
                  htmlFor="register-referralCode"
                  className={styles.formInput__label}
                >
                  Referral Code (Optional)
                </label>
                <p className={styles.registerForm__referralHelper}>
                  Add your referral code to enjoy up to a 10% discount on your
                  next three orders!
                </p>
                <div
                  className={`
                    ${styles.formInput__wrapper} 
                    ${errors.referralCode ? styles["formInput__wrapper--error"] : ""}
                  `}
                >
                  <div className={styles.formInput__icon}>
                    <Gift size={20} />
                  </div>
                  <input
                    id="register-referralCode"
                    name="referralCode"
                    type="text"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="Enter referral code"
                    className={styles.formInput__input}
                    autoComplete="off"
                  />
                </div>
                {errors.referralCode && (
                  <p className={styles.formInput__error}>
                    {errors.referralCode}
                  </p>
                )}
              </div>

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
