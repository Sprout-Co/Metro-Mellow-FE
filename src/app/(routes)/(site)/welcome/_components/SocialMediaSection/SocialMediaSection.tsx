"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import styles from "./SocialMediaSection.module.scss";

const SocialMediaSection: FC = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/metromellow-ltd/",
      ariaLabel: "Visit Metromellow LinkedIn profile",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/metromellowhq/",
      ariaLabel: "Visit Metromellow Instagram profile",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/metromellowhq",
      ariaLabel: "Visit Metromellow Twitter profile",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.socialMediaSection}>
      <div className={styles.socialMediaSection__container}>
        <motion.div
          className={styles.socialMediaSection__header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          <h2 className={styles.socialMediaSection__title}>
            <span className={styles["socialMediaSection__title--accent"]}>
              Follow Us
            </span>
            <span className={styles["socialMediaSection__title--main"]}>
              Stay Connected
            </span>
          </h2>
          <p className={styles.socialMediaSection__subtitle}>
            Follow us on social media for updates, behind-the-scenes content,
            and exclusive announcements.
          </p>
        </motion.div>

        <motion.div
          className={styles.socialMediaSection__socialLinks}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialMediaSection__socialLink}
              aria-label={link.ariaLabel}
              variants={itemVariants}
            >
              <div className={styles.socialMediaSection__socialIconWrapper}>
                <link.icon className={styles.socialMediaSection__socialIcon} />
              </div>
              <span className={styles.socialMediaSection__socialName}>
                {link.name}
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className={styles.socialMediaSection__tagline}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
        >
          Join our growing community as we prepare to transform home services in
          Nigeria.
        </motion.p>
      </div>
    </section>
  );
};

export default SocialMediaSection;
