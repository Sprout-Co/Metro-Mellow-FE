"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./SecuritySettings.module.scss";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface TwoFactorState {
  enabled: boolean;
  method: "app" | "sms" | null;
  phone: string;
}

interface LoginActivityItem {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  date: string;
  current: boolean;
}

export default function SecuritySettings() {
  const [passwordFormData, setPasswordFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<
    Partial<PasswordFormData>
  >({});
  const [passwordFormSuccess, setPasswordFormSuccess] =
    useState<boolean>(false);

  const [twoFactor, setTwoFactor] = useState<TwoFactorState>({
    enabled: false,
    method: null,
    phone: "+1 (555) 123-4567",
  });
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState<boolean>(false);
  const [twoFactorCode, setTwoFactorCode] = useState<string>("");
  const [twoFactorError, setTwoFactorError] = useState<string>("");
  const [twoFactorSuccess, setTwoFactorSuccess] = useState<boolean>(false);

  const [loginActivity] = useState<LoginActivityItem[]>([
    {
      id: "session-1",
      device: "Chrome on MacOS",
      location: "Lagos, Nigeria",
      ipAddress: "192.168.1.1",
      date: "2024-04-10T14:32:00",
      current: true,
    },
    {
      id: "session-2",
      device: "Safari on iPhone",
      location: "Lagos, Nigeria",
      ipAddress: "192.168.1.2",
      date: "2024-04-08T09:15:00",
      current: false,
    },
    {
      id: "session-3",
      device: "Firefox on Windows",
      location: "Abuja, Nigeria",
      ipAddress: "192.168.1.3",
      date: "2024-04-05T16:45:00",
      current: false,
    },
  ]);

  // Handle password form change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData({
      ...passwordFormData,
      [name]: value,
    });
  };

  // Validate password form
  const validatePasswordForm = (): boolean => {
    const errors: Partial<PasswordFormData> = {};

    if (!passwordFormData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordFormData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordFormData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordFormData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (
      passwordFormData.newPassword !== passwordFormData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle password form submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validatePasswordForm()) {
      // Simulate API call
      setTimeout(() => {
        setPasswordFormSuccess(true);
        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          setPasswordFormSuccess(false);
        }, 3000);
      }, 1000);
    }
  };

  // Toggle two-factor setup
  const toggleTwoFactorSetup = () => {
    setShowTwoFactorSetup(!showTwoFactorSetup);
    setTwoFactorCode("");
    setTwoFactorError("");
  };

  // Handle two-factor method selection
  const handleTwoFactorMethodChange = (method: "app" | "sms") => {
    setTwoFactor({
      ...twoFactor,
      method,
    });
  };

  // Handle two-factor code input
  const handleTwoFactorCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Only allow numbers and limit to 6 digits
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setTwoFactorCode(value);
    setTwoFactorError("");
  };

  // Handle two-factor verification
  const handleTwoFactorVerify = () => {
    if (twoFactorCode.length !== 6) {
      setTwoFactorError("Please enter a valid 6-digit code");
      return;
    }

    // Simulate verification (in a real app, this would call an API)
    setTimeout(() => {
      if (twoFactorCode === "123456") {
        // Hardcoded for demo purposes
        setTwoFactor({
          ...twoFactor,
          enabled: true,
        });
        setTwoFactorSuccess(true);
        setShowTwoFactorSetup(false);

        setTimeout(() => {
          setTwoFactorSuccess(false);
        }, 3000);
      } else {
        setTwoFactorError("Invalid verification code. Please try again.");
      }
    }, 1000);
  };

  // Disable two-factor authentication
  const disableTwoFactor = () => {
    setTwoFactor({
      ...twoFactor,
      enabled: false,
      method: null,
    });
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className={styles.securitySettings}>
      <div className={styles.securitySettings__header}>
        <h1 className={styles.securitySettings__title}>Security Settings</h1>
        <p className={styles.securitySettings__subtitle}>
          Manage your account security and login preferences
        </p>
      </div>

      <div className={styles.securitySettings__content}>
        <motion.div
          className={styles.securitySettings__section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.securitySettings__sectionTitle}>
            Change Password
          </h2>
          <form
            className={styles.securitySettings__passwordForm}
            onSubmit={handlePasswordSubmit}
          >
            <div className={styles.securitySettings__formGroup}>
              <label
                htmlFor="currentPassword"
                className={styles.securitySettings__label}
              >
                Current Password
              </label>
              <div className={styles.securitySettings__inputWrapper}>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className={`${styles.securitySettings__input} ${
                    passwordErrors.currentPassword
                      ? styles.securitySettings__inputError
                      : ""
                  }`}
                  value={passwordFormData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter your current password"
                />
                {passwordErrors.currentPassword && (
                  <p className={styles.securitySettings__errorText}>
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.securitySettings__formGroup}>
              <label
                htmlFor="newPassword"
                className={styles.securitySettings__label}
              >
                New Password
              </label>
              <div className={styles.securitySettings__inputWrapper}>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className={`${styles.securitySettings__input} ${
                    passwordErrors.newPassword
                      ? styles.securitySettings__inputError
                      : ""
                  }`}
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Create a new password"
                />
                {passwordErrors.newPassword && (
                  <p className={styles.securitySettings__errorText}>
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>
              <p className={styles.securitySettings__hint}>
                Password must be at least 8 characters and include a mix of
                letters, numbers, and symbols
              </p>
            </div>

            <div className={styles.securitySettings__formGroup}>
              <label
                htmlFor="confirmPassword"
                className={styles.securitySettings__label}
              >
                Confirm New Password
              </label>
              <div className={styles.securitySettings__inputWrapper}>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`${styles.securitySettings__input} ${
                    passwordErrors.confirmPassword
                      ? styles.securitySettings__inputError
                      : ""
                  }`}
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm your new password"
                />
                {passwordErrors.confirmPassword && (
                  <p className={styles.securitySettings__errorText}>
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.securitySettings__formActions}>
              <button type="submit" className={styles.securitySettings__button}>
                Update Password
              </button>
            </div>

            {passwordFormSuccess && (
              <motion.div
                className={styles.securitySettings__successMessage}
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
                <span>Password updated successfully</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.div
          className={styles.securitySettings__section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className={styles.securitySettings__sectionTitle}>
            Two-Factor Authentication
          </h2>
          <div className={styles.securitySettings__twoFactorContainer}>
            <div className={styles.securitySettings__twoFactorStatus}>
              <div className={styles.securitySettings__twoFactorInfo}>
                <div className={styles.securitySettings__twoFactorIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div>
                  <h3 className={styles.securitySettings__twoFactorTitle}>
                    {twoFactor.enabled
                      ? "Two-Factor Authentication is enabled"
                      : "Two-Factor Authentication is disabled"}
                  </h3>
                  <p className={styles.securitySettings__twoFactorDescription}>
                    {twoFactor.enabled
                      ? `Your account is secured with two-factor authentication via ${
                          twoFactor.method === "app"
                            ? "authenticator app"
                            : "SMS"
                        }`
                      : "Add an extra layer of security by enabling two-factor authentication"}
                  </p>
                </div>
              </div>
              <button
                className={`${styles.securitySettings__button} ${
                  twoFactor.enabled
                    ? styles.securitySettings__buttonOutline
                    : ""
                }`}
                onClick={
                  twoFactor.enabled ? disableTwoFactor : toggleTwoFactorSetup
                }
              >
                {twoFactor.enabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>

            {showTwoFactorSetup && (
              <motion.div
                className={styles.securitySettings__twoFactorSetup}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className={styles.securitySettings__twoFactorMethods}>
                  <div
                    className={`${styles.securitySettings__twoFactorMethod} ${
                      twoFactor.method === "app"
                        ? styles.securitySettings__twoFactorMethodActive
                        : ""
                    }`}
                    onClick={() => handleTwoFactorMethodChange("app")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.securitySettings__twoFactorMethodIcon}
                    >
                      <rect
                        x="5"
                        y="2"
                        width="14"
                        height="20"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="12" y1="18" x2="12.01" y2="18"></line>
                    </svg>
                    <span>Authenticator App</span>
                  </div>
                  <div
                    className={`${styles.securitySettings__twoFactorMethod} ${
                      twoFactor.method === "sms"
                        ? styles.securitySettings__twoFactorMethodActive
                        : ""
                    }`}
                    onClick={() => handleTwoFactorMethodChange("sms")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.securitySettings__twoFactorMethodIcon}
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>SMS</span>
                  </div>
                </div>

                {twoFactor.method && (
                  <div
                    className={styles.securitySettings__twoFactorVerification}
                  >
                    {twoFactor.method === "app" ? (
                      <div className={styles.securitySettings__qrCodeContainer}>
                        <div className={styles.securitySettings__qrCode}>
                          {/* This would be a real QR code in a production app */}
                          <div
                            className={styles.securitySettings__mockQrCode}
                          ></div>
                        </div>
                        <div
                          className={
                            styles.securitySettings__qrCodeInstructions
                          }
                        >
                          <h4>Set up authenticator app</h4>
                          <ol>
                            <li>
                              Download an authenticator app like Google
                              Authenticator or Authy
                            </li>
                            <li>Scan this QR code with the app</li>
                            <li>Enter the 6-digit code from the app below</li>
                          </ol>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.securitySettings__smsVerification}>
                        <p>We'll send a verification code to:</p>
                        <div className={styles.securitySettings__phoneNumber}>
                          <span>{twoFactor.phone}</span>
                          <button
                            className={
                              styles.securitySettings__changePhoneButton
                            }
                          >
                            Change
                          </button>
                        </div>
                        <button
                          className={styles.securitySettings__sendCodeButton}
                          onClick={() => {
                            /* This would actually send the code in a real app */
                          }}
                        >
                          Send Code
                        </button>
                      </div>
                    )}

                    <div className={styles.securitySettings__verificationCode}>
                      <label htmlFor="verificationCode">
                        Enter verification code
                      </label>
                      <input
                        type="text"
                        id="verificationCode"
                        value={twoFactorCode}
                        onChange={handleTwoFactorCodeChange}
                        placeholder="6-digit code"
                        className={`${styles.securitySettings__codeInput} ${
                          twoFactorError
                            ? styles.securitySettings__inputError
                            : ""
                        }`}
                      />
                      {twoFactorError && (
                        <p className={styles.securitySettings__errorText}>
                          {twoFactorError}
                        </p>
                      )}
                    </div>

                    <div className={styles.securitySettings__twoFactorActions}>
                      <button
                        className={styles.securitySettings__buttonOutline}
                        onClick={toggleTwoFactorSetup}
                      >
                        Cancel
                      </button>
                      <button
                        className={styles.securitySettings__button}
                        onClick={handleTwoFactorVerify}
                        disabled={twoFactorCode.length !== 6}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {twoFactorSuccess && (
              <motion.div
                className={styles.securitySettings__successMessage}
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
                <span>Two-factor authentication enabled successfully</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.securitySettings__section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className={styles.securitySettings__sectionTitle}>
            Login Activity
          </h2>

          <div className={styles.securitySettings__loginActivityContainer}>
            <motion.div
              className={styles.securitySettings__loginActivityList}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {loginActivity.map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.securitySettings__activityItem}
                  variants={itemVariants}
                >
                  <div className={styles.securitySettings__activityInfo}>
                    <div
                      className={styles.securitySettings__activityDeviceIcon}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {item.device.includes("Chrome") ||
                        item.device.includes("Firefox") ? (
                          <>
                            <rect
                              x="2"
                              y="3"
                              width="20"
                              height="14"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                          </>
                        ) : (
                          <>
                            <rect
                              x="5"
                              y="2"
                              width="14"
                              height="20"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="12" y1="18" x2="12.01" y2="18"></line>
                          </>
                        )}
                      </svg>
                    </div>
                    <div>
                      <div className={styles.securitySettings__activityDevice}>
                        <h3>{item.device}</h3>
                        {item.current && (
                          <span
                            className={styles.securitySettings__currentSession}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <p className={styles.securitySettings__activityDetails}>
                        {item.location} • {item.ipAddress} •{" "}
                        {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                  {!item.current && (
                    <button
                      className={styles.securitySettings__terminateButton}
                    >
                      Terminate
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <div className={styles.securitySettings__loginActivityActions}>
              <button className={styles.securitySettings__buttonOutline}>
                Terminate All Other Sessions
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
