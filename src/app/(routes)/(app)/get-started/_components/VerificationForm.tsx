// components/auth/VerificationForm.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AuthLayout.module.scss';

interface VerificationFormProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

export default function VerificationForm({ email, onSuccess, onBack }: VerificationFormProps) {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
    
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  
  // Handle countdown for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);
  
  // Handle focus tracking
  useEffect(() => {
    if (inputRefs.current[activeIndex]) {
      inputRefs.current[activeIndex].focus();
    }
  }, [activeIndex]);
  
  const handleInputChange = (index: number, value: string) => {
    // If pasting a full code
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      const newCode = [...verificationCode];
      
      pastedCode.forEach((char, i) => {
        if (i < 6) {
          newCode[i] = char;
        }
      });
      
      setVerificationCode(newCode);
      
      // Focus the appropriate input
      const focusIndex = Math.min(5, pastedCode.length - 1);
      setActiveIndex(focusIndex);
      
      // Auto-submit if the code is complete
      if (pastedCode.length >= 6) {
        setTimeout(() => {
          handleSubmit();
        }, 100);
      }
      
      return;
    }
    
    // Handle single digit
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Move to next input if current is filled
    if (value !== '' && index < 5) {
      setActiveIndex(index + 1);
    }
    
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      setActiveIndex(index - 1);
    }
    
    // Move focus with arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && index < 5) {
      setActiveIndex(index + 1);
      e.preventDefault();
    }
  };
  
  const handleResendCode = async () => {
    if (resendDisabled) return;
    
    setResendDisabled(true);
    setCountdown(60); // 60 second cooldown
    
    try {
      // In a real app, you would call your API to resend the code
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success message
      setError('A new verification code has been sent to your email.');
    } catch (err) {
      setError('Failed to resend verification code. Please try again later.');
    }
  };
  
  const validateCode = (): boolean => {
    // Check if any input is empty
    if (verificationCode.some(digit => digit === '')) {
      setError('Please enter the complete verification code.');
      return false;
    }
    
    // Additional validation if needed
    return true;
  };
  
  const handleSubmit = async () => {
    if (!validateCode()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would validate the code with your API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll accept any 6-digit code
      if (verificationCode.join('') === '123456') {
        // Example of handling a specific code for testing
        onSuccess();
      } else {
        // Simulate API verification - in a real app, the API would validate the code
        const randomSuccess = Math.random() > 0.3; // 70% success rate for demo
        
        if (randomSuccess) {
          onSuccess();
        } else {
          setError('Invalid verification code. Please try again.');
        }
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.verificationForm}>
      <AnimatePresence mode="wait">
        <motion.div 
          key="verification"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className={styles.verificationForm__title}>Verify Your Email</h1>
          <p className={styles.verificationForm__subtitle}>
            We've sent a verification code to <strong>{email}</strong>
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {error && (
              <div className={`${styles.verificationForm__message} ${error.includes('has been sent') ? styles['verificationForm__message--success'] : styles['verificationForm__message--error']}`}>
                {error.includes('has been sent') ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
                {error}
              </div>
            )}
            
            <div className={styles.verificationForm__inputGroup}>
              <label className={styles.verificationForm__label}>
                Enter 6-digit verification code
              </label>
              <div className={styles.verificationForm__inputs}>
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={6} // Allow paste of full code
                    autoComplete="one-time-code"
                    className={`
                      ${styles.verificationForm__input}
                      ${activeIndex === index ? styles['verificationForm__input--active'] : ''}
                      ${error && !digit ? styles['verificationForm__input--error'] : ''}
                    `}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            <div className={styles.verificationForm__actions}>
              <motion.button 
                type="submit" 
                className={styles.verificationForm__button}
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? (
                  <>
                    <div className={styles.verificationForm__buttonSpinner}></div>
                    Verifying...
                  </>
                ) : (
                  'Verify Email'
                )}
              </motion.button>
              
              <div className={styles.verificationForm__resend}>
                Didn't receive the code?{' '}
                <button 
                  type="button" 
                  className={`
                    ${styles.verificationForm__resendLink}
                    ${resendDisabled ? styles['verificationForm__resendLink--disabled'] : ''}
                  `}
                  onClick={handleResendCode}
                  disabled={resendDisabled}
                >
                  {resendDisabled ? `Resend in ${countdown}s` : 'Resend Code'}
                </button>
              </div>
              
              <div className={styles.verificationForm__back}>
                <button 
                  type="button" 
                  className={styles.verificationForm__backLink}
                  onClick={onBack}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Sign In
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}