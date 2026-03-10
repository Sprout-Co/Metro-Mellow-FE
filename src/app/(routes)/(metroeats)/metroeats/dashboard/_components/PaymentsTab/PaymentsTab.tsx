"use client";

import React from "react";
import { Plus, CreditCard as CardIcon } from "lucide-react";
import type { GetPaymentMethodsQuery } from "@/graphql/api";
import styles from "../../dashboard.module.scss";

type PaymentMethod = GetPaymentMethodsQuery["paymentMethods"][0];

interface PaymentsTabProps {
  paymentMethods: PaymentMethod[];
  onAddCardToast: (message: string) => void;
}

export default function PaymentsTab({
  paymentMethods,
  onAddCardToast,
}: PaymentsTabProps) {
  return (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__section-header"]}>
        <h2 className={styles["dashboard-page__section-header-title"]}>
          Payment Methods
        </h2>
        <button
          className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]}`}
          onClick={() => onAddCardToast("Add payment at checkout")}
        >
          <Plus size={18} /> Add New Card
        </button>
      </div>
      <div className={styles["dashboard-page__quick-order-grid"]}>
        {paymentMethods.map((pm) => (
          <article
            key={pm.id}
            className={styles["dashboard-page__meal-card"]}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: "var(--spacing-xl)",
            }}
          >
            <div
              style={{
                background: "var(--color-bg-light)",
                padding: "1rem",
                borderRadius: "var(--radius-lg)",
                marginRight: "var(--spacing-md)",
              }}
            >
              <CardIcon size={32} color="var(--color-dark-base)" strokeWidth={2} />
            </div>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-secondary)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                }}
              >
                •••• •••• •••• {pm.last4}
              </h3>
              <p style={{ color: "var(--color-dark-muted)" }}>
                Expires {String(pm.expiryMonth).padStart(2, "0")}/{pm.expiryYear}
              </p>
            </div>
            {pm.isDefault && (
              <span
                className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--success"]}`}
              >
                Default
              </span>
            )}
          </article>
        ))}
      </div>
      {paymentMethods.length === 0 && (
        <p className={styles["dashboard-page__empty"]}>
          No payment methods. Add one at checkout.
        </p>
      )}
    </div>
  );
}
