"use client";

import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import styles from "./DashboardLayout.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className={styles.dashboardLayout}>
      <Navbar />
      <div className={styles.dashboardLayout__content}>
        <Sidebar
          isOpen={!isSidebarCollapsed}
          onClose={() => handleSidebarToggle(true)}
        />
        <motion.main
          className={`${styles.dashboardLayout__main} ${isSidebarCollapsed ? styles["dashboardLayout__main--expanded"] : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
