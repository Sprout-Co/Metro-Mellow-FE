"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { ChevronDown, MapPin, Menu, User } from "lucide-react";
import { NotificationButton } from "@/components/ui/Notifications/NotificationButton/NotificationButton";
import { NotificationDrawer } from "@/components/ui/Notifications/NotificationDrawer/NotificationDrawer";
import AddAddressModal from "./AddAddressModal/AddAddressModal";
import { useDispatch, useSelector } from "react-redux";
import { openServicesListDrawer } from "@/lib/redux/slices/uiSlice";
import { RootState } from "@/lib/redux/store";
import CartModal from "@/components/ui/booking/modals/CartModal/CartModal";

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
              {user?.defaultAddress?.street &&
              user.defaultAddress.street.length > 35
                ? user.defaultAddress.street.slice(0, 35) + "..."
                : user?.defaultAddress?.street || "N/A"}
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
