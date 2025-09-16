import Modal from "@/components/ui/Modal/Modal";
import React, { useState, useEffect } from "react";
import styles from "./AddAddressModal.module.scss";
import { MapPin, Navigation, Search, X } from "lucide-react";
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className={styles["address-modal"]}>
        {/* Simple Header */}
        <div className={styles["address-modal__header"]}>
          <h3 className={styles["address-modal__title"]}>
            Where should we deliver?
          </h3>
          <p className={styles["address-modal__subtitle"]}>
            Enter your address to see available services
          </p>
        </div>

        <div className={styles["address-modal__content"]}>
          {/* Search Field */}
          <div className={styles["address-modal__search-wrapper"]}>
            <div className={styles["address-modal__search-field"]}>
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
              {searchValue && (
                <button
                  className={styles["address-modal__clear-button"]}
                  onClick={handleClearSearch}
                >
                  <X />
                </button>
              )}
            </div>
          </div>

          {/* Suggestions */}
          {searchValue && addressSuggestions.length > 0 ? (
            <div className={styles["address-modal__suggestions"]}>
              <div className={styles["address-modal__suggestions-header"]}>
                Search Results
              </div>
              <div className={styles["address-modal__suggestions-list"]}>
                {addressSuggestions.map((item) => (
                  <button
                    key={item.id}
                    className={styles["address-modal__suggestion"]}
                    onClick={() =>
                      handleSelectAddress(item.main, item.secondary)
                    }
                  >
                    <div className={styles["address-modal__suggestion-icon"]}>
                      <MapPin />
                    </div>
                    <div
                      className={styles["address-modal__suggestion-content"]}
                    >
                      <div className={styles["address-modal__suggestion-main"]}>
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
                  </button>
                ))}
              </div>
            </div>
          ) : searchValue && isSearching ? (
            <div className={styles["address-modal__suggestions"]}>
              <div className={styles["address-modal__suggestions-header"]}>
                Searching...
              </div>
            </div>
          ) : null}

          {/* Divider */}
          <div className={styles["address-modal__divider"]}>
            <span>OR</span>
          </div>

          {/* Current Location Section */}
          <div className={styles["address-modal__location-section"]}>
            <h4 className={styles["address-modal__location-title"]}>
              Use Current Location
            </h4>
            <button
              className={styles["address-modal__location-button"]}
              onClick={handleUseCurrentLocation}
              disabled={isLoading}
            >
              <Navigation />
              {isLoading ? "Getting location..." : "Use My Location"}
            </button>
          </div>

          {/* Confirm Button */}
          {searchValue && (
            <div className={styles["address-modal__footer"]}>
              <FnButton
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleConfirm}
                className={styles["address-modal__confirm-button"]}
              >
                Confirm & Continue
              </FnButton>
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className={styles["address-modal__loading"]}>
            <div className={styles["address-modal__loading-spinner"]} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddAddressModal;
