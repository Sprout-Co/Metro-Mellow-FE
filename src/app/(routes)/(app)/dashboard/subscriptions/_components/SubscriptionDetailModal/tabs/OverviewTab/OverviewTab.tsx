import React from "react";
import {
  Package,
  CheckCircle,
  CreditCard,
  Calendar,
  MapPin,
  RefreshCw,
  Repeat,
} from "lucide-react";
import { GetCustomerSubscriptionsQuery } from "@/graphql/api";
import { calculateSubscriptionProgress } from "../../../../utils/subscriptionProgress";
import { formatDate, formatPrice } from "../types";
import styles from "./OverviewTab.module.scss";

type SubscriptionType =
  GetCustomerSubscriptionsQuery["customerSubscriptions"][0];

interface OverviewTabProps {
  subscription: SubscriptionType;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ subscription }) => {
  // Calculate subscription progress using utility function
  const calculateProgress = () => {
    if (!subscription) return 0;
    return calculateSubscriptionProgress(subscription);
  };

  return (
    <div className={styles.modal__sections}>
      <div className={styles.modal__section}>
        <h3 className={styles.modal__sectionTitle}>Overview</h3>
        <div className={styles.modal__overviewGrid}>
          <div className={styles.modal__overviewCard}>
            <div className={styles.modal__overviewCardHeader}>
              <Package size={16} />
              <span>Services</span>
            </div>
            <div className={styles.modal__overviewCardValue}>
              {subscription.subscriptionServices.length}
            </div>
          </div>
          <div className={styles.modal__overviewCard}>
            <div className={styles.modal__overviewCardHeader}>
              <CheckCircle size={16} />
              <span>Progress</span>
            </div>
            <div className={styles.modal__overviewCardValue}>
              {calculateProgress()}%
            </div>
          </div>
          <div className={styles.modal__overviewCard}>
            <div className={styles.modal__overviewCardHeader}>
              <CreditCard size={16} />
              <span>Total Price</span>
            </div>
            <div className={styles.modal__overviewCardValue}>
              {formatPrice(subscription.totalPrice)}
            </div>
          </div>
          <div className={styles.modal__overviewCard}>
            <div className={styles.modal__overviewCardHeader}>
              <Calendar size={16} />
              <span>Next Billing</span>
            </div>
            <div className={styles.modal__overviewCardValue}>
              {formatDate(subscription.nextBillingDate).split(", ")[0]}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className={styles.modal__section}>
        <h3 className={styles.modal__sectionTitle}>Quick Info</h3>
        <div className={styles.modal__info}>
          <div className={styles.modal__infoItem}>
            <MapPin size={14} />
            <div>
              <span className={styles.modal__infoLabel}>Service Address</span>
              <span className={styles.modal__infoValue}>
                {subscription.address?.street || "Address"},{" "}
                {subscription.address?.city || "City"}
              </span>
            </div>
          </div>
          <div className={styles.modal__infoItem}>
            <RefreshCw size={14} />
            <div>
              <span className={styles.modal__infoLabel}>Auto-renewal</span>
              <span className={styles.modal__infoValue}>
                {subscription.autoRenew ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
          <div className={styles.modal__infoItem}>
            <Repeat size={14} />
            <div>
              <span className={styles.modal__infoLabel}>Billing Cycle</span>
              <span className={styles.modal__infoValue}>
                {subscription.billingCycle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
