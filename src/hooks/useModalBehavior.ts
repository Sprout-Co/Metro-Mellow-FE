import { useEffect, useCallback } from "react";

interface UseModalBehaviorOptions {
  isOpen: boolean;
  onClose: () => void;
  onClearError?: () => void;
}

interface UseModalBehaviorReturn {
  handleBackdropClick: (e: React.MouseEvent) => void;
}

export const useModalBehavior = ({
  isOpen,
  onClose,
  onClearError,
}: UseModalBehaviorOptions): UseModalBehaviorReturn => {
  // Handle escape key press, body overflow, and cleanup
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Add event listener and prevent body scroll
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        if (onClearError) onClearError();
        onClose();
      }
    },
    [onClose, onClearError]
  );

  return {
    handleBackdropClick,
  };
};

