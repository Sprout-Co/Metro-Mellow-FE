"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../_components/common/Icon";
import SettingsLayout from "../SettingsLayout";
import styles from "./AccountSettings.module.scss";

interface AccountFormData {
  language: string;
  timezone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    allowDataCollection: boolean;
  };
}

export default function AccountSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<AccountFormData>({
    language: "English",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      allowDataCollection: true,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof AccountFormData],
          [child]:
            type === "checkbox"
              ? (e.target as HTMLInputElement).checked
              : value,
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

  const languages = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Japanese", label: "Japanese" },
    { value: "Chinese", label: "Chinese (Simplified)" },
  ];

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  ];

  const dateFormats = [
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
    { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
  ];

  const privacyOptions = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "connections", label: "Connections Only" },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <SettingsLayout
      title="Account Settings"
      subtitle="Manage your account preferences and privacy settings"
    >
      <div className={styles.accountSettings}>
        <div className={styles.accountSettings__main}>
          <div className={styles.accountSettings__sectionHeader}>
            <h2 className={styles.accountSettings__sectionTitle}>
              Preferences
            </h2>
            <button
              className={styles.accountSettings__editBtn}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Settings"}
            </button>
          </div>

          {isEditing ? (
            <motion.form
              onSubmit={handleSubmit}
              className={styles.accountSettings__form}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.accountSettings__formSection}>
                <h3 className={styles.accountSettings__formSectionTitle}>
                  Regional Settings
                </h3>
                <div className={styles.accountSettings__formGroup}>
                  <label
                    htmlFor="language"
                    className={styles.accountSettings__formLabel}
                  >
                    Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className={styles.accountSettings__formSelect}
                  >
                    {languages.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.accountSettings__formGroup}>
                  <label
                    htmlFor="timezone"
                    className={styles.accountSettings__formLabel}
                  >
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className={styles.accountSettings__formSelect}
                  >
                    {timezones.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.accountSettings__formGroup}>
                  <label
                    htmlFor="dateFormat"
                    className={styles.accountSettings__formLabel}
                  >
                    Date Format
                  </label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={formData.dateFormat}
                    onChange={handleChange}
                    className={styles.accountSettings__formSelect}
                  >
                    {dateFormats.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.accountSettings__formSection}>
                <h3 className={styles.accountSettings__formSectionTitle}>
                  Notifications
                </h3>

                <div className={styles.accountSettings__formGroup}>
                  <label className={styles.accountSettings__checkboxLabel}>
                    <input
                      type="checkbox"
                      name="notifications.email"
                      checked={formData.notifications.email}
                      onChange={handleChange}
                      className={styles.accountSettings__checkbox}
                    />
                    Email Notifications
                  </label>
                </div>

                <div className={styles.accountSettings__formGroup}>
                  <label className={styles.accountSettings__checkboxLabel}>
                    <input
                      type="checkbox"
                      name="notifications.push"
                      checked={formData.notifications.push}
                      onChange={handleChange}
                      className={styles.accountSettings__checkbox}
                    />
                    Push Notifications
                  </label>
                </div>

                <div className={styles.accountSettings__formGroup}>
                  <label className={styles.accountSettings__checkboxLabel}>
                    <input
                      type="checkbox"
                      name="notifications.sms"
                      checked={formData.notifications.sms}
                      onChange={handleChange}
                      className={styles.accountSettings__checkbox}
                    />
                    SMS Notifications
                  </label>
                </div>
              </div>

              <div className={styles.accountSettings__formSection}>
                <h3 className={styles.accountSettings__formSectionTitle}>
                  Privacy
                </h3>

                <div className={styles.accountSettings__formGroup}>
                  <label
                    htmlFor="profileVisibility"
                    className={styles.accountSettings__formLabel}
                  >
                    Profile Visibility
                  </label>
                  <select
                    id="profileVisibility"
                    name="privacy.profileVisibility"
                    value={formData.privacy.profileVisibility}
                    onChange={handleChange}
                    className={styles.accountSettings__formSelect}
                  >
                    {privacyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.accountSettings__formGroup}>
                  <label className={styles.accountSettings__checkboxLabel}>
                    <input
                      type="checkbox"
                      name="privacy.showEmail"
                      checked={formData.privacy.showEmail}
                      onChange={handleChange}
                      className={styles.accountSettings__checkbox}
                    />
                    Show Email Address
                  </label>
                </div>

                <div className={styles.accountSettings__formGroup}>
                  <label className={styles.accountSettings__checkboxLabel}>
                    <input
                      type="checkbox"
                      name="privacy.showPhone"
                      checked={formData.privacy.showPhone}
                      onChange={handleChange}
                      className={styles.accountSettings__checkbox}
                    />
                    Show Phone Number
                  </label>
                </div>

                <div className={styles.accountSettings__formGroup}>
                  <label className={styles.accountSettings__checkboxLabel}>
                    <input
                      type="checkbox"
                      name="privacy.allowDataCollection"
                      checked={formData.privacy.allowDataCollection}
                      onChange={handleChange}
                      className={styles.accountSettings__checkbox}
                    />
                    Allow Anonymous Usage Data Collection
                  </label>
                  <p className={styles.accountSettings__checkboxDescription}>
                    Help us improve by allowing collection of anonymous usage
                    data
                  </p>
                </div>
              </div>

              <div className={styles.accountSettings__formActions}>
                <button
                  type="submit"
                  className={styles.accountSettings__submitBtn}
                >
                  Save Changes
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className={styles.accountSettings__info}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.accountSettings__infoSection}>
                <h3 className={styles.accountSettings__infoSectionTitle}>
                  Regional Settings
                </h3>
                <div className={styles.accountSettings__infoGrid}>
                  <div className={styles.accountSettings__infoGroup}>
                    <h4 className={styles.accountSettings__infoLabel}>
                      Language
                    </h4>
                    <p className={styles.accountSettings__infoValue}>
                      {formData.language}
                    </p>
                  </div>

                  <div className={styles.accountSettings__infoGroup}>
                    <h4 className={styles.accountSettings__infoLabel}>
                      Timezone
                    </h4>
                    <p className={styles.accountSettings__infoValue}>
                      {timezones.find((tz) => tz.value === formData.timezone)
                        ?.label || formData.timezone}
                    </p>
                  </div>

                  <div className={styles.accountSettings__infoGroup}>
                    <h4 className={styles.accountSettings__infoLabel}>
                      Date Format
                    </h4>
                    <p className={styles.accountSettings__infoValue}>
                      {formData.dateFormat}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.accountSettings__infoSection}>
                <h3 className={styles.accountSettings__infoSectionTitle}>
                  Notifications
                </h3>
                <ul className={styles.accountSettings__infoList}>
                  <li>
                    <Icon name={formData.notifications.email ? "check" : "x"} />
                    <span>Email Notifications</span>
                  </li>
                  <li>
                    <Icon name={formData.notifications.push ? "check" : "x"} />
                    <span>Push Notifications</span>
                  </li>
                  <li>
                    <Icon name={formData.notifications.sms ? "check" : "x"} />
                    <span>SMS Notifications</span>
                  </li>
                </ul>
              </div>

              <div className={styles.accountSettings__infoSection}>
                <h3 className={styles.accountSettings__infoSectionTitle}>
                  Privacy
                </h3>
                <div className={styles.accountSettings__infoGroup}>
                  <h4 className={styles.accountSettings__infoLabel}>
                    Profile Visibility
                  </h4>
                  <p className={styles.accountSettings__infoValue}>
                    {formData.privacy.profileVisibility
                      .charAt(0)
                      .toUpperCase() +
                      formData.privacy.profileVisibility.slice(1)}
                  </p>
                </div>
                <ul className={styles.accountSettings__infoList}>
                  <li>
                    <Icon name={formData.privacy.showEmail ? "check" : "x"} />
                    <span>Show Email Address</span>
                  </li>
                  <li>
                    <Icon name={formData.privacy.showPhone ? "check" : "x"} />
                    <span>Show Phone Number</span>
                  </li>
                  <li>
                    <Icon
                      name={
                        formData.privacy.allowDataCollection ? "check" : "x"
                      }
                    />
                    <span>Allow Anonymous Usage Data Collection</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {formSuccess && (
            <motion.div
              className={styles.accountSettings__successMessage}
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
              <span>Settings updated successfully</span>
            </motion.div>
          )}
        </div>
      </div>
    </SettingsLayout>
  );
}
