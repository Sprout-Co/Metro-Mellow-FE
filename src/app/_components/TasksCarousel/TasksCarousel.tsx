"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import styles from "./TasksCarousel.module.scss";
import { CTAButton } from "@/components/ui/Button/CTAButton";
import { Routes } from "@/constants/routes";

interface TaskCard {
  id: string;
  category: string;
  title: string;
  description: string;
  ctaText: string;
  route: string;
  stat: string;
}

const taskCards: TaskCard[] = [
  {
    id: "metroeats",
    category: "MetroEats",
    title: "Homemade-style Nigerian meals from our cloud kitchen",
    description:
      "Order fresh MetroEats meals prepared by MetroMellow's in-house kitchen team, including dependable delivery and bulk meal options.",
    ctaText: "Order Meals",
    route: Routes.METROEATS,
    stat: "Freshly prepared and delivery-ready",
  },
  {
    id: "cleaning",
    category: "Cleaning",
    title: "Reliable cleaning for homes and workspaces",
    description:
      "Book vetted cleaning professionals for routine upkeep, deep cleaning, and move-in support with a smooth, dependable process.",
    ctaText: "Book Cleaning",
    route: "/services/cleaning",
    stat: "Fast scheduling, trusted professionals",
  },
  {
    id: "laundry",
    category: "Laundry",
    title: "Pickup to delivery laundry that saves your time",
    description:
      "Schedule collection, washing, ironing, and doorstep return so your weekly laundry stays effortless and consistent.",
    ctaText: "Schedule Laundry",
    route: "/services/laundry",
    stat: "Convenient pickup and delivery flow",
  },
];

const TasksCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taskCards.length);
    }, 9000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + taskCards.length) % taskCards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % taskCards.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  const activeCard = taskCards[currentIndex];

  return (
    <section className={styles["tasks-carousel"]}>
      <div className={styles["tasks-carousel__container"]}>
        <div className={styles["tasks-carousel__header"]}>
          <motion.h2
            className={styles["tasks-carousel__title"]}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everyday services, one clean platform
          </motion.h2>
          <motion.p
            className={styles["tasks-carousel__subtitle"]}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            MetroMellow helps you run your day smoothly with trusted cleaning,
            laundry, and MetroEats homemade meal delivery.
          </motion.p>
        </div>

        <div className={styles["tasks-carousel__spotlight"]}>
          <div className={styles["tasks-carousel__nav"]}>
            <button
              className={styles["tasks-carousel__nav-btn"]}
              onClick={handlePrevious}
              aria-label="Previous service"
            >
              <ChevronLeft />
            </button>
            <button
              className={styles["tasks-carousel__nav-btn"]}
              onClick={handleNext}
              aria-label="Next service"
            >
              <ChevronRight />
            </button>
          </div>

          <motion.div
            key={activeCard.id}
            className={styles["task-card"]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className={styles["task-card__chip"]}>
              {activeCard.category}
            </div>
            <h3 className={styles["task-card__title"]}>{activeCard.title}</h3>
            <p className={styles["task-card__description"]}>
              {activeCard.description}
            </p>
            <p className={styles["task-card__stat"]}>{activeCard.stat}</p>
            <div className={styles["task-card__actions"]}>
              <CTAButton
                href={activeCard.route}
                variant="primary"
                size="lg"
                animationType="none"
              >
                {activeCard.ctaText}
              </CTAButton>
            </div>
          </motion.div>
        </div>

        <div className={styles["tasks-carousel__indicators"]}>
          {taskCards.map((card, index) => (
            <button
              key={card.id}
              className={`${styles["tasks-carousel__indicator"]} ${
                index === currentIndex
                  ? styles["tasks-carousel__indicator--active"]
                  : ""
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Show ${card.category} service`}
            >
              {card.category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TasksCarousel;
