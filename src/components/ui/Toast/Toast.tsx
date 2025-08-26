import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Toast.module.scss';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
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
      <button onClick={() => toast.onClose(toast.id)} className={styles.closeButton}>
        ✕
      </button>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};