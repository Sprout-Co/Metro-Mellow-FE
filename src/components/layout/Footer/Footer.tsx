'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Footer.module.scss';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your API
    if (email) {
      setSubscribed(true);
      setEmail('');

      // Reset the subscribed state after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <div className={styles.footer__container}>
          <div className={styles.footer__grid}>
            <div className={styles.footer__brand}>
              <Link href="/" className={styles.footer__logo}>
                <Image
                  src="/images/logo-light.svg"
                  alt="Metro Mellow"
                  width={180}
                  height={50}
                  className={styles.footer__logoImage}
                />
              </Link>
              <p className={styles.footer__tagline}>
                Making everyday home experiences extraordinary
              </p>
              <div className={styles.footer__social}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink} aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink} aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink} aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8418 15.5297C13.0904 15.9079 12.2386 16.0396 11.4078 15.9059C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1902 8.22774 13.4229 8.09408 12.5921C7.96042 11.7614 8.09208 10.9096 8.47034 10.1582C8.8486 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink} aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className={styles.footer__linksGroup}>
              <h3 className={styles.footer__heading}>Quick Links</h3>
              <ul className={styles.footer__links}>
                <li>
                  <Link href="/" className={styles.footer__link}>Home</Link>
                </li>
                <li>
                  <Link href="/about" className={styles.footer__link}>About Us</Link>
                </li>
                <li>
                  <Link href="/services" className={styles.footer__link}>Services</Link>
                </li>
                <li>
                  <Link href="/pricing" className={styles.footer__link}>Pricing</Link>
                </li>
                <li>
                  <Link href="/contact" className={styles.footer__link}>Contact</Link>
                </li>
                <li>
                  <Link href="/blog" className={styles.footer__link}>Blog</Link>
                </li>
              </ul>
            </div>
            
            <div className={styles.footer__linksGroup}>
              <h3 className={styles.footer__heading}>Our Services</h3>
              <ul className={styles.footer__links}>
                <li>
                  <Link href="/services/cleaning" className={styles.footer__link}>Home Cleaning</Link>
                </li>
                <li>
                  <Link href="/services/laundry" className={styles.footer__link}>Laundry Services</Link>
                </li>
                <li>
                  <Link href="/services/cooking" className={styles.footer__link}>Meal Preparation</Link>
                </li>
                <li>
                  <Link href="/services/errands" className={styles.footer__link}>Errand Running</Link>
                </li>
                <li>
                  <Link href="/services/pest-control" className={styles.footer__link}>Pest Control</Link>
                </li>
              </ul>
            </div>
            
            <div className={styles.footer__newsletter}>
              <h3 className={styles.footer__heading}>Newsletter</h3>
              <p className={styles.footer__newsletterText}>
                Subscribe to our newsletter for special offers and updates
              </p>
              
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className={styles.footer__form}>
                  <div className={styles.footer__inputWrapper}>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className={styles.footer__input}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <motion.button 
                      type="submit" 
                      className={styles.footer__button}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 5L21 12L13 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  className={styles.footer__subscribed}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  Thank you for subscribing!
                </motion.div>
              )}
              
              <p className={styles.footer__privacy}>
                By subscribing, you agree to our{' '}
                <Link href="/privacy-policy" className={styles.footer__privacyLink}>
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.footer__bottom}>
        <div className={styles.footer__container}>
          <div className={styles.footer__bottomContent}>
            <p className={styles.footer__copyright}>
              © {currentYear} Metro Mellow. All rights reserved.
            </p>
            <div className={styles.footer__legal}>
              <Link href="/terms" className={styles.footer__legalLink}>
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className={styles.footer__legalLink}>
                Privacy Policy
              </Link>
              <Link href="/cookies" className={styles.footer__legalLink}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}