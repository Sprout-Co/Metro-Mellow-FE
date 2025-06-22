"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Icon from "../common/Icon";
import NotificationsMenu from "./NotificationsMenu";
import ProfileMenu from "./ProfileMenu";
import styles from "./DashboardHeader.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux";
import Link from "next/link";
import { Routes } from "@/constants/routes";

export default function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { handleGetCurrentUser } = useAuthOperations();
  const currentUser = useAppSelector(selectUser);

  // Fetch current user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await handleGetCurrentUser();
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [handleGetCurrentUser]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!currentUser?.firstName || !currentUser?.lastName) return "?";
    return `${currentUser.firstName[0]}${currentUser.lastName[0]}`;
  };

  // Get full name
  const getFullName = () => {
    if (!currentUser?.firstName || !currentUser?.lastName) return "User";
    return `${currentUser.firstName} ${currentUser.lastName}`;
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          {/* <Image 
            src="/images/brand/cover.png" 
            alt="Metro Mellow" 
            width={40} 
            height={40} 
          /> */}
          <span className={styles.header__logoText}>
            <Link href={Routes.DASHBOARD}>Metro Mellow</Link>
          </span>
        </div>

        {/* <div className={styles.header__search}>
          <Icon name="search" className={styles.header__searchIcon} />
          <input 
            type="text" 
            className={styles.header__searchInput} 
            placeholder="Search services, appointments..." 
          />
        </div> */}

        <div className={styles.header__actions}>
          <button
            className={styles.header__actionBtn}
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (showProfileMenu) setShowProfileMenu(false);
            }}
          >
            <div className={styles.header__notificationIndicator}></div>
            <Icon name="bell" />
          </button>

          <div className={styles.header__user}>
            <button
              className={styles.header__userBtn}
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                if (showNotifications) setShowNotifications(false);
              }}
            >
              <div className={styles.header__avatar}>
                <span>{getUserInitials()}</span>
              </div>
              <span className={styles.header__userName}>{getFullName()}</span>
              <Icon name="chevron-down" className={styles.header__userIcon} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`${styles.header__dropdown} ${styles["header__dropdown--notifications"]}`}
          >
            <NotificationsMenu onClose={() => setShowNotifications(false)} />
          </motion.div>
        )}

        {showProfileMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`${styles.header__dropdown} ${styles["header__dropdown--profile"]}`}
          >
            <ProfileMenu onClose={() => setShowProfileMenu(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
