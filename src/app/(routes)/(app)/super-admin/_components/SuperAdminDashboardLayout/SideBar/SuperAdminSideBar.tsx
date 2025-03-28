import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./SuperAdminSidebar.module.scss";

interface SuperAdminSidebarProps {
  collapsed: boolean;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ collapsed }) => {
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    { label: "Dashboard", path: "/super-admin/dashboard", icon: "📊" },
    { label: "User Management", path: "/super-admin/users", icon: "👥" },
    { label: "System Config", path: "/super-admin/system", icon: "⚙️" },
    { label: "Service Master", path: "/super-admin/services", icon: "🧹" },
    { label: "Financial Admin", path: "/super-admin/finance", icon: "💰" },
    { label: "Security Center", path: "/super-admin/security", icon: "🔒" },
    { label: "Platform Admin", path: "/super-admin/platform", icon: "🖥️" },
    { label: "Analytics", path: "/super-admin/analytics", icon: "📈" },
    { label: "Marketing", path: "/super-admin/marketing", icon: "📢" },
  ];

  const settingsItems: NavItem[] = [
    { label: "Admin Console", path: "/admin/dashboard", icon: "🔄" },
    { label: "Help", path: "/super-admin/help", icon: "❓" },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside
      className={`${styles.sidebar} ${collapsed ? styles["sidebar--collapsed"] : ""}`}
    >
      <div className={styles.sidebar__logo}>
        <motion.div
          className={styles.sidebar__logo_container}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          SUPER ADMIN
        </motion.div>
      </div>

      <div className={styles.sidebar__navigation}>
        <span className={styles.sidebar__heading}>SUPER ADMIN</span>
        <nav className={styles.sidebar__nav}>
          {navigationItems.map((item) => (
            <Link
              href={item.path}
              key={item.path}
              className={`${styles.sidebar__nav_item} ${isActive(item.path) ? styles["sidebar__nav_item--active"] : ""}`}
            >
              <span className={styles.sidebar__nav_icon}>{item.icon}</span>
              <span className={styles.sidebar__nav_label}>{item.label}</span>
              {isActive(item.path) && (
                <motion.div
                  className={styles.sidebar__nav_active_indicator}
                  layoutId="superAdminActiveNavIndicator"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.sidebar__settings}>
        <span className={styles.sidebar__heading}>QUICK ACCESS</span>
        <nav className={styles.sidebar__nav}>
          {settingsItems.map((item) => (
            <Link
              href={item.path}
              key={item.path}
              className={`${styles.sidebar__nav_item} ${isActive(item.path) ? styles["sidebar__nav_item--active"] : ""}`}
            >
              <span className={styles.sidebar__nav_icon}>{item.icon}</span>
              <span className={styles.sidebar__nav_label}>{item.label}</span>
              {isActive(item.path) && (
                <motion.div
                  className={styles.sidebar__nav_active_indicator}
                  layoutId="superAdminActiveSettingsIndicator"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default SuperAdminSidebar;
