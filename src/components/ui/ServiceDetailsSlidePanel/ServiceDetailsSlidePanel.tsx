"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Portal from "../Portal/Portal";
import styles from "./ServiceDetailsSlidePanel.module.scss";

interface ServiceDetailsSlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  serviceTitle: string;
  serviceDescription: string;
  servicePrice: number;
  serviceImage: string;
  apartmentType?: "flat" | "duplex";
  roomCount?: number;
}

const ServiceDetailsSlidePanel: React.FC<ServiceDetailsSlidePanelProps> = ({
  isOpen,
  onClose,
  onOpen,
  serviceTitle,
  serviceDescription,
  servicePrice,
  serviceImage,
  apartmentType,
  roomCount,
}) => {
  // Don't render anything if neither open nor should show toggle
  if (!isOpen && !onOpen) return null;

  return (
    <Portal>
      {/* Toggle Button - shows when panel is closed */}
      {!isOpen && onOpen && (
        <motion.button
          className={styles.slidePanel__toggle}
          onClick={onOpen}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ 
            type: "spring", 
            damping: 30, 
            stiffness: 300 
          }}
          aria-label="Show service details"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Details</span>
        </motion.button>
      )}

      {/* Main Slide Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className={styles.slidePanel}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300 
            }}
          >
          {/* Close Button */}
          <button 
            className={styles.slidePanel__close} 
            onClick={onClose}
            aria-label="Close service details"
          >
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

          {/* Service Image */}
          <div className={styles.slidePanel__imageContainer}>
            <Image
              src={serviceImage}
              alt={serviceTitle}
              width={400}
              height={300}
              className={styles.slidePanel__image}
            />
            <div className={styles.slidePanel__imageOverlay}>
              <h3 className={styles.slidePanel__imageTitle}>
                Your Cleaning Service
              </h3>
            </div>
          </div>

          {/* Service Details */}
          <div className={styles.slidePanel__content}>
            <div className={styles.slidePanel__header}>
              <h2 className={styles.slidePanel__title}>{serviceTitle}</h2>
              <div className={styles.slidePanel__price}>
                NGN {servicePrice.toLocaleString()}
              </div>
            </div>

            <p className={styles.slidePanel__description}>
              {serviceDescription}
            </p>

            {/* Configuration Summary */}
            {(apartmentType || roomCount) && (
              <div className={styles.slidePanel__configuration}>
                <h4 className={styles.slidePanel__configTitle}>
                  Service Details
                </h4>
                <div className={styles.slidePanel__configDetails}>
                  {apartmentType && (
                    <div className={styles.slidePanel__configItem}>
                      <span className={styles.slidePanel__configLabel}>
                        Property Type:
                      </span>
                      <span className={styles.slidePanel__configValue}>
                        {apartmentType === "flat" ? "Flat/Apartment" : "Duplex/House"}
                      </span>
                    </div>
                  )}
                  {roomCount && (
                    <div className={styles.slidePanel__configItem}>
                      <span className={styles.slidePanel__configLabel}>
                        Total Rooms:
                      </span>
                      <span className={styles.slidePanel__configValue}>
                        {roomCount} rooms
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Service Features */}
            <div className={styles.slidePanel__features}>
              <h4 className={styles.slidePanel__featuresTitle}>
                What's Included
              </h4>
              <ul className={styles.slidePanel__featuresList}>
                <li className={styles.slidePanel__feature}>
                  Professional cleaning supplies included
                </li>
                <li className={styles.slidePanel__feature}>
                  Experienced and vetted cleaning professionals
                </li>
                <li className={styles.slidePanel__feature}>
                  Satisfaction guarantee
                </li>
                <li className={styles.slidePanel__feature}>
                  Flexible scheduling options
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ServiceDetailsSlidePanel; 