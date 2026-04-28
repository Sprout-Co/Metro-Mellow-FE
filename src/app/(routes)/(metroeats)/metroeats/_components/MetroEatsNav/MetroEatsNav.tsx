"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShoppingBag,
  ChevronDown,
  Menu as MenuIcon,
  X,
  ClipboardList,
  Utensils,
  Soup,
  Sparkles,
  Zap,
} from "lucide-react";
import { useMetroEatsCart } from "../../_context/MetroEatsCartContext";
import styles from "./MetroEatsNav.module.scss";

type NavLink = {
  label: string;
  href: string;
  match?: (pathname: string, search: URLSearchParams) => boolean;
  icon?: React.ReactNode;
};

export default function MetroEatsNav() {
  const { cartCount, openCart } = useMetroEatsCart();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const isMenuActive =
    pathname?.startsWith("/metroeats/menu") ?? false;
  const isQuickOrderActive = pathname === "/metroeats";
  const isSubscribeActive = pathname === "/metroeats/plus";

  const menuLinks: NavLink[] = [
    {
      label: "Plates",
      href: "/metroeats/menu?tab=plates",
      icon: <Utensils size={16} />,
    },
    {
      label: "Bowls",
      href: "/metroeats/menu?tab=bowls",
      icon: <Soup size={16} />,
    },
  ];

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <div className={styles.navInner}>
        <Link
          href="/metroeats"
          className={styles.logo}
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/images/metroeats/brand-logo/inline/white-on-yellow-inline.svg"
            alt="MetroEats"
            width={140}
            height={32}
            priority
            className={styles.logoImage}
          />
        </Link>

        <div className={styles.links}>
          <div
            className={styles.menuDropdown}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              className={`${styles.link} ${isMenuActive ? styles.linkActive : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
            >
              <span>Menu</span>
              <ChevronDown
                size={14}
                className={`${styles.linkChevron} ${menuOpen ? styles.linkChevronOpen : ""}`}
              />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {menuLinks.map((link) => {
                    const active =
                      isMenuActive &&
                      searchParams?.get("tab") === link.label.toLowerCase();
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.dropItem} ${active ? styles.dropItemActive : ""}`}
                      >
                        <span className={styles.dropItemIcon}>{link.icon}</span>
                        <div>
                          <span className={styles.dropItemLabel}>
                            {link.label}
                          </span>
                          <span className={styles.dropItemHint}>
                            {link.label === "Plates"
                              ? "Hearty signature meals"
                              : "Wholesome, balanced bowls"}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                  <Link
                    href="/metroeats/menu"
                    className={styles.dropItemFooter}
                  >
                    Browse full menu
                    <ChevronDown
                      size={14}
                      style={{ transform: "rotate(-90deg)" }}
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/metroeats/plus"
            className={`${styles.link} ${isSubscribeActive ? styles.linkActive : ""}`}
          >
            <Sparkles size={14} className={styles.linkIcon} />
            Subscribe
          </Link>
          <Link
            href="/metroeats"
            className={`${styles.link} ${isQuickOrderActive ? styles.linkActive : ""}`}
          >
            <Zap size={14} className={styles.linkIcon} />
            Quick Order
          </Link>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.cart}
            onClick={openCart}
            aria-label="View cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <Link href="/metroeats/dashboard" className={styles.orderBtn}>
            <ClipboardList size={16} />
            <span>Orders</span>
          </Link>

          <button
            className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={styles.burgerIcon}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={styles.burgerIcon}
                >
                  <MenuIcon size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className={styles.mobile}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className={styles.mobileGroup}>
                <span className={styles.mobileGroupLabel}>Order</span>
                <Link
                  href="/metroeats/dashboard"
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileLinkIcon}>
                    <ClipboardList size={18} />
                  </span>
                  <div className={styles.mobileLinkText}>
                    <span className={styles.mobileLinkLabel}>My Orders</span>
                    <span className={styles.mobileLinkHint}>
                      Track and reorder
                    </span>
                  </div>
                </Link>
                <Link
                  href="/metroeats"
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileLinkIcon}>
                    <Zap size={18} />
                  </span>
                  <div className={styles.mobileLinkText}>
                    <span className={styles.mobileLinkLabel}>Quick Order</span>
                    <span className={styles.mobileLinkHint}>
                      Reorder favorites in a tap
                    </span>
                  </div>
                </Link>
              </div>

              <div className={styles.mobileGroup}>
                <span className={styles.mobileGroupLabel}>Menu</span>
                <Link
                  href="/metroeats/menu?tab=plates"
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileLinkIcon}>
                    <Utensils size={18} />
                  </span>
                  <div className={styles.mobileLinkText}>
                    <span className={styles.mobileLinkLabel}>Plates</span>
                    <span className={styles.mobileLinkHint}>
                      Hearty signature meals
                    </span>
                  </div>
                </Link>
                <Link
                  href="/metroeats/menu?tab=bowls"
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileLinkIcon}>
                    <Soup size={18} />
                  </span>
                  <div className={styles.mobileLinkText}>
                    <span className={styles.mobileLinkLabel}>Bowls</span>
                    <span className={styles.mobileLinkHint}>
                      Wholesome, balanced bowls
                    </span>
                  </div>
                </Link>
                <Link
                  href="/metroeats/plus"
                  className={styles.mobileLink}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={styles.mobileLinkIcon}>
                    <Sparkles size={18} />
                  </span>
                  <div className={styles.mobileLinkText}>
                    <span className={styles.mobileLinkLabel}>Subscribe</span>
                    <span className={styles.mobileLinkHint}>
                      Save with weekly plans
                    </span>
                  </div>
                </Link>
              </div>

              <Link
                href="/metroeats/menu"
                className={styles.mobileCta}
                onClick={() => setMobileOpen(false)}
              >
                <ShoppingBag size={16} />
                Browse full menu
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
