"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  Home,
  Building,
  Trash2,
  Star,
} from "lucide-react";
import styles from "./PersonalInfoMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

// Mock data - will be replaced with real data later
const mockUserData = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+234 803 123 4567",
  role: "CUSTOMER",
  accountStatus: "ACTIVE",
  emailVerified: true,
  emailVerifiedAt: "2024-01-15T10:30:00Z",
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-08-10T14:22:00Z",
};

const mockAddresses = [
  {
    id: "1",
    label: "Home",
    street: "24 Emmanuel Osakwe Street",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    zipCode: "100001",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    street: "Victoria Island Business District",
    city: "Lagos",
    state: "Lagos", 
    country: "Nigeria",
    zipCode: "101001",
    isDefault: false,
  },
];

const PersonalInfoMain: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    console.log("Save profile changes");
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleAddAddress = () => {
    setIsAddingAddress(true);
  };

  const handleEditAddress = (addressId: string) => {
    setEditingAddress(addressId);
  };

  const handleDeleteAddress = (addressId: string) => {
    console.log("Delete address:", addressId);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    console.log("Set default address:", addressId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "CUSTOMER":
        return "Customer";
      case "STAFF":
        return "Staff Member";
      case "ADMIN":
        return "Administrator";
      case "SUPER_ADMIN":
        return "Super Administrator";
      default:
        return role;
    }
  };

  const getStatusBadge = (status: string, verified: boolean) => {
    if (status === "ACTIVE" && verified) {
      return (
        <div className={styles.personalInfoMain__statusBadge}>
          <CheckCircle className={styles.personalInfoMain__statusIcon} />
          <span>Verified Account</span>
        </div>
      );
    }
    return (
      <div className={`${styles.personalInfoMain__statusBadge} ${styles["personalInfoMain__statusBadge--warning"]}`}>
        <XCircle className={styles.personalInfoMain__statusIcon} />
        <span>Pending Verification</span>
      </div>
    );
  };

  return (
    <div className={styles.personalInfoMain}>
      {/* Header Section */}
      <div className={styles.personalInfoMain__header}>
        <div className={styles.personalInfoMain__headerContent}>
          <h1 className={styles.personalInfoMain__title}>Personal Information</h1>
          <p className={styles.personalInfoMain__subtitle}>
            Manage your account details and preferences
          </p>
        </div>
        <div className={styles.personalInfoMain__headerActions}>
          {!isEditingProfile && (
            <FnButton variant="white" size="md" onClick={handleEditProfile}>
              <Edit size={18} />
              Edit Profile
            </FnButton>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.personalInfoMain__content}>
        {/* Profile Information Card */}
        <motion.div
          className={styles.personalInfoMain__card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.personalInfoMain__cardHeader}>
            <div className={styles.personalInfoMain__cardTitle}>
              <User className={styles.personalInfoMain__cardIcon} />
              <h2>Profile Information</h2>
            </div>
            {getStatusBadge(mockUserData.accountStatus, mockUserData.emailVerified)}
          </div>

          <div className={styles.personalInfoMain__cardContent}>
            {isEditingProfile ? (
              <div className={styles.personalInfoMain__editForm}>
                <div className={styles.personalInfoMain__formRow}>
                  <div className={styles.personalInfoMain__formGroup}>
                    <label className={styles.personalInfoMain__formLabel}>First Name</label>
                    <input
                      type="text"
                      className={styles.personalInfoMain__formInput}
                      defaultValue={mockUserData.firstName}
                    />
                  </div>
                  <div className={styles.personalInfoMain__formGroup}>
                    <label className={styles.personalInfoMain__formLabel}>Last Name</label>
                    <input
                      type="text"
                      className={styles.personalInfoMain__formInput}
                      defaultValue={mockUserData.lastName}
                    />
                  </div>
                </div>

                <div className={styles.personalInfoMain__formGroup}>
                  <label className={styles.personalInfoMain__formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    className={styles.personalInfoMain__formInput}
                    defaultValue={mockUserData.phone}
                  />
                </div>

                <div className={styles.personalInfoMain__formActions}>
                  <FnButton variant="secondary" onClick={handleCancelEdit}>
                    Cancel
                  </FnButton>
                  <FnButton variant="primary" onClick={handleSaveProfile}>
                    Save Changes
                  </FnButton>
                </div>
              </div>
            ) : (
              <div className={styles.personalInfoMain__profileGrid}>
                <div className={styles.personalInfoMain__profileItem}>
                  <span className={styles.personalInfoMain__profileLabel}>Full Name</span>
                  <span className={styles.personalInfoMain__profileValue}>
                    {mockUserData.firstName} {mockUserData.lastName}
                  </span>
                </div>

                <div className={styles.personalInfoMain__profileItem}>
                  <Mail className={styles.personalInfoMain__profileIcon} />
                  <div>
                    <span className={styles.personalInfoMain__profileLabel}>Email Address</span>
                    <span className={styles.personalInfoMain__profileValue}>{mockUserData.email}</span>
                  </div>
                </div>

                <div className={styles.personalInfoMain__profileItem}>
                  <Phone className={styles.personalInfoMain__profileIcon} />
                  <div>
                    <span className={styles.personalInfoMain__profileLabel}>Phone Number</span>
                    <span className={styles.personalInfoMain__profileValue}>{mockUserData.phone}</span>
                  </div>
                </div>

                <div className={styles.personalInfoMain__profileItem}>
                  <Shield className={styles.personalInfoMain__profileIcon} />
                  <div>
                    <span className={styles.personalInfoMain__profileLabel}>Account Role</span>
                    <span className={styles.personalInfoMain__profileValue}>{getRoleDisplay(mockUserData.role)}</span>
                  </div>
                </div>

                <div className={styles.personalInfoMain__profileItem}>
                  <Calendar className={styles.personalInfoMain__profileIcon} />
                  <div>
                    <span className={styles.personalInfoMain__profileLabel}>Member Since</span>
                    <span className={styles.personalInfoMain__profileValue}>{formatDate(mockUserData.createdAt)}</span>
                  </div>
                </div>

                <div className={styles.personalInfoMain__profileItem}>
                  <Calendar className={styles.personalInfoMain__profileIcon} />
                  <div>
                    <span className={styles.personalInfoMain__profileLabel}>Last Updated</span>
                    <span className={styles.personalInfoMain__profileValue}>{formatDate(mockUserData.updatedAt)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Address Management Card */}
        <motion.div
          className={styles.personalInfoMain__card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className={styles.personalInfoMain__cardHeader}>
            <div className={styles.personalInfoMain__cardTitle}>
              <MapPin className={styles.personalInfoMain__cardIcon} />
              <h2>Saved Addresses</h2>
            </div>
            <FnButton variant="outline" size="sm" onClick={handleAddAddress}>
              <Plus size={16} />
              Add Address
            </FnButton>
          </div>

          <div className={styles.personalInfoMain__cardContent}>
            <div className={styles.personalInfoMain__addressList}>
              {mockAddresses.map((address) => (
                <motion.div
                  key={address.id}
                  className={`${styles.personalInfoMain__addressCard} ${
                    address.isDefault ? styles["personalInfoMain__addressCard--default"] : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.personalInfoMain__addressHeader}>
                    <div className={styles.personalInfoMain__addressLabel}>
                      {address.label === "Home" ? (
                        <Home className={styles.personalInfoMain__addressTypeIcon} />
                      ) : (
                        <Building className={styles.personalInfoMain__addressTypeIcon} />
                      )}
                      <span>{address.label}</span>
                      {address.isDefault && (
                        <div className={styles.personalInfoMain__defaultBadge}>
                          <Star size={12} />
                          Default
                        </div>
                      )}
                    </div>
                    <div className={styles.personalInfoMain__addressActions}>
                      <motion.button
                        className={styles.personalInfoMain__addressActionBtn}
                        onClick={() => handleEditAddress(address.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit size={14} />
                      </motion.button>
                      {!address.isDefault && (
                        <motion.button
                          className={styles.personalInfoMain__addressActionBtn}
                          onClick={() => handleDeleteAddress(address.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <div className={styles.personalInfoMain__addressDetails}>
                    <p className={styles.personalInfoMain__addressText}>
                      {address.street}
                    </p>
                    <p className={styles.personalInfoMain__addressText}>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className={styles.personalInfoMain__addressText}>
                      {address.country}
                    </p>
                  </div>

                  {!address.isDefault && (
                    <div className={styles.personalInfoMain__addressFooter}>
                      <motion.button
                        className={styles.personalInfoMain__setDefaultBtn}
                        onClick={() => handleSetDefaultAddress(address.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Set as Default
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {mockAddresses.length === 0 && (
              <div className={styles.personalInfoMain__emptyState}>
                <MapPin className={styles.personalInfoMain__emptyIcon} />
                <h3 className={styles.personalInfoMain__emptyTitle}>No addresses saved</h3>
                <p className={styles.personalInfoMain__emptyText}>
                  Add your first address to make booking services easier
                </p>
                <FnButton variant="primary" onClick={handleAddAddress}>
                  <Plus size={18} />
                  Add Your First Address
                </FnButton>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalInfoMain;