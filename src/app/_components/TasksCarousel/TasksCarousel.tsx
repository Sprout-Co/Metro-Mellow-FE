"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./TasksCarousel.module.scss";
import { Routes } from "@/constants/routes";
import SignaturePattern from "@/components/ui/SignaturePattern/SignaturePattern";

interface TaskCard {
  id: string;
  title: React.ReactNode;
  description: string;
  colorClass: string;
  icon: string;
  ctaText: string;
  route: string;
}

const taskCards: TaskCard[] = [
  {
    id: "cleaning",
    title: (
      <>
        Professional House Cleaning
        <br />
        That Actually Works
      </>
    ),
    description: "Deep cleaning, regular maintenance, and move-in services. Vetted professionals with quality supplies and satisfaction guarantee.",
    colorClass: "cleaning",
    icon: "/images/icons/cleaning-supplies.svg",
    ctaText: "Book Cleaning",
    route: Routes.SERVICES,
  },
  {
    id: "food",
    title: (
      <>
        Fresh, Nutritious Meals
        <br />
        Delivered Daily
      </>
    ),
    description: "Professional chefs prepare delicious meals from traditional Nigerian dishes to international cuisine. Fresh ingredients, delivered on time.",
    colorClass: "food",
    icon: "/images/icons/food-bowl.svg",
    ctaText: "Order Meals",
    route: Routes.SERVICES,
  },
  {
    id: "laundry",
    title: (
      <>
        Complete Laundry Service
        <br />
        Pickup to Delivery
      </>
    ),
    description: "Wash, fold, iron, and dry cleaning services. Professional care for your clothes with free pickup and delivery across Lagos.",
    colorClass: "laundry",
    icon: "/images/icons/laundry-basket.svg",
    ctaText: "Book Laundry",
    route: Routes.SERVICES,
  },
  {
    id: "pest",
    title: (
      <>
        Safe, Effective Pest Control
        <br />
        Licensed Professionals
      </>
    ),
    description: "Eco-friendly pest elimination for homes and offices. Licensed professionals with follow-up visits and warranty on all treatments.",
    colorClass: "pest",
    icon: "/images/icons/pest-spray.svg",
    ctaText: "Book Service",
    route: Routes.SERVICES,
  },
];

const TasksCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  // Determine number of visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) =>
      prev === 0 ? taskCards.length - visibleCards : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= taskCards.length - visibleCards ? 0 : prev + 1
    );
  };

  const handleIndicatorClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

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
    exit: { opacity: 0, y: -20 },
  };

  // Fallback icons (using emojis) if images aren't available
  const getIconFallback = (id: string) => {
    const icons: { [key: string]: string } = {
      cleaning: "🧹",
      food: "🍽️",
      laundry: "👔",
      pest: "🐛",
    };
    return icons[id] || "✨";
  };

  return (
    <section className={styles["tasks-carousel"]}>
      <SignaturePattern />
      <div className={styles["tasks-carousel__container"]}>
        <div className={styles["tasks-carousel__header"]}>
          <div className={styles["tasks-carousel__title-wrapper"]}>
            <motion.h2
              className={styles["tasks-carousel__title"]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Focus on What Matters <br />
              We Handle the Rest
            </motion.h2>
            <motion.p
              className={styles["tasks-carousel__subtitle"]}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Professional home services that give you back your time. From cleaning to cooking, we make your life easier with trusted, reliable service.
            </motion.p>
          </div>
          <motion.div
            className={styles["tasks-carousel__nav"]}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              className={styles["tasks-carousel__nav-btn"]}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              aria-label="Previous cards"
            >
              <ChevronLeft />
            </button>
            <button
              className={styles["tasks-carousel__nav-btn"]}
              onClick={handleNext}
              disabled={currentIndex >= taskCards.length - visibleCards}
              aria-label="Next cards"
            >
              <ChevronRight />
            </button>
          </motion.div>
        </div>

        <div className={styles["tasks-carousel__carousel-wrapper"]}>
          <motion.div
            className={styles["tasks-carousel__carousel-track"]}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {taskCards.map((card, index) => (
              <motion.div
                key={card.id}
                className={`${styles["task-card"]} ${styles[`task-card--${card.colorClass}`]}`}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={styles["task-card__content"]}>
                  <h3 className={styles["task-card__title"]}>{card.title}</h3>
                  <p className={styles["task-card__description"]}>
                    {card.description}
                  </p>
                  <button
                    className={styles["task-card__cta"]}
                    onClick={() => {
                      // Navigate to service page or open booking modal
                      console.log(`Navigate to ${card.route}`);
                    }}
                  >
                    {card.ctaText}
                  </button>
                </div>
                <div className={styles["task-card__icon-wrapper"]}>
                  {/* Use emoji as fallback for now */}
                  <div style={{ fontSize: "80px", opacity: 0.4 }}>
                    {getIconFallback(card.id)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className={styles["tasks-carousel__indicators"]}>
          {Array.from({
            length: Math.max(1, taskCards.length - visibleCards + 1),
          }).map((_, index) => (
            <button
              key={index}
              className={`${styles["tasks-carousel__indicator"]} ${
                index === currentIndex
                  ? styles["tasks-carousel__indicator--active"]
                  : ""
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TasksCarousel;
