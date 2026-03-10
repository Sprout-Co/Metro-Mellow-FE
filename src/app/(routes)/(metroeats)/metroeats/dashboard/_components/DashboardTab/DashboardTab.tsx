"use client";

import React from "react";
import {
  ArrowRight,
  UtensilsCrossed,
  Package,
  Clock,
  RefreshCw,
  ChefHat,
  Truck,
  CheckCircle2,
  Receipt,
} from "lucide-react";
import { MealOrderStatus } from "@/graphql/api";
import type { GetMealOrdersQuery } from "@/graphql/api";
import {
  fmt,
  formatOrderDate,
  orderDisplayId,
  statusLabel,
  progressForStatus,
  getStatusBadgeClass,
  ACTIVE_STATUSES,
  type OrderItem,
  type MealOrder,
} from "../../utils";
import styles from "../../dashboard.module.scss";

interface DashboardTabProps {
  activeOrder: MealOrder | null;
  ordersLoading: boolean;
  recentOrders: MealOrder[];
  onSeeAllFavorites: () => void;
  onReorder: (items: OrderItem[]) => void;
}

const STEP_ICONS = [CheckCircle2, ChefHat, Truck, Package];

export default function DashboardTab({
  activeOrder,
  ordersLoading,
  recentOrders,
  onSeeAllFavorites,
  onReorder,
}: DashboardTabProps) {
  const order = activeOrder;
  const progress = order ? progressForStatus(order.mealOrderStatus) : 0;
  const isDelivered =
    order?.mealOrderStatus === MealOrderStatus.Delivered ||
    order?.mealOrderStatus === MealOrderStatus.Received;

  const pastOrders = recentOrders.filter(
    (o) => !ACTIVE_STATUSES.includes(o.mealOrderStatus),
  );

  return (
    <div className={styles.section}>
      {/* Current Order Section */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Current Order</h2>
        </div>

        {order ? (
          <div className={styles.trackingWidget}>
            <div className={styles.trackingWidgetGlow} />
            <div className={styles.trackingContent}>
              <div className={styles.trackingHeader}>
                <div className={styles.trackingBadge}>
                  <Clock size={14} />
                  <span>Live Tracking</span>
                </div>
                <span className={styles.trackingOrderIdInline}>
                  {orderDisplayId(order.id)}
                </span>
              </div>

              <h2 className={styles.trackingStatus}>
                {statusLabel(order.mealOrderStatus)}
              </h2>
              <p className={styles.trackingEta}>
                {isDelivered ? (
                  <>Your order has been delivered</>
                ) : (
                  <>
                    Estimated arrival <strong>soon</strong>
                  </>
                )}
              </p>

              <div className={styles.progressTrack}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className={styles.progressSteps}>
                  {["Confirmed", "Preparing", "On the way", "Delivered"].map(
                    (step, i) => {
                      const Icon = STEP_ICONS[i];
                      const isActive =
                        i === 3 ? isDelivered : progress >= (i + 1) * 25;
                      return (
                        <div
                          key={step}
                          className={`${styles.progressStep} ${isActive ? styles.progressStepActive : ""}`}
                        >
                          <div className={styles.progressStepIcon}>
                            <Icon size={14} />
                          </div>
                          <span>{step}</span>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              <div className={styles.trackingDetails}>
                <div className={styles.trackingMeta}>
                  <div className={styles.trackingMetaItem}>
                    <Receipt size={14} />
                    <span>{fmt(order.totalPrice)}</span>
                  </div>
                  <div className={styles.trackingMetaItem}>
                    <Clock size={14} />
                    <span>{formatOrderDate(order.createdAt)}</span>
                  </div>
                </div>
                <div className={styles.trackingItems}>
                  {order.items.map((item, idx) => (
                    <span key={idx} className={styles.trackingItemChip}>
                      {item.quantity}x {item.meal.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCard}>
            <div className={styles.emptyIcon}>
              <UtensilsCrossed size={32} />
            </div>
            <h3 className={styles.emptyTitle}>No active orders</h3>
            <p className={styles.emptyText}>
              Ready for something delicious? Browse our menu and place your
              first order.
            </p>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={onSeeAllFavorites}
            >
              Browse Menu
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* Past Orders Section */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Past Orders</h2>
          {pastOrders.length > 3 && (
            <button className={styles.sectionLink} onClick={onSeeAllFavorites}>
              View All <ArrowRight size={14} />
            </button>
          )}
        </div>

        {ordersLoading ? (
          <div className={styles.orderCards}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.orderCardSkeleton}>
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLineShort} />
              </div>
            ))}
          </div>
        ) : pastOrders.length === 0 ? (
          <div className={styles.emptyCardSmall}>
            <Package size={24} className={styles.emptyIconSmall} />
            <p>No past orders yet. Your order history will appear here.</p>
          </div>
        ) : (
          <div className={styles.orderCards}>
            {pastOrders.slice(0, 5).map((ord) => (
              <div className={styles.orderCard} key={ord.id}>
                <div className={styles.orderCardHeader}>
                  <span className={styles.orderCardId}>
                    {orderDisplayId(ord.id)}
                  </span>
                  <span
                    className={`${styles.badge} ${getStatusBadgeClass(ord.mealOrderStatus, styles)}`}
                  >
                    {statusLabel(ord.mealOrderStatus)}
                  </span>
                </div>

                <div className={styles.orderCardItems}>
                  {ord.items.slice(0, 2).map((item, idx) => (
                    <span key={idx}>
                      {item.quantity}x {item.meal.name}
                    </span>
                  ))}
                  {ord.items.length > 2 && (
                    <span className={styles.orderCardMore}>
                      +{ord.items.length - 2} more
                    </span>
                  )}
                </div>

                <div className={styles.orderCardFooter}>
                  <div className={styles.orderCardMeta}>
                    <span className={styles.orderCardTotal}>
                      {fmt(ord.totalPrice)}
                    </span>
                    <span className={styles.orderCardDate}>
                      {formatOrderDate(ord.createdAt)}
                    </span>
                  </div>
                  <button
                    className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                    onClick={() => onReorder(ord.items)}
                  >
                    <RefreshCw size={14} />
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
