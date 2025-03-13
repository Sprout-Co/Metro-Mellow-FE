// components/booking/BookingSummary.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './BookingSummary.module.scss';

export default function BookingSummary() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'welcome10') {
      setPromoApplied(true);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to confirmation page
      console.log('Booking submitted');
    }, 1500);
  };
  
  return (
    <section className={styles.summary}>
      <div className={styles.summary__container}>
        <motion.div 
          className={styles.summary__content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.summary__header}>
            <h2 className={styles.summary__title}>Booking Summary</h2>
            <p className={styles.summary__description}>
              Review your selections and complete your booking
            </p>
          </div>
          
          <div className={styles.summary__grid}>
            <div className={styles.summary__detailsCard}>
              <h3 className={styles.summary__cardTitle}>
                <span className={styles.summary__cardTitleIcon}>📋</span>
                Service Details
              </h3>
              
              <div className={styles.summary__serviceDetails}>
                <div className={styles.summary__serviceBlock}>
                  <h4 className={styles.summary__serviceBlockTitle}>Selected Services</h4>
                  <div className={styles.summary__serviceItems}>
                    <div className={styles.summary__serviceItem}>
                      <div className={styles.summary__serviceIcon}>🧹</div>
                      <div className={styles.summary__serviceName}>Home Cleaning</div>
                      <div className={styles.summary__servicePrice}>$120.00</div>
                    </div>
                    <div className={styles.summary__serviceItem}>
                      <div className={styles.summary__serviceIcon}>👕</div>
                      <div className={styles.summary__serviceName}>Laundry Service</div>
                      <div className={styles.summary__servicePrice}>$80.00</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.summary__serviceBlock}>
                  <h4 className={styles.summary__serviceBlockTitle}>Schedule</h4>
                  <div className={styles.summary__scheduleItem}>
                    <div className={styles.summary__scheduleIcon}>📅</div>
                    <div className={styles.summary__scheduleText}>
                      <strong>Date:</strong> Friday, March 15, 2025
                    </div>
                  </div>
                  <div className={styles.summary__scheduleItem}>
                    <div className={styles.summary__scheduleIcon}>⏰</div>
                    <div className={styles.summary__scheduleText}>
                      <strong>Time:</strong> 10:00 AM
                    </div>
                  </div>
                  <div className={styles.summary__scheduleItem}>
                    <div className={styles.summary__scheduleIcon}>🔄</div>
                    <div className={styles.summary__scheduleText}>
                      <strong>Frequency:</strong> Bi-weekly (Every 2 weeks)
                    </div>
                  </div>
                </div>
                
                <div className={styles.summary__serviceBlock}>
                  <h4 className={styles.summary__serviceBlockTitle}>Preferences</h4>
                  <div className={styles.summary__preferenceItems}>
                    <div className={styles.summary__preferenceItem}>
                      <div className={styles.summary__preferenceIcon}>🌱</div>
                      <div className={styles.summary__preferenceName}>Eco-friendly products only</div>
                    </div>
                    <div className={styles.summary__preferenceItem}>
                      <div className={styles.summary__preferenceIcon}>😷</div>
                      <div className={styles.summary__preferenceName}>Hypoallergenic products</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.summary__serviceBlock}>
                  <h4 className={styles.summary__serviceBlockTitle}>Property Details</h4>
                  <div className={styles.summary__propertyItem}>
                    <span className={styles.summary__propertyLabel}>Home Size:</span>
                    <span className={styles.summary__propertyValue}>1,200 sq ft</span>
                  </div>
                  <div className={styles.summary__propertyItem}>
                    <span className={styles.summary__propertyLabel}>Bedrooms:</span>
                    <span className={styles.summary__propertyValue}>2</span>
                  </div>
                  <div className={styles.summary__propertyItem}>
                    <span className={styles.summary__propertyLabel}>Bathrooms:</span>
                    <span className={styles.summary__propertyValue}>1.5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.summary__paymentCard}>
              <form onSubmit={handleSubmit}>
                <h3 className={styles.summary__cardTitle}>
                  <span className={styles.summary__cardTitleIcon}>💳</span>
                  Payment Details
                </h3>
                
                <div className={styles.summary__paymentMethods}>
                  <div 
                    className={`${styles.summary__paymentMethod} ${paymentMethod === 'card' ? styles['summary__paymentMethod--active'] : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className={styles.summary__paymentMethodRadio}>
                      <div className={styles.summary__paymentMethodRadioInner}></div>
                    </div>
                    <div className={styles.summary__paymentMethodIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={styles.summary__paymentMethodText}>
                      Credit/Debit Card
                    </div>
                  </div>
                  
                  <div 
                    className={`${styles.summary__paymentMethod} ${paymentMethod === 'paypal' ? styles['summary__paymentMethod--active'] : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <div className={styles.summary__paymentMethodRadio}>
                      <div className={styles.summary__paymentMethodRadioInner}></div>
                    </div>
                    <div className={styles.summary__paymentMethodIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 9.5H21.5L18.5 17.5H14.5M6.5 9.5H14.5L11.5 17.5H3.5L6.5 9.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.5 6.5H17.5L14.5 14.5H6.5L9.5 6.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className={styles.summary__paymentMethodText}>
                      PayPal
                    </div>
                  </div>
                </div>
                
                {paymentMethod === 'card' && (
                  <div className={styles.summary__cardDetails}>
                    <div className={styles.summary__inputGroup}>
                      <label className={styles.summary__label}>Card Number</label>
                      <div className={styles.summary__inputWrapper}>
                        <input 
                          type="text" 
                          className={styles.summary__input} 
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <div className={styles.summary__inputIcon}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.summary__formRow}>
                      <div className={styles.summary__inputGroup}>
                        <label className={styles.summary__label}>Expiration Date</label>
                        <div className={styles.summary__inputWrapper}>
                          <input 
                            type="text" 
                            className={styles.summary__input} 
                            placeholder="MM/YY"
                            required
                          />
                          <div className={styles.summary__inputIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.summary__inputGroup}>
                        <label className={styles.summary__label}>CVC</label>
                        <div className={styles.summary__inputWrapper}>
                          <input 
                            type="text" 
                            className={styles.summary__input} 
                            placeholder="123"
                            required
                          />
                          <div className={styles.summary__inputIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 13.5C11.9816 13.3534 11.9816 13.2066 12 13.0598C12.0456 12.7955 12.1732 12.5515 12.3671 12.3582C12.5609 12.1649 12.8051 12.0338 13.07 11.9843C13.1357 11.9735 13.1993 11.9551 13.2593 11.9292C13.6368 11.779 13.9085 11.4439 13.96 11.0443C13.9955 10.764 13.9417 10.4775 13.8064 10.2359C13.6712 9.99436 13.4626 9.81492 13.2137 9.72368C12.9648 9.63243 12.6927 9.63647 12.4468 9.73509C12.2008 9.83372 11.998 10.0192 11.87 10.2643" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.summary__inputGroup}>
                      <label className={styles.summary__label}>Cardholder Name</label>
                      <div className={styles.summary__inputWrapper}>
                        <input 
                          type="text" 
                          className={styles.summary__input} 
                          placeholder="John Smith"
                          required
                        />
                        <div className={styles.summary__inputIcon}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div className={styles.summary__paypalInfo}>
                    <p className={styles.summary__paypalText}>
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                    <div className={styles.summary__paypalLogo}>
                      <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38.7 12.5H34.2C33.9 12.5 33.7 12.7 33.6 13L31.8 24.4C31.8 24.6 31.9 24.7 32.1 24.7H34.2C34.5 24.7 34.7 24.5 34.8 24.2L35.2 21.9C35.3 21.6 35.5 21.4 35.8 21.4H37.3C40.4 21.4 42.2 19.8 42.7 16.8C43 15.5 42.7 14.5 42.1 13.8C41.4 13 40.2 12.5 38.7 12.5ZM39.3 17C39 18.6 37.8 18.6 36.7 18.6H36L36.6 14.9C36.6 14.7 36.8 14.6 37 14.6H37.3C38.1 14.6 38.8 14.6 39.2 15C39.4 15.3 39.5 15.7 39.3 17Z" fill="#253B80"/>
                        <path d="M53.3 16.9H51.2C51 16.9 50.8 17 50.8 17.2L50.7 17.8L50.6 17.6C50.1 16.8 49 16.6 48 16.6C45.6 16.6 43.6 18.4 43.2 20.8C43 22 43.3 23.1 44 23.9C44.6 24.6 45.6 24.9 46.7 24.9C48.7 24.9 49.7 23.7 49.7 23.7L49.6 24.3C49.6 24.5 49.7 24.6 49.9 24.6H51.8C52.1 24.6 52.3 24.4 52.4 24.1L53.6 17.2C53.5 17.1 53.4 16.9 53.3 16.9ZM50.1 20.9C49.9 22 49 22.8 47.9 22.8C47.3 22.8 46.8 22.6 46.6 22.3C46.3 22 46.2 21.5 46.3 21C46.5 19.9 47.4 19.1 48.5 19.1C49.1 19.1 49.5 19.3 49.8 19.6C50 19.9 50.2 20.4 50.1 20.9Z" fill="#253B80"/>
                        <path d="M66.6 16.9H64.5C64.3 16.9 64.1 17 64 17.2L60.5 22.2L59.2 17.4C59.1 17.1 58.9 16.9 58.6 16.9H56.5C56.3 16.9 56.1 17.1 56.2 17.3L58.6 24.2L56.4 27.2C56.2 27.4 56.4 27.7 56.6 27.7H58.7C58.9 27.7 59.1 27.6 59.2 27.4L66.9 17.4C67 17.1 66.8 16.9 66.6 16.9Z" fill="#253B80"/>
                        <path d="M75.7 12.5H71.2C70.9 12.5 70.7 12.7 70.6 13L68.8 24.4C68.8 24.6 68.9 24.7 69.1 24.7H71.3C71.5 24.7 71.7 24.6 71.7 24.4L72.2 21.9C72.3 21.6 72.5 21.4 72.8 21.4H74.3C77.4 21.4 79.2 19.8 79.7 16.8C80 15.5 79.7 14.5 79.1 13.8C78.4 13 77.2 12.5 75.7 12.5ZM76.3 17C76 18.6 74.8 18.6 73.7 18.6H73L73.6 14.9C73.6 14.7 73.8 14.6 74 14.6H74.3C75.1 14.6 75.8 14.6 76.2 15C76.4 15.3 76.4 15.7 76.3 17Z" fill="#179BD7"/>
                        <path d="M90.3 16.9H88.2C88 16.9 87.8 17 87.8 17.2L87.7 17.8L87.6 17.6C87.1 16.8 86 16.6 85 16.6C82.6 16.6 80.6 18.4 80.2 20.8C80 22 80.3 23.1 81 23.9C81.6 24.6 82.6 24.9 83.7 24.9C85.7 24.9 86.7 23.7 86.7 23.7L86.6 24.3C86.6 24.5 86.7 24.6 86.9 24.6H88.8C89.1 24.6 89.3 24.4 89.4 24.1L90.6 17.2C90.5 17.1 90.4 16.9 90.3 16.9ZM87.1 20.9C86.9 22 86 22.8 84.9 22.8C84.3 22.8 83.8 22.6 83.6 22.3C83.3 22 83.2 21.5 83.3 21C83.5 19.9 84.4 19.1 85.5 19.1C86.1 19.1 86.5 19.3 86.8 19.6C87 19.9 87.2 20.4 87.1 20.9Z" fill="#179BD7"/>
                        <path d="M93.4 13.2L91.5 24.4C91.5 24.6 91.6 24.7 91.8 24.7H93.6C93.9 24.7 94.1 24.5 94.2 24.2L96 13C96 12.8 95.9 12.7 95.7 12.7H93.7C93.6 12.5 93.5 12.7 93.4 13.2Z" fill="#179BD7"/>
                        <path d="M17.9 12.5H13.4C13.1 12.5 12.9 12.7 12.8 13L11 24.4C11 24.6 11.1 24.7 11.3 24.7H13.6C13.9 24.7 14.1 24.5 14.2 24.2L14.8 20.6C14.9 20.3 15.1 20.1 15.4 20.1H16.9C20 20.1 21.8 18.5 22.3 15.5C22.6 14.2 22.3 13.2 21.7 12.5C21 12 19.8 12.5 17.9 12.5ZM18.6 15.9C18.3 17.5 17.1 17.5 16 17.5H15.3L15.9 13.9C15.9 13.7 16.1 13.6 16.3 13.6H16.6C17.4 13.6 18.1 13.6 18.5 14C18.7 14.2 18.7 15 18.6 15.9Z" fill="#253B80"/>
                        <path d="M29.1 15.9H26.9C26.7 15.9 26.5 16 26.5 16.2L26.4 16.8L26.3 16.6C25.8 15.8 24.7 15.6 23.7 15.6C21.3 15.6 19.3 17.4 18.9 19.8C18.7 21 19 22.1 19.7 22.9C20.3 23.6 21.3 23.9 22.4 23.9C24.4 23.9 25.4 22.7 25.4 22.7L25.3 23.3C25.3 23.5 25.4 23.6 25.6 23.6H27.5C27.8 23.6 28 23.4 28.1 23.1L29.3 16.2C29.4 16.1 29.3 15.9 29.1 15.9ZM25.9 19.9C25.7 21 24.8 21.8 23.7 21.8C23.1 21.8 22.6 21.6 22.4 21.3C22.1 21 22 20.5 22.1 20C22.3 18.9 23.2 18.1 24.3 18.1C24.9 18.1 25.3 18.3 25.6 18.6C25.9 18.9 26 19.4 25.9 19.9Z" fill="#253B80"/>
                        <path d="M30.8 13.2L28.9 24.4C28.9 24.6 29 24.7 29.2 24.7H31C31.3 24.7 31.5 24.5 31.6 24.2L33.5 12.9C33.5 12.7 33.4 12.6 33.2 12.6H31.2C31 12.5 30.9 12.7 30.8 13.2Z" fill="#253B80"/>
                      </svg>
                    </div>
                  </div>
                )}
                
                <div className={styles.summary__promoSection}>
                  <div className={styles.summary__promoHeader}>
                    <h4 className={styles.summary__promoTitle}>Promo Code</h4>
                    <button 
                      type="button" 
                      className={styles.summary__promoButton}
                      onClick={handleApplyPromo}
                      disabled={!promoCode || promoApplied}
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  <div className={styles.summary__promoInput}>
                    <input 
                      type="text" 
                      className={styles.summary__input} 
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                  </div>
                  {promoApplied && (
                    <div className={styles.summary__promoSuccess}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Promo code applied: 10% discount</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.summary__priceBreakdown}>
                  <div className={styles.summary__priceItem}>
                    <span className={styles.summary__priceLabel}>Subtotal</span>
                    <span className={styles.summary__priceValue}>$200.00</span>
                  </div>
                  {promoApplied && (
                    <div className={styles.summary__priceItem}>
                      <span className={styles.summary__priceLabel}>Discount (10%)</span>
                      <span className={styles.summary__priceValue}>-$20.00</span>
                    </div>
                  )}
                  <div className={styles.summary__priceItem}>
                    <span className={styles.summary__priceLabel}>Tax</span>
                    <span className={styles.summary__priceValue}>$18.00</span>
                  </div>
                  <div className={`${styles.summary__priceItem} ${styles['summary__priceItem--total']}`}>
                    <span className={styles.summary__priceLabel}>Total</span>
                    <span className={styles.summary__priceValue}>
                      ${promoApplied ? '198.00' : '218.00'}
                    </span>
                  </div>
                </div>
                
                <div className={styles.summary__termsCheck}>
                  <label className={styles.summary__checkbox}>
                    <input 
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                    />
                    <span className={styles.summary__checkmark}></span>
                    <span className={styles.summary__checkboxText}>
                      I agree to the{' '}
                      <a href="/terms" className={styles.summary__link} target="_blank">Terms of Service</a>
                      {' '}and{' '}
                      <a href="/privacy" className={styles.summary__link} target="_blank">Privacy Policy</a>
                    </span>
                  </label>
                </div>
                
                <motion.button 
                  type="submit" 
                  className={styles.summary__submitButton}
                  disabled={loading || !agreeTerms}
                  whileHover={!loading && agreeTerms ? { scale: 1.02 } : undefined}
                  whileTap={!loading && agreeTerms ? { scale: 0.98 } : undefined}
                >
                  {loading ? (
                    <>
                      <svg className={styles.summary__loadingIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <circle className={styles.summary__loadingCircle} cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Complete Booking'
                  )}
                </motion.button>
                
                <div className={styles.summary__secureNote}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}