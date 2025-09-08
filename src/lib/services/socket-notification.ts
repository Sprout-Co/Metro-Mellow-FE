import { io, Socket } from "socket.io-client";
import { NotificationType, NotificationPriority, User } from "@/graphql/api";

export interface NotificationPayload {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  data?: Record<string, any>;
  createdAt: string;
  user: User;
  isRead?: boolean;
}

export interface SocketNotificationEvents {
  NEW_NOTIFICATION: "NEW_NOTIFICATION";
  NOTIFICATION_READ: "NOTIFICATION_READ";
  USER_TYPING: "USER_TYPING";
  CONNECT: "connect";
  DISCONNECT: "disconnect";
  CONNECT_ERROR: "connect_error";
  RECONNECT: "reconnect";
  RECONNECT_ERROR: "reconnect_error";
}

export type NotificationEventHandler = (
  notification: NotificationPayload
) => void;
export type ConnectionEventHandler = () => void;
export type ErrorEventHandler = (error: any) => void;

interface SocketOptions {
  token: string;
  serverUrl?: string;
  transports?: string[];
}

export class SocketNotificationService {
  private socket: Socket | null = null;
  private serverUrl: string;
  private token: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isConnecting = false;

  private eventHandlers: {
    onNotification?: NotificationEventHandler;
    onNotificationRead?: (notificationId: string) => void;
    onConnect?: ConnectionEventHandler;
    onDisconnect?: ConnectionEventHandler;
    onError?: ErrorEventHandler;
    onReconnect?: ConnectionEventHandler;
  } = {};

  constructor(options: SocketOptions) {
    this.serverUrl =
      options.serverUrl ||
      process.env.NEXT_PUBLIC_SOCKET_URL ||
      "http://localhost:4000";
    this.token = options.token;
  }

  /**
   * Initialize WebSocket connection with authentication
   */
  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnecting || (this.socket && this.socket.connected)) {
        resolve();
        return;
      }

      if (!this.token) {
        reject(new Error("No authentication token provided"));
        return;
      }

      this.isConnecting = true;

      try {
        this.socket = io(this.serverUrl, {
          auth: {
            token: this.token,
          },
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionAttempts: this.maxReconnectAttempts,
          reconnectionDelay: this.reconnectDelay,
          timeout: 20000,
        });

        this.setupEventListeners();

        this.socket.on("connect", () => {
          console.log("✅ Socket connected successfully");
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          this.eventHandlers.onConnect?.();
          resolve();
        });

        this.socket.on("connect_error", (error) => {
          console.error("❌ Socket connection error:", error);
          this.isConnecting = false;
          this.eventHandlers.onError?.(error);
          reject(error);
        });
      } catch (error) {
        this.isConnecting = false;
        console.error("❌ Socket initialization error:", error);
        reject(error);
      }
    });
  }

  /**
   * Setup all socket event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) return;

    // Notification events
    this.socket.on("NEW_NOTIFICATION", (payload: NotificationPayload) => {
      console.log("🔔 New notification received:", payload);
      this.eventHandlers.onNotification?.(payload);
    });

    this.socket.on("NOTIFICATION_READ", (notificationId: string) => {
      console.log("📖 Notification marked as read:", notificationId);
      this.eventHandlers.onNotificationRead?.(notificationId);
    });

    // Connection events
    this.socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
      this.eventHandlers.onDisconnect?.();

      if (reason === "io server disconnect") {
        // Server disconnected, attempt to reconnect
        this.handleReconnection();
      }
    });

    this.socket.on("reconnect", (attemptNumber) => {
      console.log(`🔄 Socket reconnected after ${attemptNumber} attempts`);
      this.reconnectAttempts = 0;
      this.eventHandlers.onReconnect?.();
    });

    this.socket.on("reconnect_error", (error) => {
      this.reconnectAttempts++;
      console.error(
        `❌ Reconnection attempt ${this.reconnectAttempts} failed:`,
        error
      );

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error("❌ Max reconnection attempts reached");
        this.eventHandlers.onError?.(
          new Error("Max reconnection attempts reached")
        );
      }
    });

    // Authentication error
    this.socket.on("auth_error", (error) => {
      console.error("🔐 Authentication error:", error);
      this.eventHandlers.onError?.(error);
      this.disconnect();
    });
  }

  /**
   * Handle reconnection logic
   */
  private handleReconnection(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts && this.token) {
      setTimeout(
        () => {
          console.log(
            `🔄 Attempting to reconnect... (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`
          );
          this.connect().catch((error) => {
            console.error("Reconnection failed:", error);
          });
        },
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts)
      ); // Exponential backoff
    }
  }

  /**
   * Update authentication token
   */
  public updateToken(newToken: string): void {
    this.token = newToken;

    if (this.socket && this.socket.connected) {
      // Disconnect and reconnect with new token
      this.disconnect();
      this.connect().catch((error) => {
        console.error("Failed to reconnect with new token:", error);
      });
    }
  }

  /**
   * Disconnect from WebSocket server
   */
  public disconnect(): void {
    if (this.socket) {
      console.log("🔌 Disconnecting from socket server");
      this.socket.disconnect();
      this.socket = null;
      this.isConnecting = false;
    }
  }

  /**
   * Check if socket is connected
   */
  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Get current connection status
   */
  public getStatus(): "connected" | "disconnected" | "connecting" {
    if (this.isConnecting) return "connecting";
    return this.socket?.connected ? "connected" : "disconnected";
  }

  /**
   * Set notification event handler
   */
  public onNotification(handler: NotificationEventHandler): void {
    this.eventHandlers.onNotification = handler;
  }

  /**
   * Set notification read event handler
   */
  public onNotificationRead(handler: (notificationId: string) => void): void {
    this.eventHandlers.onNotificationRead = handler;
  }

  /**
   * Set connection event handlers
   */
  public onConnect(handler: ConnectionEventHandler): void {
    this.eventHandlers.onConnect = handler;
  }

  public onDisconnect(handler: ConnectionEventHandler): void {
    this.eventHandlers.onDisconnect = handler;
  }

  public onError(handler: ErrorEventHandler): void {
    this.eventHandlers.onError = handler;
  }

  public onReconnect(handler: ConnectionEventHandler): void {
    this.eventHandlers.onReconnect = handler;
  }

  /**
   * Send typing indicator (for chat features)
   */
  public sendTypingIndicator(recipientId: string): void {
    if (this.socket && this.socket.connected) {
      this.socket.emit("USER_TYPING", { recipientId });
    }
  }

  /**
   * Manually trigger connection health check
   */
  public ping(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.socket || !this.socket.connected) {
        resolve(false);
        return;
      }

      const timeout = setTimeout(() => {
        resolve(false);
      }, 5000);

      this.socket.emit("ping", (response: any) => {
        clearTimeout(timeout);
        resolve(response === "pong");
      });
    });
  }

  /**
   * Get socket instance (for advanced usage)
   */
  public getSocket(): Socket | null {
    return this.socket;
  }
}

// Singleton instance for global access
let notificationServiceInstance: SocketNotificationService | null = null;

export const createNotificationService = (
  options: SocketOptions
): SocketNotificationService => {
  if (notificationServiceInstance) {
    notificationServiceInstance.disconnect();
  }
  notificationServiceInstance = new SocketNotificationService(options);
  return notificationServiceInstance;
};

export const getNotificationService = (): SocketNotificationService | null => {
  return notificationServiceInstance;
};

export const destroyNotificationService = (): void => {
  if (notificationServiceInstance) {
    notificationServiceInstance.disconnect();
    notificationServiceInstance = null;
  }
};
