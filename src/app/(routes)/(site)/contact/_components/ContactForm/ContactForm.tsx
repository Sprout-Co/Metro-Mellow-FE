// components/contact/ContactForm.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    try {
      // In a real app, you would send the form data to your API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      setFormStatus('error');
      // Reset error status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  // Service options with icons
  const serviceOptions = [
    { value: "cleaning", label: "Home Cleaning", icon: "🧹" },
    { value: "laundry", label: "Laundry Services", icon: "👕" },
    { value: "cooking", label: "Meal Preparation", icon: "🍳" },
    { value: "errands", label: "Errand Running", icon: "🛒" },
    { value: "pest-control", label: "Pest Control", icon: "🐜" },
    { value: "other", label: "Other Services", icon: "✨" },
  ];

  return (
    <section className={styles.contactForm}>
      <div className={styles.contactForm__container}>
        <motion.div 
          className={styles.contactForm__content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.contactForm__header}>
            <h2 className={styles.contactForm__title}>Let's Connect</h2>
            <div className={styles.contactForm__titleAccent}></div>
            <p className={styles.contactForm__description}>
              We'd love to hear from you! Share your questions or service needs and we'll get back to you within 24 hours.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.contactForm__form}>
            <div className={styles.contactForm__row}>
              <div className={styles.contactForm__formGroup}>
                <div className={`${styles.contactForm__inputContainer} ${focusedField === 'name' || formData.name ? styles['contactForm__inputContainer--active'] : ''}`}>
                  <label htmlFor="name" className={styles.contactForm__label}>
                    Your Name <span className={styles.contactForm__required}>*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    className={styles.contactForm__input} 
                    placeholder="John Smith"
                    required
                  />
                  <div className={styles.contactForm__inputIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.contactForm__row}>
              <div className={styles.contactForm__formGroup}>
                <div className={`${styles.contactForm__inputContainer} ${focusedField === 'email' || formData.email ? styles['contactForm__inputContainer--active'] : ''}`}>
                  <label htmlFor="email" className={styles.contactForm__label}>
                    Email Address <span className={styles.contactForm__required}>*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={styles.contactForm__input} 
                    placeholder="your@email.com"
                    required
                  />
                  <div className={styles.contactForm__inputIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            
              <div className={styles.contactForm__formGroup}>
                <div className={`${styles.contactForm__inputContainer} ${focusedField === 'phone' || formData.phone ? styles['contactForm__inputContainer--active'] : ''}`}>
                  <label htmlFor="phone" className={styles.contactForm__label}>
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={styles.contactForm__input} 
                    placeholder="(123) 456-7890"
                  />
                  <div className={styles.contactForm__inputIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.21649 3.36162C2.30511 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23663 4.68007 9.47151 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89393 7.65088C9.81421 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5285 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.contactForm__formGroup}>
              <label htmlFor="service" className={styles.contactForm__label}>
                Service Interested In
              </label>
              <div className={styles.contactForm__serviceOptions}>
                {serviceOptions.map((option) => (
                  <div 
                    key={option.value}
                    className={`${styles.contactForm__serviceOption} ${formData.service === option.value ? styles['contactForm__serviceOption--selected'] : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, service: option.value }))}
                  >
                    <span className={styles.contactForm__serviceIcon}>{option.icon}</span>
                    <span className={styles.contactForm__serviceLabel}>{option.label}</span>
                  </div>
                ))}
              </div>
              <select 
                id="service" 
                name="service" 
                value={formData.service} 
                onChange={handleChange} 
                className={styles.contactForm__selectHidden}
              >
                <option value="">Select a service</option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.contactForm__formGroup}>
              <div className={`${styles.contactForm__textareaContainer} ${focusedField === 'message' || formData.message ? styles['contactForm__textareaContainer--active'] : ''}`}>
                <label htmlFor="message" className={styles.contactForm__label}>
                  Your Message <span className={styles.contactForm__required}>*</span>
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  className={styles.contactForm__textarea} 
                  placeholder="Tell us about your needs or ask us any questions"
                  rows={5}
                  required
                ></textarea>
              </div>
            </div>
            
            <div className={styles.contactForm__actions}>
              <motion.button 
                type="submit" 
                className={styles.contactForm__button}
                disabled={formStatus === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formStatus === 'submitting' ? (
                  <span className={styles.contactForm__spinner}>
                    <svg className={styles.contactForm__spinnerIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className={styles.contactForm__spinnerPath} cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message
                    <svg className={styles.contactForm__buttonIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
            
            {formStatus === 'success' && (
              <motion.div 
                className={styles.contactForm__success}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.contactForm__successIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.contactForm__messageContent}>
                  <h3 className={styles.contactForm__messageTitle}>Message Sent!</h3>
                  <p className={styles.contactForm__messageText}>
                    Thank you for reaching out. Our team will contact you shortly.
                  </p>
                </div>
              </motion.div>
            )}
            
            {formStatus === 'error' && (
              <motion.div 
                className={styles.contactForm__error}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.contactForm__errorIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9V13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.contactForm__messageContent}>
                  <h3 className={styles.contactForm__messageTitle}>Something went wrong</h3>
                  <p className={styles.contactForm__messageText}>
                    Please try again or contact us directly at support@metromellow.com
                  </p>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}