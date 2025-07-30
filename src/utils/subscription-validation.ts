import {
  ServiceCategory,
  SubscriptionFrequency,
  BillingCycle,
  Service,
} from "@/graphql/api";
import { ServiceConfiguration } from "@/app/(routes)/(app)/admin/subscriptions/add/types/subscription";

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validates service frequency based on service category
 */
export const validateServiceFrequency = (
  category: ServiceCategory,
  frequency: SubscriptionFrequency
): ValidationError | null => {
  switch (category) {
    case ServiceCategory.Cleaning:
    case ServiceCategory.Laundry:
      if (
        ![
          SubscriptionFrequency.Weekly,
          SubscriptionFrequency.BiWeekly,
          SubscriptionFrequency.Monthly,
        ].includes(frequency)
      ) {
        return {
          field: "frequency",
          message: `${category} services can only be weekly, bi-weekly, or monthly`,
          code: "INVALID_FREQUENCY_FOR_CATEGORY",
        };
      }
      break;

    case ServiceCategory.Cooking:
      if (
        ![
          SubscriptionFrequency.Weekly,
          SubscriptionFrequency.BiWeekly,
        ].includes(frequency)
      ) {
        return {
          field: "frequency",
          message: "Cooking services can only be weekly or bi-weekly",
          code: "INVALID_COOKING_FREQUENCY",
        };
      }
      break;

    case ServiceCategory.PestControl:
      if (frequency !== SubscriptionFrequency.Quarterly) {
        return {
          field: "frequency",
          message: "Pest control services must be quarterly",
          code: "INVALID_PEST_CONTROL_FREQUENCY",
        };
      }
      break;

    case ServiceCategory.Errands:
      // Errands can have any frequency
      break;

    default:
      break;
  }

  return null;
};

/**
 * Validates billing cycle alignment with service categories
 */
export const validateBillingCycleAlignment = (
  services: Array<{ category: ServiceCategory }>,
  billingCycle: BillingCycle
): ValidationError | null => {
  const hasCleaningLaundryOrCooking = services.some(
    (service) =>
      service.category === ServiceCategory.Cleaning ||
      service.category === ServiceCategory.Laundry ||
      service.category === ServiceCategory.Cooking
  );

  const hasPestControl = services.some(
    (service) => service.category === ServiceCategory.PestControl
  );

  // If subscription has cleaning, laundry, or cooking services, billing must be monthly
  if (hasCleaningLaundryOrCooking && billingCycle !== BillingCycle.Monthly) {
    return {
      field: "billingCycle",
      message: "Cleaning, laundry, and cooking services require monthly billing",
      code: "INVALID_BILLING_CYCLE_FOR_SERVICES",
    };
  }

  // If subscription has pest control services, billing must be quarterly
  if (hasPestControl && billingCycle !== BillingCycle.Quarterly) {
    return {
      field: "billingCycle",
      message: "Pest control services require quarterly billing",
      code: "INVALID_PEST_CONTROL_BILLING",
    };
  }

  // Cannot mix services that require different billing cycles
  if (hasCleaningLaundryOrCooking && hasPestControl) {
    return {
      field: "services",
      message: "Cannot combine pest control with cleaning, laundry, or cooking services in the same subscription",
      code: "INCOMPATIBLE_SERVICE_BILLING_CYCLES",
    };
  }

  return null;
};

/**
 * Validates minimum duration based on billing cycle
 */
export const validateMinimumDuration = (
  billingCycle: BillingCycle,
  duration: number
): ValidationError | null => {
  switch (billingCycle) {
    case BillingCycle.Monthly:
      if (duration < 1) {
        return {
          field: "duration",
          message: "Monthly billing requires a minimum duration of 1 month",
          code: "INVALID_MONTHLY_DURATION",
        };
      }
      break;

    case BillingCycle.Quarterly:
      if (duration < 3) {
        return {
          field: "duration",
          message: "Quarterly billing requires a minimum duration of 3 months",
          code: "INVALID_QUARTERLY_DURATION",
        };
      }
      break;

    default:
      break;
  }

  return null;
};

/**
 * Validates a complete subscription configuration
 */
export const validateSubscription = (
  services: Service[],
  serviceConfigurations: Map<string, ServiceConfiguration>,
  billingCycle: BillingCycle,
  duration: number
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate each service configuration
  services.forEach((service) => {
    const config = serviceConfigurations.get(service._id);
    if (!config) {
      errors.push({
        field: "serviceConfiguration",
        message: `Configuration missing for service: ${service.name}`,
        code: "MISSING_SERVICE_CONFIGURATION",
      });
      return;
    }

    // Validate service frequency
    const frequencyError = validateServiceFrequency(
      service.category,
      config.frequency
    );
    if (frequencyError) {
      errors.push({
        ...frequencyError,
        message: `${service.name}: ${frequencyError.message}`,
      });
    }
  });

  // Validate billing cycle alignment
  const billingAlignmentError = validateBillingCycleAlignment(
    services,
    billingCycle
  );
  if (billingAlignmentError) {
    errors.push(billingAlignmentError);
  }

  // Validate minimum duration
  const durationError = validateMinimumDuration(billingCycle, duration);
  if (durationError) {
    errors.push(durationError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Gets allowed frequencies for a service category
 */
export const getAllowedFrequencies = (
  category: ServiceCategory
): SubscriptionFrequency[] => {
  switch (category) {
    case ServiceCategory.Cleaning:
    case ServiceCategory.Laundry:
      return [
        SubscriptionFrequency.Weekly,
        SubscriptionFrequency.BiWeekly,
        SubscriptionFrequency.Monthly,
      ];

    case ServiceCategory.Cooking:
      return [
        SubscriptionFrequency.Weekly,
        SubscriptionFrequency.BiWeekly,
      ];

    case ServiceCategory.PestControl:
      return [SubscriptionFrequency.Quarterly];

    case ServiceCategory.Errands:
      return [
        SubscriptionFrequency.Daily,
        SubscriptionFrequency.Weekly,
        SubscriptionFrequency.BiWeekly,
        SubscriptionFrequency.Monthly,
      ];

    default:
      return [
        SubscriptionFrequency.Weekly,
        SubscriptionFrequency.BiWeekly,
        SubscriptionFrequency.Monthly,
      ];
  }
};

/**
 * Gets required billing cycle for service categories
 */
export const getRequiredBillingCycle = (
  categories: ServiceCategory[]
): BillingCycle | null => {
  const hasCleaningLaundryOrCooking = categories.some(
    (category) =>
      category === ServiceCategory.Cleaning ||
      category === ServiceCategory.Laundry ||
      category === ServiceCategory.Cooking
  );

  const hasPestControl = categories.some(
    (category) => category === ServiceCategory.PestControl
  );

  if (hasCleaningLaundryOrCooking && hasPestControl) {
    // Incompatible combination
    return null;
  }

  if (hasCleaningLaundryOrCooking) {
    return BillingCycle.Monthly;
  }

  if (hasPestControl) {
    return BillingCycle.Quarterly;
  }

  // Default to monthly for other services
  return BillingCycle.Monthly;
};

/**
 * Gets minimum duration for a billing cycle
 */
export const getMinimumDuration = (billingCycle: BillingCycle): number => {
  switch (billingCycle) {
    case BillingCycle.Monthly:
      return 1;
    case BillingCycle.Quarterly:
      return 3;
    default:
      return 1;
  }
};