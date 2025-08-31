import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Toast.module.scss";

export interface Toast {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  onClose: (id: string) => void;
}

interface ToastProps {
  toast: Toast;
}

const ToastComponent: React.FC<ToastProps> = ({ toast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.onClose(toast.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <motion.div
      className={`${styles.toast} ${styles[toast.type]}`}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div className={styles.content}>
        <h4>{toast.title}</h4>
        <p>{toast.message}</p>
      </div>
      <button
        onClick={() => toast.onClose(toast.id)}
        className={styles.closeButton}
      >
        ✕
      </button>
    </motion.div>
  );
};

// Simple toast state management
let toasts: Toast[] = [];
let setToasts: React.Dispatch<React.SetStateAction<Toast[]>> | null = null;

const ToastContainer: React.FC = () => {
  const [toastState, setToastState] = useState<Toast[]>([]);

  // Set the global setToasts function
  setToasts = setToastState;
  toasts = toastState;

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {toastState.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Create and mount the toast container
if (typeof window !== "undefined") {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);

  // Render the ToastContainer
  const root = ReactDOM.createRoot(container);
  root.render(<ToastContainer />);
}

export const showToast = (
  message: string,
  type: "success" | "error" | "info",
  title?: string
) => {
  if (!setToasts) {
    console.warn("Toast system not initialized. Toast will not be displayed.");
    return;
  }

  const id = Math.random().toString(36).substr(2, 9);
  const newToast: Toast = {
    id,
    type,
    title:
      title ||
      (type === "success" ? "Success" : type === "error" ? "Error" : "Info"),
    message,
    onClose: (id: string) => {
      setToasts!((prev) => prev.filter((toast) => toast.id !== id));
    },
  };

  setToasts((prev) => [...prev, newToast]);

  // Auto-remove toast after 5 seconds
  setTimeout(() => {
    setToasts!((prev) => prev.filter((toast) => toast.id !== id));
  }, 5000);
};
