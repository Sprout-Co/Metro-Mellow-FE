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
  minHeight?: string;
  fullScreen?: boolean;
  showBackdrop?: boolean;
  backdropBlur?: boolean;
  className?: string;
  headerContent?: React.ReactNode;
  showHeader?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  contentOverflow?: "auto" | "visible" | "hidden";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  maxWidth = "620px",
  maxHeight = "90vh",
  minHeight = "initial",
  fullScreen = false,
  showBackdrop = true,
  backdropBlur = true,
  className = "",
  headerContent,
  showHeader = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  contentOverflow = "auto",
}) => {
  const effectiveMaxWidth = fullScreen ? "100%" : maxWidth;
  const effectiveMaxHeight = fullScreen ? "100%" : maxHeight;
  const modalContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Lock scroll on both html and body for broad browser support
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty("overflow", "hidden", "important");
      document.documentElement.style.setProperty("overscroll-behavior", "none", "important");
      document.body.style.setProperty("overflow", "hidden", "important");
      document.body.style.setProperty("overscroll-behavior", "none", "important");
      
      // For iOS Safari:
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      
      const scrollY = document.body.style.top;
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overscroll-behavior");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("overscroll-behavior");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, [isOpen, onClose, closeOnEscape]);

  React.useEffect(() => {
    if (!isOpen) return;

    const preventDefault = (e: TouchEvent | WheelEvent) => {
      // If the scroll target is NOT within the modal container, prevent it
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventDefault, { passive: false });
    document.addEventListener("wheel", preventDefault, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventDefault);
      document.removeEventListener("wheel", preventDefault);
    };
  }, [isOpen]);

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
          className={`${styles.modal} ${className} ${
            fullScreen ? styles["modal--fullScreen"] : ""
          }`}
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
            ref={modalContainerRef}
            className={styles.modal__container}
            style={{
              maxWidth: effectiveMaxWidth,
              maxHeight: effectiveMaxHeight,
              minHeight: minHeight,
              overflow: contentOverflow,
            }}
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
