"use client";

import React from "react";
import { ArrowRight, Plus } from "lucide-react";
import { MealOrderStatus } from "@/graphql/api";
import type { GetMealsQuery, GetMealOrdersQuery } from "@/graphql/api";
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

type Meal = GetMealsQuery["meals"][0];

interface DashboardTabProps {
  activeOrder: MealOrder | null;
  meals: Meal[];
  mealsLoading: boolean;
  ordersLoading: boolean;
  recentOrders: MealOrder[];
  onSeeAllFavorites: () => void;
  onTrackToast: (message: string) => void;
  onReorder: (items: OrderItem[]) => void;
  onQuickOrder: (mealId: string, name: string, price: number, image?: string) => void;
}

export default function DashboardTab({
  activeOrder,
  meals,
  mealsLoading,
  ordersLoading,
  recentOrders,
  onSeeAllFavorites,
  onTrackToast,
  onReorder,
  onQuickOrder,
}: DashboardTabProps) {
  const order = activeOrder;
  const progress = order ? progressForStatus(order.mealOrderStatus) : 0;
  const isDelivered =
    order?.mealOrderStatus === MealOrderStatus.Delivered ||
    order?.mealOrderStatus === MealOrderStatus.Received;

  return (
    <div className={styles.section}>
      {order && (
        <div className={styles.trackingWidget}>
          <div className={styles.trackingWidgetGlow} />
          <div className={styles.trackingContent}>
            <h2 className={styles.trackingStatus}>
              {statusLabel(order.mealOrderStatus)}
            </h2>
            <p className={styles.trackingEta}>
              {isDelivered ? (
                <strong>Delivered</strong>
              ) : (
                <>
                  Estimated arrival <strong>soon</strong>
                </>
              )}
            </p>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles.progressSteps}>
              {["Accepted", "Preparing", "Out for Delivery", "Delivered"].map(
                (step, i) => (
                  <span
                    key={step}
                    className={
                      (i === 3 ? isDelivered : progress >= (i + 1) * 25)
                        ? styles.progressStepActive
                        : ""
                    }
                  >
                    {step}
                  </span>
                ),
              )}
            </div>
            <div className={styles.trackingDetails}>
              <div>
                <p className={styles.trackingOrderId}>
                  Order {orderDisplayId(order.id)}
                </p>
                <p className={styles.trackingOrderItems}>
                  {order.items
                    .map(
                      (i) =>
                        `${i.quantity}x ${i.meal.name}${i.extras?.length ? " + extras" : ""}`,
                    )
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Quick Reorder</h2>
          <button className={styles.sectionLink} onClick={onSeeAllFavorites}>
            See All <ArrowRight size={14} />
          </button>
        </div>
        {mealsLoading ? (
          <p className={styles.empty}>Loading meals...</p>
        ) : meals.length === 0 ? (
          <p className={styles.empty}>No meals available.</p>
        ) : (
          <div className={styles.mealGrid}>
            {meals.slice(0, 6).map((meal) => {
              const price = meal.pricePlate ?? meal.priceBowl ?? 0;
              return (
                <article className={styles.mealCard} key={meal.id}>
                  <div className={styles.mealCardImg}>
                    <img
                      src={
                        meal.image ||
                        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"
                      }
                      alt={meal.name}
                    />
                  </div>
                  <div className={styles.mealCardBody}>
                    <h3 className={styles.mealCardName}>{meal.name}</h3>
                    <div className={styles.mealCardPrice}>{fmt(price)}</div>
                    <div className={styles.mealCardAction}>
                      <button
                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm} ${styles.btnFull}`}
                        onClick={() =>
                          onQuickOrder(meal.id, meal.name, price, meal.image)
                        }
                      >
                        <Plus size={16} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
        </div>
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
            {recentOrders.slice(0, 5).map((ord) => {
              const isActive = ACTIVE_STATUSES.includes(ord.mealOrderStatus);
              return (
                <div className={styles.orderRow} key={ord.id}>
                  <span className={`${styles.orderCell} ${styles.orderCellId}`}>
                    {orderDisplayId(ord.id)}
                  </span>
                  <span className={`${styles.orderCell} ${styles.orderCellDate}`}>
                    {formatOrderDate(ord.createdAt)}
                  </span>
                  <span className={`${styles.orderCell} ${styles.orderCellTotal}`}>
                    {fmt(ord.totalPrice)}
                  </span>
                  <span className={`${styles.orderCell} ${styles.orderCellStatus}`}>
                    <span
                      className={`${styles.badge} ${getStatusBadgeClass(ord.mealOrderStatus, styles)}`}
                    >
                      {statusLabel(ord.mealOrderStatus)}
                    </span>
                  </span>
                  <span className={`${styles.orderCell} ${styles.orderCellAction}`}>
                    {isActive ? (
                      <button
                        className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                        onClick={() =>
                          onTrackToast("Viewing active order above")
                        }
                      >
                        Track
                      </button>
                    ) : (
                      <button
                        className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
                        onClick={() => onReorder(ord.items)}
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
      </section>
    </div>
  );
}
