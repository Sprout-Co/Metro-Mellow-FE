"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsLayout from "../SettingsLayout";
import styles from "./BillingSettings.module.scss";
import { usePaymentOperations } from "@/graphql/hooks/payments/usePaymentOperations";
import { useInvoiceOperations } from "@/graphql/hooks/invoices/useInvoiceOperations";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { PaymentMethodType, InvoiceStatus } from "@/graphql/api";

interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  brand: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  subtotal: number;
  tax: number;
  total: number;
  dueDate: string;
  status: InvoiceStatus;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  downloadUrl: string;
}

interface BillingFormData {
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: PaymentMethod | null;
  emailNotifications: boolean;
  paperlessBilling: boolean;
  receiptEmails: string[];
  allowAutoRenewal: boolean;
}

interface NewCardData {
  number: string;
  expiry: string;
  cvc: string;
  cardholderName: string;
  setAsDefault: boolean;
}

export default function BillingSettings() {
  const {
    paymentMethods,
    handleAddPaymentMethod,
    handleRemovePaymentMethod: removePaymentMethod,
    handleSetDefaultPaymentMethod,
  } = usePaymentOperations();

  const { invoices } = useInvoiceOperations();

  const { handleUpdateProfile } = useAuthOperations();

  const [isLoading, setIsLoading] = useState({
    paymentMethods: false,
    invoices: false,
    addingCard: false,
    removingCard: false,
    settingDefault: false,
    updatingProfile: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("payment-methods");
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardData, setNewCardData] = useState<NewCardData>({
    number: "",
    expiry: "",
    cvc: "",
    cardholderName: "",
    setAsDefault: false,
  });

  const [formData, setFormData] = useState<BillingFormData>({
    billingAddress: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    paymentMethod: null,
    emailNotifications: true,
    paperlessBilling: true,
    receiptEmails: [],
    allowAutoRenewal: true,
  });

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading((prev) => ({ ...prev, addingCard: true }));
      const [expMonth, expYear] = newCardData.expiry.split("/");
      const newPaymentMethod = await handleAddPaymentMethod({
        type: PaymentMethodType.CreditCard,
        token: "test_token", // This should be replaced with actual token from your payment processor
        isDefault: newCardData.setAsDefault || paymentMethods.length === 0,
      });

      if (newPaymentMethod) {
        setShowAddCard(false);
        setNewCardData({
          number: "",
          expiry: "",
          cvc: "",
          cardholderName: "",
          setAsDefault: false,
        });
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add payment method"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, addingCard: false }));
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, settingDefault: true }));
      const updatedMethod = await handleSetDefaultPaymentMethod(id);
      if (updatedMethod) {
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to set default payment method"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, settingDefault: false }));
    }
  };

  const handleRemovePaymentMethod = async (id: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, removingCard: true }));
      const success = await removePaymentMethod(id);
      if (success) {
        const isDefault = paymentMethods.find(
          (pm: any) => pm.id === id
        )?.isDefault;
        const updatedPaymentMethods = paymentMethods.filter(
          (pm: any) => pm.id !== id
        );

        if (isDefault && updatedPaymentMethods.length > 0) {
          await handleSetDefaultPaymentMethod(updatedPaymentMethods[0].id);
        }

        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove payment method"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, removingCard: false }));
    }
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
                  onClick={() => setShowAddCard(!showAddCard)}
                >
                  {showAddCard ? "Cancel" : "Add Payment Method"}
                </button>
              </div>

              <AnimatePresence>
                {showAddCard && (
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
                          onChange={() => {}}
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
                            value={newCardData.number}
                            onChange={() => {}}
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
                            onChange={() => {}}
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
                            onChange={() => {}}
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
                            onChange={() => {}}
                            className={styles.billingSettings__checkbox}
                          />
                          Set as default payment method
                        </label>
                      </div>

                      <div className={styles.billingSettings__formActions}>
                        <button
                          type="button"
                          className={styles.billingSettings__cancelBtn}
                          onClick={() => setShowAddCard(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={styles.billingSettings__submitBtn}
                          disabled={isLoading.addingCard}
                        >
                          {isLoading.addingCard
                            ? "Adding..."
                            : "Add Payment Method"}
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
                      {method.type === PaymentMethodType.CreditCard ? (
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
                              Expires {method.expiryMonth}/
                              {method.expiryYear.toString().slice(-2)}
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
                              {"email" in method ? (method as any).email : ""}
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
                            disabled={isLoading.settingDefault}
                          >
                            {isLoading.settingDefault
                              ? "Setting..."
                              : "Set as Default"}
                          </button>
                        )}
                        <button
                          className={styles.billingSettings__removeBtn}
                          onClick={() => handleRemovePaymentMethod(method.id)}
                          disabled={isLoading.removingCard}
                        >
                          {isLoading.removingCard ? "Removing..." : "Remove"}
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
                      onClick={() => setShowAddCard(true)}
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
                  onClick={() => {}}
                >
                  Edit Address
                </button>
              </div>

              <form className={styles.billingSettings__form}>
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
                    onChange={() => {}}
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
                    onChange={() => {}}
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
                      onChange={() => {}}
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
                      onChange={() => {}}
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
                      onChange={() => {}}
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
                      onChange={() => {}}
                      className={styles.billingSettings__formInput}
                      required
                    />
                  </div>
                </div>

                <div className={styles.billingSettings__formActions}>
                  <button
                    type="button"
                    className={styles.billingSettings__cancelBtn}
                    onClick={() => {}}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={styles.billingSettings__submitBtn}
                    disabled={isLoading.updatingProfile}
                  >
                    {isLoading.updatingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
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
                {isLoading.invoices ? (
                  <div className={styles.billingSettings__loading}>
                    <div className={styles.billingSettings__spinner}></div>
                    <span>Loading invoices...</span>
                  </div>
                ) : (
                  <table className={styles.billingSettings__table}>
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td>{invoice.id}</td>
                          <td>{formatDate(invoice.dueDate)}</td>
                          <td>${invoice.total.toFixed(2)}</td>
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
                                href={
                                  "downloadUrl" in invoice
                                    ? (invoice as any).downloadUrl
                                    : "#"
                                }
                                className={
                                  styles.billingSettings__invoiceAction
                                }
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
                )}
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

        {error && (
          <motion.div
            className={styles.billingSettings__errorMessage}
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
            <button
              className={styles.billingSettings__errorClose}
              onClick={() => setError(null)}
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
          </motion.div>
        )}
      </div>
    </SettingsLayout>
  );
}
