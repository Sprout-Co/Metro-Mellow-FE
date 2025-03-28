'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Icon from '../common/Icon';
import styles from './AccountSettings.module.scss';

type TabType = 'profile' | 'security' | 'notifications' | 'preferences';

// Sample user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: '/avatars/john.jpg',
  address: {
    street: '123 Main Street',
    apt: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States'
  },
  notifications: {
    email: {
      marketing: false,
      serviceReminders: true,
      feedback: true,
      updates: true
    },
    sms: {
      serviceReminders: true,
      providerArrival: true,
      promotions: false
    },
    push: {
      serviceReminders: true,
      providerArrival: true,
      chat: true,
      updates: true,
      promotions: false
    }
  },
  preferences: {
    language: 'en',
    timeFormat: '12h',
    providerGender: 'no-preference',
    serviceRemindersTime: '24h'
  }
};

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className={styles.settings}>
      <header className={styles.settings__header}>
        <div>
          <h1 className={styles.settings__title}>Account Settings</h1>
          <p className={styles.settings__subtitle}>
            Manage your personal information and preferences
          </p>
        </div>
      </header>
      
      <div className={styles.settings__content}>
        <div className={styles.settings__sidebar}>
          <button 
            className={`${styles.settings__tab} ${activeTab === 'profile' ? styles['settings__tab--active'] : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Icon name="user" className={styles.settings__tabIcon} />
            <span className={styles.settings__tabLabel}>Profile Information</span>
          </button>
          <button 
            className={`${styles.settings__tab} ${activeTab === 'security' ? styles['settings__tab--active'] : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Icon name="shield" className={styles.settings__tabIcon} />
            <span className={styles.settings__tabLabel}>Security</span>
          </button>
          <button 
            className={`${styles.settings__tab} ${activeTab === 'notifications' ? styles['settings__tab--active'] : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Icon name="bell" className={styles.settings__tabIcon} />
            <span className={styles.settings__tabLabel}>Notifications</span>
          </button>
          <button 
            className={`${styles.settings__tab} ${activeTab === 'preferences' ? styles['settings__tab--active'] : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <Icon name="settings" className={styles.settings__tabIcon} />
            <span className={styles.settings__tabLabel}>Preferences</span>
          </button>
        </div>
        
        <div className={styles.settings__main}>
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.settings__tabContent}
              >
                <div className={styles.settings__sectionHeader}>
                  <h2 className={styles.settings__sectionTitle}>Profile Information</h2>
                  <button 
                    className={styles.settings__editBtn}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                
                <div className={styles.settings__profile}>
                  <div className={styles.settings__profileHeader}>
                    <div className={styles.settings__avatar}>
                      {userData.avatar ? (
                        <Image 
                          src={userData.avatar} 
                          alt={userData.name} 
                          width={100} 
                          height={100}
                          className={styles.settings__avatarImg}
                        />
                      ) : (
                        <div className={styles.settings__avatarPlaceholder}>
                          {userData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      
                      {isEditing && (
                        <button className={styles.settings__avatarEdit}>
                          <Icon name="camera" />
                        </button>
                      )}
                    </div>
                    
                    <div className={styles.settings__profileInfo}>
                      <h3 className={styles.settings__profileName}>{userData.name}</h3>
                      <p className={styles.settings__profileEmail}>{userData.email}</p>
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <form className={styles.settings__form}>
                      <div className={styles.settings__formGroup}>
                        <label htmlFor="fullName" className={styles.settings__formLabel}>
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          id="fullName" 
                          className={styles.settings__formInput}
                          defaultValue={userData.name}
                        />
                      </div>
                      
                      <div className={styles.settings__formGroup}>
                        <label htmlFor="email" className={styles.settings__formLabel}>
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          className={styles.settings__formInput}
                          defaultValue={userData.email}
                        />
                      </div>
                      
                      <div className={styles.settings__formGroup}>
                        <label htmlFor="phone" className={styles.settings__formLabel}>
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className={styles.settings__formInput}
                          defaultValue={userData.phone}
                        />
                      </div>
                      
                      <h3 className={styles.settings__formSubtitle}>Address</h3>
                      
                      <div className={styles.settings__formRow}>
                        <div className={styles.settings__formGroup}>
                          <label htmlFor="street" className={styles.settings__formLabel}>
                            Street Address
                          </label>
                          <input 
                            type="text" 
                            id="street" 
                            className={styles.settings__formInput}
                            defaultValue={userData.address.street}
                          />
                        </div>
                        
                        <div className={styles.settings__formGroup}>
                          <label htmlFor="apt" className={styles.settings__formLabel}>
                            Apt/Suite
                          </label>
                          <input 
                            type="text" 
                            id="apt" 
                            className={styles.settings__formInput}
                            defaultValue={userData.address.apt}
                          />
                        </div>
                      </div>
                      
                      <div className={styles.settings__formRow}>
                        <div className={styles.settings__formGroup}>
                          <label htmlFor="city" className={styles.settings__formLabel}>
                            City
                          </label>
                          <input 
                            type="text" 
                            id="city" 
                            className={styles.settings__formInput}
                            defaultValue={userData.address.city}
                          />
                        </div>
                        
                        <div className={styles.settings__formGroup}>
                          <label htmlFor="state" className={styles.settings__formLabel}>
                            State
                          </label>
                          <input 
                            type="text" 
                            id="state" 
                            className={styles.settings__formInput}
                            defaultValue={userData.address.state}
                          />
                        </div>
                      </div>
                      
                      <div className={styles.settings__formRow}>
                        <div className={styles.settings__formGroup}>
                          <label htmlFor="zip" className={styles.settings__formLabel}>
                            ZIP Code
                          </label>
                          <input 
                            type="text" 
                            id="zip" 
                            className={styles.settings__formInput}
                            defaultValue={userData.address.zip}
                          />
                        </div>
                        
                        <div className={styles.settings__formGroup}>
                          <label htmlFor="country" className={styles.settings__formLabel}>
                            Country
                          </label>
                          <input 
                            type="text" 
                            id="country" 
                            className={styles.settings__formInput}
                            defaultValue={userData.address.country}
                          />
                        </div>
                      </div>
                      
                      <div className={styles.settings__formActions}>
                        <button 
                          type="button" 
                          className={styles.settings__formCancel}
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                        <button 
                          type="button" 
                          className={styles.settings__formSubmit}
                          onClick={() => setIsEditing(false)}
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className={styles.settings__profileDetails}>
                      <div className={styles.settings__profileSection}>
                        <h3 className={styles.settings__profileSectionTitle}>Contact Information</h3>
                        <div className={styles.settings__profileDetail}>
                          <span className={styles.settings__profileLabel}>Email:</span>
                          <span className={styles.settings__profileValue}>{userData.email}</span>
                        </div>
                        <div className={styles.settings__profileDetail}>
                          <span className={styles.settings__profileLabel}>Phone:</span>
                          <span className={styles.settings__profileValue}>{userData.phone}</span>
                        </div>
                      </div>
                      
                      <div className={styles.settings__profileSection}>
                        <h3 className={styles.settings__profileSectionTitle}>Address</h3>
                        <div className={styles.settings__profileDetail}>
                          <span className={styles.settings__profileLabel}>Street:</span>
                          <span className={styles.settings__profileValue}>{userData.address.street}</span>
                        </div>
                        <div className={styles.settings__profileDetail}>
                          <span className={styles.settings__profileLabel}>Apt/Suite:</span>
                          <span className={styles.settings__profileValue}>{userData.address.apt}</span>
                        </div>
                        <div className={styles.settings__profileDetail}>
                          <span className={styles.settings__profileLabel}>City:</span>
                          <span className={styles.settings__profileValue}>{userData.address.city}</span>
                        </div>
                        <div className={styles.settings__profileDetail}>
                          <span className={styles.settings__profileLabel}>State:</span>
                          <span className={styles.settings__profileValue}>{userData.address.state}</span>
                        </div>
                        <div className={styles.settings__profileDetail}>
                          <span className={styles.settings__profileLabel}>ZIP Code:</span>
                          <span className={styles.settings__profileValue}>{userData.address.zip}</span>
                        </div>
                        <div className={styles.settings__profileDetail}>
                          <span className={styles.settings__profileLabel}>Country:</span>
                          <span className={styles.settings__profileValue}>{userData.address.country}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.settings__tabContent}
              >
                <div className={styles.settings__sectionHeader}>
                  <h2 className={styles.settings__sectionTitle}>Security Settings</h2>
                </div>
                
                <div className={styles.settings__security}>
                  <div className={styles.settings__securitySection}>
                    <h3 className={styles.settings__securityTitle}>Change Password</h3>
                    <form className={styles.settings__form}>
                      <div className={styles.settings__formGroup}>
                        <label htmlFor="currentPassword" className={styles.settings__formLabel}>
                          Current Password
                        </label>
                        <input 
                          type="password" 
                          id="currentPassword" 
                          className={styles.settings__formInput}
                          placeholder="Enter your current password"
                        />
                      </div>
                      
                      <div className={styles.settings__formGroup}>
                        <label htmlFor="newPassword" className={styles.settings__formLabel}>
                          New Password
                        </label>
                        <input 
                          type="password" 
                          id="newPassword" 
                          className={styles.settings__formInput}
                          placeholder="Enter your new password"
                        />
                      </div>
                      
                      <div className={styles.settings__formGroup}>
                        <label htmlFor="confirmPassword" className={styles.settings__formLabel}>
                          Confirm New Password
                        </label>
                        <input 
                          type="password" 
                          id="confirmPassword" 
                          className={styles.settings__formInput}
                          placeholder="Confirm your new password"
                        />
                      </div>
                      
                      <button type="button" className={styles.settings__updateBtn}>
                        Update Password
                      </button>
                    </form>
                  </div>
                  
                  <div className={styles.settings__securitySection}>
                    <h3 className={styles.settings__securityTitle}>Two-Factor Authentication</h3>
                    <p className={styles.settings__securityDescription}>
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    
                    <div className={styles.settings__securityToggle}>
                      <label className={styles.settings__toggle}>
                        <input type="checkbox" className={styles.settings__toggleInput} />
                        <span className={styles.settings__toggleSlider}></span>
                      </label>
                      <span className={styles.settings__toggleLabel}>Enable Two-Factor Authentication</span>
                    </div>
                  </div>
                  
                  <div className={styles.settings__securitySection}>
                    <h3 className={styles.settings__securityTitle}>Login Sessions</h3>
                    <p className={styles.settings__securityDescription}>
                      These are devices that have logged into your account. Revoke any sessions that you don't recognize.
                    </p>
                    
                    <div className={styles.settings__sessions}>
                      <div className={styles.settings__session}>
                        <div className={styles.settings__sessionInfo}>
                          <div className={styles.settings__sessionDevice}>
                            <Icon name="smartphone" />
                            <span>iPhone 14 Pro • New York</span>
                          </div>
                          <div className={styles.settings__sessionMeta}>
                            <span className={styles.settings__sessionCurrent}>Current session</span>
                            <span className={styles.settings__sessionTime}>Last active: Just now</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.settings__session}>
                        <div className={styles.settings__sessionInfo}>
                          <div className={styles.settings__sessionDevice}>
                            <Icon name="monitor" />
                            <span>MacBook Pro • New York</span>
                          </div>
                          <div className={styles.settings__sessionMeta}>
                            <span className={styles.settings__sessionTime}>Last active: Yesterday</span>
                          </div>
                        </div>
                        <button className={styles.settings__sessionRevoke}>
                          <Icon name="x-circle" />
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.settings__tabContent}
              >
                <div className={styles.settings__sectionHeader}>
                  <h2 className={styles.settings__sectionTitle}>Notification Settings</h2>
                </div>
                
                <div className={styles.settings__notificationSection}>
                  <h3 className={styles.settings__notificationTitle}>
                    <Icon name="mail" />
                    Email Notifications
                  </h3>
                  
                  <div className={styles.settings__notificationList}>
                    <div className={styles.settings__notificationItem}>
                      <div className={styles.settings__notificationInfo}>
                        <h4 className={styles.settings__notificationName}>Service Reminders</h4>
                        <p className={styles.settings__notificationDescription}>
                          Receive email reminders about upcoming services
                        </p>
                      </div>
                      <label className={styles.settings__toggle}>
                        <input 
                          type="checkbox" 
                          className={styles.settings__toggleInput}
                          defaultChecked={userData.notifications.email.serviceReminders}
                        />
                        <span className={styles.settings__toggleSlider}></span>
                      </label>
                    </div>
                    
                    <div className={styles.settings__notificationItem}>
                      <div className={styles.settings__notificationInfo}>
                        <h4 className={styles.settings__notificationName}>Feedback Requests</h4>
                        <p className={styles.settings__notificationDescription}>
                          Receive emails asking for feedback after services
                        </p>
                      </div>
                      <label className={styles.settings__toggle}>
                        <input 
                          type="checkbox" 
                          className={styles.settings__toggleInput}
                          defaultChecked={userData.notifications.email.feedback}
                        />
                        <span className={styles.settings__toggleSlider}></span>
                      </label>
                    </div>
                    
                    <div className={styles.settings__notificationItem}>
                      <div className={styles.settings__notificationInfo}>
                        <h4 className={styles.settings__notificationName}>Marketing & Promotions</h4>
                        <p className={styles.settings__notificationDescription}>
                          Receive emails about special offers and promotions
                        </p>
                      </div>
                      <label className={styles.settings__toggle}>
                        <input 
                          type="checkbox" 
                          className={styles.settings__toggleInput}
                          defaultChecked={userData.notifications.email.marketing}
                        />
                        <span className={styles.settings__toggleSlider}></span>
                      </label>
                    </div>
                    
                    <div className={styles.settings__notificationItem}>
                      <div className={styles.settings__notificationInfo}>
                        <h4 className={styles.settings__notificationName}>Updates & News</h4>
                        <p className={styles.settings__notificationDescription}>
                          Receive emails about new features and updates
                        </p>
                      </div>
                      <label className={styles.settings__toggle}>
                        <input 
                          type="checkbox" 
                          className={styles.settings__toggleInput}
                          defaultChecked={userData.notifications.email.updates}
                        />
                        <span className={styles.settings__toggleSlider}></span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className={styles.settings__notificationSection}>
                  <h3 className={styles.settings__notificationTitle}>
                    <Icon name="smartphone" />
                    SMS Notifications
                  </h3>
                  
                  <div className={styles.settings__notificationList}>
                    <div className={styles.settings__notificationItem}>
                      <div className={styles.settings__notificationInfo}>
                        <h4 className={styles.settings__notificationName}>Service Reminders</h4>
                        <p className={styles.settings__notificationDescription}>
                          Receive text message reminders about upcoming services
                        </p>
                      </div>
                      <label className={styles.settings__toggle}>
                        <input 
                          type="checkbox" 
                          className={styles.settings__toggleInput}
                          defaultChecked={userData.notifications.sms.serviceReminders}
                        />
                        <span className={styles.settings__toggleSlider}></span>
                      </label>
                    </div>
                    
                    <div className={styles.settings__notificationItem}>
                      <div className={styles.settings__notificationInfo}>
                        <h4 className={styles.settings__notificationName}>Provider Arrival</h4>
                        <p className={styles.settings__notificationDescription}>
                          Receive text messages when your service provider is on the way
                        </p>
                      </div>
                      <label className={styles.settings__toggle}>
                        <input 
                          type="checkbox" 
                          className={styles.settings__toggleInput}
                          defaultChecked={userData.notifications.sms.providerArrival}
                        />
                        <span className={styles.settings__toggleSlider}></span>
                      </label>
                    </div>
                    
                    <div className={styles.settings__notificationItem}>
                      <div className={styles.settings__notificationInfo}>
                        <h4 className={styles.settings__notificationName}>Promotions</h4>
                        <p className={styles.settings__notificationDescription}>
                          Receive text messages about special offers and promotions
                        </p>
                      </div>
                      <label className={styles.settings__toggle}>
                        <input 
                          type="checkbox" 
                          className={styles.settings__toggleInput}
                          defaultChecked={userData.notifications.sms.promotions}
                        />
                        <span className={styles.settings__toggleSlider}></span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.settings__tabContent}
              >
                <div className={styles.settings__sectionHeader}>
                  <h2 className={styles.settings__sectionTitle}>User Preferences</h2>
                </div>
                
                <div className={styles.settings__preferences}>
                  <div className={styles.settings__preferencesSection}>
                    <h3 className={styles.settings__preferencesTitle}>Display Settings</h3>
                    
                    <div className={styles.settings__preferenceItem}>
                      <div className={styles.settings__preferenceInfo}>
                        <h4 className={styles.settings__preferenceName}>Time Format</h4>
                        <p className={styles.settings__preferenceDescription}>
                          Choose how times are displayed across the platform
                        </p>
                      </div>
                      <div className={styles.settings__preferenceControl}>
                        <div className={styles.settings__radioGroup}>
                          <label className={styles.settings__radio}>
                            <input 
                              type="radio" 
                              name="timeFormat" 
                              value="12h"
                              defaultChecked={userData.preferences.timeFormat === '12h'}
                            />
                            <span className={styles.settings__radioLabel}>12-hour (1:30 PM)</span>
                          </label>
                          <label className={styles.settings__radio}>
                            <input 
                              type="radio" 
                              name="timeFormat" 
                              value="24h"
                              defaultChecked={userData.preferences.timeFormat === '24h'}
                            />
                            <span className={styles.settings__radioLabel}>24-hour (13:30)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.settings__preferencesSection}>
                    <h3 className={styles.settings__preferencesTitle}>Service Preferences</h3>
                    
                    <div className={styles.settings__preferenceItem}>
                      <div className={styles.settings__preferenceInfo}>
                        <h4 className={styles.settings__preferenceName}>Provider Gender Preference</h4>
                        <p className={styles.settings__preferenceDescription}>
                          Choose your preference for service providers
                        </p>
                      </div>
                      <div className={styles.settings__preferenceControl}>
                        <select 
                          className={styles.settings__select}
                          defaultValue={userData.preferences.providerGender}
                        >
                          <option value="no-preference">No Preference</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className={styles.settings__preferenceItem}>
                      <div className={styles.settings__preferenceInfo}>
                        <h4 className={styles.settings__preferenceName}>Service Reminder Time</h4>
                        <p className={styles.settings__preferenceDescription}>
                          How far in advance you want to be reminded about upcoming services
                        </p>
                      </div>
                      <div className={styles.settings__preferenceControl}>
                        <select 
                          className={styles.settings__select}
                          defaultValue={userData.preferences.serviceRemindersTime}
                        >
                          <option value="1h">1 hour before</option>
                          <option value="3h">3 hours before</option>
                          <option value="12h">12 hours before</option>
                          <option value="24h">24 hours before</option>
                          <option value="48h">48 hours before</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.settings__formActions}>
                    <button className={styles.settings__formSubmit}>
                      Save Preferences
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}