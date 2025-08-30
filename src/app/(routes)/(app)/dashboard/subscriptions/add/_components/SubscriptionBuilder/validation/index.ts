// Validation utilities for subscription builder
import {
  Service,
  ServiceCategory,
  SubscriptionServiceInput,
  ScheduleDays,
  TimeSlot,
  SubscriptionFrequency,
  HouseType,
  CleaningType,
} from "@/graphql/api";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Service configuration validation
export const validateServiceConfiguration = (
  configuration: SubscriptionServiceInput,
  service: Service
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Basic required fields
  if (!configuration.serviceId) {
    errors.push({ field: "serviceId", message: "Service ID is required" });
  }

  if (!configuration.frequency) {
    errors.push({
      field: "frequency",
      message: "Service frequency is required",
    });
  }

  if (
    !configuration.scheduledDays ||
    configuration.scheduledDays.length === 0
  ) {
    errors.push({
      field: "scheduledDays",
      message: "At least one day must be selected",
    });
  }

  // Validate day selection restrictions based on frequency and service type
  if (configuration.scheduledDays && configuration.scheduledDays.length > 0) {
    const shouldLimitToOneDay =
      configuration.frequency === SubscriptionFrequency.Monthly ||
      service.category === ServiceCategory.PestControl;

    if (shouldLimitToOneDay && configuration.scheduledDays.length > 1) {
      if (service.category === ServiceCategory.PestControl) {
        errors.push({
          field: "scheduledDays",
          message: "Pest control services can only be scheduled on one day",
        });
      } else if (configuration.frequency === SubscriptionFrequency.Monthly) {
        errors.push({
          field: "scheduledDays",
          message: "Monthly frequency allows only one service day",
        });
      }
    }
  }

  // Validate frequency restrictions for pest control
  if (
    service.category === ServiceCategory.PestControl &&
    configuration.frequency !== SubscriptionFrequency.Monthly
  ) {
    errors.push({
      field: "frequency",
      message: "Pest control services only support monthly frequency",
    });
  }

  if (!configuration.preferredTimeSlot) {
    errors.push({
      field: "preferredTimeSlot",
      message: "Time slot is required",
    });
  }

  // Service-specific validation
  if (service.category === ServiceCategory.Cleaning) {
    if (!configuration.serviceDetails.cleaning) {
      errors.push({
        field: "cleaning",
        message: "Cleaning details are required",
      });
    } else {
      const cleaning = configuration.serviceDetails.cleaning;

      if (!cleaning.houseType) {
        errors.push({
          field: "houseType",
          message: "Property type is required",
        });
      }

      if (!cleaning.cleaningType) {
        errors.push({
          field: "cleaningType",
          message: "Cleaning type is required",
        });
      }

      if (!cleaning.rooms) {
        errors.push({
          field: "rooms",
          message: "Room configuration is required",
        });
      } else {
        const totalRooms = Object.values(cleaning.rooms).reduce(
          (sum, count) => sum + (count || 0),
          0
        );
        if (totalRooms === 0) {
          errors.push({
            field: "rooms",
            message: "At least one room must be selected",
          });
        }
      }
    }
  }

  if (service.category === ServiceCategory.Cooking) {
    if (!configuration.serviceDetails.cooking) {
      errors.push({
        field: "cooking",
        message: "Meal service details are required",
      });
    } else {
      const cooking = configuration.serviceDetails.cooking;

      if (!cooking.mealType) {
        errors.push({ field: "mealType", message: "Meal type is required" });
      }

      if (!cooking.mealsPerDelivery || cooking.mealsPerDelivery.length === 0) {
        errors.push({
          field: "mealsPerDelivery",
          message: "At least one meal delivery must be configured",
        });
      } else {
        const totalMeals = cooking.mealsPerDelivery.reduce(
          (sum, delivery) => sum + (delivery.count || 0),
          0
        );
        if (totalMeals === 0) {
          errors.push({
            field: "mealsPerDelivery",
            message: "At least one meal must be configured",
          });
        }
      }
    }
  }

  // Service option validation (if service has options)
  if (service.options && service.options.length > 0) {
    console.log(service);
    console.log(configuration);
    if (!configuration.serviceDetails.serviceOption) {
      errors.push({
        field: "serviceOption",
        message: "Service package is required",
      });
    } else {
      const validOption = service.options.find(
        (opt) => opt.service_id === configuration.serviceDetails.serviceOption
      );
      if (!validOption) {
        errors.push({
          field: "serviceOption",
          message: "Invalid service package selected",
        });
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Billing configuration validation
export const validateBillingConfiguration = (
  billingCycle: string,
  duration: number
): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!billingCycle) {
    errors.push({
      field: "billingCycle",
      message: "Billing cycle is required",
    });
  }

  if (!duration || duration <= 0) {
    errors.push({
      field: "duration",
      message: "Duration must be greater than 0",
    });
  }

  if (duration > 12) {
    errors.push({
      field: "duration",
      message: "Duration cannot exceed 12 months",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Complete subscription validation
export const validateSubscription = (
  configuredServices: {
    service: Service;
    configuration: SubscriptionServiceInput;
  }[],
  billingCycle: string,
  duration: number
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Must have at least one service
  if (!configuredServices || configuredServices.length === 0) {
    errors.push({
      field: "services",
      message: "At least one service must be configured",
    });
  }

  // Validate billing cycle restrictions based on service types
  if (configuredServices.length > 0) {
    const hasNonPestControlServices = configuredServices.some(
      (cs) => cs.service.category !== ServiceCategory.PestControl
    );

    // If there are non-pest control services (cleaning, laundry, cooking) and quarterly billing is selected
    if (hasNonPestControlServices && billingCycle === "QUARTERLY") {
      errors.push({
        field: "billingCycle",
        message:
          "Cleaning, laundry, and cooking services only support monthly billing",
      });
    }
  }

  // Validate each service configuration
  configuredServices.forEach((configuredService, index) => {
    const serviceValidation = validateServiceConfiguration(
      configuredService.configuration,
      configuredService.service
    );

    if (!serviceValidation.isValid) {
      serviceValidation.errors.forEach((error) => {
        errors.push({
          field: `service_${index}_${error.field}`,
          message: `${configuredService.service.name}: ${error.message}`,
        });
      });
    }
  });

  // Validate billing configuration
  const billingValidation = validateBillingConfiguration(
    billingCycle,
    duration
  );
  if (!billingValidation.isValid) {
    errors.push(...billingValidation.errors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Helper function to get error message for a specific field
export const getFieldError = (
  errors: ValidationError[],
  field: string
): string | null => {
  const error = errors.find((err) => err.field === field);
  return error ? error.message : null;
};

// Helper function to check if field has error
export const hasFieldError = (
  errors: ValidationError[],
  field: string
): boolean => {
  return errors.some((err) => err.field === field);
};
