'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './NotificationsMenu.module.scss';

type NotificationsMenuProps = {
  onClose: () => void;
};

// Sample notification data
const notifications = [
  {
    id: 'notif1',
    type: 'appointment',
    title: 'Upcoming Cleaning',
    message: 'Your home cleaning is scheduled for tomorrow at 9:00 AM',
    time: '1 hour ago',
    read: false
  },
  {
    id: 'notif2',
    type: 'reminder',
    title: 'Subscription Renewal',
    message: 'Your monthly laundry subscription will renew in 3 days',
    time: '5 hours ago',
    read: false
  },
  {
    id: 'notif3',
    type: 'feedback',
    title: 'Rate Your Service',
    message: 'How was your recent cooking service? Please rate your experience',
    time: '1 day ago',
    read: true
  },
  {
    id: 'notif4',
    type: 'promo',
    title: 'Special Offer',
    message: 'Get 15% off on your next pest control service',
    time: '2 days ago',
    read: true
  }
];

export default function NotificationsMenu({ onClose }: NotificationsMenuProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'calendar';
      case 'reminder':
        return 'clock';
      case 'feedback':
        return 'message-square';
      case 'promo':
        return 'tag';
      default:
        return 'bell';
    }
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'primary';
      case 'reminder':
        return 'warning';
      case 'feedback':
        return 'info';
      case 'promo':
        return 'success';
      default:
        return 'primary';
    }
  };
  
  return (
    <div className={styles.menu}>
      <div className={styles.menu__header}>
        <h3 className={styles.menu__title}>Notifications</h3>
        <button 
          className={styles.menu__closeBtn} 
          onClick={onClose}
          aria-label="Close notifications"
        >
          <Icon name="x" />
        </button>
      </div>
      
      <div className={styles.menu__content}>
        {notifications.length > 0 ? (
          <ul className={styles.menu__list}>
            {notifications.map((notification, index) => (
              <motion.li
                key={notification.id}
                className={`${styles.menu__item} ${notification.read ? styles['menu__item--read'] : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`${styles.menu__icon} ${styles[`menu__icon--${getNotificationColor(notification.type)}`]}`}>
                  <Icon name={getNotificationIcon(notification.type)} />
                </div>
                <div className={styles.menu__details}>
                  <h4 className={styles.menu__itemTitle}>{notification.title}</h4>
                  <p className={styles.menu__message}>{notification.message}</p>
                  <span className={styles.menu__time}>{notification.time}</span>
                </div>
                {!notification.read && <div className={styles.menu__unread}></div>}
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className={styles.menu__empty}>
            <div className={styles.menu__emptyIcon}>
              <Icon name="bell-off" />
            </div>
            <p className={styles.menu__emptyText}>No notifications yet</p>
          </div>
        )}
      </div>
      
      <div className={styles.menu__footer}>
        <button className={styles.menu__footerBtn}>
          Mark all as read
        </button>
        <button className={styles.menu__footerBtn}>
          View all
        </button>
      </div>
    </div>
  );
}