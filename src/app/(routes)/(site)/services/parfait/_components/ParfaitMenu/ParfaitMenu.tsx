"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ParfaitMenu.module.scss";
import { Button } from "@/components/ui/Button/Button";

interface ParfaitItem {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  popular?: boolean;
  ingredients: string[];
}

const parfaitMenu: ParfaitItem[] = [
  {
    id: "berry-blast",
    name: "Berry Blast",
    description: "Mixed berries, Greek yogurt, honey granola",
    price: 2500,
    emoji: "🍓",
    popular: true,
    ingredients: [
      "Strawberries",
      "Blueberries",
      "Greek Yogurt",
      "Granola",
      "Honey",
    ],
  },
  {
    id: "tropical-paradise",
    name: "Tropical Paradise",
    description: "Mango, pineapple, coconut flakes, passion fruit",
    price: 2800,
    emoji: "🥭",
    ingredients: ["Mango", "Pineapple", "Coconut", "Passion Fruit", "Yogurt"],
  },
  {
    id: "chocolate-dream",
    name: "Chocolate Dream",
    description: "Dark chocolate, vanilla yogurt, crushed cookies",
    price: 2600,
    emoji: "🍫",
    ingredients: [
      "Dark Chocolate",
      "Vanilla Yogurt",
      "Oreo Cookies",
      "Whipped Cream",
    ],
  },
  {
    id: "green-goddess",
    name: "Green Goddess",
    description: "Kiwi, green apple, matcha yogurt, chia seeds",
    price: 3000,
    emoji: "🥝",
    ingredients: ["Kiwi", "Green Apple", "Matcha Yogurt", "Chia Seeds", "Mint"],
  },
  {
    id: "nutty-delight",
    name: "Nutty Delight",
    description: "Almond butter, banana, granola, walnuts",
    price: 2700,
    emoji: "🥜",
    ingredients: ["Almond Butter", "Banana", "Walnuts", "Granola", "Honey"],
  },
  {
    id: "citrus-sunrise",
    name: "Citrus Sunrise",
    description: "Orange, grapefruit, lemon yogurt, mint",
    price: 2400,
    emoji: "🍊",
    ingredients: ["Orange", "Grapefruit", "Lemon Yogurt", "Mint", "Honey"],
  },
];

const ParfaitMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="menu" className={styles["parfait-menu"]}>
      <div className={styles["parfait-menu__container"]}>
        <motion.div
          className={styles["parfait-menu__header"]}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles["parfait-menu__title"]}>
            Our Signature Parfaits
          </h2>
          <p className={styles["parfait-menu__subtitle"]}>
            Handcrafted with love, delivered with care
          </p>
        </motion.div>

        <div className={styles["parfait-menu__grid"]}>
          {parfaitMenu.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${styles["parfait-card"]} ${
                item.popular ? styles["parfait-card--popular"] : ""
              }`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              {item.popular && (
                <span className={styles["parfait-card__badge"]}>Popular</span>
              )}
              <div className={styles["parfait-card__image"]}>
                <span className={styles["parfait-card__emoji"]}>
                  {item.emoji}
                </span>
              </div>
              <div className={styles["parfait-card__content"]}>
                <h3 className={styles["parfait-card__name"]}>{item.name}</h3>
                <p className={styles["parfait-card__description"]}>
                  {item.description}
                </p>
                <div className={styles["parfait-card__ingredients"]}>
                  {item.ingredients.slice(0, 3).map((ingredient) => (
                    <span
                      key={ingredient}
                      className={styles["parfait-card__tag"]}
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
                <div className={styles["parfait-card__footer"]}>
                  <span className={styles["parfait-card__price"]}>
                    ₦{item.price.toLocaleString()}
                  </span>
                  <Button variant="primary" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParfaitMenu;
