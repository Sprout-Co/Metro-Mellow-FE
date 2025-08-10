'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import styles from './PreferencesSection.module.scss';

interface PreferencesData {
  emailPreferences: {
    promotionalEmails: boolean;
    newFeatures: boolean;
    newsletter: boolean;
    accountActivities: boolean;
  };
  securityPreferences: {
    twoFactorAuth: boolean;
    signInAlerts: boolean;
  };
}

interface PreferencesSectionProps {
  initialPreferences?: PreferencesData;
  onSave?: (preferences: PreferencesData) => void;
  isLoading?: boolean;
}

export default function PreferencesSection({ 
  initialPreferences, 
  onSave, 
  isLoading = false 
}: PreferencesSectionProps) {
  const [preferences, setPreferences] = useState<PreferencesData>(
    initialPreferences || {
      emailPreferences: {
        promotionalEmails: true,
        newFeatures: false,
        newsletter: false,
        accountActivities: false
      },
      securityPreferences: {
        twoFactorAuth: true,
        signInAlerts: false
      }
    }
  );

  // Handle preferences change
  const handlePreferenceChange = (category: string, key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  // Handle preferences submission
  const handlePreferencesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave?.(preferences);
  };

  return (
    <div className={styles.preferencesSection}>
      <form onSubmit={handlePreferencesSubmit}>
        <div className={styles.preferencesSection__section}>
          <h3 className={styles.preferencesSection__title}>Email Preferences</h3>
          <div className={styles.preferencesSection__options}>
            <label className={styles.preferencesSection__checkboxLabel}>
              <input
                type="checkbox"
                checked={preferences.emailPreferences.promotionalEmails}
                onChange={(e) => handlePreferenceChange('emailPreferences', 'promotionalEmails', e.target.checked)}
                className={styles.preferencesSection__checkbox}
              />
              <span className={styles.preferencesSection__checkboxText}>Receive Promotional Emails</span>
            </label>
            
            <label className={styles.preferencesSection__checkboxLabel}>
              <input
                type="checkbox"
                checked={preferences.emailPreferences.newFeatures}
                onChange={(e) => handlePreferenceChange('emailPreferences', 'newFeatures', e.target.checked)}
                className={styles.preferencesSection__checkbox}
              />
              <span className={styles.preferencesSection__checkboxText}>Get update on new features</span>
            </label>
            
            <label className={styles.preferencesSection__checkboxLabel}>
              <input
                type="checkbox"
                checked={preferences.emailPreferences.newsletter}
                onChange={(e) => handlePreferenceChange('emailPreferences', 'newsletter', e.target.checked)}
                className={styles.preferencesSection__checkbox}
              />
              <span className={styles.preferencesSection__checkboxText}>Subscribe to our newsletter</span>
            </label>
            
            <label className={styles.preferencesSection__checkboxLabel}>
              <input
                type="checkbox"
                checked={preferences.emailPreferences.accountActivities}
                onChange={(e) => handlePreferenceChange('emailPreferences', 'accountActivities', e.target.checked)}
                className={styles.preferencesSection__checkbox}
              />
              <span className={styles.preferencesSection__checkboxText}>Notifications about account activities</span>
            </label>
          </div>
        </div>

        <div className={styles.preferencesSection__section}>
          <h3 className={styles.preferencesSection__title}>Security Preferences</h3>
          <div className={styles.preferencesSection__options}>
            <label className={styles.preferencesSection__checkboxLabel}>
              <input
                type="checkbox"
                checked={preferences.securityPreferences.twoFactorAuth}
                onChange={(e) => handlePreferenceChange('securityPreferences', 'twoFactorAuth', e.target.checked)}
                className={styles.preferencesSection__checkbox}
              />
              <span className={styles.preferencesSection__checkboxText}>Two-factor authentication</span>
            </label>
            
            <label className={styles.preferencesSection__checkboxLabel}>
              <input
                type="checkbox"
                checked={preferences.securityPreferences.signInAlerts}
                onChange={(e) => handlePreferenceChange('securityPreferences', 'signInAlerts', e.target.checked)}
                className={styles.preferencesSection__checkbox}
              />
              <span className={styles.preferencesSection__checkboxText}>Sign-in alerts</span>
            </label>
          </div>
        </div>

        <div className={styles.preferencesSection__actions}>
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            loading={isLoading}
          >
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
}
