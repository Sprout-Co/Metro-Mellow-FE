// src/app/(routes)/(app)/admin/customers/EditCustomerModal/EditCustomerModal.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal/Modal";
import styles from "./EditCustomerModal.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { User, AccountStatus, UserRole, Address } from "@/graphql/api";
import { Icon } from "@/components/ui/Icon/Icon";

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  customer: User;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  customer,
}) => {
  const {
    handleUpdateProfile,
    handleUpdateAddress,
    handleAddAddress,
    handleUpdateAccountStatus,
    handleSetDefaultAddress,
    handleRemoveAddress,
  } = useAuthOperations();
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAccountConfirmation, setShowAccountConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      accountStatus: AccountStatus.Active,
    },
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      label: "",
      isDefault: false,
    },
  });

  // Load customer data into form when modal opens
  useEffect(() => {
    setFormData({
      personal: {
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        accountStatus: customer.accountStatus || AccountStatus.Active,
      },
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        label: "",
        isDefault: false,
      },
    });
  }, [customer, isOpen]);

  // Reset confirmation dialogs when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowAccountConfirmation(false);
      setShowDeleteConfirmation(false);
      setAddressToDelete(null);
      setIsAddingAddress(false);
      setEditingAddressId(null);
    }
  }, [isOpen]);

  // Get all customer addresses (filter out null values)
  const customerAddresses = (customer.addresses || []).filter(
    (addr): addr is Address => addr !== null
  );

  const validatePersonalInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.personal.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.personal.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.personal.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.personal.email)) {
      newErrors.email = "Email is invalid";
    }

    if (
      formData.personal.phone &&
      !/^\+?[0-9\s\-()]{10,15}$/.test(formData.personal.phone)
    ) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAddress = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.street.trim()) {
      newErrors.street = "Street address is required";
    }

    if (!formData.address.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.address.label.trim()) {
      newErrors.label = "Address label is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    section: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleUpdatePersonalInfo = async () => {
    if (!validatePersonalInfo()) {
      return;
    }

    setIsLoading(true);

    try {
      await handleUpdateProfile({
        firstName: formData.personal.firstName,
        lastName: formData.personal.lastName,
        phone: formData.personal.phone,
        id: customer.id,
      });

      onSuccess();
      setErrors({});
    } catch (error) {
      console.error("Error updating personal info:", error);
      if (error instanceof Error) {
        setErrors({ personal: error.message });
      } else {
        setErrors({ personal: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewAddress = async () => {
    if (!validateAddress()) {
      return;
    }

    setIsLoading(true);

    try {
      const addressData = {
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        zipCode: formData.address.zipCode,
        country: formData.address.country,
        label: formData.address.label,
        isDefault: formData.address.isDefault,
        userId: customer.id,
      };

      await handleAddAddress(addressData);

      // Reset form
      setFormData((prev) => ({
        ...prev,
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          label: "",
          isDefault: false,
        },
      }));

      setIsAddingAddress(false);
      onSuccess();
      setErrors({});
    } catch (error) {
      console.error("Error adding address:", error);
      if (error instanceof Error) {
        setErrors({ address: error.message });
      } else {
        setErrors({ address: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAddress = (address: Address) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        country: address.country || "",
        label: address.label || "",
        isDefault: address.isDefault || false,
      },
    }));
    setEditingAddressId(address.id);
  };

  const handleUpdateAddressInfo = async () => {
    if (!validateAddress() || !editingAddressId) {
      return;
    }

    setIsLoading(true);

    try {
      const addressData = {
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        zipCode: formData.address.zipCode,
        country: formData.address.country,
        label: formData.address.label,
        isDefault: formData.address.isDefault,
        userId: customer.id,
      };

      await handleUpdateAddress(editingAddressId, addressData);

      // Reset form
      setFormData((prev) => ({
        ...prev,
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          label: "",
          isDefault: false,
        },
      }));

      setEditingAddressId(null);
      onSuccess();
      setErrors({});
    } catch (error) {
      console.error("Error updating address:", error);
      if (error instanceof Error) {
        setErrors({ address: error.message });
      } else {
        setErrors({ address: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    setIsLoading(true);

    try {
      await handleSetDefaultAddress(addressId);
      onSuccess();
    } catch (error) {
      console.error("Error setting default address:", error);
      if (error instanceof Error) {
        setErrors({ address: error.message });
      } else {
        setErrors({ address: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddressToDelete(addressId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDeleteAddress = async () => {
    if (!addressToDelete) return;

    setIsLoading(true);
    setShowDeleteConfirmation(false);

    try {
      await handleRemoveAddress(addressToDelete);

      onSuccess();
      setAddressToDelete(null);
    } catch (error) {
      console.error("Error deleting address:", error);
      if (error instanceof Error) {
        setErrors({ address: error.message });
      } else {
        setErrors({ address: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDeleteAddress = () => {
    setShowDeleteConfirmation(false);
    setAddressToDelete(null);
  };

  const handleCancelAddressEdit = () => {
    setEditingAddressId(null);
    setIsAddingAddress(false);
    setFormData((prev) => ({
      ...prev,
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        label: "",
        isDefault: false,
      },
    }));
    setErrors({});
  };

  const handleUpdateAccountInfo = async () => {
    setShowAccountConfirmation(true);
  };

  const handleConfirmAccountUpdate = async () => {
    setIsLoading(true);
    setShowAccountConfirmation(false);

    try {
      await handleUpdateAccountStatus(
        customer.id,
        formData.personal.accountStatus
      );

      onSuccess();
      setErrors({});
    } catch (error) {
      console.error("Error updating account status:", error);
      if (error instanceof Error) {
        setErrors({ account: error.message });
      } else {
        setErrors({ account: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAccountUpdate = () => {
    setShowAccountConfirmation(false);
  };

  // Tab content animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Customer"
      maxWidth="800px"
    >
      <div className={styles.edit_customer_modal}>
        {(errors.form ||
          errors.personal ||
          errors.address ||
          errors.account) && (
          <motion.div
            className={styles.edit_customer_modal__error}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errors.form || errors.personal || errors.address || errors.account}
          </motion.div>
        )}

        <div className={styles.edit_customer_modal__form}>
          <div className={styles.edit_customer_modal__tabs}>
            <button
              type="button"
              className={`${styles.edit_customer_modal__tab} ${
                activeTab === "personal"
                  ? styles["edit_customer_modal__tab--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Personal Info
            </button>
            <button
              type="button"
              className={`${styles.edit_customer_modal__tab} ${
                activeTab === "address"
                  ? styles["edit_customer_modal__tab--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("address")}
            >
              Addresses ({customerAddresses.length})
            </button>
            <button
              type="button"
              className={`${styles.edit_customer_modal__tab} ${
                activeTab === "account"
                  ? styles["edit_customer_modal__tab--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>
          </div>

          <div className={styles.edit_customer_modal__tab_content}>
            <AnimatePresence mode="wait">
              {activeTab === "personal" && (
                <motion.div
                  key="personal"
                  className={styles.edit_customer_modal__section}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <h3 className={styles.edit_customer_modal__section_title}>
                    Personal Information
                  </h3>

                  <div className={styles.edit_customer_modal__row}>
                    <div className={styles.edit_customer_modal__field}>
                      <label className={styles.edit_customer_modal__label}>
                        First Name{" "}
                        <span className={styles.edit_customer_modal__required}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.personal.firstName}
                        onChange={(e) => handleChange("personal", e)}
                        className={`${styles.edit_customer_modal__input} ${
                          errors.firstName
                            ? styles["edit_customer_modal__input--error"]
                            : ""
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <span
                          className={styles.edit_customer_modal__error_text}
                        >
                          {errors.firstName}
                        </span>
                      )}
                    </div>

                    <div className={styles.edit_customer_modal__field}>
                      <label className={styles.edit_customer_modal__label}>
                        Last Name{" "}
                        <span className={styles.edit_customer_modal__required}>
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.personal.lastName}
                        onChange={(e) => handleChange("personal", e)}
                        className={`${styles.edit_customer_modal__input} ${
                          errors.lastName
                            ? styles["edit_customer_modal__input--error"]
                            : ""
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <span
                          className={styles.edit_customer_modal__error_text}
                        >
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.edit_customer_modal__field}>
                    <label className={styles.edit_customer_modal__label}>
                      Email{" "}
                      <span className={styles.edit_customer_modal__required}>
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.personal.email}
                      onChange={(e) => handleChange("personal", e)}
                      className={`${styles.edit_customer_modal__input} ${
                        errors.email
                          ? styles["edit_customer_modal__input--error"]
                          : ""
                      }`}
                      placeholder="john.doe@example.com"
                      disabled // Email should not be editable
                    />
                    {errors.email && (
                      <span className={styles.edit_customer_modal__error_text}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.edit_customer_modal__field}>
                    <label className={styles.edit_customer_modal__label}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.personal.phone}
                      onChange={(e) => handleChange("personal", e)}
                      className={`${styles.edit_customer_modal__input} ${
                        errors.phone
                          ? styles["edit_customer_modal__input--error"]
                          : ""
                      }`}
                      placeholder="+1 (234) 567-8901"
                    />
                    {errors.phone && (
                      <span className={styles.edit_customer_modal__error_text}>
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className={styles.edit_customer_modal__section_actions}>
                    <button
                      type="button"
                      className={styles.edit_customer_modal__section_submit}
                      onClick={handleUpdatePersonalInfo}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span
                          className={styles.edit_customer_modal__spinner}
                        ></span>
                      ) : (
                        "Update Personal Info"
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "address" && (
                <motion.div
                  key="address"
                  className={styles.edit_customer_modal__section}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <div className={styles.edit_customer_modal__section_header}>
                    <h3 className={styles.edit_customer_modal__section_title}>
                      Address Management
                    </h3>
                    {!isAddingAddress && !editingAddressId && (
                      <button
                        type="button"
                        className={styles.edit_customer_modal__add_button}
                        onClick={() => setIsAddingAddress(true)}
                      >
                        <Icon name="plus" size={16} />
                        Add New Address
                      </button>
                    )}
                  </div>

                  {/* Address List */}
                  {!isAddingAddress && !editingAddressId && (
                    <div className={styles.edit_customer_modal__address_list}>
                      {customerAddresses.length === 0 ? (
                        <div
                          className={styles.edit_customer_modal__empty_state}
                        >
                          <Icon name="map-pin" size={48} />
                          <p>No addresses found</p>
                          <p>
                            Add the customer's first address to get started.
                          </p>
                        </div>
                      ) : (
                        customerAddresses.map((address) => (
                          <div
                            key={address.id}
                            className={`${styles.edit_customer_modal__address_card} ${
                              address.isDefault
                                ? styles[
                                    "edit_customer_modal__address_card--default"
                                  ]
                                : ""
                            }`}
                          >
                            <div
                              className={
                                styles.edit_customer_modal__address_content
                              }
                            >
                              <div
                                className={
                                  styles.edit_customer_modal__address_header
                                }
                              >
                                <h4
                                  className={
                                    styles.edit_customer_modal__address_label
                                  }
                                >
                                  {address.label}
                                  {address.isDefault && (
                                    <span
                                      className={
                                        styles.edit_customer_modal__default_badge
                                      }
                                    >
                                      Default
                                    </span>
                                  )}
                                </h4>
                                <div
                                  className={
                                    styles.edit_customer_modal__address_actions
                                  }
                                >
                                  {!address.isDefault && (
                                    <button
                                      type="button"
                                      className={
                                        styles.edit_customer_modal__action_button
                                      }
                                      onClick={() =>
                                        handleSetDefault(address.id)
                                      }
                                      disabled={isLoading}
                                      title="Set as default"
                                    >
                                      <Icon name="star" size={14} />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className={
                                      styles.edit_customer_modal__action_button
                                    }
                                    onClick={() => handleEditAddress(address)}
                                    disabled={isLoading}
                                    title="Edit address"
                                  >
                                    <Icon name="edit" size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    className={
                                      styles.edit_customer_modal__action_button
                                    }
                                    onClick={() =>
                                      handleDeleteAddress(address.id)
                                    }
                                    disabled={isLoading}
                                    title="Delete address"
                                  >
                                    <Icon name="trash" size={14} />
                                  </button>
                                </div>
                              </div>
                              <div
                                className={
                                  styles.edit_customer_modal__address_details
                                }
                              >
                                <p>{address.street}</p>
                                <p>
                                  {address.city}, {address.state}{" "}
                                  {address.zipCode}
                                </p>
                                <p>{address.country}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Add/Edit Address Form */}
                  {(isAddingAddress || editingAddressId) && (
                    <div className={styles.edit_customer_modal__address_form}>
                      <h4 className={styles.edit_customer_modal__form_title}>
                        {isAddingAddress ? "Add New Address" : "Edit Address"}
                      </h4>

                      <div className={styles.edit_customer_modal__field}>
                        <label className={styles.edit_customer_modal__label}>
                          Address Label{" "}
                          <span
                            className={styles.edit_customer_modal__required}
                          >
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="label"
                          value={formData.address.label}
                          onChange={(e) => handleChange("address", e)}
                          className={`${styles.edit_customer_modal__input} ${
                            errors.label
                              ? styles["edit_customer_modal__input--error"]
                              : ""
                          }`}
                          placeholder="Home, Office, etc."
                        />
                        {errors.label && (
                          <span
                            className={styles.edit_customer_modal__error_text}
                          >
                            {errors.label}
                          </span>
                        )}
                      </div>

                      <div className={styles.edit_customer_modal__field}>
                        <label className={styles.edit_customer_modal__label}>
                          Street Address{" "}
                          <span
                            className={styles.edit_customer_modal__required}
                          >
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={formData.address.street}
                          onChange={(e) => handleChange("address", e)}
                          className={`${styles.edit_customer_modal__input} ${
                            errors.street
                              ? styles["edit_customer_modal__input--error"]
                              : ""
                          }`}
                          placeholder="10 Carter street, Idimu, Lagos"
                        />
                        {errors.street && (
                          <span
                            className={styles.edit_customer_modal__error_text}
                          >
                            {errors.street}
                          </span>
                        )}
                      </div>

                      <div className={styles.edit_customer_modal__row}>
                        <div className={styles.edit_customer_modal__field}>
                          <label className={styles.edit_customer_modal__label}>
                            City{" "}
                            <span
                              className={styles.edit_customer_modal__required}
                            >
                              *
                            </span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.address.city}
                            onChange={(e) => handleChange("address", e)}
                            className={`${styles.edit_customer_modal__input} ${
                              errors.city
                                ? styles["edit_customer_modal__input--error"]
                                : ""
                            }`}
                            placeholder="Egbeda"
                          />
                          {errors.city && (
                            <span
                              className={styles.edit_customer_modal__error_text}
                            >
                              {errors.city}
                            </span>
                          )}
                        </div>

                        <div className={styles.edit_customer_modal__field}>
                          <label className={styles.edit_customer_modal__label}>
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.address.state}
                            onChange={(e) => handleChange("address", e)}
                            className={styles.edit_customer_modal__input}
                            placeholder="Lagos"
                          />
                        </div>
                      </div>

                      <div className={styles.edit_customer_modal__row}>
                        <div className={styles.edit_customer_modal__field}>
                          <label className={styles.edit_customer_modal__label}>
                            Zip/Postal Code
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.address.zipCode}
                            onChange={(e) => handleChange("address", e)}
                            className={styles.edit_customer_modal__input}
                            placeholder="110001"
                          />
                        </div>

                        <div className={styles.edit_customer_modal__field}>
                          <label className={styles.edit_customer_modal__label}>
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={formData.address.country}
                            onChange={(e) => handleChange("address", e)}
                            className={styles.edit_customer_modal__input}
                            placeholder="Nigeria"
                          />
                        </div>
                      </div>

                      <div className={styles.edit_customer_modal__field}>
                        <div
                          className={
                            styles.edit_customer_modal__checkbox_container
                          }
                        >
                          <input
                            type="checkbox"
                            name="isDefault"
                            id="isDefault"
                            checked={formData.address.isDefault}
                            onChange={(e) => handleChange("address", e)}
                            className={styles.edit_customer_modal__checkbox}
                          />
                          <label
                            htmlFor="isDefault"
                            className={
                              styles.edit_customer_modal__checkbox_label
                            }
                          >
                            Set as default address
                          </label>
                        </div>
                        <p className={styles.edit_customer_modal__help_text}>
                          When checked, this address will be used as the
                          customer's primary address for deliveries and billing.
                        </p>
                      </div>

                      <div className={styles.edit_customer_modal__form_actions}>
                        <button
                          type="button"
                          className={styles.edit_customer_modal__cancel_button}
                          onClick={handleCancelAddressEdit}
                          disabled={isLoading}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className={styles.edit_customer_modal__section_submit}
                          onClick={
                            isAddingAddress
                              ? handleAddNewAddress
                              : handleUpdateAddressInfo
                          }
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span
                              className={styles.edit_customer_modal__spinner}
                            ></span>
                          ) : isAddingAddress ? (
                            "Add Address"
                          ) : (
                            "Update Address"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "account" && (
                <motion.div
                  key="account"
                  className={styles.edit_customer_modal__section}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                >
                  <h3 className={styles.edit_customer_modal__section_title}>
                    Account Information
                  </h3>

                  <div className={styles.edit_customer_modal__field}>
                    <label className={styles.edit_customer_modal__label}>
                      Account Status
                    </label>
                    <select
                      name="accountStatus"
                      value={formData.personal.accountStatus}
                      onChange={(e) => handleChange("personal", e)}
                      className={styles.edit_customer_modal__select}
                    >
                      <option value={AccountStatus.Active}>Active</option>
                      <option value={AccountStatus.Inactive}>Inactive</option>
                      <option value={AccountStatus.PendingVerification}>
                        Pending Verification
                      </option>
                      <option value={AccountStatus.Suspended}>Suspended</option>
                      <option value={AccountStatus.Locked}>Locked</option>
                    </select>
                  </div>

                  <div className={styles.edit_customer_modal__note}>
                    <p className={styles.edit_customer_modal__note_text}>
                      <strong>Note:</strong> Changing account status may affect
                      the customer's ability to log in or access services.
                    </p>
                  </div>

                  <div className={styles.edit_customer_modal__section_actions}>
                    <button
                      type="button"
                      className={styles.edit_customer_modal__section_submit}
                      onClick={handleUpdateAccountInfo}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span
                          className={styles.edit_customer_modal__spinner}
                        ></span>
                      ) : (
                        "Update Account Status"
                      )}
                    </button>
                  </div>

                  <div className={styles.edit_customer_modal__danger_zone}>
                    <h4 className={styles.edit_customer_modal__danger_title}>
                      Danger Zone
                    </h4>
                    <button
                      type="button"
                      className={styles.edit_customer_modal__danger_button}
                      onClick={() => {
                        // This would typically open a confirmation dialog before deleting
                        alert(
                          "This would delete the customer account (Not implemented)"
                        );
                      }}
                    >
                      Delete Customer Account
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.edit_customer_modal__navigation}>
            {activeTab !== "personal" && (
              <button
                type="button"
                className={styles.edit_customer_modal__nav_button}
                onClick={() => {
                  const tabs = ["personal", "address", "account"];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex - 1]);
                }}
              >
                Previous
              </button>
            )}

            {activeTab !== "account" && (
              <button
                type="button"
                className={styles.edit_customer_modal__nav_button}
                onClick={() => {
                  const tabs = ["personal", "address", "account"];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex + 1]);
                }}
              >
                Next
              </button>
            )}
          </div>

          <div className={styles.edit_customer_modal__actions}>
            <button
              type="button"
              className={styles.edit_customer_modal__cancel}
              onClick={onClose}
              disabled={isLoading}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Account Status Update Confirmation Dialog */}
      <Modal
        isOpen={showAccountConfirmation}
        onClose={handleCancelAccountUpdate}
        title="Confirm Account Status Update"
        maxWidth="400px"
      >
        <div className={styles.edit_customer_modal__confirmation}>
          <div className={styles.edit_customer_modal__confirmation_content}>
            <p className={styles.edit_customer_modal__confirmation_text}>
              Are you sure you want to update the account status to{" "}
              <strong>{formData.personal.accountStatus}</strong> for{" "}
              <strong>
                {formData.personal.firstName} {formData.personal.lastName}
              </strong>
              ?
            </p>
            <p className={styles.edit_customer_modal__confirmation_warning}>
              This action may affect the customer's ability to log in or access
              services.
            </p>
          </div>

          <div className={styles.edit_customer_modal__confirmation_actions}>
            <button
              type="button"
              className={styles.edit_customer_modal__confirmation_cancel}
              onClick={handleCancelAccountUpdate}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.edit_customer_modal__confirmation_confirm}
              onClick={handleConfirmAccountUpdate}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.edit_customer_modal__spinner}></span>
              ) : (
                "Update Status"
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Address Confirmation Dialog */}
      <Modal
        isOpen={showDeleteConfirmation}
        onClose={handleCancelDeleteAddress}
        title="Confirm Address Deletion"
        maxWidth="400px"
      >
        <div className={styles.edit_customer_modal__confirmation}>
          <div className={styles.edit_customer_modal__confirmation_content}>
            <p className={styles.edit_customer_modal__confirmation_text}>
              Are you sure you want to delete this address?
            </p>
            <p className={styles.edit_customer_modal__confirmation_warning}>
              This action cannot be undone. The address will be permanently
              removed from the customer's account.
            </p>
          </div>

          <div className={styles.edit_customer_modal__confirmation_actions}>
            <button
              type="button"
              className={styles.edit_customer_modal__confirmation_cancel}
              onClick={handleCancelDeleteAddress}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.edit_customer_modal__confirmation_confirm}
              onClick={handleConfirmDeleteAddress}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.edit_customer_modal__spinner}></span>
              ) : (
                "Delete Address"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </Modal>
  );
};

export default EditCustomerModal;
