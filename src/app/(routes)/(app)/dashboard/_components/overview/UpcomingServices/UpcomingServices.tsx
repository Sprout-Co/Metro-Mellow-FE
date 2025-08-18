// src/app/(routes)/(app)/dashboard/_components/overview/UpcomingServices/UpcomingServices.tsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./UpcomingServices.module.scss";
import {
  Sparkles,
  Scissors,
  ChefHat,
  Phone,
  Bug,
  HelpCircle,
} from "lucide-react";

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
        return <Sparkles size={24} />;
      case "laundry":
        return <Scissors size={24} />;
      case "cooking":
        return <ChefHat size={24} />;
      case "errands":
        return <Phone size={24} />;
      case "pest control":
        return <Bug size={24} />;
      default:
        return <HelpCircle size={24} />;
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
