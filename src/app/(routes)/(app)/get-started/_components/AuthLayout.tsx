// components/auth/AuthLayout.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, Clock } from "lucide-react";
import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  children: ReactNode;
  showImage?: boolean;
}

export default function AuthLayout({
  children,
  showImage = true,
}: AuthLayoutProps) {
  return (
    <section
      className={showImage ? styles.authLayout : styles.authLayout__noImage}
    >
      <div className={styles.authLayout__container}>
        <div className={styles.authLayout__wrapper}>
          <div className={styles.authLayout__card}>{children}</div>

          {showImage && (
            <div className={styles.authLayout__imageWrapper}>
              <div className={styles.authLayout__image}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className={styles.authLayout__imageTitle}>
                    Your Home, Our Priority
                  </h2>
                  <p className={styles.authLayout__imageText}>
                    Experience premium home cleaning services designed around
                    your busy lifestyle.
                  </p>
                </motion.div>

                <motion.div
                  className={styles.authLayout__features}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className={styles.authLayout__feature}>
                    <div className={styles.authLayout__featureIcon}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4>Flexible Scheduling</h4>
                      <p>Book cleanings that fit your schedule</p>
                    </div>
                  </div>
                  <div className={styles.authLayout__feature}>
                    <div className={styles.authLayout__featureIcon}>
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4>Vetted Professionals</h4>
                      <p>Background-checked & trained cleaners</p>
                    </div>
                  </div>
                  <div className={styles.authLayout__feature}>
                    <div className={styles.authLayout__featureIcon}>
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4>Spotless Results</h4>
                      <p>Satisfaction guaranteed every time</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className={styles.authLayout__testimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <p className={styles.authLayout__quote}>
                    "Coming home to a spotless apartment after a long day is
                    everything. Metromellow made it so easy!"
                  </p>
                  <div className={styles.authLayout__author}>
                    <div className={styles.authLayout__authorAvatar}>T</div>
                    <div>
                      <div className={styles.authLayout__authorName}>
                        Tolu A.
                      </div>
                      <div className={styles.authLayout__authorTitle}>
                        Lagos Customer
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
