import React from "react";
import { motion } from "framer-motion";
import styles from "./SuperAdminTopNavigation.module.scss";

interface SuperAdminTopNavigationProps {
  toggleSidebar: () => void;
}

const SuperAdminTopNavigation: React.FC<SuperAdminTopNavigationProps> = ({
  toggleSidebar,
}) => {
  return (
    <header className={styles.top_nav}>
      <div className={styles.top_nav__left}>
        <button
          className={styles.top_nav__menu_toggle}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={styles.top_nav__super_admin_badge}>
          SUPER ADMIN MODE
        </div>
      </div>

      <div className={styles.top_nav__right}>
        <div className={styles.top_nav__theme_toggle}>
          <button
            className={styles.top_nav__icon_button}
            aria-label="Toggle theme"
          >
            <span className={styles.icon}>☀️</span>
          </button>
        </div>

        <div className={styles.top_nav__notifications}>
          <button
            className={styles.top_nav__icon_button}
            aria-label="Notifications"
          >
            <span className={styles.icon}>🔔</span>
            <span className={styles.top_nav__notification_badge}>3</span>
          </button>
        </div>

        <div className={styles.top_nav__search}>
          <button className={styles.top_nav__icon_button} aria-label="Search">
            <span className={styles.icon}>🔍</span>
          </button>
        </div>

        <div className={styles.top_nav__user}>
          <button
            className={styles.top_nav__user_button}
            aria-label="User profile"
          >
            <div className={styles.top_nav__user_avatar}>
              <span>SA</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default SuperAdminTopNavigation;
