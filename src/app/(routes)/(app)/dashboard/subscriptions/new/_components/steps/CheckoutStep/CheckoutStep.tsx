"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MapPin, Plus } from "lucide-react";
import styles from "./CheckoutStep.module.scss";
import { Service } from "@/graphql/api";
import { SingleServiceConfig } from "../ConfigurationStep/ConfigurationStep";
import FnButton from "@/components/ui/Button/FnButton";
import { Routes } from "@/constants/routes";

function getTodayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

interface CheckoutStepProps {
  service: Service;
  config: SingleServiceConfig;
  submitting: boolean;
  error: string | null;
  paymentReference: string | null;
  onSubmit: () => void;
  onStartDateChange?: (startDate: string) => void;
  addresses?: string[];
  selectedAddress?: string;
  onSelectAddress?: (address: string) => void;
  onAddAddressClick?: () => void;
}

const CheckoutStep: React.FC<CheckoutStepProps> = ({
  service,
  config,
  submitting,
  error,
  paymentReference,
  onSubmit,
  onStartDateChange,
  addresses = [],
  selectedAddress,
  onSelectAddress,
  onAddAddressClick,
}) => {
  const router = useRouter();
  const total = config.estimatedPrice;

  return (
    <div className={styles.step}>
      <div className={styles.addressSection}>
        <div className={styles.addressSection__title}>
          <MapPin size={18} />
          Delivery address
        </div>
        {addresses.length > 0 ? (
          <div className={styles.addressList}>
            {addresses.map((addr) => (
              <label
                key={addr}
                className={`${styles.addressOption} ${selectedAddress === addr ? styles.addressOptionSelected : ""}`}
              >
                <input
                  type="radio"
                  name="subscription-address"
                  value={addr}
                  checked={selectedAddress === addr}
                  onChange={() => onSelectAddress?.(addr)}
                  disabled={submitting}
                />
                <span className={styles.addressOption__text}>
                  {addr.length > 50 ? `${addr.slice(0, 50)}…` : addr}
                </span>
              </label>
            ))}
            {onAddAddressClick && (
              <button
                type="button"
                className={styles.addAddressBtn}
                onClick={onAddAddressClick}
                disabled={submitting}
              >
                <Plus size={16} />
                Add new address
              </button>
            )}
          </div>
        ) : (
          <div className={styles.addressEmpty}>
            <p>No saved addresses. Add one to continue.</p>
            {onAddAddressClick && (
              <FnButton
                variant="primary"
                size="sm"
                onClick={onAddAddressClick}
                disabled={submitting}
              >
                <Plus size={16} />
                Add address
              </FnButton>
            )}
          </div>
        )}
      </div>

      <div className={styles.summary}>
        <div className={styles.summary__title}>Order summary</div>
        <div className={styles.summary__row}>
          <span className={styles.summary__label}>Service</span>
          <span className={styles.summary__value}>{service.name}</span>
        </div>
        <div className={styles.summary__row}>
          <span className={styles.summary__label}>Start date</span>
          {onStartDateChange ? (
            <input
              type="date"
              className={styles.summary__dateInput}
              value={config.startDate}
              min={getTodayDateString()}
              onChange={(e) => onStartDateChange(e.target.value)}
              disabled={submitting}
            />
          ) : (
            <span className={styles.summary__value}>
              {new Date(config.startDate).toLocaleDateString(undefined, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
        <div className={styles.summary__row}>
          <span className={styles.summary__label}>Billing</span>
          <span className={styles.summary__value}>
            {config.billingCycle} × {config.duration}
          </span>
        </div>
        <div className={styles.summary__row}>
          <span className={styles.summary__label}>Frequency</span>
          <span className={styles.summary__value}>{config.frequency}</span>
        </div>
        <div className={styles.summary__row}>
          <span className={styles.summary__label}>Preferred time</span>
          <span className={styles.summary__value}>{config.timeSlot}</span>
        </div>
        <div className={`${styles.summary__row} ${styles.total}`}>
          <span className={styles.summary__label}>Total</span>
          <span className={styles.summary__value}>
            ₦{total.toLocaleString()}
          </span>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {paymentReference && (
        <p style={{ fontSize: "0.85rem", color: "#16a34a" }}>
          Payment reference: {paymentReference}
        </p>
      )}

      <div className={styles.actions}>
        <FnButton
          variant="secondary"
          size="sm"
          onClick={() => router.push(Routes.DASHBOARD_SUBSCRIPTIONS)}
        >
          Cancel
        </FnButton>
        <FnButton
          variant="primary"
          size="sm"
          onClick={onSubmit}
          disabled={submitting || !selectedAddress?.trim()}
        >
          {submitting ? "Processing…" : "Confirm & pay"}
        </FnButton>
      </div>
    </div>
  );
};

export default CheckoutStep;
