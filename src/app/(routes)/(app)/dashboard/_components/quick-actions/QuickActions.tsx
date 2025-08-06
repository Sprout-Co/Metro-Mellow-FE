'use client';

import styles from './QuickActions.module.scss';

export default function QuickActions() {
  const actions = [
    {
      id: 'book',
      label: 'Book a Service',
      icon: '📅',
      onClick: () => console.log('Book a service clicked')
    },
    {
      id: 'reschedule',
      label: 'Reschedule',
      icon: '🔄',
      onClick: () => console.log('Reschedule clicked')
    },
    {
      id: 'contact',
      label: 'Contact us',
      icon: '📞',
      onClick: () => console.log('Contact us clicked')
    },
    {
      id: 'chat',
      label: 'Chat on whatsapp',
      icon: '💬',
      onClick: () => console.log('Chat on whatsapp clicked')
    }
  ];
  
  return (
    <div className={styles.quickActions}>
      <div className={styles.quickActions__grid}>
        {actions.map(action => (
          <button 
            key={action.id}
            className={styles.quickActions__button}
            onClick={action.onClick}
          >
            <span className={styles.quickActions__icon}>
              {action.icon}
            </span>
            <span className={styles.quickActions__label}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}