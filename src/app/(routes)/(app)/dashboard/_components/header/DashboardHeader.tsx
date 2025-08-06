'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './DashboardHeader.module.scss';

export default function DashboardHeader() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link href="/">
            <Image 
              src="/images/brand/logo.jpeg" 
              alt="Metro Mellow" 
              width={150} 
              height={40} 
              className={styles.header__logoImage}
            />
          </Link>
        </div>
        
        <div className={styles.header__actions}>
          <div className={styles.header__actionItem}>
            <button 
              className={styles.header__notificationBtn}
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <Icon name="bell" />
              <span className={styles.header__notificationBadge}>2</span>
            </button>
            
            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div 
                  className={styles.header__notificationsPanel}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={menuVariants}
                >
                  <div className={styles.header__notificationsHeader}>
                    <h3>Notifications</h3>
                    <button className={styles.header__markAllBtn}>
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className={styles.header__notificationsList}>
                    <div className={`${styles.header__notificationItem} ${styles['header__notificationItem--unread']}`}>
                      <div className={`${styles.header__notificationIcon} ${styles['header__notificationIcon--info']}`}>
                        <Icon name="calendar" />
                      </div>
                      <div className={styles.header__notificationContent}>
                        <p className={styles.header__notificationText}>
                          Your cleaning service is scheduled for tomorrow at 10:00 AM.
                        </p>
                        <span className={styles.header__notificationTime}>2 hours ago</span>
                      </div>
                    </div>
                    
                    <div className={`${styles.header__notificationItem} ${styles['header__notificationItem--unread']}`}>
                      <div className={`${styles.header__notificationIcon} ${styles['header__notificationIcon--success']}`}>
                        <Icon name="check-circle" />
                      </div>
                      <div className={styles.header__notificationContent}>
                        <p className={styles.header__notificationText}>
                          Your subscription has been successfully renewed for the next month.
                        </p>
                        <span className={styles.header__notificationTime}>1 day ago</span>
                      </div>
                    </div>
                    
                    <div className={styles.header__notificationItem}>
                      <div className={`${styles.header__notificationIcon} ${styles['header__notificationIcon--warning']}`}>
                        <Icon name="alert-circle" />
                      </div>
                      <div className={styles.header__notificationContent}>
                        <p className={styles.header__notificationText}>
                          Please update your payment information before the next billing cycle.
                        </p>
                        <span className={styles.header__notificationTime}>3 days ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.header__notificationsFooter}>
                    <Link href="/dashboard/notifications" className={styles.header__viewAllLink}>
                      View all notifications
                      <Icon name="arrow-right" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className={styles.header__actionItem}>
            <button 
              className={styles.header__profileBtn}
              onClick={toggleProfileMenu}
              aria-label="User profile"
              aria-expanded={isProfileMenuOpen}
            >
              <div className={styles.header__profileInfo}>
                <span className={styles.header__profileName}>Hi, John</span>
              </div>
              <div className={styles.header__profileAvatar}>
                <Image 
                  src="https://i.pravatar.cc/100?img=8" 
                  alt="John Doe" 
                  width={40} 
                  height={40}
                />
              </div>
            </button>
            
            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div 
                  className={styles.header__profileMenu}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={menuVariants}
                >
                  <div className={styles.header__profileHeader}>
                    <div className={styles.header__profileAvatar}>
                      <Image 
                        src="https://i.pravatar.cc/100?img=8" 
                        alt="John Doe" 
                        width={60} 
                        height={60}
                      />
                    </div>
                    <div className={styles.header__profileDetails}>
                      <h3 className={styles.header__profileFullName}>John Doe</h3>
                      <p className={styles.header__profileEmail}>john.doe@example.com</p>
                    </div>
                  </div>
                  
                  <div className={styles.header__menuItems}>
                    <Link href="/dashboard/settings/profile" className={styles.header__menuItem}>
                      <Icon name="user" className={styles.header__menuIcon} />
                      <span>My Profile</span>
                    </Link>
                    
                    <Link href="/dashboard/settings" className={styles.header__menuItem}>
                      <Icon name="settings" className={styles.header__menuIcon} />
                      <span>Settings</span>
                    </Link>
                    
                    <Link href="/dashboard/help" className={styles.header__menuItem}>
                      <Icon name="help-circle" className={styles.header__menuIcon} />
                      <span>Help & Support</span>
                    </Link>
                  </div>
                  
                  <div className={styles.header__menuFooter}>
                    <button className={styles.header__logoutBtn}>
                      <Icon name="log-out" className={styles.header__menuIcon} />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}