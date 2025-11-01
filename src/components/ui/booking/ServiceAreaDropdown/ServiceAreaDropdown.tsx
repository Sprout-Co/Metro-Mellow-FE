"use client";
import React, { useState, useEffect } from "react";
import styles from "./ServiceAreaDropdown.module.scss";

export interface ServiceAreaDropdownProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ServiceAreaDropdown: React.FC<ServiceAreaDropdownProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Lagos service areas
  const lagosServiceAreas = [
    "Ikeja",
    "Victoria Island",
    "Lekki",
    "Ikoyi",
    "Surulere",
    "Yaba",
    "Apapa",
    "Lagos Island",
    "Ajah",
    "Festac",
    "Maryland",
    "Gbagada",
    "Magodo",
    "Ojodu",
    "Berger",
    "Oshodi",
    "Mushin",
    "Amuwo Odofin",
    "Egbeda",
    "Alimosho",
    "Agege",
    "Ifako-Ijaiye",
    "Isolo",
    "Ojo",
    "Badagry",
    "Epe",
    "Ikorodu",
  ];

  // Filter service areas based on search
  const filteredServiceAreas = lagosServiceAreas.filter((area) =>
    area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.serviceAreaDropdown__wrapper}`)) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showDropdown) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showDropdown]);

  const handleOpen = () => {
    if (!disabled) {
      setSearchTerm("");
      setShowDropdown(true);
    }
  };

  const handleSelect = (area: string) => {
    onChange(area);
    setSearchTerm("");
    setShowDropdown(false);
  };

  return (
    <div className={styles.serviceAreaDropdown__wrapper}>
      <input
        type="text"
        placeholder="Select service area..."
        value={showDropdown ? searchTerm : value}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleOpen}
        className={styles.serviceAreaDropdown__input}
        readOnly={!showDropdown}
        onClick={handleOpen}
        disabled={disabled}
      />
      <div
        className={styles.serviceAreaDropdown__caret}
        onClick={() => {
          if (!showDropdown) {
            handleOpen();
          } else {
            setShowDropdown(false);
            setSearchTerm("");
          }
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 8L10 12L14 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showDropdown && (
        <div className={styles.serviceAreaDropdown__list}>
          {filteredServiceAreas.length > 0 ? (
            filteredServiceAreas.map((area) => (
              <div
                key={area}
                className={styles.serviceAreaDropdown__item}
                onClick={() => handleSelect(area)}
              >
                {area}
              </div>
            ))
          ) : (
            <div className={styles.serviceAreaDropdown__item}>
              No areas found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceAreaDropdown;
