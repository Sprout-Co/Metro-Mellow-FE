import React, { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import CancelOrderModal from '@/components/ui/CancelOrderModal/CancelOrderModal';
import styles from './CancelOrderButton.module.scss';

interface CancelOrderButtonProps {
  orderId: string;
  className?: string;
  serviceFeePercentage?: number;
}

export default function CancelOrderButton({ 
  orderId, 
  className = '',
  serviceFeePercentage = 2
}: CancelOrderButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCancelOrder = () => {
    console.log(`Canceling order ${orderId}`);
    // Here you would call your API to cancel the order
    
    closeModal();
    // You might want to show a success message or update the UI after successful cancellation
  };

  return (
    <>
      <Button 
        onClick={openModal}
        className={`${styles.cancelOrderButton} ${className}`}
        variant="secondary"
        fullWidth
      >
        Cancel
      </Button>
      
      <CancelOrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleCancelOrder}
        serviceFeePercentage={serviceFeePercentage}
      />
    </>
  );
}