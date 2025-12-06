import { useState, useEffect, useCallback } from "react";
import {
  DateAvailability,
  SlotAvailability,
  ServiceCategory,
  TimeSlot,
} from "@/graphql/api";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import {
  mapServiceCategoryToEnum,
  formatDateForAPI,
  getSlotAvailabilityForDate,
  getTomorrowDate,
  getMaxDate,
} from "@/utils/slotHelpers";

interface UseSlotAvailabilityOptions {
  isOpen: boolean;
  requiresAvailability: boolean;
  serviceCategory: string;
}

interface UseSlotAvailabilityReturn {
  availableSlots: DateAvailability[];
  loadingSlots: boolean;
  slotError: string | null;
  validatingSlot: boolean;
  slotValidationError: string | null;
  fetchAvailableSlots: () => Promise<void>;
  validateSlotAvailability: (
    date: string,
    timeSlot: TimeSlot
  ) => Promise<boolean>;
  getSelectedDateSlots: (date: string) => SlotAvailability[];
  getAvailableSlotsForPicker: () => DateAvailability[];
  clearSlotValidationError: () => void;
}

export const useSlotAvailability = ({
  isOpen,
  requiresAvailability,
  serviceCategory,
}: UseSlotAvailabilityOptions): UseSlotAvailabilityReturn => {
  const [availableSlots, setAvailableSlots] = useState<DateAvailability[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [validatingSlot, setValidatingSlot] = useState(false);
  const [slotValidationError, setSlotValidationError] = useState<string | null>(
    null
  );

  const { handleGetAvailableSlots, handleCheckSlotAvailability } =
    useBookingOperations();

  // Fetch available slots
  const fetchAvailableSlots = useCallback(async () => {
    if (!requiresAvailability) return;

    setLoadingSlots(true);
    setSlotError(null);

    try {
      const startDate = getTomorrowDate();
      const endDate = getMaxDate();
      const serviceCategoryEnum = mapServiceCategoryToEnum(serviceCategory);

      const slots = await handleGetAvailableSlots(
        formatDateForAPI(startDate),
        formatDateForAPI(endDate),
        serviceCategoryEnum
      );

      setAvailableSlots(slots || []);
    } catch (err) {
      console.error("Failed to fetch available slots:", err);
      setSlotError(
        "Unable to load available time slots. Please refresh the page and try again."
      );
    } finally {
      setLoadingSlots(false);
    }
  }, [requiresAvailability, serviceCategory, handleGetAvailableSlots]);

  // Validate slot availability
  const validateSlotAvailability = useCallback(
    async (date: string, timeSlot: TimeSlot): Promise<boolean> => {
      if (!requiresAvailability) return true;

      setValidatingSlot(true);
      setSlotValidationError(null);

      try {
        const selectedDate = new Date(date);
        const serviceCategoryEnum = mapServiceCategoryToEnum(serviceCategory);

        const slotCheck = await handleCheckSlotAvailability({
          date: formatDateForAPI(selectedDate),
          timeSlot,
          serviceCategory: serviceCategoryEnum,
        });

        if (!slotCheck?.isAvailable) {
          setSlotValidationError(
            `The ${timeSlot.toLowerCase()} slot is no longer available. Please select a different time slot.`
          );

          // Refresh availability data
          await fetchAvailableSlots();

          return false;
        }

        return true;
      } catch (err) {
        console.error("Slot validation error:", err);
        setSlotValidationError(
          "Unable to verify slot availability. Please try again."
        );
        return false;
      } finally {
        setValidatingSlot(false);
      }
    },
    [
      requiresAvailability,
      serviceCategory,
      handleCheckSlotAvailability,
      fetchAvailableSlots,
    ]
  );

  // Get slot availability for selected date
  const getSelectedDateSlots = useCallback(
    (date: string): SlotAvailability[] => {
      const selectedDate = new Date(date);
      return getSlotAvailabilityForDate(selectedDate, availableSlots);
    },
    [availableSlots]
  );

  // Generate availability data for picker
  const getAvailableSlotsForPicker = useCallback((): DateAvailability[] => {
    if (requiresAvailability) {
      return availableSlots;
    }

    // For services that don't require availability, generate fake data
    const fakeSlots: DateAvailability[] = [];
    const startDate = getTomorrowDate();
    const endDate = getMaxDate();

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      fakeSlots.push({
        date: currentDate.toISOString().split("T")[0],
        hasAvailableSlots: true,
        slots: [],
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return fakeSlots;
  }, [requiresAvailability, availableSlots]);

  // Clear slot validation error
  const clearSlotValidationError = useCallback(() => {
    setSlotValidationError(null);
  }, []);

  // Fetch slots when modal opens
  useEffect(() => {
    if (isOpen && requiresAvailability) {
      fetchAvailableSlots();
    }
    if (isOpen && !requiresAvailability) {
      setAvailableSlots([]);
      setSlotError(null);
    }
  }, [isOpen, requiresAvailability, fetchAvailableSlots]);

  return {
    availableSlots,
    loadingSlots,
    slotError,
    validatingSlot,
    slotValidationError,
    fetchAvailableSlots,
    validateSlotAvailability,
    getSelectedDateSlots,
    getAvailableSlotsForPicker,
    clearSlotValidationError,
  };
};
