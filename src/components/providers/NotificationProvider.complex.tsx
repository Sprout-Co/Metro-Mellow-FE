'use client';

import React, { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  useCallback,
  ReactNode 
} from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/lib/redux/slices/authSlice';
import { useNotificationOperations } from '@/graphql/hooks/notifications/useNotificationOperations';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  showToast: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

const POLL_INTERVAL = 30000; // 30 seconds

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { 
    notifications: currentNotifications,
    unreadCount: currentUnreadCount,
    refetchNotifications,
    refetchUnreadCount,
    handleMarkNotificationAsRead,
    handleMarkNotificationsAsRead,
    handleDeleteNotification 
  } = useNotificationOperations();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastQueue, setToastQueue] = useState<Notification[]>([]);

  // Sync notifications from the hook data
  useEffect(() => {
    if (!isAuthenticated) return;

    if (currentNotifications && Array.isArray(currentNotifications)) {
      const newNotifications = currentNotifications.map((n: any) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        type: n.type,
        priority: n.priority,
        isRead: n.isRead,
        createdAt: n.createdAt
      }));
      
      // Check for new notifications to show as toasts
      setNotifications(prevNotifications => {
        const previousIds = new Set(prevNotifications.map(n => n.id));
        const newToasts = newNotifications.filter((n: Notification) => 
          !previousIds.has(n.id) && !n.isRead
        );
        
        if (newToasts.length > 0) {
          setToastQueue(prev => [...prev, ...newToasts]);
        }
        
        return newNotifications;
      });
      
      setUnreadCount(currentUnreadCount);
    }
  }, [currentNotifications, currentUnreadCount, isAuthenticated]);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      setIsLoading(true);
      setError(null);
      await Promise.all([
        refetchNotifications(),
        refetchUnreadCount()
      ]);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, refetchNotifications, refetchUnreadCount]);

  // Mark notification as read
  const markAsRead = useCallback(async (id: string) => {
    try {
      await handleMarkNotificationAsRead(id);
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark as read:', err);
      setError('Failed to mark as read');
    }
  }, [handleMarkNotificationAsRead]);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id);
    if (unreadIds.length === 0) return;

    try {
      await handleMarkNotificationsAsRead(unreadIds);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      setError('Failed to mark all as read');
    }
  }, [notifications, handleMarkNotificationsAsRead]);

  // Delete notification
  const deleteNotification = useCallback(async (id: string) => {
    try {
      await handleDeleteNotification(id);
      const notification = notifications.find(n => n.id === id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Failed to delete notification:', err);
      setError('Failed to delete notification');
    }
  }, [handleDeleteNotification, notifications]);

  // Show toast
  const showToast = useCallback((notification: Notification) => {
    setToastQueue(prev => [...prev, notification]);
  }, []);

  // Polling effect
  useEffect(() => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Initial fetch
    fetchNotifications();

    // Set up polling
    const interval = setInterval(fetchNotifications, POLL_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated, fetchNotifications]);

  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    showToast
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {/* Toast Container */}
      <NotificationToastContainer 
        notifications={toastQueue}
        onRemove={(id) => setToastQueue(prev => prev.filter(n => n.id !== id))}
      />
    </NotificationContext.Provider>
  );
};

// Toast Container Component
interface NotificationToastContainerProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationToastContainer: React.FC<NotificationToastContainerProps> = ({
  notifications,
  onRemove
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.slice(0, 3).map((notification, index) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={() => onRemove(notification.id)}
          delay={index * 100}
        />
      ))}
    </div>
  );
};

// Simple Toast Component
interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
  delay?: number;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), delay);
    const dismissTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, 5000 + delay);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [delay, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const priorityColor = {
    LOW: 'bg-blue-500',
    MEDIUM: 'bg-yellow-500', 
    HIGH: 'bg-orange-500',
    URGENT: 'bg-red-500'
  }[notification.priority] || 'bg-gray-500';

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm
      `}
      role="alert"
    >
      <div className="flex items-start space-x-3">
        <div className={`w-2 h-2 rounded-full mt-2 ${priorityColor}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.message}</p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          type="button"
        >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};