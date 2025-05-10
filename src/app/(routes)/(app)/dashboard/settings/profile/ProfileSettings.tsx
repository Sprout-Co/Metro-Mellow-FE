"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Icon from "../../_components/common/Icon";
import styles from "./ProfileSettings.module.scss";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  return (
    <div className={styles.profileSettings}>
      <div className={styles.profileSettings__header}>
        <h1 className={styles.profileSettings__title}>Profile Settings</h1>
        <p className={styles.profileSettings__subtitle}>
          Manage your personal information and preferences
        </p>
      </div>

      <div className={styles.profileSettings__content}>
        <div className={styles.profileSettings__main}>
          <div className={styles.profileSettings__sectionHeader}>
            <h2 className={styles.profileSettings__sectionTitle}>
              Personal Information
            </h2>
            <button
              className={styles.profileSettings__editBtn}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className={styles.profileSettings__profile}>
            <div className={styles.profileSettings__profileHeader}>
              <div className={styles.profileSettings__avatar}>
                <div className={styles.profileSettings__avatarPlaceholder}>
                  {formData.firstName[0]}
                  {formData.lastName[0]}
                </div>
                {isEditing && (
                  <button className={styles.profileSettings__avatarEdit}>
                    <Icon name="camera" />
                  </button>
                )}
              </div>

              <div className={styles.profileSettings__profileInfo}>
                <h3 className={styles.profileSettings__profileName}>
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className={styles.profileSettings__profileEmail}>
                  {formData.email}
                </p>
              </div>
            </div>

            {isEditing ? (
              <form
                onSubmit={handleSubmit}
                className={styles.profileSettings__form}
              >
                <div className={styles.profileSettings__formRow}>
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

                <h3 className={styles.profileSettings__formSubtitle}>
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

                <div className={styles.profileSettings__formRow}>
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
                      State
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

                <div className={styles.profileSettings__formRow}>
                  <div className={styles.profileSettings__formGroup}>
                    <label
                      htmlFor="zipCode"
                      className={styles.profileSettings__formLabel}
                    >
                      ZIP Code
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
                    <input
                      type="text"
                      id="country"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      className={styles.profileSettings__formInput}
                    />
                  </div>
                </div>

                <div className={styles.profileSettings__formActions}>
                  <button
                    type="button"
                    className={styles.profileSettings__formCancel}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.profileSettings__formSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.profileSettings__profileDetails}>
                <div className={styles.profileSettings__profileSection}>
                  <h3 className={styles.profileSettings__profileSectionTitle}>
                    Contact Information
                  </h3>
                  <div className={styles.profileSettings__profileDetail}>
                    <span className={styles.profileSettings__profileLabel}>
                      Email:
                    </span>
                    <span className={styles.profileSettings__profileValue}>
                      {formData.email}
                    </span>
                  </div>
                  <div className={styles.profileSettings__profileDetail}>
                    <span className={styles.profileSettings__profileLabel}>
                      Phone:
                    </span>
                    <span className={styles.profileSettings__profileValue}>
                      {formData.phone}
                    </span>
                  </div>
                </div>

                <div className={styles.profileSettings__profileSection}>
                  <h3 className={styles.profileSettings__profileSectionTitle}>
                    Address
                  </h3>
                  <div className={styles.profileSettings__profileDetail}>
                    <span className={styles.profileSettings__profileLabel}>
                      Street:
                    </span>
                    <span className={styles.profileSettings__profileValue}>
                      {formData.address.street}
                    </span>
                  </div>
                  <div className={styles.profileSettings__profileDetail}>
                    <span className={styles.profileSettings__profileLabel}>
                      City:
                    </span>
                    <span className={styles.profileSettings__profileValue}>
                      {formData.address.city}
                    </span>
                  </div>
                  <div className={styles.profileSettings__profileDetail}>
                    <span className={styles.profileSettings__profileLabel}>
                      State:
                    </span>
                    <span className={styles.profileSettings__profileValue}>
                      {formData.address.state}
                    </span>
                  </div>
                  <div className={styles.profileSettings__profileDetail}>
                    <span className={styles.profileSettings__profileLabel}>
                      ZIP Code:
                    </span>
                    <span className={styles.profileSettings__profileValue}>
                      {formData.address.zipCode}
                    </span>
                  </div>
                  <div className={styles.profileSettings__profileDetail}>
                    <span className={styles.profileSettings__profileLabel}>
                      Country:
                    </span>
                    <span className={styles.profileSettings__profileValue}>
                      {formData.address.country}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
