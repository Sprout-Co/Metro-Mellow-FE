"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import FoodMenuModal from "./FoodMenuModal";

const FoodMenuModalDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Food Menu Modal Demo</h1>
      <p>Click the button below to open the food menu modal</p>
      <Button variant="primary" size="lg" onClick={handleOpenModal}>
        Open Food Menu
      </Button>

      <FoodMenuModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default FoodMenuModalDemo; 