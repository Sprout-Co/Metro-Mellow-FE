import {
  Service,
  ServiceCategory,
  CleaningType,
  HouseType,
  LaundryType,
  MealType,
  Severity,
  TreatmentType,
  RoomQuantitiesInput,
  LaundryItemsInput,
  SubscriptionFrequency,
  BillingCycle,
} from "@/graphql/api";
import { ServiceConfiguration } from "@/app/(routes)/(app)/admin/subscriptions/add/types/subscription";

// Base pricing multipliers for different service types
const PRICING_MULTIPLIERS = {
  // Cleaning multipliers
  [CleaningType.StandardCleaning]: 1.0,
  [CleaningType.DeepCleaning]: 1.5,
  [CleaningType.MoveInMoveOutCleaning]: 2.0,
  [CleaningType.PostConstructionCleaning]: 2.5,

  // House type multipliers
  [HouseType.Flat]: 1.0,
  [HouseType.Duplex]: 1.3,

  // Laundry type multipliers
  [LaundryType.StandardLaundry]: 1.0,
  [LaundryType.PremiumLaundry]: 1.4,
  [LaundryType.DryCleaning]: 1.8,

  // Meal type multipliers
  [MealType.Basic]: 1.0,
  [MealType.Standard]: 1.3,

  // Pest control severity multipliers
  [Severity.Low]: 1.0,
  [Severity.Medium]: 1.2,
  [Severity.High]: 1.5,

  // Pest control treatment type multipliers
  [TreatmentType.Residential]: 1.0,
  [TreatmentType.Commercial]: 1.4,
};

// Item-specific pricing for laundry
const LAUNDRY_ITEM_PRICES = {
  shirts: 500, // ₦500 per shirt
  pants: 800, // ₦800 per pant
  dresses: 1200, // ₦1200 per dress
  suits: 2000, // ₦2000 per suit
  others: 600, // ₦600 per other item
};

// Room-specific pricing (if not available from service.roomPrices)
const DEFAULT_ROOM_PRICES = {
  bedroom: 2000, // ₦2000 per bedroom
  livingRoom: 2500, // ₦2500 per living room
  bathroom: 1500, // ₦1500 per bathroom
  kitchen: 2000, // ₦2000 per kitchen
  balcony: 1000, // ₦1000 per balcony
  studyRoom: 1800, // ₦1800 per study room
  lobby: 3000, // ₦3000 per lobby
  outdoor: 1500, // ₦1500 per outdoor area
  other: 1200, // ₦1200 per other room
};

// Pest control area pricing
const PEST_CONTROL_AREA_PRICES: Record<string, number> = {
  "Living Room": 1500,
  Kitchen: 1200,
  Bathroom: 800,
  Bedroom: 1000,
  "Dining Room": 1200,
  Study: 1000,
  Balcony: 600,
  Garden: 800,
};

/**
 * Calculate the total price for a service configuration
 */
export function calculateServicePrice(
  service: Service,
  config: ServiceConfiguration
): number {
  let basePrice = config.price || service.price || 0;

  // If a service option is selected, use its price as base
  if (config.selectedOption) {
    const selectedOption = service.options?.find(
      (option) => option.id === config.selectedOption
    );
    if (selectedOption) {
      basePrice = selectedOption.price;
    }
  }

  // Apply service-specific pricing calculations
  let calculatedPrice = 0;
  switch (service.category) {
    case ServiceCategory.Cleaning:
      calculatedPrice = calculateCleaningPrice(service, config, basePrice);
      break;
    case ServiceCategory.Laundry:
      calculatedPrice = calculateLaundryPrice(service, config, basePrice);
      break;
    case ServiceCategory.Cooking:
      calculatedPrice = calculateCookingPrice(service, config, basePrice);
      break;
    case ServiceCategory.PestControl:
      calculatedPrice = calculatePestControlPrice(service, config, basePrice);
      break;
    default:
      calculatedPrice = basePrice;
  }

  // Apply day count multiplier - price scales with number of days selected
  const dayMultiplier = config.scheduledDays.length;
  return calculatedPrice * dayMultiplier;
}

/**
 * Calculate cleaning service price based on rooms, house type, and cleaning type
 */
