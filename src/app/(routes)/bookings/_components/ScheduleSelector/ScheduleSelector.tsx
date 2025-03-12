// components/booking/ScheduleSelector.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ScheduleSelector.module.scss';

// Generate dates for the next 14 days
const generateDates = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

const availableDates = Array.from({ length: 14 }, (_, i) => ({
  date: generateDates(i),
  available: Math.random() > 0.3, // Randomly mark some dates as unavailable for demo
}));

// Generate time slots
const generateTimeSlots = () => {
  const slots = [];
  
  for (let hour = 8; hour <= 17; hour++) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? 'AM' : 'PM';
    
    if (hour !== 12) { // No 12:30 slot
      slots.push({
        id: `${hour}:00`,
        time: `${formattedHour}:00 ${period}`,
        available: Math.random() > 0.3,
      });
    }
    
    if (hour !== 17) { // No 5:30 PM slot
      slots.push({
        id: `${hour}:30`,
        time: `${formattedHour}:30 ${period}`,
        available: Math.random() > 0.3,
      });
    }
  }
  
  return slots;
};

const timeSlots = generateTimeSlots();

// Generate professional options
const professionals = [
  { id: 'any', name: 'Any Available Professional', avatar: '👤', bio: 'Let us assign the best available professional for you' },
  { id: 'maria', name: 'Maria Santiago', avatar: '👩', bio: '4.9 ★ • 120+ services • Expert in cleaning & organization' },
  { id: 'james', name: 'James Wilson', avatar: '👨', bio: '4.8 ★ • 85+ services • Specializes in deep cleaning' },
  { id: 'aisha', name: 'Aisha Patel', avatar: '👩', bio: '4.9 ★ • 150+ services • Culinary expert' },
];

