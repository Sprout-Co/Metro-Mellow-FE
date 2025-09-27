"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ParfaitBuilder.module.scss";
import { Button } from "@/components/ui/Button/Button";

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  price: number;
  category: "base" | "fruits" | "toppings" | "sauce";
  color?: string;
}

const ingredients: Ingredient[] = [
  // Base
  {
    id: "greek-yogurt",
    name: "Greek Yogurt",
    emoji: "🥛",
    price: 500,
    category: "base",
    color: "#FFF8E1",
  },
  {
    id: "vanilla-yogurt",
    name: "Vanilla Yogurt",
    emoji: "🍦",
    price: 400,
    category: "base",
    color: "#FFFACD",
  },
  {
    id: "coconut-yogurt",
    name: "Coconut Yogurt",
    emoji: "🥥",
    price: 600,
    category: "base",
    color: "#FAFAD2",
  },

  // Fruits
  {
    id: "strawberry",
    name: "Strawberry",
    emoji: "🍓",
    price: 300,
    category: "fruits",
    color: "#FFB6C1",
  },
  {
    id: "blueberry",
    name: "Blueberry",
    emoji: "🫐",
    price: 350,
    category: "fruits",
    color: "#6495ED",
  },
  {
    id: "mango",
    name: "Mango",
    emoji: "🥭",
    price: 400,
    category: "fruits",
    color: "#FFD700",
  },
  {
    id: "banana",
    name: "Banana",
    emoji: "🍌",
    price: 200,
    category: "fruits",
    color: "#FFFFE0",
  },

  // Toppings
  {
    id: "granola",
    name: "Granola",
    emoji: "🥣",
    price: 250,
    category: "toppings",
    color: "#8B7355",
  },
  {
    id: "nuts",
    name: "Mixed Nuts",
    emoji: "🥜",
    price: 400,
    category: "toppings",
    color: "#CD853F",
  },
  {
    id: "chia",
    name: "Chia Seeds",
    emoji: "⚫",
    price: 300,
    category: "toppings",
    color: "#2F4F4F",
  },

  // Sauces
  {
    id: "honey",
    name: "Honey",
    emoji: "🍯",
    price: 150,
    category: "sauce",
    color: "#FFB300",
  },
  {
    id: "chocolate",
    name: "Chocolate",
    emoji: "🍫",
    price: 350,
    category: "sauce",
    color: "#7B3F00",
  },
  {
    id: "caramel",
    name: "Caramel",
    emoji: "🍮",
    price: 300,
    category: "sauce",
    color: "#C68E17",
  },
];

const ParfaitBuilder: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [currentStep, setCurrentStep] = useState<
    "base" | "fruits" | "toppings" | "sauce"
  >("base");
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");

  const steps = ["base", "fruits", "toppings", "sauce"] as const;

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      const exists = prev.find((i) => i.id === ingredient.id);
      if (exists) {
        return prev.filter((i) => i.id !== ingredient.id);
      }
      return [...prev, ingredient];
    });
  };

  const calculateTotal = () => {
    const basePrice = size === "small" ? 1000 : size === "medium" ? 1500 : 2000;
    const ingredientsPrice = selectedIngredients.reduce(
      (sum, ing) => sum + ing.price,
      0
    );
    return basePrice + ingredientsPrice;
  };

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <section id="builder" className={styles["parfait-builder"]}>
      <div className={styles["parfait-builder__container"]}>
        <motion.div
          className={styles["parfait-builder__header"]}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles["parfait-builder__title"]}>
            Build Your Custom Parfait
          </h2>
          <p className={styles["parfait-builder__subtitle"]}>
            Create your perfect combination with our fresh ingredients
          </p>
        </motion.div>

        <div className={styles["parfait-builder__content"]}>
          <div className={styles["parfait-builder__controls"]}>
            {/* Progress Steps */}
            <div className={styles["parfait-builder__steps"]}>
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`${styles["parfait-builder__step"]} ${
                    currentStep === step
                      ? styles["parfait-builder__step--active"]
                      : ""
                  } ${
                    steps.indexOf(currentStep) > index
                      ? styles["parfait-builder__step--completed"]
                      : ""
                  }`}
                  onClick={() => setCurrentStep(step)}
                >
                  <span className={styles["parfait-builder__step-number"]}>
                    {index + 1}
                  </span>
                  <span className={styles["parfait-builder__step-label"]}>
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                </div>
              ))}
            </div>

            {/* Size Selector */}
            <div className={styles["parfait-builder__section"]}>
              <h3 className={styles["parfait-builder__section-title"]}>
                Choose Size
              </h3>
              <div className={styles["parfait-builder__sizes"]}>
                {(["small", "medium", "large"] as const).map((s) => (
                  <button
                    key={s}
                    className={`${styles["parfait-builder__size"]} ${
                      size === s
                        ? styles["parfait-builder__size--selected"]
                        : ""
                    }`}
                    onClick={() => setSize(s)}
                  >
                    <span className={styles["parfait-builder__size-icon"]}>
                      {s === "small" ? "🥤" : s === "medium" ? "🥛" : "🏺"}
                    </span>
                    <span className={styles["parfait-builder__size-name"]}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Selector */}
            <div className={styles["parfait-builder__section"]}>
              <h3 className={styles["parfait-builder__section-title"]}>
                Select{" "}
                {currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
              </h3>
              <div className={styles["parfait-builder__ingredients"]}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    className={styles["parfait-builder__ingredient-grid"]}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {ingredients
                      .filter((ing) => ing.category === currentStep)
                      .map((ingredient) => (
                        <motion.button
                          key={ingredient.id}
                          className={`${styles["parfait-builder__ingredient"]} ${
                            selectedIngredients.find(
                              (i) => i.id === ingredient.id
                            )
                              ? styles["parfait-builder__ingredient--selected"]
                              : ""
                          }`}
                          onClick={() => toggleIngredient(ingredient)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span
                            className={
                              styles["parfait-builder__ingredient-emoji"]
                            }
                          >
                            {ingredient.emoji}
                          </span>
                          <span
                            className={
                              styles["parfait-builder__ingredient-name"]
                            }
                          >
                            {ingredient.name}
                          </span>
                          <span
                            className={
                              styles["parfait-builder__ingredient-price"]
                            }
                          >
                            +₦{ingredient.price}
                          </span>
                        </motion.button>
                      ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation */}
            <div className={styles["parfait-builder__navigation"]}>
              <Button
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === "base"}
              >
                Previous
              </Button>
              {currentStep !== "sauce" ? (
                <Button variant="primary" onClick={nextStep}>
                  Next Step
                </Button>
              ) : (
                <Button variant="primary">
                  Add to Cart - ₦{calculateTotal().toLocaleString()}
                </Button>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className={styles["parfait-builder__preview"]}>
            <div className={styles["parfait-builder__glass"]}>
              <AnimatePresence>
                {selectedIngredients.map((ingredient, index) => (
                  <motion.div
                    key={ingredient.id}
                    className={styles["parfait-builder__layer"]}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      bottom: `${index * 60}px`,
                    }}
                    exit={{ opacity: 0, y: 50 }}
                    style={{
                      background: ingredient.color || "#FFF",
                      height: "60px",
                    }}
                  >
                    <span className={styles["parfait-builder__layer-emoji"]}>
                      {ingredient.emoji}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className={styles["parfait-builder__total"]}>
              <h3>Total: ₦{calculateTotal().toLocaleString()}</h3>
              <p>{selectedIngredients.length} ingredients selected</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParfaitBuilder;
