"use client";

import React, { useState } from "react";
import CheckoutModal, { CheckoutFormData } from "./CheckoutModal";
import Button from "../../../Button/Button";

/**
 * Example component demonstrating the CheckoutModal usage
 * This component shows how to integrate the checkout modal into your application
 */
const CheckoutModalExample: React.FC = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handler for form submission
  const handleContinue = (formData: CheckoutFormData) => {
    console.log("Checkout form data:", formData);

    // Here you would typically:
    // 1. Validate the form data
    // 2. Send it to your backend API
    // 3. Navigate to the next step or show success message
    // 4. Close the modal

    // For demo purposes, just log and close
    alert("Checkout form submitted! Check console for details.");
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>CheckoutModal Example</h2>
      <p>Click the button below to open the checkout modal:</p>

      <Button onClick={handleOpenModal} variant="primary" size="lg">
        Open Checkout Modal
      </Button>

      {/* The CheckoutModal component */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default CheckoutModalExample;
