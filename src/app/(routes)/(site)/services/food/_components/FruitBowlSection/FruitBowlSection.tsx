"use client";
import React from "react";
import Image from "next/image";
import styles from "./FruitBowlSection.module.scss";

const FruitBowlSection = () => {
  return (
    <section className={styles.fruitBowlSection}>
      <div className={styles.fruitBowlSection__container}>
        <Image
          src="/images/food/food-svg.png"
          alt="Fruit bowl illustration"
          width={500}
          height={500}
          className={styles.fruitBowlSection__image}
          priority
        />
      </div>
    </section>
  );
};

export default FruitBowlSection; 