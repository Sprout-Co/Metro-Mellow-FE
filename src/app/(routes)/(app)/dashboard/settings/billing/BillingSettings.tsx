"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsLayout from "../SettingsLayout";
import styles from "./BillingSettings.module.scss";

interface PaymentMethod {
  id: string;
  type: "credit_card" | "paypal";
  last4?: string;
  expMonth?: number;
  expYear?: number;
  brand?: string;
  email?: string;
  isDefault: boolean;
}

interface BillingFormData {
  paymentMethod: PaymentMethod | null;
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  allowAutoRenewal: boolean;
  receiptEmails: string[];
}

export default function BillingSettings() {
  const [activeTab, setActiveTab] = useState("payment-methods");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "credit_card",
      last4: "4242",
      expMonth: 12,
      expYear: 2024,
      brand: "visa",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "paypal",
      email: "john.doe@example.com",
      isDefault: false,
    },
  ]);

  const [formData, setFormData] = useState<BillingFormData>({
    paymentMethod: paymentMethods.find((pm) => pm.isDefault) || null,
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    allowAutoRenewal: true,
    receiptEmails: ["john.doe@example.com"],
  });

  const [newCardData, setNewCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiry: "",
    cvc: "",
    setAsDefault: false,
  });

  const invoices = [
    {
      id: "INV-001",
      amount: 129.99,
      date: "2024-04-01",
      status: "Paid",
      service: "Cleaning Service (Weekly)",
      downloadUrl: "#",
    },
    {
      id: "INV-002",
      amount: 79.99,
      date: "2024-03-01",
      status: "Paid",
      service: "Laundry Service (Bi-weekly)",
      downloadUrl: "#",
    },
    {
      id: "INV-003",
      amount: 129.99,
      date: "2024-02-01",
      status: "Paid",
      service: "Cleaning Service (Weekly)",
      downloadUrl: "#",
    },
    {
      id: "INV-004",
      amount: 79.99,
      date: "2024-01-01",
      status: "Paid",
      service: "Laundry Service (Bi-weekly)",
      downloadUrl: "#",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof BillingFormData],
          [child]:
            type === "checkbox"
              ? (e.target as HTMLInputElement).checked
              : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleNewCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewCardData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);

    // Add spaces for readability
    let formattedValue = "";
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formattedValue += " ";
      formattedValue += value[i];
    }

    setNewCardData((prev) => ({
      ...prev,
      cardNumber: formattedValue,
    }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    // Format as MM/YY
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setNewCardData((prev) => ({
      ...prev,
      expiry: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      setFormSuccess(true);

      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    }, 500);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate adding a new card
    const newCard: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: "credit_card",
      last4: newCardData.cardNumber.slice(-4),
      expMonth: parseInt(newCardData.expiry.split("/")[0]),
      expYear: parseInt(`20${newCardData.expiry.split("/")[1]}`),
      brand: "visa", // In a real app, this would be determined by the card number
      isDefault: newCardData.setAsDefault,
    };

    let updatedPaymentMethods = [...paymentMethods];

    // If setting as default, update other cards
    if (newCardData.setAsDefault) {
      updatedPaymentMethods = updatedPaymentMethods.map((pm) => ({
        ...pm,
        isDefault: false,
      }));
    }

    updatedPaymentMethods.push(newCard);
    setPaymentMethods(updatedPaymentMethods);

    // Reset form
    setNewCardData({
      cardNumber: "",
      cardholderName: "",
      expiry: "",
      cvc: "",
      setAsDefault: false,
    });

    setIsAddingCard(false);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
    }, 3000);
  };

  const handleSetDefault = (id: string) => {
    const updatedPaymentMethods = paymentMethods.map((pm) => ({
      ...pm,
      isDefault: pm.id === id,
    }));

    setPaymentMethods(updatedPaymentMethods);

    // Update form data
    const defaultMethod =
      updatedPaymentMethods.find((pm) => pm.id === id) || null;
    setFormData((prev) => ({
      ...prev,
      paymentMethod: defaultMethod,
    }));

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
    }, 3000);
  };

  const handleRemovePaymentMethod = (id: string) => {
    // Check if it's the default method
    const isDefault = paymentMethods.find((pm) => pm.id === id)?.isDefault;

    // Remove the payment method
    const updatedPaymentMethods = paymentMethods.filter((pm) => pm.id !== id);

    // If it was the default and we have other methods, set a new default
    if (isDefault && updatedPaymentMethods.length > 0) {
      updatedPaymentMethods[0].isDefault = true;
      // Update form data to reflect new default
      setFormData((prev) => ({
        ...prev,
        paymentMethod: updatedPaymentMethods[0],
      }));
    } else if (updatedPaymentMethods.length === 0) {
      // No payment methods left
      setFormData((prev) => ({
        ...prev,
        paymentMethod: null,
      }));
    }

    setPaymentMethods(updatedPaymentMethods);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideIn = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <SettingsLayout
      title="Billing & Payments"
      subtitle="Manage your payment methods, billing address, and view invoice history"
    >
      <div className={styles.billingSettings}>
        <div className={styles.billingSettings__tabs}>
          <button
            className={`${styles.billingSettings__tab} ${activeTab === "payment-methods" ? styles.billingSettings__tabActive : ""}`}
            onClick={() => setActiveTab("payment-methods")}
          >
            Payment Methods
          </button>
          <button
            className={`${styles.billingSettings__tab} ${activeTab === "billing-address" ? styles.billingSettings__tabActive : ""}`}
            onClick={() => setActiveTab("billing-address")}
          >
            Billing Address
          </button>
          <button
            className={`${styles.billingSettings__tab} ${activeTab === "invoice-history" ? styles.billingSettings__tabActive : ""}`}
            onClick={() => setActiveTab("invoice-history")}
          >
            Invoice History
          </button>
          <button
            className={`${styles.billingSettings__tab} ${activeTab === "preferences" ? styles.billingSettings__tabActive : ""}`}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
        </div>

        <div className={styles.billingSettings__content}>
          {/* Payment Methods Tab */}
          {activeTab === "payment-methods" && (
            <motion.div
              className={styles.billingSettings__paymentMethods}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.billingSettings__sectionHeader}>
                <h2 className={styles.billingSettings__sectionTitle}>
                  Your Payment Methods
                </h2>
                <button
                  className={styles.billingSettings__addBtn}
                  onClick={() => setIsAddingCard(!isAddingCard)}
                >
                  {isAddingCard ? "Cancel" : "Add Payment Method"}
                </button>
              </div>

              <AnimatePresence>
                {isAddingCard && (
                  <motion.div
                    className={styles.billingSettings__addCard}
                    variants={slideIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <form onSubmit={handleAddCard}>
                      <div className={styles.billingSettings__formGroup}>
                        <label
                          htmlFor="cardholderName"
                          className={styles.billingSettings__formLabel}
                        >
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="cardholderName"
                          name="cardholderName"
                          value={newCardData.cardholderName}
                          onChange={handleNewCardChange}
                          className={styles.billingSettings__formInput}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div className={styles.billingSettings__formGroup}>
                        <label
                          htmlFor="cardNumber"
                          className={styles.billingSettings__formLabel}
                        >
                          Card Number
                        </label>
                        <div
                          className={styles.billingSettings__cardNumberWrapper}
                        >
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={newCardData.cardNumber}
                            onChange={handleCardNumberChange}
                            className={styles.billingSettings__formInput}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          <div
                            className={styles.billingSettings__cardBrandIcon}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="1"
                                y="4"
                                width="22"
                                height="16"
                                rx="2"
                                ry="2"
                              ></rect>
                              <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className={styles.billingSettings__formRow}>
                        <div className={styles.billingSettings__formGroup}>
                          <label
                            htmlFor="expiry"
                            className={styles.billingSettings__formLabel}
                          >
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            value={newCardData.expiry}
                            onChange={handleExpiryChange}
                            className={styles.billingSettings__formInput}
                            placeholder="MM/YY"
                            required
                          />
                        </div>

                        <div className={styles.billingSettings__formGroup}>
                          <label
                            htmlFor="cvc"
                            className={styles.billingSettings__formLabel}
                          >
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            name="cvc"
                            value={newCardData.cvc}
                            onChange={handleNewCardChange}
                            className={styles.billingSettings__formInput}
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.billingSettings__formGroup}>
                        <label
                          className={styles.billingSettings__checkboxLabel}
                        >
                          <input
                            type="checkbox"
                            name="setAsDefault"
                            checked={newCardData.setAsDefault}
                            onChange={handleNewCardChange}
                            className={styles.billingSettings__checkbox}
                          />
                          Set as default payment method
                        </label>
                      </div>

                      <div className={styles.billingSettings__formActions}>
                        <button
                          type="button"
                          className={styles.billingSettings__cancelBtn}
                          onClick={() => setIsAddingCard(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={styles.billingSettings__submitBtn}
                        >
                          Add Payment Method
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.billingSettings__paymentMethodsList}>
                {paymentMethods.length > 0 ? (
                  paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={styles.billingSettings__paymentMethod}
                    >
                      {method.type === "credit_card" ? (
                        <div className={styles.billingSettings__cardDetails}>
                          <div className={styles.billingSettings__cardIcon}>
                            {method.brand === "visa" ? (
                              <span
                                className={styles.billingSettings__visaIcon}
                              >
                                VISA
                              </span>
                            ) : method.brand === "mastercard" ? (
                              <span
                                className={
                                  styles.billingSettings__mastercardIcon
                                }
                              >
                                MC
                              </span>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="1"
                                  y="4"
                                  width="22"
                                  height="16"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                              </svg>
                            )}
                          </div>
                          <div className={styles.billingSettings__cardInfo}>
                            <h3 className={styles.billingSettings__cardTitle}>
                              {method.brand?.charAt(0).toUpperCase() +
                                method.brand?.slice(1) || "Card"}{" "}
                              ending in {method.last4}
                            </h3>
                            <p className={styles.billingSettings__cardMeta}>
                              Expires {method.expMonth}/
                              {method.expYear.toString().slice(-2)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.billingSettings__cardDetails}>
                          <div className={styles.billingSettings__cardIcon}>
                            <span
                              className={styles.billingSettings__paypalIcon}
                            >
                              PP
                            </span>
                          </div>
                          <div className={styles.billingSettings__cardInfo}>
                            <h3 className={styles.billingSettings__cardTitle}>
                              PayPal
                            </h3>
                            <p className={styles.billingSettings__cardMeta}>
                              {method.email}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className={styles.billingSettings__cardActions}>
                        {method.isDefault ? (
                          <span
                            className={styles.billingSettings__defaultBadge}
                          >
                            Default
                          </span>
                        ) : (
                          <button
                            className={styles.billingSettings__setDefaultBtn}
                            onClick={() => handleSetDefault(method.id)}
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          className={styles.billingSettings__removeBtn}
                          onClick={() => handleRemovePaymentMethod(method.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.billingSettings__emptyState}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.billingSettings__emptyIcon}
                    >
                      <rect
                        x="1"
                        y="4"
                        width="22"
                        height="16"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    <h3 className={styles.billingSettings__emptyTitle}>
                      No Payment Methods
                    </h3>
                    <p className={styles.billingSettings__emptyText}>
                      You haven't added any payment methods yet.
                    </p>
                    <button
                      className={styles.billingSettings__addBtnLarge}
                      onClick={() => setIsAddingCard(true)}
                    >
                      Add Payment Method
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Billing Address Tab */}
          {activeTab === "billing-address" && (
            <motion.div
              className={styles.billingSettings__billingAddress}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.billingSettings__sectionHeader}>
                <h2 className={styles.billingSettings__sectionTitle}>
                  Billing Address
                </h2>
                <button
                  className={styles.billingSettings__editBtn}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Address"}
                </button>
              </div>

              {isEditing ? (
                <form
                  onSubmit={handleSubmit}
                  className={styles.billingSettings__form}
                >
                  <div className={styles.billingSettings__formGroup}>
                    <label
                      htmlFor="name"
                      className={styles.billingSettings__formLabel}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="billingAddress.name"
                      value={formData.billingAddress.name}
                      onChange={handleChange}
                      className={styles.billingSettings__formInput}
                      required
                    />
                  </div>

                  <div className={styles.billingSettings__formGroup}>
                    <label
                      htmlFor="street"
                      className={styles.billingSettings__formLabel}
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="street"
                      name="billingAddress.street"
                      value={formData.billingAddress.street}
                      onChange={handleChange}
                      className={styles.billingSettings__formInput}
                      required
                    />
                  </div>

                  <div className={styles.billingSettings__formRow}>
                    <div className={styles.billingSettings__formGroup}>
                      <label
                        htmlFor="city"
                        className={styles.billingSettings__formLabel}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="billingAddress.city"
                        value={formData.billingAddress.city}
                        onChange={handleChange}
                        className={styles.billingSettings__formInput}
                        required
                      />
                    </div>

                    <div className={styles.billingSettings__formGroup}>
                      <label
                        htmlFor="state"
                        className={styles.billingSettings__formLabel}
                      >
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="billingAddress.state"
                        value={formData.billingAddress.state}
                        onChange={handleChange}
                        className={styles.billingSettings__formInput}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.billingSettings__formRow}>
                    <div className={styles.billingSettings__formGroup}>
                      <label
                        htmlFor="zipCode"
                        className={styles.billingSettings__formLabel}
                      >
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="billingAddress.zipCode"
                        value={formData.billingAddress.zipCode}
                        onChange={handleChange}
                        className={styles.billingSettings__formInput}
                        required
                      />
                    </div>

                    <div className={styles.billingSettings__formGroup}>
                      <label
                        htmlFor="country"
                        className={styles.billingSettings__formLabel}
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="billingAddress.country"
                        value={formData.billingAddress.country}
                        onChange={handleChange}
                        className={styles.billingSettings__formInput}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.billingSettings__formActions}>
                    <button
                      type="button"
                      className={styles.billingSettings__cancelBtn}
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={styles.billingSettings__submitBtn}
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className={styles.billingSettings__addressDisplay}>
                  <div className={styles.billingSettings__addressCard}>
                    <h3 className={styles.billingSettings__addressName}>
                      {formData.billingAddress.name}
                    </h3>
                    <p className={styles.billingSettings__addressLine}>
                      {formData.billingAddress.street}
                    </p>
                    <p className={styles.billingSettings__addressLine}>
                      {formData.billingAddress.city},{" "}
                      {formData.billingAddress.state}{" "}
                      {formData.billingAddress.zipCode}
                    </p>
                    <p className={styles.billingSettings__addressLine}>
                      {formData.billingAddress.country}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Invoice History Tab */}
          {activeTab === "invoice-history" && (
            <motion.div
              className={styles.billingSettings__invoiceHistory}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.billingSettings__sectionHeader}>
                <h2 className={styles.billingSettings__sectionTitle}>
                  Invoice History
                </h2>
                <button className={styles.billingSettings__downloadAllBtn}>
                  Download All
                </button>
              </div>

              <div className={styles.billingSettings__tableContainer}>
                <table className={styles.billingSettings__table}>
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Date</th>
                      <th>Service</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{formatDate(invoice.date)}</td>
                        <td>{invoice.service}</td>
                        <td>${invoice.amount.toFixed(2)}</td>
                        <td>
                          <span
                            className={`${styles.billingSettings__status} ${styles.billingSettings__statusPaid}`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <div
                            className={styles.billingSettings__invoiceActions}
                          >
                            <a
                              href={invoice.downloadUrl}
                              className={styles.billingSettings__invoiceAction}
                              download
                            >
                              Download
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <motion.div
              className={styles.billingSettings__preferences}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <div className={styles.billingSettings__sectionHeader}>
                <h2 className={styles.billingSettings__sectionTitle}>
                  Billing Preferences
                </h2>
              </div>

              <form className={styles.billingSettings__preferenceForm}>
                <div className={styles.billingSettings__preferenceGroup}>
                  <div className={styles.billingSettings__preferenceHeader}>
                    <h3 className={styles.billingSettings__preferenceTitle}>
                      Automatic Renewal
                    </h3>
                    <p
                      className={styles.billingSettings__preferenceDescription}
                    >
                      Automatically renew your subscriptions when they expire
                    </p>
                  </div>
                  <label className={styles.billingSettings__switch}>
                    <input
                      type="checkbox"
                      checked={formData.allowAutoRenewal}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          allowAutoRenewal: e.target.checked,
                        }))
                      }
                    />
                    <span className={styles.billingSettings__slider}></span>
                  </label>
                </div>

                <div className={styles.billingSettings__preferenceGroup}>
                  <div className={styles.billingSettings__preferenceHeader}>
                    <h3 className={styles.billingSettings__preferenceTitle}>
                      Receipt Emails
                    </h3>
                    <p
                      className={styles.billingSettings__preferenceDescription}
                    >
                      Additional email addresses to receive payment receipts
                    </p>
                  </div>
                  <div className={styles.billingSettings__emailList}>
                    {formData.receiptEmails.map((email, index) => (
                      <div
                        key={index}
                        className={styles.billingSettings__emailItem}
                      >
                        <span>{email}</span>
                        <button
                          type="button"
                          className={styles.billingSettings__removeEmailBtn}
                          onClick={() => {
                            const newEmails = [...formData.receiptEmails];
                            newEmails.splice(index, 1);
                            setFormData((prev) => ({
                              ...prev,
                              receiptEmails: newEmails,
                            }));
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    ))}
                    <div className={styles.billingSettings__addEmail}>
                      <input
                        type="email"
                        placeholder="Add email address"
                        className={styles.billingSettings__addEmailInput}
                        value=""
                        onChange={() => {}} // This would be implemented in a real app
                      />
                      <button
                        type="button"
                        className={styles.billingSettings__addEmailBtn}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </div>

        {formSuccess && (
          <motion.div
            className={styles.billingSettings__successMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Changes saved successfully</span>
          </motion.div>
        )}
      </div>
    </SettingsLayout>
  );
}
