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
      <motion.button 
        type="button" 
        className={`${styles.socialAuth__button} ${loading === 'google' ? styles['socialAuth__button--loading'] : ''}`}
        onClick={() => handleSocialAuth('google')}
        disabled={loading !== null}
        whileHover={loading === null ? { scale: 1.02 } : {}}
        whileTap={loading === null ? { scale: 0.98 } : {}}
      >
        {loading === 'google' ? (
          <div className={styles.socialAuth__spinner}></div>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#4285F4"/>
          </svg>
        )}
        Continue with Google
      </motion.button>
      
      <motion.button 
        type="button" 
        className={`${styles.socialAuth__button} ${loading === 'apple' ? styles['socialAuth__button--loading'] : ''}`}
        onClick={() => handleSocialAuth('apple')}
        disabled={loading !== null}
        whileHover={loading === null ? { scale: 1.02 } : {}}
        whileTap={loading === null ? { scale: 0.98 } : {}}
      >
        {loading === 'apple' ? (
          <div className={styles.socialAuth__spinner}></div>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.05 20.28c-.98.95-2.05.86-3.08.44-1.09-.44-2.09-.48-3.24 0-1.44.61-2.19.43-3.05-.44C2.18 14.86 3.15 6.28 9.08 6c1.18.09 2.03.69 2.78.57.67-.09 1.9-.73 3.41-.62.58.03 2.21.24 3.26 1.8-2.31 1.49-1.93 4.75.48 5.86-.87 2.31-2.01 4.64-2.96 5.67zM12.03 5.95c-.12-2.28 1.69-4.32 3.72-4.42.31 2.5-1.77 4.46-3.72 4.42z" fill="#000000"/>
          </svg>
        )}
        Continue with Apple
      </motion.button>
      
      <div className={styles.socialAuth__divider}>
        <span className={styles.socialAuth__dividerText}>or</span>
      </div>
    </div>
  );
}