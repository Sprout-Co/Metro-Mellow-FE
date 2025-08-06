import React from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './CancelOrderModal.module.scss';
import Image from 'next/image';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  serviceFeePercentage?: number;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Cancel Order?',
  message = 'Are you sure you want to cancel order? This attracts a 2% service fee.',
  serviceFeePercentage = 2
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      showHeader={false}
      className={styles.cancelOrderModal}
    >
      <div className={styles.cancelOrderModal__container}>
        <h2 className={styles.cancelOrderModal__title}>{title}</h2>
        
        <p className={styles.cancelOrderModal__message}>
          {message.replace('2%', `${serviceFeePercentage}%`)}
        </p>
        
        <div className={styles.cancelOrderModal__iconContainer}>
          <Image
            src="/images/general/sign.png"
            alt="Warning"
            width={150}
            height={150}
            className={styles.cancelOrderModal__icon}
          />
        </div>
        
        <div className={styles.cancelOrderModal__buttons}>
          <Button 
            onClick={onClose}
            className={styles.cancelOrderModal__cancelButton}
            variant="ghost"
            fullWidth
          >
            DON'T CANCEL
          </Button>
          
          <Button 
            onClick={onConfirm}
            className={styles.cancelOrderModal__confirmButton}
            variant="primary"
            fullWidth
          >
            YES, CANCEL
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelOrderModal;