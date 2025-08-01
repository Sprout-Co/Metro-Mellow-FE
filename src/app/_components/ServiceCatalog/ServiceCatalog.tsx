"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Clock, Star, ArrowRight, Search } from "lucide-react";
import styles from "./ServiceCatalog.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGetServicesQuery,
  ServiceCategory,
  Service,
  ServiceStatus,
  ExtraItem,
} from "@/graphql/api";

// Define service categories for sidebar
const serviceCategories = [
  { id: "COOKING", name: "Food" },
  { id: "CLEANING", name: "Cleaning" },
  { id: "PEST_CONTROL", name: "Pest Control" },
  { id: "LAUNDRY", name: "Laundry" },
];

const ServiceCatalog: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(
    ServiceCategory.Cooking
  );

  // Fetch services from API
  const {
    data: servicesData,
    loading,
    error,
  } = useGetServicesQuery({
    variables: {
      category: selectedCategory,
      status: ServiceStatus.Active,
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  // Function to validate and get safe image URL
  const getSafeImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) {
      return "/images/food/jollof-rice.png"; // fallback image
    }

    // Check if it's a relative URL (starts with /)
    if (imageUrl.startsWith("/")) {
      return imageUrl;
    }

    // Check if it's a local image in public folder
    if (imageUrl.startsWith("/images/")) {
      return imageUrl;
    }

    // For external URLs, we'll use a fallback for now
    // You can add specific domains to next.config.ts if needed
    console.warn(`External image URL not configured: ${imageUrl}`);
    return "/images/food/jollof-rice.png"; // fallback image
  };

  // Function to get appropriate button text based on category
  const getButtonText = (category: ServiceCategory): string => {
    switch (category) {
      case ServiceCategory.Cooking:
        return "Order Now";
      case ServiceCategory.Cleaning:
        return "Book Cleaning";
      case ServiceCategory.Laundry:
        return "Book Laundry";
      case ServiceCategory.PestControl:
        return "Book Service";
      default:
        return "Book Now";
    }
  };

  // Function to get the appropriate data based on selected category
  const getCategoryData = () => {
    const services = servicesData?.services || [];

    // Transform API data to display service options
    const transformedServices: any[] = [];

    services.forEach((service: Service) => {
      // If service has options, display each option as a separate card
      if (service.options && service.options.length > 0) {
        service.options.forEach((option) => {
          transformedServices.push({
            id: `${service._id}-${option.id}`,
            serviceId: service._id,
            optionId: option.id,
            title: option.label,
            image: getSafeImageUrl(service.imageUrl),
            price: `NGN ${option.price.toLocaleString()}`,
            description: option.description,
            duration: "30-45 mins", // This might need to come from service options or be calculated
            rating: 4.8, // This might need to come from reviews/ratings
            includes:
              option.inclusions?.join(", ") ||
              service.inclusions?.join(", ") ||
              "Standard service",
            serviceName: service.name,
            extraItems: option.extraItems,
          });
        });
      } else {
        // If no options, display the main service
        transformedServices.push({
          id: service._id,
          serviceId: service._id,
          title: service.name,
          image: getSafeImageUrl(service.imageUrl),
          price: service.displayPrice,
          description: service.description,
          duration: "30-45 mins", // This might need to come from service options or be calculated
          rating: 4.8, // This might need to come from reviews/ratings
          includes: service.inclusions?.join(", ") || "Standard service",
          serviceName: service.name,
        });
      }
    });

    const categoryConfig = {
      [ServiceCategory.Cooking]: {
        title: "Our Delicacies",
        subtitle:
          "Explore our menu of delicious meals prepared with fresh ingredients",
      },
      [ServiceCategory.Cleaning]: {
        title: "Cleaning Services",
        subtitle:
          "Professional cleaning services to keep your space spotless and fresh",
      },
      [ServiceCategory.PestControl]: {
        title: "Pest Control Solutions",
        subtitle:
          "Effective pest control treatments for a pest-free environment",
      },
      [ServiceCategory.Laundry]: {
        title: "Laundry Services",
        subtitle:
          "Quality laundry services to keep your clothes looking their best",
      },
      [ServiceCategory.Errands]: {
        title: "Errand Services",
        subtitle: "Convenient errand services to save you time and effort",
      },
    };

    return {
      data: transformedServices,
      title: categoryConfig[selectedCategory]?.title || "Services",
      subtitle:
        categoryConfig[selectedCategory]?.subtitle || "Explore our services",
    };
  };

  const {
    data: currentData,
    title: currentTitle,
    subtitle: currentSubtitle,
  } = getCategoryData();

  // Handle loading state
  if (loading) {
    return (
      <section className={styles.catalog}>
        <div className={styles.catalog__container}>
          <div className={styles.catalog__header}>
            <h2 className={styles.catalog__title}>Our catalog</h2>
            <p className={styles.catalog__subtitle}>
              Select your need and wait for the magic.
            </p>
          </div>
          <div className={styles.catalog__content}>
            <div className={styles.catalog__sidebar}>
              <div className={styles.catalog__sidebarHeader}>
                <h3 className={styles.catalog__sidebarTitle}>Categories</h3>
              </div>
              <ul className={styles.catalog__sidebarList}>
                {serviceCategories.map((category) => (
                  <li
                    key={category.id}
                    className={`${styles.catalog__sidebarItem} ${
                      category.id === selectedCategory
                        ? styles["catalog__sidebarItem--active"]
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedCategory(category.id as ServiceCategory)
                    }
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.catalog__main}>
              <div className={styles.catalog__mainHeader}>
                <h3 className={styles.catalog__mainTitle}>Loading...</h3>
                <p className={styles.catalog__mainSubtitle}>
                  Please wait while we fetch the services.
                </p>
              </div>
              <div className={styles.catalog__grid}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={styles.catalog__card}>
                    <div className={styles.catalog__cardImageWrapper}>
                      <div
                        className={styles.catalog__cardImage}
                        style={{ backgroundColor: "#f0f0f0", height: "300px" }}
                      />
                    </div>
                    <div className={styles.catalog__cardContent}>
                      <div className={styles.catalog__cardHeader}>
                        <h4 className={styles.catalog__cardTitle}>
                          Loading...
                        </h4>
                        <div className={styles.catalog__cardPrice}>...</div>
                      </div>
                      <p className={styles.catalog__cardDescription}>
                        Loading service details...
                      </p>
                      <div className={styles.catalog__cardMeta}>
                        <div className={styles.catalog__cardMetaItem}>
                          <Clock size={16} />
                          <span>...</span>
                        </div>
                        <div className={styles.catalog__cardMetaItem}>
                          <Star size={16} />
                          <span>...</span>
                        </div>
                      </div>
                      <div className={styles.catalog__cardActions}>
                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth={true}
                          disabled
                        >
                          Loading...
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Handle error state
  if (error) {
    return (
      <section className={styles.catalog}>
        <div className={styles.catalog__container}>
          <div className={styles.catalog__header}>
            <h2 className={styles.catalog__title}>Our catalog</h2>
            <p className={styles.catalog__subtitle}>
              Select your need and wait for the magic.
            </p>
          </div>
          <div className={styles.catalog__content}>
            <div className={styles.catalog__sidebar}>
              <div className={styles.catalog__sidebarHeader}>
                <h3 className={styles.catalog__sidebarTitle}>Categories</h3>
              </div>
              <ul className={styles.catalog__sidebarList}>
                {serviceCategories.map((category) => (
                  <li
                    key={category.id}
                    className={`${styles.catalog__sidebarItem} ${
                      category.id === selectedCategory
                        ? styles["catalog__sidebarItem--active"]
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedCategory(category.id as ServiceCategory)
                    }
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.catalog__main}>
              <div className={styles.catalog__mainHeader}>
                <h3 className={styles.catalog__mainTitle}>
                  Error Loading Services
                </h3>
                <p className={styles.catalog__mainSubtitle}>
                  We encountered an error while loading the services. Please try
                  again later.
                </p>
              </div>
              <div className={styles.catalog__grid}>
                <motion.div
                  className={styles.catalog__empty}
                  variants={itemVariants}
                >
                  <div className={styles.catalog__emptyIcon}>
                    <Search size={48} />
                  </div>
                  <h4 className={styles.catalog__emptyTitle}>
                    Unable to load services
                  </h4>
                  <p className={styles.catalog__emptyText}>
                    {error.message ||
                      "An error occurred while fetching services. Please refresh the page or try again later."}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__container}>
        <div className={styles.catalog__header}>
          <h2 className={styles.catalog__title}>Our catalog</h2>
          <p className={styles.catalog__subtitle}>
            Select your need and wait for the magic.
          </p>
        </div>

        <div className={styles.catalog__content}>
          {/* Categories sidebar */}
          <div className={styles.catalog__sidebar}>
            <div className={styles.catalog__sidebarHeader}>
              <h3 className={styles.catalog__sidebarTitle}>Categories</h3>
            </div>
            <ul className={styles.catalog__sidebarList}>
              {serviceCategories.map((category) => (
                <li
                  key={category.id}
                  className={`${styles.catalog__sidebarItem} ${
                    category.id === selectedCategory
                      ? styles["catalog__sidebarItem--active"]
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(category.id as ServiceCategory)
                  }
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Main catalog content */}
          <div className={styles.catalog__main}>
            <div className={styles.catalog__mainHeader}>
              <motion.h3
                className={styles.catalog__mainTitle}
                key={currentTitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {currentTitle}
              </motion.h3>
              <motion.p
                className={styles.catalog__mainSubtitle}
                key={currentSubtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {currentSubtitle}
              </motion.p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className={styles.catalog__grid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {currentData.length > 0 ? (
                  currentData.map((service) => (
                    <motion.div
                      key={service.id}
                      className={styles.catalog__card}
                      variants={itemVariants}
                    >
                      <div className={styles.catalog__cardImageWrapper}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={400}
                          height={300}
                          className={styles.catalog__cardImage}
                        />
                        <div className={styles.catalog__cardBadge}>
                          {service.rating}{" "}
                          <Star
                            size={12}
                            style={{ display: "inline", marginLeft: "2px" }}
                          />
                        </div>
                      </div>
                      <div className={styles.catalog__cardContent}>
                        <div className={styles.catalog__cardHeader}>
                          <h4 className={styles.catalog__cardTitle}>
                            {service.title}
                          </h4>
                          <div className={styles.catalog__cardPrice}>
                            {service.price}
                          </div>
                        </div>

                        <p className={styles.catalog__cardDescription}>
                          {service.description}
                        </p>

                        <div className={styles.catalog__cardMeta}>
                          <div className={styles.catalog__cardMetaItem}>
                            <Clock size={16} />
                            <span>{service.duration}</span>
                          </div>
                          <div className={styles.catalog__cardMetaItem}>
                            <Star size={16} />
                            <span>{service.includes}</span>
                          </div>
                        </div>

                        {/* Show extra items if available */}
                        {service.extraItems &&
                          service.extraItems.length > 0 && (
                            <div className={styles.catalog__cardExtra}>
                              <h5>Extra Items Available:</h5>
                              <div className={styles.catalog__cardExtraItems}>
                                {service.extraItems.map(
                                  (item: ExtraItem, index: number) => (
                                    <span
                                      key={index}
                                      className={styles.catalog__cardExtraItem}
                                    >
                                      {item.name} (+NGN {item.cost})
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        <div className={styles.catalog__cardActions}>
                          <Button variant="primary" size="lg" fullWidth={true}>
                            {getButtonText(selectedCategory)}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className={styles.catalog__empty}
                    variants={itemVariants}
                  >
                    <div className={styles.catalog__emptyIcon}>
                      <Search size={48} />
                    </div>
                    <h4 className={styles.catalog__emptyTitle}>
                      No services found
                    </h4>
                    <p className={styles.catalog__emptyText}>
                      We couldn't find any services in this category. Please try
                      another category or check back later.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCatalog;
