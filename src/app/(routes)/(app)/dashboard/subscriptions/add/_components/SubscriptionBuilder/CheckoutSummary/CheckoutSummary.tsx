// CheckoutSummary.tsx - Complete Redesign
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Calendar,
  MapPin,
  ArrowLeft,
  Check,
  Sparkles,
  Home,
  Droplets,
  Utensils,
  Bug,
  Package,
  Clock,
  CreditCard,
  Loader,
  ChevronDown,
  Gift,
  X,
} from "lucide-react";
import styles from "./CheckoutSummary.module.scss";
import { BillingCycle, Address } from "@/graphql/api";
import { DurationType } from "../SubscriptionBuilder";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lib/redux/slices/authSlice";
import FnButton from "@/components/ui/Button/FnButton";

interface ConfiguredService {
  service: any;
  configuration: any;
}

interface CheckoutSummaryProps {
  configuredServices: ConfiguredService[];
  billingCycle: BillingCycle;
  duration: DurationType;
  startDate: Date;
  selectedAddress: Address | null;
  onStartDateChange: (date: Date) => void;
  onAddressChange: (address: Address) => void;
  isCreatingSubscription?: boolean;
  onBack: () => void;
  onConfirmCheckout: () => void;
  discount: { amount: number; savingsPercentage: number };
  total: number;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  configuredServices,
  billingCycle,
  duration,
  startDate,
  selectedAddress,
  onStartDateChange,
  onAddressChange,
  isCreatingSubscription = false,
  onBack,
  onConfirmCheckout,
  discount,
  total,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "date",
    "address",
    "services",
  ]);
  const currentUser = useSelector(selectCurrentUser);

  // const calculateSubtotal = () => {
  //   return configuredServices.reduce(
  //     (sum, cs) => sum + (cs.configuration.price || 0),
  //     0
  //   );
  // };

  // const calculateDiscount = () => {
  //   const monthlyTotal = calculateSubtotal();
  //   const savingsPercentage =
  //     duration >= 12 ? 30 : duration >= 6 ? 20 : duration >= 3 ? 10 : 0;
  //   return Math.round(monthlyTotal * (savingsPercentage / 100) * duration);
  // };

  // const calculateTotal = () => {
  //   const subtotal = calculateSubtotal() * duration;
  //   const discount = calculateDiscount();
  //   return subtotal - discount;
  // };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAddress = (address: Address): string => {
    const parts = [
      address.street,
      address.city,
      address.state,
      address.zipCode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case "WEEKLY":
        return "Weekly";
      case "BI_WEEKLY":
        return "Bi-Weekly";
      case "MONTHLY":
        return "Monthly";
      default:
        return frequency;
    }
  };

  const getDaysOfWeek = (days: string[]) => {
    const dayMap: { [key: string]: string } = {
      MONDAY: "Mon",
      TUESDAY: "Tue",
      WEDNESDAY: "Wed",
      THURSDAY: "Thu",
      FRIDAY: "Fri",
      SATURDAY: "Sat",
      SUNDAY: "Sun",
    };
    return days.map((day) => dayMap[day] || day).join(", ");
  };

  const getTimeSlotLabel = (timeSlot: string) => {
    switch (timeSlot) {
      case "MORNING":
        return "Morning";
      case "AFTERNOON":
        return "Afternoon";
      case "EVENING":
        return "Evening";
      default:
        return timeSlot;
    }
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.checkout__container}>
        {/* Clean Header */}
        <div className={styles.checkout__header}>
          <div className={styles.checkout__headerContent}>
            <div className={styles.checkout__headerIcon}>
              <ShoppingCart size={24} />
            </div>
            <div className={styles.checkout__headerText}>
              <h1>Review Your Subscription</h1>
              <p>Confirm your service details and complete checkout</p>
            </div>
          </div>
          <FnButton
            variant="white"
            onClick={onBack}
            className={styles.checkout__backBtn}
          >
            <ArrowLeft size={20} />
            Back to Builder
          </FnButton>
        </div>

        {/* Main Content Grid - Clean & Professional Design */}
        <div className={styles.checkout__body}>
          <div className={styles.checkout__main}>
            {/* Start Date Section */}
            <motion.div
              className={styles.checkout__simpleSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.checkout__simpleFormGroup}>
                <label className={styles.checkout__simpleLabel}>
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    onStartDateChange(newDate);
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  className={styles.checkout__simpleInput}
                  required
                />
                {startDate && (
                  <div className={styles.checkout__simpleDateDisplay}>
                    {formatDate(startDate)}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Service Address Section */}
            <motion.div
              className={styles.checkout__simpleSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className={styles.checkout__simpleLabel}>
                Service Address
              </label>

              {currentUser?.addresses && currentUser.addresses.length > 0 ? (
                <div className={styles.checkout__addressTable}>
                  {currentUser.addresses.map((address) => {
                    if (!address) return null;
                    const isSelected = selectedAddress?.id === address.id;

                    return (
                      <div
                        key={address.id || "address-" + Math.random()}
                        className={`${styles.checkout__addressRow} ${
                          isSelected ? styles.checkout__addressRowSelected : ""
                        }`}
                        onClick={() => onAddressChange(address)}
                      >
                        <div className={styles.checkout__addressRowCheck}>
                          <div
                            className={`${styles.checkout__radioOuter} ${isSelected ? styles.checkout__radioOuterSelected : ""}`}
                          >
                            {isSelected && (
                              <div className={styles.checkout__radioInner} />
                            )}
                          </div>
                        </div>
                        <div className={styles.checkout__addressRowContent}>
                          <div className={styles.checkout__addressRowTitle}>
                            {address.label || "Address"}
                            {address.isDefault && (
                              <span className={styles.checkout__addressRowTag}>
                                Default
                              </span>
                            )}
                          </div>
                          <div className={styles.checkout__addressRowText}>
                            {formatAddress(address)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.checkout__noAddressMessage}>
                  No addresses available.
                </div>
              )}
            </motion.div>

            {/* Services Section */}
            <motion.div
              className={styles.checkout__simpleSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.checkout__simpleSectionHeader}>
                <h3>Services</h3>
                <span className={styles.checkout__simpleCount}>
                  {configuredServices.length}
                </span>
              </div>

              <div className={styles.checkout__serviceTable}>
                <div className={styles.checkout__serviceTableHeader}>
                  <div className={styles.checkout__serviceColName}>Service</div>
                  <div className={styles.checkout__serviceColFrequency}>
                    Frequency
                  </div>
                  <div className={styles.checkout__serviceColDays}>Days</div>
                  <div className={styles.checkout__serviceColTime}>Time</div>
                  <div className={styles.checkout__serviceColPrice}>Price</div>
                </div>

                {configuredServices.map((cs) => (
                  <div
                    key={cs.service._id}
                    className={styles.checkout__serviceRow}
                  >
                    <div className={styles.checkout__serviceColName}>
                      {cs.service.name}
                      <span className={styles.checkout__serviceType}>
                        {cs.service.category.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className={styles.checkout__serviceColFrequency}>
                      {getFrequencyLabel(cs.configuration.frequency)}
                    </div>
                    <div className={styles.checkout__serviceColDays}>
                      {getDaysOfWeek(cs.configuration.scheduledDays || [])}
                    </div>
                    <div className={styles.checkout__serviceColTime}>
                      {getTimeSlotLabel(cs.configuration.preferredTimeSlot)}
                    </div>
                    <div className={styles.checkout__serviceColPrice}>
                      ₦{(cs.configuration.price || 0).toLocaleString()}
                      <span className={styles.checkout__pricePeriod}>/mo</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className={styles.checkout__sidebar}>
            <div className={styles.checkout__summary}>
              <div className={styles.checkout__summaryHeader}>
                <h2>Order Summary</h2>
                <p>
                  {duration} month{duration !== 1 ? "s" : ""} subscription plan
                </p>
              </div>

              <div className={styles.checkout__summaryBody}>
                {configuredServices.map((cs, index) => (
                  <div key={index} className={styles.checkout__summaryItem}>
                    <span className={styles.checkout__summaryLabel}>
                      {cs.service.name}
                    </span>
                    <span className={styles.checkout__summaryValue}>
                      ₦
                      {(
                        (cs.configuration.price || 0) * duration
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className={styles.checkout__summaryItem}>
                  <span className={styles.checkout__summaryLabel}>
                    Duration
                  </span>
                  <span className={styles.checkout__summaryValue}>
                    {duration} month{duration !== 1 ? "s" : ""}
                  </span>
                </div>

                {discount.amount > 0 && (
                  <div className={styles.checkout__discountRow}>
                    <span className={styles.checkout__discountLabel}>
                      <Gift size={16} />
                      Subscription Discount ({discount.savingsPercentage}%)
                    </span>
                    <span className={styles.checkout__discountValue}>
                      -₦{discount.amount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className={styles.checkout__totalSection}>
                  <div className={styles.checkout__totalRow}>
                    <div className={styles.checkout__totalLabelGroup}>
                      <span className={styles.checkout__totalLabel}>
                        Total Amount
                      </span>
                      <span className={styles.checkout__totalSublabel}>
                        ₦{Math.round(total / duration).toLocaleString()}
                        /month
                      </span>
                    </div>
                    <span className={styles.checkout__totalAmount}>
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <FnButton
                  variant="primary"
                  size="lg"
                  className={styles.checkout__checkoutBtn}
                  onClick={onConfirmCheckout}
                  disabled={isCreatingSubscription}
                  fullWidth
                >
                  {isCreatingSubscription ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Loader size={18} />
                      </motion.div>
                      <span>Creating Subscription...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} />
                      <span>Proceed to Payment</span>
                      <ArrowLeft
                        size={18}
                        style={{ transform: "rotate(180deg)" }}
                      />
                    </>
                  )}
                </FnButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
