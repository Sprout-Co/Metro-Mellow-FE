import React from "react";
import { motion } from "framer-motion";
import WelcomeHeader from "./WelcomeHeader/WelcomeHeader";
import UpcomingServices from "./UpcomingServices/UpcomingServices";
import QuickActions from "./QuickActions/QuickActions";
import ActiveServices from "./ActiveServices/ActiveServices";
import NotificationsPanel from "./NotificationsPanel/NotificationsPanel";
import RewardsWidget from "./RewardsWidget/RewardsWidget";
import styles from "./DashboardOverview.module.scss";
import CTASection from "./CTASection/CTASection";

const DashboardOverview: React.FC = () => {
  return (
    <div className={styles.dashboardOverview}>
      <div className={styles.dashboardOverview__container}>
        <WelcomeHeader />
        <CTASection />
      </div>
    </div>
  );
};

export default DashboardOverview;
