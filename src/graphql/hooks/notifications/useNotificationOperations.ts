/**
 * Custom hook for handling all notification-related operations.
 * Provides functions for managing notifications including creation,
 * reading, deletion, and broadcasting.
 *
 * @returns Object containing all notification operation handlers
 */
import { useCallback } from "react";
import {
  useCreateNotificationMutation,
  useMarkNotificationAsReadMutation,
  useMarkNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  useBroadcastNotificationMutation,
  useSendNotificationToRoleMutation,
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  useGetUnreadNotificationCountQuery,
  useGetNotificationStatsQuery,
  CreateNotificationInput,
  BroadcastNotificationInput,
  NotificationFilters,
  PaginationInput,
  UserRole,
} from "@/graphql/api";

export const useNotificationOperations = () => {
  const [createNotificationMutation] = useCreateNotificationMutation();
  const [markNotificationAsReadMutation] = useMarkNotificationAsReadMutation();
  const [markNotificationsAsReadMutation] =
    useMarkNotificationsAsReadMutation();
  const [deleteNotificationMutation] = useDeleteNotificationMutation();
  const [broadcastNotificationMutation] = useBroadcastNotificationMutation();
  const [sendNotificationToRoleMutation] = useSendNotificationToRoleMutation();

  // Queries
  const { data: notificationsData, refetch: refetchNotifications } =
    useGetNotificationsQuery();
  const { data: unreadCountData, refetch: refetchUnreadCount } =
    useGetUnreadNotificationCountQuery();
  const { data: notificationStatsData, refetch: refetchNotificationStats } =
    useGetNotificationStatsQuery();

  /**
   * Creates a new notification
   * @param input - Notification creation input object
   * @returns Created notification
   * @throws Error if creation fails
   */
  const handleCreateNotification = useCallback(
    async (input: CreateNotificationInput) => {
      try {
        const { data, errors } = await createNotificationMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Refetch notifications after creating a new one
        await refetchNotifications();

        return data?.createNotification;
      } catch (error) {
        console.error("Notification creation error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [createNotificationMutation, refetchNotifications]
  );

  /**
   * Marks a notification as read
   * @param id - Notification ID
   * @returns Updated notification
   * @throws Error if update fails
   */
  const handleMarkNotificationAsRead = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await markNotificationAsReadMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Refetch notifications and unread count after marking as read
        await Promise.all([
          refetchNotifications(),
          refetchUnreadCount(),
          refetchNotificationStats(),
        ]);

        return data?.markNotificationAsRead;
      } catch (error) {
        console.error("Mark notification as read error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [
      markNotificationAsReadMutation,
      refetchNotifications,
      refetchUnreadCount,
      refetchNotificationStats,
    ]
  );

  /**
   * Marks multiple notifications as read
   * @param ids - Array of notification IDs
   * @returns Success status
   * @throws Error if update fails
   */
  const handleMarkNotificationsAsRead = useCallback(
    async (ids: string[]) => {
      try {
        const { data, errors } = await markNotificationsAsReadMutation({
          variables: { ids },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Refetch notifications and unread count after marking as read
        await Promise.all([
          refetchNotifications(),
          refetchUnreadCount(),
          refetchNotificationStats(),
        ]);

        return data?.markNotificationsAsRead;
      } catch (error) {
        console.error("Mark notifications as read error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [
      markNotificationsAsReadMutation,
      refetchNotifications,
      refetchUnreadCount,
      refetchNotificationStats,
    ]
  );

  /**
   * Deletes a notification
   * @param id - Notification ID
   * @returns Success status
   * @throws Error if deletion fails
   */
  const handleDeleteNotification = useCallback(
    async (id: string) => {
      try {
        const { data, errors } = await deleteNotificationMutation({
          variables: { id },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Refetch notifications and stats after deletion
        await Promise.all([refetchNotifications(), refetchNotificationStats()]);

        return data?.deleteNotification;
      } catch (error) {
        console.error("Notification deletion error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [deleteNotificationMutation, refetchNotifications, refetchNotificationStats]
  );

  /**
   * Broadcasts a notification to all users
   * @param input - Broadcast notification input object
   * @returns Success status
   * @throws Error if broadcast fails
   */
  const handleBroadcastNotification = useCallback(
    async (input: BroadcastNotificationInput) => {
      try {
        const { data, errors } = await broadcastNotificationMutation({
          variables: { input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Refetch notifications after broadcasting
        await refetchNotifications();

        return data?.broadcastNotification;
      } catch (error) {
        console.error("Broadcast notification error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [broadcastNotificationMutation, refetchNotifications]
  );

  /**
   * Sends a notification to users with a specific role
   * @param role - User role to send notification to
   * @param input - Broadcast notification input object
   * @returns Success status
   * @throws Error if sending fails
   */
  const handleSendNotificationToRole = useCallback(
    async (role: UserRole, input: BroadcastNotificationInput) => {
      try {
        const { data, errors } = await sendNotificationToRoleMutation({
          variables: { role, input },
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        // Refetch notifications after sending
        await refetchNotifications();

        return data?.sendNotificationToRole;
      } catch (error) {
        console.error("Send notification to role error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [sendNotificationToRoleMutation, refetchNotifications]
  );

  /**
   * Fetches notifications with optional filters and pagination
   * @param filters - Optional notification filters
   * @param pagination - Optional pagination parameters
   * @returns Notifications data with pagination info
   * @throws Error if fetch fails
   */
  const handleGetNotifications = useCallback(
    async (filters?: NotificationFilters, pagination?: PaginationInput) => {
      try {
        const { data, errors } = await refetchNotifications({
          filters,
          pagination,
        });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.notifications;
      } catch (error) {
        console.error("Notifications fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [refetchNotifications]
  );

  /**
   * Fetches notification statistics
   * @param userId - Optional user ID for user-specific stats
   * @returns Notification statistics
   * @throws Error if fetch fails
   */
  const handleGetNotificationStats = useCallback(
    async (userId?: string) => {
      try {
        const { data, errors } = await refetchNotificationStats({ userId });

        if (errors) {
          throw new Error(errors[0].message);
        }

        return data?.notificationStats;
      } catch (error) {
        console.error("Notification stats fetch error:", error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
      }
    },
    [refetchNotificationStats]
  );

  return {
    // Mutation handlers
    handleCreateNotification,
    handleMarkNotificationAsRead,
    handleMarkNotificationsAsRead,
    handleDeleteNotification,
    handleBroadcastNotification,
    handleSendNotificationToRole,

    // Query handlers
    handleGetNotifications,
    handleGetNotificationStats,

    // Current data
    notifications: notificationsData?.notifications?.notifications || [],
    notificationPagination: {
      total: notificationsData?.notifications?.total || 0,
      page: notificationsData?.notifications?.page || 1,
      totalPages: notificationsData?.notifications?.totalPages || 1,
      hasNextPage: notificationsData?.notifications?.hasNextPage || false,
      hasPreviousPage:
        notificationsData?.notifications?.hasPreviousPage || false,
    },
    unreadCount: unreadCountData?.unreadNotificationCount || 0,
    notificationStats: notificationStatsData?.notificationStats,

    // Refetch functions
    refetchNotifications,
    refetchUnreadCount,
    refetchNotificationStats,
  };
};
