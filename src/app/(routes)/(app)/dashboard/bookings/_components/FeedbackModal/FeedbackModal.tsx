"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MessageSquare,
  X,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import styles from "./FeedbackModal.module.scss";
import { Booking } from "@/graphql/api";
import Modal from "@/components/ui/Modal/Modal";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onSubmit?: (rating: number, comment: string) => Promise<void>;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!booking) return null;

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleStarHover = (selectedRating: number) => {
    setHoverRating(selectedRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please provide a comment");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(rating, comment.trim());
      }

      setShowSuccess(true);

      // Close modal after success message
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setRating(0);
        setComment("");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit feedback"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingText = (ratingValue: number) => {
    switch (ratingValue) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Select a rating";
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div className={styles.modal}>
        {/* Header */}
        <div className={styles.modal__header}>
          <div className={styles.modal__iconWrapper}>
            <MessageSquare />
          </div>
          <button className={styles.modal__closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className={styles.modal__titleSection}>
          <h2 className={styles.modal__title}>Leave Feedback</h2>
          <p className={styles.modal__subtitle}>
            How was your experience with this service?
          </p>
        </div>

        {/* Service Info */}
        <div className={styles.modal__serviceInfo}>
          <p className={styles.modal__serviceName}>
            {booking.service?.name || "Service"}
          </p>
          <p className={styles.modal__serviceDate}>
            {new Date(booking.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Rating Section */}
        <div className={styles.modal__ratingSection}>
          <h3 className={styles.modal__sectionTitle}>Rate your experience</h3>
          <div className={styles.modal__stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                className={`${styles.modal__star} ${
                  star <= displayRating ? styles["modal__star--filled"] : ""
                }`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Star
                  size={32}
                  fill={star <= displayRating ? "#FFD700" : "transparent"}
                  stroke={star <= displayRating ? "#FFD700" : "#E0E7FF"}
                />
              </motion.button>
            ))}
          </div>
          <p className={styles.modal__ratingText}>
            {getRatingText(displayRating)}
          </p>
        </div>

        {/* Comment Section */}
        <div className={styles.modal__commentSection}>
          <h3 className={styles.modal__sectionTitle}>
            Tell us more about your experience
          </h3>
          <textarea
            className={styles.modal__textarea}
            placeholder="Share your thoughts about the service, staff, or any suggestions for improvement..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={500}
          />
          <div className={styles.modal__characterCount}>
            {comment.length}/500
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className={styles.modal__error}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AlertTriangle size={16} />
              <div>
                <strong>Error:</strong>
                <p>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className={styles.modal__success}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CheckCircle size={24} />
              <div>
                <h4>Feedback Submitted!</h4>
                <p>
                  Thank you for your feedback. It helps us improve our service.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className={styles.modal__footer}>
          <motion.button
            className={`${styles.modal__button} ${styles["modal__button--secondary"]}`}
            onClick={onClose}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            className={`${styles.modal__button} ${styles["modal__button--primary"]}`}
            onClick={handleSubmit}
            disabled={rating === 0 || !comment.trim() || isSubmitting}
            whileHover={
              rating > 0 && comment.trim() && !isSubmitting
                ? { scale: 1.02 }
                : {}
            }
            whileTap={
              rating > 0 && comment.trim() && !isSubmitting
                ? { scale: 0.98 }
                : {}
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </motion.button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default FeedbackModal;
