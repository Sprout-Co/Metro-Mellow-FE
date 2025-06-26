"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./ConfirmationModal.module.scss";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  isLoading = false,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isLoading]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const getIconForVariant = () => {
    switch (variant) {
      case "danger":
        return "alert-circle";
      case "warning":
        return "alert-triangle";
      case "info":
        return "info";
      default:
        return "alert-triangle";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.confirmation_modal__backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={`${styles.confirmation_modal} ${styles[`confirmation_modal--${variant}`]}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.confirmation_modal__header}>
              <div className={styles.confirmation_modal__icon}>
                <Icon name={getIconForVariant() as any} size={24} />
              </div>
              <h3 className={styles.confirmation_modal__title}>{title}</h3>
            </div>

            <div className={styles.confirmation_modal__body}>
              <p className={styles.confirmation_modal__message}>{message}</p>
            </div>

            <div className={styles.confirmation_modal__footer}>
              <Button
                variant="secondary"
                size="medium"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelText}
              </Button>
              <Button
                variant={variant === "danger" ? "primary" : "primary"}
                size="medium"
                onClick={onConfirm}
                disabled={isLoading}
                loading={isLoading}
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
