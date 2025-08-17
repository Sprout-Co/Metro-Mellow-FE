// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/ServicesListDrawer/ServicesListDrawer.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Home,
  Droplets,
  Utensils,
  Bug,
  Package,
  Sparkles,
  Timer,
  Shirt,
  Calendar,
  Soup,
  Coffee,
  Shield,
  Zap,
  Leaf,
  ArrowRight,
  Clock,
} from "lucide-react";
import styles from "./ServicesListDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import FnButton from "@/components/ui/Button/FnButton";

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
  popular?: boolean;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  services: Service[];
}

interface ServicesListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect?: (categoryId: string, serviceId: string) => void;
}

const ServicesListDrawer: React.FC<ServicesListDrawerProps> = ({
  isOpen,
  onClose,
  onServiceSelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Service categories data
  const serviceCategories: ServiceCategory[] = [
    {
      id: "cleaning",
      name: "Cleaning",
      description: "Professional home & office cleaning",
      icon: <Home />,
      color: "#075056",
      services: [
        {
          id: "deep-clean",
          name: "Deep Cleaning",
          description: "Comprehensive cleaning including hard-to-reach areas",
          price: "From ₦25,000",
          duration: "4-6 hours",
          icon: <Sparkles />,
          popular: true,
        },
        {
          id: "regular-clean",
          name: "Regular Cleaning",
          description: "Standard cleaning for maintained homes",
          price: "From ₦15,000",
          duration: "2-3 hours",
          icon: <Timer />,
        },
        {
          id: "move-clean",
          name: "Move-in/out Cleaning",
          description: "Complete property cleaning for moving",
          price: "From ₦35,000",
          duration: "5-7 hours",
          icon: <Package />,
        },
      ],
    },
    {
      id: "laundry",
      name: "Laundry",
      description: "Wash, dry, fold & iron services",
      icon: <Droplets />,
      color: "#6366f1",
      services: [
        {
          id: "wash-fold",
          name: "Wash & Fold",
          description: "Professional washing and folding service",
          price: "₦5,000/bag",
          duration: "24-48 hours",
          icon: <Shirt />,
          popular: true,
        },
        {
          id: "dry-clean",
          name: "Dry Cleaning",
          description: "Special care for delicate fabrics",
          price: "₦2,000/item",
          duration: "2-3 days",
          icon: <Sparkles />,
        },
        {
          id: "iron",
          name: "Ironing Service",
          description: "Professional pressing service",
          price: "₦500/item",
          duration: "Same day",
          icon: <Timer />,
        },
      ],
    },
    {
      id: "cooking",
      name: "Cooking",
      description: "Meal prep & catering services",
      icon: <Utensils />,
      color: "#fe5b04",
      services: [
        {
          id: "meal-prep",
          name: "Weekly Meal Prep",
          description: "Healthy meals prepared for the week",
          price: "₦30,000/week",
          duration: "Every Sunday",
          icon: <Calendar />,
        },
        {
          id: "daily-cook",
          name: "Daily Cooking",
          description: "Fresh home-cooked meals daily",
          price: "₦8,000/day",
          duration: "2-3 hours",
          icon: <Soup />,
          popular: true,
        },
        {
          id: "catering",
          name: "Event Catering",
          description: "Professional catering for events",
          price: "Custom quote",
          duration: "As scheduled",
          icon: <Coffee />,
        },
      ],
    },
    {
      id: "pest",
      name: "Pest Control",
      description: "Safe pest management solutions",
      icon: <Bug />,
      color: "#10b981",
      services: [
        {
          id: "inspection",
          name: "Pest Inspection",
          description: "Comprehensive property assessment",
          price: "₦10,000",
          duration: "1-2 hours",
          icon: <Shield />,
        },
        {
          id: "treatment",
          name: "Pest Treatment",
          description: "Targeted pest elimination",
          price: "₦20,000",
          duration: "2-4 hours",
          icon: <Zap />,
        },
        {
          id: "prevention",
          name: "Monthly Prevention",
          description: "Regular preventive treatments",
          price: "₦15,000/month",
          duration: "Monthly",
          icon: <Leaf />,
        },
      ],
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      onClose();
    }
  };

  const handleServiceClick = (categoryId: string, serviceId: string) => {
    if (onServiceSelect) {
      onServiceSelect(categoryId, serviceId);
    }
    onClose();
  };

  // Filter services based on search
  const filteredCategories = serviceCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.services.some(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const selectedCategoryData = serviceCategories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="lg">
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.drawer__header}>
          <button className={styles.drawer__backBtn} onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.drawer__headerText}>
            <h2 className={styles.drawer__title}>
              {selectedCategory && selectedCategoryData
                ? selectedCategoryData.name
                : "Our Services"}
            </h2>
            <p className={styles.drawer__subtitle}>
              {selectedCategory && selectedCategoryData
                ? selectedCategoryData.description
                : "Choose a service category to explore"}
            </p>
          </div>
        </div>

        {/* Search Bar (only on main view) */}
        {!selectedCategory && (
          <div className={styles.drawer__search}>
            <Search className={styles.drawer__searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.drawer__searchInput}
            />
          </div>
        )}

        {/* Content */}
        <div className={styles.drawer__content}>
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              // Categories View
              <motion.div
                key="categories"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={styles.drawer__categories}
              >
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className={styles.drawer__categoryCard}
                    onClick={() => handleCategorySelect(category.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={styles.drawer__categoryIcon}
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <span style={{ color: category.color }}>
                        {category.icon}
                      </span>
                    </div>
                    <div className={styles.drawer__categoryInfo}>
                      <h3 className={styles.drawer__categoryName}>
                        {category.name}
                      </h3>
                      <p className={styles.drawer__categoryDesc}>
                        {category.description}
                      </p>
                      <span className={styles.drawer__categoryCount}>
                        {category.services.length} services available
                      </span>
                    </div>
                    <ArrowRight className={styles.drawer__categoryArrow} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Services View
              <motion.div
                key="services"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.drawer__services}
              >
                {selectedCategoryData?.services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className={styles.drawer__serviceCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {service.popular && (
                      <span className={styles.drawer__popularBadge}>
                        Popular
                      </span>
                    )}
                    <div className={styles.drawer__serviceHeader}>
                      <div className={styles.drawer__serviceIcon}>
                        {service.icon}
                      </div>
                      <h3 className={styles.drawer__serviceName}>
                        {service.name}
                      </h3>
                    </div>
                    <p className={styles.drawer__serviceDesc}>
                      {service.description}
                    </p>
                    <div className={styles.drawer__serviceDetails}>
                      <div className={styles.drawer__servicePrice}>
                        <span className={styles.drawer__serviceLabel}>
                          Price
                        </span>
                        <span className={styles.drawer__serviceValue}>
                          {service.price}
                        </span>
                      </div>
                      <div className={styles.drawer__serviceDuration}>
                        <span className={styles.drawer__serviceLabel}>
                          Duration
                        </span>
                        <span className={styles.drawer__serviceValue}>
                          <Clock size={14} />
                          {service.duration}
                        </span>
                      </div>
                    </div>
                    <FnButton
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() =>
                        handleServiceClick(selectedCategory, service.id)
                      }
                    >
                      Book This Service
                    </FnButton>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ModalDrawer>
  );
};

export default ServicesListDrawer;
