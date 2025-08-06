import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal/Modal";
import styles from "./AddCustomerModal.module.scss";
import { useAdminOperations } from "@/graphql/hooks/admin/useAdminOperations";
import { CreateUserInput, UserRole } from "@/graphql/api";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
const defaultPassword = "DefaultPassword123$";
const AddCustomerModal: React.FC<AddCustomerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { handleCreateCustomer } = useAdminOperations();

  const [formData, setFormData] = useState<Omit<CreateUserInput, "role">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      city: "",
      street: "",
    },
    password: defaultPassword,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.phone && !/^\+?[0-9\s\-()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // Handle nested fields (address)
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const createdCustomerData = await handleCreateCustomer({
        ...formData,
        role: UserRole.Customer,
      });

      if (createdCustomerData?.success) {
        onSuccess();
        onClose();

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: defaultPassword,
          phone: "",
          address: {
            city: "",
            street: "",
          },
        });
      } else {
        setErrors({
          form: createdCustomerData?.message || "Failed to create customer",
        });
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      if (error instanceof Error) {
        setErrors({ form: error.message });
      } else {
        setErrors({ form: "An unknown error occurred" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Customer"
      maxWidth="500px"
    >
      <div className={styles.add_customer_modal}>
        {errors.form && (
          <motion.div
            className={styles.add_customer_modal__error}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {errors.form}
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className={styles.add_customer_modal__form}
        >
          <div className={styles.add_customer_modal__section}>
            <h3 className={styles.add_customer_modal__section_title}>
              Personal Information
            </h3>

            <div className={styles.add_customer_modal__row}>
              <div className={styles.add_customer_modal__field}>
                <label className={styles.add_customer_modal__label}>
                  First Name{" "}
                  <span className={styles.add_customer_modal__required}>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`${styles.add_customer_modal__input} ${errors.firstName ? styles["add_customer_modal__input--error"] : ""}`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <span className={styles.add_customer_modal__error_text}>
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className={styles.add_customer_modal__field}>
                <label className={styles.add_customer_modal__label}>
                  Last Name{" "}
                  <span className={styles.add_customer_modal__required}>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`${styles.add_customer_modal__input} ${errors.lastName ? styles["add_customer_modal__input--error"] : ""}`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <span className={styles.add_customer_modal__error_text}>
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.add_customer_modal__field}>
              <label className={styles.add_customer_modal__label}>
                Email{" "}
                <span className={styles.add_customer_modal__required}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.add_customer_modal__input} ${errors.email ? styles["add_customer_modal__input--error"] : ""}`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <span className={styles.add_customer_modal__error_text}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className={styles.add_customer_modal__field}>
              <label className={styles.add_customer_modal__label}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                className={`${styles.add_customer_modal__input} ${errors.phone ? styles["add_customer_modal__input--error"] : ""}`}
                placeholder="+1 (234) 567-8901"
              />
              {errors.phone && (
                <span className={styles.add_customer_modal__error_text}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div className={styles.add_customer_modal__field}></div>
          </div>

          <div className={styles.add_customer_modal__section}>
            <h3 className={styles.add_customer_modal__section_title}>
              Address Information
            </h3>

            <div className={styles.add_customer_modal__field}>
              <label className={styles.add_customer_modal__label}>
                Street Address
              </label>
              <input
                type="text"
                name="address.street"
                value={formData.address?.street}
                onChange={handleChange}
                className={styles.add_customer_modal__input}
                placeholder="10 Carter street, Idimu, Lagos"
              />
            </div>

            <div className={styles.add_customer_modal__field}>
              <label className={styles.add_customer_modal__label}>City</label>
              <input
                type="text"
                name="address.city"
                value={formData.address?.city}
                onChange={handleChange}
                className={styles.add_customer_modal__input}
                placeholder="Egbeda"
              />
            </div>
          </div>

          <div className={styles.add_customer_modal__actions}>
            <button
              type="button"
              className={styles.add_customer_modal__cancel}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.add_customer_modal__submit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.add_customer_modal__spinner}></span>
              ) : (
                "Add Customer"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCustomerModal;
