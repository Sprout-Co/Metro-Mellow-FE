'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './ServiceManagement.module.scss';

// Sample service data
const services = [
  {
    id: 'service1',
    name: 'Weekly Home Cleaning',
    type: 'cleaning',
    status: 'active',
    schedule: 'Every Monday at 9:00 AM',
    nextDate: '2025-03-18',
    frequency: 'weekly',
    price: 120,
    provider: 'Sarah Johnson',
    property: 'Main Residence',
    lastService: '2025-03-11',
    upcoming: [
      { date: '2025-03-18', time: '09:00 AM - 11:30 AM' },
      { date: '2025-03-25', time: '09:00 AM - 11:30 AM' }
    ]
  },
  {
    id: 'service2',
    name: 'Bi-weekly Laundry Service',
    type: 'laundry',
    status: 'active',
    schedule: 'Every other Wednesday at 2:00 PM',
    nextDate: '2025-03-26',
    frequency: 'bi-weekly',
    price: 75,
    provider: 'Michael Chen',
    property: 'Main Residence',
    lastService: '2025-03-12',
    upcoming: [
      { date: '2025-03-26', time: '02:00 PM - 03:00 PM' }
    ]
  },
  {
    id: 'service3',
    name: 'Monthly Pest Control',
    type: 'pest-control',
    status: 'paused',
    schedule: 'First Friday of each month at 10:00 AM',
    nextDate: null,
    frequency: 'monthly',
    price: 90,
    provider: 'Robert Wilson',
    property: 'Vacation Home',
    lastService: '2025-02-07',
    upcoming: []
  }
];

type ServiceFilterType = 'all' | 'active' | 'paused';
type ServiceSortType = 'name' | 'date' | 'price';

