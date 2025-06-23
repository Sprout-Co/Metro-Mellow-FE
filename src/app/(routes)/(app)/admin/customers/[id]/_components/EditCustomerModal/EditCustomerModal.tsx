// src/app/(routes)/(app)/admin/customers/EditCustomerModal/EditCustomerModal.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/ui/Modal/Modal";
import styles from "./EditCustomerModal.module.scss";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { User, AccountStatus, UserRole } from "@/graphql/api";

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
  } = useAuthOperations();
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      isDefault: true,
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
        street: customer.defaultAddress?.street || "",
        city: customer.defaultAddress?.city || "",
        state: customer.defaultAddress?.state || "",
        zipCode: customer.defaultAddress?.zipCode || "",
        country: customer.defaultAddress?.country || "",
        isDefault: true, // Default address is always marked as default
      },
    });
  }, [customer, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate personal information
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for API call
      const updateData = {
        id: customer.id,
        firstName: formData.personal.firstName,
        lastName: formData.personal.lastName,
        phone: formData.personal.phone,
        address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zipCode: formData.address.zipCode,
          country: formData.address.country,
          isDefault: true,
        },
      };

      // Update profile
      await handleUpdateProfile({
        firstName: formData.personal.firstName,
        lastName: formData.personal.lastName,
        phone: formData.personal.phone,
        id: customer.id,
      });
      if (customer.defaultAddress?.id) {
        await handleUpdateAddress(customer.defaultAddress?.id, {
          ...updateData.address,
          userId: customer.id,
        });
      } else {
        await handleAddAddress({ ...updateData.address, userId: customer.id });
      }

      await handleUpdateAccountStatus(
        customer.id,
        formData.personal.accountStatus
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating customer:", error);
      if (error instanceof Error) {
        setErrors({ form: error.message });
      } else {
        setErrors({ form: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
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
      maxWidth="600px"
    >
      <div className={styles.edit_customer_modal}>
        {errors.form && (
          <motion.div
            className={styles.edit_customer_modal__error}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errors.form}
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className={styles.edit_customer_modal__form}
        >
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
              Address
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
                  <h3 className={styles.edit_customer_modal__section_title}>
                    Default Address Information
                  </h3>

                  <div className={styles.edit_customer_modal__field}>
                    <label className={styles.edit_customer_modal__label}>
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.address.street}
                      onChange={(e) => handleChange("address", e)}
                      className={styles.edit_customer_modal__input}
                      placeholder="10 Carter street, Idimu, Lagos"
                    />
                  </div>

                  <div className={styles.edit_customer_modal__row}>
                    <div className={styles.edit_customer_modal__field}>
                      <label className={styles.edit_customer_modal__label}>
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        onChange={(e) => handleChange("address", e)}
                        className={styles.edit_customer_modal__input}
                        placeholder="Egbeda"
                      />
                    </div>

                    <div className={styles.edit_customer_modal__field}>
                      <label className={styles.edit_customer_modal__label}>
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value="Lagos"
                        disabled
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
                  </div>

                  <div className={styles.edit_customer_modal__field}>
                    <div
                      className={styles.edit_customer_modal__checkbox_container}
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
                        className={styles.edit_customer_modal__checkbox_label}
                      >
                        Mark as default address
                      </label>
                    </div>
                    <p className={styles.edit_customer_modal__help_text}>
                      When checked, this address will be used as the customer's
                      primary address for deliveries and billing.
                    </p>
                  </div>
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
              Cancel
            </button>
            <button
              type="submit"
              className={styles.edit_customer_modal__submit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.edit_customer_modal__spinner}></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditCustomerModal;
