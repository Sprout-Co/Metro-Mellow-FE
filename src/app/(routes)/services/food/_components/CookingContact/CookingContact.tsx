'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './CookingContact.module.scss';

const CookingContact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    dietaryPreference: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to your server here
    console.log('Form submitted:', formData);
    
    // Simulate a successful form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you shortly with information about our meal plans.',
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      dietaryPreference: '',
    });
  };

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.contact__container}>
        <motion.div 
          className={styles.contact__heading}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut"
            }
          } : { opacity: 0, y: 20 }}
        >
          <span className={styles.contact__subheading}>Contact Us</span>
          <h2 className={styles.contact__title}>Get In Touch</h2>
          <p className={styles.contact__description}>
            Have questions about our meal plans or need custom dietary options? Fill out the form below and our team will get back to you promptly.
          </p>
        </motion.div>

        <div className={styles.contact__content}>
          <motion.div 
            className={styles.contact__info}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 0.6,
                ease: "easeOut",
                delay: 0.2
              }
            } : { opacity: 0, x: -20 }}
          >
            <div className={styles.contact__card}>
              <h3 className={styles['contact__card-title']}>Contact Information</h3>
              
              <div className={styles.contact__details}>
                <div className={styles.contact__detail}>
                  <div className={styles['contact__detail-icon']}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 2C7.59 2 4 5.59 4 10C4 11.87 4.5 13.58 5.41 15C5.41 15 5.55 15.21 5.69 15.4L12 23L18.31 15.41C18.45 15.21 18.59 15 18.59 15C19.5 13.58 20 11.87 20 10C20 5.59 16.41 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles['contact__detail-content']}>
                    <h4 className={styles['contact__detail-title']}>Address</h4>
                    <p className={styles['contact__detail-text']}>123 Culinary Street, Suite 456<br />Seattle, WA 98101</p>
                  </div>
                </div>
                
                <div className={styles.contact__detail}>
                  <div className={styles['contact__detail-icon']}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3746C21.0391 21.7497 20.5099 21.9604 19.96 21.96C17.4204 21.7281 14.9702 20.8361 12.8 19.36C10.7619 18.0039 8.99634 16.2383 7.64 14.2C6.15858 12.0196 5.26674 9.55619 5.04 7C5.03962 6.45011 5.25031 5.92098 5.62536 5.54594C6.00041 5.17089 6.52955 4.96019 7.08 4.96H10.08C10.5398 4.95995 10.985 5.13437 11.3379 5.44721C11.6908 5.76005 11.9287 6.18745 12 6.64C12.1368 7.63869 12.3946 8.61767 12.77 9.55C12.9169 9.88183 12.9651 10.2521 12.9088 10.6124C12.8524 10.9727 12.694 11.3079 12.45 11.58L11.23 12.8C12.4755 14.8733 14.1267 16.5245 16.2 17.77L17.42 16.55C17.6921 16.306 18.0273 16.1476 18.3876 16.0912C18.7479 16.0349 19.1182 16.0831 19.45 16.23C20.3823 16.6054 21.3613 16.8632 22.36 17C22.8186 17.0717 23.2497 17.3143 23.562 17.6737C23.8743 18.033 24.0435 18.4857 24.04 18.95L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles['contact__detail-content']}>
                    <h4 className={styles['contact__detail-title']}>Phone</h4>
                    <p className={styles['contact__detail-text']}>(555) 789-1234</p>
                  </div>
                </div>
                
                <div className={styles.contact__detail}>
                  <div className={styles['contact__detail-icon']}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles['contact__detail-content']}>
                    <h4 className={styles['contact__detail-title']}>Email</h4>
                    <p className={styles['contact__detail-text']}>info@mealplans.com</p>
                  </div>
                </div>
                
                <div className={styles.contact__detail}>
                  <div className={styles['contact__detail-icon']}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles['contact__detail-content']}>
                    <h4 className={styles['contact__detail-title']}>Hours</h4>
                    <p className={styles['contact__detail-text']}>
                      Monday - Friday: 8:00 AM - 8:00 PM<br />
                      Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={styles.contact__socials}>
                <a href="https://facebook.com" className={styles.contact__social} aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://twitter.com" className={styles.contact__social} aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3.01006C22.0424 3.68553 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 22.6608 4.40277 23 3.01006Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://instagram.com" className={styles.contact__social} aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.contact__form}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4
              }
            } : { opacity: 0, x: 20 }}
          >
            {formStatus.submitted && formStatus.success ? (
              <div className={styles.contact__success}>
                <div className={styles['contact__success-icon']}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM20 34L10 24L13.42 20.58L20 27.16L34.58 12.58L38 16L20 34Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className={styles['contact__success-title']}>Message Sent!</h3>
                <p className={styles['contact__success-message']}>{formStatus.message}</p>
                <button 
                  className={styles['contact__success-button']}
                  onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className={styles.contact__form} onSubmit={handleSubmit}>
                <div className={styles.contact__fields}>
                  <div className={styles.contact__field}>
                    <label htmlFor="name" className={styles.contact__label}>Full Name</label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={styles.contact__input}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className={styles.contact__row}>
                    <div className={styles.contact__field}>
                      <label htmlFor="email" className={styles.contact__label}>Email</label>
                      <input 
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.contact__input}
                        placeholder="Your email address"
                        required
                      />
                    </div>
                    
                    <div className={styles.contact__field}>
                      <label htmlFor="phone" className={styles.contact__label}>Phone (Optional)</label>
                      <input 
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.contact__input}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.contact__field}>
                    <label htmlFor="dietaryPreference" className={styles.contact__label}>Dietary Preference (Optional)</label>
                    <select 
                      id="dietaryPreference"
                      name="dietaryPreference"
                      value={formData.dietaryPreference}
                      onChange={handleChange}
                      className={styles.contact__select}
                    >
                      <option value="">No specific preference</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="gluten-free">Gluten-Free</option>
                      <option value="keto">Keto/Low-Carb</option>
                      <option value="paleo">Paleo</option>
                      <option value="dairy-free">Dairy-Free</option>
                      <option value="other">Other (please specify in message)</option>
                    </select>
                  </div>
                  
                  <div className={styles.contact__field}>
                    <label htmlFor="message" className={styles.contact__label}>Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={styles.contact__textarea}
                      placeholder="Tell us about your meal plan needs or questions"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                </div>
                
                <button type="submit" className={styles.contact__submit}>
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CookingContact;