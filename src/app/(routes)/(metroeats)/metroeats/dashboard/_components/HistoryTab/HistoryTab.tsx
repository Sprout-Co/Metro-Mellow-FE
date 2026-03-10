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
    <div className={styles.section}>
      {ordersLoading ? (
        <p className={styles.empty}>Loading orders...</p>
      ) : recentOrders.length === 0 ? (
        <p className={styles.empty}>No orders yet.</p>
      ) : (
        <div className={styles.orderList}>
          <div className={`${styles.orderRow} ${styles.orderRowHead}`}>
            <span>Order</span>
            <span>Date</span>
            <span>Total</span>
            <span>Status</span>
            <span />
          </div>
          {recentOrders.map((order) => {
            const isActive = ACTIVE_STATUSES.includes(order.mealOrderStatus);
            return (
              <div className={styles.orderRow} key={order.id}>
                <span className={`${styles.orderCell} ${styles.orderCellId}`}>
                  {orderDisplayId(order.id)}
                </span>
                <span className={`${styles.orderCell} ${styles.orderCellDate}`}>
                  {formatOrderDate(order.createdAt)}
                </span>
                <span className={`${styles.orderCell} ${styles.orderCellTotal}`}>
                  {fmt(order.totalPrice)}
                </span>
                <span className={`${styles.orderCell} ${styles.orderCellStatus}`}>
                  <span
                    className={`${styles.badge} ${getStatusBadgeClass(order.mealOrderStatus, styles)}`}
                  >
                    {statusLabel(order.mealOrderStatus)}
                  </span>
                </span>
                <span className={`${styles.orderCell} ${styles.orderCellAction}`}>
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
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
