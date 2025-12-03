import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "../Portal/Portal";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  showBackdrop?: boolean;
  backdropBlur?: boolean;
  className?: string;
  headerContent?: React.ReactNode;
  showHeader?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  contentOverflow?: "auto" | "visible";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  maxWidth = "620px",
  maxHeight = "90vh",
  showBackdrop = true,
  backdropBlur = true,
  className = "",
  headerContent,
  showHeader = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  contentOverflow = "auto",
}) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
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
  }, [isOpen, onClose, closeOnEscape]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence mode="wait">
        <motion.div
          className={`${styles.modal} ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {showBackdrop && (
            <motion.div
              className={`${styles.modal__backdrop} ${
                backdropBlur ? styles["modal__backdrop--blur"] : ""
              }`}
              onClick={handleBackdropClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}

          <motion.div
            className={styles.modal__container}
            style={{ maxWidth, maxHeight, overflow: contentOverflow }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {showHeader && (title || showCloseButton || headerContent) && (
              <div className={styles.modal__header}>
                {headerContent ? (
                  headerContent
                ) : (
                  <>
                    {title ? (
                      <h2 className={styles.modal__title}>{title}</h2>
                    ) : (
                      <div className={styles.modal__title} />
                    )}
                    {showCloseButton && (
                      <button className={styles.modal__close} onClick={onClose}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            <div
              className={styles.modal__content}
              style={{ overflow: contentOverflow }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
