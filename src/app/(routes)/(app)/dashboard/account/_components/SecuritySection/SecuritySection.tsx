"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  Key,
  AlertCircle,
  Check,
  X,
  CheckCircle,
} from "lucide-react";
import styles from "./SecuritySection.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

const SecuritySection: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const passwordRequirements = [
    { met: passwords.new.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(passwords.new), text: "One uppercase letter" },
    { met: /[a-z]/.test(passwords.new), text: "One lowercase letter" },
    { met: /[0-9]/.test(passwords.new), text: "One number" },
    { met: /[^A-Za-z0-9]/.test(passwords.new), text: "One special character" },
  ];

  const passwordsMatch =
    passwords.new === passwords.confirm && passwords.new !== "";

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = () => {
    // Handle password update logic
    console.log("Password update");
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div className={styles.securitySection}>
      {/* Password Section */}
      <div className={styles.securitySection__card}>
        <div className={styles.securitySection__cardHeader}>
          <div className={styles.securitySection__cardIcon}>
            <Lock />
          </div>
          <div>
            <h3 className={styles.securitySection__cardTitle}>
              Change Password
            </h3>
            <p className={styles.securitySection__cardSubtitle}>
              Update your password regularly to keep your account secure
            </p>
          </div>
        </div>

        <div className={styles.securitySection__passwordForm}>
          {/* Current Password */}
          <div className={styles.securitySection__formGroup}>
            <label className={styles.securitySection__label}>
              Current Password
            </label>
            <div className={styles.securitySection__inputWrapper}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className={styles.securitySection__input}
                placeholder="Enter current password"
              />
              <button
                type="button"
                className={styles.securitySection__togglePassword}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className={styles.securitySection__formGroup}>
            <label className={styles.securitySection__label}>
              New Password
            </label>
            <div className={styles.securitySection__inputWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                className={styles.securitySection__input}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className={styles.securitySection__togglePassword}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          {passwords.new && (
            <motion.div
              className={styles.securitySection__requirements}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {passwordRequirements.map((req, index) => (
                <div
                  key={index}
                  className={`${styles.securitySection__requirement} ${
                    req.met ? styles["securitySection__requirement--met"] : ""
                  }`}
                >
                  {req.met ? (
                    <CheckCircle size={14} />
                  ) : (
                    <AlertCircle size={14} />
                  )}
                  <span>{req.text}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Confirm Password */}
          <div className={styles.securitySection__formGroup}>
            <label className={styles.securitySection__label}>
              Confirm New Password
            </label>
            <div className={styles.securitySection__inputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className={`${styles.securitySection__input} ${
                  passwords.confirm && !passwordsMatch
                    ? styles["securitySection__input--error"]
                    : ""
                }`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className={styles.securitySection__togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwords.confirm && !passwordsMatch && (
              <span className={styles.securitySection__error}>
                Passwords do not match
              </span>
            )}
          </div>

          <FnButton
            variant="primary"
            onClick={handlePasswordUpdate}
            disabled={
              !passwords.current ||
              !passwordsMatch ||
              !passwordRequirements.every((req) => req.met)
            }
          >
            Update Password
          </FnButton>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className={styles.securitySection__card}>
        <div className={styles.securitySection__cardHeader}>
          <div className={styles.securitySection__cardIcon}>
            <Shield />
          </div>
          <div>
            <h3 className={styles.securitySection__cardTitle}>
              Two-Factor Authentication
            </h3>
            <p className={styles.securitySection__cardSubtitle}>
              Add an extra layer of security to your account
            </p>
          </div>
        </div>

        <div className={styles.securitySection__twoFactor}>
          <div className={styles.securitySection__twoFactorInfo}>
            <Smartphone className={styles.securitySection__twoFactorIcon} />
            <div>
              <p className={styles.securitySection__twoFactorText}>
                Two-factor authentication is{" "}
                <strong>{twoFactorEnabled ? "enabled" : "disabled"}</strong>
              </p>
              <p className={styles.securitySection__twoFactorDescription}>
                {twoFactorEnabled
                  ? "Your account is protected with an additional security layer"
                  : "Enable 2FA to secure your account with SMS verification"}
              </p>
            </div>
          </div>
          <FnButton
            variant={twoFactorEnabled ? "secondary" : "primary"}
            onClick={handleToggle2FA}
          >
            {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
          </FnButton>
        </div>
      </div>

      {/* Active Sessions */}
      <div className={styles.securitySection__card}>
        <div className={styles.securitySection__cardHeader}>
          <div className={styles.securitySection__cardIcon}>
            <Key />
          </div>
          <div>
            <h3 className={styles.securitySection__cardTitle}>
              Active Sessions
            </h3>
            <p className={styles.securitySection__cardSubtitle}>
              Manage your active login sessions
            </p>
          </div>
        </div>

        <div className={styles.securitySection__sessions}>
          <div className={styles.securitySection__session}>
            <div className={styles.securitySection__sessionInfo}>
              <div className={styles.securitySection__sessionDevice}>
                <Smartphone size={20} />
                <div>
                  <p className={styles.securitySection__sessionName}>
                    Chrome on Windows
                  </p>
                  <p className={styles.securitySection__sessionDetails}>
                    Lagos, Nigeria • Current session
                  </p>
                </div>
              </div>
              <span className={styles.securitySection__sessionBadge}>
                Active now
              </span>
            </div>
          </div>

          <div className={styles.securitySection__session}>
            <div className={styles.securitySection__sessionInfo}>
              <div className={styles.securitySection__sessionDevice}>
                <Smartphone size={20} />
                <div>
                  <p className={styles.securitySection__sessionName}>
                    Mobile App - iPhone
                  </p>
                  <p className={styles.securitySection__sessionDetails}>
                    Lagos, Nigeria • Last active 2 hours ago
                  </p>
                </div>
              </div>
              <button className={styles.securitySection__sessionRevoke}>
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
