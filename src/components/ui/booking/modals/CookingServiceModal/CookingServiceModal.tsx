"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import CheckoutModal, {
  CheckoutFormData,
} from "@/components/ui/booking/modals/CheckoutModal/CheckoutModal";
import ServiceDetailsSlidePanel from "@/components/ui/booking/modals/ServiceDetailsSlidePanel/ServiceDetailsSlidePanel";
import { ReduxCartModal } from "@/components/ui/booking/modals/CartModal";
import styles from "./CookingServiceModal.module.scss";
import {
  CreateBookingInput,
  Service,
  ServiceCategory,
  ServiceId,
  ServiceOption,
  MealType,
  ScheduleDays,
} from "@/graphql/api";
import OrderSuccessModal from "../OrderSuccessModal/OrderSuccessModal";
import { useAppSelector } from "@/lib/redux/hooks";
import { useCart, useCartActions } from "@/lib/redux/hooks";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { LocalStorageKeys } from "@/utils/localStorage";
import LoginModal from "@/components/ui/booking/modals/LoginModal/LoginModal";
import { CartServiceItem } from "@/components/ui/booking/modals/CartModal";

export interface MealOption {
  id: string;
  name: string;
  count: number;
}

export interface CookingServiceConfiguration {
  mealType: "basic" | "standard" | "premium";
  deliveryFrequency: "daily" | "weekly" | "monthly";
  meals: MealOption[];
}

export interface CookingServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceImage?: string;
  serviceTitle?: string;
  serviceDescription?: string;
  servicePrice?: number;
  includedFeatures?: string[];
  onOrderSubmit?: (configuration: CookingServiceConfiguration) => void;
  serviceOption?: ServiceOption;
  service: Service;
}

