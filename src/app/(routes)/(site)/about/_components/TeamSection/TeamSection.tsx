'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './TeamSection.module.scss';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    position: 'Co-Founder & CEO',
    bio: 'Sarah has over 15 years of experience in the service industry and a passion for creating exceptional customer experiences.',
    image: '/images/team/sarah.webp',
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    position: 'Co-Founder & COO',
    bio: 'Marcus brings operational expertise and a commitment to quality standards that form the foundation of our service delivery.',
    image: '/images/team/marcus.webp',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    position: 'Customer Experience Director',
    bio: 'Elena ensures that every client interaction exceeds expectations and strengthens our relationship with customers.',
    image: '/images/team/elena.webp',
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'Head of Professional Services',
    bio: 'David leads our team of service professionals, focusing on training, quality assurance, and service innovation.',
    image: '/images/team/david.webp',
  },
];

export default function TeamSection() {
  return (
    <section className={styles.team}>
      <div className={styles.team__container}>
        <motion.div 
          className={styles.team__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.team__title}>Meet Our Leadership Team</h2>
          <p className={styles.team__subtitle}>
            The dedicated individuals who guide our vision and ensure excellence in everything we do
          </p>
        </motion.div>
        
        <div className={styles.team__grid}>
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id}
              className={styles.team__member}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.team__imageWrapper}>
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={300} 
                  height={350}
                  className={styles.team__image}
                />
                <div className={styles.team__overlay}>
                  <div className={styles.team__social}>
                    <a href="#" className={styles.team__socialLink} aria-label="LinkedIn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="#" className={styles.team__socialLink} aria-label="Twitter">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.team__info}>
                <h3 className={styles.team__name}>{member.name}</h3>
                <p className={styles.team__position}>{member.position}</p>
                <p className={styles.team__bio}>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}