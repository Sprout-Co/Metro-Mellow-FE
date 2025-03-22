import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import styles from "./SuperAdminDashboardLayout.module.scss";
import SuperAdminSidebar from "./SideBar/SuperAdminSideBar";
import SuperAdminTopNavigation from "./TopNavigation/SuperAdminTopNavigation";

interface SuperAdminDashboardLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs?: { label: string; path: string }[];
}

const SuperAdminDashboardLayout: React.FC<SuperAdminDashboardLayoutProps> = ({
  children,
  title,
  breadcrumbs = [],
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={styles.dashboard}>
      <SuperAdminSidebar collapsed={sidebarCollapsed} />

      <div
        className={`${styles.dashboard__main} ${sidebarCollapsed ? styles["dashboard__main--expanded"] : ""}`}
      >
        <SuperAdminTopNavigation toggleSidebar={toggleSidebar} />

        <div className={styles.dashboard__header}>
          <h1 className={styles.dashboard__title}>{title}</h1>
          {breadcrumbs.length > 0 && (
            <div className={styles.dashboard__breadcrumbs}>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  <a
                    href={crumb.path}
                    className={styles.dashboard__breadcrumb_link}
                  >
                    {crumb.label}
                  </a>
                  {index < breadcrumbs.length - 1 && (
                    <span className={styles.dashboard__breadcrumb_separator}>
                      &gt;
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <div className={styles.dashboard__controls}>
            <div className={styles.dashboard__date_picker}>
              <span>APR 17, 24 - MAY 16, 24</span>
            </div>
            <button className={styles.dashboard__filter_btn}>
              <span className={styles.icon}>⚑</span>
              <span>FILTER</span>
            </button>
          </div>
        </div>

        <motion.div
          className={styles.dashboard__content}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminDashboardLayout;
