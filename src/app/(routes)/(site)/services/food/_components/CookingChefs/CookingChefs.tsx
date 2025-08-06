'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './CookingChefs.module.scss';

interface Chef {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const CookingChefs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const chefs: Chef[] = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Executive Chef",
      bio: "With 15 years of experience in Michelin-starred restaurants across Europe and America, Chef Alex brings international flavors and techniques to our meal plans. Specializing in fusion cuisine that balances nutrition and taste.",
      image: "/images/cooking/chef-alex.webp",
      socialLinks: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: 2,
      name: "Maya Johnson",
      role: "Nutritionist & Menu Developer",
      bio: "Maya holds a Master's in Nutrition Science and has worked with professional athletes and health-focused restaurants. She ensures our meals are nutritionally balanced while never compromising on flavor and satisfaction.",
      image: "/images/cooking/chef-maya.webp",
      socialLinks: {
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      id: 3,
      name: "David Chen",
      role: "Specialty Diet Chef",
      bio: "Specializing in creating delicious meals for dietary restrictions, Chef David transforms classic recipes into allergen-free, keto, paleo, and plant-based versions that taste just as good as the originals.",
      image: "/images/cooking/chef-david.webp",
      socialLinks: {
        instagram: "https://instagram.com",
        twitter: "https://twitter.com"
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="chefs" className={styles.chefs} ref={sectionRef}>
      <div className={styles.chefs__container}>
        <motion.div 
          className={styles.chefs__heading}
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
          <span className={styles.chefs__subheading}>Meet Our Team</span>
          <h2 className={styles.chefs__title}>The Culinary Experts Behind Your Meals</h2>
          <p className={styles.chefs__description}>
            Our team of professional chefs and nutritionists work together to create delicious, healthy meals that cater to your specific dietary needs and preferences.
          </p>
        </motion.div>

        <motion.div 
          className={styles.chefs__grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {chefs.map((chef) => (
            <motion.div 
              key={chef.id}
              className={styles.chefs__card}
              variants={itemVariants}
            >
              <div className={styles['chefs__card-image']}>
                <Image 
                  src={chef.image}
                  alt={chef.name}
                  width={300}
                  height={350}
                  className={styles['chefs__card-img']}
                />
                <div className={styles['chefs__card-socials']}>
                  {chef.socialLinks.instagram && (
                    <a href={chef.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className={styles['chefs__card-social']} aria-label="Instagram">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.8 0H14.2C17.4 0 20 2.6 20 5.8V14.2C20 17.4 17.4 20 14.2 20H5.8C2.6 20 0 17.4 0 14.2V5.8C0 2.6 2.6 0 5.8 0ZM5.6 2C3.61 2 2 3.61 2 5.6V14.4C2 16.39 3.61 18 5.6 18H14.4C16.39 18 18 16.39 18 14.4V5.6C18 3.61 16.39 2 14.4 2H5.6ZM15.25 3.5C15.6642 3.5 16 3.83579 16 4.25C16 4.66421 15.6642 5 15.25 5C14.8358 5 14.5 4.66421 14.5 4.25C14.5 3.83579 14.8358 3.5 15.25 3.5ZM10 5C12.7614 5 15 7.23858 15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5ZM10 7C8.3431 7 7 8.3431 7 10C7 11.6569 8.3431 13 10 13C11.6569 13 13 11.6569 13 10C13 8.3431 11.6569 7 10 7Z" fill="currentColor"/>
                      </svg>
                    </a>
                  )}
                  {chef.socialLinks.linkedin && (
                    <a href={chef.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={styles['chefs__card-social']} aria-label="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.47679 20H0.330357V6.64702H4.47679V20ZM2.40134 4.82555C1.07545 4.82555 0 3.72857 0 2.40268C9.49017e-09 1.76583 0.252998 1.15523 0.702988 0.705243C1.15298 0.255252 1.76358 0.00225385 2.40134 0.00225385C3.03911 0.00225385 3.6497 0.255252 4.0997 0.705243C4.54969 1.15523 4.80268 1.76583 4.80268 2.40268C4.80268 3.72857 3.72679 4.82555 2.40134 4.82555ZM19.9955 20H15.858V13.4997C15.858 11.9524 15.8268 9.96415 13.7022 9.96415C11.5464 9.96415 11.2161 11.6569 11.2161 13.4015V20H7.07411V6.64702H11.0509V8.46848H11.1089C11.6625 7.41936 13.0147 6.31005 15.0321 6.31005C19.2286 6.31005 20 9.07565 20 12.665V20H19.9955Z" fill="currentColor"/>
                      </svg>
                    </a>
                  )}
                  {chef.socialLinks.twitter && (
                    <a href={chef.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className={styles['chefs__card-social']} aria-label="Twitter">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.9442 5.88596C17.9569 6.04796 17.9569 6.20997 17.9569 6.37198C17.9569 12.0008 13.8325 18.5046 6.29451 18.5046C3.97175 18.5046 1.81471 17.8568 0 16.7342C0.329937 16.7716 0.64719 16.784 0.989815 16.784C2.90607 16.784 4.67094 16.1612 6.07639 15.1007C4.27437 15.0633 2.7665 13.8908 2.24618 12.2505C2.5 12.2879 2.75382 12.3129 3.02032 12.3129C3.38783 12.3129 3.75535 12.2629 4.09788 12.1755C2.22149 11.7905 0.812775 10.1376 0.812775 8.14713V8.09712C1.35839 8.39701 1.99209 8.58461 2.66265 8.60961C1.56 7.86176 0.837706 6.62462 0.837706 5.23626C0.837706 4.46382 1.04086 3.75386 1.39569 3.14408C3.41252 5.58595 6.44661 7.17495 9.84709 7.34965C9.78224 7.04976 9.74486 6.73727 9.74486 6.42478C9.74486 4.20133 11.547 2.39932 13.8325 2.39932C15.0214 2.39932 16.0866 2.89891 16.8345 3.71894C17.7584 3.54426 18.6452 3.21917 19.4304 2.7695C19.1266 3.68135 18.4808 4.46382 17.6335 4.95071C18.4561 4.86311 19.2537 4.6381 19.9989 4.32561C19.4304 5.12078 18.7351 5.82814 17.9442 6.37198V5.88596Z" fill="currentColor"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className={styles['chefs__card-content']}>
                <h3 className={styles['chefs__card-name']}>{chef.name}</h3>
                <p className={styles['chefs__card-role']}>{chef.role}</p>
                <p className={styles['chefs__card-bio']}>{chef.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.chefs__note}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: "easeOut",
              delay: 0.6
            }
          } : { opacity: 0, y: 20 }}
        >
          <p>Our team is growing! We're always looking for talented chefs and nutritionists to join our mission of making healthy eating simple and delicious.</p>
          <a href="/careers" className={styles.chefs__button}>
            Join Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CookingChefs;