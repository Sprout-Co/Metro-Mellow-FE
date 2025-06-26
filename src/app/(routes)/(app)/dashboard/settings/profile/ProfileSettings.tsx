"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsLayout from "../SettingsLayout";
import styles from "./ProfileSettings.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux";
import { UpdateUserInput } from "@/graphql/api";

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleUpdateProfile, handleGetCurrentUser } = useAuthOperations();
  const currentUser = useAppSelector(selectUser);
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState<UpdateUserInput>({
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "Lagos",
      zipCode: "",
      country: "Nigeria",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await handleGetCurrentUser();
        if (userData) {
          setEmail(userData.email || "");
          setFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            phone: userData.phone || "",
            address: {
              street: userData.address?.street || "",
              city: userData.address?.city || "",
              state: userData.address?.state || "",
              zipCode: userData.address?.zipCode || "",
              country: userData.address?.country || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFormError("Failed to load profile data");
      }
    };

    fetchUserData();
  }, [handleGetCurrentUser]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UpdateUserInput] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      const updateData = {
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        phone: formData.phone || undefined,
        address: formData.address
          ? {
              street: formData.address.street || "",
              city: formData.address.city || "",
              state: formData.address.state || "",
              zipCode: formData.address.zipCode || "",
              country: formData.address.country || "",
            }
          : undefined,
      } as {
        firstName?: string;
        lastName?: string;
        phone?: string;
        address?: {
          street: string;
          city: string;
          state: string;
          zipCode: string;
          country: string;
        };
      };

      await handleUpdateProfile(updateData);
      setIsEditing(false);
      setFormSuccess(true);

      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setFormError(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const countries = [
    { value: "Nigeria", label: "Nigeria" },
    { value: "United States", label: "United States" },
    { value: "Canada", label: "Canada" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
    { value: "France", label: "France" },
    { value: "Japan", label: "Japan" },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const showUserInitials = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName[0]}${formData.lastName[0]}`;
    }
    return "U";
  };

  return (
    <SettingsLayout
      title="Profile Settings"
      subtitle="Manage your personal information and profile"
    >
      <div className={styles.profileSettings}>
        <div className={styles.profileSettings__main}>
          <div className={styles.profileSettings__header}>
            <div className={styles.profileSettings__profileHeader}>
              <div className={styles.profileSettings__avatar}>
                <div className={styles.profileSettings__avatarPlaceholder}>
                  {showUserInitials()}
                </div>
                {isEditing && (
                  <label className={styles.profileSettings__avatarEdit}>
                    <input
                      type="file"
                      accept="image/*"
                      className={styles.profileSettings__avatarInput}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                  </label>
                )}
              </div>

              <div className={styles.profileSettings__profileInfo}>
                <h2 className={styles.profileSettings__profileName}>
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className={styles.profileSettings__profileEmail}>{email}</p>
              </div>

              <button
                className={styles.profileSettings__editBtn}
                onClick={() => setIsEditing(!isEditing)}
                disabled={isLoading}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          <div className={styles.profileSettings__content}>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className={styles.profileSettings__form}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {formError && (
                    <div className={styles.profileSettings__errorMessage}>
                      {formError}
                    </div>
                  )}

                  <div className={styles.profileSettings__formSection}>
                    <h3 className={styles.profileSettings__formSectionTitle}>
                      Personal Information
                    </h3>
                    <div className={styles.profileSettings__formGrid}>
                      <div className={styles.profileSettings__formGroup}>
                        <label
                          htmlFor="firstName"
                          className={styles.profileSettings__formLabel}
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName || ""}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className={styles.profileSettings__formGroup}>
                        <label
                          htmlFor="lastName"
                          className={styles.profileSettings__formLabel}
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName || ""}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className={styles.profileSettings__formGroup}>
                      <label
                        htmlFor="email"
                        className={styles.profileSettings__formLabel}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        className={styles.profileSettings__formInput}
                        disabled
                      />
                    </div>

                    <div className={styles.profileSettings__formGroup}>
                      <label
                        htmlFor="phone"
                        className={styles.profileSettings__formLabel}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        className={styles.profileSettings__formInput}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className={styles.profileSettings__formSection}>
                    <h3 className={styles.profileSettings__formSectionTitle}>
                      Address
                    </h3>
                    <div className={styles.profileSettings__formGroup}>
                      <label
                        htmlFor="street"
                        className={styles.profileSettings__formLabel}
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="address.street"
                        value={formData.address?.street || ""}
                        onChange={handleChange}
                        className={styles.profileSettings__formInput}
                        disabled={isLoading}
                      />
                    </div>

                    <div className={styles.profileSettings__formGrid}>
                      <div className={styles.profileSettings__formGroup}>
                        <label
                          htmlFor="city"
                          className={styles.profileSettings__formLabel}
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="address.city"
                          value={formData.address?.city || ""}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
                          disabled={isLoading}
                        />
                      </div>

                      <div className={styles.profileSettings__formGroup}>
                        <label
                          htmlFor="state"
                          className={styles.profileSettings__formLabel}
                        >
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="address.state"
                          value={formData.address?.state || ""}
                          className={styles.profileSettings__formInput}
                          disabled
                          readOnly
                        />
                      </div>
                    </div>

                    <div className={styles.profileSettings__formGrid}>
                      <div className={styles.profileSettings__formGroup}>
                        <label
                          htmlFor="zipCode"
                          className={styles.profileSettings__formLabel}
                        >
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="address.zipCode"
                          value={formData.address?.zipCode || ""}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
                          disabled={isLoading}
                        />
                      </div>

                      <div className={styles.profileSettings__formGroup}>
                        <label
                          htmlFor="country"
                          className={styles.profileSettings__formLabel}
                        >
                          Country
                        </label>
                        <select
                          id="country"
                          name="address.country"
                          value={formData.address?.country || ""}
                          className={styles.profileSettings__formSelect}
                          disabled
                        >
                          {countries.map((country) => (
                            <option key={country.value} value={country.value}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={styles.profileSettings__formActions}>
                    <button
                      type="button"
                      className={styles.profileSettings__cancelBtn}
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={styles.profileSettings__submitBtn}
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="info"
                  className={styles.profileSettings__info}
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className={styles.profileSettings__infoSection}>
                    <h3 className={styles.profileSettings__infoSectionTitle}>
                      Personal Information
                    </h3>
                    <div className={styles.profileSettings__infoGrid}>
                      <div className={styles.profileSettings__infoGroup}>
                        <h4 className={styles.profileSettings__infoLabel}>
                          Name
                        </h4>
                        <p className={styles.profileSettings__infoValue}>
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>

                      <div className={styles.profileSettings__infoGroup}>
                        <h4 className={styles.profileSettings__infoLabel}>
                          Email
                        </h4>
                        <p className={styles.profileSettings__infoValue}>
                          {email}
                        </p>
                      </div>

                      <div className={styles.profileSettings__infoGroup}>
                        <h4 className={styles.profileSettings__infoLabel}>
                          Phone
                        </h4>
                        <p className={styles.profileSettings__infoValue}>
                          {formData.phone || <em>Not provided</em>}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.profileSettings__infoSection}>
                    <h3 className={styles.profileSettings__infoSectionTitle}>
                      Address
                    </h3>
                    <div className={styles.profileSettings__infoAddress}>
                      {formData.address?.street ? (
                        <>
                          <p>{formData.address.street}</p>
                          <p>
                            {formData.address.city}, {formData.address.state}{" "}
                            {formData.address.zipCode}
                          </p>
                          <p>{formData.address.country}</p>
                        </>
                      ) : (
                        <p className={styles.profileSettings__infoValue}>
                          <em>No address provided</em>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {formSuccess && (
              <motion.div
                className={styles.profileSettings__successMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Profile updated successfully</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
}
