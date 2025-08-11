// src/app/(routes)/(app)/dashboard/_components/sidebar/Sidebar.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Sidebar.module.scss";
import {
  Home,
  CalendarDays,
  Repeat,
  CreditCard,
  Gift,
  User,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Heart,
  Bell,
  Settings,
  LogOut,
  List,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: 20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.sidebar__overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.sidebar}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            <div className={styles.sidebar__header}>
              <motion.h2
                className={styles.sidebar__title}
                variants={itemVariants}
              >
                Menu
              </motion.h2>
              <motion.button
                className={styles.sidebar__closeButton}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                &times;
              </motion.button>
            </div>

            <motion.div
              className={styles.sidebar__balanceCard}
              variants={itemVariants}
            >
              <div className={styles.sidebar__balanceInfo}>
                <span className={styles.sidebar__balanceLabel}>
                  Rewards Points
                </span>
                <span className={styles.sidebar__balanceAmount}>320</span>
              </div>
              <ChevronRight className={styles.sidebar__balanceIcon} />
            </motion.div>

            <nav className={styles.sidebar__nav}>
              <motion.ul
                className={styles.sidebar__navSection}
                variants={itemVariants}
              >
                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link href="/dashboard" className={styles.sidebar__navLink}>
                    <Home className={styles.sidebar__icon} />
                    <span>Home</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${pathname.includes("/dashboard/services") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/services"
                    className={styles.sidebar__navLink}
                  >
                    <List className={styles.sidebar__icon} />
                    <span>My Services</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${pathname.includes("/dashboard/bookings") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/bookings"
                    className={styles.sidebar__navLink}
                  >
                    <CalendarDays className={styles.sidebar__icon} />
                    <span>My Bookings</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${pathname.includes("/dashboard/support") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/support"
                    className={styles.sidebar__navLink}
                  >
                    <MessageSquare className={styles.sidebar__icon} />
                    <span>Support</span>
                  </Link>
                </motion.li>
              </motion.ul>

              <motion.div
                className={styles.sidebar__sectionTitle}
                variants={itemVariants}
              >
                My Account
              </motion.div>

              <motion.ul
                className={styles.sidebar__navSection}
                variants={itemVariants}
              >
                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/account") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/account"
                    className={styles.sidebar__navLink}
                  >
                    <User className={styles.sidebar__icon} />
                    <span>Personal Information</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/account/addresses") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/account/addresses"
                    className={styles.sidebar__navLink}
                  >
                    <MapPin className={styles.sidebar__icon} />
                    <span>Address Book</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/account/favorites") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/account/favorites"
                    className={styles.sidebar__navLink}
                  >
                    <Heart className={styles.sidebar__icon} />
                    <span>Favorite Services</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/subscriptions") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/subscriptions"
                    className={styles.sidebar__navLink}
                  >
                    <Repeat className={styles.sidebar__icon} />
                    <span>Subscriptions</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/payments") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/payments"
                    className={styles.sidebar__navLink}
                  >
                    <CreditCard className={styles.sidebar__icon} />
                    <span>Payment Methods</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/notifications") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/notifications"
                    className={styles.sidebar__navLink}
                  >
                    <Bell className={styles.sidebar__icon} />
                    <span>Notifications</span>
                  </Link>
                </motion.li>
              </motion.ul>

              <motion.div
                className={styles.sidebar__sectionTitle}
                variants={itemVariants}
              >
                Rewards & Referrals
              </motion.div>

              <motion.ul
                className={styles.sidebar__navSection}
                variants={itemVariants}
              >
                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/rewards") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/rewards"
                    className={styles.sidebar__navLink}
                  >
                    <Gift className={styles.sidebar__icon} />
                    <span>Loyalty Program</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/rewards/refer") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/rewards/refer"
                    className={styles.sidebar__navLink}
                  >
                    <User className={styles.sidebar__icon} />
                    <span>Refer a Friend</span>
                  </Link>
                </motion.li>
              </motion.ul>

              <motion.div
                className={styles.sidebar__sectionTitle}
                variants={itemVariants}
              >
                Support & Settings
              </motion.div>

              <motion.ul
                className={styles.sidebar__navSection}
                variants={itemVariants}
              >
                <motion.li
                  className={`${styles.sidebar__navItem} ${isActive("/dashboard/settings") ? styles["sidebar__navItem--active"] : ""}`}
                  variants={itemVariants}
                >
                  <Link
                    href="/dashboard/settings"
                    className={styles.sidebar__navLink}
                  >
                    <Settings className={styles.sidebar__icon} />
                    <span>Settings</span>
                  </Link>
                </motion.li>

                <motion.li
                  className={styles.sidebar__navItem}
                  variants={itemVariants}
                >
                  <Link href="/logout" className={styles.sidebar__navLink}>
                    <LogOut className={styles.sidebar__icon} />
                    <span>Log Out</span>
                  </Link>
                </motion.li>
              </motion.ul>
            </nav>

            <motion.div
              className={styles.sidebar__footer}
              variants={itemVariants}
            >
              <Image
                src="/images/brand/brand-logo/transparent-bg/green.png"
                alt="Metro Mellow"
                width={120}
                height={40}
                className={styles.sidebar__footerLogo}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
