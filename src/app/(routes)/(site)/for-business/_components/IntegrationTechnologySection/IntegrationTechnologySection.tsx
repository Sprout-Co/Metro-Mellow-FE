"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./IntegrationTechnologySection.module.scss";

const features = [
  {
    id: "api",
    title: "API Integration",
    description:
      "Connect your existing systems with our robust API endpoints for seamless data flow.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 7L7 17M17 7H12M17 7V12M7 17H12M7 17V12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "mobile",
    title: "Mobile App for Employees",
    description:
      "Empower your team with our dedicated mobile app for real-time task management.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "tracking",
    title: "Real-time Tracking",
    description:
      "Monitor service delivery and staff performance with comprehensive dashboards.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17L13 13H17.5L21 9M13 7L9 3L5 7M3 13L7 17L9 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "integration",
    title: "HR/ERP Integration",
    description:
      "Seamlessly integrate with your existing HR and ERP systems for unified operations.",
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 16V18C16 19.1046 15.1046 20 14 20H6C4.89543 20 4 19.1046 4 18V12C4 10.8954 4.89543 10 6 10H8M14 4H16C17.1046 4 18 4.89543 18 6V12C18 13.1046 17.1046 14 16 14H8C6.89543 14 6 13.1046 6 12V10M12 4V14M9 7H15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const IntegrationTechnologySection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            className={styles.textContent}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.badge}>Technology & Integration</span>
            <h2 className={styles.heading}>
              Seamless Integration, Powerful Technology
            </h2>
            <p className={styles.subheading}>
              Our enterprise solutions are built with flexibility and
              scalability in mind, allowing for seamless integration with your
              existing business systems.
            </p>

            <div className={styles.featureGrid}>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.visualContent}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.mockupContainer}>
              <div className={styles.mockupDashboard}>
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupControls}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.mockupTitle}>Enterprise Dashboard</div>
                </div>
                <div className={styles.mockupContent}>
                  <div className={styles.mockupChart}></div>
                  <div className={styles.mockupStats}>
                    <div className={styles.mockupStat}>
                      <span className={styles.mockupStatValue}>94%</span>
                      <span className={styles.mockupStatLabel}>Efficiency</span>
                    </div>
                    <div className={styles.mockupStat}>
                      <span className={styles.mockupStatValue}>2.5h</span>
                      <span className={styles.mockupStatLabel}>Saved/Day</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.mockupMobile}>
                <div className={styles.mockupMobileScreen}>
                  <div className={styles.mockupMobileHeader}></div>
                  <div className={styles.mockupMobileContent}>
                    <div className={styles.mockupMobileItem}></div>
                    <div className={styles.mockupMobileItem}></div>
                    <div className={styles.mockupMobileItem}></div>
                  </div>
                </div>
              </div>

              <div className={styles.techStack}>
                <div className={styles.techIcon}></div>
                <div className={styles.techIcon}></div>
                <div className={styles.techIcon}></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationTechnologySection;
