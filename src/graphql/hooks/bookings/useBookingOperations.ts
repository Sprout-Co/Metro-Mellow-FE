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
  useRescheduleBookingMutation,
  BookingStatus,
  AddressInput,
  RoomQuantitiesInput,
  PropertyType,
  CreateBookingMutationVariables,
  UpdateBookingMutationVariables,
  CreateBookingInput,
  TimeSlot,
  GetCustomerBookingsDocument,
  GetStaffBookingsDocument,
} from "@/graphql/api";

export const useBookingOperations = () => {
  const [createBookingMutation, { loading: isCreatingBooking }] =
    useCreateBookingMutation({
      // refetchQueries: [{ query: GetCustomerBookingsDocument }],
      // awaitRefetchQueries: true,
    });
  const [updateBookingMutation] = useUpdateBookingMutation();
  const [cancelBookingMutation] = useCancelBookingMutation();
  const [completeBookingMutation] = useCompleteBookingMutation();
  const [assignStaffMutation] = useAssignStaffMutation();
  const [updateBookingStatusMutation] = useUpdateBookingStatusMutation();
  const [rescheduleBookingMutation] = useRescheduleBookingMutation();

  // Use lazy query hooks with data destructuring
  const [getBookingById, { data: bookingData }] = useGetBookingByIdLazyQuery();
  const [getBookings, { data: bookingsData }] = useGetBookingsLazyQuery();
  const [getCustomerBookings, { data: customerBookingsData }] =
    useGetCustomerBookingsLazyQuery();
  const [getStaffBookings, { data: staffBookingsData }] =
    useGetStaffBookingsLazyQuery();

  const handleGetCustomerBookings = useCallback(async () => {
    try {
      const { data, errors, loading } = await getCustomerBookings();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return { data: data?.customerBookings, loading };
    } catch (error) {
      console.error("Customer bookings fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getCustomerBookings]);

  /**
   * Creates a new booking
   * @param input - Booking creation input object
   * @returns Created booking
   * @throws Error if creation fails
   */
  const handleCreateBooking = useCallback(
    async (input: CreateBookingInput) => {
      try {
        const { data, errors } = await createBookingMutation({
          variables: {
            input: { ...input },
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Force a refetch of customer bookings
        await handleGetCustomerBookings();

        return data?.createBooking;
      } catch (error) {
        console.error("Booking creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createBookingMutation, handleGetCustomerBookings]
  );

  /**
   * Updates an existing booking
   * @param id - Booking ID
   * @param input - Booking update input object
   * @returns Updated booking
   * @throws Error if update fails
   */
  const handleUpdateBooking = useCallback(
    async (input: UpdateBookingMutationVariables) => {
      try {
        const { data, errors } = await updateBookingMutation({
          variables: { ...input },
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
    async (id: string, cancellationReason?: string) => {
      try {
        const { data, errors } = await cancelBookingMutation({
          variables: { cancelBookingId: id, cancellationReason },
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
   * Reschedules a booking to a new date and time
   * @param id - Booking ID
   * @param newDate - New date for the booking
   * @param newTimeSlot - New time slot for the booking
   * @returns Updated booking
   * @throws Error if rescheduling fails
   */
  const handleRescheduleBooking = useCallback(
    async (id: string, newDate: string, newTimeSlot: TimeSlot) => {
      try {
        const { data, errors } = await rescheduleBookingMutation({
          variables: {
            id,
            newDate,
            newTimeSlot,
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Force a refetch of customer bookings to update the UI
        await handleGetCustomerBookings();

        return data?.rescheduleBooking;
      } catch (error) {
        console.error("Booking reschedule error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [rescheduleBookingMutation, handleGetCustomerBookings]
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
    handleRescheduleBooking,
    handleAssignStaff,
    handleUpdateBookingStatus,
    handleGetBooking,
    handleGetBookings,
    handleGetCustomerBookings,
    handleGetStaffBookings,
    // Return the current data
    currentBookings: bookingsData?.bookings,
    currentCustomerBookings: customerBookingsData?.customerBookings,
    currentStaffBookings: staffBookingsData?.staffBookings,
    currentBooking: bookingData?.booking,
    isCreatingBooking,
  };
};
