'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from '../common/Icon';
import styles from './ProfileMenu.module.scss';

type ProfileMenuProps = {
  onClose: () => void;
};

const menuItems = [
  {
    id: 'profile',
    label: 'My Profile',
    icon: 'user',
    href: '/dashboard/settings/profile'
  },
  {
    id: 'settings',
    label: 'Account Settings',
    icon: 'settings',
    href: '/dashboard/settings'
  },
  {
    id: 'billing',
    label: 'Billing & Payments',
    icon: 'credit-card',
    href: '/dashboard/billing'
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: 'help-circle',
    href: '/dashboard/help'
  },
  {
    id: 'logout',
    label: 'Log Out',
    icon: 'log-out',
    href: '/logout'
  }
];

export default function ProfileMenu({ onClose }: ProfileMenuProps) {
  return (
    <div className={styles.menu}>
      <div className={styles.menu__header}>
        <div className={styles.menu__user}>
          <div className={styles.menu__avatar}>
            <span>JD</span>
          </div>
          <div className={styles.menu__userInfo}>
            <h3 className={styles.menu__userName}>John Doe</h3>
            <p className={styles.menu__userEmail}>john.doe@example.com</p>
          </div>
        </div>
      </div>
      
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          {menuItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                href={item.href}
                className={`${styles.menu__item} ${item.id === 'logout' ? styles['menu__item--logout'] : ''}`}
                onClick={() => {
                  if (item.id === 'logout') {
                    // Handle logout logic here
                    console.log('Logging out...');
                  }
                  onClose();
                }}
              >
                <Icon name={item.icon} className={styles.menu__icon} />
                <span>{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      
      <div className={styles.menu__footer}>
        <p className={styles.menu__version}>Metro Mellow v1.0.0</p>
      </div>
    </div>
  );
}