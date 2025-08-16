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
  Settings,
  Bell,
  Lock,
  Eye,
  Camera,
  Upload,
  Download,
  Activity,
  Smartphone,
  Globe,
  BarChart3,
  Zap,
} from "lucide-react";
import styles from "./PersonalInfoMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import Input from "@/components/ui/Input/Input";

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
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'addresses' | 'notifications' | 'privacy'>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

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

  const getProfileCompletion = () => {
    let completion = 0;
    const totalFields = 6;
    
    if (mockUserData.firstName && mockUserData.lastName) completion++;
    if (mockUserData.email && mockUserData.emailVerified) completion++;
    if (mockUserData.phone) completion++;
    if (profilePicture) completion++;
    if (mockAddresses.length > 0) completion++;
    if (mockUserData.accountStatus === 'ACTIVE') completion++;
    
    return Math.round((completion / totalFields) * 100);
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'security' as const, label: 'Security', icon: Lock },
    { id: 'addresses' as const, label: 'Addresses', icon: MapPin },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'privacy' as const, label: 'Privacy', icon: Settings },
  ];

  return (
    <div className={styles.personalInfoMain}>
      {/* Header Section */}
      <div className={styles.personalInfoMain__header}>
        <div className={styles.personalInfoMain__headerContent}>
          <h1 className={styles.personalInfoMain__title}>Account Settings</h1>
          <p className={styles.personalInfoMain__subtitle}>
            Manage your account details, security, and preferences
          </p>
        </div>
        <div className={styles.personalInfoMain__headerActions}>
          <div className={styles.personalInfoMain__profileCompletion}>
            <div className={styles.personalInfoMain__progressRing}>
              <svg className={styles.personalInfoMain__progressSvg} width="60" height="60">
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="30"
                  cy="30"
                  r="25"
                  stroke="#075056"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 25}`}
                  strokeDashoffset={`${2 * Math.PI * 25 * (1 - getProfileCompletion() / 100)}`}
                  className={styles.personalInfoMain__progressCircle}
                />
              </svg>
              <span className={styles.personalInfoMain__progressText}>{getProfileCompletion()}%</span>
            </div>
            <div className={styles.personalInfoMain__progressLabel}>
              <span>Profile Complete</span>
            </div>
          </div>
          <FnButton variant="primary" size="md">
            <Zap size={18} />
            Quick Setup
          </FnButton>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.personalInfoMain__navigation}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.personalInfoMain__navTab} ${
                activeTab === tab.id ? styles['personalInfoMain__navTab--active'] : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className={styles.personalInfoMain__content}>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <>
            {/* Profile Picture Section */}
            <motion.div
              className={styles.personalInfoMain__card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.personalInfoMain__cardHeader}>
                <div className={styles.personalInfoMain__cardTitle}>
                  <Camera className={styles.personalInfoMain__cardIcon} />
                  <h2>Profile Picture</h2>
                </div>
                {!isEditingProfile && (
                  <FnButton variant="secondary-outline" size="sm" onClick={handleEditProfile}>
                    <Edit size={16} />
                    Edit Profile
                  </FnButton>
                )}
              </div>

              <div className={styles.personalInfoMain__cardContent}>
                <div className={styles.personalInfoMain__avatarSection}>
                  <div className={styles.personalInfoMain__avatar}>
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className={styles.personalInfoMain__avatarImage} />
                    ) : (
                      <div className={styles.personalInfoMain__avatarPlaceholder}>
                        <User size={40} />
                      </div>
                    )}
                    <label className={styles.personalInfoMain__avatarUpload}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                        style={{ display: 'none' }}
                      />
                      <Camera size={16} />
                    </label>
                  </div>
                  <div className={styles.personalInfoMain__avatarInfo}>
                    <h3>Upload a new profile picture</h3>
                    <p>JPG, PNG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Profile Information Card */}
            <motion.div
              className={styles.personalInfoMain__card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={styles.personalInfoMain__cardHeader}>
                <div className={styles.personalInfoMain__cardTitle}>
                  <User className={styles.personalInfoMain__cardIcon} />
                  <h2>Personal Information</h2>
                </div>
                {getStatusBadge(mockUserData.accountStatus, mockUserData.emailVerified)}
              </div>

              <div className={styles.personalInfoMain__cardContent}>
                {isEditingProfile ? (
                  <div className={styles.personalInfoMain__editForm}>
                    <div className={styles.personalInfoMain__formRow}>
                      <Input
                        label="First Name"
                        defaultValue={mockUserData.firstName}
                        fullWidth
                        required
                      />
                      <Input
                        label="Last Name"
                        defaultValue={mockUserData.lastName}
                        fullWidth
                        required
                      />
                    </div>

                    <Input
                      label="Phone Number"
                      type="tel"
                      defaultValue={mockUserData.phone}
                      fullWidth
                      leftIcon={<Phone size={18} />}
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      defaultValue={mockUserData.email}
                      fullWidth
                      leftIcon={<Mail size={18} />}
                      helperText="Your email address is used for account notifications"
                    />

                    <div className={styles.personalInfoMain__formActions}>
                      <FnButton variant="secondary-outline" onClick={handleCancelEdit}>
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
          </>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <>
            {/* Password Security */}
            <motion.div
              className={styles.personalInfoMain__card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.personalInfoMain__cardHeader}>
                <div className={styles.personalInfoMain__cardTitle}>
                  <Lock className={styles.personalInfoMain__cardIcon} />
                  <h2>Password & Security</h2>
                </div>
              </div>

              <div className={styles.personalInfoMain__cardContent}>
                <div className={styles.personalInfoMain__securityGrid}>
                  <div className={styles.personalInfoMain__securityItem}>
                    <div className={styles.personalInfoMain__securityInfo}>
                      <h3>Password</h3>
                      <p>Last changed 3 months ago</p>
                    </div>
                    <FnButton variant="secondary-outline" size="sm">
                      Change Password
                    </FnButton>
                  </div>

                  <div className={styles.personalInfoMain__securityItem}>
                    <div className={styles.personalInfoMain__securityInfo}>
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <FnButton variant="primary-outline" size="sm">
                      <Shield size={16} />
                      Enable 2FA
                    </FnButton>
                  </div>

                  <div className={styles.personalInfoMain__securityItem}>
                    <div className={styles.personalInfoMain__securityInfo}>
                      <h3>Login Activity</h3>
                      <p>Monitor recent login attempts</p>
                    </div>
                    <FnButton variant="ghost" size="sm">
                      <Activity size={16} />
                      View Activity
                    </FnButton>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Active Sessions */}
            <motion.div
              className={styles.personalInfoMain__card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={styles.personalInfoMain__cardHeader}>
                <div className={styles.personalInfoMain__cardTitle}>
                  <Activity className={styles.personalInfoMain__cardIcon} />
                  <h2>Active Sessions</h2>
                </div>
              </div>

              <div className={styles.personalInfoMain__cardContent}>
                <div className={styles.personalInfoMain__sessionsList}>
                  <div className={styles.personalInfoMain__sessionItem}>
                    <div className={styles.personalInfoMain__sessionIcon}>
                      <Globe size={20} />
                    </div>
                    <div className={styles.personalInfoMain__sessionInfo}>
                      <h4>Chrome on Windows</h4>
                      <p>Lagos, Nigeria • Current session</p>
                      <span className={styles.personalInfoMain__sessionTime}>Active now</span>
                    </div>
                    <span className={styles.personalInfoMain__currentBadge}>Current</span>
                  </div>

                  <div className={styles.personalInfoMain__sessionItem}>
                    <div className={styles.personalInfoMain__sessionIcon}>
                      <Smartphone size={20} />
                    </div>
                    <div className={styles.personalInfoMain__sessionInfo}>
                      <h4>Safari on iPhone</h4>
                      <p>Lagos, Nigeria</p>
                      <span className={styles.personalInfoMain__sessionTime}>2 hours ago</span>
                    </div>
                    <FnButton variant="ghost" size="xs">
                      Sign Out
                    </FnButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <motion.div
            className={styles.personalInfoMain__card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.personalInfoMain__cardHeader}>
              <div className={styles.personalInfoMain__cardTitle}>
                <MapPin className={styles.personalInfoMain__cardIcon} />
                <h2>Saved Addresses</h2>
              </div>
              <FnButton variant="primary-outline" size="sm" onClick={handleAddAddress}>
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
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <>
            {/* Email Notifications */}
            <motion.div
              className={styles.personalInfoMain__card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.personalInfoMain__cardHeader}>
                <div className={styles.personalInfoMain__cardTitle}>
                  <Mail className={styles.personalInfoMain__cardIcon} />
                  <h2>Email Notifications</h2>
                </div>
              </div>

              <div className={styles.personalInfoMain__cardContent}>
                <div className={styles.personalInfoMain__notificationList}>
                  <div className={styles.personalInfoMain__notificationItem}>
                    <div className={styles.personalInfoMain__notificationInfo}>
                      <h3>Booking Updates</h3>
                      <p>Get notified about booking confirmations and status changes</p>
                    </div>
                    <label className={styles.personalInfoMain__toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.personalInfoMain__toggleSlider}></span>
                    </label>
                  </div>

                  <div className={styles.personalInfoMain__notificationItem}>
                    <div className={styles.personalInfoMain__notificationInfo}>
                      <h3>Marketing Communications</h3>
                      <p>Receive updates about new services and special offers</p>
                    </div>
                    <label className={styles.personalInfoMain__toggle}>
                      <input type="checkbox" />
                      <span className={styles.personalInfoMain__toggleSlider}></span>
                    </label>
                  </div>

                  <div className={styles.personalInfoMain__notificationItem}>
                    <div className={styles.personalInfoMain__notificationInfo}>
                      <h3>Account Security</h3>
                      <p>Important security alerts and login notifications</p>
                    </div>
                    <label className={styles.personalInfoMain__toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.personalInfoMain__toggleSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SMS Notifications */}
            <motion.div
              className={styles.personalInfoMain__card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={styles.personalInfoMain__cardHeader}>
                <div className={styles.personalInfoMain__cardTitle}>
                  <Smartphone className={styles.personalInfoMain__cardIcon} />
                  <h2>SMS Notifications</h2>
                </div>
              </div>

              <div className={styles.personalInfoMain__cardContent}>
                <div className={styles.personalInfoMain__notificationList}>
                  <div className={styles.personalInfoMain__notificationItem}>
                    <div className={styles.personalInfoMain__notificationInfo}>
                      <h3>Service Reminders</h3>
                      <p>Get SMS reminders before your scheduled services</p>
                    </div>
                    <label className={styles.personalInfoMain__toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.personalInfoMain__toggleSlider}></span>
                    </label>
                  </div>

                  <div className={styles.personalInfoMain__notificationItem}>
                    <div className={styles.personalInfoMain__notificationInfo}>
                      <h3>Emergency Alerts</h3>
                      <p>Urgent notifications about service changes or issues</p>
                    </div>
                    <label className={styles.personalInfoMain__toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.personalInfoMain__toggleSlider}></span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <>
            {/* Data & Privacy */}
            <motion.div
              className={styles.personalInfoMain__card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.personalInfoMain__cardHeader}>
                <div className={styles.personalInfoMain__cardTitle}>
                  <Shield className={styles.personalInfoMain__cardIcon} />
                  <h2>Data & Privacy</h2>
                </div>
              </div>

              <div className={styles.personalInfoMain__cardContent}>
                <div className={styles.personalInfoMain__privacyGrid}>
                  <div className={styles.personalInfoMain__privacyItem}>
                    <div className={styles.personalInfoMain__privacyInfo}>
                      <h3>Download Your Data</h3>
                      <p>Get a copy of all your account data</p>
                    </div>
                    <FnButton variant="secondary-outline" size="sm">
                      <Download size={16} />
                      Download
                    </FnButton>
                  </div>

                  <div className={styles.personalInfoMain__privacyItem}>
                    <div className={styles.personalInfoMain__privacyInfo}>
                      <h3>Account Visibility</h3>
                      <p>Control how your profile appears to others</p>
                    </div>
                    <FnButton variant="ghost" size="sm">
                      <Eye size={16} />
                      Manage
                    </FnButton>
                  </div>

                  <div className={styles.personalInfoMain__privacyItem}>
                    <div className={styles.personalInfoMain__privacyInfo}>
                      <h3>Delete Account</h3>
                      <p>Permanently delete your account and all data</p>
                    </div>
                    <FnButton variant="secondary-outline" size="sm">
                      Delete Account
                    </FnButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoMain;