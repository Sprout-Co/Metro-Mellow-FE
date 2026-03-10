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
    <div className={styles["dashboard-page__dashboard"]}>
      {order && (
        <section className={styles["dashboard-page__tracking-widget"]}>
          <div className={styles["dashboard-page__tracking-widget-info"]}>
            <div className={styles["dashboard-page__tracking-widget-header"]}>
              <div>
                <h2 className={styles["dashboard-page__tracking-widget-status"]}>
                  {statusLabel(order.mealOrderStatus)}
                </h2>
                <p className={styles["dashboard-page__tracking-widget-eta"]}>
                  {isDelivered ? (
                    <strong>Delivered</strong>
                  ) : (
                    <>
                      Estimated arrival <strong>soon</strong>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className={styles["dashboard-page__progress-bar"]}>
              <div
                className={styles["dashboard-page__progress-bar-fill"]}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className={styles["dashboard-page__progress-steps"]}>
              <span
                className={
                  progress >= 25
                    ? styles["dashboard-page__progress-steps-step--active"]
                    : ""
                }
              >
                Accepted
              </span>
              <span
                className={
                  progress >= 50
                    ? styles["dashboard-page__progress-steps-step--active"]
                    : ""
                }
              >
                Preparing
              </span>
              <span
                className={
                  progress >= 75
                    ? styles["dashboard-page__progress-steps-step--active"]
                    : ""
                }
              >
                Out for Delivery
              </span>
              <span
                className={
                  isDelivered
                    ? styles["dashboard-page__progress-steps-step--active"]
                    : ""
                }
              >
                Delivered
              </span>
            </div>
            <div className={styles["dashboard-page__tracking-order-details"]}>
              <p className={styles["dashboard-page__tracking-order-id"]}>
                Order {orderDisplayId(order.id)}
              </p>
              <p className={styles["dashboard-page__tracking-order-items"]}>
                {order.items
                  .map(
                    (i) =>
                      `${i.quantity}x ${i.meal.name}${i.extras?.length ? ` + extras` : ""}`,
                  )
                  .join(", ")}
              </p>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className={styles["dashboard-page__section-header"]}>
          <h2 className={styles["dashboard-page__section-header-title"]}>
            Quick Reorder
          </h2>
          <button
            className={styles["dashboard-page__quick-order-link"]}
            onClick={onSeeAllFavorites}
          >
            See All <ArrowRight size={16} />
          </button>
        </div>
        {mealsLoading ? (
          <p className={styles["dashboard-page__empty"]}>Loading meals…</p>
        ) : (
          <div className={styles["dashboard-page__quick-order-grid"]}>
            {meals.slice(0, 6).map((meal) => {
              const price = meal.pricePlate ?? meal.priceBowl ?? 0;
              return (
                <article
                  className={styles["dashboard-page__meal-card"]}
                  key={meal.id}
                >
                  <div className={styles["dashboard-page__meal-card-img-wrapper"]}>
                    <img
                      src={meal.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"}
                      alt={meal.name}
                      className={styles["dashboard-page__meal-card-img"]}
                    />
                  </div>
                  <div className={styles["dashboard-page__meal-card-content"]}>
                    <h3 className={styles["dashboard-page__meal-card-title"]}>
                      {meal.name}
                    </h3>
                    <div className={styles["dashboard-page__meal-card-meta"]}>
                      <span>MetroEats</span>
                    </div>
                    <div className={styles["dashboard-page__meal-card-price"]}>
                      {fmt(price)}
                    </div>
                  </div>
                  <button
                    className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]} ${styles["dashboard-page__meal-card-action"]}`}
                    onClick={() =>
                      onQuickOrder(meal.id, meal.name, price, meal.image)
                    }
                  >
                    <Plus size={18} /> Quick Order
                  </button>
                </article>
              );
            })}
          </div>
        )}
        {!mealsLoading && meals.length === 0 && (
          <p className={styles["dashboard-page__empty"]}>No meals available.</p>
        )}
      </section>

      <section>
        <div className={styles["dashboard-page__section-header"]}>
          <h2 className={styles["dashboard-page__section-header-title"]}>
            Recent Orders
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
                {recentOrders.slice(0, 5).map((ord) => {
                  const isActive = ACTIVE_STATUSES.includes(ord.mealOrderStatus);
                  return (
                    <tr key={ord.id}>
                      <td>{orderDisplayId(ord.id)}</td>
                      <td>{formatOrderDate(ord.createdAt)}</td>
                      <td>{fmt(ord.totalPrice)}</td>
                      <td>
                        <span
                          className={`${styles["dashboard-page__status-badge"]} ${getStatusBadgeClass(ord.mealOrderStatus, styles)}`}
                        >
                          {statusLabel(ord.mealOrderStatus)}
                        </span>
                      </td>
                      <td>
                        {isActive ? (
                          <button
                            className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                            onClick={() => onTrackToast("Viewing active order above")}
                          >
                            Track
                          </button>
                        ) : (
                          <button
                            className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                            onClick={() => onReorder(ord.items)}
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
      </section>
    </div>
  );
}
