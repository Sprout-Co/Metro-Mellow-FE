"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMealsQuery, MealStyle, Meal } from "@/graphql/api";
import { useMetroEatsCart } from "../../_context/MetroEatsCartContext";
import MealCard from "../MealCard/MealCard";
import styles from "./QuickOrder.module.scss";

type QuickOrderEntry = {
  id: string;
  mealId: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  style: MealStyle;
};

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function QuickOrder() {
  const { addItem, openCart, openCustomizeMealModal } = useMetroEatsCart();
  const { data, loading, error } = useGetMealsQuery();
  const trackRef = useRef<HTMLDivElement>(null);

  const quickItems: QuickOrderEntry[] = useMemo(() => {
    if (!data?.meals) return [];

    const items: QuickOrderEntry[] = [];

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
          style: MealStyle.Plate,
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
          style: MealStyle.Bowl,
        });
      }
    });

    return items.slice(0, 8);
  }, [data?.meals]);

  const handleOrder = (item: QuickOrderEntry) => {
    addItem(
      item.mealId,
      item.name,
      item.price,
      1,
      undefined,
      item.style,
      item.image,
    );
    openCart();
  };

  const handleCustomize = (
    meal: Meal,
    selectedStyle: MealStyle,
    selectedPrice: number,
  ) => {
    openCustomizeMealModal({ ...meal, selectedStyle, selectedPrice });
  };

  const scroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const scrollAmount = 360;
    trackRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="quick-order" className={styles.quickOrder}>
      <div className={styles.quickOrder__container}>
        <div className={styles.quickOrder__header}>
          <div>
            <h2 className={styles.quickOrder__title}>Popular picks</h2>
            <p className={styles.quickOrder__subtitle}>
              Add to cart in one tap
            </p>
          </div>
          <div className={styles.quickOrder__headerRight}>
            <div className={styles.quickOrder__arrows}>
              <button
                type="button"
                className={styles.quickOrder__arrow}
                onClick={() => scroll("left")}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className={styles.quickOrder__arrow}
                onClick={() => scroll("right")}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <Link href="/metroeats/menu" className={styles.quickOrder__seeAll}>
              Full menu &rarr;
            </Link>
          </div>
        </div>

        <div className={styles.quickOrder__track} ref={trackRef}>
          {loading && (
            <p className={styles.quickOrder__msg}>Loading popular picks...</p>
          )}

          {!loading && (error || quickItems.length === 0) && (
            <p className={styles.quickOrder__msg}>
              Could not load popular picks. Please check the full menu.
            </p>
          )}

          {!loading &&
            !error &&
            quickItems.map((item) => (
              <div key={item.id} className={styles.quickOrder__card}>
                <MealCard
                  name={item.name}
                  description={item.subtitle}
                  priceLabel={fmt(item.price)}
                  image={item.image}
                  imageSizes="(max-width: 768px) 160px, 200px"
                  badge={item.style === MealStyle.Plate ? "Plates" : "Bowls"}
                  onAddToCart={() => handleOrder(item)}
                  onCustomize={() =>
                    handleCustomize(
                      data?.meals?.find(
                        (meal) => meal.id === item.mealId,
                      ) as Meal,
                      item.style,
                      item.price,
                    )
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
