"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import styles from "./MealCard.module.scss";

type MealCardProps = {
  name: string;
  description: string;
  priceLabel: string;
  image?: string | null;
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
  tag,
  onCustomize,
  onAddToCart,
}: MealCardProps) {
  return (
    <div className={styles.mealCard}>
      <div className={styles.mealCard__image}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? name}
            fill
            sizes={imageSizes}
            className={styles.mealCard__img}
          />
        ) : (
          <span className={styles.mealCard__emoji}>🍽</span>
        )}

        {(badge || tag) && (
          <div className={styles.mealCard__badges}>
            {badge && <span className={styles.mealCard__badgeMain}>{badge}</span>}
            {tag && <span className={styles.mealCard__badgeTag}>{tag}</span>}
          </div>
        )}
      </div>

      <div className={styles.mealCard__body}>
        <div className={styles.mealCard__head}>
          <h3 className={styles.mealCard__name}>{name}</h3>
        </div>

        <p className={styles.mealCard__desc}>{description}</p>

        <div className={styles.mealCard__meta}>
          <span className={styles.mealCard__price}>{priceLabel}</span>
        </div>

        <div className={styles.mealCard__actions}>
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
        </div>
      </div>
    </div>
  );
}

