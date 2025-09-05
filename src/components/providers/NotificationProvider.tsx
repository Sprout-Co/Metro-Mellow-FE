'use client';

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback,
  useMemo,
  ReactNode 
} from 'react';
import { useSelector } from 'react-redux';
import { 
  SocketNotificationService, 
  NotificationPayload,
  createNotificationService,
  destroyNotificationService 
} from '@/lib/services/socket-notification';
import { selectToken, selectUser, selectIsAuthenticated } from '@/lib/redux/slices/authSlice';
import { useNotificationOperations } from '@/graphql/hooks/notifications/useNotificationOperations';
import { NotificationType, NotificationPriority } from '@/graphql/api';

export interface NotificationState {
  notifications: NotificationPayload[];
  unreadCount: number;
  isConnected: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

export interface NotificationContextType extends NotificationState {
  // Socket connection methods
  connectSocket: () => Promise<void>;
  disconnectSocket: () => void;
  isSocketConnected: () => boolean;
  
  // Notification management
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  clearAllNotifications: () => void;
  
  // Real-time events
  addNotification: (notification: NotificationPayload) => void;
  updateNotificationStatus: (notificationId: string, isRead: boolean) => void;
  
  // Filtering and sorting
  getNotificationsByType: (type: NotificationType) => NotificationPayload[];
  getNotificationsByPriority: (priority: NotificationPriority) => NotificationPayload[];
  getUnreadNotifications: () => NotificationPayload[];
  
  // Error handling
  lastError: string | null;
  clearError: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

const MAX_NOTIFICATIONS = 100;
const MAX_RETRY_ATTEMPTS = 3;

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  const { 
    refetchUnreadCount,
    refetchNotifications,
    handleMarkNotificationAsRead,
    handleMarkNotificationsAsRead,
    handleDeleteNotification 
  } = useNotificationOperations();

  // Local state
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
  const [socketService, setSocketService] = useState<SocketNotificationService | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);

