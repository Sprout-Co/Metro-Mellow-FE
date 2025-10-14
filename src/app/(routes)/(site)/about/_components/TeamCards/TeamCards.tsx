"use client";

import React from "react";
import Image from "next/image";
import styles from "./TeamCards.module.scss";
import { motion } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  category: "leadership" | "operations" | "customer" | "quality";
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Jubril",
    role: "CEO & Co-Founder",
    bio: "Passionate about solving Lagos' service challenges through technology and human connection.",
    image: "/images/leadership/jubril.jpg",
    category: "leadership"
  },
  {
    id: "2",
    name: "Faruq",
    role: "COO & Co-Founder",
    bio: "Expert in operations and logistics. Leads our service delivery and quality assurance teams.",
    image: "/images/leadership/faruq.jpg",
    category: "leadership"
  }
];

const TeamCards: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "leadership":
        return styles["team-card--leadership"];
      case "operations":
        return styles["team-card--operations"];
      case "customer":
        return styles["team-card--customer"];
      case "quality":
        return styles["team-card--quality"];
      default:
        return styles["team-card--default"];
    }
  };

  return (
    <section className={styles.teamCards}>
      <div className={styles.teamCards__container}>
        <motion.div
          className={styles.teamCards__header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.teamCards__title}>Meet Our Leadership Team</h2>
          <p className={styles.teamCards__subtitle}>
            The passionate professionals behind Metromellow's mission to transform home services in Lagos
          </p>
        </motion.div>

        <motion.div
          className={styles.teamCards__grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className={`${styles.teamCard} ${getCategoryColor(member.category)}`}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={styles.teamCard__imageWrapper}>
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  width={300}
                  height={300}
                  className={styles.teamCard__image}
                />
                <div className={styles.teamCard__overlay}>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.teamCard__linkedin}
                      aria-label={`Connect with ${member.name} on LinkedIn`}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.teamCard__content}>
                <h3 className={styles.teamCard__name}>{member.name}</h3>
                <p className={styles.teamCard__role}>{member.role}</p>
                <p className={styles.teamCard__bio}>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamCards;