const CookingServiceModal: React.FC<CookingServiceModalProps> = ({
  isOpen,
  onClose,
  serviceImage = "/images/home/hero.jpg",
  serviceTitle = "Cooking Service",
  serviceDescription = "Professional cooking service",
  servicePrice = 0,
  includedFeatures = [],
  onOrderSubmit,
  serviceOption,
  service,
}) => {
  // State for cooking configuration
  const [mealType, setMealType] = useState<"basic" | "standard" | "premium">(
    "standard"
  );
  const [deliveryFrequency, setDeliveryFrequency] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [meals, setMeals] = useState<MealOption[]>([
    { id: "breakfast", name: "Breakfast", count: 1 },
    { id: "lunch", name: "Lunch", count: 1 },
    { id: "dinner", name: "Dinner", count: 1 },
  ]);

  // State for checkout modal and slide panel
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { itemCount } = useCart();
  const { addToCart, setCartOpen } = useCartActions();

  const { handleCreateBooking, isCreatingBooking } = useBookingOperations();

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!service) return 0;

    let totalPrice = service.price;
    const totalMeals = getTotalMealCount();

    // Base price multiplier based on meal type
    let typeMultiplier = 1;
    switch (mealType) {
      case "basic":
        typeMultiplier = 1;
        break;
      case "standard":
        typeMultiplier = 1.5;
        break;
      case "premium":
        typeMultiplier = 2.5;
        break;
    }

    // Frequency multiplier
    let frequencyMultiplier = 1;
    switch (deliveryFrequency) {
      case "daily":
        frequencyMultiplier = 1;
        break;
      case "weekly":
        frequencyMultiplier = 7;
        break;
      case "monthly":
        frequencyMultiplier = 30;
        break;
    }

    // Price calculation: base price * meals * type * frequency
    totalPrice =
      service.price * totalMeals * typeMultiplier * frequencyMultiplier;

    return totalPrice;
  };

  // Handle meal type change
  const handleMealTypeChange = (type: "basic" | "standard" | "premium") => {
    setMealType(type);
  };

  // Handle delivery frequency change
  const handleDeliveryFrequencyChange = (
    frequency: "daily" | "weekly" | "monthly"
  ) => {
    setDeliveryFrequency(frequency);
  };

  // Handle meal counter changes
  const handleMealCounterChange = (mealId: string, increment: boolean) => {
    setMeals((prev) =>
      prev.map((meal) => {
        if (meal.id === mealId) {
          const newCount = increment
            ? meal.count + 1
            : Math.max(0, meal.count - 1);
          return { ...meal, count: newCount };
        }
        return meal;
      })
    );
  };

  // Calculate total meal count
  const getTotalMealCount = () => {
    return meals.reduce((total, meal) => total + meal.count, 0);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const configuration: CookingServiceConfiguration = {
      mealType,
      deliveryFrequency,
      meals,
    };

    // Create cart item with cooking service configuration
    const cartItem: CartServiceItem = {
      ...service,
      quantity: 1,
      selectedVariants: [
        `Meal Type: ${mealType}`,
        `Frequency: ${deliveryFrequency}`,
        `Total Meals: ${getTotalMealCount()}`,
        ...meals
          .filter((meal) => meal.count > 0)
          .map((meal) => `${meal.name}: ${meal.count}`),
      ],
      // Add custom price based on configuration
      price: calculateTotalPrice(),
    };

    // Add to cart
    addToCart(cartItem);

    // Show cart modal
    setShowCartModal(true);
    setCartOpen(true);
  };

  // Handle order submission (direct checkout)
  const handleOrderSubmit = () => {
    setError(null); // Clear any previous errors when starting new order
    const configuration: CookingServiceConfiguration = {
      mealType,
      deliveryFrequency,
      meals,
    };

    if (onOrderSubmit) {
      onOrderSubmit(configuration);
    }

    setIsCheckoutModalOpen(true);
    setIsSlidePanelOpen(true);
  };

  // Handle checkout completion
  const handleCheckoutComplete = async (
    formData: CheckoutFormData,
    finalTotalPrice: number,
    onContinuePayment: (bookingId: string) => void
  ) => {
    if (!formData) return;
    try {
      setError(null); // Clear any previous errors
      const completeOrder: CreateBookingInput = {
        serviceId: service._id,
        service_category: service.category,
        serviceOption: serviceOption?.service_id || ServiceId.StandardCooking,
        date: formData.date,
        timeSlot: formData.timeSlot,
        address: formData.addressId || "",
        notes: `Meal Type: ${mealType}, Frequency: ${deliveryFrequency}, Meals: ${meals.map((m) => `${m.name}(${m.count})`).join(", ")}`,
        serviceDetails: {
          serviceOption: serviceOption?.service_id || ServiceId.StandardCooking,
          cooking: {
            mealType: mealType === "basic" ? MealType.Basic : MealType.Standard,
            mealsPerDelivery: meals
              .filter((meal) => meal.count > 0)
              .map((meal) => ({
                count: meal.count,
                day: ScheduleDays.Monday, // Default to Monday, could be made configurable
              })),
          },
        },
        totalPrice: finalTotalPrice,
      };

      if (isAuthenticated) {
        const bookingResponse = await handleCreateBooking(completeOrder);
        const booking = bookingResponse;
        onContinuePayment(bookingResponse || "");
        //setShowOrderSuccessModal(true);
      } else {
        localStorage.setItem(
          LocalStorageKeys.BOOKING_DATA_TO_COMPLETE,
          JSON.stringify(completeOrder)
        );
        setShowLoginModal(true);
      }
      console.log("Complete cooking order:", completeOrder);
    } catch (error) {
      console.error("Error creating booking:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while creating your booking. Please try again.";
      setError(errorMessage);
    }
  };

  // Handle checkout modal close
  const handleCheckoutClose = () => {
    setIsCheckoutModalOpen(false);
    setIsSlidePanelOpen(false);
  };

  // Handle slide panel close
  const handleSlidePanelClose = () => {
    setIsSlidePanelOpen(false);
  };

  // Handle slide panel open
  const handleSlidePanelOpen = () => {
    setIsSlidePanelOpen(true);
  };

  // Handle cart modal close
  const handleCartModalClose = () => {
    setShowCartModal(false);
    setCartOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        maxWidth="800px"
        showCloseButton={true}
        className={styles.cookingServiceModal}
      >
        <div className={styles.modal__container}>
          {/* Details Section */}
          <div className={styles.modal__detailsSection}>
            {/* Service Title and Description */}
            <h2 className={styles.modal__title}>{serviceOption?.label}</h2>
            <p className={styles.modal__description}>
              {serviceOption?.description}
            </p>

            {/* Configuration Section */}
            <div className={styles.modal__configurationSection}>
              {/* Meal Type Selection */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Meal Type</h3>
                <div className={styles.mealTypeOptions}>
                  <label
                    className={`${styles.mealTypeOption} ${
                      mealType === "basic" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="mealType"
                      value="basic"
                      checked={mealType === "basic"}
                      onChange={() => handleMealTypeChange("basic")}
                      className={styles.radioInput}
                    />
                    <span>Basic - Simple, nutritious meals</span>
                  </label>
                  <label
                    className={`${styles.mealTypeOption} ${
                      mealType === "standard" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="mealType"
                      value="standard"
                      checked={mealType === "standard"}
                      onChange={() => handleMealTypeChange("standard")}
                      className={styles.radioInput}
                    />
                    <span>Standard - Balanced, flavorful meals</span>
                  </label>
                  <label
                    className={`${styles.mealTypeOption} ${
                      mealType === "premium" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="mealType"
                      value="premium"
                      checked={mealType === "premium"}
                      onChange={() => handleMealTypeChange("premium")}
                      className={styles.radioInput}
                    />
                    <span>Premium - Gourmet, restaurant-quality meals</span>
                  </label>
                </div>
              </div>

              {/* Delivery Frequency */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Delivery Frequency</h3>
                <div className={styles.deliveryFrequencyOptions}>
                  <label
                    className={`${styles.deliveryFrequencyOption} ${
                      deliveryFrequency === "daily" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryFrequency"
                      value="daily"
                      checked={deliveryFrequency === "daily"}
                      onChange={() => handleDeliveryFrequencyChange("daily")}
                      className={styles.radioInput}
                    />
                    <span>Daily - Fresh meals every day</span>
                  </label>
                  <label
                    className={`${styles.deliveryFrequencyOption} ${
                      deliveryFrequency === "weekly" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryFrequency"
                      value="weekly"
                      checked={deliveryFrequency === "weekly"}
                      onChange={() => handleDeliveryFrequencyChange("weekly")}
                      className={styles.radioInput}
                    />
                    <span>Weekly - Meal prep for the week</span>
                  </label>
                  <label
                    className={`${styles.deliveryFrequencyOption} ${
                      deliveryFrequency === "monthly" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryFrequency"
                      value="monthly"
                      checked={deliveryFrequency === "monthly"}
                      onChange={() => handleDeliveryFrequencyChange("monthly")}
                      className={styles.radioInput}
                    />
                    <span>Monthly - Bulk meal planning</span>
                  </label>
                </div>
              </div>

              {/* Meal Selection */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Select Meals</h3>
                <div className={styles.mealsGrid}>
                  {meals.map((meal) => (
                    <div key={meal.id} className={styles.mealCounter}>
                      <span className={styles.mealName}>{meal.name}</span>
                      <div className={styles.counterControls}>
                        <button
                          className={styles.counterButton}
                          onClick={() =>
                            handleMealCounterChange(meal.id, false)
                          }
                          aria-label={`Decrement ${meal.name}`}
                        >
                          -
                        </button>
                        <span className={styles.counterValue}>
                          {meal.count}
                        </span>
                        <button
                          className={styles.counterButton}
                          onClick={() => handleMealCounterChange(meal.id, true)}
                          aria-label={`Increment ${meal.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.totalMeals}>
                  Total Meals: {getTotalMealCount()}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.modal__actionButtons}>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleAddToCart}
                className={styles.modal__addToCartButton}
              >
                ADD TO CART
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleOrderSubmit}
                className={styles.modal__orderButton}
              >
                ORDER NOW
              </Button>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={handleCheckoutClose}
          onCheckout={handleCheckoutComplete}
          service_category="Cooking"
          submitting={isCreatingBooking}
          error={error}
          onClearError={() => setError(null)}
          totalPrice={calculateTotalPrice()}
        />

        {/* Service Details Slide Panel */}
        <ServiceDetailsSlidePanel
          isOpen={isSlidePanelOpen}
          onClose={handleSlidePanelClose}
          onOpen={handleSlidePanelOpen}
          serviceTitle={serviceTitle}
          serviceDescription={serviceDescription}
          servicePrice={calculateTotalPrice()}
          serviceImage={serviceImage}
          service_category="Cooking"
          includedFeatures={includedFeatures}
          apartmentType={undefined}
          roomCount={getTotalMealCount()}
        />

        {/* Order Success Modal */}
        <OrderSuccessModal
          isOpen={showOrderSuccessModal}
          onClose={() => {
            setShowOrderSuccessModal(false);
            onClose();
          }}
        />

        {/* Cart Modal */}
        <ReduxCartModal
          isOpen={showCartModal}
          onClose={handleCartModalClose}
          onCheckout={handleCheckoutComplete}
        />

        {!isAuthenticated && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => {
              setShowLoginModal(false);
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default CookingServiceModal;
