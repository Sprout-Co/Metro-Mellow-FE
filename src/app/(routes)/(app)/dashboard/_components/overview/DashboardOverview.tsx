import React from "react";
import { motion } from "framer-motion";
import WelcomeHeader from "./WelcomeHeader/WelcomeHeader";
import UpcomingServices from "./UpcomingServices/UpcomingServices";
import QuickActions from "./QuickActions/QuickActions";
import ActiveServices from "./ActiveServices/ActiveServices";
import NotificationsPanel from "./NotificationsPanel/NotificationsPanel";
import RewardsWidget from "./RewardsWidget/RewardsWidget";
import styles from "./DashboardOverview.module.scss";

const DashboardOverview: React.FC = () => {
  return (
    <div className={styles.dashboardOverview}>
      <div className={styles.dashboardOverview__container}>
        <WelcomeHeader />

        <div className={styles.dashboardOverview__grid}>
          {/* Left column - 2/3 width */}
          <div className={styles.dashboardOverview__mainColumn}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <UpcomingServices />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <ActiveServices />
            </motion.div>
          </div>

          {/* Right column - 1/3 width */}
          <div className={styles.dashboardOverview__sideColumn}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <QuickActions />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <NotificationsPanel />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <RewardsWidget />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
