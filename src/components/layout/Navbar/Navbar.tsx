"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.scss";
import Button from "@/components/ui/Button/Button";

// Define service dropdown items
const serviceItems = [
  {
    title: "Food",
    href: "/services/food",
    description: "Delicious home-cooked meals",
    image: "/images/food/food-hero.jpg",
  },
  {
    title: "Cleaning",
    href: "/services/cleaning",
    description: "Professional home cleaning services",
    image: "/images/cleaning/cleaning1.jpg",
  },
  {
    title: "Laundry",
    href: "/services/laundry",
    description: "Professional laundry and dry cleaning",
    image: "/images/home/home1.jpg",
  },

  {
    title: "Pest Control",
    href: "/services/pest-control",
    description: "Eco-friendly pest control solutions",
    image: "/images/pest-control/p1.jpeg",
  },
];

// Main navigation items
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    dropdownItems: serviceItems,
  },
  { label: "Blog", href: "/blog" },
  { label: "For Business", href: "/for-business" },
  { label: "Subscriptions", href: "/subscriptions" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdown when clicking outside (disabled while mobile menu is open)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const mobileMenu = document.querySelector(`.${styles.navbar__mobileMenu}`);
        const mobileToggle = document.querySelector(`.${styles.navbar__mobileToggle}`);
        
        if (
          mobileMenu &&
          !mobileMenu.contains(event.target as Node) &&
          mobileToggle &&
          !mobileToggle.contains(event.target as Node)
        ) {
          setIsMobileMenuOpen(false);
          setActiveDropdown(null);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const navbarClasses = [
    styles.navbar,
    isScrolled ? styles["navbar--scrolled"] : "",
    isMobileMenuOpen ? styles["navbar--menuOpen"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navbarClasses}>
      <div className={styles.navbar__wrapper}>
        <div className={styles.navbar__container}>
          {/* Brand Logo */}
          <Link href="/" className={styles.navbar__brand}>
            <div className={styles.navbar__logo}>
              <Image
                src="/images/brand/brand-logo/transparent-bg/green-on-white.png"
                alt="Metromellow"
                width={140}
                height={40}
                className={styles.navbar__logo}
              />
            </div>
          </Link>

          {/* Main Navigation - Desktop */}
          <nav className={styles.navbar__nav} ref={dropdownRef}>
            <ul className={styles.navbar__list}>
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`${styles.navbar__item} ${isActive(item.href) ? styles["navbar__item--active"] : ""}`}
                >
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={`${styles.navbar__link} ${styles["navbar__link--hasDropdown"]} ${activeDropdown === item.label ? styles["navbar__link--dropdownActive"] : ""}`}
                        onClick={() => toggleDropdown(item.label)}
                        aria-expanded={activeDropdown === item.label}
                      >
                        <span>{item.label}</span>
                        <svg
                          className={styles.navbar__dropdownIcon}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            className={styles.navbar__dropdown}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
                            <div className={styles.navbar__dropdownList}>
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href}
                                  className={styles.navbar__dropdownItem}
                                >
                                  <div className={styles.navbar__dropdownImage}>
                                    <Image
                                      src={dropdownItem.image}
                                      alt={dropdownItem.title}
                                      width={40}
                                      height={40}
                                      className={styles.navbar__dropdownImg}
                                    />
                                  </div>
                                  <div
                                    className={styles.navbar__dropdownContent}
                                  >
                                    <div
                                      className={styles.navbar__dropdownTitle}
                                    >
                                      {dropdownItem.title}
                                    </div>
                                    <div
                                      className={styles.navbar__dropdownDesc}
                                    >
                                      {dropdownItem.description}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} className={styles.navbar__link}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Button */}
          <div className={styles.navbar__actions}>
            <Link href="/get-started" className={styles.navbar__loginBtn}>
              Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.navbar__mobileToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.navbar__bar}></span>
            <span className={styles.navbar__bar}></span>
            <span className={styles.navbar__bar}></span>
          </button>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className={styles.navbar__mobileMenu}
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className={styles.navbar__mobileHeader}>
                  <div className={styles.navbar__mobileLogo}>
                    <Image
                      src="/images/brand/brand-logo/transparent-bg/green-on-white.png"
                      alt="Metromellow"
                      width={140}
                      height={40}
                      className={styles.navbar__logo}
                    />
                  </div>
                </div>

                <nav className={styles.navbar__mobileNav}>
                  <ul className={styles.navbar__mobileList}>
                    {navItems.map((item) => (
                      <li
                        key={item.label}
                        className={`${styles.navbar__mobileItem} ${isActive(item.href) ? styles["navbar__mobileItem--active"] : ""}`}
                      >
                        {item.hasDropdown ? (
                          <>
                            <button
                              type="button"
                              className={`${styles.navbar__mobileLink} ${activeDropdown === item.label ? styles["navbar__mobileLink--open"] : ""}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleDropdown(item.label);
                              }}
                              aria-expanded={activeDropdown === item.label}
                              aria-controls={`mobile-submenu-${item.label}`}
                            >
                              {item.label}
                              <svg
                                className={styles.navbar__mobileDropdownIcon}
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </button>

                            <AnimatePresence>
                              {activeDropdown === item.label && (
                                <motion.div
                                  id={`mobile-submenu-${item.label}`}
                                  className={styles.navbar__mobileSubmenu}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                  }}
                                >
                                  <ul
                                    className={styles.navbar__mobileSubmenuList}
                                  >
                                    {item.dropdownItems?.map((dropdownItem) => (
                                      <li
                                        key={dropdownItem.href}
                                        className={
                                          styles.navbar__mobileSubmenuItem
                                        }
                                      >
                                        <Link
                                          href={dropdownItem.href}
                                          className={
                                            styles.navbar__mobileSubmenuLink
                                          }
                                          onClick={() => {
                                            setActiveDropdown(null);
                                            setIsMobileMenuOpen(false);
                                          }}
                                        >
                                          <div
                                            className={
                                              styles.navbar__mobileSubmenuImage
                                            }
                                          >
                                            <Image
                                              src={dropdownItem.image}
                                              alt={dropdownItem.title}
                                              width={35}
                                              height={35}
                                              className={
                                                styles.navbar__mobileSubmenuImg
                                              }
                                            />
                                          </div>
                                          <div
                                            className={
                                              styles.navbar__mobileSubmenuContent
                                            }
                                          >
                                            <div
                                              className={
                                                styles.navbar__mobileSubmenuTitle
                                              }
                                            >
                                              {dropdownItem.title}
                                            </div>
                                            <div
                                              className={
                                                styles.navbar__mobileSubmenuDesc
                                              }
                                            >
                                              {dropdownItem.description}
                                            </div>
                                          </div>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            className={styles.navbar__mobileLink}
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className={styles.navbar__mobileFooter}>
                  <Link
                    href="/get-started"
                    className={styles.navbar__mobileButton}
                  >
                    Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
