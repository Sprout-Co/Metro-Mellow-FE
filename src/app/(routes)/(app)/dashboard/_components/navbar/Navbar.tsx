"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { Bell, ChevronDown, MapPin } from "lucide-react";
import AddAddressModal from "./AddAddressModal/AddAddressModal";

// Icons (you can replace these with your preferred icon library)

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        {/* Logo */}
        <div className={styles.navbar__logoContainer}>
          <Link href="/dashboard" className={styles.navbar__logo}>
            <div>
              <Image
                src="/images/brand/brand-logo/transparent-bg/green.png"
                alt="Metro Mellow Logo"
                width={150}
                height={150}
              />
            </div>
          </Link>
          <motion.div
            className={styles.navbar__location}
            onClick={() => setIsAddAddressModalOpen(true)}
          >
            <MapPin />
            <span className={styles.navbar__locationText}>
              Anike Ologuntoye Avenue, Lagos, Nigeria
            </span>
            <ChevronDown />
          </motion.div>
        </div>
        {/* Navigation Links - Desktop */}
        {/* <div className={styles.navbar__links}>
          <motion.div className={styles.navbar__linkContainer}>
            {["overview", "services", "bookings", "history"].map((tab) => (
              <motion.div
                key={tab}
                className={`${styles.navbar__linkItem} ${activeTab === tab ? styles["navbar__linkItem--active"] : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                <Link href={`/dashboard/${tab === "overview" ? "" : tab}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Link>
                {activeTab === tab && (
                  <motion.div
                    className={styles.navbar__linkIndicator}
                    layoutId="indicator"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div> */}

        {/* Right Section */}
        <div className={styles.navbar__actions}>
          {/* Location */}
          <FnButton variant="primary" size="sm">
            Order Now!
          </FnButton>
          {/* Notification */}
          <motion.div className={styles.navbar__iconButton}>
            <Bell />
          </motion.div>

          {/* Cart */}
          <motion.div className={styles.navbar__iconButton}>
            <div className={styles.navbar__cartContainer}>
              <CartIcon />
              <div className={styles.navbar__cartBadge}>0</div>
            </div>
          </motion.div>

          {/* User Profile */}
          <motion.div className={styles.navbar__profile}>
            <span className={styles.navbar__profileGreeting}>Hi, Sarah</span>
            <div className={styles.navbar__profileAvatar}>
              <div className={styles.navbar__profileInitial}>S</div>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.navbar__menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.navbar__mobileMenu}>
          {["overview", "services", "bookings", "history"].map((tab) => (
            <div
              key={tab}
              className={`${styles.navbar__mobileMenuItem} ${activeTab === tab ? styles["navbar__mobileMenuItem--active"] : ""}`}
              onClick={() => {
                setActiveTab(tab);
                setIsMenuOpen(false);
              }}
            >
              <Link href={`/dashboard/${tab === "overview" ? "" : tab}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Link>
            </div>
          ))}
        </div>
      )}

      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
