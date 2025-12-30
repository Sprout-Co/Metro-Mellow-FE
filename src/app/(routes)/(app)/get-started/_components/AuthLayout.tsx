// components/auth/AuthLayout.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./AuthLayout.module.scss";
import { Button } from "@/components/ui/Button";

interface AuthLayoutProps {
  children: ReactNode;
  showImage?: boolean;
  title?: string;
  subtitle?: string;
  brandingCustomContent?: ReactNode;
}

export default function AuthLayout({
  children,
  showImage = true,
  title = "Your home, our priority",
  subtitle = "Trusted by thousands across Lagos for professional home services that make life easier.",
  brandingCustomContent = null,
}: AuthLayoutProps) {
  return (
    <section
      className={showImage ? styles.authLayout : styles.authLayout__noImage}
    >
      {/* Navbar */}
      <nav className={styles.authLayout__navbar}>
        <div className={styles.authLayout__navbarContainer}>
          <Link href="/" className={styles.authLayout__navbarLogo}>
            <Image
              src="/images/brand/brand-logo/transparent-bg/yellow.png"
              alt="Metromellow Logo"
              width={180}
              height={70}
            />
          </Link>
          <Link href="/services" className={styles.authLayout__helpLink}>
            Explore Services →
          </Link>
        </div>
      </nav>

      <div className={styles.authLayout__container}>
        <div className={styles.authLayout__wrapper}>
          {showImage && (
            <div className={styles.authLayout__branding}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className={styles.authLayout__brandingTitle}>{title}</h2>
                <p className={styles.authLayout__brandingText}>{subtitle}</p>
                {brandingCustomContent}
              </motion.div>
            </div>
          )}

          <div className={styles.authLayout__card}>{children}</div>
        </div>
      </div>
    </section>
  );
}
