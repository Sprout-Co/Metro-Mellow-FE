"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Plus, MoreVertical, Edit2, Star, Check } from "lucide-react";
import styles from "./AddressManagement.module.scss";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import AddressModal from "./_components/AddressModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = useAppSelector(selectUser);
  const {
    handleAddAddress,
    handleUpdateAddress,
    handleSetDefaultAddress,
    handleGetCurrentUser,
  } = useAuthOperations();

  useEffect(() => {
    if (currentUser?.addresses) {
      const filtered = currentUser.addresses.filter(
        (addr): addr is GraphQLAddress => addr !== null
      );
      setAddresses(filtered);
    }
  }, [currentUser]);

  const handleSaveAddress = async (
    addressData: Partial<Address>,
    serviceAreaId?: string
  ) => {
    setIsLoading(true);
    try {
      const areaId = serviceAreaId || editingAddress?.serviceArea?.id;
      if (!areaId) return;

      const addressInput: AddressInput = {
        label: addressData.label || "",
        street: addressData.street || "",
        city: addressData.city || "",
        state: addressData.state || "",
        zipCode: addressData.zipCode || "",
        isDefault: addressData.isDefault || false,
        serviceArea: areaId,
      };

      if (editingAddress) {
        await handleUpdateAddress(editingAddress.id, addressInput);
      } else {
        await handleAddAddress(addressInput);
      }

      await handleGetCurrentUser();
      setIsModalOpen(false);
      setEditingAddress(null);
    } catch (error) {
      console.error("Address save error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    setIsLoading(true);
    try {
      await handleSetDefaultAddress(id);
      await handleGetCurrentUser();
      setActiveMenuId(null);
    } catch (error) {
      console.error("Set default error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = (addressId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === addressId ? null : addressId);
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveMenuId(null);
    if (activeMenuId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenuId]);

  return (
    <DashboardLayout>
      <div className={styles.page}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.header__text}>
            <h1 className={styles.header__title}>My Addresses</h1>
            <p className={styles.header__subtitle}>
              Manage your delivery addresses
            </p>
          </div>
          <button
            className={styles.header__addBtn}
            onClick={() => {
              setEditingAddress(null);
              setIsModalOpen(true);
            }}
            disabled={isLoading}
          >
            <Plus size={18} />
            Add Address
          </button>
        </div>

        {/* Address List */}
        {addresses.length > 0 ? (
          <div className={styles.list}>
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`${styles.card} ${address.isDefault ? styles["card--default"] : ""}`}
              >
                <div className={styles.card__icon}>
                  <MapPin size={20} />
                </div>

                <div className={styles.card__content}>
                  <div className={styles.card__header}>
                    <span className={styles.card__label}>
                      {address.label || "Address"}
                    </span>
                    {address.isDefault && (
                      <span className={styles.card__badge}>
                        <Check size={12} />
                        Default
                      </span>
                    )}
                  </div>
                  <p className={styles.card__street}>{address.street}</p>
                  <p className={styles.card__city}>
                    {address.city}
                    {address.serviceArea?.name &&
                      ` · ${address.serviceArea.name}`}
                  </p>
                </div>

                <div className={styles.card__actions}>
                  <button
                    className={styles.card__menuBtn}
                    onClick={(e) => toggleMenu(address.id, e)}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeMenuId === address.id && (
                    <div className={styles.card__menu}>
                      <button
                        className={styles.card__menuItem}
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
                          className={styles.card__menuItem}
                          onClick={() => handleSetDefault(address.id)}
                        >
                          <Star size={14} />
                          Set as Default
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.empty__icon}>
              <MapPin size={32} />
            </div>
            <h3 className={styles.empty__title}>No addresses yet</h3>
            <p className={styles.empty__text}>
              Add your first address to get started
            </p>
            <button
              className={styles.empty__btn}
              onClick={() => {
                setEditingAddress(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={18} />
              Add Address
            </button>
          </div>
        )}

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
