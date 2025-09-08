// src/app/(routes)/(site)/services/food/_components/FoodMenuSection/FoodMenuSection.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./FoodMenuSection.module.scss";
import FoodMenuModal from "../FoodMenuModal/FoodMenuModal";
import { ArrowRight, Clock, Star, TruckIcon, ChefHat } from "lucide-react";
import { GetServicesQuery } from "@/graphql/api";
import { Button } from "@/components/ui/Button";

interface FoodMenuSectionProps {
  servicesData?: GetServicesQuery["services"];
  loading?: boolean;
  error?: any;
}

const FoodMenuSection: React.FC<FoodMenuSectionProps> = ({
  servicesData,
  loading,
  error,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const categories = [
    {
      id: 1,
      name: "Nigerian Classics",
      emoji: "🍛",
      description: "Traditional favorites",
      count: "25+ dishes",
      color: "#FEF3C7",
    },
    {
      id: 2,
      name: "Continental",
      emoji: "🍝",
      description: "International cuisines",
      count: "30+ dishes",
      color: "#FEE2E2",
    },
    {
      id: 3,
      name: "Fast Food",
      emoji: "🍔",
      description: "Quick bites",
      count: "20+ options",
      color: "#E0E7FF",
    },
    {
      id: 4,
      name: "Desserts",
      emoji: "🍰",
      description: "Sweet treats",
      count: "15+ items",
      color: "#F0FDF4",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.section__container}>
        {/* Header */}
        <motion.div
          className={styles.section__header}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.section__title}>
            Delicious Food
            <span className={styles.section__titleAccent}>
              {" "}
              Delivered Fresh
            </span>
          </h2>
          <p className={styles.section__subtitle}>
            Browse our extensive menu of freshly prepared meals from top-rated
            local chefs
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className={styles.section__categories}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={styles.section__category}
              variants={cardVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              onClick={openModal}
              style={{ backgroundColor: category.color }}
            >
              <div className={styles.section__categoryIcon}>
                {category.emoji}
              </div>
              <h3 className={styles.section__categoryName}>{category.name}</h3>
              <p className={styles.section__categoryDesc}>
                {category.description}
              </p>
              <span className={styles.section__categoryCount}>
                {category.count}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.section__cta}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={openModal}
            variant="secondary"
            // className={styles.section__ctaButton}
            size="lg"
            animation="bounce"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className={styles.section__ctaIcon} />
          </Button>
        </motion.div>
      </div>

      <FoodMenuModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default FoodMenuSection;
