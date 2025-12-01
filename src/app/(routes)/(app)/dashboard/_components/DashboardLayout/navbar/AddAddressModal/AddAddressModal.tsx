import Modal from "@/components/ui/Modal/Modal";
import React, { useState } from "react";
import styles from "./AddAddressModal.module.scss";
import { Navigation, Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);

    try {
      // Get current position
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        }
      );

      const { latitude, longitude } = position.coords;

      // Reverse geocode using OpenStreetMap Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            "User-Agent": "Metromellow App", // Required by Nominatim
          },
        }
      );

      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await response.json();

      // Extract address components
      const address = data.address || {};
      const addressParts: string[] = [];

      // Build address string from components
      if (address.road || address.house_number) {
        const street = [address.house_number, address.road]
          .filter(Boolean)
          .join(" ");
        addressParts.push(street);
      } else if (address.pedestrian) {
        addressParts.push(address.pedestrian);
      }

      if (address.suburb || address.neighbourhood) {
        addressParts.push(address.suburb || address.neighbourhood);
      }

      if (address.city || address.town || address.village) {
        addressParts.push(address.city || address.town || address.village);
      }

      if (address.state) {
        addressParts.push(address.state);
      }

      if (address.country) {
        addressParts.push(address.country);
      }

      // Fallback to display_name if no structured address
      const fullAddress =
        addressParts.length > 0
          ? addressParts.join(", ")
          : data.display_name || `${latitude}, ${longitude}`;

      // Update the search input
      setSearchValue(fullAddress);

      // Call the callback
      if (onAddressSelect) {
        onAddressSelect(fullAddress);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error getting location:", error);
      setIsLoading(false);

      // Show user-friendly error message
      const errorMessage =
        error instanceof GeolocationPositionError
          ? error.code === error.PERMISSION_DENIED
            ? "Location access denied. Please enable location permissions."
            : error.code === error.POSITION_UNAVAILABLE
              ? "Location unavailable. Please try again."
              : "Location request timed out. Please try again."
          : "Failed to get your location. Please enter your address manually.";

      alert(errorMessage);
    }
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
