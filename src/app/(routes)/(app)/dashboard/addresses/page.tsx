// src/app/(routes)/(app)/dashboard/account/addresses/page.tsx
"use client";

import React, { useState, useEffect } from "react";
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
  Loader,
} from "lucide-react";
import FnButton from "@/components/ui/Button/FnButton";
import styles from "./AddressManagement.module.scss";
import Input from "@/components/ui/Input";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import AddressModal from "./_components/AddressModal";
import AddressListView from "./_components/AddressListView";
import DashboardHeader from "../_components/DashboardHeader/DashboardHeader";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux";
import {
  Address as GraphQLAddress,
  AddressInput,
  Address,
} from "@/graphql/api";

const AddressManagementPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"list" | "grid">("grid");
  const [isLoading, setIsLoading] = useState(false);

  // Get user from Redux & auth operations
  const currentUser = useAppSelector(selectUser);
  const {
    handleAddAddress,
    handleUpdateAddress,
    handleSetDefaultAddress,
    handleRemoveAddress,
    handleGetCurrentUser,
  } = useAuthOperations();

  // Load addresses from user data
  useEffect(() => {
    if (currentUser?.addresses) {
      const transformedAddresses = currentUser.addresses.filter(
        (addr): addr is GraphQLAddress => addr !== null
      );
      setAddresses(transformedAddresses);
    }
  }, [currentUser]);

  // Handle view change
  const handleViewChange = (type: "list" | "grid") => {
    setViewType(type);
  };

  // Filter addresses
  const filteredAddresses = addresses.filter((address) => {
    const matchesSearch =
      address.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      address.street?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
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

  // Handle add/edit address with GraphQL
  const handleSaveAddress = async (addressData: Partial<Address>) => {
    console.log("handleSaveAddress called with:", addressData);
    setIsLoading(true);
    try {
      // For editing, use existing serviceArea; for new, this modal shouldn't be used
      // New addresses should use the AddAddressModal with service area selection
      const serviceAreaId = editingAddress?.serviceArea?.id;
      if (!serviceAreaId) {
        console.error(
          "Service area is required. Use AddAddressModal for new addresses."
        );
        return;
      }

      const addressInput: AddressInput = {
        label: addressData.label || "",
        street: addressData.street || "",
        city: addressData.city || "",
        state: addressData.state || "",
        zipCode: addressData.zipCode || "",
        isDefault: addressData.isDefault || false,
        serviceArea: serviceAreaId,
      };

      if (editingAddress) {
        // Update existing address
        await handleUpdateAddress(editingAddress.id, addressInput);
        console.log("Address updated successfully");
      }

      // Refetch user data to get updated addresses
      await handleGetCurrentUser();
      setIsModalOpen(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Address save error:", error);
      console.error(
        "Failed to save address:",
        error instanceof Error ? error.message : "Unknown error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete address with GraphQL
  const handleDeleteAddress = async (id: string) => {
    setIsLoading(true);
    try {
      await handleRemoveAddress(id);
      console.log("Address deleted successfully");
      // Refetch user data to get updated addresses
      await handleGetCurrentUser();
      setActiveMenuId(null);
    } catch (error) {
      console.error("Address delete error:", error);
      console.error(
        "Failed to delete address:",
        error instanceof Error ? error.message : "Unknown error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle set default with GraphQL
  const handleSetDefault = async (id: string) => {
    setIsLoading(true);
    try {
      await handleSetDefaultAddress(id);
      console.log("Default address updated successfully");
      // Refetch user data to get updated addresses
      await handleGetCurrentUser();
      setActiveMenuId(null);
    } catch (error) {
      console.error("Set default address error:", error);
      console.error(
        "Failed to set default address:",
        error instanceof Error ? error.message : "Unknown error"
      );
    } finally {
      setIsLoading(false);
    }
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
          showUpcomingBanner={false}
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
            <div className={styles.addressManagement__filters}>
              <FnButton
                variant="primary"
                onClick={() => {
                  setEditingAddress(null);
                  setIsModalOpen(true);
                }}
                disabled={isLoading}
              >
                <Plus size={18} />
                Add Address
              </FnButton>
            </div>

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

        {/* Loading State */}
        {isLoading && (
          <div className={styles.addressManagement__loading}>
            <Loader className="animate-spin" size={24} />
            <span>Loading...</span>
          </div>
        )}

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
                        // style={{
                        //   backgroundColor: `${getAddressColor(address.type)}15`,
                        //   color: getAddressColor(address.type),
                        // }}
                      >
                        {/* {getAddressIcon(address.type)} */}
                        <Home size={20} />
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
                        {/* <span className={styles.addressCard__type}>
                          {address.type.charAt(0).toUpperCase() +
                            address.type.slice(1)}{" "}
                          Address
                        </span> */}
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
                              {/* <button
                                className={`${styles.addressCard__menuItem} ${
                                  styles["addressCard__menuItem--danger"]
                                }`}
                                onClick={() => handleDeleteAddress(address.id)}
                              >
                                <Trash2 size={14} />
                                Delete
                              </button> */}
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
                            {address.city}
                          </p>
                          <p className={styles.addressCard__regionAddress}>
                            {address.state}, {address.country} {address.zipCode}
                          </p>
                        </div>
                      </div>
                      {/* 
                      {address.landmark && (
                        <div className={styles.addressCard__detail}>
                          <Navigation size={14} />
                          <span>{address.landmark}</span>
                        </div>
                      )} */}

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
              disabled={isLoading}
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
