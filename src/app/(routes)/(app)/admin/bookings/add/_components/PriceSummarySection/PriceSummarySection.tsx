import React, { useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon/Icon";
import Card from "../../../../_components/UI/Card/Card";
import { Service, ServiceOption } from "@/graphql/api";
import styles from "./PriceSummarySection.module.scss";

interface PriceSummarySectionProps {
  selectedService: Service | undefined;
  selectedOption: ServiceOption | undefined;
  calculatedPrice: number;
}

const PriceSummarySection: React.FC<PriceSummarySectionProps> = ({
  selectedService,
  selectedOption,
  calculatedPrice,
}) => {
  const [previousPrice, setPreviousPrice] = useState(0);
  const [priceChanged, setPriceChanged] = useState(false);

  // Track price changes for animation
  useEffect(() => {
    if (calculatedPrice !== previousPrice && previousPrice > 0) {
      setPriceChanged(true);
      setTimeout(() => setPriceChanged(false), 1000);
    }
    setPreviousPrice(calculatedPrice);
  }, [calculatedPrice, previousPrice]);

  if (!selectedService) return null;

  return (
    <Card className={styles.price_summary}>
      <h3 className={styles.price_summary__title}>
        <Icon name="dollar-sign" />
        Price Summary
      </h3>

      <div className={styles.price_summary__content}>
        <div className={styles.price_summary__row}>
          <span>Service:</span>
          <span>{selectedService.label}</span>
        </div>
        {selectedOption && (
          <div className={styles.price_summary__row}>
            <span>Option:</span>
            <span>{selectedOption.label}</span>
          </div>
        )}
        <div className={styles.price_summary__total}>
          <span>Total:</span>
          <span className={priceChanged ? styles.price_changed : ""}>
            ₦{calculatedPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PriceSummarySection;
