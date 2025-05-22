"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardHeader from "../_components/header/DashboardHeader";
import styles from "./Billing.module.scss";

// Mock data for the billing page
const invoices = [
  {
    id: "INV-001",
    amount: 129.99,
    date: "2024-04-01",
    status: "Paid",
    service: "Cleaning Service (Weekly)",
  },
  {
    id: "INV-002",
    amount: 79.99,
    date: "2024-03-01",
    status: "Paid",
    service: "Laundry Service (Bi-weekly)",
  },
  {
    id: "INV-003",
    amount: 129.99,
    date: "2024-02-01",
    status: "Paid",
    service: "Cleaning Service (Weekly)",
  },
  {
    id: "INV-004",
    amount: 79.99,
    date: "2024-01-01",
    status: "Paid",
    service: "Laundry Service (Bi-weekly)",
  },
];

const subscriptions = [
  {
    id: "SUB-001",
    name: "Premium Cleaning",
    status: "Active",
    nextBillingDate: "2024-05-01",
    amount: 129.99,
    frequency: "Weekly",
    services: ["Full House Cleaning", "Bathroom Deep Clean"],
  },
  {
    id: "SUB-002",
    name: "Standard Laundry",
    status: "Active",
    nextBillingDate: "2024-05-15",
    amount: 79.99,
    frequency: "Bi-weekly",
    services: ["Wash & Fold", "Ironing Service"],
  },
];

const paymentMethods = [
  {
    id: "PM-001",
    type: "Credit Card",
    last4: "4242",
    expiry: "05/25",
    isDefault: true,
    brand: "Visa",
  },
  {
    id: "PM-002",
    type: "Credit Card",
    last4: "1234",
    expiry: "08/26",
    isDefault: false,
    brand: "Mastercard",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <div className={styles.billing}>
      <DashboardHeader />

      <div className={styles.billing__container}>
        <motion.div
          className={styles.billing__header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.billing__title}>Billing & Payments</h1>
          <p className={styles.billing__subtitle}>
            Manage your billing information, view invoices, and update payment
            methods
          </p>
        </motion.div>

        <div className={styles.billing__tabs}>
          <button
            className={`${styles.billing__tab} ${activeTab === "invoices" ? styles.billing__tabActive : ""}`}
            onClick={() => setActiveTab("invoices")}
          >
            Invoices
          </button>
          <button
            className={`${styles.billing__tab} ${activeTab === "subscriptions" ? styles.billing__tabActive : ""}`}
            onClick={() => setActiveTab("subscriptions")}
          >
            Subscriptions
          </button>
          <button
            className={`${styles.billing__tab} ${activeTab === "payment-methods" ? styles.billing__tabActive : ""}`}
            onClick={() => setActiveTab("payment-methods")}
          >
            Payment Methods
          </button>
        </div>

        <div className={styles.billing__content}>
          {activeTab === "invoices" && (
            <motion.div
              className={styles.billing__invoices}
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className={styles.billing__contentHeader}>
                <h2 className={styles.billing__contentTitle}>
                  Invoice History
                </h2>
                <button className={styles.billing__button}>Download All</button>
              </div>

              <div className={styles.billing__tableContainer}>
                <table className={styles.billing__table}>
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
                      <motion.tr key={invoice.id} variants={item}>
                        <td>{invoice.id}</td>
                        <td>{new Date(invoice.date).toLocaleDateString()}</td>
                        <td>{invoice.service}</td>
                        <td>${invoice.amount.toFixed(2)}</td>
                        <td>
                          <span
                            className={`${styles.billing__status} ${styles.billing__statusPaid}`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.billing__actions}>
                            <button className={styles.billing__actionButton}>
                              View
                            </button>
                            <button className={styles.billing__actionButton}>
                              Download
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "subscriptions" && (
            <motion.div
              className={styles.billing__subscriptions}
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className={styles.billing__contentHeader}>
                <h2 className={styles.billing__contentTitle}>
                  Your Subscriptions
                </h2>
                <button className={styles.billing__button}>
                  Add Subscription
                </button>
              </div>

              <div className={styles.billing__subscriptionCards}>
                {subscriptions.map((subscription) => (
                  <motion.div
                    key={subscription.id}
                    className={styles.billing__subscriptionCard}
                    variants={item}
                  >
                    <div className={styles.billing__subscriptionHeader}>
                      <h3 className={styles.billing__subscriptionTitle}>
                        {subscription.name}
                      </h3>
                      <span
                        className={`${styles.billing__status} ${styles.billing__statusActive}`}
                      >
                        {subscription.status}
                      </span>
                    </div>

                    <div className={styles.billing__subscriptionDetails}>
                      <div className={styles.billing__subscriptionDetail}>
                        <span className={styles.billing__subscriptionLabel}>
                          Amount:
                        </span>
                        <span className={styles.billing__subscriptionValue}>
                          ${subscription.amount}/
                          <span
                            className={styles.billing__subscriptionFrequency}
                          >
                            {subscription.frequency}
                          </span>
                        </span>
                      </div>
                      <div className={styles.billing__subscriptionDetail}>
                        <span className={styles.billing__subscriptionLabel}>
                          Next Billing:
                        </span>
                        <span className={styles.billing__subscriptionValue}>
                          {new Date(
                            subscription.nextBillingDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className={styles.billing__subscriptionServices}>
                      <h4 className={styles.billing__subscriptionSubtitle}>
                        Included Services:
                      </h4>
                      <ul className={styles.billing__subscriptionServiceList}>
                        {subscription.services.map((service, index) => (
                          <li
                            key={index}
                            className={styles.billing__subscriptionService}
                          >
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.billing__subscriptionActions}>
                      <button className={styles.billing__subscriptionButton}>
                        Manage
                      </button>
                      <button
                        className={`${styles.billing__subscriptionButton} ${styles.billing__subscriptionButtonSecondary}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "payment-methods" && (
            <motion.div
              className={styles.billing__paymentMethods}
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className={styles.billing__contentHeader}>
                <h2 className={styles.billing__contentTitle}>
                  Payment Methods
                </h2>
                <button className={styles.billing__button}>
                  Add Payment Method
                </button>
              </div>

              <div className={styles.billing__paymentMethodCards}>
                {paymentMethods.map((method) => (
                  <motion.div
                    key={method.id}
                    className={styles.billing__paymentMethodCard}
                    variants={item}
                  >
                    <div className={styles.billing__paymentMethodHeader}>
                      <div className={styles.billing__paymentMethodInfo}>
                        <div className={styles.billing__paymentMethodIcon}>
                          {method.brand === "Visa" ? (
                            <span
                              className={styles.billing__paymentMethodBrand}
                            >
                              VISA
                            </span>
                          ) : (
                            <span
                              className={styles.billing__paymentMethodBrand}
                            >
                              MC
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className={styles.billing__paymentMethodTitle}>
                            {method.brand} •••• {method.last4}
                          </h3>
                          <p className={styles.billing__paymentMethodExpiry}>
                            Expires {method.expiry}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className={styles.billing__paymentMethodDefault}>
                          Default
                        </span>
                      )}
                    </div>

                    <div className={styles.billing__paymentMethodActions}>
                      {!method.isDefault && (
                        <button className={styles.billing__paymentMethodButton}>
                          Make Default
                        </button>
                      )}
                      <button
                        className={`${styles.billing__paymentMethodButton} ${styles.billing__paymentMethodButtonSecondary}`}
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
