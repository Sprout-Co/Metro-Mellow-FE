// src/app/(routes)/(app)/dashboard/account/addresses/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Plus,
  Home,
  Briefcase,
  Heart,
  MoreVertical,
  Edit2,
  Trash2,
  Star,
  Search,
  Filter,
  Navigation,
  Check,
  List,
  Grid3X3,
} from "lucide-react";
import FnButton from "@/components/ui/Button/FnButton";
import styles from "./AddressManagement.module.scss";
// import AddressModal from "./_components/AddressModal/AddressModal";
import Input from "@/components/ui/Input";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import AddressModal from "./_components/AddressModal";
import AddressListView from "./_components/AddressListView";
import DashboardHeader from "../_components/DashboardHeader/DashboardHeader";

// Types
export interface Address {
  id: string;
  label: string;
  type: "home" | "work" | "other";
  street: string;
  area: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  landmark?: string;
  phoneNumber?: string;
  instructions?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Mock data
const mockAddresses: Address[] = [
  {
    id: "1",
    label: "Home",
    type: "home",
    street: "24 Emmanuel Osakwe Street",
    area: "Chevron Drive",
    city: "Lekki",
    state: "Lagos",
    postalCode: "101233",
    country: "Nigeria",
    isDefault: true,
    landmark: "Near Chevron Roundabout",
    phoneNumber: "+234 801 234 5678",
    instructions: "Gate code: 1234",
  },
  {
    id: "2",
    label: "Office",
    type: "work",
    street: "45 Admiralty Way",
    area: "Admiralty",
    city: "Lekki Phase 1",
    state: "Lagos",
    postalCode: "101233",
    country: "Nigeria",
    isDefault: false,
    landmark: "Metro Tower, 5th Floor",
    phoneNumber: "+234 802 345 6789",
  },
  {
    id: "3",
    label: "Mom's House",
    type: "other",
    street: "12 Ozumba Mbadiwe Avenue",
    area: "Victoria Island",
    city: "Lagos",
    state: "Lagos",
    postalCode: "101241",
    country: "Nigeria",
    isDefault: false,
    phoneNumber: "+234 803 456 7890",
  },
];

const AddressManagementPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"list" | "grid">("grid");

  // Handle view change
  const handleViewChange = (type: "list" | "grid") => {
    setViewType(type);
  };

  // Filter addresses
  const filteredAddresses = addresses.filter((address) => {
    const matchesSearch =
      address.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "all" || address.type === selectedType;

    return matchesSearch && matchesType;
  });

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

