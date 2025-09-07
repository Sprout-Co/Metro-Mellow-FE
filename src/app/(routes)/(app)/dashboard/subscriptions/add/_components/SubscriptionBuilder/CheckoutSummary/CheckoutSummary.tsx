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
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "date",
    "address",
    "services",
  ]);
  const currentUser = useSelector(selectCurrentUser);

  const getServiceIcon = (category: string) => {
    const iconProps = { size: 24, strokeWidth: 1.5 };
    switch (category) {
      case "CLEANING":
        return <Home {...iconProps} />;
      case "LAUNDRY":
        return <Droplets {...iconProps} />;
      case "COOKING":
        return <Utensils {...iconProps} />;
      case "PEST_CONTROL":
        return <Bug {...iconProps} />;
      default:
        return <Package {...iconProps} />;
    }
  };

  const getServiceCategoryClass = (category: string) => {
    switch (category) {
      case "CLEANING":
        return styles["checkout__serviceCard--cleaning"];
      case "LAUNDRY":
        return styles["checkout__serviceCard--laundry"];
      case "COOKING":
        return styles["checkout__serviceCard--cooking"];
      case "PEST_CONTROL":
        return styles["checkout__serviceCard--pest"];
      default:
        return "";
    }
  };

  const calculateSubtotal = () => {
    return configuredServices.reduce(
      (sum, cs) => sum + (cs.configuration.price || 0),
      0
    );
  };

  const calculateDiscount = () => {
    const monthlyTotal = calculateSubtotal();
    const savingsPercentage =
      duration >= 12 ? 30 : duration >= 6 ? 20 : duration >= 3 ? 10 : 0;
    return Math.round(monthlyTotal * (savingsPercentage / 100) * duration);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal() * duration;
    const discount = calculateDiscount();
    return subtotal - discount;
  };

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
          <button onClick={onBack} className={styles.checkout__backBtn}>
            <ArrowLeft size={20} />
            Back to Builder
          </button>
        </div>

        {/* Main Content Grid */}
        <div className={styles.checkout__body}>
          <div className={styles.checkout__main}>
            {/* Start Date Card */}
            <motion.div
              className={styles.checkout__infoCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.checkout__cardHeader}>
                <div className={styles.checkout__cardIcon}>
                  <Calendar size={20} />
                </div>
                <div className={styles.checkout__cardTitle}>
                  <h3>Service Start Date</h3>
                  <p>When would you like your services to begin?</p>
                </div>
              </div>
              <div className={styles.checkout__cardContent}>
                <div className={styles.checkout__selectedInfo}>
                  <div className={styles.checkout__selectedIcon}>
                    <Calendar size={20} />
                  </div>
                  <div className={styles.checkout__selectedText}>
                    <h4>Selected Date</h4>
                    <p>{startDate ? formatDate(startDate) : "Select a date"}</p>
                  </div>
                </div>

                <div className={styles.checkout__datePickerContainer}>
                  <input
                    type="date"
                    value={
                      startDate ? startDate.toISOString().split("T")[0] : ""
                    }
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      onStartDateChange(newDate);
                    }}
                    min={new Date().toISOString().split("T")[0]}
                    className={styles.checkout__datePicker}
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Service Address Card */}
            <motion.div
              className={styles.checkout__infoCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.checkout__cardHeader}>
                <div className={styles.checkout__cardIcon}>
                  <MapPin size={20} />
                </div>
                <div className={styles.checkout__cardTitle}>
                  <h3>Service Address</h3>
                  <p>Where should we deliver the services?</p>
                </div>
              </div>
              <div className={styles.checkout__cardContent}>
                <div className={styles.checkout__selectedInfo}>
                  <div className={styles.checkout__selectedIcon}>
                    <Home size={20} />
                  </div>
                  <div className={styles.checkout__selectedText}>
                    <h4>
                      {selectedAddress?.label ||
                        currentUser?.defaultAddress?.label ||
                        "Address"}
                      {!selectedAddress &&
                        currentUser?.defaultAddress?.isDefault &&
                        " (Default)"}
                    </h4>
                    <p>
                      {selectedAddress
                        ? formatAddress(selectedAddress)
                        : currentUser?.defaultAddress
                          ? formatAddress(currentUser.defaultAddress)
                          : "No address selected"}
                    </p>
                  </div>
                </div>

                {/* Address Selector */}
                <div className={styles.checkout__addressSelectorContainer}>
                  {currentUser?.addresses &&
                    currentUser.addresses.length > 0 && (
                      <div className={styles.checkout__addressGrid}>
                        {currentUser.addresses.map((address) => {
                          if (!address) return null;
                          return (
                            <div
                              key={address.id || "address-" + Math.random()}
                              className={`${styles.checkout__addressCard} ${
                                selectedAddress?.id === address.id
                                  ? styles.checkout__addressCard_selected
                                  : ""
                              }`}
                              onClick={() => onAddressChange(address)}
                            >
                              <div className={styles.checkout__addressCardIcon}>
                                <Home size={18} />
                              </div>
                              <div
                                className={styles.checkout__addressCardContent}
                              >
                                <h4
                                  className={styles.checkout__addressCardTitle}
                                >
                                  {address.label || "Address"}
                                  {address.isDefault && (
                                    <span
                                      className={
                                        styles.checkout__addressDefaultBadge
                                      }
                                    >
                                      Default
                                    </span>
                                  )}
                                </h4>
                                <p className={styles.checkout__addressCardText}>
                                  {address
                                    ? formatAddress(address)
                                    : "No address details"}
                                </p>
                              </div>
                              {selectedAddress?.id === address.id && (
                                <div
                                  className={styles.checkout__addressCardCheck}
                                >
                                  <Check size={16} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                </div>
              </div>
            </motion.div>

            {/* Services Overview */}
            <motion.div
              className={styles.checkout__infoCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.checkout__cardHeader}>
                <div className={styles.checkout__cardIcon}>
                  <Sparkles size={20} />
                </div>
                <div className={styles.checkout__cardTitle}>
                  <h3>Your Selected Services</h3>
                  <p>
                    {configuredServices.length} services configured for your
                    subscription
                  </p>
                </div>
              </div>
              <div className={styles.checkout__cardContent}>
                <div className={styles.checkout__servicesGrid}>
                  {configuredServices.map((cs, index) => (
                    <motion.div
                      key={cs.service._id}
                      className={`${styles.checkout__serviceCard} ${getServiceCategoryClass(cs.service.category)}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className={styles.checkout__serviceHeader}>
                        <div className={styles.checkout__serviceIcon}>
                          {getServiceIcon(cs.service.category)}
                        </div>
                        <div className={styles.checkout__serviceInfo}>
                          <h4>{cs.service.name}</h4>
                          <span className={styles.checkout__serviceBadge}>
                            {cs.service.category.replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>

                      <div className={styles.checkout__serviceDetails}>
                        <div className={styles.checkout__detailItem}>
                          <span className={styles.checkout__detailLabel}>
                            Frequency
                          </span>
                          <span className={styles.checkout__detailValue}>
                            {getFrequencyLabel(cs.configuration.frequency)}
                          </span>
                        </div>
                        <div className={styles.checkout__detailItem}>
                          <span className={styles.checkout__detailLabel}>
                            Days
                          </span>
                          <span className={styles.checkout__detailValue}>
                            {getDaysOfWeek(
                              cs.configuration.scheduledDays || []
                            )}
                          </span>
                        </div>
                        <div className={styles.checkout__detailItem}>
                          <span className={styles.checkout__detailLabel}>
                            Time
                          </span>
                          <span className={styles.checkout__detailValue}>
                            {getTimeSlotLabel(
                              cs.configuration.preferredTimeSlot
                            )}
                          </span>
                        </div>
                      </div>

                      <div className={styles.checkout__servicePrice}>
                        <span className={styles.checkout__priceLabel}>
                          Monthly Rate
                        </span>
                        <span className={styles.checkout__priceValue}>
                          ₦{(cs.configuration.price || 0).toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
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

                {calculateDiscount() > 0 && (
                  <div className={styles.checkout__discountRow}>
                    <span className={styles.checkout__discountLabel}>
                      <Gift size={16} />
                      Subscription Discount (
                      {duration >= 12 ? 30 : duration >= 6 ? 20 : 10}%)
                    </span>
                    <span className={styles.checkout__discountValue}>
                      -₦{calculateDiscount().toLocaleString()}
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
                        ₦
                        {Math.round(
                          calculateTotal() / duration
                        ).toLocaleString()}
                        /month
                      </span>
                    </div>
                    <span className={styles.checkout__totalAmount}>
                      ₦{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <motion.button
                  className={styles.checkout__checkoutBtn}
                  onClick={onConfirmCheckout}
                  disabled={isCreatingSubscription}
                  whileHover={!isCreatingSubscription ? { scale: 1.02 } : {}}
                  whileTap={!isCreatingSubscription ? { scale: 0.98 } : {}}
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
                      <span>Complete Subscription</span>
                      <ArrowLeft
                        size={18}
                        style={{ transform: "rotate(180deg)" }}
                      />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
