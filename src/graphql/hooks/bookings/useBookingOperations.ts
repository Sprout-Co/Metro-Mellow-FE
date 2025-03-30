/**
 * Custom hook for handling all booking-related operations.
 * Provides functions for managing bookings including creation, updates,
 * status changes, and staff assignments.
 *
 * @returns Object containing all booking operation handlers
 */
import { useCallback, useState } from "react";
import {
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useCancelBookingMutation,
  useCompleteBookingMutation,
  useAssignStaffMutation,
  useUpdateBookingStatusMutation,
  useGetBookingByIdQuery,
  useGetBookingsQuery,
  useGetCustomerBookingsQuery,
  useGetStaffBookingsQuery,
  useGetBookingByIdLazyQuery,
  useGetBookingsLazyQuery,
  useGetCustomerBookingsLazyQuery,
  useGetStaffBookingsLazyQuery,
} from "@/graphql/api";
import { BookingStatus } from "@/graphql/api";

export const useBookingOperations = () => {
  const [createBookingMutation] = useCreateBookingMutation();
  const [updateBookingMutation] = useUpdateBookingMutation();
  const [cancelBookingMutation] = useCancelBookingMutation();
  const [completeBookingMutation] = useCompleteBookingMutation();
  const [assignStaffMutation] = useAssignStaffMutation();
  const [updateBookingStatusMutation] = useUpdateBookingStatusMutation();

  // Use lazy query hooks
  const [getBookingById] = useGetBookingByIdLazyQuery();
  const [getBookings] = useGetBookingsLazyQuery();
  const [getCustomerBookings] = useGetCustomerBookingsLazyQuery();
  const [getStaffBookings] = useGetStaffBookingsLazyQuery();

  // State for storing query results
  const [bookingData, setBookingData] = useState<any>(null);
  const [bookingsData, setBookingsData] = useState<any>(null);
  const [customerBookingsData, setCustomerBookingsData] = useState<any>(null);
  const [staffBookingsData, setStaffBookingsData] = useState<any>(null);

  /**
   * Creates a new booking
   * @param input - Booking creation input object
   * @returns Created booking
   * @throws Error if creation fails
   */
  const handleCreateBooking = useCallback(
    async (input: {
      serviceId: string;
      date: Date;
      startTime: string;
      notes?: string;
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
    }) => {
      try {
        const { data, errors } = await createBookingMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createBooking;
      } catch (error) {
        console.error("Booking creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createBookingMutation]
  );

  /**
   * Updates an existing booking
   * @param id - Booking ID
   * @param input - Booking update input object
   * @returns Updated booking
   * @throws Error if update fails
   */
  const handleUpdateBooking = useCallback(
    async (
      id: string,
      input: {
        date?: Date;
        startTime?: string;
        notes?: string;
        address?: {
          street: string;
          city: string;
          state: string;
          zipCode: string;
          country: string;
        };
      }
    ) => {
      try {
        const { data, errors } = await updateBookingMutation({
          variables: { id, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateBooking;
      } catch (error) {
        console.error("Booking update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateBookingMutation]
  );

  /**
   * Cancels a booking
   * @param id - Booking ID
   * @returns Cancelled booking
   * @throws Error if cancellation fails
   */
  const handleCancelBooking = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await cancelBookingMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.cancelBooking;
      } catch (error) {
        console.error("Booking cancellation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [cancelBookingMutation]
  );

  /**
   * Marks a booking as completed
   * @param id - Booking ID
   * @returns Completed booking
   * @throws Error if completion fails
   */
  const handleCompleteBooking = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await completeBookingMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.completeBooking;
      } catch (error) {
        console.error("Booking completion error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [completeBookingMutation]
  );

  /**
   * Assigns staff to a booking
   * @param bookingId - Booking ID
   * @param staffId - Staff ID
   * @returns Updated booking
   * @throws Error if assignment fails
   */
  const handleAssignStaff = useCallback(
    async (bookingId: string, staffId: string) => {
      try {
        const { data, errors } = await assignStaffMutation({
          variables: { bookingId, staffId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.assignStaff;
      } catch (error) {
        console.error("Staff assignment error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [assignStaffMutation]
  );

  /**
   * Updates booking status
   * @param id - Booking ID
   * @param status - New status
   * @returns Updated booking
   * @throws Error if update fails
   */
  const handleUpdateBookingStatus = useCallback(
    async (id: string, status: BookingStatus) => {
      try {
        const { data, errors } = await updateBookingStatusMutation({
          variables: { id, status },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateBookingStatus;
      } catch (error) {
        console.error("Booking status update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateBookingStatusMutation]
  );

  /**
   * Fetches a single booking by ID
   * @param id - Booking ID
   * @returns Booking data
   * @throws Error if fetch fails
   */
  const handleGetBooking = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await getBookingById({ variables: { id } });

        if (errors) {
          throw new Error(errors[0].message);
        }

        setBookingData(data?.booking);
        return data?.booking;
      } catch (error) {
        console.error("Booking fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getBookingById]
  );

  /**
   * Fetches bookings with optional status filter
   * @param status - Optional booking status filter
   * @returns Array of bookings
   * @throws Error if fetch fails
   */
  const handleGetBookings = useCallback(
    async (status?: BookingStatus) => {
      try {
        const { data, errors } = await getBookings({ variables: { status } });

        if (errors) {
          throw new Error(errors[0].message);
        }

        setBookingsData(data?.bookings);
        return data?.bookings;
      } catch (error) {
        console.error("Bookings fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getBookings]
  );

  /**
   * Fetches bookings for the current customer
   * @returns Array of customer's bookings
   * @throws Error if fetch fails
   */
  const handleGetCustomerBookings = useCallback(async () => {
    try {
      const { data, errors } = await getCustomerBookings();

      if (errors) {
        throw new Error(errors[0].message);
      }

      setCustomerBookingsData(data?.customerBookings);
      return data?.customerBookings;
    } catch (error) {
      console.error("Customer bookings fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getCustomerBookings]);

  /**
   * Fetches bookings for the current staff member
   * @returns Array of staff's bookings
   * @throws Error if fetch fails
   */
  const handleGetStaffBookings = useCallback(async () => {
    try {
      const { data, errors } = await getStaffBookings();

      if (errors) {
        throw new Error(errors[0].message);
      }

      setStaffBookingsData(data?.staffBookings);
      return data?.staffBookings;
    } catch (error) {
      console.error("Staff bookings fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getStaffBookings]);

  return {
    handleCreateBooking,
    handleUpdateBooking,
    handleCancelBooking,
    handleCompleteBooking,
    handleAssignStaff,
    handleUpdateBookingStatus,
    handleGetBooking,
    handleGetBookings,
    handleGetCustomerBookings,
    handleGetStaffBookings,
    // Return the current data
    currentBookings: bookingsData,
    currentCustomerBookings: customerBookingsData,
    currentStaffBookings: staffBookingsData,
    currentBooking: bookingData,
  };
};
