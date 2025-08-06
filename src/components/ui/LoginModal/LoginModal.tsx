"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './LoginModal.module.scss';
import Link from 'next/link';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempt with:', { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="1200px"
      showCloseButton={false}
      showHeader={false}
    >
      <div className={styles.loginModal}>
        <button className={styles.loginModal__closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={styles.loginModal__formContainer}>
          <div className={styles.loginModal__logo}>
            <Image 
              src="/images/brand/logo.jpeg" 
              alt="Metro Mellow Logo" 
              width={200} 
              height={60}
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className={styles.loginModal__header}>
            <h2 className={styles.loginModal__title}>Sign in with your work email</h2>
            <p className={styles.loginModal__subtitle}>Use your work email to sign in to your team workspace</p>
          </div>

          <form className={styles.loginModal__form} onSubmit={handleLogin}>
            <div className={styles.loginModal__formGroup}>
              <label htmlFor="email" className={styles.loginModal__label}>Email Address</label>
              <input 
                type="email" 
                id="email" 
                className={styles.loginModal__input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@company.com"
                required
              />
            </div>

            <div className={styles.loginModal__formGroup}>
              <label htmlFor="password" className={styles.loginModal__label}>Password</label>
              <div className={styles.loginModal__passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className={styles.loginModal__input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className={styles.loginModal__togglePassword}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5C17.5228 5 22 12 22 12C22 12 17.5228 19 12 19C6.47715 19 2 12 2 12C2 12 6.47715 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              variant="primary"
              size="lg"
              fullWidth={true}
              className={styles.loginModal__button}
            >
              LOGIN
            </Button>
          </form>
        </div>
        
        <div className={styles.loginModal__signupWrapper}>
          <p className={styles.loginModal__signupText}>
            Don't have an account? <Link href="/get-started" className={styles.loginModal__signupLink}>Sign up</Link>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal; 