import React from "react";
import styles from "./ServiceModalFooter.module.scss";
import Button from "@/components/ui/Button/Button";

interface ServiceModalFooterProps {
  price: number;
  handleOrderSubmit: () => void;
}

const ServiceModalFooter: React.FC<ServiceModalFooterProps> = ({
  price,
  handleOrderSubmit,
}) => {
  return (
    <div className={styles.serviceModalFooter}>
      <div className={styles.serviceModalFooter__price}>
        NGN {price.toLocaleString()}
      </div>
      <Button
        variant="primary"
        size="lg"
        onClick={handleOrderSubmit}
        className={styles.serviceModalFooter__button}
      >
        ORDER
      </Button>
    </div>
  );
};

export default ServiceModalFooter;
