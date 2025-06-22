"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Icon from "../common/Icon";
import styles from "./ProfileMenu.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux";

type ProfileMenuProps = {
  onClose: () => void;
};

const menuItems = [
  {
    id: "profile",
    label: "My Profile",
    icon: "user" as const,
    href: "/dashboard/settings/profile",
  },
  {
    id: "settings",
    label: "Account Settings",
    icon: "settings" as const,
    href: "/dashboard/settings",
  },
  {
    id: "billing",
    label: "Billing & Payments",
    icon: "credit-card" as const,
    href: "/dashboard/billing",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: "help-circle" as const,
    href: "/dashboard/help",
  },
  {
    id: "logout",
    label: "Log Out",
    icon: "x" as const,
    href: "#",
  },
];

export default function ProfileMenu({ onClose }: ProfileMenuProps) {
  const { handleLogout } = useAuthOperations();
  const currentUser = useAppSelector(selectUser);

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

  const handleMenuItemClick = async (itemId: string) => {
    if (itemId === "logout") {
      try {
        await handleLogout();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
    onClose();
  };

  return (
    <div className={styles.menu}>
      <div className={styles.menu__header}>
        <div className={styles.menu__user}>
          <div className={styles.menu__avatar}>
            <span>{getUserInitials()}</span>
          </div>
          <div className={styles.menu__userInfo}>
            <h3 className={styles.menu__userName}>{getFullName()}</h3>
            <p className={styles.menu__userEmail}>
              {currentUser?.email || "No email"}
            </p>
          </div>
        </div>
      </div>

      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={`${styles.menu__item} ${item.id === "logout" ? styles["menu__item--logout"] : ""}`}
                onClick={(e) => {
                  if (item.id === "logout") {
                    e.preventDefault();
                    handleMenuItemClick(item.id);
                  } else {
                    onClose();
                  }
                }}
              >
                <Icon name={item.icon} className={styles.menu__icon} />
                <span>{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className={styles.menu__footer}>
        <p className={styles.menu__version}>Metro Mellow v1.0.0</p>
      </div>
    </div>
  );
}