export default function ServiceManagement() {
  const [filter, setFilter] = useState<ServiceFilterType>('all');
  const [sort, setSort] = useState<ServiceSortType>('date');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'cleaning':
        return 'home';
      case 'laundry':
        return 'refresh-cw';
      case 'cooking':
        return 'coffee';
      case 'pest-control':
        return 'shield';
      default:
        return 'package';
    }
  };
  
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Not scheduled';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const toggleService = (id: string) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
    }
  };
  
  const filterServices = () => {
    let filtered = [...services];
    
    if (filter !== 'all') {
      filtered = filtered.filter(service => service.status === filter);
    }
    
    switch (sort) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        filtered.sort((a, b) => {
          if (!a.nextDate) return 1;
          if (!b.nextDate) return -1;
          return new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime();
        });
        break;
      case 'price':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }
    
    return filtered;
  };
  
  const filteredServices = filterServices();
  
  return (
    <div className={styles.services}>
      <header className={styles.services__header}>
        <div>
          <h1 className={styles.services__title}>Service Management</h1>
          <p className={styles.services__subtitle}>
            View and manage all your scheduled services
          </p>
        </div>
        
        <button className={styles.services__addBtn}>
          <Icon name="plus" />
          Book New Service
        </button>
      </header>
      
      <div className={styles.services__toolbar}>
        <div className={styles.services__filters}>
          <button 
            className={`${styles.services__filterBtn} ${filter === 'all' ? styles['services__filterBtn--active'] : ''}`}
            onClick={() => setFilter('all')}
          >
            All Services
          </button>
          <button 
            className={`${styles.services__filterBtn} ${filter === 'active' ? styles['services__filterBtn--active'] : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`${styles.services__filterBtn} ${filter === 'paused' ? styles['services__filterBtn--active'] : ''}`}
            onClick={() => setFilter('paused')}
          >
            Paused
          </button>
        </div>
        
        <div className={styles.services__sort}>
          <label htmlFor="sort" className={styles.services__sortLabel}>
            Sort by:
          </label>
          <select 
            id="sort" 
            className={styles.services__sortSelect}
            value={sort}
            onChange={(e) => setSort(e.target.value as ServiceSortType)}
          >
            <option value="date">Next Service Date</option>
            <option value="name">Service Name</option>
            <option value="price">Price (High to Low)</option>
          </select>
        </div>
      </div>
      
      {filteredServices.length > 0 ? (
        <div className={styles.services__list}>
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              className={styles.services__card}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={styles.services__cardHeader}
                onClick={() => toggleService(service.id)}
              >
                <div className={`${styles.services__iconWrapper} ${styles[`services__iconWrapper--${service.type}`]}`}>
                  <Icon name={getServiceIcon(service.type)} />
                </div>
                
                <div className={styles.services__details}>
                  <h3 className={styles.services__name}>{service.name}</h3>
                  <p className={styles.services__schedule}>{service.schedule}</p>
                </div>
                
                <div className={styles.services__meta}>
                  <span 
                    className={`${styles.services__status} ${styles[`services__status--${service.status}`]}`}
                  >
                    {service.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                  <div className={styles.services__next}>
                    <span className={styles.services__nextLabel}>Next:</span>
                    <span className={styles.services__nextDate}>
                      {formatDate(service.nextDate)}
                    </span>
                  </div>
                  <button className={styles.services__expandBtn}>
                    <Icon name={expandedService === service.id ? 'chevron-up' : 'chevron-down'} />
                  </button>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedService === service.id && (
                  <motion.div
                    className={styles.services__cardContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.services__infoGrid}>
                      <div className={styles.services__infoSection}>
                        <h4 className={styles.services__infoTitle}>
                          <Icon name="info" />
                          Service Details
                        </h4>
                        <div className={styles.services__infoList}>
                          <div className={styles.services__infoItem}>
                            <span className={styles.services__infoLabel}>Frequency:</span>
                            <span className={styles.services__infoValue}>
                              {service.frequency.charAt(0).toUpperCase() + service.frequency.slice(1)}
                            </span>
                          </div>
                          <div className={styles.services__infoItem}>
                            <span className={styles.services__infoLabel}>Price:</span>
                            <span className={styles.services__infoValue}>${service.price} per service</span>
                          </div>
                          <div className={styles.services__infoItem}>
                            <span className={styles.services__infoLabel}>Last Service:</span>
                            <span className={styles.services__infoValue}>{formatDate(service.lastService)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.services__infoSection}>
                        <h4 className={styles.services__infoTitle}>
                          <Icon name="map-pin" />
                          Location & Provider
                        </h4>
                        <div className={styles.services__infoList}>
                          <div className={styles.services__infoItem}>
                            <span className={styles.services__infoLabel}>Property:</span>
                            <span className={styles.services__infoValue}>{service.property}</span>
                          </div>
                          <div className={styles.services__infoItem}>
                            <span className={styles.services__infoLabel}>Provider:</span>
                            <span className={styles.services__infoValue}>{service.provider}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.services__upcomingSection}>
                      <h4 className={styles.services__infoTitle}>
                        <Icon name="calendar" />
                        Upcoming Appointments
                      </h4>
                      
                      {service.upcoming.length > 0 ? (
                        <div className={styles.services__upcomingList}>
                          {service.upcoming.map((appointment, index) => (
                            <div key={index} className={styles.services__upcomingItem}>
                              <div className={styles.services__upcomingDate}>
                                <Icon name="calendar" />
                                {formatDate(appointment.date)}
                              </div>
                              <div className={styles.services__upcomingTime}>
                                <Icon name="clock" />
                                {appointment.time}
                              </div>
                              <div className={styles.services__upcomingActions}>
                                <button className={styles.services__upcomingBtn}>
                                  <Icon name="edit-2" />
                                  Reschedule
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className={styles.services__noUpcoming}>No upcoming appointments scheduled</p>
                      )}
                    </div>
                    
                    <div className={styles.services__actions}>
                      {service.status === 'active' ? (
                        <button className={styles.services__actionBtn}>
                          <Icon name="pause" />
                          Pause Service
                        </button>
                      ) : (
                        <button className={`${styles.services__actionBtn} ${styles['services__actionBtn--resume']}`}>
                          <Icon name="play" />
                          Resume Service
                        </button>
                      )}
                      <button className={styles.services__actionBtn}>
                        <Icon name="edit" />
                        Edit Service
                      </button>
                      <button className={`${styles.services__actionBtn} ${styles['services__actionBtn--cancel']}`}>
                        <Icon name="x" />
                        Cancel Service
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={styles.services__empty}>
          <div className={styles.services__emptyIcon}>
            <Icon name="calendar" />
          </div>
          <h3 className={styles.services__emptyTitle}>No Services Found</h3>
          <p className={styles.services__emptyText}>
            {filter !== 'all' 
              ? `You don't have any ${filter} services at the moment.` 
              : "You haven't booked any services yet. Get started by booking your first service."}
          </p>
          <button className={styles.services__emptyBtn}>
            Book a Service
            <Icon name="arrow-right" />
          </button>
        </div>
      )}
    </div>
  );
}