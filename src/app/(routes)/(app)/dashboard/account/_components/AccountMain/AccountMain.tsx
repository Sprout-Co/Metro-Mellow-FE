"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, MapPin, Shield, Bell, CreditCard, Settings } from "lucide-react";
import styles from "./AccountMain.module.scss";
import ProfileSection from "../ProfileSection/ProfileSection";
import DashboardHeader from "../../../_components/DashboardHeader/DashboardHeader";
import {
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} from "@/graphql/api";

export type TabType = "profile" | "security" | "notifications";

const AccountMain: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // GraphQL queries and mutations
  const {
    data: userData,
    loading: isLoadingUser,
    error: userError,
  } = useGetCurrentUserQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "security" as TabType, label: "Security", icon: Shield },
    { id: "notifications" as TabType, label: "Notifications", icon: Bell },
  ];

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (userError || !userData?.me) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className={styles.accountMain}>
      {/* Header Section */}
      <DashboardHeader
        title="My Account"
        subtitle="Manage your profile, security settings, and preferences"
        showUpcomingBanner={false}
      />
      {/* Main Content */}
      <div className={styles.accountMain__container}>
        {/* Content Area */}
        <div className={styles.accountMain__content}>
          <AnimatePresence mode="wait">
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileSection
                userData={userData.me}
                isEditing={isEditing}
                onEditToggle={() => setIsEditing(!isEditing)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AccountMain;
