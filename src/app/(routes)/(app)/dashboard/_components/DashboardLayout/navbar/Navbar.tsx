"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { Bell, ChevronDown, MapPin, Menu, User } from "lucide-react";
import { NotificationButton } from "@/components/ui/Notifications/NotificationButton/NotificationButton";
import { NotificationDrawer } from "@/components/ui/Notifications/NotificationDrawer/NotificationDrawer";
import AddAddressModal from "./AddAddressModal/AddAddressModal";
import { useDispatch, useSelector } from "react-redux";
import { openServicesListDrawer } from "@/lib/redux/slices/uiSlice";
import { RootState } from "@/lib/redux/store";
import CartModal from "@/components/ui/booking/modals/CartModal/CartModal";

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


interface NavbarProps {
  handleSidebarToggle: (collapsed: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleSidebarToggle }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const openCartModal = () => {
    setIsCartModalOpen(true);
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        {/* Logo */}
        <div className={styles.navbar__logoContainer}>
          <Link href="/dashboard" className={styles.navbar__logo}>
            <div className={styles.navbar__logoDesktop}>
              <Image
                src="/images/brand/brand-logo/transparent-bg/green.png"
                alt="Metromellow Logo"
                width={150}
                height={150}
              />
            </div>
            <div className={styles.navbar__logoMobile}>
              <Image
                src="/images/brand/brand-logo/single-logo/primary.png"
                alt="Metromellow Logo"
                width={40}
                height={40}
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
        {/* Right Section */}
        <div className={styles.navbar__actions}>
          {/* Location */}
          <FnButton
            variant="primary"
            size="sm"
            onClick={() => dispatch(openServicesListDrawer())}
          >
            Order Now!
          </FnButton>
          {/* Notification */}
          <NotificationButton
            className={styles.navbar__notificationDropdown}
            onNotificationClick={(notification) => {
              console.log("Customer notification clicked:", notification);
              // Handle notification click - could navigate to specific page
            }}
            onViewAllClick={() => setIsNotificationDrawerOpen(true)}
          />

          {/* Cart */}
          {/* <motion.div className={styles.navbar__iconButton}>
            <div
              className={styles.navbar__cartContainer}
              onClick={() => openCartModal()}
            >
              <CartIcon />
              <div className={styles.navbar__cartBadge}>0</div>
            </div>
          </motion.div> */}

          {/* User Profile */}
          <motion.div className={styles.navbar__profile}>
            <span className={styles.navbar__profileGreeting}>
              Hi, {user?.firstName}
            </span>
            <div className={styles.navbar__profileAvatar}>
              <User />
            </div>
          </motion.div>

          <motion.div
            className={styles.navbar__menuIcon}
            onClick={() => handleSidebarToggle(false)}
          >
            <Menu />
          </motion.div>
        </div>
      </div>


      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        items={[]}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
      />
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        onNotificationClick={(notification) => {
          console.log("Drawer notification clicked:", notification);
          // Handle notification click - could navigate to specific page
        }}
        position="right"
      />
    </nav>
  );
};

export default Navbar;
