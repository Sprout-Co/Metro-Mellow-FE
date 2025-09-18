import Modal from "@/components/ui/Modal/Modal";
import React, { useState, useEffect } from "react";
import styles from "./AddAddressModal.module.scss";
import { MapPin, Navigation, Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Add Address"
      maxWidth="450px"
    >
      <div className={styles.modal}>
        {/* Search Input */}
        <div className={styles.searchField}>
          <Search size={20} />
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your address"
            value={searchValue}
            onChange={handleInputChange}
            autoFocus
          />
          {searchValue && (
            <button onClick={handleClearSearch} className={styles.clearBtn}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Suggestions */}
        {addressSuggestions.length > 0 && (
          <div className={styles.suggestions}>
            {addressSuggestions.map((item) => (
              <button
                key={item.id}
                className={styles.suggestion}
                onClick={() => handleSelectAddress(item.main, item.secondary)}
              >
                <MapPin size={16} />
                <span>{item.main}</span>
                {item.secondary && <small>{item.secondary}</small>}
              </button>
            ))}
          </div>
        )}

        {/* Loading state */}
        {isSearching && <div className={styles.loading}>Searching...</div>}

        {/* Current Location */}
        <button
          className={styles.locationBtn}
          onClick={handleUseCurrentLocation}
          disabled={isLoading}
        >
          <Navigation size={16} />
          {isLoading ? "Getting location..." : "Use current location"}
        </button>

        {/* Confirm Button */}
        {searchValue && (
          <Button
            variant="primary"
            onClick={handleConfirm}
            fullWidth
            className={styles.confirmBtn}
          >
            Confirm
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default AddAddressModal;
