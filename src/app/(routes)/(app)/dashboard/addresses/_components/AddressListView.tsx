"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Home,
  Briefcase,
  Heart,
  MoreVertical,
  Edit2,
  Trash2,
  Star,
  Navigation,
} from "lucide-react";
import styles from "./AddressListView.module.scss";
import { Address } from "@/graphql/api";

interface AddressListViewProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  activeMenuId: string | null;
  onToggleMenu: (addressId: string, event: React.MouseEvent) => void;
}

const AddressListView: React.FC<AddressListViewProps> = ({
  addresses,
  onEdit,
  onDelete,
  onSetDefault,
  activeMenuId,
  onToggleMenu,
}) => {
  // Get address type icon
  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home size={20} />;
      case "work":
        return <Briefcase size={20} />;
      default:
        return <Heart size={20} />;
    }
  };

  // Get address type color
  const getAddressColor = (type: string) => {
    switch (type) {
      case "home":
        return "#075056"; // Primary color
      case "work":
        return "#6366f1";
      default:
        return "#ec4899";
    }
  };

  return (
    <motion.div
      className={styles.addressListView}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            className={styles.addressListItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ backgroundColor: "rgba(7, 80, 86, 0.02)" }}
          >
            <div className={styles.addressListItem__main}>
              {/* Icon and Type */}
              <div className={styles.addressListItem__iconSection}>
                <div className={styles.addressListItem__icon}>
                  <Home size={20} />
                </div>
              </div>

              {/* Address Details */}
              <div className={styles.addressListItem__details}>
                <div className={styles.addressListItem__header}>
                  <h3 className={styles.addressListItem__label}>
                    {address.label}
                    {address.isDefault && (
                      <span className={styles.addressListItem__defaultBadge}>
                        <Star size={12} />
                        Default
                      </span>
                    )}
                  </h3>
                </div>

                <div className={styles.addressListItem__address}>
                  <MapPin size={16} />
                  <div className={styles.addressListItem__addressText}>
                    <span className={styles.addressListItem__streetAddress}>
                      {address.street},
                    </span>
                    <span className={styles.addressListItem__regionAddress}>
                      {address.city}, {address.state}, {address.country}{" "}
                      {address.zipCode}
                    </span>
                  </div>
                </div>

                {/* {address.landmark && (
                  <div className={styles.addressListItem__landmark}>
                    <Navigation size={14} />
                    <span>{address.landmark}</span>
                  </div>
                )} */}
              </div>

              {/* Actions */}
              <div className={styles.addressListItem__actions}>
                <div className={styles.addressListItem__menuContainer}>
                  <button
                    className={styles.addressListItem__menuBtn}
                    onClick={(e) => onToggleMenu(address.id, e)}
                  >
                    <MoreVertical size={18} />
                  </button>

                  <AnimatePresence>
                    {activeMenuId === address.id && (
                      <motion.div
                        className={styles.addressListItem__menu}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                      >
                        <button
                          className={styles.addressListItem__menuItem}
                          onClick={() => onEdit(address)}
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button
                            className={styles.addressListItem__menuItem}
                            onClick={() => onSetDefault(address.id)}
                          >
                            <Star size={14} />
                            Set as Default
                          </button>
                        )}
                        {/* <button
                          className={`${styles.addressListItem__menuItem} ${styles["addressListItem__menuItem--danger"]}`}
                          onClick={() => onDelete(address.id)}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button> */}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default AddressListView;
