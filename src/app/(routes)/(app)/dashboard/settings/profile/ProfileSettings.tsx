"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsLayout from "../SettingsLayout";
import styles from "./ProfileSettings.module.scss";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  bio: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: null,
    bio: "Professional home service enthusiast with a passion for clean spaces and organized environments.",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ProfileFormData],
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      setFormSuccess(true);

      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    }, 500);
  };

  const countries = [
    { value: "United States", label: "United States" },
    { value: "Canada", label: "Canada" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
    { value: "Nigeria", label: "Nigeria" },
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
                <p className={styles.profileSettings__profileEmail}>
                  {formData.email}
                </p>
              </div>

              <button
                className={styles.profileSettings__editBtn}
                onClick={() => setIsEditing(!isEditing)}
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
                          value={formData.firstName}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
                          required
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
                          value={formData.lastName}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
                          required
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
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.profileSettings__formInput}
                        required
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
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.profileSettings__formInput}
                      />
                    </div>

                    <div className={styles.profileSettings__formGroup}>
                      <label
                        htmlFor="bio"
                        className={styles.profileSettings__formLabel}
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className={styles.profileSettings__formTextarea}
                        rows={4}
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
                        value={formData.address.street}
                        onChange={handleChange}
                        className={styles.profileSettings__formInput}
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
                          value={formData.address.city}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
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
                          value={formData.address.state}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
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
                          value={formData.address.zipCode}
                          onChange={handleChange}
                          className={styles.profileSettings__formInput}
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
                          value={formData.address.country}
                          onChange={handleChange as any}
                          className={styles.profileSettings__formSelect}
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
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={styles.profileSettings__submitBtn}
                    >
                      Save Changes
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
                          {formData.email}
                        </p>
                      </div>

                      <div className={styles.profileSettings__infoGroup}>
                        <h4 className={styles.profileSettings__infoLabel}>
                          Phone
                        </h4>
                        <p className={styles.profileSettings__infoValue}>
                          {formData.phone}
                        </p>
                      </div>
                    </div>

                    <div className={styles.profileSettings__infoGroup}>
                      <h4 className={styles.profileSettings__infoLabel}>Bio</h4>
                      <p className={styles.profileSettings__infoValue}>
                        {formData.bio || <em>No bio provided</em>}
                      </p>
                    </div>
                  </div>

                  <div className={styles.profileSettings__infoSection}>
                    <h3 className={styles.profileSettings__infoSectionTitle}>
                      Address
                    </h3>
                    <div className={styles.profileSettings__infoAddress}>
                      <p>{formData.address.street}</p>
                      <p>
                        {formData.address.city}, {formData.address.state}{" "}
                        {formData.address.zipCode}
                      </p>
                      <p>{formData.address.country}</p>
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
