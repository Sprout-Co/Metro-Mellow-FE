// src/app/(routes)/(app)/dashboard/bookings/_components/QuickBookingWidget/QuickBookingWidget.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Clock, Sparkles, Utensils, Bug, Package } from "lucide-react";
import styles from "./QuickBookingWidget.module.scss";
import { ServiceCategory } from "../../types/booking";

const QuickBookingWidget: React.FC = () => {
  const quickServices = [
    {
      id: "cleaning",
      name: "Cleaning",
      icon: <Sparkles />,
      category: ServiceCategory.Cleaning,
      color: "#075056",
      popular: true,
    },
    {
      id: "laundry",
      name: "Laundry",
      icon: <Package />,
      category: ServiceCategory.Laundry,
      color: "#6366f1",
      popular: false,
    },
    {
      id: "cooking",
      name: "Cooking",
      icon: <Utensils />,
      category: ServiceCategory.Cooking,
      color: "#fe5b04",
      popular: true,
    },
    {
      id: "pest",
      name: "Pest Control",
      icon: <Bug />,
      category: ServiceCategory.PestControl,
      color: "#ec4899",
      popular: false,
    },
  ];

  const handleQuickBook = (category: ServiceCategory) => {
    console.log(`Quick book ${category}`);
    // Navigate to booking form with pre-selected service
  };

  return (
    <motion.div
      className={styles.quickBooking}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className={styles.quickBooking__header}>
        <h3 className={styles.quickBooking__title}>Quick Book</h3>
        <span className={styles.quickBooking__subtitle}>Popular services</span>
      </div>

      <div className={styles.quickBooking__services}>
        {quickServices.map((service, index) => (
          <motion.button
            key={service.id}
            className={styles.quickBooking__serviceBtn}
            onClick={() => handleQuickBook(service.category)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={styles.quickBooking__serviceIcon}
              style={{
                backgroundColor: `${service.color}15`,
                color: service.color,
              }}
            >
              {service.icon}
            </div>
            <span className={styles.quickBooking__serviceName}>
              {service.name}
            </span>
            {service.popular && (
              <span className={styles.quickBooking__popularBadge}>Popular</span>
            )}
          </motion.button>
        ))}
      </div>

      <div className={styles.quickBooking__footer}>
        <motion.button
          className={styles.quickBooking__customBtn}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={14} />
          Custom Booking
        </motion.button>
      </div>

      <div className={styles.quickBooking__nextSlot}>
        <Clock size={14} />
        <span>
          Next available slot: <strong>Today, 2:00 PM</strong>
        </span>
      </div>
    </motion.div>
  );
};

// QuickBookingWidget.module.scss
const quickBookingWidgetStyles = `
// src/app/(routes)/(app)/dashboard/bookings/_components/QuickBookingWidget/QuickBookingWidget.module.scss
@import "@/styles/abstracts/variables";
@import "@/styles/abstracts/functions";
@import "@/styles/abstracts/mixins";

.quickBooking {
  background-color: color("neutral", "white");
  border-radius: border-radius("lg");
  box-shadow: shadow("sm");
  padding: spacing("lg");
  margin-bottom: spacing("md");

  &__header {
    margin-bottom: spacing("md");
  }

  &__title {
    @include font-size("body-2");
    @include font-weight("semibold");
    color: color("neutral", "darkest");
    margin: 0 0 spacing("xxs") 0;
  }

  &__subtitle {
    @include font-size("xs");
    color: color("neutral", "medium");
  }

  &__services {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: spacing("sm");
    margin-bottom: spacing("md");
  }

  &__serviceBtn {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: spacing("xs");
    padding: spacing("md") spacing("sm");
    background-color: color("neutral", "white");
    border: 1px solid color("neutral", "lighter");
    border-radius: border-radius("md");
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      border-color: color("primary", "lighter");
    }
  }

  &__serviceIcon {
    width: 32px;
    height: 32px;
    border-radius: border-radius("md");
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__serviceName {
    @include font-size("xs");
    @include font-weight("medium");
    color: color("neutral", "darkest");
  }

  &__popularBadge {
    position: absolute;
    top: spacing("xs");
    right: spacing("xs");
    @include font-size("xs");
    @include font-weight("medium");
    padding: 1px spacing("xs");
    background-color: color("accent", "lighter");
    color: color("accent", "darker");
    border-radius: border-radius("sm");
    line-height: 1;
  }

  &__footer {
    padding-bottom: spacing("md");
    border-bottom: 1px solid color("neutral", "lighter");
    margin-bottom: spacing("md");
  }

  &__customBtn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: spacing("xs");
    padding: spacing("sm");
    background-color: color("neutral", "lightest");
    border: 1px dashed color("neutral", "light");
    border-radius: border-radius("md");
    @include font-size("xs");
    @include font-weight("medium");
    color: color("neutral", "darkest");
    cursor: pointer;
    transition: $transition-fast;

    &:hover {
      background-color: color("neutral", "lighter");
      border-style: solid;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &__nextSlot {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: spacing("xs");
    @include font-size("xs");
    color: color("neutral", "medium");

    svg {
      width: 14px;
      height: 14px;
      color: color("primary", "base");
    }

    strong {
      color: color("primary", "base");
      @include font-weight("semibold");
    }
  }
}
`;

export default QuickBookingWidget;
