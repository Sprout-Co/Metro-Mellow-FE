"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  useGetMealsQuery,
  MealCategory,
  MealStyle,
} from "@/graphql/api";
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import styles from "./menu.module.scss";

const MEAL_CATEGORY_OPTIONS: { value: "" | MealCategory; label: string }[] = [
  { value: "", label: "All" },
  { value: MealCategory.Breakfast, label: "Breakfast" },
  { value: MealCategory.Lunch, label: "Lunch" },
  { value: MealCategory.Dinner, label: "Dinner" },
  { value: MealCategory.Snack, label: "Snack" },
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

function MenuContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "bowls" ? "bowls" : "plates";
  const { addItem, openCart, openCustomize, cartCount, cartTotal } =
    useMetroEatsCart();

  const [activeTab, setActiveTab] = useState<"plates" | "bowls">(initialTab);
  const [activeCategory, setActiveCategory] = useState<"" | MealCategory>("");
  const [search, setSearch] = useState("");

  const { data, loading, error } = useGetMealsQuery({
    variables: { category: activeCategory || undefined },
  });

  const styleFilter =
    activeTab === "plates" ? MealStyle.Plate : MealStyle.Bowl;
  const mealsByStyle = useMemo(() => {
    const list = data?.meals ?? [];
    return list.filter((m) => m.availableStyles.includes(styleFilter));
  }, [data?.meals, styleFilter]);

  const filtered = useMemo(() => {
    let result = mealsByStyle;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [mealsByStyle, search]);

  const handleTabSwitch = (tab: "plates" | "bowls") => {
    setActiveTab(tab);
    setSearch("");
  };

  const cartStyle: "PLATE" | "BOWL" =
    activeTab === "plates" ? "PLATE" : "BOWL";

  return (
    <>
      <section className={styles.menu__hero} aria-label="Menu hero">
        <div className={styles.menu__heroBackdrop} aria-hidden />
        <div className={styles.menu__heroInner}>
          <h1 className={styles.menu__heroHeadline}>
            Want Jollof? We&apos;ve Got You.
          </h1>
          <p className={styles.menu__heroTagline}>
            The place you love. The food you crave.
          </p>
        </div>
        <Image
          src="/images/food/jollof-rice.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.menu__heroImage}
          priority
        />
      </section>

      {/* <nav className={styles.menu__nav}>
        <div className={styles.menu__navInner}>
          <Link href="/metroeats" className={styles.menu__logo}>
            <Image
              src="/brand/metroeats/brand-logo/inline/white-on-yellow-inline.svg"
              alt="MetroEats"
              width={130}
              height={30}
              priority
            />
          </Link>
          <div className={styles.menu__navActions}>
            <button
              type="button"
              className={styles.menu__cartBtn}
              onClick={openCart}
              aria-label="View cart"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className={styles.menu__cartBadge}>{cartCount}</span>
              )}
            </button>
            <Link href="/metroeats" className={styles.menu__backLink}>
              ← Back
            </Link>
          </div>
        </div>
      </nav> */}

      <main className={styles.menu__main}>
        <div className={styles.menu__controls}>
          <div className={styles.menu__tabs}>
            <button
              className={`${styles.menu__tab} ${activeTab === "plates" ? styles["menu__tab--active"] : ""}`}
              onClick={() => handleTabSwitch("plates")}
            >
              Plates
            </button>
            <button
              className={`${styles.menu__tab} ${activeTab === "bowls" ? styles["menu__tab--active"] : ""}`}
              onClick={() => handleTabSwitch("bowls")}
            >
              Bowls
            </button>
          </div>

          <div className={styles.menu__searchWrap}>
            <svg
              className={styles.menu__searchIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={styles.menu__searchInput}
              placeholder={`Search ${activeTab === "plates" ? "Plates" : "Bowls"}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <h2 className={styles.menu__sectionHeading}>Prepare to crave</h2>
        <p className={styles.menu__sectionSub}>
          Plates and bowls — pick your category below
        </p>

        <div className={styles.menu__categoryStrip}>
          {MEAL_CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.value || "all"}
              className={`${styles.menu__categoryBtn} ${activeCategory === opt.value ? styles["menu__categoryBtn--active"] : ""}`}
              onClick={() => setActiveCategory(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className={styles.menu__empty}>
            <p>Loading menu…</p>
          </div>
        )}

        {error && (
          <div className={styles.menu__empty}>
            <p>Could not load menu. Please try again later.</p>
            <Link href="/metroeats">Back to MetroEats</Link>
          </div>
        )}

        {!loading && !error && (
          <motion.div className={styles.menu__grid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((meal) => {
                const price =
                  activeTab === "plates"
                    ? meal.pricePlate ?? 0
                    : meal.priceBowl ?? 0;
                return (
                  <motion.div
                    key={meal.id}
                    className={styles.menu__card}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={styles.menu__cardImage}>
                      {meal.image ? (
                        <Image
                          src={meal.image}
                          alt={meal.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 200px"
                          className={styles.menu__cardImg}
                        />
                      ) : (
                        <span className={styles.menu__cardEmoji}>🍽</span>
                      )}
                    </div>
                    <div className={styles.menu__cardBody}>
                      <div className={styles.menu__cardHead}>
                        <h3 className={styles.menu__cardName}>{meal.name}</h3>
                      </div>
                      <p className={styles.menu__cardDesc}>{meal.description}</p>
                      <div className={styles.menu__cardMeta}>
                        <span className={styles.menu__cardPrice}>
                          {fmt(price)}
                        </span>
                      </div>
                      <div className={styles.menu__cardActions}>
                        <button
                          type="button"
                          className={styles.menu__viewBtn}
                          onClick={() =>
                            openCustomize(meal.id, meal.name, price, cartStyle)
                          }
                        >
                          Customize
                        </button>
                        <button
                          type="button"
                          className={styles.menu__addCartBtn}
                          onClick={() =>
                            addItem(meal.id, meal.name, price, 1, undefined, cartStyle)
                          }
                          aria-label={`Add ${meal.name} to cart`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className={styles.menu__empty}>
            <p>Nothing here. Try a different filter or search.</p>
          </div>
        )}

        <div className={styles.menu__ctaSection}>
          <Link href="#subscribe" className={styles.menu__ctaCard}>
            <h3 className={styles.menu__ctaTitle}>
              From the big game to the big meeting, we&apos;ve got you covered.
            </h3>
            <span className={styles.menu__ctaLink}>Subscribe & save →</span>
          </Link>
        </div>
      </main>

      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            className={styles.menu__floatingCart}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className={styles.menu__floatingCartInfo}>
              <span className={styles.menu__floatingCartCount}>
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </span>
              <span className={styles.menu__floatingCartTotal}>
                {fmt(cartTotal)}
              </span>
            </div>
            <button
              type="button"
              className={styles.menu__floatingCartBtn}
              onClick={openCart}
            >
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MenuPage() {
  return (
    <React.Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <MenuContent />
    </React.Suspense>
  );
}
