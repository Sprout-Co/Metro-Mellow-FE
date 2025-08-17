// src/app/(routes)/(app)/dashboard/_components/DashboardLayout/sidebar/ServicesListDrawer/ServicesListDrawer.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Check,
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
  Search,
} from "lucide-react";
import styles from "./ServicesListDrawer.module.scss";
import ModalDrawer from "@/components/ui/ModalDrawer/ModalDrawer";
import Input from "@/components/ui/Input";

interface SubService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  subServices: SubService[];
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<{
    categoryId: string;
    serviceId: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock services data
  const serviceCategories: ServiceCategory[] = [
    {
      id: "cleaning",
      name: "Professional Cleaning",
      description: "Complete home & office cleaning solutions",
      icon: <Home />,
      color: "#075056",
      subServices: [
        {
          id: "deep-clean",
          name: "Deep Cleaning",
          description:
            "Thorough cleaning of all areas including hard-to-reach spots",
          price: "₦25,000",
          duration: "4-6 hours",
          icon: <Sparkles />,
        },
        {
          id: "regular-clean",
          name: "Regular Maintenance",
          description: "Weekly or bi-weekly standard cleaning service",
          price: "₦15,000",
          duration: "2-3 hours",
          icon: <Timer />,
        },
        {
          id: "move-in-out",
          name: "Move-in/Move-out",
          description: "Complete property cleaning for moving",
          price: "₦35,000",
          duration: "5-7 hours",
          icon: <Package />,
        },
      ],
    },
    {
      id: "laundry",
      name: "Laundry Services",
      description: "Professional washing, drying & ironing",
      icon: <Droplets />,
      color: "#6366f1",
      subServices: [
        {
          id: "wash-fold",
          name: "Wash & Fold",
          description: "Standard laundry service with folding",
          price: "₦5,000/bag",
          duration: "24-48 hours",
          icon: <Shirt />,
        },
        {
          id: "dry-clean",
          name: "Dry Cleaning",
          description: "Special care for delicate & formal wear",
          price: "₦2,000/item",
          duration: "2-3 days",
          icon: <Sparkles />,
        },
        {
          id: "iron-press",
          name: "Ironing Service",
          description: "Professional pressing and steaming",
          price: "₦500/item",
          duration: "Same day",
          icon: <Timer />,
        },
      ],
    },
    {
      id: "cooking",
      name: "Cooking & Meals",
      description: "Professional meal preparation services",
      icon: <Utensils />,
      color: "#fe5b04",
      subServices: [
        {
          id: "meal-prep",
          name: "Weekly Meal Prep",
          description: "Prepared meals for the entire week",
          price: "₦30,000/week",
          duration: "Every Sunday",
          icon: <Calendar />,
        },
        {
          id: "daily-cook",
          name: "Daily Cooking",
          description: "Fresh meals prepared daily",
          price: "₦8,000/day",
          duration: "2-3 hours daily",
          icon: <Soup />,
        },
        {
          id: "event-catering",
          name: "Event Catering",
          description: "Catering for parties and events",
          price: "Custom quote",
          duration: "As scheduled",
          icon: <Coffee />,
        },
      ],
    },
    {
      id: "pest",
      name: "Pest Control",
      description: "Safe & effective pest management",
      icon: <Bug />,
      color: "#10b981",
      subServices: [
        {
          id: "inspection",
          name: "Pest Inspection",
          description: "Thorough property assessment",
          price: "₦10,000",
          duration: "1-2 hours",
          icon: <Shield />,
        },
        {
          id: "treatment",
          name: "Treatment Service",
          description: "Safe pest elimination",
          price: "₦20,000",
          duration: "2-4 hours",
          icon: <Zap />,
        },
        {
          id: "prevention",
          name: "Prevention Plan",
          description: "Monthly prevention service",
          price: "₦15,000/month",
          duration: "Monthly visits",
          icon: <Leaf />,
        },
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleServiceSelect = (categoryId: string, serviceId: string) => {
    setSelectedService({ categoryId, serviceId });
    if (onServiceSelect) {
      onServiceSelect(categoryId, serviceId);
    }
  };

  const isServiceSelected = (categoryId: string, serviceId: string) => {
    return (
      selectedService?.categoryId === categoryId &&
      selectedService?.serviceId === serviceId
    );
  };

  // Filter services based on search
  const filteredCategories = serviceCategories
    .map((category) => ({
      ...category,
      subServices: category.subServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subServices.length > 0
    );

  return (
    <ModalDrawer isOpen={isOpen} onClose={onClose} width="md">
      <div className={styles.servicesDrawer}>
        {/* Header */}
        <div className={styles.servicesDrawer__header}>
          <h2 className={styles.servicesDrawer__title}>Our Services</h2>
          <p className={styles.servicesDrawer__subtitle}>
            Browse and select from our comprehensive service offerings
          </p>
        </div>

        {/* Search Bar */}
        <div className={styles.servicesDrawer__search}>
          <Input
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Services List */}
        <div className={styles.servicesDrawer__categories}>
          {filteredCategories.map((category) => (
            <div key={category.id} className={styles.servicesDrawer__category}>
              <motion.button
                className={`${styles.servicesDrawer__categoryHeader} ${
                  expandedCategory === category.id
                    ? styles["servicesDrawer__categoryHeader--expanded"]
                    : ""
                }`}
                onClick={() => toggleCategory(category.id)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.99 }}
              >
                <div
                  className={styles.servicesDrawer__categoryIcon}
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <span style={{ color: category.color }}>{category.icon}</span>
                </div>
                <div className={styles.servicesDrawer__categoryInfo}>
                  <h3 className={styles.servicesDrawer__categoryName}>
                    {category.name}
                  </h3>
                  <p className={styles.servicesDrawer__categoryDesc}>
                    {category.description}
                  </p>
                </div>
                <motion.div
                  className={styles.servicesDrawer__categoryArrow}
                  animate={{
                    rotate: expandedCategory === category.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {expandedCategory === category.id && (
                  <motion.div
                    className={styles.servicesDrawer__subServices}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.subServices.map((service) => {
                      const isSelected = isServiceSelected(
                        category.id,
                        service.id
                      );
                      return (
                        <motion.div
                          key={service.id}
                          className={`${styles.servicesDrawer__service} ${
                            isSelected
                              ? styles["servicesDrawer__service--selected"]
                              : ""
                          }`}
                          onClick={() =>
                            handleServiceSelect(category.id, service.id)
                          }
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className={styles.servicesDrawer__serviceIcon}>
                            {service.icon}
                          </div>
                          <div className={styles.servicesDrawer__serviceInfo}>
                            <div
                              className={styles.servicesDrawer__serviceHeader}
                            >
                              <h4
                                className={styles.servicesDrawer__serviceName}
                              >
                                {service.name}
                              </h4>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className={
                                    styles.servicesDrawer__serviceCheck
                                  }
                                >
                                  <Check size={16} />
                                </motion.div>
                              )}
                            </div>
                            <p className={styles.servicesDrawer__serviceDesc}>
                              {service.description}
                            </p>
                            <div
                              className={styles.servicesDrawer__serviceDetails}
                            >
                              <span
                                className={styles.servicesDrawer__servicePrice}
                              >
                                {service.price}
                              </span>
                              <span
                                className={
                                  styles.servicesDrawer__serviceDuration
                                }
                              >
                                <Timer size={12} />
                                {service.duration}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className={styles.servicesDrawer__empty}>
            <Search size={48} />
            <h3>No services found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </ModalDrawer>
  );
};

export default ServicesListDrawer;
