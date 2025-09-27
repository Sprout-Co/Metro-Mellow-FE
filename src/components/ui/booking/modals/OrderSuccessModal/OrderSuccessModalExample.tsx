"use client";

import React, { useState } from "react";
import Button from "../Button/Button";
import ShippingDetailsModal from "../ShippingDetailsModal/ShippingDetailsModal";
import { ShippingDetails } from "../ShippingDetailsModal/ShippingDetailsModal";

export const OrderSuccessModalExample: React.FC = () => {
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);

  const handleOpenShippingModal = () => {
    setIsShippingModalOpen(true);
  };

  const handleCloseShippingModal = () => {
    setIsShippingModalOpen(false);
  };

  const handleContinue = (shippingDetails: ShippingDetails) => {
    console.log("Shipping details submitted:", shippingDetails);
    // This will automatically open the OrderSuccessModal
  };

  return (
    <div style={{ padding: "2rem", display: "flex", justifyContent: "center" }}>
      <Button onClick={handleOpenShippingModal} variant="primary">
        Open Shipping Details (will show Success Modal on Continue)
      </Button>

      <ShippingDetailsModal
        isOpen={isShippingModalOpen}
        onClose={handleCloseShippingModal}
        onCheckout={handleContinue}
      />
    </div>
  );
};

export default OrderSuccessModalExample;
