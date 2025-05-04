'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import UpcomingAppointments from './UpcomingAppointments';
import ServiceStatus from './ServiceStatus';
import QuickActions from './QuickActions';
import NotificationsCard from './NotificationsCard';
import RecentActivity from './RecentActivity';
import styles from './DashboardOverview.module.scss';

export default function DashboardOverview() {
  // Staggered animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className={styles.overview}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* <header className={styles.overview__header}>
        <h1 className={styles.overview__title}>Welcome Back, John!</h1>
        <p className={styles.overview__subtitle}>
          Here's what's happening with your home services today.
        </p>
      </header> */}
      
      {/* <section className={styles.overview__quickStats}>
        <motion.div variants={itemVariants} className={styles.overview__statCard}>
          <div className={`${styles.overview__statIcon} ${styles['overview__statIcon--upcoming']}`}>
            <Icon name="calendar" />
          </div>
          <div className={styles.overview__statContent}>
            <span className={styles.overview__statValue}>3</span>
            <span className={styles.overview__statLabel}>Upcoming Services</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className={styles.overview__statCard}>
          <div className={`${styles.overview__statIcon} ${styles['overview__statIcon--active']}`}>
            <Icon name="refresh-cw" />
          </div>
          <div className={styles.overview__statContent}>
            <span className={styles.overview__statValue}>2</span>
            <span className={styles.overview__statLabel}>Active Subscriptions</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className={styles.overview__statCard}>
          <div className={`${styles.overview__statIcon} ${styles['overview__statIcon--rewards']}`}>
            <Icon name="award" />
          </div>
          <div className={styles.overview__statContent}>
            <span className={styles.overview__statValue}>250</span>
            <span className={styles.overview__statLabel}>Reward Points</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className={styles.overview__statCard}>
          <div className={`${styles.overview__statIcon} ${styles['overview__statIcon--completed']}`}>
            <Icon name="check-circle" />
          </div>
          <div className={styles.overview__statContent}>
            <span className={styles.overview__statValue}>15</span>
            <span className={styles.overview__statLabel}>Completed Services</span>
          </div>
        </motion.div>
      </section> */}
      
      <div className={styles.overview__main}>
        <div className={`${styles.overview__column} ${styles['overview__column--primary']}`}>
          <motion.section variants={itemVariants} className={styles.overview__section}>
            {/* <h2 className={styles.overview__sectionTitle}>
              <Icon name="calendar" className={styles.overview__sectionIcon} />
              Upcoming Appointments
            </h2> */}
            <UpcomingAppointments />
          </motion.section>
          
          {/* <motion.section variants={itemVariants} className={styles.overview__section}>
            <h2 className={styles.overview__sectionTitle}>
              <Icon name="activity" className={styles.overview__sectionIcon} />
              Service Status
            </h2>
            <ServiceStatus />
          </motion.section>
          
          <motion.section variants={itemVariants} className={styles.overview__section}>
            <h2 className={styles.overview__sectionTitle}>
              <Icon name="clock" className={styles.overview__sectionIcon} />
              Recent Activity
            </h2>
            <RecentActivity />
          </motion.section> */}
        </div>
        
        <div className={`${styles.overview__column} ${styles['overview__column--secondary']}`}>
          <motion.section variants={itemVariants} className={styles.overview__section}>
            <h2 className={styles.overview__sectionTitle}>
              <Icon name="zap" className={styles.overview__sectionIcon} />
              Quick Actions
            </h2>
            <QuickActions />
          </motion.section>
          
          {/* <motion.section variants={itemVariants} className={styles.overview__section}>
            <h2 className={styles.overview__sectionTitle}>
              <Icon name="bell" className={styles.overview__sectionIcon} />
              Notifications
            </h2>
            <NotificationsCard />
          </motion.section> */}
        </div>
      </div>
    </motion.div>
  );
}