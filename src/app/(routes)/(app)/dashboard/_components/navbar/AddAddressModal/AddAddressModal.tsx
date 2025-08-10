import Modal from "@/components/ui/Modal/Modal";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AddAddressModal.module.scss";
import { MapPin, Navigation, Search, X } from "lucide-react";
import { FnButton } from "@/components/ui/Button/FnButton";
import Input from "@/components/ui/Input";

interface AddressOption {
  id: string;
  main: string;
  secondary?: string;
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

  // Mock address suggestions - in a real app this would come from an API
  useEffect(() => {
    if (searchValue.length > 2) {
      setIsLoading(true);
      // Simulating API call delay
      const timer = setTimeout(() => {
        const mockSuggestions: AddressOption[] = [
          { id: "1", main: `${searchValue}, Nigeria` },
          { id: "2", main: `${searchValue}-Umuruba Ndiogu, Nigeria` },
          { id: "3", main: `${searchValue} Apena Street, Lagos, Nigeria` },
          {
            id: "4",
            main: `${searchValue} supermarket gra Ikota, Lekki, Nigeria`,
          },
          { id: "5", main: `${searchValue}-Abu St, Lagos, Nigeria` },
        ];
        setAddressSuggestions(mockSuggestions);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setAddressSuggestions([]);
    }
  }, [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setAddressSuggestions([]);
  };

  const handleSelectAddress = (address: string) => {
    if (onAddressSelect) {
      onAddressSelect(address);
    }
    setSearchValue(address);
    setAddressSuggestions([]);
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    // Simulate getting location
    setTimeout(() => {
      setIsLoading(false);
      handleSelectAddress("Current Location (Lagos, Nigeria)");
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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
    <Modal isOpen={isOpen} onClose={onClose} title="Delivery Address">
      <div className={styles["address-modal"]}>
        <Input
          placeholder="Search for an address"
          value={searchValue}
          onChange={handleInputChange}
          autoFocus
          fullWidth
          leftIcon={<Search />}
          rightIcon={<X />}
        />
        <div className={styles["address-modal__search-container"]}>
          <Search className={styles["address-modal__search-icon"]} />
          <input
            type="text"
            className={styles["address-modal__search-input"]}
            placeholder="Search for an address"
            value={searchValue}
            onChange={handleInputChange}
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

        <AnimatePresence>
          {searchValue && addressSuggestions.length > 0 && (
            <motion.div
              className={styles["address-modal__suggestions"]}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {addressSuggestions.map((suggestion) => (
                <motion.button
                  key={suggestion.id}
                  className={styles["address-modal__suggestion"]}
                  onClick={() => handleSelectAddress(suggestion.main)}
                  variants={itemVariants}
                >
                  <MapPin
                    className={styles["address-modal__suggestion-icon"]}
                  />
                  <div className={styles["address-modal__suggestion-text"]}>
                    <span className={styles["address-modal__suggestion-main"]}>
                      {suggestion.main}
                    </span>
                    {suggestion.secondary && (
                      <span
                        className={
                          styles["address-modal__suggestion-secondary"]
                        }
                      >
                        {suggestion.secondary}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className={styles["address-modal__location-button"]}
          onClick={handleUseCurrentLocation}
          whileTap={{ scale: 0.98 }}
          whileHover={{
            backgroundColor: "var(--color-neutral-lighter)",
            transition: { duration: 0.2 },
          }}
        >
          <Navigation className={styles["address-modal__location-icon"]} />
          <span className={styles["address-modal__location-text"]}>
            Share your current location
          </span>
        </motion.button>

        <FnButton
          variant="primary"
          size="sm"
          disabled={!searchValue}
          onClick={() => {
            if (searchValue && onAddressSelect) {
              onAddressSelect(searchValue);
              onClose();
            }
          }}
        >
          <span>Confirm Address</span>
        </FnButton>

        {isLoading && (
          <div className={styles["address-modal__loading"]}>
            <div className={styles["address-modal__loading-spinner"]}></div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddAddressModal;
