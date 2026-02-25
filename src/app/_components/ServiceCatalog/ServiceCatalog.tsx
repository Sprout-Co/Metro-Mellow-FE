"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Clock, ArrowRight, Search } from "lucide-react";
import styles from "./ServiceCatalog.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import {
  ServiceCategory,
  Service,
  ServiceStatus,
  ServiceOption,
  ServiceId,
} from "@/graphql/api";
import { useGetServices } from "@/graphql/hooks/services/useServiceOperations";
import ServiceModal, {
  ServiceConfiguration,
} from "@/components/ui/booking/modals/ServiceModal/ServiceModal";
import CleaningServiceModal from "@/components/ui/booking/modals/CleaningServiceModal/CleaningServiceModal";
import PestControlServiceModal from "@/components/ui/booking/modals/PestControlServiceModal/PestControlServiceModal";
import LaundryServiceModal from "@/components/ui/booking/modals/LaundryServiceModal/LaundryServiceModal";
import CookingServiceModal from "@/components/ui/booking/modals/CookingServiceModal";
import FoodMenuModal from "@/app/(routes)/(site)/services/food/_components/FoodMenuModal";

// Define service categories for sidebar
const serviceCategories = [
  { id: "CLEANING", name: "Cleaning" },
  { id: "PEST_CONTROL", name: "Pest Control" },
  { id: "LAUNDRY", name: "Laundry" },
  { id: "COOKING", name: "Food" },
];

