"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import styles from "./MealCard.module.scss";
import { truncateText } from "@/utils/string";

type MealCardProps = {
  name: string;
  description: string;
  priceLabel: string;
  image: string;
  imageAlt?: string;
  imageSizes?: string;
  badge?: string;
  tag?: string;
  onCustomize: () => void;
  onAddToCart: () => void;
};

export default function MealCard({
  name,
  description,
  priceLabel,
  image,
  imageAlt,
  imageSizes = "(max-width: 768px) 50vw, 200px",
  badge,
  onCustomize,
  onAddToCart,
}: MealCardProps) {
  return (
    <div className={styles.mealCard} onClick={onCustomize}>
      <div className={styles.mealCard__image}>
        <Image
          src={image}
          alt={imageAlt ?? name}
          fill
          sizes={imageSizes}
          className={styles.mealCard__img}
        />

        <div className={styles.mealCard__badges}>
          {badge && (
            <span className={styles.mealCard__badges_main}>{badge}</span>
          )}
        </div>
      </div>

      <div className={styles.mealCard__body}>
        <div className={styles.mealCard__head}>
          <h2 className={styles.mealCard__name}>{name}</h2>
        </div>

        <p className={styles.mealCard__desc}>
          {truncateText(description, 100)}
        </p>

        <div className={styles.mealCard__meta}>
          <h4 className={styles.mealCard__price}>{priceLabel}</h4>
        </div>

        {/* <div className={styles.mealCard__actions}>
          <button
            type="button"
            className={styles.mealCard__customizeBtn}
            onClick={onCustomize}
          >
            Customize
          </button>
          <button
            type="button"
            className={styles.mealCard__addBtn}
            onClick={onAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div> */}
      </div>
    </div>
  );
}
