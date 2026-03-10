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
  return (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__section-header"]}>
        <h2 className={styles["dashboard-page__section-header-title"]}>
          Full Order History
        </h2>
      </div>
      {ordersLoading ? (
        <p className={styles["dashboard-page__empty"]}>Loading orders…</p>
      ) : (
        <div className={styles["dashboard-page__history-card"]}>
          <table className={styles["dashboard-page__history-table"]}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const isActive = ACTIVE_STATUSES.includes(order.mealOrderStatus);
                return (
                  <tr key={order.id}>
                    <td>{orderDisplayId(order.id)}</td>
                    <td>{formatOrderDate(order.createdAt)}</td>
                    <td>{fmt(order.totalPrice)}</td>
                    <td>
                      <span
                        className={`${styles["dashboard-page__status-badge"]} ${getStatusBadgeClass(order.mealOrderStatus, styles)}`}
                      >
                        {statusLabel(order.mealOrderStatus)}
                      </span>
                    </td>
                    <td>
                      {isActive ? (
                        <button
                          className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                          onClick={onGoToDashboard}
                        >
                          Track
                        </button>
                      ) : (
                        <button
                          className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                          onClick={() => onReorder(order.items)}
                        >
                          Reorder
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {!ordersLoading && recentOrders.length === 0 && (
        <p className={styles["dashboard-page__empty"]}>No orders yet.</p>
      )}
    </div>
  );
}
