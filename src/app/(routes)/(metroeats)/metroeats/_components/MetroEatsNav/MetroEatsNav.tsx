"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMetroEatsCart } from "../../_context/MetroEatsCartContext";
import styles from "./MetroEatsNav.module.scss";

export default function MetroEatsNav() {
  const { cartCount, openCart } = useMetroEatsCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__inner}>
        <Link href="/metroeats" className={styles.nav__logo}>
          <Image
            src="/brand/metroeats/brand-logo/inline/white-on-yellow-inline.svg"
            alt="MetroEats"
            width={140}
            height={32}
            priority
          />
        </Link>

        <div className={styles.nav__links}>
          <div
            className={styles.nav__menuDropdown}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button className={styles.nav__link}>
              Our Menu
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: 4 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className={styles.nav__dropdown}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    href="/metroeats/menu?tab=plates"
                    className={styles.nav__dropItem}
                  >
                    Plates
                  </Link>
                  <Link
                    href="/metroeats/menu?tab=buckets"
                    className={styles.nav__dropItem}
                  >
                    Buckets
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="#subscribe" className={styles.nav__link}>
            Subscribe
          </Link>
          <Link href="#quick-order" className={styles.nav__link}>
            FAQ
          </Link>
        </div>

        <div className={styles.nav__actions}>
          <button
            className={styles.nav__cart}
            onClick={openCart}
            aria-label="View cart"
          >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            {cartCount > 0 && (
              <span className={styles.nav__cartBadge}>{cartCount}</span>
            )}
          </button>

          <Link href="/metroeats/menu" className={styles.nav__orderBtn}>
            My Pot
          </Link>

          <button
            className={styles.nav__burger}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.nav__mobile}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/metroeats/menu?tab=plates"
              className={styles.nav__mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              Plates
            </Link>
            <Link
              href="/metroeats/menu?tab=buckets"
              className={styles.nav__mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              Buckets
            </Link>
            <Link
              href="#subscribe"
              className={styles.nav__mobileLink}
              onClick={() => setMobileOpen(false)}
            >
              Subscribe & Save
            </Link>
            <Link
              href="/metroeats/menu"
              className={styles.nav__mobileOrder}
              onClick={() => setMobileOpen(false)}
            >
              Browse Full Menu
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
