import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
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
    { label: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { label: "Reports", path: "/admin/reports", icon: "📑" },
    { label: "Scheduling", path: "/admin/scheduling", icon: "📅" },
    { label: "Services", path: "/admin/services", icon: "🧹" },
    { label: "Customers", path: "/admin/customers", icon: "👥" },
    { label: "Staff", path: "/admin/staff", icon: "👨‍💼" },
    { label: "Analytics", path: "/admin/analytics", icon: "📈" },
  ];

  const settingsItems: NavItem[] = [
    { label: "Settings", path: "/admin/settings", icon: "⚙️" },
    { label: "Help Center", path: "/admin/help", icon: "❓" },
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
              <span className={styles.sidebar__nav_icon}>{item.icon}</span>
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
              <span className={styles.sidebar__nav_icon}>{item.icon}</span>
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
