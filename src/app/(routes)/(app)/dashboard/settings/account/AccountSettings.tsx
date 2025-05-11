"use client";

import { useState } from "react";
import Icon from "../../_components/common/Icon";
import styles from "./AccountSettings.module.scss";

interface AccountFormData {
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
  };
}

export default function AccountSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AccountFormData>({
    language: "English",
    timezone: "America/New_York",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
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
    // TODO: Implement account settings update logic
    setIsEditing(false);
  };

  return (
    <div className={styles.accountSettings}>
      <div className={styles.accountSettings__header}>
        <h1 className={styles.accountSettings__title}>Account Settings</h1>
        <p className={styles.accountSettings__subtitle}>
          Manage your account preferences and privacy settings
        </p>
      </div>

      <div className={styles.accountSettings__content}>
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
            <form
              onSubmit={handleSubmit}
              className={styles.accountSettings__form}
            >
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
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
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
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>

              <h3 className={styles.accountSettings__formSubtitle}>
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

              <h3 className={styles.accountSettings__formSubtitle}>Privacy</h3>

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
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="connections">Connections Only</option>
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

              <div className={styles.accountSettings__formActions}>
                <button
                  type="submit"
                  className={styles.accountSettings__submitBtn}
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.accountSettings__info}>
              <div className={styles.accountSettings__infoGroup}>
                <h3 className={styles.accountSettings__infoLabel}>Language</h3>
                <p className={styles.accountSettings__infoValue}>
                  {formData.language}
                </p>
              </div>

              <div className={styles.accountSettings__infoGroup}>
                <h3 className={styles.accountSettings__infoLabel}>Timezone</h3>
                <p className={styles.accountSettings__infoValue}>
                  {formData.timezone}
                </p>
              </div>

              <div className={styles.accountSettings__infoGroup}>
                <h3 className={styles.accountSettings__infoLabel}>
                  Notifications
                </h3>
                <ul className={styles.accountSettings__infoList}>
                  <li>
                    <Icon name={formData.notifications.email ? "check" : "x"} />
                    Email Notifications
                  </li>
                  <li>
                    <Icon name={formData.notifications.push ? "check" : "x"} />
                    Push Notifications
                  </li>
                  <li>
                    <Icon name={formData.notifications.sms ? "check" : "x"} />
                    SMS Notifications
                  </li>
                </ul>
              </div>

              <div className={styles.accountSettings__infoGroup}>
                <h3 className={styles.accountSettings__infoLabel}>Privacy</h3>
                <ul className={styles.accountSettings__infoList}>
                  <li>
                    <span className={styles.accountSettings__infoLabel}>
                      Profile Visibility:
                    </span>
                    <span className={styles.accountSettings__infoValue}>
                      {formData.privacy.profileVisibility
                        .charAt(0)
                        .toUpperCase() +
                        formData.privacy.profileVisibility.slice(1)}
                    </span>
                  </li>
                  <li>
                    <Icon name={formData.privacy.showEmail ? "check" : "x"} />
                    Show Email Address
                  </li>
                  <li>
                    <Icon name={formData.privacy.showPhone ? "check" : "x"} />
                    Show Phone Number
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