  /**
   * Create and configure socket service
   */
  const initializeSocketService = useCallback(async () => {
    if (!token || !user || !isAuthenticated) {
      console.log('🔐 Missing authentication data, skipping socket initialization');
      return;
    }

    try {
      setConnectionStatus('connecting');
      setLastError(null);
      
      const service = createNotificationService({
        token,
        serverUrl: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000'
      });

      // Setup event handlers
      service.onNotification((notification) => {
        console.log('🔔 Received notification:', notification);
        addNotification(notification);
      });

      service.onNotificationRead((notificationId) => {
        console.log('📖 Notification marked as read via socket:', notificationId);
        updateNotificationStatus(notificationId, true);
      });

      service.onConnect(() => {
        console.log('✅ Socket connected');
        setIsConnected(true);
        setConnectionStatus('connected');
        setRetryCount(0);
      });

      service.onDisconnect(() => {
        console.log('🔌 Socket disconnected');
        setIsConnected(false);
        setConnectionStatus('disconnected');
      });

      service.onError((error) => {
        console.error('❌ Socket error:', error);
        setLastError(error.message || 'Connection error occurred');
        setIsConnected(false);
        setConnectionStatus('disconnected');
      });

      service.onReconnect(() => {
        console.log('🔄 Socket reconnected');
        setIsConnected(true);
        setConnectionStatus('connected');
        setRetryCount(0);
        // Refetch data after reconnection
        refetchUnreadCount();
        refetchNotifications();
      });

      setSocketService(service);
      
      // Connect to socket
      await service.connect();
      
    } catch (error) {
      console.error('Failed to initialize socket service:', error);
      setLastError(error instanceof Error ? error.message : 'Failed to connect');
      setConnectionStatus('disconnected');
      
      // Retry connection with exponential backoff
      if (retryCount < MAX_RETRY_ATTEMPTS) {
        const delay = Math.pow(2, retryCount) * 1000;
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          initializeSocketService();
        }, delay);
      }
    }
  }, [token, user, isAuthenticated, retryCount, refetchUnreadCount, refetchNotifications]);

  /**
   * Connect to socket manually
   */
  const connectSocket = useCallback(async () => {
    if (!socketService && token && isAuthenticated) {
      await initializeSocketService();
    } else if (socketService && !socketService.isConnected()) {
      await socketService.connect();
    }
  }, [socketService, token, isAuthenticated, initializeSocketService]);

  /**
   * Disconnect socket
   */
  const disconnectSocket = useCallback(() => {
    if (socketService) {
      socketService.disconnect();
      setIsConnected(false);
      setConnectionStatus('disconnected');
    }
  }, [socketService]);

  /**
   * Check if socket is connected
   */
  const isSocketConnected = useCallback(() => {
    return socketService?.isConnected() ?? false;
  }, [socketService]);

  /**
   * Add notification to local state
   */
  const addNotification = useCallback((notification: NotificationPayload) => {
    setNotifications(prev => {
      const exists = prev.some(n => n.id === notification.id);
      if (exists) return prev;
      
      const updated = [notification, ...prev].slice(0, MAX_NOTIFICATIONS);
      return updated;
    });
    
    setUnreadCount(prev => prev + 1);
  }, []);

  /**
   * Update notification read status
   */
  const updateNotificationStatus = useCallback((notificationId: string, isRead: boolean) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead } as any
          : notification
      )
    );
    
    if (isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  }, []);

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await handleMarkNotificationAsRead(notificationId);
      updateNotificationStatus(notificationId, true);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      setLastError(error instanceof Error ? error.message : 'Failed to mark as read');
    }
  }, [handleMarkNotificationAsRead, updateNotificationStatus]);

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(async () => {
    const unreadIds = notifications.filter(n => !(n as any).isRead).map(n => n.id);
    if (unreadIds.length === 0) return;

    try {
      await handleMarkNotificationsAsRead(unreadIds);
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true } as any))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      setLastError(error instanceof Error ? error.message : 'Failed to mark all as read');
    }
  }, [notifications, handleMarkNotificationsAsRead]);

  /**
   * Delete notification
   */
  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      await handleDeleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      
      const notification = notifications.find(n => n.id === notificationId);
      if (notification && !(notification as any).isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
      setLastError(error instanceof Error ? error.message : 'Failed to delete notification');
    }
  }, [handleDeleteNotification, notifications]);

  /**
   * Clear all notifications from local state
   */
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  /**
   * Filter notifications by type
   */
  const getNotificationsByType = useCallback((type: NotificationType) => {
    return notifications.filter(n => n.type === type);
  }, [notifications]);

  /**
   * Filter notifications by priority
   */
  const getNotificationsByPriority = useCallback((priority: NotificationPriority) => {
    return notifications.filter(n => n.priority === priority);
  }, [notifications]);

  /**
   * Get unread notifications
   */
  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(n => !(n as any).isRead);
  }, [notifications]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  // Initialize socket when authentication changes
  useEffect(() => {
    if (isAuthenticated && token && user) {
      initializeSocketService();
    } else {
      // Clean up when user logs out
      if (socketService) {
        socketService.disconnect();
        setSocketService(null);
        setIsConnected(false);
        setConnectionStatus('disconnected');
        clearAllNotifications();
      }
    }

    return () => {
      destroyNotificationService();
    };
  }, [isAuthenticated, token, user?.id]);

  // Update socket token when token changes
  useEffect(() => {
    if (socketService && token && socketService.isConnected()) {
      socketService.updateToken(token);
    }
  }, [token, socketService]);

  // Context value memoization
  const contextValue = useMemo((): NotificationContextType => ({
    // State
    notifications,
    unreadCount,
    isConnected,
    connectionStatus,
    
    // Socket methods
    connectSocket,
    disconnectSocket,
    isSocketConnected,
    
    // Notification management
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    
    // Real-time events
    addNotification,
    updateNotificationStatus,
    
    // Filtering and sorting
    getNotificationsByType,
    getNotificationsByPriority,
    getUnreadNotifications,
    
    // Error handling
    lastError,
    clearError
  }), [
    notifications,
    unreadCount,
    isConnected,
    connectionStatus,
    connectSocket,
    disconnectSocket,
    isSocketConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addNotification,
    updateNotificationStatus,
    getNotificationsByType,
    getNotificationsByPriority,
    getUnreadNotifications,
    lastError,
    clearError
  ]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Hook to use notification context
 */
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationProvider;