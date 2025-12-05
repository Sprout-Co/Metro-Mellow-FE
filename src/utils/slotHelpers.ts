import {
  ServiceCategory,
  DateAvailability,
  SlotAvailability,
} from "@/graphql/api";

/**
 * Maps service category string to ServiceCategory enum
 * @param service_category - String representation of service category
 * @returns ServiceCategory enum value
 */
export const mapServiceCategoryToEnum = (
  service_category: string
): ServiceCategory => {
  switch (service_category.toLowerCase()) {
    case "cleaning":
      return ServiceCategory.Cleaning;
    case "cooking":
      return ServiceCategory.Cooking;
    case "errands":
      return ServiceCategory.Errands;
    case "laundry":
      return ServiceCategory.Laundry;
    case "pest control":
    case "pest_control":
      return ServiceCategory.PestControl;
    default:
      return ServiceCategory.Cleaning; // Default fallback
  }
};

/**
 * Gets qualitative availability label based on capacity
 * @param availableCapacity - Number of available slots
 * @param maxCapacity - Maximum capacity for the slot
 * @returns Qualitative label: "Available", "Limited", or "Full"
 */
export const getAvailabilityLabel = (
  availableCapacity: number,
  maxCapacity: number
): string => {
  if (availableCapacity === 0) {
    return "Full";
  }

  const availabilityRatio = availableCapacity / maxCapacity;

  if (availabilityRatio > 0.3) {
    return "Available";
  } else {
    return "Limited";
  }
};

/**
 * Formats a Date object for local date string (YYYY-MM-DD)
 * @param date - Date object to format
 * @returns Local date string format
 */
export const formatDateToLocalString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Parses a date string from the API (ISO format) as a local date
 * This prevents timezone issues where UTC dates shift to previous/next day
 * @param dateString - Date string from API (ISO format or YYYY-MM-DD)
 * @returns Date object representing the date in local timezone
 */
export const parseAPIDateAsLocal = (dateString: string | Date): Date => {
  // If it's already a Date object, extract the date parts
  if (dateString instanceof Date) {
    return new Date(
      dateString.getFullYear(),
      dateString.getMonth(),
      dateString.getDate()
    );
  }

  // Extract date part (YYYY-MM-DD) from ISO string or use as-is
  const dateOnly = dateString.split("T")[0];
  const [year, month, day] = dateOnly.split("-").map(Number);

  // Create date in local timezone (month is 0-indexed)
  return new Date(year, month - 1, day);
};

/**
 * Formats a Date object for GraphQL DateTime input
 * Preserves the date part regardless of timezone by using noon UTC
 * This prevents timezone shifts that could change the date
 * @param date - Date object to format
 * @returns ISO string format for API (at noon UTC to avoid day shifts)
 */
export const formatDateForAPI = (date: Date): string => {
  // Extract the date parts from the local date
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Create a date at noon UTC to avoid timezone-related day shifts
  // Using noon (12:00) ensures the date won't shift to previous/next day
  // regardless of the server's timezone
  const utcDate = new Date(Date.UTC(year, month, day, 12, 0, 0, 0));
  return utcDate.toISOString();
};

/**
 * Checks if a specific date has available slots
 * @param date - Date to check
 * @param availableSlots - Array of date availability data
 * @returns Boolean indicating if the date has available slots
 */
export const isDateAvailable = (
  date: Date,
  availableSlots: DateAvailability[]
): boolean => {
  const dateString = formatDateToLocalString(date);

  return availableSlots.some((slot) => {
    const slotDateString = formatDateToLocalString(
      parseAPIDateAsLocal(slot.date)
    );
    return slotDateString === dateString && slot.hasAvailableSlots;
  });
};

/**
 * Gets slot availability data for a specific date
 * @param date - Date to get slots for
 * @param availableSlots - Array of date availability data
 * @returns Array of slot availability for the specified date
 */
export const getSlotAvailabilityForDate = (
  date: Date,
  availableSlots: DateAvailability[]
): SlotAvailability[] => {
  const dateString = formatDateToLocalString(date);

  const dateSlot = availableSlots.find((slot) => {
    const slotDateString = formatDateToLocalString(
      parseAPIDateAsLocal(slot.date)
    );
    return slotDateString === dateString;
  });

  return dateSlot?.slots || [];
};

/**
 * Gets tomorrow's date (minimum selectable date)
 * @returns Date object for tomorrow
 */
export const getTomorrowDate = (): Date => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

/**
 * Gets date 60 days from today (maximum selectable date)
 * @returns Date object for 60 days from today
 */
export const getMaxDate = (): Date => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 60);
  maxDate.setHours(23, 59, 59, 999);
  return maxDate;
};

/**
 * Checks if a date is in the past
 * @param date - Date to check
 * @returns Boolean indicating if the date is in the past
 */
export const isPastDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Checks if a date is today
 * @param date - Date to check
 * @returns Boolean indicating if the date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Gets the first day of the month for a given date
 * @param date - Date to get first day of month for
 * @returns Date object representing the first day of the month
 */
export const getFirstDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Gets the last day of the month for a given date
 * @param date - Date to get last day of month for
 * @returns Date object representing the last day of the month
 */
export const getLastDayOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Gets array of dates for a calendar month view
 * @param date - Date representing the month to display
 * @returns Array of dates for the calendar grid
 */
export const getCalendarDates = (date: Date): Date[] => {
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);

  // Get the first day of the week (Sunday = 0)
  const firstDayOfWeek = firstDay.getDay();

  // Get the last day of the week
  const lastDayOfWeek = lastDay.getDay();

  const dates: Date[] = [];

  // Add previous month's trailing dates
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(firstDay);
    prevDate.setDate(prevDate.getDate() - (i + 1));
    dates.push(prevDate);
  }

  // Add current month's dates
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
    dates.push(currentDate);
  }

  // Add next month's leading dates
  const remainingDays = 42 - dates.length; // 6 weeks * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(lastDay);
    nextDate.setDate(nextDate.getDate() + i);
    dates.push(nextDate);
  }

  return dates;
};
