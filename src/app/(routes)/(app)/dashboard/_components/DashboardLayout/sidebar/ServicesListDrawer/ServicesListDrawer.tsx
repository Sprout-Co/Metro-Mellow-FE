// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/ServicesListDrawer/ServicesListDrawer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Home,
  Droplets,
  Utensils,
  Bug,
  Package,
  Timer,
  ChevronDown,
  Loader2,
} from "lucide-react";
import styles from "./ServicesListDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import FnButton from "@/components/ui/Button/FnButton";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { Service, ServiceCategory, ServiceStatus } from "@/graphql/api";
import ServiceAccordion from "@/components/ui/ServiceAccordion/ServiceAccordion";
import ModalDrawerHeader from "@/components/ui/ModalDrawer/ModalDrawerHeader/ModalDrawerHeader";

interface ServicesListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect?: (serviceId: string, optionId?: string) => void;
}

const ServicesListDrawer: React.FC<ServicesListDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      width="lg"
      title="Our Services"
      description="Select a service to explore available options"
    >
      <div className={styles.drawer}>
        {/* Header */}
        {/* <div className={styles.drawer__header}>
          <button className={styles.drawer__backBtn} onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.drawer__headerText}>
            <h2 className={styles.drawer__title}>Our Services</h2>
            <p className={styles.drawer__subtitle}>
              Select a service to explore available options
            </p>
          </div>
        </div> */}
        {/* <ModalDrawerHeader
          title="Our Services"
          description="Select a service to explore available options"
          onClose={onClose}
        /> */}

        {/* Search Bar */}
        <div className={styles.drawer__search}>
          <Search className={styles.drawer__searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.drawer__searchInput}
          />
        </div>

        {/* Content */}
        <div className={styles.drawer__content}>
          <ServiceAccordion searchQuery={searchQuery} />
        </div>
      </div>
    </ModalDrawer>
  );
};

export default ServicesListDrawer;
