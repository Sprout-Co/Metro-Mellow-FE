import React from 'react';
import styles from './CTA.module.scss';
import CTAButton from '@/components/ui/Button/CTAButton/CTAButton';

const CTA: React.FC = () => {
    return (
        <section className={styles.cta}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Ready to experience our services?</h2>
                    <p className={styles.subtitle}>
                        Book a service today and enjoy a clean, organized, and comfortable home
                    </p>
                    <div className={styles.actions}>
                        <CTAButton
                            href="/booking"
                            variant="primary"
                            size="large"
                        >
                            Book Now
                        </CTAButton>
                        <span className={styles.or}>or</span>
                        <CTAButton
                            href="/contact"
                            variant="outline"
                            size="large"
                        >
                            Contact Us
                        </CTAButton>
                    </div>
                </div>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <div className={styles.iconContainer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={styles.icon}
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                        <h3 className={styles.featureTitle}>Flexible Scheduling</h3>
                        <p className={styles.featureDesc}>Choose a time that works for you, including evenings and weekends</p>
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.iconContainer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={styles.icon}
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h3 className={styles.featureTitle}>Guaranteed Quality</h3>
                        <p className={styles.featureDesc}>All our services come with a 100% satisfaction guarantee</p>
                    </div>

                    <div className={styles.feature}>
                        <div className={styles.iconContainer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={styles.icon}
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <h3 className={styles.featureTitle}>Vetted Professionals</h3>
                        <p className={styles.featureDesc}>Our service providers are background-checked and experienced</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;