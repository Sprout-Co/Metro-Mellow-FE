"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Edit2,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Check,
  AlertCircle,
} from "lucide-react";
import styles from "./ProfileSection.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  profileImage: string | null;
}

interface ProfileSectionProps {
  userData: UserData;
  isEditing: boolean;
  onEditToggle: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  userData,
  isEditing,
  onEditToggle,
}) => {
  const [formData, setFormData] = useState(userData);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onEditToggle();
    }, 2000);
  };

  const handleCancel = () => {
    setFormData(userData);
    setProfileImage(null);
    onEditToggle();
  };

  return (
    <div className={styles.profileSection}>
      {/* Section Header */}
      <div className={styles.profileSection__header}>
        <h2 className={styles.profileSection__title}>Personal Information</h2>
        <div className={styles.profileSection__actions}>
          {!isEditing ? (
            <FnButton variant="primary" size="sm" onClick={onEditToggle}>
              <Edit2 size={16} />
              Edit Profile
            </FnButton>
          ) : (
            <>
              <FnButton
                variant="secondary"
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
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className={styles.profileSection__spinner} />
                  </motion.div>
                ) : saveSuccess ? (
                  <>
                    <Check size={16} />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </FnButton>
            </>
          )}
        </div>
      </div>

      {/* Profile Image Section */}
      <div className={styles.profileSection__imageSection}>
        <div className={styles.profileSection__imageContainer}>
          {profileImage || userData.profileImage ? (
            <img
              src={profileImage || userData.profileImage || ""}
              alt="Profile"
              className={styles.profileSection__image}
            />
          ) : (
            <div className={styles.profileSection__imagePlaceholder}>
              <User size={40} />
            </div>
          )}
          {isEditing && (
            <label className={styles.profileSection__imageUpload}>
              <Camera size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          )}
        </div>
        <div className={styles.profileSection__imageInfo}>
          <h3 className={styles.profileSection__imageName}>
            {formData.firstName} {formData.lastName}
          </h3>
          <p className={styles.profileSection__imageEmail}>{formData.email}</p>
          {isEditing && (
            <p className={styles.profileSection__imageHint}>
              Click camera icon to change photo
            </p>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className={styles.profileSection__form}>
        <div className={styles.profileSection__formGrid}>
          {/* First Name */}
          <div className={styles.profileSection__formGroup}>
            <label className={styles.profileSection__label}>
              <User size={16} />
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={styles.profileSection__input}
            />
          </div>

          {/* Last Name */}
          <div className={styles.profileSection__formGroup}>
            <label className={styles.profileSection__label}>
              <User size={16} />
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={styles.profileSection__input}
            />
          </div>

          {/* Email */}
          <div className={styles.profileSection__formGroup}>
            <label className={styles.profileSection__label}>
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={styles.profileSection__input}
            />
          </div>

          {/* Phone */}
          <div className={styles.profileSection__formGroup}>
            <label className={styles.profileSection__label}>
              <Phone size={16} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={styles.profileSection__input}
            />
          </div>

          {/* Date of Birth */}
          <div className={styles.profileSection__formGroup}>
            <label className={styles.profileSection__label}>
              <Calendar size={16} />
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={styles.profileSection__input}
            />
          </div>

          {/* Gender */}
          <div className={styles.profileSection__formGroup}>
            <label className={styles.profileSection__label}>
              <Globe size={16} />
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={styles.profileSection__input}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Address */}
          <div
            className={`${styles.profileSection__formGroup} ${styles["profileSection__formGroup--full"]}`}
          >
            <label className={styles.profileSection__label}>
              <MapPin size={16} />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={styles.profileSection__input}
            />
          </div>
        </div>
      </div>

      {/* Account Info */}
      {!isEditing && (
        <div className={styles.profileSection__info}>
          <div className={styles.profileSection__infoItem}>
            <AlertCircle size={16} />
            <span>
              Your email address is verified. You can change it anytime, but
              you'll need to verify the new address.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
