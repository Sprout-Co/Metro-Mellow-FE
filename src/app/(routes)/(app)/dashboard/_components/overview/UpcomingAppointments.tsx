'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './UpcomingAppointments.module.scss';
import EmptyState from './EmptyState';

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    service: { name: 'Home Cleaning' },
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    timeSlot: 'MORNING',
    status: 'PENDING',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    staff: {
      firstName: 'Jane',
      lastName: 'Doe'
    },
    notes: 'Please focus on kitchen and living room'
  },
  {
    id: '2',
    service: { name: 'Laundry Service' },
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    timeSlot: 'AFTERNOON',
    status: 'PENDING',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    staff: null,
    notes: 'Separate whites and colors'
  }
];

export default function UpcomingAppointments() {
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null);
  const [filter, setFilter] = useState<'upcoming' | 'past' | 'cancelled' | 'paused' | 'all'>('upcoming');
  const [appointments, setAppointments] = useState(mockAppointments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeSlot: string) => {
    // Convert timeSlot enum to approximate time range
    switch (timeSlot) {
      case 'MORNING':
        return '8:00 AM - 12:00 PM (Morning)';
      case 'AFTERNOON':
        return '12:00 PM - 4:00 PM (Afternoon)';
      case 'EVENING':
        return '4:00 PM - 8:00 PM (Evening)';
      default:
        return 'Time not specified';
    }
  };

  const getTimeLeft = (date: string) => {
    const appointmentDate = new Date(date);
    const now = new Date();
    const diff = appointmentDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diff < 0) {
      return {
        label: 'Completed',
        isImminent: false,
        status: 'COMPLETED'
      };
    }
    
    const isToday = appointmentDate.toDateString() === now.toDateString();
    const isImminent = isToday && diff > 0 && diff <= 2 * 60 * 60 * 1000; // Within 2 hours
    
    if (isImminent) {
      return {
        label: 'Starting soon',
        isImminent: true,
        status: 'PENDING'
      };
    }
    
    if (days > 0) {
      return {
        label: `${days} day${days > 1 ? 's' : ''} left`,
        isImminent: false,
        status: 'PENDING'
      };
    }
    
    return {
      label: `${hours} hour${hours > 1 ? 's' : ''} left`,
      isImminent: false,
      status: 'PENDING'
    };
  };

  const getServiceIcon = (serviceName?: string) => {
    if (!serviceName) return 'package';
    
    if (serviceName.toLowerCase().includes('cleaning')) return 'home';
    if (serviceName.toLowerCase().includes('laundry')) return 'refresh-cw';
    if (serviceName.toLowerCase().includes('cooking')) return 'coffee';
    if (serviceName.toLowerCase().includes('pest')) return 'shield';
    return 'package';
  };

  const toggleAppointment = (id: string) => {
    if (expandedAppointment === id) {
      setExpandedAppointment(null);
    } else {
      setExpandedAppointment(id);
    }
  };

  // Filter appointments based on status and time
  const filteredAppointments = appointments.filter(appointment => {
    const { status: timeStatus } = getTimeLeft(appointment.date);
    
    if (filter === 'upcoming') {
      return appointment.status !== 'COMPLETED' && 
             appointment.status !== 'CANCELLED' &&
             appointment.status !== 'PAUSED' &&
             timeStatus !== 'COMPLETED';
    } else if (filter === 'past') {
      return appointment.status === 'COMPLETED' || timeStatus === 'COMPLETED';
    } else if (filter === 'cancelled') {
      return appointment.status === 'CANCELLED';
    } else if (filter === 'paused') {
      return appointment.status === 'PAUSED';
    } else {
      return true;
    }
  });

  if (isLoading) {
    return (
      <div className={styles.appointments}>
        <div className={styles.appointments__loading}>
          <div className={styles.appointments__spinner}></div>
          <span>Loading appointments...</span>
        </div>
      </div>
    );
  }

  if (!filteredAppointments || filteredAppointments.length === 0) {
    return (
      <div className={styles.appointments}>
        <div className={styles.appointments__header}>
          <h2 className={styles.appointments__title}>
            {filter === 'upcoming'
              ? 'Upcoming'
              : filter === 'past'
                ? 'Past'
                : filter === 'cancelled'
                  ? 'Cancelled'
                  : filter === 'paused'
                    ? 'Paused'
                    : 'All'}{' '}
            Appointments
            <span className={styles.appointments__count}>0</span>
          </h2>

          {/* Filter tabs */}
          <div className={styles.appointments__filters}>
            <button
              className={`${styles.appointments__filterBtn} ${filter === 'upcoming' ? styles.appointments__filterBtn_active : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${filter === 'past' ? styles.appointments__filterBtn_active : ''}`}
              onClick={() => setFilter('past')}
            >
              Past
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${filter === 'cancelled' ? styles.appointments__filterBtn_active : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Cancelled
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${filter === 'paused' ? styles.appointments__filterBtn_active : ''}`}
              onClick={() => setFilter('paused')}
            >
              Paused
            </button>
            <button
              className={`${styles.appointments__filterBtn} ${filter === 'all' ? styles.appointments__filterBtn_active : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
          </div>
        </div>

        <EmptyState 
          type={filter}
          onAction={() => console.log('Schedule service clicked')}
        />
      </div>
    );
  }

  return (
    <div className={styles.appointments}>
      <div className={styles.appointments__header}>
        <h2 className={styles.appointments__title}>
          {filter === 'upcoming'
            ? 'Upcoming'
            : filter === 'past'
              ? 'Past'
              : filter === 'cancelled'
                ? 'Cancelled'
                : filter === 'paused'
                  ? 'Paused'
                  : 'All'}{' '}
          Appointments
          <span className={styles.appointments__count}>
            {filteredAppointments.length}
          </span>
        </h2>

        {/* Filter tabs */}
        <div className={styles.appointments__filters}>
          <button
            className={`${styles.appointments__filterBtn} ${
              filter === 'upcoming'
                ? styles.appointments__filterBtn_active
                : ''
            }`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`${styles.appointments__filterBtn} ${
              filter === 'past' ? styles.appointments__filterBtn_active : ''
            }`}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
          <button
            className={`${styles.appointments__filterBtn} ${
              filter === 'cancelled'
                ? styles.appointments__filterBtn_active
                : ''
            }`}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
          <button
            className={`${styles.appointments__filterBtn} ${
              filter === 'paused' ? styles.appointments__filterBtn_active : ''
            }`}
            onClick={() => setFilter('paused')}
          >
            Paused
          </button>
          <button
            className={`${styles.appointments__filterBtn} ${
              filter === 'all' ? styles.appointments__filterBtn_active : ''
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
        </div>
      </div>

      <div className={styles.appointments__list}>
        {filteredAppointments.map((appointment) => {
          const {
            label: timeLeftLabel,
            isImminent,
            status,
          } = getTimeLeft(appointment.date);

          // Override the appointment status if it's completed based on time
          const displayStatus =
            status === 'COMPLETED' ? 'COMPLETED' : appointment.status;

          return (
            <motion.div
              key={appointment.id}
              className={styles.appointments__card}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay:
                  filteredAppointments.findIndex(
                    (a) => a.id === appointment.id
                  ) * 0.1,
              }}
            >
              <div className={styles.appointments__cardContent}>
                <div className={styles.appointments__mainInfo}>
                  <div
                    className={`${styles.appointments__serviceIcon} ${isImminent ? styles['appointments__serviceIcon--imminent'] : ''}`}
                  >
                    <Icon name={getServiceIcon(appointment.service?.name)} />
                  </div>

                  <div className={styles.appointments__infoContainer}>
                    <div className={styles.appointments__infoRow}>
                      <h3 className={styles.appointments__service}>
                        {appointment.service?.name || 'Service'}
                      </h3>
                      <span
                        className={`${styles.appointments__status} ${
                          styles[
                            `appointments__status--${displayStatus.toLowerCase()}`
                          ]
                        }`}
                      >
                        {displayStatus.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div className={styles.appointments__infoRow}>
                      <div className={styles.appointments__dateTime}>
                        <span className={styles.appointments__date}>
                          <Icon name="calendar" />
                          {formatDate(appointment.date)}
                        </span>
                        <span className={styles.appointments__time}>
                          <Icon name="clock" />
                          {formatTime(appointment.timeSlot)}
                        </span>
                      </div>

                      <span
                        className={`${styles.appointments__countdown} ${
                          isImminent
                            ? styles['appointments__countdown--imminent']
                            : ''
                        } ${
                          displayStatus === 'COMPLETED'
                            ? styles['appointments__countdown--completed']
                            : ''
                        }`}
                      >
                        {timeLeftLabel}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className={styles.appointments__expandBtn}
                  onClick={() => toggleAppointment(appointment.id)}
                  aria-label={
                    expandedAppointment === appointment.id
                      ? 'Hide details'
                      : 'Show details'
                  }
                >
                  <Icon
                    name={
                      expandedAppointment === appointment.id
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                  />
                </button>
              </div>

              <AnimatePresence>
                {expandedAppointment === appointment.id && (
                  <motion.div
                    className={styles.appointments__details}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.appointments__detailsGrid}>
                      <div className={styles.appointments__detailsColumn}>
                        <div className={styles.appointments__detailsSection}>
                          <h4 className={styles.appointments__detailsTitle}>
                            <Icon name="user" />
                            Service Provider
                          </h4>
                          {appointment.staff ? (
                            <div className={styles.appointments__provider}>
                              <div
                                className={
                                  styles.appointments__providerAvatar
                                }
                              >
                                <span>
                                  {appointment.staff.firstName?.[0]}
                                  {appointment.staff.lastName?.[0]}
                                </span>
                              </div>
                              <div
                                className={styles.appointments__providerInfo}
                              >
                                <span
                                  className={
                                    styles.appointments__providerName
                                  }
                                >
                                  {`${appointment.staff.firstName} ${appointment.staff.lastName}`}
                                </span>
                                <span
                                  className={
                                    styles.appointments__providerRole
                                  }
                                >
                                  Professional {appointment.service?.name}{" "}
                                  Specialist
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className={styles.appointments__unassigned}>
                              <Icon name="alert-circle" />
                              Provider will be assigned soon
                            </div>
                          )}
                        </div>

                        <div className={styles.appointments__detailsSection}>
                          <h4 className={styles.appointments__detailsTitle}>
                            <Icon name="map-pin" />
                            Service Location
                          </h4>
                          <address className={styles.appointments__address}>
                            {`${appointment.address.street}, ${appointment.address.city}, ${appointment.address.state} ${appointment.address.zipCode}`}
                          </address>
                        </div>
                      </div>

                      <div className={styles.appointments__detailsColumn}>
                        <div className={styles.appointments__detailsSection}>
                          <h4 className={styles.appointments__detailsTitle}>
                            <Icon name="info" />
                            Additional Information
                          </h4>
                          <div className={styles.appointments__notes}>
                            {appointment.notes ||
                              "No additional notes for this service."}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.appointments__actions}>
                      {appointment.status === 'PENDING' ? (
                        <>
                          <button
                            className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--reschedule"]}`}
                            onClick={() => console.log('Reschedule clicked')}
                          >
                            <Icon name="calendar" />
                            Reschedule
                          </button>
                          <button
                            className={`${styles.appointments__actionBtn} ${styles["appointments__actionBtn--cancel"]}`}
                            onClick={() => console.log('Cancel clicked')}
                          >
                            <Icon name="x" />
                            Cancel
                          </button>
                        </>
                      ) : null}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {filteredAppointments.length > 5 && (
        <div className={styles.appointments__footer}>
          <button
            className={styles.appointments__viewAllBtn}
            onClick={() => console.log('View all clicked')}
          >
            Show All Appointments ({filteredAppointments.length})
            <Icon name="chevron-down" />
          </button>
        </div>
      )}
    </div>
  );
}