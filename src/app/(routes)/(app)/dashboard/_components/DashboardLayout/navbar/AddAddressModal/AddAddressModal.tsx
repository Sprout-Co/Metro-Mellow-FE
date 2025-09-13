import Modal from "@/components/ui/Modal/Modal";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AddAddressModal.module.scss";
import { MapPin, Navigation, Search, X, Star } from "lucide-react";
import { FnButton } from "@/components/ui/Button/FnButton";

interface AddressOption {
  id: string;
  main: string;
  secondary?: string;
  type?: "suggestion" | "recent" | "saved";
}

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect?: (address: string) => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState<AddressOption[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Search effect with debounce
  useEffect(() => {
    if (searchValue.length > 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const mockSuggestions: AddressOption[] = [
          {
            id: "1",
            main: `${searchValue} Street`,
            secondary: "Lekki Phase 1, Lagos",
            type: "suggestion",
          },
          {
            id: "2",
            main: `${searchValue} Avenue`,
            secondary: "Victoria Island, Lagos",
            type: "suggestion",
          },
          {
            id: "3",
            main: `${searchValue} Close`,
            secondary: "Ikoyi, Lagos",
            type: "suggestion",
          },
          {
            id: "4",
            main: `${searchValue} Road`,
            secondary: "Ajah, Lagos",
            type: "suggestion",
          },
        ];
        setAddressSuggestions(mockSuggestions);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setAddressSuggestions([]);
      setIsSearching(false);
    }
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setAddressSuggestions([]);
  };

  const handleSelectAddress = (address: string, secondary?: string) => {
    const fullAddress = secondary ? `${address}, ${secondary}` : address;
    setSearchValue(address);
    setAddressSuggestions([]);
    if (onAddressSelect) {
      onAddressSelect(fullAddress);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        // Simulate reverse geocoding
        setTimeout(() => {
          setIsLoading(false);
          const address = "Current Location - Lekki Phase 1, Lagos";
          if (onAddressSelect) {
            onAddressSelect(address);
          }
          onClose();
        }, 1500);
      },
      (error) => {
        setIsLoading(false);
        // Fallback to default location
        const address = "Lagos, Nigeria";
        if (onAddressSelect) {
          onAddressSelect(address);
        }
      }
    );
  };

  const handleConfirm = () => {
    if (searchValue && onAddressSelect) {
      onAddressSelect(searchValue);
      onClose();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className={styles["address-modal"]}>
        {/* Redesigned Header */}
        <motion.div
          className={styles["address-modal__header"]}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className={styles["address-modal__icon-wrapper"]}>
            <MapPin className={styles["address-modal__icon"]} />
          </div>
          <h3 className={styles["address-modal__title"]}>
            Where should we deliver?
          </h3>
          <p className={styles["address-modal__subtitle"]}>
            Enter your address to see available services
          </p>
        </motion.div>

        <div className={styles["address-modal__content"]}>
          {/* Search Field */}
          <motion.div
            className={styles["address-modal__search-wrapper"]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div
              className={`${styles["address-modal__search-field"]} ${
                isFocused ? styles["address-modal__search-field--focused"] : ""
              } ${
                searchValue
                  ? styles["address-modal__search-field--has-value"]
                  : ""
              }`}
            >
              <div className={styles["address-modal__search-inner"]}>
                <Search className={styles["address-modal__search-icon"]} />
                <input
                  type="text"
                  className={styles["address-modal__search-input"]}
                  placeholder="Search for area, street or landmark..."
                  value={searchValue}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoFocus
                />
                <AnimatePresence>
                  {searchValue && (
                    <motion.button
                      className={styles["address-modal__clear-button"]}
                      onClick={handleClearSearch}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                    >
                      <X />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Suggestions / Recent Addresses */}
          <AnimatePresence mode="wait">
            {searchValue && addressSuggestions.length > 0 ? (
              <motion.div
                className={styles["address-modal__suggestions"]}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                <div className={styles["address-modal__suggestions-header"]}>
                  Search Results
                </div>
                <div className={styles["address-modal__suggestions-list"]}>
                  {addressSuggestions.map((item, index) => (
                    <motion.button
                      key={item.id}
                      className={styles["address-modal__suggestion"]}
                      onClick={() =>
                        handleSelectAddress(item.main, item.secondary)
                      }
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={styles["address-modal__suggestion-icon"]}>
                        <MapPin />
                      </div>
                      <div
                        className={styles["address-modal__suggestion-content"]}
                      >
                        <div
                          className={styles["address-modal__suggestion-main"]}
                        >
                          {item.main}
                        </div>
                        {item.secondary && (
                          <div
                            className={
                              styles["address-modal__suggestion-secondary"]
                            }
                          >
                            {item.secondary}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : searchValue && isSearching ? (
              <motion.div
                className={styles["address-modal__suggestions"]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles["address-modal__suggestions-header"]}>
                  Searching...
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Divider */}
          <div className={styles["address-modal__divider"]}>
            <span>OR</span>
          </div>

          {/* Current Location Section */}
          <motion.div
            className={styles["address-modal__location-section"]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className={styles["address-modal__location-icon-wrapper"]}>
              <Navigation className={styles["address-modal__location-icon"]} />
            </div>
            <h4 className={styles["address-modal__location-title"]}>
              Use Current Location
            </h4>
            <p className={styles["address-modal__location-description"]}>
              Allow location access for accurate delivery
            </p>
            <button
              className={styles["address-modal__location-button"]}
              onClick={handleUseCurrentLocation}
              disabled={isLoading}
            >
              <Navigation />
              {isLoading ? "Getting location..." : "Share Location"}
            </button>
          </motion.div>

          {/* Confirm Button */}
          {searchValue && (
            <motion.div
              className={styles["address-modal__footer"]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FnButton
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleConfirm}
                className={styles["address-modal__confirm-button"]}
              >
                Confirm & Continue
              </FnButton>
            </motion.div>
          )}
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className={styles["address-modal__loading"]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={styles["address-modal__loading-content"]}>
                <div className={styles["address-modal__loading-spinner"]} />
                <div className={styles["address-modal__loading-text"]}>
                  Getting your location...
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default AddAddressModal;
