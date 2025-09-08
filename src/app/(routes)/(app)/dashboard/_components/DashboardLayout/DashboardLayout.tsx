"use client";

import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import styles from "./DashboardLayout.module.scss";
import Breadcrumb from "./breadcrumb/Breadcrumb";
import ServicesListDrawer from "./sidebar/ServicesListDrawer/ServicesListDrawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { closeServicesListDrawer } from "@/lib/redux/slices/uiSlice";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const dispatch = useDispatch();
  const isServicesListDrawerOpen = useSelector(
    (state: RootState) => state.ui.isServicesListDrawerOpen
  );

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.dashboardLayout}>
      <Navbar handleSidebarToggle={handleSidebarToggle} />

      <div className={styles.dashboardLayout__content}>
        <Sidebar
          isOpen={isSidebarCollapsed}
          onClose={() => handleSidebarToggle()}
        />
        <motion.main
          className={`${styles.dashboardLayout__main} ${isSidebarCollapsed ? styles["dashboardLayout__main--expanded"] : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <>
            <Breadcrumb />
            {children}
          </>
        </motion.main>
      </div>

      <ServicesListDrawer
        isOpen={isServicesListDrawerOpen}
        onClose={() => dispatch(closeServicesListDrawer())}
        onServiceSelect={(categoryId, serviceId) => {
          console.log("Selected category:", categoryId);
          console.log("Selected service:", serviceId);
          dispatch(closeServicesListDrawer());
        }}
      />
    </div>
  );
};

export default DashboardLayout;
