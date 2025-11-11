import React, { useMemo } from "react";
import { User, useActiveServiceAreasQuery } from "@/graphql/api";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useGetCurrentUserQuery } from "@/graphql/api";
import styles from "../CheckoutModal.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

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
      {/* Address Type Radio Buttons */}
      <div className={styles.checkoutModal__field}>
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
            <span className={styles.checkoutModal__radioText}>
              Saved Address
            </span>
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
            <span className={styles.checkoutModal__radioText}>New Address</span>
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
                {loadingServiceAreas ? "Loading cities..." : "Select City"}
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
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={onInputChange}
              className={styles.checkoutModal__input}
              required
            />
          </div>

          <FnButton
            variant="primary"
            type="button"
            onClick={handleAddAddressClick}
          >
            add and select address
          </FnButton>
        </>
      ) : (
        <>
          {user?.addresses && user.addresses.length > 0 ? (
            <div className={styles.checkoutModal__addressList}>
              <h4 className={styles.checkoutModal__label}>Select an address</h4>

              {user.addresses.map(
                (address) =>
                  address && (
                    <div
                      key={address.id}
                      className={`${styles.checkoutModal__addressCard} ${
                        formData.addressId === address.id
                          ? styles.checkoutModal__addressCard__selected
                          : ""
                      }`}
                      onClick={() =>
                        onAddressSelect(
                          address.id ?? "",
                          address.city ?? "",
                          address.street ?? ""
                        )
                      }
                    >
                      <div className={styles.checkoutModal__addressCardContent}>
                        {/* <div
                          className={styles.checkoutModal__addressCardHeader}
                        >
                          <span
                            className={styles.checkoutModal__addressCardLabel}
                          >
                            {address.label ?? "Address"}
                          </span>

                          {address.isDefault && (
                            <span
                              className={
                                styles.checkoutModal__addressCardDefault
                              }
                            >
                              Default
                            </span>
                          )}
                        </div> */}

                        <p className={styles.checkoutModal__addressCardText}>
                          {address.street ?? ""}
                        </p>
                      </div>

                      <div className={styles.checkoutModal__addressCardRadio}>
                        <input
                          type="radio"
                          name="addressId"
                          value={address.id}
                          checked={formData.addressId === address.id}
                          onChange={() => {}}
                          className={styles.checkoutModal__radio}
                        />
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className={styles.checkoutModal__noAddress}>
              <p>You don't have any saved addresses.</p>
              <p>Please add a new address.</p>
            </div>
          )}
        </>
      )}
    </>
  );
};
