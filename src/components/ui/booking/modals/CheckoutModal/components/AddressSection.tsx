import React, { useMemo } from "react";
import { User, useActiveServiceAreasQuery } from "@/graphql/api";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useGetCurrentUserQuery } from "@/graphql/api";
import styles from "../CheckoutModal.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import { PlacesAutocomplete } from "@/components/ui/PlacesAutocomplete/PlacesAutocomplete";

interface AddressSectionProps {
  user: User | null;
  isAuthenticated: boolean;
  isNewAddress: boolean;
  setIsNewAddress: (value: boolean) => void;
  formData: {
    city: string;
    street: string;
    addressId?: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onAddressSelect: (addressId: string, city: string, street: string) => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({
  user,
  isAuthenticated,
  isNewAddress,
  setIsNewAddress,
  formData,
  onInputChange,
  onAddressSelect,
}) => {
  // Fetch active service areas
  const { data: serviceAreasData, loading: loadingServiceAreas } =
    useActiveServiceAreasQuery();

  // Auth operations
  const { handleAddAddress } = useAuthOperations();
  const { refetch: refetchUser } = useGetCurrentUserQuery({ skip: true });

  // Get unique cities from service areas
  const availableCities = useMemo(() => {
    return serviceAreasData?.activeServiceAreas.map((area) => area.name) || [];
  }, [serviceAreasData]);

  const handleAddAddressClick = async () => {
    if (!formData.city || !formData.street) return;

    const serviceArea = serviceAreasData?.activeServiceAreas.find(
      (area) => area.name.toLowerCase() === formData.city.toLowerCase()
    );

    if (!serviceArea) return;

    try {
      await handleAddAddress({
        city: formData.city,
        street: formData.street,
        serviceArea: serviceArea.id,
        label: `My Home`,
        isDefault: !user?.addresses?.length,
      });

      await refetchUser();
    } catch (error) {
      console.error("Failed to add address:", error);
    }
  };

  if (!user || !isAuthenticated) {
    return (
      <div className={styles.checkoutModal__field}>
        <p>Please login to continue</p>
      </div>
    );
  }

  return (
    <>
      {/* Address Section Header */}
      <div className={styles.checkoutModal__field}>
        <label className={styles.checkoutModal__label}>Delivery Address</label>
        <div className={styles.checkoutModal__radioGroup}>
          <label className={styles.checkoutModal__radioLabel}>
            <input
              type="radio"
              name="addressType"
              value="saved"
              checked={!isNewAddress}
              onChange={() => setIsNewAddress(false)}
              className={styles.checkoutModal__radio}
            />
            <span className={styles.checkoutModal__radioText}>Saved</span>
          </label>

          <label className={styles.checkoutModal__radioLabel}>
            <input
              type="radio"
              name="addressType"
              value="new"
              checked={isNewAddress}
              onChange={() => setIsNewAddress(true)}
              className={styles.checkoutModal__radio}
            />
            <span className={styles.checkoutModal__radioText}>New</span>
          </label>
        </div>
      </div>

      {/* Address Input/Selection */}
      {isNewAddress ? (
        <>
          {/* City Field */}
          <div className={styles.checkoutModal__field}>
            <label htmlFor="city" className={styles.checkoutModal__label}>
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={onInputChange}
              className={styles.checkoutModal__select}
              required
              disabled={loadingServiceAreas}
            >
              <option value="">
                {loadingServiceAreas ? "Loading..." : "Select your city"}
              </option>
              {availableCities.map((city) => (
                <option key={city} value={city.toLowerCase()}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Street Field */}
          <div className={styles.checkoutModal__field}>
            <label htmlFor="street" className={styles.checkoutModal__label}>
              Street Address
            </label>
            <PlacesAutocomplete
              onSelect={(address) => {
                // Update the street field when an address is selected
                onInputChange({
                  target: {
                    name: "street",
                    value: address,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              placeholder={
                formData.city
                  ? `Search address in ${formData.city}...`
                  : "Enter your full street address"
              }
            />
            {formData.street && (
              <div className={styles.checkoutModal__selectedAddress}>
                <p>{formData.street}</p>
              </div>
            )}
          </div>

          <FnButton
            variant="primary"
            type="button"
            onClick={handleAddAddressClick}
          >
            Save & Select Address
          </FnButton>
        </>
      ) : (
        <>
          {user?.addresses && user.addresses.length > 0 ? (
            <div className={styles.checkoutModal__field}>
              <select
                id="savedAddress"
                name="addressId"
                value={formData.addressId || ""}
                onChange={(e) => {
                  const selectedAddress = user.addresses?.find(
                    (addr) => addr?.id === e.target.value
                  );
                  if (selectedAddress) {
                    onAddressSelect(
                      selectedAddress.id ?? "",
                      selectedAddress.city ?? "",
                      selectedAddress.street ?? ""
                    );
                  }
                }}
                className={styles.checkoutModal__select}
                required
              >
                <option value="">Choose a saved address</option>
                {user.addresses.map(
                  (address) =>
                    address && (
                      <option key={address.id} value={address.id}>
                        {address.street}
                        {address.isDefault ? " ★" : ""}
                      </option>
                    )
                )}
              </select>
            </div>
          ) : (
            <div className={styles.checkoutModal__noAddress}>
              <p>No saved addresses yet</p>
              <p>Switch to &quot;New&quot; to add your first address</p>
            </div>
          )}
        </>
      )}
    </>
  );
};
