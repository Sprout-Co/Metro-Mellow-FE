"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./metroeats.module.scss";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "chicken", name: "Chicken", icon: "🍗" },
  { id: "sides", name: "Sides", icon: "🍟" },
  { id: "drinks", name: "Drinks", icon: "🥤" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
];

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with melted cheese, lettuce, tomato, and our secret sauce",
    price: 2500,
    image: "/images/metroeats/burger.jpg",
    category: "burgers",
    popular: true,
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description:
      "Hand-tossed crust topped with premium pepperoni and mozzarella",
    price: 4500,
    image: "/images/metroeats/pizza.jpg",
    category: "pizza",
    popular: true,
  },
  {
    id: "3",
    name: "Crispy Fried Chicken",
    description: "Golden-fried chicken pieces with our signature spice blend",
    price: 3200,
    image: "/images/metroeats/chicken.jpg",
    category: "chicken",
    popular: true,
  },
  {
    id: "4",
    name: "Loaded Fries",
    description:
      "Crispy fries topped with cheese sauce, bacon bits, and green onions",
    price: 1500,
    image: "/images/metroeats/fries.jpg",
    category: "sides",
  },
  {
    id: "5",
    name: "Chocolate Milkshake",
    description: "Creamy chocolate milkshake made with real ice cream",
    price: 1200,
    image: "/images/metroeats/milkshake.jpg",
    category: "drinks",
  },
  {
    id: "6",
    name: "Apple Pie",
    description: "Warm apple pie with cinnamon and vanilla ice cream",
    price: 1800,
    image: "/images/metroeats/pie.jpg",
    category: "desserts",
  },
  {
    id: "7",
    name: "Double Bacon Burger",
    description: "Two beef patties with crispy bacon, cheese, and BBQ sauce",
    price: 3500,
    image: "/images/metroeats/bacon-burger.jpg",
    category: "burgers",
  },
  {
    id: "8",
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, and basil on a thin crust",
    price: 3800,
    image: "/images/metroeats/margherita.jpg",
    category: "pizza",
  },
];

const features = [
  {
    icon: "⚡",
    title: "Fast Delivery",
    description: "Get your food delivered in 30 minutes or less",
  },
  {
    icon: "🌟",
    title: "Quality Ingredients",
    description: "Fresh, locally-sourced ingredients in every meal",
  },
  {
    icon: "💰",
    title: "Best Prices",
    description: "Affordable meals without compromising on taste",
  },
  {
    icon: "📱",
    title: "Easy Ordering",
    description: "Order with just a few taps on your phone",
  },
];

export default function MetroEatsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.item.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce(
    (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
    0,
  );

  const cartItemCount = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className={styles.metroeats}>
      {/* MetroEats brand nav (yellow bar + white logo) */}
      <nav className={styles.nav}>
        <div className={styles.nav__inner}>
          <Link href="/metroeats" className={styles.nav__logoLink}>
            <Image
              src="/brand/metroeats/brand-logo/inline/white-on-yellow-inline.svg"
              alt="MetroEats"
              width={180}
              height={40}
              className={styles.nav__logo}
              priority
            />
          </Link>
          <div className={styles.nav__links}>
            <Link href="#menu">Menu</Link>
            <Link href="#features">Why MetroEats</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__background}>
          <div className={styles.hero__overlay} />
        </div>
        <div className={styles.hero__content}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.hero__text}
          >
            <span className={styles.hero__badge}>🔥 Now Delivering</span>
            <h1 className={styles.hero__title}>
              Delicious Food,
              <br />
              <span className={styles.hero__titleHighlight}>
                Delivered Fast
              </span>
            </h1>
            <p className={styles.hero__subtitle}>
              From juicy burgers to crispy chicken, get your favorite fast food
              delivered right to your doorstep in 30 minutes or less.
            </p>
            <div className={styles.hero__actions}>
              <Link href="#menu" className={styles.hero__cta}>
                Order Now
              </Link>
              <Link href="#features" className={styles.hero__ctaSecondary}>
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.hero__imageWrapper}
          >
            <div className={styles.hero__imageContainer}>
              <div className={styles.hero__imagePlaceholder}>
                <span>🍔</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.features__container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.features__header}
          >
            <h2 className={styles.features__title}>Why Choose MetroEats?</h2>
            <p className={styles.features__subtitle}>
              We're committed to bringing you the best fast food experience
            </p>
          </motion.div>
          <div className={styles.features__grid}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.featureCard}
              >
                <span className={styles.featureCard__icon}>{feature.icon}</span>
                <h3 className={styles.featureCard__title}>{feature.title}</h3>
                <p className={styles.featureCard__description}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className={styles.menu}>
        <div className={styles.menu__container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.menu__header}
          >
            <h2 className={styles.menu__title}>Our Menu</h2>
            <p className={styles.menu__subtitle}>
              Explore our delicious selection of fast food favorites
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className={styles.categories}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id
                    ? styles["categoryButton--active"]
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className={styles.categoryButton__icon}>
                  {category.icon}
                </span>
                <span className={styles.categoryButton__name}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className={styles.menuGrid}>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={styles.menuCard}
              >
                <div className={styles.menuCard__imageWrapper}>
                  <div className={styles.menuCard__imagePlaceholder}>
                    {item.category === "burgers" && "🍔"}
                    {item.category === "pizza" && "🍕"}
                    {item.category === "chicken" && "🍗"}
                    {item.category === "sides" && "🍟"}
                    {item.category === "drinks" && "🥤"}
                    {item.category === "desserts" && "🍰"}
                  </div>
                  {item.popular && (
                    <span className={styles.menuCard__badge}>Popular</span>
                  )}
                </div>
                <div className={styles.menuCard__content}>
                  <h3 className={styles.menuCard__name}>{item.name}</h3>
                  <p className={styles.menuCard__description}>
                    {item.description}
                  </p>
                  <div className={styles.menuCard__footer}>
                    <span className={styles.menuCard__price}>
                      {formatPrice(item.price)}
                    </span>
                    <button
                      className={styles.menuCard__addButton}
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.cta__container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.cta__content}
          >
            <h2 className={styles.cta__title}>Ready to Order?</h2>
            <p className={styles.cta__subtitle}>
              Download our app or order online for the fastest delivery
              experience
            </p>
            <div className={styles.cta__buttons}>
              <Link href="/get-started" className={styles.cta__button}>
                Get Started
              </Link>
              <Link
                href="/contact"
                className={`${styles.cta__button} ${styles["cta__button--secondary"]}`}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Cart */}
      {cartItemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.floatingCart}
        >
          <div className={styles.floatingCart__info}>
            <span className={styles.floatingCart__count}>
              {cartItemCount} item{cartItemCount > 1 ? "s" : ""}
            </span>
            <span className={styles.floatingCart__total}>
              {formatPrice(cartTotal)}
            </span>
          </div>
          <button className={styles.floatingCart__button}>View Cart</button>
        </motion.div>
      )}
    </div>
  );
}
