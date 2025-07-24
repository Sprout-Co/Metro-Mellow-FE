import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import { User, Address } from "@/graphql/api";
import styles from "./CustomerSelectionSection.module.scss";

interface CustomerSelectionSectionProps {
  customers: User[];
  selectedCustomerId: string;
  customerSearchQuery: string;
  addresses: Address[];
  selectedAddressId: string;
  onCustomerSelect: (id: string) => void;
  onSearchQueryChange: (query: string) => void;
  onAddressSelect: (addressId: string) => void;
  isLoading?: boolean;
}

const CustomerSelectionSection: React.FC<CustomerSelectionSectionProps> = ({
  customers,
  selectedCustomerId,
  customerSearchQuery,
  addresses,
  selectedAddressId,
  onCustomerSelect,
  onSearchQueryChange,
  onAddressSelect,
  isLoading = false,
}) => {
  const filteredCustomers = customers.filter((customer) => {
    if (!customerSearchQuery) return true;
    const fullName =
      `${customer.firstName || ""} ${customer.lastName || ""}`.toLowerCase();
    const email = customer.email.toLowerCase();
    const phone = customer.phone || "";
    const query = customerSearchQuery.toLowerCase();

    return (
      fullName.includes(query) || email.includes(query) || phone.includes(query)
    );
  });

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  return (
    <Card className={styles.customer_selection}>
      <h3 className={styles.customer_selection__title}>
        <Icon name="user" />
        Customer & Address Selection
      </h3>

      <div className={styles.customer_selection__field}>
        <label className={styles.customer_selection__label}>
          Search Customer
        </label>
        <div className={styles.customer_selection__search_wrapper}>
          <Icon
            name="search"
            className={styles.customer_selection__search_icon}
          />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={customerSearchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className={styles.customer_selection__search_input}
          />
        </div>
      </div>

      {isLoading ? (
        <div className={styles.customer_selection__loading}>
          <Icon name="loader" size={20} />
          <span>Loading customers...</span>
        </div>
      ) : (
        <>
          <div className={styles.customer_selection__field}>
            <label className={styles.customer_selection__label}>
              Select Customer
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) => onCustomerSelect(e.target.value)}
              className={styles.customer_selection__select}
              required
            >
              <option value="">Select a customer...</option>
              {filteredCustomers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName} - {customer.email}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.customer_selection__field}>
            <label className={styles.customer_selection__label}>
              Select Address
            </label>
            <select
              value={selectedAddressId}
              onChange={(e) => onAddressSelect(e.target.value)}
              className={styles.customer_selection__select}
              required
            >
              <option value="">Choose an address...</option>
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.label} - {address.street}, {address.city}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      {/* Address Selection Section */}
      <div className={styles.customer_selection__address_section}>
        {!selectedCustomerId ? (
          <div className={styles.customer_selection__address_placeholder}>
            <p>
              Please select a customer first to choose their service address
            </p>
          </div>
        ) : addresses.length === 0 ? (
          <div className={styles.customer_selection__address_empty}>
            <p>No addresses found for this customer</p>
            <small>
              The customer needs to add an address before creating a
              subscription
            </small>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Card>
  );
};

export default CustomerSelectionSection;
