"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMetroEatsCart } from "../../_context/MetroEatsCartContext";
import styles from "./QuickOrder.module.scss";

interface QuickItem {
  id: string;
  mealId: string;
  name: string;
  subtitle: string;
  price: number;
  emoji: string;
  image: string;
  type: "plates" | "buckets";
  tag?: string;
}

const quickItems: QuickItem[] = [
  {
    id: "q1",
    mealId: "p1",
    name: "Mighty Jollof",
    subtitle: "Smoky party jollof",
    price: 8000,
    emoji: "🍛",
    image: "/images/food/jollof-rice.png",
    type: "plates",
    tag: "Bestseller",
  },
  {
    id: "q2",
    mealId: "p9",
    name: "Amala & Ewedu",
    subtitle: "With gbegiri & assorted",
    price: 14500,
    emoji: "🍲",
    image: "/images/food/amala-ewedu.png",
    type: "buckets",
    tag: "Bestseller",
  },
  {
    id: "q3",
    mealId: "p2",
    name: "Fried Rice & Chicken",
    subtitle: "Veggie-loaded fried rice",
    price: 7500,
    emoji: "🍚",
    image: "/images/food/f2.png",
    type: "plates",
    tag: "Bestseller",
  },
  {
    id: "q4",
    mealId: "b7",
    name: "Egusi Soup",
    subtitle: "With spinach & stockfish",
    price: 18500,
    emoji: "🥘",
    image: "/images/food/egusi-fufu.png",
    type: "buckets",
    tag: "Bestseller",
  },
  {
    id: "q5",
    mealId: "p10",
    name: "Grilled Chicken Salad",
    subtitle: "Mixed greens & avocado",
    price: 7000,
    emoji: "🥗",
    image: "/images/food/f1.png",
    type: "plates",
  },
  {
    id: "q6",
    mealId: "b4",
    name: "Ofada Rice & Sauce",
    subtitle: "Spicy ofada sauce",
    price: 16000,
    emoji: "🍛",
    image: "/images/food/pounded-yam-efo-riro.png",
    type: "buckets",
    tag: "Bestseller",
  },
];

const fmt = (n: number) => `₦${n.toLocaleString()}`;

export default function QuickOrder() {
  const { addItem, openCart, openCustomize } = useMetroEatsCart();

  const handleOrder = (item: QuickItem) => {
    addItem(item.mealId, item.name, item.price, 1);
    openCart();
  };

  const handleCustomize = (item: QuickItem) => {
    openCustomize(item.mealId, item.name, item.price);
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
          {quickItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={styles.quickOrder__card}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <div className={styles.quickOrder__cardImage}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 160px, 200px"
                  className={styles.quickOrder__cardImg}
                />
                <div className={styles.quickOrder__badges}>
                  <span className={styles.quickOrder__typeBadge}>
                    {item.type === "plates" ? "Plates" : "Buckets"}
                  </span>
                  {item.tag && (
                    <span className={styles.quickOrder__tagBadge}>
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.quickOrder__cardBody}>
                <h3 className={styles.quickOrder__cardName}>{item.name}</h3>
                <p className={styles.quickOrder__cardSub}>{item.subtitle}</p>
                <div className={styles.quickOrder__cardBottom}>
                  <span className={styles.quickOrder__cardPrice}>
                    {fmt(item.price)}
                  </span>
                </div>
                <div className={styles.quickOrder__cardActions}>
                  <button
                    type="button"
                    className={styles.quickOrder__orderBtn}
                    onClick={() => handleOrder(item)}
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className={styles.quickOrder__customizeLink}
                    onClick={() => handleCustomize(item)}
                  >
                    or Customize
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
