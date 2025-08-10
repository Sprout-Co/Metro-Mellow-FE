import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import styles from "./DashboardLayout.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className={styles.dashboardLayout}>
      <Navbar />
      <div className={styles.dashboardLayout__main}>{children}</div>
      {/* <motion.main
        className={styles.dashboardLayout__main}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {children}
      </motion.main> */}
    </div>
  );
};

export default DashboardLayout;
