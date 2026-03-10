"use client";

import React from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Modal from "@/components/ui/Modal/Modal";
import styles from "./PaymentSuccessModal.module.scss";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPaid?: number | null;
}

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  totalPaid,
}: PaymentSuccessModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      showHeader={false}
      maxWidth="420px"
      closeOnBackdropClick={false}
      closeOnEscape={true}
    >
      <div className={styles.success}>
        <div className={styles.success__icon} aria-hidden>
          ✓
        </div>
        <h2 id="payment-success-title" className={styles.success__title}>
          You&apos;re all set!
        </h2>
        <p className={styles.success__message}>
          Your order is confirmed and we&apos;re already getting it ready. Track
          live status and get updates from your dashboard.
        </p>
        {totalPaid != null && (
          <p className={styles.success__total}>
            Total paid: <strong>{fmt(totalPaid)}</strong>
          </p>
        )}
        <div className={styles.success__actions}>
          <Link
            href="/metroeats/dashboard"
            className={styles.success__btnPrimary}
            onClick={onClose}
          >
            <MapPin size={20} />
            Track my order
          </Link>
          <Link
            href="/metroeats/menu"
            className={styles.success__btnSecondary}
            onClick={onClose}
          >
            Back to menu
          </Link>
        </div>
      </div>
    </Modal>
  );
}
