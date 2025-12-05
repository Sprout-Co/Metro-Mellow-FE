"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Camera,
  Edit2,
  Save,
  X,
  Check,
  Loader2,
  Shield,
} from "lucide-react";
import styles from "./AccountMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
  UpdateUserInput,
} from "@/graphql/api";

const AccountMain: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    data: userData,
    loading: isLoadingUser,
    error: userError,
  } = useGetCurrentUserQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (userData?.me) {
      setFormData({
        firstName: userData.me.firstName || "",
        lastName: userData.me.lastName || "",
        email: userData.me.email || "",
        phone: userData.me.phone || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updateInput: UpdateUserInput = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      };

      await updateProfile({ variables: { input: updateInput } });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (userData?.me) {
      setFormData({
        firstName: userData.me.firstName || "",
        lastName: userData.me.lastName || "",
        email: userData.me.email || "",
        phone: userData.me.phone || "",
      });
    }
    setProfileImage(null);
    setIsEditing(false);
  };

  if (isLoadingUser) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <Loader2 size={32} className={styles.loading__spinner} />
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (userError || !userData?.me) {
    return (
      <div className={styles.page}>
        <div className={styles.error}>
          <p>Unable to load profile data</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.header__text}>
          <h1 className={styles.header__title}>My Account</h1>
          <p className={styles.header__subtitle}>
            Manage your personal information
          </p>
        </div>
        {!isEditing ? (
          <FnButton
            variant="primary"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 size={16} />
            Edit Profile
          </FnButton>
        ) : (
          <div className={styles.header__actions}>
            <FnButton
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X size={16} />
              Cancel
            </FnButton>
            <FnButton
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className={styles.spinner} />
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <Check size={16} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save
                </>
              )}
            </FnButton>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <motion.div
        className={styles.profile}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.profile__avatar}>
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className={styles.profile__image}
            />
          ) : (
            <div className={styles.profile__placeholder}>
              <User size={32} />
            </div>
          )}
          {isEditing && (
            <label className={styles.profile__upload}>
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          )}
        </div>
        <div className={styles.profile__info}>
          <h2 className={styles.profile__name}>
            {formData.firstName} {formData.lastName}
          </h2>
          <p className={styles.profile__email}>{formData.email}</p>
          {userData.me.emailVerified && (
            <span className={styles.profile__verified}>
              <Shield size={12} />
              Verified
            </span>
          )}
        </div>
      </motion.div>

      {/* Form Fields */}
      <div className={styles.form}>
        <div className={styles.form__row}>
          <div className={styles.field}>
            <label className={styles.field__label}>
              <User size={14} />
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`${styles.field__input} ${isEditing ? styles["field__input--editable"] : ""}`}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.field__label}>
              <User size={14} />
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`${styles.field__input} ${isEditing ? styles["field__input--editable"] : ""}`}
            />
          </div>
        </div>

        <div className={styles.form__row}>
          <div className={styles.field}>
            <label className={styles.field__label}>
              <Mail size={14} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className={styles.field__input}
            />
            <span className={styles.field__hint}>
              Email cannot be changed here
            </span>
          </div>

          <div className={styles.field}>
            <label className={styles.field__label}>
              <Phone size={14} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder={isEditing ? "Enter phone number" : "Not set"}
              className={`${styles.field__input} ${isEditing ? styles["field__input--editable"] : ""}`}
            />
          </div>
        </div>
      </div>

      {/* Info Notice */}
      {!isEditing && userData.me.emailVerified && (
        <div className={styles.notice}>
          <Shield size={16} />
          <span>
            Your account is verified and secure. Click "Edit Profile" to update
            your information.
          </span>
        </div>
      )}
    </div>
  );
};

export default AccountMain;
