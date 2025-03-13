'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './UpcomingAppointments.module.scss';

// Sample data
const appointments = [
  {
    id: 'app1',
    service: 'Home Cleaning',
    date: '2025-03-15',
    time: '09:00 AM - 11:30 AM',
    provider: 'Sarah Johnson',
    providerAvatar: '/avatars/sarah.jpg',
    status: 'confirmed',
    address: '123 Main St, Apt 4B',
    hoursLeft: 72
  },
  {
    id: 'app2',
    service: 'Laundry Service',
    date: '2025-03-18',
    time: '02:00 PM - 03:00 PM',
    provider: 'Michael Chen',
    providerAvatar: '/avatars/michael.jpg',
    status: 'confirmed',
    address: '123 Main St, Apt 4B',
    hoursLeft: 144
  },
  {
    id: 'app3',
    service: 'Pest Control',
    date: '2025-03-20',
    time: '10:00 AM - 11:00 AM',
    provider: 'Robert Wilson',
    providerAvatar: '/avatars/robert.jpg',
    status: 'pending',
    address: '123 Main St, Apt 4B',
    hoursLeft: 192
  }
];

export default function UpcomingAppointments() {
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const toggleAppointment = (id: string) => {
    if (expandedAppointment === id) {
      setExpandedAppointment(null);
    } else {
      setExpandedAppointment(id);
    }
  };
  
  return (
    <div className={styles.appointments}>
      {appointments.map((appointment) => (
        <motion.div 
          key={appointment.id}
          className={styles.appointments__card}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: appointments.findIndex(a => a.id === appointment.id) * 0.1
          }}
        >
          <div 
            className={styles.appointments__header}
            onClick={() => toggleAppointment(appointment.id)}
          >
            <div className={styles.appointments__serviceIcon}>
              <Icon 
                name={
                  appointment.service.includes('Cleaning') ? 'home' :
                  appointment.service.includes('Laundry') ? 'refresh-cw' :
                  appointment.service.includes('Cooking') ? 'coffee' :
                  appointment.service.includes('Pest') ? 'shield' : 'package'
                } 
              />
            </div>
            
            <div className={styles.appointments__details}>
              <h3 className={styles.appointments__service}>
                {appointment.service}
              </h3>
              <div className={styles.appointments__meta}>
                <span className={styles.appointments__date}>
                  <Icon name="calendar" />
                  {formatDate(appointment.date)}
                </span>
                <span className={styles.appointments__time}>
                  <Icon name="clock" />
                  {appointment.time}
                </span>
              </div>
            </div>
            
            <div className={styles.appointments__timer}>
              <div className={styles.appointments__countdown}>
                <span className={styles.appointments__hours}>
                  {appointment.hoursLeft}h
                </span>
              </div>
              <button className={styles.appointments__expand}>
                <Icon 
                  name={expandedAppointment === appointment.id ? 'chevron-up' : 'chevron-down'} 
                />
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {expandedAppointment === appointment.id && (
              <motion.div
                className={styles.appointments__content}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.appointments__provider}>
                  <div className={styles.appointments__providerAvatar}>
                    <span>{appointment.provider.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className={styles.appointments__providerInfo}>
                    <span className={styles.appointments__providerName}>
                      {appointment.provider}
                    </span>
                    <span className={styles.appointments__providerTitle}>
                      Service Professional
                    </span>
                  </div>
                </div>
                
                <div className={styles.appointments__location}>
                  <Icon name="map-pin" />
                  <span>{appointment.address}</span>
                </div>
                
                <div className={styles.appointments__status}>
                  <span 
                    className={`${styles.appointments__badge} ${
                      styles[`appointments__badge--${appointment.status}`]
                    }`}
                  >
                    {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending Confirmation'}
                  </span>
                </div>
                
                <div className={styles.appointments__actions}>
                  <button className={`${styles.appointments__actionBtn} ${styles['appointments__actionBtn--reschedule']}`}>
                    <Icon name="calendar" />
                    Reschedule
                  </button>
                  <button className={`${styles.appointments__actionBtn} ${styles['appointments__actionBtn--cancel']}`}>
                    <Icon name="x" />
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      
      <div className={styles.appointments__footer}>
        <button className={styles.appointments__viewAll}>
          View All Appointments
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  );
}