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

  return (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__settings-card"]}>
          <div className={styles["dashboard-page__settings-avatar-row"]}>
            <div className={styles["dashboard-page__settings-avatar"]}>
              {(me?.firstName?.[0] ?? me?.email?.[0] ?? "?").toUpperCase()}
            </div>
            <div className={styles["dashboard-page__settings-info"]}>
              <h3 className={styles["dashboard-page__settings-name"]}>
                {me ? `${me.firstName} ${me.lastName}`.trim() || "User" : "—"}
              </h3>
              <p className={styles["dashboard-page__settings-email"]}>
                {me?.email ?? "—"}
              </p>
              <button
                type="button"
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                onClick={() => onToast?.("Avatar upload not available")}
              >
                <Edit3 size={16} /> Change Picture
              </button>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className={styles["dashboard-page__settings-grid"]}>
              <div className={styles["dashboard-page__settings-field"]}>
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles["dashboard-page__settings-field"]}>
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className={`${styles["dashboard-page__settings-field"]} ${styles["dashboard-page__settings-field--full"]}`}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={styles["dashboard-page__settings-actions"]}>
              <button
                type="submit"
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]}`}
                disabled={profileSaving}
              >
                {profileSaving ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]}`}
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
