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
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import FormInput from "../FormInput";
import SocialAuth from "../SocialAuth";
import styles from "./RegisterForm.module.scss";
import layoutStyles from "../AuthLayout.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import VerificationForm from "../VerificationForm";
import { UserRole, useActiveServiceAreasQuery } from "@/graphql/api";
import { Button } from "@/components/ui/Button";

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

type FormStep = 1 | 2;

export default function RegisterForm({
  onSuccess,
  onLoginClick,
}: RegisterFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
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

  const validateStep = (step: FormStep): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      // Step 1: Basic account info
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

      // Terms validation
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = "You must agree to the Terms of Service";
      }
    } else if (step === 2) {
      // Step 2: Location and contact info
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    return validateStep(1) && validateStep(2);
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

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous general error
    setErrors({ ...errors, general: undefined });

    if (!validateStep(2)) {
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
              {currentStep === 1
                ? "Step 1 of 2: Basic Information"
                : "Step 2 of 2: Location & Contact"}
            </p>

            {/* Progress Indicator */}
            <div className={styles.registerForm__progress}>
              <div className={styles.registerForm__progressBar}>
                <div
                  className={styles.registerForm__progressFill}
                  style={{ width: `${(currentStep / 2) * 100}%` }}
                />
              </div>
              <div className={styles.registerForm__progressSteps}>
                <div
                  className={`${styles.registerForm__progressStep} ${
                    currentStep >= 1
                      ? styles["registerForm__progressStep--active"]
                      : ""
                  }`}
                >
                  {currentStep > 1 ? <CheckCircle size={20} /> : <span>1</span>}
                </div>
                <div
                  className={`${styles.registerForm__progressStep} ${
                    currentStep >= 2
                      ? styles["registerForm__progressStep--active"]
                      : ""
                  }`}
                >
                  <span>2</span>
                </div>
              </div>
            </div>

            {errors.general && (
              <div className={styles.registerForm__error}>
                <AlertCircle size={20} />
                {errors.general}
              </div>
            )}

            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <motion.form
                  key="step1"
                  onSubmit={handleNextStep}
                  noValidate
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
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
                        <Link
                          href="/terms"
                          className={styles.registerForm__link}
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy-policy"
                          className={styles.registerForm__link}
                        >
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

                  <Button
                    type="submit"
                    size="lg"
                    variant="primary"
                    disabled={loading}
                    fullWidth={true}
                  >
                    Next Step
                    <ArrowRight size={20} />
                  </Button>

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
                </motion.form>
              ) : (
                <motion.form
                  key="step2"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={layoutStyles.formInput}>
                    <label
                      htmlFor="register-serviceArea"
                      className={layoutStyles.formInput__label}
                    >
                      Service Area
                      <span className={layoutStyles.formInput__required}>
                        *
                      </span>
                    </label>
                    <div
                      className={`
                    ${layoutStyles.formInput__wrapper} 
                    ${
                      errors.serviceArea
                        ? layoutStyles["formInput__wrapper--error"]
                        : ""
                    }
                      `}
                    >
                      <div className={layoutStyles.formInput__icon}>
                        <MapPin size={20} />
                      </div>
                      <select
                        id="register-serviceArea"
                        name="serviceArea"
                        value={formData.serviceArea}
                        onChange={handleSelectChange}
                        className={layoutStyles.formInput__select}
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
                      <p className={layoutStyles.formInput__error}>
                        {errors.serviceArea}
                      </p>
                    )}
                  </div>

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

                  <div className={layoutStyles.formInput}>
                    <label
                      htmlFor="register-referralCode"
                      className={layoutStyles.formInput__label}
                    >
                      Referral Code (Optional)
                    </label>
                    <p className={styles.registerForm__referralHelper}>
                      Add your referral code to enjoy up to a 10% discount on
                      your next three orders!
                    </p>
                    <div
                      className={`
                    ${layoutStyles.formInput__wrapper} 
                    ${
                      errors.referralCode
                        ? layoutStyles["formInput__wrapper--error"]
                        : ""
                    }
                      `}
                    >
                      <div className={layoutStyles.formInput__icon}>
                        <Gift size={20} />
                      </div>
                      <input
                        id="register-referralCode"
                        name="referralCode"
                        type="text"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Enter referral code"
                        className={layoutStyles.formInput__input}
                        autoComplete="off"
                      />
                    </div>
                    {errors.referralCode && (
                      <p className={layoutStyles.formInput__error}>
                        {errors.referralCode}
                      </p>
                    )}
                  </div>

                  <div className={styles.registerForm__buttonGroup}>
                    <Button
                      type="button"
                      variant="white"
                      size="lg"
                      fullWidth={true}
                      onClick={handlePreviousStep}
                    >
                      <ArrowLeft size={20} />
                      Back
                    </Button>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                      fullWidth={true}
                    >
                      {loading ? (
                        <>
                          <div
                            className={styles.registerForm__buttonSpinner}
                          ></div>
                          Creating...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
