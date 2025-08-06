'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import HeroBanner from './HeroBanner';
import UpcomingAppointments from './UpcomingAppointments';
import QuickActions from './QuickActions';
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
      <motion.section variants={itemVariants} className={styles.overview__section}>
        <HeroBanner />
      </motion.section>
      
      <div className={styles.overview__main}>
        <div className={`${styles.overview__column} ${styles['overview__column--primary']}`}>
          <motion.section variants={itemVariants} className={styles.overview__section}>
            <UpcomingAppointments />
          </motion.section>
        </div>
        
        <div className={`${styles.overview__column} ${styles['overview__column--secondary']}`}>
          <motion.section variants={itemVariants} className={styles.overview__section}>
            <h2 className={styles.overview__sectionTitle}>
              <Icon name="zap" className={styles.overview__sectionIcon} />
              Quick Actions
            </h2>
            <QuickActions />
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}