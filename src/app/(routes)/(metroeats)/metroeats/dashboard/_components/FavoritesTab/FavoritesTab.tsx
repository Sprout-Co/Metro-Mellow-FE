"use client";

import React from "react";
import { Plus } from "lucide-react";
import type { GetMealsQuery } from "@/graphql/api";
import { fmt } from "../../utils";
import styles from "../../dashboard.module.scss";

type Meal = GetMealsQuery["meals"][0];

interface FavoritesTabProps {
  meals: Meal[];
  mealsLoading: boolean;
  onQuickOrder: (mealId: string, name: string, price: number, image?: string) => void;
}

export default function FavoritesTab({
  meals,
  mealsLoading,
  onQuickOrder,
}: FavoritesTabProps) {
  return (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__section-header"]}>
        <h2 className={styles["dashboard-page__section-header-title"]}>
          Meals You Might Like
        </h2>
      </div>
      {mealsLoading ? (
        <p className={styles["dashboard-page__empty"]}>Loading…</p>
      ) : (
        <div className={styles["dashboard-page__quick-order-grid"]}>
          {meals.slice(0, 12).map((meal) => {
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
                  <Plus size={18} /> Add to Cart
                </button>
              </article>
            );
          })}
        </div>
      )}
      {!mealsLoading && meals.length === 0 && (
        <p className={styles["dashboard-page__empty"]}>No meals available.</p>
      )}
    </div>
  );
}
