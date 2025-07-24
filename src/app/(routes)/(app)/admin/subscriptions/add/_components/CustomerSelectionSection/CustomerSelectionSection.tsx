import React from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import { User } from "@/graphql/api";
import styles from "./CustomerSelectionSection.module.scss";

interface CustomerSelectionSectionProps {
  customers: User[];
  selectedCustomerId: string;
  customerSearchQuery: string;
  onCustomerSelect: (id: string) => void;
  onSearchQueryChange: (query: string) => void;
  isLoading?: boolean;
}

const CustomerSelectionSection: React.FC<CustomerSelectionSectionProps> = ({
  customers,
  selectedCustomerId,
  customerSearchQuery,
  onCustomerSelect,
  onSearchQueryChange,
  isLoading = false,
}) => {
  const filteredCustomers = customers.filter((customer) => {
    if (!customerSearchQuery) return true;
    const fullName = `${customer.firstName || ""} ${customer.lastName || ""}`.toLowerCase();
    const email = customer.email.toLowerCase();
    const phone = customer.phone || "";
    const query = customerSearchQuery.toLowerCase();

    return fullName.includes(query) || email.includes(query) || phone.includes(query);
  });

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  return (
    <Card className={styles.customer_selection}>
      <h3 className={styles.customer_selection__title}>
        <Icon name="user" />
        Customer Selection
      </h3>

      <div className={styles.customer_selection__field}>
        <label className={styles.customer_selection__label}>Search Customer</label>
        <div className={styles.customer_selection__search_wrapper}>
          <Icon name="search" className={styles.customer_selection__search_icon} />
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
        <div className={styles.customer_selection__field}>
          <label className={styles.customer_selection__label}>Select Customer</label>
          <select
            value={selectedCustomerId}
            onChange={(e) => onCustomerSelect(e.target.value)}
            className={styles.customer_selection__select}
          >
            <option value="">Select a customer...</option>
            {filteredCustomers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName} - {customer.email}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCustomer && (
        <div className={styles.customer_selection__selected}>
          <h4>Selected Customer</h4>
          <div className={styles.customer_selection__customer_info}>
            <div className={styles.customer_selection__customer_details}>
              <p><strong>Name:</strong> {selectedCustomer.firstName} {selectedCustomer.lastName}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              {selectedCustomer.phone && <p><strong>Phone:</strong> {selectedCustomer.phone}</p>}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CustomerSelectionSection;