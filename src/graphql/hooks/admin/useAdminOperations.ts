/**
 * Custom hook for handling all admin-related operations.
 * Provides functions for managing admin invitations including creation,
 * acceptance, resending, cancellation, and cleanup of expired invitations.
 *
 * @returns Object containing all admin operation handlers
 */
import { useCallback } from "react";
import {
  useCreateAdminInvitationMutation,
  useAcceptAdminInvitationMutation,
  useResendAdminInvitationMutation,
  useCancelAdminInvitationMutation,
  useCleanupExpiredInvitationsMutation,
  usePendingAdminInvitationsQuery,
  useAdminInvitationQuery,
  usePendingAdminInvitationsLazyQuery,
  useAdminInvitationLazyQuery,
  CreateAdminInvitationInput,
  AcceptAdminInvitationInput,
  useCreateCustomerMutation,
  CreateUserInput,
  useUpdateBookingPaymentStatusMutation,
  PaymentStatus,
} from "@/graphql/api";

export const useAdminOperations = () => {
  const [createCustomerMutation] = useCreateCustomerMutation();
  const [createAdminInvitationMutation] = useCreateAdminInvitationMutation();
  const [acceptAdminInvitationMutation] = useAcceptAdminInvitationMutation();
  const [resendAdminInvitationMutation] = useResendAdminInvitationMutation();
  const [cancelAdminInvitationMutation] = useCancelAdminInvitationMutation();
  const [cleanupExpiredInvitationsMutation] =
    useCleanupExpiredInvitationsMutation();
  const [updateBookingPaymentStatusMutation] =
    useUpdateBookingPaymentStatusMutation();
  // Use lazy query hooks with data destructuring
  const [getPendingAdminInvitations, { data: pendingInvitationsData }] =
    usePendingAdminInvitationsLazyQuery();
  const [getAdminInvitation, { data: adminInvitationData }] =
    useAdminInvitationLazyQuery();

  /**
   * Creates a new admin invitation
   * @param input - Admin invitation creation input object
   * @returns Created invitation
   * @throws Error if creation fails
   */
  const handleCreateAdminInvitation = useCallback(
    async (input: CreateAdminInvitationInput) => {
      try {
        const { data, errors } = await createAdminInvitationMutation({
          variables: {
            input: { ...input },
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createAdminInvitation;
      } catch (error) {
        console.error("Admin invitation creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createAdminInvitationMutation]
  );

  /**
   * Accepts an admin invitation
   * @param input - Admin invitation acceptance input object
   * @returns Acceptance result with token and user data
   * @throws Error if acceptance fails
   */
  const handleAcceptAdminInvitation = useCallback(
    async (input: AcceptAdminInvitationInput) => {
      try {
        const { data, errors } = await acceptAdminInvitationMutation({
          variables: {
            input: { ...input },
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.acceptAdminInvitation;
      } catch (error) {
        console.error("Admin invitation acceptance error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [acceptAdminInvitationMutation]
  );

  /**
   * Resends an admin invitation
   * @param invitationId - Invitation ID
   * @returns Success status
   * @throws Error if resend fails
   */
  const handleResendAdminInvitation = useCallback(
    async (invitationId: string) => {
      try {
        const { data, errors } = await resendAdminInvitationMutation({
          variables: { invitationId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.resendAdminInvitation;
      } catch (error) {
        console.error("Admin invitation resend error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [resendAdminInvitationMutation]
  );

  /**
   * Cancels an admin invitation
   * @param invitationId - Invitation ID
   * @returns Success status
   * @throws Error if cancellation fails
   */
  const handleCancelAdminInvitation = useCallback(
    async (invitationId: string) => {
      try {
        const { data, errors } = await cancelAdminInvitationMutation({
          variables: { invitationId },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.cancelAdminInvitation;
      } catch (error) {
        console.error("Admin invitation cancellation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [cancelAdminInvitationMutation]
  );

  /**
   * Cleans up expired admin invitations
   * @returns Success status
   * @throws Error if cleanup fails
   */
  const handleCleanupExpiredInvitations = useCallback(async () => {
    try {
      const { data, errors } = await cleanupExpiredInvitationsMutation();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.cleanupExpiredInvitations;
    } catch (error) {
      console.error("Expired invitations cleanup error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [cleanupExpiredInvitationsMutation]);

  /**
   * Fetches pending admin invitations
   * @returns Array of pending invitations
   * @throws Error if fetch fails
   */
  const handleGetPendingAdminInvitations = useCallback(async () => {
    try {
      const { data, errors } = await getPendingAdminInvitations();

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data?.pendingAdminInvitations;
    } catch (error) {
      console.error("Pending admin invitations fetch error:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }, [getPendingAdminInvitations]);

  /**
   * Fetches a specific admin invitation by token
   * @param token - Invitation token
   * @returns Invitation data
   * @throws Error if fetch fails
   */
  const handleGetAdminInvitation = useCallback(
    async (token: string) => {
      try {
        const { data, errors } = await getAdminInvitation({
          variables: { token },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.adminInvitation;
      } catch (error) {
        console.error("Admin invitation fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [getAdminInvitation]
  );

  /**
   * Creates a new customer
   * @param input - Customer creation input object
   * @returns Created customer with token
   * @throws Error if creation fails
   */
  const handleCreateCustomer = useCallback(
    async (input: CreateUserInput) => {
      try {
        const { data, errors } = await createCustomerMutation({
          variables: {
            input: { ...input },
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.createCustomer;
      } catch (error) {
        console.error("Customer creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createCustomerMutation]
  );

  /**
   * Updates the payment status of a booking
   * @param bookingId - The ID of the booking to update
   * @param paymentStatus - The new payment status
   * @returns Updated booking
   * @throws Error if update fails
   */
  const handleUpdateBookingPaymentStatus = useCallback(
    async (bookingId: string, paymentStatus: PaymentStatus) => {
      try {
        const { data, errors } = await updateBookingPaymentStatusMutation({
          variables: {
            updateBookingPaymentStatusId: bookingId,
            paymentStatus: paymentStatus,
          },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.updateBookingPaymentStatus;
      } catch (error) {
        console.error("Booking payment status update error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [updateBookingPaymentStatusMutation]
  );

  return {
    handleCreateAdminInvitation,
    handleAcceptAdminInvitation,
    handleResendAdminInvitation,
    handleCancelAdminInvitation,
    handleCleanupExpiredInvitations,
    handleGetPendingAdminInvitations,
    handleGetAdminInvitation,
    handleUpdateBookingPaymentStatus,
    // Return the current data
    currentPendingInvitations: pendingInvitationsData?.pendingAdminInvitations,
    currentAdminInvitation: adminInvitationData?.adminInvitation,
    handleCreateCustomer,
  };
};
