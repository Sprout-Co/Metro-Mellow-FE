"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGetMealsQuery, MealStyle } from "@/graphql/api";
import { useMetroEatsCart } from "../../_context/MetroEatsCartContext";
import MealCard from "../MealCard/MealCard";
import styles from "./QuickOrder.module.scss";

interface QuickItem {
  id: string;
  mealId: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  type: "plates" | "bowls";
  tag?: string;
}

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function QuickOrder() {
  const { addItem, openCart, openCustomize } = useMetroEatsCart();
  const { data, loading, error } = useGetMealsQuery();

  const quickItems: QuickItem[] = useMemo(() => {
    if (!data?.meals) return [];

    const items: QuickItem[] = [];

    data.meals.forEach((meal) => {
      if (!meal.isActive) return;

      if (meal.availableStyles.includes(MealStyle.Plate) && meal.pricePlate) {
        items.push({
          id: `${meal.id}-plate`,
          mealId: meal.id,
          name: meal.name,
          subtitle: meal.description,
          price: meal.pricePlate,
          image: meal.image ?? "/images/food/jollof-rice.png",
          type: "plates",
        });
      }

      if (meal.availableStyles.includes(MealStyle.Bowl) && meal.priceBowl) {
        items.push({
          id: `${meal.id}-bowl`,
          mealId: meal.id,
          name: meal.name,
          subtitle: meal.description,
          price: meal.priceBowl,
          image: meal.image ?? "/images/food/jollof-rice.png",
          type: "bowls",
        });
      }
    });

    const limited = items.slice(0, 8);
    return limited.map((item, index) => ({
      ...item,
      tag: index < 3 ? "Bestseller" : undefined,
    }));
  }, [data?.meals]);

  const handleOrder = (item: QuickItem) => {
    const style = item.type === "plates" ? "PLATE" : "BOWL";
    addItem(item.mealId, item.name, item.price, 1, undefined, style);
    openCart();
  };

  const handleCustomize = (item: QuickItem) => {
    const style = item.type === "plates" ? "PLATE" : "BOWL";
    openCustomize(item.mealId, item.name, item.price, style);
  };

  return (
    <section id="quick-order" className={styles.quickOrder}>
      <div className={styles.quickOrder__header}>
        <div>
          <h2 className={styles.quickOrder__title}>Popular picks</h2>
          <p className={styles.quickOrder__subtitle}>Add to cart in one tap</p>
        </div>
        <Link href="/metroeats/menu" className={styles.quickOrder__seeAll}>
          Full menu →
        </Link>
      </div>

      <div className={styles.quickOrder__scroll}>
        <div className={styles.quickOrder__track}>
          {loading && <p style={{ padding: "1rem" }}>Loading popular picks…</p>}

          {!loading && (error || quickItems.length === 0) && (
            <p style={{ padding: "1rem" }}>
              Could not load popular picks. Please check the full menu.
            </p>
          )}

          {!loading &&
            !error &&
            quickItems.length > 0 &&
            quickItems.map((item, i) => (
              <motion.div
                key={item.id}
                className={styles.quickOrder__card}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <MealCard
                  name={item.name}
                  description={item.subtitle}
                  priceLabel={fmt(item.price)}
                  image={item.image}
                  imageSizes="(max-width: 768px) 160px, 200px"
                  badge={item.type === "plates" ? "Plates" : "Bowls"}
                  tag={item.tag}
                  onAddToCart={() => handleOrder(item)}
                  onCustomize={() => handleCustomize(item)}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
