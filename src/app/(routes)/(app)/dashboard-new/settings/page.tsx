'use client';

import { useState } from 'react';
import DashboardLayout from '../_components/layout/DashboardLayout';
import styles from './ProfileSettings.module.scss';
import NavigationTabs from '../_components/navigation/NavigationTabs';
import Button from '@/components/ui/Button/Button';
import ChangePasswordModal from './ChangePasswordModal';
import PreferencesSection from './PreferencesSection';
import BillingSection from './BillingSection';

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Dele Ja',
    email: 'Dele.Ja@example.com',
    phoneNumber: 'Dele Ja',
    address: '',
    lga: ''
  });



  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message or handle success state
      console.log('Profile updated:', formData);
    }, 1000);
  };

  // Handle preferences save
  const handlePreferencesSave = (preferences: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Preferences updated:', preferences);
    }, 1000);
  };

  // Handle billing save
  const handleBillingSave = (billing: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Billing updated:', billing);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className={styles.profilePage__header}>
        <h1 className={styles.profilePage__title}>Account Settings</h1>
        <p className={styles.profilePage__subtitle}>Everything you need to manage your account</p>
      </div>
          
          <NavigationTabs 
            tabs={[
              { id: 'profile', label: 'PROFILE', isActive: activeTab === 'profile' },
              { id: 'billing', label: 'BILLING', isActive: activeTab === 'billing' },
              { id: 'preferences', label: 'PREFERENCES', isActive: activeTab === 'preferences' },
              { id: 'help', label: 'HELP & SUPPORT', isActive: activeTab === 'help' },
            ]} 
            onTabClick={handleTabClick}
          />
          
          {activeTab === 'profile' && (
            <div className={styles.profilePage__main}>
              <div className={styles.profilePage__profileContent}>
                <div className={styles.profilePage__profileHeader}>
                  <div className={styles.profilePage__profileForm}>
                    <form onSubmit={handleSubmit}>
                      <div className={styles.profilePage__formGroup}>
                        <label htmlFor="fullName" className={styles.profilePage__label}>
                          Fullname
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          className={styles.profilePage__input}
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className={styles.profilePage__formGroup}>
                        <label htmlFor="email" className={styles.profilePage__label}>
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={styles.profilePage__input}
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className={styles.profilePage__formGroup}>
                        <label htmlFor="phoneNumber" className={styles.profilePage__label}>
                          Phone number
                        </label>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          className={styles.profilePage__input}
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className={styles.profilePage__formGroup}>
                        <label htmlFor="address" className={styles.profilePage__label}>
                          Address
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          className={styles.profilePage__input}
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className={styles.profilePage__formGroup}>
                        <label htmlFor="lga" className={styles.profilePage__label}>
                          LGA
                        </label>
                        <select
                          id="lga"
                          name="lga"
                          className={styles.profilePage__select}
                          value={formData.lga}
                          onChange={handleChange}
                        >
                          <option value="">Select LGA</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                      </div>
                      
                      <div className={styles.profilePage__formGroup}>
                        <div className={styles.profilePage__passwordHeader}>
                          <div className={styles.profilePage__passwordInfo}>
                            <label className={styles.profilePage__label}>
                              Password
                            </label>
                            <p className={styles.profilePage__passwordSubtitle}>
                              Set a unique password.
                            </p>
                          </div>
                          <button 
                            type="button" 
                            className={styles.profilePage__resetPassword}
                            onClick={() => setIsPasswordModalOpen(true)}
                          >
                            RESET PASSWORD
                          </button>
                        </div>
                      </div>
                      
                      <div className={styles.profilePage__formActions}>
                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="lg"
                          loading={isLoading}
                          fullWidth
                        >
                          SAVE
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  <div className={styles.profilePage__profilePicture}>
                    <div className={styles.profilePage__uploadContainer}>
                      <div className={styles.profilePage__profileImage}>
                        {/* Profile image would be here */}
                        <span>UPLOAD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'preferences' && (
            <PreferencesSection
              onSave={handlePreferencesSave}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'billing' && (
            <BillingSection
              onSave={handleBillingSave}
              isLoading={isLoading}
            />
          )}

          {activeTab !== 'profile' && activeTab !== 'preferences' && activeTab !== 'billing' && (
            <div className={styles.profilePage__comingSoon}>
              <p>This section is coming soon!</p>
            </div>
          )}
      
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </DashboardLayout>
  );
}
