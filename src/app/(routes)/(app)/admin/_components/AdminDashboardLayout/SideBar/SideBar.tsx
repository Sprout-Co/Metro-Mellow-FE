import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  collapsed: boolean;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    { label: "Dashboard", path: "/admin/dashboard", icon: "bar-chart" },
    { label: "Bookings", path: "/admin/bookings", icon: "calendar" },
    { label: "Subscriptions", path: "/admin/subscriptions", icon: "credit-card" },
    { label: "Customers", path: "/admin/customers", icon: "users" },
    { label: "Scheduling", path: "/admin/scheduling", icon: "calendar-plus" },
    // { label: "Services", path: "/admin/services", icon: "package" },
    // { label: "Reports", path: "/admin/reports", icon: "file-text" },
    // { label: "Staff", path: "/admin/staff", icon: "user" },
    // { label: "Analytics", path: "/admin/analytics", icon: "trending-up" },
  ];

  const settingsItems: NavItem[] = [
    // { label: "Settings", path: "/admin/settings", icon: "settings" },
    // { label: "Help Center", path: "/admin/help", icon: "help-circle" },
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
          METRO MELLOW
        </motion.div>
      </div>

      <div className={styles.sidebar__navigation}>
        <span className={styles.sidebar__heading}>NAVIGATION</span>
        <nav className={styles.sidebar__nav}>
          {navigationItems.map((item) => (
            <Link
              href={item.path}
              key={item.path}
              className={`${styles.sidebar__nav_item} ${isActive(item.path) ? styles["sidebar__nav_item--active"] : ""}`}
            >
              <span className={styles.sidebar__nav_icon}>
                <Icon name={item.icon as any} size={20} />
              </span>
              <span className={styles.sidebar__nav_label}>{item.label}</span>
              {isActive(item.path) && (
                <motion.div
                  className={styles.sidebar__nav_active_indicator}
                  layoutId="activeNavIndicator"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className={styles.sidebar__settings}>
        <nav className={styles.sidebar__nav}>
          {settingsItems.map((item) => (
            <Link
              href={item.path}
              key={item.path}
              className={`${styles.sidebar__nav_item} ${isActive(item.path) ? styles["sidebar__nav_item--active"] : ""}`}
            >
              <span className={styles.sidebar__nav_icon}>
                <Icon name={item.icon as any} size={20} />
              </span>
              <span className={styles.sidebar__nav_label}>{item.label}</span>
              {isActive(item.path) && (
                <motion.div
                  className={styles.sidebar__nav_active_indicator}
                  layoutId="activeSettingsIndicator"
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

export default Sidebar;
