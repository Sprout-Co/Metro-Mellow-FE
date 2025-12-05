"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./ServiceInformation.module.scss";

export type ServiceInformationDisplayMode = "info-popup";

export interface ServiceInformationSection {
  title: string;
  items: string[];
}

export interface ServiceInformationProps {
  displayMode?: ServiceInformationDisplayMode;
  mainTitle?: string;
  sections: ServiceInformationSection[];
  className?: string;
}

const ServiceInformation: React.FC<ServiceInformationProps> = ({
  displayMode = "info-popup",
  mainTitle = "What's Included in Standard Cleaning?",
  sections,
  className,
}) => {
  // Info popup state
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const infoIconRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        infoIconRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !infoIconRef.current.contains(event.target as Node)
      ) {
        setShowInfoPopup(false);
        setIsClicked(false);
      }
    };

    if (showInfoPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInfoPopup]);

  return (
    <div
      className={`${styles.serviceInformation} ${styles.serviceInformation__infoPopup} ${className || ""}`}
    >
      <div className={styles.infoPopup__wrapper}>
        <button
          className={styles.mainTrigger}
          ref={infoIconRef}
          onClick={() => {
            setIsClicked(!isClicked);
            setShowInfoPopup(!showInfoPopup);
          }}
          aria-label="Service information"
          aria-expanded={showInfoPopup}
        >
          <span className={styles.mainTrigger__title}>{mainTitle}</span>
          <span className={styles.mainTrigger__icon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M8 11V8M8 5H8.01"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
        {showInfoPopup && (
          <div
            ref={popupRef}
            className={styles.infoPopup__popup}
            onMouseEnter={() => setShowInfoPopup(true)}
            onMouseLeave={() => {
              if (!isClicked) {
                setShowInfoPopup(false);
              }
            }}
          >
            <div className={styles.infoPopup__content}>
              {mainTitle && (
                <h4 className={styles.infoPopup__title}>{mainTitle}</h4>
              )}
              {sections.map((section) => (
                <div key={section.title} className={styles.infoPopup__section}>
                  <h5 className={styles.infoPopup__sectionTitle}>
                    {section.title}
                  </h5>
                  <ul className={styles.infoPopup__list}>
                    {section.items.map((item, index) => (
                      <li key={index} className={styles.infoPopup__listItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceInformation;