function calculateCleaningPrice(
  service: Service,
  config: ServiceConfiguration,
  basePrice: number
): number {
  if (!config.cleaning) return basePrice;

  const { cleaningType, houseType, rooms } = config.cleaning;

  // Get room prices from service or use defaults
  const apiRoomPrices = service.roomPrices;
  const roomPrices = apiRoomPrices
    ? {
        bedroom: apiRoomPrices.bedroom,
        livingRoom: apiRoomPrices.livingRoom,
        bathroom: apiRoomPrices.bathroom,
        kitchen: apiRoomPrices.kitchen,
        balcony: apiRoomPrices.balcony,
        studyRoom: apiRoomPrices.study, // API has 'study', we use 'studyRoom'
        lobby: apiRoomPrices.lobby,
        outdoor: apiRoomPrices.outdoor,
        other: DEFAULT_ROOM_PRICES.other, // API doesn't have 'other', use default
      }
    : DEFAULT_ROOM_PRICES;

  // Calculate total room cost
  let totalRoomCost = 0;
  Object.entries(rooms).forEach(([roomKey, quantity]) => {
    const roomPrice = roomPrices[roomKey as keyof typeof roomPrices] || 0;
    totalRoomCost += roomPrice * quantity;
  });

  // Apply multipliers
  const cleaningMultiplier = PRICING_MULTIPLIERS[cleaningType] || 1.0;
  const houseMultiplier = PRICING_MULTIPLIERS[houseType] || 1.0;

  return totalRoomCost * cleaningMultiplier * houseMultiplier;
}

/**
 * Calculate laundry service price based on bags, items, and laundry type
 */
function calculateLaundryPrice(
  service: Service,
  config: ServiceConfiguration,
  basePrice: number
): number {
  if (!config.laundry) return basePrice;

  const { bags, items, laundryType } = config.laundry;

  // Calculate base cost per bag
  const baseCostPerBag = basePrice;

  // Calculate item-specific costs if provided
  let itemCost = 0;
  if (items) {
    Object.entries(items).forEach(([itemType, quantity]) => {
      const itemPrice =
        LAUNDRY_ITEM_PRICES[itemType as keyof typeof LAUNDRY_ITEM_PRICES] || 0;
      itemCost += itemPrice * quantity;
    });
  }

  // Apply laundry type multiplier
  const laundryMultiplier = PRICING_MULTIPLIERS[laundryType] || 1.0;

  // Use item cost if available, otherwise use bag-based pricing
  const totalCost = itemCost > 0 ? itemCost : baseCostPerBag * bags;

  return totalCost * laundryMultiplier;
}

/**
 * Calculate cooking service price based on meal type and deliveries
 */
function calculateCookingPrice(
  service: Service,
  config: ServiceConfiguration,
  basePrice: number
): number {
  if (!config.cooking) return basePrice;

  const { mealType, mealsPerDelivery } = config.cooking;

  // Calculate total meals per week
  const totalMealsPerWeek = mealsPerDelivery.reduce(
    (total, delivery) => total + delivery.count,
    0
  );

  // Apply meal type multiplier
  const mealMultiplier = PRICING_MULTIPLIERS[mealType] || 1.0;

  // Base price is per meal, multiply by total meals
  return basePrice * totalMealsPerWeek * mealMultiplier;
}

/**
 * Calculate pest control service price based on areas, severity, and treatment type
 */
function calculatePestControlPrice(
  service: Service,
  config: ServiceConfiguration,
  basePrice: number
): number {
  if (!config.pestControl) return basePrice;

  const { areas, severity, treatmentType } = config.pestControl;

  // Calculate area costs
  let totalAreaCost = 0;
  areas.forEach((area) => {
    const areaPrice = PEST_CONTROL_AREA_PRICES[area] || 1000; // Default ₦1000
    totalAreaCost += areaPrice;
  });

  // Apply multipliers
  const severityMultiplier = PRICING_MULTIPLIERS[severity] || 1.0;
  const treatmentMultiplier = PRICING_MULTIPLIERS[treatmentType] || 1.0;

  return totalAreaCost * severityMultiplier * treatmentMultiplier;
}

/**
 * Get a breakdown of the pricing calculation for display purposes
 */
