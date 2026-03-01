"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import styles from "./menu.module.scss";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  servings: string;
  eta: string;
  tag?: string;
}

const plateMeals: Meal[] = [
  {
    id: "p1",
    name: "Mighty Jollof",
    description:
      "Smoky party-style jollof rice paired with any protein of your choice",
    price: 8000,
    emoji: "🍛",
    category: "rice",
    servings: "1 Serving",
    eta: "45 minutes",
    tag: "Bestseller",
  },
  {
    id: "p2",
    name: "Mama's Fried Rice",
    description:
      "Our signature take on the beloved Nigerian fried rice — savoury, colourful, and packed with home-style flavour",
    price: 8000,
    emoji: "🍚",
    category: "rice",
    servings: "1 Serving",
    eta: "45 minutes",
  },
  {
    id: "p3",
    name: "Ofada Flame",
    description:
      "Spicy ofada sauce paired with any rice/protein choice of yours and some extras",
    price: 7500,
    emoji: "🍛",
    category: "rice",
    servings: "1 Serving",
    eta: "45 minutes",
  },
  {
    id: "p4",
    name: "Coconut Rice & Shrimp",
    description:
      "Fragrant coconut rice loaded with juicy shrimp. A comforting favourite for seafood lovers",
    price: 9000,
    emoji: "🍤",
    category: "rice",
    servings: "1 Serving",
    eta: "45 minutes",
    tag: "Bestseller",
  },
  {
    id: "p5",
    name: "Rodo Pasta",
    description:
      "Spicy red pasta tossed in a bold pepper mix that brings just the right amount of heat",
    price: 7500,
    emoji: "🍝",
    category: "pasta",
    servings: "1 Serving",
    eta: "40 minutes",
  },
  {
    id: "p6",
    name: "Stir-Fry Noodles",
    description: "Wok-tossed noodles with vegetables and chicken strips",
    price: 7000,
    emoji: "🍜",
    category: "pasta",
    servings: "1 Serving",
    eta: "40 minutes",
  },
  {
    id: "p7",
    name: "Lagos Pottage",
    description:
      "Traditional yam and sweet pottage paired with any protein of your choice",
    price: 7000,
    emoji: "🥘",
    category: "pottage",
    servings: "1 Serving",
    eta: "1 hour",
  },
  {
    id: "p8",
    name: "Beans & Plantain",
    description:
      "Honey beans served with fried plantain and protein of your choice",
    price: 6500,
    emoji: "🫘",
    category: "beans",
    servings: "1 Serving",
    eta: "45 minutes",
  },
  {
    id: "p9",
    name: "Soups & Swallow",
    description:
      "Choose your swallow and soup combo. Amala, eba, pounded yam with egusi, ewedu, ogbono or okra",
    price: 8500,
    emoji: "🍲",
    category: "swallows",
    servings: "1 Serving",
    eta: "1 hour",
    tag: "Bestseller",
  },
  {
    id: "p10",
    name: "Grilled Chicken Salad",
    description:
      "Mixed greens, grilled chicken breast, avocado, and vinaigrette",
    price: 7000,
    emoji: "🥗",
    category: "healthy",
    servings: "1 Serving",
    eta: "30 minutes",
  },
  {
    id: "p11",
    name: "Smoothie Bowl",
    description: "Acai, banana, granola, mixed berries, and chia seeds",
    price: 5500,
    emoji: "🫐",
    category: "healthy",
    servings: "1 Serving",
    eta: "20 minutes",
  },
  {
    id: "p12",
    name: "Chicken Wrap Bowl",
    description: "Brown rice, grilled chicken, beans, peppers, and guac",
    price: 7500,
    emoji: "🌯",
    category: "healthy",
    servings: "1 Serving",
    eta: "35 minutes",
  },
];

