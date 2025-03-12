// components/auth/AuthLayout.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className={styles.authLayout}>
      <div className={styles.authLayout__container}>
        <div className={styles.authLayout__wrapper}>
          <div className={styles.authLayout__card}>
            <Link href="/" className={styles.authLayout__logo}>
              <Image 
                src="/images/logo.svg" 
                alt="Metro Mellow" 
                width={180} 
                height={50}
              />
            </Link>
            
            {children}
          </div>
          
          <div className={styles.authLayout__imageWrapper}>
            <div className={styles.authLayout__image}>
              <h2 className={styles.authLayout__imageTitle}>
                Experience the Metro Mellow Difference
              </h2>
              <p className={styles.authLayout__imageText}>
                Join thousands of satisfied customers enjoying premium home services
              </p>
              
              <div className={styles.authLayout__stats}>
                <div className={styles.authLayout__statItem}>
                  <div className={styles.authLayout__statNumber}>15k+</div>
                  <div className={styles.authLayout__statLabel}>Happy Customers</div>
                </div>
                <div className={styles.authLayout__statItem}>
                  <div className={styles.authLayout__statNumber}>50k+</div>
                  <div className={styles.authLayout__statLabel}>Services Completed</div>
                </div>
                <div className={styles.authLayout__statItem}>
                  <div className={styles.authLayout__statNumber}>4.9</div>
                  <div className={styles.authLayout__statLabel}>Star Rating</div>
                </div>
              </div>
              
              <div className={styles.authLayout__testimonials}>
                <div className={styles.authLayout__testimonial}>
                  <p className={styles.authLayout__testimonialText}>
                    "Metro Mellow transformed our home care experience with their reliable and professional service!"
                  </p>
                  <div className={styles.authLayout__testimonialAuthor}>
                    <div className={styles.authLayout__testimonialName}>Sarah J.</div>
                    <div className={styles.authLayout__testimonialStars}>★★★★★</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}