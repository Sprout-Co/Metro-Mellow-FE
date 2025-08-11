import React from "react";
import { motion } from "framer-motion";
import styles from "./ActiveServices.module.scss";

// Mock active services data
const activeServices = [
  {
    id: "1",
    name: "Weekly Cleaning",
    type: "cleaning",
    frequency: "Weekly",
    nextDate: "Tomorrow",
    daysLeft: 1,
    progress: 85, // percentage towards next service
  },
  {
    id: "2",
    name: "Bi-Weekly Laundry",
    type: "laundry",
    frequency: "Bi-Weekly",
    nextDate: "Aug 13",
    daysLeft: 3,
    progress: 65,
  },
];

const ActiveServices: React.FC = () => {
  return (
    <div className={styles.activeServices}>
      <div className={styles.activeServices__header}>
        <h2 className={styles.activeServices__title}>Active Subscriptions</h2>
        <motion.button
          className={styles.activeServices__manageBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Manage
        </motion.button>
      </div>

      <div className={styles.activeServices__content}>
        {activeServices.map((service) => (
          <motion.div
            key={service.id}
            className={styles.activeServices__card}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className={styles.activeServices__cardHeader}>
              <h3 className={styles.activeServices__cardTitle}>
                {service.name}
              </h3>
              <span className={styles.activeServices__cardFrequency}>
                {service.frequency}
              </span>
            </div>

            <div className={styles.activeServices__progressContainer}>
              <div className={styles.activeServices__progressInfo}>
                <span className={styles.activeServices__nextService}>
                  Next service: {service.nextDate}
                </span>
                <span className={styles.activeServices__daysLeft}>
                  {service.daysLeft} day{service.daysLeft !== 1 ? "s" : ""} left
                </span>
              </div>

              <div className={styles.activeServices__progressBar}>
                <motion.div
                  className={styles.activeServices__progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${service.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
            </div>

            <div className={styles.activeServices__cardActions}>
              <motion.button
                className={styles.activeServices__actionBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Skip Next
              </motion.button>
              <motion.button
                className={`${styles.activeServices__actionBtn} ${styles["activeServices__actionBtn--secondary"]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}

        <motion.div
          className={styles.activeServices__addCard}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className={styles.activeServices__addIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <h3 className={styles.activeServices__addTitle}>
            Add New Subscription
          </h3>
          <p className={styles.activeServices__addText}>
            Save up to 20% with recurring services
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ActiveServices;