export default function ScheduleSelector() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPro, setSelectedPro] = useState<string>('any');
  const [showRecurring, setShowRecurring] = useState<boolean>(false);
  
  const handleDateClick = (date: Date, available: boolean) => {
    if (available) {
      setSelectedDate(date);
      setSelectedTime(null); // Reset time when date changes
    }
  };
  
  const handleTimeClick = (timeId: string, available: boolean) => {
    if (available) {
      setSelectedTime(timeId);
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  const getMonthDayString = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <section className={styles.schedule}>
      <div className={styles.schedule__container}>
        <motion.div 
          className={styles.schedule__content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.schedule__header}>
            <h2 className={styles.schedule__title}>Select Your Schedule</h2>
            <p className={styles.schedule__description}>
              Choose your preferred date, time, and professional
            </p>
          </div>
          
          <div className={styles.schedule__grid}>
            <div className={styles.schedule__card}>
              <h3 className={styles.schedule__cardTitle}>
                <span className={styles.schedule__cardIcon}>📅</span>
                Select Date
              </h3>
              
              <div className={styles.schedule__dateScroller}>
                {availableDates.map((dateObj, index) => (
                  <div 
                    key={index}
                    className={`
                      ${styles.schedule__dateCard} 
                      ${!dateObj.available ? styles['schedule__dateCard--unavailable'] : ''}
                      ${selectedDate && selectedDate.getTime() === dateObj.date.getTime() ? styles['schedule__dateCard--selected'] : ''}
                    `}
                    onClick={() => handleDateClick(dateObj.date, dateObj.available)}
                  >
                    <div className={styles.schedule__dayName}>
                      {isToday(dateObj.date) ? 'Today' : getDayName(dateObj.date)}
                    </div>
                    <div className={styles.schedule__dayNumber}>
                      {dateObj.date.getDate()}
                    </div>
                    <div className={styles.schedule__monthName}>
                      {dateObj.date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.schedule__card}>
              <h3 className={styles.schedule__cardTitle}>
                <span className={styles.schedule__cardIcon}>⏰</span>
                Select Time
              </h3>
              
              {selectedDate ? (
                <div className={styles.schedule__timeGrid}>
                  {timeSlots.map((slot) => (
                    <div 
                      key={slot.id}
                      className={`
                        ${styles.schedule__timeSlot} 
                        ${!slot.available ? styles['schedule__timeSlot--unavailable'] : ''}
                        ${selectedTime === slot.id ? styles['schedule__timeSlot--selected'] : ''}
                      `}
                      onClick={() => handleTimeClick(slot.id, slot.available)}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.schedule__placeholder}>
                  <div className={styles.schedule__placeholderIcon}>⏸️</div>
                  <p className={styles.schedule__placeholderText}>
                    Please select a date first to see available times
                  </p>
                </div>
              )}
            </div>
            
            <div className={styles.schedule__card}>
              <h3 className={styles.schedule__cardTitle}>
                <span className={styles.schedule__cardIcon}>👤</span>
                Select Professional (Optional)
              </h3>
              
              <div className={styles.schedule__proOptions}>
                {professionals.map((pro) => (
                  <div 
                    key={pro.id}
                    className={`
                      ${styles.schedule__proCard} 
                      ${selectedPro === pro.id ? styles['schedule__proCard--selected'] : ''}
                    `}
                    onClick={() => setSelectedPro(pro.id)}
                  >
                    <div className={styles.schedule__proAvatar}>{pro.avatar}</div>
                    <div className={styles.schedule__proInfo}>
                      <div className={styles.schedule__proName}>{pro.name}</div>
                      <div className={styles.schedule__proBio}>{pro.bio}</div>
                    </div>
                    <div className={styles.schedule__proSelect}>
                      <div className={styles.schedule__proRadio}>
                        <div className={`
                          ${styles.schedule__proRadioInner}
                          ${selectedPro === pro.id ? styles['schedule__proRadioInner--active'] : ''}
                        `}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={styles.schedule__recurring}>
            <div className={styles.schedule__recurringHeader}>
              <div className={styles.schedule__recurringToggle}>
                <label className={styles.schedule__toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={showRecurring} 
                    onChange={(e) => setShowRecurring(e.target.checked)}
                  />
                  <span className={styles.schedule__toggleSlider}></span>
                </label>
                <span className={styles.schedule__recurringLabel}>
                  Set up recurring schedule
                </span>
              </div>
            </div>
            
            {showRecurring && (
              <motion.div 
                className={styles.schedule__recurringOptions}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <p className={styles.schedule__recurringText}>
                  Your recurring services will be scheduled on the same day of the week and time as your first appointment.
                </p>
                
                <div className={styles.schedule__recurringSelects}>
                  <div className={styles.schedule__recurringSelect}>
                    <label className={styles.schedule__recurringLabel}>Frequency</label>
                    <select className={styles.schedule__select}>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div className={styles.schedule__recurringSelect}>
                    <label className={styles.schedule__recurringLabel}>Duration</label>
                    <select className={styles.schedule__select}>
                      <option value="3months">3 months</option>
                      <option value="6months">6 months</option>
                      <option value="12months">12 months</option>
                      <option value="ongoing">Ongoing</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className={styles.schedule__summary}>
            {selectedDate && selectedTime ? (
              <div className={styles.schedule__selected}>
                <div className={styles.schedule__selectedIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11.1755C19.9385 11.1755 19.877 11.1755 19.8155 11.1755C18.3755 11.1755 17.2104 9.93999 17.2104 8.47036C17.2104 7.00074 18.3755 5.93099 19.8155 5.93099C19.877 5.93099 19.9385 5.93099 20 5.93099V3.93762C20 3.10538 19.3532 2.44049 18.5393 2.44049H3.46068C2.64677 2.44049 2 3.10538 2 3.93762V11.1755H20Z" fill="currentColor"/>
                    <path d="M2 12.8245V18.0624C2 18.8946 2.64677 19.5595 3.46068 19.5595H18.5393C19.3532 19.5595 20 18.8946 20 18.0624V12.8245H2Z" fill="currentColor"/>
                    <path d="M8.87891 15.5011C8.87891 16.1029 8.40024 16.5997 7.81645 16.5997C7.23267 16.5997 6.754 16.1029 6.754 15.5011C6.754 14.8993 7.23267 14.4025 7.81645 14.4025C8.40024 14.4025 8.87891 14.8993 8.87891 15.5011Z" fill="currentColor"/>
                    <path d="M12.877 15.5011C12.877 16.1029 12.3983 16.5997 11.8145 16.5997C11.2307 16.5997 10.752 16.1029 10.752 15.5011C10.752 14.8993 11.2307 14.4025 11.8145 14.4025C12.3983 14.4025 12.877 14.8993 12.877 15.5011Z" fill="currentColor"/>
                    <path d="M16.875 15.5011C16.875 16.1029 16.3964 16.5997 15.8126 16.5997C15.2288 16.5997 14.7501 16.1029 14.7501 15.5011C14.7501 14.8993 15.2288 14.4025 15.8126 14.4025C16.3964 14.4025 16.875 14.8993 16.875 15.5011Z" fill="currentColor"/>
                    <path d="M8.87891 8.43889C8.87891 9.04066 8.40024 9.53749 7.81645 9.53749C7.23267 9.53749 6.754 9.04066 6.754 8.43889C6.754 7.83712 7.23267 7.34029 7.81645 7.34029C8.40024 7.34029 8.87891 7.83712 8.87891 8.43889Z" fill="currentColor"/>
                    <path d="M12.877 8.43889C12.877 9.04066 12.3983 9.53749 11.8145 9.53749C11.2307 9.53749 10.752 9.04066 10.752 8.43889C10.752 7.83712 11.2307 7.34029 11.8145 7.34029C12.3983 7.34029 12.877 7.83712 12.877 8.43889Z" fill="currentColor"/>
                    <path d="M22 8.00049C22 10.2097 20.1996 12.0005 18 12.0005C15.8004 12.0005 14 10.2097 14 8.00049C14 5.79128 15.8004 4.00049 18 4.00049C20.1996 4.00049 22 5.79128 22 8.00049Z" fill="currentColor"/>
                    <path d="M19.0002 7.39943L17.9502 6.34943L17.1002 7.19943L19.0002 9.09943L21.5002 6.19943L20.6502 5.39943L19.0002 7.39943Z" fill="white"/>
                  </svg>
                </div>
                <div className={styles.schedule__selectedText}>
                  <strong>Selected Date & Time:</strong> {selectedDate && formatDate(selectedDate)} at {selectedTime && timeSlots.find(slot => slot.id === selectedTime)?.time}
                </div>
              </div>
            ) : (
              <div className={styles.schedule__notSelected}>
                <div className={styles.schedule__notSelectedIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.29431 13.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.schedule__notSelectedText}>
                  Please select a date and time to continue
                </div>
              </div>
            )}
            
            <motion.button 
              className={styles.schedule__button}
              disabled={!selectedDate || !selectedTime}
              whileHover={selectedDate && selectedTime ? { scale: 1.05 } : undefined}
              whileTap={selectedDate && selectedTime ? { scale: 0.95 } : undefined}
            >
              Continue to Summary
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}