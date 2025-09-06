"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useNotificationOperations } from "@/graphql/hooks/notifications/useNotificationOperations";

interface NotificationContextType {
  notifications: any[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refetch: () => void;
  getUnreadNotifications: () => any[];
  // Socket-related properties for compatibility with NotificationDrawer
  isConnected: boolean;
  connectionStatus: "connected" | "connecting" | "disconnected";
  connectSocket: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const {
    notifications,
    unreadCount,
    refetchNotifications,
    refetchUnreadCount,
    handleMarkNotificationAsRead,
    handleMarkNotificationsAsRead,
    handleDeleteNotification,
  } = useNotificationOperations();

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      await handleMarkNotificationAsRead(id);
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    const unreadIds = notifications
      .filter((n: any) => !n.isRead)
      .map((n: any) => n.id);
    if (unreadIds.length === 0) return;

    try {
      await handleMarkNotificationsAsRead(unreadIds);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      await handleDeleteNotification(id);
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  // Simple refetch function
  const refetch = () => {
    refetchNotifications();
    refetchUnreadCount();
  };

  // Get unread notifications
  const getUnreadNotifications = () => {
    return (notifications || []).filter((n: any) => !n.isRead);
  };

  // Mock socket functions for compatibility (no real-time features)
  const connectSocket = async () => {
    // integrate with socket-notification.ts
    console.log("Socket connection not needed in simplified mode");
  };

  const contextValue: NotificationContextType = {
    notifications: notifications || [],
    unreadCount: unreadCount || 0,
    isLoading: false,
    error: null,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch,
    getUnreadNotifications,
    // integrate with socket-notification.ts
    isConnected: true, // Always show as connected since we use GraphQL
    connectionStatus: "connected",
    connectSocket,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
