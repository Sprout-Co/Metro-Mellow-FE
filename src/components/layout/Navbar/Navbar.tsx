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
        title: 'Cleaning',
        href: '/services/cleaning',
        description: 'Professional home cleaning services',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        )
    },
    {
        title: 'Laundry',
        href: '/services/laundry',
        description: 'Professional laundry and dry cleaning services',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
        )
    },
    {
        title: 'Food',
        href: '/services/food',
        description: 'Delicious home-cooked meals prepared fresh',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
        )
    }
];

// Main navigation items
const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    {
        label: 'SERVICES',
        href: '/services',
        hasDropdown: true,
        dropdownItems: serviceItems
    },
    { label: 'BOOKINGS', href: '/bookings' },
    { label: 'CONTACT', href: '/contact' },
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
                    <div className={styles.navbar__logo}>
                        {/* Logo placeholder - can be replaced with actual logo */}
                   
                        {/* <div className={styles.navbar__logoMark}>

                        </div> */}
                             <Image
                        src="/images/brand/cover.png"
                        alt="Urban Serve"
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
                                className={`${styles.navbar__item} ${isActive(item.href) ? styles['navbar__item--active'] : ''}`}
                            >
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            className={`${styles.navbar__link} ${styles['navbar__link--hasDropdown']} ${activeDropdown === item.label ? styles['navbar__link--dropdownActive'] : ''}`}
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
                                                                    <div className={styles.navbar__dropdownContent}>
                                                                        <h4 className={styles.navbar__dropdownItemTitle}>
                                                                            {dropdownItem.title}
                                                                        </h4>
                                                                        <p className={styles.navbar__dropdownItemDesc}>
                                                                            {dropdownItem.description}
                                                                        </p>
                                                                    </div>
                                                                    <div className={styles.navbar__dropdownIcon}>
                                                                        {dropdownItem.icon}
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
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
                    <Link href="/login" className={styles.navbar__loginBtn}>
                        LOGIN
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
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className={styles.navbar__mobileHeader}>
                                <div className={styles.navbar__mobileLogo}>
                                    <div className={styles.navbar__logoMark}></div>
                                </div>
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
                                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            >
                                                                <ul className={styles.navbar__mobileSubmenuList}>
                                                                    {item.dropdownItems?.map((dropdownItem) => (
                                                                        <li key={dropdownItem.href} className={styles.navbar__mobileSubmenuItem}>
                                                                            <Link
                                                                                href={dropdownItem.href}
                                                                                className={styles.navbar__mobileSubmenuLink}
                                                                            >
                                                                                <div className={styles.navbar__mobileSubmenuIcon}>
                                                                                    {dropdownItem.icon}
                                                                                </div>
                                                                                <div>
                                                                                    <div className={styles.navbar__mobileSubmenuTitle}>
                                                                                        {dropdownItem.title}
                                                                                    </div>
                                                                                    <div className={styles.navbar__mobileSubmenuDesc}>
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
                                                <Link href={item.href} className={styles.navbar__mobileLink}>
                                                    {item.label}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className={styles.navbar__mobileFooter}>
                                <Link href="/login" className={styles.navbar__mobileButton}>
                                    LOGIN
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}