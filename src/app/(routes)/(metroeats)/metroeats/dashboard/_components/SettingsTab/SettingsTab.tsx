"use client";

import React, { useState, useEffect } from "react";
import { Edit3 } from "lucide-react";
import { useGetCurrentUserQuery, useUpdateProfileMutation } from "@/graphql/api";
import styles from "../../dashboard.module.scss";

interface SettingsTabProps {
  onSaveSuccess?: () => void;
  onSaveError?: () => void;
  onCancel?: () => void;
  onToast?: (message: string) => void;
}

export default function SettingsTab({
  onSaveSuccess,
  onSaveError,
  onCancel,
  onToast,
}: SettingsTabProps) {
  const { data: userData, refetch: refetchUser } = useGetCurrentUserQuery();
  const [updateProfile, { loading: profileSaving }] = useUpdateProfileMutation();

  const me = userData?.me;
  const [firstName, setFirstName] = useState(me?.firstName ?? "");
  const [lastName, setLastName] = useState(me?.lastName ?? "");
  const [phone, setPhone] = useState(me?.phone ?? "");

  useEffect(() => {
    setFirstName(me?.firstName ?? "");
    setLastName(me?.lastName ?? "");
    setPhone(me?.phone ?? "");
  }, [me?.firstName, me?.lastName, me?.phone]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: {
          input: {
            firstName: firstName.trim() || undefined,
            lastName: lastName.trim() || undefined,
            phone: phone.trim() || undefined,
          },
        },
      });
      await refetchUser();
      onSaveSuccess?.();
    } catch {
      onSaveError?.();
    }
  };

  const initials = (me?.firstName?.[0] ?? me?.email?.[0] ?? "?").toUpperCase();

  return (
    <div className={styles.section}>
      <div className={styles.settingsCard}>
        <div className={styles.settingsAvatarRow}>
          <div className={styles.settingsAvatar}>{initials}</div>
          <div className={styles.settingsInfo}>
            <h3 className={styles.settingsName}>
              {me ? `${me.firstName ?? ""} ${me.lastName ?? ""}`.trim() || "User" : "---"}
            </h3>
            <p className={styles.settingsEmail}>{me?.email ?? "---"}</p>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
              onClick={() => onToast?.("Avatar upload not available")}
            >
              <Edit3 size={14} /> Change Picture
            </button>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className={styles.settingsGrid}>
            <div className={styles.settingsField}>
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.settingsField}>
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={`${styles.settingsField} ${styles.settingsFieldFull}`}>
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.settingsActions}>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={profileSaving}
            >
              {profileSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