const bucketMeals: Meal[] = [
  {
    id: "b1",
    name: "Mighty Jollof",
    description:
      "Smoky party-style jollof rice bucket — perfect for sharing or stocking up",
    price: 16500,
    emoji: "🍛",
    category: "rice",
    servings: "6 Servings, 2 Litres",
    eta: "2 hours",
    tag: "Bestseller",
  },
  {
    id: "b2",
    name: "Fried Rice Bucket",
    description:
      "Veggie-loaded fried rice in a family-size bucket. Great for events",
    price: 16500,
    emoji: "🍚",
    category: "rice",
    servings: "6 Servings, 2 Litres",
    eta: "2 hours",
  },
  {
    id: "b3",
    name: "Coconut Rice & Shrimp",
    description:
      "Fragrant coconut rice with shrimp, family-size. Rich and flavourful",
    price: 22000,
    emoji: "🍤",
    category: "rice",
    servings: "6 Servings, 2 Litres",
    eta: "2 hours",
  },
  {
    id: "b4",
    name: "Ofada Rice & Sauce",
    description:
      "Classic ofada rice with our signature spicy sauce, in bucket size",
    price: 16000,
    emoji: "🍛",
    category: "rice",
    servings: "6 Servings, 2 Litres",
    eta: "2 hours",
    tag: "Bestseller",
  },
  {
    id: "b5",
    name: "Rodo Pasta Bucket",
    description:
      "Spicy red pasta bucket — bold pepper mix with the right amount of heat",
    price: 14000,
    emoji: "🍝",
    category: "pasta",
    servings: "6 Servings, 2 Litres",
    eta: "1.5 hours",
  },
  {
    id: "b6",
    name: "Lagos Pottage",
    description:
      "Traditional yam pottage with vegetables and spices, hearty and nutritious",
    price: 14000,
    emoji: "🥘",
    category: "pottage",
    servings: "6 Servings, 2 Litres",
    eta: "1.5 hours",
  },
  {
    id: "b7",
    name: "Egusi Soup",
    description:
      "A West African favourite that features melon seeds with a unique flavour profile",
    price: 18500,
    emoji: "🍲",
    category: "soups",
    servings: "6 Servings, 2 Litres",
    eta: "2 hours",
  },
  {
    id: "b8",
    name: "Efo Riro",
    description:
      "Yoruba delicacy that's as tasty as it is colourful. This spinach stew is rich and flavourful",
    price: 19000,
    emoji: "🥬",
    category: "soups",
    servings: "6 Servings, 2 Litres",
    eta: "2 hours",
  },
  {
    id: "b9",
    name: "Chicken Stew",
    description:
      "Rich tomato stew with generous chicken pieces and vegetable oil base",
    price: 38500,
    emoji: "🍗",
    category: "soups",
    servings: "Chicken x10",
    eta: "2 hours",
    tag: "Bestseller",
  },
  {
    id: "b10",
    name: "Party Protein",
    description:
      "Assorted protein mix with turkey, chicken, and peppered sauce",
    price: 32000,
    emoji: "🥩",
    category: "protein",
    servings: "Turkey x6, Chicken x6",
    eta: "2 hours",
  },
  {
    id: "b11",
    name: "Afang Soup",
    description:
      "Traditional Efik delicacy with afang leaves and water leaves — rich and hearty",
    price: 14500,
    emoji: "🍲",
    category: "soups",
    servings: "6 Servings, 2 Litres",
    eta: "2 hours",
  },
  {
    id: "b12",
    name: "Ogbono Soup",
    description:
      "Draw soup with ogbono seeds, assorted meat and stockfish — silky and satisfying",
    price: 16000,
    emoji: "🫕",
    category: "soups",
    servings: "6 Servings, 2 Litres",
    eta: "2 hours",
  },
];

const plateCategories = [
  "All",
  "Rice",
  "Pasta",
  "Pottage",
  "Beans",
  "Swallows",
  "Healthy",
];
const bucketCategories = [
  "All",
  "Rice",
  "Pasta",
  "Pottage",
  "Soups",
  "Protein",
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

function MenuContent() {
  const searchParams = useSearchParams();
  const initialTab =
    searchParams.get("tab") === "buckets" ? "buckets" : "plates";
  const { addItem, openCart, openCustomize, cartCount, cartTotal } =
    useMetroEatsCart();

  const [activeTab, setActiveTab] = useState<"plates" | "buckets">(initialTab);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const meals = activeTab === "plates" ? plateMeals : bucketMeals;
  const categories =
    activeTab === "plates" ? plateCategories : bucketCategories;

  const filtered = useMemo(() => {
    let result = meals;
    if (activeCategory !== "All") {
      result = result.filter(
        (m) => m.category.toLowerCase() === activeCategory.toLowerCase(),
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q),
      );
    }
    return result;
  }, [meals, activeCategory, search]);

  const handleTabSwitch = (tab: "plates" | "buckets") => {
    setActiveTab(tab);
    setActiveCategory("All");
    setSearch("");
  };

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
              className={`${styles.menu__tab} ${activeTab === "buckets" ? styles["menu__tab--active"] : ""}`}
              onClick={() => handleTabSwitch("buckets")}
            >
              Buckets
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
              placeholder={`Search ${activeTab === "plates" ? "Plates" : "Buckets"}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <h2 className={styles.menu__sectionHeading}>Prepare to crave</h2>
        <p className={styles.menu__sectionSub}>
          Plates and buckets — pick your category below
        </p>

        <div className={styles.menu__categoryStrip}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.menu__categoryBtn} ${activeCategory === cat ? styles["menu__categoryBtn--active"] : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div className={styles.menu__grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((meal) => (
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
                  <span className={styles.menu__cardEmoji}>{meal.emoji}</span>
                  {meal.tag && (
                    <span className={styles.menu__cardTag}>🔥 {meal.tag}</span>
                  )}
                </div>
                <div className={styles.menu__cardBody}>
                  <div className={styles.menu__cardHead}>
                    <h3 className={styles.menu__cardName}>{meal.name}</h3>
                    <span className={styles.menu__servingBadge}>
                      {meal.servings}
                    </span>
                  </div>
                  <p className={styles.menu__cardDesc}>{meal.description}</p>
                  <div className={styles.menu__cardMeta}>
                    <span className={styles.menu__cardPrice}>
                      {fmt(meal.price)}
                    </span>
                    <span className={styles.menu__cardEta}>
                      ETA: {meal.eta}
                    </span>
                  </div>
                  <div className={styles.menu__cardActions}>
                    <button
                      type="button"
                      className={styles.menu__viewBtn}
                      onClick={() =>
                        openCustomize(meal.id, meal.name, meal.price)
                      }
                    >
                      Customize
                    </button>
                    <button
                      type="button"
                      className={styles.menu__addCartBtn}
                      onClick={() => addItem(meal.id, meal.name, meal.price, 1)}
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
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
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
