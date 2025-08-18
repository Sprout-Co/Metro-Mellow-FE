// src/app/(routes)/(app)/dashboard/payments/page.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Plus,
  Check,
  MoreVertical,
  Trash2,
  Edit,
  Shield,
  AlertCircle,
} from "lucide-react";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import styles from "./PaymentMethods.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import Modal from "@/components/ui/Modal/Modal";
import Input from "@/components/ui/Input/Input";
import DashboardHeader from "../_components/DashboardHeader/DashboardHeader";

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "bank";
  last4: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
  brand?: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "visa",
    last4: "4242",
    expiryDate: "12/25",
    cardholderName: "Sarah Johnson",
    isDefault: true,
    brand: "Visa",
  },
  {
    id: "2",
    type: "mastercard",
    last4: "8901",
    expiryDate: "08/24",
    cardholderName: "Sarah Johnson",
    isDefault: false,
    brand: "Mastercard",
  },
  {
    id: "3",
    type: "bank",
    last4: "3456",
    expiryDate: "",
    cardholderName: "Sarah Johnson",
    isDefault: false,
    brand: "GTBank",
  },
];

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(mockPaymentMethods);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSetDefault = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDeleteMethod = (id: string) => {
    setSelectedMethod(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMethod) {
      setPaymentMethods((methods) =>
        methods.filter((m) => m.id !== selectedMethod)
      );
      setIsDeleteModalOpen(false);
      setSelectedMethod(null);
    }
  };

  const handleAddMethod = () => {
    // Add new payment method logic
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "visa",
      last4: formData.cardNumber.slice(-4),
      expiryDate: formData.expiryDate,
      cardholderName: formData.cardholderName,
      isDefault: paymentMethods.length === 0,
      brand: "Visa",
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setIsAddModalOpen(false);
    setFormData({
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    });
  };

  const getCardBackground = (type: string) => {
    switch (type) {
      case "visa":
        return "linear-gradient(135deg, #1a1f71 0%, #3b4cca 100%)";
      case "mastercard":
        return "linear-gradient(135deg, #eb001b 0%, #f79e1b 100%)";
      case "bank":
        return "linear-gradient(135deg, #075056 0%, #9cb9bb 100%)";
      default:
        return "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)";
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.paymentMethods}>
        {/* Header */}
        <DashboardHeader
          title="Payment Methods"
          subtitle="Manage your payment methods and billing information"
          actionBtnText="Add Payment Method"
          actionBtnIcon={<Plus size={18} />}
          onActionButtonClick={() => setIsAddModalOpen(true)}
        />

        {/* Security Notice */}
        <motion.div
          className={styles.paymentMethods__notice}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Shield className={styles.paymentMethods__noticeIcon} />
          <div className={styles.paymentMethods__noticeContent}>
            <h3>Your payment information is secure</h3>
            <p>
              We use industry-standard encryption to protect your payment
              details. Your full card number is never stored on our servers.
            </p>
          </div>
        </motion.div>

        {/* Payment Methods Grid */}
        <div className={styles.paymentMethods__grid}>
          <AnimatePresence mode="popLayout">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                className={styles.paymentCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {/* Card Visual */}
                <div
                  className={styles.paymentCard__visual}
                  style={{ background: getCardBackground(method.type) }}
                >
                  {method.isDefault && (
                    <span className={styles.paymentCard__defaultBadge}>
                      Default
                    </span>
                  )}
                  <div className={styles.paymentCard__chip} />
                  <div className={styles.paymentCard__number}>
                    •••• •••• •••• {method.last4}
                  </div>
                  <div className={styles.paymentCard__details}>
                    <div>
                      <span className={styles.paymentCard__label}>
                        Card Holder
                      </span>
                      <span className={styles.paymentCard__value}>
                        {method.cardholderName}
                      </span>
                    </div>
                    {method.expiryDate && (
                      <div>
                        <span className={styles.paymentCard__label}>
                          Expires
                        </span>
                        <span className={styles.paymentCard__value}>
                          {method.expiryDate}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={styles.paymentCard__brand}>
                    {method.brand}
                  </div>
                </div>

                {/* Card Actions */}
                <div className={styles.paymentCard__actions}>
                  {!method.isDefault && (
                    <motion.button
                      className={styles.paymentCard__actionBtn}
                      onClick={() => handleSetDefault(method.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Check size={16} />
                      Set as Default
                    </motion.button>
                  )}
                  <motion.button
                    className={`${styles.paymentCard__actionBtn} ${styles["paymentCard__actionBtn--danger"]}`}
                    onClick={() => handleDeleteMethod(method.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={16} />
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {/* Add New Card */}
            <motion.div
              className={styles.paymentCard__add}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: paymentMethods.length * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className={styles.paymentCard__addIcon} />
              <h3>Add Payment Method</h3>
              <p>Add a new card or bank account</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Billing History Section */}
        <motion.div
          className={styles.billingHistory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.billingHistory__title}>Recent Transactions</h2>
          <div className={styles.billingHistory__list}>
            {[
              {
                date: "Aug 15, 2024",
                amount: "₦45,000",
                service: "Monthly Subscription",
                status: "success",
              },
              {
                date: "Jul 15, 2024",
                amount: "₦45,000",
                service: "Monthly Subscription",
                status: "success",
              },
              {
                date: "Jun 15, 2024",
                amount: "₦45,000",
                service: "Monthly Subscription",
                status: "success",
              },
            ].map((transaction, index) => (
              <motion.div
                key={index}
                className={styles.transaction}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <div className={styles.transaction__info}>
                  <h4>{transaction.service}</h4>
                  <p>{transaction.date}</p>
                </div>
                <div className={styles.transaction__amount}>
                  <span
                    className={
                      styles[`transaction__amount--${transaction.status}`]
                    }
                  >
                    {transaction.amount}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add Payment Method Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Payment Method"
        >
          <div className={styles.addForm}>
            <Input
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
              leftIcon={<CreditCard size={20} />}
              fullWidth
              required
            />
            <Input
              label="Cardholder Name"
              placeholder="John Doe"
              value={formData.cardholderName}
              onChange={(e) =>
                setFormData({ ...formData, cardholderName: e.target.value })
              }
              fullWidth
              required
            />
            <div className={styles.addForm__row}>
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                required
              />
              <Input
                label="CVV"
                placeholder="123"
                type="password"
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
                maxLength={3}
                required
              />
            </div>
            <div className={styles.addForm__actions}>
              <FnButton
                variant="ghost"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </FnButton>
              <FnButton variant="primary" onClick={handleAddMethod}>
                Add Card
              </FnButton>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Remove Payment Method"
        >
          <div className={styles.deleteModal}>
            <AlertCircle className={styles.deleteModal__icon} />
            <p className={styles.deleteModal__message}>
              Are you sure you want to remove this payment method? This action
              cannot be undone.
            </p>
            <div className={styles.deleteModal__actions}>
              <FnButton
                variant="ghost"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </FnButton>
              <FnButton variant="primary" onClick={confirmDelete}>
                Remove
              </FnButton>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
