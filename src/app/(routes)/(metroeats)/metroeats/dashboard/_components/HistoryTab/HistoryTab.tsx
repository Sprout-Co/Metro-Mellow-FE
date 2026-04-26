"use client";

import React from "react";
import {
  fmt,
  formatOrderDate,
  orderDisplayId,
  statusLabel,
  getStatusBadgeClass,
  ACTIVE_STATUSES,
  type OrderItem,
  type MealOrder,
} from "../../utils";
import styles from "../../dashboard.module.scss";

interface HistoryTabProps {
  ordersLoading: boolean;
  recentOrders: MealOrder[];
  onGoToDashboard: () => void;
  onReorder: (items: OrderItem[]) => void;
}

export default function HistoryTab({
  ordersLoading,
  recentOrders,
  onGoToDashboard,
  onReorder,
}: HistoryTabProps) {
  const totalSpent = recentOrders.reduce(
    (sum, order) => sum + (order.totalPrice ?? 0),
    0,
  );

  return (
    <div className={styles.section}>
      {ordersLoading ? (
        <p className={styles.empty}>Loading orders...</p>
      ) : recentOrders.length === 0 ? (
        <p className={styles.empty}>No orders yet.</p>
      ) : (
        <>
          <div className={styles.historySummary}>
            <div className={styles.historySummaryCard}>
              <span className={styles.historySummaryLabel}>Total Orders</span>
              <p className={styles.historySummaryValue}>{recentOrders.length}</p>
            </div>
            <div className={styles.historySummaryCard}>
              <span className={styles.historySummaryLabel}>Total Spend</span>
              <p className={styles.historySummaryValue}>{fmt(totalSpent)}</p>
            </div>
            <div className={styles.historySummaryCard}>
              <span className={styles.historySummaryLabel}>Active</span>
              <p className={styles.historySummaryValue}>
                {
                  recentOrders.filter((order) =>
                    ACTIVE_STATUSES.includes(order.mealOrderStatus),
                  ).length
                }
              </p>
            </div>
          </div>

          <div className={styles.historyCards}>
            {recentOrders.map((order) => {
              const isActive = ACTIVE_STATUSES.includes(order.mealOrderStatus);
              const totalItems = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0,
              );

              return (
                <article className={styles.historyCard} key={order.id}>
                  <div className={styles.historyCardTop}>
                    <div>
                      <p className={styles.historyCardId}>
                        {orderDisplayId(order.id)}
                      </p>
                      <p className={styles.historyCardDate}>
                        {formatOrderDate(order.createdAt)}
                      </p>
                    </div>
                    <div className={styles.historyCardTopRight}>
                      <span className={styles.historyCardTotal}>
                        {fmt(order.totalPrice)}
                      </span>
                      <span
                        className={`${styles.badge} ${getStatusBadgeClass(order.mealOrderStatus, styles)}`}
                      >
                        {statusLabel(order.mealOrderStatus)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.historyItems}>
                    {order.items.slice(0, 3).map((item, idx) => (
                      <span key={idx} className={styles.historyItemChip}>
                        {item.quantity}x {item.meal.name}
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className={styles.historyItemChipMuted}>
                        +{order.items.length - 3} more meals
                      </span>
                    )}
                  </div>

                  <div className={styles.historyCardBottom}>
                    <span className={styles.historyMeta}>
                      {totalItems} item{totalItems === 1 ? "" : "s"}
                    </span>
                    <span className={styles.historyMeta}>
                      {
                        order.items.reduce(
                          (sum, item) =>
                            sum +
                            (item.extras?.reduce(
                              (extraSum, extra) => extraSum + extra.quantity,
                              0,
                            ) ?? 0),
                          0,
                        )
                      }{" "}
                      extras
                    </span>
                    {isActive ? (
                      <button
                        className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                        onClick={onGoToDashboard}
                      >
                        Track
                      </button>
                    ) : (
                      <button
                        className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                        onClick={() => onReorder(order.items)}
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
