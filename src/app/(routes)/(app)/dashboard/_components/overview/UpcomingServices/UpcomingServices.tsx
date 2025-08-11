// src/app/(routes)/(app)/dashboard/_components/overview/UpcomingServices/UpcomingServices.tsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./UpcomingServices.module.scss";

// Mock upcoming services data
const upcomingServices = [
  {
    id: "1",
    serviceType: "Cleaning",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    provider: "Miguel R.",
    status: "confirmed",
    address: "24 Emmanuel Osakwe Street, Lagos",
  },
  {
    id: "2",
    serviceType: "Laundry",
    date: "Wednesday, Aug 13",
    time: "2:00 PM - 3:00 PM",
    provider: "Pending Assignment",
    status: "scheduled",
    address: "24 Emmanuel Osakwe Street, Lagos",
  },
  {
    id: "3",
    serviceType: "Cooking",
    date: "Friday, Aug 15",
    time: "5:00 PM - 7:00 PM",
    provider: "Sophia M.",
    status: "scheduled",
    address: "24 Emmanuel Osakwe Street, Lagos",
  },
];

const UpcomingServices: React.FC = () => {
  // Service type icon mapping
  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "cleaning":
        return (
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
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        );
      case "laundry":
        return (
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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="12" cy="12" r="4"></circle>
            <circle cx="12" cy="12" r="1"></circle>
          </svg>
        );
      case "cooking":
        return (
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
            <path d="M8 3v3a2 2 0 0 1-2 2H3m3 3h6m4-3h3a2 2 0 0 1 2 2v3"></path>
            <rect x="3" y="10" width="18" height="10" rx="2"></rect>
          </svg>
        );
      case "errands":
        return (
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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
      case "pest control":
        return (
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
            <path d="M16 16s0-2 4-2 4 2 4 2"></path>
            <path d="M8 10s0-2 4-2 4 2 4 2"></path>
            <path d="M4 22s0-2 4-2 4 2 4 2"></path>
            <path d="M13 5h6M13 8h3"></path>
          </svg>
        );
      default:
        return (
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
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
    }
  };

  return (
    <div className={styles.upcomingServices}>
      <div className={styles.upcomingServices__header}>
        <h2 className={styles.upcomingServices__title}>Upcoming Services</h2>
        <motion.button
          className={styles.upcomingServices__viewAllBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All
        </motion.button>
      </div>

      <div className={styles.upcomingServices__list}>
        {upcomingServices.length > 0 ? (
          upcomingServices.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.upcomingServices__item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              // whileHover={{ y: -5, boxShadow: shadow("lg") }}
            >
              <div className={styles.upcomingServices__serviceIcon}>
                {getServiceIcon(service.serviceType)}
              </div>

              <div className={styles.upcomingServices__serviceInfo}>
                <h3 className={styles.upcomingServices__serviceName}>
                  {service.serviceType}
                </h3>
                <div className={styles.upcomingServices__serviceDetails}>
                  <div className={styles.upcomingServices__dateTime}>
                    <span className={styles.upcomingServices__date}>
                      {service.date}
                    </span>
                    <span className={styles.upcomingServices__time}>
                      {service.time}
                    </span>
                  </div>
                  <div className={styles.upcomingServices__location}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{service.address}</span>
                  </div>
                </div>
              </div>

              <div className={styles.upcomingServices__serviceStatus}>
                <div
                  className={`${styles.upcomingServices__statusBadge} ${styles[`upcomingServices__statusBadge--${service.status}`]}`}
                >
                  {service.status.charAt(0).toUpperCase() +
                    service.status.slice(1)}
                </div>
                <div className={styles.upcomingServices__provider}>
                  <span className={styles.upcomingServices__providerLabel}>
                    Provider:
                  </span>
                  <span className={styles.upcomingServices__providerName}>
                    {service.provider}
                  </span>
                </div>
              </div>

              <div className={styles.upcomingServices__actions}>
                <motion.button
                  className={styles.upcomingServices__actionBtn}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Reschedule
                </motion.button>
                <motion.button
                  className={`${styles.upcomingServices__actionBtn} ${styles["upcomingServices__actionBtn--secondary"]}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className={styles.upcomingServices__empty}>
            <p>No upcoming services scheduled</p>
            <motion.button
              className={styles.upcomingServices__bookBtn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Service
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingServices;
