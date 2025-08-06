import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import { Address } from "@/graphql/api";
import styles from "./AddressSelectionSection.module.scss";

interface AddressSelectionSectionProps {
  addresses: Address[];
  selectedAddressId: string;
  onAddressSelect: (addressId: string) => void;
  customerId: string;
}

const AddressSelectionSection: React.FC<AddressSelectionSectionProps> = ({
  addresses,
  selectedAddressId,
  onAddressSelect,
  customerId,
}) => {
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  if (!customerId) {
    return (
      <Card className={styles.address_selection}>
        <h3 className={styles.address_selection__title}>
          <Icon name="map-pin" />
          Service Address
        </h3>
        <div className={styles.address_selection__placeholder}>
          <Icon name="user" size={48} />
          <p>Please select a customer first to choose their service address</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.address_selection}>
      <h3 className={styles.address_selection__title}>
        <Icon name="map-pin" />
        Service Address
      </h3>

      {addresses.length === 0 ? (
        <div className={styles.address_selection__empty}>
          <Icon name="map-pin" size={48} />
          <p>No addresses found for this customer</p>
          <small>The customer needs to add an address before creating a subscription</small>
        </div>
      ) : (
        <>
          <div className={styles.address_selection__field}>
            <label className={styles.address_selection__label}>Select Address</label>
            <select
              value={selectedAddressId}
              onChange={(e) => onAddressSelect(e.target.value)}
              className={styles.address_selection__select}
            >
              <option value="">Choose an address...</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.label} - {address.street}, {address.city}
                </option>
              ))}
            </select>
          </div>

          {selectedAddress && (
            <div className={styles.address_selection__selected}>
              <h4>Selected Address</h4>
              <div className={styles.address_selection__address_card}>
                <div className={styles.address_selection__address_header}>
                  <strong>{selectedAddress.label}</strong>
                  {selectedAddress.isDefault && (
                    <span className={styles.address_selection__default_badge}>Default</span>
                  )}
                </div>
                <div className={styles.address_selection__address_details}>
                  <p>{selectedAddress.street}</p>
                  <p>
                    {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                  </p>
                  {selectedAddress.country && <p>{selectedAddress.country}</p>}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default AddressSelectionSection;