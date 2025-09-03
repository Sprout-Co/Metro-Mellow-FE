'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './DashboardHeader.module.scss';

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock user data
  const user = {
    name: 'John',
    avatar: '/images/brand/logo.jpeg' // Placeholder avatar
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link href="/">
            <Image 
              src="/images/brand/logo.jpeg"
              alt="MetroMellow"
              width={120}
              height={40}
              className={styles.header__logoImage}
            />
          </Link>
        </div>
        
        <div className={styles.header__actions}>
          <div className={styles.header__notification}>
            <span className={styles.header__notificationIcon}>
              🔔
            </span>
          </div>
          
          <div className={styles.header__user} onClick={toggleMenu}>
            <div className={styles.header__userInfo}>
              <span className={styles.header__greeting}>Hi, {user.name}</span>
              <span className={styles.header__chevron}>▼</span>
            </div>
            
            {isMenuOpen && (
              <div className={styles.header__dropdown}>
                <ul className={styles.header__menu}>
                  <li className={styles.header__menuItem}>
                    <Link href="/dashboard" className={styles.header__menuLink} onClick={() => setIsMenuOpen(false)}>
                      <span className={styles.header__menuIcon}>📋</span>
                      SERVICES
                    </Link>
                  </li>
                  <li className={styles.header__menuItem}>
                    <Link href="/dashboard?tab=subscription" className={styles.header__menuLink} onClick={() => setIsMenuOpen(false)}>
                      <span className={styles.header__menuIcon}>📦</span>
                      MY SUBSCRIPTION
                    </Link>
                  </li>
                  <li className={styles.header__menuItem}>
                    <Link href="/dashboard/settings" className={styles.header__menuLink} onClick={() => setIsMenuOpen(false)}>
                      <span className={styles.header__menuIcon}>⚙️</span>
                      SETTINGS
                    </Link>
                  </li>
                  <li className={`${styles.header__menuItem} ${styles['header__menuItem--logout']}`}>
                    <button className={styles.header__menuLink} onClick={() => {
                      setIsMenuOpen(false);
                      // Handle logout logic here
                      console.log('Logout clicked');
                    }}>
                      <span className={styles.header__menuIcon}>🚪</span>
                      LOGOUT
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}