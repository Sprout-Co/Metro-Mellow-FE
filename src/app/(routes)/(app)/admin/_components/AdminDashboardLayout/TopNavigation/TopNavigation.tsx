import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./TopNavigation.module.scss";

interface TopNavigationProps {
  toggleSidebar: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ toggleSidebar }) => {
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
      </div>

      <div className={styles.top_nav__right}>


        <div className={styles.top_nav__notifications}>
          <button
            className={styles.top_nav__icon_button}
            aria-label="Notifications"
          >
            <span className={styles.icon}>
              <Icon name="bell" size={18} />
            </span>
            <span className={styles.top_nav__notification_badge}>2</span>
          </button>
        </div>

        <div className={styles.top_nav__user}>
          <button
            className={styles.top_nav__user_button}
            aria-label="User profile"
          >
            <div className={styles.top_nav__user_avatar}>
              <span>JD</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