  // Handle add/edit address
  const handleSaveAddress = (addressData: Partial<Address>) => {
    if (editingAddress) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...addressData } : addr
        )
      );
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        label: addressData.label || "",
        type: addressData.type || "home",
        street: addressData.street || "",
        area: addressData.area || "",
        city: addressData.city || "",
        state: addressData.state || "",
        postalCode: addressData.postalCode || "",
        country: addressData.country || "Nigeria",
        isDefault: addressData.isDefault || false,
        landmark: addressData.landmark,
        phoneNumber: addressData.phoneNumber,
        instructions: addressData.instructions,
      };
      setAddresses((prev) => [...prev, newAddress]);
    }
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  // Handle delete address
  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    setActiveMenuId(null);
  };

  // Handle set default
  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    setActiveMenuId(null);
  };

  // Toggle menu
  const toggleMenu = (addressId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveMenuId(activeMenuId === addressId ? null : addressId);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenuId]);

  return (
    <DashboardLayout>
      <div className={styles.addressManagement}>
        {/* Header */}
        <DashboardHeader
          title="Address Book"
          subtitle="Manage your delivery addresses for quick and easy service bookings"
        />

        {/* Controls */}
        <div className={styles.addressManagement__controls}>
          <div className={styles.addressManagement__controlsLeft}>
            <div className={styles.addressManagement__search}>
              <Input
                placeholder="Search addresses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={18} />}
              />
            </div>
          </div>

          <div className={styles.addressManagement__controlsRight}>
            <div className={styles.addressManagement__filters}></div>

            <div className={styles.addressManagement__viewToggle}>
              <motion.button
                className={`${styles.addressManagement__viewBtn} ${
                  viewType === "list"
                    ? styles["addressManagement__viewBtn--active"]
                    : ""
                }`}
                onClick={() => handleViewChange("list")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List size={18} />
              </motion.button>
              <motion.button
                className={`${styles.addressManagement__viewBtn} ${
                  viewType === "grid"
                    ? styles["addressManagement__viewBtn--active"]
                    : ""
                }`}
                onClick={() => handleViewChange("grid")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Address Display */}
        {filteredAddresses.length > 0 ? (
          viewType === "grid" ? (
            <motion.div
              className={styles.addressManagement__grid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence>
                {filteredAddresses.map((address, index) => (
                  <motion.div
                    key={address.id}
                    className={styles.addressCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Card Header */}
                    <div className={styles.addressCard__header}>
                      <div
                        className={styles.addressCard__icon}
                        style={{
                          backgroundColor: `${getAddressColor(address.type)}15`,
                          color: getAddressColor(address.type),
                        }}
                      >
                        {getAddressIcon(address.type)}
                      </div>
                      <div className={styles.addressCard__headerInfo}>
                        <h3 className={styles.addressCard__label}>
                          {address.label}
                          {address.isDefault && (
                            <span className={styles.addressCard__defaultBadge}>
                              <Star size={12} />
                              Default
                            </span>
                          )}
                        </h3>
                        <span className={styles.addressCard__type}>
                          {address.type.charAt(0).toUpperCase() +
                            address.type.slice(1)}{" "}
                          Address
                        </span>
                      </div>
                      <div className={styles.addressCard__menuContainer}>
                        <button
                          className={styles.addressCard__menuBtn}
                          onClick={(e) => toggleMenu(address.id, e)}
                        >
                          <MoreVertical size={18} />
                        </button>

                        <AnimatePresence>
                          {activeMenuId === address.id && (
                            <motion.div
                              className={styles.addressCard__menu}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                            >
                              <button
                                className={styles.addressCard__menuItem}
                                onClick={() => {
                                  setEditingAddress(address);
                                  setIsModalOpen(true);
                                  setActiveMenuId(null);
                                }}
                              >
                                <Edit2 size={14} />
                                Edit
                              </button>
                              {!address.isDefault && (
                                <button
                                  className={styles.addressCard__menuItem}
                                  onClick={() => handleSetDefault(address.id)}
                                >
                                  <Star size={14} />
                                  Set as Default
                                </button>
                              )}
                              <button
                                className={`${styles.addressCard__menuItem} ${
                                  styles["addressCard__menuItem--danger"]
                                }`}
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                <Trash2 size={14} />
                                Delete
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className={styles.addressCard__content}>
                      <div className={styles.addressCard__address}>
                        <MapPin size={16} />
                        <div>
                          <p className={styles.addressCard__streetAddress}>
                            {address.street}
                          </p>
                          <p className={styles.addressCard__areaAddress}>
                            {address.area}, {address.city}
                          </p>
                          <p className={styles.addressCard__regionAddress}>
                            {address.state}, {address.country}{" "}
                            {address.postalCode}
                          </p>
                        </div>
                      </div>

                      {address.landmark && (
                        <div className={styles.addressCard__detail}>
                          <Navigation size={14} />
                          <span>{address.landmark}</span>
                        </div>
                      )}

                      {/* {address.phoneNumber && (
                      <div className={styles.addressCard__detail}>
                        <span className={styles.addressCard__detailLabel}>
                          Contact:
                        </span>
                        <span>{address.phoneNumber}</span>
                      </div>
                    )} */}
                    </div>

                    {/* Card Footer */}
                    {/* <div className={styles.addressCard__footer}>
                    <FnButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingAddress(address);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit2 size={14} />
                      Edit
                    </FnButton>
                    <FnButton
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        // Handle select address for booking
                        console.log("Selected address:", address);
                      }}
                    >
                      <Check size={14} />
                      Use This Address
                    </FnButton>
                  </div> */}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <AddressListView
              addresses={filteredAddresses}
              onEdit={(address) => {
                setEditingAddress(address);
                setIsModalOpen(true);
                setActiveMenuId(null);
              }}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefault}
              activeMenuId={activeMenuId}
              onToggleMenu={toggleMenu}
            />
          )
        ) : (
          <div className={styles.addressManagement__empty}>
            <div className={styles.addressManagement__emptyIcon}>
              <MapPin size={48} />
            </div>
            <h3 className={styles.addressManagement__emptyTitle}>
              No addresses found
            </h3>
            <p className={styles.addressManagement__emptyText}>
              {searchQuery || selectedType !== "all"
                ? "Try adjusting your filters to see more addresses"
                : "Add your first address to get started with easy service bookings"}
            </p>
            <FnButton
              variant="primary"
              onClick={() => {
                setEditingAddress(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={18} />
              Add Your First Address
            </FnButton>
          </div>
        )}

        {/* Address Modal */}
        <AddressModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingAddress(null);
          }}
          onSave={handleSaveAddress}
          address={editingAddress}
        />
      </div>
    </DashboardLayout>
  );
};

export default AddressManagementPage;
