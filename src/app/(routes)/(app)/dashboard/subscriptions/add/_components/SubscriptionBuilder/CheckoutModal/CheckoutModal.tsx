// src/app/(routes)/(site)/bookings/_components/SubscriptionBuilder/CheckoutModal/CheckoutModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Calendar,
  Clock,
  CreditCard,
  MapPin,
  TrendingDown,
  Shield,
  Check,
  Info,
  ChevronRight,
  Sparkles,
  Home,
  Droplets,
  Utensils,
  Bug,
  Package,
  Truck,
  Gift,
  Award,
} from "lucide-react";
import styles from "./CheckoutModal.module.scss";
import Modal from "@/components/ui/Modal/Modal";
import { BillingCycle } from "@/graphql/api";
import { DurationType } from "../SubscriptionBuilder";

interface ConfiguredService {
  service: any;
  configuration: any;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  configuredServices: ConfiguredService[];
  billingCycle: BillingCycle;
  duration: DurationType;
  onConfirmCheckout: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  configuredServices,
  billingCycle,
  duration,
  onConfirmCheckout,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>("services");

  const getServiceIcon = (category: string) => {
    const iconProps = { size: 20, strokeWidth: 1.5 };
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

  const getFrequencyDescription = (frequency: string) => {
    switch (frequency) {
      case "WEEKLY":
        return "Every week on selected days";
      case "BI_WEEKLY":
        return "Every two weeks on selected days";
      case "MONTHLY":
        return "Once a month on selected days";
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

  const getTimeSlotDescription = (timeSlot: string) => {
    switch (timeSlot) {
      case "MORNING":
        return "8:00 AM - 12:00 PM";
      case "AFTERNOON":
        return "12:00 PM - 4:00 PM";
      case "EVENING":
        return "4:00 PM - 8:00 PM";
      default:
        return timeSlot;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className={styles.checkout}>
        {/* Header */}
        <div className={styles.checkout__header}>
          <div className={styles.checkout__headerContent}>
            <div className={styles.checkout__headerIcon}>
              <ShoppingCart size={24} />
            </div>
            <div>
              <h2 className={styles.checkout__title}>
                Complete Your Subscription
              </h2>
              <p className={styles.checkout__subtitle}>
                Review your subscription details before checkout
              </p>
            </div>
          </div>
          <button onClick={onClose} className={styles.checkout__closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Main Content */}
        <div className={styles.checkout__body}>
          <div className={styles.checkout__main}>
            {/* Services Breakdown */}
            <motion.section
              className={styles.checkout__section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div
                className={styles.checkout__sectionHeader}
                onClick={() =>
                  setActiveSection(
                    activeSection === "services" ? null : "services"
                  )
                }
              >
                <div className={styles.checkout__sectionTitle}>
                  <Package size={20} />
                  <h3>Selected Services ({configuredServices.length})</h3>
                </div>
                <ChevronRight
                  className={`${styles.checkout__sectionToggle} ${
                    activeSection === "services"
                      ? styles["checkout__sectionToggle--active"]
                      : ""
                  }`}
                  size={20}
                />
              </div>

              <AnimatePresence>
                {activeSection === "services" && (
                  <motion.div
                    className={styles.checkout__sectionContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {configuredServices.map((cs, index) => (
                      <div key={index} className={styles.checkout__serviceCard}>
                        <div className={styles.checkout__serviceHeader}>
                          <div className={styles.checkout__serviceIcon}>
                            {getServiceIcon(cs.service.category)}
                          </div>
                          <div className={styles.checkout__serviceInfo}>
                            <h4>{cs.service.name}</h4>
                            <p>{cs.service.description}</p>
                          </div>
                        </div>
                        <div className={styles.checkout__serviceDetails}>
                          <div className={styles.checkout__serviceDetail}>
                            <Calendar size={14} />
                            <span>
                              {cs.configuration.frequency?.replace(/_/g, " ")}
                            </span>
                          </div>
                          <div className={styles.checkout__serviceDetail}>
                            <Clock size={14} />
                            <span>
                              {getDaysOfWeek(
                                cs.configuration.scheduledDays || []
                              )}
                            </span>
                          </div>
                          {cs.configuration.preferredTimeSlot && (
                            <div className={styles.checkout__serviceDetail}>
                              <Clock size={14} />
                              <span>
                                {getTimeSlotDescription(
                                  cs.configuration.preferredTimeSlot
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className={styles.checkout__servicePrice}>
                          <span>Monthly</span>
                          <strong>
                            ₦{(cs.configuration.price || 0).toLocaleString()}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Delivery Schedule */}
            <motion.section
              className={styles.checkout__section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className={styles.checkout__sectionHeader}
                onClick={() =>
                  setActiveSection(
                    activeSection === "delivery" ? null : "delivery"
                  )
                }
              >
                <div className={styles.checkout__sectionTitle}>
                  <Truck size={20} />
                  <h3>Service Delivery Schedule</h3>
                </div>
                <ChevronRight
                  className={`${styles.checkout__sectionToggle} ${
                    activeSection === "delivery"
                      ? styles["checkout__sectionToggle--active"]
                      : ""
                  }`}
                  size={20}
                />
              </div>

              <AnimatePresence>
                {activeSection === "delivery" && (
                  <motion.div
                    className={styles.checkout__sectionContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className={styles.checkout__deliveryInfo}>
                      <div className={styles.checkout__deliveryItem}>
                        <div className={styles.checkout__deliveryIcon}>
                          <MapPin size={16} />
                        </div>
                        <div>
                          <h5>Service Location</h5>
                          <p>
                            Your registered address will be used for all
                            services
                          </p>
                        </div>
                      </div>
                      <div className={styles.checkout__deliveryItem}>
                        <div className={styles.checkout__deliveryIcon}>
                          <Calendar size={16} />
                        </div>
                        <div>
                          <h5>Service Start Date</h5>
                          <p>
                            Your first service will begin within 48 hours of
                            subscription
                          </p>
                        </div>
                      </div>
                      <div className={styles.checkout__deliveryItem}>
                        <div className={styles.checkout__deliveryIcon}>
                          <Clock size={16} />
                        </div>
                        <div>
                          <h5>Service Windows</h5>
                          <p>
                            Our team will arrive within your selected time slots
                          </p>
                        </div>
                      </div>
                      <div className={styles.checkout__deliveryItem}>
                        <div className={styles.checkout__deliveryIcon}>
                          <Shield size={16} />
                        </div>
                        <div>
                          <h5>Service Guarantee</h5>
                          <p>100% satisfaction guarantee or your money back</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Benefits & Perks */}
            <motion.section
              className={styles.checkout__section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div
                className={styles.checkout__sectionHeader}
                onClick={() =>
                  setActiveSection(
                    activeSection === "benefits" ? null : "benefits"
                  )
                }
              >
                <div className={styles.checkout__sectionTitle}>
                  <Gift size={20} />
                  <h3>Subscription Benefits</h3>
                </div>
                <ChevronRight
                  className={`${styles.checkout__sectionToggle} ${
                    activeSection === "benefits"
                      ? styles["checkout__sectionToggle--active"]
                      : ""
                  }`}
                  size={20}
                />
              </div>

              <AnimatePresence>
                {activeSection === "benefits" && (
                  <motion.div
                    className={styles.checkout__sectionContent}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className={styles.checkout__benefits}>
                      <div className={styles.checkout__benefit}>
                        <Award size={16} />
                        <div>
                          <h5>Priority Booking</h5>
                          <p>Get first access to appointment slots</p>
                        </div>
                      </div>
                      <div className={styles.checkout__benefit}>
                        <TrendingDown size={16} />
                        <div>
                          <h5>Locked-in Pricing</h5>
                          <p>Your rates won't increase during subscription</p>
                        </div>
                      </div>
                      <div className={styles.checkout__benefit}>
                        <Sparkles size={16} />
                        <div>
                          <h5>Loyalty Rewards</h5>
                          <p>Earn points for free services and upgrades</p>
                        </div>
                      </div>
                      <div className={styles.checkout__benefit}>
                        <Shield size={16} />
                        <div>
                          <h5>Flexible Cancellation</h5>
                          <p>Cancel anytime after commitment period</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          </div>

          {/* Sidebar - Pricing Summary */}
          <div className={styles.checkout__sidebar}>
            <div className={styles.checkout__summary}>
              <h3 className={styles.checkout__summaryTitle}>Order Summary</h3>

              {/* Pricing Breakdown */}
              <div className={styles.checkout__priceBreakdown}>
                <div className={styles.checkout__priceRow}>
                  <span>Services Subtotal</span>
                  <span>
                    ₦{(calculateSubtotal() * duration).toLocaleString()}
                  </span>
                </div>

                {calculateDiscount() > 0 && (
                  <div
                    className={`${styles.checkout__priceRow} ${styles["checkout__priceRow--discount"]}`}
                  >
                    <span>
                      <Gift size={14} />
                      Subscription Discount
                    </span>
                    <span>-₦{calculateDiscount().toLocaleString()}</span>
                  </div>
                )}

                <div className={styles.checkout__priceDivider} />

                <div className={styles.checkout__priceTotal}>
                  <div>
                    <span>Total Amount</span>
                    <small>
                      ₦
                      {Math.round(calculateTotal() / duration).toLocaleString()}
                      /month
                    </small>
                  </div>
                  <strong>₦{calculateTotal().toLocaleString()}</strong>
                </div>
              </div>

              {/* Billing Info */}
              <div className={styles.checkout__billingInfo}>
                <div className={styles.checkout__billingItem}>
                  <Calendar size={16} />
                  <span>Billing: {billingCycle}</span>
                </div>
                <div className={styles.checkout__billingItem}>
                  <Clock size={16} />
                  <span>Duration: {duration} months</span>
                </div>
                <div className={styles.checkout__billingItem}>
                  <CreditCard size={16} />
                  <span>Payment: Due on subscription</span>
                </div>
              </div>

              {/* Terms */}
              <div className={styles.checkout__terms}>
                <p>
                  <Info size={14} />
                  By completing this purchase, you agree to our terms of service
                  and subscription policy.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className={styles.checkout__actions}>
                <motion.button
                  className={styles.checkout__confirmBtn}
                  onClick={onConfirmCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CreditCard size={18} />
                  Complete Subscription
                </motion.button>
                <button
                  className={styles.checkout__cancelBtn}
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
