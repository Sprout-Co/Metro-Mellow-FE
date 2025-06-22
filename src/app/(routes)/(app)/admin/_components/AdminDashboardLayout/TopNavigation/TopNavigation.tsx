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

        <motion.button
          className={styles.top_nav__add_button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Add new"
        >
          <span>+</span>
        </motion.button>

        <div className={styles.top_nav__mega_menu}>MEGA MENU</div>
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
            <span className={styles.icon}>
              <Icon name="bell" size={18} />
            </span>
            <span className={styles.top_nav__notification_badge}>2</span>
          </button>
        </div>

        <div className={styles.top_nav__search}>
          <button className={styles.top_nav__icon_button} aria-label="Search">
            <span className={styles.icon}>
              <Icon name="search" size={18} />
            </span>
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