const ServiceCatalog: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(
    ServiceCategory.Cleaning,
  );

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(
    null,
  );

  // Fetch services from API
  const {
    data: servicesData,
    loading,
    error,
  } = useGetServices({
    category: selectedCategory,
    status: ServiceStatus.Active,
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
  const getSafeImageUrl = (
    imageUrl: string | null | undefined,
    serviceId: ServiceId,
  ): string => {
    console.log("serviceId", serviceId);
    console.log("imageUrl", imageUrl);

    // Override specific service images with local images
    switch (serviceId) {
      case ServiceId.StandardCooking:
        return "/images/home/home6.jpg";
      case ServiceId.BasicCooking:
        return "/images/home/home5.jpg";
      case ServiceId.StandardCleaning:
        return "/images/cleaning/sparkelr-3-back.jpeg";
      case ServiceId.DeepCleaning:
        return "/images/home/hero.jpg";
      case ServiceId.MoveInMoveOutCleaning:
        return "/images/home/home4.jpeg";
      case ServiceId.PostConstructionCleaning:
        return "/images/home/home4.jpg";
      case ServiceId.Laundry:
        return "/images/home/home1.jpg";
      case ServiceId.StandardLaundry:
        return "/images/home/home1.jpg";
      case ServiceId.PremiumLaundry:
        return "/images/home/home1.jpg";
      case ServiceId.DryCleaning:
        return "/images/home/home1.jpg";
      case ServiceId.PestControlResidential:
        return "/images/pest-control/p1.jpeg";
      case ServiceId.PestControlCommercial:
        return "/images/pest-control/p1.jpeg";
      default:
        // If no override, use the provided imageUrl or fallback
        if (!imageUrl) {
          return "/images/food/jollof-rice.png"; // fallback image
        }

        // Check if it's a relative URL (starts with /)
        if (imageUrl.startsWith("/") || imageUrl.startsWith("http")) {
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
    }
  };

  // Check if service is available (currently only Cleaning)
  const isServiceAvailable = (category: ServiceCategory) => {
    return category === ServiceCategory.Cleaning;
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

  // Function to get category configuration using API data
  const getCategoryConfig = (category: ServiceCategory) => {
    const categoryConfig = {
      [ServiceCategory.Cooking]: {
        title: "Fresh Meal Delivery",
        subtitle:
          "Nutritious meals prepared by professional chefs. Traditional Nigerian dishes to international cuisine, delivered fresh to your door.",
      },
      [ServiceCategory.Cleaning]: {
        title: "Professional House Cleaning",
        subtitle:
          "Deep cleaning, regular maintenance, and move-in services. Vetted professionals with quality supplies and satisfaction guarantee.",
      },
      [ServiceCategory.PestControl]: {
        title: "Safe Pest Control Services",
        subtitle:
          "Licensed professionals using eco-friendly treatments. Effective pest elimination for homes and offices with warranty coverage.",
      },
      [ServiceCategory.Laundry]: {
        title: "Complete Laundry Service",
        subtitle:
          "Wash, fold, iron, and dry cleaning services. Professional care with free pickup and delivery across Lagos.",
      },
      [ServiceCategory.Errands]: {
        title: "Convenient Errand Services",
        subtitle:
          "Professional errand services to save you time and effort across Lagos",
      },
    };

    return (
      categoryConfig[category] || {
        title: "Services",
        subtitle: "Explore our services",
      }
    );
  };

  // Function to get service configuration based on category and service data
  const getServiceConfiguration = (
    category: ServiceCategory,
    service?: Service,
  ): ServiceConfiguration => {
    // Use service features from API if available
    const serviceFeatures = service?.features || [];

    switch (category) {
      case ServiceCategory.Cleaning:
        return {
          categories: [
            {
              id: "apartmentType",
              name: "Your Apartment type",
              options: ["Flat/Apartment", "Duplex/House"],
              required: true,
            },
          ],
          options: [
            { id: "bedroom", name: "Bedroom", count: 1 },
            { id: "livingRoom", name: "Living Room", count: 1 },
            { id: "kitchen", name: "Kitchen", count: 1 },
            { id: "bathroom", name: "Bathroom", count: 1 },
            { id: "balcony", name: "Balcony", count: 1 },
            { id: "studyRoom", name: "Study Room", count: 1 },
          ],
          allowCustomization: true,
        };
      case ServiceCategory.Cooking:
        return {
          categories: [
            {
              id: "mealType",
              name: "Meal Type",
              options: ["Basic", "Standard"],
              required: true,
            },
            {
              id: "deliveryFrequency",
              name: "Delivery Frequency",
              options: ["Daily", "Weekly", "Monthly"],
              required: true,
            },
          ],
          options: [
            { id: "breakfast", name: "Breakfast", count: 1 },
            { id: "lunch", name: "Lunch", count: 1 },
            { id: "dinner", name: "Dinner", count: 1 },
          ],
          allowCustomization: true,
        };
      case ServiceCategory.Laundry:
        return {
          categories: [
            {
              id: "laundryType",
              name: "Laundry Type",
              options: ["Standard Laundry", "Premium Laundry", "Dry Cleaning"],
              required: true,
            },
          ],
          options: [
            { id: "shirts", name: "Shirts", count: 1 },
            { id: "pants", name: "Pants", count: 1 },
            { id: "dresses", name: "Dresses", count: 1 },
            { id: "suits", name: "Suits", count: 1 },
            { id: "others", name: "Others", count: 1 },
          ],
          allowCustomization: true,
        };
      case ServiceCategory.PestControl:
        return {
          categories: [
            {
              id: "propertyType",
              name: "Property Type",
              options: ["Residential", "Commercial"],
              required: true,
            },
            {
              id: "pestType",
              name: "Pest Type",
              options: ["General", "Cockroaches", "Rats", "Termites"],
              required: true,
            },
          ],
          options: [
            { id: "rooms", name: "Rooms", count: 1 },
            { id: "outdoor", name: "Outdoor Area", count: 1 },
          ],
          allowCustomization: true,
        };
      default:
        return {
          options: [{ id: "quantity", name: "Quantity", count: 1 }],
          allowCustomization: true,
        };
    }
  };

  // Function to get included features based on API data and category
  const getIncludedFeatures = (
    category: ServiceCategory,
    service?: Service,
  ): string[] => {
    // Use service features from API if available
    if (service?.features && service.features.length > 0) {
      return service.features;
    }

    // Fallback to category-specific features
    switch (category) {
      case ServiceCategory.Cleaning:
        return [
          "Professional cleaning supplies included",
          "Experienced and vetted cleaning professionals",
          "Satisfaction guarantee",
          "Flexible scheduling options",
          "Eco-friendly cleaning products available",
          "Deep sanitization and disinfection",
        ];
      case ServiceCategory.Cooking:
        return [
          "Fresh, high-quality ingredients",
          "Professional chefs",
          "Customizable meal plans",
          "On-time delivery",
          "Hygienic preparation",
          "Dietary restrictions accommodated",
        ];
      case ServiceCategory.Laundry:
        return [
          "Professional laundry service",
          "Eco-friendly detergents",
          "Stain treatment included",
          "Quality assurance",
          "Express service available",
          "Free pickup and delivery",
        ];
      case ServiceCategory.PestControl:
        return [
          "Licensed pest control professionals",
          "Safe and effective treatments",
          "Follow-up visits included",
          "Warranty on services",
          "Eco-friendly options available",
          "Emergency service available",
        ];
      default:
        return [
          "Professional service",
          "Quality guarantee",
          "Flexible scheduling",
        ];
    }
  };

  const services = servicesData?.services || [];
  const { title: currentTitle, subtitle: currentSubtitle } =
    getCategoryConfig(selectedCategory);

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

  // Handle opening the modal with selected service
  const handleOrderClick = (service: Service, option: ServiceOption) => {
    console.log("service", service);
    console.log("option", option);
    setSelectedService(service);
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setSelectedOption(null);
  };

  const renderServiceModal = (service: Service, option: ServiceOption) => {
    switch (service.category) {
      case ServiceCategory.Cooking:
        return (
          <FoodMenuModal isOpen={isModalOpen} onClose={handleCloseModal} />
        );
      case ServiceCategory.Cleaning:
        return (
          <CleaningServiceModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            serviceOption={option}
            service={service}
            includedFeatures={
              option.inclusions ||
              getIncludedFeatures(ServiceCategory.Cleaning, service)
            }
          />
        );
      case ServiceCategory.PestControl:
        return (
          <PestControlServiceModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            serviceOption={option}
            service={service}
          />
        );
      case ServiceCategory.Laundry:
        return (
          <LaundryServiceModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            serviceOption={option}
            service={service}
          />
        );
    }
  };

  return (
    <section className={styles.catalog}>
      <div className={styles.catalog__container}>
        <div className={styles.catalog__header}>
          <h2 className={styles.catalog__title}>
            Professional Home Services in Lagos
          </h2>
          <p className={styles.catalog__subtitle}>
            Choose from our comprehensive range of trusted services.
            Professional quality, guaranteed satisfaction
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
                {services.length > 0 ? (
                  services.map((service) => {
                    // If service has options, render each option as a separate card
                    if (service.options && service.options.length > 0) {
                      return service.options.map((option: ServiceOption) => (
                        <motion.div
                          key={`${service._id}-${option.id}`}
                          className={styles.catalog__card}
                          variants={itemVariants}
                        >
                          <div className={styles.catalog__cardImageWrapper}>
                            <Image
                              src={getSafeImageUrl(
                                option.imageUrl,
                                option.service_id,
                              )}
                              alt={option.label}
                              width={400}
                              height={300}
                              className={styles.catalog__cardImage}
                            />
                          </div>
                          <div className={styles.catalog__cardContent}>
                            <div className={styles.catalog__cardHeader}>
                              <h4 className={styles.catalog__cardTitle}>
                                {option.label}
                              </h4>
                              <div className={styles.catalog__cardPrice}>
                                NGN {option.price.toLocaleString()}
                              </div>
                            </div>

                            <p className={styles.catalog__cardDescription}>
                              {option.description}
                            </p>

                            <div className={styles.catalog__cardMeta}>
                              {/* <div className={styles.catalog__cardMetaItem}>
                                <Clock size={16} />
                                <span>30-45 mins</span>
                              </div> */}
                              <div className={styles.catalog__cardMetaItem}>
                                <span>
                                  {option.inclusions?.join(", ") ||
                                    service.inclusions?.join(", ") ||
                                    "Standard service"}
                                </span>
                              </div>
                            </div>

                            {/* Show extra items if available */}
                            {/* {option.extraItems &&
                              option.extraItems.length > 0 && (
                                <div className={styles.catalog__cardExtra}>
                                  <h5>Extra Items Available:</h5>
                                  <div
                                    className={styles.catalog__cardExtraItems}
                                  >
                                    {option.extraItems.map((item, index) => (
                                      <span
                                        key={index}
                                        className={
                                          styles.catalog__cardExtraItem
                                        }
                                      >
                                        {item.name} (+NGN {item.cost})
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )} */}

                            <div className={styles.catalog__cardActions}>
                              {isServiceAvailable(service.category) ? (
                                <Button
                                  variant="primary"
                                  size="lg"
                                  fullWidth={true}
                                  onClick={() =>
                                    handleOrderClick(service, option)
                                  }
                                >
                                  {getButtonText(selectedCategory)}
                                </Button>
                              ) : (
                                <Button
                                  variant="secondary"
                                  size="lg"
                                  fullWidth={true}
                                  disabled
                                >
                                  <Clock
                                    size={16}
                                    style={{ marginRight: "8px" }}
                                  />
                                  Coming Soon
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ));
                    }
                  })
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

      {/* Service Modal */}
      {
        selectedService &&
          selectedOption &&
          renderServiceModal(selectedService, selectedOption)
        // <ServiceModal
        //   isOpen={isModalOpen}
        //   onClose={handleCloseModal}
        //   serviceTitle={selectedOption.label}
        //   serviceDescription={selectedOption.description}
        //   servicePrice={selectedOption.price}
        //   serviceImage={getSafeImageUrl(selectedService.imageUrl)}
        //   serviceConfiguration={getServiceConfiguration(
        //     selectedCategory,
        //     selectedService
        //   )}
        //   service_category={selectedCategory}
        //   includedFeatures={getIncludedFeatures(
        //     selectedCategory,
        //     selectedService
        //   )}
        //   onOrderSubmit={(configuration) => {
        //     console.log("Service configuration:", {
        //       service: selectedService,
        //       option: selectedOption,
        //       configuration,
        //     });
        //   }}
        // />
      }
    </section>
  );
};

export default ServiceCatalog;
