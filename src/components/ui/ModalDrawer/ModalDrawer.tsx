import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ModalDrawer.module.scss";
import {
  Home,
  CalendarDays,
  Repeat,
  CreditCard,
  Gift,
  User,
  MessageSquare,
  ChevronRight,
  List,
  MapPin,
  Heart,
  Bell,
  Settings,
  LogOut,
  PlusCircle,
  HelpCircle,
  Wallet,
  Clock,
} from "lucide-react";

interface ModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg" | "full-screen";
}

const ModalDrawer: React.FC<ModalDrawerProps> = ({
  isOpen,
  onClose,
  footer,
  children,
  width = "md",
}) => {
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: 20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const modalDrawerClasses = [
    styles.modalDrawer,
    styles[`modalDrawer--${width}`],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.modalDrawer__overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={modalDrawerClasses}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
          >
            {children}

            {/* {!footer ? (
              <motion.div
                className={styles.modalDrawer__footer}
                variants={itemVariants}
              >
                <Image
                  src="/images/brand/brand-logo/transparent-bg/green.png"
                  alt="Metro Mellow"
                  width={120}
                  height={40}
                  className={styles.modalDrawer__footerLogo}
                />
              </motion.div>
            ) : (
              footer
            )} */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalDrawer;
