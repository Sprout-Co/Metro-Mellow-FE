// components/auth/SocialAuth.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './AuthLayout.module.scss';

interface SocialAuthProps {
  onSocialAuth: (provider: string) => Promise<void>;
}

export default function SocialAuth({ onSocialAuth }: SocialAuthProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialAuth = async (provider: string) => {
    try {
      setLoading(provider);
      await onSocialAuth(provider);
    } catch (error) {
      console.error(`${provider} auth error:`, error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className={styles.socialAuth}>
      <div className={styles.socialAuth__container}>
        <motion.button 
          type="button" 
          className={`${styles.socialAuth__iconButton} ${loading === 'google' ? styles['socialAuth__iconButton--loading'] : ''}`}
          onClick={() => handleSocialAuth('google')}
          disabled={loading !== null}
          whileHover={loading === null ? { scale: 1.05 } : {}}
          whileTap={loading === null ? { scale: 0.95 } : {}}
        >
          {loading === 'google' ? (
            <div className={styles.socialAuth__spinner}></div>
          ) : (
            <>
              <div className={styles.socialAuth__icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <span className={styles.socialAuth__label}>Google</span>
            </>
          )}
        </motion.button>
        
        <motion.button 
          type="button" 
          className={`${styles.socialAuth__iconButton} ${loading === 'microsoft' ? styles['socialAuth__iconButton--loading'] : ''}`}
          onClick={() => handleSocialAuth('microsoft')}
          disabled={loading !== null}
          whileHover={loading === null ? { scale: 1.05 } : {}}
          whileTap={loading === null ? { scale: 0.95 } : {}}
        >
          {loading === 'microsoft' ? (
            <div className={styles.socialAuth__spinner}></div>
          ) : (
            <>
              <div className={styles.socialAuth__icon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4 11.4H1V1h10.4v10.4z" fill="#F25022"/>
                  <path d="M23 11.4H12.6V1H23v10.4z" fill="#7FBA00"/>
                  <path d="M11.4 23H1V12.6h10.4V23z" fill="#00A4EF"/>
                  <path d="M23 23H12.6V12.6H23V23z" fill="#FFB900"/>
                </svg>
              </div>
              <span className={styles.socialAuth__label}>Microsoft</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}