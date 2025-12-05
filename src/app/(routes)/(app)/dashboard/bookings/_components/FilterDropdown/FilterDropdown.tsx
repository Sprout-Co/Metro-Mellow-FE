// src/app/(routes)/(app)/dashboard/bookings/_components/FilterDropdown/FilterDropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import styles from "./FilterDropdown.module.scss";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.filterDropdown} ref={dropdownRef}>
      <motion.button
        className={styles.filterDropdown__trigger}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        <span className={styles.filterDropdown__label}>{label}:</span>
        <span className={styles.filterDropdown__value}>
          {selectedOption?.label || "Select"}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={styles.filterDropdown__icon}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.filterDropdown__menu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                className={`${styles.filterDropdown__option} ${
                  value === option.value
                    ? styles["filterDropdown__option--active"]
                    : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
                whileHover={{ backgroundColor: "rgba(7, 80, 86, 0.05)" }}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check
                    size={14}
                    className={styles.filterDropdown__checkIcon}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
