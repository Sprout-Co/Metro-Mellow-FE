'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.scss';
import Button from '@/components/ui/Button/Button';

// Define service dropdown items
const serviceItems = [
    {
        title: 'Residential Cleaning',
        href: '/services/residential-cleaning',
        description: 'Professional home cleaning services',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        )
    },
    {
        title: 'Commercial Cleaning',
        href: '/services/commercial-cleaning',
        description: 'Office and workspace sanitization',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
        )
    },
    {
        title: 'Deep Cleaning',
        href: '/services/deep-cleaning',
        description: 'End-to-end thorough cleaning',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        )
    },
    {
        title: 'Specialized Services',
        href: '/services/specialized',
        description: 'Customized cleaning solutions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        )
    }
];

// Main navigation items
const navItems = [
    { label: 'Home', href: '/' },
    {
        label: 'Services',
        href: '/services',
        hasDropdown: true,
        dropdownItems: serviceItems
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setActiveDropdown(null);
    };

    const toggleDropdown = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const navbarClasses = [
        styles.navbar,
        isScrolled ? styles['navbar--scrolled'] : '',
        isMobileMenuOpen ? styles['navbar--menuOpen'] : ''
    ].filter(Boolean).join(' ');

    return (
        <header className={navbarClasses}>
            <div className={styles.navbar__container}>
                {/* Brand Logo */}
                <Link href="/" className={styles.navbar__brand}>
                    <Image
                        src="/images/brand/cover.png"
                        alt="Urban Serve"
                        width={140}
                        height={40}
                        className={styles.navbar__logo}
                    />
                </Link>

                {/* Main Navigation - Desktop */}
                <nav className={styles.navbar__nav} ref={dropdownRef}>
                    <ul className={styles.navbar__list}>
                        {navItems.map((item) => (
                            <li
                                key={item.label}
                                className={`${styles.navbar__item} ${isActive(item.href) ? styles['navbar__item--active'] : ''}`}
                            >
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            className={`${styles.navbar__link} ${styles['navbar__link--hasDropdown']} ${activeDropdown === item.label ? styles['navbar__link--dropdownActive'] : ''}`}
                                            onClick={() => toggleDropdown(item.label)}
                                            aria-expanded={activeDropdown === item.label}
                                        >
                                            <span> {item.label}</span>

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
                                                    <div className={styles.navbar__dropdownWrapper}>
                                                        <div className={styles.navbar__dropdownHeader}>
                                                            <h3 className={styles.navbar__dropdownTitle}>Our Services</h3>
                                                            <p className={styles.navbar__dropdownDesc}>
                                                                Explore our range of professional cleaning services
                                                            </p>
                                                        </div>

                                                        <div className={styles.navbar__dropdownGrid}>
                                                            {item.dropdownItems?.map((dropdownItem) => (
                                                                <Link
                                                                    key={dropdownItem.href}
                                                                    href={dropdownItem.href}
                                                                    className={styles.navbar__dropdownItem}
                                                                >
                                                                    <div className={styles.navbar__dropdownIcon}>
                                                                        {dropdownItem.icon}
                                                                    </div>
                                                                    <div className={styles.navbar__dropdownContent}>
                                                                        <span className={styles.navbar__dropdownItemTitle}>
                                                                            {dropdownItem.title}
                                                                        </span>
                                                                        <span className={styles.navbar__dropdownItemDesc}>
                                                                            {dropdownItem.description}
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>

                                                        <div className={styles.navbar__dropdownFooter}>
                                                            <Link href="/services" className={styles.navbar__dropdownLink}>
                                                                View all services
                                                                <svg
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
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                                </svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={styles.navbar__link}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Call-to-Action Buttons */}
                <div className={styles.navbar__actions}>
                    <div className={styles.navbar__phone}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <a href="tel:+12345678900" className={styles.navbar__phoneLink}>
                            (234) 567-8900
                        </a>
                    </div>

                    <Button
                        variant="primary"
                        size="sm"
                        href="/booking"
                        className={styles.navbar__button}
                    >
                        Book Now
                    </Button>
                </div>

                {/* Mobile Menu Button */}
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
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className={styles.navbar__mobileHeader}>
                                <Image
                                    src="/images/cover.png"
                                    alt="Urban Serve"
                                    width={120}
                                    height={35}
                                    className={styles.navbar__mobileLogo}
                                />
                                <button
                                    className={styles.navbar__mobileClose}
                                    onClick={toggleMobileMenu}
                                    aria-label="Close menu"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            <nav className={styles.navbar__mobileNav}>
                                <ul className={styles.navbar__mobileList}>
                                    {navItems.map((item) => (
                                        <li
                                            key={item.label}
                                            className={`${styles.navbar__mobileItem} ${isActive(item.href) ? styles['navbar__mobileItem--active'] : ''}`}
                                        >
                                            {item.hasDropdown ? (
                                                <>
                                                    <button
                                                        className={`${styles.navbar__mobileLink} ${activeDropdown === item.label ? styles['navbar__mobileLink--open'] : ''}`}
                                                        onClick={() => toggleDropdown(item.label)}
                                                        aria-expanded={activeDropdown === item.label}
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
                                                                className={styles.navbar__mobileSubmenu}
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <ul className={styles.navbar__mobileSubmenuList}>
                                                                    {item.dropdownItems?.map((dropdownItem) => (
                                                                        <li key={dropdownItem.href} className={styles.navbar__mobileSubmenuItem}>
                                                                            <Link href={dropdownItem.href} className={styles.navbar__mobileSubmenuLink}>
                                                                                <span className={styles.navbar__mobileSubmenuIcon}>
                                                                                    {dropdownItem.icon}
                                                                                </span>
                                                                                {dropdownItem.title}
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
                                <Button
                                    variant="primary"
                                    size="md"
                                    href="/booking"
                                    className={styles.navbar__mobileButton}
                                >
                                    Book Now
                                </Button>

                                <div className={styles.navbar__mobileContact}>
                                    <a href="tel:+12345678900" className={styles.navbar__mobilePhone}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                        (234) 567-8900
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}