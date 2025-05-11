"use client";

import { useState } from "react";
import Icon from "../../_components/common/Icon";
import styles from "./BillingSettings.module.scss";

interface BillingFormData {
  subscription: {
    plan: string;
    status: string;
    nextBillingDate: string;
  };
  paymentMethod: {
    type: string;
    last4: string;
    expiryDate: string;
    isDefault: boolean;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function BillingSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BillingFormData>({
    subscription: {
      plan: "Premium",
      status: "active",
      nextBillingDate: "2024-04-01",
    },
    paymentMethod: {
      type: "credit_card",
      last4: "4242",
      expiryDate: "12/25",
      isDefault: true,
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof BillingFormData],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement billing information update logic
    setIsEditing(false);
  };

  return (
    <div className={styles.billingSettings}>
      <div className={styles.billingSettings__header}>
        <h1 className={styles.billingSettings__title}>Billing Settings</h1>
        <p className={styles.billingSettings__subtitle}>
          Manage your subscription and billing information
        </p>
      </div>

      <div className={styles.billingSettings__content}>
        <div className={styles.billingSettings__main}>
          <div className={styles.billingSettings__section}>
            <div className={styles.billingSettings__sectionHeader}>
              <h2 className={styles.billingSettings__sectionTitle}>
                Current Plan
              </h2>
              <button className={styles.billingSettings__changePlanBtn}>
                Change Plan
              </button>
            </div>

            <div className={styles.billingSettings__planInfo}>
              <div className={styles.billingSettings__planDetails}>
                <h3 className={styles.billingSettings__planName}>
                  {formData.subscription.plan}
                </h3>
                <p className={styles.billingSettings__planStatus}>
                  Status:{" "}
                  <span className={styles.billingSettings__statusActive}>
                    Active
                  </span>
                </p>
                <p className={styles.billingSettings__nextBilling}>
                  Next billing date: {formData.subscription.nextBillingDate}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.billingSettings__section}>
            <div className={styles.billingSettings__sectionHeader}>
              <h2 className={styles.billingSettings__sectionTitle}>
                Payment Method
              </h2>
              <button
                className={styles.billingSettings__editBtn}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Payment Method"}
              </button>
            </div>

            {isEditing ? (
              <form
                onSubmit={handleSubmit}
                className={styles.billingSettings__form}
              >
                <div className={styles.billingSettings__formGroup}>
                  <label className={styles.billingSettings__formLabel}>
                    Card Number
                  </label>
                  <div className={styles.billingSettings__cardInput}>
                    <input
                      type="text"
                      placeholder="**** **** **** ****"
                      className={styles.billingSettings__formInput}
                    />
                    <Icon
                      name="credit-card"
                      className={styles.billingSettings__cardIcon}
                    />
                  </div>
                </div>

                <div className={styles.billingSettings__formRow}>
                  <div className={styles.billingSettings__formGroup}>
                    <label className={styles.billingSettings__formLabel}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className={styles.billingSettings__formInput}
                    />
                  </div>

                  <div className={styles.billingSettings__formGroup}>
                    <label className={styles.billingSettings__formLabel}>
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="***"
                      className={styles.billingSettings__formInput}
                    />
                  </div>
                </div>

                <h3 className={styles.billingSettings__formSubtitle}>
                  Billing Address
                </h3>

                <div className={styles.billingSettings__formGroup}>
                  <label className={styles.billingSettings__formLabel}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="billingAddress.name"
                    value={formData.billingAddress.name}
                    onChange={handleChange}
                    className={styles.billingSettings__formInput}
                  />
                </div>

                <div className={styles.billingSettings__formGroup}>
                  <label className={styles.billingSettings__formLabel}>
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="billingAddress.street"
                    value={formData.billingAddress.street}
                    onChange={handleChange}
                    className={styles.billingSettings__formInput}
                  />
                </div>

                <div className={styles.billingSettings__formRow}>
                  <div className={styles.billingSettings__formGroup}>
                    <label className={styles.billingSettings__formLabel}>
                      City
                    </label>
                    <input
                      type="text"
                      name="billingAddress.city"
                      value={formData.billingAddress.city}
                      onChange={handleChange}
                      className={styles.billingSettings__formInput}
                    />
                  </div>

                  <div className={styles.billingSettings__formGroup}>
                    <label className={styles.billingSettings__formLabel}>
                      State
                    </label>
                    <input
                      type="text"
                      name="billingAddress.state"
                      value={formData.billingAddress.state}
                      onChange={handleChange}
                      className={styles.billingSettings__formInput}
                    />
                  </div>
                </div>

                <div className={styles.billingSettings__formRow}>
                  <div className={styles.billingSettings__formGroup}>
                    <label className={styles.billingSettings__formLabel}>
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="billingAddress.zipCode"
                      value={formData.billingAddress.zipCode}
                      onChange={handleChange}
                      className={styles.billingSettings__formInput}
                    />
                  </div>

                  <div className={styles.billingSettings__formGroup}>
                    <label className={styles.billingSettings__formLabel}>
                      Country
                    </label>
                    <input
                      type="text"
                      name="billingAddress.country"
                      value={formData.billingAddress.country}
                      onChange={handleChange}
                      className={styles.billingSettings__formInput}
                    />
                  </div>
                </div>

                <div className={styles.billingSettings__formActions}>
                  <button
                    type="submit"
                    className={styles.billingSettings__submitBtn}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.billingSettings__paymentInfo}>
                <div className={styles.billingSettings__card}>
                  <div className={styles.billingSettings__cardIcon}>
                    <Icon name="credit-card" />
                  </div>
                  <div className={styles.billingSettings__cardDetails}>
                    <p className={styles.billingSettings__cardType}>
                      {formData.paymentMethod.type === "credit_card"
                        ? "Credit Card"
                        : "Debit Card"}
                    </p>
                    <p className={styles.billingSettings__cardNumber}>
                      •••• {formData.paymentMethod.last4}
                    </p>
                    <p className={styles.billingSettings__cardExpiry}>
                      Expires {formData.paymentMethod.expiryDate}
                    </p>
                  </div>
                </div>

                <div className={styles.billingSettings__billingAddress}>
                  <h3 className={styles.billingSettings__addressTitle}>
                    Billing Address
                  </h3>
                  <p className={styles.billingSettings__addressName}>
                    {formData.billingAddress.name}
                  </p>
                  <p className={styles.billingSettings__addressStreet}>
                    {formData.billingAddress.street}
                  </p>
                  <p className={styles.billingSettings__addressCity}>
                    {formData.billingAddress.city},{" "}
                    {formData.billingAddress.state}{" "}
                    {formData.billingAddress.zipCode}
                  </p>
                  <p className={styles.billingSettings__addressCountry}>
                    {formData.billingAddress.country}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
