'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Icon from '../common/Icon';
import NotificationsMenu from './NotificationsMenu';
import ProfileMenu from './ProfileMenu';
import styles from './DashboardHeader.module.scss';

export default function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Image 
            src="/logo.svg" 
            alt="Metro Mellow" 
            width={40} 
            height={40} 
          />
          <span className={styles.header__logoText}>Metro Mellow</span>
        </div>
        
        <div className={styles.header__search}>
          <Icon name="search" className={styles.header__searchIcon} />
          <input 
            type="text" 
            className={styles.header__searchInput} 
            placeholder="Search services, appointments..." 
          />
        </div>
        
        <div className={styles.header__actions}>
          <button 
            className={styles.header__actionBtn}
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (showProfileMenu) setShowProfileMenu(false);
            }}
          >
            <div className={styles.header__notificationIndicator}></div>
            <Icon name="bell" />
          </button>
          
          <div className={styles.header__user}>
            <button 
              className={styles.header__userBtn}
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                if (showNotifications) setShowNotifications(false);
              }}
            >
              <div className={styles.header__avatar}>
                <span>JD</span>
              </div>
              <span className={styles.header__userName}>John Doe</span>
              <Icon name="chevron-down" className={styles.header__userIcon} />
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`${styles.header__dropdown} ${styles['header__dropdown--notifications']}`}
          >
            <NotificationsMenu onClose={() => setShowNotifications(false)} />
          </motion.div>
        )}
        
        {showProfileMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`${styles.header__dropdown} ${styles['header__dropdown--profile']}`}
          >
            <ProfileMenu onClose={() => setShowProfileMenu(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}