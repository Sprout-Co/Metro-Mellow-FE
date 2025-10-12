import React from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  CreditCard,
  Calendar,
} from "lucide-react";
import {
  GetCustomerSubscriptionsQuery,
  BillingStatus,
  ServiceCategory,
} from "@/graphql/api";
import {
  getServiceIcon,
  formatDate,
  formatPrice,
  formatBillingStatusName,
  getBillingStatusColor,
} from "../types";
import styles from "./BillingTab.module.scss";

type SubscriptionType =
  GetCustomerSubscriptionsQuery["customerSubscriptions"][0];

interface BillingTabProps {
  subscription: SubscriptionType;
  subscriptionBillings: any[];
  billingStats: any;
  loadingBillings: boolean;
  billingsError: string | null;
  fetchSubscriptionBillings: () => void;
}

const BillingTab: React.FC<BillingTabProps> = ({
  subscription,
  subscriptionBillings,
  billingStats,
  loadingBillings,
  billingsError,
  fetchSubscriptionBillings,
}) => {
  return (
    <div className={styles.modal__sections}>
      {loadingBillings ? (
        <div className={styles.modal__loadingState}>
          <RefreshCw className="animate-spin" size={24} />
          <p>Loading billing information...</p>
        </div>
      ) : billingsError ? (
        <div className={styles.modal__errorState}>
          <AlertTriangle size={24} />
          <h4>Error Loading Billing Information</h4>
          <p>{billingsError}</p>
          <motion.button
            className={styles.modal__retryButton}
            onClick={fetchSubscriptionBillings}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
        </div>
      ) : (
        <>
          {/* Billing Summary Card - Greeting Card Style */}
          <div className={styles.modal__section}>
            <div className={styles.modal__billingCard}>
              <div className={styles.modal__billingCardHeader}>
                <div>
                  <h3 className={styles.modal__billingCardTitle}>
                    Subscription Billing Summary
                  </h3>
                  <p className={styles.modal__billingCardSubtitle}>
                    {subscription.billingCycle} billing • Auto-renewal{" "}
                    {subscription.autoRenew ? "enabled" : "disabled"}
                  </p>
                </div>
              </div>

              <div className={styles.modal__billingCardContent}>
                <div className={styles.modal__billingAmount}>
                  <span className={styles.modal__billingAmountLabel}>
                    Total Amount
                  </span>
                  <span className={styles.modal__billingAmountValue}>
                    {formatPrice(subscription.totalPrice)}
                    <small>/{subscription.billingCycle}</small>
                  </span>
                </div>

                {/* Billing Statistics */}
                {billingStats && (
                  <div className={styles.modal__billingStats}>
                    <div className={styles.modal__billingStatItem}>
                      <span className={styles.modal__billingStatLabel}>
                        Total Billings
                      </span>
                      <span className={styles.modal__billingStatValue}>
                        {billingStats.total}
                      </span>
                    </div>
                    <div className={styles.modal__billingStatItem}>
                      <span className={styles.modal__billingStatLabel}>
                        Paid
                      </span>
                      <span className={styles.modal__billingStatValue}>
                        {billingStats.paid}
                      </span>
                    </div>
                    <div className={styles.modal__billingStatItem}>
                      <span className={styles.modal__billingStatLabel}>
                        Pending
                      </span>
                      <span className={styles.modal__billingStatValue}>
                        {billingStats.pending}
                      </span>
                    </div>
                    <div className={styles.modal__billingStatItem}>
                      <span className={styles.modal__billingStatLabel}>
                        Failed
                      </span>
                      <span className={styles.modal__billingStatValue}>
                        {billingStats.failed}
                      </span>
                    </div>
                  </div>
                )}

                <div className={styles.modal__billingDetails}>
                  <div className={styles.modal__billingDetail}>
                    <CreditCard size={14} />
                    <div>
                      <span className={styles.modal__billingDetailLabel}>
                        Payment Method
                      </span>
                      <span className={styles.modal__billingDetailValue}>
                        {subscription.paymentMethod?.brand ||
                          "No payment method"}{" "}
                        •••• {subscription.paymentMethod?.last4 || "****"}
                      </span>
                    </div>
                  </div>

                  <div className={styles.modal__billingDetail}>
                    <Calendar size={14} />
                    <div>
                      <span className={styles.modal__billingDetailLabel}>
                        Next Billing Date
                      </span>
                      <span className={styles.modal__billingDetailValue}>
                        {formatDate(subscription.nextBillingDate)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.modal__billingDetail}>
                    <Clock size={14} />
                    <div>
                      <span className={styles.modal__billingDetailLabel}>
                        Last Payment
                      </span>
                      <span className={styles.modal__billingDetailValue}>
                        {subscription.lastBillingDate
                          ? formatDate(subscription.lastBillingDate)
                          : "No previous billing"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Breakdown */}
          <div className={styles.modal__section}>
            <h3 className={styles.modal__sectionTitle}>Service Breakdown</h3>
            <div className={styles.modal__serviceBreakdown}>
              {subscription.subscriptionServices.map((service) => (
                <div
                  key={service.id}
                  className={styles.modal__serviceBreakdownItem}
                >
                  <div className={styles.modal__serviceBreakdownIcon}>
                    {getServiceIcon(
                      service.service_category as ServiceCategory
                    )}
                  </div>
                  <div className={styles.modal__serviceBreakdownInfo}>
                    <span className={styles.modal__serviceBreakdownName}>
                      {service.service.name}
                    </span>
                    <span className={styles.modal__serviceBreakdownFreq}>
                      {service.frequency.toLowerCase().replace("_", " ")}
                    </span>
                  </div>
                  <span className={styles.modal__serviceBreakdownPrice}>
                    {formatPrice(service.price)}
                  </span>
                </div>
              ))}

              <div className={styles.modal__serviceBreakdownTotal}>
                <span>Total</span>
                <span>{formatPrice(subscription.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className={styles.modal__section}>
            <h3 className={styles.modal__sectionTitle}>Billing History</h3>
            {subscriptionBillings.length > 0 ? (
              <div className={styles.modal__billingHistory}>
                {subscriptionBillings.slice(0, 5).map((billing) => (
                  <div
                    key={billing.id}
                    className={styles.modal__billingHistoryItem}
                  >
                    <div className={styles.modal__billingHistoryIcon}>
                      {billing.status === BillingStatus.Paid ? (
                        <CheckCircle size={16} />
                      ) : billing.status === BillingStatus.Pending ? (
                        <Clock size={16} />
                      ) : billing.status === BillingStatus.Failed ? (
                        <AlertTriangle size={16} />
                      ) : (
                        <X size={16} />
                      )}
                    </div>
                    <div className={styles.modal__billingHistoryInfo}>
                      <span className={styles.modal__billingHistoryDate}>
                        {formatDate(billing.billingDate)}
                      </span>
                      <span className={styles.modal__billingHistoryAmount}>
                        {formatPrice(billing.amount)}
                      </span>
                      {billing.description && (
                        <span
                          className={styles.modal__billingHistoryDescription}
                        >
                          {billing.description}
                        </span>
                      )}
                    </div>
                    <span
                      className={styles.modal__billingHistoryStatus}
                      style={{
                        color: getBillingStatusColor(billing.status),
                      }}
                    >
                      {formatBillingStatusName(billing.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.modal__emptyState}>
                <CreditCard size={48} />
                <h4>No billing history</h4>
                <p>No billing records found for this subscription yet.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BillingTab;
