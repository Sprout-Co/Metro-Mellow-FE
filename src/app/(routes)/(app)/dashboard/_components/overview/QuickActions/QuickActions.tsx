import React from "react";
import { motion } from "framer-motion";
import styles from "./QuickActions.module.scss";

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <motion.button
      className={styles.quickActions__button}
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className={styles.quickActions__buttonIcon}>{icon}</div>
      <span className={styles.quickActions__buttonLabel}>{label}</span>
    </motion.button>
  );
};

const QuickActions: React.FC = () => {
  // Handler functions (would connect to actual functionality in a real app)
  const handleBookService = () => console.log("Book service clicked");
  const handleReschedule = () => console.log("Reschedule clicked");
  const handleEditSubscription = () => console.log("Edit subscription clicked");
  const handleContactSupport = () => console.log("Contact support clicked");

  return (
    <div className={styles.quickActions}>
      <h2 className={styles.quickActions__title}>Quick Actions</h2>

      <div className={styles.quickActions__grid}>
        <QuickActionButton
          icon={
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
          label="Book Service"
          onClick={handleBookService}
        />

        <QuickActionButton
          icon={
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
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          }
          label="Reschedule"
          onClick={handleReschedule}
        />

        <QuickActionButton
          icon={
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
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          }
          label="Edit Subscription"
          onClick={handleEditSubscription}
        />

        <QuickActionButton
          icon={
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
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          }
          label="Contact Support"
          onClick={handleContactSupport}
        />
      </div>
    </div>
  );
};

export default QuickActions;
