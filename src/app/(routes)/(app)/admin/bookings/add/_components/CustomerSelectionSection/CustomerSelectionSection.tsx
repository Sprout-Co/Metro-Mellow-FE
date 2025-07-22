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
}

const CustomerSelectionSection: React.FC<CustomerSelectionSectionProps> = ({
  customers,
  selectedCustomerId,
  customerSearchQuery,
  onCustomerSelect,
  onSearchQueryChange,
}) => {
  // Filter customers based on search
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

  return (
    <Card className={styles.customer_selection}>
      <h3 className={styles.customer_selection__title}>
        <Icon name="user" />
        Customer
      </h3>

      <div className={styles.customer_selection__search}>
        <Icon name="search" />
        <input
          type="text"
          placeholder="Search customers..."
          value={customerSearchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className={styles.customer_selection__search_input}
        />
      </div>

      <div className={styles.customer_selection__list}>
        {filteredCustomers.map((customer) => (
          <label
            key={customer.id}
            className={`${styles.customer_selection__option} ${
              selectedCustomerId === customer.id ? styles.selected : ""
            }`}
          >
            <input
              type="radio"
              name="customer"
              value={customer.id}
              checked={selectedCustomerId === customer.id}
              onChange={(e) => onCustomerSelect(e.target.value)}
              className={styles.customer_selection__radio}
            />
            <div className={styles.customer_selection__avatar}>
              {customer.firstName?.charAt(0) || "N"}
            </div>
            <div className={styles.customer_selection__info}>
              <div className={styles.customer_selection__name}>
                {`${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
                  "N/A"}
              </div>
              <div className={styles.customer_selection__email}>
                {customer.email}
              </div>
              {customer.phone && (
                <div className={styles.customer_selection__phone}>
                  {customer.phone}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </Card>
  );
};

export default CustomerSelectionSection;
