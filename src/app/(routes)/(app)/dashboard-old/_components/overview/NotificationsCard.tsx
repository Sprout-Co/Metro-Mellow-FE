'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './NotificationsCard.module.scss';

// Sample notifications data
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
  }
];

export default function NotificationsCard() {
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
    <div className={styles.card}>
      {notifications.length > 0 ? (
        <ul className={styles.card__list}>
          {notifications.map((notification, index) => (
            <motion.li
              key={notification.id}
              className={`${styles.card__item} ${notification.read ? styles['card__item--read'] : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`${styles.card__icon} ${styles[`card__icon--${getNotificationColor(notification.type)}`]}`}>
                <Icon name={getNotificationIcon(notification.type)} />
              </div>
              <div className={styles.card__details}>
                <h4 className={styles.card__title}>{notification.title}</h4>
                <p className={styles.card__message}>{notification.message}</p>
                <span className={styles.card__time}>{notification.time}</span>
              </div>
              {!notification.read && <div className={styles.card__unread}></div>}
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className={styles.card__empty}>
          <div className={styles.card__emptyIcon}>
            <Icon name="bell-off" />
          </div>
          <p className={styles.card__emptyText}>No notifications yet</p>
        </div>
      )}
      
      <div className={styles.card__footer}>
        <button className={styles.card__footerBtn}>
          View All Notifications
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}