export function getPricingBreakdown(
  service: Service,
  config: ServiceConfiguration
): {
  basePrice: number;
  adjustments: Array<{ label: string; amount: number; multiplier?: number }>;
  totalPrice: number;
} {
  const basePrice = config.price || service.price || 0;
  const adjustments: Array<{
    label: string;
    amount: number;
    multiplier?: number;
  }> = [];
  let totalPrice = basePrice;

  switch (service.category) {
    case ServiceCategory.Cleaning:
      if (config.cleaning) {
        const { cleaningType, houseType, rooms } = config.cleaning;

        // Room costs
        const apiRoomPrices = service.roomPrices;
        const roomPrices = apiRoomPrices
          ? {
              bedroom: apiRoomPrices.bedroom,
              livingRoom: apiRoomPrices.livingRoom,
              bathroom: apiRoomPrices.bathroom,
              kitchen: apiRoomPrices.kitchen,
              balcony: apiRoomPrices.balcony,
              studyRoom: apiRoomPrices.study, // API has 'study', we use 'studyRoom'
              lobby: apiRoomPrices.lobby,
              outdoor: apiRoomPrices.outdoor,
              other: DEFAULT_ROOM_PRICES.other, // API doesn't have 'other', use default
            }
          : DEFAULT_ROOM_PRICES;

        Object.entries(rooms).forEach(([roomKey, quantity]) => {
          if (quantity > 0) {
            const roomPrice =
              roomPrices[roomKey as keyof typeof roomPrices] || 0;
            const roomCost = roomPrice * quantity;
            adjustments.push({
              label: `${roomKey} (${quantity}x)`,
              amount: roomCost,
            });
          }
        });

        // Multipliers
        const cleaningMultiplier = PRICING_MULTIPLIERS[cleaningType] || 1.0;
        const houseMultiplier = PRICING_MULTIPLIERS[houseType] || 1.0;

        if (cleaningMultiplier !== 1.0) {
          adjustments.push({
            label: `${cleaningType} multiplier`,
            amount: 0,
            multiplier: cleaningMultiplier,
          });
        }

        if (houseMultiplier !== 1.0) {
          adjustments.push({
            label: `${houseType} multiplier`,
            amount: 0,
            multiplier: houseMultiplier,
          });
        }
      }
      break;

    case ServiceCategory.Laundry:
      if (config.laundry) {
        const { bags, items, laundryType } = config.laundry;

        if (items) {
          Object.entries(items).forEach(([itemType, quantity]) => {
            if (quantity > 0) {
              const itemPrice =
                LAUNDRY_ITEM_PRICES[
                  itemType as keyof typeof LAUNDRY_ITEM_PRICES
                ] || 0;
              const itemCost = itemPrice * quantity;
              adjustments.push({
                label: `${itemType} (${quantity}x)`,
                amount: itemCost,
              });
            }
          });
        } else {
          adjustments.push({
            label: `Bags (${bags})`,
            amount: basePrice * bags,
          });
        }

        const laundryMultiplier = PRICING_MULTIPLIERS[laundryType] || 1.0;
        if (laundryMultiplier !== 1.0) {
          adjustments.push({
            label: `${laundryType} multiplier`,
            amount: 0,
            multiplier: laundryMultiplier,
          });
        }
      }
      break;

    case ServiceCategory.Cooking:
      if (config.cooking) {
        const { mealType, mealsPerDelivery } = config.cooking;

        mealsPerDelivery.forEach((delivery) => {
          if (delivery.count > 0) {
            adjustments.push({
              label: `${delivery.day} (${delivery.count} meals)`,
              amount: basePrice * delivery.count,
            });
          }
        });

        const mealMultiplier = PRICING_MULTIPLIERS[mealType] || 1.0;
        if (mealMultiplier !== 1.0) {
          adjustments.push({
            label: `${mealType} multiplier`,
            amount: 0,
            multiplier: mealMultiplier,
          });
        }
      }
      break;

    case ServiceCategory.PestControl:
      if (config.pestControl) {
        const { areas, severity, treatmentType } = config.pestControl;

        areas.forEach((area) => {
          const areaPrice = PEST_CONTROL_AREA_PRICES[area] || 1000;
          adjustments.push({
            label: area,
            amount: areaPrice,
          });
        });

        const severityMultiplier = PRICING_MULTIPLIERS[severity] || 1.0;
        const treatmentMultiplier = PRICING_MULTIPLIERS[treatmentType] || 1.0;

        if (severityMultiplier !== 1.0) {
          adjustments.push({
            label: `${severity} severity multiplier`,
            amount: 0,
            multiplier: severityMultiplier,
          });
        }

        if (treatmentMultiplier !== 1.0) {
          adjustments.push({
            label: `${treatmentType} multiplier`,
            amount: 0,
            multiplier: treatmentMultiplier,
          });
        }
      }
      break;
  }

  // Calculate total with multipliers
  let subtotal = adjustments.reduce((sum, adj) => sum + adj.amount, 0);
  adjustments.forEach((adj) => {
    if (adj.multiplier && adj.multiplier !== 1.0) {
      subtotal *= adj.multiplier;
    }
  });

  // Apply day count multiplier
  const dayMultiplier = config.scheduledDays.length;
  if (dayMultiplier > 0) {
    adjustments.push({
      label: `Scheduled Days (${dayMultiplier} days)`,
      amount: 0,
      multiplier: dayMultiplier,
    });
    subtotal *= dayMultiplier;
  }

  totalPrice = subtotal;

  return {
    basePrice,
    adjustments,
    totalPrice,
  };
}

/**
 * Calculate the number of services performed within a billing cycle
 * based on service frequency and billing cycle
 */
