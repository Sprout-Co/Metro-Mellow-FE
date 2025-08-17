// src/components/ui/AddressSelector/AddressSelector.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plus,
  Home,
  Briefcase,
  Heart,
  Check,
  ChevronRight,
  Star,
} from "lucide-react";
import styles from "./AddressSelector.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

interface Address {
  id: string;
  label: string;
  type: "home" | "work" | "other";
  street: string;
  area: string;
  city: string;
  isDefault: boolean;
}

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId?: string;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: () => void;
  variant?: "drawer" | "inline" | "compact";
}

const AddressSelector: React.FC<AddressSelectorProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onAddNewAddress,
  variant = "drawer",
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Get address icon
  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home size={18} />;
      case "work":
        return <Briefcase size={18} />;
      default:
        return <Heart size={18} />;
    }
  };

  // Get address color
  const getAddressColor = (type: string) => {
    switch (type) {
      case "home":
        return "#075056";
      case "work":
        return "#6366f1";
      default:
        return "#ec4899";
    }
  };

  const containerClass = `${styles.addressSelector} ${styles[`addressSelector--${variant}`]}`;

  return (
    <div className={containerClass}>
      {variant === "drawer" && (
        <div className={styles.addressSelector__header}>
          <h3 className={styles.addressSelector__title}>
            Select Delivery Address
          </h3>
          <p className={styles.addressSelector__subtitle}>
            Choose where you want your service delivered
          </p>
        </div>
      )}

      <div className={styles.addressSelector__list}>
        <AnimatePresence>
          {addresses.map((address, index) => {
            const isSelected = selectedAddressId === address.id;
            const isHovered = hoveredId === address.id;

            return (
              <motion.div
                key={address.id}
                className={`${styles.addressSelector__item} ${
                  isSelected ? styles["addressSelector__item--selected"] : ""
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectAddress(address)}
                onMouseEnter={() => setHoveredId(address.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ x: 4 }}
              >
                <div className={styles.addressSelector__itemContent}>
                  <div
                    className={styles.addressSelector__icon}
                    style={{
                      backgroundColor: `${getAddressColor(address.type)}15`,
                      color: getAddressColor(address.type),
                    }}
                  >
                    {getAddressIcon(address.type)}
                  </div>

                  <div className={styles.addressSelector__info}>
                    <div className={styles.addressSelector__labelRow}>
                      <span className={styles.addressSelector__label}>
                        {address.label}
                      </span>
                      {address.isDefault && (
                        <span className={styles.addressSelector__defaultBadge}>
                          <Star size={10} />
                          Default
                        </span>
                      )}
                    </div>
                    <span className={styles.addressSelector__address}>
                      {address.street}, {address.area}
                    </span>
                    <span className={styles.addressSelector__city}>
                      {address.city}
                    </span>
                  </div>

                  <div className={styles.addressSelector__indicator}>
                    {isSelected ? (
                      <motion.div
                        className={styles.addressSelector__checkmark}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Check size={16} />
                      </motion.div>
                    ) : (
                      <ChevronRight
                        size={16}
                        className={styles.addressSelector__arrow}
                        style={{
                          opacity: isHovered ? 1 : 0.3,
                        }}
                      />
                    )}
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    className={styles.addressSelector__selectedBar}
                    layoutId="selectedBar"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Add New Address Button */}
        <motion.div
          className={styles.addressSelector__addNew}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: addresses.length * 0.05 + 0.1 }}
          onClick={onAddNewAddress}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={styles.addressSelector__addNewIcon}>
            <Plus size={20} />
          </div>
          <div className={styles.addressSelector__addNewText}>
            <span className={styles.addressSelector__addNewTitle}>
              Add New Address
            </span>
            <span className={styles.addressSelector__addNewSubtitle}>
              Save a new delivery location
            </span>
          </div>
          <ChevronRight size={16} />
        </motion.div>
      </div>

      {variant === "inline" && addresses.length === 0 && (
        <div className={styles.addressSelector__empty}>
          <MapPin size={32} />
          <p>No saved addresses yet</p>
          <FnButton variant="primary" size="sm" onClick={onAddNewAddress}>
            <Plus size={16} />
            Add Your First Address
          </FnButton>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;

// src/components/ui/AddressSelector/AddressSelector.module.scss
