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
  ArrowLeft,
  CalendarDays,
  Timer,
  Star,
  Users,
  Zap,
} from "lucide-react";
import styles from "./CheckoutSummary.module.scss";
import { BillingCycle } from "@/graphql/api";
import { DurationType } from "../SubscriptionBuilder";

interface ConfiguredService {
  service: any;
  configuration: any;
}

interface CheckoutSummary {
  configuredServices: ConfiguredService[];
  billingCycle: BillingCycle;
  duration: DurationType;
  onBack: () => void;
  onConfirmCheckout: () => void;
}

interface StartDatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const CheckoutSummary: React.FC<CheckoutSummary> = ({
  configuredServices,
  billingCycle,
  duration,
  onBack,
  onConfirmCheckout,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>("services");
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      options.push(date);
    }
    return options;
  };

  const getServiceCategoryDetails = (category: string) => {
    switch (category) {
      case "CLEANING":
        return {
          icon: <Home size={20} />,
          color: "#3B82F6",
          features: ["Professional equipment", "Eco-friendly products", "Quality guarantee"]
        };
      case "LAUNDRY":
        return {
          icon: <Droplets size={20} />,
          color: "#06B6D4",
          features: ["Pick up & delivery", "Premium detergents", "Fabric care expertise"]
        };
      case "COOKING":
        return {
          icon: <Utensils size={20} />,
          color: "#F59E0B",
          features: ["Custom meal plans", "Fresh ingredients", "Dietary accommodations"]
        };
      case "PEST_CONTROL":
        return {
          icon: <Bug size={20} />,
          color: "#EF4444",
          features: ["Safe treatments", "Prevention strategies", "Follow-up inspections"]
        };
      default:
        return {
          icon: <Package size={20} />,
          color: "#6B7280",
          features: ["Professional service", "Quality assurance", "Customer support"]
        };
    }
  };

  return (
    <div className={styles.checkout}>
      {/* Header */}
      <div className={styles.checkout__header}>
        <button onClick={onBack} className={styles.checkout__backBtn}>
          <ArrowLeft size={20} />
          <span>Back to Builder</span>
        </button>
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
      </div>

      {/* Main Content */}
      <div className={styles.checkout__body}>
        <div className={styles.checkout__main}>
          {/* Start Date Selection */}
          <motion.section
            className={styles.checkout__section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className={styles.checkout__sectionHeader}>
              <div className={styles.checkout__sectionTitle}>
                <CalendarDays size={20} />
                <h3>Choose Your Start Date</h3>
              </div>
            </div>
            <div className={styles.checkout__sectionContent}>
              <div className={styles.checkout__datePickerContainer}>
                <div className={styles.checkout__selectedDate}>
                  <Calendar size={18} />
                  <div>
                    <h4>Service Start Date</h4>
                    <p>{startDate ? formatDate(startDate) : 'Select a date'}</p>
                  </div>
                  <button 
                    className={styles.checkout__changeDateBtn}
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                  >
                    Change
                  </button>
                </div>
                <AnimatePresence>
                  {isDatePickerOpen && (
                    <motion.div
                      className={styles.checkout__datePicker}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.checkout__dateGrid}>
                        {generateDateOptions().map((date, index) => (
                          <motion.button
                            key={date.toISOString()}
                            className={`${styles.checkout__dateOption} ${
                              startDate && startDate.toDateString() === date.toDateString()
                                ? styles["checkout__dateOption--selected"]
                                : ""
                            }`}
                            onClick={() => {
                              setStartDate(date);
                              setIsDatePickerOpen(false);
                            }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                          >
                            <span className={styles.checkout__dateDay}>
                              {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </span>
                            <span className={styles.checkout__dateNumber}>
                              {date.getDate()}
                            </span>
                            <span className={styles.checkout__dateMonth}>
                              {date.toLocaleDateString('en-US', { month: 'short' })}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>

          {/* Enhanced Services Breakdown */}
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
                <Sparkles size={20} />
                <h3>Your Selected Services ({configuredServices.length})</h3>
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
                  {configuredServices.map((cs, index) => {
                    const categoryDetails = getServiceCategoryDetails(cs.service.category);
                    return (
                      <motion.div 
                        key={index} 
                        className={styles.checkout__enhancedServiceCard}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={styles.checkout__serviceHeader}>
                          <div 
                            className={styles.checkout__serviceIcon}
                            style={{ background: `${categoryDetails.color}15`, color: categoryDetails.color }}
                          >
                            {categoryDetails.icon}
                          </div>
                          <div className={styles.checkout__serviceInfo}>
                            <div className={styles.checkout__serviceTitleRow}>
                              <h4>{cs.service.name}</h4>
                              <span className={styles.checkout__serviceCategory}>
                                {cs.service.category.replace('_', ' ')}
                              </span>
                            </div>
                            <p>{cs.service.description}</p>
                          </div>
                          <div className={styles.checkout__servicePrice}>
                            <span>Monthly</span>
                            <strong style={{ color: categoryDetails.color }}>
                              ₦{(cs.configuration.price || 0).toLocaleString()}
                            </strong>
                          </div>
                        </div>
                        
                        <div className={styles.checkout__serviceFeatures}>
                          {categoryDetails.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className={styles.checkout__serviceFeature}>
                              <Check size={14} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className={styles.checkout__serviceSchedule}>
                          <div className={styles.checkout__scheduleDetail}>
                            <Timer size={16} />
                            <div>
                              <span className={styles.checkout__scheduleLabel}>Frequency:</span>
                              <span className={styles.checkout__scheduleValue}>
                                {cs.configuration.frequency?.replace(/_/g, " ")}
                              </span>
                            </div>
                          </div>
                          <div className={styles.checkout__scheduleDetail}>
                            <Calendar size={16} />
                            <div>
                              <span className={styles.checkout__scheduleLabel}>Days:</span>
                              <span className={styles.checkout__scheduleValue}>
                                {getDaysOfWeek(cs.configuration.scheduledDays || [])}
                              </span>
                            </div>
                          </div>
                          {cs.configuration.preferredTimeSlot && (
                            <div className={styles.checkout__scheduleDetail}>
                              <Clock size={16} />
                              <div>
                                <span className={styles.checkout__scheduleLabel}>Time:</span>
                                <span className={styles.checkout__scheduleValue}>
                                  {getTimeSlotDescription(cs.configuration.preferredTimeSlot)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Enhanced Service Details & What's Included */}
          <motion.section
            className={styles.checkout__section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div
              className={styles.checkout__sectionHeader}
              onClick={() =>
                setActiveSection(
                  activeSection === "details" ? null : "details"
                )
              }
            >
              <div className={styles.checkout__sectionTitle}>
                <Star size={20} />
                <h3>What's Included in Your Plan</h3>
              </div>
              <ChevronRight
                className={`${styles.checkout__sectionToggle} ${
                  activeSection === "details"
                    ? styles["checkout__sectionToggle--active"]
                    : ""
                }`}
                size={20}
              />
            </div>

            <AnimatePresence>
              {activeSection === "details" && (
                <motion.div
                  className={styles.checkout__sectionContent}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className={styles.checkout__inclusionsGrid}>
                    <div className={styles.checkout__inclusionCard}>
                      <div className={styles.checkout__inclusionIcon}>
                        <Users size={18} />
                      </div>
                      <div>
                        <h5>Professional Staff</h5>
                        <p>Trained, vetted, and insured service professionals</p>
                      </div>
                    </div>
                    <div className={styles.checkout__inclusionCard}>
                      <div className={styles.checkout__inclusionIcon}>
                        <Zap size={18} />
                      </div>
                      <div>
                        <h5>Premium Equipment</h5>
                        <p>Latest tools and eco-friendly supplies included</p>
                      </div>
                    </div>
                    <div className={styles.checkout__inclusionCard}>
                      <div className={styles.checkout__inclusionIcon}>
                        <Shield size={18} />
                      </div>
                      <div>
                        <h5>100% Guarantee</h5>
                        <p>Satisfaction guaranteed or we'll make it right</p>
                      </div>
                    </div>
                    <div className={styles.checkout__inclusionCard}>
                      <div className={styles.checkout__inclusionIcon}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h5>Flexible Locations</h5>
                        <p>Service at your registered address or location of choice</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.checkout__serviceTimeline}>
                    <h5 className={styles.checkout__timelineTitle}>Your Service Journey</h5>
                    <div className={styles.checkout__timelineSteps}>
                      <div className={styles.checkout__timelineStep}>
                        <div className={styles.checkout__timelineNumber}>1</div>
                        <div>
                          <h6>Confirmation</h6>
                          <p>Instant booking confirmation and team assignment</p>
                        </div>
                      </div>
                      <div className={styles.checkout__timelineStep}>
                        <div className={styles.checkout__timelineNumber}>2</div>
                        <div>
                          <h6>First Service</h6>
                          <p>Service starts on {startDate ? formatDate(startDate) : 'your selected date'}</p>
                        </div>
                      </div>
                      <div className={styles.checkout__timelineStep}>
                        <div className={styles.checkout__timelineNumber}>3</div>
                        <div>
                          <h6>Regular Schedule</h6>
                          <p>Ongoing service based on your selected frequency</p>
                        </div>
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
                    ₦{Math.round(calculateTotal() / duration).toLocaleString()}
                    /month
                  </small>
                </div>
                <strong>₦{calculateTotal().toLocaleString()}</strong>
              </div>
            </div>

            {/* Enhanced Billing Info */}
            <div className={styles.checkout__billingInfo}>
              <div className={styles.checkout__billingItem}>
                <CalendarDays size={16} />
                <div>
                  <span className={styles.checkout__billingLabel}>Start Date:</span>
                  <span className={styles.checkout__billingValue}>
                    {startDate ? startDate.toLocaleDateString() : 'Not selected'}
                  </span>
                </div>
              </div>
              <div className={styles.checkout__billingItem}>
                <Calendar size={16} />
                <div>
                  <span className={styles.checkout__billingLabel}>Billing:</span>
                  <span className={styles.checkout__billingValue}>{billingCycle}</span>
                </div>
              </div>
              <div className={styles.checkout__billingItem}>
                <Clock size={16} />
                <div>
                  <span className={styles.checkout__billingLabel}>Duration:</span>
                  <span className={styles.checkout__billingValue}>{duration} months</span>
                </div>
              </div>
              <div className={styles.checkout__billingItem}>
                <CreditCard size={16} />
                <div>
                  <span className={styles.checkout__billingLabel}>Payment:</span>
                  <span className={styles.checkout__billingValue}>Secure online payment</span>
                </div>
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
              <button className={styles.checkout__cancelBtn} onClick={onBack}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