export function calculateServicesPerBillingCycle(
  serviceFrequency: SubscriptionFrequency,
  scheduledDaysCount: number,
  billingCycle: BillingCycle
): number {
  const servicesPerPeriod = scheduledDaysCount;

  switch (serviceFrequency) {
    case SubscriptionFrequency.Daily:
      return servicesPerPeriod * getDaysInBillingCycle(billingCycle);
    case SubscriptionFrequency.Weekly:
      return servicesPerPeriod * getWeeksInBillingCycle(billingCycle);
    case SubscriptionFrequency.BiWeekly:
      return servicesPerPeriod * getBiWeeksInBillingCycle(billingCycle);
    case SubscriptionFrequency.Monthly:
      return servicesPerPeriod * getMonthsInBillingCycle(billingCycle);
    case SubscriptionFrequency.Quarterly:
      return servicesPerPeriod * getQuartersInBillingCycle(billingCycle);
    default:
      return 0;
  }
}

/**
 * Helper functions to calculate periods within billing cycles
 */
function getDaysInBillingCycle(billingCycle: BillingCycle): number {
  switch (billingCycle) {
    case BillingCycle.Weekly:
      return 7;
    case BillingCycle.BiWeekly:
      return 14;
    case BillingCycle.Monthly:
      return 30; // Average days per month
    case BillingCycle.Quarterly:
      return 90; // Average days per quarter
    default:
      return 0;
  }
}

function getWeeksInBillingCycle(billingCycle: BillingCycle): number {
  switch (billingCycle) {
    case BillingCycle.Weekly:
      return 1;
    case BillingCycle.BiWeekly:
      return 2;
    case BillingCycle.Monthly:
      return 4; // Average weeks per month
    case BillingCycle.Quarterly:
      return 12; // Average weeks per quarter
    default:
      return 0;
  }
}

function getBiWeeksInBillingCycle(billingCycle: BillingCycle): number {
  switch (billingCycle) {
    case BillingCycle.Weekly:
      return 0.5; // Half a bi-week
    case BillingCycle.BiWeekly:
      return 1;
    case BillingCycle.Monthly:
      return 2; // Average bi-weeks per month
    case BillingCycle.Quarterly:
      return 6; // Average bi-weeks per quarter
    default:
      return 0;
  }
}

function getMonthsInBillingCycle(billingCycle: BillingCycle): number {
  switch (billingCycle) {
    case BillingCycle.Weekly:
      return 0.25; // Quarter of a month
    case BillingCycle.BiWeekly:
      return 0.5; // Half a month
    case BillingCycle.Monthly:
      return 1;
    case BillingCycle.Quarterly:
      return 3;
    default:
      return 0;
  }
}

function getQuartersInBillingCycle(billingCycle: BillingCycle): number {
  switch (billingCycle) {
    case BillingCycle.Weekly:
      return 0.083; // 1/12 of a quarter
    case BillingCycle.BiWeekly:
      return 0.167; // 1/6 of a quarter
    case BillingCycle.Monthly:
      return 0.333; // 1/3 of a quarter
    case BillingCycle.Quarterly:
      return 1;
    default:
      return 0;
  }
}

/**
 * Calculate the total billing amount for a billing cycle
 * This is the correct way to calculate billing based on service frequency
 */
export function calculateBillingCycleAmount(
  service: Service,
  config: ServiceConfiguration,
  billingCycle: BillingCycle
): number {
  // Calculate the price for one service instance
  const servicePrice = calculateServicePrice(service, config);

  // Calculate how many services are performed in this billing cycle
  const servicesPerBillingCycle = calculateServicesPerBillingCycle(
    config.frequency,
    config.scheduledDays.length,
    billingCycle
  );

  return servicePrice * servicesPerBillingCycle;
}

/**
 * Calculate total subscription cost for the entire duration
 */
export function calculateTotalSubscriptionCost(
  service: Service,
  config: ServiceConfiguration,
  billingCycle: BillingCycle,
  duration: number
): number {
  const billingCycleAmount = calculateBillingCycleAmount(
    service,
    config,
    billingCycle
  );

  // Calculate number of billing cycles in the duration
  const billingCyclesInDuration = getBillingCyclesInDuration(
    billingCycle,
    duration
  );

  return billingCycleAmount * billingCyclesInDuration;
}

/**
 * Calculate how many billing cycles occur within the subscription duration
 */
function getBillingCyclesInDuration(
  billingCycle: BillingCycle,
  duration: number
): number {
  switch (billingCycle) {
    case BillingCycle.Weekly:
      return duration; // Duration is in weeks
    case BillingCycle.BiWeekly:
      return Math.ceil(duration / 2); // Duration is in weeks, convert to bi-weeks
    case BillingCycle.Monthly:
      return duration; // Duration is in months
    case BillingCycle.Quarterly:
      return Math.ceil(duration / 3); // Duration is in months, convert to quarters
    default:
      return duration;
  }
}
